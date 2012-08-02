function ajaxCall(URl, Data, Success, Error) {
    var options = {
        type: "POST",
        url: URl,
        data: Data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Success,
        error: Error
    };
    //Call the PageMethods
    jQuery.ajax(options);
}