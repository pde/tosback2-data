
 
//***********************************************************************************************************************************************
(function($){   
	/*all functions defined within this block are within the scope of this annonymous function */
//	                                       JQUERY Extensions- later extract to separate file
//***********************************************************************************************************************************************

					//All code that extends JQuery goes in the sections below

//********************************************************************************************
//									Chainable Extensions
//********************************************************************************************

				//Chainable extinsions are defined here (they return this)


//**********************************
//	functions: togglers
//**********************************
	//Options:
	//	contentSelector - selector that identifies toggleable content
	//  clickSelector - selector that identifies the control that toggles the content.
	//  speed - rate at which content appears and disappears - optional
	//  showText - text that should be present within the control when content is hidden - and replaced with,optional
	//  hideText - when content is shown. and vice versa ,optional
var maketoggle = function(contentSelector,rev,showText,hideText,speed){
	showText = (showText)?showText:'show';
	hideText = (hideText)?hideText:'hide';
	toAffect = contentSelector;
	if(rev != true){
		$(this).toggle(
			function(){
				$(toAffect).each(function(){(speed)?$(this).hide(speed):$(this).hide()});
				$(this).html($(this).html().replace(hideText,showText).replace(hideText.charAt(0).toUpperCase() + hideText.substr(1),showText.charAt(0).toUpperCase() + showText.substr(1)));
			}, /*end toggle param 1 */
			function(){
				$(toAffect).each(function(){(speed)?$(this).show(speed):$(this).show()})
				$(this).html($(this).html().replace(showText,hideText).replace(showText.charAt(0).toUpperCase() + showText.substr(1),hideText.charAt(0).toUpperCase() + hideText.substr(1)));
			}/*end toggle param 2 */);/*close toggle */
	}else{
		$(this).toggle(
			function(){
				$(toAffect).each(function(){(speed)?$(this).show(speed):$(this).show()})
				$(this).html($(this).html().replace(showText,hideText).replace(showText.charAt(0).toUpperCase() + showText.substr(1),hideText.charAt(0).toUpperCase() + hideText.substr(1)));
			}, /*end toggle param 1 */
			function(){
				$(toAffect).each(function(){(speed)?$(this).hide(speed):$(this).hide()});
				$(this).html($(this).html().replace(hideText,showText).replace(hideText.charAt(0).toUpperCase() + hideText.substr(1),showText.charAt(0).toUpperCase() + showText.substr(1)));
			}/*end toggle param 2 */);/*close toggle */
	}
	return this;
};


var togglewith = function(clickSelector,rev,showText,hideText,speed){
	showText = (showText)?showText:'show';
	hideText = (hideText)?hideText:'hide';
	toAffect = this;3
	if(rev != true){
		$(clickSelector).toggle(
			function(){
				$(toAffect).each(function(){(speed)?$(this).hide(speed):$(this).hide()});
				$(this).html($(this).html().replace(hideText,showText).replace(hideText.charAt(0).toUpperCase() + hideText.substr(1),showText.charAt(0).toUpperCase() + showText.substr(1)));
			}, /*end toggle param 1 */
			function(){
				$(toAffect).each(function(){(speed)?$(this).show(speed):$(this).show()})
				$(this).html($(this).html().replace(showText,hideText).replace(showText.charAt(0).toUpperCase() + showText.substr(1),hideText.charAt(0).toUpperCase() + hideText.substr(1)));
				}/*end toggle param 2 */);/*close toggle */
	}else{
		$(clickSelector).toggle(
			function(){
				$(toAffect).each(function(){(speed)?$(this).show(speed):$(this).show()})
				$(this).html($(this).html().replace(showText,hideText).replace(showText.charAt(0).toUpperCase() + showText.substr(1),hideText.charAt(0).toUpperCase() + hideText.substr(1)));
				}, /*end toggle param 1 */
			function(){
				$(toAffect).each(function(){(speed)?$(this).hide(speed):$(this).hide()});
				$(this).html($(this).html().replace(hideText,showText).replace(hideText.charAt(0).toUpperCase() + hideText.substr(1),showText.charAt(0).toUpperCase() + showText.substr(1)));
			}/*end toggle param 2 */);/*close toggle */
	}			
	return this;
}

var delegate = function(eventType, rules) {
  return this.bind(eventType, function(e) {
    var target = $(e.target);
    for(var selector in rules)
      if(target.is(selector)) {
        return rules[selector].apply(this, arguments)
      }
  })
}

//********************************************************************************************
//									Non-Chainable Extensions
//********************************************************************************************

		//utility extinsions are defined here







//********************************************************************************************
//									Code to extend jquery here
//********************************************************************************************
		//actual extending of jquery goes here - give extend jquery object - making the methods accesible outside of this annonymous function
$.fn.makeToggle = maketoggle;
$.fn.toggleWith = togglewith;		
$.fn.delegate=delegate;

//************************************************************************************************************
// End plugin section here
})(jQuery);
//*******

// ensures background images are cached in IE6 - for rating stars
try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}

// global namespace - to avoid any other vars outside of ui
$.global = $.global || {};

// hosts
$.hosts = {
	community: 	(function () {
					try {
						return BN.Environment.Host.getMappedDomain('community');
					} catch(e) {
						return 'my.barnesandnoble.com';
					}
	})(),
	webhost: (function() {
	    try {
	        return BN.Environment.Host.getMappedDomain('WEB');
	    } catch (e) {
	        return 'www.barnesandnoble.com';
	    }
	})(),
	images:		"images.barnesandnoble.com"
};
$.hosts.resources = "http://" + $.hosts.images;

if(document.location.protocol == 'https:'){
	$.hosts.resources = document.location.protocol + '//' + document.location.host;
}

$.hosts.commServices = "http://" + $.hosts.community + "/communityportal/ServiceRequest.aspx"

$.hosts.bookClubs = "http://bookclubs.barnesandnoble.com";

// global ui object - should be the only global
var ui;
var context;$(function() {
	ui = new $.UI();
    context = new $.Context();

	jQuery.global.SearchWidgetPagination = function(response) {
		$("#" + $.global.searchWidgetID + " #searchWidget-resultArea").html(response.output);
	}

	if($("a.emailAFriend").exists() || $("a.useEmailAFriend").exists()) {
		//alert($("a.emailAFriend").get(0)); 
		$.global.EmailAFriend = new $.EmailAFriend();
	}
	
	if ($('#bookclubsHostValue').exists() && ($('#bookclubsHostValue').text()).length > 0) {
	  $.hosts.bookClubs  = 'http://' + $('#bookclubsHostValue').text()
	}

	if (String(location.search).indexOf('BookClubStage=1') != -1) {
		$.hosts.bookClubs = "http://bookclubs.stage.barnesandnoble.com";
	}
	
	$.global.popUpQuestionContent = {};
	$.global.popUpQuestionContent.Header_1 = '<div class="overlayHeader"><h3>Privacy Settings</h3><a href="#" class="overlayClose"><span>Close</span></a></div>';
	
	
	

	
	
	$.BuildCommunityPopup = function () {
		
		var self = this;
		var o = new $.Overlay();					
		var isTAFOpen = false;
		var placeholderEvent = null;
		var isOpen = false;
		var originalWidth = 678;

		if (! $.browser.msie) {
			originalWidth = 672;
		}


		var findPeopleFormMarkUp = '<div>	\
										<div class="form_progress form_progress_1_of_3"/> \
									</div>	\
									<h3> \
										Find people you know in the My B&amp;N Community...	\
									</h3>	\
									Enter your contact\'s email address to search for their My B&amp;N profile.	\
									<div class="getProfileByEmailErrorHolder" style="height: 45px;">	\
										<div class="errorMsg emailSearchError"></div> 	\
									</div>	\
									<div class="leftCol"><b>Email address*</b></div> \
									<div class="rightCol">	\
										<form action="#" onsubmit="$.global.buildCommunityPopup.submitGetProfileByEmail();return(false);">	\
											<input type="text" class="emailPeopleSearchInput emailPeopleSearchInputLTN" />	\
											<div class="subLabel">(Limited to one address at a time)</div>	\
											<a href="#" class="submitBtn submitGetProfileByEmailLTN"/> 	\
										</form>		\
									</div>	\
									<div class="clear"/>	\
									<div class="communityFootNote">	\
										*Indicates Required Field <br/>		\
										 <br/>		\
										 Email addresses will not be stored or used for any promotional purpose. 	\
									</div>	\
									';
									
		var followFormContent = '	<div>	\
										<div class="form_progress form_progress_2_of_3"/> \
									</div>	\
									<table cellpadding="0" cellspacing="0" border="0">	\
										<tr><td class="SearchByEmailResultDisplayLTN"></td></tr>	\
										<tr>	\
											<td>	\
												<div class="followOtherProfileHolder"></div>	\
													<div class="followForm">	\
														<table cellpadding="0" cellspacing="17" border="0" width="100%">	\
															<tr>	\
																<td align="right">	\
																	<a href="#" class="cancelBtn cancelLTN"/>	\
																</td>	\
																<td>	\
																	<a href="#" class="followBtn followLTN"/>	\
																</td>	\
															</tr>	\
														</table>	\
													</div>	\
												</td>	\
											</tr>	\
										</table> ';
									
		var followSuccessContent = '<div>	\
										<div class="form_progress form_progress_3_of_3"/> \
									</div>	\
									<table cellpadding="0" cellspacing="0" border="0">	\
										<tr>	\
											<td>	\
												<h3>	\
													Congratulations! You are now following <span class="penNameSuccess targetPenNameSuccessLTN"></span>.	\
												</h3>	\
											</td>	\
										</tr>	\
										<tr>	\
											<td class="followOtherProfileSuccessDisplayLTN">	\
											</td>	\
										</tr>	\
										<tr>	\
											<td align="center">	\
												<a href="#" class="findMoreBtn findMoreLTN"/>	\
												<br/>	\
											</td>	\
										</tr>	\
									</table>';
									
		var defaultTAFNote = '<div style="display: none;" id="defaultPersonalNote">Please join My B&amp;N, the online community at Barnes &amp; Noble.com.  At My B&amp;N you can create a virtual Library, write reviews, meet readers, and more. Plus it\'s all free.</div>';
		
		var privacyNote = '<div class="privacyPolicyNote">See our <a target="_blank" href="http://www.barnesandnoble.com/help/nc_privacy_policy.asp">Privacy Policy</a>.</div>';
	
		var CommID = $("#creatorId").text()
	
		var popUpContent ='<div class="buildCommunityMenu">	\
							<div class="overlayHeader"><h3>Build My Community</h3><a href="#" class="overlayClose"><span>Close</span></a></div> \
							<table cellpadding="0" cellspacing="0" border="0">	\
								<tr>	\
									<td valign="top" class="leftNav">	\
										<a href="#" class="FindPeopleBtn FindPeople_OptionLTN" title="Find People"></a>	\
										<a href="http://'+ $.hosts.community +'/tellafriend/ServiceResponse.aspx?inputType=CommunityID&contentValue=' + CommID + '&contentType=CommActivityInvite&step=Load" class="ActivityInviteBtn TAF_ActivityInvite_OptionLTN activityInvite useEmailAFriend" title="Invite Friends"></a>		\
									</td>	\
									<td valign="top">	\
										<div class="EmailAFriendModeContent EmailAFriendModeContentLTN">	\
											<div class="EmailAFriendContainerLTN">	\
											</div>	\
											' + privacyNote + '		\
											<br/>	\
										</div>	\
											\
										<div class="SearchByEmailContent">	\
											<div class="padding">	\
												<div class="SearchByEmailPage SearchByEmailPageLTN"> \
													'+ findPeopleFormMarkUp +' \
												</div>	\
												<div class="SearchByEmailResultPageLTN" style="display:none;">	\
													' + followFormContent + '	\
												</div>	\
												<div class="followOtherProfileSuccessPageLTN" style="display:none;">	\
													' + followSuccessContent + ' \
												</div>	\
												' + privacyNote  + ' 	\
											</div>	\
										</div>	\
										' + defaultTAFNote + '	\
										<div class="clear"/>	\
									</td>	\
								</tr>	\
							</table>	\
						 </div>';
					
		function init () {
			 o.set.id("ovrly-buildCommunity");
			 o.set.content(popUpContent);			
			 o.set.width(originalWidth);
			 
			 $("#ovrly-buildCommunity").delegate("click", {
				"a.overlayClose" : self.close,
				"a.FindPeople_OptionLTN" : showFindPeopleOption,
				"a.TAF_ActivityInvite_OptionLTN" : handleActivityInviteOption,
				".submitGetProfileByEmailLTN" : self.submitGetProfileByEmail,
				".followLTN" : self.followOtherProfile,
				".findMoreLTN" : self.findMoreProfiles,
				".cancelLTN" :  self.close
			});
			 
		}

	 	function handleActivityInviteOption (e) {
			resetEmailNotFoundMode ();
			
			showActivityInviteOption (e);
		}


		function resetEmailNotFoundMode () {
			$.global.isEmailNotFoundMode = false;
			$('.TAF_InviteHeader h3').text ('Tell your friends about My B&N...');
		}
		
		self.submitGetProfileByEmail = function () {
		
			var emailInput = String($('.emailPeopleSearchInputLTN').val());
			// alert('emailInput: ' + emailInput);
			
			$(".emailSearchError").hide();	// clear old errors, in case this is a re-search
			
			if(emailInput.length == 0) {
				$(".emailSearchError").text('Please enter an email address to search for.');
				$(".emailSearchError").show();
			}
			else if (emailInput.split(",").length > 1) {
				$(".emailSearchError").text('Please enter only one email address at a time.');
				$(".emailSearchError").show();
			}
			else if (!validateEmail(emailInput)) {
				$(".emailSearchError").text('The email address is not a properly formatted.  Please edit your entry.');
				$(".emailSearchError").show();				
			}				
			else { // this is a valid email
				ui.request({ 
					baseURL: $.hosts.commServices + '?',
					parameters:  "page=UserProfile&uiAction=getprofilebyemail&bnOutput=1&email=" + emailInput + "&ce_emailInput=" + emailInput,
					callback: {name: "cbf", value: "$.global.buildCommunityPopup.getProfileByEmailCallback"}
			
				});


			}
			
			
			return false;
		}
		
		function validateEmail(email_address) {
			email_address = String(email_address).replace(/^\s+|\s+$/g, '');
			var email = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;
			if (!email.test(email_address)) {
				return false;
			}
			return true;
		}
		
		
		self.getProfileByEmailCallback = function (response) {
			
			if (response.status == "False" && response.output == "1005") { // The email was not found.
				$.global.isEmailNotFoundMode = true;
				$.global.emailNotFoundInput = $('.emailPeopleSearchInputLTN').val();
				$(".useEmailAFriend:first").trigger('click');	//XXXXX is a better way to do this?  TAF is so complex that initiated another click is the clearest way right now
			}			
			else if (! isLocalizedErrorFound (response, 'There was an Error: ', 'getProfileByEmailError','.getProfileByEmailErrorHolder')) {
				// else, a success:
				$('.SearchByEmailPageLTN').hide();
				$('.SearchByEmailResultDisplayLTN').append(response.output);
				$('.SearchByEmailResultPageLTN').show();
			}
		
		}


		self.followOtherProfile = function (e) {
			
			e.preventDefault(e);
			
			//http://'+ $.hosts.community +'/communityportal/ServiceRequest.aspx?page=FavoriteBookmarks&uiAction=AddBookmark&type=0&favoriteId=370060&title=picklesCC&cbf=obj0__addToFavoritesCallback&_=1249145223784
			
			var targetId = $('.targetIdLTN').text();
			var targetPenName = $('.targetPenNameLTN').text();
			
			ui.request({ 
				baseURL: $.hosts.commServices + '?',
				parameters:  "page=FavoriteBookmarks&uiAction=AddBookmark&type=0&favoriteId=" + targetId + "&title=" + targetPenName + "&ce_purpose=findFriendsPopUp",
				callback: {name: "cbf", value: "$.global.buildCommunityPopup.followOtherProfileCallback"}
		
			});
		}
		
		self.followOtherProfileCallback = function (response) {
			
			if(! isLocalizedErrorFound (response, 'There was an Error: ', 'followOtherProfileError','.followOtherProfileHolder')) {
				// else, a success:
				$('.SearchByEmailResultPageLTN').hide();
				$('.targetPenNameSuccessLTN').html($('.targetPenNameLTN').text());
				$('.followOtherProfileSuccessDisplayLTN').html($('.foundProfileResultDisplayLTN').html());
				$('.followOtherProfileSuccessPageLTN').show();
				if (typeof $.global.activityFeedDisplay.refreshActivityFeedService != "undefined") {
					$.global.activityFeedDisplay.refreshActivityFeedService ('FriendsActivity');
				}
				
				//http://'+ $.hosts.community +'/communityportal/ServiceRequest.aspx?page=FavoriteBookmarks&uiAction=GetSortedBookmarks&type=0&orderBy=0&cbf=obj1__editModeOrderCallback&_=1249836501910
				
				if ($("#PeopleFollowWidget").exists()) { // Refresh PeopleWidget with new followers
					
					ui.request({ 
						baseURL: $.hosts.commServices + '?',
						parameters:  "page=FavoriteBookmarks&uiAction=GetSortedBookmarks&type=0&orderBy=1&ce_purpose=refreshPeopleWidget",
						callback: {name: "cbf", value: "$.global.buildCommunityPopup.refreshPeopleWidgetCallBack"}
				
					});
				}
			}
			
		}
		
		self.refreshPeopleWidgetCallBack = function (response) {
			if (response.status='True') {
				$("#PeopleFollowWidget").html(response.output);
			}
		}
		
		self.findMoreProfiles = function (e) {
			e.preventDefault(e);
			showFindPeopleOption (placeholderEvent);
		}

		self.close = function (e){
			 e.preventDefault(e);
			 if (isTAFOpen) {
 	 			 self.setToNormalSize ();
				 $.global.EmailAFriend.close();
				 isTAFOpen = false;
			 }
			 $(".emailSearchError").hide(); // in case there were any error messages, clear them
			 o.close();
			 resetEmailNotFoundMode ();
			 isOpen = false;
		}


		function turnOffButtons () {
			$(".FindPeople_OptionLTN").removeClass("FindPeopleBtn_on").addClass("FindPeopleBtn");	
			$(".TAF_ActivityInvite_OptionLTN").removeClass("ActivityInviteBtn_on").addClass("ActivityInviteBtn");
			$('.SearchByEmailResultPageLTN').hide();
		}

		function showFindPeopleBtn_on () {
			turnOffButtons ();
			$(".FindPeople_OptionLTN").removeClass("FindPeopleBtn").addClass("FindPeopleBtn_on");
		}

		function showActivityInviteBtn_on () {
			turnOffButtons ();			
			$(".TAF_ActivityInvite_OptionLTN").removeClass("ActivityInviteBtn").addClass("ActivityInviteBtn_on");
		}	

		function showFindPeopleOption (e){

			e.preventDefault(e);
			
			resetEmailNotFoundMode ();
			
			$('.SearchByEmailPageLTN').show();
			
			// clear any previous uses of this process:
			$('.emailPeopleSearchInputLTN').val(''); 
			$('.SearchByEmailResultSuccess').html('').hide(); 
			$('.followOtherProfileSuccessPageLTN').hide();
			$(".emailSearchError").hide();
			$('.SearchByEmailResultDisplayLTN').html('');
			$('.SearchResultEmptyPageLTN').hide();
			$('.SearchResultEmptyDisplayLTN').html('');
			$('.targetIdLTN').text('');
			$('.targetPenNameLTN').text('');
			
			showFindPeopleBtn_on ();
			$('.EmailAFriendModeContentLTN').hide();
			$('.SearchByEmailContent').show();
				
		}
		
		function showActivityInviteOption (e){
			
			e.preventDefault(e);

			if (! isTAFOpen) {
				$.global.EmailAFriend.open(e);
				isTAFOpen = true;
			}

			if (!$.global.isEmailNotFoundMode) {
				showActivityInviteBtn_on ();
				$(".emailFriendForm #toEmail").text('');
			}
			else {
				// prepopulate TAF form with email you searched for
				$(".emailFriendForm #toEmail").text($.global.emailNotFoundInput);
			}
				
			$('.EmailAFriendModeContentLTN').show();
			$('.SearchByEmailContent').hide();
			
		}
		
		
		self.extendForPreview = function () {

			$(".buildCommunityMenu").addClass("extendedForPreview");
			$("#ovrly-buildCommunity").css("width","910px");	
		}
		
		self.setToNormalSize = function () {

			$(".buildCommunityMenu").removeClass("extendedForPreview");
			$("#ovrly-buildCommunity").css("width", originalWidth +"px");	
		}

		self.open = function (e) {

			if ($(e.target).hasClass("buildCommunity") == false) {
				e.target = $(e.target).parents("a").get(0);
			}
	

			if(!isOpen) {
				o.open();
				isOpen = true;
				resetEmailNotFoundMode (); // clear this setting of this a re-openning of the pop-up
			}
			
			placeholderEvent = e;

			//alert('testing, e.target: ' + e.target + ', $(e.target).hasClass("buildCommunity"): ' + $(e.target).hasClass("buildCommunity") + ', $(e.target).parents("a").attr("href"):' + $(e.target).parents("a").attr("href"));
			
			if ($(e.target).hasClass('useEmailAFriend')) {
				
				$.global.EmailAFriend.open(e);
				isTAFOpen = true;
				showActivityInviteOption (e);				
			} 
			else if ($(e.target).hasClass('useFindPeople')) {
				showFindPeopleOption (e);
				
			}						 
			
			return;
		}
	
		init ();
	
		// END BuildCommunityPopup
	
	}
	
	if ($(".buildCommunity").exists()) {
		
		$.global.buildCommunityPopup = new $.BuildCommunityPopup ();
		
		$(".buildCommunity").click (function(e) {
											 
			e.preventDefault(e);
			$.global.buildCommunityPopup.open(e);
		});
	}		   

	
	
});

	$.global.isEmailNotFoundMode = false;	// This is used to keep the Left-Nav button "Find People" activiate even during TAF incase the find-people search failed to find the email in question.	
//**********************************
//	Class: Context
//**********************************
$.Context = function() {
    var self = this;
    init();

    function init() {
        self.signedIn = $("#signedIn").text();
        self.pageType = $("#pageType").text();
        self.profilePrivacyLevel = $("#profilePrivacyLevel").text();
		self.isBTOB = $("#isBTOB").text();
    }
}
/*
$.handleResponse = function(response) {
	response.callback(response);
}
*/

$.cb = function(){
	// blank callback function
}//**********************************
//	Class: SSORequest
//**********************************
$.SSORequest = function(callback){
	var self = this;
	callback = (typeof callback == 'undefined') ? function(){} : callback;

	this.send = function(){
		ui.request({
			baseURL: $.hosts.commServices,
			parameters: '?page=UserProfile&uiAction=SetSSOToken&bnOutput=1',
			callback: {
				name: 'cbf',
				value: '$.cb'
			},
			handleResponse: function(response){
				if ((response.output == 'NotSignedIn' || response.output == 'NoEmailAddress') && response.status == 'False') {
					new $.SignInWidget({
						sso: true, callback: function(failed){
							self.handleResponse(failed);
						}
					})
				}
				else
					if (response.output == 'NoPenName' && response.status == 'False') {
						$.global.PenNameSelector = new $.PenNameSelector({
							sso: true,
							ssoCallback: function(failed){
								self.handleResponse(failed);
							},
							onComplete: function(penname){
								self.handleResponse();
							},
							type: "other"
						});
					}
					else
						if (response.status == 'True') {
							callback(true)
						}
			}
		})
	}

	this.handleResponse = function(failed){
		if (failed) return callback(false); else this.send();
	}

	this.send();
}//**********************************
//	Class: Request
//**********************************
$.Request = function(options) {
	var self = this;
	$.global.cbf = function() {}

	this.settings = {};
	this.settings = $.extend(this.settings, {
		baseURL: null,
		form: null,
		parameters: null,
		callback: null,
	    getScript: true,
		type: "GET",
		requestID: '',
		handleResponse: defaultHandleResponse,
		errorMsgHolder: null,
		signInRequired: true,
		requestSource:null
	}, options);

	var parameters;

	this.send = function() {
		if (self.settings.form == null && self.settings.parameters == null) {
			//parameters = 'outformat=' + settings.outformat;
		} else {
			if (self.settings.form == null && self.settings.parameters != null) {
				parameters = self.settings.parameters;
			} else {
				parameters = self.settings.form.find(':input').serialize();
				//ui.log('PARAMETERS', parameters);
				self.settings.parameters = (self.settings.parameters == null) ? '' : self.settings.parameters;
				parameters = parameters + self.settings.parameters; //+ '&outformat=' + settings.outformat;
			}
		}
		if(self.settings.baseURL == $.hosts.commServices || self.settings.baseURL.search("ServiceRequest.aspx") != -1 || self.settings.baseURL.search("ServiceResponse.aspx") != -1 || self.settings.baseURL.search("ServiceResponse.aspx") != -1) {
			if(self.settings.callback == null) {
				parameters += "&cbf=" + self.settings.requestID + "__$.global.cbf";
			} else {
				parameters += "&" + self.settings.callback.name + "=" + self.settings.requestID + "__" + self.settings.callback.value;
			}
		} else if(self.settings.callback != null) {
			parameters += "&" + self.settings.callback.name + "=" + self.settings.callback.value;
		}

		if(self.settings.secure) {
			self.settings.baseURL = self.settings.baseURL.replace("http", "https");
		}
		
		var url = self.settings.baseURL;

		if(context.isBTOB == 'true') {
			parameters = parameters + '&btob=y';
		}

		//ui.log('REQUEST URL: ', url);

		if((url.length + parameters.length) > 1000 || self.settings.type == "POST" || !self.settings.getScript){
			
			var postParameters = parameters;
			
			if (postParameters.indexOf('?') == 0) {
				postParameters = postParameters.substr(1);
			}
			
			$.post(url, postParameters, function(result){
				eval(result);
			})

		}
		// IFRAME PROXY - if url.length > 1000 and document.location.host is in the request, use proxy
		else {
			
			url += parameters; 
			$.getScript(url);
		}
	}

	function defaultHandleResponse(response){
		if(response.output && response.output == "NotSignedIn" && self.settings.signInRequired) {
			if(self.settings.requestSource && self.settings.requestSource.className){
				/*classContent = self.settings.requestSource.className;
				sectionText = classContent.substr(classContent.search('section_')+8);
				sectionText= (sectionText.indexOf(' ')==-1)?sectionText:sectionText.substr(0,sectionText.indexOf(' '));
				sectionText = (sectionText)?sectionText:null; */
				new $.SignInWidget({section:"generic"});
			}else{
				new $.SignInWidget();
			}
		} else if(response.callback) {
			response.callback(response, this.errorMsgHolder);
		}
	}

	self.handleResponse = function(response){
		this.settings.handleResponse(response);
	}
}


//**********************************
//	Class: UI
//**********************************
$.UI = function(){
	var self = this;
	this.requests = [];
	
	this.request2=function(options,str){
		var offset=0;
		if(options.callback && typeof options.callback.value === 'function'){
			var placeholder = str || "tEMPbnrEQUEST";
			var marker = new Date().getTime() + offset++;
			window[placeholder+marker]=options.callback.value;
			options.callback.value = placeholder+marker;
			options.callback.name = (options.callback.name)?options.callback.name:'cbf';
		}
		this.request(options);
	};
	
	this.request = function(options){
		var firstItem = 0;
		if(options.queue && !($.global[options.queue + "_rq"])) {
			$.global[options.queue + "_rq"] = [];
			firstItem = 1;
		}



		options.requestID = (typeof options.requestID == 'undefined') ? null : options.requestID;
		this.requests.push('req');

		if (options.requestID != null) {
			var varName = options.requestID;
		}
		else {
			var varName = 'obj' + (this.requests.length - 1);
			options.requestID = varName;
		}
		if(options.queue) {
			var origHandleResponse = options.handleResponse;
			options.handleResponse = function(response){
				if(response.status == "False") {
					delete $.global[options.queue + "_rq"];
				}
				if(origHandleResponse) {
					origHandleResponse(response);
				} else {
					if(response.output && response.output == "NotSignedIn") {
						new $.SignInWidget();
					} else if(response.callback) {
						response.callback(response, options.errorMsgHolder);
					}
				}
				if($.global[options.queue + "_rq"] && $.global[options.queue + "_rq"].length > 0) {
					var req = $.global[options.queue + "_rq"].shift();
					req.send();
				} else {
					delete $.global[options.queue + "_rq"];
				}
			}
		}

		this[varName] = new $.Request(options);

		if(!options.queue) {
			this[varName].send();
		} else {
			$.global[options.queue + "_rq"].push(this[varName]);
			if(firstItem) {
				$.global[options.queue + "_rq"].shift().send();
			}
		}
	}

	this.block = function(){

		if(!$('#blocker').exists()){
			var $this = $('body');
			if($.browser.msie) {
				$this.append('<div id="blocker" style="display: block; "><iframe src="javascript:false;" frameborder="0"></iframe></div>');
			} else {
				$this.append('<div id="blocker" style="display: block; "></div>');
			}
			
			var blocker = $("#blocker");
			blocker.find("iframe").css({height: $(document).height(), width: "100%", filter: "alpha(opacity=0)"});
			blocker.css({filter : "alpha(opacity = 50)", display: "block"});
			blocker.css({height: $(document).height()}); 
		} else {
			var blocker = $("#blocker");
			blocker.css({display: "block"});
			blocker.css({height: $(document).height()}); 
		}
	}

	this.unblock = function(){
		$('#blocker').css({display: "none"});
		$("select").css({visibility: "visible"});
	}

	this.log = function(title, msg){
		return false;
		/*if (typeof console == 'object' && console.log){
			console.log('*************************');
			console.log('{{{{{ ' + title + ' }}}}}');
			console.log(msg);
			console.log('*************************');
		}*/
	}
	
	/* 
	** @toggleView : alternates display of two elements
	** expandHandler : the element to register click event
	** childSelector : a reference to child elements needing toggle action
	** parentSelector : a reference to parent of toggled elements
	*/
	this.toggleView = function(expandHandler, childSelector, parentSelector){
		$(expandHandler).click(function(e){
				e.preventDefault();
				var group = $(this).parent(parentSelector).find(childSelector);
				var item = $(group).children(childSelector);
				$(this).parents(parentSelector).children(childSelector).each(function(){
					if($(this).css("display") == "none") {						
						$(this).show();
					}
					else{
						$(this).hide();
					}
				});
		});
	}
}

//**********************************
//	Class: Overlay
//**********************************
$.Overlay = function(params){
	var self = this;
	var $elem = this.element = $('<div class="overlay"></div>');


	var settings = $.extend({
		block: 1,
		useHeading: 0,
		heading: "",
		container: $('body')
	}, params);


	settings.container.append($elem);

	this.set = {
		content: function(c){
			if(settings.useHeading) {
				$elem.html("<div class='overlayHeader'><h3>"+settings.heading+"</h3><a class='overlayClose' href='#'><span>Close</span></a></div><div class='overlayContent'>"+c+"</div>");
			} else { $elem.html(c); }
		},
		width: function(w){ $elem.css('width', w); },
		height: function(h){ $elem.css('height', h) },
		left: function(l){ $elem.css('left', l) },
		top: function(t){ $elem.css('top', t)},
		id: function(i) { $elem.attr({id: i}) }
	}

	this.open = function(center){
		if(settings.block) { ui.block(); }
		if(center == false) {
			$elem.show();
		} else {
			$elem.center().show();
		}
	}

	this.center = function() {
		$elem.center();
	}

	this.close = function(){
		if(settings.block) { ui.unblock(); }
		$elem.hide();
	}
	this.adjust=function(){
		var w=$('.overlayContent',$elem).width();
		var checkChildren=function(item){
			var newW =parseInt($(item).attr('width'))||$(item).width();
			if(newW > w){
				w=newW;
			}
			
			$(item).children().each(function(){
				checkChildren(this);
			});
		};
		
		checkChildren($('.overlayContent',$elem).get(0));;

		this.set.width(w);
		$elem.center();
		
	};
	this.remove = function(){
		$elem.remove();
	}
}

//**********************************
//	Class: Confirm
//**********************************
$.Confirm = function(options) {
	var self = this;
	var overlay = null;

	this.settings = $.extend({
		//eventBucket: $(document),
		heading: "Attention",
		id: "confirmBox",
		width: 400,
		content: ""
	}, options);

	function init() {

		overlay = new $.Overlay({
			useHeading: 1,
			heading: self.settings.heading
		});

		overlay.set.id(self.settings.id);
		overlay.set.width(self.settings.width);
		if(typeof self.settings.content == "object") {
			overlay.set.content(self.settings.content.html());
			self.settings.content.html("");
		} else {
			overlay.set.content(self.settings.content);
		}

		/* Cancel */
		if(self.settings.cancel && self.settings.cancel.path) {
			$(self.settings.cancel.path).click(function(e) {
				e.preventDefault(e);
				if(self.settings.cancel.action()) {
					self.close();
				}
			});
		}
		// Okay
		if(self.settings.ok && self.settings.ok.path) {
			$(self.settings.ok.path).click(function(e) {
				e.preventDefault(e);
				if(self.settings.ok.action()) {
					self.close();
				}
			});
		}

		var eventBucket = $("#" + self.settings.id);
		eventBucket.delegate("click", {
			"a.overlayClose": function(e) {e.preventDefault(e); self.settings.cancel.action(); self.close();}
		});

	}

	function cancel() {
		self.settings.cancel.action();
		self.close();

	}

	this.close = function(e) {
		if(e) { e.preventDefault(e); }
		overlay.close();
	}

	this.remove = function(){
		overlay.remove();
	}

	this.prompt = function() {
		overlay.open();
	}

	init();
}

//**********************************
//	Class: SearchWidget
//**********************************
$.SearchWidget = function(options){
	var self = this;
	var resultArea = null;
	var searchWidgetOverlay = null;
	var added = 0;
	var productLine = null;
	var specialSearchFMT= "";
	var productTypesTemplate = ["Books","DigAudio",	"eBooks", "eNewspapers", "eMagazines", "DVD", "Music", "Magazines", "Video_Games", "Toys_Games", "Home_Gifts"];
	var defaultProdType, searchTerm;
	this.settings = $.extend({
		heading: "Product Search",
		cbf: null, 
		add: function() {},
		refresh: function() {},
		setDefaultValues: function() {},
		productTypes: productTypesTemplate,

		fullSearchConfig : {
						"Books" : ["Books", "BK", "CBOOK"],
						"DigAudio" : ["Audiobook MP3s", "BK", "CDIGAUDIO"],
						"eBooks" : ["eBooks", "BK", "EBOOK"],
						"eNewspapers" : ["eNewspapers", "BK", "ENEWS"],
						"eMagazines" : ["eMagazines", "BK", "EMAG"],
						"DVD" : ["Movies & TV", "VD", "DVD"],
						"Music" : ["Music", "MU", "MUSIC"],
						"Magazines" : ["Magazines","DM", "MAGAZINES"],
						"Video_Games" : ["Video Games", "VG", "VIDEOGAME"],
						"Toys_Games" : ["Toys & Games", "SPT", "TOY"],
						"Home_Gifts" : ["Home & Gifts", "SPH", "GIFT"]
					  },
		extraParameters: "",
		id: "ovrly-addItem"
	}, options);

	var searchType = parsePT();
	var searchFields = "Search: <input type='text' id='searchWidget-value' />" + searchType[0];
	if(searchType[1] == 1) {
		searchFields = "Search " + searchType[0] + " for: <input type='text' id='searchWidget-value' />";
	}
	
	var searchWidgetHTML = "<div id='"+this.settings.id+"'><div class='overlayHeader'><h3>" + this.settings.heading + "</h3><a class='overlayClose' href='#'><span>Close</span></a></div><div class='overlayContent' id='ovrly_addToLib'><form id='searchWidget-form'>" + searchFields + " <img id='searchWidget-search' alt='submit' src='" + BN.Environment.ImageLink.getPath("/presources/community/images/bg_submit.png") + "' /></form><div id='searchWidget-resultArea'></div></div></div>";

	function init() {
		searchWidgetOverlay = new $.Overlay();
		searchWidgetOverlay.set.content(searchWidgetHTML);
		searchWidgetOverlay.set.width(510);
		resultArea = $("#"+self.settings.id+" #searchWidget-resultArea");

		// event delegation
		$("#"+self.settings.id).keydown(function(e) {
			if(($(e.target).get(0).id == "searchWidget-select" || $(e.target).get(0).id == "searchWidget-value" || $(e.target).get(0).id == "searchWidget-search") && e.keyCode == 13) {
				doSearch(e);
			}
		});

		$(window).resize(function(e) {
			if(self.widgetOpen) {
				ui.block();
				searchWidgetOverlay.center();
			}
		});

		$("#"+self.settings.id).delegate("click", {
			"a.overlayClose": close,
			"img.sw-done": close,
			"#searchWidget-search": doSearch
		});

		$("#"+self.settings.id).delegate("click", {
			"button.sw-add": add,
			"button.sw-addLink": addLink
		});

		$("#"+self.settings.id).delegate("click", {
			"a.paginate": paginate
		});
	}

	function paginate(e) {
		e.preventDefault(e);

		$.global.searchWidgetID = self.settings.id;		
		
		var extraParameters = "";

		if (specialSearchFMT.length > 0) {
			extraParameters += "&FMT=" + specialSearchFMT;
		}

		ui.request({
			baseURL: $.hosts.commServices,
			parameters: $(e.target).get(0).name + extraParameters,
			callback: {name: "cbf", value: "jQuery.global.SearchWidgetPagination"}
		});

		resultArea.html("<img src='" + $.hosts.resources + "/presources/images/ajax-loader.gif' /> Loading...");
	}

	function parsePT() {
		var num = 0;
		var searchType = "";
		var productTypes = self.settings.productTypes;
		
		var opts = "<select id='searchWidget-select'>";
		for(var i in productTypes) {
			opts += "<option value='"+productTypes[i]+"'>" + (self.settings.fullSearchConfig[productTypes[i]])[0] + "</option>";
			num++;
		}
		opts += "</select>";

		if(num == 1) { // if only one Product Type
			for(var k in productTypes) { // loop redundant?
				searchType = (self.settings.fullSearchConfig[productTypes[i]])[0]; // product line label
				productLine = productTypes[k]; // product line product type
			}
		} else {
			searchType = opts; // otherwise use dropdown.
		}
		
		return [searchType, num];
	}

	function add(e) {
		if(self.settings.add(e) != false) {
			added++;
			$(e.target).parents("td").html("<span class='added'>Added</span>");
		}
	}

	function addLink(e) {
		if(self.settings.add(e) != false) {
			added++;
			$(e.target).parents("td").html("<span class='added'>Link Created</span>");
		}
	}

	function close(e) {
		if(e) { e.preventDefault(e); }

		if(added > 0) {
			self.settings.refresh();
		}
		added = 0;

		searchWidgetOverlay.close();
		resultArea.hide();
		self.widgetOpen = 0;
		$("#"+self.settings.id+" #searchWidget-value").val('');

        $("#searchMaxLimitError").hide();
	}
	
	this.close = function() {
		close()
	}
	
	
	function doSearch(e) {
		e.preventDefault(e);

		var productType = "";
		var specialSearch = "";

		if($("#" + self.settings.id + " #searchWidget-select").get(0)) {
			productLine = $("#" + self.settings.id + " #searchWidget-select").get(0).value;
			// Set format/producttype for eBooks & DigitalAudioBooks.
		}
		
		var productType = self.settings.fullSearchConfig[productLine][1];
		
		var extraParameters = "";
		if(self.settings.extraParameters.length > 0) {
			extraParameters = "&" + self.settings.extraParameters;
		}
		
		specialSearch = self.settings.fullSearchConfig[productLine][2]
		
		if (specialSearch) {
			extraParameters += "&store=" + specialSearch + "&ce_store=" + specialSearch;
		}

		var backwardsCompatibleParam = specialSearch;
		
		// Reverting to Pre-eBooksII values for backwards compatability
		
		if (backwardsCompatibleParam == "CDIGAUDIO") {
			backwardsCompatibleParam = "DIGAUDIO";
		}
		else if (backwardsCompatibleParam == "EBOOK") {
			backwardsCompatibleParam = "EBOOKS";
		}
		
		extraParameters += "&FMT=" + backwardsCompatibleParam;

		ui.request({
			baseURL: $.hosts.commServices,
			parameters: "?page=Library&uiAction=GetQuickSearchItems&pt="+ productType +"&search="+encodeURIComponent($("#" + self.settings.id + " #searchWidget-value").val())+"&index=1&maxNum=10&bnOutput=1&ce_searchType=" + productType + extraParameters,
			callback: {name: "cbf", value: self.settings.cbf}
		});
		resultArea.html("<img src='" + $.hosts.resources + "/presources/images/ajax-loader.gif' /> Loading...");
		resultArea.show();
		
	}



	this.displayResults = function(response) {
		resultArea.html(response.output);
		searchWidgetOverlay.center();
	}

	this.addItems = function(e) {
		searchWidgetOverlay.open();
		self.widgetOpen = 1;
		return false;
	}

	this.autoExec = function(e){
		self.settings.setDefaultValues();
		doSearch(e);
	}
	this.seeAll = function(e) {
		return false;
	}

	init();
}

//**********************************
//	Class: Flag
//**********************************
$.Flag = function(params) {
    var self = this;
    var submitInit = false;
    var objectionID = null;
    var objectionType = null;
    this.flagLink = null;

    var settings = $.extend({
        page: "UserProfile",
        callback: "$.global.flag.callback"
    }, params);

    function init() {


        $(document).delegate("click", {
            "a.flag": tryOpen,
            "a.closeButton": close,
            "input.objection-cancel": close
        });

    }

    function tryOpen(e) {
        open(e);
    }

    function open(e) {

        // Check if Product Page customer reviews tab; then move Flag mark-up to the top of the page for white-label CSS, 
        // and now for the Format Collapsed page.  This makes it easier to determine the overlay position further down.
        if ($("#tab-custreview #flagThisReview, .wgt-product-pods-customer-reviews #flagThisReview").exists()) { 
            var thisFlag = $("#tab-custreview #flagThisReview, .wgt-product-pods-customer-reviews #flagThisReview");
            $(thisFlag).appendTo('body');
        }

        self.flagLink = $(e.target);

        var values = self.flagLink.get(0).id.split("_")[1];

        objectionID = values.split("-")[0];
        objectionType = values.split("-")[1];

        if (submitInit == false) {

            $("form.flagForm").submit(function(e) {
                if ($("form.flagForm input:radio:checked").exists()) {
                    send(e);
                }
                else {
                    $(".flagThisReviewWrap").prepend('<div class="errorMsg" style="display:block">Please select a reason to Flag this, then click "Flag" at the bottom.</div>');
                    return false;
                }
            });
            submitInit = true;
        }

        e.preventDefault(e);
        /* adjust overlay position if it overlaps off screen */
        var coors = findPos($(e.target).get(0));
        var viewportWidth = $(window).width();
        var targetLeft = coors[0];
        var overlayWidth = $("#flagThisReview").width();

        var adjustment = 0;
        if (overlayWidth + targetLeft > viewportWidth) {
            adjustment = viewportWidth - (overlayWidth + targetLeft);
        }

        $("#flagThisReview").css({ left: targetLeft + adjustment, top: (coors[1] + 11) });
    }



    function close(e) {
        self.flagLink = null;
        if ($(".flagThisReviewWrap .errorMsg").exists()) {
            $(".flagThisReviewWrap .errorMsg").remove();
        }
        if (e && e.preventDefault) { e.preventDefault(e); }
        $("#flagThisReview").css({ left: -99999 });
    }

    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft
            curtop = obj.offsetTop
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
            }
        }
        return [curleft, curtop];
    }

    function send(e) {
        e.preventDefault(e);

        var commentId = $(e.target).serialize();

        ui.request({
            baseURL: $.hosts.commServices,
            parameters: "?page=" + settings.page + "&uiAction=CreateObjection&objectID=" + objectionID + "&type=" + objectionType + "&bnOutput=1&" + commentId,
            errorMsgHolder: $('div.flagThisReviewWrap'),
            callback: { name: "cbf", value: settings.callback }
        });
    }

    this.callback = function(response, errorMsgHolder) {

        //Set default to support two versions of the response
        var flagMessage = "<span class='flag'>Flagged.  Thank you</span>";

        // Check to see if Format Collapsed Product page is using this code, and toggle Flag message.
        if ($('#page-type', '#page-data').text() == 'product-page-format-collapsed') {
            flagMessage = "<span class='flag'>This review has been reported. Thank you</span>";
        };

        if (isLocalizedErrorFound(response, "", "flagFail", $(errorMsgHolder))) {
            return;
        }

        if (response.status == "True") {
            $(flagMessage).appendTo(self.flagLink.parents("span"));
            self.flagLink.remove();
            close();
        }
    }

    init();
}

$.global.flag = new $.Flag();


//**********************************
//	Extension: exists
//**********************************
$.fn.exists = function(){
    if ($(this).size() > 0) return true; else return false;
}
//**********************************
//	Extension: center
//**********************************
$.fn.center = function(centerTo){
	return this.each(function(){
		centerTo = (typeof centerTo == 'undefined') ? $(window) : centerTo;
		var viewport = { width: centerTo.width(), height: $(window).height() }
		viewport.height = (centerTo.height() < viewport.height) ? centerTo.height() : viewport.height;
		var scrollTop = $(window).scrollTop();
		var elem = { width: $(this).width(), height: $(this).height() }
		var x = (viewport.width/2) - (elem.width/2);
		var y = ((viewport.height/2) - (elem.height/2)) + scrollTop;
		$(this).css({
			position: 'absolute', left: x, top: y
		});
	})
};

(function($) {
//**********************************
//	Extension: pngFix
//**********************************
jQuery.fn.pngFix = function(settings) {
	
		var temp = $(this).get(0);
	//	alert('testing PngFix: ' + temp.tagName + ', ' + temp.className);
	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$='.png']").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});

		//fix input with png-source
		jQuery(this).find("input[@src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});

	}

	return jQuery;

};

})(jQuery);

//**********************************
//	Class: AddToList
//**********************************

newListTargetHolder = null;


$.AddToList = function(params) {
	var self = this;
	var hooks = $("a.chooseList");
	var zindex = 100;
	var hasData = 0;

	$(document).delegate("click", {
		"a.chooseList": getData,
		"a.addToList": addToList,
		"a.addToEssentialist": addToList,
		"a.addToWishlist": addToList,
		"a.addToEBooksWishlist": addToList,
		"a.newEssentialist": newEssentiaList,
		"a.newWishList": newWishList
	});

	function getData(e) {
		e.preventDefault(e);
		
		if(!hasData) {			
			ui.request({
				baseURL: $.hosts.commServices,
				parameters: '?uiAction=GetAllListsDropDown&pageType=list&page=List&ce_pt=' + $(e.target).attr("id").split("_")[1],
				callback: {name: 'cbf', value: 'jQuery.global.AddToList.listCallback'},
				event: e,
				handleResponse: function(response) {
					if(response.output && response.output == "NotSignedIn") {
						new $.SignInWidget();
					} else if(response.callback) {
						response.callback(response, e);
					}
					
				}
			});
		} else {
			openList(e);
		}
	}

	function openList(e) {		
		var $target = $(e.target),
			$parent = $target.parent();

		$target.get(0).parentNode.style.zIndex = zindex;
		zindex = zindex + 1;

		var ul = document.createElement('ul');
		ul.id = "subList";
		ul.innerHTML = '<li class="arrowSelected">arrow selected</li>';
	
		var values = $(e.target).attr("id").split("_");
		var target_EAN = String(values[0]);		
		var target_ProductCode = values[1];
		var target_ProductType = target_ProductCode;
		var target_Fav_ProductCode = target_ProductCode;

		if (target_ProductCode == 'ER' || target_ProductCode == 'NE' || target_ProductCode == 'DP' || target_ProductCode == 'RD') {
			// This allows eBooks (ER), Digital Audio Books (DP), and the device to be be treated as a Book and add to Favorite Books and the community Library.
			target_ProductType = 'BK';
			target_Fav_ProductCode = 'BK';
		}

		// remove leading zeros, if any - fix for 10-20-08, DMS_P00058651

		while (target_EAN.indexOf('0') == 0 ) {  // while the first character in the EAN string is a '0'
		
			target_EAN = target_EAN.substr(1);   // replace it with everything after the first character.
		}	
		
		
		var serviceHTML = $("#listData").html();
		
		// replace -ean- and -productcode- from serviceHTML template
		var eanArr = serviceHTML.split("-EAN-");
		serviceHTML = eanArr.join(target_EAN.toString());
		
		var pcArr = serviceHTML.split("-PRODUCTCODE-");
		serviceHTML = String(pcArr.join(target_ProductCode.toString()));
		
		var favPcArr = serviceHTML.split("-FAVORITEPRODUCTCODE-");
		serviceHTML = String(favPcArr.join(target_Fav_ProductCode.toString()));
		
		var ptArr = serviceHTML.split("-PRODUCTTYPE-");
		serviceHTML = String(ptArr.join(target_ProductType.toString()));		

		
		// This will be deprecated, Oct 2009 (fixed now with target_Fav_ProductCode, but should remain for backwards compatability for now.
		serviceHTML = serviceHTML.replace(/=favER/g, '=favBK"');
		serviceHTML = serviceHTML.replace(/name="favER/g, 'name="favBK"');			
		
		ul.innerHTML += serviceHTML;

		var doesExist = document.getElementById('subList');

		if(doesExist) {
			doesExist.parentNode.removeChild(doesExist);
		}

		$parent.addClass('active').append(ul);
		

		if(ul.style.left != "-86px") {
			if($target.hasClass("chooseButtonSmall")) {	//position for narrower GateWay dropdown
				ul.style.left = -98 + "px";
			} else {
				ul.style.left = -86 + "px";
			}
		}
		
		
		// For some options are hidden depending on the type of product this list is being activated for ( A book vs a DVD vs an eBooks, etc).
		
		if (target_ProductCode == 'ER' || target_ProductCode == 'NE') {
			// if an eBook, Hide all wishlists (Defualt and Custom):
			$target.parent().find('li').children('.addToWishlist').hide();
			
			// And hide the option to create a new WishList
			$target.parent().find('li').children('.newWishList').hide();
	
			// show My eBooks Wishlist
			$target.parent().find('li').children('.addToEBooksWishlist').show();
		}
		else { // perform the opposite if not an eBook (particularly in case that is the second or third time is being called and the user is switching to another product on the page of a different type)
		
			$target.parent().find('li').children('.addToWishlist').show();
			
			// And hide the option to create a new WishList
			$target.parent().find('li').children('.newWishList').show();
	
			// show My eBooks Wishlist
			$target.parent().find('li').children('.addToEBooksWishlist').hide();
				
		}

		if (target_ProductCode != 'BK' && target_ProductCode != 'ER' && target_ProductCode != 'NE' && target_ProductCode != 'DV' && target_ProductCode != 'MU' && target_ProductCode != 'RD') {
			// if not a Book and not an eBook and not a DVD and not a CD
			$target.parent().find('li').children('.iconLibray').hide();
			$target.parent().find('li').children('.iconFavorites').hide();
		}



		if (target_ProductCode != 'BK' && target_ProductCode != 'ER' && target_ProductCode != 'RD') {  
			// if not a book and not an eBook, then hide Reading Now option
			$target.parent().find('li').children('.iconReadingNow').hide();
		}
		
							  							  
		// Add scrolling effect when a lot of items
		if($(ul).find("ul.listWrap").height() > 220) {
			$(ul).find("ul.listWrap").css({height: "220px", overflow: "auto", "overflow-x": "hidden"});
		} else if(! $("#essentiaListsBox li").exists()){
			//$(ul).find("ul.listWrap").css({height: $("ul.listWrap li.listDivider").get(0).offsetTop - 20}) 
		}
		
		ul.childNodes[0].onclick = function () {
			ul.style.left = -9999 + "px";
		}

		
		if(hasData == 0) {
			$(document).click(function (e) {
				var $target = $(e.target);
				var $subList = $("#subList");

				if($target.parents("#subList").exists() || $target.hasClass("chooseList") || $("#myCreateListPrompt").get(0).style.display == 'block' || $target.parents("div.overlay").size() > 0) {
					if($target.hasClass("arrowSelected") && $subList.get(0).style.left == "-9999px") {
						$parent.removeClass('active');
						$subList.get(0).style.left = -9999 + "px";
					} else if($target.hasClass("chooseButtonSmall")) {	//position for narrower GateWay dropdown
						$subList.get(0).style.left = -98 + "px";
					} else {
						$subList.get(0).style.left = -86 + "px";
					}

				} else {
					$parent.removeClass('active');
					$subList.get(0).style.left = -9999 + "px";
				}
			});
		}
	}


	
	this.listCallback = function(response, e) {
		$("#forceWidth, .page-box").append("<div id='listData' style='display: none'>"+response.output+"</div>");
		openList(e);
		hasData = 1;
	}
	
	function addToList(e) {
	
		e.preventDefault(e);
		$target = $(e.target);

		var isFav = 0;
		var values = $target.get(0).id.split("_");

		if($target.get(0).name) {
			var pageType = $target.get(0).name;
			if(pageType.search("fav") != -1) {
				isFav = 1;
			}
		}
		
		if($target.hasClass("addToEssentialist")) {
			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=List&pageType=list&uiAction=AddItemToListFromProductPage&bIsTemp=false&ListId="+values[2]+"&ean="+values[0]+"&productCode=" + values[1],
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		}
		else if($target.hasClass("addToEBooksWishlist")) {
		
			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=WishList&pageType=WishList&uiAction=AddItemToWishlistFromProductPage&listType=EWL&ean="+values[0]+"&productCode=" + values[1],
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		}
		else if($target.hasClass("addToWishlist")) {
			var listid = "";
			if(values[2] != 0) {
				listid = "&ListId=" + values[2]
			}

			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=WishList&pageType=WishList&uiAction=AddItemToWishlistFromProductPage"+listid+"&ean="+values[0]+"&productCode=" + values[1],
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		}
		else if($target.hasClass("addToReview")) {
			

			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=FavoriteBookmarks&uiAction=AddBookmark&favoriteId="+values[1]+"&title="+values[0]+"&type=8",
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		}
		else if(isFav == 1) {
			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=FavoriteProducts&uiAction=AddItemToListFavoriteProducts&bIsTemp=false&ean="+values[0]+"&pageType="+pageType + "&productCode=" + values[1],
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		} else {
			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $target,
				parameters: "?page=Library&uiAction=AddLibraryItem&ean="+values[0]+"&pt=" + values[1],
				callback: {name: "cbf", value: "jQuery.global.AddToList.addedCallBack" }
			});
		}

		
	}

	this.addedCallBack = function (response, addedTarget) {
		
		$target = $(addedTarget);
		var errorLabel = "";
		
		if (response.status == 'False') {
			errorLabel = $target.text();
			
			if ($($target).hasClass('addFansOfThisItem')) {
				errorLabel = 'your Favorites';
			}
			showPopUpError (response.output, "", "Error Adding to " + errorLabel + " ") 	
		}
		else if (response.status == 'True') {
			if (! $target.hasClass('addFansOfThisItem')) {
				
				var listName = $target.html().replace('add to ','').replace('Add to ','').replace('Add To','');
				var targetClasses = $target.get(0).className.replace("addToList", "");
				targetClasses = targetClasses.replace("addToEssentialist", "").replace("addToWishList", "").replace("addToEBooksWishlist", "").replace("addToWishlist", "").replace("addToReview", "");
				$target.replaceWith('<a href="'+$target.get(0).href+'" class="'+targetClasses+'">Added to '+listName+'<br><span class="left-arrow-small">Go to '+listName+'</span></a>');
			}
			else {
				ListLabel = '';
				ListType = String($target.attr('id')).split('_')[1];
				
				if (ListType == 'BK') {
					ListLabel = 'Books';
				}
				else if (ListType == 'DV') {
					ListLabel = 'DVDs';
				}
				else if (ListType == 'MU') {
					ListLabel = 'CDs';
				}

				$target.parent().html('<a href="'+$target.get(0).href+'">Added to My Favorite ' +ListLabel + '<br/><span class="left-arrow-small">Go to My Favorite ' +ListLabel + '</span></a>');
			}
		}

	}



	function checkSignInforNewList (e) {
		// this is used to create an elist from the product page right-side accoridan.  Checking sign in before asking for a list title and description is not
		// neceassry in the AddToList dropdown because you can't see the dropdown with out signing in.  Here we will run the check first for accordian.
		e.preventDefault(e);
		
		ui.request({
			baseURL: $.hosts.commServices,
			errorMsgHolder: $(e.target),
			parameters: "?page=UserProfile&uiAction=CheckSignedIn",
			callback: {name: "cbf", value: "jQuery.global.AddToList.checkSignInforNewListCallBack"}
		});
		return;
	}

	function checkSignInforNewListCallBack (result) {
			if (result.status == 'True') {
				newEssentiaListFromAccordian (myTarget);
			}
		return;
	}

	
	function newEssentiaListFromAccordian (myTarget) {
	
		
		$target = $(myTarget);
		newListTargetHolder = $target;
		
		var values = $target.get(0).id.split("_");
		$.global.CreateListPrompt.ean = values[0];
		$.global.CreateListPrompt.productCode = values[1];
		$('#myCreateListPrompt').find('textarea').maxLength(250);

		$.global.CreateListPrompt.prompt();
	}


	function newEssentiaList(e) {
		e.preventDefault(e);
		

		if (Number($('.userEssentiaListCount:first').text()) >= 100 ) {
			showPopUpError ("You can create only 100 EssentiaLists. If you wish to start a new EssentiaList with this title, delete an existing one to make room.", 'createListFailed', "Unable to Create EssentiaList");
			return;	
		}

		$target = $(e.target);
		newListTargetHolder = $(e.target);
		
		var values = $target.get(0).id.split("_");
		$.global.CreateListPrompt.ean = values[0];
		$.global.CreateListPrompt.productCode = values[1];
		$('#myCreateListPrompt').find('textarea').maxLength(250);

		$.global.CreateListPrompt.prompt();
	}


	function newWishList(e) {
		e.preventDefault(e);

		if (Number($('.userWishlistCount:first').text()) >= 25 ) {
			showPopUpError ("You can create only 25 Wish Lists. If you'd like to start a new Wish List with this title, delete an existing one to make room.", 'createListFailed', "Unable to Create Wish List");
			return;	
		}

		$target = $(e.target);
		var values = $target.get(0).id.split("_");
		$.global.CreateWishListPrompt.ean = values[0];
		$.global.CreateWishListPrompt.productCode = values[1];

		$.global.CreateWishListPrompt.prompt();
		
		$('.CreateWishListPrompt_ErrorHolder').hide();
	}
};


//**********************************
//	EVENT: DOMREADY
//**********************************
$(function() {

	if($("ul.addItemToList").get(0) != null || $("#social-links").get(0) != null) {
		$.global.AddToList = new $.AddToList();
	}

	if($("ul.addItemToList").get(0) != null) {
	
	
	$.global.AddToListCreateListPrompt = '<div style="padding: 20px;"><form id="createEssentialistForm"><span class="CreateListPrompt_ErrorHolder" style="display:none;"><span style="color:#DD0000; font-weight:bold">Please enter a title.</span></span><span class="CreateListPrompt_LabelHolder">Please name your EssentiaList:</span><span style="font-size:10px;" class="CreateListPromptTitle"></span><br/><input type="text" class="new_list_inputTitle" name="title" maxlength="100" value="" style="width: 360px; height: 30px; color:#666666; font-size:16px; margin-top:4px;" /><br/><br/><span>You may add a description of the list:</span><br /><textarea class="new_list_Description" name="desc" style="width: 360px; height: 60px;color:#666666; font-size:12px;margin-top:4px; font-family: verdana, arial;"></textarea><br/><br/><button class="create_listlink_okay"><img src="http://images.barnesandnoble.com/presources/community/images/btn_submit.gif" /></button><button class="create_listlink_cancel"><img src="http://images.barnesandnoble.com/presources/community/images/btn_cancel.gif" /></button></form></div>';

	$.global.CreateListPrompt = new $.Confirm({
	    heading: "Create a new EssentiaList",
	    id: "myCreateListPrompt",
	    content: $.global.AddToListCreateListPrompt,
	    cancel: {path: "button.create_listlink_cancel", action: function() {
			$("input.new_list_inputTitle").val("");
		    $("textarea.new_list_Description").val("");
			$("#createEssentialistForm div.errorMsg").remove();
			$.global.CreateListPrompt.close();
		   return true;
	    }},
	    ok: {path: "button.create_listlink_okay", action: function() {
			ui.request({
				baseURL: $.hosts.commServices,
				errorMsgHolder: $(newListTargetHolder),
				parameters: "?uiAction=CreateListForLinkOnly&page=List&pageType=listCreate&ean=" + $.global.CreateListPrompt.ean + "&productCode="+$.global.CreateListPrompt.productCode +"&privacy=1&" + $("#createEssentialistForm").find(":input").serialize(),
				callback: {name: 'cbf', value: 'addListToProductOrResultPage'}
			});

			// this must return FALSE, leaving the prompt open until a service is return with no error to close it.  Otherwise a the error will be shoen on the still open prompt.
			return false;
	    }}
	});

	 // Set Up all ui Prompt overlays
			   CreateWishListPrompt_Content ='<div style="padding: 20px;"><form id="createWishListForm"> \
				<span class="CreateWishListPrompt_ErrorHolder" style="display:none;"><span style="color:#DD0000; font-weight:bold">Please enter a title.</span></span> \
				<span class="CreateWishListPrompt_LabelHolder" style="font-weight:bold; font-size:10px;">Please name your Wish Lists:</span>																					\
				<span style="font-weight:bold; font-size:10px;" class="CreateWishListPromptTitle"></span><br/>																								\
				<input type="text" class="new_WishList_inputTitle" maxlength="100" value="New Wish List" style="width: 360px; height: 30px; color:#666;font-size:16px;margin-top:4px;" />			\
				<br/>																																													\
				<br/>																																													\
				<span style="font-weight:bold; font-size:10px;">You may add a description of the list:</span>																							\
				<br />																																													\
				<textarea class="new_WishList_Description" style="width: 360px; height: 60px;color:#666666; font-size:12px;margin-top:4px; font-family: verdana, arial, sans-serif;"></textarea>													\
				<br/>																																													\
				<br/>																																													\
				<button class="create_okay"><img src="http://images.barnesandnoble.com/presources/community/images/btn_submit.gif" /></button>															\
				<button class="create_cancel"><img src="http://images.barnesandnoble.com/presources/community/images/btn_cancel.gif" /></button>														\
			</form></div>																																														\
			';



		$.global.CreateWishListPrompt = new $.Confirm({
			  heading: "Create a new Wish List",
			  id: "myCreateWishListPrompt",
			  content: CreateWishListPrompt_Content,
			  cancel: {path: "button.create_cancel", action: function() {

					/*if ($('#create_WishList_popup_trigger').exists()) {
						window.location = "WishList.aspx";
					}
					*/
					$("input.new_WishList_inputTitle").val("");
					$("textarea.new_WishList_Description").val("");
					$("#createWishListForm div.errorMsg").remove();
					return true;
			  }},
			  ok: {path: "button.create_okay", action: function() {

					if ($("#createWishListForm .new_WishList_inputTitle").val() != "") {

						myParameters = "?uiAction=CreateWishListForLinkOnly&page=WishList&pageType=WishListCreate&ean=" + $.global.CreateWishListPrompt.ean + "&productCode="+$.global.CreateWishListPrompt.productCode +"&privacy=1&title=" + encodeURIComponent($("#createWishListForm input.new_WishList_inputTitle").val());
						if (String($("#createWishListForm input.new_WishList_Description").val()) != "") {
							myParameters  += '&desc=' + encodeURIComponent($("#createWishListForm .new_WishList_Description").val());
						}

						ui.request({
							baseURL: $.hosts.commServices,
							parameters: myParameters,
							errorMsgHolder: $('newWishList'), 
							callback: {name: 'cbf', value: 'addWishListToDropdown'}
						});
						return false;
					}
					else {
						$(".CreateWishListPrompt_ErrorHolder").show();
						return false;
					}
			  }}

		});
	}
	
});

function adjustListWrap() {
	var $listWrap = $("#subList ul.listWrap");
	if($listWrap.position().innerHeight > 250) {
		$listWrap.css({overflow: "auto", height: 250});
	} else {
		if(!$.browser.msie) {
			$listWrap.css({"overflow-x": "hidden", "overflow-y": "auto", height: "auto"});
		}
	}
}

function addListToProductOrResultPage (response, MsgHolder) {
	

	
	if($(MsgHolder).hasClass('newEssentialistAccordian')) { // Then handle this special case of returning a successful list creation to the accordian where it came from
		addListToAccordian (response, MsgHolder);
	}
	else {
		// else add it to the AddToList-drop down as a new list...
		addListToDropdown(response) 
	}

	return;

}

function addListToAccordian (response, MsgHolder) {
	
	if(response.status=='False') {
		
		showPopUpError (response.output, "", "Error Creating EssentiaList")
		//$(MsgHolder).parents('.addListToAccordian_result').html(response.output);
	}
	else {
		
		var $response = $("<div>"+response.output+"</div>");

		$(MsgHolder).parents('.addListToAccordian_result').html($response.find("li.forDropdown").html()); 
		$(MsgHolder).parents('.addListToAccordian_result').append($response.find("li.forTempList").html());
    	$("new_list_inputTitle").val("");
    	$("new_list_Description").val("");
		$("#createEssentialistForm div.errorMsg").remove();

		$.global.CreateListPrompt.close();

		// increment counter in page markup for future error messageing:
		$('.userEssentiaListCount:first').text(String(Number($('.userEssentiaListCount:first').text()) + 1));

		
		//$(MsgHolder).parents('.addListToAccordian_result').html('Great');
	}
	
}

function addListToDropdown(response) {
	

	if(response.status != "False") {
		var $response = $("<div>"+response.output+"</div>");
		//adjustListWrap();

		$("#essentiaListsBox").prepend($response.find("li.forDropdown").html());
		$("#listData ul.essentiaListsBox").prepend($response.find("li.forTempList").html());
    	$("new_list_inputTitle").val("");
    	$("new_list_Description").val("");
		$("#createEssentialistForm div.errorMsg").remove();
		
		var $listWrap = $("ul.listWrap");
		if($listWrap.height() < 220) {
			$listWrap.css({height: "auto", overflow: "visible"});
		} else {
			$listWrap.css({height: "220px", overflow: "auto", "overflow-x": "hidden"});
		}
		
		$.global.CreateListPrompt.close();
		
		// increment counter in page markup for future error messageing:
		$('.userEssentiaListCount:first').text(String(Number($('.userEssentiaListCount:first').text()) + 1));

		
	} else {

		var $form = $("#createEssentialistForm");
		if($("#createEssentialistForm div.errorMsg").get(0) != null) {
			$("#createEssentialistForm div.errorMsg").html(response.output);
			$("#createEssentialistForm div.errorMsg").show();
		} else {
			$form.prepend("<div class='errorMsg' style='display:block;'>" + response.output + "</div>");
		}
		
	}
}

function addWishListToDropdown(response) {
	if(response.status != "False") {
		var $response = $("<div>"+response.output+"</div>");
		adjustListWrap();
		$("#essentiaListsBox").prepend($response.find("li.forDropdown").html());
		$("#listData ul.essentiaListsBox").prepend($response.find("li.forTempList").html());
	    $("input.new_WishList_inputTitle").val("");
	    $("textarea.new_WishList_Description").val("");
		$("#createWishListForm div.errorMsg").remove();
		
		var $listWrap = $("ul.listWrap");
		if($listWrap.height() < 220) {
			$listWrap.css({height: "auto", overflow: "visible"});
		} else {
			$listWrap.css({height: "220px", overflow: "auto", "overflow-x": "hidden"});
		}	
		
		$.global.CreateWishListPrompt.close();
		$('.userWishlistCount:first').text(String(Number($('.userWishlistCount:first').text()) + 1));		
	} else {
		var $form = $("#createWishListForm");
		if($("#createWishListForm div.errorMsg").get(0) != null) {
			$("#createWishListForm div.errorMsg").show().html(response.output);
		} else {
			$form.prepend("<div class='errorMsg' style='display: block'>" + response.output + "</div>");
		}
	}
}




function canUseEmailOrShare() {
    var pt = getPageType();
    if(pt=="libraryOwner" || pt=="favBKOwner" || pt=="favDVOwner" || pt=="favMUOwner" || pt=="favRNOwner" || pt=="profileOwner" || pt=="profileOwnerMyPublic") {
        if(getProfilePrivacyLevel() == "Private") return false;
    } else if ( pt=="wishlistOwner" ) {
		if ( $('#thisWishListPrivacy').val() == "Private") return false;
	}
    return true;
}



// Basic helper values
$.global.monthNames = ['January','February','March','April','May ','June','July','August','September','October','November','December'];
$.global.weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	
$.global.makeOrdinalDate = function (dateObj) {
	
	var date = (new Date(dateObj)).getDate();
	var ordinal = "";	
	if (date == 1 || date == 21 || date == 31) {
		ordinal = 'st';
	}
	else if (date == 2 || date== 22) {
		ordinal ='nd';	
	}
	else if (date == 3 || date == 23) {
		ordinal ='rd';	
	}
	else if (date >= 4) {
		ordinal ='th';	
	}
	
	return date + ordinal;
}
		   

