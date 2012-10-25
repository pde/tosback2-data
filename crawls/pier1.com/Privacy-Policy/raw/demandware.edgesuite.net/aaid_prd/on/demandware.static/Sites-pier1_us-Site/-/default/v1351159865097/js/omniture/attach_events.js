$(".refinement-link").click(function() {
	Omniture.Events.LeftNavRefinementAdded.occurred($(this));
});

$(document).on('click', ".breadcrumb-refinement-value a.breadcrumb-relax", function() {
	Omniture.Events.BreadcrumbRefinementRemoved.occurred($(this));
});

$("#add-to-cart").click(function() {
	Omniture.Events.PDPAddToCartClicked.occurred();
});

$(document).on('click', '.quickview #add-to-cart', function() {
	Omniture.Events.PQVAddToCartClicked.occurred();
});

$(".pt_product-details a.wl-action").first().click(function() {
	Omniture.Events.PDPAddToWishlistClicked.occurred();
});

$(document).on('click', '.quickview .add-to-cart-block a.wl-action', function() {
	Omniture.Events.PQVAddToWishlistClicked.occurred();
});

$(".pt_product-details .product-primary-image a").click(function() {
	Omniture.Events.PDPCarouselImageClicked.occurred();
});

$("#product-nav-container").on('click', ".pt_product-details .product-previous a, .pt_product-details .product-next a", function() {
	Omniture.Events.PDPCrossSellingPageClicked.occurred($(this));
});

$(".pt_wish-list .add-to-cart").click(function() {
	Omniture.Events.WishlistAddToCartClicked.occurred();
});

$(document).on('click', '.preview .slideshow a[href="#product-theater"]', function() {
	Omniture.Events.HomePageCarouselOpen.occurred();
});
