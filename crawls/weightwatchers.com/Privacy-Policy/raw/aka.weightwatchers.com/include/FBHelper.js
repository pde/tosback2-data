var FacebookAppId = "";
var EnableFacebookLike = false;
var isTopNavLogin = "";
var fb_info_cookie_name = "FbInfo";
var fb_info_mn_cookie_name = "Mn";
var webTrackingLoginWithFacebookChannel = "login_with_facebook";
var webTrackingAssociationWithFacebookChannel = "Association_with_facebook";
var webTrackingFacebookApplicationPermissionDenied = "application_permission_denied";

window.fbAsyncInit = function () {
    FB.init({
        appId: FacebookAppId,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: EnableFacebookLike, // parse XFBML
		oauth: true
    });
    if (isTopNavLogin == 'true')
        ShowHideTopNavFBControls();
    else
        ShowHideFBControls();
};

function SetFacebookAppId(fbAppid) {
    FacebookAppId = fbAppid;
}

function SetFacebookLikeEnabled(isFacebookLikeEnabled) {
    EnableFacebookLike = isFacebookLikeEnabled;
}

function LoadFBJSSdk() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}

function DoFacebookLogin(doValidation) {
    ResetControls();
    var validationResult = DoValidation(doValidation);
    if (validationResult == true) {
        FB.login(function (response) {
            if (response.authResponse) {
                DoLogin("yes");
                //alert("logged in and app approved")
            } else {
                DoLogin("no");
                //alert("Not loged in or app not approved");
            }
        });
    }
}

function DoLogin(fblogon) {
    try {
        SendOmnitureTracking(fblogon);
    }
    catch (e) { }
    //Login in case loggin with facebook is succeeded "yes" or there is a WW_COM credintial exists.
    if (IsLoginCredentialsExist() || fblogon == "yes") {
        document.getElementById("fblogon").value = fblogon;
        document.forms[0].submit();
    }
}

function SendOmnitureTracking(fblogon) {
    //begin omniture tracking.
    var webTrackingChannel = null;
    var isLoginCredentialsExist = IsLoginCredentialsExist();
    if (fblogon == "yes") {
        if (isLoginCredentialsExist == true) {
            webTrackingChannel = webTrackingAssociationWithFacebookChannel;
        }
        else {
            webTrackingChannel = webTrackingLoginWithFacebookChannel;
        }
    }
    else if (isLoginCredentialsExist == true && fblogon == "no") {
        webTrackingChannel = webTrackingFacebookApplicationPermissionDenied;
    }

    // call Send tracking function that exists in include/ww_tabs.js
    if (webTrackingChannel != null)
        SendTracking(null, webTrackingChannel);
    //end omniture tracking.
}

function DoValidation(doValidation) {
    var validationResult = true;
    if (doValidation && doValidation == 'true') {
        validationResult = IsLoginCredentialsExist();
        if (!validationResult) {
            var missingFBUserNamePwdErr = document.getElementById(lblMissingUserNamePwdId);
            var errorMessages = document.getElementById("divErrorMessage");
            if (missingFBUserNamePwdErr) missingFBUserNamePwdErr.style.display = "inline";
            if (errorMessages) errorMessages.style.display = "none";
        }
    }
    return validationResult;
}

function ResetControls() {
    var missingFBUserNamePwdErr = document.getElementById(lblMissingUserNamePwdId);
    var errorMessages = document.getElementById("divErrorMessage");
    if (missingFBUserNamePwdErr) missingFBUserNamePwdErr.style.display = "none";
    if (errorMessages) errorMessages.style.display = "none";
}

function IsLoginCredentialsExist() {
    var validationResult = false;
    var userNameObj = document.getElementById(userNameControlId);
    var pWdObj = document.getElementById(pWdControlId);
    if (userNameObj && pWdObj && userNameObj.value.length > 0 && pWdObj.value.length > 0)
        validationResult = true;
    return validationResult;
}

function ShowHideFBControls() {
    var divFacebookLoginElement = document.getElementById('divFacebookLogin');
    ShowHideElement(divFacebookLoginElement);
}

function ShowHideTopNavFBControls() {
    var fbTopNavLoginButtonElement = document.getElementById('fbTopNavLoginButton');
    ShowHideElement(fbTopNavLoginButtonElement);
}

function ShowHideElement(element) {
    if (typeof (element) != 'undefined' && element != null)
        element.style.display = "inline";
}

function TopNavFLoginClick() {
    if (get_cookie(fb_info_cookie_name, fb_info_mn_cookie_name) != null) {
        FB.login(function (response) {
            if (response.authResponse) {
                SendTracking(null, webTrackingLoginWithFacebookChannel);
                TopNavFbLogin();
            }
        });
    }
    else {
        fLogin(false);
    }
}

function get_cookie(parent_cookie_name, child_cookie_name) {
    var result = null;
    var parentCookie = document.cookie.match('(^|;) ?' + parent_cookie_name + '=([^;]*)(;|$)');
    if (parentCookie) {
        result = unescape(parentCookie[2]);
        if (null != child_cookie_name) {
            result = null;
            var childCookie = parentCookie[2].match('(^|&) ?' + child_cookie_name + '=([^&]*)(&|$)');
            if (childCookie)
                result = unescape(childCookie[2]);
        }
    }
    return result;
}