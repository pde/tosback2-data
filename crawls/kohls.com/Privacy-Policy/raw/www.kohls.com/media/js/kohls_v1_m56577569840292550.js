//// /// // /
// Reserving Kohls namespace for future project use.
//// /// // /

window.Kohls = ( typeof( window.Kohls ) !== 'undefined' && Object.prototype.toString.call( window.Kohls ) === '[object Object]' ) ? window.Kohls : { };
window.Kohls.thisNamespaceReserved = true;









jQuery( function( $ )
{

    /*ADA Changes starts */
    function remAsterisk($curVal) {
        if($curVal.find(".invalid_tt").length > 0) {
            var $idValue=$curVal.find("input:text, input:password, select").attr("id");
            $("label[for="+$idValue+"]").find("*").css("visibility","hidden");
        }
    }
    $("div").find("#fname").each(function (i) {
        var $curVal=$(this);
        remAsterisk($curVal);
    });
    $("p").each(function (i) {
        var $curVal=$(this);
        remAsterisk($curVal);
    });
    /*$( 'div.navtab' ).find( 'a' ).click( function( event ){
        event.preventDefault();
        changeTab();
    });*/
    /* ADA Changes End */

    handleCookies();

    var htmlTag  = $( 'html' ),

		$nav     = $("#navigation"),
		$utilNav = $("#utility-nav"),
		$cp      = $("#mini-cart-flyout-container"),
		$sb      = $("#search"),

		didPlacehold = false,
		sVal         = "Search by Keyword or Web ID",
		rExp         = /[^a-zA-Z 0-9 \'\.\-]+/g,

		$spf = $("#shopping_cart_form"),

		spotlightSlides = $( '#spotlight-slides' ),
		productMatrix   = $( '#product-matrix' ),

		isIE = htmlTag.hasClass( 'ie' ),

		/*isTouchDevice = 'ontouchstart' in window,*/
		mobile            = getCookie("mobile" ),
		mobileCookieValue = mobile.split( '|' );




	//// /// // /
	// Remove `no-js` class to enable full JavaScript support and CSS styling.
	//// /// // /

	htmlTag.removeClass( 'no-js' );




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	//// /// // /
	// Add `mobile-device` class to allow for mobile-specific functionality.
	//// /// // /

	if ( mobileCookieValue.length === 3 )
	{
		if ( mobileCookieValue[ 1 ] !== 'D' )
		{
			htmlTag.addClass( 'mobile-device' );
		}
	}



	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	if ($sb.val() === sVal) {
        $sb.placehold({placeholdValue:sVal});
        didPlacehold = true;
    }
    $sb.blur(function() {
        if (!didPlacehold && $sb.val() === sVal) {
            $sb.placehold({placeholdValue:sVal});
            didPlacehold = true;
        }
    });

    $("#site-search").submit(function() {
        var v = $.trim($sb.val().replace(rExp, ""));
        $sb.val(v);
        return v != sVal && v.length > 0;
    });

    var input = $("div.checkbox_sufsa").find("input:checkbox");
    var signInName = getCookie("VisitorUsaFullName");
    if ((signInName === null || signInName.length <= 0) && input.attr("checked") != "checked") {
        input.attr("checked", "checked");
    }

    if ($cp.length) {
		$cp.css({display:"none",visibility:"visible"}).slideUp(0, function() {
			$cp.slideDown("slow");
		});
		$cp.find( '#mini-cart-flyout-close' )
			.on( 'click', function( event )
				{
					event.preventDefault();

					$cp.slideUp( 'slow' );
				}
			);
	}

    if ($spf.length) {
        $spf.find("input:checkbox").click(function() {
            $spf.submit();
        });
	    $("td.prod-actions").find('a[onclick*="forms[2]"]').removeAttr("onclick").click(function(e) {
            e.preventDefault();
            $(this).parents("td").siblings("th.do-not-display").find("input[id^=remove_]").val("true").parent().siblings("td.prod-quantity").find("input:image").click();
        });
    }

    var $id = {doc:$(document)};

	$nav.removeClass("no-js");
	$utilNav.removeClass("no-js");
    $nav.children().add($utilNav.find("li.utility-item")).add($utilNav.find("li.my-account-item")).hoverIntent({over:function() {
        $( this )
			.addClass( 'hover' )
			.find( 'div[class*="-overlay"]' )
				.css( 'opacity', 0 )
				.stop()
				.slideDown( 300 )
					.animate(
						{

							'opacity' : 1

						},
						{

							'duration' : 300,
							'queue'    : false

						}
					);
    },out:function() {
        $(this)
			.removeClass( 'hover' )
			.children( 'div[class*="-overlay"]' )
				.stop()
				.slideUp( 0, function()
					{
						$( this )
							.css({

								'height'   : '',
								'margin'   : '',
								'opacity'  : '',
								'padding'  : ''

							});
					}
				);
    },interval:75,sensitivity:40});




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	//// /// // /
	// Product matrix dimension navigation.
	//// /// // /

	if ( $( '#dimensions' ).length )
	{
		( function( $ )
		{
			var dimensionGroups  = $( 'div.dimension-group' ),
				scrollContainers;




			/**
			 * Toggle the display or hiding of dimension group values.
			 *
			 * @param {Object}  event
			 * @private
			 */
			function _clickDimensionGroupToggle( event )
			{
				event.preventDefault();

				var toggle = $( this ),
					adaActionLabel = toggle.find( '.action-label' ),

					dimensionList = toggle.parent().siblings();

				// Update toggle text for ADA purposes.
				if ( toggle.hasClass( 'expand' ) )
				{
					adaActionLabel.text( 'Collapse' );
				}
				else
				{
					adaActionLabel.text( 'Expand' );
				}

				// Toggle dimension group display.
				toggle.toggleClass( 'expand collapse' );
				dimensionList.stop().slideToggle( 300, _toggleNiceScrollBar );
			}

			/**
			 * Toggle the display or hiding of the `$.fn.niceScroll` plugin scrollbar upon
			 * clicking the dimension group toggle.  Also makes sure each scroll bar stays
			 * with the appropriate dimension group.
			 *
			 * @private
			 */
			function _toggleNiceScrollBar()
			{
				if ( !!$.fn.niceScroll )
				{
					$( 'div.js-scroll' ).getNiceScroll().resize();
				}
			}




			/**
			 * Toggle the display state of the dimension item checkbox that was clicked.
			 *
			 * @private
			 */
			function _toggleDimensionCheckboxState()
			{
				var anchor = $( this ),
					dimensionsListContainer = anchor.closest( 'div.dimension-list-container' );

				// Reset flagged sibling checkboxes to their default state.
				_resetFlaggedDimensionCheckboxes( anchor );

				// Business Requirement:  Within the "Category" dimension, remove the checkmark
				// from the current selected category to make it appear as if the category
				// actually changed.  This is to prevent the display of multiple category
				// selection, which technically is not possible.
				if ( dimensionsListContainer.hasClass( 'dimension-category' ) )
				{
					dimensionsListContainer
						.find( 'div.checked' )
							.removeClass( 'checked' );
				}

				if ( anchor.hasClass( 'checked' ) )
				{
					// Remove ADA text in the checkbox.
					anchor.find( '.checkbox' ).text( '' );

					// Toggle result of checkbox interaction.
					anchor.removeClass( 'checked js-checked' ).addClass( 'js-unchecked' );
				}
				else
				{
					// Add ADA text in the checkbox to indicate dimension state.
					anchor.find( '.checkbox' ).text( '(Selected) ' );

					// Toggle result of checkbox interaction.
					anchor.addClass( 'checked js-checked' );
				}
			}

			/**
			 * Reset flagged sibling checkboxes to their default state if more than one
			 * checkbox is clicked.  Only one dimension may be selected at a time, as each
			 * addition or removal of an item triggers a complete page refresh.
			 *
			 * @param {jQueryObject}  anchor  The dimension item that was clicked for addition/removal.
			 * @private
			 */
			function _resetFlaggedDimensionCheckboxes( anchor )
			{
				var dimensionsContainer = anchor.closest( '#dimensions' ),
					checked   = dimensionsContainer.find( 'a.js-checked' ),
					unchecked = dimensionsContainer.find( 'a.js-unchecked' );

				// Reset checked checkboxes to an unchecked state.
				if ( checked.length )
				{
					checked
						.removeClass( 'checked js-checked' )
						.find( '.checkbox' )
							.text( '' );
				}

				// Reset unchecked checkboxes to a checked state.
				if ( unchecked.length )
				{
					unchecked
						.removeClass( 'js-unchecked' )
						.addClass( 'checked' )
						.find( '.checkbox' )
							.text( '(Selected) ' );
				}
			}




			//// /// // /
			// Dimension group toggles.
			//// /// // /

			dimensionGroups
				.find( 'h3' )
					.on( 'click.clickDimensionGroupToggle', 'a', _clickDimensionGroupToggle );




			//// /// // /
			// Toggle hiding of specified dimension groups.
			//// /// // /

			/*dimensionGroups
				.find( 'div.js-hide' )
					.removeClass( 'js-hide' )
					.siblings( 'h3' )
						.find( 'a' )
							.trigger( 'click' );*/




			//// /// // /
			// Dimension item checkbox toggle.
			//// /// // /

			dimensionGroups
				.children( 'div.dimension-list-container' )
					.on( 'click.toggleDimensionCheckboxState', 'a', _toggleDimensionCheckboxState );

		})( $ );
	}




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	//// /// // /
	// Product matrix spotlight gallery.
	//// /// // /

	//spotlightSlides = $( '#spotlight-slides' );

	if ( spotlightSlides.children().length > 1 )
	{
		( function( $ )
		{
			var spotlightContainer = spotlightSlides.parent();




			/**
			 * Pauses spotlight rotation, even when hovering over other elements not
			 * grouped with the spotlight, but not necessarily a spotlight slide.
			 *
			 * @param {Object} [event]
			 * @private
			 */
			function _mouseoverSpotlight( event )
			{
				spotlightSlides.cycle( 'pause' );
			}

			/**
			 * Resumes spotlight rotation, even when hovering over other elements not
			 * grouped with the spotlight, but not necessarily a spotlight slide.
			 *
			 * @param {Object} [event]
			 * @private
			 */
			function _mouseoutSpotlight( event )
			{
				spotlightSlides.cycle( 'resume' );
			}

			/**
			 * Changes the sibling spotlight arrow to transparent on `mouseover`, and fully
			 * opaque on `mouseout`.
			 *
			 * @param {Object}  event
			 * @private
			 */
			function _hoverSpotlightArrow( event )
			{
				_animateSpotlightArrow( $( this ).siblings(), event.type );
			}

			/**
			 * Animates the sibling spotlight arrow.
			 *
			 * @param {jQueryObject}  spotlightArrow  The sibling of spotlight navigation arrow triggering the event.
			 * @param {String}        eventType       The event type (i.e. 'mouseover' or 'mouseout'), which is used to determine animation effect.
			 * @private
			 */
			function _animateSpotlightArrow( spotlightArrow, eventType )
			{
				if ( isIE )
				{
					spotlightArrow
						[ _getIESpotlightArrowOpacity( eventType ) ]( 'ie-hover' );
				}
				else
				{
					spotlightArrow
						.stop()
						.animate(

							{

								'opacity' : _getSpotlightArrowOpacity( eventType )

							},
							{

								'duration' : 300,
								'queue'    : false

							}

						);
				}
			}

			/**
			 * Retrieve the opacity level to use with the current event type.
			 *
			 * @param {String}  eventType  The event type (i.e. 'mouseover' or 'mouseout'), which is used to determine animation effect.
			 */
			function _getSpotlightArrowOpacity( eventType )
			{
				var opacity;

				switch( eventType )
				{
					case 'mouseover' :
						opacity = 0.3;
						break;

					case 'mouseout' :
					default :
						opacity = 1;
						break;
				}

				return opacity;
			}

			/**
			 * Retrieve the class attribution method to handle spotlight arrow opacity
			 * specifically for Internet Explorer <= 8 due to poor display capabilities of
			 * the DirecX AlphaImageLoader.
			 *
			 * @param {String}  eventType  The event type (i.e. 'mouseover' or 'mouseout'), which is used to determine which arrow to display.
			 */
			function _getIESpotlightArrowOpacity( eventType )
			{
				var opacity;

				switch( eventType )
				{
					case 'mouseover' :
						opacity = 'addClass';
						break;

					case 'mouseout' :
					default :
						opacity = 'removeClass';
						break;
				}

				return opacity;
			}




			if ( !!$.fn.cycle )
			{
				// Build spotlight navigation previous/next arrows.
				spotlightSlides
					.before(

						  '<div class="spotlight-arrows">'
						+ '<a href="#" class="spotlight-arrow spotlight-previous ir">Previous Spotlight</a>'
						+ '<a href="#" class="spotlight-arrow spotlight-next ir">Next Spotlight</a>'
						+ '</div>'

					);

				spotlightContainer
					.find( 'a.spotlight-arrow' )
						.on( 'mouseover.hoverSpotlightArrow', _hoverSpotlightArrow )
						.on( 'mouseout.hoverSpotlightArrow', _hoverSpotlightArrow );

				spotlightContainer
					.on( 'mouseover.mouseoverSpotlight', _mouseoverSpotlight )
					.on( 'mouseout.mouseoutSpotlight', _mouseoutSpotlight );

				spotlightSlides
					.cyclePagination({

							'containerResize' : false,

							'hideAllText'     : 'replace',

							'next'            : spotlightContainer.find( 'a.spotlight-next' ),
							'prev'            : spotlightContainer.find( 'a.spotlight-previous' )

						});
			}

		})( $ );
	}




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	//// /// // /
	// Convert "sort by" <select> menu to a styleable list.
	//// /// // /

	if ( $( 'select.js-select-list' ).length )
	{
		( function( $ )
		{
			if ( !!$.fn.selectList )
			{
				$( 'select.js-select-list' )
					.selectList()
					.on( 'change.selectList', function()
						{
							var selectElement  = $( this ),
								selectedOption = $.trim( selectElement.children( ':selected' ).val() );

							if ( selectedOption.length )
							{
								window.location.href = selectedOption;
							}
						}
					);
			}

		})( $ );
	}




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




	//// /// // /
	// Product matrix display and functionality controls.
	//// /// // /

	if ( productMatrix.length )
	{
		( function( $ )
		{
			var imageSizeDisplay = $( '#image-size-display' ),
				swatchContainers = productMatrix.find( 'div.swatch-container' ),

				productMatrixPositionCookie;




			/**
			 * Change which image size toggle button has been clicked and is active.
			 *
			 * @param {Object}  event  Click event data used to prevent default anchor element functionality.
			 * @private
			 */
			function _productImageSizeToggleChange( event )
			{
				event.preventDefault();

				$( this )
					.parent()
						.addClass( 'selected' )
					.siblings()
						.removeClass( 'selected' );
			}

			/**
			 * Change the Scene7 `wid` and `hei` query string parameters to the value
			 * associated with the image size toggle button that was clicked.
			 *
			 * @param {Object}  event  Click event data containing additional data values to modify product containers.
			 * @private
			 */
			function _productImageSizeChange( event )
			{
				var data = event.data;

				// Control row clearing to allow for variable height product containers.  Ideal
				// circumstances would allow for the 'row-clear' class being applied directly
				// to a product container, but to support IE6/7, a separate <li> element must
				// be used instead.
				$( 'li.row-clear' ).remove();

				$( 'li.product' )
					.each( function( i )
						{
							if ( i !== 0 && i % data.clearAfter === 0 )
							{
								$( this ).before( '<li class="row-clear"></li>' );
							}
						}
					);

				// Change product image dimensions.
				$( 'img.product-image' )
					.each( function()
						{
							// Change product image dimensions called from Scene7.
							this.src = this.src.replace( /(wid|hei)=[\d]+/g, function( str )
								{
									return str.replace( /[\d]+/, data.imageSize );
								}
							);

							this.width  = data.imageSize;
							this.height = data.imageSize;

							// Change product container size.
							$( this )
								.closest( 'li' )
									.addClass( data.addClass )
									.removeClass( data.removeClass );
						}
					);

				// Set a cookie to retain product image size.
				_setProductImageSizeCookie( data );
			}

			/**
			 * Sets a cookie to save the product image size state selected.  The state is
			 * retained from page to page, and if refreshed.
			 *
			 * @param {Object}  data  Additional data values passed in the click event.
			 */
            function _setProductImageSizeCookie( data )
			{
                var imageSizeToggle = data.addClass.replace( 'product-', '' );

                $.cookie( 'productImageSize', imageSizeToggle  + '|' + data.imageSize, { 'expires' : 30, 'path' : '/' } );
            }




			//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




			/**
			 * Change the Scene7 image name of the main product image to the image name as
			 * found in the swatch that is hovered.
			 *
			 * @param {Object} [event]
			 * @private
			 */
			function _mouseoverSwatch( event )
			{
				var listItem = $( this ),

					swatchColorName,
					productImage, productImageSource;

				if ( _isSwatchListItem( listItem ) )
				{
					swatchColorName    = ( listItem.find( 'img' ).attr( 'src' ).match( /(?!\/)[\w]*(?=_sw\?)/ ) || [ '' ] )[ 0 ];

					productImage       = listItem.closest( 'li.product' ).find( 'img.product-image' );
					productImageSource = productImage.attr( 'src' );

					if ( swatchColorName )
					{
						// Clear the timeout if another swatch is active.
						clearTimeout( productImage.data().timeout );

						productImage.attr( 'src', productImageSource.replace( /(?!\/)[\w]*(?=\?)/, swatchColorName ) );
					}
				}
			}

			/**
			 * Revert the Scene7 image name of the main product image back to the original
			 * name when not hovering over a swatch.
			 *
			 * @param {Object} [event]
			 * @private
			 */
			function _mouseoutSwatch( event )
			{
				var listItem = $( this ),

					productImage, productImageSource,
					originalImageData,

					timeout;

				if ( _isSwatchListItem( listItem ) )
				{
					productImage       = listItem.closest( 'li.product' ).find( 'img.product-image' );
					productImageSource = productImage.attr( 'src' );

					originalImageData  = productImage.data( 'originalImage' );

					if ( originalImageData )
					{
						// Set a timeout to prevent product image flickering when hovering over another
						// swatch.  This flickering is caused due to the delay when loading a new
						// product image.
						timeout = setTimeout( function()
						{
							productImage.attr( 'src', productImageSource.replace( /(?!\/)[\w]*(?=\?)/, originalImageData ) );

						}, 350 );

						productImage.data( 'timeout', timeout );
					}
				}
			}

			/**
			 *
			 *
			 * @param {jQueryObject}  listItem
			 * @return {Boolean}
			 * @private
			 */
			function _isSwatchListItem( listItem )
			{
				return !listItem.hasClass( 'toggle' ) && !listItem.hasClass( 'even-more' );
			}




			//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




			/**
			 * Checks swatch containers for maximum visible swatches, and optionally
			 * applies a toggle switch to expand/collapse if greater.
			 *
			 * @param {Object}  event
			 * @private
			 */
			function _initializeSwatchContainers( event )
			{
				var swatchContainer,
					swatches, numberOfSwatches,

					maxSwatchesBeforeToggle = event.data.maxBeforeToggle,

					productLink,

					i, end;

				// Reset swatch containers, especially if changing product image size.
				_resetSwatchContainers();

				end = swatchContainers.length;
				for ( i = 0; i < end; i++ )
				{
					swatchContainer  = swatchContainers.eq( i );
					swatches         = swatchContainer.find( 'li' );
					numberOfSwatches = swatches.length;

					if ( numberOfSwatches > maxSwatchesBeforeToggle )
					{
						// Add and display a plus icon to allow expanding/collapsing of the swatch
						// container if there are more than 9 swatches.
						swatchContainer
							.addClass( 'toggle-enabled' )
							.data( 'originalHeight', swatchContainer.css( 'height' ) );

						swatches
							.eq( maxSwatchesBeforeToggle - 2 )
								.after(

									  '<li class="toggle">'
									+ '<a href="#" class="toggle-button toggle-expand ir"><span class="action-label">Show</span> more color options.</a>'
									+ '</li>'

								);

						// Display a link to the product page if there are 28 swatches so there isn't a
						// massive list of swatches (e.g. lipsticks, blushes, etc.).  This quantity
						// assumes that there are possibly many more swatches available, but should
						// only occur in minimal circumstances.
						if ( numberOfSwatches > 28 )
						{
							productLink = swatchContainer.siblings( 'a' ).attr( 'href' );

                            swatches.eq( -1 ).hide();

							swatches
								.eq( -2 )
									.after(

										  '<li class="even-more">'
										+ '<a href="' + productLink + '">Even more<span class="visually-hidden"> color options available</span>&hellip;</a>'
										+ '</li>'

									);
						}
					}
				}

				// Attach event handlers to swatch containers.
				_enableSwatchContainerToggle();
			}

			/**
			 * Resets swatch containers by removing any attached toggle switches.
			 *
			 * @private
			 */
			function _resetSwatchContainers()
			{
				var toggleEnabledContainers = swatchContainers.filter( '.toggle-enabled' ),
					swatchContainer,

					i, end;

				end = toggleEnabledContainers.length;
				for ( i = 0; i < end; i++ )
				{
					swatchContainer = toggleEnabledContainers.eq( i );

					swatchContainer
						.removeClass( 'toggle-enabled' )
						.css( 'height', '' );

					swatchContainer
						.find( 'li.toggle' )
							.remove();

					swatchContainer
						.find( 'li.even-more' )
							.remove();
				}
			}

			/**
			 * Attach event handlers to swatch container toggle switches.
			 *
			 * @private
			 */
			function _enableSwatchContainerToggle()
			{
				swatchContainers
					.filter( '.toggle-enabled' )
						.on( 'click.clickSwatchContainerToggle', 'a.toggle-button', _clickSwatchContainerToggle );
			}

			/**
			 * Handle how the swatch container is displayed when the toggle is clicked.
			 *
			 * @param {Object} [event]
			 * @private
			 */
			function _clickSwatchContainerToggle( event )
			{
				var swatchContainerToggle = $( this ),
					adaActionLabel = swatchContainerToggle.find( '.action-label' );

				// Update toggle text for ADA purposes.
				if ( swatchContainerToggle.hasClass( 'toggle-expand' ) )
				{
					adaActionLabel.text( 'Hide' );
				}
				else
				{
					adaActionLabel.text( 'Show' );
				}

				// Toggle swatch group display.
				swatchContainerToggle.toggleClass( 'toggle-expand toggle-collapse' );
				_expandCollapseSwatchContainer( swatchContainerToggle.closest( 'div.swatch-container' ) );
			}

			/**
			 * Expands or collapses the swatch container, either revealing or hiding
			 * additional swatches.
			 *
			 * @param {jQueryObject}  swatchContainer  The main swatch container that controls the hiding of additional swatches.
			 * @private
			 */
			function _expandCollapseSwatchContainer( swatchContainer )
			{
				swatchContainer
					.stop()
					.animate(

						{

							'height' : _getSwatchContainerAnimateHeight( swatchContainer )

						},
						{

							'duration' : 150,
							'queue'    : false

						}

					);
			}

			/**
			 * Retrieve the necessary height dimension to which the swatch container
			 * should be animated.
			 *
			 * @param {jQueryObject}  swatchContainer  The main swatch container that controls the hiding of additional swatches.
			 * @private
			 */
			function _getSwatchContainerAnimateHeight( swatchContainer )
			{
				var swatchContainerOriginalHeight = swatchContainer.data().originalHeight,
					swatchContainerHeight         = swatchContainer.css( 'height' ),

					swatchListHeight = swatchContainer.children( 'ul' ).css( 'height' );

				return ( swatchContainerHeight === swatchContainerOriginalHeight ) ? swatchListHeight : swatchContainerOriginalHeight;
			}




			//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




			/**
			 * Set the position of the browser window when clicking on a dimension item,
			 * but only if the window has been scrolled beyond the height of the global
			 * page header.
			 */
			function _setProductMatrixPositionCookie()
			{
				var scrollLocation = $( document ).scrollTop(),
					headerHeight   = $( '#header' ).css( 'height' ).replace( 'px', '' );

				if ( scrollLocation > headerHeight )
				{
					// Set window position cookie to bottom of header.
					$.cookie( 'productMatrixPosition', headerHeight, { 'path' : '/' } );
				}
			}




			//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




			//// /// // /
			// Image size display toggles.
			//// /// // /

			imageSizeDisplay
				.find( 'a.image-size-small' )
					.on( 'click.productImageSizeToggleChange', _productImageSizeToggleChange )
					.on(

						'click.productImageSizeChange',
						{

							'clearAfter'  : 4,
							'imageSize'   : 180,
							'addClass'    : 'product-small',
							'removeClass' : 'product-large  product-medium'

						},
						_productImageSizeChange

					).on(

						'click.initializeProductSwatches',
						{

							'maxBeforeToggle' : 9

						},
						_initializeSwatchContainers

					);

			imageSizeDisplay
				.find( 'a.image-size-medium' )
					.on( 'click.productImageSizeToggleChange', _productImageSizeToggleChange )
					.on(

						'click.productImageSizeChange',
						{

							'clearAfter'  : 3,
							'imageSize'   : 243,
							'addClass'    : 'product-medium',
							'removeClass' : 'product-large  product-small'

						},
						_productImageSizeChange

					).on(

						'click.initializeProductSwatches',
						{

							'maxBeforeToggle' : 12

						},
						_initializeSwatchContainers

					);

			imageSizeDisplay
				.find( 'a.image-size-large' )
					.on( 'click.productImageSizeToggleChange', _productImageSizeToggleChange )
					.on(

						'click.productImageSizeChange',
						{

							'clearAfter'  : 2,
							'imageSize'   : 372,
							'addClass'    : 'product-large',
							'removeClass' : 'product-small  product-medium'

						},
						_productImageSizeChange

					).on(

						'click.initializeProductSwatches',
						{

							'maxBeforeToggle' : 19

						},
						_initializeSwatchContainers

					);




			//// /// // /
			// Product image swatches.
			//// /// // /

			if ( swatchContainers.length )
			{
				swatchContainers
					.on( 'click', 'a', function( event )
						{
							if ( /#$/.test( this.href ) )
							{
								event.preventDefault();

								$( this ).parent().trigger( 'mouseover.mouseoverSwatch' );
							}
						}
					).on( 'mouseover.mouseoverSwatch', 'li', _mouseoverSwatch )
					.on( 'mouseout.mouseoutSwatch', 'li', _mouseoutSwatch );

				// Enable toggles on swatch containers that exceed the maximum number of
				// swatches to display in a single line.  The maximum number of swatches to
				// display is determined by which image size toggle is active.
				imageSizeDisplay
					.find( 'li.selected' )
						.children()
							.trigger( 'click.initializeProductSwatches' );
			}




			//// /// // /
			// Reloading page to same location.
			//// /// // /

			productMatrixPositionCookie = $.cookie( 'productMatrixPosition' );

			if ( productMatrixPositionCookie )
			{
				// Position the window based upon cookie value.
				$( document ).scrollTop( productMatrixPositionCookie );

				// Remove cookie after use.
				$.cookie( 'productMatrixPosition', null, { 'path' : '/' } );
			}

			$( 'div.dimension-list' )
				.add( $( 'div.select-list' ) )
				.add( $( 'div.view-indicator' ) )
					.on( 'click.setProductMatrixPositionCookie', 'a', _setProductMatrixPositionCookie );

		})( $ );
	}




	//// //  /  // //// //  /  // //// //  /  // //// //  /  // //// //  /  // ////




    if (!window.navigator.cookieEnabled) {
        var $cdiv = $('<div id="noCookieDiv"></div>').addClass("error").append("<p>Cookies are required to make a purchase on Kohls.com.</p>").append('<p class="message_description">To learn how to enable cookies in your browser, <a href="/kohlsStore/ourbrands/cookiesrequired.jsp">read this.</a></p>').hide();
        $cdiv.insertAfter("#header").fadeIn();
    }

    $id.group = $("div.group");
    if ($id.group.length > 0) {
        $id.group.eq(1).append($id.group.eq(2).find("a"));
        $id.group.eq(2).remove();
        $id.group.each(function() {
            $(this).find("a").slice(-1).css({"background-image":"none"});
        });
        $id.group.find("a").eq(0).addClass("email-alerts");
    }

    if(mobile.indexOf("0") === 0 || mobile.indexOf("1") === 1){
    	displayMobileFooter();
    }

	$('#showme').hide();
	$("#ya-expnd-feat").click(function() {
		$('#showme').fadeToggle('slow', updateLinkText);
		function updateLinkText(){
			var $link = $("#ya-expnd-feat");
			$(this).is(":visible") ? $link.text("Featured [-]") : $link.text("Featured [+]");
		}
		return false;
	});

	// My Account Login tab switching
	$( 'div.navtab' )
		.find( 'a' )
			.parent()
				.on( 'click', function( event )
					{
						event.preventDefault();

						changeTab();
					}
				);

});









function displayMobileFooter(){
	var curTemplate = $("meta[name='currentTemplate']").attr("content"),
	switchLink = (location.search.length > 0) ? "&viewsitemode=" : "?viewsitemode=",
	_id = {
	    viewstate: $('<div id="view-state" />').html("<p />"),
	    bottomnav: $("div.bottomnav"),
	    lowernav: $("div.lowernav")
     };
	if(typeof(curTemplate) !== "undefined"){
		if (curTemplate.indexOf("/homepage.jsp") > -1 || curTemplate.indexOf("webstore/home.jsp") > -1) {
	       _id.viewstate.css({
	           "border-bottom": "1px solid #f2f2f2",
	           "line-height": "28px",
	           margin: "0 0 5px",
	           width: "auto",
	           height: "28px"
	       }).find("p").html('View Kohl\'s in: Standard | <a href="' + location.href + switchLink + 'mobile">Mobile</a>');
	       _id.lowernav.find("div.hp_disclaim").before(_id.viewstate);
	   } else {
	       _id.viewstate.css({
	           "border-bottom": "1px solid #f2f2f2",
	           "border-top": "1px solid #f2f2f2",
	           clear: "both",
	           display: "block",
	           "line-height": "12px",
	           margin: "0 0 5px",
	           "text-align": "center",
	           width: "auto",
	           height: "28px"
	       }).find("p").html('View Kohl\'s in: Standard | <a href="' + location.href + switchLink + 'mobile">Mobile</a>');
	       _id.bottomnav.find("div.disclaimer").css({
	           "line-height": "28px",
	           margin: "0 0 5px",
	           "text-align": "center"
	       }).before(_id.viewstate);
	   }
	}
	if(/product_page\.jsp$|product_page_multiple\.jsp$/.test(location.href)){
     	updateSwitchLink();
     }
	// clear the session cookie to allow cart to properly reload when switching views
	$("#view-state").find("a").bind("click",function(){
       	var hasCart = getCookie("kohls_cart") !== "",
       	sessionCookie = "JSESSIONID";
       	if(hasCart){
       		document.cookie = sessionCookie + '=;path=/; expires=Thu, 01-Jan-70 00:00:01 GMT;';
       	}
    });
}




function updateSwitchLink(){
   	var metaUrl = $("meta[property='og:url']").attr("content"),
   	switchLink = $("#view-state").find("a"),
   	rebuiltUrl = switchLink.attr("href");
   	
   	// found the facebook url so use that
   	if(typeof(metaUrl) !== "undefined" && metaUrl.indexOf("PRODUCT<>prd_id") > -1){
   		var metaAnchor = document.createElement('a');
		metaAnchor.href = metaUrl;
   		rebuiltUrl = metaAnchor.protocol + "//" + metaAnchor.host + metaAnchor.pathname + metaAnchor.search + "&viewsitemode=mobile";
   	}else{
   		// build url manually
   		var search = location.search.length > 0 ? location.search + "&" : "?",
   		productMeta = $("meta[name='product-path']").attr("content").split("/"),
   		product = productMeta[productMeta.length - 1],
   		productName = $("meta[name='title']").attr("content").replace(/\s/g,"+").replace(/\./g,"").replace(/-/g,""),
   		productPath = "/kohlsStore/PRD~" + product + "/" + productName + ".jsp";
   		
   		rebuiltUrl = location.protocol + "//" + location.host + productPath + search + "viewsitemode=mobile";
   	}
   	
   	switchLink.attr("href", rebuiltUrl);
}




function handleCookies()
{
    var customerNameCookie        = getCookie( 'VisitorUsaFullName' ),
		customerShoppingBagCookie = getCookie( 'VisitorBagTotals' ),

		miniCart,

		split;

	// Display customer's first name.
	if ( customerNameCookie )
	{
		split = customerNameCookie.split( '|' );

		if ( split.length > 1 )
		{
			$( '#my-account-nav' )
				.toggleClass( 'not-signed-in is-signed-in' )
				.find( 'span.first-name' )
					.text( split[ 0 ] );
		}
	}

	// Display shopping bag sub-total and number of items.
	if ( customerShoppingBagCookie )
	{
		split = customerShoppingBagCookie.split( '|' );

		if ( split.length > 1 )
		{
			miniCart = $( '#mini-cart' );

			// Update all subtotal placeholders.
			miniCart
				.find( 'span.subtotal' )
				.text( split[ 0 ] );

			// Update all number of shopping bag items placeholders.
			miniCart
				.find( 'span.number-items' )
				.text( split[ 1 ] );
		}
	}
}




function getCookie(n) {
    if (document.cookie.length > 0) {
        var s = document.cookie.indexOf(n + "=");
        if (s !== -1) {
            s = s + n.length + 1;
            var e = document.cookie.indexOf(";", s);
            if (e === -1) {
                e = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(s, e));
        }
    }
    return"";
}




function hideElement(elementId) {
    $("#" + elementId).slideUp();
}








/*!
 * jQuery TextNodes
 * Get the DOM text nodes in the current set of matched elements.
 */
jQuery.fn.textNodes = function()
{
	var nodes = this;

	if ( nodes.length )
	{
		nodes = nodes
			.contents()
			.filter( function()
				{
					return this.nodeType === 3;
				}
			);
	}

	return nodes;
};




/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(e){function n(e){return e}function r(e){return decodeURIComponent(e.replace(t," "))}function i(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return s.json?JSON.parse(e):e}catch(t){}}var t=/\+/g;var s=e.cookie=function(t,o,u){if(o!==undefined){u=e.extend({},s.defaults,u);if(typeof u.expires==="number"){var a=u.expires,f=u.expires=new Date;f.setDate(f.getDate()+a)}o=s.json?JSON.stringify(o):String(o);return document.cookie=[s.raw?t:encodeURIComponent(t),"=",s.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join("")}var l=s.raw?n:r;var c=document.cookie.split("; ");var h=t?undefined:{};for(var p=0,d=c.length;p<d;p++){var v=c[p].split("=");var m=l(v.shift());var g=l(v.join("="));if(t&&t===m){h=i(g);break}if(!t){h[m]=i(g)}}return h};s.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend(n,{expires:-1}));return true}return false}})(jQuery);



