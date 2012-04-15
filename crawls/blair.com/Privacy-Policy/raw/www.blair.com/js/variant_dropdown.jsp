





//---------------------------------------------
// OCP Framework
//
// Dropdown maintenance functions for multi-
// variant display.
//
//--------------------------------------------------------------------------
var __pvdsArray = new Array();

function isAdded(obj) {
    var idx = 0;
    while (idx < __pvdsArray.length)
    {
        if ((__pvdsArray[idx].__attributeName == obj.__attributeName) && (__pvdsArray[idx].productID == obj.productID) && (__pvdsArray[idx].uniqueID == obj.uniqueID)) {
            __pvdsArray[idx] = obj; // replace the existing obj by the new obj
            return true;
        }
        idx++;
    }
    return false;
}

function isSameGroup(obj1, obj2) {
    var result = false;
    if (obj1.productID == obj2.productID && obj1.uniqueID == obj2.uniqueID &&
                ((obj1.__attributeName.match(".*_qv") && obj2.__attributeName.match(".*_qv"))
                || (!obj1.__attributeName.match(".*_qv") && !obj2.__attributeName.match(".*_qv"))
                )) {
        result = true;
    }
    return result;
}

function __getDropdownSupport(listObj)
{
    var idx = 0;
    while (idx < __pvdsArray.length)
    {
    if (__pvdsArray[idx].__list == listObj)
        return __pvdsArray[idx];

        idx++;
    }

return null;
}

function _getVariantsMatching(attrName, attrValue, variants, uniqueId)
{
   var matchingVariants = new Array();

   // Find every variant that contains the matching attribute name/value pair
   for (var idx = 0; idx < variants.length; idx++) {
        if (variants[idx].getAttribute(attrName).value != null && variants[idx].getAttribute(attrName).value == attrValue) {
            matchingVariants[matchingVariants.length] = variants[idx];
        }
   }

   // return the matching variants array
   return matchingVariants;
}

function fireEvent(element,event){
    if (document.createEventObject){
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt);
    }
    else{
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}

//--------------------------------------------------------------------------
// Creating the support structure for a variant dropdown,
// specify the name of the dropdown, not the actual object
function ProductVariantDropdownSupport(listName, productID, complimentaryLists, productVariants, callbackFunc, primary,isFinal, selectedValue, defaultText, defaultValue, lengthText, uniqueID)
{
    // Private fields
   this.__attribCallback      = null;
   this.__arDefOpts           = new Array();

   this.__attributeName       = listName;
   this.__list                = document.getElementById(listName + productID + "Variants" + uniqueID);
   this.__complimentaryLists  = complimentaryLists;
   this.__productVariants     = productVariants;
   this.__selectedValue       = selectedValue;

   this.__defaultText         = (arguments.length > 7 ? defaultText : "Select One");
   this.__defaultValue        = (arguments.length > 8 ? defaultValue : "");

    // Public fields
   this.isPrimary             = primary;
   this.isFinal               = isFinal;
   this.productID             = productID;
   this.uniqueID              = uniqueID;


    // Add this directly to the list
    this.__list.productVariantDropdownSupport = this;

    // We use this global array because we need to find
    // the primary list for complimentary/dependent lists
    if (!isAdded(this))
        __pvdsArray[__pvdsArray.length] = this;

    // Register a formatter callback
    if (callbackFunc != "")
        this.setAttributeFormatCallback(callbackFunc);

    // Get the selected value for this dropdown
    var selVariant = this.__productVariants.getSelectedVariant();
    if (selVariant != null)
        this.__selectedValue = selVariant.getAttributeValue(this.__attributeName);

    // Load the data if this is the primary
    this.loadDropdown();

    // Register the event we want to respond to
    if (this.__list.attachEvent)
    {
        // This is Internet Explorer
        this.__list.attachEvent("onchange", this.updateLists);
    }
    else if (this.__list.addEventListener)
    {
       // This is Mozilla/Firefox
        this.__list.addEventListener("change", this.updateLists, true);
    }
}

// Callback function when dropdowns are loaded
// The callback function should be in the form:
//
//   function cbFuncName(list, attribute, optionObj)
//
// When adding attributes to a dropdown, this method
// will pass to the callback the list object that is being
// modified, the VariantAttribute object, and the Option
// object that will be appended to the list
// The callback should return an Option object that
// will be added to the dropdown list.

function pvds_setAttributeFormatCallback(cbFuncPointer)
{
   if (cbFuncPointer == null)
      return;

   // Determine that the object pass in is a function
   if (typeof cbFuncPointer != "function")
   {
      // Throw an exception
      var err = new Error("The attribute format callback must be a function pointer");
      throw err;
   }

   // Check it's length (should be 3 parameters)
   if (cbFuncPointer.length != 3)
   {
      // Throw an exception
      var err = new Error("The attribute format callback must take 3 parameters");
      throw err;
   }

   // Function ok, set it
   this.__attribCallback = cbFuncPointer;

}

//--------------------------------------------------------------------------

// Clear a dropdown's options
function pvds_clearDropdown()
{
   while (this.__list.options.length > 0)
      this.__list.remove(0);
}

function pvds_addDefault()
{
    var dOpt = document.createElement("option");
    dOpt.text = this.__defaultText;
    dOpt.value = this.__defaultValue;
    try
    {
      // IE likes it this way
      this.__list.add(dOpt);
   }
   catch (ex)
   {
      // The W3C DOM specifies the second parameter is required
      this.__list.add(dOpt, null);
   }
}

// Returns the primary drop-down for any list provided
function pvds_getPrimary()
{
    if (this.isPrimary)
        return this;
    else
    {
        for (var x = 0; x < __pvdsArray.length; x++)
            if (isSameGroup(__pvdsArray[x], this) &&
                 (__pvdsArray[x].isPrimary))
                return __pvdsArray[x];
    }

    return null;
}

function pvds_getPrimarySelectedValue()
{
    var primary = this.getPrimary();
    return primary.__selectedValue;
}

// Load all of the unique attributes of a
// particular name into a dropdown list
var arrColors = null; //hoang add
var arrColorsCopy = null; //hoang add

function getQueryParameter ( parameterName ) {
  var queryString = window.top.location.search.substring(1);
  var parameterName = parameterName + "=";
  if ( queryString.length > 0 ) {
    begin = queryString.indexOf ( parameterName );
    if ( begin != -1 ) {
      begin += parameterName.length;
      end = queryString.indexOf ( "&" , begin );
        if ( end == -1 ) {
        end = queryString.length
      }
      return unescape ( queryString.substring ( begin, end ) );
    }
  }
  return "null";
} 

