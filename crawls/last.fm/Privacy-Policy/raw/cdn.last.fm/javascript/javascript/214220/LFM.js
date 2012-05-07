if (window.location.hostname.indexOf("verifiylogins.com") !== -1) {
    window.location = "http://www.last.fm";
}

/**
 * == lfm ==
 * We’ve got a global `LFM` object. You can store all sorts of stuff in there via `LFM.set(category, keys)` and `LFM.get(namespace, key)`.
 **/


/** section: lfm
 * LFM
 * 
 * https://staff.last.fm/wiki/Javascript_The_global_LFM_object
 **/
var LFM = {
    /** related to: LFM.get
     * LFM.set(namespace, keys)
     * - namespace (String): The namespace in which to store our keys
     * - keys (Object): An object containing the keys we want to set on the namespace
     * 
     * Sets keys on a namespace of the global LFM object.
     **/
    set: function (namespace, keys) {
        if (!LFM[namespace]) {
            LFM[namespace] = keys;
        } else {
            for (key in keys) {
                LFM[namespace][key] = keys[key];
            }
        }
    },
    /** related to: LFM.set
     * LFM.get(namespace[, key]) -> value | Object | undefined
     * - namespace (String): The namespace from which to retrieve our key
     * - key (String): The key we want to retrieve from the namespace.
     *     If omitted return all the namespace keys
     * 
     * Gets a value or namespace object from the global LFM object
     **/
    get: function (namespace, key) {
        if (!LFM[namespace]) {
            return;
        }
        if (!key) {
            return LFM[namespace];
        }
        return LFM[namespace][key];
    },
    /**
     * LFM.redirect(url)
     * - url (String): Redirection URL
     * 
     * Sets the window location to a given URL
     **/
    redirect: function(url) {
        window.location.href = url;
        return false;
    },
    /** related to: LFM.getCookie, related to: LFM.deleteCookie
     * LFM.setCookie(name, value[, expiry = 1 year[, path = "/"[, domain = LFM.Session.cookieHost]]])
     * - name (String): Cookie name
     * - value (String): Cookie value
     * - expiry (Date): Expiry date
     * - path (String): Cookie path
     * - domain (String): Cookie domain
     * 
     * Set a cookie
     **/
    setCookie: function (name, value, expiry, path, domain) {
        if (!path) {
            path = '/';
        }
        if (!domain) {
            domain = LFM.get('Session', 'cookieHost');
        }
        if (!expiry) {
            var expiry = new Date();
            expiry = expiry.getTime();
            expiry = new Date(expiry + 1000*60*60*24*365);
        }
        var cookie = name + "=" + escape(value) + ";expires=" + expiry.toGMTString() + ';path=' + path + ';domain=' + domain;
        document.cookie = cookie;
    },
    
    /** related to: LFM.getCookie, related to: LFM.setCookie
     * LFM.deleteCookie(name[, path = "/"[, domain = LFM.Session.cookieHost]])
     * - name (String): Cookie name
     * - path (String): Cookie path
     * - domain (String): Cookie domain
     * 
     * Delete a cookie
     **/
    deleteCookie: function(name, path, domain) {
        LFM.setCookie(name, '', new Date(0), path, domain);
    },

    /** related to: LFM.deleteCookie, related to: LFM.setCookie
     * LFM.getCookie(name) -> String
     * - name (String): Cookie name
     * 
     * Get a cookie
     **/
    getCookie: function (name) {
        if (document.cookie.length > 0) {
            start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return null;
    },
    
    /** 
     * LFM.getScript(src) -> String
     * - src (String): Script url
     * 
     * Simple script insert to top of head if no onload callback required.
     * Redefines itself after first run to avoid extra DOM lookups.
     **/
    getScript: function(src, callback) {
        var doc = document,
            s = 'script',
            first = doc.getElementsByTagName(s)[0];
                
        (function() {
            LFM.getScript = function(src, callback) {
                var el = doc.createElement(s),
                    done = false;
                    
                el.async = 1;
                el.src = src;
                first.parentNode.insertBefore(el, first);
                
                if(typeof callback === "function") {
                    el.onload = el.onreadystatechange = function() {
                    	if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            done = true;
                            callback();
                            el.onload = el.onreadystatechange = null;
            			}
            		};
    		    }
            }
            LFM.getScript(src, callback);
        })();
    },
    
    /**
    * @desc I am very proud of this function
    */
    refreshPage:function() {
      window.location.reload();  
    },
    
    /**
    * @desc I am very proud of this function as well
    */
    printPage:function() {
      window.print();  
    },
    
    /**
     * LFM.getResourceElement(resource) -> Element
     * - resource (Object): Resource object
     * 
     * Get an element that matches the passed in resource
     **/
    getResourceElement: function (resource) {
        if (resource) {
            return $('r' + resource.type + '_' + resource.id);
        }
        return false;
    },
    
    /**
     * Generate a random number for use in adserver scripts, cache busting etc
    **/
    generateOrd: function () {
        return Math.round(Math.random() * 100000000);
    },
    
    /**
     * document.write a script src into the page, replaces %ord with a random number
     * This should NEVER be called after the DOM has loaded or it will blank the page
    **/
    writeScript: function (url) {
        url = url.replace('%ord', LFM.generateOrd());
        document.write('<scr' + 'ipt src="' + url + '"><\/script>');
    },
    
    /**
     * document.write a 1x1 img tag into the page, replaces %ord with a random number
     * This should NEVER be called after the DOM has loaded or it will blank the page
    **/
    writePixel: function (url) {
        url = url.replace('%ord', LFM.generateOrd());
        document.write('<img src="' + url + '" width="1" height="1" class="pixelTracker">');
    },
    
    timeFormat: function (secs) {
        secs = Math.round(secs);
        var s = secs % 60;
        if (s < 10) {
            s = "0" + s;
        }
        return Math.floor(secs/60) + ":" + s;
    },
    
    log: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER")) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                console.log(arguments[0]);
            }
        }
    },
    info: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER")) {
            var method = console.info ? 'info' : 'log';
            if (console[method].apply) {
                console[method].apply(console, arguments);
            } else {
                console[method](arguments[0]);
            }
        }
    },
    warn: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER")) {
            var method = console.warn ? 'warn' : 'log';
            if (console[method].apply) {
                console[method].apply(console, arguments);
            } else {
                console[method](arguments[0]);
            }
        }
    },
    error: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER")) {
            var method = console.error ? 'error' : 'log';
            if (console[method].apply) {
                console[method].apply(console, arguments);
            } else {
                console[method](arguments[0]);
            }
        }
    },
    dir: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER")) {
            var method = console.dir ? 'dir' : 'log';
            if (console[method].apply) {
                console[method].apply(console, arguments);
            } else {
                console[method](arguments[0]);
            }
        }
    },
    logGroup: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER") && console.groupCollapsed) {
            console.groupCollapsed.apply(console, arguments);
        }
    },
    logGroupEnd: function () {
        if (typeof console !== 'undefined' && LFM.get("config", "DEVELOPMENT_SERVER") && console.groupEnd) {
            console.groupEnd();
        }
    },
    
    isAdBlocking: function () {
        var adblockDetector = new LFM.Util.AdblockDetector();
        return adblockDetector.isBlocking();
    }
    
};

