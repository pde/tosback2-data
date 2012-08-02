	function analize_fetch_count_div(fetchCountDiv_local) {
		if (fetchCountDiv_local != undefined && fetchCountDiv_local != null) {
			var local_offset = jQuery(fetchCountDiv_local).html();
			//console.log("local_offset = " + local_offset);
			if (local_offset == 0) {
				load_shopsense_items = 0;
			} else {
				offset = parseInt(offset) + parseInt(local_offset);
			}
		} else {
			load_shopsense_items = 0;
		}
	}

	function set_sipp(value) {
		
		if (typeof(shopsense_items_threshold) != 'undefined' &&
		   typeof(shopsense_big_page_items_per_page) != 'undefined') {
			if(typeof(pdp_page)!='undefined' && pdp_page == true) {
				//console.log("1");				
				sipp = shopsense_small_page_items_per_page;
			} else if (value >= shopsense_items_threshold) {
				//console.log("2");				
				sipp = shopsense_small_page_items_per_page;
			} else {
				//console.log("3");
				sipp = shopsense_big_page_items_per_page;
			}
		}
	}

	function initialize_sipp() {
		if (typeof(category_products_number) != 'undefined' && category_products_number > 0) {
			set_sipp(category_products_number );		
		} else if (typeof(products_number) != 'undefined' &&  products_number > 0) {
			set_sipp(products_number);
		} else {
			sipp = 10;
		}	
	}

        jQuery(function() {
        	squish_zIndex_bug_shopsense();
        	var pastlove_overlay_open = false;


        	//$(".pastloveondesignerpage div.past_love_wrapper").css({width: 270});
        	//$(".pastloveondesignerpage div.past_love").css({width: 635});
        	// shopstyle current page
        	scp = 1;

        	// shopstyle items per page
		initialize_sipp();		
		
			
        	shopsense_items = jQuery(".shopsense-product");
        	shopsense_pages = Math.ceil(shopsense_items.length/sipp);
		load_shopsense_items = 1;

		if (typeof(shopSenseCategory) == 'undefined') {
		    shopSenseCategory = '';	
		}
		
		if (typeof(shopSenseBrand) == 'undefined') {
                    shopSenseBrand = '';     
                }

		if (typeof(shopSenseCategoryId) == 'undefined') {
                    shopSenseCategoryId = '';
                }

	
		if (typeof(shopsense_next_button_enabled) != 'undefined' && shopsense_next_button_enabled == false) {
			load_shopsense_items = 0;
		}
		
		offset = 0;
		var fetchCountDiv_local = jQuery("div#fetchCount");
		analize_fetch_count_div(fetchCountDiv_local);	
		
		visible_pages = 8;

		var fetchCountDiv = jQuery("div#fetchCount");
		if (fetchCountDiv != undefined) {
			offset = fetchCountDiv.html();
		}	
		

        	jQuery(".shopsafe_pagination div.pages").empty();
		// previous and next buttons.
        	if(shopsense_pages > 1) {
        		$("div.shopsafe_pagination div.prev").prepend("<div class='shopsafe_pagination_header'><a href='javascript:go_prev_shopsense();'>PREV</a></div>");
			$("div.shopsafe_pagination div.next").append("<div class='shopsafe_pagination_header'><a href='javascript:go_next_shopsense();'>NEXT</a></div>");
        	}
		
        	if (shopsense_pages == 1) {
        		jQuery(".shopsafe_pagination").hide();
        	} 
		else 
		{
        		for(i=1; i<=shopsense_pages; i++) 
			{
				var class_pag = ' class="pageunselected"';      			
				if (i == scp) 
				{
        				class_pag = ' class="pageselected"';
        			} 
				
        			jQuery("div.shopsafe_pagination div.pages").append('<a href="javascript:void(0);" '+class_pag+' onclick="javascript: shopsenseJumpPage('+i+')">'+i+'</a>');
        		}

        		shopsenseJumpPage(1);
			adjust_pages();
        	}

        	//var shopsense_container = jQuery(".product-ads-container");
		
		//if ( shopsense_container != undefined ) {
        	//	shopsense_container.css({width: 635});
		//}
        });

	function squish_zIndex_bug_shopsense(){
    		jQuery('.shopsafeProductContainer').each(
			function(i) {
       				jQuery(this).css('zIndex', 100 - (i * 1));
    			}
		);
	}

    function go_prev_shopsense(){
    	if(scp > 0){
        	shopsenseJumpPage(scp-1);
        }

		adjust_pages();
	}

        function go_next_shopsense(){
        	if (scp < shopsense_pages){
        		shopsenseJumpPage(scp+1);
        	} else { 
			load_next_batch();
		}
		// hide_unnecessary_pages_for_next();
		adjust_pages();
        }

        function shopsenseJumpPage(page){
			jQuery('#noshopsenseproducts').hide();			
        	page = parseInt(page);//-1;
        	if (page > 1){
        		jQuery(".shopsafe_pagination .prev").css("visibility", "visible");
        		jQuery(".shopsafe_pagination .next").css("visibility", "visible");
        	}
        	if (page == shopsense_pages && load_shopsense_items == 0) {
        		jQuery(".shopsafe_pagination .next").css("visibility", "hidden");
        	}
        	if (page == 1){
        		jQuery(".shopsafe_pagination .prev").css("visibility", "hidden");
        		jQuery(".shopsafe_pagination .next").css("visibility", "visible");
        	}

        	var index = 0;
        	jQuery(".shopsense-product").each(function(){
        		if(index<page*sipp){
        			jQuery(this).show();
        		}else{
        			jQuery(this).hide();
        		}

        		if(index<(page-1)*sipp){
        			jQuery(this).hide();
        		}
        		index++;
        	});

        	for(i=1; i<=shopsense_pages; i++){
        		if(i!=page){
        			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").addClass("pageunselected");
        			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").removeClass("pageselected");
        		}else{
        			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").addClass("pageselected");
        			jQuery(".shopsafe_pagination .pages a:eq("+(i-1)+")").removeClass("pageunselected");
        		}
        	}
        	//jQuery(".shopsafe_pagination .pages a").removeClass("pageselected");
        	//jQuery(".shopsafe_pagination .pages a:eq("+(page-1)+")").addClass("pageselected");

        	scp = page;
        }

	function get_next_batch_link() {
		var link = "/browse/list_shopsense_ajax.jsp?search="+shopSenseSearchTerm+"&category="+shopSenseCategory+"&categoryId="+shopSenseCategoryId+"&brand="+shopSenseBrand+"&offset="+offset+"&count="+sipp ;
		//console.log("offset = " + offset);
		return link;
	}

	

   	function load_next_batch() {
		if (load_shopsense_items == 1) {
			var link = get_next_batch_link();
			jQuery(".next .shopsafe_pagination_header a").attr("href", "javascript:void(0);");
			
			$.ajax({
				url:link,
			  	success : function (data) {
					var destination = jQuery(".shopsenseProductsContainer");
				
  					if (jQuery.trim(data).length > 0 ) {
						var fetchCountDiv_local = jQuery(data).find("div#fetchCount");
						analize_fetch_count_div(fetchCountDiv_local)

						var elements = jQuery(data).find(".shopsense-product");
						if (elements != null && elements.length > 0) {
							var initial_number_of_pages = Math.ceil(jQuery(".shopsense-product").length/sipp);
							for(index=0 ; index<elements.length ; ++index) {
								destination.append(elements[index]);
							}
							if (Math.ceil(jQuery(".shopsense-product").length/sipp) > initial_number_of_pages ) {
								scp = Math.ceil(jQuery(".shopsense-product").length/sipp);
                                				shopsense_pages = shopsense_pages + 1;
                                				jQuery("div.shopsafe_pagination div.pages").append('<a href="javascript:void(0);" class="pageunselected" onclick="javascript: shopsenseJumpPage('+Math.ceil(jQuery(".shopsense-product").length/sipp)+')">'+scp+'</a>');
							}
							shopsenseJumpPage(scp);
						}
					} else {
						load_shopsense_items=0;
						shopsenseJumpPage(scp);
						jQuery('#noshopsenseproducts').show();			
					}
					
					adjust_pages();
					jQuery(".next .shopsafe_pagination_header a").attr("href", "javascript:go_next_shopsense();");
				},
				error : function (fail) {
					jQuery(".next .shopsafe_pagination_header a").attr("href", "javascript:go_next_shopsense();");
				}
			});
		}
	}

	function adjust_pages() {
		pages = jQuery("div.shopsafe_pagination div.pages a");
		var lscp = scp -1;
		var first_visible = -1;
		var last_visible = -1;
		for( index=0; index < pages.length; index++ ) {
			//console.log(index);
			var object = jQuery(pages[index]);
			if (object.css("display") != "none") {
				if (first_visible == -1) {
					first_visible = index;
				} else {
					last_visible = index;
				}
			}
		}
		
		
		if (lscp<first_visible) {
			first_visible = lscp;
			last_visible = first_visible + sipp-1;
		}

		if (lscp>last_visible) {
			last_visible = lscp;
			first_visible = last_visible - sipp +1 ;
		}

		if (last_visible - first_visible > (visible_pages - 1) ) {

			var delta_first = lscp - first_visible ;
			var delta_last = last_visible - lscp;

			if (delta_first > delta_last) {
				first_visible = last_visible - visible_pages + 1;
			} else {
				last_visible = first_visible + visible_pages - 1;
			}

		}

		//console.log("lscp = " + lscp);
		//console.log("first_visible = " + first_visible);
		//console.log("last_visible = " + last_visible);
			
		
		for( index=0; index < pages.length; index++ ) {
			//console.log(index);
			var object = jQuery(pages[index]);
			if (index>=first_visible && index<=last_visible) {
				object.show();
			} else {
				object.hide();
			}
		}	
	}



