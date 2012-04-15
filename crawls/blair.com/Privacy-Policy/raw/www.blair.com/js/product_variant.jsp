





//---------------------------------------------
// OCP Framework
// Corresponding Javascript Object Lib
//
// Convention: __[name] == private variable or
//                         method of class.
//---------------------------------------------

// Product variant attribute object

function VariantAttribute(attribName, attribValue, /*optional*/ variant)
{
   // Store name and value pair
   this.name = attribName.toUpperCase();
   this.value = attribValue;
   this.matched = false;

   // This is the variant that this
   // attribute belongs to
   if (arguments.length == 3)
      this.__variant = variant;
   else
      this.__variant = null;
}

function varattr_getVariant()
{
   return this.__variant;
}

function varattr_equals(attrib)
{
   return ((this.name == attrib.name) && (this.value == attrib.value));
}

VariantAttribute.prototype.getVariant     = varattr_getVariant;
VariantAttribute.prototype.equals         = varattr_equals;

//----------------------------------------------------------------------------------

// Product variant

function Variant(/*optional*/ prodVarGroup)
{
   // This will be the VariantAttribute(s)
   // for a product
   this.__attributes = new Array();

   // This is the unique ID for this variant
   this.__id = null;

   // This is the unique ID for this variant
   this.__uniqueID = null;

   // When editing an item, this will be set to true
   // if this is the variant that was selected
   this.__selected = false;

   // The product variant group object
   // this variant belongs to
   if (arguments.length == 1)
      this.__productVariantGroup = prodVarGroup;
   else
      this.__productVariantGroup = null;
}

function variant_setSelected()
{
   this.__selected = true;
}

function variant_isSelected()
{
    return this.__selected;
}

function variant_getAttribute(attrib_1)
{
   // If they pass a string, it must be an attribute name
   // otherwise it's an index.  In the first case, return
   // the value.  For the second, return the entire attribute.
   if (typeof attrib_1 == "string")
   {
      for (var idx = 0; idx < this.__attributes.length; idx++)
         if (attrib_1.toUpperCase() == this.__attributes[idx].name) {
            return this.__attributes[idx];
         }
   }
else if ((typeof attrib_1 == "number") &&
        (attrib_1 >= 0 && attrib_1 < this.__attributes.length))
      return this.__attributes[attrib_1];

   // If we didn't find an attribute
   // just return null
   return null;
}

function variant_getUniqueAttribute(attrib_1)
{
  for (var idx = 0; idx < this.__attributes.length; idx++) {
     if (attrib_1 == this.__attributes[idx].uniqueID) {
        return this.__attributes[idx];
     }
  }
   return null;
}

function variant_getAllAttributes()
{
    return this.__attributes;
}

function variant_getAttributeValue(attribName)
{
   var attrib = this.getAttribute(attribName);
   if (attrib != null)
      return attrib.value;
   else
      return undefined;
}


function variant_addAttribute(attribName, attribValue)
{
   // We only set attributes that don't exist
   if (this.getAttribute(attribName) == null)
      this.__attributes[this.__attributes.length] = new VariantAttribute(attribName, attribValue, this);
   else
   {
      // Throw an exception
      var err = new Error("Attribute " + attribName + " already exists in Variant");
      throw err;
   }
}

function variant_size()
{
   return this.__attributes.length;
}

function variant_setId(varID)
{
   this.__id = varID;
}

function variant_getId()
{
   return this.__id;
}

function variant_setUniqueId(varID)
{
   this.__uniqueID = varID;
}

function variant_getUniqueId()
{
   return this.__uniqueID;
}

function variant_equals(variant)
{
   function keyMatch(keyArr, key)
   {
      for (var z = 0; z < keyArr.length; z++)
         if (keyArr[z] == key)
            return true;

      return false;
   }

   var matchKeys = new Array();
   var matchSize = this.__attributes.length;

   for (var x = 0; x < this.size(); x++)
      for (var y = 0; y < variant.size(); y++)
            if (this.getAttribute(x).equals(variant.getAttribute(y)) && !keyMatch(matchKeys, this.getAttribute(x).name))
                matchKeys[matchKeys.length] = this.getAttribute(x).name;

    return (matchKeys.length == this.__attributes.length);
}

function variant_getProductVariantGroup()
{
    return this.__productVariantGroup;
}

Variant.prototype.setSelected             = variant_setSelected;
Variant.prototype.isSelected              = variant_isSelected;
Variant.prototype.getAttribute            = variant_getAttribute;
Variant.prototype.getUniqueAttribute      = variant_getUniqueAttribute;
Variant.prototype.getAllAttributes        = variant_getAllAttributes;
Variant.prototype.addAttribute            = variant_addAttribute;
Variant.prototype.getAttributeValue       = variant_getAttributeValue;
Variant.prototype.setId                   = variant_setId;
Variant.prototype.getId                   = variant_getId;
Variant.prototype.size                    = variant_size;
Variant.prototype.equals                  = variant_equals;
Variant.prototype.getProductVariantGroup  = variant_getProductVariantGroup;
Variant.prototype.setUniqueId             = variant_setUniqueId;
Variant.prototype.getUniqueId             = variant_getUniqueId;

