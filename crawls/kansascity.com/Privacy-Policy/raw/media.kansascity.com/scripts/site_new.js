/* @minify true
// ^ Let MI aggregator know it can minify
*/

// Search Form Submit Live Version *****************************************************************
 function searchFormSubmit(form) {

     if (form.aff.value == 'archives' || form.aff[1].checked == true) {
         window.location = "http://www.newslibrary.com/nlsearch.asp?search_mode=all&action=search&date_mode=year&year=last+180+days&sort=d%3Ah&nitems=10&region=kc&dbquery=" + form.keywords.value;
             return false;
   
     } 
     else if (form.aff.value == 'h_archives' || form.aff[2].checked == true) {
         window.location = 'http://nl.newsbank.com/nl-search/we/Archives?p_product=KRHA-KC&p_theme=histpaper&p_action=search&p_queryname=1&p_perpage=10&p_sort=_rank_%3AD&p_bool_base-1=and&p_field_base-1=ProductID&p_text_base-1=1126152C152E4978&p_text_base-0=' + form.keywords.value;

         return false;
     }
     else if (form.aff[3].checked == true || form.aff.value == 'web') {
         var encoded_keywords = encodeURIComponent(form.keywords.value);
         var section_num = '397';
         var url_version = 'ysr';
         var params = 'product=Yahoo%2COverture&' +
                      'collection=WEB&' +
                      'live_template=http%3A%2F%2Fwww.kansascity.com%2F' + section_num + '%2Fv-' + url_version + '%2Findex.html&' + 
                      'error_template=http%3A%2F%2Fwww.kansascity.com%2F' + section_num + '%2Fv-yerr%2Findex.html&' +
                      'preview_template=http%3A%2F%2Fpreview.kansascity.com%2F' + section_num + '%2Fv-' + url_version + '%2Findex.html&' +
                      'results_per_page=10&' + 
                      'preview=0' +
		      '&prop_related=1&prop_dym=1';
         window.location = "http://search.kansascity.com/search-bin/search.pl.cgi?sf_Keywords=" + encoded_keywords + '&' + params;

         return false;
     }

     return true;
 }
// getParams *******************************************************************
function getParams(params) {
   var Params = new Object ();
   if ( ! params ) return Params; // return empty object
   var Pairs = params.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;

}
// end getParams *****************************************************************

// search **********************************************************************
//function searchFormSubmit(form) {
//	if (form.aff[1].checked == true) {
		// this address needs to be changed once search is set up
//		window.location = "http://www.newslibrary.com/nlsearch.asp?search_mode=all&action=search&date_mode=year&year=last+180+days&sort=d%3Ah&nitems=10&region=kc&dbquery=" + form.keywords.value;
//		return false;
//	} else if (form.aff[2].checked == true) {
//		window.location = "http://www.kansascity.com/cgi-bin/mi/overture/overture.pl?Keywords=" + form.keywords.value;
//		return false;
//	}
//	return true;
//}
// end search ******************************************************************




function today_string() {
	// dependant on date functions defined in mi-utilities.js
	var today = new Date();
	return today.getDayString()+', '+today.getMonthString()+' '+today.getDate()+', '+today.getFullYear();
}

/* $(document).ready(function() {
   $(".winner th").prepend("<span><img src=\"http://hosted.ap.org/specials/elections/2006/check.gif\"/></span>");
 });
*/


// Added 11/07/08 By Ian Jennings for new social widgets

/* DEPRECATED 10-15-10 by common widgets -- tcb
function widgetFade(obj){
 $(obj+' .prev').fadeTo("normal",0.50);
 $(obj+' .next').click(function(){ $(obj+' .prev').fadeTo("normal",1.0); });
 };

$(document).ready(function() {

$('#widget-ink .nav a').click(function () { 
	$('#widget-ink .nav .active').removeClass('active');
   	$(this).addClass('active'); 
   	var id = $(this).attr('rel');
   	$('#widget-ink .blogList.scrollable').css({"display":"none"});
   	$('#widget-ink '+id).css({"display":"block"});
 });
 
 widgetFade('#widget-ink');


$('#widget-moms .nav a').click(function () { 
	$('#widget-moms .nav .active').removeClass('active');
   	$(this).addClass('active'); 
   	var id = $(this).attr('rel');
   	$('#widget-moms .blogList.scrollable').css({"display":"none"});
   	$('#widget-moms '+id).css({"display":"block"});
 });
 
 widgetFade('#widget-moms');

});
 */
// Added 11/14/08 By Ian Jennings for related story scrollers.


/* more deprecated stuff -- 10-22-10 
function moreScroll(scrollClass,limit) {
		$(scrollClass).wrapInner('<div class="wrapper"></div>');
		$(scrollClass).append('<div class="arrows"><a class="arrow prev"/><a class="arrow next"/></div>');
		$(scrollClass).addClass('moreScroll');
			$(scrollClass+' .wrapper').jCarouselLite({
			    btnNext: scrollClass+' .next',
			    btnPrev: scrollClass+' .prev',
				vertical: true,
				circular: false,
				scroll:1,
				visible:limit,
				speed:100,
			    mouseWheel:true
			    });
		
	}
*/
function replaceRelated(thisPath){
	
	$('.relatedScroll').load('/'+thisPath+'/v-more_stories/index.html', function(){
  		moreScroll('.relatedScroll',5);
 	});
}


