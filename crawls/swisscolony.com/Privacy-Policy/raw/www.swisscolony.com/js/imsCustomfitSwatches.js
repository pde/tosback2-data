// Customfit Swatching for IMS
// V.1.0
// ENH1814 - rvega 08.19.2010

var imsSwatchOriginalImage = "";
var imsSwatchImageReplaced = false;
var imsSwatchHoverCSS = "";
var isEnsemble = false;
var isOptionsPage = false;

function swatchSelectorMouseOver(colorSize, descriptor, description, type, alternateImageLayerId, alternateImage, attributeElementIndexCount, swatchesInAttributeCount, selectorObj){

	var selectorObjId = selectorObj.id;
	var selectorCoordinates = selectorObjId.split("_");
	var ensembleIndex = selectorCoordinates[1];
	var productFamilyIndex = selectorCoordinates[2];
	var attributeIndex = selectorCoordinates[3];
	var attributeElementIndex = selectorCoordinates[4];
	var currentSwatchIndex =  ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;

	var swatchAttributeCountVarName = "attributeCount_" + ensembleIndex + "_" + productFamilyIndex;
	var swatchAttributeCount = eval(swatchAttributeCountVarName);

    var selectionDisplayObj = document.getElementById("selectorLayer_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex + "_" + attributeElementIndex);
    var imsSwatchLayerClass = selectionDisplayObj.className;
    imsSwatchHoverCSS = selectionDisplayObj.className;

	var defaultAlternateImageField = "default_alternate_image_" + currentSwatchIndex;
	var defaultAlternateImageFieldObj = document.getElementById(defaultAlternateImageField);
	var defaultAlternateImageFieldValue = defaultAlternateImageFieldObj.value;

	var selectedAlternateImageField = "selected_alternate_image_" + currentSwatchIndex;
	var selectedAlternateImageFieldObj = document.getElementById(selectedAlternateImageField);
	var selectedAlternateImageFieldValue = selectedAlternateImageFieldObj.value;

	var isPreValidationOk = preValidateSwatchSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, attributeIndex, colorSize);

	if (imsSwatchLayerClass == "customSwatchSelected"){
		selectionDisplayObj.className = "customSwatchUnselected";
	}else if(imsSwatchLayerClass == "customSwatchUnselected"){

		if (isPreValidationOk == false){

			if (isOptionsPage){
				var unAvailableVariant = eval("unAvailableVariantsMap_" + ensembleIndex + "_" + productFamilyIndex);
			    var variantAvailability = unAvailableVariant[colorSize];
				if (! variantAvailability){
				    // variant is available
				}else{
					description = description + " - " + variantAvailability;
				}
			}else{
				description = description + " is not available"
			}

			selectionDisplayObj.className = "customSwatchUnavailable";

		}else{
			selectionDisplayObj.className = "customSwatchSelected";
		}

	}else if ( imsSwatchLayerClass == "customSwatchUnavailable"){
		selectionDisplayObj.className = "customSwatchUnavailableOnMouseOver";

		if (isPreValidationOk == false){
			description = description + " is not available"
		}
	}

	var selectionDisplayField = "selectedAttributeTextDisplay_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;
	var selectionDisplayObj = document.getElementById(selectionDisplayField);
	selectionDisplayObj.innerHTML = description;

	if (alternateImage != "" ){
		updateSwatchAlternateImage(alternateImage, alternateImageLayerId);
	}

}

