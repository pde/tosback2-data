function getUser() {
  // build the user request
  var request = new PluckSDK.UserRequest();

  //requesting a UserKey() with no parameter returns a User object for the current user
  // -- if the user is unauthenticated, the User object is our generic anonymous user
  request.UserKey = new PluckSDK.UserKey();

  // build the requests array and send the request
  PluckSDK.SendRequests([request], getUserCallback);
}

function getUserCallback(responses) {
  var loggedIn = false;
  var anonUser = responses[0].User.UserKey.Key;
  var dispName = responses[0].User.DisplayName;
  var personaURL = responses[0].User.PersonaUrl;
  var tempPersonaURL = personaURL.split(".com");
  personaURL = "http://www.nationalgeographic.com" + tempPersonaURL[1];

  var qString = window.location.search.substring(1);
  if (qString) {
    pathURL = pathURL + "?" + qString;
  }

  if (anonUser == "anonymous") {
    $('#ssoauth .rpxnow').show();
  } else {
    loggedIn = true;
    $('#ssoauth .rpxnow').hide();
    $('#ssoauth').prepend('<p class="welcome_msg">Hi,&nbsp;<a href="' + personaURL + '" title="Go to your profile">' + dispName + '</a></p><p class="action"><a class="logout" href="/rest/sso/rpx_logout/">Sign Out</a></p>');
  }
}

function getCommentsInfo(articleKey) {
  // build the comments request
  var request = new PluckSDK.CommentsPageRequest();
  request.CommentedOnKey = new PluckSDK.ExternalResourceKey();
  request.CommentedOnKey.Key = articleKey;

  // build the requests array and send the request
  PluckSDK.SendRequests([request], getCommentsInfoCallback);
}

function getCommentsInfoCallback(responses){
  // add the comments link in the Share sidebar with a comment count
  if(responses[0].ResponseStatus.StatusCode == PluckSDK.ResponseStatusCode.OK){
    var comments = responses[0].Items;
    var commentCount = responses[0].TotalItems;
    var sidebarCommentCount = $("#share_buttons .comments .count");
    if (sidebarCommentCount.length) {
        sidebarCommentCount.text(commentCount);
    } else {
        $('#share_buttons h3').after('<div class="pluck"><p><a href="#ng_comments" class="comments">Comments (<span class="count">' + commentCount + '</span>)</a></p></div>');
        $('.social_buttons .addthis_toolbox').before('<div class="pluck"><p><a href="#ng_comments" class="comments">(<span class="count">' + commentCount + '</span>)</a></p></div>');
    }
  }
}

// Advance the "recommend" counter when the button is clicked.  Function called in Pluck templates through "onClick" attribute.
function recCount(link){
  var button = link.parent().next('span');
  var counter = button.find('.recommend_count');

  if (counter.length > 0){
    var count = parseInt(counter.text());
    counter.html(count+1);
  } else {
    button.append('<span class="recommend_count"> (1)</span>');
  }

  return false;
}

function shareCount(){
  var countText = $('#share_buttons .comments .count').text();
  var count = parseInt(countText);
  $('#share_buttons .comments .count').text(count+1);
}

$(document).ready(function(){
    if (typeof pluckAppProxy !== "undefined"){
        pluckAppProxy.registerActivityCallback('CommentCreate', shareCount);
    }
});

$(document).ready(function(){
  if (window.location.hostname.endsWith(".com") || window.location.hostname == "localhost") {
    // add the sign in link
    var signInLink = $('<p class="action"><a class="rpxnow" style="display: none;" href="' + ssoURL + '">Sign In</a></p>');
    $("#ssoauth").prepend(signInLink);

    // load the Janrain RPX script
    var rpxScriptURL = ("https:" == document.location.protocol ? "https://": "http://static.") + "rpxnow.com/js/lib/rpx.js";
    $.getScript(rpxScriptURL, function() {
        if (typeof RPXNOW !== "undefined"){
            RPXNOW.overlay = true;
            RPXNOW.language_preference = 'en';
            RPXNOW.token_url = 'http://' + baseURL + '/rest/sso/rpx_response/?next=' + pathURL + '';
            RPXNOW.realm = rpxNowRealm;
        }
    });

    // obtain the user
    getUser();

    // get comments info if there is an articleKey
    if (typeof(articleKey) != 'undefined') {
      getCommentsInfo(articleKey);
    }
  } else {
    // hide pluck comments
    $("#ng_comments").hide();
  }
});
