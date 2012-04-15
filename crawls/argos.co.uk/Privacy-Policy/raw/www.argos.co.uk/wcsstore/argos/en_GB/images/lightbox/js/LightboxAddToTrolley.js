var LightboxAddToTrolley = new (function(){

	var module = this;

	// PUBLIC

	module.cssClass = ""; // Value added as className to the final view holder.

	module.init = function() {	
		$(".btnbuyreserve, .addtogiftlist, .addtocart").bind("click", _addProduct);
		$(".promotion [name='addSpecialOffer']").bind("click", module.addPromotion);
		$(".addtocartExtendedBundle").bind("click", _addPromotionB);
	}

	module.addToTrolley = function(data, func, msg){
		var msg = (arguments.length > 2) ? msg : null;
		LightBox.extended.loading("Add to Trolley");
		LightBox.extended.request({
			url: window.location.protocol +"//" + window.location.host + "/webapp/wcs/stores/servlet/AddToTrolleyAjax",
			dataType: "json",
			type: "post",
			data: data,
			success: _success,
			errorMessage: msg,
			complete: (arguments.length > 1) ? func : null
		});
		// Need to work out how to pass this through - remove when done!
		module.cssClass = "addToTrolley addToTrolley_product";
	}

	module.addPromotion = function() {
		// Form submit of promotion.
		var form = $(this).parents("form");
		if(form.length > 0) {
			module.addToTrolley(
				form.serialize(), 
				function() { 
				var lb = $("#lightBox");
				var position;
				if(lb.find(".product").length > 5) {
					lb.css("width", "680px");
					position = LightBox.coordinates();
					lb.css({
						"left": position.left,
						"top": position.top 
					});
				} 
				else {
					lb.find(".products").addClass("noWrap");
				}
				},
				"An error has prevented selected product information from being displayed here.<br /><br />Please <a href=\"#\" class=\"closeLightBox\">close this area</a> if you want to continue shopping and try again. You can also <a href=\"" + $("#trolleylink").attr("href") + "\">visit your trolley</a> to check added items."
			);
		}
		module.cssClass = "addToTrolley addToTrolley_promotion";
		// QC - 17633 - called here to add scAdd event when adding bundled special offer to trolley only
		_tagAddEvent();
		return false;
	}


	// PRIVATE

	function _addProduct(){
		var product = $(this).parents(".product");
		var partnumber="";
		
		var data = "storeId=" + argos.page.storeId + "&langId=" + argos.page.langId;
		
		//what page are we adding from
		var addFromPDP = $("#pdpProduct");
		var addFromLister = $("#listerRHS");
		var addFromAlternativeProduct = $("#alternativeProducts");
		
		if(product.length > 0) {
			partnumber = product.find(".number").text();
			
			if (addFromLister) {
				partnumber = product.find(".partnum").text();	
			}
		} else {
			partnumber = $("#pdpProduct .partnumber").text();
		}
		
		if($("#alternativeProducts").length > 0) {
			 partnumber = $("#alternativeProducts .alt_body .partnum").text();
		} 
		
		partnumber = partnumber.replace(/[/ \n\r\t]*/mig,"");
		if(partnumber) {
			module.addToTrolley(data + "&partNumber=" + partnumber); // existing code passed in Array so, still doing that. 
		}
		
		return false;
	}
	
	function _addPromotionB(){
		var promotionRow = $(this).parents(".promotion");
		var mainPartnumber = $("#pdpProduct .partnumber").text().replace(/[/ \n\r\t]*/mig,"");
		var data = "storeId=" + argos.page.storeId + "&langId=" + argos.page.langId;
		var partNumbers = $(promotionRow).find(".number .partnum");
		var partNumbersArray = jQuery.makeArray(partNumbers);
		if (partNumbersArray.length > 0 ) {
			for(var i=partNumbersArray.length-1; i>=0;i--) {
				partNumbersArray[i] = $(partNumbersArray[i]).text().replace(/[/ \n\r\t]*/mig,"");
			}	
			//main product number added to front of array
			partNumbersArray.unshift(mainPartnumber);
			
			//array submitted
		    for(var i=0; i < partNumbersArray.length; i++){
			    data +="&partNumber=" + partNumbersArray[i];
			}
			module.addToTrolley(data);
		}
		module.cssClass = "addToTrolley addToTrolley_promotionB";
		return false;
	}
	
	function _tagAddEvent(){
		LightboxAddToTrolley.omniture.tags["linkName"] = "add to trolley lb";
		LightboxAddToTrolley.omniture.tags["events"] = "scAdd";
		LightboxAddToTrolley.omniture.track($(this)[0]);
	}

	function _success(json) {
		
		LightBox.extended.populate(json.html, true, {
			"cls" : module.cssClass,
			"header" : "Thank you"
		});

		// If we're on PDP/PLP no point following URL there. Just close LightBox.
		if(document.body.className.indexOf("productdetails") >= 0 || document.body.className.indexOf("browselister") >= 0 || document.body.className.indexOf("search") >= 0 || document.body.className.indexOf("productcompare") >= 0) {
			$(".navigation .continue").click(LightBox.extended.close);
		}
		
			
	// Add lightbox tagging events		
		$("div#addToTrolleyResponse  a.trolley").bind("click", function (){
			LightboxAddToTrolley.omniture.tags["linkName"] = "ar:product:gototrolley:";
			LightboxAddToTrolley.omniture.tags["prop25"] = "ar:product:gototrolley:";
			LightboxAddToTrolley.omniture.track(this);
		});		
		$("div#addToTrolleyResponse  a.continue").bind("click", function (){
			LightboxAddToTrolley.omniture.tags["linkName"] = "ar:product:continueshopping:"; 
			LightboxAddToTrolley.omniture.tags["prop25"] = "ar:product:continueshopping:";
			LightboxAddToTrolley.omniture.track(this);
		});		

		// Other stuff to action
		_setContinueButtonAction();
		_getMiniTrolleyUpdate();
		// QC - 17633 - all add to trolley actions will run this function here
		_tagAddEvent();	
		
	}
	
	function _setContinueButtonAction() {
		var previousProduct = $(".backToProduct");
		var trolleyContinue = $(".addToTrolley .continue");
		
		if(document.body.className.indexOf("productdetails") >= 0) {
			// We're over a PDP so just close the LB.
			trolleyContinue.click(LightBox.extended.close);
		}
		else {
			if(previousProduct.length > 0) {
				// We can find previous page URL so we'll use that.
				trolleyContinue.attr("href", previousProduct.attr("href"));
			}
			else {
				// We don't have a previous URL so just go to home.
				trolleyContinue.attr("href", "\/");
		} 		
	}	
	}		
	
	function _getMiniTrolleyUpdate(){
		var data ="storeId="+argos.page.storeId+"&langId="+argos.page.langId;
	
		LightBox.extended.request({
			url: window.location.protocol +"//" + window.location.host + "/webapp/wcs/stores/servlet/GetMiniTrolley",
			dataType: "json",
			type: "get",
			data: data,
			success: _getMiniTrolleyUpdateResponse,
			errorMessage: "Unable to update mini trolley data"
		});
	}
	
	
	function _getMiniTrolleyUpdateResponse(json) {
		//alert(json.trolleyItems+" "+json.trolleyAmount);
		var trolleyDetails = {quantity : ""+json.trolleyItems, total : ""+json.trolleyAmount};
		//alert(trolleyDetails.quantity+" -- "+trolleyDetails.total);
		Argos.Page.saveTrolley(trolleyDetails);
		Argos.Page.displayPersistentTrolley();
	}
	
});


