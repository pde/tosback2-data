// JavaScript Document

function myfunction() {
    var elems = document.getElementsByTagName("input");
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].type == "text")elems[i].value = "";
    }
}

function clearKeyword() {
    var text = document.getElementById("header_txtSearch");
    if ('Enter Keyword' == text.value) {
        text.value = "";
    }
}

// Parse host name for banner and  environ value
banner = unescape(window.location.hostname);

if (banner.indexOf('localhost') < 0) {
    var array = banner.split('.');
    banner = array[1];
    environ = array[0];
} else { // for testing on development environment
    banner = 'Dominicks';
    environ = 'www';
}

function image_hover(divid) {
    document.getElementById(divid).innerHTML = "<img src='../../images/t2_hover_arrow.gif'/>";
}
function image_mouseout(divid1) {
    document.getElementById(divid1).innerHTML = "<img src='../../images/t2_static_arrow.gif'/>";
}


function submitform(name) {
//dijit.byId('dialog1').style.display = "none";

    name.submit();
}
function createDialog(dialogName) {

    dijit.byId(dialogName).show();
}

function clearKeywordws(Id) {
    var text = document.getElementById(Id);
    text.value = "";
}
function borderfix(containerID) {
    var flashContainer = document.getElementById(containerID);
    var flashMovie = document.createElement("div");
    flashMovie.innerHTML = flashContainer.innerHTML.replace(/</g, "<").replace(/>/g, ">");
    flashContainer.parentNode.insertBefore(flashMovie, flashContainer);
    flashContainer.parentNode.removeChild(flashContainer);
    flashMovie.setAttribute("id", containerID);
}
function pop_win(url, size) {
    var newwindow;
    if (size == '')
        newwindow = window.open(url, '_new');
    else
        newwindow = window.open(url, 'IFL', size);
    if (window.focus) {
        newwindow.focus()
    }
}

function readcookie(name, delimit) {
    if (document.cookie == '') {
        //alert("cookie not set");
        return false;
    }
    else {
        var fC, lC;
        var mcookie = unescape(document.cookie);
        fC = mcookie.indexOf(name);
        var ph = fC + name.length;
        if ((fC != -1) && (mcookie.charAt(ph) == '=')) {
            fC += name.length + 1;
            lC = mcookie.indexOf(delimit, fC);
            if (lC == -1)
                lC = mcookie.length;
            return unescape(mcookie.substring(fC, lC));
        }
        else {
            return false;
        }
    }
}
function recipeReadCookie() {
    var c1 = readcookie("recipe", "#");
    //alert(c1);
}


function writecookie(name, value, delimit) {
    if (document.cookie == '') {
        //alert("no cookie found");
        document.cookie = escape("domain=.content.safeway.com;" + name + "=" + value);
        //alert(document.cookie);
        return false;
    }
    else {
        //alert("found");
        var B4, Af, fC, lC;
        var mcookie = unescape(document.cookie);
        var ncookie;
        fC = mcookie.indexOf(name);
        var ph = fC + name.length;
        if ((fC != -1) && (mcookie.charAt(ph) == '=')) {
            B4 = mcookie.substring(0, fC);
            fC += name.length + 1;
            lC = mcookie.indexOf(delimit, fC);
            if (lC == -1) lC = mcookie.length;
            if (lC == mcookie.length) {
                ncookie = B4 + name + "=" + value;
                document.cookie = escape(ncookie);
                return true;
            }
            else {
                Af = mcookie.substring(lC, mcookie.length);
                ncookie = B4 + name + "=" + value + Af;
                document.cookie = escape(ncookie);
                return true;
            }
        }
        else {
            ncookie = mcookie + delimit + name + "=" + value;
            document.cookie = escape(ncookie);
            return false;
        }
    }
}

function recipeWriteCookie(recipeid) {
    if (recipeid != '') {
        writecookie("recipe", recipeid, "#");
        window.location = "recipereadcookie.htm";
    }
    else {
        return false;
    }
}

