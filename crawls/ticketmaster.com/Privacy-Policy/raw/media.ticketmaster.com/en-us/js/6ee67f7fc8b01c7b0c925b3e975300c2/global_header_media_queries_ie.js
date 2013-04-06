(function ($) {
    if(navigator.appVersion.match(/MSIE\s+(?:7|8)\./)) { 
        $(document).ready(function($) {
             var resizeTimer = null;
             global_header_adjust_ie();
             $(window).resize(function() {
                 if (typeof(resizeTimer) != null) {
                    clearTimeout(resizeTimer); // Clearing old timer to avoid unwanted resize calls.
                 }
                 resizeTimer = setTimeout(function() {
                      global_header_adjust_ie();
                 }, 200);
            });
        });
        
        function  global_header_adjust_ie() {
            if($("body").width() > 1024) {
                $(".require_ie_fix").each(function() {
                     $(this).addClass("ie_fix");
                });
               
            } else {
                $(".require_ie_fix").each(function() {
                    $(this).removeClass("ie_fix");
                });
            }
        }
    }
})(jQuery);

