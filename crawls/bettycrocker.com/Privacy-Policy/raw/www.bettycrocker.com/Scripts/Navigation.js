jQuery(document).ready(function () {
    jQuery('#globalNavigation').find('.globalNavigation li').hoverIntent(
        function () {
            var bgLoc = (jQuery(this).width() / 2) - 8;
            var div = jQuery(this).find('div.flyout').css('backgroundPosition', bgLoc + 'px 0px')
            div.show();
        },
        function () {
            jQuery(this).find('div.flyout').hide();
        }
    );
});