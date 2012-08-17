var GoogleAnalytics = GoogleAnalytics || {};

GoogleAnalytics.Events = GoogleAnalytics.Events || {};

GoogleAnalytics.Events.ShareButtonClicked = ( function() {
	function occurred(shareType){
		pageTracker._trackEvent('ShareThis', shareType);
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PDPAddToWishlistClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Wishlist');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PDPCheckStoreClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Visible_Prod_Details_Stores');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PDPAddToCartClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Basket');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.CartAddToWishlistClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Wishlist');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.CartRemoveClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Remove_from_Cart');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PQVAddToWishlistClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Wishlist');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PQVAddToCartClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Basket');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.PQVCheckStoreClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Visible_Prod_Details_Stores');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.WishlistAddToCartClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Add_Prod_to_Basket');
	}
	return {
		occurred: occurred
	}
}());

GoogleAnalytics.Events.WishlistSendClicked = ( function() {
	function occurred(){
		pageTracker._trackEvent('Inventory', 'Send_Wishlist');
	}
	return {
		occurred: occurred
	}
}());




