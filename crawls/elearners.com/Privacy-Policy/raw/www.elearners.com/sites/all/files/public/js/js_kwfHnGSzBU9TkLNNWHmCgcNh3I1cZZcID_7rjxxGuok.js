(function ($) {
	$(document).ready(function(){
		
		$(".page-search-programs .more-link").click(function(){
			$(this).prev().slideToggle(500);
			$(this).text($(this).text() == "Show More" ? "Show Less" : "Show More");
		});
		
		//$('.navigation-holder li').addClass('clearfix container-inline').wrapInner('<div class="facet-link-holder" />').find('.facet-link-holder').before('<div class="input-holder"><input type="checkbox" /></div>');
		
		
		// $('.program-search .sidebar .navigation-holder li').addClass('clearfix container-inline');
		// $('.program-search .sidebar .navigation-holder li a').before('<div class="input-holder"><input type="checkbox" /></div><div class="facet-link-holder">');
		// $('.program-search .sidebar .navigation-holder li span').after('</div>');

		//Without the Wrap
		// $('.navigation-holder .facet-link-holder').live("each", function (){
			// $(this).before('<input type="checkbox" />');
		// });
		
		$('.navigation-holder input[type=checkbox]').live("click", function (){
			location.href = $(this).parents('li').find('a').attr('href');
		});
		
		$('.navigation-holder a').live("click", function (event){
			$(this).parents('li').find('input[type=checkbox]').attr('checked', true);
		});
		
		$('.program-search .bread-box-holder li').click(function(){
			location.href = $(this).find('a').attr('href');
		});
		
		
	});
})(jQuery);;
