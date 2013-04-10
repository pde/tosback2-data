jQuery(function() {
    jQuery("ul.dropdown li").hover(function(){
        jQuery(this).addClass("hover");
        jQuery('ul:first',this).fadeIn('fast');
    }, function(){
        jQuery(this).removeClass("hover");
        jQuery('ul:first',this).fadeOut('fast');
    });
});