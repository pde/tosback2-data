$(function() {

	var js = [], css = [];


	switch ($('body').attr('id')) {
		case 'home':
			js.push('shared/js/emailMe');
			break;
		case 'product':
			if(typeof HL3 != "undefined" && HL3=='true'){
				js.push('shared/js/consistentCartModal','shared/js/emailMe');		
			}else if(typeof SL3!= "undefined" && SL3 == 'true'){
				js.push('shared/js/consistentCartModal','js/alerts');		
			}
			break;
		case 'subcategory':
		case 'keysearch':js.push('js/alerts','shared/js/emailMe','js/vam_popup','shared/js/consistentCartModal','shared/js/browseSoftSwatch','shared/js/quickViewActions','shared/js/qvImgZoom');
			break;
	}

	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });