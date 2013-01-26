	 

$(window).load(function() {

	//Defect CIS100071261 : custom validation rule for quantity field on product page
	$.validator.addMethod("digitsWithSpace",function(value,element){
		//allows whole numbers with leading and trailing spaces
		var qtyValue = (value + '').replace(/\s/g, ''); //remove space
		return this.optional(element) || /^\d+$/.test(qtyValue);
	},messages.ERR_ADD_TO_CART_INVALID_QTY);
	
	$('#ProductForm').validate({
		rules : { 
			quantity : { required:false, min : 1, max : constants.MAX_ITEM_QUANTITY, digits:false , digitsWithSpace:true }
		},
		messages : {
		   quantity: messages.ERR_ADD_TO_CART_INVALID_QTY
		},
		submitHandler: function(form) {
			// make sure that we've selected at least one product in a bundle
			$("#ProductForm").validate().settings.rules.quantity.required = true;
			var validProducts = 0;
			$("#ProductForm .product").each(function() {
				var tpt = "selected";
				var validSelections = 1;
				$(this).find("select[name^='productOption'] option:selected").each(function(p){
					tpt = $(this).val();
					if(tpt == "unselected") {
						validSelections = 0;
						return false;
					}
					else {
						validSelections++;
					}
				});
				if (validSelections > 0) {
					validProducts++;
				}
			});
			
			if(validProducts > 0) {
				var total = 0;
				$('input[name^=quantity]').each(function() { total += parseInt($(this).val()) });
				//Defect CIS100069714: Backspace quantity field throws error message
				$('input[name^=quantity]').focus();
				if(isNaN(total) || total < 1) {
					return false;
				}				
			}else{
				$("#ProductForm div.error").hide();
				$("#ProductForm").prepend('<div class="error">'+messages.ERR_ADD_TO_CART_SELECT_ONE+'</div>');

				return false;
			}
			
			if (productDisplay.isDisplayBackorderMessage(form)) {
				return false;
			}
			
			ajaxAddToCart('AjaxManageShoppingCartCmd', form);
			
		}
	});
	$('input[name^=quantity_]').rules("add", { required: true, min: 0, max: constants.MAX_ITEM_QUANTITY, digits:true,
		 messages: {
		   min: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   max: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   digits: messages.ERR_ADD_TO_CART_INVALID_QTY
		 }
	});
	$('input[name^=quantity_].limit-one').rules("add", { required: true, min: 0, max: 1, digits:true,
		 messages: {
		   min: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   max: messages.ERR_ADD_TO_CART_INVALID_QTY,
		   digits: messages.ERR_ADD_TO_CART_INVALID_QTY
		 }
	});
	
	if (queryString['emailFriendSuccess'])
	{
		$('#emailSuccess').show();
	}
	if (queryString['addToWishlistSuccessMessageKey'])
	{
		$('#wishlistSuccess').show();
	}
	
	// Fake :last-child selector for IE7
	$('.ui-tabs .ui-tabs-nav li:last-child').addClass('last-child');
});