//----------------------------------------------------------------------------------

// Product variant grouping

function ProductVariantGroup()
{
   this.__variants = new Array();
   this.__formField = null;
   this.__variantGroup = null;
}

function pvgroup_setVariantGroup(variantGroupList)
{
   this.__variantGroup = variantGroupList.split(",");
}

function pvgroup_getVariantGroup()
{
    return this.__variantGroup;
}

function pvgroup_setFormField(fieldName)
{
    this.__formField = fieldName;
}

function pvgroup_getFormField()
{
    return this.__formField;
}

function pvgroup_getVariant(arg1)
{
   if (typeof arg1 == "number")
   {
       // Find variant by index number
        if (arg1 >= 0 && arg1 < this.__variants.length)
            return this.__variants[arg1];
        else
            return null;
    }
    else if (typeof arg1 == "object")   // We're in control, so we'll assume Array...
    {
        // Find variant by attribute combination
        var vTest = new Variant();
        for (var x = 0; x < arg1.length; x++)
            vTest.addAttribute(arg1[x].name, arg1[x].value);

        return this.variantExists(vTest);
    }
}

function pvgroup_getAllVariants()
{
    return this.__variants;
}

function pvgroup_variantExists(variant)
{
   // See if we already have this variant
  	for (var idx = 0; idx < this.__variants.length; idx++){
      var v = this.getVariant(idx);
      if (v != null)
            if (v.equals(variant))
                return v;
   }
	return null;
	
}

function pvgroup_addVariant(variant)
{
   // Add the variant as long as it doesn't
   // already exist for this product
   if (variant instanceof Variant)
   {
      // Assign the productVariantGroup back to the variant
      // so the end user can access it.
      variant.__productVariantGroup = this;
      // Store the variant
      this.__variants[this.__variants.length] = variant;
   }
   else if (!variant instanceof Variant)
   {
      // Throw an exception
      var err = new Error("Cannot add objects not of type Variant to ProductVariantGroup");
      throw err;
   }
}

function pvgroup_getAttributesWithName(attrName)
{
   function isInList(arAttribs, attrValue)
   {
      for (var idx = 0; idx < arAttribs.length; idx++)
         if (arAttribs[idx].value == attrValue) {
             return true;
         }
      return false;
   }

   var matchingAttributes = new Array();

   for (var idx=0; idx < this.__variants.length; idx++)
      if (!isInList(matchingAttributes, this.__variants[idx].getAttributeValue(attrName)))
         matchingAttributes[matchingAttributes.length] = this.__variants[idx].getAttribute(attrName);

   return matchingAttributes;
}

function pvgroup_getVariantsMatching(attrName, attrValue)
{
   var matchingVariants = new Array();

   // Find every variant that contains the
   // matching attribute name/value pair
   for (var idx = 0; idx < this.__variants.length; idx++)
      if (this.__variants[idx].getAttribute(attrName).value != null &&
          this.__variants[idx].getAttribute(attrName).value == attrValue)
         matchingVariants[matchingVariants.length] = this.__variants[idx];

   // return the matching variants array
   return matchingVariants;
}

function pvgroup_getSelectedVariant()
{
   for (var idx = 0; idx < this.__variants.length; idx++)
      if (this.__variants[idx].isSelected())
         return this.__variants[idx];

    // Nothing is selected
   return null;
}

function pvgroup_size()
{
   return this.__variants.length;
}

ProductVariantGroup.prototype.getFormField = pvgroup_getFormField;
ProductVariantGroup.prototype.setFormField = pvgroup_setFormField;
ProductVariantGroup.prototype.getVariant = pvgroup_getVariant;
ProductVariantGroup.prototype.getAllVariants = pvgroup_getAllVariants;
ProductVariantGroup.prototype.variantExists = pvgroup_variantExists;
ProductVariantGroup.prototype.addVariant = pvgroup_addVariant;
ProductVariantGroup.prototype.getVariantsMatching = pvgroup_getVariantsMatching;
ProductVariantGroup.prototype.getSelectedVariant = pvgroup_getSelectedVariant;
ProductVariantGroup.prototype.getAttributesWithName = pvgroup_getAttributesWithName;
ProductVariantGroup.prototype.getVariantGroup = pvgroup_getVariantGroup;
ProductVariantGroup.prototype.setVariantGroup = pvgroup_setVariantGroup;
ProductVariantGroup.prototype.size = pvgroup_size;

//----------------------------------------------------------------------------------
// HELPER METHODS

// Returns an array of unique VariantAttribute objects from
// an array of Variant objects
function getAttributesWithNameFromVariants(varArray, attrName)
{
   function isInList(arAttribs, attrValue)
   {
      for (var idx = 0; idx < arAttribs.length; idx++)
         if (arAttribs[idx].value == attrValue)
            return true;

      return false;
   }

   var matchingAttributes = new Array();

   for (var idx=0; idx < varArray.length; idx++)
      if (!isInList(matchingAttributes, varArray[idx].getAttributeValue(attrName)))
         matchingAttributes[matchingAttributes.length] = varArray[idx].getAttribute(attrName);

   return matchingAttributes;
}