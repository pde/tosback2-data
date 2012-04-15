
function gsicmExecuteDeferredTags()
{
    if ((typeof gsicmDeferredTags != 'undefined') && (gsicmDeferredTags != null))
    {
        while (gsicmDeferredTags.length > 0)
        {
            var elem = gsicmDeferredTags.shift();
            elem[0].executeNow(elem[1]);
        }

        // defect 30373 - we only want to defer on initial page load
        gsicmDeferredTags = null;
    }
};


function CMBaseTagGenerator(
    productId,
    productName,
    categoryId,
    categoryName,
    customerData,
    orderData,
    cartData,
    searchData,
    optData)
{
    this.productId      = productId;
    this.productName    = productName;
    this.categoryId     = categoryId;
    this.categoryName   = categoryName;
    this.customerData   = customerData;
    this.orderData      = orderData;
    this.cartData       = cartData;
    this.searchData     = searchData;
    this.optData        = optData;

    this.homePage               = function() { this.execute("_homePage"); };
    this.categoryPage           = function() { this.execute("_categoryPage"); };
    this.familyPage             = function() { this.execute("_familyPage"); };
    this.productPage            = function() { this.execute("_productPage"); };
    this.crossSell              = function() { this.execute("_crossSell"); };
    this.addToCart              = function() { this.execute("_addToCart"); };
    this.addToWishlist          = function() { this.execute("_addToWishlist"); };
    this.expressShop            = function() { this.execute("_expressShop"); };
    this.expressShopViewDescription = function() { this.execute("_expressShopViewDescription"); };
    this.expressShopAddToCart   = function() { this.execute("_expressShopAddToCart"); };
    this.cartStart              = function() { this.execute("_cartStart"); };
    this.cartProduct            = function() { this.execute("_cartProduct"); };
    this.cartEnd                = function() { this.execute("_cartEnd"); };
    this.cartSuggestiveSell     = function() { this.execute("_cartSuggestiveSell"); };
    this.minicartStart          = function() { this.execute("_minicartStart"); };
    this.minicartProduct        = function() { this.execute("_minicartProduct"); };
    this.minicartEnd            = function() { this.execute("_minicartEnd"); };
    this.wishlistStart          = function() { this.execute("_wishlistStart"); };
    this.wishlistProduct        = function() { this.execute("_wishlistProduct"); };
    this.wishlistEnd            = function() { this.execute("_wishlistEnd"); };
    this.checkoutBillAddress    = function() { this.execute("_checkoutBillAddress"); };
    this.checkoutShipAddress    = function() { this.execute("_checkoutShipAddress"); };
    this.checkoutShipMethod     = function() { this.execute("_checkoutShipMethod"); };
    this.checkoutPayment        = function() { this.execute("_checkoutPayment"); };
    this.checkoutConfirm        = function() { this.execute("_checkoutConfirm"); };
    this.checkoutReceiptStart   = function() { this.execute("_checkoutReceiptStart"); };
    this.checkoutReceiptItem    = function() { this.execute("_checkoutReceiptItem"); };
    this.checkoutReceiptEnd     = function() { this.execute("_checkoutReceiptEnd"); };
    this.orderStatus            = function() { this.execute("_orderStatus"); };
    this.login                  = function() { this.execute("_login"); };
    this.myAccount              = function() { this.execute("_myAccount"); };
    this.registration           = function() { this.execute("_registration"); };
    this.emailSignup            = function() { this.execute("_emailSignup"); };
    this.searchResults          = function() { this.execute("_searchResults"); };
    this.genericPageview        = function() { this.execute("_genericPageview"); };
	this.conversionEvent        = function() { this.execute("_conversionEvent"); };
	this.itemDes				= function() { this.execute("_itemDes"); };
	this.giftWrap				= function() { this.execute("_giftWrap"); };

    this.execute = function(shadowFn)
    {
        if ((typeof gsicmDeferredTags != 'undefined') && (gsicmDeferredTags != null))
            gsicmDeferredTags.push([this, shadowFn]);
        else
            this.executeNow(shadowFn);
    };


    this.executeNow = function(shadowFn)
    {
        var tags = this[shadowFn] ? this[shadowFn]() : "";
        if (tags && tags.length > 0)
        {
                 eval(tags, this);
        }
    }


//-----------------------------------------------------------------------------
// default shadow function implementations
//-----------------------------------------------------------------------------

    this._homePage = function()
    {
        return "cmCreateTechPropsTag(\"HOME\", \"HOME\");";
    };


    this._categoryPage = function()
    {
    	return "cmCreatePageviewTag("
             +      "'Category: ' + this.categoryName, "
             +      "this.categoryId, null, null);";
    };


    this._familyPage = function()
    {
    	return "cmCreatePageviewTag("
             +      "'Family: ' + this.categoryName, "
             +      "this.categoryId, null, null);";
    };


    this._productPage = function()
    {
        return "cmCreateProductviewTag(productId, productName, categoryId);";
    };


    this._expressShop = this._productPage;
    this._expressShopAddToCart = this._addToCart;


    this._cartStart =  function()
    {
        return "cmCreatePageviewTag(\"CART\", \"CART\", null, null);";
    };


    this._cartProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "categoryId);";
    };


    this._cartEnd = function()
    {
        return "cmDisplayShop5s();";
    };



    this._minicartStart =  function()
    {
        return "cmCreatePageviewTag(\"MINICART\", \"CART\", null, null);";
    };


    this._minicartProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "categoryId);";
    };


    this._minicartEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._wishlistStart =  function()
    {
        return "cmCreatePageviewTag(\"WISHLIST\", \"CART\", null, null);";
    };


    this._wishlistProduct = function()
    {
        return "cmCreateShopAction5Tag("
             +      "productId, productName, "
             +      "0, 0, "
             +      "categoryId);";
    };


    this._wishlistEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._checkoutBillAddress = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Billing Address\", \"CHECKOUT\", null, null);";
    };


    this._checkoutShipAddress = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Shipping Address\", \"CHECKOUT\", null, null);";
    };


    this._checkoutShipMethod = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Shipping Method\", \"CHECKOUT\", null, null);";
    };


    this._checkoutPayment = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Payment\", \"CHECKOUT\", null, null);";
    };


    this._checkoutConfirm = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Review\", \"CHECKOUT\", null, null);";
    };


    this._checkoutReceiptStart = function()
    {
        return "cmCreatePageviewTag(\"RECEIPT\", \"CHECKOUT\", null, null);";
    };


    this._checkoutReceiptItem = function()
    {
        return "cmCreateShopAction9Tag("
             +      "productId, productName, "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "customerData.customerId, orderData.orderId, "
             +      "orderData.orderSubtotal, categoryId);";
    };


    this._checkoutReceiptEnd = function()
    {
        return "cmDisplayShop9s();"
             + "cmCreateOrderTag("
             +      "orderData.orderId, orderData.orderSubtotal, "
             +      "orderData.orderSH, customerData.customerId);";
    };


    this._orderStatus = function()
    {
        return "cmCreatePageviewTag(\"ORDER STATUS\", \"CHECKOUT\", null, null);";
    }

	this._itemDes = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Item Destination\", \"CHECKOUT\", null, null);";
    }

	this._giftWrap = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Gift Wrap\", \"CHECKOUT\", null, null);";
    }


    this._login = function()
    {
        return "cmCreatePageviewTag(\"Checkout - Login\", \"CHECKOUT\", null, null);";
    };


    this._myAccount = function()
    {
        return "cmCreatePageviewTag(\"MYACCOUNT\", \"CHECKOUT\", null, null);";
    };


    this._registration = function()
    {
        return "cmCreateRegistrationTag("
             +      "customerData.customerId, customerData.customerEmail, "
             +      "customerData.customerCity, customerData.customerState, "
             +      "customerData.customerZip);";
    };


    this._emailSignup = function()
    {
        var newsletter = (this.optData && this.optData["newsletterName"])
                       ? this.optData["newsletterName"]
                       : "EMAIL";
        var subscribed = (this.optData && this.optData["subscribedFlag"])
                       ? this.optData["subscribedFlag"]
                       : "Y";

        return "cmCreateRegistrationTag("
             +      "customerData.customerId, customerData.customerEmail, "
             +      "customerData.customerCity, customerData.customerState, "
             +      "customerData.customerZip, "
             +      "\'" + newsletter + "\', \'" + subscribed + "\');";
    };


    this._searchResults = function()
    {
        return "cmCreatePageviewTag("
             +      "'Search Results', "
             +      "searchData.searchType, "
             +      "searchData.searchTerm, "
             +      "searchData.resultCount );";
    };


    this._genericPageview = function()
    {
        if (this.optData && this.optData["pageId"] && this.optData["categoryId"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['pageId'], this.optData['categoryId'], "
                 +      "null, null);";
        }
        else if (this.optData && this.optData["pageId"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['pageId'], null, "
                 +      "null, null);";
        }
        else if (this.optData && this.optData["categoryPrefix"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['categoryPrefix'] + this.categoryName, "
                 +      "this.categoryId, "
                 +      "null, null);";
        }
        else
        {
            return "cmCreatePageviewTag("
                 +      "'GENERIC PAGE', 'GENERIC', null, null);";
        }
    }


   	this._conversionEvent = function()
    {
     	if (this.optData && this.optData["eventId"] && this.optData["eventType"] && this.optData["categoryId"])
     	{
     		return "cmCreateConversionEventTag(this.optData['eventId'], this.optData['eventType'], this.optData['categoryId'], null);";
     	} else {
     		return "cmCreatePageviewTag('GENERIC PAGE', 'GENERIC', null, null);";
     	}
   			
     }
       		
       		
};
