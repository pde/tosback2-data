/*
 * Copyright (c) 2012. Fry, Inc. (A MICROS-Retail Company)
 * All Rights Reserved.  Any commercial use, copying, or redistribution of this
 * work is STRICTLY FORBIDDEN without the express written consent of
 * MICROS-Retail, or one of its subsidiaries.
 *
 * Supporting JavaScript for variant dropdowns on product and
 * ensemble pages.  When the swatch is changed, a "variantselected" event
 * will be triggered on the element which contains the variant
 * selectMenus.
 *
 * A substantial rewrite (sshepard 2012/06/01) supports more flexible HTML, expects the dropdowns to
 * be pre-populated from the server, makes debugging and run-time modification easier by moving all
 * functions into "site" namespace.
 *
 * @author Brett Fattori(bfattori@fry.com)
 * @author $Author: smalik $
 * @version $Revision: 1.2 $
 */

if (!site.variants) { site.variants = {}; }

/**
 * Variant-based Events are stored in site.variants.events
 */
site.variants.events = { swatch:{}, variantDropdown:{} };

/**
 * Behavior for when a swatch is clicked.
 *
 * usage li.click(site.variants.events.swatch.click);
 */
site.variants.events.swatch.click = function(el, productId, attributeName){
	// Update the corresponding dropdown, passing the swatch, product Id, and attribute
	site.variants.updateCorrespondingDropdown(el, productId, attributeName);
	site.variants.swapMainImage(el, productId);

	// Toggle which swatch is "selected"
	$("li", el.parent()).removeClass(site.variants[productId].options.selectedSwatchClass);
	el.addClass(site.variants[productId].options.selectedSwatchClass);
};

/**
 * Behavior for when a select menus is changed.
 *
 * usage li.click(site.variants.events.variantDropdown.change);
 */
site.variants.events.variantDropdown.change = function(el){
	var s = $(el);

	// Fill in the values for the next subsequent selector
	site.variants.process(s);
};


// Either un-comment the event listener, or use an onclick attribute for greater resiliency.
/*
$(document).ready(function() {
	$("div.variants select").change(site.variants.events.variantDropdown.change);
});
*/



// Used to keep the swatches and dropdown from performing an infinite loop
site.variants.synchronizing = false;

/**
 * Initialize a variant matrix for a product.
 *	@param options {Object} An object containing optional features:
 * 	<ul>
 * 		<li>productId {Number} The product Id</li>
 * 		<li>attributeSystemNames {Array} An array of product attribute names</li>
 * 		<li>attributeValues {Array} An array of product attribute values</li>
 * 		<li>matrix {Object} A JavaScript object with translated variant values</li>
 * 		<li>showSwatches {Boolean} <code>true</code> to enable swatches [default: false]</li>
 * 		<li>selectedVariantId {Number} The Id of the selected variant [default: null]</li>
 *		<li>primaryImageSelector {String} The selector string which the swatch with swap with [default: img.primary]</li>
 * 		<li>mainImageWidth {Number} The pixel width of the primage image </li>
 * 		<li>mainImageHeight {Number} The pixel height of the primage image </li>
 * 		<li>swatchWidth {Number} The pixel width of the swatch image </li>
 * 		<li>swatchHeight {Number} The pixel height of the swatch image </li>
 * 		<li>unavailableSwatchClass {String} The class name to apply to the DIV which overlays unavailable swatches [default: faded]</li>
 * 		<li>swatchContainer {String} The selector which represents the swatch UL</li>
 * 		<li>additionalSwatchUrlProps {string} additional properties to send to the image provider when creating swatches.</li>
 * 	</ul>
 */
