var $minCart = {};

$minCart.refeshMiniCart = function() {
	if (cookieManager !== undefined || cookieManager !== null) {
    	cookieManager.initializeMasterCookie();

	var itemsInCart = getTHDNumberItemsInCart();

        if (itemsInCart !== '0' && itemsInCart !== '') {
        	if(itemsInCart > 999){
        		$("#miniCartNum").text("999+");
        	}else{
            	$("#miniCartNum").text(itemsInCart);
        	}
            $("a#cart").addClass('btn-orange');
        }
	}
};