/*!
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */

(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s===1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind("mouseenter",handleHover).bind("mouseleave",handleHover)}})(jQuery);




/*!
 * jQuery selectList Plugin
 * Copyright (c) 2010 Tutorialzine
 * Version: 2.0.0
 * License information unknown
 *
 * http://tutorialzine.com/2010/11/better-select-jquery-css3/
 *
 * Heavily modified by Kohl's for accessibility enhancements and making `data-*` attributes optional.
 */
(function(b,a,c,d){c.fn.selectList=function(){var f=this,i=c('<div class="select-list"><a href="#" class="select-box"></a><div class="select-arrow"></div></div>'),h=i.find(".select-box"),e=c('<div class="select-dropdown-container"><ul class="select-dropdown"></ul></div>'),g=e.find(".select-dropdown");f.find("option").each(function(j){var k=c(this),n=k.data(),m=c('<li><a href="#"></a></li>'),l=m.find("a");if(f.prop("selectedIndex")===j){h.html(k.text());}if(n.skip){return true;}if(n.icon){l.append('<img src="'+n.icon+'" />');}l.append("<span>"+k.text()+"</span>");m.click(function(o){o.preventDefault();h.html(k.text());e.trigger("hide");f.val(k.val()).trigger("change");});g.append(m);});i.append(e.hide());f.siblings("label").removeAttr("for");f.hide().after(i);e.on("show",function(){if(e.is(":animated")){return false;}i.addClass("expanded");e.stop().slideDown(300);}).on("hide",function(){if(e.is(":animated")){return false;}i.removeClass("expanded");e.stop().slideUp(300);}).on("toggle",function(){if(h.hasClass("expanded")){e.trigger("hide");}else{e.trigger("show");}});h.click(function(j){j.preventDefault();e.trigger("toggle");});c(a).on("click.document.selectList",function(){e.trigger("hide");});return this;};})(window,document,jQuery);