function swatchSelectorMouseOut(colorSize, descriptor, description, type, alternateImageLayerId, alternateImage, attributeElementIndexCount, swatchesInAttributeCount, selectorObj){

	var selectorObjId = selectorObj.id;
	var selectorCoordinates = selectorObjId.split("_");
	var ensembleIndex = selectorCoordinates[1];
	var productFamilyIndex = selectorCoordinates[2];
	var attributeIndex = selectorCoordinates[3];
	var attributeElementIndex = selectorCoordinates[4];
	var currentSwatchIndex =  ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;

	// for hovering
    var selectionDisplayObj = document.getElementById("selectorLayer_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex + "_" + attributeElementIndex);
    selectionDisplayObj.className = imsSwatchHoverCSS;
    imsSwatchHoverCSS = ""; // reset the global var

	var selectionDisplayField = "selectedAttributeTextDisplay_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;
	var selectionDisplayObj = document.getElementById(selectionDisplayField);

	var selectedAttribueField = "selectedAttributePlaceholder_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;
	var selectedAttribueObj = document.getElementById(selectedAttribueField);
	var selectedAttributeValue = selectedAttribueObj.value;

	// alternate image
	var defaultAlternateImageField = "default_alternate_image_" + currentSwatchIndex;
	var defaultAlternateImageFieldObj = document.getElementById(defaultAlternateImageField);
	var defaultAlternateImageFieldValue = defaultAlternateImageFieldObj.value;

	var selectedAlternateImageField = "selected_alternate_image_" + currentSwatchIndex;
	var selectedAlternateImageFieldObj = document.getElementById(selectedAlternateImageField);
	var selectedAlternateImageFieldValue = selectedAlternateImageFieldObj.value;

    if (!selectedAttributeValue || selectedAttributeValue == ""){
    	selectionDisplayObj.innerHTML = "&nbsp;";
    }else{
    	selectionDisplayObj.innerHTML = selectedAttributeValue;
    }

	if (selectedAlternateImageFieldValue != "" ){
		updateSwatchAlternateImage(selectedAlternateImageFieldValue, alternateImageLayerId);
	}else{
		if (alternateImage != ""){
			updateSwatchAlternateImage(defaultAlternateImageFieldValue, alternateImageLayerId);
		}
	}

}

function swatchSelectorMouseOnClick(colorSize, descriptor, description, type, alternateImageLayerId, alternateImage, attributeElementIndexCount, swatchesInAttributeCount, selectorObj){

	var selectorObjId = selectorObj.id;
	var selectorCoordinates = selectorObjId.split("_");
	var ensembleIndex = selectorCoordinates[1];
	var productFamilyIndex = selectorCoordinates[2];
	var attributeIndex = selectorCoordinates[3];
	var attributeElementIndex = selectorCoordinates[4];

	var currentSwatchIndex =  ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex;
	var selectionDisplayField = "selectedAttributeTextDisplay_" + currentSwatchIndex;
	var selectionDisplayObj = document.getElementById(selectionDisplayField);
	var selectionDisplayValue = selectionDisplayObj.innerHTML;

	var selectedAttribueField = "selectedAttributePlaceholder_" + currentSwatchIndex;
	var selectedAttributeObj = document.getElementById(selectedAttribueField);
	var selectedAttributeValue = selectedAttributeObj.value;

	var defaultAlternateImageField = "default_alternate_image_" + currentSwatchIndex;
	var defaultAlternateImageFieldObj = document.getElementById(defaultAlternateImageField);
	var defaultAlternateImageFieldValue = defaultAlternateImageFieldObj.value;

	var selectedAlternateImageField = "selected_alternate_image_" + currentSwatchIndex;
	var selectedAlternateImageFieldObj = document.getElementById(selectedAlternateImageField);
	var selectedAlternateImageFieldValue = selectedAlternateImageFieldObj.value;

	var swatchAttributeCountVarName = "attributeCount_" + ensembleIndex + "_" + productFamilyIndex;
	var swatchAttributeCount = eval(swatchAttributeCountVarName);

	resetSwatchValidationMessages(ensembleIndex, productFamilyIndex, swatchAttributeCount);

	var isSelectionPerformed = toggleSwatchSelector(ensembleIndex, productFamilyIndex, attributeIndex, attributeElementIndex, swatchesInAttributeCount, colorSize);
	var selectedAttribueCodeField = "selected_attribute_code_" + currentSwatchIndex;
	var selectedAttributeCodeObj = document.getElementById(selectedAttribueCodeField);
	var selectedAttributeCodeValue = selectedAttributeCodeObj.value;

	if (isSelectionPerformed){
		selectedAttributeCodeObj.value = colorSize;
		var isSelectionValid = validateSelectedSwatches(ensembleIndex, productFamilyIndex, swatchAttributeCount);
		if (isSelectionValid){
			selectionDisplayObj.innerHTML = description;
			selectedAttributeObj.value = description;
			selectedAlternateImageFieldObj.value = alternateImage;

			if (alternateImage != "" ){
				updateSwatchAlternateImage(alternateImage, alternateImageLayerId);
			}

		}else{
			var unavailableMessage = "";
			if (isOptionsPage){
				var unAvailableVariant = eval("unAvailableVariantsMap_" + ensembleIndex + "_" + productFamilyIndex);
			    var variantAvailability = unAvailableVariant[colorSize];
				if (! variantAvailability){
				    // no message, variant is available
				}else{
					unavailableMessage = description + " - " + variantAvailability;
				}
			}else{
				unavailableMessage = description + " is not available";
			}

			var swatchSelectorLayerName = "selectorLayer_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex + "_" + attributeElementIndex;
			var swatchSelectorLayer =  document.getElementById(swatchSelectorLayerName);
			swatchSelectorLayer.className = "customSwatchUnavailable";
			imsSwatchHoverCSS = 'customSwatchUnavailable';
			selectionDisplayObj.innerHTML = unavailableMessage;
			selectedAttributeObj.value = unavailableMessage;
		}

	}else{

		selectionDisplayObj.innerHTML = "&nbsp;";
		selectedAttributeObj.value = "";
		selectedAttributeCodeObj.value = "";
		selectedAlternateImageFieldObj.value = "";

		if (selectedAlternateImageFieldValue != "" ){
			updateSwatchAlternateImage(defaultAlternateImageFieldValue, alternateImageLayerId);
		}

		resetInvalidAttributesSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, "clean");

	}
	evaluateSwatchSelections(ensembleIndex, productFamilyIndex, attributeIndex, swatchAttributeCount)
}

function preValidateSwatchSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, attributeIndex, colorSize){

	var swatchAttributeCombinationsMap = eval("variantsMap_" + ensembleIndex + "_" + productFamilyIndex);
	var unAvailableVariant = eval("unAvailableVariantsMap_" + ensembleIndex + "_" + productFamilyIndex);
	var attribueCodeField = "selected_attribute_code_" + ensembleIndex + "_" + productFamilyIndex  + "_";
	var result = "";
	var variantAvailability = "";

	switch(swatchAttributeCount){
	case 1:
		var firstAttributeCode = colorSize;
		if ( !isSwatchAttributeEmpty(firstAttributeCode) ){
			result = swatchAttributeCombinationsMap[firstAttributeCode];
		    if (! result){
			 	return false;
			}else{
			    variantAvailability = unAvailableVariant[firstAttributeCode];
				if (! variantAvailability){
				    return true;
				}else{
				    return false;
				}
			}
		}
		break;
	case 2:
		if (attributeIndex == 1){
			var secondAttributeCode = document.getElementById(attribueCodeField + 2).value;
			if ( !isSwatchAttributeEmpty(secondAttributeCode) ){
				var attributeCombinationKey = colorSize + ":" + secondAttributeCode;
				result = swatchAttributeCombinationsMap[attributeCombinationKey];
				if (! result){
					return false;
				}else{
					variantAvailability = unAvailableVariant[attributeCombinationKey];
					if (! variantAvailability){
						return true;
					}else{
						return false;
					}
				}
			}else{
				return true;
			}
		}else if(attributeIndex == 2){
			var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
			if ( !isSwatchAttributeEmpty(firstAttributeCode) ){
				var attributeCombinationKey = firstAttributeCode + ":" + colorSize;
				result = swatchAttributeCombinationsMap[attributeCombinationKey];
				if (! result){
					return false;
				}else{
					variantAvailability = unAvailableVariant[attributeCombinationKey];
					if (! variantAvailability){
						return true;
					}else{
						return false;
					}
				}
			}else{
				return true;
			}
	    }
		break;
	case 3:
			if (attributeIndex == 1){
				var secondAttributeCode = document.getElementById(attribueCodeField + 2).value;
				var thirdAttributeCode = document.getElementById(attribueCodeField + 3).value;

				if ( !isSwatchAttributeEmpty(secondAttributeCode) && !isSwatchAttributeEmpty(thirdAttributeCode) ){
					var attributeCombinationKey = colorSize + ":" + secondAttributeCode  + ":" + thirdAttributeCode;
					result = swatchAttributeCombinationsMap[attributeCombinationKey];
					if (! result){
						return false;
					}else{
						variantAvailability = unAvailableVariant[attributeCombinationKey];
						if (! variantAvailability){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return true;
				}
			} else if(attributeIndex == 2){
				var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
				var thirdAttributeCode = document.getElementById(attribueCodeField + 3).value;

				if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(thirdAttributeCode) ){
					var attributeCombinationKey = firstAttributeCode + ":" + colorSize + ":" + thirdAttributeCode;
					result = swatchAttributeCombinationsMap[attributeCombinationKey];
					if (! result){
						return false;
					}else{
						variantAvailability = unAvailableVariant[attributeCombinationKey];
						if (! variantAvailability){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return true;
				}
			} else if(attributeIndex == 3){
				var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
				var secondAttributeCode = document.getElementById(attribueCodeField + 2).value;

				if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(secondAttributeCode) ){
					var attributeCombinationKey = firstAttributeCode + ":" + secondAttributeCode + ":" + colorSize;
					result = swatchAttributeCombinationsMap[attributeCombinationKey];
					if (! result){
						return false;
					}else{
						variantAvailability = unAvailableVariant[attributeCombinationKey];
						if (! variantAvailability){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return true;
				}
			}
	default:
		break;
	}

}

function validateSelectedSwatches(ensembleIndex, productFamilyIndex, swatchAttributeCount){

	var swatchAttributeCombinationsMap = eval("variantsMap_" + ensembleIndex + "_" + productFamilyIndex);
	var unAvailableVariant = eval("unAvailableVariantsMap_" + ensembleIndex + "_" + productFamilyIndex);
	var attribueCodeField = "selected_attribute_code_" + ensembleIndex + "_" + productFamilyIndex  + "_";
	var result = "";
	var variantAvailability = "";

	switch(swatchAttributeCount){
	case 1:
		var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
		if ( !isSwatchAttributeEmpty(firstAttributeCode) ){
			result = swatchAttributeCombinationsMap[firstAttributeCode];
		    if (! result){
			 	return false;
			}else{
			    variantAvailability = unAvailableVariant[firstAttributeCode];
				if (! variantAvailability){
				    return true;
				}else{
				    return false;
				}
			}
		}
		break;
	case 2:
		var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
		var secondAttributeCode = document.getElementById(attribueCodeField + 2).value;

		if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(secondAttributeCode) ){
			var attributeCombinationKey = firstAttributeCode + ":" + secondAttributeCode;
			result = swatchAttributeCombinationsMap[attributeCombinationKey];
		    if (! result){
			 	return false;
			}else{
				resetInvalidAttributesSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, "select");
			    variantAvailability = unAvailableVariant[attributeCombinationKey];
				if (! variantAvailability){
				    return true;
				}else{
				    return false;
				}
			}
		}
		break;
	case 3:
		var firstAttributeCode = document.getElementById(attribueCodeField + 1).value;
		var secondAttributeCode = document.getElementById(attribueCodeField + 2).value;
		var thirdAttributeCode = document.getElementById(attribueCodeField + 3).value;

		if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(secondAttributeCode) && !isSwatchAttributeEmpty(thirdAttributeCode) ){
			var attributeCombinationKey = firstAttributeCode + ":" + secondAttributeCode + ":" + thirdAttributeCode;
			result = swatchAttributeCombinationsMap[attributeCombinationKey];
		    if (! result){
			 	return false;
			}else{
				resetInvalidAttributesSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, "select");
			    variantAvailability = unAvailableVariant[attributeCombinationKey];
				if (! variantAvailability){
				    return true;
				}else{
				    return false;
				}
			}
		}
		break;
	default:
	}
	return true;
}

function resetInvalidAttributesSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount, operationType){

   for (var k=1;k <= swatchAttributeCount; k++){

     var currentSwatchesCount = eval("swatchesCount_" + ensembleIndex + "_" + productFamilyIndex + "_" + k);

	 for (var m=1; m <= currentSwatchesCount; m++ ){
		var currentSelector = document.getElementById("selectorLayer_" + ensembleIndex + "_" + productFamilyIndex + "_" + k + "_" + m  );

		if (operationType == "select" && currentSelector.className == "customSwatchUnavailable"){
			currentSelector.className = "customSwatchSelected";
		}else if (operationType == "clean" && currentSelector.className == "customSwatchUnavailable"){

			var selectionDisplayField = "selectedAttributeTextDisplay_" + ensembleIndex + "_" + productFamilyIndex + "_" + k;
			var selectionDisplayObj = document.getElementById(selectionDisplayField);
			selectionDisplayObj.innerHTML = "&nbsp;";

			var selectedAttribueField = "selectedAttributePlaceholder_" + ensembleIndex + "_" + productFamilyIndex + "_" + k;
			var selectedAttributeObj = document.getElementById(selectedAttribueField);
			selectedAttributeObj.value = "";

			var selectedAttribueCodeField = "selected_attribute_code_" + ensembleIndex + "_" + productFamilyIndex + "_" + k;
			var selectedAttributeCodeObj = document.getElementById(selectedAttribueCodeField);
			selectedAttributeCodeObj.value = "";

			currentSelector.className = "customSwatchUnselected";
		}

	 }

   }

}