// LightBoxAddToTrolley Omniture and tagging.
LightboxAddToTrolley.omniture = new (function(){
	
	var omniture = this; 

	// PUBLIC
	omniture.tags = {}; // create object help manipulate omniture values from other scripts.
	omniture.track = _tagTrolleyLBEvents;

	// PRIVATE
	function _tagTrolleyLBEvents(obj) {
		var s = s_gi(s_account);
 		var linkName = "";
		var linkTrackVars = "";
		var linkTrackEvents = "";		
		var linkName = omniture.tags['linkName'];
		
		if(linkName=='reviews' && omnitureReview){
			omniture.tags['eVar30'] = omnitureReview.totalReviewCount;
			omniture.tags['eVar31'] = (""+omnitureReview.avgRating).substring(0,3);			
		}
		

	
		
//		console.debug("LightboxAddToTrolley.omniture.tags: ", LightboxAddToTrolley.omniture.tags);
		for(var tagName in omniture.tags){
			if(omniture.tags[tagName] && tagName!='linkName' ){
				s[tagName] = omniture.tags[tagName];						
			}

			if(omniture.tags[tagName] && tagName=='events'){
					//s.linkTrackEvents=omniture.tags[tagName];
					linkTrackEvents = linkTrackEvents+omniture.tags[tagName]+",";
			} else if (omniture.tags[tagName] && tagName!='linkName' ){				
					linkTrackVars = linkTrackVars+tagName+",";
			}

		}
		
		linkTrackEvents=linkTrackEvents==""?"none":linkTrackEvents; 		
		s.linkTrackEvents=linkTrackEvents;
 		s.linkTrackVars=linkTrackVars;
	
 		s.tl(obj,'o', linkName);

	}

});


$(document).ready(function() {
	LightboxAddToTrolley.init();
});
