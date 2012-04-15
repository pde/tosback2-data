(function () {
    /* -----------------------------------------
    * SR Configuration
    ----------------------------------------- */

    _shoprunner_com.version = 2.0;
    _shoprunner_com.sendOrderConfirm = true;
    _shoprunner_com.onLoadCallCustomFunction = "";

    /* ----------------------------------------
    * PayRunner Configuration - Change these values only if your site is PayRunner enabled. If you are not sure, leave them as they are.
    ---------------------------------------- */
    _shoprunner_com.checkout = new Object();
    _shoprunner_com.checkout.enabled = false;
    _shoprunner_com.checkout.singleProductBuyNowEnabled = false;
    _shoprunner_com.checkout.cartBuyNowEnabled = false;
    _shoprunner_com.checkout.partnerAPIEndPoint = '';

    /* -------------------------------------- */
    /* DO NOT MODIFY ANYTHING BELOW THIS LINE */
    /* -------------------------------------- */

    _shoprunner_com.prefix = window.parent.document.location.protocol + "//"; if (_shoprunner_com.enabled) { switch (_shoprunner_com.environmentID) { case 1: _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "staging-content.shoprunner.com/staging"; break; case 2: _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "content.shoprunner.com"; break; default: _shoprunner_com.sr_jsContentURL = _shoprunner_com.prefix + "staging-content.shoprunner.com/staging"; break } if (_shoprunner_com.prefix == "https://") { var sr_CSS_URL = _shoprunner_com.sr_jsContentURL + "/Secure" + _shoprunner_com.retailerID + ".css" } else { var sr_CSS_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".css" } var sr_js_content_el_URL = _shoprunner_com.sr_jsContentURL + "/" + _shoprunner_com.retailerID + ".js"; setTimeout(function () { var a = document.createElement("link"); a.href = sr_CSS_URL; a.type = "text/css"; a.rel = "stylesheet"; document.getElementsByTagName("head")[0].appendChild(a); var b = document.createElement("script"); b.src = sr_js_content_el_URL; b.type = "text/javascript"; document.getElementsByTagName("head")[0].appendChild(b) }, 1) } _shoprunner_com.docReady = false; function dom_loaded() { _shoprunner_com.docReady = true; if (typeof (sr_$) !== "undefined") { sr_$.run() } } if (document.addEventListener) { document.addEventListener("DOMContentLoaded", dom_loaded, false) } else { if (document.attachEvent) { document.attachEvent("onreadystatechange", dom_loaded) } } if (window.addEventListener) { window.addEventListener("load", dom_loaded, false) } else { if (window.attachEvent) { var r = window.attachEvent("onload", dom_loaded) } };
} ())