site.variants.initProductMatrix = function(options) {
	var productId = options.productId;
	var attributeSystemNames = options.attributeSystemNames;
	site.variants[productId] = {};
	site.variants[productId].productId = options.productId;
	site.variants[productId].attributeSystemNames = attributeSystemNames;
	site.variants[productId].attributeValues = options.attributeValues;
	site.variants[productId].matrix = options.matrix;
	site.variants[productId].options = $.extend({
		selectedVariantId: null,
		showSwatches: false,
		primaryImageSelector: "img.primary",
		swatchContainer: "div.swatches ul",
		unavailableSwatchClass: "faded",
		selectedSwatchClass: "selected",
		swatchWidth:27,
		swatchHeight:12,
		mainImageWidth:470,
		mainImageHeight:575,
		additionalSwatchUrlProps:"&fit=crop",
		retainSelections:true,
		variantSelectedEvent:function(){}
	}, options);


	// The values stored in here will speed up lookups
	site.variants[productId].attrNameValues = {};
	site.variants[productId].corrAttrNameValues = {};

	// Populate the attribute names with their unique values and
	// with the corresponding attribute(s) unique values
	for (var av = 0; av < attributeSystemNames.length; av++) {
		site.variants.getAttributeValues(attributeSystemNames[av], productId);
		site.variants.getCorrespondingValues(attributeSystemNames[av], attributeSystemNames, productId);
	}

	// The context element for the variants
	site.variants[productId].context = $("#variants_" + productId);

	// Allow the developer to override the element which is displaying the swatches
	if (options.swatchContainer !== null) {
		site.variants[productId].swatchContainer = $(options.swatchContainer, site.variants[productId].context);
		if (site.variants[productId].swatchContainer.length === 0){
			site.variants[productId].swatchContainer = $(options.swatchContainer);
		}
	}

	//disable all but the first select menu.
	var sel = $("select", site.variants[productId].context);
	for (var i=1,l=sel.length;i<l;i++){
		if (i > 0 && sel[i-1].disabled || sel[i-1].length > 2){
			sel[i].disabled = true;
		}
	}

	// Wire up the backorder messaging for variants.
	// trigger example: site.variants[productId].context.trigger("variantselected", [variant.id, productId, variant.props])
	site.variants[productId].context.bind("variantselected", site.variants[productId].options.variantSelectedEvent);

	// If swatching is enabled, link the swatch list to the
	// proper dropdown element
	if (options.showSwatches) {
		var swatchContainer = site.variants[productId].swatchContainer;
		var linkSelect = $("select[attributeSystemName=" + swatchContainer.attr("attributeSystemName") + "]", site.variants[productId].context);

		if (linkSelect.length !== 0) {
			// When the select is changed, trigger a change on the linked field

			// When the field changes value, we'll update the
			// swatch list to match.
			linkSelect.change(function() {
				site.variants.updateCorrespondingSwatches($(this), productId);
			});

			// Load up the list items with swatch images
			site.variants.populateSwatches(productId, swatchContainer.attr("attributeSystemName"));

			if (swatchContainer.attr("attributeSystemName") == site.variants[productId].attributeSystemNames[0]) {
				// If the primary attribute is the swatched element, enable all swatches
				$("li." + site.variants[productId].options.unavailableSwatchClass, swatchContainer).css("display", "none");
			}
		}
	}

	// Initialize with the defaults
	site.variants.doDefaultSetup(productId, options.selectedVariantId);
};

/**
 * Get the index of an attribute name
 * @param attributeName {String} Name of the attribute
 * @param productId {Number}
 */
site.variants.getAttributeNameIndex = function(attributeName, productId) {
	if (site.variants[productId].attrNameIndexes === undefined) {
		site.variants[productId].attrNameIndexes = {};
		for (var i = 0; i < site.variants[productId].attributeSystemNames.length; i++) {
			site.variants[productId].attrNameIndexes[site.variants[productId].attributeSystemNames[i]] = i;
		}
	}
	return site.variants[productId].attrNameIndexes[attributeName];
};

/**
 * Get the unique values for the given attribute name, for
 * the specified product Id.
 *
 * @param attributeName {String} The name of the attribute
 * @param productId {Number} The Id of the product
 * @return {Array} array of unique values for the given attribute name
 */
site.variants.getAttributeValues = function(attributeName, productId) {
	if (site.variants[productId].attrNameValues[attributeName] === undefined) {
		var t = site.variants.getAttributeNameIndex(attributeName, productId);
		site.variants[productId].attrNameValues[attributeName] = site.variants[productId].attributeValues[t];
	}
	return site.variants[productId].attrNameValues[attributeName];
};

/**
 * Get the available values for the given corresponding attribute name,
 * given the attribute name and product Id.  If attributeName is "SIZE_NAME"
 * and cAttributeName is "COLOR_NAME", get all of the available "COLOR_NAME"
 * values which correspond to the values acquired for "SIZE_NAME".
 *
 * @param attributeName {String} The attribute name
 * @param attributes
 * @param productId
 */