/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.5 (10-APR-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
(function(c,d){var b="2.9999.5";if(c.support===d){c.support={opacity:!(c.browser.msie)};}function g(t){if(c.fn.cycle.debug){f(t);}}function f(){if(window.console&&console.log){console.log("[cycle] "+Array.prototype.join.call(arguments," "));}}c.expr[":"].paused=function(s){return s.cyclePause;};c.fn.cycle=function(t,s){var u={s:this.selector,c:this.context};if(this.length===0&&t!="stop"){if(!c.isReady&&u.s){f("DOM not ready, queuing slideshow");c(function(){c(u.s,u.c).cycle(t,s);});return this;}f("terminating; zero elements found by selector"+(c.isReady?"":" (DOM not ready)"));return this;}return this.each(function(){var y=l(this,t,s);if(y===false){return;}y.updateActivePagerLink=y.updateActivePagerLink||c.fn.cycle.updateActivePagerLink;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);}this.cycleTimeout=this.cyclePause=0;this.cycleStop=0;var z=c(this);var A=y.slideExpr?c(y.slideExpr,this):z.children();var w=A.get();if(w.length<2){f("terminating; too few slides: "+w.length);return;}var v=q(z,A,w,y,u);if(v===false){return;}var x=v.continuous?10:m(w[v.currSlide],w[v.nextSlide],v,!v.backwards);if(x){x+=(v.delay||0);if(x<10){x=10;}g("first timeout: "+x);this.cycleTimeout=setTimeout(function(){n(w,v,0,!y.backwards);},x);}});};function k(s,v,u){var w=c(s).data("cycle.opts");var t=!!s.cyclePause;if(t&&w.paused){w.paused(s,w,v,u);}else{if(!t&&w.resumed){w.resumed(s,w,v,u);}}}function l(s,v,t){if(s.cycleStop===d){s.cycleStop=0;}if(v===d||v===null){v={};}if(v.constructor==String){switch(v){case"destroy":case"stop":var x=c(s).data("cycle.opts");if(!x){return false;}s.cycleStop++;if(s.cycleTimeout){clearTimeout(s.cycleTimeout);}s.cycleTimeout=0;if(x.elements){c(x.elements).stop();}c(s).removeData("cycle.opts");if(v=="destroy"){r(s,x);}return false;case"toggle":s.cyclePause=(s.cyclePause===1)?0:1;w(s.cyclePause,t,s);k(s);return false;case"pause":s.cyclePause=1;k(s);return false;case"resume":s.cyclePause=0;w(false,t,s);k(s);return false;case"prev":case"next":x=c(s).data("cycle.opts");if(!x){f('options not found, "prev/next" ignored');return false;}c.fn.cycle[v](x);return false;default:v={fx:v};}return v;}else{if(v.constructor==Number){var u=v;v=c(s).data("cycle.opts");if(!v){f("options not found, can not advance slide");return false;}if(u<0||u>=v.elements.length){f("invalid slide index: "+u);return false;}v.nextSlide=u;if(s.cycleTimeout){clearTimeout(s.cycleTimeout);s.cycleTimeout=0;}if(typeof t=="string"){v.oneTimeFx=t;}n(v.elements,v,1,u>=v.currSlide);return false;}}return v;function w(z,A,y){if(!z&&A===true){var B=c(y).data("cycle.opts");if(!B){f("options not found, can not resume");return false;}if(y.cycleTimeout){clearTimeout(y.cycleTimeout);y.cycleTimeout=0;}n(B.elements,B,1,!B.backwards);}}}function e(s,t){if(!c.support.opacity&&t.cleartype&&s.style.filter){try{s.style.removeAttribute("filter");}catch(u){}}}function r(s,t){if(t.next){c(t.next).unbind(t.prevNextEvent);}if(t.prev){c(t.prev).unbind(t.prevNextEvent);}if(t.pager||t.pagerAnchorBuilder){c.each(t.pagerAnchors||[],function(){this.unbind().remove();});}t.pagerAnchors=null;c(s).unbind("mouseenter.cycle mouseleave.cycle");if(t.destroy){t.destroy(t);}}function q(C,Q,z,y,J){var s;var H=c.extend({},c.fn.cycle.defaults,y||{},c.metadata?C.metadata():c.meta?C.data():{});var F=c.isFunction(C.data)?C.data(H.metaAttr):null;if(F){H=c.extend(H,F);}if(H.autostop){H.countdown=H.autostopCount||z.length;}var u=C[0];C.data("cycle.opts",H);H.$cont=C;H.stopCount=u.cycleStop;H.elements=z;H.before=H.before?[H.before]:[];H.after=H.after?[H.after]:[];if(!c.support.opacity&&H.cleartype){H.after.push(function(){e(this,H);});}if(H.continuous){H.after.push(function(){n(z,H,0,!H.backwards);});}i(H);if(!c.support.opacity&&H.cleartype&&!H.cleartypeNoBg){a(Q);}if(C.css("position")=="static"){C.css("position","relative");}if(H.width){C.width(H.width);}if(H.height&&H.height!="auto"){C.height(H.height);}if(H.startingSlide!==d){H.startingSlide=parseInt(H.startingSlide,10);if(H.startingSlide>=z.length||H.startSlide<0){H.startingSlide=0;}else{s=true;}}else{if(H.backwards){H.startingSlide=z.length-1;}else{H.startingSlide=0;}}if(H.random){H.randomMap=[];for(var O=0;O<z.length;O++){H.randomMap.push(O);}H.randomMap.sort(function(S,w){return Math.random()-0.5;});if(s){for(var M=0;M<z.length;M++){if(H.startingSlide==H.randomMap[M]){H.randomIndex=M;}}}else{H.randomIndex=1;H.startingSlide=H.randomMap[1];}}else{if(H.startingSlide>=z.length){H.startingSlide=0;}}H.currSlide=H.startingSlide||0;var B=H.startingSlide;Q.css({position:"absolute",top:0,left:0}).hide().each(function(w){var S;if(H.backwards){S=B?w<=B?z.length+(w-B):B-w:z.length-w;}else{S=B?w>=B?z.length-(w-B):B-w:z.length-w;}c(this).css("z-index",S);});c(z[B]).css("opacity",1).show();e(z[B],H);if(H.fit){if(!H.aspect){if(H.width){Q.width(H.width);}if(H.height&&H.height!="auto"){Q.height(H.height);}}else{Q.each(function(){var S=c(this);var w=(H.aspect===true)?S.width()/S.height():H.aspect;if(H.width&&S.width()!=H.width){S.width(H.width);S.height(H.width/w);}if(H.height&&S.height()<H.height){S.height(H.height);S.width(H.height*w);}});}}if(H.center&&((!H.fit)||H.aspect)){Q.each(function(){var w=c(this);w.css({"margin-left":H.width?((H.width-w.width())/2)+"px":0,"margin-top":H.height?((H.height-w.height())/2)+"px":0});});}if(H.center&&!H.fit&&!H.slideResize){Q.each(function(){var w=c(this);w.css({"margin-left":H.width?((H.width-w.width())/2)+"px":0,"margin-top":H.height?((H.height-w.height())/2)+"px":0});});}var I=H.containerResize&&!C.innerHeight();if(I){var A=0,G=0;for(var L=0;L<z.length;L++){var t=c(z[L]),R=t[0],E=t.outerWidth(),P=t.outerHeight();if(!E){E=R.offsetWidth||R.width||t.attr("width");}if(!P){P=R.offsetHeight||R.height||t.attr("height");}A=E>A?E:A;G=P>G?P:G;}if(A>0&&G>0){C.css({width:A+"px",height:G+"px"});}}var x=false;if(H.pause){C.bind("mouseenter.cycle",function(){x=true;this.cyclePause++;k(u,true);}).bind("mouseleave.cycle",function(){if(x){this.cyclePause--;}k(u,true);});}if(o(H)===false){return false;}var v=false;y.requeueAttempts=y.requeueAttempts||0;Q.each(function(){var U=c(this);this.cycleH=(H.fit&&H.height)?H.height:(U.height()||this.offsetHeight||this.height||U.attr("height")||0);this.cycleW=(H.fit&&H.width)?H.width:(U.width()||this.offsetWidth||this.width||U.attr("width")||0);if(U.is("img")){var S=(c.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var V=(c.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var T=(c.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var w=(this.cycleH===0&&this.cycleW===0&&!this.complete);if(S||V||T||w){if(J.s&&H.requeueOnImageNotLoaded&&++y.requeueAttempts<100){f(y.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){c(J.s,J.c).cycle(y);},H.requeueTimeout);v=true;return false;}else{f("could not determine size of image: "+this.src,this.cycleW,this.cycleH);}}}return true;});if(v){return false;}H.cssBefore=H.cssBefore||{};H.cssAfter=H.cssAfter||{};H.cssFirst=H.cssFirst||{};H.animIn=H.animIn||{};H.animOut=H.animOut||{};Q.not(":eq("+B+")").css(H.cssBefore);c(Q[B]).css(H.cssFirst);if(H.timeout){H.timeout=parseInt(H.timeout,10);if(H.speed.constructor==String){H.speed=c.fx.speeds[H.speed]||parseInt(H.speed,10);}if(!H.sync){H.speed=H.speed/2;}var K=H.fx=="none"?0:H.fx=="shuffle"?500:250;while((H.timeout-H.speed)<K){H.timeout+=H.speed;}}if(H.easing){H.easeIn=H.easeOut=H.easing;}if(!H.speedIn){H.speedIn=H.speed;}if(!H.speedOut){H.speedOut=H.speed;}H.slideCount=z.length;H.currSlide=H.lastSlide=B;if(H.random){if(++H.randomIndex==z.length){H.randomIndex=0;}H.nextSlide=H.randomMap[H.randomIndex];}else{if(H.backwards){H.nextSlide=H.startingSlide===0?(z.length-1):H.startingSlide-1;}else{H.nextSlide=H.startingSlide>=(z.length-1)?0:H.startingSlide+1;}}if(!H.multiFx){var N=c.fn.cycle.transitions[H.fx];if(c.isFunction(N)){N(C,Q,H);}else{if(H.fx!="custom"&&!H.multiFx){f("unknown transition: "+H.fx,"; slideshow terminating");return false;}}}var D=Q[B];if(!H.skipInitializationCallbacks){if(H.before.length){H.before[0].apply(D,[D,D,H,true]);}if(H.after.length){H.after[0].apply(D,[D,D,H,true]);}}if(H.next){c(H.next).bind(H.prevNextEvent,function(){return h(H,1);});}if(H.prev){c(H.prev).bind(H.prevNextEvent,function(){return h(H,0);});}if(H.pager||H.pagerAnchorBuilder){p(z,H);}j(H,z);return H;}function i(s){s.original={before:[],after:[]};s.original.cssBefore=c.extend({},s.cssBefore);s.original.cssAfter=c.extend({},s.cssAfter);s.original.animIn=c.extend({},s.animIn);s.original.animOut=c.extend({},s.animOut);c.each(s.before,function(){s.original.before.push(this);});c.each(s.after,function(){s.original.after.push(this);});}function o(y){var w,u,t=c.fn.cycle.transitions;if(y.fx.indexOf(",")>0){y.multiFx=true;y.fxs=y.fx.replace(/\s*/g,"").split(",");for(w=0;w<y.fxs.length;w++){var x=y.fxs[w];u=t[x];if(!u||!t.hasOwnProperty(x)||!c.isFunction(u)){f("discarding unknown transition: ",x);y.fxs.splice(w,1);w--;}}if(!y.fxs.length){f("No valid transitions named; slideshow terminating.");return false;}}else{if(y.fx=="all"){y.multiFx=true;y.fxs=[];for(var z in t){if(t.hasOwnProperty(z)){u=t[z];if(t.hasOwnProperty(z)&&c.isFunction(u)){y.fxs.push(z);}}}}}if(y.multiFx&&y.randomizeEffects){var v=Math.floor(Math.random()*20)+30;for(w=0;w<v;w++){var s=Math.floor(Math.random()*y.fxs.length);y.fxs.push(y.fxs.splice(s,1)[0]);}g("randomized fx sequence: ",y.fxs);}return true;}function j(t,s){t.addSlide=function(v,w){var u=c(v),x=u[0];if(!t.autostopCount){t.countdown++;}s[w?"unshift":"push"](x);if(t.els){t.els[w?"unshift":"push"](x);}t.slideCount=s.length;if(t.random){t.randomMap.push(t.slideCount-1);t.randomMap.sort(function(z,y){return Math.random()-0.5;});}u.css("position","absolute");u[w?"prependTo":"appendTo"](t.$cont);if(w){t.currSlide++;t.nextSlide++;}if(!c.support.opacity&&t.cleartype&&!t.cleartypeNoBg){a(u);}if(t.fit&&t.width){u.width(t.width);}if(t.fit&&t.height&&t.height!="auto"){u.height(t.height);}x.cycleH=(t.fit&&t.height)?t.height:u.height();x.cycleW=(t.fit&&t.width)?t.width:u.width();u.css(t.cssBefore);if(t.pager||t.pagerAnchorBuilder){c.fn.cycle.createPagerAnchor(s.length-1,x,c(t.pager),s,t);}if(c.isFunction(t.onAddSlide)){t.onAddSlide(u);}else{u.hide();}};}c.fn.cycle.resetState=function(t,s){s=s||t.fx;t.before=[];t.after=[];t.cssBefore=c.extend({},t.original.cssBefore);t.cssAfter=c.extend({},t.original.cssAfter);t.animIn=c.extend({},t.original.animIn);t.animOut=c.extend({},t.original.animOut);t.fxFn=null;c.each(t.original.before,function(){t.before.push(this);});c.each(t.original.after,function(){t.after.push(this);});var u=c.fn.cycle.transitions[s];if(c.isFunction(u)){u(t.$cont,c(t.elements),t);}};function n(y,s,x,A){var v=s.$cont[0],D=y[s.currSlide],B=y[s.nextSlide];if(x&&s.busy&&s.manualTrump){g("manualTrump in go(), stopping active transition");c(y).stop(true,true);s.busy=0;clearTimeout(v.cycleTimeout);}if(s.busy){g("transition active, ignoring new tx request");return;}if(v.cycleStop!=s.stopCount||v.cycleTimeout===0&&!x){return;}if(!x&&!v.cyclePause&&!s.bounce&&((s.autostop&&(--s.countdown<=0))||(s.nowrap&&!s.random&&s.nextSlide<s.currSlide))){if(s.end){s.end(s);}return;}var z=false;if((x||!v.cyclePause)&&(s.nextSlide!=s.currSlide)){z=true;var w=s.fx;D.cycleH=D.cycleH||c(D).height();D.cycleW=D.cycleW||c(D).width();B.cycleH=B.cycleH||c(B).height();B.cycleW=B.cycleW||c(B).width();if(s.multiFx){if(A&&(s.lastFx===d||++s.lastFx>=s.fxs.length)){s.lastFx=0;}else{if(!A&&(s.lastFx===d||--s.lastFx<0)){s.lastFx=s.fxs.length-1;}}w=s.fxs[s.lastFx];}if(s.oneTimeFx){w=s.oneTimeFx;s.oneTimeFx=null;}c.fn.cycle.resetState(s,w);if(s.before.length){c.each(s.before,function(E,F){if(v.cycleStop!=s.stopCount){return;}F.apply(B,[D,B,s,A]);});}var t=function(){s.busy=0;c.each(s.after,function(E,F){if(v.cycleStop!=s.stopCount){return;}F.apply(B,[D,B,s,A]);});if(!v.cycleStop){C();}};g("tx firing("+w+"); currSlide: "+s.currSlide+"; nextSlide: "+s.nextSlide);s.busy=1;if(s.fxFn){s.fxFn(D,B,s,t,A,x&&s.fastOnEvent);}else{if(c.isFunction(c.fn.cycle[s.fx])){c.fn.cycle[s.fx](D,B,s,t,A,x&&s.fastOnEvent);}else{c.fn.cycle.custom(D,B,s,t,A,x&&s.fastOnEvent);}}}else{C();}if(z||s.nextSlide==s.currSlide){var u;s.lastSlide=s.currSlide;if(s.random){s.currSlide=s.nextSlide;if(++s.randomIndex==y.length){s.randomIndex=0;s.randomMap.sort(function(F,E){return Math.random()-0.5;});}s.nextSlide=s.randomMap[s.randomIndex];if(s.nextSlide==s.currSlide){s.nextSlide=(s.currSlide==s.slideCount-1)?0:s.currSlide+1;}}else{if(s.backwards){u=(s.nextSlide-1)<0;if(u&&s.bounce){s.backwards=!s.backwards;s.nextSlide=1;s.currSlide=0;}else{s.nextSlide=u?(y.length-1):s.nextSlide-1;s.currSlide=u?0:s.nextSlide+1;}}else{u=(s.nextSlide+1)==y.length;if(u&&s.bounce){s.backwards=!s.backwards;s.nextSlide=y.length-2;s.currSlide=y.length-1;}else{s.nextSlide=u?0:s.nextSlide+1;s.currSlide=u?y.length-1:s.nextSlide-1;}}}}if(z&&s.pager){s.updateActivePagerLink(s.pager,s.currSlide,s.activePagerClass);}function C(){var E=0,F=s.timeout;if(s.timeout&&!s.continuous){E=m(y[s.currSlide],y[s.nextSlide],s,A);if(s.fx=="shuffle"){E-=s.speedOut;}}else{if(s.continuous&&v.cyclePause){E=10;}}if(E>0){v.cycleTimeout=setTimeout(function(){n(y,s,0,!s.backwards);},E);}}}c.fn.cycle.updateActivePagerLink=function(s,u,t){c(s).each(function(){c(this).children().removeClass(t).eq(u).addClass(t);});};function m(x,v,w,u){if(w.timeoutFn){var s=w.timeoutFn.call(x,x,v,w,u);while(w.fx!="none"&&(s-w.speed)<250){s+=w.speed;}g("calculated timeout: "+s+"; speed: "+w.speed);if(s!==false){return s;}}return w.timeout;}c.fn.cycle.next=function(s){h(s,1);};c.fn.cycle.prev=function(s){h(s,0);};function h(v,u){var y=u?1:-1;var t=v.elements;var x=v.$cont[0],w=x.cycleTimeout;if(w){clearTimeout(w);x.cycleTimeout=0;}if(v.random&&y<0){v.randomIndex--;if(--v.randomIndex==-2){v.randomIndex=t.length-2;}else{if(v.randomIndex==-1){v.randomIndex=t.length-1;}}v.nextSlide=v.randomMap[v.randomIndex];}else{if(v.random){v.nextSlide=v.randomMap[v.randomIndex];}else{v.nextSlide=v.currSlide+y;if(v.nextSlide<0){if(v.nowrap){return false;}v.nextSlide=t.length-1;}else{if(v.nextSlide>=t.length){if(v.nowrap){return false;}v.nextSlide=0;}}}}var s=v.onPrevNextEvent||v.prevNextClick;if(c.isFunction(s)){s(y>0,v.nextSlide,t[v.nextSlide]);}n(t,v,1,u);return false;}function p(t,u){var s=c(u.pager);c.each(t,function(v,w){c.fn.cycle.createPagerAnchor(v,w,s,t,u);});u.updateActivePagerLink(u.pager,u.startingSlide,u.activePagerClass);}c.fn.cycle.createPagerAnchor=function(x,u,z,w,t){var A;if(c.isFunction(t.pagerAnchorBuilder)){A=t.pagerAnchorBuilder(x,u);g("pagerAnchorBuilder("+x+", el) returned: "+A);}else{A='<a href="#">'+(x+1)+"</a>";}if(!A){return;}var v=c(A);if(v.parents("body").length===0){var y=[];if(z.length>1){z.each(function(){var D=v.clone(true);c(this).append(D);y.push(D[0]);});v=c(y);}else{v.appendTo(z);}}t.pagerAnchors=t.pagerAnchors||[];t.pagerAnchors.push(v);var B=function(G){G.preventDefault();t.nextSlide=x;var F=t.$cont[0],E=F.cycleTimeout;if(E){clearTimeout(E);F.cycleTimeout=0;}var D=t.onPagerEvent||t.pagerClick;if(c.isFunction(D)){D(t.nextSlide,w[t.nextSlide]);}n(w,t,1,t.currSlide<x);};if(/mouseenter|mouseover/i.test(t.pagerEvent)){v.hover(B,function(){});}else{v.bind(t.pagerEvent,B);}if(!/^click/.test(t.pagerEvent)&&!t.allowPagerClickBubble){v.bind("click.cycle",function(){return false;});}var C=t.$cont[0];var s=false;if(t.pauseOnPagerHover){v.hover(function(){s=true;C.cyclePause++;k(C,true,true);},function(){if(s){C.cyclePause--;}k(C,true,true);});}};c.fn.cycle.hopsFromLast=function(v,u){var t,s=v.lastSlide,w=v.currSlide;if(u){t=w>s?w-s:v.slideCount-s;}else{t=w<s?s-w:s+v.slideCount-w;}return t;};function a(u){g("applying clearType background-color hack");function t(v){v=parseInt(v,10).toString(16);return v.length<2?"0"+v:v;}function s(y){for(;y&&y.nodeName.toLowerCase()!="html";y=y.parentNode){var w=c.css(y,"background-color");if(w&&w.indexOf("rgb")>=0){var x=w.match(/\d+/g);return"#"+t(x[0])+t(x[1])+t(x[2]);}if(w&&w!="transparent"){return w;}}return"#ffffff";}u.each(function(){c(this).css("background-color",s(this));});}c.fn.cycle.commonReset=function(y,v,x,t,u,s){c(x.elements).not(y).hide();if(typeof x.cssBefore.opacity=="undefined"){x.cssBefore.opacity=1;}x.cssBefore.display="block";if(x.slideResize&&t!==false&&v.cycleW>0){x.cssBefore.width=v.cycleW;}if(x.slideResize&&u!==false&&v.cycleH>0){x.cssBefore.height=v.cycleH;}x.cssAfter=x.cssAfter||{};x.cssAfter.display="none";c(y).css("zIndex",x.slideCount+(s===true?1:0));c(v).css("zIndex",x.slideCount+(s===true?0:1));};c.fn.cycle.custom=function(E,y,s,v,x,t){var D=c(E),z=c(y);var u=s.speedIn,C=s.speedOut,w=s.easeIn,B=s.easeOut;z.css(s.cssBefore);if(t){if(typeof t=="number"){u=C=t;}else{u=C=1;}w=B=null;}var A=function(){z.animate(s.animIn,u,w,function(){v();});};D.animate(s.animOut,C,B,function(){D.css(s.cssAfter);if(!s.sync){A();}});if(s.sync){A();}};c.fn.cycle.transitions={fade:function(t,u,s){u.not(":eq("+s.currSlide+")").css("opacity",0);s.before.push(function(x,v,w){c.fn.cycle.commonReset(x,v,w);w.cssBefore.opacity=0;});s.animIn={opacity:1};s.animOut={opacity:0};s.cssBefore={top:0,left:0};}};c.fn.cycle.ver=function(){return b;};c.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,aspect:false,autostop:0,autostopCount:0,backwards:false,before:null,center:null,cleartype:!c.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:false,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:d,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null,width:null};})(jQuery);

