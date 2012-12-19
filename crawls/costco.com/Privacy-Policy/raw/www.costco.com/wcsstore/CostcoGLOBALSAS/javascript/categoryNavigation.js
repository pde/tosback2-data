$.template( "itemTemplate", '<li><a href="${u}" name="${n}" >${l}</a></li>' );
$.template( "categoryTemplate", '<div class=""><a href="${u}" name="${n}" class="flyout-navigation-title">${l}</a><ul>{{tmpl(items) "itemTemplate"}}</ul></div>' );
$.template( "espotTemplate", '<div class="espot">{{html content}}</div>' );
$.template( "menuTemplate", '{{tmpl(items) "categoryTemplate"}}{{tmpl(espots) "espotTemplate"}}' );

$(window).load(function(){
	var hoverTimer;
	$('#category-navigation .subhead-title').click(function() {
		$(this).toggleClass('active');
		$("#category-navigation-categories").toggle();
		$("#category-navigation-flyout").hide(); 
		$("#category-navigation-categories li").removeClass("active");
		
	});
	$('body').click(function(e){
		if (!$(e.target).isChildOf('#category-navigation')) { 
			if(!$('body').hasClass('homepage')){
				$("#category-navigation-categories").hide(); 
			}
			$("#category-navigation-flyout").hide(); 
			$("#category-navigation-categories li").removeClass("active");
		}
	});
	$('#category-navigation').bind("mouseleave",function(){
		$("#category-navigation-flyout").hide(); 
		$("#category-navigation-categories li").removeClass("active");
	});
	
	
	$("#category-navigation-categories li a").hover(function() { 
		var index = $($(this).parent()[0]).index('#category-navigation-categories li') - 1;
		$("#category-navigation-categories li").removeClass("active");
		$($(this).parent()[0]).addClass("active");
		$("#category-navigation-flyout").empty();
		$.tmpl( "menuTemplate", navTree[index] ).appendTo( "#category-navigation-flyout" );
		$( "#category-navigation-flyout" ).show();
		$("#category-navigation-flyout").ezColumns({columns: 4, colWrapper: '<div class="col"></div>'});
		$( "#category-navigation-flyout" ).find("a").click(function() { cmCreateManualLinkClickTag($(this).attr("href"),($(this).attr("name")!=null && $(this).attr("name")!= '')?$(this).attr("name"):$(this).attr("title")); } );
	}, function () {
	});
});