function slReadCookie() {
    var c1 = readcookie("slzip", "#");
    var c2 = readcookie("sldept", "#");
    //alert(c1 + ' ' + c2);
}

function slWriteCookie() {
    if (document.getElementById("zip").value != '' && document.getElementById("dept").value != '') {
        writecookie("slzip", document.getElementById("zip").value, "#");
        writecookie("sldept", document.getElementById("dept").value, "#");
        window.location = "slreadcookie.htm";
    }
    else {
        return false;
    }
}

function wsReadCookie() {
    var c1 = readcookie("wszip", "#");
    alert(c1);
}

function wsWriteCookie() {
    if (document.getElementById("weekly_homepage_text_input").value != '') {
        writecookie("wszip", document.getElementById("weekly_homepage_text_input").value, "#");
        window.location = "/IFL/Grocery/WS-Store-Results";
    }
    else {
        return false;
    }
}

function navigate(page, url) {
    if (url.indexOf("?") != -1) {
        url = url + "&banner=" + banner + "&env=" + environ;
    }
    else {
        url = url + "?banner=" + banner + "&env=" + environ;
    }

    page = "/IFL/Grocery/" + page;

    var hiddenElement = document.createElement("input");
    hiddenElement.setAttribute("type", "hidden");
    hiddenElement.setAttribute("name", "ifrm_url");
    hiddenElement.setAttribute("id", "ifrm_url");
    hiddenElement.setAttribute("value", url);
    document.frmJavascript.appendChild(hiddenElement);
    document.frmJavascript.action = page;
    document.frmJavascript.submit();
}

function getval(inputname) {
    var retval = "";
    if (document.getElementById(inputname).value != '') {
        retval = document.getElementById(inputname).value;
    }
    return retval;
}

function wsnavigate() {
    var zip = getval("weekly_homepage_text_input");
    if (zip == 'Enter city and state, or zip code' || zip == '' || zip == '00000' || zip == '99999') {
        alert('Please enter valid city and state or zip code.');
        clearKeywordws('weekly_homepage_text_input');
        document.getElementById('weekly_homepage_text_input').focus();
    }
    else {
        var url = "http://hosted.where2getit.com/safeway/weekly720.html?form=locator_search&search=Go&addressline=" + zip;
        navigate("WS-Store-Results", url);
    }
}
function locatornavigate() {
    var dept = getval("store_locator_combobox");
    var zip = getval("store_locator_initial_txt");
    if (zip == '' || zip == '00000' || zip == '99999') {
        alert('Please enter valid city and state or zip code.');
        clearKeywordws('store_locator_initial_txt');
        document.getElementById('store_locator_initial_txt').focus();
    }
    else {
        var url = "http://hosted.where2getit.com/safeway/index720.html?form=locator_search&search=Go&" + dept + "=1&addressline=" + zip;
        navigate("Store-Locator-Results", url);
    }
}

function searchnavigate() {
    var searchterm = Trim(getval("header_txtSearch"));
    searchterm = searchterm.replace(/,/g, "");
    searchterm = searchterm.replace(/^\s*|\s*$/g, "")
    if (searchterm == '' || searchterm == 'Enter Keyword') {
        alert('To search, type something into the search box and click go');
        return false;
    }
    //var url = "http://promosearch.atomz.com/search/?sp_a=sp1003369a&sp_a=sp1003369a&sp_t=search_new&sp_k=" + banner + "&sp-sfvl-field=col&sp_q=" + searchterm;
    var url = "http://promosearch.atomz.com/search/?sp_a=sp10033374&sp_k=" + banner + "&sp-sfvl-field=col&sp_q=" + searchterm;
    navigate("Search-Results", url);
}

// Utility function to trim spaces from both ends of a string
function Trim(inString) {
    var retVal = "";
    var start = 0;
    while ((start < inString.length) && (inString.charAt(start) == ' ')) {
        ++start;
    }
    var end = inString.length;
    while ((end > 0) && (inString.charAt(end - 1) == ' ')) {
        --end;
    }
    retVal = inString.substring(start, end);
    return retVal;
}


function resizeIframeOld() {
    document.getElementById("_iframe").height = 768;
    document.getElementById("_iframe").width = 520;
    document.getElementById('_iframe').height = document.getElementById('_iframe').document.body.scrollHeight;
}


function hideContent() {

    document.getElementById("iFrameWaitState").style.visibility = "visible";
    document.getElementById("iFrameWaitState").style.display = "block";
    document.getElementById('_iframe').style.visibility = "hidden";
    document.getElementById("_iframe").style.display = "none";
}

function showContent() {
    document.getElementById('iFrameWaitState').style.visibility = "hidden";
    document.getElementById("iFrameWaitState").style.display = "none";
    document.getElementById("_iframe").style.visibility = "visible";
    document.getElementById("_iframe").style.display = "block";
    document.location.href = "#iframetop";

}

function resizeIframe(height) {
    var iframe = document.getElementById('_iframe');
    var ori_height = iframe.getAttribute('height');

    if (ori_height < height) {
        iframe.setAttribute('height', height);
    }
}

function getiframeurl(url) {
    if (typeof(banner) != "undefined") {
        if (url.indexOf("?") != -1) {
            url = url + "&banner=" + banner;
        }
        else {
            url = url + "?banner=" + banner;
        }
    }
    if (typeof(environ) != "undefined") {
        if (url.indexOf("?") != -1) {
            url = url + "&env=" + environ;
        }
        else {
            url = url + "?env=" + environ;
        }
    }
    return url;
}

// ***
// * This function reads the currunt URL and returns the value for the parameter specified in strParamName, if it is in the URL. 
// * It will return the defaultValue if there is no param with specified name in the URL.
// */
function getURLParam(strParamName, defaultValue) {
    var strParamName = strParamName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + strParamName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    //alert(results);
    if (results == null) {
        return defaultValue;
    }
    else {
        return unescape(results[1].replace(/\+/g, " "));
    }
}

// This function checks for zip code of the US and submits the form
// if the zipcode is valid.  The form must have an input named contentURL
// form and addressInfo are required, department is optional.
function submitLocatorForm(form, addressInfo, department) {
    var zip = addressInfo.value;
    if (!isPostalCodeValid(zip, 'US')) {
        alert('Please enter valid city and state or zip code.');
        addressInfo.value = '';
        addressInfo.focus();
        return false;
    } else {
        var contentURL = form.contentURL.value;
        // parameters required for w2gi to locate a store or weekly specials.
        contentURL = contentURL + zip + '&form=locator_search&banner=' + banner + '&env=' + environ + '&hostname=' + unescape(window.location.hostname) + '&';
        if (department != null && department != '') {
            contentURL = contentURL + department + '=1&';
        }
        form.contentURL.value = contentURL;
    }
    return true;
}

/*** This section is common_validator.js file ****/
// common_validation.js
// This class contain common functions which validate any field in the site.

//Checking whether string contains only numbers
//Even spaces are not allowed 
function isNumeric(strVal) {
    for (var i = 0; i < strVal.length; i++) {
        var key = strVal.charCodeAt(i);
        if (((key < '48') || (key > '57')) && (key != '46')) {
            return 1;
        }
    }

    return 0;
}

function isPostalCodeValid(theZip, theCountry) {
    var validate = '';
    if (theZip.indexOf(',') > -1) {
        return true; // check if user entered city, state.
    } else if (theZip == 'Enter city and state, or zip code' || theZip == '' || theZip == '00000' || theZip == '99999') {
        return false; // check for common invalid zips.
    } else if (theCountry == 'US') {
        validate = /(^\d{5}$)|(^\d{9}$)/;
    } else if (theCountry == 'CA') {
        validate = /^\s*[a-ceghj-npr-tvxy|A-CEGHJ-NPR-TVXY]\d[a-z|A-Z](\s)?\d[a-z|A-Z]\d\s*$/;
    } else {
        return true;
    }

    return validate.test(theZip);
}

