$(function() {

	var js = [], css = [];


	switch ($('body').attr('id')) {
		case 'home':
			js.push('js/emailMe');
			break;
		case 'product':
			if(typeof HL3 != "undefined" && HL3=='true'){
				js.push('shared/js/consistentCartModal','shared/js/emailMe');		
			}else if(typeof SL3!= "undefined" && SL3 == 'true'){
				js.push('shared/js/consistentCartModal','js/alerts');		
			}
			break;
		case 'subcategory':
		case 'keysearch':js.push('js/vam_popup','shared/js/browseSoftSwatch','shared/js/quickViewActions','shared/js/qvImgZoom','js/alerts','shared/js/emailMe','shared/js/consistentCartModal');
						break; 

	}
	FED.Util.requires({
		baseUrl: imagePath,
		js: js,
		css: css
	});
 });
