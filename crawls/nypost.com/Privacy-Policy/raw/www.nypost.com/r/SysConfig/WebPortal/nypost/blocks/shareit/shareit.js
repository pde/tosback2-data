$(document).ready(function(){
	$('.email_btn > span').click(function(){
	var holder = $(this).parent().get(0);	
	var Xpath = document.getElementById("Xpath").value;
		$.get('/eom/SysConfig/WebPortal/nypost/blocks/shareit/email_friend.jsp',function(result){
		$(holder).append(result);
		$('.email_btn .popup_wrap').css('display','none').css('position','absolute').css('right','0px').fadeIn('fast');
		$('.email_btn .popup_wrap .cancel_btn').click(function(){ 
		$('.email_btn .popup_wrap').fadeOut('fast',function(){
		$('.email_btn .popup_wrap').remove(); 
	});
	});
	});
	});
});