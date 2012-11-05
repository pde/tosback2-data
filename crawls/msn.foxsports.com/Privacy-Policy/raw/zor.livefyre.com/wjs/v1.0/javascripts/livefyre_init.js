/**
 * LF initializer.
 * Runs in the following manner:
 *  1. Script has #bn and article_id, run this immediately
 *  2. Script doesn't have it (custom domain or custom js)
 *      i. Domain doesn't exist or is livefyre.com, run immediately
 *      ii. Domain is .fyre.co
 */
if (typeof(window.livefyre_init) === 'undefined') {
    var LF = (function() {
        var self = {
            CONFIG_COOKIE: 'lf_config',
            CONSOLE_PARAM: 'lf_console',
            VERSION_PARAM: 'lf_version',
            livefyreLibraryLoaded: false,
            conversation_not_ready_attempts: 0,
            
            /**
             * Set up the init params. If we call this multiple times, that means that the conversation isn't ready,
             * so we really want to pass the same params each time.
             *
             * @method initParams
             * @return {Object}: GET params to be used with the init call.
             */
            initParams: function() {
                // Create the params that will be appended to the init call
                var params = {
                    callback: 'LF.initCallback',
                    url: LF.utils.Url.encode(window.location.href.split('#')[0])
                };
                // Set up the params
                for (var x in LF.config) {
                    if (LF.config.hasOwnProperty(x)) {
                        switch (x) {
                            case 'conv_meta':
                                params[x] = LF.utils.Url.encode($jl.JSON.stringify(LF.config[x]));
                                break;
                            case 'lfprofile':
                                params[x] = $jl.JSON.stringify(LF.config[x]);
                                break;
                            case 'lftoken':
                                params[x] = LF.config[x].replace(/\+/g,"%2B");
                                break;
                            case 'site_id':
                            case 'article_id':
                            case 'allow_comments':
                            case 'conv_id':
                                params[x] = LF.config[x];
                                break;
                            case 'conversation_id':
                                LF.config.conv_id = LF.config.conversation_id;
                                delete LF.config.conversation_id;
                                params['conv_id'] = LF.config.conv_id;
                                break;
                            case 'version':
                                params['version'] = LF.config[x];
                                break;
                            default:
                                break;
                        }
                    }
                }
                if (typeof(LF.config.lfhost) !== 'undefined') {
                    params['__lfdomain__'] = LF.config.lfhost;
                }
                if (typeof(LF.config.article_id) === 'undefined' && (typeof(LF.config.domain) === 'undefined' || LF.config.domain != 'thenextweb.fyre.co')) {
                    LF.Logger.info('LF.initParams', "Livefyre Initialization: No article_id existed, so we're using the url instead.");
                    params['article_id'] = params.url;
                }
                if (typeof(LF.versions.assets) !== 'undefined') {
                    params['asset_version'] = LF.versions.assets;
                }
                self.initParams = function() {
                    return params;
                }
                return params;
            },
    
            /**
             * Set the special status of the user.
             *
             * @method setSpecial
             * @param {Object} data: The response data to use.
             */
            setSpecial: function(data) {
                if (data.conv.participant || data.conv.moderator) {
                    window.livefyre_user.special = true;
                }
            },
    
            /**
             * Get the initial information required to load the page and log the user in.
             *
             * @method init
             */
            init: function() {
                var path = LF.servers.admin +'/api/v1.1/internal/login_init.js';
                // If there is custom auth
                if (typeof(LF.config.lfhost) !== 'undefined' || (/fyre\.co$/.exec(LF.servers.domain) != null && (typeof(LF.config.custom_authentication) === 'undefined' || LF.config.custom_authentication))) {
                    path = LF.servers.bootstrap +'/api/v1.1/public/init.js';
                }
                // Load the script
                self.loadScript(path +'?'+ LF.utils.String.toParams(self.initParams()));

                //init backplane for use with LF widget
                self.initBackplane(LF.config.backplane);
            },
    
            /**
             * Handle the situation where the conversation isn't ready. We need to poll until it's ready.
             * After 30 seconds of being not ready, need to show message that we couldn't create the conversation.
             *
             * @method handleConversationNotReady
             */
            handleConversationNotReady: function() {
                // Increment the counter
                self.conversation_not_ready_attempts++;
                // If there have been more than 5 attempts, fail.
                if (self.conversation_not_ready_attempts > 4) {
                    // Show error message to user
                    LF.UserMessage.showWidgetMessage('error', 'There was an error loading the conversation.');
                    // Log it
                    LF.Logger.error('ConversationReadyFail', 'Conversation load timed out after '+ self.conversation_not_ready_attempts + ' attempts', self.initParams);
                } else {
                    // Make another conversation attempt
                    self.init();
                }
            },
    
            /**
             * Append a new link to the head.
             *
             * @method loadLink
             * @param {String} url: The url to load.
             */
            loadLink: function(url) {
                var head = document.getElementsByTagName('head')[0],
                    lastLink, i,
                    newLink = document.createElement('link'),
                    _type = self.getCSSType();
                    
                newLink.rel = 'stylesheet';
                newLink.type = 'text/css';
                newLink.href = url;
                newLink.media = 'all';
                for (i=0;i<head.childNodes.length;i++) {
                    if (head.childNodes[i].tagName == 'link') {
                        lastLink = head.childNodes[i];
                    }
                }
                if (!lastLink) {
                    head.appendChild(newLink);
                } else {
                    self.insertSiblingAfter(newLink, lastLink);
                }
            },
    
            /**
             * Append a new script to the head.
             *
             * @method loadScript
             * @param {String} url: The url to load.
             */
            loadScript: function(url, async) {
                var head = document.getElementsByTagName('head')[0],
                    lastScript, i,
                    newScript = document.createElement('script');
                
                newScript.type = 'text/javascript';
                newScript.src = url;
                if (async) {
                    newScript.async = true;
                }
                
                for (i=0;i<head.childNodes.length;i++) {
                    if (head.childNodes[i].tagName == 'link') {
                        lastScript = head.childNodes[i];
                    }
                }
                
                if (!lastScript) {
                    head.appendChild(newScript);
                } else {
                    self.insertSiblingAfter(newScript, lastScript);
                }
            },
            
            insertSiblingAfter: function(newnode, existingnode) {
            	if (existingnode.nextSibling === undefined) {
                	existingnode.parentNode.appendChild(newnode);
                } else {
                	existingnode.parentNode.insertBefore(newnode, existingnode.nextSibling)
                }
            },
            
            /**
             * Load the remaining scripts (main widget JS and CSS) into the page.
             *
             * @method loadRemainingScripts
             * @param {String} script_url: The script url to load.
             */
            loadRemainingScripts: function(script_url, custom_css) {
                if (typeof(window.$jl) !== 'function') {
                    self.loadScript(LF.servers.assets +'javascripts/livefyre_jquery.js', false);
                }
                // Load the JS
                if (!self.livefyreLibraryLoaded) {
                    self.livefyreLibraryLoaded = true;
                    self.loadScript(script_url);
                    // Determine which CSS to load (if any)
                    if (!custom_css) {
                        // Load the standard CSS
                        self.loadCSS();
                    }
                }
            },
    
            /**
             * Embed the CSS on the page if it doesn't exist already.
             *
             * @method loadCSS
             */
            loadCSS: function() {
                // Get the type that we need to load
                var filename = 'livefyre_'+ self.getCSSType() +'.css';
                // Make sure it doesn't already exist on the page
                if (LF.utils.existsOnPage('link', 'href', filename)) {
                    return;
                }
                self.loadLink(LF.servers.assets +'css/'+ filename);
            },
    
            /**
             * Get the CSS type to embed.
             *
             * @method getCSSType
             * @return {String}: CSS type.
             */
            getCSSType: function() {
                if (LF.detectMobile()) {
                    if (window.lf_ipad) {
                        return 'ipad';
                    }
                    return 'mobile';
                }
                return 'embed';
            },
    
            /**
             * Window onload event.
             *
             * @method onLoad
             * @param {Function} func: The function to assign to window.onLoad.
             */
            onLoad: function(func) {
                if (typeof(lf_window_ready) === 'undefined' || !lf_window_ready) {
                    if (window.addEventListener) { // W3C standard
                        window.addEventListener('load', func, false); // NB **not** 'onload'
                    } else if (window.attachEvent) { // Microsoft
                        window.attachEvent('onload', func);
                    }
                } else {
                    func();
                }
            },
    
            /**
             * Load the provided config.
             *
             * @method loadConfig
             * @param {Object} config: The provided config to load.
             */
            loadConfig: function(config, test) {
                if (typeof(test) === 'undefined' || !test) {
                    LF.config = config;
                }
                for (var key in config) {
                    if (config.hasOwnProperty(key)) {
                        switch (key) {
                            case 'lf_site_id':
                            case 'site_id':
                            case 'blog_id':
                                LF.data['site_id'] = LF.data['blog_id'] = config[key];
                                break;
                            case 'lf_domain':
                            case 'domain':
                                if (typeof(config.lfhost) === 'undefined') {
                                    LF.servers.assets = 'http://zor.'+ config[key] +'/wjs/';
                                    if (LF.utils.isCustomDomain(config[key])) {
                                        LF.servers.assets = 'http://zor.fyre.co/wjs/';
                                    }
                                    LF.servers.bootstrap = 'http://bootstrap.'+ config[key];
                                    LF.servers.domain = config[key];
                                    LF.servers.web = 'http://'+ config[key];
                                }
                                break;
                            case 'lf_version':
                            case 'version':
                                LF.versions.assets = config[key];
                                break;
                            case 'lf_console':
                            case 'console':
                                LF.consoleLoggingEnabled = config[key];
                                LF.Logger.enableConsole(LF.consoleLoggingEnabled);
                                break;
                            case 'backplane':
                                if(typeof(config[key]) !== 'function'){
                                    delete LF.config[key];
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            },

            /**
            * Function run when Backplane is initialized.
            *
            * @method initBackplane
            * @param {Object} backplane: Backplane object
            */
            initBackplane: function(backplane){
                if(backplane === undefined){
                    return;
                }

                backplane(function(){
                    if(typeof(Backplane.getChannelID()) !== 'string'){
                        return;
                    }

                    //add listener for subscription event
                    Backplane.subscribe(function(message){
                        if(message.type === 'identity/login'){
                            LF.ready(function(){
                                LF.login({bp_channel: Backplane.getChannelID()});                           
                            });
                            return;
                        }
                        if(message.type === 'identity/logout'){
                            LF.ready(function() {
                                LF.logout();
                            });
                            return;
                        }
                    });

                    //login user if identity/login message found in bp channel
                    LF.ready(function(){
                        LF.Ajax.httpRequest({
                            url: Backplane.getChannelID(),
                            data: {},
                            http_method: 'GET',
                            transport: 'jsonp',
                            success: function(data) {
                                var type;
                                // Return if no data in channel
                                if (data.length === 0) {
                                    return;
                                }
                                // Get last message type
                                type = data[data.length-1].message.type;
                                
                                if (type === 'identity/login') {
                                    LF.login({bp_channel: Backplane.getChannelID()});
                                    return;
                                }
                                if (type === 'identity/logout') {
                                    LF.logout();
                                    return;
                                }
                            }
                        });
                    });
                });
            },   
            /**
             * Check cookies and location hash for custom config.
             *
             * @method loadCustomConfig
             */
            loadCustomConfig: function() {
                var config = {};
                var hash = window.location.hash;
                var query = window.location.search;

                var getParamValue = function(str, param, cfg) {
                    var pos = str.indexOf(param);
                    if (pos === -1) {
                        return;
                    }
                    var attr = str.substring(pos).split('&')[0];
                    var param = attr.split('=');
                    cfg[param[0]] = param[1];
                };

                getParamValue(hash, self.CONSOLE_PARAM, config);
                getParamValue(hash, self.VERSION_PARAM, config);
                getParamValue(query, self.CONSOLE_PARAM, config);
                getParamValue(query, self.VERSION_PARAM, config);

                if (document.cookie.indexOf(self.CONFIG_COOKIE) > -1) {
                    config = LF.utils.cookie.get(self.CONFIG_COOKIE);
                    if (!config) {
                        return;
                    }
                    config = $jl.JSON.parse(config);
                }
                self.loadConfig(config, true);
            },
    
            /**
             * Get the parent element of this script.
             *
             * @method getParent
             * @return {String}: Parent node name.
             */
            getParent: function() {
                var scripts = document.getElementsByTagName('script'),
                    _this = null;
    
                for (var i=0, len=scripts.length; i<len; i++) {
                    if (/javascripts\/livefyre_init|livefyre\.js/.exec(scripts[i].src) != null) {
                        _this = scripts[i];
                        break;
                    }
                }
                if (_this != null) {
                    return _this.parentNode.tagName.toLowerCase();
                }
                return _this;
            },
    
            /**
             * Determine if the current domain is NI.
             *
             * @method isNI
             * @return {Boolean}: true|false if the domain is NI or not.
             */
            isNI: function() {
                return typeof(LF.config.domain) !== 'undefined' && (LF.config.domain.toLowerCase() == 'thesun.fyre.co' ||
                LF.config.domain.toLowerCase() == 'niuat1.fyre.co' || LF.config.domain.toLowerCase() == 'nistaging1.fyre.co' ||
                LF.config.domain.toLowerCase() == 'nitest-si.fyre.co' || LF.config.domain.toLowerCase() == 'nitest.fyre.co');
            }
    
            
        };
            
        var LF = function(config) {
            // TESTING: Need to find the lfhost meta value if it's on the page
            var meta = document.getElementsByTagName('meta');
            for (var i=0, len=meta.length; i<len; i++) {
                if (meta[i].name == 'lfhost') {
                    config.lfhost = meta[i].content;
                    break;
                }
            }
    
            // Set up the config
            if (typeof(config) !== 'undefined') {
                self.loadConfig(config);
            }
            // Add callback function to onInitialize
            if (arguments.length > 1) {
                for (var i=1, len=arguments.length; i<len; i++) {
                    if (typeof(arguments[i]) == 'function') {
                        LF.ready(arguments[i]);
                    }
                }
            }
            // Last step is to show SOMETHING on the page
            var lcs = document.getElementById('lf_comment_stream'),
                l = document.getElementById('livefyre');
            if (lcs == null && l == null) {
                if (self.isNI() || self.getParent() != 'head') {
                    document.write('<div id="livefyre"><div class="lf_widget_message lf_loading"></div></div>');
                }
            } else if (l == null && lcs != null) {
                lcs.innerHTML = '<div id="livefyre"><div class="lf_widget_message lf_loading"></div></div>';
            }
            // Use the cookie or hash values to get data
            self.loadCustomConfig();
            // Moving the init call outside of window.onload
            self.init();
            // Return the LF object
            return LF;
        }
            
        LF.onInitialize = [];
    
        LF.config = {};
        LF.data = {};
        LF.servers = {
            admin: 'http://www.livefyre.com',
            assets: 'http://zor.livefyre.com/wjs/',
            bootstrap: 'http://bootstrap.livefyre.com',
            domain: 'livefyre.com',
            web: 'http://livefyre.com'
        };
        // NOTE (MarkD): This is to solve test server issues with using www.domain
        if ('livefyre.com' !== 'livefyre.com') {
            LF.servers.admin = LF.servers.web;
        }
        LF.versions = {
            web: '1.0'
        };
                
    
        /**
         * Handle the login event from custom domain. This won't do much, just save the profile they pass in
         * because we're going to grab it on the way to getting our initial data.
         *
         * @method login
         * @param  {Object} profile: The profile to log in as.
         * @return {Object} : Return this object for chaining.
         */
        LF.login = function(profile) {
            if (typeof(profile.token) !== 'string') {
                LF.Logger.warning('LF.login', 'Token must be provided as a string.');
                return LF;
            }
            LF.config.lftoken = profile.token;
            if (typeof(profile.profile) === 'object') {
                LF.config.lfprofile = profile.profile;
            }
            // Return for chaining
            return LF;
        };
    
        /**
         * Save all functions that need to happen when the LF modules have been initialized.
         *
         * @method ready
         * @param  {Function} callback: The function to call when initialization is complete.
         * @return {Object} : Return this object for chaining.
         */
        LF.ready = function() {
            for (var i=0; i<arguments.length; i++) {
                if (typeof(arguments[i]) == 'function') {
                    LF.onInitialize.push(arguments[i]);
                }
            }
            // Return for chaining
            return LF;
        };
    
        /**
         * Handle the response from the initial data request.
         *
         * @method initCallback
         * @param {Object} response: The JSON response from the request.
         */
        LF.initCallback = function(response) {
            LF.Logger.info('LF.initCallback', 'LF init callback', response);
            // Verify that it is valid
            if (response.status === 'ok') {
                // Save the script url
                if (typeof(LF.data.script_url) === 'undefined') {
                    LF.data.script_url = response.data.script_url;
                }
                LF.setAssetsVersion(response.data.assets_version);
                // Check if the conversation exists
                switch (response.data.conv.status) {
                    case 'ok':
                        // Set the conv
                        LF.data.conv = response.data.conv;
                        // Do something with the conv information
                        LF.onInitialize.push(function() {
                            LF.Dispatcher.dispatch('conv', response.data.conv);
                        });
                        // Log the user in (if they're authed)
                        if (typeof(response.data.user) !== 'undefined') {
                            LF.data.user = response.data.user;
                            window.livefyre_user.loggedin = true;
                            self.setSpecial(response.data);
                            // When the page initializes, log the user in.
                            LF.onInitialize.push(function() {
                                var user = response.data.user;
                                user.banned = response.data.conv.banned;
                                user.following = response.data.conv.following;
                                user.moderator = response.data.conv.moderator;
                                LF.modules.Auth.userAuthSuccess(user);
                            });
                        }
                        // Grab the templates
                        if (typeof(response.data.templates) !== 'undefined') {
                            LF.config.templates = response.data.templates;
                        }
                        // Load the JS and CSS
                        self.loadRemainingScripts(LF.data.script_url, LF.config.custom_css);

                        break;
                    case 'error':
                        LF.UserMessage.showWidgetMessage('error', 'There was an error loading the conversation.');
                        LF.Logger.error('ConversationError', 'Error loading the conversation', self.initParams);
                        break;
                    case 'not_ready':
                        // Conversation is being created and isn't ready yet, need to try pulling it later
                        setTimeout(self.handleConversationNotReady, (3000 + 2000 * self.conversation_not_ready_attempts));
                        break;
                    default:
                        break;
                }
            } else if (response.status === 'error' && response.code === 503) {
                // We're now in maintenance mode, so embed the css
                if (!LF.utils.existsOnPage('link', 'href', 'livefyre.com')) {
                    self.loadLink(LF.servers.assets +'css/livefyre_init.css');
                }
                // Now, show the widget message
                LF.UserMessage.showWidgetMessage('maintenance', response.msg);
            } else if (response.status === 'error' && response.code === 403) {
                if (!LF.utils.existsOnPage('link', 'href', 'livefyre.com')) {
                    self.loadLink(LF.servers.assets +'css/livefyre_init.css');
                }
                LF.UserMessage.showWidgetMessage('disabled', response.msg);
            }
            else {
                LF.Logger.error('InitResponseError', 'Error with the init response', response);
            }
        };

        /**
         * Load the Mapfluence libraries into the page.
         *
         * @method preloadLibraries
         */
    
        LF.preloadLibraries = function(script_url, asset_version, custom_css) {
            self.loadCustomConfig();
            if (LF.versions.assets && LF.versions.assets !== asset_version) {
                LF.setAssetsVersion(LF.versions.assets);
                script_url = script_url.replace(asset_version, LF.versions.assets);
            } else {
                LF.setAssetsVersion(asset_version);
            }

            if (window.tinymce === undefined) {
                // Load tinymce
                self.loadScript(LF.servers.assets +'javascripts/tiny_mce/tiny_mce_packed.js', true);
                // Setup tinyMCEPreInit, which will be the base URL for loading CSS files.
                window.tinyMCEPreInit = {
    				base : LF.servers.assets +'javascripts/tiny_mce',
    				suffix : '', query : ''
    			};
            }
            
            self.loadRemainingScripts(script_url, custom_css);
        };
    
        LF.setAssetsVersion = function(version) {
            // Save the assets version # and update the asset server
            if (typeof(LF.versions.assets) === 'undefined') {
                if (version.indexOf('v') == 0) {
                    LF.versions.assets = version;
                } else {
                    LF.versions.assets = 'v1.0.'+ version;
                }
            }
            // Set up the asset server
            if (LF.servers.assets.indexOf('/v') == -1) {
                LF.servers.assets += LF.versions.assets +'/';
            }
        }

        window.livefyre_init = true;
        window.livefyre_user = {
            loggedin: false,
            special: false
        };
    
        return LF;
    })();
}

// Initialize the console
if (typeof(console) === "undefined") {
    console = { log:function(){}, error:function(){} };
}

// Ensure that $jl exists
if (typeof($jl) === 'undefined') {
    $jl = {};
}
//both ff and webkit have base64 encoding (function name "btoa")
$jl.Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = $jl.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            $jl.Base64._keyStr.charAt(enc1) + $jl.Base64._keyStr.charAt(enc2) +
            $jl.Base64._keyStr.charAt(enc3) + $jl.Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    /* public method for decoding -- not used yet, commenting so it is compressed out */
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = $jl.Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = $jl.Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = $jl.Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = $jl.Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = $jl.Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
    }
}
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof($jl) === 'undefined') {
    $jl = {};
}
$jl.JSON = {};

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep,
        _private = {};

    _private.toJSON = function(obj) {
        if (obj instanceof Date) {
            return isFinite(obj.valueOf()) ?
                            obj.getUTCFullYear()     + '-' +
                            f(obj.getUTCMonth() + 1) + '-' +
                            f(obj.getUTCDate())      + 'T' +
                            f(obj.getUTCHours())     + ':' +
                            f(obj.getUTCMinutes())   + ':' +
                            f(obj.getUTCSeconds())   + 'Z' : null;
        }
        return obj.valueOf();
    }

    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object') {
            value = _private.toJSON(value);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof $jl.JSON.stringify !== 'function') {
        $jl.JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof $jl.JSON.parse !== 'function') {
        $jl.JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

LF.utils = {

    /**
     * Checks if the element exists on the page.
     *
     * @method existsOnPage
     * @param {String} tag: The html tag to search for.
     * @param {String} attr: The tag attribute to match on.
     * @param {String} val: The tag attribute value to match on.
     * @return {Boolean}: If the element exists on the page.
     */
    existsOnPage: function(tag, attr, val) {
        var elements = document.getElementsByTagName(tag);
        for (var i=0, len=elements.length; i<len; i++) {
            if (typeof(elements[i][attr]) !== 'undefined' && elements[i][attr].indexOf(val) > -1) {
                return true;
            }
        }
        return false;
    },

    /**
     * Checks if the current domain is a custom one.
     *
     * @method isCustomDomain
     * @param  {String} domain: The domain to check if it's custom.
     * @return {Boolean} : If the domain is custom.
     */
    isCustomDomain: function(domain) {
        var _matched = (typeof(domain) != 'undefined' && /fyre\.co$/.exec(domain) != null);
        LF.utils.isCustomDomain = function() {
            return _matched;
        }
        return _matched;
    },

    cookie: {

        /**
         * Get a cookie with the given name.
         *
         * @namespace LF.utils.cookie
         * @method get
         * @param  {String} name: The name of the cookie to retrieve.
         * @return {String} The value of the cookie.
         */
        get: function(name) {
            var cookies = document.cookie.split(';');
            for (var i=0, len=cookies.length; i<len; i++) {
                var cookie = cookies[i].trim();
                if (cookie.split('=')[0] == name) {
                    return unescape(cookie).split('=')[1];
                }
            }
            return;
        },

        /**
         * Set a cookie.
         *
         * @namespace LF.utils.cookie
         * @method set
         * @param {String} name: The name of the cookie to set.
         * @param {String} value: The value of the cookie.
         */
        set: function(name, value) {
            document.cookie = name + "=" + value;
        }
    },

    localStorage: {
        get: function(name){
            if(typeof(window.localStorage[name]) !== 'undefined'){
                return window.localStorage[name];
            }
            return;
        },
        set: function(name, value){
            window.localStorage[name] = value;
        },
        remove: function(name){
            delete window.localStorage[name];
        }
    },

    _bi: (function(){
        function _raw(){
          return [
              navigator.userAgent,
              [screen.height, screen.width, screen.colorDepth].join('x'),
              ( new Date() ).getTimezoneOffset(),
              navigator.cookieEnabled,
              _map(navigator.plugins, function(p) {
                  return [p.name, p.description, _map(p, function(mt){
                      return [mt.type, mt.description, mt.suffixes].join('~');
                  }).join(',')].join('::')
              }).join(';')
          ].join('###');
        }

        //internal map function
        function _map(list, fn){
            if (typeof(fn) !== 'function'){
                return;
            }
            var len = list.length,
                res = []; 
            for(var i = 0; i < len; i++){
                res.push(fn.call(this, list[i]));
            }
            return res;
        }

        function _hashed(){
            return LF.utils.md5(_raw());
        }

        return {raw : _raw, hashed: _hashed};
    }()),

    /*
     * MD5 Functions below from:
     * https://github.com/wbond/md5-js/commit/9ea9370500208e58f23bf2929f91f385ba97731f
     * 
     * Joseph Myer's md5() algorithm wrapped in a self-invoked function to prevent
     * global namespace polution, modified to hash unicode characters as UTF-8.
     *  
     * Copyright 1999-2010, Joseph Myers, Paul Johnston, Greg Holt, Will Bond <will@wbond.net>
     * http://www.myersdaily.org/joseph/javascript/md5-text.html
     * http://pajhome.org.uk/crypt/md5
     * 
     * Released under the BSD license
     * http://www.opensource.org/licenses/bsd-license
    */
    md5: (function() {
        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22, 1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16, 530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
          }

        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function md51(s) {
            // Converts the string to UTF-8 "bytes" when necessary
            if (/[\x80-\xFF]/.test(s)) {
              s = unescape(encodeURI(s));
            }
            txt = '';
            var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i = 64; i <= s.length; i += 64) {
              md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
              md5cycle(state, tail);
              for (i = 0; i < 16; i++) tail[i] = 0;
            }
            tail[14] = n * 8;
            md5cycle(state, tail);
            return state;
        }

        function md5blk(s) { /* I figured global was faster.   */
            var md5blks = [], i; /* Andy King said do it this way. */
            for (i = 0; i < 64; i += 4) {
              md5blks[i >> 2] = s.charCodeAt(i) +
                                (s.charCodeAt(i + 1) << 8) +
                                (s.charCodeAt(i + 2) << 16) +
                                (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        var hex_chr = '0123456789abcdef'.split('');

        function rhex(n) {
            var s = '', j = 0;
            for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
                 hex_chr[(n >> (j * 8)) & 0x0F];
            return s;
        }

        function hex(x) {
            for (var i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
            return x.join('');
        }

        var md5 = function (s) {
            return hex(md51(s));
        }

        /* this function is much faster, so if possible we use it. Some IEs are the
        only ones I know of that need the idiotic second function, generated by an
        if clause.  */
        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
            function add32(x, y) {
              var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                  msw = (x >> 16) + (y >> 16) + (lsw >> 16);
              return (msw << 16) | (lsw & 0xFFFF);
            }
        }

        return md5;
    })(),

    Math: {
        uuid: (function() {
            // Private array of chars to use
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

            return function (len, radix) {
                var chars = CHARS, uuid = [];
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
                } else {
                    // rfc4122, version 4 form
                    var r;
                    // rfc4122requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (var i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random()*16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            };
        })()
    },

    Date: {
        /*
        Returns date as ISO8601 formatted string
        @method toISO8601
        @param  {Date} date: the date to be formatted.
        @return {String}: string representation of ISO8601 date.
        */
        toISO8601: function(date){
            function pad(n){
                return n < 10 ? '0' + n : n;
            }
            
            return date.getUTCFullYear() + '-'
              + pad(date.getUTCMonth() + 1) + '-'
              + pad(date.getUTCDate()) + 'T'
              + pad(date.getUTCHours()) + ':'
              + pad(date.getUTCMinutes()) + ':'
              + pad(date.getUTCSeconds()) + 'Z';
        },
        /*
        Returns date formatted as ISO8601 from string representation of ISO8601 date
        @method setISO8601
        @param  {String}: string represenation of ISO8601 date
        @param  {Date}: date object to be returned
        @return {Date}: date formatted as ISO8601 date 
        */
        setISO8601: function(string, input_date){
            var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
                "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
                "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
            var d = string.match(new RegExp(regexp));

            var offset = 0;
            var date = new Date(d[1], 0, 1);

            if (d[3]) { date.setMonth(d[3] - 1); }
            if (d[5]) { date.setDate(d[5]); }
            if (d[7]) { date.setHours(d[7]); }
            if (d[8]) { date.setMinutes(d[8]); }
            if (d[10]) { date.setSeconds(d[10]); }
            if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
            if (d[14]) {
                offset = (Number(d[16]) * 60) + Number(d[17]);
                offset *= ((d[15] == '-') ? 1 : -1);
            }

            offset -= date.getTimezoneOffset();
            time = (Number(date) + (offset * 60 * 1000));
            input_date.setTime(Number(time));
            return input_date;  
        }
    },

    String: {
        
        /**
         * Converts the provided objects key/value pairs into url params.
         *
         * @method toParams
         * @param  {Object} obj: The object to convert.
         * @return {String}: The url params converted from the object.
         */
        toParams: function(obj) {
            var ar = [];
            for (var x in obj) {
                ar.push(x +'='+ obj[x]);
            }
            return ar.join('&');
        },
        
        /**
         * Truncate the string to the desired length at which point it will append ... to the end.
         *
         * @method truncate
         * @param  {String} str: The string to be truncated.
         * @param  {Number} length: The number of characters before truncating the string.
         * @return {String}: The truncated string.
         */
        truncate: function(str, length) {
            if (str.length > length) {
                return str.substr(0, length) +'...';
            } else {
                return str.substr(0);
            }
        }
    },
    
    registerModels: function(fn) {
        LF.modelInstantiators.push(fn);
    },

    /**
     * URL encode / decode
     * http://www.webtoolkit.info/
     * 
     * Modified to make encode function urlsafe - replace '+' -> '%2b'
     */
    Url: {encode:function(a){return escape(this._utf8_encode(a)).replace("+","%2b")},decode:function(a){return this._utf8_decode(unescape(a))},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}},
 
    Array: {
        /**
         * Return the last element of an array
         *
         * @method lastElement
         * @param  {Array} arr
         */
        lastElement: function(arr) {
            return arr[arr.length-1];
        }
    }
};

LF.closeSafari = function() {
    // Clear the auth timeouts
    clearTimeout(LF.modules.Auth.auth_popup_timeout);
    clearTimeout(LF.modules.Auth.auth_popup_timeout_long);
    // Log the user in
    LF.modules.Auth.setUserAuthFromCookie(true);
};

if (!LF.safari_check) {
    LF.safari_check = (function() {
        LF.safari_poll = null;
        LF.safari_poll_expire = null;
        if (window.location.hash.indexOf('lf_safari_poll') > -1) {
            LF.safari_poll = setTimeout(function() {
                if (window.location.hash.indexOf('lf_safari_closed') > -1) {
                    clearTimeout(LF.safari_poll_expire);
                    // Log the user in
                    window.parent.opener.LF.closeSafari();
                } else {
                    LF.safari_poll = setTimeout(arguments.callee, 100);
                }
            }, 100);
            LF.safari_poll_expire = setTimeout(function() {
                clearTimeout(LF.safari_poll);
                // Log the user in
                window.parent.opener.LF.closeSafari();
            }, 60000);
        } 
        return true;
    })();
}

/**
 * Detect the type of browser the user is using. Since they can't change browsers for this instance,
 * return an overwritten function that automatically returns the correct value.
 *
 * @return {Boolean} : True if mobile, False otherwise.
 */
LF.detectMobile = (function() {
    var bRet = false,
        devices = ["iphone","ipod","ipad","android"],
    // Initialize our user agent string to lower case.
        uagent = navigator.userAgent.toLowerCase();
    // Is this an ipad?
    window.lf_ipad = false;
    // Loop through all devices
    for (var i=0, len=devices.length; i<len; i++) {
        if (uagent.search(devices[i]) > -1) {
            bRet = true;
            break;
        }
    }
    // Need to know if it's an ipad
    if (uagent.search('ipad') > -1) {
        window.lf_ipad = true;
    }
    return function() {
        return bRet;
    }
})();

/**
 * AJAX module.
 *
 * @namespace LF
 * @class Ajax
 */
LF.Ajax = (function() {
    var activeRequest = null;
    var self = {};
    
    /**
     * Abort the active AJAX request.
     *
     * @method abort
     */
    self.abort = function() {
        activeRequest.abort();
    };
    
    /**
     * AJAX request. Wrapper for jQuery AJAX function.
     *
     * @method ajax
     * @param {Object} params : The params that make up the AJAX request.
     */
    self.ajax = function(params) {
        activeRequest = $jl.ajax(params);
        return activeRequest;
    };
    
    self.ajax.ready = function() {
        return (window.$jl !== undefined && window.$jl.ajax !== undefined);
    }
    
    /**
     * Determine what transport type to use based on the current browser.
     *
     * @method determineTransport
     * @return {String} : The transport type
     */
    self.determineTransport = function() {
        var livefyre_transport = 'ajax';
        if (window.location.href.indexOf('file://') === 0) {
            // Have to use jsonp here because CORS doesn't know what
            // Origin to use for local file dev
            livefyre_transport = 'jsonp';
        } else if (window.XMLHttpRequest && "withCredentials" in (new XMLHttpRequest())) {
            // We can use CORS! (Safari or FF version)
            livefyre_transport = 'CORS';
        } else if (window.XDomainRequest) {
            // IE8 CORS
            livefyre_transport = 'IECORS';
        } else {
            livefyre_transport = "jsonp";
    	}
    	self.determineTransport = function() {
    	    return livefyre_transport;
    	}
        return livefyre_transport;
    };
    
    /**
     * Cross-domain XHR request.
     *
     * @method XDR
     * @param  {String} url : The request url
     * @param  {Object} args : The request args
     * @param  {Function} callback : The success callback
     * @param  {Function} error_callback : The error callback
     * @param  {String} http_method : The http method for this request POST/GET
     * @return {Object} : Response object
     */
    self.XDR = $jl.XDR = function(url, args, callback, error_callback, http_method, transport, include_token) {
        //this var determines if we force jsonp for the non long poll requests when otherwise using flash
        if (typeof(http_method) === 'undefined') {
            http_method = "GET";
        }
        if (typeof(error_callback) != 'function') {
    	    error_callback = function(r, status, thrownError) {
                LF.Logger.warning('LF.Ajax.XDR', ['JSONP Error', r, status, thrownError].join(' '));
            };
        }
        args.protocol = window.location.protocol;
        args.host = window.location.host; // This returns host + port (if non-port-80)

        // Only include lftoken in the request if the lfgtoken doesn't exist
        if (typeof(args.lfgtoken) === 'undefined') {
            if (typeof(include_token) === 'boolean' && !include_token) {
                // (md) This case is when include_token isn't passed in, so we don't know what the user wants to do,
                // so we can't blindly clear the token. We can only clear the token if they explicitly wanted to do so.
                args.lftoken = '';
            } else if (typeof(LF.data.user) !== 'undefined' && typeof(LF.data.user.token) !== 'undefined' && LF.data.user.token != '') {
                args.lftoken = LF.data.user.token;
            } else if (typeof(LF.Fyre) !== 'undefined' && typeof(LF.Fyre.get('user')) !== 'undefined') {
                args.lftoken = LF.Fyre.get('user').get('token').replace(/\+/g,"%2B");
            } else {
                args.lftoken = '';
            }
        }
        if (typeof(LF.config.lfhost) !== 'undefined') {
            args['__lfdomain__'] = LF.config.lfhost;
        }
        var p = {
            callbackParameter: "callback", 
            error: error_callback,
            url: url,
            transport: transport,
            http_method: http_method
        };
        if (typeof(callback) == "string") {
            p.callback = callback;
        } else {
            p.success = callback;
        }
        p.data = args;

        return self.httpRequest(p);
    };

    self.httpRequest = function(req) {
        var transport = (typeof(req.transport) === 'undefined' ? LF.Ajax.determineTransport() : req.transport);

        // Handle the params
        var data = {};
        // Need to always have the token or lfgtoken in the url
        if (req.url.indexOf('?') < 0) {
            req.url += "?";
        } else {
            req.url += "&";
        }
        if (req.http_method == 'POST') {
            data = req.data;
            if (transport === 'jsonp') {
                data['_method'] = 'POST';
            }
            if (typeof(req.data.lfgtoken) === 'string') {
                req.url += 'lfgtoken='+ req.data.lfgtoken;
            } else {
                req.url += 'lftoken='+ req.data.lftoken;
            }
        } else {
            req.url += $jl.param(req.data);
        }
        if (window.location.protocol !== 'http:') {
            req.url += '&protocol='+ window.location.protocol;
        }
        var callback_middleware = function(response, status, callback) {
            if (typeof(response) === 'string') {
                try {
                    response = $jl.JSON.parse(response);
                } catch (e) {
                    LF.Logger.warning("LF.Ajax.httpRequest", "Error parsing result, but don't fail. Response = " + response);
                }
            }
            callback(response, status);
        };

        switch (transport) {
            case 'ajax': 
                activeRequest = LF.Ajax.ajax({
                    type: req.http_method,
                    url: req.url,
                    data: data,
                    success: function(data) {
                        callback_middleware(data, textstatus, req.success);
                    },
                    error: function(data) {
                        callback_middleware(data, textstatus, req.error);
                    }
                });
                break;

            case 'CORS':
                var request = activeRequest = new XMLHttpRequest();
                request.open(req.http_method, req.url, true);
                request.withCredentials = true;

                var statuscallback = function() {
                    var textstatus = 'error';
                    var data = 'error';
                    if ((this.readyState == 4) && (this.status == '200')) {
                        textstatus = 'success';
                        data = this.responseText;
                        if (typeof(req.success) == 'function') {
                            callback_middleware(data, textstatus, req.success);
                            req.error=null;
                        }
                    } else if (this.readyState == 4 && typeof(req.error) == 'function') {
                        callback_middleware(this.responseText, textstatus, req.error);
                        req.error=null;
                    }
                };
                request.onreadystatechange = statuscallback;
                request.send($jl.param(data));
                return request;
                break;

            case 'IECORS':
                // IE8
                var xdr = activeRequest = new window.XDomainRequest();
                xdr.open(req.http_method, req.url);
                xdr.onload = function() {
                    function wrapper(response) {
                        // Stream responses that have timeout shouldn't trigger a fail.
                        if (response.code === 200 || typeof(response.timeout) !== 'undefined') {
                            req.success(response);
                        } else {
                            req.error(response);
                        }
                    }
                    callback_middleware(this.responseText, 'success', wrapper);
                };
                xdr.onerror = function() {
                    LF.Logger.warning('LF.Ajax.httpRequest:IECORS', "Received an error...");
                    callback_middleware(this.responseText, 'error', req.error);
                };
                xdr.send($jl.param(data));
                return xdr;
                break;
                // handle XDR responses -- not shown here :-)

            default:
                var areq = activeRequest = LF.Ajax.ajax({
                    async: true,
                    type: req.http_method,
                    url: req.url,
                    data: data,
                    success: function(data) {
                        var callback = req.success;
                        var responseStatus = 'success';
                        if (data.code && data.code !== 200) {
                            callback = req.error;
                            responseStatus = 'error';
                        }
                        callback_middleware(data, responseStatus, callback);
                    },
                    dataType: 'jsonp'
                });
                return areq;
                break;
        }
    };

    return self;
})();
LF.Logger_ = function() {
    this.consoleEnabled = LF.consoleLoggingEnabled || false;
    this.logs = {};
    this.logs.history = [];
    this.logs.main = [];
    this.logs.meta = {
        userAgent: navigator.userAgent.replace(/\)|\(/g, ''),
        created_at: new Date(),
        url: location.href,
        gFyreId: window.gFyreId
    };
};

LF.Logger_.LEVELS = {
    DEBUG: 'DEBUG',
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING'
};

LF.Logger_.prototype.buildRequestData_ = function(level, event, message) {
    var data = LF.data || {};
    var obj = {};
    obj['__LFLEVEL'] = level;
    obj['__LFEVENT'] = event;
    obj['__LFMSG'] = message;
    obj['__LFSITEID'] = data.blog_id || null;
    obj['__LFSESSID'] = null;
    if (data.conv) {
        obj['__LFSESSID'] = data.conv.id;
    } else if (LF.Stream) {
        obj['__LFSESSID'] = LF.Stream.page_session;
    }
    return obj;
};

LF.Logger_.prototype.clear = function() {
    this.logs.main = [];
    return this;
};

LF.Logger_.prototype.debug = function(event, msg, obj) {
    this.log(LF.Logger_.LEVELS.DEBUG, event +': '+ msg, obj);
};

LF.Logger_.prototype.enableConsole = function(enable) {
    this.consoleEnabled = enable;
};

LF.Logger_.prototype.error = function(event, msg, obj) {
    this.log(LF.Logger_.LEVELS.ERROR, event +': '+ msg, obj);
    this.send('error', event, msg +' | '+ $jl.JSON.stringify(obj));
};

LF.Logger_.prototype.getLogs = LF.Logger_.prototype.get_logs = function() {
    return this.logs;
};

LF.Logger_.prototype.history = function() {
    return this.logs.history;
};

LF.Logger_.prototype.info = function(event, msg, obj) {
    this.log(LF.Logger_.LEVELS.INFO, event +': '+ msg, obj);
};

LF.Logger_.prototype.length = function() {
    return this.logs.main.length;
};

LF.Logger_.prototype.log_ = LF.Logger_.prototype.log_default = function(msg, obj) {
    if (!this.consoleEnabled || !console || !console.log) {
        return this;
    }
    console.log(msg, obj);
    return this;
};

LF.Logger_.prototype.log = function(level, msg, obj) {
    var record = {
        level: level,
        logged_at: new Date(),
        content: msg
    };
    if (typeof(obj) !== 'undefined') {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                record[key] = obj[key];
            }
        }
    }
    // Only need to store errors, so we don't significantly increase the size of the object.
    if (level === LF.Logger_.LEVELS.ERROR) {
        this.logs.main.push(record);
    }
    this.log_(record.level+": "+record.content, obj);
    return this;
};

