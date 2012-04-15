// ****************************************************************************
// used to validate text boxes
// ****************************************************************************
function RemoveAllSpecialCharsHandler() {
    RemoveAllSpecialChars(this);
}

function RemoveAllSpecialChars(element) {
    //var element = event.element();
    element = $(element);
    var regEx = /[;\'><]/g;
    if (element.val().search(regEx) > -1) {
        element.val(element.val().replace(/\'/g, '').replace(/[;><]/g, ' '));
        if ($(element[0].name + 'SA').length == 0) {
            element.after('<span id="' + element[0].name + 'SA" class="SecurityAlert" title="We had to remove some of your input for security reasons.">!!<span>');
        }
    }
}

function RemoveSpecialCharsHandler() {
    RemoveSpecialChars(this);
}

function RemoveSpecialChars(element) {
    //var element = event.element();
    element = $(element);
    var regEx = /[;><]/g;
    if (element.val().search(regEx) > -1) {
        element.val(element.val().replace(regEx, ' '));
        if ($(element[0].name + 'SA').length == 0) {
            element.after('<span id="' + element[0].name + 'SA" class="SecurityAlert" title="We had to remove some of your input for security reasons.">!!<span>');
        }
    }
}

function loadCleanupScript() {
    if ((typeof allowAll != 'undefined') && (typeof lessSecure != 'undefined')) {
        $('form').each(
            function(index2, ele2) {
                $(ele2).submit(function() {
                    $('input[type="text"], textarea').each(
                        function(index, ele) {
                            if (allowAll.indexOf(ele.name.toLowerCase()) >= 0) {
                                //Don't do anything
                            }
                            else if (lessSecure.indexOf(ele.name.toLowerCase()) >= 0) {
                                RemoveSpecialChars($(ele));
                            }
                            else {
                                RemoveAllSpecialChars($(ele));
                            }
                        }
                    );
                });
            }
        )

        $('input[type="text"], textarea').each(
            function(index, ele) {
                if (allowAll.indexOf(ele.name.toLowerCase()) >= 0) {
                    //Don't do anything
                }
                else if (lessSecure.indexOf(ele.name.toLowerCase()) >= 0) {
                    $(ele).blur(RemoveSpecialCharsHandler);
                }
                else {
                    $(ele).blur(RemoveAllSpecialCharsHandler);
                }
            }
        );
    }
}

$(document).ready(function() {
    loadCleanupScript();
    if (typeof Sys != 'undefined') {
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(loadCleanupScript);
    }
});


// ref : http://techpatterns.com/downloads/javascript_cookies.php
function Get_Cookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split('=');


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}

//This function will get the whole cookie value as opposed to only the first value in Get_Cookie Function.
function GetCookieValue(cookieName) 
{
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) 
    {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split('=');


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == cookieName) 
        {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) 
            {
                cookie_value = a_all_cookies[i].replace(cookie_name + "=", "");
                cookie_value = unescape(cookie_value.replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) 
    {
        return null;
    }
}

// ****************************************************************************
// Internal Campaign Tracking Helper.  Will add the value of the icid attribute to the href of an
// anchor element.
// ****************************************************************************
var ICIDHelper = {
    init: function() {
        $('a[icid]').each(
			function(index, anchor) {
			    var sep = (anchor.href.indexOf('?') > 0) ? '&' : '?';
			    anchor.href = anchor.href + sep + 'icid=' + encodeURIComponent($(anchor).attr('icid').value);
			}
		);
    }
};

$(document).ready(ICIDHelper.init);

// ****************************************************************************
// cleans up AJAX response from RenderControls
// ****************************************************************************
var CleanAjaxResponse = function(responseText) {
    return responseText.replace(/<\/?form.*?>/g, '').replace(/<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" .*?>/g, '');
}

var RemoveScriptFromAjaxResponse = function(responseText) {
    return responseText.replace(/<\/?script.*?>/g, '');
}

// calling this method is not usually a good idea.
//   searches every element in the DOM to return results; very expensive.
function GetElementByAspDotNetId(aspDotNetId) {
    var elements = $('[name$=' + aspDotNetId + ']');
    var element = null;
    
    if(elements.length > 0) {
        element = elements[0];
    }
    
    return element;
}

function GetElementByAspDotNetIdWithNarrowingCss(narrowingCss, aspDotNetId) {
    var elements = $(narrowingCss + ' [name$=' + aspDotNetId + ']');
    var element = null;
    
    if(elements.length > 0) {
        element = elements[0];
    }
    
    return element;
}

function ConcatExceptNullOrEmpty() {
    var concatenatedString = '';

    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i].length) {
            concatenatedString += arguments[i] + ' ';
        }
    }

    if (concatenatedString.length > 0) {
        concatenatedString = concatenatedString.substring(0, concatenatedString.length - 1);
    }

    return concatenatedString;
}

function DecryptCookieData(data) {
    if ((data.toString().indexOf('@@') == -1) && (data.toString().indexOf('@') > -1))
        return data;

    var output = '';
    var dc = "";

    data = data.toString().replace("@@", "@");
    for (var i = 0; i < data.toString().length; i++) {
        dc = data.substr(i);
        output = output + String.fromCharCode(dc.charCodeAt(0) ^ ((i % 13) + 1));
    }
    return output.toString().replace("@@", "@");
}


// ****************************************************************************
// Functions for working with FURLs
// ****************************************************************************

//Gets the real native url on those pages that use FURLs
function GetRealCurrentUrl() {
    var ret = '';
    try {  //hidden input field has native url as the value.
        ret = seoRoutesNativeUrl;
    } catch (ex) { }
    try {
        ret = jQuery("#SEORoutesNativeUrl").val();
    } catch (ex) { }
    return ret ? ret : '';
}

function GetRealCurrentQueryStringAsHash() {
    var hash = {};
    var hasProperty = false;
    var url = GetRealCurrentUrl();
    if (!!url) {
        var queryString = url.split('?').length > 1
               ? url.split('?')[1]
               : '';
        var params = queryString.split('&');

        for (var i in params) {
            if (jQuery.trim(params[i])) {
                var param = params[i].split('=');
                if (param.length > 1
                       && jQuery.trim(param[0])
                       && jQuery.trim(param[1])) {
                    hash[param[0].toLowerCase()] = param[1];
                    hasProperty = true;
                }
            }
        }
    }
    if (hasProperty) {
        return hash;
    }
    else {
        return null;
    }
}