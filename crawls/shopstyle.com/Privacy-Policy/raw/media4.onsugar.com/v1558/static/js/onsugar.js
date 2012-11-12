var ONSUGAR = ONSUGAR || {};

ONSUGAR.UserProfile = ONSUGAR.UserProfile || function () {

        // Platforms
	    var UA_WINDOWS = 'win',
            UA_MAC = 'mac',
            UA_LINUX = 'linux',
            UA_ANDROID =  'android',
            UA_IPHONE = 'iphone',
            UA_IPAD = 'ipad';

        // Browsers
        var UA_CHROME = 'chrome',
            UA_SAFARI = 'safari',
            UA_FIREFOX = 'firefox',
            UA_OPERA = 'opera',
            UA_KONQUEROR = 'konqueror',
            UA_IE = 'ie',
            UA_IE6 = 'ie 6',
            UA_IE7 = 'ie 7',
            UA_IE8 = 'ie 8',
            UA_IE9 = 'ie 9';
            UA_SILK = 'silk';

        // Rendering Engines
        var UA_GECKO = 'gecko',
            UA_WEBKIT = 'webkit',
            UA_TRIDENT = 'trident';

        var TEST_COOKIE = 'testCookie';

        var userAgent = navigator.userAgent.toLowerCase();
        var userAgentContains = function (str) {
            if (userAgent.indexOf(str) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        var acceptsCookies = null;

        return {
            isWindows: function () {
                return userAgentContains(UA_WINDOWS);
            },

            isMac: function () {
                return userAgentContains(UA_MAC);
            },

            isLinux: function () {
                return userAgentContains(UA_LINUX);
            },

            isIPhone: function() {
                return userAgentContains(UA_IPHONE);
            },

            isIPad: function() {
                return userAgentContains(UA_IPAD);
            },

            isAndroid: function() {
                return userAgentContains(UA_ANDROID);
            },

            isChrome: function() {
                return userAgentContains(UA_CHROME);
            },

            isSafari: function() {
                return userAgentContains(UA_SAFARI) && !this.isChrome();
            },

            isFirefox: function() {
                return userAgentContains(UA_FIREFOX);
            },

            isOpera: function() {
                return userAgentContains(UA_OPERA);
            },

            isKonqueror: function() {
                return userAgentContains(UA_KONQUEROR);
            },

            isGecko: function() {
                return userAgentContains(UA_GECKO);
            },

            isWebkit: function() {
                return userAgentContains(UA_WEBKIT);
            },

            isTrident: function() {
                return userAgentContains(UA_TRIDENT);
            },

            isIE: function() {
                return userAgentContains(UA_IE);
            },

            isIE6: function() {
                return userAgentContains(UA_IE6);
            },

            isIE7: function() {
                return userAgentContains(UA_IE7);
            },

            isIE8: function() {
                return userAgentContains(UA_IE8);
            },

            isIE9: function() {
                return userAgentContains(UA_IE9);
            },

            isSilk: function() {
                return userAgentContains(UA_SILK);
            },

            isOnline: function() {
                return navigator.onLine;
            },

            isMobile: function () {
                return this.isIPhone() || this.isIPad() || this.isAndroid();
            },

            supportsHTML5Video: function() {
                return this.isIPhone() || this.isIPad();
            },

            acceptsCookies: function() {
                if (acceptsCookies === null) {
                    ONSUGAR.Util.setCookie(TEST_COOKIE, '1');
                    cookie = ONSUGAR.Util.getCookie(TEST_COOKIE);
                    if (cookie == '1') {
                        acceptsCookies = true;
                    }
                    else {
                        acceptsCookies = false;
                    }
                    ONSUGAR.Util.deleteCookie(TEST_COOKIE);
                }
                return acceptsCookies;
            },

            isShopStyleMobileApp: function() {
                var cookie = readCookie('Within_ShopStyle_iOS_App');
                if (cookie == 1) {
                    return true;
                }
                else {
                    return false;
                }
            },

            buildHTMLClassName: function() {
                var html = document.getElementsByTagName('html')[0];

                var classString = html.className + ' ';

                var stripSpaces = function (str) {return str.split(/\s+/).join('');};

                classString += (this.isWindows() ? UA_WINDOWS + ' ' : '');
                classString += (this.isMac() ? UA_MAC + ' ' : '');
                classString += (this.isLinux() ? UA_LINUX + ' ' : '');
                classString += (this.isIPhone() ? UA_IPHONE + ' ' : '');
                classString += (this.isIPad() ? UA_IPAD + ' ' : '');
                classString += (this.isAndroid() ? UA_ANDROID + ' ' : '');

                classString += (this.isChrome() ? UA_CHROME + ' ' : '');
                classString += (this.isSafari() ? UA_SAFARI + ' ' : '');
                classString += (this.isFirefox() ? UA_FIREFOX + ' ' : '');
                classString += (this.isKonqueror() ? UA_KONQUEROR + ' ' : '');
                classString += (this.isOpera() ? UA_OPERA + ' ' : '');
                classString += (this.isIE() ? UA_IE + ' ' : '');
                classString += (this.isIE6() ? stripSpaces(UA_IE6) + ' ' : '');
                classString += (this.isIE7() ? stripSpaces(UA_IE7) + ' ' : '');
                classString += (this.isIE8() ? stripSpaces(UA_IE8) + ' ' : '');
                classString += (this.isIE9() ? stripSpaces(UA_IE9) + ' ' : '');

                classString += (this.isGecko() && !this.isWebkit() ? UA_GECKO + ' ' : '');
                classString += (this.isWebkit() ? UA_WEBKIT + ' ' : '');
                classString += (this.isTrident() ? UA_TRIDENT + ' ' : '');

                classString += 'js';

                html.className = classString;

                this.buildHTMLClassName = function() {};
            },

            supportsGeoLocation: function () {
                if (navigator.geolocation.getCurrentPosition) {
                    return true;
                }
                else {
                    return false;
                }
            },

            getGeoLocation: function(success, failure) {
                if (ONSUGAR.UserProfile.supportsGeoLocation()) {
                    if (failure !== undefined) {
                        navigator.geolocation.getCurrentPosition(success, failure);
                    }
                    else {
                        navigator.geolocation.getCurrentPosition(success);
                    }
                }
            }
        };
}();

ONSUGAR.Event = ONSUGAR.Event || function() {

    var eventRegistry = {};

    var createResponder = function(element, eventName, handler) {
        var responder;
        responder = function(event) {
            handler.call(element, event);
        };
        return responder;
    }

    return {
        observe: function(element, eventName, handler) {
            element = typeof element == 'object' ? element : document.getElementById(element);

            var responder = createResponder(element, eventName, handler);

            if (!responder) return element;

            if (element.addEventListener) {
                element.addEventListener(eventName, responder, false);
            }
            else {
                element.attachEvent("on" + eventName, responder);
            }

            return element;
        },

        registerEventHandler: function(eventName, handler) {
            if (eventRegistry[eventName] === undefined) {
                eventRegistry[eventName] = {};
                eventRegistry[eventName]['handlers'] = [];
            }
            eventRegistry[eventName]['handlers'].push(handler);
            if (eventName.indexOf('loaded') >= 0 && eventRegistry[eventName]['loaded'] === true) {
                handler.call(window, eventRegistry[eventName]);
            }
        },

        fire: function(eventName) {
            if (eventRegistry[eventName] === undefined) {
                eventRegistry[eventName] = {};
                eventRegistry[eventName]['handlers'] = [];
            }
            else {
                var handlers = eventRegistry[eventName]['handlers'] || [];

                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].call(window, eventRegistry[eventName]);
                }
            }

            if (eventName.indexOf('loaded') >= 0) {
                eventRegistry[eventName]['loaded'] = true;
            }
        }
    }
}();

ONSUGAR.Util = ONSUGAR.Util || function() {

    var _blankfun = function () { throw new Error('This function has been called twice.'); };
    var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
                                    typeof JSON.parse === 'function' &&
                                    JSON.parse('{"test": true}').test;

    var evalJSON = function(input) {
        return eval ('(' + input + ')');
    };

    // cache object for searching duplicates
    var reClassNameCache = {};

    var getHTTPObject = function() {
        var http = false;
        if(typeof ActiveXObject != 'undefined') {
                try {http = new ActiveXObject("Msxml2.XMLHTTP");}
                catch (e) {
                        try {http = new ActiveXObject("Microsoft.XMLHTTP");}
                        catch (E) {http = false;}
                }
        } else if (window.XMLHttpRequest) {
                try {http = new XMLHttpRequest();}
                catch (e) {http = false;}
        }
        return http;
    };

    var trimAntiCSRFResponse = function (input) {
        var index = input.indexOf('\n');
        if ( index > 0 ) {
            return input.substring(index + 1, input.length);
        }
        return null;
    };

    return {
        hasClass: function(element, class_name) {
            var pattern = new RegExp("(^| )" + class_name + "( |$)");
            //ternary to choose
            return pattern.test(element.className) ? true : false;
        },

        addClass: function(element, class_name) {
            var i;
            //is the element array-like?
            if(element.length) {
                for (i = 0; i < element.length; i++) {
                    if (!X.hasClass(element[i], class_name)) {
                        element[i].className += element[i].className === "" ?
                        class_name : " "+class_name;
                    }
                }
            }
            else { //not array-like
                if (!X.hasClass(element, class_name)) {
                    element.className += element.className === "" ?
                        class_name : " "+class_name;
                }
            }
            return element;
        },

        // reusable regex for searching classnames
        getClassRegEx: function(c) {
            // check to see if regular expression already exists
            var re = reClassNameCache[c];

            if (!re) {
                re = new RegExp('(?:^|\\s+)' + c + '(?:\\s+|$)');
                reClassNameCache[c] = re;
            }

            return re;
        },

        // search for elements with a particular class and optionally perform an action on them
        getByClass: function(c, tag, root, apply) {
            var tag = tag || '*';
            var root = root || document;

            var nodes = [];
            var elements = root.getElementsByTagName(tag);
            var re = ONSUGAR.Util.getClassRegEx(c);

            for (var i = 0, len = elements.length; i < len; ++i) {
                if (re.test(elements[i].className)) {
                    nodes[nodes.length] = elements[i];

                    if (apply) {
                        apply.call(elements[i], elements[i]);
                    }

                }
            }
            return nodes;
        },

        numberAddCommas: function(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },

        getCookie: function(key, nounescape) {
            var nounescape = nounescape || false;
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var kv = cookies[i].split('=');
                var k = kv[0];
                var v = kv[1];
                while (k.charAt(0) == ' ') k = k.substring(1, k.length);
                if (k == key) {
                    if (nounescape) {
                        return v;
                    }
                    else {
                        return unescape(v);
                    }
                }
            }
            return null;
        },

        setCookie: function(key, value, options, noescape) {
            var options = options || {};
            var noescape = noescape || false;
            var expires = options.expires || false;
            var path = options.path || false;
            var domain = options.domain || false;
            var secure = options.secure || false;

            if (expires) {
                expires = ONSUGAR.Util.calculateCookieExpiry(expires).toGMTString();
            }

            if (noescape) {
            	document.cookie = key + '=' + value +
	                (expires ? '; expires=' + expires : '') +
	                (path ? '; path=' + escape(path) : '') +
	                (domain ? '; domain=' + escape(domain) : '') +
	                (secure ? '; secure' : '');
            }
            else {
                document.cookie = key + '=' + escape(value) +
	                (expires ? '; expires=' + expires : '') +
	                (path ? '; path=' + escape(path) : '') +
	                (domain ? '; domain=' + escape(domain) : '') +
	                (secure ? '; secure' : '');
            }
        },

        calculateCookieExpiry: function(expires) {
            var date = new Date();

            if (expires < 5000) {
        		// expires represents the number of days in the future
                date.setTime(date.getTime() + expires * 86400000);
        	}
        	else {
        		// expires is a Unix timestamp
                date.setTime(expires * 1000);
        	}

        	return date;
        },

        deleteCookie: function(key) {
            ONSUGAR.Util.setCookie(key, '', {expires: -1});
        },

        buildQueryString: function(params) {
            var query = [];
            for ( key in params ) {
                if ( params.hasOwnProperty(key) && params[key] !== null) {
                    query.push(key + "=" + encodeURIComponent(params[key]));
                }
            }
            return query.join('&');
        },

        /**
         * Extracts a query parameter value from a URI.
         * @param {string} uri The URI from which to extract the parameter.
         * @param {string} paramName The name of the query paramater to extract.
         * @return {string} The raw value of the query paramater. undefined
         *     if there is no URI parameter.
         */
        getURIComponentValue: function(uri, paramName) {
            if (!uri) {
                return null;
            }
            var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
            var eparams = regex.exec(uri);
            if (eparams != null) {
                return eparams[1];
            }
            return null;
        },

        getGETParameters: function () {
            var query = location.search.substring(1); // Get Query String
            return ONSUGAR.Util.decodeQueryString(query);
        },

        decodeHTML: function (input) {
            var e = document.createElement('div');
            e.innerHTML = input;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        },

        decodeQueryString: function(query) {
	        return ONSUGAR.Util.decodeComponentPairs(query, '&', '=');
        },

        decodeComponentPairs: function(component, pairDelimeter, valueDelimeter)  {
            var args = {};

            var pairs = component.split(pairDelimeter);

            for(var i = 0; i < pairs.length; i++) { // Begin loop through the pairs
                var pos = pairs[i].indexOf(valueDelimeter); // Look for "name=value"
                if (pos == -1) continue; // if not found, skip to next
                var argname = pairs[i].substring(0,pos); // Extract the name
                var value = pairs[i].substring(pos+1); // Extract the value
                args[argname] = decodeURIComponent(value); // Store as a property
            }
            return args; // Return the Object
        },

        getGetHash: function() {
            var hash = location.hash.substring(1);
            return ONSUGAR.Util.decodeComponentPairs(hash, ';', ':');
        },

        rgb2hex: function(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        },

        evalJSON : NATIVE_JSON_PARSE_SUPPORT ?  JSON.parse : evalJSON,

        injectScriptTag: function(src) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            head.appendChild(script);
        },

        XHR: function (url, params, callback) {
            var http = getHTTPObject();
            if (!http || !url) return;

            if (typeof params === 'object') {
                var params = ONSUGAR.Util.buildQueryString(params);

                if (params != '') {
                    url += (url.indexOf('?') ? '&' : '?') + params;
                }
            }

            http.open("GET", url, true);

            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        var result = "";
                        if (http.responseText) result = http.responseText;

                        if (callback) callback(result);
                    } else {
                        // this is an error
                    }
                }
            }
            http.send(null);
        },

        popupWindow: function(url, params) {
            var url = url;
            var windowName = params.name || 'default_window';
            var options = params.options || '';
            return window.open(url, windowName, options);
        },

        getStyle: function(element, style) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var styles = document.defaultView.getComputedStyle(element, "");
                if (styles) {
                    return styles[style];
                }
            }
            else {
                return element.currentStyle[style] || element.style[style];
            }
        },

        setPersistentCookie: function(key, value, options) {
            var options = options || {};

            if (options.expires !== undefined) {
                options.expires = Math.floor(ONSUGAR.Util.calculateCookieExpiry(options.expires).getTime() / 1000);
            }

            var params = {
                'key': key,
                'value' : value,
                'expiry' : options.expires || null,
                'path' : options.path || null,
                'force_reload' : options.force_reload || false
            };

            var callback = function (response) {
                var response = trimAntiCSRFResponse(response);

                if (!response) return false;
                response = ONSUGAR.Util.evalJSON(response);
                params.token = response.token;
                params.token_expiry = response.token_expiry;

                var url = ONSUGAR.SSO.getSSOMasterURL() + '/pcookie_set?' + ONSUGAR.Util.buildQueryString(params);
                ONSUGAR.Util.injectScriptTag(url);
                ONSUGAR.Util.setCookie(key, value, options);
                if (options.callback) {
                    options.callback.call();
                }
            }

            ONSUGAR.Util.XHR('/pcookie_get_key', null, callback);
        },

        extractScripts: function(html) {
            var ScriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script>';
            var matchAll = new RegExp(ScriptFragment, 'img'),
            matchOne = new RegExp(ScriptFragment, 'im');
            return (html.match(matchAll) || []).map(function(scriptTag) {
                return (scriptTag.match(matchOne) || ['', ''])[1];
            });
        },

        stripTags: function (string) {
            return string.replace(/(<([^>]+)>)/ig,"");
        },

        bind: function(obj, method) {
            var args = [];
            for(var ii = 2; ii < arguments.length; ii++) {
                args.push(arguments[ii]);
            }
            return function() {
                var _obj = obj || this;
                var _args = args.slice();
                for(var jj = 0; jj < arguments.length; jj++) {
                    _args.push(arguments[jj]);
                }
                if(typeof(method) == "string") {
                    if(_obj[method]) {
                        return _obj[method].apply(_obj, _args);
                    }
                }
                else {
                    return method.apply(_obj, _args);
                }
            };
        },

        reloadPage: function() {
            window.location.reload();
        },

        call: function() {
            var scope = window;
            var func;
            var args = [];
            for(var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            var command = args.shift();

            if (typeof window[command] === 'function') {
                func = window[command];
            }
            else {
                command = command.split('.');
                while (command.length > 1) {
                    scope = scope[command.shift()];
                }
                func = scope[command.shift()];
            }

            func.apply(scope, args);
        },
       /*
        * From : http://webdesign.onyou.ch/2010/08/04/javascript-time-ago-pretty-date/
        */
        timeAgo: function timeAgo(date_str) {
            var time_formats = [
            [60, 'just now', 'just now'], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'yesterday', 'tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'last week', 'next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'last month', 'next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ];

            var seconds = (new Date() - new Date(date_str)) / 1000;
            var token = 'ago', list_choice = 1;
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = 'from now';
                list_choice = 2;
            }
            var i = 0, format;
            while (format = time_formats[i++]) {
                if (seconds < format[0]) {
                    if (typeof format[2] == 'string') {
                        return format[list_choice];
                    } else {
                        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                    }
                }
            }
            return date_str;
        },
        // Returns a random integer between min and max
        // Using Math.round() will give you a non-uniform distribution!
        getRandomInt: function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        isLoggedIn: function() {
            var cookie = ONSUGAR.Util.getCookie('ss1');
            return cookie.substring(0, 1) !== '0';
        },

        smartyEscape: function(text) {
            return text.replace(/\$/g,'\\$').replace(/{/g,'&#123;').replace(/}/g,'&#125;');
        },

        /**
         * Wait for a condition to occur and call a success function when it does
         * or call a timeout function if too much time passes.
         * @param condition - function which returns true when the condition arises
         * @param success - function to execute when the condition occurs
         * @param timeout - function to execute when the condition fails to occur in the specified timeframe
         * @param interval - how often to poll for the condition
         * @param count - number of times to poll for the condition
         */
        waitFor: function(condition, success, timeout, interval, count) {
            if (count <= 0) {
                timeout();
            }
            else if (condition()) {
                success();
            } else {
                window.setTimeout(function() { ONSUGAR.Util.waitFor(condition, success, timeout, interval, count-1); }, interval);
            }
        }

    }
}();

/**
 * This is NOT IE8 compatibile.
 * @type {*}
 */
ONSUGAR.Selection = ONSUGAR.Selection || function() {
    var savedSelection;
    var eatClickEvent = false;  // FF only

    return {
        save: function(event) {
            savedSelection = ONSUGAR.Selection.get(event);
        },

        clear: function(event) {
            if (eatClickEvent) {
                eatClickEvent = false;
                return;
            }
            savedSelection = null;
        },

        get: function(event) {
            // Note that window.getSelection().getRangeAt(0) does not work for input fields...
            if (event) {
                if (ONSUGAR.UserProfile.isFirefox()) {
                    eatClickEvent = true;
                }

                event.currentTarget.normalize()
                var text = event.currentTarget.firstChild;
                var range = document.createRange();
                var start = event.currentTarget.selectionStart;
                var end = event.currentTarget.selectionEnd;
                var selectedText = event.currentTarget.value.substring(start, end);

                // While editing the input field, the text object may be out of date
                if (!text) {
                    text = document.createTextNode(event.currentTarget.textContent);
                }

                // If the user adds text to the end of a post and then immediately selects it
                // the change event may not of fired yet, so we need to update our innerHTML
                if (end > text.textContent.length) {
                    event.currentTarget.innerHTML = event.currentTarget.value;
                }

                if (event.currentTarget.textContent.length != text.textContent.length) {
                    text.textContent = event.currentTarget.textContent;
                }
                // if there are HTML escape codes like &#039; the indexes will be wrong.  Try to fix them...
                if (selectedText != text.textContent.substring(start, end)) {
                    // The event start and end indexes are from the input value, but
                    // the Range object wants indexes into the textContent (HTML un-escaped)
                    // find the right indexes...
                    selectedText = ONSUGAR.Util.decodeHTML(selectedText);
                    var new_start = text.textContent.lastIndexOf(selectedText, start - (event.currentTarget.value.length - text.textContent.length));
                    if (new_start) {
                        start = new_start;
                        end = new_start + selectedText.length;
                    }
                }
                range.setStart(text, start);
                range.setEnd(text, end);
                return range;
            } else {
                return savedSelection;
            }
        },

        getText: function() {
            return savedSelection ? savedSelection.toString() : '';
        },

        replace: function(replacementText) {
            if (savedSelection) {
                savedSelection.deleteContents();
                savedSelection.insertNode(document.createTextNode(replacementText));
                // Force the value to track the innerHTML (yuck!)
                savedSelection.startContainer.parentElement.value = savedSelection.startContainer.parentElement.textContent;
            }
        },

        /**
         * Watch for selections on a given element.  Clear the savedSelection on click
         * @param elementID
         */
        watch: function(elementID) {
            Event.observe(elementID, 'select', function(event) {
                ONSUGAR.Selection.save(event);
                Event.observe(elementID, 'click', ONSUGAR.Selection.clear);
            });
            Event.observe(elementID, 'change', function(event) {
                // In order for selections to work, innerHTML needs track the input area value as it's changed
                event.currentTarget.innerHTML = event.currentTarget.value;
            });
        }
    }
}();

ONSUGAR.SSO = ONSUGAR.SSO || function() {
    var SSOMasterServer = null;
	var SSOSwfStore = null;

    return {
        getSSOMasterURL: function() {
        	return SSOMasterServer;
        },
        setSSOMasterURL: function(url) {
            SSOMasterServer = url;
            this.setSSOMasterURL = ONSUGAR.Util._blankfun;
        },
    	master: function(encoded_cookies) {
    		var usePostMessage = false;

    		if (typeof(window.postMessage) != "undefined" && document.cookie && encoded_cookies != '[]') {
    			// If window.postMessage is available, and we're seeing cookies from the client, then use postMessage.
    			// Otherwise, we'll use the Flash store for cookies, since it works even with third party cookies disabled.
    	    	usePostMessage = true;
    	    }
            else if (encoded_cookies == '[]') {
                ONSUGAR.Event.fire('SSOComplete');
            }

    	    if (usePostMessage) {
    	        window.postMessage(encoded_cookies, window.location.protocol + '//' + window.location.hostname);
    	    }

    	    ONSUGAR.SSO.SSOSwfStore = new SwfStore({
	            namespace: 'SugarSSO', // the this must match all other instances that want to share cookies
	            swf_url: ONSUGAR.SSO.getSSOMasterURL()+'/static/flash-cookies/storage.swf', // to work cross-domain, use the same absolute url on both pages (meaning http://site.com/path/to/store.swf not just /path/to.store.swf)
	            debug: false, // depending on your browser, this will either go to the console or the bottom of the page.

	            onready: function() {
	            	if (encoded_cookies != '[]') {
	            		// Don't set an empty cookie array because that means the SSO master received no cookies, probably due to third party cookies being disabled.
	            		ONSUGAR.SSO.SSOSwfStore.set('SugarSSO', encoded_cookies);
	            	}

	            	if (!usePostMessage) {
	            		// Only fire the client this way if we aren't also setting via postMessage.
	            		ONSUGAR.Event.fire('SSOMasterReadyFlash');
	            	}
	            }
	        });
    	},
    	slave: function() {
    		if (typeof(window.postMessage) != "undefined") {
    		    ONSUGAR.Event.observe(window, 'message', ONSUGAR.SSO.slavePostMessageRequest);
    		}

    		ONSUGAR.Event.registerEventHandler('SSOMasterReadyFlash', ONSUGAR.SSO.slaveFlashRequest);
    	},
    	slavePostMessageRequest: function(event) {
    		if (event.origin == window.location.protocol + '//' + window.location.hostname && event.data && event.data.indexOf("cookie_ss1") != -1) {
    			var ssoCookies = ONSUGAR.Util.evalJSON(event.data);

    			if (typeof(ssoCookies) == 'object') {
    				ONSUGAR.SSO.updateCookies(ssoCookies);
    			}
    		}
    	},
    	slaveFlashRequest: function() {
    		var ssoCookies = ONSUGAR.Util.evalJSON(ONSUGAR.SSO.SSOSwfStore.get('SugarSSO'));

			if (typeof(ssoCookies) == 'object') {
				ONSUGAR.SSO.updateCookies(ssoCookies);
			}
    	},
    	updateCookies: function(ssoCookies) {
    		if (typeof(ssoCookies) == 'object') {
    			var reload_page = false;
    		    var uidregexp=/ss1=\d*/;
    		    var olduid = "0";
    		    var newuid = "0";

    		    var uid_cookie_match = document.cookie.match(uidregexp);

    		    if (typeof(uid_cookie_match) == 'object' && uid_cookie_match != null) {
    		    	olduid = uid_cookie_match.toString().substr(4);
    		    }

    		    if (typeof(ssoCookies) == 'object' && typeof(ssoCookies.uid) == 'string') {
    		    	newuid = ssoCookies.uid;
    		    }

	            for (var key in ssoCookies) {
    		        if (key.substring(0,7) == 'cookie_') {
    		        	// If this is a cookie other than the ss1 or session cookies, it's a persistent cookie.
    		        	// So, if the value has changed, force a page reload, since we don't know what that value might affect on the page.
                        if (key != 'cookie_ss1' && key != 'cookie_session' && ONSUGAR.Util.getCookie(ssoCookies[key].key, true) != ssoCookies[key].value && ssoCookies[key].options.force_reload) {
                            reload_page = true;
    		        	}
                        else if (key == 'cookie_session' && ONSUGAR.Util.getCookie(ssoCookies[key].key, true) != ssoCookies[key].value && document.getElementById('edit-form_token')) {
                            // This page has a form with a token, and we're changing session IDs, so reload the page to make sure the correct form token is used for the new session ID.
                            reload_page = true;
                        }

    		        	ONSUGAR.Util.setCookie(ssoCookies[key].key, ssoCookies[key].value, ssoCookies[key].options, true);
    		        }
    		    }

                if (newuid != olduid) {
                    if (newuid != "0") {
                        // Replace any elements with the 'sugar-sso-refresh' class when logging in.
                        var replacedElements = ONSUGAR.Util.getByClass('sugar-sso-refresh', '*', document, ONSUGAR.SSO.refreshElement);

                        if (replacedElements.length == 0) {
                            // We didn't find anything, so reload the whole page.
                            reload_page = true;
                        }
                    }
                    else {
                        // Do a full page refresh on logout
                        reload_page = true;
                    }
                }

                if (reload_page) {
                    document.location.reload();
                }
                else {
                    ONSUGAR.Event.fire('SSOComplete');
                }
            }
        },
    	refreshElement: function(element) {
    		var dataSrc = element.getAttribute('data-src');

    		if (dataSrc && element.id) {
    			triggerAjaxReplace(dataSrc, element.id, true);
    		}

    		var javascriptSrc = element.getAttribute('javascript-src');

    		if (javascriptSrc) {
    			eval(javascriptSrc);
    		}
    	}
    }
}();

