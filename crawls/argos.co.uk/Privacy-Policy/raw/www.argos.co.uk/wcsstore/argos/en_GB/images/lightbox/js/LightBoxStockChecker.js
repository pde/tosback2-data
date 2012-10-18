var LightBoxStockChecker = {};
$(document).ready(function(){

	/*************************************************************
	* run on Stock Availability Page.
	*************************************************************/
	
	
	
	/*************************************************************
	* do not run when on comparison page
	*************************************************************/
	var isComparisonPage = $("body").hasClass("productcompare");
	//if(isComparisonPage) return;
	
	
	var IE6 = ($.browser.msie && parseInt($.browser.version) == 6);
	var IE7 = ($.browser.msie && parseInt($.browser.version) == 7);
	var FF = ($.browser.mozilla); //needs work to not do it for FF3 etc
	var FF3 = ($.browser.mozilla && parseFloat($.browser.version).toFixed(1) >= 1.9);

	var dialogue = $("#lightBox")[0];
	var	overlay = $("#overlay")[0];	
	
	/*************************************************************
	* do not run when in gift mode section
	*************************************************************/	

	if(typeof inGiftMode !== "undefined" && inGiftMode === true) return;
	
	var postCodeFieldDefaultMessage = lightBoxStockCheckTextBox; // Var from getResource.jspf
	var postCodeFieldDefaultMessage2 = "Enter your postcode";
	var postCodeFieldDefaultMessage3 = "Enter postcode";
	var backToInitialResultsData;
	
	LightBoxStockChecker = new (function(){  
		
		/*
		 * Product details init
		 */
		(function(){
			
		 	var deliveryDetails = $("#deliveryInformation ul")[0];
		 	if(deliveryDetails === undefined) return;		
			if(typeof isaltmServiceEnabled !== "boolean") return;
			if(typeof buyOrReservable !== "boolean") return;
			if(typeof outOfStockEmailable !== "boolean") return;
			
			
			
			var showPostCode;
			if(isaltmServiceEnabled && buyOrReservable) {
				showPostCode = true;
			}
			else if(outOfStockEmailable) {
				showPostCode = false;
			}
			else {
				// in the case that !buyOrReservable && !outOfStockEmailable
				return;
			}

		 	$(deliveryDetails).find("li.priceStockChecker").remove();
		 	var html = (function(){
		 				 		
		 		if(showPostCode) {
			 		var postCodeValue = getTownNameFromCookie();
			 		if(postCodeValue == "")
			 			postCodeValue = getPostCodeFromCookie();
			 		var postCodeFieldValue = postCodeValue;		
			 		var postCodeFieldClass = "";
			 		if(typeof postCodeValue == "undefined" || postCodeFieldValue == "undefined" || postCodeFieldValue ==""){
			 			postCodeFieldValue=postCodeFieldDefaultMessage;
			 			postCodeFieldClass = ' class="inputBkgrndText" ';
			 		}		 		
			 		var s ='';
			 		s += 	'<li class="stockChecker">';
			 		s +=		'<h2>Check stock in your area</h2>';
			 		s +=		'<p class="searchHint">'+lightBoxStockCheckLabel+'</p>';
			 		s +=		'<input type="hidden" name="checkStock" value="true">'; 
			 		s +=		'<input type="hidden" name="backTo" value="product">';	 
			 		s +=		'<input type="text" id="qasSearchTerm" '+postCodeFieldClass+' name="qasSearchTerm" value="'+postCodeFieldValue+'"/>';
					s +=		'<input type="image" id="checkStockGo" src="' + argos.app.imageDir + '/lightbox/img/btn_checkstock.gif" alt="Check stock" />';	     		
			 		s +=	'</li>';
			 	}
			 	// outOfStockEmailable
			 	else {
			 		var s ='';
			 		s += 	'<li class="emailMeBack">';
     				s +=		'<a class="emailMeBackInStock" href="#">Email me when<br/>back in stock</a>';
			 		s +=	'</li>';	
			 		
			 		$("#deliveryInformation").removeClass("isaltNoDisplay");
				 	$("#deliveryInformation").addClass("isaltDisplay");		 		
			 	}
		 		return s;
		 	}()); 	     	
		 	$(deliveryDetails).addClass("hasStockChecker");
		 	
		 	$(deliveryDetails).prepend(html);
		 	if(showPostCode) {
			 	$("input#checkStockGo").bind("click", checkStock_onClick);
			 	$("input#checkStockGo").bind("click", LightBoxStockCheckerTracking.trackAddToBasketPopup);
				$("input#qasSearchTerm").keydown(function(event){
					if(event.keyCode === 13) {
						checkStock_onClick();
						
						return false;
					}
				});

				$("input#qasSearchTerm").focus(function() {
					if( this.value == postCodeFieldDefaultMessage ) {
						this.value = "";
						$(this).removeClass("inputBkgrndText");
					}
				}).blur(function() {
					if( !jQuery.trim(this.value).length ) {
						this.value = postCodeFieldDefaultMessage;
						$(this).addClass("inputBkgrndText");
					}
				});
				
			}
			else {
				$("li.emailMeBack a.emailMeBackInStock").bind("click", emailMeWhenBackInStock_onClick);
				$("li.emailMeBack a.emailMeBackInStock").bind("click", LightBoxStockCheckerTracking.trackAddToBasketPopup);
			}
			
			
					 	
		}());
	     
		/*
		 * Product search results
		 */
		(function(){
			if(typeof isaltmServiceEnabled !== "boolean") return;
			
			var actions = $("div#switchview li.product li.ordering li.action");
			var action;
			var URL;
			var identifier;
			for(var i = actions.length-1; i>=0;i--) {
				action = actions[i];
				var isOutOfStockEmailable = $(action).hasClass("outOfStockEmailable");
				var isBuyOrReservable = $(action).hasClass("buyOrReservable");
				$(action).find("p.priceStockChecker").remove();
				if(!isOutOfStockEmailable && !isBuyOrReservable) {
					continue;
				}
				
				// get href from product title link
				//href = $(action).parents("li.ordering").parents("ul").find("li.producttitle h4 a").attr("href");
				identifier = $(action).attr("id").split("action_")[1];
				URL = $("#href_"+identifier).attr("href");

				if(isBuyOrReservable && isaltmServiceEnabled && URL != null) {
					$(action).prepend(
						(function getHTML(){
							var h = '';
							h +=	'<div class="stockChecker">';
							h +=		'<a class="checkStockActivator" href="/webapp/wcs/stores/servlet/ISALTMStockAvailability?';
							h += (function(){
								var h = '';
								h += "partNumber=" +getPartNumber( URL) || "";
								h += "&storeId=" + getStoreId() || "";
								h += "&langId=" +getLangId() || "";
								h += "&backTo=product+list" || "";
								return h;
							}());
							h +=		'">Check stock in your area</a>';
							h +=	'</div>';
							return h;
						}())
					);
					$("div#switchview div.stockChecker a.checkStockActivator").bind("click", checkStockActivator_onClick);
					$("div#switchview div.stockChecker a.checkStockActivator").bind("click", LightBoxStockCheckerTracking.trackAddToBasketPopup);
				}

				if(isOutOfStockEmailable) {
					$(action).html(
						(function getHTML(){
							var h = '';
							h +=	'<div class="emailMe">';
							h +=		'<a class="emailMe" href="/webapp/wcs/stores/servlet/ISALTMOutOfStockEmail?';
							h += (function(){
								var h = '';
								h += "partNumber=" + getPartNumber( URL) || "";
								h += "&storeId=" + getStoreId() || "";
								h += "&langId=" + getLangId() || "";
								h += "&viewTaskName=ISALTMAjaxResponseView";
								return h;
							}());
							h +=		'">Email me when<br/> back in stock</a>';
							h +=	'</div>';
							return h;
						}())
					)
					$("div#switchview div.emailMe a.emailMe").bind("click", listerEmailMe_onClick);
					$("div#switchview div.emailMe a.emailMe").bind("click", LightBoxStockCheckerTracking.trackAddToBasketPopup);
				}
			}
		}());	     
	    
		/*
		 * Trolley lister
		 */

		(function(){
			
			if(typeof isaltmServiceEnabled !== "boolean") return;
		
			var cells = $("#trolleylist table.trolleylister td.homedelinfo");
			var cell;
			var URL;
			var identifier;
			for(var i = cells.length-1; i>=0;i--) {
					
				cell = cells[i];
				var isOutOfStockEmailable = $(cell).hasClass("outOfStockEmailable");
				var isBuyOrReservable = $(cell).hasClass("buyOrReservable");
				if(!isOutOfStockEmailable && !isBuyOrReservable) {
					continue;
				}

				identifier = $(cell).attr("id").split("product_")[1];
				URL = $("#href_"+identifier).attr("href");
				
				

				if(isOutOfStockEmailable) {
					$(cell).append(
						(function getHTML(){
							var h = '';
							h +=	'<div class="emailMe">';
							h +=		'<a class="emailMe" href="/webapp/wcs/stores/servlet/ISALTMOutOfStockEmail?';
							h += (function(){
								var h = '';
								h += "partNumber=" + getPartNumber(URL) || "";
								h += "&storeId=" + getStoreId() || "";
								h += "&langId=" + getLangId() || "";
								h += "&viewTaskName=ISALTMAjaxResponseView";
								return h;
							}());
							h +=		'">Email me when back in stock</a>';
							h +=	'</div>';
							
							return h;
						}())
					)
					$("#trolleylist table.trolleylister td.homedelinfo div.emailMe a.emailMe").bind("click", listerEmailMe_onClick);
					$("#trolleylist table.trolleylister td.homedelinfo div.emailMe a.emailMe").bind("click", LightBoxStockCheckerTracking.trackBasketPopup);
				}
			}
		}());

	    
	    function getPostCodeFromCookie() {
		    var val = argos.page.getCookie("PostCodeSessionCookie");
	    	//val = unescape( val );
	    	if( val == null )
	    		val = "";
	    	else if(typeof val === "undefined")
				val = "";
			
			// CR528 Trolley Redesign - phase 2			
			// The first postCode is the one entered previously for stock availability checking.
			// The second postCode is the one from the signed in user's account.
			var postCodes = val.split( "%2C" );
			var postCode = postCodes[0];
			if( postCode == null || postCode == "" )
				postCode = postCodes[1];
	    	return postCode;
	    }
	    
	    function getTownNameFromCookie() {
		    var val = argos.page.getCookie("PostCodeSessionCookie");
	    	//val = unescape( val );
	    	if( val == null )
	    		val = "";
	    	else if(typeof val === "undefined")
				val = "";
			
			var postCodes = val.split( "%2C" );
			var townName = "";
			if(postCodes.length == 3)
				townName = postCodes[2];
			
	    	return townName;
	    }
	    
	    function getPartNumber(productUrl){
 
			if(productUrl.indexOf("/static/")>-1){
				var partNumIndex = productUrl.indexOf("/partNumber/");
				if(partNumIndex>-1){ 
					var partNumOffset = (partNumIndex+"/partNumber/".length);
					// /partNumber/2553500/Trail...
					var partNumValueEndIdx = productUrl.indexOf("/", partNumOffset );
					if( partNumValueEndIdx == -1 )
						// /partNumber/2553500.htm
						partNumValueEndIdx = productUrl.indexOf(".", partNumOffset );
					// Defensive check!
					if( partNumValueEndIdx == -1 )
						partNumValueEndIdx = partNumOffset;
					var partNum = productUrl.substring(partNumOffset, partNumValueEndIdx );
					return partNum;
				}else{
					return "";
				}
			}else{
				return getQueryString("partNumber", productUrl);
			}
	    }
	    
	    function getStoreId(){
	    	//return $("input[name=storeId]").val();
	    	return argos.app.storeId;
	    }
	    
	    function getLangId(){
	    	//return $("input[name=langId]").val();	
	    	return argos.app.langId;
	    }
	    
		function checkStockActivator_onClick() {
			var data = this.href.split("?")[1];
			data += "&viewTaskName=ISALTMAjaxResponseView";
			checkStock(data);
			return false;
		}
		
		function listerEmailMe_onClick() {
			LightBox.showOverlay();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			
			LightBox.extended.request({
				url: this.href,
				dataType: "json",
				type: "get",
				success: displayEmailMe,
				error: showRequestError
			});
			return false;
		}		
	    
		function checkStock_onClick() {		
			var postCode = $("input#qasSearchTerm").val();
			if( postCode == postCodeFieldDefaultMessage ) {
				$("input#qasSearchTerm").val( "" );
			}

			var data = $("form#pdpForm").serialize();
			data += "&viewTaskName=ISALTMAjaxResponseView";
			backToInitialResultsData = data;
			checkStock(data);

			if( postCode == postCodeFieldDefaultMessage ) {
				$("input#qasSearchTerm").val( postCode );
			}
			return false;
		}	    

		function deliveryDetails_onClick() {                                      
			var data = $("form#pdpForm").serialize();

			data += "&viewTaskName=ISALTMAjaxResponseView";
			data += "&displayDeliveryDetails=true";
			checkStock(data);

			return false;
		}
		
		// start: PDP delivery information link.
		if($("#deliveryInformation .information").length > 0) {
			$("#deliveryInformation .home, #deliveryInformation .information, #deliveryInformation .store")
				.addClass("lbActivator")
				.removeClass("jsOnly")
				.find("a, img, .text").bind("click", deliveryDetails_onClick);
				
			// compensation for lack of :hover support in IE6
			if(jQuery.browser.msie && Math.floor(jQuery.browser.version) <= 6) {
				$("#deliveryInformation li .img, #deliveryInformation li .text").bind("mouseover mouseout", function() { 
					$(this).toggleClass("link_hover")
				});
			}	    
		}
		// end: PDP delivery information link.


	    function stockAvailability_onSubmit() {
	    	var searchVal = $("input#postCodeLightBox").val();
			if( searchVal == postCodeFieldDefaultMessage || searchVal == postCodeFieldDefaultMessage2 ) {
				$("input#postCodeLightBox").val( "" );
			}
	    	var data = $(this).serialize();
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	//setup persistent data value so that we can use back butons to return
			backToInitialResultsData = data;

	    	checkStock(data);
	    	return false;
	    }
	    
		function backToInitialResults(){
			if(backToInitialResultsData != null || backToInitialResultsData != "undefined"){
				
				checkStock(backToInitialResultsData);
				return false;
			}
		}
	    
	    function buyOrReserve_onSubmit() {
	    	var data = $(this).serialize();
	    	data = data + "&fromListerPage=true";
	    	LightBox.showOverlay();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
	    	LightboxAddToTrolley.addToTrolley(data);
	    	return false;	    
	    }
	    	    
	    function checkOtherStores_onClick() {
	    	var data = this.href.split("?")[1];
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	checkStock(data);
	    	return false;	    
	    }
	    
	    function show10ClosestStores_onClick() {
	    	var data = $(this).parent().find("span a").attr("href").split("?")[1];
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	checkStock(data);
	    	return false;	    
	    }
	    
	    function showOtherNearbyStoresWithStock_onClick() {
	    	var data = $(this).parent().find("span a").attr("href").split("?")[1];
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	checkStock(data);
	    	return false;	    
	    }
	    
	    function backToStockCheck_onClick() {
	    	var data = this.href.split("?")[1];
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	checkStock(data);
	    	return false;
	   	}
	    
	    this.checkStock = checkStock;
	    function checkStock(data) {
	    	if(typeof data === "undefined") data = "";
			LightBox.showOverlay();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			LightBox.extended.request({
				url: "/webapp/wcs/stores/servlet/ISALTMStockAvailability",
				dataType: "json",
				type: "post",
				success: displayStockCheckLightBox,
				data: data,
				error: showRequestError
			});
		
	    }
	    
	    function dontAdd_onClick() {
	    	var linkID = this.id.split("_")[1];
	    	var hiddenPartNumber = document.getElementById("partNumber_"+linkID);
	    	var hiddenCatEntryId = document.getElementById("ISALTMcatEntryId_"+linkID);
	    	var tableRow = $(this).parents("tr")[0];
	    	
	    	if(hiddenPartNumber !== null) {
	    		$(hiddenPartNumber).remove();
	    	}
	    	if(hiddenCatEntryId !== null) {
	    		$(hiddenCatEntryId).remove();
	    	}	    	
			if(typeof tableRow !== "undefined") {
				$(tableRow).fadeOut(400, function() {
					$(this).remove();
				});
			}
			
			var partNumber = hiddenPartNumber.value;
			removeCheckedProduct(partNumber);
			return false;
	    }
	    
	    function removeCheckedProduct(partNumber) {
			// super defensive due to interfacing with other script
			try {
				var products = argos.product.details.add.productList.products;
				// loop through each product
				for (var props in products) {
					var product = products[props];
					var productCode = product.code.replace(/\//g,"");
					if(productCode === partNumber) {
						argos.product.details.add.removeEvent(product.key);
						break;
					}
				}
			} 
			catch(e){
				alert("catch");
			}
	    }
	    
	    
	    function emailMe_onClick() {
	    	LightBox.hideLightBox();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			LightBox.extended.request({
				url: this.href+"&viewTaskName=ISALTMAjaxResponseView",
				dataType: "json",
				type: "get",
				success: displayEmailMe,
				error: showRequestError
			});			
	    	return false;
	    }
	    
	    function selectPreferredStore_onClick() {
	    	LightBox.showOverlay();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			LightBox.extended.request({
				url: this.href+"&viewTaskName=ISALTMAjaxResponseView",
				dataType: "json",
				type: "get",
				success: LightBoxStoresAZ.init,
				error: showRequestError
			});
	    	return false;
	    }
	    
	    function emailMeWhenBackInStock_onClick() {
	    
	    	var data = $("#pdpForm").serialize();
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	LightBox.showOverlay();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			LightBox.extended.request({
				url: "/webapp/wcs/stores/servlet/ISALTMOutOfStockEmail",
				dataType: "json",
				type: "get",
				data: data,
				success: displayEmailMe,
				error: showRequestError
			});			
	    	return false;
	    }	    
	    
	    this.displayStockCheckLightBox = displayStockCheckLightBox;
		function displayStockCheckLightBox(json) {
		
			var dialogue = $("#lightBox")[0];
			var overlay = $("#overlay")[0]
			
			LightBox.hideLightBox();
			LightBox.setHTML(json.html);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);
			compTableTopMarginAdjust();
			prepareCheckStockLightBox();		
			LightBoxStockCheckerTracking.track(json.page, json.state);
			LightBoxStockCheckerTracking.cr749Tagging(json);
	    	LightBoxStockCheckerTracking.init();

	    	postCodeLightBoxInit();
			
			// Added for LightBoxStockChecker - new Wiwi design
			postCodeLightBoxStyleController();
			// Added for PDP Delivery Information only.
			pdpDeliveryInformationStyleController();
			
			lightboxTooltipsSetup();
			lightboxViewMapSetup();
			lightBoxResizeOnFailure();
		}	

		function lightBoxResizeOnFailure(){
			
			var hasFailureMessage = $("#lightBoxStockAvailability").find("p.resizeLightboxFailureMessage")[0];
			var hasFailureMessageHeading = $("#lightBoxStockAvailability").find("h3.resizeFurtherIfError")[0];
			
			if (hasFailureMessage) {
				$("#lightBoxStockAvailability").attr("class","");
				if(hasFailureMessageHeading) {
					$("#lightBoxStockAvailability").addClass("singleViewOneStoreOneResult");
				} else  {
					$("#lightBoxStockAvailability").addClass("multipleViewOneStoreOneResult");
				}
			}
			LightBox.showLightBox();		
		
		}
		
		function lightboxTooltipsSetup(){
		
			var tooltipmessage = argos.tooltipmessage;
	//		var hovertooltips = argos.tooltipmessage.hovertooltips;
		
			$("#lightBoxStockAvailability").find(".storeInformation .icon a").bind("click", function(){
				return false;
			});
		
			var items = $("#lightBoxStockAvailability").find(".storeInformation .icon");
			var tooltipContent,tooltipObj;
			if(items.length>0){
			
				// remove any previously setup storeinfo toolitps when lightbox is generated
				$("#" + argos.tooltipmessage.TOOLTIPS_CONTAINER + " .storeInformationBubbleTooltip").remove();
				
				for(var i = 0; i<items.length; i++) {
			
					tooltipRel = 	$(items[i]).attr("rel");
										
					hovertooltips[tooltipRel] = {
						TOOLTIP_ID: tooltipRel,
						TOOLTIP_CLASS: 'storeInformationBubbleTooltip',
						MOVE_EXISTING_CONTAINER: true, // will move the container that matched TOOLTIP_ID
						BASE_POSITION : "above",
						SHIFT_VERTICAL : -8,
						SHIFT_LEFT : -8,
						SHIFT_RIGHT : 0,
						TOOLTIP_HTML : null
					};
				}
				argos.tooltipmessage.hovertooltipdisplay.init();
			}
		}
		
		function lightboxViewMapSetup(){

			var nearestStoresList = document.getElementById("lightBoxStockAvailability");
			$(".storeInformationBubbleTooltip p.viewMap a").bind("click", viewMap_onClick);
	
			function viewMap_onClick() {
				var URL = this.href;
				if(!isSecurePage()){
					URL = URL.replace("https://", "http://");
				}
				
				hideNearestStoresList();
				sendRequest(URL);
				return false;		
			}
			
			// sets to http if not encrypted page
			function isSecurePage() {
			   return window.location.protocol == 'https:';
			}
		
			function addEvents() {
				$("#storeInformationMapOverlay div.zoomControls a").bind("click", zoomControl_onClick);
				$("#storeInformationMapOverlay a.closeLightBox").unbind("click");
				$("#storeInformationMapOverlay a.closeLightBox").bind("click", function(){
					
				});
				// remove click envent on overlay when viewing map
				$("#overlay").unbind("click");
				//printing
				$("#outerwrap").addClass("doNotPrint");	
				$("#storeInformationMapOverlay p.printMap a").bind("click",function(){
					window.print();
					return false;
				});
				$("#storeInformationMapOverlay a.closeLightBox").bind("click", function(){
					showNearestStoresList();
					return false;
				});
			}	
		
			function zoomControl_onClick() {
				var URL = this.href;
				updateOverlay(URL);
				return false;
			}



			function hideNearestStoresList() {
				$("#lightBoxStockAvailability").hide();
				$("body").append(nearestStoresList);
			}
			
			function showNearestStoresList() {
				$("#storeInformationMapOverlay").remove();
				$("#outerwrap").removeClass("doNotPrint");	
				$("#lightBox").append(nearestStoresList);
				$("#lightBoxStockAvailability").show();		
				$("#overlay").bind("click", function(){
					LightBox.hideLightBox();
					LightBox.hideOverlay();
				});		
			}
		
			function sendRequest(URL) {
				LightBox.setHTML(LightBox.loadingHTML);
				LightBox.showOverlay();
				LightBox.setOverlayTooltip("To close the store details box click on the 'Close X' link"); 
				LightBox.showLightBox();
				$.ajax({
					url: URL,
					dataType: "html",
					complete: function(XMLHttpRequest, textStatus){
					},
					success: function(data, textStatus){
						LightBox.hideLightBox();
						LightBox.setHTML("");
						LightBox.setHTML(data);
						LightBox.showLightBox();
						addEvents();
					},
					error: ajaxError
				});
			}
		
			// when clicking the zoom
			function updateOverlay(URL) {
				$.ajax({
					url: URL,
					dataType: "html",
					success: function(data, textStatus){
						LightBox.setHTML(data);
						addEvents();
					},
					error: ajaxError
				});
			};
		
			function ajaxError() {
				alert("Error occured");
			}
		}
		
	
		function pdpDeliveryInformationStyleController() {			
			var postCode = $("#lightBoxStockAvailability.deliveryInformation #postCodeLightBox");
			var cls = "defaultText";
			var stateAdjustment;

			if(postCode.length > 0) {
				stateAdjustment = function(event) {
					var action = (event && event.data && event.data.action) ? event.data.action : "";

					if(postCode.val() == postCodeFieldDefaultMessage) {
						postCode.addClass(cls);
					}

					if(action == "blur" && postCode.val() == "") { 
						postCode.val(postCodeFieldDefaultMessage);
						postCode.addClass(cls);
					}

					if(action == "focus") {
						postCode.removeClass(cls);	
					}
				}

				postCode.bind("focus", {action:"focus"}, stateAdjustment);
				postCode.bind("blur", {action:"blur"}, stateAdjustment);

				// Initialise state.
				stateAdjustment();
			}
		}
		
		function postCodeLightBoxStyleController() {			
			var postCodeLightbox = $("#lightBoxStockAvailability #wiwi #postCodeLightBox");
			var cls = "defaultText";
			var stateAdjustment;

			if(postCodeLightbox.length > 0) {
				stateAdjustment = function(event) {
					var action = (event && event.data && event.data.action) ? event.data.action : "";

					if(postCodeLightbox.val() == postCodeFieldDefaultMessage) {
						postCodeLightbox.addClass(cls);
					}

					if(action == "blur" && postCodeLightbox.val() == "") { 
						postCodeLightbox.val(postCodeFieldDefaultMessage);
						postCodeLightbox.addClass(cls);
					}

					if(action == "focus") {
						postCodeLightbox.removeClass(cls);	
					}
				}

				postCodeLightbox.bind("focus", {action:"focus"}, stateAdjustment);
				postCodeLightbox.bind("blur", {action:"blur"}, stateAdjustment);

				// Initialise state.
				stateAdjustment();
			}
		}
		
		function postCodeLightBoxInit() {
			var el = $("#postCodeLightBox");
			var value = el.attr("value");
			var defaultText = "";

			switch(value) {
				case postCodeFieldDefaultMessage2 : defaultText = postCodeFieldDefaultMessage2;
					break;
				case postCodeFieldDefaultMessage3 : defaultText = postCodeFieldDefaultMessage3;
					break;
				default: defaultText = postCodeFieldDefaultMessage;
			}

			// Apply only to an empty input (postcode) field
			if(value == "" || value == null || value == undefined || value == defaultText) {
			
				// set default message if no postcode or empty
				el.attr("value", defaultText);
			
				// remove any default text when uses focuses (includes keyboard, not just mouse)
				el.focus(function(e) {
					if($(this).attr("value") == defaultText) {
						$(this).attr("value","");
					}
				});
				
				// reset to default text if nothing entered.
				el.blur(function(e) {
					var value = $(this).attr("value");
					if(value == '' || value == null || value == undefined) {
						$(this).attr("value", defaultText);
					}

				});
				
				// sometimes focus is in place before above event added. This is workaround by using click.
				el.click(function(){ 
					$(this).focus(); 
				});
			}
		}
	    
	    function prepareCheckStockLightBox() {
	    	$("form#stockAvailabilityForm").bind("submit", stockAvailability_onSubmit);
	    	$("form#stockAvailabilityForm2").bind("submit", stockAvailability_onSubmit);
	    	$("a.checkOtherStores").bind("click", checkOtherStores_onClick);
	    	$("a#oosAtTenNearestStoresLink").bind("click", show10ClosestStores_onClick);
	    	$("a#showOtherNearbyStoresWithStock").bind("click", showOtherNearbyStoresWithStock_onClick);
		//takes user back to initial stock check
		$("div#lightBoxStockAvailability a.backToStockInitialCheck").bind("click", backToInitialResults);	
	    	$("div#lightBoxStockAvailability a.backToStockCheck").bind("click", backToStockCheck_onClick);
	    	$("div#lightBoxStockAvailability a.dontAdd").bind("click", dontAdd_onClick);
	    	$("div#lightBoxStockAvailability a.emailOutOfStock").bind("click", emailMe_onClick);
	    	$("div#lightBoxStockAvailability p.storeAZ a").bind("click", selectPreferredStore_onClick);
	    	   	
	    	$("form#buyOrReserveForm").bind("submit", buyOrReserve_onSubmit);
			$("form#stockAvailabilityForm.otherStoresAvailable").unbind("submit");
	    	$("form#stockAvailabilityForm.otherStoresAvailable").bind("submit", buyOrReserve_onSubmit);
	    		    	
	    	if($("input#prop3").length)
	    	{
	    		LightBoxStockCheckerTracking.trackSearchSubmit($("input#prop3").val());
	    	}
	    	
	    	$("#checkByPostcode.checkOtherArea input#postCodeLightBox")
	    		.bind("click",postCodeLightBox_onClick)
	    		.bind("blur",postCodeLightBox_onBlur);
	    	
	    	$("#checkTownWiwi input#postCodeLightBox")
	    		.bind("click",postCodeLightBox_onClick)
	    		.bind("blur",postCodeLightBox_onBlur);
	    	
	    	$("#wiwiCheckOtherArea input#postCodeLightBox")
	    		.bind("click",postCodeLightBox_onClick)
	    		.bind("blur",postCodeLightBox_onBlur);
	    	
	    	new ArgosDisableCheckboxes($("form#stockAvailabilityForm input.checkbox"), 2);
	    }	
	    
	    function addProductStockResult_onClick() {
				LightBoxAddToTrolley.addToTrolley(data); // existing code passed in Array so, still doing that. 
	    		return false;
	    }
	    
		function postCodeLightBox_onBlur() {
			// In case we want to replace the value on no change (see onClick below)
			var t = $(this);
			if(!t.attr("value") && t.attr("tempValue")) {
				t.attr("value",t.attr("tempValue"));
				t.attr("tempValue","");
				t.addClass('defaultText');
			}
		}

		function postCodeLightBox_onClick() {
			var t = $(this);
			t.attr("tempValue", t.attr("value"));
			t.attr("value","");
			t.removeClass('defaultText');
		}
	    
	    function displayEmailMe(json) {
	    	
			LightBox.hideLightBox();
			LightBox.setHTML(json.html);
			LightBox.showLightBox();
	    	
			//reposition if required - false = not resizing window
	
			compTablePositioning(false);
			compTableTopMarginAdjust();
			prepareEmailForm(json);  
	
			// Note: although FF works correctly on focus(), IE needs
			// the select() to put cursor where focus() should.
	    	$("#lightBoxEmailMe input[type='text']").eq(0).focus().select();
	    }

	    function prepareEmailForm(json) {
	    	
	    	$("form#outOfStockEmailForm").bind("submit", outOfStockEmailForm_onSubmit);
	    	
	   	 	LightBoxStockCheckerTracking.track(json.page, json.state);
	   	 
	   	 	LightBoxStockCheckerTracking.init();
	    }
	    
	    function outOfStockEmailForm_onSubmit() {
	    	var data = $(this).serialize();
	    	data += "&viewTaskName=ISALTMAjaxResponseView";
	    	LightBox.hideLightBox();
			LightBox.setHTML(LightBox.loadingHTML);
			LightBox.showLightBox();
			//reposition if required - false = not resizing window
			compTablePositioning(false);	    	
			LightBox.extended.request({
				url: "/webapp/wcs/stores/servlet/ISALTMOutOfStockEmail",
				dataType: "json",
				type: "post",
				success: displayEmailMe,
				data: data,
				error: showRequestError
			});
	    	return false;
	    }
	  
		//
		this.compTablePositioning = compTablePositioning;
	    function compTablePositioning(resized) {
	    	    	
    		if (isComparisonPage) {
    		  	//calculate diff between window and default outerwrap width and initial X positions
				var viewDiff = ($(window).width() - 896);
				var lightBoxX = argos.product.comparison.result.getPageX(document.getElementById("lightBox"));
				var overlayX = argos.product.comparison.result.getPageX(document.getElementById("outerwrap"));
				if (IE7) {
					if (!resized) {		
						if (viewDiff > 0) {
							lightBoxX = (lightBoxX - viewDiff/2);
							$(dialogue).css({left: lightBoxX + "px"});
						} 

					}	
				} else if (!FF) {	
					viewDiff = ($(window).width() - $("#outerwrap").width());
					if (viewDiff > 0) {
						overlayX -= (viewDiff/2);
						lightBoxX -= (viewDiff/2);
					} else {
						overlayX += (viewDiff/2);
					}				
					if (IE6) {					
						if (viewDiff > 0) {
							$(overlay).css({left: overlayX + "px"});
						} else {
							$(overlay).css({width: $(document).width() + "px"});
						} 
					}
					if (!resized) {
						$(dialogue).css({left: lightBoxX + "px"});
					} 
				}
			}
		}		
		
		this.compTableTopMarginAdjust = compTableTopMarginAdjust;
	    function compTableTopMarginAdjust() {
	    	if (isComparisonPage) {
	    		//spawn Y position
				var lightBoxY = argos.product.comparison.result.getPageY(document.getElementById("lightBox"));
				//browser adjustments
				if(!FF3) {
					lightBoxY -= 30; 
					if(IE7) { 
						lightBoxY += 8; 
					}
					if(IE6) {
						lightBoxY +=12; 
					}
					if(FF) {
						lightBoxY +=25; 
					}
				} else {
					lightBoxY -= 6; 
				}				
				argos.product.comparison.result.setPageY(dialogue,lightBoxY);
			}
		}
	    
	    /*
	     * Shows an AJAX request error in a lightbox
	     * @param XMLHttpRequest as object
	     * @param textStatus as string
	     * @param errorThrown as string
	     * @return void
	     */
	    this.showRequestError = showRequestError;
	    function showRequestError(XMLHttpRequest, textStatus, errorThrown) {
	    	var html = '';
	    	html += '<div id="lightBoxError">';
	    	html +=		'<div class="heading"><h2>An error occured</h2><a href="#" class="closeLightBox">Close</a></div>'
	    	html +=		'<div class="details">';
	    	html +=			'<p>Request: '+XMLHttpRequest+'</p>';
	    	html +=			'<p>Status: '+textStatus+'</p>';
	    	html +=			'<p>Error: '+errorThrown+'</p>';
	    	html +=		'</div>';
	    	html += '</div>';
	    	LightBox.hideLightBox();
	    	LightBox.setHTML(html);
	    	LightBox.showLightBox();
	    	//reposition if required - false = not resizing window
			compTablePositioning(false);
			compTableTopMarginAdjust();
	    }
	    
		function getQueryString(key, str) {
			var queryString = null;
			if (key == null || key === "") return null;
			if (queryString == null) {
				queryString = {};
				var qs = (function(){
					var qs = str.split("?");
					if(qs.length > 0) {
						qs = qs[1];
					}
					else {
						qs = str;
					}
					qs = qs.split("&");
					return qs;
				}()) 
				var qsElements;
				for (var i = 0, j = qs.length; i<j; i++) {
					qsElements = qs[i].split("=");
					if (queryString[qsElements[0]]) {
						if (queryString[qsElements[0]] instanceof Array) {
							queryString[qsElements[0]].push(qsElements[1] || "")
						} else {
							queryString[qsElements[0]] = [queryString[qsElements[0]], qsElements[1]];
						}
					} else {
						queryString[qsElements[0]] = qsElements[1] || "";
					}
				}
			}
			return queryString[key];
		};	    

	}); 
});

