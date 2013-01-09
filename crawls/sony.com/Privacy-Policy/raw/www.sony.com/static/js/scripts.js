//jQuery elipsis plugin http://stackoverflow.com/questions/536814/insert-ellipsis-into-html-tag-if-content-too-wide
(function(e) {
    e.fn.ellipsis = function() {
        return this.each(function() {
            var a = e(this);
            if (a.css("overflow") == "hidden") {
                var c = a.html(),
                    d = a.hasClass("multiline"),
                    b = e(this.cloneNode(true)).hide().css("position", "absolute").css("overflow", "visible").width(d ? a.width() : "auto").height(d ? "auto" : a.height());
                a.after(b);
                for (d = d ?
                function() {
                    return b.height() > a.height()
                } : function() {
                    return b.width() > a.width()
                }; c.length > 0 && d();) {
                    c = c.substr(0, c.length - 1);
                    b.html(c + "[...]")
                }
                a.html(b.html());
                b.remove()
            }
        })
    }
})(jQuery);

//jQuery Cookie plugin https://github.com/carhartl/jquery-cookie#readme
jQuery.cookie = function(d, e, b) {
    if (arguments.length > 1 && String(e) !== "[object Object]") {
        b = jQuery.extend({}, b);
        if (e === null || e === undefined) {
            b.expires = -1
        }
        if (typeof b.expires === "number") {
            var g = b.expires,
                c = b.expires = new Date();
            c.setDate(c.getDate() + g)
        }
        e = String(e);
        return (document.cookie = [encodeURIComponent(d), "=", b.raw ? e : encodeURIComponent(e), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join(""))
    }
    b = e || {};
    var a, f = b.raw ?
    function(h) {
        return h
    } : decodeURIComponent;
    return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(document.cookie)) ? f(a[1]) : null
};

