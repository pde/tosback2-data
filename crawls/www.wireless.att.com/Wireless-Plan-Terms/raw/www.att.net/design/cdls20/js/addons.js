$(document).ready(function(){
	
	// Set Active Channel 
	if (jQuery.url.param('ch') == 'at/ad' || jQuery.url.attr('path')=='/addons'){
		$('a.sn01').addClass('active');
	} else if (jQuery.url.param('ch') == 'at/ad/tb' || jQuery.url.attr('path')=='/toolbar' || jQuery.url.attr('path')=='/toolbardownload' ){
		$('a.sn02').addClass('active');
	} else if (jQuery.url.param('ch') == 'at/ad/attinternetsecuritysuitepoweredbymcafee' || jQuery.url.attr('path')=='/iss' || jQuery.url.attr('path')=='/attinternetsecuritysuitepoweredbymcafee'){
		$('a.sn03').addClass('active');
	} else if (jQuery.url.param('ch') == 'at/ad/pc' || jQuery.url.attr('path')=='/parentalcontrols'){
		$('a.sn04').addClass('active');
	} else if (jQuery.url.param('ch') == 'at/ad/pop' || jQuery.url.attr('path')=='/popupdownload' || jQuery.url.attr('path')=='/popupcatcher'){
		$('a.sn05').addClass('active');
	}
		
	
	$('#tbDesc').css('color','#333').on('click', function(){
		$(this).css({'color':'#333','font-weight':'bold'});
		$('#tbAll').css({'color':'#666','font-weight':'normal'})
		$('#tbfeature').hide();
		$('#tbdescription').show();
		return false;	
	});	
	$('#tbAll').on('click', function(){
		$(this).css({'color':'#333','font-weight':'bold'});
		$('#tbDesc').css({'color':'#666','font-weight':'normal'})
		$('#tbfeature').show();
		$('#tbdescription').hide();
		return false;	
	});	
})