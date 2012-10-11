PriceTag = function() {

}

PriceTag.initAllPriceTag = function() {
	PriceTag.initPriceTag('div.item-price');
}


PriceTag.initPriceTag = function(xpath) {
	//	alert($(xpath).length);
	
	$(xpath).each(function(){
		
		pTotal = $(this).find('p').length;
		//	alert('pTotal :: ' + pTotal);
			
		parseString = $(this).find('p:eq(0)').text();
		//parseString = parseString.replace(/\s+/g, ' ');
		parseString = parseString.replace('$', '');
		parseStringParts = parseString.split(' ');
		parseStringPrice = parseStringParts[0].split('.');
		flashVarsDollars = parseStringPrice[0];
		flashVarsCents = parseStringPrice[1];
		
		trimmedStringParts = jQuery.trim(parseStringParts[1]);
		//	replaceParts = trimmedStringParts.replace(" ", "" );
		//	alert("|" + trimmedStringParts + "|");
		
		if(trimmedStringParts == 'more' || trimmedStringParts == 'less'){
			relativePricing = true;
		} else {
			relativePricing = false;
			//	alert(parseStringParts[1]);
		}
			
		if(pTotal == 1) {
			//	alert('Replace :: 1');
			swfHeight = 33;
			pTerms = null;
			
			if(!$(this).find('p:eq(0)').hasClass('small-price') && !relativePricing) {
				whichPriceFrame = 1;
				//	alert('relative :: false :: 1')
			} else if($(this).find('p:eq(0)').hasClass('small-price') && !relativePricing) {
				whichPriceFrame = 2;
				//	alert('relative :: false :: 2')
			} else if(!$(this).find('p:eq(0)').hasClass('small-price') && relativePricing) {
				whichPriceFrame = 3;
				flashVarsCents = parseStringParts[1];
				//	alert('relative :: true :: 3')
			} else if($(this).find('p:eq(0)').hasClass('small-price') && relativePricing) {
				whichPriceFrame = 4;
				flashVarsCents = parseStringParts[1];
				//	alert('relative :: true :: 4')
			}
		}
		
		else if(pTotal == 2) {
			//	alert('Replace :: 2');
			swfHeight = 50;
			pTerms = $(this).find('p:eq(1)').html();
			$(this).find('p:eq(1)').css({'display': 'none'});
			whichPriceFrame = 5;
		}
		
		$(this).find('p:eq(0)').each(function(){
		//	if($.flash.hasVersion(9)) {
				$(this).html("").flash({
					swf: "/static/site/common/swf/pricetags.swf",
					params: {
						"wmode": "transparent",
						"allowScriptAccess": "sameDomain",
						"allowFullScreen": "false",
						"quality": "high",
						"align" : "middle"
					},
					flashvars: {
						"dollars": flashVarsDollars,
						"cents": flashVarsCents,
						"frame": whichPriceFrame, 
						"terms": pTerms
					},
					height: swfHeight,
					width: 150
				});
		//	}
		});
	});
}
PriceTag.initAllPriceTag();