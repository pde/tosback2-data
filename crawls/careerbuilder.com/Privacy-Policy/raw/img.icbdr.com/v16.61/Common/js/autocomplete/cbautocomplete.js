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

    if (ScriptVariables.Contains('UseNewCBAutoComplete') && ScriptVariables.Get('UseNewCBAutoComplete')) {

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

            ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
            if (isAndroidBrowser) {
                disableMe(this);
            }
            /////////////////////////////////////////////////////////////////////
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
            .append($("<a></a>")
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

            ////////////////////// ANDROID BROWSER SPECIFIC //////////////////////
            if (isAndroidBrowser) {
                disableMe(this);
            }
            /////////////////////////////////////////////////////////////////////
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



    } else {

        // available lists to use auto-complete from solr
        var TALLY_OBJECT = 'CBAC_';
        var bOpenedOnce = false;

        // hardcode the ajax url because we want this control to be javascript-based only
        var getAutoCompleteUrl = function () {
            var sLocation = document.location.toString().toLowerCase();

            var sMinusHttp = "";
            var protocol = "http://";
            if (sLocation.slice(0, 5) == 'https') {
                sMinusHttp = sLocation.substr(8);
                protocol = "https://";
            } else {
                sMinusHttp = sLocation.substr(7);
            }


            var sDomain = sMinusHttp.substr(0, sMinusHttp.indexOf("/"));

            //set tally object
            var re = /\./gi;
            TALLY_OBJECT += sDomain.replace(re, '_') + '_';

            if (sMinusHttp.indexOf('cbsys/cbweb') > -1) {
                //dev mode
                sDomain = sMinusHttp.substring(0, sMinusHttp.indexOf('cbsys/cbweb') + 11);
            }

            //reconstruct and return
            return (protocol + sDomain + "/ajax/cbautocomplete.aspx");
        };

        //What we should do at document ready time
        $(document).ready(function () {
            var sAjaxUrl = getAutoCompleteUrl();

            //for each input textbox with css class of cbautocomplete
            $('input[type="text"][class*="cbautocomplete-"]').each(function () {
                //this refers to element
                var sList = '';
                var sHostSiteOverride = '';
                var sLanguageOverride = '';

                //parse the attributes
                var sClass = $.trim($(this).attr('class'));
                sClass = sClass.toLowerCase();
                var splitAttr = sClass.split('-');
                try {
                    sList = splitAttr[1];
                    if (splitAttr.length > 2) {
                        sHostSiteOverride = splitAttr[2];
                    }
                } catch (e) {
                    $.cb.Exception(TALLY_OBJECT + sList, 'SplitAttrs', 'Exception thrown splitting attributes', e);
                }

                if (sList == '') {
                    $.cb.Tally(TALLY_OBJECT + 'Unknown', 'Each', 'InvalidClassOnElement');
                } else {
                    // Create the auto-complete for this input box

                    var sFontFamily = 'Arial, Helvetica, sans-serif';
                    var sFontSize = $(this).css('font-size');
                    var sPaddingTop = $(this).css('padding-top');
                    var sPaddingRight = $(this).css('padding-right');
                    var sPaddingBottom = $(this).css('padding-bottom');
                    var sPaddingLeft = $(this).css('padding-left');
                    var elmMyself = this;

                    // to store the results for this input
                    $(this).data('cache', {});

                    $(this).autocomplete({
                        source: function (request, response) {

                            try {
                                if ($('#_ctl0_QuickSearchBox_ctrlSearch_MXJobSrchCriteria_Country').length > 0 && sList == 'location') {
                                    sHostSiteOverride = $('#_ctl0_QuickSearchBox_ctrlSearch_MXJobSrchCriteria_Country').val();
                                }
                            } catch (e) {
                                //Simply do nothing
                            }

                            try {
                                if ($('#S_MXJobSrchCriteria_Country').length > 0 && sList == 'location') {
                                    sHostSiteOverride = $('#S_MXJobSrchCriteria_Country').val();
                                }
                            } catch (e) {
                                //Simply do nothing
                            }

                            try {
                                if ($('input[id*="_hihLanguage"]').length > 0 && sList == 'keywords') {
                                    sLanguageOverride = $('input[id*="_hihLanguage"]').val();
                                }
                            } catch (e) {
                                //Simply do nothing
                            }

                            // cache the "work"
                            var myCache = $(elmMyself).data('cache');
                            if (myCache[request.term + sHostSiteOverride]) {
                                response(myCache[request.term + sHostSiteOverride]);
                                return;
                            }

                            $.ajax({
                                url: sAjaxUrl,
                                data: {
                                    limit: 10,
                                    q: request.term,
                                    list: sList,
                                    hostsite: sHostSiteOverride,
                                    language: sLanguageOverride
                                },
                                dataType: 'html',
                                success: function (data) {
                                    try {
                                        if (data != null && typeof (data) == "string" && data != "") {
                                            var arResults = data.split('\n');

                                            var obj = $.map(arResults, function (item) {
                                                if ($.trim(item).charCodeAt(0) > 0) {
                                                    var formattedItem = "";
                                                    item = $.trim(item);

                                                    formattedItem = "<span class='suggestitem'>" + item + "</span>";

                                                    var sNewDivStrongItem = formattedItem.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + request.term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");

                                                    return {
                                                        label: sNewDivStrongItem,
                                                        value: item
                                                    }
                                                }
                                            });

                                            var myCache = $(elmMyself).data('cache');
                                            myCache[request.term + sHostSiteOverride] = obj;
                                            $(elmMyself).data('cache', myCache);

                                            response(obj);
                                        }
                                    } catch (e) {
                                        $.cb.Exception(TALLY_OBJECT + sList, 'success', 'Exception thrown showing menu', e);
                                    }
                                }
                            });

                        },
                        minLength: 2,
                        delay: 100,
                        select: function (event, ui) {
                            try {
                                var sTerm = $(event.target).val();
                                var iTerm = sTerm.length;

                                $(event.target).val(this.value);

                                var menu = $(elmMyself).data('autocomplete').menu;
                                var iPosition = $(menu.element).children().index($(menu.active));
                                if (iPosition >= 0 && iPosition <= 10) {
                                    $.cb.Tally(TALLY_OBJECT + sList, 'SelectPosition', iPosition.toString());
                                    if (document.getElementById("ACSelectPosition") != null) {
                                        document.getElementById("ACSelectPosition").value = iPosition.toString();
                                    }
                                }

                                if (iTerm >= 0 && iTerm <= 10) {
                                    $.cb.Tally(TALLY_OBJECT + sList, 'TermLength', iTerm.toString());
                                }
                            } catch (e) {
                                $.cb.Exception(TALLY_OBJECT + sList, 'select', 'Exception thrown selecting item from menu', e);
                            }
                        },
                        open: function (event, ui) {
                            $('ul.ui-autocomplete.ui-corner-all').removeClass('ui-corner-all');
                            $('ul.ui-autocomplete *.ui-corner-all').removeClass('ui-corner-all');

                            //tally if user saw menu (only tally once)
                            if (!bOpenedOnce) {
                                $.cb.Tally(TALLY_OBJECT + sList, 'Menu', 'MenuShown');
                                bOpenedOnce = true;
                            }
                            //hack: set a high z-index for the menu so it goes above certain spots
                            $($(this).data('autocomplete').menu.element).css('z-index', 100001);
                        },
                        close: function (event, ui) {
                            //hack: blank out the term so that the box shows up each time a character is pressed
                            $(this).data('autocomplete').term = '';
                        }
                    });

                    $(this).data("autocomplete")._renderItem = function (ul, item) {
                        // to allow us to put html within the anchor and also to override anchor styles (all from js)
                        return $("<li></li>")
		                .data("item.autocomplete", item)
		                .append($("<a></a>")
                        .css('font-family', sFontFamily).css('font-size', sFontSize).css('line-height', sFontSize)
                        .css('padding-top', sPaddingTop).css('padding-right', sPaddingRight).css('padding-bottom', sPaddingBottom)
                        .css('padding-left', sPaddingLeft)
		                .html(item.label))
		                .appendTo(ul);
                    };

                    $(this).data("autocomplete").menu.options.blur = $.proxy(function (event, ui) {
                        // don't set the value of the text field if it's already correct
                        // this prevents moving the cursor unnecessarily
                        if (this.menu.element.is(":visible") && (this.element.val() !== this.term)
                        && !(this.element.val().length > this.term.length)) {
                            this.element.val(this.term);
                        }
                    }, $(this).data("autocomplete"));

                    $(this).data("autocomplete").menu.options.focus = function (event, ui) {
                        // to allow us to override the focus actually setting the value of the input element
                    };

                } // End of creating auto-complete for input box

            }); // End of ('selector').each function

        }); // End of (document).ready function

    }

})(jQuery); 
