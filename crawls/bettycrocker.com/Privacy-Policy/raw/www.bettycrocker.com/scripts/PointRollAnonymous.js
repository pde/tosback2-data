function pr_swfver() {
    var osf, osfd, i, axo = 1, v = 0, nv = navigator;
    if (nv.plugins && nv.mimeTypes.length) { osf = nv.plugins["Shockwave Flash"]; if (osf && osf.description) { osfd = osf.description; v = parseInt(osfd.substring(osfd.indexOf(".") - 2)) } }
    else { try { for (i = 5; axo != null; i++) { axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i); v = i } } catch (e) { } }
    return v;
}
var pr_d = new Date(); pr_d = pr_d.getDay() + "|" + pr_d.getHours() + ":" + pr_d.getMinutes() + "|" + -pr_d.getTimezoneOffset() / 60;
var pr_postal = "";
var pr_data = "";
var pr_redir = "$CTURL$";
var pr_nua = navigator.userAgent.toLowerCase();
var prHost = (("https:" == document.location.protocol) ? "https://" : "http://"); var pr_sec = ((prHost == 'https://') ? '&secure=1' : '');
var pr_pos = "", pr_inif = (window != top);
if (pr_inif) {
    try { pr_pos = (typeof (parent.document) != "unknown") ? (((typeof (inDapIF) != "undefined") && (inDapIF)) || (parent.document.domain == document.domain)) ? "&pos=s" : "&pos=x" : "&pos=x"; }
    catch (e) { pr_pos = "&pos=x"; } if (pr_pos == "&pos=x") {
        var pr_u = new RegExp("[A-Za-z]+:[/][/][A-Za-z0-9.-]+"); var pr_t = this.window.document.referrer;
        var pr_m = pr_t.match(pr_u); if (pr_m != null) { pr_pos += "&dom=" + pr_m[0]; } 
    } else { if (((typeof (inDapMgrIf) != "undefined") && (inDapMgrIf)) || ((typeof (isAJAX) != "undefined") && (isAJAX))) { pr_pos += "&ajx=1" } } 
}
if (pr_postal != "") { var przipmatch = /^\d{5}$/; if (przipmatch.test(pr_postal)) { pr_pos += "&postal=" + pr_postal; } }
if ((pr_data != "") && (pr_data.indexOf("&") < 0)) { pr_pos += "&data=" + pr_data; }
var pr_s = "ads.pointroll.com/PortalServe/?pid=1247325T82020110330204645&flash=" + pr_swfver() + "&time=" + pr_d + "&redir=" + pr_redir + pr_pos + pr_sec + "&r=" + Math.random();
//document.write("<scr" + "ipt type='text/javascript' src='" + prHost + pr_s + "'></scr" + "ipt>");
