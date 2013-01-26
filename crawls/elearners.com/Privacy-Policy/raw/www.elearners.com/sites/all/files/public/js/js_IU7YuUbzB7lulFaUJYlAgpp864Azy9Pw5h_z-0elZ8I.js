(function ($) {
	$(document).ready(function(){
	
		//Get Query String Param
		function getQuerystring(key, default_) {
			if (default_ == null) default_ = "";
			key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
			var qs = regex.exec(window.location.href);
			if (qs == null)
				return default_;
			else
				return qs[1];
		}

		var nid, page;
		
		if(Drupal.settings.nid != '')
			nid = Drupal.settings.nid;
		else
			nid = 0;
	
		function get_listings_ajax(page, reqListId, clicked){

			if(page > 0){
				pageParam = '?page=' + page;
			}
			else{
				pageParam = '';
			}
			
			$('.block-eddy-listing').each(function(i){
				
				var elementId = $(this).attr('id');
				var listId = elementId.split('-').slice(-1)[0];
				
				//$(this).find('.content').html('<img style="margin:0 auto; display:block; margin-top:40px;" src="/sites/all/modules/EDDY/eddy_listing/images/ajax-loader.gif" />');
				
				if(page == 0 || reqListId == listId){
					
					//$(this).fadeTo(100, 0.33);
					
					$.ajax({
						url: '/eddy-listing-ajax/' + nid + '/'+ listId +'/0/0/' + pageParam,
						context: this,
						success: function(data) {
						
							if(clicked)
								$('html,body').animate({ scrollTop: $('#page-wrapper').offset().top}, 500);
							
							$(this).find('.content').html(data);
							
							//Added for alphabetical list on colleges page
							if($(this).find("#all-accredited-online-colleges").length > 0){
							
								 $('#all-accredited-online-colleges').listnav({
									 initLetter: 'a',
									 showcounts: false,
									 onClick: function(letter){addLastClass(letter)},
									 includeAll: true
								 });
								 
								 function addLastClass(letter){
									$('#all-accredited-online-colleges').find('li:visible:last').addClass('listing-row-last');
								 }addLastClass('a');
								 
							}

						}
					});
				}
				
			});

		}
		get_listings_ajax(getQuerystring('page'));
		
	});
	
})(jQuery);;
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
		
		//Display or Hide Search Text.
		$('.form-item-search-block-form input[type=text]').focus(function(){
			if(this.value == 'Search') this.value = '';
		});
		$('.form-item-search-block-form input[type=text]').blur(function(){
			if(this.value == '') this.value = 'Search';
		});

		
	});
})(jQuery);;
