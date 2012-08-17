window.BNY = window.BNY || {};
BNY.utilities = BNY.utilities || {};

BNY.utilities.isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
BNY.utilities.isiPad = navigator.userAgent.match(/iPad/i) !== null;
BNY.utilities.isiPhone = navigator.userAgent.match(/iPhone/i) !== null;
BNY.utilities.isGigyaUser = false;

$.extend(BNY.utilities, function() {

	'use strict';

	var methods = {

		detectDevice: function() {

			var browser = $.browser;

			if (BNY.utilities.isiPad) {
				$('html').addClass('iPad');
			}

			if (browser && browser.webkit === true) {
				$('html').addClass('webkit');
			}

		},

		validation: {

			addMethods: function() {

				// add additional methods
				$.validator.addMethod('notEqualTo', function(value, element, param) {
				    return this.optional(element) || value !== $(param).val();
				});
				
				$.validator.addMethod('ccExpireDate', function(value, element, param) {
					var year = $(element).parents('.month').siblings('.year').find('select').val();
						year = year.replace(',',''),
						year = Number(year);
						
					var date = new Date(),
						currentMonth = date.getMonth() + 1, // getMonth has a 0 index for January
						currentYear = date.getFullYear(); // getYear returns the number of years since 1900 -- we use getFullYear instead
				
					return this.optional(element) || (year > currentYear || (year === currentYear && value >= currentMonth));
				}, '');

				$.validator.addMethod('currencyRange', function(value, element, param) {
				    value = Number(value.replace(/[^\d.]/g, ''));
				    return this.optional(element) || (value <= param[1] && value >= param[0]);
				}, 'Please enter a value between {0} and {1}.');

				$.validator.addMethod('digitsAndDashes', function(value, element) {
				    return this.optional(element) || (/^[0-9-]+$/i).test(value);
				}, 'Please enter only digits or dashes.');

				$.validator.addMethod('postalcode', function(postalcode, element) {
					return this.optional(element) || postalcode.match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/);
				}, 'Please specify a valid zip code.');

				$.validator.addMethod('nowhitespace', function(value, element) {
				    return this.optional(element) || (/^\S+$/i).test(value);
				}, 'No white space please');

				$.validator.addMethod('poBoxCheck', function(value, element) {
					var regExp = /(\b|[0-9])[pP][\. ]*[oO][\. ]+[bB][oO][xX](\b|[0-9])/;
					return !regExp.test(value);
				}, 'We cannot ship to PO Boxes');

				$.validator.addMethod('positivenumber', function(value, element) {
					if (value === '') {
						return true;
					}
					return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value) && Number(value) >= 0;
				}, '');

				$.validator.addMethod('phoneUS', function(phone_number, element) {
				    phone_number = phone_number.replace(/\s+/g, '');
					return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
				}, 'Please specify a valid phone number');

			}

		},

		quickView: {

			// this "carousel" object is a container for properties and elements that are
			// updated as the carousel slides left and right
			carousel: {
				siblingsLength: 2,
				length:	0,
				width:	0,
				slideWidth: 443,
				jqXHR: {},
				productInfo: {}
			},

			initialize: function() {

				var quickViewLinks = $('a.quickview'),
					quickViewProducts = [],
					carousel = this.carousel;

				// only proceed if we have any quickview links on the page
				if (quickViewLinks.length) {

					$('body').on('click', 'a.quickview', function(e) {
						e.preventDefault();

						var $this = $(this),
							product = {},
							quickViewContext = $this.data('quickview-context');

						if (quickViewContext) {
							quickViewProducts = $(quickViewContext).find('.producttile');
							product = quickViewProducts[0];
						} else {
							quickViewProducts = $('.producttile').not('.featured-item');
							product	= $this.parents('.producttile')[0];
						}

						var position = $.inArray(product, quickViewProducts),
							quickViewDialog	= methods.quickView.open(),
							overlay	= $('.ui-widget-overlay');

						carousel.quickViewDialog = quickViewDialog;
						carousel.position = position;
						carousel.quickViewProducts = quickViewProducts;

						methods.quickView.cycle.init(carousel);

						overlay.click(function() {
							quickViewDialog.dialog('close');
						});

					});

					return true;

				} else {
					return false;
				}

			},

			open: function() {

				var quickViewDialog = $('#quickview-dialog');

				if (quickViewDialog.length) {
					quickViewDialog.remove();
				}

				$('<div/>').attr('id', 'quickview-dialog').appendTo(document.body);

				app.createDialog({
					id: 'quickview-dialog',
					options: {
						width:	1008,
						height:	598,
						position: ['center', 'center'],
						modal:	true,
						dialogClass: 'quickview'
					}
				});

				quickViewDialog.dialog('open');
				quickViewDialog = $('#quickview-dialog');

				return quickViewDialog;

			},

			cycle: {

				init: function(carousel) {

					var lowerBound = carousel.position - carousel.siblingsLength,
						upperBound = carousel.position + carousel.siblingsLength,
						prevSiblingsLen	= 0,
						nextSiblingsLen	= 0,
						leftPosition = 0,
						halfDialogWidth = 0,
						previousClass = '',
						currentClass = '',
						nextClass = '',
						cssAnimSign	= '-',
						quickViewCarousel = {},
						productIteration = {},
						imageIteration = '',
						navNext	= {},
						navPrev	= {},
						carouselWrapper	= {},
						self = this,
						i = 0;

					$('<div/>').attr('id', 'quickview-carousel-wrapper').appendTo(carousel.quickViewDialog);

					carouselWrapper = $('#quickview-carousel-wrapper');

					$('<ul/>').attr('id', 'quickview-carousel').appendTo(carouselWrapper);
					$('<a/>').attr('id', 'quickview-prev').attr('class', 'quickview-nav left').attr('data-nav-direction', 'left').appendTo(carouselWrapper);
					$('<a/>').attr('id', 'quickview-next').attr('class', 'quickview-nav right').attr('data-nav-direction', 'right').appendTo(carouselWrapper);
					$('<a/>').attr('id', 'quickview-close').attr('title', 'Close').attr('href', '#').text('Close').appendTo(carouselWrapper);

					$('<div/>')
						.attr('id', 'quickview-product-info')
						.attr('class', 'clearfix')
						.html('<div id="quickview-cart">' +
								'</div>' +
								'<div id="quickview-details">' +
									'<h1 id="quickview-details-designer"><a href="#"></a></h1>' +
									'<h2 id="quickview-details-product"><a href="#"></a></h2>' +
									'<span id="quickview-details-price"></span>' +
									'<div id="quickview-details-additional" class="clearfix">' +
										'<div id="quickview-details-share">' +
											'<a href="#" id="quickview-details-share-anchor" title="Share">Share</a>' +
											'<div id="quickview-details-share-links" class="shareitem">' +
												'<span class="arrow"></span>' +
												'<ul>' +
													'<li class="first">' +
														'<div id="quickview-details-fb-wrapper">' +
														'</div>' +
													'</li>' +
													'<li>' +
														'<div id="quickview-details-twitter-wrapper">' +
														'</div>' +
													'</li>' +
													'<li>' +
														'<div id="quickview-details-pinterest-wrapper">' +
														'</div>' +
													'</li>' +
													'<li>' +
														'<div id="quickview-details-fancy-wrapper">' +
														'</div>' +
													'</li>' +
													'<li class="last">' +
														'<div id="quickview-details-email-wrapper">' +
														'</div>' +
													'</li>' +
												'</ul>' +
											'</div>' +
										'</div>' +
										'<div id="quickview-details-more">' +
											'<a href="#" title="Item Details">Item Details</a>' +
										'</div>' +
									'</div>' +
								'</div>')
						.appendTo(carousel.quickViewDialog);

					quickViewCarousel = $('#quickview-carousel');
					navNext = $('#quickview-next');
					navPrev = $('#quickview-prev');

					for (i = lowerBound; i <= upperBound; i = i + 1) {

						previousClass = i === (carousel.position - 1) ? 'previous' : '';
						currentClass = i === carousel.position ? 'current' : '';
						nextClass = i === (carousel.position + 1) ? 'next' : '';

						productIteration = carousel.quickViewProducts[i];
						imageIteration = $(productIteration).find('.productimage').attr('data-product-quickview-image');

						if (productIteration) {
							quickViewCarousel.append("<li class='" + previousClass + currentClass + nextClass + "'><img src='" + imageIteration + "' width='443' height='443' border='0' /></li>");
							previousClass	= '';
							currentClass	= '';
							nextClass	= '';

							if (i < carousel.position) {
								prevSiblingsLen = prevSiblingsLen + 1;
							}

							if (i > carousel.position) {
								nextSiblingsLen = nextSiblingsLen + 1;
							}
						}

					}

					if (prevSiblingsLen === 0) {
						navPrev.hide();
					}

					if (nextSiblingsLen === 0) {
						navNext.hide();
					}

					carousel.length	= quickViewCarousel.find('li').length;
					carousel.width = carousel.length * carousel.slideWidth;
					carousel.productInfo.name = $('#quickview-details-product a');
					carousel.productInfo.designer = $('#quickview-details-designer a');
					carousel.productInfo.details = $('#quickview-details-more a');
					carousel.productInfo.price = $('#quickview-details-price');
					carousel.quickViewCarousel = quickViewCarousel;
					
					halfDialogWidth = Number(carousel.quickViewDialog.width()) / 2;

					if (carousel.quickViewProducts.length == 1) {
						leftPosition = ((Number(carousel.quickViewDialog.width()) - carousel.slideWidth) / 2) * -1;
	
					} else if (prevSiblingsLen < carousel.siblingsLength && prevSiblingsLen == 1) {
						leftPosition = (carousel.slideWidth - halfDialogWidth) + (carousel.slideWidth / 2);
						
					} else if (prevSiblingsLen < carousel.siblingsLength && prevSiblingsLen == 0) {
						leftPosition = (carousel.slideWidth - halfDialogWidth) + ((carousel.slideWidth / 2) * -1);

					} else if (prevSiblingsLen < carousel.siblingsLength) {
						leftPosition = ((carousel.width / 2) - halfDialogWidth) + ((carousel.slideWidth / 2) * (prevSiblingsLen - carousel.siblingsLength));

					} else if (nextSiblingsLen < carousel.siblingsLength) {
						leftPosition = ((carousel.width / 2) - halfDialogWidth) - ((carousel.slideWidth / 2) * (nextSiblingsLen - carousel.siblingsLength));

					} else {
						leftPosition = ((carousel.width / 2) - halfDialogWidth);
					}

					if (leftPosition < 0) {
						leftPosition = -leftPosition;
						cssAnimSign = '';
					}

					quickViewCarousel.css({
						'width': carousel.width + 'px',
						'left':	cssAnimSign + leftPosition + 'px'
					});

					self.bindNav(carousel);
					self.loadProductInfo(carousel.quickViewProducts[carousel.position], carousel);

				},

				bindNav: function(carousel) {

					var navLinks = $('a.quickview-nav'),
						close = $('#quickview-close'),
						shareAnchor = $('#quickview-details-share-anchor'),
						touchOptions = {},
						self = this;

					close.bind('click', function(e) {
						e.preventDefault();
	
						carousel.jqXHR.abort();

						carousel.quickViewDialog.dialog('close');
						carousel.quickViewProducts = [];

						// update the favorites list
						BNY.global.checkFavoritesListForItems();

					});
					
					if (carousel.length === 1) {
						navLinks.addClass('disabled');
						return false;
					}

					navLinks.bind('click', function() {

						var clickedElement	= $(this),
							direction	= clickedElement.attr('data-nav-direction');

						carousel.direction = direction;
						self.before(carousel);

					});

					shareAnchor.bind('click', function(e) {
						e.preventDefault();
					});

					self.bindPreviousNext(carousel);

					if (BNY.utilities.isMobile) {

						touchOptions = {
							isDetectHorizontalMovement: true,
							isDetectVecticalMovement: false,
							isDetectDiagonalMovement: false,
							wipeLeft: function(e) {
								carousel.direction = 'right';
								self.before(carousel);
							},
							wipeRight: function(e) {
								carousel.direction = 'left';
								self.before(carousel);
							}
						};

						carousel.quickViewCarousel.touchme(touchOptions);

					}

				},

				bindPreviousNext: function(carousel) {

					var prevProduct = $(carousel.quickViewCarousel).find('li.previous'),
						nextProduct = $(carousel.quickViewCarousel).find('li.next'),
						self	= this;

					$(carousel.quickViewCarousel).find('li').unbind();

					prevProduct.bind('click', function() {
						carousel.direction = 'left';
						self.before(carousel);
					});

					nextProduct.bind('click', function() {
						carousel.direction = 'right';
						self.before(carousel);
					});

				},

				before: function(carousel) {

					var index	= 0,
						self	= this;

					if (carousel.direction === 'right') {
						index = carousel.position + 1;
					} else {
						index = carousel.position - 1;
					}

					if (carousel.quickViewProducts[index]) {
						self.change(carousel);
					}
				},

				after: function(carousel) {

					var nextSiblingsLen = $('li.current ~ li').length,
						prevSiblingsLen = $('li.current').prevAll().length,
						newProduct	= {},
						imgOpacity	= 1,
						newListItem	= '',
						productImgSrc	= '';

					if (nextSiblingsLen < carousel.siblingsLength || prevSiblingsLen < carousel.siblingsLength) {

						if (carousel.direction === 'left') {
							newProduct = $(carousel.quickViewProducts[(carousel.position - carousel.siblingsLength)]);
							imgOpacity = 0;
						} else {
							newProduct = $(carousel.quickViewProducts[(carousel.position + carousel.siblingsLength)]);
						}

						if (newProduct.length) {

							productImgSrc = newProduct.find('.productimage').attr('data-product-quickview-image');

							newListItem = "<li><img style='opacity: " + imgOpacity + ";' src='" + productImgSrc + "' width='443' height='443' border='0' /></li>";

							if (carousel.direction === 'left') {
								carousel.quickViewCarousel.prepend(newListItem);
								carousel.quickViewCarousel.animate({
									left: '-=' + carousel.slideWidth
								}, 0, function() {
									carousel.quickViewCarousel.find('li img').css('opacity', '1');
								});
							} else {
								carousel.quickViewCarousel.append(newListItem);
							}

							carousel.length = carousel.length + 1;

							carousel.width	= carousel.length * carousel.slideWidth;

							carousel.quickViewCarousel.css({
								width: carousel.width + 'px'
							});
						} else {
							return;
						}

					}

				},

				change: function(carousel) {

					var currentItem = carousel.quickViewCarousel.find('li.current'),
						nextItem	= currentItem.next(),
						twoAhead	= nextItem.next(),
						prevItem	= currentItem.prev(),
						twoBehind	= prevItem.prev(),
						sign = '',
						self = this;

					sign = carousel.direction === 'left' ? '+' : '-';

					if (sign === '-') {

						prevItem.removeClass('previous');
						currentItem.removeClass('current').addClass('previous');
						nextItem.addClass('current').removeClass('next');

						if (twoAhead.length === 1) {
							twoAhead.addClass('next');
						}

						carousel.position = carousel.position + 1;

					} else {

						if (twoBehind.length === 1) {
							twoBehind.addClass('previous');
						}

						prevItem.addClass('current').removeClass('previous');
						currentItem.removeClass('current').addClass('next');
						nextItem.removeClass('next');

						carousel.position = carousel.position - 1;
					}

					carousel.quickViewCarousel.animate({
						left: sign + '=' + carousel.slideWidth
					}, 100, function() {
						self.loadProductInfo(carousel.quickViewProducts[carousel.position], carousel);
						self.after(carousel);
					});

					self.bindPreviousNext(carousel);

					if (carousel.quickViewCarousel.find('li.previous').length === 0) {
						$('#quickview-prev').hide();
					} else {
						$('#quickview-prev').show();
					}

					if (carousel.quickViewCarousel.find('li.next').length === 0) {
						$('#quickview-next').hide();
					} else {
						$('#quickview-next').show();
					}
				},

				loadProductInfo: function(product, carousel) {

					product = $(product);

					if (carousel.jqXHR.abort) {
						carousel.jqXHR.abort();
					}

					var options	= {},
						designerName = product.find('.designername').text() || '',
						displayName = product.find('.displayname').text() || '',
						href = product.find('.name a').attr('href') || product.find('.image a').attr('href'),
						price = product.find('.standardprice').text() || '',
						imageSource = product.find('img').attr('src'),
						favoriteID = product.find('.remove-item-favorites').attr('data-favorite-id'),
						facebookShare = '',
						twitterShare = '',
						pinterestShare = '',
						fancyShare = '',
						emailShare = '',
						fancyScript = '',
						self = this;
					
					carousel.productInfo.designer.text(designerName).attr('href', href);
					carousel.productInfo.name.text(displayName).attr('href', href);
					carousel.productInfo.details.attr('href', href);
					carousel.productInfo.price.text(price);
					
					facebookShare	= '<iframe src="//www.facebook.com/plugins/like.php?href=' + href + '&amp;send=false&amp;layout=button_count&amp;width=85&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:85px; height:21px;" allowTransparency="true"></iframe>';
					twitterShare	= '<iframe allowtransparency="true" width="55" height="20" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?count=none&url=' + encodeURIComponent(href) + '&text=Check out this amazing ' + designerName + ' ' + displayName + '"></iframe>';
					pinterestShare	= '<iframe scrolling="no" frameborder="0" src="http://pinit-cdn.pinterest.com/pinit.html?description=' + designerName + ' ' + displayName + '&amp;url=' + encodeURIComponent(href) + '&amp;media=' + encodeURIComponent(imageSource) + '&amp;layout=none" style="border: medium none; width: 43px; height: 20px;"></iframe>';
					fancyShare		= '<a id="FancyButton" href="http://www.thefancy.com/fancyit?ItemURL=' + encodeURIComponent(href) + '&Title=' + designerName + ' ' + displayName + '&ImageURL=' + encodeURIComponent(imageSource) + '">Fancy</a><script src="https://www.thefancy.com/fancyit.js" type="text/javascript"></script>';
					emailShare		= '<a href="' + app.URLs.sendToFriend +'" data-dialog-href="' + href + '" data-dialog-email-message="Check out this amazing ' + designerName + ' ' + displayName + ' at Barneys." data-dialog-link-text="' + designerName + ' ' + displayName + '" data-dialog-width="608" data-dialog-height="650" data-dialog-email-subject="Check out this Item from Barneys New York" data-dialog-title="Send to a Friend" data-dialog-callback="BNY.global.sendToFriendCallback" data-dialog-context="sendtofriend" title="Email This" class="sendtofriend lightbox">Email This</a>';

					$('#quickview-details-fb-wrapper').html(facebookShare);
				    $('#quickview-details-twitter-wrapper').html(twitterShare);
				    $('#quickview-details-pinterest-wrapper').html(pinterestShare);
				    $('#quickview-details-fancy-wrapper').html(fancyShare);
				    $('#quickview-details-email-wrapper').html(emailShare);

					options.containerId	= 'quickview-cart';
					options.source = 'quickview';
					options.url	= href;
					options.callback = function() {

						// after clicking 'add to cart' the user gets a success message
						// the success message has a close button in it with an id of return-to-add
						// once clicked, the quickview-cart is re populated with updated variant information for the current product
						$('#return-to-add').click(function(e) {
							e.preventDefault();
							app.getProduct(options);
						});

						// check if the item has been added to favorites
						if (favoriteID) {
							var removeLink = app.URLs.removeFromFavorites + '?id=' + favoriteID;
							$('#product-favorites').find('a.remove-item-favorites').show().attr({'href': removeLink, 'data-favorite-id': favoriteID});
							$('#product-favorites').find('a.add-item-favorites').hide();
						}
						
						methods.buyButtonValidation();
					};

					// get the variants and buy button for the current product
					// store the jquery XHR object in the carousel.jqXHR object
					carousel.jqXHR = app.getProduct(options);

					// update the favorites list
					BNY.global.checkFavoritesListForItems();

				}

			}

		},
		
		buyButtonValidation: function() {
			
			if (!($('.addtocart').length)) {
				return false;
			}
			
			$('body').on('click', '.addtocart-disabled-cover', function(e) {
				
				var variants = $(this).parents('.addtocartbar').siblings('.variationattributes').find('.variantbox select')
				
				$.each(variants, function(key, value) {
					
					var $this = $(this);
					
					if ($this.children(":selected").val() === "") {
						$this.addClass('variant-error');
					}
					
				});
				
				variants.change(function() {
					if ($(this).children(':selected').val() !== "") {
						$(this).removeClass('variant-error');
					}
				});
				
			});
			
		},

		clearDefaults: {

			init: function() {

				$('.default-value').each(function() {
					var default_value = this.value;
	
					$(this).focus(function() {
						if (this.value === default_value) {
							this.value = '';
						}
					});
					
					$(this).blur(function() {
						if (this.value === '') {
							this.value = default_value;
						}
					});
				});
			}
		}

	},

		globalCarouselOptions = {
			timeout: 0,
			speed: 1000,
			pause: 0
		},

		globalDialogOptions = {
			position: ['center', 'center']
		};

	return {

		initialize: function() {

			methods.detectDevice();

			methods.validation.addMethods();

			methods.quickView.initialize();

			methods.clearDefaults.init();
			
			methods.buyButtonValidation();

		},

		getGlobalCarouselOptions: function() {
			return globalCarouselOptions;
	    },

		getGlobalDialogOptions: function() {
			return globalDialogOptions;
	    },

	    gigyaCheck: function(callback) {
	    	gigya.socialize.getUserInfo({
				callback: callback
			});
	    },
	    
	    clearDefaults: function() {
	    	methods.clearDefaults.init();
	    }

	};

}.call(BNY.utilities));

$(document).ready(function() {
	'use strict';
	BNY.utilities.initialize();
});
