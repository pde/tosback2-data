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