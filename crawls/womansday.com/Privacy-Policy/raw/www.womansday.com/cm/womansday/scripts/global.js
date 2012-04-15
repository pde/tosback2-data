// WD - GLOBAL.JS


//Gives all Buttons with Class ".over" a hover - image must be named sam ething only with -over
$(function() {
	$(".over")
		.mouseover(function() {
		var src = $(this).attr("src").match(/[^\.]+/) + "-over.png";
		$(this).attr("src", src);
	})
	.mouseout(function() {
		var src = $(this).attr("src").replace("-over", "");
		$(this).attr("src", src);
	});
});


//initialize sliding right rail modules
$(function(){
	var $modules = $('#rightRail .module').not('#moduleSocialLinks, .home #moduleGames, #moduleKitchenMagician, #moduleEssentialTools');	//add modules to be excluded in the .not()
	//call our slideModule jQuery plugin.. contained in hdm-lib
	$modules.slideModule();
});
//this is for the newsletter signup input
$(function(){
	var $input = $('#vt_nl_emailfield'),
		placeholderText = $input.val();
	$input.focus(function(){
		if ( $input.val() == placeholderText ){
			$input.val('');
		}
	});
	$input.blur(function(){
		if ( ! $input.val() ){
			$input.val(placeholderText);
		}
	});
});


//Swaps Tabs top SEACH BOX
function searchtabs(swap) {
	if (swap == 'sitesearch') {
		$("#siteForm").show();
		$("#recipeForm").hide();
		$("#siteTab").removeClass("inactive").addClass("active");
		$("#recipeTab").removeClass("active").addClass("inactive");
		
	}
	else if (swap == 'recipesearch') {
		$("#siteForm").hide();
		$("#recipeForm").show();
		$("#recipeTab").removeClass("inactive").addClass("active");
		$("#siteTab").removeClass("active").addClass("inactive");
	}
	
}

function searchtabsb(swap) {
	if (swap == 'sitesearchb') {
		$("#siteFormB").show();
		$("#recipeFormB").hide();
		$("#siteTabB").removeClass("inactive").addClass("active");
		$("#recipeTabB").removeClass("active").addClass("inactive");
		
	}
	else if (swap == 'recipesearchb') {
		$("#siteFormB").hide();
		$("#recipeFormB").show();
		$("#recipeTabB").removeClass("inactive").addClass("active");
		$("#siteTabB").removeClass("active").addClass("inactive");
	}
	
}

//***************** Carousel Games *****************//

//global variable for CG
var intCurrentSlide = 0;
var intNewPos = 0;
var intTotalSlide;

function initSlideCG()
{
	var intImageSize = 90; //Image size follow spec.
	var intImageSpace = 18; //Space between the image follow spec.
	var intLPos = intImageSize + intImageSpace; //Current position left of first image.
	var intIncreaseLPos = 5; //Value left position after increase.
	var intImageList = 0;
	
	//Init position for each image.
	$(".slideContainer .gameTeaser").each(function() {
		$(this).css("left", intIncreaseLPos);
		intIncreaseLPos = intIncreaseLPos + intLPos;
		intImageList = intImageList + 1;
	});
	
	intTotalSlide = Math.ceil(intImageList / 5);

	//Load default style for CG.
	loadStyleCG(intCurrentSlide);
}

function initCGEvent()
{
	var tmpSlide;
	
	$('.arrow.next').bind('click', function() {
		tmpSlide = intCurrentSlide + 1;
		if(tmpSlide < intTotalSlide)
		{
			intCurrentSlide = intCurrentSlide +1;
			moveCGSlide(1);
			loadStyleCG(intCurrentSlide);
		}
	});
	
	$('.arrow.prev').bind('click', function() {
		tmpSlide = intCurrentSlide - 1;
		if(tmpSlide >= 0)
		{
			intCurrentSlide = intCurrentSlide - 1;
			moveCGSlide(0);
			loadStyleCG(intCurrentSlide);
		}
	});
	
	$('.slides .slide').bind('click', function() {
		tmpSlide = parseInt($(this).text()) - 1;
		scrollSlide(tmpSlide);
	});
}

function scrollSlide(scrollSlide)
{
	var scrollTime;
	
	if(scrollSlide < intCurrentSlide)
	{
		scrollTime = intCurrentSlide - scrollSlide;
		for(i=0; i < scrollTime; i++)
		{
			intCurrentSlide = intCurrentSlide -1;
			moveCGSlide(0);
		}
	}
	else
	{
		scrollTime = scrollSlide - intCurrentSlide;
		for(i=0; i < scrollTime; i++)
		{
			intCurrentSlide = intCurrentSlide +1;
			moveCGSlide(1);
		}
	}
	
	for(i=0; i < scrollSlide; i++)
	{
		if(scrollSlide < intCurrentSlide)
		{
			if(scrollSlide != intCurrentSlide)
			{
				intCurrentSlide = intCurrentSlide - 1;
				moveCGSlide(0);
			}
		}
		else
		{
			if(scrollSlide != intCurrentSlide)
			{
				intCurrentSlide = intCurrentSlide +1;
				moveCGSlide(1);
			}
		}
	}
}

