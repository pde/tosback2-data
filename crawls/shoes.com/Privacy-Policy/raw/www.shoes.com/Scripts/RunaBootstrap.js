//var merchant_config = { 
//    merchant_id: "4584d624-2437-8f71-0243-a3947f7f9b48", 
//    merchant_type: "SHOES", 
//    merchant_vertical: "etailer",
//    merchant_host: "http://" + runa_settings_merchant_host,
//    runa_base_url: runa_settings_base_url, 
//    runa_client_version: "1.6.9",
//    merchant_cart_url: "http://" + runa_settings_merchant_host + "/Checkout/Cart.aspx"
//}; 

var runa_all_js = merchant_config.runa_base_url + "/client/boot/etailer/" +
                merchant_config.merchant_type + "/" + merchant_config.merchant_id;
function start_runa_client() {    
    var element = document.createElement("script");
    element.src = runa_all_js;
    element.type = "text/javascript";
    document.body.appendChild(element);
}

(function (i) {
    var u = navigator.userAgent.toLowerCase();
    var ie = /*@cc_on!@*/false;
    if (/webkit/.test(u)) {
        // safari
        timeout = setTimeout(function () {
            if (document.readyState == "loaded" || document.readyState == "complete") { i(); }
            else { setTimeout(arguments.callee, 10); }
        }, 10);
    }
    else if ((/mozilla/.test(u) && !/(compatible)/.test(u)) || (/opera/.test(u))) {
        // opera/moz 
        document.addEventListener("DOMContentLoaded",i,false);
    }
    else if (ie) {
        // IE
        (function () {
            var tempNode = document.createElement("document:ready");
            try {
                tempNode.doScroll("left"); i(); tempNode = null;
            }
            catch (e) {
                setTimeout(arguments.callee, 0);
            }
        })();
    } else {
        window.onload = i;
    }
})(start_runa_client); 


