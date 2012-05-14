function makeBGTrans() {
	jQuery(document).ready(function(){
		if (navigator.appVersion.match(/MSIE [0-6]\./)) {
		jQuery('*').each(function () {
		  if ((this.currentStyle.backgroundImage != 'none') && (this.currentStyle.backgroundImage.match("png"))) {
			var image = this.currentStyle.backgroundImage;
			image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
			jQuery(this).css({
			  'backgroundImage': 'none',
			  'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
			});
		  }
		});
		}
	});
}
