document.write('<br clear="all"><br clear="all">');
document.write('<link rel="stylesheet" type="text/css" href="http://i.forbesimg.com/css/legacy_newfooter_2.1.css">');
document.write('<div class="footcontainer">');
document.write('<div class="footbox">');
document.write('<div class="footop">');
document.write('<a href="http://www.forbes.com/fdc/sitemap.html" class="footlink" target="_top">Sitemap</a><a href="http://www.forbes.com/fdc/help.html" class="footlink" target="_top">Help</a><a href="http://www.forbes.com/fdc/contact.html" class="footlink" target="_top">Contact Us</a><a href="http://www.newsletters.forbes.com/DRHM/servlet/ControllerServlet?Action=DisplayMainPage&SiteID=es_764&pgm=44764400" class="footlink" target="_top">Investment Newsletters</a><a href="http://www.forbes.com/conferences/" class="footlink" target="_top">Forbes Conferences</a><a href="http://www.forbes.com/forbes/" class="footlink" target="_top">Forbes Magazine</a>');
document.write("</div>");
document.write('<div class="footcopy">');
document.write('<a href="http://www.forbesmedia.com" class="greylink" target="_top">Advertising Information</a> &nbsp;');
document.write('<a href="http://www.forbes.com/mobility/" class="greylink" target="_top">Forbes.com Mobile</a> &nbsp;');
document.write('<a href="http://www.forbes.com/rss/" class="greylink" target="_top">RSS <img src="http://i.forbesimg.com/media/icons/rss_12.jpg" width="12" height="12" border="0"></a> &nbsp;');
document.write('<a href="http://forbesreprints.magreprints.com/" class="greylink" target="_top">Reprints & Permissions</a> &nbsp;');
document.write("<br>");
document.write('<a href="http://www.forbes.com/fdc/subservices.html" class="greylink" target="_top">Subscriber Services</a> &nbsp;');
document.write('<a href="http://www.forbes.com/fdc/privacy.html" class="greylink" target="_top">Privacy Statement</a> &nbsp;');
document.write('<a onclick="view(trusteId)" href="#" class="greylink">Ad Choices</a> &nbsp;');
document.write('<a href="http://www.forbes.com/fdc/terms.html" class="greylink" target="_top">Terms, Conditions and Notices</a> &nbsp;');
document.write("<br>");
var d = new Date();
document.write(d.getFullYear());
document.write("&nbsp;Forbes.com LLC&#153; &nbsp; All Rights Reserved &nbsp;");
document.write("</div>");
document.write("<br>");
// document.write('<div id="futmap"><dl>');
// document.write('<dd id="posOne"><a href="http://www.forbes.ru/" target="_top" alt="Forbes Russia"></a></dd>');
// document.write('<dd id="posTwo"><a href="http://www.forbes.pl/" target="_top" alt="Forbes Poland"></a></dd>');
// document.write('<dd id="posThree"><a href="http://www.forbes.ro/" target="_top" alt="Forbes Romania"></a></dd>');
// document.write('<dd id="posFour"><a href="http://www.forbeschina.com/" target="_top" alt="Forbes China"></a></dd>');
// document.write('<dd id="posFive"><a href="http://www.realclearpolitics.com/" target="_top" alt="RealClear Politics"></a></dd>');
// document.write('<dd id="posSix"><a href="http://www.realclearsports.com/" target="_top" alt="RealClear Sports"></a></dd>');
// document.write('<dd id="posSixa"><a href="http://www.realclearmarkets.com/" target="_top" alt="RealClear Markets"></a></dd>');
// document.write('<dd id="posSeven"><a href="http://www.morningstar.com/" target="_top"></a></dd>');
// document.write('<dd id="posEight"><a href="http://www.xignite.com/" target="_top"></a></dd>');
// document.write('<dd id="posTen"><a href="http://www.thomson.com/" target="_top"></a></dd>');
// document.write('<dd id="posEleven"><a style="cursor:pointer;" onclick="view(trusteId)"></a></dd>');
// document.write("</dl></div>");
// document.write('<div class="footbot">');
// document.write('<br clear="all"><br clear="all">');
// document.write("</div>");
// document.write("</div>");
// document.write("</div>");
document.write('<script type="text/javascript" src="http://preferences.truste.com/js/buildJsFilev2.jsp?domain=forbes.com&amp;type=epref"><\/script>');
if (typeof displayedSection == "undefined") {
    displayedSection = ""
}
if (typeof displayedChannel == "undefined") {
    displayedChannel = ""
}
pageURL = this.location.href;
if (!("pageType" in window)) {
    pageType = "generic"
}(function () {
    var c = {
        fps: "function" === typeof getStandaloneCookie ? getStandaloneCookie("fps") : null,
        op: "user_msg",
        sh: "undefined" !== typeof window.screen ? window.screen.height : null,
        sw: "undefined" !== typeof window.screen ? window.screen.width : null,
        ch: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.channel ? forbes.page_meta.channel : "undefined" !== typeof window.displayedChannel ? window.displayedChannel : null,
        se: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.section ? forbes.page_meta.section : "undefined" !== typeof window.displayedSection ? window.displayedSection : null,
        ti: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.entities && "undefined" !== typeof forbes.page_meta.entities.companies ? forbes.page_meta.entities.companies.join(",") : "undefined" !== typeof window.cTicker && "undefined" !== typeof window.displayedSection && window.displayedSection === "companytearsheets" ? window.cTicker : null,
        pt: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.type ? forbes.page_meta.type : "undefined" !== typeof window.pageType ? window.pageType : null,
        i: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.natural_id ? forbes.page_meta.natural_id : null,
        su: function () {
            var e;
            e: {
                linkElements = document.getElementsByTagName("link");
                for (e = e = 0; e < linkElements.length; e++) {
                    if (linkElements[e].getAttribute("rel") === "canonical") {
                        e = linkElements[e].getAttribute("href");
                        break e
                    }
                }
                e = null
            }
            return null === e ? "undefined" !== typeof window.location ? window.location.protocol + "//" + window.location.hostname + window.location.pathname : null : e
        }(),
        re: function () {
            if (document.referrer && document.referrer.match(/^(?!http:\/\/(.[^/]+)\.forbes\.com)http(s)?:\/\/(.[^/:]+)/)) {
                return document.referrer.match(/^http(s)?:\/\/(.[^/:]+)/)[2]
            } else {
                if (document.referrer && b === document.referrer && document.cookie.indexOf(a + "") !== -1 && window.wg_extdom && wg_extdom) {
                    return document.cookie.match(wg_originalReferrer + "=http(s)?://(.[^/:]+)(;|$)")[1]
                }
            }
            return null
        }(),
        au: function () {
            if ("undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.author && "undefined" !== typeof forbes.page_meta.author.natural_id) {
                return forbes.page_meta.author.natural_id
            } else {
                var f;
                f: {
                    f = document.getElementsByTagName("meta");
                    for (var e = 0, e = 0; e < f.length; e++) {
                        if ("undefined" !== typeof f[e].name && f[e].name === "author" || "undefined" !== f[e].getAttribute("property") && f[e].getAttribute("property") == "author") {
                            f = f[e].content;
                            break f
                        }
                    }
                    f = void 0
                }
                return f !== null && f !== "" ? f : null
            }
        }(),
        at: "undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.author && "undefined" !== typeof forbes.page_meta.author.type ? forbes.page_meta.author.type : null,
        pa: function () {
            if ("undefined" !== typeof forbes && "undefined" !== typeof forbes.page_meta && "undefined" !== typeof forbes.page_meta.partner_id) {
                return forbes.page_meta.partner_id
            } else {
                var f;
                f: {
                    f = window.location.search.substring(1).split("&");
                    for (var e = 0, e = 0; e < f.length; e++) {
                        var g = f[e].split("=");
                        if (g[0] === "partner") {
                            f = g[1];
                            break f
                        }
                    }
                    f = null
                }
                return "null" !== typeof f ? f : null
            }
        }()
    }, b = "http://www.forbes.com/fdc/welcome_mjx.shtml",
        a = "wg_originalReferrer";
    (function (f) {
        var e = window.onload;
        window.onload = "function" !== typeof window.onload ? f : function () {
            e && e();
            f()
        }
    })(function () {
        var f = "http://fast.forbes.com/fps/cookie_backup.php?",
            e = 0;
        for (item_key in c) {
            c.hasOwnProperty(item_key) && (e > 0 && (f += "&"), f = null !== c[item_key] ? f + item_key + "=" + c[item_key] : f + item_key + "=", e++)
        }
        "undefined" === typeof f ? f = [] : "string" === typeof f && (f = [f]);
        if (!("object" !== typeof f && "string" !== typeof f) && ("string" === typeof f && (f = [f]), !(f.length < 1))) {
            e = document.createElement("div");
            e.id = "pzndiv";
            for (var h = 0, h = 0; h < f.length; h++) {
                var g = document.createElement("img");
                g.width = 1;
                g.height = 1;
                g.alt = "";
                g.src = f[h];
                e.appendChild(g)
            }
            document.body.appendChild(e)
        }
    })
})();

