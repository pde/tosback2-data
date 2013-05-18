// NOTE: script depends on & calls methods in mdetect.js -- That script MUST be loaded earlier in page

var mobileRedirect = getCookie("mobileRedirect");
if (mobileRedirect != "0") {

//    var smartDeviceList = /iphone|ipod|series60|symbian|android|windows ce|blackberry|palm|windows phone os|iemobile/;
//    var uagent = navigator.userAgent.toLowerCase();
//    if (uagent.search(smartDeviceList) > -1) {
    if (DetectMobileQuick()) {
        var currentPageUrl = window.location.href;
        var currentPageQueryStrings = window.location.search.substring(1);            
            if (seoRoutesNativeUrl != null && seoRoutesNativeUrl != '') {
                currentPageUrl = seoRoutesNativeUrl;
            if (currentPageUrl.indexOf('?') > -1)
                currentPageQueryStrings = currentPageUrl.substring(currentPageUrl.indexOf('?') + 1);
        }

        var homePageRegex = new RegExp('(/$|/\\?.*$|(Default.aspx|content.aspx\\?contentid=home).*$)', 'i');
        var resultsPageRegex = new RegExp('(/$|/\\?.*$|(Results.aspx).*$)', 'i');
        var loginPageRegex = new RegExp('(/$|/\\?.*$|(Login.aspx).*$)', 'i');
        var productPageRegex = new RegExp('(/$|/\\?.*$|(ProductDetails).*$)', 'i');
        var cartPageRegex = new RegExp('(/$|/\\?.*$|(cart).*$)', 'i');
        var homePageMatch = currentPageUrl.match(homePageRegex);
        var resultsPageMatch = currentPageUrl.match(resultsPageRegex);
        var productPageMatch = currentPageUrl.match(productPageRegex);
        var loginPageMatch = currentPageUrl.match(productPageRegex);
        var cartPageMatch = currentPageUrl.match(cartPageRegex);

        if (homePageMatch != null && homePageMatch.length > 0) {
            window.location = "/Mobile/Default.aspx?" + currentPageQueryStrings;
        }
        else if (resultsPageMatch != null && resultsPageMatch.length > 0) {
            window.location = "/Mobile/Results.aspx?" + currentPageQueryStrings;
        }
        else if (productPageMatch != null && productPageMatch.length > 0) {
            window.location = "/Mobile/ProductDetail.aspx?" + currentPageQueryStrings;
        }
        else if (loginPageMatch != null && productPageMatch.length > 0) {
            window.location = "/Mobile/Profile/login.aspx?" + currentPageQueryStrings;
        }
        else if (cartPageMatch != null && cartPageMatch.length > 0) {
            window.location = "/Mobile/Cart.aspx?" + currentPageQueryStrings;
        }
    }
    else {
        setCookie("mobileRedirect", "0", 10);
    }
}

function getCookie(search_name) {
    var results = document.cookie.match('(^|;) ?' + search_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return "";
}


function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}