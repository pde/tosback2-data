$(window).load(function(){
	/* Added for rp3B functionality on vert/cat pages */
	/* get all rr pricing for non-regional items */
	RRGetItems();
	
	/* bind rr carousel pagination arrows */
	$(document).on("click.rp3b", ".rr_scrl-right", function(){
		var rptime = setTimeout(function(){
			RRGetItems();
		}, 1750);
	});
	
	$(document).on("click.rp3b", ".rr_scrl-left", function(){
		var rptime = setTimeout(function(){
			RRGetItems();
		}, 1750);
	}); 

	/* Check for ARS Regional Price Items and fetch price details from Pricing service */
	executeARS();

});


function executeARS(){
	var arsRegionalPriceEle=$('div.sps_prodlist_prices ul');
	var regionalPricingEnabled = $('input#regionalPricingEnabled').val();
	var arsProductPrice,
		arsPartnumber,
		arsPartnumberSplit,
		rgnCookie=0,
		arsData=[],
		arsItemData='';
		
	if (arsRegionalPriceEle.length) {
		if (regionalPricingEnabled === 'ON') {
			rgnCookie = $.cookie('regionCookie') || 0;
		}
		
		$.each(arsRegionalPriceEle, function(i){
			arsProductPrice=$(this).find('li').attr('ID');
			arsPartnumber=arsProductPrice.split('_')[2];
			arsPartnumberSplit=arsPartnumber.substring(0,eval(arsPartnumber.length-1));
			arsItemData+='['+arsPartnumberSplit+','+rgnCookie+',0]';
			if(i<(arsRegionalPriceEle.length-1) && !((i+1)%20==0)){
				arsItemData+='_';
			}
			if((i+1)%20==0){
				arsData.push(arsItemData);
				arsItemData='';
			}
		});
		if(arsItemData.length>0){
			arsData.push(arsItemData);
		}
		$.each(arsData, function(i){
			callPricingGridARS(arsData[i]);
		});
	}
}

function callPricingGridARS(arsData){
	var domainName = $('#pricingApiDomainName').val();

	//Make an API call for jsonp
	$.ajax({
	  url: "http://"+domainName+"/priceservice/onlineprice/jsonp",
	  data: "requestParams="+arsData,
	  contentType: "application/json; charset=iso-8859-1", // content type sent to server
	  dataType: "jsonp",
	  crossDomain: true,
	  success: function(data){
			arsPaintItemPrice(data);
	  },
	  error : function(errorMsg){
			arsPaintItemPrice();
	  }
   });
}

function arsPaintItemPrice(APIResponse){
	var arsRegionalPriceEle=$('div.sps_prodlist_prices ul'),
		priceData='',
		node;
		
	if (typeof APIResponse !== 'undefined' && APIResponse !== null && APIResponse.priceResponse.statusMessage === 'Success') {
			//Iterate over response returned from API and check for status code of each product.
			if(APIResponse.priceResponse.itemResponse instanceof Array){
				$.each(APIResponse.priceResponse.itemResponse, function(key, itemObj) {
						var pidEle='#ars_productPrice_'+itemObj.pid.value+'P';
						node=arsRegionalPriceEle.find(pidEle).parents('.sps_prodlist_prices');
						if(itemObj.statusCode!==0){
							priceData+='<a href="'+node.parents('a').attr('href')+'">See Price</a>';
						}else if(itemObj.mapDetails.violation){
							switch(itemObj.mapDetails.setting){
					case 1:
						priceData += '<p id="mapPrice1">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc">Add to Cart to see Sale Price</p>';
										break;

					case 2:
						priceData += '<p id="mapPrice2">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc">Go to checkout to see sale price</p>';
										break;

					case 3:
						priceData += '<p id="mapPrice3">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc"><a href="javascript:;" > See price </a></p>';
										break;

					case 4:
						priceData += '<p id="mapPrice4">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc">Add to Cart to see Sale Price</p>';
										break;

					case 5:
						priceData += '<p id="mapPrice5">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc">Go to checkout for details</p>';
										break;

					case 6:
						priceData += '<p id="mapPrice6">' + itemObj.regularPrice + '</p>';
										priceData+='<p id="mapDesc"><a href="javascript:;" > See price </a></p>';
										break;

					case 7:
						priceData += '<p id="mapPrice7">' + itemObj.regularPrice + '</p>';
										break;
							}
						}else{
							var sellPrice='';
							if(itemObj.nddPrice>0 && itemObj.nddPrice <= itemObj.sellPrice.value){
								sellPrice=itemObj.nddPrice;
							}else{
								sellPrice=itemObj.sellPrice.value;
							}
							priceData+='<p>'+sellPrice+'</p>';
							if(sellPrice<itemObj.regularPrice){
								priceData+='<p><del>'+itemObj.regularPrice+'</del></p>';
							}
						}
						node.html(priceData);
						priceData='';
					});
			}else{
				//When There is single item

		 	}
	}else{
		$.each(arsRegionalPriceEle, function(i){
			priceData='<p><a href="'+$(this).parents('a').attr('href')+'">See Price</a></p>';
			$(this).parent('.sps_prodlist_prices').html(priceData);
		});
	}
}

