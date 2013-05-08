var _pb = {
    initialize: function () {
        this.ua.initialize()
    },
    ua: {
        initialize: function () {
            this.browser = this.searchString(this.list_browser) || 'unknown';
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'unknown';
            this.os = this.searchString(this.list_os) || 'unknown'
        },
        list_browser: [{
                str: navigator.userAgent,
                subStr: 'Chrome',
                id: 'Chrome',
            }, {
                str: navigator.userAgent,
                subStr: 'OmniWeb',
                versionSearch: 'OmniWeb/',
                id: 'OmniWeb',
            }, {
                str: navigator.vendor,
                subStr: 'Apple',
                id: 'Safari',
                versionSearch: 'Version',
            }, {
                prop: window.opera,
                id: 'Opera',
                versionSearch: 'Version'
            }, {
                str: navigator.vendor,
                subStr: 'iCab',
                id: 'iCab',
            }, {
                str: navigator.vendor,
                subStr: 'KDE',
                id: 'Konqueror',
            }, {
                str: navigator.userAgent,
                subStr: 'Firefox',
                id: 'Firefox',
            }, {
                str: navigator.vendor,
                subStr: 'Camino',
                id: 'Camino',
            }, {
                str: navigator.userAgent,
                subStr: 'Netscape',
                id: 'Netscape',
            }, {
                str: navigator.userAgent,
                subStr: 'MSIE',
                id: 'Explorer',
                versionSearch: 'MSIE',
            }, {
                str: navigator.userAgent,
                subStr: 'Gecko',
                id: 'Mozilla',
                versionSearch: 'rv',
            }, {
                str: navigator.userAgent,
                subStr: 'Mozilla',
                id: 'Netscape',
                versionSearch: 'Mozilla',
            }
        ],
        list_os: [{
                str: navigator.platform,
                subStr: 'Win',
                id: 'Windows',
            }, {
                str: navigator.platform,
                subStr: 'Mac',
                id: 'Mac',
            }, {
                str: navigator.userAgent,
                subStr: 'iPhone',
                id: 'iPhone/iPod',
            }, {
                str: navigator.platform,
                subStr: 'Linux',
                id: 'Linux',
            }
        ],
        searchString: function (e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t].str;
                var r = e[t].prop;
                this.versionSearchString = e[t].versionSearch || e[t].id;
                if (n) {
                    if (n.indexOf(e[t].subStr) != -1) return e[t].id
                } else if (r) return e[t].id
            }
        },
        searchVersion: function (e) {
            var t = e.indexOf(this.versionSearchString);
            if (t == -1) return;
            return parseFloat(e.substr(t + this.versionSearchString.length + 1))
        },
    },
    cookie: {
        get: function (a, b) {
            var c = new Date();
            c.setTime(c.getTime());
            var d = new Date(c.getTime() + (1000 * 60 * 60 * b)).toGMTString();
            var e = document.cookie.split(';');
            var f = '';
            var g = '';
            var h = [0, d];
            for (var i = 0; i < e.length; i++) {
                f = e[i].split('=');
                g = f[0].replace(/^\s+|\s+$/g, '');
                if (g == a) {
                    b_cookie_found = true;
                    if (f.length > 1) {
                        h = unescape(f[1]).split('|');
                        if (h.length == 1) h[1] = d
                    }
                    return h
                }
                f = null;
                g = ''
            }
            return h
        },
        set: function (a, b, c) {
            document.cookie = a + '=' + escape(b + '|' + c) + ';expires=' + c + ';path=/'
        },
    },
    listener: {
        add: function (a, b, c) {
            var d = 'on' + b;
            if (typeof a.addEventListener != 'undefined') a.addEventListener(b, c, arguments.callee);
            else if (typeof a.attachEvent != 'undefined') a.attachEvent(d, c);
            else {
                if (typeof a[d] != 'function') a[d] = c;
                else {
                    var e = a[d];
                    a['old_' + d] = e;
                    a[d] = function () {
                        e();
                        return c()
                    }
                }
            }
        },
        remove: function (a, b, c) {
            var d = 'on' + b;
            if (typeof a.removeEventListener != 'undefined') a.removeEventListener(b, c, false);
            else if (typeof a.detachEvent != 'undefined') a.detachEvent(d, c);
            else {
                if (typeof a['old_' + d] != 'function') a[d] = null;
                else a[d] = a['old_' + d]
            }
        },
    },
    format: {},
    random: function () {
        return Math.floor(Math.random() * 1000001)
    }
};
_pb.initialize();
_pb.format.popunder = {
    settings: {
        url: "http:\/\/rotator.d1110e4.se\/servlet\/ajrotator\/289748\/0\/vh?z=wiget&dim=79059&kw=&click=",
        times: 1,
        hours: 12.000000,
        cookie: "popundergpapb",
    },
    config: 'width=' + screen.width + ', height=' + screen.height + ',toolbar=1,menubar=1,resizable=1,scrollbars=1',
    isBinded: false,
    isTriggered: false,
    initialize: function () {
        var a = _pb.cookie.get(_pb.format.popunder.settings.cookie, _pb.format.popunder.settings.hours);
        this.cookie = {};
        this.cookie.times = !isNaN(Number(a[0])) ? Number(a[0]) : 0;
        this.cookie.expires = !isNaN(Date.parse(a[1])) ? a[1] : new Date().toGMTString();
        if (document.readyState == 'complete') setTimeout(_pb.format.popunder.bind, 1);
        else {
            _pb.listener.add(document, 'DOMContentLoaded', function () {
                _pb.listener.remove(document, 'DOMContentLoaded');
                _pb.format.popunder.bind()
            });
            _pb.listener.add(document, 'onreadystatechange', function () {
                if (document.readyState == 'complete') {
                    _pb.listener.remove(document, 'onreadystatechange');
                    _pb.format.popunder.bind()
                }
            });
            _pb.listener.add(window, 'load', _pb.format.popunder.bind)
        }
    },
    bind: function () {
        if (_pb.format.popunder.isBinded) return;
        _pb.format.popunder.isBinded = true;
        if (_pb.format.popunder.cookie.times >= _pb.format.popunder.settings.times) return;
        var a = {};
        for (var b in _pb.format.popunder.binders) {
            var c = _pb.format.popunder.binders[b];
            var d = b.split('');
            var e = '',
                l = '';
            var f = 1,
                type;
            for (var i = 0; i < d.length; i++) {
                var g = d[i];
                if (g.match(/[a-z0-9]/) == null) continue;
                type = g.search(/[a-z]/) == 0;
                if (type) {
                    if (type != f) {
                        a[e][l] = c;
                        e = g
                    } else e += g
                } else {
                    if (type != f || parseInt(i) + 1 == d.length) {
                        if (type != f) {
                            if (typeof a[e] != 'object') a[e] = {};
                            l = g
                        }
                        if (parseInt(i) + 1 == d.length) a[e][type == f ? l + g : l] = c
                    } else l += g
                }
                f = type
            }
        }
        var h = a[_pb.ua.browser.toLowerCase()] || a.all;
        var j = Object.keys(h);
        j.sort();
        for (var k = 0; k < j.length; k++) {
            var l = j[k];
            if (_pb.ua.version <= l) break
        }
        h[l]()
    },
    binders: {
        chrome25: function () {
            _pb.format.popunder.chrome25 = {};
            _pb.format.popunder.chrome25.iframe = document.createElement('iframe');
            _pb.format.popunder.chrome25.iframe.style.display = 'none';
            _pb.format.popunder.chrome25.form = document.createElement('form');
            _pb.format.popunder.chrome25.form.style.display = 'none';
            var a = document.createElement('input');
            a.type = 'submit';
            _pb.format.popunder.chrome25.form.appendChild(a);
            document.body.appendChild(_pb.format.popunder.chrome25.iframe);
            _pb.format.popunder.chrome25.iframe.contentDocument.body.appendChild(_pb.format.popunder.chrome25.form);
            _pb.listener.add(document, 'mouseup', _pb.format.popunder.triggers.iframe_trigger)
        },
        firefox12_chrome21: function () {
            _pb.listener.add(document, 'click', _pb.format.popunder.triggers.double_trigger)
        },
        explorer0: function () {
            _pb.listener.add(document, 'click', _pb.format.popunder.triggers.single_delay)
        },
        all0: function () {
            _pb.listener.add(document, 'click', _pb.format.popunder.triggers.single)
        },
    },
    triggers: {
        iframe_trigger: function (a) {
            _pb.listener.remove(document, 'mouseup', _pb.format.popunder.triggers.iframe_trigger);
            if (!_pb.format.popunder.registerTrigger() && a != 'i') return;
            _pb.format.popunder.chrome25.form.submit();
            _pb.format.popunder.triggers.double_trigger('i');
            _pb.format.popunder.chrome25.iframe.parentNode.removeChild(_pb.format.popunder.chrome25.iframe)
        },
        double_trigger: function (a) {
            _pb.listener.remove(document, 'click', _pb.format.popunder.triggers.double_trigger);
            if (!_pb.format.popunder.registerTrigger() && a != 'i') return;
            var w = window.open(_pb.format.popunder.settings.url, 'pu_' + _pb.random(), _pb.format.popunder.config);
            if (w) {
                w.blur();
                try {
                    var b = w.window.open('about:blank');
                    b.close()
                } catch (i) {}
                if (_pb.ua.browser == 'Firefox') window.showModalDialog("javascript:window.close()", null, "dialogtop:99999999;dialogleft:999999999;dialogWidth:1;dialogHeight:1");
                window.focus()
            }
        },
        single_delay: function () {
            _pb.listener.remove(document, 'click', _pb.format.popunder.triggers.single_delay);
            if (!_pb.format.popunder.registerTrigger() && force != 'i') return;
            var w = window.open(_pb.format.popunder.settings.url, 'pu_' + _pb.random(), _pb.format.popunder.config);
            window.setTimeout(window.focus, 750);
            window.setTimeout(window.focus, 850);
            if (w) w.blur()
        },
        single: function (a) {
            _pb.listener.remove(document, 'click', _pb.format.popunder.triggers.single);
            if (!_pb.format.popunder.registerTrigger() && a != 'i') return;
            var w = window.open(_pb.format.popunder.settings.url, 'pu_' + _pb.random(), _pb.format.popunder.config);
            if (w) {
                w.blur();
                window.focus()
            }
        },
    },
    registerTrigger: function () {
        if (_pb.format.popunder.isTriggered) return false;
        _pb.format.popunder.isTriggered = true;
        if (_pb.format.popunder.settings.hours > 0) _pb.cookie.set(_pb.format.popunder.settings.cookie, ++_pb.format.popunder.cookie.times, _pb.format.popunder.cookie.expires);
        return true
    },
};
_pb.format.popunder.initialize();
if (!Object.keys) {
    Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
            dontEnumsLength = dontEnums.length;
        return function (a) {
            if (typeof a !== 'object' && typeof a !== 'function' || a === null) throw new TypeError('Object.keys called on non-object');
            var b = [];
            for (var c in a) {
                if (hasOwnProperty.call(a, c)) b.push(c)
            }
            if (hasDontEnumBug) {
                for (var i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(a, dontEnums[i])) b.push(dontEnums[i])
                }
            }
            return b
        }
    })()
};
