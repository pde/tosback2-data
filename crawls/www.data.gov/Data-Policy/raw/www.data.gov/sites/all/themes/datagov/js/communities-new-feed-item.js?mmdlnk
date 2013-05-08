/**
 * Created with JetBrains PhpStorm.
 * User: christian.manalansan
 * Date: 10/10/12
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 */

(function ($) {

    $(document).ready(function() {
        var week_ago_date = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7));
        $('body.datagov-community #comCatPan .views-row .new-label').each(function() {
            var this_date = new Date(parseInt($(this).children('.field-content:first').html()) * 1000);
            if (this_date > week_ago_date) {
                $(this).html('NEW');
                $(this).show();
            }
        })
    });
})(jQuery);
