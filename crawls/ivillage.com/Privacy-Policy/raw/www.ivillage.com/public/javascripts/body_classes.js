//----------------------------------------------------------------------------
// FOR REFERENCE ONLY
//
// The functioning version of this is found in:
//     /application/views/layouts/_body_classes.haml
//----------------------------------------------------------------------------
(function ($) {
    var body = $('body');
    body.addClass('has-js');
    if ($.browser.msie) {
        body.addClass('msie');
        var version = parseInt($.browser.version, 10);
        if (version < 7) {
            body.addClass('ie6');
        } else if (version === 7) {
            body.addClass('ie7')
        } else if (version < 9) {
            body.addClass('ie8')
        }
    }
})(jQuery);