/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(a){a.fn.cycle.transitions.none=function(c,d,b){b.fxFn=function(g,e,f,h){a(e).show();a(g).hide();h();};};a.fn.cycle.transitions.fadeout=function(c,d,b){d.not(":eq("+b.currSlide+")").css({display:"block",opacity:1});b.before.push(function(k,i,j,f,g,e){a(k).css("zIndex",j.slideCount+(e!==true?1:0));a(i).css("zIndex",j.slideCount+(e!==true?0:1));});b.animIn.opacity=1;b.animOut.opacity=0;b.cssBefore.opacity=1;b.cssBefore.display="block";b.cssAfter.zIndex=0;};a.fn.cycle.transitions.scrollUp=function(d,e,c){d.css("overflow","hidden");c.before.push(a.fn.cycle.commonReset);var b=d.height();c.cssBefore.top=b;c.cssBefore.left=0;c.cssFirst.top=0;c.animIn.top=0;c.animOut.top=-b;};a.fn.cycle.transitions.scrollDown=function(d,e,c){d.css("overflow","hidden");c.before.push(a.fn.cycle.commonReset);var b=d.height();c.cssFirst.top=0;c.cssBefore.top=-b;c.cssBefore.left=0;c.animIn.top=0;c.animOut.top=b;};a.fn.cycle.transitions.scrollLeft=function(d,e,c){d.css("overflow","hidden");c.before.push(a.fn.cycle.commonReset);var b=d.width();c.cssFirst.left=0;c.cssBefore.left=b;c.cssBefore.top=0;c.animIn.left=0;c.animOut.left=0-b;};a.fn.cycle.transitions.scrollRight=function(d,e,c){d.css("overflow","hidden");c.before.push(a.fn.cycle.commonReset);var b=d.width();c.cssFirst.left=0;c.cssBefore.left=-b;c.cssBefore.top=0;c.animIn.left=0;c.animOut.left=b;};a.fn.cycle.transitions.scrollHorz=function(c,d,b){c.css("overflow","hidden").width();b.before.push(function(h,f,g,e){if(g.rev){e=!e;}a.fn.cycle.commonReset(h,f,g);g.cssBefore.left=e?(f.cycleW-1):(1-f.cycleW);g.animOut.left=e?-h.cycleW:h.cycleW;});b.cssFirst.left=0;b.cssBefore.top=0;b.animIn.left=0;b.animOut.top=0;};a.fn.cycle.transitions.scrollVert=function(c,d,b){c.css("overflow","hidden");b.before.push(function(h,f,g,e){if(g.rev){e=!e;}a.fn.cycle.commonReset(h,f,g);g.cssBefore.top=e?(1-f.cycleH):(f.cycleH-1);g.animOut.top=e?h.cycleH:-h.cycleH;});b.cssFirst.top=0;b.cssBefore.left=0;b.animIn.top=0;b.animOut.left=0;};a.fn.cycle.transitions.slideX=function(c,d,b){b.before.push(function(g,e,f){a(f.elements).not(g).hide();a.fn.cycle.commonReset(g,e,f,false,true);f.animIn.width=e.cycleW;});b.cssBefore.left=0;b.cssBefore.top=0;b.cssBefore.width=0;b.animIn.width="show";b.animOut.width=0;};a.fn.cycle.transitions.slideY=function(c,d,b){b.before.push(function(g,e,f){a(f.elements).not(g).hide();a.fn.cycle.commonReset(g,e,f,true,false);f.animIn.height=e.cycleH;});b.cssBefore.left=0;b.cssBefore.top=0;b.cssBefore.height=0;b.animIn.height="show";b.animOut.height=0;};a.fn.cycle.transitions.shuffle=function(e,f,d){var c,b=e.css("overflow","visible").width();f.css({left:0,top:0});d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h,true,true,true);});if(!d.speedAdjusted){d.speed=d.speed/2;d.speedAdjusted=true;}d.random=0;d.shuffle=d.shuffle||{left:-b,top:15};d.els=[];for(c=0;c<f.length;c++){d.els.push(f[c]);}for(c=0;c<d.currSlide;c++){d.els.push(d.els.shift());}d.fxFn=function(m,j,l,g,i){if(l.rev){i=!i;}var h=i?a(m):a(j);a(j).css(l.cssBefore);var k=l.slideCount;h.animate(l.shuffle,l.speedIn,l.easeIn,function(){var o=a.fn.cycle.hopsFromLast(l,i);for(var p=0;p<o;p++){if(i){l.els.push(l.els.shift());}else{l.els.unshift(l.els.pop());}}if(i){for(var q=0,n=l.els.length;q<n;q++){a(l.els[q]).css("z-index",n-q+k);}}else{var r=a(m).css("z-index");h.css("z-index",parseInt(r,10)+1+k);}h.animate({left:0,top:0},l.speedOut,l.easeOut,function(){a(i?this:m).hide();if(g){g();}});});};a.extend(d.cssBefore,{display:"block",opacity:1,top:0,left:0});};a.fn.cycle.transitions.turnUp=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);f.cssBefore.top=e.cycleH;f.animIn.height=e.cycleH;f.animOut.width=e.cycleW;});b.cssFirst.top=0;b.cssBefore.left=0;b.cssBefore.height=0;b.animIn.top=0;b.animOut.height=0;};a.fn.cycle.transitions.turnDown=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);f.animIn.height=e.cycleH;f.animOut.top=g.cycleH;});b.cssFirst.top=0;b.cssBefore.left=0;b.cssBefore.top=0;b.cssBefore.height=0;b.animOut.height=0;};a.fn.cycle.transitions.turnLeft=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);f.cssBefore.left=e.cycleW;f.animIn.width=e.cycleW;});b.cssBefore.top=0;b.cssBefore.width=0;b.animIn.left=0;b.animOut.width=0;};a.fn.cycle.transitions.turnRight=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);f.animIn.width=e.cycleW;f.animOut.left=g.cycleW;});a.extend(b.cssBefore,{top:0,left:0,width:0});b.animIn.left=0;b.animOut.width=0;};a.fn.cycle.transitions.zoom=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,false,true);f.cssBefore.top=e.cycleH/2;f.cssBefore.left=e.cycleW/2;a.extend(f.animIn,{top:0,left:0,width:e.cycleW,height:e.cycleH});a.extend(f.animOut,{width:0,height:0,top:g.cycleH/2,left:g.cycleW/2});});b.cssFirst.top=0;b.cssFirst.left=0;b.cssBefore.width=0;b.cssBefore.height=0;};a.fn.cycle.transitions.fadeZoom=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,false);f.cssBefore.left=e.cycleW/2;f.cssBefore.top=e.cycleH/2;a.extend(f.animIn,{top:0,left:0,width:e.cycleW,height:e.cycleH});});b.cssBefore.width=0;b.cssBefore.height=0;b.animOut.opacity=0;};a.fn.cycle.transitions.blindX=function(d,e,c){var b=d.css("overflow","hidden").width();c.before.push(function(h,f,g){a.fn.cycle.commonReset(h,f,g);g.animIn.width=f.cycleW;g.animOut.left=h.cycleW;});c.cssBefore.left=b;c.cssBefore.top=0;c.animIn.left=0;c.animOut.left=b;};a.fn.cycle.transitions.blindY=function(d,e,c){var b=d.css("overflow","hidden").height();c.before.push(function(h,f,g){a.fn.cycle.commonReset(h,f,g);g.animIn.height=f.cycleH;g.animOut.top=h.cycleH;});c.cssBefore.top=b;c.cssBefore.left=0;c.animIn.top=0;c.animOut.top=b;};a.fn.cycle.transitions.blindZ=function(e,f,d){var c=e.css("overflow","hidden").height();var b=e.width();d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h);h.animIn.height=g.cycleH;h.animOut.top=i.cycleH;});d.cssBefore.top=c;d.cssBefore.left=b;d.animIn.top=0;d.animIn.left=0;d.animOut.top=c;d.animOut.left=b;};a.fn.cycle.transitions.growX=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true);f.cssBefore.left=this.cycleW/2;f.animIn.left=0;f.animIn.width=this.cycleW;f.animOut.left=0;});b.cssBefore.top=0;b.cssBefore.width=0;};a.fn.cycle.transitions.growY=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false);f.cssBefore.top=this.cycleH/2;f.animIn.top=0;f.animIn.height=this.cycleH;f.animOut.top=0;});b.cssBefore.height=0;b.cssBefore.left=0;};a.fn.cycle.transitions.curtainX=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,false,true,true);f.cssBefore.left=e.cycleW/2;f.animIn.left=0;f.animIn.width=this.cycleW;f.animOut.left=g.cycleW/2;f.animOut.width=0;});b.cssBefore.top=0;b.cssBefore.width=0;};a.fn.cycle.transitions.curtainY=function(c,d,b){b.before.push(function(g,e,f){a.fn.cycle.commonReset(g,e,f,true,false,true);f.cssBefore.top=e.cycleH/2;f.animIn.top=0;f.animIn.height=e.cycleH;f.animOut.top=g.cycleH/2;f.animOut.height=0;});b.cssBefore.height=0;b.cssBefore.left=0;};a.fn.cycle.transitions.cover=function(f,g,e){var i=e.direction||"left";var b=f.css("overflow","hidden").width();var c=f.height();e.before.push(function(j,d,h){a.fn.cycle.commonReset(j,d,h);if(i=="right"){h.cssBefore.left=-b;}else{if(i=="up"){h.cssBefore.top=c;}else{if(i=="down"){h.cssBefore.top=-c;}else{h.cssBefore.left=b;}}}});e.animIn.left=0;e.animIn.top=0;e.cssBefore.top=0;e.cssBefore.left=0;};a.fn.cycle.transitions.uncover=function(f,g,e){var i=e.direction||"left";var b=f.css("overflow","hidden").width();var c=f.height();e.before.push(function(j,d,h){a.fn.cycle.commonReset(j,d,h,true,true,true);if(i=="right"){h.animOut.left=b;}else{if(i=="up"){h.animOut.top=-c;}else{if(i=="down"){h.animOut.top=c;}else{h.animOut.left=-b;}}}});e.animIn.left=0;e.animIn.top=0;e.cssBefore.top=0;e.cssBefore.left=0;};a.fn.cycle.transitions.toss=function(e,f,d){var b=e.css("overflow","visible").width();var c=e.height();d.before.push(function(i,g,h){a.fn.cycle.commonReset(i,g,h,true,true,true);if(!h.animOut.left&&!h.animOut.top){a.extend(h.animOut,{left:b*2,top:-c/2,opacity:0});}else{h.animOut.opacity=0;}});d.cssBefore.left=0;d.cssBefore.top=0;d.animIn.left=0;};a.fn.cycle.transitions.wipe=function(q,m,e){var p=q.css("overflow","hidden").width();var j=q.height();e.cssBefore=e.cssBefore||{};var g;if(e.clip){if(/l2r/.test(e.clip)){g="rect(0px 0px "+j+"px 0px)";}else{if(/r2l/.test(e.clip)){g="rect(0px "+p+"px "+j+"px "+p+"px)";}else{if(/t2b/.test(e.clip)){g="rect(0px "+p+"px 0px 0px)";}else{if(/b2t/.test(e.clip)){g="rect("+j+"px "+p+"px "+j+"px 0px)";}else{if(/zoom/.test(e.clip)){var o=parseInt(j/2,10);var f=parseInt(p/2,10);g="rect("+o+"px "+f+"px "+o+"px "+f+"px)";}}}}}}e.cssBefore.clip=e.cssBefore.clip||g||"rect(0px 0px 0px 0px)";var k=e.cssBefore.clip.match(/(\d+)/g);var s=parseInt(k[0],10),c=parseInt(k[1],10),n=parseInt(k[2],10),i=parseInt(k[3],10);e.before.push(function(v,h,t){if(v==h){return;}var d=a(v),b=a(h);a.fn.cycle.commonReset(v,h,t,true,true,false);t.cssAfter.display="block";var r=1,l=parseInt((t.speedIn/13),10)-1;(function u(){var x=s?s-parseInt(r*(s/l),10):0;var y=i?i-parseInt(r*(i/l),10):0;var z=n<j?n+parseInt(r*((j-n)/l||1),10):j;var w=c<p?c+parseInt(r*((p-c)/l||1),10):p;b.css({clip:"rect("+x+"px "+w+"px "+z+"px "+y+"px)"});(r++<=l)?setTimeout(u,13):d.css("display","none");})();});a.extend(e.cssBefore,{display:"block",opacity:1,top:0,left:0});e.animIn={left:0};e.animOut={left:0};};})(jQuery);

