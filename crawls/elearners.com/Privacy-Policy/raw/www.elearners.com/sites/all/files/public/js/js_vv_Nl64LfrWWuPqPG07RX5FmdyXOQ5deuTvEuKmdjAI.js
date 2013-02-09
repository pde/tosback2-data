
(function ($) {
	$(document).ready(function(){

		// find image field src
		$('.content-image .field-name-field-image img, .content-text .eddy_lightbox').each(function(){
			var lightbox_img = find_lightbox_img($(this));
			
			if(lightbox_img !== ''){			
				if($(this).parent().is('a')){
					var img_href_o = $(this).parent().attr('href');
					var img_href_target = $(this).parent().attr('target');
					if(img_href_target!=''){
						img_href_target = 'target=\'' + img_href_target + '\'';
					}
					$(this).parent().attr('href', lightbox_img).attr('rel','lightbox[][<a href=\'' + img_href_o + '\' ' + img_href_target + '>' + img_href_o + '</a>]').attr('class', 'lightbox-processed');
				}else{
					$(this).wrap('<a href="' + lightbox_img + '" rel="lightbox" class="lightbox-processed"></a>');
				}
			}
			
			$('.content-text .field-name-field-lightbox-image .lightbox-processed').attr('rel','lightbox');

		});
		
		//hide lightbox image field and remove group from lightbox image field
		$('.content-text .field-name-field-lightbox-image').css('display','none');
		
		$('.content-text .field-name-field-lightbox-image .lightbox-processed').attr('rel','lightbox');
		
		//trigger lightbox image field click, only trigger the image file name matching
		$('.content-image .lightbox-processed, .content-text .lightbox-processed').live('click',function(event){
		
			var lightbox_img = find_lightbox_img($(this).children());
			if($('.content-text .field-name-field-lightbox-image .lightbox-processed[href="' + lightbox_img + '"]').length !=0){
				event.preventDefault();
				//return false;				
				$('.content-text .field-name-field-lightbox-image .lightbox-processed[href="' + lightbox_img + '"]').click();
			}
		});
		
	});
	//end of document ready

	
	function find_lightbox_img(img_obj){
		var img = $(img_obj).attr('src').split('/');
		var img_src = img[img.length-1];
		var lightbox_img_src = img_src.substring(0,img_src.lastIndexOf('.')) + '_lightbox' + img_src.substring(img_src.lastIndexOf('.'));

		if($('.content-text .field-name-field-lightbox-image .lightbox-processed[href$="' + lightbox_img_src + '"]') !== null && $('.content-text .field-name-field-lightbox-image .lightbox-processed[href$="' + lightbox_img_src + '"]').length != 0){
			return $('.content-text .field-name-field-lightbox-image .lightbox-processed[href$="' + lightbox_img_src + '"]').attr('href');
		}else{
			return '';
		}
	}
	
})(jQuery);
;