site.variants.getCorrespondingValues = function(attributeName, attributes, productId) {
	var variants = site.variants[productId];
	if (variants.corrAttrNameValues[attributeName] === undefined) {
		var aT = site.variants.getAttributeNameIndex(attributeName, productId);
		variants.corrAttrNameValues[attributeName] = {};
		var vals = site.variants.getAttributeValues(attributeName, productId);
		for (var av = 0; av < vals.length; av++) {
			variants.corrAttrNameValues[attributeName][vals[av]] = {};
			for (var a = 0; a < attributes.length; a++) {
				if (attributes[a] !== attributeName) {
					var t = site.variants.getAttributeNameIndex(attributes[a], productId);
					variants.corrAttrNameValues[attributeName][vals[av]][attributes[a]] = {};
					for (var j in variants.matrix) {
						if (variants.matrix[j].trans[aT] == vals[av]) {
							variants.corrAttrNameValues[attributeName][vals[av]][attributes[a]][variants.matrix[j].trans[t]] = variants.matrix[j].props;
						}
					}
				}
			}
		}
	}
	return site.variants[productId].corrAttrNameValues[attributeName];
};

site.variants.getProps = function(attribute, value, cAttributeName, cAttributeValue, productId) {
	try {
		return (site.variants[productId].corrAttrNameValues[cAttributeName][cAttributeValue][attribute][value]);
	} catch(ex) {
		return null;
	}
};


/**
 * Populate the swatch LI's using the unique values for attributeName in the
 * matrix for product with the given Id
 * @param productId {Number} The Id of the product which contains the swatches
 * @param attributeName {String} The attribute which has the swatch image names
 */
site.variants.populateSwatches = function(productId, attributeName) {
	var swatchContainer = site.variants[productId].swatchContainer;

	// Start fresh
	swatchContainer.empty();
	var options = site.variants[productId].options;

	// The index of the attribute value in the translation
	var attrIdx = $.inArray(attributeName, site.variants[productId].attributeSystemNames);

	// Get the unique swatch images for attributeName from the matrix
	var unique = {};
	for (var k in site.variants[productId].matrix) {
		var props = site.variants[productId].matrix[k].props;
		if (!site.isEmpty(props[attributeName])) {
			unique[props[attributeName]] = {
				name: site.variants[productId].matrix[k].trans[attrIdx],
				recoloredImage: props["RECOLORED_IMAGE"],
				linkVal: props[attributeName]
			};
		}
	}

	// The image should look something like "!imageName", strip off the '!'
	// and make this the image of the LI's we add to the swatch list
	for (var i in unique) {
		(function(){
			// We'll need the swatch image and the recolored image
			var imgName = site.getImageUrl(i.substring(1), options.swatchWidth, options.swatchHeight) + options.additionalSwatchUrlProps;
			var fullImg = !site.isEmpty(unique[i].recoloredImage) ? site.getImageUrl(unique[i].recoloredImage, options.mainImageWidth, options.mainImageHeight) : "";
			var li = $('<li class="swatch">')
				.attr("dropVal", unique[i].name)
				.attr("linkVal", unique[i].linkVal)
				.attr("fullImg", fullImg)
				.click(function(evt){
					  site.variants.events.swatch.click(li, productId, attributeName);
				}).append($('<img src="' + imgName + '" width="' + options.swatchWidth + '" height="' + options.swatchHeight + '" />'));

			swatchContainer.append(li);
		})();

	}
};


/**
 * Modify swatches, enabling or disabling ones that can be clicked.
 *
 * @param productId {Number} The Id of the product which contains the swatches
 * @param attributeName {String} The attribute which has the swatch image names
 * @param cAttributeName {String} (Optional) The corresponding attribute name
 * @param cAttributeValue {String} (Optional) The corresponding attribute value
 */
site.variants.modifySwatches = function(productId, attributeName, cAttributeName, cAttributeValue) {
	// Find the swatches which don't apply to the selected variant
	$("li", site.variants[productId].swatchContainer).each(function() {
		var swatch = $(this);
		var blocker = $("div." + site.variants[productId].options.unavailableSwatchClass, swatch);
		var props = site.variants.getProps(cAttributeName, cAttributeValue, attributeName, swatch.attr("dropVal"), productId);
		if (props !== null && props[attributeName] == swatch.attr("linkVal")) {
			blocker.css("display", "none");
		} else {
			blocker.css("display", "block");
		}
	});
};

/**
 * Swap the main image
 * @param swatch {Object} The jQuery object which represents the swatch
 * @param productId {Number} The Id of the product which contains the swatches
 */
