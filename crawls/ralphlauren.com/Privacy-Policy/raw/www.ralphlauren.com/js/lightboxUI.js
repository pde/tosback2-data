/**
 * Auto Height Iframe Plugin
 * @author walter.chacon
 */
/*(function($) {
	$.fn.extend({
		autoHeight: function() {
			return this.each(function() {
				var obj = $(this);
				//Load event
				obj.load(function() {					
					obj.height(obj.contents().find('#main-container').height());										
				});
			});
		}
	});
})(jQuery);*/

/**
 * @author walter.chacon
 * */
jQuery(document).ready(function($) {

	/**
	 * Open Lightbox
	 */
	jQuery('.lboxLink').click(function() {
		openLightBox($('#'+jQuery(this).attr('id')+'-lbox'));
		return false;
	});

	/**
	 * Close Lightbox
	 */
	jQuery('.lBox .close a').click(function() {
		closeLightBox();
		return false;
	});
});

/**
 * */
openLightBox = function(obj) {
	$lbox		= obj;
	
	if($iframe = $lbox.find('iframe')) {
		reloadIframe($iframe);
	}
	
	var _top	= (jQuery(window).height() - $lbox.height()) /2 + 'px';
	var _left 	= (jQuery(window).width() - $lbox.width()) /2 + 'px';
	
	jQuery.blockUI({ 
	   message: $lbox,
	   centerX: false,
	   centerY: false,
	   css: {
	   			cursor: 'default',
	   			border: 'none', 
	   			padding:'0px',
	   			backgroundColor: 'transparent', 
	   			top: _top, 
	         	left: _left, 
	         	width: $lbox.width()+'px'
	   },
	   overlayCSS: { 
		   backgroundColor: '#FFF', 
		   cursor: 'default' 
	   }
	});
	
	/**
	 * Close Lightbox clicking Overlay
	 * */
	jQuery('.blockOverlay').click(function() {
		closeLightBox(); return false;
	});
}

/**
 * */
closeLightBox = function() {
	jQuery.unblockUI();
}

/**
 * Reload Iframe IE fix 
 */
var reloadIframe = function($iframe) {
	if(jQuery.browser.msie)
	{		
		$iframe.attr({src: $iframe.attr('src')});
	}
}

/**
 * 
 */
var openLightbox2 = function($elm) {
	$lbox		= $elm.clone().appendTo('body');
	if($iframe = $lbox.find('iframe')) {
		reloadIframe($iframe);
	}
	
	var _top	= (jQuery(window).height() - $lbox.height()) /2 + 'px';
	var _left 	= (jQuery(window).width() - $lbox.width()) /2 + 'px';
	
	jQuery.blockUI({ 
	   message: $lbox,
	   centerX: false,
	   centerY: false,
	   css: {
	   			cursor: 'default',
	   			border: 'none', 
	   			padding:'0px',
	   			backgroundColor: 'transparent', 
	   			top: _top, 
	         	left: _left, 
	         	width: $lbox.width()+'px'
	   },
	   overlayCSS: { 
		   backgroundColor: '#FFF', 
		   cursor: 'default' 
	   }
	});
	
	jQuery('.blockOverlay').click(function() {
		closeLightBox(); return false;
	});
}