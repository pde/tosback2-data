/*
Version: 1.0.4
Notes: Prepared for Sitecore implementation incl. portal pages (new setup)
*/
jQuery(document).ready(function () {
    var ww = jQuery(window).width();
    var ssw = 950;
    var gw = jQuery('#globalWrapper, #wallpaper');
    var gfw = jQuery('#GFwrapper');
    var gsg = jQuery('#GHwrapper, #site, #GFwrapper');
    var w = jQuery('#globalWrapper, #wallpaper, #GHwrapper, #GFwrapper');
    var gf = jQuery('#globalFooter');
    var s = jQuery('#site');
    var h = jQuery('html');
    var y = jQuery('#GFwrapper').height();

    //Make room for footer
    s.css('padding-bottom', y + 'px');
    gfw.css({ 'position': 'absolute', 'bottom': '0px' });

    //Define width of window
    if (ww < ssw) {
        initialSize();
    } else {
        resized();
    }

    //If browser is resized
    jQuery(window).resize(function () {
        var wns = $(window).width();
        if (wns < ssw) {
            initialSize();
        } else {
            resized();
            w.css('width', '100%');
            return false;
        }
    });

    function initialSize() {
        h.css('overflow-x', 'scroll');
        gw.css({
            'width': ssw + 'px',
            'overflow': 'hidden'
        });
        gsg.css('width', ssw + 'px');
        gf.css('overflow', 'hidden');
    }

    function resized() {
        h.css('overflow-x', 'hidden');
        gf.css('overflow', 'visible');
    }

});
