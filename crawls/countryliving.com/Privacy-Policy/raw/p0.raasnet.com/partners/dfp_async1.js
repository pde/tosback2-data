(function (window) {
    var
        document = window.document,
        CA = window.CA || {},
        defaultKeyValue = "rasegs=seg2",
        rasegs = defaultKeyValue;

    // private
    function error(message, e) {
        if ((typeof(_ca_enable_error_logs) != 'undefined' && _ca_enable_error_logs) ||
            (typeof(CA.enableErrorLogs) != 'undefined' && CA.enableErrorLogs)) {
            if (typeof(console) != 'undefined' && typeof(console.log) == 'function') {
                console.log("CA: " + message, e);
            }
        }
    }

    function getNdlNdrParams() {
        var ndl = "", ndr = "", result = "";
        try {
            if (typeof(_ca_ndl) != 'undefined' && _ca_ndl) {
                ndl = _ca_ndl;
            } else if (typeof(CA.ndl) != 'undefined' && CA.ndl) {
                ndl = CA.ndl;
            } else {
                ndl = encodeURIComponent(document.location.toString().substr(0, 1000));
            }
            if (typeof(_ca_ndr) != 'undefined' && _ca_ndr) {
                ndr = _ca_ndr;
            } else if (typeof(CA.ndr) != 'undefined' && CA.ndr) {
                ndl = CA.ndr;
            } else {
                ndr = encodeURIComponent(document.referrer.toString().substr(0, 1000));
            }
        } catch (e) {
            error("URL set error", e);
        }
        if (ndl) result += "&ndl=" + ndl;
        if (ndr) result += "&ndr=" + ndr;
        return result;
    }

    var bindDartTag = function() {
        $(document).bind('dart_tag_render', function(event, tag){
            if (typeof tag != 'undefined') {
                var kvString = CA.getTargetKeyValues().replace(/,/g, ";");
                return tag.replace(";ord", ";" + kvString + ";ord");
            }
            return tag;
        });
    };

    // public
    CA.createCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value.replace(/;/g, '|') + expires + "; path=/";
    };

    CA.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length).replace(/\|/g, ';');
            }
        }
        return null;
    };

    CA.eraseCookie = function (name) {
        CA.createCookie(name, "", -1);
    };

    // Function should be called before radfp
    CA.setDefaultTargetKeyValue = function (keyValues) {
        defaultKeyValue = keyValues;
        window.rasegs = defaultKeyValue;
    };

    CA.doTargeting = function (o) {
        CA.setTargetKeyValues(defaultKeyValue);
        if (typeof(o.id) == 'undefined' || !o.id) {
            error("Tag installation problem: no id");
            return;
        }
        try {
            var onload = o.onload;
            o.onload = '(function() {parent.CA.setTargetKeyValues(rasegs); with (parent.window) {';
            if (typeof onload != "undefined") {
                o.onload += onload + ';';
            }
            o.ontimeout = o.ontimeout || onload;
            if (typeof o.ontimeout != "undefined") {
                window.setTimeout(o.ontimeout, o.timeout ? o.timeout : 1000);
            }
            if (!o.disableFirstPartyCookies) {
                var rasegsFromCookie = CA.readCookie("rasegs");
                if (rasegsFromCookie != null) CA.setTargetKeyValues(rasegsFromCookie);
                o.onload += 'CA.createCookie("rasegs", CA.getTargetKeyValues(), 1);';
            }
            o.onload += '}})()';
            if (o.bindDartTag) bindDartTag();
            var _prot = document.location.protocol != "https:" ? "http" : "https";
            var url = _prot + "://p.raasnet.com/partners/dfp?partner=" + o.id + (o.onload ? "&ol=" + encodeURIComponent(o.onload) : "") + "&ts=" + new Date().getTime();
            if (!o.disableNdlNdr) url += getNdlNdrParams();
            var iframe = document.createElement("iframe");
            (iframe.frameElement || iframe).style.cssText = "width: 0; height: 0; border: 0; display: none;";
            iframe.frameborder = 0;
            iframe.src = "javascript:false";
            var baseHead = document.getElementsByTagName("head")[0];
            var fdoc = baseHead.appendChild(iframe).contentWindow.document;
            fdoc.open();
            fdoc.write('<body onload="'+
                'var js = document.createElement(\'script\');'+
                'js.src = \''+ url +'\';'+
                'document.body.appendChild(js);">');
            fdoc.close();
        } catch (e) {
            error("Unexpected error", e);
        }
    };

    // create alias for backward compatibility
    CA.radfp = CA.doTargeting;

    CA.getTargetKeyValues = function (splitSymbol) {
        if (typeof splitSymbol == "undefined" || splitSymbol == ",") {
            return rasegs;
        }
        return rasegs.replace(/,/g, splitSymbol);
    };

    CA.setTargetKeyValues = function (keyValues) {
        rasegs = keyValues;
        window.rasegs = rasegs;
    };

    // Expose global parameters
    window.radfp = CA.radfp; // for backward compatibility
    window.rasegs = rasegs;
    window.CA = CA;
})(window);