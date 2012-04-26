//<![CDATA[
/* Replacement calls. Please see documentation for more information. */

//common functions

function clearIfValue(varObj, value) {
    if (varObj.value == value) {
        varObj.value = '';
    }
}

function replaceEmpty(varObj, value) {
    if (trimString(varObj.value) == '') {
        varObj.value = value;
    }
}

function trimString(str) {
    return str.replace( /^\s+|\s+$/g , '');
}

function isValidZip(zip) {
    return zip.match(/(^\d{5}(-\d{4})?$)|(^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY]{1}\d{1}[a-zA-Z]{1} *\d{1}[a-zA-Z]{1}\d{1}$)/) != null;
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    //	alert('getCookie name='+name+'; value='+setStr);
    return (setStr);
}

function set_cookie(name, value, expires) {
    if (!expires) {
        expires = new Date();
    }
    //    alert('set_cookie '+name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/")
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}

function setCookie(c_name, value, expireMinutes) {
    var now = new Date();
    var minutes = now.getMinutes();
    minutes += expireMinutes;
    now.setMinutes(minutes);
    document.cookie = c_name + '=' + escape(value) + ';path=/;expires=' + now.toGMTString();
}


//search store function

function redirectOnGo(btn) {
    var zip = btn.parentNode.children[0].value;
    zip = trimString(zip);
    if (zip == null || zip == '' || zip == 'Zip/Postal Code') {
        //document.location.href = '/storelocation.aspx';
        document.location.href = '/store-locator/';
        return;
    }
    if (isValidZip(zip)) {
        //document.location.href = '/storelocation.aspx?zipPostalCode=' + zip.replace(' ', '');
        document.location.href = '/store-locator/';
    }
    else
        document.location.href = 'http://halloween-costumes.spirithalloween.com/search#view=grid&w=' + zip;
}

//search functions

function ValidateEmptyTb(tb_id) {
    var tb = document.getElementById(tb_id);
    if (tb.value == null || tb.value == '') {
        alert('Search text box is empty!');
        return false;
    }
    return true;
}

function redirect() {

    var tb = document.getElementById('<%=_tbx_search.ClientID %>');
    if (ValidateEmptyTb('<%=_tbx_search.ClientID %>')) {
        window.location.href = 'http://halloween-costumes.spirithalloween.com/search#view=grid&w=' + tb.value;
    }
    return (false);
}


////////////////////////OPTIONS/////////////////////////////////

function fillOptions(sType, sColor, sSize, indx) {
    if ($('#' + sType) != undefined && $('#' + sType).length > 0) {
        if ($('#' + sType).find('option').length == 2) {
            $('#' + sType + ' :first').remove();
            $('#' + sType).removeAttr('disabled');
            $('#' + sType + ' :selected').removeAttr('selected');
            $('#' + sType + ' :first').attr('selected', 'selected');
        }

        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            if ($('#' + sType).find('option').length > 1) {
                $('#' + sColor).attr('disabled', 'disabled');
            }
            if ($('#' + sColor).find('option').length == 2) {
                $('#' + sColor + ' :first').remove();
                $('#' + sColor).removeAttr('disabled');
                $('#' + sColor + ' :selected').removeAttr('selected');
                $('#' + sColor + ' :first').attr('selected', 'selected');
            }
        }
        if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            if ($('#' + sColor) != undefined && $('#' + sColor).length > 0 && $('#' + sColor).find('option').length > 1) {
                $('#' + sSize).attr('disabled', 'disabled');
            }
            if ($('#' + sSize).find('option').length == 2) {
                $('#' + sSize + ' :first').remove();
                $('#' + sSize).removeAttr('disabled');
                $('#' + sSize + ' :selected').removeAttr('selected');
                $('#' + sSize + ' :first').attr('selected', 'selected');
            }
        }

    } else if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
        if ($('#' + sColor).find('option').length == 2) {
            $('#' + sColor + ' :first').remove();
            $('#' + sColor).removeAttr('disabled');
            $('#' + sColor + ' :selected').removeAttr('selected');
            $('#' + sColor + ' :first').attr('selected', 'selected');
        }

        if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
            if ($('#' + sColor).find('option').length > 1) {
                $('#' + sSize).attr('disabled', 'disabled');
            }
            if ($('#' + sSize).find('option').length == 2) {
                $('#' + sSize + ' :first').remove();
                $('#' + sSize).removeAttr('disabled');
                $('#' + sSize + ' :selected').removeAttr('selected');
                $('#' + sSize + ' :first').attr('selected', 'selected');
            }
        }
    }
}

