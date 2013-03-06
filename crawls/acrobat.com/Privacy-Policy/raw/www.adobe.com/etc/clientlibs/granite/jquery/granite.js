/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

(function ($, window, undefined) {

    var http;

    // namespacing
    window.Granite = window.Granite || {};
    window.Granite.$ = $;

    // for deprecated "shared" support (GRANITE-1602)
    window._g = window._g || {};
    window._g.$ = $;

    //grab Granite.HTTP
    http = Granite.HTTP;

    $.ajaxSetup({ // necessary global modifications for ajax calls 
        externalize: true,
        encodePath: true,
        hook: true,
        beforeSend: function (jqXHR, s) { // s: settings provided by the ajax call or default values
            if (typeof G_IS_HOOKED == "undefined" || !G_IS_HOOKED(s.url)) {
                if (s.externalize) { // add context to calls
                    s.url = http.externalize(s.url);
                }
                if (s.encodePath) {
                    s.url = http.encodePathOfURI(s.url);
                }
            }
            if (s.hook) { // portlet XHR hook
                var hook = http.getXhrHook(s.url, s.type, s.data);
                if (hook) {
                    s.url = hook.url;
                    if (hook.params) {
                        if (s.type.toUpperCase() == 'GET') {
                            s.url += '?' + $.param(hook.params);
                        } else {
                            s.data = $.param(hook.params);
                        }
                    }
                }
            }
        },
        statusCode: {
            403: function(jqXHR) {
                if (jqXHR.getResponseHeader("X-Reason") === "Authentication Failed") {
                    // login session expired: redirect to login page
                    http.handleLoginRedirect();
                }
            }
        }
    });

    $.ajaxSettings.traditional = true;
    
}(jQuery, this));
