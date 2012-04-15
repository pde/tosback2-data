function ValidateCapabilities(source, arguments) {
    var jQ = jQuery;
    if (jQ('.paymentCenterCapability input:checked').length < 10) {
        arguments.IsValid = true;
        return true;
    }
    else {
        arguments.IsValid = false;
        return false;
    }
}

function ValidateStreetAddress(source, arguments) {
    var streetAddressValue = arguments.Value.trim();
    if (streetAddressValue.length < 3 ||
streetAddressValue.indexOf(' ') < 0 || streetAddressValue.indexOf('%') > -1) {
        arguments.IsValid = false;
        return false;
    }
    else {
        arguments.IsValid = true;
        return true;
    }
}



function RefineSearch(Id, AptElement, StreetElement, ZipCodeElement, SearchBtnElement) {
    this.Id = Id;
    this.AptElement = $(AptElement);
    this.StreetElement = $(StreetElement);
    this.ZipCodeElement = $(ZipCodeElement);
    this.SearchBtnElement = $(SearchBtnElement);
    //Attache localization success and failure events
    this.AttachLocalizationEvents();
    return this;
}

RefineSearch.prototype.OnSubmit = function(postback) {
    var errorDiplayElement = $(errorDisplayDivClientID);
    var errorMessagesElement = $(errorMessagesDivClientID);
    var errorMessageNotLocalizedElement = $(errorMessagesNotLocalizedDivClientID);

    errorDiplayElement.className = "HideErrorDisplay";
    errorMessageNotLocalizedElement.className = "HideErrorDisplay";

    var isValid = Page_ClientValidate("RefineSearchVGrp");
    if (!isValid) {
        errorDiplayElement.className = "ErrorDisplay";
        SetRequiredFieldStyle();
        return false;
    }

    if (!ValidateCapabilities(this, Page_Validators[0])) {
        errorDiplayElement.className = "ErrorDisplay";
        Page_ClientValidate();
        return false;
    }

    //remove the flag to block the submit if it was raised
    Page_BlockSubmit = false;

    if (this.Validate()) {
        //Populate Localization control
        localize.StreetElement.value = this.StreetElement.value;
        localize.AptElement.value = this.AptElement.value;
        localize.ZipCodeElement.value = this.ZipCodeElement.value;

        //Trigger click event.
        var localizeSubmitBtnClientId = localize.SubmitBtnClientId + "_button";
        $(localizeSubmitBtnClientId).click();
        return false;
    }
    else {
        eval(postback);
        return true;
    }
}

RefineSearch.prototype.LocalizeSuccess = function() {
    SetCookie("localizedResponse", false, "0", false, false);
    var hiddenBtn = $(hiddenSubmitBtnClientID);
    if (hiddenBtn != null)
        hiddenBtn.click();
}

RefineSearch.prototype.LocalizeFailure = function() {
    var errorMessagesElement = $(errorMessagesDivClientID);
    var errorHeadingElement = $("_errorHeading");
    var errorSubHeadingElement = $("_errorSubHeading");
    var errorDisplayElement = $(errorDisplayDivClientID);
    var errorMessageNotLocalizedElement = $(errorMessagesNotLocalizedDivClientID);

    SetCookie("localizedResponse", false, "1", false, false);

    if (localize.LocalizedResponse == localize.LocalizeResponseType.notlocalized) {
        if (errorDisplayElement != null && errorMessagesElement != null && errorMessagesElement != 'undefined' && errorHeadingElement != null && errorSubHeadingElement != null) {
            errorHeadingElement.className = "HideErrorDisplay";
            errorSubHeadingElement.className = "HideErrorDisplay";
            errorMessageNotLocalizedElement.className = "ErrorDisplay";
            errorMessagesElement.className = "HideErrorDisplay";
            errorDisplayElement.className = "ErrorDisplay";
            localize.RedirectUrl = "";
        }
    }
    else if (localize.LocalizedResponse == localize.LocalizeResponseType.notserviceable) {
        if (errorDisplayElement != null && errorMessagesElement != null && errorMessagesElement != 'undefined' && errorHeadingElement != null && errorSubHeadingElement != null) {
            errorHeadingElement.className = "HideErrorDisplay";
            errorSubHeadingElement.className = "HideErrorDisplay";
            errorMessagesElement.innerHTML = errorMessageNotServiceable;
            errorDisplayElement.className = "ErrorDisplay";
            localize.RedirectUrl = "/Localization/NotServiceable.ashx?Reset=1";
        }
    }
    return false;
}

RefineSearch.prototype.AttachLocalizationEvents = function() {
    if (typeof (localize) != 'undefined') {
        localize.ZipCodeElement.disabled = "true";
        localize.StreetElement.disabled = "true";
        localize.AptElement.disabled = "true";    
        localize.ResetLocMod();
        localize.Localize.AddHandler(this.LocalizeSuccess);
        localize.LocalizeFailed.AddHandler(this.LocalizeFailure);
    }
}

RefineSearch.prototype.Validate = function() {
    var isDirty = false;

    var controlId = this.Id;
    var control = eval(controlId);

    if (control != null) {
        var streetAddress = GetCookie("Serviceability", "StreetAddress");
        if (streetAddress != "")
            streetAddress = streetAddress.trim().replaceAll("+", " ");
        if (streetAddress != control.StreetElement.value)
            isDirty = true;

        var ZipCode = GetCookie("Serviceability", "Zip");
        if (ZipCode != null)
            if (ZipCode != control.ZipCodeElement.value)
            isDirty = true;

    }
    return isDirty;
}

function ValidateElement(element) {
    var valid = true;
    if (element.value == null || element.value == undefined || element.value == '' ||
        element.value.length == 0)
        valid = false;
    else if (element.value.trim().length < 3)
        valid = false;
    else if (element.value.trim().indexOf('.') > -1)
        valid = false;
    else if (element.value.indexOf('%') > -1)
        valid = false;
    else if (element.value.indexOf('\'') > -1)
        valid = false;

    return valid;
}

function SetRequiredFieldStyle() {

    $(txtBoxIds[0]).className = "inputText addressTextbox";
    $(txtBoxIds[1]).className = "inputText zipTextbox";

       
    if (!Page_Validators[1].IsValid && !RequiredFieldValidatorEvaluateIsValid(Page_Validators[1])) {
        $(txtBoxIds[0]).className = "inputText addressErrorTextbox";
    }

    if (!Page_Validators[2].IsValid && !RequiredFieldValidatorEvaluateIsValid(Page_Validators[2])) {
        if (txtBoxIds[1].indexOf('zip') > 0)
            $(txtBoxIds[1]).className = "inputText zipErrorTextbox";
    }

    if (!Page_Validators[3].isvalid && !RegularExpressionValidatorEvaluateIsValid(Page_Validators[3])) {
        if (txtBoxIds[1].indexOf('zip') > 0)
            $(txtBoxIds[1]).className = "inputText zipErrorTextbox";
    }

    if (!Page_Validators[4].isvalid) {
        $(txtBoxIds[0]).className = "inputText addressErrorTextbox";
    }

}

