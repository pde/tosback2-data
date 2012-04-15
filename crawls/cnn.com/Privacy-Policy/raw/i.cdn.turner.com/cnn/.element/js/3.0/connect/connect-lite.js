//connect-lite

var is_loadedOvly = 0;

//begin queueManager.js
function ms_QueueManager() {

    // INTERNAL VARS
    var queue = [];
    var queueCurrentItem = null;
    var iframeDivId = '';
    var iframeId = '';
    var iframeBlankUrl = '';
    var isIframeReady = false;
    var isQueueRunning =  false;
    var requestMade = false;
    var waitingForResponse = false;
    
    // TIMERS
    var blankIframeTimer = null;
    var requestTimer = null;
    
    // COUNTERS
    var queuePosition = -1;
    var iframeTimeoutCounter = 0;
    var requestTimeoutCounter = 0;
    
    // CONSTANTS
    var TIMEOUT = 50; // in miliseconds
    var REQUEST_TIMEOUT = 10; // in seconds
    
    this.init = function(divId, blankUrl) {
		document.write('<div id="'+divId+'" style="position:absolute; bottom:0; left: -700px;"></div>');
        iframeDivId = divId;
        iframeId = divId+'_iframe';
        iframeBlankUrl = blankUrl;
        REQUEST_TIMEOUT = REQUEST_TIMEOUT * 1000; // set time to be in seconds
    }

    this.addRequest = function(queueItem) {
        queue[queue.length] = queueItem;
        if(isQueueRunning == false) {
            isQueueRunning = true;
            processQueue();
        }
    }
    
    this.requestReceived = function() {
        waitingForResponse = false;
        clearWaitForRequest();
        destroyIframe();
        processQueue();
    }
    
    var processQueue = function() {
        queuePosition++;
        if (queuePosition >= queue.length) {
            resetQueue(); // we have reached the end of the queue
        } else { // this is a new request to be made
            queueCurrentItem = queue[queuePosition];
            createIframe();
        }
    }
    
    var createIframe = function() {
		isIframeReady = false;
		//$(iframeDivId).innerHTML = '<iframe name="'+iframeId+'" id="'+iframeId+'" style="width: 100px; height: 100px; border: solid 1px blue;"></iframe>';
		//$(iframeId).src = iframeBlankUrl;
	  var thebody = document.getElementsByTagName("body")[0];
      var tempIFrame=document.createElement('iframe');
      tempIFrame.setAttribute('id',iframeId);
      tempIFrame.setAttribute('name',iframeId);
      tempIFrame.style.position='absolute';
      tempIFrame.style.bottom='0';
      tempIFrame.style.left='-600px';
	  //tempIFrame.src=iframeBlankUrl;
      thebody.appendChild(tempIFrame);
	  if (location.pathname.indexOf('profile') > -1) {
	  	frames[iframeId].location.replace(iframeBlankUrl);
	  }
	  //return false;
	  waitForRequest('iframe');
   }
    
    var destroyIframe = function() {
        if (location.pathname.indexOf('profile') > -1) {
			$(iframeDivId).innerHTML = '';
		}
		x = window.frames[iframeId];
		//x.document.body.innerHTML = ""; 
    }
    
    var resetQueue = function() {
        isQueueRunning = false;
        destroyIframe();
        queue = [];
        queuePosition = -1;
        queueItem = null;
    }
    
    var doGet = function() {
        waitingForResponse = true;
        var url = makeQueryString(queueCurrentItem);
        frames[iframeId].location.replace(url);
        waitForRequest('get');
    }
    
    var doPost = function() {
        var html = drawForm(queueCurrentItem, 'msHiddenIframeForm');
        var iframeWin = getIframeWindow();
        waitingForResponse = true;
        iframeWin.document.body.innerHTML = html;
        iframeWin.document.getElementById('msHiddenIframeForm').submit();
        waitForRequest('post');
    }
    
    var waitForRequest = function(type) {
        switch(type) {
            case "post":
                if(waitingForResponse == false) {
                    clearWaitForRequest();
                    processQueue();
                    return;
                }
                break;
            case "get":
                if(waitingForResponse == false) {
                    clearWaitForRequest();
                    processQueue();
                    return;
                }
                break;
            case "blankForPost":
                if(isIframeReady == true) {
                    clearWaitForRequest();
                    doPost();
                    return;
                }
                break;
            case "iframe":
                if(isIframeReady == true) {
                    clearWaitForRequest();
                    if(queueCurrentItem.method == 'post') {
                        doPost();
                    } else {
                        doGet();
                    }
                    return;
                }
                break;
        }
        if((requestTimeoutCounter * TIMEOUT) >= REQUEST_TIMEOUT) {
            clearWaitForRequest();
            requestFailed(type);
            return;
        } else {
            requestTimeoutCounter++;
            requestTimer = setTimeout(function timeoutWaitForRequest() { waitForRequest(type) }, TIMEOUT);
        }
    }
    
    var clearWaitForRequest = function() {
        clearTimeout(requestTimer);
        requestTimeoutCounter = 0;
    }
    
    var requestFailed = function(type) {
        destroyIframe();
        var response = {};
        response['errors'] = ['request timed out'];
        eval(queueCurrentItem.params.callback + '(response);');
        processQueue();
    }
    
    var makeQueryString = function(queueItem) {
        var queryString = '';
        queryString += queueItem.url;
        if(queueItem.params.len > 0) {
            queryString += '?';
            var i = 0;
            for(key in queueItem.params) {
                if(key != 'len') {
                    queryString += key + '=' + escapeParam(queueItem.params[key]);
                    if(i < (queueItem.params.len - 1)) queryString += '&';
                }
                i++;
            }
        }
        return queryString;
    }
    
    var escapeParam = function(param) {
        return escape(param).replace(/\+/g, '%2b');
    }
    
    var drawForm = function(queueItem, formId) {
        var html = '';
        for(key in queueItem.params) {
            html += '<input type="hidden" name="'+key+'" value="'+queueItem.params[key]+'"/>';
        }
        html = '<form id="'+formId+'" method="'+queueItem.method+'" action="'+queueItem.url+'">' + html + '</form>';
        return html;
    }

    var getIframeWindow = function() {
        var r = $(iframeId).contentWindow || $(iframeId).contentDocument;
        return r;
    }
    
    this.setIframeReady = function() {
		isIframeReady = true;
    }
}

function ms_QueueItem(inUrl, inMethod) {
    
    var url = inUrl;
    var method = inMethod;
    var params = {};
    
    this.addParam = function(key, value) {
        params[key] = value;
    }
    
    this.getQueueItem = function() {
        var i=0;
        for(key in params) {
            i++;
        }
        params['len'] = i;
        return {
            "url": url,
            "method": method,
            "params": params
        };
    }
}
//end queueManager.js

//begin queueConfig.js
/* FIREBUG */ 
/*
if (!window.console || !console.firebug) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
} 
*/

/* URLs 
var ms_documentDomain = 'cnn.com';
var ms_baseStandard = 'http://audience.cnn.com/services/cnn/';
var ms_baseSecure = 'https://audience.cnn.com/services/cnn/';
var ms_echoURL = 'http://audience.cnn.com/services/cnn/echo.api';
var ms_blankURL = 'http://audience.cnn.com/services/cnn/blank.api?callback=msQueueManager.setIframeReady';
*/


var ms_documentDomain = 'cnn.com';
var ms_baseStandard = 'http://audience.cnn.com/services/cnn/';
var ms_baseSecure = 'https://audience.cnn.com/services/cnn/';
var ms_echoURL = 'http://audience.cnn.com/services/cnn/echo.api';
var ms_blankURL = 'http://audience.cnn.com/services/cnn/blank.api?callback=msQueueManager.setIframeReady';


/* GLOBAL VARS */
var msIframeDiv = 'cnnConnectMsIframe';
var msQueueManager = null;

/* STORAGE */
var msStorage = {};

/* START APP */
document.domain = ms_documentDomain; // document domain always needs to be set to root
msQueueManager = new ms_QueueManager(); // create global queue manager instance

/* GLOBAL METHODS */
function ms_isLoggedIn() {
    var authid = allCookies[ 'authid' ] || null;
	if(authid==null) return false;
    else return true;
}

function ms_isNull(thisObj) {
   return (thisObj != 'undefined' && thisObj != null) ? false : true;
}

function ms_getEmails(view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
    queueItem.addParam('action', 'getEmails');
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}

function ms_uiGetEmails(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) {
        // update ui for successful
        msStorage.emails = jsonResponse.emails;
		var confirm = true;
		//$('cnnConnectBreakNewsEmails').style.display = 'block';
        for(var i=0; i<jsonResponse.emails.length; i++) {
            if(jsonResponse.emails[i].isPrimary == 'true' && jsonResponse.emails[i].status != 'confirmed') { confirm = false; }
        }
        if(confirm == false) {
			var el1 = $('cnnConnectWelcomeNotConfirmed');
			var el2 = $('cnnConnectBreakNewsEmails');
			if(el1 && el2){
			$('cnnConnectWelcomeNotConfirmed').style.display = 'block';
			$('cnnConnectBreakNewsEmails').style.display = 'none';
			}
        }
    } else {
        // update ui for errors
    }
}

window.msReload = function() {
    if(window.location.href.indexOf('?') > -1) {
        window.location.href = window.location.href.substr(0, window.location.href.indexOf('?'));
    } else {
        window.location.href = window.location.href;
    }
}

function utilSelectOption(selectBox, value) {
    for(var i=0; i<selectBox.options.length; i++) {
        if(selectBox.options[i].value == value) {
            selectBox.selectedIndex = i;
            return;
        }
    }
}

function utilGetSelectValue(selectBox) {
    return selectBox.options[selectBox.selectedIndex].value;
}

/* VALIDATION */
function validateEmail(elementValue) {
    var emailPattern = /^([a-zA-Z0-9_\.\'\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailPattern.test(elementValue); 
}

/* INIT */

function ms_init() {
   	ms_getEmails('ms_uiGetEmails');
    //ms_initAlert();
    //ms_initOverlay();
    //ms_initNewsletter();
	//checkUrlForParams();
    //ms_initProfile();
}
function ms_initProfile() {
    if(ms_isLoggedIn() == true) {
        //if(typeof(msStorage.confirmProfileEmail) == 'undefined') { msStorage.confirmProfileEmail = []; }
        //ms_getEmails('ms_uiGetEmailsProfile');
        //ms_getProfile('ms_uiGetProfile');
		/*var cstate = gup('profile');
		(cstate === 'subscribe') ? '' : */
		//
		//newuser = false;
		//createLoginIframe();
    } else {
    }
}

//TODO: move this to the new domready load
Event.observe(window, "load", function() { ms_init(); });
//end queueConfig.js

//begin user.js
/* LOAD */
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

function ms_initOverlay() {
    checkUrlForParams();
    generateCaptchaImage();
    if(ms_isLoggedIn() == true) {
        //$('cnnWelcomeLoggedIn').style.display = 'block';
        //$('cnnWelcomeLoggedOut').style.display = 'none';
    } else {
        //$('cnnWelcomeLoggedIn').style.display = 'none';
        //$('cnnWelcomeLoggedOut').style.display = 'block';
    }
}

/* FORM */

function cnn_formConnectLogin(formId) {
    var email = $(formId).email.value;
    var password = $(formId).password.value;
	var rememberMe = $(formId).rememberme.checked;
	
    // client-side validation
    var pass = true;
    var errorText = 'Registration isn\'t complete without your ';
    var validationErrors = [];
    if(validateEmail(email) == false) {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
		//$(formId).email.value = 'E-mail';
		$('psigninp2_email').addClassName('redtexterror');
		$(formId).email.className = 'redinput_error';
    }
    if(password == '') {
        pass = false;
		$('psigninp2_password').addClassName('redtexterror');
        validationErrors[validationErrors.length] = 'password';
		//$(formId).password.value = 'Password';
		$(formId).password.className = 'redinput_error';
    }
    if(pass) {
        ms_doLogin(email, password, rememberMe, 'ms_uiDoLogin');
    } else {
        cnnConnectOverlayLoginValidationError('clear');
		if(validationErrors.length == 2) {
            cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' and ' + validationErrors[1] + ' to log in.');
        } else {
			if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
				cnnConnectOverlayLoginValidationError('add', 'You entered an invalid e-mail address.');
			} else if (validationErrors[0] == 'e-mail address' && email == '') {
				cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			} else {
            cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			}
        }
        cnnConnectOverlayLoginValidationError('show');
    }
}
var cnn_screenname = '';
function ms_formEnterScreenname(formId){
	cnn_screenname = $('cnnscreenname').value;
    var screenNamePattern = /^\w+$/;
	var pass = true;
	$('cnnConnectScreennameErrors').innerHTML = '';
	if(cnn_screenname == '') {
        pass = false;
        $('cnnConnectScreennameErrors').innerHTML = 'You need to enter a screen name.';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
		return;
    } else if (cnn_screenname.length < 3) {
        pass = false;
		$('cnnConnectScreennameErrors').innerHTML = 'The screen name that you entered is too short.';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
		return;
    } else if (cnn_screenname.length > 12) {
        pass = false;
		$('cnnConnectScreennameErrors').innerHTML = 'Your screen name must be 3-12 characters; numbers and letters only.';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
		return;
    } else if (screenNamePattern.test(cnn_screenname) == false) {
        pass = false;
		$('cnnConnectScreennameErrors').innerHTML = 'Your screen name includes invalid characters';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
		return;
    } else {
		$('cnnscreenname').removeClassName('redinput_error');
		$('cnnConnectScreennameErrors').removeClassName('redtexterror');
		$('screenname_label').removeClassName('redtexterror');
	}
	if(pass == true){
		//alert('PASS');
		//workaround
		ms_getProfile('ms_addScreenName');
	} else {
		//alert('FAIL');
	}
}
function ms_addScreenName(jsonResponse){
	msQueueManager.requestReceived(); //lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
	var warnings = (typeof jsonResponse.warnings == 'undefined') ? false : true;
	if(error == false && warnings == false) {
		var paramsObj = jsonResponse.profile;
		paramsObj['screenName'] = cnn_screenname;
		var monthConvert = paramsObj['monthOfBirth'];
		var monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		paramsObj['monthOfBirth'] = monthStrings.indexOf(monthConvert) + 1;
		ms_updateProfile(paramsObj, 'ms_uiAddScreenName');
    } else {
		//alert('there was an error in logout');
        // update ui for errors
		$('cnnConnectScreennameErrors').innerHTML = 'There was an error registering your screen name.  Please try again.';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
    }
}
function ms_uiAddScreenName(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
	var warnings = (typeof jsonResponse.warnings == 'undefined') ? false : true;
	if(error == false && warnings == false) {
        // update ui for successful
		// screenName has been updated but now we need to verify
		//window.msReload();
		ms_doGetUser('ms_uiDoGetUser');
    } else {
		//alert('there was an error in logout');
        // update ui for errors
		$('cnnConnectScreennameErrors').innerHTML = 'There was an error registering your screen name.  Please try again.';
		$('cnnscreenname').addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
    }
}
function ms_getProfile(view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
    queueItem.addParam('action', 'getProfile');
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}
function ms_updateProfile(paramsObj, view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'post');
    queueItem.addParam('action', 'updateProfile');
    for(key in paramsObj) {
        queueItem.addParam(key, paramsObj[key]);
    }
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}
function ms_doGetUser(view){
    var queueItem = new ms_QueueItem(ms_baseStandard+'user.api', 'get');
    queueItem.addParam('action', 'getUser');
    queueItem.addParam('echourl', ms_echoURL);
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}
function ms_uiDoGetUser(jsonResponse){
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.warnings == 'undefined') ? false : true;
	var displayname = (typeof jsonResponse.user.screenName == null) ? false : true;
    if(error == false && displayname == true) {
        // update ui for successful
		CNN_setCookie('displayname', jsonResponse.user.screenName, 854400, '/', document.domain);
		closeOverlay('profile_enter_screenname');
		window.msReload();
    } else {
		$('cnnConnectScreennameErrors').innerHTML = 'There was an error registering your screen name.  Please try again.';
		$('cnnConnectFormScreenname').screenname.addClassName('redinput_error');
		$('cnnConnectScreennameErrors').addClassName('redtexterror');
		$('screenname_label').addClassName('redtexterror');
    }
}

function clearInputErrors() {
	$('cnnOverlayEmail1l').removeClassName('redinput_error');
	$('cnnOverlayEmail1l').value = '';
	$('cnnOverlayPwd').removeClassName('redinput_error');
	$('cnnOverlayPwd').value = '';
	$('psigninp2_email').removeClassName('redtexterror');
	$('psigninp2_password').removeClassName('redtexterror');
	$('cnnConnectLoginErrors').update('');
	$('cnnConnectLoginErrors').hide();
 }

