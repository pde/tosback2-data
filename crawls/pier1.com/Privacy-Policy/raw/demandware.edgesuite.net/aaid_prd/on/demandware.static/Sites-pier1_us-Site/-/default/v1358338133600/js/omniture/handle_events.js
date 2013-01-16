var Omniture = Omniture || {};

Omniture.Events = Omniture.Events || {};

Omniture.Events = ( function() {
	function save(){
		/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
		var s_code=s.t();if(s_code)document.write(s_code);
	}
	return {
		save: save
	}
}());

Omniture.Events.HomePageCarouselOpen = ( function() {
	function occurred(){
		s.events = 'scCarouselOpen';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.LeftNavRefinementAdded = ( function() {
	function occurred(object){
		s.events = 'sc' + object.text().replace(' ', '') + 'Added';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());


Omniture.Events.BreadcrumbRefinementRemoved = ( function() {
	function occurred(object){
		s.events = 'scBreadcrumb' + object.parent().text().replace(/[\s\t]/g, '') + 'Remove';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PDPAddToCartClicked = ( function() {
	function occurred(){
		s.events = 'scAddToBasket';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PQVAddToCartClicked = ( function() {
	function occurred(){
		s.events = 'scAddToBasket';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PDPAddToWishlistClicked = ( function() {
	function occurred(){
		s.events = 'scAddToWishlist';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PQVAddToWishlistClicked = ( function() {
	function occurred(){
		s.events = 'scAddToWishlist';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PDPCarouselImageClicked = ( function() {
	function occurred(){
		s.events = 'scImageCarouselClick';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.PDPCrossSellingPageClicked = ( function() {
	function occurred(object){
		s.events = 'scCrossSellCarouselClick';
		s.eVar7 = object.attr("href");
		s.eVar8 = object.attr("title");
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.WishlistSendCancelClicked = ( function() {
	function occurred(object){
		s.events = 'scCancel';  
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());

Omniture.Events.WishlistAddToCartClicked = ( function() {
	function occurred(){
		s.events = 'scAddToCart';
		
		s.pageName = "Wish List:Edit";
		s.channel = "Wish List > Edit";
	    s.pageType = "";
		
		Omniture.Events.save();
	}
	return {
		occurred: occurred
	}
}());


