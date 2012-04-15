
$(document).ready(function() {
	  $('#slideOutContent').each(function(idx,el){
		    el.style.display='block';
		  });

	  $("#slideOutContent").hide();

	  initTriggerToolTip();
});

function initTriggerToolTip(){
	$(".storefront-tooltip-trigger").hoverIntent(
		function(){	clearTimeout( $(this).rollOffTimer ); }, function(){} ).bind("click", function(){ return false;
	});
	
	$(".storefront-tooltip-trigger").click(function() {
	   $(this).next("#slideOutContent").slideToggle(600);
	});
	
	
	//	$(".buyflow-tooltip-trigger").hover(
	$(".buyflow-tooltip-trigger").hoverIntent(
		function () {
			$(this).triggerToolTipBuyFlow(); 
		},
		function () {
			$(this).toolTipTriggerOffBuyFlow();
		}
	);
};

$.fn.triggerToolTipBuyFlow = function() {
	clearTimeout( $(this).rollOffTimer );	
	FormUtil.hideSelecterOnIE6();
	$("#buyflow-tooltip .tooltip-content").html($(this).next("#popUpContent").html());
	if($(this).prev("#popUpLink").length>0){
		$("#buyflow-tooltip .tooltip-content").append($(this).prev("#popUpLink").html());
	}	
	$("#buyflow-tooltip").show().css({
		top: ($(this).offset().top - 40) + "px",
		left: ($(this).offset().left + $(this).width() + 10) + "px"
	});
	return this;
};

$.fn.toolTipTriggerOffBuyFlow = function() {
	//console.log(this);
	var b_ttip = $("#buyflow-tooltip");
	var buyflowRollOffTimer = window.setTimeout( function() {
		if(b_ttip.hasClass("engaged")){
			FormUtil.hideSelecterOnIE6();
			b_ttip.show();
		}else{
			b_ttip.hideToolTip();
		}
		//b_ttip.hasClass("engaged") ? FormUtil.hideSelecterOnIE6();b_ttip.show(); : b_ttip.hideToolTip();FormUtil.showSelecterOnIE6();)
	}, 400);
	return this;
};