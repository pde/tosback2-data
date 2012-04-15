// JavaScript Document
expanded = 0;

function expander(){	
	if(expanded==0){	
		var showDiv = document.getElementById('form');
		var hiddenDiv = document.getElementById('login_buttons'); 
		hiddenDiv.style.display = "none";
                hiddenDiv.style.height = "0px"; 
		showDiv.style.display = "block";
		expanded = 1;
	}else{
		var showDiv = document.getElementById('form');
		var hiddenDiv = document.getElementById('login_buttons'); 
		hiddenDiv.style.display = "block"; 
		showDiv.style.display = "none";
		expanded = 0;	
	}	
}

function getURL(){
    return document.URL;
}

var regVisitor = mag_user.user_name;
var regVisitorname = mag_user.first_name;
var regfirstname = mag_user.first_name;

var currPos = getURL();

var scope_day = mag_user.dob_day;

var scope_month = mag_user.dob_month;

var astrosign = mag_user.zodiac

/* basic cookie call functions, redundant definitions, but still.. */
function createCookie(name, value, days){
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else 
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) 
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name){
    createCookie(name, "", -1);
}

function verifyForm(f){
    var passable = true;
    document.getElementById("flogin_username").innerHTML = "";
    document.getElementById("flogin_password").innerHTML = "";
    if (f.user_name.value == "") {
        document.getElementById("flogin_username").innerHTML = "please type in username<br>";
        passable = false;
    }
    if (f.password.value == "") {
        document.getElementById("flogin_password").innerHTML = "please type in password<br>";
        passable = false;
    }
    //	alert(f.user_name.value);
    //	alert(f.password.value);
    return passable;
}

var loginVerify = function(huser, muser){
    this.status = 0; // the base status check, it's just a secondary measure I've put in
    /*	0	-	user is not logged in
     *	1	-	user is logged in
     *	200	-	user login error (unknown error)
     *	201	-	user login error (bad password)
     *	202	-	user login error (bad username)
     *
     */
    this.online = false;
    this.errorCode = 0; // error code - 0: no error - 1: auth failure
    this.outputError = "";
    var url = document.location.href;
    if (typeof muser.logged_in != "undefined") {
        this.online = true;
    }
    
    if (this.online) {
        this.status = 1;
        eraseCookie("loginFailure");
    }
    else {
        if (/ur_login_failed/.test(url)) {
            this.status = 200;
            this.errorCode = 1;
            var authCheck = readCookie("loginFailure");
            if (authCheck > 3) {
                window.location.href = "/login/error_trouble";
            }
            if (authCheck == null) {
                authCheck = 0;
            }
            createCookie("loginFailure", ++authCheck);
            this.outputError = "Invalid ID or password. Failed login attempt: " + authCheck;
            
            /*			if (/missing%20password/.test(url)){
             this.outputError = "invalid password";
             this.status = 201;
             this.errorCode = 1;
             } else {
             this.outputError = "Invalid ID or password. Please try again.";
             this.status = 202;
             this.errorCode = 2;
             }*/
        }
        else {
            this.status = 0;
        }
    }
    
}
var lv = new loginVerify(hearst_user, mag_user);


