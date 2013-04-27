if (typeof jquery_address != "undefined") {
    (function(b) {
        b.address = (function() {
            var a2 = function(c) {
                b(this).trigger(b.extend(b.Event(c), (function() {
                    var d = {value: this.value(),path: this.path(),pathNames: this.pathNames(),parameterNames: this.parameterNames(),parameters: {},queryString: this.queryString()};
                    for (var e = 0, f = d.parameterNames.length; e < f; e++) {
                        d.parameters[d.parameterNames[e]] = this.parameter(d.parameterNames[e])
                    }
                    return d
                }).call(this)))
            };
            var ah = function() {
                a2.call(b.address, "init")
            };
            var aS = function() {
                a2.call(b.address, "change")
            };
            var an = function() {
                var c = ai.href.indexOf("#");
                return c != -1 ? aD(aR(ai.href.substr(c + 1))) : ""
            };
            var aY = function() {
                try {
                    top.document;
                    return top
                } catch (c) {
                    return window
                }
            };
            var ay = function(d, c) {
                if (aC.strict) {
                    d = c ? (d.substr(0, 1) != "/" ? "/" + d : d) : (d == "" ? "/" : d)
                }
                return d
            };
            var aQ = function(c, d) {
                return (aX && ai.protocol == "file:") ? (d ? am.replace(/\?/, "%3F") : am.replace(/%253F/, "?")) : c
            };
            var aA = function(c) {
                for (var e = 0, f = c.childNodes.length, d; e < f; e++) {
                    if (c.childNodes[e].src) {
                        aV = String(c.childNodes[e].src)
                    }
                    if (d = aA(c.childNodes[e])) {
                        return d
                    }
                }
            };
            var af = function() {
                if (!aO) {
                    var d = an();
                    var c = !(am == d);
                    if (aN && aP < 523) {
                        if (az != ae.length) {
                            az = ae.length;
                            if (typeof aH[az - 1] != ax) {
                                am = aH[az - 1]
                            }
                            aj()
                        }
                    } else {
                        if (aX && c) {
                            if (aP < 7) {
                                ai.reload()
                            } else {
                                aw.value(d)
                            }
                        } else {
                            if (c) {
                                am = d;
                                aj()
                            }
                        }
                    }
                }
            };
            var aj = function() {
                aS();
                aT(aL, 10)
            };
            var aL = function() {
                var d = (ai.pathname + (/\/$/.test(ai.pathname) ? "" : "/") + aB.value()).replace(/\/\//, "/").replace(/^\/$/, "");
                var c = window[aC.tracker];
                if (typeof c == aZ) {
                    c(d)
                } else {
                    if (typeof pageTracker != ax && typeof pageTracker._trackPageview == aZ) {
                        pageTracker._trackPageview(d)
                    } else {
                        if (typeof urchinTracker == aZ) {
                            urchinTracker(d)
                        }
                    }
                }
            };
            var a0 = function() {
                var c = aK.contentWindow.document;
                c.open();
                c.write("<html><head><title>" + aG.title + "</title><script>var " + aJ + ' = "' + an() + '";<\/script></head></html>');
                c.close()
            };
            var ap = function() {
                if (!ak) {
                    ak = true;
                    b("a").attr("xref", function() {
                        return b(this).attr("href")
                    });
                    if (aX && aP < 8) {
                        aG.body.innerHTML = '<iframe id="' + aJ + '" src="javascript:false;" width="0" height="0"></iframe>' + aG.body.innerHTML;
                        aK = aG.getElementById(aJ);
                        aT(function() {
                            b(aK).bind("load", function() {
                                var c = aK.contentWindow;
                                var d = c.location.href;
                                am = (typeof c[aJ] != ax ? c[aJ] : "");
                                if (am != an()) {
                                    aj();
                                    ai.hash = aQ(am, true)
                                }
                            });
                            if (typeof aK.contentWindow[aJ] == ax) {
                                a0()
                            }
                        }, 50)
                    } else {
                        if (aN) {
                            if (aP < 418) {
                                b(aG.body).append('<form id="' + aJ + '" style="position:absolute;top:-9999px;" method="get"></form>');
                                au = aG.getElementById(aJ)
                            }
                            if (typeof ai[aJ] == ax) {
                                ai[aJ] = {}
                            }
                            if (typeof ai[aJ][ai.pathname] != ax) {
                                aH = ai[aJ][ai.pathname].split(",")
                            }
                        }
                    }
                    aT(function() {
                        ah();
                        aS();
                        aL()
                    }, 1);
                    if (aX && aP >= 8) {
                        aG.body.onhashchange = af
                    } else {
                        aM(af, 50)
                    }
                    b("a").attr("href", function() {
                        return b(this).attr("xref")
                    }).removeAttr("xref");
                    b("a[rel*=address:]").address()
                }
            };
            var aB = {baseURL: function() {
                    var c = ai.href;
                    if (c.indexOf("#") != -1) {
                        c = c.substr(0, c.indexOf("#"))
                    }
                    if (c.substr(c.length - 1) == "/") {
                        c = c.substr(0, c.length - 1)
                    }
                    return c
                },strict: function() {
                    return aC.strict
                },history: function() {
                    return aC.history
                },tracker: function() {
                    return aC.tracker
                },title: function() {
                    return aG.title
                },value: function() {
                    if (!a) {
                        return null
                    }
                    return aR(ay(aQ(am, false), false))
                },path: function() {
                    var c = this.value();
                    return (c.indexOf("?") != -1) ? c.split("?")[0] : c
                },pathNames: function() {
                    var d = this.path();
                    var c = d.split("/");
                    if (d.substr(0, 1) == "/" || d.length == 0) {
                        c.splice(0, 1)
                    }
                    if (d.substr(d.length - 1, 1) == "/") {
                        c.splice(c.length - 1, 1)
                    }
                    return c
                },queryString: function() {
                    var d = this.value();
                    var c = d.indexOf("?");
                    return (c != -1 && c < d.length) ? d.substr(c + 1) : ""
                },parameter: function(h) {
                    var e = this.value();
                    var g = e.indexOf("?");
                    if (g != -1) {
                        e = e.substr(g + 1);
                        var c = e.split("&");
                        var d, f = c.length;
                        while (f--) {
                            d = c[f].split("=");
                            if (d[0] == h) {
                                return d[1]
                            }
                        }
                    }
                },parameterNames: function() {
                    var e = this.value();
                    var g = e.indexOf("?");
                    var d = [];
                    if (g != -1) {
                        e = e.substr(g + 1);
                        if (e != "" && e.indexOf("=") != -1) {
                            var c = e.split("&");
                            var f = 0;
                            while (f < c.length) {
                                d.push(c[f].split("=")[0]);
                                f++
                            }
                        }
                    }
                    return d
                }};
            var aw = {strict: function(c) {
                    aC.strict = c
                },history: function(c) {
                    aC.history = c
                },tracker: function(c) {
                    aC.tracker = c
                },title: function(c) {
                    aT(function() {
                        av = aG.title = c;
                        if (at && aK && aK.contentWindow && aK.contentWindow.document) {
                            aK.contentWindow.document.title = c;
                            at = false
                        }
                        if (!aq && p) {
                            ai.replace(ai.href.indexOf("#") != -1 ? ai.href : ai.href + "#")
                        }
                        aq = false
                    }, 50)
                },value: function(d) {
                    d = aD(aR(ay(d, true)));
                    if (d == "/") {
                        d = ""
                    }
                    if (am == d) {
                        return
                    }
                    aq = true;
                    am = d;
                    aO = true;
                    aj();
                    aH[ae.length] = am;
                    if (aN) {
                        if (aC.history) {
                            ai[aJ][ai.pathname] = aH.toString();
                            az = ae.length + 1;
                            if (aP < 418) {
                                if (ai.search == "") {
                                    au.action = "#" + am;
                                    au.submit()
                                }
                            } else {
                                if (aP < 523 || am == "") {
                                    var c = aG.createEvent("MouseEvents");
                                    c.initEvent("click", true, true);
                                    var e = aG.createElement("a");
                                    e.href = "#" + am;
                                    e.dispatchEvent(c)
                                } else {
                                    ai.hash = "#" + am
                                }
                            }
                        } else {
                            ai.replace("#" + am)
                        }
                    } else {
                        if (am != an()) {
                            if (aC.history) {
                                ai.hash = "#" + aQ(am, true)
                            } else {
                                ai.replace("#" + am)
                            }
                        }
                    }
                    if ((aX && aP < 8) && aC.history) {
                        aT(a0, 50)
                    }
                    if (aN) {
                        aT(function() {
                            aO = false
                        }, 1)
                    } else {
                        aO = false
                    }
                }};
            var aJ = "jQueryAddress", aZ = "function", ax = "undefined", aF = b.browser, aP = parseFloat(b.browser.version), p = aF.mozilla, aX = aF.msie, ar = aF.opera, aN = aF.safari, a = false, ao = aY(), aG = ao.document, ae = ao.history, ai = ao.location, aM = setInterval, aT = setTimeout, aR = decodeURI, aD = encodeURI, aE = navigator.userAgent, aK, au, aV, av = aG.title, az = ae.length, aO = false, ak = false, aq = true, at = true, aH = [], aI = {}, am = an(), aW = {}, aC = {history: true,strict: true};
            if (aX) {
                aP = parseFloat(aE.substr(aE.indexOf("MSIE") + 4))
            }
            a = (p && aP >= 1) || (aX && aP >= 6) || (ar && aP >= 9.5) || (aN && aP >= 312);
            if (a) {
                for (var ag = 1; ag < az; ag++) {
                    aH.push("")
                }
                aH.push(an());
                if (aX && ai.hash != an()) {
                    ai.hash = "#" + aQ(an(), true)
                }
                if (ar) {
                    history.navigationMode = "compatible"
                }
                aA(document);
                var a3 = aV.indexOf("?");
                if (aV && a3 > -1) {
                    var aU, a1 = aV.substr(a3 + 1).split("&");
                    for (var ag = 0, al; al = a1[ag]; ag++) {
                        aU = al.split("=");
                        if (/^(history|strict)$/.test(aU[0])) {
                            aC[aU[0]] = (isNaN(aU[1]) ? /^(true|yes)$/i.test(aU[1]) : (parseInt(aU[1]) != 0))
                        }
                        if (/^tracker$/.test(aU[0])) {
                            aC[aU[0]] = aU[1]
                        }
                    }
                }
                b(ap)
            } else {
                if ((!a && ai.href.indexOf("#") != -1) || (aN && aP < 418 && ai.href.indexOf("#") != -1 && ai.search != "")) {
                    aG.open();
                    aG.write('<html><head><meta http-equiv="refresh" content="0;url=' + ai.href.substr(0, ai.href.indexOf("#")) + '" /></head></html>');
                    aG.close()
                } else {
                    aL()
                }
            }
            b.each(("init,change").split(","), function(c, d) {
                aW[d] = function(e, f) {
                    b(b.address).bind(d, f || e, f && e);
                    return this
                }
            });
            b.each(("baseURL,strict,history,tracker,title,value").split(","), function(c, d) {
                aW[d] = function(e) {
                    if (typeof e != "undefined") {
                        if (a) {
                            aw[d](e)
                        }
                        return b.address
                    } else {
                        return aB[d]()
                    }
                }
            });
            b.each(("path,pathNames,queryString,parameter,parameterNames").split(","), function(c, d) {
                aW[d] = function(e) {
                    return aB[d](e)
                }
            });
            return aW
        })();
        b.fn.address = function(a) {
            b(this).click(function() {
                var d = a ? a.call(this) : /address:/.test(b(this).attr("rel")) ? b(this).attr("rel").split("address:")[1].split(" ")[0] : b(this).attr("href").replace(/^#/, "");
                b.address.value(d);
                return false
            })
        }
    }(jQuery))
}
(function(a) {
    a.browserTest = function(e, g) {
        var f = "unknown", d = "X", b = function(k, j) {
            for (var c = 0; c < j.length; c = c + 1) {
                k = k.replace(j[c][0], j[c][1])
            }
            return k
        }, h = function(l, k, j, n) {
            var m = {name: b((k.exec(l) || [f, f])[1], j)};
            m[m.name] = true;
            m.version = (n.exec(l) || [d, d, d, d])[3];
            if (m.name.match(/safari/) && m.version > 400) {
                m.version = "2.0"
            }
            if (m.name === "presto") {
                m.version = (a.browser.version > 9.27) ? "futhark" : "linear_b"
            }
            m.versionNumber = parseFloat(m.version, 10) || 0;
            m.versionX = (m.version !== d) ? (m.version + "").substr(0, 1) : d;
            m.className = m.name + m.versionX;
            return m
        };
        e = (e.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? b(e, [[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""], ["Chrome Safari", "Chrome"], ["KHTML", "Konqueror"], ["Minefield", "Firefox"], ["Navigator", "Netscape"]]) : e).toLowerCase();
        if (!g) {
            a.browser = a.extend((!g) ? a.browser : {}, h(e, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/))
        }
        a.layout = h(e, /(gecko|konqueror|msie|opera|webkit)/, [["konqueror", "khtml"], ["msie", "trident"], ["opera", "presto"]], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
        a.os = {name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [f])[0].replace("sunos", "solaris")};
        if (!g) {
            a("html").addClass([a.os.name, a.browser.name, a.browser.className, a.layout.name, a.layout.className].join(" "))
        }
    };
    a.browserTest(navigator.userAgent, a.browser.safari ? true : false)
})(jQuery);
(function(a) {
    a.fn.hoverIntent = function(l, k) {
        var m = {sensitivity: 7,interval: 100,timeout: 0};
        m = a.extend(m, k ? {over: l,out: k} : l);
        var o, n, h, d;
        var e = function(f) {
            o = f.pageX;
            n = f.pageY
        };
        var c = function(g, f) {
            f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
            if ((Math.abs(h - o) + Math.abs(d - n)) < m.sensitivity) {
                a(f).unbind("mousemove", e);
                f.hoverIntent_s = 1;
                return m.over.apply(f, [g])
            } else {
                h = o;
                d = n;
                f.hoverIntent_t = setTimeout(function() {
                    c(g, f)
                }, m.interval)
            }
        };
        var j = function(g, f) {
            f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
            f.hoverIntent_s = 0;
            return m.out.apply(f, [g])
        };
        var b = function(r) {
            var q = (r.type == "mouseover" ? r.fromElement : r.toElement) || r.relatedTarget;
            while (q && q != this) {
                try {
                    q = q.parentNode
                } catch (r) {
                    q = this
                }
            }
            if (q == this) {
                return false
            }
            var g = jQuery.extend({}, r);
            var f = this;
            if (f.hoverIntent_t) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t)
            }
            if (r.type == "mouseover") {
                h = g.pageX;
                d = g.pageY;
                a(f).bind("mousemove", e);
                if (f.hoverIntent_s != 1) {
                    f.hoverIntent_t = setTimeout(function() {
                        c(g, f)
                    }, m.interval)
                }
            } else {
                a(f).unbind("mousemove", e);
                if (f.hoverIntent_s == 1) {
                    f.hoverIntent_t = setTimeout(function() {
                        j(g, f)
                    }, m.timeout)
                }
            }
        };
        return this.mouseover(b).mouseout(b)
    }
})(jQuery);
(function(a) {
    a.fn.bgIframe = a.fn.bgiframe = function(c) {
        if (a.browser.msie && /6.0/.test(navigator.userAgent)) {
            c = a.extend({top: "auto",left: "auto",width: "auto",height: "auto",opacity: true,src: "javascript:false;"}, c || {});
            var d = function(e) {
                return e && e.constructor == Number ? e + "px" : e
            }, b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + c.src + '"style="display:block;position:absolute;z-index:-1;' + (c.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (c.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : d(c.top)) + ";left:" + (c.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : d(c.left)) + ";width:" + (c.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : d(c.width)) + ";height:" + (c.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : d(c.height)) + ';"/>';
            return this.each(function() {
                if (a("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(b), this.firstChild)
                }
            })
        }
        return this
    }
})(jQuery);
(function(f) {
    f.cluetip = {version: "1.0.4"};
    var k, j, h, e, g, b, l, d;
    f.fn.cluetip = function(n, m) {
        if (typeof n == "object") {
            m = n;
            n = null
        }
        if (n == "destroy") {
            return this.unbind(".cluetip")
        }
        return this.each(function(P) {
            var w = this, A = f(this);
            var L = f.extend(true, {}, f.fn.cluetip.defaults, m || {}, f.metadata ? A.metadata() : f.meta ? A.data() : {});
            var r = false;
            var E = +L.cluezIndex;
            A.data("thisInfo", {title: w.title,zIndex: E});
            var X = false, W = 0;
            if (!f("#cluetip").length) {
                f(['<div id="cluetip">', '<div id="cluetip-outer">', '<div id="cluetip-title"></div>', '<div id="cluetip-inner"></div>', '<div class="cluetip-bottom"></div></div>', '<div id="cluetip-topRight"></div>', '<div id="cluetip-bottomLeft"></div>', '<div id="cluetip-arrows" class="cluetip-arrows"></div>', "</div>"].join(""))[c](a).hide();
                k = f("#cluetip").css({position: "absolute"});
                h = f("#cluetip-outer").css({position: "relative",zIndex: E});
                j = f("#cluetip-inner");
                e = f("#cluetip-title");
                g = f("#cluetip-arrows");
                b = f('<div id="cluetip-waitimage"></div>').css({position: "absolute"}).insertBefore(k).hide()
            }
            var O = (L.dropShadow) ? +L.dropShadowSteps : 0;
            if (!l) {
                l = f([]);
                for (var aa = 0; aa < O; aa++) {
                    l = l.add(f("<div></div>").css({zIndex: E - 1,opacity: 0.1,top: 1 + aa,left: 1 + aa}))
                }
                l.css({position: "absolute",backgroundColor: "#000"}).prependTo(k)
            }
            var J = A.attr(L.attribute), v = L.cluetipClass, q = L.cluetipAddClass;
            if (!J && !L.splitTitle && !n) {
                return true
            }
            if (L.local && L.localPrefix) {
                J = L.localPrefix + J
            }
            if (L.local && L.hideLocal) {
                f(J + ":first").hide()
            }
            var K = parseInt(L.topOffset, 10), G = parseInt(L.leftOffset, 10);
            var F, Y, C = isNaN(parseInt(L.height, 10)) ? "auto" : (/\D/g).test(L.height) ? L.height : L.height + "px";
            var o, y, Q, ae, S, Z;
            var D = parseInt(L.width, 10) || 275, ab = D + (parseInt(k.css("paddingLeft"), 10) || 0) + (parseInt(k.css("paddingRight"), 10) || 0) + O, H = this.offsetWidth, N = this.offsetHeight, z, R, af, T, p;
            var V;
            var M = (L.attribute != "title") ? A.attr(L.titleAttribute) : "";
            if (L.splitTitle) {
                if (M == undefined) {
                    M = ""
                }
                V = M.split(L.splitTitle);
                M = V.shift()
            }
            if (L.escapeTitle) {
                M = M.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
            }
            var u;
            function ad() {
                return false
            }
            var B = function(ag) {
                if (!L.onActivate(A)) {
                    return false
                }
                X = true;
                k.removeClass().css({width: D});
                if (J == A.attr("href")) {
                    A.css("cursor", L.cursor)
                }
                if (L.hoverClass) {
                    A.addClass(L.hoverClass)
                }
                y = Q = A.offset().top;
                z = A.offset().left;
                T = ag.pageX;
                S = ag.pageY;
                if (w.tagName.toLowerCase() != "area") {
                    o = f(document).scrollTop();
                    p = f(window).width()
                }
                if (L.positionBy == "fixed") {
                    R = H + z + G;
                    k.css({left: R});
                    g.css({zIndex: A.data("thisInfo").zIndex + 1})
                } else {
                    if (L.positionBy == "fixed_left") {
                        R = z - G - ab;
                        k.css({left: R});
                        g.css({zIndex: A.data("thisInfo").zIndex + 1})
                    } else {
                        if (L.positionBy == "topBottom" || L.positionBy == "bottomTop") {
                            R = z - ab / 2 - G;
                            k.css({left: R});
                            g.css({zIndex: A.data("thisInfo").zIndex + 1})
                        } else {
                            R = (H > z && z > ab) || z + H + ab + G > p ? z - ab - G : H + z + G;
                            if (w.tagName.toLowerCase() == "area" || L.positionBy == "mouse" || H + ab > p) {
                                if (T + 20 + ab > p) {
                                    k.addClass(" cluetip-" + v);
                                    R = (T - ab - G) >= 0 ? T - ab - G - parseInt(k.css("marginLeft"), 10) + parseInt(j.css("marginRight"), 10) : T - (ab / 2)
                                } else {
                                    R = T + G
                                }
                            }
                            var ah = R < 0 ? ag.pageY + K : ag.pageY;
                            k.css({left: (R > 0 && L.positionBy != "bottomTop" && L.positionBy != "topBottom") ? R : (T + (ab / 2) > p) ? p / 2 - ab / 2 : Math.max(T - (ab / 2), 0),zIndex: A.data("thisInfo").zIndex});
                            g.css({zIndex: A.data("thisInfo").zIndex + 1})
                        }
                    }
                }
                Y = f(window).height();
                if (n) {
                    if (typeof n == "function") {
                        n = n(w)
                    }
                    j.html(n);
                    U(ah)
                } else {
                    if (V) {
                        var aj = V.length;
                        j.html(V[0]);
                        if (aj > 1) {
                            for (var ai = 1; ai < aj; ai++) {
                                j.append('<div class="split-body">' + V[ai] + "</div>")
                            }
                        }
                        U(ah)
                    } else {
                        if (!L.local && J.indexOf("#") != 0) {
                            if (/\.(jpe?g|tiff?|gif|png)$/i.test(J)) {
                                j.html('<img src="' + J + '" alt="' + M + '" />');
                                U(ah)
                            } else {
                                if (r && L.ajaxCache) {
                                    j.html(r);
                                    U(ah)
                                } else {
                                    var an = L.ajaxSettings.beforeSend, ak = L.ajaxSettings.error, al = L.ajaxSettings.success, aq = L.ajaxSettings.complete;
                                    var ap = {cache: false,url: J,beforeSend: function(ar) {
                                            if (an) {
                                                an.call(w, ar, k, j)
                                            }
                                            h.children().empty();
                                            if (L.waitImage) {
                                                b.css({top: S + 20,left: T + 20,zIndex: A.data("thisInfo").zIndex - 1}).show()
                                            }
                                        },error: function(ar, at) {
                                            if (X) {
                                                if (ak) {
                                                    ak.call(w, ar, at, k, j)
                                                } else {
                                                    j.html("<i>sorry, the contents could not be loaded</i>")
                                                }
                                            }
                                        },success: function(ar, at) {
                                            r = L.ajaxProcess.call(w, ar);
                                            if (X) {
                                                if (al) {
                                                    al.call(w, ar, at, k, j)
                                                }
                                                j.html(r)
                                            }
                                        },complete: function(ar, at) {
                                            if (aq) {
                                                aq.call(w, ar, at, k, j)
                                            }
                                            d = f("#cluetip-inner img").length;
                                            if (d && !f.browser.opera) {
                                                f("#cluetip-inner img").bind("load error", function() {
                                                    d--;
                                                    if (d < 1) {
                                                        b.hide();
                                                        if (X) {
                                                            U(ah)
                                                        }
                                                    }
                                                })
                                            } else {
                                                b.hide();
                                                if (X) {
                                                    U(ah)
                                                }
                                            }
                                        }};
                                    var am = f.extend(true, {}, L.ajaxSettings, ap);
                                    f.ajax(am)
                                }
                            }
                        } else {
                            if (L.local) {
                                var ao = f(J + (/#\S+$/.test(J) ? "" : ":eq(" + P + ")")).clone(true).show();
                                j.html(ao);
                                U(ah)
                            }
                        }
                    }
                }
            };
            var U = function(ai) {
                k.addClass("cluetip-" + v);
                if (L.truncate) {
                    var aj = j.text().slice(0, L.truncate) + "...";
                    j.html(aj)
                }
                function ag() {
                }
                M ? e.show().html(M) : (L.showTitle) ? e.show().html("&nbsp;") : e.hide();
                if (L.sticky) {
                    var ah = f('<div id="cluetip-close"><a href="#">' + L.closeText + "</a></div>");
                    (L.closePosition == "bottom") ? ah.appendTo(j) : (L.closePosition == "title") ? ah.prependTo(e) : ah.prependTo(j);
                    ah.bind("click.cluetip", function() {
                        I();
                        return false
                    });
                    if (L.mouseOutClose) {
                        k.bind("mouseleave.cluetip", function() {
                            I()
                        })
                    } else {
                        k.unbind("mouseleave.cluetip")
                    }
                }
                var ak = "";
                h.css({zIndex: A.data("thisInfo").zIndex,overflow: C == "auto" ? "visible" : "auto",height: C});
                F = C == "auto" ? Math.max(k.outerHeight(), k.height()) : parseInt(C, 10);
                ae = Q;
                Z = o + Y;
                if (L.positionBy == "fixed" || L.positionBy == "fixed_left") {
                    ae = Q - L.dropShadowSteps + K
                } else {
                    if ((R < T && Math.max(R, 0) + ab > T) || L.positionBy == "bottomTop" || L.positionBy == "topBottom") {
                        if ((Q + F + K > Z && S - o > F + K) || L.positionBy == "topBottom") {
                            ae = (L.positionBy == "topBottom") ? Q - F - K : S - F - K;
                            ak = "top"
                        } else {
                            ae = (L.positionBy == "bottomTop") ? Q + N - K : S + K;
                            ak = "bottom"
                        }
                    } else {
                        if (Q + F + K > Z) {
                            ae = (F >= Y) ? o : Z - F - K
                        } else {
                            if (A.css("display") == "block" || w.tagName.toLowerCase() == "area" || L.positionBy == "mouse") {
                                ae = ai - K
                            } else {
                                ae = Q - L.dropShadowSteps
                            }
                        }
                    }
                }
                if (ak == "") {
                    R < z ? ak = "left" : ak = "right"
                }
                k.css({top: ae + "px"}).removeClass().addClass("clue-" + ak + "-" + v).addClass(" cluetip-" + v);
                if (q != "") {
                    k.addClass(" " + q)
                }
                if (L.arrows) {
                    var al = (Q - ae - L.dropShadowSteps);
                    g.css({top: (/(left|right)/.test(ak) && R >= 0 && al > 0) ? al + "px" : /(left|right)/.test(ak) ? 0 : ""}).show()
                } else {
                    g.hide()
                }
                l.hide();
                k.hide()[L.fx.open](L.fx.open != "show" && L.fx.openSpeed);
                if (L.dropShadow) {
                    l.css({height: F,width: D,zIndex: A.data("thisInfo").zIndex - 1}).show()
                }
                if (f.fn.bgiframe) {
                    k.bgiframe()
                }
                if (L.delayedClose > 0) {
                    W = setTimeout(I, L.delayedClose)
                }
                L.onShow.call(w, k, j)
            };
            var ac = function(ag) {
                X = false;
                b.hide();
                if (!L.sticky || (/click|toggle/).test(L.activation)) {
                    I();
                    clearTimeout(W)
                }
                if (L.hoverClass) {
                    A.removeClass(L.hoverClass)
                }
            };
            var I = function() {
                h.parent().hide().removeClass();
                L.onHide.call(w, k, j);
                A.removeClass("cluetip-clicked");
                if (M) {
                    A.attr(L.titleAttribute, M)
                }
                A.css("cursor", "");
                if (L.arrows) {
                    g.css({top: ""})
                }
            };
            f(document).bind("hideCluetip", function(ag) {
                I()
            });
            if ((/click|toggle/).test(L.activation)) {
                A.bind("click.cluetip", function(ag) {
                    if (k.is(":hidden") || !A.is(".cluetip-clicked")) {
                        B(ag);
                        f(".cluetip-clicked").removeClass("cluetip-clicked");
                        A.addClass("cluetip-clicked")
                    } else {
                        ac(ag)
                    }
                    this.blur();
                    return false
                })
            } else {
                if (L.activation == "focus") {
                    A.bind("focus.cluetip", function(ag) {
                        B(ag)
                    });
                    A.bind("blur.cluetip", function(ag) {
                        ac(ag)
                    })
                } else {
                    A[L.clickThrough ? "unbind" : "bind"]("click", ad);
                    var t = function(ag) {
                        if (L.tracking == true) {
                            var ai = R - ag.pageX;
                            var ah = ae ? ae - ag.pageY : Q - ag.pageY;
                            A.bind("mousemove.cluetip", function(aj) {
                                k.css({left: aj.pageX + ai,top: aj.pageY + ah})
                            })
                        }
                    };
                    if (f.fn.hoverIntent && L.hoverIntent) {
                        A.hoverIntent({sensitivity: L.hoverIntent.sensitivity,interval: L.hoverIntent.interval,over: function(ag) {
                                B(ag);
                                t(ag)
                            },timeout: L.hoverIntent.timeout,out: function(ag) {
                                ac(ag);
                                A.unbind("mousemove.cluetip")
                            }})
                    } else {
                        A.bind("mouseenter.cluetip", function(ag) {
                            B(ag);
                            t(ag)
                        }).bind("mouseleave.cluetip", function(ag) {
                            ac(ag);
                            A.unbind("mousemove.cluetip")
                        })
                    }
                    A.bind("mouseenter.cluetip", function(ag) {
                        A.attr("title", "")
                    }).bind("mouseleave.cluetip", function(ag) {
                        A.attr("title", A.data("thisInfo").title)
                    })
                }
            }
        })
    };
    f.fn.cluetip.defaults = {width: 275,height: "auto",cluezIndex: 97,positionBy: "auto",topOffset: 15,leftOffset: 15,local: false,localPrefix: null,hideLocal: true,attribute: "rel",titleAttribute: "title",splitTitle: "",escapeTitle: false,showTitle: true,cluetipClass: "default",cluetipAddClass: "",hoverClass: "",waitImage: true,cursor: "help",arrows: false,dropShadow: true,dropShadowSteps: 6,sticky: false,mouseOutClose: false,activation: "hover",clickThrough: false,tracking: false,delayedClose: 0,closePosition: "top",closeText: "Close",truncate: 0,fx: {open: "show",openSpeed: ""},hoverIntent: {sensitivity: 3,interval: 50,timeout: 0},onActivate: function(m) {
            return true
        },onShow: function(n, m) {
        },onHide: function(n, m) {
        },ajaxCache: true,ajaxProcess: function(m) {
            m = m.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, "").replace(/<(link|meta)[^>]+>/g, "");
            return m
        },ajaxSettings: {dataType: "html"},debug: false};
    var c = "appendTo", a = "body";
    f.cluetip.setup = function(m) {
        if (m && m.insertionType && (m.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
            c = m.insertionType
        }
        if (m && m.insertionElement) {
            a = m.insertionElement
        }
    }
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {def: "easeOutQuad",swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },easeInElastic: function(f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l) == 1) {
            return e + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k)) + e
    },easeOutElastic: function(f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l) == 1) {
            return e + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * l - j) * (2 * Math.PI) / k) + m + e
    },easeInOutElastic: function(f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l / 2) == 2) {
            return e + m
        }
        if (!k) {
            k = l * (0.3 * 1.5)
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k) * 0.5 + m + e
    },easeInBack: function(e, f, a, j, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return j * (f /= h) * f * ((g + 1) * f - g) + a
    },easeOutBack: function(e, f, a, j, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return j * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },easeInOutBack: function(e, f, a, j, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return j / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return j / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }});
