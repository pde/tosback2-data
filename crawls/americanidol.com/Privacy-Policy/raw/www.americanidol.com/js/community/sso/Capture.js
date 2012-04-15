
if (typeof CAPTURE === 'undefined') {
    CAPTURE = {};
    CAPTURE.config = {};
}

CAPTURE.init = function() {
    CAPTURE.callbacks = CAPTURE.config.callbacks || {};
    var cfg = CAPTURE.config,
        noop = function() {},
        win = window;
    CAPTURE.signinUrl =
        [ cfg.capture_ui_server_url, '/oauth/signin',
          '?bp_channel=', encodeURIComponent(cfg.bp_channel()),
          '&client_id=', encodeURIComponent(cfg.client_id),
          '&redirect_uri=', encodeURIComponent(cfg.redirect_uri),
          '&response_type=', encodeURIComponent(cfg.response_type),
          '&xd_receiver=', encodeURIComponent(cfg.xd_receiver),
          '&ko_callback=', encodeURIComponent('CAPTURE.koCallback'),
          '&recover_password_callback=', encodeURIComponent(
              'CAPTURE.recoverPasswordStart')
        ].join('');

    CAPTURE.publicProfilePageUrl = function(uuid) {
        return [ cfg.capture_ui_server_url, '/oauth/public_profile',
                 '?uuid=',  encodeURIComponent(uuid)
               ].join('');
    };

    CAPTURE.ageLimitUrl = cfg.age_limit_url || CAPTURE.signinUrl;

    CAPTURE.createSession = function(token, fromCookie) {
        var accessToken = token,
            twoHoursInMS = 1000 * 60 * 60 * 2,
            sessionEnd = new Date((new Date).milliseconds + twoHoursInMS);

        if (accessToken && !fromCookie) {
            CAPTURE.util.setCookie('janrainToken', accessToken, (2.0/24.0));
        } else {
            accessToken = CAPTURE.util.getCookie('janrainToken');
        }

        CAPTURE.profilePageUrl =
            [ cfg.capture_ui_server_url, '/oauth/profile',
              '?xd_receiver=', encodeURIComponent(cfg.xd_receiver),
              '&client_id=',  encodeURIComponent(cfg.client_id),
              '&access_token=',  encodeURIComponent(accessToken)
            ].join('');

        if (cfg.callbacks.userUpdatedData) {
            CAPTURE.profilePageUrl += ('&callback=' +
                                    encodeURIComponent(
                                        'CAPTURE.userUpdatedData'));
            CAPTURE.profilePageUrl += ('&callback_payload=1');
        }
        if (modal.isOpen()) {
            modal.close();
        } else {
            // noop;
        }

        if (fromCookie) {
            CAPTURE.util.domReady(win, cfg.callbacks.userReturned || noop);
        } else {
            CAPTURE.util.domReady(win, cfg.callbacks.userSignedIn || noop);
        }
        CAPTURE.getUserData(accessToken);
    };

    CAPTURE.getUserData = function(accessToken) {
        this.util.domReady(win, cfg.callbacks.getUserDataStart || noop);

        var srcUrl = [
            cfg.capture_server_url, '/entity',
            '?access_token=', encodeURIComponent(accessToken),
            '&application_id=', encodeURIComponent(cfg.application_id),
            '&jsonp=', encodeURIComponent('CAPTURE.finishCreateSession')
        ].join('');
        this.util.jsonp(srcUrl);
    };

    CAPTURE.userUpdatedData = function(profileData) {
        CAPTURE.util.domReady(win, function () {
            (cfg.callbacks.userUpdatedData || noop)(profileData);
        });
    };

    CAPTURE.finishCreateSession = function(userData) {
        if (userData.error) {
            CAPTURE.invalidateSession();
            CAPTURE.token_expired();
            return;
        }
        var selectPhoto = function(photos, photoType) {
            for (i = 0; i < photos.length; i++) {
                if (photos[i].type == photoType) {
                    return photos[i].value;
                }
            }
            return null;
        };
        var data = {
            uuid: userData.result.uuid,
            displayName: userData.result.displayName,
            profilePhoto: selectPhoto((userData.result.photos || []), 'square_thumbnail'),
            avatarApprovalStatus: userData.result.photo_approval_status
        };
        this.util.setCookie('janrainProfile',
                            JSON.stringify(data),
                            (2.0 / 24.0)); // anytime longer than accessToken
        this.profileData = data;
        if (userData.transaction_state &&
            userData.transaction_state.capture &&
            userData.transaction_state.capture.password_recover) {
            CAPTURE.util.domReady(win, cfg.callbacks.recoverPasswordComplete || noop);
        }
        CAPTURE.util.domReady(win, cfg.callbacks.getuserDataFinish || noop);
    };

    CAPTURE.token_expired = function() {
        CAPTURE.util.domReady(win, cfg.callbacks.sessionExpired || noop);
    };

    CAPTURE.invalidateSession = function() {
        this.util.delCookie('janrainToken');
        this.util.delCookie('janrainProfile');
        (cfg.callbacks.sessionInvalidated || noop)();
    };

    CAPTURE.closeModal = function() {
        if (modal.isOpen()) {
            modal.close();
        }
    };

    CAPTURE.isLoggedIn = function() {
        if (this.util.getCookie('janrainToken')) {
            return true;
        } else {
            return false;
        }
    };

    CAPTURE.startModalLogin = function() {
        // launch modal with signinUrl
        if (CAPTURE.util.getCookie('janrainAgeLim') !== null) {
            window.top.location.href = this.ageLimitUrl;
        } else {
            var srcUrl = this.signinUrl;
        }
        signinFrame.src = srcUrl;
        signinFrame.frameborder = 0;
        signinFrame.height = '376px';
        signinFrame.width = '609px';
        signinFrame.scrolling = 'no';
        modal.setHeight(381)
            .setWidth(614)
            .addContent(signinFrame)
            .show();
    };

    CAPTURE.profileFrame = function() {
        var srcUrl = this.profilePageUrl;
        profileFrame.src = srcUrl;
        profileFrame.frameborder = 0;
        profileFrame.id = 'janrainProfile';
        profileFrame.height = '900px';
        profileFrame.width = '670px';
        profileFrame.scrolling = 'no';
        
        var frameborder = document.createAttribute('frameborder');
        frameborder.nodeValue = '0';
        profileFrame.setAttributeNode(frameborder);
        
        var allowtransparency = document.createAttribute('allowtransparency');
        allowtransparency.nodeValue = 'true';
        profileFrame.setAttributeNode(allowtransparency);

        return profileFrame;
    };

    CAPTURE.profilePasswordResetFrame = function() {
        var srcUrl = CAPTURE.profilePageUrl;
        profileFrame.src = srcUrl;
        profileFrame.frameborder = 0;
        profileFrame.id = 'janrainProfilePasswordReset';
        profileFrame.height = '600px';
        profileFrame.width = '950px';
        profileFrame.scrolling = 'no';

        return profileFrame;
    };

    CAPTURE.publicProfileFrame = function(uuid) {
        var uuid_ = uuid;
        if (typeof(uuid) === 'undefined') {
            uuid_ = JSON.parse(CAPTURE.util.getCookie('janrainProfile')).uuid;
        }
        var srcUrl = CAPTURE.publicProfilePageUrl(uuid_);
        profileFrame.src = srcUrl;
        profileFrame.id = 'janrainPublicProfile';
        profileFrame.height = '900px';
        profileFrame.width = '670px';
        profileFrame.scrolling = 'no';
        
        var frameborder = document.createAttribute('frameborder');
        frameborder.nodeValue = '0';
        profileFrame.setAttributeNode(frameborder);
        
        var allowtransparency = document.createAttribute('allowtransparency');
        allowtransparency.nodeValue = 'true';
        profileFrame.setAttributeNode(allowtransparency);

        return profileFrame;
    };

    CAPTURE.resize = function(jargs) {
        var args = JSON.parse(jargs);
        if (args.id == 'signin_link') {
            signinFrame.height = args.h + 'px';
            signinFrame.width = args.w + 'px';
            modal.setHeight(args.h + 5).setWidth(args.w + 5).center();
        } else if (args.id == 'profile_link') {
            profileFrame.height = args.h + 'px';
            profileFrame.widget = args.w + 'px';
        }
    };

    CAPTURE.koCallback = function() {
        var cookie = CAPTURE.util.getCookie('janrainAgeLim');
        if (cookie === null) {
            CAPTURE.util.setCookie('janrainAgeLim', 'limit', 1);
        }
        window.location.href = CAPTURE.ageLimitUrl;
    };

    // Callback fired after recover_password form is submitted
    // and user needs to be indicated to check their email
    // this is triggered by a redirect to the xdReceiver
    CAPTURE.recoverPasswordStart = function() {
        CAPTURE.util.domReady(win, cfg.callbacks.recoverPasswordStart || noop);
    };

    // This callback is triggered from createSession
    CAPTURE.recoverPasswordComplete = function () {
        CAPTURE.util.domReady(win, cfg.callbacks.recoverPasswordComplete || noop);
    };

    //For custom redirect url for email verification.
    // 'settings / set_default' api call for setting the
    // verify_email_redirect key with this url and params
    // (<domain>/oauth_redirect.html?email_verified=true)
    // this is triggered from oauth_redirect.html
    CAPTURE.emailVerified = function() {
        CAPTURE.util.domReady(win, cfg.callbacks.emailVerified || noop);
    };

    CAPTURE.util = {};
    CAPTURE.util.domReady = function contentLoaded(win, fn) {

        var done = false, top = true,

        doc = win.document, root = doc.documentElement,

        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
                try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
                init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
                if (doc.createEventObject && root.doScroll) {
                        try { top = !win.frameElement; } catch(e) { }
                        if (top) poll();
                }
                doc[add](pre + 'DOMContentLoaded', init, false);
                doc[add](pre + 'readystatechange', init, false);
                win[add](pre + 'load', init, false);
        }
    };

    CAPTURE.util.delCookie = function(name) {
        document.cookie = name +
            ' =; expires = Thu, 01 - Jan - 70 00: 00: 01 GMT; path = /';
    };
    CAPTURE.util.setCookie = function(name, value, days) {
        if (days) {
            var date = new Date(),
                daysInMS = days * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + daysInMS);
            var expires = '; expires = ' + date.toGMTString();
        }
        else {
            var expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path = / ';
    };
    CAPTURE.util.getCookie = function(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };


    CAPTURE.util.queryDict = function(queryStr) {
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function (s) {
                return decodeURIComponent(s.replace(a, " "));
            },
        queryDict = {};

        while ((e = r.exec(queryStr))) {
            queryDict[d(e[1])] = d(e[2]);
        }
        return queryDict;
    };

    CAPTURE.util.jsonp = function(srcUrl) {
        var scriptTag = document.createElement('script');
        scriptTag.type = "text/javascript";
        scriptTag.src = srcUrl;
        document.body.appendChild(scriptTag);
    };

    /* Below this point is modal window code, and a few initializers at
     * very bottom of the file.
     * */
    if (typeof window.janrain !== 'object') { window.janrain = {}; }
    if (typeof window.janrain.settings !== 'object') {
        window.janrain.settings = {};
    }

    CAPTURE.util.Modal = (function () {
        var _isMobile = (typeof window.orientation === 'number'),
            __previewMode = undefined,
            _quirksMode = document.compatMode !== 'CSS1Compat';
        /*
         *  Check if browser is IE, if browser is IE then return the version number.
         *
         */
        function isIE() {
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var userAgent = navigator.userAgent;
                var regExp = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (regExp.exec(userAgent) != null)
                    return parseFloat(RegExp.$1);
            }
            return false;
        }
        var _isIE = isIE();
        // compatability

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(value) {
                for (var key in this) {
                    if (this[key] === value) return parseInt(key);
                }
            };
        }

        // if (!Array.prototype.map) {
        //   Array.prototype.map = function(fun /*, thisp */) {
        //     "use strict";
        //     if (typeof this != 'function' || this === null)
        //       throw new TypeError();
        //     var t = new Object(this);
        //     var len = t.length >>> 0;
        //     if (typeof fun !== "function")
        //       throw new TypeError();

        //     var res = new Array(len);
        //     var thisp = arguments[1];
        //     for (var i = 0; i < len; i++) {
        //       if (i in t)
        //         res[i] = fun.call(thisp, t[i], i, t);
        //     }

        //     return res;
        //   };
        // }

        if (!String.prototype.trim) {
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g,"");
            };
        }

        // if (!String.prototype.ltrim) {
        //     String.prototype.ltrim = function() {
        //         return this.replace(/^\s+/,"");
        //     };
        // }

        // if (!String.prototype.rtrim) {
        //     String.prototype.rtrim = function() {
        //         return this.replace(/\s+$/,"");
        //     };
        // }

        // mobile
        // requires _shared,

        // requires _shared,

        var mobile = function(){
            var _viewportMetaTagContents;
            var _bodyStyle = document.createElement('div');
            var _element;
            var _firstTime = true;
            var _agent = navigator.userAgent.toLowerCase();
            var _mobileDevice = _agent.match(/(iphone|ipod|ipad|blackberry|android|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|playstation portable|sonyericsson|samsung|mobileexplorer|palmsource|benq|windows phone|windows mobile|iemobile|windows ce|nintendo wii)/i);
            var _onOrientationChange = _createEvent();

            function _init() {
                if (typeof window.orientation === 'undefined') return false;
                _copyStyle(document.body, _bodyStyle);
                _saveViewportMetaTagContents();
                _createHandheldFriendlyMetaTag();
                document.body.style.padding = '0px';
                document.body.style.margin = '0px';

                if (typeof window.onorientationchange === 'object') {
                    window.addEventListener("orientationchange", function() {
                        _orientationChangeHandler();
                        setTimeout(_orientationChangeHandler, 300);
                    }, false);
                    setTimeout(_orientationChangeHandler, 30);
                    window.addEventListener('beforeunload', function() {
                        window.removeEventListener('orientationchange', _orientationChangeHandler, false);
                    }, false);
                }
            }

            function _getMobileDevice() {
                if (_mobileDevice !== null) return _mobileDevice[0];
                return false;
            }

            function _deactivate() {
                // Have to set a timeout to help out Apple devices.
                setTimeout(function() {_setViewportMetaTagContents(_viewportMetaTagContents)}, 20);
                _copyStyle(_bodyStyle, document.body);
            }

            function _copyStyle(from, to) {
                for (var i = 0; i < from.style.length; i++) {
                    var name = from.style[i];
                    to.style.setProperty(name,
                                         from.style.getPropertyValue(name),
                                         from.style.getPropertyPriority(name));
                }
            }

            function _scale(initialScale) {
                var width = (window.orientation === 0) ? 'device-width' : 'device-height';
                if (!_setViewportMetaTagContents('width=' + width + ', initial-scale=' + initialScale + ', maximum-scale=1')) {
                    _createViewportMetaTag();
                    _setViewportMetaTagContents('width=' + width + ', initial-scale=' + initialScale + ', maximum-scale=1');
                }
            }

            function _orientationChangeHandler() {
                _scale(1);
                var defaultOrientation = true; //default orientation assumes that a window.orientation of 0 is portrait mode
                var isAndroid = _mobileDevice[0].match(/android/);
                var isApple = _mobileDevice[0].match(/(ipad|iphone|ipod)/);

                if (_getWindowDimensions().height > 600 && _firstTime && isAndroid && window.orientation === 0) window.innerHeight = 500;
                if (_getWindowDimensions().width > 800 && _firstTime && isAndroid && (window.orientation === 90 || window.orientation === -90)) {
                    window.innerWidth = 533;
                    window.innerHeight = 238;
                }

                if (window.orientation === 0 && _getWindowDimensions().height < _getWindowDimensions().width) defaultOrientation = false;
                if ((window.orientation === 90 || window.orientation === -90) && _getWindowDimensions().height > _getWindowDimensions().width) defaultOrientation = false;

                _firstTime = false;
                // Let's provide a custom event for orientationChange.

                if (window.orientation === 0) {
                    _onOrientationChange.fire({
                        orientation: defaultOrientation ? 'portrait' : 'landscape'
                    });
                    if (!_isOrientationCorrect() && isAndroid) {
                        window.innerWidth = 320;
                        window.innerHeight = 490;
                        setTimeout(_orientationChangeHandler, 300);
                    }
                }

                if (window.orientation === 90 || window.orientation === -90) {
                    _onOrientationChange.fire({
                        orientation: defaultOrientation ? 'landscape' : 'portrait'
                    });
                    if (!_isOrientationCorrect() && isAndroid) {
                        window.innerWidth = 533;
                        window.innerHeight = 238;
                        setTimeout(_orientationChangeHandler, 300);
                    }
                }
                _updateElement();
            }

            function _isOrientationCorrect() {
                var dims = _getWindowDimensions();
                if (window.orientation === 0 && (dims.width > dims.height)) return false;
                if ((window.orientation === 90 || window.orientation === -90) && (dims.height > dims.width)) return false;
                return true;
            }

            function _updateElement() {
                var dims = _getWindowDimensions();
                var scrollTop = _getScrollTop();
                var elementDimensions = _getElementDimensions(_element);

                _element.style.left = (Math.abs((dims.width - elementDimensions.width) / 2)) + 'px';
                _element.style.top = (Math.abs(((dims.height - elementDimensions.height) / 2)) + scrollTop) + 'px';
            }

            function _saveViewportMetaTagContents() {
                var viewport = _getViewportMetaTag();
                _viewportMetaTagContents = viewport.content;
            }

            function _getViewportMetaTag() {
                var metaElements = document.getElementsByTagName('meta');
                for (var i in metaElements) {
                    if (metaElements[i].name === 'viewport') return metaElements[i];
                }
                return false;
            }

            function _createViewportMetaTag() {
                if (typeof document.getElementsByTagName === 'undefined') return false;
                var head = document.getElementsByTagName("head")[0];
                var viewportMetaTag = document.createElement('meta');
                viewportMetaTag.setAttribute('name', 'viewport');
                head.appendChild(viewportMetaTag);
            }

            function _createHandheldFriendlyMetaTag() {
                if (typeof document.getElementsByTagName === 'undefined') return false;
                var head = document.getElementsByTagName('head')[0];
                var handheldFriendlyMetaTag = document.createElement('meta');
                handheldFriendlyMetaTag.setAttribute('name', 'HandheldFriendly');
                handheldFriendlyMetaTag.content = 'true';
            }

            function _removeViewportMetaTag() {
                var viewportMetaTag = _getViewportMetaTag();
                var head = document.getElementsByTagName("head")[0];
                head.removeChild(viewportMetaTag);
            }

            function _setViewportMetaTagContents(value) {
                var viewport = _getViewportMetaTag();
                if (!viewport) return false;
                if (typeof value === 'undefined') _removeViewportMetaTag();
                viewport.content = value;
                return true;
            }

            return {
                setElement: function(element) {
                    _element = element;
                    return this;
                },
                onOrientationChange: _onOrientationChange,
                getMobileDevice: function() {
                    return _getMobileDevice();
                },
                activate: function() {
                    _init();
                },
                deactivate: function() {
                    _deactivate();
                }
            };
        }();

        // events
        // Simple Event System
        function _createEvent() {
            var event = new _Event();
            return event;
        }

        function _Event() {
            this.eventHandlers = new Array();
        }

        _Event.prototype.addHandler = function(eventHandler) {
            this.eventHandlers.push(eventHandler);
        };

        _Event.prototype.fire = function(args) {
            for(var i = 0; i < this.eventHandlers.length; i++) {
                try {
                    this.eventHandlers[i](args);
                } catch(err) {
                    errors.log(err);
                    errors.show();
                }

            }
        };

        janrain.events = {};
        // _errors

        var errors = function() {

            var _errorLog = [];

            function _log(errorMessage) {
                var error = {};
                error.id = _errorLog.length + 1;
                error.message = errorMessage;
                _errorLog.push(error);
            }

            function _showErrors() {
                if (_errorLog.length == 0) return false;
                for (var i in _errorLog) {
                    if (typeof _errorLog[i].id !== 'undefined') {
                        var error = _errorLog.pop();
                        if (typeof console === 'object') {
                            console.warn('ERROR ID:' + error.id + ' MESSAGE: ' + error.message);
                        }
                    }
                }
                _errorLog = [];
            }

            return {
                log: function(errorMessage) {
                    _log(errorMessage);
                    return this;
                },
                show: function() {
                    _showErrors();
                }
            };
        }();


        // Requires _errors
        // _shared
        function _Cookie() {
            var _expiration,
                _name,
                _value,
                _domain,
                _path = '/';

            function _createCookie() {
                var domain = (_domain) ? "; domain=" + _domain : "";
                document.cookie = _name + "=" + _value + ";expires=" + _expiration + domain + "; path=" + _path;
            }

            function _getCookie(name) {
                var cookies,
                    cookieSize,
                    cookie,
                    cookieInfo,
                    key,
                    value;

                cookies = document.cookie.split(';');
                cookieSize = cookies.length;
                for (var i = 0; i < cookieSize; i++) {
                    cookie = cookies.pop();
                    cookieInfo = cookie.split('=');
                    key = cookieInfo[0];
                    value = cookieInfo[1];

                    if (key.trim() === name) return value;
                }
                return false;
            }

            return {
                create: _createCookie,
                setExpiration: function(daysToExpire) {
                    if (daysToExpire) {
                        daysToExpire = daysToExpire * 86400000;
                        var date = new Date();
                        date.setTime(date.getTime() + (daysToExpire));
                        _expiration = date.toGMTString();
                    }
                    return this;
                },
                setName: function(name) {
                    if (name) {
                        _name = name;
                    }
                    return this;
                },
                setValue: function(value) {
                    if (value) {
                        _value = value;
                    }
                    return this;
                },
                setPath: function(path) {
                    if (path) {
                        _path = path;
                    }
                    return this;
                },
                setDomain: function(domain) {
                    if (domain) {
                        _domain = domain;
                    }
                    return this;
                },
                getCookie: function(name) {
                    return _getCookie(name);
                }
            };
        }

        function _setRadius(element, value, leftTopValue, rightTopValue, rightBottomValue, leftBottomValue) {
            if (typeof leftTopValue === 'number' &&
                typeof rightTopValue === 'number' &&
                typeof rightBottomValue === 'number' &&
                typeof leftBottomValue === 'number') {

                if (typeof element.style.borderRadius !== 'undefined') element.style.borderRadius = leftTopValue + 'px ' + rightTopValue + 'px ' + rightBottomValue + 'px ' + leftBottomValue + 'px';
                if (typeof element.style.MozBorderRadius !== 'undefined') element.style.MozBorderRadius = leftTopValue + 'px ' + rightTopValue + 'px ' + rightBottomValue + 'px ' + leftBottomValue + 'px';
                if (typeof element.style.webkitBorderRadius !== 'undefined') element.style.webkitBorderRadius = leftTopValue + 'px ' + rightTopValue + 'px ' + rightBottomValue + 'px ' + leftBottomValue + 'px';
            } else {
                if (typeof element.style.borderRadius !== 'undefined') element.style.borderRadius = value + 'px';
                if (typeof element.style.MozBorderRadius !== 'undefined') element.style.MozBorderRadius = value + 'px';
                if (typeof element.style.webkitBorderRadius !== 'undefined') element.style.webkitBorderRadius = value + 'px';
            }

            return element;
        }

        function _setBottomRadius(element, value) {
            return _setRadius(element, null, 0, 0, value, value);
        }

        function _setTopRadius(element, value) {
            return _setRadius(element, null, value, value, 0, 0);
        }

        function _setRightRadius(element, value) {
            return _setRadius(element, null, 0, value, value, 0);
        }

        function _setLeftRadius(element, value) {
            return _setRadius(element, null, value, 0, 0, value);
        }

        function _getInnerBorderRadius(borderRadius, borderWidth) {
            if (typeof borderRadius === 'undefined') return false;
            if (typeof borderWidth === 'undefined') return false;
            var innerRadius = borderRadius - borderWidth;
            if (innerRadius < 0) innerRadius = 0;
            if (innerRadius > borderRadius) innerRadius = borderRadius;
            return innerRadius;
        }

        function _setOpacity(element, value) {
            if (typeof element.style.filter !== 'undefined') element.style.filter = 'alpha(opacity=' + value*100 + ')';
            if (typeof element.style.opacity !== 'undefined') element.style.opacity = value;
            if (typeof element.style.KhtmlOpacity !== 'undefined') element.style.KhtmlOpacity = value;
            if (typeof element.style.MozOpacity !== 'undefined') element.style.MozOpacity = value;
        }

        function _setLinearGradient(element, value) {
            if ((_isIE && _isIE <= 9) || _mobileDevice) {
                element.style.backgroundImage = "url('" + '/images/auth/btn_bg.png' + "')"; // CDNME
                return true;
            }
            element.style.backgroundImage = "-moz-linear-gradient(" + value + ")";
            element.style.backgroundImage = "-webkit-linear-gradient(" + value + ")";
            element.style.backgroundImage = "-ms-linear-gradient(" + value + ")";
            element.style.backgroundImage = "-o-linear-gradient(" + value + ")";
            element.style.backgroundImage = "linear-gradient(" + value + ")";
        }

        function _setBorderOpacity(element, borderWidth, color, opacity) {
            // We'll convert the color to rgb if it's a hex.
            var rgb = _convertHexToRGBA(color);
            var rgba = _convertHexToRGBA(color, opacity);
            if (borderWidth > 0) {
                element.style.backgroundColor = rgb;
                element.style.padding = borderWidth + 'px';
                if (_isIE > 0 && _isIE <= 8 || (_isIE && _quirksMode)) return false;
                element.style.backgroundColor = rgba;
                element.style.padding = borderWidth + 'px';
            } else {
                element.style.backgroundColor = '';
                element.style.padding = '0px';
            }
        }

        function _convertHexToRGBA(hex, opacity) {
            if (hex.charAt(0) !== '#') return hex;
            hex = hex.substring(1, 7);
            var r = parseInt(hex.substring(0,2), 16);
            var g = parseInt(hex.substring(2,4), 16);
            var b = parseInt(hex.substring(4,6), 16);
            if (isNaN(opacity)) return 'rgb(' + r + ',' + g + ',' + b + ')';
            return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        }

        function _hasFeature(element, feature) {
            if (typeof element.feature !== 'undefined') return true;
            if (feature === 'radius') {
                if (typeof element.style.borderRadius !== 'undefined') return true;
                if (typeof element.style.MozBorderRadius !== 'undefined') return true;
                if (typeof element.style.webkitBorderRadius !== 'undefined') return true;
            }

            return false;
        }

        function _addListener(element, type, listener) {
            if (typeof window.attachEvent === 'object') {
                element.attachEvent('on' + type, listener);
            } else {
                element.addEventListener(type, listener, false);
            }
        }

        function _insertCss() {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');

            var css;

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                var cssText = document.createTextNode(css);
                style.appendChild(cssText);
            }

            if (document.body.firstChild) {
                document.body.insertBefore(style, document.body.firstChild);
            } else {
                document.body.appendChild(style);
            }
        }

        function _getWindowDimensions() {
            var width,
                height;

            if (typeof window.innerWidth != 'undefined') {
                width = window.innerWidth;
                height = window.innerHeight;
            } else {
                width = document.documentElement.offsetWidth;
                height = document.documentElement.offsetHeight;
            }
            return {
                width: width,
                height: height
            };
        }

        function _getScrollTop() {
            if (document.documentElement.scrollTop >= document.body.scrollTop) {
                return document.documentElement.scrollTop;
            } else {
                return document.body.scrollTop;
            }
        }

        function _getElementDimensions(element) {
            return {
                width: parseInt(element.style.width),
                height: parseInt(element.style.height)
            };
        }

        function _dataValidation(type, range, defaultValue, value, suppressError) {

            var FILTER = /rgb\(\s*\d+,\s*\d+,\s*\d+\s*\)|#[a-f0-9A-F]{1,6}|[^\u0000-\u0080]+|^[0-9a-zA-Z?,.!&\s]+$/;
            if (typeof value === 'string' && value.length == 0) value = ' ';
            if (!FILTER.test(value)) {
                if (!suppressError) errors.log(value + ' contains invalid character(s)');
                return defaultValue;
            }

            if (type === 'boolean') {
                if (typeof value === 'boolean') {
                    return value;
                } else {
                    if (!suppressError) errors.log(value + ' is wrong type, must be boolean, using default value instead');
                    return defaultValue;
                }
            }

            if (type === 'text') {
                return value;
            }

            if (type === 'number') {
                if (isNaN(parseInt(value))) {
                    if (!suppressError) errors.log(value + ' is wrong type, must be a valid number');
                    return defaultValue;
                } else {
                    value = parseFloat(value);
                }
            }

            if (type === 'color') {
                if (value.substring(0,3) === 'rgb') {
                    return value;
                }
                if (value.substring(0,1) === '#') {
                    return value;
                }
                if (value === 'transparent') {
                    return value;
                }
                if (!suppressError) errors.log('Value of "' + value + '" for ' + arguments.callee.caller.name + ' is not a valid value, using default value of "' + defaultValue + '" instead');
                return defaultValue;
            }

            if (typeof value != type && type != 'color') {
                if (!suppressError) errors.log(value + ' for ' + arguments.callee.caller.name + ' is ' + (typeof value) + ' expected ' + type);
                return defaultValue;
            }

            if (typeof range === 'object' && type === 'string') {
                if (typeof range.indexOf(value) === 'number') {
                    return value;
                } else {
                    if (!suppressError) errors.log('Value of "' + value + '" for ' + arguments.callee.caller.name + ' is not a valid value, using default value of "' + defaultValue + '" instead');
                    return defaultValue;
                }
            }

            if (typeof range === 'object' && type === 'number') {
                if (range.length === 2) {
                    var min = range[0];
                    var max = range[1];
                } else {
                    var min = range.shift();
                    var max = range.pop();
                    var values = range;
                }

                if (value < min) {
                    if (!suppressError) errors.log('Value of ' + value + ' for ' + arguments.callee.caller.name + ' is below minimum of ' + min);
                    return min;
                }

                if (value > max) {
                    if (!suppressError) errors.log('Value of ' + value + ' for ' + arguments.callee.caller.name + ' is above maximum of ' + max);
                    return max;
                }

                if (values && typeof values.indexOf(value) === 'number') {
                    return value;
                } else if (value == min || value == max){
                    return value;
                } else if (!values) {
                    return value;
                } else {
                    if (!suppressError) errors.log('Value of ' + value + ' for ' + arguments.callee.caller.name + ' is not a valid value, using default value of ' + defaultValue + ' instead');
                    return defaultValue;
                }
            }

            if (value != 0 && !value) return defaultValue;
            return value;
        }


        // _modal


        //Requires _shared.erb

        function _Modal() {
            var _DEFAULT_WIDTH = 380;
            var _DEFAULT_HEIGHT = 131;
            var _modalDiv,
                _id = 'janrainModal',
                _content,
                _backgroundDiv,
                _closeButton,
                _width = _DEFAULT_WIDTH,
                _height = _DEFAULT_HEIGHT,
                _borderWidth = '0',
                _borderColor = '#fff',
                _borderRadius = '0',
                _borderOpacity = '1',
                _backgroundZIndex = 1000000,
                _orientation = 'landscape';


            if (!window.janrain.events.onModalClose) window.janrain.events.onModalClose = _createEvent();
            var _onClose = _createEvent();
            var _onShow = _createEvent();
            var _onBorderRadiusChange = _createEvent();
            var _onBorderWidthChange = _createEvent();
            var _onOrientationChange = _createEvent();

            mobile.onOrientationChange.addHandler(function(response) {
                _setOrientation(response.orientation);
            });

            function _init() {
                _modalDiv = _createModalDiv();
                _backgroundDiv = _createBackgroundDiv();
                _closeButton = _createCloseButton();
                _modalDiv.appendChild(_closeButton);
                document.body.appendChild(_backgroundDiv);
                document.body.appendChild(_modalDiv);
            }

            function _createModalDiv() {
                _modalDiv = document.createElement('div');
                _modalDiv.id = _id;
                _modalDiv.style.width = _width + 'px';
                _modalDiv.style.height = _height + 'px';
                _modalDiv.style.position = 'absolute';
                _modalDiv.style.padding = _borderWidth + 'px';
                _setRadius(_modalDiv, _borderRadius);
                _setBorderOpacity(_modalDiv, _borderWidth, _borderColor, _borderOpacity);
                _modalDiv.style.zIndex = 1000001;
                _modalDiv.style.display = 'none';

                return _modalDiv;
            }

            function _createCloseButton() {
                var closeButton = document.createElement('img');
                closeButton.style.height = '27px';
                closeButton.style.position = 'absolute';
                closeButton.style.right = '-7px';
                closeButton.style.top = '-10px';
                closeButton.style.width = '27px';
                closeButton.style.cursor = "pointer";
                closeButton.style.zIndex = 1000002;
                closeButton.src = 'http://media.americanidol.com/ui/janrain/close_ai.png'; // CDNME

                closeButton.onclick = _close;
                return closeButton;
            }

            function _close() {
                if (!__previewMode) _hide();
                if (_isMobile) mobile.deactivate();
                janrain.events.onModalClose.fire();
                _onClose.fire();
            }

            function _hide() {
                _modalDiv.style.display = 'none';
                _content.style.display = 'none';
                _backgroundDiv.style.display = 'none';
            }

            function _createBackgroundDiv() {
                _backgroundDiv = document.createElement('div');
                _backgroundDiv.style.width = '100%';
                _backgroundDiv.style.left = 0;
                _backgroundDiv.style.top = 0;
                _backgroundDiv.style.backgroundColor = '#000000';
                _backgroundDiv.style.position = 'absolute';
                _setOpacity(_backgroundDiv, '0.4');
                _backgroundDiv.style.display = 'none';
                _backgroundDiv.style.zIndex =  _backgroundZIndex;
                return _backgroundDiv;
            }

            function _centerElement(element) {
                var windowDimensions = _getWindowDimensions();
                var scrollTop = _getScrollTop();
                var elementDimensions = _getElementDimensions(element);

                element.style.left = (Math.abs((windowDimensions.width - elementDimensions.width) / 2)) + 'px';
                element.style.top = (Math.abs(((windowDimensions.height - elementDimensions.height) / 2)) + scrollTop) + 'px';

                _backgroundDiv.style.height = windowDimensions.height + scrollTop + 'px';

                if (element.style.position !== "absolute") element.style.position = "absolute";
            }

            function _center() {
                if (!__previewMode) {
                    if (_modalDiv) _centerElement(_modalDiv);
                } else {
                    var previewModeDiv = document.getElementById('previewMode');
                    previewModeDiv.style.position = 'relative';
                    previewModeDiv.appendChild(_modalDiv);
                }

                if (!__previewMode) errors.show();
            }

            function _remove() {
                if (__previewMode) {
                    var previewModeDiv = document.getElementById('previewMode');
                    if (typeof _closeButton === 'object') _modalDiv.removeChild(_closeButton);
                    if (typeof _modalDiv === 'object') previewModeDiv.removeChild(_modalDiv);
                    if (typeof _backgroundDiv === 'object') document.body.removeChild(_backgroundDiv);
                    var janrainEmbed = document.getElementById('janrainEngageEmbed_old');
                    if (janrainEmbed) {
                        janrainEmbed.id = 'janrainEngageEmbed';
                    }
                    _modalDiv = '';
                    _backgroundDiv = '';
                } else {
                    if (typeof _closeButton === 'object') _modalDiv.removeChild(_closeButton);
                    if (typeof _backgroundDiv === 'object') document.body.removeChild(_backgroundDiv);
                    if (typeof _modalDiv === 'object') document.body.removeChild(_modalDiv);
                }
            }

            function _setModalBorderWidth(width) {
                _borderWidth = _dataValidation('number', [0, 20], 20, width);
                _onBorderWidthChange.fire({radius: _getInnerBorderRadius(_borderRadius, _borderWidth)});
            }

            function _setModalBorderColor(color) {
                _borderColor = _dataValidation('color', null, '#000000', color);
            }

            function _setModalBorderRadius(radius) {
                _borderRadius = _dataValidation('number', [0, 20], 20, radius);
                _onBorderRadiusChange.fire({radius: _getInnerBorderRadius(_borderRadius, _borderWidth), refresh: true});
            }

            function _setModalBorderOpacity(opacity) {
                _borderOpacity = _dataValidation('number', [0, 1], 0.5, opacity);
                if (typeof _modalDiv == 'object') _setBorderOpacity(_modalDiv, _borderWidth, _borderColor, _borderOpacity);
            }

            function _setOrientation(value) {
                _returnExperienceLoaded = false;
                if (value === 'portrait') {
                    _orientation = 'portrait';
                    var format = 'one column';
                }
                if (value === 'landscape') {
                    _orientation = 'landscape';
                    var format = 'two column';
                }

                // onOrientationChange is also fired from mobile, but we want this to buble up with additinal information.
                _onOrientationChange.fire({
                    orientation: _orientation,
                    format: format,
                    width: _DEFAULT_WIDTH,
                    height: _DEFAULT_HEIGHT
                });
                _center();
            }

            function _updateOrientation(event) {
                var windowDimensions = _getWindowDimensions();
                if (windowDimensions.width >= windowDimensions.height && typeof window.orientation === 'undefined') {
                    if (_orientation !== 'landscape') _setOrientation('landscape');
                } else if (window.orientation === 90 || window.orientation === -90) {
                    // We only want to set the orientation if it's different from what is already set.
                    if (_orientation !== 'landscape') _setOrientation('landscape');
                } else {
                    if (_orientation !== 'portrait') _setOrientation('portrait');
                }
            }

            function _setWidth(width) {
                if (width) _width = width;
                if (_isIE && _quirksMode) _width = _width + (_borderWidth - 2);
                if (typeof _modalDiv == 'object') _modalDiv.style.width = _width + 'px';
                return this;
            }

            function _setHeight(height) {
                if (height) _height = height;
                if (_isIE && _quirksMode) _height = _height + (_borderWidth * 2) - 4;
                if (height && typeof _modalDiv == 'object') _modalDiv.style.height = _height + 'px';
                return this;
            }

            function _getState() {
                return {
                    // width: _width,
                    borderWidth: _borderWidth,
                    borderColor: _borderColor,
                    borderRadius: _borderRadius,
                    borderOpacity: _borderOpacity,
                    orientation: _borderOpacity
                };
            }

            function _setState(state) {
                if (_hasPermission('customizable_auth_widget_styling')) {
                    // _width = state.width;
                    if (typeof state.borderWidth !== 'undefined') _setModalBorderWidth(state.borderWidth);
                    if (typeof state.borderColor !== 'undefined') _setModalBorderColor(state.borderColor);
                    if (typeof state.borderOpacity !== 'undefined') _setModalBorderOpacity(state.borderOpacity);
                    if (typeof state.orientation !== 'undefined') _setOrientation(state.orientation);
                    if (typeof state.borderRadius !== 'undefined') {
                        if (typeof state.borderRadius == 'string' || typeof state.borderRadius == 'number') _setModalBorderRadius(state.borderRadius);
                        if (typeof _modalDiv == 'object') _setRadius(_modalDiv, _borderRadius);
                    }
                }
            }

            function _updateModal() {
                _updateOrientation();
                _center();
            }

            var _isOpen = false;

            return {
                setWidth: function(width) {
                    _setWidth(width);
                    return this;
                },
                setHeight: function(height) {
                    _setHeight(height);
                    return this;
                },
                setBorder: function(value) {
                    if (typeof value == 'string' || typeof value == 'number') _setModalBorderWidth(value);
                    if (typeof _modalDiv == 'object') _setBorderOpacity(_modalDiv, _borderWidth, _borderColor, _borderOpacity);
                    return this;
                },
                setBorderColor: function(color) {
                    if (color) _setModalBorderColor(color);
                    if (typeof _modalDiv == 'object') _setBorderOpacity(_modalDiv, _borderWidth, _borderColor, _borderOpacity);
                    return this;
                },
                setBorderRadius: function(radius) {
                    if (typeof radius == 'string' || typeof radius == 'number') _setModalBorderRadius(radius);
                    if (typeof _modalDiv == 'object') _setRadius(_modalDiv, _borderRadius);
                    return this;
                },
                setBorderOpacity: function(opacity) {
                    if (typeof opacity === 'number' || typeof opacity === 'string') _setModalBorderOpacity(opacity);
                    return this;
                },
                setZIndex: function(zIndex) {
                    _backgroundDiv.style.zIndex = zIndex;
                },
                setPreviewMode: function(value) {
                    if (typeof value === 'boolean') __previewMode = value;
                    return this;
                },
                setId: function(value) {
                    _id = value;
                    return this;
                },
                show: function() {
                    _modalDiv.style.display = 'block';
                    if (typeof _content == 'object') _content.style.display = 'block';

                    if (!__previewMode) {
                        _backgroundDiv.style.display = 'block';
                        if (_isMobile) {
                            mobile.setElement(_modalDiv).activate();
                        } else {
                            _addListener(window, 'resize', _updateModal);
                            _updateModal();
                        }
                    }

                    _isOpen = true;
                    _onBorderRadiusChange.fire({radius: _getInnerBorderRadius(_borderRadius, _borderWidth), refresh: false});
                    _onShow.fire();
                    _modalDiv.focus();
                },
                close: function() {
                    _isOpen = false;
                    _close();
                },
                center: function() {
                    _center();
                },
                refresh: function() {
                    if (!_configureMode) _modalDiv.appendChild(_closeButton);
                    _center();
                },
                remove: function() {
                    _remove();
                },
                addContent: function(content) {
                    _content = content;
                    _content.style.display = 'none';
                    if (!_modalDiv) _init();

                    _modalDiv.appendChild(_content);
                    if (__previewMode) _center();
                    return this;
                },
                getBorderWidth: function() {
                    return _borderWidth;
                },
                getState: function() {
                    return _getState();
                },
                setState: function(state) {
                    _setState(state);
                },
                onClose: _onClose,
                onShow: _onShow,
                onOrientationChange: _onOrientationChange,
                onBorderRadiusChange: _onBorderRadiusChange,
                onBorderWidthChange: _onBorderWidthChange,
                isOpen: function() {
                    return _isOpen;
                }
            };
        };
        return _Modal;
    })({});

    // init a few things here
    var modal = new CAPTURE.util.Modal();
    var signinFrame = document.createElement('iframe');
    var profileFrame = document.createElement('iframe');
    if (CAPTURE.isLoggedIn()) {
        CAPTURE.createSession(CAPTURE.util.getCookie('janrainToken'), true);
    } else {
        (cfg.callbacks.userNotSignedIn || noop)();
    }
    (cfg.callbacks.captureInitalized || noop)(CAPTURE);
};
