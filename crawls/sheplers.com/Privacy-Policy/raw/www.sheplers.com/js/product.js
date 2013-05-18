/**
 * Product.js - Scripts for product-related pages.
 */


var productImage = {}; // A global namespace.



// Create scene7 image provider as needed.
productImage.createImageProvider = function(imgAttrs, zoomViewerEl) {
	if (!productImage.zoomControl){
		productImage.zoomControl = new SjZViewer({
			'baseServer': imgAttrs.path,   /* Image Serving root path; can be an absolute path in the same or a different domain*/
			'baseImage': imgAttrs.fileName,
			'viewWidth': null,  /* width/height - Zoom view size in pixels. Optional; specify null, null if not required.*/
			'viewHeight':null,
			'imageWidth':null, /* newHeight/new Full-resolution size in pixels of image, if known.
								If not specified, the viewer will obtain this information from IS at run-time (slight performance penalty).
								Note that this must be the final size, including any size changes caused by IS modifiers specified with image.
								The IS command req=props can be used to obtain the image size. Optional; specify null,null if not required. */
			'imageHeight':null,
			'transparency':false,  /* set to ÓtrueÓ if alpha transparency support is required */
			'imgVersion':null,
			'inView':zoomViewerEl,
			'pageId':null,
			'inParams':null
		});

		productImage.zoomControl.setZoomStep(1); /* integer zoom step value (1,  2, or 3) - Specifies how many zoom actions are require to achieve half the resolution when zooming in or double the resolution when zooming out. */
		productImage.zoomControl.setMaxZoom(100); /* 100 is max and default */
		productImage.zoomControl.setTurnTime(.5);  /* Specifies the duration of the image fade transition for setImage(). Set to 0 for a hard transition */
		productImage.zoomControl.setTransitionTime(.35); /* Specifies the maximum time a zoom or pan action should take to achieve the target view. Set to 0 to disable smooth zoom/pan */
		productImage.zoomControl.setBackground('0xffffff'); /* Specify the background color for parts of the image view which are not covered by the image or set to ÓtransparentÓ to turn off the background fill. default is 0xffffff */
		productImage.zoomControl.setWaitIconURL('/assets/images/scene7/wait.gif');  /* Specifies the static or animated gif file which is displayed when the viewer is waiting for data to be loaded. */
		productImage.zoomControl.setWaitIconTimer('3.0,0.1'); /* (showDelay, hideDelay) - showDelay specifies how long the viewer should wait before showing the wait icon after sending an image data request to the server. hideDelay specifies how long the viewer should wait before removing the wait icon after requested image data has been received. */

	}
	productImage.zoomControl.setImage(imgAttrs.path + imgAttrs.fileName, true);
	$('div[id^=datadiv]:not(div[id^=datadiv]:last-child)').remove(); //remove all old scene7 DOM spam.

};

/**
 *
 * jQuery Plugin productImageZoom
 * by Scott Shepard (sshepard@fry.com)
 * Last modified: 2011-07-14
 *
 * Events for alt images, swatches and other elements related to a product image.
 * Adds an abstraction layer for Image Providers so the UI can stay provider-agnostic.
 *
 * scene7 documentation: https://crc.scene7.com/is-viewers/pages/DHTML-Viewer-Reference.htm#_Toc261957631
 */