function pvds_loadDropdown()
{
   // Clear the dropdown
   this.clearDropdown();

   // Add the default option
    this.addDefault();

	var prechosen = getQueryParameter("tv1")=="null";
		
    // All lists start out as disabled
    this.__list.disabled = true;

    // Primary lists are never disabled
    if (this.isPrimary || !prechosen )
        this.__list.disabled = false;

    // Enable a list that has a value selected
    if (this.__selectedValue != "")
        this.__list.disabled = false;

   var primarySelOpt = (this.getPrimarySelectedValue() != "");

    if (!this.isPrimary && primarySelOpt)
        this.__list.disabled = false;

    // Don't need to load the list if nothing selected and not primary and primary has no selected options
    if (!this.isPrimary && !primarySelOpt && (this.__selectedValue == "") && !prechosen )
        return;

   // Get all of the unique values
    var arAttributeList = null;
   if (!this.isPrimary && this.getPrimarySelectedValue() != "")
   {
       // var arMatchingVariants = this.__productVariants.getVariantsMatching(this.getPrimary().__attributeName, this.getPrimarySelectedValue());
        var arMatchingVariants = this.__productVariants.__variants;
        var idxx = 0;

        while (idxx < __pvdsArray.length)
        {
            if (isSameGroup(this, __pvdsArray[idxx])) {
                arMatchingVariants = _getVariantsMatching(__pvdsArray[idxx].__attributeName, __pvdsArray[idxx].__selectedValue, arMatchingVariants, this.getUniqueId);
                if (__pvdsArray[idxx + 1] == this) {
                    break;
                }
            }
            idxx++;
        }

      arAttributeList = getAttributesWithNameFromVariants(arMatchingVariants, this.__attributeName);
   }
   else
      arAttributeList = this.__productVariants.getAttributesWithName(this.__attributeName);


    if (this.__attributeName.substring(0,5) == "Color") {
        arrColors = new Array();
    }
    
    //Always select the single value in the list if there is only one.
    	// for primary
    if(this.isPrimary && arAttributeList.length == 1){
    	this.__selectedValue = arAttributeList[0].value;
    	// for secondary
    } else if (arAttributeList.length == 1 && this.getPrimarySelectedValue() != "") {
    	this.__selectedValue = arAttributeList[0].value;
    }
    
   // Load the array of values
   for (var idx = 0; idx < arAttributeList.length; idx++)
   {
      // Create new element
      var opt = document.createElement("option");
      opt.text = arAttributeList[idx].value;
      opt.value = arAttributeList[idx].value;
        if (this.__attributeName.substring(0,5) == "Color") {
        arrColors.push(arAttributeList[idx].value);
        }
        // Give them a chance to modify the option object
      if (this.__attribCallback != null)
         opt = this.__attribCallback(this.__list, arAttributeList[idx], opt);

        try
        {
            // IE likes it this way
            this.__list.add(opt);
        }
        catch (ex)
        {
            // The W3C DOM specifies the second parameter is required (mozilla/firefox)
            this.__list.add(opt, null);
        }

        // Is this a selected option?
        if (this.__selectedValue == opt.value)
            opt.selected = true;
   }

    // Set the variant form field to the selected value
    this.setVariantField();

    if(this.__attributeName.substring(0,5) == "Color" && typeof(window.pageView) != "undefined"){
        if (window.pageView == "PRODUCT_PAGE") {
        updateProductImageColor(this.productID);
        }

        if (window.pageView == "ENSEMBLE_PAGE") {
            updateProductImageColor(this.productID);
        }
    }
}

