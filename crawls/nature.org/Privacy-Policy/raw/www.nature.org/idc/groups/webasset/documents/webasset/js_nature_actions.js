$(document).ready( function(){ 

	//When page loads...
	$("#shadowboxClose").append("#sb-title");
	$(".panel").hide(); //Hide all content
	$("ul.tabbedContentNav li:first").addClass("active").show(); //Activate first tab
	$(".panel:first").show(); //Show first tab content
	$("p.mission a").addClass("clickToSeeMore");
	$("div.highlightLink a").addClass("clickToSeeMore");
	$("div.highlightLink p a").addClass("clickToSeeMore");
	$("p.highlightLink p a").addClass("clickToSeeMore");
	$("p.highlightLink a").addClass("clickToSeeMore");
	$("div#splashButtonLink a").addClass("splashLink");
	$("div#givingSplashButtonLink a").addClass("givingSplashLink");
	$("ul#breadcrumbs li:last-child a").addClass("noBg");
	$(".videoLink1").replaceWith("<a rel=\"shadowbox;height=" + $("#video").height() + ";width=" +  $("#video").width() + "\" href=\"#video\" class=\"videoLink1\">" + $(".videoLink1").html() + "</a>");
	$(".videoLink2").replaceWith("<a rel=\"shadowbox;height=" + $("#video2").height() + ";width=" +  $("#video2").width() + "\" href=\"#video2\" class=\"videoLink2\">" + $(".videoLink2").html() + "</a>");
	$(".videoLink3").replaceWith("<a rel=\"shadowbox;height=" + $("#video3").height() + ";width=" +  $("#video3").width() + "\" href=\"#video3\" class=\"videoLink3\">" + $(".videoLink3").html() + "</a>");
	$(".panel2").hide(); 
	$("ul.tabbedContentNav2 li:first").addClass("active2").show(); //Activate first tab
	$(".panel2:first").show(); //Show first tab content
	$(".panel3").hide(); 
	$("ul.tabbedContentNav3 li:first").addClass("active3").show(); //Activate first tab
	$(".panel3:first").show(); //Show first tab content
	$("ul#pressList li:last-child div").removeClass("hr");
	$(".answer").hide();
	$(".correct").hide();
	$(".directions").hide();
	$("ul#pressList>li").tsort("span.pressDate",{order:"desc"});
	$("ul#pressList li div").addClass("hr");
	$("ul#pressList li:last-child div").removeClass("hr");
	$("ul.eventList>li").tsort("span.eventDate",{order:"asc"});
	$("ul.eventList li:last-child div").removeClass("hr");
	$(".multimediaText .multimediaVideo1 a.clickToSeeMore").replaceWith("<a rel=\"shadowbox;width=640;height=390\" href=\"#video1\" class=\"clickToSeeMore\">" + $(".multimediaText .multimediaVideo1 a.clickToSeeMore").text() + "</a>");
	$(".multimediaText .multimediaVideo2 a.clickToSeeMore").replaceWith("<a rel=\"shadowbox;width=640;height=390\" href=\"#video2\" class=\"clickToSeeMore\">" + $(".multimediaText .multimediaVideo2 a.clickToSeeMore").text() + "</a>");  
	var ad1 = $('#adBox img:first').attr('id');
	// Photo Credit
	$(".photoCredit").hover(
	function() { $(this).contents("span:last-child").css({ display: "block" }); },
	function() { $(this).contents("span:last-child").css({ display: "none" }); }
	);
		
	// Pagination 	
	var show_per_page = 10;
	var number_of_items = $('#pressList').children().size();
	var number_of_pages = Math.ceil(number_of_items/show_per_page);
	$('#current_page').val(0);
	$('#show_per_page').val(show_per_page);
	var navigation_html = '<a class="previous_link clickToSeePrev" href="javascript:previous();">' + localPrev + '</a>|';
    var current_link = 0;
	while(number_of_pages > current_link){
		navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + 
    current_link +'">'+ (current_link + 1) +'</a>|';
		current_link++;
	}
    navigation_html += '<a class="next_link clickToSeeMore" href="javascript:next();">' + localNext + '</a>';
	$('#page_navigation').html(navigation_html);
	$('#page_navigation .page_link:first').addClass('active_page');
	$('#pressList').children().css('display', 'none');
	$('#pressList').children().slice(0, show_per_page).css('display', 'block');
	
	// Pagination 2
	
	var show_per_page_1 = 10;
	var number_of_items_1 = $('#latestNews').children().size();
	var number_of_pages_1 = Math.ceil(number_of_items_1/show_per_page_1);
	$('#current_page_1').val(0);
	$('#show_per_page_1').val(show_per_page_1);
	var navigation_html_1 = '<a class="previous_link_1 clickToSeePrev" href="javascript:previous_1();">' + localPrev + '</a>|';
    var current_link_1 = 0;
	while(number_of_pages_1 > current_link_1){
		navigation_html_1 += '<a class="page_link_1" href="javascript:go_to_page_1(' + current_link_1 +')" longdesc="' + 
    current_link_1 +'">'+ (current_link_1 + 1) +'</a>|';
		current_link_1++;
	}
    navigation_html_1 += '<a class="next_link_1 clickToSeeMore" href="javascript:next_1();">' + localNext + '</a>';
	$('#page_navigation_1').html(navigation_html_1);
	$('#page_navigation_1 .page_link_1:first').addClass('active_page_1');
	$('#latestNews').children().css('display', 'none');
	$('#latestNews').children().slice(0, show_per_page_1).css('display', 'block');
	
	var newText = $(".pressDate").text().split(" ").join("</span> <span>");
  	//newText = "<span>" + newText + "</span>";
  	//$(".pressDate").html(newText);
  	var adList = $(".ad a").map(function () {return this.id;}).get().join(',');
   
	//On Click Events
	$("#skip-bt").one( "click", function () {
		$("#sb-container").hide;
		$("#sb-overlay").css("display", "none");
	});
	$("#siteSearch").click(function() {
		$("#searchForm").submit();
	});
	$("#viewGive").click(function() {
		$("#waysToGive ul").css('display', 'block');
		s_tabView('View All Ways to Give');
	});
	$("#languages").click(function() {
		$("#languages").toggleClass("languageClose");
		$("#languageList ul").toggle();	
	});
	$("a.vawtgClose").click(function() {
		$("#waysToGive ul").css('display', 'none');
	});
	$("#explorePlacesBox").click(function() {
		$("#explorePlaces ul").css('display', 'block');
		s_tabView('Explore Places');
	});
	$("a.exploreClose").click(function() {
		$("#explorePlaces ul").css('display', 'none');
	});
	$("ul.tabbedContentNav li").click(function() {
		$("ul.tabbedContentNav li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".panel").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});	
	$("ul.tabbedContentNav2 li").click(function() {
		$("ul.tabbedContentNav2 li").removeClass("active2"); //Remove any "active" class
		$(this).addClass("active2"); //Add "active" class to selected tab
		$(".panel2").hide(); //Hide all tab content
		var activeTab2 = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab2).fadeIn(); //Fade in the active ID content
		return false;
	});
	$("ul.tabbedContentNav3 li").click(function() {
		$("ul.tabbedContentNav3 li").removeClass("active3"); //Remove any "active" class
		$(this).addClass("active3"); //Add "active" class to selected tab
		$(".panel3").hide(); //Hide all tab content
		var activeTab3 = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab3).fadeIn(); //Fade in the active ID content
		return false;
	});
	$(".visit").click(function() {
		$("ul.tabbedContentNav li:first").removeClass("active"); 
		$(".visitTab").addClass("active"); 
		$(".panel").hide(); 
		var activeTab = $("#preserveTab3"); 
		$(activeTab).fadeIn(); 
		document.location='#thingsToDo';
		$(".preserveMap").load(location.href + " .preserveMap");
		return false;
	});	
	$(".visitTab h4 a").click(function() {	
	$(".preserveMap").load(location.href + " .preserveMap");	
	});
	$(".mapTab h4 a").click(function() {	
	$(".featureMap").load(location.href + " .featureMap");	
	});
	$(".fullBio").click(function() {
		$("ul.tabbedContentNav2 li").removeClass("active2"); 
		$(".bioTab").addClass("active2"); 
		$(".panel2").hide(); 
		var activeTab2 = $("#bioTab5"); 
		$(activeTab2).fadeIn(); 
		return false;
	});	
	$(".initiativesClose").click(function() {
		$("#initiativesAfricaMenu").hide();
		$("#initiativesAsiaMenu").hide();
		$("#initiativesCaribbeanMenu").hide();
		$("#initiativesCAmericaMenu").hide();
		$("#initiativesNAmericaMenu").hide();
		$("#initiativesSAmericaMenu").hide();
		$("#initiativesAfricaButton a").removeClass("on");
		$("#initiativesAsiaButton a").removeClass("on");
		$("#initiativesCaribbeanButton a").removeClass("on");
		$("#initiativesCAmericaButton a").removeClass("on");
		$("#initiativesNAmericaButton a").removeClass("on");
		$("#initiativesSAmericaButton a").removeClass("on");
	});
	$('ul#banner').innerfade({
    	speed: 1000,
     	timeout: 7000,
      	type: 'sequence',
    	containerheight: 	'315px',
   		slide_timer_on: 	'yes',
   		slide_ui_parent: 	'banner',
  		slide_ui_text:		'bannerBoxText',
 		pause_button_id: 	'pause_button',
  		slide_nav_id:		'slideNav'
   });
                    	
	$('ul#slideshow').innerfade({
 		speed: 1000,
 		timeout: 7000,
		type: 'sequence',
 		containerheight: 	'400px',
		slide_timer_on: 	'yes',
		slide_ui_parent: 	'slideshow',
		slide_ui_text:		'slideshowBoxText',
		pause_button_id: 	'ssPauseButton',
		slide_nav_id:		'ssSlideNav'
	});
                    	
	$.setOptionsButtonEvent();
 	$("#pause_button").click(function() {
		$.pause();
	});
	$("#next_button").click(function() {
		$.next();
	});
	$("#prev_button").click(function() {
		$.prev();
	});
	$("#first_button").click(function() {
		$.first();
	});
	$("#last_button").click(function() {
		$.last();
	});
	
	$("#ssPauseButton").click(function() {
		$.pause();
	});
	$("#ssNextButton").click(function() {
		$.next();
	});
	$("#ssPrevButton").click(function() {
		$.prev();
	});
	$("#ssFirstButton").click(function() {
		$.first();
	});
	$("#ssLastButton").click(function() {
		$.last();
	});
	
	$(".ad a").click(function () {
    s_adClicked(this.id);
    });
                                                                	                                                           	                    
});

function previous(){
	new_page = parseInt($('#current_page').val()) - 1;
	//if there is an item before the current active link run the function
	if($('.active_page').prev('.page_link').length==true){
		go_to_page(new_page);
	}
}
function next(){
	new_page = parseInt($('#current_page').val()) + 1;
	//if there is an item after the current active link run the function
	if($('.active_page').next('.page_link').length==true){
		go_to_page(new_page);
	} 
}
function go_to_page(page_num){
	//get the number of items shown per page
	var show_per_page = parseInt($('#show_per_page').val());
	//get the element number where to start the slice from
	start_from = page_num * show_per_page;
	//get the element number where to end the slice
	end_on = start_from + show_per_page;
	//hide all children elements of content div, get specific items and show them
	$('#pressList').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link[longdesc=' + page_num 
+']').addClass('active_page').siblings('.active_page').removeClass('active_page');
	//update the current page input field
	$('#current_page').val(page_num);
}
function previous_1(){
	new_page_1 = parseInt($('#current_page_1').val()) - 1;
	//if there is an item before the current active link run the function
	if($('.active_page_1').prev('.page_link_1').length==true){
		go_to_page_1(new_page_1);
	}
}
function next_1(){
	new_page_1 = parseInt($('#current_page_1').val()) + 1;
	//if there is an item after the current active link run the function
	if($('.active_page_1').next('.page_link_1').length==true){
		go_to_page_1(new_page_1);
	}
}
function go_to_page_1(page_num_1){
	//get the number of items shown per page
	var show_per_page_1 = parseInt($('#show_per_page_1').val());
	//get the element number where to start the slice from
	start_from_1 = page_num_1 * show_per_page_1;
	//get the element number where to end the slice
	end_on_1 = start_from_1 + show_per_page_1;
	//hide all children elements of content div, get specific items and show them
	$('#latestNews').children().css('display', 'none').slice(start_from_1, end_on_1).css('display', 'block');
	/*get the page link that has longdesc attribute of the current page and add active_page class to it
	and remove that class from previously active page link*/
	$('.page_link_1[longdesc=' + page_num_1 
+']').addClass('active_page_1').siblings('.active_page_1').removeClass('active_page_1');
	//update the current page input field
	$('#current_page_1').val(page_num_1);
}