var newuser = false;
function ms_formRegister(formId) {
	newuser = true;
    var email = $(formId).email.value.trim();
    var password = $(formId).password.value;
    var screenname = $(formId).screenName.value.trim();
	var facebookID = $(formId).facebookID.value;
    //show the screenname with spaces removed.
    $(formId).screenName.value = screenname;

    var captcha = $(formId).captcha.value;
	//if form is submitted the user agrees to the privacy policy
    var privacy = 'domestic_version';
    var newsletters = '';
    if($(formId).specialOffers.checked == true) {
        newsletters = 'member_services';
    }
  
    // client-side validation
    var pass = true;
    var errorText = 'A required field is missing! Registration isn\'t complete without your ';
    var validationErrors = [];
    if(email == '' || validateEmail(email) == false) {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
        cnnConnectOverlayRegisterError('email');
    } else {
		$('cnnConnectFormRegister').email.className = 'cnnConnectFormbg1 cnn_connectoverlay_email2';
		$('signup_email').previous('p').removeClassName('redtexterror');
	}
    if(password == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'password';
        cnnConnectOverlayRegisterError('password');
    } else if (password.length < 6 || password.indexOf(' ') != -1 || password.length > 10) {
        pass = false;
        cnnConnectOverlayRegisterError('password');
        cnnConnectOverlayError('errorText', 'You entered an invalid password.');
        return;
    } else {
		$('cnnConnectFormRegister').password.className = 'cnnConnectFormbg2 cnn_connectoverlay_password2';
		$('signup_password').previous('p').removeClassName('redtexterror');
	}
    var screenNamePattern = /^\w+$/;
    if(screenname == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'screen name';
        cnnConnectOverlayRegisterError('screenName');
    } else if (screenname.length < 3) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'The screen name that you entered is too short.');
		//$('cnnConnectFormRegister').screenName.className = 'cnnConnectFormbgnone cnn_connectoverlay_screenname cnnredtxt redtexterror';
        return;
    } else if (screenname.length > 12) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name must be 3-12 characters; numbers and letters only.');
        return;
    } else if (screenNamePattern.test(screenname) == false) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name includes invalid characters.');
        return;
    } else {
	    $('cnnConnectFormRegister').screenName.className = 'cnnConnectFormbg3 cnn_connectoverlay_screenname';
		$('signup_screenname').previous('p').removeClassName('redtexterror');
	}
    if(captcha == '') {
        pass = false;
        generateCaptchaImage();
		validationErrors[validationErrors.length] = 'security word';
        cnnConnectOverlayRegisterError('captcha');
		cnnConnectOverlayError('errorText', 'You must enter a security word.');
    } else {
	    $('cnnConnectFormRegister').captcha.className = 'cnnConnectFormbg4 cnn_connectoverlay_enterit';
		$('signup_kaptcha_p1').removeClassName('redtexterror');
	}
    /*if(privacy == 'no') {
        pass = false;
        validationErrors[validationErrors.length] = 'Privacy Policy';
    }*/
    if(pass == true) {
	   ms_doRegister(email, password, screenname, captcha, privacy, newsletters, facebookID, 'ms_uiDoRegister');
    } else {
        switch (validationErrors.length) {
            case 1:
				if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
					errorText = 'You entered an invalid e-mail address.';
				} else if (validationErrors[0] == 'e-mail address' && email == '') {
				    errorText += validationErrors[0];
				} else {
					errorText += validationErrors[0];
				}
                break;
            case 2:
                errorText += validationErrors[0] + ' and ' + validationErrors[1];
				break;
            default:
                for(var i=0; i<validationErrors.length; i++) {
                    errorText += (i == (validationErrors.length -1)) ? 'and ' + validationErrors[i] + '.' : validationErrors[i] + ', ';
                };
				break;
        }
        cnnConnectOverlayError('errorText', errorText);
    }
}

function ms_formResetUserPassword(formId) {
    var email = $(formId).email.value;
    if(validateEmail(email) == false) {
        //Check and resubmit your e-mail address, it does not match our records.
        cnnConnectOverlayForgotValidationError('clear');
        cnnConnectOverlayForgotValidationError('add', 'You must enter your e-mail address to reset your password.');
        cnnConnectOverlayForgotValidationError('show');
    } else {
        ms_resetUserPassword(email, 'ms_uiResetUserPassword');
    }
}

function ms_formSetUserPassword(formId) {
    var email = $(formId).email.value;
    var resetCode = $(formId).resetCode.value;
    var newPassword = $(formId).newPassword.value;
    //var confirmNewPassword = $(formId).confirmNewPassword.value;
    //a temporary fix to the redesign of reset without a confirmation box
	var confirmNewPassword = newPassword;
	
    // client-side validation
    var pass = true;
    var errorText = 'Reset Password isn\'t complete without your ';
    var validationErrors = [];
    if(validateEmail(email) == false || email == 'Email Address') {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
        cnnConnectOverlayResetError('email');
    } else {
		$('new_password_email').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').email.className = 'cnn_connectoverlay_email3 cnnredtxt';
	}
    if(resetCode == '' || resetCode == 'Reset Code') {
        pass = false;
        validationErrors[validationErrors.length] = 'reset code';
        cnnConnectOverlayResetError('resetCode');
    } else {
		$('reset_code').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').resetCode.className = 'cnn_connectoverlay_password3 cnnredtxt';
	}
    if(newPassword == '' || newPassword == 'New Password') {
        pass = false;
        validationErrors[validationErrors.length] = 'new password';
        cnnConnectOverlayResetError('newPassword');
    } else {
		$('new_password').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').newPassword.className = 'cnn_connectoverlay_password4 cnnredtxt';
	}
    /*if(confirmNewPassword == '' || confirmNewPassword == 'Confirm New Password') {
        pass = false;
        validationErrors[validationErrors.length] = 'password confirmation';
        cnnConnectOverlayResetError('confirmNewPassword');
    }*/
    if(pass == true) {
        ms_setUserPassword(resetCode, email, newPassword, confirmNewPassword, 'ms_uiSetUserPassword');
    } else {
        cnnConnectOverlayResetValidationError('clear');
        switch (validationErrors.length) {
            case 1:
                errorText += validationErrors[0] + '.';
                break;
            case 2:
                errorText += validationErrors[0] + ' and ' + validationErrors[1] + '.';
                break;
            default:
                for(var i=0; i<validationErrors.length; i++) {
                    errorText += (i == (validationErrors.length -1)) ? 'and ' + validationErrors[i] + '.' : validationErrors[i] + ', ';
                }
                break;
        }
        cnnConnectOverlayResetValidationError('add', errorText);
        cnnConnectOverlayResetValidationError('show');
    }
}

/* API */

function ms_doLogout() {
    CNN_removeCookie('the_forum', '/', 'cnn.com');
    CNN_removeCookie('authid', '/', 'cnn.com');
    CNN_removeCookie('authpass', '/', 'cnn.com');
    CNN_removeCookie('displayname', '/', 'cnn.com');
    CNN_removeCookie('firstName', '/', 'cnn.com');
	//alert('reload from doLogout');
    var queueItem = new ms_QueueItem(ms_baseStandard+'logout.api', 'post');
    queueItem.addParam('callback', 'ms_uiDoLogout');
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
	//frames['bialogin_iframe'].location.replace('http://www.disqus.com/saml/cnn/logout');
	//this needs to change
	document.location = 'http://www.disqus.com/saml/cnn/logout/?target=' + document.location;
}

function ms_doLogin(email, password, rememberMe, view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'login.api', 'post');
    queueItem.addParam('email', email);
    queueItem.addParam('password', password);
	queueItem.addParam('keepMeLoggedIn', rememberMe);
    queueItem.addParam('echourl', ms_echoURL);
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}

function createLoginIframe() {
	var divId = 'disqus_login';
	iframeDivId = divId;
	iframeId = divId+'_iframe';
	//iframeBlankUrl = ms_baseStandard + 'gsso?assertionConsumerUrl=http://www.disqus.com/saml/cnn/postback/&target=' + document.location;
	//this is a  hardcoded disqus call to audience
	var disqusCallBackPath = location.href;
	disqusCallBackPath = disqusCallBackPath.split('/');
	disqusCallBackPath = 'http://' + disqusCallBackPath[2] + '/.element/ssi/www/misc/3.0/connect/connect-disqus-target.html';
	iframeBlankUrl = ms_baseStandard + 'gsso?assertionConsumerUrl=http://www.disqus.com/saml/cnn/postback/&target=' + disqusCallBackPath;
	var thebody = document.getElementsByTagName("body")[0];
	var tempIFrame=document.createElement('iframe');
	tempIFrame.setAttribute('id',iframeId);
	tempIFrame.setAttribute('name',iframeId);
	tempIFrame.style.position='absolute';
	tempIFrame.style.bottom='0';
	tempIFrame.style.left='-600px';
	thebody.appendChild(tempIFrame);
	frames[iframeId].location.replace(iframeBlankUrl);
}

function createLogoutIframe() {
	//alert('inside logout');
	var divId = 'disqus_logout';
	iframeDivId = divId;
	iframeId = divId + '_iframe';
	//iframeBlankUrl = ms_baseStandard + 'gsso?assertionConsumerUrl=http://www.disqus.com/saml/cnn/postback/&target=' + document.location;
	//this is a  hardcoded disqus call to audience
	var disqusCallBackPath = location.href;
	disqusCallBackPath = disqusCallBackPath.split('/');
	disqusCallBackPath = 'http://' + disqusCallBackPath[2] + '/.element/ssi/www/misc/3.0/connect/connect-disqus-target.html';
	//iframeBlankUrl = ms_baseStandard + '/gsso?assertionConsumerUrl=http://www.disqus.com/saml/cnn/logout/?target=' + disqusCallBackPath;
	iframeBlankUrl = 'http://www.disqus.com/saml/cnn/logout/?target=' + disqusCallBackPath;
	var thebody = document.getElementsByTagName("body")[0];
	var tempIFrame=document.createElement('iframe');
	tempIFrame.setAttribute('id',iframeId);
	tempIFrame.setAttribute('name',iframeId);
	tempIFrame.style.position='absolute';
	tempIFrame.style.bottom='0';
	tempIFrame.style.left='-600px';
	thebody.appendChild(tempIFrame);
	//alert('inside logout 2');
	frames[iframeId].location.replace(iframeBlankUrl);
}

function ms_doRegister(email, password, screenname, captcha, privacy, newsletters, facebookID, view) {    
    var queueItem = new ms_QueueItem(ms_baseStandard+'register.api', 'post');
    queueItem.addParam('email', email);
    queueItem.addParam('password', password);
    queueItem.addParam('displayname', screenname);
    queueItem.addParam('kaptcha', captcha);
    queueItem.addParam('privacy', privacy);
    queueItem.addParam('newsletters', newsletters);
    queueItem.addParam('echourl', ms_echoURL);
	queueItem.addParam('facebookUserID', facebookID);
    queueItem.addParam('callback', view);
	if(location.hostname.indexOf('edition') != -1){
	queueItem.addParam('pid', 'intl.default');
	};
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);    
}

function ms_resetUserPassword(email, view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'passwordRecovery.api', 'post');
    queueItem.addParam('action', 'sendResetPasswordCode');
    queueItem.addParam('email', email);
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}

function ms_setUserPassword(resetCode, email, password, confirmPassword, view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'passwordRecovery.api', 'post');
    queueItem.addParam('action', 'changePassword');
    queueItem.addParam('email', email);
    queueItem.addParam('resetCode', resetCode);
    queueItem.addParam('password', password);
    queueItem.addParam('confirmPassword', confirmPassword);
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}

function ms_sendConfirmEmailAgain(email, view) {
    var queueItem = new ms_QueueItem(ms_baseStandard+'emailConfirm.api', 'post');
    queueItem.addParam('action', 'resendEmailConfirmation');
    queueItem.addParam('email', email);
    queueItem.addParam('callback', view);
    var queueItemObj = queueItem.getQueueItem();
    msQueueManager.addRequest(queueItemObj);
}

/* RESPONSE */

function ms_uiDoLogout(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) {
        // update ui for successful
		CNN_updateHeaderOptions();
		//createLogoutIframe();
        window.msReload();
    } else {
		//alert('there was an error in logout');
        // update ui for errors
		//alert('reload from uiDoLogoutElse');
        window.msReload();
    }
}


function ms_uiDoLogin(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) {
        // update ui for successful
        $('profile_overlaybg').hide();
		$('profile_signin_overlay').hide();
		//set to true to show called from login
		var calledFromLogin = true;
		CNN_updateHeaderOptions();
		//CNN_updateHeaderOptions();
        createLoginIframe();
    } else {
        // update ui for errors
        cnnConnectOverlayLoginValidationError('clear');
        cnnConnectOverlayLoginValidationError('add', 'Your email address or password doesn\'t match our records. Please try again.');
        cnnConnectOverlayLoginValidationError('show');
    }
}

function ms_uiDoRegister(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) {
        // update ui for successful
		closeOverlay('profile_signup_overlay');
		//show registration confirmation
		showOverlay('profile_followtopic11_overlay');
    } else {
        cnnConnectOverlayError('clearErrorText');
		generateCaptchaImage();
        for(var i=0; i<jsonResponse.errors.length; i++) {
            switch (jsonResponse.errors[i]) {
                case 'email address not available':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'That e-mail address is already taken.<br/>');
                    break;
                case 'missing email address':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your e-mail address.<br/>');
                    break;
                case 'bad email address':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'You entered an invalid e-mail address.<br/>');
                    break;
                case 'missing password':
                    cnnConnectOverlayRegisterError('password');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your password.<br/>');
                    break;
                case 'bad password':
                    cnnConnectOverlayRegisterError('password');
                    cnnConnectOverlayError('addErrorText', 'You entered an invalid password.<br/>');
                    break;
                case 'missing screen name':
                    cnnConnectOverlayRegisterError('screenName');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your screen name.<br/>');
                    break;
                case 'screen name not available':
                    cnnConnectOverlayRegisterError('screenName');
                    cnnConnectOverlayError('addErrorText', 'That screen name is already taken. Please choose another.<br/>');
                    break;
                case 'missing captcha':
                    cnnConnectOverlayRegisterError('captcha');
                    cnnConnectOverlayError('addErrorText', 'You forgot to type in the security word in the grey box.<br/>');
                    break;
                case 'bad captcha':
                    cnnConnectOverlayRegisterError('captcha');
                    cnnConnectOverlayError('addErrorText', 'You entered the security word in the grey box incorrectly.<br/>');
                    break;
                case 'missing privacy policy':
                    cnnConnectOverlayError('addErrorText', 'You must agree to the privacy policy.<br/>');
                    break;
                default:
                    break;
            }
        }
        cnnConnectOverlayError('showErrorText');
    }
}

function ms_uiResetUserPassword(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var forgotFormId = 'cnnConnectFormForgot';
    var resetFormId = 'cnnConnectFormReset';
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    var html = '';
    if(error == false) {
        // update ui for successful
        cnnConnectOverlayUpdate('forgot2reset');
    } else {
        cnnConnectOverlayForgotValidationError('clear');
        cnnConnectOverlayForgotValidationError('add', 'Your e-mail address doesn\'t match our records. Please try again.');
        cnnConnectOverlayForgotValidationError('show');
    }
}

function ms_uiSetUserPassword(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) { 
        // update ui for successful
        //cnnConnectOverlayUpdate('reset2login');
        cnnConnectOverlayUpdate('reset2loginsuccess');
    } else {
        cnnConnectOverlayResetValidationError('clear');
        for(var i=0; i<jsonResponse.errors.length; i++) {
            switch (jsonResponse.errors[i]) {
                case 'missing email address':
                    cnnConnectOverlayResetError('email');
                    cnnConnectOverlayResetValidationError('add', 'You forgot to enter your e-mail address.<br/>');
                    break;
                case 'profile not found':
                    cnnConnectOverlayResetError('email');
                    cnnConnectOverlayResetValidationError('add', 'Your e-mail address or reset code doesn\'t match our records. Please try again.<br/>');
                    break;
                case 'missing new password':
                    cnnConnectOverlayResetError('newPassword');
                    cnnConnectOverlayResetValidationError('add', 'You forgot to enter your new password.<br/>');
                    break;
                case 'missing confirm new password':
                    cnnConnectOverlayResetError('confirmNewPassword');
                    cnnConnectOverlayResetValidationError('add', 'You forgot to confirm your new password.<br/>');
                    break;
                case 'confirm password did not match':
                    cnnConnectOverlayResetError('newPassword');
                    cnnConnectOverlayResetError('confirmNewPassword');
                    cnnConnectOverlayResetValidationError('add', 'Your passwords do not match.<br/>');
                    break;
                case 'reset code has expired':
                    cnnConnectOverlayResetError('resetCode');
                    cnnConnectOverlayResetValidationError('add', 'Your reset code has expired. <a href="javascript: void(0);" onclick="closeOverlay(\'profile_forgotpass2_overlay\');showOverlay(\'profile_forgotpass_overlay\');">Send another e-mail</a> with an updated link and reset code to reset your password.<br/>');
                    break;
                default:
					cnnConnectOverlayResetError('default');
					cnnConnectOverlayResetValidationError('add', 'We\'re sorry! This service is temporarily unavailable. Please try again soon.');
                    break;
            }
        }
        cnnConnectOverlayResetValidationError('show');
    }
}

function ms_uiSendConfirmEmailAgain(jsonResponse) {
    msQueueManager.requestReceived(); // lets iJax know it can process the next request
    var error = (typeof jsonResponse.errors == 'undefined') ? false : true;
    if(error == false) {
        // update ui for successful
    } else {
    }
}

/* GUI */

function cnnConnectOverlayUpdate(option) {
    /*  use this function when you need multiple view changes to occur
        otherwise just call the single functions directly */
        
    switch (option) {
        case "login2forgot":
            cnnConnectOverlayResetGetEmailFromLogin();
            cnnConnectOverlayHideLogin();
            cnnConnectOverlayShowForgot();
            cnnConnectOverlayClearLogin();
            break;
        case "forgot2reset":
            cnnConnectOverlayHideForgot();
            cnnConnectOverlayGetEmailFromForgot();
            cnnConnectOverlayClearForgot();
            cnnConnectOverlayShowReset();
            break;
        case "all2login":
            cnnConnectOverlayHideForgot();
            cnnConnectOverlayHideReset();
            cnnConnectOverlayClearRegister();
            cnnConnectOverlayShowLogin();
            break;
        case "forgot2login":
            cnnConnectOverlayHideForgot();
            cnnConnectOverlayShowLogin();
            cnnConnectOverlayClearForgot();
            break;
        case "reset2login":
            cnnConnectOverlayHideReset();
            cnnConnectOverlayLoginShowText1();
            cnnConnectOverlayShowLogin();
            cnnConnectOverlayClearReset();
            break;
        case "2resetWithCode":
            cnnConnectOverlayShowResetWithPasscode('test1@test.com', 'asdf');
            cnnConnectOverlayHideLogin();
            cnnConnectOverlayShowReset();
            break;
        case "forgot2resetWithoutCode":
            cnnConnectOverlayShowMsg2();
            cnnConnectOverlayHideForgot();
            cnnConnectOverlayShowReset();
            break;
        case "reset2loginsuccess":
            cnnConnectOverlayHideReset();
            cnnConnectOverlayLoginShowText2();
            cnnConnectOverlayShowLogin();
            cnnConnectOverlayClearReset();
            break;
    }
}

function cnnConnectOverlayShowOverlay() {
    $('cnnConnectOverlayBox').show();
}

function cnnConnectOverlayHideOverlay() {
	cnnConnectOverlayUpdate("all2login");
    $('cnnConnectOverlayBox').hide();
}

function cnnConnectOverlayShowLogin() {
    //$('cnnConnectLoginContainer').show();
	showOverlay('profile_signin_overlay');
}

function cnnConnectOverlayHideLogin() {
    //$('cnnConnectLoginContainer').hide();
	closeOverlay('profile_signin_overlay');
}

