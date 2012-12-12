$(function() {
	var js = [], css = [];
	switch ($('body').attr('id')) {
		case 'home':
			/*js.push('shared/js/emailMe');*/
			break;
		case 'product':
			if(typeof HL3 != "undefined" && HL3=='true'){
				js.push('shared/js/consistentCartModal','shared/js/emailMe');		
				js.push('shared/js/mapPrice','shared/js/highlightFade','js/productUpsell','js/mpBadge');		
				//ECOM-265295
				if($('#customerReviews').length > 0 || $('#reviewDetails').length > 0){
					js.push('shared/js/viewsmod','shared/js/ratingsReviews_read','shared/js/shcInlineValidation');
				}
				//Added as a part of ECOM-255767/ECOM-263251
				if (vName==='Appliances') {
					   js.push('http://static.ecorebates.com/sears/sears');
				}
				if(typeof socialButtonEnabled !== 'undefined' && socialButtonEnabled === 'true'){
					js.push('js/social_pdp');
				}
			}else if(typeof SL3!= "undefined" && SL3 == 'true'){
				js.push('shared/js/consistentCartModal','js/alerts');		
				js.push('js/mpBadge','shared/js/mapPrice','shared/js/highlightFade');
				//ECOM-265295
				if($('#customerReviews').length > 0 || $('#reviewDetails').length > 0){
					js.push('shared/js/viewsmod','shared/js/ratingsReviews_read','shared/js/shcInlineValidation');
				}
				if(typeof socialButtonEnabled !== 'undefined' && socialButtonEnabled === 'true'){
					js.push('js/social_pdp');
				}
			}
			break;
		case 'subcategory':
		case 'keysearch':js.push('js/alerts','shared/js/emailMe','shared/js/consistentCartModal','shared/js/browseSoftSwatch','shared/js/quickViewActions','shared/js/qvImgZoom');
			break;
		case 'category' :
			js.push('shared/js/mapPrice','shared/js/specialNavigation','shared/js/loadCommunityRSS');
			break;
		case 'vertical' :
			js.push('shared/js/mapPrice','shared/js/consistentCartModal','shared/js/loadCommunityRSS','shared/js/specialNavigation');
			break;
		case 'MML_vertical' :
			js.push('shared/js/mapPrice','shared/js/consistentCartModal','shared/js/loadCommunityRSS','shared/js/specialNavigation');
			break;
	}
	//applyCoupon.js loads for all pages in Sears and Kmart
	js.push('shared/js/applyCoupon.js');
	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });
