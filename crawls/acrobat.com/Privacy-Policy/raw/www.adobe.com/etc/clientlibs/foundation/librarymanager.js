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
 * The <code>CQClientLibraryManager</code> is used to dynamically include
 * scripts based on channels.
 *
 * @static
 * @class CQClientLibraryManager
 */
if (typeof CQClientLibraryManager == "undefined") {
    CQClientLibraryManager = {

        /**
         * global debug flag
         */
        debug: false,

        /**
         * List of provided scripts to avoid multiple inclusion
         */
        scripts: {},

        /**
         * Indicates the first include.
         */
        initialInclude: true,

        /**
         * Indicates if the window is loaded, i.e. if its onload event has been called.
         */
        windowLoaded: false,

        /**
         * The context path used on the server.
         */
        contextPath: null,

        /**
         * The CQ_XHR_HOOK
         */
        hook: null,


        /**
         * empty callback
         * @private
         */
        channelCB: function(){
            return ""
        },

        /**
         * Sets the channel detection callback. The function takes no
         * arguments and needs to return the name of the detected channel.
         *
         * @param cb the callback function
         */
        setChannelCB: function(/*function*/ cb) {
            this.channelCB = cb;
        },

        //TODO remove href test and replace console.log by CQ.Log when bug #32879 is fixed
        isDebug: function(/* boolean */ debug) {
            var href = document.location.href;
            return (typeof console != "undefined") &&
                    (debug || this.debug) &&
                    href.indexOf("debugConsole=true") != -1;
        },

        /**
         * Writes the given scripts to the document depending on the
         * script channels.
         *
         * The given scripts are objects:
         * {
         * // path of script
         * p: ""
         *
         * // channels of script
         * c: []
         * }
         *
         * @param scripts
         */
        write: function(/*Script[]*/ scripts, debug) {
            debug = this.isDebug(debug);
            // get channel
            var channel = this.channelCB();
            if (!channel) {
                channel = "default";
            }
            if (debug) console.log("LibraryManager: detected channel: " + channel);

            for (var i=0;i<scripts.length; i++) {
                var script = scripts[i];
                if (!this.scripts[script.p]) {
                    this.scripts[script.p] = script;
                    if (debug) console.log("LibraryManager: processing script", script.p, script);
                    if (this.isIncluded(channel, script.c, debug)) {
                        this.includeScript(script.p, debug);
                    }
                }
            }
        },

        /**
         * Tests the given channel is included by the array of given channels
         *
         * @param channel channel to test
         * @param channels script channels
         * @return true if included
         */
        isIncluded: function(/* String */ channel, /* String[] */ channels, /* boolean */ debug) {
            if (channels.length == 0) {
                if (debug) console.log("LibraryManager: ...accepted. no channels defined");
                return true;
            }
            var notChannel = "!" + channel;
            var accept = false;
            var cnt = 0;
            for (var j=0; j<channels.length; j++) {
                var c = channels[j];
                if (c.charAt(0) == '!') {
                    if (c == notChannel) {
                        if (debug) console.log("LibraryManager: ...rejected. channel excluded: ", c);
                        return false;
                    }
                } else {
                    if (c == channel) {
                        if (debug) console.log("LibraryManager: ...accepted. channel included: ", c);
                        accept = true;
                    }
                    cnt++;
                }
            }
            if (cnt == 0) {
                if (debug) console.log("LibraryManager: ...accepted. no more channels after exclusion ");
                accept = true;
            }
            if (!accept && debug) console.log("LibraryManager: ...rejected.");
            return accept;
        },

        /**
         * Include the given script using document.write()
         * @param path path of the script
         */
        includeScript: function(/* String */ path, /* boolean */ debug) {
            var ext = path;
            var idx = ext.indexOf('?');
            if (idx > 0) {
                ext = ext.substring(0, idx);
            }
            ext = ext.substring(ext.lastIndexOf(".")+1);

            if (this.initialInclude) {
                // first call of includeScript
                this.initialInclude = false;
                if (typeof CQ_XHR_HOOK != "undefined" &&
                        Object.prototype.toString.call(CQ_XHR_HOOK) === "[object Function]") {
                    this.hook = CQ_XHR_HOOK;
                }
                this.contextPath = this.detectContextPath();
                var man = this;
                if (window.addEventListener) {
                    window.addEventListener("load", function() {man.windowLoaded = true;}, false);
                }
                else if (window.attachEvent) {
                    window.attachEvent("onload", function() {man.windowLoaded = true;});
                }
            }

            if (this.hook) {
                var p = {"url": path, "method": "GET"};
                try {
                    var out = CQ_XHR_HOOK(p);
                    if (out) path = out.url;
                } catch(e) {
                    if (debug) console.log("LibraryManager: error during CQ_XHR_HOOK call: ", e.message);
                }
            }

            if (this.contextPath) {
                if (path.indexOf("/") == 0 && path.indexOf(this.contextPath + "/") != 0) {
                    path = this.contextPath + path;
                }
            }

            if (ext == "js") {
                if (debug) console.log("LibraryManager: --> writing js include: ", path);

                if (this.windowLoaded) {
                    /*
                    Even evaluating the response is much more slower than appendChild would be
                    this seems to be the only way to load the script sunchronously in IE.
                     */
                    try {
                        var request = document.all ?
                                new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
                        request.open("GET", path, false);
                        request.send(null);
                        if (window.execScript) {
                            // "eval" for IE in global scope
                            window.execScript(request.responseText);
                        }
                        else {
                            // "call" with first arg null runs in global scope
                            eval.call(null, request.responseText);
                        }
                    }
                    catch(err) {
                        if (debug) console.log("LibraryManager: --> evaluating js include failed: ", path);
                    }
                }
                else {
                    /*
                    Initial load: use document.write - appendChild would not be synchronous in IE
                    and eval used above is very slow.
                     */
                    document.writeln('<script src="' + path + '" type="text/javascript"></script>');
                }
            } else if (ext == "css") {
                /*
                Always append link nodes to the header. Otherwise (by using document.write) links written
                directly to a component's HTML would be removed when deleted. If there would be more
                pars using the same clientlib the lib would be gone if the first par that has rendered
                the tag would be deleted.
                 */
                var head = document.getElementsByTagName("head") || document.getElementsByTagName("*");
                head = head[0];
                var n = document.createElement("link");
                n.type = "text/css";
                n.rel = "stylesheet";
                n.href = path;
                head.appendChild(n);
                if (debug) console.log("LibraryManager: --> writing css include: ", path);
            } else {
                // error ?
                if (debug) console.log("LibraryManager: --> unsupported extension: ", path);
            }
        },

        detectContextPath: function() {
            var scripts = document.getElementsByTagName("script");
            var regexp = /\/etc\/clientlibs\/foundation\/librarymanager\/*\.js$/;
            for (var i = 0; i < scripts.length; i++) {
                // in IE the first script is not the expected widgets js: loop
                // until it is found
                var path = scripts[i].src;
                if (path.indexOf("?") >= 0) {
                    path = path.substring(0, path.indexOf("?")); // remove query
                }
                if (path.match(regexp)) {
                    path = path.replace(/.*\:[\/][\/]/, ""); // remove protocol
                    path = path.substring(path.indexOf("/")); // remove host[:port]
                    path = path.replace(regexp, ""); // remove script url
                    this.contextPath = path;
                    break;
                }
            }
        }

    };
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
 *
 * 
 * The default channel detector uses the client user manager to drill down
 * the channels.
 */
CQClientLibraryManager.setChannelCB(function(){
    var channels = [
        {
            channel: "ie6",
            match: "MSIE 6."
        }, {
            channel: "touch",
            match: "iPhone"
        }, {
            channel: "touch",
            match: "iPad"
        }
    ];
    var ua = navigator.userAgent;
    //console.log(ua);
    for (var i=0; i<channels.length; i++) {
        var c = channels[i];
        if (ua.indexOf(c.match) >=0) {
            return c.channel;
        }
    }
    return "";
});
