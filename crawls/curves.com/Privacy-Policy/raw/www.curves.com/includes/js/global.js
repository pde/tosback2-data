$(function() { // document.ready shortcut
	init_nav();
	init_focus_replace();
	
	$('.parent_click').click(function(e){
		var child_a = $(this).find('a');
		
		child_a.click(function(e){
			e.stopPropagation();
			window.location = $(this).attr('href');
		});
		
		child_a.trigger('click');
	});
	
});

function init_nav() {
	$('#main_nav a')
	.css( {backgroundPosition: "0 -36px"} )
	.hover(
		function(){
			$(this).stop().animate({backgroundPosition:"(0 0)"}, {duration:350});
		},
		function(){
			$(this).stop().animate({backgroundPosition:"(0 -36px)"}, {duration:100, complete:function(){
				$(this).css({backgroundPosition: "0 -36px"})
		}});
	}
	);
}

function init_focus_replace() {
	var zip_input = $('input#zip_top');
	$(zip_input).bind("focus",function() {
		$(zip_input).val('');
	}).bind("blur",function() {
		var default_val = this.defaultValue;
		if ($(zip_input).val() == ""){
			$(zip_input).val(default_val);
		}
	});

	$('#club').bind("focus",function() {$("#club").val('');});
	$("#club").bind("blur",function() {if ($("#club").val() == ""){ $("#club").val('Enter Email Address or Postal Code');}});
	
}

// Accordion
$('.list_toggle dd').hide();
$('.list_toggle dt').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')}).click(function(){
	$(this).next().slideToggle('normal');
});