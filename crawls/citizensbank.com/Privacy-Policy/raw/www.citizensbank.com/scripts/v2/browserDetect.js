/***************************************************************************************/
/***************************************************************************************/
/****************************BROWSER COMPAT FUNCTIONALITY*******************************/
/***************************************************************************************/
/***************************************************************************************/

$(document).ready(function () {

    var userAgent = navigator.userAgent.toLowerCase(),
			browser = '',
			isDropDown = false;

    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

    // browser version
    var chromeVer = parseFloat(userAgent.substring(userAgent.indexOf('chrome/') + 7)),
		safariVer = parseFloat(userAgent.substring(userAgent.indexOf('version/') + 8)),
		firefoxVer = parseFloat(userAgent.substring(userAgent.indexOf('firefox/') + 8)),
		ieVer = parseFloat(userAgent.substring(userAgent.indexOf('msie ') + 5))

    // which browser
    var isChrome = $.browser.chrome,
		isFirefox = $.browser.mozilla,
		isSafari = $.browser.safari,
		isIE = $.browser.msie;

    // chrome also has safari in useragent string
    if (isChrome && isSafari) { isSafari = false; }

    // safari has weird versioning in the lower versions
    if (isNaN(safariVer) && isSafari) { safariVer = 2; }
    
    if (typeof (console) != "undefined") {
        if (console.log) {
            console.log(
                "chromeVer:" + chromeVer +
                ", firefoxVer:" + firefoxVer +
                ", safariVer:" + safariVer +
                ", ieVer:" + ieVer +

                "\nisChrome:" + isChrome +
                ", isFirefox:" + isFirefox +
                ", isSafari:" + isSafari +
                ", isIE:" + isIE
                )
        }
    }
    //Create Image element 
    function createImg(src, alt) {
        $('#downLink').before('<img/>');
        $('#browserLinks img').attr({
            'src': '../../images/v2/browsercompat/' + src,
            'alt': alt + 'icon'
        });
    }
    // Check Browser name and version
    // itemized list in case a browser needs special treatment
    if (isChrome && (chromeVer < 13)) {
        isDropDown = true;
        if (typeof (console) != "undefined") if (console.log) { console.log("browser is chrome") }
    }
    else if (isFirefox && (firefoxVer < 3.6)) {
        isDropDown = true;
        if (typeof (console) != "undefined") if (console.log) { console.log("browser is FF") }
    }
    else if (isSafari && (safariVer < 5)) {
        isDropDown = true;
        if (typeof (console) != "undefined") if (console.log) { console.log("browser is safari") }
    }
    else if (isIE && (ieVer < 7)) {
        isDropDown = true;
        if (typeof (console) != "undefined") if (console.log) { console.log("browser is ie") }
    }

    //If true create Icon and Link
    if (isDropDown) {

        // turn on drop down message
        $('#dropDownMsg').css({ 'display': 'block' });

        // add link user's browser type
        if (isChrome) {
            createImg('chrome.jpg', 'chrome');
            $('#downLink').attr('href', 'https://www.google.com/chrome');
            $('#downLink').html('Download the newest version of Google Chrome');
        } else if (isFirefox) {
            createImg('firefox.jpg', 'Firefox');
            $('#downLink').attr('href', 'http://www.mozilla.org/en-US/firefox/new/');
            $('#downLink').html('Download the newest version of Mozilla Firefox');
        } else if (isSafari) {
            createImg('safari.jpg', 'Safari');
            $('#downLink').attr('href', 'http://www.apple.com/safari/');
            $('#downLink').html('Download the newest version of Apple Safari');
        } else if (isIE) {
            createImg('ie.jpg', 'Internet Explorer');
            $('#downLink').attr('href', 'http://windows.microsoft.com/en-us/internet-explorer/products/ie/home');
            $('#downLink').html('Download the newest version of Microsoft Internet Explorer');
        }
    }

    $("#dropDownMsg #rightDiv a").click(function () {
        $('#dropDownMsg').removeAttr('style');
    });

});




