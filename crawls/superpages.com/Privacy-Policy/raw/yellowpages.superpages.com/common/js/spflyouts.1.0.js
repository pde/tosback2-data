/*!
* sp SignInRegistration JavaScript Library v1.4.2
* http://yellowpages.superpages.com/common/js/spflyouts.1.0.js
*
* Copyright 2010, Utpal
* Requires : jQuery v1.4.2
* Includes :
*
* Date: Sep 2010 - Oct 2010
*/
// only because out of the box jquery just ships with $.getJSON and need to post everything instead of get
// to avoid json-ajax hijacking.
var spFBcookieChange = "";
$.postJSON = function(url, data, callback) {return jQuery.post(url,data,callback,"json");};
jQuery.fn.center = function () {
this.css("position","absolute");
this.css("top", ( $(window).height() - this.height() ) / 3+$(window).scrollTop() + "px");
this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
return this;
}
/* Encironment object to ensure that the right url by environment is used*/
var spEnvironment = {
prodDomains : ["www.superpages.com","yellowpages.superpages.com","cars.superpages.com","mapserver.superpages.com","maps.superpages.com","shopping.superpages.com","coupons.superpages.com","www.superguarantee.com","blackfriday.superpages.com","cybermonday.superpages.com"],
testDomains : ["spdev.superpages.com","sptest.superpages.com","gypsyhome.superpages.com","gypsy-test.superpages.com","gypsy-test2.superpages.com","jt1.superpages.com","jt2.superpages.com","jt3.superpages.com","jt4.superpages.com","jt5.superpages.com","labsjt02.superpages.com","spyptst01-zone1.superpages.com","spyptst02-zone1.superpages.com","swbdtst01.superpages.com","yptest3.superpages.com","sys-csg.supermedia.com","victor.superpages.com","shopping.localhost","cars-test.superpages.com","shopping-dev.superpages.com","shopping-test.superpages.com","blackfriday-dev.superpages.com","blackfriday-test,superpages.com","cybermonday-dev.superpages.com","cybermonday-test.superpages.com"],
devDomains : ["utpalsmac.supermedia.com"],
//mapsApp : ["mapserver.superpages.com","yptest3.superpages.com","maps.superpages.com","victor.superpages.com"],
mapsApp : ["disabled."],
checkEnvironment : function() {
if ($.inArray(document.domain,this.prodDomains) > -1) {return "prod";}
else if ($.inArray(document.domain,this.testDomains) > -1) {return "test";}
else {return "dev";}
},
resolveUrl : function(urlType) {
var env = this.checkEnvironment();
var returnUrl = "";
if (typeof hostServ === 'undefined' || hostServ == "http://www.superpages.com"){
returnUrl = "https://yellowpages.superpages.com";
} else {
returnUrl = hostServ;
}
return returnUrl;
/*
if(urlType === 'secure'){
switch(env){
case 'prod':
returnUrl = "https://yellowpages.superpages.com";
break;
case 'test':
//returnUrl = "https://sslgypsy-test.superpages.com";
returnUrl = "http://jt0.superpages.com:9080";
break;
case 'dev':
//returnUrl = "https://sslgypsy-test.superpages.com";
returnUrl = "http://" + document.domain + ":9080";
break;
default:
break;
} // End of switch
return returnUrl;
} else {
switch(env){
case 'prod':
returnUrl = "http://yellowpages.superpages.com";
break;
case 'test':
//returnUrl = "http://gypsy-test.superpages.com";
returnUrl = "http://jt0.superpages.com:9080";
break;
case 'dev':
//returnUrl = "http://gypsy-test.superpages.com";
returnUrl = "http://wal2-rosadodd.supermedia.com:9080";
break;
default:
//returnUrl = "http://" + document.domain ;
returnUrl = "http://wal2-rosadodd.supermedia.com:9080";
break;
} // End of switch
return returnUrl;
}
*/
},
getBaseUrl : function() {
return this.resolveUrl('unsecure');
} ,
getSecureUrl : function() {
return this.resolveUrl('secure');
},
getDomain : function() {
return document.domain;
},
isMapsApp : function() {
if ($.inArray(document.domain,this.mapsApp) > -1) {
return true;
} else {
return false;
}
},
getCookieDomain : function() {
// So that the cookie is valid across all subdomains
var thisDomain = "";
var currentDomain = document.domain;
if (currentDomain) {
var subDomainArray = currentDomain.split(".");
if (subDomainArray.length > 1) {
var leadIdx = subDomainArray.length - 2;
for (ix = 0; ix < subDomainArray.length; ix++) {
if (ix >= leadIdx) {
thisDomain = thisDomain + "." + subDomainArray[ix];
}
}
}
}
return thisDomain;
}
};
//spModal object .
// Intended use only to render a modal dialog for e.g. like the registration signin etc .
// If the dialog that needs to be rendered as a modal does not have a z-index , the dialog will be opened
// with a z-index of 3000 otherwise the z-index of the dialog being rendered as a modal dialog will be used.
// The overlay shadow class will be laid with a a zindex 1 lower than the z-index of the modal dialog
var spModal = {
showSpModal: function(element) {
if (!$('#spOverlay').length > 0) { // Prevent a double overlay
if ($(element).length > 0) {
// mzindex : zIndex value of the modal
// ozindex : ZIndex value of the overlay
var mzIndex = parseInt($(element).css("z-index"),10);
// the check below necessary as IE returns 0 whereas other browsers return a string
if( !isNaN( mzIndex ) && mzIndex !== 0 ) {
ozIndex = mzIndex - 1;
} else {
// default z-Index if no z-index is set on that element being rendered as a modal dailog
mzIndex = 3000;
ozIndex = mzIndex - 1;
$(element).css("z-index",mzIndex);
}
// ie6 check
var isIE = $.browser.msie; // browser sniffing is bad
//var ie6 = $.browser.msie && ($.browser.version == "6.0"); //browser sniffing bad
// The overlay class
var spoverlay = $('<div id="spOverlay"></div>');
// create the over lay class
spoverlay.addClass('spOverlay').prependTo('body');
//alert($('#spOverlay').css("z-index"));
if (isIE) {
// only because IE does not support opacity
if ($('#spOverlay').length > 0) {
// Do not reverse this order
$('#spOverlay').css('-ms-filter','progid:DXImageTransform.Microsoft.Alpha(Opacity=25)');
$('#spOverlay').css('filter','alpha(opacity=25)');
}
} else {
if ($('#spOverlay').length > 0) {
$('#spOverlay').css("opacity","0.25");
}
}
// Set the zIndex at the end
$('#spOverlay').css("z-index",ozIndex);
}
}
} ,
hideSpModal: function(element) {
if ($(element).length > 0) {
// Remove the overlay class
$('#spOverlay').remove();
}
}
};
function ajaxInit() {
// can be used to show an animated gif as as indicator while an ajax
// reguest is being made
$('#loadingIndicator').bind('ajaxStart',function() {$(this).show();}).bind('ajaxComplete',function() {$(this).hide();});
$.ajaxSetup({error: function(xhr, status, error) {alert(status);}});
}
/*
* The spFlyouts object to control the showing and hiding of all the sign-in /registration flyouts
*/
var spFlyouts = {
/*All the show functions*/
showSignin : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideRegister(SRC);
this.hideEditProfile(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideSgSignUp(SRC);
this.hideSgTc(SRC);
this.hideForgotPasswordText(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
this.showTitle(SRC);
this.showStaticText(SRC);
$('#title_signin').text('Sign In');
$('#REGtabContainerReturnUser').show();
$('#returnUser').show();
$('#returnUserEmail').focus();
}
},
showRegister : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideEditProfile(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideSgSignUp(SRC);
this.hideSgTc(SRC);
this.hideForgotPasswordText(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
this.showTitle(SRC);
this.showStaticText(SRC);
$('#title_signin').text('Register');
$('#REGtabContainerNewUser').show();
$('#newUser').show();
$('#newUserEmail').focus();
}
},
showEditProfile : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideRegister(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideSgSignUp(SRC);
this.hideSgTc(SRC);
this.hideStaticText(SRC);
this.hideForgotPasswordText(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
this.showWelomeReturnUserTitle(SRC);
$('#generalTabMessage').text('Edit Profile');
$('#REGtabContainerGeneral').show();
$('#editProfile').show();
if(spUser.getSignedIn()){
$('#editProfileEmail').val(spUser.getUserEmail());
$('#editProfileConfirmEmail').val(spUser.getUserEmail());
$('#editProfileNickname').val(spUser.getNickName());
$('#editProfileZip5').val(spUser.getZip5());
//$('#editProfileZip4').val(spUser.getZip4());
$('#editProfileEmail').focus();
}
}
},
showSendPassword : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideRegister(SRC);
this.hideEditProfile(SRC);
this.hideChangePassword(SRC);
this.hideSgSignUp(SRC);
this.hideSgTc(SRC);
this.hideStaticText(SRC);
this.hideWelcomeUser(SRC);
this.showTitle(SRC);
this.showForgotPasswordText(SRC);
this.hideStatusResponseMessage(SRC);
$('#title_signin').text('Forgot Password');
$('#REGtabContainerReturnUser').show();
$('#sendPassword').show();
$('#sendPwEmail').focus();
}
},
showChangePassword : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors();
this.hideSignin();
this.hideRegister();
this.hideEditProfile();
this.hideSendPassword();
this.hideSgSignUp();
this.hideSgTc();
this.hideWelcomeUser(SRC);
this.hideStaticText(SRC);
this.hideForgotPasswordText(SRC);
this.hideStatusResponseMessage();
this.showWelomeReturnUserTitle();
$('#generalTabMessage').text('Change Password');
$('#REGtabContainerGeneral').show();
$('#changePassword').show();
$('#oldPassword').focus();
}
},
showSgSignUp : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideRegister(SRC);
this.hideEditProfile(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideTitle(SRC);
this.hideWelcomeNewUserTitle(SRC);
this.hideWelcomeReturnUserTitle(SRC);
this.hideSgTc(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
$('#registrationMessage_SGsignup').show();
$('#RegtabContainerSG').show();
$('#sgSignup').show();
}
},
showSgTc : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideRegister(SRC);
this.hideEditProfile(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideTitle(SRC);
this.hideWelcomeNewUserTitle(SRC);
this.hideWelcomeReturnUserTitle(SRC);
this.hideSgSignUp(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
$('#registrationMessage_SGTC').show();
$('#RegtabContainerSG').show();
$('#sgTc').show();
}
},
showTitle : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideWelcomeNewUserTitle(SRC);
this.hideWelcomeReturnUserTitle(SRC);
$('#title_signin').show();
}
},
showStaticText : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#signinregistrationMessage_text').show();
}
},
showForgotPasswordText : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#forgotpasswordMessage_text').show();
}
},
showWelcomeNewUserTitle : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideTitle(SRC);
this.hideWelcomeReturnUserTitle(SRC);
$('#welcomeText').text(spUser.getNickName());
$('#title_welcome').show();
}
},
showWelomeReturnUserTitle : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideTitle(SRC);
this.hideWelcomeNewUserTitle(SRC);
$('#welcomeBackText').text(spUser.getNickName());
$('#title_welcomeBack').show();
}
},
showWelcomeUser : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
this.hideErrors(SRC);
this.hideSignin(SRC);
this.hideRegister(SRC);
this.hideSendPassword(SRC);
this.hideChangePassword(SRC);
this.hideSgSignUp(SRC);
this.hideSgTc(SRC);
this.hideStaticText(SRC);
this.hideWelcomeUser(SRC);
this.hideStatusResponseMessage(SRC);
this.showWelomeReturnUserTitle(SRC);
$('#registrationMessage_welcomeUser').show();
}
},
showErrors: function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#registrationMessage_errors').show();
}
},
/* All the hide functions*/
hideSignin : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#REGtabContainerReturnUser').hide();
$('#returnUser').hide();
}
},
hideRegister : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#REGtabContainerNewUser').hide();
$('#newUser').hide();
}
},
hideEditProfile : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#REGtabContainerGeneral').hide();
$('#editProfile').hide();
}
},
hideSendPassword : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#REGtabContainerReturnUser').hide();
$('#sendPassword').hide();
}
},
hideChangePassword : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#REGtabContainerGeneral').hide();
$('#changePassword').hide();
}
},
hideSgSignUp: function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#registrationMessage_SGsignup').hide();
$('#RegtabContainerSG').hide();
$('#sgSignup').hide();
}
},
hideSgTc : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#registrationMessage_SGTC').hide();
$('#RegtabContainerSG').hide();
$('#sgTc').hide();
}
},
hideTitle : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#title_signin').hide();
}
},
hideStaticText : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#signinregistrationMessage_text').hide();
}
},
hideForgotPasswordText : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#forgotpasswordMessage_text').hide();
}
},
hideWelcomeNewUserTitle : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#title_welcome').hide();
}
},
hideWelcomeReturnUserTitle: function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#title_welcomeBack').hide();
}
},
// hideWelcomeNewUser : function(SRC) {
// if ($('#registrationFlyoutWrapper').length > 0) {
// $('#registrationMessage_welcomeNewUser').hide();
// }
// },
hideWelcomeUser : function() {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#registrationMessage_welcomeUser').hide();
}
},
hideStatusResponseMessage : function(SRC){
$('#statusResponse_Message').hide();
},
hideErrors : function(SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
$('#registrationMessage_errors').hide();
$('#registrationMessage_errors div').hide();
}
// Clear highlighted fields.
$('#registrationFlyoutWrapper .inputInvalid').each(function(){
$(this).removeClass('inputInvalid').css("background-color","#ffffff");
});
// Reset Errors
flyoutValidator.errorList = [];
flyoutValidator.numOfErrors = 0;
},
// Entry point function will show the relevant flyout
show : function(operation,SRC) {
if ($('#registrationFlyoutWrapper').length > 0) {
spModal.showSpModal($('#registrationFlyoutWrapper'));
switch(operation){
case 'signin':
spFlyouts.showSignin(SRC);
break;
case 'register':
spFlyouts.showRegister(SRC);
break;
case 'sendpassword':
spFlyouts.showSendPassword(SRC);
break;
case 'changepassword':
// User should be logged in to trigger this flyouts
var userid = $.spCookie("SPCUID");
if (($.trim(userid) !== "") && (userid !== null)) {
spFlyouts.showChangePassword(SRC);
}
break;
case 'editprofile':
// User should be logged in to trigger this flyouts
var userid = $.spCookie("SPCUID");
if (($.trim(userid) !== "") && (userid !== null)) {
spFlyouts.showEditProfile(SRC);
}
break;
case 'sgsignup':
// do nothing for now
var nooperation = null;
//spFlyouts.showSgSignUp();
break;
case 'sgtc':
// do nothing for now
var nooperation = null;
//spFlyouts.showSgTc();
break;
default:
spFlyouts.showSignin(SRC);
break;
} // End of switch
}
}
};
/*
* Get and Render Flyouts
*/
function getFlyouts(operation,SRC){
if ($('#spSigninRegistration').length > 0 || $('#spEditProfile').length > 0 || SRC === 'maps') {
ajaxInit();
//var url = spEnvironment.getBaseUrl() + '/profiler/getSpFlyouts.jsonp?format=json&callback=?';
$.ajax(
{
type: "GET",
url: spEnvironment.getBaseUrl() + "/profiler/getSpFlyouts.jsonp?",
data: {
spdomain : spEnvironment.getDomain(),
src : SRC
},
dataType: 'jsonp',
success: function(msg) {
if ( msg.htmlString ) {
// Remove if it exists in the DOM and then re-add
if ($('#registrationFlyoutWrapper').length > 0) {
$("#registrationFlyoutWrapper").remove();
}
// Add the flyouts to the DOM again .appendTo is faster than the html function.
// Add the code to the body so that it works as a modal dialog.
$(msg.htmlString).appendTo('body');
if ($('#registrationFlyoutWrapper').length > 0) {
if (spEnvironment.isMapsApp()) {
$('#registrationFlyoutWrapper').css("top","150"+"px");
$('#registrationFlyoutWrapper').css("left","575"+"px");
} else {
$('#registrationFlyoutWrapper').center();
}
spFlyouts.show(operation,SRC);
} else {
}
}
}
});
return false;
}
}
function getfbFlyouts(operation,SRC){
if ($('#spSigninRegistration').length > 0 || $('#spEditProfile').length > 0 || SRC === 'maps') {
ajaxInit();
//var url = spEnvironment.getBaseUrl() + '/profiler/getSpFlyouts.jsonp?format=json&callback=?';
$.ajax(
{
type: "GET",
url: spEnvironment.getBaseUrl() + "/profiler/getSpFlyouts.jsonp?",
data: {
spdomain : spEnvironment.getDomain(),
src : SRC
},
dataType: 'jsonp',
success: function(msg) {
if ( msg.htmlString ) {
// Remove if it exists in the DOM and then re-add
if ($('#FBregistrationFlyoutWrapper').length > 0) {
$("#FBregistrationFlyoutWrapper").remove();
}
// Add the flyouts to the DOM again .appendTo is faster than the html function.
// Add the code to the body so that it works as a modal dialog.
$(msg.htmlString).appendTo('body');
if ($('#FBregistrationFlyoutWrapper').length > 0) {
if (spEnvironment.isMapsApp()) {
$('#FBregistrationFlyoutWrapper').css("top","150"+"px");
$('#FBregistrationFlyoutWrapper').css("left","575"+"px");
} else {
$('#FBregistrationFlyoutWrapper').center();
}
//spFlyouts.show(operation,SRC);
} else {
}
}
}
});
return false;
}
}
/*
* This function to call from any link to activate the flyouts
For now the valid values for operation are
signin , register,editprofile , sendpassword, changepassword
values are case sensitive
*/
function openFlyouts(operation,SRC) {
getFlyouts(operation,SRC);
}
function closeFlyouts() {
if ($('#registrationFlyoutWrapper').length > 0) {
spModal.hideSpModal($('#registrationFlyoutWrapper'));
$('#registrationFlyoutWrapper').hide();
$('#registrationFlyoutWrapper').remove();
// If the flyout was opened from the address book then force a reload
if(location.pathname === "/profiler/abook.jsp" || location.pathname === "/profiler/add_starting_point") {
location.reload();
}
// for maps
if(location.pathname === "/reviews/userrateit.jsp") {
if (spUser.getSignedIn()) {
// Special call back to submit review
signedinNowSubmitReview();
}
}
if (spEnvironment.isMapsApp()) {
if (spUser.getSignedIn()) {
// Special call back for maps
mapsSSOSignOutHandler(spUser.getNickName());
} else {
// Special callback for maps
mapsSSOSignOutHandler(null);
}
}
}
}
/*
* spUser Object : Domain object to maintain user operation
* and to save unnecessary calls to the DB.
*
*/
var spUser = {
signedIn : false,
userId : "",
userName : "",
userEmail : "",
nickName : "",
zip5 : "",
//zip4 : "",
getSignedIn : function() {
var userid = $.spCookie("SPCUID");
var myDirUserName = $.spCookie("myDirUserName");
if (($.trim(userid) !== "") && (userid !== null)) {
this.setSignedIn(true);
} else {
this.setSignedIn(false);
this.resetValues();
}
return this.signedIn;
},
setSignedIn : function(value) {
if(!value){
this.resetValues();
}
this.signedIn = value;
},
getUserId : function() {
return this.userId;
},
setUserId : function(value) {
this.userId = value;
},
getUserName : function() {
return this.userName;
},
setUserName : function(value) {
this.userName = value;
},
getUserEmail : function() {
return this.userEmail;
},
setUserEmail : function(value) {
this.userEmail = value;
},
getNickName : function() {
return this.nickName;
},
setNickName : function(value) {
this.nickName = value;
},
getZip5 : function() {
return this.zip5;
},
setZip5 : function(value) {
this.zip5 = value;
},
resetValues : function() {
this.setUserId(null);
this.setUserName(null);
this.setUserEmail(null);
this.setNickName(null);
this.setZip5(null);
//this.setZip4(null);
// Remove Cookies
$.spCookie("SPCUID",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("myDirUserName",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPFB",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("ECLUID",null,{path:'/',domain:spEnvironment.getCookieDomain()});
// Hi-rated business and coupons cookie
$.spCookie("SPC_HR",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",null,{path:'/',domain:spEnvironment.getCookieDomain()});
}
};
function setLinks(operation) {
if (!spEnvironment.isMapsApp()) {
if(operation === 'signout') {
// Change the signedin link to signin link
$('#spSignedin').replaceWith('<li id="spSignin" class="fbsignin center"><a id="spSigninRegistration" href="javascript:void(0)" rel="nofollow" title="Sign in to your account">' + 'Sign In' + '</a></li>');
// Change the Signout link to facebookLink
// Old link kept for reference
//$('#spSignout').replaceWith('<li id="spFbSignin" class="right"><a class="facebookhd" title="Facebook Sign In" href="javascript:void(0);" onClick="facebookPopup();">'+ 'Facebook Sign In' +'</a></li>');
$('#spSignout').remove();
} else if (operation === 'editprofile') {
//$('#spSignedin').replaceWith('<li class=" fbsignin center" id="spSignedin"><a href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + 'Hello' + ' ' + $.spCookie("myDirUserName") +'</a></li>');
$('#spSignedin').replaceWith('<li class="fbcenter" id="spSignedin"><div style="min-width:80px; max-width:160px"><a class="fbcent" href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + ' ' + $.spCookie("myDirUserName") + '</a><a class="fbcloseimg" id="spSignout" href="javascript:void(0);"><img class="fb-close" src="http://img.superpages.com/images-yp/sp/images/fw/fb-x.png"></a></div></li>');
}
else {
if(spUser.getSignedIn()){
// Change the sign in Link
// Old link kep here for reference
//$('#spSignin').replaceWith('<li class="center" id="spSignedin"><a href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + 'Hello' + ' ' + $.spCookie("myDirUserName") +'</a></li><li class="center" id="spSignout"><a href="javascript:void(0);">' + 'Sign Out' + '</a></li>');
$('#spSignin').replaceWith('<li class="fbcenter" id="spSignedin"><div style="min-width:80px;max-width:160px"><a class="fbcent" href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + ' ' + $.spCookie("myDirUserName") + '</a><a class="fbcloseimg" id="spSignout" href="javascript:void(0);"><img class="fb-close" src="http://img.superpages.com/images-yp/sp/images/fw/fb-x.png"></a></div></li>');
}
}
}
}
// Flyouts Object
var flyoutOperation = {
handleSignIn: function() {
if ($('#registrationFlyoutWrapper').length > 0) {
ajaxInit();
$('#loadingIndicator').show();
spUser.resetValues();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'signin',
spdomain : spEnvironment.getDomain(),
returnUserEmail: $('#returnUserEmail').val(),
returnUserPassword: $('#returnUserPassword').val()
},
dataType: 'jsonp',
success: function(msg) {
if (msg.statusResponse.message === 'ok' && msg.statusResponse.status === 'pass') {
//Set the Cookies
$.spCookie("SPCUID",msg.userid,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("myDirUserName",msg.signature,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
if (($.trim(msg.zip) !== "") && (msg.zip !== null)) {
$.spCookie("SPC_HR",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
} else {
// Check the location cookie
var loc = $.spCookie("SPC_LQ");
if (($.trim(loc) !== "") && (loc !== null)) {
$.spCookie("SPC_HR",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
}
}
spUser.setUserId(msg.userid);
spUser.setUserName(msg.username);
spUser.setUserEmail(msg.email);
spUser.setNickName(msg.signature);
spUser.setZip5(msg.zip);
//spUser.setZip4(msg.zipExt);
spUser.setSignedIn(true);
$('#loadingIndicator').hide();
$('#fbSignIn_Container').hide();
setLinks('signin');
flyoutOperation.handleSGLinks();
spFlyouts.showWelcomeUser();
// Modify Navbar links
} else if (msg.statusResponse.status === 'fail') {
$('#loadingIndicator').hide();
spUser.setSignedIn(false);
var errorIds = msg.statusResponse.errorIds;
var highlightIds = msg.statusResponse.highlightIds;
if(errorIds) {
$('#registrationMessage_errors').show();
$.each(errorIds,function(index,value){
$(value).show();$(value + ' div').show();
});
}
if(highlightIds) {
$.each(highlightIds,function(index,value){
$(value).addClass('inputInvalid').css("background-color","#ffffc8");
});
$(highlightIds[0]).focus();
}
//var errorId = msg.statusResponse.
} else {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
}
}
});
return false;
}
} ,
handleRegister: function(){
if ($('#registrationFlyoutWrapper').length > 0) {
ajaxInit();
$('#loadingIndicator').show();
spUser.resetValues();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'register',
spdomain : spEnvironment.getDomain(),
newUserEmail: $('#newUserEmail').val(),
newUserConfirmEmail: $('#newUserConfirmEmail').val(),
newUserCreatePassword: $('#newUserCreatePassword').val(),
//newUserNickname: $('#newUserNickname').val(),
newUserZip5: $('#newUserZip5').val(),
userId : $.spCookie("SPCUID")
},
dataType: 'jsonp',
success: function(msg) {
if (msg.statusResponse.message == 'ok' && msg.statusResponse.status === 'pass') {
//Set the Cookies
$.spCookie("SPCUID",msg.userid,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("myDirUserName",msg.signature,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
if (($.trim(msg.zip) !== "") && (msg.zip !== null)) {
$.spCookie("SPC_HR",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
} else {
// Check the location cookie
var loc = $.spCookie("SPC_LQ");
if (($.trim(loc) !== "") && (loc !== null)) {
$.spCookie("SPC_HR",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
}
}
spUser.setUserId(msg.userid);
spUser.setUserName(msg.username);
spUser.setUserEmail(msg.email);
spUser.setNickName(msg.signature);
spUser.setZip5(msg.zip);
//spUser.setZip4(msg.zipExt);
spUser.setSignedIn(true);
$('#loadingIndicator').hide();
$('#fbSignIn_Container').hide();
setLinks('register');
flyoutOperation.handleSGLinks();
spFlyouts.showWelcomeUser();
// Modify Navbar links
} else if (msg.statusResponse.status === 'fail') {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
var errorIds = msg.statusResponse.errorIds;
var highlightIds = msg.statusResponse.highlightIds;
//$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(errorIds) {
$('#registrationMessage_errors').show();
$.each(errorIds,function(index,value){
$(value).show();$(value + ' div').show();
});
}
if(highlightIds) {
$.each(highlightIds,function(index,value){
$(value).addClass('inputInvalid').css("background-color","#ffffc8");
});
$(highlightIds[0]).focus();
}
} else {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
}
}
});
return false;
}
} ,
handleEditProfile : function() {
if ($('#registrationFlyoutWrapper').length > 0) {
ajaxInit();
$('#statusResponse_Message').hide();
$('#loadingIndicator').show();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'editprofile',
mode: 'update',
spdomain : spEnvironment.getDomain(),
userId : $.spCookie("SPCUID"),
editProfileEmail: $('#editProfileEmail').val(),
editProfileConfirmEmail: $('#editProfileConfirmEmail').val(),
editProfileNickname: $('#editProfileNickname').val(),
editProfileZip5: $('#editProfileZip5').val()
//editProfileZip4: $('#editProfileZip4').val()
},
dataType: 'jsonp',
success: function(msg) {
// ignore the ok check
if (msg.statusResponse.status === 'pass') {
spUser.setUserEmail(msg.email);
spUser.setNickName(msg.signature);
spUser.setZip5(msg.zip);
//spUser.setZip4(msg.zipExt);
spUser.setSignedIn(true);
//alert(msg.signature);
$('#welcomeBackText').text(msg.signature);
//$('#spSignedin').replaceWith('<li id="spSignedin"><a href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + 'Hello' + ' ' + msg.signature +'</a></li>');
$('#spSignedin').replaceWith('<li class="fbcenter" id="spSignedin"><div style="min-width:80px;max-width:160px"><a class="fbcent" href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + ' ' + msg.signature + '</a><a class="fbcloseimg" id="spSignout" href="javascript:void(0);"><img class="fb-close" src="http://img.superpages.com/images-yp/sp/images/fw/fb-x.png"></a></div></li>');$('#loadingIndicator').hide();
//Reset the cookies
//Set the Cookies
//$.spCookie("SPCUID",msg.userid,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("myDirUserName",msg.signature,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
if (($.trim(msg.zip) !== "") && (msg.zip !== null)) {
$.spCookie("SPC_HR",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",msg.zip,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
} else {
// Check the location cookie
var loc = $.spCookie("SPC_LQ");
if (($.trim(loc) !== "") && (loc !== null)) {
$.spCookie("SPC_HR",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",loc,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
}
}
// Show the
$('#statusResponse_Message').text(msg.statusResponse.message).show();
} else if (msg.statusResponse.status === 'fail') {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
var errorIds = msg.statusResponse.errorIds;
var highlightIds = msg.statusResponse.highlightIds;
if(errorIds) {
$('#registrationMessage_errors').show();
$.each(errorIds,function(index,value){
$(value).show();$(value + ' div').show();
});
}
if(highlightIds) {
$.each(highlightIds,function(index,value){
$(value).addClass('inputInvalid').css("background-color","#ffffc8");
});
$(highlightIds[0]).focus();
}
} else {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
}
}
});
return false;
}
} ,
handleGetProfile : function() {
if ($('#spEditProfile').length > 0) {
ajaxInit();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'editprofile',
mode: 'read',
spdomain : spEnvironment.getDomain(),
userId : $.spCookie("SPCUID")
},
dataType: 'jsonp',
success: function(msg) {
if (msg.statusResponse.message == 'ok' && msg.statusResponse.status === 'pass') {
spUser.setUserEmail(msg.email);
spUser.setNickName(msg.signature);
spUser.setZip5(msg.zip);
//spUser.setZip4(msg.zipExt);
spUser.setSignedIn(true);
} else if (msg.statusResponse.status === 'fail') {
spUser.setSignedIn(false);
} else {
spUser.setSignedIn(false);
}
}
});
return false;
}
},
handleSendPassword : function() {
if ($('#registrationFlyoutWrapper').length > 0) {
ajaxInit();
$('#loadingIndicator').show();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'forgotpassword',
spdomain : spEnvironment.getDomain(),
sendPwEmail: $('#sendPwEmail').val(),
userId : $.spCookie("SPCUID")
},
dataType: 'jsonp',
success: function(msg) {
// Ignore the ok check
if (msg.statusResponse.status === 'pass') {
$('#loadingIndicator').hide();
spFlyouts.hideForgotPasswordText('sp');
spFlyouts.showSignin("sp");
$('#statusResponse_Message').text(msg.statusResponse.message).show();
spUser.setSignedIn(false);
} else if (msg.statusResponse.status === 'fail') {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
var errorIds = msg.statusResponse.errorIds;
var highlightIds = msg.statusResponse.highlightIds;
if(errorIds) {
$('#registrationMessage_errors').show();
$.each(errorIds,function(index,value){
$(value).show();$(value + ' div').show();
});
}
if(highlightIds) {
$.each(highlightIds,function(index,value){
$(value).addClass('inputInvalid').css("background-color","#ffffc8");
});
$(highlightIds[0]).focus();
}
} else {
spUser.setSignedIn(false);
$('#loadingIndicator').hide();
}
}
});
return false;
}
},
handleChangePassword : function() {
if ($('#registrationFlyoutWrapper').length > 0) {
ajaxInit();
$('#loadingIndicator').show();
$.ajax(
{
type: "GET",
url: spEnvironment.getSecureUrl() + "/profiler/mysuperpages",
data: {
op: 'changepassword',
mode: 'update',
spdomain : spEnvironment.getDomain(),
userId : $.spCookie("SPCUID"),
oldPassword: $('#oldPassword').val(),
newPassword: $('#newPassword').val()
},
dataType: 'jsonp',
success: function(msg) {
if (msg.statusResponse.status === 'pass') {
//alert(msg.statusResponse.message);
$('#loadingIndicator').hide();
spFlyouts.showEditProfile("sp");
$('#statusResponse_Message').text(msg.statusResponse.message).show();
} else if (msg.statusResponse.status === 'fail') {
//spUser.setSignedIn(false);
$('#loadingIndicator').hide();
var errorIds = msg.statusResponse.errorIds;
var highlightIds = msg.statusResponse.highlightIds;
if(errorIds) {
$('#registrationMessage_errors').show();
$.each(errorIds,function(index,value){
$(value).show();$(value + ' div').show();
});
}
if(highlightIds) {
$.each(highlightIds,function(index,value){
$(value).addClass('inputInvalid').css("background-color","#ffffc8");
});
$(highlightIds[0]).focus();
}
} else {
//spUser.setSignedIn(false);
$('#loadingIndicator').hide();
}
}
});
return false;
}
} ,
handleSGLinks : function() {
var userId = $.spCookie("SPCUID");
if(location.pathname === "/listings.jsp") {
var var_count = 0;
$("a").filter(".superguarantee").each(function(){
var sghref = $(this).attr('href');
var_count = var_count + 1 ;
sghref = sghref + "&Userid=" + userId;
$(this).attr('href', sghref);
});
//alert(var_count);
}
// For the BP page
if ($('#BPcore').length > 0) {
$("#BPcore .sgLink").each(function(){
var sghref = $(this).attr('href');
sghref = sghref + "&Userid=" + userId;
$(this).attr('href', sghref);
});
}
if ($('#BPsupergContainer').length > 0) {
$("#BPsupergContainer .sgLink").each(function(){
var sghref = $(this).attr('href');
sghref = sghref + "&Userid=" + userId;
$(this).attr('href', sghref);
});
}
},
handleSignout : function(){
spUser.setSignedIn(false);
// Remove Cookies
// Remove the UserId cookie
$.spCookie("SPCUID",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("myDirUserName",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPFB",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("ECLUID",null,{path:'/',domain:spEnvironment.getCookieDomain()});
// Hi-rated business and coupons cookie
$.spCookie("SPC_HR",null,{path:'/',domain:spEnvironment.getCookieDomain()});
$.spCookie("SPC_CP",null,{path:'/',domain:spEnvironment.getCookieDomain()});
//Reset links
setLinks('signout');
// If on Address book , reload /abook.jsp
if(location.pathname === "/profiler/abook.jsp") {
if ($('#myspTopSeparator').length > 0) {
location.replace("http://www.superpages.com");
}
}
}
};
// errors object
/*
* Validation
*/
// Validator Object
var flyoutValidator = {
numOfErrors : 0,
errorList : [],
validate: function(element) {
var isElementValid = true;
var $element = $(element);
var elementId = $element.attr('id');
var elementValue = $element.val();
// <input> uses type attribute as written in tag .<textarea> has intrinsic type of 'textarea'.<select> has intrinsic type of 'select-one' or 'select-multiple'
var elementType = $element[0].type.toLowerCase();
//alert('Checking ' + elementId + ' of Type ' + elementType + ' with ' + elementValue + ':');
switch(elementType){
case 'text':
//alert('Input Check');
switch(elementId){
case 'returnUserEmail':
if(this.isEmpty($element, elementValue)) {
// Only checking for empty and not enforcing valid Email format for old users to login with just their username
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'sendPwEmail' :
if(!this.isEmpty($element, elementValue)) {
if(!this.isValidEmailFormat($element,elementValue)) {
// is Email Format Valid
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnotvalid');isElementValid=false;
}
} else {
// is Email empty
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'newUserEmail' :
if(!this.isEmpty($element, elementValue)) {
if(!this.isValidEmailFormat($element,elementValue)) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnotvalid');isElementValid=false;
} else {
if(!this.areEqual("#newUserEmail","#newUserConfirmEmail")) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnomatch');isElementValid=false;
}
}
} else {
// is Email empty
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'newUserConfirmEmail' :
if(!this.isEmpty($element, elementValue)) {
if(!this.isValidEmailFormat($element,elementValue)) {
if($.inArray("#error_emailnotvalid",this.errorList) === -1) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnotvalid');isElementValid=false;
}
} else {
if(!this.areEqual("#newUserEmail","#newUserConfirmEmail")) {
if($.inArray("#error_emailnomatch",this.errorList) === -1) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnomatch');isElementValid=false;
}
}
}
} else {
// is Email empty
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'editProfileEmail' :
if(!this.isEmpty($element, elementValue)) {
if(!this.isValidEmailFormat($element,elementValue)) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnotvalid');isElementValid=false;
} else {
if(!this.areEqual("#editProfileEmail","#editProfileConfirmEmail")) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnomatch');isElementValid=false;
}
}
} else {
// is Email empty
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'editProfileConfirmEmail' :
if(!this.isEmpty($element, elementValue)) {
if(!this.isValidEmailFormat($element,elementValue)) {
if($.inArray("#error_emailnotvalid",this.errorList) === -1) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnotvalid');isElementValid=false;
}
} else {
if(!this.areEqual("#editProfileEmail","#editProfileConfirmEmail")) {
if($.inArray("#error_emailnomatch",this.errorList) === -1) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_emailnomatch');isElementValid=false;
}
}
}
} else {
// is Email empty
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_enteremail');isElementValid=false;
}
break;
case 'newUserZip5' :
if(this.isEmpty($element, elementValue)) {
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_enterzip');isElementValid=false;
} else {
if(!this.isValidZipFormat($element, elementValue)) {
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_zipnotvalid');isElementValid=false;
}
}
break;
case 'editProfileZip5' :
if(this.isEmpty($element, elementValue)) {
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_enterzip');isElementValid=false;
} else {
if(!this.isValidZipFormat($element, elementValue)) {
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_zipnotvalid');isElementValid=false;
}
}
break ;
}
break;
case 'password':
if(this.isEmpty($element, elementValue)) {
// password cannot be null
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_enterpw');isElementValid=false;
} else {
if ( elementId !== 'returnUserPassword' && elementId !== 'oldPassword') {
if(this.checkPasswordLength($element,elementValue)) {
if(elementId === 'newPassword') {
if(this.areEqual('#oldPassword','#newPassword')){
this.numOfErrors = ++this.numOfErrors; this.errorList.push('#error_passwordchange');isElementValid=false;
}
}
} else {
// does not pass password length count
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_passwordcount6');isElementValid=false;
}
} else {
if ($.trim($(element).val()).length < 2) {
this.numOfErrors = ++this.numOfErrors;this.errorList.push('#error_passwordcount2');isElementValid=false;
}
}
}
break;
// Other kinds of input types for which validation can be added later on
// case 'textarea': break; case 'select-one': break; case 'select-multiple': if( !value ){ isValid = false; } break; case 'checkbox': break; case 'radio':if( $('input[name="' + name +'"]:checked').length == 0 ){ isValid = false; }; break;
} // close switch()
return isElementValid;
},
isValidEmailFormat : function(element,value){
// is email in a RFC specified format
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
},
isValidEmailFormatET : function(element,value){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
},
checkPasswordLength : function(element,value){
return $.trim($(element).val()).length >= 6;
} ,
isValidZipFormat : function(element,value) {
return /^\d+$/.test(value);
},
isEmpty : function(element,value) {
return ($.trim($(element).val()).length === 0);
},
areEqual : function(firstValue,secondValue) {
return ( $.trim($(firstValue).val()) === $.trim($(secondValue).val()) );
}
};
jQuery.spCookie = function(name, value, options) {
if (typeof value != 'undefined') { // name and value given, set cookie
options = options || {};
if (value === null) {
value = '';
options.expires = -1;
}
var expires = '';
if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
var date;
if (typeof options.expires == 'number') {
date = new Date();
date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
} else {
date = options.expires;
}
expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
}
// CAUTION: Needed to parenthesize options.path and options.domain
// in the following expressions, otherwise they evaluate to undefined
// in the packed version for some reason...
var path = options.path ? '; path=' + (options.path) : '';
var domain = options.domain ? '; domain=' + (options.domain) : '';
var secure = options.secure ? '; secure' : '';
document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
} else { // only name given, get cookie
var cookieValue = null;
if (document.cookie && document.cookie !== '') {
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
}
};
/*
* Initialization for the flyouts
*/
function flyoutsInit() {
//alert('Initializing flyouts');
var userid = $.spCookie("SPCUID");
var username = $.spCookie("myDirUserName");
if (($.trim(userid) !== "") && (userid !== null) && ($.trim(username) !== "") && (username !== null)) {
// This is to handle the browser back button the best it can
setLinks('signin');
}
// Click handler for the SignIn anchor
$('#spSigninRegistration').live('click',function() {
openFlyouts('signin','sp');
}) ;
$('#spSignout').live('click',function(){
flyoutOperation.handleSignout();
});
if(location.pathname === "/profiler/abook.jsp") {
// Get User Info so that when the Edit profile clicked from the addressbook it can prepopulate data
var userid = $.spCookie("SPCUID");
if (($.trim(userid) !== "") && (userid !== null)) {
if ($('#myspTopSeparator').length > 0) {
flyoutOperation.handleGetProfile();
}
}
}
// Edit Profile on Address Book clicked
$('#spEditProfile').live('click',function(){
openFlyouts('editprofile','sp');
});
// Change password link on the flyouts clicked
$('#changePasswordLink').live('click',function(){
spFlyouts.showChangePassword('sp');
});
//
$('#error_signinLink').live('click',function(){
spFlyouts.showSignin('sp');
});
$('#error_registerLink').live('click',function(){
spFlyouts.showRegister('sp');
});
$('#error_retrievepasswordLink').live('click',function(){
spFlyouts.showSendPassword('sp');
});
//
// Close the flyouts
$('#closeFlyouts').live('click',function(){
closeFlyouts();
});
// Trigger facebook popup.
$('#registrationFlyoutWrapper .facebook > a').live('click',function(){
closeFlyouts();
facebookPopup();
});
// Tabs - ReturnUser click -signin
$('#REGtabContainerReturnUser #returnuserTabSetRU .REGtabNEW > a').live('click',function(){
spFlyouts.showRegister('sp');
$('#newUserEmail').focus();
});
$('#REGtabContainerReturnUser #newuserTabSetRU .REGtabRETURN > a').live('click',function(){
spFlyouts.showSignin('sp');
$('#returnUserEmail').focus();
});
//Tabs - NewUser click
$('#REGtabContainerNewUser #returnuserTabSetNU .REGtabNEW > a').live('click',function(){
spFlyouts.showRegister('sp');
$('#newUserEmail').focus();
});
$('#REGtabContainerNewUser #newuserTabSetNU .REGtabRETURN > a').live('click',function(){
spFlyouts.showSignin('sp');
$('#returnUserEmail').focus();
});
// Forgot password click
$('#forgotPassword').live('click',function(){
spFlyouts.showSendPassword('sp');
$('#sendPwEmail').focus();
});
// Forgot password click
$('#error_bademailpw .errorSecondLine > a').live('click',function(){
spFlyouts.showSendPassword('sp');
});
$('#error_duplicateemailregistration .errorSecondLine > a').live('click',function(){
spFlyouts.showSignin('sp');
});
// Edit Profile click
$('#newUserEditProfile,#returnUserEditProfile').live('click',function(){
spFlyouts.showEditProfile('sp');
});
// Forms processing
// Cancel button clicked
$('#editprofile_cancel,#changepassword_cancel').live('click',function(){
closeFlyouts('sp');
return false;
});
// New User Registration
$('#register_submit').live('click',function(){
var focusField = "";
spFlyouts.hideErrors();
$('#newUserEmail,#newUserConfirmEmail,#newUserCreatePassword,#newUserZip5').each(function(){
var isElementValid = flyoutValidator.validate(this);
if(!isElementValid) {
$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(flyoutValidator.numOfErrors === 1){
focusField = this;
}
}
});
if(flyoutValidator.numOfErrors < 1) {
flyoutOperation.handleRegister();
return false;
} else {
$('#registrationMessage_errors').show();
$.each(flyoutValidator.errorList,function(index,value){
$(value).show();$(value + ' div').show();
});
$(focusField).focus();
return false;
}
});
// Returning using form submit i.e. signin
$('#signin_submit').live('click',function(event){
spFlyouts.hideStatusResponseMessage("sp");
spFlyouts.hideErrors();
$('#returnUserEmail,#returnUserPassword').each(function(){
var isElementValid = flyoutValidator.validate(this);
if(!isElementValid) {
$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(flyoutValidator.numOfErrors === 1){
focusField = this;
}
}
});
if(flyoutValidator.numOfErrors < 1) {
//alert('Set cookie for' + spEnvironment.getCookieDomain());
flyoutOperation.handleSignIn();
return false;
} else {
$('#registrationMessage_errors').show();
$.each(flyoutValidator.errorList,function(index,value){
$(value).show();$(value + ' div').show();
});
$(focusField).focus();
return false;
}
});
// Forgot / Send password Email
$('#sendpassword_submit').live('click',function(){
spFlyouts.hideErrors();
$('#sendPwEmail').each(function(){
var isElementValid = flyoutValidator.validate(this);
if(!isElementValid) {
$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(flyoutValidator.numOfErrors === 1){
focusField = this;
}
}
});
if(flyoutValidator.numOfErrors < 1) {
flyoutOperation.handleSendPassword();
return false;
} else {
$('#registrationMessage_errors').show();
$.each(flyoutValidator.errorList,function(index,value){
$(value).show();$(value + ' div').show();
});
$(focusField).focus();
return false;
}
});
// Edit Profile
$('#editprofile_submit').live('click',function(){
spFlyouts.hideErrors();
spFlyouts.hideStatusResponseMessage("sp");
$('#editProfileEmail,#editProfileConfirmEmail,#editProfileZip5').each(function(){
var isElementValid = flyoutValidator.validate(this);
if(!isElementValid) {
$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(flyoutValidator.numOfErrors === 1){
focusField = this;
}
}
});
if(flyoutValidator.numOfErrors < 1) {
flyoutOperation.handleEditProfile();
return false;
} else {
$('#registrationMessage_errors').show();
$.each(flyoutValidator.errorList,function(index,value){
$(value).show();$(value + ' div').show();
});
$(focusField).focus();
return false;
}
});
// Change Password
$('#changepassword_submit').live('click',function(){
spFlyouts.hideErrors();
$('#oldPassword,#newPassword').each(function(){
var isElementValid = flyoutValidator.validate(this);
if(!isElementValid) {
$(this).addClass('inputInvalid').css("background-color","#ffffc8");
if(flyoutValidator.numOfErrors === 1){
focusField = this;
}
}
});
if(flyoutValidator.numOfErrors < 1) {
flyoutOperation.handleChangePassword();
return false;
} else {
$('#registrationMessage_errors').show();
$.each(flyoutValidator.errorList,function(index,value){
$(value).show();$(value + ' div').show();
});
$(focusField).focus();
return false;
}
});
}
function doSaveListing(){
var isIE = $.browser.msie; // browser sniffing is bad
var userId = $.spCookie("SPCUID") ;
if (($.trim(userId) !== "") && (userId !== null)) {
return true;
} else {
if(isIE) {
// Needed for onclick to not submit to href. otherwise return false in IE does not work.
event.returnValue = false;
}
openFlyouts('signin','sp');
return false;
}
return false;
}
// Begin - Facebook Signin code
var spFacebook = {
setLinks : function(operation) {
var spfbname = null;
var spfbpic = null;
var userFields=null;
var reasonCode=null;
var userEmail=null;
var userName=null;
var userId=null;
if(operation === 'signin') {
// Parse the SPFB cookie
var spfbCookieValue = $.spCookie("SPFB");
var spfbCookie = spfbCookieValue.split('|');
$.each(spfbCookie,function(index,value){
if ( index === 0) {
spfbname = value.substring(value.indexOf("=")+1,value.length);
} else if ( index === 1 ) {
// The second part is the picture
spfbpic = value.substring(value.indexOf("=")+1,value.length);
}else if(index==2){
userFields=value;
var userArr=new Array();
userArr=userFields.split("~");
reasonCode=userArr[0];
userEmail=userArr[1];
userName=userArr[2];
userId=userArr[3];
userId=userId.substring(0,userId.length-1);
}
});
// Do this only if the spfbame or spfbpic have a value
if (((spfbname !== null) || (spfbpic !== null))&& userFields==null) {
// Change the sign in Link
// Old link kept for reference
//$('#spSignin').replaceWith('<li id="spSignedin" class="sign-in ot ot_gt_signin"><a href="http://yellowpages.superpages.com/profiler/abook.jsp"><img style="vertical-align:middle;border=0;height=20;width=20;" class="img_middle" src="' + spfbpic + '" />&nbsp;' + 'Hello&nbsp;' + spfbname +'</a></li>');
$('#spSignin').replaceWith('<li class="fbcenter" id="spSignedin"><div style="max-width:150px"><a href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp"><img width="20" height="20" border="0" align="left" style="margin-right:3px;" src="' + spfbpic + '" /></a>'+ '<a class="fbcent" href="'+ spEnvironment.getBaseUrl() + '/profiler/abook.jsp">' + ' ' + spfbname +'</a><a class="fbcloseimg" id="spSignout" href="javascript:void(0);"><img class="fb-close" src="http://img.superpages.com/images-yp/sp/images/fw/fb-x.png"></a> </div></li>');
// Change the facebookLink to signout
//$('#spFbSignin').replaceWith('');
}
else if(reasonCode=='ZIP'||reasonCode=='NEW'||reasonCode=='PROXY'){
showFBuserform(reasonCode,userId,userName,userEmail);
}else {
location.reload();
}
}
return false;
},
showProfile : function() {
this.setLinks("signin");
} ,
isValidEmailFormat : function(value){
// is email in a RFC specified format
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
},
isValidZipFormat : function(value) {
return /^\d+$/.test(value);
},
isEmpty : function(value) {
return ($.trim(value).length === 0);
},
validateUserForm : function () {
// Hide error divs
$('#FBregistrationMessage_error').hide();
$('#FBregistrationMessage_error div').hide();
var valid_form = 0;
var zip_valid = false;
var email_valid = false;
var emailValue = $('#FBEmail').val();
var zipValue = $('#FBZip').val();
if ( zipValue === 'Required') {
zipValue = null;
}
if ( !spFacebook.isEmpty(zipValue) && spFacebook.isValidZipFormat(zipValue)) {
zip_valid = true;
valid_form = true;
} else {
zip_valid = false;
valid_form = false ;
$('#FBregistrationMessage_error').show();
$('#FBerror_zipnotvalid').show();
}
// Perform the email check only if the email section is visible
if ($('#EmailSection').is(':visible') == true) {
if ( !spFacebook.isEmpty(emailValue) && spFacebook.isValidEmailFormat(emailValue)) {
var email_valid = true;
if (zip_valid == true) {
valid_form = true;
} else {
valid_form = false;
}
} else {
email_valid = false;
valid_form = 0;
$('#FBregistrationMessage_error').show();
$('#FBerror_emailnotvalid').show();
}
}
return valid_form;
} ,
showFBuserform : function (reasoncode,Id,name,email) {
$('#Reasoncode').val(reasoncode);
if (reasoncode === 'ZIP' || reasoncode === 'NEW'){
$('#EmailSection').hide();
$('#FBEmail').val(email);
}
$('#FBId').val(Id);
$('#FBname').text(name);
$('#FBregistrationFlyoutWrapper').show();
return false;
},
finishFBReg : function() {
submitUrl = spEnvironment.getBaseUrl() + "/FinishFBReg" ;
$.ajax(
{
type : "GET",
url : submitUrl,
//dataType: 'json',
data : {
Reasoncode: $('#Reasoncode').val(),
FBId: $('#FBId').val(),
FBEmail : $('#FBEmail').val(),
FBZip : $('#FBZip').val()
},
success : function(msg) {
// Parsing XML instead of json
var responsetext = $(msg).find("message").text;
if (responsetext === 'SUCCESS' ) {
$.spCookie("SPCUID",msg.userid,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
spFacebook.setLinks("signin");
$('#FBregistrationFlyoutWrapper').hide();
return false;
} else {
$('#FBregistrationFlyoutWrapper').hide();
return false;
}
/* same thing but parsing json instead of xml. The servlet would need to send json response back.
if (msg.statusResponse.message === 'SUCCESS' ) {
$.spCookie("SPCUID",msg.userid,{expires:30,path:'/',domain:spEnvironment.getCookieDomain()});
spFacebook.setLinks("signin");
$('#FBregistrationFlyoutWrapper').hide();
return false;
} else {
$('#FBregistrationFlyoutWrapper').hide();
return false;
}
*/
}
});
return false ;
spFacebook.setLinks("signin");
$('#FBregistrationFlyoutWrapper').hide();
return false;
},
facebookPopup : function() {
getfbFlyouts('signin','fb');
var redirect_url = spEnvironment.getBaseUrl() + "/Facebook";
var fbOpenUrl = 'https://graph.facebook.com/oauth/authorize?' + 'client_id='+client_id+'&redirect_uri='+ redirect_url + '&type=web_server&display=popup&scope=email,user_birthday';
/*
encodeURIComponent(redirect_url) + '&type=web_server&display=popup&scope=email,user_birthday';*/
//window.open(fbOpenUrl,'facebook','width=800,height=600,left=100,top=50');
var width = 640;
var height = 300;
var left = parseInt((screen.availWidth/2) - (width/2));
var top = parseInt((screen.availHeight/2) - (height/2));
var windowFeatures = "width=" + width + ",height=" + height + ",status,resizable,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
window.open(fbOpenUrl,'facebook',windowFeatures);
spFBcookieChange = window.setInterval("checkFBcookiechange()",1000);
setTimeout("stopInterval()",180000);
}
};
// End - Facebook Signin code
//Facebook Signin Functionality functions
/*
*/
function stopInterval(){
if(spFBcookieChange!=""){
window.clearInterval(spFBcookieChange);
spFBcookieChange="";
}
}
function checkFBcookiechange(){
if (document.cookie.indexOf('SPFB') != -1){
showProfile();
stopInterval();
}
}
function showProfile() {
/* Wrapper function to call spFacebook.showProfile()*/
spFacebook.showProfile();
}
function showFBuserform(reasoncode, Id, name, email) {
/* Wrapper function needed */
spFacebook.showFBuserform(reasoncode, Id, name, email);
return true;
}
/*
var oXmlHttp;
function finishFBReg(Url) {
var responsetext;
var FBEmail = '';
var Reasoncode = document.fbreturnuser.Reasoncode.value;
var FBZip = document.fbreturnuser.FBZip.value;
if (document.fbreturnuser.FBEmail != null) {
FBEmail = document.fbreturnuser.FBEmail.value;
}
var FBId = document.fbreturnuser.FBId.value
var url = Url + "?Reasoncode=" + Reasoncode + "&FBId=" + FBId + "&FBEmail="
+ FBEmail + "&FBZip=" + FBZip;
if (typeof ActiveXObject != "undefined") {
oXmlHttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
} else if (typeof XMLHttpRequest != "undefined") {
oXmlHttp = new XMLHttpRequest();
}
oXmlHttp.open("GET", url, false);
oXmlHttp.send(null);
if (oXmlHttp.readyState == 4) {
if (oXmlHttp.status == 200) {
var message = oXmlHttp.responseXML.getElementsByTagName("message")[0];
responsetext = message.childNodes[0].nodeValue;
}
}
if (document.getElementById("FBregistrationFlyoutWrapper") != null) {
document.getElementById("FBregistrationFlyoutWrapper").style.display = "none";
}
if (responsetext == "SUCCESS") {
spFacebook.showProfile();
//showProfile();
}
}
// End of Facebook signin functionality function
// End of facebook signin as on shopping
*/
function fbSignInInit() {
if (document.cookie.indexOf('SPFB') != -1){
showProfile();
}
$('#fbSignin').live('click',function() {
closeFlyouts();
spFacebook.facebookPopup();
});
$('#finishfbReg_submit').die();
$('#finishfbReg_submit').live('click',function(event){
// validate the return user form but prevent from submitting it.
event.preventDefault();
if (spFacebook.validateUserForm()) {
//return true;
//alert('Submitting form after validtion');
spFacebook.finishFBReg();
return true;
} else {
return false;
}
//return false;
});
$('#fbreturnuser').live('submit',function(event){
event.preventDefault();
//spFacebook.finishFBReg();
});
// cancel button Event Handlers
$('#finishfbReg_cancel').live('click',function(event){
// close the return user form but prevent from submitting it.
event.preventDefault();
$('#FBregistrationFlyoutWrapper').hide();
return false;
});
// Close imae event hander
$('#FBregistrationFlyoutClose').live('click',function(){
// close the return user form
$('#FBregistrationFlyoutWrapper').hide();
//return false;
});
}
// Begin -- Functions for Exact Target Email Widget
function etEmailWidgetInit() {
$('#_etemailsubmit').live('click',function(){
$('#_eterrormsg').text('');
var strEmailValue = $('#_emailValue').val();
if (flyoutValidator.isEmpty('#_emailValue', strEmailValue)) {
$('#_eterrormsg').show();
$('#_eterrormsg').text('');
$('#_eterrormsg').append('Email cannot be empty');
return false;
} else {
if(flyoutValidator.isValidEmailFormatET('#_emailValue', strEmailValue)) {
return true;
} else {
$('#_eterrormsg').show();
$('#_eterrormsg').text('');
$('#_eterrormsg').append('Invalid email');
//$('#_eterrormsg').fadeIn().delay(10000).fadeOut('slow');
return false;
}
}
// Fail safe
return false;
});
// For default text on et email widget
$(".email-box").focus(function(srcc) {
if ($(this).val() == $(this)[0].title){
$(this).removeClass("email-box");
$(this).val("");
}
});
$(".email-box").blur(function(){
if ($(this).val() == ""){
$(this).addClass("email-box");
$(this).val($(this)[0].title);
}
});
}
//End -- Functions for Exact Target Email Widget
// Document .ready function is at the end to validate the script from JSLint http://www.jslint.com/
$(document).ready(function() {
// spFlyouts
flyoutsInit();
// Facebook signin
fbSignInInit();
//For Exact Target Email widget validations
etEmailWidgetInit();
}) ;// End of document ready