/*!
 * jQuery Cycle Pagination Plugin
 * Copyright (c) 2012 Kohl's Corporation
 * Version: 1.0.0
 *
 * Builds a accessible pagination system on top of jQuery Cycle.
 * All other copyrights belong to their respective owners.
 *
 * Available options:
 *
 *   +  fx              - {String}  Default: 'fade'            -- The name of the transition effect.
 *   + [hideAllText]    - {String}  Values:  'hide', 'replace' -- (Optional) Visually hide all text in the pagination, or replace it with a background image.
 *   + [hideSlideLabel] - {String}                             -- (Optional) Hide just the "Slide" label in the pagination (e.g. Slide 3), and just show the number.
 *   + [id]             - {String}                             -- (Optional) Adds the specified ID to the pagination.
 *   +  pause           - {Boolean} Default: true              -- Enable "pause on hover".
 *   +  speed           - {Integer} Default: 4000              -- Speed of the transition effect (in milliseconds).
 *   +  timeout         - {Integer} Default: 500               -- Time delay between slide transitions (in milliseconds).
 *
 * All jQuery Cycle options are also available:
 *
 *   - http://jquery.malsup.com/cycle/options.html
 */
(function(b,a,c,d){c.fn.cyclePagination=function(n){if(!!c.fn.cycle){n=c.extend({activePagerClass:"cycle-pager-active",fx:"fade",timeout:4000,speed:500,pause:true},n);var m=this,l=c('<ul class="cycle-pager"></ul>'),k=[],f,e,o,g=this.children(),j,h;if(n.id){l.attr("id",n.id);}h=g.length;for(j=0;j<h;j++){k.push('<li><a href="#" class="cycle-pager-index"><span>Slide </span>'+(j+1)+"</a></li>");}l.html(k.join(""));if(n.hideSlideLabel){l.find("span").addClass("visually-hidden");}if(n.hideAllText){switch(n.hideAllText){case"hide":o="visually-hidden";break;case"replace":o="ir";break;default:o="";}if(o){l.find("a").addClass(o);}}m.cycle(c.extend(n,{pager:l}));l.insertBefore(m);f=l.children("a");f.hide();e=l.children("li");e.on("click",function(p){p.preventDefault();var i=e.index(this);f.eq(i).trigger("click");m.cycle("pause");});}return this;};})(window,document,jQuery);




