/* 10/13/2008: loginToutUserContribution() login_wrapper_uc.. */

function getURL(){
	return document.URL;
}

var regVisitor = mag_user.user_name;
var regVisitorname = mag_user.first_name;

var currPos = getURL();

/* start login code from Seventeen */
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

var loginVerify = function(muser){ //Harveynash was remove a variable (huser) is not use in function
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
//Harveynash was remove a variable (hearst_user) is not use in below function
var lv = new loginVerify(mag_user);
/* end login code from Seventeen */

function loginTout() {
	var loginT = document.getElementById("login_wrapper");
	if (mag_user.logged_in) {
		loginT.innerHTML = "<div id='login_header'>LOG IN</div><div id='login_box'><div id='loggedin_info'>Welcome back, " + regVisitorname + "<br /><TMPL_IF UR_HAS_RECIPE_BOOK><a href='/recipebook/' target='_blank'>> Go to my Recipebook</a><br /></TMPL_IF><a href='/registration/logout?next_url=" + currPos + "'>Logout</a></div></div>";
	}
	else {
		loginT.innerHTML = "<div id='login_header'>LOG IN</div><div id='login_box'><div id='login_fields'><form name='login' method='post' action='/registration/login' /><input type='hidden' name='next_url' value='" + currPos + "' /><input type='hidden' name='remember_me' value='1' /><span>username: </span><input class='login'  name='user_name' value='' /><br /><span>password:</span><input type='password' name='password' /><input type='image' name='submit' value='submit' src='/cm/shared/recipefinder2/redbook/default/images/sign-in-button.gif' border='0' alt='SUBMIT' class='submit' /></div><div class='clear'></div><div id='login_links'><a href='/registration/'>Haven't Signed Up Yet?</a><br /><a href='/registration/forgotPassword.html'>Forgot your Password?</a></div></form></div>";
	}
}

function loginToutUserContribution() { /* based on loginTout() for recipefinder, above */
	var loginT = document.getElementById("login_wrapper_uc");
	if (!mag_user.logged_in) {
		loginT.innerHTML = "<div id='login_box'><form name='login' method='post' action='/registration/login' /><input type='hidden' name='next_url' value='" + currPos + "' /><input type='hidden' name='remember_me' value='1' /><div style='float:left;clear:both;margin:6px 0px;'><div style='float:left;width:140px;padding:5px 0px;'>Username or Email:</div><input style='border:1px solid #DDDDDD;color:#787878;float:left;clear:right;font-size:16px;height:24px;margin:0 10px 0 0;padding:0 4px;width:300px;' name='user_name' value='' /></div><div style='float:left;clear:both;margin:6px 0px;'><div style='float:left;width:140px;padding:5px 0px;'>Password:</div><input style='border:1px solid #DDDDDD;color:#787878;float:left;clear:right;font-size:16px;height:24px;margin:0 10px 0 0;padding:0 4px;width:300px;' type='password' name='password' /></div><input style='float:right;margin:10px 10px 10px 0px;' type='image' name='submit' value='submit' src='/cm/redbook/images_tmpl/btn_signIn.gif' border='0' alt='Sign In' /></form><div id='forgot_pw'><a href='/registration/forgotPassword.html'>Forgot your username or password?</a></div><div id='prompt_to_register'><a href='/registration/'><span class='k'>Not a member? </span>Join FREE</a></div><div class='clear'></div></div>";
	}
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