site.variants.swapMainImage = function(swatch, productId) {
	$(site.variants[productId].options.primaryImageSelector).attr("src", swatch.attr("fullImg"));
};

/**
 * Update the dropdown which matches the swatch list.
 * @param swatch {Object} The jQuery object which represents the swatch
 * @param productId {Number} The Id of the product the swatches come from
 * @param attributeName {String} The attribute which contains the swatch
 */
site.variants.updateCorrespondingDropdown = function(swatch, productId, attributeName) {
	if (site.variants.synchronizing) {
		// Prevent infinite loop
		return;
	}
	site.variants.synchronizing = true;
	site.variants.events.variantDropdown.change($("select." + attributeName, site.variants[productId].context).val(swatch.attr("dropVal")).change());
	site.variants.synchronizing = false;
};

/**
 * Update the swatches which match the dropdown.  The linkField will contain the attribute name.
 * @param linkField {Object} The jQuery object which represents the linked field
 * @param productId {Number} The Id of the product the swatches come from
 */
site.variants.updateCorrespondingSwatches = function(linkField, productId) {
	if (site.variants.synchronizing) {
		// Prevent infinite loop
		return;
	}
	site.variants.synchronizing = true;
	var pairedSwatch = $("li[dropVal='" + linkField.val() + "']", site.variants[productId].swatchContainer);
	if (pairedSwatch.length !== 0) {
		pairedSwatch.click();
	} else {
		// They must've selected the default ("Select One")
		$("li", site.variants[productId].swatchContainer).removeClass(site.variants[productId].options.selectedSwatchClass);
	}
	site.variants.synchronizing = false;
};

site.variants.getVariant = function(selectedValues, productId){
	var variantKey = [];
	$.each(selectedValues, function(idx, val) {
		variantKey.push($.inArray(val, site.variants[productId].attributeValues[idx]));
	});
	if (variantKey.length < 2) { return null; }
	variantKey = "[" + variantKey.join(",") + "]";
	return site.variants[productId].matrix[variantKey];
};

/**
 * Process the current dropdown's next subsequent dropdown to make sure
* the values correspond to actual available selections.
 * @param dropDown {Object} The dropdown to process
 * @private
 */
