/* Version 1.2.3 */

RS = {};
RS.loginError = false
RS.isPaginated = false;
RS.playAudioOnNextPage = false;
RS.ANIMATION = {};
// A Few constants to define Animation speeds consistently across RS
RS.ANIMATION.SHOWSPEEDFAST = '100';
RS.ANIMATION.SHOWSPEEDMEDIUM = '400';
RS.ANIMATION.SHOWSPEEDSLOW = '600';

RS.gup = function(name,includeHashInParameter)
{
  if(includeHashInParameter!=true)includeHashInParameter=false;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  if(includeHashInParameter){
  var regexS = "[\\?&]"+name+"=([^&]*)";
  }
  else {
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  }
  var regex = new RegExp( regexS );
  var results = regex.exec(window.location.href);
  if( results == null )
    return "";
  else
    return results[1];
};

RS.changeURLParameter = function(param,newValue,url) {
	var hasParams = false;
	var newRSParam = 'RS_show_page='+newValue;
	if(url.match("\\?")!=-1 && url.match("\\?")!="" && url.match("\\?")!=null) hasParams = true;
	//Any Other Parameter present?
	 	if(hasParams){
			if(RS.gup("RS_show_page")!=""){
				url = url.replace(/RS_show_page=(\d){1,3}/,newRSParam);
			}
			else {
				url = url+"&"+param+"="+newValue;
			}
		}
		else {
			url = url+"?"+param+"="+newValue;
		}	
	return url;
};


RS.showNextCarouselItem = function(carousel, state){
	// This is used to show the previously hidden Carousel items .
	// We add a class hidden to these on the backend to prevent them to show until the jcarousel script kicked in
	$(carousel.container).find('.hidden').removeClass('hidden');
};

RS.hideShowTabbedContent = function(){
	$('ul.hideAndShowNavigation').each(function(){
			var listItems = $(this).find('li');
			var parentContainer = $(this).closest('.tabModuleParent');
			var hideAndShowItems = parentContainer.find('.hideAndShowContent');
			listItems.each(function(i){
				$(this).click(function(){
					listItems.removeClass('active');
					hideAndShowItems.addClass('hidden');
					var query = ".hideAndShowContent:eq("+ i +")";
					parentContainer.find(query).removeClass('hidden');
					$(this).addClass('active');
					return false;
				});
			});
	});	
};

RS.labelHide = function(){
	$('input.labelHide').each(function(){
		var defaultLabel = $(this).val();
		$(this).attr('defaultLabel',defaultLabel);
		$(this).focus(function(){
			if($(this).val() == $(this).attr('defaultLabel')){
				$(this).val('');
			}
		});
		$(this).blur(function() {
			if ($(this).val() == '') {
				$(this).val($(this).attr('defaultLabel'));
			}
		});
		
	});
};

RS.setupSearch = function() {
	$('#searchContainer form').submit(function(evt) {
		
		// Make sure there's a value in the box that's not the default value
		searchBox = $('input#search',$(this));
		evt.preventDefault();
		
		if (searchBox.val() == '' || searchBox.val() == searchBox.attr('defaultValue')) {
			// No value input, do nothing
		}
		else {
			window.location.href = $(this).attr('action') + '?q=' + searchBox.val();
		}
		
	});
};

$(document).ready(function() {
	$(".subcolumns.synchronizeHeight").each(function(){
		$(this).find(".subcl, .subcr").not('.adContainer,.dontSync').addClass('syncedHeight');
		$(this).find(".syncedHeight .featureBoxContent").equalHeights();
		$(this).find(".syncedHeight .featureListModule").equalHeights();
	});
	
	RS.hideShowTabbedContent();
	RS.labelHide();
	RS.setupSearch();
	//show subNav for reviews
	$('#navReviews a').hover(function() {
		$('#blogs-subNav').hide();
		$('#reviews-subNav').show();
		$('#videos-subNav').hide();
	});
	
	//show subNav for blogs
	$('#navBlogs a').hover(function() {
		$('#reviews-subNav').hide();
		$('#blogs-subNav').show();
		$('#videos-subNav').hide();
	});
	
	//show subNav for videos
	$('#navVideos a').hover(function() {
		$('#reviews-subNav').hide();
		$('#blogs-subNav').hide();
		$('#videos-subNav').show();
	});
	
	//close subNav for reviews & blogs
	$('#reviews-subNav,#blogs-subNav,#videos-subNav').mouseleave(function() {
		$(this).hide();
	});
	
	//if enter header of page contents
	$('#main,#header').mouseenter(function() {
		$('#reviews-subNav').hide();
		$('#blogs-subNav').hide();
	});
		
	//close subNavs if hover over nav item that does not have a subNav
	$('#nav ul#mainNav li').hover(function() {
		if(($(this).attr('id') == 'navReviews') || ($(this).attr('id') == 'navBlogs') || ($(this).attr('id') == 'navVideos')){
			return false;
		}else{
			$('#reviews-subNav').hide();
			$('#blogs-subNav').hide();
			$('#videos-subNav').hide();
		}	
	});
});


/**
 * Equal Heights Plugin
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 * 
 * Version 1.0
 * Updated 12/10/2008
 *
 * Copyright (c) 2008 Rob Glazebrook (cssnewbie.com) 
 *
 * Usage: $(object).equalHeights([minHeight], [maxHeight]);
 * 
 * Example 1: $(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: $(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: $(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * 
 */

(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);

/**
 *	Fix for weird FF rendering issue
 */
$(window).bind('resize', function() {
    var targetWidth = Math.floor($(window).width() * .5) - 490;
    $('.page_margins').css('margin-left', targetWidth);
});
$(document).ready(function() { $(window).trigger('resize'); });