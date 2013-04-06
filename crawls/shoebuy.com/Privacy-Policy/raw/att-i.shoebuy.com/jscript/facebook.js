/*
 * Facebook Javascript
 * 
 */

var _fb_regex;

function getFacebookRegex() {
    if(_fb_regex) {
      return _fb_regex;
    } else {
      return _fb_regex = /facebook.com\/[^\?]*\?.*u=(.*(fb_ref|fb_source))+/;
    }
}

function checkFacebookParameters(url) {
    if(!url && !document.referrer)
	return false;
    if(!url)
      url = document.referrer;
    var fb_regex = getFacebookRegex();
    return url.match(fb_regex);
}

function createFacebookTrackingCookies(url) {
    if(!url && !document.referrer)
	return false;
    if(!url)
      url = document.referrer;
    var fb_match = checkFacebookParameters(url);
    if(fb_match) {
      var ref_params = url.split('?')[1].split('&');
      for(var x=0; x<ref_params.length; x++) {
	var ref_values = ref_params[x].split('=');
	if('u' != ref_values[0])
	  continue;
	var params = unescape(ref_values[1]).split('?')[1].split('&');
	for(var i=0; i<params.length; i++) {
	  var values = params[i].split('=');
	  if('fb_ref' == values[0])
	    document.cookie = 'ShoebuyEntry'+"="+values[1]+"; path=/";
	  if('fb_source' == values[0])
	    document.cookie = 'fb_source'+"="+values[1]+"; path=/";
	}
	break;
      }
    }
}

function loadFacebookScriptFrameworkAsync(options) {
  window.fbAsyncInit = function() {
    var init_args = {};
    if(options.appId) {
		init_args.appId = options.appId;
	}
	if(options.xfbml) {
		init_args.xfbml = options.xfbml;
	}
    if(options.channelUrl) {
     init_args.channelUrl = document.location.protocol + '//' + options.channelUrl; 
    }
    FB.init(init_args);
    if(options.like_click) {
     FB.Event.subscribe('edge.create', options.like_click);
    }
  };
  (function() {
    var e = document.createElement('script'); e.async = true;
    var fb_js_url = '//connect.facebook.net/en_US/all.js';
    if(options.testMode) {
      fb_js_url = '//static.ak.fbcdn.net/connect/en_US/core.debug.js';
    }
    e.src = document.location.protocol + fb_js_url;
    document.getElementById('fb-root').appendChild(e);
  }());
}

function facebook_share_purchase_prompt (fb_post_data) {
  var fb_post = { method : 'feed' };
  if(fb_post_data.purchases && fb_post_data.purchases.length > 1) {
    fb_post.picture = fb_post_data.site_logo;
    fb_post.name = fb_post_data.site_name;
    fb_post.link = fb_post_data.site_url;
    fb_post.caption = fb_post_data.site_caption;
    fb_post.properties = fb_post_data.purchases;
  } else {
    fb_post.picture = fb_post_data.purchases[0].image;
    fb_post.description = fb_post_data.purchases[0].desc;
    fb_post.name = fb_post_data.purchases[0].text;
    fb_post.link = fb_post_data.purchases[0].href;
  }
  fb_post.message = fb_post_data.message;
  FB.ui(fb_post);
}

function fb_share_feedback_prompt(success_callback, failure_callback) {
  FB.login(function(response) {
    if(response.session) {
      if(response.perms) {
	if(response.perms.indexOf('offline_access') != -1 && response.perms.indexOf('publish_stream') != -1 && response.session.uid && response.session.access_token && !response.session.expires) {
	  success_callback(response.session.uid,response.session.access_token);
	} else {
	  failure_callback();
	}
      } else {
	failure_callback();
      }
    } else {
      failure_callback();
    }
  }, {perms:'publish_stream,offline_access'});
}

function fb_share_feedback(success_callback, failure_callback) {
  FB.getLoginStatus(function(response) {
    if(response.session) {
      if(response.session.access_token) {
	if(response.session.expires) {
	  fb_share_feedback_prompt(success_callback, failure_callback);
	} else {
	  success_callback(response.session.uid,response.session.access_token);
	}
      } else {
	fb_share_feedback_prompt(success_callback, failure_callback);
      }
    } else {
      fb_share_feedback_prompt(success_callback, failure_callback);
    }
  });
}