site.variants.process = function(dropDown) {
	var productId = dropDown.attr("variantIdent");
	var selectMenus = $("select", site.variants[productId].context);
	var idx = selectMenus.index(dropDown);

	// Build a key which represents the selectMenus up to the currently specified dropdown.
	// Enable/disable the next selectors in line.
	var selectedValues = [];
	for (var i=0,l=selectMenus.length;i<l;i++){
		var val = $(selectMenus[i]).val();
		if (val !== "") {
			selectedValues.push(val);
		}
		if (i > 0 && selectedValues.length < i+1 && val === "" && selectMenus[0].length > 2 && selectMenus[0].selectedIndex === 0) {
			selectMenus[i].disabled = true;
		} else {
			selectMenus[i].disabled = false;
		}
	}
	//if nothing is selected, there's nothing to do here.
	if (selectedValues.length === 0){
		site.variants[productId].context.trigger("variantselected", [null, productId, null]);
		return;
	}

	var nextSel = selectMenus[idx + 1];
	var nextJQ = $(nextSel);

	var currVal = "";
	// Reset the next selector if there is one
	if (nextJQ.length > 0){
		currVal = nextJQ.val();
		nextJQ.empty();
		var name = nextJQ.attr("variantType");
		nextJQ.append($("<option value=''>Select " + name + "</option>"));
	} else {
		currVal = $(selectMenus[idx]).val();
		nextJQ = dropDown;
		nextSel = nextJQ[0];
	}

	// Using the selectedValues, up to this point, get all possible values
	var lookup = selectedValues.slice(idx, selectMenus.length - (idx + 1));


	if (lookup.length !== 0) {
		// For each selectedValues index, find the corresponding index in the values array.
		// Build a lookup key which will help us find values for the next dropwdown
		for (var k in lookup) {
			lookup[k] = $.inArray(lookup[k], site.variants[productId].attributeValues[idx]);
		}

		// Convert the key to a string
		var vKey = "[";
		for (var k in lookup) {
			vKey += (vKey.length > 1 ? "," : "") + lookup[k];
		}

		// Peruse the matrix of variant combinations and collect values
		// for the dropdown which match the partial key
		var iVals = [];
		for (k in site.variants[productId].matrix) {
			var nextElem;
			if (k.indexOf(vKey) === 0) {
				// This is a match, grab the "next" element
				nextElem = parseInt(k.split(",")[idx + 1]);
				// Grab the indexed value
				var optVal = site.variants[productId].attributeValues[idx + 1][nextElem];
				var variant = site.variants[productId].matrix[k];
				var price = variant.props ? variant.props.price : "";
				var displayText = optVal + (price ? " (" + price + ")" : "");
				// Add to the next selector
				nextJQ.append($('<option value="' + optVal + '" title="' + displayText + '">' + displayText + '</option>'));
				iVals.push(optVal);
			}
		}
		if (iVals.length > 0){ nextSel.disabled = false; }

	}
	if (site.variants[productId].options.retainSelections){

		/* Sheplers customization. Size menu options contain availability messages.
			We remove them when comparing to retain the previous selection.
		*/
		//nextJQ.val(currVal); //normal value retaining method.
		currVal = currVal.split(" - ")[0];
		var options = nextSel.options;
		for (var i=0,l=options.length;i<l;i++){
			if (currVal === options[i].value.split(" - ")[0]){
				nextJQ.val(options[i].value);
				selectedValues[1] = options[i].value;
				break;
			}
		}
		//If there are no valid values in the next menu, then disable it.
		if (nextJQ.val() === "" && nextSel && nextSel.length < 2 && selectMenus[0].length > 2) {
			nextSel.disabled = true;
		}

	} else {
		// Reset all of the subsequent selectMenus to "Select [Option]"
		selectMenus.each(function(j) {
			if (j > idx) {
				this.selectedIndex = 0;
			}
		});
	}

	// Trigger the event "variantselected" on the appropriate "variants" div, which should
	// clear the display message (variantId is -1 and props is null)
	var variant = site.variants.getVariant(selectedValues, productId) || {};
	var form = document.productForm || document.editItemForm;
	form.productVariantId.value = variant.id || "";
	site.variants[productId].context.trigger("variantselected", [variant.id || null, productId, variant.props || null]);

	//When Size is the primary key, allow swatches to update when size is changed.
	if (site.variants[productId].options.showSwatches) {
		if (dropDown.attr("attributeSystemName") == "SIZE_NAME" && nextJQ.attr("attributeSystemName") == "COLOR_NAME") {
			site.variants.modifySwatches(productId, "COLOR_NAME", "SIZE_NAME", dropDown.val());
		}
	}
};

/**
 * If there's a variant already selected, we need to default to it
 *
 * @param productId {Number} The Id of the product
 * @param initialSelection {Number} The initial variant selection Id, or null
 * @private
 */
site.variants.doDefaultSetup = function(productId, initialSelection) {
	// Perform a reverse lookup
	var found = false, r;
	var form = document.productForm || document.editItemForm;
	var matrix = site.variants[productId].matrix;
	for (r in matrix) {
		if ((matrix[r].id == initialSelection) || (!initialSelection && (r === '[0,-1]' || r === '[-1,0]' || r === '[-1,-1]'))) {
			found = true;

			// Trigger the event "variantselected" on the appropriate "variants" div, passing
			// the variant Id, product Id, and variant properties
			var variant = matrix[r];
			form.productVariantId.value = variant.id || "";
			site.variants[productId].context.trigger("variantselected", [variant.id, productId, variant.props]);
			break;
		}
	}

	if (found) {
		// We'll turn the key back into an array - this gives us the
		// lookup indexes for each display attribute
		r = r.substr(1, r.length - 2).split(",");
		for (var x in r) {
			r[x] = parseInt(r[x]);
		}

		// Fill out all of the selectMenus and enable them
		// (if there are any)
		if (site.variants[productId].attributeValues.length !== 0) {
			$("select", site.variants[productId].context).each(function(i) {
				this.disabled = false;

				// Since we're doing a reverse lookup on a valid variant Id, we'll
				// set the hidden field to a value (if it doesn't already have one)
				var p = $("input[type=hidden][name=" + site.variants[productId].attributeSystemNames[i] + productId + "]", site.variants[productId].context);
				if (site.isEmpty(p.val())) {
					p.val(site.variants[productId].attributeValues[i][r[i]]);
				}

				site.variants.process($(this));

				// Set the value of the selector
				$("select." + site.variants[productId].attributeSystemNames[i], site.variants[productId].context).val(site.variants[productId].attributeValues[i][r[i]]);
			});
		}
	}
};