/* Start changes for Rich Relevance consistent pricing call */

/* Get info on the carousel */
function RRGetItems(){
	var rrCarouselList = $('.rr_scrl-wrapper');
		
	$.each(rrCarouselList, function(i){
		$(this).data('carCount',i);
		RRBuildReqObject($(this));
	});
}

/* Get the data for RR carousel api call - move this when done */
function RRBuildReqObject(thisCarousel){
	/* Use object literal to define the request object */
	var rr_pricingObj = [],
		rrCarArray = [],
		rrCarListItems = thisCarousel.find('.rr_scrl-productList'),
		rrCarListCount = rrCarListItems.length,
		rrCarListItemID = '',
		rrCarListItemPID = '',
		rrCarListItemMarketplace = '',
		rrCarListItemVarient = 0,
		rrRegQualifier = 0,
		rrRegCookie = 0,
		rrCarListItemPIDSize = '',
		rrRegVals = $('#regionalPriceEligibleDiv').val(),
		rrHideVals = $('#priceHideDIV').val(),
		regionalPricingEnabled = $('input#thirdPartyPriceEnabled').val(),
		isRegionalPriceEligible = '',
		isPriceHideEligible = '';

	/* Iterate over each item visible in the carousel */
	$.each(rrCarListItems, function(i){
		/* get the id and split on - and P to get just the pid */
		rrCarListItemID = $(this).attr('ID');
		rrCarListItemPID = rrCarListItemID.split("-")[1];
		/* Check if we are a regionally priced item */
		
		/* Determine variance */
		rrCarListItemMarketplace = $(this).children('.rr_scrl-productInfo').children('.rr_scrl-marketplaceitem').text();
		rrCarListItemVarient = $(this).children('.rr_scrl-productInfo').children('.rr_scrl-producttype').text();
		if (rrCarListItemVarient === 'VARIATION' || rrCarListItemMarketplace === 'true') {
			rrCarListItemVarient = '1';
				rrCarListItemPIDSize = rrCarListItemPID.length;
			if (rrCarListItemMarketplace ==='true'){
				rrCarListItemPID = rrCarListItemPID.substring(0,rrCarListItemPIDSize - 1);
			} else {
				rrCarListItemPID = rrCarListItemPID.substring(0,rrCarListItemPIDSize);
			}
		} else {
			rrCarListItemVarient = '0';
			rrCarListItemPIDSize = rrCarListItemPID.length;
			rrCarListItemPID = rrCarListItemPID.substring(0,rrCarListItemPIDSize - 1);
		}

		/* Get the first three digits of the pid */
		thisPidPref = rrCarListItemPID.substring(0,3);
		
		/* if regional pricing is enabled and if the region is null, pass 0. also, pass 0 for all non regional items */
		regionId = 0;
		/* Check if regional pricing is on and this item qualifies for it */
		if (regionalPricingEnabled === 'ON') {
			if (rrRegVals.indexOf(thisPidPref) != -1) {
				isRegionalPriceEligible = true;
				////Check if the division belongs to list of priceEligibleDiv div list from Config
				if (rrHideVals.indexOf(thisPidPref) != -1) {
					isPriceHideEligible = true;
				}
			//get regionIdCookie value
				regionId = $.cookie('regionCookie');
			}
		
		/* Structure object for call */
		rr_pricingObj += '[' + rrCarListItemPID + ',' + regionId + ',' + rrCarListItemVarient + ']';
		if (i !== rrCarListCount - 1) {
			rr_pricingObj += '_';
		}
		}
	});

	if(isI18NConvReq()){
		$('ul.rr_scrl-productInfo li.rr_scrl-productPrice').hide();
	} else {
	if (regionalPricingEnabled === 'ON') {
			//console.log(rr_pricingObj);
	/* Make the call to the pricing grid */
    callPricingGridUpgradeRR(rr_pricingObj, thisCarousel);
	} else {
		rrPopulateSeePrice(thisCarousel);
}
	}
}