function ajaxAddToCart(actionUrl, formObject)
{	
	var productErrorDiv = $('#productErrorDiv');
	var quantity;
	productErrorDiv.empty();
	$('#addToCartSuccess').hide();
	$('#addToCartBtn').attr('disabled', 'disabled');
	$('#addToCartBtn').addClass('disabled');
	
	$('#emailSuccess').hide();
	$('#wishlistSuccess').hide();
	
	var formData = $('#ProductForm').serializeArray();
	var cleanData = {'ajaxFlag': true};
	$.each(formData, function(index, value){
		var dataName = formData[index].name;
		var dataValue = formData[index].value;
// console.log(dataName+" == "+dataValue);
		// Remove all blank and array-type params
		if (!/_\d$/.test(dataName) && dataValue !== '' && dataValue !== '0') {
			
			cleanData[dataName] = dataValue;
		}		
	});
	

	// Rebuild array params with the correct indices
	var productIndex = 1;
	// var pluralized = false;
	var accumulateQuantity = 0;
	$('#ProductForm .product').each(function(i, p) {
		var foundItem = findItem(products[i], $(p).find('option:selected').map(function(){ return $(this).val(); }).get());
		quantity = $(p).find('.product-quantity input').val();
		
		accumulateQuantity += parseInt(quantity);


		if (foundItem && quantity > 0) {
			cleanData['catEntryId_'+productIndex] = foundItem.catentry;
			cleanData['quantity_'+productIndex] = quantity;
			productIndex++;
		}
	});
	
	
	if (accumulateQuantity > 1){
		// pluralize
		$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART2);
	}else{
		// singular
		$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART);		
	};
	
	$.ajax(
		{
			url: actionUrl,
			type: 'POST',
			data: cleanData,
			dataType: 'json',
			success: function(data, textStatus, xhr){
				var productErrorDiv = $('#productErrorDiv');
				var errorCount = 0;
				if (data.errorCode)
				{
					if (data.errorCode == 2510) // session timeout
					{
						document.location.href = 'Logoff?URL=ReLogonFormView&storeId='+wcs.storeId;
						return;
					}
				}
				else
				{
					if (data.redirecturl != null)
					{
						urlWithoutQueryString = data.redirecturl.split('?')[0];
						if (urlWithoutQueryString.indexOf('CatalogSearch') != -1 
								|| (urlWithoutQueryString.indexOf('.html') != -1 && 
										urlWithoutQueryString.indexOf('.product.') == -1)
							) // if pointing to a category (either
								// CatalogSearch or ending
							  // in .html without .product. in the url
						{
							var url = data.redirecturl;
							delete data.redirecturl; 
							var params = $.param(data);
							
							var decodedUrl = $("<div/>").html(url).text();
							var finalUrl;
							if (decodedUrl.indexOf('?') != -1)
							{
								if (decodedUrl.substr(decodedUrl.length - 1) == '&')
								{
									finalUrl = decodedUrl + params;
								}
								else
								{
									finalUrl = decodedUrl + '&' + params;
								}
							}
							else
							{
								finalUrl = decodedUrl + '?' + params;
							}
							document.location.href = finalUrl; 
							
							return;
						}
					}
					
					if (data.orderErrMsgObj)
					{
						var errors = data.orderErrMsgObj;
						for (var errorKey in errors)
						{
							if (errors.hasOwnProperty(errorKey)) 
							{
								errorCount++;
								productErrorDiv.append('<p class="error">' + errors[errorKey].replace('~',',').replace("''","'") + "</p>")
							}
						}
					}
					
					if (errorCount == 0) {
						// Added to handle a weird issue reported in
						// CIS100064805
						if($('#addToCartSuccess').length < 1){
							$('#ProductForm .submit-row').after('<p style="display:none;" class="success" id="addToCartSuccess"></p>');
							if (accumulateQuantity > 1){
								$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART2);							
							}else{
								$('#addToCartSuccess').text(messages.PDETAIL_ITEMS_ADDED_TO_CART);
							}
						}
						
						$('#addToCartSuccess').show();
					}
					// Added this line for Defect Id # CIS100068026
					throwShopAction5Tag(cleanData);
					
					miniShopCartRefresh();
				}
			},
			error: function(xhr, textStatus, errorThrown){
				alert('error');
			},
			complete: function ()
			{
				$('#addToCartBtn').removeAttr('disabled');
				$('#addToCartBtn').removeClass('disabled');
			}
		}
	);
}
// Added This Function for taking ShopAction5Tag for CoreMetrics. Defect Id #
// CIS100068026
function throwShopAction5Tag(cleanData)
{
	var price="";
	var reg = new RegExp("^[0-9]");
	// CD=cleanData;
	if(cleanData['analytics']==undefined)
		return;
	
	if(cleanData['bundleFlag']==undefined)
	{
		if(cleanData['productOption00']!=undefined )
		{
			 $("#productOption00 option:selected").each(function () {
	               price= $(this).text().split("- $")[1] + " ";
	               if(reg.test(price))
	            	{   
	            	   cleanData['price']=price;
	            	}
			 });

		}
	// addedItem contains the product Id
	if(wcs.locale=="en_US")
	{
		
		cmCreateShopAction5Tag(cleanData['addedItem'],cleanData['productName'],cleanData['quantity'],cleanData['price'],cleanData['categoryId'],cleanData['storeId'],"USD",null,cleanData['addedItem'],cleanData['productName'],cleanData['categoryId'],null,null);
		cmDisplayShop5s(); 
	}
	if(wcs.locale=="en_CA")
	{
		cmCreateShopAction5Tag(cleanData['addedItem'],cleanData['productName'],cleanData['quantity'],cleanData['price'],cleanData['categoryId'],cleanData['storeId'],"CAD",null,cleanData['addedItem'],cleanData['productName'],cleanData['categoryId'],null,null);
		cmDisplayShop5s(); 
	}
	}
	else
	{
		for(var i=1;i<cleanData['count'];i++)
			{

			 $("#productOption"+(i-1)+"0 option:selected").each(function () {
		               price= $(this).text().split("- $")[1] + " ";
		               if(reg.test(price))
		            	{   
		            	   cleanData['price-'+i]=price;
		            	}
				 });
	      	   
			if(wcs.locale=="en_US")
			{
				if(cleanData['productOption'+(i-1)+'0']!="unselected")
				{		
			      	  cmCreateShopAction5Tag(cleanData['addedItem-'+i],cleanData['productName-'+i],cleanData['quantity-'+i],cleanData['price-'+i],cleanData['categoryId-'+i],cleanData['storeId'],"USD",null,cleanData['addedItem-'+i],cleanData['productName-'+i],cleanData['categoryId-'+i],null,null);
					cmDisplayShop5s(); 
				}
			}
			if(wcs.locale=="en_CA")
			{
				if(cleanData['productOption'+i+'0']!="unselected")
				{
					cmCreateShopAction5Tag(cleanData['addedItem-'+i],cleanData['productName-'+i],cleanData['quantity-'+i],cleanData['price-'+i],cleanData['categoryId-'+i],cleanData['storeId'],"CAD",null,cleanData['addedItem-'+i],cleanData['productName-'+i],cleanData['categoryId-'+i],null,null);
					cmDisplayShop5s();
				}
			}
				
			}
		
	}
}

