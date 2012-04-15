/*****************************************************************************
    Description:Displays search suggestions and worldwides sites info via AJAX
    Written:    Christopher Klanac for VSA Partners, Inc.
    Copyright:  (c) 2009, VSA Partners, Inc.

    CONFIGURATION: stored in object to limit possible name collisions
        config.searchURL:  url requested for search suggestions, JSON formatted response
        config.sitesURL:   url of HTML page that contains the worldwide sites dropdown content

	Results from AJAX call are expected in the following format
		obj[i].title
		obj[i].url
		obj[i].content

    displayResults() builds and inserts HTML fragment into #header-results
	<div id="search-suggestions">
		<a class="closer" href="#">X Close</a>
		<h2 id="header-results-label" class="results-label">Search Suggestions</h2>
		<ul id="header-results-list" class="results">
			<li><a class="result-title" href="<%obj[i].url%>"> <% obj[i].content %> | <% obj[i].content %></a></li>
			<li><a class="result-title" href="http://www.pg.com/"><b>Procter</b> & Gamble | Multinational manufacturer of product ranges including personal care, household   cleaning, laundry detergents, prescription drugs and disposable nappies.</a></li>
			<li><a class="result-title" href="http://www.pg.com/jobs/sectionmain.shtml">P&G - Global Careers | ©2009 <b>Procter</b> & Gamble. All claims valid only in the U.S. Terms and Conditions   Privacy Statement P&G Links Site Help Site Map Contact Us <b>...</b></a></li>
			...
			</li>
		</ul>
	</div>
*****************************************************************************/

var config = {
//	searchURL 	: 	'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=large&q=',
	searchURL 	: 	'/en_US/_php/google_ajax_search.php?q=',
	sitesURL	:	'/en_US/_modules/worldwide_sites.shtml',
	maxResults	:	10
};