(function(a) {
    jQuery.fn.executePngFix = function(d) {
        d = jQuery.extend({blankgif: "blank.gif"}, d);
        var c = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
        var b = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
        if (jQuery.browser.msie && (c || b)) {
            jQuery(this).find("img[src$=.png]").each(function() {
                jQuery(this).attr("width", jQuery(this).width());
                jQuery(this).attr("height", jQuery(this).height());
                var m = "";
                var g = "";
                var f = (jQuery(this).attr("id")) ? 'id="' + jQuery(this).attr("id") + '" ' : "";
                var n = (jQuery(this).attr("class")) ? 'class="' + jQuery(this).attr("class") + '" ' : "";
                var j = (jQuery(this).attr("title")) ? 'title="' + jQuery(this).attr("title") + '" ' : "";
                var k = (jQuery(this).attr("alt")) ? 'alt="' + jQuery(this).attr("alt") + '" ' : "";
                var h = (jQuery(this).attr("align")) ? "float:" + jQuery(this).attr("align") + ";" : "";
                var e = (jQuery(this).parent().attr("href")) ? "cursor:hand;" : "";
                if (this.style.border) {
                    m += "border:" + this.style.border + ";";
                    this.style.border = ""
                }
                if (this.style.padding) {
                    m += "padding:" + this.style.padding + ";";
                    this.style.padding = ""
                }
                if (this.style.margin) {
                    m += "margin:" + this.style.margin + ";";
                    this.style.margin = ""
                }
                var l = (this.style.cssText);
                g += "<span " + f + n + j + k;
                g += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;' + h + e;
                g += "width:" + jQuery(this).width() + "px;height:" + jQuery(this).height() + "px;";
                g += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + jQuery(this).attr("src") + "', sizingMethod='scale');";
                g += l + '"></span>';
                if (m != "") {
                    g = '<span style="position:relative;display:inline-block;' + m + e + "width:" + jQuery(this).width() + "px;height:" + jQuery(this).height() + 'px;">' + g + "</span>"
                }
                jQuery(this).hide();
                jQuery(this).after(g)
            });
            jQuery(this).find("*").each(function() {
                var f = jQuery(this).css("background-image");
                if (f.indexOf(".png") != -1) {
                    var e = f.split('url("')[1].split('")')[0];
                    jQuery(this).css("background-image", "none");
                    jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e + "',sizingMethod='scale')"
                }
            });
            jQuery(this).find("input[src$=.png]").each(function() {
                var e = jQuery(this).attr("src");
                jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e + "', sizingMethod='scale');";
                jQuery(this).attr("src", d.blankgif)
            })
        }
        return jQuery
    }
})(jQuery);
var $pp_pic_holder;
var $ppt;
(function(a) {
    a.fn.prettyPhoto = function(A) {
        var f = true;
        var m = false;
        var q = [];
        var e = 0;
        var u;
        var v;
        var z;
        var C;
        var g = "image";
        var D;
        var o = h();
        a(window).scroll(function() {
            o = h();
            d()
        });
        a(window).resize(function() {
            d();
            y()
        });
        a(document).keypress(function(G) {
            switch (G.keyCode) {
                case 37:
                    if (e == 1) {
                        return
                    }
                    p("previous");
                    break;
                case 39:
                    if (e == setCount) {
                        return
                    }
                    p("next");
                    break;
                case 27:
                    n();
                    break
            }
        });
        A = jQuery.extend({animationSpeed: "normal",padding: 40,opacity: 0.8,showTitle: false,allowresize: true,counter_separator_label: "/",theme: "light_rounded",pp_type: "image",iframeWidth: 750,iframeHeight: 450,modalSection: "",flashPlayer: "flashPlayer.flv",callback: function() {
            }}, A);
        a(this).each(function() {
            var I = false;
            var H = false;
            var J = 0;
            var G = 0;
            q[q.length] = this;
            a(this).bind("click", function() {
                l(this);
                return false
            })
        });
        function l(H) {
            D = a(H);
            var G = D.attr("href");
            var I = D.attr("href");
            theRel = D.attr("rel");
            galleryRegExp = /\[(?:.*)\]/;
            theGallery = galleryRegExp.exec(theRel);
            isSet = false;
            setCount = 0;
            F();
            for (i = 0; i < q.length; i++) {
                if (a(q[i]).attr("rel").indexOf(theGallery) != -1) {
                    setCount++;
                    if (setCount > 1) {
                        isSet = true
                    }
                    if (a(q[i]).attr("href") == D.attr("href")) {
                        e = setCount;
                        arrayPosition = i
                    }
                }
            }
            B();
            $pp_pic_holder.find("p.currentTextHolder").text(e + A.counter_separator_label + setCount);
            d();
            a("#pp_full_res").hide();
            $pp_pic_holder.find(".pp_loaderIcon").show()
        }
        showimage = function(J, G, M, L, K, H, I) {
            a(".pp_loaderIcon").hide();
            if (a.browser.opera) {
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth
            } else {
                windowHeight = a(window).height();
                windowWidth = a(window).width()
            }
            $pp_pic_holder.find(".pp_content").animate({height: K}, A.animationSpeed);
            projectedTop = o.scrollTop + ((windowHeight / 2) - (L / 2));
            if (projectedTop < 0) {
                projectedTop = 0 + $pp_pic_holder.find(".ppt").height()
            }
            $pp_pic_holder.animate({top: projectedTop,left: ((windowWidth / 2) - (M / 2)),width: M}, A.animationSpeed, function() {
                $pp_pic_holder.width(M);
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(G).width(J);
                $pp_pic_holder.find("#pp_full_res").fadeIn(A.animationSpeed, function() {
                    a(this).find("object,embed").css("visibility", "visible")
                });
                k();
                if (I) {
                    a("a.pp_expand,a.pp_contract").fadeIn(A.animationSpeed)
                }
            })
        };
        function k() {
            if (isSet && g == "image") {
                $pp_pic_holder.find(".pp_hoverContainer").fadeIn(A.animationSpeed)
            } else {
                $pp_pic_holder.find(".pp_hoverContainer").hide()
            }
            $pp_pic_holder.find(".pp_details").fadeIn(A.animationSpeed);
            if (A.showTitle && hasTitle) {
                $ppt.css({display: "none"});
                $ppt.fadeIn(A.animationSpeed)
            }
            A.callback()
        }
        function t() {
            $pp_pic_holder.find(".pp_hoverContainer,.pp_details").fadeOut(A.animationSpeed);
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
            $pp_pic_holder.find("#pp_full_res").fadeOut(A.animationSpeed, function() {
                a(".pp_loaderIcon").show();
                E()
            });
            $ppt.fadeOut(A.animationSpeed)
        }
        function p(G) {
            if (G == "previous") {
                arrayPosition--;
                e--
            } else {
                arrayPosition++;
                e++
            }
            if (!f) {
                f = true
            }
            t();
            a("a.pp_expand,a.pp_contract").fadeOut(A.animationSpeed, function() {
                a(this).removeClass("pp_contract").addClass("pp_expand")
            })
        }
        function n() {
            $pp_pic_holder.find("object,embed").css("visibility", "hidden");
            a("div.pp_pic_holder,div.ppt").fadeOut(A.animationSpeed);
            a("div.pp_overlay").fadeOut(A.animationSpeed, function() {
                a("div.pp_overlay,div.pp_pic_holder,div.ppt").remove();
                if (a.browser.msie && a.browser.version == 6) {
                    a("select").css("visibility", "visible")
                }
            });
            f = true
        }
        function j() {
            if (e == setCount) {
                $pp_pic_holder.find("a.pp_next").css("visibility", "hidden");
                $pp_pic_holder.find("a.pp_arrow_next").addClass("disabled").unbind("click")
            } else {
                $pp_pic_holder.find("a.pp_next").css("visibility", "visible");
                $pp_pic_holder.find("a.pp_arrow_next.disabled").removeClass("disabled").bind("click", function() {
                    p("next");
                    return false
                })
            }
            if (e == 1) {
                $pp_pic_holder.find("a.pp_previous").css("visibility", "hidden");
                $pp_pic_holder.find("a.pp_arrow_previous").addClass("disabled").unbind("click")
            } else {
                $pp_pic_holder.find("a.pp_previous").css("visibility", "visible");
                $pp_pic_holder.find("a.pp_arrow_previous.disabled").removeClass("disabled").bind("click", function() {
                    p("previous");
                    return false
                })
            }
            var G = (A.modalSection == "") ? " gallery items" : " " + A.modalSection;
            $pp_pic_holder.find("p.currentTextHolder").text("Viewing " + e + A.counter_separator_label + setCount + G);
            D = (isSet) ? a(q[arrayPosition]) : D;
            F();
            if (D.attr("title")) {
                $pp_pic_holder.find(".pp_description").show().html(unescape(D.attr("title")))
            } else {
                $pp_pic_holder.find(".pp_description").hide().text("")
            }
            if (D.attr("download")) {
                $pp_pic_holder.find(".content_button").show();
                $pp_pic_holder.find(".content_button").attr("href", D.attr("download"))
            } else {
                $pp_pic_holder.find(".content_button").hide()
            }
            if (D.attr("dimension")) {
                $pp_pic_holder.find(".image_dimension").show().html(unescape(D.attr("dimension")))
            } else {
                $pp_pic_holder.find(".image_dimension").hide().text("")
            }
            if (D.attr("size")) {
                $pp_pic_holder.find(".image_size").show().html(unescape(D.attr("size")))
            } else {
                $pp_pic_holder.find(".image_size").hide().text("")
            }
            if (D.find("img").attr("alt") && A.showTitle) {
                hasTitle = true;
                $ppt.html(unescape(D.find("img").attr("alt")))
            } else {
                hasTitle = false
            }
        }
        function r(H, G) {
            hasBeenResized = false;
            w(H, G);
            imageWidth = H;
            imageHeight = G;
            windowHeight = a(window).height();
            windowWidth = a(window).width();
            if (((C > windowWidth) || (z > windowHeight)) && f && A.allowresize && !m) {
                hasBeenResized = true;
                notFitting = true;
                while (notFitting) {
                    if ((C > windowWidth)) {
                        imageWidth = (windowWidth - 200);
                        imageHeight = (G / H) * imageWidth
                    } else {
                        if ((z > windowHeight)) {
                            imageHeight = (windowHeight - 200);
                            imageWidth = (H / G) * imageHeight
                        } else {
                            notFitting = false
                        }
                    }
                    z = imageHeight;
                    C = imageWidth
                }
                w(imageWidth, imageHeight)
            }
            return {width: imageWidth,height: imageHeight,containerHeight: z,containerWidth: C,contentHeight: u,contentWidth: v,resized: hasBeenResized}
        }
        function w(H, G) {
            $pp_pic_holder.find(".pp_details").width(H);
            u = G + $pp_pic_holder.find(".pp_details").height() + parseFloat($pp_pic_holder.find(".pp_details").css("marginTop")) + parseFloat($pp_pic_holder.find(".pp_details").css("marginBottom"));
            v = H;
            z = u + $pp_pic_holder.find(".ppt").height() + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
            C = H + A.padding
        }
        function F() {
            var G = D.attr("href");
            if (G.match(/youtube\.com\/watch/i)) {
                g = "youtube"
            } else {
                if (G.indexOf(".mov") != -1) {
                    g = "quicktime"
                } else {
                    if (G.indexOf(".swf") != -1) {
                        g = "flash"
                    } else {
                        if (G.indexOf("iframe") != -1) {
                            g = "iframe"
                        } else {
                            if (G.indexOf(".flv") != -1) {
                                g = "flv"
                            } else {
                                if (G.indexOf(".jpg") != -1 || G.indexOf(".png") != -1 || G.indexOf(".gif") != -1 || G.indexOf(".bmp") != -1) {
                                    g = "image"
                                } else {
                                    g = A.pp_type
                                }
                            }
                        }
                    }
                }
            }
        }
        function d() {
            if ($pp_pic_holder) {
                if ($pp_pic_holder.size() == 0) {
                    return
                }
            } else {
                return
            }
            if (a.browser.opera) {
                windowHeight = window.innerHeight;
                windowWidth = window.innerWidth
            } else {
                windowHeight = a(window).height();
                windowWidth = a(window).width()
            }
            if (f) {
                $pHeight = $pp_pic_holder.height();
                $pWidth = $pp_pic_holder.width();
                $tHeight = $ppt.height();
                projectedTop = (windowHeight / 2) + o.scrollTop - ($pHeight / 2);
                if (projectedTop < 0) {
                    projectedTop = 0 + $tHeight
                }
                $pp_pic_holder.css({top: projectedTop,left: (windowWidth / 2) + o.scrollLeft - ($pWidth / 2)})
            }
        }
        function E() {
            j();
            if (g == "image") {
                imgPreloader = new Image();
                nextImage = new Image();
                if (isSet && e > setCount) {
                    nextImage.src = a(q[arrayPosition + 1]).attr("href")
                }
                prevImage = new Image();
                if (isSet && q[arrayPosition - 1]) {
                    prevImage.src = a(q[arrayPosition - 1]).attr("href")
                }
                pp_typeMarkup = '<img id="fullResImage" src="" />';
                $pp_pic_holder.find("#pp_full_res")[0].innerHTML = pp_typeMarkup;
                $pp_pic_holder.find(".pp_content").css("overflow", "hidden");
                $pp_pic_holder.find("#fullResImage").attr("src", D.attr("href"));
                imgPreloader.onload = function() {
                    var I = r(imgPreloader.width, imgPreloader.height);
                    imgPreloader.width = I.width;
                    imgPreloader.height = I.height;
                    showimage(imgPreloader.width, imgPreloader.height, I.containerWidth, I.containerHeight, I.contentHeight, I.contentWidth, I.resized)
                };
                imgPreloader.src = D.attr("href")
            } else {
                content_width = (parseFloat(c("width", D.attr("rel")))) ? c("width", D.attr("rel")) : "425";
                content_height = (parseFloat(c("height", D.attr("rel")))) ? c("height", D.attr("rel")) : "344";
                if (g == "ajax") {
                    content_width = (parseFloat(a(".pp_ajax").css("width"))) ? a(".pp_ajax").css("width") : "784";
                    content_height = (parseFloat(a(".pp_ajax").css("height"))) ? a(".pp_ajax").css("height") : "353"
                }
                if (g == "iframe") {
                    content_width = c("width", D.attr("href")) || A.iframeWidth + "";
                    content_height = c("height", D.attr("href")) || A.iframeHeight + ""
                }
                if (content_width.indexOf("%") != -1 || content_height.indexOf("%") != -1) {
                    content_height = (a(window).height() * parseFloat(content_height) / 100) - 100;
                    content_width = (a(window).width() * parseFloat(content_width) / 100) - 100;
                    parsentBased = true
                } else {
                    content_height = parseFloat(content_height);
                    content_width = parseFloat(content_width)
                }
                if (g == "quicktime") {
                    content_height += 13
                }
                correctSizes = r(content_width, content_height);
                if (g == "youtube") {
                    pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + correctSizes.width + '" height="' + correctSizes.height + '"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" /><param name="movie" value="https://www.youtube.com/v/' + c("v", D.attr("href")) + '" /><embed src="https://www.youtube.com/v/' + c("v", D.attr("href")) + '" type="application/x-shockwave-flash" allowfullscreen="true" wmode="transparent" allowscriptaccess="always" width="' + correctSizes.width + '" height="' + correctSizes.height + '"></embed></object>'
                } else {
                    if (g == "quicktime") {
                        pp_typeMarkup = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="' + correctSizes.height + '" width="' + correctSizes.width + '"><param name="src" value="' + D.attr("href") + '"><param name="autoplay" value="true"><param name="type" value="video/quicktime"><embed src="' + D.attr("href") + '" height="' + correctSizes.height + '" width="' + correctSizes.width + '" autoplay="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>'
                    } else {
                        if (g == "flash") {
                            flash_vars = D.attr("href");
                            flash_vars = flash_vars.substring(D.attr("href").indexOf("flashvars") + 10, D.attr("href").length);
                            filename = D.attr("href");
                            filename = filename.substring(0, filename.indexOf("?"));
                            pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + correctSizes.width + '" height="' + correctSizes.height + '"><param name="allowfullscreen" value="true" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /><param name="movie" value="' + filename + "?" + flash_vars + '" /><embed src="' + filename + "?" + flash_vars + '" type="application/x-shockwave-flash" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" width="' + correctSizes.width + '" height="' + correctSizes.height + '"></embed></object>'
                        } else {
                            if (g == "flv") {
                                flash_player = A.flashPlayer;
                                filename = D.attr("href");
                                pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + correctSizes.width + '" height="' + correctSizes.height + '"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="' + flash_player + '"/><param name="bgcolor" value="#000000"/><param name="wmode" value="transparent"/><param name="flashvars" value="video=' + filename + "&width=" + correctSizes.width + "&height=" + correctSizes.height + '"/><embed src="' + flash_player + '"  type="application/x-shockwave-flash" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" width="' + correctSizes.width + '" height="' + correctSizes.height + '" flashvars="video=' + filename + "&width=" + correctSizes.width + "&height=" + correctSizes.height + '"></embed></object>'
                            } else {
                                if (g == "iframe") {
                                    movie_url = D.attr("href");
                                    movie_url = movie_url.substr(0, movie_url.indexOf("iframe") - 1);
                                    var G = (A.iframeWidth == 0) ? correctSizes.width - 10 : A.iframeWidth;
                                    var H = (A.iframeHeight == 0) ? correctSizes.width - 10 : A.iframeHeight;
                                    pp_typeMarkup = '<iframe src ="' + movie_url + '" width="' + G + '" height="' + H + '" frameborder="no"></iframe>'
                                } else {
                                    if (g == "ajax") {
                                        hrefUrl = D.attr("href");
                                        ajaxUrl = b(hrefUrl);
                                        a.get(ajaxUrl, function(I) {
                                            $pp_pic_holder.find("#pp_full_res")[0].innerHTML = I
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
                if (g != "ajax") {
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = pp_typeMarkup
                }
                showimage(correctSizes.width, correctSizes.height, correctSizes.containerWidth, correctSizes.containerHeight, correctSizes.contentHeight, correctSizes.contentWidth, correctSizes.resized)
            }
        }
        function h() {
            if (self.pageYOffset) {
                scrollTop = self.pageYOffset;
                scrollLeft = self.pageXOffset
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                    scrollLeft = document.documentElement.scrollLeft
                } else {
                    if (document.body) {
                        scrollTop = document.body.scrollTop;
                        scrollLeft = document.body.scrollLeft
                    }
                }
            }
            return {scrollTop: scrollTop,scrollLeft: scrollLeft}
        }
        function y() {
            a("div.pp_overlay").css({height: a(document).height(),width: a(window).width()})
        }
        function B() {
            toInject = "";
            toInject += "<div class='pp_overlay'></div>";
            if (g == "image") {
                pp_typeMarkup = '<img id="fullResImage" src="" />'
            } else {
                pp_typeMarkup = ""
            }
            toInject += '<div class="pp_ajax"></div><div class="pp_pic_holder"><div class="pp_content"><a class="pp_close" href="#">Close</a><a href="#" class="pp_expand" title="Expand the image">Expand</a><div class="pp_loaderIcon"></div><div class="pp_hoverContainer"><a class="pp_next" href="#">next</a><a class="pp_previous" href="#">previous</a></div><div id="pp_full_res">' + pp_typeMarkup + '</div><div class="pp_details clearfix"><p class="pp_description"></p><p class="currentTextHolder">0' + A.counter_separator_label + '0</p><div style="padding-top:5px;width:100px;float:right;margin-right:80px;margin-bottom:10px;position:absolute;bottom:-12px;right:6px;"><a href="#" class="content_button" target="_blank" style="width:100px;">Download Image</a><p class="image_dimension" style="padding-bottom:0px;"></p><p class="image_size"></p></div><div class="ppt"></div><div class="pp_nav"><a href="#" class="pp_arrow_previous">Previous</a><a href="#" class="pp_arrow_next">Next</a></div></div></div></div>';
            a("body").append(toInject);
            $pp_pic_holder = a(".pp_pic_holder");
            $ppt = a(".ppt");
            a("div.pp_overlay").css("height", a(document).height()).bind("click", function() {
                n()
            });
            a(".pp_ajax").css("display", "none");
            $pp_pic_holder.css({opacity: 0}).addClass(A.theme);
            a("a.pp_close").bind("click", function() {
                n();
                return false
            });
            a("a.pp_expand").bind("click", function() {
                $this = a(this);
                if ($this.hasClass("pp_expand")) {
                    $this.removeClass("pp_expand").addClass("pp_contract");
                    f = false
                } else {
                    $this.removeClass("pp_contract").addClass("pp_expand");
                    f = true
                }
                t();
                $pp_pic_holder.find(".pp_hoverContainer, #pp_full_res, .pp_details").fadeOut(A.animationSpeed, function() {
                    E()
                });
                return false
            });
            $pp_pic_holder.find(".pp_previous, .pp_arrow_previous").bind("click", function() {
                p("previous");
                return false
            });
            $pp_pic_holder.find(".pp_next, .pp_arrow_next").bind("click", function() {
                p("next");
                return false
            });
            $pp_pic_holder.find(".pp_hoverContainer").css({"margin-left": A.padding / 2});
            if (!isSet) {
                $pp_pic_holder.find(".pp_hoverContainer,.pp_nav").hide()
            }
            if (a.browser.msie && a.browser.version == 6) {
                a("body").addClass("ie6");
                a("select").css("visibility", "hidden")
            }
            a("div.pp_overlay").css("opacity", 0).fadeTo(A.animationSpeed, A.opacity, function() {
                $pp_pic_holder.css("opacity", 0).fadeIn(A.animationSpeed, function() {
                    $pp_pic_holder.attr("style", "left:" + $pp_pic_holder.css("left") + ";top:" + $pp_pic_holder.css("top") + ";");
                    E()
                })
            })
        }
    };
    function b(d) {
        return d
    }
    function c(f, e) {
        f = f.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var d = "[\\?&]" + f + "=([^&#]*)";
        var h = new RegExp(d);
        var g = h.exec(e);
        if (g == null) {
            return ""
        } else {
            return g[1]
        }
    }
})(jQuery);
(function(c) {
    var a = c.scrollTo = function(d, f, g) {
        c(window).scrollTo(d, f, g)
    };
    a.defaults = {axis: "xy",duration: parseFloat(c.fn.jquery) >= 1.3 ? 0 : 1};
    a.window = function(d) {
        return c(window)._scrollable()
    };
    c.fn._scrollable = function() {
        return this.map(function() {
            var d = this, f = !d.nodeName || c.inArray(d.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!f) {
                return d
            }
            var g = (d.contentWindow || d).document || d.ownerDocument || d;
            return c.browser.safari || g.compatMode == "BackCompat" ? g.body : g.documentElement
        })
    };
    c.fn.scrollTo = function(f, e, d) {
        if (typeof e == "object") {
            d = e;
            e = 0
        }
        if (typeof d == "function") {
            d = {onAfter: d}
        }
        if (f == "max") {
            f = 9000000000
        }
        d = c.extend({}, a.defaults, d);
        e = e || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) {
            e /= 2
        }
        d.offset = b(d.offset);
        d.over = b(d.over);
        return this._scrollable().each(function() {
            var o = this, m = c(o), n = f, k, l = {}, h = m.is("html,body");
            switch (typeof n) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(n)) {
                        n = b(n);
                        break
                    }
                    n = c(n, this);
                case "object":
                    if (n.is || n.style) {
                        k = (n = c(n)).offset()
                    }
            }
            c.each(d.axis.split(""), function(q, r) {
                var u = r == "x" ? "Left" : "Top", t = u.toLowerCase(), w = "scroll" + u, p = o[w], g = a.max(o, r);
                if (k) {
                    l[w] = k[t] + (h ? 0 : p - m.offset()[t]);
                    if (d.margin) {
                        l[w] -= parseInt(n.css("margin" + u)) || 0;
                        l[w] -= parseInt(n.css("border" + u + "Width")) || 0
                    }
                    l[w] += d.offset[t] || 0;
                    if (d.over[t]) {
                        l[w] += n[r == "x" ? "width" : "height"]() * d.over[t]
                    }
                } else {
                    var v = n[t];
                    l[w] = v.slice && v.slice(-1) == "%" ? parseFloat(v) / 100 * g : v
                }
                if (/^\d+$/.test(l[w])) {
                    l[w] = l[w] <= 0 ? 0 : Math.min(l[w], g)
                }
                if (!q && d.queue) {
                    if (p != l[w]) {
                        j(d.onAfterFirst)
                    }
                    delete l[w]
                }
            });
            j(d.onAfter);
            function j(g) {
                m.animate(l, e, d.easing, g && function() {
                    g.call(this, f, d)
                })
            }
        }).end()
    };
    a.max = function(g, j) {
        var n = j == "x" ? "Width" : "Height", k = "scroll" + n;
        if (!c(g).is("html,body")) {
            return g[k] - c(g)[n.toLowerCase()]()
        }
        var o = "client" + n, f = g.ownerDocument.documentElement, d = g.ownerDocument.body;
        return Math.max(f[k], d[k]) - Math.min(f[o], d[o])
    };
    function b(d) {
        return typeof d == "object" ? d : {top: d,left: d}
    }
})(jQuery);
(function(f) {
    var c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    f.PHPDate = function(j, l) {
        var n = "";
        var q = "";
        j = j.replace(/r/g, "D, j M Y H;i:s O");
        for (var p = 0; p < j.length; p++) {
            n = j.charAt(p);
            switch (n) {
                case "a":
                    n = g(l.getHours());
                    break;
                case "c":
                    n = (l.getFullYear() + "-" + b(l.getMonth()) + "-" + b(l.getDate()) + "T" + b(l.getHours()) + ":" + b(l.getMinutes()) + ":" + b(l.getSeconds()));
                    var m = l.toString().split(" ")[5];
                    if (m.indexOf("-") > -1) {
                        n += m.substr(m.indexOf("-"))
                    } else {
                        if (m.indexOf("+") > -1) {
                            n += m.substr(m.indexOf("+"))
                        } else {
                            n += "+0000"
                        }
                    }
                    break;
                case "d":
                    n = b(l.getDate());
                    break;
                case "g":
                    n = a(l.getHours());
                    break;
                case "h":
                    n = b(a(l.getHours()));
                    break;
                case "i":
                    n = b(l.getMinutes());
                    break;
                case "j":
                    n = l.getDate();
                    break;
                case "l":
                    n = c[l.getDay()];
                    break;
                case "m":
                    n = b(l.getMonth() + 1);
                    break;
                case "n":
                    n = l.getMonth() + 1;
                    break;
                case "o":
                    (new Date(d(l.getFullYear())) > l) ? n = (l.getFullYear() - 1) : n = l.getFullYear();
                    break;
                case "s":
                    n = b(l.getSeconds());
                    break;
                case "t":
                    var v = new Date(l.valueOf());
                    v.setMonth(v.getMonth() + 1);
                    v.setDate(0);
                    n = v.getDate();
                    break;
                case "u":
                    n = l.getMilliseconds();
                    break;
                case "w":
                    n = l.getDay();
                    break;
                case "y":
                    n = l.getFullYear().toString().substr(2, 2);
                    break;
                case "z":
                    var w = new Date(l.getFullYear(), 0, 1, 0, 0, 0, 0);
                    var t = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0, 0);
                    n = Math.round((t.valueOf() - w.valueOf()) / 1000 / 60 / 60 / 24);
                    break;
                case "A":
                    n = g(l.getHours()).toUpperCase();
                    break;
                case "B":
                    n = Math.floor(((l.getHours() * 60 * 60 * 1000) + (l.getMinutes() * 60 * 1000) + (l.getSeconds() * 1000) + (l.getMilliseconds())) / 86400);
                    break;
                case "D":
                    n = c[l.getDay()].substr(0, 3);
                    break;
                case "F":
                    n = h[l.getMonth()];
                    break;
                case "G":
                    n = l.getHours();
                    break;
                case "H":
                    n = b(l.getHours());
                    break;
                case "I":
                    var o = new Date(l.getFullYear(), 0, 1);
                    var u = new Date(l.getFullYear(), l.getMonth(), l.getDate());
                    var k = (u.valueOf() - o.valueOf()) / 1000 / 60 / 60 / 24;
                    (k == Math.round(k)) ? n = 0 : n = 1;
                    break;
                case "L":
                    ((new Date(l.getFullYear(), 2, 0)).getDate() == 29) ? n = 1 : n = 0;
                    break;
                case "M":
                    n = h[l.getMonth()].substr(0, 3);
                    break;
                case "N":
                    (l.getDay() == 0) ? n = 7 : n = l.getDay();
                    break;
                case "O":
                    var m = l.toString().split(" ")[5];
                    if (m.indexOf("-") > -1) {
                        n = m.substr(m.indexOf("-"))
                    } else {
                        if (m.indexOf("+") > -1) {
                            n = m.substr(m.indexOf("+"))
                        } else {
                            n = "+0000"
                        }
                    }
                    break;
                case "P":
                    var m = l.toString().split(" ")[5];
                    if (m.indexOf("-") > -1) {
                        var r = m.substr(m.indexOf("-") + 1).split("");
                        n = ("-" + r[0] + r[1] + ":" + r[2] + r[3])
                    } else {
                        if (m.indexOf("+") > -1) {
                            var r = m.substr(m.indexOf("+") + 1).split("");
                            n = ("+" + r[0] + r[1] + ":" + r[2] + r[3])
                        } else {
                            n = "+00:00"
                        }
                    }
                    break;
                case "S":
                    n = e(l.getDate());
                    break;
                case "T":
                    n = l.toString().split(" ")[5];
                    if (n.indexOf("+") > -1) {
                        n = n.substr(0, n.indexOf("+"))
                    } else {
                        if (n.indexOf("-") > -1) {
                            n = n.substr(0, n.indexOf("-"))
                        }
                    }
                    break;
                case "U":
                    n = Math.floor(l.getTime() / 1000);
                    break;
                case "W":
                    var o = new Date(d(l.getFullYear()));
                    var u = new Date(l.getFullYear(), l.getMonth(), l.getDate());
                    n = Math.ceil(Math.round((u.valueOf() - o.valueOf()) / 1000 / 60 / 60 / 24) / 7);
                    break;
                case "Y":
                    n = l.getFullYear();
                    break;
                case "Z":
                    (l.getTimezoneOffset() < 0) ? n = Math.abs(l.getTimezoneOffset() * 60) : n = (0 - (l.getTimezoneOffset() * 60));
                    break
            }
            q += n.toString()
        }
        return q
    };
    function b(j) {
        if (j < 10) {
            j = ("0" + j)
        }
        return j
    }
    function g(j) {
        if (j > 11) {
            return "pm"
        } else {
            return "am"
        }
    }
    function e(k) {
        var j = "th";
        switch (parseInt(k)) {
            case 1:
            case 21:
            case 31:
                j = "st";
                break;
            case 2:
            case 22:
                j = "nd";
                break;
            case 3:
            case 23:
                j = "rd"
        }
        return j
    }
    function d(k) {
        var j = new Date(k, 0, 1);
        while (j.getDay() != 1) {
            j.setDate(j.getDate() + 1)
        }
        return j.valueOf()
    }
    function a(j) {
        if (j == 0) {
            j = 24
        } else {
            if (j > 12) {
                j -= 12
            }
        }
        return j
    }
})(jQuery);
(function(a) {
    a.fn.addShadowBorder = function(b) {
        var c = a.extend({}, a.fn.addShadowBorder.defaults, b);
        return this.each(function() {
            a(this).css("position", "relative");
            a(this).wrapInner('<span class="shadow"></span>');
            a(this).append('<span class="shadow_left"></span><span class="shadow_right"></span>');
            if (a.browser.className == "msie6" && a(this).find("img").width() % 2 != 0) {
                a(this).find(".shadow_right").css("right", "-1")
            }
            if (a.browser.className == "msie6" && a(this).find("img").height() % 2 != 0) {
                a(this).find(".shadow_left").css("bottom", "-1")
            }
        })
    };
    a.fn.addShadowBorder.defaults = {}
})(jQuery);
(function(a) {
    a.fn.animatePrice = function(n) {
        var c = a.extend({}, a.fn.animatePrice.defaults, n);
        var d = 30;
        var g = parseInt((c.duration * 0.001) * d);
        var k = new RegExp("[^0-9.]", "g");
        var m = +a(this).html().replace(k, "");
        var l = c.amount - m;
        var h = l / g;
        var j = a(this).data("lastAnimationAmount");
        if (typeof (j) != "undefined") {
            if (j == c.amount) {
                return this
            }
        }
        a(this).data("lastAnimationAmount", c.amount);
        if (h > 0 && h < 1) {
            h = 1
        }
        if (h < 0 && h > -1) {
            h = -1
        }
        if (h == 0) {
            return this
        }
        var e = Math.abs(parseInt(l / h));
        var b = parseInt(c.duration / e);
        for (var f = 1; f <= e; f++) {
            if (f == e) {
                a(this).animate({border: 0}, b, function() {
                    a(this).text(c.currency + hyundaiForms.addCommas(c.amount))
                })
            } else {
                a(this).animate({border: 0}, b, function() {
                    m = parseInt(m + h);
                    a(this).html(c.currency + hyundaiForms.addCommas(m))
                })
            }
        }
        c.callback;
        return this
    };
    a.fn.animatePrice.defaults = {amount: 0,duration: 400,currency: "$",callback: function() {
        }}
})(jQuery);
(function(a) {
    a.fn.carousel = function(b) {
        var e = a.extend({}, a.fn.carousel.defaults, b);
        var f = (e.nextPrevContainer != "") ? a(e.nextPrevContainer) : a(this);
        var d = (e.totalContainer != "") ? a(e.totalContainer) : a(this);
        var c = a.fn.carousel.carouselCount;
        f.each(function() {
            a(this).addClass("carouselID_" + c);
            c++
        });
        c = a.fn.carousel.carouselCount;
        d.each(function() {
            a(this).addClass("carouselID_" + c);
            c++
        });
        c = a.fn.carousel.carouselCount;
        a.fn.carousel.carouselCount += 1000;
        return this.each(function() {
            var l = a(this);
            var k = 0;
            var h = a(".carouselID_" + c).find(e.totalSelector);
            var j = a(".carouselID_" + c).find(e.counterSelector);
            var m = a(".carouselID_" + c).find(e.nextSelector);
            var g = a(".carouselID_" + c).find(e.previousSelector);
            var n = l.find(e.sectionSelector);
            n.each(function(o) {
                (o != 0) ? a(this).hide() : false
            });
            j.text(k + 1);
            h.text(n.length);
            (n.length <= 1) ? m.css("visibility", "hidden") : m.css("visibility", "visible");
            (!e.loop && k + 1 == 1) ? g.css("visibility", "hidden") : g.css("visibility", "visible");
            c++;
            m.click(function() {
                if (!e.slideTransition) {
                    a(n[k]).hide();
                    k = (k === n.length - 1) ? 0 : k + 1;
                    a(n[k]).show();
                    j.text(k + 1);
                    (!e.loop && k + 1 == 1) ? g.css("visibility", "hidden") : g.css("visibility", "visible");
                    (!e.loop && k === n.length - 1) ? m.css("visibility", "hidden") : m.css("visibility", "visible")
                } else {
                    a(n[k]).css("width", a(n[k]).parent().outerWidth()).animate({left: -a(n[k]).width()}, e.slideSpeed, "swing");
                    k = (k === n.length - 1) ? 0 : k + 1;
                    a(n[k]).css({width: a(n[k]).parent().outerWidth(),left: a(n[k]).width()}).show().animate({left: 0}, e.slideSpeed, "swing", function() {
                        j.text(k + 1);
                        (!e.loop && k + 1 == 1) ? g.css("visibility", "hidden") : g.css("visibility", "visible");
                        (!e.loop && k === n.length - 1) ? m.css("visibility", "hidden") : m.css("visibility", "visible")
                    })
                }
                return false
            });
            g.click(function() {
                if (!e.slideTransition) {
                    a(n[k]).hide();
                    k = (k === 0) ? n.length - 1 : k - 1;
                    a(n[k]).show();
                    j.text(k + 1);
                    (!e.loop && k + 1 == 1) ? g.css("visibility", "hidden") : g.css("visibility", "visible");
                    (!e.loop && k === n.length - 1) ? m.css("visibility", "hidden") : m.css("visibility", "visible")
                } else {
                    a(n[k]).css("width", a(n[k]).parent().outerWidth()).animate({left: a(n[k]).parent().width()}, e.slideSpeed, "swing");
                    k = (k === 0) ? n.length - 1 : k - 1;
                    a(n[k]).css({width: a(n[k]).parent().outerWidth(),left: -a(n[k]).width()}).show().animate({left: 0}, e.slideSpeed, "swing", function() {
                        j.text(k + 1);
                        (!e.loop && k + 1 == 1) ? g.css("visibility", "hidden") : g.css("visibility", "visible");
                        (!e.loop && k === n.length - 1) ? m.css("visibility", "hidden") : m.css("visibility", "visible")
                    })
                }
                return false
            })
        })
    };
    a.fn.carousel.carouselCount = 1000;
    a.fn.carousel.defaults = {loop: true,slideTransition: false,slideSpeed: 300,sectionSelector: "._contents li",nextSelector: "._next",previousSelector: "._previous",counterSelector: "._counter",totalSelector: "._total",totalContainer: "",nextPrevContainer: ""}
})(jQuery);
(function(a) {
    a.fn.extend({clickAndEnter: function(b) {
            return this.each(function() {
                this.callback = b || function() {
                };
                a(this).bind("click", function(c) {
                    this.callback();
                    return false
                });
                a(this).bind("keypress", function(d) {
                    var c = d.charCode || d.keyCode;
                    if (c && c == 13) {
                        this.callback();
                        return false
                    }
                })
            })
        },enterKey: function(b) {
            return this.each(function() {
                this.callback = b || function() {
                };
                a(this).bind("keypress", function(d) {
                    var c = d.charCode || d.keyCode;
                    if (c && c == 13) {
                        this.callback();
                        return false
                    }
                })
            })
        }})
})(jQuery);
(function(a) {
    a.fn.enterKeySubmit = function() {
        return this.each(function() {
            a(this).find("#bodyContent input[type=text]:enabled").eq(0).focus();
            a(this).find("#bodyContent input[type=text]").enterKey(function() {
                a(this).parents("form").find(".submit").click()
            })
        })
    }
})(jQuery);
(function(a) {
    a.fn.externalSiteToolTip = function(b) {
        var c = a.extend({}, a.fn.externalSiteToolTip.defaults, b);
        return this.each(function(d) {
            if (a(this).attr("target") === "_blank") {
                a(this).attr("rel", "#modalExternalSiteCluetip");
                if (a(this).attr("title") === "") {
                    a(this).attr("title", globalExternalLinkTitle)
                }
                a(this).cluetip({cluezIndex: 10000,cursor: "pointer",dropShadow: false,local: true,arrows: true,width: 225,topOffset: -15,positionBy: "auto",clickThrough: true,sticky: false});
                a(this).mouseenter(function() {
                    a("#modalExternalSiteCluetip span.external_url").text(a(this).attr("href"))
                })
            }
        })
    };
    a.fn.externalSiteToolTip.defaults = {}
})(jQuery);
(function(a) {
    a.fn.generalContent = function(b) {
        var d = a.extend({}, a.fn.generalContent.defaults, b);
        var c = a(this).length;
        return this.each(function(j) {
            var g = j;
            if (a(this).hasClass("image_left") || a(this).hasClass("image_right")) {
                var m = a(this);
                if (a(this).hasClass("video_content")) {
                    var f = m.outerWidth() - m.width();
                    var l = m.parent().width();
                    var e = m.find("div.content_image").outerWidth();
                    var h = m.find("div.content_copy").outerWidth() - m.find("div.content_copy").width();
                    var k = l - e - f - h;
                    k = k > 0 ? k : "auto";
                    m.find("div.content_copy").width(k)
                } else {
                    a('<img src="' + m.find("div.content_image img").attr("src") + '" />').load(function() {
                        var o = m.outerWidth() - m.width();
                        var r = m.parent().width();
                        var n = m.find("div.content_image").outerWidth();
                        var p = m.find("div.content_copy").outerWidth() - m.find("div.content_copy").width();
                        var q = r - n - o - p;
                        q = q > 0 ? q : "auto";
                        m.find("div.content_copy").width(q)
                    })
                }
            }
            if (g + 1 == c) {
                (d.complete || function() {
                })()
            }
        })
    };
    a.fn.generalContent.defaults = {}
})(jQuery);
(function(a) {
    a.fn.generalColumnLayout = function(b) {
        var c = a.extend({}, a.fn.generalColumnLayout.defaults, b);
        return this.each(function(k) {
            var e = a(this);
            var h = (e.width() - c.columnGap) / 2;
            var m = 0;
            var l = false;
            var g = 0;
            var d = 0;
            var j = [];
            a(this).find(".general_content").each(function(n) {
                j[n] = a(this).parent()
            });
            for (var k = 0; k < j.length; k++) {
                j[k].find(".content_image").each(function() {
                    if (a(this).find("img").length) {
                        var n = a(this).find("img");
                        var o = k;
                        a('<img src="' + n.attr("src") + '" />').load(function() {
                            f(n.parents(".content_image").outerWidth(), o)
                        })
                    } else {
                        f(a(this).outerWidth(), k)
                    }
                })
            }
            function f(n, o) {
                m = m + 1;
                if (n > h) {
                    l = true;
                    g = n;
                    d = o
                }
            }
            (function() {
                if (m == e.find(".content_image").length) {
                    if (l === true) {
                        for (var n = 0; n < j.length; n++) {
                            if (n === d) {
                                j[n].width(g)
                            } else {
                                j[n].width(e.width() - g - c.columnGap)
                            }
                        }
                    } else {
                        e.find(".general_content").parent().width(h)
                    }
                    (function() {
                        if (sIFR.isActive) {
                            if (e.find("h2").length === e.find("h2.sIFR-replaced").length) {
                                e.find("h2").each(function() {
                                    var o = a(this).find(".sIFR-alternate").html();
                                    a(this).removeClass("sIFR-replaced").html(o);
                                    sIFR.replace(univers, {elements: [this],transparent: true,fixWrap: true,css: {".sIFR-root": {"letter-spacing": "-0.3",color: "#3e3d3a","background-color": "transparent","text-transform": "uppercase","font-size": "24px"},".subhead": {color: "#4C647E"}}})
                                })
                            } else {
                                setTimeout(arguments.callee, 250)
                            }
                        }
                    })()
                } else {
                    setTimeout(arguments.callee, 250)
                }
            })()
        })
    };
    a.fn.generalColumnLayout.defaults = {columnGap: 7}
})(jQuery);
(function(a) {
    a.fn.readMore = function() {
        return this.each(function() {
            var b = "";
            a(this).toggle(function() {
                var c = a(this).find("img");
                b = a(this).attr("rel");
                a(this).attr("rel", a(this).text());
                a(this).text(b).append(c);
                a(this).parent().find(".read_more_content").slideDown("slow")
            }, function() {
                var c = a(this).find("img");
                b = a(this).attr("rel");
                a(this).attr("rel", a(this).text());
                a(this).text(b).append(c);
                a(this).parent().find(".read_more_content").slideUp("slow")
            })
        })
    }
})(jQuery);
(function(a) {
    a.fn.hoverClass = function() {
        return a(this).each(function() {
            a(this).hover(function() {
                a(this).addClass("hover")
            }, function() {
                a(this).removeClass("hover")
            })
        })
    }
})(jQuery);
(function(a) {
    a.fn.imageHover = function(b) {
        var c = a.extend({}, a.fn.imageHover.defaults, b);
        return this.each(function() {
            if (/(\.swf|\.flv){1}$/.test(a(this).attr("href")) || a(this).attr("href").indexOf("video.html") != -1) {
                a(this).append('<span class="video_icon"></span>')
            }
            a(this).hover(function() {
                a(this).find("img").animate({opacity: "0.8"}, 180, "linear")
            }, function() {
                a(this).find("img").animate({opacity: "1"}, 180, "linear")
            })
        })
    };
    a.fn.imageHover.defaults = {}
})(jQuery);
(function(a) {
    a.fn.modal = function(b) {
        var e = a.extend({}, a.fn.modal.defaults, b);
        var c;
        var f = 0;
        function d(j, k, g) {
            if (a.browser.msie && a.browser.version == 6) {
                scroll(0, 0)
            }
            var o = a("#" + j);
            var l = o.prev();
            var p = o.next();
            var r = o.parent();
            c = a('<div id="' + e.modalID + '" class="content_modal" style="display:none;"><div class="content_modalInner"><div class="content_modalContent"><div class="content_modalClear"></div></div><div class="content_modalBottom"></div></div><div class="content_modalTopRight"></div><div class="content_modalBottomLeft"></div><div class="content_modalPointer"></div><a class="content_modalClose">Close</a></div>');
            c.find(".content_modalContent").prepend(o);
            function m() {
                return q(window.pageYOffset ? window.pageYOffset : 0, document.documentElement ? document.documentElement.scrollTop : 0, document.body ? document.body.scrollTop : 0)
            }
            function q(y, v, u) {
                var w = y ? y : 0;
                if (v && (!w || (w > v))) {
                    w = v
                }
                return u && (!w || (w > u)) ? u : w
            }
            var n = (k && g) ? function() {
                if (f == 0) {
                    f = a(window).width() - a("#content").width() > 0 ? k - ((a(window).width() - a("#content").width()) / 2) : k
                } else {
                    k = a(window).width() - a("#content").width() > 0 ? f + ((a(window).width() - a("#content").width()) / 2) : f
                }
                c.css({bottom: a(window).height() - (g - h),left: k})
            } : function() {
                var v = a(window).height() > c.height() ? (a(window).height() - c.height()) * 0.5 : 0;
                var u = a(window).width() > c.width() ? (a(window).width() - c.width()) * 0.5 : 0;
                v = (a(window).height() > c.height()) ? v + m() : v;
                c.css({display: "block",position: "absolute",top: v,left: u});
                c.find(".content_modalPointer").hide()
            };
            var h = c.find(".content_modalPointer").height() || 17;
            a.fn.overlay("show", {callback: function() {
                    c.appendTo("body").fadeIn(500, function() {
                        n();
                        t = setInterval(n, 1);
                        e.callback()
                    })
                }});
            c.find(".content_modalClose").hoverClass().mousedown(function() {
                a(this).addClass("down")
            }).click(function() {
                c.fadeOut(500, function() {
                    if (l.length) {
                        o.insertAfter(l)
                    } else {
                        if (p.length) {
                            o.insertBefore(p)
                        } else {
                            r.prepend(o)
                        }
                    }
                    a(this).remove();
                    a.fn.overlay("hide");
                    clearInterval(t);
                    if (e.onClose) {
                        e.onClose()
                    }
                })
            });
            a(window).resize(function() {
                n()
            });
            a(window).scroll(function() {
                n()
            });
            c.click(function() {
                n()
            });
            var t
        }
        if (!e.xPos && !e.yPos && !e.contentID) {
            a(this).click(function() {
                var g = a(this).attr("class").match(/modal_(.*)/)[1];
                d(g, a(this).offset().left, a(this).offset().top)
            })
        } else {
            if ((e.xPos || e.xPos === 0) && (e.yPos || e.yPos === 0) && e.contentID) {
                d(e.contentID, parseInt(e.xPos), parseInt(e.yPos))
            } else {
                d(e.contentID)
            }
        }
    };
    a.fn.modal.defaults = {modalID: "modal",contentID: false,xPos: false,yPos: false,callback: function() {
        }}
})(jQuery);
$(document).ready(function() {
    $("*[class*=modal_]").modal()
});
(function(a) {
    a.fn.multiContentBox = function(b) {
        var c = a.extend({}, a.fn.multiContentBox.defaults, b);
        return this.each(function() {
            $this = a(this);
            a(this).find(".navigation_container li:not(li.line)").each(function(f) {
                var d = "#nav" + (f + 1) + " a";
                var e = a("#nav" + (f + 1))
            });
            a(this).find(".navigation_container li").click(function() {
                if (!a(this).hasClass("line") && !a(this).hasClass("active")) {
                    var d = a(this).parent();
                    a(".navigation_container li.active").removeClass("active");
                    a(this).addClass("active");
                    a(".content_container .active").removeClass("active").slideUp(300);
                    a(".content_container #content" + a(this).attr("id").split("nav")[1]).addClass("active").slideDown(300)
                }
                return false
            });
            a(this).find(".navigation_container li:first").click()
        })
    };
    a.fn.multiContentBox.defaults = {}
})(jQuery);
(function(a) {
    a.fn.multiContentBox1 = function(b) {
        var c = a.extend({}, a.fn.multiContentBox1.defaults, b);
        return this.each(function() {
            $this = a(this);
            a(this).find(".navigation_container1 li:not(li.line)").each(function(f) {
                var d = "#nav1" + (f + 1) + " a";
                var e = a("#nav1" + (f + 1))
            });
            a(this).find(".navigation_container1 li").click(function() {
                if (!a(this).hasClass("line") && !a(this).hasClass("active")) {
                    var d = a(this).parent();
                    a(".navigation_container1 li.active").removeClass("active");
                    a(this).addClass("active");
                    a(".content_container1 .active").removeClass("active").slideUp(300);
                    a(".content_container1 #content1" + a(this).attr("id").split("nav1")[1]).addClass("active").slideDown(300)
                }
                return false
            });
            a(this).find(".navigation_container1 li:first").click()
        })
    };
    a.fn.multiContentBox1.defaults = {}
})(jQuery);
(function(a) {
    a.fn.overlay = function(h, f) {
        var j = a.extend(a.fn.overlay.defaults, f);
        var d = (a.browser.msie && parseInt(a.browser.version) == 6) ? true : false;
        var b = ((a.browser.mozilla && parseFloat(a.browser.version) < 1.9) && (navigator.userAgent.indexOf("Mac") !== -1)) ? true : false;
        if (h == "show" && !a("#OVERLAY").length) {
            if (d) {
                a("select").css({visibility: "hidden"});
                a.extend(j.overlayCSS, {position: "absolute",height: "100%",top: 0,left: 0})
            }
            if (b) {
                a.extend(j.overlayCSS, {opacity: 1,background: "transparent url(" + j.macFF2Image + ") 0 0 repeat"})
            }
            var e = a('<div id="OVERLAY"></div>');
            var g = j.overlayCSS.opacity;
            j.overlayCSS.opacity = 0;
            e.css(j.overlayCSS).attr("class", j.overlayClass).prependTo("body").animate({opacity: g}, j.duration, "swing", j.callback);
            j.overlayCSS.opacity = g;
            if (d) {
                a("html").find("body").andSelf().css({height: "100%",width: "100%"});
                e.height(a(document).height());
                var c = function() {
                    e.height(a(document).height())
                };
                a(window).resize(c)
            }
        } else {
            if (h == "hide") {
                a("#OVERLAY").remove();
                if (d) {
                    a("select").css("visibility", "visible");
                    a(window).unbind(c)
                }
            }
        }
    };
    a.fn.overlay.defaults = {macFF2Image: "",overlayClass: "",overlayCSS: {backgroundColor: "#000",position: "fixed",opacity: 0.3,zIndex: 8001,top: 0,left: 0,height: "100%",width: "100%"},callback: function() {
        },duration: 600}
})(jQuery);
(function(a) {
    a.fn.pagination = function(b) {
        var c = a.extend({}, a.fn.pagination.defaults, b);
        return this.each(function() {
            var h = a(this);
            var g = c.maxPageView;
            if (c.altRows) {
                h.find(c.pageTag + ":odd").addClass("altrow")
            }
            h.find(c.pageTag).each(function(k) {
                if (k < g) {
                    a(this).show()
                } else {
                    a(this).hide()
                }
            });
            var e = h.find(c.pageTag).length;
            if (e > g) {
                var f = (e % g == 0) ? Math.floor(e / g) : Math.floor(e / g) + 1;
                a(c.paginationContainer).show().addClass("prev").append('<div class="prev"><a href="#">Prev</a></div>');
                for (var j = 1; j <= f; j++) {
                    var d = (j == 1) ? "number current_number" : "number";
                    a(c.paginationContainer).append('<div class="' + d + '"><a href="#">' + j + "</a></div>")
                }
                a(c.paginationContainer).append('<div class="next"><a href="#">Next</a></div>');
                a(c.paginationContainer).find("a").click(function() {
                    switch (a(this).html()) {
                        case "Prev":
                            if (!a(this).parents(c.paginationContainer).hasClass("prev")) {
                                a(c.paginationContainer).find(".current_number").prev().find("a").click()
                            }
                            break;
                        case "Next":
                            if (!a(this).parents(c.paginationContainer).hasClass("next")) {
                                a(c.paginationContainer).find(".current_number").next().find("a").click()
                            }
                            break;
                        default:
                            if (!a(this).parent().hasClass("current_number")) {
                                var k = (parseInt(a(this).html()) * g) - g;
                                var l = 1;
                                for (var m = 0; m <= h.find(c.pageTag).length; m++) {
                                    if (m >= k && l <= g) {
                                        h.find(c.pageTag).eq(m).show();
                                        l++
                                    } else {
                                        h.find(c.pageTag).eq(m).hide()
                                    }
                                }
                                a(c.paginationContainer).find(".number.current_number").removeClass("current_number");
                                a(this).parent().addClass("current_number");
                                a(this).parents(c.paginationContainer)[(parseInt(a(this).html()) != 1) ? "removeClass" : "addClass"]("prev");
                                a(this).parents(c.paginationContainer)[(parseInt(a(this).html()) != f) ? "removeClass" : "addClass"]("next")
                            }
                    }
                    return false
                })
            }
        })
    };
    a.fn.pagination.defaults = {loop: false,altRows: false,pageTag: "li",paginationContainer: "",maxPageView: 1}
})(jQuery);
(function(a) {
    a.fn.pngFix = function(b) {
        var c = a.extend({}, a.fn.pngFix.defaults, b);
        return this.each(function(f) {
            if (a.browser.msie && a.browser.version == 6) {
                var g = a(this);
                var d = (this.tagName != "IMG") ? a(this) : a(this).parent();
                if (this.tagName == "IMG") {
                    if (!g.data("processed")) {
                        var h = (g.css("width") == "auto") ? false : parseInt(g.css("width").split("px")[0]);
                        var e = (g.css("height") == "auto") ? false : parseInt(g.css("height").split("px")[0]);
                        if (h) {
                            g.attr("width", h)
                        }
                        if (e) {
                            g.attr("height", e)
                        }
                    }
                    a('<img src="' + g.attr("src") + '" />').load(function() {
                        a(this).wrap('<div style="height:0;overflow:hidden;"></div>');
                        a(this).parent().appendTo("body");
                        if (((h && !e) || (!h && e)) || g.data("processed")) {
                            if (h || g.data("scale") == "width") {
                                g.attr("height", a(this).height() * (g.attr("width") / a(this).width()));
                                g.data("processed", "true");
                                g.data("scale", "width")
                            } else {
                                g.attr("width", a(this).width() * (g.attr("height") / a(this).height()));
                                g.data("processed", "true");
                                g.data("scale", "height")
                            }
                            if (g.next("span").length) {
                                g.next("span").remove();
                                d.executePngFix();
                                g.next("span").css("display", "inline-block")
                            } else {
                                d.executePngFix()
                            }
                        } else {
                            d.executePngFix()
                        }
                        a(this).parent().remove()
                    })
                } else {
                    d.executePngFix()
                }
            }
        })
    };
    a.fn.pngFix.defaults = {imageSrc: ""}
})(jQuery);
(function(a) {
    a.fn.extend({valueHold: function() {
            return this.each(function() {
                var b = a(this).val();
                a(this).focus(function() {
                    if (a(this).attr("value") == b) {
                        a(this).val("")
                    }
                });
                a(this).blur(function() {
                    if (a(this).attr("value") == "") {
                        a(this).val(b)
                    }
                })
            })
        }})
})(jQuery);
(function(a) {
    a.fn.vehicleJsonData = function(b) {
        var c = a.extend({}, a.fn.vehicleJsonData.defaults, b);
        return this.each(function() {
            var f = a(this);
            var d = HN.Vehicles.findModelByID(c.vehicle);
            var e = d.findTrimByID(c.trim);
            if (c.key == "BasePrice" || c.key == "Price") {
                f.html(c.currency + hyundaiForms.addCommas(e.getJSONData()[c.key]))
            } else {
                f.html(e.getJSONData()[c.key])
            }
        })
    };
    a.fn.vehicleJsonData.defaults = {vehicle: "",trim: "",key: "",currency: ""}
})(jQuery);
new function(e) {
    var d = e.separator || "&";
    var c = e.spaces === false ? false : true;
    var a = e.suffix === false ? "" : "[]";
    var g = e.prefix === false ? false : true;
    var b = g ? e.hash === true ? "#" : "?" : "";
    var f = e.numbers === false ? false : true;
    jQuery.query = new function() {
        var h = function(n, m) {
            return n != undefined && n !== null && (!!m ? n.constructor == m : true)
        };
        var j = function(t) {
            var n, r = /\[([^[]*)\]/g, o = /^([^[]+)(\[.*\])?$/.exec(t), p = o[1], q = [];
            while (n = r.exec(o[2])) {
                q.push(n[1])
            }
            return [p, q]
        };
        var l = function(u, t, r) {
            var v, q = t.shift();
            if (typeof u != "object") {
                u = null
            }
            if (q === "") {
                if (!u) {
                    u = []
                }
                if (h(u, Array)) {
                    u.push(t.length == 0 ? r : l(null, t.slice(0), r))
                } else {
                    if (h(u, Object)) {
                        var p = 0;
                        while (u[p++] != null) {
                        }
                        u[--p] = t.length == 0 ? r : l(u[p], t.slice(0), r)
                    } else {
                        u = [];
                        u.push(t.length == 0 ? r : l(null, t.slice(0), r))
                    }
                }
            } else {
                if (q && q.match(/^\s*[0-9]+\s*$/)) {
                    var n = parseInt(q, 10);
                    if (!u) {
                        u = []
                    }
                    u[n] = t.length == 0 ? r : l(u[n], t.slice(0), r)
                } else {
                    if (q) {
                        var n = q.replace(/^\s*|\s*$/g, "");
                        if (!u) {
                            u = {}
                        }
                        if (h(u, Array)) {
                            var m = {};
                            for (var p = 0; p < u.length; ++p) {
                                m[p] = u[p]
                            }
                            u = m
                        }
                        u[n] = t.length == 0 ? r : l(u[n], t.slice(0), r)
                    } else {
                        return r
                    }
                }
            }
            return u
        };
        var k = function(m) {
            var n = this;
            n.keys = {};
            if (m.queryObject) {
                jQuery.each(m.get(), function(o, p) {
                    n.SET(o, p)
                })
            } else {
                jQuery.each(arguments, function() {
                    var o = "" + this;
                    o = o.replace(/^[?#]/, "");
                    o = o.replace(/[;&]$/, "");
                    if (c) {
                        o = o.replace(/[+]/g, " ")
                    }
                    jQuery.each(o.split(/[&;]/), function() {
                        var p = decodeURIComponent(this.split("=")[0] || "");
                        var q = decodeURIComponent(this.split("=")[1] || "");
                        if (!p) {
                            return
                        }
                        if (f) {
                            if (/^[+-]?[0-9]+\.[0-9]*$/.test(q)) {
                                q = parseFloat(q)
                            } else {
                                if (/^[+-]?[0-9]+$/.test(q)) {
                                    q = parseInt(q, 10)
                                }
                            }
                        }
                        q = (!q && q !== 0) ? true : q;
                        if (q !== false && q !== true && typeof q != "number") {
                            q = q
                        }
                        n.SET(p, q)
                    })
                })
            }
            return n
        };
        k.prototype = {queryObject: true,has: function(m, n) {
                var o = this.get(m);
                return h(o, n)
            },GET: function(n) {
                if (!h(n)) {
                    return this.keys
                }
                var m = j(n), o = m[0], q = m[1];
                var p = this.keys[o];
                while (p != null && q.length != 0) {
                    p = p[q.shift()]
                }
                return typeof p == "number" ? p : p || ""
            },get: function(m) {
                var n = this.GET(m);
                if (h(n, Object)) {
                    return jQuery.extend(true, {}, n)
                } else {
                    if (h(n, Array)) {
                        return n.slice(0)
                    }
                }
                return n
            },SET: function(n, t) {
                var p = !h(t) ? null : t;
                var m = j(n), o = m[0], r = m[1];
                var q = this.keys[o];
                this.keys[o] = l(q, r.slice(0), p);
                return this
            },set: function(m, n) {
                return this.copy().SET(m, n)
            },REMOVE: function(m) {
                return this.SET(m, null).COMPACT()
            },remove: function(m) {
                return this.copy().REMOVE(m)
            },EMPTY: function() {
                var m = this;
                jQuery.each(m.keys, function(n, o) {
                    delete m.keys[n]
                });
                return m
            },load: function(m) {
                var o = m.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
                var n = m.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new k(m.length == n.length ? "" : n, m.length == o.length ? "" : o)
            },empty: function() {
                return this.copy().EMPTY()
            },copy: function() {
                return new k(this)
            },COMPACT: function() {
                function m(p) {
                    var o = typeof p == "object" ? h(p, Array) ? [] : {} : p;
                    if (typeof p == "object") {
                        function n(t, q, r) {
                            if (h(t, Array)) {
                                t.push(r)
                            } else {
                                t[q] = r
                            }
                        }
                        jQuery.each(p, function(q, r) {
                            if (!h(r)) {
                                return true
                            }
                            n(o, q, m(r))
                        })
                    }
                    return o
                }
                this.keys = m(this.keys);
                return this
            },compact: function() {
                return this.copy().COMPACT()
            },toString: function() {
                var o = 0, t = [], r = [], n = this;
                var p = function(u) {
                    u = u + "";
                    if (c) {
                        u = u.replace(/ /g, "+")
                    }
                    return encodeURIComponent(u)
                };
                var m = function(u, v, w) {
                    if (!h(w) || w === false) {
                        return
                    }
                    var y = [p(v)];
                    if (w !== true) {
                        y.push("=");
                        y.push(p(w))
                    }
                    u.push(y.join(""))
                };
                var q = function(v, u) {
                    var w = function(y) {
                        return !u || u == "" ? [y].join("") : [u, "[", y, "]"].join("")
                    };
                    jQuery.each(v, function(y, z) {
                        if (typeof z == "object") {
                            q(z, w(y))
                        } else {
                            m(r, w(y), z)
                        }
                    })
                };
                q(this.keys);
                if (r.length > 0) {
                    t.push(b)
                }
                t.push(r.join(d));
                return t.join("")
            }};
        return new k(location.search, location.hash)
    }
}(jQuery.query || {});
var sIFR = new function() {
    var O = this;
    var E = {ACTIVE: "sIFR-active",REPLACED: "sIFR-replaced",IGNORE: "sIFR-ignore",ALTERNATE: "sIFR-alternate",CLASS: "sIFR-class",LAYOUT: "sIFR-layout",FLASH: "sIFR-flash",FIX_FOCUS: "sIFR-fixfocus",DUMMY: "sIFR-dummy"};
    E.IGNORE_CLASSES = [E.REPLACED, E.IGNORE, E.ALTERNATE];
    this.MIN_FONT_SIZE = 6;
    this.MAX_FONT_SIZE = 126;
    this.FLASH_PADDING_BOTTOM = 5;
    this.VERSION = "436";
    this.isActive = false;
    this.isEnabled = true;
    this.fixHover = true;
    this.autoInitialize = true;
    this.setPrefetchCookie = true;
    this.cookiePath = "/";
    this.domains = [];
    this.forceWidth = true;
    this.fitExactly = false;
    this.forceTextTransform = true;
    this.useDomLoaded = true;
    this.useStyleCheck = false;
    this.hasFlashClassSet = false;
    this.repaintOnResize = true;
    this.replacements = [];
    var L = 0;
    var R = false;
    function Y() {
    }
    function D(c) {
        function d(e) {
            return e.toLocaleUpperCase()
        }
        this.normalize = function(e) {
            return e.replace(/\n|\r|\xA0/g, D.SINGLE_WHITESPACE).replace(/\s+/g, D.SINGLE_WHITESPACE)
        };
        this.textTransform = function(e, f) {
            switch (e) {
                case "uppercase":
                    return f.toLocaleUpperCase();
                case "lowercase":
                    return f.toLocaleLowerCase();
                case "capitalize":
                    return f.replace(/^\w|\s\w/g, d)
            }
            return f
        };
        this.toHexString = function(e) {
            if (e.charAt(0) != "#" || e.length != 4 && e.length != 7) {
                return e
            }
            e = e.substring(1);
            return "0x" + (e.length == 3 ? e.replace(/(.)(.)(.)/, "$1$1$2$2$3$3") : e)
        };
        this.toJson = function(g, f) {
            var e = "";
            switch (typeof (g)) {
                case "string":
                    e = '"' + f(g) + '"';
                    break;
                case "number":
                case "boolean":
                    e = g.toString();
                    break;
                case "object":
                    e = [];
                    for (var h in g) {
                        if (g[h] == Object.prototype[h]) {
                            continue
                        }
                        e.push('"' + h + '":' + this.toJson(g[h]))
                    }
                    e = "{" + e.join(",") + "}";
                    break
            }
            return e
        };
        this.convertCssArg = function(e) {
            if (!e) {
                return {}
            }
            if (typeof (e) == "object") {
                if (e.constructor == Array) {
                    e = e.join("")
                } else {
                    return e
                }
            }
            var l = {};
            var m = e.split("}");
            for (var h = 0; h < m.length; h++) {
                var k = m[h].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);
                if (!k || k.length != 3) {
                    continue
                }
                if (!l[k[1]]) {
                    l[k[1]] = {}
                }
                var g = k[2].split(";");
                for (var f = 0; f < g.length; f++) {
                    var n = g[f].match(/\s*([^:\s]+)\s*\:\s*([^;]+)/);
                    if (!n || n.length != 3) {
                        continue
                    }
                    l[k[1]][n[1]] = n[2].replace(/\s+$/, "")
                }
            }
            return l
        };
        this.extractFromCss = function(g, f, i, e) {
            var h = null;
            if (g && g[f] && g[f][i]) {
                h = g[f][i];
                if (e) {
                    delete g[f][i]
                }
            }
            return h
        };
        this.cssToString = function(f) {
            var g = [];
            for (var e in f) {
                var j = f[e];
                if (j == Object.prototype[e]) {
                    continue
                }
                g.push(e, "{");
                for (var i in j) {
                    if (j[i] == Object.prototype[i]) {
                        continue
                    }
                    var h = j[i];
                    if (D.UNIT_REMOVAL_PROPERTIES[i]) {
                        h = parseInt(h, 10)
                    }
                    g.push(i, ":", h, ";")
                }
                g.push("}")
            }
            return g.join("")
        };
        this.escape = function(e) {
            return escape(e).replace(/\+/g, "%2B")
        };
        this.encodeVars = function(e) {
            return e.join("&").replace(/%/g, "%25")
        };
        this.copyProperties = function(g, f) {
            for (var e in g) {
                if (f[e] === undefined) {
                    f[e] = g[e]
                }
            }
            return f
        };
        this.domain = function() {
            var f = "";
            try {
                f = document.domain
            } catch (g) {
            }
            return f
        };
        this.domainMatches = function(h, g) {
            if (g == "*" || g == h) {
                return true
            }
            var f = g.lastIndexOf("*");
            if (f > -1) {
                g = g.substr(f + 1);
                var e = h.lastIndexOf(g);
                if (e > -1 && (e + g.length) == h.length) {
                    return true
                }
            }
            return false
        };
        this.uriEncode = function(e) {
            return encodeURI(decodeURIComponent(e))
        };
        this.delay = function(f, h, g) {
            var e = Array.prototype.slice.call(arguments, 3);
            setTimeout(function() {
                h.apply(g, e)
            }, f)
        }
    }
    D.UNIT_REMOVAL_PROPERTIES = {leading: true,"margin-left": true,"margin-right": true,"text-indent": true};
    D.SINGLE_WHITESPACE = " ";
    function U(e) {
        var d = this;
        function c(g, j, h) {
            var k = d.getStyleAsInt(g, j, e.ua.ie);
            if (k == 0) {
                k = g[h];
                for (var f = 3; f < arguments.length; f++) {
                    k -= d.getStyleAsInt(g, arguments[f], true)
                }
            }
            return k
        }
        this.getBody = function() {
            return document.getElementsByTagName("body")[0] || null
        };
        this.querySelectorAll = function(f) {
            return window.parseSelector(f)
        };
        this.addClass = function(f, g) {
            if (g) {
                g.className = ((g.className || "") == "" ? "" : g.className + " ") + f
            }
        };
        this.removeClass = function(f, g) {
            if (g) {
                g.className = g.className.replace(new RegExp("(^|\\s)" + f + "(\\s|$)"), "").replace(/^\s+|(\s)\s+/g, "$1")
            }
        };
        this.hasClass = function(f, g) {
            return new RegExp("(^|\\s)" + f + "(\\s|$)").test(g.className)
        };
        this.hasOneOfClassses = function(h, g) {
            for (var f = 0; f < h.length; f++) {
                if (this.hasClass(h[f], g)) {
                    return true
                }
            }
            return false
        };
        this.ancestorHasClass = function(g, f) {
            g = g.parentNode;
            while (g && g.nodeType == 1) {
                if (this.hasClass(f, g)) {
                    return true
                }
                g = g.parentNode
            }
            return false
        };
        this.create = function(f, g) {
            var h = document.createElementNS ? document.createElementNS(U.XHTML_NS, f) : document.createElement(f);
            if (g) {
                h.className = g
            }
            return h
        };
        this.getComputedStyle = function(h, i) {
            var f;
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var g = document.defaultView.getComputedStyle(h, null);
                f = g ? g[i] : null
            } else {
                if (h.currentStyle) {
                    f = h.currentStyle[i]
                }
            }
            return f || ""
        };
        this.getStyleAsInt = function(g, i, f) {
            var h = this.getComputedStyle(g, i);
            if (f && !/px$/.test(h)) {
                return 0
            }
            return parseInt(h) || 0
        };
        this.getWidthFromStyle = function(f) {
            return c(f, "width", "offsetWidth", "paddingRight", "paddingLeft", "borderRightWidth", "borderLeftWidth")
        };
        this.getHeightFromStyle = function(f) {
            return c(f, "height", "offsetHeight", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth")
        };
        this.getDimensions = function(j) {
            var h = j.offsetWidth;
            var f = j.offsetHeight;
            if (h == 0 || f == 0) {
                for (var g = 0; g < j.childNodes.length; g++) {
                    var k = j.childNodes[g];
                    if (k.nodeType != 1) {
                        continue
                    }
                    h = Math.max(h, k.offsetWidth);
                    f = Math.max(f, k.offsetHeight)
                }
            }
            return {width: h,height: f}
        };
        this.getViewport = function() {
            return {width: window.innerWidth || document.documentElement.clientWidth || this.getBody().clientWidth,height: window.innerHeight || document.documentElement.clientHeight || this.getBody().clientHeight}
        };
        this.blurElement = function(g) {
            try {
                g.blur();
                return
            } catch (h) {
            }
            var f = this.create("input");
            f.style.width = "0px";
            f.style.height = "0px";
            g.parentNode.appendChild(f);
            f.focus();
            f.blur();
            f.parentNode.removeChild(f)
        }
    }
    U.XHTML_NS = "http://www.w3.org/1999/xhtml";
    function H(r) {
        var g = navigator.userAgent.toLowerCase();
        var q = (navigator.product || "").toLowerCase();
        var h = navigator.platform.toLowerCase();
        this.parseVersion = H.parseVersion;
        this.macintosh = /^mac/.test(h);
        this.windows = /^win/.test(h);
        this.linux = /^linux/.test(h);
        this.quicktime = false;
        this.opera = /opera/.test(g);
        this.konqueror = /konqueror/.test(g);
        this.ie = false
        /*@cc_on||true@*/
        ;
        this.ieSupported = this.ie && !/ppc|smartphone|iemobile|msie\s5\.5/.test(g)
        /*@cc_on&&@_jscript_version>=5.5@*/
        ;
        this.ieWin = this.ie && this.windows
        /*@cc_on&&@_jscript_version>=5.1@*/
        ;
        this.windows = this.windows && (!this.ie || this.ieWin);
        this.ieMac = this.ie && this.macintosh
        /*@cc_on&&@_jscript_version<5.1@*/
        ;
        this.macintosh = this.macintosh && (!this.ie || this.ieMac);
        this.safari = /safari/.test(g);
        this.webkit = !this.konqueror && /applewebkit/.test(g);
        this.khtml = this.webkit || this.konqueror;
        this.gecko = !this.khtml && q == "gecko";
        this.ieVersion = this.ie && /.*msie\s(\d\.\d)/.exec(g) ? this.parseVersion(RegExp.$1) : "0";
        this.operaVersion = this.opera && /.*opera(\s|\/)(\d+\.\d+)/.exec(g) ? this.parseVersion(RegExp.$2) : "0";
        this.webkitVersion = this.webkit && /.*applewebkit\/(\d+).*/.exec(g) ? this.parseVersion(RegExp.$1) : "0";
        this.geckoVersion = this.gecko && /.*rv:\s*([^\)]+)\)\s+gecko/.exec(g) ? this.parseVersion(RegExp.$1) : "0";
        this.konquerorVersion = this.konqueror && /.*konqueror\/([\d\.]+).*/.exec(g) ? this.parseVersion(RegExp.$1) : "0";
        this.flashVersion = 0;
        if (this.ieWin) {
            var l;
            var o = false;
            try {
                l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
            } catch (m) {
                try {
                    l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    this.flashVersion = this.parseVersion("6");
                    l.AllowScriptAccess = "always"
                } catch (m) {
                    o = this.flashVersion == this.parseVersion("6")
                }
                if (!o) {
                    try {
                        l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                    } catch (m) {
                    }
                }
            }
            if (!o && l) {
                this.flashVersion = this.parseVersion((l.GetVariable("$version") || "").replace(/^\D+(\d+)\D+(\d+)\D+(\d+).*/g, "$1.$2.$3"))
            }
        } else {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"]) {
                var n = navigator.plugins["Shockwave Flash"].description.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                var p = n.replace(/^\D*(\d+\.\d+).*$/, "$1");
                if (/r/.test(n)) {
                    p += n.replace(/^.*r(\d*).*$/, ".$1")
                } else {
                    if (/d/.test(n)) {
                        p += ".0"
                    }
                }
                this.flashVersion = this.parseVersion(p);
                var j = false;
                for (var k = 0, c = this.flashVersion >= H.MIN_FLASH_VERSION; c && k < navigator.mimeTypes.length; k++) {
                    var f = navigator.mimeTypes[k];
                    if (f.type != "application/x-shockwave-flash") {
                        continue
                    }
                    if (f.enabledPlugin) {
                        j = true;
                        if (f.enabledPlugin.description.toLowerCase().indexOf("quicktime") > -1) {
                            c = false;
                            this.quicktime = true
                        }
                    }
                }
                if (this.quicktime || !j) {
                    this.flashVersion = this.parseVersion("0")
                }
            }
        }
        this.flash = this.flashVersion >= H.MIN_FLASH_VERSION;
        this.transparencySupport = this.macintosh || this.windows || this.linux && (this.flashVersion >= this.parseVersion("10") && (this.gecko && this.geckoVersion >= this.parseVersion("1.9") || this.opera));
        this.computedStyleSupport = this.ie || !!document.defaultView.getComputedStyle;
        this.fixFocus = this.gecko && this.windows;
        this.nativeDomLoaded = this.gecko || this.webkit && this.webkitVersion >= this.parseVersion("525") || this.konqueror && this.konquerorMajor > this.parseVersion("03") || this.opera;
        this.mustCheckStyle = this.khtml || this.opera;
        this.forcePageLoad = this.webkit && this.webkitVersion < this.parseVersion("523");
        this.properDocument = typeof (document.location) == "object";
        this.supported = this.flash && this.properDocument && (!this.ie || this.ieSupported) && this.computedStyleSupport && (!this.opera || this.operaVersion >= this.parseVersion("9.61")) && (!this.webkit || this.webkitVersion >= this.parseVersion("412")) && (!this.gecko || this.geckoVersion >= this.parseVersion("1.8.0.12")) && (!this.konqueror)
    }
    H.parseVersion = function(c) {
        return c.replace(/(^|\D)(\d+)(?=\D|$)/g, function(f, e, g) {
            f = e;
            for (var d = 4 - g.length; d >= 0; d--) {
                f += "0"
            }
            return f + g
        })
    };
    H.MIN_FLASH_VERSION = H.parseVersion("8");
    function F(c) {
        this.fix = c.ua.ieWin && window.location.hash != "";
        var d;
        this.cache = function() {
            d = document.title
        };
        function e() {
            document.title = d
        }
        this.restore = function() {
            if (this.fix) {
                setTimeout(e, 0)
            }
        }
    }
    function S(l) {
        var e = null;
        function c() {
            try {
                if (l.ua.ie || document.readyState != "loaded" && document.readyState != "complete") {
                    document.documentElement.doScroll("left")
                }
            } catch (n) {
                return setTimeout(c, 10)
            }
            i()
        }
        function i() {
            if (l.useStyleCheck) {
                h()
            } else {
                if (!l.ua.mustCheckStyle) {
                    d(null, true)
                }
            }
        }
        function h() {
            e = l.dom.create("div", E.DUMMY);
            l.dom.getBody().appendChild(e);
            m()
        }
        function m() {
            if (l.dom.getComputedStyle(e, "marginLeft") == "42px") {
                g()
            } else {
                setTimeout(m, 10)
            }
        }
        function g() {
            if (e && e.parentNode) {
                e.parentNode.removeChild(e)
            }
            e = null;
            d(null, true)
        }
        function d(n, o) {
            l.initialize(o);
            if (n && n.type == "load") {
                if (document.removeEventListener) {
                    document.removeEventListener("DOMContentLoaded", d, false)
                }
                if (window.removeEventListener) {
                    window.removeEventListener("load", d, false)
                }
            }
        }
        function j() {
            l.prepareClearReferences();
            if (document.readyState == "interactive") {
                document.attachEvent("onstop", f);
                setTimeout(function() {
                    document.detachEvent("onstop", f)
                }, 0)
            }
        }
        function f() {
            document.detachEvent("onstop", f);
            k()
        }
        function k() {
            l.clearReferences()
        }
        this.attach = function() {
            if (window.addEventListener) {
                window.addEventListener("load", d, false)
            } else {
                window.attachEvent("onload", d)
            }
            if (!l.useDomLoaded || l.ua.forcePageLoad || l.ua.ie && window.top != window) {
                return
            }
            if (l.ua.nativeDomLoaded) {
                document.addEventListener("DOMContentLoaded", i, false)
            } else {
                if (l.ua.ie || l.ua.khtml) {
                    c()
                }
            }
        };
        this.attachUnload = function() {
            if (!l.ua.ie) {
                return
            }
            window.attachEvent("onbeforeunload", j);
            window.attachEvent("onunload", k)
        }
    }
    var Q = "sifrFetch";
    function N(c) {
        var e = false;
        this.fetchMovies = function(f) {
            if (c.setPrefetchCookie && new RegExp(";?" + Q + "=true;?").test(document.cookie)) {
                return
            }
            try {
                e = true;
                d(f)
            } catch (g) {
            }
            if (c.setPrefetchCookie) {
                document.cookie = Q + "=true;path=" + c.cookiePath
            }
        };
        this.clear = function() {
            if (!e) {
                return
            }
            try {
                var f = document.getElementsByTagName("script");
                for (var g = f.length - 1; g >= 0; g--) {
                    var h = f[g];
                    if (h.type == "sifr/prefetch") {
                        h.parentNode.removeChild(h)
                    }
                }
            } catch (j) {
            }
        };
        function d(f) {
            for (var g = 0; g < f.length; g++) {
                document.write('<script defer type="sifr/prefetch" src="' + f[g].src + '"><\/script>')
            }
        }
    }
    function b(e) {
        var g = e.ua.ie;
        var f = g && e.ua.flashVersion < e.ua.parseVersion("9.0.115");
        var d = {};
        var c = {};
        this.fixFlash = f;
        this.register = function(h) {
            if (!g) {
                return
            }
            var i = h.getAttribute("id");
            this.cleanup(i, false);
            c[i] = h;
            delete d[i];
            if (f) {
                window[i] = h
            }
        };
        this.reset = function() {
            if (!g) {
                return false
            }
            for (var j = 0; j < e.replacements.length; j++) {
                var h = e.replacements[j];
                var k = c[h.id];
                if (!d[h.id] && (!k.parentNode || k.parentNode.nodeType == 11)) {
                    h.resetMovie();
                    d[h.id] = true
                }
            }
            return true
        };
        this.cleanup = function(l, h) {
            var i = c[l];
            if (!i) {
                return
            }
            for (var k in i) {
                if (typeof (i[k]) == "function") {
                    i[k] = null
                }
            }
            c[l] = null;
            if (f) {
                window[l] = null
            }
            if (i.parentNode) {
                if (h && i.parentNode.nodeType == 1) {
                    var j = document.createElement("div");
                    j.style.width = i.offsetWidth + "px";
                    j.style.height = i.offsetHeight + "px";
                    i.parentNode.replaceChild(j, i)
                } else {
                    i.parentNode.removeChild(i)
                }
            }
        };
        this.prepareClearReferences = function() {
            if (!f) {
                return
            }
            __flash_unloadHandler = function() {
            };
            __flash_savedUnloadHandler = function() {
            }
        };
        this.clearReferences = function() {
            if (f) {
                var j = document.getElementsByTagName("object");
                for (var h = j.length - 1; h >= 0; h--) {
                    c[j[h].getAttribute("id")] = j[h]
                }
            }
            for (var k in c) {
                if (Object.prototype[k] != c[k]) {
                    this.cleanup(k, true)
                }
            }
        }
    }
    function K(d, g, f, c, e) {
        this.sIFR = d;
        this.id = g;
        this.vars = f;
        this.movie = null;
        this.__forceWidth = c;
        this.__events = e;
        this.__resizing = 0
    }
    K.prototype = {getFlashElement: function() {
            return document.getElementById(this.id)
        },getAlternate: function() {
            return document.getElementById(this.id + "_alternate")
        },getAncestor: function() {
            var c = this.getFlashElement().parentNode;
            return !this.sIFR.dom.hasClass(E.FIX_FOCUS, c) ? c : c.parentNode
        },available: function() {
            var c = this.getFlashElement();
            return c && c.parentNode
        },call: function(c) {
            var d = this.getFlashElement();
            if (!d[c]) {
                return false
            }
            return Function.prototype.apply.call(d[c], d, Array.prototype.slice.call(arguments, 1))
        },attempt: function() {
            if (!this.available()) {
                return false
            }
            try {
                this.call.apply(this, arguments)
            } catch (c) {
                if (this.sIFR.debug) {
                    throw c
                }
                return false
            }
            return true
        },updateVars: function(c, e) {
            for (var d = 0; d < this.vars.length; d++) {
                if (this.vars[d].split("=")[0] == c) {
                    this.vars[d] = c + "=" + e;
                    break
                }
            }
            var f = this.sIFR.util.encodeVars(this.vars);
            this.movie.injectVars(this.getFlashElement(), f);
            this.movie.injectVars(this.movie.html, f)
        },storeSize: function(c, d) {
            this.movie.setSize(c, d);
            this.updateVars(c, d)
        },fireEvent: function(c) {
            if (this.available() && this.__events[c]) {
                this.sIFR.util.delay(0, this.__events[c], this, this)
            }
        },resizeFlashElement: function(c, d, e) {
            if (!this.available()) {
                return
            }
            this.__resizing++;
            var f = this.getFlashElement();
            f.setAttribute("height", c);
            this.getAncestor().style.minHeight = "";
            this.updateVars("renderheight", c);
            this.storeSize("height", c);
            if (d !== null) {
                f.setAttribute("width", d);
                this.movie.setSize("width", d)
            }
            if (this.__events.onReplacement) {
                this.sIFR.util.delay(0, this.__events.onReplacement, this, this);
                delete this.__events.onReplacement
            }
            if (e) {
                this.sIFR.util.delay(0, function() {
                    this.attempt("scaleMovie");
                    this.__resizing--
                }, this)
            } else {
                this.__resizing--
            }
        },blurFlashElement: function() {
            if (this.available()) {
                this.sIFR.dom.blurElement(this.getFlashElement())
            }
        },resetMovie: function() {
            this.sIFR.util.delay(0, this.movie.reset, this.movie, this.getFlashElement(), this.getAlternate())
        },resizeAfterScale: function() {
            if (this.available() && this.__resizing == 0) {
                this.sIFR.util.delay(0, this.resize, this)
            }
        },resize: function() {
            if (!this.available()) {
                return
            }
            this.__resizing++;
            var g = this.getFlashElement();
            var f = g.offsetWidth;
            if (f == 0) {
                return
            }
            var e = g.getAttribute("width");
            var l = g.getAttribute("height");
            var m = this.getAncestor();
            var o = this.sIFR.dom.getHeightFromStyle(m);
            g.style.width = "1px";
            g.style.height = "1px";
            var c = this.getAlternate().childNodes;
            var n = [];
            for (var k = 0; k < c.length; k++) {
                var h = c[k].cloneNode(true);
                n.push(h);
                m.appendChild(h)
            }
            var d = this.sIFR.dom.getWidthFromStyle(m);
            for (var k = 0; k < n.length; k++) {
                m.removeChild(n[k])
            }
            g.style.width = g.style.height = m.style.minHeight = "";
            g.setAttribute("width", this.__forceWidth ? d : e);
            g.setAttribute("height", l);
            if (sIFR.ua.ie) {
                g.style.display = "none";
                var j = g.offsetHeight;
                g.style.display = ""
            }
            if (d != f) {
                if (this.__forceWidth) {
                    this.storeSize("width", d)
                }
                this.attempt("resize", d)
            }
            this.__resizing--
        },replaceText: function(g, j) {
            var d = this.sIFR.util.escape(g);
            if (!this.attempt("replaceText", d)) {
                return false
            }
            this.updateVars("content", d);
            var f = this.getAlternate();
            if (j) {
                while (f.firstChild) {
                    f.removeChild(f.firstChild)
                }
                for (var c = 0; c < j.length; c++) {
                    f.appendChild(j[c])
                }
            } else {
                try {
                    f.innerHTML = g
                } catch (h) {
                }
            }
            return true
        },changeCSS: function(c) {
            c = this.sIFR.util.escape(this.sIFR.util.cssToString(this.sIFR.util.convertCssArg(c)));
            this.updateVars("css", c);
            return this.attempt("changeCSS", c)
        },remove: function() {
            if (this.movie && this.available()) {
                this.movie.remove(this.getFlashElement(), this.id)
            }
        }};
    var X = new function() {
        this.create = function(p, n, j, i, f, e, g, o, l, h, m) {
            var k = p.ua.ie ? d : c;
            return new k(p, n, j, i, f, e, g, o, ["flashvars", l, "wmode", h, "bgcolor", m, "allowScriptAccess", "always", "quality", "best"])
        };
        function c(s, q, l, h, f, e, g, r, n) {
            var m = s.dom.create("object", E.FLASH);
            var p = ["type", "application/x-shockwave-flash", "id", f, "name", f, "data", e, "width", g, "height", r];
            for (var o = 0; o < p.length; o += 2) {
                m.setAttribute(p[o], p[o + 1])
            }
            var j = m;
            if (h) {
                j = W.create("div", E.FIX_FOCUS);
                j.appendChild(m)
            }
            for (var o = 0; o < n.length; o += 2) {
                if (n[o] == "name") {
                    continue
                }
                var k = W.create("param");
                k.setAttribute("name", n[o]);
                k.setAttribute("value", n[o + 1]);
                m.appendChild(k)
            }
            while (l.firstChild) {
                l.removeChild(l.firstChild)
            }
            l.appendChild(j);
            this.html = j.cloneNode(true)
        }
        c.prototype = {reset: function(e, f) {
                e.parentNode.replaceChild(this.html.cloneNode(true), e)
            },remove: function(e, f) {
                e.parentNode.removeChild(e)
            },setSize: function(e, f) {
                this.html.setAttribute(e, f)
            },injectVars: function(e, g) {
                var h = e.getElementsByTagName("param");
                for (var f = 0; f < h.length; f++) {
                    if (h[f].getAttribute("name") == "flashvars") {
                        h[f].setAttribute("value", g);
                        break
                    }
                }
            }};
        function d(p, n, j, h, f, e, g, o, k) {
            this.dom = p.dom;
            this.broken = n;
            this.html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + f + '" width="' + g + '" height="' + o + '" class="' + E.FLASH + '"><param name="movie" value="' + e + '"></param></object>';
            var m = "";
            for (var l = 0; l < k.length; l += 2) {
                m += '<param name="' + k[l] + '" value="' + k[l + 1] + '"></param>'
            }
            this.html = this.html.replace(/(<\/object>)/, m + "$1");
            j.style.minHeight = o + "px";
            j.innerHTML = this.html;
            this.broken.register(j.firstChild)
        }
        d.prototype = {reset: function(f, g) {
                g = g.cloneNode(true);
                var e = f.parentNode;
                e.innerHTML = this.html;
                this.broken.register(e.firstChild);
                e.appendChild(g)
            },remove: function(e, f) {
                this.broken.cleanup(f)
            },setSize: function(e, f) {
                this.html = this.html.replace(e == "height" ? /(height)="\d+"/ : /(width)="\d+"/, '$1="' + f + '"')
            },injectVars: function(e, f) {
                if (e != this.html) {
                    return
                }
                this.html = this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/, "$1" + f)
            }}
    };
    this.errors = new Y(O);
    var A = this.util = new D(O);
    var W = this.dom = new U(O);
    var T = this.ua = new H(O);
    var G = {fragmentIdentifier: new F(O),pageLoad: new S(O),prefetch: new N(O),brokenFlashIE: new b(O)};
    this.__resetBrokenMovies = G.brokenFlashIE.reset;
    var J = {kwargs: [],replaceAll: function(d) {
            for (var c = 0; c < this.kwargs.length; c++) {
                O.replace(this.kwargs[c])
            }
            if (!d) {
                this.kwargs = []
            }
        }};
    this.activate = function() {
        if (!T.supported || !this.isEnabled || this.isActive || !C() || a()) {
            return
        }
        G.prefetch.fetchMovies(arguments);
        this.isActive = true;
        this.setFlashClass();
        G.fragmentIdentifier.cache();
        G.pageLoad.attachUnload();
        if (!this.autoInitialize) {
            return
        }
        G.pageLoad.attach()
    };
    this.setFlashClass = function() {
        if (this.hasFlashClassSet) {
            return
        }
        W.addClass(E.ACTIVE, W.getBody() || document.documentElement);
        this.hasFlashClassSet = true
    };
    this.removeFlashClass = function() {
        if (!this.hasFlashClassSet) {
            return
        }
        W.removeClass(E.ACTIVE, W.getBody());
        W.removeClass(E.ACTIVE, document.documentElement);
        this.hasFlashClassSet = false
    };
    this.initialize = function(c) {
        if (!this.isActive || !this.isEnabled) {
            return
        }
        if (R) {
            if (!c) {
                J.replaceAll(false)
            }
            return
        }
        R = true;
        J.replaceAll(c);
        if (O.repaintOnResize) {
            if (window.addEventListener) {
                window.addEventListener("resize", Z, false)
            } else {
                window.attachEvent("onresize", Z)
            }
        }
        G.prefetch.clear()
    };
    this.replace = function(x, u) {
        if (!T.supported) {
            return
        }
        if (u) {
            x = A.copyProperties(x, u)
        }
        if (!R) {
            return J.kwargs.push(x)
        }
        if (this.onReplacementStart) {
            this.onReplacementStart(x)
        }
        var AM = x.elements || W.querySelectorAll(x.selector);
        if (AM.length == 0) {
            return
        }
        var w = M(x.src);
        var AR = A.convertCssArg(x.css);
        var v = B(x.filters);
        var AN = x.forceSingleLine === true;
        var AS = x.preventWrap === true && !AN;
        var q = AN || (x.fitExactly == null ? this.fitExactly : x.fitExactly) === true;
        var AD = q || (x.forceWidth == null ? this.forceWidth : x.forceWidth) === true;
        var s = x.ratios || [];
        var AE = x.pixelFont === true;
        var r = parseInt(x.tuneHeight) || 0;
        var z = !!x.onRelease || !!x.onRollOver || !!x.onRollOut;
        if (q) {
            A.extractFromCss(AR, ".sIFR-root", "text-align", true)
        }
        var t = A.extractFromCss(AR, ".sIFR-root", "font-size", true) || "0";
        var e = A.extractFromCss(AR, ".sIFR-root", "background-color", true) || "#FFFFFF";
        var o = A.extractFromCss(AR, ".sIFR-root", "kerning", true) || "";
        var AW = A.extractFromCss(AR, ".sIFR-root", "opacity", true) || "100";
        var k = A.extractFromCss(AR, ".sIFR-root", "cursor", true) || "default";
        var AP = parseInt(A.extractFromCss(AR, ".sIFR-root", "leading")) || 0;
        var AJ = x.gridFitType || (A.extractFromCss(AR, ".sIFR-root", "text-align") == "right") ? "subpixel" : "pixel";
        var h = this.forceTextTransform === false ? "none" : A.extractFromCss(AR, ".sIFR-root", "text-transform", true) || "none";
        t = /^\d+(px)?$/.test(t) ? parseInt(t) : 0;
        AW = parseFloat(AW) < 1 ? 100 * parseFloat(AW) : AW;
        var AC = x.modifyCss ? "" : A.cssToString(AR);
        var AG = x.wmode || "";
        if (!AG) {
            if (x.transparent) {
                AG = "transparent"
            } else {
                if (x.opaque) {
                    AG = "opaque"
                }
            }
        }
        if (AG == "transparent") {
            if (!T.transparencySupport) {
                AG = "opaque"
            } else {
                e = "transparent"
            }
        } else {
            if (e == "transparent") {
                e = "#FFFFFF"
            }
        }
        for (var AV = 0; AV < AM.length; AV++) {
            var AF = AM[AV];
            if (W.hasOneOfClassses(E.IGNORE_CLASSES, AF) || W.ancestorHasClass(AF, E.ALTERNATE)) {
                continue
            }
            var AO = W.getDimensions(AF);
            var f = AO.height;
            var c = AO.width;
            var AA = W.getComputedStyle(AF, "display");
            if (!f || !c || !AA || AA == "none") {
                continue
            }
            c = W.getWidthFromStyle(AF);
            var n, AH;
            if (!t) {
                var AL = I(AF);
                n = Math.min(this.MAX_FONT_SIZE, Math.max(this.MIN_FONT_SIZE, AL.fontSize));
                if (AE) {
                    n = Math.max(8, 8 * Math.round(n / 8))
                }
                AH = AL.lines
            } else {
                n = t;
                AH = 1
            }
            var d = W.create("span", E.ALTERNATE);
            var AX = AF.cloneNode(true);
            AF.parentNode.appendChild(AX);
            for (var AU = 0, AT = AX.childNodes.length; AU < AT; AU++) {
                var m = AX.childNodes[AU];
                if (!/^(style|script)$/i.test(m.nodeName)) {
                    d.appendChild(m.cloneNode(true))
                }
            }
            if (x.modifyContent) {
                x.modifyContent(AX, x.selector)
            }
            if (x.modifyCss) {
                AC = x.modifyCss(AR, AX, x.selector)
            }
            var p = P(AX, h, x.uriEncode);
            AX.parentNode.removeChild(AX);
            if (x.modifyContentString) {
                p.text = x.modifyContentString(p.text, x.selector)
            }
            if (p.text == "") {
                continue
            }
            var AK = Math.round(AH * V(n, s) * n) + this.FLASH_PADDING_BOTTOM + r;
            if (AH > 1 && AP) {
                AK += Math.round((AH - 1) * AP)
            }
            var AB = AD ? c : "100%";
            var AI = "sIFR_replacement_" + L++;
            var AQ = ["id=" + AI, "content=" + A.escape(p.text), "width=" + c, "renderheight=" + AK, "link=" + A.escape(p.primaryLink.href || ""), "target=" + A.escape(p.primaryLink.target || ""), "size=" + n, "css=" + A.escape(AC), "cursor=" + k, "tunewidth=" + (x.tuneWidth || 0), "tuneheight=" + r, "offsetleft=" + (x.offsetLeft || ""), "offsettop=" + (x.offsetTop || ""), "fitexactly=" + q, "preventwrap=" + AS, "forcesingleline=" + AN, "antialiastype=" + (x.antiAliasType || ""), "thickness=" + (x.thickness || ""), "sharpness=" + (x.sharpness || ""), "kerning=" + o, "gridfittype=" + AJ, "flashfilters=" + v, "opacity=" + AW, "blendmode=" + (x.blendMode || ""), "selectable=" + (x.selectable == null || AG != "" && !sIFR.ua.macintosh && sIFR.ua.gecko && sIFR.ua.geckoVersion >= sIFR.ua.parseVersion("1.9") ? "true" : x.selectable === true), "fixhover=" + (this.fixHover === true), "events=" + z, "delayrun=" + G.brokenFlashIE.fixFlash, "version=" + this.VERSION];
            var y = A.encodeVars(AQ);
            var g = new K(O, AI, AQ, AD, {onReplacement: x.onReplacement,onRollOver: x.onRollOver,onRollOut: x.onRollOut,onRelease: x.onRelease});
            g.movie = X.create(sIFR, G.brokenFlashIE, AF, T.fixFocus && x.fixFocus, AI, w, AB, AK, y, AG, e);
            this.replacements.push(g);
            this.replacements[AI] = g;
            if (x.selector) {
                if (!this.replacements[x.selector]) {
                    this.replacements[x.selector] = [g]
                } else {
                    this.replacements[x.selector].push(g)
                }
            }
            d.setAttribute("id", AI + "_alternate");
            AF.appendChild(d);
            W.addClass(E.REPLACED, AF)
        }
        G.fragmentIdentifier.restore()
    };
    this.getReplacementByFlashElement = function(d) {
        for (var c = 0; c < O.replacements.length; c++) {
            if (O.replacements[c].id == d.getAttribute("id")) {
                return O.replacements[c]
            }
        }
    };
    this.redraw = function() {
        for (var c = 0; c < O.replacements.length; c++) {
            O.replacements[c].resetMovie()
        }
    };
    this.prepareClearReferences = function() {
        G.brokenFlashIE.prepareClearReferences()
    };
    this.clearReferences = function() {
        G.brokenFlashIE.clearReferences();
        G = null;
        J = null;
        delete O.replacements
    };
    function C() {
        if (O.domains.length == 0) {
            return true
        }
        var d = A.domain();
        for (var c = 0; c < O.domains.length; c++) {
            if (A.domainMatches(d, O.domains[c])) {
                return true
            }
        }
        return false
    }
    function a() {
        if (document.location.protocol == "file:") {
            if (O.debug) {
                O.errors.fire("isFile")
            }
            return true
        }
        return false
    }
    function M(c) {
        if (T.ie && c.charAt(0) == "/") {
            c = window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/, "$1$2$3") + c
        }
        return c
    }
    function V(d, e) {
        for (var c = 0; c < e.length; c += 2) {
            if (d <= e[c]) {
                return e[c + 1]
            }
        }
        return e[e.length - 1] || 1
    }
    function B(g) {
        var e = [];
        for (var d in g) {
            if (g[d] == Object.prototype[d]) {
                continue
            }
            var c = g[d];
            d = [d.replace(/filter/i, "") + "Filter"];
            for (var f in c) {
                if (c[f] == Object.prototype[f]) {
                    continue
                }
                d.push(f + ":" + A.escape(A.toJson(c[f], A.toHexString)))
            }
            e.push(d.join(","))
        }
        return A.escape(e.join(";"))
    }
    function Z(d) {
        var e = Z.viewport;
        var c = W.getViewport();
        if (e && c.width == e.width && c.height == e.height) {
            return
        }
        Z.viewport = c;
        if (O.replacements.length == 0) {
            return
        }
        if (Z.timer) {
            clearTimeout(Z.timer)
        }
        Z.timer = setTimeout(function() {
            delete Z.timer;
            for (var f = 0; f < O.replacements.length; f++) {
                O.replacements[f].resize()
            }
        }, 200)
    }
    function I(f) {
        var g = W.getComputedStyle(f, "fontSize");
        var d = g.indexOf("px") == -1;
        var e = f.innerHTML;
        if (d) {
            f.innerHTML = "X"
        }
        f.style.paddingTop = f.style.paddingBottom = f.style.borderTopWidth = f.style.borderBottomWidth = "0px";
        f.style.lineHeight = "2em";
        f.style.display = "block";
        g = d ? f.offsetHeight / 2 : parseInt(g, 10);
        if (d) {
            f.innerHTML = e
        }
        var c = Math.round(f.offsetHeight / (2 * g));
        f.style.paddingTop = f.style.paddingBottom = f.style.borderTopWidth = f.style.borderBottomWidth = f.style.lineHeight = f.style.display = "";
        if (isNaN(c) || !isFinite(c) || c == 0) {
            c = 1
        }
        return {fontSize: g,lines: c}
    }
    function P(c, g, s) {
        s = s || A.uriEncode;
        var q = [], m = [];
        var k = null;
        var e = c.childNodes;
        var o = false, p = false;
        var j = 0;
        while (j < e.length) {
            var f = e[j];
            if (f.nodeType == 3) {
                var t = A.textTransform(g, A.normalize(f.nodeValue)).replace(/</g, "&lt;");
                if (o && p) {
                    t = t.replace(/^\s+/, "")
                }
                m.push(t);
                o = /\s$/.test(t);
                p = false
            }
            if (f.nodeType == 1 && !/^(style|script)$/i.test(f.nodeName)) {
                var h = [];
                var r = f.nodeName.toLowerCase();
                var n = f.className || "";
                if (/\s+/.test(n)) {
                    if (n.indexOf(E.CLASS) > -1) {
                        n = n.match("(\\s|^)" + E.CLASS + "-([^\\s$]*)(\\s|$)")[2]
                    } else {
                        n = n.match(/^([^\s]+)/)[1]
                    }
                }
                if (n != "") {
                    h.push('class="' + n + '"')
                }
                if (r == "a") {
                    var d = s(f.getAttribute("href") || "");
                    var l = f.getAttribute("target") || "";
                    h.push('href="' + d + '"', 'target="' + l + '"');
                    if (!k) {
                        k = {href: d,target: l}
                    }
                }
                m.push("<" + r + (h.length > 0 ? " " : "") + h.join(" ") + ">");
                p = true;
                if (f.hasChildNodes()) {
                    q.push(j);
                    j = 0;
                    e = f.childNodes;
                    continue
                } else {
                    if (!/^(br|img)$/i.test(f.nodeName)) {
                        m.push("</", f.nodeName.toLowerCase(), ">")
                    }
                }
            }
            if (q.length > 0 && !f.nextSibling) {
                do {
                    j = q.pop();
                    e = f.parentNode.parentNode.childNodes;
                    f = e[j];
                    if (f) {
                        m.push("</", f.nodeName.toLowerCase(), ">")
                    }
                } while (j == e.length - 1 && q.length > 0)
            }
            j++
        }
        return {text: m.join("").replace(/^\s+|\s+$|\s*(<br>)\s*/g, "$1"),primaryLink: k || {}}
    }
};
var parseSelector = (function() {
    var c = /\s*,\s*/;
    var d = /\s*([\s>+~(),]|^|$)\s*/g;
    var f = /([\s>+~,]|[^(]\+|^)([#.:@])/g;
    var m = /(^|\))[^\s>+~]/g;
    var e = /(\)|^)/;
    var g = /[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;
    function k(v, y) {
        y = y || document.documentElement;
        var u = v.split(c), o = [];
        for (var r = 0; r < u.length; r++) {
            var A = [y], p = l(u[r]);
            for (var t = 0; t < p.length; ) {
                var w = p[t++], z = p[t++], q = "";
                if (p[t] == "(") {
                    while (p[t++] != ")" && t < p.length) {
                        q += p[t]
                    }
                    q = q.slice(0, -1)
                }
                A = j(A, w, z, q)
            }
            o = o.concat(A)
        }
        return o
    }
    function l(p) {
        var o = p.replace(d, "$1").replace(f, "$1*$2").replace(m, a);
        return o.match(g) || []
    }
    function a(o) {
        return o.replace(e, "$1 ")
    }
    function j(r, p, o, q) {
        return (k.selectors[p]) ? k.selectors[p](r, o, q) : []
    }
    var n = {toArray: function(p) {
            var q = [];
            for (var o = 0; o < p.length; o++) {
                q.push(p[o])
            }
            return q
        }};
    var b = {isTag: function(o, p) {
            return (p == "*") || (p.toLowerCase() == o.nodeName.toLowerCase())
        },previousSiblingElement: function(o) {
            do {
                o = o.previousSibling
            } while (o && o.nodeType != 1);
            return o
        },nextSiblingElement: function(o) {
            do {
                o = o.nextSibling
            } while (o && o.nodeType != 1);
            return o
        },hasClass: function(p, o) {
            return (o.className || "").match("(^|\\s)" + p + "(\\s|$)")
        },getByTag: function(p, o) {
            return o.getElementsByTagName(p)
        }};
    var h = {"#": function(q, o) {
            for (var p = 0; p < q.length; p++) {
                if (q[p].getAttribute("id") == o) {
                    return [q[p]]
                }
            }
            return []
        }," ": function(q, o) {
            var r = [];
            for (var p = 0; p < q.length; p++) {
                r = r.concat(n.toArray(b.getByTag(o, q[p])))
            }
            return r
        },">": function(u, q) {
            var v = [];
            for (var r = 0, p; r < u.length; r++) {
                p = u[r];
                for (var t = 0, o; t < p.childNodes.length; t++) {
                    o = p.childNodes[t];
                    if (o.nodeType == 1 && b.isTag(o, q)) {
                        v.push(o)
                    }
                }
            }
            return v
        },".": function(r, p) {
            var t = [];
            for (var q = 0, o; q < r.length; q++) {
                o = r[q];
                if (b.hasClass([p], o)) {
                    t.push(o)
                }
            }
            return t
        },":": function(q, o, p) {
            return (k.pseudoClasses[o]) ? k.pseudoClasses[o](q, p) : []
        }};
    k.selectors = h;
    k.pseudoClasses = {};
    k.util = n;
    k.dom = b;
    return k
})();
var IC = COM = {};
IC.HTML = new function() {
    this.getPlainElement = function(a) {
        if (a) {
            if (a.nodeType == 1) {
                return a
            } else {
                if (a.jquery || (a.length && a[0].nodeType == 1)) {
                    return a[0]
                } else {
                    return false
                }
            }
        }
    };
    this.getPlainElements = function(c) {
        var a = [];
        if (c.length) {
            for (var b = 0; b < c.length; b++) {
                plainElement = this.getPlainElement(c[b]);
                if (plainElement) {
                    a.push(plainElement)
                }
            }
        }
        return a
    }
};
IC.CookieJar = new function() {
    var a = {path: "/",domain: window.location.host.indexOf(".") != -1 ? window.location.host.match(/[^\.]*\.[^\.]*$/)[0] : window.location.host,expires: new Date((new Date()).getTime() + (new Date("Jan 1, 1971")).getTime()).toUTCString(),"max-age": new Date("Jan 1, 1971").getTime() / 1000,secure: window.location.protocol.indexOf("https") != -1 ? true : false};
    this.setCookie = function(b, d, e) {
        var e = e || a;
        var c = b + "=" + encodeURIComponent(d);
        for (var f in a) {
            if (a.hasOwnProperty(f)) {
                if (f != "secure") {
                    c += ";" + f + "=" + (e[f] || a[f])
                }
            }
        }
        if (e.secure) {
            c += ";secure"
        }
        document.cookie = c
    };
    this.getCookie = function(b) {
        return document.cookie.indexOf(b + "=") != -1 ? decodeURIComponent(document.cookie.match(new RegExp(b + "=([^;]*)"))[1]) : ""
    };
    this.tossCookie = function(b) {
        document.cookie = b + "=;max-age=0;;"
    }
};
IC.Template = new function() {
    var b = /\{\{([^\}]*)\}\}/g;
    var c = function(e) {
        return e.replace(/^\{\{/, "").replace(/\}\}$/, "")
    };
    var a = function(o, h) {
        h = h || {};
        h.postalCode = h.postalCode || (HN ? HN.getPostalCode : "");
        h.language = h.language || (HN ? HN.getLanguage() : "");
        h.languagePath = h.languagePath || (HN ? HN.getLanguagePath() : "");
        var g, m, n, e;
        var l = o.match(b);
        if (l) {
            for (var k = 0; k < l.length; k++) {
                g = c(l[k]).split(":");
                n = g.shift();
                if (g.length) {
                    for (var f = 0; f < g.length; f++) {
                        m = g[f].split("(")[0];
                        e = g[f].match(/\(\'(.*)\'\)/)[1];
                        if (h[n] && h[n][m]) {
                            h[n] = h[n][m](e)
                        }
                    }
                }
                o = o.replace(l[k], h[n] || "")
            }
        }
        return o
    };
    var d = function(g, h) {
        var l = g.cloneNode(true);
        var k;
        switch (l.tagName.toLowerCase()) {
            case "option":
                k = document.createElement("select");
                break;
            case "li":
                k = document.createElement("ul");
                break;
            default:
                k = document.createElement("div");
                break
        }
        k.appendChild(l);
        if ($.browser.msie) {
            var e = ["name", "value", "id", "class"];
            for (var f = 0; f < e.length; f++) {
                l[e[f]] = a(decodeURIComponent(l[e[f]]), h)
            }
        }
        var j = ($.browser.msie) ? a(decodeURIComponent(k.childNodes[0].innerHTML), h) : a(decodeURIComponent(k.innerHTML), h);
        j = j.replace(/##/g, "");
        j = j.replace(/tpl\-src\=/, "src=");
        if ($.browser.msie) {
            k.childNodes[0].innerHTML = j
        } else {
            k.innerHTML = j
        }
        return k.childNodes[0]
    };
    this.parse = function(e, f) {
        if (typeof e == "string") {
            return a(e, f)
        } else {
            if (typeof e == "object") {
                return d(IC.HTML.getPlainElement(e), f)
            }
        }
    }
};
IC.Validator = new function() {
    var a = {postalCode: {us: {"short": /^([0-9]{5}){0,1}$/,"long": /^([0-9]{5}\-[0-9]{4}){0,1}$/},canada: /^([A-Ya-y]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}){0,1}$/},email: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}){0,1}$/,alpha: /^[a-zA-Z\s]*$/,numeric: /^[0-9]*$/,alphanumeric: /^[a-zA-Z0-9\s]*$/,required: /^.+$/,alwaysFail: /a^/,integerLessThan: function(c, d) {
            var b = "";
            if ((c + "").match(/^-/)) {
                b = "-"
            }
            c = parseInt((c + "").replace(/[^0-9]/g, ""), 10);
            if (b) {
                c = -c
            }
            return (c || 0) < d
        },maxLength: function(c, b) {
            return c.length <= b
        },minLength: function(c, b) {
            return c.length >= b
        },match: function(b, c) {
            return b.toLowerCase() == IC.HTML.getPlainElement(c).value.toLowerCase()
        }};
    this.validate = function(e, d, g) {
        var c = e.split(".");
        var g = g || "";
        var f;
        if (c.length <= 1) {
            f = a[e]
        } else {
            f = a[c[0]];
            for (var b = 1; b < c.length; b++) {
                f = f[c[b]]
            }
        }
        return (typeof f == "function") ? f(d, g) : f.test(d)
    };
    this.validateField = function(e, d, g, b) {
        var d = IC.HTML.getPlainElement(d);
        var g = g || function() {
        };
        var f = [];
        for (var c = 0; c < e.length; c++) {
            if (!IC.Validator.validate(e[c].ruleName, d.value, e[c].param)) {
                g(d, e[c].ruleName, e[c].errorMessage, b);
                f.push(e[c].errorMessage)
            }
        }
        return f
    };
    this.validateForm = function(g, d, f) {
        var d = IC.HTML.getPlainElement(d);
        var b = d.tagName == "FORM" ? d.elements : new Array().concat(d.getElementsByTagName("input")).concat(d.getElementsByTagName("select")).concat(d.getElementsByTagName("textarea"));
        var h = [];
        var f = f || {};
        f.fieldAttribute = f.fieldAttribute || "name";
        f.fieldError = f.fieldError || function() {
        };
        f.complete = f.complete || function() {
        };
        var e;
        for (var c in g) {
            if (g.hasOwnProperty(c)) {
                if (f.fieldAttribute == "id") {
                    e = document.getElementById(c)
                } else {
                    if (f.fieldAttribute == "class") {
                        e = $(d).find("." + c)[0]
                    } else {
                        if (f.fieldAttribute == "name") {
                            e = d[c]
                        }
                    }
                }
                h = h.concat(this.validateField(g[c], e, f.fieldError, c))
            }
        }
        f.complete(h);
        return h.length ? false : true
    }
};
var HN = new function() {
    var a = this;
    var d = d;
    if (typeof CONFIG === "undefined") {
        console.log("WARNING: global CONFIG is undefined, using defaults from HN");
        CONFIG = {}
    }
    CONFIG.servers = CONFIG.servers || {servicesServer: "https://prevapp.hyundaiusa.com",localServicesServer: "/Services"};
    CONFIG.languages = CONFIG.languages || {"kr-KO": "/korean","es-US": "/espanol","en-US": ""};
    CONFIG.googleMapsAPIKey = CONFIG.googleMapsAPIKey || "AIzaSyBkZp2_tjvSyuuLZFpPaCOLASMOv-AnVNQ";
    var g = (function() {
        for (var k in CONFIG.languages) {
            if (CONFIG.languages.hasOwnProperty(k)) {
                if (CONFIG.languages[k] !== "" && CONFIG.languages[k] !== "/") {
                    var h = new RegExp("^" + CONFIG.languages[k]);
                    var j = window.location.pathname.toLowerCase();
                    if (j.match(h)) {
                        return k
                    }
                }
            }
        }
        return "en-US"
    })();
    var f = CONFIG.languages[g];
    var e = IC.CookieJar.getCookie("postal-code");
    this.postalCodeDetected = e ? true : false;
    this.imagePath = "/images";
    this.xmlPath = "/xml";
    this.embedSWF = function(j, o, l, m, h, n) {
        var k = document.getElementById(o);
        if (typeof l == "function") {
            var n = l;
            l = false
        } else {
            if (typeof m == "function") {
                var n = m;
                m = false
            } else {
                if (typeof h == "function") {
                    var n = h;
                    h = false
                } else {
                    var n = n || function() {
                    }
                }
            }
        }
        var l = l || {};
        var m = m || {wmode: "transparent",allowscriptaccess: "always",menu: "false"};
        var h = h || {id: k.id || "",name: k.name || ""};
        swfobject.embedSWF(j, o, k.clientWidth, k.clientHeight, "9.0.115", false, l, m, h, n)
    };
    var c = false;
    var b = {globalPromotions: CONFIG.servers.servicesServer + "/GlobalPromotionService.svc/content/{{language}}/{{postalCode}}/{{modelID}}/{{trimID}}/{{powertrainID}}/json?method=?",specialOffers: CONFIG.servers.servicesServer + "/SpecialOffersService.svc/content/{{language}}/{{postalCode}}/{{modelID}}/{{trimID}}/{{powertrainID}}/json?method=?",quickQuoteDealerLocations:"https://prevapp.hyundaiusa.com/DealerServiceSSL.svc/content/lead/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?",appDealerLocations: "https://prevapp.hyundaiusa.com/DealerServiceSSL.svc/content/app/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?",dealerLocations: "https://prevapp.hyundaiusa.com/DealerServiceSSL.svc/content/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?",vehicles: "{{languagePath}}/js/json_data/vehicles.js",postalCode: "http://origin-www.hyundaiusa.com/Services/GeoIPService.svc/GetGeoIP?method=?",compare: "https://prevapp.hyundaiusa.com/VehicleService.svc/comp/competition/{{year}}/{{make}}/{{modelID}}/{{type}}?method=?",compareSimilar: "https://prevapp.hyundaiusa.com/VehicleService.svc/comp/competition/close/{{trimID}}/trims?method=?",compareFeatures: "/Comparator/vehicle-comparison-features.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}",compareSpecifications: "/Comparator/vehicle-comparison-specs.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}",comparePhotos: "/Comparator/vehicle-photo-comparison.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}",compareInteriorPhotos: "/Comparator/vehicle-photo-comparison-interior.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}",compareExteriorPhotos: "/Comparator/vehicle-photo-comparison-exterior.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}",saveBYO: "http://origin-www.hyundaiusa.com/LeadVehicleService.svc/LeadVehicle/Save/",retrieveBYO: CONFIG.servers.localServicesServer + "/LeadVehicleService.svc/LeadVehicle/ByEmail/{{email}}",equusOnlyDealerLocations: "https://prevapp.hyundaiusa.com/DealerServiceSSL.svc/content/equus/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?",decryptedData: CONFIG.servers.servicesServer + "/LeadVehicleService.svc/content/LeadVehicle/EncryptedLeadInfo/{{EncryptedData}}/json?method=?",savepaymentcalculator: CONFIG.servers.servicesServer + "/LeadvehicleService.svc/savepaymentcalculator/{{VehicleId}}/{{VehicleTrim}}/{{VehiclePowerTrim}}/{{Amount}}/{{Email}}/{{OriginalLeadID}}/json?method=?",decryptedDataWithQueryString: "http://origin-www.hyundaiusa.com/Services/LeadVehicleService.svc/LeadVehicle/EncryptedLeadInfo?query={{EncryptedData}}", inventoryGetSelectedCarInformation: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetSelectedCarInformation?zip={{zip}}&model={{model}}&year={{year}}&trim={{trim}}&extclr={{extclr}}&intclr={{intclr}}&package={{package}}&method=?", inventoryGetDealerInventorySet: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetDealerInventorySet?zip={{zip}}&model={{model}}&year={{year}}&trim={{trim}}&extclr={{extclr}}&intclr={{intclr}}&package={{package}}&method=?", inventoryGetYearList: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetYearList?model={{model}}&method=?", inventoryGetTrimList: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetTrimList?model={{model}}&year={{year}}&method=?", inventoryGetExteriorColorList: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetExteriorColorList?trim={{trim}}&year={{year}}&method=?", inventoryGetInteriorColorList: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetInteriorColorList?trim={{trim}}&year={{year}}&method=?", inventoryGetPackageList: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/GetPackageList?trim={{trim}}&year={{year}}&method=?", inventorySaveRAQ: CONFIG.servers.localServicesServer + "/LeadVehicleService.svc/LeadVehicle/SaveRAQ/",validateZipCode: "https://www.hyundaiusa.com/Services/VehicleMasterService.svc/ValidateZipCode?zip={{zip}}" };
    this.getServiceURL = function(j, h) {
        var k = IC.Template.parse(b[j], h);
        k = k.replace(/\/{2,}/g, "/").replace(/(\:\/)/g, "://");
        return k
    };
    this.mapsAPILoaded = function() {
        return c
    };
    this.loadMapsAPI = function(j) {
        if (c) {
            (j || function() {
            })()
        } else {
            var h;
            $.getScript("https://www.google.com/jsapi?key=" + CONFIG.googleMapsAPIKey, function() {
                if (typeof google !== "undefined") {
                    clearTimeout(h);
                    google.load("maps", "2", {callback: function() {
                            $.getScript("/js/google/extinfowindow.js", function() {
                                c = true;
                                (j || function() {
                                })();
                                j = function() {
                                }
                            })
                        }})
                } else {
                    h = setTimeout(arguments.callee, 250);
                    return false
                }
            })
        }
    };
    this.setPostalCode = function(h) {
        e = h;
        IC.CookieJar.setCookie("postal-code", h)
    };
    this.setLanguage = function(h) {
        g = h
    };
    this.getLanguage = function() {
        return g
    };
    this.getLanguagePath = function() {
        return f
    };
    this.getEnvironment = function() {
        return environment
    };
    this.getPostalCode = function() {
        return e
    };
    this.formatPrice = function(k, l) {
        k = (k + "").split(".")[0].replace(/[^0-9]/g, "");
        l = typeof l !== "undefined" ? l : true;
        var h = "";
        for (var j = k.length - 1; j >= 0; j--) {
            h = k.charAt(j) + h;
            if ((k.length - j) % 3 == 0 && j != 0) {
                h = "," + h
            }
        }
        return (l ? "$" : "") + h
    };
    if (!e) {
        setTimeout(function() {
            a.postalCodeDetected = true
        }, 10000);
        a.postalCodeDetected = true
    }
};
HN.DealerLocator = function(c) {
    c = c || {};
    this.map = c.mapTarget ? new HN.Map({mapTarget: c.mapTarget,infoWindowTemplate: c.infoWindowTemplate,infoWindowID: c.infoWindowID}) : false;
    this.dealers = {};
    this.dealersEquus = {};
    this.dealerElements = [];
    this.postalCode = "";
    this.listProcessed = false;
    var b = "postalCode.us.short";
    var a = (function() {
        switch (c.dealerType || "all") {
            case "quickQuote":
                return "quickQuoteDealerLocations";
            case "app":
                return "appDealerLocations";
            case "equusOnly":
                return "equusOnlyDealerLocations";
            case "all":
            default:
                return "dealerLocations"
        }
    })();
    this.getDealersByPostalCode = function(g, h, e, f) {
        if ($("#chkEquusDealerLocatorPage").val() != undefined && $("#chkEquusDealerLocatorPage").is(":checked")) {
            f = "equusOnlyDealerLocations"
        } else {
            if ($("#chkEquusDealerLocatorPage").val() != undefined && $("#chkEquusDealerLocatorPage").is(":checked") == false) {
                f = "dealerLocations"
            }
        }
        h = h || function() {
        };
        e = e || 32;
        var d = this;
        if (IC.Validator.validate(b, g)) {
            this.postalCode = g;
            if (f != "" && f != undefined) {
                a = f
            }
            $.getJSON(HN.getServiceURL(a, {postalCode: d.postalCode,language: HN.getLanguage(),maxResults: e}), function(j, k) {
                d.dealers[d.postalCode] = j.GetDealerLocationJSONResult || j.GetLeadDealerLocationJSONResult || j.GetEquusDealerLocationJSONResult || j.GetEquusDealerLocationJSONResult || j.GetAppDealerLocationJSONResult;
                h.call(d, d.dealers[d.postalCode])
            })
        }
        return this.dealers[this.postalCode]
    };
    this.linkMarkerAndElement = function(d, f) {
        var e = this;
        if (c.link == "markerToElement") {
            google.maps.Event.addListener(d, "click", function() {
                if (f.dispatchEvent) {
                    var h = document.createEvent("MouseEvents");
                    h.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    f.dispatchEvent(h)
                } else {
                    if (f.fireEvent) {
                        f.fireEvent("onclick")
                    }
                }
            })
        } else {
            if (c.link == "elementToMarker") {
                google.maps.Event.addDomListener(f, "click", function() {
                    google.maps.Event.trigger(d, "click")
                })
            } else {
                if (c.link == "both") {
                    var g = function() {
                        if (this == f && d !== e.map.selectedMarker) {
                            google.maps.Event.trigger(d, "click");
                            e.selectedElement = f
                        } else {
                            if (this == d && this !== e.selectedElement) {
                                if (f.dispatchEvent) {
                                    var h = document.createEvent("MouseEvents");
                                    h.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                    f.dispatchEvent(h)
                                } else {
                                    if (f.fireEvent) {
                                        f.fireEvent("onclick")
                                    }
                                }
                            }
                        }
                    };
                    google.maps.Event.addDomListener(f, "click", g);
                    google.maps.Event.addListener(d, "click", g)
                }
            }
        }
    };
    this.unlinkDealerElements = function() {
        if (this.dealerElements) {
            for (var d = 0; d < this.dealerElements.length; d++) {
                google.maps.Event.clearListeners(this.dealerElements[d], "click")
            }
        }
        this.dealerElements = []
    };
    this.dealersToHTML = function(g, d) {
        var j, f;
        this.listProcessed = false;
        this.unlinkDealerElements();
        if (this.map) {
            this.map.toHTML(this.dealers[this.postalCode])
        }
        if (g) {
            g = IC.HTML.getPlainElement(g);
            if (typeof d == "function") {
                f = d
            } else {
                if (typeof d == "object" && (d.nodeType == 1 || d.jquery)) {
                    f = function(k) {
                        IC.HTML.getPlainElement(d).appendChild(k)
                    }
                } else {
                    f = function() {
                    }
                }
            }
            var h = 0;
            for (var e = 0; e < this.dealers[this.postalCode].length; e++) {
                h = this.dealers[this.postalCode][e].DistanceFromVisitor;
                this.dealers[this.postalCode][e].DistanceFromVisitor = parseInt(h, 10) >= 1 ? parseInt(h, 10) : "&lt; 1";
                this.dealerElements.push(IC.Template.parse(g, this.dealers[this.postalCode][e]));
                if (this.map && c.link) {
                    this.linkMarkerAndElement(this.map.markers[e], this.dealerElements[e])
                }
                f(this.dealerElements[e], this.map.markers[e], e)
            }
        }
        this.listProcessed = true;
        return this.dealerElements
    };
    this.getDirections = function(e, d) {
        this.map.getDirections(e, d)
    }
};
HN.Map = function(g) {
    if (google.maps.BrowserIsCompatible) {
        var f = IC.HTML.getPlainElement(g.mapTarget);
        var h = g.infoWindowTemplate || "{{dealerName}}";
        var d = g.infoWindowID || "";
        var b;
        var k;
        var a = new google.maps.LatLngBounds();
        this.markers = [];
        this.selectedMarker;
        this.startMarker;
        this.route;
        var e = new google.maps.Icon(google.maps.DEFAULT_ICON);
        e.shadow = HN.imagePath + "/map/marker-shadow.png";
        e.iconSize = new google.maps.Size(26, 28);
        e.shadowSize = new google.maps.Size(26, 28);
        e.iconAnchor = new google.maps.Point(10, 21);
        e.infoWindowAnchor = new google.maps.Point(9, 2);
        var j = new google.maps.Icon(e);
        j.image = HN.imagePath + "/map/marker-home.png";
        var l = {};
        l.controls = {largemapcontrol3d: false,smallzoomcontrol3d: false,maptypecontrol: false,scalecontrol: false};
        l.keyboard = true;
        l.maptypes = {hybrid: false,physical: false,normal: true,satellite: true};
        l.zoom = {doubleclick: true,scrollwheel: true};
        var c = function() {
        };
        c.prototype = new google.maps.Control();
        c.prototype.initialize = function() {
            var p = document.createElement("div");
            var o = document.createElement("div");
            var r = document.createElement("a");
            var m = document.createElement("a");
            var q = document.createElement("a");
            var n = document.createElement("a");
            p.className = "zoom_controls";
            o.className = "map_type_controls";
            r.className = "zoom_in";
            m.className = "zoom_out";
            q.className = "map_normal";
            n.className = "map_sat";
            google.maps.Event.addDomListener(r, "click", function() {
                b.zoomIn()
            });
            google.maps.Event.addDomListener(m, "click", function() {
                b.zoomOut()
            });
            google.maps.Event.addDomListener(q, "click", function() {
                b.setMapType(G_NORMAL_MAP)
            });
            google.maps.Event.addDomListener(n, "click", function() {
                b.setMapType(G_SATELLITE_MAP)
            });
            o.appendChild(q);
            o.appendChild(n);
            p.appendChild(r);
            p.appendChild(m);
            b.getContainer().appendChild(o);
            b.getContainer().appendChild(p);
            return p
        };
        c.prototype.getDefaultPosition = function() {
            return new google.maps.ControlPosition(G_ANCHOR_TOP_LEFT, new google.maps.Size(1, 1))
        };
        this.createMarker = function(m, q, o) {
            var p = this;
            var t = new google.maps.Icon(e);
            var r = "";
            if (Math.floor(q / 26) === 0) {
                r = String.fromCharCode("A".charCodeAt(0) + q)
            } else {
                r = String.fromCharCode("A".charCodeAt(0) + Math.floor(q / 26) - 1);
                r = r + String.fromCharCode("A".charCodeAt(0) + q % 26)
            }
            t.image = HN.imagePath + "/map/blue/marker" + r + ".png";
            var n = new google.maps.Marker(m, {icon: t});
            google.maps.Event.addListener(n, "click", function() {
                var u = document.createElement("div");
                u.appendChild(IC.Template.parse(h, o));
                this.openExtInfoWindow(b, d, u.innerHTML, {beakOffset: 10});
                if (this !== p.selectedMarker) {
                    if (p.selectedMarker) {
                        p.selectedMarker.setImage(p.selectedMarker.getIcon().image)
                    }
                    p.selectedMarker = this;
                    p.selectedMarker.setImage(p.selectedMarker.getIcon().image.replace("blue", "orange"))
                }
            });
            return n
        };
        this.clearMap = function() {
            b.closeExtInfoWindow();
            b.clearOverlays();
            a = new google.maps.LatLngBounds();
            this.selectedMarker = false;
            this.markers = []
        };
        this.toHTML = function(q) {
            if (!b) {
                b = new google.maps.Map2(f);
                b.setUI(l);
                if (!k) {
                    k = new google.maps.Directions(b)
                }
            } else {
                this.clearMap()
            }
            var m, n;
            for (var o = 0; o < q.length; o++) {
                m = new google.maps.LatLng(q[o].Latitude, q[o].Longitude);
                n = this.createMarker(m, o, q[o]);
                this.markers.push(n);
                b.setCenter(m, 13);
                b.addOverlay(n);
                a.extend(m)
            }
            var p = b.getBoundsZoomLevel(a);
            b.addControl(new c());
            b.setCenter(a.getCenter(), p > 13 ? 13 : p)
        };
        this.getDirections = function(q, p) {
            var n = this.selectedMarker || this.markers[0];
            var o = n.getLatLng().lat() + ", " + n.getLatLng().lng();
            var p = p || function() {
            };
            var m = this;
            k.clear();
            k.load("from: " + q + " to: " + o, {getSteps: true,getPolyline: true});
            google.maps.Event.clearListeners(k, "error");
            google.maps.Event.clearListeners(k, "addoverlay");
            google.maps.Event.addListener(k, "error", function() {
                p.call(m, false)
            });
            google.maps.Event.addListener(k, "addoverlay", function() {
                var t = k.getMarker(0);
                var r = k.getMarker(1);
                b.removeOverlay(t);
                b.removeOverlay(r);
                if (m.startMarker) {
                    b.removeOverlay(m.startMarker)
                }
                m.startMarker = new google.maps.Marker(t.getLatLng(), {icon: new google.maps.Icon(j)});
                b.addOverlay(m.startMarker);
                m.route = k.getRoute(0);
                p.call(m, true)
            })
        };
        this.directionsToHTML = function(o, n) {
            var n = n || function() {
            };
            var p;
            for (var m = 0; m < this.route.getNumSteps(); m++) {
                p = this.route.getStep(m);
                n(IC.Template.parse(o, {Description: p.getDescriptionHtml(),Distance: p.getDistance().html}))
            }
        };
        this.summaryToHTML = function(n, m) {
            m(IC.Template.parse(n, {Summary: this.route.getSummaryHtml()}))
        };
        this.getGoogleMapInstance = function() {
            return b
        };
        this.getGoogleDirectionsInstance = function() {
            return k
        }
    }
};
HN.Financial = function(b) {
    var a = ["apr", "desiredPayment", "downPayment", "interest", "months", "price", "rate", "rebate", "tradeValue", "tradeOwed", "tradeOffset"];
    this.setValues = function(d) {
        var d = d || {};
        for (var c = 0; c < a.length; c++) {
            this[a[c]] = d[a[c]] ? d[a[c]].replace(/[^0-9\.]/g, "") : 0;
            if (a[c] === "tradeValue" && d[a[c]] && d[a[c]].match(/^-/)) {
                this[a[c]] = -this[a[c]]
            }
        }
        this.interest = parseFloat(this.apr || 0);
        this.tradeOffset = this.tradeValue - this.tradeOwed;
        this.rate = this.apr ? this.interest / (12 * 100) : 0
    };
    this.setValues(b);
    this.calculatePayment = function() {
        var e, c, d;
        e = (this.price - this.rebate - this.tradeOffset) - this.downPayment;
        if (this.interest == 0) {
            c = Math.round(e / this.months)
        } else {
            d = (e * this.rate * Math.pow((1 + this.rate), this.months)) / (Math.pow((1 + this.rate), this.months) - 1);
            c = Math.round((Math.round(d * 100) / 100))
        }
        c = c > 0 ? c : 0;
        return c
    };
    this.calculateBudget = function() {
        var c, d, e;
        if (this.desiredPayment > 0) {
            c = Math.pow(1 + this.rate, this.months);
            if (this.rate != 0) {
                d = this.desiredPayment / (this.rate / (1 - 1 / c))
            } else {
                d = this.desiredPayment * this.months
            }
            e = parseInt(+d + +this.downPayment + +this.tradeOffset)
        }
        e = e > 0 ? e : 0;
        return e
    }
};
HN.VehicleMixIn = function(c, a) {
    var b = this;
    var c = c;
    if (typeof c.BasePrice !== "undefined") {
        c.BasePrice = (c.BasePrice + "").replace(/[^0-9]/g, "")
    }
    if (typeof c.Price !== "undefined") {
        c.Price = (c.Price + "").replace(/[^0-9]/g, "")
    }
    if (c.BasePrice || c.Price) {
        c.NicePrice = HN.formatPrice((c.BasePrice || c.Price), false)
    }
    if (c.DefaultImageLarge === "") {
        c.DefaultImageLarge = "/images/global/blank_vehicle.png"
    }
    if (c.DefaultImageMedium === "") {
        c.DefaultImageMedium = "/images/global/blank_vehicle.png"
    }
    if (c.DefaultImageSmall === "") {
        c.DefaultImageSmall = "/images/global/blank_vehicle.png"
    }
    c.DefaultImage = c.DefaultImageLarge;
    if (c && a !== false) {
        for (var d in c) {
            if (c.hasOwnProperty(d)) {
                (function() {
                    var e = d;
                    b["get" + e] = function() {
                        return c[e]
                    }
                })()
            }
        }
    }
    this._find = function(l, g, k, j, m) {
        var h = [];
        var e;
        for (var f = 0; f < l.length; f++) {
            e = false;
            switch (m) {
                case "<":
                    e = l[f][k] < j ? true : e;
                    break;
                case "<=":
                    e = l[f][k] <= j ? true : e;
                    break;
                case ">":
                    e = l[f][k] > j ? true : e;
                    break;
                case ">=":
                    e = l[f][k] >= j ? true : e;
                    break;
                case "!=":
                    e = l[f][k] != j ? true : e;
                    break;
                case "==":
                default:
                    e = (l[f][k] + "").toLowerCase() == (j + "").toLowerCase() ? true : e;
                    break
            }
            if (e) {
                h.push(new HN[g](l[f]))
            }
        }
        return h
    };
    this.getJSONData = function() {
        return c
    }
};
HN.Powertrain = function(a) {
    HN.VehicleMixIn.call(this, a)
};
HN.Trim = function(a) {
    HN.VehicleMixIn.call(this, a);
    this.find = function(c, b, d) {
        return this._find(a.Powertrains, "Powertrain", c, b, d)
    };
    this.findPowertrainByID = function(b) {
        return this.find("ID", b)[0]
    };
    this.findAllPowertrains = function() {
        return this.find("_" + (new Date()).getTime(), "_", "!=")
    }
};
HN.Model = function(a) {
    a.DefaultImageLarge = a.Trims[0] ? a.Trims[0].DefaultImageLarge : "/images/global/blank_vehicle.png";
    a.DefaultImageSmall = a.Trims[0] ? a.Trims[0].DefaultImageSmall : "/images/global/blank_vehicle.png";
    a.DefaultImageMedium = a.Trims[0] ? a.Trims[0].DefaultImageMedium : "/images/global/blank_vehicle.png";
    a.DeepLink = a.ModelName.toLowerCase().replace(/\s/g, "-");
    HN.VehicleMixIn.call(this, a);
    this.find = function(c, b, d) {
        return this._find(a.Trims, "Trim", c, b, d)
    };
    this.findTrimByID = function(b) {
        return this.find("ID", b)[0]
    };
    this.findTrimsByName = this.findTrimsByTrimName = function(b) {
        return this.find("TrimName", b)
    };
    this.findTrimsByPrice = function(b) {
        return this.find("Price", b)
    };
    this.findTrimsByPriceGreaterThan = function(b) {
        return this.find("Price", b, ">")
    };
    this.findTrimsByPriceLessThan = function(b) {
        return this.find("Price", b, "<")
    };
    this.findAllTrims = function() {
        return this.find("_" + (new Date()).getTime(), "_", "!=")
    }
};
HN.Vehicles = new function() {
    var a = [];
    $.ajax({async: false,dataType: "json",url: HN.getServiceURL("vehicles", {languagePath: HN.getLanguagePath()}),success: function(b) {
            a = b
        }});
    HN.VehicleMixIn.call(this, a, false);
    this.getDeeplinkValue = this.getURLValue = function(b) {
        return (b + "").toLowerCase().replace(/\s/g, "-")
    };
    this.find = function(c, b, d) {
        return this._find(a, "Model", c, b, d)
    };
    this.findModelByID = function(b) {
        return this.find("ID", b)[0]
    };
    this.findModelsByName = this.findModelsByModelName = function(b) {
        return this.find("ModelName", b)
    };
    this.findModelsByDeepLink = function(b) {
        return this.find("DeepLink", b)
    };
    this.findLatestModelByDeepLink = function(e) {
        var d = this.find("DeepLink", e);
        var b = d[0];
        if (d.length > 1) {
            for (var c = 0; c < d.length; c++) {
                if (d[c].getModelYear() > b.getModelYear()) {
                    b = d[c]
                }
            }
        }
        return b
    };
    this.findModelsByPrice = function(b) {
        return this.find("BasePrice", b)
    };
    this.findModelsByPriceLessThan = function(b) {
        return this.find("BasePrice", b, "<")
    };
    this.findModelsByPriceGreaterThan = function(b) {
        return this.find("BasePrice", b, ">")
    };
    this.findModelsByVehicleType = function(b) {
        return this.find("VehicleType", b)
    };
    this.findModelsByYear = this.findModelsByModelYear = function(b) {
        return this.find("ModelYear", b)
    };
    this.findAllModels = function() {
        return this.find("_" + (new Date()).getTime(), "_", "!=")
    };
    this.findLatestModels = function() {
        var f = this.findAllModels();
        var e = [];
        var c;
        for (var d = 0; d < f.length; d++) {
            c = f[d];
            for (var b = 0; b < f.length; b++) {
                if (c.getModelName() == f[b].getModelName() && c !== f[b]) {
                    c = (f[b].getModelYear() > c.getModelYear()) ? f[b] : c;
                    f = Array.prototype.concat(f.slice(0, b), f.slice(b + 1))
                }
            }
            e.push(c)
        }
        return e
    }
};
HN.Vehicles.findAllModels();
HN.Vehicles.DecryptedInfoWithQueryString = function() {
    this.leadInfos = {};
    this.query = function(c, b, d) {
        d = d || function() {
        };
        var a = this;
        if (b.length > 0) {
            $.getJSON(HN.getServiceURL(c, {EncryptedData: b}), function(e, f) {
                a.leadInfos = e.DecryptedLeadInfoJSONByQueryStringResult;
                d.call(a, a.leadInfos)
            });
            return this.leadInfos
        }
    };
    this.getDecryptedDataWithQueryString = function(a, b) {
        this.query("decryptedDataWithQueryString", a, b)
    }
};
HN.Vehicles.DecryptedInfo = function() {
    this.leadInfos = {};
    this.query = function(c, b, d) {
        d = d || function() {
        };
        var a = this;
        if (b.length > 0) {
            $.getJSON(HN.getServiceURL(c, {EncryptedData: b}), function(e, f) {
                a.leadInfos = e.DecryptedLeadInfoJSONResult;
                d.call(a, a.leadInfos)
            });
            return this.leadInfos
        }
    };
    this.getDecryptedData = function(a, b) {
        this.query("decryptedData", a, b)
    }
};
HN.SpecialOffers = function() {
    this.specialOffers = {};
    this.globalPromotions = {};
    this.specialOffersElements = [];
    this.globalPromotionsElements = [];
    this.selectedOffers = [];
    this.postalCode = "";
    var a = "postalCode.us.short";
    this.query = function(d, c, e) {
        e = e || function() {
        };
        var b = this;
        if (IC.Validator.validate(a, c.postalCode)) {
            this.postalCode = c.postalCode;
            $.ajax({url: HN.getServiceURL(d, c),dataType: "json",success: function(f, h) {
                    for (var g in f) {
                        if (f.hasOwnProperty(g)) {
                            f = f[g];
                            break
                        }
                    }
                    b[d][b.postalCode] = f;
                    e.call(b, b[d][b.postalCode])
                }});
            return this[d][b.postalCode]
        }
    };
    this.getOffers = function(b, c) {
        this.query("specialOffers", b, c)
    };
    this.getPromotions = function(b, c) {
        this.query("globalPromotions", b, c)
    };
    this.offersToHTML = function(f, e, b) {
        var g, d;
        this[f + "Elements"] = [];
        if (e) {
            e = IC.HTML.getPlainElement(e);
            if (typeof b == "function") {
                d = b
            } else {
                if (typeof b == "object" && (b.nodeType == 1 || b.jquery)) {
                    d = function(h) {
                        IC.HTML.getPlainElement(b).appendChild(h)
                    }
                } else {
                    d = function() {
                    }
                }
            }
            for (var c = 0; c < this[f][this.postalCode].length; c++) {
                this[f + "Elements"].push(IC.Template.parse(e, this[f][this.postalCode][c]));
                d(this[f + "Elements"][c], c)
            }
        }
        return this[f + "Elements"]
    }
};
HN.Comparator = new function() {
    var c = {};
    var d = function(f, g) {
        c[f] = c[f] || {};
        for (var e = 0; e < g.length; e++) {
            c[f][g[e]] = c[f][g[e]] || {}
        }
    };
    var a = function(g, e, h) {
        c[g] = c[g] || {};
        c[g][e] = c[g][e] || {};
        for (var f = 0; f < h.length; f++) {
            c[g][e][h[f].Id] = h[f]
        }
    };
    var b = function(g, e, k, j) {
        c[g] = c[g] || {};
        c[g][e] = c[g][e] || {};
        c[g][e][k] = c[g][e][k] || {};
        c[g][e][k].Trims = c[g][e][k].Trims || {};
        for (var f = 0; f < j.length; f++) {
            var h = new RegExp("^" + g + "\\s*" + e + "\\s*" + c[g][e][k].Name + "\\s*");
            j[f].Name = j[f].Name.toUpperCase().replace(h, "");
            c[g][e][k].Trims[j[f].Id] = j[f]
        }
    };
    this.find = function(e, f) {
        e = e || {};
        f = f || function() {
        };
        e.type = e.modelID ? "trims" : (e.make ? "models" : "makes");
        $.getJSON(HN.getServiceURL("compare", e), function(h) {
            var g;
            switch (e.type) {
                case "makes":
                    d(e.year, h);
                    g = c[e.year];
                    break;
                case "models":
                    a(e.year, e.make, h);
                    g = c[e.year][e.make];
                    break;
                case "trims":
                    b(e.year, e.make, e.modelID, h);
                    g = c[e.year][e.make][e.modelID];
                    break
            }
            f(g)
        })
    };
    this.getComparison = function(h, f, j) {
        j = j || function() {
        };
        var e = {};
        for (var g = 0; g < f.length; g++) {
            e["trimID" + (g + 1)] = f[g]
        }
        $.ajax({dataType: "html",url: HN.getServiceURL(h, e).replace(/\|$/, ""),success: j})
    };
    this.getFeatureComparison = function(e, f) {
        this.getComparison("compareFeatures", e, f)
    };
    this.getSpecificationComparison = function(e, f) {
        this.getComparison("compareSpecifications", e, f)
    };
    this.getPhotoComparison = function(e, f) {
        this.getComparison("comparePhotos", e, f)
    };
    this.getInteriorPhotoComparison = function(e, f) {
        this.getComparison("compareInteriorPhotos", e, f)
    };
    this.getExteriorPhotoComparison = function(e, f) {
        this.getComparison("compareExteriorPhotos", e, f)
    };
    this.getCompareData = function() {
        return c
    }
};
HN.ExternalInterface = new function() {
    this.isSafari = function() {
        return navigator.vendor && navigator.vendor.indexOf("Apple") != -1
    }
};
HN.ExternalInterface.Nav = new function() {
    this.setHeight = function(a) {
        if ($.browser.msie && $.browser.version == 6 && a > 200) {
            $("select").css("visibility", "hidden")
        } else {
            $("select").css("visibility", "visible")
        }
        $("#flashNavContainer").height(a)
    }
};
HN.ExternalInterface.Viewer360 = new function() {
    this.showMarker = function(a) {
        $("#vehicle360MarkerData a").each(function() {
            if ($(this).attr("href").indexOf(a) > -1) {
                $(this).click();
                return false
            }
        })
    };
    this.showEnlargedInterior360 = function(d, c) {
        Shadowbox.open({content: "/swf/interior/interior360.swf",player: "swf",height: "452",width: "800",options: {flashVars: {enlarged: "true",configXML: "/xml/interior360/config.xml",trimXMLPath: d,currentState: c},flashParams: {wmode: "transparent",allowscriptaccess: "always",menu: "false"}}})
    }
};
HN.ExternalInterface.BYO = new function() {
    this.saveConfig = function(e, f) {
        var d = $("#saveCreationModal input.save_request_quote").attr("defaultChecked");
        var c = {};
        c.saveModal = $("#saveCreationModal");
        c.saveContactInfo = $("#saveContactInfo");
        c.saveRequestQuote = c.saveContactInfo.find(".save_request_quote");
        c.postalCodeInput = c.saveContactInfo.find("input.save_zip");
        var b = $("#saveCreationModal #saveContactInfo a.submit img");
        var a = e.split("<model>");
        byoModelName = HN.Vehicles.findModelByID(a[1].split("</model>")[0]);
        if (c.postalCodeInput.val() != HN.getPostalCode()) {
            c.postalCodeInput.val(HN.getPostalCode())
        }
        if (f) {
            c.saveRequestQuote.find("input.save_request_quote").attr("defaultChecked", true).attr("checked", "checked");
            c.saveRequestQuote.find("input.save_quote_only").val("1");
            c.saveRequestQuote.find("input.save_request_quote").hide();
            c.saveRequestQuote.find("label.standard_label").hide();
            $("#saveCreationModal .save_email_disclaimer").hide();
            $("#saveCreationModal #saveContactInfo p").not($("#saveCreationModal #saveContactInfo .save_request_quote p, #saveCreationModal #saveContactInfo .error_summary p")).hide();
            $("#saveCreationModal h2").attr("class", "").html(saveModalHeaders[1].toUpperCase());
            $("#saveCreationModal #saveContactInfo a.submit").html(saveModalSubmit[1]).append(b);
            $("#saveCreationModal").addClass("request_quote")
        } else {
            $("#saveCreationModal").removeClass("request_quote");
            $("#saveCreationModal .save_email_disclaimer").show();
            c.saveRequestQuote.find("input.save_request_quote").attr("defaultChecked", false).attr("checked", "");
            $("#saveCreationModal #saveContactInfo .save_request_quote input.save_quote_only").val("0");
            $("#saveCreationModal #saveContactInfo .save_request_quote input.save_request_quote").show();
            if (byoModelName.getID().indexOf("sonata-hybrid") < 0) {
                $("#saveCreationModal #saveContactInfo div.save_request_quote").css({display: "block"});
                $("#saveCreationModal #saveContactInfo .save_request_quote label.standard_label").show()
            } else {
                $("#saveCreationModal #saveContactInfo div.save_request_quote").css({display: "none"});
                $("#saveCreationModal #saveContactInfo .save_request_quote label.standard_label").hide()
            }
            $("#saveCreationModal #saveContactInfo p").not($("#saveCreationModal #saveContactInfo .save_request_quote p, #saveCreationModal .save_email_disclaimer")).show();
            $("#saveCreationModal h2").attr("class", "").html(saveModalHeaders[0].toUpperCase());
            $("#saveCreationModal #saveContactInfo a.submit").html(saveModalSubmit[0]).append(b)
        }
        $("#saveCreationModal span.modelName").html(byoModelName.getModelName());
        $("#saveCreationModal #saveContactInfo input.save_xml").val(e);
        $("#saveCreationModal").removeClass("confirmation");
        $.fn.modal({contentID: "saveCreationModal",callback: function() {
                $("#saveContactInfo input.save_first_name").focus().focus();
                HN.loadMapsAPI(function() {
                    window.dealerLocator = window.dealerLocator || new HN.DealerLocator({mapTarget: $("#saveDealerInfo .map_frame .map"),infoWindowID: "HNInfoWindow",infoWindowTemplate: $("#templates .info_window"),link: "both",dealerType: "quickQuote"});
                    if (c.postalCodeInput.val() && f) {
                        c.postalCodeInput.trigger("change")
                    }
                })
            },onClose: function() {
                if (HN.ExternalInterface.isSafari()) {
                    $("#pageFlash").css("visibility", "visible")
                }
            }});
        if (HN.ExternalInterface.isSafari()) {
            $("#pageFlash").css("visibility", "hidden")
        }
    };
    this.setHeight = function(a) {
        if ($(".global_disclaimer").length) {
            $(".global_disclaimer").show()
        }
        var b = ($(".global_disclaimer").length) ? $(".global_disclaimer").outerHeight() : 0;
        $("#mainContent").height(a+12);
        $(".global_disclaimer").css("top", (a - b+19) + "px")
    };
    this.openReceiveModal = function() {
        $("a[name=modal]").click();
        $(".myForm_1").show();
        $(".myForm_2").hide()
    };
    this.printSummary = function(a) {
        window.print()
    }
};
HN.ExternalInterface.HomePage = new function() {
    this.openShadowbox = function(c, e, d, b, a) {
        Shadowbox.open({content: c,player: e,title: d,height: b,width: a})
    }
};
HN.ExternalInterface.DealerLocator = new function() {
    var a = null;
    this.onReady = function() {
        if (a) {
            $("#dealerLocatorFlash").get(0).findDealer(a.zip, a.selectedDealerCode);
            a = null
        }
    };
    this.open = function(d, e) {
        a = {zip: d,selectedDealerCode: e};
        $("#dealerLocatorModal").html("<div id='dealerLocatorFlash' style='width: 800px; height: 550px'>&nbsp;</div>");
        $.fn.modal({contentID: "dealerLocatorModal",callback: c,onClose: function() {
                if (HN.ExternalInterface.isSafari()) {
                    $("#pageFlash").css("visibility", "visible")
                }
            }});
        if (HN.ExternalInterface.isSafari()) {
            $("#pageFlash").css("visibility", "hidden")
        }
    };
    this.dealerSelected = function(d) {
        $("#pageFlash").get(0).dealerSelected(d);
        b()
    };
    this.dealerNotSelected = function() {
        b()
    };
    function b() {
        $(".content_modalClose").click()
    }
    function c() {
        var e = {menu: "false",wmode: HN.ExternalInterface.isSafari() ? "window" : "transparent",allowscriptaccess: "always"};
        var d = {configXML: "/xml/dealerlocator/config.xml"};
        swfobject.embedSWF("/swf/dealerlocator/DealerLocator.swf", "dealerLocatorFlash", "800", "550", "9.0.115", false, d, e)
    }
};
HN.ExternalInterface.EventsMap = new function() {
    this.showEventsByState = function(a) {
        $("#ctl00_ContentPlaceHolderContent_ucSearchResults_hidState").val(a);
        __doPostBack("", "")
    }
};
HN.ExternalInterface.DealerMap = new function() {
    this.showTarget = function(a) {
        if (a) {
            $("#navUtility .dealer_locator").find(".drop_down").slideDown({duration: 700,easing: "easeInExpo"})
        } else {
            $("#navUtility .dealer_locator").find(".drop_down:visible").slideUp({duration: 700,easing: "easeOutExpo"})
        }
    }
};
HN.ExternalInterface.Popup = new function() {
    this.showPopup = function(b, c) {
        if (b) {
            var a = b;
            $("#" + a + " div .btnClose").click(function() {
                $(".content_modalClose").click();
                return false
            });
            $.fn.modal({contentID: a});
            $(window).resize()
        }
    }
};
if (!window.console || !console.firebug) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i) {
        window.console[names[i]] = function() {
        }
    }
}
if (!Array.indexOf) {
    Array.prototype.indexOf = function(b) {
        for (var a = 0; a < this.length; a++) {
            if (this[a] == b) {
                return a
            }
        }
        return -1
    }
}
$(function() {
    $("body").unload(function() {
        GUnload();
        try {
            $("*").add(window).add(document).unbind()
        } catch (a) {
        }
    })
});
$(function() {
    $("#flashNavContainer ul").hide();
    $("#navUtility li.hyundai_global a:first").click(function() {
        var f = $(this);
        var e = f.parent();
        var g = f.parents("#navUtility");
        var d = function() {
            f.addClass("down");
            e.find(".drop_down").slideDown({duration: 700,easing: "easeInExpo"})
        };
        var c = function(h) {
            g.find(".drop_down:visible").slideUp({duration: 700,easing: "easeOutExpo",complete: function() {
                    (h || function() {
                    })();
                    g.find("a.down").not(f).removeClass("down")
                }})
        };
        if (f.hasClass("down")) {
            c(function() {
                f.removeClass("down")
            })
        } else {
            if (g.find(".drop_down:visible").length) {
                c(d)
            } else {
                d()
            }
        }
        return false
    });
    $("#navUtility li.dealer_locator a.close").click(function() {
        HN.ExternalInterface.DealerMap.showTarget(false);
        document.getElementById("flashNavMovie").dealerLocatorClosed();
        return false
    });
    $("#navUtility li.hyundai_global ul li span").click(function() {
        if ($(this).hasClass(".on")) {
            $(this).removeClass("on").next().slideUp()
        } else {
            $(this).addClass("on").next().slideDown()
        }
    });
    var a, b;
    $("#navUtility li.hyundai_global").hover(function() {
        b = "on";
        clearTimeout(a)
    }, function() {
        b = "off";
        a = setTimeout(function() {
            if (b == "off") {
                $("#navUtility li.hyundai_global a.down").click()
            }
        }, 1500)
    })
});
$(function() {
    $("#flashNavContainer ul").hide();
    $("#navUtility li.follow_us a:first").click(function() {
        var f = $(this);
        var e = f.parent();
        var g = f.parents("#navUtility");
        var d = function() {
            f.addClass("down");
            e.find(".drop_down").slideDown({duration: 700,easing: "easeInExpo"})
        };
        var c = function(h) {
            g.find(".drop_down:visible").slideUp({duration: 700,easing: "easeOutExpo",complete: function() {
                    (h || function() {
                    })();
                    g.find("a.down").not(f).removeClass("down")
                }})
        };
        if (f.hasClass("down")) {
            c(function() {
                f.removeClass("down")
            })
        } else {
            if (g.find(".drop_down:visible").length) {
                c(d)
            } else {
                d()
            }
        }
        return false
    });
    var a, b;
    $("#navUtility li.follow_us").hover(function() {
        b = "on";
        clearTimeout(a)
    }, function() {
        b = "off";
        a = setTimeout(function() {
            if (b == "off") {
                $("#navUtility li.follow_us a.down").click()
            }
        }, 1500)
    })
});
$(function() {
    var b = {};
    b.locator = $("#miniDealerLocator");
    b.dealers = b.locator.find(".dealers");
    b.postalCodeInput = b.locator.find("input.postal_code");
    b.locateButton = b.locator.find("a.locate");
    b.results = b.locator.find(".results");
    b.noResults = b.locator.find(".no_results");
    b.seeAllDealerships = b.locator.find(".see_all_dealerships");
    b.equusOnlyCheckbox = $("#chkEquusDealer");
    b.results.click(function(d) {
        if (d.target && d.target.tagName == "A") {
            $("#navUtility li.dealer_locator ul a.close").click()
        }
    });
    var c;
    var a = {postal_code: [{ruleName: "required",errorMessage: "Postal code is required."}, {ruleName: "postalCode.us.short",errorMessage: "Postal code is invalid."}]};
    b.equusOnlyCheckbox.click(function(d) {
        b.locateButton.click()
    });
    b.postalCodeInput.enterKey(function() {
        b.locateButton.click()
    });
    b.locateButton.clickAndEnter(function() {
        var j = $("#chkEquusDealer").is(":checked") ? "Y" : "N";
        var g = $(this).parents(".form");
        var f = b.locator.find(".error_summary");
        var d = f.find("ul").empty();
        b.locator.attr("class", "searching");
        g.find(".invalid_input").removeClass("invalid_input");
        var h = IC.Validator.validateForm(a, g, {fieldAttribute: "class",fieldError: function(m, l, k) {
                $(m).addClass("invalid_input");
                b.locator.attr("class", "no-dealers-found");
                d.append("<li>" + k + "</li>")
            },complete: function(k) {
                f[k.length ? "show" : "hide"]()
            }});
        if (h) {
            if (!HN.mapsAPILoaded()) {
                HN.loadMapsAPI(function() {
                    b.locateButton.click()
                });
                return false
            }
            if (typeof c == "undefined") {
                c = new HN.DealerLocator({mapTarget: $("#miniDealerLocator .map"),infoWindowID: "HNMiniInfoWindow",infoWindowTemplate: $("#templates .info_window"),link: "both",dealerType: "all"})
            }
            var e = function() {
                c.dealersToHTML($("#templates .miniDealerLocator li"), function(q, n, p) {
                    q = $(q);
                    q.appendTo(b.dealers);
                    q.hoverClass();
                    q.click(function() {
                        if (!$(this).hasClass("selected")) {
                            var y = $(this);
                            var v = y.find(".dealer_marker");
                            if (y.siblings("li.selected").length) {
                                var w = y.siblings("li.selected");
                                var z = w.find(".dealer_marker");
                                z.attr("style", z.attr("style").replace("orange", "blue"));
                                w.removeClass("selected")
                            }
                            b.dealers.scrollTo(y, 800);
                            v.attr("style", v.attr("style").replace("blue", "orange"));
                            y.addClass("selected");
                            var u = $(this).find("a.dealer_name").text();
                            s.linkTrackVars = "prop25,products,eVar10,channel";
                            s.linkTrackEvents = "prodView";
                            s.pageName = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav : Select Dealer";
                            s.channel = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav";
                            s.eVar10 = p + 1;
                            s.prop25 = u;
                            s.products = ";" + u;
                            s.events = "prodView";
                            s.t()
                        }
                    });
                    q.find("#EquusLabel").each(function() {
                        if ($(this).text() == "Y") {
                            $(this).css("display", "block");
                            $(this).html("AUTHORIZED <font color='#626262'><i>EQUUS</i></font> DEALER")
                        }
                    });
                    q.find(".dealer_links a.dealer_url").each(function() {
                        if ($(this).attr("href") == "http://" || $(this).attr("href") == "http:///" || $(this).attr('href') == 'http://?cs:e=hma' || $(this).attr('href') == 'http:///?cs:e=hma' || $(this).attr('href') == 'http://&cs:e=hma' || $(this).attr('href') == 'http:///&cs:e=hma') {
                            $(this).hide()
                        }
                    });
                    q.find(".dealer_links a.dealer_Xtimeurl").each(function() {
                        if ($(this).attr("href") == "" || $(this).attr("href") == null || $(this).attr("href") == "http://" || $(this).attr("href") == "http:///" || $(this).attr('href') == 'http://ServiceApptForm/?cs:e=hma' || $(this).attr('href') == 'http:///ServiceApptForm/?cs:e=hma' || $(this).attr('href') == 'ServiceApptForm/?cs:e=hma') {
                            $(this).hide()
                        }
                    });
                    q.find(".dealer_links a.dealer_CobaltDealerUrl").each(function() {
                        if ($(this).attr("href") == "" || $(this).attr("href") == null || $(this).attr("href") == "http://" || $(this).attr("href") == "http:///" || $(this).attr('href') == 'http://&cs:e=hma' || $(this).attr('href') == 'http:///&cs:e=hma') {
                            $(this).hide()
                        }
                    });
                    q.find(".dealer_links a.quote").click(function(u) {
                        u.stopPropagation();
                        var v = $(this).parents(".dealer_info").find("a.dealer_name").text();
                        s.linkTrackVars = "prop25,events,products,eVar10,channel";
                        s.linkTrackEvents = "event1";
                        s.pageName = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav : Request Quote";
                        s.channel = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav";
                        s.eVar10 = p + 1;
                        s.events = "event1";
                        s.prop25 = v;
                        s.products = ";" + v;
                        s.t()
                    });
                    q.find(".dealer_links a.dealer_url").click(function(u) {
                        u.stopPropagation();
                        var v = $(this).parents(".dealer_info").find("a.dealer_name").text();
                        s.linkTrackVars = "prop25,products,eVar10,channel";
                        s.linkTrackEvents = "event9";
                        s.pageName = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav : Website";
                        s.channel = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav";
                        s.eVar10 = p + 1;
                        s.prop25 = v;
                        s.products = ";" + v;
                        s.events = "event9";
                        s.t()
                    });
                    q.find(".dealer_links a.directions").click(function(u) {
                        u.stopPropagation();
                        var v = $(this).parents(".dealer_info").find("a.dealer_name").text();
                        s.linkTrackVars = "events,eVar21,channel";
                        s.linkTrackEvents = "event23";
                        s.pageName = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav : Driving Directions";
                        s.channel = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav";
                        s.eVar21 = v;
                        s.events = "event23";
                        s.t()
                    });
                    var o = c.dealers[c.postalCode][p].DealerCode || "";
                    var m = "#/" + c.postalCode + "/" + (o ? o + "/" : "");
                    var k = q.find("a.dealer_name");
                    var l = q.find("a.directions");
                    k.attr("href", k.attr("href") + m);
                    l.attr("href", l.attr("href") + m);
                    var r = HN.imagePath + "/map/blue/marker" + String.fromCharCode("A".charCodeAt(0) + p) + ".png";
                    var t = ($.browser.msie && $.browser.version == 6) ? {background: "none",filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + r + '", sizingMethod="crop")'} : {background: "transparent url(" + r + ") no-repeat"};
                    q.find(".dealer_marker").css(t)
                })
            };
            c.getDealersByPostalCode(b.postalCodeInput.val(), function() {
                this.dealers[this.postalCode] = this.dealers[this.postalCode].slice(0, 5);
                var m = this.dealers[this.postalCode].length;
                b.locator.find(".dealer_count .count").text(m);
                var l = [];
                if (m) {
                    for (var k = 0; k < m; k++) {
                        l.push(";" + this.dealers[this.postalCode][k].DealerName.replace("'", "'"))
                    }
                } else {
                    l.push(";No dealers found")
                }
                s.linkTrackVars = "prop22,events,products,channel";
                s.linkTrackEvents = "event22,prodView";
                s.pageName = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav : Dealer Results";
                s.channel = HN.getLanguage() + " : hmausa : Dealer Locator : Top Nav";
                s.events = "event22,prodView";
                s.prop22 = this.postalCode;
                s.products = l.join(",");
                s.t();
                b.seeAllDealerships.attr("href", b.seeAllDealerships.attr("href").split("#")[0] + "#/" + this.postalCode + "/");
                b.dealers.empty();
                b.locator.attr("class", m ? "dealers-found" : "no-dealers-found");
                b[m ? "noResults" : "results"].slideUp({duration: 1000,easing: "easeOutExpo",complete: function() {
                        b[m ? "results" : "noResults"].slideDown({duration: 1000,easing: "easeOutExpo",complete: m ? e : function() {
                            }})
                    }})
            }, 5, j == "Y" ? "equusOnlyDealerLocations" : "dealerLocations")
        }
        return false
    })
});
$(function() {
    $("#modalToEnglishSite a.cancel").click(function() {
        $(".content_modalClose").click()
    });
    window.openInterstitial = function(d) {
        $("#modalToEnglishSite a.ok").attr("href", d || "#");
        $.fn.modal({contentID: "modalToEnglishSite"})
    };
    if ($("#page").outerHeight() < $(window).height() && !(typeof upgradeFlashPage != "undefined")) {
        var c = ($.browser.msie && $.browser.version == 6) ? "height" : "min-height";
        $("#bodyContent").css(c, $("#bodyContent").outerHeight() + ($(window).height() - $("#page").outerHeight()) + "px")
    }
    (function() {
        if (HN.postalCodeDetected) {
            $("input.zip_code, input.postal_code").each(function() {
                if (HN.getPostalCode()) {
                    $(this).val(HN.getPostalCode())
                }
            }).bind("change blur", function() {
                if (IC.Validator.validate("postalCode.us.short", $(this).val()) && IC.Validator.validate("required", $(this).val())) {
                    HN.setPostalCode($(this).val());
                    $(this).trigger("change blur")
                }
            })
        } else {
            setTimeout(arguments.callee, 100)
        }
    })();
    if ($("ul#contentNavigation > li.section_on").length > 0) {
        var b = $("ul#contentNavigation > li.section_on").position();
        $("#altContent").append("<div id='contentNavigationArrow'></div>");
        $("#contentNavigationArrow").css({height: $("ul#contentNavigation > li.section_on").outerHeight() + 5 + "px",top: b.top - 4 + "px"}).show()
    }
    if ($("ul.vehicle_trims > li.trimOn").length > 0) {
        var b = $("ul.vehicle_trims > li.trimOn").position();
        $("#dynVehicleContent").append("<div id='contentNavigationArrow'></div>");
        $("#contentNavigationArrow").css({height: $("ul.vehicle_trims > li.trimOn").outerHeight() + 5 + "px",top: b.top - 4 + "px"}).show()
    }
    $("#footerNav > ul li").hoverClass();
    $("#altContent").not(".large_flash_page #altContent").wrap('<div id="altContentBtm"></div>');
    $("a.image_hover").imageHover();
    $(".has_shadow").addShadowBorder();
    $(".general_content").generalContent();
    $(".general_column_layout.two_column").generalColumnLayout();
    $(".multicontent_box").multiContentBox();
    $(".multicontent_box1").multiContentBox1();
    $("#contentNavigation a, .content_sub_navigation a, #footerNav a").externalSiteToolTip();
    $(".button_print a, a.content_print").click(function() {
        window.print();
        return false
    });
    $("#modalEmail.form input").enterKey(function() {
        $("#modalEmail.form a.submit").click()
    });
    $("#modalEmail.form a.submit").click(function() {
        var g = $(this).parents(".form");
        var f = g.find(".error_summary").hide();
        var d = f.find("ul").empty();
        g.find(".invalid_input").removeClass("invalid_input");
        var e = {recipient_email: [{ruleName: "required",errorMessage: "Email address is required"}, {ruleName: "email",errorMessage: "Email address is invalid."}]};
        var h = IC.Validator.validateForm(e, $("#modalEmail"), {fieldAttribute: "class",fieldError: function(l, k, j) {
                $(l).addClass("invalid_input");
                d.append("<li>" + j + "</li>")
            },complete: function(j) {
                if (j.length) {
                    f.fadeIn(2000)
                }
            }})
    });
    $(".content_email, .button_email").click(function() {
        $.fn.modal({contentID: "modalEmail"})
    });
    $("a.read_more").readMore();
    $("a.content_link_chevron").prepend('<img src="/images/buttons/research_chevron.gif" width="7" height="8" />');
    $(".special_offers a").append('<img src="/images/icons/special_offers_arrow.png" width="5" height="5"  />');
    $(".carousel_container .carousel").carousel({loop: false,slideTransition: true,totalContainer: ".content_sub_navigation .carousel_status",nextPrevContainer: ".content_sub_navigation .pagination"});
    $(".sitemap_row li a").each(function() {
        if ($(this).width() >= 157) {
            $(this).parent().css("width", "154px")
        }
    });
    $("textarea, input[type='text']").focus(function() {
        $(this).addClass("input_focus")
    }).blur(function() {
        $(this).removeClass("input_focus")
    });
    $("#bodyContent .faq-section .answer").hide();
    $("#bodyContent .faq-section .question a").click(function() {
        var d = $(this).closest("li");
        if (d.attr("class") == "selected") {
            d.find(".answer").slideUp("slow", function() {
                d.removeClass("selected")
            })
        } else {
            d.addClass("selected").find(".answer").slideDown("slow")
        }
        return false
    });
    $("#bodyContent .faq-section .content_button").click(function() {
        $(this).parent().find("li").each(function() {
            if ($(this).attr("class") != "selected") {
                $(this).addClass("selected").find(".answer").slideDown("slow")
            }
        });
        return false
    });
    $("#bodyContent .faq-section li .close").hoverClass().click(function() {
        $(this).siblings(".question").find("a").click()
    });
    $(".newsletter_option label").hoverClass();
    $("input.value_hold").valueHold();
    $(".financial_tools .banner_heading").siblings("h2:first").css("margin-top", "0");
    var a = $("#promoControls .promocontrol_location");
    a.enterKey(function() {
        $(this).parent().next("div").find(".content_button").click()
    })
});
var hyundaiForms = {};
hyundaiForms.addCommas = function(b) {
    b += "";
    x = b.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var a = /(\d+)(\d{3})/;
    while (a.test(x1)) {
        x1 = x1.replace(a, "$1,$2")
    }
    return x1 + x2
};
