var careersSliderOffset;

$(document).ready(function(){
	copyrightYear();
	editMode(); // execute this before any dependent functions
	wrapZonesParts();
	horizontalCarousel();	// Typically lives in functions.js, but problem occurs where incorrect outerWidth is returned on carouselItem if its called AFTER wpTabs();
	ourPeopleCarousel();
	wpTabs();
	wpGallery();
	removeToolTips();
	inputInstructions();
	mastHeadSearch();
	hideIfEmpty();
	pageFields();
	expandCollapse();
	expandCollapseWebPartsInZone();
	flickrFeed();
	jqueryCookie();
	
	setCareersSliderOffset();
	
});
function setCareersSliderOffset() {
	var careerSlider = $("body").find("#careersCarouselLarge");
	if(careerSlider.length != 0) {
		careersSliderOffset = $("#careersCarouselLarge .carouselSlider").position().left;	
	}
}
/* ##### SHAREPOINT SCRIPT OVERRIDES ##### */

// Override of FixRibbonAndWorkspaceDimensions() from out-of-the-box SharePoint init.js.
// Solution for overriding SharePoint's ribbon positioning and page scrolling, which is not standards-based.
// Extension of solution documented at http://kyleschaeffer.com/sharepoint/sharepoint-2010-scrolling/
function FixRibbonAndWorkspaceDimensions() {
	ULSxSy:;
	g_frl=true;
	var elmRibbon=GetCachedElement("s4-ribbonrow");
	var elmWorkspace=GetCachedElement("s4-workspace");
	var elmWorkspaceSpacer=GetCachedElement("s4-workspace-spacer");
	var elmBodyTable=GetCachedElement("s4-bodyContainer");
	if(!elmRibbon || !elmWorkspace || !elmWorkspaceSpacer || !elmBodyTable) {
		return;
	}
	if(!g_setWidthInited) {
		var setWidth=true;
		if(elmWorkspace.className.indexOf("s4-nosetwidth") > -1) {
			setWidth=false;
		}
		g_setWidth=setWidth;
		g_setWidthInited=true;
	}
	else {
		var setWidth=g_setWidth;
	}
	var baseRibbonHeight=RibbonIsMinimized() ? 66 : 157;
	var ribbonHeight=baseRibbonHeight+g_wpadderHeight;
	if (GetCurrentEltStyle(elmRibbon, "visibility")=="hidden") {
		ribbonHeight=0;
	}
	if(elmRibbon.children.length > 0 && document.getElementsByTagName("html")[0].className.indexOf('ms-dialog-nr') == -1) {
		elmWorkspaceSpacer.style.paddingTop = ribbonHeight + 'px';
/* DMoxin - Modifying to allow SuperBg to be moved down when ribbon is present; This change is specific to Scripps. */
		/*
		$('.superBg').css('top','66px');
		$('.superBgDefault').css('top','66px');
		*/
	}
}

/* ##### end SHAREPOINT SCRIPT OVERRIDES ##### */


/* ##### BASE FUNCTIONS ##### */

// Get the current date and write year value to the ID in the master page
function copyrightYear() {
	var y = new Date().getYear();
	if(y<1000){
		y=y+1900;
	}
	$("#copyrightYear").text(y);
}

// Looks for the "editMode" flag to determine if the page is in edit mode and adds a hook to the body.
// The CSS and JS can use this hook to for execptions to styling and functionality while the page is in edit mode.
// The following "editMode" flag should be placed inside an EditModePanel on each page layout used by the site: 
// <span id="editMode">true</span>
function editMode() {
	if($("#editMode").text()=="true"){
		$("body").addClass("editMode");
	}
}

// Adds a class to web part zones, which in SP2010 do not have a CSS hook.
// Also adds a class to the web part HTML based on the Chrome Type selected in the web part properties.
// This class can be used to style web parts differently by changing the Chrome Type.
function wrapZonesParts() {
	$("table.s4-wpTopTable").parent().closest("table").addClass("wpz");
	
	// For web parts with the Title and Border chrome, add the class "wpTitleBorder" to the parent web part table (table.s4-wpTopTable).
	$(".ms-WPBorder").parents("table.s4-wpTopTable").addClass("wpTitleBorder");
	
	// For web parts with the Border Only chrome, add the class "wpBorderOnly" to the parent web part table (table.s4-wpTopTable).
	$(".ms-WPBorderBorderOnly").parents("table.s4-wpTopTable").addClass("wpBorderOnly");
}
/* --------------------------------------- Begin Carousel Scripts ------------------------------------------------------------ */

// Called from horizontalCarousel unless carousel data is Ajax driven
function animateCarousel(sliderObj,arrowLocation,isCareers,slideArrowsIn) {
	//alert("isCareers in animateCarousel: " + isCareers);
	var slideArrowsIn = slideArrowsIn;		// Need to un-hard-code this; but none of the arrows in the Intranet side need to slide out to hide;
	var arrowParent = sliderObj.parent().parent();
	var carouselItemWidth = arrowParent.find(".carouselItem").outerWidth();
	var maskWidth = sliderObj.closest(".carouselListMask").outerWidth();
	
	var sliderObjWidth = sliderObj.outerWidth();
	var sliderPosition = sliderObj.position();
	var sliderPositionLeft = sliderPosition.left;
	
	var newPosition;
// RIGHT POINTING ARROW *****************************
	if(arrowLocation == undefined || arrowLocation == "rightArrow") {
		if(isCareers) {
			// IE 7 and 8 exhibited unusual results with sliderPosition.left, so needed to modify calculation position left
			if((sliderPositionLeft % carouselItemWidth) != 0) {
				sliderPositionLeft = carouselItemWidth * Math.round(sliderPositionLeft/(carouselItemWidth));	
			}
			newPosition = sliderPositionLeft - carouselItemWidth*4;	// Multiplying by 4 to move carousel the distance of 4 people in careers carousel
			// Move the carousel only far enough to show those items hidden by mask; sometimes that is less than the width of the mask
			if(((sliderObjWidth + sliderPositionLeft) > carouselItemWidth*4) && ((sliderObjWidth + sliderPositionLeft) <= ((carouselItemWidth*4)*2))) {
				// ((2910 + -1358) > 194 * 4)  &&  (2910 + -1358) < ((194 * 4) * 2)
				// Then we don't need to move the slider width of mask, only enough to show those items who are hidden.
				amountToMove = sliderObjWidth + sliderPositionLeft - maskWidth;
				newPosition = sliderPositionLeft - amountToMove - careersSliderOffset;
			}
 
		}
		// Else, move carousel left by the width of the mask area
		else {
			// IE 7 and 8 exhibited unusual results with sliderPosition.left, so needed to modify calculation position left
			if((sliderPositionLeft % maskWidth) != 0) {
				sliderPositionLeft = maskWidth * Math.round(sliderPositionLeft/maskWidth);	
			}
			newPosition = sliderPositionLeft - maskWidth;
			// Move the carousel only far enough to show those items hidden by mask; sometimes that is less than the width of the mask
			if(((sliderObjWidth + sliderPositionLeft) > maskWidth) && ((sliderObjWidth + sliderPositionLeft) < maskWidth*2)) {
				// Then we don't need to move the slider width of mask, only enough to show those items who are hidden.
				amountToMove = maskWidth - (sliderObjWidth + sliderPositionLeft);// - maskWidth;
				if(amountToMove < maskWidth) {
					newPosition = amountToMove;
				}
			}
		}
	}
// LEFT POINTING ARROW	****************************
	else if(arrowLocation == "leftArrow") {
		if(isCareers) {
			// IE 7 and 8 exhibited unusual results with sliderPosition.left, so needed to modify calculation position left
			if((sliderPositionLeft % carouselItemWidth ) != 0) {
				sliderPositionLeft = carouselItemWidth * Math.round(sliderPositionLeft/(carouselItemWidth));	
			}
			newPosition = carouselItemWidth*4 + sliderPositionLeft; // Multiplying by 4 to move carousel the distance of 4 people in careers carousel
			// Move the carousel only far enough to show those items hidden by mask; sometimes that less than the width of the mask
			if(sliderPositionLeft <= 0 && (Math.abs(sliderPositionLeft) < carouselItemWidth*4)) {
				newPosition = careersSliderOffset;
			}
			
		}
		// Else, move carousel right by the width of the mask area
		else {
			// IE 7 and 8 exhibited unusual results with sliderPosition.left, so needed to modify calculation position left
			if((sliderPositionLeft % maskWidth) != 0) {
				sliderPositionLeft = maskWidth * Math.round(sliderPositionLeft/maskWidth);	
			}
			newPosition = maskWidth + sliderPositionLeft;
			// Move the carousel only far enough to show those items hidden by mask; sometimes that less than the width of the mask
			if(Math.abs(sliderPositionLeft) < maskWidth) {
				newPosition = 0;
			}
		}
  	}

	// Only for small people carousel in the careers subpages;
	$(".headerHolder").animate({left:newPosition},'slow','easeOutQuad');

	sliderObj.animate({left:newPosition}, 'slow', 'easeOutQuad', function() {
		if(arrowLocation == undefined || arrowLocation == "rightArrow") {
			if(isCareers) {
				showRightArrow = updateRightArrow(sliderObjWidth, sliderPositionLeft-carouselItemWidth*4, maskWidth);
				showLeftArrow = updateLeftArrow(sliderPositionLeft-(carouselItemWidth*2));
			}
			else {
				showRightArrow = updateRightArrow(sliderObjWidth, sliderPositionLeft-maskWidth, maskWidth);
				showLeftArrow = updateLeftArrow(sliderPositionLeft-maskWidth);
			}
		}
		else if(arrowLocation == "leftArrow") {
			if(isCareers) {
				showRightArrow = updateRightArrow(sliderObjWidth, sliderPositionLeft + carouselItemWidth*4, maskWidth);
				showLeftArrow = updateLeftArrow(newPosition - carouselItemWidth);
			}
			else {
				showRightArrow = updateRightArrow(sliderObjWidth, maskWidth + sliderPositionLeft, maskWidth);
				showLeftArrow = updateLeftArrow(maskWidth + sliderPositionLeft);
			}
		}
		// Used by large people careers carousel only
		setOpacityOnItem(isCareers,newPosition,carouselItemWidth, sliderObjWidth, maskWidth);
		updateArrows(showRightArrow,showLeftArrow,slideArrowsIn,arrowParent);
		// Only for small people carousel in the careers subpages; pass the carousel div (div after the trigger).
		// Checks the id of the arrowParent for "peopleCarousel" before continuing. 
		showHidePeopleItemHeader(arrowParent,sliderObj.find(".carouselItem.active").index());
		
	});
}

