/*****************************************************************************
This file contains the functions needed to initialize the headers in the site
when it is loaded through Chameleon. It was developed in 2009FB2.

Main function in this file: InitHeader()
*****************************************************************************/
//Main function in the file
function InitHeader() {
    HighlightCurrentTab();

    if (typeof (_runningFromMicrosite) == "undefined") {
        ActivatePreviouslyViewProductsLink('PreviouslyViewProducts');
        InitUserLogin('SignIn', 'NotUser', 'FrVisit');
        SetShoppingBagCount('ShoppingBagCount');
        ShowCardLinks('YourCreditCard', 'PreApprovedOffer', 'SavingsId');
        ShowShoppersClubLogo('logo_img', 'logo_link');
    }
    else {
        ActivatePreviouslyViewProductsLink('PreviouslyViewProducts', 'vendor');
        InitUserLogin('SignIn', 'NotUser', 'FrVisit', 'vendor');
        SetShoppingBagCount_Vendor('ShoppingBagCount', 'vendor');
        ShowCardLinks('YourCreditCard', 'PreApprovedOffer', 'SavingsId', 'vendor');
        ShowShoppersClubLogo('logo_img', 'logo_link', 'vendor');
    }

    ActivateWishList('MyWishList');

    // Initialize and show promotion slider
    offers_load();
    autoScroll('newsslider', 'newssection', 5, true);
    PopulateSearchTerm();

     /* search suggestions and history */
    var searchInput = $('#search-terms'); // header search box; nothing else to config
    if (!searchInput.hasClass('affiliate')) { SearchDeluxe.Init($('div.search-suggestions'), searchInput); }
}