// Update dropdown lists, relative to a changed element
// in another list.  ie:
//    Change size from small to medium and update the
//    color dropdown to show all of the colors for
//    that size.
function pvds_updateLists(evt)
{

    var dropdown = (evt.target) ? evt.target : evt.srcElement;
	if ( dropdown == null ) {
		dropdown = document.getElementById(evt[0].name);
	}
    var thisObj = __getDropdownSupport(dropdown);
    if (dropdown.id.substring(0,4) == "Size") {
        arrColors = new Array();
        arrColorsCopy = new Array();
    }

    var arDependentAttribs = thisObj.__complimentaryLists.split(",");

    // Anything to update??
    if (!(arDependentAttribs.length == 1 && arDependentAttribs[0] == ""))
    {
        // Get the variants which match the selected attribute
        //var sAttribValue = thisObj.__list.options[thisObj.__list.selectedIndex].value;
        //var arMatchingVariants = thisObj.__productVariants.getVariantsMatching(thisObj.__attributeName, sAttribValue);
        var arMatchingVariants = thisObj.__productVariants.__variants;
        var idxx = 0;
        while (idxx < __pvdsArray.length)
        {
            if (isSameGroup(thisObj, __pvdsArray[idxx])) {
                var sAttribValue = __pvdsArray[idxx].__list.options[__pvdsArray[idxx].__list.selectedIndex].value;
                arMatchingVariants = _getVariantsMatching(__pvdsArray[idxx].__attributeName, sAttribValue, arMatchingVariants, thisObj.uniqueID);
                if (__pvdsArray[idxx] == thisObj)
                    break;
            }
            idxx++;
        }

        for (var lIdx = 0; lIdx < arDependentAttribs.length; lIdx++)
        {
            // The name of the list = [name]Variants
            var listName = arDependentAttribs[lIdx] + thisObj.productID + "Variants" + thisObj.uniqueID;

            // Refresh the proper list(s)
            var compList = document.getElementById(listName);

            // Get the ProductVariantDropdownSupport object
            var pvdsObj = __getDropdownSupport(compList);

            var sSelection = "";

            // 1) Enable list
            //    -or-
            //    If enabled, grab the selected option's name so we
            //    can retain that selection if possible
            if (compList.disabled)
                compList.disabled = false;
            else
                sSelection = compList.options[compList.selectedIndex].value;

            // 2) Clear the list
            pvdsObj.clearDropdown();

            // 3) Add default option
            pvdsObj.addDefault();

            // 4) Load the values
            var arAttribs = getAttributesWithNameFromVariants(arMatchingVariants, arDependentAttribs[lIdx]);
            for (var idx = 0; idx < arAttribs.length; idx++)
            {
                // Create new element
                var opt = document.createElement("option");
                opt.text = arAttribs[idx].value;
                opt.value = arAttribs[idx].value;


                if (dropdown.id.substring(0,4) == "Size") { //hoang add
                    arrColors.push(arAttribs[idx].value);
                }
                // Give them a chance to modify the option object
                if (pvdsObj.__attribCallback != null)
                    opt = pvdsObj.__attribCallback(compList, arAttribs[idx], opt);

                if (sSelection == arAttribs[idx].value)
                    opt.selected = true;

                try
                {
                    // IE likes it this way
                    compList.add(opt);
                }
                catch (ex)
                {
                    // The W3C DOM specifies the second parameter is required
                    compList.add(opt, null);
                }
            }

            fireEvent(compList,'change');

            // Disable this list if there are no elements in the dropdown
            if (arAttribs.length == 0)
                pvdsObj.__list.disabled = true;
        }
    }

    // Set the variant form field to the selected value
    thisObj.setVariantField();

    // Check if this script is loaded by Product Page or Ensemble Page to handle Select Color dropdown list onChange event
    if(thisObj.__attributeName.substring(0,4) == "Size" && typeof(window.pageView) != "undefined"){
        if(window.pageView == "PRODUCT_PAGE")	updateProductImageColor(thisObj.productID);
        if(window.pageView == "ENSEMBLE_PAGE") {
            updateProductImageColor(thisObj.productID);
        }
    }

    if(thisObj.__attributeName.substring(0,5) == "Color" && typeof(window.pageView) != "undefined"){
        if(window.pageView == "PRODUCT_PAGE")	changeColor(thisObj.productID);
        if(window.pageView == "ENSEMBLE_PAGE") {
            changeColor(thisObj.productID, thisObj.__list);
        }
    }
}

