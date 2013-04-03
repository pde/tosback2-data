jQuery(document).ready(function(){
    var toggleLinks = jQuery(".caToggleLink");
    if (toggleLinks.length > 0) {
        toggleLinks.click(function(){
            var classes = jQuery.trim(this.className).split(" ");
            toggleLinks.filter("."+classes[1]).removeClass("currentSelected");
            jQuery(this).addClass("currentSelected");
            var itemsToHide = jQuery("."+classes[1]+" > .caToggleItem").hide();
            if (classes.length > 2) { itemsToHide.filter("."+classes[2]).show(); }
            formState.checkFormState();
            if (this.href) { return false; }
        });
        toggleLinks.filter("input[checked]").click();
    }
    jQuery(".newWindow").click(function(){ window.open(this.href); return false; });/* new window display */
    if(jQuery("div.errorMsg").length > 0) { highlightCAForms(); }/* highlight invalid fields */
    jQuery("input[type='text'], select", ".ca").keydown(function(event){ if (event.keyCode == 13) { return false; } });
    ATT.util.validateAlphaNumber('#unitNumber');
});

var switchLoginForm = (function() {
    var formType = ['#divWirelessForm', '#divTelcoForm', '#divUverseForm'];
    return function(value) {
        for (var i=0; i<formType.length; i++) {
            if (value == formType[i]) { jQuery(formType[i]).show();
            } else { jQuery(formType[i]).hide(); }
        }
    }
})();

var Availability = (function(){
    function processAddressLine2(type) {
        var infoType = document.getElementById("aptSuite"+type).value + " ";
        var infoValue = document.getElementById("aptSuiteTxt"+type).value;
        if (jQuery.trim(infoValue).length > 0) {
            document.getElementById("addressLine2"+type).value = infoType + infoValue;
        } else { document.getElementById("addressLine2"+type).value = ""; }
    }
    
    function updateAddressStreetNumber() {
        if (document.getElementById("addressStreetNumber")) {
            document.getElementById("addressStreetNumber").value = jQuery("#unitNumber").val();
        }
    }
    
    function updateAddressIndex() {
        if (document.getElementById("addressIndexField")) {
            document.getElementById("addressIndexField").value = jQuery("input[name='range11']").filter(":checked").val();
        }
    }
    return {
        submit: function(param) { processAddressLine2(param); return true; },
        checkRadio: function() {
            var selected = jQuery(".currentSelected");
            if (selected.filter("input[value='multiForm']").length > 0) { formButtonId = selected.filter("a").attr('href').replace("#",''); }
            else if (selected.filter("input[value='toggle2']").length > 0) { formButtonId = selected.filter("a").attr('href').replace("#",''); }
            else { formButtonId = selected.filter("input").val(); }
            updateAddressIndex();
            updateAddressStreetNumber();
            document.getElementById(formButtonId).click(); return true;
        }
    };
})();

/* submit button monitoring */
var formState = {
    updateSubmitState : function(current, enabled) {
        jQuery(current).data("showSubmit", enabled);
        formState.checkFormState();
    },
    
    checkFormState : function() {
        var count = jQuery(".validated-form:visible").each(function(){
            var enabled = jQuery(this).data("showSubmit");
            if (enabled) {
                jQuery("input[type='image']", this).each(function(){
                    jQuery(this).parent("div").removeClass("submitDisabled");
                });
                jQuery("#submitButtonField").removeClass("submitDisabled");
            } else {
                jQuery("input[type='image']", this).each(function(){ 
                    jQuery(this).parent("div").addClass("submitDisabled");
                });
                jQuery("#submitButtonField").addClass("submitDisabled");
            }
        }).length;
        if (count == 0) { jQuery("#submitButtonField").removeClass("submitDisabled"); }
    },
    checkRqd : function(form) {
       enableForm = true;
       form.find('.required-field').each(
           function(idx, elm) {
                if ((elm.id == 'residentialAddressZip' || 'businessAddressZip') && elm.value.length < 5) {
                    enableForm = false;
                } else if(elm.value == '' && enableForm) enableForm = false;
           }
       );
       return enableForm;
   },
    init : function() {
        /* default submit button disabled */
        var monitor = jQuery(".validated-form").each(function(){
            var currentForm = jQuery(this).data("showSubmit", false);
            /* enable submit on any change to form fields, for inputs monitor mouseout to enable button without field losing focus */
            jQuery("select, input[type!=hidden]", currentForm).filter("[type!='image']")
                .change(function(){ 
                       enabled = formState.checkRqd(currentForm);
                       formState.updateSubmitState(currentForm, enabled);  
                 })
                 .mouseout(function(){ 
                       enabled = formState.checkRqd(currentForm);
                       formState.updateSubmitState(currentForm, enabled);  
                 })
                .filter("input").each(function(){ jQuery(this).data("originalValue", this.value); });
        });
        setTimeout(formState.checkFormState, 1000);
    }
};
jQuery(window).load(formState.init);