//**********************************
//	Class: EmailAFriend
//**********************************
$.EmailAFriend = function(params) {
    var self = this;
    self.toEmail = null;
    self.fromEmail = null;
    self.personalNote = null;
    self.fromName = null;
    self.ean = null;
    self.isReady = false; // currently only used for ActivityFeed invites
    self.productType = null;
    self.emailItemHTML = null;

    var settings = $.extend({
        heading: "Email Your Friend",
        overlay: null
    }, params);

    // The following global variables have been added to handle / show conditions for BN Review pages
    var findContentvalue = new RegExp("(?:contentvalue)=([0-9]*)&?", "i");
    var findContentType = new RegExp("(?:&|&amp;)(?:contenttype)=([A-Z]*)&?", "i");
    var findInputType = new RegExp("(?:&|&amp;|[?])(?:inputtype)=([A-Z]*)&?", "i");
    var findProductCode = new RegExp("(?:&|&amp;)(?:productCode)=([A-Z]*)&?", "i");

    var isForBNReview = false;
    var isForCommunity = false;
    var isForQue = false;
    var isForStoreEvent = false;
    var isForGeneric = false;
    var isForEBooks = false; // eBooks is the first product line that will be using the Community servers to send emails, all others still use Portal.  This means that eBooks will be treated differently then all other TAF expereiences on other product lines, 5-4-09
    var isForActivityInvite = false;
    var isForLending = false;
    var lendDeliveryID = "";
    var commContentValue = null;
    var commContentType = null;
    var commInputType = null;
    var StoreEventWidth = 725;
    var GenericWidth = 725;
    var QueWidth = 625;
    var StoreEventWidthOriginal = 725;
    var eventTargetId = "";
    var headerCopy = "Tell a friend about this item at Barnes & Noble.com.";
    var useContentValue = false;
    var foundContentValue = "";
    var foundContentType = "";
    var foundInputType = null;
    var inputType = null;
    var productCode = null;
    var contentValue = null;
    var contentType = null;
    var formDomId = "overlay_emailAFriend";  // This will be overridden later if isForActivityInvite == true, because this is the only time when an TAF object is used to handle to types of emails (profile and community invite) on the same page load, and thus a different DOM id is required.
    var isEmailNotFoundTAFMode = null

    var instructionCaptcha = "You may use upper- or lower-case letters";

    var errors = {
        msgRequiredField: "Some required fields have been left blank. Please fill in the designated fields below.",
        msgInvalidSenderEmail: "Your email address was not formatted correctly. Please reenter it. Each address must follow this format: yourname@domain.com.",
        msgInvalidRecipientEmails: "The recipient email address you entered was not formatted correctly. Please check the email address and reenter it. Each address must follow this format: recipientname@domain.com.",
        msgTooManySenderEmails: "Only one sender address can be used for Email a Friend. Please edit your entry.",
        msgTooManyEmails: "You have exceeded the limit of 5 recipients per email. Please edit your recipient email addresses. You can always send a second email to additional recipients.",
        msgTooManyCommEmails: "You have exceeded the limit of 25 recipients per email. Please edit your recipient email addresses. You can always send a second email to additional recipients.",
        msgCharsNotAllowed: "Your message contains one or more characters that cannot be used by this email system for security reasons.  Please remove any of the following characters  : ; $ <> () ! # % +  from your message.",
        msgPersonalNoteLength: "Your message is too long. It must be 400 characters or less.  It has been shortened to this length."
    };

    var firstTime = 1;
    var firstTimeActivityInvite = 1;
    var findEAN = new RegExp("(?:EAN|ISBN)=([0-9]{10,13})&?", "i");
    var findProductType = new RegExp("(?:&|&amp;)(?:ProductType)=([A-Z]{2})&?", "i");

    function init() {

        if (!isForActivityInvite) {
            $("a.emailAFriend").click(function(e) {
                self.open(e);
            });
        }
        $(document).delegate("click", {
            "#toEmail": clear
        });
    }

    function clear(e) {
        var $target = $(e.target);
        if (!$target.data("cleared")) {
            $target.val("");
            $target.data("cleared", 1);
        }
    }

    function getCommParameterValues(e) {

        var href = String($(e.target).attr('href'))
        commContentValue = (((href).split('contentValue='))[1]).split('&')[0];
        commContentType = (((href).split('contentType='))[1]).split('&')[0];
        commInputType = (((href).split('inputType='))[1]).split('&')[0];
        return;
    }


    function ApplyActionListners(markupTarget) {


        $(markupTarget).delegate("click", {
            "img.sendAnother": sendAnother,
            "img.tafCloseBtn": self.close,
            "a.overlayClose": self.close,
            "button.preview": preview,
            "img.preview": preview,
            ".continue": continueEAF,
            "button.edit": returnToEdit,
            "input.SecurityCode": resetSecurityCode,
            "div.dialog_close": closeCaptcha,
            "a.refreshCaptcha": refreshCaptcha,
            "button.SendEmail": sendEmail
        });
    }

    self.open = function(e) {
        e.preventDefault(e);

        var overlayWidth = 470;

        if ($(e.target).hasClass("community")) {
            isForCommunity = true;
        }
        if ($(e.target).hasClass("activityInvite")) {
            //alert('this is for Activity Invite');
            isForActivityInvite = true;
            formDomId = "overlay_ActivityInvite";
            getCommParameterValues(e);

        }

        if ($('body').hasClass("pl-store")) {
            isForQue = true;
        }

        if ($(e.target).hasClass("forLending")) {
            isForLending = true;
            lendDeliveryID = (((String($(e.target).attr('href'))).split('LendDeliveryID='))[1]).split('&')[0];
        }

        if ($(e.target).hasClass("storeEvent")) {
            isForStoreEvent = true;
            overlayWidth = StoreEventWidth;
            eventTargetId = (((String($(e.target).attr('href'))).split('contentValue='))[1]).split('&')[0];
        }

        if ($(e.target).hasClass("generic")) {
            isForGeneric = true;
            getCommParameterValues(e);
        }

        var targetHREF = $(e.target).get(0).href;

        foundContentValue = targetHREF.match(findContentvalue);

        if (foundContentValue && foundContentValue.length == 2) {
            contentValue = foundContentValue[1];
            useContentValue = true;
        }

        foundContentType = targetHREF.match(findContentType);
        if (foundContentType && foundContentType.length == 2) {
            contentType = foundContentType[1];
        }


        checkAndSetIfBNReview(e);

        if (firstTime && firstTimeActivityInvite) { // ie: this should only happen once
            getCSS();
        }


        if (isForActivityInvite) { // this is for ActivityInvite and the overlay is not needed - it must instead use another overlay aleady in the Dom.


            $('.EmailAFriendContainerLTN').html('<div id="' + formDomId + '">' + createForm() + '</div>'); // assume the div.EmailAFriendContainerLTN exists and populate it with the TellAFriend Form created in Init().
            t = setTimeout("$('.EmailAFriendContainerLTN').show();", 300);

            ApplyActionListners("#" + formDomId);

            firstTimeActivityInvite = 0;
        }

        if (firstTime) {

            settings.overlay = new $.Overlay({
                useHeading: 1,
                heading: "Email this to friends"
            });
            settings.overlay.set.content(createForm());


            if (!isForActivityInvite) {
                settings.overlay.set.id(formDomId);
                ApplyActionListners("#" + formDomId);
                firstTime = 0;
            }

            settings.overlay.set.width(overlayWidth);
        }


        // thumbsSlider is for StoreEvents:

        $.global.thumbsSlider = new $.thumbsSlider;

        var ean = null;
        var productType = null;



        var found = targetHREF.match(findEAN);
        if (found && found.length == 2) { self.ean = found[1]; }

        var foundProductType = targetHREF.match(findProductType);
        if (foundProductType && foundProductType.length == 2) { self.productType = foundProductType[1]; }



        var foundInputType = targetHREF.match(findInputType);
        if (foundInputType) {
            inputType = foundInputType[1];
        }

        var pt = "";
        var foundProductCode = targetHREF.match(findProductCode);


        if (foundProductCode) {
            productCode = foundProductCode[1];
            if (productCode != null) {
                pt = "&productCode=" + productCode;
                if (contentType != 'CommLibrary') {
                    //this change prevents contentType and value from being overwritten on community emails with the
                    //switch from portal to .net for product emails
                    isForEBooks = true;
                    inputType = "EAN";
                    contentType = "bnproduct";
                    contentValue = self.ean;
                }
            }

        }



        var url = "";
        if (useContentValue) {
            url = "?contentValue=" + contentValue + "&contenttype=" + contentType;
        } else {
            url = "?ean=" + self.ean + "&ProductType=" + self.productType;
        }

        // == Get Form Content, such as product data, an event time, date and images, etc. == 

        if (self.emailItemHTML == null || isForStoreEvent || isForGeneric || isForEBooks || isForLending) {  // Store Events are the first type to appear More Then Once Per Page, so always ask for this data again
            if (!isForCommunity && !isForStoreEvent && !isForGeneric && !isForLending) {	// Then assume it is a Product Line	

                //              if (isForEBooks) {	// eBooks, a particular product line
                // all product tellafriends being moved off portal

                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + inputType + "&contentValue=" + contentValue + "&contentType=" + contentType + "&uiaction=LoadEmailScreen&ProductType=" + self.productType,
                    callback: { name: "cbf", value: "EmailAFriendItemData" }
                });
                /*            }
                else {	// it 'must be' a different product line
                ui.request({

                        baseURL: "http://portal.barnesandnoble.com/TellAFriend/ajax_ProductData.asp",
                parameters: url,
                callback: { name: "cbf", value: "EmailAFriendItemData" }
                });

             } 
                */
            }
            else if (isForLending) {
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=EAN&contentValue=" + contentValue + "&contentType=lendebook&LendDeliveryID=" + lendDeliveryID + "&uiaction=LoadEmailScreen",
                    callback: { name: "cbf", value: "EmailAFriendItemData" }
                });
            }

            else if (isForStoreEvent) {
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=EventID&contentValue=" + eventTargetId + "&contentType=StoreEvent&uiaction=LoadEmailScreen&stampimg=Use_this",
                    callback: { name: "cbf", value: "EmailAFriendEventData" }
                });
            }
            else if (isForGeneric) {
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=CDS2PID&contentValue=" + commContentValue + "&contentType=" + commContentType + "&uiaction=LoadEmailScreen",
                    callback: { name: "cbf", value: "EmailAFriendGenericData" }
                });
            }
            else {
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + inputType + "&contentValue=" + contentValue + "&contentType=" + contentType + "&uiaction=LoadEmailScreen" + pt,
                    callback: { name: "cbf", value: "EmailAFriendItemData" }
                });
            }

        } else if (!isForActivityInvite) {
            $("#" + formDomId + " div.productDetails").html(self.emailItemHTML);
            getUserData();
        }

        if (!isForActivityInvite) { // isForActivityInvite was handled above (before listeners were applied)
            t = setTimeout("$.global.EmailAFriend.open_new_overlay()", 200);
        }


    }

    this.open_new_overlay = function() {

        settings.overlay.open();

        var personalNote = $('.TAFstoreEventContent #PersonalNote');

        if (!isForCommunity) {
            /* This did not work in StoreLocator in Dev 3-6-09
            $(personalNote).maxLength(400, $(personalNote).siblings('span.charLimit'), 'Character remaining')	
            */
            $(personalNote).siblings('span.charLimit').text("There is a limit of 400 characters.");
        }



    }



    function checkAndSetIfBNReview(e) {
        // Inspect the QS and see if this is a page based on Content IDs and not an EAN # (ie: if is a BN Review page) and set flags accordingly
        var triggerLink = $(e.target).get(0);

        switch (foundContentValue) {
            case "review":
            case "feature":
            case "interview":
            case "contributor":
            case "contributors":
            case "longlist":
            case "spotlight":
            case "cds":
                isForBNReview = true;
                break;
        }





        // If this is a BN Review page, change the default header to one of the following conditions:
        if (isForBNReview) {
            contentTypeTest = String(contentType).toLowerCase();
            switch (contentTypeTest) {
                case "review":
                case "feature":
                    headerCopy = "Share this article from the Barnes &amp; Noble Review.";
                    break;
                case "interview":
                    headerCopy = "Share this interview from the Barnes &amp; Noble Review."
                    break;
                case "contributor":
                    headerCopy = "Share the work of this Barnes &amp; Noble contributor."
                    break;
                case "longlist":
                case "spotlight":
                case "contributors":
                case "cds":
                    headerCopy = " ";
                    break;
            }
        }

    }

    this.insertData = function(response) {
        if (response.innerhtml) {
            self.emailItemHTML = response.innerhtml;
        } else if (response.output) {
            self.emailItemHTML = response.output;
        }

        if (!isForActivityInvite) {
            $("#" + formDomId + " div.productDetails").html(self.emailItemHTML);
        }

        if (isForCommunity || isForActivityInvite) {
            var defaultPersonalNote = $("#defaultPersonalNote").text();
            $("#PersonalNote").val(defaultPersonalNote);
        }
        getUserData();
    }

    this.insertEventData = function(response) {
        this.insertData(response);
        formatEventData();
    }

    function formatEventData() {
        // grab hidden date string and format it for design and show:
        var eventDate = new Date($("#" + formDomId + " div.productDetails #TAFEventDateHolder").text());
        var ordinalDate = $.global.monthNames[eventDate.getMonth()] + " " + $.global.makeOrdinalDate(eventDate);
        var separator = ' &#8212; '; // an emdash

        if ($('#TAFEventDateTimeDisplay').html() == '') {
            separator = ""; // The Time may not be in the div, if it is an online event, so a seperator is erroneous.
        }
        $('#TAFEventDateTimeDisplay').prepend(ordinalDate + separator);

        // re-assign the name Barnes & Noble Booksellers to Barnes & Noble, if it exists
        if (($('#TAFEventAddressHolder .location').text()).indexOf('Noble Booksellers') != -1) {
            $('#TAFEventAddressHolder .location').html('Barnes &amp; Noble');
        }
        // Get the address data from the returned service and display it on the right side of the TAF overlay:
        $('#TAFstoreEventAddress').html($('#TAFEventAddressHolder').html());

        if ($('#TAFOnlineEventFlag').exists()) {
            // Then adjust for wide image in of 'Online Event' in right side content:
            StoreEventWidth = 830;
            settings.overlay.set.width(StoreEventWidth);
            $('.TAFstoreEventRightContent').css({ 'width': '315' });
            $('.eventStampContainer').css({ 'width': '290', 'padding-left': '15px' });
        }
        else {
            StoreEventWidth = StoreEventWidthOriginal;
            // This is needed if the user s switching from online event back to regular event without leaving the page.
        }
    }

    function getUserData() {
        ui.request({
            baseURL: "http://portal.barnesandnoble.com/TellAFriend/ajax_BNPDS.asp",
            parameters: "?x=y",
            callback: { name: "CBF", value: "insertUserData" }
        });
    }

    this.insertUserData = function(response) {
        if (response.status == "0") {
            $("#" + formDomId + " .senderEmail").get(0).value = response.senderemail;
            $("#" + formDomId + " .senderName").get(0).value = response.sendername;
        }
    }

    this.close = function(e) {
        if (e) { e.preventDefault(e); }

        if (isForActivityInvite) {
            formDomId = "overlay_emailAFriend"; // this is reset here in-case the taf needs to be reopenned for a none-invite email on the profile page.
            self.emailItemHTML = null; 			// this also must be reset in case the next TAF openning is for the profile email.
        }

        if (!isForActivityInvite) {
            settings.overlay.set.content(createForm());
            settings.overlay.close();
        }

        isForCommunity = false;
        isForStoreEvent = false;
        isForGeneric = false;
        isForEBooks = false;
        isForActivityInvite = false;


    }

    function preview(e) {
        e.preventDefault(e);

        var params = null;
        var formVals = $("#" + formDomId + " .emailFriendForm").serialize();



        if (validate()) {
            /*
            if (isForEBooks) {
            //alert('test sending');
            //product check is now at the bottom - ebooks are no longer treated as a special case

            }
            else 
            */
            if (isForStoreEvent) {

                var stampToUse = getSelectedStamp();

                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=EventID&contentValue=" + eventTargetId + "&contentType=StoreEvent&uiaction=LoadPreview&stampimg=" + stampToUse + "&" + $("#" + formDomId + " .emailFriendForm").serialize(),
                    callback: { name: "cbf", value: "showPreview" }
                });
            }
            else if (isForGeneric || isForActivityInvite) {

                var currentLocation = location.href;

                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + commInputType + "&contentValue=" + commContentValue + "&contentType=" + commContentType + "&uiaction=LoadPreview&" + $("#" + formDomId + " .emailFriendForm").serialize(),
                    callback: { name: "cbf", value: "showPreview" }
                });

            }

            else if (isForCommunity) {
                // Emailing a Community does not have a preview at this time.
            }

            else {
                // portal no longer used - leaving for temporary testing purposes
                /* ui.request({
                baseURL: "http://portal.barnesandnoble.com/TellAFriend/ajax_EmailPreview.asp",
                parameters: "?SenderName=" + encodeURIComponent(self.fromName) + "&SenderEmail=" + self.fromEmail + "&RecipientEmails=" + self.toEmail + "&PersonalNote=" + encodeURIComponent(self.personalNote) + "&PageURL=" + encodeURIComponent(document.location) + "&PageTitle=Tell%20a%20friend&ProductType=" + self.productType + "&ean=" + self.ean,
                callback: { name: "CBF", value: "showPreview" }
                }); 	  
                */

                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + inputType + "&uiaction=LoadPreview&ProductType=" + self.productType + "&contentType=" + contentType + "&contentValue=" + contentValue + "&SenderName=" + encodeURIComponent(self.fromName) + "&SenderEmail=" + self.fromEmail + "&RecipientEmails=" + self.toEmail + "&PersonalNote=" + encodeURIComponent(self.personalNote),
                    callback: { name: "CBF", value: "showPreview" }
                });

            }
        }
    }

    function validate() {
        var fields = $("#" + formDomId + " .emailFriendForm").serializeArray();
        self.toEmail = fields[0].value;
        self.personalNote = fields[1].value;
        self.fromName = fields[2].value;
        self.fromEmail = fields[3].value;
        if (fields[4]) {
            self.SendMeCopy = fields[4].value || null;
        }

        $("#" + formDomId + " .emailFriendForm tr").removeClass("error")
        var invalid = 0;
        $("#" + formDomId + " .emailFriendErrors").html("");
        $("#" + formDomId + " .emailFriendErrors").hide()

        if (self.toEmail == "" || self.fromName == "" || self.fromEmail == "") {
            error("Some required fields have been left blank. Please fill in the designated fields below.");
            $("#" + formDomId + " .emailFriendForm .required").each(function(index, item) {
                if (item.value == "") {
                    $(item).parents("tr").removeClass("error").addClass("error");
                    invalid++;
                }
            });

        }

        /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Recipient Email
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        if (!validateRecipientsEmailField(self.toEmail)) {
            invalid++;
        }

        /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Sender Name
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]\*\/\#\%\$\!\&\@\.\^\+\=\{\}\|\?\~\`]/
        if (self.fromName.match(illegalChars) || self.fromName == "") {
            error(errors.msgCharsNotAllowed);
            $("#" + formDomId + " .senderName").parents("tr").removeClass("error").addClass("error");
            invalid++;
        }

        /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Sender Email
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
        if (self.fromEmail.split(",").length > 1) {
            error(errors.msgTooManySenderEmails);
            $("#" + formDomId + " .senderEmail").parents("tr").removeClass("error").addClass("error");
        }


        if (!validateEmail(self.fromEmail)) {
            error(errors.msgInvalidSenderEmail);
            invalid++;
            $("#" + formDomId + " .senderEmail").parents("tr").removeClass("error").addClass("error");
        }

        /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Temporary Personal Note - 3-6-09
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

        if (String(self.personalNote).length > 400) {
            error(errors.msgPersonalNoteLength);
            invalid++;
            $("#PersonalNote").parents("tr").removeClass("error").addClass("error");
            $("#PersonalNote").val(String(self.personalNote).slice(0, 399))
        }


        if (!invalid) {
            return true;
        } else {
            $("#" + formDomId + " .emailFriendErrors").show();
            if (isForStoreEvent) {
                $("#" + formDomId + " .emailFriendErrors").css({ 'width': '440' });
            }
            return false;
        }

    }

    function validateRecipientsEmailField(inputObj) {
        var numOfErrors = 0;
        var numOfInvalidEmails = 0;
        var strng = String(inputObj).replace(/^\s+|\s+$/g, '');

        //if (strng==instructionRecipientEmails || strng=="") {
        if (strng == "") {
            numOfErrors++;
        }

        /* Removed to allow for 'postings' of if up to 25 email addresses - 12-3-08 - :
        if (strng.length > 250) {
        error("The recipient field is limited to 250 characters.");
        numOfErrors
        }
        */

        var emails;
        if (strng.indexOf(";") > -1) {
            emails = formatEmails(strng).split(",");
        } else {
            emails = strng.split(",");
        }

        if (emails.length > 5 && !isForCommunity && !isForActivityInvite) {
            error(errors.msgTooManyEmails);
            numOfErrors++
        } else if (emails.length > 25 && (isForCommunity || isForActivityInvite)) {
            error(errors.msgTooManyCommEmails);
            numOfErrors++
        }

        for (var i = 0; i < emails.length; i++) {
            if (!validateEmail(emails[i])) {
                numOfInvalidEmails++
                numOfErrors++;
            }
        }

        if (numOfInvalidEmails > 0) {
            error(errors.msgInvalidRecipientEmails);
        }

        if (numOfErrors > 0) {
            $("#toEmail").parents("tr").removeClass("error").addClass("error");
            return false;
        }

        return true;
    }

    function formatEmails(emails) {
        delim = ",;";
        strng = "";
        i = 0;
        for (index = 0; index < emails.length; index++) {
            character = emails.substr(index, 1);
            if (delim.indexOf(character) > -1) {
                strng += emails.substring(i, index) + ",";
                i = index + 1;
            }
        }

        strng += emails.substring(i, emails.length);

        $("#toEmail").val(strng);
        return strng;
    }

    this.showPreview = function(response) {

        if (response.innerhtml) {
            $("#previewContent").html(response.innerhtml);
        } else {
            $("#previewContent").html(response.output);
        }
        $("#" + formDomId + " .emailFriendForm").hide();
        $("div.productDetails").hide();
        $("#emailAFriendPreview").show();

        if (isForActivityInvite) {
            $.global.buildCommunityPopup.extendForPreview();
            $("#previewContent").prepend("<h3>Preview your email below:</h3>");
        }
        else if (isForStoreEvent) {
            // there are many special design changes just for Store Events that these take care of:
            settings.overlay.set.width(StoreEventWidth + 25);
            $('.TAFstoreEventRightContent').hide();
            $('.TAFstoreEventContent').removeClass('TAFstoreEventContent').addClass('TAFstoreEventContentPreview');
            // original design, but overidden for lack of time / buttons: $('#emailAFriendContent').css({'background-color':'#b2ac9e'});
            $('#previewContent').css({ 'padding-bottom': '9px', 'padding-top': '9px' });
            $('#TAFButtonVisibility').css('padding-left', '300px');
        }
        else if (isForGeneric) {
            settings.overlay.set.width(GenericWidth + 25);
        }
        else if (isForQue) {
            settings.overlay.set.width(QueWidth + 25);

            //this is for a custom header to overlays in IE that isn't behaving properly
            if (jQuery.browser.msie) {
                $('.overlayHeader h3').css("width", "622");
            }
        }

        $('#requiredTAFFieldLabel').hide();
    }

    function error(msg) {
        $("#" + formDomId + " .emailFriendErrors").append("<p>" + msg + "</p>")
    }

    function resetSecurityCode(e) {
        var securityCodeField = $(e.target).get(0);
        //securityCodeField.style.color = defaultTextColor;
        if (securityCodeField.value == instructionCaptcha) {
            //resetInputField(securityCodeField);
            securityCodeField.value = "";
        }
    }

    function sendAnother(e) {
        e.preventDefault(e);

        settings.overlay.set.content(createForm());
        $("#" + formDomId + " div.productDetails").html(self.emailItemHTML);
        if (isForStoreEvent) {
            formatEventData();
            settings.overlay.set.width(StoreEventWidth)
        }
        else if (isForGeneric || isForQue) {
            settings.overlay.set.width(435);
            //this is for a custom header to overlays in IE that isn't behaving properly
            if (jQuery.browser.msie && isForQue) {
                $('.overlayHeader h3').css("width", "481");
            }
        }

        $.global.thumbsSlider = new $.thumbsSlider();

        getUserData();
    }

    function addWBRs(string) {
        // adds a wbr element which is like an invisible space, this allows the urls to break properly.
        var chars = string.split("");
        var result = "";
        $(chars).each(function(index, item) {
            result += chars[index] + "<wbr />";
        });
        return result;
    }

    function createForm() {
        var requiredField = "<img src='" + BN.Environment.ImageLink.getPath("/presources/community/images/requiredField.png") + "'/>";
        var url = location.href;
        var urlDisplay = "";
        var thumbsGallery = "";
        var form = "";
        var OverlayHTML = "";
        var contentClass = "";
        var previewBtn = "";
        var numAddressesLabel = "five";
        var storeEventRightContent = "";
        var storeEventRightContentClosing = "";
        var button_continue = "btn_continue.png"
        var button_preview = "";
        var inviteHeader = "";

        if ($("#taf-permalink").get(0) != null) {
            url = addWBRs($("#taf-permalink").html());
        }

        if (isForCommunity || isForActivityInvite) {
            numAddressesLabel = "25";
        }

        if (isForActivityInvite) {
            requiredField = "*";
            button_continue = "btn_continue_bold.gif";
            isEmailNotFoundTAFMode = $.global.isEmailNotFoundMode;
        }

        if (isForStoreEvent) {
            contentClass = ' TAFstoreEventContent';
        }

        if (!isForBNReview && !isForCommunity && !isForActivityInvite) {
            previewBtn = "<button class='preview'><img class='preview' alt='Preview' src='" + BN.Environment.ImageLink.getPath("/presources/community/images/btn_preview.png") + "' /></button>"

        }
        else if (isForActivityInvite) {
            previewBtn = "<button class='preview'><img class='preview' alt='Preview' src='" + BN.Environment.ImageLink.getPath("/presources/community/images/btn_preview_bold.gif") + "' /></button>"
        }



        if (!isForStoreEvent && !isForActivityInvite) {
            urlDisplay = "<tr valign='top'>	\
									<td class='formLabel'>	\
										<b>URL:</b>	\
									</td>	\
									<td>	\
									</td>	\
									<td>	\
										<strong>" + url + "</strong>	\
									</td>	\
								</tr>";
        }


        if (isForStoreEvent) {
            thumbsGallery = "<tr valign='top'>	\
									<td colspan='3' class='formLabel'>	\
										<b>	\
											Choose a Stamp for Your Electronic Postcard:	\
										</b>	\
										<div class='thumbGallery'>	\
										<a rel='prev' class='arrow previous' href='#' style='display: inline;'></a>	\
										<a rel='next' class='arrow next' href=''></a>	\
										<div class='thumbGalleryItems' id='thumbGalleryItems'>	\
											<ul >	\
												<li class='currentPage'>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Alcott_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Angelou_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/BronteSisters_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Dickens_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Dickinson_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Douglas_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Emerson_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Hawthorne_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Hughes_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Joyce_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/McMillan_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Michener_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Mosley_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Poe_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Shakespeare_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Thoreau_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Verne_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Walker_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Whitman_off.jpg'/>	\
												</li>	\
												<li>	\
													<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Wilde_off.jpg'/>	\
												</li>	\
												\
											</ul>	\
										</div>	\
									</div>	\
								</td>	\
							</tr>";
        }

        if (isForActivityInvite) {
            inviteHeader = '<div class="TAF_InviteHeader">	\
									<div class="pageProgressIndicator"><div class="page1"/></div>	\
									<h3>Tell your friends about My B&amp;N...</h3>	\
									* Indicates Required Field	\
								</div>';
            if (isEmailNotFoundTAFMode) {
                inviteHeader = '<div class="TAF_InviteHeader">	\
										<div class="pageProgressIndicator"><div class="page1"/></div>	\
										<h3>We\'re sorry - that person does not have a public profile at My B&amp;N. Use this form to invite them!</h3>	\
										* Indicates Required Field	\
									</div>';

            }

        }



        form = "<form class='emailFriendForm'>	\
							" + inviteHeader + "		\
							<table cellpadding='0' cellspacing='0'>	\
								<tr valign='top'>	\
									<td class='formLabel'>	\
										<b>To:</b>	\
									</td>	\
									<td>" + requiredField + "</td>	\
									<td>	\
										<textarea rows='1' name='RecipientEmails' id='toEmail' class='required'></textarea>	\
										<div class='toFieldLabel'>(Separate email addresses by commas. Limit of  " + numAddressesLabel + ".) </div>	\
									</td>	\
								</tr>	\
								<tr valign='top'>	\
									<td class='formLabel'>	\
										<b>Personal Message:</b>	\
									</td>	\
									<td>	\
									</td>	\
									<td><textarea id='PersonalNote' name='PersonalNote' rows='4'></textarea>	<br/>\
										<span class='charLimit'></span>	\
									</td>	\
								</tr>	\
								" + urlDisplay + "	\
								" + thumbsGallery + "	\
								<tr valign='top'>	\
									<td class='formLabel'>	\
										<b>Your Name:</b>	\
									</td>	\
									<td>" + requiredField + "</td>	\
									<td>	\
										<input type='text' name='SenderName' class='senderName required'/>	\
									</td>	\
								</tr>	\
								<tr valign='top'>	\
									<td class='formLabel'>	\
										<b>Your Email Address:</b>	\
									</td>	\
									<td>" + requiredField + "</td>	\
									<td>	\
										<input type='text' name='SenderEmail' class='senderEmail required'/>	\
									</td>	\
								</tr>	\
								<tr>	\
									<td colspan='2'></td>	\
									<td class='emailFriendOptions'>	\
										<input type='checkbox' class='checkbox' name='SendMeCopy' />Send me a copy of this email</td></tr><tr><td colspan='2'>	\
									</td>	\
									<td class='emailFriendButtons'>	\
										<table cellspacing='0' cellpadding='0' border='0'>	\
											<tr>	\
												<td>	\
													" + previewBtn + "	\
												</td>	\
												<td>	\
													<button class='continue'><img class='continue' alt='Continue' src='" + BN.Environment.ImageLink.getPath("/presources/community/images/" + button_continue) + "' /></button>	\
												</td>	\
											</tr>	\
										</table>	\
									</td>	\
								</tr>	\
								<tr valign='top'>	\
									<td colspan='3' class='communityFootNote'>	\
										<br/>	\
										Email addresses will not be stored or used for any promotional purpose.	\
									</td>	\
								</tr>	\
							</table>	\
						</form>";


        //OverlayHTML = storeEventRightContent + 
        if (!isForStoreEvent) {
            OverlayHTML = '<div class="captchaBlocker">	\
							</div>	\
							<div class="captcha">	\
							</div>	\
							<div class="emailFriendErrors">	\
							</div>	\
							<div class="productDetails">	\
							</div>	\
							<div class="emailAFriendContent ' + contentClass + '">	\
							' + form + '	\
									<div class="emailAFriendConfirm">	\
									</div>	\
									<div id="emailAFriendPreview">	\
									<div id="previewContent">	\
									</div>	\
									<div id="TAFButtonVisibility">	\
										<button id="EditButton" class="edit">Edit</button>	\
										<button id="ContinueButton" class="continue">Continue</button>	\
									</div>	\
								</div>	\
							</div>	\
							<div id="emailAFriendFooter">	\
								<span id="requiredTAFFieldLabel">' + requiredField + ' Indicates Required Field</span> <br/>	\
								Email addresses will not be stored or used for any promotional purpose.<br/>	\
								See our ' + BN.Environment.Text.getText('PrivacyLink') + ' \
								<br/>	\
								<br/>	\
								<br/>	\
								<a href="#">	\
									<img class="tafCloseBtn" src="' + BN.Environment.ImageLink.getPath('/presources/community/images/btn_closewindow.gif') + '" />	\
								</a>	\
								<a href="#">	\
									<img class="sendAnother" src="' + BN.Environment.ImageLink.getPath('/presources/community/images/btn_sendanother.gif') + '" />	\
								</a>	\
							</div>';
        }
        else {	// isForStoreEvent = true



            storeEventRightContent = "<div class='TAFstoreEventRightContent'>	\
											<div class='eventStampContainer'>	\
												<img src='" + $.hosts.resources + "/presources/storelocator/images/tellafriend/stamps/Alcott_stamped.jpg' height='129'/>	\
											</div>	\
											<div id='TAFstoreEventAddress'>	\
											</div>	\
										</div>";


            storeEventRightContentClosing = '';


            OverlayHTML = storeEventRightContent + '<div class="captchaBlocker">	\
							</div>	\
							<div class="captcha">	\
							</div>	\
							<div class="emailFriendErrors">	\
							</div>	\
							<div id="emailAFriendContent" class="' + contentClass + '">	\
							<div class="productDetails">	\
							</div>	\
							' + form + '	\
									<div class="emailAFriendConfirm">	\
									</div>	\
									<div id="emailAFriendPreview">	\
									<div id="previewContent">	\
									</div>	\
									<div id="TAFButtonVisibility">	\
										<button id="EditButton" class="edit">Edit</button>	\
										<button id="ContinueButton" class="continue">Continue</button>	\
									</div>	\
								</div>	\
							</div>	\
							<div id="emailAFriendFooter">	\
								<span id="requiredTAFFieldLabel">' + requiredField + ' Indicates Required Field </span><br/>	\
								Email addresses will not be stored or used for any promotional purpose.<br/>	\
								See our ' + BN.Environment.Text.getText('PrivacyLink') + '	\
								<br/>	\
								<br/>	\
								<br/>	\
								<div class="confirmTAFActions"> \
								<a href="#">	\
									<img class="tafCloseBtn" src="' + BN.Environment.ImageLink.getPath('/presources/community/images/btn_closewindow.gif') + '" />	\
								</a>	\
								<a href="#">	\
									<img class="sendAnother" src="' + BN.Environment.ImageLink.getPath('/presources/community/images/btn_sendanother.gif') + '" />	\
								</a>	\
								</div> \
							</div>' + storeEventRightContentClosing;

        }

        return OverlayHTML;
    }

    function returnToEdit(e) {
        e.preventDefault(e);
        $("#emailAFriendPreview").hide();
        $("#" + formDomId + " .emailFriendForm").show();
        $("div.productDetails").show();

        $('#requiredTAFFieldLabel').show();

        if (isForActivityInvite) {
            $.global.buildCommunityPopup.setToNormalSize();
        }
        else if (isForStoreEvent) {
            settings.overlay.set.width(StoreEventWidth);
            $('.TAFstoreEventContentPreview').removeClass('TAFstoreEventContentPreview').addClass('TAFstoreEventContent');
            $('.TAFstoreEventRightContent').show();
        }
        else if (isForGeneric || isForQue) {
            settings.overlay.set.width(435);
            //this is for a custom overlay in pl that misbehaves in IE with all this resizing
            if (jQuery.browser.msie) {
                $('.overlayHeader h3').css("width", "481");
            }
        }
    }

    function getCSS() {
        var head = document.getElementsByTagName("head")[0];
        var css = document.createElement('link');
        css.type = 'text/css';
        css.rel = 'stylesheet';
        css.href = $.hosts.resources + '/presources/community/css/tellafriend.css';
        head.appendChild(css);
    }

    function validateEmail(email_address) {
        email_address = String(email_address).replace(/^\s+|\s+$/g, '');
        var email = /^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;
        if (!email.test(email_address)) {
            return false;
        }
        return true;
    }

    function continueEAF(e) {
        if (isForActivityInvite) {
            $.global.buildCommunityPopup.setToNormalSize();
        }

        e.preventDefault(e);

        if (validate()) {
            captcha();
        }
    }

    function captcha() {
        var $captchaBlocker = $("#" + formDomId + " .captchaBlocker");
        var $captcha = $("#" + formDomId + " .captcha");
        var $overlayContent = $("#" + formDomId + " div.overlayContent");

        $captchaBlocker.show();
        $captcha.show();

        $captchaBlocker.css({
            height: $overlayContent.innerHeight(),
            width: $overlayContent.innerWidth()
        });

        if (isForActivityInvite) {
            $('#emailAFriendPreview').hide();
            $('.emailFriendForm').hide();
        }

        $captcha.html(buildCaptcha());

    }

    function buildCaptcha() {

        var captchaIntro = "As a final step, please enter the characters below into the box provided. This system protects our customers from computer-generated spam and is the last step in sending your email.";

        var captchaBlock = "\
				<h3>You're almost done</h3>\
				<div class='dialog_close'></div>\
			<div class='captchaContent'>\
				<div class='captchaErrorContainer' style='display: none'><div class='exclaim'>! </div><div class='captchaErrorMsg'></div></div>\
				<p><span class='required'>*</span>" + captchaIntro + "	\
				<br/><br/>Can't see the image? <a href='http://portal.barnesandnoble.com/tellafriend/CAPTCHAaudio.asp'>Listen to the audio version</a></p>\
				<div class='captchaRow'>\
					<div class='captchaDiv'>\
						<div class='captchaImageContainer'><img class='captchaImage' src='http://portal.barnesandnoble.com/tellafriend/CAPTCHAimage.asp?" + Math.random() + "' /></div>\
						<div id='refresh-link'><a href='#' class='refreshCaptcha'>Refresh this image</a></div>\
					</div>\
					<div class='captchaButtons'>\
						<label><span class='required'></span>Enter Characters:</label><input class='SecurityCode' value='" + instructionCaptcha + "' maxlength='40' />\
					  <div class='captchaSend'>\
						<button class='SendEmail' type='submit'>Send Email</button>\
					  <div>\
					</div>\
				</div>\
			</div>\
			";

        if (isForActivityInvite) {
            captchaBlock = "\
					<h3>You're almost done</h3>\
					<div class='captchaErrorContainer' style='display: none'><div class='exclaim'>! </div><div class='captchaErrorMsg'></div></div>\
					<p>" + captchaIntro + "</p>\
					<p>Can't see the image? <a href='http://portal.barnesandnoble.com/tellafriend/CAPTCHAaudio.asp'>Listen to the audio version</a></p>\
					<table border='0' cellspacing='10'>	\
						<tr>	\
							<td align='right'>	\
								<div id='refresh-link'><a href='#' class='refreshCaptcha'>Refresh this image</a></div>	\
							</td>	\
							<td class='captchaRow'>\
								<div class='captchaDiv'>\
									<div class='captchaImageContainer'><img class='captchaImage' src='http://portal.barnesandnoble.com/tellafriend/CAPTCHAimage.asp?" + Math.random() + "' /></div>\
									</div>\
							</td>\
						</tr>	\
						<tr>	\
							<td align='right'>	\
								<label>Enter Characters:</label><br/>	\
								<span class='footnote'></span>	\
							</td>	\
							<td class='captchaButtons' style='clear: both;' valign='top'>	\
								<input class='SecurityCode' value='' maxlength='40' />\
							</td>	\
						</tr>	\
						<tr>	\
							<td></td>	\
							<td>	\
								<button class='SendEmail' type='submit'>Send Email</button>	\
							</td>	\
						</tr>	\
					</table>	\
				";
        }

        return captchaBlock;
    }

    function refreshCaptcha(e) {
        if (e != null) { e.preventDefault(e); }
        $("#" + formDomId + " .captchaImage").get(0).src = "http://portal.barnesandnoble.com/tellafriend/CAPTCHAimage.asp?" + Math.random();
    }

    function closeCaptcha(e) {
        if (e != null) { e.preventDefault(e); }

        var $captchaBlocker = $("#" + formDomId + " .captchaBlocker");
        var $captcha = $("#" + formDomId + " .captcha");
        $captchaBlocker.hide();
        $captcha.hide();
        $captcha.html("");
    }

    function validateCaptcha() {
        //i don't know why this is here: $("#" + formDomId + " .captchaRow").get(0).className = "";
        $("#" + formDomId + " .captchaErrorMsg").get(0).innerHTML = "";
        $("#" + formDomId + " .captchaErrorContainer").hide();

        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]\*\/\#\%\$\!\&\@\.\^\+\=\{\}\|\?\~\`]/;

        var code = $("#" + formDomId + " .SecurityCode").val();

        if (code.length == 0 || code == instructionCaptcha) {
            $("#" + formDomId + " .captchaErrorContainer").show()
            $("#" + formDomId + " .captchaErrorMsg").html("Please enter the word shown in the box below.");
            return false;
        }
        if (code.match(illegalChars)) {
            $("#" + formDomId + " .captchaErrorContainer").show()
            $("#" + formDomId + " .captchaErrorMsg").html("Your entry did not match the word shown in the box below. Please try again.");
            //$("#" + formDomId + " .captchaRow").get(0).className = "error";
            return false;
        }

        return true;
    }




    function sendEmail(e) {


        if (validateCaptcha()) {
            var securityCode = $("#" + formDomId + " .SecurityCode").val();
            var params = null;
            var formVals = $("#" + formDomId + " .emailFriendForm").serialize();

            //portal being removed
            //            if (!isForCommunity && !isForStoreEvent && !isForEBooks && !isForActivityInvite && self.sendCopyCheckBox == "on") {
            //                formVals = formVals.replace("&PersonalNote", "," + encodeURIComponent(self.fromEmail) + "&PersonalNote");
            //            }

            if (isForCommunity || isForActivityInvite) {
                params = formVals + "&PageUrl=" + encodeURIComponent($("#taf-permalink").html()) + "&PageTitle=" + encodeURIComponent("Tell a friend");
            }
            else if (isForStoreEvent) {
                params = formVals + "&PageURL=" + encodeURIComponent(location.href) + "&PageTitle=" + encodeURIComponent("Tell a friend");
            } else {
                params = formVals + "&PageURL=" + encodeURIComponent(location.href) + "&PageTitle=" + encodeURIComponent("Tell a friend");
            }

            if (useContentValue && !isForStoreEvent) {
                params += "&ContentType=" + contentType + "&ContentValue=" + contentValue;
            }
            else if (isForStoreEvent) {
                params += "&ContentType=" + contentType + "&ContentValue=" + eventTargetId;
            }
            else {
                params += "&ContentType=" + contentType + "&ContentValue=" + contentValue;
            }

            //portal is being removed
            //            else {
            //                params += "&ProductType=" + self.productType + "&ean=" + self.ean;
            //            }

            params += "&SecurityCode=" + securityCode;

            var pt = "";
            if (productCode != null) {
                pt = "&productCode=" + productCode;
            }

            //form has been updated to say "SendMeCopy"
            //  if (isForCommunity || isForStoreEvent || isForEBooks || isForActivityInvite) {
            //    params = params.replace("sendCopyCheckBox", "SendMeCopy");
            //  }


            if (!isForCommunity && !isForStoreEvent && !isForGeneric && !isForActivityInvite) {
                //portal no longer used - leaving for testing purposes
                /*    ui.request({
                baseURL: "http://portal.barnesandnoble.com/TellAFriend/ajax_SendingEmail.asp",
                parameters: "?" + params,
                callback: { name: "CBF", value: "sendEmailCallback" }
                });
                */
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + inputType + "&uiaction=SendEmail" + "&ProductType=" + self.productType + "&" + params,
                    callback: { name: "CBF", value: "sendEmailCallback" }
                });

            }
            else if (isForGeneric) {

                var currentLocation = location.href;


                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?inputType=" + commInputType + "&contentValue=" + commContentValue + "&contentType=" + commContentType + "&uiaction=SendEmail" + "&" + formVals + "&SecurityCode=" + securityCode + "&PageURL=" + encodeURIComponent(currentLocation) + "&PageTitle=Tell%20a%20friend",
                    callback: { name: "CBF", value: "sendEmailCallback" }
                });
            }
            /*          
            *  ebooks no longer treated as a special case
            *  else if (isForEBooks) {
            //alert('test sending');
            ui.request({
            baseURL: "http://"+ $.hosts.community +"/tellafriend/ServiceResponse.aspx",
            parameters: "?inputType=" + inputType + "&uiaction=SendEmail" + "&ProductType=" + self.productType + "&" + params,
            callback: { name: "CBF", value: "sendEmailCallback" }
            });

       }  
            */
            else if (isForStoreEvent) {

                var stampToUse = getSelectedStamp()

                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?" + params + "&inputType=EventID&uiaction=SendEmail&stampimg=" + stampToUse,
                    callback: { name: "CBF", value: "sendEmailCallback" }
                });
            }

            else if (isForActivityInvite) {
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?" + params + "&uiaction=SendEmail&InputType=" + inputType + pt,
                    callback: { name: "CBF", value: "sendEmailCallback" }
                });
            }

            else { // Then is for community - These decision variables will be consolidated - 1-14-08
                ui.request({
                    baseURL: "http://" + $.hosts.community + "/tellafriend/ServiceResponse.aspx",
                    parameters: "?" + params + "&uiaction=SendEmail&InputType=" + inputType + pt,
                    callback: { name: "CBF", value: "sendEmailCallback" }
                });
            }
        }
    }

    function getSelectedStamp() {

        var stampURLValues = String($('.eventStampContainer img').attr('src')).split('/');
        var stampToUse = "";
        if (stampURLValues.length >= 1) {
            stampToUse = stampURLValues[stampURLValues.length - 1];
        }
        return stampToUse;
    }

    this.sendEmailCallback = function(response) {
        if (response.status == "0" || response.status == "True") {
            buildConfirmation();
            //$("#myLib").html(response.output);
            //win3 = window.open("", "Window3", "width=650,height=500,scrollbars=yes");
            //win3.document.writeln(response.output);
        } else {
            $("#" + formDomId + " .captchaErrorContainer").show();
            if (response.errors) {
                $("#" + formDomId + " .captchaErrorMsg").html(response.errors[0].desc);
            } else {
                $("#" + formDomId + " .captchaErrorMsg").html(response.output);
            }
            refreshCaptcha(null);
            $("#" + formDomId + " .SecurityCode").get(0).value = "";
        }
    }

    function buildConfirmation() {
        var thank_you_Sub_header = "Thank you for using Email A Friend";
        var thank_you_header = "Thank you for using Email A Friend";

        $('#requiredTAFFieldLabel').hide();


        if (isForBNReview) {
            thank_you_Sub_header = "";

            contentTypeTest = String(contentType).toLowerCase();
            switch (contentTypeTest) {
                case "review":
                case "feature":
                    thank_you_header = "Thank you for sharing this article from the Barnes &amp; Noble Review.";
                    break;
                case "interview":
                    thank_you_header = "Thank you for sharing this interview from the Barnes &amp; Noble Review."
                    break;
                case "contributor":
                    thank_you_header = "Thank you for sharing the work of this Barnes &amp; Noble contributor."
                    break;
                case "contributors":
                    thank_you_header = "Thank you for sharing the list of contributors from the Barnes &amp; Noble Review."
                    break;
                case "longlist":
                    thank_you_header = "Thank you for sharing this article from the Barnes &amp; Noble Review Longlist.";
                    break;
                case "spotlight":
                    thank_you_header = "Thank you for sharing this article from the Barnes &amp; Noble Review Spotlight.";
                    break;
                case "cds":
                    thank_you_header = "Thank you for sharing this article from the Barnes &amp; Noble Review.";
                    break;
            }



            //$('topDetails').update('<h2 id="thank_you_BN_Review_header" style="padding-bottom: 8px;">' + thank_you_header + '</h2>' + $('topDetails').innerHTML);
            if ($("#topDetails").get(0) == null) {
                //console.log('no top details, however: ', '<h2 id="thank_you_BN_Review_header" style="padding-bottom: 8px;">' , thank_you_header , '</h2>';
            } else {
            }
        }

        var confirmation = "\
				<h3>" + thank_you_Sub_header + "</h3>\
				<span class='notice'>We have sent your email to the following address(es):</span>\
				<div id='emailList'>" + getListOfRecipients(self.toEmail) + "</div>";
        if (isForActivityInvite) {
            confirmation = "<h3>Success!</h3>\
					Thank you for using Invite a Friend.  We have sent the email inviation to the following address(es):	\
					<br/>	\
					<div id='emailList'>" + getListOfRecipients(self.toEmail) + "</div> \
					<br/>	\
					<div>	\
						<table cellpadding='0' cellspacing='0' border='0'>	\
							<tr>	\
								<td>	\
									<a class='doneBtn doneLTN' href='#'></a>	\
								</td>	\
								<td>	\
									<a class='sendAnotherBtn sendAnotherLTN' href='#'></a>	\
								</td>	\
							</tr>	\
						</table>	\
					</div>	\
					";

        }


        if (self.SendMeCopy == "on") {
            confirmation += "<div id='copySent'><strong>We also sent a copy to you at: </strong><span>" + self.fromEmail + "</span></div>";
        }


        $("#emailAFriendPreview").hide();
        $("#" + formDomId + " .emailAFriendConfirm").html(confirmation).show();
        $("#" + formDomId + " .emailFriendForm").hide();
        $("img.sendAnother").show();
        if (isForActivityInvite) {

            $(".sendAnotherLTN").click(function(e) {
                e.preventDefault(e);
                $(".useEmailAFriend:first").trigger('click')
            });
            $(".doneLTN").click(function(e) { $.global.buildCommunityPopup.close(e) });
        }

        if (!isForCommunity && !isForEBooks && !isForActivityInvite) {
            $("div.productDetails").show();
        } else if (isForCommunity || isForEBooks || isForActivityInvite) {
            $("#" + formDomId + " .productDetails").hide();
        }


        if (isForStoreEvent) {
            $('#TAFEventDetails').hide();
            $('.TAFstoreEventRightContent').hide();
            $('.TAFstoreEventContent, .TAFstoreEventContentPreview').removeClass('TAFstoreEventContent').addClass('TAFstoreEventContentConfirmation').attr('id', 'emailAFriendConfirmation');
            $('#' + formDomId + ' .emailAFriendConfirm h3').html('Thank You for using Email a Friend <br/>at Barnes &amp; Noble.').addClass('TAFStoreEventThanks');
            $('#' + formDomId + ' .emailAFriendConfirm strong').css({ 'font-weight': 'normal' });
            $('#emailAFriendFooter').css({ 'text-align': 'center' });
            settings.overlay.set.width(500)
        }
        else if (isForQue) {
             settings.overlay.set.width(435)
            //this is for a custom overlay in pl that misbehaves in IE with all this resizing
            if (jQuery.browser.msie) {
                $('.overlayHeader h3').css("width", "481");
            }
        }
        else if (isForGeneric) {
            settings.overlay.set.width(435)
        }



        closeCaptcha(null);
        //hidePreview();
    }

    function getListOfRecipients(emailString) {
        var emails = emailString.split(",");

        var list = "";
        for (var i = 0; i < emails.length; i++) {
            list += emails[i] + "<br />"
        }

        return list;
    }

    init();
}
	// bridge
	function sendEmailCallback(response) {$.global.EmailAFriend.sendEmailCallback(response);}
	function insertUserData(response) {$.global.EmailAFriend.insertUserData(response);}
	function EmailAFriendItemData(response) {$.global.EmailAFriend.insertData(response); }
	function EmailAFriendEventData(response) {$.global.EmailAFriend.insertEventData(response); }	
	function EmailAFriendGenericData(response) { $.global.EmailAFriend.insertData(response);}	
	function getPreview(response) {$.global.EmailAFriend.showPreview(response);}
	function showPreview(response) {$.global.EmailAFriend.showPreview(response);}	

	
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	
	jQuery.extend( jQuery.easing, {
		 def: 'easeOutCubic',
		 swing: function (x, t, b, c, d) {
			 return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		 },
		 easeOutCubic: function (x, t, b, c, d) {
		 	return c*((t=t/d-1)*t*t + 1) + b;
		 }
	});


	animationOptions = { easing: 'easeOutCubic', axis: 'x' };
	animationOptions.onAfter = function(){
		isAnimating = false;
	}


	$.thumbsSlider = function () {
	
		this.selectionName = "";
		this.selectionItem = null;


		$('.thumbGallery .arrow').click(function (e) {GoNext(e)});
	
		$('.thumbGalleryItems li img').click (function (e) {selectThumb(e)});
		
		function selectThumb(e) {
			
			var targetSrcValues = String($(e.target).attr('src')).split('/');			
			var newThumbSrc = "";

			this.selectionItem = $(e.target);
			this.selectionName = targetSrcValues[targetSrcValues.length - 1];
			
			
			if (this.selectionName.indexOf('_on.') == -1){ // Make sure this is not the already selected value
				
			
				// turn off any previously selected thumb
	
				$('.thumbGalleryItems li img').each (function (index, thisItem) { 
						newThumbSrc = $(thisItem).attr('src').replace('_on.', '_off.');
						$(thisItem).attr ('src', newThumbSrc);
				})		
	
	
				// replace thumb with new thumb that is hightlited (this is 'on' state):
				newThumbSrc = $(this.selectionItem).attr('src').replace('_off.', '_on.');
				$(this.selectionItem).attr('src', newThumbSrc)
		
				
				// Assuming this is for TellAFriend, place new section in upper-right stamp area
				
				$('.eventStampContainer img').attr('src', $.hosts.resources + '/presources/storelocator/images/tellafriend/stamps/' + (this.selectionName).replace('_off', '_stamped'));	
			}
		}
		  
		$('.arrow').filter('.previous').hide();
		
		function GoNext (e) {
	
			e.preventDefault(e);
		
			var $currentObject = $('.thumbGalleryItems li.currentPage');
	
			var $remainingObjects =  null; 
		
			var $nextObject	= null;
			
			var direction = "";
			
			if ($(e.target).hasClass('next')) {
			
				 $remainingObjects = $currentObject.nextAll();
				 direction = "next";
			}
			else if ($(e.target).hasClass('previous')) {
				 $remainingObjects = $currentObject.prevAll();
				 direction = "prev";
				 //console.log('in Previous');
			}
		
			if ($remainingObjects.length >= 4) {
				$nextObject	= $remainingObjects.eq(3);
			}
		
	
			$('#thumbGalleryItems').scrollTo($nextObject, 1000, animationOptions);
	
			
			$currentObject.removeClass('currentPage');
			$nextObject.addClass('currentPage');
	
			if (direction == "next") {
				$remainingObjects =  $nextObject.nextAll();
			}
			else if (direction == "prev") {
				 $remainingObjects =  $nextObject.prevAll();
			}
	
	
			if (direction == "next" && $remainingObjects.length <= 3 ) {
				$('.arrow').filter('.next').hide();
			} 
			if (direction == "prev" && $remainingObjects.length > 4 ) {
				$('.arrow').filter('.next').show();
			}
			if (direction == "prev" && $remainingObjects.length <= 0) {
				$('.arrow').filter('.previous').hide();
			}
			if (direction == "next" && $remainingObjects.length > 0) {
				$('.arrow').filter('.previous').show();
			}
	
	
			return false;
		}	
	}




