// JavaScript Document for Social applied Coupon
$(function(){
	var applyCouponFlg = $.cookie('pa_flg');
	if (!!applyCouponFlg) {
		var a = applyCouponFlg.split('|');
		if(a[1]=='m~1'){
			appliedCouponOverlay();
			$.cookie('pa_flg',null,{expires:'-1',path:'/'});
			$.cookie('pa_flg',a[0]+'|m~0',{path:'/shc/s'});
		}
	}
});

function appliedCouponOverlay(){
	var sywrMember = $.cookie('sywrMember');
	var clipMsg = 'Your deal has been applied to your cart.';
	if(sywrMember != null && sywrMember === 'true'){
		clipMsg = 'This offer has been clipped and applied to your cart.';
	}
	  $('<div id="appliedCouponModal" class="appliedCouponModal"><div>' +
			'<p>'+clipMsg+' Start shopping to enjoy the savings.</p><a href="#" class="close shcBtn">Close</a></div></div>')
			.appendTo('body')
			.shcModal({
				curtain: 'curtain',
				curtainOpacity: 0.5,
				closeButton: '#appliedCouponModal .close',
				removeOnClose: true
	});

	$('#appliedCouponModal').centerOnScreen();

	$("#appliedCouponModal .close").click(function() {
		$("#appliedCouponModal, #curtain").fadeOut("slow");
	});

	$("#appliedCouponModal").fadeIn(function() {
				setTimeout( function(){
			$("#appliedCouponModal, #curtain").fadeOut("slow");
				}, 4000);
	});
}