function isEmailValid(theEmail) {
    var regExp = /^[a-zA-Z0-9]+[\w&@#\-\*\.\(\)]*[a-zA-Z0-9]@[a-zA-Z0-9]*[\w&@#\-\*\.\(\)]*[a-zA-Z0-9]\.[a-zA-Z]+$/;
    return regExp.test(theEmail);
}

function isAlphabetic(name) {
    var validate = /^[a-zA-Z]+$/;
    return validate.test(name);
}

function isPhoneValid(phone) {
    phone = setNumberFormat(phone);
    if (phone.charAt(0) == '1' && phone.length > 10) {
        phone = phone.substring(1);
        //window.alert(phone);
    }
    var regExp = /^\d{10}$/;
    return regExp.test(phone);
}

function isClubCardValid(clubCard) {
    clubCard = setNumberFormat(clubCard);
    var validate = /(^\d{10}$)|(^\d{11}$)|(^\d{14}$)|(^\d{16}$)|(^\d{19}$)/;
    return validate.test(clubCard);
}

function setNumberFormat(number) {
    var newNumber = '';
    for (i = 0; i < number.length; i++) {
        if (number.charAt(i) >= '0' && number.charAt(i) <= '9') {
            newNumber = newNumber + number.charAt(i);
        }
    }
    //alert(newPhone);
    return newNumber;
}


function TimeOutRedirect() {
    try {
        if (self.parent.frames.length != 0)
            self.parent.location = document.location;
    }
    catch (Exception) {
    }
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    if (expiredays == 0) {
        var minutes = exdate.getMinutes();
        minutes += 30; // Add 30 minutes to the time
        exdate.setMinutes(minutes); // Reset to new value
    }

    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? ";expires=Thu, 01-Jan-1970 00:00:01 GMT;" : ";expires=" + exdate.toGMTString() + ";") + ";path=/;";
}

/* new functions */

function isPasswordValid(password) {
    var validate = /^[^<]{8,12}$/;
    return validate.test(password);
}

function isNameValid(input) {
    var regExp = /^[a-zA-Z]+[a-zA-Z\s]*$/;
    return regExp.test(input);
}