function findItem(p,o) {
	
	// Case: no defining attributes
	if (o.length == 0 && p.length > 0) {
		return p[0];
	}
	
	// Case: one or more defining attributes
	for(var i=0;i<p.length;i++) {
		if(areArraysEqual(o, p[i].options) || (o == p[i].catentry)) {
			return p[i];
		}
	}
	return null;
}

function findAttributes(p, key) {
	var attributes = [];
	for(var i=0;i<p.length;i++) {
		for(var j=0;j<p[i].options.length;j++) {
			if($.inArray(key, p[i].options) > -1 && p[i].options[j] != key){
				attributes.push(p[i].options[j]);
			}
		}
	}
	return attributes;
}

function AddToWishlist(baseURL) {
	if($('#ProductForm').valid()) {
		var x = baseURL + '&catentryId=' + $('#ProductForm .product .catentryInput').map(function() { return $(this).val(); }).get().join(',');
		navigateToURL(x);
	}
}


function AddAllToWishlist(baseURL) {
	var validProducts = 0;
	$("#ProductForm .product").each(function() {
		var tpt = "selected";
		var validSelections = 1;
		$(this).find("select[name^='productOption'] option:selected").each(function(p){
			tpt = $(this).val();
			if(tpt == "unselected") {
				validSelections = 0;
				return false;
			}
			else {
				validSelections++;
			}
		});
		if (validSelections > 0) {
			validProducts++;
		}
	});
	
	if(validProducts > 0) {
		var total = 0;
		$('input[name^=quantity]').each(function() { total += parseInt($(this).val()) });
		if(total < 1) {
			$("#ProductForm div.error").hide();
			$("#ProductForm").prepend('<div class="error">'+messages.ERR_ADD_TO_CART_INVALID_QTY+'</div>');
			return false;
		} else {
			$("#ProductForm div.error").hide();
		}
	}else{
		$("#ProductForm div.error").hide();
		$("#ProductForm").prepend('<div class="error">'+messages.ERR_ADD_TO_CART_SELECT_ONE+'</div>');

		return false;
	}
	var x = baseURL + '&catentryIds=' + $('#ProductForm .product .catentryInput').map(function() { return $(this).val(); }).get().join(',');
	navigateToURL(x);
}

