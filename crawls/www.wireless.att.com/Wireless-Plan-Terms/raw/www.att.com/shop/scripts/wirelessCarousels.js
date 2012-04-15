	var carousel1HasLoaded = false;
		var carousel2HasLoaded = false;
		var categoryIdArray1 = ['cat2480047','cat2480045','cat2480049','cat2480052'];  // default category Ids for carousel 1
		var categoryIdArray2 = ['cat2480054'];  // default category Id for carousel 2
		
		var inputArray1 = jQuery('input[name="carouselCat1"]');
		if (inputArray1 != null && inputArray1.size() > 0) {
			categoryIdArray1 = new Array();
			inputArray1.each(function() {
				categoryIdArray1.push((jQuery(this).val().split(':'))[1]);
			});
		}
		//console.log('categoryIdArray1 = ' + categoryIdArray1.toString());
		
		var inputArray2 = jQuery('input[name="carouselCat2"]');
		if (inputArray2 != null && inputArray2.size() > 0) {
			categoryIdArray2 = new Array();
			categoryIdArray2[0] = (inputArray2.val().split(':'))[1];
		}
		//console.log('categoryIdArray2= ' + categoryIdArray2.toString());
		
		function wirelessCarousel1_itemLoadCallback(carousel, state)
		{
		    if (state != 'init' || carousel1HasLoaded == true)
		        return;
		    var initCatId = categoryIdArray1[0];
		    jQuery.get('/shop/wireless/fragments/carousels/carousel_1_contents.jsp?categoryId=' + initCatId, function(data) {
		        wirelessCarousel1_itemAddCallback(carousel, carousel.first, carousel.last, data);
		    });
		    jQuery('#carousel1ContentSelector li').eq(0).addClass('forcedOrange');
		    carousel1HasLoaded = true;
		};
		function wirelessCarousel1_itemAddCallback(carousel, first, last, data)
		{
			data = jQuery.trim(data);
			if (data.length > 0) {
		   		var carouselContents = jQuery(data).filter('div');
			    for (var x=0; x < carouselContents.length; x++) {
				    carousel.add(x+1, carouselContents[x]);
			    }
		    } else {
		    	carousel.add(1, '<div></div>');
		    }
			var numItems = jQuery('#wirelessCarousel1 > li');
		    carousel.size(numItems.length);
		};
		function wirelessCarousel2_itemLoadCallback(carousel, state)
		{
		    if (state != 'init' || carousel2HasLoaded == true)
		        return;
		    var initCatId = categoryIdArray2[0];
		    jQuery.get('/shop/wireless/fragments/carousels/carousel_2_contents.jsp?categoryId=' + initCatId, function(data) {
		        wirelessCarousel2_itemAddCallback(carousel, carousel.first, carousel.last, data);
		    });
		    //jQuery('#carousel2ContentSelector a').eq(0).addClass('forcedOrange');
		    carousel2HasLoaded = true;
		};
		function wirelessCarousel2_itemAddCallback(carousel, first, last, data)
		{
			data = jQuery.trim(data);
			if (data.length > 0) {
		    	var carouselContents = jQuery(data).filter('div');
			    for (var x=0; x < carouselContents.length; x++) {
				    carousel.add(x+1, carouselContents[x]);
			    }
		    } else {
		    	carousel.add(1, '<div></div>');
		    }
			var numItems = jQuery('#wirelessCarousel2 > li');
		    carousel.size(numItems.length);
		};
		function setCarousel_1_Content(catId)
		{
			var contentFile = '/shop/wireless/fragments/carousels/carousel_1_contents.jsp?categoryId=' + catId;
			var carousel = jQuery('#wirelessCarousel1').data('jcarousel');
			carousel.reset();
			jQuery.get(contentFile, function(data) {
		        wirelessCarousel1_itemAddCallback(carousel, carousel.first, carousel.last, data);
		    });
		}

		jQuery.noConflict();
		jQuery(document).ready(function() {
			jQuery('#carousel1ContentSelector a').each(function(i) {
				jQuery(this).bind('click', {index:i}, function(e){
					jQuery('#carousel1ContentSelector li.forcedOrange').removeClass('forcedOrange');
					jQuery(this).parent().addClass('forcedOrange');
					var categoryId = categoryIdArray1[parseInt(e.data.index)];
					setCarousel_1_Content(categoryId);
					e.preventDefault();;
				});
			}); 
			jQuery('#wirelessCarousel1').jcarousel({
		       itemLoadCallback: wirelessCarousel1_itemLoadCallback,
		       scroll: 1,
		       itemFallbackDimension: 275
		    });
		    jQuery('#wirelessCarousel2').jcarousel({
		       itemLoadCallback: wirelessCarousel2_itemLoadCallback,
		       scroll: 1,
		       itemFallbackDimension: 412
		    });
		});