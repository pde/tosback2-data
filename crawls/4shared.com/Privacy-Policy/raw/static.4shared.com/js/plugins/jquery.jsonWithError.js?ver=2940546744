$.getJSONAndProcessError = function (url, params, successHandler, errorHandler) {
    return $.InternalJSONAndProcessError("GET", url, params, successHandler, errorHandler);

};

$.postJSONAndProcessError = function (url, params, successHandler, errorHandler) {
    return $.InternalJSONAndProcessError("POST", url, params, successHandler, errorHandler);

};

$.InternalJSONAndProcessError = function (methodType, url, params, successHandler, errorHandler) {
    return jQuery.ajax({type:methodType, url:url, data:params, success:successHandler, error:errorHandler, dataType:"json"})

};

$.joinErrorsInOneString = function (errors, separator) {
    var allErrors = [];
    for (var propertyName in errors) {
        var errorsAsOneString = errors[propertyName].join("\n")
        allErrors.push(errorsAsOneString)
    }
    var errorsSeparator = separator == undefined ? "\n" : separator;
    return allErrors.join(errorsSeparator);
};

$.submitFormInJSON = function (url, formId, successHandler, errorHandler) {
    $.postJSONAndProcessError(url, $("#" + formId).serializeObject(), successHandler, errorHandler);
}

$.fn.serializeObject = function () {
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    $.each(arrayData, function () {
        var value;

        if (this.value != null) {
            value = this.value;
        } else {
            value = '';
        }

        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [objectData[this.name]];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
};
