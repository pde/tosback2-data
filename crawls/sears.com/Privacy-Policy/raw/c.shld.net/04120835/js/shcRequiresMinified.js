$(function() {
	// this file will NOT contain business logic.  It will only contain calls to load other code based on requirements for a page.
	var js = [], css = [];


	switch ($('body').attr('id')) {
		case 'home':js.push('js/homePageDeferredCombined');break;
		case 'product':
			if(typeof HL3 != "undefined" && HL3=='true'){
				js.push('js/productHL3DeferredCombined');				
				//ECOM-265295
				if($('#customerReviews').length || $('#reviewDetails').length){
					js.push('js/reviewsModCombined');
				}
				//Added as a part of ECOM-255767/ECOM-263251
				if(vName === 'Appliances') {
					   js.push('http://static.ecorebates.com/sears/sears');
				}
			}else if(typeof SL3!= "undefined" && SL3 == 'true'){
				js.push('js/productSL3DeferredCombined');				
				//ECOM-265295
				if($('#customerReviews').length || $('#reviewDetails').length){
					js.push('js/reviewsModCombined');
				}
				
			}else if(typeof bundleProductPage != 'undefined' && bundleProductPage == true){
				js.push('js/bundlesDeferredCombined');
			}
			
			//social_pdp has to be last, otherwise we risk blocking other important wiring.
			if (typeof isKiosk !== 'undefined' && isKiosk === 'true' && typeof SL3 !== "undefined" && SL3 === 'true') {
				//turning off social for kiosk/SL3 only - may be expanded
			}
			else {
			if(typeof socialButtonEnabled !== 'undefined' && socialButtonEnabled === 'true'){
				js.push('js/social_pdp');
			}
			}
			break;
			
		case 'categoryResearch': js.push('shared/js/categoryResearch'); //Fall through to Keyword Search for other Js files
		case 'subcategory'://Fall through to Keyword Search
		case 'keysearch':js.push('js/searchSubcatPageDeferredCombined');break;
		case 'category' :js.push('js/categoryPageDeferredCombined');break;
		case 'MML_vertical'://Fall through to Vertical
		case 'vertical' :js.push('js/verticalPageDeferredCombined');break;
		case 'compare' :js.push('js/comparePageDeferredCombined');break;
		
	}
	//these load for all pages in Sears and Kmart
	js.push('shared/js/applyCoupon', 'shared/js/shcGlobalTracking');
	
	if ($('body').attr('id') !== 'home'){
		js.push('shared/js/productpage/thirdPartyCarouselHandle');
	}	
	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });