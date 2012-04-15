// if default color is not available select the first one available (use the function that is already created)
function skuPicker(skusArray,idPrefix,type,imgArray)
{
	var that = this;
	this.skusArray = skusArray;
	this.multiSkusArray = new Array();
	this.imagesArray = imgArray;
	this.defaultColor = this.imagesArray[0];
	this.idPrefix = idPrefix;
	this.type = type;

	this.hasWidth = false;
	this.hasSize = false;
	this.hasSC_01 = false;
	this.hasSC_02 = false;
	this.hasSC_03 = false;
	this.defaultSkusArrayName = "";
	this.sizeClassPrefix = 'SC_';

	this.selectionStates = null;
	this.detailViewer = null;
	this.selectedImageType = "Main";
	this.previousSelector = -1;
	this.MiniCart = null;
	this.hasSale = false;
	this.LAST_ADDED_ITEM=null;
	var that = this;
	this.unavailableMsgId = idPrefix+'unavailableMsg';
	this.promoLines = 1;
	this.promoLineSize = 12;
	this.promoTopPadding = 5;
	
	this.init = function()
	{
		this.checkProductSoldOut();
		this.checkIfHasWidthSize();
		this.createMultiSkusArray();
		this.adjustPromoArea();
		this.BAG = "BAG";
		this.vipPd = false;
		try {
			if(sizeSelectionComplete) {
				this.vipPd = true;
			} else {
				this.vipPd = false;
			}
		} catch(e) {
			this.vipPd = false;
		}
		for (var img in this.imagesArray)
		{
			try {
				new Image().src = this.imagesArray[img].PD[this.selectedImageType];
			} catch (e) {}
		}
		this.selectDefaultColor();

		this.selectionStates = new skuPickingLogic(this);
		this.selectionStates.init();

		this.selectionStates.selectedSizeClass = this.defaultSkusArrayName;
		this.selectionStates.clearSelection();
		this.selectionStates.changeSizeClass();
		this.selectionStates.populateAll();
		try{$(that.idPrefix+this.defaultSkusArrayName).className = 'selectedSizeClass';}catch(err){}
		this.selectionStates.selectedColor = this.defaultColor;
        this.selectionStates.availForColor();
        if(this.type != 'quickView') {
        	this.selectionStates.fillPreselections();
        }
       	this.MiniCart = new miniCartLogic(this);
       	this.MiniCart.init();
		try{
			if(!skuPickerConstants.isOutFit) {
				this.printViewMoreLinks(that.defaultColor);
				this.printEnlargeViewMoreLinks(that.defaultColor);
			}
		} catch (err) {}
		this.selectionStates.selectIfSingle();
		this.initImageTypeSelectors();
		this.selectionStates.setMessage();
		this.selectionStates.highLightSelection();
		$(that.idPrefix+'locErrText').style.visibility = 'visible';
		try{omnAjaxReport();}catch(e){}
		this.addAltViewArrowControls(3, 115);		
	}
	this.addAltViewArrowControls = function (imagesToShow, spanHeight) {
		var idPre = that.idPrefix;
		var altViewWindow = jQuery('#'+idPre+"altViewWindow");

		// Checks for the existence of an altViewWindow div, otherwise
		// the HTML is not set up for arrow navigation of alt images
		if(altViewWindow.length > 0) {					
			this.rotatingSpanCollection = altViewWindow.find('span.imageTypeSelector');
			var numberOfImages = this.rotatingSpanCollection.length;
			// show only the number of images to show
			if (numberOfImages > imagesToShow) {
				imageSpans = altViewWindow.find('span.imageTypeSelector');
				// Set up restricted window css
				altViewWindow.css('overflow', 'hidden');
				altViewWindow.css('position', 'relative');	
				if (!spanHeight) {
					spanHeight = imageSpans.eq(0).outerHeight(true);
				}
				altViewWindow.css('height', (imagesToShow * spanHeight) + 'px');
			}
			
			/* turn on arrow visibility and add events */
			
			// previous
			jQuery('#'+idPre+'altViewNavUp').show().click(function(e) {
				e.preventDefault();
				that.rotatingSpanCollection.eq(numberOfImages - 1).insertBefore(that.rotatingSpanCollection.eq(0));
				that.rotatingSpanCollection = altViewWindow.find('span.imageTypeSelector');
			});
			// next
			jQuery('#'+idPre+'altViewNavDown').show().click(function(e) {
				e.preventDefault();
				that.rotatingSpanCollection.eq(0).insertAfter(that.rotatingSpanCollection.eq(numberOfImages - 1));
				that.rotatingSpanCollection = altViewWindow.find('span.imageTypeSelector');
			});
			
		}
	}
	this.checkProductSoldOut = function(){
		if($(that.idPrefix+'isProductSoldOut') && $(that.idPrefix+'isProductSoldOut').value == 'yes') {
			//jQuery('.descSoldOutMessaging1').show();
			//jQuery('.descSoldOutMessaging2').show();
			$(that.idPrefix+'descSoldOutMessaging').show();
			jQuery('#'+that.idPrefix+'pNameHOne').html(jQuery('#'+that.idPrefix+'pNameHOne').html()+ ' - Sold Out!');
			jQuery('#soldOutImgHolder').show();
			
			if($('addToCloset')){
				$('addToCloset').style.display = 'none';
			}
		}
	}
	this.adjustPromoArea = function(){
		
		var numLinesPerPromo = $(that.idPrefix+'numLinesPerPromo');
		this.promoLines = 1;
		if(numLinesPerPromo){
			var intnumLinesPerPromo = parseInt(numLinesPerPromo.value);
			if(!isNaN(intnumLinesPerPromo)){
				if(intnumLinesPerPromo >= 0) {
					this.promoLines = intnumLinesPerPromo;
				} else {
					this.promoLines = 0;
				}
			}
		}
		
		var promoDivContainer = $(that.idPrefix+'promotionsSpan');
		var maxPromoNum = $(that.idPrefix+'maxPromoNum')
		var promoHeight = 0;
		if(maxPromoNum){
			var intmaxPromoNum = parseInt(maxPromoNum.value);
			if(promoDivContainer && !isNaN(intmaxPromoNum) && intmaxPromoNum > 0){
				promoHeight = this.promoLineSize * intmaxPromoNum * this.promoLines + this.promoTopPadding * intmaxPromoNum;
				promoDivContainer.style.height = promoHeight+'px';
				promoDivContainer.style.display = 'block';
			}
		}
	}
	this.selectDefaultColor = function()
    {
        var defaultImg = that.imagesArray._default.PD[that.selectedImageType];
        var defaultColor;
        var backupDefaultColor = null;
        var defaultHasNoAvailability = true;

        if(defaultImg) {
	        for (var img in that.imagesArray) {
	            if(defaultImg.indexOf(img) != -1) {
	                defaultColor = img;
	                break;
	            }   
	        }
        }
        for (sku in that.skusArray) { // check to make sure default is available
            if (backupDefaultColor == null && that.skusArray[sku].availability != "NOT_AVAILABLE") {
                backupDefaultColor = that.skusArray[sku].variantColor; // grab an available color just in case
            }
            if(that.skusArray[sku].variantColor == defaultColor && that.skusArray[sku].availability != "NOT_AVAILABLE"){
                defaultHasNoAvailability = false;
                break;
            }
        }
        if(defaultHasNoAvailability){
            defaultColor = backupDefaultColor;   
        }
        that.defaultColor = defaultColor;   
       
    }
	
	this.printViewMoreLinks = function(selectedColorCode)
	{
		var viewMoreLinks = this.getViewMoreLinksData(selectedColorCode);
		var firsttt = true;
		for (var i = 0; i < viewMoreLinks.length; i++) {

			if($(that.idPrefix+'playVideoIcon') && viewMoreLinks[i]['type'] == that.selectedImageType){
				$(that.idPrefix+'playVideoIcon').insert({before: '<img id="'+that.idPrefix+'_vidPDImg" title="" alt="" src="' + viewMoreLinks[i]['imglink'] + '"/>'});
			}
			var element = '';
			if(firsttt) {
				element = '<span class="imageTypeSelector" id="' + viewMoreLinks[i]['type'] + '">' + '<img id="'+that.idPrefix+'_img_'+ viewMoreLinks[i]['type'] +'" title="' + viewMoreLinks[i]['type'].replace('_',' ') + '" alt="' + viewMoreLinks[i]['type'].replace('_',' ') + '" src="' + viewMoreLinks[i]['imglink'] + '"/></span>';
				firsttt = false;
			} else {
				element = '<span class="imageTypeSelector nofirstaltview" id="' + viewMoreLinks[i]['type'] + '">' + '<img id="'+that.idPrefix+'_img_'+ viewMoreLinks[i]['type'] +'" title="' + viewMoreLinks[i]['type'].replace('_',' ') + '" alt="' + viewMoreLinks[i]['type'].replace('_',' ') + '" src="' + viewMoreLinks[i]['imglink'] + '"/></span>';
			}
			$(that.idPrefix+'heading').insert({before: element});
		}
	}
	this.highlightSelectedImageType = function() 
	{
		var that = this;
		var selImgT = that.selectedImageType;
		//var needReplacing = selImgT.indexOf('_');
		
		//while(needReplacing != -1){
			//selImgT = selImgT.replace('_',' ');
			//needReplacing = selImgT.indexOf('_');
		//}
		$$('#'+that.idPrefix+'viewsMenu span.imageTypeSelector,#enlargeDesc .imageTypeSelector').each(function(element) {
			var elText = element.textContent ? element.textContent: (element.id ? element.id : null);
			if (elText != null && selImgT == elText.replace('|','')) {
				element.addClassName('selected');
			} else {
				element.removeClassName('selected');
			}
		});
	} 
	this.printEnlargeViewMoreLinks = function(selectedColorCode)
	{
		var viewMoreLinks = this.getViewMoreLinksData(selectedColorCode);
		
		for (var i = 0; i < viewMoreLinks.length; i++) {
		
			var element = '<a href="#" class="imageTypeSelector" id="' + viewMoreLinks[i]['type'] + '">' + viewMoreLinks[i]['type'].replace('_',' ') + '</a>';
			element += (i + 1) != viewMoreLinks.length ? ' | ' : '';
			
			$('enlargeDesc').insert({bottom: element});
		}
	}
	this.getViewMoreLinksData = function(selectedColorCode)
	{
		var viewMoreLinks		= new Array();
		var viewMoreLinksCount	= 0;
		
		for (var viewType in this.imagesArray[selectedColorCode]['PD'])
		{
			if(viewType != null){
				//var needReplacing = viewType.indexOf('_');
				
				//while(needReplacing != -1){
					//viewType = viewType.replace('_',' ');
					//needReplacing = viewType.indexOf('_');
				//}
				
				viewMoreLinks[viewMoreLinksCount]			= new Object();
				viewMoreLinks[viewMoreLinksCount]['type']	= viewType;
				viewMoreLinks[viewMoreLinksCount]['imglink']	= this.imagesArray[selectedColorCode]['VT'][viewType];
				viewMoreLinksCount++;				
			}
		}
		
		return viewMoreLinks;
	}
	this.createMultiSkusArray = function()
	{
		this.multiSkusArray.SC_03 = {};
		this.multiSkusArray.SC_03Colors = new Array();
		this.multiSkusArray.SC_03Widths = new Array();
		this.multiSkusArray.SC_03Sizes = new Array();

		this.multiSkusArray.SC_01 = {};
		this.multiSkusArray.SC_01Colors = new Array();
		this.multiSkusArray.SC_01Widths = new Array();
		this.multiSkusArray.SC_01Sizes = new Array();
		
		this.multiSkusArray.SC_02 = {};
		this.multiSkusArray.SC_02Colors = new Array();
		this.multiSkusArray.SC_02Widths = new Array();
		this.multiSkusArray.SC_02Sizes = new Array();

		for(sku in that.skusArray) {
			if(that.skusArray[sku].ISD!='' && that.skusArray[sku].availability!='In Stock') {
				$(that.idPrefix+'nameShipDate').style.display = "block";
				$(that.idPrefix+'descShipDate').style.display = "block";
			}
			that.skusArray[sku].standardPrice = '$'+Number(that.skusArray[sku].standardPrice).toFixed(2);
			that.skusArray[sku].salesPrice = '$'+Number(that.skusArray[sku].salesPrice).toFixed(2);
			switch(that.skusArray[sku].variantSizeClass){
				case ('02'):
					that.hasSC_02 = true;
					that.multiSkusArray.SC_02[sku] = that.skusArray[sku];
					that.multiSkusArray.SC_02Colors.push(that.skusArray[sku].variantColor);
					that.multiSkusArray.SC_02Widths.push(that.skusArray[sku].variantWidth);
					that.multiSkusArray.SC_02Sizes.push(that.skusArray[sku].variantSize);
					break;
				case ('03'):
					that.hasSC_03 = true;
					that.multiSkusArray.SC_03[sku] = that.skusArray[sku];
					that.multiSkusArray.SC_03Colors.push(that.skusArray[sku].variantColor);
					that.multiSkusArray.SC_03Widths.push(that.skusArray[sku].variantWidth);
					that.multiSkusArray.SC_03Sizes.push(that.skusArray[sku].variantSize);
					break;
				default:
					that.hasSC_01 = true;
					that.multiSkusArray.SC_01[sku] = that.skusArray[sku];
					that.multiSkusArray.SC_01Colors.push(that.skusArray[sku].variantColor);
					that.multiSkusArray.SC_01Widths.push(that.skusArray[sku].variantWidth);
					that.multiSkusArray.SC_01Sizes.push(that.skusArray[sku].variantSize);
					break;
			}
		}
		that.multiSkusArray.SC_02Colors = that.multiSkusArray.SC_02Colors.uniq().sort();
		that.multiSkusArray.SC_02Widths = that.multiSkusArray.SC_02Widths.uniq();
		that.multiSkusArray.SC_02Sizes = that.multiSkusArray.SC_02Sizes.uniq();

		that.multiSkusArray.SC_03Colors = that.multiSkusArray.SC_03Colors.uniq().sort();
		that.multiSkusArray.SC_03Widths = that.multiSkusArray.SC_03Widths.uniq();
		that.multiSkusArray.SC_03Sizes = that.multiSkusArray.SC_03Sizes.uniq();
			
		that.multiSkusArray.SC_01Colors = that.multiSkusArray.SC_01Colors.uniq().sort();
		that.multiSkusArray.SC_01Widths = that.multiSkusArray.SC_01Widths.uniq();
		that.multiSkusArray.SC_01Sizes = that.multiSkusArray.SC_01Sizes.uniq();

		var inFlames = 0;
		if(that.hasSC_01)
			inFlames += 1;
		if(that.hasSC_02)
			inFlames += 1;
		if(that.hasSC_03)
			inFlames += 1;
		$(that.idPrefix+'sizeClassTabs').className = "sizeClassTabs"+inFlames;

		if(that.hasSC_01){
			that.defaultSkusArrayName = 'SC_01';
		} else if(that.hasSC_02){
			that.defaultSkusArrayName = 'SC_02';
		} else if(that.hasSC_03){
			that.defaultSkusArrayName = 'SC_03';
		} else{
			that.defaultSkusArrayName = 'SC_01';
		}

		that.skusArray = that.multiSkusArray[that.defaultSkusArrayName];
	}
	this.checkIfHasWidthSize = function()
	{
		that.hasWidth = true;
		that.hasSize = true;
		that.hasSizeClass = true;
		
		var firstSku = null;
		for(var sku in that.skusArray)
		{
			firstSku = sku;
			break;
		}

		if(firstSku != null)
		{
			if(!that.skusArray[firstSku].variantWidth)
				that.hasWidth = false;
			if(!that.skusArray[firstSku].variantSize)
				that.hasSize = false;
			if(!that.skusArray[firstSku].variantSizeClass)
				that.hasSizeClass = false;
		} else {
			that.hasSizeClass = false;
			that.hasSize = false;
			that.hasWidth = false;
		}
		if(!that.hasWidth)
		{
			var tmp=document.createElement('span');
			tmp.title="H";
			tmp.id=that.idPrefix+"H";
			tmp.className=that.idPrefix+"CARTwidth";
			tmp.appendChild(document.createTextNode("H"));
			
			tmp.chipType == 'widthChip';
			var tmp4=document.createElement('div');
			tmp4.id=that.idPrefix+"currentWidth";
			
			var tmp5=document.createElement('div');
			tmp5.id=that.idPrefix+"errWidth";
			
			var widths=document.createElement('div');
			widths.id=that.idPrefix+"widths";
			widths.appendChild(tmp5);
			widths.appendChild(tmp4);
			widths.appendChild(tmp);
			widths.style.display="none";
			document.body.appendChild(widths);
			
			for (var sku in that.skusArray) 
			{
				that.skusArray[sku].variantWidth = 'H';
			}
		}
		if(!that.hasSize)
		{
			var tmp2=document.createElement('span');
			tmp2.title="S";
			tmp2.id=that.idPrefix+"S";
			tmp2.className=that.idPrefix+"CARTsize";
			tmp2.chipType == 'sizeChip';
			tmp2.appendChild(document.createTextNode("S"));
			
			var tmp3=document.createElement('div');
			tmp3.id=that.idPrefix+"currentSize";
			tmp.appendChild(tmp3);
			var tmp6=document.createElement('div');
			tmp6.id=that.idPrefix+"errSize";

			var sizes=document.createElement('div');
			sizes.id=that.idPrefix+"sizes";
			sizes.appendChild(tmp6);
			sizes.appendChild(tmp3);
			sizes.appendChild(tmp2);
			sizes.style.display="none";
			document.body.appendChild(sizes);
			
			for (var sku in that.skusArray) 
			{
				that.skusArray[sku].variantSize = 'S';
			}
		}
		if(!that.hasSizeClass)
		{
			var tmp=document.createElement('div');
			tmp.id=that.idPrefix+"sizeClassTabs";
			tmp.style.display="none";
			tmp.innerHTML='<div title="Missy" id="'+that.idPrefix+'SC_01" class="'+that.idPrefix+'CARTSizeClass">Missy</div>';
			document.body.appendChild(tmp);
		} else {
			var sizeTabs = $(that.idPrefix+'sizeClassTabs');
			var pickerArea = $(that.idPrefix+'pickerArea');

			pickerArea.insert({before: sizeTabs});
			pickerArea.className = "pickerArea SPbox";
			sizeTabs.style.display = 'block';
		}
	}
	this.initImageTypeSelectors = function() {
		var imageTypeSelectorsMain = $$('#'+this.idPrefix+'viewsMenu span.imageTypeSelector');
		for (var i = 0; i < imageTypeSelectorsMain.length; i++) {
			var imageType = imageTypeSelectorsMain[i];
			imageType.imageHandler = this;
			imageType.onclick = this.imageTypeSelectorHandler;
			if(typeof skuPickerConstants.ipaddevice != "undefined") {
				if(skuPickerConstants.ipaddevice == false) {
					imageType.onmouseover = this.imageTypeSelectorHandlerMouseOver;
					imageType.onmouseout = this.imageTypeSelectorHandlerMouseOut;
				}
			}
		}
		var imageTypeSelectorsEnlarge = $$('#enlargeDesc .imageTypeSelector');
		for (var i = 0; i < imageTypeSelectorsEnlarge.length; i++) {
			var imageType = imageTypeSelectorsEnlarge[i];
			imageType.imageHandler = this;
			imageType.onclick = this.imageTypeSelectorHandler;
		}
		this.highlightSelectedImageType();
	}
	this.imageTypeSelectorHandlerMouseOver = function() {
		var imageHandler = this.imageHandler;
		var textContent = this.id;
		if (textContent != null) {
			var needReplacing = textContent.indexOf(' ');
			
			while(needReplacing != -1){
				textContent = textContent.replace(' ','_');
				needReplacing = textContent.indexOf(' ');
			}
			var selected = textContent.replace('|', '');
			that.previousSelector = that.selectedImageType;
			imageHandler.switchImageType(selected);
		}
		return false;
	}
	this.imageTypeSelectorHandlerMouseOut = function() {
		var imageHandler = this.imageHandler;
		if (that.previousSelector != -1) {
			imageHandler.switchImageType(that.previousSelector);
		}
		return false;
	}
	this.imageTypeSelectorHandler = function() {
		var imageHandler = this.imageHandler;
		var textContent = this.id;
		if (textContent != null) {
			var needReplacing = textContent.indexOf(' ');
			
			while(needReplacing != -1){
				textContent = textContent.replace(' ','_');
				needReplacing = textContent.indexOf(' ');
			}
			var selected = textContent.replace('|', '');
			that.previousSelector = -1;
			imageHandler.switchImageType(selected);
		}
		return false;
	}
	this.switchImageType = function(type) {
		this.selectedImageType = type;
		this.selectionStates.highLightSelection();
		this.highlightSelectedImageType();
	}
}

function skuPickingLogic(parent) 
{
	var that = this;
	this.skuPicker = parent;
	this.uniqueSizeClasses = new Array();
	this.uniqueColors = new Array();
	this.uniqueWidths = new Array();
	this.uniqueSizes = new Array();
	this.selectedColor = -1;this.selectedWidth = -1;this.selectedSize = -1;this.selectedSizeClass = -1;
	this.prevSelectedColor = -1;this.prevSelectedWidth = -1;this.prevSelectedSize = -1;

	this.rollOut = true;
	this.rollOverColor = -1;
	this.rollOverWidth = -1;
	this.rollOverSize = -1;
	this.currentSKU = null;

	this.init = function ()
	{
		var sizeClasses = $$('.'+this.skuPicker.idPrefix+'CARTSizeClass');
		var colors = $$('.'+this.skuPicker.idPrefix+'CARTchip');
		var widths = $$('.'+this.skuPicker.idPrefix+'CARTwidth');
		var sizes = $$('.'+this.skuPicker.idPrefix+'CARTsize');
//---------------------
		var i=0;
		for(i=0; i<sizeClasses.length; i++)
		{
			if (sizeClasses[i] != null) { // safari fix
				sizeClasses[i].chipType = 'sizeClassChip';
				Event.observe(sizeClasses[i], 'click', that.updateFields);
				sizeClasses[i].className = 'availableSizeClass';
			}
		}
		that.uniqueSizeClasses = sizeClasses;
//---------------------
		var i=0;
		for(i=0; i<colors.length; i++)
		{
			if (colors[i] != null) { // safari fix
				if(typeof skuPickerConstants.ipaddevice != "undefined") {
					if(skuPickerConstants.ipaddevice == false) {
						Event.observe(colors[i].id, 'mouseover', that.swatchRollOver);
						Event.observe(colors[i].id, 'mouseout', that.swatchRollOut);
					}
				} else {
					Event.observe(colors[i].id, 'mouseover', that.swatchRollOver);
					Event.observe(colors[i].id, 'mouseout', that.swatchRollOut);					
				}
				colors[i].chipType = 'colorChip';
				Event.observe(colors[i], 'click', that.updateFields);
				colors[i].className = 'available';
			}
		}
		that.uniqueColors = colors;
		if(that.skuPicker.hasWidth)
		{
			for(i=0; i<widths.length; i++)
			{
				if (widths[i] != null) { // safari fix
					if(typeof skuPickerConstants.ipaddevice != "undefined") {
						if(skuPickerConstants.ipaddevice == false) {
							Event.observe(widths[i].id, 'mouseover', that.swatchRollOver);
							Event.observe(widths[i].id, 'mouseout', that.swatchRollOut);
						}
					} else {
						Event.observe(widths[i].id, 'mouseover', that.swatchRollOver);
						Event.observe(widths[i].id, 'mouseout', that.swatchRollOut);						
					}
					widths[i].chipType = 'widthChip';
					Event.observe(widths[i].id, 'click', that.updateFields);
					widths[i].className = 'available';
				}
			}
			that.uniqueWidths = widths;
		} else {
			if ($(that.skuPicker.idPrefix+'widths')) {
				var singleWidth = $(that.skuPicker.idPrefix+'widths').getElementsByTagName('span');
				this.selectedWidth = singleWidth[0].id.substring(that.skuPicker.idPrefix.length);
				singleWidth[0].className = "selectedButton";
				singleWidth[0].chipType = 'widthChip';
				that.uniqueWidths = singleWidth;
			}
		}
		if(that.skuPicker.hasSize)
		{
			for(i=0; i<sizes.length; i++)
			{
				if (sizes[i] != null) { // safari fix
					if(skuPickerConstants.ipaddevice) {
						if(skuPickerConstants.ipaddevice == false) {
							Event.observe(sizes[i].id, 'mouseover', that.swatchRollOver);
							Event.observe(sizes[i].id, 'mouseout', that.swatchRollOut);
						}
					} else {
						Event.observe(sizes[i].id, 'mouseover', that.swatchRollOver);
						Event.observe(sizes[i].id, 'mouseout', that.swatchRollOut);
					}
					sizes[i].chipType = 'sizeChip';
					Event.observe(sizes[i].id, 'click', that.updateFields);
					sizes[i].className = 'available';
				}
			}
			that.uniqueSizes = sizes;
		} else {

			if ($(that.skuPicker.idPrefix+'sizes')) {
				var singleSize = $(that.skuPicker.idPrefix+'sizes').getElementsByTagName('span');
				this.selectedSize = singleSize[0].id.substring(that.skuPicker.idPrefix.length);
				singleSize[0].className = "selectedButton";
				singleSize[0].chipType = 'sizeChip';
				that.uniqueSizes = singleSize;
			}
		}
	}
	this.updateFieldsForElement = function(e) {
			var greyClicked = false;
			
			if(e != null && e.className == 'notAvailable') {
				greyClicked = true;
				that.clearAndRememberSelection();
				that.populateAll();
			}

       		if(e != null && e.chipType == 'sizeClassChip') {
				that.skuPicker.skusArray = that.skuPicker.multiSkusArray[e.id.substring(that.skuPicker.idPrefix.length)];
				that.selectedSizeClass = e.id.substring(that.skuPicker.idPrefix.length);
				that.clearSelection();
				that.changeSizeClass();
				that.populateAll();
				that.selectedColor = that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'][0];
				e.className = 'selectedSizeClass';
				that.availForColor();
			}

       		if(e != null && e.chipType == 'colorChip') {
  				if(that.selectedColor != -1)
  					$(that.skuPicker.idPrefix+that.selectedColor).className = 'available';
				that.selectedColor = e.id.substring(that.skuPicker.idPrefix.length);
				that.availForColor();
			}

       		if(e != null && e.chipType == 'widthChip') {
  				if(that.selectedWidth != -1)
  					$(that.skuPicker.idPrefix+that.selectedWidth).className = 'available';
				that.selectedWidth = e.id.substring(that.skuPicker.idPrefix.length);
		 		that.selectedWidthName = e.title;
				that.availForWidth();
			}
       		if(e != null && e.chipType == 'sizeChip') {
  				if(that.selectedSize != -1)
  					$(that.skuPicker.idPrefix+that.selectedSize).className = 'available';
		 		that.selectedSize = e.id.substring(that.skuPicker.idPrefix.length);
		 		that.selectedSizeName = e.title;
				that.availForSize();
			}
			if(greyClicked)
				that.selectRemembered(e);
			that.selectIfSingle();
			that.setMessage();
			that.highLightSelection();
	}
	this.updateFields = function (e) {
		that.rollOut = false;
		that.updateFieldsForElement(Event.element(e));
		if(that.selectedColor == -1){
			that.selectFirstAvailColor();
		}
		omnSelectionReport(that.currentSKU);
   	}
	this.selectFirstAvailColor = function() {
		var i=1;
		for(i=1;i<=that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'].length; i++) {
			if($(that.skuPicker.idPrefix+that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'][i-1]).className == 'available'){
				that.updateFieldsForElement($(that.skuPicker.idPrefix+that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'][i-1]));
				break;
			}
		}
	}
	this.selectIfSingle = function() {
			var availPointer = null;
			var avail = 0;
			var i;
			for(i=0; i<that.uniqueColors.length; i++) {
				if (that.uniqueColors[i] != null) { // safari fix
					if(that.uniqueColors[i].className == 'available') {
						availPointer = that.uniqueColors[i];
						avail++;
					}
				}
			}
			if(avail == 1 && that.selectedColor == -1) {
				that.selectedColor = availPointer.id.substring(that.skuPicker.idPrefix.length);
				that.availForColor();
			}
//------------------------------------------
			availPointer = null;
			avail = 0;
			for(i=0; i<that.uniqueWidths.length; i++) {
				if (that.uniqueWidths[i] != null) { // safari fix
					if(that.uniqueWidths[i].className == 'available') {
						availPointer = that.uniqueWidths[i];
						avail++;
					}
				}
			}
			if(avail == 1 && that.selectedWidth == -1) {
				that.selectedWidth = availPointer.id.substring(that.skuPicker.idPrefix.length);
				that.availForWidth();
			}
//------------------------------------------
			availPointer = null;
			avail = 0;
			for(i=0; i<that.uniqueSizes.length; i++) {
				if (that.uniqueSizes[i] != null) { // safari fix
					if(that.uniqueSizes[i].className == 'available') {
						availPointer = that.uniqueSizes[i];
						avail++;
					}
				}
			}
			if(avail == 1 && that.selectedSize == -1) {
		 		that.selectedSize = availPointer.id.substring(that.skuPicker.idPrefix.length);
				that.availForSize();
			}
	}
	this.availForColor = function ()
	{
				var state = 100;
				if(that.selectedWidth != -1)
					state += 10;
				if(that.selectedSize != -1)
					state += 1;
				switch (state)
				{
					case 100:
						that.WSColor();
						break;
					case 101:
						that.WSColor();
						that.WColorSize();
						break;
					case 110:
						that.WSColor();
						that.SColorWidth();
						break;
					case 111:
						that.WColorSize();
						that.SColorWidth();
						break;
				}	
	}

	this.availForWidth = function ()
	{
				var state = 10;
				if(that.selectedColor != -1)
					state += 100;
				if(that.selectedSize != -1)
					state += 1;
				switch (state)
				{
					case 10:
						that.CSWidth();
						break;
					case 11:
						that.CSWidth();
						that.CWidthSize();
						break;
					case 110:
						that.CSWidth();
						that.SColorWidth();
						break;
					case 111:
						that.CWidthSize();
						that.SColorWidth();
						break;
				}		
	}
	this.availForSize = function ()
	{
				var state = 1;
				if(that.selectedColor != -1)
					state += 100;
				if(that.selectedWidth != -1)
					state += 10;
				switch (state)
				{
					case 1:
						that.CWSize();
						break;
					case 11:
						that.CWSize();
						that.CWidthSize();
						break;
					case 101:
						that.CWSize();
						that.WColorSize();
						break;
					case 111:
						that.CWidthSize();
						that.WColorSize();
						break;
				}		
	}
	this.WSColor = function ()
	{
			var i=0;
			for(i=0; i<that.uniqueWidths.length; i++) {
				if (that.uniqueWidths[i] != null) { // safari fix
					that.uniqueWidths[i].className = 'notAvailable';
				}
			}
			for(i=0; i<that.uniqueSizes.length; i++) {
				if (that.uniqueSizes[i] != null) { // safari fix
					that.uniqueSizes[i].className = 'notAvailable';
				}
			}

			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantColor == that.selectedColor) {
					if (that.skuPicker.skusArray[sku].variantWidth) {
						$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantWidth).className = 'available';
					}
					if (that.skuPicker.skusArray[sku].variantSize) {
						$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantSize).className = 'available';
					}
					that.currentSKU = that.skuPicker.skusArray[sku]; 
				}
			}
	}
	this.CSWidth = function ()
	{
			var i=0;

			for(i=0; i<that.uniqueColors.length; i++) {
				if (that.uniqueColors[i] != null) { // safari fix
					that.uniqueColors[i].className = 'notAvailable';
				}
			}
			for(i=0; i<that.uniqueSizes.length; i++) {
				if (that.uniqueSizes[i] != null) { // safari fix
					that.uniqueSizes[i].className = 'notAvailable';
				}
			}

			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantWidth == that.selectedWidth){
					var tmp = that.skuPicker.skusArray[sku].variantColor;
					if($(that.skuPicker.idPrefix+tmp))
						$(that.skuPicker.idPrefix+tmp).className = 'available';
					$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantSize).className = 'available';
					that.currentSKU = that.skuPicker.skusArray[sku];
				}
			}
	}
	this.CWSize = function ()
	{
			var i=0;

			for(i=0; i<that.uniqueColors.length; i++)
				that.uniqueColors[i].className = 'notAvailable';
			for(i=0; i<that.uniqueWidths.length; i++)
				that.uniqueWidths[i].className = 'notAvailable';
			
			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantSize == that.selectedSize) {
					var tmp = that.skuPicker.skusArray[sku].variantColor;
					if($(that.skuPicker.idPrefix+tmp))
						$(that.skuPicker.idPrefix+tmp).className = 'available';

					$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantWidth).className = 'available';
					that.currentSKU = that.skuPicker.skusArray[sku];					
				}
			}
	}
	this.SColorWidth = function ()
	{
			var i=0;
			for(i=0; i<that.uniqueSizes.length; i++) {
				if (that.uniqueSizes[i] != null) { // safari fix
					that.uniqueSizes[i].className = 'notAvailable';
				}
			}
			
			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantColor == that.selectedColor && that.skuPicker.skusArray[sku].variantWidth == that.selectedWidth) {
					$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantSize).className = 'available';
					that.currentSKU = that.skuPicker.skusArray[sku];
				}
			}
	}
	this.WColorSize = function ()
	{
			var i=0;
			for(i=0; i<that.uniqueWidths.length; i++)
				that.uniqueWidths[i].className = 'notAvailable';						
			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantColor == that.selectedColor && that.skuPicker.skusArray[sku].variantSize == that.selectedSize){
					$(that.skuPicker.idPrefix+that.skuPicker.skusArray[sku].variantWidth).className = 'available';
					that.currentSKU = that.skuPicker.skusArray[sku];
				}
			}
	}
	this.CWidthSize = function ()
	{
			var i=0;
			for(i=0; i<that.uniqueColors.length; i++)
				that.uniqueColors[i].className = 'notAvailable';
			for (var sku in that.skuPicker.skusArray) {
				if(that.skuPicker.skusArray[sku].variantWidth == that.selectedWidth && that.skuPicker.skusArray[sku].variantSize == that.selectedSize) {
					var tmp = that.skuPicker.skusArray[sku].variantColor;
					if($(that.skuPicker.idPrefix+tmp))
						$(that.skuPicker.idPrefix+tmp).className = 'available';
					that.currentSKU = that.skuPicker.skusArray[sku];
				}
			}
	}
	this.swatchRollOver = function(e){
		that.rollOut = true;
   		if(Event.element(e).chipType == 'colorChip'){
			if(Event.element(e).className != "selectedColorButton"){
				if(Event.element(e).className != "notAvailable"){
					that.rollOverColor = that.selectedColor;
					that.rollOverWidth = that.selectedWidth;
					that.rollOverSize = that.selectedSize;
					that.updateFieldsForElement(Event.element(e));
				} else {
					that.rollOut = false;
					var size = true;
					var width = true;
		
					var errMsg = Event.element(e).title+' is not available in';
					if(that.selectedSize != -1 && that.skuPicker.hasSize) {
						var currSize = $(that.skuPicker.idPrefix+that.selectedSize).title;
						if(currSize == '')
							currSize = $(that.skuPicker.idPrefix+that.selectedSize).id;
						errMsg += ' '+currSize;
					} else size = false;
					if(that.selectedWidth != -1 && that.skuPicker.hasWidth) {
						var currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).title;
						if(currWidth == '')
							currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).id;
						errMsg += ' '+currWidth;
					} else width = false;

					if(width == false && size == false)
						errMsg = 'Click '+ Event.element(e).title + ' chip for available sizes and widths.'
					$(that.skuPicker.unavailableMsgId).innerHTML = errMsg;
					$(that.skuPicker.unavailableMsgId).style.display = 'block';
				}				
			} else {
				that.rollOut = false;
			}
		}
		if(Event.element(e).chipType == 'widthChip') {
			if(Event.element(e).className != "selectedButton") {
				if(Event.element(e).className != "notAvailable") {
					that.rollOverColor = that.selectedColor;
					that.rollOverWidth = that.selectedWidth;
					that.rollOverSize = that.selectedSize;
					that.updateFieldsForElement(Event.element(e));
				} else {
					that.rollOut = false;
					var errMsg = '';
					if(that.selectedColor != -1) 
						errMsg = $(that.skuPicker.idPrefix+that.selectedColor).title+' is not available in';
					else
						errMsg = 'Select a color for ';
					if(that.selectedSize != -1 && that.skuPicker.hasSize) {
						var currSize = $(that.skuPicker.idPrefix+that.selectedSize).title;
						if(currSize == '')
							currSize = $(that.skuPicker.idPrefix+that.selectedSize).id;
						errMsg += ' '+currSize;
					}
					var widthInfo = Event.element(e).title;
					if(widthInfo == '')
						widthInfo = Event.element(e).id.substring(that.skuPicker.idPrefix.length);
						
					errMsg += ' '+widthInfo;
					$(that.skuPicker.unavailableMsgId).innerHTML = errMsg;
					$(that.skuPicker.unavailableMsgId).style.display = 'block';
				}				
			} else {
				that.rollOut = false;
			}
		}
		if(Event.element(e).chipType == 'sizeChip') {
			if(Event.element(e).className != "selectedButton") {
				if(Event.element(e).className != "notAvailable") {
					that.rollOverColor = that.selectedColor;
					that.rollOverWidth = that.selectedWidth;
					that.rollOverSize = that.selectedSize;
					that.updateFieldsForElement(Event.element(e));
				} else {
					that.rollOut = false;
					var errMsg = '';
					if(that.selectedColor != -1) 
						errMsg = $(that.skuPicker.idPrefix+that.selectedColor).title+' is not available in';
					else
						errMsg = 'Select a color for ';
					var sizeInfo = Event.element(e).title;
					if(sizeInfo == '')
						sizeInfo = Event.element(e).id.substring(that.skuPicker.idPrefix.length);
					errMsg += ' '+sizeInfo;
					if(that.selectedWidth != -1 && that.skuPicker.hasWidth) {
						var currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).title;
						if(currWidth == '')
							currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).id;
						errMsg += ' '+currWidth;
					}
					$(that.skuPicker.unavailableMsgId).innerHTML = errMsg;
					$(that.skuPicker.unavailableMsgId).style.display = 'block';
				}				
			} else {
				that.rollOut = false;
			}		
		}
	}
	this.swatchRollOut = function(e){
		$(that.skuPicker.unavailableMsgId).style.display = 'none';
		if(that.rollOut) {
			that.selectedWidth = that.rollOverWidth;
			that.selectedSize = that.rollOverSize;
			that.updateFieldsForElement($(that.skuPicker.idPrefix+that.rollOverColor));
			if(that.selectedWidth != -1)
				that.updateFieldsForElement($(that.skuPicker.idPrefix+that.selectedWidth));
			if(that.selectedSize != -1)
				that.updateFieldsForElement($(that.skuPicker.idPrefix+that.selectedSize));
		}
	}
	this.highLightSelection = function()
	{
			var tmp = that.selectedColor;
			if($(that.skuPicker.idPrefix+tmp))
				$(that.skuPicker.idPrefix+tmp).className = 'selectedColorButton';
			if($(that.skuPicker.idPrefix+that.selectedWidth))
				$(that.skuPicker.idPrefix+that.selectedWidth).className = 'selectedButton';
			if($(that.skuPicker.idPrefix+that.selectedSize))
				$(that.skuPicker.idPrefix+that.selectedSize).className = 'selectedButton';
			
			if(that.selectedColor && that.selectedColor != -1) {
				$(that.skuPicker.idPrefix+'currentColor').innerHTML = $(that.skuPicker.idPrefix+that.selectedColor).title;
				$(that.skuPicker.idPrefix+'errColor').style.display = 'none';

				try {
					var pdImage = that.skuPicker.imagesArray[that.selectedColor].PD[that.skuPicker.selectedImageType];
					if ($(that.skuPicker.idPrefix+'printDisplay') != null) {
						$(that.skuPicker.idPrefix+'printDisplay').src = pdImage;
					}
					if ($(that.skuPicker.idPrefix+'zoomImg') != null) {
						$(that.skuPicker.idPrefix+'zoomImg').src = pdImage;
					}
					if(that.skuPicker.type != 'quickView') {
						var isZoom = that.skuPicker.imagesArray[that.selectedColor].zoom;
						if(isZoom){
							zoomImgWidthDefault = zoomImgWidthBack;
							zoomImgHeightDefault = zoomImgHeightBack;
							
							zoomImgWidth = zoomImgWidthBack;
							zoomImgHeight = zoomImgHeightBack;
							
							//zoomLargeImgHolderWidth = zoomImgWidthBack;
						} else {
							zoomImgWidthDefault = enlargeImgWidth;
							zoomImgHeightDefault = enlargeImgHeight;
							
							zoomImgWidth = enlargeImgWidth;
							zoomImgHeight = enlargeImgHeight;
							
							//zoomLargeImgHolderWidth = enlargeImgWidth;
						}
						initZoom(pdImage,isZoom);
					}
				} catch(e) {}
				var colorChip = that.currentSKU;//$(that.skuPicker.idPrefix + tmp);
				if (colorChip) {
					var promoDivContainer = $(that.skuPicker.idPrefix+'promotionsSpan');
					if(promoDivContainer){
						promoDivContainer.innerHTML = "";//'<div style="float:left;">'+colorChip.promotions.length+' '+that.currentSKU.variantColor+' '+that.currentSKU.variantWidth+' '+that.currentSKU.variantSize+'</div><br />';
						if(typeof(colorChip.promotions)!="undefined" && colorChip.promotions.length != 0){
							var iPromo=0;
							var promoMarkUp='';
							for(iPromo=0; iPromo<colorChip.promotions.length; iPromo++){
								promoMarkUp += '<div class="productPromotion" style="height:'+that.skuPicker.promoLines * that.skuPicker.promoLineSize+'px;">'+colorChip.promotions[iPromo]+'</div>';
							}
							promoDivContainer.innerHTML += promoMarkUp;
						}
					}
					that.showSalePrice_(colorChip);
					$(that.skuPicker.idPrefix+'currentColor').innerHTML += ' - '+colorChip.salesPrice;
					// print view
					if ($('printName')) {
						var printNotSale = $$('#printName .notSale')[0];
						var printSale = $('printNameValue');
						var printSaleWas = $('printWas');
						var printSaleNow = $('printNow');
						var printSaleNowValue = $('printNowValue');
						if (colorChip.showStandardPrice) {
							printNotSale.update(colorChip.standardPrice);
							printSale.update('');
							printSaleNow.update('');
							printSaleNowValue.update('');

						} else {
							printNotSale.update('');
							if(printSaleWas != null) printSaleWas.update($(that.skuPicker.idPrefix+'skuPickerWasText').value);
							printSale.update(colorChip.standardPrice);
							printSaleNow.update($(that.skuPicker.idPrefix+'skuPickerNowText').value);
							printSaleNowValue.update(colorChip.salesPrice);
						}
					}
				}
				try {
					$$('#'+that.skuPicker.idPrefix+'viewsMenu span.imageTypeSelector').each(function(element) {
						$(that.skuPicker.idPrefix+'_img_'+element.id).src = that.skuPicker.imagesArray[that.selectedColor]['VT'][element.id];					
					});
					if($(that.skuPicker.idPrefix+'_vidPDImg')) {
						$(that.skuPicker.idPrefix+'_vidPDImg').src = that.skuPicker.imagesArray[that.selectedColor]['VT']['Main'];
					}
				} catch (err) {}
			}
			if(that.selectedWidth != -1){
				var currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).title;
				if(currWidth == '')
					currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).id;
				$(that.skuPicker.idPrefix+'currentWidth').innerHTML = currWidth;
				$(that.skuPicker.idPrefix+'errWidth').style.display = 'none';
			} else if ($(that.skuPicker.idPrefix+'currentWidth')) {
				$(that.skuPicker.idPrefix+'currentWidth').innerHTML = '';
			}
			if(that.selectedSize != -1){
				var currSize = $(that.skuPicker.idPrefix+that.selectedSize).title;
				if(currSize == '')
					currSize = $(that.skuPicker.idPrefix+that.selectedSize).id;
				$(that.skuPicker.idPrefix+'currentSize').innerHTML = currSize;
				$(that.skuPicker.idPrefix+'errSize').style.display = 'none';
			} else if ($(that.skuPicker.idPrefix+'currentSize')) {
				$(that.skuPicker.idPrefix+'currentSize').innerHTML = '';
			}
	}
	this.showSalePrice_ = function(colorChip)
	{
		if ($(that.skuPicker.idPrefix+'displayNameAndPrice')) {
			var notSale = $$('#'+that.skuPicker.idPrefix+'displayNameAndPrice .notSale')[0];
			var onSale = $$('#'+that.skuPicker.idPrefix+'displayNameAndPrice .onSale')[0];
			var salePrice = $$('#'+that.skuPicker.idPrefix+'displayNameAndPrice .salePrice')[0];
			var percentageOff = $$('#'+that.skuPicker.idPrefix+'displayNameAndPrice .percentageOff')[0];
			if (colorChip.showStandardPrice) {
				if(colorChip.ISD!=''&&colorChip.availability!='In Stock'){
					notSale.update(colorChip.standardPrice+',&nbsp;');
					$(that.skuPicker.idPrefix+'nameShipDate').innerHTML = 'Ships '+colorChip.ISD;
					$(that.skuPicker.idPrefix+'descShipDate').innerHTML = 'Item Ships '+colorChip.ISD+'.';
				} else {
					notSale.update(colorChip.standardPrice);
					$(that.skuPicker.idPrefix+'nameShipDate').innerHTML = '&nbsp;';
					$(that.skuPicker.idPrefix+'descShipDate').innerHTML = '&nbsp;';
				}
				notSale.show();
				onSale.hide();
				salePrice.hide();
				onSale.update('');
				salePrice.update('');
				var availMessage = colorChip.availability+', '+(colorChip.ISD!=''&&colorChip.availability!='In Stock'?'Ships '+colorChip.ISD+', ' : '')+colorChip.standardPrice;
				$(that.skuPicker.idPrefix+'availProdSkuText').innerHTML = availMessage;
				
				if(colorChip.availability!='In Stock') {
					$(that.skuPicker.idPrefix+'availProdSkuText').style.color = skuPickerConstants.locErrTextColor;
					$(that.skuPicker.idPrefix+'nameShipDate').style.color = skuPickerConstants.locErrTextColor;
					$(that.skuPicker.idPrefix+'descShipDate').style.color = skuPickerConstants.locErrTextColor;
				} else {
					$(that.skuPicker.idPrefix+'availProdSkuText').style.color = '';
					$(that.skuPicker.idPrefix+'nameShipDate').style.color = '';
					$(that.skuPicker.idPrefix+'descShipDate').style.color = '';
				}				
				$(that.skuPicker.idPrefix+'nameShipDate').innerHTML =  colorChip.ISD!=''&&colorChip.availability!='In Stock'?'Ships '+colorChip.ISD+'' : '&nbsp;';
				$(that.skuPicker.idPrefix+'descShipDate').innerHTML = colorChip.ISD!=''&&colorChip.availability!='In Stock'?'Item Ships '+colorChip.ISD+'.' : '&nbsp;';
			} else {
				notSale.hide();
				notSale.update('');
				if(colorChip.ISD!=''&&colorChip.availability!='In Stock'){
					try {
						if(oldPriceFirstPDP) {
							onSale.update($(that.skuPicker.idPrefix+'skuPickerWasText').value + ' ' + colorChip.standardPrice);
							salePrice.update($(that.skuPicker.idPrefix+'skuPickerNowText').value + ' ' + colorChip.salesPrice + ',&nbsp;');							
						} else {
							onSale.update($(that.skuPicker.idPrefix+'skuPickerWasText').value + ' ' + colorChip.standardPrice + ',&nbsp;');
							salePrice.update($(that.skuPicker.idPrefix+'skuPickerNowText').value + ' ' + colorChip.salesPrice);
						}
					}catch(err){
						onSale.update($(that.skuPicker.idPrefix+'skuPickerWasText').value + ' ' + colorChip.standardPrice);
						salePrice.update($(that.skuPicker.idPrefix+'skuPickerNowText').value + ' ' + colorChip.salesPrice + ',&nbsp;');
					}
					$(that.skuPicker.idPrefix+'nameShipDate').innerHTML = 'Ships '+colorChip.ISD;
					$(that.skuPicker.idPrefix+'descShipDate').innerHTML = 'Item Ships '+colorChip.ISD+'.';
				} else {
					onSale.update($(that.skuPicker.idPrefix+'skuPickerWasText').value + ' ' + colorChip.standardPrice);
					salePrice.update($(that.skuPicker.idPrefix+'skuPickerNowText').value + ' ' + colorChip.salesPrice);
					$(that.skuPicker.idPrefix+'nameShipDate').innerHTML = '&nbsp;';
					$(that.skuPicker.idPrefix+'descShipDate').innerHTML = '&nbsp;';
				}
				
				salePrice.show();
				onSale.show();
				var availMessage = colorChip.availability+', '+(colorChip.ISD!=''&&colorChip.availability!='In Stock'?'Ships '+colorChip.ISD+', ' : '')+colorChip.salesPrice+'';
				$(that.skuPicker.idPrefix+'availProdSkuText').innerHTML = availMessage;

				if(colorChip.availability!='In Stock') {
					$(that.skuPicker.idPrefix+'availProdSkuText').style.color = skuPickerConstants.locErrTextColor;
					$(that.skuPicker.idPrefix+'nameShipDate').style.color = skuPickerConstants.locErrTextColor;
					$(that.skuPicker.idPrefix+'descShipDate').style.color = skuPickerConstants.locErrTextColor;
				} else {
					$(that.skuPicker.idPrefix+'availProdSkuText').style.color = '';
					$(that.skuPicker.idPrefix+'nameShipDate').style.color = '';
					$(that.skuPicker.idPrefix+'descShipDate').style.color = '';
				}
			}
		}
	}
	this.clearSelection = function()
	{
			that.selectedColor = -1;
			if(that.skuPicker.hasWidth)
				that.selectedWidth = -1;
			if(that.skuPicker.hasSize)
				that.selectedSize = -1;
	}
	this.clearAndRememberSelection = function()
	{
			that.prevSelectedColor = that.selectedColor;		
			that.prevSelectedWidth = that.selectedWidth;
			that.prevSelectedSize = that.selectedSize;

			that.selectedColor = -1;
			if(that.skuPicker.hasWidth)
				that.selectedWidth = -1;
			if(that.skuPicker.hasSize)
				that.selectedSize = -1;
	}
	this.selectRemembered = function(e)
	{
		if(e.chipType == 'colorChip')
		{
			if(that.prevSelectedWidth && that.prevSelectedWidth != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedWidth).className == 'available')
				{
					that.selectedWidth = that.prevSelectedWidth;
					that.availForWidth();
				}
			}
			if(that.prevSelectedSize && that.prevSelectedSize != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedSize).className == 'available')
				{
					that.selectedSize = that.prevSelectedSize;
					that.availForSize();
				}
			}
		}
		if(e.chipType == 'widthChip')
		{
			if(that.prevSelectedColor && that.prevSelectedColor != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedColor).className == 'available')
				{
					that.selectedColor = that.prevSelectedColor;
					that.availForColor();
				}
			}
			if(that.prevSelectedSize && that.prevSelectedSize != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedSize).className == 'available')
				{
					that.selectedSize = that.prevSelectedSize;
					that.availForSize();
				}				
			}
		}
		if(e.chipType == 'sizeChip')
		{
			if(that.prevSelectedColor && that.prevSelectedColor != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedColor).className == 'available')
				{
					that.selectedColor = that.prevSelectedColor;
					that.availForColor();
				}				
			}
			if(that.prevSelectedWidth && that.prevSelectedWidth != -1)
			{
				if($(that.skuPicker.idPrefix+that.prevSelectedWidth).className == 'available')
				{
					that.selectedWidth = that.prevSelectedWidth;
					that.availForWidth();
				}
			}
		}
	}
	this.setMessage = function (force) {
			if(that.selectedColor != -1 && (!that.skuPicker.hasWidth || that.selectedWidth != -1) && (!that.skuPicker.hasSize || that.selectedSize != -1)) {
				var currColor = that.selectedColor;
				if($(that.skuPicker.idPrefix+that.selectedColor))
					currColor = $(that.skuPicker.idPrefix+that.selectedColor).title;

				if ($(that.skuPicker.idPrefix+that.selectedWidth)) {
					var currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).title;
					if(currWidth == '') {
						currWidth = $(that.skuPicker.idPrefix+that.selectedWidth).id;
					}
				}
				
				if ($(that.skuPicker.idPrefix+that.selectedSize)) {	
					var currSize = $(that.skuPicker.idPrefix+that.selectedSize).title;
					if(currSize == '') {
						currSize = $(that.skuPicker.idPrefix+that.selectedSize).id;
					}
				}
					
				that.loadValidUPC();

				var msg = '';
				
				if(that.skuPicker.vipPd) {
					msg = '<div id="theError" style="color:'+skuPickerConstants.locErrTextColor+';"><span class="color2">'+currColor;
				} else { 
					msg = '<div id="theError" style="color:'+skuPickerConstants.locErrTextColor+';">'+currColor;
				}
				if(that.skuPicker.hasWidth)
				 	msg+='<abbr class="currWidth">, '+ currWidth + '</abbr>';
				if(that.skuPicker.hasSize) 
					msg+=', '+ currSize;
				
				if(that.skuPicker.vipPd) {
					msg+='.</span></div>';
				} else {
					msg+='.</div>';					
				}
				
				$(that.skuPicker.idPrefix+'locErrText').innerHTML = msg;
				//$(that.skuPicker.idPrefix+'locErrText').style.color = skuPickerConstants.locErrTextColor;
				$(that.skuPicker.idPrefix+'locErrText').style.backgroundColor = '';
				// message for product inventory NOT AVAILABLE 
				if(force) 
				{
					$(that.skuPicker.idPrefix+'locErrText').style.color = skuPickerConstants.forceColor;
					$(that.skuPicker.idPrefix+'locErrText').style.backgroundColor = skuPickerConstants.forceBackgroundColor;
					$(that.skuPicker.idPrefix+'locErrText').innerHTML = 'This product is NOT AVAILABLE, but you can add to wishlist.';
				}
				$(that.skuPicker.idPrefix+'addToCartButton').src = $(that.skuPicker.idPrefix+'secondATBButton').value;
				
			} else {
				$(that.skuPicker.idPrefix+'addToCartButton').src = $(that.skuPicker.idPrefix+'firstATBButton').value;
				$(that.skuPicker.idPrefix+'pid').value = '';
				var msg = [];

				if(that.selectedColor == -1)
				{
					if(force)
						$(that.skuPicker.idPrefix+'errColor').style.display = 'block';
					msg.push('color/material');
				}
				if(that.selectedWidth == -1)
				{
					if(force && $(that.skuPicker.idPrefix+'errWidth')) {
						$(that.skuPicker.idPrefix+'errWidth').style.display = 'block';
					}
					if(that.skuPicker.hasWidth) {
						if(skuPickerConstants.widthName && skuPickerConstants.widthName != '') {
							msg.push(skuPickerConstants.widthName);
						} else {
							msg.push('width');
						}
					}
				}
				if(that.selectedSize == -1)
				{
					if(force && $(that.skuPicker.idPrefix+'errSize')) {
						$(that.skuPicker.idPrefix+'errSize').style.display = 'block';
					}
					if(that.skuPicker.hasSize) {
						if(skuPickerConstants.sizeName && skuPickerConstants.sizeName != '') {
							msg.push(skuPickerConstants.widthName);
						} else {
							msg.push('size');
						}
					}
				}
				var acc2;
				if (msg.length > 1) 
				{
	 				var last = ' and ' + msg[ msg.length-1 ];
	  				var rest = msg.slice(0, msg.length-1);
	  				acc2 = rest.join(', ').concat(last);
				} else {
	  				acc2 = msg;
				}
				$(that.skuPicker.idPrefix+'locErrText').style.color = '';
				$(that.skuPicker.idPrefix+'locErrText').style.backgroundColor = '';
				$(that.skuPicker.idPrefix+'locErrText').innerHTML = '<div id="'+that.skuPicker.idPrefix+'errTitle" class="errTitle">Please select a ' + acc2 + ' above.</div>';
				/*
				var message = "";
				if(that.selectedWidth!=-1) {
					message = "You have selected width " + that.selectedWidthName + ', please select a ' + acc2 + '.';
				} else if(that.selectedSize != -1) {
					message = "You have selected size " + that.selectedSizeName + ', please select a ' + acc2 + '.';
				} else {
					message = 'Please select a ' + acc2 + '.';
				}
				$(that.skuPicker.idPrefix+'locErrText').innerHTML = message;
				*/

				if(force)
				{
					$(that.skuPicker.idPrefix+'errTitle').style.color = skuPickerConstants.forceColor;
					$(that.skuPicker.idPrefix+'errTitle').style.backgroundColor = skuPickerConstants.forceBackgroundColor;
				}
			}
	}
	this.addTo = function () {
	    for (var sku in that.skuPicker.skusArray) {
	    	if($(that.skuPicker.idPrefix+'pid').value == sku){
	    		var msgAvailability = that.skuPicker.skusArray[sku].availability;
				$(that.skuPicker.idPrefix+'availability').value = msgAvailability;
			}
		}
	}
	this.loadValidUPC = function (){
			var valid = false;
			for (var sku in that.skuPicker.skusArray){
				if(that.skuPicker.skusArray[sku].variantColor == that.selectedColor && (!that.skuPicker.hasWidth || that.skuPicker.skusArray[sku].variantWidth == that.selectedWidth) && (!that.skuPicker.hasSize || that.skuPicker.skusArray[sku].variantSize == that.selectedSize)){
					valid = true;
					$(that.skuPicker.idPrefix+'pid').value = sku;
					//if($(that.skuPicker.idPrefix+'prodSelected'))
						//$(that.skuPicker.idPrefix+'prodSelected').checked = true;
					$(that.skuPicker.idPrefix+'availability').value = that.skuPicker.skusArray[sku].availability;
					//that.addTo();
					that.currentSKU = that.skuPicker.skusArray[sku];
					if(!that.rollOut) {
						try{
							if(sizeSelectionComplete){
								var currSizeee = $(that.skuPicker.idPrefix+that.selectedSize).title;
								if(currSizeee == '') {
									currSizeee = $(that.skuPicker.idPrefix+that.selectedSize).id;
								}
								sizeSelectionComplete(currSizeee,sku)
							}
						}catch(err){}
					}
				}
			}
			if(!valid){
				$(that.skuPicker.idPrefix+'pid').value = '';
				that.populateAll();
			}
	}
	this.changeSizeClass = function()
	{
		if(that.skuPicker.hasSizeClass) {
			var i;
			for(i=0; i<that.uniqueColors.length; i++)
				that.uniqueColors[i].parentNode.style.display = 'none';
			for(i=0; i<that.uniqueWidths.length; i++)
				that.uniqueWidths[i].style.display = 'none';
			for(i=0; i<that.uniqueSizes.length; i++)
				that.uniqueSizes[i].style.display = 'none';
	
			var numOfColors = that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'].length;
			var currentChip = null;
			for(i=1; i<=numOfColors; i++)
			{
				currentChip = $(that.skuPicker.idPrefix+that.skuPicker.multiSkusArray[that.selectedSizeClass+'Colors'][i-1]);
				currentChip.parentNode.style.display = 'block';
			}
			if(that.skuPicker.hasWidth){
				for(i=0; i<that.skuPicker.multiSkusArray[that.selectedSizeClass+'Widths'].length; i++)
					$(that.skuPicker.idPrefix+that.skuPicker.multiSkusArray[that.selectedSizeClass+'Widths'][i]).style.display = 'block';
			}
			if(that.skuPicker.hasSize){
				for(i=0; i<that.skuPicker.multiSkusArray[that.selectedSizeClass+'Sizes'].length; i++)
					$(that.skuPicker.idPrefix+that.skuPicker.multiSkusArray[that.selectedSizeClass+'Sizes'][i]).style.display = 'block';
			}
			if(that.skuPicker.hasSizeClass){
				for(i=0; i<that.uniqueSizeClasses.length; i++)
					that.uniqueSizeClasses[i].className = 'availableSizeClass';
			}
			if($(that.skuPicker.idPrefix+'errColor'))
				$(that.skuPicker.idPrefix+'errColor').style.display = 'none';
			if($(that.skuPicker.idPrefix+'errWidth'))
				$(that.skuPicker.idPrefix+'errWidth').style.display = 'none';
			if($(that.skuPicker.idPrefix+'errSize'))
				$(that.skuPicker.idPrefix+'errSize').style.display = 'none';
		} else {
			var i;
			for(i=0; i<that.uniqueColors.length; i++)
				that.uniqueColors[i].parentNode.parentNode.style.display = 'block';
			for(i=0; i<that.uniqueWidths.length; i++)
				that.uniqueWidths[i].style.display = 'block';
			for(i=0; i<that.uniqueSizes.length; i++)
				that.uniqueSizes[i].style.display = 'block';			
		}
	}
	this.populateAll = function()
	{
		var i;
		for(i=0; i<that.uniqueColors.length; i++)
			that.uniqueColors[i].className = 'available';
		for(i=0; i<that.uniqueWidths.length; i++)
			that.uniqueWidths[i].className = 'available';
		for(i=0; i<that.uniqueSizes.length; i++)
			that.uniqueSizes[i].className = 'available';

		if(that.selectedColor != -1)
			$(that.skuPicker.idPrefix+that.selectedColor).className = 'available';
		that.selectedColor = -1;
		if(that.selectedWidth != -1)
			$(that.skuPicker.idPrefix+that.selectedWidth).className = 'available';
		if(that.skuPicker.hasWidth)	
			that.selectedWidth = -1;
		if(that.selectedSize != -1)
			$(that.skuPicker.idPrefix+that.selectedSize).className = 'available';
		if(that.skuPicker.hasSize)
			that.selectedSize = -1;
	}
	this.fillPreselections = function() {
		var sizeClassPreselection = $('sizeClassPreselected');
		if (sizeClassPreselection != null) {
			var sizeClassElement = $(that.skuPicker.sizeClassPrefix+sizeClassPreselection.value);
			if (sizeClassElement != null) {
				that.updateFieldsForElement(sizeClassElement);
			}
		}
		var sizeClassPreselectionURL = $('sizeClassPreselectedURL');
		if (sizeClassPreselectionURL != null) {
			var sizeClassElementURL = $(that.skuPicker.sizeClassPrefix+getSizeClassMapping(sizeClassPreselectionURL.value));
			if (sizeClassElementURL != null) {
				that.updateFieldsForElement(sizeClassElementURL);
			}
		}
		var colorPreselection = $('colorPreselected');
		if (colorPreselection != null) {
			var colorElement = $(colorPreselection.value);
			if (colorElement != null) {
				that.updateFieldsForElement(colorElement);
			}
		}
		var colorPreselection = $('colorPreselectedURL');
		if (colorPreselection != null) {
			var colorElement = $(colorPreselection.value);
			if (colorElement != null) {
				try {
					if(colorElement.parentNode.parentNode.style.display == 'block' || colorElement.parentNode.parentNode.style.display == '') {
						that.updateFieldsForElement(colorElement);
					}
				}catch(err){}
			}
		}
		var widthPreselection = $('widthPreselected');
		if (widthPreselection != null) {
			var widthElement = $(widthPreselection.value);	
			if (widthElement != null) {
				that.updateFieldsForElement(widthElement);
			}
		}
		var sizePreselection = $('sizePreselected');
		if (sizePreselection != null) {
			var sizeElement = $(sizePreselection.value);
			if (sizeElement != null) {
				that.updateFieldsForElement(sizeElement);
			}
		}
	}
}
function miniCartLogic(parent) {
	var that = this;
	this.addToBagDetails = new addToBagDetail();
	
	this.skuPicker = parent;
	this.form = null;
	this.ajaxAction = null;
	this.ajaxWishAction = null;
		
	this.init = function() {

		this.form = $(that.skuPicker.idPrefix+'addToCartForm');
		$(that.skuPicker.idPrefix+'addToCartButton').onclick = that.addToCart;
		this.ajaxAction = this.form.ajaxAction.value;
		if($(that.skuPicker.idPrefix+'addToWishListButton')){
			$(that.skuPicker.idPrefix+'addToWishListButton').onclick = that.addToCloset;
			this.ajaxWishAction = this.form.ajaxWishListAction.value;
		}
	}
	this.addToCart = function() {
		if(ajaxAddToBag) {
			try{
				that.addToBagDetails.color = that.skuPicker.selectionStates.selectedColor;
				if(that.skuPicker.hasSize)
					that.addToBagDetails.size = that.skuPicker.selectionStates.selectedSize;
				if(that.skuPicker.hasWidth)
					that.addToBagDetails.width = that.skuPicker.selectionStates.selectedWidth;
				that.addToBagDetails.upc = that.form.pid.value;
				that.addToBagDetails.price = that.skuPicker.selectionStates.currentSKU.salesPrice.replace('$','');
			}catch(err){}
			if (that.form[that.skuPicker.idPrefix+'pid'].value != '' && that.form[that.skuPicker.idPrefix+'availability'].value != '' &&  that.form[that.skuPicker.idPrefix+'availability'].value != 'NOT_AVAILABLE') {
				document.body.style.cursor='wait';
				new Ajax.Request(that.ajaxAction, {method:'post', postBody: Form.serialize(that.form), onSuccess: that.ajaxSuccess, onFailure: function() {alert('failure');document.body.style.cursor='default';}});
			} else {
				that.skuPicker.selectionStates.setMessage('force');		
			}
			return false;
		} else {
			if (that.form.pid.value != '' && that.form.availability.value != '' &&  that.form.availability.value != 'NOT_AVAILABLE') {
				that.form.submit();
				return true;
			} else {
				that.skuPicker.selectionStates.setMessage('force');
				return false;
			}
		}
	}
	this.ajaxSuccess = function(transport) {
		var response = transport.responseText;
		try{
			if(response.indexOf('pre-order=true') != -1){
				picker.MiniCart.addToBagDetails.preOrder = true;
			} else {
				picker.MiniCart.addToBagDetails.preOrder = false;
			}
			if(response.indexOf('outOfStock=true') != -1){
				picker.MiniCart.addToBagDetails.error = true;
			} else {
				picker.MiniCart.addToBagDetails.error = false;
			}
		}catch(err){}
		var splitted = response.split('$$$SPLITHERE$$$');
		$('shoppingBagMain').innerHTML=splitted[0];
		$('ShopBagContent').innerHTML=splitted[1];
		if ($('shopBagAction')) {
			$('shopBagAction').show();
		}
		$('evShopBag').style.display = 'block';
		document.body.style.cursor='default';
		if(windowscroll) {
			window.scrollTo(0,0);
		} else {
			try {
				var calculatedTopCart = (jQuery(window).height() - jQuery('#pdqv').outerHeight()) / 2 + jQuery(window).scrollTop(); 
				if(calculatedTopCart < 0) {
					calculatedTopCart = 0;
				}
				jQuery('#evShopBag').css("top", calculatedTopCart + "px");
			} catch(err) {}
		}
		try{
			omnAjaxReport();
			siteClarityAddtoBag(picker.MiniCart.addToBagDetails);
			//closeQV();
		}catch(err){}
	}
	this.addToCloset = function() {
		if (that.form.pid.value != '' && that.form.availability.value != '' &&  that.form.availability.value != 'NOT_AVAILABLE') {
			document.body.style.cursor='wait';
			new Ajax.Request(that.ajaxWishAction, {method:'post', postBody: Form.serialize(that.form), onSuccess: that.ajaxSuccess, onFailure: function() {alert('failure');document.body.style.cursor='default';}});
		} else {
			that.skuPicker.selectionStates.setMessage('force');		
		}
		return false;
	}
}

function checkForUnique(value, array){
	var i;
	for(i = 0; i < array.length; i++){
		if(array[i] == value)
			return false;
	}
	return true;
}
function checkForUniqueColor(value, array){
	var i;
	for(i = 0; i < array.length; i++){
		if(array[i].colorCode == value)
			return false;
	}
	return true;
}
function Color(cCode,cDescription){
	var temp = cDescription.strip();
	if(temp == '')
		this.colorDescription = cCode;
	else
		this.colorDescription = temp;
	this.colorCode = cCode;	
	temp = null;
}
function getSizeClassMapping(strSizeClass){
	var sizeClasses = {};
	sizeClasses["Missy"] = "01";
	sizeClasses["Petite"] = "02";
	sizeClasses["Woman"] = "03";
	return sizeClasses[strSizeClass];
}
function addToBagDetail(){
	this.preOrder = false;
	this.size = "";
	this.width = "";
	this.color = "";
	this.error = false;
	this.upc = "";
	this.price = "";
}
function omnAjaxReport(){
	try{
		if($('trackingDataOMN')) {
			_metadata = eval($('trackingDataOMN').value)[0];
			_analytics.trackMetrics('custom',_metadata);
		}
	} catch (e){}
}
function omnSelectionReport(sku){
	try{
		if(sku.variantColor == picker.selectionStates.selectedColor && (!picker.hasWidth || sku.variantWidth == picker.selectionStates.selectedWidth) && (!picker.hasSize || sku.variantSize == picker.selectionStates.selectedSize)){
			var prdName = _metadata.products[0].product.split(':')[0]; 
			prdName += ':'+$(picker.idPrefix+sku.variantColor).title;
			if(picker.hasWidth){prdName += ':'+$(picker.idPrefix+sku.variantWidth).title;}
			if(picker.hasSize){prdName += ':'+$(picker.idPrefix+sku.variantSize).title;}
			_metadata.products[0].product = prdName.toLowerCase();
			_metadata.events = ['prodView','event5','event1'];
			_metadata.pagename = 'Product Details';
			_metadata.section = 'Cart';
			_analytics.trackMetrics('custom',_metadata);
		}
	} catch (e){}
}
function siteClarityAddtoBag(addedItemDetails){
	if(addedItemDetails.error) 
		return;
	if(siteClarityAddBag)
		siteClarityAddBag(addedItemDetails.upc,addedItemDetails.price);
}