function toggleShowMoreSpinner() {	
	jQuery('div#deviceList-showMoreFooter div#showMoreDevices').css('display','none');
	jQuery('div#deviceList-showMoreFooter div#showMoreDevicesSpinner').css('display','block');
}

function filterCollapseExpand(param) {
	jQuery("#"+param).toggle();
	jQuery("#filter-collapse-"+param).toggle();
	jQuery("#filter-expand-"+param).toggle();
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
			//jQuery('#yellowMessage').html(function() {
				//alert('head-extra: compare sections');
				//return currentMessage+compareErrorMsg;
			//});
			//jQuery('#yellowMessage').show();
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
	updateCompareDevicesLink();
	
	// No thanks functionality
	jQuery.when(ATT.globalVars.cartPromise).done(function(){
		if (ATT.globalVars.cartContents.deviceInContext) {
			jQuery(".noThanksCtrlSection").show();
		}
	});
});