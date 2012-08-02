var sprintHomePageModuleOpen = false; //This is a flag that will be used by the rotator to determine whether or not to continue animation. If a home page module is open, animation will pause. Being a variable on the global scope, this can also be triggered by other elements that are not necessarily home page specific, such as the user login layer (Fred) in the nav bar.
	
(function($) {

	$(function() {
		if($("#sprintHome").hasClass('segmentation')) {
			$("#consumerCustomer").bind("click", function(e) {
				//setConsumerCookie();
				setConsumerCustomerCookie();
			});
			
			$("#businessCustomer").bind("click", function(e) {
				//setBusinessCookie();
				setBusinessCustomerCookie();
			});
			
			$("#consumerProspect").bind("click", function(e) {
				setConsumerProspectCookie();
				
			});
			
			$("#businessProspect").bind("click", function(e) {
				setBusinessProspectCookie();
			});
			
			return;//Don't setup or run any more content in this dom-ready function as it's not needed for the segmentation home page
		}
		
		//If we're not on the actual home page (for example, if we're on the segmentation page), setup some functionality and then exit this function right away so that the rest of the home page's JS is ignored.
		/*
		//Not required for 3.0, required for 2.0
		if ($("#sprintHome.segmentation").length > 0) {
		
			$("#clientSegment, #prospectSegment, #businessSegment").bind("click", function(event) {
				event.preventDefault;
				window.location = $(this).find("a").attr("href");
			}).bind("mouseover", function() {
				$(this).addClass("over");
			}).bind("mouseout", function() {
				$(this).removeClass("over");
			});
		
			return; //Don't setup or run any more content in this dom-ready function as it's not needed for the segmentation home page
		}
		*/
		//Do a check for the sprintHome div
		if ($("#sprintHome").length < 1) {
			return; //Don't setup or run any more content in this dom-ready function as it's not needed for the segmentation home page
		}
		
		
		
		/*
		 look for parameter context=value from url, if value is a valid cookie value then update segment_user cookie.
		 so for index_b.html it should be "BP" or "BC" else set it to "BP" if context is present
		for index_c.html it should be "CP" or "CC" else set it to "CP" if context is present

		homePageType = Business, Customer, Prospect
		*/
		
		var homePageType = $("#homePageType").val();
		if(homePageType) {
		
			var curSegCookieValue = Sprint.fn.readCookie("segment_user");
			var contextCookieValue = Sprint.fn.getURLParameter(Sprint.fn.getQueryString(window.location.href), "context");
			if(contextCookieValue){
				contextCookieValue = contextCookieValue.toUpperCase();
			}
			var isUpdateCookie = false;
			var consumerHatUrl ="/index_p.html?context=CP";
			var bizHatUrl ="/index_b.html?context=BP";
			switch(homePageType) {
				case 'Business':
					if( curSegCookieValue && (curSegCookieValue == "BP" || curSegCookieValue == "BC")) {
						isUpdateCookie = false;
						bizHatUrl = "/index_b.html?context="+curSegCookieValue;
					} else if (contextCookieValue == "BP" || contextCookieValue == "BC") {
						isUpdateCookie = true;
					}
					
					break;
				case 'Customer':
					if( curSegCookieValue && (curSegCookieValue == "CP" || curSegCookieValue == "CC")) {
						isUpdateCookie = false;
						consumerHatUrl = "/index_c.html?context="+curSegCookieValue;
							
					} else if (contextCookieValue == "CP" || contextCookieValue == "CC") {
						isUpdateCookie = true;
					}
					
					break;
				case 'Prospect':
					if( curSegCookieValue && curSegCookieValue == "CP") {
						isUpdateCookie = false;
							
					} else if (contextCookieValue == "CP") {
						isUpdateCookie = true;
					}
					break;

			}
			if (isUpdateCookie) {
				Sprint.fn.createCookie("segment_user", contextCookieValue, "180", "/", ".sprint.com");
			}
			
			$("#navConsumerTab").find("a").attr("href", consumerHatUrl);
			$("#navBusinessTab").find("a").attr("href", bizHatUrl);
		}
		
		
		/* Functionality for the marketing area promo layers
		--------------------------------------------------------*/
		(function() {
			
			var promoHeight = 322;
			var promoWidth = 960;

			var promoScrollTimerHeight = 38; //Max height of the promo scroll timer indicator
			
			var animationSpeedOnClick = "normal"; //Can be 3 string values (slow (600 miliseconds), normal (400 miliseconds), fast (200 miliseconds)) or a number in miliseconds 
			var animationSpeedOnTimer = "normal"; //Can be 3 string values (slow, normal, fast) or a number in miliseconds
			
			var animationSpeed = animationSpeedOnTimer; //Set animation speed to the default value of the Timer
			
			var rotationTimeout; //Interval variable for auto-rotation
			var rotationTime = 10000; //Rotation time in miliseconds - 10000 = 10 seconds
			var rotationTimeAfterClick = 60000; //Time until normal rotation starts again after a user clicks on an item (in miliseconds).
			
			var splashPromoMenu = $("#splashPromoMenu");
			var promoMenuItems = splashPromoMenu.find("li");
			var promoMenuItemAnchors = promoMenuItems.find("a");
			
			//Create the scroll indicator & timer
			var promoScrollIndicator = $("<div id=\"promoScrollIndicator\"><div id=\"promoScrollTimer\"><span class=\"solid\"></span><span class=\"opaque\"></span></div></div>");
			promoScrollIndicator.appendTo(splashPromoMenu);
			var promoScrollTimer = promoScrollIndicator.find("#promoScrollTimer");
			promoScrollTimer.height(0); //Initialize height of the timer div
			promoScrollTimer.find("span.opaque").css({opacity: .25}); //Initialize opacity of the semi-transparent portion of the timer
			promoScrollTimer.find("span.solid").css({opacity: .50}); //Initialize opacity of the "solid" portion of the timer
			
			var splashPromos = $("#splashPromos"); //This is the containing layer that we'll set the clip dimensions on. It will also be the layer that we slide left/right when moving to the next promo item
			var promoItems = splashPromos.find("div.promo");
			
			//Initialize the promo & promo container layers
			splashPromos.width(promoWidth).height(promoHeight).css("position", "absolute");
			$("#splash").width(promoWidth).height(promoHeight).css("overflow", "hidden");
			
			promoItems.css({
				position: "absolute",
				top: 0
			});
			
			promoItems.each(function(i) {
				//Set the left position of each promo item so that they all appear side by side in one long row
				$(this).css("left", promoWidth * i);
				$(this).css("opacity", "100");
			});
			
			promoMenuItemAnchors.bind("click", function(event) {
				event.preventDefault();

				//Stop animations
				promoScrollIndicator.stop();
				splashPromos.stop();
				promoScrollTimer.stop();
				
				//Switch to requested item
				switchToItem($(this).parent(), true);
				
			});
			
			var switchToItem = function(item, click) {
				
				var curr_item_href = $('#splashPromoMenu li.selected a').attr('href');
				if (curr_item_href !== undefined) {
					$(curr_item_href.substr(curr_item_href.indexOf('#'))).find('object').each(function() {
						try{
              this.stopVideo();
            }catch(e){}
					});
				}
				
				//Clear the existing timeout
				clearTimeout(rotationTimeout);
				
				//Reset the animation speed based on what triggered the switch event.
				if (click) {
					animationSpeed = animationSpeedOnClick;
				}
				else {
					animationSpeed = animationSpeedOnTimer;
				}
				
				//un-select all items
				promoMenuItems.removeClass("selected");

				//Select the requested list item
				item.addClass("selected");
				
				//Determine the layer to slide to
				var nextItemHref = item.find("a").attr("href");
				var targetItem = $(nextItemHref.substr(nextItemHref.indexOf("#")));
				
				//position the indicator based on the selected list item
				var newIndicatorTop = (item.offset().top - item.parent().offset().top);

				function doAnimation() {
				
					//While the indicator is moving, hide the timer portion of it so only the outline shows (but only if the user didn't explicity select this promo by clicking on it
					if (!click) {
						promoScrollTimer.css("visibility", "hidden").height(0); //Hide the timer layer and re-set its height to 0
					}
					else {
						promoScrollTimer.height(promoScrollTimerHeight).find("span.opaque").hide(); //Show just the "solid" part of the progress indicator
					}

					promoScrollIndicator.addClass("moving").animate({
						top: newIndicatorTop
					}, animationSpeed, function() {
						promoScrollIndicator.removeClass("moving");
						promoScrollTimer.css("visibility", "");
					});
	
					//Scroll to the next item in parallel with the scroll indicator
					splashPromos.animate({
						left: "-"+targetItem.css("left")
					}, animationSpeed, function() {
					
						//When the target layer has finished it's animation, start the rotation again. Note: if the user selected an item by clicking on it, wait for the alloted time (rotationTimeAfterClick) before starting auto-rotation again by using a timeout 
					
						if (click) {
							rotationTimeout = setTimeout(startRotation, rotationTimeAfterClick)
						}
						else {
							startRotation();
						}
					});

				}
				
				//Animate to the next promo - but only if there isn't a home page module open at the bottom of the home page.
				if (!sprintHomePageModuleOpen) {
					doAnimation();
				}
				else {
					//If there is a module open, check once every second to make sure that it's closed, and if it is, animate to the next item then!
					var restartInterval = setInterval(function() {
						if (!sprintHomePageModuleOpen) {
							doAnimation();
							clearInterval(restartInterval);
						}
					}, 1000);					
				}
				
				function startRotation() {
				
					var nextItem = item.next();

					//Reset the promo scroll timer's height to 0 and make sure the span.opaque is visible again if it was hidden by selecting a promo on click
					promoScrollTimer.height(0).find("span.opaque").show();
					
					//Start by animating the Timer layer's height, once that's done, slide to the next item
					promoScrollTimer.animate({height: promoScrollTimerHeight}, rotationTime, function() {
					
						//Switch to next item
						if (item.hasClass("last")) {
							//If we're on the last item, first item is next
							nextItem = promoMenuItems.eq(0);
						}
						
						switchToItem(nextItem);
					
					});
				}

			};
			
			//On window load, switch to the first item
			$(window).bind("load", function() {
			
				switchToItem(promoMenuItems.eq(0));

			});
			
			//If a user clicks on the promo indicator / timer while it's above a promo, stop auto-rotation
			promoScrollIndicator.bind("click", function(event) {
				event.preventDefault();
				
				if (!promoScrollIndicator.hasClass("moving")) {
					//Stop animations
					promoScrollIndicator.stop();
					splashPromos.stop();
					promoScrollTimer.stop();

					switchToItem(splashPromoMenu.find("li.selected"), true);
				}
			});
			
		})();




		/* Functionality for the home page modules
		--------------------------------------------------------*/
		(function() {

			var showFredTimeOut = null;
			var modules = $("#homeModules > li");
			var moduleData = []; //Module data will be stored here later
			
			var fadeSpeed = 200;
			var resizeSpeed = 500;

			var summaryFullWidth = 223;
			var summarySmallWidth = 158;
			var summaryHeight = 125;
			var summaryMargin = 20;
			var fullLargeWidth = 418;
			var fullLargeHeight = 358;

			var selectedModule; //Used as a reference to the currently selected module to open

			var shrinkToSmallSummary = true; //If this is true, when the shrink function is called it should shrink to the small summary view, if it's false, it means all items will be shrunk to the full summary view (with images)
			
			function initializeModules() {

				//Hide the full content divs
				modules.find("div.full").hide();
				
				//Apply link styling to the li summary and hide the summary anchors
				modules.find("div.summary").css("cursor", "pointer").find("a").hide();
				
				//Apply absolute positioning to the modules instead of floating them
				modules.css({
					float: "none",
					position: "absolute",
					bottom: 0
				});
				
				modules.each(function(i) {

					var startingLeftPosition = (summaryFullWidth + 2 + summaryMargin) * i; //The 2 is for border width
					var smallLeftPosition = (summarySmallWidth + 2 + summaryMargin) * i;
					
					var fullLeft = (summarySmallWidth + summaryMargin + 2) * i; //Calculates the left position of the module when it would be fully open
					
					//Initialize the data for this particular module
					moduleData[i] = {
						animating:                 false,                 //whether or not this particular module is currently animating
						atInitialState:            true,                  //whether or not this particular module is currently in it's initial state
						atSmallSummaryState:       false,                 //whether or not this item is currently in small summary state
						summaryVisible:            true,                  //whether or not the summary is visible
						summaryImageVisible:       true,                  //whether or not the summary image is visible
						itemResized:               false,                 //whether or not the item has been re-sized
						fullContentVisible:        false,                 //whether or not the full content layer is visible
						fullContentShadowsAdded:   false,                 //whether or not the full content layer has had drop-shadows applied
						startingLeftPosition:      startingLeftPosition,  //the starting left position of this module in its initial state
						smallSummaryLeftPosition:  smallLeftPosition,     //the base left position of the module when it's in small summary state
						fullLeftPosition:          fullLeft,              //the base left position of the module when it's at its fully open state
						lastCalledAnimation:       "shrink",              //the last animation type to happen
						elem:                      $(this)                //the jQuery object for this module
					};
					
					//Set the starting left position
					moduleData[i].elem.css("left", startingLeftPosition);

				});

			}
			
			function stopItemAnimation(item) {
				//Stop all animation on this item
				item.stop().find("div.summary, div.summary img, div.full").stop();
			}
		
			function growItem(item) {
			
				//Determine the item index of this item
				var itemIndex = modules.index(item);
				
				//Stop any animation that might be taking place on this item
				stopItemAnimation(item);

				//Start by fading out the summary
				fadeOutSummary();
				
				function fadeOutSummary() {
				
					moduleData[itemIndex].atInitialState = false;			

					var summaryDiv = item.find("div.summary");
				
					//Fade out the summary
					moduleData[itemIndex].summaryVisible = false;

					summaryDiv.fadeTo(fadeSpeed, 0, function() {
						
						summaryDiv.hide();
						resizeItem();
					
					});
				}
				
				function resizeItem() {
				
					// When the user expands the item, the signInLink is closed, if it was open.
					toggleFred();
						
					moduleData[itemIndex].itemResized = true;
					
					item.animate({
						width: fullLargeWidth,
						height: fullLargeHeight,
						left: moduleData[itemIndex].fullLeftPosition
					}, resizeSpeed, showFullContent);
					
				}
				
				function showFullContent() {
				
					//Add shadow divs for all browsers except <= IE6
					if (!($.browser.msie && $.browser.version < 7)) {
						item.css("overflow", "").append("<div class=\"shadow shadowTop\"></div><div class=\"shadow shadowLeft\"></div><div class=\"shadow shadowRight\"></div>");
						moduleData[itemIndex].fullContentShadowsAdded = true;
					}
					
					var fullDiv = item.find("div.full");
					
					//If the div is hidden, set opacity to 0 and show it
					if (String(fullDiv.css("display")).toLowerCase() == "none") {
						fullDiv.fadeTo(0, 0).show();
					}
					
					moduleData[itemIndex].fullContentVisible = true;

					fullDiv.fadeTo(fadeSpeed, 1, function() {
						fullDiv.css({opacity: ""}); //set opacity to empty (mostly for IE's benefit)

						var $this = $(this);
						if($this.data("adTrackingDone") != true){
							adTimer = setTimeout(function(){
											adTracking($this);
										},2000);
						}
					});
				}
				
				function adTracking(target){
					// get the parent <li>
					var parent = target.parents("li:first");
					var promoIndex = parent.attr("id");
					var adID = target.children("div[campaign_id]");
					//check that trackHomeAdImpression function is available
					if (typeof(Analytics) !== "undefined" && typeof(Analytics.eCareATG) != "undefined"  && typeof(Analytics.eCareATG.trackHomeAdImpression) != "undefined"){
						//check for campaign ID
						if(adID && adID.length > 0){
							Analytics.eCareATG.trackHomeAdImpression(promoIndex,adID);
						}else{
							Analytics.eCareATG.trackHomeAdImpression(promoIndex,null);
						}
						// flag adTracking as complete so it only runs once
						target.data("adTrackingDone",true);
					}
				}
			}
			
			function shrinkItem(item) {

				//Determine the item index of this item
				var itemIndex = modules.index(item);
				
				//Stop any animation that might be taking place on this item
				stopItemAnimation(item);
				
				//Remove shadows if they're present
				item.find("div.shadow").remove();
				moduleData[itemIndex].fullContentShadowsAdded = false;

				if (moduleData[itemIndex].fullContentVisible) {
					fadeOutFullContent();
				}
				else {
					//If none of the above conditions are met, shrink to the small summary
					fadeOutImage();
				}
				
				function fadeOutFullContent() {
				
					var fullDiv = item.find("div.full");
					
					//If the div is hidden, set opacity to 0 and show it
					if (String(fullDiv.css("display")).toLowerCase() == "none") {
						fullDiv.fadeTo(0, 0).show();
					}
					
					fullDiv.fadeTo(fadeSpeed, 0, function() {
					
						// When the user shrinks the item, the signInLink is opened, if it was closed.
						toggleFred();


						moduleData[itemIndex].fullContentVisible = false;
					
						fullDiv.hide();
						resizeItem();
					
					});
					
				}
				
				function resizeItem() {
					
					var propertiesToAnimate = {height: summaryHeight};
					
					if (shrinkToSmallSummary) {
						propertiesToAnimate.width = summarySmallWidth;
						
						//Left position will depend on whether or not to small summary is before or after the selected item
						var leftOffset = 0;
						
						if (modules.index(item) > modules.index(selectedModule)) {
							leftOffset = fullLargeWidth - summarySmallWidth;
						}
						
						propertiesToAnimate.left = moduleData[itemIndex].smallSummaryLeftPosition + leftOffset;
					}
					else {
						propertiesToAnimate.width = summaryFullWidth;
						propertiesToAnimate.left = moduleData[itemIndex].startingLeftPosition;
					}
					
					if (shrinkToSmallSummary) {
						//Hide img first (if it's visible) and then animate
						item.find("div.summary img").hide();
						item.animate(propertiesToAnimate, resizeSpeed, function() {
							fadeInSummary();
						});
					}
					else {
						//animate
						item.animate(propertiesToAnimate, resizeSpeed, function() {
							fadeInSummary();
						});
					}

					moduleData[itemIndex].atInitialState = false;

				}
				
				function fadeInSummary() {

					var summaryDiv = item.find("div.summary");

					moduleData[itemIndex].itemResized = false;

					//If the div is hidden, set opacity to 0 and show it
					if (String(summaryDiv.css("display")).toLowerCase() == "none") {
						summaryDiv.fadeTo(0, 0).show();
					}

					summaryDiv.fadeTo(fadeSpeed, 1, function() {
						
						var summaryImage = summaryDiv.find("img");
						
						//If there's no image, we need to create a fake one in order to preserve the positioning/animation of all other modules...
						if (summaryImage.length < 1) {
							summaryImage = $("<img width=\"0\" height=\"0\" class=\"noImage\" />").css({width: 0, height: 0}).appendTo(summaryDiv);
						}
						
						moduleData[itemIndex].summaryVisible = true;
						
						if (!shrinkToSmallSummary) {
							moduleData[itemIndex].atInitialState = true;

							//If the image is hidden, set opacity to 0 and show it
							if (String(summaryImage.css("display")).toLowerCase() == "none") {
								summaryImage.fadeTo(0, 0).show();
							}
							
							item.find("div.fullSummaryText div.summaryText").removeAttr("style");

							summaryImage.fadeTo(fadeSpeed, 1);

						}
					});
				}
				
				function fadeOutImage() {
					
					var summaryDiv = item.find("div.summary");
					var summaryImage = summaryDiv.find("img");
						
					//If there's no image, we need to run a hidden animation on someting in order to preserve the positioning/animation of all other modules...
					if (summaryImage.length < 1) {
						summaryImage = $("<img width=\"0\" height=\"0\" class=\"noImage\" />").css({width: 0, height: 0}).appendTo(summaryDiv);
					}
					
					summaryImage.fadeTo(fadeSpeed, 0, function() {
						summaryImage.hide();
						resizeItem();
					});
				}

			}
			
			function toggleFred() {
				if (showFredTimeOut) {
					clearTimeout(showFredTimeOut);
				}
				showFredTimeOut = setTimeout(function()
				{
					if($("#homeModules .module.over").size() > 0) {
						if($("#userLogin").hasClass("disclosureOpen")) {
							$("#signInLink").trigger("click");
						}
					}
				},
				500);
			}
			
			var mouseTimer;
			var adTimer;
			
			modules.bind("mouseover", function(event) {

				clearTimeout(mouseTimer);

				var currentItem = $(this);

				if (currentItem.hasClass("over")) {
					return;
				}
				
				//Update classes
				modules.removeClass("over");
				currentItem.addClass("over");

				shrinkToSmallSummary = true;

				if (!selectedModule) {
					selectedModule = currentItem;
					currentItem.growHomeModule();
					modules.not(currentItem).shrinkHomeModule();
				}
				else if (selectedModule.get(0) == currentItem.get(0)) {
					//This item is currently open, shrink all modules to full summary size
					selectedModule = null;
					shrinkToSmallSummary = false;
					modules.shrinkHomeModule();
				}
				else {
					selectedModule = currentItem;
					currentItem.growHomeModule();
					modules.not(currentItem).shrinkHomeModule();
				}
				
				sprintHomePageModuleOpen = true;

			}).bind("mouseout", function(event) {

				clearTimeout(adTimer);
				
				var currentItem = $(this);
				
				if (!moduleData[modules.index(currentItem)].atInitialState) {
					
					mouseTimer = setTimeout(function() {
						selectedModule = null;
						shrinkToSmallSummary = false;
						modules.shrinkHomeModule();
						currentItem.removeClass("over");
						
						//Only clear this variable if Fred is closed.
						if (!($("#userLogin.disclosureOpen").length > 0 || $("#userLoggedIn").css("display") == "block")) {
							sprintHomePageModuleOpen = false;
						}
						
					}, 10);
					
				}

			});
			
			initializeModules();
			
			$.fn.growHomeModule = function() {
				return this.each(function() {
					growItem($(this));
				});
			}

			$.fn.shrinkHomeModule = function() {
				return this.each(function() {
					shrinkItem($(this));
				});
			}

		})();

	});
	/*  Upgrade eligibility module code */
	var originalTitle="";
	var originalContent="";
	var spinner='<div id="modalSpinner" style="margin-top:20px;"><img src="/global/images/template/widgets/modal/pb_loading_spinner_grey.gif" alt="'+Sprint.fn.getContentString("modal.loadingText")+'" /></div>';
	var errorText='<p>There was an error processing your request.  Please try again later.</p>';
	var resetText='<p id="upgradeEligibilityResetText">Try another phone number</p>';
	var sprint_upgradeEligibilityTimer=null;
	var sprint_upgradeEligibilityTimeout=false;
	
	function handleResponse(data){
		clearTimeout(sprint_upgradeEligibilityTimer);
		if(!sprint_upgradeEligibilityTimeout){
			if(data.Status=='success'){
				$('#hp_upgrade_title').html(decodeURIComponent(data.MessageHeader));
				var button='<p class="clearfix"><a href="'+data.ShopUrl+'&intNAV=MyS:UHP:20111004:UpgEligChk" class="button1_converted"><span><span><span><span>Go Shop</span></span></span></span></a></p>';
				if(data.MessageBody==undefined || data.MessageBody==null || data.MessageBody.replace(/\s/g,"")==""){
					data.MessageBody="<p>Your upgrade discount is not available yet. You can still buy certified pre-owned devices or phones at full retail price without affecting your upgrade status.</p>";
				}
				$('#hp_upgrade_main').html('<p>'+decodeURIComponent(data.MessageBody)+'</p>'+button+resetText);
				try{
					Analytics.MetricData.UsrMsg = decodeURIComponent(data.MessageBody);
					Analytics.eCareATG.trackTransaction('UpgEligChk-Elig','Complete');
				}catch(e){}
			}
			else if(data.Status=='failure'){
				var button='<p class="clearfix"><a href="'+data.ShopUrl+'&intNAV=MyS:UHP:20111004:UpgEligChk" class="button1_converted"><span><span><span><span>Go Shop</span></span></span></span></a></p>';
				$('#hp_upgrade_main').html('<p>'+decodeURIComponent(data.MessageBody)+'</p>'+button+resetText);
				try{
					Analytics.MetricData.UsrMsg = decodeURIComponent(data.MessageBody);
					Analytics.eCareATG.trackTransaction('UpgEligChk-Not Elig','Complete');
				}catch(e){}
			}
			else{
				$('#hp_upgrade_main').html=(errorText+resetText);
			}
			bindResetHandler();
		}
	};
	function bindResetHandler(){
		$('#upgradeEligibilityResetText').bind('click',resetContent);
	};
	function doUpgradeTimeout(){
		sprint_upgradeEligibilityTimeout=true;
		$('#hp_upgrade_main').html(errorText+resetText);
		bindResetHandler();
	};
	function resetContent(){
		$('#hp_upgrade_title').html(originalTitle);
		$('#hp_upgrade_main').html(originalContent);
		bindUpgradeFormHandlers();
	};
	function validateUpgradeEligibility(ev){
		ev.preventDefault();	
		var fm=$('#upgEligCheckForm');
		var upgradeEligibilityFormFields = {
			emailAddress: {
				name: "ptn",
				type: "phoneNumberDuplicates",
				required: true,
				emptyErrorMessage: Sprint.fn.getContentString("formFieldErrors.phoneNumberEmpty"),
				invalidErrorMessage: Sprint.fn.getContentString("formFieldErrors.phoneNumberInvalid")
			},
			zipCode: {
				name: "billZipcode",
				type: "zipCode",
				required: true,
				emptyErrorMessage: Sprint.fn.getContentString("formFieldErrors.zipCodeEmpty"),
				invalidErrorMessage: Sprint.fn.getContentString("formFieldErrors.zipCodeInvalid")
			}
		};
		$('#hp_upgrade_main label.error').remove();
		var validForm = Sprint.fn.validateForm(fm, upgradeEligibilityFormFields);
		
		if(validForm == true){
			(function(){
				// Check if 2.0 cookie present, if not create one, as First Time AJAX requestes geting redirected.  Need to validate the approach with Saurabh
				var cookie20 = Sprint.fn.readCookie("EXP_COOKIE");
				if(!cookie20 || (cookie20 && cookie20 != "2.0")) {
					Sprint.fn.createCookie("EXP_COOKIE", "2.0", "", "/", ".sprint.com");
				}
			})();
			sprint_upgradeEligibilityTimeout = false;
			sprint_upgradeEligibilityTimer = setTimeout(doUpgradeTimeout,10000);
			
			$.ajax({
				url:sprint_upgradeBaseURL+'/mysprint/shop/global/upgradeEligibility.jsp',
				dataType:'script',
				data:$('#upgEligCheckForm').serialize()
			});
			$('#hp_upgrade_main').html(spinner);
		} else {
			fm.find('label.error').remove();
			fm.showFormErrors({
                showInline: true,
                showSummary: false,
                errorData: validForm
             });
			 try{
				var msg=""
				var count=0;
				for(var x in validForm){
					if(count>0){
						msg+=" | ";
					}
					msg+=validForm[x]["errorMessage"]
					count++;
				}			
				Analytics.eCareATG.trackError('user',msg);				
			 }catch(e){}
		}
	};
	function bindUpgradeFormHandlers(){
		$('#upg_submit').unbind('click').bind('click',function(ev){
			ev.preventDefault();	
			$('#upgEligCheckForm').trigger('submit');
		});
		$('#upgEligCheckForm').bind('submit',validateUpgradeEligibility);
		$('#upg_ptn').bind('blur',function(){
			var v=$(this).attr('value');
			v=v.replace(/[^\d]/g,'');
			$(this).attr('value',v)
		});
	}
	$(function(){
		var isCA = Sprint.fn.readCookie("customAisleFileCookie");
		// custom aisle exception
		if(isCA){
			originalContent=$('#hp_upgrade_main').html('As a privileged customer, please call 1-800-722-9336 Mon - Sun 7 a.m. - 1 a.m. (EST) Be sure to reference your employer\'s name.');
		}
		else{ //standard flow
			bindUpgradeFormHandlers();
			originalTitle=$('#hp_upgrade_title').html();
			originalContent=$('#hp_upgrade_main').html();
		}
	});
	window.sprint_hpHandleUpgradeResponse=handleResponse;

})(jQuery);