// Excepts the carousel object and index of the carousel item; 
// Hides or shows headerHolder depending on whether the item is in view
// given the current position of the carouselSlider.  Only used on little person carousel currently
function showHidePeopleItemHeader(theCarouselObj,carouselItemIndex) {

	if($(theCarouselObj).attr("id") == "peopleCarousel") {
		var maskWidth = $(theCarouselObj).find(".carouselListMask").outerWidth();	
		var positionOfItem = $(".carouselItem").outerWidth() * carouselItemIndex;
		var sliderPosition = $(".carouselSlider").position().left;
		var carouselItems = $(theCarouselObj).find(".carouselItem");
		$(theCarouselObj).find(".carouselItem").each(function(index) {
			if(index == carouselItemIndex) {
				 currentItemsBeforeActive = index;
			}
		});
		
		carouselItemPosition = $(".carouselItem").outerWidth() * currentItemsBeforeActive;
		if(((carouselItemPosition + sliderPosition) >= 0) && ((sliderPosition + carouselItemPosition) < 847)) {
			var headerHolderObj = $(".headerHolder");
			if(!(headerHolderObj.is(":visible"))) {
				//$(".headerHolder").fadeIn("fast");
				$(".headerHolder").show();
			}		
		}
		else {
			var headerHolderObj = $(".headerHolder");
			if(headerHolderObj.is(":visible")) {			
				$(".headerHolder").hide();
			}		
		}
	}
} // end showHidePeopleItemHeader()

// Function is called from ourPeopleCarousel, reads the text of the 'disciplineName' id/page field, then
// then compares it to each title on all the little people.  When it finds a match, it passes the
// index of the little person back.
// Example URL: http://staff.dev.sni.com/careers/life-at-sni/our-people/Pages/administration.aspx
function selectCurrentLittlePeople() {
	var currentPersonIndex = 0;
	var hasPeopleCarousel = ($("#peopleCarousel").html()) != null ? true : false;
	if(hasPeopleCarousel) {
		var disciplineString = $("#disciplineName > span").text();
		var littlePeopleObj = $("#peopleCarousel").find("h3>a");
		littlePeopleObj.each(function(index) {
			//alert("h3 > a.html(): ~" + $(this).html() + "~\ndiscipline text: " + disciplineString);
			var headerDisciplineText = ($(this).html()).split(":");
			if(headerDisciplineText[0] == disciplineString) {
				currentPersonIndex = index;
			};
		});
		return currentPersonIndex
	}
}

// Function is used on the 'Our People' detail page to handle highlighting the applicable
// little person.  Also handles the hovers on the other little people and moving the active one into view
function ourPeopleCarousel() {
	if(!$('body').hasClass('editMode')) {

		var peopleCarouselItems = $("#peopleCarousel").find('div.carouselItem');
		$("#peopleCarousel").prepend("<div class=\'headerHolder\'></div>");
		var personIndex = selectCurrentLittlePeople();  // returns index of person with header that matches discipline in page header
	
		peopleCarouselItems.each(function(index) {
			$(this).prepend('<img src="/Style Library/SNI/Images/career_carousel_sml_person_cover.png" class="personCover"/>');
			if(index == personIndex) {
				$(this).find('img.personCover').hide();
				$(this).addClass('active');
				var currPersonTitle = $(this).find("h3").html();
				
				positionHeader(index,currPersonTitle);
				
				//move carousel if necessary; hard-coding assumes that there will be <=22 people ever appearing in the small carousel.
				var itemPosition = $(this).position().left;
				var maskWidth = $("#peopleCarousel").find('.carouselListMask').outerWidth();
				var sliderObjWidth = $("#peopleCarousel").find(".carouselSlider").outerWidth();
				var sliderPositionLeft = $("#peopleCarousel").find(".carouselSlider").position().left;
				var difference = itemPosition + sliderPositionLeft;
								
				if(itemPosition >= maskWidth) {
					newPosition = maskWidth - (itemPosition + $(this).outerWidth());
					$(".headerHolder").animate({left:newPosition},'slow','easeOutQuad');
					$("#peopleCarousel").find(".carouselSlider").animate({left: newPosition}, function(){
						var showRightArrow = updateRightArrow(sliderObjWidth, newPosition, maskWidth);
						var showLeftArrow = updateLeftArrow(newPosition);
						updateArrows(showRightArrow,showLeftArrow,true,$("#peopleCarousel"));
						//showHidePeopleItemHeader($("#peopleCarousel"),carouselItemIndex);
						//alert("sliderPositionLeft: " + $("#peopleCarousel").find(".carouselSlider").position().left + "\nnewPosition: " + newPosition);
					});
				}
				
			} // end if index=personIndex
		}); // end peopleCarouselItems.each
		
		$("#peopleCarousel div.carouselItem").hover(function(index) {
			
			if(!($(this).hasClass('active'))) {
				
				var currItemIndex = ($('.carouselItem').index($(this)));
				$(this).find('img.personCover').hide();
				var currPersonTitle = $(this).find("h3").html();
				$(".headerHolder").find('.tempHeader').each( function() {
					$(this).remove();
				});
				
				positionHeader(currItemIndex,currPersonTitle);
				showHidePeopleItemHeader($("#peopleCarousel"),currItemIndex);
				
			}
		},
		function() {
			if(!($(this).hasClass('active'))) {
				$(this).find('img.personCover').show();
				$(this).find('h3').hide();
				
				$(".headerHolder").find('.tempHeader').each( function() {
					$(this).remove();
					
				});
				$("#peopleCarousel div.active img.personCover").hide();
				
				var currItemIndex = ($('.carouselItem').index($(this)));
				var currPersonTitle = $(this).find("h3").html();			
				positionHeader(personIndex,($(".carouselItem:eq(" + personIndex + ")").find("h3").html()));//currPersonTitle);
				showHidePeopleItemHeader($("#peopleCarousel"),$("#peopleCarousel").find(".carouselItem.active").index());
					
			}
		});
	}
}
function positionHeader(itemIndex,itemHtml) {

	$("#peopleCarousel div.active h3").hide();
	$(".headerHolder").prepend("<h3 class='tempHeader' style='display:block'>" + itemHtml + "</h3>");
	$(".headerHolder h3").append("<div class='wordBubbleArrow'></div>");
	var positionForHeader = $(".carouselItem").outerWidth() * itemIndex;
	$(".headerHolder").find("h3.tempHeader").css("left",positionForHeader);
	
}


function horizontalCarousel() {
	// Global var in this .js file to hold this constant set help position large person people carousel

	if(!$('body').hasClass('editMode')) {
		var carouselItemWidth = 0;
		var carouselMaskWidth = 0;
		var carouselSliderWidth;
		var carouselItemCount = 0;
		
		
		var slideArrowsIn = true;
		var carouselItems;

		$(".carouselTrigger").each(function(){
			var isCareersCarousel = false;
			carouselSliderWidth = 0;	
			carouselParent = $(this).next();
			currentCarouselId = "#" + carouselParent.attr("id");
			
			// If its a careers carousel, we move the carousel the width of one item on each click instead of moving it the width of the mask
			if($(this).hasClass("careers")) {
				isCareersCarousel = true;
			}
			
			// Check the trigger for the slideArrowsIn/Out class to determine which way arrows need to slide
			if($(this).hasClass("slideArrowsOut")) {
				slideArrowsIn = false;
			}
			carouselItemCount = $(this).next().find(".carouselItem").length;
						
			// Wrap children of the div that follows the trigger in a wrapper .carouselListMask
			carouselParent.find('.carouselItem').wrapAll("<div class=\"carouselSlider\"/>");

			carouselParent.find(".carouselSlider").wrapAll("<div class=\"carouselListMask\"/>");
			// Set width of carouselSlider
			carouselItemWidth = carouselParent.find(".carouselItem").outerWidth();

			carouselMaskWidth = carouselParent.find(".carouselListMask").outerWidth();
			carouselSliderWidth = carouselItemWidth * carouselItemCount;
			carouselParent.find(".carouselSlider").css("width",(carouselSliderWidth));
			// Add arrows
			carouselParent.find('.carouselListMask').after('<a href="javascript:void(0);" class="carouselArrowRight">Move Carousel Left</a>').before('<a href="javascript:void(0);" class="carouselArrowLeft">Move Carousel Right</a>');
			
			// MANAGE ARROWS
			// Set up arrows initially; pass carousel items parent width, that parents x position, and the mask width
			//NEW CHANGE: var startingSliderPosition = $('.carouselSlider').position();
			var startingSliderPosition = carouselParent.find(".carouselSlider").position();
			startingPositionLeft = startingSliderPosition.left;

			var showRightArrow = updateRightArrow(carouselSliderWidth, startingPositionLeft, carouselMaskWidth);
			var valueForLeftArrow = 0;
			var showLeftArrow = updateLeftArrow(valueForLeftArrow);
			//alert("in horizontalCarousel; showRightArrow = " + showRightArrow + "; showLeftArrow = " +showLeftArrow);
			updateArrows(showRightArrow,showLeftArrow,slideArrowsIn,carouselParent); 
			var newPosition;
			
			if(isCareersCarousel) {
				
				getLeftItemToFade(194, carouselItemWidth);
				getRightItemToFade(194, carouselMaskWidth, carouselItemWidth);
			}
			
			// Move carousel on arrow images click 
			carouselParent.find('.carouselArrowRight').click(function() {
				var arrowParent = $(this).parent();
				// check the trigger div for the careers class
				isCareersCarousel = arrowParent.prev().hasClass("careers") ? true : false;
				slideArrowsIn = arrowParent.prev().hasClass("slideArrowsIn") ? true : false;
				var currentSlider = arrowParent.find(".carouselSlider");
				//alert("about to animate carousel");
				animateCarousel(currentSlider,"rightArrow",isCareersCarousel,slideArrowsIn);
			});
			
			carouselParent.find('.carouselArrowLeft').click(function() {
				var arrowParent = $(this).parent();
				// check the trigger div for the careers class
				isCareersCarousel = arrowParent.prev().hasClass("careers") ? true : false;
				slideArrowsIn = arrowParent.prev().hasClass("slideArrowsIn") ? true : false;
				var currentSlider = arrowParent.find(".carouselSlider");
				animateCarousel(currentSlider,"leftArrow",isCareersCarousel,slideArrowsIn);
			});
		});
	}
} // end horizontalCarousel