/*!
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(b){var m,t,u,f,D,j,E,n,z,A,q=0,e={},o=[],p=0,d={},l=[],G=null,v=new Image,J=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,W=/[^\.]\.(swf)\s*$/i,K,L=1,y=0,s="",r,i,h=false,B=b.extend(b("<div/>")[0],{prop:0}),M=b.browser.msie&&b.browser.version<7&&!window.XMLHttpRequest,N=function(){t.hide();v.onerror=v.onload=null;G&&G.abort();m.empty()},O=function(){if(false===e.onError(o,q,e)){t.hide();h=false}else{e.titleShow=false;e.width="auto";e.height="auto";m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');F()}},I=function(){var a=o[q],c,g,k,C,P,w;N();e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));w=e.onStart(o,q,e);if(w===false)h=false;else{if(typeof w=="object")e=b.extend(e,w);k=e.title||(a.nodeName?b(a).attr("title"):a.title)||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(k===""&&e.orig&&e.titleFromAlt)k=e.orig.attr("alt");c=e.href||(a.nodeName?b(a).attr("href"):a.href)||null;if(/^(?:javascript)/i.test(c)||c=="#")c=null;if(e.type){g=e.type;if(!c)c=e.content}else if(e.content)g="html";else if(c)g=c.match(J)?"image":c.match(W)?"swf":b(a).hasClass("iframe")?"iframe":c.indexOf("#")===0?"inline":"ajax";if(g){if(g=="inline"){a=c.substr(c.indexOf("#"));g=b(a).length>0?"inline":"ajax"}e.type=g;e.href=c;e.title=k;if(e.autoDimensions)if(e.type=="html"||e.type=="inline"||e.type=="ajax"){e.width="auto";e.height="auto"}else e.autoDimensions=false;if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=false;e.enableEscapeButton=false;e.showCloseButton=false}e.padding=parseInt(e.padding,10);e.margin=parseInt(e.margin,10);m.css("padding",e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(j.children())});switch(g){case "html":m.html(e.content);F();break;case "inline":if(b(a).parent().is("#fancybox-content")===true){h=false;break}b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(j.children())}).bind("fancybox-cancel",function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();v=new Image;v.onerror=function(){O()};v.onload=function(){h=true;v.onerror=v.onload=null;e.width=v.width;e.height=v.height;b("<img />").attr({id:"fancybox-img",src:v.src,alt:e.title}).appendTo(m);Q()};v.src=c;break;case "swf":e.scrolling="no";C='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+c+'"></param>';P="";b.each(e.swf,function(x,H){C+='<param name="'+x+'" value="'+H+'"></param>';P+=" "+x+'="'+H+'"'});C+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+P+"></embed></object>";m.html(C);F();break;case "ajax":h=false;b.fancybox.showActivity();e.ajax.win=e.ajax.success;G=b.ajax(b.extend({},e.ajax,{url:c,data:e.ajax.data||{},error:function(x){x.status>0&&O()},success:function(x,H,R){if((typeof R=="object"?R:G).status==200){if(typeof e.ajax.win=="function"){w=e.ajax.win(c,x,H,R);if(w===false){t.hide();return}else if(typeof w=="string"||typeof w=="object")x=w}m.html(x);F()}}}));break;case "iframe":Q()}}else O()}},F=function(){var a=e.width,c=e.height;a=a.toString().indexOf("%")>-1?parseInt((b(window).width()-e.margin*2)*parseFloat(a)/100,10)+"px":a=="auto"?"auto":a+"px";c=c.toString().indexOf("%")>-1?parseInt((b(window).height()-e.margin*2)*parseFloat(c)/100,10)+"px":c=="auto"?"auto":c+"px";m.wrapInner('<div style="width:'+a+";height:"+c+";overflow: "+(e.scrolling=="auto"?"auto":e.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');e.width=m.width();e.height=m.height();Q()},Q=function(){var a,c;t.hide();if(f.is(":visible")&&false===d.onCleanup(l,p,d)){b.event.trigger("fancybox-cancel");h=false}else{h=true;b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");f.is(":visible")&&d.titlePosition!=="outside"&&f.css("height",f.height());l=o;p=q;d=e;if(d.overlayShow){u.css({"background-color":d.overlayColor,opacity:d.overlayOpacity,cursor:d.hideOnOverlayClick?"pointer":"auto",height:b(document).height()});if(!u.is(":visible")){M&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();i=X();s=d.title||"";y=0;n.empty().removeAttr("style").removeClass();if(d.titleShow!==false){if(b.isFunction(d.titleFormat))a=d.titleFormat(s,l,p,d);else a=s&&s.length?d.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+s+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+d.titlePosition+'">'+s+"</div>":false;s=a;if(!(!s||s==="")){n.addClass("fancybox-title-"+d.titlePosition).html(s).appendTo("body").show();switch(d.titlePosition){case "inside":n.css({width:i.width-d.padding*2,marginLeft:d.padding,marginRight:d.padding});y=n.outerHeight(true);n.appendTo(D);i.height+=y;break;case "over":n.css({marginLeft:d.padding,width:i.width-d.padding*2,bottom:d.padding}).appendTo(D);break;case "float":n.css("left",parseInt((n.width()-i.width-40)/2,10)*-1).appendTo(f);break;default:n.css({width:i.width-d.padding*2,paddingLeft:d.padding,paddingRight:d.padding}).appendTo(f)}}}n.hide();if(f.is(":visible")){b(E.add(z).add(A)).hide();a=f.position();r={top:a.top,left:a.left,width:f.width(),height:f.height()};c=r.width==i.width&&r.height==i.height;j.fadeTo(d.changeFade,0.3,function(){var g=function(){j.html(m.contents()).fadeTo(d.changeFade,1,S)};b.event.trigger("fancybox-change");j.empty().removeAttr("filter").css({"border-width":d.padding,width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2});if(c)g();else{B.prop=0;b(B).animate({prop:1},{duration:d.changeSpeed,easing:d.easingChange,step:T,complete:g})}})}else{f.removeAttr("style");j.css("border-width",d.padding);if(d.transitionIn=="elastic"){r=V();j.html(m.contents());f.show();if(d.opacity)i.opacity=0;B.prop=0;b(B).animate({prop:1},{duration:d.speedIn,easing:d.easingIn,step:T,complete:S})}else{d.titlePosition=="inside"&&y>0&&n.show();j.css({width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2}).html(m.contents());f.css(i).fadeIn(d.transitionIn=="none"?0:d.speedIn,S)}}}},Y=function(){if(d.enableEscapeButton||d.enableKeyboardNav)b(document).bind("keydown.fb",function(a){if(a.keyCode==27&&d.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if((a.keyCode==37||a.keyCode==39)&&d.enableKeyboardNav&&a.target.tagName!=="INPUT"&&a.target.tagName!=="TEXTAREA"&&a.target.tagName!=="SELECT"){a.preventDefault();b.fancybox[a.keyCode==37?"prev":"next"]()}});if(d.showNavArrows){if(d.cyclic&&l.length>1||p!==0)z.show();if(d.cyclic&&l.length>1||p!=l.length-1)A.show()}else{z.hide();A.hide()}},S=function(){if(!b.support.opacity){j.get(0).style.removeAttribute("filter");f.get(0).style.removeAttribute("filter")}e.autoDimensions&&j.css("height","auto");f.css("height","auto");s&&s.length&&n.show();d.showCloseButton&&E.show();Y();d.hideOnContentClick&&j.bind("click",b.fancybox.close);d.hideOnOverlayClick&&u.bind("click",b.fancybox.close);b(window).bind("resize.fb",b.fancybox.resize);d.centerOnScroll&&b(window).bind("scroll.fb",b.fancybox.center);if(d.type=="iframe")b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(b.browser.msie?'allowtransparency="true""':"")+' scrolling="'+e.scrolling+'" src="'+d.href+'"></iframe>').appendTo(j);f.show();h=false;b.fancybox.center();d.onComplete(l,p,d);var a,c;if(l.length-1>p){a=l[p+1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}if(p>0){a=l[p-1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}},T=function(a){var c={width:parseInt(r.width+(i.width-r.width)*a,10),height:parseInt(r.height+(i.height-r.height)*a,10),top:parseInt(r.top+(i.top-r.top)*a,10),left:parseInt(r.left+(i.left-r.left)*a,10)};if(typeof i.opacity!=="undefined")c.opacity=a<0.5?0.5:a;f.css(c);j.css({width:c.width-d.padding*2,height:c.height-y*a-d.padding*2})},U=function(){return[b(window).width()-d.margin*2,b(window).height()-d.margin*2,b(document).scrollLeft()+d.margin,b(document).scrollTop()+d.margin]},X=function(){var a=U(),c={},g=d.autoScale,k=d.padding*2;c.width=d.width.toString().indexOf("%")>-1?parseInt(a[0]*parseFloat(d.width)/100,10):d.width+k;c.height=d.height.toString().indexOf("%")>-1?parseInt(a[1]*parseFloat(d.height)/100,10):d.height+k;if(g&&(c.width>a[0]||c.height>a[1]))if(e.type=="image"||e.type=="swf"){g=d.width/d.height;if(c.width>a[0]){c.width=a[0];c.height=parseInt((c.width-k)/g+k,10)}if(c.height>a[1]){c.height=a[1];c.width=parseInt((c.height-k)*g+k,10)}}else{c.width=Math.min(c.width,a[0]);c.height=Math.min(c.height,a[1])}c.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-c.height-40)*0.5),10);c.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-c.width-40)*0.5),10);return c},V=function(){var a=e.orig?b(e.orig):false,c={};if(a&&a.length){c=a.offset();c.top+=parseInt(a.css("paddingTop"),10)||0;c.left+=parseInt(a.css("paddingLeft"),10)||0;c.top+=parseInt(a.css("border-top-width"),10)||0;c.left+=parseInt(a.css("border-left-width"),10)||0;c.width=a.width();c.height=a.height();c={width:c.width+d.padding*2,height:c.height+d.padding*2,top:c.top-d.padding-20,left:c.left-d.padding-20}}else{a=U();c={width:d.padding*2,height:d.padding*2,top:parseInt(a[3]+a[1]*0.5,10),left:parseInt(a[2]+a[0]*0.5,10)}}return c},Z=function(){if(t.is(":visible")){b("div",t).css("top",L*-40+"px");L=(L+1)%12}else clearInterval(K)};b.fn.fancybox=function(a){if(!b(this).length)return this;b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(c){c.preventDefault();if(!h){h=true;b(this).blur();o=[];q=0;c=b(this).attr("rel")||"";if(!c||c==""||c==="nofollow")o.push(this);else{o=b("a[rel="+c+"], area[rel="+c+"]");q=o.index(this)}I()}});return this};b.fancybox=function(a,c){var g;if(!h){h=true;g=typeof c!=="undefined"?c:{};o=[];q=parseInt(g.index,10)||0;if(b.isArray(a)){for(var k=0,C=a.length;k<C;k++)if(typeof a[k]=="object")b(a[k]).data("fancybox",b.extend({},g,a[k]));else a[k]=b({}).data("fancybox",b.extend({content:a[k]},g));o=jQuery.merge(o,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},g,a));else a=b({}).data("fancybox",b.extend({content:a},g));o.push(a)}if(q>o.length||q<0)q=0;I()}};b.fancybox.showActivity=function(){clearInterval(K);t.show();K=setInterval(Z,66)};b.fancybox.hideActivity=function(){t.hide()};b.fancybox.next=function(){return b.fancybox.pos(p+1)};b.fancybox.prev=function(){return b.fancybox.pos(p-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);o=l;if(a>-1&&a<l.length){q=a;I()}else if(d.cyclic&&l.length>1){q=a>=l.length?0:l.length-1;I()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");N();e.onCancel(o,q,e);h=false}};b.fancybox.close=function(){function a(){u.fadeOut("fast");n.empty().hide();f.hide();b.event.trigger("fancybox-cleanup");j.empty();d.onClosed(l,p,d);l=e=[];p=q=0;d=e={};h=false}if(!(h||f.is(":hidden"))){h=true;if(d&&false===d.onCleanup(l,p,d))h=false;else{N();b(E.add(z).add(A)).hide();b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");j.find("iframe").attr("src",M&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");d.titlePosition!=="inside"&&n.empty();f.stop();if(d.transitionOut=="elastic"){r=V();var c=f.position();i={top:c.top,left:c.left,width:f.width(),height:f.height()};if(d.opacity)i.opacity=1;n.empty().hide();B.prop=1;b(B).animate({prop:0},{duration:d.speedOut,easing:d.easingOut,step:T,complete:a})}else f.fadeOut(d.transitionOut=="none"?0:d.speedOut,a)}}};b.fancybox.resize=function(){u.is(":visible")&&u.css("height",b(document).height());b.fancybox.center(true)};b.fancybox.center=function(a){var c,g;if(!h){g=a===true?1:0;c=U();!g&&(f.width()>c[0]||f.height()>c[1])||f.stop().animate({top:parseInt(Math.max(c[3]-20,c[3]+(c[1]-j.height()-40)*0.5-d.padding)),left:parseInt(Math.max(c[2]-20,c[2]+(c[0]-j.width()-40)*0.5-d.padding))},typeof a=="number"?a:200)}};b.fancybox.init=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),t=b('<div id="fancybox-loading"><div></div></div>'),u=b('<div id="fancybox-overlay"></div>'),f=b('<div id="fancybox-wrap"></div>'));D=b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);D.append(j=b('<div id="fancybox-content"></div>'),E=b('<a id="fancybox-close"></a>'),n=b('<div id="fancybox-title"></div>'),z=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),A=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));E.click(b.fancybox.close);t.click(b.fancybox.cancel);z.click(function(a){a.preventDefault();b.fancybox.prev()});A.click(function(a){a.preventDefault();b.fancybox.next()});b.fn.mousewheel&&f.bind("mousewheel.fb",function(a,c){if(h)a.preventDefault();else if(b(a.target).get(0).clientHeight==0||b(a.target).get(0).scrollHeight===b(a.target).get(0).clientHeight){a.preventDefault();b.fancybox[c>0?"prev":"next"]()}});b.support.opacity||f.addClass("fancybox-ie");if(M){t.addClass("fancybox-ie6");f.addClass("fancybox-ie6");b('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)}}};b.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};b(document).ready(function(){b.fancybox.init()})})(jQuery);




/*!
 * jQuery InputPlaceholder
 *
 * [ LEGACY ]
 */