//jquery support for CSS3 transitions https://github.com/louisremi/jquery.transition.js
(function(a) {
    function t() {
        setTimeout(v, 0);
        return n = a.now()
    }
    function v() {
        n = void 0
    }
    var s = {},
        j, r, w = /^(?:toggle|show|hide)$/,
        x = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        o, n, q = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame,
        u = document.createElement("div").style;
    a.support.transition = "MozTransition" in u ? "MozTransition" : "WebkitTransition" in u ? "WebkitTransition" : !1;
    a.fn.extend({
        animate: function(c, b, k, f) {
            var d = a.speed(b, k, f);
            if (a.isEmptyObject(c)) return this.each(d.complete, [!1]);
            c = a.extend({}, c);
            return this[d.queue === !1 ? "each" : "queue"](function() {
                var l;
                d.queue === !1 && a._mark(this);
                var b = a.extend({}, d),
                    i = this.nodeType === 1,
                    f = i && a(this).is(":hidden"),
                    g, e, m, k, h;
                k = a.cssProps;
                var n = !b.step && a.support.transition,
                    o = [],
                    p, q;
                b.animatedProperties = {};
                b.transition = {};
                for (m in c) {
                    g = a.camelCase(m);
                    m !== g && (c[g] = c[m], delete c[m]);
                    e = c[g];
                    a.isArray(e) ? (h = b.animatedProperties[g] = e[1], l = c[g] = e[0], e = l) : h = b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h = n && i && (h == "swing" ? "ease" : h == "linear" ? h : !1)) p = k[m] || m, q = p.replace(/([A-Z])/g, "-$1").toLowerCase(), h = q + " " + b.duration + "ms " + h, b.transition[m] = {
                        lower: q,
                        real: p
                    }, o.push(h);
                    if (e === "hide" && f || e === "show" && !f) return b.complete.call(this);
                    if (i && (g === "height" || g === "width")) if (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], a.css(this, "display") === "inline" && a.css(this, "float") === "none") if (a.support.inlineBlockNeedsLayout) {
                        e = this.nodeName;
                        if (!s[e]) {
                            g = document.body;
                            h = a("<" + e + ">").appendTo(g);
                            p = h.css("display");
                            h.remove();
                            if (p === "none" || p === "") {
                                if (!j) j = document.createElement("iframe"), j.frameBorder = j.width = j.height = 0;
                                g.appendChild(j);
                                if (!r || !j.createElement) r = (j.contentWindow || j.contentDocument).document, r.write((document.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), r.close();
                                h = r.createElement(e);
                                r.body.appendChild(h);
                                p = a.css(h, "display");
                                g.removeChild(j)
                            }
                            s[e] = p
                        }
                        e = s[e];
                        e === "inline" ? this.style.display = "inline-block" : (this.style.display = "inline", this.style.zoom = 1)
                    } else this.style.display = "inline-block"
                }
                if (b.overflow != null) this.style.overflow = "hidden";
                for (m in c) if (i = new a.fx(this, b, m), e = c[m], w.test(e)) i[e === "toggle" ? f ? "show" : "hide" : e]();
                else k = x.exec(e), g = i.cur(), k ? (e = parseFloat(k[2]), h = k[3] || (a.cssNumber[m] ? "" : "px"), h !== "px" && (a.style(this, m, (e || 1) + h), g *= (e || 1) / i.cur(), a.style(this, m, g + h)), k[1] && (e = (k[1] === "-=" ? -1 : 1) * e + g), i.custom(g, e, h)) : i.custom(g, e, "");
                n && o.length && (h = this.style[n], this.style[n] = o.join() + (h ? "," + h : ""));
                return !0
            })
        },
        stop: function(c, b) {
            c && this.queue([]);
            this.each(function() {
                var c = a.timers,
                    f = c.length,
                    d = a.support.transition;
                for (b || a._unmark(!0, this); f--;) if (c[f].elem === this) {
                    if (b || d) c[f](b);
                    c.splice(f, 1)
                }
            });
            b || this.dequeue();
            return this
        }
    });
    a.extend(a.fx.prototype, {
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var c, b = a.css(this.elem, this.prop);
            return isNaN(c = parseFloat(b)) ? !b || b === "auto" ? 0 : b : c
        },
        custom: function(c, b, k) {
            function f(a) {
                return d.step(a)
            }
            var d = this,
                j = a.fx,
                i, l = d.options.transition,
                g = a.timers,
                e = this.prop;
            this.startTime = n || t();
            this.start = c;
            this.end = b;
            this.unit = k || this.unit || (a.cssNumber[e] ? "" : "px");
            this.now = this.start;
            this.pos = this.state = 0;
            f.elem = this.elem;
            f.transition = l[e];
            l[e] ? (g.push(f), d.elem.style[l[e].real] = a.css(d.elem, e), setTimeout(function() {
                a.style(d.elem, e, b + d.unit);
                l[e].timeout = setTimeout(function() {
                    g.splice(g.indexOf(f), 1);
                    d.step(!0)
                }, d.options.duration + 30)
            }, 0)) : f() && a.timers.push(f) && !o && (q ? (o = 1, i = function() {
                o && (q(i), j.tick())
            }, q(i)) : o = setInterval(j.tick, j.interval))
        },
        step: function(c) {
            var b = n || t(),
                k = !0,
                f = this.elem,
                d = this.options,
                j, i, l = d.transition[this.prop];
            if (l || c || b >= d.duration + this.startTime) {
                l ? (clearTimeout(l.timeout), c || (this.elem.style[l.real] = a.css(this.elem, l.real))) : (this.now = this.end, this.pos = this.state = 1, this.update());
                d.animatedProperties[this.prop] = !0;
                for (j in d.animatedProperties) d.animatedProperties[j] !== !0 && (k = !1);
                if (k) {
                    d.overflow != null && !a.support.shrinkWrapBlocks && a.each(["", "X", "Y"], function(a, b) {
                        f.style["overflow" + b] = d.overflow[a]
                    });
                    d.hide && a(f).hide();
                    if (d.hide || d.show) for (i in d.animatedProperties) a.style(f, i, d.orig[i]);
                    if (c = f.nodeType === 1 && a.support.transition) {
                        l = "," + f.style[c];
                        for (i in d.transition) l = l.split(d.transition[i].lower).join("_");
                        f.style[c] = l.replace(/, ?_[^,]*/g, "").substr(1)
                    }
                    d.complete.call(f)
                }
                return !1
            } else d.duration == Infinity ? this.now = b : (i = b - this.startTime, this.state = i / d.duration, this.pos = a.easing[d.animatedProperties[this.prop]](this.state, i, 0, 1, d.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    });
    a.extend(a.fx, {
        tick: function() {
            for (var c = a.timers, b = 0; b < c.length; ++b)!c[b].transition && !c[b]() && c.splice(b--, 1);
            c.length || a.fx.stop()
        }
    })
})(jQuery);

//jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

//alerts
var alerts = (function() {
    var d, b, a;
    return {
        init: function() {
            d = $("#alert");
            b = d.find(".close-btn").children("a");
            a = d.find(".content").attr("id");
            c()
        }
    };

    function c() {
        if ($.cookie(a) != "hide") {
            d.children(".content").removeClass("visually-hidden");
            d.data("origText", d.find(".description").html());
            d.find(".description").ellipsis();
            b.click(function() {
                d.children(".content").animate({
                    opacity: 0
                }, 200, function() {
                    d.children(".content").slideUp("normal", function() {
                        d.removeClass("loaded")
                    })
                });
                $.cookie(a, "hide");
                return false
            });
            d.attr("data-size", controler.size);
            $.cookie(a, "show");
            $(window).resize(function() {
                if (d.attr("data-size") != controler.size) {
                    d.find(".description").html(d.data("origText"));
                    if (controler.size != "s") {
                        d.find(".description").ellipsis()
                    }
                    d.attr("data-size", controler.size)
                }
            })
        }
    }
})();

//nav
var nav = (function() {
    var e, k, s, b, o, p, q, g, i, m, c, n = 0,
        l;
    return {
        init: function(t) {
            k = $("nav");
            e = $("#menu-btn a");
            nav.btn = e;
            e.click(function() {
                var u = $(this);
                search.close();
                if (u.parent().hasClass("closed")) {
                    nav.animateMenu("show")
                } else {
                    nav.animateMenu("hide")
                }
                return false
            });
            h()
        },
        animateMenu: function(t) {
            if (t == "show") {
                e.parent().removeClass("closed").addClass("open");
                s.css({
                    left: 0
                })
            } else {
                if (t == "hide") {
                    e.parent().removeClass("open").addClass("closed");
                    s.css({
                        left: 980
                    });
                    n = 0
                }
            }
        }
    };

    function h() {
        k.find(".sub").each(function() {
            $(this).children("ul").prepend('<li class="title"><a href="#"><span>' + $(this).children("a").children("span").text() + "</span></a></li>")
        });
        s = k.children(".content"), b = s.children("ul");
        o = b.children("li");
        p = b.find("li");
        q = o.find("a");
        g = o.children("li");
        i = o.find("ul");
        $dropdownListItems = o.find("li");
        c = i.find("a");
        l = b.height();
        b.addClass("current");
        p.hover(function() {
            if (controler.size != "s") {
                $(this).addClass("hover")
            }
        }, function() {
            if (controler.size != "s") {
                $(this).removeClass("hover")
            }
        });
        q.click(function() {
            var u = $(this),
                t = u.parent();
            if (t.hasClass("sub")) {
                if (controler.size == "s") {
                    d("forward");
                    t.addClass("current")
                } else {
                    if (t.hasClass("top") && u.hasClass("clicked")) {
                        f()
                    } else {
                        a(u)
                    }
                }
                return false
            } else {
                if (t.hasClass("title") == true) {
                    u.html("title");
                    d("back");
                    t.parent().parent().addClass("previous");
                    return false
                }
            }
        });
        $(window).resize(function() {
            r()
        });
        if (controler.size == "s") {
            r()
        }
    }
    function r() {
        if (controler.size == "s") {
            var t;
            if (controler.windowWidth > 480) {
                t = 480
            } else {
                t = controler.windowWidth
            }
            b.width(t);
            i.width(t).css("left", t);
            if (e.parent().hasClass("open")) {
                s.css("left", -(n * t))
            }
            s.addClass("mobile")
        } else {
            if (s.hasClass("mobile")) {
                e.parent().removeClass("open").addClass("closed");
                s.find(".current").removeClass("current");
                s.attr("style", "").removeAttr("style");
                b.attr("style", "").removeAttr("style");
                i.attr("style", "").removeAttr("style")
            }
        }
    }
    function d(v) {
        var t, u = s.css("left");
        u = parseInt(u.replace("px", ""));
        if (controler.windowWidth > 480) {
            t = 480
        } else {
            t = controler.windowWidth
        }
        if (v == "forward") {
            n++;
            s.stop().animate({
                left: u - t
            }, 300, function() {})
        } else {
            if (v == "back") {
                n--;
                s.stop().animate({
                    left: u + t
                }, 300, function() {
                    s.find(".previous").removeClass("previous").removeClass("current")
                })
            }
        }
    }
    function a(v) {
        var t = $(v),
            w = t.parent(),
            u = w.siblings(),
            x;
        if (t.hasClass("clicked")) {
            w.removeClass("hover");
            t.removeClass("clicked");
            x = w.find(".hover");
            $clickedChildren = w.find(".clicked");
            x.removeClass("hover");
            $clickedChildren.removeClass("clicked")
        } else {
            w.addClass("hover");
            t.addClass("clicked");
            u.each(function() {
                var y = $(this);
                if (y.children("a").hasClass("clicked")) {
                    x = y.find(".hover");
                    $clickedChildren = y.find(".clicked");
                    y.removeClass("hover");
                    x.removeClass("hover");
                    $clickedChildren.removeClass("clicked")
                }
            })
        }
    }
    function f() {
        var t = b.find(".hover"),
            u = b.find(".clicked");
        t.removeClass("hover");
        u.removeClass("clicked");
        g.css("left", -9999)
    }
    function j(z) {
        var t = $(z),
            x = b.children(".hover"),
            y = b.children("li:not(.hover)").children("ul"),
            v = x.children("ul"),
            A = t.offset().left + 235,
            u = $(window).width(),
            w = parseInt(v.css("left").replace("px", ""));
        y.css("left", -9999)
    }
})();

//Search
var search = (function() {
    var d, a, c;
    return {
        init: function() {
            d = $("#search-input");
            a = $("#search");
            c = $("#search-button");
            search.btn = c;
            b()
        },
        open: function() {
            c.removeClass("closed").addClass("open");
            a.addClass("show")
        },
        close: function() {
            c.removeClass("open").addClass("closed");
            a.removeClass("show")
        }
    };

    function b() {
        d.addClass("empty").attr("value", "Search");
        c.children("a").click(function() {
            var f = $(this),
                e = f.parent();
            nav.animateMenu("hide");
            if (c.hasClass("closed")) {
                search.open()
            } else {
                search.close()
            }
            return false
        });
        d.focus(function() {
            if (d.attr("value") == "Search") {
                d.removeClass("empty").attr("value", "")
            }
        });
        d.blur(function() {
            if (d.attr("value") == "") {
                d.addClass("empty").attr("value", "Search")
            }
        })
    }
})();

function sanitize(a) {
    var d = "";
    var c = "";
    for (var b = 0; b < a.length; b++) {
        d = a.charCodeAt(b);
        if (d == 32) {
            c += a[b]
        } else {
            if ((d > 47 && d < 58) || (d > 62 && d < 127)) {
                c += a[b]
            } else {
                c += "&#" + d + ";"
            }
        }
    }
    return c
}
bSearchEntered = false;

function isEmpty(a) {
    if (a == null || a.value.length == 0) {
        return true
    }
}
function errorFormSubmit() {
    sStr = document.forms.error_search_form.error_search_box.value;
    formSubmit(true, sStr, document.forms.error_search_form)
}
function formSubmit(c, e, d) {
    var b = document.forms.formSony.action;
    if (arguments.length == 1) {
        var a = document.forms.formSony.st;
        if (!bSearchEntered || (c && isEmpty(a))) {
            alert("Please enter a search term and then click the GO button.");
            return
        }
        if (!isEmpty(a)) {
            b.value = "search"
        }
        document.forms.formSony.st = document.forms.formSony.st;
        document.forms.formSony.submit()
    } else {
        if (arguments.length == 2) {
            d = document.forms.formSony;
            if (e.length == 0) {
                alert("Please enter a search term and then click the GO button.");
                return
            }
            d.st.value = e;
            d.submit()
        } else {
            d.st.value = e;
            d.submit()
        }
    }
}
function validForm(a) {
    if (a.st.value == "" || a.st.value == "Search" || a.st.value == "search") {
        return false
    }
    return true
}

//Tabs
var tabs = (function() {
    var c, b, h, f, a, i, g;
    return {
        init: function() {
            c = $("#tabs");
            j()
        }
    };

    function j() {
        b = $("#tab-nav");
        h = b.children(".current");
        f = b.children("li");
        b.addClass("length-" + f.length);
        c.children(".content").prepend('<div id="tab-dropdown"><p>Select category</p><div class="select"><select id="tab-select"></select></div></div>');
        g = c.children(".content").children("#tab-dropdown").find("select");
        a = c.children(".content").children("#tab-content");
        f.each(function() {
            var k = $(this).find("a");
            g.append('<option value="' + k.attr("href") + '">' + k.find(".icon").text() + "</option>");
            k.click(function() {
                if (controler.size == "s") {} else {
                    d($(this).parent().parent().parent())
                }
                return false
            })
        });
        g.change(function() {
            var k = $(this).children("option:selected").attr("value");
            f.each(function() {
                if ($(this).find("a").attr("href") == k) {
                    d($(this));
                    return false
                }
            })
        });
        e()
    }
    function e() {
        i = a.children(".content");
        i.each(function() {
            var q = $(this),
                p = q.find(".featured"),
                k, m = p.find(".img"),
                o = m.children("a").attr("href"),
                n;
            if (m.length > 0) {
                if (o.indexOf("youtu.be") >= 0) {
                    m.children("a").append('<span class="play-icon"></span>');
                    m.after('<div class="video"></div>');
                    k = p.find(".video");
                    n = o.replace("http://youtu.be/", "");
                    m.children("a").click(function() {
                        if (controler.size != "s") {
                            m.hide();
                            k.show().html('<iframe  width="390" height="228" src="http://www.youtube.com/embed/' + n + '?&autoplay=1&autohide=1&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>');
                            return false
                        }
                    })
                }
            }
            var r = p.find(".twitter");
            if (r.length > 0) {
                r.append('<div class="twitter-tooltip"></div>');
                var l = p.find(".twitter-tooltip");
                r.children("a").hover(function() {
                    l.show()
                }, function() {
                    l.hide()
                })
            }
        });
        gapi.plusone.go();
        d(f[h.index()])
    }
    function d(k) {
        var m = $(k),
            l = m.find("a").attr("href")
            if(l){l.replace("#", "");}
        i.each(function() {
            var n = $(this);
            if (n.attr("id") == l) {
                n.removeClass("visually-hidden")
            } else {
                n.addClass("visually-hidden");
                n.find(".video").children().remove();
                n.find(".img").show()
            }
        });
        b.children(".current").removeClass("current");
        m.addClass("current");
        g.children("option").each(function() {
            if ($(this).attr("value") == l) {
                $(this).attr("selected", true)
            }
        })
    }
})();

//promos
var promos = (function() {
    var i, g, j, h = false;
    return {
        init: function() {
            i = $("#promos");
            l()
        }
    };

    function l() {
        g = i.find(".promo-item");
        j = i.find("img");
        g.each(function() {
            var a = $(this),
                c = a.find(".description"),
                b = c.children("p");
            b.hide();
            a.children("a").hover(function() {
                b.slideDown(150, "easeOutCubic", function() {})
            }, function() {
                b.slideUp(250, "easeOutCubic", function() {})
            })
        });
        $(window).resize(function() {
            k()
        });
        k()
    }
    function k() {
        var a;
        if (controler.size == "s") {
            if (controler.windowWidth > 480) {
                a = (480 - 60) / 2
            } else {
                a = (controler.windowWidth - 60) / 2
            }
            g.addClass("adjusted").width(a);
            j.addClass("adjusted").css("margin-left", -((220 - a) / 2))
        } else {
            if (controler.size == "m") {
                g.addClass("adjusted").width(170);
                j.addClass("adjusted").css("margin-left", -25)
            } else {
                if (controler.size == "l") {
                    g.addClass("adjusted").width(220);
                    j.addClass("adjusted").css("margin-left", "auto")
                }
            }
        }
    }
})();

//footer
var footer = (function() {
    var f, g, e;
    return {
        init: function() {
            f = $("#footer");
            h()
        }
    };

    function h() {
        e = f.find(".corporate-info");
        g = f.find(".corp-btn").find("a");
        e.hover(function() {
            if (e.hasClass("clicked") == false) {
                e.addClass("hover")
            }
        }, function() {
            if (e.hasClass("clicked") == false) {
                e.removeClass("hover")
            }
        });
        g.click(function() {
            if (e.hasClass("clicked")) {
                e.removeClass("clicked").removeClass("hover")
            } else {
                e.addClass("clicked")
            }
            return false
        })
    }
})();

//iphone screen fix
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
    if (viewportmeta) {
        viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        document.body.addEventListener("gesturestart", function() {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"
        }, false)
    }
}
/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function() {
    window.scrollTo(0, 1)
}, 1000);