// Called from main carousel function to determine whether to right arrow should be hidden or shown
// is called AFTER the carousel is moved
function updateRightArrow(sliderWidth, currentLeft, maskWidth) {
	var showRightArrow = true;
	//alert("sliderWidth: " + sliderWidth + ";\ncurrentLeft: " + currentLeft + ";\n maskWidth: " + maskWidth);
	if((sliderWidth + currentLeft) > maskWidth) {		
		showRightArrow = true;
	}
	else {
		showRightArrow = false;
	}
	return showRightArrow;
}
// Called from main carousel function to determine whether to left arrow shoule be hidden or shown
// is called AFTER the carousel is moved
function updateLeftArrow(currentLeft) {
	var showLeftArrow = true;
	//alert("currentLeft: " + currentLeft);
	if(currentLeft < 0) {			
		showLeftArrow = true;
	}
	else {
		showLeftArrow = false;
	}
	return showLeftArrow;
}
// Called from main carousel function AFTER the carousel has moved; hides or shows the arrows.
function updateArrows(showRight, showLeft, slideArrowsIn, arrowParent) {
	rightArrow = arrowParent.find('.carouselArrowRight');
	leftArrow = arrowParent.find('.carouselArrowLeft');
	//alert("updateArrow function; slide out left arrwo: " + showLeft);
	if(!showRight && rightArrow.is(':visible')){
		if(!slideArrowsIn) {
			rightArrow.hide("slide", { direction: "right" }, 200);
		}
		else {
			rightArrow.hide("slide", { direction: "left" }, 200);
		}
	}
	else if(showRight && rightArrow.is(':hidden')){
		if(!slideArrowsIn){
			rightArrow.show("slide", { direction: "right" }, 200);
		}
		else {
			rightArrow.show("slide", { direction: "left" }, 200);
		}
	}
	if(!showLeft && leftArrow.is(':visible')){
		
		if(!slideArrowsIn) {		
			leftArrow.hide("slide", { direction: "left" }, 200);
		}
		else {
			leftArrow.hide("slide", { direction: "right" }, 200);
		}
	}
	else if(showLeft && leftArrow.is(':hidden')) {
		//alert("slide arrow into view");
		if(!slideArrowsIn) {
			leftArrow.show("slide", { direction: "left" }, 200);
		}
		else {
			leftArrow.show("slide", { direction: "right" }, 200);

		}
	}
}


/* End Carousel Functions */

// Turns a web part zone into a tab control.
function wpTabs() {
	
	var t='';
	// For each web part zone...
	$('.wpz').find('h3.ms-WPTitle').filter(function(){
		// Find the web parts with titles that begin with [ and give them the wpTab class
		t=$(this).text();
		return t.substring(0,1)=='[';
	}).closest('table.s4-wpTopTable').addClass('wpTab');
	
	// For each wpTab web part, if this web part does not have the parent div class "wpz wpzTabbed" wrapping its web part zone, make it so.
	$('.wpTab').each(function(){
		if($(this).parents('.wpzTabbed').length<1){
			$(this).closest('.wpz').wrap('<div class=\"wpz wpzTabbed\"></div>');
		}
	});
	
	// Check to see if page is in edit mode
	if($('body').hasClass('editMode')){
		$('.wpzTabbed').each(function(){
			// Remove empty zone cell
			$('td#MSOZone_EmptyZoneCell').parent().remove();
			
			// Add class "wpTabRow" to each web part zone table row that contains a wpTab web part
			$(this).find('.wpTab').closest('tr').addClass('wpTabRow');
			
			// Find each wpTab web part row in this zone...
			$(this).find('.wpTabRow').each(function(){
				// Then inject markers before and after each tab group to easily distinguish the start and end of each group.
				$(this).before('<tr><td>&mdash; Tab Start &mdash;</td></tr>').nextUntil('.wpTabRow').after('<tr><td style="padding-bottom:25px;">&mdash; Tab End &mdash;</td></tr>');
			});
		});
	}
	else{
		// Remove the parent containers around the web parts
		$('.wpzTabbed').find('table.s4-wpTopTable').unwrap().unwrap().unwrap().unwrap();
		
		// Insert a tab strip list at the top of each tabbed web part zone, and for each tabbed web part zone...
		$('.wpzTabbed').prepend('<ul class="tabStrip"></ul>').each(function(zoneIndex){
			// Find each tab web part in this zone...
			$(this).find('.wpTab').each(function(tabIndex){
				// Get the trimmed web part title
				t=trimWPTabLbl($(this).find('h3.ms-WPTitle').text());
				// Then add a tab to the tab strip list and set the text of the tab to be the trimmed web part title.
				$(this).closest('.wpzTabbed').find('ul.tabStrip').append('<li><a href="#tabBodyZone'+zoneIndex+'Tab'+tabIndex+'">'+t+'</a></li>');
				// Then wrap this tab web part and all of the web parts belonging to this tab in a tab body with a unique ID.
				$(this).nextUntil('.wpTab').andSelf().wrapAll('<div id="tabBodyZone'+zoneIndex+'Tab'+tabIndex+'" class="tabBody"></div>');
			});
			// Set the first tab to be active by default.
			$(this).find('ul.tabStrip li:first').addClass('active');
			$(this).find('.tabBody:first').addClass('active');
		});
	
		// Remove the web part vertical spacer for each tab web part because it is extraneous.
		$('.wpTab').next('.ms-PartSpacingVertical').remove();
		
		// Remove the tab web parts that marked the start of a new tab.
		$('.wpTab').remove();
		
		// Handle the click event for the tab so that the proper tab is shown active and the proper tab body displays.
		$('.wpzTabbed ul.tabStrip li a').click(function(){
			if(!$(this).parent('li').hasClass('active')){
				var i=$(this).parent('li').index();
				$(this).closest('.wpzTabbed').find('li.active, .tabBody.active').removeClass('active');
				$(this).parent('li').addClass('active');
				$(this).closest('.wpzTabbed').find('.tabBody:eq('+i+')').addClass('active');
			}
			// Override the default click behavior of the link.
			return false;
		});
	}
		
	// Return the text within the brackets of the supplied string.
	function trimWPTabLbl(t) {
		var lbl=t.split('[');
		lbl=lbl[1].split(']');
		lbl=lbl[0];
		return lbl;
	}
}

// COMMENT
function wpGallery() {
	var options = {
		color:'blue'
	};
	//$('.galleryWP').galleryWP(options);
}

// Remove the title attributes that SharePoint applies to web part header table cells.
// The title attribute values SharePoint puts in the title tags is description text about the web part, which we do not want to display to end users.
function removeToolTips() {
	$(".ms-WPHeaderTd").removeAttr("title");
}

// Handles the display of default text in an input field
function inputInstructions() {
	var val;
	var lbl;
	$(".inputInstructions").each(function(){
		val=$(this).attr("value");
		lbl=$(this).prev("label").text();
		if(val==""||val==lbl){
			$(this).attr("value",lbl).focus(function(){
				if(val==""||val==lbl){
					$(this).attr("value","");
				}
			}).blur(function(){
				val=$(this).attr("value");
				if(val==""){
					$(this).attr("value",lbl);
				}
			});
		}
	});
}

// Sets the text to display in the search box by default.  Also injects a label with that text in front of the input for accessibility.  Adds the "inputInstructions" class to handle the default text for the input.
function mastHeadSearch() {
	$("#mastHeadSearch input.ms-sbplain").removeAttr("title").addClass("inputInstructions").before('<label>Search</label>');
}

// Apply the "hideIfEmpty" class to elements that should be hidden if no web part (or in edit mode, web part zone) is placed within it.
function hideIfEmpty() {
	$(".hideIfEmpty").each(function(){
		if($(this).find("table.s4-wpTopTable, table.ms-SPZone").length>0){ // Looks for table tag since web parts are tables and the web part zone in edit mode is a table.
			$(this).addClass("show"); // Add the class that turns the display of the element to "block".
		}
	});
}

// This function hides page fields (label and value) when the field value is empty.
function pageFields() {
	$(".pageFieldValue").each(function(){
		if($.trim($(this).text()).length<1){
			$(this).parent(".pageField").css("display","none");
		}
	});
}

// Toggles the display list items.
function expandCollapse() {
	$(".accordionList dl dt").click(function() {
		var head = $(this);
		$(head).next("dd").toggle();
		$(head).toggleClass("expanded");
		return false;
	});
	$(".accordionList>ul>li>a").click(function() {
		var head = $(this);
		$(head).next(".expandedBody").toggle();
		$(head).toggleClass("expanded");
		return false;
	});
}

// Makes the web part title a clickable region that toggles the display of the web part body.
function expandCollapseWebPartsInZone() {
	$(".expandCollapseWebPartsInZone td.ms-WPHeaderTd").addClass("expandCollapseHead");
	$(".expandCollapseHead").parent().parent().parent().parent().parent().parent().parent().addClass("expandCollapse");
	$("table.expandCollapse .ms-WPBody").parent().parent().addClass("expandCollapseBody");
	$(".expandCollapseWebPartsInZone .ms-WPTitle a").removeAttr("href");
	
	$(".expandCollapseWebPartsInZone .expandCollapseHead").click(function() {
		var headParentRow = $(this).parent().parent().parent().parent().parent();
		if($(headParentRow).next("tr.expandCollapseBody").hasClass("expanded")) {
			$(this).removeClass("expanded");
			$(headParentRow).next("tr.expandCollapseBody").removeClass("expanded");
		}
		else {
			$(this).addClass("expanded");
			$(headParentRow).next("tr.expandCollapseBody").addClass("expanded");
		}
		return false;
	});
}