function typeChange(s, sType, sColor, sSize, indx, isCheck) {
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0) {
        $('#' + sSize).attr('disabled', 'disabled');
    }

    if ($(s).val() == '') {
        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            $('#' + sColor).attr('disabled', 'disabled');
        }
    } else {

        if ($('#' + sColor) != undefined && $('#' + sColor).length > 0) {
            var selected = $(s).val();
            var skuId = '';
            $('#' + sColor).empty();
            for (var i = 0; i < options[indx].length; i++) {
                if (selected == options[indx][i].OptionId) {
                    skuId = options[i].SkuId;
                    for (var y = 0; y < options[indx].length; y++) {
                        if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != selected) {
                            $('#' + sColor).append('<option value="' + options[indx][y].OptionId + '">' + options[y][indx].OptionAliasName + '</option');
                        }
                    }
                }
            }
            if ($('#' + sColor).find('option').length > 0) {
                if ($('#' + sColor + ' option').length == 2) {
                    $('#' + sColor).prepend('<option value="">Select color</option');
                }
                $('#' + sColor).removeAttr('disabled');
                $('#' + sColor + ' :selected').removeAttr('selected');
                $('#' + sColor + ' :first').attr('selected', 'selected');
            }
        }
    }
    checkStockStatus(s, isCheck);
}

function colorChange(s, sType, sColor, sSize, indx, isCheck) {
    if ($('#' + sSize) != undefined && $('#' + sSize).length > 0 && $(s).val() == '') {
        $('#' + sSize).attr('disabled', 'disabled');
    } else {
        var selected = $(s).val();
        var skuId = '';
        $('#' + sSize).empty();
        for (var i = 0; i < options[indx].length; i++) {
            if (selected == options[indx][i].OptionId) {
                skuId = options[indx][i].SkuId;
                for (var y = 0; y < options[indx].length; y++) {
                    if (options[indx][y].SkuId == skuId && options[indx][y].OptionId != selected) {
                        $('#' + sSize).append('<option value="' + options[indx][y].OptionId + '">' + options[indx][y].OptionAliasName + '</option');
                    }
                }
            }
        }
        if ($('#' + sSize).find('option').length > 0) {
            if ($('#' + sSize + ' option').length == 2) {
                $('#' + sSize).prepend('<option value="">Select size</option');
            }
            $('#' + sSize).removeAttr('disabled');
            $('#' + sSize + ' :selected').removeAttr('selected');
            $('#' + sSize + ' :first').attr('selected', 'selected');
        }
    }
    checkStockStatus(s, isCheck);
}

function sizeChange(s, isCheck) {
    checkStockStatus(s, isCheck);
}

function checkStockStatus(s, isCheck) {
    //alert(isCheck);
    if (isCheck == 'false') return;
    var check = true;
    if ($(s).parent().find('select').length == 0) check = true;
    else {
        for (var i = 0; i < $(s).parent().find('select').length; i++) {
            if ($($(s).parent().find('select')[i]).val() == '') {
                check = false;
                break;
            }
        }
    }
    if (check == true) {
        var productId = $('#mainProductId').val();
        var url = '/Controls/GetStockStatus?productId=' + productId;
        var options = '';

        $('.addTOcartZone').find('div.SizeZone > select').each(function () {
            options = options + $(this).val() + ',';
        });

        if (options.length > 2) {
            url += '&options=' + options;
        }
        if (url[url.length - 1] == ',') url = url.substr(0, url.length - 1);
        $('#stockStatus').load(url);
    }
}

////////////////////////END OPTIONS/////////////////////////////


////////////////////////email sign up//////////////////////////
function showFloatingEmailSignUp() {
    if ($.browser.msie && parseInt(jQuery.browser.version) == 6) {
        $("#floatingEmailSignUp").css("position", "absolute");
    }

    $(window).resize(function () {
        $("#floatingEmailSignUp").css("left",
                $('.header:first').position().left + $('.header:first').width() - $("#floatingCart").width() -
                     $("#floatingEmailSignUp").width() - 40);
    });

    $("#floatingEmailSignUp").css("left",
            $('.header:first').position().left + $('.header:first').width() - $("#floatingCart").width() -
                $("#floatingEmailSignUp").width() - 40);

    $("#ajaxloaderEmailSignUp").hide();
    $("#floatingEmailSignUp").slideDown(1000);
}
function hideFloatingEmailSignUp() {
    $("#floatingEmailSignUp").slideUp(1000);
}

function EmailSignup(email) {
    var url = '/Controls/EmailSignup/?email=' + $('#' + email).val();
    $.ajax({
        url: url,
        success: function (data) {
            //alert(data);
            if (data == 'OK') {
                alert("Thank you for signing up to receive Spencer's emails. \r\nYou will now be eligible to receive special email offers and discounts.");
                hideFloatingEmailSignUp();
            }
            else {
                alert('Please enter a valid email address');
            }
        }
    });
}

////////////////////////end email sign up//////////////////////

///////////////////////Recently Viewed/////////////////////////
function GetRV() {
    $('#recentlyViewed').load('/Controls/RecentlyViewed');
}
///////////////////////////////////////////////////////////////