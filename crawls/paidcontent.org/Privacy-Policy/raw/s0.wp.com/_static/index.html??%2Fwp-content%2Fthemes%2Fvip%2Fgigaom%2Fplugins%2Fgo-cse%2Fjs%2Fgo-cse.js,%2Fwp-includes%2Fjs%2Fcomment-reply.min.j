google.load('search', '1', {language : 'en'});

jQuery(function($) {
	
	var SortToggler = function (fields, callback) {
		var me = this; 
		
		this.callback = callback;  
		
		this.field = null; 
				
		this.$elem = $('<dl />')
			.addClass('sort-toggler')
			.append('<dt>Sort by</dt>');
		
		$.each(fields, function (label, field) {
			var $link = $('<a />')
				.text(label)
				.attr('href', '#')
				.click(function () {
					me.field = field; 
					me.callback(field);
					
					me.$elem.find('a').removeClass('active'); 
					$(this).addClass('active');
					
					return false; 
				});
			
			if (null === me.field) {
				me.field = field; 
				$link.addClass('active'); 
			}
			
			$link.appendTo($('<dd />').appendTo(me.$elem)); 
		});
	}
	
	var searchField = $('input[name=s]');
	
	if (!searchField) {
		return; 
	}
	
	// If this is a mobile web browser quit now
	if (navigator.userAgent.match(/mobile/i) && window.location.search == "")
	{
		return;
	}
	
	
	searchField = searchField.first();
	searchField.onfocus = null; 
	
	var searchForm = searchField.parents('form').first();
	searchForm.css('width', searchForm.width()); 
	searchForm.addClass('go-cse'); 
	searchForm.attr('autocomplete', 'off');
	
	var hideDrop = function() {
		 if (searchForm.find('#go-cse-drop').length) {
			searchForm.find('#go-cse-results').hide();
			searchForm.find('#go-cse-drop').children().first().unwrap();
		}
	}
	
	var showDrop = function() {
		if (!searchForm.find('#go-cse-drop').length) {
			searchForm.wrapInner('<div id="go-cse-drop" />');
			searchForm.find('#go-cse-results').show();
			searchField.unbind('focus'); 
			searchField.focus();
		}
	}	
		
	
	// Tell the control to look for result templates with the go_cse_ prefix.
	google.search.Csedr.addOverride('go_cse_');


 	var csc = new google.search.CustomSearchControl(GO_CSE_VARS.cse);
 	
 	csc.setLinkTarget(google.search.Search.LINK_TARGET_SELF); 
 	var drawOptions = new google.search.DrawOptions();
 	drawOptions.setInput(searchField.get(0));
 	
	var sortToggler = new SortToggler({'Date': 'metatags-dc.date', 'Relevancy': ''}, function () {
		csc.execute(searchField.val());
	}); 
 	
 	var setTab = false;
 	csc.setSearchCompleteCallback({}, function() {
 		if (!setTab && GO_CSE_VARS.default_refinement) {
 			$('.gsc-tabHeader:contains("' + GO_CSE_VARS.default_refinement + '")').trigger('click');
 			setTab = true; 
 		}	 		
 		
 		if (!sortToggler.$elem.parent().length) {
 			$('.gsc-wrapper').prepend(sortToggler.$elem);
 		}
 		
 		if (GO_CSE_VARS.search_page) {
 			window.location.hash = 's=' + searchField.val(); 
 		} 		
 	}); 
 	
 	csc.setSearchStartingCallback({}, function(control, searcher, query) {
 		if (!GO_CSE_VARS.search_page) {
 			showDrop();
 		}
 		
 		searcher.setRestriction(
 			google.search.Search.RESTRICT_EXTENDED_ARGS, 
 			{sort: sortToggler.field}
 		);
 	}); 
 	
	
	if (!GO_CSE_VARS.search_page) {
		searchForm.click(function(event) {
			event.stopPropagation();
		});
			
		$('html').click(function() {
			hideDrop();
		});

		searchForm.append('<div id="go-cse-results" />');
		$('<div id="gsc-loading-id">Loading</div>').hide().appendTo(searchForm);
		 
		csc.setResultSetSize(google.search.Search.SMALL_RESULTSET);
		csc.draw('go-cse-results', drawOptions);		
		
		if ('' == searchField.val()) {
			searchField.val('Instant search');
			searchField.one('focus', function() {
				searchField.val(''); 
			}); 
		}
		searchField.focus(function() {
			searchForm.addClass('active'); 
		});
		searchField.blur(function() {
			searchForm.removeClass('active'); 
		}); 
		
	} else {
		container = $(
			GO_CSE_VARS.results_container_selector.length ? 
				GO_CSE_VARS.results_container_selector : '#main'		
		); 
		
		container.empty();
		container.append('<div id="go-cse-results" />');
			
		$('<div id="gsc-loading-id">Loading</div>').hide().appendTo(container);
		searchForm.find('input[type=submit]').click(function () {
			return false; 
		});
		
		$('<div id="gsc-loading-id">Loading</div>').hide().appendTo('#main');
		searchForm.find('input[type=submit]').click(function () {
			return false; 
		});
		
		csc.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
		csc.draw('go-cse-results', drawOptions);
		
		
		var query = '';
		
		var matches = window.location.hash.match(/(#|\?|&)s=(.*?)($|\?|&)/)
		if (matches) {
			query = decodeURIComponent(matches[2]).trim(); 
		} else if (GO_CSE_VARS.query) {
			query = GO_CSE_VARS.query.trim(); 
		}

		if (query) {
			csc.execute(query); 
		}	
	}
}); 
;
addComment={moveForm:function(d,f,i,c){var m=this,a,h=m.I(d),b=m.I(i),l=m.I("cancel-comment-reply-link"),j=m.I("comment_parent"),k=m.I("comment_post_ID");if(!h||!b||!l||!j){return}m.respondId=i;c=c||false;if(!m.I("wp-temp-form-div")){a=document.createElement("div");a.id="wp-temp-form-div";a.style.display="none";b.parentNode.insertBefore(a,b)}h.parentNode.insertBefore(b,h.nextSibling);if(k&&c){k.value=c}j.value=f;l.style.display="";l.onclick=function(){var n=addComment,e=n.I("wp-temp-form-div"),o=n.I(n.respondId);if(!e||!o){return}n.I("comment_parent").value="0";e.parentNode.insertBefore(o,e);e.parentNode.removeChild(e);this.style.display="none";this.onclick=null;return false};try{m.I("comment").focus()}catch(g){}return false},I:function(a){return document.getElementById(a)}};;
