var isQuickView;
var isProductPage = false;
var aBtestisenabled = false;
(function(app){
	if (app) {
		
		app.checkUrl = function (path, success, error){
			
			var path = app.stripAkamai(path);
			
	        jQuery.ajax({
	        	url     : path,
	        	cache   : false,
	        	
                success: success,
			    error: function(xhr, status){
			    	if(xhr.status == 200 && status == "parsererror"){
			    		if(success != undefined) success();
			    	}else{
			    		if(error != undefined) error();
			    	}
	        	    
	        	}
			});
		};
		app.loadzoom = function(){
			 
				var options = {
		            zoomType: 'standard',
		            lens:true,
		            preloadImages: false,
		            alwaysOn:false,
		            zoomWidth: 380,
		            zoomHeight: 613,
		            xOffset:18,
		            yOffset:0,
		            position:'right',
		            preloadText:'Loading Image',
		            title:false,
		            showEffect: 'fadeIn'
		            	
		            
				};
				
			$('.zoomImages').jqzoom(options);	
		},
		app.showZoomImage = function(path, divID, success, error){
			var qDiv = jQuery("#" + divID);
			
			app.checkUrl(path, function(){
		        	if(qDiv.find(":first").data("swfPath") != path){
		        		
						qDiv.html(jQuery('#flasherrortemplate').html());
						
						var cuttedPath = path.substring(0,path.lastIndexOf("/") + 1);
						var so = new SWFObject(path, "product-image", "350", "430", "9.0.115.0", "#FFFFFF");
						so.addParam("quality", "high");
						so.addParam("scale", "noscale");
						so.addParam("menu", "false");
						so.addParam("salign", "lt");
						so.addParam("base", cuttedPath);
						so.addParam("wmode", "transparent");
						so.addParam("allowScriptAccess", "always");
						so.write(divID);
						
						qDiv.find(':first').data("swfPath", path);
					}
	        	
	        		if(success != undefined) succees();
			}, error);
		}
		
		// add Product namespace to app namespace
		app.Product = function(response) {
			// product private data

			// product json data
			var model 			= response.data;
			
			// div cotainer id
			var myContainerId	= "";

			// boolean flag to track the variants data request, reset in loadVariants() when the variants data is loaded
			var isLoadingVar	= false;

			// helper function to load variants data from the server
			// once the data is retrieved, it fires VariationsLoaded event so that UI can be refreshed appropriately
			var loadVariants	= function(thisProduct) {
				isLoadingVar = true;
				// build the url and load variants data				
				app.ajax.getJson({
					url		: app.URLs.getVariants,
					data	: {"pid": thisProduct.pid, "format": "json"},
					callback: function(data){

						if (!data || !data.variations || !data.variations.variants) {
							return;
						}
						model.variations.variants = data.variations.variants;
						isLoadingVar = false; // we have loaded the variants
						jQuery(thisProduct).trigger("VariationsLoaded");
					}
				});
			}
			


			// based on availability status, creates a message
			// param val - the stock value to compare i.e. qty entered by user
			var createAvMessage = function(thisProduct, val) {
				var avStatus 	= thisProduct.getAvStatus(); // availability status
				var avMessage 	= app.resources[avStatus];
				var ats 		= thisProduct.getATS(); // get available to sell qty
				var avLevels	= thisProduct.getAvLevels();
				
				//start:bisn:1
				if(app.constants.bisn_pdp_enabled && Boolean(thisProduct.selectedVar)){
					if(Boolean(thisProduct.selectedVar.id)){
					//lets make it sure its hidden if selection changes
					jQuery('.availability #bisn-form').hide();
					jQuery('.bisn-response').hide();
					//jQuery('.outofstocklink').hide();
					}
				}
				//end:bisn:1
				
				// get ats levels per-status
				var inStockLevel = avLevels[app.constants.AVAIL_STATUS_IN_STOCK];
				var backOrderLevel = avLevels[app.constants.AVAIL_STATUS_BACKORDER];
				var preOrderLevel = avLevels[app.constants.AVAIL_STATUS_PREORDER];
				var notAvailLevel = avLevels[app.constants.AVAIL_STATUS_NOT_AVAILABLE];
				if (avStatus == app.constants.AVAIL_STATUS_NOT_AVAILABLE || thisProduct.findSelectedVariants().length == 0) {
					avMessage = "<span class='bold notavailable' >" + app.resources[app.constants.AVAIL_STATUS_NOT_AVAILABLE] + "</span><br/> " +app.resources["NONAVAILABLE_TIP"];		

					//start:bisn:2
					if(app.constants.bisn_pdp_enabled && Boolean(thisProduct.selectedVar)){
					  if(Boolean(thisProduct.selectedVar.id)){
						bisnpid = thisProduct.selectedVar.id;
						//refresh bisn fields
						jQuery('#bisn-form input[name=emailpid]').val('');
						jQuery('#bisn-form input[name=bisnpid]').val(bisnpid);
						jQuery('.availability #bisn-form').show();
						//jQuery('.outofstocklink').hide();
						}
					}
					//end:bisn:2
					
				} else if (avStatus === app.constants.AVAIL_STATUS_BACKORDER ||
						avStatus === app.constants.AVAIL_STATUS_PREORDER) {
//					if (val > ats && ats > 0)
//					{
//						avMessage = avMessage + "<br/>" + jQuery.format(app.resources["QTY_"+avStatus], ats);
//					}
					// display backorder/preorder availability
					avMessage = "<span class='red'>" + avMessage + " " + getInStockDateMsg(thisProduct) + "</span>";
				} else if (val > inStockLevel && avStatus !== app.constants.AVAIL_STATUS_NOT_AVAILABLE) {
					if (backOrderLevel > 0) {
						avMessage = "<span class='boldred'>" + jQuery.format(app.resources["QTY_"+app.constants.AVAIL_STATUS_BACKORDER], inStockLevel);
						// uncomment the following line to display availability message with back order information
						// avMessage = avMessage + getInStockDateMsg(thisProduct);
					}else if (preOrderLevel > 0) {
						avMessage =  "<span class='boldred'>" + jQuery.format(app.resources["QTY_"+app.constants.AVAIL_STATUS_PREORDER], inStockLevel);
						// uncomment the following line to display availability message with back order information
						// avMessage = avMessage + getInStockDateMsg(thisProduct);
					}else{
						avMessage = "<span class='red'>" + jQuery.format(app.resources["QTY_"+app.constants.AVAIL_STATUS_IN_STOCK], inStockLevel) + "</span>";
					} 
				} else{
					
					avMessage = "<span class='normal'>" + avMessage + "</span>"; 
				}
				
				return avMessage;
			}
			
			var updateAvailabilityUI = function(thisProduct, quantity){
				var nonSelectedVars = thisProduct.findNonSelectedAttributes();
				var selectedVariants = thisProduct.findSelectedVariants();
				
				if(selectedVariants.length > 0 && nonSelectedVars.length != 0)
				{
					var tooltipStr = getNonSelectedTooltip(nonSelectedVars);
					var missingMsg = jQuery.format(app.resources["MISSING_VAL"], tooltipStr);
					setAvailabilityMsg("<span class='normal'>" + missingMsg + "</span>");
				}
				else
				{					
					var variant = thisProduct.selectedVar;
					setAvailabilityMsg(createAvMessage(thisProduct, (variant == null ? model.avStatusQuantity : variant.avStatusQuantity)));
					jQuery(thisProduct.containerId+" .addtocartbutton:last").attr("title", app.resources["ADD_TO_CART"]);
				}
				
				if (   thisProduct.getAvStatus() != app.constants.AVAIL_STATUS_NOT_AVAILABLE 
					&& selectedVariants.length != 0){
					
					jQuery(myContainerId+" .availability:last .findretailbutton").hide();
					
					jQuery(myContainerId+" .variationattribute.size").show();
					jQuery(myContainerId+" .availablefieldset").show();

					var maxAvailable = thisProduct.getAvLevels().maxAvailable;
					if (maxAvailable){
						var quantityOptions = jQuery(myContainerId+" .quantityinput option");
						for (var i=0; i<quantityOptions.length; i++){
							var value = jQuery(quantityOptions[i]).val();
							if (value <= maxAvailable){
								jQuery(quantityOptions[i]).removeAttr('disabled');
							}else{
								jQuery(quantityOptions[i]).attr('disabled', 'disabled');
								if (jQuery(quantityOptions[i]).attr('selected')){
									jQuery(quantityOptions[i]).removeAttr('selected');
									jQuery(quantityOptions[maxAvailable-1]).attr('selected', 'selected')
								}
							}
							
						}
					}

				}else{
					jQuery(myContainerId+" .availability:last .findretailbutton").show();
					
					//jQuery(myContainerId+" .variationattribute.size").hide();
					jQuery(myContainerId+" .availablefieldset").hide();
				}
			}
			
			// helper function to reload availability data.
			// by default, availability data is based on a quantity of 1.
			// if a customer changes the quantity, use this method 
			// to reload the availability based on the new quantity.
			var reloadAvailability = function(thisProduct, quantity) {
				
				if (isLoadingVar) {
					// update availability
						setAvailabilityMsg(app.showProgress("productloader"));
				}
				
				if(quantity == undefined){
					quantity = getSelectedQuantity(thisProduct);
				}
				
				
				
				var nonSelectedVars = thisProduct.findNonSelectedAttributes();
				
				if(nonSelectedVars.length > 0)
				{
					updateAvailabilityUI(thisProduct, quantity);
					jQuery(thisProduct).trigger("AddtoCartEnabled");
				}
				else if(thisProduct.selectedVar)
				{
					updateAvailabilityUI(thisProduct, quantity);
				
					app.ajax.getJson({
						url		: app.URLs.getAvailability,
						data	: {"pid": thisProduct.selectedVar.id, "Quantity": quantity, "format": "json"},
						callback: function(data){
	
							if (!thisProduct.selectedVar || !data || !data.avLevels) {
								return;
							}
	
							thisProduct.selectedVar.avLevels = data.avLevels;
							thisProduct.selectedVar.avStatusQuantity = data.avStatusQuantity;
							
							updateAvailabilityUI(thisProduct, quantity);
							
							jQuery(thisProduct).trigger("AddtoCartEnabled");								
							jQuery(thisProduct).trigger("ReloadAvailability");
						}
					});
				} 
			}
			
			// returns the aggregate available to sell value 
			// from all variants
			var getATS = function(variants) { 
				
				var atsCount = 0;
				for (var i=0; i<variants.length; i++) {
					variant = variants[i];
					if (variant.ATS > 0) {
						atsCount = atsCount + variant.ATS;
					}
				}
				return atsCount;
			}


			// creates product recommendation carousel using jQuery jcarousel plugin
			// uses app.tooltip to create tooltips for each product in the carousel
			var loadRecommendations = function(containerId) {
				if (jQuery(containerId+" .maywerecommend ul.carousel li").length > 0) {
					jQuery(containerId+" .maywerecommend ul.carousel").jcarousel({
						scroll: 1,
						itemVisibleInCallback: app.captureCarouselRecommendations
					});
					// create tooltips event handler
//					app.tooltip({id: containerId+" .maywerecommend ul.carousel li", options: {
//							bodyHandler: function() {
//								return jQuery(this).children(".pdpTooltip").html();
//							}
//					}});
				}				
			}

			// helper function to bind product options drop downs event handlers
			// Intializes the product.selectedOptions object with the currently selected options
			// it also shows the computed/updated price
			var getOptionsDiv	= function(thisProduct) {

				if (model.isOption) {

					var pdpOpt = jQuery(thisProduct.containerId+" .product_options:last select");

					pdpOpt.change(function(e){
						var vals = this.options[this.selectedIndex].value.split("%?%"); // 0 = value, 1 = price
						thisProduct.selectedOptions[this.id] = vals[0];
						thisProduct.selectedPrice[this.id] = vals[1];
						thisProduct.showUpdatedPrice(computePrice(thisProduct), model.pricing.standard); 
					});
					
					// let us get the currently selected value and intilize the ui
					pdpOpt.each(function(i) {
						var vals = this.options[this.selectedIndex].value.split("%?%"); // 0 = value, 1 = price
						
						thisProduct.selectedOptions[this.id] = vals[0];
						thisProduct.selectedPrice[this.id] = vals[1];
						//removed to prevent price update to selected values original price when on sale -- Nick
						//thisProduct.showUpdatedPrice(computePrice(thisProduct), model.pricing.standard); 
					});
				}
			}

			// binds A2C button click handler
			var getAddToCartBtn = function(thisProduct) {
				
				var addToCartBtn = jQuery(thisProduct.containerId+" .addtocartbutton:last").click(function(e) {
					
					//validation for gift cards
					if(thisProduct.pid == app.Product.virtgiftcard || thisProduct.pid == app.Product.tradgiftcard) {
						var gcamount = jQuery('#giftcard-form div.formfield.giftcardamount input').val();
						var gc_yourname = jQuery('#giftcard-form div.formfield.yourName input').val();
						var gc_friendname = jQuery('#giftcard-form div.formfield.friendsName input').val();
						var gc_friendemail = jQuery('#giftcard-form div.formfield.friendsEmail input').val();
						
						var validated = true;
						if(thisProduct.pid == app.Product.virtgiftcard){
							var emailvalid = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
						
							if(!emailvalid.test(gc_friendemail)) {
								jQuery('#giftcard-form div.formfield.friendsEmail input').addClass("error");
								validated = false;
							}
							if(gc_yourname == '') {
								jQuery('#giftcard-form div.formfield.yourName input').addClass("error");
								validated = false;
							}
							if(gc_friendname == '') {
								jQuery('#giftcard-form div.formfield.friendsEmail input').addClass("error");
								validated = false;
							}
							if(!validated) {
								return false;
							}
						}
						var re = new RegExp(/^(\D*)(\d*)/);
						var matchres = gcamount.match(re);
						if(matchres == null) {
							jQuery('#giftcard-form div.formfield.giftcardamount input').addClass("error");
							return false;
						} else {
							if(matchres[2].length == 0) {
								jQuery('#giftcard-form div.formfield.giftcardamount input').addClass("error");
								return false;
								
							} else {
								if(matchres[2] < 5) {
									jQuery('#giftcard-form div.formfield.giftcardamount input').addClass("error");
									return false;
								} else {
									jQuery('#giftcard-form div.formfield.giftcardamount input').val(matchres[2])
								}
							}
						}
					}else{
						if(aBtestisenabled && !isQuickView){
							isProductPage = true;
							var colorAdded = jQuery('.color .selectedvarval').html();
							var nameAdded = jQuery('.maininfo .productname').html();
							var sizeAdded = jQuery('.size .swatchesdisplay .selected .swatchanchor').html();
							if(sizeAdded == 'HB' ){	
								var textOutput = jQuery.format(app.resources["ADDED_TO_CART"], nameAdded, colorAdded);
							}else if(sizeAdded == 'NA' || colorAdded.toLowerCase() ==  'care'){
								var textOutput = jQuery.format(app.resources["ADDED_TO_CART_1"], nameAdded);
							}else{
								var textOutput = jQuery.format(app.resources["ADDED_TO_CART_SIZE"], nameAdded, sizeAdded, colorAdded);
							}
							jQuery('.addedtocart').remove();
							jQuery('.addtocartbar').prepend('<div class="addedtocart">'+textOutput+'</div>');
							jQuery('#accountFooter .cartlabel small').html(parseInt(jQuery('#accountFooter .cartlabel small').html())+1)
							jQuery('#itemsInCart').fadeIn('slow', function(){});
						
							
							var t=setTimeout("jQuery('.addedtocart').fadeOut('slow');",5000);
						}
						
					}
					
					if (model.master || model.variant) {
						if (thisProduct.selectedVar == null) {
							return false;
						}
						
						// it is necessary to update the option id to be variant-specific
						jQuery(thisProduct.containerId+" .product_options:last select").each(function(){
							 var value = thisProduct.selectedOptions[this.id];
							 var newId = this.id.replace(thisProduct.pid, thisProduct.selectedVar.id);
							 thisProduct.selectedOptions[newId] = value; 
							 delete thisProduct.selectedOptions[this.id];
							});
													
						thisProduct.selectedOptions.pid = thisProduct.selectedVar.id;
						thisProduct.selectedOptions.masterPid = thisProduct.pid;
						
					}
					else {
						// check if we are adding a bundle/productset to the cart
						if (model.bundle || model.productSet) {							
							var subProducts = thisProduct.subProducts;
							var comma 		= ",";
							var tempQty 	= "";
							var subproduct 	= null;
							
							thisProduct.selectedOptions.childPids = "";
														
							if (model.productSet) {
								thisProduct.selectedOptions.Quantity = "";
							}
							
							// process each individual products in the set/bundle
							// and prepare product.selectedOptions for final submission
							for (var i = 0; i < subProducts.length; i++) {
								subproduct = subProducts[i];
								
								if (i == subProducts.length - 1) {
									comma = ""; // at the end of the list
								}
								
								// see if any of the sub products are variations, if so then get the selected variation id
								// from selectedVar property and make it a comma separated list
								if (subproduct.variant || subproduct.master) {									
									if (subproduct.selectedVar == null) {
										return false;
									}
									thisProduct.selectedOptions.childPids += subproduct.selectedVar.id+comma;
								}
								else {
									thisProduct.selectedOptions.childPids += subproduct.pid+comma;
								}
								
								var tempPid = subproduct.selectedOptions.pid;
								subproduct.selectedOptions.pid = null;
								// merge selected options of sub product with the main product
								thisProduct.selectedOptions = jQuery.extend({}, thisProduct.selectedOptions, subproduct.selectedOptions);
								subproduct.selectedOptions.pid = tempPid;
								
								// if it is a product set then sub products can have their separate qty
								if (model.productSet) {
									tempQty += subproduct.selectedOptions.Quantity+comma;
								}
							}
						}
						
						// if it is a product set then sub products can have their separate qty
						// tempQty is a comma separated list of qty for each product in the set
						if (model.productSet) {
							thisProduct.selectedOptions.Quantity = tempQty;
						}
						
						// make sure the pid which gets submitted is for the main product
						thisProduct.selectedOptions.pid = thisProduct.pid;
					}

					if (model.bundle) {
						thisProduct.selectedOptions.Quantity = 1; // hard coded qty=1 when we the product is a bundle
					}
					else if (!model.productSet) {
						// grab the user entered qty
						thisProduct.selectedOptions.Quantity = jQuery(thisProduct.containerId+" .quantityinput:last").val();
					}
					
					// if it is not a productset then make sure qty is specified greater than 0
					if (model.productSet || thisProduct.selectedOptions.Quantity > 0) {
						// disable a2c button
						addToCartBtn.attr("disabled", "true").addClass("disabled");
						
						// close the quick view when user clicks A2C.
						app.quickView.close();
						
						// find if there is a handler bound to AddToCart event e.g. cart -> edit details or wishlist -> edit details etc.
						// then fire it otherewise call app.minicart.add to add the selected product to the cart and show minicart
						var event = jQuery.Event("AddToCart");
						event.selectedOptions = thisProduct.selectedOptions;				
						(jQuery.event.global["AddToCart"] == undefined || jQuery.event.global["AddToCart"] == null) ? app.minicart.add( "", thisProduct.selectedOptions, function(){addToCartBtn.removeAttr("disabled").removeClass("disabled")} ) : jQuery(document).trigger(event);
					}
					return false;
				} );

				return addToCartBtn;
			}

			var getSelectedQuantity = function(thisProduct) {
				return parseInt(jQuery(thisProduct.containerId+" .quantityinput:last").val());
			}

			// bind qty box keyup handler
			// the handler grabs the value and updates 
			// product.selectedOption.Quantity
			// show the updated availabilty message in case the available qty is different than available etc.
			// trigger AddtoCartEnabled event
			var getQtyBox 		= function(thisProduct) {				
				
				jQuery(thisProduct.containerId+" .quantityinput:last").change(function(e){
					var val = null;
					try {
						val = getSelectedQuantity(thisProduct);
					} catch(e){val = null};

					if (val) {
						thisProduct.selectedOptions.Quantity = val;
												
						reloadAvailability(thisProduct);
						jQuery(thisProduct).trigger("AddtoCartEnabled");
					}
				});
				
				// grab the currently displayed value basically the initial displayed value
				thisProduct.selectedOptions.Quantity = jQuery(thisProduct.containerId+" .quantityinput:last").val();
				
				if (!isLoadingVar) {
					// show proper availability message
					reloadAvailability(thisProduct);
				}
			}

			// create product tabs i.e. description, Attributes, Reviews etc.
			// it depends on jQuery to create tab display.
			// also bind tab print button click handler
			var getTabs 		= function(containerId) {

				var tabsDiv = jQuery(containerId+" #pdpTabsDiv");
				tabsDiv.tabs();

				// tab print handler
				jQuery("a.printpage").click(function() {
					window.print();
					return false;
				});
			}

			// bind addtowishlist, giftregistry, send to friend click handlers
			// bind handlers to AddtoCartDisabled, AddtoCartEnabled events for disabling/enabling wishlist/gift registry links
			var getMiscLinks 	= function(thisProduct) {
			
				var disablelinks = function() {
					if ((model.master || model.variant) && thisProduct.selectedVar == null) {
						// disable wishlist/gift registry links for master products
						jQuery(thisProduct.containerId+" .addtowishlist, "+thisProduct.containerId+" .addtoregistry").addClass("unselectable");
					}
				}
				
				disablelinks(); // call it for initial display and then register it with AddtoCartDisabled event
				
				jQuery(thisProduct).bind("AddtoCartDisabled", {}, disablelinks);
				
				jQuery(thisProduct).bind("AddtoCartEnabled", {}, function(e, source){
					// enable wishlist/gift registry links for variant products
					jQuery(thisProduct.containerId+" .addtowishlist, "+thisProduct.containerId+" .addtoregistry").removeClass("unselectable");
				});

				
				// Add to wishlist, Add to gift registry click handler
				jQuery(thisProduct.containerId+" .addtowishlist a, "+thisProduct.containerId+" .addtoregistry a").click(function(e) {
					// append the currently selectied options to the url
					
					// create a local copy of the selected options
					var selectedOptions = jQuery.extend({}, {}, thisProduct.selectedOptions);
					
					if (model.master || model.variant) {
						if (thisProduct.selectedVar != null) {
							selectedOptions.pid = thisProduct.selectedVar.id;
						}
						else {
							return false; // do not allow master product to be added to gift registry/wishlist
						}
					}
					else {
						selectedOptions.pid = thisProduct.pid;
					}
					
					var tempUrl = this.href;
					
					if (!(tempUrl.indexOf("?") > 0)) {
						tempUrl = tempUrl + "?";
					}
					// serialize the name/value into url query string and append it to the url, make request
					window.location = tempUrl + jQuery.param(selectedOptions);
					return false;
				} );
				
				jQuery(thisProduct.containerId+" .sendtofriend").click(function(e) {					
					 // create a local copy of the selected options
                   var selectedOptions = jQuery.extend({}, {}, thisProduct.selectedOptions);
                   
                   if ((model.master || model.variant) && thisProduct.selectedVar != null) { 
                               selectedOptions.pid = thisProduct.selectedVar.id;
                   }
                   else {
                         selectedOptions.pid = thisProduct.pid;
                   }
                   var tempURL = app.URLs.sendToFriend + "?" + jQuery.param(selectedOptions);
                   app.dialog.open(tempURL, " ",{height:485, width:700});
                   return false;
				} );
				
				
				//start:bisn:3 - do not need if statement, trigger by submit
				jQuery(thisProduct.containerId+" #bisn-form").submit(function(e) {
					if(jQuery(this).validate().form()){	 
						var submitURL = app.URLs.backInStockNotification;
						
						var post = jQuery('#bisn-form').serialize();

						//omnitureTrack({events:"event13"});
						
						jQuery.ajax({
							type:'POST',
							url: submitURL,
							data: post,
							dataType: 'html',
							success: function(data){	
								jQuery('.availability #bisn-form').hide();
								jQuery('.bisn-response').show();
						   		jQuery('.bisn-response').empty().html(data);
						   		
							   },
							failure: function(data) {
							   	alert("${Resource.msg('global.serverconnection','locale',null)}");		
							}
						});
					}
			
                  return false;
				} );
				//end:bisn:3
				
			}
			
			// binds product reviews click handlers
			// read review link opens reviews tab
			var getRatingSection = function(containerId) {

				jQuery(containerId+" #pdpReadReview").click(function(e) {
					jQuery(containerId+" #pdpTabsDiv").tabs("select", "pdpReviewsTab");
				} );

				jQuery(containerId+" #pdpWriteReview").click(function(e) {
				} );
			}
			
			// helper function that returns the in-stock date
			var getInStockDateMsg = function(product) {
				var msg = "";
				if (product.getInStockDate() && product.getInStockDate() != "null") {
					bgdate = new Date(product.getInStockDate());
					if(app.constants.locales == "en_GB"){
						dateformattype = "dd/mm/yyyy";
						 
					}else{
						 
						dateformattype = "m/dd/yyyy";
						 
					}
					msg = jQuery.format(app.resources["IN_STOCK_DATE" + product.getAvStatus()], dateFormat(bgdate, dateformattype));
					
				}
				return msg;
			}

			// helper function to set availability message
			var setAvailabilityMsg = function(msg) {				
				jQuery(myContainerId+" .availability:last .value").html(msg);
			}

			/**
			 * Private. Computes price of a given product instance based on the selected options.
			 * 
			 * @param thisProduct - the product instance 
			 * @return price of the product to 2 decimal points.
			 */
			var computePrice = function(thisProduct) {

				if(isLoadingVar)
					return;
				
				var price;
				
				var variations;
					
				if(thisProduct.selectedVar != null){
					price = thisProduct.selectedVar.pricing.sale;
				}else{
					price = model.pricing.sale;
					
					//in case price NA find min price
					if(!model.productSet && !model.bundle &&  Number(price) == 0){
						if(typeof(model.variations) != 'undefined') {
							price = model.variations.variants[0].pricing.sale;
							for(var i = 0; i < model.variations.variants.length; i++){
								var variant = model.variations.variants[i];
								if(   price == 0
								   || (    variant.pricing.sale != 0
								        && variant.pricing.sale < price)){
									price = variant.pricing.sale;
								}
							}
						}
					}
				}
				
				// calculate price based on the selected options prices
				jQuery.each(thisProduct.selectedPrice, function(){
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
				jQuery(".attributecontentlink.size").click(function(e){
					// add size chart dialog container div if its not added yet
					// only added once
					if (jQuery("#sizeChartDialog").length == 0) {
						jQuery("<div/>").attr("id", "sizeChartDialog").appendTo(document.body);
					}
					
					var dialogTitle = jQuery(this).attr("_dialogtitle");
					if(!dialogTitle) dialogTitle = app.resources["SIZECHART_TITLE"];
					
					app.createDialog({id: 'sizeChartDialog', options: {
						width: 400,
						//height: 490,
						title: dialogTitle
					}});
					
					
					jQuery('#sizeChartDialog').dialog('open');
					
					// make the server call to load the size chart html
					jQuery("#sizeChartDialog")
						.load(this.href, function(){
							jQuery('#sizeChartDialog').height(jQuery('#sizeChartDialog .contentasset').height() + 20);
						});
					
					return false;
				});
			}
			
			var getShippingRates = function() {
				jQuery(".attributecontentlink.shipping").click(function(e){
					// add size chart dialog container div if its not added yet
					// only added once
					if (jQuery("#shippingRatesDialog").length == 0) {
						jQuery("<div/>").attr("id", "shippingRatesDialog").appendTo(document.body);
					}
					
					var dialogTitle = jQuery(this).attr("_dialogtitle");
					if(!dialogTitle) dialogTitle = app.resources["SHIPPINGRATES_TITLE"];
					
					app.createDialog({id: 'shippingRatesDialog', options: {
						width: 375,
						height: 290,
						title: dialogTitle
					}});
					
					jQuery('#shippingRatesDialog').dialog('open');
					
					// make the server call to load the size chart html
					jQuery("#shippingRatesDialog").load(this.href);
					
					return false;
				});
			}	
			
			// build the tooltip string for non selected variations
			var getNonSelectedTooltip = function(nonSelectedVars) {
				var tooltipStr = '';
				var nsLen = nonSelectedVars.length;
				if (nsLen == 1 || nsLen == 2) {					
					tooltipStr = nonSelectedVars.join(" & ");
				}
				else {
					for (var i=0; i < nsLen; i++) {
						if (i == nsLen - 2) {
							tooltipStr += nonSelectedVars[i] + " & " + nonSelectedVars[i+1];
							break;
						}
						else {
							tooltipStr += nonSelectedVars[i] + ", ";
						} 
					}
				}		
		
				return tooltipStr;
			}
						
						
			// Product instance
			return {
				pid					: model.ID,
				variant				: model.variant,
				master				: model.master,
				bundled				: model.bundled,
				selectedVarAttribs	: {}, // object containing variation attributes values as name value e.g. {color: "blue", size: "3", width: ""}				
				selectedVar			: null, // currently selected variant
				selectedOptions		: {}, // holds currently selected options object {optionName, selected val}
				selectedPrice		: {}, // holds prices for selected options as {warranty: ""}
				containerId			: null, // holds the html container id of this product
				subProducts			: [], // array to keep sub products instances 
				
				/**
				 * Enable Add to Cart Button and wishlist
				 */
				enableA2CButton: function() {
					jQuery(this.containerId+" .addtocartbutton:last").removeAttr("disabled").removeClass("disabled");
					jQuery(this.containerId+ " div.addtowishlist").removeClass("disabled");
					
					 
				},
				
				/**
				 * Disable Add to Cart Button and wishlist
				 */
				disableA2CButton: function() {
					jQuery(this.containerId+" .addtocartbutton:last").attr("disabled", "true").addClass("disabled");
					jQuery(this.containerId+ " div.addtowishlist").addClass("disabled");
					
					 
				},
				
				// determine if this product is part of a bundle/product set VIEW
				isSubProduct		: function() {
						 
					return (model.bundled || model.productSetProduct) && app.ProductCache.subProducts.length > 0;
				},

				// show the selected variation attribute value next to the attribute label e.g. Color: Beige
				showSelectedVarAttrVal: function(varId, val) {
					jQuery(this.containerId+" .variationattributes div:not(.clear)").each(function(){
						var id = jQuery(this).data("data");
						
						if (varId === id) {
							jQuery(this).find('span.selectedvarval').html(val);
						}
					});
				},
				
				// selects review tab
				readReviews: function() {
					jQuery(this.containerId+" #pdpTabsDiv").tabs("select", "pdpReviewsTab");
				},
				// determine if this product is part of a bundle/product set VIEW
				isBonusProduct		: function() {
					return this.bonusProduct;
				},
				
				// shows product images and thumbnails
				// @param selectedVal - currently selected variation attr val
				// @param vals - total available variation attr values
				showImages: function(selectedVal, vals)  {
					var that = this;
					vals = vals || {};
				
					// show swatch related images for the current variation value					
					jQuery.each(vals, function(){
						var imgCounter = -1;
						var thisVal = this;
						
						var renderSmallImages = function(containerSelector){
						 
							// make sure to show number of images based on the smallest of large or small as these have to have 1-1 correspondence.
							var noOfImages = thisVal.images.large.length >= thisVal.images.small.length ? thisVal.images.small.length : thisVal.images.large.length;
							
							// show thumbnails only if more than 1 or if this is a subproduct (bundled/subproduct)
							if ((thisVal.images.small.length > 1 || that.isSubProduct()) && !that.isBonusProduct()) {
								jQuery.each(thisVal.images.small, function(i){
									imgCounter++;
									var imageInd = imgCounter;
									if (imgCounter > noOfImages - 1) {
										return;
									}
									if(thisVal.images.small.length >= 6)jQuery('.productthumbnails').removeClass('numberofviews_7').removeClass('numberofviews_8').removeClass('numberofviews_9').addClass('numberofviews_'+thisVal.images.small.length);
								 
 									
									if(thisVal.images.zoom2.length > 0 && !that.isSubProduct()){
										//new zoom way
										jQuery(that.containerId+" .productthumbnails:last").append('<span class="span_'+imageInd+'"><img class="pos_'+imageInd+'" alt="'+this.alt+'" title="'+this.title+'" src="'+this.url+'"><span><span class="curlyuc">{</span>'+(imageInd+1)+'<span class="curlyuc">}</span></span></span>');
										//for UGG Collection
										 if(imageInd==0){jQuery('.span_'+imageInd).addClass('active');}
										jQuery('.span_'+imageInd).click(function(e){
											jQuery(that.containerId+" .productimage").html('<a class="zoomImages" href="'+ thisVal.images.zoom2[imageInd].url + '"><img src="'+ thisVal.images.large[imageInd].url + '" alt="'+thisVal.images.large[imageInd].alt+'" title="'+thisVal.images.large[imageInd].title+'"></a>');
											jQuery('.active').removeClass('active');
											jQuery(this).addClass('active');
											if(!isQuickView && !isiPad && !isiAndroid  ){
												app.loadzoom();
											}else{
												$('.zoomImages').click(function(){
													return false;
												})
											}
										});
									}else if ( that.isSubProduct()){
										
										jQuery(that.containerId+" .productthumbnails:last").append(jQuery("<img/>").attr("src", this.url).attr("alt", this.alt).attr("title", this.title));
										 
									}else{	
										//old no zoom
										
										jQuery(that.containerId+" .productthumbnails:last").append(jQuery("<img/>").attr("src", this.url).attr("alt", this.alt).attr("title", this.title).click(function(e){
											jQuery(that.containerId+" .productimage").html("").append(jQuery("<img/>").attr("src", thisVal.images.large[imageInd].url).attr("alt", thisVal.images.large[imageInd].alt).attr("title", thisVal.images.large[imageInd].title));
											
										}));
									}
								});
								
							}
						}
						
						var renderStaticImage = function(containerSelector){
						
							if (thisVal.images.small.length > 0) {
								jQuery(containerSelector+" .productthumbnails:last").html("");
								 
								if(typeof(thisVal.images.large[0])!='undefined'){
									 
									
									if(thisVal.images.zoom2.length > 0){
										jQuery(containerSelector+" .productimage").html("").append('<a class="zoomImages" href="'+thisVal.images.zoom2[0].url+'" ><img title="'+thisVal.images.large[0].title+'" alt="'+thisVal.images.large[0].alt+'" src="'+thisVal.images.large[0].url+'"/></a>');
										
										if(!isQuickView  && !isiPad  && !isiAndroid  ){
											app.loadzoom();
										}else{
											$('.zoomImages').click(function(){
												return false;
											})
										}
									}else{
										
										jQuery(containerSelector+" .productimage").html("").append(jQuery("<img/>").attr("src", thisVal.images.large[0].url).attr("alt", thisVal.images.large[0].alt).attr("title", thisVal.images.large[0].title));
									}
								}
							}
							
							renderSmallImages(containerSelector);
						}
						
						if (thisVal.val === selectedVal && thisVal.images) {
							jQuery(that.containerId+" .productthumbnails").html("");
							if(thisVal.images.zoom.length == 0){
								renderStaticImage(that.containerId);
							}else{
								 
								renderStaticImage('#flasherrortemplate');
								//app.showZoomImage(thisVal.images.zoom[0].url, "productImage", undefined, renderStaticImage);
								renderSmallImages(that.containerId);
							}
						} 
					});
					 
				},
				

				/**
				* Event handler when a variation attribute is selected/deselected.
				*/
				varAttrSelected: function(e) {
					// update the selected value node
					this.showSelectedVarAttrVal(e.data.id, e.data.val || "");

					this.selectedVarAttribs[e.data.id] = e.data.val;
					
					// if this is a deselection and user landed on a variant page then reset its variant flag 
					// as now user has deselected an attribute thus making it essentially a master product view
					if (e.data.val == null) { 
						this.variant = false;
					}
					
					// store this ref
					var that = this;

					// trigger update event which will update every other variation attribute i.e. enable/disable etc.

					// first reset the contents of each attribute display
					// when we have got the varriations data
					if (!isLoadingVar) {
						// find variants which match the current selection
						var selectedVarAttrVariants = e.data.val != null ? this.findVariations({id: e.data.id, val: e.data.val}): null;
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
						jQuery.each(model.variations.attributes, function () {
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

					if(e.data.id == 'color' && e.data.val != null){
						jQuery(".selectedcolor").html(e.data.val);						
					}
					
					reloadAvailability(this, getSelectedQuantity(this));
					
					// lets fire refresh view event to enable/disable variations attrs
					this.refreshView();
				},

				/**
				* go thru all variations attr and disable which are not available
				*/
				resetVariations: function() {
					if (isLoadingVar) {
						return ; // we don't have the complete data yet
					}
					var that = this;
					jQuery(this.containerId + " .variationattributes .swatches").each(function(){
						var dataa = jQuery(this).data("data"); // data is id set via app.hiddenData api
						jQuery(this).find("a.swatchanchor").each(function(){
							// find A variation with this val
							if (that.isVariation({id:dataa, val:this.innerHTML})) {
								// found at least 1 so keep it enabled
								jQuery(this).parent().removeClass("unselectable");
							}
							else {
								jQuery(this).parent().addClass("unselectable");
								jQuery(this).parent().removeClass("selected");
								//start:bisn:7
								if(app.constants.bisn_pdp_enabled){
									jQuery('.outofstocklink').show();
								}
								//end:bisn:7
							}
						});
					});
				},
				
				/**
				* given a variation attribute id and valid variants, it would adjust the ui i.e. enable/disable 
				* appropriate attribute values.
				* 
				* @param attrId - String, id of the variation attribute
				* @param validVariants - Array of json objects of valid variants for the given attribute id
				* */
				varAttrDisplayHandler: function (attrId, validVariants) {
					var that = this; // preserve this instance
					// loop thru all non-dropdown ui elements i.e. swatches e.g. color, width, length etc.
					jQuery(this.containerId + " .variationattributes .swatches").each(function(){
						var swatchId = jQuery(this).data("data");  // data is id set via app.hiddenData api
						if (swatchId === attrId) {
							
							jQuery(this).find("a.swatchanchor").each(function(i){
							
								var parentLi= jQuery(this).parent();
								
								// find A variation with this val
								var filteredVariants = that.findVariations({id:attrId, val:this.innerHTML}, validVariants);
								if (filteredVariants.length > 0 || attrId == "color") {
									// found at least 1 so keep it enabled
									parentLi.removeClass("unselectable");
								}
								else {
									// no variant found with this value combination so disable it
									parentLi.addClass("unselectable");
									//start:bisn:8 - hide until one of the products are out of stock
									if(app.constants.bisn_pdp_enabled){
										jQuery('.outofstocklink').show();
									}
									//end:bisn:8
									
									if (parentLi.hasClass("selected")) {
										// remove the currently selected value if the value is not selectable
										that.showSelectedVarAttrVal(attrId, "");
										//that.selectedVarAttribs[attrId] = null;
									}
									// remove current selection
									//if statement checks if there is only one size and keeps it selected
									if(jQuery(this).find("a.swatchanchor").length != 0 )parentLi.removeClass("selected");
								}
							});
						}
					});
					
					// loop thru all the non-swatches(drop down) attributes
					jQuery(this.containerId + " .variationattributes .variantdropdown select").each(function(){
						var vaId = jQuery(this).data("data").id;  // data is id set via app.hiddenData api
						if (vaId === attrId) {
							var len = this.options.length;
							
							jQuery.each(this.options, function(){
								
								if (len > 1 && this.index == 0) {
									return; // very first option when the length is greater than 1 is 'Select ...' message so skip it
								}
								
								// find A variation with this val
								var filteredVariants = that.findVariations({id:attrId, val:this.value}, validVariants);
								
								if (filteredVariants.length > 0) {
									// found at least 1 so keep it enabled
									this.disabled = false;
								}
								else {
									// no variant found with this value combination so disable it
									this.disabled = true;
									
									if (this.selected) {
										// remove the currently selected value if the value is not selectable
										that.showSelectedVarAttrVal(attrId, "");
										that.selectedVarAttribs[attrId] = null;
									}
									// remove current selection
									this.selected = false;
								}
							});
						}
					});
					
				},
				
				findNonSelectedAttributes : function(){
					if(model.bundle || model.productSet)
						return [];
					
					var nonSelectedVars = [];

					var thisProduct = this;
					
					// get the non-selected variations
					if(typeof(model.variations) != 'undefined') {
						jQuery.each(model.variations.attributes, function(){
							if (!thisProduct.selectedVarAttribs[this.id] || thisProduct.selectedVarAttribs[this.id] == "" ) {
								nonSelectedVars.push(this.name.toLowerCase());
							}
						});
					}
					
					return nonSelectedVars;
				},
				
				/**
				 * Returns set of selected variants.
				 * In case selected only one variation attribute(color or size) it returns all orderable varition for selected attribute.
				 * In case all attribute are selected it returns array with one selected item 
				 */
				findSelectedVariants : function(){
					var validVariants = [];
					
					for(var i = 0; i < model.variations.variants.length; i++){
						var selectedVar = model.variations.variants[i];
						if(this.isInStock(selectedVar)){
							validVariants.push(selectedVar);
						}
					}
					
					for (var selectedVar in this.selectedVarAttribs) {
						if (this.selectedVarAttribs[selectedVar]) {
							validVariants = this.findVariations({id: selectedVar, val: this.selectedVarAttribs[selectedVar]}, validVariants);
						}						
					}
					
					return validVariants;
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
						// update price
						this.showUpdatedPrice(computePrice(thisProduct), this.selectedVar != null ? this.selectedVar.pricing.standard : 0); 
					 

					
						if (!(!this.selectedVar.inStock && this.selectedVar.avStatus === app.constants.AVAIL_STATUS_NOT_AVAILABLE) && (this.getPrice() > 0 || this.isPromoPrice())) {
							// enable add to cart button
							this.enableA2CButton();
							jQuery(this).trigger("AddtoCartEnabled");
						}
						else {
							this.disableA2CButton();
							jQuery(this).trigger("AddtoCartDisabled");
						}
					}
					else {
						// disable add to cart button
						this.disableA2CButton();
						jQuery(this).trigger("AddtoCartDisabled");
					}
					
					var validVariants = thisProduct.findSelectedVariants(true);
						
					// update selected var attr vals and refresh their display
					jQuery.each(model.variations.attributes, function(){
						thisProduct.showSelectedVarAttrVal(this.id, thisProduct.selectedVarAttribs[this.id]);
						
						if (!thisProduct.selectedVarAttribs[this.id] || thisProduct.selectedVarAttribs[this.id] == "" ) {
							thisProduct.varAttrDisplayHandler(this.id, validVariants);
						}
					});
					
					reloadAvailability(thisProduct);
				},

				/**
				 * renders pricing div given a sale price and optional standard price
				 * To format the price display, it goes to server via an ajax call.
				 * 
				 * @param sale - sale price 
				 * @param standard - standard price
				 */
				showUpdatedPrice: function(sale, standard) {
					var standardPrice 	= Number(standard || 0);					
					var salePrice 		= Number(sale || 0);
					var priceHtml 		= "";
					var formattedPrices = {"salePrice": salePrice, "standardPrice": standardPrice};
					
					// send server request to format the money baed on site settings using Money api
					app.ajax.getJson({
						url		: app.URLs.formatMoney,
						cache	: true,
						async	: false,
						data	: {"salePrice": salePrice, "standardPrice": standardPrice},
						callback: function(data){
							formattedPrices = data;
						}
					});
					
					// in case it is a promotional price then we do not care if it is 0
					priceHtml = (salePrice > 0 || this.isPromoPrice()) ? '<div class="salesprice">' + formattedPrices.salePrice.replace('.00','') + '</div>' : ' <div class="salesprice">N/A</div>';
					
					if (standardPrice > 0 && standardPrice > salePrice) {
						// show both prices
						priceHtml = '<div class="standardprice">' + formattedPrices.standardPrice.replace('.00','') + ' </div>' + priceHtml;						
					}					
					
					jQuery(this.containerId+" .productinfo .price:first").html(priceHtml);
					// containerId contains #, get rid of it before finding the right price div
					jQuery(this.containerId+" #pdpATCDiv"+this.containerId.substring(1)+" .price").html(priceHtml);
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
				 * @return boolean true if promotional price is present otherwise false
				 */
				isPromoPrice: function() {
					return (this.selectedVar != null ? this.selectedVar.pricing.isPromoPrice : model.pricing.isPromoPrice);
				},
				
				
				/**
				 * receives 2 or 1 variation attribute values and tries to figure out if there is a variant with these values.
				 * 
				 * @param val1 - variation attribute value
				 * @param val2 - variation attribute value
				 * @return boolean - true if a variant exists otherwise false
				 */
				isVariation: function(val1, val2) {
					var variant = null;

					for (var i=0; i<model.variations.variants.length; i++) {
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
				
				isInStock: function(variant){
					return      variant.inStock 
					        || (   variant.avStatus === app.constants.AVAIL_STATUS_BACKORDER && variant.ATS > 0) 
					        || (variant.avStatus === app.constants.AVAIL_STATUS_PREORDER && variant.ATS > 0);
				},
				
				/*
				* find 0 or more variants matching the given attribs object(s) and in stock
				* return null or found variants
				*/
				findVariations: function(attr, variants) {
					var foundVariants = new Array();
					variants = variants || model.variations.variants;
					
					var variant = null;
					for (var i=0; i<variants.length; i++) {
						variant = variants[i];
						if (   (variant.attributes[attr.id] === attr.val) 
						    && this.isInStock(variant)) {
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
						var result = "";
						jQuery.each(model.variations.attributes, function(){
							result += attrObj[this.id];
						});
						return result;
						
					}

					var attrsStr = attrToStr(attrs);

					for (var i=0; i<model.variations.variants.length; i++) {
						variant = model.variations.variants[i];
						if (attrToStr(variant.attributes) === attrsStr) {
							return variant;
						}
					}
					return null;
				},
				
				// find a variation with the give id otherwise empty object
				findVariationById: function(id) {

					for (var i=0; i<model.variations.variants.length; i++) {
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
					for (var i=0; i<model.variations.attributes.length; i++) {
						if (attrs[model.variations.attributes[i].id] == null) {
							return false;
						}
					}
					return true;
				},
				
				// given an id, return attr definition from model.variations.attributes
				getAttrByID: function(id) {
					for (var i=0; i<model.variations.attributes.length; i++) {
						if (model.variations.attributes[i].id === id) {
							return model.variations.attributes[i];
						}
					}
					return {};
				},
				
				// returns current availability status e.g. in_stock, preorder etc.
				getAvStatus: function() {
					if ((this.variant || this.master) && this.selectedVar != null) {
						return this.selectedVar.avStatus;
					}
					else {
						return model.avStatus;
					}
				},
				
				// return available to sell qty
				getATS: function() {
					if ((this.variant || this.master) && this.selectedVar != null) {
						return this.selectedVar.ATS;
					}
					else {
						return model.ATS;
					}
				},
				
				// return the quantity that was used to calculate availability
				getAvailabilityQty: function() {
					if ((this.variant || this.master) && this.selectedVar != null) {
						return this.selectedVar.avStatusQuantity;
					}
					else {
						return model.avStatusQuantity;
					}
				},
				
				// return the availability levels
				getAvLevels: function() {
					if ((this.variant || this.master) && this.selectedVar != null) {
						return this.selectedVar.avLevels;
					}
					else {
						return model.avLevels;
					}					
				},
				
				// returns in stock date 
				getInStockDate: function() {
					if ((this.variant || this.master) && this.selectedVar != null) {
						return this.selectedVar.inStockDate;
					}
					else {
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
						}
						else {
							return false;
						}
					}
					else {

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
				 * @param options.cotainerId - id of the containing div
				 * @param options.source - source of this product show request, mainly quickview
				 */
				show: function(options) {
					// preserve this instance
					var thisProduct = this;

					// bind VariationsLoaded which gets fired when the variation data is received from the server
					// and we need to refresh the ui
					jQuery(this).bind("VariationsLoaded", {}, function(e, source){												
						// enable/disable unavailable values
						// and set the currently selected values 
						// reset the currently selected variation attributes i.e. reset the ui
						thisProduct.resetVariations();
						
						reloadAvailability(thisProduct);
						
						// Grab the currently selected values and update the UI
						// first swatch variation attributes
						jQuery(thisProduct.containerId + " .variationattributes .swatches").each(function(){
							var thisSwatch 	= jQuery(this),
								pdpVarId 	= thisSwatch.data("data"); // data is id which is set via app.hiddenData onload
							
							// grab the currently selected variation attribute val																
							thisSwatch.find(".selected a").each(function(){
								thisProduct.varAttrSelected({data: {id: pdpVarId, val: this.innerHTML}});
							});
						});
						// non-swatch variation attributes
						jQuery(thisProduct.containerId + " .variationattributes .variantdropdown select").each(function(){							
															
							if (this.selectedIndex >= 0 && this.options[this.selectedIndex].value != "") {
								// grab the currently selected val by firing update ui api
								// when dealing with a select element, data returns an object so we must ask for id
								thisProduct.varAttrSelected({data: {id: jQuery(this).data("data").id, val: this.options[this.selectedIndex].value}});
							}
						});
					});

					this.containerId 	= "#"+options.containerId;					
					isQuickView = false;
					 
					if (options.source && (options.source == "quickview" || options.source == "cart")) {
						isQuickView = true;
					}
					
					myContainerId = this.containerId;
					
					// bind click handlers for prev/next links
					getNavLinks();
					
					// size chart click binding
					getSizeChart();
					getShippingRates();

					jQuery(thisProduct.containerId + " .pr-snippet-read-reviews a").click(function(){
						jQuery(thisProduct.containerId + " .reviewAnchor").click();
						jQuery('html, body').animate( { scrollTop: jQuery('.productdetailcolumn').height()+200 }, 'slow' );
						return false;
						 
					});
					
					jQuery(thisProduct.containerId + " .productthumbnails img").live("click", function(){
						omnitureTrack({events:"event35"});
					});

					// variation attributes handling in case it is a master or a variant product
					if (model.master || model.variant) {
						 
						loadVariants(this); // make a server call to load the variants, this is due to the performance reasons
						// meanwhile display the available variation attributes
						
						// loop thru all the swatches and bind events etc.
						jQuery(thisProduct.containerId + " .variationattributes .swatches").each(function(){
							var thisSwatch 	= jQuery(this);
							var pdpVarId 	= thisSwatch.data("data"); // data is id which is set via app.hiddenData onload
							var attrDef 	= thisProduct.getAttrByID(pdpVarId);
							
							if (!attrDef) {
								return;
							}
							
							// click handler for swatches links
							var varEventHandler = function(e){									
								var thisObj = jQuery(this);
								
								e.data = {id: pdpVarId, val: this.innerHTML};

								//start:bisn:5
								//if (thisObj.parent().hasClass("unselectable")) {
								if (thisObj.parent().hasClass("unselectable") && app.constants.bisn_pdp_enabled == false) {
								//end:bisn:5
									return false;
								}
								else if (thisObj.parent().hasClass("selected")) {
									// deselection
									return false;
									e.data = {id: pdpVarId, val: null};
									thisObj.parent().removeClass("selected");
									// clear the current selection
									thisProduct.resetVariations();
									thisProduct.varAttrSelected(e);
								}
								else {
									// selection
									e.data = {id: pdpVarId, val: this.innerHTML};
									// remove the current selection										
									thisSwatch.find(".selected").removeClass("selected");										
									thisObj.parent().addClass("selected");
									thisProduct.varAttrSelected(e);
								}
								
								
								
								if(pdpVarId == "color"){
									omnitureTrack({events:"event36"});
								}
								
								return false;
							}
							
							// all swtach anchors
							var varJqryObjs = thisSwatch.find("a.swatchanchor");
							
							// if its a color attr then render its swatches and images
							if (pdpVarId === "color") {
								var colorAttrDef = thisProduct.getAttrByID('color');
								
								varJqryObjs.each(function(){
								
									// given a variation attr value, find its swatch image url
									var findSwatch = function(val) {
										for (var i=0; i<colorAttrDef.vals.length; i++){
											//this is to get the string comparison right
											var colorval = colorAttrDef.vals[i].val.replace('&acirc;','â');
											if (colorval === val) {													
												return colorAttrDef.vals[i].images.swatch;
											}
										}
										return ""; // no swatch image found
									}
									
									var swatchUrl = (findSwatch(this.innerHTML)).url; // find swatch url
									
									if (swatchUrl && swatchUrl != "") {
										jQuery(this).css("color", "transparent").css("background", "url(" + swatchUrl + ")");
										//this is an attempt to change it from a bg image
										//var colorname = jQuery(this).html();
										//jQuery(this).css("color", "transparent").html('<span>'+colorname+''</span><img src="' + swatchUrl + '"/>');
									}
									else {
										jQuery(this).css("color", "transparent"); // no swatch image found
									}
								});
								
								// swatches click, hover and mouseleave event handlers
								varJqryObjs.data("data", {id: pdpVarId}).click(varEventHandler);
								
								/*.hover(function(e){
									thisProduct.showSelectedVarAttrVal("color", this.innerHTML);										
									thisProduct.showImages(this.innerHTML, colorAttrDef.vals)
								}).mouseleave(function(e) {
									if (thisProduct.selectedVarAttribs["color"]) {
										thisProduct.showImages(thisProduct.selectedVarAttribs["color"], colorAttrDef.vals)
									}
									else {
										thisProduct.showImages("", [{val: "", images: model.images}]);
									}
									
									thisProduct.showSelectedVarAttrVal("color", thisProduct.selectedVarAttribs["color"] || "");
								});*/
							}
							else {								
								// not a color swatch, we only have click handler for this type of variation attribute e.g. width, length etc.
								varJqryObjs.data("data", {id: pdpVarId}).click(varEventHandler);
							}
						});
						
						// loop thru all the non-swatches attributes and bind events etc.
						jQuery(thisProduct.containerId + " .variationattributes .variantdropdown select").each(function(){							
							// default ui i.e. drop down
							jQuery(this).data("data", {id: jQuery(this).data("data"), val: ''}).change(function(e){
								// if there is only 1 value to be selected then return i.e. no deselection available
								if (this.selectedIndex == 0 && this.options.length == 1) { return; }
								
								e.data = jQuery(this).data("data"); // data is id
								// this.selectedIndex == 0, it is deselection
								e.data.val = (this.selectedIndex == 0) ? null: this.options[this.selectedIndex].value;
								
								if (this.selectedIndex == 0) {
									// deselection
									// clear the current selection
									thisProduct.resetVariations();
								}
								
								thisProduct.varAttrSelected(e);
							});
						});
						
						if (thisProduct.selectedVarAttribs["color"]) {
							// show swatch related images for the current value								
							thisProduct.showImages(thisProduct.selectedVarAttribs["color"], thisProduct.getAttrByID('color').vals);
						}
						else {
							// show images and bind hover event handlers for small/thumbnails to toggle large image								
							thisProduct.showImages("", [{val: "", images: model.images}]);
						}
					}
					else {
						// show images and bind hover event handlers for small/thumbnails to toggle large image								
						thisProduct.showImages("", [{val: "", images: model.images}]);
					}
					
					// bind product options event(s)
					getOptionsDiv(this);

					if(!model.productSet) {
						// quantity box
						if (!model.bundle) {
							getQtyBox(this);
						}// update avaiability for a bundle product, for everything else its done inside getQtyBox
						else if (model.bundle) {
							reloadAvailability(thisProduct, 1);
						}
					}

					// Add to cart button click binding
					getAddToCartBtn(this);
					// intial display of A2C button
					// if the price is 0 or not available, its disabled
					// if not in stock, its disabled
					// isPromoPrice would be true in case if a product has a promotional price which could make product's price 0
					if (!(this.getPrice() > 0 || this.isPromoPrice()) || 
						model.master || model.variant || model.productSet || model.bundle || 
						(!model.inStock && model.avStatus === app.constants.AVAIL_STATUS_NOT_AVAILABLE && !model.productSet)) {						
						if(thisProduct.pid != app.Product.virtgiftcard && thisProduct.pid != app.Product.tradgiftcard)this.disableA2CButton();
					}

					// For bundles and product-sets, enable or disable the add-to-cart button.
					// The button should be disabled if the add-to-cart button of any subproduct is disabled, enabled otherwise.
					// For product-sets, display a price which is the sum of the set-products prices as long as the add-to-cart button is enabled.
					if (model.bundle || model.productSet) {
						
						var bundleA2CEnabled = false;
						var price = new Number();
						
						for (var i = 0; i < thisProduct.subProducts.length; i++) {
							var subProduct = thisProduct.subProducts[i];
							bundleA2CEnabled = subProduct.isA2CEnabled();
							if (!bundleA2CEnabled) {
								break;
							}
							
							// collect price info
							price += new Number(subProduct.getPrice());
						}
						// if any of the bundled product has its A2C button disabled then the bundle is not orderable
						if (!bundleA2CEnabled) {							
							this.disableA2CButton();
						} 
						else {							
							this.enableA2CButton();

							// show total price except for a bundle
							if (!model.bundle) {
								thisProduct.showUpdatedPrice(price);
							}
						}
					}						

					// customer rating section only displayed for the main product
					if (!model.productSetProduct && !model.bundled) {
						if (!model.productSet && !isQuickView && !model.bundle) {							
							getRatingSection(this.containerId);							
						}
					}
					
					// wish list, sent to friend, add to gift
					getMiscLinks(this);
							
					// recommendations carosel
					loadRecommendations(this.containerId);

					// product tabs
					getTabs(this.containerId);										
					
					// bind AddtoCartDisabled event for each subproduct (bundle or product set)
					jQuery.each(thisProduct.subProducts, function(){
						jQuery(this).bind("AddtoCartDisabled", {},
						/**
						* Event handler when a subproduct of a product set or a bundle is selected.
						* disable the add to cart button
						*/
						function() {
							thisProduct.disableA2CButton();
						});
					});
					
					// see if have any sub-products and bind AddtoCartEnabled event
					jQuery.each(thisProduct.subProducts, function(){
						jQuery(this).bind("AddtoCartEnabled", {},
							/**
							* Event handler when a subproduct of a product set or a bundle is selected.
							* Basically enable the add to cart button or do other screen refresh if needed like price etc.
							*/
							function() {
								// enable Add to cart button if all the sub products have been selected
								// and show the updated price
								var enableAddToCart = true;
								var subProducts = thisProduct.subProducts;
								var price = new Number();

								for (var i = 0; i < subProducts.length; i++) {
									if (((subProducts[i].variant || subProducts[i].master) && subProducts[i].selectedVar == null) ||
										(!subProducts[i].bundled && (subProducts[i].selectedOptions["Quantity"] == undefined ||
										subProducts[i].selectedOptions["Quantity"] <= 0))) {
										enableAddToCart = false;
										break
									}
									else {
										if (subProducts[i].selectedVar != null) {
											subProducts[i].selectedOptions.pid = subProducts[i].selectedVar.pid;
										}
										else {
											subProducts[i].selectedOptions.pid = subProducts[i].pid;
										}
										
										// Multiply the subproduct quantity-one price by the entered quantity.
										// Important note:  This value will be incorrect if subproduct uses
										// tiered pricing !!!!!
										var subproductQuantity = subProducts[i].selectedOptions["Quantity"];
										if (subproductQuantity == undefined) {
											subproductQuantity = 1;
										}
										price += new Number(subproductQuantity * subProducts[i].getPrice())
									}
								}

								if (enableAddToCart && (model.productSet || model.inStock) && (price > 0 || thisProduct.isPromoPrice())) {
									thisProduct.enableA2CButton();

									// show total price except for a bundle
									if (!model.bundle) {
										thisProduct.showUpdatedPrice(price);
									}
								}
								else {
									thisProduct.disableA2CButton();
								}
							}
						);
					});
				},

				toString: function() {
					return this.model;
				}
			}
		} // Product defintion end
	}
	else {
		// dw namespace has not been defined yet i.e. app object is unavailable
		alert("app is undefined!");
	}
})(app);