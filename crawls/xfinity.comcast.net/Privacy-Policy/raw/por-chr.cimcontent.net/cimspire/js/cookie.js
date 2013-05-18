if (typeof CIM === 'undefined' || !CIM)  {
    /**
     * CIM global namespace object
     * @namespace CIM global namespace object
     */
    var CIM = {};
}

/**
 * Class: CIM Cookies
 * Cookie utility functions
 * Based on cookie scripts from http://www.quirksmode.org/js/cookies.html
 *
 * Author:  mball, tmenagh, javallone
 * Revised by: mball (2011-02-08)
 */

CIM.cookie = (function () {

    /*
     * Values array for binary cookie
     * *** DO NOT RE-ORDER OR DELETE THESE ITEMS ***
     * Adding to THE END of list *will* be backwards compatible with older cookies
     * You can rename the tokens as long as you rename all instances in the code too.
     * *** DO NOT ADD TO THE START OF THIS LIST ***
    */
    var tempBinaryCookieValues = [
            // beginning of Fancast binary values
            'browse_alpha',
            'browse_list',
            'browse_locked',
            'tvlistings_signinPrompted',
            'fb_fan',
            'browser_old',
            'browser_osx',
            'user_comcast',
            'user_mecomcast',
            'browse_popular',
            'browse_newest',
            // end of Fancast binary values
            'browserDetection'
        ],

        permBinaryCookieValues = [
            'rs_activation',        //see rsActivationMap
            'rs_devicetype',        //see rsDeviceTypeMap
            'profile_named_cable_boxes',
            'profile_remote_tuned',
            'profile_watchlist_setup',
            'test_value',
            'skip_idevice_roadblock',
            'skip_launch_promo'
        ],

        rsActivationMap = ["ACTIVATED","ATTEMPTED","NOTSET","DEACTIVATED"],
        rsDeviceTypeMap = ["GUIDEWORKS","TIVO","NOTSET"],
        object,
        defaultOptions = {
            domain: ".comcast.net",
            path: "/"
        };

    /*
     * Helper: setCharAt
     *
     * Sets a character at the given positon in a string to be the given value
     *
     * Arguments:
     *    str - string
     *    i - integer
     *    chr - character
     *
     * Returns:
     *    The manipulated string
     *
    */
    function setCharAt(str, i, chr) {
        var result;

        if (i > str.length - 1) {
            result = str;
        } else {
            result = str.substr(0, i) + chr + str.substr(i + 1);
        }

        return result;
    }

    /*
     * Helper: setGMTStringFromDays
     *
     * Converts a number of days to a GMT string
     *
     * Arguments:
     *    days - the number of days to convert into a GMT string
     *
     * Returns:
     *    The number of days converted to a GMT string
     *
    */
    function setGMTStringFromDays(days) {
        var date = new Date();

        date.setTime(date.getTime() + days * 86400000); // Convert to milliseconds

        return date.toGMTString();
    }

    /*
     * Helper: setExpiresString
     *
     *
     * Arguments:
     *
     * Returns:
     *
    */
    function setExpiresString(days) {
        var gmtString;

        if (typeof days === "object") { // if the days is a Date object, just set it.
            gmtString = days.toGMTString();
        } else if(typeof days === "string") { // if the days is a GMT string, just set it.
            gmtString = days;
        } else { // the days is a number of days until expiration.
            gmtString = setGMTStringFromDays(days);
        }

        return "; expires=" + gmtString;
    }

     /*
     * Helper: getDomainFromURLString
     *
     * Arguments:
     *
     * Returns:
     *
    */
    function getDomainFromURLString() {
        var hostname = document.location.hostname.split(".");

        if (hostname.length >= 2) { // if there is a hostname with the format blah.com, use the domain name for the domain
            return "domain=" + "." + hostname[hostname.length - 2] + "." + hostname[hostname.length - 1];
        } else { // otherwise default to our domain.
            return "domain=" + defaultOptions.domain;
        }
    }

     /*
     * Helper: getBinaryValue
     *
     * Arguments:
     *    cookieName -
     *    pos -
     *    name -
     *
     * Returns:
     *
    */
    function getBinaryValue(cookieName, pos, name) {
        var bin = '', value;

        if (CIM.cookie.exists(cookieName)) {
            bin = CIM.cookie.read(cookieName);
            switch(name){
                //prefs whose binary value is not a boolean
                case "rs_activation":
                    return rsActivationMap[bin.charAt(pos)].toLowerCase();
                    break;

                case "rs_devicetype":
                    return rsDeviceTypeMap[bin.charAt(pos)].toLowerCase();
                    break;

                default:
                    // result is false by default, only set to true if the bit is 1.
                    value = bin.charAt(pos);
                    if (value === "1") {
                        return true;
                    } else if (value === "0") {
                        return false;
                    }
                    break;
            }
        }

        return;
    }

     /*
     * Helper: setBinaryValue
     *
     * Arguments:
     *    cookieName -
     *    pos -
     *    name -
     *    value -
     *    valueArray -
     *    permanent -
     *
     * Returns:
     *
    */
    function setBinaryValue(cookieName, pos, name, value, valueArray, permanent) {
        var bin = '', val;

        if (CIM.cookie.exists(cookieName)) {
            bin = CIM.cookie.read(cookieName);
        }

        while (bin.length <= valueArray.length) {
            bin += '2';
        }

        switch(name){
            case "rs_activation":
                if(inArray(value.toUpperCase(), rsActivationMap) > -1){
                    val = inArray(value.toUpperCase(), rsActivationMap);
                } else {
                    val = '2';
                }
                break;

            case "rs_devicetype":
                if(inArray(value.toUpperCase(), rsDeviceTypeMap) > -1){
                    val = inArray(value.toUpperCase(), rsDeviceTypeMap);
                } else {
                    val = '2';
                }
                break;

            default:
                val = (value ? 1 : 0);
                break;
        }
        bin = setCharAt(bin, pos, val);

        if (permanent === 'undefined' || !permanent) {
            CIM.cookie.write(cookieName, bin); // Set the cookie to last for session
        } else {
            CIM.cookie.write(cookieName, bin, { days: 730 }); // Set the cookie to last for two years 365 * 2 is 730.
        }

        return value;
    }

     /*
     * Helper: binaryValue
     *
     * Arguments:
     *    name -
     *    value -
     *    cookieName -
     *    valueArray -
     *    permanent -
     *
     * Returns:
     *
    */
    function binaryValue(name, value, cookieName, valueArray, permanent) {
        var pos, result;

        //syntax check
        if (typeof name === 'undefined') {
            return undefined;
        }

        pos = inArray(name, valueArray);
        if (pos === -1) {
            return undefined;
        }

        if (typeof value === 'undefined') {
            return getBinaryValue(cookieName, pos, name);
        } else {
            return setBinaryValue(cookieName, pos, name, value, valueArray, permanent);
        }

        return undefined;
    }

    /*
     * Helper: escapeValue()
     *
     * URL escape a string value. This does a limited URL escaping to keep the size
     * of escaped strings down. Currently, only %, ;, =, and & are escaped. Native
     * encodeURIComponent does too much escaping for our purposes
     *
     * Arguments:
     *    value - String value to escape
     *
     * Returns:
     *    Escaped value
     *
    */
    function escapeValue(value) {
        return value
            .replace(/%/g, '%25')
            .replace(/;/g, '%3B')
            .replace(/=/g, '%3D')
            .replace(/&/g, '%26');
    }

    /*
     * Helper: unescapeValue
     *
     * Reverse URL escaping on a string value. This is just a wrapper for
     * native unescape. It's just here for consistency with escapeValue().
     *
     * Arguments:
     *    value - String value to be unescaped
     *
     * Returns:
     *    Unescaped value
     *
    */
    function unescapeValue(value) {
      return unescape(value);
    }

    /*
     * Helper: inArray
     *
     * Search for a specified value within an array and return its index
     * (or -1 if not found). This is jQuery's $.inArray(), verbatim. It is
     * reproduced here to decouple CIM.cookie from any external dependency.
     *
     * Arguments:
     *    elem - String value to be searched for
     *    array - The array in which to search
     *
     * Returns:
     *    The index of the element in the array. -1 if not found.
     *
    */
    function inArray(elem, array) {
        if ( array.indexOf ) {
            return array.indexOf( elem );
        }

        for ( var i = 0, length = array.length; i < length; i++ ) {
            if ( array[ i ] === elem ) {
                return i;
            }
        }

        return -1;

    }

    object = {

        /*
         * Method: write
         *
         * Creates a cookie
         *
         * Arguments:
         *    name - the name of the cookie
         *    value - the value of the cookie
         *    options - options object for the cookie containing any of the following:
         *      days - the days until the cookie expires. If the expires value
         *             is not provided, the cookie will be destroyed when browser is closed.
         *      path - the domain path in which to set the cookie. Defaults to "/"
         *      domain - the domain to store the cookie under. Defaults to the last two
         *               parts of the domain from the URL
         *
        */
        write: function (name, value, options) {
            name = String(name || '');
            value = String(value || '');
            options = options || {};

            var cookieString, domain, expires = '', hostname = '', path = 'path=' + defaultOptions.path;

            if (typeof options === "number") {
                expires = setExpiresString(options);
                options = {};
            }

             if (typeof options['days'] !== "undefined") {
                expires = setExpiresString(options.days);
            }

            if (typeof options['path'] !== 'undefined') {
                path = 'path=' + options.path;
            }

            if (typeof options['domain'] !== 'undefined') {
                domain = 'domain=' + options.domain;
            } else {
                domain = getDomainFromURLString();
            }

            cookieString = name + "=" + String(value || '').replace(/;/g, '%3B') + expires + "; " + path + "; " + domain;

            document.cookie = cookieString;

            return cookieString;
        },

        /*
         * Method: remove
         *
         * Removes the specified cookie
         *
        */
        remove: function (name, options) {
            var cookieOptions = {};
            options = options || {};

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    cookieOptions[i] = options[i];
                }
            }
            cookieOptions.days = -1;

            this.write(name, "", cookieOptions);
            return this;
        },

        /*
         * Method: read
         *
         * Reads the cookie with the name it's passed.
         *
         * Arguments:
         *    name - name of the cookie you want to read
         *
         * Returns:
         *    the value of the specified cookie, in the event that it's present
         *    false if the specified cookie is not present
         *
        */
        read: function (name) {
            var cookie,
                cookieArray = document.cookie.split(';'),
                        i,
                nameEQ = name + "=",
                re = /\s*(.*)/, // match everything after any white space
                        result = false;

            for (i = 0; i < cookieArray.length; i = i + 1) {
                cookie = cookieArray[i].match(re)[1];

                if (cookie.indexOf(nameEQ) === 0) {
                    result = cookie.substring(nameEQ.length, cookie.length);
                              break;
                }
            }

            return result ? unescapeValue(result) : false;
        },

        /* Method: exists
         *
         * Checks the existance of specified cookie
         *
         * Arguments:
         *    name - name of the cookie
         *
         * Returns:
         *    True if the cookie exists. False otherwise.
         *
        */
        exists: function (name) {
            return (typeof(this.read(name)) === "string"); // if the value of the cookie read is a string, then we know the cookie exists so return true. Else return false.
        },

        /*
         * Method: canWrite
         *
         * Checks to see if browser can can write cookies. Useful for debugging.
         *
        */
        canWrite: function () {
            var creatablity = false;

            this.write("t", "y");
            if (this.read("t") === "y") {
                creatablity = true;
            }
            this.remove("t");

            return creatablity;
        },

        /*
         * Method: tempBinaryValue
         *
         * Temporary binary cookie preference manager
         *
         * If you pass in *name*, this function operates as a getter. If you pass *name* and *value*,
         * this function operates like a setter. Return value (result) can be true, false, undefined, or a string
         * (corresponding to 0, 1, 2, ..., n in the cookie)
         * PLEASE NOTE: when using a value -> string representation, you need to use a map such as rsActivationMap
         *
         * Arguments:
         *    name - name of the cookie value as defined in the tempBinaryCookieValues array
         *    value - value of the cookie. If value is not specified, tempBinaryValue
         *    returns the value of the binary cookie value
         *
         * Returns:
         *    True (1), False (0), or undefined (2) based on the value of the cookie specified
         *
        */
        tempBinaryValue: function (name, value) {
            return binaryValue(name, value, 'b', tempBinaryCookieValues);
        },

        /*
         * Method: permBinaryValue
         *
         * Permanent binary cookie preference manager
         *
         * If you pass in *name*, this function operates as a getter. If you pass *name* and *value*,
         * this function operates like a setter. Return value (result) can be true, false or undefined
         * (corresponding to 0, 1 and 2 in the cookie)
         *
         * Arguments:
         *    name - name of the cookie value as defined in the permBinaryCookieValues array
         *    value - value of the cookie. If value is not specified, permBinaryValue
         *    returns the value of the binary cookie value
         *
         * Returns:
         *    True (1), False (0), or undefined (2) based on the value of the cookie specified
         *
        */
        permBinaryValue: function (name, value) {
            return binaryValue(name, value, 'p', permBinaryCookieValues, true);
        },

        /*
         * Method: setCookieInObject
         *
         * Get cookies and store them in specified JavaScript object
         *
         * Arugments:
         *    name - the name of the cookie
         *    object - the name of the object
         *
         * Returns:
         *    The passed object with the key/value pairs from the specified cookie's value
         *    set appropriately.
         *
         *  Usage: if you have a cookie 'foo' with a value of 'k1=v1&k2=v2', and an object myObject = {
         *    name: "Trevor",
         *    bd: "3/2/1977"
         *  },
         *  then CIM.cookie.setCookieInObject('foo', myObject) extends myObject and returns
         *  {
         *    name: "Trevor",
         *    bd: "3/2/1977",
         *    k1: "v1",
         *    k2: "v2"
         *  }
        */
        setCookieInObject: function (name, object) {
            var
                cookie = CIM.cookie.read(name),
                i,
                key,
                value,
                values;

            if (cookie) {
                values = cookie.split("&");
                i = values.length;
                while(i) {
                    i--;
                    // element 0 is the key, element 1 is the value
                    key = values[i].split('=', 1)[0];
                    value = values[i].slice(key.length + 1);
                    object[key] = unescapeValue(value);
                }

                return object;
            }

            return false;
        },

        /*
         * Method: decode
         *
         * Takes a cookie and makes a new object from its value's ampersand delimited list of key/value pairs
         *
         * Arguments:
         *    name - cookie name
         *
         * Returns:
         *    a new object with keys/values from the cookie's values
        */
        decode: function (name) {
            return this.setCookieInObject(name, {});
        },

        /*
         * Method: encode
         *
         * Converts an object's key/values into an ampersand delimited string
         *
         * Arguments:
         *    object - the object
         *
         * Returns:
         *    An ampersand delmited string of key/value pairs. For example:
         *    k1=v1&k2=v2
        */
        encode: function (object) {
            var results = [],
                name;

            for (name in object) {
                    results.push([name, escapeValue(object[name])].join('=')); // join key/value pairs in object with "="
            }
            return results.join('&'); // join key=value pairs into ampersand delimited string
        },

         /*
         * Method: clear
         *
         * Removes all cookies from a domain.
         *
         * Returns:
         *
        */
        clear: function() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                this.remove(cookies[i]);
            }
        }
    };

    // Set aliases for CIM.storage
    object.get = object.read;
    object.set = object.write;
    object.create = object.write;
    object.del = object.remove;

    return object;
}());
