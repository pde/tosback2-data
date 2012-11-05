var shoppingBagCount,wishListCount;
var hasBeenOpened = false;

$(document).ready(function() {
	
	// My Dillard's fly-out toggle
	var slideTime = 250;
	var clickZone = $("#myDillardsBarText .openClose, #myDillardsCloseButton, #myDillardsInvisibleWall");
	var contentBox = $("#myDillardsContent");
	var invisibleWall = $("#myDillardsInvisibleWall");
	
	$(clickZone).click(function() {
		// Open fly-out
		if ($(contentBox).css("display") == "none") {
			if(hasBeenOpened==false) {
				$("#myDillardsRightFrame").prop("src","https://"+$("#myDillardsRightFrame").data("host")+"/webapp/wcs/stores/servlet/MyDillardsiFrameView?storeId=301&langId=-1&catalogId=301");
				setTimeout(function(){$("#myDillardsRightFrame").fadeIn(250);},500);
			}
			cmCreateConversionEventTag("Clicked","2","My Dillards Bar");
			hasBeenOpened = true;
			if ($(".leftSide").text().length <= 4){
				retrieveMyDillardsLinksLogin();
	  		}
			$("#myDillardsRightFrame").addClass("openedUp");
			$(contentBox).css("height", "0px").css("opacity", "0.0").css("display", "block").stop().animate({"height":"325px", "opacity":"1.0"}, slideTime, function() {
				$(invisibleWall).css("display", "block");
				$("#myDillardsEmailAddress").focus();
			});
		// Close fly-out
		} else {
			$(contentBox).stop().animate({"height":"0px", "opacity":"0.0"}, slideTime * .7, function() {
				$(contentBox).css("display", "none");
				$(invisibleWall).css("display", "none");
				$("#myDillardsRightFrame").removeClass("openedUp");
			});
		}
	});

	// Swap tab panels
	var thePanels = ["#myDillardsRightFrameContent .shoppingBag", "#myDillardsRightFrameContent .wishList", "#myDillardsRightFrameContent .savedSearch", "#myDillardsRightFrameContent .orderHistory"], theSelector = thePanels.join(", ");
	$(theSelector).click(function() {
		var panelsCount = thePanels.length;
		for (i = 0 ; i < panelsCount; i++) {
			var thisSelector = thePanels[i];
			var thisArray = thisSelector.split(" ");
			var thisClass = thisArray[1].substr(1, thePanels[i].length);
			var thisPanel = "."+thisClass+"Panel";
			
			if ($(this).hasClass(thisClass)) {
				$(thePanels[i]).addClass("active");
				$(thePanels[i]+"Panel").addClass("activePanel");
			} else {
				$(thePanels[i]).removeClass("active");
				$(thePanels[i]+"Panel").removeClass("activePanel");
			}
		}
		countItemRows($(this).attr("class"));
	});
	
	// Remove item
	$("#myDillardsRightFrameContent .clickToHide").live("click", function() {
		if (! $(this).hasClass("clicked")) {
			$(this).parent(".removeBox").addClass("clicked");
			$(this).parent(".removeBox").children("*").addClass("clicked");
			$(this).css("color","#666");
		}
	});
});

// This javascript displays the value of the 'keyName' stored in 'cookieName'. If value is null then display "0".
// This script is used to display Items for cookie CVMINICART & balancePoints for CVREWRDPOINTS cookies
function displayMyDillardsIntegerValue(cookieName, keyName)
{
	//alert("IN displayCartItems method");
	var str = "0";
	str = getUserCookieValue(cookieName, keyName);
	if(str == null)
		str = "0";
	return str;
}

// This javascript display the value of the 'keyName' stored in 'cookieName'. If value is null then display "0.00". 
// If value is integer then it appends the .00 after the integer value.
// This script is used to display Items amount total for cookie CVMINICART & balanceAmount for CVREWRDPOINTS cookies
function displayMyDillardsAmountValue(cookieName, keyName)
{
	//alert("IN displayCartAmount method");
	var str = "0.00";
	str = getUserCookieValue(cookieName, keyName);
	if (str != null)
	{
		var iDotIndex = str.indexOf(".");
		if (str.length - iDotIndex > 3)
			str = str.substring(0, iDotIndex + 3);
		else if (iDotIndex != -1 && str.length - iDotIndex == 2)
			str = str + "0";
		else if (iDotIndex == -1)
			str = str + ".00";
	}
	else
	{
		str = "0.00";
	}
	
	return str;
}

// Item removal
function removeItemStage1(id) {
	if (! $("#"+id).hasClass("clicked")) {
		var currentTab;
		if (id.search("Remove") == -1) {
			if (id.search("shopping") != -1) {
				$("#"+id).text("Moving to Wish List");
				currentTab = "shopping";
			} else {
				$("#"+id).text("Moving to Shopping Bag");
				currentTab = "wishList";
			}
		} else {
			$("#"+id).text("Removing");
			currentTab = id.split("_");
			currentTab = currentTab[1].split("-");
			currentTab = currentTab[0];
		}
		var splitArray = id.split("-");
		var imgID = "waitImage_"+currentTab+"-" + splitArray[splitArray.length - 1];
		$("#"+imgID).fadeIn(1000);
	}
}
function removeItemStage2(id) {
	var theRow = $("#"+id).parent("span").parent("div").parent("div");
	theRow.css("height",theRow.css("min-height")).css("min-height",0);
	theRow.animate({height:0, opacity:0}, 500, function() {
		theRow.remove();
	});
	itemCountDeduction(id);
}

