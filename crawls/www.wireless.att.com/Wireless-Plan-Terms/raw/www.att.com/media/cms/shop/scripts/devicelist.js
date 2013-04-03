function toggleShowMoreSpinner() {   
	jQuery('div#deviceList-showMoreFooter div#showMoreDevices').css('display','none');
	jQuery('div#deviceList-showMoreFooter div#showMoreDevicesSpinner').css('display','block');
}

function clearCompareThumbs(){
	var checkedCompareInputs = jQuery("#deviceLayout .list-compare input:checked");
	
	checkedCompareInputs.each(function(index, input){
		jQuery(input).attr("checked", false);
		jQuery.uniform.update(input);
		toggleCompareSelectionLabel(jQuery(input).val());
	});
	generateCompareThumbs();
}

function generateCompareThumbs(){
	jQuery("#compareThumbs").html("");
	var checkedCompareInputs = jQuery("#deviceLayout .list-compare input:checked");
	
	if(checkedCompareInputs.length){
		jQuery("#compareBar").show();
		
		checkedCompareInputs.each(function(index, input){
			var skuId = jQuery(input).val();
			var imgSrc = jQuery("#image-" + skuId).attr("src");
			var deviceName = jQuery.trim(jQuery("#item_" + skuId + " .list-title a").text());
			
			var imgCell = jQuery("<div>");
			var img = jQuery("<img>");
			var rmDevice = jQuery("<img>");
			
			imgCell.attr("title", deviceName);
			imgCell.data("skuInput", jQuery("#" + skuId));
			imgCell.data("skuId", skuId);
			imgCell.click(function(){
				var jThis = jQuery(this);
				
				jThis.data("skuInput").attr("checked", false);
				jQuery.uniform.update(jThis.data("skuInput"));
				toggleCompareSelectionLabel(jThis.data("skuId"));
				generateCompareThumbs();
				
			})
			
			imgCell.addClass("compareThumb");
			img.addClass("compareThumbImage");
			rmDevice.addClass("removeCompareThumb");
			
			img.attr("src", imgSrc);
			rmDevice.attr("src", "//0.ecom.attccc.com/shopcms/media/att/2012/global/ico/ico-close-blu.png");
			
			imgCell.append(img);
			imgCell.append(rmDevice);
			
			jQuery("#compareThumbs").append(imgCell);
		});
		
		for(var i = 0; i < 5 - checkedCompareInputs.length; i++){
			jQuery("#compareThumbs").append( jQuery("<div class='compareThumb'>"));
		}
		
	}else{
		jQuery("#compareBar").hide();
	}
	
	return false;
}

function checkCompareSelectionCount(selectBoxId,selectProcess) {
	var allCheckboxes = jQuery("input[name=skuId]:checked");
	var allCheckboxesSize = allCheckboxes.size();
	var checkedCompareSkus = "";
	if (allCheckboxesSize == 0) {
		jQuery('#gridListControl .viewCompareCopy #clearCompareDevicesLink').css('display','none');
		checkedCompareSkus = "";
		jQuery("input#compareSku").attr("value",checkedCompareSkus);
	} else if (allCheckboxesSize > 0) {
		jQuery('#gridListControl .viewCompareCopy #clearCompareDevicesLink').css('display','block');
		if (allCheckboxesSize > 5) {
			currentMessage = jQuery("div#yellowMessage").html();
			var compareErrorMsg = "You selected " + allCheckboxesSize + " devices to compare. The maximum is 5.";
			jQuery('input#'+selectBoxId).attr('checked',false);
			jQuery.uniform.update('input#'+selectBoxId);
			alert(compareErrorMsg);
			//return false;
		} else {
			checkedCompareSkus = allCheckboxes.map(function() {
				return this.id;
			}).get().join(",");
			jQuery("input#compareSku").attr("value",checkedCompareSkus);
			if (selectProcess == 'process') {
				processCompareDevices();
				//jQuery('a#compareUrl').click();
				document.location = jQuery("a#compareUrl").attr("href");
			}
			//return true;
		}
	}
}

function toggleCompareSelectionLabel(selectBoxId) {
	var boxIsChecked = jQuery('input#'+selectBoxId).attr('checked');
	if(boxIsChecked) {
		jQuery('div#'+selectBoxId+'-addtocompare').hide();
		jQuery('div#'+selectBoxId+'-comparenow').show();
	} else {
		jQuery('div#'+selectBoxId+'-addtocompare').show();
		jQuery('div#'+selectBoxId+'-comparenow').hide();
	}
}

function clearCompareDevices() {    
	jQuery('input[name=skuId]').attr('checked', false);
	jQuery.uniform.update('input[name=skuId]');
	updateCompareDevicesLink();
}

function expandFinePrint(inItemSkuId) {
	var finePrintHeight = jQuery(inItemSkuId + ' .gridActionDiv .gridFinePrint').height();
	var panelFooterHeight = jQuery(inItemSkuId + ' .gridActionDiv').height();
	var newHeight = panelFooterHeight;
	if (finePrintHeight > 0) {
		newHeight = panelFooterHeight + finePrintHeight + 10;
	} 
	jQuery(inItemSkuId + ' .gridActionDiv').height(newHeight);
	jQuery(inItemSkuId + ' .gridActionDiv').css('background-color', '');
	jQuery(inItemSkuId + ' .gridActionDiv').css('background-image', 'url(/shopcms/media/att/2011/shop/wireless/devices/list/bg-gradient.jpg)');
	jQuery(inItemSkuId + ' .gridActionDiv .gridFinePrint').css('left','0');
}

function contractFinePrint(inItemSkuId) {
	jQuery(inItemSkuId + ' .gridActionDiv').css('background-image', '');
	jQuery(inItemSkuId + ' .gridActionDiv').css('background-color', '#FFFFFF');
	jQuery(inItemSkuId + ' .gridActionDiv .gridFinePrint').css('left','-999em');
	jQuery(inItemSkuId + ' .gridActionDiv').css('height','47px');
}

function updateCompareDevicesLink() {
	var allCompareCheckboxes = jQuery("input[name=skuId]:checked");
	var allCompareCheckboxesSize = allCompareCheckboxes.size();
	if (allCompareCheckboxesSize == 0) {
		jQuery('#gridListControl .viewCompareCopy #clearCompareDevicesLink').css('display','none');
	} else {
		jQuery('#gridListControl .viewCompareCopy #clearCompareDevicesLink').css('display','block');
	}
}

jQuery(document).ready(function() {
	clearCompareDevices();
	
	//Collapse all but the first three filters.
	jQuery.each(jQuery(".filterCollapseControl").get().slice(3), function(index, element){filterCollapse(element.id.split("-").pop())});
	jQuery.each(jQuery(".filterCollapseControl"), function(index, element){toggleFilterItems(element.id.split("-").pop())});
	
	// No thanks functionality
	jQuery.when(ATT.globalVars.cartPromise).done(function(){
		if (ATT.globalVars.cartContents.deviceInContext) {
			jQuery(".noThanksCtrlSection").show();
		}
	});
});