function moveCGSlide(isNext)
{
	if(isNext)
		intNewPos = intNewPos - 540; //Modify 530 to fix your slide
	else
		intNewPos = intNewPos + 540; //Modify 530 to fix your slide
	$(".slideContainer .gameTeaser").animate({"margin-left":intNewPos}, 400);
	loadStyleCG(intCurrentSlide);
}

function loadStyleCG(intCurrentSlide)
{
	$(".slides .slide").each(function(intIndex) {
		if(intIndex == intCurrentSlide)
			$(this).addClass("current");
		else
			$(this).removeClass("current");
	});
	
	if((intCurrentSlide + 1) >= intTotalSlide)
		$(".arrow.next").addClass("inactive");
	else
		$(".arrow.next").removeClass("inactive");

	if(intCurrentSlide <= 0)
		$('.arrow.prev').addClass("inactive");
	else
		$('.arrow.prev').removeClass("inactive");

	if((intCurrentSlide + 1) < intTotalSlide && intCurrentSlide > 0)
	{
		$('.arrow.prev').removeClass("inactive");
		$('.arrow.next').removeClass("inactive");
	}
}

//***************** Horoscopes Dropdown List *****************//
function initHRSEvent()
{
	$(".ddHead").bind("click", function() {
		if($(this).hasClass("slideDown"))
		{
			$(this).removeClass("slideDown");
			$(this).addClass("slideUp");
			$(".ddContent").slideUp(0);
		}
		else
		{
			$(this).removeClass("slideUp");
			$(this).addClass("slideDown");
			$(".ddContent").slideDown(0);
		}
	});
}

// DOC READY FUNCTIONS TO BE ADDED HERE
$(document).ready(function(){
	// prevent exec script in search box       
	$("form[action='/search/'] a")
		.attr("href","#")
		.click(function(e){
					e.preventDefault();
					$(this).parents("form").submit();    
	});
	
	$("form[action='/search/']").submit(function(){
		$input = $("input[name=q]",this);
		//get unsafe search string 
		var s = $input.val();
		//replace
		s = s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
		//set safe search string 
		$input.val(s);
	});
	
	
	//Forums Social Icon - Answerology 4th icon
	
	hsocial_tool.pointer.forums = $("#iconForums, #siteFooter .social a[title=Forums]");
	hsocial_tool.pointer.forums_modal = $("#modForums");
	hsocial_tool.timerB = 0;
	
	$("#iconForums, #siteFooter .social a[title=Forums]")
		.hover(
			function(){
				clearTimeout(hsocial_tool.timerB);
				var jqo = $(this);
				
				$('#modForums .'+jqo.attr("tooltipShow")).show();
				$('#modForums .'+jqo.attr("tooltipHide")).hide();
				
				var offset = jqo.offset();
				var ttoffx = parseInt(jqo.attr("tooltipOffsetX"),10);
				var ttoffy = parseInt(jqo.attr("tooltipOffsetY"),10);
				
				$("#modForums").show();
				hsocial_tool.lastspot = 'forums';
				hsocial_tool.pointer.forums_modal.css("top", parseInt(offset.top,10)+parseInt(ttoffy,10)).css("left", parseInt(offset.left,10)+parseInt(ttoffx,10));
			},
			function(){
				hsocial_tool.timerB = setTimeout(function(){$("#modForums").hide();},150);
			});
	$("#modForums").hover(
			function(){clearTimeout(hsocial_tool.timerB);},
			function(){hsocial_tool.timerB = setTimeout(function(){$("#modForums").hide();},150);});
	
	
	/* Recipe Finder Module */
	$('#recipeFinder select').dropDownSelectBox();
	$('#advancedSearch_container form[name=search_term] select').dropDownSelectBox();
	$('#recipeFinder form[name=recipeFinder] a.findRecipes').click(function(){
		var url = '/search/fast_search_recipes/?search_term=';
		var valid = false;
		$("#recipeFinder form[name=recipeFinder] select").each(function(){
			var selected = $(this).find('option:selected').attr('value');
			if (selected != '') {
				var arg = $(this).attr('name');	
				url += '&' + arg + '=' + selected;
				valid = true;
			}
		});
		window.location.href = url + "&click=recipefinder";
		return false;
	});
	
	/* Astrology Module */
	$('#moduleAstrology select').dropDownSelectBox();

	//Carousel Games (Prefix: CG)
	initSlideCG();
	initCGEvent();
	
	//Horoscopes (Prefix: HRS)
	initHRSEvent();
});

function checkRFSearchTerm() {
	var search_term = $.trim($('#recipeFinder form[name=recipeFinder] input[name=search_term]').val());
	if (search_term == '' || search_term.toLowerCase() == 'search recipes') {
		alert('Please enter a valid search term');		
	} else {
		window.location.href = '/search/fast_search_recipes/?search_term=' + search_term;
	}
	return false;
}


if (!window.HDM){ HDM = {}; }
HDM.players = {
	EAG: {
		bgcolor: '#FFFFFF',
		wmode: 'transparent',
		autoplay: 'false',
		playerKey: 'AQ~~,AAAAABaD_Ow~,-TCSJkTjRc88KuzJz3DxehzDgUMVDe6i',
		playerID: '1251306892001',
		width: 480,
		height: 360,
		isVid: 'true',
		isUI: 'true',
		dynamicStreaming: 'true'
	}
};
