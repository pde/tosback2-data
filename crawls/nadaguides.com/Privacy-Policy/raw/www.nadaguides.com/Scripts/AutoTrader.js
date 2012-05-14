function ExpandJSContainer(ifid) {
    eval('writeJSAd' + ifid + '()');
}

function setrsisegcookie(rsiseg) {
    if (rsiseg.length > 0) {
        var rsiseg20 = "";
        var segID = "";
        for (var i = 0; i < rsiseg.length; i++) {
            if (rsiseg[i] != "") {
                segID = rsiseg[i];
                segID = segID.substring(segID.indexOf("_"));
                rsiseg20 += segID;
            }
            if (i >= 19)
                break;
        }
        var rsi_exp = new Date(rsi_now.getTime() + 2419200000);
        var rsi_dom = location.hostname;
        rsi_dom = rsi_dom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/, '$1');
        rsi_dom = rsi_dom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/, '$1');
        rsi_dom = rsi_dom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/, '$1');
        SetCookie("rsi_segs", rsiseg20, rsi_exp, rsi_dom);
    }
}

function SetCookie(name, value, expires, domain) {
    try {
        document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/; domain=" + domain;
    }
    catch (ex) {
        throw (ex);
    }
}