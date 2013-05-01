/**
 * Created with JetBrains PhpStorm.
 * User: christian.manalansan
 * Date: 10/10/12
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * The 'Community Blogs' View does not give me the proper URL for 'Add New Comment,' so this postprocessor
 * reassigns the URL based on another link that is working correctly
 */

(function ($) {
    $(document).ready(function() {
        $('.view-display-id-ogpl_community_blogs_pane .views-row').each(function() {
            var targetUrl = $(this).find('.comment-bubble-container a:first').attr('href');
            $(this).find('.comment-add a').attr('href', targetUrl);
        });
    });
})(jQuery);