(function(){jQuery.fn.extend({placehold:function(){var $query=this;var placeholdOptions=arguments[0]||{};var $inputs=$query.filter(":text, :password");$inputs.each(function(){var $this=jQuery(this);this.placeholdValue=placeholdOptions.placeholdValue||$.trim($this.val());$this.val(this.placeholdValue);$this.addClass(placeholdOptions.blurClass||"")}).bind("focus",function(){var $this=jQuery(this);var val=$.trim($this.val());if(val==this.placeholdValue||val==""){$this.val("").removeClass(placeholdOptions.blurClass||"").addClass(placeholdOptions.focusClass||"")}}).bind("blur",function(){var $this=jQuery(this);var val=$.trim($this.val());if(val==this.placeholdValue||val==""){$this.val(this.placeholdValue).addClass(placeholdOptions.blurClass||"").removeClass(placeholdOptions.focusClass||"")}});return $query}})})();




/*
 * jQuery ifixpng plugin
 * (previously known as pngfix)
 * Version 2.1  (23/04/2008)
 * @requires jQuery v1.1.3 or above
 *
 * Examples at: http://jquery.khurshid.com
 * Copyright (c) 2007 Kush M.
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * [ PLACEHOLDER : NO LONGER FIXES PNG IMAGES IN IE6 ]
 * [ LEGACY ] [ DEPRECATED ]
 *
 * TODO: REMOVE SCRIPT BY EOY 2013.
 */
(function($){function empty(){}function returnThis(){return this;}$.ifixpng=empty;$.fn.ifixpng=returnThis;$.fn.iunfixpng=returnThis;$.fn.positionFix=returnThis;})(jQuery);




/*!
 * AC_RunActiveContent.js // v1.0
 * Copyright 2006 Adobe Systems, Inc. All rights reserved.
 *
 * [ LEGACY ] [ DEPRECATED ]
 *
 * TODO: REMOVE SCRIPT BY EOY 2013.
 */
function AC_AddExtension(src,ext){if(src.indexOf("?")!=-1){return src.replace(/\?/,ext+"?")}else{return src+ext}}function AC_Generateobj(objAttrs,params,embedAttrs){var str="<object ";for(var i in objAttrs){str+=i+'="'+objAttrs[i]+'" '}str+=">";for(var i in params){str+='<param name="'+i+'" value="'+params[i]+'" /> '}str+="<embed ";for(var i in embedAttrs){str+=i+'="'+embedAttrs[i]+'" '}str+=" ></embed></object>";document.write(str)}function AC_FL_RunContent(){var ret=AC_GetArgs(arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs)}function AC_SW_RunContent(){var ret=AC_GetArgs(arguments,".dcr","src","clsid:166B1BCA-3F9C-11CF-8075-444553540000",null);AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs)}function AC_GetArgs(args,ext,srcParamName,classid,mimeType){var ret=new Object();ret.embedAttrs=new Object();ret.params=new Object();ret.objAttrs=new Object();for(var i=0;i<args.length;i=i+2){var currArg=args[i].toLowerCase();switch(currArg){case"classid":break;case"pluginspage":ret.embedAttrs[args[i]]=args[i+1];break;case"src":case"movie":args[i+1]=AC_AddExtension(args[i+1],ext);ret.embedAttrs.src=args[i+1];ret.params[srcParamName]=args[i+1];break;case"onafterupdate":case"onbeforeupdate":case"onblur":case"oncellchange":case"onclick":case"ondblClick":case"ondrag":case"ondragend":case"ondragenter":case"ondragleave":case"ondragover":case"ondrop":case"onfinish":case"onfocus":case"onhelp":case"onmousedown":case"onmouseup":case"onmouseover":case"onmousemove":case"onmouseout":case"onkeypress":case"onkeydown":case"onkeyup":case"onload":case"onlosecapture":case"onpropertychange":case"onreadystatechange":case"onrowsdelete":case"onrowenter":case"onrowexit":case"onrowsinserted":case"onstart":case"onscroll":case"onbeforeeditfocus":case"onactivate":case"onbeforedeactivate":case"ondeactivate":case"type":case"codebase":ret.objAttrs[args[i]]=args[i+1];break;case"width":case"height":case"align":case"vspace":case"hspace":case"class":case"title":case"accesskey":case"name":case"id":case"tabindex":ret.embedAttrs[args[i]]=ret.objAttrs[args[i]]=args[i+1];break;default:ret.embedAttrs[args[i]]=ret.params[args[i]]=args[i+1]}}ret.objAttrs.classid=classid;if(mimeType){ret.embedAttrs.type=mimeType}return ret};




/*!
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/license/mit-license.php
 *
 * [ LEGACY ] [ DEPRECATED ]
 *
 * TODO: REMOVE OR UPDATE SCRIPT BY EOY 2013.
 */
if(typeof deconcept=="undefined"){var deconcept=new Object()}if(typeof deconcept.util=="undefined"){deconcept.util=new Object()}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object()}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1)}if(id){this.setAttribute("id",id)}if(w){this.setAttribute("width",w)}if(h){this.setAttribute("height",h)}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")))}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true}if(c){this.addParam("bgcolor",c)}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9)}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true)},setAttribute:function(_e,_f){this.attributes[_e]=_f},getAttribute:function(_10){return this.attributes[_10]},addParam:function(_11,_12){this.params[_11]=_12},getParams:function(){return this.params},addVariable:function(_13,_14){this.variables[_13]=_14},getVariable:function(_15){return this.variables[_15]},getVariables:function(){return this.variables},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key]}return _16},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath)}_19='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';_19+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';var _1a=this.getParams();for(var key in _1a){_19+=[key]+'="'+_1a[key]+'" '}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+='flashvars="'+_1c+'"'}_19+="/>"}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath)}_19='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';_19+='<param name="movie" value="'+this.getAttribute("swf")+'" />';var _1d=this.getParams();for(var key in _1d){_19+='<param name="'+key+'" value="'+_1d[key]+'" />'}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+='<param name="flashvars" value="'+_1f+'" />'}_19+="</object>"}return _19},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title)}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"))}}return false}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."))}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0])}catch(e){axo=null}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always"}catch(e){if(_23.major==6){return _23}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","))}}}return _23};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false}if(this.major>fv.major){return true}if(this.minor<fv.minor){return false}if(this.minor>fv.minor){return true}if(this.rev<fv.rev){return false}return true};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1))}}}return""}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){}}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs)};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id]}}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

function GetURLParameter( sParam )
{
    var sPageURL      = window.location.search.substring( 1 ),
        sURLVariables = sPageURL.split( '&' ),
        sParameterName,

        i, end;

    end = sURLVariables.length;
    for ( i = 0; i < end; i++ )
    {
        sParameterName = sURLVariables[ i ].split( '=' );

        if ( sParameterName[ 0 ] == sParam )
        {
            return sParameterName[ 1 ];
        }
    }
}

/*** Gifting Listing Specific functionality  Start...*/

//Gift Guide   start


jQuery( function( $ )
{
    'use strict';

    var htmlTag = $( 'html' );




    //// /// // /
    // Initialize Gift Guide functionality.
    //// /// // /

    ( function( $ )
    {
        var divIds = { },
            level;

        if ( window.GiftGuide )
        {
		    divIds.gift_ideas_popup_container = 'gift-ideas';

	        if ( htmlTag.hasClass( 'gift-guide' ) )
	        {
	            level = GetURLParameter( 'level' );

	            if ( level === '1' )
	            {
	                divIds.bread_crumb_container = 'gift-guide-breadcrumbs';
	                divIds.left_container        = 'gift-guide-nav';
	            }
	            else if ( level === '2' )
	            {
	                divIds.bread_crumb_container = 'gift-guide-breadcrumbs';
	                divIds.left_container        = 'gift-guide-nav';
	                divIds.carousel_container    = 'gift-guide-main-content';
	            }
	            else
	            {
	                divIds.bread_crumb_container = 'gift-guide-breadcrumbs';
	                divIds.left_container        = 'gift-guide-nav';
	                divIds.product_container     = 'gift-guide-main-content';
	            }
	        }

	        GiftGuide.setPanelContent( divIds );
        }


    })( $ );




    //// /// // /
    // Initialize Wish List and Registry functionality.
    //// /// // /

	(function( $ )
	{

		if ( window.WishList )
		{
			if ( WishList.setListMenuOverlay )
			{
				WishList.setListMenuOverlay( 'lists-overlay' );
			}
		}

		if ( window.WishListRegistry )
		{
			if ( WishListRegistry.setRegistryMenuOverlay )
			{
				WishListRegistry.setRegistryMenuOverlay( 'registries-overlay' );
			}

			// Don't want Skava login to show up instead of ours.  Remove when they clean their stuff up
			if ( typeof khwlDisplayLoginModal !== 'undefined' )
			{
				khwlDisplayLoginModal = null;
			}


			////
			// Gift registry page initialization.
			////

			if ( $( '#registry_container' ).length )
			{

				WishListRegistry.init( function()
				{
					WishListRegistry.setFullViewPanel( "registry_container" );
				} );

				if ( window.Utils )
				{
					Utils.setCookie( 'cookieSetting', 'isCookie', 90 );
				}
			}
		}

	})( $ );
});

//Modal Window and Omniture start

/* Modal Login Functionality START */
function displayLoginModal(modalCallback) {
	var success = false;
	$.fancybox({
		'href': '/upgrade/myaccount/modal_login.jsp',
		'type': 'ajax',
		'scrolling': 'no',
		onStart: function() {
			_addModalFancyboxClasses();
		},
		onComplete: function() {

			// Shift focus to the email field.
			$( '#modal_login_email_field' ).focus();

			$("#modal_login_forgot_pass_link").click(function(e) { e.preventDefault(); displayRecPassModal(modalCallback); return false; });
			$("#modal_login_pass_field").keypress(function(event) {
				if (event.which == 13) {
					event.preventDefault();
					$("#modal_login_signin_button").click();
				}
			});
			$("#modal_login_signin_button").bind("click submit", function (e) {
				e.preventDefault();

				var $form = $("form[name=kohls_login]");
				$form.find("input[name='callback']").val("");

				function _jsonpCallback(data) {

				}

				if(validateLogin()) {
					$.ajax({
						url: $form.attr("action"),
						type: 'POST',
						dataType: 'jsonp',
						data: $form.serialize().replace("&callback=",""),
						cache:true,
						jsonpCallback:"_jsonpCallback"
					}).success(function(data) {
						_handleLoginServerResponse(data, function() {
							success = true;
							successAction();
						});
					}).error(function() {
						success = false;
					});
				}
			});
			$("#modal_login_cancel_button").bind("submit click", function(e) {
				e.preventDefault();
				$.fancybox.close();
			});
			$("#modal_login_create_button").bind("click", function(e) {
				e.preventDefault();
				displayCreateModal(modalCallback);
			});

			// Set up legacy registry info container for JavaScript animation.
			$( '#legacy-registry-info' )
				.css( 'display', 'none' )
				.removeClass( 'hide' );

			// Attach `onclick` functionality to legacy gift registry info link.
			$( '.js-legacy-registry-callout' )
				.on( 'click touchstart', function( event )
					{
						event.preventDefault();

						var legacyRegistryToggle = $( this ).children( '.legacy-registry-toggle' ),
							legacyRegistryToggleText = legacyRegistryToggle.children( 'span' );

						legacyRegistryToggle.toggleClass( 'expanded collapsed' );

						if ( legacyRegistryToggle.hasClass( 'expanded' ) )
						{
							legacyRegistryToggleText.html( 'Hide' );
						}
						else
						{
							legacyRegistryToggleText.html( 'Show' );
						}

						$( '#legacy-registry-info' )
							.stop()
							.slideToggle( 300 );
					}
				);
		},
		onCleanup: function() {

			// Detach `onclick` functionality from legacy gift registry info link.
			$( '.js-legacy-registry-callout' ).off( 'click touchstart' );

		},
		onClosed: function() {
			_removeModalFancyboxClasses();
			if(typeof modalCallback !== 'undefined') modalCallback(success);
		}
	});
}

