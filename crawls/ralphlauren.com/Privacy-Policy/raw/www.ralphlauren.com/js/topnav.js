// JavaScript Document
if (Object.isUndefined(ess))
    var ess = {};

ess.LTrim = function(value) {
    var re = /^\s*/;
    return value.replace(re, '');
}
ess.RTrim = function(value) {
    var re = /\s*$/;
    return value.replace(re, '');
}
ess.trim = function(value) {
    return ess.LTrim(ess.RTrim(value));
}

ess.objectSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



// Onload Functionality
jQuery(document).ready(function() {



	//Nav Styles
	ess.clearFlyouts = function() {
	    jQuery("li.men, li.women, li.home, li.rugby, li.world").each(function(i) {
            flyout = jQuery(this).find("div").eq(0);
            flyout.stop(true, true);
            flyout.hide();
        });
	}
	ess.topNavSlideDown = function() {
        var subMenu = jQuery(this).find("div").eq(0);
        //console.log('Hover-on: flyout|'+jQuery(this).attr('id'));
        subMenu.stop(true, true);
        if (subMenu.css('display') != 'block') {
            ess.clearFlyouts();
            subMenu.delay(200).animate({ height: ['show'] }, {queue:false, duration:  500 });
			subMenu.find("ul.off").removeClass("off");
        }
    }

    ess.topNavSlideUp = function() {
        var subMenu = jQuery(this).find("div").eq(0);
        //console.log('Hover-off: flyout|'+jQuery(this).attr('id'));
        subMenu.stop(true, true);
        subMenu.delay(700).animate({ height: ['hide'] }, {queue:false, duration: 300, 
            complete: function() {
                jQuery(this).find("ul.off").removeClass("off");
            }
        });
    }

    jQuery("li.men, li.women, li.home, li.rugby, li.world").hoverIntent(ess.topNavSlideDown, ess.topNavSlideUp);

	//Prevent RL Worl from linking out
	
	jQuery("li.world a:first").click(function(e){
		e.preventDefault();
	});
	
	//Default images for top level categories
	jQuery("li.men a:first").mouseenter(function(){
		jQuery(this).find('a:first').addClass("actMen-1760781");
		jQuery("li.men").find(".superfly").eq(0).show();
		jQuery("li.men").find(".superfly").eq(0).css('background-image','url(/images/3d-men-shopall_920x245.jpg)');

	}).mouseleave(function(){
			jQuery(this).find(".superfly").eq(0).hide();
			jQuery(this).find('a:first').removeClass("actMen-1760781");
	});
	jQuery("li.women a:first").mouseenter(function(){
		jQuery(this).find('a:first').addClass("actWomen-1760782");
		jQuery('li.women').find(".superfly").eq(0).css('background-image','url(/images/3d-women-shopall_920x245.jpg)');
		jQuery('li.women').find(".superfly").eq(0).show();
	}).mouseleave(function(){
			jQuery(this).find(".superfly").eq(0).hide();
			jQuery(this).find('a:first').removeClass("actWomen-1760782");
	});
	jQuery("li.home a:first").mouseenter(function(){
		jQuery(this).find('a:first').addClass("actHome-1760785");
		jQuery('li.home').find(".superfly").eq(0).css('background-image','url(/images/3d-home-shopall_920x245.jpg)');
		jQuery('li.home').find(".superfly").eq(0).show();
	}).mouseleave(function(){
			jQuery(this).find(".superfly").eq(0).hide();
			jQuery(this).find('a:first').removeClass("actHome-1760785");
	});
	jQuery("li.world a:first").mouseenter(function(){
		jQuery(this).find('a:first').addClass("actWorld-11739988");
		jQuery('li.world').find(".superfly").eq(0).css('background-image','url(/images/3d-worl-mag_920x245.jpg)');
		jQuery('li.world').find(".superfly").eq(0).show();
	}).mouseleave(function(){
			jQuery(this).find(".superfly").eq(0).hide();
			jQuery(this).find('a:first').removeClass("actWorld-11739988");
	});
	jQuery("li.rugby").mouseenter(function(){
		jQuery(this).find('a:first').addClass("color666");
		jQuery(this).find(".superfly").eq(0).css('background-image','url(/images/3d-rugby_920x272.jpg)');
		jQuery(this).find(".superfly").eq(0).show();
	}).mouseleave(function(){
			jQuery(this).find(".superfly").eq(0).hide();
			jQuery(this).find('a:first').removeClass("color666");
	});
	//Flyout images
    jQuery(".flyOutList").hover(
        function () {
			var highlightDiv = jQuery(this).find(".superfly").eq(0);
			if (!highlightDiv.is(':visible'))
			{
				switch(jQuery(this).attr('id'))
				{
						
						// Men's categories
				
					case 'flynavId-1760781_allBrands':
						jQuery('#d3-1760781_allBrands').css('background-image','url(/images/3d-men-shopall_920x245.jpg)').show();
					break;
					case 'flynavId-2885938':
						jQuery('#d3-2885938').css('background-image','url(/images/3d-men-purple_920x245.jpg)').show();
					break;
					case 'flynavId-2871712':
						jQuery('#d3-2871712').css('background-image','url(/images/3d-men-black_920x245.jpg)').show();
					break;
					case 'flynavId-1766205':
						jQuery('#d3-1766205').css('background-image','url(/images/3d-men-prl_920x245.jpg)').show();
					break;
					case 'flynavId-10887116':
						jQuery('#d3-10887116').css('background-image','url(/images/3d-men-rlx_920x245.jpg)').show();
					break;
					case 'flynavId-11757743':
						jQuery('#d3-11757743').css('background-image','url(/images/3d-men-rrl_920x245.jpg)').show();
					break;	
					case 'flynavId-11757742':
						jQuery('#d3-11757742').css('background-image','url(/images/3d-men-denim_920x245.jpg)').show();
					break;	
					case 'flynavId-1995989':
						jQuery('#d3-1995989').css('background-image','url(/images/3d-men-bigtall_920x245.jpg)').show();
					break;
					case 'flynavId-1795710':
						jQuery('#d3-1795710').css('background-image','url(/images/3d-men-golf_920x245.jpg)').show();
					break;
					case 'flynavId-2365312':
						jQuery('#d3-2365312').css('background-image','url(/images/3d-men-tennis_920x245.jpg)').show();
					break;
				//Women categories
					case 'flynavId-1760782_allBrands':
						jQuery('#d3-1760782_allBrands').css('background-image','url(/images/3d-women-shopall_920x245.jpg)').show();
					break;
					case 'flynavId-4471606':
						jQuery('#d3-4471606').css('background-image','url(/images/3d-women-collection_920x245.jpg)').show();
					break;
				/*	-- Removed Collection Denim
					case 'flynavId-11757746':
						jQuery('#d3-11757746').css('background-image','url(/images/3d-women-collectiondenim_920x245.jpg)').show();
					break;
				*/	
					case 'flynavId-1766615':
						jQuery('#d3-1766615').css('background-image','url(/images/3d-women-black_920x245.jpg)').show();
					break;
					case 'flynavId-1766616':
						jQuery('#d3-1766616').css('background-image','url(/images/3d-women-blue_920x245.jpg)').show();
					break;
				/*	-- Removed Pink Pony	
					case 'flynavId-1870143':
						jQuery('#d3-1870143').css('background-image','url(/images/3d-women-pinkpony_920x245.jpg)').show();
					break;
				*/	
					case 'flynavId-10848464':
						jQuery('#d3-10848464').css('background-image','url(/images/3d-women-rlx_920x245.jpg)').show();
					break;
					case 'flynavId-1766613':
						jQuery('#d3-1766613').css('background-image','url(/images/3d-women-lauren_920x245.jpg)').show();
					break;
					case 'flynavId-11757744':
						jQuery('#d3-11757744').css('background-image','url(/images/3d-women-denim_920x245.jpg)').show();
					break;
					case 'flynavId-1766618':
						jQuery('#d3-1766618').css('background-image','url(/images/3d-women-golf_920x245.jpg)').show();
					break;
					case 'flynavId-2365313':
						jQuery('#d3-2365313').css('background-image','url(/images/3d-women-tennis_920x245.jpg)').show();
					break;
				//World of Ralph Lauren categories
				/* --Removed World of Ralph Lauren
					case 'flynavId-11739990':
						jQuery('#d3-11739990').css('background-image','url(/images/3d-worl-worl_920x245.jpg)').show();
					break;
				*/	
					case 'flynavId-11739992':
						jQuery('#d3-11739992').css('background-image','url(/images/3d-worl-mag_920x245.jpg)').show();
					break;
					case 'flynavId-11739991':
						jQuery('#d3-11739991').css('background-image','url(/images/3d-worl-tv_920x245.jpg)').show();
					break;
					case 'flynavId-11740000':
						jQuery('#d3-11740000').css('background-image','url(/images/3d-worl-watches_920x245.jpg)').show();
					break;
					case 'flynavId-11739994':
						jQuery('#d3-11739994').css('background-image','url(/images/3d-worl-giftvault_920x245.jpg)').show();
					break;
					case 'flynavId-11739995':
						jQuery('#d3-11739995').css('background-image','url(/images/3d-worl-flagship_920x245.jpg)').show();
					break;
					case 'flynavId-11739996':
						jQuery('#d3-11739996').css('background-image','url(/images/3d-worl-restaurants_920x245.jpg)').show();
					break;
					
				//Home categories
					case 'flynavId-1760785_allBrands':
						jQuery('#d3-1760785_allBrands').css('background-image','url(/images/3d-home-shopall_920x245.jpg)').show();
					break;
					case 'flynavId-2184721':
						jQuery('#d3-2184721').css('background-image','url(/images/3d-home-rlhome_920x245.jpg)').show();
					break;
					case 'flynavId-2257935':
						jQuery('#d3-2257935').css('background-image','url(/images/3d-home-lauren_920x245.jpg)').show();
					break;

				}				
			}
			

		}, function(){
			var highlightDiv = jQuery(this).find(".superfly").eq(0);
			if (jQuery(this).attr('id')=="flynavId-1760781_allBrands"){
				jQuery('#d3-1760781_allBrands').css('background-image','url(/images/3d-men-shopall_920x245.jpg)').show();
			}
			else if (jQuery(this).attr('id')=="flynavId-1760782_allBrands"){
				jQuery('#d3-1760782_allBrands').css('background-image','url(/images/3d-women-shopall_920x245.jpg)').show();
			}
			else if (jQuery(this).attr('id')=="flynavId-1760785_allBrands"){
				jQuery('#d3-1760785_allBrands').css('background-image','url(/images/3d-home-shopall_920x245.jpg)').show();
			}
			else if (jQuery(this).attr('id')=="flynavId-11739992"){
						jQuery('#d3-11739992').css('background-image','url(/images/3d-worl-mag_920x245.jpg)').show();
			}
			else if (jQuery(this).attr('id')=="flynavId-Rugby"){
						jQuery('#d3-Rugby').css('background-image','url(/images/3d-rugby_920x272.jpg)').show();
			}
			else{
			highlightDiv.css('background-image','none').hide();
			}
		}
    );
	jQuery(".superfly").hover(
			function () { jQuery(this).parent().parent().parent().addClass("off");            },
			function () {  jQuery(this).parent().parent().parent().addClass("off");           }
	);
	jQuery("#sign-up-box").click(function(){
		if(this.value=='YOUR EMAIL ADDRESS' || this.value == 'INCORRECT EMAIL ADDRESS' 
			|| this.value == 'THANK YOU' || this.value == 'YOUR E-MAIL'){
			this.value='';
		}
	})
	
});

jQuery(function () {
	/* in site.js */
	if (typeof attachStickyView == 'function') {
		attachStickyView();
	}
});