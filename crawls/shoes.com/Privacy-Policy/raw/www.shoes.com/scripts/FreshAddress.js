// FreshAddress AJAX Validation Library v1.0
function validateEmail(email, callback) {
    var url = "https://rt.freshaddress.com/v4?service=react&token=" + freshAddressSiteToken + "&format=json&email=" + encodeURIComponent(email) + "&jsoncallback=?";
    $.getJSON(url, callback);
}