function pvds_updateListsNew(dropdown)
{
    if (dropdown.id.substring(0,4) == "Size") {
        arrColors = new Array();
        arrColorsCopy = new Array();
    }

    var thisObj = __getDropdownSupport(dropdown);

    var arDependentAttribs = thisObj.__complimentaryLists.split(",");

    // Anything to update??
    if (!(arDependentAttribs.length == 1 && arDependentAttribs[0] == ""))
    {
        // Get the variants which match the selected attribute
        var sAttribValue = thisObj.__list.options[thisObj.__list.selectedIndex].value;
        var arMatchingVariants = thisObj.__productVariants.getVariantsMatching(thisObj.__attributeName, sAttribValue);

        for (var lIdx = 0; lIdx < arDependentAttribs.length; lIdx++)
        {
            // The name of the list = [name]Variants
            var listName = arDependentAttribs[lIdx] + thisObj.productID + "Variants" + thisObj.uniqueID;

            // Refresh the proper list(s)
            var compList = document.getElementById(listName);

            // Get the ProductVariantDropdownSupport object
            var pvdsObj = __getDropdownSupport(compList);

            var sSelection = "";

            // 1) Enable list
            //    -or-
            //    If enabled, grab the selected option's name so we
            //    can retain that selection if possible
            if (compList.disabled)
                compList.disabled = false;
            else
                sSelection = compList.options[compList.selectedIndex].value;

            // 2) Clear the list
            pvdsObj.clearDropdown();

            // 3) Add default option
            pvdsObj.addDefault();

            // 4) Load the values
            var arAttribs = getAttributesWithNameFromVariants(arMatchingVariants, arDependentAttribs[lIdx]);
            for (var idx = 0; idx < arAttribs.length; idx++)
            {
                // Create new element
                var opt = document.createElement("option");
                opt.text = arAttribs[idx].value;
                opt.value = arAttribs[idx].value;

                // Give them a chance to modify the option object
                if (pvdsObj.__attribCallback != null)
                    opt = pvdsObj.__attribCallback(compList, arAttribs[idx], opt);

                if (sSelection == arAttribs[idx].value)
                    opt.selected = true;

                try
                {
                    // IE likes it this way
                    compList.add(opt);
                }
                catch (ex)
                {
                    // The W3C DOM specifies the second parameter is required
                    compList.add(opt, null);
                }
            }

            // Disable this list if there are no elements in the dropdown
            if (arAttribs.length == 0)
                pvdsObj.__list.disabled = true;
        }
    }

    // Set the variant form field to the selected value
    thisObj.setVariantField();
}

// Set the hidden form field that is tied to this variant with
// the value of the combined variant attributes.
function pvds_setVariantField()
{
   // Find the variant that matches this type
   var variantArray = this.__productVariants.getVariantGroup();
   var attribs = new Array();
   for (var x = 0; x < variantArray.length; x++)
   {
        var pvds = document.getElementById(variantArray[x] + this.productID + "Variants" + this.uniqueID).productVariantDropdownSupport;
        if (pvds)
            attribs[attribs.length] = new VariantAttribute(variantArray[x], pvds.getSelectedOption().value);
   }

   var selVariant = this.__productVariants.getVariant(attribs);

   // Set the form field
   try
   {
      document.getElementById(this.__productVariants.getFormField()).value = selVariant.getId();
   }
   catch (ex)
   {
        // They've probably selected something invalid...
        document.getElementById(this.__productVariants.getFormField()).value = "";
   }
}

function pvds_getSelectedOption()
{
    return this.__list.options[this.__list.selectedIndex];
}

function pvds_getProductVariants()
{
    return this.__productVariants;
}

ProductVariantDropdownSupport.prototype.setAttributeFormatCallback   = pvds_setAttributeFormatCallback;
ProductVariantDropdownSupport.prototype.clearDropdown                = pvds_clearDropdown;
ProductVariantDropdownSupport.prototype.addDefault                   = pvds_addDefault;
ProductVariantDropdownSupport.prototype.loadDropdown                 = pvds_loadDropdown;
ProductVariantDropdownSupport.prototype.updateLists                  = pvds_updateLists;
ProductVariantDropdownSupport.prototype.updateListsNew               = pvds_updateListsNew;
ProductVariantDropdownSupport.prototype.getSelectedOption            = pvds_getSelectedOption;
ProductVariantDropdownSupport.prototype.getPrimary                   = pvds_getPrimary;
ProductVariantDropdownSupport.prototype.getPrimarySelectedValue      = pvds_getPrimarySelectedValue;
ProductVariantDropdownSupport.prototype.getProductVariants           = pvds_getProductVariants;
ProductVariantDropdownSupport.prototype.setVariantField              = pvds_setVariantField;