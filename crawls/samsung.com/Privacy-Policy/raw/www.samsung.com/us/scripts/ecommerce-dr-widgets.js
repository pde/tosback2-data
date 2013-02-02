var dr_store_domain = 'http://shop.us.samsung.com';
$(document).ready (function () {

	$(function() {
		var jversion = jQuery.fn.jquery;
		if (jversion < '1.5.2' || window.location.pathname.indexOf('support') > 0) {
			// var $jquery132 = $('head').find('script[src="/us/scripts/jquery-1.3.2.js"]').remove();
			$('head').append('<script type="text/javascript" src="/us/scripts/jquery-1.7.2.min.js"></script>');
		}
	});

	loadDRCartSummary();
	$('.cart').live('mouseenter', function() {
			$('.miniCartLink').addClass('open');
			$('.miniCart').show();
			var productString = $('div#miniCart input#productString').val();
			//do_mouseover_cart(productString);
		}).live('mouseleave', function() {
			$('.miniCartLink').removeClass('open');
            $('.miniCart').hide();
		});
	if (window.location.pathname.indexOf('-buy') > 0) {
		var eCommerceYes = $('input#prd_mdl_ecom_fl').val();
		if (eCommerceYes == 'Y') {
			var dr_productModelCode = omn_ss_productModelCode;
			dr_productModelCode = dr_productModelCode.replace('/', '_');
			dr_DisplayDRProductInfo_url = dr_store_domain +'/store/samsung/DisplayDRProductInfo/externalReferenceID.'+ dr_productModelCode +'/output.JSON/content.sku+stockStatus+buyLink+productInventory/';
			$.ajax({
				url: dr_DisplayDRProductInfo_url,
				dataType: 'jsonp',
				data: 'jsonp=callbackDRProductInfo',
				timeout: 15000,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (textStatus != 'parsererror') {
						$('.product-marketplace .twocol .eCommerceDefault').css('visibility', 'visible');
						$.post('/us/common/handleerr.do', {error: 'DR Widget unreachable', request: dr_DisplayDRProductInfo_url, response: 'Ajax error: ' + textStatus});
					}
				}
			});
		}
		else {
			$('.product-marketplace .twocol .eCommerceDefault').css('visibility', 'visible');
		}
	}
});

function loadDRCartSummary() {
	$.ajax({
		url: dr_store_domain +'/store/samsung/DisplayDRCartSummary/Version.2/output.json',
		dataType: 'jsonp',
		data: 'jsonp=callbackDRCartSummary'
	});
}

function callbackDRCartSummary(cartSummaryData) {
    var mobileAccessoriesText = '<div class="mobile-cart-notice">'
        + '<em>Don&#39;t see an item you added?</em>'
        + 'There is a separate cart for mobile accessories.'
        + '<a class="blue-arrow link-style view-tagging" href="https://mobile.samsung.com/accessories/modifyitem.do">View Samsung Mobile Accessories Cart</a>'
        + '</div>';

    if (cartSummaryData && cartSummaryData.lineItems > 0) {
        var cartItems = cartSummaryData.lineItems;
        $('.cart .icon-cart').html('CART (' + cartItems + ')');

        ShoppingCartService = new function() {
            return {
                callback : function(shoppingCartData) {
                    if (shoppingCartData && shoppingCartData["ns1:GetShoppingCartResponse"].errorCode == 0) {
                        var shoppingCartLineItems = shoppingCartData["ns1:GetShoppingCartResponse"].shoppingCartLineItems;
                        if ( !$.isArray(shoppingCartLineItems) ) {
                            shoppingCartLineItems = [shoppingCartLineItems]; //if 1 item in cart
                        }
                        var itemsCount = shoppingCartLineItems.length;
                        var outputHtml = '<div class="top-corner"></div>'
                            + '<div class="cart-container">';
                        var productString = '';
                        if (itemsCount > 0) {
                            var cartFullText = '';
                            var showItems = itemsCount;
                            if (itemsCount > 4) {
                                showItems = 4;
                                cartFullText = '<span>(' + cartItems + ') items</span>';
                            }
                            for (var i = 0; i < showItems; i++) {
                                var scItem = shoppingCartLineItems[i];
                                var productID = scItem.requisitionLineItemKey.productKey.productID;
                                var externalReferenceID = scItem.requisitionLineItemKey.productKey.externalReferenceID;
                                productString = productString + externalReferenceID + ' ';
                                var qty = scItem.quantity;
                                var displayName = scItem.lineItemProductInfo.baseFields.displayName;
                                var price = scItem.lineItemProductInfo.pricing.formattedTotalPriceWithDiscount;
                                var imageSrc = '';
                                if (scItem.lineItemProductInfo.attributes.name == 'thumbnail') {
                                    imageSrc = scItem.lineItemProductInfo.attributes.value;
                                }
                                imageSrc = imageSrc.indexOf('http') == 0 ? imageSrc : dr_store_domain + '/DRHM/Storefront/Company/samsungamericas/images/product/thumbnail/' + imageSrc;
                                var drPopupUrl = dr_store_domain +'/DRHM/store?Action=DisplayPage&SiteID=samsung&Locale=en_US&id=ProductInterstitialDetailsPage&parentPageName=Cart&productID=' + productID;
                                var ss_link = 'ss_link_click_track_2(\'\',\'event43\',\''+ externalReferenceID +'\',\'\', \'cart_flyout\', \'o\', \'prod_popup\')';
                                var row = '<div class="mini-cart-item" style="clear: both;">'
                                    + '<div><img width="70" height="70" src="' + imageSrc + '"/></div>'
                                    + '<div class="product-details"><a id="product-name" class="link-style dr_scs_cart_prod_name_link" target="_blank" href="'+ drPopupUrl +'" onclick="popUp(this.href,\'details\',650,400);'+ ss_link +';return false;">' + displayName +'</a>'
                                    + '<span id="module-number" class="module-number">' + externalReferenceID +'</span></div>'
                                    + '<div class="product-purchase-details"><div class="quantity">QTY: ' + qty + '</div>'
                                    + '<div class="price">' + price + '</div></div>'
                                    + '</div>';
                                outputHtml = outputHtml + row;
                            }
                            var subTotal = shoppingCartData["ns1:GetShoppingCartResponse"].reqLevelPricing.formattedSubTotalPriceWithDiscount;
                            outputHtml = outputHtml + '<div class="purchase-container" style="clear: both;">'
                                + '<span class="cart-total">Subtotal: ' + subTotal + '</span>'
                                + '<a class="view-cart-link link-style" href="'+ dr_store_domain +'/store/samsung/cart" onclick="javascript:ss_link_click_track_2(\'\',\'\',\'\',\'\', \'cart_flyout\', \'o\', \'view_cart\');">View Product Cart'
                                + cartFullText + '</a>'
                                + '<a class="reg-btn checkout-link" href="'+ dr_store_domain +'/DRHM/store?Action=DisplayThreePgCheckoutAddressPaymentInfoPage&SiteID=samsung&Locale=en_US" onclick="javascript:ss_link_click_track_2(\'\',\'\',\'\',\'\', \'cart_flyout\', \'o\', \'checkout\');"><span>Checkout</span></a>'
                                + '</div>';
                        }
                        outputHtml = outputHtml + mobileAccessoriesText + '</div>';
                        outputHtml = outputHtml + '<input id="productString" type="hidden" value="'+ productString + '">';
                        $('.miniCart').html(outputHtml);
                    }
                }
            };
        }();

        var timestamp = new Date().getTime();
        $.ajax({
            url: dr_store_domain +'/integration/job/request/ShoppingCartService/defaults/site/?%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3CGet%20siteID%3D%22samsung%22%20locale%3D%22en_US%22%3E%3CbaseFields%3E%3CdisplayName/%3E%3C/baseFields%3E%3Cattributes%3E%3Cthumbnail/%3E%3C/attributes%3E%3C/Get%3E%3C%21--jsonp=ShoppingCartService.callback--%3E%3C%21--' +timestamp+ '--%3E',
            dataType: 'jsonp',
            jsonp: false,
            cache: true
        });
    }
    else { //shopping cart is empty
        $('.cart .icon-cart').html(' CART (0)');
        var outputHtml = '<div class="top-corner"></div>'
            + '<div class="cart-container">'
            + '<div class="empty-cart mini-cart-item">Your product shopping cart is empty.</div>';
        + mobileAccessoriesText + '</div>';
        outputHtml = outputHtml + mobileAccessoriesText + '</div>';
        $('.miniCart').html(outputHtml);

        $('.cart .icon-cart').html(' CART (0)');
    }
}

//called from marketplace/index.jsp
function callbackDRProductInfo(productInfo) {
    if (productInfo && !$.isArray(productInfo) && !productInfo.error) {
        var stockStatus = productInfo.stockStatus;
        var preOrder = productInfo.productInventory.preOrder;
        var backOrder = productInfo.productInventory.backOrder;
        if (stockStatus == 'Yes' || preOrder || backOrder ) {
            var link = productInfo.buyLink.href + '/quantity.1';
            $('.product-marketplace .twocol .two-col-top .col-two a.lg-btn').attr('href', link).find('span').text('ADD TO CART');
            $('div.product-marketplace div.twocol:first-child > h2').text('Buy Direct From Samsung');
            $('div.product-marketplace div.twocol:first-child > p').text('Buy Direct From Samsung');
            $('.product-marketplace .twocol .eCommerceYes').show();
            $('.product-marketplace .twocol .eCommerceDefault').hide();
            return true;
        }
        else {
            //Omniture tagging
            omn_ss_outofstock = 'out_of_stock:[' + omn_ss_productModelCode + ']';
        }
    }
    else {
        if ($.isArray(productInfo)) {
            $.post('/us/common/handleerr.do', {error: 'DR Widget returned Array but expecting a single object', request: dr_DisplayDRProductInfo_url, response: ' arr size ' + productInfo.length});
        }
        if (productInfo && productInfo.error) {
            $.post('/us/common/handleerr.do', {error: 'DR Widget returned error', request: dr_DisplayDRProductInfo_url, response: ' error ' + productInfo.error.exception});
        }
    }
    //for any other case restore current functionality
    $('.product-marketplace .twocol .eCommerceDefault').css('visibility', 'visible');
}

function popUp(popURL, popName, popWidth, popHeight) {
    self.open(popURL, popName, 'width='+popWidth+',height='+popHeight+',resizable=yes,status=yes,screenX=50,screenY=50,top=50,left=50,scrollbars=yes');
}