var LightBoxStoresAZ = new (function(){
	var container = null;
	this.init = init;
	function init(json) {
		LightBox.hideLightBox();
		LightBox.setHTML(json.html);
		LightBox.showLightBox();
		//reposition if required - false = not resizing window
		LightBoxStockChecker.compTablePositioning(false);
		LightBoxStockChecker.compTableTopMarginAdjust();
		container = document.getElementById("lightBoxStoresAZ");
		if(container === null) return;		
		$(container).find("a.backToStockCheck").bind("click", backToStockCheck_onClick);
	    $(container).find("div.letters a").bind("click", letter_onClick);
	    $(container).find("div.results a").bind("click", store_onClick);
	    LightBoxStockCheckerTracking.track(json.page, json.state);
	    LightBoxStockCheckerTracking.init();
	}
	
	function backToStockCheck_onClick() {
		var data = this.href.split("?")[1];
		data += "&viewTaskName=ISALTMAjaxResponseView";
	    LightBoxStockChecker.checkStock(data);
	    return false;
	}
	
	this.letter_onClick = letter_onClick;
	function letter_onClick() {
    	LightBox.showOverlay();
		LightBox.setHTML(LightBox.loadingHTML);
		LightBox.showLightBox();
		//reposition if required - false = not resizing window
		LightBoxStockChecker.compTablePositioning(false);
		LightBox.extended.request({
			url: this.href+"&viewTaskName=ISALTMAjaxResponseView",
			dataType: "json",
			type: "get",
			success: LightBoxStoresAZ.init,
			error: LightBoxStockChecker.showRequestError
		});			
    	return false;
	}
	
	this.store_onClick = store_onClick;
	function store_onClick() {
		LightBox.showOverlay();
		LightBox.setHTML(LightBox.loadingHTML);
		LightBox.showLightBox();
		//reposition if required - false = not resizing window
		LightBoxStockChecker.compTablePositioning(false);
		LightBox.extended.request({
			url: this.href+"&viewTaskName=ISALTMAjaxResponseView",
			dataType: "json",
			type: "get",
			success: LightBoxStockChecker.displayStockCheckLightBox,
			error: LightBoxStockChecker.showRequestError
		});			
    	return false;
	}
});

/************************************************************************************
* OMNITURE TAGS
*************************************************************************************/
var LightBoxStockCheckerTracking = new (function(){
	var event = "";	
	var elementClicked = null;
	var pageG = "";
	
	var state = {previous: "",current: ""};
	
	this.track = track;
	function track(page, nextState) {
		pageG = page;
		state.previous = (state.current === "") ? nextState : state.current;
		state.current = nextState;
		if(elementClicked === null || event === "") return;
		var codeState = page+":stock:"+state.previous+":"+event;
		try {
			trackBasketPopupChoice(ArgosUtils.getTrackingObj(elementClicked), codeState);
		} catch(e) {
			alert("Error in LightBoxStockChecker.js track function");
		}
		event = "";
		elementClicked = null;
	}
	
	this.cr749Tagging = cr749Tagging;
	
	/**
	
	 */
	 
	 
	 	$("body.reservationflow #alternativeProducts a.quickinfo").attr("onclick","$(function(){s.prop4='ar:trolley:alternative:quickinfo:';s.prop29='ar:tr:alternative:';});");
	 
	// $("body.reservationflow #alternativeProducts a.quickinfo").click(function(){
	 	
	 //s.prop4="ar:trolley:alternative:quickinfo";
	 //	s.prop29="ar:tr:alternative:";
	// });
	
	 
	 
	


function cr749Tagging(json) {
	s.eVar27 = "RegularReservation";
	
 if ($('td.storePickup div').hasClass('improvedStockOOSAtNearest2Stores')){
 	
 	 if($('td.storePickup div').hasClass('inStockDetails')){
 	 	s.eVar27 = "Improved Inventory";
 	 }
 	 else{
 	 	s.eVar27 = "Stockcheck:outofstock";
 	 }
 }
 	
		if(!json )return;			
		var eVar52 = json.eVar52Value;
		var eVar9 = json.eVar9Value;
		var origeVar52 = s.eVar52;
		var origeVar9 = s.eVar9;
		
		s.linkTrackVars = "";
		if(eVar52 !=''){
			s.eVar52 =eVar52;
			s.linkTrackVars = s.linkTrackVars +"eVar52,";
		}
		if(eVar9 !=''){
			s.eVar9 = eVar9;
			s.linkTrackVars = s.linkTrackVars +"eVar9,";
		}
		
		if(s.linkTrackVars !=''){			
			s.tl($("div#lightBoxStockAvailability")[0],'o','ImprovedInventory Lightbox');
			s.eVar52 = origeVar52; 
			s.eVar9  = origeVar9 ;
		}
		
	}
	
	this.init = init;
	function init() {
		/**
		 * Called immediately
		 */
		$("div#lightBoxStockAvailability, div#lightBoxEmailMe").filter(":not(.deliveryInformation)").find(".closeTag").bind("click", function(){
			$(window).unbind("resize");
			event = "close";
			elementClicked = this;
			track(pageG, state.current);
		});
  	
		$("div#lightBoxStockAvailability input.buyOrReserve").bind("click", function(){
			event = "buyorreserve";
			elementClicked = this;
			track(pageG, state.current);
		});		
		
		$("div#lightBoxStockAvailability .backTo").bind("click", function(){
			event = "backtolist";
			elementClicked = this;
			track(pageG, state.current);
		});	
				
		/**
		 * Called with response
		 */
		var checkboxes = $("#stockAvailabilityForm input.checkbox");
		
    	$("form#stockAvailabilityForm").bind("submit", function(){
    		event = "checkstock";
    		elementClicked = this;
    		if(state.current === "storelist") {
    			if(checkboxes.length > 0) {
	    			var count = 0;
	    			for(var i = 0; i< checkboxes.length; i++) {
	    				if(checkboxes[i].checked) {
	    					count++
	    				}
	    			}
	    			if(count === 0) {
	    				event = "nostoreerror";
	    			}
	    		}
    		}
    	});

		$("div#lightBoxStockAvailability a.emailOutOfStock").bind("click",function(){
			event = "emailstock";
			elementClicked = this;
		});		
    	$("div#lightBoxStockAvailability a.checkOtherStores").bind("click",function(){
			event = "checkotherstores";
			elementClicked = this;
		});
		$("div#lightBoxEmailMe #emailMeSubmit").bind("click",function(){
			event = "go";
			elementClicked = this;
		});
		
		$(window).bind("resize", function(){
			//reposition if required - true =  resizing window
			LightBoxStockChecker.compTablePositioning(true);
		});
	}
	
	this.trackAddToBasketPopup = trackAddToBasketPopup;
	function trackAddToBasketPopup() {
		var s=s_gi(s_account);
		try{
			s.tl(this,'o','Add to basket pop-up');
			}
		catch(err){
		
		}
	}

	function trackBasketPopupChoice(obj, tag) {
		var s=s_gi(s_account);                
		s.linkTrackVars="events,products,eVar29";
		s.linkTrackEvents="event3";
		s.events="event3";
		s.eVar29=tag;
		s.tl(obj,'o','Add to basket pop-up:yes selected');	
	}
	this.trackBasketPopup = trackBasketPopup;
	function trackBasketPopup() {
		var s=s_gi(s_account);
		s.tl(this,'o','Trolleylist:Emailwheninstock');
	}
	
	this.trackSearchSubmit = trackSearchSubmit;
	function trackSearchSubmit(prop3) {
		var s = s_gi(s_account);
		s.linkTrackVars = "prop3";
		s.prop3 = prop3;
		s.tl(this,'o','Add to basket pop-up');
	}
	
	function validatePostcode(field) {
		// This function checks the postcode has been entered. It also checks the size
		// and the format of the postcode.
		var postcodeStr = trimSpaces(field);
		if(postcodeStr=="") {
		 	return false;
		} 
		else if(!isAlphaAndNumeric(postcodeStr) && postcodeStr!="") {
	 		return false;
		}
		else if(postcodeStr.length < 5 || postcodeStr.length > 7) {
			return false;
		}
		else if(hasCIKMOV(postcodeStr.substring(postcodeStr.length, postcodeStr.length-2).toLowerCase(),"c","i","k","m","o","v")) {
			return false;
		}
		else if(!isValidPartialPostcode(postcodeStr)) {
			return false;
	 	}
		//Check for 1st char numeric and last three numeric,alpha,alpha
		else if(!isAlpha(postcodeStr.charAt(0)) || !isAlpha(postcodeStr.charAt(postcodeStr.length-1)) || 
						!isAlpha(postcodeStr.charAt(postcodeStr.length-2)) || !isNumeric(postcodeStr.charAt(postcodeStr.length-3))) {
			return false;
		}
		return true;
	}
	
	function hasCIKMOV(refStr) {
		var seqError = false;
		for (var i=0; i<refStr.length; i++) {
			if (arrayContainsElement(hasCIKMOV.arguments,hasCIKMOV.arguments[0].charAt(i))) seqError = true;
		}
		return seqError;
	}
	
	function isValidPartialPostcode(postcodeStr) {
		var outwardPass = false;
	
		//Check for partial postcode 
		//AN
		if((postcodeStr.length == 2 || postcodeStr.length == 5) && (isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)))) outwardPass=true;
		//ANN & AAN & ANA
		if((postcodeStr.length == 3 || postcodeStr.length == 6) && (isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) || isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) || isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)) && isAlpha(postcodeStr.charAt(2)))) outwardPass=true;
		//AANN & AANA
		if((postcodeStr.length == 4 || postcodeStr.length == 7) && (isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) && isNumeric(postcodeStr.charAt(3)) || isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) && isAlpha(postcodeStr.charAt(3)))) outwardPass=true;
		return outwardPass;
	}
});