// form validation content
var formValidationUtil = {
    highlight : function(element, errorClass, validClass) { jQuery(element).parents("form div").addClass(errorClass); },
    unhighlight : function(element, errorClass, validClass) { jQuery(element).parents("form div").removeClass(errorClass); },
        
    banned_general_regex : (/[:%\*;\$,'\^\.\(\)/"@]/g),
    banned_numeric_regex : (/[^0-9]/g),
    banned_alphanumeric_regex : (/[^0-9a-zA-Z]/g),
    banned_city_regex : (/[0-9:%\*;\$,'\^\.\-&\(\)/"@#!-&\/]/g),
    banned_address_regex : (/[:%\*;\$,'\^\.\\(\)"@]/g)
};

var caValidationMethods = {
    _basic : function(field_value, element, regex_patt) {
        field_value = field_value.replace(regex_patt, '');
        element.value = field_value;
        return true;
    },
    
    general_field : function(field_value, element) {
        return caValidationMethods._basic(field_value, element, formValidationUtil.banned_general_regex);
    },
    
    phone_field : function(field_value, element) {
        return caValidationMethods._basic(field_value, element, formValidationUtil.banned_numeric_regex);       
    },
    
    address_field : function(field_value, element) {
        return caValidationMethods._basic(field_value, element, formValidationUtil.banned_address_regex);
    },
    
    city_field : function(field_value, element) {
        return caValidationMethods._basic(field_value, element, formValidationUtil.banned_city_regex);
    },
    
    alphanumeric_field : function(field_value, element) {
        return caValidationMethods._basic(field_value, element, formValidationUtil.banned_alphanumeric_regex);
    },
    
    init : function() {
        jQuery.validator.addMethod("hrAddress", caValidationMethods.address_field, "");
        jQuery.validator.addMethod("hrCity", caValidationMethods.city_field, "");
        jQuery.validator.addMethod("hrGeneral", caValidationMethods.general_field, "");
        jQuery.validator.addMethod("hrPhone", caValidationMethods.phone_field, "");
        jQuery.validator.addMethod("hrAlphaNum", caValidationMethods.alphanumeric_field, "");
    }
};

function highlightCAForms() {
    setTimeout(function(){
        jQuery(".validated-form").each(function(){ jQuery(this).valid(); });
    },1000);
}
function initializeCAForms() {
    caValidationMethods.init();
    jQuery(".validated-form").each(function(){
        jQuery(this).validate({
            onsubmit : false, /* allow invalid values to submit */
            highlight : formValidationUtil.highlight,
            unhighlight : formValidationUtil.unhighlight,
            errorPlacement : function(){/* empty function display no text */},
            rules : checkAvailabilityRules
        });
    });
}

var checkAvailabilityRules = {
        '/att/ecom/shop/view/CheckAvailabilityFormHandler.checkAvailabilityInputBean.address.addressLine1' : { required : true, hrAddress : true },
        '/att/ecom/shop/view/CheckAvailabilityFormHandler.checkAvailabilityInputBean.address.city' : { hrCity : true },
        '/att/ecom/shop/view/CheckAvailabilityFormHandler.checkAvailabilityInputBean.address.zipCode' : { hrPhone : true, required : true, number : true, minlength : 5 },
        '/att/ecom/shop/view/CheckAvailabilityFormHandler.checkAvailabilityInputBean.phone.number' : { hrPhone : true, number : true, minlength : 10 },
        'zipCode' : { hrAlphaNum : true, number : true, minlength : 5 },
        'unitText' : { hrGeneral : true }
};

jQuery(document).ready(function(){ setTimeout(initializeCAForms, 700); });

var setCookie = function (successCallback) { 
    var hitURL = function(url, callback){
        var hitTest= document.createElement("script");
        if(typeof callback == "function"){
            hitTest.onload = function(){callback.apply(hitTest, [true])}
            hitTest.onerror = function(){callback.apply(hitTest, [false])}
            hitTest.onreadystatechange = function() {
                if(this.readyState == "complete" | this.readyState == "loaded"){
                    this.onreadystatechange = null;
                    callback.apply(this, [true]);
                }
            }
        }
        hitTest.src = url;
        document.getElementsByTagName("head")[0].appendChild(hitTest);
    }
    jQuery.getJSON(templateSelector('localizationInclude.xhr'), function(localizationData){
        var reverseLocalizationCallsMade =0, reverseLocalizationCallsReturned = 0, reverseLocalizationCallback = function(result){
            reverseLocalizationCallsReturned++;
    
            if(reverseLocalizationCallsMade === reverseLocalizationCallsReturned){
                //log that process is done
                if(successCallback != null) {
                    successCallback();
                }
            }
        };
        if (localizationData.reverseLocalizationUrls.length > 0) {
            jQuery.each(localizationData.reverseLocalizationUrls, function(index, url){
                reverseLocalizationCallsMade++;
                hitURL(url, reverseLocalizationCallback);
            });
        } else {
            successCallback();
        }
    });
}