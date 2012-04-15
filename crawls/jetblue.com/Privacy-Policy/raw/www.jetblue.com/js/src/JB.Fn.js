/**
 * JB.Fn.getAllPageDimensions
 * Gets browsers & page dimensions.
 * @function JB.Fn.getAllPageDimensions
 * @return {object} all property dimensions.
 */ 

JB.Fn.getAllPageDimensions = function(){
	
	JB.Session.pageDimensions.documentWidth		= docWidth	= jQuery(document).width();
	JB.Session.pageDimensions.documentHeight  	= docHeight = jQuery(document).height();
	JB.Session.pageDimensions.windowWidth	    = winWidth	= jQuery(window).width();
	JB.Session.pageDimensions.windowHeight		= winHeight = jQuery(window).height();
	JB.Session.pageDimensions.bodyWidth			= bodyWidth	= jQuery("body").width();
	JB.Session.pageDimensions.bodyHeight		= bodyHeight = jQuery("body").height();
												// IE uses bodyWidth, everything else uses docWidth
	JB.Session.pageDimensions.overlayWidth 		= (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7) ? bodyWidth : docWidth; 
	JB.Session.pageDimensions.overlayHeight		= (docHeight < winHeight) ? winHeight : docHeight;
	JB.Session.pageDimensions.isSet 			= true;
	
/*
	return {
		window: {
			width: $(window).width(),
			height: $(window).height()
		},
		document: {
			width: $(document).width(),
			height: $(document).height()
		},
		body: {
			width: $("body").width(),
			height: $("body").height()
		}
	};
*/
};


/**
 * JB.Fn.getIsBrowserMatrix
 * Gets browsers matrix. isBrowser checks.
 * @function JB.Fn.getIsBrowserMatrix
 * @return {object} Browser check object.
 */

JB.Fn.getIsBrowserMatrix = function(){
	var matrix = {
		isIE: false,
		isIE7: false,
		isIE8: false,
		isIE9: false
	};
	var $html = $("html"),
		$htmlclass = $html.attr("class");
		
	if($htmlclass.indexOf("ie7") > -1) {
		matrix.isIE7 = true;
		matrix.isIE = true;
	} else if($htmlclass.indexOf("ie8") > -1) {
		matrix.isIE8 = true;
		matrix.isIE = true;
	} else {
	
		function getInternetExplorerVersion() {
			var rv = -1; // Return value assumes failure.
			if (navigator.appName == 'Microsoft Internet Explorer'){
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null){
		  			rv = parseFloat( RegExp.$1 );
		  		}	
			}
			return rv;
		}

		if(getInternetExplorerVersion() > 8){
			matrix.isIE9 = true;
			matrix.isIE = true;
			jQuery('html').addClass('ie9');
		}
	}
	
	return matrix;
};