function Meta() {
    var a = document.getElementsByTagName("META");
    this.meta = {};
    for (var b = 0; b < a.length; b++) {
        this.meta[a[b].name] = a[b].content
    }
}
Meta.prototype.get = function (a) {
    return this.meta[a]
};
meta = new Meta();
var _sf_async_config = {
    uid: 17493,
    domain: "forbes.com"
};
var chartbeat_section = "";
if (displayedSection != "") {
    chartbeat_section = "," + displayedSection
}
_sf_async_config.sections = displayedChannel + chartbeat_section;
var chartbeat_author = meta.get("author");
if (chartbeat_author == null) {
    chartbeat_author = ""
}
_sf_async_config.authors = chartbeat_author;
if (getCanonicalUrl() != "") {
    _sf_async_config.useCanonical = true
}(function () {
    function a() {
        window._sf_endpt = (new Date()).getTime();
        var c = document.createElement("script");
        c.setAttribute("language", "javascript");
        c.setAttribute("type", "text/javascript");
        c.setAttribute("src", (("https:" == document.location.protocol) ? "https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "http://") + "static.chartbeat.com/js/chartbeat_pub.js");
        document.body.appendChild(c)
    }
    var b = window.onload;
    window.onload = (typeof window.onload != "function") ? a : function () {
        b();
        a()
    }
})();
document.write("</body>");
document.write("</html>");
(function () {
    if (!document.getElementById("fixedPlaceAd")) {
        return
    }
    var j = document.getElementById("dynamicAdWinDiv");
    if (!j) {
        return
    }
    var f = document.getElementById("storyCo12");
    if (!f) {
        return
    }
    var g = document.getElementById("storyCo11");
    if (!g) {
        return
    }
    for (var b = 0; b < f.childNodes.length;) {
        var h = f.childNodes[b];
        if (h.id == "dynamicAdWinDiv") {
            b++
        } else {
            f.removeChild(f.childNodes[b])
        }
    }
    j.style.width = "336px";
    j.style.position = "fixed";
    j.firstChild.style.margin = "0";
    if (j.offsetParent && j.offsetParent.nodeName == "DIV") {
        j.style.position = "relative";
        j.style.top = "0px";
        a = j.offsetParent.offsetTop;
        var e = g.offsetHeight - j.offsetHeight;
        window.onscroll = c;
        c();

        function c() {
            var l = document.documentElement.scrollTop;
            var k = l - a;
            if (k < 0) {
                k = 0
            }
            if (k > e) {
                k = e
            }
            if (k != parseInt(j.style.top)) {
                j.style.top = k + "px"
            }
        }
    } else {
        if (j.currentStyle) {
            var a = j.currentStyle.top
        } else {
            if (window.getComputedStyle) {
                var a = document.defaultView.getComputedStyle(j, null).getPropertyValue("top")
            }
        }
        a = parseInt(a) || j.offsetTop || 300;
        var e = j.offsetTop - j.offsetHeight;
        window.onscroll = document.documentElement.onscroll = function () {
            var m = document.documentElement.scrollTop || document.body.scrollTop;
            var k = a - m;
            if (k < 0) {
                k = 0
            }
            var l = g.offsetHeight;
            if (m > e + l) {
                k = e + g.offsetHeight - m
            }
            if (k != parseInt(j.style.top)) {
                j.style.top = k + "px"
            }
        }
    }
})();

function wg_testConfig() {
    var a = new RegExp("(google\\.)|(yahoo\\.)|(msn\\.)|(bing\\.)|(aol\\.)", "i");
    if (document.referrer.match(a)) {
        wg_loadConfig()
    } else {
        var b = document.cookie.match("wg_originalReferrer=(.*?)(;|$)");
        if (b) {
            b = b[1]
        }
        if (b) {
            if (b.match(a)) {
                wg_loadConfig()
            }
        }
    }
}
function wg_loadConfig() {
    document.write('<link rel="stylesheet" type="text/css" href="http://i.forbesimg.com/css/whiteGlove1.css">');
    document.write('<script src="http://i.forbesimg.com/scripts/whiteGlove3.js" type="text/javascript"><\/script>');
    document.write('<SCRIPT LANGUAGE=JavaScript src="http://i.forbesimg.com/scripts/whiteglove.js"><\/script>');
    document.write('<SCRIPT LANGUAGE=JavaScript src="http://i.forbesimg.com/scripts/wg_config.js"><\/script>')
}
var phatcatId = "35415301490";

function isMember() {
    forbes0 = document.cookie.indexOf("forbesmemb=");
    forbes1 = document.cookie.indexOf("forbesmemb_confirm=");
    if (forbes0 != -1 && forbes1 != -1 && findCookie("forbesmemb") != phatcatId) {
        return true
    } else {
        return false
    }
}
function findCookie(a) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(a + "=");
        if (begin != -1) {
            begin += a.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(begin, end))
        }
    }
    return null
}
function bluekai() {
    var b = "";
    if (isMember()) {
        b = findCookie("forbesmemb")
    }
    var a = findCookie("s_p_name");
    if (a == null) {
        a = ""
    }
    document.write('<script type="text/javascript" src="http://tags.bluekai.com/site/3536?ret=js&phint=channel%3D' + displayedChannel + "&phint=section%3D" + displayedSection + "&phint=member%3D" + b + "&phint=partner%3D" + a + '"><\/script>')
}
function getCanonicalUrl() {
    linkElements = document.getElementsByTagName("link");
    canonicalUrl = "";
    for (i = 0; i < linkElements.length; i++) {
        if ((typeof linkElements[i].attributes.rel != "undefined") && (linkElements[i].attributes.rel.nodeValue == "canonical")) {
            canonicalUrl = linkElements[i].attributes.href.nodeValue;
            break
        }
    }
    return canonicalUrl
}
function checkToolbar() {
    if (getCookie("GTB") == null && navigator.userAgent.indexOf("GTB") != -1) {
        setCookie("GTB", "true", 1)
    }
}
function setSilverlightCookie() {
    document.write('<script type="text/javascript" src="http://i.forbesimg.com/scripts/util/SilverlightVersion.js"><\/script>');
    document.write('<script type="text/javascript" src="http://i.forbesimg.com/scripts/util/SilverlightCookie.js"><\/script> ')
}
checkToolbar();