ONSUGAR.Event.registerEventHandler('SSOComplete', function() {
    var status = ONSUGAR.Util.isLoggedIn() ? 'logged-in' : 'anon';
    var body = document.getElementsByTagName('body')[0];
    body.className += body.className === "" ? status : " " + status;
});

ONSUGAR.SSO.slave();
ONSUGAR.UserProfile.buildHTMLClassName();

function submitOnReturn(evt) {
	var evt  = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text")) {$('submit').click();return false;}
}
function checkUncheckAll(theElement) {
  var theForm = theElement.form, z = 0;
  for(z=0; z<theForm.length;z++) {
    if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall') {
      theForm[z].checked = theElement.checked;
    }
  }
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function ons_bind(obj, method) {
   var args = [];
   for(var ii = 2; ii < arguments.length; ii++) {
      args.push(arguments[ii]);
      }
   return function() {
      var _obj = obj || this;
      var _args = args.slice();
      for(var jj = 0; jj < arguments.length; jj++) {
         _args.push(arguments[jj]);
         }
      if(typeof(method) == "string") {
         if(_obj[method]) {
            return _obj[method].apply(_obj, _args);
            }
         }
      else {
         return method.apply(_obj, _args);
         }
      }
   }
Function.prototype.ons_bind = function(context) {
   var argv = [arguments[0], this];
   var argc = arguments.length;
   for(var ii = 1; ii < argc; ii++) {
      argv.push(arguments[ii]);
      }
   return ons_bind.apply(null, argv);
   }