function getDate(date)
{
    var d = new Date();

    var p = date.replace("Z","");
    p = p.split("T");
    var dayPart = p[0].split("-");
    var timePart = p[1].split(":");

    var year = dayPart[0];
    var month = dayPart[1];
    var day = dayPart[2];
    var hour = timePart[0];
    var minute = timePart[1];
    var second = timePart[2];

    d.setFullYear(year,month);
    d.setDate(day);
    d.setHours(hour,minute,second);

    return d;
}

function isSignedIn() {
    return $("#context span#signedIn").text() == "True";
}

function getPageType() {
    return $("#context span#pageType").text();
}

function getProfilePrivacyLevel() {
    return $("#context span#profilePrivacyLevel").text();
}


//**********************************
//	Class: PenNameSelector
//**********************************
$.PenNameSelector = function(options) {
	var self = this;
	var overlay = null;
	this.penname = null;
	this.onCompleteOverrideFlag = false; // This should become a normal OnComplete funciton like the constructor model once PenName is re-engineered to work more then once on a page load - 2/6/08
	this.onCompleteOverrideAction = {}; 
	this.onCompleteOverrideToProfile = {};
	
	this.settings = $.extend({
		onComplete: function() {},
		type: "profile",
		sso: false,
		ssoCallback: function(){}
	}, options);

	var overlayLayout = '<div class="overlayHeader"><h3>CREATE A PEN NAME</h3><a class="overlayClose" href="#"><span>Close</span></a></div><div class="overlayContent"><p>Your unique Pen Name is your identity on Barnes & Noble.com.  It will appear on the reviews you write, your book club discussion comments and other activities.</p><p><b>Your pen name cannot be edited, changed or deleted once submitted, so please choose carefully.</b></p><div class="dottedDivider"></div><div id="pennameContent"><p><strong>Enter Pen Name</strong></p><p class="grey">It can be any combination of alphanumeric characters (plus - and _), and must be at least two characters long.</p><form><p> <input type="text" id="desiredPenname" class="penameInput" maxlength="25"/></p><p><button class="btn_check" style="height:28px;width:131px;background:url(' + $.hosts.resources + '/presources/community/images/btn_popupCheckAvailablity.png)"/><button class="btn_noThanks"></button></p></form></div></div>';

	$("#selectPenName").click(function(e) {
		e.preventDefault(e);
		show();
	});


	
	function init() {
		overlay = new $.Overlay();
		overlay.set.id("ovrly-penNameContent");
		overlay.set.content(overlayLayout);
		overlay.set.width(435);
		
		//alert('testing Dev CreatePenName');
		
		$("#ovrly-penNameContent").delegate("click", {
			"a.overlayClose": function(e){
				if(self.settings.sso) self.settings.ssoCallback(true);
				close(e);
			},
			"img.cancel": function(e){
				if(self.settings.sso) self.settings.ssoCallback(true);
				close(e);
			},
			"button.btn_noThanks": function(e){
				if(self.settings.sso) self.settings.ssoCallback(true);
				close(e);
			},
			"button.btn_check": checkAvailability,
			"button.btn_findPenName": findDifferent,
			"button.btn_usePenName": createPenName,
			"button.btn_usePenNameAgain" : checkAvailability,
			"button.btn_cancel" : function(e){
				if(self.settings.sso) self.settings.ssoCallback(true);
				close(e);
			},
			".goToMyProfile" : goToProfile,
			"img.departPage" : OnCompleteOverrideHandler,
			"input.chooseAnotherCheckbox" : checkOption,
			"a.tryAgain": findDifferent
		});
	}

	function checkOption(e) {
		e.preventDefault(e);
		var $target = $(e.target);
		$target.parents("li").find("input[name='penname']").attr("checked", "checked");
	}

	function close(e) {
		if(e && e.preventDefault) { e.preventDefault(e); }
		$("#ovrly-penNameContent input").attr({value: ""});
		overlay.close();
		overlay.set.content(overlayLayout);
	}
	

	this.open = function() {
		show();
	}

	function show() {
		overlay.open();
	}

	function checkAvailability(e) {
		e.preventDefault(e);

		//alert('Testing CheckAvailability in Dev (7)');
		
		var $desiredPenname = $("#desiredPenname");

		if($desiredPenname.get(0).value.length >= 2 || $("li.altSuggestions").exists() ) {
			if($desiredPenname.get(0) != null && $("#chooseAnotherPenname").get(0) == null) {
				self.penname = $desiredPenname.get(0).value;
				} else if($("#chooseAnotherPenname").get(0) != null && $("#chooseAnotherPenname").get(0).checked) {
				self.penname = $desiredPenname.get(0).value;	
				} else {					
				$("#ovrly-penNameContent input").each(function(index, item) {
					if(item.checked) {		
						self.penname = item.value;
					}
				});
			}
			ui.request({
				baseURL: $.hosts.commServices,
				parameters: "?page=UserProfile&uiAction=CheckPenName&newPenname="+encodeURIComponent(self.penname)+"&bnOutput=1",
				callback: {name: "cbf", value: "jQuery.global.PenNameSelector.isAvailable"}
			});
		} else {
			$("#pennameContent p.grey").removeClass("grey").addClass("red");
		}
	}

	function checkAvailabilityAgain(e) {
		e.preventDefault(e);
	}

	this.isAvailable = function(result) {
		if(result.status == "True") {

			var output = '<p><strong>'+self.penname+' is available!</strong></p><p>By visiting any area on Barnes & Noble.com Site or making a purchase via the Barnes & Noble.com site, a User is deemed to have accepted the <a href="http://' + $.hosts.webhost + '/include/terms_of_use.asp">Terms of Use</a></p><form><p><button class="btn_usePenName" style="height:28px;width:129px;background:url(' + $.hosts.resources + '/presources/community/images/btn_popupUsePenName.png)"/><button class="btn_findPenName" style="height:28px;width:175px;background:url(' + $.hosts.resources + '/presources/community/images/btn_popupFindPenName.png)"/><button class="btn_noThanks" style="height:28px;width:90px;background:url(' + $.hosts.resources + '/presources/community/images/btn_popupNoThanks.png)"/></p></form>'
			$("#pennameContent").html(output);
		} else {
			// Suggestions
			if(result.output.split(",").length == 4) {
				var alternates = result.output.split(",");
				var alternateHTML = "";
				alternateHTML += '<li><input type="radio" name="penname" id="chooseAnotherPenname" /><strong>Choose another Pen Name</strong><input type="text" id="desiredPenname" class="penameInput chooseAnotherCheckbox" maxlength="25"/></li>';

				$(alternates).each(function(index, item) {
					if(index == 0) {
						alternateHTML += '<li class="altSuggestions"><input type="radio" name="penname" value='+item+' checked/><strong>' + item + '</strong></li>';
					} else {
						alternateHTML += '<li class="altSuggestions"><input type="radio" name="penname" value='+item+' /><strong>' + item + '</strong></li>';
					}
				});
				var output = '<p style="color:#AC9F7F">We\'re sorry, but <strong>'+self.penname+'</strong> is already taken. Would you like to try one of the following:</p><form><ul>'+alternateHTML+'</ul><p><button class="btn_check" style="width:79px;height:24px;background:url(' + $.hosts.resources + '/presources/community/images/btn_tryAgain.png);"></button></p></form>';
				$("#pennameContent").html(output);
			} else {
				// BAD WORD
				var output = '<p class="red">'+result.output+'</p><form><div id="pennameContent"><form><p><table cellpadding="0" cellspacing="0"><tr><td>Choose Another Pen Name</td><td><input type="text" id="desiredPenname" class="penameInput" maxlength="25"/></td></tr></table></p><p><button class="btn_check btn_tryAgain" style="width:79px;height:24px;background:url(' + $.hosts.resources + '/presources/community/images/btn_tryAgain.png);"/></p></form></div></form>';
				$("#pennameContent").html(output);
			}
		}
	}

	function findDifferent(e) {
		e.preventDefault(e);
		overlay.set.content(overlayLayout);
	}

	function setHeading(title) {
		$("#ovrly-penNameContent .overlayHeader h3").html(title);
	}

	function createPenName(e) {
		e.preventDefault(e);
		ui.request({
			baseURL: $.hosts.commServices,
			parameters: "?page=UserProfile&uiAction=CreatePenName&newPenname="+encodeURIComponent(self.penname)+"&bnOutput=1",
			callback: {name: "cbf", value: "jQuery.global.PenNameSelector.createPenNameCallback"}
		});
		
		//alert('assigning this name test');
	}

	this.createPenNameCallback = function(response) {
		var pane = $("#ovrly-penNameContent div.overlayContent").get(0);
		var newHTML = "";
		var departButton = '<img class="departPage" src="' + $.hosts.resources + '/presources/community/images/button_taf_continue.png" />';
		if(response.status == "True") {
			
			if ($('span#userPenName').exists()) {
				$('span#userPenName').text(self.penname);
			}
			
			
			setHeading("CONGRATULATIONS");
			var button = '<img class="goToMyProfile" src="' + $.hosts.resources + '/presources/community/images/btn_goToMyProfile.png" />';
			if (self.settings.type == "list") {
				button = '<img class="goToMyProfile" src="' + $.hosts.resources + '/presources/community/images/button_taf_continue.png" />';
			}
			else if(self.settings.type == "other") {
				button = '<img class="goToMyProfile" src="' + $.hosts.resources + '/presources/community/images/button_taf_continue.png" />';
			}

			
			if (! self.onCompleteOverrideFlag) {
				newHTML = '<p><strong>Welcome, '+ self.penname +'!</strong></p><p>You have successfully created your Pen Name. Start enjoying the benefits of Barnes & Noble.com Community by visiting your profile page.<br /><br /><button class="goToMyProfile">'+button+'</button></p>';
			}
			else {
				newHTML = '<p>You have successfully created your Pen Name, and set <br/>your profile to public.<br /><br />'+departButton+''+button+'</p>';				
			}				
			pane.innerHTML = newHTML;

			$("#ovrly-penNameContent a.overlayClose").hide();
			
			if ($('#ListOrFavProductFlag').exists() && $('#ListOrFavProductFlag').val() == 'EssentiaList' && $('#editMode').val() == 'false') {
	
				// Then a new PenName was just selected on an Elist in read-only mode when the user attempted to select 'Choose a Pename to associate with this list' and thus make the list Public
				//  Now that the new Penname was made, submit the service call to make the list public.
				
				
				var myParameters = "uiAction=UpdateListAttributes&page=List&pageType=List"
		
				var list_id_parameter = "&ListID=" + currentListId;
			
		
				myParameters += "&PrivacyLevel=" + 'Public';
				
		
				var myEditingParameter = '&bIsTemp=false';
		
				ui.request({ baseURL: $.hosts.commServices + '?',
					parameters: myParameters + list_id_parameter +  myEditingParameter ,
					callback: {name: "cbf", value: "saveListPrivacyCallBack" }
				});
				
				//saveListPrivacy ('Public'); 
				// function defined in list.js
			}
			
		} else {
			setHeading("Error");
			pane.innerHTML = '<div class="overlayContent"><p>A problem occured, please <a class="tryAgain" href="#">try again</a></p>';
		}
	}

	function OnCompleteOverrideHandler () {

	/* This makeProfilePublicFlag functionality should be included in the onComplete funciton below - supplied by each specific instance of the PenNameSelector.
		But the PenName selctor was built dependant on markup id's, making it useable only once per page.  There is currenlty not enough testing time to change the selector. 2/3/08 */


		if(self.onCompleteOverrideFlag) {
			self.onCompleteOverrideAction ();
		}
		
		close();		
	}

	function goToProfile() {

		if (self.onCompleteOverrideFlag) {  // if the user has come from a QuestionPopup before departing, but then they changed their mind and went there profile before leaving, clean up here;

			self.onCompleteOverrideToProfile();
		
		} 
		
		/* completely untested for this location, so leaving out of relase:
			else if ($.global.privacyPopUpQuestion && $.global.privacyPopUpQuestion.shouldAskQuestion()) { 
		
				$.preventDepatureOnAllRealLinks ($.global.privacyPopUpQuestion);
	
		}			
		*/
		
		self.settings.onComplete(self.penname);
	
		close();
	}

	init();
}



