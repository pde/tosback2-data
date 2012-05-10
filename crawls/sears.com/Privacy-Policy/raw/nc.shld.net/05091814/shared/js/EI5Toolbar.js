$(document).ready(function(){
	if($.cookie('EXCHANGE_10153') != null){
	  
	 var queryString="storeId=" + storeId + "&catalogId=" + catalogId;
	 
	 $.ajax({
		url:'/shc/s/ExchangeValuesView',
		data: queryString, 
		success: function (res) {	
			$('div#EI5toolbar').append(res);
			if($('body#dyn_NB').length>0){
			
			if($('div#content .breadcrumb').length){
			$('div#content .breadcrumb').after($('#EI5toolbar'));
			}	      
		}
		$('#EI5toolbar').show();
		}
});
}
});

function shcModalProfilePopup(shcModalContentID) {
	$('body').append('<div id="shcModalProfileCurtain" />');
	$('body').append('<div id="shcModalProfileWrp" />');
	$('#shcModalProfileWrp').append('<div id="shcModalProfileContents" />');

	$('#shcModalProfileCurtain').fadeIn(250);
	shcModalContent = $(shcModalContentID).html();
	$('#shcModalProfileContents').html(shcModalContent);
	$('#shcModalProfileWrp').centerOnScreen();
	
	$('#shcModalProfileWrp .shcBtnCancel').bind('click', function(){
		$('#shcModalProfileCurtain').remove();
		$('#shcModalProfileWrp').remove();
		return false;
	});
	
	$('#shcModalProfileWrp .shcOrangeBtn').bind('click', function(){
		$('#shcModalProfileCurtain').remove();
		$('#shcModalProfileWrp').remove();
		sendCancelExchangeOmnitureCall($('#cancelExchangeFromBrowse'));
		cancelConfirmed();
		return false;
	});
}

function cancelConfirmed(){
	
	var fromPage=location.href;	
	var queryString="&storeId=" + storeId + "&catalogId=" + catalogId + "&langId=" + langId + "&fromPage=Browse";
	 
	

	$.ajax({
		url:'/shc/s/RI5CancelExchangeOrderDeleteControllerCmd',
		data: queryString, 
		dataType: 'html',
		success: function (res) {	
			res = eval('(' + res + ')');
			if (res.RI5Status=='Success'){
				  
				location.href=fromPage;
			}	      
		}
	});
}

function sendCancelExchangeOmnitureCall(id){
	// send click action tracking call on click of submit button
	if (typeof s != 'undefined'){
		s.prop12="RI5/EI5:cancel";
		s.tl(id,'o','cancel return/exchange'); 
	}
}		