function initialCCLogoPlacement() {
    addIdToVideoPlayerIframe("videoplayer_iframe");
    var a = location.href + "";
    if (a.indexOf("?") > -1) {
        a = a.replace(location.search, "")
    }
    var b = ReplaceAll($("h1").text(), "'", "%27");
    $("a[href^='mailto']").each(function () {
        var c = this.getAttribute("onclick") + "";
        if (c.indexOf("s_linkName='E-Mail'") > -1) {
            this.className = "thickbox";
            c = c.replace("s_linkName='E-Mail'", "s_linkName='artctrlemail'") + " document.domain='forbes.com';";
            this.setAttribute("onclick", c);
            this.href = "http://orgchart.forbes.com/acs/acsemail.php?url=" + a + "&amp;headline=" + b + "&amp;keepThis=true&amp;TB_iframe=true&amp;height=580&amp;width=500"
        }
    });
    if (typeof adStringx92 != "undefined") {
        $("#controlsbox").append("<br/><br/>" + adStringx92)
    }
    if (typeof adStringx91 != "undefined" && $(".controls").length > 2) {
        $(".controls:last").append(adStringx91)
    }
}
function ReplaceAll(f, c, e) {
    var a = f;
    var b = a.indexOf(c);
    while (b != -1) {
        a = a.replace(c, e);
        b = a.indexOf(c)
    }
    return a
}
if (typeof displayedSpecialSlot != "undefined" && displayedSpecialSlot == "intinv09") {
    $("#storyCo12 iframe:eq(1)").hide()
}
document.write('<script type="text/javascript" src="http://js.moatads.com/2be987/moatfooter.js"><\/script>');
(function () {
    var b = document.createElement("a");
    b.id = "borderTab";
    var f = document.createElement("div");
    f.id = "teconsent";
    var c = document.createElement("script");
    c.src = "http://consent.truste.com/notice?domain=forbes.com&c=teconsent";
    f.appendChild(c);
    b.appendChild(f);
    document.body.appendChild(b)
})();