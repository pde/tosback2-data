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

});

$(document).ready(function(){
	if ($("#site_container").length > 0){
		$('<div id="site_container_before"></div>').prependTo("#site_container");
	}else if ($("#MASTER_Scontainer").length > 0){
		$('<div id="site_container_before"></div>').prependTo("#MASTER_Scontainer");
	}else if ($("#container").length > 0){
		$('<div id="site_container_before"></div>').prependTo("#container");
	}
	$('#site_container_before').css('top', $("#main_nav").offset().top + 'px');
});