function rrPopulateSeePrice(thisCarousel){
	var thisrrCarouselItems = thisCarousel.find('.rr_scrl-productList'),
		thisrrCarouselItem = '',
		thisrrCarouselItemPriceDiv = '',
		thisrrCarouselPriceMarkup = '',
		mapViotype = '',
		PricingObjectItem = {},
		thisrrCarouselItemLink = '',
		thisPidPref = '',
		rrisRegional = false,
		isPriceHideEligible = false,
		rrRegVals = $('#regionalPriceEligibleDiv').val(),
		rrHideVals = $('#priceHideDIV').val(),
		regionalPricingEnabled = $('input#regionalPricingEnabled').val();
		
		$.each(thisrrCarouselItems,function(i){
			/* Set see price link and show it in the carousel */
			thisrrCarouselItem = $(this);
			thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
			thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
			thisrrCarouselItemPriceDiv.html('<span class=\"link\"><a href="' + thisrrCarouselItemLink + '">See Price<\/a><\/span>');
			
			thisrrCarouselItemPriceDiv.fadeIn(); /* Fade in the price */
		});
}

/* Make the API call for RR Carousels */
function callPricingGridUpgradeRR(reqData, thisCarousel){
    var domainName = $('#pricingApiDomainName').val();
    
	//Make an API call for jsonp
	$.ajax({
	  url: "http://"+domainName+"/priceservice/onlineprice/jsonp",
	  data: "requestParams="+reqData,
	  contentType: "application/json; charset=iso-8859-1", // content type sent to server
	  dataType: "jsonp",
	  crossDomain: true,
	  success: function(data){
		rrCarouselRepaintPrice(data,thisCarousel);
	  },
	  error : function(errorMsg){
		rrCarouselRepaintPrice(errorMsg,thisCarousel);
	  }
   });
}

