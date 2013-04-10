/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * The <code>CQ</code> library contains all CQ component classes and utilities.
 * @static
 * @class CQ
 */
window.CQ = window.CQ || {};

CQ.shared = {};

// debug console
if (window.console === undefined) {
    window.console = {log:function(m){}};
}
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
CQ.shared.HTTP = new function() {
    /**
     * Creates an empty response object.
     * @private
     * @static
     * @return {Object} The response object
     */
    var createResponse = function() {
        var response = new Object();
        response.headers = new Object();
        response.body = new Object();
        return response;
    };

    var getResponseFromXhr = function(request) {
        if (!request) return null;
        var response = createResponse();
        response.body = request.responseText;
        response.headers[CQ.shared.HTTP.HEADER_STATUS] = request.status;
        // set properties for backward compatibility (pre 5.3)
        response.responseText = request.responseText;
        response.status = request.status;
        return response;
    };

    /**
     * The context path used on the server.
     * May only be set by {@link CQ.shared.HTTP.detectContextPath}.
     * @private
     * @type String
     */
    var contextPath = null;

    /**
     * The regular expression to detect the context path used
     * on the server using the URL of this script.
     * @private
     * @final
     * @type RegExp
     */
    var SCRIPT_URL_REGEXP = /\/etc\/clientlibs\/foundation\/shared.*\.js$/;

    /**
     * The regular expression to detect unescaped special characters in a path.
     * @private
     * @final
     * @type RegExp
     */
    var ENCODE_PATH_REGEXP = /[^\w-\.!~\*'\(\)\/%;:@&=\$,]/;

    return {
        /**
         * The extension for HTML files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_HTML: ".html",

        /**
         * The extension for JSON files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_JSON: ".json",

        /**
         * The extension for resources.
         * @private
         * @static
         * @final
         * @type String
         */
        EXTENSION_RES: ".res",

        /**
         * The Status header.
         * @static
         * @final
         * @type String
         */
        HEADER_STATUS: "Status",

        /**
         * The Message header.
         * @static
         * @final
         * @type String
         */
        HEADER_MESSAGE: "Message",

        /**
         * The Location header.
         * @static
         * @final
         * @type String
         */
        HEADER_LOCATION: "Location",

        /**
         * The Path header.
         * @static
         * @final
         * @type String
         */
        HEADER_PATH: "Path",

        /**
         * The parameter name for no caching.
         * @static
         * @final
         * @type String
         */
        PARAM_NO_CACHE: "cq_ck",

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.</div></li>
         *        </ul>
         * @param {Object} scope The scope for the callback (optional)
         * @return {Mixed} The response object or, if the
         *         request is asynchronous, the transaction ID
         */
        get: function(url, callback, scope) {
            url = CQ.shared.HTTP.externalize(url, true);

            if (typeof CQ_XHR_HOOK != "undefined" && $CQ.isFunction(CQ_XHR_HOOK)) {
                var p = { "url" : url, "method":"GET"};
                var out = CQ_XHR_HOOK(p);
                if (out) {
                    url = out.url;
                }
            }

            if (callback != undefined) {
                return $CQ.ajax({
                    type: "GET",
                    url: url,
                    complete: function(request, textStatus) {
                        var response = getResponseFromXhr(request);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = $CQ.ajax({
                        type: "GET",
                        url: url,
                        async: false
                    });
                    return getResponseFromXhr(request);
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.<br>
         *        <i>Added in CQ 5.3</i></div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope for the callback
         * @param {Boolean} suppressErrorMsg Suppress the error msg notification
         * @return {Mixed} The response object or, if the request is
         *         asynchronous, the transaction ID
         */
        post: function(url, callback, params, scope) {
            url = CQ.shared.HTTP.externalize(url, true);

            if (typeof CQ_XHR_HOOK != "undefined" && $CQ.isFunction(CQ_XHR_HOOK)) {
                var p = { "url" : url, "method":"POST","params":params};
                var out = CQ_XHR_HOOK(p);
                if (out) {
                    url = out.url;
                    params = out.params;
                }
            }


            if (callback != undefined) {
                return $CQ.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    complete: function(request, textStatus) {
                        var response = CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText);
                        callback.call(scope || this,
                                this,
                                textStatus == "success",
                                response);
                    }
                });
            } else {
                try {
                    var request = $CQ.ajax({
                        type: "POST",
                        url: url,
                        data: params,
                        async: false
                    });
                    return CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText);
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Returns the value of the parameter with the specified name
         * in the URL. Only the first value will be considered.
         * Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String} The value
         */
        getParameter: function(url, name) {
            var params = CQ.shared.HTTP.getParameters(url, name);
            return params != null ? params[0] : null;
        },

        /**
         * Returns the values of the parameters with the specified name
         * in the URL. Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String[]} The values
         */
        getParameters: function(url, name) {
            var values = [];
            if (!name) {
                return null;
            }
            name = encodeURIComponent(name);
            if (url.indexOf("?") == -1) {
                return null;
            }
            var query = url.substring(url.indexOf("?") + 1);
            if (query.indexOf(name) == -1) {
                return null;
            }
            var queryPts = query.split("&");
            for (var i = 0; i < queryPts.length; i++) {
                var paramPts = queryPts[i].split("=");
                if (paramPts[0] == name) {
                    values.push(paramPts.length > 1 ? decodeURIComponent(paramPts[1]) : "");
                }
            }
            return values.length > 0 ? values : null;
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            if (value && value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    url = CQ.shared.HTTP.addParameter(url, name, value[i]);
                }
                return url;
            }
            var separator = url.indexOf("?") == -1 ? "?" : "&";
            var hashIdx = url.indexOf("#");
            if (hashIdx < 0) {
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value);
            } else {
                var hash = url.substring(hashIdx);
                url = url.substring(0, hashIdx);
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value) + hash;
            }
        },

        /**
         * Overwrites a parameter in the specified URL. The parameter name
         * and value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String} value The value of the parameter
         * @return {String} The URL with the new parameter
         */
        setParameter: function(url, name, value) {
            url = CQ.shared.HTTP.removeParameter(url, name);
            return CQ.shared.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes a parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter to remove
         * @return {String} The URL without the parameter
         */
        removeParameter: function(url, name) {
            var pattern0 = "?" + encodeURIComponent(name) + "=";
            var pattern1 = "&" + encodeURIComponent(name) + "=";
            var pattern;
            if (url.indexOf(pattern0) != -1) {
                pattern = pattern0;
            }
            else if (url.indexOf(pattern1) != -1) {
                pattern = pattern1;
            }
            else {
                return url;
            }

            var indexCutStart = url.indexOf(pattern);
            var begin = url.substring(0, indexCutStart);

            var indexCutEnd = url.indexOf("&", indexCutStart + 1);
            var end = "";
            if (indexCutEnd != -1) {
                end = url.substring(indexCutEnd);
                if (end.indexOf("&") == 0) {
                    end.replace("&", "?");
                }
            }
            return begin + end;
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: function(url) {
            if (url.indexOf("?") != -1) {
                return url.substring(0, url.indexOf("?"));
            }
            return url;
        },

        /**
         * Adds the specified selector to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String} selector The name of the selector to insert
         * @param {Number} index (optional) The index of the selector. If it is "-1"
         *                 or bigger than the number of the existing selectors
         *                 the selector will be appended. Defaults to "0".
         * @return {String} The updated URL
         * @since 5.3
         */
        addSelector: function(url, selector, index) {
            if (!index) index = 0;

            // url:  /x/y.z.json?a=1#b
            // post: ?a=1#b
            // path: /x
            // main: y.z.json
            var post = ""; // string of parameters and anchor
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }
            var sIndex = url.lastIndexOf("/");
            var main = url.substring(sIndex); // name, selectors and extension
            if (main.indexOf("." + selector + ".") == -1) {
                var path = url.substring(0, sIndex);
                var obj = main.split(".");
                var newMain = "";
                var delim = "";
                if (index > obj.length - 2 || index == -1) {
                    // insert at last position
                    index = obj.length - 2;
                }
                for (var i = 0; i < obj.length; i++) {
                    newMain += delim + obj[i];
                    delim = ".";
                    if (index == i) {
                        newMain += delim + selector;
                    }
                }
                return path + newMain + post;
            }
            else {
                return url;
            }
        },

        /**
         * Replaces the selector at the given index position. If no selector exists
         * at the index position, no change is made to the URL.
         *
         * @param {String} url The URL.
         * @param {String} selector The value with which to replace the selector.
         * @param {Number} index The index of the selector to set/replace.
         * @return The URL with the selector replaced.
         * @since 5.4
         */
        setSelector: function(url, selector, index) {

            var post = "";
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }

            var selectors = CQ.shared.HTTP.getSelectors(url);
            var ext = url.substring(url.lastIndexOf("."));
            // cut extension
            url = url.substring(0, url.lastIndexOf("."));
            // cut selectors
            var fragment = (selectors.length > 0) ? url.replace("." + selectors.join("."), "") : url;

            if (selectors.length > 0) {
                for (var i = 0; i < selectors.length; i++) {
                    if (index == i) {
                        fragment += "." + selector;
                    } else {
                        fragment += "." + selectors[i]
                    }
                }
            } else {
                fragment += "." + selector;
            }

            return fragment + ext + post;
        },

        /**
         * Returns the anchor part of the URL.
         * @static
         * @param {String} url The URL
         * @return {String} The anchor
         */
        getAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(url.indexOf("#") + 1);
            }
            return "";
        },

        /**
         * Sets the anchor of the specified URL.
         * @static
         * @param url The URL
         * @param anchor The anchor
         * @return {String} The URL with anchor
         */
        setAnchor: function(url, anchor) {
            return CQ.shared.HTTP.removeAnchor(url) + "#" + anchor;
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         * Copied from CQ.HTTP
         */
        removeAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(0, url.indexOf("#"));
            }
            return url;
        },

        /**
         * Prevents caching by adding a timestamp to the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL with timestamp
         */
        noCaching: function(url) {
            return CQ.shared.HTTP.setParameter(url, CQ.shared.HTTP.PARAM_NO_CACHE, new Date().valueOf());
        },

        /**
         * Builds a response object using the specified node and its child nodes.
         * The content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {Node} node The content document or the node to parse
         * @param {Object} response The response object to use (optional)
         * @return {Object} The response object
         */
        buildPostResponseFromNode: function(node, response) {
            if (!node) {
                return null;
            }
            if (response == undefined) {
                response = createResponse();
            }

            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                if (child.tagName) {
                    if (child.id) {
                        if (child.href) {
                            response.headers[child.id] = child.href;
                        }
                        else {
                            response.headers[child.id] = child.innerHTML;
                        }
                    }
                    response = CQ.shared.HTTP.buildPostResponseFromNode(child, response);
                }
            }
            return response;
        },

        /**
         * Builds a response object using the specified HTML string. The
         * content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {String} html The HTML string
         * @return {Object} The response object
         */
        buildPostResponseFromHTML: function(html) {
            var response = createResponse();
            try {
                if (html.responseText != undefined) {
                    html = html.responseText;
                } else if (typeof html != "string") {
                    html = html.toString();
                }
                var div = document.createElement("div");
                div.innerHTML = html;
                response = CQ.shared.HTTP.buildPostResponseFromNode(div, response);
                div = null;
            } catch (e) {
            }
            return response;
        },

        /**
         * Returns the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @return {String} The value of the cookie
         */
        getCookie: function(name) {
            var cname = encodeURIComponent(name) + "=";
            var dc = document.cookie;
            if (dc.length > 0) {
                var begin = dc.indexOf(cname);
                if (begin != -1) {
                    begin += cname.length;
                    var end = dc.indexOf(";", begin);
                    if (end == -1) end = dc.length;
                    return decodeURIComponent(dc.substring(begin, end));
                }
            }
            return null;
        },

        /**
         * Sets the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} value The value of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {Number} days (optional) The number of days the cookie will live
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         * @return {String} The value of the cookie
         */
        setCookie: function(name, value, path, days, domain, secure) {
            if (typeof(days) != "number") days = 7;
            var date;
            if (days > 0) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            } else {
                date = new Date(1970, 0, 1);
            }
            document.cookie = encodeURIComponent(name) + "=" +
                    encodeURIComponent(value) + "; " +
                    (days != 0 ? "expires=" + date.toGMTString() + "; " : "") +
                    (domain ? "domain=" + domain + "; " : "") +
                    (path ? "path=" + path : "") +
                    (secure ? "; secure" : "");
            return value;
        },

        /**
         * Clears the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         */
        clearCookie : function(name, path, domain, secure) {
            CQ.shared.HTTP.setCookie(name, "null", path || "", -1, domain || "", secure || "");
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        getSchemeAndAuthority: function(url) {
            try {
                if (url.indexOf("://") == -1) return ""; // e.g. url was /en.html
                var end = url.indexOf("/", url.indexOf("://") + 3);
                if (end == -1) return url; // e.g. url was http://www.day.com
                return url.substring(0, end); // e.g. url was http://www.day.com/en.html
            }
            catch (e) {
                return "";
            }
        },

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: function() {
            return contextPath;
        },

        /**
         * Detects the context path used on the server.
         * @private
         * @static
         * @since 5.3
         */
        detectContextPath: function() {
            try {
                if (typeof CQ.CONTEXT_PATH != "undefined") {
                    contextPath = CQ.CONTEXT_PATH;
                } else if (typeof CQ_CONTEXT_PATH != "undefined") {
                    contextPath = CQ_CONTEXT_PATH;
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        // in IE the first script is not the expected widgets js: loop
                        // until it is found
                        var path = scripts[i].src;
                        if (path.indexOf("?") >= 0) {
                            path = path.substring(0, path.indexOf("?")); // remove query
                        }
                        if (SCRIPT_URL_REGEXP.test(path)) {
                            path = path.replace(/.*\:[\/][\/]/, ""); // remove protocol
                            path = path.substring(path.indexOf("/")); // remove host[:port]
                            path = path.replace(SCRIPT_URL_REGEXP, ""); // remove script url
                            contextPath = path;
                            break;
                        }
                    }
                }
            } catch (e) {
            }
        },

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            if (encode) url = CQ.shared.HTTP.encodePathOfURI(url);
            try {
                if (url.indexOf("/") == 0 && contextPath &&
                        url.indexOf(contextPath + "/") != 0) {
                    url = contextPath + url;
                }
            }
            catch (e) {
            }
            return url;
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: function(url, doc) {
            if (!doc) doc = document;
            var docHost = CQ.shared.HTTP.getSchemeAndAuthority(doc.location.href);
            var urlHost = CQ.shared.HTTP.getSchemeAndAuthority(url);
            if (docHost == urlHost) {
                return url.substring(urlHost.length + contextPath.length);
            }
            else {
                return url;
            }
        },

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL
         * @return {String} The path
         * @since 5.3
         */
        getPath: function(url) {
            url = url || window.location.href;

            url = CQ.shared.HTTP.internalize(url);
            url = CQ.shared.HTTP.removeParameters(url);
            url = CQ.shared.HTTP.removeAnchor(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i != -1) {
                url = url.substring(0, url.indexOf(".", url.lastIndexOf("/")));
            }
            return url;
        },

        /**
         * Returns an array with the selectors present in the given url.
         * If no selectors are present, an empty array is returned.
         * @static
         * @param {String} url The URL
         * @return {Array} An array containing the selectors or an empty
         *                 array if none were found.
         * @since 5.4
         */
        getSelectors: function(url) {

            var selectors = [];

            url = CQ.shared.HTTP.removeParameters(url);
            url = CQ.shared.HTTP.removeAnchor(url);

            var fragment = url.substring(url.lastIndexOf("/"));
            if (fragment) {
                var split = fragment.split(".");
                if (split.length > 2) {
                    for (var i = 0; i < split.length; i++) {
                        // don't add node name and extension as selectors
                        if (i > 0 && i < split.length - 1) {
                            selectors.push(split[i]);
                        }
                    }
                }
            }

            return selectors;
        },

        /**
         * Returns the extension of an URL. This is the string
         * after the last dot until the end of the url without
         * any request parameters, anchors or suffix, for
         * example "html".
         *
         * @param {String} url The URL
         * @return {String} The URL extension (without the dot)
         *                  or an empty string if no was found.
         * @since 5.4
         */
        getExtension: function(url) {
            // strip things from the end
            url = CQ.shared.HTTP.removeParameters(url);
            url = CQ.shaerd.HTTP.removeAnchor(url);

            // extension is everything after the last dot
            var pos = url.lastIndexOf(".");
            if (pos < 0) {
                return "";
            }

            // do not include the dot
            url = url.substring(pos + 1);

            // remove suffix if present
            pos = url.indexOf("/");
            if (pos < 0) {
                return url;
            }

            return url.substring(0, pos);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link CQ.HTTP.encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: function(url) {
            var parts, delim;
            if (url.indexOf("?") != -1) {
                parts = url.split("?");
                delim = "?";
            }
            else if (url.indexOf("#") != -1) {
                parts = url.split("#");
                delim = "#";
            }
            else {
                parts = [url];
            }
            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = CQ.shared.HTTP.encodePath(parts[0]);
            }
            return parts.join(delim);
        },

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ( )</code><br>
         * <code>/ : @ & =</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: function(path) {
            path = encodeURI(path);
            path = path.replace(/\+/g, "%2B");
            path = path.replace(/\?/g, "%3F");
            path = path.replace(/;/g, "%3B");
            path = path.replace(/#/g, "%23");
            path = path.replace(/=/g, "%3D");
            path = path.replace(/\$/g, "%24");
            path = path.replace(/,/g, "%2C");
            path = path.replace(/'/g, "%27");
            path = path.replace(/"/g, "%22");
            return path;
        },

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         * @static
         * @param {Object/String} response The response object or URL
         * @return {Object} The evaluated response body
         * @since 5.3
         */
        eval: function(response) {
            if (typeof response != "object") {
                response = CQ.shared.HTTP.get(response);
            }
            try {
                // support responseText for backward compatibility (pre 5.3)
                return eval("(" + (response.body ? response.body :
                            response.responseText) + ")");
            } catch (e) {
            }
            return null;
        },

        /**
         * Checks whether the specified status code is OK.
         * @static
         * @param {Number} status The status code
         * @return {Boolean} True if the status is OK, else false
         */
        isOkStatus: function(status) {
            try {
                return (new String(status).indexOf("2") == 0);
            } catch (e) {
                return false;
            }
        },

        /**
         * Checks if the specified response is OK.
         * The response object is expected to look like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {Object} response The response object
         * @return {Boolean} True if the response is OK, else false
         */
        isOk: function(response) {
            try {
                return CQ.shared.HTTP.isOkStatus(
                        response.headers[CQ.shared.HTTP.HEADER_STATUS]);
            } catch (e) {
                return false;
            }
        }


    }
};

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ.shared.Util = new function() {
    return {
        /**
         * Reloads the window or replaces its location with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {Window} win (optional) The window to reload
         * @param {String} url (optional) The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        reload: function(win, url, preventHistory) {
            if (!win) win = window;
            if (!url) {
                url = CQ.shared.HTTP.noCaching(win.location.href);
            }

            if (typeof CQ_RELOAD_HOOK != "undefined" && $.isFunction(CQ_RELOAD_HOOK)) {
                url = CQ_RELOAD_HOOK(url) || url;
            }

            if (preventHistory) {
                win.location.replace(url);
            } else {
                win.location.href = url;
            }
        },

        /**
         * Loads the specified URL in the current window.
         * @static
         * @param {String} url The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        load: function(url, preventHistory) {
            CQ.shared.Util.reload(window, url, preventHistory);
        },

        /**
         * Opens a new window with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {String} url The URL
         * @param {Window} win (optional) The window to reload
         * @param {String} name (optional) New window name
         * @param {String} options (optional) New window options
         * @return {Object} New window
         */
        open: function(url, win, name, options) {
            if (!win) win = window;
            if (!url) {
                return;
            }

            if (typeof CQ_RELOAD_HOOK != "undefined" && $.isFunction(CQ_RELOAD_HOOK)) {
                url = CQ_RELOAD_HOOK(url) || url;
            }

            if (!name) {
                name = "";
            }
            if (!options) {
                options = "";
            }

            return win.open(url, name, options);
        },

        /**
         * Converts certain characters (&, <, >, and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Converts certain characters (&, <, >, and ') from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode : function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Truncates a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String}  value  The string to truncate
         * @param {Number}  length The maximum length to allow before truncating
         * @param {Boolean} word   True to try to find a common work break
         * @return {String} The converted text
         */
        ellipsis : function(value, length, word) {
            if (value && value.length > length) {
                if (word) {
                    var vs = value.substr(0, length - 2);
                    var index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'), vs.lastIndexOf(';'));
                    if (index == -1 || index < (length - 15)) {
                        return value.substr(0, length - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, length - 3) + "...";
                }
            }
            return value;
        }
    }

};
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing a set of Sling-related utilities.
 * @static
 * @singleton
 * @class CQ.Sling
 */
CQ.shared.Sling = function() {

    return {

        /**
         * The selector for infinite hierarchy depth when retrieving
         * repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: ".infinity",

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: "_charset_",

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: ":status",

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: "browser",

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: ":operation",

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: "delete",

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: "move",

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: "@Delete",

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: "@TypeHint",

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: "@CopyFrom",

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: "@MoveFrom",

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: ":order",

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: ":replace",

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: ":dest",

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: ":saveParamPrefix",

        /**
         * The parameter name for input fields that should
         * be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: ":ignore",

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: "sling:authRequestLogin",

        /**
         * Detects and processes binary repository data returned by Sling
         * and does some preparsing on it for more easy data handling.
         * @static
         * @param {Object} value The repository data to check
         * @return {Object} The processed repository data
         */
        processBinaryData: function(value) {
            if (value && value[":jcr:data"] != undefined) {
                // value is a binary
                var o = new Object();
                o.size = value[":jcr:data"];
                o.type = value["jcr:mimeType"];
                o.date = value["jcr:lastModified"];
                value = o;
            }
            return value;
        },

        /**
         * Returns the content path for the data.
         * @static
         * @param {String} relPath The relative path to resolve
         * @param {String} absPath The absolute path to resovle against
         * @return {String} The absolute path path
         */
        getContentPath: function(relPath, absPath) {
            var path = absPath;
            if (path.lastIndexOf(".") > path.lastIndexOf("/")) {
                // remove selectors and extension from absPath:
                // /content/foo.bar.html >> /content/foo
                path = path.substr(0, path.indexOf(".", path.lastIndexOf("/")));
            }
            if (relPath) {
                if (relPath.indexOf("/") == 0) {
                    path = relPath;
                } else {
                    relPath = relPath.replace("./", "");
                    path = path + "/" + relPath;
                }
            }
            return path;
        }
    };

}();

// shortcut
CQ.Sling =  CQ.shared.Sling;

/*
 * Copyright 1997-2011 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * Provide static utilities for XSS management.
 *
 * @since 5.4
 */
CQ.shared.XSS = new function() {
    return {
        /**
         * Get XSS property name from a provided property name
         *
         * @static
         * @param  {String} propertyName Property name
         * @return {String} XSS property name
         */
        getXSSPropertyName: function(propertyName) {
            if (!propertyName) {
                return '';
            }
            if (CQ.shared.XSS.KEY_REGEXP.test(propertyName)) {
                return propertyName;
            }
            return propertyName += CQ.shared.XSS.KEY_SUFFIX;
        },

        /**
         * Get XSS property value from provided property name and json record
         *
         * @static
         * @param  {Object} rec          Object containing the properties and their values
         * @param  {String} propertyName Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value if it exists, non protected value otherwise
         */
        getXSSRecordPropertyValue: function(rec, propertyName, ellipsisLimit) {
            var value = '';
            if (rec && propertyName) {
                var xssPropValue = rec.get(this.getXSSPropertyName(propertyName));
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = rec.get(propertyName);
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = CQ.shared.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * Get XSS property value from provided property name and table
         *
         * @static
         * @param  {Object} table         Object containing the properties and their values
         * @param  {String} propertyName  Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value
         */
        getXSSTablePropertyValue: function(table, propertyName, ellipsisLimit) {
            var value = '';
            if (table && propertyName) {
                var xssPropValue = table[this.getXSSPropertyName(propertyName)];
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = table[propertyName];
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = CQ.shared.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * XSS value renderer
         *
         * @static
         * @param  {String} val  Value to protect
         * @return {String} XSS protected value
         */
        getXSSValue: function(val) {
            if (val) {
                // There is a value to display, which we encode
                return CQ.shared.Util.htmlEncode(val);
            } else {
                // There was no value to display
                return '';
            }
        },

        /**
         * Update configuration object's property name if XSS is enabled for it
         *
         * @static
         * @param {Object}  cfg          Configuration object
         * @param {String}  propertyName Property name of the provided configuration object
         */
        updatePropertyName: function(cfg, propertyName) {
            if (!cfg || !propertyName || !cfg[propertyName]) {
                return;
            }
            if (cfg['xssProtect'] && !cfg['xssKeepPropName']) {
                cfg[propertyName] = this.getXSSPropertyName(cfg[propertyName]);
            }
        },

        /**
         * XSS property renderer
         *
         * @static
         * @param  {String} val  Value to display if XSS would not have been requested or is not available
         * @param  {Object} meta Field metadata
         * @param  {Object} cfg  Field configuration
         * @param  {Object} rec  Record containing information
         * @return {String} XSS property value
         */
        xssPropertyRenderer: function(val, meta, rec, cfg) {
            if (cfg && cfg['dataIndex'] && rec && rec.data && rec.data[this.getXSSPropertyName(cfg['dataIndex'])]) {
                // The record contains the XSS property equivalent
                val = rec.data[this.getXSSPropertyName(cfg['dataIndex'])];
                if (cfg['ellipsisLimit'] && !isNaN(cfg['ellipsisLimit'])) {
                    val = CQ.shared.Util.ellipsis(val, cfg['ellipsisLimit'], true);
                }
                return val;
            } else if (val) {
                // The record does not contain the XSS property equivalent
                return val;
            } else {
                // There was no value to display
                return '';
            }
        }
    }
};

/**
 * Key suffix for XSS property name
 * @static
 * @final
 * @type String
 */
CQ.shared.XSS.KEY_SUFFIX = "_xss";

/**
 * Key regular expression to test if a property name already ends with XSS suffix
 * @private
 * @static
 * @final
 * @type Object
 */
CQ.shared.XSS.KEY_REGEXP = new RegExp(CQ.shared.XSS.KEY_SUFFIX + "$");
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
//------------------------------------------------------------------------------
// Initialize the CQ shared library

CQ.shared.HTTP.detectContextPath();