// Set count for current items
function countItemRows(id) {
	if (id.search("shopping") != -1) {
		shoppingBagCount = $("#myDillardsRightFrameContent #shoppingBagContainer .itemRow").size();
	}
	if (id.search("wish") != -1) {
		wishListCount = $("#myDillardsRightFrameContent #wishListContainer .itemRow").size();
	}
}

// Product counting and removal logic
function itemCountDeduction(id) {
	if (id.search("shopping") != -1) {
		shoppingBagCount--;
		if (shoppingBagCount == 0) {
			$("#myDillardsRightFrameContent #shoppingBagContainer .hideWhenEmpty").fadeOut(500, function() {
				$("#myDillardsRightFrameContent #shoppingBagContainer .emptyMessage").fadeIn(500);
				$("#myDillardsRightFrameContent #shoppingBagContainer .hideWhenEmpty").hide();
			});
		}
	}
	if (id.search("wish") != -1) {
		wishListCount--;
		if (wishListCount == 0) {
			$("#myDillardsRightFrameContent #wishListContainer .hideWhenEmpty").fadeOut(500, function() {
				$("#myDillardsRightFrameContent #wishListContainer .emptyMessage").fadeIn(500);
				$("#myDillardsRightFrameContent #wishListContainer .hideWhenEmpty").hide();
			});
		}
	}
}

// Remove extra containers from empty message to prevent styling issues
function formatEmptyMessage() {
	var innerText = $("#myDillardsRightFrameContent .activePanel").find("#empty-bag").html();
	$("#myDillardsRightFrameContent .activePanel").find("#empty-bag").parent().remove();
	$("#myDillardsRightFrameContent .activePanel").find(".emptyMessage").html(innerText);
}

/*
// Prevents MyDillards bar from overlapping top of page when bar is present
function changeBodyMargin() {
	if ($("#myDillardsBar").css("display") == "block") {
		$("body").css("padding-top", $("#myDillardsBar").css("height"));
	} else {
		setTimeout(changeBodyMargin,150);
	}
}
changeBodyMargin();
*/

// A/B Testing -- Run this function to show My Dillard's bar and rearrange header
/*
function myDillardsABtest() {
	var countryCode = $.cookie("country");
	var myDillardsTest = $.cookie("MYDILLARDS_AB_TEST");
	if((countryCode == 'US' || countryCode == '' || countryCode == null) && (myDillardsTest == "B")){
		$("#fiftyOneContext, #utility-nav #mini-cart, #utility-nav #my-account, #utility-nav #wishlist").hide();
		$("#myDillardsContainer").show();
		$("body").css("padding-top", $("#myDillardsBar").css("height"));
		$("#search").css("clear","right").css("position","relative").css("top","-3px");
		$("#utility-nav").css("clear","right");
		$("#utility-nav .genericESpot").css("margin-right","-10px");
		$("#header-spot #barIsOff").hide();
		$("#header-spot #barIsOn").show();
		$("#header-spot").css("margin","0").css("width","auto").css("float","none").css("margin","0").css("position","absolute").css("bottom","12px").css("right","421px");
		if($("#header-spot #barIsOn img").eq(0).length > 0){
			$("#header-spot").css("margin-right","23px");
		}else{
			$("#header-spot").css("margin-bottom","12px");
		}
		$("#header-spot,#utility-nav").show();
	} else {
		$("#header-spot,#utility-nav,#fiftyOneContext").show();
	}
}
*/

// Show My Dillard's bar, rearrange header accordingly
function displayByDillardsBar(){
	var countryCode = $.cookie("country");
	if(countryCode == 'US' || countryCode == '' || countryCode == null){
		$("#fiftyOneContext, #utility-nav #mini-cart, #utility-nav #my-account, #utility-nav #wishlist").hide();
		$("#myDillardsContainer").show();
		$("body").css("padding-top", $("#myDillardsBar").css("height"));
		$("#search").css("clear","right").css("position","relative").css("top","-3px");
		$("#utility-nav").css("clear","right");
		$("#utility-nav .genericESpot").css("margin-right","-10px");
		$("#header-spot #barIsOff").hide();
		$("#header-spot #barIsOn").show();
		$("#header-spot").css("margin","0").css("width","auto").css("float","none").css("margin","0").css("position","absolute").css("bottom","12px").css("right","421px");
		// If eSpot contains an image, position it one way -- if there is no image, position it another way
		if($("#header-spot #barIsOn img").eq(0).length > 0){
			$("#header-spot").css("margin-right","23px");
		}else{
			$("#header-spot").css("margin-bottom","12px");
		}
	} else {
		$("#fiftyOneContext").show();
	}
	$("#header-spot,#utility-nav").show();
}
$(document).ready(function(){
	displayByDillardsBar();
});