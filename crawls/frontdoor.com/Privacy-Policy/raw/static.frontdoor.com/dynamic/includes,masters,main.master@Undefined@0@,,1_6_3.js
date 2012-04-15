function $AJAX() { }
function $AJ() { }
$AJAX.PostToObject=function(TargetObject, strURL, strParams) {var ResponseDelegate=function(AjaxResponse) {TargetObject.innerHTML=AjaxResponse;};var A=new AJAXObject(ResponseDelegate);A.GetPage(strURL, strParams);};$AJAX.GetToObject=function(TargetObject, strURL) {var ResponseDelegate=function(AjaxResponse) {TargetObject.innerHTML=AjaxResponse;};var A=new AJAXObject(ResponseDelegate);A.GetPage(strURL);};$AJ.GD=function(ResponseDelegate, strURL) {$AJAX.GetForDelegate(ResponseDelegate, strURL);};$AJAX.GetForDelegate=function(ResponseDelegate, strURL) {var A=new AJAXObject(ResponseDelegate);A.GetPage(strURL);};$AJAX.PostForDelegate=function(ResponseDelegate, strURL, strParams) {var A=new AJAXObject(ResponseDelegate);A.GetPage(strURL, strParams);};$AJAX.GetAlertResponse=function(strURL) {var A=new AJAXObject(function(AjaxResponse) {window.alert("AjaxResponse: "+AjaxResponse);});A.GetPage(strURL);};$AJAX.PostAlertResponse=function(strURL, strParams) {var A=new AJAXObject(function(AjaxResponse) {window.alert("AjaxResponse: "+AjaxResponse);});A.GetPage(strURL, strParams);};$AJAX.GetAsync=function(strURL) {var A=new AJAXAsyncObject();A.GetPage(strURL);};function AJAXObject(ResponseDelegate) {this.ResponseDelegate=ResponseDelegate;AJAXObject.prototype.resetHandler=function(NewResponseDelegate) {this.ResponseDelegate=NewResponseDelegate;};AJAXObject.prototype.GetPage=function(URL, PostData) {var My=this;var http_request=this.createXMLHttpRequest();if(!http_request) {alert('Cannot create an XML HTTP instance');return false;}
http_request.onreadystatechange=function() {if(http_request.readyState==4) {if(http_request.status==200) {if(http_request.getResponseHeader("Content-Type")){if(http_request.getResponseHeader("Content-Type").toLowerCase().indexOf("text/xml")>-1) {My.ResponseDelegate(http_request.responseXML);}else{My.ResponseDelegate(http_request.responseText);}}}else{if(parseInt(http_request.status, 10)!=0) {window.alert("The server returned response: "+http_request.status);return;}}}};if(PostData==undefined) {http_request.open('GET', URL, true);http_request.send(null);}else{http_request.open('POST', URL, true);http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http_request.setRequestHeader("Content-length", PostData.length);http_request.setRequestHeader("Connection", "close");http_request.send(PostData);}};AJAXObject.prototype.createXMLHttpRequest=function() {var types=['Microsoft.XMLHTTP','MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'];for (var i=0; i<types.length; i++) {try {return new ActiveXObject(types[i]);}
catch (e) {  }}
try {return new XMLHttpRequest();}
catch (e) {  }
return false;};}
function AJAXAsyncObject() {AJAXAsyncObject.prototype.GetPage=function(URL, PostData) {var My=this;var http_request=this.createXMLHttpRequest();if(!http_request) {alert('Cannot create an XML HTTP instance');return false;}
http_request.onreadystatechange=function() {return;};if(PostData==undefined) {http_request.open('GET', URL, true);http_request.send(null);return;}else{http_request.open('POST', URL, true);http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");http_request.setRequestHeader("Content-length", PostData.length);http_request.setRequestHeader("Connection", "close");http_request.send(PostData);return;}};AJAXAsyncObject.prototype.createXMLHttpRequest=function() {var types=['Microsoft.XMLHTTP','MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'];for (var i=0; i<types.length; i++) {try {return new ActiveXObject(types[i]);}
catch (e) {  }}
try {return new XMLHttpRequest();}
catch (e) {  }
return false;};};var Facebook=new Fbook("Facebook");function Fbook(ObjectInstanceName){var status_msg="";var full_name="";var gl_status="";var first_name="";var fbook_avatar=""
var fbStatus;var email_hash;var facebook_uid;}
var TimeOutModal;Facebook.Login=function() {with (this) {FB.login(function(response) {if(response.authResponse) {if(IsAlreadySignedIn()){window.setTimeout(function(){Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"));},2000)}
else{Facebook.Modal_Close();Facebook.fadeOutBackground();window.setTimeout(function(){LogInConnectedUser();},2000);}
function LogInConnectedUser(){Facebook.Show_PermissionDialog_Social_Commenting("publish_stream,email")
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {Facebook.CompleteTempCAction(rtrim(output));ShowLoggedIn(true);$.event.trigger('SignInEvt');}});});}
function rtrim(stringToTrim) {return stringToTrim.substring(0,stringToTrim.length-2);}}}, {scope:'publish_stream,email', enable_profile_selector: 1});};}
Facebook.Register_Login=function() {FB.login(function() { }, {scope:'publish_stream,email', enable_profile_selector: 1});}
Facebook.Login_Share=function(IdListing, shareType, sharedURL, title, metadescription) {var shortURL=GetShortURL(sharedURL);var thumbnail="http://"+staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";with (this) {Facebook.Modal_Close();FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}
else{FB.login(function(response) {if(response.authResponse) {if(IsAlreadySignedIn()){window.setTimeout(function(){Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);},2000)}
else{Facebook.Modal_Close();window.setTimeout(function(){LogInConnectedUser();},2000);}
function LogInConnectedUser(){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(rtrim(output)=="success"){ShowLoggedIn(true);document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}});});}
function rtrim(stringToTrim) {return stringToTrim.substring(0,stringToTrim.length-2);}
var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}})}});Facebook.fadeOutBackground();};}
Facebook.OnLogin=function(){with (this) {if(document.getElementById('HomeFacebookBanner')!=null ){DisplayNotificationBanner()}
if(document.getElementById('ctl00_FacebookStatusDialog1_status_message')!=null){fbStatus=document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML;}
window.setTimeout(function(){Facebook.User_GetInfo();}, 300);}}
Facebook.Logout=function(){with (this){Facebook.Modal_Close();var TmpFBId=Facebook.GetUserId();FB.logout(function() { LogoutMyFrontdoor(); PopupMessage(); ToggleComponents(); });function ToggleComponents(){window.setTimeout(function(){window.location.replace("/Default.aspx");},1000);}
function PopupMessage(){Facebook.Confirmation_Modal("You are logging out of both FrontDoor and Facebook.", "Facebook");TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);}
function LogoutMyFrontdoor(){$(function(){$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+TmpFBId ,data: "",success: function(output){if(output=="success"){$(function(){$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogOutConnectedUser.aspx",data: "",success: function(output){ChangeUserAction();$.event.trigger('SignOutEvt');}});});}}});});}
function ToggleFacebookComponentStates(){document.getElementById("FD_in").style.display="none";document.getElementById("FB_in").style.display="none";document.getElementById("FD_FB_out").style.display="block";if(document.getElementById("status-wrap")!=null){document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block";}
if(document.getElementById("HomeFacebookBanner")!=null ){DisplayNotificationBanner()}
if(document.getElementById("LinkAcctNote")!=null){document.getElementById("LinkAcctNote").style.display="none";}
if(document.getElementById("FB-Reg-LoggedIn")!=null){document.getElementById("FB-Reg-Not-LoggedIn").style.display="block";document.getElementById("FB-Reg-LoggedIn").style.display="none";document.getElementById("Reg_Status").innerHTML="Add Your Facebook Account"
document.getElementById("first_name").value=""
document.getElementById("last_name").value=""
document.getElementById("Reg_Optional").style.display="block";document.getElementById("Reg_Name").innerHTML="";document.getElementById("Reg_Avatar").innerHTML="";document.getElementById("Reg_Success").style.display="none";if(gE("fb_notification")){gE("fb_notification").style.display="none";gE("FB-Tab-LoggedIn").style.display="none";gE("FB-Tab-Not-LoggedIn").style.display="block";}}
RelocateToHP();}
function RelocateToHP(){if(window.location.href.indexOf('pro/account')!=-1||window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1){window.location.replace("/Default.aspx")}}}}
Facebook.Toggle_Component_States=function(){with (this) {window.setTimeout(function(){if(document.getElementById("status-wrap")!=null){document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block";}
if(document.getElementById("HomeFacebookBanner")!=null ){DisplayNotificationBanner()}
if(document.getElementById("LinkAcctNote")!=null){document.getElementById("LinkAcctNote").style.display="none";}
if(document.getElementById("log_in_wrapper")){document.getElementById("log_in_wrapper").style.display="block"
Facebook.loginHeaderWidth();}
if(window.location.href.indexOf('/my-folders')!=-1||window.location.href.indexOf('/settings')!=-1||window.location.href.indexOf('/facebook')!=-1||window.location.href.indexOf('/recent-activity')!=-1||window.location.href.indexOf('/register')!=-1||window.location.href.indexOf("/MyFolders.aspx")!=-1){if(IsAlreadySignedIn()){if(gE("settings")){gE("settings").innerHTML="<a href=\"/account/settings/\">Settings</a>";if(window.location.href.indexOf('settings')!=-1){gE("settings").innerHTML="Settings";}}}
else{if(gE("settings")){gE("settings").innerHTML="<a href=\"/account/register-facebook/\">Settings</a>";}
if(window.location.href.indexOf('settings')!=-1){window.location="/account/register-facebook/"}}}
if(document.getElementById("NavTabs")){$(function(){var $share=$('.share');$share.each(function(){$(this).removeClass();$(this).addClass('share');});});}},300);}}
Facebook.User_GetInfo=function() {var isSessionRunning=false;FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {isSessionRunning=true;var query=FB.Data.query('select first_name, last_name, pic_square, profile_url, email_hashes from user where uid={0}',FB.getAuthResponse().userID);query.wait(function(response) {if(response.length>0){ShowHeader(response);ShowStatusDialog(response);ShowFacebookForRegistrationPage(response);SetFacebookGlobalVariables(response);ShowLoggedInLoggedOutStates();ShowMessagesForMyFrontDoor(response);ShowConnectMessages(response);ShareButtons();ShowFacebookForFBTabPage(response);LogIntoMyFrontDoor();HideLoadingDiv();}});}
IsSessionActive(isSessionRunning);});function ShareButtons(){if(document.getElementById("NavTabs")){$(function(){var $fbshare=$('.fbshare_sm');var $share=$('.share');$fbshare.each(function(index){$(".fbshare_sm").show();});$share.each(function(){$(this).removeClass();$(this).addClass('share_sm');});$(".right.shareall").hide();$(".fbshareall").show();$("#FB-Reg-LoggedIn").show();});}}
function HideLoadingDiv(){var divLoading=gE("loading");if(divLoading!=null)
divLoading.style.display="none";}
function ShowHeader(result){if(document.getElementById("user-photo")!=null){var fb_user_image=result[0].pic_square ;if(fb_user_image==''||fb_user_image==null){fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img height="35" width="35" border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("user-photo").innerHTML=html;document.getElementById("FB_in").style.display="block";if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {gE("my_fb").href="/pro/account/dashboard";}else{gE("my_fb").href="/account/recent-activity/";}
document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";document.getElementById("log_in_wrapper").style.display="block";html='<a href="'+result[0].profile_url+'" target="_blank">'
html+=result[0].first_name;html+='</a>';document.getElementById("FacebookName").innerHTML=html;Facebook.loginHeaderWidth();}}
function ShowConnectMessages(result){window.setTimeout(function(){if(document.getElementById("FacebookNameConnect")!=null){var fb_user_image2=result[0].pic_square ;if(fb_user_image2==''){fb_user_image2='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img  border="0" src="'+fb_user_image2+'">';html+='</a>';document.getElementById("user-photo2").innerHTML=html;document.getElementById("FacebookNameConnect").innerHTML="<strong>"+result[0].first_name+"</strong>"}},3000);}
function ShowStatusDialog(result){if(document.getElementById("status-photo")!=null){var fb_user_image=result[0].pic_square ;if(fb_user_image==''){fb_user_image='/images/facebook/50x50_noavatar.gif';}
document.getElementById("status-wrap").style.display="block";document.getElementById("status-wrap-connect").style.display="none";html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("status-photo").innerHTML=html;full_name=result[0].first_name;status_msg=document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML;if(status_msg.substring(0,status_msg.indexOf(" "))=="is"){document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML=full_name+" "+status_msg}
else{document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML=status_msg}}}
function ShowFacebookForRegistrationPage(result){if(document.getElementById("FB-Reg-LoggedIn")!=null){var fb_user_image=result[0].pic_square ;if(fb_user_image==''){fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<span class="fb_icon"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';if(document.getElementById("FB-Reg-Not-LoggedIn")!=null){document.getElementById("FB-Reg-Not-LoggedIn").style.display="none";}
document.getElementById("FB-Reg-LoggedIn").style.display="block";if(document.getElementById("Reg_Status")!=null){document.getElementById("Reg_Status").innerHTML="Your Facebook Account"}
if(document.getElementById("Reg_Success")){document.getElementById("Reg_Success").style.display="none"}
document.getElementById("Reg_Avatar").innerHTML=html;if(document.getElementById("Reg_Optional")){document.getElementById("Reg_Optional").style.display="none";}
html='<a href="'+result[0].profile_url+'" target="_blank">'
html+=result[0].first_name+" "+result[0].last_name
html+='</a>';document.getElementById("Reg_Name").innerHTML=html;$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(output=="success"){if(!IsAlreadySignedIn()){}}
else{if(!IsAlreadySignedIn()){if(gE("first_name")) {document.getElementById("first_name").value=result[0].first_name;}
if(gE("last_name")) {document.getElementById("last_name").value=result[0].last_name}
if(gE("agent_fname")) {document.getElementById("agent_fname").value=result[0].first_name;}
if(gE("agent_lname")) {document.getElementById("agent_lname").value=result[0].last_name;}}}}});});}
if(window.location.href.indexOf('/my-folders')!=-1||window.location.href.indexOf('/settings')!=-1||window.location.href.indexOf('/facebook')!=-1||window.location.href.indexOf('/recent-activity')!=-1||window.location.href.indexOf("/MyFolders.aspx")!=-1){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(output!="success"){if(!IsAlreadySignedIn()){if(gE("settings")){gE("settings").innerHTML="<a href=\"/account/register-facebook/\">Settings</a>";}
if(window.location.href.indexOf('settings')!=-1){window.location="/account/register-facebook/"}}}}});});}}
function ShowFacebookForFBTabPage(result){if(document.getElementById("FB-Tab-LoggedIn")!=null){var fb_user_image=result[0].pic_square ;if(fb_user_image==''){fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("FB-Tab-Not-LoggedIn").style.display="none";document.getElementById("FB-Tab-LoggedIn").style.display="block";document.getElementById("Tab_Avatar").innerHTML=html;html='<strong>'
html+=result[0].first_name+" "+result[0].last_name
html+='</strong>';document.getElementById("Tab_Name").innerHTML=html;$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(output=="success"){gE("UnlinkAccounts").style.display="block";gE("fb_notification").style.display="none";gE("FB-Tab-LoggedIn").style.display="block";gE("FB-Tab-Not-LoggedIn").style.display="none";}
else{gE("fb_notification").style.display="block";gE("FB-Tab-LoggedIn").style.display="none";gE("FB-Tab-Not-LoggedIn").style.display="none";if(IsAlreadySignedIn()){gE("fb_notification").style.display="none";gE("FB-Tab-Not-LoggedIn").style.display="block";gE("FB-Tab-LoggedIn").style.display="none";}}}});});}}
function SetFacebookGlobalVariables(result){email_hash=result[0].email_hashes[0];facebook_uid=result[0].uid;first_name=result[0].first_name}
function ShowLoggedInLoggedOutStates(){FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {document.getElementById("FB_in").style.display="block";if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {gE("my_fb").href="/pro/account/dashboard";}else{gE("my_fb").href="/account/recent-activity/";}}
else{if(document.getElementById("LinkAcctNote")!=null){document.getElementById("LinkAcctNote").style.display="block";}}});}
function ShowMessagesForMyFrontDoor(result){if(document.getElementById("actor")!=null){document.getElementById("actor").innerHTML=result[0].first_name}}
function IsSessionActive(isSessionRunning){if(isSessionRunning==""){isSessionRunning=false}
if(isSessionRunning==false){if(document.getElementById("status-wrap")!=null){document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block"}
if(document.getElementById("mfd_fb_new_account")!=null){document.getElementById("mfd_fb_connected").style.display="none";document.getElementById("mfd_fb_new_account").style.display="block";}}
return isSessionRunning}
function LogIntoMyFrontDoor(){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(output=="success"){if(IsAlreadySignedIn()==false){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {ShowLoggedIn(true);Facebook.CompleteTempCAction(rtrim(output));}});});}}}})})
function rtrim(stringToTrim) {return stringToTrim.substring(0,stringToTrim.length-2);}}}
Facebook.Connect=function(email, pwd, showsuccess) {with (this) {if(email==""||email=="Enter your valid e-mail address"){$("#email_input").addClass("input-error");document.getElementById("emailErrLogin").style.display="block";return false}
if(validateEmailConnect(email)==false){$("#email_input").addClass("input-error");document.getElementById("emailErrLogin").innerHTML="Please check the format of your e-mail address and re-enter(i.e. joe@frontdoor.com).";document.getElementById("emailErrLogin").style.display="block";}
if(pwd==""||pwd=="Enter your valid e-mail address"){$("#password_input").addClass("input-error");document.getElementById("pwdErrLogin").style.display="block";return false}
if(gE("loadingconnect")){gE("loadingconnect").style.display="block";}
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/Connect_registerUsers.aspx?email="+email+"&password="+pwd+"&facebook_uid="+Facebook.GetUserId(),data: "",success: function(output) {if(rtrim(output)=="success"||rtrim(output).indexOf("lastaction_")>-1){var isSessionRunning=false;FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {isSessionRunning=true;FB.api({method: 'fql.query',query: 'SELECT first_name, last_name, pic_square, profile_url, email_hashes FROM user WHERE uid='+FB.getAuthResponse().userID},function(result) {if(result.length>0) {Facebook.Modal_Close()
if(showsuccess==undefined){Facebook.Confirmation_Modal("<strong>You've successfully linked your accounts.</strong><br/><br/>Remember, you can now use your Facebook account to log in to FrontDoor.");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},3000);}
window.setTimeout(function(){Facebook.CompleteTempCAction(rtrim(output));},3000);if(gE("FB-Tab-LoggedIn")){gE("FB-Tab-LoggedIn").style.display="block";}
if(gE("FB-Tab-Not-LoggedIn")){gE("FB-Tab-Not-LoggedIn").style.display="none";}
if(gE("fb_notification")){gE("fb_notification").style.display="none";}
if(gE("UnlinkAccounts")){gE("UnlinkAccounts").style.display="block";}}});}});}
else{if(showsuccess==undefined){Facebook.Confirmation_Modal("You've successfully linked your accounts. You can use your Facebook account to log in to FrontDoor in the future.");if(gE("FB-Tab-LoggedIn")){gE("FB-Tab-LoggedIn").style.display="block";}
if(gE("FB-Tab-Not-LoggedIn")){gE("FB-Tab-Not-LoggedIn").style.display="none";}
if(gE("fb_notification")){gE("fb_notification").style.display="none";}
if(gE("UnlinkAccounts")){gE("UnlinkAccounts").style.display="block";}
TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);}
if(document.getElementById("Oops_Error")){window.clearTimeout(TimeOutModal)
$("#email_input").addClass("input-error");$("#password_input").addClass("input-error");document.getElementById("Oops_Error").style.display="block";document.getElementById("emailErrLogin").style.display="none";document.getElementById("pwdErrLogin").style.display="none";gE("loadingconnect").style.display="none";}}}});if(gE("loadingconnect")) {gE("loadingconnect").style.display="none";}});function rtrim(stringToTrim) {return stringToTrim.substring(0,stringToTrim.length-2);}};function validateEmailConnect(emailTxt){var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;str=emailTxt;str=str.replace(/ /gi,"");validateFlag=true
for(var i=0; i<str.split(",").length; i++){if(!str.split(",")[i].match(emailRegEx)){validateFlag=false;}}
return validateFlag}}
Facebook.Disconnect=function(email) {Facebook.Modal_Close()
with (this) {$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/Connect_unRegisterUsers.aspx?email="+email,data: "",success: function(output) {if(output=="successful"){gE("FB_in").style.display="none";gE("FD_FB_out").style.display="none";gE("FD_in").style.display="block";if(gE("FB-Reg-LoggedIn")){gE("FB-Reg-Not-LoggedIn").style.display="block";gE("FB-Reg-LoggedIn").style.display="none";gE("Reg_Status").innerHTML="Add Your Facebook Account"
gE("Reg_Optional").style.display="block";gE("Reg_Name").innerHTML="";gE("Reg_Avatar").innerHTML="";gE("Reg_Success").style.display="none";}
else if(gE("FB-Tab-LoggedIn")) {gE("FB-Tab-Not-LoggedIn").style.display="block";gE("FB-Tab-LoggedIn").style.display="none";gE("fb_notification").style.display="none";gE("UnlinkAccounts").style.display="none";}
else{gE("UnlinkAccounts").style.display="none";}
Facebook.Confirmation_Modal("You have unlinked your FrontDoor and Facebook accounts.");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);}
else{window.setTimeout(function(){Facebook.Confirmation_Modal("Your accounts could not be unlinked.");}, 3000)}}});});};}
Facebook.Confirmation_Modal=function(Message, Title) {if(Title==undefined){Title="";}
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/successmodal.aspx?Message="+Message+"&Title="+Title,data: "",success: function(output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.BMConfirmation_Modal=function(Message, Title, BMSuppress) {if(Title==undefined){Title="";}
if(BMSuppress==undefined){BMSuppress=""}
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/bmsuccessmodal.aspx?Message="+Message+"&Title="+Title+"&BMSuppress="+BMSuppress,data: "",success: function(output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.Confirmation_Error_Modal=function(Message, Title) {if(Title==undefined){Title="";}
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/successmodal.aspx?Message="+Message+"&Title="+Title,data: "",success: function(output) {Facebook.fadeInBackground();$(output).modal();$("#modal").addClass("modal-error");}});});}
Facebook.AgentTools_Modal=function(MessageType, MessageTitle, MessageBody, IdPhoto, Selected, IdClaim) {if(IdPhoto==undefined) { IdPhoto=""; }
if(Selected==undefined) { Selected=""; }
if(IdClaim==undefined) { IdClaim=""; }
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/AgentTools-Modal.aspx?MessageType="+MessageType+"&MessageTitle="+MessageTitle+"&MessageBody="+MessageBody+"&IdPhoto="+IdPhoto+"&Selected="+Selected+"&IdClaim="+IdClaim,data: "",success: function(output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.Stream_Publish=function(user_message, attachment, action_links, target_id, user_message_prompt, callback, auto_publish){with (this) {FB.ui({method: 'stream.publish',message: user_message,attachment: attachment,action_links: action_links,user_message_prompt: user_message_prompt}, callback);}}
Facebook.Show_PermissionDialog_Social_Commenting=function(permission){FirstTimeLoggedIn();$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(output!="success"){Facebook.ConnectAccount_Modal()}}});});function FirstTimeLoggedIn(){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsFirstTimeLoggedIn.aspx?Facebook_Uid="+Facebook.GetUserId(),data: "",success: function(output) {if(output=="unsuccessful"){var attachment={'description':first_name+' has just discovered HGTV\'s FrontDoor.com. With 4 million+homes for sale and thousands of real estate "how-to" articles and video, FrontDoor combines the HGTV experience with the world of real estate. See what\'s for sale near you.'};Facebook.Stream_Publish('', attachment, null, '', '', null, true)}}});});}}
Facebook.Settings_MissingInfo_Greeting=function(firstName, sourceLogo, bMissingPassword, bMissingProfileAddress){$.ajax({url: '/controls/ajaxcalls/facebook/Settings_MissingInfo_Greeting.aspx?firstName='+firstName+'&sourceLogo='+sourceLogo+'&bMissingPassword='+bMissingPassword+'&bMissingProfileAddress='+bMissingProfileAddress,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.Account_NoPassword=function(email, firstName, activationId, sourceName, sourceLogo){$.ajax({url: '/controls/ajaxcalls/facebook/AccountLoginModal-NoPassword.aspx?email='+email+'&firstName='+firstName+'&activationId='+activationId+'&sourceName='+sourceName+'&sourceLogo='+sourceLogo,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.Account_Login=function(task, data1, data2){$.ajax({url: '/controls/ajaxcalls/facebook/AccountLoginModal.aspx?Task='+task+'&Data1='+data1+'&Data2='+data2,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}
Facebook.Homestyle_Login=function(task, idlisting, idaccount, agentcodestyle, idstyle, stylename) {$.ajax({url: "/controls/ajaxcalls/facebook/HomestyleLoginModal.aspx?task="+task+"&idlisting="+idlisting+"&idaccount="+idaccount+"&agentcodestyle="+agentcodestyle+"&idstyle="+idstyle+"&stylename="+stylename,success: function(html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}
Facebook.Bookmark_Login=function(bookMarkType, Query){if(bookMarkType==undefined){bookMarkType="";}
if(Query==undefined){Query="";}
$.ajax({url:'/controls/ajaxcalls/facebook/Bookmark_Login.aspx?bookMarkType='+bookMarkType+'&'+Query,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}
Facebook.ConnectAccount_Modal=function(){$.ajax({url:'/controls/ajaxcalls/facebook/ConnectAccount_Modal.aspx?Facebook_UserId='+Facebook.GetUserId(),success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields("#connectForm");FocusToFirstInputInModal();}});}
Facebook.Bookmark_Modal=function(bookMarkType, Query){if(bookMarkType==undefined){bookMarkType="";}
if(Query==undefined){Query="";}
var html=""
var fb_user_image=""
FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {var query=FB.Data.query('select first_name, last_name, "status", pic_square, profile_url, email_hashes from user where uid={0}',FB.getAuthResponse().userID);query.wait(function(result) {if(result.length>0){fb_user_image=result[0].pic_square ;if(fb_user_image==''){fb_user_image='/images/facebook/35x35_noavatar.gif';}
html+='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img height="35" width="35" border="0" src="'+fb_user_image+'">';html+='</a>';$.ajax({url:'/controls/ajaxcalls/facebook/Bookmark_Modal.aspx?Facebook_UserId='+Facebook.GetUserId()+'&FirstName='+first_name+'&facebook_avatar='+fb_user_image+'&bookMarkType='+bookMarkType+'&'+Query,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}});}});}
Facebook.ItemAlert_Modal=function(bNewAlert){if(bNewAlert==undefined){bNewAlert=true;}
$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/itemalert_modal.aspx?bNewAlert="+bNewAlert,data: "",success: function(output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.GetUserId=function(){var FBId=null;FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {FBId=response.authResponse.userID;}});return FBId;}
Facebook.ShareFriend=function(sharedURL, shareType, IdListing, thumbnail){window.clearTimeout(TimeOutModal)
var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true){MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url:'/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+sharedURL+'&sharetype='+shareType+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&MetaDescription='+$('meta[name=description]').attr("content"),success: function(html){Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}
Facebook.ShareList=function(sharedURL, shareType, IdListing, emailOrFBShare){window.clearTimeout(TimeOutModal)
var thumbnail="http://"+staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";if(emailOrFBShare=="emailshare"){var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true){MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url:'/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+escape(sharedURL)+'&sharetype='+shareType.toLowerCase()+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&MetaDescription='+$('meta[name=description]').attr("content")+'&Title='+MemberName+" is looking at list of properties on HGTV\'s FrontDoor.com Real Estate. Tell "+MemberName+" what you think.",success: function(html){Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}else{if(FB.getAuthResponse()!=null) {var shortURL=GetShortURL(sharedURL);var attachment={'name': first_name+" is looking at list of properties on HGTV's FrontDoor.com Real Estate. Tell "+first_name+" what you think.",'href': shortURL,'description': "HGTV's FrontDoor.com makes it easy for you to share your favorite properties, articles and saved searches. It's social house-hunting made simple.",'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}
else{FB.login(function(response) {if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function() {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function() {LogInConnectedUser();}, 2000);}
function LogInConnectedUser() {$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(rtrim(output)=="success") {ShowLoggedIn(true);document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}});});}
function rtrim(stringToTrim) {return stringToTrim.substring(0, stringToTrim.length - 2);}
if(FB.getAuthResponse()){isSessionRunning=true;var query=FB.Data.query('select first_name from user where uid={0}', FB.getAuthResponse().userID);query.wait(function(result) {if(result.length>0) {first_name=result[0].first_name
var shortURL=GetShortURL(sharedURL);var attachment={'name': first_name+" is looking at list of properties on HGTV's FrontDoor.com Real Estate. Tell "+first_name+" what you think.",'href': shortURL,'description': "FrontDoor.com, Listings, Homes for sale, Real Estate, Virtual Tours, social sharing, accounts, Facebook, saved articles, saved searches, saved listings, HGTV, Openhouse.com",'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false);}});}}})}}}
Facebook.ShareFavoritesFriend=function(sharedURL, shareType, IdListing, title, metadescription, thumbnail, emailOrFBShare){window.clearTimeout(TimeOutModal)
if(metadescription=="") {metadescription="HGTV&#39;s FrontDoor.com makes it easy for you to share your favorite properties, articles and saved searches. It&#39;s social house-hunting made simple.";}
if(thumbnail==""||thumbnail==null) {var thumbnail="http://"+staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";}
if(emailOrFBShare=="emailshare"){var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true){MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url:'/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+sharedURL+'&sharetype='+shareType+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&Title='+escape(title)+'&MetaDescription='+metadescription,success: function(html){Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}else{if(FB.getAuthResponse()!=null) {var shortURL=GetShortURL(sharedURL);if(thumbnail==null||thumbnail==""){var attachment={'name': title,'href': shortURL,'description': metadescription}}
else{var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}
else{FB.login(function(response) {if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function() {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function() {LogInConnectedUser();}, 2000);}
function LogInConnectedUser() {$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(rtrim(output)=="success") {ShowLoggedIn(true);document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}});});}
function rtrim(stringToTrim) {return stringToTrim.substring(0, stringToTrim.length - 2);}
var shortURL=GetShortURL(sharedURL);if(thumbnail==null||thumbnail==""){var attachment={'name': title,'href': shortURL,'description': metadescription}}
else{var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{'type': 'image','src':  thumbnail,'href': shortURL}]}}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}});}}}
Facebook.SharePropertiesAgent=function(){$.ajax({url:'/controls/ajaxcalls/facebook/SharePropertiesAgentModal.aspx',success: function(html){Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ShareAgentInfo=function(Name, Email, AccountID, DefaultInfo){if(DefaultInfo=='undefined'){DefaultInfo="Y";}
$.ajax({url:'/controls/ajaxcalls/facebook/ShareAgentInfoModal.aspx?AgentName='+Name+'&AgentEmail='+Email+'&AccountId='+AccountID+'&DefaultInfo='+DefaultInfo,success: function(html){Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ShareArticle=function(sharedURL, shareType, IdListing){var shortURL=GetShortURL(sharedURL);var thumbnail="http://"+staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";var name="";if(FB.getAuthResponse()!=null){var attachment={'name': document.title,'href': shortURL,'description': $('meta[name=description]').attr("content"),'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}
else{FB.login(function(response) {if(response.authResponse) {if(IsAlreadySignedIn()){window.setTimeout(function(){Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);},2000)}
else{Facebook.Modal_Close();window.setTimeout(function(){LogInConnectedUser();},2000);}
function LogInConnectedUser(){$(function() {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function(output) {if(rtrim(output)=="success"){ShowLoggedIn(true);document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}});});}
function rtrim(stringToTrim) {return stringToTrim.substring(0,stringToTrim.length-2);}
if(FB.getAuthResponse()){isSessionRunning=true;var query=FB.Data.query('select first_name from user where uid={0}', FB.getAuthResponse().userID);query.wait(function(result) {if(result.length>0){var attachment={'name': document.title,'href': shortURL,'description': $('meta[name=description]').attr("content"),'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}});}}})}}
Facebook.ShareSearch=function(CityName, SEOSection){if(SEOSection==undefined){SEOSection='for_sale';}
$.ajax({url:'/controls/ajaxcalls/facebook/ShareSearchModal.aspx?CityName='+CityName+'&SEOSection='+SEOSection,success: function(html){Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}
Facebook.MaxLimit=function(){$.ajax({url:'/controls/ajaxcalls/facebook/MaxNumberSavedModal.aspx',success: function(html){Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ClaimListingSaveNoPhotos=function(){$.ajax({url:'/controls/ajaxcalls/facebook/ClaimListingsNoPhotos.aspx',success: function(html){Facebook.fadeInBackground();$(html).modal();}});}
Facebook.SendEmail=function(To, From, Message, Subject, DisplayName, IdListing, shareType, sharedURL){var TmpShareType=shareType;var isValidInfo=false;if(shareType.toLowerCase()=="contactagent"){isValidInfo=validateContactForm();}
else if(shareType.toLowerCase()=="contactprofiledagent"){if(gE("yourname")){isValidInfo=validateForm();}
else{isValidInfo=validateContactForm();}}
else{isValidInfo=validateForm();}
if(shareType.toLowerCase()=="agentshare"){IdListing="123171-QC4118262";}
if(isValidInfo){var strURL='/controls/ajaxcalls/facebook/SendEmail.aspx?to='+To+"&from="+From+"&message="+escape(Message)+"&subject="+Subject+"&displayname="+DisplayName+'&IdListing='+IdListing+'&sharetype='+TmpShareType+'&sharedURL='+sharedURL;if(gE("yourphone")){if(gE("yourphone").value!="Enter your Phone Number"){strURL+="&phone="+gE("yourphone").value;}}
$.ajax({url:strURL,success: function(html){if(document.forms["detail-contact-form"]) {document.forms["detail-contact-form"].reset();}
$("#contactform_name_in").removeClass("focusField");$("#contactform_name_in").addClass("idleField");$("#contactform_email_in").removeClass("focusField");$("#contactform_email_in").addClass("idleField");$("#yourphone").removeClass("focusField");$("#yourphone").addClass("idleField");Facebook.Modal_Close()
var confirmation=""
if(shareType.toLowerCase()=="listing"){confirmation="Your property has been shared!";}
else if(shareType.toLowerCase()=="search"){confirmation="Your search has been shared!";}
else if(shareType.toLowerCase().indexOf("article")>-1){confirmation="Your article has been shared!";}
else if(shareType.toLowerCase()=="list"){confirmation="Your list has been shared!"}
else if(shareType.toLowerCase()=="agentshare"){confirmation="Your properties have been shared!"}
else if(shareType.toLowerCase()=="contactagent"||shareType.toLowerCase()=="contactprofiledagent"){confirmation="Your message has been sent."}
Facebook.Confirmation_Modal(confirmation);TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},3000);}})}
function validateContactForm(){var isValid=true;if(document.getElementById("contactform_name_in").value==""){$("#contactform_name_in").addClass("contactform-error");document.getElementById("contactform_name_error").innerHTML="Please enter your name.";document.getElementById("contactform_name_error").style.display="block";isValid=false}
else{document.getElementById("contactform_name_error").style.display="none";$("#contactform_name_in").removeClass("contactform-error");}
if(document.getElementById("contactform_email_in").value==""){$("#contactform_email_in").addClass("contactform-error");document.getElementById("contactform_email_error").innerHTML="Please enter your e-mail address.";document.getElementById("contactform_email_error").style.display="block";isValid=false}
else{if(validateEmail("contactform_email_in")==false){$("#contactform_email_in").addClass("contactform-error");document.getElementById("contactform_email_error").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).";document.getElementById("contactform_email_error").style.display="block";isValid=false}
else{document.getElementById("contactform_email_error").style.display="none";$("#contactform_email_in").removeClass("contactform-error");}}
return isValid;}
function validateForm(){if(document.getElementById("yourname").value==""){$("#modal").addClass("modal-error");$("#yournameInput").addClass("input-error");document.getElementById("sender_name_error").innerHTML="Please enter your name.";document.getElementById("sender_name_error").style.display="block";return false}
else if(document.getElementById("youremail").value==""){$("#modal").addClass("modal-error");$("#youremailInput").addClass("input-error");document.getElementById("sender_email_error").innerHTML="Please enter your e-mail address.";document.getElementById("sender_email_error").style.display="block";return false}
else if(validateEmail("youremail")==false){$("#modal").addClass("modal-error");$("#youremailInput").addClass("input-error");document.getElementById("sender_email_error").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).";document.getElementById("sender_email_error").style.display="block";return false}
if(gE("Recipient")){if(document.getElementById("Recipient").value==""){$("#modal").addClass("modal-error");$("#recipientInput").addClass("input-error");document.getElementById("recipient_error").innerHTML="Please enter an e-mail addresses.";document.getElementById("recipient_error").style.display="block";return false}
else if(validateEmail("Recipient")==false){$("#modal").addClass("modal-error");$("#recipientInput").addClass("input-error");document.getElementById("recipient_error").innerHTML="Oops! Please enter a valid e-mail address. Separate multiple addresses with comma";document.getElementById("recipient_error").style.display="block";return false}}
if(gE("broker_check")){if(gE("broker_check").checked==false){$("#modal").addClass("modal-error");document.getElementById("agree_error").innerHTML="Oops! Please agree the license";document.getElementById("agree_error").style.display="block";return false;}}
return true}
function validateEmail(fieldName){var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;var str=document.getElementById(fieldName).value;str=str.replace(/ /gi,"");validateFlag=true
for(var i=0; i<str.split(",").length; i++){if(!str.split(",")[i].match(emailRegEx)){validateFlag=false;}}
return validateFlag}
String.prototype.trim=function() {a=this.replace(/^\s+/, '');return a.replace(/\s+$/, '');}}
Facebook.Modal_Close=function(){$.modal.close();if(TimeOutModal){window.clearTimeout(TimeOutModal);}}
Facebook.GetPassword=function(){if(gE("Email_Add").value!="" && gE("Email_Add").value=="Enter your valid email address"){gE("pwdFormatErrLogin").style.display="block"
gE("pwdFormatErrLogin").innerHTML="Please enter email address"
$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");return false}
if(validateEmailForgot(gE("Email_Add").value)==false){gE("pwdFormatErrLogin").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com)."
gE("pwdFormatErrLogin").style.display="block";$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");return false}
var querystring="email="+gE("Email_Add").value+"&action=forgot_password";$AJAX.GetForDelegate(forgotpasswordResultDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);function  forgotpasswordResultDelegate(AjaxResponse){if(AjaxResponse=="success"){Facebook.Modal_Close()
Facebook.Confirmation_Modal("Your password was just sent to your e-mail address.");}
else{gE("pwdFormatErrLogin").style.display="block";gE("pwdFormatErrLogin").innerHTML=AjaxResponse
$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");}}
function validateEmailForgot(emailTxt){var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;str=emailTxt;str=str.replace(/ /gi,"");validateFlag=true
for(var i=0; i<str.split(",").length; i++){if(!str.split(",")[i].match(emailRegEx)){validateFlag=false;}}
return validateFlag}}
Facebook.AccountActivation=function(email, password){$.ajax({url:"/controls/ajaxcalls/facebook/AccountActivation.aspx?email="+email+"&password="+password,success: function(html){Facebook.Confirmation_Modal("Account activation e-mail sent.");window.setTimeout(function(){Facebook.Modal_Close();},5000);}})}
var GL_overlayDiv;Facebook.fadeInBackground=function(){if(!GL_overlayDiv){GL_overlayDiv=document.createElement('div');}
GL_overlayDiv.id="modalOverlayDiv";$('#global_wrap').append(GL_overlayDiv);$('#modalOverlayDiv').css('height', $("body").height());$(GL_overlayDiv).fadeTo(250, .3);$(document).keydown(Facebook.handleEscape);$(GL_overlayDiv).click(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();})}
Facebook.fadeOutBackground=function(){if(GL_overlayDiv) {$(GL_overlayDiv).fadeTo(250, .0)
$('#modalOverlayDiv').css('height', '0px')
setTimeout(function(){if(GL_overlayDiv && GL_overlayDiv.parentNode!=null) {GL_overlayDiv.parentNode.removeChild(GL_overlayDiv);}}, 251);}}
Facebook.handleEscape=function(e) {if(e.keyCode==27) {document.getElementById('global_wrap').removeChild(GL_overlayDiv);$('#modalOverlayDiv').css('height', '0px')}}
Facebook.loginHeaderWidth=function(){var $loginLinks=$('.login-links');var $loginWrapperBg=$('.log_in_wrapper_bg');$loginLinks.each(function(index){$loginWrapperBg.eq(index).css("width", ($(this).width()+65)+"px");});}
function GetShortURL(sharedURL) {var shortURL=$.ajax({url: '/controls/AjaxCalls/Facebook/ShortURLFB.aspx?sharedurl='+encodeURIComponent(sharedURL),async: false}).responseText;return shortURL;}
function fbs_click(sharedURL, title) {if(typeof sharedURL=='undefined') {sharedURL=document.CanonicalURL()+document.FacebookTrackingParam();}
if(typeof title=='undefined') {title=document.title;}
var shortURL=GetShortURL(sharedURL);window.open("http://www.facebook.com/sharer.php?u="+shortURL+"&t="+title,"sharer","toolbar=0,status=0,width=626,height=436");return false;}
function ShowFacebookStatusDialog(containerID, defaultText, sharedURL){var parentContainer=document.getElementById(containerID);var statusWrap=document.getElementById("status-wrap");var statusWrapConnect=document.getElementById("status-wrap-connect");if(parentContainer!=null && statusWrap!=null && statusWrapConnect!=null){if(document.getElementById('ctl00_FacebookStatusDialog1_status_message')!=null){if(sharedURL==null) {sharedURL=document.CanonicalURL()+document.FacebookTrackingParam();}
var shortURL=GetShortURL(sharedURL);if(defaultText!=null){document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML=defaultText+shortURL;}
else{document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML+=shortURL;}}
parentContainer.appendChild(statusWrap);parentContainer.appendChild(statusWrapConnect);}}
Facebook.WhatsThis=function(){$.ajax({url:'/controls/ajaxcalls/facebook/WhatsThisModal.aspx',success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.WhatsThisMessage=function(message, onCloseDelegate) {$.ajax({url: '/controls/ajaxcalls/facebook/WhatsThisModalMessage.aspx?Message='+message,success: function(html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.ViewAsList=function(){if(!IsAlreadySignedIn()){if(FB.getAuthResponse()==null){Facebook.Bookmark_Login("properties_module", 'page='+GetPageName());}
else{Facebook.Bookmark_Modal("properties_module", 'page='+GetPageName());}}
else{window.location.href=WebRoot+"account/my-folders/";}}
Facebook.BMShareLogin=function(ShareType){if(!IsAlreadySignedIn()){if(FB.getAuthResponse()==null){Facebook.Bookmark_Login("share_module", 'page='+GetPageName()+'&shrtype='+ShareType);}
else{Facebook.Bookmark_Modal("share_module", 'page='+GetPageName()+'&shrtype='+ShareType);}}
else{ShareAllListings(ShareType);}}
Facebook.ClearAllProperties=function(){$.ajax({url:'/controls/ajaxcalls/facebook/ClearPropertiesModal.aspx',success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.BadgeShare_Modal=function(url, fbtitle, fbmessage, fbimage, twmessage) {$.ajax({url: "/controls/AjaxCalls/Facebook/badgeshare-modal.aspx?url="+UrlEncode(url)+"&fbtitle="+fbtitle+"&fbmessage="+fbmessage+"&fbimage="+UrlEncode(fbimage)+"&twmessage="+twmessage,success: function(html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.SharePropertiesAgentModal=function(email, name){if(email!=""){{try {$.ajax({url: '/controls/ajaxcalls/accounts/ShareAllListings.aspx',type: 'GET',dataType: 'text',success: function(data) {MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);$.ajax({url:'/controls/ajaxcalls/facebook/SharePropertiesAgentModal.aspx?sharedurl='+escape(data)+'&AgentEmail='+email+'&AgentName='+name+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail,success: function(html){Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});},error: function(XMLHttpRequest, textStatus, errorThrown) {alert('error this:'+this+'\n XMLHttpRequest:'+XMLHttpRequest+'\ntextStatus:'+textStatus);}});}
catch (e) {alert('error:'+e);}}}}
Facebook.CompleteTempCAction=function(output){if(output.indexOf("lastaction_bmpshare")>-1){RemoveCookie("TempC");ShowLoggedIn(true);var ShareType='emailshare';var Arr=output.split("::");if(Arr.length>1){ShareType=Arr[1];}
if(SignInOrRegister=="SignIn"){FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});Facebook.Modal_Close();window.setTimeout(function(){Facebook.fadeOutBackground();ShareAllListings(ShareType);ChangeUserAction();},2000);}}
else if(output.indexOf("lastaction_bmpagentshare")>-1){RemoveCookie("TempC");ShowLoggedIn(true);var Arr=output.split("::");var TmpAgentName=Arr[1];var TmpAgentEmail=Arr[2];if(SignInOrRegister=="SignIn"){FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});Facebook.Modal_Close();window.setTimeout(function(){Facebook.fadeOutBackground();ChangeUserAction();Facebook.SharePropertiesAgentModal(TmpAgentEmail, TmpAgentName);},2000);}}
else if(output=="lastaction_bmpviewlist"){RemoveCookie("TempC");ShowLoggedIn(true);var ShareType='emailshare';if(SignInOrRegister=="SignIn"){FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {ShareType='fbshare';Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});Facebook.Modal_Close();window.setTimeout(function(){window.location.href=WebRoot+"account/my-folders/";},2000);}}
else if(output=="lastaction_additem"){if(typeof BookmarkModuleSaveListing=='function'){if(typeof ChangeUserAction=='function'){ChangeUserAction();}
BookmarkModuleSaveListing();}
if(readTempCookie("type")=="Article"){RemoveCookie("TempC");SaveItem();}}
else if(output.indexOf("lastaction_showitemalertdialog")>-1){ShowLoggedIn(true);if(SignInOrRegister=="SignIn"){FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});Facebook.Modal_Close();ChangeUserAction();window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();Facebook.ItemAlert_Modal((getAlertListingId(alertIdListing)==-1));},2000);}}
else if(output=="success"){RemoveCookie("TempC");ChangeUserAction();document.getElementById("FB_in").style.display="block";if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {gE("my_fb").href="/pro/account/dashboard";}else{gE("my_fb").href="/account/recent-activity/";}
document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}
function AddBlurHandlersToPasswordAndPasswordHintFields(formid) {var login_form;if(formid) {login_form=formid;}else{login_form="#login_form";}
$("#password-hint", login_form).removeClass("focusField");$("#login_password", login_form).blur(function() {if($(this).val()=="") {$(this).hide();$("#password-hint", login_form).removeClass("focusField").addClass("idleField");$("#password-hint", login_form).show();}});$("#ca_password", login_form).blur(function() {if($(this).val()=="") {$(this).hide();$("#password-hint", login_form).removeClass("focusField").addClass("idleField");$("#password-hint", login_form).show();}});$("#password-hint", login_form).click(function() {$(this).hide();$("#login_password", login_form).show().focus();$("#ca_password", login_form).show().focus();});$("#password-hint", login_form).focus(function() {$(this).hide();$("#login_password", login_form).show().focus();$("#ca_password", login_form).show().focus();});}
function TestEmailAddress(email) {var d=new Date();$.ajax({type: 'GET',url: '/controls/ajaxcalls/Accounts/AccountLookup-BlankPassword.aspx?email='+email+'&rnd='+d.getTime(),success: ProcessAccountLookupResponse,dataType: "json"});}
function SendAccountConfirmationEmail(email, firstName, activationId, sourceName) {var d=new Date();$.ajax({type: 'GET',url: '/controls/ajaxcalls/Accounts/SendConfirmationEmail.aspx?email='+email+'&firstName='+firstName+'&activationId='+activationId+'&sourceName='+sourceName+'&rnd='+d.getTime(),success: ProcessAccountLookupResponse,dataType: "json"});}
function ProcessAccountLookupResponse(responseJSON, statusText, caleeOptions) {if(statusText=="success") {if(typeof responseJSON["errors"]!="undefined") {Facebook.Modal_Close();Facebook.Confirmation_Error_Modal(responseJSON["errors"], "Oops!");}
else if(typeof responseJSON["success_message"]!="undefined") {}
if(typeof responseJSON["script"]!="undefined") {Facebook.Modal_Close();new Function("options", "responseJSON", "statusText", responseJSON["script"])(caleeOptions, responseJSON, statusText);}}
else{Facebook.Modal_Close();Facebook.Confirmation_Error_Modal("There was an error contacting the server: \r\n"+statusText, "Oops!");}}
function CloseModalAndFadeOutBkg(timeout) {if(typeof (timeout)!=undefined && timeout>0) {window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();window.clearTimeout();}, timeout);}else{Facebook.Modal_Close();Facebook.fadeOutBackground();}};function IsAlreadySignedIn(){if(readUserPersCookie(PERSONCOOKIE_EMAIL)!=""){return true;}
else{return false;}}
function getSavedListingId(ListingId){var arr=readListingsPersCookie();if( arr!=undefined){return inArray(ListingId, arr);}
return -1;}
function getAlertListingId(ListingId){var arr=readAlertsPersCookie();if( arr!=undefined){return inArray(ListingId, arr);}
return -1;}
function getSavedArticleId(Id){var arr=readArticlesPersCookie();if( arr!=undefined){return inArray(Id, arr);}
return -1;}
function getTempCookie(NameOfCookie){if(document.cookie.length>0){begin=document.cookie.indexOf(NameOfCookie);if(begin!=-1){begin+=NameOfCookie.length+1
end=document.cookie.indexOf("&", begin);var name=unescape(document.cookie.substring(begin,end));name=name.split(";")[0];if(name.charAt(0)==","){name=name.substring(1,name.length);}
return name;}}
return "";}
function ShowLoggedIn(flag){var isSessionRunning="";if(flag){try {FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {Facebook.User_GetInfo();isSessionRunning="isrunning";$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+Facebook.GetUserId(),data: "",success: function (output) {if(output=="success") {gE("FD_in").style.display="none";gE("FD_FB_out").style.display="none"}}});});}
ShowLoginSectionForUser(isSessionRunning);if(isSessionRunning=="") {gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";gE("FD_in").style.display="block";gE("FD_FB_out").style.display="none";Facebook.loginHeaderWidth();}
SignInOrRegister="SignIn"});}
catch(e) {}}
else{try {FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {Facebook.User_GetInfo();isSessionRunning="isrunning";}else{Facebook.Modal_Close();document.getElementById("FB_in").style.display="none";document.getElementById("FD_in").style.display="none";document.getElementById("loading").style.display="none";document.getElementById("FD_FB_out").style.display="block";SignInOrRegister="";}
SignInOrRegister="SignIn"});}
catch(e) {}}}
function ShowLoginSectionForUser(isSessionRunning) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {var loginType="fd";document.getElementById("loading").style.display="none";document.getElementById("FD_FB_out").style.display="none";if(isSessionRunning.length>0) {loginType="fb";$("#my_fb>a").attr("href", "/pro/account/dashboard");document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";}else{$("#my_fd>a").attr("href", "/pro/account/dashboard");gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";document.getElementById("FD_in").style.display="block";document.getElementById("FB_in").style.display="none";}
LoadProAccountMenu(loginType);}
else if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==1) {if(isSessionRunning.length>0) {$("#my_fb>a").attr("href", "/account/recent-activity/");document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";}else{$("#my_fd>a").attr("href", "/account/recent-activity/");gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";document.getElementById("FD_in").style.display="block";document.getElementById("FB_in").style.display="none";}}}
function IsDefaultPage(){var url=window.location.href.split('?')[0];var arr=url.split(PersonalizationRoot);if(arr[arr.length -1]=="Default.aspx"||arr[arr.length -1]==""){return true;}
else{return false;}}
function DisplayHeader(){ShowLoggedIn(IsAlreadySignedIn());}
function tb_update(URL, Width, Height){gE("TB_window").style.width=(parseInt(Width, 10)+30)+"px"; ;gE("TB_window").style.height=(parseInt(Height, 10)+30)+"px"; ;gE("TB_ajaxContent").style.width=Width+"px";gE("TB_ajaxContent").style.height=Height+"px";if(URL!=undefined||URL!=null){$AJAX.GetToObject(gE("TB_ajaxContent"),URL);}
tb_position_gt(parseInt(Width, 10)+30);window.setTimeout(function(){LoadPageDefaults();},255);}
function tb_updateHTML(caption, html, Width, Height){if(typeof document.body.style.maxHeight==="undefined") {$("body","html").css({height: "100%", width: "100%"});$("html").css("overflow","hidden");if(document.getElementById("TB_HideSelect")===null) {$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");$("#TB_overlay").click(tb_remove);}}
else{if(document.getElementById("TB_overlay")===null){$("body").append("<div id='TB_overlay'></div><div id='TB_window'>");$("#TB_overlay").click(tb_remove);}}
if(caption===null){caption="";}
$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");$('#TB_load').show();TB_WIDTH=(Width*1)+30||630;TB_HEIGHT=(Height*1)+40||440;ajaxContentW=TB_WIDTH - 30;ajaxContentH=TB_HEIGHT - 45;if($("#TB_window").css("display")!="block"){$("#TB_window").append("<!--<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a>or Esc Key</div></div>--><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");}else{$("#TB_ajaxContent")[0].style.width=ajaxContentW+"px";$("#TB_ajaxContent")[0].style.height=ajaxContentH+"px";$("#TB_ajaxContent")[0].scrollTop=0;$("#TB_ajaxWindowTitle").html(caption);}
$("#TB_closeWindowButton").click(tb_remove);tb_position();$("#TB_load").remove();tb_init("#TB_ajaxContent a.thickbox");$("#TB_window").css({display:"block"});window.setTimeout(function(){LoadPageDefaults();},255);gE("TB_ajaxContent").innerHTML=html;document.onkeyup=function(e){if(e==null) {keycode=event.keyCode;}else{keycode=e.which;}
if(keycode==27){tb_remove();}};}
function tb_position_gt(gt_WIDTH){$("#TB_window").css({marginLeft: '-'+parseInt((gt_WIDTH / 2),10)+'px', width: gt_WIDTH});if(!(jQuery.browser.msie && typeof XMLHttpRequest=='function')) {$("#TB_window").css({marginTop: '-'+parseInt((TB_HEIGHT / 2),10)+'px'});}}
function SignIn(IsFirstTime){if(IsFirstTime){if(gE("search_pricemin")){gE("search_pricemin").setAttribute("tabindex", -1);gE("search_pricemin").tabIndex=-1;}
if(gE("search_pricemax")){gE("search_pricemax").setAttribute("tabindex", -1);gE("search_pricemax").tabIndex=-1;}
if(gE("search_bedrooms")){gE("search_bedrooms").setAttribute("tabindex", -1);gE("search_bedrooms").tabIndex=-1;}
if(gE("email")!=null){tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310&emailadd="+gE("email").value, false);}
else{tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310", false);}}
else if(gE("Email_Add")!=null){tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310&emailadd="+gE("Email_Add").value, false);}
else{tb_update(PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login", "310", "285");}}
function SignOut(){$AJAX.GetForDelegate(SignOutDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?action=sign_out");if(document.getElementById("HomeFacebookBanner")!=null ){window.setTimeout(reload, 300);}}
function SignOutDelegate(AjaxResponse){ShowLoggedIn(false);if(AjaxResponse!="success"){window.location.reload(true);}
else{var url=window.location.href.split('?')[0];if(window.location.pathname=="/"||window.location.pathname==""){window.location.href=window.location.href;}
if(window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1||window.location.href.toLowerCase().indexOf('pro/')!=-1||window.location.href.indexOf("agent-tools/")!=-1||window.location.href.indexOf("Activation")!=-1){window.location.replace("/Default.aspx")}
if(url.indexOf(PersonalizationRoot)>-1){window.location.href=PersonalizationRoot+"Default.aspx";}
else{ChangeUserAction();}
$.event.trigger('SignOutEvt');}}
function NotSignedInDelegate(AjaxResponse){var  html=AjaxResponse;tb_updateHTML("", html, 550, 360);}
function SubmitByEnterkey(e,formID){if(window.event){KeyCode=e.keyCode;}
else if(e.which){KeyCode=e.which;}
if(KeyCode==13){if(formID!=undefined){if(formID=="login_form"){return true;}
else if(formID=="forgot_pw_form"){return true;}
else{ValidateEmailFriend(formID);}}
else{SaveSearchSubmit();}}
else{return false;}}
var task;var customdata1;var customdata2;var active_form;function SignInSubmit(formID, _task, _customdata1, _customdata2){if(formID) {active_form="#"+formID;}else{active_form="#login_form";}
if(ValidateSignIN(formID)){var frm=document.forms[formID];var querystring="email="+frm.email.value+"&pwd="+frm.login_password.value+"&rememberme=false";if(GetPageName().indexOf(PersonalizationRoot+"sign_up.aspx")>-1){querystring+='&PathInfo=signuppage';}
else{querystring+='&PathInfo='+GetPageName();}
querystring+='&NameCookie='+getTempCookie("iname")+'&action=sign_in';$("#loadingconnect", active_form).show();var strURL=PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring;task=_task;customdata1=_customdata1;customdata2=_customdata2;$AJAX.GetForDelegate(SignInResultDelegate, strURL);if(document.getElementById("HomeFacebookBanner")!=null ){window.setTimeout(reload, 500);}}
else{$("#loadingconnect", active_form).hide();return false;}}
function HandleClaimWizardLogin() {if(task.indexOf('PerformClaimListing')!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {var URL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=DirectClaim&IdListing="+customdata1+"&IdParentAccount="+customdata2;$.get(URL, function (data) {CreateAndFillProListingClaimContainer(data);if($('#spnListingClaimStatus').html().indexOf('SUCCESS')!=-1) {window.location=WebRoot+"pro/view-listings";}else{ShowClaimStatusModalWindow();}});}else{var forward=WebRoot+'listing/'+customdata1;var modalInfo={header: "Pro Account Required",text: "<p>You need to have a pro account to confirm listings.<br/><br/>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function() {  OmAgentInt(this,null,null,"Registration : Convert to Pro"); document.location=WebRoot+"pro/upgrade/"+customdata1+"/"+customdata2; },lnktext: "no, thank you.",lnkclick: function() {document.location=forward;},closeclick: function() {document.location=forward;}}
if($('#divProAccountModal').length==0) {var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function(data) {CreateAndFillProListingClaimContainer(data);ShowBlockedProAccountModalWindow(modalInfo);});}else{ShowBlockedProAccountModalWindow(modalInfo);}}}}
function reload(){DisplayNotificationBanner()}
function SignInResultDelegate(AjaxResponse) {if(AjaxResponse=="success") {RemoveCookie("reg");FB.getLoginStatus(function(response) {if((response.status) && (response.status=="connected")) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});if(gE("loadingconnect")) {gE("loadingconnect").style.display="none";}
if(task.indexOf("convert_to_proRedirect")==-1){Facebook.Confirmation_Modal("Welcome back, "+DisplayName()+".");window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);}
ShowLoggedIn(true);ChangeUserAction();Facebook.Modal_Close();window.setTimeout(function() {if(task.indexOf("buyCredits")!=-1){window.location="/pro/credits/dashboard";}
else if(task.indexOf("header")!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {window.location="/pro/account/editprofile";}else{window.location="/account/recent-activity";}}
else if(window.location.href.indexOf("pro/")!=-1||window.location.href.indexOf("agent-tools/")!=-1) {if(window.location.href.indexOf("register")!=-1||window.location.href.indexOf("signup")!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {window.location="/pro/account/editprofile";}
else if(window.location.href.indexOf("signup")!=-1) {window.location="/account/recent-activity";}
else if(task.indexOf("convert_to_proRedirect")!=-1){document.location=WebRoot+"pro/upgrade";}
else{var modalInfo={header: "Pro Account Registration",text: "<p>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function() { document.location=WebRoot+"pro/account/settings"; },lnktext: "no, thank you.",lnkclick: function() {document.location=WebRoot+"/pro/account/register";},closeclick: function() {document.location=WebRoot+"/pro/account/register";}}
var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function(data) {CreateAndFillProListingClaimContainer(data);ShowBlockedProAccountModalWindow(modalInfo);});}}
else if(window.location.href.indexOf("claimlistings/step1")!=-1) {}else{window.location.reload(true);}}
else if(window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1||window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf("MyFolders.aspx")!=-1) {window.location="/account/recent-activity"}}, 1500);if(task=="select_homestyle") {eval(customdata1);SelectHomestyle(homestyleObj.idlisting, homestyleObj.idaccount, homestyleObj.agentcodestyle, homestyleObj.idstyle, homestyleObj.stylename);task="";customdata1="";}
$.event.trigger('SignInEvt');}
else if(AjaxResponse.indexOf("pageredirect=")>-1) {window.location.href=AjaxResponse.split("=")[1];}
else if(AjaxResponse=="lastaction_addsearch") {ShowLoggedIn(true);if(SignInOrRegister=="SignIn") {if(FB.getAuthResponse()!=null) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
ShowLoggedIn(true);ChangeUserAction();window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeInBackground();Facebook.ShareSearch(GetSearchLocation(), SEOSection)}, 5000);}else{}}
else if(AjaxResponse.indexOf("lastaction_showitemalertdialog")>-1) {ShowLoggedIn(true);if(SignInOrRegister=="SignIn") {if(FB.getAuthResponse()!=null) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
Facebook.Modal_Close();ChangeUserAction();window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();Facebook.ItemAlert_Modal((getAlertListingId(alertIdListing)==-1));}, 2000);}}
else if(AjaxResponse.indexOf("lastaction_bmpshare")>-1) {ShowLoggedIn(true);var ShareType='emailshare';var Arr=AjaxResponse.split("::");if(Arr.length>1) {ShareType=Arr[1];}
if(SignInOrRegister=="SignIn") {if(FB.getAuthResponse()!=null) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
Facebook.Modal_Close();ChangeUserAction();window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();ShareAllListings(ShareType);}, 2000);}}
else if(AjaxResponse.indexOf("lastaction_bmpagentshare")>-1) {ShowLoggedIn(true);var Arr=AjaxResponse.split("::");var TmpAgentName=Arr[1];var TmpAgentEmail=Arr[2];if(SignInOrRegister=="SignIn") {if(FB.getAuthResponse()!=null) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
Facebook.Modal_Close();window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();ChangeUserAction();Facebook.SharePropertiesAgentModal(TmpAgentEmail, TmpAgentName);}, 2000);}}
else if(AjaxResponse=="lastaction_bmpviewlist") {ShowLoggedIn(true);var ShareType='emailshare';if(SignInOrRegister=="SignIn") {if(FB.getAuthResponse()!=null) {ShareType='fbshare';Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
Facebook.Modal_Close();window.setTimeout(function() {window.location.href=WebRoot+"account/my-folders/";}, 2000);}}
else if(AjaxResponse.indexOf("lastaction_")>-1) {var message=AjaxResponse.split("::");if(FB.getAuthResponse()!=null) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}
Facebook.Modal_Close()
window.setTimeout(function() {Facebook.Confirmation_Modal(message[1]+' '+message[0].split("_")[1], "Welcome Back!");}, 1000);ShowLoggedIn(true);ChangeUserAction();window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 6000);}
else if(AjaxResponse=="Your account has not been activated."){if(task=="select_homestyle") {eval(customdata1);SelectHomestyle(homestyleObj.idlisting, homestyleObj.idaccount, homestyleObj.agentcodestyle, homestyleObj.idstyle, homestyleObj.stylename, true);task="";customdata1="";}
window.location.href="/Activation.aspx?confirmation=AccountSuccess&email="+gE("email").value+"&password="+gE("login_password").value;}else{$('#pw', active_form).css('color', '#000');$("#modal").addClass("modal-error");if(AjaxResponse.indexOf("email address")>-1) {$("#email_input", active_form).addClass("input-error");$("#emailErrLogin", active_form).show();}else{$("#password_input", active_form).addClass("input-error");$("#pwdErrLogin", active_form).show();}
$("#loadingconnect", active_form).hide();}}
function ForgotPassword(flag, email){Facebook.Modal_Close();var strURL='/controls/ajaxcalls/facebook/ForgotPasswordModal.aspx';if(email!=undefined){strURL+="?email="+email;}
if(IsDefaultPage()){$.ajax({url:strURL,success: function(html){$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();FocusToFirstInputInModal();}});}
else{if(flag){$.ajax({url:strURL,success: function(html){$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();FocusToFirstInputInModal();}});}
else{$.ajax({url:strURL,success: function(html){$(html).modal({minWidth: 400});HandleInputControls();FocusToFirstInputInModal();}});}}}
function GetPassword(){if(validateLoginEmail(gE("Email_Add"), gE("emailErr"),"")){var querystring="email="+gE("Email_Add").value+"&action=forgot_password";$AJAX.GetForDelegate(forgotpasswordResultDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}
else{return false;}}
function forgotpasswordResultDelegate(AjaxResponse){var html="";if(AjaxResponse=="success"){gE("forgot_pw_result").style.display='block';gE("forgot_pw").style.display='none';html="<div id='pw_result_hdr' class='clearfix'><h2>Password Sent</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+='<p>Your password was just sent to your e-mail.</p>';html+='<div id="tb_tbns"><div class="pw_actions clearfix"><div id="pw_signin_wrapper"><a href="javascript:void(0);" id="pw_signin" onclick="SignIn();">Sign In Now</a></div><span class="or">OR</span><a href="javascript:void(0);" onclick="tb_remove();" id="not_sign">Do Not Sign In Now</a></div></div>';gE("forgot_pw_result").innerHTML=html;}
else{html="<p>"+AjaxResponse+"</p>";var btnhtml='<div class="pw_actions" class="clearfix"><a href="javascript:void(0)" onclick="ForgotPassword(false);" id="try_again">Try Again</a></div>';gE("emailNotFoundErr").style.display='block';gE("emailErr").style.display='none';gE("emailNotFoundErr").innerHTML=html;gE("tb_tbns").innerHTML=btnhtml;}}
function MyFrontdoorList(){if(gE("searchbar_wrapper")!=null) {gE("searchbar_wrapper").style.zIndex="0";gE("searchbar_wrapper").style.position="relative";}
if(gE("serach_home")!=null) {gE("serach_home").style.zIndex="0";}
var rhtml="";if(readListingCountPersCookie()!=0||readSearchCountPersCookie()!=0||readArticleCountPersCookie()!=0){rhtml+='<div id="my_fd_options_rt_div"><h3>My Saved Items</h3>';}
if(readListingCountPersCookie()!=0){rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Listings</a>('+readListingCountPersCookie()+')</div>';rhtml+='<ul>';var arrLatListings=readLatestListingsPersCookie();for( var i=0; i<arrLatListings.length; i++){var ItemInfo=arrLatListings[i].split("::");rhtml+='<li class="clearfix"><a href="'+WebRoot+'listing/'+ItemInfo[1]+'" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readSearchCountPersCookie()!=0){rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Searches</a>('+readSearchCountPersCookie()+')</div>';rhtml+='<ul>';var arrLatListings=readLatestSearchesPersCookie();for( var i=0; i<arrLatListings.length; i++){var ItemInfo=arrLatListings[i].split("::");;rhtml+='<li class="clearfix"><a href="javascript:void(0)" onclick="GotoSearchPage('+ItemInfo[1]+');" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readArticleCountPersCookie()!=0){rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Articles</a>('+readArticleCountPersCookie()+')</div><ul>';var arrLatListings=readLatestArticlesPersCookie();for( var i=0; i<arrLatListings.length; i++){var ItemInfo=arrLatListings[i].split("::");rhtml+='<li class="clearfix"><a href="'+WebRoot+'news/article/'+ItemInfo[1]+'" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readListingCountPersCookie()!=0||readSearchCountPersCookie()!=0||readArticleCountPersCookie()!=0){rhtml+='</div><div id="my_fd_options_bottom"></div>';}
var G=new GetWindowBunds();gE("MyFDBackOpen").style.left="1px";gE("MyFDBackOpen").style.top="1px";gE("MyFDBackOpen").style.width="1000px";gE("MyFDBackOpen").style.height=(G.VisibleHeight-30)+"px";gE("MyFDBackOpen").style.left="0px";gE("MyFDBackOpen").style.top="0px";if(gE("my_fd_options_rt").style.display=='none' && rhtml!=""){gE("my_fd_options_rt").style.display='block';gE("MyFDBackOpen").style.display='block';}
gE("my_fd_options_rt").innerHTML=rhtml;}
function CloseMyFD(){gE("my_fd_options_rt").style.display='none';gE("MyFDBackOpen").style.display='none';if(gE("searchbar_wrapper")!=null) {gE("searchbar_wrapper").style.zIndex="";gE("searchbar_wrapper").style.position="static";}
if(gE("serach_home")!=null) {gE("serach_home").style.zIndex="0";}}
function HoverMyFD(){if(readListingCountPersCookie()==0 && readSearchCountPersCookie()==0 && readArticleCountPersCookie()==0){gE("city-dropdown").style.display="none";gE("close-city-dropdown").style.display="none";gE("nav_city_url").className="";gE("my_fd_options_rt").style.zIndex="98";}}
function validateLoginEmail(emailField, emErr, message) {if(fieldHasValue(emailField) && validEmailField(emailField)) {$("#email_input", active_form).removeClass("input-error");return true;}else{emErr.show();$('#eml', active_form).css('color', '#000000')
if(!fieldHasValue(emailField)){emErr.html("Please enter your e-mail address.");}
else{if(message!=""){emErr.html(message);}}
$("#modal").addClass("modal-error");$("#email_input", active_form).addClass("input-error");firstErrField=emailField;AlertFocus(firstErrField);return false;}}
function validateLoginPassword (pwdField, pwdErr){var fieldValue=trim(pwdField.value);var regex3=/[^0-9a-zA-Z\!@#\$%^\.\*\+=\_]/g;if(fieldHasValue(pwdField) && fieldValue.length>5 && !regex3.test(fieldValue)) {pwdErr.hide();return true;}else{pwdErr.show();$("#pw", active_form).css('color', '#000000');$("#modal").addClass("modal-error");$("#password_input", active_form).addClass("input-error");if(pwdField==""){pwdErr.html("Please enter your password.");}
else{pwdErr.html("Oops! The password you entered does not match our records. Please try again.");}
return false;}}
function ValidateSignIN(formID){var frm=document.forms[formID];var isValidForm=true;var emErr=$('#emailErrLogin', active_form);var pwdErr=$('#pwdErrLogin', active_form);var arrErrSum=new Array();var firstErrField;emErr.hide();pwdErr.hide();$('#error', active_form).hide();if(!validateLoginEmail(frm.email, emErr, "Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).")) {if(firstErrField==undefined){firstErrField=frm.email;}
$("#email_input", active_form).addClass("input-error");isValidForm=false;}
if(!validateLoginPassword(frm.login_password, pwdErr)) {if(firstErrField==undefined){firstErrField=frm.password;}
$("#password_input", active_form).addClass("input-error");isValidForm=false;}
if(isValidForm) {return true;}else{if(firstErrField!=undefined){AlertFocus(firstErrField);}
return false;}}
function toErrSummary(arrErrSum){var errList=document.getElementById("errSummaryList");var reqSum=document.getElementById("valid_req");if(arrErrSum.length!=0) {reqSum.style.display='inline';errList.innerHTML=arrErrSum.join('');}else{reqSum.style.display='none';errList.innerHTML='';}}
function rollOn(listingId){gE("rolloff_"+listingId).className="rollon_item";document.getElementById("listingBtns_"+listingId).style.display='block';}
function rollOff(listingId){gE("rolloff_"+listingId).className="rolloffmode";document.getElementById("listingBtns_"+listingId).style.display='none';}
function rollOnSearch(listingId){if(!IsEditOn){gE("rolloff_"+listingId).className="rollon_item";document.getElementById("listingBtns_"+listingId).style.display='block';gE("edittitle_"+listingId).style.display='inline';}}
function rollOffSearch(listingId){if(gE("searchname_edit_"+listingId).style.display=='none'){gE("rolloff_"+listingId).className="rolloffmode";document.getElementById("listingBtns_"+listingId).style.display='none';gE("edittitle_"+listingId).style.display='none';}}
function GotoSearchPage(SearchId){var query="action=getsearchlink&SearchId="+SearchId;$AJAX.GetForDelegate(GotoResults, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function GotoResults(AjaxResponse){if(AjaxResponse!=""){window.location.href=AjaxResponse;}}
function UserOptionsDelegate(AjaxResponse){var html="";var caption="";var width=250;var height=100;var returnVal=AjaxResponse.split("::")[1];if(returnVal!=undefined){if(returnVal.charAt(0)==","){returnVal=returnVal.substring(1,returnVal.length);}}
if(AjaxResponse.indexOf("success_add_listing")!=-1){ChangeUserAction();var conf=getBookmarkCookieValue();var showChecked=conf;if(conf.length==0) {setBookmarkCookieValue(true);showChecked="1";}
if(conf!="1") {html=returnVal+' was saved to your account.';Facebook.BMConfirmation_Modal(html, undefined, showChecked);TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}}
else if(AjaxResponse.indexOf("success_add_alert_listing")!=-1){SaveListingAlert(returnVal);}
else if(AjaxResponse.indexOf("success_update_item_alert")!=-1){Facebook.Modal_Close();Facebook.Confirmation_Modal(returnVal);TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);ChangeUserAction();}
else if(AjaxResponse.indexOf("success_add_article")!=-1){ChangeUserAction();html='"'+returnVal+'" was saved to your account.';Facebook.Confirmation_Modal(html);TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse.indexOf("success_add_video")!=-1){ChangeUserAction();caption="Save Video";html='<div id="not_signedin_hdr" class="clearfix"><h2>Success!</h2></div>'
html+='<div id="success_saved"><span class="b">"'+returnVal+'"</span>was saved to your account.';html+='<div id="tb_tbns"><a href="javascript:void(0);" onclick="tb_remove();"  id="success_ok">OK</a></div></div>';tb_updateHTML(caption, html, width, height);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse.indexOf("success_add_search")!=-1){Facebook.Modal_Close();ChangeUserAction();html='"'+returnVal+'" was saved to your account.';Facebook.Confirmation_Modal(html);TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse.indexOf("success_show_alert_dialog")>-1){var params=AjaxResponse.split(":");var bNewAlert=true;if(params.length>1){bNewAlert=params[1].split("=")[1];}
Facebook.ItemAlert_Modal(bNewAlert);}
else if(AjaxResponse=="success_remove_listing"){if(gE("properties-drop-box")){ChangeUserAction();}
else{SuccessAction(false);}
window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_article"){SuccessAction(false);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_video"){SuccessAction(false);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_search"){SuccessAction(false);window.setTimeout("tb_remove();", 5000);}
else if(AjaxResponse.indexOf("search_limit_exceeded")>-1){caption="Save Search";width=250;height=200;var params=AjaxResponse.split(":");var searchname="No Search Name";var emailalert=false;if(params.length>2){searchname=params[1].split("=")[1];emailalert=params[2].split("=")[1].toLowerCase();}
Facebook.Modal_Close()
window.setTimeout(function(){Facebook.MaxLimit();},5000)}
else if(AjaxResponse.indexOf("not signed in")!=-1){bmarkType=""
if(AjaxResponse.indexOf(":")!=-1){bmarkType=AjaxResponse.split(":")[1];}
if(FB.getAuthResponse()==null){Facebook.Bookmark_Login(bmarkType);}
else{Facebook.Bookmark_Modal(bmarkType);}}
else if(AjaxResponse.indexOf("not activated")!=-1){html="Account activation is required to set listing alerts. You are registered but still need to activate using the activation link we sent you within the past 24 hours. Please check your email.";Facebook.Confirmation_Error_Modal(html, "Oops!");TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="error_action_listing"){html="We're sorry, but this listing was not saved to your account. Please try again later.";Facebook.Confirmation_Error_Modal(html, "Oops!");$("#properties-success").hide();if(gE("properties-drop-box")){ChangeUserAction();}
TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="maxlimit"){html="You have reached the maximum number of saved items. Please remove some if you wish to add more.";Facebook.Confirmation_Error_Modal(html, "Oops!");TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="error_action_search"){width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this search was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_article"){width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this article was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_video"){width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this video was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action"){width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We were unable to complete your request. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_alert_listing"){}
else{html=AjaxResponse;tb_updateHTML(caption, html, width, height);}}
function SaveSearch(){if(IsAlreadySignedIn()){Facebook.ShareSearch(GetSearchLocation(), SEOSection)}
else{SaveSearchSubmit();}}
function SaveSearchSubmit(){var searchname="No Search Name";var isalert=false;if(gE("SearchName")!=undefined){if(gE("SearchName").value==""){gE("errmsg_savesearch").style.display="block"
$("#email_input").addClass("input-error");$("#modal").addClass("modal-error");gE("errmsg_savesearch").innerHTML="Please enter a search name";return false;}
if(gE("SearchName").value.indexOf("#&#")>-1){gE("errmsg_savesearch").style.display="block"
$("#email_input").addClass("input-error");$("#modal").addClass("modal-error");gE("errmsg_savesearch").innerHTML="The search name cannot contain an #&#. Please change your search name.";return false;}
else{gE("errmsg_savesearch").style.display="none"
searchname=gE("SearchName").value;}}
if(gE("EmailAlert")!=undefined){isalert=gE("EmailAlert").checked;}
var query="SearchName="+encodeURIComponent(searchname)+"&EmailAlert="+isalert+"&SearchQuery=";if(PageCache.SEOPath!=""){query+=encodeURIComponent(PageCache.SEOPath);}
else{query+=encodeURIComponent(PageCache.QueryString);}
query+='&PathInfo='+GetPageName();query+='&action=addsearch';query+='&bookmarkSection=search'
$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function UpdateSearchName(SearchId){if(gE("new_searchname_"+SearchId).value==""){gE("searchname_update_"+SearchId).innerHTML="The search title cannot be empty. Please enter a search title.";gE("searchname_update_"+SearchId).style.display='block';return false;}
if(gE("new_searchname_"+SearchId).value.indexOf("#&#")>-1){gE("searchname_update_"+SearchId).innerHTML="The search title cannot contain an #&#. Please change your search title.";gE("searchname_update_"+SearchId).style.display='block';return false;}
gE("searchname_update_"+SearchId).style.display='none';var newsearchname=gE("new_searchname_"+SearchId).value;var query="NewSearchName="+encodeURIComponent(newsearchname)+"&SearchId="+SearchId;query+='&PathInfo='+GetPageName()+'&action=updatesearchname';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query;$AJAX.GetForDelegate(Update_SearchNameDelegate, strURL);}
function Update_SearchNameDelegate(AjaxResponse){var searchId=AjaxResponse.split("::")[1];if(AjaxResponse.indexOf("success")>-1){gE("orig_searchname_"+searchId).innerHTML=gE("new_searchname_"+searchId).value;Show_EditTitle(searchId, false);}
else if(AjaxResponse.indexOf("error")>-1){gE("searchname_update_"+searchId).innerHTML="An unexpected error occured while trying to update your title. Please try again.";gE("searchname_update_"+searchId).style.display='block';}}
function CompleteSearchNameSubmit(){if(gE("SearchName").value==""){gE("errmsg_savesearch").innerHTML="The search title cannot be empty. Please enter a search title.";return false;}
if(gE("SearchName").value.indexOf("#&#")>-1){gE("errmsg_savesearch").innerHTML="The search name cannot contain an #&#. Please change your search name.";return false;}
var querystring="SearchName="+encodeURIComponent(gE("SearchName").value)+"&EmailAlert="+gE("EmailAlert").checked;querystring+='&PathInfo='+GetPageName()+'&action=completelastaction';$AJAX.GetForDelegate(CompleteLastActionDelegate,   PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}
function ForcedAddSearch(searchname, isalert){var query="SearchName="+encodeURIComponent(searchname)+"&EmailAlert="+isalert+"&SearchQuery=";if(PageCache.SEOPath!=""){query+=encodeURIComponent(PageCache.SEOPath);}
else{query+=encodeURIComponent(PageCache.QueryString);}
query+='&action=forcedaddsearch&PathInfo='+GetPageName();$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function RemoveThisarticle(articleId,articleName, IsPageRefresh){if(IsPageRefresh==undefined){IsPageRefresh=false;}
tb_showhtml('Remove Article', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=article&height=130&width=300&id="+articleId+"&IsPageRefresh="+IsPageRefresh+"&name="+articleName, false);}
function RemoveThisvideo(videoId,videoName,IsPageRefresh){if(IsPageRefresh==undefined){IsPageRefresh=false;}
tb_showhtml('Remove Video', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=video&height=130&width=300&id="+videoId+"&IsPageRefresh="+IsPageRefresh+"&name="+videoName, false);}
function RemoveThisSearch(searchId, SearchName,IsPageRefresh){if(IsPageRefresh==undefined){IsPageRefresh=false;}
tb_showhtml('Remove Search', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=search&height=130&width=300&id="+searchId+"&IsPageRefresh="+IsPageRefresh+"&name="+encodeURIComponent(SearchName), false);}
function RemoveAddAlert(searchId, isChecked){AddRemoveEmailAlert(searchId);}
function AddRemoveEmailAlert(Id){var querystring='Id='+Id+'&PathInfo='+GetPageName()+'&action=addremovealert';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring;$AJAX.GetAsync(strURL);}
function AddRemoveItemEmailAlert(IdItem, AlertChecked){var querystring='Id='+IdItem+'&EmailAlert='+AlertChecked+'&action=addremoveitemalert';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring;$AJAX.GetAsync(strURL);}
function RemoveItemFromList(Id, ItemType, IsPageRefresh){var querystring="Id="+Id+"&ItemType="+ItemType;querystring+='&PathInfo='+GetPageName()+'&action=removeitem&IsPageRefresh='+IsPageRefresh;$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring);}
function SuccessAction(IsPageRefresh){var url=window.location.href.split('?')[0];if(url.indexOf(PersonalizationRoot)>-1){window.location.reload(true);}
else{ChangeUserAction();}}
function CompleteUserAction(tc_pageurl, CheckSignIn){if(CheckSignIn==undefined){CheckSignIn=true;}
var IsSignedIn=true;if(CheckSignIn){IsSignedIn=IsAlreadySignedIn();}
if(window.location.href==tc_pageurl && IsSignedIn){if(readTempCookie("issignin")=="true"){SignInOrRegister="SignIn";}
else if(readTempCookie("issignin")=="false"){SignInOrRegister="Register";}
var querystring='action=completelastaction&PathInfo='+GetPageName()+'&NameCookie='+readTempCookie("iname");$AJAX.GetForDelegate(CompleteLastActionDelegate,   PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}}
function CompleteSearchUserAction(tc_pageurl){if(window.location.href==tc_pageurl && IsAlreadySignedIn()){if(readTempCookie("issignin")=="true"){SignInOrRegister="SignIn";Facebook.ShareSearch(GetSearchLocation(), SEOSection)}
else if(readTempCookie("issignin")=="false"){SignInOrRegister="Register";Facebook.ShareSearch(GetSearchLocation(), SEOSection)}}}
function CompleteBMPAction(tc_pageurl){if(window.location.href==tc_pageurl && IsAlreadySignedIn()){switch(getTempCookie("uact")){case "BMPViewList": Facebook.CompleteTempCAction("lastaction_bmpviewlist");break;case "BMPShare": Facebook.CompleteTempCAction("lastaction_bmpshare::"+getTempCookie("shrtype"));break;case "BMPZoneShare": Facebook.CompleteTempCAction("lastaction_bmpagentshare::"+getTempCookie("name")+"::"+getTempCookie("email"));break;}}}
function CompleteLastActionDelegate(AjaxResponse){var html="";var width=280;var height=185;if(AjaxResponse.indexOf("search_limit_exceeded")>-1){caption="Save Search";width=250;height=145;var params=AjaxResponse.split(":");var searchname="No Search Name";var emailalert=false;var address="";if(params.length>2){searchname=params[1].split("=")[1];emailalert=params[2].split("=")[1].toLowerCase();}
html='<div id="ten_searches">';html+='<p class="b">You\'ve reached the maximum of 10 saved searches.</p>';html+='<p>Do you want to remove the oldest saved search and save this search?</p>';html+='<div id="tb_tbns"><div id="ten_btns_wrapper"><input type="button" value="Save" class="save_search_btn" onclick="ForcedAddSearch(\''+searchname+'\','+emailalert+');" />';html+='<span class="or">OR</span><a href="javascript:void(0);" onclick="tb_remove();" class="not_save">Do Not Save</a></div></div></div>';}
else{var param=AjaxResponse.split("::");var actiontype=param[0].split("&")[0];if(actiontype=="type=search"){width=250;height=130;caption="Save Search";html='<div id="not_signedin_hdr" class="clearfix"><h2>Success!</h2></div>';html+='<div id="success_saved" class="clearfix">This search'+param[0].split("&")[1] ;if(SignInOrRegister=="Register"){html+='<p>Please check your e-mail for important<span class="b">MyFrontDoor</span>information.</p>';}}
else{caption="User Action";html='<div id="not_signedin_hdr" class="clearfix">';if(SignInOrRegister=="SignIn"){width=300;height=100;html+='<h2>Welcome Back!</h2><a href="javascript:void(0);" onclick="tb_remove();" class="close_tb">close</a></div>';html+='<div id="welcome_back">';}
else{html="<span>Thanks for registering!  Check your email for a confirmation of your registration.</span>";}
html+='<span class="b"><br/><br/>'+param[1]+' '+param[0].split("&")[1]+'</span>';}
ChangeUserAction();}
Facebook.Confirmation_Modal(html);window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
function RemoveLastAction(){$AJAX.GetAsync(PersonalizationRoot+"AjaxCalls/Personalization.aspx?action=removelastaction");}
function ReQuery(param_key, param_value){var url=window.location.href.split("?");if(url.length>1){var UGen=new UrlGen(url[1]);UGen.RemoveParam(param_key);UGen.AddParam(param_key, param_value);window.location.href=url[0]+"?"+UGen.ToString();}
else{window.location.href=url[0]+"?"+param_key+"="+param_value;}}
function GetPageName(){var url=window.location.href;if(url.indexOf("http://")>-1){url=url.substr(7);}
if(url.indexOf("#")>-1){var arr=url.split("#");url=window.location.hostname+arr[arr.length-1];}
return url;}
function MyPagingQuery(QueryString){window.location.href=window.location.href.split("?")[0]+"?"+QueryString;}
function GetSearchLocation(){var location="";var url=GetPageName().split('/');if(url.length==5 && IsNumeric(url[4])){location=(url[3]+" "+url[4]).toUpperCase();}
else{location=SearchCriteria;}
return escape(location);}
function LoadPageDefaults(){if(gE("email")!=undefined){gE("email").focus();}
if(gE("SearchName")!=undefined){gE("SearchName").focus();}
if(gE("Email_Add")!=undefined){gE("Email_Add").focus();}
if(gE("flName")!=undefined){gE("flName").focus();}};var scrippsEnvironment='PROD';function getDartEnterpriseUrl(adtype,pos){adtype=adtype.toUpperCase();var strUrl=MavenAd(adtype,'', 1);return strUrl;}
function setDartEnterpriseBanner(adType, sync_banner) {if(adType=='LEADERBOARD') {if($("#LEADERBOARD").length>0) {boxW=728;boxH=90;$("#LEADERBOARD").html("<iframe src='"+sync_banner+"\' width=\'"+boxW+"\' height=\'"+boxH+"\'"+"frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");}}else{if($("#BIGBOX").length>0) {boxW=300;boxH=250;if(sync_banner.indexOf("336x850")>-1) {boxW=336;boxH=850;} else if(sync_banner.indexOf("300x600")>-1)	{boxW=300;boxH=600;}
$("#BIGBOX").html("<iframe src='"+sync_banner+"\' width=\'"+boxW+"\' height=\'"+boxH+"\'"+"frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");}}
return;};function Parameter(){var parameters=new Object;this.addParameter=addParameter;this.getParameter=getParameter;this.getKeys=getKeys;function getKeys() {return parameters;}
function addParameter(key, value) {if(!parameters[key])
parameters[key]=new Array();parameters[key].push(value);}
function getParameter(key, separator) {if(!parameters[key])
return;return parameters[key].join(separator);}}
function MetaDataManager(){var m=new Parameter();this.addParameter=m.addParameter;this.getParameter=m.getParameter;this.getKeys=m.getKeys;this.getPageType=getPageType;this.getPageTitle=getPageTitle;this.getSite=getSite;this.getSctnId=getSctnId;this.getSctnName=getSctnName;this.getSponsorship=getSponsorship;this.getAbstract=getAbstract;this.getKeywords=getKeywords;this.getClassification=getClassification;this.getSctnDspName=getSctnDspName;this.getCategoryDspName=getCategoryDspName;this.getShowAbbr=getShowAbbr;this.getChefName=getChefName;this.getMealPart=getMealPart;this.getCusine=getCusine;this.getOccasion=getOccasion;this.getSpecialInterest=getSpecialInterest;this.getMainIngredient=getMainIngredient;this.getSeason=getSeason;this.getTechnique=getTechnique;this.getVodType=getVodType;this.getRole=getRole;this.getMultimediaFlag=getMultimediaFlag;this.setMultimediaFlag=setMultimediaFlag;this.getDetailId=getDetailId;this.getSearchTerm=getSearchTerm;this.getPageNumber=getPageNumber;this.getUniqueId=getUniqueId;this.getKeywords=getKeywords;this.getPageKeywords=getPageKeywords;this.getUserId=getUserId;this.getUserIdEmail=getUserIdEmail;this.getUserIdCreateDt=getUserIdCreateDt;this.getUserIdVersion=getUserIdVersion;this.getPageCompany=getPageCompany;this.getPageBroker=getPageBroker;this.getPageBrokerOffice=getPageBrokerOffice;this.getPagePageAgent=getPagePageAgent;this.getPageZipCode=getPageZipCode;function getUniqueId () {var vpn=this.getParameter("UniqueId"," ");if(vpn==null) {vpn="";}
return vpn;}
function getKeywords () {var keywords=this.getParameter("Keywords"," ");if(keywords==null) {keywords="";}
return keywords;}
function getPageKeywords () {var keywords=this.getParameter("PageKeywords"," ");if(keywords==null) {keywords="";}
return keywords;}
function getPageType () {var type=this.getParameter( "Type"," ");if(type==null) {type="";}
return type;}
function getPageTitle () {var title=this.getParameter( "Title"," ");if(title==null) {title="" ;}
return title;}
function getSite () {var site=this.getParameter("Site"," ");if(site==null) {site="" ;}
return site;}
function getSctnId () {var sctnId=this.getParameter("SctnId"," ");if(sctnId==null) {sctnId=0;}
return sctnId;}
function getSctnName () {var sctnName=this.getParameter("SctnName"," ");if(sctnName==null) {sctnName="";}
return sctnName;}
function getSponsorship () {var sponsor=this.getParameter("Sponsorship"," ");if(sponsor==null) {sponsor="";}
return sponsor;}
function getAbstract () {var abst=this.getParameter("Abstract"," ");if(abst==null) {abst="";}
return abst;}
function getKeywords () {var keywords=this.getParameter("Keywords"," ");if(keywords==null) {keywords="";}
return keywords;}
function getClassification () {var classification=this.getParameter("Classification"," ");if(classification==null) {classification="";}
return classification;}
function getSctnDspName () {var sctnDspName=this.getParameter("SctnDspName"," ");if(sctnDspName==null) {sctnDspName="";}
return sctnDspName;}
function getCategoryDspName () {var categoryDspName=this.getParameter("CategoryDspName"," ");if(categoryDspName==null) {categoryDspName="";}
return categoryDspName;}
function getShowAbbr () {var showAbbr=this.getParameter("Show_Abbr"," ");if(showAbbr==null) {showAbbr="";}
return showAbbr;}
function getMultimediaFlag () {var flag=this.getParameter("MultimediaFlag"," ");if(flag==null) {flag="";}
return flag;}
function setMultimediaFlag (flag) {if(flag!=null) {this.addParameter("MultimediaFlag",flag);}else{this.addParameter("MultimediaFlag","");}}
function  getChefName () {var chefName=this.getParameter("ChefName", " ");if(chefName==null) {chefName="";}
return chefName;}
function getMealPart () {var mealPart=this.getParameter("MealPart", " ");if(mealPart==null) {mealPart="";}
return mealPart;}
function getCusine () {var cusine=this.getParameter("Cusine", " ");if(cusine==null) {cusine="";}
return cusine;}
function getOccasion () {var occasion=this.getParameter("Occasion", " ");if(occasion==null) {occasion="";}
return occasion;}
function getSpecialInterest () {var special=this.getParameter("SpecialInterest"," ");if(special==null) {special="";}
return special;}
function getMainIngredient () {var mainIngredient=this.getParameter("MainIngredient"," ");if(mainIngredient==null) {mainIngredient="";}
return mainIngredient;}
function getSeason () {var season=this.getParameter("Season", " ");if(season==null) {season="";}
return season;}
function getTechnique () {var technique=this.getParameter( "Season", " ");if(technique==null) {technique="";}
return technique;}
function getVodType () {var vtype=this.getParameter("VodType"," ");if(vtype==null) {vtype="";}
return vtype;}
function getRole () {var vrole=this.getParameter("Role"," ");if(vrole==null) {vrole="";}
return vrole;}
function getDetailId () {var vdid=this.getParameter("DetailId"," ");if(vdid==null) {vdid="";}
return vdid;}
function getPageNumber () {var vpn=this.getParameter("PageNumber"," ");if(vpn==null) {vpn="";}
return vpn;}
function getUniqueId () {var vpn=this.getParameter("UniqueId"," ");if(vpn==null) {vpn="";}
return vpn;}
function getUserId () {var uId=this.getParameter("UserId"," ");if(uId==null) {uId="";}
return uId;}
function getUserIdEmail () {var eId=this.getParameter("UserIdEmail"," ");if(eId==null) {eId="";}
return eId;}
function getUserIdCreateDt () {var uCdt=this.getParameter("UserIdCreateDt"," ");if(uCdt==null) {uCdt="";}
return uCdt;}
function getUserIdVersion () {var uVer=this.getParameter("UserIdVersion"," ");if(uVer==null) {uVer="";}
return uVer;}
function getSearchTerm () {var args=parseQueryString ();for (var arg in args) {var s=arg.toUpperCase();if( s=='SEARCHSTRING'){return args[arg];}}
return "";}
function getPageCompany () {var PageCompany=this.getParameter("Company"," ");if(PageCompany==null) {PageCompany="";}
return PageCompany;}
function getPageBroker () {var PageBroker=this.getParameter("Broker"," ");if(PageBroker==null) {PageBroker="";}
return PageBroker;}
function getPageBrokerOffice () {var BrokerOffice=this.getParameter("Office"," ");if(BrokerOffice==null) {BrokerOffice="";}
return BrokerOffice;}
function getPagePageAgent () {var PagePageAgent=this.getParameter("Agent"," ");if(PagePageAgent==null) {PagePageAgent="";}
return PagePageAgent;}
function getPageZipCode () {var ZipCode=this.getParameter("ZipCode"," ");if(ZipCode==null) {ZipCode="";}
return ZipCode;}
function parseQueryString (str) {str=str ? str : document.location.search;var query=str.charAt(0)=='?' ? str.substring(1) : str;var args=new Object();if(query) {var fields=query.split('&');for (var f=0; f<fields.length; f++) {var field=fields[f].split('=');args[unescape(field[0].replace(/\+/g, ' '))]=unescape(field[1].replace(/\+/g, ' '));}}
return args;}}
function getFilters () {var keywords=this.getParameter("Filters"," ");if(filters==null) {filters="";}
return filters;};var _uacct="";var _userv=0;var _ufsc=1;var _udn="auto";var _uhash="on";var _utimeout="1800";var _ugifpath="http://static-img.frontdoor.com/utm/__utm.gif";var _utsp="|";var _uflash=1;var _utitle=1;var _uctm=1;var _ucto="15768000";var _uccn="utm_campaign";var _ucmd="utm_medium";var _ucsr="utm_source";var _uctr="utm_term";var _ucct="utm_content";var _ucid="utm_id";var _ucno="utm_nooverride";var _uOsr=new Array();var _uOkw=new Array();_uOsr[0]="google";	_uOkw[0]="q";_uOsr[1]="yahoo";	_uOkw[1]="p";_uOsr[2]="msn";		_uOkw[2]="q";_uOsr[3]="aol";		_uOkw[3]="query";_uOsr[4]="lycos";	_uOkw[4]="query";_uOsr[5]="ask";		_uOkw[5]="q";_uOsr[6]="altavista";	_uOkw[6]="q";_uOsr[7]="search";	_uOkw[7]="q";_uOsr[8]="netscape";	_uOkw[8]="query";_uOsr[9]="earthlink";	_uOkw[9]="q";_uOsr[10]="cnn";	_uOkw[10]="query";_uOsr[11]="looksmart";	_uOkw[11]="key";_uOsr[12]="about";	_uOkw[12]="terms";_uOsr[13]="excite";	_uOkw[13]="qkw";_uOsr[14]="mamma";	_uOkw[14]="query";_uOsr[15]="alltheweb";	_uOkw[15]="q";_uOsr[16]="gigablast";	_uOkw[16]="q";_uOsr[17]="voila";	_uOkw[17]="kw";_uOsr[18]="virgilio";	_uOkw[18]="qs";_uOsr[19]="teoma";	_uOkw[19]="q";var _uOno=new Array();var _uRno=new Array();var _uff,_udh,_udt,_udo="",_uu,_ufns=0,_uns=0,_ur="-",_ufno=0,_ust=0,_ujv="-",_ubd=document,_udl=_ubd.location,_uwv="6.1";var _ugifpath2="http://service.urchin.com/__utm.gif";if(_udl.protocol=="https:") _ugifpath2="https://service.urchin.com/__utm.gif";function urchinTracker(page) {if(_udl.protocol=="file:") return;if(_uff && (!page||page=="")) return;var a,b,c,v,x="",s="",f=0;var nx=" expires=Sun, 18 Jan 2038 00:00:00 GMT;";var dc=_ubd.cookie;_udh=_uDomain();_uu=Math.round(Math.random()*2147483647);_udt=new Date();_ust=Math.round(_udt.getTime()/1000);a=dc.indexOf("__utma="+_udh);b=dc.indexOf("__utmb="+_udh);c=dc.indexOf("__utmc="+_udh);if(_udn && _udn!="") { _udo=" domain="+_udn+";"; }
if(_utimeout && _utimeout!="") {x=new Date(_udt.getTime()+(_utimeout*1000));x=" expires="+x.toGMTString()+";";}
s=_udl.search;if(s && s!="" && s.indexOf("__utma=")>=0) {a=_uGC(s,"__utma=","&");b=_uGC(s,"__utmb=","&");c=_uGC(s,"__utmc=","&");if(a!="-" && b!="-" && c!="-") f=1;else if(a!="-") f=2;}
if(f==1) {_ubd.cookie="__utma="+a+"; path=/;"+nx;_ubd.cookie="__utmb="+b+"; path=/;"+x;_ubd.cookie="__utmc="+c+"; path=/;";} else if(f==2) {a=_uFixA(s,"&",_ust);_ubd.cookie="__utma="+a+"; path=/;"+nx;_ubd.cookie="__utmb="+_udh+"; path=/;"+x;_ubd.cookie="__utmc="+_udh+"; path=/;";_ufns=1;} else if(a>=0 && b>=0 && c>=0) {_ubd.cookie="__utmb="+_udh+"; path=/;"+x+_udo;}else{if(a>=0) a=_uFixA(_ubd.cookie,";",_ust);else a=_udh+"."+_uu+"."+_ust+"."+_ust+"."+_ust+".1";_ubd.cookie="__utma="+a+"; path=/;"+nx+_udo;_ubd.cookie="__utmb="+_udh+"; path=/;"+x+_udo;_ubd.cookie="__utmc="+_udh+"; path=/;"+_udo;_ufns=1;}
if(s && s!="" && s.indexOf("__utmv=")>=0) {if((v=_uGC(s,"__utmv=","&"))!="-") {_ubd.cookie="__utmv="+unescape(v)+"; path=/;"+nx+_udo;}}
_uInfo(page);_ufns=0;_ufno=0;_uff=1;}
urchinTracker();function _uInfo(page) {var p,s="",pg=_udl.pathname+_udl.search;if(page && page!="") pg=escape(page);_ur=_ubd.referrer;if(!_ur||_ur=="") { _ur="-"; }else{p=_ur.indexOf(_ubd.domain);if((p>=0) && (p<=8)) { _ur="0"; }
if(_ur.indexOf("[")==0 && _ur.lastIndexOf("]")==(_ur.length-1)) { _ur="-"; }}
s+="&utmn="+_uu;if(_ufsc) s+=_uBInfo(page);if(_uctm && (!page||page=="")) s+=_uCInfo();if(_utitle && _ubd.title && _ubd.title!="") s+="&utmdt="+escape(_ubd.title);if(_udl.hostname && _udl.hostname!="") s+="&utmhn="+escape(_udl.hostname);if(!page||page=="") s+="&utmr="+_ur;s+="&utmp="+pg;if(_userv==0||_userv==2) {var i=new Image(1,1);i.src=_ugifpath+"?"+"utmwv="+_uwv+s;i.onload=function() {_uVoid();}}
if(_userv==1||_userv==2) {var i2=new Image(1,1);i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();i2.onload=function() { _uVoid(); }}
return;}
function _uVoid() { return; }
function _uCInfo() {if(!_ucto||_ucto=="") { _ucto="15768000"; }
var c="",t="-",t2="-",o=0,cs=0,cn=0;i=0;var s=_udl.search;var z=_uGC(s,"__utmz=","&");var x=new Date(_udt.getTime()+(_ucto*1000));var dc=_ubd.cookie;x=" expires="+x.toGMTString()+";";if(z!="-") { _ubd.cookie="__utmz="+unescape(z)+"; path=/;"+x+_udo; return ""; }
z=dc.indexOf("__utmz="+_udh);if(z>-1) { z=_uGC(dc,"__utmz="+_udh,";"); }else{ z="-"; }
t=_uGC(s,_ucid+"=","&");t2=_uGC(s,_ucsr+"=","&");if((t!="-" && t!="")||(t2!="-" && t2!="")) {if(t!="-" && t!="") { c+="utmcid="+_uEC(t); if(t2!="-" && t2!="") c+="|utmcsr="+_uEC(t2);}else{ if(t2!="-" && t2!="") c+="utmcsr="+_uEC(t2); }
t=_uGC(s,_uccn+"=","&");if(t!="-" && t!="") c+="|utmccn="+_uEC(t);else c+="|utmccn=(not+set)";t=_uGC(s,_ucmd+"=","&");if(t!="-" && t!="") c+="|utmcmd="+_uEC(t);else  c+="|utmcmd=(not+set)";t=_uGC(s,_uctr+"=","&");if(t!="-" && t!="") c+="|utmctr="+_uEC(t);else { t=_uOrg(1); if(t!="-" && t!="") c+="|utmctr="+_uEC(t); }
t=_uGC(s,_ucct+"=","&");if(t!="-" && t!="") c+="|utmcct="+_uEC(t);t=_uGC(s,_ucno+"=","&");if(t=="1") o=1;if(z!="-" && o==1) return "";}
if(c=="-"||c=="") { c=_uOrg(); if(z!="-" && _ufno==1)  return ""; }
if(c=="-"||c=="") { if(_ufns==1)  c=_uRef(); if(z!="-" && _ufno==1)  return ""; }
if(c=="-"||c=="") {if(z=="-" && _ufns==1) { c="utmccn=(direct)|utmcsr=(direct)|utmcmd=(none)"; }
if(c=="-"||c=="") return "";}
if(z!="-") {i=z.indexOf(".");if(i>-1) i=z.indexOf(".",i+1);if(i>-1) i=z.indexOf(".",i+1);if(i>-1) i=z.indexOf(".",i+1);t=z.substring(i+1,z.length);if(t.toLowerCase()==c.toLowerCase()) cs=1;t=z.substring(0,i);if((i=t.lastIndexOf("."))>-1) {t=t.substring(i+1,t.length);cn=(t*1);}}
if(cs==0||_ufns==1) {t=_uGC(dc,"__utma="+_udh,";");if((i=t.lastIndexOf("."))>9) {_uns=t.substring(i+1,t.length);_uns=(_uns*1);}
cn++;if(_uns==0) _uns=1;_ubd.cookie="__utmz="+_udh+"."+_ust+"."+_uns+"."+cn+"."+c+"; path=/; "+x+_udo;}
if(cs==0||_ufns==1) return "&utmcn=1";else return "&utmcr=1";}
function _uRef() {if(_ur=="0"||_ur==""||_ur=="-") return "";var i=0,h,k,n;if((i=_ur.indexOf("://"))<0) return "";h=_ur.substring(i+3,_ur.length);if(h.indexOf("/")>-1) {k=h.substring(h.indexOf("/"),h.length);if(k.indexOf("?")>-1) k=k.substring(0,k.indexOf("?"));h=h.substring(0,h.indexOf("/"));}
h=h.toLowerCase();n=h;if((i=n.indexOf(":"))>-1) n=n.substring(0,i);for (var ii=0;ii<_uRno.length;ii++) {if((i=n.indexOf(_uRno[ii].toLowerCase()))>-1 && n.length==(i+_uRno[ii].length)) { _ufno=1; break; }}
if(h.indexOf("www.")==0) h=h.substring(4,h.length);return "utmccn=(referral)|utmcsr="+_uEC(h)+"|"+"utmcct="+_uEC(k)+"|utmcmd=referral";}
function _uOrg(t) {if(_ur=="0"||_ur==""||_ur=="-") return "";var i=0,h,k;if((i=_ur.indexOf("://"))<0) return "";h=_ur.substring(i+3,_ur.length);if(h.indexOf("/")>-1) {h=h.substring(0,h.indexOf("/"));}
for (var ii=0;ii<_uOsr.length;ii++) {if(h.indexOf(_uOsr[ii])>-1) {if((i=_ur.indexOf("?"+_uOkw[ii]+"="))>-1||(i=_ur.indexOf("&"+_uOkw[ii]+"="))>-1) {k=_ur.substring(i+_uOkw[ii].length+2,_ur.length);if((i=k.indexOf("&"))>-1) k=k.substring(0,i);for (var yy=0;yy<_uOno.length;yy++) {if(_uOno[yy].toLowerCase()==k.toLowerCase()) { _ufno=1; break; }}
if(t) return _uEC(k);else return "utmccn=(organic)|utmcsr="+_uEC(_uOsr[ii])+"|"+"utmctr="+_uEC(k)+"|utmcmd=organic";}}}
return "";}
function _uBInfo(page) {var sr="-",sc="-",ul="-",fl="-",je=1;var n=navigator;if(self.screen) {sr=screen.width+"x"+screen.height;sc=screen.colorDepth+"-bit";} else if(self.java) {var j=java.awt.Toolkit.getDefaultToolkit();var s=j.getScreenSize();sr=s.width+"x"+s.height;}
if(_ujv=="-" && (!page||page=="")) {for (var i=5;i>=0;i--) {var t="<script language='JavaScript1."+i+"'>_ujv='1."+i+"';</script>";_ubd.write(t);if(_ujv!="-") break;}}
if(n.language) { ul=n.language.toLowerCase(); }
else if(n.browserLanguage) { ul=n.browserLanguage.toLowerCase(); }
je=n.javaEnabled()?1:0;if(_uflash) fl=_uFlash();return "&utmsr="+sr+"&utmsc="+sc+"&utmul="+ul+"&utmje="+je+"&utmjv="+_ujv+"&utmfl="+fl;}
function __utmSetTrans() {var e;if(_ubd.getElementById) e=_ubd.getElementById("utmtrans");else if(_ubd.utmform && _ubd.utmform.utmtrans) e=_ubd.utmform.utmtrans;if(!e) return;var l=e.value.split("UTM:");var i,i2,c;if(_userv==0||_userv==2) i=new Array();if(_userv==1||_userv==2) { i2=new Array(); c=_uGCS(); }
for (var ii=0;ii<l.length;ii++) {l[ii]=_uTrim(l[ii]);if(l[ii].charAt(0)!='T' && l[ii].charAt(0)!='I') continue;var r=Math.round(Math.random()*2147483647);if(!_utsp||_utsp=="") _utsp="|";var f=l[ii].split(_utsp),s="";if(f[0].charAt(0)=='T') {s="&utmt=tran"+"&utmn="+r;f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+escape(f[1]);f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmtst="+escape(f[2]);f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmtto="+escape(f[3]);f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmttx="+escape(f[4]);f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmtsp="+escape(f[5]);f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmtci="+escape(f[6]);f[7]=_uTrim(f[7]); if(f[7]&&f[7]!="") s+="&utmtrg="+escape(f[7]);f[8]=_uTrim(f[8]); if(f[8]&&f[8]!="") s+="&utmtco="+escape(f[8]);}else{s="&utmt=item"+"&utmn="+r;f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+escape(f[1]);f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmipc="+escape(f[2]);f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmipn="+escape(f[3]);f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmiva="+escape(f[4]);f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmipr="+escape(f[5]);f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmiqt="+escape(f[6]);}
if(_userv==0||_userv==2) {i[ii]=new Image(1,1);i[ii].src=_ugifpath+"?"+"utmwv="+_uwv+s;i[ii].onload=function() { _uVoid(); }}
if(_userv==1||_userv==2) {i2[ii]=new Image(1,1);i2[ii].src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+c;i2[ii].onload=function() { _uVoid(); }}}
return;}
function _uFlash() {var f="-",n=navigator;if(n.plugins && n.plugins.length) {for (var ii=0;ii<n.plugins.length;ii++) {if(n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {f=n.plugins[ii].description.split('Shockwave Flash ')[1];break;}}} else if(window.ActiveXObject) {for (var ii=10;ii>=2;ii--) {try {var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");if(fl) { f=ii+'.0'; break; }}
catch(e) {}}}
return f;}
function __utmLinker(l) {var p,a="-",b="-",c="-",z="-",v="-";var dc=_ubd.cookie;if(l && l!="") {if(dc) {a=_uGC(dc,"__utma="+_udh,";");b=_uGC(dc,"__utmb="+_udh,";");c=_uGC(dc,"__utmc="+_udh,";");z=_uGC(dc,"__utmz="+_udh,";");v=_uGC(dc,"__utmv="+_udh,";");p="__utma="+a+"&__utmb="+b+"&__utmc="+c+"&__utmz="+escape(z)+"&__utmv="+escape(v);}
if(p) {if(l.indexOf("?")<=-1) { document.location=l+"?"+p; }else{ document.location=l+"&"+p; }}else{ document.location=l; }}}
function __utmLinkPost(f) {var p,a="-",b="-",c="-",z="-",v="-";var dc=_ubd.cookie;if(!f||!f.action) return;if(dc) {a=_uGC(dc,"__utma="+_udh,";");b=_uGC(dc,"__utmb="+_udh,";");c=_uGC(dc,"__utmc="+_udh,";");z=_uGC(dc,"__utmz="+_udh,";");v=_uGC(dc,"__utmv="+_udh,";");p="__utma="+a+"&__utmb="+b+"&__utmc="+c+"&__utmz="+escape(z)+"&__utmv="+escape(v);}
if(p) {if(f.action.indexOf("?")<=-1) f.action+="?"+p;else f.action+="&"+p;}
return;}
function __utmSetVar(v) {if(!v||v=="") return;var r=Math.round(Math.random() * 2147483647);_ubd.cookie="__utmv="+_udh+"."+escape(v)+"; path=/; expires=Sun, 18 Jan 2038 00:00:00 GMT;"+_udo;var s="&utmt=var&utmn="+r;if(_userv==0||_userv==2) {var i=new Image(1,1);i.src=_ugifpath+"?"+"utmwv="+_uwv+s;i.onload=function() { _uVoid(); }}
if(_userv==1||_userv==2) {var i2=new Image(1,1);i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();i2.onload=function() { _uVoid(); }}}
function _uGCS() {var t,c="",dc=_ubd.cookie;if((t=_uGC(dc,"__utma="+_udh,";"))!="-") c+=escape("__utma="+t+";+");if((t=_uGC(dc,"__utmb="+_udh,";"))!="-") c+=escape("__utmb="+t+";+");if((t=_uGC(dc,"__utmc="+_udh,";"))!="-") c+=escape("__utmc="+t+";+");if((t=_uGC(dc,"__utmz="+_udh,";"))!="-") c+=escape("__utmz="+t+";+");if((t=_uGC(dc,"__utmv="+_udh,";"))!="-") c+=escape("__utmv="+t+";");if(c.charAt(c.length-1)=="+") c=c.substring(0,c.length-1);return c;}
function _uGC(l,n,s) {if(!l||l==""||!n||n==""||!s||s=="") return "-";var i,i2,i3,c="-";i=l.indexOf(n);i3=n.indexOf("=")+1;if(i>-1) {i2=l.indexOf(s,i); if(i2<0) { i2=l.length; }
c=l.substring((i+i3),i2);}
return c;}
function _uDomain() {if(!_udn||_udn==""||_udn=="none") { _udn=""; return 1; }
if(_udn=="auto") {var d=_ubd.domain;if(d.substring(0,4)=="www.") {d=d.substring(4,d.length);}
_udn=d;}
if(_uhash=="off") return 1;return _uHash(_udn);}
function _uHash(d) {if(!d||d=="") return 1;var h=0,g=0;for (var i=d.length-1;i>=0;i--) {var c=parseInt(d.charCodeAt(i));h=((h<<6) & 0xfffffff)+c+(c<<14);if((g=h & 0xfe00000)!=0) h=(h ^ (g>>21));}
return h;}
function _uFixA(c,s,t) {if(!c||c==""||!s||s==""||!t||t=="") return "-";var a=_uGC(c,"__utma="+_udh,s);var lt=0,i=0;if((i=a.lastIndexOf("."))>9) {_uns=a.substring(i+1,a.length);_uns=(_uns*1)+1;a=a.substring(0,i);if((i=a.lastIndexOf("."))>7) {lt=a.substring(i+1,a.length);a=a.substring(0,i);}
if((i=a.lastIndexOf("."))>5) {a=a.substring(0,i);}
a+="."+lt+"."+t+"."+_uns;}
return a;}
function _uTrim(s) {if(!s||s=="") return "";while ((s.charAt(0)==' ')||(s.charAt(0)=='\n')||(s.charAt(0,1)=='\r')) s=s.substring(1,s.length);while ((s.charAt(s.length-1)==' ')||(s.charAt(s.length-1)=='\n')||(s.charAt(s.length-1)=='\r')) s=s.substring(0,s.length-1);return s;}
function _uEC(s) {var n="";if(!s||s=="") return "";for (var i=0;i<s.length;i++) {if(s.charAt(i)==" ") n+="+"; else n+=s.charAt(i);}
return n;}
function __utmVisitorCode() {var r=0,t=0,i=0,i2=0,m=31;var a=_uGC(_ubd.cookie,"__utma="+_udh,";");if((i=a.indexOf(".",0))<0) return;if((i2=a.indexOf(".",i+1))>0) r=a.substring(i+1,i2); else return "";if((i=a.indexOf(".",i2+1))>0) t=a.substring(i2+1,i); else return "";var c=new Array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9');return c[r>>28&m]+c[r>>23&m]+c[r>>18&m]+c[r>>13&m]+"-"+c[r>>8&m]+c[r>>3&m]+c[((r&7)<<2)+(t>>30&3)]+c[t>>25&m]+c[t>>20&m]+"-"+c[t>>15&m]+c[t>>10&m]+c[t>>5&m]+c[t&m];};document.debug=0;document.deferAds=0;document.usemetadataManager=1;var adServer='http://devadsremote.scrippsnetworks.com';if(window.location.href.indexOf('frontdoor.com')>-1){adServer='http://adsremote.scrippsnetworks.com';}
function initAdManager(am) {var ranNum=String(Math.round(Math.random()*10000000000));var now=new Date();var ad_ord=now.getTime()%10000000000;if(document.usemetadataManager==1 && "mdManager" in window) {var amPageType=mdManager.getPageType() ;var amSponsorship=mdManager.getSponsorship();var amKeywords=mdManager.getKeywords();var amPageKeywords=mdManager.getPageKeywords();amPageType=amPageType.replace(/-/g , "_");var amUniqueId=mdManager.getUniqueId();amUniqueId=amUniqueId.replace(/-/g , "_");if(amSponsorship!="" && amSponsorship!=undefined) {amSponsorship=amSponsorship.replace(/-/g , "_");amSponsorship=amSponsorship.replace(/ /g , "_");}
if(amKeywords!="" && amKeywords!=undefined) {}
if(amKeywords!="" && amKeywords!=undefined) {amKeywords=amKeywords.replace(/ /g , "_");amKeywords=amKeywords.replace(/-/g , "_");var amKeywords=amKeywords.split(",");var keygroup='';if(amKeywords!="" | amKeywords!="null"){for(i=0; i<amKeywords.length; i++) {key=(amKeywords[i]);keyword1=('keyword='+key);keygroup=keygroup+'&'+keyword1;}
amKeywords=keygroup;}}
amSctns=mdManager.getClassification();amSctns=amSctns.split(",");if(amSctns.length>1) {for (var i=0; i<amSctns.length; i++) {if(i==(amSctns.length-1)) {am.addParameter("sitesection", amSctns[i]);} else if(i==(amSctns.length-2)) {am.addParameter("category", amSctns[i]);} else if(i==(amSctns.length-3)) {am.addParameter("vgncontent", amSctns[i]);}else{am.addParameter("SUBSECTION", amSctns[i]);}}}else{var c=mdManager.getClassification();am.addParameter("category", c);}
if(amPageType=='SECTION') {if(!am.getParameter("vgncontent", " ")) {am.addParameter("page", "MAIN");}}
var s=mdManager.getSite();am.addParameter("site",s);var gsId=mdManager.getSctnId();am.addParameter("tile", ranNum+gsId);am.addParameter("ord", ad_ord);am.addParameter("topic", amSponsorship);am.addParameter("keyword", amKeywords);am.addParameter("keyword", amPageKeywords);am.addParameter("pagetype", amPageType);am.addParameter("uniqueid", amUniqueId);var sId=mdManager.getSctnId();am.addParameter("SECTION_ID", sId);am.addParameter("Company", document.globalPageCompany);am.addParameter("Broker", document.globalPageBroker);am.addParameter("Office", document.globalPageBrokerOffice);am.addParameter("Agent", document.globalPagePageAgent);am.addParameter("ZipCode", document.globalPageZipCode);am.addParameter("home_age", document.globalPageHomeAge);}else{var amPageType=document.globalPageType;var amSponsorship=document.globalPageSponsorship;amPageType=amPageType.replace(/-/g , "_");if(amSponsorship!="" && amSponsorship!=undefined) {amSponsorship=amSponsorship.replace(/-/g , "_");amSponsorship=amSponsorship.replace(/ /g , "_");}
amSctns=document.globalSctnLineage.split(",");if(amSctns.length>1) {for (var i=0; i<amSctns.length; i++) {if(i==(amSctns.length-1)) {am.addParameter("sitesection", amSctns[i]);} else if(i==(amSctns.length-2)) {am.addParameter("category", amSctns[i]);} else if(i==(amSctns.length-3)) {am.addParameter("vgncontent", amSctns[i]);}else{am.addParameter("SUBSECTION", amSctns[i]);}}}else{am.addParameter("category", document.globalSctnLineage);}
if(amPageType=='SECTION') {if(!am.getParameter("vgncontent", " ")) {am.addParameter("page", "MAIN");}}
am.addParameter("site", document.globalPageSite);am.addParameter("tile", ranNum+document.globalPageSctnId);am.addParameter("ord", ad_ord);am.addParameter("topic", amSponsorship);am.addParameter("pagetype", amPageType);am.addParameter("SECTION_ID", document.PageSctnId);am.addParameter("Company", document.adtag_globalPageCompany);am.addParameter("Broker", document.adtag_globalPageBroker);am.addParameter("Office", document.adtag_globalPageBrokerOffice);am.addParameter("Agent", document.adtag_globalPageAgent);am.addParameter("ZipCode", document.adtag_globalPageZipCode);am.addParameter("home_age", document.adtag_globalPageHomeAge);}}
function DoorAd(adtype, adsize, pos, defer, style) {var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");if(adtype!=''){if(adtype=='UNSIZED_AD' && pos==1)
ad.addParameter("adtype", "TOWER");else if((adtype=='UNSIZED_AD' && pos==5)||(adtype=='UNSIZED_AD' && pos==6))
ad.addParameter("adtype", "BIGBOX");else
ad.addParameter("adtype", adtype);if(adtype=='LEADERBOARD')
ad.addParameter("Params.styles", "SNI_LEADERBOARD");}
if(pos!='')
ad.addParameter("PagePos", pos);if(adsize!='')
ad.addParameter("adsize", adsize);if(defer==1)
ad.deferrable=1;if(style!='')
ad.adClass=style;ad.useFeature("tile");adManager.createAd(ad);}
function SmartBubbleAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('SMART_BUBBLE', '180x50',  pos);}
function RichMediaAd(adtype, adsize, pos) {var ad=new DartAd();ad.addParameter("adtype", adtype);ad.addParameter("adsize", adsize);ad.addParameter("PagePos", pos);ad.useFeature("tile");ad.setUrl(adServer+"/js.ng/");adManager.createAd(ad);}
function VswAd(pos) {DoorAd('VSW', '',  pos);}
function LeaderboardAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('LEADERBOARD', '468x60',  pos);}
function GoogleAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('GOOGLE', '', pos);}
function SuperstitialAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('SUPERSTITIAL', '', pos);}
function RichMedia120X160Ad(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '120x600', pos);}
function RichMedia240X400Ad(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '240x400', pos);}
function Ad120X90(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '120x90', pos);}
function Ad120X60(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '120x60', pos);}
function Ad120X240(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '120x240', pos);}
function Ad468X60(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('', '468x60', pos);}
function BigBox(pos){UnsizedAd(pos);}
function UnsizedAd(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");if(pos==1)
ad.addParameter("adtype", "TOWER");else if(pos==5||pos==6)
ad.addParameter("adtype", "BIGBOX");else
ad.addParameter("adtype", "UNSIZED_AD");ad.addParameter("PagePos", pos);ad.useFeature("tile");ad.addParameter("Params.styles", "img_sponsor,html_sponsor");ad.adClass='UnsizedAd'
adManager.createAd(ad);}
function BigBox(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");if(pos==1)
ad.addParameter("adtype", "TOWER");else if(pos==5||pos==6)
ad.addParameter("adtype", "BIGBOX");else
ad.addParameter("adtype", "UNSIZED_AD");ad.addParameter("PagePos", pos);ad.useFeature("tile");ad.addParameter("Params.styles", "img_sponsor,html_sponsor");ad.adClass='UnsizedAd'
adManager.createAd(ad);}
function CityPageSponsor(location) {if(location!="") {var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "LOGO");ad.addParameter("logo", location);ad.useFeature("tile");ad.adClass='UnsizedAd'
adManager.createAd(ad);}}
function Ad120X600(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("PagePos", pos);ad.useFeature("tile");ad.addParameter("Params.styles", "img_sponsor,html_sponsor");ad.addParameter("adsize", "120x600");ad.addParameter("adtype", "UNSIZED_AD");adManager.createAd(ad);}
function Ad160X600(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('UNSIZED_AD', '160x600', pos);}
function Ad300X250(pos) {var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "BIGBOX");ad.addParameter("PagePos", "5");ad.useFeature("tile");ad.addParameter("Params.styles", "img_sponsor,html_sponsor");ad.adClass="Ad300x250";adManager.createAd(ad);}
function TopJobsAd(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.addParameter("Section","top_jobs");ad.addParameter("params.richmedia", "yes");ad.addParameter("PagePos", pos);ad.setUrl(adServer+"/js.ng/");ad.useFeature("tile");adManager.createAd(ad);}
function SearchAd(pos, keywords) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.addParameter("Section","top_jobs");ad.addParameter("params.richmedia", "yes");ad.addParameter("PagePos", pos);ad.setUrl(adServer+"/js.ng/");ad.useFeature("tile");adManager.createAd(ad);}
function WDSuperstitialAd(pos, keywords) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "SUPERSTITIAL");ad.addParameter("adsize", "");ad.addParameter("PagePos", pos);var words=keywords.split(" ");for(i=0; i<words.length; i++) {ad.addParameter("keyword", words[i]);}
ad.useFeature("tile");adManager.createAd(ad);}
function WDSiteSearchAd(pos, keywords) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "SITE_SEARCH");ad.addParameter("adsize", "");ad.addParameter("PagePos", pos);var words=keywords.split(" ");for(i=0; i<words.length; i++) {ad.addParameter("keyword", words[i]);}
ad.useFeature("tile");adManager.createAd(ad);}
function WDUnsizedAd(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "UNSIZED_AD");ad.addParameter("adsize", "");ad.addParameter("PagePos", pos);ad.useFeature("tile");adManager.createAd(ad);}
function WDUnsizedAdWithParamsStyles(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "UNSIZED_AD");ad.addParameter("adsize", "");ad.addParameter("Params.styles", "img_sponsor,html_sponsor");ad.addParameter("PagePos", pos);ad.useFeature("tile");adManager.createAd(ad);}
function WDUnsizedProductAd(pos) {if(pos<0||pos==undefined)
pos=1;var ad=new DartAd();ad.setUrl(adServer+"/js.ng/");ad.addParameter("adtype", "UNSIZED_AD_PRODUCT");ad.addParameter("adsize", "");ad.addParameter("PagePos", pos);ad.useFeature("tile");adManager.createAd(ad);}
function WDSuperstitialAdAds(keywords) {WDSuperstitialAd(1, keywords)
WDSuperstitialAd(2, keywords)}
function PrestitialPreAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('PRESTITIAL', '', pos);}
function PrestitialAd(pos) {if(pos<0||pos==undefined)
pos=1;DoorAd('ADPAGE', '', pos);}
var preintCookieName="preinterstitial";var cookielife=1;function packQS() {var qs="ai='"+document.globalPageSite+"!"+document.globalPageSctnName+"!"+document.globalPageSctnId+"!"+document.globalPageType+"!"+document.globalPageSponsorship+"!"+document.globalSctnLineage+"'";return qs;}
function unpackQS() {qsArray=window.location.search.split("!");document.globalPageSite="DOOR"
document.globalPageSctnName=qsArray[1];document.globalPageSctnId=qsArray[2];document.globalPageType=qsArray[3];document.globalPageSponsorship=qsArray[4];document.globalSctnLineage=qsArray[5];}
function invokePrestitialAd() {pa_SetupAd("preinterstitial");}
function pa_expTime(noDays){var today=new Date();var expr=new Date(today.getTime()+noDays * 24 * 60 * 60 *1000);expr.setHours(0);expr.setMinutes(0);return  expr.toString();}
function pa_validateAd (){var idxresult=document.cookie.indexOf(preintCookieName);if(idxresult==-1){return 0;} else{return 1;}}
function pa_SetupAd(pa_cookieName){var tko=document.cookie.indexOf(pa_cookieName);if(tko==-1){document.cookie=preintCookieName+"=yes; expires="+pa_expTime(cookielife);if(pa_validateAd())
window.location=pa_getAdPageURL();}}
function MavenAd(adtype, adsize, pos) {var ad=new AdUrl();if(scrippsEnvironment=='STAGING')
ad.setUrl("http://devadsremote.scrippsnetworks.com/html.ng/");else
ad.setUrl(adServer+"/html.ng/");if(adtype!='')
ad.addParameter("adtype", adtype);if(adsize!='')
ad.addParameter("adsize", adsize);if(pos!='')
ad.addParameter("PagePos", pos);ad.useFeature("tile");adManager.createAd(ad);return ad.buildExpandedUrl();}
function MultiLogoAd(adtype,logoNum){var ad=new DartAd();if(logoNum==undefined||logoNum==''||logoNum>4||logoNum<1){logoNum=4;}
if(adtype==undefined||adtype==''){adtype='LOGO';}
if(scrippsEnvironment=='STAGING')
ad.setUrl("http://devadsremote.scrippsnetworks.com/snDigitalLogo"+logoNum+".html?");else
ad.setUrl(adServer+"/snDigitalLogo"+logoNum+".html?");ad.addParameter("adtype",adtype);ad.addParameter("PagePos",1);if(logoNum>0){adManager.createAd(ad);$(document).ready(function(){if($(".sponsor-multi-logo a img").length>0){if($(".sponsor-multi-logo").parent().hasClass("west-spons")){$(".sponsor-multi-logo").prepend("<em>"+mdManager.getSctnDspName()+" is Sponsored by:</em>");$(".west-spons").css("display","block");}else{$(".sponsor-multi-logo").prepend("<em>Sponsored by:</em>");}}});}};function setAdTagsParameters() {document.globalPageSite="DOOR";document.globalPageSctnName=adtag_globalPageSctnName;document.globalPageSctnId=adtag_globalPageSctnId;document.globalPageType=adtag_globalPageType;document.globalCategoryDspName=adtag_globalCategoryDspName;document.globalSctnDspName=adtag_globalSctnDspName;document.globalPageTitle=adtag_globalPageTitle;document.globalPageAbstract=adtag_globalPageAbstract;document.globalPageKeywords=adtag_globalPageKeywords;document.globalPageSponsorship=adtag_globalPageSponsorship;document.globalSctnLineage=adtag_globalSctnLineage;document.globalPageCompany=adtag_globalPageCompany;document.globalPageBroker=adtag_globalPageBroker;document.globalPageBrokerOffice=adtag_globalPageBrokerOffice;document.globalPageAgent=adtag_globalPageAgent;document.globalPageAgent=adtag_globalPageAgent;document.globalPageZipCode=adtag_globalPageZipCode;if( typeof(adtag_globalPageHomeAge)=="undefined"){document.globalPageHomeAge="";}
else{document.globalPageHomeAge=adtag_globalPageHomeAge;}
mdManager.addParameter("Url", adtag_url);mdManager.addParameter("Type", adtag_globalPageType);mdManager.addParameter("Role", "");mdManager.addParameter("Title", adtag_globalPageTitle);mdManager.addParameter("Sponsorship", adtag_globalPageSponsorship);mdManager.addParameter("Abstract", adtag_globalPageAbstract);mdManager.addParameter("Keywords", adtag_globalPageKeywords);mdManager.addParameter("Classification", adtag_globalSctnLineage);mdManager.addParameter("Site", "DOOR");mdManager.addParameter("SctnName", adtag_globalPageSctnName);mdManager.addParameter("SctnDspName", adtag_globalSctnDspName);mdManager.addParameter("CategoryDspName", adtag_globalCategoryDspName);mdManager.addParameter("SctnId", adtag_globalPageSctnId);mdManager.addParameter("DetailId", "");mdManager.addParameter("PageNumber", "1");mdManager.addParameter("UniqueId", adtag_globalUniqueId);mdManager.addParameter("Show_Abbr", "");mdManager.addParameter("SearchKeywords", "<% // FROM INITIAL SEARCH BOX %>");mdManager.addParameter("SearchFilters", "<% // FROM REFINEMENTS %>");mdManager.addParameter("Company", adtag_globalPageCompany);mdManager.addParameter("Broker", adtag_globalPageBroker);mdManager.addParameter("Office", adtag_globalPageBrokerOffice);mdManager.addParameter("Agent", adtag_globalPageAgent);mdManager.addParameter("ZipCode", adtag_globalPageZipCode);if(typeof(adtag_globalPageHomeAge)=="undefined"){mdManager.addParameter("home_age", "");}
else{mdManager.addParameter("home_age", adtag_globalPageHomeAge);}
if(typeof (adtag_globalCBSRTransactionId)=="undefined") {mdManager.addParameter("transactionID", "");}else{mdManager.addParameter("transactionID", adtag_globalCBSRTransactionId);}}
var segQS="";function rsiCookieRead(){var rsi_segs=[];var segs_beg=document.cookie.indexOf('rsi_segs=');if(segs_beg>=0){segs_beg=document.cookie.indexOf('=',segs_beg)+1;if(segs_beg>0){var segs_end=document.cookie.indexOf(';',segs_beg);if(segs_end==-1)segs_end=document.cookie.length;rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');}}
var segLen=20;if(rsi_segs.length<segLen){segLen=rsi_segs.length;}
for (var i=0;i<segLen;i++){segQS+=("&rsi"+"="+rsi_segs[i])}}
rsiCookieRead()
function setVars() {A09802.DM_cat(adtag_globalSctnLineage.split(',').reverse().join('>'));A09802.DM_tag();}
function Parameter(){var parameters=new Object;this.addParameter=addParameter;this.getParameter=getParameter;this.getKeys=getKeys;function getKeys() {return parameters;}
function addParameter(key, value) {if(!parameters[key])
parameters[key]=new Array();parameters[key].push(value);}
function getParameter(key, separator) {if(!parameters[key])
return;return parameters[key].join(separator);}}
function Url(){var p=new Parameter();this.addParameter=p.addParameter;this.getParameter=p.getParameter;this.getKeys=p.getKeys;this.url=new String();this.buildUrl=buildUrl;this.buildExpandedUrl=buildExpandedUrl;this.setUrl=setUrl;this.getUrl=getUrl;this.buildQueryStringValuePairs=buildQueryStringValuePairs;this.buildExpandedQueryStringValuePairs=buildExpandedQueryStringValuePairs;function setUrl(u) {this.url=u}
function getUrl() {return this.url;}
function buildQueryStringValuePairs() {var queryString="";for (key in this.getKeys() ) {if(queryString!="")
queryString+='&'
queryString+=key+'='+this.getParameter(key, ',');}
return queryString;}
function buildUrl() {return this.getUrl()+this.buildQueryStringValuePairs();}
function buildExpandedQueryStringValuePairs() {var queryString="";for (key in this.getKeys() ) {var item=new String(this.getParameter(key, ","));var iArray=item.split(",");for(i=0; i<iArray.length; i++) {if(queryString!="" && iArray[i]!="" && iArray[i]!=undefined)
queryString+='&'
if(iArray[i]!="" && iArray[i]!=undefined)
queryString+=key+'='+iArray[i];}}
return queryString;}
function buildExpandedUrl() {var sRSI="";if(segQS.length>0) {sRSI=segQS;}
return this.getUrl()+this.buildExpandedQueryStringValuePairs()+sRSI;}}
Ad.prototype=new Url;function Ad(){var url=new Url();this.addParameter=url.addParameter;this.getParameter=url.getParameter;this.getKeys=url.getKeys;this.buildUrl=url.buildUrl;this.buildExpandedUrl=url.buildExpandedUrl;var feature=new Parameter();this.useFeature=useFeature;this.getFeature=getFeature;this.debug=debug;this.write=write;function useFeature(key) {feature.addParameter(key, "T");}
function getFeature(key) {return feature.getParameter(key, ",");}
function debug() {document.write('<DIV style="BACKGROUND-COLOR:RED;COLOR:WHITE">'+this.buildExpandedUrl()+'</DIV>');}
function write() {}}
DartAd.prototype=new Ad();function DartAd(){DartAd.prototype=new Ad();this.write=write;this.useFeature("site");this.useFeature("category");this.useFeature("vgncontent");this.useFeature("ord");this.useFeature("topic");this.useFeature("tile");this.useFeature("pagetype");this.useFeature("SECTION_ID");this.useFeature("SUBSECTION");this.useFeature("page");this.useFeature("uniqueid");this.useFeature("SearchKeywords");this.useFeature("SearchFilters");this.useFeature("keyword");this.useFeature("Company");this.useFeature("Broker");this.useFeature("Office");this.useFeature("Agent");this.useFeature("ZipCode");this.useFeature("home_age");function write() {document.write('<script type="text/javascript" language="JavaScript" src="'+this.buildExpandedUrl()+'"></script>');}}
AdUrl.prototype=new Ad();function AdUrl(){AdUrl.prototype=new Ad();this.write=write;this.useFeature("site");this.useFeature("category");this.useFeature("vgncontent");this.useFeature("ord");this.useFeature("topic");this.useFeature("tile");this.useFeature("pagetype");this.useFeature("SECTION_ID");this.useFeature("SUBSECTION");this.useFeature("page");this.useFeature("uniqueid");this.useFeature("SearchKeywords");this.useFeature("SearchFilters");this.useFeature("keyword");this.useFeature("Company");this.useFeature("Broker");this.useFeature("Office");this.useFeature("Agent");this.useFeature("ZipCode");this.useFeature("home_age");function write() {}}
function AdManager(){var p=new Parameter();this.addParameter=p.addParameter;this.getParameter=p.getParameter;this.getKeys=p.getKeys;this.createAd=createAd;this.createDeferredAd=createDeferredAd;this.moveAds=moveAds;function createAd(ad) {for (key in this.getKeys()) {if(ad.getFeature(key)!=undefined) {ad.addParameter(key, this.getParameter(key, ','));}}
if(document.debug==1)
ad.debug();ad.write();}
function createDeferredAd(i) {}
function moveAds() {}};//AG-develop 12.7.1-401 (2011-12-07 17:23:16 UTC)
var rsi_now= new Date();
var rsi_csid= 'A09802';if(typeof(csids)=="undefined"){var csids=[rsi_csid];}else{csids.push(rsi_csid);};function rsiClient(Da){this._rsiaa=Da;this._rsiba=1;this._rsica=1;this._rsida=0;this._rsiea=0;this._rsifa=0;this._rsiga="1008211";this._rsiha="pix04.revsci.net";this._rsiia="js";this._rsija="b";this._rsika="3";this._rsila=3;this._rsima=1;this._rsina=new Array();this._rsioa=0;this._rsipa=null;this._rsiqa=null;this._rsira=null;this._rsisa=null;this._rsita=null;this._rsiua=null;this._rsiva=0;this.DM_cat=function(Ea){this._rsipa=Ea;};this.DM_name=function(Fa){this._rsiqa=Fa;};this.DM_keywords=function(st){this._rsira=st;};this.DM_event=function(Ga){this._rsisa=Ga;};this.DM_addToLoc=function(n,v){this._rsita=_rsiwa(this._rsita,n,v);};this.DM_addEncToLoc=function(n,v){this.DM_addToLoc(_rsixa(n),_rsixa(v));};this.DM_setLoc=function(u){this._rsita=u;};this.rsi_c=function(Da){this._rsiaa=Da;};this.rsi_ral=function(Ha){this._rsiba=Ha;};this.rsi_riu=function(Ia){this._rsica=Ia;};this.rsi_tiu=function(Ja){this._rsida=Ja;};this.rsi_m=function(Ka){this._rsiea=Ka;};this.rsi_dw=function(La){this._rsifa=La;};this.rsi_s=function(Ma){this._rsiha=Ma;};this.rsi_t=function(Na){this._rsiia=Na;};this.rsi_en=function(Oa){this._rsija=Oa;};this.rsi_cn=function(Pa){this._rsika=Pa;};this.rsi_us=function(Qa){this._rsila=Qa;};this.rsi_ra=function(ra){this._rsima=ra;};this.DM_tag=function(){var Ra;if(this._rsioa==0||this._rsiea==1){if(typeof(DM_prepClient)=="function"){DM_prepClient(this._rsiaa,this);}var Sa=this._rsiya();if(this._rsiia=="gif"){Ra=new Image(2,3);Ra.src=Sa;this._rsina[this._rsina.length]=Ra;}else if(this._rsiia=="js"){if(this._rsifa==1){document.write("<script language=\"JavaScript\" type=\"text/javascript\" src=\""+Sa+"\"><"+"/script>");}else{var Ta=document.createElement("script");Ta.language="JavaScript";Ta.type="text/javascript";Ta.src=Sa;var Ua=(document.body==null)?document.getElementsByTagName("head")[0]:document.body;Ua.insertBefore(Ta,Ua.firstChild);Ra=Ta;}}this._rsioa=1;}this.rsi_r();return Ra;};this._rsiya=function(){var Va="";this.DM_addEncToLoc("_rsiL",this._rsiva);Va="DM_LOC="+_rsixa(this._rsita);if(this._rsipa){Va+="&DM_CAT="+_rsixa(this._rsipa);}if(this._rsisa){Va+="&DM_EVT="+_rsixa(this._rsisa);}if(this._rsira){Va+="&DM_KYW="+_rsixa(this._rsira);}if(this._rsica==1&&this._rsiua){Va+="&DM_REF="+_rsixa(this._rsiua);}if(this._rsida==1){Va+="&DM_TIT="+_rsixa(document.title);}if(this._rsiqa){Va+="&DM_NAM="+_rsixa(this._rsiqa);}Va+="&DM_EOM=1";var Wa="http"+(location.protocol=="https:"?"s":"")+"://";var Xa="/"+this._rsiaa+"/"+this._rsija+this._rsika+"/0/"+this._rsila+"/"+this._rsiga+"/";var Ya=Math.floor(Math.random()*1000000000)+"."+this._rsiia;var Za=Wa+this._rsiha+Xa+Ya+"?D="+_rsixa(Va)+"&C="+_rsixa(csids);var $a=Za.length;if($a>=2000){if(Za.charAt(1998)=='%'){Za=Za.substr(0,1998);}else if(Za.charAt(1999)=='%'){Za=Za.substr(0,1999);}else{Za=Za.substr(0,2000);}if(Za.charAt(Za.length-3)=='%'&&Za.charAt(Za.length-2)=='2'&&Za.charAt(Za.length-1)=='5'){Za=Za.substr(0,Za.length-3);}}return Za;};this.rsi_r=function(){var ab;var bb;var cb=0;var db=0;if(this._rsiba==1){var eb=window;while(true){try{ab=eb.document.location;bb=eb.document.referrer;cb=db;}catch(notAllowed){}if(eb==window.top||eb==eb.parent){break;}eb=eb.parent;db++;}}else{ab=window.document.location;bb=window.document.referrer;}this._rsiva=db-cb;this._rsiua=this._rsima?_rsiza(bb.toString()):bb.toString();if(this._rsiva==0){this._rsita=(this._rsima)?_rsiza(ab.href):ab.href;}else{this._rsita=this._rsiua;}this._rsipa=null;this._rsiqa=null;this._rsira=null;this._rsisa=null;};this.rsi_r();}var _rsixa;if(typeof(encodeURIComponent)=="function"){_rsixa=encodeURIComponent;}else{var _rsiAa=new RegExp("[\x00-\x20]|[\x22-\x26]|[\x2B-\x2C]|\x2F|[\x3A-\x40]|[\x5B-\x5E]|\x60|[\x7B-\x7D]|[\x7F-\uFFFF]","g");_rsixa=function(v){return v.toString().replace(_rsiAa,_rsiBa);}}function _rsiwa(u,n,v){return u+(u.indexOf("?")==-1?"?":"&")+n+"="+v;}function _rsiza(u){var i=u.indexOf('#');return(i>=0)?u.substr(0,i):u;}function _rsiCa(i){var fb=i.toString(16).toUpperCase();return fb.length<2?"0"+fb:fb;}function _rsiBa(c){var i=c.charCodeAt(0);if(isNaN(i))return "";if(i<128)return "%"+_rsiCa(i);if(i<2048)return "%"+_rsiCa(0xC0+(i>>6))+"%"+_rsiCa(0x80+(i&0x3F));if(i<65536)return "%"+_rsiCa(0xE0+(i>>12))+"%"+_rsiCa(0x80+(i>>6&0x3F))+"%"+_rsiCa(0x80+(i&0x3F));return "%"+_rsiCa(0xF0+(i>>18))+"%"+_rsiCa(0x80+(i>>12&0x3F))+"%"+_rsiCa(0x80+(i>>6&0x3F))+"%"+_rsiCa(0x80+(i&0x3F));}window[rsi_csid]=new rsiClient(rsi_csid);
function DM_cat(aa){window[rsi_csid].DM_cat(aa);}function DM_name(ba){window[rsi_csid].DM_name(ba);}function DM_keywords(kw){window[rsi_csid].DM_keywords(kw);}function DM_event(ca){window[rsi_csid].DM_event(ca);}function DM_addToLoc(n,v){window[rsi_csid].DM_addToLoc(n,v);}function DM_addEncToLoc(n,v){window[rsi_csid].DM_addEncToLoc(n,v);}function DM_setLoc(u){window[rsi_csid].DM_setLoc(u);}function DM_tag(){window[rsi_csid].DM_tag();}
/* SiteCatalyst code version: H.23.6
Scripps Update 11/02/2011, RD - FrontDoor
Copyright 1996-2011 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var fdHost=location.host.toLowerCase();
var fdPath=location.pathname.toLowerCase();
var dirs=fdPath.split("/");
var fdProt=location.protocol;
var fdHREF=location.href.toLowerCase();
var s_account="";

//determine report suite
if (fdHREF.indexOf("/city-guide") != -1) {
var pType="fdsn";
var omniRS="scrippsfrontdoorsn,scrippsfrontdoorglobal";
s_account="scrippsfrontdoorsn,scrippsfrontdoorglobal";
}
else if (fdHREF.indexOf("/listing/") != -1) {
var pType="fdld";
var omniRS="scrippsfrontdoorlistingsdetail,scrippsfrontdoorglobal";
s_account="scrippsfrontdoorlistingsdetail,scrippsfrontdoorglobal";
}
else {
var pType="fd";
var omniRS="scrippsfrontdoor,scrippsfrontdoorglobal";
s_account="scrippsfrontdoor,scrippsfrontdoorglobal";
}

if (fdHREF.indexOf(".gabriels.net") != -1) {
var pType="dev";
var omniRS="scrippsdev";
s_account="scrippsdev";
}

//shared omni code across FD
var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,frontdoor.com,gabriels.net,iphone.frontdoor.com,localhost,openhouse.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {

/* Add calls to plugins here */

if(!window.s_campaign) {
	if (location.search.indexOf("omnisource=") !="-1") {s.campaign=s.getQueryParam('omnisource');}
	else if (location.search.indexOf("c1=") !="-1") {s.campaign=s.getQueryParam('c1');}
	else if (location.search.indexOf("soc=") !="-1") {s.campaign="soc: " + s.getQueryParam('soc');}
	else if (location.search.indexOf("syc=") !="-1") {s.campaign="syc: " + s.getQueryParam('syc');}
	else if (location.search.indexOf("vpid=") !="-1") {s.campaign="vpid: " + s.getQueryParam('vpid');}
	s.campaign=s.getValOnce(s.campaign,"s_campaign",0);
	s.prop31=s.getQueryParam('omnisource');
	s.prop31=s.getValOnce(s.prop31,"c31",0);	
	s.eVar18=s.getQueryParam('xp');
	s.eVar18=s.getValOnce(s.eVar18,"v18",0);
	s.eVar13=s.getQueryParam('c1');
	s.eVar13=s.getValOnce(s.eVar13,"v13",0);	
	s.eVar14=s.getQueryParam('c2');
	s.eVar14=s.getValOnce(s.eVar14,"v14",0);
	s.eVar15=s.getQueryParam('c3');
	s.eVar15=s.getValOnce(s.eVar15,"v15",0);
	s.eVar16=s.getQueryParam('c4');
	s.eVar16=s.getValOnce(s.eVar16,"v16",0);
	s.eVar17=s.getQueryParam('c5');
	s.eVar17=s.getValOnce(s.eVar17,"v17",0);
	s.prop17=s.getQueryParam('c1');
	s.prop17=s.getValOnce(s.prop17,"c17",0);
	s.prop21=s.getQueryParam('c5');
	s.prop21=s.getValOnce(s.prop21,"c21",0);
	s.eVar25=s.getQueryParam('nl');
	if (s.eVar25 == ""){s.eVar25=s.getQueryParam('sni_mid');}
	s.eVar26=s.getQueryParam('int');
	s.eVar27=s.getQueryParam('syc');
	s.prop43=s.getQueryParam('syc');
	s.eVar30=s.getQueryParam('oc');
	}
	
//Strongmail
s.eVar63=s.getQueryParam("sni_rid");
s.eVar64=s.getQueryParam("sni_mid");

s.prop18=s.getAndPersistValue(s.eVar14,'s_cp_persist1',30);
s.prop19=s.getAndPersistValue(s.eVar15,'s_cp_persist2',30);
s.prop20=s.getAndPersistValue(s.eVar16,'s_cp_persist3',30);

s.prop32=s.getNewRepeat();
s.eVar22=s.getNewRepeat();

s.events=s.apl(s.events,"event1",",",2);

//Timepart
var omniHour=s.getTimeParting('h','-5');
var omniDay=s.getTimeParting('d','-5');
var lenOH=omniHour.length;
switch(lenOH)
{
case 6:
	if (omniHour.indexOf(":30") == -1) {
		var aHour=omniHour.substring(0,1) + omniHour.substring(4,5);
	}
	else {
		var aHour=omniHour.substring(0,1) + ".5" + omniHour.substring(4,5);
	}
	break;
case 7:
	if (omniHour.indexOf(":30") == -1) {
		var aHour=omniHour.substring(0,2) + omniHour.substring(5,6);
	}
	else {
		var aHour=omniHour.substring(0,2) + ".5" + omniHour.substring(5,6);
	}
	break;
default:
	var aHour=omniHour;
}
var aDay=omniDay.substring(0,3);
s.prop36=aDay + "-" + aHour;

//% Page Viewed
s.prop42=s.getPreviousValue(s.pageName,'gpv_pn');
if (s.prop42) {
s.prop41=s.getPercentPageViewed();
}

}

//fdsn specific code

//fdld specific code

//fd specific code

s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
	+"var s=this,a=new Date;"
	+"e=e?e:0;"
	+"a.setTime(a.getTime()+e*86400000);"
	+"if(v)s.c_w(c,v,e?a:0);"
	+"return s.c_r(c);"
);
/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");
/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");
/*
 * Plugin: getTimeParting 2.0 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");
/*
* Plugin: getPercentPageViewed v1.x
*/
s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("",""
+"var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement."
+"scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of"
+"fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie"
+"ntHeight)),vph=s.d.clientHeight||Math.min(s.d.documentElement.clien"
+"tHeight,s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document."
+"documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,"
+"pv=Math.round(vh/dh*100),cv=s.c_r('s_ppv'),cpi=cv.indexOf('|'),cpv="
+"'',ps='';if(cpi!=-1){cpv=cv.substring(0,cpi);ps=parseInt(cv.substri"
+"ng(cpi+1));}else{cpv=ps=0;}if(pv<=100){if(pv>parseInt(cpv)){ps=pv-M"
+"ath.round(vph/dh*100);s.c_w('s_ppv',pv+'|'+ps);}}else{s.c_w('s_ppv'"
+",'');}");
s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");
s.getPPVSetup();

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");


s.loadModule("Survey")
var s_sv_dynamic_root = "survey.112.2o7.net/survey/dynamic"
var s_sv_gather_root = "survey.112.2o7.net/survey/gather"


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.trackingServer="ewscripps.112.2o7.net"

/****************************** MODULES *****************************/
/* Module: Survey */
s.m_Survey_c="var m=s.m_i(\"Survey\");m.launch=function(i,e,c,o,f){this._boot();var m=this,g=window.s_sv_globals||{},l,j;if(g.unloaded||m._blocked())return 0;i=i&&i.constructor&&i.constructor==Array?"
+"i:[i];l=g.manualTriggers;for(j=0;j<i.length;++j)l[l.length]={l:m._suites,i:i[j],e:e||0,c:c||0,o:o||0,f:f||0};m._execute();return 1;};m.version = 10001;m._t=function(){this._boot();var m=this,s=m.s,"
+"g=window.s_sv_globals||{},l,impr,i,k,impr={};if(m._blocked())return;for(i=0;i<s.va_t.length;i++){k=s.va_t[i];if(s[k]) impr[k]=s[k];}impr[\"l\"]=m._suites;impr[\"n\"]=impr[\"pageName\"]||\"\";impr["
+"\"u\"]=impr[\"pageURL\"]||\"\";impr[\"c\"]=impr[\"campaign\"]||\"\";impr[\"r\"]=impr[\"referrer\"]||\"\";l=g.pageImpressions;if(l.length > 4) l[l.length - 4]=null;l[l.length]=impr;m._execute();};m."
+"_rr=function(){var g=window.s_sv_globals||{},f=g.onScQueueEmpty||0;if(f)f();};m._blocked=function(){var m=this,g=window.s_sv_globals||{};return !m._booted||g.stop||!g.pending&&!g.triggerRequested;}"
+";m._execute=function(){if(s_sv_globals.execute)setTimeout(\"s_sv_globals.execute();\",0);};m._boot=function(){var m=this,s=m.s,w=window,g,c,d=s.dc,e=s.visitorNamespace,n=navigator.appName.toLowerCa"
+"se(),a=navigator.userAgent,v=navigator.appVersion,h,i,j,k,l,b;if(w.s_sv_globals)return;if(!((b=v.match(/AppleWebKit\\/([0-9]+)/))?521<b[1]:n==\"netscape\"?a.match(/gecko\\//i):(b=a.match(/opera[ \\"
+"/]?([0-9]+).[0-9]+/i))?7<b[1]:n==\"microsoft internet explorer\"&&!v.match(/macintosh/i)&&(b=v.match(/msie ([0-9]+).([0-9]+)/i))&&(5<b[1]||b[1]==5&&4<b[2])))return;g=w.s_sv_globals={};g.module=m;g."
+"pending=0;g.incomingLists=[];g.pageImpressions=[];g.manualTriggers=[];e=\"survey\";c=g.config={};m._param(c,\"dynamic_root\",(e?e+\".\":\"\")+d+\".2o7.net/survey/dynamic\");m._param(c,\"gather_root"
+"\",(e?e+\".\":\"\")+d+\".2o7.net/survey/gather\");g.url=location.protocol+\"//\"+c.dynamic_root;g.gatherUrl=location.protocol+\"//\"+c.gather_root;g.dataCenter=d;g.onListLoaded=new Function(\"r\","
+"\"b\",\"d\",\"i\",\"l\",\"s_sv_globals.module._loaded(r,b,d,i,l);\");m._suites=(m.suites||s.un).toLowerCase().split(\",\");l=m._suites;b={};for(j=0;j<l.length;++j){i=l[j];if(i&&!b[i]){h=i.length;fo"
+"r(k=0;k<i.length;++k)h=(h&0x03ffffff)<<5^h>>26^i.charCodeAt(k);b[i]={url:g.url+\"/suites/\"+(h%251+100)+\"/\"+encodeURIComponent(i.replace(/\\|/,\"||\").replace(/\\//,\"|-\"))};++g.pending;}}g.suit"
+"es=b;setTimeout(\"s_sv_globals.module._load();\",0);m._booted=1;};m._param=function(c,n,v){var p=\"s_sv_\",w=window,u=\"undefined\";if(typeof c[n]==u)c[n]=typeof w[p+n]==u?v:w[p+n];};m._load=functi"
+"on(){var m=this,g=s_sv_globals,q=g.suites,r,i,n=\"s_sv_sid\",b=m.s.c_r(n);if(!b){b=parseInt((new Date()).getTime()*Math.random());m.s.c_w(n,b);}for(i in q){r=q[i];if(!r.requested){r.requested=1;m._"
+"script(r.url+\"/list.js?\"+b);}}};m._loaded=function(r,b,d,i,l){var m=this,g=s_sv_globals,n=g.incomingLists;--g.pending;if(!g.commonRevision){g.bulkRevision=b;g.commonRevision=r;g.commonUrl=g.url+"
+"\"/common/\"+b;}else if(g.commonRevision!=r)return;if(!l.length)return;n[n.length]={r:i,l:l};if(g.execute)g.execute();else if(!g.triggerRequested){g.triggerRequested=1;m._script(g.commonUrl+\"/trig"
+"ger.js\");}};m._script=function(u){var d=document,e=d.createElement(\"script\");e.type=\"text/javascript\";e.src=u;d.getElementsByTagName(\"head\")[0].appendChild(e);};if(m.onLoad)m.onLoad(s,m)";
s.m_i("Survey");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.6';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(k)>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g'"
+";v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSec"
+"ure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v"
+"='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else"
+" if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=="
+"'javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='"
+"plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';e"
+"lse if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteL"
+"ightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list"
+"')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var"
+" qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf("
+"t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackD"
+"ownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''"
+"};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if"
+"(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");t"
+"cf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.proto"
+"col.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}"
+"return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=="
+"'BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.hr"
+"ef&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t="
+"='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s"
+".rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+"
+"q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a)"
+"{var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q)"
+"{var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototy"
+"pe[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c"
+"_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if"
+"((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s"
+".b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorS"
+"ampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)retu"
+"rn 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if"
+"(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.l"
+"ocation.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s."
+"un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl="
+"new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e',"
+"'_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l"
+"[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];"
+"if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_"
+"m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||"
+"x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t"
+"+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i"
+"]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n"
+"&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\")"
+";if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i"
+"=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=tr"
+"ue;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'"
+"+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i"
+"<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;f"
+"or(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\""
+"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this"
+",d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new"
+" Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+19"
+"00:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!"
+"s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDat"
+"e){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return "
+"i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth"
+";bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeig"
+"ht;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var "
+"e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexO"
+"f(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}i"
+"f(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_refer"
+"rer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElem"
+"ent?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n"
+")ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');"
+"q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}"
+"if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.samp"
+"led)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}el"
+"se s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trac"
+"kLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy"
+"=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){for(i=0;i<s.va_g.length;i++){x=s.va_"
+"g[i];if(t[x])s[x]=t[x]}if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.onLoad)t.onLoad(s);if(t.tq)for(i"
+"=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByT"
+"agName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('O"
+"pera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));"
+"else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3"
+";else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visit"
+"orMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s."
+"vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,"
+"transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retr"
+"ieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2"
+"=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_"
+"g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountLis"
+"t,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNam"
+"es,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\","
+"1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,x,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||x=='s_l')&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function OmEvent(linkObject, EventId, LinkName){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='events';s.linkTrackEvents='event'+EventId;s.events='event'+EventId;s.tl(linkObject, 'o', LinkName);}
function OmEventAndEvar(linkObject, EventId, LinkName, Interaction, ListingID, AccountID){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar33,eVar34,eVar49,events';s.linkTrackEvents='event'+EventId;s.eVar33=ListingID;s.eVar34=AccountID;s.eVar49=Interaction;s.events='event'+EventId;s.tl(linkObject, 'o', LinkName);}
function OmSmartNeighborsEventAndEvarRedirect(linkObject, ZoneName, Title, Position, URL, OriginURL, City){var s_account='scrippsfrontdoorsn,scrippsfrontdoorglobal';var s=s_gi(s_account);s.linkTrackVars='prop45,prop46,prop47,prop48,prop49,prop50,eVar35,eVar36,eVar37,eVar38,eVar39,eVar40';s.linkTrackEvents='None';s.prop45='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.prop46='FrontDoor:Module:'+ZoneName+':Title:'+Title;s.prop47='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.prop48='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.prop49='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.prop50='FrontDoor:Module:'+ZoneName+':City: '+City;s.eVar35='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.eVar36='FrontDoor:Module:'+ZoneName+':Title: '+Title;s.eVar37='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.eVar38='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.eVar39='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.eVar40='FrontDoor:Module:'+ZoneName+':City: '+City;s.tl(linkObject, 'o', 'ScrippsFrontDoorSN_Custom_Link_Tracker');window.location=URL;}
function OmSmartNeighborsEventAndEvar(linkObject, ZoneName, Title, Position, URL, OriginURL, City){var s_account='scrippsfrontdoorsn,scrippsfrontdoorglobal';var s=s_gi(s_account);s.linkTrackVars='prop45,prop46,prop47,prop48,prop49,prop50,eVar35,eVar36,eVar37,eVar38,eVar39,eVar40';s.linkTrackEvents='None';s.prop45='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.prop46='FrontDoor:Module:'+ZoneName+':Title:'+Title;s.prop47='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.prop48='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.prop49='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.prop50='FrontDoor:Module:'+ZoneName+':City: '+City;s.eVar35='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.eVar36='FrontDoor:Module:'+ZoneName+':Title: '+Title;s.eVar37='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.eVar38='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.eVar39='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.eVar40='FrontDoor:Module:'+ZoneName+':City: '+City;s.tl(linkObject, 'o', 'ScrippsFrontDoorSN_Custom_Link_Tracker');window.open(URL, 'newWin');}
function OmSmartNeighborsEventAndEvarStandard(linkObject, ZoneName, Title, Position, URL, OriginURL, City){var s_account='scrippsfrontdoorsn,scrippsfrontdoorglobal';var s=s_gi(s_account);s.linkTrackVars='prop45,prop46,prop47,prop48,prop49,prop50,eVar35,eVar36,eVar37,eVar38,eVar39,eVar40';s.linkTrackEvents='None';s.prop45='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.prop46='FrontDoor:Module:'+ZoneName+':Title:'+Title;s.prop47='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.prop48='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.prop49='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.prop50='FrontDoor:Module:'+ZoneName+':City: '+City;s.eVar35='FrontDoor:Module:'+ZoneName+':ZoneName: '+ZoneName;s.eVar36='FrontDoor:Module:'+ZoneName+':Title: '+Title;s.eVar37='FrontDoor:Module:'+ZoneName+':Position: '+Position;s.eVar38='FrontDoor:Module:'+ZoneName+':URL: '+URL;s.eVar39='FrontDoor:Module:'+ZoneName+':OriginURL: '+OriginURL;s.eVar40='FrontDoor:Module:'+ZoneName+':City: '+City;s.tl(linkObject, 'o', 'ScrippsFrontDoorSN_Custom_Link_Tracker');}
function OmReportListings(linkObject, ZoneName, Title, Position, URL, OriginURL, ListingId){var s_account=omniRS;var s=s_gi(s_account);var linkname='featured_listings_url';s.linkTrackVars='prop45,prop46,prop47,prop48,prop49,eVar35,eVar36,eVar37,eVar38,eVar39,eVar33,eVar34,events';s.linkTrackEvents='event32';s.prop45='FD:'+ZoneName;s.prop46='FD:'+ZoneName+':Title:'+Title;s.prop47='FD:'+ZoneName+':Position: '+Position;s.prop48='FD:'+ZoneName+':URL: '+URL;s.prop49='FD:'+ZoneName+':OriginURL: '+OriginURL;s.eVar35='FD:'+ZoneName;s.eVar36='FD:'+ZoneName+':Title: '+Title;s.eVar37='FD:'+ZoneName+':Position: '+Position;s.eVar38='FD:'+ZoneName+':URL: '+URL;s.eVar39='FD:'+ZoneName+':OriginURL: '+OriginURL;s.eVar33=ListingId;s.eVar34=ListingId.substring(0,ListingId.indexOf("-"));s.events='event32';s.tl(linkObject, 'o', linkname);}
function OmReportSEO(linkObject, ZoneName, Title, Position, URL, OriginURL){var s_account=omniRS;var s=s_gi(s_account);var linkname=ZoneName;s.linkTrackVars='prop45,prop46,prop47,prop48,prop49,eVar35,eVar36,eVar37,eVar38,eVar39';s.prop45='FD:'+ZoneName;s.prop46='FD:'+ZoneName+':Title:'+Title;s.prop47='FD:'+ZoneName+':Position: '+Position;s.prop48='FD:'+ZoneName+':URL: '+URL;s.prop49='FD:'+ZoneName+':OriginURL: '+OriginURL;s.eVar35='FD:'+ZoneName;s.eVar36='FD:'+ZoneName+':Title: '+Title;s.eVar37='FD:'+ZoneName+':Position: '+Position;s.eVar38='FD:'+ZoneName+':URL: '+URL;s.eVar39='FD:'+ZoneName+':OriginURL: '+OriginURL;s.tl(linkObject, 'o', linkname);}
function OmReportEventAndEvar(linkObject, Linkname, EventId,Action){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar49,events';s.linkTrackEvents='event'+EventId;s.eVar49=Action;s.events='event'+EventId;s.tl(linkObject, 'o', Linkname);}
function OmReport(linkObject, Type, Query){if(Type=="refine"||Type=="sort"||Type=="remove"||Type=="pagination"){ReloadFrameAds();}
Query=escape(Query.replace(/&amp;/gi,'&'));var strURL=String.format("{0}Controls/AjaxCalls/ReportOm.aspx?Type={1}&Query={2}", WebRoot, Type, Query);$AJAX.GetForDelegate(function(AjaxResponse){eval(AjaxResponse);}, strURL);}
function OmReportRefine(linkObject, Type, DimName, DimValue){if(Type=="refine"||Type=="sort"||Type=="remove"||Type=="pagination"){ReloadFrameAds();}
var strURL=String.format("{0}Controls/AjaxCalls/ReportOm.aspx?Type={1}&DimName={2}&DimValue={3}", WebRoot, Type, escape(DimName), escape(DimValue));$AJAX.GetForDelegate(function(AjaxResponse){eval(AjaxResponse);}, strURL);}
function OmReportNearby(linkObject, RegionName, Type){ReloadFrameAds();var strURL=String.format("{0}Controls/AjaxCalls/ReportOm.aspx?Type={1}&DimName={2}&DimValue={3}", WebRoot, Type, escape(RegionName), escape(window.location.href));$AJAX.GetForDelegate(function(AjaxResponse){eval(AjaxResponse);}, strURL);}
function OmReportLocation(linkObject, Location , Type){var s_account=omniRS;var s=s_gi(s_account); s.templtv=s.linkTrackVars;s.templte=s.linkTrackEvents;s.linkTrackVars='prop5,eVar2';s.prop5=Location;s.eVar2=Location;s.tl(linkObject, 'o', 'SearchModule');if(s.templtv)s.linkTrackVars=s.templtv;if(s.templte)s.linkTrackEvents=s.templte;}
function OmReportLocationSearchModule(linkObject, Location , Type){var s_account=omniRS;var s=s_gi(s_account);  s.templtv=s.linkTrackVars;s.templte=s.linkTrackEvents;s.linkTrackVars='prop5,eVar2';s.linkTrackEvents='None';s.prop5="Location Search";s.eVar2="Location Search";s.tl(linkObject, 'o', 'LocationSearch');if(s.templtv)s.linkTrackVars=s.templtv;if(s.templte)s.linkTrackEvents=s.templte;}
function OmReportHomePage(PageSection, LinkTitle){var s=s_gi('scrippsfrontdoor,scrippsfrontdoorglobal');s.linkTrackVars='eVar28,prop44';s.linkTrackEvents='None';s.eVar28='HP:'+PageSection+':'+LinkTitle;s.prop44=s.eVar28;s.tl(this,'o','Page Body Clicks');}
function OmInteraction(linkObject, EventId, LinkName, Interaction, ListingID, AccountID, pgType){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar33,eVar34,eVar49,events';if(EventId!="") {s.linkTrackEvents='event32,event'+EventId;s.events='event32,event'+EventId;}else{s.linkTrackEvents='event32';s.events='event32';}
s.eVar33=ListingID;s.eVar34=AccountID;s.eVar49=Interaction;s.tl(linkObject, 'o', LinkName);}
function OmAgentInt(linkObject, eventID, agentID, agentInteraction){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar48,eVar34,prop50,prop51,events';if(eventID!="" && eventID!=null) {s.linkTrackEvents='event42,event'+eventID;s.events='event42,event'+eventID;}else{s.linkTrackEvents='event42';s.events='event42';}
s.eVar48=agentInteraction;s.eVar34=agentID;s.prop50=s.eVar48;s.prop51=s.eVar34;s.tl(linkObject, 'o', agentInteraction);}
var gl_date=new Date();document.write("<!-- "+gl_date+" -->");;var FDAccounts=new Accounts("FDAccounts")
function Accounts(ObjectInstance){}
FDAccounts.AddOmAccordian=function(linkOjbect, component, itemSelected){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='prop12,prop13,eVar9,eVar10,events';s.linkTrackEvents='None';s.prop12='myfdfolders:'+component
s.prop13='myfdfolders:'+component+':'+itemSelected
s.eVar9='myfdfolders:'+component
s.eVar10='myfdfolders:'+component+':'+itemSelected
s.tl(linkOjbect, 'o', 'fd accounts');}
FDAccounts.AddOmMyRecent=function(linkOjbect, itemSelected){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar49,events';s.linkTrackEvents='event32';s.eVar49='myfdrecent:'+itemSelected
s.events='event32';s.tl(linkOjbect, 'o', 'fd accounts');}
FDAccounts.AddOmMyFolders=function(linkOjbect, itemSelected){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='eVar49,events';s.linkTrackEvents='event32';s.eVar49='myfdfolders:'+itemSelected
s.events='event32';s.tl(linkOjbect, 'o', 'fd accounts');}
FDAccounts.AddOmSort=function(linkOjbect, itemSelected){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='prop14';s.linkTrackEvents='none';s.prop14='myfdfolders:'+itemSelected
s.tl(linkOjbect, 'o', 'fd accounts');}
FDAccounts.AddOmFacebookConnect=function(linkOjbect){var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='events';s.linkTrackEvents='event37';s.events='event37';s.tl(linkOjbect, 'o', 'fd accounts');};function HandleClaimListingClick(idListing, IdAccount) {var usrType=readUserPersCookie(PERSONCOOKIE_USERTYPE);if(IsAlreadySignedIn()==true) {if(usrType==2) {var URL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=DirectClaim&IdListing="+idListing+"&IdParentAccount="+IdAccount;$.get(URL, function(data) {CreateAndFillProListingClaimContainer(data);if($('#spnListingClaimStatus').html().indexOf('SUCCESS')!=-1) {$('#spnClaimContainer').html("<span id='success-msg'>This listing has been added to your<a id='lnkAccount' href='/pro/view-listings' style='margin-left:4px;'>Account</a></span><a type='button' class='btn' onclick=\"document.location='/pro/claimlistingedit/"+idListing+"/"+$('#spnListingClaimId').html()+"'\"><em class=\"icon-18x18 edit-listing\">&nbsp;</em><span>Edit Listing</span></a>");OmAgentInt(this,56,IdAccount,"Claim Listing : Success-Listing Added")
window.location.reload();}else{ShowClaimStatusModalWindow();}});}else{var modalInfo={header: "Pro Account Required",text: "<p>You need to have a pro account to confirm listings.<br/><br/>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function() { document.location="/pro/upgrade/"+idListing+"/"+IdAccount; },lnktext: "cancel",lnkclick: function() { CloseProAccountModal(); }}
if($('#divProAccountModal').length==0) {var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function(data) {CreateAndFillProListingClaimContainer(data);ShowProAccountModalWindow(modalInfo);});}else{ShowProAccountModalWindow(modalInfo);}}}else{window.location="/pro/claimlistings/step1/"+idListing;}
return false;}
function HandleThisIsMeClick(idagent, agentEmail, idListing, IdAccount) {var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=CheckEmailAssociatedAccount&AgentEmail="+agentEmail+"&SurpressPageOutput=true";$.get(URL, function(data) {eval(data);if(typeof (existsUser)!='undefined' && existsUser!=null) {if(typeof (userType)!='undefined' && userType!=null) {if(existsUser==true) {Facebook.Account_Login('PerformClaimListingTHISISME', idListing, IdAccount);}else{HandleAnonymousClaim(idListing, idagent, IdAccount);}}}});}
function HandleAnonymousClaim(idListing, idagent, IdAccount) {var claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=AnonymousClaim&IdListing="+idListing+"&IdParentAccount="+IdAccount;$.get(claimURL, function(data) {CreateAndFillProListingClaimContainer(data);if($('#spnListingClaimStatus').html().indexOf('SUCCESS')!=-1) {document.location='/pro/claimlistings/step2/'+idListing+'/'+idagent;}else{ShowClaimStatusModalWindow();}});}
function HandleBulkClaim(idListing, idagent, pagetype){var errorMessage='';var selectedlistings=$('#spnSelectedListingsContainer span');var _arrIdLst=[];var _arrIdAcc=[];$.each(selectedlistings, function(ix, selected){var idlst=selected.id.replace('sellst_', '');var IdAccount=$(selected).attr('idacc');_arrIdLst.push(idlst);_arrIdAcc.push(IdAccount);});var claimURL=null;if(pagetype=="claimlistings"){claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=BulkClaim&IdListing=idlst&IdParentAccount=IdAccount&SurpressPageOutput=true";}
else{claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=BulkClaim&IdListing=idlst&IdParentAccount=IdAccount&SurpressPageOutput=true&IsAnonymous=true";}
$.ajax({type: "POST",url: claimURL,async: false,data: { arrIdLst: _arrIdLst.join(","), arrIdAcc: _arrIdAcc.join(",") },success: function(data){eval(data);if(listingClaimStatus.indexOf('SUCCESS')==-1){errorMessage=listingClaimStatusDescription;}}});if(errorMessage==''){Facebook.Confirmation_Modal("You have successfully confirmed the listings.");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();if(pagetype=="claimlistings"){document.location="/pro/view-listings";}
else{document.location.reload(true);}}, 5000);}
else{Facebook.Confirmation_Error_Modal(errorMessage, "Error");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();document.location.reload(true);}, 5000);}
if(pagetype!="claimlistings"){document.location='/pro/claimlistings/step3/'+idListing+'/'+idagent;}}
var bulkClaimLimitCustomerServiceEmailSent=false;function ShowBulkClaimLimitReachedSendCustomerServiceEmailModal(){if(bulkClaimLimitCustomerServiceEmailSent){return;}
var info={header: "Maximum Reached",text: "<div>You have claimed/selected the maximum number of "+maximumAllowedListings+" listings available in this process.</div><div>Would you like customer service to contact you about bulk listing services?</div>",btntext: "OK",btnclick: function() { SendBulkClaimLimitCustomerServiceEmailRequest(); CloseProAccountModal(); OmAgentInt(this, null, null, 'Agent With '+maximumAllowedListings+'+Listings : Contact Me'); },lnktext: "no, thank you",lnkclick: function() { CloseProAccountModal(); }}
if($('#divProAccountModal').length==0){var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function(data){CreateAndFillProListingClaimContainer(data);ShowProAccountModalWindow(info);});}
else{ShowProAccountModalWindow(info);}}
function SendBulkClaimLimitCustomerServiceEmailRequest(){var url='/controls/ajaxcalls/AgentProfile/SendBulkClaimListingsEmail.aspx';$.ajax({type: "POST",url: url,async: false,dataType: "html",success: function(data){if(data.indexOf('SUCCESS')==-1){return;}
bulkClaimLimitCustomerServiceEmailSent=true;SendBulkClaimLimitCustomerServiceEmailSentModal();}});}
function SendBulkClaimLimitCustomerServiceEmailSentModal(){Facebook.Confirmation_Modal("Customer Service will contact you in the next 48 hours.", "Maximum Reached");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);}
function HandleUnclaim(idListing) {var unclaimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=Unclaim&IdListing="+idListing+"&SurpressPageOutput=true"; ;$.get(unclaimURL, function(data) {Facebook.Confirmation_Modal("You have successfully removed the listing.");window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();document.location.reload(true);}, 5000);});}
function CreateAndFillProListingClaimContainer(data) {if($('#spnProListingClaimContainer').length==0) {$(document.body).append("<span id='spnProListingClaimContainer'></span>");}
$('#spnProListingClaimContainer').html(data);}
var proAcctModalOverlayDiv;function ShowProAccountModalWindow(modaldata) {$.modal.close();FillProAccountModalContentData(modaldata);$('#divProAccountModal').modal();$('.ui-dialog').css("z-index", "9999999");proAcctFadeInBackground();$(proAcctModalOverlayDiv).click(function() { CloseProAccountModal(); });}
function ShowClaimStatusModalWindow() {var info={header: "Claim Status",text: $('#spnListingClaimStatusDescription').html(),btntext: "OK",btnclick: function() { CloseProAccountModal(); },lnktext: null,lnkclick: null}
ShowProAccountModalWindow(info);}
function ShowBlockedProAccountModalWindow(modaldata) {$.modal.close();$('#modalOverlayDiv').hide();FillProAccountModalContentData(modaldata);$.blockUI.defaults.css={padding: 0,margin: 0,top: '30%',left: '35%',color: '#000'};$.blockUI({ message: $('#divProAccountModal') });}
function CloseProAccountModal() {$.modal.close();proAcctFadeOutBackground();}
function FillProAccountModalContentData(modaldata) {$('#divProAccountModal #proAccountModalHeader').html(modaldata.header);$('#divProAccountModal #proAccountModalText').html(modaldata.text);if(modaldata.btntext!=null) {$('#divProAccountModal #proAccountModalBtnLnk').html(modaldata.btntext);$('#divProAccountModal #proAccountModalBtnLnk').click(modaldata.btnclick);}else{$('#divProAccountModal #proAccountModalBtnLnk').hide();}
if(modaldata.lnktext!=null) {$('#divProAccountModal #proAccountModalLnk').html(modaldata.lnktext);$('#divProAccountModal #proAccountModalLnk').click(modaldata.lnkclick);}else{$('#divProAccountModal #proAccountModalLnk').hide();}
if(typeof (modaldata.closeclick)!='undefined' && modaldata.closeclick!=null) {$('#proAccountModalCloseBtn').click(modaldata.closeclick);}else{$('#proAccountModalCloseBtn').click(function() { CloseProAccountModal(); });}}
function proAcctFadeInBackground() {if(!proAcctModalOverlayDiv) {proAcctModalOverlayDiv=document.createElement('div');}
proAcctModalOverlayDiv.id="modalOverlayDiv";$('#global_wrap').append(proAcctModalOverlayDiv);$('#modalOverlayDiv').css('height', $("body").height());$(proAcctModalOverlayDiv).fadeTo(250, .3);$(document).keydown(function(e) {if(e.keyCode==27) {document.getElementById('global_wrap').removeChild(proAcctModalOverlayDiv);$('#modalOverlayDiv').css('height', '0px');$(document).unbind('keydown');}});}
function proAcctFadeOutBackground() {if(proAcctModalOverlayDiv) {$(proAcctModalOverlayDiv).fadeTo(250, .0)
$('#modalOverlayDiv').css('height', '0px')
setTimeout(function() {if(proAcctModalOverlayDiv && proAcctModalOverlayDiv.parentNode!=null) {proAcctModalOverlayDiv.parentNode.removeChild(proAcctModalOverlayDiv);}}, 251);}}
function StopPropagation(e) {var IE=(navigator.appVersion.indexOf("MSIE")==-1) ? false : true;if(!e||IE) {e=window.event;e.cancelBubble=true;}else{e.stopPropagation();}}
var listingsPerPage=10;var existingClaimsCount=0;var maximumAllowedListings=300;$(function() {GenerateSelectedListingsContainer();});function GenerateSelectedListingsContainer() {$(document.body).append('<span id=\'spnSelectedListingsContainer\'></span>');}
function UpdateSelectedListingsContainer(ref) {if($(ref).is(':checked')) {$('#spnSelectedListingsContainer').append('<span id=\'sel'+ref.id+'\' idacc=\''+$(ref).attr('idacc')+'\'></span>');}else{$('#sel'+ref.id).remove();}}
function S2UpdateUI() {var selectedlst=$('#spnSelectedListingsContainer span');$.each(selectedlst, function(ix, selected) {var checkboxes=$('#recommend_listings :checkbox');$.each(checkboxes, function(iy, checkbox) {if(('sel'+checkbox.id)==selected.id) {$(checkbox).attr('checked', true);}});});S2UpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();if(CheckIfReachedMaximumAllowedListings()){ShowUnregisteredUserMaximumClaimsReachedModalWindow();}}
function LRUpdateUI() {var selectedlst=$('#spnSelectedListingsContainer span');$.each(selectedlst, function(ix, selected) {var checkboxes=$('#recommend_listings :checkbox');$.each(checkboxes, function(iy, checkbox) {if(('sel'+checkbox.id)==selected.id) {$(checkbox).attr('checked', true);}});});LRUpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();if(CheckIfReachedMaximumAllowedListings()){ShowBulkClaimLimitReachedSendCustomerServiceEmailModal();}}
function S2checkboxClickHandler(ref) {UpdateSelectedListingsContainer(ref);S2UpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();if($(ref).is(':checked')) {if(CheckIfReachedMaximumAllowedListings()) {ShowUnregisteredUserMaximumClaimsReachedModalWindow();}
OmAgentInt(this,54,null,'Claim Listing: Step2: Check Listing');}else{OmAgentInt(this,54,null,'Claim Listing: Step2: Uncheck Listing');}
UpdateCheckboxesZone();}
function LRcheckboxClickHandler(ref) {UpdateSelectedListingsContainer(ref);LRUpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();if($(ref).is(':checked')) {if(CheckIfReachedMaximumAllowedListings()) {ShowBulkClaimLimitReachedSendCustomerServiceEmailModal();}
OmAgentInt(this,54,null,'Agent Profile : My Listings : Listings Recommendation : Select');}else{OmAgentInt(this,54,null,'Agent Profile : My Listings : Listings Recommendation : Deselect');}
UpdateCheckboxesZone();}
function S2selectAllHandler() {var $items=$('#recommend_listings :checkbox');$.each($items, function(ix, obj) {if($(obj).is(':checked')==false) {$(obj).attr('checked', true);UpdateSelectedListingsContainer(obj);if(CheckIfReachedMaximumAllowedListings()) {ShowUnregisteredUserMaximumClaimsReachedModalWindow();return false;}}});S2UpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();}
function LRselectAllHandler() {var $items=$('#recommend_listings :checkbox');$.each($items, function(ix, obj){if($(obj).is(':checked')==false){if(CheckIfReachedMaximumAllowedListings()){ShowBulkClaimLimitReachedSendCustomerServiceEmailModal();return false;}
$(obj).attr('checked', true);UpdateSelectedListingsContainer(obj);}});LRUpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();}
function S2selectNoneHandler() {var $items=$('#recommend_listings :checkbox');$.each($items, function(ix, obj) {if($(obj).is(':checked')==true) {$(obj).attr('checked', false);UpdateSelectedListingsContainer(obj);}});S2UpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();}
function LRselectNoneHandler() {var $items=$('#recommend_listings :checkbox');$.each($items, function(ix, obj) {if($(obj).is(':checked')==true) {$(obj).attr('checked', false);UpdateSelectedListingsContainer(obj);}});LRUpdateSelectAllNoneZone();UpdateListingsSelectedZone();UpdateClaimListingsZone();UpdateCheckboxesZone();}
function S2UpdateSelectAllNoneZone() {var nochecked=GetNumberOfCheckedListings();if(nochecked==0) {S2AdjustSelectAll(true);S2AdjustSelectNone(false);}
else if(nochecked==listingsPerPage) {S2AdjustSelectAll(false);S2AdjustSelectNone(true);}else{S2AdjustSelectAll(true);S2AdjustSelectNone(true);}}
function LRUpdateSelectAllNoneZone(){var maxAllowedReached=CheckIfReachedMaximumAllowedListings();if(maxAllowedReached){LRAdjustSelectAll(false);LRAdjustSelectNone(true);return;}
var noChecked=GetNumberOfCheckedListings();if(noChecked==0){LRAdjustSelectAll(true);LRAdjustSelectNone(false);}
else if(noChecked==listingsPerPage){LRAdjustSelectAll(false);LRAdjustSelectNone(true);}
else{LRAdjustSelectAll(true);LRAdjustSelectNone(true);}}
function UpdateListingsSelectedZone(){if(IsAlreadySignedIn()){UpdateListingsSelectedZoneForSignedInUser();}
else{UpdateListingsSelectedZoneForNotSignedInUser();}}
function UpdateListingsSelectedZoneForSignedInUser(){var newSelectedListingsText="";var nochecked=GetNumberOfSelectedListings();if(nochecked==0){newSelectedListingsText='(no listings selected, '+existingClaimsCount+' existing claims)';}
else if(nochecked==1){newSelectedListingsText='(1 listing selected, '+existingClaimsCount+' existing claims)';}
else{newSelectedListingsText='('+nochecked+' listings selected, '+existingClaimsCount+' existing claims)';}
$('#spnSelectedListings').html(newSelectedListingsText);}
function UpdateListingsSelectedZoneForNotSignedInUser(){var newSelectedListingsText="";var nochecked=GetNumberOfSelectedListings()+existingClaimsCount;if(nochecked==0){newSelectedListingsText='(no listings selected)';}
else if(nochecked==1){newSelectedListingsText='(1 listing selected)';}
else{newSelectedListingsText='('+nochecked+' listings selected)';}
$('#spnSelectedListings').html(newSelectedListingsText);}
function UpdateClaimListingsZone() {var noselected=GetNumberOfSelectedListings();if(noselected==0) {$('#btnClaimListings').attr('disabled', true);}else{$('#btnClaimListings').attr('disabled', false);}}
function UpdateCheckboxesZone(){var $items=$('#recommend_listings :checkbox');$.each($items, function(ix, obj) {if(CheckIfReachedMaximumAllowedListings()){if($(obj).is(':checked')==false){$(obj).attr('disabled', true);}}
else{$('#recommend_listings :checkbox').attr('disabled', false);}});}
function GetNumberOfCheckedListings() {return $('#recommend_listings :checked').length;}
function GetNumberOfSelectedListings() {return $('#spnSelectedListingsContainer span').length;}
function S2AdjustSelectAll(activate) {if(activate) {$('#ctrlAll').replaceWith('<a id=\'ctrlAll\' href=\'javascript:void(0)\' onclick=\'S2selectAllHandler();OmAgentInt(this,null,null,\"Claim a Listing : Step 2 : Select All\");\'>All</a>');}else{$('#ctrlAll').replaceWith('<span id=\'ctrlAll\' class=\'none\'>All</span>');}}
function S2AdjustSelectNone(activate) {if(activate) {$('#ctrlNone').replaceWith('<a id=\'ctrlNone\' href=\'javascript:void(0)\' onclick=\'S2selectNoneHandler();OmAgentInt(this,null,null,\"Claim a Listing : Step 2 : Select None\");\'>None</a>');}else{$('#ctrlNone').replaceWith('<span id=\'ctrlNone\' class=\'none\'>None</span>');}}
function LRAdjustSelectAll(activate) {if(activate) {$('#ctrlAll').replaceWith('<a id=\'ctrlAll\' href=\'javascript:void(0)\' onclick=\'LRselectAllHandler();OmAgentInt(this,null,null,\"Agent Profile : My Listings : Listings Recommendation : Select All\");\'>All</a>');}else{$('#ctrlAll').replaceWith('<span id=\'ctrlAll\' class=\'none\'>All</span>');}}
function LRAdjustSelectNone(activate) {if(activate) {$('#ctrlNone').replaceWith('<a id=\'ctrlNone\' href=\'javascript:void(0)\' onclick=\'LRselectNoneHandler();OmAgentInt(this,null,null,\"Agent Profile : My Listings : Listings Recommendation : Select None\");\'>None</a>');}else{$('#ctrlNone').replaceWith('<span id=\'ctrlNone\' class=\'none\'>None</span>');}}
function CheckIfReachedMaximumAllowedListings(){var noselected=GetNumberOfSelectedListings();if(noselected>=maximumAllowedListings){return true;}
return false;}
function ShowUnregisteredUserMaximumClaimsReachedModalWindow(){Facebook.Confirmation_Error_Modal("<div>You have selected the maximum number</div><div>of "+maximumAllowedListings+" listings available in this process.</div>", "Maximum Reached");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);};;(function($) {if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)) {alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);return;}
$.fn._fadeIn=$.fn.fadeIn;var noOp=function() {};var mode=document.documentMode||0;var setExpr=$.browser.msie && (($.browser.version<8 && !mode)||mode<8);var ie6=$.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;$.blockUI=function(opts) { install(window, opts); };$.unblockUI=function(opts) { remove(window, opts); };$.growlUI=function(title, message, timeout, onClose) {var $m=$('<div class="growlUI"></div>');if(title) $m.append('<h1>'+title+'</h1>');if(message) $m.append('<h2>'+message+'</h2>');if(timeout==undefined) timeout=3000;$.blockUI({message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,timeout: timeout, showOverlay: false,onUnblock: onClose,css: $.blockUI.defaults.growlCSS});};$.fn.block=function(opts) {return this.unblock({ fadeOut: 0 }).each(function() {if($.css(this,'position')=='static')
this.style.position='relative';if($.browser.msie)
this.style.zoom=1;install(this, opts);});};$.fn.unblock=function(opts) {return this.each(function() {remove(this, opts);});};$.blockUI.version=2.35;$.blockUI.defaults={message:  '<h1>Please wait...</h1>',title: null,draggable: true,theme: false,css: {padding:	0,margin:		0,width:		'30%',top:		'40%',left:		'35%',textAlign:	'center',color:		'#000',border:		'3px solid #aaa',backgroundColor:'#fff',cursor:		'wait'},themedCSS: {width:	'30%',top:	'40%',left:	'35%'},overlayCSS:  {backgroundColor: '#000',opacity:	  	 0.3},growlCSS: {width:  	'350px',top:		'10px',left:   	'',right:  	'10px',border: 	'none',padding:	'5px',opacity:	0.6,cursor: 	'default',color:		'#fff',backgroundColor: '#000','-webkit-border-radius': '10px','-moz-border-radius':	 '10px','border-radius': 		 '10px'},iframeSrc: /^https/i.test(window.location.href||'') ? 'javascript:false' : 'about:blank',forceIframe: false,baseZ: 1000,centerX: true,centerY: true,allowBodyStretch: true,bindEvents: true,constrainTabKey: true,fadeIn:  200,fadeOut:  400,timeout: 0,showOverlay: true,focusInput: true,applyPlatformOpacityRules: true,onBlock: null,onUnblock: null,quirksmodeOffsetHack: 4,blockMsgClass: 'blockMsg'};var pageBlock=null;var pageBlockEls=[];function install(el, opts) {var full=(el==window);var msg=opts && opts.message!==undefined ? opts.message : undefined;opts=$.extend({}, $.blockUI.defaults, opts||{});opts.overlayCSS=$.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS||{});var css=$.extend({}, $.blockUI.defaults.css, opts.css||{});var themedCSS=$.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS||{});msg=msg===undefined ? opts.message : msg;if(full && pageBlock)
remove(window, {fadeOut:0});if(msg && typeof msg!='string' && (msg.parentNode||msg.jquery)) {var node=msg.jquery ? msg[0] : msg;var data={};$(el).data('blockUI.history', data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)
data.parent.removeChild(node);}
var z=opts.baseZ;var lyr1=($.browser.msie||opts.forceIframe)? $('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>'): $('<div class="blockUI" style="display:none"></div>');var lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var lyr3, s;if(opts.theme && full) {s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">'+'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>';}
else if(opts.theme) {s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">'+'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>';}
else if(full) {s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';}else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';}
lyr3=$(s);if(msg) {if(opts.theme) {lyr3.css(themedCSS);lyr3.addClass('ui-widget-content');}
else
lyr3.css(css);}
if(!opts.applyPlatformOpacityRules||!($.browser.mozilla && /Linux/.test(navigator.platform)))
lyr2.css(opts.overlayCSS);lyr2.css('position', full ? 'fixed' : 'absolute');if($.browser.msie||opts.forceIframe)
lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3], $par=full ? $('body') : $(el);$.each(layers, function() {this.appendTo($par);});if(opts.theme && opts.draggable && $.fn.draggable) {lyr3.draggable({handle: '.ui-dialog-titlebar',cancel: 'li'});}
var expr=setExpr && (!$.boxModel||$('object,embed', full ? null : el).length>0);if(ie6||expr) {if(full && opts.allowBodyStretch && $.boxModel)
$('html,body').css('height','100%');if((ie6||!$.boxModel) && !full) {var t=sz(el,'borderTopWidth'), l=sz(el,'borderLeftWidth');var fixT=t ? '(0 - '+t+')' : 0;var fixL=l ? '(0 - '+l+')' : 0;}
$.each([lyr1,lyr2,lyr3], function(i,o) {var s=o[0].style;s.position='absolute';if(i<2) {full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+')+"px"'): s.setExpression('height','this.parentNode.offsetHeight+"px"');full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth||document.body.clientWidth+"px"'): s.setExpression('width','this.parentNode.offsetWidth+"px"');if(fixL) s.setExpression('left', fixL);if(fixT) s.setExpression('top', fixT);}
else if(opts.centerY) {if(full) s.setExpression('top','(document.documentElement.clientHeight||document.body.clientHeight) / 2 - (this.offsetHeight / 2)+(blah=document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)+"px"');s.marginTop=0;}
else if(!opts.centerY && full) {var top=(opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)+'+top+')+"px"';s.setExpression('top',expression);}});}
if(msg) {if(opts.theme)
lyr3.find('.ui-widget-content').append(msg);else
lyr3.append(msg);if(msg.jquery||msg.nodeType)
$(msg).show();}
if(($.browser.msie||opts.forceIframe) && opts.showOverlay)
lyr1.show();if(opts.fadeIn) {var cb=opts.onBlock ? opts.onBlock : noOp;var cb1=(opts.showOverlay && !msg) ? cb : noOp;var cb2=msg ? cb : noOp;if(opts.showOverlay)
lyr2._fadeIn(opts.fadeIn, cb1);if(msg)
lyr3._fadeIn(opts.fadeIn, cb2);}else{if(opts.showOverlay)
lyr2.show();if(msg)
lyr3.show();if(opts.onBlock)
opts.onBlock();}
bind(1, el, opts);if(full) {pageBlock=lyr3[0];pageBlockEls=$(':input:enabled:visible',pageBlock);if(opts.focusInput)
setTimeout(focus, 20);}
else
center(lyr3[0], opts.centerX, opts.centerY);if(opts.timeout) {var to=setTimeout(function() {full ? $.unblockUI(opts) : $(el).unblock(opts);}, opts.timeout);$(el).data('blockUI.timeout', to);}};function remove(el, opts) {var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to) {clearTimeout(to);$el.removeData('blockUI.timeout');}
opts=$.extend({}, $.blockUI.defaults, opts||{});bind(0, el, opts);var els;if(full)
els=$('body').children().filter('.blockUI').add('body>.blockUI');else
els=$('.blockUI', el);if(full)
pageBlock=pageBlockEls=null;if(opts.fadeOut) {els.fadeOut(opts.fadeOut);setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);}
else
reset(els, data, opts, el);};function reset(els,data,opts,el) {els.each(function(i,o) {if(this.parentNode)
this.parentNode.removeChild(this);});if(data && data.el) {data.el.style.display=data.display;data.el.style.position=data.position;if(data.parent)
data.parent.appendChild(data.el);$(el).removeData('blockUI.history');}
if(typeof opts.onUnblock=='function')
opts.onUnblock(el,opts);};function bind(b, el, opts) {var full=el==window, $el=$(el);if(!b && (full && !pageBlock||!full && !$el.data('blockUI.isBlocked')))
return;if(!full)
$el.data('blockUI.isBlocked', b);if(!opts.bindEvents||(b && !opts.showOverlay))
return;var events='mousedown mouseup keydown keypress';b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);};function handler(e) {if(e.keyCode && e.keyCode==9) {if(pageBlock && e.data.constrainTabKey) {var els=pageBlockEls;var fwd=!e.shiftKey && e.target==els[els.length-1];var back=e.shiftKey && e.target==els[0];if(fwd||back) {setTimeout(function(){focus(back)},10);return false;}}}
var opts=e.data;if($(e.target).parents('div.'+opts.blockMsgClass).length>0)
return true;return $(e.target).parents().children().filter('div.blockUI').length==0;};function focus(back) {if(!pageBlockEls)
return;var e=pageBlockEls[back===true ? pageBlockEls.length-1 : 0];if(e)
e.focus();};function center(el, x, y) {var p=el.parentNode, s=el.style;var l=((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');var t=((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');if(x) s.left=l>0 ? (l+'px') : '0';if(y) s.top=t>0 ? (t+'px') : '0';};function sz(el, p) {return parseInt($.css(el,p))||0;};})(jQuery);;var cartNavigateAwayMessage="Are you sure you want to navigate away?";function ShowChangeBillingShippingInfoModal(isBilling, commit) {DisableNavigateAwayMessage();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/BillingShippingHtml.ashx?isBilling="+isBilling+"&isModal=true&commit="+commit+"&timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowBillingShippingSuccessModal(isBilling) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/BillingShippingSuccessModal.ashx?isBilling="+isBilling+"&timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowExpiredCardModal() {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/ExpiredCardModal.ashx?timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowRemoveItemFromOrderModal(ix) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/RemoveItemFromOrderModal.ashx?ix="+ix+"&timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();$('.btn-submit').blur();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowRemoveAlertModal(alertId) {if(readCookie('DoNotShowRemoveAlertModal')!='true') {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/RemoveAlertModal.ashx?alertId="+alertId+"&timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}else{RemoveAlert(alertId);}}
function ShowCreditSubscriptionsModal() {CloseAllModals();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/CreditSubscriptionsModal.ashx?timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowCancelChangeSubscriptionModal(itemId, cancel, success) {CloseAllModals();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/CancelChangeSubscriptionModal.ashx?itemId="+itemId+"&cancel="+cancel+"&success="+success+"&timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();if(!success) {window.PwdValidator=new PasswordValidator('#password_container', 3);HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields('#password_container');}},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowCannotDowngradeSubscriptionModal() {CloseAllModals();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/CannotDowngradeSubscriptionModal.ashx?timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function CloseAllModals() {Facebook.Modal_Close();Facebook.fadeOutBackground();}
function ShowCvvCode(){$(".input-info").click(function(e){$(".cvv-tooltip").show();});$('body').click(function(e) {if(!($(e.target).is('.input-info a')) && !($(e.target).is('.cvv-tooltip')) && !($(e.target).is('.cvv-tooltip h3')) && !($(e.target).is('.cvv-tooltip p'))) {$('.cvv-tooltip').hide();};});}
function ChangeBillingInfo(commit) {if(ValidateBillingInfo()) {$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/ChangeBillingShippingInfo.ashx?isBilling=true&commit="+commit+"&timestamp="+GetTimestamp(),data: $('#b-info-modal *').serialize(),success: function(output) {$('#b-info').replaceWith(output);Facebook.Modal_Close(); Facebook.fadeOutBackground();if(commit) {ShowBillingShippingSuccessModal(true);}
$('#isBillingDetailChanged').val('true');},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}}
function ChangeShippingInfo(commit) {if(ValidateShippingInfo()) {$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/ChangeBillingShippingInfo.ashx?isBilling=false&commit="+commit+"&timestamp="+GetTimestamp(),data: $('#s-info-modal *').serialize(),success: function(output) {$('#s-info').replaceWith(output);Facebook.Modal_Close(); Facebook.fadeOutBackground();if(commit) {ShowBillingShippingSuccessModal(false);}
$('#isShippingDetailChanged').val('true');},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}}
function TryAddUpdateBillingShippingInfo() {var isNewDetail=$('#isNewBillingShippingDetail').val()=='true' ? true : false;if(isNewDetail) {if(ValidateBillingShippingInfo(true, false)) {AddUpdateBillingShippingInfo(isNewDetail);}}else{AddUpdateBillingShippingInfo(isNewDetail);}}
function AddUpdateBillingShippingInfo(isNewDetail) {var updateBillingInfo=true;var updateShippingInfo=true;if(!isNewDetail) {if($('#isBillingDetailChanged').val()!='true')
updateBillingInfo=false;if($('#isShippingDetailChanged').val()!='true')
updateShippingInfo=false;}
$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/AddUpdateAllBillingShippingInfo.ashx?timestamp="+GetTimestamp(),data: $('#b-info *').serialize()+"&"+$('#s-info *').serialize()+"&updateBillingInfo="+updateBillingInfo+"&updateShippingInfo="+updateShippingInfo,success: function(output) {Facebook.Modal_Close(); Facebook.fadeOutBackground();ShowBillingShippingSuccessModal(true);if(isNewDetail) {window.location.reload();}},error: function(jqXHR, textStatus, errorThrown) {Facebook.Confirmation_Error_Modal(jqXHR.responseText, "Change Billing/Shipping Info Error");OutputToConsole(jqXHR.responseText);}});}
function RemoveItemFromOrder(ix) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/RemoveItemFromOrder.ashx?ix="+ix+"&timestamp="+GetTimestamp(),data: "",success: function(data) {HandleCartPage(data);AttachQuantityInputEvents();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function RecalculateOrder(ix, qty) {DisableNavigateAwayMessage();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/RecalculateOrder.ashx?ix="+ix+"&qty="+qty+"&timestamp="+GetTimestamp(),data: "",success: function(data) {HandleCartPage(data);AttachQuantityInputEvents();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ProductAutoRenew(idListing, autoRenew) {$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/ProductAutoRenew.ashx?timestamp="+GetTimestamp(),data: {idListing: idListing,autoRenew: autoRenew},success: function(data) {},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ValidateItemQuantity(ix, qty) {var retVal=1;if(!isNaN(qty)) {retVal=parseInt(qty);}
return retVal;}
function HandleCartPage(data) {if(typeof (data)!="undefined") {$('#orderSection').replaceWith(data);}
if($('.order-info tr').length<=2) {var OrderHTML="<h2>Order Information</h2><div class='inside-box'>There is nothing in your shopping cart.<br /><a href='http://www.frontdoor.com/pro/credits/dashboard'>Click here to return to Your Credits.</a></div>";$('#orderSection').after(OrderHTML);$('#orderSection').remove();$('#b-info, #p-code, #sign_up').hide();DisableNavigateAwayMessage();}}
function TrySubmitOrder() {DisableNavigateAwayMessage();var isNewDetail=$('#isNewBillingShippingDetail').val()=='true' ? true : false;if(isNewDetail) {if(ValidateBillingShippingInfo(false, true)) {SubmitOrder();}}else{SubmitOrder();}}
function SubmitOrder() {SetLoaderVisibility(true, 'loadingconnect', null, SubmitFadeOut);$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/SubmitOrder.ashx?timestamp="+GetTimestamp(),data: $('#BillingShippingInfo').serialize(),success: function(data) {var result=$.parseJSON(data);if(result.Success==true){document.location=result.RedirectUrl+"?CBSRTransactionId="+result.RequestId;}
SetLoaderVisibility(false, 'loadingconnect', null, SubmitFadeIn);},error: function(jqXHR, textStatus, errorThrown) {if(jqXHR.responseText.toLowerCase().indexOf('expired')!=-1) {ShowExpiredCardModal();}else{Facebook.Confirmation_Error_Modal("There was an issue processing your order. Please try again or contact your bank.", "Oops!");}
SetLoaderVisibility(false, 'loadingconnect', null, SubmitFadeIn);OutputToConsole(jqXHR.responseText);}});}
function ValidateBillingShippingInfo(includeShipping, includeTerms) {var isValid=true;if(!ValidateBillingInfo())
isValid=false;if(includeShipping && !$('#shippingSameAsBilling').is(':checked') && !ValidateShippingInfo()) {isValid=false;}
if(includeTerms && !ValidateTerms()) {isValid=false;}
return isValid;}
function ValidateBillingInfo() {var isValid=true;if(!ValidateElement("#billingFirstname"))
isValid=false;if(!ValidateElement("#billingLastname"))
isValid=false;if(!ValidateElement("#billingCardType"))
isValid=false;if(!ValidateElement("#billingCardNumber", ValidateCreditCard))
isValid=false;if(!ValidateElement("#billingCSV"))
isValid=false;if(!ValidateElement("#billingExpirationDate", CheckExpirationDate))
isValid=false;if(!ValidateElement("#billingPhone", ValidatePhoneNumber))
isValid=false;if(!ValidateElement("#billingAddress1"))
isValid=false;if(!ValidateElement("#billingCity"))
isValid=false;if(!ValidateElement("#billingState"))
isValid=false;if(!ValidateElement("#billingZip", ValidateZip))
isValid=false;return isValid;}
function ValidateCreditCard(id) {$(id).val($(id).val().replace(/\s/g,''));var card=$(id).val();if(ValidateCreditCardLUHN(card))
return true;return false;}
function CheckExpirationDate(id) {var RegExDate=/^\d\d?\/\d{4}$/;var date=$(id).val();if(date.indexOf('/')==-1) {var ix=0;if(date.length==5) {ix=1;}
else if(date.length==6) {ix=2;}
date=date.substring(0, ix)+'/'+date.substring(ix);$(id).val(date);}
if(RegExDate.test(date)) {var dateParts=date.split('/');var theMonth=parseInt(dateParts[0]);var theYear=parseInt(dateParts[1]);var currentDate=new Date();if(theYear<currentDate.getFullYear()||(theYear==currentDate.getFullYear() && theMonth<=currentDate.getMonth()+1))
return false;if(parseInt(theMonth)<=12)
return true;else
return false;}
return false;}
function ValidatePhoneNumber(id) {var error="";var phoneNumber=$(id).val();var stripped=phoneNumber.replace(/[\(\)\.\-\s]/g, '');if(phoneNumber=="") {return false;} else if(isNaN(parseInt(stripped))) {return false;} else if(!(stripped.length==10)) {return false;}
return true;}
function ValidateShippingInfo() {var isValid=true;if(!ValidateElement("#shippingAddress1"))
isValid=false;if(!ValidateElement("#shippingCity"))
isValid=false;if(!ValidateElement("#shippingState"))
isValid=false;if(!ValidateElement("#shippingZip"))
isValid=false;return isValid;}
function ValidateElement(id, delegate) {var isValid=true;if($(id).val()==$(id).attr('default_value')||$(id).val()==""||(typeof (delegate)!="undefined") && delegate(id)==false) {$(id).addClass("input-error");$(id+"Error").show();isValid=false;}else{$(id).removeClass("input-error");$(id+"Error").hide();}
return isValid;}
function ValidateTerms() {var isValid=true;if(!$('#fdTerms').is(':checked')) {$("#fdTermsError").show();isValid=false;}else{$("#fdTermsError").hide();}
return isValid;}
var promoCodeAttempts=0;function ValidatePromoCode(sourcePage) {var pc=$('#promoCode').val();$("#promoCodeError").hide();if(pc.length>0) {promoCodeAttempts++;if(promoCodeAttempts<3) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/PromoCodeTest.ashx?promoCode="+pc+"&sourcePage="+sourcePage+"&attempts="+promoCodeAttempts+"&timestamp="+GetTimestamp(),datatype: "json",success: function(response) {var objResponse=jQuery.parseJSON(response);if(objResponse!=null) {if(objResponse.promoApplied=="true") {$('#promoCodeError').removeClass("valid_error");$('#promoCodeError').addClass("valid_code");$('em.check').show();$("#promoCode").attr("disabled", objResponse.disablePromoButton);$("#promoCode-button").attr("disabled", objResponse.disablePromoButton);$("#promoCode-button").addClass('disabled');if(sourcePage=='settings') {RefreshAgentToolsButtonBar();}else{RecalculateOrder($(".input-qty").attr("ix"), $(".input-qty").val());}}else{$('#promoCodeError').removeClass("valid_code");$('#promoCodeError').addClass("valid_error");$('#promoCode').addClass("input-error");}
$('#promoCodeError').html(objResponse.message);$('#promoCodeError').show();}},error: function(jqXHR, textStatus, errorThrown) {$('#promoCodeError').html(jqXHR.responseText);$('#promoCodeError').show();}});}else{$('#promoCodeError').removeClass("valid_code");$('#promoCodeError').addClass("valid_error");$('#promoCodeError').html("Number of attempts exceed. The promo code could not be applied. Please click \"Submit my Order\" to continue.");$('#promoCodeError').show();$("#promoCode").attr("disabled", true);$("#promoCode-button").attr("disabled", true);$("#promoCode-button").addClass('disabled');}}}
function BuyCreditItem(itemId, Quantitiy) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/BuyCreditItem.ashx?itemId="+itemId+"&Qty="+Quantitiy+"&timestamp="+GetTimestamp(),data: "",success: function(data) {document.location=data;},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function TryCancelChangeSubscription(newSubscriptionItemId, cancel) {if(PwdValidator.CheckPassword()) {if(CancelChangeSubscription(newSubscriptionItemId)) {ShowCancelChangeSubscriptionModal(newSubscriptionItemId, cancel, true);}}}
function CancelChangeSubscription(newSubscriptionItemId) {var result=false;$.ajax({type: "GET",async: false,url: "/controls/AjaxCalls/Credits/CancelChangeSubscription.ashx?newSubscriptionItemId="+newSubscriptionItemId+"&timestamp="+GetTimestamp(),data: "",success: function(data) {result=true;},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});return result;}
function RemoveAlert(alertId) {if($('#cbDoNotShowRemoveAlertModal').is(':checked')) {setDoNotShowRemoveAlert('true');}
$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/RemoveAlert.ashx?alertId="+alertId+"&timestamp="+GetTimestamp(),data: "",success: function(data) {if(data!='') {$('#alertsTable').html(data);}else{$('#alertsSection').hide();}},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function PopulateShippingFromBilling() {if($('#shippingSameAsBilling').is(':checked')) {$('#shippingAddress1').val($('#billingAddress1').val());$('#shippingAddress2').val($('#billingAddress2').val());$('#shippingCity').val($('#billingCity').val());$('#shippingState').val($('#billingState').val());$('#shippingZip').val($('#billingZip').val());}}
function ClearCardData() {$('#billingCardType').val('Card');$('#billingCardNumber').val('');$('#billingCSV').val('');$('#billingExpirationDate').val('');}
function OnCloseWhatsThisCVV() {CloseAllModals();ShowChangeBillingShippingInfoModal(true, true);}
function AttachBillingInputEvents() {$("#billingFirstname, #billingLastname, #billingCardNumber, #billingCSV, #billingAddress1, #billingAddress2, #billingCity, #billingZip, #shippingAddress1, #shippingAddress2, #shippingCity, #shippingZip").live('keyup', function(event) {this.value=this.value.replace(/[\#\<\>\!\^\$\%]/g, '');});}
function fadeInCreditsBackground() {if(!GL_overlayDiv) {GL_overlayDiv=document.createElement('div');}
GL_overlayDiv.id="modalOverlayDiv";$('#global_wrap').append(GL_overlayDiv);$('#modalOverlayDiv').css('height', $("body").height());$(GL_overlayDiv).fadeTo(250, .3);$(document).keydown(Facebook.handleEscape);}
function AttachCartEvents() {AttachQuantityInputEvents();}
function AttachQuantityInputEvents() {}
$(document).ready(function() {AttachCartEvents();});function BuyMoreCredits(itemId, Quantitiy, PromoteType, ShowModal){if(Quantitiy==undefined) {Quantitiy=1;}
var MoreCreditsCookie="";if(PromoteType){if(PromoteType=="ShowstopperListing") {MoreCreditsCookie="pg=showstopper";}else{MoreCreditsCookie="pg=featured";}
var ListingsInfo="";var $inputValues=$('#active_listings .listing');$inputValues.each(function(index){if($(this).attr('checked') && !$(this).attr('disabled')){var Listing=$(this).attr('id').replace(/lst_/, '');if(PromoteType=="ShowstopperListing"){Listing+="^"+$('#ft_'+Listing).val();}
else{Listing+="^0";}
ListingsInfo+=Listing+"|";}});if(ListingsInfo.length>1) {ListingsInfo=ListingsInfo.substr(0, ListingsInfo.length-1);}
if(ShowModal==undefined){ShowModal=false;}
SaveToProductCookie("lids="+ListingsInfo+"&type="+PromoteType+"&ismodal="+ShowModal);}
SaveMoreCreditsCookie(MoreCreditsCookie);BuyCreditItem(itemId, Quantitiy);}
function ProductsLastAction(PromoteType){PLUpdateListingsSelectedZone();var PCookie=readCookie("fdc_p");if(PCookie){var PCookieType="";var PCookieListings="";var PCookieModal=false;arrTempCookie=PCookie.split('&');for (var i=0; i<arrTempCookie.length; i++) {var keyvalue=arrTempCookie[i].split('=');if(keyvalue[0]=="lids") {PCookieListings=keyvalue[1];} else if(keyvalue[0]=="type") {PCookieType=keyvalue[1];} else if(keyvalue[0]=="ismodal") {PCookieModal=keyvalue[1];}}
if(PCookieModal=="true"){if(PCookieListings.length>2 && PromoteType==PCookieType){PromoteListings(PromoteType);}}}}
function ConfirmPromoteListings(){var PromoteType=$('#promote_type').val();if(PromoteType==undefined){PromoteType="FeaturedListing";}
var Promo=$('#promo').val();if(PwdValidator.CheckPassword()) {var ListingsInfo="";var $inputValues=$('#active_listings .listing');var Quantity=0;$inputValues.each(function(index){if($(this).attr('checked') && !$(this).attr('disabled')){var ListingId=$(this).attr('id').replace(/lst_/, '');ListingsInfo+=ListingId+"^"+escape($('#Adr_'+ListingId).html())+"^"+$('#ar_'+ListingId).val();if(PromoteType=="ShowstopperListing"){ListingsInfo+="^"+($('#ft_'+ListingId).val()>0?$('#ft_'+ListingId).val():1);}
else{ListingsInfo+="^0";}
ListingsInfo+="|";Quantity=Quantity+1;}});if(ListingsInfo.length>1){ListingsInfo=ListingsInfo.substr(0, ListingsInfo.length-1);}
Facebook.Modal_Close(); Facebook.fadeOutBackground();$.ajax({type: 'POST',url: "/controls/AjaxCalls/Credits/PromoteListing.ashx?timestamp="+GetTimestamp(),data: {promo: Promo,list: ListingsInfo,qty: Quantity,type: PromoteType},success: function(response) {fadeInCreditsBackground();$(trim(response)).modal();if(response.indexOf("Oops")<0){TimeOutModal=window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();document.location.reload();},5000);}}});}}
function PromoteListings(PromoteType){var Quantity=GetSelectedListings();if(Quantity>0){if(CheckFlavors(PromoteType)){$.ajax({type: 'POST',url: "/controls/AjaxCalls/Credits/Modals/PromoteListingModal.ashx?timestamp="+GetTimestamp(),data: {action: 'confirm',qty: Quantity,type: PromoteType},success: function(response) {fadeInCreditsBackground();$(trim(response)).modal();window.PwdValidator=new PasswordValidator('#password_container', 3);HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields('#password_container');},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}}}
function CheckFlavors(PromoteType){var returnValue=true;$("#stylesErr").hide();if(PromoteType=="ShowstopperListing") {var $inputValues=$('#active_listings .flavorselect');$inputValues.each(function(index){var LID=$(this).attr('id').replace(/ft_/, '');if(!$(this).attr('disabled')){$("#flavorErr_"+LID).hide();if($('#active_listings #lst_'+LID).is(':checked')==true && $(this).val()==0){$("#flavorErr_"+LID).show();returnValue=false;}}});}
if(!returnValue){$("#stylesErr").show();}
return returnValue;}
function PasswordCheck(formID){if(formID) {active_form=formID;}else{active_form="#login_form";}
if(ValidatePasswordField(active_form) && PasswordTries<3){$.ajax({type: "POST",async:false,url: "/controls/AjaxCalls/Credits/PasswordCheck.ashx?timestamp="+GetTimestamp(),data: $(active_form+" *").serialize(),success: function(response) {PasswordTries=PasswordTries+1;if(trim(response)=="success") {PwdValid=true;}else{var SorryMsg="We're sorry, but that password is not recognized. Please try again, or click the \"forgot password\" link above.";if(PasswordTries>=3){SorryMsg="We're sorry, but you have exceeded the number of tries for entering your password. Please<a href=\"#\">contact us</a>for help.";}
$("#pwdErrLogin", active_form).html(SorryMsg);$("#pwdErrLogin", active_form).show();PwdValid=false;}},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
return ;}
function ValidatePasswordField(formID){var pwd=$('#login_password',active_form).val();if(pwd==""||pwd=="Please enter your password"||pwd=="Choose your password"){$("#pwdErrLogin",active_form).html("Please enter correct format");$("#pwdErrLogin",active_form).show();$("#modal").addClass('modal-error');return false;}
return true;}
function SaveToProductCookie(CookieValue){var exdate=new Date();exdate.setDate(exdate.getDate()+1);document.cookie="fdc_p="+CookieValue+"; expires="+exdate.toGMTString()+"; path=/";}
function SaveMoreCreditsCookie(CookieValue){var exdate=new Date();exdate.setMinutes(exdate.getMinutes()+15);document.cookie="fdc_bmla="+CookieValue+"; expires="+exdate.toGMTString()+"; path=/";}
function ReadMoreCreditsCookie(){return readCookie("fdc_bmla");}
function GetSelectedListings(){return ($('#active_listings input:checked').length - $('#active_listings input:disabled').length);}
function GetTotalListings(){return ($('#active_listings :checkbox').length - $('#active_listings input:disabled').length);}
function PLselectAllHandler() {var $items=$('#active_listings :checkbox');$.each($items, function(ix, obj){if($(obj).is(':checked')==false){$(obj).attr('checked', true);var lid=$(obj).attr("id").replace(/lst_/, '');$("#ft_"+lid+", #ar_"+lid).removeAttr("disabled");}});PLUpdateSelectAllNoneZone();PLUpdateListingsSelectedZone();PLUpdateConfirmListingsZone();}
function PLselectNoneHandler() {var $items=$('#active_listings :checkbox');$.each($items, function(ix, obj) {if($(obj).is(':checked')==true && $(obj).is(':disabled')!=true ) {$(obj).attr('checked', false);var lid=$(obj).attr("id").replace(/lst_/, '');$("#ft_"+lid+", #ar_"+lid).attr("disabled", "disabled");}});PLUpdateSelectAllNoneZone();PLUpdateListingsSelectedZone();PLUpdateConfirmListingsZone();}
function PLcheckboxClickHandler(ref) {var lid=ref.id.replace(/lst_/, '');if($(ref).is(':checked')) {$("#ft_"+lid+", #ar_"+lid).removeAttr("disabled");}else{$("#ft_"+lid+", #ar_"+lid).attr("disabled", "disabled");}
PLUpdateSelectAllNoneZone();PLUpdateListingsSelectedZone();PLUpdateConfirmListingsZone();}
function PLUpdateConfirmListingsZone() {var noselected=GetSelectedListings();}
function PLUpdateSelectAllNoneZone(){var noChecked=GetSelectedListings();if(noChecked==0){PLAdjustSelectAll(true);PLAdjustSelectNone(false);}
else if(noChecked==GetTotalListings){PLAdjustSelectAll(false);PLAdjustSelectNone(true);}
else{PLAdjustSelectAll(true);PLAdjustSelectNone(true);}}
function PLAdjustSelectAll(activate) {if(activate) {$('#ctrlAll').replaceWith('<a id=\'ctrlAll\' href=\'javascript:void(0)\' onclick=\'PLselectAllHandler();\'>All</a>');}else{$('#ctrlAll').replaceWith('<span id=\'ctrlAll\' class=\'none\'>All</span>');}}
function PLAdjustSelectNone(activate) {if(activate) {$('#ctrlNone').replaceWith('<a id=\'ctrlNone\' href=\'javascript:void(0)\' onclick=\'PLselectNoneHandler();\'>None</a>');}else{$('#ctrlNone').replaceWith('<span id=\'ctrlNone\' class=\'none\'>None</span>');}}
function PLUpdateListingsSelectedZone(){var newSelectedListingsText="";var nochecked=GetSelectedListings();if(nochecked==0){newSelectedListingsText='no listings selected';$('#active_listings_btns .btn-submit-disabled').show();$('#active_listings_btns .btn-submit').css('display', 'none');}else{$('#active_listings_btns .btn-submit-disabled').hide();$('#active_listings_btns .btn-submit').css('display', 'inline-block');if(nochecked==1){newSelectedListingsText='1 listing selected';}
else{newSelectedListingsText=nochecked+' listings selected';}}
$('#spnSelectedListings').html(newSelectedListingsText);$('.selected_listings').html(GetSelectedListings());}
function openPrintReceipt(){window.open("/pro/credits/print-order","newwindow","menubar=1,resizable=1,width=640,height=500");}
$(document).ready(function() {ClearCardData();});;