function dd_menu(arrow, link, menu, event, arrow_class, arrow_old_class, on_click_callback, off_click_callback) {
   if(menu.style.display == 'none') {
      menu.style.display = 'block';
      var old_arrow_classname = arrow_old_class ? arrow_old_class : arrow.className;
      if(link) {
         link.className = 'active';
         }
      arrow.className = arrow_class ? arrow_class : 'sugar_menu_arrow_active';
      var justChanged = true;
      var shim = get_element(menu.id + '_iframe');
      if(shim) {
         shim.style.top = menu.style.top;
         shim.style.right = menu.style.right;
         shim.style.display = 'block';
         shim.style.width = (menu.offsetWidth + 2) + 'px';
         shim.style.height = (menu.offsetHeight + 2) + 'px';
         }
      menu.offclick = function(e) {
         if(!justChanged) {
            ons_hide(this);
            if(link) {
               link.className = '';
               }
            arrow.className = old_arrow_classname;
            var shim = get_element(menu.id + '_iframe');
            if(shim) {
               shim.style.display = 'none';
               shim.style.width = menu.offsetWidth + 'px';
               shim.style.height = menu.offsetHeight + 'px';
               }
            if(off_click_callback) {
               off_click_callback(e);
               }
            removeEventBase(document, 'click', this.offclick, menu.id);
            }
         else {
            justChanged = false;
            }
         }.ons_bind(menu);
      if(on_click_callback) {
         on_click_callback();
         }
      addEventBase(document, 'click', menu.offclick, menu.id);
      }
   return false;
   }
function get_element(id) {
   if(typeof(id) == 'undefined') {
      Util.error('Tried to get an undefined element!');
      return null;
      }
   var obj;
   if(typeof(id) == 'string') {
      obj = document.getElementById(id);
      if(!(spi_ua.ie() >= 7)) {
         return obj;
         }
      if(!obj) {
         return null;
         }
      else if(typeof(obj.id) == 'string' && obj.id == id) {
         return obj;
         }
      else {
         var candidates = document.getElementsByName(id);
         if(!candidates ||!candidates.length) {
            return null;
            }
         var maybe = [];
         for(var ii = 0; ii < candidates.length; ii++) {
            var c = candidates[ii];
            if(!c.id && id) {
               continue;
               }
            if(typeof(c.id) == 'string' && c.id != id) {
               continue;
               }
            maybe.push(candidates[ii]);
            }
         if(maybe.length != 1) {
            return null;
            }
         return maybe[0];
         }
      }
   else {
      return id;
      }
   return null;
   }
function addEventBase(obj, type, fn, name_hash) {
   if(obj.addEventListener)obj.addEventListener(type, fn, false);
   else if(obj.attachEvent) {
      obj["e" + type + fn + name_hash] = fn;
      obj[type + fn + name_hash] = function() {
         obj["e" + type + fn + name_hash](window.event);
         }
      obj.attachEvent("on" + type, obj[type + fn + name_hash]);
      }
   }
function ons_hide() {
   for(var i = 0; i < arguments.length; i++) {
      var element = get_element(arguments[i]);
      if(element && element.style)element.style.display = 'none';
      }
   return false;
   }
function removeEventBase(obj, type, fn, name_hash) {
   if(obj.removeEventListener)obj.removeEventListener(type, fn, false);
   else if(obj.detachEvent) {
      obj.detachEvent("on" + type, obj[type + fn + name_hash]);
      obj[type + fn + name_hash] = null;
      obj["e" + type + fn + name_hash] = null;
      }
   }