function clearInvalidSelections(ensembleIndex, productFamilyIndex, swatchAttributeCount){
	var currentSwatchIndex =  ensembleIndex + "_" + productFamilyIndex;
	for (var k=1;k<=swatchAttributeCount;k++){
			var selectionDisplayField = "selectedAttributeTextDisplay_" + currentSwatchIndex + "_" + k;
			var selectionDisplayObj = document.getElementById(selectionDisplayField);
			var selectionDisplayValue = selectionDisplayObj.innerHTML;

			var selectedAttribueField = "selectedAttributePlaceholder_" + currentSwatchIndex + "_" + k;
			var selectedAttributeObj = document.getElementById(selectedAttribueField);
			var selectedAttributeValue = selectedAttributeObj.value;

			if (selectionDisplayValue.indexOf("is not available") > -1){
				selectionDisplayObj.innerHTML = selectionDisplayValue.replace("is not available", "");
				selectedAttributeObj.value = selectedAttributeValue.replace("is not available", "");
			}
	}
}

function isSwatchAttributeEmpty(attributeValue) {
	   if ((attributeValue.length==0) || (attributeValue==null)) {
	      return true;
	   }
	   else { return false; }
}

function evaluateSwatchSelections(ensembleIndex, productFamilyIndex, attributeIndex, swatchAttributeCount){

	var swatchAttributeCombinationsMap = eval("variantsMap_" + ensembleIndex + "_" + productFamilyIndex);
	var attributeCodeField = "selected_attribute_code_" + ensembleIndex + "_" + productFamilyIndex  + "_";
	var result = "";

	switch(swatchAttributeCount){
	case 1:
		var firstAttributeCode = document.getElementById(attributeCodeField + 1).value;
		if ( !isSwatchAttributeEmpty(firstAttributeCode) ){
			result = swatchAttributeCombinationsMap[firstAttributeCode];
		}
		break;
	case 2:
		var firstAttributeCode = document.getElementById(attributeCodeField + 1).value;
		var secondAttributeCode = document.getElementById(attributeCodeField + 2).value;

		if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(secondAttributeCode) ){
			result = swatchAttributeCombinationsMap[firstAttributeCode + ":" + secondAttributeCode];
		}
		break;
	case 3:
		var firstAttributeCode = document.getElementById(attributeCodeField + 1).value;
		var secondAttributeCode = document.getElementById(attributeCodeField + 2).value;
		var thirdAttributeCode = document.getElementById(attributeCodeField + 3).value;

		if ( !isSwatchAttributeEmpty(firstAttributeCode) && !isSwatchAttributeEmpty(secondAttributeCode) && !isSwatchAttributeEmpty(thirdAttributeCode) ){
			result = swatchAttributeCombinationsMap[firstAttributeCode + ":" + secondAttributeCode + ":" + thirdAttributeCode];
		}
		break;
	default:
	}

	if (! result){
		result = "";
	}

	if (isEnsemble){
		var productVariantIdObj = eval("document.productForm.productVariantId_" + ensembleIndex);
		productVariantIdObj.value = result;
	}else{
		document.getElementById("productVariantId").value = result;
	}
}

