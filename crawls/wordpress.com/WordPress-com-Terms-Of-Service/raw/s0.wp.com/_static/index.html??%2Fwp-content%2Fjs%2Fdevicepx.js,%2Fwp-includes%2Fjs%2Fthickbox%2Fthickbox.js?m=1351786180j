// detect-zoom is dual-licensed under the WTFPL and MIT license,
// at the recipient's choice.
// https://github.com/yonran/detect-zoom/
var DetectZoom = {
  mediaQueryBinarySearch: function(
      property, unit, a, b, maxIter, epsilon) {
    var matchMedia, head, style, div, binarySearch;
    binarySearch = function(a, b, maxIter) {
      var mid = (a + b)/2;
      if (maxIter == 0 || b - a < epsilon) return mid;
      var query = "(" + property + ":" + mid + unit + ")";
      if (matchMedia(query).matches) {
        return binarySearch(mid, b, maxIter-1);
      } else {
        return binarySearch(a, mid, maxIter-1);
      }
    };
    if (window.matchMedia) {
      matchMedia = window.matchMedia;
    } else {
      head = document.getElementsByTagName('head')[0];
      style = document.createElement('style');
      div = document.createElement('div');
      div.className = 'mediaQueryBinarySearch';
      head.appendChild(style);
      div.style.display = 'none';
      document.body.appendChild(div);
      matchMedia = function(query) {
        style.sheet.insertRule('@media ' + query +
                               '{.mediaQueryBinarySearch ' +
                               '{text-decoration: underline} }', 0);
        var matched = getComputedStyle(div, null).textDecoration
            == 'underline';
        style.sheet.deleteRule(0);
        return {matches:matched};
      };
    }
    var r = binarySearch(a, b, maxIter);
    if (div) {
      head.removeChild(style);
      document.body.removeChild(div);
    }
    return r;
  },
  _zoomIe7: function() {
    // the trick: body's offsetWidth was in CSS pixels, while
    // getBoundingClientRect() was in system pixels in IE7.
    // Thanks to http://help.dottoro.com/ljgshbne.php
    var rect = document.body.getBoundingClientRect();
    var z = (rect.right-rect.left)/document.body.offsetWidth;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomIe8: function() {
    // IE 8+: no trick needed!
    // TODO: MSDN says that logicalXDPI and deviceXDPI existed since IE6
    // (which didn't even have whole-page zoom). Check to see whether
    // this method would also work in IE7.
    var zoom = screen.deviceXDPI / screen.logicalXDPI;
    return {
      zoom: zoom,
      devicePxPerCssPx: zoom
    };
  },
  _zoomWebkitMobile: function() {
    // the trick: window.innerWIdth is in CSS pixels, while
    // screen.width and screen.height are in system pixels.
    // And there are no scrollbars to mess up the measurement.
    var devicePixelRatio = window.devicePixelRatio != null ? window.devicePixelRatio : 1
      , deviceWidth;
    if ( Math.abs(window.orientation) == 90 ) {
      deviceWidth = screen.height;
    } else {
      deviceWidth = screen.width;
    }
    var z = deviceWidth / window.innerWidth;
    // return immediately; don't round at the end.
    return {zoom: z, devicePxPerCssPx: z*devicePixelRatio};
  },
  _zoomWebkit: function() {
    // the trick: an element's clientHeight is in CSS pixels, while you can
    // set its line-height in system pixels using font-size and
    // -webkit-text-size-adjust:none.
    // device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/

    // Previous trick (used before http://trac.webkit.org/changeset/100847):
    // documentElement.scrollWidth is in CSS pixels, while
    // document.width was in system pixels. Note that this is the
    // layout width of the document, which is slightly different from viewport
    // because document width does not include scrollbars and might be wider
    // due to big elements.

    var devicePixelRatio = window.devicePixelRatio != null ? window.devicePixelRatio : 1;

    // The container exists so that the div will be laid out in its own flow
    // while not impacting the layout, viewport size, or display of the
    // webpage as a whole.
    var container = document.createElement('div')
      , div = document.createElement('div');
    
    // Add !important and relevant CSS rule resets
    // so that other rules cannot affect the results.
    var important = function(str){ return str.replace(/;/g, " !important;"); };
    
    container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
    div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
    div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));
    
    container.appendChild(div);
    document.body.appendChild(container);
    var z = 1000 / div.clientHeight;
    z = Math.round(z * 100) / 100;
    var r = {
      zoom: z,
      devicePxPerCssPx: devicePixelRatio * z
    };
    document.body.removeChild(container);
    return r;
  },
  _zoomFF35: function() {
    // the trick for FF3.5 ONLY: device-width gives CSS pixels, while
    // screen.width gave system pixels. Thanks to QuirksMode's widths table,
    // which called it a bug. http://www.quirksmode.org/m/widths.html
    var z = screen.width /
      this.mediaQueryBinarySearch('min-device-width', 'px', 0, 6000, 20, .0001);
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomFF36: function() {
    // the hack for FF3.6: you can measure scrollbar's width in CSS pixels,
    // while in system pixels it's 15px (verified in Ubuntu).

    // TODO: verify for every platform that a scrollbar is exactly 15px wide.
    var container = document.createElement('div')
      , outerDiv = document.createElement('div');
    // The container exists so that the div will be laid out in its own flow
    // while not impacting the layout, viewport size, or display of the
    // webpage as a whole.
    container.setAttribute('style', 'width:0; height:0; overflow:hidden;' +
        'visibility:hidden; position: absolute');
    outerDiv.style.width = outerDiv.style.height = '500px';  // enough for all the scrollbars
    var div = outerDiv;
    for (var i = 0; i < 10; ++i) {
      var child = document.createElement('div');
      child.style.overflowY = 'scroll';
      div.appendChild(child);
      div = child;
    }
    container.appendChild(outerDiv);
    document.body.appendChild(container);
    var outerDivWidth = outerDiv.clientWidth;
    var innerDivWidth = div.clientWidth;
    var scrollbarWidthCss = (outerDivWidth - innerDivWidth)/10;
    document.body.removeChild(container);
    var scrollbarWidthDevice = 15;  // Mac and Linux: scrollbars are 15px wide
    if (-1 != navigator.platform.indexOf('Win')){
      scrollbarWidthDevice = 17;
    }
    var z = scrollbarWidthDevice / scrollbarWidthCss;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomFF4: function() {
    // no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
    // (Note that this is a different interpretation than Webkit's device
    // pixel ratio, which is the ratio device dpi / system dpi).
    // TODO: is mozmm vs. mm promising?
    var z = this.mediaQueryBinarySearch(
            'min--moz-device-pixel-ratio',
            '', 0, 10, 20, .0001);
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomOperaOlder: function() {
    // 10.00 (or before) to 11.01:
    // the trick: a div with position:fixed;width:100%'s offsetWidth is the
    // viewport width in CSS pixels, while window.innerWidth was in system
    // pixels. Thanks to:
    // http://virtuelvis.com/2005/05/how-to-detect-zoom-level-in-opera/
    // TODO: fix bug: when there is a scrollbar, fixed div does NOT
    // include the scrollbar, while window.outerWidth DOES. This causes the
    // calculation to be off by a few percent.
    var fixedDiv = document.createElement('div');
    fixedDiv.style.position = 'fixed';
    fixedDiv.style.width = '100%';
    fixedDiv.style.height = '100%';
    fixedDiv.style.top = fixedDiv.style.left = '0';
    fixedDiv.style.visibility = 'hidden';
    document.body.appendChild(fixedDiv);
    var z = window.innerWidth / fixedDiv.offsetWidth;
    document.body.removeChild(fixedDiv);
    return {zoom: z, devicePxPerCssPx: z};
  },
  _zoomOpera11: function() {
    // works starting Opera 11.11
    // the trick: outerWidth is the viewport width including scrollbars in
    // system px, while innerWidth is the viewport width including scrollbars
    // in CSS px; 
    var z = window.outerWidth / window.innerWidth;
    z = Math.round(z * 100) / 100;
    return {zoom: z, devicePxPerCssPx: z};
  },
  ratios: function() {
    var r;
    if (! isNaN(screen.logicalXDPI) && ! isNaN(screen.systemXDPI) ) {
      return this._zoomIe8();
    } else if ('ontouchstart' in window && document.body.style.webkitTextSizeAdjust != null) {
      return this._zoomWebkitMobile();
    } else if (document.body.style.webkitTextSizeAdjust != null) {  // webkit
      return this._zoomWebkit();
    } else if (-1 != navigator.userAgent.indexOf('Firefox/3.5')) {
      return this._zoomFF35();
    } else if (-1 != navigator.userAgent.indexOf('Firefox/3.6')) {
      return this._zoomFF36();
    } else if (-1 != navigator.appVersion.indexOf("MSIE 7.")) {
      return this._zoomIe7();
    } else if (-1 != navigator.userAgent.indexOf('Opera')) {
      var versionIdx = navigator.userAgent.indexOf('Version/');
      if (11.01 < parseFloat(navigator.userAgent.substr(versionIdx + 8)))
        return this._zoomOpera11();
      else
        return this._zoomOperaOlder();
    } else if (0.001 < (r = this._zoomFF4()).zoom) {
      return r;
    } else {
      return {zoom: 1, devicePxPerCssPx: 1}
    }
  },
  zoom: function() {
    return this.ratios().zoom;
  },
  device: function() {
    return this.ratios().devicePxPerCssPx;
  }
};

var wpcom_img_zoomer = {
	zoomed: false,
	timer: null,
	interval: 1000, // zoom polling interval in millisecond

	// Should we apply width/height attributes to control the image size?
	imgNeedsSizeAtts: function( img ) {
		// Do not overwrite existing width/height attributes.
		if ( img.getAttribute('width') !== null || img.getAttribute('height') !== null )
			return false;
		// Do not apply the attributes if the image is already constrained by a parent element.
		if ( img.width < img.naturalWidth || img.height < img.naturalHeight )
			return false;
		return true;
	},

	init: function() {
		var t = this;
		try{
			t.zoomImages();
			t.timer = setInterval( function() { t.zoomImages(); }, t.interval );
		}
		catch(e){
		}
	},

	stop: function() {
		if ( this.timer )
			clearInterval( this.timer );
	},

	getScale: function() {
		var scale = DetectZoom.device();
		// Round up to 1.5 or the next integer below the cap.
		if      ( scale <= 1.0 ) scale = 1.0;
		else if ( scale <= 1.5 ) scale = 1.5;
		else if ( scale <= 2.0 ) scale = 2.0;
		else if ( scale <= 3.0 ) scale = 3.0;
		else if ( scale <= 4.0 ) scale = 4.0;
		else                     scale = 5.0;
		return scale;
	},

	shouldZoom: function( scale ) {
		var t = this;
		// Do not operate on hidden frames.
		if ( "innerWidth" in window && !window.innerWidth )
			return false;
		// Don't do anything until scale > 1
		if ( scale == 1.0 && t.zoomed == false )
			return false;
		return true;
	},

	zoomImages: function() {
		var t = this;
		var scale = t.getScale();
		if ( ! t.shouldZoom( scale ) ){
			return;
		}
		t.zoomed = true;
		// Loop through all the <img> elements on the page.
		var imgs = document.getElementsByTagName("img");

		for ( var i = 0; i < imgs.length; i++ ) {
			// Skip images that don't need processing.
			var imgScale = imgs[i].getAttribute("scale");
			if ( imgScale == scale || imgScale == "0" )
				continue;

			// Skip images that have already failed at this scale
			var scaleFail = imgs[i].getAttribute("scale-fail");
			if ( scaleFail && scaleFail <= scale )
				continue;

			// Skip images that have no dimensions yet.
			if ( ! ( imgs[i].width && imgs[i].height ) )
				continue;

			if ( t.scaleImage( imgs[i], scale ) ) {
				// Mark the img as having been processed at this scale.
				imgs[i].setAttribute("scale", scale);
			}
			else {
				// Set the flag to skip this image.
				imgs[i].setAttribute("scale", "0");
			}
		}
	},

	scaleImage: function( img, scale ) {
		var t = this;
		var newSrc = img.src;

		// Skip slideshow images
		if ( img.parentNode.className.match(/slideshow-slide/) )
			return false;

		// Scale gravatars that have ?s= or ?size=
		if ( img.src.match( /^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/ ) ) {
			newSrc = img.src.replace( /([?&](s|size)=)(\d+)/, function( $0, $1, $2, $3 ) {
				// Stash the original size
				var originalAtt = "originals",
				originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $3;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(img.clientWidth * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go larger than the service supports
				targetSize = Math.min( targetSize, 512 );
				return $1 + targetSize;
			});
		}

		// Scale resize queries (*.files.wordpress.com) that have ?w= or ?h=
		else if ( img.src.match( /^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/ ) ) {
			var changedAttrs = {};
			var matches = img.src.match( /([?&]([wh])=)(\d+)/g );
			for ( var i = 0; i < matches.length; i++ ) {
				var lr = matches[i].split( '=' );
				var thisAttr = lr[0].replace(/[?&]/g, '' );
				var thisVal = lr[1];

				// Stash the original size
				var originalAtt = 'original' + thisAttr, originalSize = img.getAttribute( originalAtt );
				if ( originalSize === null ) {
					originalSize = thisVal;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width/height of the image in CSS pixels
				var size = thisAttr == 'w' ? img.clientWidth : img.clientHeight;
				var naturalSize = ( thisAttr == 'w' ? img.naturalWidth : img.naturalHeight );
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= naturalSize )
					targetSize = thisVal;
				// Don't try to go bigger if the image is already smaller than was requested
				if ( naturalSize < thisVal )
					targetSize = thisVal;
				if ( targetSize != thisVal )
					changedAttrs[ thisAttr ] = targetSize;
			}
			var w = changedAttrs.w || false;
			var h = changedAttrs.h || false;

			if ( w ) {
				newSrc = img.src.replace(/([?&])w=\d+/g, function( $0, $1 ) {
					return $1 + 'w=' + w;
				});
			}			
			if ( h ) {
				newSrc = newSrc.replace(/([?&])h=\d+/g, function( $0, $1 ) {
					return $1 + 'h=' + h;
				});
			}
		}

		// Scale mshots that have width
		else if ( img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/) ) {
			newSrc = img.src.replace( /([?&]w=)(\d+)/, function($0, $1, $2) {
				// Stash the original size
				var originalAtt = 'originalw', originalSize = img.getAttribute(originalAtt);
				if ( originalSize === null ) {
					originalSize = $2;
					img.setAttribute(originalAtt, originalSize);
					if ( t.imgNeedsSizeAtts( img ) ) {
						// Fix width and height attributes to rendered dimensions.
						img.width = img.width;
						img.height = img.height;
					}
				}
				// Get the width of the image in CSS pixels
				var size = img.clientWidth;
				// Convert CSS pixels to device pixels
				var targetSize = Math.ceil(size * scale);
				// Don't go smaller than the original size
				targetSize = Math.max( targetSize, originalSize );
				// Don't go bigger unless the current one is actually lacking
				if ( scale > img.getAttribute("scale") && targetSize <= img.naturalWidth )
					targetSize = $2;
				if ( $2 != targetSize )
					return $1 + targetSize;
			});
		}

		// Scale simple imgpress queries (s0.wp.com) that only specify w/h/fit
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/) ) {
			var imgpressSafeFunctions = ["zoom", "url", "h", "w", "fit", "filter", "brightness", "contrast", "colorize", "smooth", "unsharpmask"];
			// Search the query string for unsupported functions.
			var qs = RegExp.$3.split('&');
			for ( var q in qs ) {
				q = qs[q].split('=')[0];
				if ( imgpressSafeFunctions.indexOf(q) == -1 ) {
					return false;
				}
			}
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale LaTeX images
		else if ( img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/) ) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			// Compute new src
			if ( scale == 1 )
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?');
			else
				newSrc = img.src.replace(/\?(zoom=[^&]+&)?/, '?zoom=' + scale + '&');
		}

		// Scale static assets that have a name matching *-1x.png or *@1x.png
		else if ( img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/) ) {
			// Fix width and height attributes to rendered dimensions.
			img.width = img.width;
			img.height = img.height;
			var currentSize = RegExp.$1, newSize = currentSize;
			if ( scale <= 1 )
				newSize = 1;
			else
				newSize = 2;
			if ( currentSize != newSize )
				newSrc = img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/, '$1'+newSize+'x.$2$3');
		}

		else {
			return false;
		}

		// Don't set img.src unless it has changed. This avoids unnecessary reloads.
		if ( newSrc != img.src ) {
			// Store the original img.src
			var prevSrc, origSrc = img.getAttribute("src-orig");
			if ( !origSrc ) {
				origSrc = img.src;
				img.setAttribute("src-orig", origSrc);
			}
			// In case of error, revert img.src
			if ( img.complete )
				prevSrc = img.src;
			else
				prevSrc = origSrc;
			img.onerror = function(){
				img.src = prevSrc;
				if ( img.getAttribute("scale-fail") < scale )
					img.setAttribute("scale-fail", scale);
				img.onerror = null;
			};
			// Finally load the new image
			img.src = newSrc;
		}

		return true;
	}
};