var spi_ua={ie:function(){return this._ie;},firefox:function(){return this._firefox;},opera:function(){return this._opera;},safari:function(){return this._safari;},windows:function(){return this._windows;},osx:function(){return this._osx;},populate:function(){var agent=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso).(\d+\.\d+))|(?:Opera.(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))/.exec(navigator.userAgent);var os=/(Mac OS X;)|(Windows;)/.exec(navigator.userAgent);if(agent){spi_ua._ie=agent[1]?parseFloat(agent[1]):NaN;spi_ua._firefox=agent[2]?parseFloat(agent[2]):NaN;spi_ua._opera=agent[3]?parseFloat(agent[3]):NaN;spi_ua._safari=agent[4]?parseFloat(agent[4]):NaN;}else{spi_ua._ie=spi_ua._firefox=spi_ua._opera=spi_ua._safari=NaN;}}}

function onsugarAjax(url, ajaxFunction, params) {
    var xmlHttpReq;

    // IE
    if (window.ActiveXObject) {
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // Mozilla/Safari
    else {
        xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.overrideMimeType('text/xml');
    }

    xmlHttpReq.open('POST', url, true);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            ajaxFunction.call(null, xmlHttpReq.responseText);
        }
    }
    xmlHttpReq.send(params);
}

//The expected return from the PHP is a JSON object with two fields - a "container" to place the output into, and the "output" HTML blob.
function triggerAjaxReplace(url, container, processJavascript) {
    var params = {
        "container": container
    };
    ONSUGAR.Util.XHR(url, params, function(response) {
        var containerEl = document.getElementById(container);
        if(containerEl) {
            containerEl.innerHTML = response;
        }

        if (processJavascript == true) {
            var scripts = ONSUGAR.Util.extractScripts(response);
            if (scripts.length > 0) {
                for (var i in scripts) {
                    eval(scripts[i]);
                }
            }
        }

        // In case anyone was waiting for us to finish.
        ONSUGAR.Event.fire('triggerAjaxReplace_' + container);
    });
}

function onsugarInitSlideKeys() {
    var event = 'keydown';
    var handler = onsugarSlideHandleKeyPress;
    if (document.addEventListener) {
        document.addEventListener(event, handler, false);
    } else {
        document.attachEvent('on' + event, handler);
        // Internet Explorer needs to remove event handlers on page unload
        // in order to avoid memory leaks.
        if (window.attachEvent) {
            window.attachEvent("onunload", function() {
                document.detachEvent('on' + event, handler);
            });
        }
    }
}

function onsugarSlideHandleKeyPress(e) {
    var target;
	if (!e) {
	    var e = window.event;
	}
	if (e.target) {
	    target = e.target;
	}
	else if (e.srcElement) {
	    target = e.srcElement;
	}
	if (target.nodeType == 3) { // defeat Safari bug
		target = target.parentNode;
    }
    if(!(target.tagName == 'INPUT' || target.tagName == 'TEXTAREA')) {
        KEY_RIGHT = 39;
        KEY_LEFT = 37;
        var slide_next = document.getElementById('slide_next');
        var slide_previous = document.getElementById('slide_previous');

        var key = e.which || e.keyCode;
        switch (key) {
            case KEY_RIGHT:
                 if(slide_next) {
                     window.location = slide_next.href;
                 }
                 break;
            case KEY_LEFT:
                 if(slide_previous) {
                     window.location = slide_previous.href;
                 }
                 break;
        }
    }
}

function getFormAuth(type, jsonValues) {
    var params = 'values='+encodeURIComponent(jsonValues);
    onsugarAjax('/form/auth', function(response) {
        var form = document.getElementById(type);
        form['edit-auth_key_h'].value = response;
    }, params);
}

//This is the function responsible for handling the AJAX extensions to the drupal form API.
//Keep in mind that THIS FUNCTION MUST NOT DEPEND ON ANY JS FRAMEWORKS LIKE PROTOTYPE OR JQUERY
function ajaxSubmit(form, clientValidated) {
    var params = new Array();
    //Get the submitted form values.  Make sure to properly handle all the different types of inputs
    for(var i=0; i<form.elements.length; i++) {
        // ignore any form fields that don't have names; those shouldn't be sent to the server
        if (form.elements[i].name) {
            if (form.elements[i].tagName == "INPUT") {
               if (form.elements[i].type == "checkbox") {
                  if (form.elements[i].checked) {
                     params.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                  }
                  else {
                     params.push(form.elements[i].name + "=");
                  }
               }
               else if (form.elements[i].type == "radio") {
                  if (form.elements[i].checked) {
                     params.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                  }
               }
               else {
                  params.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
               }
               if (form.elements[i].name == 'op'){
               	form.elements[i].disabled = true;
               }
            }
            else if (form.elements[i].tagName == "SELECT") {
                var sel = form.elements[i];
                if (sel.multiple) {
                    for (var j = 0; j < sel.options.length; j++)
                        if (sel.options[j].selected)
                            params.push(sel.name + "=" + encodeURIComponent(sel.options[ j ].value));
                }
                else {
                    params.push(sel.name + "=" + encodeURIComponent(sel.options[sel.selectedIndex].value));
                }
            }
            else if (form.elements[i].tagName == "TEXTAREA") {
               params.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            }
        }
    }

    if(clientValidated) {
        params.push('_client_validated=1');
    }

    params = params.join("&");

    onsugarAjax(
        form.action,
        function(response) {
            var msgs = ONSUGAR.Util.evalJSON(response);

            // this value isn't actually used, but it has a side effect of creating a container
            // element if one doesn't already exist
            var formContainer = onsugarFormGetFormContainer(form);

            //get the message handler function name
            var messageHandler = null;
            var messageHandlerElement = form.elements['edit-' + msgs.id + '_ajax_message_handler'];

            if (messageHandlerElement != null) {
                messageHandler = messageHandlerElement.value;
            }

            if (messageHandler != null) {
                ONSUGAR.Util.call(messageHandler, msgs);
            }
            else {
                onsugarFormPresentErrors(form, msgs);
            }

            // determine next step
            if(msgs['#validate_ok']) {
                var preSubmitCallbackElement = form.elements['edit-ajax_pre_submit_callback'];

                if (preSubmitCallbackElement != null) {
                    var preSubmitCallback = preSubmitCallbackElement.value;

                    if (preSubmitCallback != null) {
                        ONSUGAR.Util.call(preSubmitCallback, form);
                    }
                }
            }
            else if(msgs['#submit_ok']) {
                var submitCallbackElement = form.elements['edit-ajax_submit_callback'];

                if (submitCallbackElement != null) {
                    var submitCallback = submitCallbackElement.value;

                    if (submitCallback != null) {
                        ONSUGAR.Util.call(submitCallback, form, msgs['#json'], msgs);
                    }
                }
            }
            else {
                var validationFailedCallbackElement = form.elements['edit-ajax_validation_failed_callback'];

                if (validationFailedCallbackElement != null) {
                    var validationFailedCallback = validationFailedCallbackElement.value;

                    if (validationFailedCallback != null) {
                        ONSUGAR.Util.call(validationFailedCallback, msgs);
                    }
                }
            }

            for (var i = 0; i < form.elements.length; i++) {
                if (form.elements[i].name == 'op') {
                    form.elements[i].disabled = false;
                }
            }
        },
        params
    );
}

