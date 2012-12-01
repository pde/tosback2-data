function printPage() {
	//dcsMultiTrack('DCS.dcsuri','/print'+document.location.pathname,'WT.ti','PRINT:'+document.title,'WT.dl','0');
	window.print();
	return false;
}
$(document).ready(function() {
	var defaultSrchTxt = 'Search the Government ...';
	$('#query').val(defaultSrchTxt);
	$('#query').focus(function() {
		if ($('#query').val() == defaultSrchTxt) {
			$('#query').val('');
		}
	});
	$('#query').blur(function() {
		if ($.trim($('#query').val()) == '') {
			$('#query').val(defaultSrchTxt);
		}
	});
	$('form[name="fg_search_form"]').submit(function() {
		if ($('#query').val() == defaultSrchTxt) {
			$('#query').val('');
		}
	});
});
$(window).load(function(){  
		$(".slidingDiv").hide();  
	$('.show_hide').click(function(){  
	$(".slidingDiv").slideToggle(); 
	if ($(this).text()=='Show Video Transcript'){
    	$(this).text('Hide Video Transcript'); 
		$('.show_hide').removeClass('arrw-dwn').addClass('arrw-up');	  
    		}else{
     	$(this).text('Show Video Transcript'); 
		$('.show_hide').removeClass('arrw-up').addClass('arrw-dwn');	
		}
	});  
});  