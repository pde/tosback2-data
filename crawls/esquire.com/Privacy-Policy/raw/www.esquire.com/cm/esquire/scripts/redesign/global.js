// Redesign Global js

//Gives all Buttons with Class ".over" a hover
$(function() {
	$(".over")
		.mouseover(function() {
		var src = $(this).attr("src").match(/[^\.]+/) + "-over.gif";
		$(this).attr("src", src);
	})
	.mouseout(function() {
		var src = $(this).attr("src").replace("-over", "");
		$(this).attr("src", src);
	});
	
	/* prevent exec script in search box */
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
				e.preventDefault();
				$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
				$input = $("input[name=q]",this);
				//get unsafe search string 
				var s = $input.val();
				//replace
				s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				//set safe search string 
				$input.val(s);
	});

});// Redesign Global js

//Gives all Buttons with Class ".over" a hover
$(function() {
	$(".over")
		.mouseover(function() {
		var src = $(this).attr("src").match(/[^\.]+/) + "-over.gif";
		$(this).attr("src", src);
	})
	.mouseout(function() {
		var src = $(this).attr("src").replace("-over", "");
		$(this).attr("src", src);
	});
	
	/* prevent exec script in search box */
	$("form[action='/search/'] a")
	.attr("href","#")
	.click(function(e){
				e.preventDefault();
				$(this).parents("form").submit();    
	});

	$("form[action='/search/']").submit(function(){
				$input = $("input[name=q]",this);
				//get unsafe search string 
				var s = $input.val();
				//replace
				s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				//set safe search string 
				$input.val(s);
	});

});

$(document).ready(function(){
	
	var containerName = $('body').children('div[id*=container]').attr('id');
	var navBarWide = '<div id="site_container_before">';

	if ($("#site_container").length > 0){
		containerName = '#site_container';
	}else if ($("#MASTER_Scontainer").length > 0){
		containerName = '#MASTER_Scontainer';
	}else if ($("#container").length > 0){
		containerName = '#container';
	}
	
	var positionLeft = Math.floor(($('body').outerWidth() - parseInt($(containerName).css('width'),10)) / 2 * -1);
	var navBarWidth = $('body').outerWidth() + 'px'

	if ($('body').children('div').find('div[id*=blog]')) {
		$(navBarWide).prependTo('#global_header');
	} else {
		$(navBarWide).prependTo('#header');
	}

	$('#site_container_before').css({'top': $("#main_nav").position().top + 'px','left': positionLeft,'width': navBarWidth});
});