//Controler
$(document).ready(function() {
    controler.init()
});
var controler = (function() {
    var d, a, b = false;
    return {
        ie6: false,
        size: "s",
        windowWidth: $(window).width(),
        init: function() {
            d = $("body");
            $search = $("#search").find("#search-input");
            if ($("html").hasClass("ie6")) {
                controler.ie6 = true
            }
            $(window).resize(function() {
                c()
            });
            c();
            search.init();
            alerts.init();
            nav.init();
            tabs.init();
            promos.init();
            footer.init()
        }
    };

    function c() {
        controler.windowWidth = $(window).width();
        if (b == false) {
            if (controler.windowWidth < 740) {
                controler.size = "s";
                d.addClass("s").removeClass("m").removeClass("l")
            } else {
                if (controler.windowWidth >= 740 && controler.windowWidth < 960) {
                    controler.size = "m";
                    d.addClass("m").removeClass("s").removeClass("l")
                } else {
                    if (controler.windowWidth >= 960) {
                        controler.size = "l";
                        d.addClass("l").addClass("m").removeClass("s")
                    }
                }
            }
        }
    }
})();

//pinterest
$(document).ready(function() {
    var a = $(".pin-it-button");
    openModal = function(b) {
        window.open(b, "signin", "width=665,height=300")
    };
    a.each(function() {
        var c = $(this),
            b = c.attr("href");
        c.click(function() {
            openModal(b);
            return false
        })
    })
});