function openModalFrame(url) {
	var $f = $('<iframe src="'+url+'"></iframe>');
	$('<div/>').append($f).dialog({
		close: function(event, ui){
			$f.remove();
		},  
		modal:true,dialogClass:'modal-iframe',draggable:false,resizable:false,width:600,height:450});
}

function ProductDisplay() {
	// private variables
	var state = { selectedItems : [] };
	
	// public methods
	this.isDisplayBackorderMessage = function(form) {
		var i, flags = {};
		
		if (singleProduct !== null) {
			if(singleProduct.inventory == 'BACK_ORDER') {
				flags['BACK_ORDER'] = singleProduct;
			}
		}
		else {
			for(i=0;i<state.selectedItems.length;i++) {
				if(state.selectedItems[i] != null && state.selectedItems[i].inventory == 'BACK_ORDER') {
					flags['BACK_ORDER'] = state.selectedItems[i];
				}
			}
		}
		if(flags['BACK_ORDER']) {
			$('<div>'+backorder_message(flags['BACK_ORDER'])+' '+messages.BACKORDER_TEXT_ADD+'</div>').dialog({
				buttons: [
					{
						text: messages.BUTTON_CANCEL,
						click: function() {
							$(this).dialog("close").remove();
						}
					},
					{
						text: messages.ADDTOCART,
						click: function() {
							$(this).dialog("close").remove();
							ajaxAddToCart('AjaxManageShoppingCartCmd', form);
						}
					} 
				],
				modal:true
			});
			return true;
		}
		else {
			return false;
		}
	}
	
	this.init = function(obj) {
		if (typeof products == 'undefined' || products == null) return;
		var pn = queryString['partNumber'];
				
		for (var i=0; i < products.length; i++) {
			var minPrice = -9999999999999999;
			var maxPrice = 9999999999999999;
			for (var j=0; j<products[i].length; j++) {
				minPrice = products[i][j].price < minPrice ? minPrice : products[i][j].price;
				maxPrice = products[i][j].price > maxPrice ? maxPrice : products[i][j].price; 
			}
			product[i].isSinglePriced = (minPrice == maxPrice);
		} 
		
		$('#ProductForm .product').each(function(i, p) {
			$('.product-option', p).each(function(j, o) {
				var partNumberFound = false;
				//Added title for Defect Id # CIS100068790		
				// Create the empty select box
				$('<select id="productOption' +i+j +'" name="productOption' +i+j +'" title="'+messages.SELECT_DETAILS+' '+options[i][j].n+'"></select>')
					.data('product', products[i])
					.change(onAttributeChange)
					.appendTo(this);
				
				var $s = $('#productOption' +i+j);
				
				// Add the default option
				$s.append('<option value="unselected">'+messages.PDETAIL_OPTION_SELECT+' '+options[i][j].n+'</option>');
												
				// Populate all options for the initial load of the select box
				if(typeof options[i][j] != 'undefined') {
					var attr = options[i][j];
					
					// 1. Determine attr val display names
					var attrVals = new Array();
					for(attrValId in attr.v) {
						var attrVal = attr.v[attrValId];
						var foundItem = null;
						var priceText = '';
						var backorderText = '';
						
						for(var l=0;l<products[i].length;l++) {
							var item = products[i][l];
							
							if ($.inArray(attrValId, item['options']) >= 0) {
								foundItem = item;
								break;
							}
						}
						if (foundItem !== null) {
							
							// Only resolve to a SKU for if there is exactly one
							// option
							if (options[i].length == 1) {
								if (foundItem.inventory == 'BACK_ORDER') {
									backorderText = ' - '+messages.BACKORDER_TEXT;
								}
								if (!product[i].isSinglePriced) {
									priceText = ' - '+formatLocalCurrency(foundItem.price);
								}
							}
						
						}
						attrVals.push({
							'id': attrValId,
							'value': attrVal,
							'price': foundItem === null ? null : foundItem.price,
							'text': attrVal+backorderText+priceText
						});
					}
					
					// 2. Sort attr vals
					attrVals.sort(function(v1, v2) {
						if (v1.value.toLowerCase() == v2.value.toLowerCase()) {
							return parseFloat(v2.price) - parseFloat(v1.price);
						}
						return v1.value.toLowerCase() > v2.value.toLowerCase() ? 1 : -1;
					});
					
					// 3. Populate the select box
					for (var attrValIndex = 0; attrValIndex < attrVals.length; attrValIndex++) {
						var val = attrVals[attrValIndex];
						$s.append('<option value="'+val.id+'">'+val.text+'</option>');
					}
				}
			 
				// If a SKU number is passed in the query string, pre-populate
				// the select boxes
				if(typeof(pn) !== 'undefined') {
					for(var k=0;k<products[i].length;k++) {
						if(pn == products[i][k]['partNumber']) {
							partNumberFound = true;
							$s.val(products[i][k]['options'][j]);
						}
					}
				}
				
				// Disable the second select box unless the values are
				// pre-populated
				if (!partNumberFound && j > 0) {
					$s.attr('disabled', 'true');
				}
			});
			if($('.product-option', p).length == 0){
				state.selectedItems.push(findItem(products[i],$(p).find('.catentryInput').val()));
			}
		});
		
		$('.bundle-product-qty').change(updatePricing);
		
		if (window.location.hash)
		{
			if (window.location.hash == '#reviews')
			{
				ShowReviews();
			}
			
		}
	};
	
	// private methods
	updatePricing = function() {
		var totalPrice = 0;
		var validQuantities = true;
		for (var i = 0; i < state.selectedItems.length; i++) {
			
			product = state.selectedItems[i];
			
			if (product) {
				var price = parseFloat(product.price);
				var quantity = $($('.product-quantity input')[i]).val();
				var intRegex = /^\d+$/;

				totalPrice = (price > -1 && totalPrice > -1) ? (totalPrice + price * quantity) : -1;
				
				if (isNaN(quantity) || quantity < 0 || !intRegex.test(quantity)) {
					validQuantities = false;
				}
			}
		}
		if (validQuantities) {
			$('#ProductForm .bundle-price .currency').text(totalPrice > -1 ? formatLocalCurrency(totalPrice) : formatLocalCurrency(0));
		}
	}
	
	onAttributeChange = function(e) {
		var price = 0, foundProduct;
		
		// Reset the "stateful" selection - CIS100064014 - CIS100063969
		state.selectedItems.length = 0;
		$('#ProductForm .product').each(function(i, p) {
			
			// If the selected attributes resolve to an item, save the product
			// and update the quantity
			foundProduct = findItem(products[i], $(p).find('option:selected').map(function(){ return $(this).val(); }).get());
			// state.selectedItems[i] = product;
// mazeem : commented above line
			if (foundProduct) {
				state.selectedItems[i] = foundProduct; // : azeem had added
														// this for testing
				if ($('.product-bundle').length > 0 && $(p).find('.product-quantity input').val() == 0) {
					var qtyInput = $(p).find('.product-quantity input');
					if($(p).find('select').length > 0){
						qtyInput.val(foundProduct.minQty);
					}
					if (!qtyInput.hasClass('limit-one')) {
						qtyInput.removeAttr('disabled');
					}
				}	
				// Defect id : CIS100064444 : Fixed the disabled state when the
				// qty is 1 or more and the qty is not limited to one.
				if ($('.product-bundle').length > 0 && $(p).find('.product-quantity input').val() > 0 
						&& !$(p).find('.product-quantity input').hasClass('limit-one')) {					
					$(p).find('.product-quantity input').removeAttr('disabled');
										
				}
				
				// Enable/disable quantity field
				if (foundProduct.itemLimitOneQty == "true"){
					$(p).find('.product-quantity input').attr('disabled', 'disabled')
					$(p).find('.product-quantity input').removeClass('validationError')
					$(p).find('.product-quantity input').val(foundProduct.minQty)
				}else{
					$(p).find('.product-quantity input').removeAttr('disabled');
				}
				
				$(p).find('.catentryInput').val(foundProduct.catentry);
				$(p).find('.addedItemInput').val(foundProduct.partNumber);
			}
			else {
				if ($('.product-bundle').length > 0) {
					$(p).find('.product-quantity input')
						.val(0)
						.attr('disabled', 'disabled');	
				}
			}
			
			// Change the disabled flag for the attribute selections and
			// populate enabled selects
			var isSelectEnabled = true;
			var selectedValues = [];
			var attributes = [];
			var reloadNextSelect = false;
			$(p).find('.product-option select', p).each(function(j, s) {
				
				// If the select is following the changed select, recreate the
				// options to ensure they're still valid
				if (isSelectEnabled==false) {
					$(s).val('unselected');
				}
				$(s).attr('disabled', !isSelectEnabled);
				
				if(reloadNextSelect){
					$(s).find('option').remove();
					var id = $(s).attr("id");
					var m = id.charAt(id.length - 2);
					var n = id.charAt(id.length - 1);
					var tempOption = options[m][n];
					$(s).append('<option value="unselected">'+messages.PDETAIL_OPTION_SELECT+' '+tempOption.n+'</option>');
					var val = tempOption.v;
					for(var k=0;k<attributes.length;k++) {
						$(s).append('<option value="'+attributes[k]+'">'+val[attributes[k]]+'</option>');
					}
					$(s).hide(0, function(){$(this).show();});
					reloadNextSelect = false;
				}
				
				// If the user has not made a selection in this option, all
				// subsequent options should be disabled
				if ($(s).val() == 'unselected') {
					isSelectEnabled = false;
				} else if(e.currentTarget.name.indexOf("00") > -1){
					attributes = findAttributes(products[i],$(s).val());
					reloadNextSelect = true;
				}
				// mazeem: bit confused whether below statement is required or
				// not, it effects number of options in second drop down
				selectedValues.push($(s).val());
				
			});
		});
		updatePricing();

		$('#ProductForm').valid();
		$('#ProductForm .product').each(function(i, p) {
			var selectVal = $(p).find('select').val();
			var quantity = $(p).find('input');
			if (selectVal == 'unselected') {
				quantity.removeClass('validationError')
			}
		});
	}
}

