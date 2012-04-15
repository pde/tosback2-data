var $minCart = {};

$minCart.refeshMiniCart = function() {
if (cookieManager  != 'undefined' || cookieManager  != null) {
                                cookieManager.initializeMasterCookie();

var itemsInCart = getTHDNumberItemsInCart();

            if (itemsInCart != '0' && itemsInCart != '') {
                $("#miniCartNum").html(itemsInCart);
                $("#miniCart").css('background-position','bottom');
            }
}
}
