$(function(){

	var js = [], css = [];


	switch ($('body').attr('id')) {
		case 'home':
			js.push('js/share_beta','js/UniversalLists/saveToList','js/jquery.truncate','js/bloomreach',
					'shared/js/modalLogin','shared/js/FSRsurvey','shared/js/RecentActivity','shared/js/shcInlineValidation');
			break;
		case 'product':
			if(typeof HL3 != "undefined" && HL3=='true'){
				js.push('shared/js/consistentCartModal','shared/js/emailMe');		
				js.push('shared/js/mapPrice','shared/js/highlightFade','js/productUpsell','js/mpBadge','shared/js/shcInlineValidation');
				//ECOM-265295
				if($('#customerReviews').length > 0 || $('#reviewDetails').length > 0){
					js.push('shared/js/viewsmod','shared/js/ratingsReviews_read');
				}
				//Added as a part of ECOM-255767/ECOM-263251
				if(vName === 'Appliances') {
					   js.push('http://static.ecorebates.com/sears/sears');
				}
				if(typeof socialButtonEnabled !== 'undefined' && socialButtonEnabled === 'true'){
					js.push('js/social_pdp');
				}
			}else if(typeof SL3!= "undefined" && SL3 == 'true'){
				js.push('shared/js/consistentCartModal','js/alerts');		
				js.push('js/mpBadge','shared/js/mapPrice','shared/js/highlightFade','shared/js/shcInlineValidation');
				//ECOM-265295
				if($('#customerReviews').length > 0 || $('#reviewDetails').length > 0){
					js.push('shared/js/viewsmod','shared/js/ratingsReviews_read');
				}
				if(typeof socialButtonEnabled !== 'undefined' && socialButtonEnabled === 'true'){
					js.push('js/social_pdp');
				}
				
			}
			break;
		case 'subcategory':js.push('shared/js/EI5Toolbar');
		case 'keysearch':js.push('shared/js/shcInlineValidation');
			js.push('shared/js/browseSoftSwatch','shared/js/quickViewActions','shared/js/qvImgZoom','js/alerts','shared/js/emailMe','shared/js/consistentCartModal','shared/js/EI5Toolbar');
						break; 
		case 'category' :
			js.push('shared/js/mapPrice','shared/js/specialNavigation','shared/js/shcInlineValidation','shared/js/loadCommunityRSS','js/freeShippingSellerFilter');
			break;
		case 'vertical' :
			js.push('shared/js/specialNavigation','shared/js/shcInlineValidation','shared/js/mapPrice','shared/js/loadCommunityRSS','js/freeShippingSellerFilter','shared/js/consistentCartModal');
			break;
		case 'MML_vertical' :
			js.push('shared/js/specialNavigation','shared/js/shcInlineValidation','shared/js/mapPrice','shared/js/loadCommunityRSS','js/freeShippingSellerFilter','shared/js/consistentCartModal');
			break;
	}
	//applyCoupon.js loads for all pages in Sears and Kmart
	js.push('shared/js/applyCoupon');
	if($('body').attr('id') != 'home'){
		js.push('shared/js/productpage/thirdPartyCarouselHandle');
	}	
	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });
