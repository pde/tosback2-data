

	////////////////////////////////// iPad zoom touch override /////////////////////////////
	var iPadZoomTouchOverride = function() {
	$("zoomToolPic").style.background = "none";
	$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoom.gif";
	// if iPad, run the zoom code
// console.info("iPadZoomTouchOverride");
		// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT	
		// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger
	
		var triggerElementID = null; // this variable is used to identity the triggering element
		var fingerCount = 0;
		var startX = 0;
		var startY = 0;
		var curX = 0;
		var curY = 0;
		var deltaX = 0;
		var deltaY = 0;
		var horzDiff = 0;
		var vertDiff = 0;
		var minLength = 72; // the shortest distance the user may swipe
		var swipeLength = 0;
		var swipeAngle = null;
		var swipeDirection = null;
		
		// added variables for iPad Override
		var offsetArr = $('dragLayer').cumulativeOffset();
		var offSetTop = offsetArr[1];
		var offsetLeft = offsetArr[0];
		var newDragPointLeft = 0;
		var newDragPointTop = 0;
		
		// The 4 Touch Event Handlers
		
		// NOTE: the touchStart handler should also receive the ID of the triggering element
		// make sure its ID is passed in the event call placed in the element declaration, like:
		// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">
	
		function touchStart(event,passedName) {
//	console.info("touch start");
			// disable the standard ability to select the touched object
			event.preventDefault();
			// get the total number of fingers touching the screen
			fingerCount = event.touches.length;
			// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
			// check that only one finger was used
			if ( fingerCount == 1 ) {
				// get the coordinates of the touch
				startX = event.touches[0].pageX;
				startY = event.touches[0].pageY;
				// store the triggering element ID
				triggerElementID = passedName;
				// new code for iPad Override //
//	console.info("Begin: invoke ProductZoom.mouseOverHandler");
				
				ProductZoom.mouseOverHandler(event);
				$("zoomToolPic").style.background = "none";
				$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoomiOS5.gif";
				
				////////////////////////////////
			} else {
				// more than one finger touched so cancel
				touchCancel(event);
			}
		}
		
		function touchMove(event) {
			event.preventDefault();
			if ( event.touches.length == 1 ) {
				curX = event.touches[0].pageX;
				curY = event.touches[0].pageY;
				// new code for iPad Override //
//	console.info("Move: invoke ProductZoom.mouseMoveHandler");
				ProductZoom.mouseMoveHandler(event);
				////////////////////////////////
			} else {
				touchCancel(event);
			}
		}
		
		function touchEnd(event) {
			event.preventDefault();
			// check to see if more than one finger was used and that there is an ending coordinate
			if ( fingerCount == 1 && curX != 0 ) {
				// use the Distance Formula to determine the length of the swipe
				swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
				// if the user swiped more than the minimum length, perform the appropriate action
				if ( swipeLength >= minLength ) {
					caluculateAngle();
					determineSwipeDirection();
					processingRoutine();
					touchCancel(event); // reset the variables
				} else {
					touchCancel(event);
				}	
			} else {
				touchCancel(event);
			}
		}
	
		function touchCancel(event) {
			// reset the variables back to default values
			fingerCount = 0;
			startX = 0;
			startY = 0;
			curX = 0;
			curY = 0;
			deltaX = 0;
			deltaY = 0;
			horzDiff = 0;
			vertDiff = 0;
			swipeLength = 0;
			swipeAngle = null;
			swipeDirection = null;
			triggerElementID = null;
//	console.info("Cancel: invoke ProductZoom.mouseOutHandler");
			
			ProductZoom.mouseOutHandler(event);
			$("zoomToolPic").style.background = "none";
			$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoom.gif";
		}
		
		function caluculateAngle() {
			var X = startX-curX;
			var Y = curY-startY;
			var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
			var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
			swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
			if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
		}
		
		function determineSwipeDirection() {
			if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
				swipeDirection = 'left';
			} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
				swipeDirection = 'left';
			} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
				swipeDirection = 'right';
			} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
				swipeDirection = 'down';
			} else {
				swipeDirection = 'up';
			}
		}
		
		function processingRoutine() {
			var swipedElement = document.getElementById(triggerElementID);
			if ( swipeDirection == 'left' ) {
				// REPLACE WITH YOUR ROUTINES
	
			} else if ( swipeDirection == 'right' ) {
				// REPLACE WITH YOUR ROUTINES
				rotateShoePics();
	
			} else if ( swipeDirection == 'up' ) {
				// REPLACE WITH YOUR ROUTINES
	
			} else if ( swipeDirection == 'down' ) {
				// REPLACE WITH YOUR ROUTINES
	
			}
		}
	
	var iPadGestureLayer = $('dragLayer');
	iPadGestureLayer.addEventListener("touchstart",  function() { touchStart(event,'dragLayer') }, false);
	iPadGestureLayer.addEventListener("touchmove", touchMove, false);
	iPadGestureLayer.addEventListener("touchend", touchEnd, false);
	iPadGestureLayer.addEventListener("touchcancel", touchCancel, false);
	
	}
	
	
	////////////////////////  iPad Zoom Override iOS 4 or older //////////////////////////////////
	var iPadZoomOverride = function() {
// console.info("iPadZoomOverride");
		var zoomIsTrue = ['/browse/product.do']; // only on product pages
		var previewIsTrue  = ['www.gol.wip.gidapps.com','www.gol.app.gidapps.com'];
		var topValue = "0px";
		var topValue2 = "0px";
		if (zoomIsTrue.include(location.pathname)){
			var h = 0;
			h += Element.getHeight('previewContent');
			h += Element.getHeight('previewRoundedTop');
			h += Element.getHeight('previewRoundedBottom');
			if (previewIsTrue.include(location.host)){
				topValue = 0 + h + "px";
				topValue2 = 540 + h + "px";
			} else {	
				topValue = "0px";
				topValue2 = "540px";
			}
			var iPadNavSpace = navigator.userAgent;
			if (iPadNavSpace.indexOf("iPad") != -1) { // if iPad, override the zoom
				//console.info("iPad on PP");
				
				var iPadClickToCloseZoom = new Element('div', {'id' : 'clickToCloseZoom', 'style' : 'width:560px; height: 960px; position: absolute; top:0px; left:465px; z-index:9; display:none'});
				var iPadClickToCloseZoom2 = new Element('div', {'id' : 'clickToCloseZoom', 'style' : 'width:200px; height: 960px; position: absolute; top:0px; left:0px; z-index:9; display:none'});
				var iPadClickToCloseZoom3 = new Element('div', {'id' : 'clickToCloseZoom', 'style' : 'width:260px; height: 169px; position: absolute; top:' + topValue + '; left:200px; z-index:9; display:none'});
				var iPadClickToCloseZoom4 = new Element('div', {'id' : 'clickToCloseZoom', 'style' : 'width:260px; height: 500px; position: absolute; top:' + topValue2 + '; left:200px; z-index:9; display:none'});
				
				$("mainContentContainer").insert(iPadClickToCloseZoom);
				$("mainContentContainer").insert(iPadClickToCloseZoom2);
				$("mainContentContainer").insert(iPadClickToCloseZoom3);
				$("mainContentContainer").insert(iPadClickToCloseZoom4);
				$("zoomToolPic").style.background = "none";
				$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoom.gif"
				ProductZoom.showZoomBox = ProductZoom.showZoomBox.wrap(function(OriginalMethod){
					//console.info("MouseOverHandler");
					zoomEventTrigger();
					OriginalMethod();
				});
				
					Event.observe(iPadClickToCloseZoom, "click", function() {
							//console.info("zoom left closed");
							zoomCloseEventTrigger();
					});
					Event.observe(iPadClickToCloseZoom2, "click", function() {
							//console.info("zoom right closed");
							zoomCloseEventTrigger();
					});
					Event.observe(iPadClickToCloseZoom3, "click", function() {
							//console.info("zoom right closed");
							zoomCloseEventTrigger();
					});
					Event.observe(iPadClickToCloseZoom4, "click", function() {
							//console.info("zoom right closed");
							zoomCloseEventTrigger();
					});
					
					Event.observe($("productContentLeft"), "click", function() {
					
						//console.info("productContentLeft clicked");
						zoomEventTrigger();
					
					});
		
					Event.observe($("product_image_bg"), "click", function() {
					
						//console.info("product_image_bg clicked");
						zoomEventTrigger();
					
					});
					
					Event.observe($("product_image"), "click", function() {
					
						//console.info("product_image clicked");
						zoomEventTrigger();
					
					});
	
					Event.observe($("dragImg"), "click", function() {
					
						//console.info("dragImg clicked");
						zoomEventTrigger();
					
					});
					
					Event.observe($("dragBox"), "click", function() {
					
						//console.info("dragBox clicked");
						zoomEventTrigger();
					
					});
					
					Event.observe($("dragLayer"), "click", function() {
					
						//console.info("dragLayer clicked");
						zoomEventTrigger();
					
					});
				
				var zoomEventTrigger  = function() {
					iPadClickToCloseZoom.style.display = "block";
					iPadClickToCloseZoom2.style.display = "block";
					iPadClickToCloseZoom3.style.display = "block";
					iPadClickToCloseZoom4.style.display = "block";
					$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoomOut.gif"
				}
				
				var zoomCloseEventTrigger = function() {
					iPadClickToCloseZoom.style.display = "none";
					iPadClickToCloseZoom2.style.display = "none";
					iPadClickToCloseZoom3.style.display = "none";
					iPadClickToCloseZoom4.style.display = "none";
					$("zoomToolPic").src = "/Asset_Archive/GPWeb/content/0004/620/222/assets/iPadTouchToZoom.gif"
				}
				
			}
		}
	}
	
	
	
	// Override reset iPad sideNav line-height 
	var sideNavLineHeight = function() {
	   
	var sideNavIsTrue = ['/browse/division.do','/browse/category.do','/browse/subDivision.do','/browse/product.do'];
	
		if (sideNavIsTrue.include(location.pathname)){
			var iPadNavSpace = navigator.userAgent;
			if (iPadNavSpace.indexOf("iPad") != -1) {
				$('sideNav').style.lineHeight="30px";
				var sideNavContainers = $("sideNavCategories").select("[id^=categoryNav]");
				for (i = 0; i < sideNavContainers.length; i++) {
					Event.observe(sideNavContainers[i],"click",function(evt){ document.location = evt.target.firstDescendant().href;  });
				}
			}
		}
	}
	
	/////////////////////////////  iPad Quicklook Override  //////////////////////////////////
	var iPadQuicklookOverride = function() {   
		var sideNavIsTrue = ['/browse/category.do','/browse/search.do','/browse/product.do']; // only on category, product (for cross sells) and search pages
		if (sideNavIsTrue.include(location.pathname)){
			// if iPad, wrap the quicklook launcher
			quickLook.openQuickLookLauncher = quickLook.openQuickLookLauncher.wrap (function(originalMethod,style,stylecolor,category,num,imgroot,bool,num2) {
				document.location = "/browse/product.do?cid=" + category + "&vid=" + num + "&pid=" + style;
			});
		}
	}
	
	////// WCD iPad postage stamp patch //////
	var fixTopForiPad = function() {
		if ($("universalMarketingContainerTop")) {
			
			var iPadPatchDiv = $("universalMarketingContainerTop");
			iPadPatchDiv.style.width = "447px";
			iPadPatchDiv.style.overflow = "hidden";
			iPadPatchDiv.style.float = "right";
			$("universalMarketingContainerTop").style.float = "left";
			$("universalBarCenter").style.width = "987px"
			$("universalBarContainer").style.width = "987px"
			$("universalBarTabs").style.width = "327px"
			$("universalInlineBagContainer").style.width = "213px";
	
		}
	}
	
	var shoppingBagSpacing = function () {
		var shoppingBagTrue = ['/buy/shopping_bag.do','/buy/shopping_bag_save_item.do','/buy/shopping_bag_delete_item.do','/buy/edit_shipping_method_bag.do'];
		if (shoppingBagTrue.include(location.pathname)){
			if($("shoppingBagSummaryContainer")) {
				$("shoppingBagSummaryContainer").select("p.shoppingInformationLinks")[0].style.padding = "12px 0 0";
				var shipSelectArray = $("shoppingBagSummaryContainer").select("[id^=shippingMethodDiv]");
				for (i = 0; i < shipSelectArray.length; i++) {
					shipSelectArray[i].style.marginBottom = "24px";
				}
				var shipContainerArray = $("shoppingBagSummaryContainer").select("[id^=shippingOptionsRadioText]");
				for (i = 0; i < shipContainerArray.length; i++) {
					Event.observe(shipContainerArray[i],"click", function(evt){ evt.target.previousSiblings()[0].checked = true; submitShippingMethodForm(); });
				}
			}
			if ($("mainContent")) {
				var productActionArray = $("mainContent").select("dd.productActions");
				for(i = 0; i < productActionArray.length; i++) {
					var anchorTag = productActionArray[i].select("a");
					productActionArray[i].update();
					for (j = 0; j < anchorTag.length; j++) {
						productActionArray[i].insert(new Element("p", {"id" : "productActionP" + i + "" + j, "style" : "padding: 0px 0 16px 0"}).update(anchorTag[j]));
					}
				}
			}
		}
	
	}
	
	var iPadInit = function() {	
		document.write('<style type="text/css">.universalBarTable .universalBarCenter5Tab, .universalBarContainer5Tab {height: 57px; overflow: visible; width: 990px;} .universalBarTable .universalBarLeft, .universalBarTable .universalBarRight { height: 57px; overflow: visible; width: 19px; } #universalBarTabs li { float: left; }<\/style>');
		Event.observe(window,"load",fixTopForiPad);
		
		iPadQuicklookOverride();
		Event.observe(window,"load",shoppingBagSpacing);
		
		document.observe("dom:loaded",sideNavLineHeight);
		// determine the root version of iOS (version 4, 5, etc.)
		var theUserAgent = navigator.userAgent;
		var theUserAgentSub = theUserAgent.split("OS ");
		var theUserAgentSub = theUserAgentSub[1].split("_");
		var theiOSVersionMain = parseInt(theUserAgentSub[0]);
// console.info(theiOSVersionMain);
		var thisPathname = ["/browse/product.do"];
		if (thisPathname.include(location.pathname)){
			if (theiOSVersionMain >= 5) {
				Event.observe(document, 'initializeProduct:done',iPadZoomTouchOverride);
			} else {
				Event.observe(document, 'initializeProduct:done',iPadZoomOverride);
			}
		}
	}
	 
	
	
	
