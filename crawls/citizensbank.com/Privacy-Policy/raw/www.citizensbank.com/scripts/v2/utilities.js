var Library = Library || {};
Library.Utils = Library.Utils || {};

Library.Utils.Slider = function(p, itemWidth, suffix) {

    if (suffix == null) {
        suffix = "";
    }
        
    var curPage = 1;
    var perPage = parseInt(p);
    var itemCount = $(".sliderItem" + suffix).length;
    var numPages = Math.ceil(itemCount / perPage);

    var totalWidth = itemCount * itemWidth;
    var pageWidth = perPage * itemWidth;    

    $("#sliderWrapper" + suffix).width(pageWidth);
    $("#slider" + suffix).width(totalWidth);

    if (numPages == 1) {
        $("#sliderRight" + suffix).removeClass("active");
        $("#sliderRight" + suffix).fadeOut("slow");
        $("#sliderRight" + suffix).removeClass("active");
        $("#sliderRight" + suffix).fadeOut("slow");
    }

    this.MoveToPage = function(page) {

        if (curPage < page) {
            //move to the right
            var delta = pageWidth * (page - curPage);
            $("#slider" + suffix).animate({ "marginLeft": "-=" + delta });
            curPage = page;
        }
        else if (curPage > page) {
            //move to the left
            var delta = pageWidth * (curPage - page);
            $("#slider" + suffix).animate({ "marginLeft": "+=" + delta });
            curPage = page;
        }

        if (curPage == numPages) {
            $("#sliderRight" + suffix).fadeOut("slow");
            $("#sliderRight" + suffix).removeClass("active");
        }
        else if ($("#sliderRight" + suffix).hasClass("active") == false) {
            $("#sliderRight" + suffix).addClass("active");
            $("#sliderRight" + suffix).fadeIn("slow");
        }

        if (curPage == 1) {
            $("#sliderLeft" + suffix).fadeOut("slow");
            $("#sliderLeft" + suffix).removeClass("active");
        }
        else if ($("#sliderLeft" + suffix).hasClass("active") == false) {
            $("#sliderLeft" + suffix).addClass("active");
            $("#sliderLeft" + suffix).fadeIn("slow");
        }

    }

    this.Bind = function() {
        $("#sliderLeft" + suffix).click(function() {
            if (curPage != 1) {
                $("#slider" + suffix).animate({ "marginLeft": "+=" + pageWidth });
                curPage--;
            }

            if (curPage == 1 && $(this).hasClass("active")) {
                $(this).fadeOut("slow");
                $(this).removeClass("active");
            }
            else if (!$(this).hasClass("active") && curPage != 1) {
                $(this).addClass("active");
                $(this).fadeIn("slow");
            }

            if (!$("#sliderRight" + suffix).hasClass("active") && curPage != numPages) {
                $("#sliderRight" + suffix).addClass("active");
                $("#sliderRight" + suffix).fadeIn("slow");
            }

        });

        $("#sliderRight" + suffix).click(function() {
            if (curPage != numPages) {
                $("#slider" + suffix).animate({ "marginLeft": "-=" + pageWidth });
                curPage++;
            }

            //if (curPage == numPages && $(this).hasClass("active")) {
            if (curPage == numPages) {
                $(this).fadeOut("slow");
                $(this).removeClass("active");
            }
            else if (!$(this).hasClass("active") && curPage != numPages) {
                $(this).addClass("active");
                $(this).fadeIn("slow");
            }

            if (!$("#sliderLeft" + suffix).hasClass("active") && curPage != 1) {
                $("#sliderLeft" + suffix).addClass("active");
                $("#sliderLeft" + suffix).fadeIn("slow");
            }
        });
    }
}


Library.Utils.Tab = function(id, WTuri) {
    if (!WTuri) WTuri = '';
    this.id = id;
    this.WTUri = WTuri;

    this.Click = function(obj, idx) {
        $("#" + this.id + " .tab").removeClass('active');
        $("#" + idx).addClass('active');

        $("#" + this.id + " .tabContent").hide();
        $("#" + idx + "Content").show();

        try {
            var sliderPosition = idx.substr(idx.length - 1, 1);
            if (window.SetSlider) SetSlider(sliderPosition);
        }
        catch (ex) {
            //alert(ex);
        }

        // WT Tracking
        if (this.WTUri != '') dcsMultiTrack('DCS.dcsuri', this.WTUri);
    }
}

Library.Utils.EmailBoxSubmit = function(field, formAction, errorId, edfi) {

    var f = document.forms[0];

    if (validateEmail(f[field].value, true)) {

        if (edfi != null && edfi == true) {
            formAction = formAction.toString().replace(/\{0\}/g, f[field].value);
            if (BRAND == "Charter One") {
                formAction = formAction.toString().replace(/\{1\}/g, 'CO');
            }
            else {
                formAction = formAction.toString().replace(/\{1\}/g, '');
            }
        }

        $(errorId).hide();
        var action = f.action;
        f.target = "_blank";
        f.action = formAction;
        f.submit();
        f.target = "";
        f.action = action;
    }
    else {
        $(errorId).show();
    }

    return false;
}


Library.Utils.LaunchLocator = function(field, fieldEmptyVal, errorId) {
    var f = document.forms[0];
    if (f[field].value != '' && f[field].value != fieldEmptyVal) {
        window.location.href = BASE_URL + 'branchlocator/?search=' + escape(f[field].value);
        $(errorId).hide();
    }
    else {
        $(errorId).show();
    }

    return false;
}


Library.Utils.MoneyHelpRedirect = function(field) {
    var ddMoneyHelp = document.getElementById(field);
    if (ddMoneyHelp != null) {
        var redirectTo = ddMoneyHelp.value.toString();
        window.location.href = redirectTo;
    }
    return false;
}

Library.Utils.GetZipFromCookie = function() {
    var cookie = getCookie('Region');
    return getCookieSubKey(cookie, 'Zip');
}

Library.Utils.GetRegionIDFromCookie = function() {
    var cookie = getCookie('Region');
    return getCookieSubKey(cookie, 'RegionID');
}

Library.Utils.GetHttpRequest = function() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest()
    }
    else if (window.ActiveXObject) {
        return new ActiveXObject('Microsoft.XMLHTTP')
    }
    return null;
}

Library.Utils.SubmitZip = function() {
    var tbZip = $("#zip").get(0);

    if (tbZip && isUSZip(tbZip.value, true)) {
        $("#hlChange").attr("disabled", true);
        CommonHeader.RegionLookup(tbZip.value, Library.Utils.GetRegionFromZip_callback);
    }
    else {
        $("#hlChange").attr("disabled", false);
        $("#lbZipError").text(RGN_ERROR_INVALID);
        $("#lbZipError").show();
    }

    return false;
}

Library.Utils.GetRegionFromZip_callback = function(res) {
    $("#hlChange").attr("disabled", false);

    if (res.value != null && res.value.length > 0 && $("#zip").length > 0) {
        window.location.href = BASE_URL + 'tools/setregion.aspx?rem=true&rgn=' + res.value + '&zip=' + $("#zip").get(0).value + '&url=' + FULL_URL;
    }
    else {
        $("#lbZipError").text(RGN_ERROR_OFP);
        $("#lbZipError").show();
    }
}

function ShowHelpModal(id, hideFooter)
{
	DisplayModalBox($("#divHelp" + id).html(), 550, 300, "", false, hideFooter);
}