function toutLogin() {

/* Not being used anymore .. but leave function there just in case being call somewhere.
if (mag_user.logged_in) {
		document.write('<div id="CNTR_logged_in_head"><div id="CNTR_logged_in_title_text" style="margin-left:5px; margin-top:2px;"><div id="logged_in_title_text"><a href="/community/"><img src="/cm/countryliving/images/design/v01/login/CL_club_logo.gif"></a></div></div><div id="CNTR_logged_in_name_text"><div id="logged_in_name_text">Welcome, ');
		document.write(regVisitor);
		document.write('</div></div></div>');
		document.write('<div id="CNTR_logged_in_messages" class="logged_in_menua"><div id="CNTR_logged_in_messages_text" class="logged_in_menua_item" style="margin-left:20px;"><div id="logged_in_messages_text" class="logged_in_menua_text"><a id="loginmessagelinks" href="/community/pm/">Messages ');
		document.write(' (' + mag_user.private_messages_count + ')');
		document.write('</a></div></div></div>');
		document.write('<div id="CNTR_logged_in_comments" class="logged_in_menua"><div id="CNTR_logged_in_comments_text" class="logged_in_menua_item"><div id="logged_in_comments_text" class="logged_in_menua_text"><a href="/community/guestbook/">Guestbook ');
		document.write(' (' + mag_user.guestbook_comments_count + ')');
		document.write('</a></div></div></div>');
		document.write('<div id="CNTR_logged_in_requests" class="logged_in_menua"><div id="CNTR_logged_in_requests_text" class="logged_in_menua_item"><div id="logged_in_requests_text" class="logged_in_menua_text"><a id="loginrequestslinks" href="/community/profile/#friendlistcontainer">Requests ');
		document.write(' (' + mag_user.friends_requests_count + ')');
		document.write('</a></div></div></div>');
		document.write('<div id="CNTR_logged_in_menub_wrapper"><div id="CNTR_logged_in_myprofile_text" class="logged_in_menub_item"><a href="/community/profile/"><div id="logged_in_myprofile_text" class="logged_in_menub_text">My Profile</div></a></div><div id="CNTR_logged_in_myregistration_text" class="logged_in_menub_item"><a href="/registration/"><div id="logged_in_myregistration_text" class="logged_in_menub_text">Edit Registration</div></a></div><div id="CNTR_logged_in_mycommunityregistration_text" class="logged_in_menub_item"><a href="/registration/editProfile.html"><div id="logged_in_myregistration_text" class="logged_in_menub_text">Edit Community Profile</div></a></div><div id="CNTR_logged_in_mboards_text" class="logged_in_menub_item"><a href="/community/forums/"><div id="logged_in_mboards_text" class="logged_in_menub_text">Message Boards</div></a></div><div id="CNTR_logged_in_blogs_text" class="logged_in_menub_item"><a href="/rf/recipebook/" target="_blank"><div id="logged_in_blogs_text" class="logged_in_menub_text">My Recipe Book</div></a></div></div>');
		document.write('<div id="CNTR_logged_in_logout" style="width:42px; height:17px; margin-right:4px;"><a href="/registration/logout?next_url=');
		document.write(currPos);
		document.write('"><img src="/cm/countryliving/images/design/v01/login/log_out.gif" width="42" height="15" alt="LOGOUT" /></a></div>');
	}
	else {	
		if (currPos == 'http://www.countryliving.com/?ur_login_failed=invalid%20password.'){
			document.write('<p class="alert" style="margin:0px 7px 2px 9px;color:#a10115;"><strong>There was an error with your login. Please try again.</strong><br></p>');	
		}
		
		document.write('<div style="margin: 4px 2px;"><div id="login_textimage"><a href="/community/"><img src="/cm/countryliving/images/design/v01/login/CL_club_logo.gif"></a></div><div id="login_buttons" style="padding-top:5px;"><div><a style="cursor:pointer; margin-left:15px;" onClick="expander();"><img src="/cm/countryliving/images/design/v01/login/login_button.gif" alt="LOGIN"/></a></div><div><a style="margin-left:15px;" href="/registration/"><img src="/cm/countryliving/images/design/v01/login/register_button.gif" alt="REGISTER"/></a></div></div><div id="form" style="display:none; padding-left:4px; height:115px;"><form action="/registration/login" method="post" ><input type="hidden" name="login" value="1"><input type="hidden" name="next_url" value="');
		document.write(currPos);
		document.write('" /><input type="hidden" name="remember_me" value="1" /><div class="login_text" style="padding-top:2px; float:none;">Username</div><input name="user_name" type="text" size=10 maxlength="35" class="login"  value="" />');
		document.write('<div class="login_text">Password</div><input name="password" type="password" class="login" onFocus="if(this.value==\'Password\')this.value=\'\';" /><div class="login_text"><a href="http://www.countryliving.com/registration/forgotPassword.html">forgot your<br /> password?</a></div><input id="submit_button" type="image" src="/cm/countryliving/images/design/v01/login/go_button.gif" class="go_image" /></form></div></div><br clear="all" />' );
	}
	*/
}
function commentsLogin() {
	document.write('<input type="hidden" value="')
	document.write(currPos);
	document.write('" name="next_url" />');
}

function commentsLoginUsername() {
	if (regVisitor == null) {
	}
	else {
		document.write(regVisitor);
	}
}

var loggedInNow = null;

if (mag_user.logged_in) {
	loggedInNow = true;
} else {
	loggedInNow = false;	
}

function recipeReportAbuse() {
 if (loggedInNow == true){
  document.write('<TMPL_UNLESS EXPR="(UR_COMMUNITY_ACTIVE eq \'Banned\')||(UR_COMMENT_ERROR eq \'permission denied\')"><p id="report_abuse_article"><a href="#" onClick="javascript:reportAbuse(\'<TMPL_VAR article_id>\',\'article\');">Report Abuse</a></p></TMPL_UNLESS>');
 }
}


function cutString(str,num){
  if((!!str) &&(str.length > num)){
 
    var newStr = str.substr(0,num);
 
    newStr += "...";
 
    str = newStr;
 
  return(str);
 
  } else if (!!str){
  return(str)
} else {
  return " ";
}
 
}
if (!!regfirstname) {
 regVisitorname = cutString(regfirstname,12);}
else {
 regVisitorname = cutString(regVisitor,12);}

function hp_login_new() {
	if (mag_user.logged_in) {
		document.write('<div id="sub_hdr_text_wht_rt"><a href="/videos/">Video</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://newsletters.countryliving.com/">Free Newsletter</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.clcomfortzone.com" target="_blank">Promotions</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/sweeps/">Win</a>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Hi <a href="/registration/editProfile.html">'+regVisitorname+'</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/registration/logout?next_url=');
                document.write(currPos); 
                document.write('">Sign out</a></strong></div>');
		
        }
	else {
		document.write('<div id="sub_hdr_text_wht_rt"><a href="/videos/">Video</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://newsletters.countryliving.com/">Free Newsletter</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.clcomfortzone.com" target="_blank">Promotions</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/sweeps/">Win</a>&nbsp;&nbsp;|&nbsp;&nbsp;<strong><a href="/login/">Sign In</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/registration/">Join Free</a></strong></div>');
                
	}
}