$(function() {
    $(".product-info-dialog").hide();
    $(".product-image-wrapper").mouseover(
	
    function() {
        $(".product-info-dialog", $(this).parent()).show();
    }).mouseout(function() {
        $(".product-info-dialog", $(this).parent()).hide();
    });
});


$(function() {
	var el = $('#productRecommendationArea').find('.ui-tabs-nav');
	el.addClass( 'new-tabs-layout' );
	el.parent().css("width",  690 + "px");
	var len = el.children().length;
	if( len > 0)  {
	    width = (690 - len)/len;
	    width = width - 1;
		    el.children().css("width",  width + "px"); 
		    el.children().find('a').css("width",  width + "px"); 
	}
});


$(function() {
	var pageLocation = location.href,
		$tabs = $('#productRecommendationArea');
	
	if ( pageLocation.match( /list.fly/g ) && $tabs.find('.product-ads-container').length === 0  &&  $tabs.find('li:only-child').find('a').text() == 'Related Products') {
	  
	  var $trigger = $('a[href="#productRecommendationArea-2"]');	  
	  if ($trigger.length > 0) {
		  
		  var $triggerParent = $trigger.parent('li'),
		  	$relatedProducts = $tabs.find('#productRecommendationArea-2');
		  
		  $triggerParent.removeClass('ui-state-active');
		  $relatedProducts.addClass('ui-tabs-hide');
		  
		  $trigger.replaceWith('<a class="related-products-accordian" href="#" style="width: 688px;">Related Products</a>');
		  $trigger = $('.related-products-accordian');
		  $trigger.css('cursor','pointer');
		
		  $trigger.click(function() {
		  	$triggerParent.toggleClass('ui-state-active');
		  	$relatedProducts.toggleClass('ui-tabs-hide');
		  	return false;
		  });
	  }
	
	}
});
