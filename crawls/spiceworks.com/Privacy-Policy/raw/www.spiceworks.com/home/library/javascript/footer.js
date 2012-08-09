$(document).ready(function() {
	
	$("#app-selector .selector a").click(function() {
		$("#app-selector .drop").show();	
		
		return false;
	});
	
	$("#app-selector .drop .handle").click(function() {
		$("#app-selector .drop").hide();	
		
		return false;
	});
	
	$("#app-selector .drop a").click(function() {
		$("#app-selector .drop").hide();	
		$("#app-selector .selector a").html($(this).html());
	});	
	
	$("body").click(function(e) {
		if( $("#app-selector .drop .handle:visible").length>0) {
			if($(e.target).parents('.drop').length<=0) {
				$("#app-selector .drop").hide();	
			}
		}
	});
});