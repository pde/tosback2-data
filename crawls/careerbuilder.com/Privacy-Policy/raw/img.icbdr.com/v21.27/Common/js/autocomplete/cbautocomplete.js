/// <reference path="~/common/js/jquery/jquery-1.4.1-vsdoc.js" />
/*!
* jQuery CBAutoComplete plugin
* Copyright 2010, CareerBuilder.com
*
*   Depends:
*       jquery-core 1.3.2+
*       jquery-ui   1.8.4+
*
*   Instructions:
*       1) Include this file on the page.  Add appropriate css class to your input box.
*       2) This javascript uses the new search framework for auto-complete.  You must specify which
*          auto-complete list you are using.  You specify this in the css class of the input box in this form:
*          "cbautocomplete-<listname>"
*/

(function ($) {

    // available lists to use auto-complete from solr
    var TALLY_OBJECT = 'CBAC_';
    var bOpenedOnce = false;

    ////////////////////// ANDROID BROWSER SPECIFIC ////////////////////////
    // the android browser specific block of code is here to correct a bug in android browser 
    // http://code.google.com/p/android/issues/detail?id=6721
    var isAndroidBrowser = ScriptVariables.Contains('UseAndroidBleeding') && ScriptVariables.Get('UseAndroidBleeding');
    var enable = true;
    function enableMe() {
        enable = true;
        //console.log("enable me");
        $('.cbautocomplete-location').removeAttr('disabled');
        $('.cbautocomplete-keywords').removeAttr('disabled');
        $('.form-inp').removeAttr('disabled');
    }

    function disableMe(me) {
        enable = false;
        //console.log("disable me");
        var id = me.id
        if (id.indexOf('txtKeywords') > -1) {
            $('.cbautocomplete-location').attr('disabled', 'disabled');
        }

        $('.form-inp').attr('disabled', 'disabled');
        $('.ad a').attr('disabled', 'disabled');
    }

    function setFocus(me) {
        var id = me.id
        if (id.indexOf('txtKeywords') > -1) {
            //console.log('set keywords focus');
            $(me).blur();
            $(me).focus();
        } else if (id.indexOf('txtLocation') > -1) {
            //console.log('set location focus');
            $(me).blur();
            $(me).focus();
        }
    }
    //////////////////////////////////////////////////////////////////////////


    function GetAutoCompleteAjaxUrl() {
        var iDev = location.toString().toLowerCase().indexOf('cbsys/cbweb');
        var url = (iDev > -1) ? (location.toString().substring(0, (iDev + 11)) + '/ajax/cbautocomplete.aspx') :
        (location.protocol + '//' + location.hostname + '/ajax/cbautocomplete.aspx');
        return url;
    }

    function GetAutoCompleteOptions(inputElement) {
        var attrArray = /cbautocomplete-([\S]+)/.exec($(inputElement).attr('class'));
        var attrs = (attrArray.length > 1) ? attrArray[1].split('-') : '';
        var options = {};
        options.ListName = (attrs.length > 0) ? attrs[0] : '';
        options.HostSiteOverride = (attrs.length > 1) ? attrs[1] : '';
        options.LanguageOverride = '';

        if ($('#_ctl0_QuickSearchBox_ctrlSearch_MXJobSrchCriteria_Country').length > 0 && options.ListName == 'location') {
            options.HostSiteOverride = $('#_ctl0_QuickSearchBox_ctrlSearch_MXJobSrchCriteria_Country').val();
        }
        if ($('#S_MXJobSrchCriteria_Country').length > 0 && options.ListName == 'location') {
            options.HostSiteOverride = $('#S_MXJobSrchCriteria_Country').val();
        }
        if ($('input[id*="_hihLanguage"]').length > 0 && options.ListName == 'keywords') {
            options.LanguageOverride = $('input[id*="_hihLanguage"]').val();
        }

        return options;
    }

    function AddInputDataStorage(inputElement) {
        $(inputElement).data('savedFontFamily', 'Arial, Helvetica, sans-serif');
        $(inputElement).data('savedFontSize', $(inputElement).css('font-size'));
        $(inputElement).data('savedPaddingTop', $(inputElement).css('padding-top'));
        $(inputElement).data('savedPaddingRight', $(inputElement).css('padding-right'));
        $(inputElement).data('savedPaddingBottom', $(inputElement).css('padding-bottom'));
        $(inputElement).data('savedPaddingLeft', $(inputElement).css('padding-left'));
    }

    function GetRequestCacheKey(request, options) {
        return (request.term + options.ListName + options.HostSiteOverride + options.LanguageOverride);
    }

    function AutoCompleteSourceCallback(request, response) {
        var options = $(this).data('options');

        // cache the "work"
        var cacheKey = GetRequestCacheKey(request, options);
        var myCache = $(this).data('cache');
        if (myCache[cacheKey]) {
            SendSuggestionsToResponse(this, request, response, myCache[cacheKey]);
            return;
        }

        // before sending ajax request, put request/response onto object to get pulled later
        var context = {};
        context.inputElement = this;
        context.request = request;
        context.response = response;

        $.ajax({
            url: $(document).data('AutoCompleteAjaxUrl'),
            data: {
                limit: 10,
                q: request.term,
                list: options.ListName,
                hostsite: options.HostSiteOverride,
                language: options.LanguageOverride
            },
            dataType: 'html',
            success: $.proxy(AutoCompleteAjaxSuccess, context),
            error: $.proxy(AutoCompleteAjaxError, context)
        });
    }

    function AutoCompleteAjaxSuccess(data, textStatus, jqXHR) {
        var request = this.request;
        var response = this.response;
        var options = $(this.inputElement).data('options');

        if (data != null && typeof (data) == "string" && data != "") {
            var arResults = data.split('\n');

            var obj = $.map(arResults, function (item) {
                if ($.trim(item).charCodeAt(0) > 0) {
                    var formattedItem = "";
                    item = $.trim(item);

                    formattedItem = "<span class='suggestitem'>" + item + "</span>";

                    var sNewDivStrongItem = formattedItem.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + request.term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");

                    var nameRe = new RegExp("<span[^>]*?class[ ]*=[ ]*['\"]name['\"][^>]*?>([^<]+?)</span>", "gi");
                    var nameArray = nameRe.exec(item);
                    var inputValue = (nameArray != null && nameArray.length > 1) ? $.trim(nameArray[1]) : $.trim(item);

                    return {
                        label: sNewDivStrongItem,
                        value: inputValue
                    }
                }
            });

            var myCache = $(this.inputElement).data('cache');
            myCache[GetRequestCacheKey(request, options)] = obj;
            $(this.inputElement).data('cache', myCache);

            SendSuggestionsToResponse(this.inputElement, request, response, obj);
        } else {
            //no suggestions to show?
            $(this.inputElement).autocomplete('close');
        }
    }

    function SendSuggestionsToResponse(input, request, response, suggestions) {
        if ($(input).val() == request.term) {
            response(suggestions);
        } else {
            var myCache = $(input).data('cache');
            var options = $(input).data('options');
            request.term = $(input).val();
            if (myCache[GetRequestCacheKey(request, options)]) {
                response(myCache[GetRequestCacheKey(request, options)]);
            } else {
                //no suggestions to show?
                $(input).autocomplete('close');
            }
        }
    }

    function AutoCompleteAjaxError(jqXHR, textStatus, errorThrown) {
        //no suggestions to show?
        $(this.inputElement).autocomplete('close');
    }

    function OnAutoCompleteSelect(event, ui) {
        var options = $(this).data('options');
        var sTerm = $(event.target).val();
        var iTerm = sTerm.length;

        $(event.target).val(this.value);

        var menu = $(this).data('autocomplete').menu;
        var iPosition = $(menu.element).children().index($(menu.active));
        if (iPosition >= 0 && iPosition <= 10) {
            $.cb.Tally(TALLY_OBJECT + options.ListName, 'SelectPosition', iPosition.toString());
            $('#ACSelectPosition').val(iPosition);
        }

        if (iTerm >= 0 && iTerm <= 10) {
            $.cb.Tally(TALLY_OBJECT + options.ListName, 'TermLength', iTerm.toString());
        }

        ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
        if (isAndroidBrowser) {
            enableMe();
        }
        /////////////////////////////////////////////////////////////////////
    }

    function OnAutoCompleteOpen(event, ui) {
        var options = $(this).data('options');
        $('ul.ui-autocomplete.ui-corner-all').removeClass('ui-corner-all');
        $('ul.ui-autocomplete *.ui-corner-all').removeClass('ui-corner-all');

        //tally if user saw menu (only tally once)
        if (!bOpenedOnce) {
            $.cb.Tally(TALLY_OBJECT + options.ListName, 'Menu', 'MenuShown');
            bOpenedOnce = true;
        }
        //hack: set a high z-index for the menu so it goes above certain spots
        $($(this).data('autocomplete').menu.element).css('z-index', 100001);

    }

    function OnAutoCompleteClose(event, ui) {
        //hack: blank out the term so that the box shows up each time a character is pressed
        $(this).data('autocomplete').term = '';

        ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
        if (isAndroidBrowser) {
            enableMe();
            setFocus(this);
        }
        /////////////////////////////////////////////////////////////////////
    }

    function AutoCompleteRenderItemOverride(ul, item) {
        // to allow us to put html within the anchor and also to override anchor styles (all from js)
        var sFontFamily = $(this).data('savedFontFamily');
        var sFontSize = $(this).data('savedFontSize');
        var sPaddingTop = $(this).data('savedPaddingTop');
        var sPaddingRight = $(this).data('savedPaddingRight');
        var sPaddingBottom = $(this).data('savedPaddingBottom');
        var sPaddingLeft = $(this).data('savedPaddingLeft');

        return $("<li></li>")
        .data("item.autocomplete", item)
        .append($('<a href="javascript:void(0);"></a>')
        .css('font-family', sFontFamily).css('font-size', sFontSize).css('line-height', sFontSize)
        .css('padding-top', sPaddingTop).css('padding-right', sPaddingRight).css('padding-bottom', sPaddingBottom)
        .css('padding-left', sPaddingLeft)
        .html(item.label))
        .appendTo(ul);
    }

    function OnMenuOptionsBlur(event, ui) {
        // don't set the value of the text field if it's already correct
        // this prevents moving the cursor unnecessarily
        if (this.menu.element.is(":visible") && (this.element.val() !== this.term)
        && !(this.element.val().length > this.term.length)) {
            this.element.val(this.term);
        }

        ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
        if (isAndroidBrowser) {
            enableMe();
        }
        /////////////////////////////////////////////////////////////////////
    }

    function OnMenuOptionsFocus(event, ui) {
        // to allow us to override the focus actually setting the value of the input element

    }

    function AssignAutoCompleteToInput(index, Element) {
        var options = GetAutoCompleteOptions(Element);
        $(Element).data('options', options);
        AddInputDataStorage(Element);

        if (options.ListName != '') {
            // to store the results for this input
            $(Element).data('cache', {});

            $(Element).autocomplete({
                source: $.proxy(AutoCompleteSourceCallback, Element),
                minLength: 2,
                delay: 100,
                select: $.proxy(OnAutoCompleteSelect, Element),
                open: $.proxy(OnAutoCompleteOpen, Element),
                close: $.proxy(OnAutoCompleteClose, Element)
            });

            $(Element).data("autocomplete")._renderItem = $.proxy(AutoCompleteRenderItemOverride, Element);
            $(Element).data("autocomplete").menu.options.blur = $.proxy(OnMenuOptionsBlur, $(Element).data("autocomplete"));
            $(Element).data("autocomplete").menu.options.focus = OnMenuOptionsFocus;

        } // End of creating auto-complete for input box
    }

    //What we should do at document ready time
    $(document).ready(function () {
        $(document).data('AutoCompleteAjaxUrl', GetAutoCompleteAjaxUrl());
        $(document).data('AssignAutoCompleteToInputFunction', AssignAutoCompleteToInput);

        //for each input textbox with css class of cbautocomplete
        $('input[type="text"][class*="cbautocomplete-"]').each(AssignAutoCompleteToInput);

        ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
        if (isAndroidBrowser) {
            $('.ad a').click(function (e) {
                if (!enable) {
                    e.preventDefault();
                }
            });
        }
        /////////////////////////////////////////////////////////////////////

    }); // End of (document).ready function

})(jQuery); 
