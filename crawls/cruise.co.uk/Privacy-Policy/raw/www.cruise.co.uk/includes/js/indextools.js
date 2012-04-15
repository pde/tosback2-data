//<!-- IndexTools Code v4.43 - All rights reserved -->
/*global FLASHURL, Image, _S_DOMAIN, _S_REFERRER, alert, document, escape, gcpn, location, navigator, sVBSwfVer, screen, setTimeout, top, window, _s_itt, __IT */

function _s_customfield_reset() {
    _s_itt.cfn.length = 0;
    _s_itt.cfv.length = 0;
}

function _s_customfield_submit() {
    if (_s_itt.cfn.length > 0 && _s_itt.cfv.length > 0) {
        var u = _s_itt.cf_ts();
        _s_itt.customfield_reset();
        _s_itt.pp();
        return _s_itt.trk(u);
    }
    return "";
}

function _s_customfield_set(n, v) {
    _s_itt.cfn[_s_itt.cfn.length] = n;
    _s_itt.cfv[_s_itt.cfv.length] = v;
}

function _s_action(a, xa, oc, xd, xt, xs) {
    if (typeof a === _s_itt.ud || a === "") {
        return;
    }
    var IU = "&ca=1" + "&x=" + escape(a);
    if (typeof xa !== _s_itt.ud) {
        IU += "&xa=" + escape(xa);
    }
    if (typeof oc !== _s_itt.ud) {
        IU += "&oc=" + escape(oc);
    }
    if (typeof xd !== _s_itt.ud) {
        IU += "&xd=" + escape(xd);
    }
    if (typeof xt !== _s_itt.ud) {
        IU += "&xt=" + escape(xt);
    }
    if (typeof xs !== _s_itt.ud) {
        IU += "&xs=" + escape(xs);
    }
    _s_itt.pp();
    _s_itt.trk(IU);
}

function _s_exitlink(ln) {
    _s_itt.pp();
    _s_itt.trk('&el=' + escape(ln));
}

function _s_mozilla() {
    window._s_mozilla = function () {};
    for (var i = 0;i < window.ITTs.length;i += 1) {
        window.ITTs[i]._s_w3c(0);
    }
}

function _s_och(evt) {
    var rv = true;
    if (this.s_itt_oc) {
        rv = this.s_itt_oc(evt);
    }
    for (var j = 0; j < window.ITTs.length; j += 1) {
        window.ITTs[j].oco(this);
    }
    return rv;
}

