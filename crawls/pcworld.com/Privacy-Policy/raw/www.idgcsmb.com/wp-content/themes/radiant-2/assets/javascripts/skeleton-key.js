jQuery(document).ready(function($) {
  	

/*-----------------------------------------------------------------------------------*/
/*	Filterable - http://www.gethifi.com/blog/a-jquery-plugin-to-create-an-interactive-filterable-portfolio-like-ours
/*-----------------------------------------------------------------------------------*/

		 $('#portfolio-list').filterable(); // ACTIVATE FILTER SCRIPT
		 
		 $("#.portfolio-4 .container .module-container:nth-child(4n+5)").addClass("clearleft");		
		 $("#.portfolio-3 .container .module-container:nth-child(3n+4)").addClass("clearleft");		
		 $("#.portfolio-2 .container .module-container:nth-child(2n+3)").addClass("clearleft");	
		 	
		 $("#.hybrid-blog-4 .container .hybrid:nth-child(4n+6)").addClass("clearleft");		
		 $("#.hybrid-blog-3 .container .hybrid:nth-child(3n+5)").addClass("clearleft");		
		 $("#.hybrid-blog-2 .container .hybrid:nth-child(2n+4)").addClass("clearleft");	
		 
		 $("#.home .container .hybrid:nth-child(3n+5)").addClass("clearleft");	
		 $("#.archive .container .hybrid:nth-child(3n+5)").addClass("clearleft");	
		 $("#.category .container .hybrid:nth-child(3n+5)").addClass("clearleft");	
		 $("#.tag .container .hybrid:nth-child(3n+5)").addClass("clearleft");	
		 
		 $("#.breakout-row .container .columns:nth-child(4n+6)").addClass("clearleft");	
		 
		 $("a.button").click(function () {
		 	
		 	$("#.portfolio-4 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			$("#.portfolio-3 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			$("#.portfolio-2 .container .module-container").removeClass("clearleft").css('height', $(".module-container").height());
			
		 });
		 
		 // Default Override Section
		 // Now set inside each individual template-XXX.php file
		 // Then the script is activated inside the footer.php file

		 // Stop editting. The next section is our button actions. 
		 // Use this for research if you're having trouble understanding how the column count thing works. 
		 // ie: Note the differences between the Four Columns classes and the Three Columns classes.
		 
		 // Four Column Buttons Actions
		 $("span.4-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("four columns");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("four columns alpha omega visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			   $("#.portfolio-4 .container .module-container").css('height', 'auto');
		 });
		 
		 $("span.4-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("four columns");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("omega").addClass("four columns alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");
			 $(".grid_btn").css("opacity","1");
			   $("#.portfolio-4 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.4-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("four columns").addClass("sixteen columns");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("alpha").addClass("four columns omega visible");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			   $("#.portfolio-4 .container .module-container").css('height', 'auto');
		 }); 
		 
		 // Three Column Buttons Actions
		 $("span.3-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("one-third column");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("one-third column alpha omega visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			   $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 });
		 
		 $("span.3-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("one-third column columns");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("omega").addClass("one-third column alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");
			 $(".grid_btn").css("opacity","1");
			 $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.3-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("one-third column").addClass("sixteen columns");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("one-third column alpha").addClass("four columns omega visible");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			   $("#.portfolio-3 .container .module-container").css('height', 'auto');
		 }); 
		 		 
		 // Two Column Buttons Actions
		 $("span.2-col-grid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("eight columns");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeOut(100).removeClass("eight columns alpha omega visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","0.5");
			   $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 });
		 
		 $("span.2-col-hybrid").click(function () {
			 $("#portfolio-list .module-container").removeClass("sixteen columns").addClass("eight columns");
			 $("#portfolio-list .module-img").removeClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("four columns omega").addClass("eight columns alpha visible");
			 $(".list_btn").css("opacity","1");
			 $(".hybrid_btn").css("opacity","0.5");  
			 $(".grid_btn").css("opacity","1");
			   $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 }); 
		 
		 $("span.2-col-list").click(function () {
			 $("#portfolio-list .module-container").removeClass("eight columns").addClass("sixteen columns");			 
			 $("#portfolio-list .module-img").addClass("twelve columns alpha");
			 $("#portfolio-list .module-meta").fadeIn(300).removeClass("eight columns alpha").addClass("four columns omega visible");
			 $(".list_btn").css("opacity","0.5"); 
			 $(".hybrid_btn").css("opacity","1");
			 $(".grid_btn").css("opacity","1");
			   $("#.portfolio-2 .container .module-container").css('height', 'auto');
		 }); 
		 


/*-----------------------------------------------------------------------------------*/
/* prettyPhoto or rLightbox - http://www.no-margin-for-errors.com/projects/prettyphoto-jquery-lightbox-clone/
/* Change this to rlightbox or prettyPhoto
/*-----------------------------------------------------------------------------------*/
		$("a[data-rel^='prettyPhoto']").prettyPhoto();
		$("a[rel^='prettyPhoto']").prettyPhoto();
		$(".XYZ a").prettyPhoto();
		$("a.boxLink").prettyPhoto();
		$(".gallery-item a").prettyPhoto();
		
		$("a[rel^='instagram-sc-images']").prettyPhoto();
		$("a[rel^='instagram-images']").prettyPhoto();
		
  		 
/*-----------------------------------------------------------------------------------*/
/*	DropDown Menu - http://users.tpg.com.au/j_birch/plugins/superfish/
/*-----------------------------------------------------------------------------------*/
		/*  $(".menu ul li").horizontalMenu({
			timeHide: 900
		});	 */
	
  		
		 $("ul.sf-menu").supersubs({
		 	minWidth:    14,   // minimum width of sub-menus in em units 
            maxWidth:    29,   // maximum width of sub-menus in em units 
            extraWidth:  0    // extra width can ensure lines don't sometimes turn over 
                               // due to slight rounding differences and font-family 
		 }).superfish({
		 	delay: 600,
		 	Speed: 80,
		 	animation:   {opacity:'show',height:'show'},
		 	autoArrows: true
		 }); 
		 
		 $("#responsive-nav select").change(function() {
  			window.location = $(this).find("option:selected").val();
		 });
		 
		

});