wpcom_img_zoomer.init();
;
/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

if ( typeof tb_pathToImage != 'string' ) {
	var tb_pathToImage = thickboxL10n.loadingAnimation;
}
if ( typeof tb_closeImage != 'string' ) {
	var tb_closeImage = thickboxL10n.closeImage;
}

/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

//on page load call tb_init
jQuery(document).ready(function(){
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tb_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	jQuery(domChunk).live('click', tb_click);
}

function tb_click(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
}

function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			jQuery("body","html").css({height: "100%", width: "100%"});
			jQuery("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				jQuery("body").append("<iframe id='TB_HideSelect'>"+thickboxL10n.noiframes+"</iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}

		if(tb_detectMacXFF()){
			jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			jQuery("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}

		if(caption===null){caption="";}
		jQuery("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		jQuery('#TB_load').show();//show loader

		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{
	   		baseURL = url;
	   }

	   var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images

			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = jQuery("a[rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.next+"</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.prev+"</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = thickboxL10n.image + ' ' + (TB_Counter + 1) + ' ' + thickboxL10n.of + ' ' + (TB_TempArray.length);
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){
			imgPreloader.onload = null;

			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth);
				imageWidth = x;
				if (imageHeight > y) {
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
				}
			} else if (imageHeight > y) {
				imageWidth = imageWidth * (y / imageHeight);
				imageHeight = y;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
				}
			}
			// End Resizing

			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='"+thickboxL10n.close+"'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='"+thickboxL10n.close+"'><img src='" + tb_closeImage + "' /></a></div>");

			jQuery("#TB_closeWindowButton").click(tb_remove);

			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if(jQuery(document).unbind("click",goPrev)){jQuery(document).unbind("click",goPrev);}
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;
				}
				jQuery("#TB_prev").click(goPrev);
			}

			if (!(TB_NextHTML === "")) {
				function goNext(){
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);
					return false;
				}
				jQuery("#TB_next").click(goNext);

			}

			jQuery(document).bind('keydown.thickbox', function(e){
				e.stopImmediatePropagation();

				if ( e.which == 27 ){ // close
					if ( ! jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

				} else if ( e.which == 190 ){ // display previous image
					if(!(TB_NextHTML == "")){
						jQuery(document).unbind('thickbox');
						goNext();
					}
				} else if ( e.which == 188 ){ // display next image
					if(!(TB_PrevHTML == "")){
						jQuery(document).unbind('thickbox');
						goPrev();
					}
				}
				return false;
			});

			tb_position();
			jQuery("#TB_load").remove();
			jQuery("#TB_ImageOff").click(tb_remove);
			jQuery("#TB_window").css({'visibility':'visible'}); //for safari using css instead of show
			};

			imgPreloader.src = url;
		}else{//code to show html

			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;

			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window
					urlNoQuery = url.split('TB_');
					jQuery("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='"+thickboxL10n.close+"'><img src='" + tb_closeImage + "' /></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' >"+thickboxL10n.noiframes+"</iframe>");
					}else{//iframe modal
					jQuery("#TB_overlay").unbind();
						jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'>"+thickboxL10n.noiframes+"</iframe>");
					}
			}else{// not an iframe, ajax
					if(jQuery("#TB_window").css("visibility") != "visible"){
						if(params['modal'] != "true"){//ajax no modal
						jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='" + tb_closeImage + "' /></a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						jQuery("#TB_overlay").unbind();
						jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						jQuery("#TB_ajaxContent")[0].scrollTop = 0;
						jQuery("#TB_ajaxWindowTitle").html(caption);
					}
			}

			jQuery("#TB_closeWindowButton").click(tb_remove);

				if(url.indexOf('TB_inline') != -1){
					jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
					jQuery("#TB_window").bind('tb_unload', function () {
						jQuery('#' + params['inlineId']).append( jQuery("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position();
					jQuery("#TB_load").remove();
					jQuery("#TB_window").css({'visibility':'visible'});
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position();
					if(jQuery.browser.safari){//safari needs help because it will not fire iframe onload
						jQuery("#TB_load").remove();
						jQuery("#TB_window").css({'visibility':'visible'});
					}
				}else{
					jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position();
						jQuery("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox");
						jQuery("#TB_window").css({'visibility':'visible'});
					});
				}

		}

		if(!params['modal']){
			jQuery(document).bind('keyup.thickbox', function(e){

				if ( e.which == 27 ){ // close
					e.stopImmediatePropagation();
					if ( ! jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

					return false;
				}
			});
		}

	} catch(e) {
		//nothing here
	}
}

//helper functions below
function tb_showIframe(){
	jQuery("#TB_load").remove();
	jQuery("#TB_window").css({'visibility':'visible'});
}

function tb_remove() {
 	jQuery("#TB_imageOff").unbind("click");
	jQuery("#TB_closeWindowButton").unbind("click");
	jQuery("#TB_window").fadeOut("fast",function(){jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("tb_unload").unbind().remove();});
	jQuery("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		jQuery("body","html").css({height: "auto", width: "auto"});
		jQuery("html").css("overflow","");
	}
	jQuery(document).unbind('.thickbox');
	return false;
}

function tb_position() {
var isIE6 = typeof document.body.style.maxHeight === "undefined";
jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( ! isIE6 ) { // take away IE6
		jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}
;
