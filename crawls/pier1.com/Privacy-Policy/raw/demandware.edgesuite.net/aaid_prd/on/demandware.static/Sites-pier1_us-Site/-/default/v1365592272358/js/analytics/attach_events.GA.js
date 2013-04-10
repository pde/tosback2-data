function plusone_vote(obj){
	GoogleAnalytics.Events.ShareButtonClicked.occurred('GooglePlus');
}

jQuery(document).ready(function($) {
	$.getScript('//platform.twitter.com/widgets.js', function() {
		function trackSocialIntent(intent_event) {
			if (!intent_event) { return; }
			GoogleAnalytics.Events.ShareButtonClicked.occurred('Twitter');
		}
		twttr.events.bind('click', trackSocialIntent);
	});

	if(typeof FB != 'undefined')
	{
		FB.Event.subscribe('edge.create',
			function(response) {
				GoogleAnalytics.Events.ShareButtonClicked.occurred('Facebook');
			}
		);
	}

	function shareEventHandler(evt) {
		alert('evt.type='+evt.type);
		    if (evt.type == 'addthis.menu.share'){
		    	if(evt.data.service == 'pinit'){
		    		GoogleAnalytics.Events.ShareButtonClick.occurred('Pinterest');
		    	}
		    }
	}
	addthis.addEventListener('addthis.menu.share', shareEventHandler);

});

$(".availability-block span a").click(function() {
	GoogleAnalytics.Events.PDPCheckStoreClicked.occurred();
});

$("#add-to-cart").click(function() {
	GoogleAnalytics.Events.PDPAddToCartClicked.occurred();
	});

$(".pt_product-details a.wl-action").first().click(function() {
	GoogleAnalytics.Events.PDPAddToWishlistClicked.occurred();
});

$(".cart-row .item-quantity .item-user-actions a.add-to-wishlist").first().click(function() {
	GoogleAnalytics.Events.CartAddToWishlistClicked.occurred();
});

$(".cart-row .item-quantity .item-user-actions button").last().click(function() {
	GoogleAnalytics.Events.CartRemoveClicked.occurred();
});

$(document).on('click', '.quickview #add-to-cart', function() {
	GoogleAnalytics.Events.PQVAddToCartClicked.occurred();
	});

$(document).on('click', '.quickview .add-to-cart-block a.wl-action', function() {
	GoogleAnalytics.Events.PQVAddToWishlistClicked.occurred();
});

$(document).on('click', '.quickview .availability-block span a', function() {
	GoogleAnalytics.Events.PQVCheckStoreClicked.occurred();
});

$(".pt_wish-list .add-to-cart").click(function() {
	GoogleAnalytics.Events.WishlistAddToCartClicked.occurred();
});