// Sets the cropped height and width of the images returned in the Flickr feed
function flickrFeed() {
	// For each Flickr Feed web part
	$(".IWFlickrFeed").each(function(){
		// If the feed is returning at least one image
		if($(this).find("a.IWFlickrFeedItem").length<1){
			// Get the width of the image that was set in the Flickr Feed web part properties
			var w = $("a.IWFlickrFeedItem:first-child img").attr("width");
			// The maximum width allowed is 75px, as the image size returned by the "square" RSS feed from Flickr is 75px x 75px
			if(w>75){
				w=75;
			}
			// Crop the height and with of the anchor tag that contains the image to be the width set in the Flickr Feed web part properties.
			// The image should be absolutely posititioned within the anchor tag in order to allow for the cropping.
			$(this).find("a.IWFlickrFeedItem").css("height",w).css("width",w);
		}
	});
}

/* ##### end BASE FUNCTIONS ##### */


/* ##### PLUGINS ##### */

/* ***** Gallery Web Part ***** */
/*
 * jQuery Cycle Lite Plugin
 * http://malsup.com/jquery/cycle/lite/
 * Copyright (c) 2008 M. Alsup
 * Version: 1.0 (06/08/2008)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.2.3 or later
 */
;(function($) {

	var ver = 'Lite-1.0';
	
	$.fn.cycle = function(options) {
		return this.each(function() {
			options = options || {};
				
			if (this.cycleTimeout) clearTimeout(this.cycleTimeout);
			this.cycleTimeout = 0;
			this.cyclePause = 0;
				
			var $cont = $(this);
			var $slides = options.slideExpr ? $(options.slideExpr, this) : $cont.children();
			var els = $slides.get();
			if (els.length < 2) {
				if (window.console && window.console.log){
					window.console.log('terminating; too few slides: ' + els.length);
				}
				return; // don't bother
			}
				
			// support metadata plugin (v1.0 and v2.0)
			var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
				
			opts.before = opts.before ? [opts.before] : [];
			opts.after = opts.after ? [opts.after] : [];
			opts.after.unshift(function(){ opts.busy=0; });
			
			// allow shorthand overrides of width, height and timeout
			var cls = this.className;
			opts.width = parseInt((cls.match(/w:(\d+)/)||[])[1]) || opts.width;
			opts.height = parseInt((cls.match(/h:(\d+)/)||[])[1]) || opts.height;
			opts.timeout = parseInt((cls.match(/t:(\d+)/)||[])[1]) || opts.timeout;
			
			if ($cont.css('position') == 'static'){
				$cont.css('position', 'relative');
			}
			if (opts.width){
				$cont.width(opts.width);
			}
			if (opts.height && opts.height != 'auto'){
				$cont.height(opts.height);
			}
			
			var first = 0;
			$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) { 
				$(this).css('z-index', els.length-i) 
			});
			
			$(els[first]).css('opacity',1).show(); // opacity bit needed to handle reinit case
			if ($.browser.msie) els[first].style.removeAttribute('filter');
			
			if (opts.fit && opts.width){
				$slides.width(opts.width);
			}
			if (opts.fit && opts.height && opts.height != 'auto'){
				$slides.height(opts.height);
			}
			if (opts.pause){
				$cont.hover(function(){this.cyclePause=1;}, function(){this.cyclePause=0;});
			}
			
			$.fn.cycle.transitions.fade($cont, $slides, opts);
			
			$slides.each(function() {
				var $el = $(this);
				this.cycleH = (opts.fit && opts.height) ? opts.height : $el.height();
				this.cycleW = (opts.fit && opts.width) ? opts.width : $el.width();
			});
			
			$slides.not(':eq('+first+')').css({opacity:0});
			if (opts.cssFirst){
				$($slides[first]).css(opts.cssFirst);
			}
			
			if (opts.timeout) {
				// ensure that timeout and speed settings are sane
				if (opts.speed.constructor == String)
					opts.speed = {slow: 600, fast: 200}[opts.speed] || 400;
				if (!opts.sync)
					opts.speed = opts.speed / 2;
				while((opts.timeout - opts.speed) < 250)
					opts.timeout += opts.speed;
				}
				opts.speedIn = opts.speed;
				opts.speedOut = opts.speed;
				
				opts.slideCount = els.length;
				opts.currSlide = first;
				opts.nextSlide = 1;
				
				// fire artificial events
				var e0 = $slides[first];
				if (opts.before.length)
					opts.before[0].apply(e0, [e0, e0, opts, true]);
				if (opts.after.length > 1)
					opts.after[1].apply(e0, [e0, e0, opts, true]);
				
				if (opts.click && !opts.next)
					opts.next = opts.click;
				if (opts.next)
					$(opts.next).bind('click', function(){return advance(els,opts,opts.rev?-1:1)});
				if (opts.prev)
					$(opts.prev).bind('click', function(){return advance(els,opts,opts.rev?1:-1)});
				
				if (opts.timeout)
					this.cycleTimeout = setTimeout(function() {
						go(els,opts,0,!opts.rev)
					}, opts.timeout + (opts.delay||0));
		});
	};
	
	function go(els, opts, manual, fwd) {
		if (opts.busy) return;
		var p = els[0].parentNode, curr = els[opts.currSlide], next = els[opts.nextSlide];
		if (p.cycleTimeout === 0 && !manual){
			return;
		}
		
		if (manual || !p.cyclePause) {
			if (opts.before.length){
				$.each(opts.before, function(i,o) { o.apply(next, [curr, next, opts, fwd]); });
			}
			var after = function() {
				if ($.browser.msie){
					this.style.removeAttribute('filter');
				}
				$.each(opts.after, function(i,o) { o.apply(next, [curr, next, opts, fwd]); });
			};
	
			if (opts.nextSlide != opts.currSlide) {
				opts.busy = 1;
				$.fn.cycle.custom(curr, next, opts, after);
			}
			var roll = (opts.nextSlide + 1) == els.length;
			opts.nextSlide = roll ? 0 : opts.nextSlide+1;
			opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
		}
		if (opts.timeout){
			p.cycleTimeout = setTimeout(function() { go(els,opts,0,!opts.rev) }, opts.timeout);
		}
	};
	
	// advance slide forward or back
	function advance(els, opts, val) {
		var p = els[0].parentNode, timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			opts.nextSlide = 0;
		}
		go(els, opts, 1, val>=0);
		return false;
	};
	
	$.fn.cycle.custom = function(curr, next, opts, cb) {
		var $l = $(curr), $n = $(next);
		$n.css({opacity:0});
		var fn = function() {$n.animate({opacity:1}, opts.speedIn, opts.easeIn, cb)};
		$l.animate({opacity:0}, opts.speedOut, opts.easeOut, function() {
			$l.css({display:'none'});
			if (!opts.sync) fn();
		});
		if (opts.sync) fn();
	};
	
	$.fn.cycle.transitions = {
		fade: function($cont, $slides, opts) {
			$slides.not(':eq(0)').css('opacity',0);
			opts.before.push(function() { $(this).show() });
		}
	};
	
	$.fn.cycle.ver = function() { return ver; };
	
	// @see: http://malsup.com/jquery/cycle/lite/
	$.fn.cycle.defaults = {
		timeout:       4000, 
		speed:         1000, 
		next:          null, 
		prev:          null, 
		before:        null, 
		after:         null, 
		height:       'auto',
		sync:          1,    
		fit:           0,    
		pause:         0,    
		delay:         0,    
		slideExpr:     null  
	};

})(jQuery);
/* ***** end Gallery Web Part ***** */


/* ##### end PLUGINS ##### */


/* ##### THIRD-PARTY PLUGINS ##### */

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/*
 * Modernizr v1.6
 * http://www.modernizr.com
 *
 * Developed by: 
 * - Faruk Ates  http://farukat.es/
 * - Paul Irish  http://paulirish.com/
 *
 * Copyright (c) 2009-2010
 * Dual-licensed under the BSD or MIT licenses.
 * http://www.modernizr.com/license/
 */

