//external header scripts
  

// Page Refresh Script
function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);", timeoutPeriod);
}

// Forward Page Pop-up
function fwdpopup(url) {
    window.open(url, "forwardPage", "menubar=1,resizable=1,width=750,height=600");
}

//Article Print Page Function
function printPage(obj) {
    //window.print();
    window.open('/PrintTemplate.aspx?nodeid=' + obj, 'printWin', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=500,height=650');
}

// This function may be depricated
function get_ZipCookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) { // if the cookie exists
            offset += search.length
            end = document.cookie.indexOf(";", offset); // set the index of beginning value

            if (end == -1) // set the index of the end of cookie value
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}

// URL encode for search
function URLEncode(clearString) {
    var output = '';
    var x = 0;
    clearString = clearString.toString();
    var regex = /(^[a-zA-Z0-9_.]*)/;
    while (x < clearString.length) {
        var match = regex.exec(clearString.substr(x));
        if (match != null && match.length > 1 && match[1] != '') {
            output += match[1];
            x += match[1].length;
        } else {
            if (clearString[x] == ' ')
                output += '+';
            else {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
            }
            x++;
        }
    }
    return output;
}

//Google Site Search
function SearchSite() {
    var val = '';

//    for (i = 0; i < document.forms[0].sitesearch.length; i++) {
//        if (document.forms[0].sitesearch[i].checked == true)
//            val = document.forms[0].sitesearch[i].value;
//    }

    var SiteName = document.getElementById('Sitepath').value;
//    document.location.href = 'http://' + SiteName + '/search?cx=011533900540746215761%3A-adksucby_s&cof=FORID%3A9&ie=UTF-8&hl=en&sitesearch=' + val + '&q=' + URLEncode(document.getElementById('q').value) + '&sa=Search' + '&safe=active';
    document.location.href = 'http://' + SiteName + '/search?cx=011533900540746215761%3A-adksucby_s&cof=FORID%3A9&ie=UTF-8&hl=en&sitesearch=&q=' + URLEncode(document.getElementById('q').value) + '&sa=Search' + '&safe=active';
}

//Submit search when user clicks enter
function SubmitOnEnter(myfield, e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    else
        return true;
    if (keycode == 13) {
        SearchSite();
        return false;
    }
    else
        return true;
}

//Creates Promo pixel for email promotion tracking
function drawPromoPixel() {
    var promo_code = ''
    var i_url = document.URL
    if (i_url.indexOf('?') >= 0) {
        var bits = i_url.split('?')
        var aBits = bits[1].split('&')
        for (i = 0; i < aBits.length; i++) {
            var bBits = aBits[i].split('=')
            if (bBits[0] == 'promo_code' || bBits[0] == 'PROMO_CODE') {
                var promo_code = bBits[1]
            }
        }
        if (promo_code != '') {
            document.write("<img src=\"http://www.newsmaxstore.com/images/promo_tracking/promo_conversion_image.cfm?PROMO_CODE=" + promo_code + "&SOURCE=newsmax&LANDING_PAGE=" + URLEncode(document.URL) + "\" width=\"1\" height=\"1\" border=\"0\">")
        }
    }
}


jQuery(document).ready(function() {

   

//Mobile Device Detection
    function detectMobile() {

        var deviceIphone = "iphone";
        var deviceIpod = "ipod";
        var deviceS60 = "series60";
        var deviceSymbian = "symbian";
        var engineWebKit = "webkit";
        var deviceWinMob = "windows ce";
        var deviceAndroid = "android";
        var deviceBB = "blackberry";
        var devicePalm = "palm";
        var deviceAndroid = "android";
        var uagent = navigator.userAgent.toLowerCase();

        // Detect iPhone.
        if (uagent.search(deviceIphone) > -1)
            return true;
        // Detect iPod Touch.
        else if (uagent.search(deviceIpod) > -1)
            return true;
        // Detects Android 
        else if (uagent.search(deviceAndroid) > -1)
            return true;
        // Detect Blackberry
        else if (uagent.search(deviceBB) > -1)
            return true;
        // Detect Windows Mobile
        else if (uagent.search(deviceWinMob) > -1)
            return true;
        // Detect Palm
        else if (uagent.search(devicePalm) > -1)
            return true;
        // Detect Symbian
        else if ((uagent.search(deviceS60) > -1) || (uagent.search(deviceSymbian) > -1))
            return true;

        else return false;
    }

    var displayMobileMessage = detectMobile();
    if (displayMobileMessage) { jQuery('#mobileSiteLink').css('visibility', 'visible');}

});