//**********************************
//	Event: On page leave PopUp Questions Helper funcitons (3 of them)
//**********************************
$(function () {
	
	
	$.global.areAllRealLinkBounded = false; // ie: have listners been applied to links at some point since page load?  Used then user changes conditions since page load and maybe listners already exist and do not have to be added dynamically
	$.global.isReadyToDepart = false;	// ie: a departure question has been asked at least once.

	$.preventDepatureOnAllRealLinks = function(questionObject) {
	
		// Find all links that lead away from this page (ie: get all links without an empty href, then remove those that begin with '#' and those the begin with 'javascript';
		$.global.QuestionPopUp = {};
		
		$.global.QuestionPopUp.addListners = function () {

			$.addPreventDepartureListners($("a[href!='']").not("a[href='#'], a[href^='#'], a[href^='javascript:'], a.overlayClose, a.buildCommunity"), questionObject);  // ie: the Query is for all 'real links' on a page
		}
		/* I am adding a 2.5 sec delay to this process becuase the creation of 250 listners at once is noticably time consumeing, and delayes 
			the loading of suggestions for you and lithium statistica.  Knowing that this ia geared for the end of the process, a 4 sec delay 
			before the listners are added seems resonable.
		*/
		var t = setTimeout("$.global.QuestionPopUp.addListners()", 2500);
		
		$.global.areAllRealLinkBounded = true;
		
   }

	$.addPreventDepartureListners = function(LinksToPrevent, questionObject) {
		var ii = 0;
		
		$.global.preventDepartureQuestionObj = questionObject;
		
		$(LinksToPrevent).each(function(index, thisItem) {
				//ii ++;
				//console.log('thisItem ' + ii + ' : ' + '[' + $(thisItem).text() + ']\t\t\t' + $(thisItem).attr('href')); // test output them
			$(thisItem).click ( function(e){
					$.overridePageDeparture(thisItem, e, $.global.preventDepartureQuestionObj)
				});
			
		});
		return;
	}

	
	
	$.overridePageDeparture = function(thisItem, Event, popUpQuestion) {
		// THIS IS THE ACTUAL LISTNER that is applied to all 'real links' on a page.		
		// Note that the event target may be an element inside an anchor tag, requiring the inclusion of the Item itself from the original anchor search
			
		if (popUpQuestion.shouldAskQuestion() && popUpQuestion.isReadyToDepart != true && $.global.isReadyToDepart != true && $(thisItem).exists() && $(thisItem).attr('href')){

				Event.preventDefault(Event);
				
				//$.ThisEvent = Event;
				popUpQuestion.triggerTarget = $(thisItem).attr('href');
				//vvvvv alert("test: \n window.location: " + window.location	  + "\n popUpQuestion.triggerTarget: " + popUpQuestion.triggerTarget); 
				//$(thisItem).unbind('click');  It has been determined that if the user closes the question with no answer then they should still be presented with it the next time they click a link.
				// XXXXX alert('got this item: ' + popUpQuestion.triggerTarget);
				popUpQuestion.open();
				
		}
		else {
			return true;	
		}
	}
	
	
	$.departPageNowDestination = "";
	$.departPageNow = function() {

		 // vvvvv alert("testing departing page (2): \n window.location: " + window.location	  + "\n $.departPageNowDestination: " + $.departPageNowDestination);
		if(! jQuery.browser.msie) {
			// to maintain correct broswer history:
			window.location	= window.location.href + '#';  
		}
		// This may be called from a service call response or simply when the user 
		window.location = $.departPageNowDestination;
	}

	
	
	$.CheckAndSetDoNotAskAgain = function (formToUse, questionId) {
		
		// This function is used by $.PrivacyPopUpQuestion, $.PenNamePopUpQuestion and $.PrivacyReviewPopUpQuestion
	
		if ($(formToUse + " input[name='DoNotShowAgain']:checked").exists()) {
	
			var announcementID = $("#popUpQuestion-" + questionId + " .announcementId").text();
			
			ui.request({
				baseURL: $.hosts.commServices,
				parameters: "?page=UserProfile&uiAction=MarkAnnouncementAsViewed&announcementID=" + announcementID,
				callback: {
					name: "cbf",
					value: "$.markAnnouncementViewedCB"
				}
			});
			
		}
	}
	
	$.markAnnouncementViewedCB = function () {
		//nothing for now
	}
});


//**********************************
//	Event: DOMREADY
//**********************************
$(function() {
	$.global.SignedIn = null;

	$(document).click(function(e) {
		$target = $(e.target);

		var $this = null;
		if($target.is("a")) {
			$this = $(e.target);
		} else if($target.parent().is("a")) {
			$this = $(e.target).parent();
		}

		if($this != null &&
			(($this.get(0).href.search('WriteReview.aspx') != -1 && document.location.href.search('WriteReview.aspx') == -1))
			) {
			e.preventDefault(e);

			var classes = $this.attr('class').split(' ');
            var sectionText = '';
            var url = null;

            $.each(classes, function(k, v){
                  if (v.indexOf('section_') != -1) sectionText = v.substring(v.indexOf('_') + 1, v.length);
            })

            if($this.is('a') && !$this.is('.noRedirect')) url = $this.attr('href');

			$.global.SignedIn = new $.SignedIn({
				url: url,
				section: "generic"
			});
		}
	});
	
	//product page listeners for ebook overlays -- to be rewritten
	var aboutBuyingEbooksPopup=function(headerLabel, version){
		var heading = headerLabel; //"About Buying eBooks";
		var html = $('#'+version).html();
		
		var o = new $.Overlay({
			useHeading: 1,
			heading: heading,
			block: 1
		});
		o.set.content(html);
		o.set.width(475);
		
		o.element.find("a.overlayClose").click(function(){
			o.close();
			return false;
		});
		o.open();		
	};

	$('.about-buying-ebooks-pdp, .about-buying-ebooks-comm, .about-buying-eperiodicals').click(function(){
		if($(this).attr('class')=== 'about-buying-eperiodicals'){
				aboutBuyingEbooksPopup('About Buying eNewspapers & eMagazines', 'about-buying-eperiodicals');
		}else{
				aboutBuyingEbooksPopup('About Buying NOOK Books', 'about-buying-ebooks');
		}
	});
	$.global.aboutBuyingEbooksPopup = aboutBuyingEbooksPopup;

	
	var aboutLendingEbooksPopup=function(headerLabel, version){
		var heading = "LendMe&#153; - How it Works";
		var html = '<div class="inner"><div class="body" style="float:left;min-height:200px;"><iframe frameborder="0" height="600" width="620" scrolling="no" marginwidth="0" marginheight="0" src="http://'+ $.hosts.webhost +'/newsletters/kmp_iframe_cds2.asp?pid=30684">&#160;</iframe></div></div>';
		
		var o = new $.Overlay({
			useHeading: 1,
			heading: heading,
			block: 1
		});
		o.set.content(html);
		o.set.width(620);
		
		o.element.find("a.overlayClose").click(function(){
			o.close();
			return false;
		});

		o.open();		
	};
	$('.about-lending-ebooks').click(aboutLendingEbooksPopup);
	$.global.aboutLendingEbooksPopup = aboutLendingEbooksPopup;

	
	var learnMoreEbooks=function(){

		var heading = "eBooks &mdash; Works with the eReader you already own";
		var html = $('#learn-more-ebooks').html();
		
		var o = new $.Overlay({
			useHeading: 1,
			heading: heading,
			block: 1
		});
		o.set.content(html);
		o.set.width(592);

		o.element.find("a.overlayClose").click(function(){
			o.close();
			return false;
		});
		o.element.find("a.closeMe").click(function(){
			o.close();
			return false;
		});
		o.open();	
		BN.EBook.Util.insertDeviceInformation('.ebook-accordion-pdp');	
	};

	$('.learn-more-ebooks-pdp, .learn-more-ebooks-comm').click(learnMoreEbooks);
	$.global.learnMoreEbooks = learnMoreEbooks;
	
	
	var learnMoreSampleEbooks=function(){

		var heading = "About eBook Samples";
		var html = $('#learn-more-sample-ebooks').html();
		
		var o = new $.Overlay({
			useHeading: 1,
			heading: heading,
			block: 1
		});
		o.set.content(html);
		o.set.width(475);

		o.element.find("a.overlayClose").click(function(){
			o.close();
			return false;
		});
		o.open();		
	};

	$('.learn-more-sample-ebooks-pdp, .learn-more-sample-ebooks-comm').click(learnMoreSampleEbooks);
	$.global.learnMoreSampleEbooks = learnMoreSampleEbooks;
		
});
//**********************************
//	Class: SignedIn
//**********************************
$.SignedIn = function(settings) {
	var self = this;
	ui.request({
		baseURL: $.hosts.commServices,
		parameters: "?page=UserProfile&uiAction=CheckSignedIn&bnOutput=1",
		callback: {name: "cbf", value: "$.global.SignedIn.handleResponse"}
	})

	this.handleResponse = function(response) {
		if(response.status == "True") {
			document.location = settings.url;
		}
		else {
			var s = new $.SignInWidget(settings);
		}
	}
}

//**********************************
//	Extension: Get Cookie
//**********************************
jQuery.Cookie = function(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};


//**********************************
//	Extension: maxLength
//**********************************
$.fn.maxLength = function(max, charDisplay, charText, charDisplayAt){
	var $this;
	charText = (typeof charText == 'undefined') ? '' : ' ' + charText;
	charDisplay = (typeof charDisplay == 'undefined') ? null : charDisplay;
	charDisplayAt = (typeof charDisplayAt == 'undefined' || charDisplayAt == '') ? null : charDisplayAt;
	var set = {
		max: function(m){ $this.data('charMax', m); },
		count: function(c) { $this.data('charCount', c); }
	}

	var get = {
		max: function(){ return $this.data('charMax'); },
		count: function() { return $this.data('charCount'); },
		remaining: function() { return $this.data('charMax') - $this.data('charCount'); }
	}

	function displayRemainder(){
		if (charDisplay != null){
			if(charDisplayAt != null){
				if (get.max() - get.count() >= charDisplayAt){
					charDisplay.hide();
					return false;
				}
				charDisplay.show();
			}
			 charDisplay.text(get.remaining() + charText);
		}
	}

	return this.each(function(){
		$this = $(this);
		set.max(max);
		set.count($this.val().length);
		displayRemainder();

		/*$this.keypress(function(e){
			actions(e);
		});*/
		$this.change(function(e) {
			actions(e);
		});

		function actions(e) {
			var code = e.keyCode;

			if(	code != 8 &&
				code != 9 &&
				!(code >= 16 && code <= 20) &&
				!(code >= 33 && code <= 40) &&
				!(code >= 44 && code <= 46) &&
				!(code >= 112 && code <= 123)
				){

				if(get.count() >= get.max()){
					return false;
				}
				else {
					var val = $this.val();
					if(val.length > get.max()) {
						$this.val(val.substring(0, get.max()));
					}
					set.count($this.val().length );
					displayRemainder();
				}
			}
		}
		
		$this.keydown(function(e) {
			var code = e.keyCode;
			if(	code != 8 &&
				code != 9 &&
				!(code >= 16 && code <= 20) &&
				!(code >= 33 && code <= 40) &&
				!(code >= 44 && code <= 46) &&
				!(code >= 112 && code <= 123)
				){
					if($this.val().length == get.max()) {
						e.preventDefault(e);
					}
			}
		});
		
		$this.keyup(function(e){
			var val = $this.val();
			if(val.length > get.max()) {
				$this.val(val.substring(0, get.max()));
				
				if($("#overlay_popUpErrortruncated").exists()) {
					$("#overlay_popUpErrortruncated").remove();
				}
				showPopUpError("Your text exceeds the number of characters allowed in this field ("+get.max()+").  Please review your text to ensure it fits within the given space.", "truncated", "");
			}
			set.count($this.val().length);
			displayRemainder();
		})
	});
}


function isLocalizedErrorFound (result, errorMsgPrefix, errorMsgType, errorMsgHolder) {

	/*
		This function is designed to provide a unified way to handle errors returned form service calls.

		This funcition is intend to accomplish four tasks:
			- To see if a service has returned an error (and return True so)
			- to add a prefix to an error message returned from the service (unlikely to be used in most cases)
			- to show the error message in a specific container in the markup
			- to clear any old error messages in the container from previous calls with same class errorMsgType.


		Parameters:
			- 'result' is the service call response object containing 'status' and 'output'.
			- errorMsgPrefix is a string
			- errorMsgType is a string
			- errorMsgHolder is a jQuery object of a valid markup tag on the page.

		errorMsgPrefix, errorMsgType, and errorMsgHolder could be locally defined at the moment this funciton is called, or could have been defined when the UI.request was
		created and have been saved in that request object until the call back was triggered.

	*/

	// clear old errors in container with class of errorMsgType
	if ($(errorMsgHolder).children('.' + errorMsgType).exists()) {
		$(errorMsgHolder).children('.' + errorMsgType).remove();
	}
	// see if there is a new error
	if(result.status == "False") {
		if ($(errorMsgHolder).exists()) {
		
			// if there is an error, and the container exists, show the new error with prefix.
			
	
			
			$(errorMsgHolder).prepend('<div class="errorMsg ' + errorMsgType + '" style="display:block"><a class="localError"/>' + errorMsgPrefix + result.output + '</div>');
				
	
			$('a.localError').get(0).focus();
		}
		
		return true;
	}

	return false;
}

function isGeneralErrorFound (result, errorMsgPrefix, errorMsgType) {

	/*
		This function is provides a unified way to handle errors returned form service calls to be displayed at the top of a page.

		It wraps isLocalizedErrorFound (above) with an pointer to an error-message-holder assumed to exist at the top of the page.
	*/

	 return isLocalizedErrorFound (result, errorMsgPrefix, errorMsgType,  $('.pageErrorsDisplay'));
}

