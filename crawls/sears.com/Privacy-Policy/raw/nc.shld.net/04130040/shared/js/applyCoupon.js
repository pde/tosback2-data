// JavaScript Document for Social applied Coupon
$(function(){
	var applyCouponFlg = $.cookie('pa_flg');
	if(applyCouponFlg != null && applyCouponFlg != ''){
		var a = applyCouponFlg.split('|');
		if(a[1]=='m~1'){
			appliedCouponOverlay();
			$.cookie('pa_flg',a[0]+'|m~0',{path:'/shc/s'});
		}
	}
});

function appliedCouponOverlay(){
	  $('<div class="appliedCouponModal">' + '<button class="appliedCouponBtn close">close  X </button><p>Your offer will be applied if you order!</p>')
			.appendTo('body')
			.shcModal({
				curtain: 'curtain',
				curtainOpacity: 0.5,
				closeButton: '.appliedCouponModal .close',
				removeOnClose: true,
				width:400, height:100
				
	});
			
	$(".appliedCouponModal").fadeIn( function() {
				setTimeout( function(){
				$(".appliedCouponModal").fadeOut("slow");
				$("#curtain").fadeOut("slow");
				}, 6000);
	});	
}

$(".appliedCouponModal .close").click(function() {
  $(".appliedCouponModal").fadeOut("slow");
  $("#curtain").fadeOut("slow");				
});