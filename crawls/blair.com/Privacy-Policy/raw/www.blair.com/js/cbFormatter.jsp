



// This is an example of sending product data from the server
// to the client, then formatting the variants on the client-side
// based on certain criteria.
function cbFormatter(list, attribute, opt)
{
	// Get the price for this variant.. If this is the primary list, get all related
	// variants from the group and get their prices as well so we can build a range.
	var pvds = list.productVariantDropdownSupport;

	// Get all of the product variants for this attribute
	var variantGroup = attribute.getVariant().getProductVariantGroup();
	var groupVariants = variantGroup.getAllVariants()

	// Are all of the prices the same within the group?
	var lowGroupPrice = 999999.00;
	var highGroupPrice = -1.00;

    for (var idx = 0; idx < groupVariants.length; idx++)
	{
      lowGroupPrice = groupVariants[idx].numericPrice < lowGroupPrice ? groupVariants[idx].numericPrice : lowGroupPrice;
		highGroupPrice = groupVariants[idx].numericPrice > highGroupPrice ? groupVariants[idx].numericPrice : highGroupPrice;
    }

	// Are all of the prices the same within the variant?
	var variants = variantGroup.getVariantsMatching(attribute.name, attribute.value);
	var lowVariantPrice = 999999.00;
	var highVariantPrice = -1.00;

	var lowVariantDisplay = variants[0].displayPrice;
	var highVariantDisplay = variants[0].displayPrice;

   for (var idx = 0; idx < variants.length; idx++)
   {
		// Display really needs to be done before the re-assignment...
      lowVariantDisplay = variants[idx].numericPrice < lowVariantPrice ? variants[idx].displayPrice : lowVariantDisplay;
      lowVariantPrice = variants[idx].numericPrice < lowVariantPrice ? variants[idx].numericPrice : lowVariantPrice;
      highVariantDisplay = variants[idx].numericPrice > highVariantPrice ? variants[idx].displayPrice : highVariantDisplay;
		highVariantPrice = variants[idx].numericPrice > highVariantPrice ? variants[idx].numericPrice : highVariantPrice;
   }

	if (lowGroupPrice != highGroupPrice)
	{   
		// Primary list should display a range

if (lowGroupPrice != highGroupPrice)
{
    // If this is the final (or last dropdown) then show price

    if (pvds.isFinal) {
    if (opt.text.indexOf("-") == -1) {
        opt.text = opt.text + " " + attribute.getVariant().displayPrice;
    } else {
        opt.text = opt.text.replace("-", " - " + attribute.getVariant().displayPrice);
    }
}
    else
        opt.text = opt.text;
}
	}

   return opt;
}

// This is an example of sending product data from the server
// to the client, then formatting the variants on the client-side
// based on certain criteria.
function cbFormatterFREE(list, attribute, opt)
{
	// Get the price for this variant.. If this is the primary list, get all related
	// variants from the group and get their prices as well so we can build a range.
	var pvds = list.productVariantDropdownSupport;

	// Get all of the product variants for this attribute
	var variantGroup = attribute.getVariant().getProductVariantGroup();
	var groupVariants = variantGroup.getAllVariants()

	// Are all of the prices the same within the group?
	var lowGroupPrice = 999999.00;
	var highGroupPrice = -1.00;

	for (var idx = 0; idx < groupVariants.length; idx++)
	{
      lowGroupPrice = groupVariants[idx].numericPrice < lowGroupPrice ? groupVariants[idx].numericPrice : lowGroupPrice;
		highGroupPrice = groupVariants[idx].numericPrice > highGroupPrice ? groupVariants[idx].numericPrice : highGroupPrice;
    }

	// Are all of the prices the same within the variant?
	var variants = variantGroup.getVariantsMatching(attribute.name, attribute.value);
	var lowVariantPrice = 999999.00;
	var highVariantPrice = -1.00;

	var lowVariantDisplay = variants[0].displayPrice;
	var highVariantDisplay = variants[0].displayPrice;

   for (var idx = 0; idx < variants.length; idx++)
   {
		// Display really needs to be done before the re-assignment...
      lowVariantDisplay = variants[idx].numericPrice < lowVariantPrice ? variants[idx].displayPrice : lowVariantDisplay;
      lowVariantPrice = variants[idx].numericPrice < lowVariantPrice ? variants[idx].numericPrice : lowVariantPrice;
      highVariantDisplay = variants[idx].numericPrice > highVariantPrice ? variants[idx].displayPrice : highVariantDisplay;
		highVariantPrice = variants[idx].numericPrice > highVariantPrice ? variants[idx].numericPrice : highVariantPrice;
   }

   return opt;
}