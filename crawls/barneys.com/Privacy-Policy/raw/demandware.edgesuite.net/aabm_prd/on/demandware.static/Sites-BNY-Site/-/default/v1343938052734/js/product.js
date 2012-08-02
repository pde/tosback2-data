(function(app) {
	if (app) {
		// add Product namespace to app namespace
		app.Product = function(response) {
			// product private data

			// product json data
			var model = response.data;
			model.isOutfitItem = response.isOutfitItem;

			// is quick view (or regular prod details page)?
			var isQuickView	= response.isQuickView;

			// is look book view
			var isLookbook	= (response.data.source == 'lookbook') ? true : false;

			// div cotainer id
			var myContainerId	= '';

			// popupURL
			var popupURL = '';

			// boolean flag to track the variants data request, reset in loadVariants() when the variants data is loaded
			var isLoadingVar	= false;

			// helper function to load variants data from the server
			// once the data is retrieved, it fires VariationsLoaded event so that UI can be refreshed appropriately
			var loadVariants	= function(thisProduct) {
				isLoadingVar = true;
				// build the url and load variants data
				app.ajax.getJson({
					url: app.URLs.getVariants,
					data: {'pid': thisProduct.pid, 'format': 'json'},
					callback: function(data) {

						if (!data || !data.variations || !data.variations.variants) {
							return;
						}
						model.variations.variants = data.variations.variants;
						isLoadingVar = false; // we have loaded the variants
						jQuery(thisProduct).trigger('VariationsLoaded');
					}
				});
			}

			// helper function to reload availability data.
			// by default, availability data is based on a quantity of 1.
			// if a customer changes the quantity, use this method
			// to reload the availability based on the new quantity.
			var reloadAvailability = function(thisProduct, quantity) {

				var id = (thisProduct.master ? thisProduct.selectedVar.id : thisProduct.pid);

				app.ajax.getJson({
					url: app.URLs.getAvailability,
					data: {'pid': id, 'Quantity': quantity, 'format': 'json'},
					callback: function(data) {

						if (!data || !data.avLevels) {
							return;
						}

						// update the data in the variant
						if (thisProduct.master) {
							thisProduct.selectedVar.avLevels = data.avLevels;
							thisProduct.selectedVar.avStatusQuantity = data.avStatusQuantity;
						} else {
							model.avLevels = data.avLevels;
							model.avStatusQuantity = data.avStatusQuantity;
						}
						jQuery(thisProduct).trigger('ReloadAvailability');
					}
				});

			}

			// returns the aggregate available to sell value
			// from all variants
			var getATS = function(variants) {

				var atsCount = 0;
				for (var i = 0; i < variants.length; i++) {
					variant = variants[i];
					if (variant.ATS > 0) {
						atsCount = atsCount + variant.ATS;
					}
				}
				return atsCount;
			}


			// creates product recommendation carousel using jQuery jcarousel plugin
			// uses app.tooltip to create tooltips for each product in the carousel

			//Edited by HUGE, changed scroll to 4, removed tooltip function and added into huge_product.js
			var loadRecommendations = function(containerId) {
				jQuery(containerId + ' .maywerecommend ul.carousel').show();
				if (jQuery(containerId + ' .maywerecommend ul.carousel li').length > 4) {
					jQuery(containerId + ' .maywerecommend ul.carousel').jcarousel({
						scroll: 4,
						itemVisibleInCallback: app.captureCarouselRecommendations
					});
				}
			}

			// helper function to bind product options drop downs event handlers
			// Intializes the product.selectedOptions object with the currently selected options
			// it also shows the computed/updated price
			var getOptionsDiv	= function(thisProduct) {

				if (model.isOption) {

					var pdpOpt = jQuery(thisProduct.containerId + ' .product_options:last select');

					pdpOpt.change(function(e) {
						var vals = this.options[this.selectedIndex].value.split('%?%'); // 0 = value, 1 = price
						thisProduct.selectedOptions[this.id] = vals[0];
						thisProduct.selectedPrice[this.id] = vals[1];
						thisProduct.showUpdatedPrice(computePrice(thisProduct), model.pricing.standard);
					});

					// let us get the currently selected value and intilize the ui
					pdpOpt.each(function(i) {
						var vals = this.options[this.selectedIndex].value.split('%?%'); // 0 = value, 1 = price

						thisProduct.selectedOptions[this.id] = vals[0];
						thisProduct.selectedPrice[this.id] = vals[1];
						thisProduct.showUpdatedPrice(computePrice(thisProduct), model.pricing.standard);
					});
				}
			}

			// binds A2C button click handler
			var getAddToCartBtn = function(thisProduct) {

				var addToCartBtn = jQuery(thisProduct.containerId + ' .addtocartbutton:first').unbind('click');

				var addToCartBtn = jQuery(thisProduct.containerId + ' .addtocartbutton:first').click(function(e) {

					if (model.isOutfit || model.productSet) {

						// product set or "outfit" --> we have to add several (sub-) products in general
						var subProducts = thisProduct.subProducts;

						thisProduct.selectedOptions.childPids = '';
						thisProduct.selectedOptions.Quantity = '';

						// process each individual products in the outfit / set
						// and prepare product.selectedOptions for final submission
						for (var i = 0; i < subProducts.length; i++) {

							var subproduct = subProducts[i];

							// see if any of the sub products are variations, if so then get the selected variation id
							// from selectedVar property and make it a comma separated list
							if (subproduct.variant || subproduct.master) {

								if (subproduct.selectedVar !== null && subproduct.selectedOptions.Quantity > 0) {

									thisProduct.selectedOptions.childPids = thisProduct.selectedOptions.childPids.length == 0 ?
											subproduct.selectedVar.id :
											thisProduct.selectedOptions.childPids + ',' + subproduct.selectedVar.id;
									thisProduct.selectedOptions.Quantity = thisProduct.selectedOptions.Quantity.length == 0 ?
											subproduct.selectedOptions.Quantity.toString() :
											thisProduct.selectedOptions.Quantity + ',' + subproduct.selectedOptions.Quantity.toString();
								}

							} else if (subproduct.selectedOptions.Quantity > 0) {

								thisProduct.selectedOptions.childPids = thisProduct.selectedOptions.childPids.length == 0 ?
										subproduct.pid :
										thisProduct.selectedOptions.childPids + ',' + subproduct.pid;
								thisProduct.selectedOptions.Quantity = thisProduct.selectedOptions.Quantity.length == 0 ?
										subproduct.selectedOptions.Quantity.toString() :
										thisProduct.selectedOptions.Quantity + ',' + subproduct.selectedOptions.Quantity.toString();
							}
						} // for

						// make sure the pid which gets submitted is for the main product
						thisProduct.selectedOptions.pid = thisProduct.pid;

						if (thisProduct.selectedOptions.childPids.length < 1) {
							return false;
						}

					} else {

						// A2C for a single product
						if (thisProduct.selectedOptions.Quantity < 1) {
							return false;
						}

						if (model.master || model.variant) {

							if (thisProduct.selectedVar === null) {
								return false;
							}

							thisProduct.selectedOptions.pid = thisProduct.selectedVar.id;
							thisProduct.selectedOptions.masterPid = thisProduct.pid;
						} else {
							thisProduct.selectedOptions.pid = thisProduct.pid;
						}

					}

					thisProduct.selectedOptions.SelectedFromCategory = model.selectedFromCategory;

					// disable a2c button(s)
					thisProduct.disableAllA2CButtons();

					// close the quick view when user clicks A2C.
					app.quickView.close();

					// perform product validation / inventory check
					app.ajax.getJson({

						url: app.URLs.validateProductForA2C,
						data: jQuery.extend({}, thisProduct.selectedOptions, {'format': 'json'}),
						callback: function(data) {

							if (!data || !data.processOk) {

								alert('Product validation failed!');

								// enable A2C button(s)
								thisProduct.enableAllA2CButtons();
								return;
							}

							if (data.validProductItems.length > 0) {

								if (data.invalidProductItems.length === 0) {
									// single product that is valid or all selected outfit items are valid
									// --> add2cart using thisProduct.selectedOptions

									// find if there is a handler bound to AddToCart event e.g. cart -> edit details or wishlist -> edit details etc.
									// then fire it otherwise call app.minicart.add to add the selected product to the cart and show minicart
									if (jQuery.event.global['AddToCart'] === undefined || jQuery.event.global['AddToCart'] === null) {

										app.minicart.add('', thisProduct.selectedOptions, function() {

											/* Hack added by HUGE 09/02/2011 */
											if (app.minicart.addScrollbars) {
												app.minicart.addScrollbars();
											}

											thisProduct.trackAddToCartRequest(thisProduct.selectedOptions);
											thisProduct.enableAllA2CButtons();

											if (addToCartBtn.hasClass('quickview')) {
												addToCartBtn.hide();
												$('#quickview-add-confirmation').show();
											}
										});

									} else {
										var event = jQuery.Event('AddToCart');
										event.selectedOptions = thisProduct.selectedOptions;
										jQuery(document).trigger(event);
									}

									return;

								} else {

									// we have valid AND invalid products --> outfit is shown -->
									// add the valid(!) outfit items to cart
									var selectedOptions = {pid: data.outfitPid, childPids: '', Quantity: '', SelectedFromCategory: data.selectedFromCategory};

									for (var i = 0; i < data.validProductItems.length; i++) {

										if (i > 0) {
											selectedOptions.childPids += ',';
											selectedOptions.Quantity += ',';
										}

										selectedOptions.childPids += data.validProductItems[i].pid;
										selectedOptions.Quantity += data.validProductItems[i].requestedQty;
									}

									// find if there is a handler bound to AddToCart event e.g. cart -> edit details or wishlist -> edit details etc.
									// then fire it otherewise call app.minicart.add to add the selected product to the cart and show minicart
									if (jQuery.event.global['AddToCart'] === undefined || jQuery.event.global['AddToCart'] === null) {

										app.minicart.add('', selectedOptions, function() {
											thisProduct.trackAddToCartRequest(selectedOptions);
										});

										if (addToCartBtn.hasClass('quickview')) {
											addToCartBtn.hide();
											$('#quickview-add-confirmation').show();
										}

									} else {
										var event = jQuery.Event('AddToCart');
										event.selectedOptions = selectedOptions;
										jQuery(document).trigger(event);
									}
								}
							}

							// TAL: show inventory check overlay
							if (data.invalidProductItems.length > 0) {

								var validationDialog = jQuery('#validation-dialog');
								var postData = {
										data: JSON.stringify(data)
									};

								// create the dialog container if not present already
								if (validationDialog.length === 0) {

									jQuery(document.body).append('<div id=\"validation-dialog\"></div>');

									validationDialog = jQuery('#validation-dialog').dialog({
										bgiframe: true,
										autoOpen: false,
										modal: true,
								    	height: 300,
								    	width: 400,
								    	resizable: false,
								    	title: app.resources.PRODUCT_VALIDATION_TITLE,
								    	position: ['center', 'center']
									});
								}

								// finally load the dialog, set the dialog title
								app.ajax.load({
									selector: '#validation-dialog',
									type: 'POST',
									processData: false,
									url: app.URLs.showProductValidationResultDlg,
									data: postData,
									reqName: app.resources.PRODUCT_VALIDATION_TITLE,
									callback: function() {
										validationDialog.dialog('open');
										$('.dialog-close').bind('click', function(e) {
											e.preventDefault();
											validationDialog.dialog('close');
										});
										thisProduct.enableAllA2CButtons();
									}
								});
							}
						}
					});

					return false;
				});

				return addToCartBtn;
			}

			// bind qty box keyup handler
			// the handler grabs the value and updates
			// product.selectedOption.Quantity
			// show the updated availabilty message in case the available qty is different than available etc.
			// trigger AddtoCartEnabled event
			var getQtyBox = function(thisProduct) {

				var updateA2CButtonByQty = function() {
					var val = null;

					try {
						val = parseInt(jQuery(thisProduct.containerId + ' .quantityinput:last').val());
					} catch (e) {
						val = null;
					}

					if (val) {
						thisProduct.selectedOptions.Quantity = val;
						thisProduct.enableA2CButton();
						jQuery(thisProduct).trigger('AddtoCartEnabled');
					} else {
						thisProduct.selectedOptions.Quantity = 0;
						thisProduct.disableA2CButton();
						jQuery(thisProduct).trigger('AddtoCartDisabled');
					}
				}

				jQuery(thisProduct.containerId + ' .quantityinput:last').change(function(e) {
					updateA2CButtonByQty();
				});

				updateA2CButtonByQty();
			};

			// create product tabs i.e. description, Attributes, Reviews etc.
			// it depends on jQuery to create tab display.
			// also bind tab print button click handler
			var getTabs = function(containerId) {

				var tabsDiv = jQuery(containerId + ' #pdpTabsDiv');
				//tabsDiv.tabs();

				// tab print handler
				jQuery('a.printpage').click(function() {
					window.print();
					return false;
				});
			};

			// bind addtowishlist, giftregistry, send to friend click handlers
			// bind handlers to AddtoCartDisabled, AddtoCartEnabled events for disabling/enabling wishlist/gift registry links
			var getMiscLinks = function(thisProduct) {

				var disablelinks = function() {
					if ((model.master || model.variant) && thisProduct.selectedVar === null) {
						// disable wishlist/gift registry links for master products
						jQuery(thisProduct.containerId + ' .addtowishlist, ' + thisProduct.containerId + ' .addtoregistry').addClass('unselectable');
					}
				}

				disablelinks(); // call it for initial display and then register it with AddtoCartDisabled event

				jQuery(thisProduct).bind('AddtoCartDisabled', {}, disablelinks);

				jQuery(thisProduct).bind('AddtoCartEnabled', {}, function(e, source) {
					// enable wishlist/gift registry links for variant products
					jQuery(thisProduct.containerId + ' .addtowishlist, ' + thisProduct.containerId + ' .addtoregistry').removeClass('unselectable');
				});

				// listen for availability reload events
				jQuery(thisProduct).bind('ReloadAvailability', {}, function(e) {

					// update the availability message
					var variant = e.target.selectedVar;

					setAvailabilityMsg(createAvMessage(e.target, (variant === null ? model.avStatusQuantity : variant.avStatusQuantity)));
					jQuery(e.target).trigger('AddtoCartEnabled');

				});

				// Add to wishlist, Add to gift registry click handler
				jQuery(thisProduct.containerId + ' .addtowishlist a, ' + thisProduct.containerId + ' .addtoregistry a').click(function(e) {
					// append the currently selectied options to the url

					// create a local copy of the selected options
					var selectedOptions = jQuery.extend({}, {}, thisProduct.selectedOptions);

					if (model.master || model.variant) {

						if (thisProduct.selectedVar !== null) {
							selectedOptions.pid = thisProduct.selectedVar.id;
						} else {
							return false; // do not allow master product to be added to gift registry/wishlist
						}

					} else {
						selectedOptions.pid = thisProduct.pid;
					}

					var tempUrl = this.href;

					if (!(tempUrl.indexOf('?') > 0)) {
						tempUrl = tempUrl + '?';
					}

					// serialize the name/value into url query string and append it to the url, make request
					window.location = tempUrl + jQuery.param(selectedOptions);
					return false;

				});

			};

			// binds product reviews click handlers
			// read review link opens reviews tab
			var getRatingSection = function(containerId) {

				jQuery(containerId + ' #pdpReadReview').click(function(e) {
					jQuery(containerId + ' #pdpTabsDiv').tabs('select', 'pdpReviewsTab');
				});

				jQuery(containerId + ' #pdpWriteReview').click(function(e) {

				});
			}

			// based on availability status, creates a message
			// param val - the stock value to compare i.e. qty entered by user
			var createAvMessage = function(thisProduct, val) {

				var avStatus = thisProduct.getAvStatus(); // availability status
				var avMessage = app.resources[avStatus];
				var ats = thisProduct.getATS(); // get available to sell qty
				var avLevels	= thisProduct.getAvLevels();

				// get ats levels per-status
				var inStockLevel = avLevels[app.constants.AVAIL_STATUS_IN_STOCK];
				var backOrderLevel = avLevels[app.constants.AVAIL_STATUS_BACKORDER];
				var preOrderLevel = avLevels[app.constants.AVAIL_STATUS_PREORDER];
				var notAvailLevel = avLevels[app.constants.AVAIL_STATUS_NOT_AVAILABLE];

				if (avStatus === app.constants.AVAIL_STATUS_BACKORDER || avStatus === app.constants.AVAIL_STATUS_PREORDER) {
					if (val > ats && ats > 0) {
						avMessage = avMessage + '<br/>' + jQuery.format(app.resources['QTY_'+ avStatus], ats);
					}

					// display backorder/preorder availability
					avMessage = avMessage + '<br/>' + getInStockDateMsg(thisProduct);

				} else if (val > inStockLevel && avStatus !== app.constants.AVAIL_STATUS_NOT_AVAILABLE) {

					avMessage = '';
					if (inStockLevel > 0) {
						avMessage = avMessage + '<br/>' + jQuery.format(app.resources['QTY_'+ app.constants.AVAIL_STATUS_IN_STOCK], inStockLevel);
					}

					if (backOrderLevel > 0) {
						avMessage = avMessage + '<br/>' + jQuery.format(app.resources['QTY_'+ app.constants.AVAIL_STATUS_BACKORDER], backOrderLevel);
						// uncomment the following line to display availability message with back order information
						// avMessage = avMessage + getInStockDateMsg(thisProduct);
					}

					if (preOrderLevel > 0) {
						avMessage = avMessage + '<br/>' + jQuery.format(app.resources['QTY_'+ app.constants.AVAIL_STATUS_PREORDER], preOrderLevel);
						// uncomment the following line to display availability message with back order information
						// avMessage = avMessage + getInStockDateMsg(thisProduct);
					}
				}

				return avMessage;
			}

			// helper function that returns the in-stock date
			var getInStockDateMsg = function(product) {
				var msg = '';

				if (product.getInStockDate() && product.getInStockDate() !== 'null') {
					msg = jQuery.format(app.resources['IN_STOCK_DATE'], (new Date(product.getInStockDate())).toDateString());
				}

				return msg;
			}

			// helper function to set availability message
			var setAvailabilityMsg = function(msg) {
				jQuery(myContainerId + ' .availability:last .value').html(msg);
			}

			/**
			 * Private. Computes price of a given product instance based on the selected options.
			 *
			 * @param thisProduct - the product instance.
			 * @return price of the product to 2 decimal points.
			 */
			var computePrice = function(thisProduct) {

				var price = thisProduct.selectedVar != null ? thisProduct.selectedVar.pricing.sale : model.pricing.sale;
				// calculate price based on the selected options prices
				jQuery.each(thisProduct.selectedPrice, function() {
					price = (new Number(price) + new Number(this)).toFixed(2);
				});

				return price;
			}

			// bind click handlers for prev/next buttons on pdp from search
			var getNavLinks = function() {

				// NOTE:  WE COMMENT THIS OUT BECAUSE POWER REVIEWS RENDERING LIBRARY DOES NOT
				// WORK IN SOME BROWSERS WHEN A PRODUCT DETAIL PAGE IS PARTIALLY RELOADED USING AJAX.
				// IF WE DO NOT BIND EVENTS, THEN THE PREV/NEXT ANCHORS JUST WORK AS STANDARD
				// HYPERLINKS AND POWERREVIEWS WORKS FINE.

				// bind events
				//jQuery(".productnavigation a").click(function(e) {
				//	app.getProduct({url: this.href, source: "search"});
				//	return false;
				//});
			}

			// size chart link click binding
			var getSizeChart = function() {
				jQuery('.attributecontentlink').click(function(e) {
					// add size chart dialog container div if its not added yet
					// only added once
					if (jQuery('#sizeChartDialog').length == 0) {
						jQuery('<div/>').attr('id', 'sizeChartDialog').appendTo(document.body);
					}

					app.createDialog({id: 'sizeChartDialog', options: {
				    	height: 530,
				    	width: 800,
				    	title: app.resources['SIZECHART_TITLE']
					}});

					jQuery('#sizeChartDialog').html('');
					jQuery('#sizeChartDialog').dialog('open');

					// make the server call to load the size chart html
					jQuery('#sizeChartDialog').load(this.href);

					return false;
				});
			}

			// build the tooltip string for non selected variations
			var getNonSelectedTooltip = function(nonSelectedVars) {

				var tooltipStr = '';
				var nsLen = nonSelectedVars.length;

				if (nsLen == 1 || nsLen == 2) {
					tooltipStr = nonSelectedVars.join(' & ');
				} else {
					for (var i = 0; i < nsLen; i++) {

						if (i == nsLen - 2) {
							tooltipStr += nonSelectedVars[i] + ' & ' + nonSelectedVars[i + 1];
							break;

						} else {
							tooltipStr += nonSelectedVars[i] + ', ';
						}
					}
				}

				return tooltipStr;
			}

			// Product instance
			return {
				pid: model.ID,
				pName: model.name,
				pricing: model.pricing,
				selectedFromCategory: model.selectedFromCategory,
				selectedFromCategoryName: model.selectedFromCategoryName,
				variant: model.variant,
				master: model.master,
				bundled: model.bundled,
				isOutfit: model.isOutfit,
				isOutfitItem: model.isOutfitItem,
				selectedVarAttribs: {}, // object containing variation attributes values as name value e.g. {color: "blue", size: "3", width: ""}
				selectedVar: null, // currently selected variant
				selectedOptions: {}, // holds currently selected options object {optionName, selected val}
				selectedPrice: {}, // holds prices for selected options as {warranty: ""}
				containerId: null, // holds the html container id of this product
				subProducts: [], // array to keep sub products instances
				mainImage: null, // represents product's large ("_FS") image
				mainImageHuge: null, // represents product's large ("_FS") image
				zoomImage: null, // represents product's zoom ("_ZM1") image

				/**
				 * Returns a "variant object" (object from model.variations.variants;
				 * refer to template product/components/variationsjson.isml) for the
				 * given product id of a (selected) variant.
				 */
				getVariant: function(variantID) {

					var result = null;

					jQuery.each(model.variations.variants, function() {

						var thisVariant = this;

						// mind we check a "variant js object" (not a product js object)
						// thus "id" (lower case)
						if (thisVariant.id === variantID) {
							result = thisVariant;
							// break out of each loop
							return false;
						}
					});

					return result;
				},

				/**
				 * Returns a "Product" instance (object from this.subProducts which is
				 * part of an outfit). The given product id can refer to a "simple" product
				 * (non-variation), a variation master or a (selected) variant.
				 * For the last case (pid refers to variant) a "Product" instance
				 * representing the variant's master is returned!
				 */
				getProductFromSubProducts: function(pid) {
					var result = null;
					var thisProduct = this;

					jQuery.each(thisProduct.subProducts, function() {
						var thisSubProduct = this;

						if (thisSubProduct.ID === pid) {
							// "thisSubProduct" isn't a master and "pid"
							// refers NOT to a variant
							// OR
							// both are variation masters
							result = thisSubProduct;
							// break out of each loop
							return false;

						} else if (thisSubProduct.master) {

							// "thisSubProduct" is a master --> check whether
							// "pid" refers to a variant of this master
							var variant = thisSubProduct.getVariant(pid);

							if (variant !== null) {
								result = thisSubProduct;
								// break out of each loop
								return false;
							}
						}
					});

					return result;
				},

				trackAddToCartRequest: function(pliOptions) {
					// this function expects the definition of a function named
					// "performProductAdd2CartTracking" - refer to bottom of template
					// product.product.isml
					if (typeof performProductAdd2CartTracking !== 'function') {
						return;
					}

					var thisProduct = this;

					// single product to be added?
					if (pliOptions.childPids === undefined) {

						// yes --> check whether its from an outfit page or
						// from a regular product details page
						var p = thisProduct.isOutfit ? thisProduct.getProductFromSubProducts(pliOptions.pid) : thisProduct;

						if (p !== null)	{
							var pricing = null;
							var name = p.pName;

							if (!p.master)	{
								pricing = p.pricing;
							} else {
								var variant = p.getVariant(pliOptions.pid);
								if (variant !== null) {
									pricing = variant.pricing;
								}
							}

							if (pricing !== null) {
								performProductAdd2CartTracking(pliOptions.pid,
										name,
										thisProduct.selectedFromCategory,
										thisProduct.selectedFromCategoryName,
										pricing.standard,
										pricing.sale,
										pliOptions.Quantity);
							}
						}

					} else {

						// no --> we are at an outfit page
						var pidArray = pliOptions.childPids.split(',');
						var qtyArray = pliOptions.Quantity.split(',');
						var i = 0;

						jQuery.each(pidArray, function() {

							var selectedPId = this;
							var p = thisProduct.getProductFromSubProducts(selectedPId);
							var qty = qtyArray[i];

							if (p !== null) {

								var pricing = null;
								var name = p.pName;

								if (!p.master) {
									pricing = p.pricing;
								} else {
									var variant = p.getVariant(selectedPId);
									if (variant !== null) {
										pricing = variant.pricing;
									}
								}

								if (pricing !== null) {
									performProductAdd2CartTracking(selectedPId,
											name,
											thisProduct.selectedFromCategory,
											thisProduct.selectedFromCategoryName,
											pricing.standard,
											pricing.sale,
											qty);
								}
							}

							i = i + 1;
						});
					}
				},

				/**
				 * Enable Add to Cart Button.
				 */
				enableA2CButton: function() {

					var imgObj = jQuery(this.containerId + ' .addtocartbutton:first'),
						cover = imgObj.siblings('.addtocart-disabled-cover');
					
					imgObj.removeAttr('disabled').removeClass('disabled');
					imgObj.parent().removeClass('disabled');
					cover.hide();
				},

				enableAllA2CButtons: function() {
					if (jQuery(this.containerId).length > 0) {

						this.enableA2CButton();

						jQuery.each(this.subProducts, function() {
							this.enableA2CButton();
						});
					}
				},

				/**
				 * Disable Add to Cart Button.
				 */
				disableA2CButton: function() {
					var imgObj = jQuery(this.containerId + ' .addtocartbutton:last'),
						cover = imgObj.siblings('.addtocart-disabled-cover');
					
					imgObj.attr('disabled', 'true').addClass('disabled');
					imgObj.parent().addClass('disabled');
					cover.show();
				},

				disableAllA2CButtons: function() {
					if (jQuery(this.containerId).length > 0) {
						this.disableA2CButton();
						jQuery.each(this.subProducts, function() {
							this.disableA2CButton();
						});
					}
				},

				// determine if this product is part of a bundle/product set VIEW
				isSubProduct: function() {
					return (model.productSetProduct || model.isOutfitItem) && app.ProductCache.subProducts.length > 0;
				},

				// show the selected variation attribute value next to the attribute label e.g. Color: Beige
				showSelectedVarAttrVal: function(varId, val) {
					jQuery(this.containerId + ' .variationattributes div:not(.clear)').each(function() {
						var id = jQuery(this).data('data');

						if (varId === id) {
							jQuery(this).find('span.selectedvarval').html(val);
						}
					});
				},

				// selects review tab
				readReviews: function() {
					jQuery(this.containerId + ' #pdpTabsDiv').tabs('select', 'pdpReviewsTab');
				},

				// shows product images and thumbnails
				// @param selectedVal - currently selected variation attr val
				// @param vals - total available variation attr values
				showImages: function(selectedVal, vals) {

					var that = this;
					vals = vals || {};

					// show swatch related images for the current variation value
					jQuery.each(vals, function() {
						var imgCounter = -1;
						var thisVal = this;

						if (this.val === selectedVal && this.images) {
							if (this.images.small.length > 0) {
								jQuery(that.containerId + ' .productthumbnails:first').html('');
								/* TAL: SiteGenesis code replaced
								jQuery(that.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src", thisVal.images.large[0].url).attr("alt", thisVal.images.large[0].alt).attr("title", thisVal.images.large[0].title));
								*/
								if (that.mainImage !== null && that.zoomImage !== null) {
									that.mainImage.src = thisVal.images.large[0].url;
									that.mainImageHuge.src = thisVal.images.largeHuge[0].url;

									if (!isQuickView) {
										that.zoomImage.src = (thisVal.images.zoom[0] != undefined && thisVal.images.zoom[0] != null) ? thisVal.images.zoom[0].url : '';
										that.mainImage.src = thisVal.images.largeHuge[0].url;
									}
								}
							}

							var noOfImages = 0;
							if (!that.isSubProduct())	{
								// make sure to show number of images based on the smallest of large or small as these have to have 1-1 correspondence.
								noOfImages = this.images.large.length >= this.images.small.length ? this.images.small.length : this.images.large.length;
							} else {
								noOfImages = this.images.small.length;
							}

							// show thumbnails only if more than 1 or if this is a subproduct (bundled/subproduct)
							if (this.images.small.length > 1 || that.isSubProduct()) {
								jQuery.each(this.images.small, function() {
									imgCounter++;
									var imageInd = imgCounter;
									if (imgCounter > noOfImages - 1) {
										return;
									}
									var thumbnailImgObj = jQuery('<img/>').attr('src', this.url).attr('alt', this.alt).attr('title', this.title);
									/* Huge edit to make zoom image avail  */
									var zoomimageurl = (thisVal.images.zoom[imageInd] != undefined && thisVal.images.zoom[imageInd] != null) ? thisVal.images.zoom[imageInd].url : '';
									$(thumbnailImgObj).attr('zoom-url', zoomimageurl);
									//humbnailImgObj.attr('zoom-url',  zoomImage.src);

									if (!that.isSubProduct() && !isLookbook)
									{
										thumbnailImgObj.click(function(e)
										{
											/* HUGE edit: adding a "currently selected" border to thumbnails  */
											jQuery(that.containerId + ' .productthumbnails:first').find('.productthumbnail-wrap').removeClass('selected');
											jQuery(this).parent().addClass('selected');

											/* TAL: SiteGenesis code replaced
											jQuery(that.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src", thisVal.images.large[imageInd].url).attr("alt", thisVal.images.large[imageInd].alt).attr("title", thisVal.images.large[imageInd].title));
											*/
											if (that.mainImage != null && that.zoomImage != null)
											{
												that.mainImage.src = thisVal.images.large[imageInd].url;
												that.mainImageHuge.src = thisVal.images.largeHuge[imageInd].url;
												if (!isQuickView)
												{
													that.zoomImage.src = (thisVal.images.zoom[imageInd] != undefined && thisVal.images.zoom[imageInd] != null) ? thisVal.images.zoom[imageInd].url : '';

												}
											}
										});
									}
									if (isLookbook)
									{
										thumbnailImgObj.click(function(e)
										{
											/* HUGE edit: adding a "currently selected" border to thumbnails  */
											jQuery(that.containerId + ' .productthumbnails:first').find('.productthumbnail-wrap').removeClass('selected');
											jQuery(this).parent().addClass('selected');

											/* TAL: SiteGenesis code replaced
											jQuery(that.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src", thisVal.images.large[imageInd].url).attr("alt", thisVal.images.large[imageInd].alt).attr("title", thisVal.images.large[imageInd].title));
											*/
											if (that.mainImage != null && that.zoomImage != null)
											{
												$('#lbImg').attr('src', thisVal.images.large[imageInd].url);

											}
										});
									}


									jQuery(that.containerId + ' .productthumbnails:first').append(thumbnailImgObj);
									/* HUGE edit: adding wrap to thumbnailImgs to allow for border on selected items */
									jQuery(thumbnailImgObj).wrap('<div class="productthumbnail-wrap" />');
								});
								jQuery(that.containerId + ' .productthumbnails:first .productthumbnail-wrap:first').addClass('selected');
							}
						}
					});
				},

				/**
				* Event handler when a variation attribute is selected/deselected.
				*/
				varAttrSelected: function(e) {
					// update the selected value node
					this.showSelectedVarAttrVal(e.data.id, e.data.val || '');
					if (e.data.id['id'] == undefined) {
						this.selectedVarAttribs[e.data.id] = e.data.val;
					} else {
						this.selectedVarAttribs[e.data.id['id']] = e.data.val;
					}

					// if this is a deselection and user landed on a variant page then reset its variant flag
					// as now user has deselected an attribute thus making it essentially a master product view
					if (e.data.val == null) {
						this.variant = false;
						// remove price beside Add2Cart Button
						this.showUpdatedPrice(null);
					}

					// store this ref
					var that = this;

					// trigger update event which will update every other variation attribute i.e. enable/disable etc.

					// first reset the contents of each attribute display
					// when we have got the varriations data
					if (!isLoadingVar) {
						// find variants which match the current selection
						var selectedVarAttrVariants = e.data.val != null ? this.findVariations({id: e.data.id, val: e.data.val}) : null;
						var selectedVarAttrs = jQuery.extend({}, {}, this.selectedVarAttribs);
						var validVariants = null;
						var unselectedVarAttrs = new Array();

						// for each selected variation attribute find valid variants
						for (var selectedVar in selectedVarAttrs) {
							if (selectedVarAttrs[selectedVar]) {
								validVariants = this.findVariations({id: selectedVar, val: selectedVarAttrs[selectedVar]}, validVariants);
							}
							else {
								unselectedVarAttrs.push(selectedVar);
							}
						}
						// update each variation attribute display
						jQuery.each(model.variations.attributes, function() {
							if ((this.id != e.data.id || e.data.val == null) && selectedVarAttrs[this.id] == null) {
								that.varAttrDisplayHandler(this.id, validVariants);
							}
							else if (this.id != e.data.id && selectedVarAttrs[this.id] != null) {
								that.varAttrDisplayHandler(this.id, selectedVarAttrVariants);
							}
							else {
								// show swatch related images for the current value
								that.showImages(e.data.val, this.vals);
							}
						});

						// based on the currently selected variation attribute values, try to find a matching variant
						this.selectedVar = this.findVariation(this.selectedVarAttribs);
					}

					// lets fire refresh view event to enable/disable variations attrs
					this.refreshView();
				},

				/**
				* go thru all variations attr and disable which are not available
				*/
				resetVariations: function() {
					if (isLoadingVar) {
						return; // we don't have the complete data yet
					}
					var that = this;

					jQuery(this.containerId + ' .variationattributes .swatches').each(function() {
						var dataa = jQuery(this).data('data'); // data is id set via app.hiddenData api
						jQuery(this).find('a.swatchanchor').each(function() {
							// find A variation with this val
							if (that.isVariation({id: dataa, val: this.innerHTML})) {
								// found at least 1 so keep it enabled
								jQuery(this).parent().removeClass('unselectable');
							}
							else {
								jQuery(this).parent().addClass('unselectable');
								jQuery(this).parent().removeClass('selected');
							}
						});
					});
				},

				/**
				* given a variation attribute id and valid variants, it would adjust the ui i.e. enable/disable
				* appropriate attribute values.
				*
				* @param attrId - String, id of the variation attribute.
				* @param validVariants - Array of json objects of valid variants for the given attribute id.
				* */
				varAttrDisplayHandler: function(attrId, validVariants) {
					var that = this; // preserve this instance
					// loop thru all non-dropdown ui elements i.e. swatches e.g. color, width, length etc.
					jQuery(this.containerId + ' .variationattributes .swatches').each(function() {
						var swatchId = jQuery(this).data('data');  // data is id set via app.hiddenData api
						if (swatchId === attrId) {

							jQuery(this).find('a.swatchanchor').each(function() {

								var parentLi = jQuery(this).parent();

								// find A variation with this val
								var filteredVariants = that.findVariations({id: attrId, val: this.innerHTML}, validVariants);
								if (filteredVariants.length > 0) {
									// found at least 1 so keep it enabled
									parentLi.removeClass('unselectable');
								}
								else {
									// no variant found with this value combination so disable it
									parentLi.addClass('unselectable');

									if (parentLi.hasClass('selected')) {
										// remove the currently selected value if the value is not selectable
										that.showSelectedVarAttrVal(attrId, '');
										that.selectedVarAttribs[attrId] = null;
									}
									// remove current selection
									parentLi.removeClass('selected');
								}
							});
						}
					});

					// loop thru all the non-swatches(drop down) attributes
					jQuery(this.containerId + ' .variationattributes .variantdropdown select').each(function() {
						var vaId = jQuery(this).data('data').id;  // data is id set via app.hiddenData api
						if (vaId === attrId) {
							var len = this.options.length;

							jQuery.each(this.options, function() {

								if (len > 1 && this.index == 0) {
									return; // very first option when the length is greater than 1 is 'Select ...' message so skip it
								}

								// find A variation with this val
								var filteredVariants = that.findVariations({id: attrId, val: this.value}, validVariants);

								if (filteredVariants.length > 0) {
									// found at least 1 so keep it enabled
									this.disabled = false;
								}
								else {
									// no variant found with this value combination so disable it
									this.disabled = true;

									if (this.selected) {
										// remove the currently selected value if the value is not selectable
										that.showSelectedVarAttrVal(attrId, '');
										that.selectedVarAttribs[attrId] = null;
									}
									// remove current selection
									this.selected = false;
								}
							});
						}
					});

				},

				/**
				 * refresh the UI i.e. availability, price, A2C button and variation attributes display
				 */
				refreshView: function() {
					var thisProduct = this;

					if (!isLoadingVar && this.selectedVar == null) {
						// if we have loaded the variations data then lets if the user has already selected some values
						// find a matching variation
						this.selectedVar = this.findVariation(this.selectedVarAttribs);
					}

					if (!isLoadingVar && this.selectedVar != null) {
						// update availability
						setAvailabilityMsg(createAvMessage(thisProduct, 1));
						// update price
						this.showUpdatedPrice(computePrice(thisProduct), this.selectedVar.pricing.standard);

						if (!(!this.selectedVar.inStock && this.selectedVar.avStatus === app.constants.AVAIL_STATUS_NOT_AVAILABLE) && (this.getPrice() > 0 || this.isPromoPrice())) {
							// enable add to cart button
							this.enableA2CButton();
							jQuery(this).trigger('AddtoCartEnabled');
						}
						else {
							this.disableA2CButton();
							jQuery(this).trigger('AddtoCartDisabled');
						}
					}
					else {
						if (isLoadingVar) {
						// update availability
							setAvailabilityMsg(app.showProgress('productloader'));
						}
						else {
							setAvailabilityMsg(app.resources['NON_SELECTED']);
						}
						// disable add to cart button
						this.disableA2CButton();
						jQuery(this).trigger('AddtoCartDisabled');
					}

					var nonSelectedVars = [];

					var validVariants = null;

					for (var selectedVar in this.selectedVarAttribs) {
						if (this.selectedVarAttribs[selectedVar]) {
							validVariants = this.findVariations({id: selectedVar, val: this.selectedVarAttribs[selectedVar]}, validVariants);
						}
					}

					// update selected var attr vals and refresh their display
					jQuery.each(model.variations.attributes, function() {
						thisProduct.showSelectedVarAttrVal(this.id, thisProduct.selectedVarAttribs[this.id]);

						if (!thisProduct.selectedVarAttribs[this.id] || thisProduct.selectedVarAttribs[this.id] == '') {
							nonSelectedVars.push(this.name);

							thisProduct.varAttrDisplayHandler(this.id, validVariants);
						}
					});

					// process non-selected vals and show updated tooltip for A2C button as a reminder
					// and show it along availability
					var tooltipStr = getNonSelectedTooltip(nonSelectedVars);

					if (nonSelectedVars.length > 0) {
						var availMsg = jQuery.format(app.resources['MISSING_VAL'], tooltipStr);
						setAvailabilityMsg(availMsg);
						jQuery(thisProduct.containerId + ' .addtocartbutton:last').attr('title', availMsg);
					}
				},

				/**
				 * renders pricing div given a sale price and optional standard price
				 * To format the price display, it goes to server via an ajax call.
				 *
				 * @param sale - sale price.
				 * @param standard - standard price.
				 */
				showUpdatedPrice: function(sale, standard) {

					if (sale === undefined || sale === null) {
						jQuery(this.containerId + ' #pdpATCDiv'+ this.containerId.substring(1) + ' .price').html('&nbsp;');

					} else {

						var standardPrice = Number(standard || 0);
						var salePrice = Number(sale || 0);
						var priceHtml = '';
						var formattedPrices = {'salePrice': salePrice, 'standardPrice': standardPrice};

						// send server request to format the money baed on site settings using Money api
						app.ajax.getJson({
							url: app.URLs.formatMoney,
							cache: true,
							async: false,
							data: {'salePrice': salePrice, 'standardPrice': standardPrice},
							callback: function(data) {
								formattedPrices = data;
							}
						});

						// in case it is a promotional price then we do not care if it is 0
						var salePriceStr = formattedPrices.salePrice;
						if (standardPrice > 0 && standardPrice > salePrice && !model.omitSaleCallout) {
							salePriceStr += ' SALE';
						}
	
						priceHtml = (salePrice > 0 || this.isPromoPrice()) ? '<div class="salesprice">' + salePriceStr + '</div>' : ' <div class="salesprice"></div>';

						if (standardPrice > 0 && standardPrice > salePrice && !model.omitSaleCallout) {
							// show both prices
							priceHtml = '<div class="standardprice">' + formattedPrices.standardPrice + ' </div>' + priceHtml;
						}

						//jQuery(this.containerId+" .productinfo .price:first").html(priceHtml);
						// containerId contains #, get rid of it before finding the right price div
						jQuery(this.containerId + ' #pdpATCDiv'+ this.containerId.substring(1) + ' .price').html(priceHtml);
					}
				},

				/**
				 * returns a computed price for this product
				 */
				getPrice: function() {
					return computePrice(this);
				},

				/**
				 * Determines if the selected product has promotional price.
				 * 			 *
				 * @return boolean true if promotional price is present otherwise false.
				 */
				isPromoPrice: function() {
					return (this.selectedVar != null ? this.selectedVar.pricing.isPromoPrice : model.pricing.isPromoPrice);
				},

				/**
				 * receives 2 or 1 variation attribute values and tries to figure out if there is a variant with these values.
				 *
				 * @param val1 - variation attribute value.
				 * @param val2 - variation attribute value.
				 * @return boolean - true if a variant exists otherwise false.
				 */
				isVariation: function(val1, val2) {
					var variant = null;

					for (var i = 0; i < model.variations.variants.length; i++) {
						variant = model.variations.variants[i];
						if (variant.attributes[val1.id] == val1.val && (val2 == undefined || variant.attributes[val2.id] == val2.val)) {
							return true;
						}
					}
					/*
					 * apparently there is no way to break out of jQuery.each half way :(
					jQuery.each(model.variations.variants, function(){
						if (!found && this.attributes[val1.id] == val1.val && this.attributes[val2.id] == val2.val) {
							found = true;
							return;
						}
					});*/
					return false;
				},

				/*
				* find 0 or more variants matching the given attribs object(s) and in stock
				* return null or found variants
				*/
				findVariations: function(attr, variants) {
					var foundVariants = new Array();
					variants = variants || model.variations.variants;

					var variant = null;
					for (var i = 0; i < variants.length; i++) {
						variant = variants[i];
						if ((variant.attributes[attr.id] === attr.val) &&
								(variant.inStock || (variant.avStatus === app.constants.AVAIL_STATUS_BACKORDER && variant.ATS > 0) || (variant.avStatus === app.constants.AVAIL_STATUS_PREORDER && variant.ATS > 0))) {
							foundVariants.push(variant);
						}
					}

					return foundVariants;
				},

				/*
				* find a variant with the given attribs object
				* return null or found variation json
				*/
				findVariation: function(attrs) {
					if (!this.checkAttrs(attrs)) {
						return null;
					}

					var attrToStr = function(attrObj) {
						var result = '';
						jQuery.each(model.variations.attributes, function() {
							result += attrObj[this.id];
						});
						return result;
					}

					var attrsStr = attrToStr(attrs);

					for (var i = 0; i < model.variations.variants.length; i++) {
						variant = model.variations.variants[i];
						if (attrToStr(variant.attributes) === attrsStr) {
							return variant;
						}
					}
					return null;
				},

				// find a variation with the give id otherwise empty object
				findVariationById: function(id) {

					for (var i = 0; i < model.variations.variants.length; i++) {
					// IE7 does NOT support this!!!
					//for each(var variation in model.variations.variants) {
						var variation = model.variations.variants[i];
						if (variation && variation.id === id) {
							return variation;
						}
					}

					return {};
				},

				/*
				* see if the specified attrs object has all the variation attributes present in it
				* return true/false
				*/
				checkAttrs: function(attrs) {
					for (var i = 0; i < model.variations.attributes.length; i++) {
						if (attrs[model.variations.attributes[i].id] == null) {
							return false;
						}
					}
					return true;
				},

				// given an id, return attr definition from model.variations.attributes
				getAttrByID: function(id) {
					for (var i = 0; i < model.variations.attributes.length; i++) {
						if (model.variations.attributes[i].id === id) {
							return model.variations.attributes[i];
						}
					}
					return {};
				},

				// returns current availability status e.g. in_stock, preorder etc.
				getAvStatus: function() {
					if ((this.variant || this.master) && this.selectedVar !== null) {
						return this.selectedVar.avStatus;
					} else {
						return model.avStatus;
					}
				},

				// return available to sell qty
				getATS: function() {
					if ((this.variant || this.master) && this.selectedVar !== null) {
						return this.selectedVar.ATS;
					} else {
						return model.ATS;
					}
				},

				// return the quantity that was used to calculate availability
				getAvailabilityQty: function() {
					if ((this.variant || this.master) && this.selectedVar !== null) {
						return this.selectedVar.avStatusQuantity;
					} else {
						return model.avStatusQuantity;
					}
				},

				// return the availability levels
				getAvLevels: function() {
					if ((this.variant || this.master) && this.selectedVar !== null) {
						return this.selectedVar.avLevels;
					} else {
						return model.avLevels;
					}
				},

				// returns in stock date
				getInStockDate: function() {
					if ((this.variant || this.master) && this.selectedVar !== null) {
						return this.selectedVar.inStockDate;
					} else {
						return model.inStockDate;
					}
				},

				// determine if A2C button is enabled or disabled
				// true if enabled, false otherwise
				isA2CEnabled: function() {
					if (this.variant || this.master) {

						if (this.selectedVar != null) {
							return (this.selectedVar.avStatus === app.constants.AVAIL_STATUS_IN_STOCK ||
									this.selectedVar.avStatus === app.constants.AVAIL_STATUS_BACKORDER ||
									this.selectedVar.avStatus === app.constants.AVAIL_STATUS_PREORDER);

						} else {
							return false;
						}

					} else {

						return (model.avStatus === app.constants.AVAIL_STATUS_IN_STOCK ||
								model.avStatus === app.constants.AVAIL_STATUS_BACKORDER ||
								model.avStatus === app.constants.AVAIL_STATUS_PREORDER);
					}
				},

				/**
				 * work horse of the product detail page getting everything tied together i.e. all the dynamic stuff
				 * and one time initialization. called only ONCE
				 * bind all the product display events and handlers
				 * load variants in case this is a variation product
				 * bind subproducts a2c button enable event handler
				 *
				 * @param options.cotainerId - id of the containing div.
				 * @param options.source - source of this product show request, mainly quickview.
				 */
				show: function(options) {

					// preserve this instance
					var thisProduct = this;

					if (!thisProduct.isSubProduct()) {
						// TAL: image handling added
						thisProduct.mainImage = new Image();
						thisProduct.mainImageHuge = new Image();
						thisProduct.zoomImage = new Image();

						if (!isLookbook) {
							if (!isQuickView) {

								thisProduct.mainImageHuge.onload = function() {
									// jQuery(thisProduct.containerId + " .productimage").css('background', 'url("' + thisProduct.mainImageHuge.src + '") no-repeat scroll 0px 0px transparent');
									jQuery(thisProduct.containerId + ' .product-zoom-trigger').attr('href', thisProduct.zoomImage.src);
								}

							} else {
								thisProduct.mainImage.onload = function() {
									//jQuery(thisProduct.containerId + " .productimage").css('background', 'url("' + thisProduct.mainImage.src + '") no-repeat scroll 0px 0px transparent');
								}
							}
						}

						/*
						thisProduct.zoomImage.onload = function () {
							jQuery("#zoomContainer").css('background', 'url("' + thisProduct.zoomImage.src + '") no-repeat scroll 0px 0px transparent');
						};

						jQuery('#piContainer').mouseenter(function (e) {
							if ( thisProduct.zoomImage.src == '' || !thisProduct.zoomImage.complete || isQuickView )
								return;
							jQuery('#piOverlay').show();
							jQuery('#piZoomBox').show();
							jQuery('#zoomContainer').show();
						});

						jQuery('#piContainer').mousemove(function (e) {
							if ( thisProduct.zoomImage.src == '' || !thisProduct.zoomImage.complete || isQuickView )
								return;
							var window = jQuery(window);
							var zoomBox = jQuery('#piZoomBox');
							var container = $(this);
							var offset = container.offset();
							var x = Math.floor(e.clientX - offset.left - (zoomBox.width() / 2) - 1 + window.scrollLeft());
							x = Math.max(x, 0);
							x = Math.min(x, container.width() - zoomBox.outerWidth());
							var y = Math.floor(e.clientY - offset.top - (zoomBox.height() / 2) - 1 + window.scrollTop());
							y = Math.max(y, 0);
							y = Math.min(y, container.height() - zoomBox.outerHeight());

							zoomBox.css({left: (x + "px"), top: (y + "px")});
							zoomBox.css('background-position', (-1 * x) + "px " + (-1 * y) + "px");

							// zoom img background-position: -1 * x * ZM1img.width / FSimg.width
							var zoomContainer = jQuery('#zoomContainer');
							zoomContainer.css('background-position', (-1 * x * thisProduct.zoomImage.width / thisProduct.mainImage.width) + "px " + (-1 * y * thisProduct.zoomImage.width / thisProduct.mainImage.width) + "px");

						});

						jQuery('#piContainer').mouseleave(function (e) {
							jQuery('#piOverlay').hide();
							jQuery('#piZoomBox').hide();
							jQuery('#zoomContainer').hide();
						});
						*/
					}

					// bind VariationsLoaded which gets fired when the variation data is received from the server
					// and we need to refresh the ui
					jQuery(this).bind('VariationsLoaded', {}, function(e, source) {

						// enable/disable unavailable values
						// and set the currently selected values
						// reset the currently selected variation attributes i.e. reset the ui
						thisProduct.resetVariations();

						// create the default availability message based on ATS count
						// from the variants
						var atsCount = getATS(model.variations.variants);

						if (atsCount === 0) {
							setAvailabilityMsg(app.resources[app.constants.AVAIL_STATUS_NOT_AVAILABLE]);
						}

						// Grab the currently selected values and update the UI
						// first swatch variation attributes
						jQuery(thisProduct.containerId + ' .variationattributes .swatches').each(function() {
							var thisSwatch = jQuery(this),
								pdpVarId = thisSwatch.data('data'); // data is id which is set via app.hiddenData onload

							// grab the currently selected variation attribute val
							thisSwatch.find('.selected a').each(function() {
								thisProduct.varAttrSelected({
									data: {
										id: pdpVarId,
										val: this.innerHTML
									}
								});
							});
						});

						// non-swatch variation attributes
						jQuery(thisProduct.containerId + ' .variationattributes .variantdropdown select').each(function() {

							if (this.selectedIndex >= 0 && this.options[this.selectedIndex].value !== '') {
								// grab the currently selected val by firing update ui api
								// when dealing with a select element, data returns an object so we must ask for id
								thisProduct.varAttrSelected({
									data: {
										id: jQuery(this).data('data').id,
										val: this.options[this.selectedIndex].value
									}
								});
							}
						});
					});

					this.containerId = '#' + options.containerId;

					myContainerId = this.containerId;

					// bind click handlers for prev/next links
					getNavLinks();

					// size chart click binding
					getSizeChart();

					// variation attributes handling in case it is a master or a variant product
					if (model.master || model.variant) {
						loadVariants(this); // make a server call to load the variants, this is due to the performance reasons
						// meanwhile display the available variation attributes

						// loop thru all the non-swatches attributes and bind events etc.
						jQuery(thisProduct.containerId + ' .variationattributes .variantdropdown select').each(function() {

							// default ui i.e. drop down
							jQuery(this).data('data', {id: jQuery(this).data('data'), val: ''}).change(function(e) {

								// if there is only 1 value to be selected then return i.e. no deselection available
								if (this.selectedIndex === 0 && this.options.length === 1) {
									return;
								}

								e.data = jQuery(this).data('data'); // data is id
								// this.selectedIndex == 0, it is deselection
								e.data.val = (this.selectedIndex === 0) ? null : this.options[this.selectedIndex].value;

								if (this.selectedIndex === 0) {
									// deselection
									// clear the current selection
									thisProduct.resetVariations();
								}

								thisProduct.varAttrSelected(e);
							});
						});

						if (thisProduct.selectedVarAttribs['color']) {
							// show color related images for the current value
							thisProduct.showImages(thisProduct.selectedVarAttribs['color'], thisProduct.getAttrByID('color').vals);
						} else {
							// show images and bind hover event handlers for small/thumbnails to toggle large image
							thisProduct.showImages('', [{val: '', images: model.images}]);
						}
					} else {
						// show images and bind hover event handlers for small/thumbnails to toggle large image
						thisProduct.showImages('', [{val: '', images: model.images}]);
					}

					// bind product options event(s)
					getOptionsDiv(this);

					if (!model.productSet && !model.isOutfit) {
						// quantity box
						getQtyBox(this);
					}

					// Add to cart button click binding
					getAddToCartBtn(this);

					// intial display of A2C button
					// if the price is 0 or not available, its disabled
					// if not in stock, its disabled
					// isPromoPrice would be true in case if a product has a promotional price which could make product's price 0
					if (!(this.getPrice() > 0 || this.isPromoPrice()) ||
						model.master || model.variant || model.productSet || model.isOutfit || model.bundle ||
						(!model.inStock && model.avStatus === app.constants.AVAIL_STATUS_NOT_AVAILABLE && !model.productSet)) {
						this.disableA2CButton();
					}

					// For outfits, enable or disable the add-to-cart button.
					// The button should be disabled if the add-to-cart buttons of all subproducts are disabled, enabled otherwise.

					var updateA2CBarBySubProducts = function() {
						var enableAddToCart = false,
							subProducts = thisProduct.subProducts,
							price = new Number(),
							i;

						for (i = 0; i < subProducts.length; i = i + 1) {
							var subproductQuantity = subProducts[i].selectedOptions['Quantity'];
							var enableSubProductAddToCart = false;

							if (subProducts[i].variant || subProducts[i].master) {
								enableSubProductAddToCart = (subProducts[i].selectedVar != null && subproductQuantity != undefined && subproductQuantity > 0);
							} else {
								enableSubProductAddToCart = (subproductQuantity != undefined && subproductQuantity > 0);
							}

							enableAddToCart = enableAddToCart || enableSubProductAddToCart;

							if (enableSubProductAddToCart) {
								if (subProducts[i].selectedVar != null) {
									subProducts[i].selectedOptions.pid = subProducts[i].selectedVar.pid;
								} else {
									subProducts[i].selectedOptions.pid = subProducts[i].pid;
								}

								// Multiply the subproduct quantity-one price by the entered quantity.
								// Important note:  This value will be incorrect if subproduct uses
								// tiered pricing !!!!!
								price += new Number(subproductQuantity * subProducts[i].getPrice());
							}
						}

						if (enableAddToCart) {
							thisProduct.enableA2CButton();
							thisProduct.showUpdatedPrice(price);
						} else {
							thisProduct.disableA2CButton();
							thisProduct.showUpdatedPrice(null);
						}
					}

					if (model.productSet || model.isOutfit) {
						updateA2CBarBySubProducts();
					}

					// bind AddtoCartDisabled event for each subproduct (outfit or product set)
					jQuery.each(thisProduct.subProducts, function() {
						jQuery(this).bind('AddtoCartDisabled', {}, updateA2CBarBySubProducts);
					});

					// bind AddtoCartEnabled event for each subproduct (outfit or product set)
					jQuery.each(thisProduct.subProducts, function() {
						jQuery(this).bind('AddtoCartEnabled', {}, updateA2CBarBySubProducts);
					});

					// wish list, add to gift
					getMiscLinks(this);

					// recommendations carosel
					loadRecommendations(this.containerId);

					// product tabs
					getTabs(this.containerId);
				},

				toString: function() {
					return this.model;
				}
			};
		} // Product defintion end
	} else {
		// dw namespace has not been defined yet i.e. app object is unavailable
		alert('app is undefined!');
	}
})(app);
