	/*global jslint $ jQuery ATT */
	/*jslint pluplus:false*/


	jQuery(document).ready(function(){
		ATT.namespace("conflictModal");
		ATT.conflictModal.flatten = function (arr){
			var arrOut = [];
			if(Object.prototype.toString.call(arr) === '[object Array]'){
				for(var i = 0; i < arr.length; i++){
					if(Object.prototype.toString.call(arr[i]) === '[object Array]'){
						arrOut = ATT.conflictModal.flatten(arr[i],arrOut);
					}else{
						arrOut.push(arr[i]);
					}
				}
			}
			return arrOut; 
		};
		ATT.conflictModal.originatingOrder = {};
		ATT.conflictModal.orderAugmentationModel = {
			// this is a data modal which we'll use to augment the order object
			// relative to the resolution of the conflict.
			"addItemsToFilterFromOrder":[],
			"accountItemsToBeRemoved":[],
			"removalCommerceIds":[],
			"removeConfirm":""
		};
		ATT.conflictModal.orderContent = {
			// order structure.  We'll use this to fill in any gaps
			"params":"",
			"items":{
				"accountItemsToBeRemoved":[],
				"wirelessPackageItems":[],
				"removalCommerceIds":[],
				"items":[]
			}
		};
		ATT.conflictModal.packageContent = [
			// order add-item categories for a package.  we'll iterate over these to
			// scrub add-items from the order object which were removed during 
			// conflict resolution
			"optionalAccessories",
			"requiredAccessories",
			"optionalServices",
			"requiredServices",
			"deviceItem",
			"planItem"
		];
		ATT.conflictModal.isDefined = function(variable){return typeof variable !== "undefined"}
		ATT.conflictModal.augmentOrder = function(order, orderAugmentation){
			/*
				take the order [usually the order object which initiated the ATC event 
				and subsequent conflict] and apply the augment.  conflict resolution 
				involves three basic operations:
					1. note cart items to remove.
					2. note account items to remove.
					3. scrub add-items from the order object.
			*/
			var conflictData = ATT.conflictModal.conflictData;
			var resultType = conflictData.resultType, removeConfirm = orderAugmentation.removeConfirm, paramsArray = [], paramsMap = {};
			var newOrder = jQuery.extend(true, {}, ATT.conflictModal.orderContent, order);
			newOrder.form = false;
			
			// make sure "removeConfirm" is added to the new order object's params
			paramsArray = newOrder.params.split("&");
			for(var i = 0; i < paramsArray.length; i++){    
				var thisParam = paramsArray[i].split("=");
				if(thisParam.length > 1){paramsMap[thisParam[0]] = thisParam[1]}
			}
			paramsArray = [];
			paramsMap["removeConfirm"] = removeConfirm;
			for(param in paramsMap){paramsArray.push(param + "=" + paramsMap[param])}
			newOrder.params = paramsArray.join("&");
			
			if(!!newOrder.items.wirelessPackageItems.length){
				// scrub add-items from the package
				if(!!orderAugmentation.addItemsToFilterFromOrder.length){
					for(var k = 0; k < orderAugmentation.addItemsToFilterFromOrder.length; k++){
						var itemToBeRemoved = orderAugmentation.addItemsToFilterFromOrder[k];
						for(var i = 0; i < ATT.conflictModal.packageContent.length; i++){
							var contentType = ATT.conflictModal.packageContent[i];
							if(!!newOrder.items[contentType].length){
								for(var m = 0; m < newOrder.items[contentType].length; m++){
									if(!!newOrder.items[contentType][m].length){
										for(var n = 0; n < newOrder.items[contentType][m].length; n++){
											var orderItem = newOrder.items[contentType][m][n];
											if(orderItem.sku.value == itemToBeRemoved.catalogRefId){newOrder.items[contentType][m].splice(n,1)}
										}
									}
								}
							}
						}
					}
				}
			}else{
				// scrub add-items from non-package item list
				if(!!orderAugmentation.addItemsToFilterFromOrder.length){
					for(var k = 0; k < orderAugmentation.addItemsToFilterFromOrder.length; k++){
						var itemToBeRemoved = orderAugmentation.addItemsToFilterFromOrder[k];
						if(!!newOrder.items.items.length){
							for(var m = 0; m < newOrder.items.items.length; m++){
								if(!!newOrder.items.items[m].length){
									for(var n = 0; n < newOrder.items.items[m].length; n++){
										var orderItem = newOrder.items.items[m][n];
										if(orderItem.sku.value == itemToBeRemoved.catalogRefId){newOrder.items.items[m].splice(n,1)}
									}
								}
							}
						}
					}
				}
			}
			
			newOrder.items.removalCommerceIds = ATT.conflictModal.flatten(newOrder.items.removalCommerceIds);
			if(!!orderAugmentation.removalCommerceIds.length){
				// note the cart items to be removed.
				// If this conflict event is the result of a previous conflict resolution
				// the order object may already contain cart items to be removed.
				for(var i = 0; i < orderAugmentation.removalCommerceIds.length; i++){
					var removalCommerceId = orderAugmentation.removalCommerceIds[i];
					newOrder.items.removalCommerceIds.push({cxid: {name: 'removalCommerceId', value: removalCommerceId.id}});
				}
			}
			
			if(!!orderAugmentation.accountItemsToBeRemoved.length){
				// note the account items to be removed.
				// If this conflict event is the result of a previous conflict resolution
				// the order object may already contain account items to be removed.
				for(var i = 0; i < orderAugmentation.accountItemsToBeRemoved.length; i++){
					var accountItemToBeRemoved = orderAugmentation.accountItemsToBeRemoved[i];
					newOrder.items.accountItemsToBeRemoved.push(
						{
							id: {name: 'id', value: accountItemToBeRemoved.id},
							itemId: {name: 'itemId', value: accountItemToBeRemoved.itemId},
							socCode: {name: 'socCode', value: accountItemToBeRemoved.socCode}
						}
					);
				}
			}
			
			return newOrder;
		}
		
		ATT.conflictModal.populateConflictDetails = function(resultContainer){
			// the conflict modal content contains place holders for the items in conflict.
			// this will fill those place holders.
			
			var conflictData = ATT.conflictModal.conflictData, 
				incompatibleProductStrings, 
				incompatibleProducts, 
				incompatibleProductName, 
				incompatibleCartItems, 
				incompatibleAccountItems,
				requiredItems;

			requiredItems = jQuery.map(conflictData.result[resultContainer].reqItems, function(item, index){return item.displayName}) ;
			incompatibleCartItems = conflictData.result[resultContainer].incompatibleCartItems;
			incompatibleAccountItems = conflictData.result[resultContainer].incompatibleAccountItems;
			incompatibleProductStrings = [
				/\{name of incompatible rate plan\}/gi,
				/\{name of incompatible service\}/gi,
				/\{name of incompatible device\}/gi
			];
			
			incompatibleProducts = [];
			if(requiredItems.length){jQuery("#reqitems").html("<p>" + requiredItems.join("<br/>") + "</p>")}
			if(incompatibleAccountItems.length){incompatibleProducts = incompatibleAccountItems}
			if(incompatibleCartItems.length){incompatibleProducts = incompatibleCartItems}
			if(incompatibleProducts.length){
				incompatibleProductName = incompatibleProducts[0].displayName;
				for(var i = 0; i < incompatibleProductStrings.length; i++){
					jQuery("#conflictDetails").html(jQuery("#conflictDetails").html().replace(incompatibleProductStrings[i],incompatibleProductName));
				}
			}
		
		}
		ATT.conflictModal.handleCartConflict = function(event, eventData){
			// gather the required information and invoke the modal.
			// build order augmentation models.
			
			if(ATT.conflictModal.isDefined(eventData) && ATT.conflictModal.isDefined(eventData.data) && ATT.conflictModal.isDefined(eventData.data.wirelessAddToCartResultHolder)){
				var conflictData = {}, urlToPass, result, resultType = "", resultKey = "", reqItems = [], orderAugmentations = {}, scenarioResult = {}, handlerRemovalCommerceIds = [];
				
				for(var i = 0 ; i < eventData.data.removalCommerceIds.length; i++){
					var removalCommerceId = eventData.data.removalCommerceIds[i];
					handlerRemovalCommerceIds.push({"id":removalCommerceId});
				}
				
				result = eventData.data.wirelessAddToCartResultHolder;
				
				//reset data structures
				ATT.conflictModal.conflictData = {};
				
				// create new order augments, inherit the structure from the model we defined earlier
				ATT.conflictModal.orderAugmentationModel.removeConfirm = result.removeConfirm;
				orderAugmentations["replace"] = jQuery.extend({}, ATT.conflictModal.orderAugmentationModel);
				orderAugmentations["keepNew"] = jQuery.extend({}, ATT.conflictModal.orderAugmentationModel);
				orderAugmentations["keepExisting"] = jQuery.extend({}, ATT.conflictModal.orderAugmentationModel);
				
				/* 
					populate the augment models with information from the conflict event response.
					
					keep new:  
						the user wants to keep the items they attempted to add.  in this case,
						we'll note the cart and account items to remove.
					
					keep existing:
						the user wants to keep the items in the cart or on the account.
						in this case, we'll note the items in the order object to remove.
						
					replace:
						in this scenario, the user may only confirm that they wish to replace
						the items in the cart or on the account with the items they attempted
						to add to the cart.
				*/
				
				
				
				if(eventData.status == "ERROR"){
					resultType = "errorResult";
				}
				if(eventData.status == "REMOVE"){
					resultType = "removeResult";
					scenarioResult = result[resultType];
					orderAugmentations["keepNew"].accountItemsToBeRemoved = scenarioResult.incompatibleAccountItems;
					orderAugmentations["keepNew"].removalCommerceIds = scenarioResult.incompatibleCartItems.concat(handlerRemovalCommerceIds);
					orderAugmentations["keepExisting"].addItemsToFilterFromOrder = result.resultAddItems;
				}
				if(eventData.status == "REPLACE"){
					resultType = "replaceResult";
					scenarioResult = result[resultType];
					orderAugmentations["replace"].accountItemsToBeRemoved = scenarioResult.incompatibleAccountItems;
					orderAugmentations["replace"].removalCommerceIds = scenarioResult.incompatibleCartItems.concat(handlerRemovalCommerceIds);
				}
				
				if(eventData.status === "EMPTY_CART"){
					resultType = 'emptyCartResult';
					
					
				}
				// error message resource key.  we'll pass this to the modal when we invoke it.
				if(!!result.rollUpErrorCode){resultKey = result.rollUpErrorCode}
				
				// for hard stop error scenario, alert the user which items must be added first.
				if(!!result[resultType].requiredItems){
					for(var i = 0 ; i < result[resultType].requiredItems.length; i++){
						var item = resultHolder[resultType].requiredItems[i];
						reqItems.push(item);
					}
				}
				
				resultKey = "resultkeys=" + resultKey;
				resStatus = "status=" + eventData.status;
				
				
				modalURL = eventData.data.shopModalURL + "/jcr:content/mainpar/conflictmodal.xhr.html?" + resStatus + "&" + resultKey;
	
				
				ATT.conflictModal.conflictData.labelincart = eventData.data.incartlabel;
				ATT.conflictModal.conflictData.labelonaccount = eventData.data.onaccountlabel;
				ATT.conflictModal.conflictData.result = result;
				ATT.conflictModal.conflictData.status = eventData.status;
				ATT.conflictModal.conflictData.reqItems = reqItems;
				ATT.conflictModal.conflictData.resultType = resultType;
				ATT.conflictModal.conflictData.originatingOrder = eventData.originatingOrder;
				ATT.conflictModal.conflictData.orderAugmentations = orderAugmentations;
				
				ATT.conflictModal.colorbox = jQuery.colorbox({href: modalURL, scrolling:false, width: "640", onComplete:ATT.conflictModal.onComplete });
			}
		}
		ATT.conflictModal.onComplete = function(){
			// populate the conflict modal
			
			var conflictData = ATT.conflictModal.conflictData;
			var result = ATT.conflictModal.conflictData.result;
			var resultType = conflictData.resultType;
			var scenarioResult = result[resultType],
				resultAddItems,
				incompatibleCartItems,
				incompatibleAccountItems,
				reqItems;
				
			incompatibleAccountItems = scenarioResult.incompatibleAccountItems;
			incompatibleCartItems = scenarioResult.incompatibleCartItems;
			resultAddItems = result.resultAddItems;
			reqItems = !!reqItems ? conflictData.result.reqItem : [];
			
			jQuery("div#colorbox").find("#modalConflictOk, #modalConflictCancel, .closeModal").click(function() {
				jQuery(document).trigger('CartConflictCancel', [resultType]);
				jQuery.colorbox.close();
			});
			jQuery("div#colorbox").find("#modalConflictContinue").click(ATT.conflictModal.handleContinue);
			jQuery("div#colorbox").find("#modalConflictNewLine").click(ATT.conflictModal.handleNewLine);
			
			// iterate through the list of cart items, account items, and conflicting
			// add items and write them to the appropriate dom locations to inform the
			// user which items are in conflict with one another.
			switch(conflictData.status){
				case "REMOVE":
					
					for(var i = 0 ; i < incompatibleCartItems.length; i++){
						var conflictedItem = incompatibleCartItems[i];
						if(conflictedItem && conflictedItem.displayName){
							document.getElementById("existingItem").innerHTML += "<p>" + conflictedItem.displayName + " (" + conflictData.labelincart + ")</p>";
						}
					}
					
					for(var i = 0 ;i < incompatibleAccountItems.length; i++){
						var conflictAccountItem = incompatibleAccountItems[i];
						if (conflictAccountItem.isEncore == 'true') {
							jQuery("#conflictModalWarning").show();
						}
						jQuery("strong#cartItems").hide();
						jQuery("strong#accountItems").show();
						jQuery("#existingItem").append("<p>" + conflictAccountItem.displayName + " (" + conflictData.labelonaccount + ")</p>");
						
					}
					
					for(var i = 0 ; i < resultAddItems.length; i++){
						var item = resultAddItems[i];
						jQuery("#conflictModalNew").append("<p>" + item.displayName + "</p>");
					}
					
					ATT.conflictModal.populateConflictDetails("removeResult");
					break;
					
				case "REPLACE":
					
					for(var i = 0 ; i < incompatibleCartItems.length; i++){
						var incompatibleCartItem = incompatibleCartItems[i];
						if(incompatibleCartItem && incompatibleCartItem.displayName){
							document.getElementById("existingItem").innerHTML += "<p>" + incompatibleCartItem.displayName + " (" + conflictData.labelincart + ")</p>";
						}
					}
					
					for(var i = 0 ;i < incompatibleAccountItems.length; i++){
						var incompatibleAccountItem = incompatibleAccountItems[i];
						jQuery("strong#cartItems").hide();
						jQuery("strong#accountItems").show();
						if(incompatibleAccountItem && incompatibleAccountItem.displayName){
							document.getElementById("existingItem").innerHTML += "<p>" + incompatibleAccountItem.displayName + " (" + conflictData.labelonaccount + ")</p>";
						}
					}
					
					for(var i = 0 ; i < resultAddItems.length; i++){
						var conflictedresultAddItem = resultAddItems[i];
						if(conflictedresultAddItem && conflictedresultAddItem.displayName){
							document.getElementById("conflictModalReplace").innerHTML += "<p>" + conflictedresultAddItem.displayName + "</p>";
						}   
					}
					
					ATT.conflictModal.populateConflictDetails("replaceResult");
					break;
					
				case "ERROR":
					
					ATT.conflictModal.populateConflictDetails("errorResult");
					break;
				
				case "EMPTY_CART":
					
					break;
			}
			jQuery.colorbox.resize();
		}

		ATT.conflictModal.handleNewLine = function(){
			var conflictData = ATT.conflictModal.conflictData;
			var originOrder = conflictData.originatingOrder;
			originOrder.params = originOrder.params || "";
			originOrder.params = originOrder.params + "&startNew=true";			
			ATT.ShoppingCart.executeOrder(originOrder);
		}
		
		ATT.conflictModal.handleContinue = function(){
			var conflictData = ATT.conflictModal.conflictData;
			var originOrder = conflictData.originatingOrder;
			
			// augment the originating order and create a new order object using the
			// augment we created earlier.  execute that order.
			switch(conflictData.status){
				case "REMOVE":
					var keepNew = jQuery("#conflictModalRadioNew").is(":checked");
					if(keepNew){
						var keepNewOrder = ATT.conflictModal.augmentOrder(originOrder, ATT.conflictModal.conflictData.orderAugmentations["keepNew"]);
						ATT.ShoppingCart.executeOrder(keepNewOrder);
					}else{
						var keepExistingOrder = ATT.conflictModal.augmentOrder(originOrder, ATT.conflictModal.conflictData.orderAugmentations["keepExisting"]);
						var hasItems = !!ATT.conflictModal.flatten(keepExistingOrder.items.items).length, hasPackage = !!keepExistingOrder.items.wirelessPackageItems.length;
						if(!hasItems && !hasPackage){
							jQuery("<div class='noThanksCart' data-extraparams='pageType=servicesList&amp;continueWithoutMarking=false'>").trigger("click");
							return;
						}
						ATT.ShoppingCart.executeOrder(keepExistingOrder);
					}
					
					break;
				case "REPLACE":
					var replaceOrder = ATT.conflictModal.augmentOrder(originOrder, ATT.conflictModal.conflictData.orderAugmentations["replace"]);
					ATT.ShoppingCart.executeOrder(replaceOrder)
					break;
				case "ERROR":
					// nothing
					break;
				case "EMPTY_CART":
					//nothing
					break;
			}
		}
		jQuery(document).bind('CartConflict', ATT.conflictModal.handleCartConflict );
	});