function cnnConnectOverlayClearLogin() {
    cnnConnectOverlayLoginShowText1();
    $('cnnConnectLoginErrors').hide();
    $('cnnConnectFormLogin').email.value = '';
    $('cnnConnectFormLogin').password.value = '';
    $('cnnConnectFormLogin').email.className = 'cnnConnectFormbg5 cnn_connectoverlay_email';
    $('cnnConnectFormLogin').password.className = 'cnnConnectFormbg6 cnn_connectoverlay_password';
	$('psigninp2_email').removeClassName('redtexterror');
	$('psigninp2_password').removeClassName('redtexterror');
}

function cnnConnectOverlayLoginShowText1() {
    //$('cnnConnectLoginText2').hide();
    //$('cnnConnectLoginText1').show();
}

function cnnConnectOverlayLoginShowText2() {
    //$('cnnConnectLoginText1').hide();
    //$('cnnConnectLoginText2').show();
}

function cnnConnectOverlayLoginValidationError(type, text) {
    switch (type) {
        case "clear":
            $('cnnConnectLoginErrors').hide();
            $('cnnConnectLoginErrors').innerHTML = '<br/>';
			$('cnnConnectFormLogin').email.removeClassName('redinput_error');
			$('cnnConnectFormLogin').password.removeClassName('redinput_error');
			$('psigninp2_email').removeClassName('redtexterror');
			$('psigninp2_password').removeClassName('redtexterror');
            break;
        case "add":
			$('psigninp2_email').addClassName('redtexterror');
			$('psigninp2_password').addClassName('redtexterror');
            $('cnnConnectLoginErrors').innerHTML += text;
            break;
        case "show":
            $('cnnConnectFormLogin').email.className = 'redinput_error';
            $('cnnConnectFormLogin').password.className = 'redinput_error';
            //$('cnnConnectFormLogin').password.value = 'Password';
            //$('cnnConnectFormLogin').password.type = 'text';
			//$('psigninp2_email').className = 'psigninp2 redtexterror';
			//$('psigninp2_password').className = 'psigninp2 redtexterror';
            $('cnnConnectLoginErrors').className = 'redtexterror';
			$('cnnConnectLoginErrors').show();
            break;
    }
}

function cnnConnectOverlayShowForgot() {
    //$('cnnConnectForgotContainer').show();
	showOverlay('profile_forgotpass_overlay');
}

function cnnConnectOverlayHideForgot() {
    //$('cnnConnectForgotContainer').hide();
	closeOverlay('profile_forgotpass_overlay');
}

function cnnConnectOverlayClearForgot() {
    $('cnnConnectForgotErrors').hide();
    $('cnnConnectFormForgot').email.value = '';
    $('cnnConnectFormForgot').email.className = 'cnnConnectFormbg5 cnn_connectoverlay_email';
}

function cnnConnectOverlayForgotShowErrors() {
    $('cnnConnectFormForgot').email.className = 'cnn_connectoverlay_email cnnredtxt redinput_error';
    $('cnnConnectForgotErrors').className = 'redtexterror';
	$('forgotpass_email').addClassName('redtexterror');
	$('cnnConnectForgotErrors').show();
}

function cnnConnectOverlayResetGetEmailFromLogin() {
    if($('cnnConnectFormLogin').email.value != '') {
        $('cnnConnectFormForgot').email.value = $('cnnConnectFormLogin').email.value;
        $('cnnConnectFormForgot').email.className = 'cnnConnectFormbgnone cnn_connectoverlay_email';
    }
}

function cnnConnectOverlayForgotValidationError(type, text) {
    switch (type) {
        case "clear":
			$('forgotpass_email').removeClassName('redtexterror');
            $('cnnConnectForgotErrors').hide();
            $('cnnConnectForgotErrors').innerHTML = '<br/>';
            break;
        case "add":
			$('forgotpass_email').addClassName('redtexterror');
            $('cnnConnectForgotErrors').innerHTML += text;
            break;
        case "show":
            $('cnnConnectFormForgot').email.className = 'cnn_connectoverlay_email cnnredtxt redinput_error';
            $('cnnConnectForgotErrors').className = 'redtexterror';
			$('forgotpass_email').addClassName('redtexterror');
			$('cnnConnectForgotErrors').show();
            break;
    }
}

function cnnConnectOverlayShowReset() {
    //$('cnnConnectResetContainer').show();
	showOverlay('profile_forgotpass2_overlay');
}

function cnnConnectOverlayHideReset() {
    closeOverlay('profile_forgotpass2_overlay');
}

function cnnConnectOverlayClearReset() {
    
    //$('cnnConnectFormReset').email.value = 'Email Address';
    //$('cnnConnectFormReset').resetCode.value = 'Reset Code';
    //$('cnnConnectFormReset').newPassword.value = 'New Password';
    //$('cnnConnectFormReset').confirmNewPassword.value = 'Confirm New Password';
    
    //$('cnnConnectFormReset').newPassword.type = 'text';
    //$('cnnConnectFormReset').confirmNewPassword.type = 'text';
    
    //$('cnnConnectFormReset').email.className = 'cnngraytxt cnn_connectoverlay_email3';
    //$('cnnConnectFormReset').resetCode.className = 'cnngraytxt cnn_connectoverlay_password3';
    //$('cnnConnectFormReset').newPassword.className = 'cnngraytxt cnn_connectoverlay_password4';
    //$('cnnConnectFormReset').confirmNewPassword.className = 'cnngraytxt cnn_connectoverlay_password5';
    
//    $('cnnConnectResetText1').hide();
//    $('cnnConnectResetText2').hide();
    
    cnnConnectOverlayResetValidationError('clear');
}

function cnnConnectOverlayGetEmailFromForgot() {
    $('cnnConnectFormReset').email.value = $('cnnConnectFormForgot').email.value;
    $('cnnConnectFormReset').email.className = 'cnnblacktxt cnn_connectoverlay_email3';
	showOverlay('profile_forgotpass2_overlay');
    cnnConnectOverlayShowMsg1()
}

function cnnConnectOverlayShowResetWithPasscode(email, resetCode) {
    //$('cnnConnectFormReset').email.value = email;
    //$('cnnConnectFormReset').email.className = 'cnnblacktxt cnn_connectoverlay_email3';
    //$('cnnConnectFormReset').resetCode.value = resetCode;
    //$('cnnConnectFormReset').resetCode.className = 'cnnblacktxt cnn_connectoverlay_password3';
    //cnnConnectOverlayShowMsg2()
}

function cnnConnectOverlayShowMsg1() {
    //$('cnnConnectResetText1').show();
	showOverlay('profile_forgotpass2_overlay');
}

function cnnConnectOverlayShowMsg2() {
    //$('cnnConnectResetText2').show();
	showOverlay('profile_forgotpass2_overlay');
}

function cnnConnectOverlayResetValidationError(type, text) {
    switch (type) {
        case "clear":
            $('cnnConnectResetErrors').hide();
            $('cnnConnectResetErrors').innerHTML = '<br/>';
            break;
        case "add":
            $('cnnConnectResetErrors').innerHTML += text;
            break;
        case "show":
			$('cnnConnectResetErrors').className = 'redtexterror';
            $('cnnConnectResetErrors').show();
            break;
    }
}

function cnnConnectOverlayResetError(field) {
    switch (field) {
        case "email":
            $('cnnConnectFormReset').email.className = 'cnn_connectoverlay_email3 cnnredtxt redinput_error';
			$('new_password_email').previous('p').addClassName('redtexterror');
            break;
        case "resetCode":
            $('cnnConnectFormReset').resetCode.className = 'cnn_connectoverlay_password3 cnnredtxt redinput_error';
			$('reset_code').previous('p').addClassName('redtexterror');
            break;
        case "newPassword":
            $('cnnConnectFormReset').newPassword.className = 'cnn_connectoverlay_password4 cnnredtxt redinput_error';
			$('new_password').previous('p').addClassName('redtexterror');
            break;
        case "confirmNewPassword":
            $('cnnConnectFormReset').confirmNewPassword.className = 'cnn_connectoverlay_password5 cnnredtxt redinput_error';
            break;
		default:
			$('new_password_email').previous('p').addClassName('redtexterror');
			$('cnnConnectFormReset').email.className = 'cnn_connectoverlay_email3 cnnredtxt redinput_error';
			$('reset_code').previous('p').addClassName('redtexterror');
			$('cnnConnectFormReset').resetCode.className = 'cnn_connectoverlay_password3 cnnredtxt redinput_error';
			$('new_password').previous('p').addClassName('redtexterror');
			$('cnnConnectFormReset').newPassword.className = 'cnn_connectoverlay_password4 cnnredtxt redinput_error';
			break;
    }
}

function cnnConnectOverlayShowRegister() {
    $('cnnConnectResetContainer').show();
}

function cnnConnectOverlayHideRegister() {
    $('cnnConnectResetContainer').hide();
}

function cnnConnectOverlayClearRegister() {
 
 	if ($('signup_email')) {
		$('signup_email').previous('p').removeClassName('redtexterror');
	}
	if ($('signup_password')) {
		$('signup_password').previous('p').removeClassName('redtexterror');
	}
	if ($('signup_screenname')) {
		$('signup_screenname').previous('p').removeClassName('redtexterror');
	}
	if ($('signup_kaptcha_p1')) {
		$('signup_kaptcha_p1').removeClassName('redtexterror');
	}
	
    //$('cnnConnectFormRegister').privacyPolicy.checked = false;
    //$('cnnConnectFormRegister').breakingNewsAlerts.checked = false;
    //$('cnnConnectFormRegister').specialOffers.checked = true;
    
    //$('cnnConnectRegisterErrors').hide();
    
    generateCaptchaImage();
}

function cnnConnectOverlayError(error, errorMessage) {
    switch(error) {
        case "email":
            if($('cnnConnectFormRegister').email.value != '') $('cnnConnectFormRegister').email.className = 'cnnConnectFormbgnone cnn_connectoverlay_email2 cnnredtxt redinput_error';
			break;
        case "password":
            if($('cnnConnectFormRegister').password.value != '') $('cnnConnectFormRegister').password.className = 'cnnConnectFormbgnone cnn_connectoverlay_password2 cnnredtxt redinput_error';
			break;
        case "errorText":
            $('cnnConnectRegisterErrors').hide();
            $('cnnConnectRegisterErrors').innerHTML = errorMessage;
			$('cnnConnectRegisterErrors').className = 'redtexterror';
            $('cnnConnectRegisterErrors').show();
            break;
        case "clearErrorText":
            $('cnnConnectRegisterErrors').hide();
			$('cnnConnectRegisterErrors').className = '';
            $('cnnConnectRegisterErrors').innerHTML = '';
            break;
        case "addErrorText":
            $('cnnConnectRegisterErrors').innerHTML += errorMessage;
			$('cnnConnectRegisterErrors').className = 'redtexterror';
            break;
        case "showErrorText":
			$('cnnConnectRegisterErrors').className = 'redtexterror';
            $('cnnConnectRegisterErrors').show();
            break;
    }
}

function cnnConnectOverlayRegisterError(field) {
    switch (field) {
        case "email":
            $('cnnConnectFormRegister').email.className = 'cnnConnectFormbgnone cnn_connectoverlay_email2 cnnredtxt redinput_error';
			$('signup_email').previous('p').addClassName('redtexterror');
			//$('cnnConnectFormRegister').email.value = '* E-mail';
            break;
        case "password":
            $('cnnConnectFormRegister').password.className = 'cnnConnectFormbgnone cnn_connectoverlay_password2 cnnredtxt redinput_error';
			$('signup_password').previous('p').addClassName('redtexterror');
			//$('cnnConnectFormRegister').password.type = 'text';
            //$('cnnConnectFormRegister').password.value = '* Password (Make it 6-10 characters, and don\'t use spaces)';
            break;
        case "screenName":
            $('cnnConnectFormRegister').displayname.className = 'cnnConnectFormbgnone cnn_connectoverlay_screenname cnnredtxt redinput_error';
			$('signup_displayname').previous('p').addClassName('redtexterror');
            //$('cnnConnectFormRegister').screenName.value = '* Screen Name (Select one with 3-12 characters; number and letters only)';
            break;
        case "captcha":
            $('cnnConnectFormRegister').captcha.className = 'cnnConnectFormbgnone cnn_connectoverlay_enterit cnnredtxt redinput_error';
			$('signup_kaptcha_p1').addClassName('redtexterror');
			$('cnnConnectRegisterErrors').className = 'redtexterror';
            //$('cnnConnectFormRegister').captcha.value = '* Type what you see in the grey box';
            break;
    }
}
function getRandomId() {
	var randomId = Math.round(Math.random()*9999999999);
	return randomId;
}
function generateCaptchaImage() {
    var randKaptchaId = getRandomId();
	$('cnnConnectCaptchaImage').src= ms_baseStandard + "kaptcha?challenge_id=" + randKaptchaId;
	$('cnnConnectCaptchaImage').width= '200';
	$('cnnConnectCaptchaImage').height= '50';
	$('cnnConnectFormRegister').captcha.value = '';
}

function showToggleOverlay() {
    var divId = 'cnnConnectOverlayBox';
    if($(divId).style.display == 'none') {
        $(divId).style.display = 'block';
        centerDivOfPage('cnnConnectOverlayBox');
        cnnConnectOverlayClearLogin();
    } else {
        $(divId).style.display = 'none';
    }
}

function checkUrlForParams() {
    if(location.href.indexOf("code=") != -1) {
        var queryVars = location.href.toQueryParams();
        //cnnConnectOverlayShowResetWithPasscode(queryVars.email, queryVars.code);
        CNN_handleOverlay('profile_forgotpass2_overlay');
		//cnnConnectOverlayHideLogin();
        //cnnConnectOverlayShowReset();
        //showToggleOverlay();
    } else if(location.href.indexOf('emailConfirmed=success') > -1) {
        // add for successful confirmation of email
        showOverlayMessage(1);
        //showToggleOverlay();
    } else if(location.href.indexOf('emailConfirmed=error') > -1) {
        showOverlayMessage(2);
    }
}

function showOverlayMessage(option) {

    if(option == 'hide') {
        $('cnnConnectMessageContent').innerHTML = '';
        $('cnnConnectMessageContainer').style.display = 'none';
    } else {
    
        var overlayMessage = [];
        
        // thank you for registering
        if(typeof(msStorage.profile) == 'undefined') {
            overlayMessage[0] = '<h1>Thanks! You are a CNN.com member</h1>';        
        } else {
            if(msStorage.profile.firstName != '') {
                overlayMessage[0] = '<h1>Thanks, <span id="cnnConnectThankYouName">'+msStorage.profile.firstName+'</span>! You are a CNN.com member</h1>';        
            } else if(msStorage.profile.screenName != '') {
                overlayMessage[0] = '<h1>Thanks, <span id="cnnConnectThankYouName">'+msStorage.profile.screenName+'</span>! You are a CNN.com member</h1>';
            } else {
                overlayMessage[0] = '<h1>Thanks! You are a CNN.com member</h1>';
            }
        }

        overlayMessage[0] += '<p class="connectptxt3">You are ready to participate in all activities and conversations on this site. Enjoy!</p>';

        overlayMessage[0] += '<p class="connectptxt4"><div class="cnnConnectReturnLink" onclick="window.msReload();">Go to Your Profile Page</div></p>';
	
	    // thank you for confirming your e-mail address
	    overlayMessage[1] = '<h1>Thank you for confirming your email address.</h1>';
	    overlayMessage[1] += '<p class="connectptxt3">You are ready to participate in all activities and conversations on this site. Enjoy!</p>';
	    if(ms_isLoggedIn() == true) {
	        overlayMessage[1] += '<p class="connectptxt4"><div class="cnnConnectReturnLink" onclick="window.msReload();">Go to Your Profile Page</div></p>';
        }
	
	    // problem confirming your e-mail address
	    overlayMessage[2] = '<h1>There was an error confirming your e-mail address.</h1>';
	    if(ms_isLoggedIn() == true) {
	        overlayMessage[2] += '<p class="connectptxt3">In order to correct this problem, please resend your confirmation e-mail by <a href="javascript:void(0);" onclick="showOverlayMessage(\'hide\');showToggleProfile();">going to Your Profile Page</a>.';
        } else {
            overlayMessage[2] += '<p class="connectptxt3">In order to correct this problem, please resend your confirmation e-mail by logging in and then going to edit my details.';
        }
	    
        $('cnnConnectMessageContainer').style.display = 'block';
	    $('cnnConnectMessageContent').innerHTML = overlayMessage[option];
	    centerDivOfPage('cnnConnectMessageContainer');
	
	}

}
function disqusConnectStatus(errors){	
	//check profile page to make sure #mynewstop isn't passed in the URL so the page can reload
	var sent_url = window.location.href;	
	var profile_check = window.location.hash.length; //sent_url.indexOf('#mynewstop');
	var set_str_len = sent_url.length - profile_check;
	
	if(profile_check > 0) {
		var new_url = sent_url.substr(0, set_str_len);
		window.location.href = new_url; 
	}	
	
	//this is placed into the connect-disqus-target.html file
	if(errors === false){
		window.msReload();
	} else {
		//TODO: there was a problem connecting to disqus but we will reload anyway with an alert
		//alert('You have been signed into CNN but our commenting service did not respond. You may experience issues leaving comments. Please wait a moment, sign out and try signing in again.');
		window.msReload();
	}
}
//end user.js

//begin overlay.js
//all this code is a mess and needs refactoring
function closeOverlay(divid) { 
	$('profile_overlaybg').hide();
	$(divid).hide();
}

function showOverlay(divid) {
	var vp_height =  document.viewport.getHeight();
	var vp_width =  document.viewport.getWidth();
	var html_height = Math.max(
					document.documentElement["clientHeight"],
					document.body["scrollHeight"],
					document.documentElement["scrollHeight"],
					document.body["offsetHeight"],
					document.documentElement["offsetHeight"]
				);
	var html_width = Math.max(
					document.documentElement["clientWidth"],
					document.body["scrollWidth"],
					document.documentElement["scrollWidth"],
					document.body["offsetWidth"],
					document.documentElement["offsetWidth"]
				);
	var overlay_height = (html_height > vp_height) ? html_height : vp_height;
	var overlay_width = (html_width > vp_width) ? html_width : vp_width;
	
	//detecting for certain overlays
	switch(divid){
		case 'profile_signup_overlay': generateCaptchaImage(); break;
		default: //nothing yet;
	};
	
	if (divid == 'profile_signin_overlay' ) { clearInputErrors(); }
	
	$('profile_overlaybg').setStyle({ width: overlay_width + 'px', height: overlay_height + 'px' });
	$('profile_overlaybg').show();	
	$(divid).show();
	centerDivOfPage(divid);
	globalDiv = divid;
	Event.observe(window, 'resize', function(){
		centerDivOfPage(globalDiv);
	});
}

