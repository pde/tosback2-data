
function CMTagGenerator(
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
    if(typeof(temp) !== 'undefined' && typeof(orderData) !== 'undefined' && orderData!=null){
       orderData.orderSubtotal = temp;
 //      alert(orderData.orderSubtotal);
     }

   if(typeof(tempDiscountPer) !== 'undefined' && typeof(cartData) !== 'undefined' && cartData!=null){
//alert(cartData.discountPrice);
       if(cartData.discountPrice>0){	
	       cartData.discountPrice = cartData.discountPrice - (cartData.discountPrice * tempDiscountPer);
		cartData.discountPrice = cartData.discountPrice.toFixed(2);
	}	
  //     alert(cartData.discountPrice);
	
     }
 CMBaseTagGenerator.call(
                this,
                productId, productName, categoryId, categoryName,
                customerData, orderData, cartData, searchData, optData);


//-------------------------------------------------------------------------
//  Support Code
//-------------------------------------------------------------------------
    
    this.giftWizardCategory = "gift finder(2868310)";
	
	this.productAdditionalAttrib =	function()
	{
        return (this.optData && this.optData["prodCmAdditionalAttrib"])
			? this.optData["prodCmAdditionalAttrib"].replace(/&#174;/g, "®").replace(/&amp;#174;/g, "®").replace(/\u00E2\u0084\u00A2/g, "™").replace(/&#8482;/g, "™").replace(/&amp;#8482;/g, "™") + "-_-" + cartData.quantity
			:  cartData.quantity;
	};
	this.productOptData = function()
	{
		return (this.optData['productAttrib1']+'-_-'+this.optData['productAttrib2']+'-_-'+this.getProductReviewCountAttrib()+this.getProductReviewAvgAttrib()+this.getProductReviewBuyAgainAttrib()+this.optData['productAttrib6']+'-_-'+this.optData['productAttrib7']+'-_-'+this.optData['productAttrib8']+'-_-'+this.optData['productAttrib9']+'-_-'+this.optData['productAttrib10']);
	};
	this.getBaseCategoryId = function()
    {
        return this.categoryName + "(" + this.categoryId + ")";
    };


    this.getNavCategoryId = function()
    {
        return (this.optData && this.optData["navCategory"])
             ? this.optData["navCategory"]
             : this.getBaseCategoryId();
    };


    this.getUpdatedProductName = function()
    {
        return (this.optData && this.optData["bbwFragranceClr"])
             ? this.productName + " - " + this.optData["bbwFragranceClr"]
             : this.productName;
    };
	   this.getReviewCount = function()
    {
        return (typeof gsibvReviewCount != 'undefined')
               ? gsibvReviewCount 
               : null;
    };


    this.getReviewAvg = function()
    {
        return (typeof gsibvAvgRating != 'undefined' )
               ? gsibvAvgRating 
               : null;
    };


    this.getReviewOnlyCount = function()
    {
        return (typeof gsibvRatingsOnlyCount != 'undefined' )
               ? gsibvRatingsOnlyCount 
               : null;
    };


    this.getReviewBuyAgain = function()
    {
        return (typeof gsibvBuyAgainPercent != 'undefined' )
               ? gsibvBuyAgainPercent
               : null;
    };



    this.getProductReviewCountAttrib = function()
    {
        return (typeof gsibvReviewCount != 'undefined' && gsibvReviewCount != null)
               ? (gsibvReviewCount +'-_-')
               : '-_-';
    };


    this.getProductReviewAvgAttrib = function()
    {
        return (typeof gsibvAvgRating != 'undefined' && gsibvAvgRating != null)
               ? (gsibvAvgRating +'-_-')
               : '-_-';
    };


    this.getProductReviewOnlyCountAttrib = function()
    {
        return (typeof gsibvRatingsOnlyCount != 'undefined' && gsibvRatingsOnlyCount != null)
               ? (gsibvRatingsOnlyCount + '-_-')
               : '-_-';
    };


    this.getProductReviewBuyAgainAttrib = function()
    {
        return (typeof gsibvBuyAgainPercent != 'undefined' && gsibvBuyAgainPercent != null)
               ? ( gsibvBuyAgainPercent + '-_-')
               : '-_-';
    };

	
	this.getShopBagName = function()
	{
		return (shopBagPageName != 'null')
			? shopBagPageName
			: 'CHECKOUT: Shopping Bag';
	};

	this.getShopCartPopupPageName = function()
	{
		return (shopCartPopupPageName != 'null')
			   ? shopCartPopupPageName
			   : 'POPUP: Shopping Cart Suggestive Sell';
	};

	this.getBillingAddressPageName = function()
	{
		return (billingAddressPageName != 'null')
			   ? billingAddressPageName
			   : 'CHECKOUT: Billing Address';
	};

	this.getShippingAddressPageName = function()
	{
		return (shippingAddressPageName != 'null')
			   ? shippingAddressPageName
			   : 'CHECKOUT: Shipping Address';
	};

	this.getItemDestPageName = function()
	{
		return (itemDestPageName != 'null')
			   ? itemDestPageName
			   : 'CHECKOUT: Choose Item Destinations';
	};
	this.getShipOptionPageName = function()
	{
		return (shipOptionPageName != 'null')
			   ? shipOptionPageName
			   : 'CHECKOUT: Shipping Option';
	};
	this.getGiftWrapPageName = function()
	{
		return (giftWrapPageName != 'null')
			   ? giftWrapPageName
			   : 'CHECKOUT: Gift Wrap';
	};
	this.getPaymentPageName = function()
	{
		return (paymentPageName != 'null')
			   ? paymentPageName
			   : 'CHECKOUT: Payment';
	};

	this.getConfirmOrderPageName = function()
	{
		return (confirmOrderPageName != 'null')
			   ? confirmOrderPageName
			   : 'CHECKOUT: Confirm Order';
	};

	this.getOrderReceiptPageName = function()
	{
		return (orderReceiptPageName != 'null')
			   ? orderReceiptPageName
			   : 'CHECKOUT: Order Receipt';
	};


//-------------------------------------------------------------------------
//  Shadow methods
//-------------------------------------------------------------------------

    this._homePage = function()
    {
        return "cmCreateTechPropsTag("
             +      "\'Home Page\', \'MAIN PAGES\');";
    };


    this._categoryPage = function()
    {
        if ((typeof isShortcutPage != 'undefined') && isShortcutPage)
        {
            return "cmCreatePageviewTag("
                 +      "'ShoppingShortcuts:Landing page:' + this.getBaseCategoryId(), "
                 +      "null, this.getBaseCategoryId(), null);";
        }
        else
        {
            return "cmCreatePageviewTag("
                 +      "\'JUMP PAGE:\' + this.getBaseCategoryId(), "
                 +      "null, this.getBaseCategoryId(), null);";
        }
    };


    // family pages are used for gift cards/certificates
    this._familyPage = function()
    {
        return "cmCreatePageviewTag("
             +      "\'FAMILY:" + this.categoryName + "(" + this.categoryId + ")\', "
             +      "null, this.getBaseCategoryId(), null);";
    };




    this._productPage = function()
    {
		if ((typeof this.optData != 'undefined') && (this.optData != null) && (typeof this.optData["productAttrib1"] != 'undefined'))
        {
		return "cmCreateProductviewTag("
             +      "productId, this.getUpdatedProductName(), "
             +      "this.getNavCategoryId(), "
             +      "this.getReviewCount(), this.getReviewAvg(), "
             +      "this.getReviewOnlyCount(), this.getReviewBuyAgain(), "
             +      "'N', 'N',null,null,this.productOptData());";
        }
        else
        {
		return "cmCreateProductviewTag("
             +      "productId, this.getUpdatedProductName(), "
             +      "this.getNavCategoryId(), "
             +      "this.getReviewCount(), this.getReviewAvg(), "
             +      "this.getReviewOnlyCount(), this.getReviewBuyAgain(), "
             +      "'N', 'N',null,null);";
        }
    };


    this._crossSell = function()
    {
        return "cmCreateProductviewTag("
             +      "productId, this.getUpdatedProductName(), "
             +      "'CROSS:' + this.getNavCategoryId(), "
             +      "this.getReviewCount(), this.getReviewAvg(), "
             +      "this.getReviewOnlyCount(), this.getReviewBuyAgain(), "
             +      "'N', 'Y');";
    };


    this._expressShop = function()
    {
        return "cmCreateExpressProductviewTag("
             +      "productId, this.getUpdatedProductName(), "
             +      "this.getNavCategoryId());";
    };


    this._expressShopViewDescription = function()
    {
        return "cmCreatePageviewTag("
             +      "\'EXPRESS SHOP: MORE INFO: FULL DESCRIPTION', "
             +      "null, "
             +      "\'SHOPPING BAG', "
             +      "null);";
    };


    this._expressShopAddToCart = function()
    {
        return "cmCreatePageviewTag("
             +      "\'EXPRESS SHOP: ADD TO BAG ACTION', "
             +      "null, "
             +      "\'SHOPPING BAG', "
             +      "null);";
    };
    
    
    this._addToCart = function()
    {
        return "cmCreatePageviewTag("
             +      "\'SHOPPING BAG:Add\', "
             +      "null, "
             +      "\'SHOPPING BAG\', "
             +      "null);";
    };


    this._cartStart =  function()
    {
		 return "cmCreatePageviewTag("
             +      "this.getShopBagName(), "
             +      'null, '
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._cartProduct = function()
    {
         if ((typeof this.optData != 'undefined') && (this.optData != null) && (typeof this.optData["prodCmAdditionalAttrib"] != 'undefined'))
        {
			 if ((typeof cartData.discountPrice != 'undefined') && (cartData.discountPrice != null))
			{
				return "cmCreateShopAction5Tag("
				+      "productId, this.getUpdatedProductName(), "
				+      "cartData.quantity, cartData.discountPrice, "
				+      "this.getNavCategoryId(),this.productAdditionalAttrib());";
			}
			else
			{
				return "cmCreateShopAction5Tag("
				 +      "productId, this.getUpdatedProductName(), "
				 +      "cartData.quantity, cartData.unitPrice, "
				 +      "this.getNavCategoryId(),this.productAdditionalAttrib());";
			}
        }
        else
        {
			if ((typeof cartData.discountPrice != 'undefined') && (cartData.discountPrice != null))
			{
				return "cmCreateShopAction5Tag("
				+      "productId, this.getUpdatedProductName(), "
				+      "cartData.quantity, cartData.discountPrice, "
				+      "this.getNavCategoryId());";
			}
			else
			{
				return "cmCreateShopAction5Tag("
				+      "productId, this.getUpdatedProductName(), "
				+      "cartData.quantity, cartData.unitPrice, "
				+      "this.getNavCategoryId());";
			}
		
        }
    };


    this._cartEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._cartSuggestiveSell = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getShopCartPopupPageName(), "
             +      "null, "
             +      "\'CHECKOUT', "
             +      "null);";
    };


    this._minicartStart = null;


    this._minicartProduct = function()
    {
		if ((typeof cartData.discountPrice != 'undefined') && (cartData.discountPrice != null))
		{
			return "cmCreateShopAction5Tag("
             +      "productId, this.getUpdatedProductName(), "
             +      "cartData.quantity, cartData.discountPrice, "
             +      "this.getNavCategoryId());";
		}
		else
		{
			return "cmCreateShopAction5Tag("
             +      "productId, this.getUpdatedProductName(), "
             +      "cartData.quantity, cartData.unitPrice, "
             +      "this.getNavCategoryId());";
		}
        
    };


    this._minicartEnd = function()
    {
        return "cmDisplayShop5s();";
    };


    this._wishlistStart =  function()
    {
        return "cmCreatePageviewTag("
             +      "\'CHECKOUT: Wish List\', "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._wishlistProduct = null;
    this._wishlistEnd = null;



    this._checkoutBillAddress = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getBillingAddressPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };



    this._checkoutShipAddress = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getShippingAddressPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._checkoutShipMethod = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getShipOptionPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._checkoutPayment = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getPaymentPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._checkoutConfirm = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getConfirmOrderPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };


    this._checkoutReceiptStart = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getOrderReceiptPageName(), null, \'CHECKOUT\', null);"
             + "cmCreateRegistrationTag("
             +      "customerData.customerEmail, customerData.customerEmail, "
             +      "customerData.customerCity, customerData.customerState, "
             +      "customerData.customerZip);"
    };


    this._checkoutReceiptItem = function()
    {
         if ((typeof this.optData != 'undefined') && (this.optData != null) && (typeof this.optData["prodCmAdditionalAttrib"] != 'undefined'))
        {
			 if ((typeof cartData.discountPrice != 'undefined') && (cartData.discountPrice != null))
			{
				return "cmCreateShopAction9Tag("
				 +      "productId, this.getUpdatedProductName(), "
				 +      "cartData.quantity, cartData.discountPrice, "
				 +      "customerData.customerEmail, orderData.orderId, "
				 +      "orderData.orderSubtotal, this.getNavCategoryId(),this.productAdditionalAttrib());";
			}
		     else
			{
				return "cmCreateShopAction9Tag("
				 +      "productId, this.getUpdatedProductName(), "
				 +      "cartData.quantity, cartData.unitPrice, "
				 +      "customerData.customerEmail, orderData.orderId, "
				 +      "orderData.orderSubtotal, this.getNavCategoryId(),this.productAdditionalAttrib());";
			}
        }
        else
        {
			if ((typeof cartData.discountPrice != 'undefined') && (cartData.discountPrice != null))
			{
				return "cmCreateShopAction9Tag("
				+      "productId, this.getUpdatedProductName(), "
				+      "cartData.quantity, cartData.discountPrice, "
				+      "customerData.customerEmail, orderData.orderId, "
				+      "orderData.orderSubtotal, this.getNavCategoryId());";
			}
		     else
			{
				 return "cmCreateShopAction9Tag("
				 +      "productId, this.getUpdatedProductName(), "
				 +      "cartData.quantity, cartData.unitPrice, "
				 +      "customerData.customerEmail, orderData.orderId, "
				 +      "orderData.orderSubtotal, this.getNavCategoryId());";
			}	
		
        }
    };


	 this._checkoutReceiptEnd = function()
    {
        return "cmDisplayShop9s();"
             + "cmCreateOrderTag("
             +      "orderData.orderId, orderData.orderSubtotal, "
             +      "orderData.orderSH, customerData.customerEmail,'','','',optData.cmorderattribute);";
    };


    this._orderStatus = function()
    {
        return "cmCreatePageviewTag("
             +      "\'CHECKOUT: Order Status\', "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };

	 this._itemDes = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getItemDestPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };

	 this._giftWrap = function()
    {
        return "cmCreatePageviewTag("
             +      "this.getGiftWrapPageName(), "
             +      "null, "
             +      "\'CHECKOUT\', "
             +      "null);";
    };

    this.login  = function() { this.execute("_login"); };
    this._login = function()
    {
        var pageId = "CHECKOUT: Login";
        if (this.optData && this.optData["loginType"])
        {
            pageId = "CHECKOUT: " + this.optData["loginType"];
        }

        return "cmCreatePageviewTag("
             +      "\'" + pageId + "\', null, \'CHECKOUT\', null);";
    };

    this.myAccount = function() { this.execute("_myAccount"); };

    this._myAccount = function()
    {
        return "cmCreatePageviewTag("
             +      "\'CHECKOUT: My Account Main Menu\', null, \'CHECKOUT\', null);";
    };
    this.recentlyViewed = function() { this.execute("_recentlyViewed"); }; 
    this._recentlyViewed = function()
    {
        return "cmCreatePageviewTag("
             +      "\'CHECKOUT: Recently Viewed\', null, \'CHECKOUT\', null);";
    };
	
	this.orderTracking = function() { this.execute("_orderTracking"); }; 
    this._orderTracking = function()
    {
        return "cmCreatePageviewTag("
             +      "\'CHECKOUT: Order Status\', null, \'CHECKOUT\', null);";
    };



    // when we re-enable registration tagging, delete this line and let
    // super do all the work
    this._registration = null;

	this._emailSignup = function()
    {
        return "cmCreatePageviewTag("
             +      "\'SIGN UP FOR EMAIL: Registration\', null, "
             +      "\'MAIN PAGES\', null);";
    };
	this.emailSignupConfirm = function() { this.execute("_emailSignupConfirm"); };
    this._emailSignupConfirm = function()
    {
        return "cmCreatePageviewTag("
             +      "\'SIGN UP FOR EMAIL: Confirmation\', null, "
             +      "\'MAIN PAGES\', null);";
    };


    this._super_genericPageview = this._genericPageview;
    this._genericPageview = function()
    {
        if (this.optData && this.optData["categoryPrefix"])
        {
        }
        else
        {
            return this._super_genericPageview();
        }
    };


    this._genericPageview = function()
    {
        if (this.optData && this.optData["pageId"] && this.optData["categoryId"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['pageId'], null, "
                 +      "this.optData['categoryId'], null);";
        }
        else if (this.optData && this.optData["pageId"])
        {
            //return "cmCreatePageviewTag("
            //     +      "this.optData['pageId'], null, "
            //     +      "null, null);";
        }
        else if (this.optData && this.optData["categoryPrefix"])
        {
            return "cmCreatePageviewTag("
                 +      "this.optData['categoryPrefix'] + this.getBaseCategoryId(), "
                 +      "null, this.categoryId, null);";
        }
        else
        {
            return "cmCreatePageviewTag("
                 +      "'GENERIC PAGE', null, 'GENERIC', null);";
        }
    };


//-------------------------------------------------------------------------
//  BBW-specific tagging
//-------------------------------------------------------------------------

    this.addAllToCart = function() { this.execute("_addAllToCart"); };

    this._addAllToCart = function()
    {
        return "cmCreatePageviewTag("
             +      "\'SHOPPING BAG:add all\', "
             +      "null, "
             +      "this.getBaseCategoryId(), "
             +      "null);";
    };

    this.giftWizardResults = function() { this.execute("_giftWizardResults"); };

    this._giftWizardResults = function()
    {     
        return "cmCreatePageviewTag("
             +      "\'GIFT FINDER:results\', "
             +      "\'\', "
             +      "this.giftWizardCategory, "
             +      "searchData.resultCount,null,"
			 +      "this.optData['giftWizardAttribValue']);";
    };

	this.giftFinderResults = function() { this.execute("_giftFinderResults"); };

    this._giftFinderResults = function()
    {     
        return "cmCreatePageviewTag("
             +      "\'GIFT FINDER:results\', "
             +      "\'\', "
             +      "this.giftWizardCategory, "
             +      "searchData.resultCount,null,"
			 +      "this.optData['giftFinderAttribValue']);";
    };

    this.storeLocatorPage = function() { this.execute("_storeLocatorPage"); };
	this._storeLocatorPage=function()
    {
      return "cmCreateConversionEventTag("
             +      "this.optData['pageID'], "
             +      "this.optData['pageNum'], "
             +      "this.optData['pageType'], "
	         +	    "this.optData['pageSeq'],"	
             +      "this.optData['zipcode']);"
	}; 
	this.bbwFamilyPage = function() { this.execute("_bbwFamilyPage"); };
	this._bbwFamilyPage=function()
    {
        return "cmCreatePageviewTag("
             +      "\'FAMILY:" + this.categoryName + "(" + this.categoryId + ")\', "
             +      "null, this.getBaseCategoryId(), null,null,"
			 +       "this.optData['familyAttribValue']);";

	}; 
	this.bbwSmallCollectionPage = function() { this.execute("_bbwSmallCollectionPage"); };
	this._bbwSmallCollectionPage=function()
    {
        return "cmCreatePageviewTag("
             +      "\'Small Collection:" + this.categoryName + "(" + this.categoryId + ")\', "
             +      "null, this.getBaseCategoryId(), null,null,"
			 +       "this.optData['familyAttribValue']);";

	}; 
		this.bbwLargeMediumCollectionPage = function() { this.execute("_bbwLargeMediumCollectionPage"); };
		this._bbwLargeMediumCollectionPage=function()
    {
        return "cmCreatePageviewTag("
             +      "\'Medium to Large Collection:" + this.categoryName + "(" + this.categoryId + ")\', "
             +      "null, this.getBaseCategoryId(), null,null,"
			 +       "this.optData['familyAttribValue']);";

	}; 
	  this.searchResults = function() { this.execute("_searchResults"); };
	  this._searchResults = function()
    {
        return "cmCreatePageviewTag("
             +      "'SEARCH RESULTS: PAGE ' + searchData.searchPage, "
             +      "searchData.searchTerm, "
             +      "searchData.searchType, "
             +      "searchData.resultCount,null,"
			 +		"this.optData['searchAttribValue']);";
    };
};