function toggleSwatchSelector(ensembleIndex, productFamilyIndex, attributeIndex, attributeElementIndex, swatchesInAttributeCount, colorSize){
	var toggleResult = false;
	var swatchSelectorLayerName = "selectorLayer_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex + "_" + attributeElementIndex;
	var swatchSelectorLayer =  document.getElementById(swatchSelectorLayerName);
	var selectorClassName = swatchSelectorLayer.className;

	var currentAttributeCode = document.getElementById("selected_attribute_code_" + ensembleIndex + "_" + productFamilyIndex + "_" + attributeIndex);
	if (isSwatchAttributeEmpty(currentAttributeCode.value)){
		swatchSelectorLayer.className = 'customSwatchSelected';
		imsSwatchHoverCSS = 'customSwatchSelected';
		toggleResult = true;
	}else{
		if (currentAttributeCode.value == colorSize){
			swatchSelectorLayer.className = 'customSwatchUnselected';
			imsSwatchHoverCSS = 'customSwatchUnselected';
			toggleResult = false;
		}else{
			resetSwatchSelectors(swatchSelectorLayerName,swatchesInAttributeCount);
			swatchSelectorLayer.className = 'customSwatchSelected';
			imsSwatchHoverCSS = 'customSwatchSelected';
			toggleResult = true;
		}
	}

	return toggleResult;

}

function resetSwatchSelectors(swatchSelectorLayerName,swatchesInAttributeCount){
    var swatchSelectorPrefix = swatchSelectorLayerName.substr(0,swatchSelectorLayerName.lastIndexOf('_') + 1) ;
	for (var j=1;j<=swatchesInAttributeCount;j++){
		try{
			var swatchSelector = document.getElementById(swatchSelectorPrefix + j);
			swatchSelector.className = "customSwatchUnselected";
		}catch(e){
		    continue;
		}
	}
}

function resetSwatchValidationMessages(ensembleIndex, productFamilyIndex, swatchAttributeCount){
	var currentSwatchIndex =  ensembleIndex + "_" + productFamilyIndex;
	for (var k=1;k<=swatchAttributeCount;k++){
		try{
			var selectionDisplayField = "selectedAttributeTextDisplay_" + currentSwatchIndex + "_" + k;
			var selectionDisplayObj = document.getElementById(selectionDisplayField);
			var selectionDisplayValue = selectionDisplayObj.innerHTML;

			var selectedAttribueField = "selectedAttributePlaceholder_" + currentSwatchIndex + "_" + k;
			var selectedAttributeObj = document.getElementById(selectedAttribueField);
			var selectedAttributeValue = selectedAttributeObj.value;

			if (selectionDisplayValue.indexOf("is not available") > -1){
				selectionDisplayObj.innerHTML = selectionDisplayValue.replace("is not available", "");
				selectedAttributeObj.value = selectedAttributeValue.replace("is not available", "");
			}
		}catch(e){
		    continue;
		}
	}
}

