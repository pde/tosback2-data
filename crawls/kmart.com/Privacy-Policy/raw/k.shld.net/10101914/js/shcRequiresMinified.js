$(function() {
	// this file will NOT contain business logic.  It will only contain calls to load other code based on requirements for a page.
	var js = [], css = [];


	switch ($('body').attr('id')) {
		case 'home':
			/*js.push('js/emailMe');*/
			break;
		case 'product':
						
			js.push('js/productDeferredCombined');
			
			break;
	}

	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });