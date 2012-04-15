
/// <reference path="jquery-1.3.2.js" />

var __submitValidationEnabled = true;

$(document).ready(function() {
    //Turn client validation off for button, LinkButtons.  To avoid server side validation use in conjunction with CausesValidation = false.
    var element = $(".NoValidation");
    if (element != null) {
        element.click(function() {
            __submitValidationEnabled = false;
        });
    }
    //Turn Client validation on for buttons, LinkButtons that require validation.  Only necessary if .NoValidation was used on a control that doesn't postback
    //or navigate away. i.e. client side form reset.
    element = $(".ValidationRequired");
    if (element != null) {
        element.click(function() {
            __submitValidationEnabled = true;
        });
    }

    //After Postback, if the server kicks any error messages back we should show the 
    element = $(".RVC_ErrorMessage:visible");
    if (element != null && element.length > 0) {
        $(".errors").show();
    }
});

//Call on button click in order to run through our list of validators
function RVC_ValidateOnClient() {
    var markeClass = '';
    var valid = true;

    if (__submitValidationEnabled && RVC_ValidatorsList && RVC_ValidatorsList.length > 0) {
        markeClass = RVC_ValidatorsList[0].CLASS_FIELD_INVALID;
        for (var i = 0; i < RVC_ValidatorsList.length; i++) {
            if (RVC_ValidatorsList[i]) {
                var validator = RVC_ValidatorsList[i];
                var controlIsValid = RVC_ValidatorsList[i].Validate();
                if (valid && !controlIsValid) {
                    valid = false;
                    //Do not break, we need to check all the controls.
                }
            }
        }
    }
    if (!valid) {
        if (markeClass != '') {
            try {
                $('.' + markeClass).get(0).focus();
            } catch (ex) { }
        }
        $("#dError").show();
    }
    else {
        $("#dError").hide();
    }
    return (valid);
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}

function RVC_ClientValidator(ValidationType, IsRequired, CtrlID, CtrlName, LabelID, ErrorDivID, ErrorDivDisplyType, ErrorMessage, EmptyMessage, LabelErrorClass, RegularExpression, PreValidationJSFunction, PostValidationJSFunction, RequiredDependencyControl, RequiredDependencyValue, ValidationData) {
    this.CLASS_FIELD_INVALID = "field_invalid"; //marks a field as invalid. used to set focus
    this.labelErrorClass = LabelErrorClass;
    this.type = ValidationType;
    this.required = IsRequired;
    this.controlID = CtrlID;
    this.controlName = CtrlName;
    this.labelID = LabelID;
    this.errorDivID = ErrorDivID;
    this.errorMessage = ErrorMessage;
    this.emptyMessage = EmptyMessage;
    this.regex = RegularExpression;
    this.controlIsEmpty = false;
    this.controlIsHidden = false;
    this.errorDivDiplayType = ErrorDivDisplyType
    this.validationData = ValidationData;
    this.preValidationJSFunction = PreValidationJSFunction;
    this.postValidationJSFunction = PostValidationJSFunction;
    this.requiredDependencyControl = RequiredDependencyControl;
    this.requiredDependencyValue = RequiredDependencyValue;

    this.Validate = function() {

        var isValid = true;

        var preFuncValidated = true;
        if (this.preValidationJSFunction != '') {
            var preFunc = this.preValidationJSFunction + "('" + this.controlID + "',this);";
            isValid = eval(preFunc);
        }

        // Still Valid Keep Running
        if (isValid) {

            switch (this.type) {
                case "RequiredFormField":
                    isValid = this.RequiredFormField();
                    break;
                case "ValidateInputByRegularExpression":
                    isValid = this.ValidateRegularExpression();
                    break;
                case "ValidateRequiredInputList":
                    isValid = this.ValidateRequiredInputList();
                    break;
                case "ValidateRequiredInputListByGroup":
                    isValid = this.ValidateRequiredInputListByGroup();
                    break;
                case "ValidateMinMaxInputList":
                    isValid = this.ValidateMinMaxInputList();
                    break;
            }

            // Still Valid Keep Running
            if (isValid) {
                if (this.postValidationJSFunction != '') {
                    var postFunc = this.postValidationJSFunction + "('" + this.controlID + "',this);";
                    isValid = eval(postFunc);
                }
            }
        }

        this.ShowHideError(isValid);
        return isValid;
    };

    /* Begin Display Methods */
    this.ShowHideError = function(hide) {
        var dErrorID = '#' + this.errorDivID;
        this.RemoveMessageFromSummaries();
        if (hide) {
            if ($(dErrorID).length > 0) {
                $(dErrorID).hide();
            }
            if (this.labelID && LabelID != '') {
                $("*[id$=" + this.labelID + "]").removeClass(this.labelErrorClass);
            }
            $('#' + this.controlID).removeClass(this.CLASS_FIELD_INVALID);
        }
        else {
            if ($(dErrorID).length > 0) {
                $(dErrorID).attr('style', 'display:' + this.errorDivDiplayType);
                $(dErrorID).html(this.GetErrorMessage());
            }
            if (this.labelID && LabelID != '') {
                $("*[id$=" + this.labelID + "]").addClass(this.labelErrorClass);
            }
            this.AddMessageToSummaries(this.GetErrorMessage());
            $('#' + this.controlID).addClass(this.CLASS_FIELD_INVALID);
        }
    }

    this.AddMessageToSummaries = function(mess) {
        if (this.isDefinedOnPage(typeof (Page_ValidationSummaries)) && Page_ValidationSummaries.length > 0) {
            for (var i = 0; i < Page_ValidationSummaries.length; i++) {
                var id = Page_ValidationSummaries[i].id;
                if ($("#" + id + ":has(li:contains(" + mess + "))").length < 1) {
                    if ($("#" + Page_ValidationSummaries[i].id + ":has(ul)").length < 1) {
                        $("#" + id).append("<ul><li>" + mess + "</li></ul>");
                    }
                    else {
                        $("#" + id + " > ul").append("<li>" + mess + "</li>");
                    }
                }
                $("#" + id).show();
            }
        }
    }

    this.RemoveMessageFromSummaries = function() {
        if (this.isDefinedOnPage(typeof (Page_ValidationSummaries)) && Page_ValidationSummaries.length > 0) {
            for (var i = 0; i < Page_ValidationSummaries.length; i++) {
                var id = Page_ValidationSummaries[i].id;
                this.RemoveMessageFromLI(id, this.emptyMessage);
                this.RemoveMessageFromLI(id, this.errorMessage);
            }
        }

    }

    this.RemoveMessageFromLI = function(id, mess) {
        if (!this.StringIsNullEmptyOrUndefined(mess)) {
            if ($("#" + id + " :contains(" + mess + ")").length > 1) {

                $("#" + id + " ul > li:contains(" + mess + ")").remove();
            }
        }
    }

    /* End Display Methods */

    /* Begin Control Validation Methods */
    this.RequiredFormField = function() {
        var valid = true;
        if (this.ConditionallyRequired() || this.required) {
            this.controlIsEmpty = this.IsEmpty($("#" + this.controlID).get(0))

            valid = !this.controlIsEmpty;
        }
        return valid;
    }

    this.ConditionallyRequired = function() {
        var conditionallyRequired = false;

        if (this.requiredDependencyControl != '' && this.requiredDependencyValue != '') {
            var ctrl = null;
            var ctrlID = this.requiredDependencyControl;
            var ctrlValue = null;

            ctrl = $('#' + ctrlID);
            ctrlValue = ctrl.val();
            if (!ctrlValue) {
                var ctrlName = this.requiredDependencyControl.replace(/\_/g, '\$');
                ctrl = $('input[name=' + ctrlName + ']:checked');
                ctrlValue = ctrl.val();
            }

            if (ctrlValue) {
                var re = new RegExp(this.requiredDependencyValue);
                conditionallyRequired = re.test(ctrlValue);
            }
        }
        return conditionallyRequired;
    }

    this.isCurrentlyRequired = function() {
        return this.required || this.ConditionallyRequired();
    }

    this.ValidateRegularExpression = function() {
        var valid = false;
        var obj = $("#" + this.controlID).get(0);

        this.controlIsEmpty = this.IsEmpty(obj);

        if (!(this.required || this.ConditionallyRequired()) && this.controlIsEmpty) {
            valid = true;
        }
        else {
            var re = new RegExp(this.regex);
            valid = re.test(obj.value.trim())
        }

        return valid;
    }

    this.ValidateMinMaxInputList = function() {
        var min = null;
        var max = null;
        var valid = false;
        var array = null;
        if (ValidationData) {
            array = this.validationData.split("-");
        }
        var numChecked = 0;
        if (array != null && array.length == 2) {
            if (array[0] != "x") {
                min = parseInt(array[0], 10);
            }
            if (array[1] != "x") {
                max = parseInt(array[1], 10);
            }
        }
        if ($("input[id^='" + this.controlID + "_']:checked").val()) {
            numChecked = $("input[id^='" + this.controlID + "_']:checked").length;
        }
        if ((this.required || this.ConditionallyRequired()) && numChecked == 0) {
            this.controlIsEmpty = true;
            return false;
        }

        if (min && max && (min <= numChecked && numChecked <= max)) {
            valid = true;
        }
        else if (max == null && min && min <= numChecked) {
            valid = true;
        }
        else if (min == null && max && numChecked <= max) {
            valid = true;
        }

        return valid;
    }

    //Used for RadioButtonList + CheckBoxList
    this.ValidateRequiredInputList = function() {
        var valid = false;
        //a list item id will be controlID + _# where # is the index in the list.
        if (!(this.required || this.ConditionallyRequired()) || $("input[id^='" + this.controlID + "_']:checked").val()) {
            valid = true; //Allow through if not required.
        }
        this.controlIsEmpty = !valid;
        return valid;
    }

    //Used for RadioButtonList + CheckBoxList
    this.ValidateRequiredInputListByGroup = function() {
        var valid = false;
        //a list item id will be controlID + _# where # is the index in the list.
        if (!(this.required || this.ConditionallyRequired()) || $("input[name='" + this.controlName + "']:checked").val()) {
            valid = true; //Allow through if not required.
        }
        this.controlIsEmpty = !valid;
        return valid;
    }

    /* End Control Validation Methods */

    this.StringIsNullEmptyOrUndefined = function(stringObj) {
        if (stringObj && stringObj != null && stringObj != '') {
            return false;
        }
        else {
            return true;
        }
    }

    //Use to check for .Net provided js objects
    this.isDefinedOnPage = function(obj) {
        return (obj !== 'undefined');
    }

    this.isHidden = function() {
        return $("#" + this.controlID.toString()).is(":visible");
    }

    this.IsEmpty = function(obj, val) {
        if (!obj) return false;
        if (val == null) val = '';
        var i;
        if (obj.type != null) {
            if (obj.type == "text" || obj.type == "textarea" || obj.type == "password" || obj.type == "hidden") {
                if (obj.value == val) return true;
                return false;
            }
            if (obj.type.indexOf("select") > -1) {
                if (obj.options.length > 0) {
                    if (obj.options[obj.selectedIndex].value != val) return false;
                    return true;
                }
                else return true;
            }
            if (obj.type == "checkbox") {
                if (obj.checked == true) return false;
                return true;
            }
        }
        if (obj.length > 0) {
            if (obj[0].type == "radio") {
                for (i = 0; i < obj.length; i++) {
                    if (obj[i].checked == true && obj[i].value != val) return false;
                }
                return true;
            }
        }
        return false;
    }


    this.GetErrorMessage = function() {
        if (this.controlIsEmpty && !this.StringIsNullEmptyOrUndefined(this.emptyMessage)) {
            return this.emptyMessage;
        }
        else {
            return this.errorMessage;
        }
    }
    this.SetErrorMessage = function(msg) {
        this.errorMessage = msg;
    }

    this.GetValidationData = function() {
        return this.validationData;
    }        
}

function formatCurrencyBox(element) {

    if (element != null && element.value != "") {
        var val = element.value;
        element.value = formatCurrency(val, 2);
    }
    else {
        element.value = "$0.00";
    }
    return true;
}

function HandleCurrencyBoxOnClick(element) {
    if (element.value == "$0.00") { element.value = ""; }
}

function formatCurrency(num, d) {
    num = num.toString().replace(/\$|\,/g, '');
    num = isNaN(num) || num === '' || num === null ? 0.00 : num;
    var parsed = parseFloat(num).toFixed(d);
    var result = '';

    var decimalLoc = -1;

    if (d == 0) {
        decimalLoc = parsed.length;
    }
    else {
        decimalLoc = parsed.indexOf('.', 0);
        result = parsed.substr(decimalLoc, parsed.length - decimalLoc);
    }

    var coma = true;
    for (var i = 0; i < decimalLoc / 3; i++) {
        var start = decimalLoc - ((i + 1) * 3);
        if (start > 0) {
            result = ',' + parsed.substr(start, 3) + result;
        }
        else if (start == 0) {
            result = parsed.substr(start, 3) + result;
        }
        else {
            result = parsed.substr(0, 3 + start) + result;
        }
    }

    return '$' + result;
}

function validateInputRange(controlID, validator) {

    var value = $("#" + controlID).val();
    var validationData = validator.GetValidationData();

    if (validator.isCurrentlyRequired() == true) {
        // Check for value
        if (value != null && value != '' &&
            validationData != null &&
            validationData != '') {
            // Parse Contraints
            var args = validationData.split(',');
            if (args[0] != '' && args[1] != '') {
                var minValue = parseFloat(args[0]);
                var maxValue = parseFloat(args[1]);

                // Clean Input (Extract Double)
                var input = value.replace(/[^\d|\.]/g, '');
                var val = parseFloat(input);

                // Test Range
                return (val >= minValue) && (val <= maxValue);
            }
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function HandlePhoneOnLeave(ctrl) {
    var str = ctrl.value;

    if (str != null && str != "") {
        str = str.replace(/[^\d]/g, "");
        str = str.replace(/(\d{3})(.*)/, "$1-$2");
        str = str.replace(/(\d{3})\-(\d{3})(.*)/, "$1-$2-$3");
        ctrl.value = str;
    }

    return true;
}

function DynamicFormHide(formID) {
    $('#' + formID).hide();
    ClearInnerForm(formID);
}
function DynamicFormShow(formID) {
    $('#' + formID).show();
}

function ClearInnerForm(rootElementID) {
    $("#" + rootElementID).find(':input').each(function() {
        var item = $('#' + this.id);
        if (item != null) {
            var protect = item.hasClass('protected');
            if (!protect) {
                switch (this.type) {
                    case 'password':
                    case 'select-multiple':
                    case 'select-one':
                    case 'textarea':
                        {
                            $(this).val('');
                            break;
                        }
                    case 'text':
                        {
                            if (item.hasClass('currency')) {
                                $(this).val('$0.00');
                            }
                            else {
                                $(this).val('');
                            }
                            break;
                        }
                    case 'checkbox':
                    case 'radio':
                        {

                            this.checked = false;
                            break;
                        }
                }
            }
        }
    });
}