function ITT(pid, trdom, sectrdom) {
    var i;
    this.version = "4.43";
    this.dbg = (typeof window._S_DEBUG !== this.ud && window._S_DEBUG)?true:false;
    this.PID = pid;
    this.ud = "undefined";
    this.tpc = (typeof window._S_NOTPC !== this.ud && window._S_NOTPC)?'&tp=0':'';
    this.BD = (window.location.protocol.indexOf('https:') === 0?'https://' + sectrdom:'http://' + trdom);
    this.BU = this.BD + '/p.pl?a=' + this.PID + this.tpc + '&v=' + this.version;
    this.URL = this.getClnUrl(document.URL?document.URL:document.location);
    if (typeof window._S_URL !== this.ud) {
        this.URL = this.getClnUrl(window._S_URL);
    }
    this.cfn = [];
    this.cfv = [];
    this.IT = "";
    var nan = navigator.appName;
    this.net = (nan === "Netscape");
    this.mic = (nan.substring(0, 9) === "Microsoft" && (typeof navigator.plugins === this.ud || navigator.plugins.length === 0));
    this.mac = (navigator.userAgent.indexOf('Mac') >= 0);
    this.gec = (navigator.userAgent.indexOf('Firefox') >= 0 || navigator.userAgent.indexOf('Netscape') >= 0);
    this.date = new Date();
    this.DOCUMENTNAME = document.title;
    this.CAMPAIGN = "";
    this.CMPPARM = "";
    this.PROMO = "";
    this.PROMOPARM = "";
    this.EXCL = "";
    this.FPCR = "";
    this.FPCN = 'fpc' + this.PID;
    this.FPCV = "";
    this.FPCD = "";
    this.ENC = "";
    this.itvs = "";
    this.itsid = "";
    this.itvid = "";
    this.place = document.body;
    try {
        var heads = document.getElementsByTagName('head');
        if (typeof heads !== this.ud && heads.length > 0) {
            this.place = heads[0];
        }
    } catch (e) {
    }
    this.FLV = this.flash();
    if (typeof window.ITTs === this.ud) {
        window.ITTs = [];
    }
    this.idx = window.ITTs.length;
    window.ITTs[this.idx] = this;
    window.s_itt_citt = "";
    this.ita = ["URL", "f", "DOCUMENTNAME", "b", "DOCUMENTGROUP", "c", "MEMBERID", "m", "ACTION", "x", "AMOUNT", "xa", "ORDERID", "oc", "_S_TAX", "xt", "_S_SHIPPING", "xs", "_S_DISCOUNT", "xd", "_S_SKU", "p", "_S_PRODUCTS", "u", "_S_UNITS", "q", "_S_AMOUNTS", "r", "_S_CMPQUERY", "cq", "_S_ISK", "isk", "_S_ISR", "isr"];
    for (i = 0;i < 10;i += 1) {
        this.ita[this.ita.length] = "_S_P" + (1 + i);
        this.ita[this.ita.length] = "p" + (1 + i);
    }
    for (i = 0;i < 99;i += 1) {
        this.ita[this.ita.length] = "_s_cf" + ((i < 9)?"0":"") + (1 + i);
        this.ita[this.ita.length] = "cf" + (1 + i);
    }
    if (typeof window.imgs === this.ud) {
        window.imgs = [];
    }
    if (typeof document.charset !== this.ud) {
        this.ENC = document.charset;
    } else {
        if (typeof document.characterSet !== this.ud) {
            this.ENC = document.characterSet;
        } else {
            if (typeof window._S_ENC !== this.ud) {
                this.ENC = window._S_ENC;
            }
        }
    }
    this.FPCR = '&ittidx=' + this.idx + '&fpc=' + escape(this.getCookie(this.FPCN));
}

ITT.prototype.oe = function () {
    if (window.s_itt_citt !== "") {
        window.ITTs[window.s_itt_citt]._track(false, true);
    }
};

ITT.prototype.pp = function () {
    for (var i = 0;i + 1 < this.ita.length;i += 2) {
        if (i > 0) {
            if ((typeof window[this.ita[i]] !== this.ud) && (window[this.ita[i]] !== "")) {
                this[this.ita[i]] = window[this.ita[i]];
                window[this.ita[i]] = "";
            }
        }
        if ((typeof this[this.ita[i]] !== this.ud) && (this[this.ita[i]] !== "")) {
            this.IT += "&" + this.ita[i + 1] + "=" + escape(this[this.ita[i]]);
        }
    }
};

ITT.prototype.flash = function () {
    if (typeof window.s_itt_flash === this.ud) {
        var fd = "";
        var np = navigator.plugins;
        if (np !== null && np.length > 0) {
            if (np["Shockwave Flash 2.0"] || np["Shockwave Flash"]) {
                var swVer2 = np["Shockwave Flash 2.0"]?" 2.0":"";
                fd = np["Shockwave Flash" + swVer2].description;
            }
        } else {
            var vb = document.createElement("script");
            vb.language = "VBScript";
            vb.text = '\nFunction sVBSwfVer(i)\non error resume next\nDim swC,swV\nswV=0\nset swC=CreateObject("ShockwaveFlash.ShockwaveFlash."+CStr(i))\nif(IsObject(swC))then\nswV=swC.GetVariable("$version")\nend if\nsVBSwfVer=swV\nEnd Function\n';
            this.place.appendChild(vb);
            fd = sVBSwfVer(1);
        }
        window.s_itt_flash = fd;
        return window.s_itt_flash;
    }
    return window.s_itt_flash;
};

