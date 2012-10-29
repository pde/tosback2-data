
ATT.namespace('WirelessCarousels');

ATT.WirelessCarousels = new function() {
	
	var $ = jQuery;
	
	var setTabContent = this.setTabContent = function(carouselElement, catId) {
		var carouselClass = 'wirelessCarouselTypeTab';
		var ajaxURL = carouselElement.parents('.carouselWrapper').data('ajaxurl') + catId;
        var carousel = carouselElement.data('jcarousel');
        carousel.reset();
        $.get(ajaxURL, function(data) {
            ATT.WirelessCarousels.populate(carousel, carousel.first, carousel.last, data, carouselClass);
        });
	}
	
	var itemLoaded_common = this.itemLoaded_common = function(carousel, initCatId, carouselClass) {
		
		var ajaxURL = carousel.list.parents('.carouselWrapper').data('ajaxurl') + initCatId;
		$.get(ajaxURL, function(data) {
            ATT.WirelessCarousels.populate(carousel, carousel.first, carousel.last, data, carouselClass);
        });
        carousel.hasLoaded = 'true';
	}
	
	var typeTab_itemLoaded = this.typeTab_itemLoaded = function(carousel, state) {
		
		var carouselClass = 'wirelessCarouselTypeTab';
		if (state != 'init' || (typeof carousel.hasLoaded  != 'undefined' && carousel.hasLoaded == 'true'))
			return;
		var initCatId = carousel.list.parents('.carouselDiv').find('.carouselTabContentSelector > li > a').attr('class');
        ATT.WirelessCarousels.itemLoaded_common(carousel, initCatId, carouselClass);
        carousel.list.parents('.carouselDiv').find('.carouselTabContentSelector li').eq(0).addClass('forcedOrange');

	}
	
	var typeNoTab_itemLoaded = this.typeNoTab_itemLoaded = function(carousel, state) {
			
		var carouselClass = 'wirelessCarouselTypeNoTab';
		if (state != 'init' || (typeof carousel.hasLoaded  != 'undefined' && carousel.hasLoaded == 'true'))
			return; 
		var initCatId = carousel.list.parents('.carouselDiv').find('.carouselCatalogId').html();
		ATT.WirelessCarousels.itemLoaded_common(carousel, initCatId, carouselClass);

	}
	
	var typeNoBox_itemLoaded = this.typeNoBox_itemLoaded = function(carousel, state) {
			
		var carouselClass = 'wirelessCarouselTypeNoBox';
		if (state != 'init' || (typeof carousel.hasLoaded  != 'undefined' && carousel.hasLoaded == 'true'))
			return; 
		var initCatId = carousel.list.parents('.carouselDiv').find('.carouselCatalogId').html();
		ATT.WirelessCarousels.itemLoaded_common(carousel, initCatId, carouselClass);

	}
	
	var populate = this.populate = function(carousel, first, last, data, carouselClass) {
		
		if (jQuery('.' + carouselClass).data('jcarousel')) {
			var carouselContents = null;
			data = $.trim(data);
	        if (data.length > 0) {
	            carouselContents = $(data).filter('div');
	        }
	        if (!!carouselContents) {
	            for (var x=0; x < carouselContents.length; x++) {
	                carousel.add(x+1, carouselContents[x]);
	            }
	            carousel.size(carouselContents.length);
	            ATT.log('populated carousel for ' + carouselClass);
	        } else {
	            carousel.add(1, '<div></div>');
	            carousel.size(1);
	        }
	        
        } else {
        	// carousel element was reloaded, don't bother populating
        	ATT.log('carousel element was reloaded for ' + carouselClass + ', not bothering to populate');
        }
	}
	
	var setupTab = this.setupTab = function() {
			    
	     var tabCarousels = $('.wirelessCarouselTypeTab');  
	     if (!!tabCarousels) {
	     	     
		     tabCarousels.each(function() {
	        	$(this).parents('.carouselDiv').find('.carouselTabContentSelector a').each(function(i) {
	        		$(this).bind('click', {index:i}, function(e){
	        			e.preventDefault();
	        			$('.carouselTabContentSelector li.forcedOrange').removeClass('forcedOrange');
	                    $(this).parent().addClass('forcedOrange');
	                    var categoryId = $(this).attr('class');
	                    ATT.WirelessCarousels.setTabContent($(this).parents('.carouselDiv').find('.wirelessCarouselTypeTab'), categoryId);
	                });
	        	});
	        }); 
	        	           
			jQuery.when(ATT.util.pluginReady("jcarousel")).then(function() {
			
		        tabCarousels.jcarousel({
		           itemLoadCallback: ATT.WirelessCarousels.typeTab_itemLoaded,
		           initCallback: ATT.WirelessCarousels.typeTab_init,
		           setupCallback: ATT.WirelessCarousels.typeTab_setup,
		           scroll: 1,
		           itemFallbackDimension: 275
		        });
		        
	        });
        }
	}
	
	var setupNoTab = this.setupNoTab = function() {
			
		var notabCarousels = $('.wirelessCarouselTypeNoTab');
				
		if (!!notabCarousels) {
			jQuery.when(ATT.util.pluginReady("jcarousel")).then(function() {
		        notabCarousels.jcarousel({
		           itemLoadCallback: ATT.WirelessCarousels.typeNoTab_itemLoaded,
		           scroll: 1,
		           itemFallbackDimension: 412
		        });
	        });
        }
	}
	
	var setupNoBox = this.setupNoBox = function() {
			
		var noboxCarousels = $('.wirelessCarouselTypeNoBox');
				
		if (!!noboxCarousels) {
			jQuery.when(ATT.util.pluginReady("jcarousel")).then(function() {
		        noboxCarousels.jcarousel({
		           itemLoadCallback: ATT.WirelessCarousels.typeNoBox_itemLoaded,
		           scroll: 1,
		           itemFallbackDimension: 275
		        });
	        });
        }
	}
	
	
	var setup = this.setup = function() {	
				
		ATT.WirelessCarousels.setupTab();
		ATT.WirelessCarousels.setupNoTab();

	}
	
}

jQuery(document).ready(function() {
	    
	//ATT.WirelessCarousels.setup();
	// setupTab and setupNoTab to be called individually by ajaxed-in carousel code
    
	jQuery('.appCarousel').jcarousel({scroll: 1});

});
        
