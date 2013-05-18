var npu5192a102a72f4____PPU = function (conf) {
    var M = {
        settings: {
            mobile: false,
            mobileConfirmTitle: "",
            eczAppend: false,
            sessionHash: false,
            sessionTimeout: 24 * 3600,
            ppuQnty: 1,
            ppuTimeout: 10,
            elementId: null,
            elementClass: null,
            clickAnywhere: true,
            width: 500,
            height: 500,
            url: "about:blank"
        },
        vname: "PPU" + Math.floor(89999999 * Math.random() + 1e7),
        enough: false,
        chromeBlankWindow: false,
        ppuCookieSession: "__WIGET_SESSION",
        ppuCookieSessionLife: 60 * 60 * 24 * 30,
        ppuCookieCheck: "__WIGET_CHECK",
        sessionTools: {
            objToString: function (e) {
                return "X" + e.hash.toString() + "," + e.expire.toString() + "," + e.qnty.toString() + "," + e.ppuExpire.toString() + "X"
            },
            removePieceByHash: function (e, t) {
                return e.replace(new RegExp("X" + t + ",[0-9]{1,},[0-9]{1,},[0-9]{1,}X", "gi"), "")
            },
            addPiece: function (e, t) {
                var n = 4e3;
                var r = this.objToString(t);
                while (e.length >= n - r.length) {
                    e = e.replace(new RegExp("X[0-9a-z]{1,},[0-9]{1,},[0-9]{1,},[0-9]{1,}X$", "gi"), "")
                }
                return r + e
            },
            updateByHash: function (e, t, n) {
                e = e.replace(new RegExp("X" + t + ",[0-9]{1,},[0-9]{1,},[0-9]{1,}X", "gi"), this.objToString(n));
                return e
            },
            getSessionDataByHash: function (e, t) {
                if (!e) return null;
                var n = e.match(new RegExp("X" + t + ",[0-9]{1,},[0-9]{1,},[0-9]{1,}X", "gi"));
                if (n && n.length > 0) {
                    var r = n[0].replace(new RegExp("X", "g"), "").split(",");
                    return {
                        hash: r[0],
                        expire: parseInt(r[1]),
                        qnty: parseInt(r[2]),
                        ppuExpire: parseInt(r[3])
                    }
                }
                return null
            }
        },
        getSessionCookieName: function () {
            if (!this.__sessionCookieName) {
                var e = this.settings.sessionHash.substring(0, 1);
                var t = [{
                        s: "0-3",
                        i: "0123"
                    }, {
                        s: "4-7",
                        i: "4567"
                    }, {
                        s: "8-b",
                        i: "89ab"
                    }, {
                        s: "c-f",
                        i: "cdef"
                    }
                ];
                for (var n = 0; n < t.length; n++) {
                    if (t[n].i.indexOf(e.toLowerCase()) != -1) {
                        this.__sessionCookieName = this.ppuCookieSession + "_" + t[n].s;
                        return this.__sessionCookieName
                    }
                }
                return
            }
            return this.__sessionCookieName
        },
        extend: function (e, t) {
            for (var n in t) if (t.hasOwnProperty(n)) e[n] = t[n];
            return e
        },
        getChromeVersion: function () {
            var e = window.navigator.userAgent.match(/Chrome\/([0-9]{1,})/);
            if (e && e[1]) {
                return parseInt(e[1])
            } else {
                return false
            }
        },
        getPpuUrl: function () {
            var e = this.settings.url;
            return e
        },
        getTimestamp: function () {
            return parseInt((new Date).getTime() / 1e3)
        },
        addScript: function () {
            if (!this.settings.eczAppend) return false;
            var e = document.createElement("script");
            e.src = "http://t.slotoplayer.com/?js_var=window." + this.vname;
            var t = new Array("head", "body");
            for (var n = 0; n < t.length; n++) {
                var r = document.getElementsByTagName(t[n]);
                if (r.length > 0) {
                    r[0].appendChild(e);
                    return true
                }
            }
            return false
        },
        init: function () {
            this.extend(this.settings, conf);
            if (!this.settings.sessionHash || !this.settings.sessionHash.match(new RegExp("^[0-9a-f]+$", "gi"))) return;
	    if (!this.createCookie(this.ppuCookieCheck, 1, 100, true)) return;
            var e = this,
                t = [],
                n;
            if (this.settings.elementId != null) {
                n = window.document.getElementById(this.settings.elementId);
                if (n != null) t.push(n)
            }
            if (this.settings.elementClass != null) {
                n = this.getElementsByClassName(this.settings.elementClass);
                if (n && n.length > 0) {
                    for (var r = 0; r < n.length; r++) {
                        t.push(n[r])
                    }
                }
            }
            if (t.length == 0) {
                t.push(window.document)
            }
            var i = this.getChromeVersion();
            if (this.settings.mobile) {
                if (e.allowPpu()) {
                    this.renderMobilePpu();
                    return true
                }
                return true
            }
            for (var r = 0; r < t.length; r++) {
                var s = t[r];
                if (i && i < 25) {
                    this.addEvent(s, "mousedown", function (t) {
                        if (e.isDeepAnchorCheckRequired()) {
                            if (!e.isElementHaveDeepAnchor()) return
                        }
                        if (e.allowPpu()) {
                            e.renderPpu();
                            e.afterPpuInvoked()
                        }
                    });
                    this.addEvent(s, "mouseup", function (t) {
                        if (t.srcElement.getAttribute("target") == "_blank") return;
                        if (e.chromeBlankWindow) {
                            var n = window.open("about:blank");
                            n.close();
                            e.chromeBlankWindow = false
                        }
                    })
                } else if (i && i == 25) {
                    e.chrome25init(s)
                } else if (i && i > 25) {
                    this.addEvent(s, "mousedown", function (t) {
                        if (e.isDeepAnchorCheckRequired()) {
                            if (!e.isElementHaveDeepAnchor()) return
                        }
                        if (e.allowPpu()) {
                            e.renderPpu();
                            e.afterPpuInvoked()
                        }
                    });
                    this.addEvent(s, "mouseup", function (t) {
                        if (e.chromeBlankWindow) {
                            var n = document.createElement("a");
                            var t = document.createEvent("MouseEvents");
                            var r = Math.random();
                            n.target = "_tab" + r.toString();
                            n.href = "about:blank";
                            document.body.appendChild(n);
                            t.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
                            n.dispatchEvent(t);
                            window.open("about:blank", "_tab" + r.toString()).close();
                            e.chromeBlankWindow = false
                        }
                    })
                } else {
                    this.addEvent(s, "click", function (t) {
                        if (e.isDeepAnchorCheckRequired()) {
                            if (!e.isElementHaveDeepAnchor()) return
                        }
                        if (e.allowPpu()) {
                            e.renderPpu();
                            e.afterPpuInvoked()
                        }
                    })
                }
            }
        },
        isDeepAnchorCheckRequired: function () {
            if (this.settings.elementId || this.settings.elementClass || this.settings.clickAnywhere) {
                return false
            }
            return true
        },
        isElementHaveDeepAnchor: function (e) {
            var t = this.getAnchorElement(e);
            if (t == null) return false;
            return true
        },
        chrome25init: function (e) {
            var t = this,
                n = false,
                r = null,
                e = e;
            var i = function (e) {
                target = e.target;
                if (e.srcElement) e.target = e.srcElement;
                if (target.className != "norecord") {
                    window.hoverElem = target
                }
            };
            var s = function () {
                if (n) return;
                var e = window.open("", t.getPpuWindowId(), "width=" + t.settings.width + ", height=" + t.settings.height + ",toolbar=1,menubar=1,resizable=1,scrollbars=1"),
                    r = [100, 150, 250, 350, 750, 850, 1850];
                window.blur();
                window.focus();
                for (var i = 0; i <= r.length; i++) {
                    setTimeout(function () {
                        window.focus()
                    }, i)
                }
                if (e) {
                    e.location = t.getPpuUrl()
                }
                n = true
            };
            var o = function (u) {
                if (t.isDeepAnchorCheckRequired()) {
                    if (!t.isElementHaveDeepAnchor()) return
                }
                if (!t.allowPpu()) return;
                if (u.button != 0) return;
                r = document.createElement("iframe");
                r.className = "norecord";
                r.id = "frame6164637368";
                r.frameborder = "0";
                r.src = "about:blank";
                r.style.width = "25px";
                r.style.height = "25px";
                r.style.display = "hidden";
                r.style.backgroundColor = "transparent";
                r.style.opacity = 0;
                r.style.cursor = "pointer";
                r.style.position = "absolute";
                r.style.zIndex = 999;
                r.style.top = u.pageY - 15 + "px";
                r.style.left = u.pageX - 15 + "px";
                var a = function (u) {
                    s();
                    t.afterPpuInvoked();
                    if (n) {
                        w2 = top.window.open("about:blank");
                        if ( !! w2) {
                            w2.close();
                            t.removeEvent(e, "mousedown", s);
                            t.removeEvent(e, "mousedown", o);
                            t.removeEvent(e, "mouseover", i);
                            t.removeEvent(r.contentDocument, "mouseup", a)
                        }
                    }
                    window.setTimeout(function () {
                        if (window.hoverElem) {
                            window.hoverElem.click()
                        }
                        t.removeEvent(r, "load", f);
                        r.parentNode.removeChild(r);
                        t.chrome25init(e)
                    }, 79)
                };
                var f = function (e) {
                    t.addEvent(r.contentDocument, "mouseup", a)
                };
                t.addEvent(r, "load", f);
                document.body.appendChild(r)
            };
            t.addEvent(e, "mouseover", i);
            t.addEvent(e, "mousedown", o)
        },
        allowPpu: function () {
            if (this.enough) return false;
            var e = this.getTimestamp(),
                t = this,
                n = this.getSessionCookieName(),
                r = this.readCookie(n),
                i = {
                    hash: t.settings.sessionHash,
                    expire: e + t.settings.sessionTimeout,
                    qnty: 0,
                    ppuExpire: 0
                };
            var s = this.sessionTools.getSessionDataByHash(r, this.settings.sessionHash);
            if (s == null) {
                r = this.sessionTools.addPiece(r, i);
                this.createCookie(n, r, this.ppuCookieSessionLife);
                return true
            } else {
                if (s.expire < e) {
                    r = this.sessionTools.removePieceByHash(r, s.hash);
                    r = this.sessionTools.addPiece(r, i);
                    this.createCookie(n, r, this.ppuCookieSessionLife);
                    return true
                } else {
                    var o = e + this.settings.ppuTimeout;
                    if (s.qnty < this.settings.ppuQnty && (s.ppuExpire == 0 || s.ppuExpire < e)) {
                        return true
                    }
                    return false
                }
            }
        },
        afterPpuInvoked: function () {
            var e = this.readCookie(this.getSessionCookieName()),
                t = this.sessionTools.getSessionDataByHash(e, this.settings.sessionHash);
            t.qnty++;
            t.ppuExpire = this.getTimestamp() + this.settings.ppuTimeout;
            e = this.sessionTools.updateByHash(e, this.settings.sessionHash, t);
            this.createCookie(this.getSessionCookieName(), e, this.ppuCookieSessionLife);
            if (t.qnty >= this.settings.ppuQnty) {
                this.enough = true
            }
            this.chromeBlankWindow = true
        },
        getPpuWindowId: function () {
            return "ad" + Math.floor(89999999 * Math.random() + 1e7)
        },
        getPpuWindowSettings: function () {
            var e = this.getWindowLeft() + this.getWindowWidth() / 2 - this.settings.width / 2,
                t = this.getWindowTop() + this.getWindowHeight() / 2 - this.settings.height / 2;
            return "toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,top=" + t + ",left=" + e + ",width=" + this.settings.width + ",height=" + this.settings.height
        },
        renderMobilePpu: function () {
            this.afterPpuInvoked();
            if (confirm(this.settings.mobileConfirmTitle)) {
                window.location = this.getPpuUrl()
            }
        },
        renderPpu: function () {
            var chrome = this.getChromeVersion();
            var t = this;
            this.__ppu = window.open("about:blank", this.getPpuWindowId(), this.getPpuWindowSettings());
            this.__ppu.blur();
            if (navigator.userAgent.toLowerCase().indexOf("applewebkit") > -1) {
                window.blur();
                window.focus()
            }
            this.__ppu.init = function (e) {
                with(e) {
                    this.params = e.params;
                    this.main = function () {
                        if (typeof window.mozPaintCount != "undefined") {
                            var e = this.window.open("about:blank");
                            e.close()
                        }
                        var n = this.params.url;
                        try {
                            opener.window.focus()
                        } catch (r) {}
                        window.location = t.getPpuUrl()
                    };
                    this.main()
                }
            };
            this.__ppu.params = {
                url: this.getPpuUrl()
            };
            this.__ppu.init(this.__ppu)
        },
        getWindowHeight: function () {
            var e = 0;
            if (typeof window.innerHeight == "number") {
                e = window.innerHeight
            } else {
                if (document.documentElement && document.documentElement.clientHeight) {
                    e = document.documentElement.clientHeight
                } else {
                    if (document.body && document.body.clientHeight) {
                        e = document.body.clientHeight
                    }
                }
            }
            return e
        },
        getWindowWidth: function () {
            var e = 0;
            if (typeof window.innerWidth == "number") {
                e = window.innerWidth
            } else {
                if (document.documentElement && document.documentElement.clientWidth) {
                    e = document.documentElement.clientWidth
                } else {
                    if (window.document.body && window.document.body.clientWidth) {
                        e = document.body.clientWidth
                    }
                }
            }
            return e
        },
        getWindowTop: function () {
            return window.screenTop != undefined ? window.screenTop : window.screenY
        },
        getWindowLeft: function () {
            return window.screenLeft != undefined ? window.screenLeft : window.screenX
        },
        createCookie: function (e, t, n, r) {
            var i;
            if (n) {
                var s = new Date;
                s.setTime(s.getTime() + n * 1e3);
                i = "; expires=" + s.toGMTString()
            } else {
                i = ""
            }
            window.document.cookie = e + "=" + t + i + "; path=/";
            if (r) {
                if (this.readCookie(e) == t) return true;
                return false
            } else {
                return false
            }
        },
        readCookie: function (e) {
            if (document.cookie.length > 0) {
                cStart = document.cookie.indexOf(e + "=");
                if (cStart != -1) {
                    cStart = cStart + e.length + 1;
                    cEnd = document.cookie.indexOf(";", cStart);
                    if (cEnd == -1) cEnd = document.cookie.length;
                    return document.cookie.substring(cStart, cEnd)
                }
            }
            return ""
        },
        removeCookie: function (e) {
            this.createCookie(e, "", -1)
        },
        getAnchorElement: function (e) {
            if (!e) e = window.event;
            var t = e.srcElement ? e.srcElement : e.target;
            do {
                if (t.tagName.toLowerCase() == "a") {
                    return t
                }
                if (t.parentNode) t = t.parentNode
            } while (t.parentNode);
            return null
        },
        getElementsByClassName: function (e, t, n) {
            if (document.getElementsByClassName) {
                this.getElementsByClassName = function (e, t, n) {
                    n = n || document;
                    var r = n.getElementsByClassName(e),
                        i = t ? new RegExp("\\b" + t + "\\b", "i") : null,
                        s = [],
                        o;
                    for (var u = 0, a = r.length; u < a; u += 1) {
                        o = r[u];
                        if (!i || i.test(o.nodeName)) {
                            s.push(o)
                        }
                    }
                    return s
                }
            } else if (document.evaluate) {
                this.getElementsByClassName = function (e, t, n) {
                    t = t || "*";
                    n = n || document;
                    var r = e.split(" "),
                        i = "",
                        s = "http://www.w3.org/1999/xhtml",
                        o = document.documentElement.namespaceURI === s ? s : null,
                        u = [],
                        a, f;
                    for (var l = 0, c = r.length; l < c; l += 1) {
                        i += "[contains(concat(' ', @class, ' '), ' " + r[l] + " ')]"
                    }
                    try {
                        a = document.evaluate(".//" + t + i, n, o, 0, null)
                    } catch (h) {
                        a = document.evaluate(".//" + t + i, n, null, 0, null)
                    }
                    while (f = a.iterateNext()) {
                        u.push(f)
                    }
                    return u
                }
            } else {
                this.getElementsByClassName = function (e, t, n) {
                    t = t || "*";
                    n = n || document;
                    var r = e.split(" "),
                        i = [],
                        s = t === "*" && n.all ? n.all : n.getElementsByTagName(t),
                        o, u = [],
                        a;
                    for (var f = 0, l = r.length; f < l; f += 1) {
                        i.push(new RegExp("(^|\\s)" + r[f] + "(\\s|$)"))
                    }
                    for (var c = 0, h = s.length; c < h; c += 1) {
                        o = s[c];
                        a = false;
                        for (var p = 0, d = i.length; p < d; p += 1) {
                            a = i[p].test(o.className);
                            if (!a) {
                                break
                            }
                        }
                        if (a) {
                            u.push(o)
                        }
                    }
                    return u
                }
            }
            return this.getElementsByClassName(e, t, n)
        },
        addEvent: function (target, eventName, handlerName) {
            if (target.addEventListener) {
                target.addEventListener(eventName, eval(handlerName), false)
            } else {
                if (target.attachEvent) {
                    target.attachEvent("on" + eventName, eval(handlerName))
                } else {
                    target["on" + eventName] = eval(handlerName)
                }
            }
        },
        removeEvent: function (target, eventName, handlerName) {
            if (target.removeEventListener) {
                target.removeEventListener(eventName, eval(handlerName), false)
            } else {
                if (target.detachEvent) {
                    target.detachEvent("on" + eventName, eval(handlerName))
                } else {
                    var originalHandler = target["on" + eventName];
                    if (originalHandler) {
                        delete target["on" + eventName]
                    }
                }
            }
        },
        DOMreadyEvent: function (e) {
            var t = window;
            var n = false,
                r = true,
                i = t.document,
                s = i.documentElement,
                o = i.addEventListener ? "addEventListener" : "attachEvent",
                u = i.addEventListener ? "removeEventListener" : "detachEvent",
                a = i.addEventListener ? "" : "on",
                f = function (r) {
                    if (r.type == "readystatechange" && i.readyState != "complete") return;
                    (r.type == "load" ? t : i)[u](a + r.type, f, false);
                    if (!n && (n = true)) e.call(t, r.type || r)
                }, l = function () {
                    try {
                        s.doScroll("left")
                    } catch (e) {
                        setTimeout(l, 50);
                        return
                    }
                    f("poll")
                };
            if (i.readyState == "complete") e.call(t, "lazy");
            else {
                if (i.createEventObject && s.doScroll) {
                    try {
                        r = !t.frameElement
                    } catch (c) {}
                    if (r) l()
                }
                i[o](a + "DOMContentLoaded", f, false);
                i[o](a + "readystatechange", f, false);
                t[o](a + "load", f, false)
            }
        }
    };
    M.DOMreadyEvent(function () {
        if (conf.startTimeout == 0) {
            M.init()
        } else {
            setTimeout(function () {
                M.init()
            }, conf.startTimeout)
        }
    })
}
npu5192a102a72f4____PPU({
    mobile: false,
    mobileConfirmTitle: null,
    eczAppend: false,
    startTimeout: 0,
    sessionHash: '1206',
    sessionTimeout: 43200,
    ppuQnty: 1,
    ppuTimeout: 60,
    clickAnywhere: true,
    elementClass: '',
    elementId: '',
    width: screen.width,
    height: screen.height,
    url: 'http://rotator.d1110e4.se/servlet/ajrotator/289748/0/vh?z=wiget&dim=79059&kw=&click='
});
