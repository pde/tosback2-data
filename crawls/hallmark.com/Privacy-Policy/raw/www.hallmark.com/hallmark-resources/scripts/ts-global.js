<!-- GA & REMARKETING TAG  -->
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16352667-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
<!-- END GA & REMARKETING TAG  -->


<!-- OPTIMOST PAGE CODE ATTRIBUTE CODE -->
    var opPage = "";
    var opPageName = window.location.pathname.split('/');
    if (opPageName != null) {
        for (var iCount = 0; iCount < opPageName.length; iCount++) {
            if (iCount > 0 && iCount < 3) {
                opPage = opPage + opPageName[iCount];
            }
        }
    }
<!-- END OPTIMOST PAGE CODE ATTRIBUTE CODE -->

<!-- OPTIMOST PAGE CODE V2.7 - Copyright 2002-2010 Autonomy Optimost -->
	var optimost = { A: {}, C: {}, D: document, L: document.location, M: [], Q: {}, T: new Date(), U: '', V: '2.7', Enabled: true, ST: "script", SA:
{ "type": "text/javascript" }, I: function () {
    var s = this.L.search; var c = this.D.cookie; if (s.length > 3) {
        for (var a = s.substring(1)
.split("&"), i = 0, l = a.length; i < l; i++) {
            var p = a[i].indexOf("="); if (p > 0) this.Q[a[i].substring(0, p)] = unescape(a[i].substring(
p + 1));
        }
    } if (c.length > 3) {
        for (var a = c.split(";"), i = 0, b = a.length; i < b; i++) {
            var v = a[i].split("="); while (v[0].substring(0,
1) == " ") v[0] = v[0].substring(1, v[0].length); if (v.length == 2) this.C[v[0]] = unescape(v[1]);
        }
    }
}, B: function () {
    var n; this.A = {
    }; var _o = this; this.A.D_ts = Math.round(_o.T.getTime() / 1000); this.A.D_tzo = _o.T.getTimezoneOffset(); this.A.D_loc = _o.L.protocol +
"//" + _o.L.hostname + _o.L.pathname; this.A.D_ckl = _o.D.cookie.length; this.A.D_ref = _o.D.referrer; if (typeof optrial == "object")
        for (n in optrial) this.A[n] = optrial[n]; for (n in this.Q) this.A[n] = this.Q[n]; for (n in this.C) if (n.substring(0, 2) == "op") this.A[n] =
this.C[n];
}, S: function () {
    var q = ''; for (var n in this.A) if (this.A[n] != null && this.A[n] != "") q += (q.length > 0 ? "&" : (this.U.indexOf(
    "?") > 0 ? "&" : "?")) + n + "=" + escape(this.A[n]); return this.U + q;
}, SC: function (n, v, e, d) {
    var de = new Date(); de.setTime(
    de.getTime() + e * 1000); this.D.cookie = n + "=" + escape(v) + ((e == null) ? "" : ("; expires=" + de.toGMTString())) + "; path=/" + ((d ==
    null) ? "" : (";domain=" + d));
}, SLD: function () {
    var sld = this.D.domain; var dp = sld.split("."); var l = dp.length; if (l < 2) sld = null;
    else if (!isNaN(dp[l - 1]) && !isNaN(dp[l - 2])) sld = null; else sld = "." + dp[l - 2] + "." + dp[l - 1]; return sld;
}, R: function (r, c, d,
    e) {
    if (this.Enabled) {
        var b = true; if (r < 1000) {
            b = (Math.floor(Math.random() * 1000) < r); if (c != null) {
                if (this.C[c] != null) b = (this.C[c] !=
    "mvt-no"); else this.SC(c, b ? "mvt-yes" : "mvt-no", e, d);
            }
        } if (b) {
            var t = '<' + this.ST + ' src="' + this.S() + '"'; for (n in this.SA)
                t += (" " + n + '="' + this.SA[n] + '"'); t += '><\/' + this.ST + '>'; this.D.write(t);
        }
    }
}, addModule: function (s, f) {
    this.M[s] = f;
}, displayModule: function (s) { if (typeof this.M[s] == "function") this.M[s](); }, hasModules: function () {
    return count(this.M) > 0;
}
    }; optimost.I();
<!-- END OPTIMOST PAGE CODE V2.7 - Copyright 2002-2010 Autonomy Optimost -->

<!-- OPTIMOST SELECTOR CODE V2.7 - Copyright 2002-2010 Autonomy Optimost -->
    var optSelector = {};
    optSelector.path = "http://es.optimost.com/";
    if (window.location && window.location.protocol && window.location.protocol.toLowerCase().indexOf("https") > -1) optSelector.path = "https://by.essl.optimost.com/";
    optSelector.url_live = "es/678/c/16/u/Hallmark_Live.js "; optSelector.url_qa = "es/678/c/16/u/Hallmark_Stage.js"; optSelector.url = optSelector.url_live;
    if (typeof (optimost) == 'object') { optSelector.qc = optimost.Q["opselect"] || optimost.C["opselect"] || "none"; if (optSelector.qc.toLowerCase() == "qa") { optSelector.url = optSelector.url_qa; } else if (optSelector.qc.toLowerCase() == "live") { optSelector.url = optSelector.url_live; } }
    if (optSelector.url.toLowerCase().indexOf("http") == -1) optSelector.url = optSelector.path + optSelector.url
    document.write('<' + 'script type="text/javascript" src="' + optSelector.url + '"><\/' + 'script>');
<!-- END OPTIMOST SELECTOR CODE V2.7 - Copyright 2002-2010 Autonomy Optimost -->

<!-- OPTIMOST UNIVERSAL MODULE -->
    if (typeof (optimost) == "object" && typeof (opModulesArray) != "undefined" && opModulesArray.length) {
        for (var i = 0; i < opModulesArray.length; i++) {
            optimost.displayModule(opModulesArray[i]);
        }
    }
<!-- END OPTIMOST UNIVERSAL MODULE -->