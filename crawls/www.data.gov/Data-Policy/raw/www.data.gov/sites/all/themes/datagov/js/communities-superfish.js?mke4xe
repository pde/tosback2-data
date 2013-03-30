/**
 * Created with JetBrains PhpStorm.
 * User: christian.manalansan
 * Date: 10/10/12
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 *
 * Superfish uses inline styles to setup their menus. For the communities submenu, I need to override these styles.
 * Also, I want to add support for creating a multi-column megamenu
 */

(function ($) {

    $(document).ready(function() {
        // locate the <li> with its own submenu for 'communities', get the child <ul>
            var li_elements = $('#superfish-1 > li');
            var target_li;
            for (var i = 0; i < li_elements.length; i++) {
                var link_label = $(li_elements[i]).children('a:first').html().toLowerCase();
                if (link_label.substring(0, 11) == 'communities') {
                    target_li = li_elements[i];
                    break;
                }
            }
            $(target_li).css('width', '135px');
            var target_ul = $(target_li).children('ul');

        // set the position of the <ul>
        // TODO: dynamically set the css 'left' position based on number of columns
            $(target_ul).css('left', '-20px');

        // TODO: reorder <li> elements based on columns (e.g.: 1st column from top to bottom, then 2nd col, etc)

        // override the inline style of the child <li> elements - i.e.: individual community links
            li_elements = $(target_ul).children('li');
            for (var i = 0; i < li_elements.length; i++) {
                $(li_elements[i]).css('width', '155px');
            }
    });
})(jQuery);
