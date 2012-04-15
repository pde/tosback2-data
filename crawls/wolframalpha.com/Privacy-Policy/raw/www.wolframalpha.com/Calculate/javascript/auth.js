
/*****
	AUTH-RELATED JS
	auth-related methods shared with non-results pages
*****/

// this should move to utilities.js
function scrollPositionY() {
  var scrolly;
  // diff methods of getting scroll-y on diff pages
  if (typeof getScrollPosition != "undefined") scrolly = getScrollPosition().y;
  else if (typeof getScrollY != "undefined") scrolly = getScrollY();
  else scrolly = 0;
  return scrolly;
}

function getAuthboxMarkup(){
  var authboxMarkup = ' \
  <div id="authbox"> \
    <div class="arrow"></div> \
    <div id="authbox-top"> \
      <a href="/" class="authbox-sectionlink first">Wolfram|Alpha</a> \
      <a id="auth-favorites" href="/my/queries/favorites.jsp" class="authbox-sublink first">Favorites</a> \
      <a id="auth-history" href="/my/queries/history.jsp" class="authbox-sublink">History</a> \
      <a class="authbox-sublink disabled">Data</a> \
      <a id="auth-preferences" href="/my/preferences/general.jsp" class="authbox-sublink">Preferences</a> \
      <a class="authbox-sublink disabled">Account</a> \
      <a class="authbox-sectionlink">My Widgets</a> \
      <a class="authbox-sectionlink">My Apps (API)</a> \
    </div> \
    <div id="authbox-signout"> \
      <a href="/input/signout.jsp">Sign out</a> \
    </div> \
  </div> \
  ';
  return authboxMarkup;
}

function showSignupTab() {
  $("#authform-signup").show();
  $("#authform-signin").hide();
}
function showSigninTab() {
  $("#authform-signin").show();
  $("#authform-signup").hide();
}

function showSignupForm(cb1, cb2) {
  var signuplink = "/input/signup.jsp";
  if ($("#auth-popup").length == 0) {
    $("body").append("<div id='auth-popup' class='lightbox lightbox-shadows'></div>");
    var authpop = $("#auth-popup");
    authpop.hide();
    $.get(signuplink, {"f":"lb","redirect":"json"}, function(d,s){
      authpop.html("<a href='#' class='close'>X</a>" + d);
      showSignupForm_internal(cb1, cb2);
    });
  } else showSignupForm_internal(cb1, cb2);
}

function showSignupForm_internal(cb1, cb2){
    var authpop = $("#auth-popup");
    if (typeof hideCDFContent != "undefined") hideCDFContent();
    $("#lightboxOverlay").show();

    var scrolly = scrollPositionY();
    var posy    = scrolly + ($(window).height() / 2); 
    //authpop.find("#authform-signintab").click();
    authpop.css({ "top": (posy > 210 ? posy : 210) });

    showSignupTab();
    if (!($.browser.msie && $.browser.version.substring(0,2) < 9))
      authpop.fadeIn();
    else authpop.show();

    // signin event: a little hack to pass callback to popup
    $("#signup-form").die("signup.remove").live("signup.remove",function(e){
      $("#auth-popup").remove();
      $("#lightboxOverlay").fadeOut();
    });
    $("#signin-form").die("signin.remove").live("signin.remove",function(e){
      $("#auth-popup").remove();
      $("#lightboxOverlay").fadeOut();
    });

    if (typeof cb1 == "function") {
      $("#signin-form").unbind("signin.callback");
      $("#signin-form").bind("signin.callback",function(e){alert('signin');
        cb1();
      });
    } else if (typeof cb1 == "string") {
      $("#signin-form").bind("signin.callback",function(e){
        window.location.href = "http://www.wolframalpha.com/"+cb1;
      });
    } else {
      $("#signin-form").bind("signin.callback",function(e){
        window.location.href = window.location.href;
      });
    }


    if (typeof cb2 == "function") {
      $("#signup-form").unbind("signup.callback");
      $("#signup-form").bind("signup.callback",function(e){alert('signup');
        cb2();
      });
    } else if (typeof cb2 == "string") {
      $("#signup-form").bind("signup.callback",function(e){
        window.location.href = "http://www.wolframalpha.com/"+cb2;
      });
    } else {
      $("#signup-form").bind("signup.callback",function(e){
        window.location.href = window.location.href;
      });
    }
}


/**
	SHOW LOGIN FORM

	* cb is the callback for after signin success
	  - it can either be a relative URL or a function
	  - if cb is a string and equal to "refresh", do refresh --- BROKEN
	  - if cb is empty, refresh --- probably temporary
**/

function showLoginForm(cb) {
  var signinlink = "/input/signin.jsp";
  if ($("#auth-popup").length == 0) {
    $("body").append("<div id='auth-popup' class='lightbox lightbox-shadows'></div>");
    var authpop = $("#auth-popup");
    authpop.hide();
    $.get(signinlink, {"f":"lb","redirect":"json"}, function(d,s){
      authpop.html("<a href='#' class='close'>X</a>" + d);
      showLoginForm_internal(cb);
    });
  } else showLoginForm_internal(cb);
}

