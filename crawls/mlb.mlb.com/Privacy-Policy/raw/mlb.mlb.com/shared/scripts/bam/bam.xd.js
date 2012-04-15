/**
 * @requires jquery.js
 * @requires bam.js
 * @requires $.bindable.js
 */
(function(window, document, $, bam) {

    var 
    
    // CONSTANTS
    KEY_BASEURL = "xdp_baseurl",
    KEY_PROXYNAME = "xdp_name",
    bamHomePath = "/shared/scripts/bam/",

    eventProxyPage = "/shared/bam.xde.html";

    bam.loadSync(bam.homePath + "bam.url.js");

    /**
     * An object that acts as a $.bindable event proxy between a parent document 
     * and an iframe contained child document that lives on another domain.
     *
     * @constructor
     * @param {object} config
     * {
     *      src : location of child document    
     * }
     */
    function CrossDomainIframe(config) {
        this.name     = "bam" + new Date().valueOf() * Math.floor(Math.random() * 1000+1);
        this.frameSrc = config.src; 
        this._data = config.data || {};
        window[this.name] = this;
    }

        CrossDomainIframe.prototype = {

            /**
             * Creates an iframe containing a document that lives on another domain.
             *
             * @param {String} selector jQuery-style selector denoting the parent container for the cross-domain iframe
             */
            create : function(selector, data) {
                var parentDomain = window.location.protocol + "//" + document.domain + ((window.location.port !== "") ? ":" + window.location.port : ""),
                    params = {};

                data = data || {};

                data[KEY_BASEURL] = parentDomain;
                data[KEY_PROXYNAME] = this.name;

                $.extend(params, this._data, data);

                this._iframeEl = $("<iframe />", { 
                                        frameborder : 0,
                                        marginheight : 0,
                                        marginwidth : 0,
                                        scrolling : "no",
                                        src : this.frameSrc + "#!/?" + $.param(params)
                                     }).appendTo(selector)[0];
            },

            /**
             * Removes the cross-domain iframe from the DOM and resets any events or references created by the proxy object
             */
            destroy : function() {
                try {
                    delete window[this.name];
                } catch(e) {}
                this.unbind();
                $(this._iframeEl).remove();
                this._iframeEl = null;
            }
        };

        // make it bindable
        $.bindable(CrossDomainIframe.prototype);


    /**
     * @constructor
     */
    // @TODO: change this.params to come from contstructor arguments. trying to pull
    // from the window.location.hash is too much exposure to external influences:w
    function CrossDomainEventPublisher() {
        var hashParameters = window.location.hash.split("#!/")[1];
        this.params        = bam.url.parseQueryParameters(hashParameters);
    }

        /**
         * Checks if iframe proxy has successfully published the target event.
         *
         * @private
         * @return {boolean}
         */
        function checkPublishStatus() {
            var newStatus = window.location.hash.split("#!/")[1];

            if (newStatus === "success") {
                window.location.hash = "";
                return false;
            }

            return true;
        }

        CrossDomainEventPublisher.prototype = {
            /**
             * Publishes an event between an iframe and parent window that each
             * live on separate domains.
             *
             * @param {String} eventName
             */
            triggerEvent : function(evtName, args) {
                // create 
                var pifp = document.createElement("iframe");
                pifp.src = this.params[KEY_BASEURL] + eventProxyPage + "#!/" + this.params[KEY_PROXYNAME] + "/" + evtName + (args ? "/" + args.join("/") : "");
                pifp.style.display = "none";

                document.body.appendChild(pifp);

                // poll window.location.hash to check publish status of event
                (function() {
                    if (checkPublishStatus()) {
                        setTimeout(arguments.callee, 13);
                    } else {
                        document.body.removeChild(pifp);
                    }
                })();
            }
        };

    bam.xd = {
       /**
        * Cross-Domain IFrame factory method
        */
       iframe : function(config) {
            return new CrossDomainIframe(config);
        },

       /**
        * Cross-Domain IFrame Publisher factory method
        */
        publisher : function() {
            return new CrossDomainEventPublisher();
        }
    };

})(this, this.document, this.jQuery, this.bam);


