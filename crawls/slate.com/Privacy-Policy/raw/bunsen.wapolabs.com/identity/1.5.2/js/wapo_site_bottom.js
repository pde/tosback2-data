// WapoLabs client footer scripts
if(!document.getElementById('fb-root')){
    document.write('<div id="fb-root"></div>');
}

window.fbAsyncInit = function() {
    var fbInitOpts = {
        appId: wapoEnv.fb_app_id,
        status: true,
        cookie: true,
        xfbml: wapoEnv.init_xfbml 
    };
    if(typeof wapoEnv.fb_xd_receiver !== 'undefined'){
        fbInitOpts['channelUrl'] = wapoEnv.fb_xd_receiver;
    }
    
    FB.init(fbInitOpts);
    
    /* All the events registered */
    FB.Event.subscribe('auth.login', function(response) {
        // do something with response
        if(typeof fbLoginCallback !== 'undefined'){
            fbLoginCallback();
        }
    });
    
    FB.Event.subscribe('auth.logout', function(response) {
        // do something with response
        if(typeof fbLogoutCallback !== 'undefined'){
            fbLogoutCallback();
        }
    });
    
    FB.Event.subscribe('edge.create', function(response) {
        // do something with response
    });
      
    FB.getLoginStatus(function(response) {
        if (response.session) {
            // logged in and connected user, someone you know
            if(typeof fbLoginCallback !== 'undefined'){
                fbLoginCallback();
            }
        } else {
            if(typeof fbLogoutCallback !== 'undefined'){
                fbLogoutCallback();
            }
        }
    });
    
    if(typeof(wapoVisitor) != 'undefined'){
        wapoVisitor.loginFacebook();
    }
    $wpjQ(document).trigger(wapoEnv.event_name_fb_async_init);
};

(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
})();