function showOrHide(divid) { 
	$(divid).toggleClassName('displayon');
}

function hideDiv(divid) {
	$(divid).hide();
}

function getScrollOffset() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

function centerDivOfPage(divid){
	var scrollOffset = 	getScrollOffset();
	var divWidth = $(divid).getWidth();
	var divHeight = $(divid).getHeight();
	var vpHeight =  document.viewport.getHeight();
	var vpWidth =  document.viewport.getWidth();
	var htmlHeight = Math.max(
					document.documentElement["clientHeight"],
					document.body["scrollHeight"],
					document.documentElement["scrollHeight"],
					document.body["offsetHeight"],
					document.documentElement["offsetHeight"]
				);
	var htmlWidth = Math.max(
					document.documentElement["clientWidth"],
					document.body["scrollWidth"],
					document.documentElement["scrollWidth"],
					document.body["offsetWidth"],
					document.documentElement["offsetWidth"]
				);
	var overlayHeight = (htmlHeight > vpHeight) ? htmlHeight : vpHeight;
	var overlayWidth = (htmlWidth > vpWidth) ? htmlWidth : vpWidth;
	//set overlay width
	$('profile_overlaybg').setStyle({ width: overlayWidth + 'px', height: overlayHeight + 'px' });
	//to position the overlay
	var scrollOffsetY = scrollOffset[1];
	var divLeft = Math.floor((vpWidth / 2) - (divWidth / 2));
	//middle of viewport is going to be offsetX + vpHeight - (divHeight / 2);
	var divTop = Math.floor((scrollOffsetY + (vpHeight / 2)) - (divHeight / 2));
	//test if it is being set off the page
	if((divTop + divHeight) > htmlHeight){
		divTop = ((htmlHeight - divHeight) - 100);
	}
	//pushed off top or off left?
	divTop = (divTop <= 110) ? 110 : divTop;
	divLeft = (divTop <= 9) ? 10 : divLeft;
	$(divid).style.top = divTop + 'px';
	$(divid).style.left = divLeft + 'px';
}
//end overlay.js

function stringTrim(strToTrim) {
	return(strToTrim.replace(/^\s+|\s+$/g, ''));
}

function submitenter(myfield,e){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	if (keycode == 13) {
		$('cnnConnectFormLogin').email.value = stringTrim($('cnnConnectFormLogin').email.value);
		cnn_formConnectLogin('cnnConnectFormLogin');		
		return false;
   } else {
		return true;
   }
}

//set FB login verbiage
function cnnUpdateFBLogin() {
	
	var fbLoginOptions = ' ';
	if (Member.isLoggedIn('facebook') && !Member.isConnected() && !Member.isLoggedIn('cnn')) {
		fbLoginOptions = '<a href="javascript:FB.login();" title="Connect your Facebook account to CNN">Connect your Facebook account to CNN</a>';	
	} else if (!Member.isConnected()) {
		fbLoginOptions = '<a href="javascript:CNN_handleOverlay(\'fb_profile_signin_init_overlay\');" title="Connect your CNN &amp; Facebook accounts">Connect your CNN &amp; Facebook accounts</a>';
	} else if ((Member.isLoggedIn('cnn') && !Member.isLoggedIn('facebook')) || (Member.isLoggedIn('facebook') && !Member.isLoggedIn('cnn')) && !Member.isConnected()) {
		fbLoginOptions = '<a href="javascript:CNN_handleOverlay(\'fb_profile_signin_init_overlay\');" title="Log in with Facebook">Log in with Facebook</a>';	
	}
	
	$('fbLoginOptions').update(fbLoginOptions);
}


// begin header updater
var allCookies = CNN_getCookies();
function CNN_updateHeaderOptions(){
	//format url
	var cnnHostName = document.location.host;
	if(cnnHostName.indexOf('ireport') > -1){
		cnnHostName = 'www.cnn.com';
	};
	var cnnHostNameArray = cnnHostName.split('.');
	if(cnnHostNameArray[0] == 'newspulse'){
		cnnHostNameArray.splice(0, 1);
	}
	cnnHostName = cnnHostNameArray.join('.');
	var el = $('hdr-auth');
	if(el){
		if(Member.isLoggedIn('cnn') || (Member.isLoggedIn('facebook') && Member.isConnected())){
					
			//add avatar overlay if needed
			if ($('user_avatar')) {
				if ((Member.isConnected() && CNN_FB_user.avatar === 'fb') || (Member.isConnected() && !Member.isLoggedIn('cnn'))) {
					if (!$('fbAvatar')) {
						var fbAvatar = new Element('div', {
							id: 'fbAvatar'
						});
						$('user_avatar').appendChild(fbAvatar);
					}
				}
			}
						
			//set display name
			var cnnUserName = (Member.isLoggedIn('facebook') && Member.isConnected()) ? CNN_FB_user.accounts[CNN_FB_user.namePref].displayName : CNN_FB_user.accounts.cnn.displayName;
			if(Member.isLoggedIn('facebook') && Member.isConnected() && Member.isLoggedIn('cnn')) {
				cnnUserName = CNN_FB_user.accounts[CNN_FB_user.namePref].displayName;
			} else if (Member.isLoggedIn('facebook') && Member.isConnected() && !Member.isLoggedIn('cnn')) {
				cnnUserName = CNN_FB_user.accounts.fb.displayName;
			} else {
				cnnUserName = (CNN_FB_user.accounts[CNN_FB_user.namePref].displayName != '') ? CNN_FB_user.accounts[CNN_FB_user.namePref].displayName : CNN_FB_user.accounts.cnn.displayName;
			}
			if(cnnUserName == '') {
				return;
			}
						
			var html = '<ul>';
			var connectedState = '';

			html += '<li><a href="http://' + cnnHostName + '/profile/" title="">' + cnnUserName + '\'s profile</a></li>';
			html += '<li class="no-border no-pad-right"><a href="javascript:Member.fullLogout();" title="">Log out</a></li>';
			html += '</ul>';
			$('hdr-auth').innerHTML = html;
		} else {
			var html = '<ul>';
			html += '<li><a href="javascript:CNN_handleOverlay(\'profile_signup_overlay\');" title="">Sign up</a></li>';
			html += '<li class="no-border no-pad-right"><a href="javascript:CNN_handleOverlay(\'profile_signin_overlay\');" title="">Log in</a></li>';
			html += '</ul>';
			$('hdr-auth').innerHTML = html;
		}
		
		if ($('displayname')) {
			if (Member.isLoggedIn('facebook') && !Member.isLoggedIn('cnn')) {
				if (Member.isConnected()) {
					$('displayname').update(cnnUserName);
				} else {
					$('displayname').update('Hi!');
				}
				$('cnnLoginOptions').update('<a href="javascript:CNN_handleOverlay(\'profile_signin_overlay\');" title="Log in">Log in</a>&nbsp;or&nbsp;<a href="javascript:CNN_handleOverlay(\'profile_signup_overlay\');" title="sign up">sign up</a> with CNN to get personalized features such as breaking news alerts and newsletters.');
				$('user_profile').select('.welcome_details')[0].hide();
				$('user_profile').select('.user_details_box')[0].style.display = 'block';
			}
			cnnUpdateFBLogin();
		}
		
	} else {
		//skinny nav - do nothing
	};

	
	if ($('loading_overlay') && !is_loadedOvly) {
		
		closeOverlay('loading_overlay');
		is_loadedOvly = 1;

		//check for reset code
		//if(location.href.indexOf('code=') != -1) {
		       // CNN_handleOverlay('profile_forgotpass2_overlay');
		//} 
		checkUrlForParams();
	
	}	
	
	
};
//function for disqus
function onUserInfoLoadComplete(disqusObj){
//do something with the disqus obj?
}

//run once on page load
Event.observe(window, 'load', function(){
	//all connect button events should be dropped in here
	//these will be integrated into a config array in the future rewrite of MS
	//	$('button_id').observe('click', function(){
	//		action
	//	});
	//CNN_updateHeaderOptions();
	if ($('cnnConnectFormForgot')) {
		$('cnnConnectFormForgot').observe('keyup', function(event) {
			if (event.keyCode == Event.KEY_RETURN) {
				ms_formResetUserPassword('cnnConnectFormForgot');
				Event.stop(event);
			}
		});
	}
	if ($('cnnConnectFormReset')) {
		$('cnnConnectFormReset').observe('keyup', function(event) {
			if (event.keyCode == Event.KEY_RETURN) {
				ms_formSetUserPassword('cnnConnectFormReset');
				Event.stop(event);
			}
		});
	}
	if ($('cnnConnectFormRegister')) {
		$('cnnConnectFormRegister').observe('keyup', function(event) {
			if (event.keyCode == Event.KEY_RETURN) {
				ms_formRegister('cnnConnectFormRegister')
				Event.stop(event);
			}
		});
	}
	if ($('cnnConnectFormLogin')) {
		$('cnnConnectFormLogin').observe('keyup', function(event) {
			if (event.keyCode == Event.KEY_RETURN) {
				$('cnnConnectFormLogin').email.value = stringTrim($('cnnConnectFormLogin').email.value);
				cnn_formConnectLogin('cnnConnectFormLogin');
				Event.stop(event);
			}
		});
	}
	if ($('cnnConnectFormScreenname')) {
		$('cnnConnectFormScreenname').observe('keyup', function(event) {
			if (event.keyCode == Event.KEY_RETURN) {
				ms_formEnterScreenname('cnnConnectFormScreenname');
				Event.stop(event);
			}
		});
	}
});
// end header updater

/*	member.js
	
	- adds a Member singleton and full javascript api for interaction 
	with member services in a box through jsonp.  Because of cookie
	copy across domains certain api functions (register,login,logout)
	need to use the csiManager / iframe approach. A future feature could
	be to implement those over jsonp with only cookie copy happening in an
	iframe.
	
*/

//	Notes on storage:
//	Having a cached storage could offer a certain performance boost,
//	but this would really only apply to certain frequent calls.
//	With the jsonp speed and ease of use, and also the fact that with this
//	all aspects of the member services api will be available on every page,
//	persisting data at this point may not be worth it. 

//modified from http://github.com/dandean/Ajax.JSONRequest/blob/master/src/jsonp.js
Ajax.JSONRequest = Class.create(Ajax.Base, (function() {
  var id = 0, head = document.getElementsByTagName('head')[0];
  return {
    initialize: function($super, url, options) {
      $super(options);
      this.options.url = url;
      this.options.callbackParamName = this.options.callbackParamName || 'callback';
      this.options.timeout = this.options.timeout || 3; // Default timeout: 3 seconds
      this.options.invokeImmediately = (!Object.isUndefined(this.options.invokeImmediately)) ? this.options.invokeImmediately : true ;
      if (this.options.invokeImmediately) {
        this.request();
      }
    },
	
    _cleanup: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (this.transport && Object.isElement(this.transport)) {
        this.transport.remove();
      }
    },
  
    request: function() {
      
      // Define local vars
      var response = new Ajax.JSONResponse(this);
      var key = this.options.callbackParamName,
        name = '_prototypeJSONPCallback_' + (id++),
        complete = function() {
          if (Object.isFunction(this.options.onComplete)) {
            this.options.onComplete.call(this, response);
          }
        }.bind(this);
      
      // Add callback as a parameter and build request URL
      this.options.params[key] = name;
      var url = this.options.url + ((this.options.url.include('?') ? '&' : '?') + Object.toQueryString(this.options.params));
      
      // Define callback function
      window[name] = function(json) {
        this._cleanup(); // Garbage collection
        window[name] = undefined;
		//this bit will need refactoring
		if(json.status == 'error' && Object.isFunction(this.options.onError)){
		  response.status = 200;
          response.statusText = "ERROR";
          response.setResponseContent(json);
		  this.options.onError.call(this, response);
		} else {
			if (Object.isFunction(this.options.onSuccess)) {
			  response.status = 200;
			  response.statusText = "OK";
			  response.setResponseContent(json);
			  this.options.onSuccess.call(this, response);
			}
		}
        complete();
      }.bind(this);
      
      this.transport = new Element('script', { type: 'text/javascript', src: url });
      
      if (Object.isFunction(this.options.onCreate)) {
        this.options.onCreate.call(this, response);
      }
     // alert(this.transport.src);
      head.appendChild(this.transport);
 
      this.timeout = setTimeout(function() {
        this._cleanup();
        window[name] = Prototype.emptyFunction;
        if (Object.isFunction(this.options.onFailure)) {
          response.status = 504;
          response.statusText = "Gateway Timeout";
          this.options.onFailure.call(this, response);
        }
        complete();
      }.bind(this), this.options.timeout * 1000);
    },
    toString: function() { return "[object Ajax.JSONRequest]"; }
  };
})());
 
Ajax.JSONResponse = Class.create({
  initialize: function(request) {
    this.request = request;
  },
  request: undefined,
  status: 0,
  statusText: '',
  responseJSON: undefined,
  responseText: undefined,
  setResponseContent: function(json) {
    this.responseJSON = json;
    this.responseText = Object.toJSON(json);
  },
  getTransport: function() {
    if (this.request) return this.request.transport;
  },
  toString: function() { return "[object Ajax.JSONResponse]"; }
});

//for backwards compat
var ms_isLoggedIn = function(){
    var authid = allCookies[ 'authid' ] || null;
	if(authid==null) return false;
    else return true;
}

if(!ms_isLoggedIn && allCookies[ 'CNN_memberID' ]) {
	CNN_removeCookie('CNN_memberID', '/', document.domain );
}

var CNN_FB_user = (ms_isLoggedIn && allCookies[ 'CNN_memberID' ]) ? allCookies[ 'CNN_memberID' ].evalJSON(true) : {
	accounts : {
		cnn : {
			displayName: allCookies[ 'displayname' ] || ''
		},
		fb : {
			displayName: ''
		}
	},
	namePref : 'cnn',
	avatar : 'cnn',
	prefs: false //determines if user has selected an identity on the site. Once they do, we don't prompt them with the overlay again.
};


var CNN_FB_data = {
	cnn: { 
		'loginStatus' : false
	},
	fb : {
		'loginStatus': false,
		'connectedStatus' : false
	}
}


//two variables for checking if both fb and cnn member variables are complete since they both load asynch-blahblah-ly
var CNN_IsFBInit = false;
var CNN_IsMemInit = false;


var CNN_memberInit = true;

	Event.observe(window, 'load', function(){
		if(navigator.userAgent.toLowerCase().indexOf('msie 6') == -1) {
			Member.init();
		} else {
			if($('hdr-auth')) {
				$('hdr-auth').hide();
			}
			if($('pmUserPanel')) {
				$('pmUserPanel').hide();
			}
			if($('pmFacebookTab')) {
				var localCSIManager = CSIManager.getInstance();
				var FB_callObj = {
					url: '/.element/ssi/auto/3.0/sect/MAIN/facebook_rec.wrapper.html',
					args: '',
					domId: 'pmFacebookTab',
					funcObj: false,
					breakCache: false
				};
				CSIManager.getInstance().callObject(FB_callObj);			
			}
		}
	});