LF.Logger_.prototype.meta = function() {
    return this.logs.meta;
};

LF.Logger_.prototype.print = function(o) {
    if (o == 'v') {
        return $jl.JSON.stringify(this.logs);
    } else {
        return $jl.JSON.stringify(this.logs.main.map(function(e){
            return e.content;
        }));
    }
};

LF.Logger_.prototype.send_ = function(data) {
    if (LF.detectMobile() || !LF.Ajax.ajax.ready()) {
        return;
    }
    LF.Ajax.ajax({
        async: true,
        type: "GET",
        url: LF.servers.scribe +'/INFERNO/',
        data: data,
        success: function() {}
    });
};

LF.Logger_.prototype.send_solo = function(level, event, message) {
    this.send_(this.buildRequestData_(level, event, message));
};

LF.Logger_.prototype.sendAll = LF.Logger_.prototype.send = function() {
    if (this.logs.main.length === 0) {
        return this;
    }
    this.log('LIVEFYRE.logger.send()');
    var record = {
        date: new Date(),
        length: this.logs.main.length,
        payload: this.logs.main.slice(0, this.logs.main.length)
    };
    this.logs.history.push(record);
    var to_send = {
        log: this.logs.main,
        meta: this.logs.meta
    };
    var data = LF.data || {};
    var convId = data.conv ? data.conv.id : null;
    this.send_(this.buildRequestData_(
        'info',
        'conv_id: '+ convId,
        $jl.JSON.stringify(to_send)));
    this.clear();
    return this;
};

LF.Logger_.prototype.stream = function(msg, obj) {
    if ($jl('#lf_stream_console').length > 0 && $jl('#lf_stream_console').attr('on') == 'true') {
        $jl('#lf_stream_console > .lf_logs').prepend('<b>'+ new Date() +'</b> : <b>'+ msg +'</b> : '+ $jl.JSON.stringify(obj) +'<br><br>');
    }
};

LF.Logger_.prototype.test = function() {};

LF.Logger_.prototype.timesSent = LF.Logger_.prototype.times_sent = function() {
    return this.logs.history.length;
};

LF.Logger_.prototype.warning = function(event, msg, obj) {
    this.log(LF.Logger_.LEVELS.WARNING, event +': '+ msg, obj);
};

// Overwrite the previous logger to ensure that the logger is the newest version
LF.Logger = new LF.Logger_();

/*global LF: true, escape:true*/
if (typeof(LF)==='undefined') LF = {};
if (typeof(LF.modules)==='undefined') LF.modules = {};
LF.modules.CommentCount = function(LF) {
    var JSONP_CB_PREFIX = "LFCommentCount",
        JSONP_CB_RAND_MAX = 100000,
        // LF_DOMAIN is used as the host for the ncomments API call if one cannot be extracted from the script tag src
        LF_DOMAIN = 'livefyre.com',
        // LF_DOMAIN_REGEX is used to test the script tag src and extract a domain
        LF_DOMAIN_REGEX = /[^.\/]+\.fyre\.co|(\w+\.)?livefyre\.com/,
        LF_NCOMMENTS_PATH = '/api/v1.1/public/comments/ncomments/{hash}.json',
        LEGACY_ARTICLE_ID_ATTRIBUTE = 'article_id',
        DEFAULT_DOMAIN_ATTRIBUTE = 'data-lf-domain'
        DEFAULT_ARTICLE_ID_ATTRIBUTE = 'data-lf-article-id',
        DEFAULT_SITE_ID_ATTRIBUTE = 'data-lf-site-id',
        LEGACY_CLASS_NAME = 'livefyre-ncomments',
        DEFAULT_CLASS_NAME = 'livefyre-commentcount',
        // DEFAULT_RETRY_TIMEOUT is the default number of seconds to wait if the ncomments request returns a 503 envelope
        DEFAULT_RETRY_TIMEOUT = 500,
        MAX_FETCH_ATTEMPTS = 5,
        // DEFAULT_REPLACER_REGEX is used to match which part of a string should be replaced by a new comment count
        DEFAULT_REPLACER_REGEX = /(\d+,?\d*|none|no|zero|nada|leave a)/ig,
        NCOMMENTS_SCRIPT_SRC_REGEX = /(CommentCount|ncomments)\.js/,

        /**
         * Start the CommentCount processing. Able to provide a list of articles and a replacement function or regex
         * which will be used to do the replacements when counts are returned from the server.
         * @param {Object} config The object containing the User provided config params.
         */
        module = function(config) {
            var articles = config['articles'] || module.defaults.get_articles(),
                replacer = config['replacer'];
            if (typeof(replacer) === 'undefined') {
                replacer = module.defaults.replace_all;
            } else {
                replacer = module.helpers.make_replacer(replacer);
            }
            module.fetch(articles, replacer);
        };
    
    /* HELPERS */
    module.helpers = {};
    /**
     * Implements base64 encoding and decoding.
     * From http://www.webtoolkit.info/javascript-base64.html
     */
    module.helpers.Base64 = (function() {
        var Base64 = {
            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = 0,
                    c1 = 0,
                    c2 = 0,
                    c3 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        };
        return Base64;
    })();
    /**
     * Returns true if the param is an Array, else false
     *
     * @param arr: Value to be tested for Array-ness
     */
    module.helpers.isArray = function(arr) {
        if ( ! arr) return false;
        if (arr.isArray) return arr.isArray();
        else return Object.prototype.toString.call( arr ) === '[object Array]';
    };
    /**
     * Returns true if the param is a RegExp object, else false
     *
     * @param reg: Value to be tested for RegExp-ness
     */
    module.helpers.isRegExp = function(reg) {
        if ( ! reg) return false;
        else return Object.prototype.toString.call( reg ) === '[object RegExp]';
    };
    /**
     * Given an array and an item, tests whether the item is in the Array.
     * Used because IE doesn't have Array.prototype.indexOf
     *
     * @param array: An array
     * @param item: Object to test if it's in the array
     */
    module.helpers.contains = function(array, item) {
        var i = array.length;
        while (i--) {
            if (array[i] === item) {
                return true;
            }
        }
        return false
    };
    /**
     * Provided a list of articles, this returns the hash that must be passed
     * to the ncomments API endpoint
     *
     * @param articles: A list or object indicating a collection of articles
     */
    module.helpers.hash_articles = function(articles) {
        var article_pairs = [],
            key,
            mapping = {},
            ret = '';
        // If passed an articles object, convert to list first
        if (!module.helpers.isArray(articles)) {
            articles = module.helpers.articles_object_to_list(articles);
        }
        if (articles.length == 0) {
            return null;
        }
        // Create article_id/site_id pairs
        for (var i=0, len=articles.length, arr, article; i<len; i++) {
            article = articles[i];
            arr = mapping[article.site_id] || [];
            if (!module.helpers.contains(arr, article.article_id)) {
                arr.push(article.article_id);
            }
            mapping[article.site_id] = arr;
        }
        for (key in mapping) {
            if (mapping.hasOwnProperty(key)) {
                article_pairs.push(key +':'+ mapping[key].join(','));
            }
        }
        return module.helpers.Base64.encode(article_pairs.join('|'));
    };
    /**
     * Given an ncomments hash, returns a list of article objects
     *
     * @param hash: An ncomments hash. Possibly generated by helpers.hash_articles
     */
    module.helpers.unhash_articles = function(hash) {
        var article_pairs = module.helpers.Base64.decode(hash).split('|'),
            articles = [];
        for (var i=0, len=article_pairs.length, article; i<len; i++) {
            article = article_pairs[i].split(',');
            articles.push({
                'site_id': article[0],
                'article_id': article[1]
            });
        }
        return articles;
    };
    /**
     * Given n articles objects, merges them into one
     *
     * @params: 1-n articles objects
     */
    module.helpers.merge_articles_objects = function() {
        var args = Array.prototype.slice.call(arguments),
            obj,
            site, out_site,
            article, out_article,
            out_obj = {};
        for (var i=0, len=args.length; i<len; i++) {
            obj = args[i];
            for (var site_id in obj) { 
                if (!obj.hasOwnProperty(site_id)) {
                    continue;
                }
                if (!(site_id in out_obj)) out_obj[site_id] = {};
                site = obj[site_id];
                out_site = out_obj[site_id];
                for (var article_id in site) { 
                    if (!site.hasOwnProperty(article_id)) {
                        continue;
                    }
                    if (!(article_id in out_site)) out_site[article_id] = {};
                    article = site[article_id];
                    out_site[article_id] = module.helpers.merge_simple_objects(out_site[article_id], article)
                }
            }
        }
        return out_obj;
    };
    /**
     * Converts an articles list to an articles object
     * e.g. [{site_id: 6, article_id: 1}] -> {6: {1: {}}}
     *
     * @param article_list: A list of article description objects
     */
    module.helpers.articles_list_to_object = function(article_list) {
        var obj = {},
            article,
            site_id,
            site,
            article_id,
            article_id_val = null;
        for (var i=0, len=article_list.length; i<len; i++) {
            article = article_list[i];
            site_id = article.site_id;
            article_id = article.article_id;
            article_id_val = null;
            // Make sure site_id key is there
            if ( ! (site_id in obj)) obj[site_id] = {};
            site = obj[site_id];
            obj[site_id][article_id] = module.helpers.merge_simple_objects(
                                            site[article_id] || {},
                                            module.helpers.remove_ids_from_article_object(article)
                                        );
        }
        return obj;
    };
    module.helpers.articles_object_to_list = function(article_object) {
        var article_list = [],
            site,
            article,
            obj_to_push,
            article_info;
        for (var site_id in article_object) { if (article_object.hasOwnProperty(site_id)) {
            site = article_object[site_id];
            for (var article_id in site) { if (site.hasOwnProperty(article_id)) {
                article_info = site[article_id];
                obj_to_push = module.helpers.merge_simple_objects({
                    article_id: article_id,
                    site_id: site_id
                }, article_info);
                article_list.push(obj_to_push);
            }}
        }}
        return article_list;
    };
    module.helpers.jsonp = function(url, args, callback) {
        if (typeof(args)==='undefined') args = {};
        var jsonpcb;
        // Create jsonp callback (like 'LFCommentCount12515')
        jsonpcb = JSONP_CB_PREFIX+Math.floor(Math.random()*JSONP_CB_RAND_MAX);
        window[jsonpcb] = callback;
        // Add jsonp callback to URL args
        args.callback = jsonpcb;
        
        if (url.indexOf('?') < 1) url = url + "?";
        for (var arg in args) {
            if (args.hasOwnProperty(arg)) {
                url = url + "&" + escape(arg) + "=" + escape(args[arg]);
            }
        }
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = url;
        headID.appendChild(newScript);
    };
    module.helpers.on_window_load = function(func) {
        var arg_func = func;
        // If already loaded, call back immediately
        if (module.loaded === true) {
            func.call(window);
        } else {
            func = function() {
                arg_func.call(window);
                module.loaded = true;
            };
        }
        if (window.addEventListener) { // W3C standard
            window.addEventListener('load', func, false); // NB **not** 'onload'
        } else if (window.attachEvent) { // Microsoft
            window.attachEvent('onload', func);
        }
    };
    module.helpers.get_script_element = function() {
        var scripts = document.getElementsByTagName('script'),
            script,
            scriptsrc;
        for (var i=0, len=scripts.length; i<len; i++) {
            script = scripts[i];
            scriptsrc = script.src;
            if (scriptsrc && scriptsrc.match(NCOMMENTS_SCRIPT_SRC_REGEX))
                return script;
        }
    };
    module.helpers.get_domain = function() {
        var script = module.helpers.get_script_element();
        // Script not found
        if (!script) return;
        
        // Check for lf-domain data attribute
        var attrValue = script.getAttribute(DEFAULT_DOMAIN_ATTRIBUTE);
        if (attrValue) return attrValue;
        
        // Parse domain from script src
        var scriptsrc = script.src,
            match = scriptsrc.match(LF_DOMAIN_REGEX);
        if ( ! match ) return;
        
        match = match[0];

        // Don't use zor
        if (match.match(/zor\.livefyre\.com|zor\.fyre\.co/)) return;
        
        return match;
    };
    module.helpers.memoize = function(func) {
        var val = 'first-time',
            return_func;
        return_func = function() {
            if (val !== 'first-time') return val;
            val = func.apply(this, arguments);
            return val;
        };
        return return_func;
    };
    module.helpers.getElementsByClassName = function (className, tag, elm){
        var getElementsByClassName;
        if (document.getElementsByClassName) {
            getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        else if (document.evaluate) {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                for(var j=0, jl=classes.length; j<jl; j+=1){
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try    {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        }
        else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    };
    module.helpers.replace_innerHTML = function(element, regex, new_text) {
        element.innerHTML = element.innerHTML.replace(regex, new_text);
    };
    /**
     * Make the replacement function, which can be regex (used to determine which part of the string should be replaced)
     * or a callback function that will handle doing the replacement.
     * @param {Function|Regex} regex_or_func The function or regex that will be used for the replacement.
     */
    module.helpers.make_replacer = function(regex_or_func) {
        var replacer_func = regex_or_func;
        if (module.helpers.isRegExp(regex_or_func)) {
            replacer_func = function(htmlElement, count) {
                module.helpers.replace_innerHTML(htmlElement, regex_or_func, count)
            };
        }
        var func_to_return;
        func_to_return = function(articles) {
            var site,
                article,
                article_eles,
                article_count;
            for (var site_id in articles) { 
                if (!articles.hasOwnProperty(site_id)) {
                    continue;
                }
                site = articles[site_id];
                for (var article_id in site) { 
                    if (!site.hasOwnProperty(article_id)) {
                        continue;
                    }
                    article = site[article_id];
                    article_eles = article.elements;
                    article_count = article.total || 0;
                    for (var i=0, len=article_eles.length; i<len; i++) {
                        replacer_func(article_eles[i], article_count);
                    }
                }
            }
        };
        return func_to_return;
    };
    module.helpers.remove_ids_from_article_object = function(article) {
        var return_obj = {};
        for (var key in article) { 
            if (!article.hasOwnProperty(key)) {
                continue;
            }
            if (key !== 'site_id' && key !== 'article_id') {
                return_obj[key] = article[key];
            }
        }
        return return_obj;
    };
    module.helpers.merge_simple_objects = function(obj1, obj2) {
        var obj3 = {},
            tmp;
        // First basically just copy obj1 into obj3
        for (var key in obj1) { 
            if (obj1.hasOwnProperty(key)) {
                obj3[key] = obj1[key];
            }
        }
        // Then add obj2 into obj3, not overwriting arrays
        for (var key in obj2) { 
            if (!obj2.hasOwnProperty(key)) {
                continue;
            }
            if (module.helpers.isArray(obj2[key]) && module.helpers.isArray(obj3[key])) {
                obj3[key] = obj3[key].concat(obj2[key]);
            } else {
                obj3[key] = obj2[key];
            }
        }
        return obj3;
    }
    
    module.helpers.ensure_correct_articles_object = function(article_counts) {
        for (var site_id in article_counts) { 
            if (!article_counts.hasOwnProperty(site_id)) {
                continue;
            }
            var site = article_counts[site_id];
            for (var article_id in site) { 
                if (!site.hasOwnProperty(article_id)) {
                    continue;
                }
                if ( ! (typeof(site[article_id])==='object')) {
                    site[article_id] = {count: site[article_id]};
                }
            }
        }
        return article_counts;
    };
    
    /* DEFAULTS */
    module.defaults = {};
    module.defaults.find_elements = function(class_name) {
        var eles = module.helpers.getElementsByClassName(class_name || DEFAULT_CLASS_NAME);
        return eles;
    };
    module.defaults.get_article_id = function(element) {
        return element.getAttribute(DEFAULT_ARTICLE_ID_ATTRIBUTE);
    };
    module.defaults.get_article_id_legacy = function(element) {
        return element.getAttribute(LEGACY_ARTICLE_ID_ATTRIBUTE);
    };
    module.defaults.get_site_id_from_script_src = module.helpers.memoize(function(element) {
        var script = module.helpers.get_script_element();
        if (typeof(script)==='undefined') return null;
        var matches = script.src.match("#bn=([^\\&]*)");
        if (matches && matches.length >= 2) return matches[1];
        return null;
    });
    module.defaults.get_site_id_from_attribute = function(element) {
        return element.getAttribute(DEFAULT_SITE_ID_ATTRIBUTE);
    };
    module.defaults.get_articles = function() {
        var elements = module.defaults.find_elements(),
            element,
            articles = {},
            site_id,
            site,
            article_id;
        for (var i=0, len=elements.length; i<len; i++) {
            element = elements[i];
            site_id = module.defaults.get_site_id_from_attribute(element) || module.defaults.get_site_id_from_script_src(element);
            if ( ! (site_id in articles)) articles[site_id] = {};
            site = articles[site_id];
            article_id = module.defaults.get_article_id(element);
            if ( ! (article_id in site)) site[article_id] = {elements: []};
            site[article_id].elements.push(element);
        }
        return articles;
    };
    module.defaults.get_articles_legacy = function() {
        var elements = module.defaults.find_elements(LEGACY_CLASS_NAME),
            element,
            articles = {},
            site_id,
            site,
            article_id;
        for (var i=0, len=elements.length; i<len; i++) {
            element = elements[i];
            site_id = module.defaults.get_site_id_from_script_src(element);
            if ( ! (site_id in articles)) articles[site_id] = {};
            site = articles[site_id];
            article_id = module.defaults.get_article_id_legacy(element);
            if ( ! (article_id in site)) site[article_id] = {elements: []};
            site[article_id].elements.push(element);
        }
        return articles;
    };
    module.defaults.replace_all = module.helpers.make_replacer(DEFAULT_REPLACER_REGEX);
    
    /* PUBLIC INTERFACE */
    /**
     * Fetch comment counts for the provided articles from the server,
     * then execute `cb` with an argument containing site/article->count/element mappings
     *
     * @param articles (optional): Array of objects with site_id and article_id keys or object with site_id->article_id->[elements] mapping
     * @param cb: A callback Function.
     * @param nodata_cb: A callback if articles is empty.
     */
    module.fetch = function(articles, cb, nodata_cb) {
        var args = Array.prototype.slice.call(arguments),
            fetch_attempts = 0;

        // prevent the onload from running if called explicitly through .run, .auto, or .fetch
        module.loaded = true;

        // If they only pass a callback, use default article fetching
        if (args.length === 1) {
            cb = args[0];
            articles = module.defaults.get_articles();
        }
        // If passed article callable, call it
        if (typeof(articles)==='function') {
            articles = articles();
        }
        // If passed article object, convert to list
        if ( ! module.helpers.isArray(articles)) {
            articles = module.helpers.articles_object_to_list(articles);
        }
        
        var endpoint = "http://bootstrap.{domain}{path}",
            hash = module.helpers.hash_articles(articles);

        if (hash == null) {
            if (typeof(nodata_cb) === 'function') {
                nodata_cb();
            }
            return;
        }
        // Create the URL from template
        endpoint = endpoint.replace('{domain}', module.helpers.get_domain() || LF_DOMAIN)
                           .replace('{path}', LF_NCOMMENTS_PATH)
                           .replace('{hash}', hash);
        
        var jsonp_cb = function(article_counts) {
            fetch_attempts = fetch_attempts + 1;

            if (article_counts.status === 'ok') {
                var article_elements = module.helpers.articles_list_to_object(articles),
                    article_counts = module.helpers.ensure_correct_articles_object(article_counts.data),
                    merged_articles = module.helpers.merge_articles_objects(article_counts, article_elements);
                // This way callback function has access to elements already
                cb.call(null, merged_articles);
            } else if (article_counts.code == 503 && fetch_attempts < MAX_FETCH_ATTEMPTS) {
                // Wait a bit and try again
                setTimeout(function() {
                    module.helpers.jsonp(endpoint, {}, jsonp_cb);
                }, (article_counts.data.wait || DEFAULT_RETRY_TIMEOUT));
            }
        }
        module.helpers.jsonp(endpoint, {}, jsonp_cb);
    };
    
    /**
     * Legacy automatic ncomments behavior
     */
    module.auto_legacy = function() {
        module.fetch(module.defaults.get_articles_legacy(), module.defaults.replace_all);
    }
    /**
     * Official 'auto' behavior. Comment counts need the 'livefyre-commentcount
     * class, and attributes
     */
    module.auto = function() {
        module.fetch(module.defaults.get_articles(), module.defaults.replace_all);
    }


    /**
     * Implements automatic behavior (using legacy default article
     * gatherer and rendering callback if #bn= is on URL).
     */
    module.helpers.on_window_load(function() {
        if (module.loaded) {
            return;
        }
        var bn = module.defaults.get_site_id_from_script_src();
        if (bn) {
            module.auto_legacy();
        }
        else {
            module.auto();
        }
    });

    /**
     * Is the DOM ready?
     * Can be overwritten by module.run
     */
    module.loaded = false;

    /**
     * Run right away
     * Useful to trigger at bottom of page, instead of waiting for DOM to be ready
     */
    module.run = function() {
        if (!module.loaded) {
            module.auto();
            // auto calls out to fetch, which will set module.loaded=true
        }
    };


    LF.CommentCount = module;
};
LF.modules.CommentCount(LF);

/**
 * Messaging to users for stream related statuses.
 */
LF.UserMessage = {
    
    /**
     * Shows the error box.
     *
     * @method showErrorMessage
     * @param {Object} elem: The DOM element where the error should show.
     * @param {String} type: The type of error to show.
     */
    showErrorMessage: function(elem, type) {
        this.showPopupMessage(elem, 'lf_error', LF.ErrorMessages[type]);
    },

    showSuccessMessage: function(elem, msg) {
        this.showPopupMessage(elem, 'lf_success', msg);
    },

    showPopupMessage: function(elem, cls, message) {
        var msg = $jl('<div class="'+ cls +'"><span>'+ message +'</span></div>').appendTo(elem).hide();
        msg.css('marginLeft', -(msg.width() /2)).fadeIn(1000, function() {
            var msg = $jl(this);
            setTimeout(function() {
                msg.fadeOut(1000, function() {
                    msg.remove();
                });
            }, 4000);
        });
    },

    /**
     * Visually replace the "post bar" that lives right below the comment box with the maintenance message.
     *
     * @method showStreamMaintenanceMessage
     */
    showStreamMaintenanceMessage: function(msg) {
        if (typeof(msg) === 'undefined' || msg == '') {
            msg = LF.ErrorMessages['maintenance'];
        }
        $jl('.lf_action_bar').before('<div class="lf_widget_message lf_maintenance">'+ msg +'</div>');
    },

    /**
     * Shows a message in place of the widget. Since this is totally replacing the widget, can clear the LF object.
     *
     * @method showMessage
     * @param {String} type: The type of message to show.
     * @param {String} msg: The message to display.
     */
    showWidgetMessage: function(type, msg) {
        if (typeof(msg) !== 'string') {
            if (typeof(LF.ErrorMessages[type]) === 'string') {
                msg = LF.ErrorMessages[type];
            } else {
                msg = 'There was an error';
            }
        }
        // Replace the contents of #livefyre with the message
        var lfcs = document.getElementById('lf_comment_stream'),
            lf = document.getElementById('livefyre');
        // Use whichever element exists first, with priority to div#livefyre over div#lf_comment_stream
        (lf || lfcs).innerHTML = '<div class="lf_widget_message lf_'+ type +'">'+ msg +'</div>';
    }
}

/**
 * Messaging to users for error related things.
 */
LF.ErrorMessages = {
    approve: 'There was an error approving the comment',
    AuthorizationError: "You're not authorized to post a comment on this conversation",
    ban: 'There was an error banning the user',
    ban_guest: "You're not allowed to ban a guest user.",
    ban_yourself: "You can't ban yourself!",
    comment: 'There was an error posting your comment',
    comment_char_limit: 'You have exceeded a 1500 character limit (a limitation of Internet Explorer 7).',
    comment_char_limit_max: 'You have exceeded the 8000 character limit maximum.',
    comment_empty: 'Comment has to contain text.',
    comments_disabled: 'Commenting is disabled for this conversation',
    CommentsNotAllowedError: "Comments are not allowed on this conversation",
    disabled: 'This Livefyre conversation has been disabled.',
    duplicate_comment: 'As much as you liked your comment, you\'re not allowed to post it twice.',
    DuplicateCommentError: 'As much as you liked your comment, you\'re not allowed to post it twice.',
    EmptyCommentError: 'It seems you\'re attempting to post an empty comment.',
    flag: 'There was an error flagging the comment',
    flag_own: 'You can\'t flag your own comment.',
    follow: 'There was an error following the conversation',
    forbidden: "You aren't allowed to do this.",
    guest_follow: "Guests aren't allowed to follow conversations.<br>Create an account to follow the discussion.",
    guest_like: "Guests aren't allowed to like comments. Create an account to like this.",
    GuestCommentsNotAllowedError: "Guest commenting isn't allowed.",
    GuestTokenExpiredError: "Hey, your session has expired, please log in again.",
    GuestTokenInvalidError: "Hey, I couldn't verify your session, please log in again.",
    InvalidCharacterError: "It seems you're attempting to post an invalid character.",
    like: 'Sorry, we couldn\'t process your like. Please try again in a sec.',
    like_own: 'You can\'t like your own comment.',
    link: 'There was an error getting the link',
    MalformedCommentError: "It seems you're attempting to post malformed content.",
    maintenance: 'Livefyre comments are down for maintenance.',
    NotAuthorizedError: "Your session has expired, please log in again.",
    remove: 'There was an error deleting the comment',
    unapproved_reply: "You aren't allowed to reply to a unapproved comment",
    unfollow: 'There was an error unfollowing the conversation',
    unlike: 'There was an error unliking this comment',
    whitelist: 'There was an error whitelisting the user',
    whitelist_guest: "You're not allowed to whitelist a guest user.",
	WrongDomainError: "This site is misconfigured."
};
