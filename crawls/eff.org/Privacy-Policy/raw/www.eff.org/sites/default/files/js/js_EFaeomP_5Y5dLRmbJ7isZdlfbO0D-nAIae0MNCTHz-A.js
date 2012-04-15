(function ($) {
   Drupal.behaviors.no_has_js = {
    attach: function (context, settings) {
      // remove 'js enabled' cookie
      document.cookie = 'has_js=1; expires=Fri, 19 Nov 1978 05:00:00 GMT; path=/';
     }
   }
})(jQuery);
;