/* old */
function hp_login() {
	if (mag_user.logged_in) {
		document.write('<div id="sub_hdr_text_wht_rt"><a href="/videos/">Video</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://newsletters.countryliving.com/">Free Newsletter</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.clcomfortzone.com" target="_blank">Promotions</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/sweeps/">Win</a>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Hi <a href="/registration/editProfile.html">'+regVisitorname+'</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/registration/logout?next_url=');
                document.write(currPos); 
                document.write('">Sign out</a></strong></div>');
		
        }
	else {
		document.write('<div id="sub_hdr_text_wht_rt"><a href="/videos/">Video</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://newsletters.countryliving.com/">Free Newsletter</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.clcomfortzone.com" target="_blank">Promotions</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/sweeps/">Win</a>&nbsp;&nbsp;|&nbsp;&nbsp;<strong><a href="/login/">Sign In</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/registration/">Join Free</a></strong></div>');
                
	}
}

function hp_communityView() {
	if (mag_user.logged_in) {
		document.write('<div id="login_show"><div id="greeting_logout_cntr">');
				document.write('<div id="community_list"><ul>');
                document.write('<li><a href="/rf/recipebook/">My Recipe Book</a></li>');				
                document.write('<li><a href="/community/forums/">Message Boards</a></li>');
                document.write('<li><a href="/janes-blog/">Blogs</a></li></ul></div></div></div>');
	}
	else {
		document.write('');
                
	}
}

$(document).ready(function() {
	if (mag_user && mag_user.logged_in)
	{
		$("#greeting_login").empty();
		$("#greeting_login").text("Hello " + mag_user.user_name);
		$("#login_show").attr("style", "visibility: visible");
		$("#store_text_show").attr("style", "visibility: visible");
	}
	else
	{
		$("#store_button_show").attr("style", "visibility: visible");
	}
});

function validatePostForm(f)
{
    if (f.subject.value == "") {
        alert("Subject empty, please enter a subject");
        f.subject.focus();
        return false;
    }

    if (f.body.value == 0) {
        alert("Empty message, please enter a message or quit.");
        f.body.focus();
        return false;
    }

}

function validatePostFormForum(f)
{
    if (f.post_title.value == "") {
        alert("Subject empty, please enter a subject");
        f.post_title.focus();
        return false;
    }

    if (f.post_body.value == 0) {
        alert("Empty message, please enter a message or quit.");
        f.post_body.focus();
        return false;
    }

}


function forumshideReply() {
	if (mag_user.logged_in) {
		document.write('<a href="#post_reply" rel="nofollow" class="icon_reply nav" target="_top">Reply</a>');
		

	}
	else {
		document.write('');
                
	}
}

function forumshideForm() {
	if (mag_user.logged_in) {
		document.write('<form action="/community/forums/post/" method="POST" id="post" onsubmit="return validatePostFormForum(this)">');
		document.write('<input type="hidden" name="thread_id" value="<TMPL_VAR THREAD_ID>">');
                document.write('<div id="post_reply">Post Reply</div>');
                document.write('<div class="postNavbar">');
                document.write('<span class="nav">');
                document.write('<a class="nav" href="/community/forums/" target="_top">Forums </a>');
                document.write('-&gt;<a class="nav"  target="_top"><TMPL_VAR ESCAPE=JS NAME="topic_name"></a>');
                document.write('</span></div><div class="postMainsetA">');
                document.write('<div class="column1"><span class="gen"><b>Subject</b></span></div>');
                document.write('<div class="column2" style="display:inline;"><input class="post" tabindex="2" maxlength="100" size="35" name="post_title" value="Re: <TMPL_VAR ESCAPE=JS SUBJECT>"></div>');
                document.write('</div>');
                document.write('<div class="postMainsetB" ><div class="column1" style="padding-top:10px;">');
                document.write('<div class="column1box1"><span class="gen"><b>Message body</b></span>');
                document.write('</div><div class="column1box2"></div></div>');
                document.write('<div class="column2" style="padding-left:0px;">');
                document.write('<div class="column2maintextrow"><span class="gen">');
                document.write('<textarea class="body" tabindex="3" name="post_body" rows="15"  cols="35"></textarea>');
                document.write('</span></div></div></div>');
                document.write('<div class="catbottom" style="float:left; padding-right:40px;">');
                document.write('<input type="image" class="mainoption" tabindex="5" type="submit" src="/cm/countryliving/images/community/forums/btn_forums_post.gif">&nbsp;');
                document.write('</div>');
                document.write('</form>');
	}
	else {
		document.write('');
                
	}
}