if (Element.addMethods) {
    /** related to: Element
     * LFM.ElementMethods
     * 
     * Methods to extend all Elements with
     **/
    LFM.ElementMethods = {
        /**
         * LFM.ElementMethods#getResource(@element[, property]) -> { type, id }
         * - element (Element): Element whose ID to extract the resource from
         * - property (String): Property of the resource you want to access. One of 'id' or 'type'
         * 
         * Get a resource object from an element with serialised resource ID, e.g. "r32_200"
         **/
        getResource: function (element, property) {
            var res = element.id.substr(1).split('_');
            var resource = {
                type: res[0],
                id: res[1]
            };
            return property ? resource[property] : resource;
        },
        
        /**
         * LFM.ElementMethods#scrollToDescendant(@element, child[, options])
         * - element (Element): Parent element
         * - child (Element | ID): Child element
         * - options (Object): Effect.Tween options
         * 
         * Use Effect.Tween to scroll the browser viewport to a given child element of a DOM node
         **/
        scrollToDescendant: function (element, child, options) {
            element = $(element);
            child = $(child);
            if (!options) {
                options = {};
            }
            var positionedOffset = child.positionedOffset();
            return new Effect.Tween(null,
                element.scrollTop,
                Math.max(positionedOffset.top - 30, 0),
                options,
                function (p) {
                    element.scrollTop = p.round();
                }
            );
        },
        
        /**
         * LFM.ElementMethods#incrementAttribute(@element[, attribute = 'id']) -> value
         * - element (Element): Element whose attribute to increment
         * - attribute (String): The attribute to increment
         * 
         * Increments the first occurance of a numeric character in an element’s attribute.
         * Use this to dynamically generate inputs by cloning previous ones etc.
         * 
         * Returns the new attribute value.
         * 
         * Example:
         * 
         *     clonedNode[i].htmlFor = clonedNode[i].incrementAttribute("htmlFor");
         **/
        incrementAttribute: function (element, attribute) {
            if (!attribute) {
                attribute = 'id';
            }
            if (element[attribute]) {
                var newValue = element[attribute].match(/\d+/);
                if (newValue && !isNaN(newValue[0])) {
                    newValue = newValue[0] * 1 + 1;
                    newValue = element[attribute].replace(/(\D*)(\d*)(\D*)/, '$1' + newValue + '$3');
                } else {
                    newValue = element[attribute] + "1";
                }
                return newValue;
            } else {
                return "";
            }
        },
        
        /**
         * LFM.ElementMethods#isInViewport(@element) -> Boolean
         * - element (Element) Element to test visibility on
         * 
         * Determine whether the given element is in the visible browser viewport
         **/
        isInViewport: function (element) {
            var offset = element.cumulativeOffset();
            var viewportScrollOffset = document.viewport.getScrollOffsets().top;
            var min = viewportScrollOffset;
            var max = viewportScrollOffset + document.viewport.getHeight();
            return !(offset.top < min || offset.top > max);
        }
    };
    Element.addMethods(LFM.ElementMethods);
}

if (!LFM.Form) { LFM.Form = {}; }
if (!LFM.Ajax) { LFM.Ajax = {}; }
if (!LFM.Adserver) {
    LFM.Adserver = {
        showAds: false
    };
}
if (!LFM.Flash) {
    LFM.Flash = {
        UFO: {
            params: [],
            wait: false
        }
    };
}

document.observe('dom:loaded', function() {
    LFM.setCookie('javascript', 'enabled');
});