function updateSwatchAlternateImage(alternateImage, alternateImageLayerId){

	if (!isOptionsPage){
		var imgWidget = "#entityImageWidget_" + alternateImageLayerId;

		if ($(imgWidget).length){
			imsSwatchOriginalImage = ImageWidget.getImageSrc(imgWidget);// store original image
			var fileURL = alternateImage;
			ImageWidget.setImageSrc(imgWidget, ImageWidget.getImageSrc(imgWidget), fileURL);
			imsSwatchImageReplaced = true;
			var zoomObjectName = "#ZoomPanel_" + alternateImageLayerId + "_EntityZoom_Zoom";
            if(typeof BaseZoomWidget != "undefined"){
			    BaseZoomWidget.onUpdateImage(zoomObjectName , window.event, fileURL); // Event.CLICK
            }

		}else{

			// for mobile
			var mobileImgObj = document.getElementById("mobileAltImage_" + alternateImageLayerId);

			if (mobileImgObj){
				mobileImgObj.src = "http://s7d4.scene7.com/is/image/imsdm/" + alternateImage + "?$saMain$";
			}

		}

	}
}

// handle previous radio button implementations
function preSelectProductFamily(isEnsemblePage,ensembleNo, radioIndexNo){

	var radioName = "";

	if (isEnsemblePage == true){
		radioName = "relatedProductId_" + ensembleNo + "[" + radioIndexNo + "]";
	}else{
		radioName = "relatedProductId[" + radioIndexNo + "]";
	}

	var radioObject = document.getElementById(radioName);

	if (radioObject){
		radioObject.checked = true;
		selectSwatchesGroup(ensembleNo,radioIndexNo);
	}

}

function selectSwatchesGroup(ensembleIndex,selectorIndex){
	var swatchGroupIndex = selectorIndex;
	var layerName = "swatchSelectorDiv_" + ensembleIndex + "_" + swatchGroupIndex;
	var selectedLayer = document.getElementById(layerName);
	resetSwatchesGroup(layerName, 10);
	selectedLayer.style.display = "block";
}

function resetSwatchesGroup(currObjectName, totalSwatchCount){
	var tempName = currObjectName;
	tempName = tempName.substr(0,tempName.lastIndexOf('_') + 1) ;
	for (var j=0;j<=totalSwatchCount;j++){
		try{
			var myobj = document.getElementById(tempName + j);
			myobj.style.display = "none";
		}catch(e){
			continue;
		}
	}
}

function setWardsProductFamilyOptions(productFamilySelectBox, ensembleIndex){

	var selectedOption = productFamilySelectBox.selectedIndex;
	var optionsCount =  productFamilySelectBox.options.length;
	optionsCount = optionsCount -1;

	resetSwatchesGroup("swatchSelectorDiv_" + ensembleIndex + "_0",  optionsCount);

	if (selectedOption >=1){

		var productFamilySelectorLayer = document.getElementById("swatchSelectorDiv_" +  ensembleIndex + "_" + (selectedOption - 1));

		if (productFamilySelectorLayer){
			productFamilySelectorLayer.style.display = "block";
		}else{
			// this part is integrated from old wards code
	    	var variantValueFromSelectBox = productFamilySelectBox.value;
		    var oProduct = findSelectedProduct(variantValueFromSelectBox);
		    if (oProduct != 'null') {
		        setSelectedProductValues(oProduct.prodVariantId, oProduct.prefixCode);
		    }

		}

	}

}

function setProductOtherValues(prefixCode){

	document.getElementById("prefixCode").value = prefixCode;

}
