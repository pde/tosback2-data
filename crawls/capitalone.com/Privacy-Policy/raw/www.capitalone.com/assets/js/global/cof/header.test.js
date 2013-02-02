if( typeof Cof == 'undefined' )
    Cof = {};

Cof.Header.PrimaryNav = function() {

    jQuery.elReady('#nav-primary', function() {
		Cof.Header.PrimaryNav.Render();
    });
};


Cof.Header.PrimaryNav.Render = function() {
	 jQuery('#page-body-wrapper').before('<a name="page-body"></a>');
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
		){
			jQuery('li.supersubs a').click(function(){
				
				if(jQuery(this).parents().hasClass('sfHover')){
					return true;
				} else {
					jQuery('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
					jQuery(this).parent().addClass('sfHover').find('div.row').slideDown('medium');
					return false;
				}
			});
			document.addEventListener('touchstart', function(event) {
				var touched = jQuery(event.target);
				
				if(!touched.parents().hasClass('sfHover')){
					jQuery('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
				}
			}, false);
		} else {
			jQuery('.account-access a').focus(function(){
				jQuery(this).parents('.account').addClass('accessAccountOver');
			}).blur(function(){
				jQuery(this).parents('.account').removeClass('accessAccountOver');
			});
			jQuery('li.supersubs').hoverIntent({    
				over: function(){
					if(!jQuery(this).hasClass('sfHover')){
						jQuery('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
						jQuery(this).addClass('sfHover').find('div.row').slideDown('medium');
					}
				}, 
				timeout: 500, 
				out: function(){
					jQuery(this).removeClass('sfHover').find('div.row').slideUp('fast');
				}
			});
			jQuery('li.supersubs > a').keyup(function(e){
				if (e.keyCode == 9) {
					jQuery(this).parent().removeClass('sfHover').find('div.row').slideUp('fast');
					jQuery('.acc-expand-supers:visible').hide();
					jQuery(this).parent().find('.acc-expand-supers').show();
				}
			});
			jQuery('.acc-expand-supers a').blur(function(){
				jQuery(this).parent().hide();
			}).click(function(){
				jQuery(this).parents('li').addClass('sfHover').find('div.row').slideDown('medium');
				jQuery(this).parent().hide();
				return false;
			});
			jQuery('a, input').focus(function(){
				if(!jQuery(this).parents().hasClass('sfHover')){
					jQuery('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
				}
				if(!jQuery(this).parents().hasClass('supersubs')){
					jQuery('.acc-expand-supers').hide();
				}
			});
			jQuery(document).click(function(e){
				jQuery('.acc-expand-supers:visible').hide();
				var clicked = jQuery(e.target);
				if(!clicked.parents().hasClass('sfHover')){
					jQuery('.sfHover').removeClass('sfHover').find('div.row').slideUp('fast');
				}
			});
		}
		
        var navEntries = jQuery("#nav-primary > li");

        // "hack" for the "For Business" primary nav item regionalization
        navEntries.children("a[href^='/small-business']").add(navEntries.children("a[href^='/bank/business']")).click(function() {
            // add a cookie so we know that "For Business" was clicked
            jQuery.cookie("forbusiness", "true", {path : '/', domain: '.capitalone.com'});
        });
};
jQuery(document).ready(function() {
	// Run PrimaryNav
	Cof.Header.PrimaryNav();
});