// new search
mi.search = new mi.Search();
mi.search.searchParamConfig();
mi.search.checkOption();
     function changeLoc()  {
          if ($('#aff').val() == 'archives') {
        window.location = 'http://archives.kcstar.com/?search='+escape($('#q').val());
     }
     else if ($('#aff').val() == 'h_archives') {
        window.location = 'http://historical.kcstar.com/?search='+escape($('#q').val());
     }
     else if ($('#aff').val() == '1100'){
     	  window.location = 'http://www.kansascity.com/search_results?q='+$('#q').val();
     } else {
            return mi.search.submitForm();
          }
     }


// Added 11/14/08 By Ian Jennings for story tools drop down.
//$(document).ready(function(){ $(".storyTools ul").superfish({autoArrows:false}); }); 

// added for v1.5

$(document).ready(function() { 
	$('#storyAssets .link_list li:odd').addClass('stripe');
	$('.discResults li:odd').addClass('stripe');
	//$("#pluck_widget > ul").tabs();
	$("div.html_module > ul.nav").tabs();
	$("div.widget > ul.nav").tabs();
	
	$('#toggleComments').click(function () {
		if (this.className == 'off'){
		$(this).removeClass('off').addClass('on');
		      $('.comWrapper').slideUp();
		      $('#toggleComments').text('Show Comments');
		      return false;
		} else {
		$(this).removeClass('on').addClass('off');
		      $('.comWrapper').slideDown();
		      $('#toggleComments').text('Hide Comments');
		    return false;
		}
	});
	$('.subnav_trigger').toggle(function(e) {
	   e.preventDefault();
		$('.subnav').slideDown('fast');
		$(this).addClass('active');
	}, function(e) {
	   e.preventDefault();
		$('.subnav').slideUp('fast');
		$(this).removeClass('active');
	});
	
	// Custom create headers for Stargazing and Nation/World to keep them attached to their list, 
	// Workbench will not currently allow mixing a header and a list. 
	// We should probably create a headline stack with header component.
	$('ul#section440').before('<h2 class="widgetheader" id="nwheader"><a href="/nw">Nation &amp; World</a></h2>'); 
	$('ul#section932').before('<h2 class="widgetheader" id="stargazingheader"><a href="/stargazing/">Stargazing</a></h2>'); 
	
	// Dropdown subnav
	
	//$('#section440.story_list ul').after('<a class="go" href="/nw">More Stories</a>'); 
	//$('#section440 ul.story_list').click()
//	$('#section440.story_list ul').after('<a class="go" href="/nw">More Stories</a>'); 
	//$('#section932.story_list').after('<a class="go" href="/stargazing">More Stories</a>'); 


// date functions **************************************************************

Date.prototype.getDayString = function(){
  var day = '';
  switch (this.getDay()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}
Date.prototype.getMonthString = function(full){
  var day = '';
  switch (this.getMonth()) {
    case 0:
      return (full)?'January':'Jan';
    case 1:
      return (full)?'February':'Feb';
    case 2:
      return (full)?'March':'Mar';
    case 3:
      return (full)?'April':'Apr';
    case 4:
      return 'May';
    case 5:
      return (full)?'June':'Jun';
    case 6:
      return (full)?'July':'Jul';
    case 7:
      return (full)?'August':'Aug';
    case 8:
      return (full)?'September':'Sep';
    case 9:
      return (full)?'October':'Oct';
    case 10:
      return (full)?'November':'Nov';
    case 11:
      return (full)?'December':'Dec';
  }
}
// end date functions **********************************************************


	
// Pretty timestamps
timestamps=$('#center_rail span.date');
jQuery.each(timestamps, function(){
	var current_time=Math.round(new Date().getTime()/1000.0);  // get current time
	var modified_time=$(this).attr('title');                          // get time from element
	var time_diff=current_time-modified_time;                  // find the difference
	var timestamp=new Date(modified_time*1000);                // create new date object from difference
	var hrs=timestamp.getHours();                              // get the hours
	var ampm=(hrs<12)?' a.m. ':' p.m. ';                           // AM or PM?
	hrs=(hrs>12)?hrs-12:hrs;												// get off military time
	if (hrs==0) {
		hrs=12;
	}                                   
	var mins=timestamp.getMinutes();                           // get the minutes
	mins=(mins<10)?'0'+mins:mins;                              // ?????
	var mins_ago=new Date((current_time-modified_time)*1000);  // how many minutes?
	mins_ago=mins_ago.getMinutes();                            // minutes ago
	mins_ago=(mins_ago==0)?1:mins_ago;                         // is it 0 or 1?
	var min_string=(mins_ago==1)?' minute ago':' minutes ago'; // if it's 1, no plural
	if(time_diff>64800) {                                      // it's a day old
          timestamp = $(this).html().replace('AM', ampm).replace('PM', ampm);
        }
         else if(time_diff<3600){                                        // if the time difference is less than an hour
		timestamp='Updated '+mins_ago+min_string;             // show 
	}else{
		timestamp=hrs+':'+mins+ampm;
	}
	$(this).text(timestamp);
	$(this).show();});
});


// ADDEVENT is needed solely for the old mi init-overhaul script.
function addEvent(objObject, strEventName, fnHandler) {
  if (objObject.addEventListener) {
    objObject.addEventListener(strEventName, fnHandler, false);
  } else if (objObject.attachEvent) {
    objObject.attachEvent("on" + strEventName, fnHandler);
  }
}