//Home Twitter
jQuery(document).ready(function() {
    var $feed = $("#twitter-feed"),
        twitterContent = "";

    function parseHash(tweet) {
        return tweet.replace(/#([A-Za-z0-9\/\.]*)/g, function(tweet) {
            return '<a target="_new" href="http://twitter.com/search?q=' + tweet.replace("#", "") + '">' + tweet + "</a>"
        })
    }
    function parseLinks(tweet) {
        return tweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(tweet) {
            return tweet.link(tweet)
        })
    }
    function parseAt(tweet) {
        return tweet.replace(/@[\w]+/g, function(tweet) {
            return '<a href="http://www.twitter.com/' + tweet.replace("@", "") + '">' + tweet + "</a>"
        })
    }
    function relative_time(time_value) {
        var values = time_value.split(" ");
        time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
        var parsed_date = Date.parse(time_value);
        var relative_to = arguments.length > 1 ? arguments[1] : new Date;
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1E3);
        delta = delta + relative_to.getTimezoneOffset() * 60;
        var r = "";
        if (delta < 60) r = "a minute ago";
        else if (delta < 120) r = "couple of minutes ago";
        else if (delta < 45 * 60) r = parseInt(delta / 60).toString() + " minutes ago";
        else if (delta < 90 * 60) r = "an hour ago";
        else if (delta < 24 * 60 * 60) r = "" + parseInt(delta / 3600).toString() + " hours ago";
        else if (delta < 48 * 60 * 60) r = "1 day ago";
        else r = parseInt(delta / 86400).toString() + " days ago";
        return r
    }
    function loadTweets() {
        $.ajax({
            url: "http://api.twitter.com/1/lists/statuses.json?slug=sony&owner_screen_name=Sony",
            dataType: "jsonp",
            success: function(data) {
                $(data).each(function(i) {
                    var theTweet = parseHash(parseAt(parseLinks(data[i].text))),
                        img = '<div class="tweet"><div class="img"><a href="https://twitter.com/account/redirect_by_id?id=' + data[i].user.id + '" target="_blank" ><img src="' + data[i].user.profile_image_url + '" /></a></div>',
                        time = '<li class="time">' + relative_time(data[i].created_at) + "</li>",
                        reply = '<li class="reply"><a href="https://twitter.com/intent/tweet?in_reply_to=' + data[i].id_str + '">Reply</a></li>',
                        retweet = '<li class="retweet"><a href="https://twitter.com/intent/retweet?tweet_id=' + data[i].id_str + '">Retweet</a></li>',
                        favorite = '<li class="favorite"><a href="https://twitter.com/intent/favorite?tweet_id=' + data[i].id_str + '">Favorite</a></li>';
                    $feed.find("#twitter-error").remove();
                    twitterContent = twitterContent + img + '<div class="details"><p class="text">' + theTweet + "</p><ul>" + time + reply + retweet + favorite + "</ul></div></div>";
                    if (i == 3) return false
                });
                $feed.append(twitterContent);
                var $tweets = $feed.find(".tweet"),
                    $tweetLinks = $tweets.find("a");
                $tweets.hover(function() {
                    $(this).addClass("hover")
                }, function() {
                    $(this).removeClass("hover")
                });
                $tweetLinks.click(function() {
                    s.prop1 = "news and social";
                    s.prop2 = "social";
                    s.prop13 = "social";
                    s.hier1 = "new and social|social";
                    s.linkTrackVars = "prop1,prop2,prop13,hier1";
                    s.tl(this, "o", "Social")
                })
            },
            error: function(data) {
                var errorText = $feed.find("#twitter-error");
                if (errorText.length < 1) $feed.append('<div id="twitter-error">Twitter is over capacity...</div>');
                setTimeout(function() {
                    loadTweets()
                }, 5E3)
            }
        })
    }
    loadTweets()

});