window.Modernizr=function(i,e,u){function s(a,b){return(""+a).indexOf(b)!==-1}function D(a,b){for(var c in a)if(j[a[c]]!==u&&(!b||b(a[c],E)))return true}function n(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1);c=(a+" "+F.join(c+" ")+c).split(" ");return!!D(c,b)}function S(){f.input=function(a){for(var b=0,c=a.length;b<c;b++)L[a[b]]=!!(a[b]in h);return L}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));f.inputtypes=function(a){for(var b=0,c,k=a.length;b<
k;b++){h.setAttribute("type",a[b]);if(c=h.type!=="text"){h.value=M;if(/^range$/.test(h.type)&&h.style.WebkitAppearance!==u){l.appendChild(h);c=e.defaultView;c=c.getComputedStyle&&c.getComputedStyle(h,null).WebkitAppearance!=="textfield"&&h.offsetHeight!==0;l.removeChild(h)}else/^(search|tel)$/.test(h.type)||(c=/^(url|email)$/.test(h.type)?h.checkValidity&&h.checkValidity()===false:h.value!=M)}N[a[b]]=!!c}return N}("search tel url email datetime date month week time datetime-local number range color".split(" "))}
var f={},l=e.documentElement,E=e.createElement("modernizr"),j=E.style,h=e.createElement("input"),M=":)",O=Object.prototype.toString,q=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),F="Webkit Moz O ms Khtml".split(" "),v={svg:"http://www.w3.org/2000/svg"},d={},N={},L={},P=[],w,Q=function(a){var b=document.createElement("style"),c=e.createElement("div");b.textContent=a+"{#modernizr{height:3px}}";(e.head||e.getElementsByTagName("head")[0]).appendChild(b);c.id="modernizr";l.appendChild(c);a=c.offsetHeight===
3;b.parentNode.removeChild(b);c.parentNode.removeChild(c);return!!a},o=function(){var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return function(b,c){c=c||document.createElement(a[b]||"div");b="on"+b;var k=b in c;if(!k){c.setAttribute||(c=document.createElement("div"));if(c.setAttribute&&c.removeAttribute){c.setAttribute(b,"");k=typeof c[b]=="function";if(typeof c[b]!="undefined")c[b]=u;c.removeAttribute(b)}}return k}}(),G={}.hasOwnProperty,R;R=
typeof G!=="undefined"&&typeof G.call!=="undefined"?function(a,b){return G.call(a,b)}:function(a,b){return b in a&&typeof a.constructor.prototype[b]==="undefined"};d.flexbox=function(){var a=e.createElement("div"),b=e.createElement("div");(function(k,g,r,x){g+=":";k.style.cssText=(g+q.join(r+";"+g)).slice(0,-g.length)+(x||"")})(a,"display","box","width:42px;padding:0;");b.style.cssText=q.join("box-flex:1;")+"width:10px;";a.appendChild(b);l.appendChild(a);var c=b.offsetWidth===42;a.removeChild(b);
l.removeChild(a);return c};d.canvas=function(){var a=e.createElement("canvas");return!!(a.getContext&&a.getContext("2d"))};d.canvastext=function(){return!!(f.canvas&&typeof e.createElement("canvas").getContext("2d").fillText=="function")};d.webgl=function(){var a=e.createElement("canvas");try{if(a.getContext("webgl"))return true}catch(b){}try{if(a.getContext("experimental-webgl"))return true}catch(c){}return false};d.touch=function(){return"ontouchstart"in i||Q("@media ("+q.join("touch-enabled),(")+
"modernizr)")};d.geolocation=function(){return!!navigator.geolocation};d.postmessage=function(){return!!i.postMessage};d.websqldatabase=function(){return!!i.openDatabase};d.indexedDB=function(){for(var a=-1,b=F.length;++a<b;){var c=F[a].toLowerCase();if(i[c+"_indexedDB"]||i[c+"IndexedDB"])return true}return false};d.hashchange=function(){return o("hashchange",i)&&(document.documentMode===u||document.documentMode>7)};d.history=function(){return!!(i.history&&history.pushState)};d.draganddrop=function(){return o("drag")&&
o("dragstart")&&o("dragenter")&&o("dragover")&&o("dragleave")&&o("dragend")&&o("drop")};d.websockets=function(){return"WebSocket"in i};d.rgba=function(){j.cssText="background-color:rgba(150,255,150,.5)";return s(j.backgroundColor,"rgba")};d.hsla=function(){j.cssText="background-color:hsla(120,40%,100%,.5)";return s(j.backgroundColor,"rgba")||s(j.backgroundColor,"hsla")};d.multiplebgs=function(){j.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(j.background)};d.backgroundsize=
function(){return n("backgroundSize")};d.borderimage=function(){return n("borderImage")};d.borderradius=function(){return n("borderRadius","",function(a){return s(a,"orderRadius")})};d.boxshadow=function(){return n("boxShadow")};d.textshadow=function(){return e.createElement("div").style.textShadow===""};d.opacity=function(){var a=q.join("opacity:.5;")+"";j.cssText=a;return s(j.opacity,"0.5")};d.cssanimations=function(){return n("animationName")};d.csscolumns=function(){return n("columnCount")};d.cssgradients=
function(){var a=("background-image:"+q.join("gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:")+q.join("linear-gradient(left top,#9f9, white);background-image:")).slice(0,-17);j.cssText=a;return s(j.backgroundImage,"gradient")};d.cssreflections=function(){return n("boxReflect")};d.csstransforms=function(){return!!D(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])};d.csstransforms3d=function(){var a=!!D(["perspectiveProperty","WebkitPerspective",
"MozPerspective","OPerspective","msPerspective"]);if(a)a=Q("@media ("+q.join("transform-3d),(")+"modernizr)");return a};d.csstransitions=function(){return n("transitionProperty")};d.fontface=function(){var a,b=e.head||e.getElementsByTagName("head")[0]||l,c=e.createElement("style"),k=e.implementation||{hasFeature:function(){return false}};c.type="text/css";b.insertBefore(c,b.firstChild);a=c.sheet||c.styleSheet;b=k.hasFeature("CSS2","")?function(g){if(!(a&&g))return false;var r=false;try{a.insertRule(g,
0);r=!/unknown/i.test(a.cssRules[0].cssText);a.deleteRule(a.cssRules.length-1)}catch(x){}return r}:function(g){if(!(a&&g))return false;a.cssText=g;return a.cssText.length!==0&&!/unknown/i.test(a.cssText)&&a.cssText.replace(/\r+|\n+/g,"").indexOf(g.split(" ")[0])===0};f._fontfaceready=function(g){g(f.fontface)};return b('@font-face { font-family: "font"; src: "font.ttf"; }')};d.video=function(){var a=e.createElement("video"),b=!!a.canPlayType;if(b){b=new Boolean(b);b.ogg=a.canPlayType('video/ogg; codecs="theora"');
b.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"')||a.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');b.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}return b};d.audio=function(){var a=e.createElement("audio"),b=!!a.canPlayType;if(b){b=new Boolean(b);b.ogg=a.canPlayType('audio/ogg; codecs="vorbis"');b.mp3=a.canPlayType("audio/mpeg;");b.wav=a.canPlayType('audio/wav; codecs="1"');b.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")}return b};d.localstorage=function(){try{return"localStorage"in
i&&i.localStorage!==null}catch(a){return false}};d.sessionstorage=function(){try{return"sessionStorage"in i&&i.sessionStorage!==null}catch(a){return false}};d.webWorkers=function(){return!!i.Worker};d.applicationcache=function(){return!!i.applicationCache};d.svg=function(){return!!e.createElementNS&&!!e.createElementNS(v.svg,"svg").createSVGRect};d.inlinesvg=function(){var a=document.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==v.svg};d.smil=function(){return!!e.createElementNS&&
/SVG/.test(O.call(e.createElementNS(v.svg,"animate")))};d.svgclippaths=function(){return!!e.createElementNS&&/SVG/.test(O.call(e.createElementNS(v.svg,"clipPath")))};for(var H in d)if(R(d,H)){w=H.toLowerCase();f[w]=d[H]();P.push((f[w]?"":"no-")+w)}f.input||S();f.crosswindowmessaging=f.postmessage;f.historymanagement=f.history;f.addTest=function(a,b){a=a.toLowerCase();if(!f[a]){b=!!b();l.className+=" "+(b?"":"no-")+a;f[a]=b;return f}};j.cssText="";E=h=null;i.attachEvent&&function(){var a=e.createElement("div");
a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function c(p){for(var m=-1;++m<r;)p.createElement(g[m])}function k(p,m){for(var I=p.length,t=-1,y,J=[];++t<I;){y=p[t];m=y.media||m;J.push(k(y.imports,m));J.push(y.cssText)}return J.join("")}var g="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video".split("|"),r=g.length,x=RegExp("<(/*)(abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video)",
"gi"),T=RegExp("\\b(abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video)\\b(?!.*[;}])","gi"),z=b.createDocumentFragment(),A=b.documentElement,K=A.firstChild,B=b.createElement("style"),C=b.createElement("body");B.media="all";c(b);c(z);a.attachEvent("onbeforeprint",function(){for(var p=-1;++p<r;)for(var m=b.getElementsByTagName(g[p]),I=m.length,t=-1;++t<I;)if(m[t].className.indexOf("iepp_")<0)m[t].className+=" iepp_"+
g[p];K.insertBefore(B,K.firstChild);B.styleSheet.cssText=k(b.styleSheets,"all").replace(T,".iepp_$1");z.appendChild(b.body);A.appendChild(C);C.innerHTML=z.firstChild.innerHTML.replace(x,"<$1bdo")});a.attachEvent("onafterprint",function(){C.innerHTML="";A.removeChild(C);K.removeChild(B);A.appendChild(z.firstChild)})}(this,document);f._enableHTML5=true;f._version="1.6";l.className=l.className.replace(/\bno-js\b/,"")+" js";l.className+=" "+P.join(" ");return f}(this,this.document);


/****************************************************************
 *                                                              *
 *  JQuery Curvy Corners by Mike Jolley                         *
 *  http://blue-anvil.com                                       *
 *  http://code.google.com/p/jquerycurvycorners/                *
 *  ==========================================================  *
 *                                                              *
 *  Version 2.1.1 (Based on CC 2.1 beta)                          *
 *                                                              *
 *  Original by: Terry Riegel, Cameron Cooke and Tim Hutchison  *
 *  Website: http://www.curvycorners.net                        *
 *                                                              *
 *  This library is free software; you can redistribute         *
 *  it and/or modify it under the terms of the GNU              *
 *  Lesser General Public License as published by the           *
 *  Free Software Foundation; either version 2.1 of the         *
 *  License, or (at your option) any later version.             *
 *                                                              *
 *  This library is distributed in the hope that it will        *
 *  be useful, but WITHOUT ANY WARRANTY; without even the       *
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A        *
 *  PARTICULAR PURPOSE. See the GNU Lesser General Public       *
 *  License for more details.                                   *
 *                                                              *
 *  You should have received a copy of the GNU Lesser           *
 *  General Public License along with this library;             *
 *  Inc., 59 Temple Place, Suite 330, Boston,                   *
 *  MA 02111-1307 USA                                           *
 *                                                              *
 ****************************************************************/
