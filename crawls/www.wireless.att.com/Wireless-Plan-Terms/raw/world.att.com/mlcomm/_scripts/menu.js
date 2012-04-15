// JavaScript Document

$(document).ready(function() {
	
	$('.nav-link').click(function() { 
		  $('.nav-link').css('background','url(/mlcomm/_images/template/bg_global_nav_items.jpg) right center no-repeat').css('color','#fff');
		  $('#nav-russian').css('background','none').css('color','#fff');
		  $('.state-box').hide();
		  if($(this).is('#nav-chinese')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_chinese_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-chinese').show();
		  }
		  if($(this).is('#nav-japanese')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_japanese_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-japanese').show();
		  }
		  if($(this).is('#nav-korean')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_korean_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-korean').show();
		  }
		  if($(this).is('#nav-tagalog')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_tagalog_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-tagalog').show();
		  }
		  if($(this).is('#nav-vietnamese')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_vietnamese_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-vietnamese').show();
		  }
		  if($(this).is('#nav-polish')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_polish_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-polish').show();
		  } 
		  if($(this).is('#nav-russian')) {
				  $(this).css('background','url(/mlcomm/_images/template/nav_russian_on.jpg) left bottom no-repeat').css('color','#ff7200');
				  $('#states-russian').show();
		  } 
		
	});
	
	
});