$.fn.productImageZoom = function(settings){
	settings = $.extend({
		'imageProvider':"scene7", /* Image provider.  Usually Scene7 or Picasso (Sea Dragon) */
		'mainImageCss':"div.productImage img", /* Selector for the main product image. */
		'mainImageZoomCss':".zoom", /* Zoom button in mainImageContainer. */
		'mainImageZoomedClass':'zoomed', /* MainImageContainer gets this class when zoomViewer is open. */
		'altImagesContainerCss':"div.altImages",
		'altImagesCss':"li", /* Where to find alt images (child of mainImageContainer) */
		'altImageSelectedClass':"active", /* Alt image gets this class when it has been selected. */
		'altImagesinZoom':false, /* Move alt images to zoom layer when opened */
		'swatchesContainerCss':"ul.swatches",
		'swatchesCss':"li", /* Where to find swatches (child of swatchesContainer) */
		'swatchSelectedClass':"active", /* Swatch gets this class when it has been selected. */
		'variantsContainerCss':".variants", /* Selector contains all variant menus */
		'variants':{
			'colorSelectCss':"select.colorVariant", /* Color variant menu selector (child of variantsContainer) */
			'sizeSelectCss':"select.sizeVariant" /* Size variant menu selector (child of variantsContainer) */
		},
		'zoomContainerCss':".zoomOverlay", /* element that contains all the zoom stuff */
		'nextImageCss':".next", /* show the next image in the zoom view */
		'prevImageCss':".prev", /* show the previous image in the zoom view */
		'bodyClickClose':true, /* clicking out of the zoom area closes the zoom */
		'zoomHoverClass':'hover', /* class name added to mainImageContainer when zoomContainer is moused-over. */
		/*
		SCENE7 Settings:
		 */
		'zoomViewerCss':".zoomViewer", /* element that contains the zoomed image */
		'zoomInCss':".zoomIn", /* zoom in button */
		'zoomOutCss':".zoomOut", /* zoom out button */
		'zoomResetCss':".zoomReset", /* reset the zoom level button */
		'zoomCloseCss':".zoomClose", /* zoom close button */
		'zoomViewerHoverClass':"active", /* Class name added to zoom window when moused-over. */
		'zoomButtonHoverClass':"active", /* Class name added to zoom buttons when moused-over. */
		'zoomAlwaysReset':false,  /* always reset the zoom area to show the entire image when you switch images */
		'zoomSteps':1, /* (1,  2, or 3) - Specifies how many zoom actions are require to achieve half the resolution when zooming in or double the resolution when zooming out. */
		'zoomBackgroundColor':"0xffffff", /* Background color of the Zoom Image. Play close attention to the leading "0x" in the hex value. */
		'waitIconURL':"/assets/images/scene7/wait.gif",
		'waitDelayStart':"3.0", /* how many seconds to wait before showing wait icon. */
		'waitDelayEnd': "0.1", /* how many seconds to wait before hiding upon image return. */
		'zoomTransitionTime': 0.5, /* Specifies the maximum time a zoom or pan action should take to achieve the target view. Set to 0 to disable smooth zoom/pan */
		'zoomImageFadeTime':0.35, /* time it takes to cross fade from old image to new image when replacing the image */
		'zoomControlsCSS':'.controls',
		'useZoomNavigator':false, /* Zoom Navigator is a method of panning the zoom view around without dragging the image itself */
		'zoomNavigatorContainerCss':'.zoomNavigator', /* Zoom navigator allows user to scroll the image around without using mouse click and drag. */
		'zoomNavUpCss':'.up', /* Selector identifies the element that moves the image up. */
		'zoomNavRightCss':'.right', /* Selector identifies the element that moves the image right. */
		'zoomNavDownCss':'.down', /* Selector identifies the element that moves the image down. */
		'zoomNavLeftCss':'.left', /* Selector identifies the element that moves the image left. */
		'onImageZoomedIn':null, /* a function called when an image is zoomed in. See image provider docs for details. */
		'onImageZoomedOut':null, /* a function called when an image is zoomed out. See image provider docs for details. */
		'onImageReset':null, /* a function called when an image's zoom level is reset. See image provider docs for details. */
		'onImageChanged':null, /* a function called when an image is changed. See image provider docs for details. */
		'onRegionSet':null, /* a function called when a zoom region is set. See image provider docs for details. */
		/*
		 Picasso Settings.
		 Note: Image urls are appended to Seadragon.Config.imagePath.
		  */
		'picassoCloseImage': "/close_rest.png", /* Normal (rest) state of close button. */
		'picassoCloseGroupHover': "/close_grouphover.png", /* Hover state of close image group. */
		'picassoCloseHover': "/close_hover.png", /* Close hover state. */
		'picassoCloseMousedown': "/close_pressed.png" /* Mouse-down state of close button. */
	}, settings);


	return this.each(function(){

		// detect control elements
		productImage.imageProvider = settings.imageProvider || productImage.imageProvider;
		var mainImageContainer = $(this); /* The selector used to create this plugin. */
		var mainImage = $(settings.mainImageCss, mainImageContainer);
		var mainImageZoom = $(settings.mainImageZoomCss, mainImageContainer);
		var altImagesContainer = $(settings.altImagesContainerCss, this);
		var altImages = $(settings.altImagesCss, altImagesContainer);
		var swatchesContainer = $(settings.swatchesContainerCss);
		var swatches = $(settings.swatchesCss, swatchesContainer);
		var colorSelectVariant = $(settings.variants.colorSelectCss, swatchesContainer);
		var sizeSelectVariant = $(settings.variants.sizeSelectCss, swatchesContainer);
		var zoomContainer = $(settings.zoomContainerCss, this);
		var zoomViewer = $(settings.zoomViewerCss, zoomContainer);
		var nextImage = $(settings.nextImageCss, this);
		var prevImage = $(settings.prevImageCss, this);
		// scene7 zoom controls
		var zoomControls = $(settings.zoomControlsCSS, zoomContainer);
		var zoomIn = $(settings.zoomInCss, zoomContainer);
		var zoomOut = $(settings.zoomOutCss, zoomContainer);
		var zoomReset = $(settings.zoomResetCss, zoomContainer);
		var zoomClose = $(settings.zoomCloseCss, zoomContainer);
		var useZoomNavigator = !!(settings.useZoomNavigator);
		var zoomNavigatorContainer = $(settings.zoomNavigatorContainerCss);
		var zoomNavUp = $(settings.zoomNavUpCss, zoomNavigatorContainer);
		var zoomNavRight = $(settings.zoomNavRightCss, zoomNavigatorContainer);
		var zoomNavDown = $(settings.zoomNavDownCss, zoomNavigatorContainer);
		var zoomNavLeft = $(settings.zoomNavLeftCss, zoomNavigatorContainer);


		/*

		SCENE7 FUNCTIONS

		*/
		// Update the main image.
		var scene7ImageUpdate = productImage.scene7ImageUpdate = function(options){

			//Get alt image properties.
			var url = options.href ? options.href : $('img', options.imageContainer).attr("src");
			var imageAttrs = filenameParser(url);
			var newProps = {'fileName': imageAttrs.fileName};

			//Update the mainImage.
			var mainSrc = mainImage.attr('src');
			mainImage.attr("src", filenameReplace(mainSrc, newProps));

			//set the current altImage as active
			altImages.removeClass(settings.altImageSelectedClass);
			if (options.imageContainer) {
				$(options.imageContainer).addClass(settings.altImageSelectedClass);
			}

			// Set the image in the zoom view.
			if (typeof productImage.zoomControl !== "undefined" || productImage.zoomControl === false) {
				productImage.zoomControl.setImage(imageAttrs.path + imageAttrs.fileName, settings.zoomAlwaysReset);
			}
		};


		// Behavior when clicking a swatch
		var scene7SwatchUpdate = function(options){
			var href = $('img', options.imageContainer).attr('src');
			if (!href || href.length === 0) { return; }

			swatches.removeClass(settings.swatchSelectedClass);
			$(options.imageContainer).addClass(settings.swatchSelectedClass);
			options.href = href;

			scene7ImageUpdate(options);
		};


		// Create the SjZViewer object.
		var scene7Initialize = function() {
			var zoomNavigator;
			if (!mainImageAttrs.queryAttributes) { imageAttrs.queryAttributes = {}; }

			productImage.createImageProvider(mainImageAttrs, zoomViewer[0]);
		};

		var scene7Events = function(){

			mainImageContainer.click(function(evt){ evt.stopPropagation(); });

			mainImage.click(function(evt){
				evt.stopPropagation();
				zoomed = true;
				zoomContainer.fadeIn();
				zoomControls.fadeIn();

				mainImageContainer.addClass(settings.mainImageZoomedClass);  // we are now zooming.
				$(".zoomViewer").html();
				productImage.createImageProvider(filenameParser(mainImage.attr('src')), $(".zoomViewer").get(0));
			});

			zoomContainer.hover(
				function(){ zoomContainer.addClass(settings.zoomHoverClass); },
				function(){ zoomContainer.removeClass(settings.zoomHoverClass); }
			);

			mainImageZoom.click(function(){ mainImage.click(); });

			zoomIn
				.click(function(){ productImage.zoomControl.zoomIn(); })
				.hover(
					  function(){ zoomIn.addClass(settings.zoomButtonHoverClass); },
					  function(){ zoomIn.removeClass(settings.zoomButtonHoverClass); }
				);

			zoomOut
				.click(function(){ productImage.zoomControl.zoomOut(); })
				.hover(
					  function(){ zoomOut.addClass(settings.zoomButtonHoverClass); },
					  function(){ zoomOut.removeClass(settings.zoomButtonHoverClass); }
				);

			zoomReset
				.click(function(){ productImage.zoomControl.reset(); })
				.hover(
					  function(){ zoomReset.addClass(settings.zoomButtonHoverClass); },
					  function(){ zoomReset.removeClass(settings.zoomButtonHoverClass); }
				);

			zoomClose
				.click(function(){
					zoomed = false;
					if (settings.altImagesinZoom) {
						mainImage.parent().after(swatchesContainer);
						mainImage.parent().after(altImagesContainer);
					}
					mainImageContainer.removeClass(settings.mainImageZoomedClass);
					zoomContainer.fadeOut();
					zoomControls.fadeOut();
				})
				.hover(
					  function(){ zoomClose.addClass(settings.zoomButtonHoverClass); },
					  function(){ zoomClose.removeClass(settings.zoomButtonHoverClass); }
				);

			nextImage.click(function(evt){
				var len = altImages.length, found = 0;
				evt.preventDefault();
				altImages.each(function(i){
					if ($(this).hasClass(settings.altImageSelectedClass)){
						if (i > len-1){ found = 0; }
						else { found = i; }
					}
				});
				scene7ImageUpdate({'imageContainer':altImages.eq(found)});
			});

			prevImage.click(function(evt){
				var len = altImages.length, found = 0;
				evt.preventDefault();
				altImages.each(function(i){
					if ($(this).hasClass(settings.altImageSelectedClass)){
						if (i > 0){ found = len-1; }
						else { found = i; }
					}
				});
				scene7ImageUpdate({'imageContainer':altImages.eq(found)});
			});

			altImages.click(function(){ scene7ImageUpdate({'imageContainer':this}); });

			swatches.click(function(){ scene7SwatchUpdate({'imageContainer':this}); });

			$(swatches).find('a').click(function(evt){ evt.preventDefault(); }); /* prevent the anchors in swatches from changing our location! */

			// Using zoom navigator buttons rather than relying on click-drag to move image.
			if (useZoomNavigator){
				zoomNavUp.click(function(){ productImage.zoomControl.pan('up',1); });
				zoomNavRight.click(function(){ productImage.zoomControl.pan('right',1); });
				zoomNavDown.click(function(){ productImage.zoomControl.pan('down',1); });
				zoomNavLeft.click(function(){ productImage.zoomControl.pan('left',1); });
			}

			if (settings.bodyClickClose){
				$('body').click(function(){ if (zoomed) { zoomClose.click(); } });
			}
		};

		// Functions called after various tasks are performed by Scene7.
		var scene7Callbacks = function(){
			productImage.zoomControl.onImageZoomedIn = settings.onImageZoomedIn;
			productImage.zoomControl.onImageZoomedOut = settings.onImageZoomedOut;
			productImage.zoomControl.onImageResetted = settings.onImageReset;
			productImage.zoomControl.onImageChanged = settings.onImageChanged;
			productImage.zoomControl.onRegionSet = settings.onRegionSet;
		};


		/*

		PICASSO FUNCTIONS

		*/
		// Picasso image viewer
		var picassoImageUpdate = function(options){
			var url = options.href ? options.href : $('img', options.imageContainer).attr("src");
			var imageAttrs = filenameParser(url);
			var newProps = {'fileName': imageAttrs.fileName};
			var viewer, navControl;

			//Update the mainImage.
			var mainSrc = mainImage.attr('src');
			mainImage.attr("src", filenameReplace(mainSrc, newProps));

			//set the current altImage as active
			altImages.removeClass(settings.altImageSelectedClass);
			if (options.imageContainer) {
				$(options.imageContainer).addClass(settings.altImageSelectedClass);
			}

			if (zoomed) {
				viewer = new Seadragon.Viewer(zoomViewer[0]);
				viewer.openDzi(productImage.baseUrl  + "zoom/" + imageAttrs.filePrefix + "/dzi.xml");
				navControl = viewer.getNavControl();
				navControl.removeChild(navControl.lastChild);

				/* Create the close button */
				picassoCloseButton = new Seadragon.Button(
					"Close",
					Seadragon.Config.imagePath + settings.picassoCloseImage,
					Seadragon.Config.imagePath + settings.picassoCloseGroupHover,
					Seadragon.Config.imagePath + settings.picassoCloseHover,
					Seadragon.Config.imagePath + settings.picassoCloseMousedown,
					null,
					null,
					function() {
						zoomed = false;
						zoomContainer.hide();
						altImagesContainer.appendTo(mainImageContainer); //move alt images back to the main container.
						swatchesContainer.appendTo(mainImageContainer); //move alt images back to the main container.
					},
					null,
					null
				);
				navControl.appendChild(picassoCloseButton.elmt);
			}

		};

		// Behavior when clicking a swatch
		var picassoSwatchUpdate = function(options){
			var href = $('img', options.imageContainer).attr('src') || $('a', options.imageContainer).attr('href');

			swatches.removeClass(settings.swatchSelectedClass);
			$(options.imageContainer).addClass(settings.swatchSelectedClass);
			options.href = href;

			picassoImageUpdate(options);
		};


		// Click events for Picasso
		var picassoEvents = function(){

			mainImageContainer.click(function(evt){ evt.stopPropagation(); });

			mainImage.click(function(evt){
				evt.stopPropagation();
				zoomed = true;
				picassoImageUpdate({'href':this.src});
				zoomContainer.fadeIn().css({'top':0,'left':0});
				altImagesContainer.appendTo(zoomContainer); //move alt images to where we can see them.
				swatchesContainer.appendTo(zoomContainer); //move alt images to where we can see them.
			});

			altImages.click(function(evt){ evt.stopPropagation(); picassoImageUpdate({'imageContainer':this}); });

			swatches.click(function(evt){ picassoSwatchUpdate({'imageContainer':this}); evt.stopPropagation(); });

			$(swatches).find('a').click(function(evt){ evt.preventDefault(); });

			nextImage.click(function(evt){
				var len = altImages.length, found = 0;
				evt.preventDefault();
				altImages.each(function(i){
					if ($(this).hasClass(settings.altImageSelectedClass)){
						if (i > len-1){ found = 0; }
						else { found = i; }
					}
				});
				picassoImageUpdate({'imageContainer':altImages.eq(found)});
			});

			prevImage.click(function(evt){
				var len = altImages.length, found = 0;
				evt.preventDefault();
				altImages.each(function(i){
					if ($(this).hasClass(settings.altImageSelectedClass)){
						if (i > 0){ found = len-1; }
						else { found = i; }
					}
				});
				picassoImageUpdate({'imageContainer':altImages.eq(found)});
			});

			zoomContainer.hover(function(evt){ zoomContainer.addClass(settings.zoomHoverClass); }, function(){ zoomContainer.removeClass(settings.zoomHoverClass); });

			if (settings.bodyClickClose){
				$('body').click(function(){ if (zoomed) { zoomClose.click(); } });
			}
		};

		/*
		*
		* INITIALIZING LOGIC
		*
		*/

		// Indicate the alt image that matches the main image.
		var mainImageAttrs = filenameParser(mainImage.attr('src'));
		productImage.zoomControl = false;
		var zoomed = false;
		// map alt image to main image
		altImages.each(function(i){
			if (filenameParser($('img', altImages.eq(i)).attr('src')).fileName === mainImageAttrs.fileName){
				altImages.eq(i).addClass(settings.altImageSelectedClass);
			} else {
				altImages.eq(i).removeClass(settings.altImageSelectedClass);
			}
		});

		// Each Image Provider will have specific functions to initialize and attach events.
		switch (productImage.imageProvider.toLowerCase()){

			case "scene7":
				scene7Initialize();
				scene7Events();
				scene7Callbacks();
				break;

			case "picasso":
				picassoEvents();
				break;

			default:
				break;
		}
	});
};