/* Repaint pricing on the RR carousel items */
function rrCarouselRepaintPrice(pricingObject,thisCarousel){
	var thisrrCarouselItems = thisCarousel.find('.rr_scrl-productList'),
		thisrrCarouselItem = '',
		thisrrCarouselItemPriceDiv = '',
		thisrrCarouselPriceMarkup = '',
		mapViotype = '',
		PricingObjectItem = {},
		thisrrCarouselItemLink = '',
		thisPidPref = '',
		rrisRegional = false,
		isPriceHideEligible = false,
		rrRegVals = $('#regionalPriceEligibleDiv').val(),
		rrHideVals = $('#priceHideDIV').val(),
		regionalPricingEnabled = $('input#regionalPricingEnabled').val();
	
	//console.log(pricingObject);
	
	if (pricingObject.statusText === "timeout" || pricingObject.priceResponse.statusMessage === "Failure - Invalid Request" && regionalPricingEnabled === 'ON') /* if we have a timeout or service failure and the flag is on */
	{
		// console.log('timed out');
	$.each(thisrrCarouselItems,function(i){
			thisrrCarouselItem = $(this);
			thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
			thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
			thisrrCarouselItemPriceDiv.html('<span class=\"link\"><a href="' + thisrrCarouselItemLink + '">See Price<\/a><\/span>');
			thisrrCarouselItemPriceDiv.fadeIn();
	});
		
	} else {
		/* The service is up and returning values */
		$.each(thisrrCarouselItems,function(i){
		PricingObjectItem = pricingObject.priceResponse.itemResponse[i];
			rrCarListItemPID = PricingObjectItem.pid.value;
		thisrrCarouselItem = $(this);
		thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
		
			// console.log(thisPidPref);
			
			// get the first three digits of the pid
			thisPidPref = rrCarListItemPID.substring(0,3);
			isPriceHideEligible = false;
			
			if (regionalPricingEnabled === 'ON') {
				if (rrRegVals.indexOf(thisPidPref) != -1) {
				////Check if the division belongs to list of priceEligibleDiv div list from Config
					if (rrHideVals.indexOf(thisPidPref) != -1) {
						rrisRegional = true;
						isPriceHideEligible = true;
					}
				}
			}
			
			if (isPriceHideEligible && $.cookie('regionCookie') === null && regionalPricingEnabled === 'ON') { /* This is a regional item where we hide the price AND there is no region cookie set */
				thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
				thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
				thisrrCarouselItemPriceDiv.html('<span class=\"link\"><a href="javascript:;" class="zipa">Enter Zip For Price<\/a><\/span>');
			} else {
		/* check status code. 1 is no price, anything else goes */
				if (PricingObjectItem.statusCode !== 0){
					thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
					thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
					thisrrCarouselItemPriceDiv.html('<span class=\"link\"><a href="' + thisrrCarouselItemLink + '">See Price<\/a><\/span>');
		} else {
			
			/* find out if we're violating MAP */
			if (PricingObjectItem.mapDetails.violation === true) {
	
				/* If we are, find out what kind of violation it is and build the html for it */
				mapViotype = PricingObjectItem.mapDetails.setting;
				switch (mapViotype) {
						case 1:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 2:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 3:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 4:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 5:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 6:
							thisrrCarouselItemPriceDiv = thisrrCarouselItem.find('.rr_scrl-productPrice');
									thisrrCarouselItemLink = thisrrCarouselItem.find('a.rr_scrl-productLink').attr('href');
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<a href=\"' + thisrrCarouselItemLink + '\" class=\"priceDetailsBtn\">price details</a>';
							break;
					
						case 7:
							/* This basically displays the price the same way as always */
							if (PricingObjectItem.nddPrice !== "0.00" && PricingObjectItem.sellPrice.value === PricingObjectItem.regularPrice) /* netdown deal, no sale price */
							{
								thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<div class=\"netDownCta\">Now $' + PricingObjectItem.nddPrice + '<\/div>';
							} else if (PricingObjectItem.nddPrice !== "0.00" && PricingObjectItem.sellPrice.value !== PricingObjectItem.regularPrice) /* netdown deal with sale price */
							{
								thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<div class=\"netDownCta\">Now $' + PricingObjectItem.nddPrice + '<\/div>';
							} else if (PricingObjectItem.sellPrice.value !== PricingObjectItem.regularPrice) /* no netdown deal */
							{
								thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>';
							} else /* Just a regular price */
							{
										thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>';
									}
							break;
							
						default:
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.regularPrice + '<\/span>';
							 break;
				}
				
				/* Set the price html in the carousel */
				thisrrCarouselItemPriceDiv.html(thisrrCarouselPriceMarkup);
				
					} else if (PricingObjectItem.mapDetails.violation === false) /* We are not violating map */
					{
						if (PricingObjectItem.nddPrice !== "0.00" && PricingObjectItem.sellPrice.value === PricingObjectItem.regularPrice) /* netdown deal, no sale price */
						{
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<div class=\"netDownCta\">Now $' + PricingObjectItem.nddPrice + '<\/div>';
						} else if (PricingObjectItem.nddPrice !== "0.00" && PricingObjectItem.sellPrice.value !== PricingObjectItem.regularPrice) /* netdown deal with sale price */
						{
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>' + '<div class=\"netDownCta\">Now $' + PricingObjectItem.nddPrice + '<\/div>';
						} else if (PricingObjectItem.sellPrice.value !== PricingObjectItem.regularPrice) /* no netdown deal */
						{
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>' + '<span class=\"origPrice\">$' + PricingObjectItem.regularPrice + '<\/span>';
						} else /* Just a regular price */
						{
							thisrrCarouselPriceMarkup = '<span class=\"price\">$' + PricingObjectItem.sellPrice.value + '<\/span>';
				}
	
				/* Set the price html in the carousel */
				thisrrCarouselItemPriceDiv.html(thisrrCarouselPriceMarkup);
			
					} else /* Any uncaught instance regarding map and regional pricing */
					{
				/* Set the price html in the carousel */
						thisrrCarouselItemPriceDiv.html('<span class=\"price\">$' + PricingObjectItem.regularPrice + '<\/span>');
			}
			
		}
	
			}
		
			thisrrCarouselItemPriceDiv.fadeIn(); /* Fade in the price */
	});
	}
};
/* End changes for Rich Relevance non-regional pricing consistent pricing call */

/* Browse code for DAP page to reload on entry/chanage of zipcode */

var zipCaptureForRegionalPrice = false;

function fnSubmitZipForARS(pricingForm) {
	pricingForm.find('input').focus(function() {
		SHCVAL.Util.toggleFormOff(pricingForm);
		SHCVAL.Util.toggleFormOn(pricingForm);
	});
	pricingForm.parents('li').hover(function(){},function(){
		SHCVAL.Util.toggleFormOff(pricingForm);
		SHCVAL.Util.toggleFormOn(pricingForm);
	});
	var successFunction = '',
	formIDAttr = '';
	zipCaptureForRegionalPrice = true;
	var zipcode = pricingForm.find('input').val();
	/* Tell the function which form to validate via jquery selector */
	formID = pricingForm;
	successFunction = function () {
		MyLocation.getZipCodeFromDB(zipcode,'','');
	};
	/* run the validation */
	SHCVAL.Util.validate(formID, successFunction); 
}