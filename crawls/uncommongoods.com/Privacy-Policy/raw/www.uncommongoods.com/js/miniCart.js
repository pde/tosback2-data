function getRequest(url) {
	$.get('/product/cart/data.html?token='+new Date().getTime(), function(data) {
		$('#cartBot').html(data);
		var qty= $('#noOfQty').val();
		if(qty==0){
			$('#cartBot').html('<img src="http://data.uncommongoods.com.edgesuite.net/images/newweb/frame/empty_cart.gif"/>');
		}
	});
}
function refreshQTY() {
	$.get('/product/cart/qty.html?token='+new Date().getTime(), function(data) {
		$('#cartTopShopping').html(data);
		var qty= $('#noOfQty').val();
		if(qty==1){
			$('#noOfQtyView').html('<b>1 item</b>');
		} else{
			$('#noOfQtyView').html('<b>'+qty+' items</b>');
		}
	});
	return qty;
}

function attachedLink(){
	var itemId = 0;
	if($('#itemIdPowerReview').length!=0){
		itemId= $('#itemIdPowerReview').val(); 
	}
	$.get('/product/recentlyViewed/ids.html?id='+itemId+'&token='+new Date().getTime(), function(data) {
		$('.overview').html(data);
	});
}

function recentHistory(){
	$.get('/product/recentlyViewed/ids.html?hp=jg&id=0'+'&token='+new Date().getTime(), function(data) {
		$('.mycarouselRecentHome').html(data);
	});
}
function refreshInv() {
	var itemId= $('#itemIdPowerReview').val(); 
	$.get('/product/inventory/'+itemId+'/inv.html?token='+new Date().getTime(), function(data) {
		$('#quantity').html(data);
	});
  }