var SearchDeluxe = { // InteractiveSearch? SearchWithSuggestionsAndHistory?
    cookieLifespan: 5, cookieDelimiter: '--',

    Init: function (container, searchInput) {
        if (typeof autoCompleteDelay == 'undefined') { var autoCompleteDelay = 300; } // don't trust Chameleon...
        searchInput.keyup(function (event) { // auto-complete
            if (searchInput.val().length > 2) {
                if (event.keyCode != 38 && event.keyCode != 40) { // if input is not arrow keys, get suggestions
                    clearTimeout(SearchDeluxe.delayedSuggest);
                    SearchDeluxe.delayedSuggest = setTimeout(function () {
                        SearchDeluxe.Suggest(container, searchInput, $.trim(searchInput.val()));
                    }, autoCompleteDelay);
                } else { SearchDeluxe.ArrowKeys(container, searchInput, event.keyCode); }
            } else if (searchInput.val().length < 1) { // show history
                if (!($.browser.msie && $.browser.version < 8)) { // IE7 crashes if showing history after deleting text
                    SearchDeluxe.ShowHistory(container, searchInput, $.trim(searchInput.val()));
                }
                if (event.keyCode == 38 || event.keyCode == 40) {
                    SearchDeluxe.ArrowKeys(container, searchInput, event.keyCode);
                }
            } else { container.fadeOut('fast'); }
        }).focus(function () { // show history
            if (searchInput.val().length < 1) {
                SearchDeluxe.ShowHistory(container, searchInput, $.trim(searchInput.val()));
            }
        }).blur(function () { container.fadeOut('fast'); });
    },

    Suggest: function (container, searchInput, searchTerms) {
        if (searchInput.val().length < 3) { return false; } // did user delete search terms during the timeout delay?
        searchInput.attr('user', searchTerms); // save user's input
        $.ajax({
            url: '/Search/AutoComplete.aspx?Kwd=' + $.trim(searchTerms),
            dataType: 'json',
            success: function (data) {
                var suggestionsHTML = 'Suggestions:';
                if (data.KwdRes.length > 0) {
                    $.each(data.KwdRes, function (i, KwdRes) {
                        var suggestion = KwdRes.kwd.toLowerCase().split(' ');
                        var formattedSuggestion = ' ';
                        for (var i = 0; i < suggestion.length; i++) {
                            $.each(searchTerms.toLowerCase().split(' '), function (j, text) {
                                if (suggestion[i].match(text)) {
                                    if (!suggestion[i].match('<')) {
                                        suggestion[i] = suggestion[i].replace(text, '<strong>' + text + '</strong>');
                                    }
                                }
                            });
                            formattedSuggestion += suggestion[i] + ' ';
                        }
                        suggestionsHTML += '<a href="/Search/SearchResults.aspx?SearchHeader=' + $.trim(formattedSuggestion.replace(/<[^>]+>/ig, "")) + '">' + formattedSuggestion + '</a>';
                    });
                    container.html(suggestionsHTML);
                    SearchDeluxe.LinkBehaviors(container, searchInput, searchTerms);
                    container.fadeIn('fast');
                } else { container.fadeOut('fast'); }
            }
        });
    },

    ArrowKeys: function (container, searchInput, key) {
        if (!container.is(':visible')) { container.fadeIn('fast'); }
        var containerLinks = container.children('a');
        if (containerLinks.length == 0) { return false; } // no current suggestions/history 
        var highlighted = container.children('a').index($('.selected'));
        containerLinks.removeClass('selected');
        highlighted += key - 39; // keycodes: up = 38; down = 40
        if (highlighted == -2) { highlighted = containerLinks.length - 1; } // up key from search box
        if (highlighted == -1 || highlighted == containerLinks.length) { // selection is in the box; restore search terms
            searchInput.val($.trim(searchInput.attr('user')));
        } else { // highlight and replace search terms with suggestion
            var selectedTerms = containerLinks.eq(highlighted);
            searchInput.val($.trim(selectedTerms.html().replace(/<[^>]+>/ig, '').replace(/&amp;/g, '&'))); // strong tags and ampersands
            selectedTerms.addClass('selected');
        }
    },

    LinkBehaviors: function (container, searchInput, searchTerms) {
        container.children('a').bind('click mouseover', function () { // replace the search text
            searchInput.val($.trim($(this).html().replace(/<[^>]+>/ig, '').replace(/&amp;/g, '&'))); // strong tags and ampersands
            container.children('a').removeClass('selected');
            $(this).addClass('selected');
        });
        container.mouseout(function () {
            if (container.is(':visible')) {
                searchInput.val(searchTerms); // restore user input
                container.children('a').removeClass('selected');
            }
        });
        container.children('span').click(function () { SearchDeluxe.RemoveHistory(searchInput, this); });
    },

    ShowHistory: function (container, searchInput, searchTerms) {
        searchInput.attr('user', ' '); // kill any old user input
        var cookie = readCookie('SearchHistory');
        if (cookie) { // if no cookie, UpdateHistory() will create it when necessary
            var historyHTML = 'Previous Searches:';
            var cookieValues = cookie.split(SearchDeluxe.cookieDelimiter);
            for (var i = 0; i < cookieValues.length; i++) {
                historyHTML += '<a class="history" href="/Search/SearchResults.aspx?SearchHeader=' + cookieValues[i] + '">' + cookieValues[i] + '</a>';
                historyHTML += '<span class="remove-history" href="#"></span>';
            }
            container.html(historyHTML);
            SearchDeluxe.LinkBehaviors(container, searchInput, searchTerms);
            container.fadeIn('fast');
        }
    },

    UpdateHistory: function () { // called by Search/SearchResults.aspx
        var searchTerms = decodeURI((RegExp('SearchHeader=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]).replace('+', ' '); // get search terms from URL (thanks, SO)
        searchTerms = searchTerms.replace(SearchDeluxe.cookieDelimiter, '???'); // don't confuse things if search involves the delimiter
        var cookie = readCookie('SearchHistory');
        if (!cookie) { createCookie('SearchHistory', searchTerms, SearchDeluxe.cookieLifespan); }
        else { // check the history for duplicate searches
            var cookieValues = cookie.split(SearchDeluxe.cookieDelimiter); var duplicate = false;
            for (var i = 0; i < cookieValues.length; i++) {
                if (searchTerms == cookieValues[i]) { duplicate = true; }
            }
            if (!duplicate) { // append the latest search to history, trimming old searches if necessary
                if (cookieValues.length < 5) { cookie += SearchDeluxe.cookieDelimiter + searchTerms; }
                else { cookie = cookie.substr(cookie.indexOf(SearchDeluxe.cookieDelimiter) + 2) + SearchDeluxe.cookieDelimiter + searchTerms; }
                createCookie('SearchHistory', cookie, SearchDeluxe.cookieLifespan);
            }
        }
    },

    RemoveHistory: function (searchInput, entry) {
        var cookie = readCookie('SearchHistory');
        var cookieValues = cookie.split(SearchDeluxe.cookieDelimiter);
        for (var i = 0; i < cookieValues.length; i++) { // remove the entry from the cookie
            if (cookieValues[i] == $(entry).prev().html()) { cookieValues.splice(i, 1); }
        }
        cookie = cookieValues.join('--');
        createCookie('SearchHistory', cookie, SearchDeluxe.cookieLifespan);
        searchInput.focus(); // brings history back up
    }
};  // end SearchDeluxe

function ShowShoppersClubLogo(ClubLogo, LogoLink, vendorName) {
    if (GetLoginStatus(vendorName)) {
        var MembershipStatus =
         {
             NoMember: 0,
             Member: 1,
             Joined: 2,
             Expired: 3,
             NotEligible: 4,
             MemberJoined: 5,
             ExpiredJoined: 6,
             Guestmember: 7
         };
        var cookieValue;
        var cookieName = GetUserCookieName(vendorName);
        var subCookiePrefix = GetSubCookiePrefix(vendorName);

        cookieValue = GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.ShoppersClubMember');
        
        if((cookieValue != null) && cookieValue == MembershipStatus.Member.toString())
        {
           {
              
              $('#header-logo').attr('src', '//secureimages.redcatsusa.com/images/site_images/mastersite/osp_header_2011_logo_shoppers_club.png');
           }
        }
    }
}

function ShowCardLinks(YourCreditCardId, PreApprovedOfferId, SavingsId, vendorName) {
    var hasPreApprovedOffer = false;
    var hasPreApprovedOfferDeclined = false;
    var hasAdsCards = false;
    var cookieValue;
    var htmlElement;
    var cookieName = GetUserCookieName(vendorName);
    var subCookiePrefix = GetSubCookiePrefix(vendorName);

    cookieValue = GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.HasPreApprovedOffer');

    if ((cookieValue != null) && (cookieValue.toLowerCase() == 'true')) {
        hasPreApprovedOffer = true;
    }

    cookieValue = GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.PreApprovedOfferDeclined');
    if ((cookieValue != null) && (cookieValue.toLowerCase() == 'true')) {
        hasPreApprovedOfferDeclined = true;
    }

    cookieValue = GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.HasAdsCard');
    if ((cookieValue != null) && (cookieValue.toLowerCase() == 'true')) {
        hasAdsCards = true;
    }

    cookieValue = GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.CreditInfoString');
    if ((cookieValue != null) && (cookieValue.indexOf('A') == 0)) {
        hasAdsCards = true;
    }

    if ((hasPreApprovedOffer == true) && (hasPreApprovedOfferDeclined == false)) {
        htmlElement = document.getElementById('SavingsId');
        if (htmlElement != null) {
            htmlElement.style.display = 'none';
        }

        htmlElement = document.getElementById('PreApprovedOffer');
        if (htmlElement != null) {
            htmlElement.style.display = 'block';
        }
    }
    else if (hasAdsCards == true) {
        htmlElement = document.getElementById('SavingsId');
        if (htmlElement != null) {
            htmlElement.style.display = 'none';
        }

        htmlElement = document.getElementById('YourCreditCard');
        if (htmlElement != null) {
            htmlElement.style.display = 'block';
        }
    }

    return true;
}

function RedirectToPreApprovedOffer() {
    window.location = BaseURL + 'Account/Acct_PreQualifiedOffer_plcc.aspx';
}

function InitUserLogin(SignInId, NotSignedInId, FrVisitId, vendorName) {
    var cookieName = GetUserCookieName(vendorName);
    var subCookiePrefix = GetSubCookiePrefix(vendorName);

    if (GetLoginStatus(vendorName)) {
        var FirstName = toTitleCase(GetDecodedSubCookieValue(cookieName, subCookiePrefix + '.FirstName'));
        $("#welcome_msg_txt").hide();
        $('#' + FrVisitId).hide();
        $('#' + SignInId).html('<span class="welcome-back">Welcome back, ' + FirstName + '!</span>');
        $('#' + SignInId).css('cursor', 'text').css('text-decoration','none');
        $('#' + NotSignedInId).html('Not ' + FirstName + '?'); 
    }
}


function HighlightCurrentTab() {
    if (GetTopLevelDepartment() > 0) {
        // find all header anchor tags for top level dept tabs and append classes with '-active'
        $('.main-site-header li.dept-' + GetTopLevelDepartment() + ' a').each(function () {
            $(this).attr('class', $(this).attr('class') + '-active');
        });                                                                                 
    }
}


function SetShoppingBagCount(ShoppingBagId) {
    if (document.getElementById(ShoppingBagId) != null) {
        if (GetSubCookieValue('Basket', 'Indy.Basket.BasketCount') != null) {
            document.getElementById(ShoppingBagId).innerHTML = '(' + GetSubCookieValue('Basket', 'Indy.Basket.BasketCount') + ')';
        }
        else {
            document.getElementById(ShoppingBagId).innerHTML = '(0)';
        }
    }
}

function SetShoppingBagCount_Vendor(ShoppingBagId, vendorName) {
    if (typeof (vendorName) != "undefined") {
        if (document.getElementById(ShoppingBagId) != null) {
            var basketCount = GetCookie(vendorName + '.Basket.BasketCount');
            if (basketCount != null) {
                document.getElementById(ShoppingBagId).innerHTML = '(' + basketCount + ')';
            }
            else {
                document.getElementById(ShoppingBagId).innerHTML = '(0)';
            }
        }
    }
}


function LogoutUser() {
    setSubCookieAndCookie('User', 'Indy.FirstName', '');
    setSubCookieAndCookie('User', 'Indy.MasterId', '');
}

//This function returns a bool to indicate the login status.
function GetLoginStatus(vendorName) {
    var cookieName = GetUserCookieName(vendorName);
    var subCookiePrefix = GetSubCookiePrefix(vendorName);

    if (
        (GetSubCookieValue(cookieName, subCookiePrefix + '.MasterId') != null) &&
        (GetSubCookieValue(cookieName, subCookiePrefix + '.FirstName') != null) &&
        (GetSubCookieValue(cookieName, subCookiePrefix + '.MasterId') != '') &&
        (GetSubCookieValue(cookieName, subCookiePrefix + '.FirstName') != '')
      )
    { return true; }
    else { return false; }
}



// search
function GoSearch(SearchInputId) {
    var searchVal = encodeURIComponent($('#' + SearchInputId).val());
    var qo_regex = /^\d{1,4}\-?\d{5}\-?\d{3,4}$/; // cat numbers vary. hyphens are optional.
    if (qo_regex.test(searchVal)) { // QuickOrder numbers go to product pages.
        $('div.search-suggestions').fadeOut('fast', function () { $('div.search-suggestions').remove(); });
        location.href = BaseURL + "Product/ProductDetail.aspx?qoId="+searchVal;
    } else {
        while (searchVal.substring(0, 3) == '%20') {
            searchVal = searchVal.substring(3, searchVal.length); // trim any initial spaces
        }
        if (searchVal != '' && searchVal.indexOf('keyword') < 0) { // only search if there are terms
            $('div.search-suggestions').fadeOut('fast', function () { $('div.search-suggestions').remove(); });
            location.href = BaseURL + "Search/SearchResults.aspx?SearchHeader=" + searchVal;
        }
    }
}

// search Affiliate
function GoAffiliateSearch(SearchInputId) {
    var searchVal = $('#search-terms').val();
    var qo_regex = /^\d{1,4}\-?\d{5}\-?\d{3,4}$/; // cat numbers vary. hyphens are optional.
    while (searchVal.substring(0, 3) == '%20') {
        searchVal = searchVal.substring(3, searchVal.length); // trim any initial spaces
    }
    if (searchVal != '' && searchVal.indexOf('keyword') < 0) { // only search if there are terms
        location.href = BaseURL + "AffiliateBrowsing/Search/SearchResults.aspx?SearchHeader=" + searchVal + "&nop=12";
    }
}

function PopulateSearchTerm() {
    // set up the search box behaviors
    $('#search-terms').val(search_box_default_text);
    $('#search-terms').blur(function() {
        if ($('#search-terms').val() == '') { $('#search-terms').val(search_box_default_text) }
    });
    $('#search-terms').focus(function() {
        if ($('#search-terms').val() == search_box_default_text) { $('#search-terms').val('') }
    });
    $('#search-terms').keypress(function (event) {
        if (event.which == '13') {
            event.preventDefault();
            if ($('#search-terms').hasClass('affiliate')) {
                GoAffiliateSearch('');
            }
            else { GoSearch('search-terms'); }
        }
    });


    var searchControl = $('#search-terms');
    if (searchControl != null) {
        var queryStringCollection = window.location.search.replace('?', '').split('&')
        for (cnt = 0; cnt < queryStringCollection.length; cnt++) {
            var qs = queryStringCollection[cnt];
            var nameValueCollection = qs.split('=')
            if (nameValueCollection.length >= 2) {
                if (nameValueCollection[0] == 'SearchHeader') {
                    searchControl.value = decodeURIComponent(nameValueCollection[1]);
                    break;
                }
            }
        }
    }
}


/*************************** END ***************************/
function ActivatePreviouslyViewProductsLink(PVPId, vendorName) {
    var prevProducts;
    if (typeof (vendorName) == "undefined") {
        prevProducts = GetCookie('LastViewedProducts');
    } else {
        prevProducts = GetCookie(vendorName + '.LastViewedProducts');
    }

    var RegEX = /(([0-9]+)#([0-9]+)\*([0-9]+)){1,}/;

    if (RegEX.test(prevProducts)) {
        if (document.getElementById(PVPId) != null) {
            document.getElementById(PVPId).style.display = '';
        }
    } else {
        if (document.getElementById(PVPId) != null) {
            document.getElementById(PVPId).style.display = 'none';
        }
    }
}

//This function shows wishlist link if the user has added any
//items to the wishlist.
function ActivateWishList(WishListId) {
    if (IsUserHavingWishList()) {
        if (document.getElementById(WishListId) != null) {
            document.getElementById(WishListId).style.display = '';
        }
    } else {
        if (document.getElementById(WishListId) != null) {
            document.getElementById(WishListId).style.display = 'none';
        }
    }
}

function toTitleCase(strToConvert) {
    var mx_replace = new Array('to', 'it', 'on', 'the', 'a', 'and', 'or', 'nor', 'of', 'in');
    var mx_ignore = new RegExp('[-\\s]');
    var mx_newS = strToConvert;
    var mx_prevC = '';
    var mx_thisC = null;
    var mx_match = null;
    var mx_iR = '';

    mx_newS = mx_newS.replace(/\s+|\r|\n/g, ' ').toLowerCase();
    mx_newS = mx_newS.replace(/^\s*/, '');
    mx_newS = mx_newS.replace(/\s*$/, '');

    for (var i = 1; i < mx_newS.length + 1; i++) {
        mx_iR = new RegExp('^' + (i != 1 ? '(.{' + eval(i - 1) + '})' : '') + '(.)' + (i != mx_newS.length ? '(.{' + eval(mx_newS.length - i) + '})' : '') + '$');
        mx_match = mx_newS.match(mx_iR);
        mx_thisC = ((mx_match.length == 3 && i == 1) ? mx_match[1] : mx_match[2]);

        if (mx_prevC.match(mx_ignore) != null || mx_prevC == '') {
            mx_newS = ((mx_newS.length == 1) ? mx_newS.toUpperCase() :

           (mx_match.length == 3 && i == 1) ? mx_newS.replace(mx_iR, mx_match[1].toUpperCase() + mx_match[2]) :
           (mx_match.length == 3 && i == mx_newS.length) ? mx_newS.replace(mx_iR, mx_match[1] + mx_match[2].toUpperCase()) :

           mx_newS.replace(mx_iR, mx_match[1] + mx_match[2].toUpperCase() + mx_match[3]));
        }
        mx_prevC = (mx_thisC ? mx_thisC.toLowerCase() : '');
    }

    for (var n = 0; n < mx_replace.length; n++) {
        mx_iR = new RegExp(' ' + mx_replace[n] + ' ', 'gi');
        mx_newS = mx_newS.replace(mx_iR, ' ' + mx_replace[n] + ' ')
    }
    return (mx_newS);
}
/********************************The following functions are provided for the brand to support making changes to the header ***************/
//This function returns the First Name of the logged in user.
function GetFirstName() {
    if (GetLoginStatus()) {
        var FirstName = toTitleCase(GetDecodedSubCookieValue('User', 'Indy.FirstName'));
        return FirstName;
    } else { return ''; }
}

//This function returns a bool to indicate the login status.
function IsUserLoggedIn() {
    if (
        (GetSubCookieValue('User', 'Indy.MasterId') != null) &&
        (GetSubCookieValue('User', 'Indy.FirstName') != null) &&
        (GetSubCookieValue('User', 'Indy.MasterId') != '') &&
        (GetSubCookieValue('User', 'Indy.FirstName') != '')
      ) {
        return true;
    }
    else { return false; }
}

//This function indicates if the user has by brand credit cards.
function IsUserHavingWishList() {
    if (GetDecodedSubCookieValue('User', 'Indy.WishListCount') != null) {
        if (GetDecodedSubCookieValue('User', 'Indy.WishListCount') == 'true') {
            return true;
        }
    }
    return false;
}

function GetTopLevelDepartment() {
    if ((document.getElementById('hdnTopDeptId') != null) &&
       (document.getElementById('hdnTopDeptId').value != '-2147483648')) {
        return document.getElementById('hdnTopDeptId').value;
    } else { return -1; }
}

function GetShoppingBagCount() {
    if (GetSubCookieValue('Basket', 'Indy.Basket.BasketCount') != null) {
        return GetSubCookieValue('Basket', 'Indy.Basket.BasketCount');
    }
}

function GetUserCookieName(vendorName) {
    if (typeof (vendorName) == "undefined") {
        return "User";
    }
    else { return vendorName + ".User"; }
}

function GetSubCookiePrefix(vendorName) {
    if (typeof (vendorName) == "undefined") {
        return "Indy";
    } else { return vendorName; }
}

/** delete cookie **/

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

/** QV layer **/

function OpenQuickView() {
    document.getElementById('quickinfooverlay').style.display = 'block';
    document.getElementById('dhtmlwindowholder').style.display = 'block';
}

function OpenPopup(sURL, sName, sFeatures, bReplace) {
    var url = "about:blank";
    if (typeof (sURL) != 'undefined' && sURL != null) {
        url = BaseURL + sURL;
    }

    return window.open(url, sName, sFeatures, bReplace);
}

// Function to load the promotions for promotion slider
function offers_load() {
    // Move the offers div inside promoLayer
    var promoLayerDiv = document.getElementById("promoLayer");
    if (promoLayerDiv && promoLayerHtml) {
        promoLayerDiv.innerHTML = promoLayerHtml;
    } else {
        // no point to continue forward if either promo layer or the HTML is not there
        return;
    }

    // Display appropriate content based on login status
    var offersTable = document.getElementById("tblOffers");
    var trUser = document.getElementById("trLoggedIn");
    var trGuest = document.getElementById("trNotLoggedIn");
    var newsSliderDiv = document.getElementById("newsslider");
    var newSliderSectionDiv = document.getElementById("newssection-1");
    if (!GetLoginStatus()) {
        // Show appropriate <tr>
        trGuest.style.display = "";
        offersTable.deleteRow(0); // Delete the user row
    } else {
        // Show appropriate <tr>
        trUser.style.display = "block";
        offersTable.deleteRow(1); // Delete the guest row

        // Decode coupons
        var subCookiePrefix = GetSubCookiePrefix();
        var decodedCoupons = GetDecodedSubCookieValue("User", subCookiePrefix + ".CouponInfo");
        var coupons = decodedCoupons.split("¨");

        // Iterate through the coupons
        var sectionIndex = 2;
        for (var couponIndex = 0; couponIndex < coupons.length; couponIndex++) {
            // Get coupon type and title
            var couponFields = coupons[couponIndex].split("§");
            var couponType = couponFields[0];
            var couponTitle = couponFields[1];

            // Check if it is a promo-coupon, only then display it in slider
            if (couponType != "0") {
                continue;
            }

            // Prepare <a> tag for the coupon
            var promotionUrl = "Account/Acct_MyPromotions.aspx";
            if (typeof BaseURL != "undefined" && BaseURL != null) {
                promotionUrl = BaseURL + promotionUrl;
            } else {
                promotionUrl = "/" + promotionUrl;
            }
            var couponHyperLink = '<a style="font-weight: normal; width: 100px;" href="' + promotionUrl + '"> ' + couponTitle + ' </a>';

            // Wrap it in a div tag
            var subElementSlider = document.createElement("div");
            subElementSlider.id = "newssection-" + sectionIndex;
            subElementSlider.className = "newssection";
            subElementSlider.innerHTML = couponHyperLink;

            // Append it to the parent newsSliderDiv
            newsSliderDiv.insertBefore(subElementSlider, newSliderSectionDiv.nextSibling);

            // Increment section index
            sectionIndex = sectionIndex + 1;
        }

        // update the Id of the last section so it appears in slider
        var sectionX = document.getElementById("newssection-X");
        sectionX.id = "newssection-" + ($(sectionX).siblings('.newssection').length + 1);
    }
}



/// Slider for Header

var SLIDETIMER = 1;
var SLIDESPEED = 1;
var SCROLLTIMER = 3;
var SCROLLSPEED = 2;
var STARTINGOPACITY = 50;

// handles section to section scrolling of the content 
function slideContent(id, prefix, timer) {
    var div = document.getElementById(id);
    var slider = div.parentNode;
    clearInterval(slider.timer);
    slider.section = parseInt(id.replace(/\D/g, ''));
    slider.target = div.offsetTop;
    slider.style.top = slider.style.top || '0px';
    slider.current = slider.style.top.replace('px', '');
    slider.direction = (Math.abs(slider.current) > slider.target) ? 1 : -1;
    slider.style.opacity = STARTINGOPACITY * .01;
    slider.style.filter = 'alpha(opacity=' + STARTINGOPACITY + ')';
    slider.timer = setInterval(function () { slideAnimate(slider, prefix, timer) }, SLIDETIMER);
}

function slideAnimate(slider, prefix, timer) {
    var curr = Math.abs(slider.current);
    var tar = Math.abs(slider.target);
    var dir = slider.direction;
    if ((tar - curr <= SLIDESPEED && dir == -1) || (curr - tar <= SLIDESPEED && dir == 1)) {
        slider.style.top = (slider.target * -1) + 'px';
        slider.style.opacity = 1;
        slider.style.filter = 'alpha(opacity=200)';
        clearInterval(slider.timer);
        if (slider.autoscroll) {
            setTimeout(function () { autoScroll(slider.id, prefix, timer) }, timer * 1000);
        }
    } else {
        var pos = (dir == 1) ? parseInt(slider.current) + SLIDESPEED : slider.current - SLIDESPEED;
        slider.current = pos;
        slider.style.top = pos + 'px';
    }
}

// cancel the scrolling on mouseout //
function cancelScroll(id) {
    var div = document.getElementById(id);
    div.style.opacity = 1;
    div.style.filter = 'alpha(opacity=100)';
    clearTimeout(div.timer);
}

// initiate auto scrolling //
function autoScroll(id, prefix, timer, restart) {
    var div = document.getElementById(id);
    div.autoscroll = (!div.autoscroll && !restart) ? false : true;
    if (div.autoscroll) {
        var sections = div.getElementsByTagName('div');
        var length = sections.length;
        div.section = (div.section && div.section < length) ? div.section + 1 : 1;
        slideContent(prefix + '-' + div.section, prefix, timer);
    }
}


/**** START -  Fill size and color drop downs  ****/

// Functions for product configuration dropdowns
function SetSizeDropdownDefaultValues(sizedropdownId, qtyDropdownId) {
    var sizeDropdown = document.getElementById(sizedropdownId);
    var quantityDropdown = document.getElementById(qtyDropdownId);
    if (sizeDropdown.length == 2) {
        //remove the default "select size" option if only one size and one color available
        sizeDropdown.remove(0);
    }
    quantityDropdown.selectedIndex = 1;
}

//Helper function to populate color options  for product
////sample color option "***15840281|0||1190|One Size|LINEN|$12.99|B***15840283|0||1190|One Size|RUSSET|$12.99|B"
function FillColorDropdownForProduct(colordropdownId, selectedSize, hidSizeValueID) {
    //get color dropdown refernce
    var colorDropdown = document.getElementById(colordropdownId);
    var hidsize = document.getElementById(hidSizeValueID);

    if (colorDropdown == null) {
        return;
    }

    colorDropdown.length = 0;
    colorDropdown[0] = new Option("Then, Select Color", "0");
    //if size is not yet selected add this default option
    if (selectedSize == "")
        colorDropdown[1] = new Option("Select Size First", "0");

    //variable to track if available color option is selected
    var selected = -1;
    //split the selectedSize option value, it has all the available colors seperated by ***    
    //sample color option "***15840281|0||1190|One Size|LINEN|$12.99|B***15840283|0||1190|One Size|RUSSET|$12.99|B"
    var colorOptions = selectedSize.split("***");
    if (colorOptions.length > 0) {
        for (var index = 1; index < colorOptions.length; index++) {
            var optionvalues = colorOptions[index].split("|");
            if (optionvalues.length > 0) {
                var colorDesc = optionvalues[5];
                var price = optionvalues[6];
                var displayOption = colorDesc + " " + price;
                var newOption = new Option(displayOption, colorOptions[index]);
                colorDropdown[index] = newOption;
                if (colorOptions[index] == hidsize.value) {
                    newOption.selected = true;
                    selected = 1;
                }
                //if only one color option is available for the selected size, select that color by default                    
                if (colorOptions.length == 2) {
                    newOption.selected = true;
                    //remove the default option		              
                    colorDropdown.remove(0);
                    hidsize.value = colorOptions[1];
                    //set the tracking variable to 1		                
                    selected = 1;
                }
            }
        }
        //if no color option is selected reset the hidden variable
        if (selected == -1) {
            hidsize.value = "0";
        }
    }
}

//Helper function to populate color options  for ensemble
function FillColorDropdownForEnsemble(colordropdownId, selectedSize, hidSizeValueID, lblPriceid, intialprice) {
    //get color dropdown refernce
    var colorDropdown = document.getElementById(colordropdownId);
    var hidsize = document.getElementById(hidSizeValueID);

    if (colorDropdown == null) {
        return;
    }

    colorDropdown.length = 0;
    colorDropdown[0] = new Option("Then, Select Color", "0");
    //if size is not yet selected add this default option
    if (selectedSize == "")
        colorDropdown[1] = new Option("Select Size First", "0");

    //variable to track if available color option is selected
    var selected = -1;
    //split the selectedSize option value, it has all the available colors seperated by ***    
    //sample color option "***15840281|0||1190|One Size|LINEN|$12.99|B***15840283|0||1190|One Size|RUSSET|$12.99|B"
    var colorOptions = selectedSize.split("***");
    if (colorOptions.length > 0) {
        for (var index = 1; index < colorOptions.length; index++) {
            var optionvalues = colorOptions[index].split("|");
            if (optionvalues.length > 0) {
                var colorDesc = optionvalues[5];
                var price = optionvalues[6];
                var displayOption = colorDesc + " " + price;
                var newOption = new Option(displayOption, colorOptions[index]);
                colorDropdown[index] = newOption;
                if (colorOptions[index] == hidsize.value) {
                    newOption.selected = true;
                    selected = 1;
                }
            }
        }
        if (selected == -1) {
            hidsize.value = "0";

        }
    }
    //set the intial pricing text
    EnsembleColorDropdownChanged(hidsize.value, hidSizeValueID, lblPriceid, intialprice)
}

//helper function to set pricing label text on color change
//sample color option "***15840281|0||1190|One Size|LINEN|$12.99|B
function EnsembleColorDropdownChanged(selectedColor, hidSizeValueID, lblPriceid, intialprice) {
    var hidsize = document.getElementById(hidSizeValueID);
    var lblPrice = document.getElementById(lblPriceid);
    if (hidsize != null) {
        hidsize.value = selectedColor;
    }
    if (lblPrice != null) {
        //if no color is selected, set the price lable text to initial price
        if (hidsize.value == "0") {
            lblPrice.innerHTML = intialprice;
        }
        else {
            var optionvalues = selectedColor.split("|");
            if (optionvalues.length >= 6) {
                lblPrice.innerHTML = optionvalues[6];
            }
        }
    }


}

function ColorSelectedChanged(str, hdColorId) {
    var hdColor = document.getElementById(hdColorId);
    var ddlQty = document.getElementById(hdColorId.substring(0, hdColorId.lastIndexOf("_") + 1) + "ddlQty");
    var ddlColor = document.getElementById(hdColorId.substring(0, hdColorId.lastIndexOf("_") + 1) + "ddlColors");
    if (ddlColor.options[ddlColor.selectedIndex].text != "Then, Select Color" && ddlColor.options[ddlColor.selectedIndex].text != "Select Size First") ddlQty.selectedIndex = 1;
    hdColor.value = str;
}

/**** END -  Fill size and color drop downs  ****/

/** [Start] ADS Header offer  **********************************************************************/

var userinfo = readCookie('User');
$(document).ready(function () {
    function checkBrand(card) {
        //show image for brand card based on the flag in cookie
        if (card == 'W') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/womanwithin/1024_WW_cc_control.jpg');
        }
        else if (card == 'O') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/mastersite/1024_OSP_cc_control.jpg');
        }
        else if (card == 'A') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/avenue/1024_AV_cc_control.jpg');
        }
        else if (card == 'J') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/jessicalondon/1024_JL_cc_control.jpg');
        }
        else if (card == 'K') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/KSD/1024_KSD_cc_control.jpg');
        }
        else if (card == 'R') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/roamans/1024_RM_cc_control.jpg');
        }
        else if (card == 'G') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/brylanehome/1024_BH_cc_control.jpg');
        }
        else if (card == 'N') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/KSD/1024_KSD_cc_control.jpg');
        }
        else if (card == 'P') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/mastersite/1024_OSP_cc_control.jpg');
        }
        else if (card == 'H') {
            $('.prea-card-offer > img').attr('src', '//secureimages.redcatsusa.com/images/site_images/brylanehome/1024_BH_cc_control.jpg');
        }
    }

    function checkForOffers() {
        if (userinfo != null && userinfo != '') {
            var brandcard = GetSubCookieValue('User', 'Indy.BrandCreditCard');
            var preapprvd = GetSubCookieValue('User', 'Indy.PreApproval');
            var availcrdt = GetSubCookieValue('User', 'Indy.AvailableCredit');
            if (preapprvd == 'D' || preapprvd == null) {
                //if you are not logged in replace with the default image
                $('.prea-card-offer').replaceWith('<a id="offer-left" href="https://www.womanwithin.com/Account/Apply_CreditCard.aspx?MEC=WW10_006_Hbanner"><img src="//secureimages.redcatsusa.com/images/site_images/womanwithin/100710_email_hp1.jpg" width="461" height="55" border="0" alt="" title="" /></a>');
            } else if (preapprvd == 'A') {
                //if you have accepted the offer show the image and the amount
                $('.header-site-options > div#saving_text').replaceWith('<div class="prea-card-offer"><img src="#" /><span class="greeting"></span><span class="availcred"></span></div>');
                $('div.prea-card-offer > span.greeting').append("Great News! ");
                $('.prea-card-offer > span.availcred').append("Your Available Credit: <strong>$" + availcrdt + "</strong>");
                checkBrand(brandcard);
            } else if (preapprvd == 'True') {
                $('.header-site-options > div#saving_text').replaceWith('<div class="prea-card-offer"><img src="#" /><span class="greeting"></span><span class="availcred"></span></div>');
                $('div.prea-card-offer > span.greeting').append("Great News! ");
                $('.prea-card-offer > span.availcred').append("Your Available Credit: <strong>$" + availcrdt + "</strong>");
                checkBrand(brandcard);
            } else if (preapprvd == 'P') {
                //if you are preapproved show the 
                $('.header-site-options > div#saving_text').replaceWith('<div class="prea-card-offer"><img src="#" /><span class="greeting"></span><span class="availcred"></span></div>');
                $('div.prea-card-offer > span.greeting').append("Pre-approved? ");
                $('.prea-card-offer > span.availcred').append('<a href="/Account/Acct_PreQualifiedOffer_plcc.aspx">learn more ></a>&nbsp;&nbsp;&nbsp;&nbsp;');
                checkBrand(brandcard);
            }
        }
        else {
            //alert('no cookie');
            $('.prea-card-offer').replaceWith('<a id="offer-left" href="https://www.womanwithin.com/Account/Apply_CreditCard.aspx?MEC=WW10_006_Hbanner"><img src="//secureimages.redcatsusa.com/images/site_images/womanwithin/100710_email_hp1.jpg" width="461" height="55" border="0" alt="" title="" /></a>');
        }
    }
    checkForOffers();
})
/** [END] ADS Header Offer  **********************************************************************/