//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(17($){17 1w(a){10.3p=a;10.1I=10.1W=10.1H=10.1X=0;10.3Y=10.3r=10.3y=10.3B="";10.2y=2C};1w.1N.2s=17(a,b,c,d){11(!a){10.1I=10.1W=10.1H=10.1X=1i(c);10.3Y=10.3r=10.3y=10.3B=d}1l{3E=a.1y(0)+b.1y(0);10[3E+\'R\']=1i(c);10[3E+\'u\']=d}};1w.1N.1j=17(a){11(/^(t|b)(l|r)(R|u)$/.2S(a))18 10[a];11(/^(t|b)(l|r)2R$/.2S(a)){12 b=a.1y(0)+a.1y(1);18 10[b+\'R\']+10[b+\'u\']}11(/^(t|b)2R?$/.2S(a)){12 c=a.1y(0);c+=10[c+\'2Z\']>10[c+\'34\']?\'l\':\'r\';12 d=10[c+\'R\'];11(a.1U===3&&a.1y(2)===\'u\')d+=10[c=\'u\'];18 d}20 1p 1P(\'67\\\'t 6d 5G \'+a);};1w.1N.41=17(a){11(a!==\'t\'&&a!==\'b\')20 1p 1P("55 54 3m \'t\' 4Y \'b\'");18 1a.69(10[a+\'2Z\']-10[a+\'34\'])};1w.1N.3U=17(a){10.3Y=10.3r=10.3y=10.3B=\'14\';11(\'1R\'1F a)10.1I=a.1R.1b;11(\'1V\'1F a)10.1W=a.1V.1b;11(\'1t\'1F a)10.1H=a.1t.1b;11(\'2f\'1F a)10.1X=a.2f.1b;11(\'2y\'1F a)10.2y=a.2y};1w.1N.4X=17(a){12 b=[\'1R\',\'1V\',\'1t\',\'2f\'];12 c=0;12 i,2u;1D(i 1F b)11(!2U(i)){2u=10[b[i]+\'u\'];11(2u!==\'\'&&2u!==\'14\'){c=1p 1w;1r}}11(!c)c=10;1l{12 d,31,e=6F.5n(a,\'1h\');1D(i 1F b)11(!2U(i)){d=b[i];2u=10[d+\'u\'];31=10[d+\'R\'];11(2u!==\'14\'){12 e=a.1d.1h;a.1d.1h=31+2u;31=a.1d.66;a.1d.1h=e}c[d+\'R\']=31;c[d+\'u\']=\'14\'}a.1d.1h=e}18 c};1w.1N.4W=17(a){11(a!==\'t\'&&a!==\'b\')20 1p 1P("55 54 3m \'t\' 4Y \'b\'");18 10[a+\'2Z\']+10[a+\'34\']};1w.1N.4V=17(a){12 b=0;11(10[a+\'2Z\'])++b;11(10[a+\'34\'])++b;18 b};1w.1N.4U=17(){12 a=[];11(10.1I)a.2L(\'1R\');11(10.1W)a.2L(\'1V\');11(10.1H)a.2L(\'1t\');11(10.1X)a.2L(\'2f\');18 a};11(2T 2X===\'2w\')2X=1p 3c;$.3b.3a=17(2F){12 3I=1L;12 3P,3T,33;2o{3P=(1f.2H.1d.6B!==2w)}2k(36){}2o{3T=(1f.2H.1d.5F!==2w)}2k(36){}2o{33=(1f.2H.1d.4T!==2w)}2k(36){}11(3P||3T||33)3I=2C;11(2F 4S 1w){1n=2F}1l{12 2F=1Y.68({1R:{1b:8},1V:{1b:8},1t:{1b:8},2f:{1b:8},2y:2C},2F);12 1n=1p 1w(10);1n.3U(2F)}17 1c(){10.1x=37[1];10.4R=37[0];12 G=$(10.1x);12 H;10.5S=1p 3c();10.2g=10.2m=10.2x=H=2p;12 I=G.6a();11(G.3d(\'6e\'))20 1p 1P("6f 6k 6z 4P 4N "+10.1x.5e+" 5h.","1P");11(G.13(\'3z\')===\'4M\'){G.13(\'3z\',\'4M-5O\')}11(!I){10.2W=17(){};18}11(37[0]4S 1w){10.19=37[0].4X(10.1x)}1l{10.19=1p 1w(\'\');10.19.3U(10.4R)}12 J=G.13("4L")?G.13("4L"):0;12 K=G.13("4K")?G.13("4K"):0;12 L=G.13("4J")?G.13("4J"):0;12 M=G.13("4E")?G.13("4E"):0;12 N=G.13("6v");12 O=G.13("6A");12 P=G.13("6E");12 Q=G.13("6I");12 R=G.13("5c");12 S=G.13("5f");12 T=G.13("5k");12 U=G.13("5q");12 V=G.13("2D");12 W=G.13("1s");12 X=G.13("1T");12 Y,1e;Y=G.13("4B")?G.13("4B"):0;1e=G.13("4x")?G.13("4x"):0;12 Z=G.13("1O");12 3m=G.13("4v");12 4u=G.13("6u");12 4s=G.13("35");12 4r=G.13("3n");12 6C=G.13("1g");12 2b=1Y.2N.4q>7&&$.2N.4p?G.13("2d"):2p;12 1Z=10.19.1j(\'4o\');12 1t=10.19.1j(\'5p\');12 1C=17(a){11(2T a===\'5t\')18 a;11(2T a!==\'5u\')20 1p 1P(\'5z 5D 5E \'+2T a);12 b=/^[-\\d.]([a-z]+)$/.2O(a);11(b&&b[1]!=\'14\')20 1p 1P(\'5H 5N \'+b[1]);11(2U(a=1i(a)))a=0;18 a};12 4l=17(a){18 a<=0?"0":a+"14"};2o{10.1k=1C(J);10.1Q=1C(K);10.1o=1C(L);10.32=1C(M);10.2n=1c.2i(V);10.4k=1C(3m);10.6c=1C(4u);10.3C=1C(4s);10.3D=1C(4r);10.2c=I;10.2Q=G.6r();10.3G=1c.2i(N);10.3H=1c.2i(O);10.4j=1c.2i(P);10.4h=1c.2i(Q);10.3K=10.1k+"14"+" "+R+" "+10.3G;10.3L=10.1Q+"14"+" "+S+" "+10.3H;10.3q=10.1o+"14"+" "+T+" "+10.4j;10.3o=10.32+"14"+" "+U+" "+10.4h;10.1s=(W!="4g"&&W!="5b")?W:"";10.1T=X}2k(e){}12 28=10.2Q;12 24=I;11($.2N.4f){Y=1C(Y);1e=1C(1e);11(Y){12 t=24+10.1o+10.32;11(Y>t)Y=t;Y=(t/Y*25)+\'%\'}11(1e){12 t=28+10.1k+10.1Q;11(1e>t)1e=t;1e=(t/1e*25)+\'%\'}}10.2Y=1f.26("2q");11(2b)10.2Y.1d.2d=2b;3g(10.1x.4e)10.2Y.1v(10.1x.3Z(10.1x.4e));11(Z!="2a")G.13("1O","4d");10.1x.1d.4c=\'0\';10.1x.1d.1g=10.1x.1d.1s=\'4g\';10.1x.1d.2D=\'2z\';10.1x.1d.1z=(24+10.1o+10.32)+\'14\';10.1x.1d.1E=(28+10.1k+10.1Q)+\'14\';12 2l=1f.26("2q");$(2l).13({1z:24+\'14\',\'4c\':"0",1O:"2a",1E:4l(28+10.1k+10.1Q-1Z-1t),1q:1Z+"14",1h:"0",\'2D\':V,\'1s\':10.1s,\'1T\':10.1T,\'5T\':\'5U\'});11(2b)$(2l).13(\'2d\',\'2d\');11(10.1o)$(2l).13(\'3v\',10.3q);11(10.1k&&!1Z)$(2l).13(\'4b\',10.3K);11(10.32)$(2l).13(\'3x\',10.3o);11(10.1Q&&!1t)$(2l).13(\'4a\',10.3L);10.2x=10.1x.1v(2l);I=$(10.2x).13("1z");11(I===""||I==="43"||I.39("%")!==-1)20 1P(\'6b 1z 3d \'+I);10.2c=(I!=""&&I!="43"&&I.39("%")==-1)?1i(I):$(10.2x).1z();10.2W=17(){10.1u=10.1e=0;11(10.1S){12 e=17(a,b,c){11(a===0)18 0;12 d;11(a===\'1M\'||a===\'1G\')18 c-b;11(a===\'6g\')18(c-b)/2;11(a.39(\'%\')>0)18(c-b)/(25/1i(a));18 1C(a)};10.1u=e(Y,10.1S.1z,24);10.1e=e(1e,10.1S.1E,28)}1l 11(10.1s){10.1u=1C(Y);10.1e=1C(1e)}11(1Z){f=1f.26("2q");$(f).13({1z:10.2c+"14",\'3k\':"2t",2G:"2I",1O:"2a",\'35\':10.1k+"14",\'3n\':10.1k+"14",1E:1Z+"14",1q:-1Z+"14",1h:-10.1o+"14"});10.2g=10.2x.1v(f)}11(1t){12 f=1f.26("2q");$(f).13({1z:10.2c+"14",\'3k\':"2t",2G:"2I",1O:"2a",\'35\':10.1Q+"14",\'3n\':10.1Q+"14",1E:1t+"14",1G:-1t+"14",1h:-10.1o+"14"});10.2m=10.2x.1v(f)}12 g=10.19.4U();1D(12 i 1F g)11(!2U(i)){12 h=g[i];12 j=10.19[h+\'R\'];12 l,29,21,2V;11(h=="1V"||h=="1R"){l=10.1k;29=10.3G;2V=10.1k}1l{l=10.1Q;29=10.3H;2V=10.1Q}21=j-2V;12 m=1f.26("2q");$(m).13({1O:"2a","48-3S":"2t",2G:"2I"}).1E(10.19.1j(h+\'2R\')).1z(10.19.1j(h+\'2R\'));12 n,1A,3h;12 o=2b?1i(/5o\\(46.(\\d+)\\)/.2O(2b)[1]):25;1D(n=0;n<j;++n){12 p=(n+1>=21)?-1:1a.44(1a.2h(1a.1J(21,2)-1a.1J(n+1,2)))-1;11(21!=j){12 q=(n>=21)?-1:1a.49(1a.2h(1a.1J(21,2)-1a.1J(n,2)));12 r=(n+1>=j)?-1:1a.44(1a.2h(1a.1J(j,2)-1a.1J((n+1),2)))-1}12 s=(n>=j)?-1:1a.49(1a.2h(1a.1J(j,2)-1a.1J(n,2)));11(p>-1)10.2e(n,0,10.2n,o,(p+1),m,2C,j);11(21!=j){11(10.19.2y){1D(1A=p+1;1A<q;++1A){11(10.1s!=""){12 u=1c.3i(n,1A,21)*25;10.2e(n,1A,29,o,1,m,u>=30,j)}1l 11(10.2n!==\'2z\'){12 v=1c.45(10.2n,29,1c.3i(n,1A,21));10.2e(n,1A,v,o,1,m,1L,j)}1l 10.2e(n,1A,29,o>>1,1,m,1L,j)}11(r>=q){11(q==-1)q=0;10.2e(n,q,29,o,(r-q+1),m,1L,0)}3h=29;1A=r}1l{11(r>p){10.2e(n,(p+1),29,o,(r-p),m,1L,0)}}}1l{3h=10.2n;1A=p}11(10.19.2y&&10.2n!==\'2z\'){3g(++1A<s){10.2e(n,1A,3h,(1c.3i(n,1A,j)*o),1,m,2V<=0,j)}}}1D(12 t=0,k=m.47.1U;t<k;++t){12 w=m.47[t];12 x=1i($(w).13(\'1q\'));12 y=1i($(w).13(\'1h\'));12 A=1i($(w).13(\'1E\'));11(h=="1R"||h=="1t"){$(w).13(\'1h\',(j-y-1)+"14")}11(h=="1V"||h=="1R"){$(w).13(\'1q\',(j-A-x)+"14")}$(w).13(\'1T\',10.1T);11(10.1s)2E(h){1m"1V":$(w).13(\'1K\',(10.1u-10.1o+j-24-y)+"14 "+(10.1e+A+x+10.1k-j)+"14");1r;1m"1R":$(w).13(\'1K\',(10.1u-j+y+1+10.1o)+"14 "+(10.1e-j+A+x+10.1k)+"14");1r;1m"1t":$(w).13(\'1K\',(10.1u-j+y+1+10.1o)+"14 "+(10.1e-28-10.1k+(!1Y.2B.2A?x:-x)+j)+"14");1r;1m"2f":11(!1Y.2B.2A){$(w).13(\'1K\',(10.1u-10.1o-24+j-y)+"14 "+(10.1e-28-10.1k+x+j)+"14")}1l{$(w).13(\'1K\',(10.1u-10.1o-24+j-y)+"14 "+(10.1e-28-10.1k+j-x)+"14")}}}2E(h){1m"1R":$(m).13(\'1q\',m.1d.1h="0");10.2g.1v(m);1r;1m"1V":$(m).13(\'1q\',m.1d.1M="0");10.2g.1v(m);1r;1m"1t":$(m).13(\'1G\',m.1d.1h="0");10.2m.1v(m);1r;1m"2f":$(m).13(\'1G\',m.1d.1M="0");10.2m.1v(m)}}12 B={t:10.19.41(\'t\'),b:10.19.41(\'b\')};1D(z 1F B){11(2T z===\'17\')4i;11(!10.19.1j(z+\'R\'))4i;11(B[z]){12 C=(10.19[z+"2Z"]<10.19[z+"34"])?z+"l":z+"r";12 D=1f.26("2q");$(D).13({\'1E\':B[z]+"14",\'1z\':10.19.1j(C+\'2R\'),\'1O\':"2a",\'3k\':"2t",\'2G\':"2I",\'2D\':10.2n,\'1s\':10.1s,\'1T\':10.1T});11(2b)$(D).13(\'2d\',\'2d\');2E(C){1m"1R":$(D).13({\'1G\':\'\',\'1h\':\'0\',\'3v\':10.3q,\'1K\':10.1u+"14 "+(10.1k+10.1e-10.19.1I)+"14"});10.2g.1v(D);1r;1m"1V":$(D).13({\'1G\':\'\',\'1M\':\'0\',\'3x\':10.3o,\'1K\':(10.1u-10.2c+10.19.1W)+"14 "+(10.1k+10.1e-10.19.1W)+"14"});10.2g.1v(D);1r;1m"1t":$(D).13({\'1q\':\'\',\'1h\':\'0\',\'3v\':10.3q,\'1K\':10.1u+"14 "+(10.1e-10.1k-10.2Q+B[z]+10.19.1H)+"14"});10.2m.1v(D);1r;1m"2f":$(D).13({\'1q\':\'\',\'1M\':\'0\',\'3x\':10.3o,\'1K\':(10.1o+10.1u-10.2c+10.19.1X)+"14 "+(10.1e-10.1k-10.2Q+B[z]+10.19.1X)+"14"});10.2m.1v(D)}}12 E=1f.26("2q");11(2b)$(E).13(\'2d\',\'2d\');$(E).13({\'1O\':"4d",\'3k\':"2t",\'2G\':"2I",\'1z\':10.4m(z),\'2D\':10.2n,\'1s\':10.1s,\'1T\':10.1T});2E(z){1m"t":11(10.2g){11(!1Y.2B.2A){$(E).13(\'1E\',25+1Z+"14")}1l{$(E).13(\'1E\',25+1Z-10.1k+"14")}$(E).13(\'4n\',10.19.1I?(10.19.1I-10.1o)+"14":"0");$(E).13(\'4b\',10.3K);11(10.1s){12 F=10.19.1I?(10.1o+10.1u-10.19.1I)+"14 ":10.1u+"14 ";$(E).13(\'1K\',F+10.1e+"14");$(10.2x).13(\'1K\',10.1u+"14 "+(10.1e-1Z+10.1o)+"14")}10.2g.1v(E)}1r;1m"b":11(10.2m){11(!1Y.2B.2A){$(E).13(\'1E\',1t+"14")}1l{$(E).13(\'1E\',1t-10.1Q+"14")}$(E).13(\'4n\',10.19.1H?(10.19.1H-10.1o)+"14":"0");$(E).13(\'4a\',10.3L);11(10.1s){12 F=10.19.1H?(10.1u+10.1o-10.19.1H)+"14 ":10.1u+"14 ";$(E).13(\'1K\',F+(10.1e-28-10.1k+1t)+"14")}10.2m.1v(E)}}}z=24;11(1Y.2B.2A)z-=10.3C+10.3D;$(10.2Y).13({\'1O\':\'2a\',\'1h\':10.1o+"14",\'4v\':10.4k+"14",\'1q\':10.1k+"14",\'35\':10.3C+"14",\'3n\':10.3D+"14",\'1z\':z+"14",\'3X\':G.13(\'3X\')}).3W(\'3Q\');G.13(\'3X\',\'1h\').3W(\'3O\');10.1x.1v(10.2Y);11(H)$(H).13(\'3z\',6D)};11(10.1s){Y=10.3N(Y);1e=10.3N(1e);11(10.1S){10.1S.4t=10;10.2v=10.2W;10.2W=17(){11(10.1S.6N)10.2v();1l 10.1S.56=1p 57(\'$(10.4t).2v();\')}}}};1c.1N.3N=17(c){11(c===\'1q\'||c===\'1h\'||1i(c)===0)18 0;11(!(/^[-\\d.]+14$/.2S(c))&&!10.1S){10.1S=1p 58;12 d=17(a){12 b=/59\\("?([^\'"]+)"?\\)/.2O(a);18(b?b[1]:a)};10.1S.5a=d(10.1s)}18 c};1c.1N.2e=17(a,b,c,d,e,f,g,h){12 i=1f.26("2q");$(i).13({"1E":e+"14","1z":"2t","1O":"2a","48-3S":"2t","2G":"2I","1q":b+"14","1h":a+"14","3j-4w":c});12 j=10.19.1j(\'4o\');11(g&&10.1s!=""){$(i).13({"3j-1O":"-"+(10.2c-(h-a)+10.1k)+"14 -"+((10.2Q+j+b)-10.1k)+"14","3j-5d":10.1s})}11(d!=25)$(i).13({46:(d/25)});f.1v(i)};1c.1N.4m=17(a){12 b,3F;b=!1Y.2B.2A?0:10.19.4V(a)*10.1o;11((3F=10.2c-10.19.4W(a)+b)<0)20 1P("65 5g 1x 1z");18 3F+\'14\'};1c.4y=17(a){12 d=1f.26(\'5i\');d.1d.2D=a;1f.2H.1v(d);11(5j.4z){12 b=1f.5l.4z(d,2p).5m(\'3j-4w\');d.4A.3Z(d);11(b.2j(0,3)==="3s")b=1c.2P(b);18 b}1l{12 c=1f.2H.5r();c.5s(d);c.4C(\'4D\',1L,a);12 e=c.5v(\'4D\');12 f="3s("+(e&5w)+", "+((e&5x)>>8)+", "+((e&5y)>>16)+")";d.4A.3Z(d);c=2p;18 1c.2P(f)}};1c.45=17(a,b,c){11(a===\'2z\'||b===\'2z\')20 1P(\'5A 5B 5C 2z\');11(a.1y(0)!==\'#\'){a=1c.2i(a)}11(b.1y(0)!==\'#\'){b=1c.2i(b)}12 d=1i(a.2j(1,2),16);12 e=1i(a.2j(3,2),16);12 f=1i(a.2j(5,2),16);12 g=1i(b.2j(1,2),16);12 h=1i(b.2j(3,2),16);12 i=1i(b.2j(5,2),16);11(c>1||c<0)c=1;12 j=1a.40((d*c)+(g*(1-c)));11(j>2K)j=2K;11(j<0)j=0;12 k=1a.40((e*c)+(h*(1-c)));11(k>2K)k=2K;11(k<0)k=0;12 l=1a.40((f*c)+(i*(1-c)));11(l>2K)l=2K;11(l<0)l=0;18"#"+1c.2r(j)+1c.2r(k)+1c.2r(l)};1c.2r=17(a){12 b=[\'0\',\'1\',\'2\',\'3\',\'4\',\'5\',\'6\',\'7\',\'8\',\'9\',\'A\',\'B\',\'C\',\'D\',\'E\',\'F\'];18 b[a>>>4]+\'\'+b[a&15]};1c.3i=17(x,y,r){12 a;12 b=r*r;12 c=1p 3c(2);12 d=1p 3c(2);12 e=0;12 f="";12 g=1a.2h(b-1a.1J(x,2));11(g>=y&&g<(y+1)){f="5I";c[e]=0;d[e]=g-y;++e}g=1a.2h(b-1a.1J(y+1,2));11(g>=x&&g<(x+1)){f+="5J";c[e]=g-x;d[e]=1;++e}g=1a.2h(b-1a.1J(x+1,2));11(g>=y&&g<(y+1)){f+="5K";c[e]=1;d[e]=g-y;++e}g=1a.2h(b-1a.1J(y,2));11(g>=x&&g<(x+1)){f+="5L";c[e]=g-x;d[e]=0}2E(f){1m"5M":a=1a.3f(d[0],d[1])+((1a.4F(d[0],d[1])-1a.3f(d[0],d[1]))/2);1r;1m"5P":a=1-(((1-c[0])*(1-d[1]))/2);1r;1m"5Q":a=1a.3f(c[0],c[1])+((1a.4F(c[0],c[1])-1a.3f(c[0],c[1]))/2);1r;1m"5R":a=d[0]*c[1]/2;1r;4G:a=1}18 a};1c.2P=17(a){2o{12 b=1c.4H(a);12 c=1i(b[0]);12 d=1i(b[1]);12 f=1i(b[2]);12 g="#"+1c.2r(c)+1c.2r(d)+1c.2r(f)}2k(e){4I("5V 5W 5X 5Y 5Z 60 61 62 4N 63 1F 17 2P")}18 g};1c.4H=17(a){12 b=a.64(4,a.39(")"));18 b.3R(", ")};1c.2i=17(a){11(a!=""&&a!="2z"){11(a.2j(0,3)==="3s"){a=1c.2P(a)}1l 11(a.1y(0)!==\'#\'){a=4y(a)}1l 11(a.1U===4){a="#"+a.1y(1)+a.1y(1)+a.1y(2)+a.1y(2)+a.1y(3)+a.1y(3)}}18 a};18 10.2J(17(){11(!$(10).3d(\'.3O\')){11(3I){11(1n.1j(\'1I\')){$(10).13({\'1g-1q-1h-1b\':1n.1j(\'1I\')+\'14\',\'-1B-1g-1b-3J\':1n.1j(\'1I\')+\'14\',\'-3e-1g-1q-1h-1b\':1n.1j(\'1I\')+\'14\'})}11(1n.1j(\'1W\')){$(10).13({\'1g-1q-1M-1b\':1n.1j(\'1W\')+\'14\',\'-1B-1g-1b-3A\':1n.1j(\'1W\')+\'14\',\'-3e-1g-1q-1M-1b\':1n.1j(\'1W\')+\'14\'})}11(1n.1j(\'1H\')){$(10).13({\'1g-1G-1h-1b\':1n.1j(\'1H\')+\'14\',\'-1B-1g-1b-3w\':1n.1j(\'1H\')+\'14\',\'-3e-1g-1G-1h-1b\':1n.1j(\'1H\')+\'14\'})}11(1n.1j(\'1X\')){$(10).13({\'1g-1G-1M-1b\':1n.1j(\'1X\')+\'14\',\'-1B-1g-1b-3u\':1n.1j(\'1X\')+\'14\',\'-3e-1g-1G-1M-1b\':1n.1j(\'1X\')+\'14\'})}}1l{11(!$(10).3d(\'.4O\')){$(10).3W(\'4O\');38=$(10).4Q(\'1d\');11(38==\'2w\'){38=\'\'}2X.2L({3t:10,19:1n,1d:38,6h:$(10).6i(2C)})}12 a=1p 1c(1n,10);a.2W()}}})};$.3b.6j=17(){18 10.2J(17(i,e){27=e;$.2J(2X,17(a,b){11(b.3t==27&&$(\'.3Q\',27).3S()>0){$(27).6l($(27).6m(\'.3Q:6n\').6o());1d=b.1d==\'2w\'?b.1d:\'\';$(27).6p(\'3O\').4Q(\'1d\',1d);18 1L}})})};$.3b.6q=17(){18 10.2J(17(i,e){27=e;$.2J(2X,17(a,b){11(b.3t==27){$(27).3a(b.19);18 1L}})})};$.3b.2v=17(){18 10.2J(17(i,e){3V=e;11(\'2v\'1F 3V)3V.2v();1l 20 1P(\'6s 2v 17\')})};$(17(){11($.2N.4p){2o{1f.4C("6t",1L,2C)}2k(e){};17 2M(a){11(!1i(a))18\'14\';12 b=/^[\\d.]+(\\w+)$/.2O(a);18 b[1]};12 t,i,j;17 3M(a){12 b=a.1d;11(1Y.2N.4q>6.0){12 c=b[\'-1B-1g-1b\']||0;12 d=b[\'-1B-1g-1b-3A\']||0;12 e=b[\'-1B-1g-1b-3J\']||0;12 f=b[\'-1B-1g-1b-3u\']||0;12 g=b[\'-1B-1g-1b-3w\']||0}1l{12 c=b[\'1B-1g-1b\']||0;12 d=b[\'1B-1g-1b-3A\']||0;12 e=b[\'1B-1g-1b-3J\']||0;12 f=b[\'1B-1g-1b-3u\']||0;12 g=b[\'1B-1g-1b-3w\']||0}11(c){12 t=c.3R(\'/\');t=t[0].3R(/\\s+/);11(t[t.1U-1]===\'\')t.6w();2E(t.1U){1m 3:e=t[0];d=g=t[1];f=t[2];c=1L;1r;1m 2:e=f=t[0];d=g=t[1];c=1L;1m 1:1r;1m 4:e=t[0];d=t[1];f=t[2];g=t[3];c=1L;1r;4G:4I(\'6x 4P 6y: \'+c)}}11(c||e||d||f||g){12 h=1p 1w(a.3p);11(c)h.2s(2p,2p,1i(c),2M(c));1l{11(d)h.2s(\'t\',\'r\',1i(d),2M(d));11(e)h.2s(\'t\',\'l\',1i(e),2M(e));11(g)h.2s(\'b\',\'l\',1i(g),2M(g));11(f)h.2s(\'b\',\'r\',1i(f),2M(f))}$(a.3p).3a(h)}}1D(t=0;t<1f.22.1U;++t){2o{11(1f.22[t].3l){1D(i=0;i<1f.22[t].3l.1U;++i){1D(j=0;j<1f.22[t].3l[i].23.1U;++j){3M(1f.22[t].3l[i].23[j])}}}1D(i=0;i<1f.22[t].23.1U;++i)3M(1f.22[t].23[i])}2k(e){}}}1l 11($.2N.4f){2o{33=(1f.2H.1d.4T!==2w)}2k(36){}11(!33){17 4Z(a){18/1g-((1q|1G)-(1h|1M)-)?1b/.2S(1f.22.50(a).51.52)};23=[];1D(t=0;t<1f.22.1U;++t){11(4Z(t)){12 k=1f.22.50(6G).51.52;k=k.6H(/\\/\\*(\\n|\\r|.)*?\\*\\//g,\'\');12 l=1p 53("^\\\\s*([\\\\w.#][-\\\\w.#, ]+)[\\\\n\\\\s]*\\\\{([^}]+1g-((1q|1G)-(1h|1M)-)?1b[^}]*)\\\\}","6J");12 m;3g((m=l.2O(k))!==2p){12 n=1p 53("(..)1g-((1q|1G)-(1h|1M)-)?1b:\\\\s*([\\\\d.]+)(1F|6K|14|6L|6M)","g");12 o,42=1p 1w(m[1]);3g((o=n.2O(m[2]))!==2p){11(o[1]!=="z-")42.2s(o[3],o[4],o[5],o[6]);23.2L(42)}}}}1D(i 1F 23)11(!2U(i))$(23[i].3p).3a(23[i])}}})})(1Y);',62,422,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this|if|var|css|px|||function|return|spec|Math|radius|curvyObject|style|backgroundPosY|document|border|left|parseInt|get|borderWidth|else|case|bd|borderWidthL|new|top|break|backgroundImage|bl|backgroundPosX|appendChild|curvyCnrSpec|box|charAt|width|inty|moz|bm|for|height|in|bottom|blR|tlR|pow|backgroundPosition|false|right|prototype|position|Error|borderWidthB|tl|backgroundObject|backgroundRepeat|length|tr|trR|brR|jQuery|bk|throw|borderRadius|styleSheets|rules|bp|100|createElement|thisdiv|bo|bcolor|absolute|bj|boxWidth|filter|drawPixel|br|topContainer|sqrt|format_colour|substr|catch|bq|bottomContainer|boxColour|try|null|div|IntToHex|setcorner|1px|propu|dispatch|undefined|shell|antiAlias|transparent|boxModel|support|true|backgroundColor|switch|bc|overflow|body|hidden|each|255|push|units|browser|exec|rgb2Hex|boxHeight|Ru|test|typeof|isNaN|borderWidthTB|applyCorners|redrawList|contentContainer|lR||propR|borderWidthR|checkStandard|rR|paddingLeft|err|arguments|thestyles|indexOf|corner|fn|Array|is|webkit|min|while|outsideColour|pixelFraction|background|fontSize|imports|be|paddingRight|borderStringR|selectorText|borderStringL|tru|rgb|node|bottomright|borderLeft|bottomleft|borderRight|blu|display|topright|bru|leftPadding|rightPadding|propname|f_width|borderColour|borderColourB|ba|topleft|borderString|borderStringB|procIEStyles|backgroundCheck|hasCorners|bb|autoPadDiv|split|size|checkMozilla|setfrom|obj|addClass|textAlign|tlu|removeChild|round|radiusdiff|cornerspec|auto|floor|BlendColour|opacity|childNodes|font|ceil|borderBottom|borderTop|padding|relative|firstChild|opera|none|borderColourR|continue|borderColourL|topPadding|bn|fillerWidth|marginLeft|tR|msie|version|bh|bg|holdingElement|bf|paddingTop|color|backgroundPositionY|getComputedColour|getComputedStyle|parentNode|backgroundPositionX|execCommand|ForeColor|borderRightWidth|max|default|rgb2Array|alert|borderLeftWidth|borderBottomWidth|borderTopWidth|inline|to|drawn|corners|attr|settings|instanceof|BorderRadius|cornerNames|radiusCount|radiusSum|cloneOn|or|opera_contains_border_radius|item|ownerNode|text|RegExp|must|Param|onload|Function|Image|url|src|initial|borderTopStyle|image|tagName|borderBottomStyle|exceeds|elements|DIV|window|borderLeftStyle|defaultView|getPropertyValue|get_style|alpha|bR|borderRightStyle|createTextRange|moveToElementText|number|string|queryCommandValue|0xFF|0xFF00|0xFF0000|unexpected|Cannot|blend|with|styleToNPx|type|MozBorderRadius|property|Unexpected|Left|Top|Right|Bottom|LeftRight|unit|block|TopRight|TopBottom|LeftBottom|masterCorners|direction|ltr|There|was|an|error|converting|the|RGB|value|Hexadecimal|substring|Radius|pixelLeft|Don|extend|abs|innerWidth|Shell|bottomPadding|recognize|table|You|center|copy|clone|removeCorners|cannot|html|children|first|contents|removeClass|redrawCorners|innerHeight|No|BackgroundImageCache|paddingBottom|borderTopColor|pop|Illegal|specification|apply|borderBottomColor|WebkitBorderRadius|bi|boxDispSave|borderLeftColor|curvyBrowser|sheetnumber|replace|borderRightColor|mg|em|ex|pt|complete'.split('|'),0,{}))

/* ##### end THIRD-PARTY PLUGINS ##### */

function jqueryCookie(){
/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

}