

(function ($) {
    $(window).load(function () {
        var cookie = getCookie('runa_settings');        
        if (cookie != undefined && cookie != '') {            
            $("body").prepend("<span class='runa_command' type='coupon_code' value='" + cookie + "'></span>");
        }
    });

})(jQuery);

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

//alert(getCookie('runa_settings'));
//function testFunction() {
//    alert('work please');
//}
//$(window).load(testFunction);