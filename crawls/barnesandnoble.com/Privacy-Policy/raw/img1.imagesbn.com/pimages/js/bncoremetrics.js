(function() {
    if (typeof cmCreatePageviewTag === "function") {
        try {
            var fns = []; // hold references to original functions with newer APIs

			fns["cmCreateRegistrationTag"]	 = cmCreateRegistrationTag;
            fns["cmCreateManualPageviewTag"] = cmCreateManualPageviewTag;
            fns["cmCreateManualPageviewTag"] = cmCreateManualPageviewTag;
            fns["cmCreatePageviewTag"]       = cmCreatePageviewTag;
            fns["cmCreateProductviewTag"]    = cmCreateProductviewTag;
            fns["cmCreateShopAction5Tag"]    = cmCreateShopAction5Tag;
            fns["cmCreateShopAction9Tag"]    = cmCreateShopAction9Tag;
            fns["cmCreateOrderTag"]          = cmCreateOrderTag;

            // Override Coremetrics functions to pass the bnCustomerID (cookie:userid) and WL store id

            var setupCoremetricsProxy = function() {
            	var productEan; 
				var getCookie = function(name) { // Same as in bnnav.js but indented
					var search = name + "=";
					if (document.cookie.length > 0) { // if there are any cookies 
						offset = document.cookie.indexOf(search);
						if (offset != -1) {								// if cookie exists		  
							offset += search.length;					// set index of beginning of value 
							end = document.cookie.indexOf(";", offset);	// set index of end of cookie value		 
							if (end == -1) {
								end = document.cookie.length;
							}
							return unescape(document.cookie.substring(offset, end));
						}	
					}
				};

				var getStoreID = function() {
					var id = "0001";					
					try {
						id = BN.Environment.Store.getStoreId();
					}
					catch(e) {}
					return id;
				};
				
				var getStoreCode = function() {
					var code = "bn";					
					try {
						code = BN.Environment.Store.getStoreCode();
					}
					catch(e) {}
					return code.toUpperCase();
				};
				
				var bnCustomerID = getCookie("userid");
				var storeID = getStoreID();
				var storeCode = getStoreCode();
				var bnURL = document.URL;

				var extraAttr = bnCustomerID + "-_-" + storeID;

				var getPrefixedStoreAttributes = function(attributes) {
					// If no attributes, return the [bnCustomerID-_-storeID]
					// else prefix the attributes: [bnCustomerID-_-storeID]-_-attributes
					var empty = (typeof attributes === "undefined");
					var result = (empty)? storeID : storeID + "-_-" + attributes;
					return result;
				};
				
				var getCategory = function(category) {
					var result = "";

					if (storeCode === "BN") {
						result = category;
					}
					else {
						result = "WL:" + storeCode;
					}
					return result;
				};
				
				var getPageId = function(pageId) {
					var result = "";
					
					if (storeCode === "BN") {
						result = pageId;
					}
					else {
						result = storeCode + "-" + pageId;
					}
					result = result.substr(0, 250); // no more than 250 chars.
					return result;
				};

				var asterTracking = function(ean){
					var onlyDigits = new RegExp(/^[0-9]+$/), pEan;
					// Some product id's might not only be EAN, could be concatenated; if concat move to else
					// and try to determine from page url.
					if(onlyDigits.test(ean)){
						pEan = ean;
						BN.Analytics.BNTracking.createProductTag(pEan);
					}else if(BN.Analytics && BN.Analytics.BNTracking){
						pEan = BN.Analytics.BNTracking.getEan();
						BN.Analytics.BNTracking.createProductTag(pEan);
					}	
					return true;
				};
				
				cmCreateRegistrationTag = function(customerID, customerEmail, customerCity, customerState, customerZIP, attributes) {
					var empty = (typeof attributes === "undefined");
					var numberOfAttributes, revisedAttributes;
					var levels = "-_--_--_--_--_-";
					if(empty){
						revisedAttributes = levels + extraAttr;
					}else{
						numberOfAttributes = attributes.split("-_-").length;
						revisedAttributes = (numberOfAttributes == 5) ? (attributes+ "-_-" + extraAttr) : (levels + extraAttr + "-_-" + attributes);
					}
					fns["cmCreateRegistrationTag"](customerID, customerEmail, customerCity, customerState, customerZIP, revisedAttributes);
					
					if(typeof cmCreateCustomRegTag !== "undefined"){
						cmCreateCustomRegTag(bnCustomerID);
					}
				};

				cmCreateManualPageviewTag = function(pageID, categoryID, destinationURL, referringURL) {
					pageID = getPageId(pageID);
					categoryID = getCategory(categoryID);
					fns["cmCreateManualPageviewTag"](pageID, categoryID, destinationURL, referringURL, bnCustomerID, bnURL, storeID);
				};

				cmCreatePageviewTag = function(pageID, categoryID, searchString, searchResults, attributes) {
					try {
						var customAttributes = getPrefixedStoreAttributes(attributes), experimentID, variationID;
						pageID = getPageId(pageID);
						categoryID = getCategory(categoryID);
						
						// does ab object exist? if so get experimentID and variationID
						if(BN&&BN.Page&&BN.Page.Metrics&&BN.Page.Metrics.AB) {
							var ab = BN.Page.Metrics.AB;
							experimentID = ab.experimentId;
							variationID = ab.variationId;
						}						
						if(BN&&BN.Page&&BN.Page.UserRecognized) {
							var nized = BN.Page.UserRecognized;
							experimentID = nized.isRecognized;
						}
						fns["cmCreatePageviewTag"](pageID, categoryID, searchString, searchResults, customAttributes, bnCustomerID, bnURL, storeID, experimentID, variationID);
	
						if(pageID.indexOf('PRODUCT:') >= 0 || pageID.indexOf('Product Page') >= 0){
							asterTracking(productEan);
						}
					} catch (e) {}
				};

				cmCreateProductviewTag = function(productID, productName, categoryID, attributes) {
					var customAttributes = getPrefixedStoreAttributes(attributes);
					categoryID = getCategory(categoryID);
					fns["cmCreateProductviewTag"](productID, productName, categoryID, customAttributes, bnCustomerID, storeID);
					productEan = productID;
				};

				cmCreateShopAction5Tag = function(productID, productName, productQuantity, productPrice, categoryID, attributes) {
					var customAttributes = getPrefixedStoreAttributes(attributes);
					categoryID = getCategory(categoryID);
					fns["cmCreateShopAction5Tag"](productID, productName, productQuantity, productPrice, categoryID, customAttributes, bnCustomerID, storeID);
				};

				cmCreateShopAction9Tag = function(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, attributes) {
					var customAttributes = getPrefixedStoreAttributes(attributes);
					categoryID = getCategory(categoryID);
					fns["cmCreateShopAction9Tag"](productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, customAttributes, bnCustomerID, storeID);
				};

				cmCreateOrderTag = function(orderID, orderTotal, orderShipping, customerID, customerCity, customerState, customerZIP, attributes) {
					var customAttributes = getPrefixedStoreAttributes(attributes);
					fns["cmCreateOrderTag"](orderID, orderTotal, orderShipping, customerID, customerCity, customerState, customerZIP, customAttributes, bnCustomerID, storeID);
				};
            };

            try {
                setupCoremetricsProxy();
            }
            catch (e1) {
                if (typeof console !== "undefined") {
                    var c = console.log;
                    c("Error: " + e1.message);
                }
                throw e1;
            }
        }
        catch(e2) {
            if (typeof console !== "undefined") {
                var c = console.log;
                c("Error: " + e2.message);
            }
            throw e2;
        }
    }
})();




