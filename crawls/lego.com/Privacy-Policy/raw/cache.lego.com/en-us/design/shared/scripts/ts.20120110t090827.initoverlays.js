//               if (!!window.top.allowIframe && window.top && window.top.location && window.top.location != window.location) {
//window.top.location = window.location;
//               }

function webContext() { this.cultureInfo = { "Name": getLanguage() }; }
var globalContext = new webContext();
function getLanguage() {
    var url = window.location.pathname.toLowerCase();
    var lang = "";
    var tokens = url.split("/");
    if (tokens.length > 1) {
        if (tokens[1].length == 5 && tokens[1].indexOf("-") == 2) {
            lang = tokens[1];
        }
        else {
            if (tokens[1].length == 2 || tokens[1].length == 3) {
                if (tokens[1] == "eng" || tokens[1] == "en") {
                    lang = "en-US";
                }
                else {
                    if (tokens[1] == "deu") {
                        lang = "de-DE";
                    }
                    else {
                        // Other languages ?
                    }
                }
            }
            else {
                // Check for token 2 - first token must be franchise....
                if (tokens.length > 2) {
                    if (tokens[2].length == 5 && tokens[2].indexOf("-") == 2) {
                        lang = tokens[2];
                    }
                }
            }
        }
    }

    if (lang != "") return lang;
    // Fallback to default language...
    lang = "en-US";

    return lang;
}




function hideFlash() {
    // Handle IE-flashes
    jQuery('object').each(function () {
        if (!(jQuery(this).hasClass('overlayHidden'))) {
            if (jQuery(this).children("PARAM[name='wmode'][value='transparent']").length == 0) {
                var height = "" + jQuery(this).attr('height');
                if (height.toLowerCase().indexOf("px") < 0)
                    height = height + "px";

                jQuery(this).css({ 'height': '0px', 'margin-bottom': height }).addClass('overlayHidden');
            }
        }

    });


    // Handle FF-flashes
    jQuery('embed').each(function () {
        if (!(jQuery(this).hasClass('overlayHidden'))) {
            if (jQuery(this).attr("wmode") != "transparent") {
                var height = "" + jQuery(this).attr('height');
                if (height.toLowerCase().indexOf("px") < 0)
                    height = height + "px";
                jQuery(this).css({ 'height': '0px', 'margin-bottom': height }).addClass('overlayHidden');
            }
        }
    });
}

function showFlash() {
    // Handle IE-flashes
    jQuery('object').each(function () {
        if (jQuery(this).hasClass('overlayHidden')) {
            if (jQuery(this).children("PARAM[name='wmode'][value='transparent']").length == 0) {
                var height = jQuery(this).css('margin-bottom');
                jQuery(this).css({ 'height': height, 'margin-bottom': '0px' }).removeClass('overlayHidden');
            }
        }
    });

    // Handle FF-flashes
    jQuery('embed').each(function () {
        if (jQuery(this).hasClass('overlayHidden')) {
            if (jQuery(this).attr("wmode") != "transparent") {
                var height = jQuery(this).css('margin-bottom');
                jQuery(this).css({ 'height': height, 'margin-bottom': '0px' }).removeClass('overlayHidden');
            }
        }
    });
}

function bindModalOverlay() {
    jQuery('a.modalOverlay').bind('mousedown',
    function () {
        hideFlash();
        window.allowIframe = true;
    }).ghcolorbox({
        iframe: true,
        width: 890,
        height: 595,
        speed: 300,
        transition: "elastic",
        overlayClose: false,
        initialWidth: 45,
        initialHeight: 30,
        opacity: 0.75,
        arrowKey: false,
        onClosed: showFlash,
        scrolling: false
    });
}

jQuery(document).ready(function () {
    // body Class
    jQuery('body').addClass("G" + globalContext.cultureInfo.Name.toLowerCase().replace("-", ""));    
    bindModalOverlay();
    jQuery('a.modalOverlayChangeRegion').bind('mousedown',
    function () {
        hideFlash();
        window.allowIframe = true;
    }).ghcolorbox({
        iframe: true,
        width: 570,
        height: 573,
        speed: 300,
        transition: "elastic",
        overlayClose: false,
        initialWidth: 45,
        initialHeight: 30,
        opacity: 0.75,
        arrowKey: false,
        onClosed: showFlash
    });

    jQuery('a.modalOverlayFlashMovie').bind('mousedown',
    function () {
        hideFlash();
        window.allowIframe = true;
    }).ghcolorbox({
        iframe: true,
        width: 690,
        height: 590,
        speed: 300,
        transition: "elastic",
        overlayClose: false,
        initialWidth: 45,
        initialHeight: 30,
        opacity: 0.75,
        arrowKey: false,
        onClosed: showFlash
    });

    // Search functionality
    var se = jQuery('#globalHeader input');
    var sv = jQuery('#globalHeader input').attr('value');
    var sb = jQuery('#globalHeader button');

    //Search text hide/show
    se.focus(function () {
        if (jQuery(this).attr('value') == sv)
            jQuery(this).attr('value', '');
    });
    se.blur(function () {
        if (jQuery(this).attr('value') == "")
            jQuery(this).attr('value', sv);
    });
    // Handle Enterkey in searchbox
    se.keypress(function (e) {
        if (e.keyCode == "13") {
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
            try { window.event.returnValue = false; } catch (e) { }
            doSearch(sv);
        }
    });


    // Handle Button click for search
    sb.click(function () {
        doSearch(sv);
        return false;
    });
});

function doSearch(defaultText) {

    var str = jQuery('#globalHeader input').attr('value');
    jQuery('#globalHeader input').attr('value', defaultText);
    if (str == defaultText) str = "";
    var surl = 'http://search.lego.com/searchResults.asp?q=';
    window.location = surl + escape(str);
    return false;
}