function onsugarFormGetFormContainer(form) {
   //add a container div for the form to insulate it from the rest of the page
    var formContainer;
    if(!(formContainer = document.getElementById('form_container_'+form.id))) {
        var formParent = form.parentNode;
        formContainer = document.createElement('div');
        formContainer.id = 'form_container_'+form.id;
        formParent.insertBefore(formContainer, form);
        formContainer.appendChild(form);
    }

    return formContainer;
}

function onsugarFormPresentErrors(form, msgs) {
    //update error messages on individual fields
    var formContainer = onsugarFormGetFormContainer(form);

    for(var i=0; i<form.elements.length; i++) {
        var el = form.elements[i];
        //drupal form API adds "edit-" to each form field name.  So if the real field name is "email" you will see a form value with name "edit-email"
        var elName = form.elements[i].id.replace('edit-', '');
        if(elName) {

            var errorDiv = document.getElementById('form_error_'+form.id+'_'+elName);

            if(msgs[elName]) {
                //create the error div if it isn't there, and add the message as innerHTML
                if(!errorDiv) {
                    var parent = el.parentNode;
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'form_error_message';
                    errorDiv.id = 'form_error_'+form.id+'_'+elName;
                    parent.appendChild(errorDiv);
                }
                errorDiv.innerHTML = msgs[elName];
                errorDiv.style.display = 'block';
            }
            else if(errorDiv) {
                errorDiv.style.display = 'none';
            }
        }
    }

    //check to see if the form specified its status container.  Otherwise, use a default naming convention.
    if(msgs['#status_container']) {
        var statusID = msgs['#status_container'];
    }
    else {
        var statusID = 'form_status_' + form.id;
    }
    var statusContainer = document.getElementById(statusID);

    //update the status, or make the status div display none if no status
    //TODO: This is a little weird, as we are currently completely ignoring the actual value of #status_message and just displaying a default message.  However, we do care if the value is there or not.  Should handle this more gracefully.
    if(msgs['#status_message'] || msgs['general']) {
        if(!statusContainer) {
            statusContainer = document.createElement('div');
            statusContainer.id = statusID;
            formContainer.insertBefore(statusContainer, form);
        }
        if(msgs['#submit_ok'] == 1) {
            statusContainer.className = 'messages status';
        }
        else {
            statusContainer.className = 'messages error';
        }

        var msg = '';
        if(msgs['#status_message']) {
            msg = "<div class=\"form_status_message\">" + msgs['#status_message'] + "</div>";
        }

        if(msgs['general']) {
            msg += "<div class=\"form_general_message\">" + msgs['general'] + "</div>";
        }

        statusContainer.innerHTML = msg;
        statusContainer.style.display = 'block';
    }
    else if(statusContainer) {
        statusContainer.style.display = 'none';
    }

    if(msgs['#html']) {
        var status = statusContainer ? statusContainer.innerHTML : '';
        formContainer.innerHTML = status + msgs['#html'];
    }

    if(statusContainer != undefined && document.getElementById(statusContainer)) {
        if (typeof(jQuery) == 'function'){
            $('html').animate({scrollTop: $('#' + statusContainer.id).offset().top}, 750);
        }
        else {
            window.scrollTo(statusContainer.offsetTop, 0);
        }
    }
}

function onsugarFormAjaxSubmitSuccess(form, json, msgs) {
    if (msgs.ajax_submit_destination) {
        window.location.replace(msgs.ajax_submit_destination);
    }
    else {
        window.location.reload();
    }
}

// Add .map to array objects for browsers (*cough* IE7 *cough*) that don't have it.
// Taken from http://www.tutorialspoint.com/javascript/array_map.htm
if (!Array.prototype.map) {
    Array.prototype.map = function(fun /*, thisp*/) {
        var len = this.length;
        if (typeof fun != "function") {
          throw new TypeError();
        }

        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                res[i] = fun.call(thisp, this[i], i, this);
            }
        }

        return res;
    };
}