//requires: prototype 1.6
var Member = function(){
	
		var CNN_memberStatusData;
		var CNN_memberAccnts = "CNN_memberAccnts_dev";
		var CNN_memberStatusKey = "CNN_member_dev";
		var CNN_memberStatusExpires = "CNN_memberExpires_dev";
		var CNN_memberStatusLoaded = false;
		
	
	//var ms_base = 'http://localhost.cnn.com:7080/services/cnn/flow/';
	//var ms_legacy = 'http://localhost.cnn.com:7080/services/cnn/';
	
	var ms_base = 'http://audience.cnn.com/services/cnn/flow/';
	var ms_legacy = 'http://audience.cnn.com/services/cnn/';
	
	var CNN_returnURL = (window.location.href.indexOf('?') > -1) ? window.location.href.substr(0, window.location.href.indexOf('?')) : window.location.href;
	var CNN_rememberMe = false;
	
	
	var getCookies = function() {
		var hash = new Array;
		if ( document.cookie ) {
			var cookies = document.cookie.split( '; ' );
			for ( var i = 0; i < cookies.length; i++ ) {
				var namevaluePairs = cookies[i].split( '=' );
				hash[namevaluePairs[0]] = unescape( namevaluePairs[1] ) || null;
			}
		}
		return hash;
	}	
			
	// jsonp request obj
	var request = function(obj){
		var cookies = getCookies();
		//add auth to request, null values here?
		//obj.params.aid = cookies['CNNid'] || '';
		//obj.params.tid = cookies['authid'] || '';
		//TODO: provide overrides here
		obj.params.format = obj.format || 'jsonp';
		obj.params = obj.params || {};
		
		//TODO: if ireport or international we can add pid
		var ms_url = ms_base;
		if(obj.legacy){
			ms_url = ms_legacy + obj.legacy;
		}else{
			ms_url += obj.flow;
		}
		new Ajax.JSONRequest(ms_url, obj);
	}
	
	var checkSignature = function(obj, sig){
		var defaultOptions = {};
		defaultOptions.params = {};
		var obj = typeof(obj) != 'undefined' ? obj : defaultOptions;
		var reqs = sig.requiredParams || [];
		var count = 0;
		for(i=0;i<reqs.length;i++){
			
			//check for variable but allow for empty strings
			if(!obj.params[reqs[i]] && (obj.params[reqs[i]] != '')){
				var e = 'The api call is missing the required parameter: ' + reqs[i];
				throw e;
			} else {
				count++;
			}
		}
		if(count == reqs.length){
			if(sig.legacy){
				obj.legacy = sig.legacy
			} else {
				obj.flow = sig.flow;
			}
			obj.params.action = sig.action;
			return obj;
		} else {
			return false;
		}
	};
	
	//stop gap function for now, may want to build an overlay for errors
	//or some other solution
	var apiErrorMsg = 'Error in api method: ';
	var error = function(msg){
		throw msg;
	};
	
	var api = {
			init: function() {
				if(!CNN_memberInit) {
					//return;
				}
				CNN_memberInit = false; //this is to keep dom:ready and window onload from firing the init twice

				CNN_IsMemInit = true; //this probably isn't needed anymore

				if(CNN_IsMemInit && CNN_IsFBInit) {
				
					if(typeof(cnn_memfbini) === "function") { cnn_memfbini(); }
					
				}
				
				window.fbAsyncInit = function() {
					
					FB.init({
      					//apiKey : '64b385429f05b2492d713f343d05ba02',
      					appId: '80401312489',
						status : true, // check login status
      					cookie : true, // enable cookies to allow the server to access the session
						xfbml  : false  // parse XFBML
						,oauth : true
					});
				    var parseArticleFBML = true;

    				if(($('cnnStryRcmndBtn') || $('cnnStryRcmndBtnBtm')) && parseArticleFBML) {
						var recommendURL = '';
						var topRecommendDiv = $('cnnStryRcmndBtn');
						var bottomRecommendDiv = $('cnnStryRcmndBtnBtm');

    					var linkTags = document.getElementsByTagName('link');
    					for (var i = 0; i < linkTags.length; i++) {
    						if(linkTags[i].rel == "canonical") {
    							recommendURL = linkTags[i].href;	
    						}
    					}
    					if(recommendURL == '') {
   							recommendURL = 'http://www.cnn.com'+location.pathname;
   						}
   						if(topRecommendDiv && topRecommendDiv.innerHTML == '') {
   							if (Member.hasDisconnected()) {
   								$('cnnStryRcmndBtn').update('<fb:like action="recommend" show_faces="false" layout="button_count" href="'+recommendURL+'" width="336"></fb:like>');
   								$('cnnStryRcmndBtn').style.width = '260px';
   							} else {
   								$('cnnStryRcmndBtn').update('<fb:like action="recommend" show_faces="true" layout="standard" href="'+recommendURL+'" width="336"></fb:like>');   							
   							}
   							FB.XFBML.parse(topRecommendDiv);
    					}
    					if(bottomRecommendDiv && bottomRecommendDiv.innerHTML == '') {
    						if (Member.hasDisconnected()) {
   								$('cnnStryRcmndBtnBtm').update('<fb:like action="recommend" width="420" show_faces="false" layout="button_count" href="'+recommendURL+'"></fb:like>');
   							} else {
   								$('cnnStryRcmndBtnBtm').update('<fb:like action="recommend" width="420" show_faces="true" layout="standard" href="'+recommendURL+'"></fb:like>');
   							}
    						FB.XFBML.parse(bottomRecommendDiv);
    					}
    						
  						FB.Event.subscribe('edge.create', function(href, widget) {
							//this is where we would fire analytics call
							//href and 	widget._attr.width would give you article url and allow you to figure out which widget was used
						});    						
    						
						//FB.XFBML.parse();
    					parseArticleFBML = false;
    				}
				    	
				   var cnn_fbloginstatus = null;
				   
				   FB.getLoginStatus(function(response) {
					
					
					cnn_fbloginstatus = 1;
					
					Member.setFBStatus(response);
					CNN_IsFBInit = true;

					if(Member.isLoggedIn('cnn') && allCookies[ 'CNN_memberID' ]) {
						CNN_FB_user = allCookies[ 'CNN_memberID' ].evalJSON(true);
					}
					else if(allCookies[ 'CNN_memberID' ] && !Member.isLoggedIn('cnn')) {
						
						//need to kill cookie
						Member.removeIDCookie();
						
					}
					
					//alert(response.authResponse.userID);
					
					if (Member.isConnected() && !(Member.isLoggedIn('cnn'))) {
					
						//alert(response.authResponse.userID);
						
						FB.api({
							method: 'fql.query',
							query: 'SELECT name, pic_square FROM user WHERE uid=' + FB.getAuthResponse().userID
						}, function(response) {
							var user = response[0];

							Member.setUserDataFB(user, FB.getAuthResponse().userID);
						});
					
					}

					//we might need to define a empty function in main.js that can be redefined on a page by page basis in order to handle custom code that needs to be launch after FB connect has been initialized
					if(CNN_IsMemInit && CNN_IsFBInit) {
					
						//check for custom fucntion on page to run custom javascript that only needs to run AFTER member 'status' is set
						if(typeof(cnn_memfbini) === "function") { cnn_memfbini(); }
						
					}
					
				}, true);
				
				
					FB.Event.subscribe('auth.login', Member.setFBStatus);
					FB.Event.subscribe('auth.logout', Member.setFBStatus);
				
				
				};

	  				(function() {
  						var bodyTag = document.getElementsByTagName('body')[0];
    					var FB_rootNode = document.createElement('div');
						FB_rootNode.setAttribute('id','fb-root');

    					var CNN_overlayNode = document.createElement('div');
						CNN_overlayNode.setAttribute('id','cnn_mOvrlycntr');

						bodyTag.insertBefore(FB_rootNode,bodyTag.firstChild);
						bodyTag.insertBefore(CNN_overlayNode,bodyTag.firstChild);

						//document.getElementsByTagName('body')[0].appendChild(CNN_overlayNode);

	    				var FB_CoreJS = document.createElement('script');
						FB_CoreJS.setAttribute('type','text/javascript');
						FB_CoreJS.setAttribute('src','http://connect.facebook.net/en_US/all.js');
						FB_CoreJS.setAttribute('async','true');
						document.getElementsByTagName('head')[0].appendChild(FB_CoreJS);
					}());
			},
			setRememberMe:function(val) {
				CNN_rememberMe = val;
			},
			getRememberMe:function() {
				return CNN_rememberMe;
			},
			setFBStatus: function(response) {
				switch(response.status) {
					case 'connected':
						//console.log('setFBStatus: facebook logged in and connected');
						CNN_FB_data.fb.loginStatus = true;
						CNN_FB_data.fb.connectedStatus = true;
					break;
					case 'notConnected':
						//console.log('setFBStatus: facebook logged in, not connected');
						CNN_FB_data.fb.loginStatus = true;
						CNN_FB_data.fb.connectedStatus = false;

					break;
					default:
						//console.log('setFBStatus: facebook not logged in, not connected');
						CNN_FB_data.fb.loginStatus = false;
						CNN_FB_data.fb.connectedStatus = false;
				}
				if(ms_isLoggedIn() === true) {
					//console.log('setFBStatus: cnn logged in');
					CNN_FB_data.cnn.loginStatus = true;
				}
				if(typeof MainLocalObj !== "undefined" && typeof MainLocalObj.showIdentity === 'function'){
					MainLocalObj.showIdentity();
				} else {
					CNN_updateHeaderOptions();
				}
			},
			clearStoredDataAll: function() {
				Member.removeIDCookie();
			},
			clearStoredDataIdentities: function() {
				Member.removeIDCookie();
			},
			clearStoredPrefs: function() {
				Member.removeIDCookie();
			},
			removeIDCookie:function() {
				CNN_removeCookie('CNN_memberID', '/', document.domain );
			},
			getReturnURL: function() {
				return CNN_returnURL;
			},
			setReturnURL: function(arg) {
				CNN_returnURL = arg;
			},
			///services/cnn/user.api?action=getProfile
			//cnn-user-api
			setUserDataFB: function(obj,id,reload) {
				CNN_FB_user.accounts.fb.displayName = obj.name;
				CNN_updateHeaderOptions();
				//this is facebook only, no need for cookie?
				CNN_setCookie('CNN_memberID', Object.toJSON(CNN_FB_user), 854400, '/', document.domain);

				if(reload) {
					if(!CNN_FB_user.prefs) {
						CNN_handleOverlay('fb_choose_identity_overlay');
					} else {
						location.reload();
					}				
				}
			},

			setUserDataCNN: function(obj,fb) {
				CNN_setCookie('displayname', obj.profile.screenName, 854400, '/', document.domain);

				CNN_FB_user.accounts.cnn.displayName = obj.profile.screenName;
				CNN_FB_user.accounts.fb.displayName = obj.profile.fb_userName;
				CNN_FB_user.prefs = obj.profile.prefChosen;
				CNN_FB_user.namePref = obj.profile.id_pref;
				CNN_FB_user.avatar = obj.profile.avatar_pref;
				
				
				//set session cookie, reload window				
				CNN_setCookie('CNN_memberID', Object.toJSON(CNN_FB_user), 854400, '/', document.domain);
				
				if(fb || (Member.isConnected() && Member.isLoggedIn('cnn') && CNN_FB_user.prefs == "false")) {
					CNN_handleOverlay('fb_choose_identity_overlay');
				} else {
					Member.executeCookieCopy();
				}
			},

			setUserAvatarPref: function(t_pref) {
			
				CNN_FB_user.avatar = t_pref;
				//console.log('Avatar: (' + t_pref + ')');
				
				CNN_setCookie('CNN_memberID', Object.toJSON(CNN_FB_user), 854400, '/', document.domain);
			
			},
			
			setUserNamePref: function(t_pref) {
				CNN_FB_user.prefs = true;
				CNN_FB_user.namePref = t_pref;
				//console.log('Name: (' + t_pref + ')');

				CNN_setCookie('CNN_memberID', Object.toJSON(CNN_FB_user), 854400, '/', document.domain);
			
			},
			setDisconnectPrefs: function() { //called from disconnect
				CNN_FB_user.prefs = false;
				CNN_FB_user.namePref = 'cnn';
				for (var j in CNN_FB_user.accounts.fb) {
					CNN_FB_user.accounts.fb[j] = '';
				}
				//console.log(CNN_FB_user);
				CNN_setCookie('profile.lastNewsID', 'fbfriends', 24 * 30 * 12, '/', document.domain);
				CNN_setCookie('CNN_memberID', Object.toJSON(CNN_FB_user), 854400, '/', document.domain);
				if(Member.isLoggedIn('cnn')) {
					Member.cnnDisconnectFB();
				} else {
					CNN_setCookie('cnnfb.hasDisconnected', 1, 24 * 30 * 12, '/', document.domain);
					window.location.reload();
				}
			},
			setActivityFlag: function() {
				if (Member.hasDisconnected()) {
					CNN_setCookie('cnnfb.hasDisconnected', 0, 24 * 30 * 12, '/', document.domain);					
					window.location.reload();
				} else {
					CNN_handleOverlay('fb_turn_off_overlay');
					CNN_setCookie('cnnfb.hasDisconnected', 1, 24 * 30 * 12, '/', document.domain);					
				}
			},
			getProfile: function(fb){
				var isFB = (fb) ? true : false;
				//update to call getID from MS
				//console.log('calling get profile');
				var formObj = {
					params : {
						'format':'jsonp'
					},
					onSuccess: function(response){
						var valResponse = response.responseJSON;
						if(valResponse && valResponse.errors) {
					        //not logged in
						} else if(valResponse && valResponse.status == "success") {
							Member.setUserDataCNN(response.responseJSON,isFB);
						}
					}
				};
		
				Member.getID(formObj); 				
			},
			getProfileJSON: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'getProfileJSON', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in getProfileJSON method');
			},
			updateProfile: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'updateProfile', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in updateProfile method');
			},
			getID: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'getID', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in updateProfile method');
			},
			getData: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'getData', requiredParams: ['name']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error(apiErrorMsg + arguments.callee);
				return xObj;
			},
			setData: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'setData', requiredParams: ['name', 'data']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in setData method');
			},
			appendData: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'appendData', requiredParams: ['name', 'data']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in appendData method');
			},
			prependData: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'prependData', requiredParams: ['name', 'data']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in prependData method');
			},
			getEmails: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'getEmails', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in getEmails method');
			},
			deleteEmail: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'setData', requiredParams: ['email']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in deleteEmail method');
			},
			changePrimaryEmail: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'changePrimaryEmail', requiredParams: ['email']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in changePrimaryEmail method');
			},
			addEmail: function(obj){
				var sig = {flow: 'cnn-user-api', action: 'addEmail', requiredParams: ['email']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			
			//cnn-passwordRecovery-api
			sendResetPasswordCode: function(obj){
				//TODO: what is required
				var sig = {flow: 'cnn-passwordRecovery-api', action: 'sendResetPasswordCode', requiredParams: ['email']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			changePassword: function(obj){
				var sig = {flow: 'cnn-passwordRecovery-api', action: 'changePassword', requiredParams: ['email', 'resetCode', 'password']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			
			//cnn-newsletter-api
			getNewsletter: function(obj){
				var sig = {flow: 'cnn-newsletter-api', action: 'getNewsletter', requiredParams: ['name']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			getNewsletters: function(obj){
				var sig = {flow: 'cnn-newsletter-api', action: 'getNewsletters', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			removeNewsletter: function(obj){
				var sig = {flow: 'cnn-newsletter-api', action: 'removeNewsletter', requiredParams: ['email', 'newsletter']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			addNewsletter: function(obj){
				var sig = {flow: 'cnn-newsletter-api', action: 'addNewsletter', requiredParams: ['email', 'newsletter']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			getActiveAndPendingNewsletters: function(obj){
				var sig = {flow: 'cnn-newsletter-api', action: 'getActiveAndPendingNewsletters', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in api method');
			},
			
			//cnn-alert-api
			getAlerts: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'getAlerts', requiredParams: []};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			removeAlerts: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'removeAlerts', requiredParams: ['alertId']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			getAlert: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'getAlert', requiredParams: ['alertId']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			addAlert: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'addAlert', requiredParams: 
				['email', 'name', 'include', 'exclude', 'format', 'frequency']
				};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			suspendAlerts: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'suspendAlerts', requiredParams: ['alertId']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			updateAlert: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'updateAlert', requiredParams: 
				['email', 'name', 'include', 'exclude', 'format', 'frequency']
				};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			activateAlerts: function(obj){
				var sig = {flow: 'cnn-alert-api', action: 'activateAlerts', requiredParams: ['alertId']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			
			//because of cookie copy register, login and logout are done through the csi manager!
			//cnn-register-api
			
			fb_login: function(obj){
				var login = CSIManager.getInstance();
				var authArgs = Object.toQueryString(obj) + '&callback=Member.loginCallbackFB';
				var callObj = {
					url: ms_base + 'facebook-link-external-account-on-login',
					args: authArgs,
					domId: false,
					breakCache: true
				};
				login.callObject(callObj);
			},

			
			register: function(obj){
				var reg = CSIManager.getInstance();
				var callObj = {
					url: ms_legacy + 'register.api',
					args: obj,
					domId: false,
					breakCache: true
				};
				reg.callObject(callObj);
			},
			fb_register: function(obj){
				var reg = CSIManager.getInstance();
				var callObj = {
					url: ms_base + 'fb-register-api',
					args: obj,
					domId: false,
					breakCache: true
				};
				reg.callObject(callObj);
			},
			
			fullLogout: function(){
				if(Member.isLoggedIn('facebook') && Member.isConnected()) {
					CNN_handleOverlay('fb_signedout_overlay');
				} else {
					Member.executeFullLogout();
				}
			},
			executeFullLogout: function(){
				if(Member.isLoggedIn('facebook') && Member.isConnected()) {
					FB.logout(function(response) {
						Member.clearStoredDataIdentities('all');
						if(Member.isLoggedIn('cnn')) {
							Member.logout();
						}
						}
					);
				} else if(Member.isLoggedIn('cnn')) {
					Member.logout();
				}
			},
			
			
			//looks at local storage to see if user is connected
			isConnected: function(){
				return CNN_FB_data.fb.connectedStatus;
				},
			
			//cnn-logout-api
			logout: function(){
				var logout = CSIManager.getInstance();
				var callObj = {
					url: ms_base + 'cnn-logout-api',
					args: 'callback=Member.logoutCallback&doSso=false',
					domId: false,
					breakCache: true
				};
				logout.callObject(callObj);
			},
			
			logoutCallback: function(response){
				var sso = response || false;
				if(sso){
					Member.clearStoredDataIdentities('all');
					var disqus = CSIManager.getInstance();
					var logoutArgs = 'assertionConsumerUrl=http://www.disqus.com/saml/cnn/logout/';
					logoutArgs += '&target=http://audience.cnn.com/services/cnn/blank.api?callback=Member.logoutCallback';
					var callObj = {
						url: 'http://audience.cnn.com/services/cnn/flow/cnn-sso',
						args: logoutArgs,
						domId: false,
						breakCache: true
					}
					disqus.callObject(callObj);
				} else {
					Member.executeCookieCopy(true);
				}
			},
			
			//TODO: naming conventions!
			facebookLinkExternalAccountOnLogin: function(obj){
				var sig = {flow: 'facebook-link-external-account-on-login', action: '', requiredParams: ['facebookUserId', 'principalType']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			
			facebookLinkExternalAccountLoggedIn: function(obj){
				var sig = {flow: 'facebook-link-external-account-loggedin', action: '', requiredParams: ['facebookUserId', 'principalType']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			
			facebookLinkExternalAccount: function(obj){
				var sig = {flow: 'facebook-link-external-account', action: '', requiredParams: ['facebookUserId', 'principalType']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			
			fbConnect: function(obj){
				var sig = {flow: 'fb-connect', action: '', requiredParams: ['facebookUserId']};
				var xObj = checkSignature(obj, sig);
				(xObj) ? request(xObj) : error('error in method');
			},
			connectAppOnly: function(obj) {
				//console.log(obj);
				location.reload();
			},
			facebookDiscAccount: function(obj){
				FB.api({
				method: 'auth.revokeAuthorization',
				uid : FB.getAuthResponse().userID
				},
				function(response) {
					//console.log(response);
					Member.setDisconnectPrefs('cnn');
				});

			},

			cnnDisconnectFB: function(){

				var cnn_fbd = CSIManager.getInstance();
				
				//remove avatar
		        if (CNN_FB_user.avatar === 'fb') {
		        	
		        	function findContentDoc(iframe) {
			            var cdoc = iframe;
			            if (cdoc.contentWindow) cdoc = cdoc.contentWindow;
			            if (cdoc.contentDocument) cdoc = cdoc.contentDocument;
			            if (cdoc.document) cdoc = cdoc.document;
			            return cdoc;
			        }
		        	
			        var targetForm = findContentDoc($('avatarRemoveFrame')).getElementById("uploadForm");
					
					// Trigger the delete.
					targetForm.submit();

		        }
		        
				var formObj = {
					params : {
						'avatarPref':'cnn',
						'idPref':'cnn',
						'fbName':'',
						'prefChosen':false
					},
					onSuccess: function(response){
						var valResponse = response.responseJSON;
						if(valResponse && valResponse.errors) {
							//error handling
						} else if(valResponse && valResponse.status == "success") {
							
							//disconnect FB
							var callObj = {
								url: ms_base + 'ma-remove',
								args: 'authorityTypeToRemove=3',
								domId: false,
								breakCache: false
							};
							cnn_fbd.callObject(callObj);
							CNN_setCookie('cnnfb.hasDisconnected', 1, 24 * 30 * 12, '/', document.domain);

							//console.log('prefs should be reset');
							window.location.reload();
						}
					}
				};
				Member.updateProfile(formObj);

				//FB.logout();
				//console.log('In your CNN account, disowning your FB: ' + callObj.url);
				
			},
			reloadPage:function() {
			    if(window.location.href.indexOf('?') > -1) {
        			window.location.href = window.location.href.substr(0, window.location.href.indexOf('?'));
			    } else {
        			window.location.href = window.location.href;
			    }
			},
			executeCookieCopy:function(logout) {
				allCookies = CNN_getCookies();
				var authid = allCookies[ 'authid' ] || null;
				var CNNid = allCookies[ 'CNNid' ] || null;
				var authpass = allCookies[ 'authpass' ] || null;
				var firstName = allCookies[ 'firstName' ] || null;
				var displayname = allCookies[ 'displayname' ] || null;					
				
				
				var cookieCopy = (logout) ? 'http://audience.ireport.com/services/cnn/cookiecopy.api?drop=true&url='+escape(CNN.Page.getRefURL({ 'is_LR' : '1'})) : 'http://audience.ireport.com/services/cnn/cookiecopy.api?cnnid=' + CNNid + '&authid=' + authid + '&authpass=' + authpass + '&displayname=' + displayname + '&firstName=' + firstName + '&url=' + escape(CNN.Page.getRefURL({ 'is_LR' : '1'})) + '&keepMeLoggedIn='+Member.getRememberMe();
				window.location.href = cookieCopy;
			},
			//cnn-login-api
			login: function(loginObj){
				var login = CSIManager.getInstance();
				//TODO: keep login object the same as other objects with params as its own object??
				var authArgs = Object.toQueryString(loginObj) + '&callback=Member.loginCallback';
				var callObj = {
					url: ms_base + 'cnn-login-api',
					args: authArgs,
					domId: false,
					breakCache: true
				};
				login.callObject(callObj);
			},
			loginCallbackFB: function(response) {
				CNN_setCookie('profile.lastNewsID', 'fbfriends', 24 * 30 * 12, '/', document.domain);
				CNN_setCookie('cnnfb.hasDisconnected', 0, 24 * 30 * 12, '/', document.domain);
				Member.loginCallback(response,true);
			},
			loginCallback: function(response,fb){
				var sso = response || false;
				var isFB = (fb) ? true : false;
				if(response && response.status) {
					if (response.status == "error") {
						for (i in response.errors) {
							switch(response.errors[i]) {
								case 'invalid password':
							        cnnConnectOverlayLoginValidationError('clear');
							        cnnConnectOverlayLoginValidationError('add', 'Your email address or password doesn\'t match our records. Please try again.');
							        cnnConnectOverlayLoginValidationError('show');
								break;
							}
						}
						return;
					}
				}

				
				//currently disabled because of disqus 500 errors
				if(sso){
					var disqus = CSIManager.getInstance();
					var loginArgs = 'assertionConsumerUrl=http://www.disqus.com/saml/cnn/postback/';
					if(isFB) {
						loginArgs += '&target=' + ms_base + 'cnn-blank-api?callback=Member.loginCallbackFB';
					
					} else {
						loginArgs += '&target=' + ms_base + 'cnn-blank-api?callback=Member.loginCallback';
					}
					var callObj = {
						url: 'http://audience.cnn.com/services/cnn/flow/cnn-sso',
						args: loginArgs,
						domId: false,
						breakCache: true
					}
					disqus.callObject(callObj);
				} else {
					//sso over, refresh
					//location.href = location.href
					//location.reload();
					Member.getProfile(isFB);
				}
				//location.href = location.href
				//location.reload();
			},
			
			loginCallbackFbCnctRec : function() {
				Member.getProfile(true);
			},
			loginCallbackFBCnct: function(){
				CNN_setCookie('cnnfb.hasDisconnected', 0, 24 * 30 * 12, '/', document.domain);
				//currently disabled because of disqus 500 errors
					Member.setRememberMe(true);
					var disqus = CSIManager.getInstance();
					var loginArgs = 'assertionConsumerUrl=http://www.disqus.com/saml/cnn/postback/';
					
					loginArgs += '&target=' + ms_base + 'cnn-blank-api?callback=Member.loginCallback';

					var callObj = {
						url: 'http://audience.cnn.com/services/cnn/flow/cnn-sso',
						args: loginArgs,
						domId: false,
						breakCache: true
					}
					disqus.callObject(callObj);
			},
			
			hasDisconnected: function() {
				allCookies = CNN_getCookies();
				return (allCookies["cnnfb.hasDisconnected"] == 1) ? true : false;
			},
			
			//auth tests
			isLoggedIn: function(x){
				allCookies = CNN_getCookies();
				switch(x) {
					case 'facebook':
						return CNN_FB_data.fb.loginStatus;
					break;
					case 'cnn':
    					var authid = allCookies[ 'authid' ] || null;
						if(authid==null) {
							return false;
    					} else {
    						return true;
    					}
						//return CNN_FB_data.cnn.loginStatus;
					break;
				}
			}
			
		}
		
		return api;

}();



function fbSessionHandler(response){
		
//		console.log(response);
if(!response.session) {
	//console.log("didn't get session, returning without moving forward");
 return;
}

if(response.status == 'connected') {
	if(typeof Dsq !== "undefined") {
		//console.log('call disqus');
		if ( Dsq.CNN !== undefined && Dsq.CNN.authenticateFacebookUser !== undefined ) {
			Dsq.CNN.authenticateFacebookUser(FB.getAuthResponse().userID);
		}
	}
}

//alert(response);		
		var fbObj = {
			params: {
				facebookUserId: FB.getAuthResponse().userID,
				principalType: 'FACEBOOK'
			},
				onSuccess: function(response){
				var nextAction = response.responseJSON.status;
				//console.log('fbSession handler says: ' +nextAction);
				if(nextAction == 'need register'){
				//here we need to look at cookie. cookie, show sign in, otherwise show signup.
					if(allCookies[ 'CNN_member' ]) {
						var signin = new Overlay('fb_profile_signin_overlay');
						signin.load();
					} else {
						var signup = new Overlay('fb_profile_signup_overlay');
						signup.load();
					}
				} else if (nextAction == 'existing user'){
					//CNN_FB_user.merged = true;
					//Member.getProfile();
					Member.loginCallbackFBCnct();
				} else if (nextAction == 'unavailable'){
					var mergeEOverlay = new Overlay('fb_merge_error1_overlay');
					mergeEOverlay.load();
					//FB.logout();
				} else if (nextAction == 'external authorization failed'){
					//this shouldnt be a success message - it should
					//be an error that occurs in onError
//					alert("external authorization failed");

					var errorOverlay = new Overlay('fb_error_external');
					errorOverlay.load();

					//FB.logout();

					//console.log('external authorization failed'); 
				} else {
					// ?
					var errorOverlay = new Overlay('fb_error_general');
					errorOverlay.load();
					//alert('fall back error ' + nextAction);
				}
			}
		};

		if(Member.isLoggedIn('cnn')) {
			Member.facebookLinkExternalAccountLoggedIn(fbObj);
		/*} else if(typeof FB_noMerge !== "undefined" && (typeof CNN_FB_user.merged === "undefined" || !CNN_FB_user.merged)) {
			Member.connectAppOnly(fbObj);
		*/} else {
			Member.fbConnect(fbObj);
		}

}

function CNN_handleOverlay(overlay,article) {
	//this function should look at the logged in/connected states, then show the proper sign up/log in overlays. We'll use the arg to determine which action the user is taking. the argument will come in with the form matching the non connected/non-fb logged in version. If we determine they're logged into FB but not connected to our app id, we'll show them the interstitial type overlay. need additional hook to say the action occured from a story page, in which case we may need to handle the merging of accounts. too much for one function?
	if(Member.isLoggedIn('facebook')) {
		//do Facebook interstital overlay
		switch(overlay) {
			case 'profile_signin_overlay':
				var signinOverlay = new Overlay('fb_profile_signin_init_overlay');
				signinOverlay.load();
			break;
			case 'profile_signup_overlay':
				var signupOverlay = new Overlay('fb_profile_signup_init_overlay');
				signupOverlay.load();
			break;
			default:
				var defOverlay = new Overlay(overlay);
				defOverlay.load();
		}
	
	}
	else {

		switch(overlay) {
			case 'profile_signin_overlay':
				var signinOverlay = new Overlay('profile_signin_overlay_videxp');
				signinOverlay.load();
			break;
			case 'profile_signup_overlay':
				var signupOverlay = new Overlay('profile_signup_overlay');
				signupOverlay.load();
			break;
			default:
				var defOverlay = new Overlay(overlay);
				defOverlay.load();
		}
	
	}
	
	
}

function Overlay(div_id){
	
	var id = div_id,
	
	queue = [],
	storageLoaded = false;

//	var overlayPath = 'http://www.cnn.com/.element/js/3.0/overlay/data/2.0/' + id + '.html';
	var overlayPath = 'http://' + location.host + '/.element/js/3.0/overlay/data/2.0/' + id + '.html';

	var t_mobj;
	
	
	var dimmerId = 'cnnDimmer';
	var dimmerLoaded = $(dimmerId);
	if(!dimmerLoaded){
		var dimmer = new Element('div', {'id': 'cnnDimmer'});
		//dimmer style defaults
		dimmer.setStyle({
		'backgroundColor': '#000000',
		'position': 'absolute',
		'z-index': 2146483646,
		'top': '0px',
		'left': '0px',
		'opacity': '0.5',
		'display': 'none',
		'z-index': '11'
		});
		document.body.appendChild(dimmer);
	};

	//to keep div centered and overlay always right?
	var htmlHeight = function(){
		return Math.max(
			document.documentElement["clientHeight"],
			document.body["scrollHeight"],
			document.documentElement["scrollHeight"],
			document.body["offsetHeight"],
			document.documentElement["offsetHeight"]
		);
	};
	
	var htmlWidth = function(){
		return Math.max(
			document.documentElement["clientWidth"],
			document.body["scrollWidth"],
			document.documentElement["scrollWidth"],
			document.body["offsetWidth"],
			document.documentElement["offsetWidth"]
		);
	};
	
	var dimmerHeight = function(){
		return Math.max(
			document.viewport.getHeight(),
			htmlHeight()
		);
	};
	
	var dimmerWidth = function(){
		return Math.max(
			document.viewport.getWidth(),
			htmlWidth()
		);
	};	

	var getScrollOffset = function() {
	  var scrOfX = 0, scrOfY = 0;
	  if( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant, necessary?
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	  }
	  return [ scrOfX, scrOfY ];
	};
	
	var sizeDimmer = function(){
		var height = dimmerHeight() + 'px';
		var width = dimmerWidth() + 'px';
		$(dimmerId).setStyle({
			'width': width,
			'height': height
		});
	};
	
	
	var positionOverlay = function(){
		
		if($(id)) {
		
		var scrollOffset = 	getScrollOffset();
		var divWidth = $(id).getWidth();
		var divHeight = $(id).getHeight();
		var vpHeight =  document.viewport.getHeight();
		var vpWidth =  document.viewport.getWidth();
		//to position the overlay
		var scrollOffsetY = scrollOffset[1];
		var divLeft = Math.floor((vpWidth / 2) - (divWidth / 2));
		var divTop = Math.floor((scrollOffsetY + (vpHeight / 2)) - (divHeight / 2));
		//test if it is being set off the page
		if((divTop + divHeight) > htmlHeight()){
			divTop = ((htmlHeight() - divHeight) - 100);
		}
		//pushed off top or off left, 110
		divTop = (divTop <= 110) ? 110 : divTop;
		divLeft = (divTop <= 9) ? 10 : divLeft;
		$(id).style.top = divTop + 'px';
		$(id).style.left = divLeft + 'px';
		
		}
		
	};
	
	var cnn_overlaycsiHNDLR = function(obj, t_divid) {
	
		//load in overlay html
		var t_html = '';
		cnn_mOverlayObj = obj;
		
		cnn_mOverlayObj.init_overlay(t_mobj);
		t_html = cnn_mOverlayObj.overlay_html;

		$('cnn_mOvrlycntr').update(t_html);
		
		//do some javascript / css magic
		positionOverlay();
		$(id).show();

		//attach any action events
		cnn_mOverlayObj.init_events(t_mobj);

	};
	
	var request = function(){
	
		//show dimmer
		sizeDimmer();
		$(dimmerId).show();

		//show overlay html for loading graphic / close overlay link
		var t_html = '';
		t_html += '<div style="top: 312px; left: 356px;" class="overlay_content" id="' + id + '"><div class="cnnConnBox"><div onclick="closeOverlay(\'' + id + '\');return false;" class="overlay_close"></div><div class="signup_cont"><div class="profileoverlay_bdy p_signup"><h1>Loading...</h1><div id="facebookInfo"><p class="psigninp2" id=""></p></div></div></div></div><div class="clear"></div></div>';
		$('cnn_mOvrlycntr').update(t_html);
		
		//get overlay data
		CSIManager.getInstance().call(overlayPath, '', false, cnn_overlaycsiHNDLR);	
	
	};
	
	return	{
		
		load: function(m_obj){
			
			$('cnn_mOvrlycntr').update('');
			Event.observe(window, 'resize', function(){
				sizeDimmer();
				positionOverlay();
			});
			m_obj = m_obj || {};
			t_mobj = m_obj;
			request();
	
		},
		
		close: function(){
			$('cnn_mOvrlycntr').update('');
			$(dimmerId).hide();
		},
		
		loadHLDR: function(h_id) {
			
			$('cnn_mOvrlycntr').update('');
			Event.observe(window, 'resize', function(){
				sizeDimmer();
				positionOverlay();
			});
			
			sizeDimmer();
			$(dimmerId).show();

			var t_html = '';
			t_html += '<div class="overlay_content cnn_fbcntorly cnn_fbcntstryorly" id="' + id + '"><div class="cnnConnBox"><div onclick="closeOverlay(\'' + id + '\');return false;" class="overlay_close"></div><div class="signup_cont"><div id="' + h_id + '"><div class="profileoverlay_bdy p_signup"><h1>Loading...</h1><div id="facebookInfo"><p class="psigninp2" id=""></p></div></div></div></div></div><div class="clear"></div></div>';
			$('cnn_mOvrlycntr').update(t_html);
			
			positionOverlay();
		
		},
		
		addToQueue: function(){
			if(storage){
				storage.dataObjects.overlayQueue.unshift(id);
				storage.put('overlayQueue', storage.dataObjects.overlayQueue);
				storage.save();
				//console.log(storage.dataObjects.overlayQueue);
			} else {
				//console.log('couldnt add to queue');
			}
		},
		
		removeFromQueue: function(id){ }
	
	}

};



//The great big overlay init object / Stores the functions and javascript to be triggered once html is retreived from the CSI

var cnn_OvrlyIEvents = {





}



//personalization module overlay
function CNN_FBpsnlzdOO() {
	allCookies = CNN_getCookies();
	var hasDisconnected = Member.hasDisconnected();
	var t_html ='';
	if(Member.isLoggedIn('facebook') && !hasDisconnected) {	t_html += 'Using Facebook, you can now see what your friends are recommending and sharing on CNN. To learn more, or to disable this feature, go to <a href="/profile/?setTab=mysettings">settings</a>.'; }
	else { t_html += 'Using Facebook, you can now see the most recommended CNN stories. Facebook user? If so, <a href="javascript:CNN_handleOverlay(\'profile_signin_overlay\');">log in</a> to see your friends\' activity on CNN.'; }
	$('cnn_FBawOLYM').update(t_html);
	$('cnn_FBawDIM').removeClassName('cnn_dynone');
	$('cnn_FBawOLY').removeClassName('cnn_dynone');
	
}

function CNN_FBpsnlzdOC() { $('cnn_FBawOLY').addClassName('cnn_dynone');$('cnn_FBawDIM').addClassName('cnn_dynone'); }


//these two need to be removed (to save time on the profile page since it uses a different show/close Overlay method that's getting overwritten by this) and updated in member code csi html functions calls
function closeOverlay(divid) { 
	$('cnn_mOvrlycntr').update('');
	$('cnnDimmer').hide();
}

function showOverlay(divid) {

	$('cnn_mOvrlycntr').update('');
	var overlay = new Overlay(divid);
	overlay.load();
};

function closeCSIOverlay(divid) { 
	$('cnn_mOvrlycntr').update('');
	$('cnnDimmer').hide();
}

function showCSIOverlay(divid) {

	$('cnn_mOvrlycntr').update('');
	var overlay = new Overlay(divid);
	overlay.load();
};



/* These are all the functions that go with the overlays ... they'll rest here til more time is available to put them as functions inside Member (member.js) */
//TODO: Also need to fix them to use new MSIB data get/set management that's inside Member

/* profile_signin_overlay */
function validateEmail(elementValue) {
	var emailPattern = /^([a-zA-Z0-9_\.\'\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return emailPattern.test(elementValue); 
}
	
function validate_signin() {
	var loginObj = $('cnnConnectFormLogin').serialize(true);
	var formId = 'cnnConnectFormLogin';
	var email = $(formId).email.value;
	var password = $(formId).password.value;
	var keepMeLoggedIn = $(formId).cnnRememberMe.checked;
	
	// client-side validation
	var pass = true;
	var errorText = 'Registration isn\'t complete without your ';
	var validationErrors = [];
	if(validateEmail(email) == false) {
		pass = false;
		validationErrors[validationErrors.length] = 'e-mail address';
		//$(formId).email.value = 'E-mail';
		$('psigninp2_email').addClassName('redtexterror');
		$(formId).email.className = 'redinput_error';
	}
	if(password == '') {
		pass = false;
		$('psigninp2_password').addClassName('redtexterror');
		validationErrors[validationErrors.length] = 'password';
		//$(formId).password.value = 'Password';
		$(formId).password.className = 'redinput_error';
	}
	if(pass) {
		//ms_doLogin(email, password, rememberMe, 'ms_uiDoLogin');
		if(loginObj.cnnRememberMe === 'on'){
			document.cnnConnectFormLogin.keepMeLoggedIn.value = true;
			Member.setRememberMe(true);
		} else {
			document.cnnConnectFormLogin.keepMeLoggedIn.value = false;
			Member.setRememberMe(false);
		}
		loginObj.doSso = false;

		//submit form rather than call function
		document.cnnConnectFormLogin.submit();
		//Member.login(loginObj);
	} else {
		cnnConnectOverlayLoginValidationError('clear');
		if(validationErrors.length == 2) {
			cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' and ' + validationErrors[1] + ' to log in.');
		} else {
			if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
				cnnConnectOverlayLoginValidationError('add', 'You entered an invalid e-mail address.');
			} else if (validationErrors[0] == 'e-mail address' && email == '') {
				cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			} else {
			cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			}
		}
		cnnConnectOverlayLoginValidationError('show');
	}
};


function validate_signinFB() {
	var loginObj = $('cnnConnectFormLogin').serialize(true);
	var formId = 'cnnConnectFormLogin';
	var email = $(formId).email.value;
	var password = $(formId).password.value;
	var keepMeLoggedIn = $(formId).cnnRememberMe.checked;
	
	// client-side validation
	var pass = true;
	var errorText = 'Registration isn\'t complete without your ';
	var validationErrors = [];
	if(validateEmail(email) == false) {
		pass = false;
		validationErrors[validationErrors.length] = 'e-mail address';
		//$(formId).email.value = 'E-mail';
		$('psigninp2_email').addClassName('redtexterror');
		$(formId).email.className = 'redinput_error';
	}
	if(password == '') {
		pass = false;
		$('psigninp2_password').addClassName('redtexterror');
		validationErrors[validationErrors.length] = 'password';
		//$(formId).password.value = 'Password';
		$(formId).password.className = 'redinput_error';
	}
	if(pass) {
		//ms_doLogin(email, password, rememberMe, 'ms_uiDoLogin');
		if(loginObj.cnnRememberMe === 'on'){
			document.cnnConnectFormLogin.keepMeLoggedIn.value = true;
			Member.setRememberMe(true);
		} else {
			document.cnnConnectFormLogin.keepMeLoggedIn.value = false;
			Member.setRememberMe(false);
		}
		loginObj.doSso = false;
//		Member.fb_login(loginObj);
		document.cnnConnectFormLogin.submit();

	} else {
		cnnConnectOverlayLoginValidationError('clear');
		if(validationErrors.length == 2) {
			cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' and ' + validationErrors[1] + ' to log in.');
		} else {
			if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
				cnnConnectOverlayLoginValidationError('add', 'You entered an invalid e-mail address.');
			} else if (validationErrors[0] == 'e-mail address' && email == '') {
				cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			} else {
			cnnConnectOverlayLoginValidationError('add', 'We need your ' + validationErrors[0] + ' to log in.');
			}
		}
		cnnConnectOverlayLoginValidationError('show');
	}
};




function registerHandler(obj){

	if(obj.status == 'success'){
		//console.log('success');
		if(Member.isConnected()){
			FB.api({
					method: 'fql.query',
					query: 'SELECT name, pic_square FROM profile WHERE id=' + FB.getAuthResponse().userID
				},
				function(response) {
					var user = response[0];
					var fbObj = {
						params: {
							facebookUserId: FB.getAuthResponse().userID,
							principalType: 'FACEBOOK'
						},
						onSuccess: function(response){
							if(response.responseJSON.status == 'existing user'){
								Member.loginCallbackFBCnct();
//								location.reload();
							}
							if(response.responseJSON.status == 'unavailable'){
								var mergeEOverlay = new Overlay('fb_merge_error1_overlay');
								mergeEOverlay.load();
							}
							if(response.responseJSON.status == 'need register'){
								if(allCookies[ 'CNN_member' ]) {
									var signin = new Overlay('fb_profile_signin_overlay');
									signin.load();
								} else {
									var signup = new Overlay('fb_profile_signup_overlay');
									signup.load();
								}
							}
						}
					};
					Member.facebookLinkExternalAccountLoggedIn(fbObj);
				}
			);
			
		} else {
			//console.log('not logged in error handle');
			//console.log(obj)
			Member.getProfile();
		}
	} else {
		if (obj.errors) {
		cnnConnectOverlayError('clearErrorText');
		//generateCaptchaImage();
		if($("cnnConnectKaptchaImage")) {
			generateKaptchaImage();
		}
//			for (var i in obj.errors) {
	        for(var i=0; i<obj.errors.length; i++) {
		
           switch (obj.errors[i]) {
                case 'email address not available':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'That e-mail address is already taken.<br/>');
                    break;
                case 'missing email address':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your e-mail address.<br/>');
                    break;
                case 'bad email address':
                    cnnConnectOverlayRegisterError('email');
                    cnnConnectOverlayError('addErrorText', 'You entered an invalid e-mail address.<br/>');
                    break;
                case 'missing password':
                    cnnConnectOverlayRegisterError('password');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your password.<br/>');
                    break;
                case 'bad password':
                    cnnConnectOverlayRegisterError('password');
                    cnnConnectOverlayError('addErrorText', 'You entered an invalid password.<br/>');
                    break;
                case 'missing screen name':
                    cnnConnectOverlayRegisterError('screenName');
                    cnnConnectOverlayError('addErrorText', 'You forgot to enter your screen name.<br/>');
                    break;
                case 'screen name not available':
                    cnnConnectOverlayRegisterError('screenName');
                    cnnConnectOverlayError('addErrorText', 'That screen name is already taken. Please choose another.<br/>');
                    break;
                case 'missing captcha':
                    cnnConnectOverlayRegisterError('captcha');
                    cnnConnectOverlayError('addErrorText', 'You forgot to type in the security word in the grey box.<br/>');
                    break;
                case 'bad captcha':
                    cnnConnectOverlayRegisterError('captcha');
                    cnnConnectOverlayError('addErrorText', 'You entered the security word in the grey box incorrectly.<br/>');
                    break;
                case 'missing privacy policy':
                    cnnConnectOverlayError('addErrorText', 'You must agree to the privacy policy.<br/>');
                    break;
                default:
                    break;
            }

			}
			cnnConnectOverlayError('showErrorText');

		}
		//console.log('error in registration');
	}

};

function validate_register2() {

	newuser = true;
	var formId = 'cnnConnectFormRegister';
    var email = $(formId).email.value.trim();
    var password = $(formId).password.value;
    var displayname = $(formId).displayname.value.trim();
    //show the displayname with spaces removed.
    $(formId).displayname.value = displayname;

	//if form is submitted the user agrees to the privacy policy
    var privacy = 'domestic_version';
    var newsletters = '';
    /*if($(formId).specialOffers.checked == true) {
        newsletters = 'member_services';
    }*/
  
    // client-side validation
    var pass = true;
    var errorText = 'A required field is missing! Registration isn\'t complete without your ';
    var validationErrors = [];
    if(email == '' || validateEmail(email) == false) {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
        cnnConnectOverlayRegisterError('email');
    } else {
		$('cnnConnectFormRegister').email.className = 'cnnConnectFormbg1 cnn_connectoverlay_email2';
		$('signup_email').previous('p').removeClassName('redtexterror');
	}
    if(password == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'password';
        cnnConnectOverlayRegisterError('password');
    } else if (password.length < 6 || password.indexOf(' ') != -1 || password.length > 10) {
        pass = false;
        cnnConnectOverlayRegisterError('password');
        cnnConnectOverlayError('errorText', 'You entered an invalid password.');
        return;
    } else {
		$('cnnConnectFormRegister').password.className = 'cnnConnectFormbg2 cnn_connectoverlay_password2';
		$('signup_password').previous('p').removeClassName('redtexterror');
	}
    var displaynamePattern = /^\w+$/;
    if(displayname == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'screen name';
        cnnConnectOverlayRegisterError('screenName');
    } else if (displayname.length < 3) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'The screen name that you entered is too short.');
		//$('cnnConnectFormRegister').displayname.className = 'cnnConnectFormbgnone cnn_connectoverlay_displayname cnnredtxt redtexterror';
        return;
    } else if (displayname.length > 12) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name must be 3-12 characters; numbers and letters only.');
        return;
    } else if (displaynamePattern.test(displayname) == false) {
        pass = false;
		cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name includes invalid characters.');
        return;
    } else {
	    $('cnnConnectFormRegister').displayname.className = 'cnnConnectFormbg3 cnn_connectoverlay_displayname';
		$('signup_displayname').previous('p').removeClassName('redtexterror');
	}
    /*if(privacy == 'no') {
        pass = false;
        validationErrors[validationErrors.length] = 'Privacy Policy';
    }*/
    if(pass == true) {
		var regObj = $('cnnConnectFormRegister').serialize();
//		Member.fb_register(regObj);
		document.cnnConnectFormRegister.submit();

    } else {
        switch (validationErrors.length) {
            case 1:
				if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
					errorText = 'You entered an invalid e-mail address.';
				} else if (validationErrors[0] == 'e-mail address' && email == '') {
				    errorText += validationErrors[0];
				} else {
					errorText += validationErrors[0];
				}
                break;
            case 2:
                errorText += validationErrors[0] + ' and ' + validationErrors[1];
				break;
            default:
                for(var i=0; i<validationErrors.length; i++) {
                    errorText += (i == (validationErrors.length -1)) ? 'and ' + validationErrors[i] + '.' : validationErrors[i] + ', ';
                };
				break;
        }
        cnnConnectOverlayError('errorText', errorText);
    }

}

	
function validate_register() {
	newuser = true;
	var formId = 'cnnConnectFormRegister';
    var email = $(formId).email.value.trim();
    var password = $(formId).password.value;
    var displayname = $(formId).displayname.value.trim();
    //show the displayname with spaces removed.
    $(formId).displayname.value = displayname;

    var kaptcha = $(formId).kaptcha.value;
	//if form is submitted the user agrees to the privacy policy
    var privacy = 'domestic_version';
    var newsletters = '';
    if($(formId).specialOffers.checked == true) {
        newsletters = 'member_services';
    }
  
    // client-side validation
    var pass = true;
    var errorText = 'A required field is missing! Registration isn\'t complete without your ';
    var validationErrors = [];
    if(email == '' || validateEmail(email) == false) {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
        cnnConnectOverlayRegisterError('email');
    } else {
		$('cnnConnectFormRegister').email.className = 'cnnConnectFormbg1 cnn_connectoverlay_email2';
		$('signup_email').previous('p').removeClassName('redtexterror');
	}
    if(password == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'password';
        cnnConnectOverlayRegisterError('password');
    } else if (password.length < 6 || password.indexOf(' ') != -1 || password.length > 10) {
        pass = false;
        cnnConnectOverlayRegisterError('password');
        cnnConnectOverlayError('errorText', 'You entered an invalid password.');
        return;
    } else {
		$('cnnConnectFormRegister').password.className = 'cnnConnectFormbg2 cnn_connectoverlay_password2';
		$('signup_password').previous('p').removeClassName('redtexterror');
	}
    var displaynamePattern = /^\w+$/;
    if(displayname == '') {
        pass = false;
        validationErrors[validationErrors.length] = 'screen name';
        cnnConnectOverlayRegisterError('screenName');
    } else if (displayname.length < 3) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'The screen name that you entered is too short.');
		//$('cnnConnectFormRegister').displayname.className = 'cnnConnectFormbgnone cnn_connectoverlay_displayname cnnredtxt redtexterror';
        return;
    } else if (displayname.length > 12) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name must be 3-12 characters; numbers and letters only.');
        return;
    } else if (displaynamePattern.test(displayname) == false) {
        pass = false;
        cnnConnectOverlayRegisterError('screenName');
        cnnConnectOverlayError('errorText', 'Your screen name includes invalid characters.');
        return;
    } else {
	    $('cnnConnectFormRegister').displayname.className = 'cnnConnectFormbg3 cnn_connectoverlay_displayname';
		$('signup_displayname').previous('p').removeClassName('redtexterror');
	}
    if(kaptcha == '') {
        pass = false;
        generateKaptchaImage();
		validationErrors[validationErrors.length] = 'security word';
        cnnConnectOverlayRegisterError('kaptcha');
		cnnConnectOverlayError('errorText', 'You must enter a security word.');
    } else {
	    $('cnnConnectFormRegister').kaptcha.className = 'cnnConnectFormbg4 cnn_connectoverlay_enterit';
		$('signup_kaptcha_p1').removeClassName('redtexterror');
	}
    /*if(privacy == 'no') {
        pass = false;
        validationErrors[validationErrors.length] = 'Privacy Policy';
    }*/
    if(pass == true) {
		var regObj = $('cnnConnectFormRegister').serialize();
		//submit form instead of member method.

		document.cnnConnectFormRegister.submit();
//		Member.register(regObj);
    } else {
        switch (validationErrors.length) {
            case 1:
				if(validationErrors[0] == 'e-mail address' && validateEmail(email) == false && email != ''){
					errorText = 'You entered an invalid e-mail address.';
				} else if (validationErrors[0] == 'e-mail address' && email == '') {
				    errorText += validationErrors[0];
				} else {
					errorText += validationErrors[0];
				}
                break;
            case 2:
                errorText += validationErrors[0] + ' and ' + validationErrors[1];
				break;
            default:
                for(var i=0; i<validationErrors.length; i++) {
                    errorText += (i == (validationErrors.length -1)) ? 'and ' + validationErrors[i] + '.' : validationErrors[i] + ', ';
                };
				break;
        }
        cnnConnectOverlayError('errorText', errorText);
    }
}

function validateResetEmail() {
	var formId = 'cnnConnectFormForgot';
    var email = $(formId).email.value;
    if(validateEmail(email) == false) {
        //Check and resubmit your e-mail address, it does not match our records.
        cnnConnectOverlayForgotValidationError('clear');
        cnnConnectOverlayForgotValidationError('add', 'You must enter your e-mail address to reset your password.');
        cnnConnectOverlayForgotValidationError('show');
    } else {
		var formObj = {
				params : {
					'email':email
				},
				onSuccess: function(response){
					var valResponse = response.responseJSON;
					if(valResponse && valResponse.errors) {
				        cnnConnectOverlayForgotValidationError('clear');
						for(var i=0; i<valResponse.errors.length; i++) {
							switch (valResponse.errors[i]) {
				        //User not found
				                case 'User not found':
        							cnnConnectOverlayForgotValidationError('add', 'Your e-mail address doesn\'t match our records. Please try again.');
				        		break;
								case 'You have recently requested to reset your password.  You must wait before requesting another reset.':
        							cnnConnectOverlayForgotValidationError('add', 'You have recently requested to reset your password.  You must wait before requesting another reset.');        		
				        		break;
								default:
        							cnnConnectOverlayForgotValidationError('add', valResponse.errors[i]);
					        	break;
            				}
        				}
        				
				        cnnConnectOverlayForgotValidationError('show');
					} else if(valResponse && valResponse.status == "success") {
						cnnConnectOverlayUpdate('forgot2reset');
					}
				}
		};
		
		
		Member.sendResetPasswordCode(formObj);        
        
    }
}

function validateSetUserPassword() {
	var formId = 'cnnConnectFormReset';
    var email = $(formId).email.value;
    var resetCode = $(formId).resetCode.value;
    var newPassword = $(formId).newPassword.value;
    //var confirmNewPassword = $(formId).confirmNewPassword.value;
    //a temporary fix to the redesign of reset without a confirmation box
	var confirmNewPassword = newPassword;
	
    // client-side validation
    var pass = true;
    var errorText = 'Reset Password isn\'t complete without your ';
    var validationErrors = [];
    if(validateEmail(email) == false || email == 'Email Address') {
        pass = false;
        validationErrors[validationErrors.length] = 'e-mail address';
        cnnConnectOverlayResetError('email');
    } else {
		$('new_password_email').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').email.className = 'cnn_connectoverlay_email3 cnnredtxt';
	}
    if(resetCode == '' || resetCode == 'Reset Code') {
        pass = false;
        validationErrors[validationErrors.length] = 'reset code';
        cnnConnectOverlayResetError('resetCode');
    } else {
		$('reset_code').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').resetCode.className = 'cnn_connectoverlay_password3 cnnredtxt';
	}
    if(newPassword == '' || newPassword == 'New Password') {
        pass = false;
        validationErrors[validationErrors.length] = 'new password';
        cnnConnectOverlayResetError('newPassword');
    } else {
		$('new_password').previous('p').removeClassName('redtexterror');
		$('cnnConnectFormReset').newPassword.className = 'cnn_connectoverlay_password4 cnnredtxt';
	}
    /*if(confirmNewPassword == '' || confirmNewPassword == 'Confirm New Password') {
        pass = false;
        validationErrors[validationErrors.length] = 'password confirmation';
        cnnConnectOverlayResetError('confirmNewPassword');
    }*/
    if(pass == true) {
		var formObj = {
				params : {
					'email':email,
					'resetCode':resetCode,
					'password':newPassword,
					'confirmPassword':confirmNewPassword
				},
				onSuccess: function(response){
					
					
					
					
					var valResponse = response.responseJSON;

					if(valResponse && valResponse.errors) {
						cnnConnectOverlayResetValidationError('clear');
				        for(var i=0; i<valResponse.errors.length; i++) {
            				switch (valResponse.errors[i]) {
                				case 'missing email address':
            	        			cnnConnectOverlayResetError('email');
                    				cnnConnectOverlayResetValidationError('add', 	'You forgot to enter your e-mail address.<br/>');
			                    break;
				                case 'profile not found':
                				    cnnConnectOverlayResetError('email');
                    				cnnConnectOverlayResetValidationError('add', 'Your e-mail address or reset code doesn\'t match our records. Please try again.<br/>');
			                    break;
            				    case 'missing new password':
                    				cnnConnectOverlayResetError('newPassword');
				                    cnnConnectOverlayResetValidationError('add', 'You forgot to enter your new password.<br/>');
                			    break;
                				case 'missing confirm new password':
                    				cnnConnectOverlayResetError('confirmNewPassword');
				                    cnnConnectOverlayResetValidationError('add', 'You forgot to confirm your new password.<br/>');
                  				break;
                				case 'confirm password did not match':
                   					cnnConnectOverlayResetError('newPassword');
                    				cnnConnectOverlayResetError('confirmNewPassword');
                				    cnnConnectOverlayResetValidationError('add', 'Your passwords do not match.<br/>');
           				         break;
       					         case 'reset code has expired':
       					             cnnConnectOverlayResetError('resetCode');
       					             cnnConnectOverlayResetValidationError('add', 'Your reset code has expired. <a href="javascript: void(0);" onclick="closeOverlay(\'profile_forgotpass2_overlay\');showOverlay(\'profile_forgotpass_overlay\');">Send another e-mail</a> with an updated link and reset code to reset your password.<br/>');
       				             break;
								case 'The reset code does not match our records':
     				               cnnConnectOverlayResetError('resetCode');
                    				cnnConnectOverlayResetValidationError('add', 'Your reset code does not match our records. <a href="javascript: void(0);" onclick="closeOverlay(\'profile_forgotpass2_overlay\');showOverlay(\'profile_forgotpass_overlay\');">Send another e-mail</a> with an updated link and reset code to reset your password.<br/>');				
								break;
				                default:
									cnnConnectOverlayResetError('default');
									cnnConnectOverlayResetValidationError('add', 'We\'re sorry! This service is temporarily unavailable. Please try again soon.');
                			    break;
            		}
       			 }
        		cnnConnectOverlayResetValidationError('show');

					} else if(valResponse && valResponse.status == "success") {
					cnnConnectOverlayUpdate('reset2loginsuccess');
				}
				}
		};

		Member.changePassword(formObj);
//        ms_setUserPassword(resetCode, email, newPassword, confirmNewPassword, 'ms_uiSetUserPassword');
        
        
        
        
        
    } else {
        cnnConnectOverlayResetValidationError('clear');
        switch (validationErrors.length) {
            case 1:
                errorText += validationErrors[0] + '.';
                break;
            case 2:
                errorText += validationErrors[0] + ' and ' + validationErrors[1] + '.';
                break;
            default:
                for(var i=0; i<validationErrors.length; i++) {
                    errorText += (i == (validationErrors.length -1)) ? 'and ' + validationErrors[i] + '.' : validationErrors[i] + ', ';
                }
                break;
        }
        cnnConnectOverlayResetValidationError('add', errorText);
        cnnConnectOverlayResetValidationError('show');
    }
}


function generateKaptchaImage() {
    var randKaptchaId = getRandomId();
	$('cnnConnectKaptchaImage').src= ms_baseStandard + "kaptcha?challenge_id=" + randKaptchaId;
	$('cnnConnectKaptchaImage').width= '200';
	$('cnnConnectKaptchaImage').height= '50';
	$('cnnConnectFormRegister').kaptcha.value = '';
}


//create CNN Namespace
if (Object.isUndefined(CNNO)) {

	var CNNO = Class.create({

		'chars' : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
		
		'randomStr' : function(str_l) {
		
			var rstring = '';
			for (var i=0; i<str_l; i++) {
				var rnum = Math.floor(Math.random() * this.chars.length);
				rstring += this.chars.substring(rnum,rnum+1);
			}

			return rstring;
			
		},
		
		//url management
		'Page' : {

			'cleanURL' : (window.location.href.indexOf('?') > -1) ? window.location.href.substr(0, window.location.href.indexOf('?')) : window.location.href,
	
			'urlArgs' : '',
	
			'refresh' : function(add_params, sub_params) {
	
				//refresh with cache buster
				location.href = this.getRefURL(add_params, sub_params);
		
			},
			
			'getRefURL' : function(add_params, sub_params) {
			
				//set defaults for arguments
				if(Object.isUndefined(add_params)) { add_params = {}; }
				if(Object.isUndefined(sub_params)) { sub_params = {}; }
			
				//define needed removals
				sub_params.cnncb = 1;
				sub_params.cnnqueue = 1;
			
				//get url vars
				var t_nv = this.urlNameVals();
		
				var t_qvals = '';
				var t_arr = [];
			
				//add current params
				for(var key in t_nv) {
					if(!sub_params[key] && !add_params[key] && t_nv[key]) {
						t_arr.push(key + '=' + t_nv[key]);
					}
				}
			
				//add new params
				for(var key in add_params) { if(add_params[key]) { t_arr.push(key + '=' + add_params[key]); } }
			
				t_qvals = t_arr.join('&');
			
				var n_url = this.cleanURL + '?';
			
				if(t_qvals) { n_url += t_qvals; }
				
				//check overlay queue
				var q_str = CNNO.prototype.Overlay.queue.join('_');

				if(q_str) {
				
					if(t_qvals) { n_url += '&'; }
					
					n_url += 'cnnqueue=' + q_str;
					
				}
				
				return n_url;
				
				//removed cache buster
				// + 'cnncb=' + CNNO.prototype.randomStr(10);
		
			},

			//extract url parameters
			'urlNameVals' : function() {
	
				var args = new Object(); 
				var query = location.search.substring(1); 
				var pairs = query.split("&"); 
				for(var i = 0; i < pairs.length; i++) { 
					var pos = pairs[i].indexOf('='); 
					if (pos == -1) continue; 
					var argname = pairs[i].substring(0,pos); 
					var value = pairs[i].substring(pos+1); 
					args[argname] = unescape(value); 
				} 

				this.urlArgs = args;
				return args;
	
			}

		}
		
	});

}


//member data
CNNO.addMethods({

	'Profile' : {

		'is_loaded' : 0,
		
		'emails' : null,
		
		'init' : function() {
	
	
	
	
		},
				
		'loadFrames' : function(f_type) {

			if(f_type == 'l') {
			
				var loginFrame;

				try {
			  		loginFrame = document.createElement('<iframe name="loginFrame">');
				} catch (ex) {
		  			loginFrame = document.createElement('iframe');
				}
	
				loginFrame.setAttribute('name','loginFrame');
				loginFrame.setAttribute('height','1');
				loginFrame.setAttribute('width','1');
				loginFrame.setAttribute('id','loginFrame');
				loginFrame.setAttribute('style','height:1px;width:1px;');
	
				$$('body')[0].appendChild(loginFrame);
		
			}
			else {
		
				var registerFrame;

				try {
  					registerFrame = document.createElement('<iframe name="registerFrame">');
				} catch (ex) {
  					registerFrame = document.createElement('iframe');
				}	
	
				registerFrame.setAttribute('name','registerFrame');
				registerFrame.setAttribute('height','1');
				registerFrame.setAttribute('width','1');
				registerFrame.setAttribute('id','registerFrame');
				registerFrame.setAttribute('style','height:1px;width:1px;');
	
				$$('body')[0].appendChild(registerFrame);

			}
	
		}

	}

});


//overlay management
CNNO.addMethods({

	'Overlay' : {

		//is dimmer appended
		'app_dim' : 0,
		
		//current overlay queue
		'queue' : [],
		
		//active overlay key
		'active' : null,
		
		't_q' : null,
		
		'setDim' : function(s_dim) {
		
			//append dim html if needed
			if(!this.app_dim) {
			
				var t_ele = document.createElement('div');
				t_ele.id = 'cnn_overlaydim';
				t_ele.className = 'cnn_overlaydim';
			
				$$('body')[0].appendChild(t_ele);
			
				$('cnn_overlaydim').setStyle({ 'display' : 'none' }); 
				//this.sizeDim(); 
				
				//make way to remove when overlay is not showing? maybe not since it always exists?
				Event.observe(window, 'resize', function() {
					CNNO.prototype.Overlay.sizeDim();
				});				
				
				this.app_dim = 1;
				
			}
			
			CNNO.prototype.Overlay.sizeDim();
			
			//show / hide dimmer
			if(s_dim) { $('cnn_overlaydim').show(); }
			else { $('cnn_overlaydim').hide(); }
			
		},
		
		'sizeDim' : function() {
			
			var vp_height =  document.viewport.getHeight();
			var vp_width =  document.viewport.getWidth();
			var html_height = Math.max(
				document.documentElement["clientHeight"],
				document.body["scrollHeight"],
				document.documentElement["scrollHeight"],
				document.body["offsetHeight"],
				document.documentElement["offsetHeight"]
			);
			var html_width = Math.max(
				document.documentElement["clientWidth"],
				document.body["scrollWidth"],
				document.documentElement["scrollWidth"],
				document.body["offsetWidth"],
				document.documentElement["offsetWidth"]
			);
			var overlay_height = (html_height > vp_height) ? html_height : vp_height;
			var overlay_width = (html_width > vp_width) ? html_width : vp_width;
			
			$('cnn_overlaydim').setStyle({ 'width' : overlay_width + 'px', 'height' : overlay_height + 'px' }); 
		
		},
		
		'center' : function(divid) {
		
			var scrollOffset = 	this.getsoffset();
			var divWidth = $(divid).getWidth();
			var divHeight = $(divid).getHeight();
			var vpHeight =  document.viewport.getHeight();
			var vpWidth =  document.viewport.getWidth();
			var htmlHeight = Math.max(
					document.documentElement["clientHeight"],
					document.body["scrollHeight"],
					document.documentElement["scrollHeight"],
					document.body["offsetHeight"],
					document.documentElement["offsetHeight"]
			);
			var htmlWidth = Math.max(
					document.documentElement["clientWidth"],
					document.body["scrollWidth"],
					document.documentElement["scrollWidth"],
					document.body["offsetWidth"],
					document.documentElement["offsetWidth"]
			);

			var scrollOffsetY = scrollOffset[1];
			var divLeft = Math.floor((vpWidth / 2) - (divWidth / 2));
			
			//middle of viewport is going to be offsetX + vpHeight - (divHeight / 2);
			var divTop = Math.floor((scrollOffsetY + (vpHeight / 2)) - (divHeight / 2));
			//test if it is being set off the page
			if((divTop + divHeight) > htmlHeight){
				divTop = ((htmlHeight - divHeight) - 100);
			}
		
			//pushed off top or off left?
			divTop = (divTop <= 110) ? 110 : divTop;
			divLeft = (divTop <= 9) ? 10 : divLeft;
			$(divid).style.top = divTop + 'px';
			$(divid).style.left = divLeft + 'px';
		
		},
		
		
		'getsoffset' : function() {
		
			var scrOfX = 0, scrOfY = 0;
			if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
				scrOfY = window.pageYOffset;
			    scrOfX = window.pageXOffset;
			}
			else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
  				//DOM compliant
			    scrOfY = document.body.scrollTop;
			    scrOfX = document.body.scrollLeft;
		  	}
		  	else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		  		//IE6 standards compliant mode
			    scrOfY = document.documentElement.scrollTop;
			    scrOfX = document.documentElement.scrollLeft;
  			}
			
			return [ scrOfX, scrOfY ];

		},
		
		
		'close' : function(e_id) {
		
			//clear content div
			$('cnn_overlaycntnt').update();
			
			//hide dimmer
			this.setDim(0);
			
		},
		
		//launch and pop 1st queue item if available
		'checkQ' : function() {
		
			var t_obj = CNNO.prototype.Page.urlNameVals();
			if(t_obj.cnnqueue) {
			
				var t_arr = t_obj.cnnqueue.split('_');
				
				//populate queue with remaining items
				var t_qitem = t_arr.shift();
				
				//in the future, will we need queues or more than 1? Right now it's messing up the register thank you hack
				//this.queue = t_arr;
				
				//launch 1st queued item
				this.load(t_qitem, 'auto');
								
			}
			
		},
		
		//overlay file data for keys
		'data' : {
	
			'newsletters' : {
			
				'j_loaded' : 0,
				'h_loaded' : 0,
				'js' : null,
				'html' : null
			
			}
	
		},
	
		//overlay key data
		'keys' : {
		
			//define dev friendly name and filename keys for json and html files
			'news-am' : { 'ref_name' : 'American Morning', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
			'news-prime' : { 'ref_name' : 'Prime News', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
			'news-pol' : { 'ref_name' : 'Politics Alerts', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
			'news-breaking' : { 'ref_name' : 'Breaking News Alert', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-intl-amanpour' : { 'ref_name:' : 'Amanpour', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-member_services' :{ 'ref_name' : 'Marketing', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-cnn-bia' :{ 'ref_name' : 'Black in America', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-intl-htmlasiaheadlines' :{ 'ref_name' : 'CNN Asia editorial note', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-intl-htmleuheadlines' :{ 'ref_name' : 'CNN Europe editorial note', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-heroes' :{ 'ref_name' : 'CNN Heroes', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-intl-htmltravel' :{ 'ref_name' : 'CNN Partner Hotel specials', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-health' :{ 'ref_name' : 'Health News', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-intl-insideafrica' :{ 'ref_name' : 'Inside Africa', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-larryking' :{ 'ref_name' : 'Larry King Live', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-cnn-loudobbs' :{ 'ref_name' : 'Lou Dobbs Tonight', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-cnn-rcshow' :{ 'ref_name' : 'Morning Express', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-morninggrind' :{ 'ref_name' : 'Political Ticker - weekday edition', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-sundaysotu' :{ 'ref_name' : 'Political Ticker - Sunday, State of the Union edition', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },		
        	'news-cnn-showbiz' :{ 'ref_name' : 'Showbiz Tonight', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-cnn-situationroom' :{ 'ref_name' : 'Situation Room', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-cnn-computing' :{ 'ref_name' : 'Tech News', 'j_file' : 'newsletters', 'h_file' : 'newsletters'},
        	'news-cnn-dailytop10' :{ 'ref_name' : 'Todays Top Video', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },		
        	'news-cnn-primetime' :{ 'ref_name' : 'Tonight on CNN', 'j_file' : 'newsletters', 'h_file' : 'newsletters' },
        	'news-intl-vitalsigns' :{ 'ref_name' : 'Vital Signs', 'j_file' : 'newsletters', 'h_file' : 'newsletters' }

		},		
		
		'qOverlay' : function(overlay_key) {
	
			//check for duplicates
			
			this.queue.push(overlay_key);	
			
		},
	
		'clearQ' : function() {
			
			this.queue = [];
			
		},
		
		'qRefresh' : function() {
		
			//build string
			var q_str = this.queue.join('_');
			
			//trigger refresh
			CNNO.prototype.Page.refresh({ 'cnnqueue' : q_str });
		
		},
		
		'callback' : function(type, overlay_key) {
		
			if(type == 'json') { this.data[this.keys[overlay_key].j_file].j_loaded = 1; }
			if(type == 'html') { this.data[this.keys[overlay_key].h_file].h_loaded = 1; }
			
			//test to see if json and html loaded
			if(this.data[this.keys[overlay_key].j_file].j_loaded && this.data[this.keys[overlay_key].h_file].h_loaded) {

				this.data[this.keys[overlay_key].j_file].js.init();

			}
		
		},
		
		'callbackCSI' : function(obj) {
		
			CNNO.prototype.Overlay.data[obj.key].html = obj;
			CNNO.prototype.Overlay.callback('html', CNNO.prototype.Overlay.active);
			
		},
		
		'callbackJSON' : function(obj) {
		
			this.data[obj.key].js = obj;
			this.callback('json', CNNO.prototype.Overlay.active);
		
		},
		
		'init' : function() {
		
			//check for existance replacement key object and update default set of keys
			
			Event.observe(document, 'dom:loaded', function() {
			
				//append overlay content div
				var t_ele = document.createElement('div');
				t_ele.id = 'cnn_overlaycntnt';
				$$('body')[0].appendChild(t_ele);
			
			});
		
			//check for q string
			CNNO.prototype.Overlay.checkQ();

		},
		
		'load' : function(overlay_key, mode) {
	
			if(typeof(mode) == "undefined") { mode = 'manual'; }
			
			this.active = overlay_key;
			
			if(mode == 'auto') {

					//get it ready for the msib load
					this.t_q = overlay_key;
			
			}
			else {
			
				//show loading html
				this.setDim(1);
				$('cnn_overlaycntnt').update('<div id="cnn_overlay_load" class="cnn_overlaybox cnn_overlayloading"><p align="center"><img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/loading.gif">loading</p></div>');
			CNNO.prototype.Overlay.center('cnn_overlay_load');
			
			//	this.active = overlay_key;
			

				//load necessary "libs" which will trigger overlay when done
				CNNO.prototype.Overlay.loadJSONP(overlay_key);
				CNNO.prototype.Overlay.loadHCSI(overlay_key);
				
			}
			
		},
		
		'triggerQ' : function() {
		
			if(CNNO.prototype.Overlay.t_q) {

				//show loading html
				CNNO.prototype.Overlay.setDim(1);
				$('cnn_overlaycntnt').update('<div id="cnn_overlay_load" class="cnn_overlaybox cnn_overlayloading"><p align="center"><img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/loading.gif">loading</p></div>');
				CNNO.prototype.Overlay.center('cnn_overlay_load');
			
				//CNNO.prototype.Overlay.active = overlay_key;


				CNNO.prototype.Overlay.loadJSONP(CNNO.prototype.Overlay.t_q);
				CNNO.prototype.Overlay.loadHCSI(CNNO.prototype.Overlay.t_q);
			}
			
		},		
		
		'loadJSONP' : function(overlay_key) {
		
			//add a check for maximum key str length
			
			
			if(!this.data[this.keys[overlay_key].j_file].j_loaded) {
			
				var head = $$('head')[0];
				var s = document.createElement('script');
				s.setAttribute('src', 'http://www.cnn.com/.element/js/3.0/overlay/data/js/' + this.keys[overlay_key].j_file + '.js');
				s.setAttribute('type', 'text/javascript');
				head.appendChild(s);
				
			}
			else { this.callback('json', overlay_key); }
			
		},
		
		'loadHCSI' : function(overlay_key) {
		
			//add a check for maximum key str length
			
			
			if(!this.data[this.keys[overlay_key].h_file].h_loaded) {
			
				CSIManager.getInstance().call('http://www.cnn.com/.element/js/3.0/overlay/data/html/' + this.keys[overlay_key].j_file + '.html', '', '', CNNO.prototype.Overlay.callbackCSI)
				
			}
			else { this.callback('html', overlay_key); }
			
		},
		
		'update' : function(o_key, h_key) {
		
			$('cnn_overlaycntnt').update(CNNO.prototype.Overlay.data[CNNO.prototype.Overlay.keys[o_key].j_file].html.data[h_key]);
			CNNO.prototype.Overlay.center('cnn_overlay_' + CNNO.prototype.Overlay.keys[o_key].j_file);
			
			//run functions needed to prep overlay html if available
			CNNO.prototype.Overlay.data[CNNO.prototype.Overlay.keys[o_key].j_file].js.html_prep(h_key);
			
		}		
		
	}

});

if ('undefined' === typeof (window.CNN)) { var CNN = {}; }

//initialize visitor
function init_CNNO(){
	var CNN = new CNNO();
	window["CNN"]= Object.extend(CNN,window["CNN"]||{});
}
init_CNNO();

//called once msib "objects" have loaded
function cnn_memfbini() {
	
	if(!CNN.Profile.is_loaded) {
	
		if(typeof(cnn_onMemFBinit) === "function") { cnn_onMemFBinit(); }
		
		//set that msib has loaded
		CNN.Profile.is_loaded = 1;
	
		//had to wait on msib stuff to launch queued overlay
		CNN.Overlay.triggerQ();
	
	}
	
}


//new key obj for ireport  / blogs html skinning... point to different filenames... or maybe check within init function to see if key object is defined somewhere?
CNN.Overlay.init();

