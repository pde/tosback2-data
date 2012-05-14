 
var sd_timeout    = 200;
var sd_closetimer = 0;
var sd_ddmenuitem = 0;
var sd_primaryitem = 0;

function simple_dropdown_open(){

	simple_dropdown_canceltimer();
	simple_dropdown_close();
	sd_ddmenuitem = jQuery(this).find('ul').css('visibility', 'visible');
	jQuery(this).addClass("active");
	
	
	// special case for inbox nav and primary nav collision
	if ( ((jQuery(this).parents('ul').attr('id') == 'gh-secondary-nav-inbox')) && ( (jQuery.browser.msie) > 0 ) ) {
		jQuery('.sf-menu li,.sf-menu li a').css('z-index', '-1');
		jQuery('#gh-primary-nav-search-inner').css({
			position: 'relative',
			'z-index': '-2'
		});
	}
}

function simple_dropdown_close(xxx)
{  
	if (sd_ddmenuitem) {
		sd_ddmenuitem.css('visibility', 'hidden');
		sd_primaryitem.removeClass("active");
	}
}

function simple_dropdown_timer()
{   sd_primaryitem = jQuery(this);
	sd_closetimer = window.setTimeout(simple_dropdown_close, sd_timeout);

		if ((jQuery(this).parents('ul').attr('id') == 'gh-secondary-nav-inbox')) {
			jQuery('.sf-menu li,.sf-menu li a').css('z-index', '900'); //999999
                        jQuery('#gh-primary-nav-search-inner').css({
                            position: 'static',
                            'z-index': '1'
			});
		}
   	
}

function simple_dropdown_canceltimer()
{  if(sd_closetimer)
   {  window.clearTimeout(sd_closetimer);
      sd_closetimer = null;}}

jQuery(document).ready(function()
{  jQuery('.simple-dropdown > li').bind('mouseover', simple_dropdown_open)
   jQuery('.simple-dropdown > li').bind('mouseout',  simple_dropdown_timer)
});
 