var site_base_url = window.location.protocol + "//" + window.location.hostname;
var queryParams = window.location.search;

// sets up the affiliate cookies, promocodes
var ajaxAffiliateRequestURL = site_base_url + "/js/cookie_manager.jsp";
var ajaxAffiliateParams = queryParams.replace("?","");
$.ajax({
    type: "POST",
    url: ajaxAffiliateRequestURL,
    data: ajaxAffiliateParams,
    dataType: "json",
    timeout: 15000,
    success: function(data) {
        $(document).ready(function() {
            var afObject = data.affiliateCookie;
            if (afObject != undefined){
                SetCookie(afObject.affiliateCookieName, afObject.affiliateCookieValue, afObject.affiliateCookieExpiration, afObject.path);
            }
            $("#headerItemCount").html(data.itemsCount);
        });
        return true;
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("An error has occurred setting cookies: " + errorThrown);
        return false;
    }
});

//updating welcome message for logged in user.
var ajaxHeaderURL = site_base_url + "/js/header.jsp";
var headerparams = "";
$.ajax({
    type: "POST",
    url: ajaxHeaderURL,
    data: headerparams,
    dataType: "html",
    timeout: 15000,
    success: function(data) {
        $(document).ready(function() {
            $("#welcome").html(data);
        });
        return true;
    },
    error: function() {
        return false;
    }
});
