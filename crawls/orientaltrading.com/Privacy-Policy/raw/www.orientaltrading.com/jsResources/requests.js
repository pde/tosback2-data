(function($){

	amplify.request.define( "otc.cart", "ajax", {
		url:"/pageflowIgnore/shoppingCartModal",
		dataType: "html",
		cache: false
	});
	
	amplify.request.define( "otc.quickitem", "ajax", {
		dataType: "html",
		url: "/ui/browse/processRequest.do?requestURI=productQuickView&sku={sku}",
		cache: 86400000 // 1 day
	});
	
	amplify.request.define( "otc.productMain", "ajax", {
		dataType: "html",
		url: "/ui/browse/processRequest.do?requestURI=processProductsCatalog&sku={sku}",
		cache: 86400000 // 1 day
	})
	
	amplify.request.define( "otc.quickcart", "ajax", {
		dataType: "html",
		type :"POST",
		url: "/ui/order/processRequest.do?requestURI=shoppingBagQuickView",
		cache: false
	});
	amplify.request.define( "otc.catalogmodal", "ajax", {
		dataType: "html",
		url: "/{catalog}.html",
		cache: 86400000 // 1 day
	});
	
})(jQuery);