function isPopUpError (response, errorMsgType, errorMsgTitle) {
	
	if ($("#overlay_popUpError"+errorMsgType+"").exists() ) {
		$("#overlay_popUpError"+errorMsgType+"").remove();
	}

	if (response.status == 'False') {
		
		if (String(response.output) != '') {
			showPopUpError (response.output, errorMsgType, errorMsgTitle);
		}
		return true;
		
	}
	

	return false;	
}

function showPopUpError (errorMsg, errorMsgType, errorMsgTitle) {
	var heading = "";
	overlayWidth = 300;
	
	if(errorMsgTitle) {
		heading = errorMsgTitle;
	}

	if (errorMsgTitle && String(errorMsgTitle).length > 24)
	{
		overlayWidth = String(errorMsgTitle).length * 10;
	}
	
	if ($("#overlay_popUpError"+errorMsgType+"").exists() ) {
		$("#overlay_popUpError"+errorMsgType+"").remove();
	}

    var html = "<div style='padding:10px'>" + errorMsg + "</div>"
	
    var o = new $.Overlay({
        useHeading: 1,
        heading: heading,
        block: 0
    });
    o.set.content(html);
    o.set.id("overlay_popUpError"+errorMsgType+"");
    o.set.width(overlayWidth);
	
    o.element.find("a.overlayClose").click(function() { o.close(); return false;});
    o.open();

}


function showManualError (errorMsg, errorMsgType, errorMsgHolder) {
	
	$('.' + errorMsgType).remove();

	$(errorMsgHolder).prepend('<div class="errorMsg ' + errorMsgType + '" style="display:block">' + errorMsg + '</div>')
	return;

}

function escapeHTML(str) {
	strHTML = ""

	for (i=0; i < str.length; i++) {
		strHTMLChar = str.charAt(i);
		if (strHTMLChar == '<') {strHTMLChar = '&lt;'};
		if (strHTMLChar == '>') {strHTMLChar = '&gt;'};
		if (strHTMLChar == '&') {strHTMLChar = '&amp;'};
		strHTML += strHTMLChar;
	}

	return strHTML;
}

//   HtmlDecode http://lab.msdn.microsoft.com/annotations/htmldecode.js
//   client side version of the useful Server.HtmlDecode method
//   takes one string (encoded) and returns another (decoded)

function HtmlDecode(s)

{
      var out = "";
      if (s==null) return;

      var l = s.length;
      for (var i=0; i<l; i++)
      {

            var ch = s.charAt(i);
            if (ch == '&')
            {

            var semicolonIndex = s.indexOf(';', i+1);
            if (semicolonIndex > 0)
            {

                        var entity = s.substring(i + 1, semicolonIndex);
                        if (entity.length > 1 && entity.charAt(0) == '#')
                        {

                              if (entity.charAt(1) == 'x' || entity.charAt(1) == 'X')
                                    ch = String.fromCharCode(eval('0'+entity.substring(1)));
                              else
                                    ch = String.fromCharCode(eval(entity.substring(1)));
                        }
                    else
                      {
                              switch (entity)
                              {
                                    case 'quot': ch = String.fromCharCode(0x0022); break;
                                    case 'amp': ch = String.fromCharCode(0x0026); break;
                                    case 'lt': ch = String.fromCharCode(0x003c); break;
                                    case 'gt': ch = String.fromCharCode(0x003e); break;
                                    case 'nbsp': ch = String.fromCharCode(0x00a0); break;
                                    case 'iexcl': ch = String.fromCharCode(0x00a1); break;
                                    case 'cent': ch = String.fromCharCode(0x00a2); break;
                                    case 'pound': ch = String.fromCharCode(0x00a3); break;
                                    case 'curren': ch = String.fromCharCode(0x00a4); break;
                                    case 'yen': ch = String.fromCharCode(0x00a5); break;
                                    case 'brvbar': ch = String.fromCharCode(0x00a6); break;
                                    case 'sect': ch = String.fromCharCode(0x00a7); break;
                                    case 'uml': ch = String.fromCharCode(0x00a8); break;
                                    case 'copy': ch = String.fromCharCode(0x00a9); break;
                                    case 'ordf': ch = String.fromCharCode(0x00aa); break;
                                    case 'laquo': ch = String.fromCharCode(0x00ab); break;
                                    case 'not': ch = String.fromCharCode(0x00ac); break;
                                    case 'shy': ch = String.fromCharCode(0x00ad); break;
                                    case 'reg': ch = String.fromCharCode(0x00ae); break;
                                    case 'macr': ch = String.fromCharCode(0x00af); break;
                                    case 'deg': ch = String.fromCharCode(0x00b0); break;
                                    case 'plusmn': ch = String.fromCharCode(0x00b1); break;
                                    case 'sup2': ch = String.fromCharCode(0x00b2); break;
                                    case 'sup3': ch = String.fromCharCode(0x00b3); break;
                                    case 'acute': ch = String.fromCharCode(0x00b4); break;
                                    case 'micro': ch = String.fromCharCode(0x00b5); break;
                                    case 'para': ch = String.fromCharCode(0x00b6); break;
                                    case 'middot': ch = String.fromCharCode(0x00b7); break;
                                    case 'cedil': ch = String.fromCharCode(0x00b8); break;
                                    case 'sup1': ch = String.fromCharCode(0x00b9); break;
                                    case 'ordm': ch = String.fromCharCode(0x00ba); break;
                                    case 'raquo': ch = String.fromCharCode(0x00bb); break;
                                    case 'frac14': ch = String.fromCharCode(0x00bc); break;
                                    case 'frac12': ch = String.fromCharCode(0x00bd); break;
                                    case 'frac34': ch = String.fromCharCode(0x00be); break;
                                    case 'iquest': ch = String.fromCharCode(0x00bf); break;
                                    case 'Agrave': ch = String.fromCharCode(0x00c0); break;
                                    case 'Aacute': ch = String.fromCharCode(0x00c1); break;
                                    case 'Acirc': ch = String.fromCharCode(0x00c2); break;
                                    case 'Atilde': ch = String.fromCharCode(0x00c3); break;
                                    case 'Auml': ch = String.fromCharCode(0x00c4); break;
                                    case 'Aring': ch = String.fromCharCode(0x00c5); break;
                                    case 'AElig': ch = String.fromCharCode(0x00c6); break;
                                    case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
                                    case 'Egrave': ch = String.fromCharCode(0x00c8); break;
                                    case 'Eacute': ch = String.fromCharCode(0x00c9); break;
                                    case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
                                    case 'Euml': ch = String.fromCharCode(0x00cb); break;
                                    case 'Igrave': ch = String.fromCharCode(0x00cc); break;
                                    case 'Iacute': ch = String.fromCharCode(0x00cd); break;
                                    case 'Icirc': ch = String.fromCharCode(0x00ce ); break;
                                    case 'Iuml': ch = String.fromCharCode(0x00cf); break;
                                    case 'ETH': ch = String.fromCharCode(0x00d0); break;
                                    case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
                                    case 'Ograve': ch = String.fromCharCode(0x00d2); break;
                                    case 'Oacute': ch = String.fromCharCode(0x00d3); break;
                                    case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
                                    case 'Otilde': ch = String.fromCharCode(0x00d5); break;
                                    case 'Ouml': ch = String.fromCharCode(0x00d6); break;
                                    case 'times': ch = String.fromCharCode(0x00d7); break;
                                    case 'Oslash': ch = String.fromCharCode(0x00d8); break;
                                    case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
                                    case 'Uacute': ch = String.fromCharCode(0x00da); break;
                                    case 'Ucirc': ch = String.fromCharCode(0x00db); break;
                                    case 'Uuml': ch = String.fromCharCode(0x00dc); break;
                                    case 'Yacute': ch = String.fromCharCode(0x00dd); break;
                                    case 'THORN': ch = String.fromCharCode(0x00de); break;
                                    case 'szlig': ch = String.fromCharCode(0x00df); break;
                                    case 'agrave': ch = String.fromCharCode(0x00e0); break;
                                    case 'aacute': ch = String.fromCharCode(0x00e1); break;
                                    case 'acirc': ch = String.fromCharCode(0x00e2); break;
                                    case 'atilde': ch = String.fromCharCode(0x00e3); break;
                                    case 'auml': ch = String.fromCharCode(0x00e4); break;
                                    case 'aring': ch = String.fromCharCode(0x00e5); break;
                                    case 'aelig': ch = String.fromCharCode(0x00e6); break;
                                    case 'ccedil': ch = String.fromCharCode(0x00e7); break;
                                    case 'egrave': ch = String.fromCharCode(0x00e8); break;
                                    case 'eacute': ch = String.fromCharCode(0x00e9); break;
                                    case 'ecirc': ch = String.fromCharCode(0x00ea); break;
                                    case 'euml': ch = String.fromCharCode(0x00eb); break;
                                    case 'igrave': ch = String.fromCharCode(0x00ec); break;
                                    case 'iacute': ch = String.fromCharCode(0x00ed); break;
                                    case 'icirc': ch = String.fromCharCode(0x00ee); break;
                                    case 'iuml': ch = String.fromCharCode(0x00ef); break;
                                    case 'eth': ch = String.fromCharCode(0x00f0); break;
                                    case 'ntilde': ch = String.fromCharCode(0x00f1); break;
                                    case 'ograve': ch = String.fromCharCode(0x00f2); break;
                                    case 'oacute': ch = String.fromCharCode(0x00f3); break;
                                    case 'ocirc': ch = String.fromCharCode(0x00f4); break;
                                    case 'otilde': ch = String.fromCharCode(0x00f5); break;
                                    case 'ouml': ch = String.fromCharCode(0x00f6); break;
                                    case 'divide': ch = String.fromCharCode(0x00f7); break;
                                    case 'oslash': ch = String.fromCharCode(0x00f8); break;
                                    case 'ugrave': ch = String.fromCharCode(0x00f9); break;
                                    case 'uacute': ch = String.fromCharCode(0x00fa); break;
                                    case 'ucirc': ch = String.fromCharCode(0x00fb); break;
                                    case 'uuml': ch = String.fromCharCode(0x00fc); break;
                                    case 'yacute': ch = String.fromCharCode(0x00fd); break;
                                    case 'thorn': ch = String.fromCharCode(0x00fe); break;
                                    case 'yuml': ch = String.fromCharCode(0x00ff); break;
                                    case 'OElig': ch = String.fromCharCode(0x0152); break;
                                    case 'oelig': ch = String.fromCharCode(0x0153); break;
                                    case 'Scaron': ch = String.fromCharCode(0x0160); break;
                                    case 'scaron': ch = String.fromCharCode(0x0161); break;
                                    case 'Yuml': ch = String.fromCharCode(0x0178); break;
                                    case 'fnof': ch = String.fromCharCode(0x0192); break;
                                    case 'circ': ch = String.fromCharCode(0x02c6); break;
                                    case 'tilde': ch = String.fromCharCode(0x02dc); break;
                                    case 'Alpha': ch = String.fromCharCode(0x0391); break;
                                    case 'Beta': ch = String.fromCharCode(0x0392); break;
                                    case 'Gamma': ch = String.fromCharCode(0x0393); break;
                                    case 'Delta': ch = String.fromCharCode(0x0394); break;
                                    case 'Epsilon': ch = String.fromCharCode(0x0395); break;
                                    case 'Zeta': ch = String.fromCharCode(0x0396); break;
                                    case 'Eta': ch = String.fromCharCode(0x0397); break;
                                    case 'Theta': ch = String.fromCharCode(0x0398); break;
                                    case 'Iota': ch = String.fromCharCode(0x0399); break;
                                    case 'Kappa': ch = String.fromCharCode(0x039a); break;
                                    case 'Lambda': ch = String.fromCharCode(0x039b); break;
                                    case 'Mu': ch = String.fromCharCode(0x039c); break;
                                    case 'Nu': ch = String.fromCharCode(0x039d); break;
                                    case 'Xi': ch = String.fromCharCode(0x039e); break;
                                    case 'Omicron': ch = String.fromCharCode(0x039f); break;
                                    case 'Pi': ch = String.fromCharCode(0x03a0); break;
                                    case ' Rho ': ch = String.fromCharCode(0x03a1); break;
                                    case 'Sigma': ch = String.fromCharCode(0x03a3); break;
                                    case 'Tau': ch = String.fromCharCode(0x03a4); break;
                                    case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
                                    case 'Phi': ch = String.fromCharCode(0x03a6); break;
                                    case 'Chi': ch = String.fromCharCode(0x03a7); break;
                                    case 'Psi': ch = String.fromCharCode(0x03a8); break;
                                    case 'Omega': ch = String.fromCharCode(0x03a9); break;
                                    case 'alpha': ch = String.fromCharCode(0x03b1); break;
                                    case 'beta': ch = String.fromCharCode(0x03b2); break;
                                    case 'gamma': ch = String.fromCharCode(0x03b3); break;
                                    case 'delta': ch = String.fromCharCode(0x03b4); break;
                                    case 'epsilon': ch = String.fromCharCode(0x03b5); break;
                                    case 'zeta': ch = String.fromCharCode(0x03b6); break;
                                    case 'eta': ch = String.fromCharCode(0x03b7); break;
                                    case 'theta': ch = String.fromCharCode(0x03b8); break;
                                    case 'iota': ch = String.fromCharCode(0x03b9); break;
                                    case 'kappa': ch = String.fromCharCode(0x03ba); break;
                                    case 'lambda': ch = String.fromCharCode(0x03bb); break;
                                    case 'mu': ch = String.fromCharCode(0x03bc); break;
                                    case 'nu': ch = String.fromCharCode(0x03bd); break;
                                    case 'xi': ch = String.fromCharCode(0x03be); break;
                                    case 'omicron': ch = String.fromCharCode(0x03bf); break;
                                    case 'pi': ch = String.fromCharCode(0x03c0); break;
                                    case 'rho': ch = String.fromCharCode(0x03c1); break;
                                    case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
                                    case 'sigma': ch = String.fromCharCode(0x03c3); break;
                                    case 'tau': ch = String.fromCharCode(0x03c4); break;
                                    case 'upsilon': ch = String.fromCharCode(0x03c5); break;
                                    case 'phi': ch = String.fromCharCode(0x03c6); break;
                                    case 'chi': ch = String.fromCharCode(0x03c7); break;
                                    case 'psi': ch = String.fromCharCode(0x03c8); break;
                                    case 'omega': ch = String.fromCharCode(0x03c9); break;
                                    case 'thetasym': ch = String.fromCharCode(0x03d1); break;
                                    case 'upsih': ch = String.fromCharCode(0x03d2); break;
                                    case 'piv': ch = String.fromCharCode(0x03d6); break;
                                    case 'ensp': ch = String.fromCharCode(0x2002); break;
                                    case 'emsp': ch = String.fromCharCode(0x2003); break;
                                    case 'thinsp': ch = String.fromCharCode(0x2009); break;
                                    case 'zwnj': ch = String.fromCharCode(0x200c); break;
                                    case 'zwj': ch = String.fromCharCode(0x200d); break;
                                    case 'lrm': ch = String.fromCharCode(0x200e); break;
                                    case 'rlm': ch = String.fromCharCode(0x200f); break;
                                    case 'ndash': ch = String.fromCharCode(0x2013); break;
                                    case 'mdash': ch = String.fromCharCode(0x2014); break;
                                    case 'lsquo': ch = String.fromCharCode(0x2018); break;
                                    case 'rsquo': ch = String.fromCharCode(0x2019); break;
                                    case 'sbquo': ch = String.fromCharCode(0x201a); break;
                                    case 'ldquo': ch = String.fromCharCode(0x201c); break;
                                    case 'rdquo': ch = String.fromCharCode(0x201d); break;
                                    case 'bdquo': ch = String.fromCharCode(0x201e); break;
                                    case 'dagger': ch = String.fromCharCode(0x2020); break;
                                    case 'Dagger': ch = String.fromCharCode(0x2021); break;
                                    case 'bull': ch = String.fromCharCode(0x2022); break;
                                    case 'hellip': ch = String.fromCharCode(0x2026); break;
                                    case 'permil': ch = String.fromCharCode(0x2030); break;
                                    case 'prime': ch = String.fromCharCode(0x2032); break;
                                    case 'Prime': ch = String.fromCharCode(0x2033); break;
                                    case 'lsaquo': ch = String.fromCharCode(0x2039); break;
                                    case 'rsaquo': ch = String.fromCharCode(0x203a); break;
                                    case 'oline': ch = String.fromCharCode(0x203e); break;
                                    case 'frasl': ch = String.fromCharCode(0x2044); break;
                                    case 'euro': ch = String.fromCharCode(0x20ac); break;
                                    case 'image': ch = String.fromCharCode(0x2111); break;
                                    case 'weierp': ch = String.fromCharCode(0x2118); break;
                                    case 'real': ch = String.fromCharCode(0x211c); break;
                                    case 'trade': ch = String.fromCharCode(0x2122); break;
                                    case 'alefsym': ch = String.fromCharCode(0x2135); break;
                                    case 'larr': ch = String.fromCharCode(0x2190); break;
                                    case 'uarr': ch = String.fromCharCode(0x2191); break;
                                    case 'rarr': ch = String.fromCharCode(0x2192); break;
                                    case 'darr': ch = String.fromCharCode(0x2193); break;
                                    case 'harr': ch = String.fromCharCode(0x2194); break;
                                    case 'crarr': ch = String.fromCharCode(0x21b5); break;
                                    case 'lArr': ch = String.fromCharCode(0x21d0); break;
                                    case 'uArr': ch = String.fromCharCode(0x21d1); break;
                                    case 'rArr': ch = String.fromCharCode(0x21d2); break;
                                    case 'dArr': ch = String.fromCharCode(0x21d3); break;
                                    case 'hArr': ch = String.fromCharCode(0x21d4); break;
                                    case 'forall': ch = String.fromCharCode(0x2200); break;
                                    case 'part': ch = String.fromCharCode(0x2202); break;
                                    case 'exist': ch = String.fromCharCode(0x2203); break;
                                    case 'empty': ch = String.fromCharCode(0x2205); break;
                                    case 'nabla': ch = String.fromCharCode(0x2207); break;
                                    case 'isin': ch = String.fromCharCode(0x2208); break;
                                    case 'notin': ch = String.fromCharCode(0x2209); break;
                                    case 'ni': ch = String.fromCharCode(0x220b); break;
                                    case 'prod': ch = String.fromCharCode(0x220f); break;
                                    case 'sum': ch = String.fromCharCode(0x2211); break;
                                    case 'minus': ch = String.fromCharCode(0x2212); break;
                                    case 'lowast': ch = String.fromCharCode(0x2217); break;
                                    case 'radic': ch = String.fromCharCode(0x221a); break;
                                    case 'prop': ch = String.fromCharCode(0x221d); break;
                                    case 'infin': ch = String.fromCharCode(0x221e); break;
                                    case 'ang': ch = String.fromCharCode(0x2220); break;
                                    case 'and': ch = String.fromCharCode(0x2227); break;
                                    case 'or': ch = String.fromCharCode(0x2228); break;
                                    case 'cap': ch = String.fromCharCode(0x2229); break;
                                    case 'cup': ch = String.fromCharCode(0x222a); break;
                                    case 'int': ch = String.fromCharCode(0x222b); break;
                                    case 'there4': ch = String.fromCharCode(0x2234); break;
                                    case 'sim': ch = String.fromCharCode(0x223c); break;
                                    case 'cong': ch = String.fromCharCode(0x2245); break;
                                    case 'asymp': ch = String.fromCharCode(0x2248); break;
                                    case 'ne': ch = String.fromCharCode(0x2260); break;
                                    case 'equiv': ch = String.fromCharCode(0x2261); break;
                                    case 'le': ch = String.fromCharCode(0x2264); break;
                                    case 'ge': ch = String.fromCharCode(0x2265); break;
                                    case 'sub': ch = String.fromCharCode(0x2282); break;
                                    case 'sup': ch = String.fromCharCode(0x2283); break;
                                    case 'nsub': ch = String.fromCharCode(0x2284); break;
                                    case 'sube': ch = String.fromCharCode(0x2286); break;
                                    case 'supe': ch = String.fromCharCode(0x2287); break;
                                    case 'oplus': ch = String.fromCharCode(0x2295); break;
                                    case 'otimes': ch = String.fromCharCode(0x2297); break;
                                    case 'perp': ch = String.fromCharCode(0x22a5); break;
                                    case 'sdot': ch = String.fromCharCode(0x22c5); break;
                                    case 'lceil': ch = String.fromCharCode(0x2308); break;
                                    case 'rceil': ch = String.fromCharCode(0x2309); break;
                                    case 'lfloor': ch = String.fromCharCode(0x230a); break;
                                    case 'rfloor': ch = String.fromCharCode(0x230b); break;
                                    case 'lang': ch = String.fromCharCode(0x2329); break;
                                    case 'rang': ch = String.fromCharCode(0x232a); break;
                                    case 'loz': ch = String.fromCharCode(0x25ca); break;
                                    case 'spades': ch = String.fromCharCode(0x2660); break;
                                    case 'clubs': ch = String.fromCharCode(0x2663); break;
                                    case 'hearts': ch = String.fromCharCode(0x2665); break;
                                    case 'diams': ch = String.fromCharCode(0x2666); break;
                                    default: ch = ''; break;
                              }
                        }
                        i = semicolonIndex;
                  }
            }
            out += ch;
      }
      return out;
}
// Common Sense Category Text / Dual Display
$(function() {
	//var commonSenseCategoryViewToggle = function() {
		if(document.getElementById("common-sense-box") != null){
			// first call is for older version of common sense markup, for backward compatibility
			ui.toggleView(".js-expand-trailing-text", "p", "li");
			ui.toggleView(".js-expand-trailing-text", "p", "td#result-cat-info");
		}
	//};
});
