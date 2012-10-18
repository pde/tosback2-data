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
return false;};};var Facebook=new Fbook("Facebook");var facebookDebug=false;var TmpFBId;if(typeof FDWebRoot=='undefined') {var FDWebRoot="";}
function Fbook(ObjectInstanceName) {if(facebookDebug) { OutputToConsole("Executing Fbook"); }
var status_msg="";var full_name="";var gl_status="";var first_name="";var fbook_avatar="";var fbStatus;var email_hash;var facebook_uid;}
var TimeOutModal;Facebook.Login=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.Login"); }
with (this) {FB.login(function (response) {if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function () {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"));}, 2000)}else{Facebook.Modal_Close();Facebook.fadeOutBackground();LogInConnectedUser(true);window.setTimeout(function () {var pageRedirect=readTempCookie("page");if(pageRedirect!=null && pageRedirect.length>0) {window.location.href="http://"+pageRedirect;}else{if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {window.location.href=FDWebRoot+"/pro/account/editprofile/";}
else if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==1) {window.location.href=FDWebRoot+"/account/recent-activity/";}else{window.location.href=SSLRoot+"/login";}}}, 2000);}}}, { scope: 'publish_stream,email', enable_profile_selector: 1 });};}
Facebook.Register_Login=function () {FB.login(function () { }, { scope: 'publish_stream,email', enable_profile_selector: 1 });}
Facebook.Login_Share=function (IdListing, shareType, sharedURL, title, metadescription) {if(facebookDebug) { OutputToConsole("Executing Facebook.Login_Share"); }
var shortURL=GetShortURL(sharedURL);var thumbnail=staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";with (this) {Facebook.Modal_Close();FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {if(facebookDebug) { OutputToConsole("Executing Facebook.Login_Share"); }
var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false);}else{FB.login(function (response) {if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function () {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function () {LogInConnectedUser(false);}, 2000);}
var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}})}});Facebook.fadeOutBackground();};}
Facebook.OnLogin=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.OnLogin"); }
with (this) {if(document.getElementById('HomeFacebookBanner')!=null) {DisplayNotificationBanner()}
if(document.getElementById('ctl00_FacebookStatusDialog1_status_message')!=null) {fbStatus=document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML;}
window.setTimeout(function () {Facebook.User_GetInfo();}, 300);}}
Facebook.Logout=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.Logout"); }
with (this) {Facebook.Modal_Close();TmpFBId=FB.getAuthResponse().userID;FB.logout(function () { LogoutMyFrontdoor(); PopupMessage(IsAlreadySignedIn()); ToggleComponents(); });}}
Facebook.Toggle_Component_States=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.Toggle_Component_States"); }
with (this) {window.setTimeout(function () {if(document.getElementById("status-wrap")!=null) {document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block";}
if(document.getElementById("HomeFacebookBanner")!=null) {DisplayNotificationBanner()}
if(document.getElementById("LinkAcctNote")!=null) {document.getElementById("LinkAcctNote").style.display="none";}
if(document.getElementById("log_in_wrapper")) {document.getElementById("log_in_wrapper").style.display="block";Facebook.loginHeaderWidth();}
if(window.location.href.indexOf('/my-folders')!=-1||window.location.href.indexOf('/settings')!=-1||window.location.href.indexOf('/facebook')!=-1||window.location.href.indexOf('/recent-activity')!=-1||window.location.href.indexOf('/register')!=-1||window.location.href.indexOf("/MyFolders.aspx")!=-1) {if(IsAlreadySignedIn()) {if(gE("settings")) {gE("settings").innerHTML="<a href=\""+SSLRoot+"/account/settings/\">Settings</a>";if(window.location.href.indexOf('settings')!=-1) {gE("settings").innerHTML="Settings";}}}else{if(gE("settings")) {gE("settings").innerHTML="<a href=\""+SSLRoot+"/account/register-facebook/\">Settings</a>";}
if(window.location.href.indexOf('settings')!=-1) {window.location=SSLRoot+"/account/register-facebook/";}}}
if(document.getElementById("NavTabs")) {$(function () {var $share=$('.share');$share.each(function () {$(this).removeClass();$(this).addClass('share');});});}}, 300);}}
Facebook.User_GetInfo=function () {if(facebookDebug) { OutputToConsole("Execute Facebook.User_GetInfo"); }
var isSessionRunning=false;FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {isSessionRunning=true;var query=FB.Data.query('select first_name, last_name, pic_square, profile_url, email_hashes from user where uid={0}',FB.getAuthResponse().userID);query.wait(function (response) {if(response.length>0) {ShowHeader(response);ShowStatusDialog(response);ShowFacebookForRegistrationPage(response);SetFacebookGlobalVariables(response);ShowLoggedInLoggedOutStates();ShowMessagesForMyFrontDoor(response);ShowConnectMessages(response);ShareButtons();ShowFacebookForFBTabPage(response);LogIntoMyFrontDoor();HideLoadingDiv();}});}
IsSessionActive(isSessionRunning);});function ShareButtons() {if(facebookDebug) { OutputToConsole("Executing ShareButtons"); }
if(document.getElementById("NavTabs")) {$(function () {var $fbshare=$('.fbshare_sm');var $share=$('.share');$fbshare.each(function (index) {$(".fbshare_sm").show();});$share.each(function () {$(this).removeClass();$(this).addClass('share_sm');});$(".right.shareall").hide();$(".fbshareall").show();$("#FB-Reg-LoggedIn").show();});}}
function HideLoadingDiv() {var divLoading=gE("loading");if(divLoading!=null)
divLoading.style.display="none";}
function ShowHeader(result) {if(facebookDebug) { OutputToConsole("ShowHeader: "+result); }
if(document.getElementById("user-photo")!=null) {var fb_user_image=result[0].pic_square;if(fb_user_image==''||fb_user_image==null) {fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img height="35" width="35" border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("user-photo").innerHTML=html;document.getElementById("FB_in").style.display="block";if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {gE("my_fb").href="/pro/account/dashboard";}else{gE("my_fb").href="/account/recent-activity/";}
document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";document.getElementById("log_in_wrapper").style.display="block";html='<a href="'+result[0].profile_url+'" target="_blank">';html+=result[0].first_name;html+='</a>';document.getElementById("FacebookName").innerHTML=html;Facebook.loginHeaderWidth();}}
function ShowConnectMessages(result) {window.setTimeout(function () {if(document.getElementById("FacebookNameConnect")!=null) {var fb_user_image2=result[0].pic_square;if(fb_user_image2=='') {fb_user_image2='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img  border="0" src="'+fb_user_image2+'">';html+='</a>';document.getElementById("user-photo2").innerHTML=html;document.getElementById("FacebookNameConnect").innerHTML="<strong>"+result[0].first_name+"</strong>"}}, 3000);}
function ShowStatusDialog(result) {if(document.getElementById("status-photo")!=null) {var fb_user_image=result[0].pic_square;if(fb_user_image=='') {fb_user_image='/images/facebook/50x50_noavatar.gif';}
document.getElementById("status-wrap").style.display="block";document.getElementById("status-wrap-connect").style.display="none";html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("status-photo").innerHTML=html;full_name=result[0].first_name;status_msg=document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML;if(status_msg.substring(0, status_msg.indexOf(" "))=="is") {document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML=full_name+" "+status_msg}else{document.getElementById("ctl00_FacebookStatusDialog1_status_message").innerHTML=status_msg}}}
function ShowFacebookForRegistrationPage(result) {if(facebookDebug) { OutputToConsole("Executing ShowFacebookForRegistrationPage"); }
if(document.getElementById("FB-Reg-LoggedIn")!=null) {var fb_user_image=result[0].pic_square;if(fb_user_image=='') {fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<span class="fb_icon"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';if(document.getElementById("FB-Reg-Not-LoggedIn")!=null) {document.getElementById("FB-Reg-Not-LoggedIn").style.display="none";}
document.getElementById("FB-Reg-LoggedIn").style.display="block";if(document.getElementById("Reg_Status")!=null) {document.getElementById("Reg_Status").innerHTML="Your Facebook Account"}
if(document.getElementById("Reg_Success")) {document.getElementById("Reg_Success").style.display="none"}
document.getElementById("Reg_Avatar").innerHTML=html;if(document.getElementById("Reg_Optional")) {document.getElementById("Reg_Optional").style.display="none";}
html='<a href="'+result[0].profile_url+'" target="_blank">'
html+=result[0].first_name+" "+result[0].last_name
html+='</a>';document.getElementById("Reg_Name").innerHTML=html;$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output=="success") {if(!IsAlreadySignedIn()) {}}else{if(!IsAlreadySignedIn()) {if(gE("first_name")) {document.getElementById("first_name").value=result[0].first_name;}
if(gE("last_name")) {document.getElementById("last_name").value=result[0].last_name}
if(gE("agent_fname")) {document.getElementById("agent_fname").value=result[0].first_name;}
if(gE("agent_lname")) {document.getElementById("agent_lname").value=result[0].last_name;}}}}});});}
if(window.location.href.indexOf('/my-folders')!=-1||window.location.href.indexOf('/settings')!=-1||window.location.href.indexOf('/facebook')!=-1||window.location.href.indexOf('/recent-activity')!=-1||window.location.href.indexOf("/MyFolders.aspx")!=-1) {$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output!="success") {if(!IsAlreadySignedIn()) {if(gE("settings")) {gE("settings").innerHTML="<a href=\""+SSLRoot+"/account/register-facebook/\">Settings</a>";}
if(window.location.href.indexOf('settings')!=-1) {window.location=SSLRoot+"/account/register-facebook/"}}}}});});}}
function ShowFacebookForFBTabPage(result) {if(facebookDebug) { OutputToConsole("Executing ShowFacebookForFBTabPage"); }
if(document.getElementById("FB-Tab-LoggedIn")!=null) {var fb_user_image=result[0].pic_square;if(fb_user_image=='') {fb_user_image='/images/facebook/35x35_noavatar.gif';}
html='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img border="0" src="'+fb_user_image+'">';html+='</a>';document.getElementById("FB-Tab-Not-LoggedIn").style.display="none";document.getElementById("FB-Tab-LoggedIn").style.display="block";document.getElementById("Tab_Avatar").innerHTML=html;html='<strong>'
html+=result[0].first_name+" "+result[0].last_name
html+='</strong>';document.getElementById("Tab_Name").innerHTML=html;$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output=="success") {$("#UnlinkAccounts").show();$("#fb_notification").hide();$("#FB-Tab-LoggedIn").show();$("#FB-Tab-Not-LoggedIn").hide();}else{$("#fb_notification").show();$("#FB-Tab-LoggedIn").show();$("#FB-Tab-Not-LoggedIn").hide();if(IsAlreadySignedIn()) {$("#fb_notification").hide();$("#FB-Tab-Not-LoggedIn").show();$("#FB-Tab-LoggedIn").hide();}}}});});}}
function SetFacebookGlobalVariables(result) {email_hash=result[0].email_hashes[0];facebook_uid=result[0].uid;first_name=result[0].first_name}
function ShowLoggedInLoggedOutStates() {if(facebookDebug) { OutputToConsole("ShowLoggedInLoggedOutStates"); }
if(gE("log_in_wrapper")) {FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {if(gE("FB_in")) {document.getElementById("FB_in").style.display="block";if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {gE("my_fb").href="/pro/account/dashboard";}else{gE("my_fb").href="/account/recent-activity/";}}}else{if(document.getElementById("LinkAcctNote")!=null) {document.getElementById("LinkAcctNote").style.display="block";}}});}}
function ShowMessagesForMyFrontDoor(result) {if(facebookDebug) { OutputToConsole("Executing ShowMessagesForMyFrontDoor"); }
if(document.getElementById("actor")!=null) {document.getElementById("actor").innerHTML=result[0].first_name}}
function IsSessionActive(isSessionRunning) {if(facebookDebug) { OutputToConsole("Executing IsSessionActive"); }
if(isSessionRunning=="") {isSessionRunning=false}
if(isSessionRunning==false) {if(document.getElementById("status-wrap")!=null) {document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block"}
if(document.getElementById("mfd_fb_new_account")!=null) {document.getElementById("mfd_fb_connected").style.display="none";document.getElementById("mfd_fb_new_account").style.display="block";}}
return isSessionRunning}
function LogIntoMyFrontDoor() {if(facebookDebug) { OutputToConsole("Executing LogIntoMyFrontDoor"); }
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output=="success") {if(IsAlreadySignedIn()==false) {LogInConnectedUser(false);}}}})})
function rtrim(stringToTrim) {return stringToTrim.substring(0, stringToTrim.length - 2);}}}
Facebook.Connect=function (email, pwd, showsuccess) {if(facebookDebug) { OutputToConsole("Executing Facebook.Connect"); }
with (this) {if(email==""||email=="Enter your valid e-mail address") {$("#email_input").addClass("input-error");document.getElementById("emailErrLogin").style.display="block";return false}
if(validateEmailConnect(email)==false) {$("#email_input").addClass("input-error");document.getElementById("emailErrLogin").innerHTML="Please check the format of your e-mail address and re-enter(i.e. joe@frontdoor.com).";document.getElementById("emailErrLogin").style.display="block";}
if(pwd==""||pwd=="Enter your valid e-mail address") {$("#password_input").addClass("input-error");document.getElementById("pwdErrLogin").style.display="block";return false}
if(gE("loadingconnect")) {gE("loadingconnect").style.display="block";}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/Connect_registerUsers.aspx?email="+email+"&password="+pwd+"&facebook_uid="+FB.getAuthResponse().userID,data: "",success: function (output) {if(rtrim(output)=="success"||rtrim(output).indexOf("lastaction_")>-1) {var isSessionRunning=false;FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {isSessionRunning=true;FB.api({method: 'fql.query',query: 'SELECT first_name, last_name, pic_square, profile_url, email_hashes FROM user WHERE uid='+FB.getAuthResponse().userID},function (result) {if(result.length>0) {Facebook.Modal_Close()
if(showsuccess==undefined) {Facebook.Confirmation_Modal("<strong>You've successfully linked your accounts.</strong><br/><br/>Remember, you can now use your Facebook account to log in to FrontDoor.");window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 3000);}
window.setTimeout(function () {var pageRedirect=readTempCookie("page");if(facebookDebug) { OutputToConsole("Facebook.Connect pageRedirect: "+pageRedirect); }
if(pageRedirect!=null && pageRedirect.length>0) {window.location.href="http://"+pageRedirect;}}, 3000);if(gE("FB-Tab-LoggedIn")) {gE("FB-Tab-LoggedIn").style.display="block";}
if(gE("FB-Tab-Not-LoggedIn")) {gE("FB-Tab-Not-LoggedIn").style.display="none";}
if(gE("fb_notification")) {gE("fb_notification").style.display="none";}
if(gE("UnlinkAccounts")) {gE("UnlinkAccounts").style.display="block";}}});}});}else{if(showsuccess==undefined) {Facebook.Confirmation_Modal("You've successfully linked your accounts. You can use your Facebook account to log in to FrontDoor in the future.");if(gE("FB-Tab-LoggedIn")) {gE("FB-Tab-LoggedIn").style.display="block";}
if(gE("FB-Tab-Not-LoggedIn")) {gE("FB-Tab-Not-LoggedIn").style.display="none";}
if(gE("fb_notification")) {gE("fb_notification").style.display="none";}
if(gE("UnlinkAccounts")) {gE("UnlinkAccounts").style.display="block";}
TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);}
if(document.getElementById("Oops_Error")) {window.clearTimeout(TimeOutModal)
$("#email_input").addClass("input-error");$("#password_input").addClass("input-error");document.getElementById("Oops_Error").style.display="block";document.getElementById("emailErrLogin").style.display="none";document.getElementById("pwdErrLogin").style.display="none";gE("loadingconnect").style.display="none";}}}});if(gE("loadingconnect")) {gE("loadingconnect").style.display="none";}});function rtrim(stringToTrim) {return stringToTrim.substring(0, stringToTrim.length - 2);}};function validateEmailConnect(emailTxt) {var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;str=emailTxt;str=str.replace(/ /gi, "");validateFlag=true
for (var i=0; i<str.split(",").length; i++) {if(!str.split(",")[i].match(emailRegEx)) {validateFlag=false;}}
return validateFlag}}
Facebook.Disconnect=function (email) {if(facebookDebug) { OutputToConsole("Executing Facebook.Disconnect"); }
Facebook.Modal_Close()
with (this) {$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/Connect_unRegisterUsers.aspx?email="+email,data: "",success: function (output) {if(output=="successful") {FB.logout(function () {ShowLoggedIn(true);if(gE("FB-Reg-LoggedIn")) {$("#FB-Reg-Not-LoggedIn").show();$("#FB-Reg-LoggedIn").hide();$("#Reg_Status").innerHTML="Add Your Facebook Account"
$("#Reg_Optional").show();$("#Reg_Name").innerHTML="";$("#Reg_Avatar").innerHTML="";$("#Reg_Success").hide();}
else if(gE("FB-Tab-LoggedIn")) {$("#FB-Tab-Not-LoggedIn").show();$("#FB-Tab-LoggedIn").hide();$("#fb_notification").hide();$("#UnlinkAccounts").hide();}else{$("#UnlinkAccounts").hide();}
Facebook.Confirmation_Modal("You have unlinked your FrontDoor and Facebook accounts.");window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);})}else{window.setTimeout(function () {Facebook.Confirmation_Modal("Your accounts could not be unlinked.");}, 3000)}}});});};}
Facebook.Confirmation_Modal=function (Message, Title) {if(facebookDebug) { OutputToConsole("Executing Facebook.Confirmation_Modal"); }
if(Title==undefined) {Title="";}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/successmodal.aspx?Message="+Message+"&Title="+Title,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.Credits_UpsoldWhatsThis=function (AddrDisplay, UpsoldAs) {if(facebookDebug) { OutputToConsole("Executing Facebook.Credits_UpsoldWhatsThis"); }
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/Credits_UpsoldWhatsThis.aspx?AddrDisplay="+AddrDisplay+"&UpsoldAs="+UpsoldAs,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.BMConfirmation_Modal=function (Message, Title, BMSuppress) {if(facebookDebug) { OutputToConsole("Executing Facebook.BMConfirmation_Modal"); }
if(Title==undefined) {Title="";}
if(BMSuppress==undefined) {BMSuppress=""}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/bmsuccessmodal.aspx?Message="+Message+"&Title="+Title+"&BMSuppress="+BMSuppress,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.Confirmation_Error_Modal=function (Message, Title) {if(facebookDebug) { OutputToConsole("Executing Facebook.Confirmation_Error_Modal"); }
if(Title==undefined) {Title="";}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/successmodal.aspx?Message="+Message+"&Title="+Title,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();$("#modal").addClass("modal-error");}});});}
Facebook.AgentTools_Modal=function (MessageType, MessageTitle, MessageBody, IdPhoto, Selected, IdClaim) {if(facebookDebug) { OutputToConsole("Executing Facebook.AgentTools_Modal"); }
if(IdPhoto==undefined) { IdPhoto=""; }
if(Selected==undefined) { Selected=""; }
if(IdClaim==undefined) { IdClaim=""; }
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/AgentTools-Modal.aspx?MessageType="+MessageType+"&MessageTitle="+MessageTitle+"&MessageBody="+MessageBody+"&IdPhoto="+IdPhoto+"&Selected="+Selected+"&IdClaim="+IdClaim,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.Stream_Publish=function (user_message, attachment, action_links, target_id, user_message_prompt, callback, auto_publish) {if(facebookDebug) { OutputToConsole("Executing Facebook.Stream_Publish"); }
with (this) {FB.ui({method: 'stream.publish',message: user_message,attachment: attachment,action_links: action_links,user_message_prompt: user_message_prompt}, callback);}}
Facebook.Show_PermissionDialog_Social_Commenting=function (permission) {if(facebookDebug) { OutputToConsole("Executing Facebook.Show_PermissionDialog_Social_Commenting"); }
FirstTimeLoggedIn();$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output!="success") {if(facebookDebug) { OutputToConsole("Facebook.Show_PermissionDialog_Social_Commenting Output: "+output); }
window.location.href=SSLRoot+"/login";}}});});function FirstTimeLoggedIn() {if(facebookDebug) { OutputToConsole("Executing Facebook.Show_PermissionDialog_Social_Commenting ->FirstTimeLoggedIn"); }
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsFirstTimeLoggedIn.aspx?Facebook_Uid="+FB.getAuthResponse().userID,data: "",success: function (output) {if(output=="unsuccessful") {var attachment={'description': first_name+' has just discovered HGTV\'s FrontDoor.com. With 4 million+homes for sale and thousands of real estate "how-to" articles and video, FrontDoor combines the HGTV experience with the world of real estate. See what\'s for sale near you.'};Facebook.Stream_Publish('', attachment, null, '', '', null, true)}}});});}}
Facebook.Settings_MissingInfo_Greeting=function (firstName, sourceLogo, bMissingPassword, bMissingProfileAddress) {if(facebookDebug) { OutputToConsole("Executing Facebook.Settings_MissingInfo_Greeting"); }
$.ajax({url: '/controls/ajaxcalls/facebook/Settings_MissingInfo_Greeting.aspx?firstName='+firstName+'&sourceLogo='+sourceLogo+'&bMissingPassword='+bMissingPassword+'&bMissingProfileAddress='+bMissingProfileAddress,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.Account_NoPassword=function (email, firstName, activationId, sourceName, sourceLogo) {if(facebookDebug) { OutputToConsole("Executing Facebook.Account_NoPassword"); }
$.ajax({url: '/controls/ajaxcalls/facebook/AccountLoginModal-NoPassword.aspx?email='+email+'&firstName='+firstName+'&activationId='+activationId+'&sourceName='+sourceName+'&sourceLogo='+sourceLogo,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.Account_Login=function (task, data1, data2) {if(facebookDebug) { OutputToConsole("Executing Facebook.Account_Login"); }
if(task!=undefined) {var exdate=new Date();exdate.setDate(exdate.getDate()+2);var CookieValue="a="+task;if(data1) {CookieValue+="&d1="+data1;} if(data2) {CookieValue+="&d2="+data2;}
var domainname="";if(FDWebRoot.indexOf("frontdoor.com")>-1) {domainname=".frontdoor.com";}
else if(FDWebRoot.indexOf("gabriels.net")>-1) {domainname=".gabriels.net";}
var cookieval="lgn_c="+CookieValue+";expires="+exdate.toGMTString()+"; path=/";if(domainname!="") {cookieval="lgn_c="+CookieValue+";expires="+exdate.toGMTString()+"; domain="+domainname+"; path=/";}
if(facebookDebug) { OutputToConsole(cookieval); }
document.cookie=cookieval;}
if(facebookDebug) { OutputToConsole(readCookie("lgn_c")); }
window.location.href=SSLRoot+"/login";}
Facebook.Homestyle_Login=function (task, idlisting, idaccount, agentcodestyle, idstyle, stylename) {if(facebookDebug) { OutputToConsole("Executing Facebook.Homestyle_Login"); }
$.ajax({url: "/controls/ajaxcalls/facebook/HomestyleLoginModal.aspx?task="+task+"&idlisting="+idlisting+"&idaccount="+idaccount+"&agentcodestyle="+agentcodestyle+"&idstyle="+idstyle+"&stylename="+stylename,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}
Facebook.Bookmark_Login=function (bookMarkType, Query) {if(facebookDebug) { OutputToConsole("Executing Facebook.Bookmark_Login"); }
if(bookMarkType==undefined) {bookMarkType="";}
if(Query==undefined) {Query="";}
$.ajax({url: '/controls/ajaxcalls/facebook/Bookmark_Login.aspx?bookMarkType='+bookMarkType+'&'+Query,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}
Facebook.Bookmark_Modal=function (bookMarkType, Query) {if(facebookDebug) { OutputToConsole("Executing Facebook.Bookmark_Modal"); }
if(bookMarkType==undefined) {bookMarkType="";}
if(Query==undefined) {Query="";}
var html=""
var fb_user_image=""
FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {var query=FB.Data.query('select first_name, last_name, "status", pic_square, profile_url, email_hashes from user where uid={0}',FB.getAuthResponse().userID);query.wait(function (result) {if(result.length>0) {fb_user_image=result[0].pic_square;if(fb_user_image=='') {fb_user_image='/images/facebook/35x35_noavatar.gif';}
html+='<a href="'+result[0].profile_url+'" target="_blank">';html+='<span class="rounded"></span>';html+='<img height="35" width="35" border="0" src="'+fb_user_image+'">';html+='</a>';$.ajax({url: '/controls/ajaxcalls/facebook/Bookmark_Modal.aspx?Facebook_UserId='+FB.getAuthResponse().userID+'&FirstName='+first_name+'&facebook_avatar='+fb_user_image+'&bookMarkType='+bookMarkType+'&'+Query,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields();FocusToFirstInputInModal();}});}});}});}
Facebook.ItemAlert_Modal=function (bNewAlert) {if(facebookDebug) { OutputToConsole("Executing Facebook.ItemAlert_Modal"); }
if(bNewAlert==undefined) {bNewAlert=true;}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/itemalert_modal.aspx?bNewAlert="+bNewAlert,data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}
Facebook.GetUserId=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.GetUserId"); }
var FBId=null;FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {FBId=response.authResponse.userID;}});return FBId;}
Facebook.ShareFriend=function (sharedURL, shareType, IdListing, thumbnail) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareFriend"); }
window.clearTimeout(TimeOutModal);var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true) {MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url: '/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+sharedURL+'&sharetype='+shareType+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&MetaDescription='+$('meta[name=description]').attr("content"),success: function (html) {Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}
Facebook.ShareList=function (sharedURL, shareType, IdListing, emailOrFBShare) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareList"); }
window.clearTimeout(TimeOutModal);var thumbnail=staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";if(emailOrFBShare=="emailshare") {var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true) {MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url: '/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+escape(sharedURL)+'&sharetype='+shareType.toLowerCase()+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&MetaDescription='+$('meta[name=description]').attr("content")+'&Title='+MemberName+" is looking at list of properties on HGTV\'s FrontDoor.com Real Estate. Tell "+MemberName+" what you think.",success: function (html) {Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}else{if(FB.getAuthResponse()!=null) {var shortURL=GetShortURL(sharedURL);var attachment={'name': first_name+" is looking at list of properties on HGTV's FrontDoor.com Real Estate. Tell "+first_name+" what you think.",'href': shortURL,'description': "HGTV's FrontDoor.com makes it easy for you to share your favorite properties, articles and saved searches. It's social house-hunting made simple.",'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}else{FB.login(function (response) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareList ->FB.Login"); }
if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function () {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function () {LogInConnectedUser(false);}, 2000);}
if(FB.getAuthResponse()) {isSessionRunning=true;var query=FB.Data.query('select first_name from user where uid={0}', FB.getAuthResponse().userID);query.wait(function (result) {if(result.length>0) {first_name=result[0].first_name
var shortURL=GetShortURL(sharedURL);var attachment={'name': first_name+" is looking at list of properties on HGTV's FrontDoor.com Real Estate. Tell "+first_name+" what you think.",'href': shortURL,'description': "FrontDoor.com, Listings, Homes for sale, Real Estate, Virtual Tours, social sharing, accounts, Facebook, saved articles, saved searches, saved listings, HGTV, Openhouse.com",'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false);}});}}})}}}
Facebook.ShareFavoritesFriend=function (sharedURL, shareType, IdListing, title, metadescription, thumbnail, emailOrFBShare) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareFavoritesFriend"); }
window.clearTimeout(TimeOutModal);if(metadescription=="") {metadescription="HGTV&#39;s FrontDoor.com makes it easy for you to share your favorite properties, articles and saved searches. It&#39;s social house-hunting made simple.";}
if(thumbnail==""||thumbnail==null) {var thumbnail=staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";}
if(emailOrFBShare=="emailshare") {var MemberName="";var MemberEmail="";if(IsAlreadySignedIn()==true) {MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);}
$.ajax({url: '/controls/ajaxcalls/facebook/ShareFriend.aspx?sharedurl='+sharedURL+'&sharetype='+shareType+'&IdListing='+IdListing+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail+'&Title='+escape(title)+'&MetaDescription='+metadescription,success: function (html) {Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}else{if(FB.getAuthResponse()!=null) {var shortURL=GetShortURL(sharedURL);if(thumbnail==null||thumbnail=="") {var attachment={'name': title,'href': shortURL,'description': metadescription}}else{var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}else{FB.login(function (response) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareFavoritesFriend ->FB.login"); }
if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function () {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function () {LogInConnectedUser(false);}, 2000);}
var shortURL=GetShortURL(sharedURL);if(thumbnail==null||thumbnail=="") {var attachment={'name': title,'href': shortURL,'description': metadescription}}else{var attachment={'name': title,'href': shortURL,'description': metadescription,'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}});}}}
Facebook.SharePropertiesAgent=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.SharePropertiesAgent"); }
$.ajax({url: '/controls/ajaxcalls/facebook/SharePropertiesAgentModal.aspx',success: function (html) {Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ShareAgentInfo=function (Name, Email, AccountID, DefaultInfo) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareAgentInfo"); }
if(DefaultInfo=='undefined') {DefaultInfo="Y";}
$.ajax({url: '/controls/ajaxcalls/facebook/ShareAgentInfoModal.aspx?AgentName='+Name+'&AgentEmail='+Email+'&AccountId='+AccountID+'&DefaultInfo='+DefaultInfo,success: function (html) {Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ShareArticle=function (sharedURL, shareType, IdListing) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareArticle"); }
var shortURL=GetShortURL(sharedURL);var thumbnail=staticImgHostname.replace("static.localhost.com", "static-img.frontdoor-dev.gabriels.net")+"/images/fd-facebook-logo.jpg";var name="";if(FB.getAuthResponse()!=null) {var attachment={'name': document.title,'href': shortURL,'description': $('meta[name=description]').attr("content"),'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}else{FB.login(function (response) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareArticle ->FB.login"); }
if(response.authResponse) {if(IsAlreadySignedIn()) {window.setTimeout(function () {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}, 2000)}else{Facebook.Modal_Close();window.setTimeout(function () {LogInConnectedUser(false);}, 2000);}
if(FB.getAuthResponse()) {isSessionRunning=true;var query=FB.Data.query('select first_name from user where uid={0}', FB.getAuthResponse().userID);query.wait(function (result) {if(result.length>0) {var attachment={'name': document.title,'href': shortURL,'description': $('meta[name=description]').attr("content"),'media':[{ 'type': 'image','src': thumbnail,'href': shortURL}]}
Facebook.Stream_Publish('', attachment, null, '', '', null, false)}});}}})}}
Facebook.ShareSearch=function (CityName, SEOSection) {if(facebookDebug) { OutputToConsole("Executing Facebook.ShareSearch"); }
if(SEOSection==undefined) {SEOSection='for_sale';}
$.ajax({url: '/controls/ajaxcalls/facebook/ShareSearchModal.aspx?CityName='+CityName+'&SEOSection='+SEOSection,success: function (html) {Facebook.fadeInBackground();$(html).modal();HandleInputControls();FocusToFirstInputInModal();}});}
Facebook.MaxLimit=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.MaxLimit"); }
$.ajax({url: '/controls/ajaxcalls/facebook/MaxNumberSavedModal.aspx',success: function (html) {Facebook.fadeInBackground();$(html).modal();}});}
Facebook.ClaimListingSaveNoPhotos=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.ClaimListingSaveNoPhotos"); }
$.ajax({url: '/controls/ajaxcalls/facebook/ClaimListingsNoPhotos.aspx',success: function (html) {Facebook.fadeInBackground();$(html).modal();}});}
Facebook.SendEmail=function (To, From, Message, Subject, DisplayName, IdListing, shareType, sharedURL) {if(facebookDebug) { OutputToConsole("Executing Facebook.SendEmail"); }
var TmpShareType=shareType;var isValidInfo=false;if(shareType.toLowerCase()=="contactagent") {isValidInfo=validateContactForm();}
else if(shareType.toLowerCase()=="contactprofiledagent") {if(gE("yourname")) {isValidInfo=validateForm();}else{isValidInfo=validateContactForm();}}else{isValidInfo=validateForm();}
if(shareType.toLowerCase()=="agentshare") {IdListing="123171-QC4118262";}
if(isValidInfo) {var strURL='/controls/ajaxcalls/facebook/SendEmail.aspx?to='+To+"&from="+From+"&message="+escape(Message)+"&subject="+Subject+"&displayname="+DisplayName+'&IdListing='+IdListing+'&sharetype='+TmpShareType+'&sharedURL='+sharedURL;if(gE("yourphone")) {if(gE("yourphone").value!="Enter your Phone Number") {strURL+="&phone="+gE("yourphone").value;}}
$.ajax({url: strURL,success: function (html) {if(document.forms["detail-contact-form"]) {document.forms["detail-contact-form"].reset();}
$("#contactform_name_in").removeClass("focusField");$("#contactform_name_in").addClass("idleField");$("#contactform_email_in").removeClass("focusField");$("#contactform_email_in").addClass("idleField");$("#yourphone").removeClass("focusField");$("#yourphone").addClass("idleField");Facebook.Modal_Close()
var confirmation=""
if(shareType.toLowerCase()=="listing") {confirmation="Your property has been shared!";}
else if(shareType.toLowerCase()=="search") {confirmation="Your search has been shared!";}
else if(shareType.toLowerCase().indexOf("article")>-1) {confirmation="Your article has been shared!";}
else if(shareType.toLowerCase()=="list") {confirmation="Your list has been shared!"}
else if(shareType.toLowerCase()=="agentshare") {confirmation="Your properties have been shared!"}
else if(shareType.toLowerCase()=="contactagent"||shareType.toLowerCase()=="contactprofiledagent") {confirmation="Your message has been sent."}
Facebook.Confirmation_Modal(confirmation);TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 3000);}})}
function validateContactForm() {if(facebookDebug) { OutputToConsole("Executing Facebook.SendEmail ->validateContactForm"); }
var isValid=true;if(document.getElementById("contactform_name_in").value=="") {$("#contactform_name_in").addClass("contactform-error");document.getElementById("contactform_name_error").innerHTML="Please enter your name.";document.getElementById("contactform_name_error").style.display="block";isValid=false}else{document.getElementById("contactform_name_error").style.display="none";$("#contactform_name_in").removeClass("contactform-error");}
if(document.getElementById("contactform_email_in").value=="") {$("#contactform_email_in").addClass("contactform-error");document.getElementById("contactform_email_error").innerHTML="Please enter your e-mail address.";document.getElementById("contactform_email_error").style.display="block";isValid=false}else{if(validateEmail("contactform_email_in")==false) {$("#contactform_email_in").addClass("contactform-error");document.getElementById("contactform_email_error").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).";document.getElementById("contactform_email_error").style.display="block";isValid=false}else{document.getElementById("contactform_email_error").style.display="none";$("#contactform_email_in").removeClass("contactform-error");}}
return isValid;}
function validateForm() {if(facebookDebug) { OutputToConsole("Executing Facebook.SendEmail ->validateForm"); }
if(document.getElementById("yourname").value=="") {$("#modal").addClass("modal-error");$("#yournameInput").addClass("input-error");document.getElementById("sender_name_error").innerHTML="Please enter your name.";document.getElementById("sender_name_error").style.display="block";return false}
else if(document.getElementById("youremail").value=="") {$("#modal").addClass("modal-error");$("#youremailInput").addClass("input-error");document.getElementById("sender_email_error").innerHTML="Please enter your e-mail address.";document.getElementById("sender_email_error").style.display="block";return false}
else if(validateEmail("youremail")==false) {$("#modal").addClass("modal-error");$("#youremailInput").addClass("input-error");document.getElementById("sender_email_error").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).";document.getElementById("sender_email_error").style.display="block";return false}
if(gE("Recipient")) {if(document.getElementById("Recipient").value=="") {$("#modal").addClass("modal-error");$("#recipientInput").addClass("input-error");document.getElementById("recipient_error").innerHTML="Please enter an e-mail addresses.";document.getElementById("recipient_error").style.display="block";return false}
else if(validateEmail("Recipient")==false) {$("#modal").addClass("modal-error");$("#recipientInput").addClass("input-error");document.getElementById("recipient_error").innerHTML="Oops! Please enter a valid e-mail address. Separate multiple addresses with comma";document.getElementById("recipient_error").style.display="block";return false}}
if(gE("broker_check")) {if(gE("broker_check").checked==false) {$("#modal").addClass("modal-error");document.getElementById("agree_error").innerHTML="Oops! Please agree the license";document.getElementById("agree_error").style.display="block";return false;}}
return true}
function validateEmail(fieldName) {if(facebookDebug) { OutputToConsole("Executing Facebook.SendEmail ->validateEmail"); }
var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;var str=document.getElementById(fieldName).value;str=str.replace(/ /gi, "");validateFlag=true
for (var i=0; i<str.split(",").length; i++) {if(!str.split(",")[i].match(emailRegEx)) {validateFlag=false;}}
return validateFlag}
String.prototype.trim=function () {a=this.replace(/^\s+/, '');return a.replace(/\s+$/, '');}}
Facebook.Modal_Close=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.Modal_Close"); }
$.modal.close();if(TimeOutModal) {window.clearTimeout(TimeOutModal);}}
Facebook.GetPassword=function () {if(facebookDebug) { OutputToConsole("Executing GetPassword"); }
if(gE("Email_Add").value!="" && gE("Email_Add").value=="Enter your valid email address") {gE("pwdFormatErrLogin").style.display="block"
gE("pwdFormatErrLogin").innerHTML="Please enter email address"
$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");return false}
if(validateEmailForgot(gE("Email_Add").value)==false) {gE("pwdFormatErrLogin").innerHTML="Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com)."
gE("pwdFormatErrLogin").style.display="block";$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");return false}
var querystring="email="+gE("Email_Add").value+"&action=forgot_password";DoAjaxRequestWithDelegate(PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring, forgotpasswordResultDelegate);function forgotpasswordResultDelegate(AjaxResponse) {if(facebookDebug) { OutputToConsole("Executing GetPassword ->forgotpasswordResultDelegate"); }
if(AjaxResponse=="success") {Facebook.Modal_Close()
Facebook.Confirmation_Modal("Your password was just sent to your e-mail address.");}else{gE("pwdFormatErrLogin").style.display="block";gE("pwdFormatErrLogin").innerHTML=AjaxResponse
$("#modal").addClass("modal-error");$("#email_input").addClass("input-error");}}
function validateEmailForgot(emailTxt) {if(facebookDebug) { OutputToConsole("Executing Facebook.GetPassword ->validateEmailForgot"); }
var emailRegEx=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;str=emailTxt;str=str.replace(/ /gi, "");validateFlag=true
for (var i=0; i<str.split(",").length; i++) {if(!str.split(",")[i].match(emailRegEx)) {validateFlag=false;}}
return validateFlag}}
Facebook.AccountActivation=function (email, password) {if(facebookDebug) { OutputToConsole("Executing Facebook.AccountActivation"); }
$.ajax({url: "/controls/ajaxcalls/facebook/AccountActivation.aspx?email="+email+"&password="+password,success: function (html) {Facebook.Confirmation_Modal("Account activation e-mail sent.");window.setTimeout(function () {Facebook.Modal_Close();}, 5000);}});}
var GL_overlayDiv;Facebook.fadeInBackground=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.fadeInBackground"); }
if(!GL_overlayDiv) {GL_overlayDiv=document.createElement('div');}
GL_overlayDiv.id="modalOverlayDiv";$('#global_wrap').append(GL_overlayDiv);$('#modalOverlayDiv').css('height', $("body").height());$(GL_overlayDiv).fadeTo(250, .3);$(document).keydown(Facebook.handleEscape);$(GL_overlayDiv).click(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();})}
Facebook.fadeOutBackground=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.fadeOutBackground"); }
if(GL_overlayDiv) {$(GL_overlayDiv).fadeTo(250, .0)
$('#modalOverlayDiv').css('height', '0px')
setTimeout(function () {if(GL_overlayDiv && GL_overlayDiv.parentNode!=null) {GL_overlayDiv.parentNode.removeChild(GL_overlayDiv);}}, 251);}}
Facebook.handleEscape=function (e) {if(facebookDebug) { OutputToConsole("Executing Facebook.handleEscape"); }
if(e.keyCode==27) {document.getElementById('global_wrap').removeChild(GL_overlayDiv);$('#modalOverlayDiv').css('height', '0px')}}
Facebook.loginHeaderWidth=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.loginHeaderWidth"); }
var $loginLinks=$('.login-links');var $loginWrapperBg=$('.log_in_wrapper_bg');$loginLinks.each(function (index) {$loginWrapperBg.eq(index).css("width", ($(this).width()+65)+"px");});}
function GetShortURL(sharedURL) {if(facebookDebug) { OutputToConsole("Executing GetShortURL"); }
var shortURL=$.ajax({url: '/controls/AjaxCalls/Facebook/ShortURLFB.aspx?sharedurl='+encodeURIComponent(sharedURL),async: false}).responseText;return shortURL;}
function fbs_click(sharedURL, title) {if(facebookDebug) { OutputToConsole("Executing fbs_click"); }
if(typeof sharedURL=='undefined') {sharedURL=document.CanonicalURL()+document.FacebookTrackingParam();}
if(typeof title=='undefined') {title=document.title;}
var shortURL=GetShortURL(sharedURL);window.open("http://www.facebook.com/sharer.php?u="+shortURL+"&t="+title, "sharer", "toolbar=0,status=0,width=626,height=436");return false;}
function ShowFacebookStatusDialog(containerID, defaultText, sharedURL) {if(facebookDebug) { OutputToConsole("Executing ShowFacebookStatusDialog"); }
var parentContainer=document.getElementById(containerID);var statusWrap=document.getElementById("status-wrap");var statusWrapConnect=document.getElementById("status-wrap-connect");if(parentContainer!=null && statusWrap!=null && statusWrapConnect!=null) {if(document.getElementById('ctl00_FacebookStatusDialog1_status_message')!=null) {if(sharedURL==null) {sharedURL=document.CanonicalURL()+document.FacebookTrackingParam();}
var shortURL=GetShortURL(sharedURL);if(defaultText!=null) {document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML=defaultText+shortURL;}else{document.getElementById('ctl00_FacebookStatusDialog1_status_message').innerHTML+=shortURL;}}
parentContainer.appendChild(statusWrap);parentContainer.appendChild(statusWrapConnect);}}
Facebook.WhatsThis=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.WhatsThis"); }
$.ajax({url: '/controls/ajaxcalls/facebook/WhatsThisModal.aspx',success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.WhatsThisMessage=function (message, onCloseDelegate) {if(facebookDebug) { OutputToConsole("Executing Facebook.WhatsThisMessage"); }
$.ajax({url: '/controls/ajaxcalls/facebook/WhatsThisModalMessage.aspx?Message='+message,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.ViewAsList=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.ViewAsList"); }
if(!IsAlreadySignedIn()) {if(FB.getAuthResponse()==null) {Facebook.Bookmark_Login("properties_module", 'page='+GetPageName());}else{Facebook.Bookmark_Modal("properties_module", 'page='+GetPageName());}}else{window.location.href=WebRoot+"account/my-folders/";}}
Facebook.BMShareLogin=function (ShareType) {if(facebookDebug) { OutputToConsole("Executing Facebook.BMShareLogin"); }
if(!IsAlreadySignedIn()) {if(FB.getAuthResponse()==null) {Facebook.Bookmark_Login("share_module", 'page='+GetPageName()+'&shrtype='+ShareType);}else{Facebook.Bookmark_Modal("share_module", 'page='+GetPageName()+'&shrtype='+ShareType);}}else{ShareAllListings(ShareType);}}
Facebook.ClearAllProperties=function () {if(facebookDebug) { OutputToConsole("Executing Facebook.ClearAllProperties"); }
$.ajax({url: '/controls/ajaxcalls/facebook/ClearPropertiesModal.aspx',success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.BadgeShare_Modal=function (url, fbtitle, fbmessage, fbimage, twmessage) {if(facebookDebug) { OutputToConsole("Executing Facebook.BadgeShare_Modal"); }
$.ajax({url: "/controls/AjaxCalls/Facebook/badgeshare-modal.aspx?url="+UrlEncode(url)+"&fbtitle="+fbtitle+"&fbmessage="+fbmessage+"&fbimage="+UrlEncode(fbimage)+"&twmessage="+twmessage,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});}
Facebook.SharePropertiesAgentModal=function (email, name) {if(facebookDebug) { OutputToConsole("Executing Facebook.SharePropertiesAgentModal"); }
if(email!="") {try {$.ajax({url: '/controls/ajaxcalls/accounts/ShareAllListings.aspx',type: 'GET',dataType: 'text',success: function (data) {MemberName=DisplayName();MemberEmail=readUserPersCookie(PERSONCOOKIE_EMAIL);$.ajax({url: '/controls/ajaxcalls/facebook/SharePropertiesAgentModal.aspx?sharedurl='+escape(data)+'&AgentEmail='+email+'&AgentName='+name+'&MemberName='+MemberName+'&MemberEmail='+MemberEmail,success: function (html) {Facebook.fadeInBackground();$(html).modal({minHeight: 400,minWidth: 400});}});},error: function (XMLHttpRequest, textStatus, errorThrown) {alert('error this:'+this+'\n XMLHttpRequest:'+XMLHttpRequest+'\ntextStatus:'+textStatus);}});}
catch (e) {alert('error:'+e);}}}
function AddBlurHandlersToPasswordAndPasswordHintFields(formid) {if(facebookDebug) { OutputToConsole("Executing AddBlurHandlersToPasswordAndPasswordHintFields"); }
var login_form;if(formid) {login_form=formid;}else{login_form="#login_form";}
$("#password-hint", login_form).removeClass("focusField");$("#login_password", login_form).blur(function () {if($(this).val()=="") {$("#password-hint", login_form).removeClass("focusField").addClass("idleField");$("#password-hint", login_form).show();$(this).hide();}});$("#ca_password", login_form).blur(function () {if($(this).val()=="") {$("#password-hint", login_form).removeClass("focusField").addClass("idleField");$("#password-hint", login_form).show();$(this).hide();}});$("#password-hint", login_form).click(function () {$("#login_password", login_form).show().focus();$("#ca_password", login_form).show().focus();$(this).hide();});$("#password-hint", login_form).focus(function () {$("#login_password", login_form).show().focus();$("#ca_password", login_form).show().focus();$(this).hide();});}
function TestEmailAddress(email) {if(facebookDebug) { OutputToConsole("Executing TestEmailAddress"); }
var d=new Date();$.ajax({type: 'GET',url: '/controls/ajaxcalls/Accounts/AccountLookup-BlankPassword.aspx?email='+email+'&rnd='+d.getTime(),success: ProcessAccountLookupResponse,dataType: "json"});}
function SendAccountConfirmationEmail(email, firstName, activationId, sourceName) {if(facebookDebug) { OutputToConsole("Executing SendAccountConfirmationEmail"); }
var d=new Date();$.ajax({type: 'GET',url: '/controls/ajaxcalls/Accounts/SendConfirmationEmail.aspx?email='+email+'&firstName='+firstName+'&activationId='+activationId+'&sourceName='+sourceName+'&rnd='+d.getTime(),success: ProcessAccountLookupResponse,dataType: "json"});}
function ProcessAccountLookupResponse(responseJSON, statusText, caleeOptions) {if(facebookDebug) { OutputToConsole("Executing ProcessAccountLookupResponse"); }
if(statusText=="success") {if(typeof responseJSON["errors"]!="undefined") {Facebook.Modal_Close();Facebook.Confirmation_Error_Modal(responseJSON["errors"], "Oops!");}
else if(typeof responseJSON["success_message"]!="undefined") {}
if(typeof responseJSON["script"]!="undefined") {Facebook.Modal_Close();new Function("options", "responseJSON", "statusText", responseJSON["script"])(caleeOptions, responseJSON, statusText);}}else{Facebook.Modal_Close();Facebook.Confirmation_Error_Modal("There was an error contacting the server: \r\n"+statusText, "Oops!");}}
function CloseModalAndFadeOutBkg(timeout) {if(facebookDebug) { OutputToConsole("Executing CloseModalAndFadeOutBkg"); }
if(typeof (timeout)!=undefined && timeout>0) {window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();window.clearTimeout();}, timeout);}else{Facebook.Modal_Close();Facebook.fadeOutBackground();}}
function rtrim(stringToTrim) {return stringToTrim.substring(0, stringToTrim.length - 2);}
function ToggleComponents() {window.setTimeout(function () {window.location.replace("/Default.aspx");}, 1000);}
function PopupMessage(bFDLoggedIn) {if(bFDLoggedIn) {Facebook.Confirmation_Modal("You are logging out of both FrontDoor and Facebook.", "Facebook");}else{Facebook.Confirmation_Modal("You are logging out of Facebook.", "Facebook");}
TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);}
function LogoutMyFrontdoor() {if(facebookDebug) { OutputToConsole("Facebook.Logout ->LogoutMyFrontdoor"); }
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+TmpFBId,data: "",success: function (output) {if(output=="success") {$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogOutConnectedUser.aspx",data: "",success: function (output) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}
$.event.trigger('SignOutEvt');}});});}}});});}
function ToggleFacebookComponentStates() {if(facebookDebug) { OutputToConsole("ToggleFacebookComponentStates"); }
document.getElementById("FD_in").style.display="none";document.getElementById("FB_in").style.display="none";document.getElementById("FD_FB_out").style.display="block";if(document.getElementById("status-wrap")!=null) {document.getElementById("status-wrap").style.display="none";document.getElementById("status-wrap-connect").style.display="block";}
if(document.getElementById("HomeFacebookBanner")!=null) {DisplayNotificationBanner();}
if(document.getElementById("LinkAcctNote")!=null) {document.getElementById("LinkAcctNote").style.display="none";}
if(document.getElementById("FB-Reg-LoggedIn")!=null) {document.getElementById("FB-Reg-Not-LoggedIn").style.display="block";document.getElementById("FB-Reg-LoggedIn").style.display="none";document.getElementById("Reg_Status").innerHTML="Add Your Facebook Account";document.getElementById("first_name").value="";document.getElementById("last_name").value="";document.getElementById("Reg_Optional").style.display="block";document.getElementById("Reg_Name").innerHTML="";document.getElementById("Reg_Avatar").innerHTML="";document.getElementById("Reg_Success").style.display="none";if(gE("fb_notification")) {gE("fb_notification").style.display="none";gE("FB-Tab-LoggedIn").style.display="none";gE("FB-Tab-Not-LoggedIn").style.display="block";}}
RelocateToHP();}
function RelocateToHP() {if(window.location.href.indexOf('pro/account')!=-1||window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1) {window.location.replace("/Default.aspx")}}
function LogInConnectedUser(bShowPermissionDialog) {if(facebookDebug) { OutputToConsole("Executing Facebook.Login ->LogInConnectedUser"); }
if(bShowPermissionDialog) {Facebook.Show_PermissionDialog_Social_Commenting("publish_stream,email");}
$(function () {$.ajax({type: "POST",url: "/controls/AjaxCalls/Facebook/LogInConnectedUser.aspx?Facebook_UserId="+FB.getAuthResponse().userID,data: "",success: function (output) {var pageRedirect=readTempCookie("page");if(facebookDebug) { OutputToConsole("LogInConnectedUser pageRedirect: "+pageRedirect); }
if(pageRedirect!=null && pageRedirect.length>0) {window.location.href="http://"+pageRedirect;}else{if(gE("log_in_wrapper")) {ShowLoginSectionForUser("isrunning");document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";document.getElementById("FD_FB_out").style.display="none";}}
$.event.trigger('SignInEvt');}});});};if(typeof FDWebRoot=='undefined') {var FDWebRoot="";}
function IsAlreadySignedIn() {if(readUserPersCookie(PERSONCOOKIE_EMAIL)!="") {return true;}else{return false;}}
function getSavedListingId(ListingId) {var arr=readListingsPersCookie();if(arr!=undefined) {return inArray(ListingId, arr);}
return -1;}
function getAlertListingId(ListingId) {var arr=readAlertsPersCookie();if(arr!=undefined) {return inArray(ListingId, arr);}
return -1;}
function getSavedArticleId(Id) {var arr=readArticlesPersCookie();if(arr!=undefined) {return inArray(Id, arr);}
return -1;}
function getTempCookie(NameOfCookie) {if(document.cookie.length>0) {begin=document.cookie.indexOf(NameOfCookie);if(begin!=-1) {begin+=NameOfCookie.length+1
end=document.cookie.indexOf("&", begin);var name=unescape(document.cookie.substring(begin, end));name=name.split(";")[0];if(name.charAt(0)==",") {name=name.substring(1, name.length);}
return name;}}
return "";}
function ShowLoggedIn(flag) {var isSessionRunning="";if(flag) {try {FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {Facebook.User_GetInfo();isSessionRunning="isrunning";var IsAccountLinkedDelegate=function (output) {if(output=="success") {if(gE("FD_in")) {gE("FD_in").style.display="none";gE("FD_FB_out").style.display="none";}}};DoJQueryAjaxRequestWithDelegate("/controls/AjaxCalls/Facebook/IsAccountLinked.aspx?Facebook_UserId="+FB.getAuthResponse().userID, IsAccountLinkedDelegate);}
ShowLoginSectionForUser(isSessionRunning);if(isSessionRunning=="") {if(gE("myfacebookgreeting")) {gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";gE("FD_in").style.display="block";gE("FD_FB_out").style.display="none";Facebook.loginHeaderWidth();}}
SignInOrRegister="SignIn";}, true);}
catch (e) {}}else{try {FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {Facebook.User_GetInfo();isSessionRunning="isrunning";}else{Facebook.Modal_Close();if(gE("FB_in")) {document.getElementById("FB_in").style.display="none";document.getElementById("FD_in").style.display="none";document.getElementById("loading").style.display="none";document.getElementById("FD_FB_out").style.display="block";}
SignInOrRegister="";}
SignInOrRegister="SignIn";});}
catch (e) {}}}
function ShowLoginSectionForUser(isSessionRunning) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {var loginType="fd";if(gE("FD_FB_out")) {document.getElementById("loading").style.display="none";document.getElementById("FD_FB_out").style.display="none";if(isSessionRunning.length>0) {loginType="fb";$("#my_fb>a").attr("href", WebRoot+"pro/account/dashboard");document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";}else{$("#my_fd>a").attr("href", WebRoot+"pro/account/dashboard");gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";document.getElementById("FD_in").style.display="block";document.getElementById("FB_in").style.display="none";}
LoadProAccountMenu(loginType);}}
else if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==1) {if(gE("FB_in")) {if(isSessionRunning.length>0) {$("#my_fb>a").attr("href", WebRoot+"account/recent-activity/");document.getElementById("FB_in").style.display="block";document.getElementById("FD_in").style.display="none";}else{$("#my_fd>a").attr("href", WebRoot+"account/recent-activity/");gE("myfacebookgreeting").innerHTML="<em id=\"FB_icon\" class=\"fb\">&nbsp;</em><a href=\"javascript:\/\/(0);\" onclick=\"Facebook.Login(); return false;\">Get Connected, "+DisplayName()+"</a>";document.getElementById("FD_in").style.display="block";document.getElementById("FB_in").style.display="none";}}}}
function IsDefaultPage() {var url=window.location.href.split('?')[0];var arr=url.split(PersonalizationRoot);if(arr[arr.length - 1]=="Default.aspx"||arr[arr.length - 1]=="") {return true;}else{return false;}}
function DisplayHeader() {ShowLoggedIn(IsAlreadySignedIn());}
function tb_update(URL, Width, Height) {gE("TB_window").style.width=(parseInt(Width, 10)+30)+"px"; ;gE("TB_window").style.height=(parseInt(Height, 10)+30)+"px"; ;gE("TB_ajaxContent").style.width=Width+"px";gE("TB_ajaxContent").style.height=Height+"px";if(URL!=undefined||URL!=null) {$AJAX.GetToObject(gE("TB_ajaxContent"), URL);}
tb_position_gt(parseInt(Width, 10)+30);window.setTimeout(function () {LoadPageDefaults();}, 255);}
function tb_updateHTML(caption, html, Width, Height) {if(typeof document.body.style.maxHeight==="undefined") {$("body", "html").css({ height: "100%", width: "100%" });$("html").css("overflow", "hidden");if(document.getElementById("TB_HideSelect")===null) {$("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");$("#TB_overlay").click(tb_remove);}}else{if(document.getElementById("TB_overlay")===null) {$("body").append("<div id='TB_overlay'></div><div id='TB_window'>");$("#TB_overlay").click(tb_remove);}}
if(caption===null) { caption=""; }
$("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");$('#TB_load').show();TB_WIDTH=(Width * 1)+30||630;TB_HEIGHT=(Height * 1)+40||440;ajaxContentW=TB_WIDTH - 30;ajaxContentH=TB_HEIGHT - 45;if($("#TB_window").css("display")!="block") {$("#TB_window").append("<!--<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a>or Esc Key</div></div>--><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");}else{$("#TB_ajaxContent")[0].style.width=ajaxContentW+"px";$("#TB_ajaxContent")[0].style.height=ajaxContentH+"px";$("#TB_ajaxContent")[0].scrollTop=0;$("#TB_ajaxWindowTitle").html(caption);}
$("#TB_closeWindowButton").click(tb_remove);tb_position();$("#TB_load").remove();tb_init("#TB_ajaxContent a.thickbox");$("#TB_window").css({ display: "block" });window.setTimeout(function () {LoadPageDefaults();}, 255);gE("TB_ajaxContent").innerHTML=html;document.onkeyup=function (e) {if(e==null) {keycode=event.keyCode;}else{keycode=e.which;}
if(keycode==27) {tb_remove();}};}
function tb_position_gt(gt_WIDTH) {$("#TB_window").css({ marginLeft: '-'+parseInt((gt_WIDTH / 2), 10)+'px', width: gt_WIDTH });if(!(jQuery.browser.msie && typeof XMLHttpRequest=='function')) {$("#TB_window").css({ marginTop: '-'+parseInt((TB_HEIGHT / 2), 10)+'px' });}}
function SignIn(IsFirstTime) {if(IsFirstTime) {if(gE("search_pricemin")) {gE("search_pricemin").setAttribute("tabindex", -1);gE("search_pricemin").tabIndex=-1;}
if(gE("search_pricemax")) {gE("search_pricemax").setAttribute("tabindex", -1);gE("search_pricemax").tabIndex=-1;}
if(gE("search_bedrooms")) {gE("search_bedrooms").setAttribute("tabindex", -1);gE("search_bedrooms").tabIndex=-1;}
if(gE("email")!=null) {tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310&emailadd="+gE("email").value, false);}else{tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310", false);}}
else if(gE("Email_Add")!=null) {tb_showhtml('', PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login&height=285&width=310&emailadd="+gE("Email_Add").value, false);}else{tb_update(PersonalizationRoot+"AjaxCalls/SignIn.aspx?display=login", "310", "285");}}
function SignOut() {DoAjaxRequestWithDelegate(PersonalizationRoot+"AjaxCalls/Personalization.aspx?action=sign_out", SignOutDelegate);if(document.getElementById("HomeFacebookBanner")!=null) {window.setTimeout(reload, 300);}}
function SignOutDelegate(AjaxResponse) {ShowLoggedIn(false);if(AjaxResponse!="success") {window.location.reload(true);}else{var url=window.location.href.split('?')[0];if(window.location.pathname=="/"||window.location.pathname=="") {window.location.href=window.location.href;}
if(window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1||window.location.href.toLowerCase().indexOf('pro/')!=-1||window.location.href.indexOf("agent-tools/")!=-1||window.location.href.indexOf("Activation")!=-1) {window.location.replace("/Default.aspx")}
if(url.indexOf(PersonalizationRoot)>-1) {window.location.href=PersonalizationRoot+"Default.aspx";}else{if(typeof ChangeUserAction=='function') {ChangeUserAction();}}
$.event.trigger('SignOutEvt');}}
function NotSignedInDelegate(AjaxResponse) {var html=AjaxResponse;tb_updateHTML("", html, 550, 360);}
function SubmitByEnterkey(e, formID) {if(window.event) {KeyCode=e.keyCode;}
else if(e.which) {KeyCode=e.which;}
if(KeyCode==13) {if(formID!=undefined) {if(formID=="login_form") {return true;}
else if(formID=="forgot_pw_form") {return true;}else{ValidateEmailFriend(formID);}}else{SaveSearchSubmit();}}else{return false;}}
var task;var customdata1;var customdata2;var active_form;function SignInSubmit(formID, _task, _customdata1, _customdata2) {if(formID) {active_form="#"+formID;}else{active_form="#login_form";}
if(ValidateSignIN(formID)) {task=_task;customdata1=_customdata1;customdata2=_customdata2;var frm=document.forms[formID];var querystring="email="+frm.email.value+"&pwd="+frm.login_password.value+"&rememberme=false";if(GetPageName().indexOf(PersonalizationRoot+"sign_up.aspx")>-1) {querystring+='&PathInfo=signuppage';}
else if(task.indexOf("lastaction")!=-1) {if(customdata1) { querystring+='&PathInfo='+customdata1; }}else{querystring+='&PathInfo='+GetPageName();}
if(task=="reauth") {querystring+='&NameCookie='+getTempCookie("iname")+'&action=reauth';}else{querystring+='&NameCookie='+getTempCookie("iname")+'&action=sign_in';}
$("#loadingconnect", active_form).show();var strURL=PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring;DoAjaxRequestWithDelegate(strURL, SignInResultDelegate);if(document.getElementById("HomeFacebookBanner")!=null) {window.setTimeout(reload, 500);}}else{$("#loadingconnect", active_form).hide();return false;}}
function HandleClaimWizardLogin() {if(facebookDebug) { OutputToConsole("Executing HandleClaimWizardLogin"); }
if(facebookDebug) { OutputToConsole("task="+task); }
if(facebookDebug) { OutputToConsole("customdata1="+customdata1); }
if(facebookDebug) { OutputToConsole("customdata2="+customdata2); }
if(task.indexOf('PerformClaimListing')!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {var URL="/Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=DirectClaim&IdListing="+customdata1+"&IdParentAccount="+customdata2;$.get(URL, function (data) {CreateAndFillProListingClaimContainer(data);if($('#spnListingClaimStatus').html().indexOf('SUCCESS')!=-1||$('#spnListingClaimStatus').html().indexOf('AlreadyClaimed')!=-1) {if($('#spnListingClaimStatus').html().indexOf('AlreadyClaimed')!=-1) {Facebook.Modal_Close();Facebook.Confirmation_Error_Modal("The listing you are trying to claim is already claimed", "Oops!");window.setTimeout(function () {Facebook.Modal_Close();window.location=FDWebRoot+"pro/view-listings";}, 3000);}else{window.location=FDWebRoot+"pro/view-listings";}}});}else{var forward=FDWebRoot+'listing/'+customdata1;var modalInfo={header: "Pro Account Required",text: "<p>You need to have a pro account to confirm listings.<br/><br/>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function () { OmAgentInt(this, null, null, "Registration : Convert to Pro"); document.location=SSLRoot+"pro/upgrade/"+customdata1+"/"+customdata2; },lnktext: "no, thank you.",lnkclick: function () {document.location=forward;},closeclick: function () {document.location=forward;}}
if($('#divProAccountModal').length==0) {var URL="/Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function (data) {CreateAndFillProListingClaimContainer(data);ShowBlockedProAccountModalWindow(modalInfo);});}else{ShowBlockedProAccountModalWindow(modalInfo);}}}}
function reload() {DisplayNotificationBanner();}
function SignInResultDelegate(AjaxResponse) {if(AjaxResponse=="success") {RemoveCookieByName("reg");RemoveCookieByName("lgn_c");FB.getLoginStatus(function (response) {if((response.status) && (response.status=="connected")) {Facebook.Connect(readUserPersCookie(PERSONCOOKIE_EMAIL), readUserPersCookie("pwd"), false);}});if(gE("loadingconnect")) {gE("loadingconnect").style.display="none";}
if(task.indexOf("reauth")!=-1||task.indexOf("lastaction")!=-1) {window.location.href=customdata1;return;}
if(task.indexOf("convert_to_proRedirect")==-1) {Facebook.Confirmation_Modal("Welcome back, "+DisplayName()+".");window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();}, 5000);}
ShowLoggedIn(true);Facebook.Modal_Close();window.setTimeout(function () {if(task.indexOf("buyCredits")!=-1) {window.location=FDWebRoot+"pro/credits/dashboard";}
else if(task.indexOf("header")!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {window.location=FDWebRoot+"pro/account/editprofile";}else{window.location=FDWebRoot+"account/recent-activity";}}
else if(window.location.href.indexOf("pro/")!=-1||window.location.href.indexOf("agent-tools/")!=-1) {if(window.location.href.indexOf("register")!=-1||window.location.href.indexOf("signup")!=-1) {if(readUserPersCookie(PERSONCOOKIE_USERTYPE)==2) {window.location=FDWebRoot+"pro/account/editprofile";}
else if(window.location.href.indexOf("signup")!=-1) {window.location=FDWebRoot+"account/recent-activity";}
else if(task.indexOf("convert_to_proRedirect")!=-1) {document.location=SSLRoot+"/pro/upgrade";}else{var modalInfo={header: "Pro Account Registration",text: "<p>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function () { document.location=SSLRoot+"/pro/account/settings"; },lnktext: "no, thank you.",lnkclick: function () {document.location=SSLRoot+"/pro/account/register";},closeclick: function () {document.location=SSLRoot+"/pro/account/register";}}
var URL="/Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function (data) {CreateAndFillProListingClaimContainer(data);ShowBlockedProAccountModalWindow(modalInfo);});}}
else if(window.location.href.indexOf("claimlistings/step1")!=-1) {}else{window.location.reload(true);}}
else if(window.location.href.indexOf('my-folders')!=-1||window.location.href.indexOf('settings')!=-1||window.location.href.indexOf('facebook')!=-1||window.location.href.indexOf('recent-activity')!=-1||window.location.href.indexOf("MyFolders.aspx")!=-1) {window.location=FDWebRoot+"account/recent-activity";}}, 1500);if(task=="select_homestyle") {eval(customdata1);SelectHomestyle(homestyleObj.idlisting, homestyleObj.idaccount, homestyleObj.agentcodestyle, homestyleObj.idstyle, homestyleObj.stylename);task="";customdata1="";}
$.event.trigger('SignInEvt');}
else if(AjaxResponse.indexOf("pageredirect=")>-1) {window.location.href=AjaxResponse.split("=")[1];}
else if(AjaxResponse.toLowerCase().indexOf("activation.aspx")>-1){if(task=="select_homestyle") {eval(customdata1);SelectHomestyle(homestyleObj.idlisting, homestyleObj.idaccount, homestyleObj.agentcodestyle, homestyleObj.idstyle, homestyleObj.stylename, true);task="";customdata1="";}
window.location.href=AjaxResponse+"?confirmation=AccountSuccess&email="+gE("email").value+"&password="+gE("login_password").value;}
else if(AjaxResponse.indexOf("lastaction_")<0) {if(AjaxResponse.indexOf("email address")>-1) {$("#email_input", active_form).addClass("input-error");$("#emailErrLogin", active_form).show();}else{$("#password_input", active_form).addClass("input-error");$("#pwdErrLogin", active_form).html(AjaxResponse);$("#pwdErrLogin", active_form).show();}
$("#loadingconnect", active_form).hide();}}
function ForgotPassword(flag, email) {Facebook.Modal_Close();var strURL='/controls/ajaxcalls/facebook/ForgotPasswordModal.aspx';if(email!=undefined) {strURL+="?email="+email;}
if(IsDefaultPage()) {$.ajax({url: strURL,success: function (html) {$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();FocusToFirstInputInModal();}});}else{if(flag) {$.ajax({url: strURL,success: function (html) {$(html).modal({minHeight: 400,minWidth: 400});HandleInputControls();FocusToFirstInputInModal();}});}else{$.ajax({url: strURL,success: function (html) {$(html).modal({ minWidth: 400 });HandleInputControls();FocusToFirstInputInModal();}});}}}
function GetPassword() {if(validateLoginEmail(gE("Email_Add"), gE("emailErr"), "")) {var querystring="email="+gE("Email_Add").value+"&action=forgot_password";$AJAX.GetForDelegate(forgotpasswordResultDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}else{return false;}}
function forgotpasswordResultDelegate(AjaxResponse) {var html="";if(AjaxResponse=="success") {gE("forgot_pw_result").style.display='block';gE("forgot_pw").style.display='none';html="<div id='pw_result_hdr' class='clearfix'><h2>Password Sent</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+='<p>Your password was just sent to your e-mail.</p>';html+='<div id="tb_tbns"><div class="pw_actions clearfix"><div id="pw_signin_wrapper"><a href="javascript:void(0);" id="pw_signin" onclick="SignIn();">Sign In Now</a></div><span class="or">OR</span><a href="javascript:void(0);" onclick="javascript:tb_remove();" id="not_sign">Do Not Sign In Now</a></div></div>';gE("forgot_pw_result").innerHTML=html;}else{html="<p>"+AjaxResponse+"</p>";var btnhtml='<div class="pw_actions" class="clearfix"><a href="javascript:ForgotPassword(false);" id="try_again">Try Again</a></div>';gE("emailNotFoundErr").style.display='block';gE("emailErr").style.display='none';gE("emailNotFoundErr").innerHTML=html;gE("tb_tbns").innerHTML=btnhtml;}}
function MyFrontdoorList() {if(gE("searchbar_wrapper")!=null) {gE("searchbar_wrapper").style.zIndex="0";gE("searchbar_wrapper").style.position="relative";}
if(gE("serach_home")!=null) {gE("serach_home").style.zIndex="0";}
var rhtml="";if(readListingCountPersCookie()!=0||readSearchCountPersCookie()!=0||readArticleCountPersCookie()!=0) {rhtml+='<div id="my_fd_options_rt_div"><h3>My Saved Items</h3>';}
if(readListingCountPersCookie()!=0) {rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Listings</a>('+readListingCountPersCookie()+')</div>';rhtml+='<ul>';var arrLatListings=readLatestListingsPersCookie();for (var i=0; i<arrLatListings.length; i++) {var ItemInfo=arrLatListings[i].split("::");rhtml+='<li class="clearfix"><a href="'+WebRoot+'listing/'+ItemInfo[1]+'" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readSearchCountPersCookie()!=0) {rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Searches</a>('+readSearchCountPersCookie()+')</div>';rhtml+='<ul>';var arrLatListings=readLatestSearchesPersCookie();for (var i=0; i<arrLatListings.length; i++) {var ItemInfo=arrLatListings[i].split("::"); ;rhtml+='<li class="clearfix"><a href="Javascript:GotoSearchPage('+ItemInfo[1]+');" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readArticleCountPersCookie()!=0) {rhtml+='<div class="group"><div class="saved_cat"><a href="/accounts.aspx">Articles</a>('+readArticleCountPersCookie()+')</div><ul>';var arrLatListings=readLatestArticlesPersCookie();for (var i=0; i<arrLatListings.length; i++) {var ItemInfo=arrLatListings[i].split("::");rhtml+='<li class="clearfix"><a href="'+WebRoot+'news/article/'+ItemInfo[1]+'" class="item">'+ItemInfo[0]+'</a></li>';}
rhtml+='</ul></div>';}
if(readListingCountPersCookie()!=0||readSearchCountPersCookie()!=0||readArticleCountPersCookie()!=0) {rhtml+='</div><div id="my_fd_options_bottom"></div>';}
var G=new GetWindowBunds();gE("MyFDBackOpen").style.left="1px";gE("MyFDBackOpen").style.top="1px";gE("MyFDBackOpen").style.width="1000px";gE("MyFDBackOpen").style.height=(G.VisibleHeight - 30)+"px";gE("MyFDBackOpen").style.left="0px";gE("MyFDBackOpen").style.top="0px";if(gE("my_fd_options_rt").style.display=='none' && rhtml!="") {gE("my_fd_options_rt").style.display='block';gE("MyFDBackOpen").style.display='block';}
gE("my_fd_options_rt").innerHTML=rhtml;}
function CloseMyFD() {gE("my_fd_options_rt").style.display='none';gE("MyFDBackOpen").style.display='none';if(gE("searchbar_wrapper")!=null) {gE("searchbar_wrapper").style.zIndex="";gE("searchbar_wrapper").style.position="static";}
if(gE("serach_home")!=null) {gE("serach_home").style.zIndex="0";}}
function HoverMyFD() {if(readListingCountPersCookie()==0 && readSearchCountPersCookie()==0 && readArticleCountPersCookie()==0) {gE("city-dropdown").style.display="none";gE("close-city-dropdown").style.display="none";gE("nav_city_url").className="";gE("my_fd_options_rt").style.zIndex="98";}}
function validateLoginEmail(emailField, emErr, message) {if(fieldHasValue(emailField) && validEmailField(emailField)) {$("#email_input", active_form).removeClass("input-error");return true;}else{emErr.show();$('#eml', active_form).css('color', '#000000')
if(!fieldHasValue(emailField)) {emErr.html("Please enter your email address.");}else{if(message!="") {emErr.html(message);}}
$("#email_input", active_form).addClass("input-error");firstErrField=emailField;AlertFocus(firstErrField);return false;}}
function validateLoginPassword(pwdField, pwdErr) {var fieldValue=trim(pwdField.value);var regex3=/[^0-9a-zA-Z\!@#\$%^\.\*\+=\_]/g;if(fieldHasValue(pwdField) && fieldValue.length>5 && !regex3.test(fieldValue)) {pwdErr.hide();return true;}else{pwdErr.show();$("#pw", active_form).css('color', '#000000');$("#password_input", active_form).addClass("input-error");if(!fieldHasValue(pwdField)) {pwdErr.html("Please enter your password.");}else{pwdErr.html("Oops! The password you entered does not match our records. Please try again.");}
return false;}}
function ValidateSignIN(formID) {var frm=document.forms[formID];var isValidForm=true;var emErr=$('#emailErrLogin', active_form);var pwdErr=$('#pwdErrLogin', active_form);var arrErrSum=new Array();var firstErrField;emErr.hide();pwdErr.hide();$('#error', active_form).hide();if(!validateLoginEmail(frm.email, emErr, "Please check the format of your e-mail address and re-enter. (i.e. joe@frontdoor.com).")) {if(firstErrField==undefined) {firstErrField=frm.email;}
$("#email_input", active_form).addClass("input-error");isValidForm=false;}
if(!validateLoginPassword(frm.login_password, pwdErr)) {if(firstErrField==undefined) {firstErrField=frm.password;}
$("#password_input", active_form).addClass("input-error");isValidForm=false;}
if(isValidForm) {return true;}else{if(firstErrField!=undefined) {AlertFocus(firstErrField);}
return false;}}
function toErrSummary(arrErrSum) {var errList=document.getElementById("errSummaryList");var reqSum=document.getElementById("valid_req");if(arrErrSum.length!=0) {reqSum.style.display='inline';errList.innerHTML=arrErrSum.join('');}else{reqSum.style.display='none';errList.innerHTML='';}}
function rollOn(listingId) {gE("rolloff_"+listingId).className="rollon_item";document.getElementById("listingBtns_"+listingId).style.display='block';}
function rollOff(listingId) {gE("rolloff_"+listingId).className="rolloffmode";document.getElementById("listingBtns_"+listingId).style.display='none';}
function rollOnSearch(listingId) {if(!IsEditOn) {gE("rolloff_"+listingId).className="rollon_item";document.getElementById("listingBtns_"+listingId).style.display='block';gE("edittitle_"+listingId).style.display='inline';}}
function rollOffSearch(listingId) {if(gE("searchname_edit_"+listingId).style.display=='none') {gE("rolloff_"+listingId).className="rolloffmode";document.getElementById("listingBtns_"+listingId).style.display='none';gE("edittitle_"+listingId).style.display='none';}}
function GotoSearchPage(SearchId) {var query="action=getsearchlink&SearchId="+SearchId;$AJAX.GetForDelegate(GotoResults, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function GotoResults(AjaxResponse) {if(AjaxResponse!="") {window.location.href=AjaxResponse;}}
function UserOptionsDelegate(AjaxResponse) {var html="";var caption="";var width=250;var height=100;var returnVal=AjaxResponse.split("::")[1];if(returnVal!=undefined) {if(returnVal.charAt(0)==",") {returnVal=returnVal.substring(1, returnVal.length);}}
returnVal=encodeURIComponent(returnVal);if(AjaxResponse.indexOf("success_add_listing")!=-1) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}
var conf=getBookmarkCookieValue();var showChecked=conf;if(conf.length==0) {setBookmarkCookieValue(true);showChecked="1";}
if(conf!="1") {html=returnVal+' was saved to your account.';Facebook.BMConfirmation_Modal(html, undefined, showChecked);TimeOutModal=window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);}}
else if(AjaxResponse.indexOf("success_add_alert_listing")!=-1) {SaveListingAlert(returnVal);}
else if(AjaxResponse.indexOf("success_update_item_alert")!=-1) {Facebook.Modal_Close();Facebook.Confirmation_Modal(returnVal);TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);if(typeof ChangeUserAction=='function') {ChangeUserAction();}}
else if(AjaxResponse.indexOf("success_add_article")!=-1) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}
html='"'+returnVal+'" was saved to your account.';Facebook.Confirmation_Modal(html);TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse.indexOf("success_add_video")!=-1) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}
caption="Save Video";html='<div id="not_signedin_hdr" class="clearfix"><h2>Success!</h2></div>'
html+='<div id="success_saved"><span class="b">"'+returnVal+'"</span>was saved to your account.';html+='<div id="tb_tbns"><a href="javascript:void(0);" onclick="tb_remove();"  id="success_ok">OK</a></div></div>';tb_updateHTML(caption, html, width, height);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse.indexOf("success_add_search")!=-1) {Facebook.Modal_Close();if(typeof ChangeUserAction=='function') {ChangeUserAction();}
html='"'+returnVal+'" was saved to your account.';Facebook.Confirmation_Modal(html);TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse.indexOf("success_show_alert_dialog")>-1) {var params=AjaxResponse.split(":");var bNewAlert=true;if(params.length>1) {bNewAlert=params[1].split("=")[1];}
Facebook.ItemAlert_Modal(bNewAlert);}
else if(AjaxResponse=="success_remove_listing") {if(gE("properties-drop-box")) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}}else{SuccessAction(false);}
window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_article") {SuccessAction(false);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_video") {SuccessAction(false);window.setTimeout("tb_remove();", 4000);}
else if(AjaxResponse=="success_remove_search") {SuccessAction(false);window.setTimeout("tb_remove();", 5000);}
else if(AjaxResponse.indexOf("search_limit_exceeded")>-1) {caption="Save Search";width=250;height=200;var params=AjaxResponse.split(":");var searchname="No Search Name";var emailalert=false;if(params.length>2) {searchname=params[1].split("=")[1];emailalert=params[2].split("=")[1].toLowerCase();}
Facebook.Modal_Close()
window.setTimeout(function () {Facebook.MaxLimit();},5000)}
else if(AjaxResponse.indexOf("not signed in")!=-1) {bmarkType=""
if(AjaxResponse.indexOf(":")!=-1) {bmarkType=AjaxResponse.split(":")[1];}
window.location.href=SSLRoot+"/login";}
else if(AjaxResponse.indexOf("not activated")!=-1) {html="Account activation is required to set listing alerts. You are registered but still need to activate using the activation link we sent you within the past 24 hours. Please check your email.";Facebook.Confirmation_Error_Modal(html, "Oops!");TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="error_action_listing") {html="We're sorry, but this listing was not saved to your account. Please try again later.";Facebook.Confirmation_Error_Modal(html, "Oops!");$("#properties-success").hide();if(gE("properties-drop-box")) {if(typeof ChangeUserAction=='function') {ChangeUserAction();}}
TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="maxlimit") {html="You have reached the maximum number of saved items. Please remove some if you wish to add more.";Facebook.Confirmation_Error_Modal(html, "Oops!");TimeOutModal=window.setTimeout(function () {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000)}
else if(AjaxResponse=="error_action_search") {width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this search was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_article") {width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this article was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_video") {width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We're sorry, but this video was not saved to your account. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action") {width=300;height=115;html="<div id='oops_save'><div id='not_signedin_hdr' class='clearfix'><h2>Oops!</h2><a href='javascript:void(0);' onclick='tb_remove();' class='close_tb'>close</a></div>";html+="<p>We were unable to complete your request. Please try again later.</p>";html+='<div id="tb_tbns" class="clearfix"><a href="javascript:void(0);" onclick="tb_remove();" id="try_again">Please Try Again</a></div></div></div>';tb_updateHTML(caption, html, width, height);}
else if(AjaxResponse=="error_action_alert_listing") {}else{html=AjaxResponse;tb_updateHTML(caption, html, width, height);}}
function SaveSearch() {Facebook.ShareSearch(GetSearchLocation(), SEOSection);}
function SaveSearchSubmit() {var searchname="No Search Name";var isalert=false;if(gE("SearchName")!=undefined) {if(gE("SearchName").value=="") {gE("errmsg_savesearch").style.display="block"
$("#email_input").addClass("input-error");$("#modal").addClass("modal-error");gE("errmsg_savesearch").innerHTML="Please enter a search name";return false;}
if(gE("SearchName").value.indexOf("#&#")>-1) {gE("errmsg_savesearch").style.display="block"
$("#email_input").addClass("input-error");$("#modal").addClass("modal-error");gE("errmsg_savesearch").innerHTML="The search name cannot contain an #&#. Please change your search name.";return false;}else{gE("errmsg_savesearch").style.display="none"
searchname=gE("SearchName").value;}}
if(gE("EmailAlert")!=undefined) {isalert=gE("EmailAlert").checked;}
var query="SearchName="+encodeURIComponent(searchname)+"&EmailAlert="+isalert+"&SearchQuery=";if(PageCache.SEOPath!="") {query+=encodeURIComponent(PageCache.SEOPath);}else{query+=encodeURIComponent(PageCache.QueryString);}
query+='&PathInfo='+GetPageName();query+='&action=addsearch';query+='&bookmarkSection=search'
$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function UpdateSearchName(SearchId) {if(gE("new_searchname_"+SearchId).value=="") {gE("searchname_update_"+SearchId).innerHTML="The search title cannot be empty. Please enter a search title.";gE("searchname_update_"+SearchId).style.display='block';return false;}
if(gE("new_searchname_"+SearchId).value.indexOf("#&#")>-1) {gE("searchname_update_"+SearchId).innerHTML="The search title cannot contain an #&#. Please change your search title.";gE("searchname_update_"+SearchId).style.display='block';return false;}
gE("searchname_update_"+SearchId).style.display='none';var newsearchname=gE("new_searchname_"+SearchId).value;var query="NewSearchName="+encodeURIComponent(newsearchname)+"&SearchId="+SearchId;query+='&PathInfo='+GetPageName()+'&action=updatesearchname';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query;$AJAX.GetForDelegate(Update_SearchNameDelegate, strURL);}
function Update_SearchNameDelegate(AjaxResponse) {var searchId=AjaxResponse.split("::")[1];if(AjaxResponse.indexOf("success")>-1) {gE("orig_searchname_"+searchId).innerHTML=gE("new_searchname_"+searchId).value;Show_EditTitle(searchId, false);}
else if(AjaxResponse.indexOf("error")>-1) {gE("searchname_update_"+searchId).innerHTML="An unexpected error occured while trying to update your title. Please try again.";gE("searchname_update_"+searchId).style.display='block';}}
function CompleteSearchNameSubmit() {var querystring="";querystring+='PathInfo='+GetPageName()+'&action=completelastaction';$AJAX.GetForDelegate(CompleteLastActionDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}
function ForcedAddSearch(searchname, isalert) {var query="SearchName="+encodeURIComponent(searchname)+"&EmailAlert="+isalert+"&SearchQuery=";if(PageCache.SEOPath!="") {query+=encodeURIComponent(PageCache.SEOPath);}else{query+=encodeURIComponent(PageCache.QueryString);}
query+='&action=forcedaddsearch&PathInfo='+GetPageName();$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+query);}
function RemoveThisarticle(articleId, articleName, IsPageRefresh) {if(IsPageRefresh==undefined) {IsPageRefresh=false;}
tb_showhtml('Remove Article', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=article&height=130&width=300&id="+articleId+"&IsPageRefresh="+IsPageRefresh+"&name="+articleName, false);}
function RemoveThisvideo(videoId, videoName, IsPageRefresh) {if(IsPageRefresh==undefined) {IsPageRefresh=false;}
tb_showhtml('Remove Video', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=video&height=130&width=300&id="+videoId+"&IsPageRefresh="+IsPageRefresh+"&name="+videoName, false);}
function RemoveThisSearch(searchId, SearchName, IsPageRefresh) {if(IsPageRefresh==undefined) {IsPageRefresh=false;}
tb_showhtml('Remove Search', PersonalizationRoot+"AjaxCalls/Remove.aspx?display=search&height=130&width=300&id="+searchId+"&IsPageRefresh="+IsPageRefresh+"&name="+encodeURIComponent(SearchName), false);}
function RemoveAddAlert(searchId, isChecked) {AddRemoveEmailAlert(searchId);}
function AddRemoveEmailAlert(Id) {var querystring='Id='+Id+'&PathInfo='+GetPageName()+'&action=addremovealert';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring;$AJAX.GetAsync(strURL);}
function AddRemoveItemEmailAlert(IdItem, AlertChecked) {var querystring='Id='+IdItem+'&EmailAlert='+AlertChecked+'&action=addremoveitemalert';var strURL=PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring;$AJAX.GetAsync(strURL);}
function RemoveItemFromList(Id, ItemType, IsPageRefresh) {var querystring="Id="+Id+"&ItemType="+ItemType;querystring+='&PathInfo='+GetPageName()+'&action=removeitem&IsPageRefresh='+IsPageRefresh;$AJAX.GetForDelegate(UserOptionsDelegate, PersonalizationRoot+"AjaxCalls/My_Options.aspx?"+querystring);}
function SuccessAction(IsPageRefresh) {var url=window.location.href.split('?')[0];if(url.indexOf(PersonalizationRoot)>-1) {window.location.reload(true);}else{if(typeof ChangeUserAction=='function') {ChangeUserAction();}}}
function CompleteUserAction(tc_pageurl, CheckSignIn) {if(CheckSignIn==undefined) {CheckSignIn=true;}
var IsSignedIn=true;if(CheckSignIn) {IsSignedIn=IsAlreadySignedIn();}
tc_pageurl=tc_pageurl.replace(' ', '+');if(window.location.href==tc_pageurl && IsSignedIn) {if(readTempCookie("issignin")=="true") {SignInOrRegister="SignIn";}
else if(readTempCookie("issignin")=="false") {SignInOrRegister="Register";}
var querystring='action=completelastaction&PathInfo='+GetPageName()+'&NameCookie='+readTempCookie("iname");$AJAX.GetForDelegate(CompleteLastActionDelegate, PersonalizationRoot+"AjaxCalls/Personalization.aspx?"+querystring);}}
function CompleteSearchUserAction(tc_pageurl) {if(window.location.href==tc_pageurl && IsAlreadySignedIn()) {CompleteSearchNameSubmit();}}
function CompleteLastActionDelegate(AjaxResponse) {var html="";var width=280;var height=185;if(AjaxResponse.indexOf("search_limit_exceeded")>-1) {caption="Save Search";width=250;height=145;var params=AjaxResponse.split(":");var searchname="No Search Name";var emailalert=false;var address="";if(params.length>2) {searchname=params[1].split("=")[1];emailalert=params[2].split("=")[1].toLowerCase();}
html='<div id="ten_searches">';html+='<p class="b">You\'ve reached the maximum of 10 saved searches.</p>';html+='<p>Do you want to remove the oldest saved search and save this search?</p>';html+='<div id="tb_tbns"><div id="ten_btns_wrapper"><input type="button" value="Save" class="save_search_btn" onclick="ForcedAddSearch(\''+searchname+'\','+emailalert+');" />';html+='<span class="or">OR</span><a href="javascript:void(0);" onclick="tb_remove();" class="not_save">Do Not Save</a></div></div></div>';}else{var param=AjaxResponse.split("::");var actiontype=param[0].split("&")[0];if(actiontype=="type=search") {width=250;height=130;caption="Save Search";}else{caption="User Action";}
if(SignInOrRegister=="SignIn") {width=300;height=100;html='Welcome Back!';}else{html="<span>Thanks for registering!  Check your email for a confirmation of your registration.</span>";}
html+=' '+param[1]+' '+param[0].split("&")[1];if(typeof ChangeUserAction=='function') {ChangeUserAction();}}
html=encodeURIComponent(html);Facebook.Confirmation_Modal(html);window.setTimeout(function() {Facebook.Modal_Close();Facebook.fadeOutBackground();},5000);}
function RemoveLastAction() {$AJAX.GetAsync(PersonalizationRoot+"AjaxCalls/Personalization.aspx?action=removelastaction");}
function ReQuery(param_key, param_value) {var url=window.location.href.split("?");if(url.length>1) {var UGen=new UrlGen(url[1]);UGen.RemoveParam(param_key);UGen.AddParam(param_key, param_value);window.location.href=url[0]+"?"+UGen.ToString();}else{window.location.href=url[0]+"?"+param_key+"="+param_value;}}
function GetPageName() {var url=window.location.href;if(url.indexOf("http://")>-1) {url=url.substr(7);}
if(url.indexOf("#")>-1) {var arr=url.split("#");url=window.location.hostname+arr[arr.length - 1];}
return url;}
function MyPagingQuery(QueryString) {window.location.href=window.location.href.split("?")[0]+"?"+QueryString;}
function GetSearchLocation() {var location="";var url=GetPageName().split('/');if(url.length==5 && IsNumeric(url[4])) {location=(url[3]+" "+url[4]).toUpperCase();}else{location=SearchCriteria;}
return escape(location);}
function LoadPageDefaults() {if(gE("email")!=undefined) {gE("email").focus();}
if(gE("SearchName")!=undefined) {gE("SearchName").focus();}
if(gE("Email_Add")!=undefined) {gE("Email_Add").focus();}
if(gE("flName")!=undefined) {gE("flName").focus();}}
function UpdateSignUpBox(Name) {var HTML='<h1 class="signup">Sign Up for A New Account</h1>';HTML+="<p>Hi, "+Name+".<br /><br />Did you know that by signing up for a full FrontDoor Account, these properties will be saved to your profile so you can access them later?<br /><br />You're logged in via Facebook Connect, but we need a bit more info to fully enable your account for saving and sharing articles and properties.</p>";HTML+='<em>&nbsp;</em>';$('.signup-box').html(HTML);}
function RemoveCookieByName(CookieName) {var exdate=new Date();exdate.setDate(exdate.getDate() - 1);document.cookie=CookieName+"=Cookie Removed; expires="+exdate.toGMTString()+"; path=/";};var scrippsEnvironment='PROD';function getDartEnterpriseUrl(adtype,pos){adtype=adtype.toUpperCase();var strUrl=MavenAd(adtype,'', 1);return strUrl;}
function setDartEnterpriseBanner(adType, sync_banner, tracking_url) {if(adType=='LEADERBOARD') {if($("#LEADERBOARD").length>0) {boxW=728;boxH=90;$("#LEADERBOARD").html("<iframe src='"+sync_banner+"\' width=\'"+boxW+"\' height=\'"+boxH+"\'"+"frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");}}else{var $bigbox=$('#BIGBOX');if($bigbox.length>0) {boxW=300;boxH=250;if(sync_banner.indexOf("336x850")>-1) {boxW=336;boxH=850;} else if(sync_banner.indexOf("300x600")>-1) {boxW=300;boxH=600;}
$bigbox.html("<iframe src='"+sync_banner+"\' width=\'"+boxW+"\' height=\'"+boxH+"\'"+"frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");if(tracking_url) {$bigbox.append('<img src="'+tracking_url+'" class="cvTrackingPixel hide">');}}}};function Parameter(){var parameters=new Object;this.addParameter=addParameter;this.getParameter=getParameter;this.getKeys=getKeys;function getKeys() {return parameters;}
function addParameter(key, value) {if(!parameters[key])
parameters[key]=new Array();parameters[key].push(value);}
function getParameter(key, separator) {if(!parameters[key])
return;return parameters[key].join(separator);}}
function MetaDataManager(){var m=new Parameter();this.addParameter=m.addParameter;this.getParameter=m.getParameter;this.getKeys=m.getKeys;this.getPageType=getPageType;this.getPageTitle=getPageTitle;this.getSite=getSite;this.getSctnId=getSctnId;this.getSctnName=getSctnName;this.getSponsorship=getSponsorship;this.getAbstract=getAbstract;this.getKeywords=getKeywords;this.getClassification=getClassification;this.getSctnDspName=getSctnDspName;this.getCategoryDspName=getCategoryDspName;this.getShowAbbr=getShowAbbr;this.getChefName=getChefName;this.getMealPart=getMealPart;this.getCusine=getCusine;this.getOccasion=getOccasion;this.getSpecialInterest=getSpecialInterest;this.getMainIngredient=getMainIngredient;this.getSeason=getSeason;this.getTechnique=getTechnique;this.getVodType=getVodType;this.getRole=getRole;this.getMultimediaFlag=getMultimediaFlag;this.setMultimediaFlag=setMultimediaFlag;this.getDetailId=getDetailId;this.getSearchTerm=getSearchTerm;this.getPageNumber=getPageNumber;this.getUniqueId=getUniqueId;this.getChannel=getChannel;this.getKeywords=getKeywords;this.getPageKeywords=getPageKeywords;this.getUserId=getUserId;this.getUserIdEmail=getUserIdEmail;this.getUserIdCreateDt=getUserIdCreateDt;this.getUserIdVersion=getUserIdVersion;this.getPageCompany=getPageCompany;this.getPageBroker=getPageBroker;this.getPageBrokerOffice=getPageBrokerOffice;this.getPagePageAgent=getPagePageAgent;this.getPageZipCode=getPageZipCode;function getUniqueId () {var vpn=this.getParameter("UniqueId"," ");if(vpn==null) {vpn="";}
return vpn;}
function getChannel() {var ch=this.getParameter("Channel", " ");if(ch==null) {ch="";}
return ch;}
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
function initAdManager(am) {var ranNum=String(Math.round(Math.random()*10000000000));var now=new Date();var ad_ord=now.getTime()%10000000000;if(document.usemetadataManager==1 && "mdManager" in window) {var amPageType=mdManager.getPageType() ;var amSponsorship=mdManager.getSponsorship();var amKeywords=mdManager.getKeywords();var amPageKeywords=mdManager.getPageKeywords();amPageType=amPageType.replace(/-/g , "_");var amUniqueId=mdManager.getUniqueId();amUniqueId=amUniqueId.replace(/-/g, "_");var amChannel=mdManager.getChannel();amChannel=amChannel.replace(/-/g, "_");if(amSponsorship!="" && amSponsorship!=undefined) {amSponsorship=amSponsorship.replace(/-/g , "_");amSponsorship=amSponsorship.replace(/ /g , "_");}
if(amKeywords!="" && amKeywords!=undefined) {}
if(amKeywords!="" && amKeywords!=undefined) {amKeywords=amKeywords.replace(/ /g , "_");amKeywords=amKeywords.replace(/-/g , "_");var amKeywords=amKeywords.split(",");var keygroup='';if(amKeywords!="" | amKeywords!="null"){for(i=0; i<amKeywords.length; i++) {key=(amKeywords[i]);keyword1=('keyword='+key);keygroup=keygroup+'&'+keyword1;}
amKeywords=keygroup;}}
amSctns=mdManager.getClassification();amSctns=amSctns.split(",");if(amSctns.length>1) {for (var i=0; i<amSctns.length; i++) {if(i==(amSctns.length-1)) {am.addParameter("sitesection", amSctns[i]);} else if(i==(amSctns.length-2)) {am.addParameter("category", amSctns[i]);} else if(i==(amSctns.length-3)) {am.addParameter("vgncontent", amSctns[i]);}else{am.addParameter("SUBSECTION", amSctns[i]);}}}else{var c=mdManager.getClassification();am.addParameter("category", c);}
if(amPageType=='SECTION') {if(!am.getParameter("vgncontent", " ")) {am.addParameter("page", "MAIN");}}
var s=mdManager.getSite();am.addParameter("site",s);var gsId=mdManager.getSctnId();am.addParameter("tile", ranNum+gsId);am.addParameter("ord", ad_ord);am.addParameter("topic", amSponsorship);am.addParameter("keyword", amKeywords);am.addParameter("keyword", amPageKeywords);am.addParameter("pagetype", amPageType);am.addParameter("uniqueid", amUniqueId);am.addParameter("channel", amChannel);var sId=mdManager.getSctnId();am.addParameter("SECTION_ID", sId);am.addParameter("Company", document.globalPageCompany);am.addParameter("Broker", document.globalPageBroker);am.addParameter("Office", document.globalPageBrokerOffice);am.addParameter("Agent", document.globalPagePageAgent);am.addParameter("ZipCode", document.globalPageZipCode);am.addParameter("home_age", document.globalPageHomeAge);}else{var amPageType=document.globalPageType;var amSponsorship=document.globalPageSponsorship;amPageType=amPageType.replace(/-/g , "_");if(amSponsorship!="" && amSponsorship!=undefined) {amSponsorship=amSponsorship.replace(/-/g , "_");amSponsorship=amSponsorship.replace(/ /g , "_");}
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
if(typeof (adtag_globalCBSRTransactionId)=="undefined") {mdManager.addParameter("transactionID", "");}else{mdManager.addParameter("transactionID", adtag_globalCBSRTransactionId);}
if(typeof (adtag_globalProductName)=="undefined") {mdManager.addParameter("productName", "");}else{mdManager.addParameter("productName", adtag_globalProductName);}
if(typeof (adtag_globalQualityCr)=="undefined") {mdManager.addParameter("QualityCr", "");}else{mdManager.addParameter("QualityCr", adtag_globalQualityCr);}
if(typeof (adtag_globalCommerceEvent)=="undefined") {mdManager.addParameter("commerceEvent", "");}else{mdManager.addParameter("commerceEvent", adtag_globalCommerceEvent);}
if(typeof (adtag_globalChannel)=="undefined") {mdManager.addParameter("Channel", "");}else{mdManager.addParameter("Channel", adtag_globalChannel);}}
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
DartAd.prototype=new Ad();function DartAd(){DartAd.prototype=new Ad();this.write=write;this.useFeature("site");this.useFeature("category");this.useFeature("vgncontent");this.useFeature("ord");this.useFeature("topic");this.useFeature("tile");this.useFeature("pagetype");this.useFeature("SECTION_ID");this.useFeature("SUBSECTION");this.useFeature("page");this.useFeature("uniqueid");this.useFeature("channel");this.useFeature("SearchKeywords");this.useFeature("SearchFilters");this.useFeature("keyword");this.useFeature("Company");this.useFeature("Broker");this.useFeature("Office");this.useFeature("Agent");this.useFeature("ZipCode");this.useFeature("home_age");function write() {document.write('<script type="text/javascript" language="JavaScript" src="'+this.buildExpandedUrl()+'"></script>');}}
AdUrl.prototype=new Ad();function AdUrl(){AdUrl.prototype=new Ad();this.write=write;this.useFeature("site");this.useFeature("category");this.useFeature("vgncontent");this.useFeature("ord");this.useFeature("topic");this.useFeature("tile");this.useFeature("pagetype");this.useFeature("SECTION_ID");this.useFeature("SUBSECTION");this.useFeature("page");this.useFeature("uniqueid");this.useFeature("channel");this.useFeature("SearchKeywords");this.useFeature("SearchFilters");this.useFeature("keyword");this.useFeature("Company");this.useFeature("Broker");this.useFeature("Office");this.useFeature("Agent");this.useFeature("ZipCode");this.useFeature("home_age");function write() {}}
function AdManager(){var p=new Parameter();this.addParameter=p.addParameter;this.getParameter=p.getParameter;this.getKeys=p.getKeys;this.createAd=createAd;this.createDeferredAd=createDeferredAd;this.moveAds=moveAds;function createAd(ad) {for (key in this.getKeys()) {if(ad.getFeature(key)!=undefined) {ad.addParameter(key, this.getParameter(key, ','));}}
if(document.debug==1)
ad.debug();ad.write();}
function createDeferredAd(i) {}
function moveAds() {}};//AG-develop 12.7.1-649 (2012-09-20 11:43:57 EDT)
var rsi_now= new Date();
var rsi_csid= 'A09802';if(typeof(csids)=="undefined"){var csids=[rsi_csid];}else{csids.push(rsi_csid);};function rsiClient(Fa){this._rsiaa=Fa;this._rsiba=1;this._rsica=1;this._rsida=0;this._rsiea=0;this._rsifa=0;this._rsiga="1204111";this._rsiha="pix04.revsci.net";this._rsiia="js";this._rsija="b";this._rsika="3";this._rsila=3;this._rsima=1;this._rsina=0;this._rsioa=new Array();this._rsipa=0;this._rsiqa=null;this._rsira=null;this._rsisa=null;this._rsita=null;this._rsiua=null;this._rsiva=null;this._rsiwa=0;this.DM_cat=function(Ga){this._rsiqa=Ga;};this.DM_name=function(Ha){this._rsira=Ha;};this.DM_keywords=function(st){this._rsisa=st;};this.DM_event=function(Ia){this._rsita=Ia;};this.DM_addToLoc=function(n,v){this._rsiua=_rsixa(this._rsiua,n,v);};this.DM_addEncToLoc=function(n,v){this.DM_addToLoc(_rsiya(n),_rsiya(v));};this.DM_setLoc=function(u){this._rsiua=u;};this.rsi_c=function(Fa){this._rsiaa=Fa;};this.rsi_ral=function(Ja){this._rsiba=Ja;};this.rsi_riu=function(Ka){this._rsica=Ka;};this.rsi_tiu=function(La){this._rsida=La;};this.rsi_m=function(Ma){this._rsiea=Ma;};this.rsi_dw=function(Na){this._rsifa=Na;};this.rsi_s=function(Oa){this._rsiha=Oa;};this.rsi_t=function(Pa){this._rsiia=Pa;};this.rsi_en=function(Qa){this._rsija=Qa;};this.rsi_cn=function(Ra){this._rsika=Ra;};this.rsi_us=function(Sa){this._rsila=Sa;};this.rsi_ra=function(ra){this._rsima=ra;};this.rsi_ieac=function(ac){this._rsina=ac;};this.DM_tag=function(){var Ta;if(this._rsipa==0||this._rsiea==1){if(typeof(DM_prepClient)=="function"){try{DM_prepClient(this._rsiaa,this);}catch(ignore){}}var Ua=this._rsiza();if(this._rsiia=="gif"){Ta=new Image(2,3);Ta.src=Ua;this._rsioa[this._rsioa.length]=Ta;}else if(this._rsiia=="js"){if(this._rsifa==1){document.write("<script language=\"JavaScript\" type=\"text/javascript\" src=\""+Ua+"\"><"+"/script>");}else{var Va=document.createElement("script");Va.language="JavaScript";Va.type="text/javascript";Va.src=Ua;var Wa=(document.body==null)?document.getElementsByTagName("head")[0]:document.body;if(this._rsina&&_rsiAa()){Wa.appendChild(Va);}else{Wa.insertBefore(Va,Wa.firstChild);}Ta=Va;}}this._rsipa=1;}this.rsi_r();return Ta;};this._rsiza=function(){var Xa="";this.DM_addEncToLoc("_rsiL",this._rsiwa);Xa="DM_LOC="+_rsiya(this._rsiua);if(this._rsiqa){Xa+="&DM_CAT="+_rsiya(this._rsiqa);}if(this._rsita){Xa+="&DM_EVT="+_rsiya(this._rsita);}if(this._rsisa){Xa+="&DM_KYW="+_rsiya(this._rsisa);}if(this._rsica==1&&this._rsiva){Xa+="&DM_REF="+_rsiya(this._rsiva);}if(this._rsida==1){Xa+="&DM_TIT="+_rsiya(document.title);}if(this._rsira){Xa+="&DM_NAM="+_rsiya(this._rsira);}Xa+="&DM_EOM=1";var Ya="http"+(location.protocol=="https:"?"s":"")+"://";var Za="/"+this._rsiaa+"/"+this._rsija+this._rsika+"/0/"+this._rsila+"/"+this._rsiga+"/";var $a=Math.floor(Math.random()*1000000000)+"."+this._rsiia;var ab=Ya+this._rsiha+Za+$a+"?D="+_rsiya(Xa)+"&C="+_rsiya(csids);var bb=ab.length;if(bb>=2000){if(ab.charAt(1998)=='%'){ab=ab.substr(0,1998);}else if(ab.charAt(1999)=='%'){ab=ab.substr(0,1999);}else{ab=ab.substr(0,2000);}if(ab.charAt(ab.length-3)=='%'&&ab.charAt(ab.length-2)=='2'&&ab.charAt(ab.length-1)=='5'){ab=ab.substr(0,ab.length-3);}}return ab;};this.rsi_r=function(){var cb;var db;var eb=0;var fb=0;if(this._rsiba==1){var gb=window;while(true){try{cb=gb.document.location;db=gb.document.referrer;eb=fb;}catch(notAllowed){}if(gb==window.top||gb==gb.parent){break;}gb=gb.parent;fb++;}}else{cb=window.document.location;db=window.document.referrer;}this._rsiwa=fb-eb;this._rsiva=this._rsima?_rsiBa(db.toString()):db.toString();if(this._rsiwa==0){this._rsiua=(this._rsima)?_rsiBa(cb.href):cb.href;}else{this._rsiua=this._rsiva;}this._rsiqa=null;this._rsira=null;this._rsisa=null;this._rsita=null;};this.rsi_r();}var _rsiya;if(typeof(encodeURIComponent)=="function"){_rsiya=encodeURIComponent;}else{var _rsiCa=new RegExp("[\x00-\x20]|[\x22-\x26]|[\x2B-\x2C]|\x2F|[\x3A-\x40]|[\x5B-\x5E]|\x60|[\x7B-\x7D]|[\x7F-\uFFFF]","g");_rsiya=function(v){return v.toString().replace(_rsiCa,_rsiDa);}}function _rsixa(u,n,v){return u+(u.indexOf("?")==-1?"?":"&")+n+"="+v;}function _rsiBa(u){var i=u.indexOf('#');return(i>=0)?u.substr(0,i):u;}function _rsiEa(i){var hb=i.toString(16).toUpperCase();return hb.length<2?"0"+hb:hb;}function _rsiDa(c){var i=c.charCodeAt(0);if(isNaN(i))return "";if(i<128)return "%"+_rsiEa(i);if(i<2048)return "%"+_rsiEa(0xC0+(i>>6))+"%"+_rsiEa(0x80+(i&0x3F));if(i<65536)return "%"+_rsiEa(0xE0+(i>>12))+"%"+_rsiEa(0x80+(i>>6&0x3F))+"%"+_rsiEa(0x80+(i&0x3F));return "%"+_rsiEa(0xF0+(i>>18))+"%"+_rsiEa(0x80+(i>>12&0x3F))+"%"+_rsiEa(0x80+(i>>6&0x3F))+"%"+_rsiEa(0x80+(i&0x3F));}function _rsiAa(){return(navigator.appName=='Microsoft Internet Explorer');}window[rsi_csid]=new rsiClient(rsi_csid);
function DM_cat(aa){window[rsi_csid].DM_cat(aa);}function DM_name(ba){window[rsi_csid].DM_name(ba);}function DM_keywords(kw){window[rsi_csid].DM_keywords(kw);}function DM_event(ca){window[rsi_csid].DM_event(ca);}function DM_addToLoc(n,v){window[rsi_csid].DM_addToLoc(n,v);}function DM_addEncToLoc(n,v){window[rsi_csid].DM_addEncToLoc(n,v);}function DM_setLoc(u){window[rsi_csid].DM_setLoc(u);}function DM_tag(){window[rsi_csid].DM_tag();}
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
function OmCommerce(linkObject, EventId, Product, LinkName) {var s_account=omniRS;var s=s_gi(s_account);s.linkTrackVars='products,events';s.linkTrackEvents=EventId;s.events=EventId;s.products=Product;s.tl(linkObject, 'o', LinkName);}
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
window.location.reload();}else{ShowClaimStatusModalWindow();}});}else{var modalInfo={header: "Pro Account Required",text: "<p>You need to have a pro account to confirm listings.<br/><br/>Would you like to convert to a pro account now?</p>",btntext: "Convert to Pro",btnclick: function() { document.location=SSLRoot+"/pro/upgrade/"+idListing+"/"+IdAccount; },lnktext: "no, thank you.",lnkclick: function() { CloseProAccountModal(); }}
if($('#divProAccountModal').length==0) {var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=GetPlainResponse";$.get(URL, function(data) {CreateAndFillProListingClaimContainer(data);ShowProAccountModalWindow(modalInfo);});}else{ShowProAccountModalWindow(modalInfo);}}}else{window.location="/pro/claimlistings/step1/"+idListing;}
return false;}
function HandleThisIsMeClick(idagent, agentEmail, idListing, IdAccount) {var URL=WebRoot+"Controls//AjaxCalls//AgentProfile//ProListingClaim.aspx?Task=CheckEmailAssociatedAccount&AgentEmail="+agentEmail+"&SurpressPageOutput=true";$.get(URL, function(data) {eval(data);if(typeof (existsUser)!='undefined' && existsUser!=null) {if(typeof (userType)!='undefined' && userType!=null) {if(existsUser==true) {Facebook.Account_Login('PerformClaimListingTHISISME', idListing, IdAccount);}else{HandleAnonymousClaim(idListing, idagent, IdAccount);}}}});}
function HandleAnonymousClaim(idListing, idagent, IdAccount) {var claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=AnonymousClaim&IdListing="+idListing+"&IdParentAccount="+IdAccount;$.get(claimURL, function(data) {CreateAndFillProListingClaimContainer(data);if($('#spnListingClaimStatus').html().indexOf('SUCCESS')!=-1) {document.location='/pro/claimlistings/step2/'+idListing+'/'+idagent;}else{ShowClaimStatusModalWindow();}});}
function HandleBulkClaim(idListing, idagent, pagetype){var errorMessage='';var selectedlistings=$('#spnSelectedListingsContainer span');var _arrIdLst=[];var _arrIdAcc=[];$.each(selectedlistings, function(ix, selected){var idlst=selected.id.replace('sellst_', '');var IdAccount=$(selected).attr('idacc');_arrIdLst.push(idlst);_arrIdAcc.push(IdAccount);});var claimURL=null;if(pagetype=="claimlistings"){claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=BulkClaim&IdListing=idlst&IdParentAccount=IdAccount&SurpressPageOutput=true";}
else{claimURL=WebRoot+"Controls/AjaxCalls/AgentProfile/ProListingClaim.aspx?Task=BulkClaim&IdListing=idlst&IdParentAccount=IdAccount&SurpressPageOutput=true&IsAnonymous=true";}
$.ajax({type: "POST",url: claimURL,async: false,data: { arrIdLst: _arrIdLst.join(","), arrIdAcc: _arrIdAcc.join(",") },success: function(data){eval(data);if(listingClaimStatus.indexOf('SUCCESS')==-1){errorMessage=listingClaimStatusDescription;}}});if(errorMessage==''){Facebook.Confirmation_Modal("You have successfully confirmed the listings.");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();if(pagetype=="claimlistings"){document.location="/pro/view-listings";}
else{document.location.reload(true);}}, 5000);}
else{Facebook.Confirmation_Error_Modal(errorMessage, "Error");window.setTimeout(function(){Facebook.Modal_Close();Facebook.fadeOutBackground();document.location.reload(true);}, 5000);}
if(pagetype!="claimlistings"){document.location=SSLRoot+'/pro/claimlistings/step3/'+idListing+'/'+idagent;}}
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
e.focus();};function center(el, x, y) {var p=el.parentNode, s=el.style;var l=((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');var t=((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');if(x) s.left=l>0 ? (l+'px') : '0';if(y) s.top=t>0 ? (t+'px') : '0';};function sz(el, p) {return parseInt($.css(el,p))||0;};})(jQuery);;var cartNavigateAwayMessage="Are you sure you want to navigate away?";var autoLogoutTimer;var wait=15;var currentAutoLogoutPage;function InitAutoLogout(currentPage) {currentAutoLogoutPage=currentPage;document.onkeypress=resetAutoLogoutTimer;document.onmousemove=resetAutoLogoutTimer;}
function resetAutoLogoutTimer() {clearTimeout(autoLogoutTimer);autoLogoutTimer=setTimeout("autoLogout()", 60000 * wait);}
function autoLogout() {var exdate=new Date();exdate.setDate(exdate.getHours()+24);var CookieValue="a=reauth&d1="+currentAutoLogoutPage+"&d2=timeout";document.cookie="lgn_c="+CookieValue+"; expires="+exdate.toGMTString()+"; path=/";DisableNavigateAwayMessage();Facebook.Confirmation_Error_Modal("You have been logged out due to inactivity.", "Oops!");window.setTimeout("window.location.href='/login'", 4000);}
function ShowChangeBillingShippingInfoModal(isBilling, commit) {DisableNavigateAwayMessage();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/BillingShippingHtml.ashx?isBilling="+isBilling+"&isModal=true&commit="+commit+"&timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowBillingShippingSuccessModal(isBilling) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/BillingShippingSuccessModal.ashx?isBilling="+isBilling+"&timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowExpiredCardModal() {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/ExpiredCardModal.ashx?timestamp="+GetTimestamp(),data: "",success: function(output) {fadeInCreditsBackground();$(trim(output)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowRemoveItemFromOrderModal(ix) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/RemoveItemFromOrderModal.ashx?ix="+ix+"&timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();$('.btn-submit').blur();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowRemoveAlertModal(alertId) {if(readCookie('DoNotShowRemoveAlertModal')!='true') {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/RemoveAlertModal.ashx?alertId="+alertId+"&timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}else{RemoveAlert(alertId);}}
function ShowCreditSubscriptionsModal() {CloseAllModals();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/CreditSubscriptionsModal.ashx?timestamp="+GetTimestamp(),data: "",success: function(data) {fadeInCreditsBackground();$(trim(data)).modal();},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ShowCancelChangeSubscriptionModal(itemId, cancel, success) {CloseAllModals();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/Modals/CancelChangeSubscriptionModal.ashx?itemId="+itemId+"&cancel="+cancel+"&success="+success+"&timestamp="+GetTimestamp(),data: "",success: function (data) {fadeInCreditsBackground();$(trim(data)).modal();if(!success) {window.PwdValidator=new PasswordValidator('#password_container', 3);HandleInputControls();AddBlurHandlersToPasswordAndPasswordHintFields('#password_container');}
if(cancel && success) {OmCommerce('this', '', 'Credits;'+$('#cancelledProductName', data).val(), 'Cancel Subscription');}},error: function (jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
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
function RemoveItemFromOrder(ix) {$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/RemoveItemFromOrder.ashx?ix="+ix+"&timestamp="+GetTimestamp(),data: "",success: function(data) {HandleCartPage(data);AttachQuantityInputEvents();OmCommerce('this', 'scRemove', 'Credits;'+$('#removedProductName').val(), 'Remove from cart');},error: function(jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function RecalculateOrder(ix, qty) {DisableNavigateAwayMessage();$.ajax({type: "GET",url: "/controls/AjaxCalls/Credits/RecalculateOrder.ashx?ix="+ix+"&qty="+qty+"&timestamp="+GetTimestamp(),data: "",success: function (data) {HandleCartPage(data);AttachQuantityInputEvents();},error: function (jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
function ProductAutoRenew(idListing, autoRenew, prdType, creditCount, addrDisplay, expDate) {$.ajax({type: "POST",url: "/controls/AjaxCalls/Credits/ProductAutoRenew.ashx?timestamp="+GetTimestamp(),data: {idListing: idListing,autoRenew: autoRenew},success: function (data) {if(autoRenew==0) {var cancelledLabel="";if(prdType=="showstopper") {cancelledLabel="a showstopper";}else{cancelledLabel=prdType;}
Facebook.Confirmation_Modal("You have removed recurring "+prdType+" status from "+addrDisplay+".  This listing will stop being "+cancelledLabel+" as of "+formatProperDate(expDate), "Auto Renew Disabled");}else{Facebook.Confirmation_Modal("Your listings will renew "+prdType+" status every 30 days. We will deduct "+creditCount+" "+(creditCount==1 ? "credit" : "credits")+" from your balance until recurring is turned off.", "Auto Renew Enabled");}},error: function (jqXHR, textStatus, errorThrown) {OutputToConsole(jqXHR.responseText);}});}
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
if(RegExDate.test(date)) {var dateParts=date.split('/');var theMonth=parseInt(dateParts[0],10);var theYear=parseInt(dateParts[1],10);var currentDate=new Date();if(theYear<currentDate.getFullYear()||(theYear==currentDate.getFullYear() && theMonth<=currentDate.getMonth()+1))
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
function PLcheckboxClickHandler(ref) {var lid=ref.id.replace(/lst_/, '');if($(ref).is(':checked')) {if(promoteTypePage=='ShowstopperListing' && $(ref).attr('productType')=='FeaturedListing') {$("#upgrade_"+lid).hide();$("#options_"+lid).show();}
$("#ft_"+lid+", #ar_"+lid).removeAttr("disabled");}else{if(promoteTypePage=='ShowstopperListing' && $(ref).attr('productType')=='FeaturedListing') {$("#upgrade_"+lid).show();$("#options_"+lid).hide();}
$("#ft_"+lid+", #ar_"+lid).attr("disabled", "disabled");}
PLUpdateSelectAllNoneZone();PLUpdateListingsSelectedZone();PLUpdateConfirmListingsZone();}
function PLUpgradeClickHandler(lid) {$("#lst_"+lid).attr('checked', 'checked');$("#ft_"+lid+", #ar_"+lid).removeAttr("disabled");$("#upgrade_"+lid).hide();$("#options_"+lid).show();PLUpdateSelectAllNoneZone();PLUpdateListingsSelectedZone();PLUpdateConfirmListingsZone();}
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
function BuyPhysicalGoods(isAgentLoggedIn, hasClaimedListings) {if(isAgentLoggedIn=='True') {if(hasClaimedListings=='True') {window.location.href="/Proxies/ArgosyProxy.aspx";}else{$(function () {$.ajax({url: "/controls/AjaxCalls/Facebook/PhysicalGoodsModal.aspx",data: "",success: function (output) {Facebook.fadeInBackground();$(output).modal();}});});}}else{Facebook.Account_Login('buyCredits');}}
$(document).ready(function() {ClearCardData();});;