$(window).load(function() {
	productDisplay = new ProductDisplay()
	productDisplay.init();
});

function ShowReviews() {
	// this has to be a global function since it's called by a bazaarvoice
	// callback
	$('.product-detail-tabs').tabs('select', '#product-tab6');
	$('html, body').animate({scrollTop: $("#product-tab6").offset().top - 25}, 800);
}

function areArraysEqual(array1, array2) {
   var temp = new Array();
   if ( (!array1[0]) || (!array2[0]) ) { // If either is not an array
      return false;
   }
   if (array1.length != array2.length) {
      return false;
   }
   // Put all the elements from array1 into a "tagged" array
   for (var i=0; i<array1.length; i++) {
      key = (typeof array1[i]) + "~" + array1[i];
   // Use "typeof" so a number 1 isn't equal to a string "1".
      if (temp[key]) { temp[key]++; } else { temp[key] = 1; }
   // temp[key] = # of occurrences of the value (so an element could appear
	// multiple times)
   }
   // Go through array2 - if same tag missing in "tagged" array, not equal
   for (var i=0; i<array2.length; i++) {
      key = (typeof array2[i]) + "~" + array2[i];
      if (temp[key]) {
         if (temp[key] == 0) { return false; } else { temp[key]--; }
      // Subtract to keep track of # of appearances in array2
      } else { // Key didn't appear in array1, arrays are not equal.
         return false;
      }
   }
   // If we get to this point, then every generated key in array1 showed up the
	// exact same
   // number of times in array2, so the arrays are equal.
   return true;
}