function scrollPositionY() {
  var scrolly;

  // diff methods of getting scroll-y on diff pages
  if (typeof getScrollPosition != "undefined") scrolly = getScrollPosition().y;
  else if (typeof getScrollY != "undefined") scrolly = getScrollY();
  else scrolly = 0;
  return scrolly;
}

function showLoginForm_internal(cb){
    var authpop = $("#auth-popup");
    if (typeof hideCDFContent != "undefined") hideCDFContent();
    $("#lightboxOverlay").show();

    var scrolly = scrollPositionY();
    var posy    = scrolly + ($(window).height() / 2); 
    authpop.find("#authform-signintab").click();
    authpop.css({ "top": (posy > 210 ? posy : 210) });

    showSigninTab();
    if (!($.browser.msie && $.browser.version.substring(0,2) < 9))
      authpop.fadeIn();
    else authpop.show();

    // signin event: a little hack to pass callback to popup
    $("#signin-form").die("signin.remove").live("signin.remove",function(e){
      $("#auth-popup").remove();
      $("#lightboxOverlay").fadeOut();
    });

    if (typeof cb == "function") {
      $("#signin-form").unbind("signin.callback");
      $("#signin-form").bind("signin.callback",function(e){alert('signin');
        cb();
      });
    } else if (typeof cb == "string") {
      $("#signin-form").bind("signin.callback",function(e){
        window.location.href = "http://www.wolframalpha.com/"+cb;
      });
    } else {
      $("#signin-form").bind("signin.callback",function(e){
        window.location.href = window.location.href;
      });
    }
}


/***
	FETCH AUTH STATUS
	- syntax: 
	  fetchAuthStatus( [handlerFn] ); 	  
	  fetchAuthStatus( [signedOutHandlerFn] , [signedInHandlerFn] );
          // arg will be the json obj returned from authjson.jsp
***/
function fetchAuthStatus(cb, cb2){
  if (typeof cb2 != "undefined") {
    fetchAuthJSON(function(dobj){
      if (typeof dobj.auth == "undefined" || dobj.auth != "true")
        cb(dobj);
      else 
        cb2(dobj);
    });
  } else {
    fetchAuthJSON(function(dobj){
      cb(dobj);
    });
  }
}
function fetchAuthJSON(cb){
  $.get("/input/authjson.jsp", {}, function(d,s){
    var dobj = $.parseJSON(d);
    cb(dobj);
  });
}


/***	
	SIGN OUT
	- need one with callback fn
***/
/*function silentSignout(url) {
  if (typeof url == "undefined") url = window.location.href;
  $.get("/input/signout.jsp", {}, function(d,s){
    if (s == "success") window.location.href = url;
  });
}*/


/*** 
	USER OBJECT
	- User is the class
	- user is the object
***/
var User = (function () {
  var permissions = {};
  function User(userPerms) {
    for (var i in userPerms) { 
      permissions[i] = userPerms[i]; 
    };
  }
  User.prototype.getPermissions = function() {
    return permissions;
  };
  User.prototype.isEnabled = function(feature) {
    return permissions[feature];
  };
  return User;
})();


/***
	FEATURE POPUPS 
***/
function hideFeaturePopup(showShadow) {
  var fpop = $("#feature-popup");
  fpop.fadeOut();

  if (fpop.hasClass("remove"))
    fpop.parents(".lightbox").remove();
  if (!showShadow)
    $("#greyOverlay, #lightboxOverlay").fadeOut();
  showCDFContent();
}
function getFeaturePopup(feature) {
  var box = '/input/podaction.jsp';
  var fpop = $("#feature-popup");
  $.cookie("wa_trial_redirect", encodeURIComponent(window.location.href), {domain: '.wolframalpha.com', path: '/'});
  $.get(box, function(d, s) {
    fpop.html("<a href='#' class='close'>X</a>" + d);
    fpop.hide();
    displayPopup(feature);
  });
}
function displayPopup(feature) {
  $("#lightboxOverlay").show();
  $("#feature-popup .feature").hide();
  $("#feature-popup .feature-" + feature).show();
  if (user.isEnabled('trialeligible')) {
    $("#fe-popup-bot #trialbtn").hide();
    $("#fe-popup-bot #starttrialbtn").show();
  } else if (user.isEnabled('needsupgrade')) {
    $("#fe-popup-bot #trialbtn").hide();
    $("#fe-popup-bot #notrialbtn").show();
  }
  $("#feature-popup").fadeIn();
}
function showFeaturePopup(feature) {
  if ($("#feature-popup").length === 0) {
    $("body").append("<div id='feature-popup' class='lightbox lightbox-shadows'></div>");
    getFeaturePopup(feature);
  }
  else displayPopup(feature);

  $("a.button_signin")
    .die('click')
    .live("click", function() {
      hideFeaturePopup(true);
      showLoginForm();
  });

  $("a.nothanks").die("click").live("click", function() {
    hideFeaturePopup();
  });

  var scrolly = scrollPositionY();
  var posy    = scrolly + ($(window).height()/2);
  $("#feature-popup").css({ "top": (posy > 210 ? posy : 210) });
}

