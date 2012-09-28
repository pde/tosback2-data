jQuery(function ($) {
    $('#globalNavigation').find('.globalNavigation li').hoverIntent(function () {
        var bgLoc = ($(this).width() / 2) - 8;
        var div = $(this).find('div.flyout').css('backgroundPosition', bgLoc + 'px 0px')

        if ($.browser.msie && parseInt($.browser.version) < 9) {
            div.css('top', '18px');  //workaround PIE.htc slow rendering issue
        } else {
            div.show();
        }
    },
    function () {
        var div = $(this).find('div.flyout')

        if ($.browser.msie && parseInt($.browser.version) < 9) {
            div.css('top', '-1000px');  //workaround PIE.htc slow rendering issue
        } else {
            div.hide();
        }
    })
});