mybuys.setClient("PACSUN");

//Styles for all zones
mybuys.setStyle('.mbitem', 'font-family', 'sans-serif', 'text-align', 'left');
mybuys.setStyle('.mbpricelink:link', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mbpricelink:visited', 'color', '#000000', 'font-weight', 'normal');
mybuys.setStyle('.mblistsalerowspan', 'text-align', 'left', 'background-color', '#FFFFFF', 'padding-left', '2px', 'white-space', 'normal');
mybuys.setStyle('.mbnamerowspan', 'text-align', 'left', 'overflow', 'hidden', 'background-color', '#FFFFFF', 'padding-left', '2px', 'line-height', 'normal !important');
mybuys.setStyle('.mbimgspan', 'background-color', '#FFFFFF');
mybuys.setStyle('.mblegend', 'font-size', '12px', 'font-weight', 'bold', 'color', '#000000', 'text-align', 'left', 'padding', '0', 'font-family', 'sans-serif');
mybuys.setStyle('.mblistlink:link', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mblistlink:visited', 'color', '#999999', 'text-decoration', 'line-through');
mybuys.setStyle('.mbsalelink:link', 'color', '#FF0000', 'white-space', 'nowrap');
mybuys.setStyle('.mbsalelink:visited', 'color', '#FF0000', 'white-space', 'nowrap');
mybuys.setStyle('.mbdivider', 'height', '0px', 'border-color', '#C1C1C1', 'border-style', 'none none dotted', 'border-width', '0 0 1px');
mybuys.setStyle('.mbpromotext', 'color', 'red', 'text-align', 'left', 'display', 'inline-block'); 

//PDP styles
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbzone', 'width', '415px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbitem', 'width', '100px', 'padding', '0px 1px 0px 2px', 'font-size', '9px');
mybuys.setStyleByPageType("PRODUCT_DETAILS", '.mbnamerowspan', 'width', '100px', 'max-height', '24px');

//Shopping Cart styles
mybuys.setStyleByPageType("SHOPPING_CART", '.mbzone', 'width', '520px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbitem', 'width', '120px', 'padding', '10px 5px 0', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbnamerowspan', 'width', '100px', 'max-height', '28px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mblegend', 'background-color', '#E7E7E7', 'padding', '0 5px', 'line-height', '31px !important', 'font-weight', 'normal', 'font-size', '11px');
mybuys.setStyleByPageType("SHOPPING_CART", '.mbdivider', 'display', 'none !important');

//HCAT styles
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbzone', 'width', '780px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbitem', 'width', '180px', 'padding', '0px 7px 0px 8px', 'font-size', '11px');
mybuys.setStyleByPageType("HIGH_LEVEL_CATEGORY", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

//No Search Results styles
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbzone', 'width', '960px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbitem', 'width', '185px', 'padding', '0px 3px 0px 4px', 'font-size', '11px');
mybuys.setStyleByPageType("SEARCH_RESULTS", '.mbnamerowspan', 'width', '140px', 'max-height', '28px');

//Cat styles
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNAMELINK','font-family','Arial, Helvetica, sans-serif','font-size','11px','font-weight','normal','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTSLOT','display','inline','width','182px','text-align','center','padding','10px 6px 10px 6px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTPRICELINK','font-family','Arial, Helvetica, sans-serif','font-size','11px','font-weight','normal','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTBRAND','align','left','text-align','left','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNAME','align','left','text-align','left','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTNOTDISCOUNTEDPRICEWRAPPER','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTPRICE','color','#000000','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTDISCOUNTEDPRICEWRAPPER','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTBASEPRICE','color','#A2A3A5','text-decoration','line-through');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTSALEPRICELINK','font-family','Arial, Helvetica, sans-serif','color','#FF2F00','font-size','11px','font-weight','normal','text-decoration','none','text-transform','none');
mybuys.setStyle('.MB_CAT1 .MB_PRODUCTATTRIBUTE\\=promo_text','color','#FF2F00','text-decoration','none');
mybuys.setStyle('.MB_CAT1 .MB_STY0','display','inline','width','182px','height','282px','text-align','left','line-height','normal','padding','0px 0px 10px 0px');
mybuys.setStyle('.MB_CAT1 .MB_STY1','display','inline','width','182px','text-align','left','line-height','normal','padding','5px 0px 0px 2px');
mybuys.setStyle('.MB_CAT1 .MB_STY2','display','inline','width','182px','text-align','left','line-height','normal','padding','0px 0px 0px 2px');

mybuys.oldProcessResponseHTML = mybuys.processResponseHTML;

mybuys.processResponseHTML = function(zoneHtmls) {
	mybuys.oldProcessResponseHTML(zoneHtmls);
	
	
	var currency = mybuys.params.currency;
	
	function getPrice(pricesString) {
		var prices = pricesString.split("|,");
		var finalPrice = "0";
		for(var i = 0; i < prices.length; i++) {
			if(prices[i].indexOf(currency) == 0) {
				finalPrice = prices[i].substr(3, prices[i].length-3);
				return finalPrice.replace("|", '');
			}
		}
	}
	
	if(currency) {
		var cur_index = 0;
		var currentPriceSpan = document.getElementById("mb_intl_current_price" + cur_index);

		mybuys.setStyle('.mbpromotext', 'display', 'none');
		while(currentPriceSpan) {
			//get correct price
			var pricesString = currentPriceSpan.innerHTML;
			var finalPrice = getPrice(pricesString);
			//do current price substitution
			if(finalPrice) {
				var priceToChange = document.getElementById("mbcurrent" + cur_index);
				priceToChange.innerHTML = finalPrice;
			} else {
					//console.info(cur_index + " " + pricesString);
				}
			//increment loop
			cur_index += 1;
			currentPriceSpan = document.getElementById("mb_intl_current_price" + cur_index);
		}
		var max_index = cur_index;
		cur_index = 0;
		while(cur_index < max_index) {
			currentPriceSpan = document.getElementById("mb_intl_base_price" + cur_index);
			if(currentPriceSpan) {
				//get correct price
				var pricesString = currentPriceSpan.innerHTML;
				var finalPrice = getPrice(pricesString);
				//do base price substitution
				if(finalPrice) {
					var priceToChange = document.getElementById("mbbase" + cur_index);
					priceToChange.innerHTML = finalPrice;
				} else {
					//console.info(cur_index + " " + pricesString);
				}
			}
			//increment loop
			cur_index += 1;
		}
		
		cur_index = 0;
		while(cur_index < max_index) {
			currentPromoDiv = document.getElementById("mbpromotext" + cur_index);
			if(currentPromoDiv) {
				var promoString = ' ' + currentPromoDiv.innerHTML;
				if(promoString.indexOf('$') > -1) {
					currentPromoDiv.setAttribute('style', 'display:none;');
				} else {
					//console.info(cur_index + " " + promoString);
				}
			}
			//increment loop
			cur_index += 1;
		}
	}
	
	//BEGIN URL FIXING
	if((mybuys.params['pt'] == 'cart') && (location.protocol === 'https:')) {
		var mbDomainName = location.host;
		jQuery('a.mbimglink,a.mbnamelink,a.mblistlink,a.mbsalelink,a.mbpricelink').each(function(index) {
			$(this).attr('href', 'http://' + mbDomainName + $(this).attr('href'));
		});
	}
}

mybuys.applyStyles();
mybuys.setFailOverMsecs(5000);
mybuys.enableZones();