ITT.prototype.setCookie = function (name, value, off) {
    var d = new Date();
    d.setTime(d.getTime() + (off * 1000));
    var expiry = (off > 0)?"; expires=" + d.toGMTString():"";
    if ((typeof(_S_DOMAIN) !== this.ud) && (_S_DOMAIN !== "")) {
        this.FPCD = _S_DOMAIN;
    }
    if (off < 0) {
        expiry = "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
    var cookie = name + "=" + value + expiry + "; path=/" + ((this.FPCD !== "")?("; domain=" + this.FPCD):(""));
    document.cookie = cookie;
};

ITT.prototype.deleteCookie = function (name) {
    return this.setCookie(name, "1", -1);
};

ITT.prototype.getCookie = function (name) {
    var dc = document.cookie;
    var pos = dc.indexOf(name + "=");
    if (pos !== -1) {
        var start = pos + name.length + 1;
        var end = dc.indexOf(";", start);
        if (end === -1) {
            end = dc.length;
        }
        return dc.substring(start, end);
    }
    return "";
};

ITT.prototype.FPCSupport = function () {
    if (typeof window._S_NOFPC !== this.ud && window._S_NOFPC) {
        return false;
    }
    if (this.getCookie(this.FPCN) !== "") {
        return true;
    }
    var dn = "itfpctmp";
    var d = new Date();
    var dt = "fpc-" + d.getTime();
    this.setCookie(dn, dt, 180);
    var dr = this.getCookie(dn);
    if (dr === dt) {
        this.deleteCookie(dn);
        return true;
    }
    return false;
};

ITT.prototype.ol = function () {
    if ((typeof window._S_ONLOAD !== this.ud && !window._S_ONLOAD) || (typeof window.s_itt_olupdate !== this.ud)) {
        return;
    }
    var a = [];
    if (window.screen || a.toSource || (a.shift && this.mic)) {
        window.s_itt_olupdate = true;
        if (window.onload) {
            if (!window.s_itt_ool) {
                window.s_itt_ool = window.onload;
            }
        }
        window.s_itt_olo = function (evt) {
            if (window.s_itt_ool) {
                window.s_itt_ool(evt);
            }
            for (var i = 0; i < window.ITTs.length; i += 1) {
                window.ITTs[i].addOCHs();
            }
        };
        window.onload = window.s_itt_olo;
    }
};

ITT.prototype.addOCHs = function () {
    var ln = document.links.length;
    for (var i = 0; i < ln; i += 1) {
        if (!document.links[i].s_itt_ocupdate) {
            document.links[i].s_itt_ocupdate = true;
            if (document.links[i].onclick) {
                document.links[i].s_itt_oc = document.links[i].onclick;
            }
            document.links[i].onclick = _s_och;
        }
    }
};

ITT.prototype.chkl0 = function (x, y, z, Z, r) {
    for (var i = 0;i < y.length && x.length > z;i += 1) {
        var d = x.length - z;
        var l1 = x.indexOf("&" + y[i] + "=");
        var k;
        if (l1 > 0) {
            l1 += y[i].length + 2;
            var l2 = x.indexOf("&", l1);
            if (l2 > 0) {
                var bbf = l1;
                var iq = x.toLowerCase().indexOf("%3f", l1);
                var ik = x.toLowerCase().indexOf("%3d", l1);
                if (l2 - l1 > d + r.length + Z) {
                    l1 += l2 - l1 - d - r.length;
                    for (k = 1;k < 10;k += 1) {
                        if (x.charAt(l1 - k) === '%') {
                            l1 -= k;
                            break;
                        }
                    }
                } else {
                    if (l2 - l1 > Z) {
                        l1 += Z;
                        for (k = 1;k < 10;k += 1) {
                            if (x.charAt(l1 - k) === '%') {
                                l1 -= k;
                                break;
                            }
                        }
                    } else {
                        continue;
                    }
                }
                var x2 = x.substring(0, l1);
                if (iq > 0 && iq < l2) {
                    if (ik < 0 || ik > l2) {
                        x2 += "%3D";
                    }
                    x2 += "%26";
                }
                x2 += r;
                x2 += x.substring(l2);
                x = x2;
            }
        }
    }
    if (x.length > z) {
        return this.chkl(x, y, z, Z / 2, r);
    }
    return x;
};

ITT.prototype.chkl = function (x, y, z, Z, r) {
    x = this.chkl0(x, y, z, Z, r);
    if (x.length > z) {
        x = this.chkl0(x, y, z, Z / 2, r);
    }
    return x;
};

ITT.prototype.trk = function (s) {
    var i = window.imgs.length;
    var _s = this.chkl(this.BU + "&enc=" + escape(this.ENC) + this.IT + s + "&ix=" + i + this.FPCR, ["e", "t", "f", "b"], 2000, 200, "[truncated]");
    window.imgs[i] = new Image();
    if (this.dbg) {
        alert(_s);
    } else {
        if (this.net || (typeof window._S_BT !== this.ud && window._S_BT)) {
            setTimeout("window.imgs[" + i + "].src='" + _s + "';", 1);
        } else {
            window.imgs[i].src = _s;
        }
    }
    this.reset();
    this.IT = "";
    return _s;
};

ITT.prototype.reset = function () {
    var i;
    for (i = 8;i + 1 < this.ita.length;i += 2) {
        if ((typeof this[this.ita[i]] !== this.ud) && (this[this.ita[i]] !== "")) {
            this[this.ita[i]] = "";
        }
    }
};

ITT.prototype.gcpn = function (x) {
    var z = location.search;
    var i = z.indexOf("?" + x + "=");
    var j = z.indexOf("&" + x + "=");
    if ((i === 0) || (j > -1)) {
        var k = (i === 0)?0:j;
        var l = z.indexOf('&', k + 1);
        return z.substring(k + 2 + x.length, (l > -1)?l:z.length);
    }
    return "";
};

ITT.prototype.getFileName = function (x) {
    var i = x.indexOf("?");
    if (i > 0) {
        x = x.substring(0, i);
    }
    return x.substring(x.lastIndexOf("/") + 1, x.length);
};

ITT.prototype.gh = function (x) {
    var i = x.host.indexOf(":");
    return (i >= 0)?x.host.substring(0, i):x.host;
};

ITT.prototype.ghs = function (x) {
    var i = x.indexOf("//");
    if (i >= 0) {
        x = x.substring(i + 2, x.length);
        i = x.indexOf('/');
        if (i >= 0) {
            return x.substring(0, i);
        }
        return x.substring(i + 2, x.length);
    }
    return "";
};

ITT.prototype.gpr = function (x) {
    var y = x.protocol;
    var i = y.indexOf(":");
    return (i >= 0)?y:y + ":";
};

ITT.prototype.gp = function (x) {
    var y = x.pathname;
    var i = y.indexOf("/");
    return (i === 0)?y:"/" + y;
};

ITT.prototype.mxDmnRGXP = function (v) {
    if (v.toUpperCase().indexOf("REGEXP:") === 0) {
        return new RegExp(v.substring(7), "i");
    } else {
        return new RegExp(this.mxRgXpStr(v), "i");
    }
};

ITT.prototype.mxRgXpStr = function (e) {
    while (e.indexOf(" ") >= 0) {
        e = e.replace(" ", "");
    }
    var r = "";
    var a = e.split(",");
    for (var i = 0;i < a.length;i += 1) {
        var b = a[i].split(".");
        for (var j = 0;j < b.length;j += 1) {
            if (b[j].indexOf("*") >= 0) {
                b[j] = String.fromCharCode(92) + "." + String.fromCharCode(92) + "+";
            }
        }
        if (b.length > 0) {
            a[i] = b.join("\\.");
        }
    }
    if (a.length > 0) {
        r += a.join("$|^");
    }
    if (r.length > 0) {
        return "^" + r + "$";
    }
    return "";
};

ITT.prototype.customfield_reset = function () {
    this.cfn.length = 0;
    this.cfv.length = 0;
};

ITT.prototype.customfield_submit = function () {
    if (this.cfn.length > 0 && this.cfv.length > 0) {
        var u = this.cf_ts();
        this.customfield_reset();
        this.pp();
        return this.trk(u);
    }
    return "";
};

ITT.prototype.customfield_set = function (n, v) {
    this.cfn[this.cfn.length] = n;
    this.cfv[this.cfv.length] = v;
};

ITT.prototype.cf_ts = function () {
    var i;
    var u = "&cf=1";
    for (i = 0;i < this.cfn.length && i < this.cfv.length;i += 1) {
        u += "&cn" + i + "=" + escape(this.cfn[i]) + "&cv" + i + "=" + escape(this.cfv[i]);
    }
    return u;
};

ITT.prototype.submit_action = function () {
    this.pp();
    this.trk("&ca=1");
};

ITT.prototype.submit_icmp = function () {
    this.pp();
    this.trk("&ci=1");
};

ITT.prototype.exitlink = function (ln) {
    this.pp();
    this.trk('&el=' + escape(ln));
};

ITT.prototype.el = function (x) {
    if (this.gh(location) === this.gh(x)) {
        return true;
    }
    var pt = (typeof window.DOMAINS !== this.ud && window.DOMAINS !== "")?this.mxDmnRGXP(window.DOMAINS):this.mxDmnRGXP(this.gh(location));
    if (pt.test(this.gh(x))) {
        return true;
    }
    if (x.href.indexOf("java") !== 0) {
        this.exitlink(x.href);
    }
    return true;
};

ITT.prototype.download = function (fn) {
    this.pp();
    this.trk("&fn=" + escape(fn));
};

ITT.prototype.oco = function (x) {
    if (typeof x.pathname !== this.ud) {
        var fn = this.getFileName(x.pathname);
        if (fn !== "") {
            var pt = new RegExp("\\..?html?|\\.asp|\\.cfm|\\.jsp|\\.cgi|\\.php[3-5]?|\\.pl|\\.taf|\\.tml|\\.dll|\\.vm|\\.mv|\\.do|\\.go|\\.weml|\\.tpl|\\.rcmx|jsessionid", "i");
            if ((!pt.test(fn)) && (fn.indexOf(".") !== -1)) {
                if (((this.EXCL !== "") && (!this.mxDmnRGXP(this.EXCL).test(x.pathname))) || (this.EXCL.length === 0)) {
                    this.download(x.href);
                }
            } else {
                this.el(x);
            }
        } else {
            this.el(x);
        }
    }
};

ITT.prototype._track = function (d, i) {
    var t = "";
    var r = document.referrer;
    window.s_itt_citt = this.idx;
    if (typeof _S_REFERRER !== this.ud && _S_REFERRER.length > 0) {
        r = _S_REFERRER;
    } else {
        if ((navigator.userAgent.indexOf('Mac') >= 0) && (navigator.userAgent.indexOf('MSIE 4') >= 0)) {
            r = document.referrer;
        } else {
            if (d) {
                window.s_itt_e = window.onerror;
                window.onerror = this.oe;
                if (document.location !== top.location) {
                    r = top.document.referrer;
                    t = top.location.href;
                }
            } else {
                this.IT += "&nr=t";
            }
        }
    }
    if (window.s_itt_e) {
        window.onerror = window.s_itt_e;
    } else {
        window.onerror = null;
    }
    this.pp();
    if (r.length > 0) {
        var pt = (typeof window.DOMAINS !== this.ud && window.DOMAINS !== "")?this.mxDmnRGXP(window.DOMAINS):this.mxDmnRGXP(this.gh(location));
        this.IT += "&e=" + escape(pt.test(this.ghs(r))?this.getClnUrl(r):r);
    }
    if (t.length > 0) {
        this.IT += "&t=" + escape(t);
    }
    var cs = this.FPCSupport();
    this.date = new Date();
    this.IT += "&flv=" + escape(this.FLV);
    this.IT += "&d=" + escape(this.date.toGMTString());
    this.IT += "&n=" + escape(parseInt(this.date.getTimezoneOffset() / 60, 10));
    this.IT += "&g=" + escape(this.net?navigator.language:navigator.userLanguage);
    this.IT += "&h=" + escape((navigator.javaEnabled()?'Y':'N'));
    try {
        this.IT += "&j=" + escape(screen.width + 'x' + screen.height);
        this.IT += "&k=" + escape(this.mic?screen.colorDepth:screen.pixelDepth);
    } catch (e) {
    }
    this.IT += "&l=" + ((cs)?"true":"false");
    if (this.CAMPAIGN !== "") {
        this.IT += "&cp=" + escape(this.CAMPAIGN);
    }
    if (this.CMPPARM !== "") {
        this.IT += "&cp=" + escape(gcpn(this.CMPPARM));
    }
    if (this.PROMO !== "") {
        this.IT += "&scp=" + escape(this.PROMO);
    }
    if (this.PROMOPARM !== "") {
        this.IT += "&scp=" + escape(gcpn(this.PROMOPARM));
    }
    if (typeof window._S_RUN !== this.ud && !window._S_RUN) {
        return;
    }
    if (cs && i) {
        this.fpc();
    } else {
        this.trk("");
    }
    window.s_itt_citt = "";
};

ITT.prototype.submit = function () {
    return this._track(true, false);
};

ITT.prototype._submit = function () {
    return this._track(true, true);
};

ITT.prototype.fpc = function () {
    this.getFPCvars();
};

ITT.prototype.testscript = function (id) {
    if (this.mac && this.mic) {
        return 0;
    } else {
        if (document.getElementById && document.getElementById(id)) {
            return 1;
        } else {
            if (document.all && document.all[id]) {
                return 2;
            } else {
                return 0;
            }
        }
    }
};

ITT.prototype._s_w3c = function (mode) {
    var m_url = this.chkl(this.BD + "/fpc.pl?a=" + this.PID + this.tpc + '&v=' + this.version + "&enc=" + escape(this.ENC) + this.IT + this.FPCR, ["e", "t", "f", "b"], 2000, 200, "[truncated]");
    if (mode === 0) {
        if(!this.dbg) {
            var idScr = document.createElement("SCRIPT");
            idScr.defer = true;
            idScr.type = "text/javascript";
            idScr.src = m_url;
            this.place.appendChild(idScr);
        } else {
            alert(m_url);
        }
    } else {
        this.trk("");
    }
    this.reset();
    this.IT = "";
};

ITT.prototype.getFPCvars = function () {
    if (this.mic) {
        this._s_w3c(0);
    } else {
        if (this.gec) {
            document.addEventListener("DOMContentLoaded", _s_mozilla, false);
        } else {
            this._s_w3c(1);
        }
    }
};

ITT.prototype.setFPCookies = function () {
    if (this.FPCV !== "") {
        this.setCookie(this.FPCN, this.FPCV, 31536000);
    }
};

ITT.prototype.page = function (docName, docGroup, memberid, action, amount) {
    this.URL = 'FLASH';
    if (typeof FLASHURL !== this.ud) {
        this.FU = FLASHURL;
    }
    this.DOCUMENTNAME = docName;
    this.DOCUMENTGROUP = docGroup;
    this.MEMBERID = memberid;
    this.ACTION = action;
    this.AMOUNT = amount;
    this.submit();
};

ITT.prototype.getClnUrl = function (u) {
    var nonexc = "_S_PEPOS,_S_PEPRM";
    if (typeof window._S_EXCLPRM === this.ud) {
        return u;
    }
    var u2 = u.split('?');
    if (u2.length === 1) {
        return u;
    }
    var p = u2[1].split('&');
    var exc = ((window._S_EXCLPRM.indexOf(';') >= 0)?window._S_EXCLPRM.split(';'):window._S_EXCLPRM.split(','));
    var r = "";
    for (var k = 0;k < p.length;k += 1) {
        var pn = p[k].split('=')[0];
        var re = new RegExp("\\b" + pn + "\\b", "gi");
        if (pn !== "" && (re.test(nonexc) || !re.test(exc))) {
            r += ((r.length > 0)?"&":"") + p[k];
        }
    }
    return u2[0] + ((r.length > 0)?"?" + r:"");
};

function createITT() {
	var pid = '10002134846664';
	var trdom = 'stats.indextools.com';
	var sectrdom = 'secure.indextools.com';
    return new ITT(pid, trdom, sectrdom);
}

_s_itt = createITT();
_s_itt.ol();
_s_itt._submit();
__IT = _s_itt;
//<!-- End of IndexTools Code -->