function displayCreateModal(modalCallback) {
	var success = false;
	$.fancybox({
		'href': '/upgrade/myaccount/modal_create.jsp',
		'type': 'ajax',
		onStart: function() {
			_addModalFancyboxClasses();
		},
		onComplete: function() {
			$("#modal_create_back_button").bind("click submit", function(e) {
				e.preventDefault();
				displayLoginModal(modalCallback);
			});
			$("#modal_create_continue_button").bind("click submit", function(e) {
				e.preventDefault();

				var $form = $("form[name=kohls_create_acct]");
				$form.find("input[name='callback']").val("");

				function _jsonpCallback(data) {
				}

				if(validateCreate()) {
					$("#modal_create_confirm_email_field").val($("#modal_create_email_field").val());

					$.ajax({
						url: $form.attr("action"),
						type: 'POST',
						dataType: 'jsonp',
						data: $form.serialize().replace("&callback=",""),
						cache:true,
						jsonpCallback:"_jsonpCallback"
					}).success(function(data) {
						_handleCreateServerResponse(data, function() {
							success = true;
							successAction();
						});
					}).error(function() {
						success = false;
					});
				}
			});
			$("#modal_create_password_field,#modal_create_confirm_password_field").on("cut copy paste", function(e) {
				e.preventDefault();
			});
		},
		onClosed: function() {
			_removeModalFancyboxClasses();
			if(typeof modalCallback !== 'undefined') modalCallback(success);
		}
	});
}

function displayRecPassModal(modalCallback) {
	var success = false;
	$.fancybox({
		'href': '/upgrade/myaccount/modal_recpass.jsp',
		'type': 'ajax',
		onStart: function() {
			_addModalFancyboxClasses();
		},
		onComplete: function() {
			$("#modal_recpass_back_button").bind("click submit", function(e) {
				e.preventDefault();
				displayLoginModal(modalCallback);
			});
			$("#modal_recpass_continue_button").bind("click submit", function(e) {
				e.preventDefault();
				if(validateRecPass()) {
					var $form = $("form[name=hint_question_answer]");
					var email = $("#modal_recpass_email_field").val();
					$.ajax({
						url: '/upgrade/myaccount/modal_recpass.jsp',
						type: 'POST',
						data: $form.serialize()
					}).success(function(data) {
						_handleRecPassServerResponse(data, function() {
							displayRecPassConfirmModal(email, modalCallback);
						});
					});
				}
			});
		},
		onClosed: function() {
			_removeModalFancyboxClasses();
			if(typeof modalCallback !== 'undefined') modalCallback(success);
		}
	});
}

function displayRecPassConfirmModal(email, modalCallback) {
	var success = false;
	$.fancybox({
		'href': '/upgrade/myaccount/modal_recpass_confirm.jsp?recpassEmail=' + email,
		'type': 'ajax',
		onStart: function() {
			_addModalFancyboxClasses();
		},
		onComplete: function() {
			$("#modal_recpass_confirm_ok_button").bind("click submit", function(e) {
				e.preventDefault();
				successAction();
			});
		},
		onClosed: function() {
			_removeModalFancyboxClasses();
			if(typeof modalCallback !== 'undefined') modalCallback(success);
		}
	});
}

function validateLogin() {
	var email = $("#modal_login_email_field").val();
	var pass = $("#modal_login_pass_field").val();

	var emailValid = (email !== null && validateEmail(email));
	var passValid = (pass !== null && isBetween(pass.length, 5, 30));
	var loginValid = emailValid && passValid;

	var messageFieldText;
	if(!loginValid) {
		messageFieldText = "Some information is missing or invalid.<br />";
	}
	displayLoginErrors(
		messageFieldText,
		" - Please enter a valid e-mail address.",
		" - Please enter a valid password.",
		emailValid,
		passValid
	);
	return loginValid;
}

function displayLoginErrors(mainText, emailText, passText, emailValid, passValid) {
	var messageField = $("#modal_login_error");
	messageField.html(mainText);
	setFieldFormatting(
		"modal_login_email_field",
		"modal_login_email_label",
		emailText,
		messageField,
		emailValid,
		emailText !== null);
	setFieldFormatting(
		"modal_login_pass_field",
		"modal_login_pass_label",
		passText,
		messageField,
		passValid,
		passText !== null);
}
function _handleLoginServerResponse(json, callback) {
	try {
		if(json["valid"]) {
			displayLoginErrors(
				null,
				null,
				null,
				json["loginValid"],
				json["passValid"]
			);
			callback();
		} else {
			if(json["loginErrorType"] === 'Locked') {
				displayLoginErrors(
					"Your account has been locked due to <br />failed login attempts.  Please call Customer Service toll-free at 1-866-887-8884.",
					null,
					null,
					json["loginValid"],
					json["passValid"]
				);
			} else if(json["loginErrorType"] === 'Disabled') {
				displayLoginErrors(
					"At your request, your Kohls.com account has been disabled.",
					null,
					null,
					json["loginValid"],
					json["passValid"]
				);
			} else {
				displayLoginErrors(
					"Some information is missing or invalid.</br>",
					" - Please enter a valid e-mail address.",
					" - Please enter a valid password.",
					json["loginValid"],
					json["passValid"]
				);
			}
		}
	} catch(e) {
	}
}

function validateCreate() {
	var firstName = $("#modal_create_first_name_field").val();
	var lastName = $("#modal_create_last_name_field").val();
	var email = $("#modal_create_email_field").val();
	var pass = $("#modal_create_password_field").val();
	var confirmPass = $("#modal_create_confirm_password_field").val();


	var firstNameValid = validateName(firstName) && isBetween(firstName.length, 1, 40);
	var lastNameValid = validateName(lastName) && isBetween(lastName.length, 1, 40);
	var emailValid = validateEmail(email);
	var passValid = isBetween(pass.length, 5, 30);
	var confirmPassValid = isBetween(confirmPass.length, 5, 30) && pass === confirmPass;
	var createValid = firstNameValid && lastNameValid && emailValid && passValid && confirmPassValid;

	var messageFieldText = "";
	if(!createValid) {
		messageFieldText = "Some information is missing or invalid.<br />";
	}

	displayCreateErrors(messageFieldText, firstNameValid, lastNameValid, emailValid, passValid, confirmPassValid, email.length > 0, pass === confirmPass);
	return createValid;
}

function displayCreateErrors(messageFieldText, firstNameValid, lastNameValid, emailValid, passValid, confirmPassValid, displayEmailError, passMatch, emailErrorMessage) {
	var checked = false;
	var messageField = $("#modal_create_error");
	var genericErrorMessage = " - Please fill out all fields.";
	if(!emailErrorMessage) emailErrorMessage = " - Please enter a valid e-mail address.";
	messageField.html(messageFieldText);

	if((!emailValid && displayEmailError) && (passValid && !passMatch)) checked = true;

	setFieldFormatting(
		"modal_create_first_name_field",
		"modal_create_first_name_label",
		genericErrorMessage,
		messageField,
		firstNameValid,
		!checked);

	if(!firstNameValid && !checked) checked = true;

	setFieldFormatting(
		"modal_create_last_name_field",
		"modal_create_last_name_label",
		genericErrorMessage,
		messageField,
		lastNameValid,
		!checked);

	if(!lastNameValid && !checked) checked = true;

	setFieldFormatting(
		"modal_create_email_field",
		"modal_create_email_label",
		emailErrorMessage,
		messageField,
		emailValid,
		displayEmailError);

	setFieldFormatting(
		"modal_create_password_field",
		"modal_create_password_label",
		genericErrorMessage,
		messageField,
		passValid,
		!checked);

	if(!passValid && !checked) checked = true;

	var confirmPassMessage = genericErrorMessage;
	if(passValid && !passMatch) {
		confirmPassMessage = " - The entered passwords do not match.";
	}

	setFieldFormatting(
		"modal_create_confirm_password_field",
		"modal_create_confirm_password_label",
		confirmPassMessage,
		messageField,
		confirmPassValid,
		passValid && !passMatch);

	if(!confirmPassValid && !checked) checked = true;
}

function _handleCreateServerResponse(json, callback) {
	try {
		if(json["valid"]) {
			displayCreateErrors(
				null,
				json["firstNameValid"],
				json["lastNameValid"],
				json["loginValid"],
				json["passValid"],
				json["confirmPassValid"],
				false,
				true
			);
			callback();
		} else {
			displayCreateErrors(
				"Some information is missing or invalid.<br />",
				json["firstNameValid"],
				json["lastNameValid"],
				json["loginValid"],
				json["passValid"],
				json["confirmPassValid"],
				true,
				true,
				"The entered e-mail address already exists in the system.  Please use a different e-mail address."
			);
		}
	} catch(e) {
	}
}

function validateRecPass() {
	var email = $("#modal_recpass_email_field").val();

	var emailValid = (email !== null && validateEmail(email));

	var messageFieldText = "";
	if(!emailValid) {
		messageFieldText = "Please enter a valid e-mail address.";
	}

	displayRecPassErrors(emailValid, messageFieldText);
	return emailValid;
}

function displayRecPassErrors(emailValid, messageFieldText) {
	var messageField = $("#modal_recpass_error");
	messageField.text("");
	setFieldFormatting(
		"modal_recpass_email_field",
		"modal_recpass_email_label",
		messageFieldText,
		messageField,
		emailValid,
		true);

}
function _handleRecPassServerResponse(data, callback) {
	try {
		var json = $.parseJSON(data);
		if(json["valid"]) {
			displayRecPassErrors(
				json["emailValid"]
			);
			callback();
		} else {
			displayRecPassErrors(
				json["emailValid"],
				"The e-mail address does not exist in the system."
			);
		}
	} catch(e) {
	}
}

function _addModalFancyboxClasses() {
	$("#fancybox-content").addClass('modal-fancybox-content');
	$("#fancybox-close").addClass('modal-fancybox-close');
}

function _removeModalFancyboxClasses() {
	$("#fancybox-content").removeClass('modal-fancybox-content');
	$("#fancybox-close").removeClass('modal-fancybox-close');
}

function isBetween(value, low, high, nonInclusive) {
	var between = false;

	if(low > high) {
		var temp = low;
		low = high;
		high = temp;
	}

	if(nonInclusive) {
		between = value > low && value < high;
	} else {
		between = value >= low && value <= high;
	}

	return between;
}

function setFieldFormatting(fieldID, labelID, invalidMessage, messageField, valid, addMessage) {
	var field = $("#" + fieldID).val();

	if(!valid) {
		if(addMessage) messageField.append(invalidMessage + "<br />");
		markInvalidLabelAndField(labelID, fieldID);
	} else {
		unmarkInvalidLabelAndField(labelID, fieldID);
	}

	return valid;
}

function markInvalidLabelAndField(labelID, fieldID) {
	$("#" + labelID).addClass("modal_error");
	$("#" + labelID).find("span").addClass("modal_error");
	$("#" + fieldID).addClass("modal_error_field");
}

function unmarkInvalidLabelAndField(labelID, fieldID) {
	$("#" + labelID).removeClass("modal_error");
	$("#" + labelID).find("span").removeClass("modal_error");
	$("#" + fieldID).removeClass("modal_error_field");
}

function validateName(name) {
	var nameRegex = /^[a-z A-Z]+$/;

	return nameRegex.test(name);
}

function validateEmail(email) {
	var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	return emailRegex.test(email);
}

function successAction() {
	handleCookies();
	_updateOmnitureLoggedInStatus();

	if(typeof quickViewPending !== 'undefined' && quickViewPending) {
		displayQuickView();
	} else {
		$.fancybox.close();
	}
	return true;
}

function failureAction() {

	if(typeof quickViewPending !== 'undefined' && quickViewPending) {
		displayQuickView();
	} else {
		$.fancybox.close();
	}

	return false;
}

function _updateOmnitureLoggedInStatus() {
	if(typeof s !== 'undefined') {
		s.prop17 = 'logged in';
		s.eVar17 = 'logged in';
	}
}

$(function($) {
    //Character counter for textarea on vgc personalization
    $('#messageText').keyup(function(e){

        var maxLen = 100;
        var textMessage = $(this).val();
        var charUsed = textMessage.length;
        var charRemaining = maxLen - charUsed;
        //alert(charRemaining)

        // Fixes -1 display
        if (charRemaining === -1){
            charRemaining = 0;
        };

        $('#charRemaining').html(charRemaining);

        if(charUsed > maxLen){
            var new_text = textMessage.substr(0, maxLen);
            $(this).val(new_text);
        }
    });

});

/*
Allow backwards compatibility with old Wishlist/GG trackAnalytics
 */
window.trackAnalytics = function(eventName, values) {
    skava.omniture.client.trackAnalytics('wl' + eventName.charAt(0).toUpperCase() + eventName.slice(1), values);
};

(function($) {
    var config = {
        wcAffiliateParam: "wcref",
        bumpAffiliateParam: "bref",
        wcAffiliateType: "WC",
        bumpAffiliateType: "TB",
        paramAffirm: "yes",
        wcRetailerID: 14620,
        bRetailerID: 14630,
        cookieName: "affiliateCookie"
    };

    var affiliateType = "";

    if(typeof $.cookie(config.cookieName) === 'undefined') {
        var wcParamVal = GetURLParameter(config.wcAffiliateParam),
            bParamVal = GetURLParameter(config.bumpAffiliateParam);
        if(wcParamVal === config.paramAffirm){
            affiliateType = config.wcAffiliateType;
        }
        if(bParamVal === config.paramAffirm){
            affiliateType = config.bumpAffiliateType;
        }

        if(affiliateType !== "") {
            $.cookie(config.cookieName, affiliateType, {path: '/'});
        }
    }

})(jQuery);