/*****************************************************************************
*   $(function() {}); jquery shortcut document.ready function
*****************************************************************************/
$(function() {
	var $header = $('#header-results'); //store reference to frequently used object

/*****************************************************************************
*   Click event handler: when user clicks on worldwide sites links, fetch data from config.sitesURL
*   if search suggestions is currently displayed, animate it out then show worldwide sites
*   else simply animate in worldwide sites.
*****************************************************************************/

	$('.nav-worldwide-sites').click(function(){
		//if search-suggestions exists, gracefully fade results out and then load in worldwides sites content
		if ($('#search-suggestions').length) {
			$header.animate({'opacity':0}, function(){
 				//set overflow hidden height of div can change but animate will still work smoothly
 				$header.css({'height':$('#search-suggestions').css('height'),'overflow-x':'hidden'}).load(config.sitesURL, function(){
	 				$('#worldwide-sites').prepend('<a href="#"  class="closer">X Close<\/a>');
 					$header.animate({'opacity':1,height:$header[0].scrollHeight}); //animate to scrollheight
 				})
			});
		} else {
			//load worldwide sites content into header
			$header.load(config.sitesURL, function(){ 
 				$('#worldwide-sites').prepend('<a href="#" class="closer">X Close<\/a>');
 				$('#header-results').slideDown('slow');
  				//tracking
 				PGUtil.trackEvent('tools', 'open', $('#header-results h2').text());
 			});
		}
		return false;
	});

/*****************************************************************************
*   Focus and KeyUp event handler: on keyup pass text string to performSearch() for search suggestions
*   if worldwide sites is currently displayed, then animate it out and show results, else simply display results
*   NOTE: focus allows users to click in text box and view previous search results
*****************************************************************************/
	//bind both onFocus and onKeyup events to search-text input box
	$('#search-text').attr('autocomplete','off').bind('focus keyup',function() {
		var q = $(this).val();

		//if text input is 2 or more characters then perform search
		if (q.length > 1) {
			//if worldwide sites is open then fade it out then perform search
			if ($header.children('#worldwide-sites').length) {
				$header.data('open',false).animate({'opacity':0}, function (){performSearch(q)});
			} else {
				$header.data('open',true);
				performSearch(q);
			}
		} else if (q.length == 0) {
			//if user deletes all characters then hide the search results
			$header.slideUp('slow',function(){
				$header.empty().css('height','auto');
			});
		}
	})

/*****************************************************************************
*   Live event: attach click handler to the worldwide sites and search suggestions close buttons
*   NOTE: Use the 'live' method since elements are added/removed from DOM
*****************************************************************************/
	$('#search-suggestions .closer, #worldwide-sites .closer').live('click', function(){
		//tracking
		PGUtil.trackEvent('tools', 'close', $(this).siblings('h2').text());
		$(this).parents('#header-results').slideUp(function(){
			$header.empty().css('height','auto');
		});
		return false;
	});

/*****************************************************************************
*   Live event: mouseover/mouseout event handlers to fix css:hover support IE6
*   NOTE: Use the 'live' method since elements are added/removed from DOM
*****************************************************************************/
  	if (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6) {
 		$('#header-results li').live('mouseover', fixIE6HoverOn);
 		$('#header-results li').live('mouseout', fixIE6HoverOff);
 	} //IE 6



/*****************************************************************************
*   Functions to fix hover support in IE6
*   fixIE6HoverOn: saves the current background-color in the LI to .data then sets the background-color = none
*   fixIE6HoverOff: reverse the process setting LI back to original background-color
*   NOTE: HoverOff uses a setTimeout because mousout can be triggered by child elements
*****************************************************************************/
function fixIE6HoverOn(e) {
	var that = $(this);
	if (!that.data('bgcolor')) that.data('bgcolor', that.css('background-color'));
	clearTimeout($(this).data('timer'));
	$(this).css('background','none');
}
function fixIE6HoverOff(e) {
	var that = $(this);
	that.data('timer',setTimeout(function (){
		that.css('background',that.data('bgcolor'));
	}),50);
}

/*****************************************************************************
*   performSearch() Fetch results from search engine, JSON object is expected back
*   @txt = string from input, passed to searchURL for query
*   Uses config.searchURL with query search concatenated
*   NOTE: &callback=? enables jquery to perform cross-site scripting calls
*****************************************************************************/
function performSearch(txt) {
 	$.getJSON(config.searchURL+encodeURIComponent(txt),function (results){
        //NOTE: injection point to validate/reformat data before passing to display function
 		displayResults(results.searchresult);
 	})
}

/*****************************************************************************
*   displayResults() loops thru result set, builds and inserts HTML fragment into DOM
*   @res = array of objects, each object is title, url and content of result link
*   NOTE: uses array to build HTML fragment to avoid costly string concatenation
*****************************************************************************/
function displayResults(res){
	var lis = [];
	var resultsNum = res.length -1 > config.maxResults ? config.maxResults : res.length - 1;
	if (res.length > 1) {
		for (var i=0; i < resultsNum; i++) {
			lis.push('<li><a href="'+res[i].url+'" class="result-title">');
			lis.push(res[i].title);
			lis.push(' <span class="separator">|</span> '+res[i].desc+'<\/a><\/li>');
		}
	} else {
		lis.push('<li><a href="#" class="result-title">No results found<\/a>');
	}

 	//if #search-suggestions does not exits then append it (happens on first search)
 	if (!$('#search-suggestions').length) {
 		$header.html('<div id="search-suggestions"><a href="#" class="closer">X Close<\/a><h2 class="results-label" id="header-results-label">Search Results<\/h2><ul class="results" id="header-results-list"><!--Search results here--><\/ul><\/div>');
		//tracking
		PGUtil.trackEvent('tools', 'open', $('#header-results h2').text());
 	}
 	$('#header-results-list').empty().append(lis.join('')); //append array of LIs to the UL header-results-list

 	if ($header.data('open')) {
 		$('#header-results:hidden').animate({'opacity':1}).slideDown();
 	} else {
 		$header.animate({'opacity':1,'height':$('#search-suggestions')[0].scrollHeight})
 	}
}

}); // ===== end document.ready ======

