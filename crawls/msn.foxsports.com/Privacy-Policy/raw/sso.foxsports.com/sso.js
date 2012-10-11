/*
 * Copyright (c) 2010, Janrain, Inc. All rights reserved.
 */

(function (WIN) {

    if ((typeof WIN.JANRAIN !== "undefined") && WIN.JANRAIN.SSO) {
        return; // already loaded
    }

    JANRAIN = {};
    JANRAIN.SSO = {};
    JANRAIN.SSO.CAPTURE = {};
    JANRAIN.SSO.ENGAGE = {};

    var token_uri;
    var sso_server;
    var redirect_uri;
    var xd_receiver;
    var logout_uri;
    var client_id;
    var response_type;
    var logout_callback;

    JANRAIN.SSO.log =  function(msg) {
        if (window.console && window.console.log) {
            console.log("SSO: " + msg);
        }
    }
    
    JANRAIN.SSO.warn = function(msg) {
        if (window.console && window.console.warn) {
            console.warn("SSO WARNING: " + msg)
        }
    }
    
    JANRAIN.SSO.error = function(msg) {
        if (window.console && window.console.error) {
            console.error("SSO ERROR: " + msg);
        }
    }
    
    /**
     * Log the user out of all Capture SSO sites that they have visited,
     * then (optionally) redirect the user to a destination page.
     *
     * @param urls	An object with 'sso_server' and 'redirect' properties:
     * 				 sso_server: The fully qualified URL of the SSO server
     * 				 logout_uri: (optional) The fully qualified URL that the user should be
     * 				 redirected to after logout
     * 				 callback: (optional) function to be called instead of redirecting to logout_uri
     *
     */
    JANRAIN.SSO.CAPTURE.logout = function(urls, callback) {
        JANRAIN.SSO.logout(urls, callback);
    }

    /**
     * Log the user out of all Engage SSO sites that they have visited,
     * then (optionally) redirect the user to a destination page.
     *
     * @param urls	An object with 'sso_server' and 'redirect' properties:
     * 				 sso_server: The fully qualified URL of the SSO server
     * 				 logout_uri: (optional) The fully qualified URL that the user should be
     * 				 redirected to after logout
     * 				 callback: (optional) function to be called instead of redirecting to logout_uri
     */
    JANRAIN.SSO.ENGAGE.logout = function(urls, callback) {
        JANRAIN.SSO.logout(urls, callback);
    }

    /**
     * Clear SSO state of all previously visited SSO sites, so that when the user
     * returns to those sites they will be re-logged in. This is used when the user's
     * profile data has been updated and needs to be passed to the other sites again.
     *
     * @param ssoServerUrl	The URL of the SSO server
     */
    JANRAIN.SSO.CAPTURE.refresh = function(ssoServerUrl) {
        JANRAIN.SSO.refresh(ssoServerUrl);
    }

    /**
     * Clear SSO state of all previously visited SSO sites, so that when the user
     * returns to those sites they will be re-logged in. This is used when the user's
     * profile data has been updated and needs to be passed to the other sites again.
     *
     * @param ssoServerUrl	The URL of the SSO server
     */
    JANRAIN.SSO.ENGAGE.refresh = function(ssoServerUrl) {
        JANRAIN.SSO.refresh(ssoServerUrl);
    }

    /**
     * For some implementations, a Capture access token may
     * expire before the SSO session does.  Calling this function
     * will return a new access token, if a valid SSO session still exists.
     */

    JANRAIN.SSO.CAPTURE.refresh_token = function(callback) {
        if (typeof sso_server === 'undefined' || typeof redirect_uri === 'undefined') {
            // check_login must be called before calling this function
            return;
        }
        // make call to sso server
        var script = document.createElement("script");
        script.src = sso_server + "/capture/v1/refresh_token?"
            + "v=" + new Date().getTime()
            + "&redirect_uri=" + encodeURIComponent(redirect_uri)
            + "&callback=" + encodeURIComponent(callback)
            + "&client_id=" + encodeURIComponent(client_id)
            + "&xdreceiver_uri=" + encodeURIComponent(xd_receiver)
            + "&redirect_uri=" + encodeURIComponent(redirect_uri)
            + "&logout_uri=" + encodeURIComponent(logout_uri)
            + "&origin=" + encodeURIComponent(document.location.protocol + "//" + document.location.host + document.location.pathname)

        script.type = "text/javascript";

        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);

    }

    /**
     * Capture login has succeeded.  Establish SSO session
     * @param config An object containing configuration properties
     *  code: Capture code reference
     *  transaction_id: String
     *  login_callback: capture widget api function name
     *
     */
    JANRAIN.SSO.CAPTURE.set_login = function(config) {
        if (typeof sso_server === 'undefined' || typeof redirect_uri === 'undefined') {
            // check_login must be called before calling this function
            return;
        }

        var script = document.createElement("script");
        script.src = sso_server + "/capture/v1/set_login?"
            + "v=" + new Date().getTime()
            + "&redirect_uri=" + encodeURIComponent(redirect_uri)
            + "&code=" + encodeURIComponent(config.code)
            + "&login_callback=" + encodeURIComponent(config.login_callback)
            + "&transaction_id=" + encodeURIComponent(config.transaction_id)

        script.type = "text/javascript";

        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);

    }

    /**
     * Initiate Capture auto-login if a session exists
     *
     * @param config	An object containing the SSO configuration properties
     *  sso_server: The fully qualified URL of the SSO server',
     * 	redirect_uri: The fully qualified URL of the Capture redirect URI for this site,
     *  client_id: The Capture client id making the request,
     *  xd_receiver: The fully qualified URl of the cross-domain receiver for this site,
     * 	logout_uri: (Optional) The fully qualified URL of the logout page for this site,
     * 	bp_channel: (Optional) The backplane channel id
     * 	response_type: (Optional) 'code' or 'token', defaults to 'code'
     * 	response_method: (Optional) 'jsonp' or 'redirect', defaults to 'redirect'
     * 	transaction_id: (Optional) string
     *  widget_parameters: (Optional) json object
     * 	nologin_callback: (Optional) capture widget api method name
     *
     */
    JANRAIN.SSO.CAPTURE.check_login = function(config) {

        sso_server = sso_server || config.sso_server;
        redirect_uri = redirect_uri || config.redirect_uri;
        xd_receiver = xd_receiver || config.xd_receiver;
        logout_uri = logout_uri || config.logout_uri;
        client_id = client_id || config.client_id;
        response_type = response_type || config.response_type;

        var checked = "janrain_sso_checked_" + getPath(config.xd_receiver);
        var pattern=new RegExp(checked);

        if (WIN.document.cookie.search(pattern) === -1) {

            config.response_type = config.response_type || "code";
            config.response_method = config.response_method || "redirect";
            config.refresh = config.refresh || false;

            if (config.logout_uri === undefined) { config.logout_uri = ""; }
            if (config.bp_uri === undefined) { config.bp_uri = ""; }

            var script = document.createElement("script");
            script.src = sso_server + "/capture/v1/sso_check.js?"
                + "v=" + new Date().getTime()
                + "&xd_receiver=" + encodeURIComponent(xd_receiver)
                + "&origin=" + encodeURIComponent(document.location.protocol + "//" + document.location.host + document.location.pathname)
                + "&logout_uri=" + encodeURIComponent(logout_uri)
                + "&redirect_uri=" + encodeURIComponent(redirect_uri)
                + "&client_id=" + encodeURIComponent(client_id)
                + "&bp_channel=" + encodeURIComponent(config.bp_channel)
                + "&response_type=" + encodeURIComponent(response_type)
                + "&response_method=" + encodeURIComponent(config.response_method)
                + "&widget_parameters=" + encodeURIComponent(config.widget_parameters)
                + "&nologin_callback=" + encodeURIComponent(config.nologin_callback)
                + "&transaction_id=" + encodeURIComponent(config.transaction_id)
                + "&refresh=" + config.refresh;

            script.type = "text/javascript";

            var firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        } else {
            if (typeof janrain !== "undefined" && janrain.capture && janrain.capture.ui &&
                typeof janrain.capture.ui[config.nologin_callback] === "function") {
                janrain.capture.ui[config.nologin_callback]({
                    transactionId: config.transaction_id,
                    result: "already checked"
                });
            }
        }
    }

    function getPath(url) {
        var a =  document.createElement('a');
        a.href = url;
        return a.pathname.replace(/\//g,"_");
    }

    /**
     * Initiate Engage auto-login if a session exists
     *
     * @param config	An object containing the SSO configuration properties
     * 					  sso_server: The fully qualified URL of the SSO server',
     * 					  xd_receiver: The fully qualified URl of the cross-domain receiver for this site,
     * 					  token_uri: (Engage Only) The fully qualified URL of the token url for this site,
     * 					  logout_uri: (Optional) The fully qualified URL of the logout page for this site,
     * 					  bp_channel: (Optional) The backplane channel id
     */
    JANRAIN.SSO.ENGAGE.check_login = function(config) {

        var checked = "janrain_sso_checked_" + getPath(config.xd_receiver);
        var pattern=new RegExp(checked);

        if (WIN.document.cookie.search(pattern) === -1) {

            token_uri = config.token_uri;

            if (config.logout_uri === undefined) { config.logout_uri = ""; }
            if (config.bp_uri === undefined) { config.bp_uri = ""; }
            if (config.xd_receiver === undefined) { 
            	JANRAIN.SSO.error("configuration value xd_receiver undefined");
            } else {

		        var script = document.createElement("script");
		        script.src = config.sso_server + "/session/sso_check.js?"
		            + "v=" + new Date().getTime()
		            + "&xdcomm_uri=" + encodeURIComponent(config.xd_receiver)
		            + "&bp_channel=" + encodeURIComponent(config.bp_channel)
		            + "&logout_uri=" + encodeURIComponent(config.logout_uri);
		
		        script.type = "text/javascript";
		
		        var firstScript = document.getElementsByTagName("script")[0];
		        firstScript.parentNode.insertBefore(script, firstScript);
            }

        }
    }


    /**
     * Post the Engage token to the token URL
     */
    JANRAIN.SSO.ENGAGE.post_token = function(token) {
        var janrain_sso_tokenForm = WIN.document.createElement("form");
        var janrain_sso_formElement = WIN.document.createElement("input");
        janrain_sso_formElement.name = "token";
        janrain_sso_formElement.id = "token";
        janrain_sso_formElement.type = "hidden";
        janrain_sso_formElement.value = token;
        janrain_sso_tokenForm.appendChild(janrain_sso_formElement);
        janrain_sso_tokenForm.method = "POST";
        if (token_uri.search(/\?/) != -1) {
            janrain_sso_tokenForm.action= token_uri + "&token=" + token;
        }
        else {
            janrain_sso_tokenForm.action= token_uri + "?token=" + token;
        }
        WIN.parent.document.getElementsByTagName('head')[0].appendChild(janrain_sso_tokenForm);
        janrain_sso_tokenForm.submit();
    }


    /**
     * Logout of SSO
     *
     * @param urls	An object with 'sso_server' and 'redirect' properties:
     * 				 sso_server: The fully qualified URL of the SSO server
     * 				 logout_uri: (optional) The fully qualified URL that the user should be redirected to after logout
     * 				 callback: (optional) function to be called instead of redirecting to logout_uri
     */
    JANRAIN.SSO.logout = function(urls, callback) {

        JANRAIN.SSO._deleteChecked();
        if (typeof callback !== "undefined" && typeof callback === "function") {
            logout_callback = callback;
        }

        if (typeof urls.sso_server === "undefined") {
            return; // Invalid argument
        }

        var scriptTag = WIN.document.createElement("script");
        scriptTag.setAttribute("src", urls.sso_server + "/session/logout.js?logout_uri=" + encodeURIComponent(urls.logout_uri));
        document.getElementsByTagName('body')[0].appendChild(scriptTag);

    }

    JANRAIN.SSO._deleteChecked = function () {
        var allCookies = WIN.document.cookie.split(';');

        for (var i = 0; i < allCookies.length; i++) {
            if (allCookies[i].search(/janrain_sso_checked/) > -1) {
                WIN.document.cookie = allCookies[i] + "=;expires=" + (new Date()).toGMTString() + ";path=/;";
                if (window.console && window.console.log) {
                    console.log("sso removed cookie " + allCookies[i]);
                }
            }
        }
    }

    /**
     * Clear SSO state of all previously visited SSO sites, so that when the user
     * returns to those sites they will be re-logged in. This is used when the user's
     * profile data has been updated and needs to be passed to the other sites again.
     *
     * @param ssoServerUrl	The URL of the SSO server
     */
    JANRAIN.SSO.refresh = function(ssoServerUrl) {

        if (typeof ssoServerUrl === "undefined") {
            return; // Invalid argument
        }

        var scriptTag = WIN.document.createElement("script");
        scriptTag.setAttribute("src", ssoServerUrl + "/session/refresh.js");
        document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }


    /**
     * Execute logout
     *
     * @param endpoint		The url to redirect the user to after logout
     * @param logoutUrls	An array of URLs to log the user out of other SSO enabled sites
     */
    JANRAIN.SSO._doLogout = function(endpoint, logoutUrls, callback) {

        onComplete = function() {
            if (logout_callback !== "undefined" && typeof logout_callback === "function") {
                logout_callback();
            } else if (endpoint !== "undefined") {
                WIN.document.location.href = endpoint;
            }
        }

        JANRAIN.SSO._loadUrls(logoutUrls, onComplete);
    }

    /**
     * Make one or more HTTP requests to remote sites,
     * then execute an optional callback function
     *
     * @param urls		An array of URLs to load
     * @param callback	(Optional) A reference to a function to call after the URLs have been loaded
     */
    JANRAIN.SSO._loadUrls = function(urls, callback) {

        onComplete = function() {
            if(callback !== 'undefined' && typeof callback === "function") {
                callback();
            }
        }

        if (urls != null && urls.length > 0) {

            var onloadEvents = 0;

            onFrameLoad = function() {
                ++onloadEvents;
                if (onloadEvents >= urls.length) {
                    onComplete();
                }
            }

            var loadingFrame;
            for (var i = 0; i < urls.length; i++) {

                if (WIN.document.all){
                    // Non-standard syntax to support IE
                    var parent=document.createElement('div');
                    parent.innerHTML = '<iframe onload="onFrameLoad();"></iframe>';
                    loadingFrame = parent.firstChild;
                }
                else {
                    loadingFrame = WIN.document.createElement('iframe');
                    loadingFrame.onload = onFrameLoad;
                }
                loadingFrame.setAttribute("src", decodeURIComponent(urls[i]));
                WIN.document.getElementsByTagName('head')[0].appendChild(loadingFrame);
            }
        }
        else {
            onComplete();
        }
    }

}(this));