function isAddressValid(input) {
    var regExp = /^[a-zA-Z0-9#]+[a-zA-Z0-9,_&@#\-\*\.\(\)\s]*$/;
    return regExp.test(input);
}

function isSecurityAnswerValid(input) {
    var regExp = /^[^<]{3}[^<]*$/;
    return regExp.test(input);
}

// Trim whitespace on both ends of an input field, replacing the original value
function trimField(field) {
    if (field && field.value && field.value.length > 0) {
        field.value = field.value.replace(/^\s*/, "").replace(/\s*$/, "");
        //window.alert(field.value);
    }
}

// Strip whitespace " ", hyphens "-", and parenthesis "()" from an input field, replacing the original value
function stripField(field) {
    if (field && field.value && field.value.length > 0) {
        var val = field.value;
        while (val.indexOf('-') > -1) {
            val = val.replace('-', '');
        }
        while (val.indexOf('(') > -1) {
            val = val.replace('(', '');
        }
        while (val.indexOf(')') > -1) {
            val = val.replace(')', '');
        }
        while (val.indexOf(' ') > -1) {
            val = val.replace(' ', '');
        }
        if (val.length > 10 && val.indexOf("1") == 0) {
            val = val.substring(1);
        }
        field.value = val;
    }
}


//crossSiteSpecialCharacterCheck

//Functionality to check for special unallowable characters in either the text field or name field

function crossSiteSpecialCharacterCheck(inputString) {

    var invalidChars = "{}<>[]:!@#$%^&;?+=_~.*\\/|'\"";

    var myBoolean = new Boolean(false);


    for (var i = 0; i < inputString.length; i++) {

        if (invalidChars.indexOf(inputString.charAt(i)) != -1) {

            myBoolean = true;

            break;

        }

    }

    return myBoolean;

}


function setLowerCaseField(field) {

    trimField(field);

    if (field && field.value) {

        field.value = field.value.toLowerCase();

    }

}


//There's a need to hard code some of this label to display the correct text on Primary Nav once click
//The struts tiles does not support special character like & so it is best to have this cross reference table in JS 
//to make sure that any changes / addition will not require WCS code updates
function getPrinavText(pn) {
    var sPN = new String(pn);
    var sCaption = new String(pn);

    var aFind = new Array("Community", "HealthyLiving", "Shop", "GroceryDelivery", "Recipesandmeals", "SummerGrilling");
    var aReplace = new Array("Blog", "Healthy Living", "Our Store", "Grocery Delivery", "Recipes & Meals", "Summer Grilling");

    sCaption = '';

    for (var i = 0; i < aFind.length; i++) {
        if (aFind[i].toString().toUpperCase() == sPN.toUpperCase()) {
            sCaption = aReplace[i];
            break;
        }
    }
    return sCaption;
}

//This is for checking of j4u enabled banner because a different header is requried for those
//This will dictate which banners to display the J4U icon on the top right of the heading
//this needs to be updated for each banner rollout
function isJ4UEnabled(url) {
    //alert(url);
    if (url.toString().toUpperCase() == "DOMINICKS" || url.toString().toUpperCase() == "SAFEWAY")
        return true;
    else
        return false;
}


function isJ4UEnabledHeader(url) {
    //alert(url);
    if (url.toString().toUpperCase() == "DOMINICKS")
        return true;
    else
        return false;
}


// Scenario 1 - Commerce SIGNED
// Scenario 2 - Commerce GUEST
// Scenario 3 - Non Commerce SIGNED
// Scenario 4 - Non Commerce GUEST

//This function returns the appropriate right-header-links class based on different scenarios
function updateRightHeaderLink(scenario, banner) {
    var option = scenario.valueOf();
    var newClass = new String();
    switch (option) {
        case 1: //SIGNED COMMERCE
            newClass = 'globalui_header_right_signed';
            break;
        case 2: //GUEST COMMERCE
            newClass = 'globalui_header_guest_right_ecom';
            break;
        case 3: //SIGNED NON COMMERCE
            if (isJ4UEnabledHeader(banner))
                newClass = 'globalui_header_justforu_right';
            else
                newClass = 'globalui_header_nc_right_signed';
            break;
        case 4: //GUEST NON COMMERCE
            newClass = 'globalui_header_guest_right';
            break;
        default:
            break;
    }
    return newClass;
}

//This function returns the appropriate right-header-links contents based on different scenarios
function generateRightHeaderByScenario(scenario, banner, shopurl) {

    var option = scenario.valueOf();
    var html = [
        '<div class="globalui_header_toplinks" >'
    ];
    switch (option) {
        case 1: //SIGNED COMMERCE
            html = html.concat([
                '<div class="globalui_header_grocery" ><a href="', shopurl, '" target="commerce">  Grocery Delivery</A></div>',
                '<div class="globalui_header_findstore" ><a href="javascript:goURL(\'Store-Locator-Results\');">Find a Store</A></div>',
                '<div class="globalui_header_specials"  id="weekly-specials-header" ><a href="javascript:goURL(\'Weekly-Specials\');">Weekly Specials</A></div>'
            ]);
            break;
        case 2: //GUEST COMMERCE
            html = html.concat([
                '<div class="globalui_header_grocery" ><a href="', shopurl, '" target="commerce">  Grocery Delivery</A></div>',
                '<div  class="globalui_header_findstore" ><a href="javascript:goURL(\'Store-Locator-Results\');">Find a Store</A></div>',
                '<div class="globalui_header_specials"  id="weekly-specials-header" ><a href="javascript:goURL(\'Weekly-Specials\');">Weekly Specials</A></div>',
                '<div class="globalui_header_savings" id="email-savings-header" ><a href="javascript:goURL(\'E-Mail-Savings\');">Email Savings</A>	</div>'
            ]);
            break;
        case 3: //SIGNED NON COMMERCE
            if (isJ4UEnabledHeader(banner)) {
                var mseOver = "this.src='/CMS/assets/media/images/styleimages/header_top_justforUoffers_107x17_Hover.gif'",
                    mseOut = "this.src='/CMS/assets/media/images/styleimages/header_top_justforUoffers_107x17_Default.gif'";
                html = html.concat([
                    '<div  class="globalui_header_findstore"><a href="javascript:goURL(\'Store-Locator-Results\');">Find a Store</A></div>',
                    '<div class="globalui_header_specials" id="weekly-specials-header" ><a href="javascript:goURL(\'Weekly-Specials\');">Weekly Specials</A></div>',
                    '<div class="globalui_header_justforu"><a href="javascript:goURL(\'Offers-Landing-IMG\');">',
                    '<img alt="just for you"  onmouseover=\"', mseOver, '\" onmouseout=\"', mseOut, '" src="/CMS/assets/media/images/styleimages/header_top_justforUoffers_107x17_Default.gif"></A></div>'
                ]);
            }
            else {
                html = html.concat([
                    '<div  class="globalui_header_findstore" ><a href="javascript:goURL(\'Store-Locator-Results\');">Find a Store</A></div>',
                    '<div class="globalui_header_specials"  id="weekly-specials-header" ><a href="javascript:goURL(\'Weekly-Specials\');">Weekly Specials</A></div>'
                ]);
            }
            break;
        case 4: //GUEST NON COMMERCE
            html = html.concat([
                '<div  class="globalui_header_findstore" ><a href="javascript:goURL(\'Store-Locator-Results\');">Find a Store</A></div>',
                '<div class="globalui_header_specials"  id="weekly-specials-header" ><a href="javascript:goURL(\'Weekly-Specials\');">Weekly Specials</A></div>',
                '<div class="globalui_header_savings" id="email-savings-header" ><a href="javascript:goURL(\'E-Mail-Savings\');">Email Savings</A>	</div>'
            ]);
            break;
        default:
            html = [];
            break;
    }
    if (html.length) {
        html.push('<div class="clear">&nbsp;</div></div>');
        html = html.join('');
    }
    else {
        html = '';
    }
    return html;
}


function goURL(url) {
    url = adjustURL(url);
    if (window != window.top) {
        top.location.href = url;
    } else {
        window.location.href = url;
    }
}

// determines if this page is a Standalone view
function isStandalone() {
    return (window.location.href.indexOf('StandaloneHeaderView') > -1
        || window.location.href.indexOf('StandaloneFooterView') > -1);
}


/*
 Override goURL: converts relative URL to absolute if this is a standalone
 - this is necessary for IE9 security
 */
function adjustURL(url) {
    if (isStandalone() && url.indexOf(':') < 0) {
        var adjustedUrl = window.location.protocol + '//' + window.location.hostname;
        if (url.charAt(0) != '/') adjustedUrl = adjustedUrl + '/';
        adjustedUrl = adjustedUrl + url;
        return adjustedUrl;
    } else {
        return url;
    }
}

function updatePrimaryNav() {
    var aEls = document.getElementById('globalui_header_middle').getElementsByTagName('a');
    for (var i = 0, aEl; aEl = aEls[i]; i++) {
        hrefText = aEl.href;
        if (hrefText.indexOf("javascript") <= -1) {
            aEl.href = "javascript:goURL('" + hrefText + "')";
        }
    }
}

function checkContintueUrl(url) {
    if (url == "AdMatchRedirect")
        url = 'Home';

    return url;
}

//the return url needs to be a relative path
function checkAbortUrl(page, url) {
    if (page == 'LOGIN') {
        if (url == "AdMatchRedirect") {
            url = 'Home';
        }
    } else if (page == 'REGISTRATION') {
        if (url == "AdMatchRedirect") {
            url = 'Home';
        }
    }
    /*else if(page=='UPDATECONTACTINFO'){
     if (url == "AdMatchRedirect"){
     url = 'Home';
     }
     }*/

    return url;
}
