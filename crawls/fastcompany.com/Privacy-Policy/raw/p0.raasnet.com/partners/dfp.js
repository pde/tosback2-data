function error(message, e) {
    if (typeof(_ca_enable_error_logs) != 'undefined' && _ca_enable_error_logs) {
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
        } else {
            ndl = encodeURIComponent(document.location.toString().substr(0, 500));
        }
        if (typeof(_ca_ndr) != 'undefined' && _ca_ndr) {
            ndr = _ca_ndr;
        } else {
            ndr = encodeURIComponent(document.referrer.toString().substr(0, 500));
        }
    } catch (e) {
        error("URL set error", e);
    }
    if (ndl) result += "&ndl=" + ndl;
    if (ndr) result += "&ndr=" + ndr;
    return result;
}

function radfp(o) {
    if (o.ver == 1) {
        if (typeof(o.id) == 'undefined' || !o.id) {
            error("Tag installation problem: no id");
            window.rasegs = "rasegs=seg2";
            return;
        }
        var _ca_url = document.location.protocol + '//p.raasnet.com/partners/dfp?partner=' + o.id;
        if (!o.disableNdlNdr) _ca_url += getNdlNdrParams();
        _ca_url += '&ord=' + o.rnd;
        document.write('<script language="Javascript" type="text/javascript" src="' + _ca_url + '"><\/script>');
    } else {
        error("Not supported tag version: " + o.ver);
    }
}