function FireMarinaScriptForSearch(action) {
    if (MarinaTagEnabled == true) {
        fireMarin(action);
    }
}
function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
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

// This function is used to redirect  to searchResult page.
function OnSearchButtonClick(resultURL, searchTextBox, searchResultType, searchButton, waterMarkDefaultValue, processingText,
                             requiredText, searchResultTypeHiddenFieldID) {

    var actualTerm = jQuery.trim(document.getElementById(searchTextBox).value);
    var term = encodeURI(actualTerm);
    if (jQuery("#" + searchResultTypeHiddenFieldID).val() == "") {
        jQuery("#" + searchResultTypeHiddenFieldID).val(urlParams.st);
    }
    var searchType = jQuery("#" + searchResultTypeHiddenFieldID).val();
    if (term != null) {
        if (actualTerm.length > 0 && actualTerm != waterMarkDefaultValue) {
            ApplyUnicaEventTag('ev=search_BT&sitekeyword=' + term.toLowerCase() + '&ActionType=Search');

            if (searchType.length <= 0)
                searchType = searchResultType;
            var newUrl = resultURL + "?st=" + searchType + "&term=" + term;
            if (jQuery("#" + searchTextBox).attr("ListViewAttribute") != null) {
                var fv = getUrlVars()["fv"];
                if (searchType > 4 && urlParams.st > 4 && fv != null && fv.length > 0) {
                    newUrl = newUrl;
                }
            }

            document.getElementById(searchTextBox).disabled = true;
            document.getElementById(searchTextBox).value = processingText;
            LogSearch(term, '', true, false);
            FireMarinaScriptForSearch('search_bc');
            window.location.href = newUrl;
        }
        else {
            document.getElementById(searchTextBox).focus();
        }
    }
    else {
        document.getElementById(searchTextBox).focus();
    }
}

function LogSearch(term, navigationValue, isLogRequired, doAsync) {
    var webMethod = '/Shared/Search/Services/SearchService.asmx/Log';
    var parameters = "{'searchTerm':'" + term + "','navValues':'" + navigationValue + "','isLogRequired':'" + isLogRequired + "'}";

    jQuery.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        async: doAsync,
        cache: false,
        timeout: 30000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            return true;
        },
        error: function (msg) {
            return false;
        }
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        if (value && value.length > 0)
            vars[key] = decodeURIComponent(value).replace(/\+/g, ' ');
    });
    return vars;
}

// To show and hide the search options div
function GetSearchOption(controlname, searchResultTypeHiddenFieldID, searchButtonOptionsDivID) {
    if (jQuery("#" + searchButtonOptionsDivID).is(':visible')) {
        jQuery("#" + searchButtonOptionsDivID).hide();
    }
    else {
        jQuery("#" + searchButtonOptionsDivID).show();
    }
    BindSearchOptionsLinkEvent(searchResultTypeHiddenFieldID, searchButtonOptionsDivID);
}

// To bind the click event for each search option 
var searchText;
function BindSearchOptionsLinkEvent(searchResultTypeHiddenFieldID, searchButtonOptionsDivID) {
    jQuery("#" + searchButtonOptionsDivID + " a").click(function (e) {
        jQuery("#" + searchButtonOptionsDivID + " a").removeClass('current');
        jQuery(this).addClass('current');
        var searchId = jQuery('#' + this.id).next().val();
        jQuery("#" + searchResultTypeHiddenFieldID).val(searchId);
        jQuery("#" + searchButtonOptionsDivID).hide();
        if (jQuery.trim(searchText) == '')
            searchText = jQuery("[id$=SearchLinkButton]").eq(1).text();
        if (searchId != 7) {
            var contentTypeSearchText = searchText.substring(0, searchText.indexOf(' ')) + " " + jQuery('#' + this.id).text();
            jQuery("[id$=SearchLinkButton]").eq(1).text(contentTypeSearchText);
        }
        else {
            jQuery("[id$=SearchLinkButton]").eq(1).text(searchText);
        }
        return false;
    });
}

// To show and hide the search options div
function GetHeaderSearchOptionButton(controlname, searchResultTypeHiddenFieldID, searchButtonOptionsDivID, searchResultTextBoxID, searchButtonDownImg, searchButtonUpImg) {
    if (jQuery("#" + searchButtonOptionsDivID).is(':visible')) {
        jQuery("#" + searchButtonOptionsDivID).hide();
        jQuery(controlname).attr("src", searchButtonDownImg);
    }
    else {
        jQuery("#" + searchButtonOptionsDivID).show();
        jQuery(controlname).attr("src", searchButtonUpImg);
    }
    BindHeaderSearchOptionsLinkEvent(searchResultTypeHiddenFieldID, searchButtonOptionsDivID, controlname, searchButtonDownImg);
    BindHeaderTextBoxFocus(searchResultTextBoxID, searchButtonOptionsDivID, controlname, searchButtonDownImg);
}

// To bind the click event for each search option 
function BindHeaderSearchOptionsLinkEvent(searchResultTypeHiddenFieldID, searchButtonOptionsDivID, controlname, searchButtonDownImg) {
    tempParentId = searchResultTypeHiddenFieldID.substring(0, searchResultTypeHiddenFieldID.lastIndexOf("_") + 1);
    jQuery("#" + searchButtonOptionsDivID + " a").click(function (e) {
        jQuery("#" + searchButtonOptionsDivID + " a").removeClass('current');
        jQuery(this).addClass('current');
        var searchId = jQuery('#' + this.id).next().val();
        jQuery("#" + searchResultTypeHiddenFieldID).val(searchId);
        jQuery("#" + searchButtonOptionsDivID).hide();
        jQuery("#" + tempParentId + "headerSearchOptionsSelected").text(jQuery('#' + this.id).text());
        jQuery(controlname).attr("src", searchButtonDownImg);
        return false;
    });
}

// To hide the search options on textbox click
function BindHeaderTextBoxFocus(searchResultTextBoxID, searchButtonOptionsDivID, controlname, searchButtonDownImg) {
    jQuery("#" + searchResultTextBoxID).focus(function () {
        jQuery("#" + searchButtonOptionsDivID).hide();
        jQuery(controlname).attr("src", searchButtonDownImg);
    });
}

function onSortingDropdownListChange(sortingDropbownList) {
    window.location.href = getSortingRedirectionUrl(sortingDropbownList.value);
}

function getSortingRedirectionUrl(SortIndex) {
    var urlParts = window.location.toString().split("?");
    var query = urlParts[1];
    var newQuery = "";
    if (query) {
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            if (pairs[i].indexOf('si') < 0) {
                newQuery = newQuery + pairs[i] + "&";
            }
        }
    }
    newQuery = newQuery + "si=" + SortIndex;
    return urlParts[0] + "?" + newQuery;
}

/*********************************** START - RECIPE SEARCH RESULTS AJAX - LIST VIEW ******************************************/

var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
        urlParams[d(e[1])] = d(e[2]);
})();

var ContentTypeEnum = {
    Article: "4",
    Community: "3",
    RecipeListView: "7",
    RecipeGridView: "6",
    Video: "9",
    All: "1"
};

function getContentTypeCount(srchResults, searchContentType) {
    var contentTypeCount = 0;
    jQuery.each(srchResults.SearchResultCountList, function () {
        if (jQuery(this).attr("ContentValue") == searchContentType) {
            contentTypeCount = jQuery(this).attr("Count");
        }
    });
    return contentTypeCount;
}

/*********************************** END - RECIPE SEARCH RESULTS AJAX - LIST VIEW ******************************************/

var resultsGridEngine = {
    submitting: false,
    ajaxRequest: null,
    filterValue: "", //AND(HasGridViewImage:True)
    maxJsonResults: 35,
    maxResults: null,
    pagesPerPageSet: null,
    navigationValue: "",
    pageIndex: 1,
    searchTerm: "",
    searchType: null,
    sortBy: 0,
    prepTimeFilters: null,
    totalTimeFilters: null,
    sortOption: "",

    clearSearchFilters: function () {
        jQuery(".narrowSrchRslt input:checkbox").attr("checked", false);
        jQuery("#prepSlider, #totalSlider").slider("option", "value", 7);
    },

    clearSearchResults: function (pageIndex) {
        jQuery("#searchButtonOptions").hide();
        jQuery("#srchRsltsGridView").html('');
        if (pageIndex == null) {
            resultsGridEngine.pageIndex = 1;
        }
        else {
            resultsGridEngine.pageIndex = pageIndex;
        }
    },

    getSearchResults: function (callback) {

        if (callback && typeof (callback) != 'function') callback = undefined;

        var pageIndex = resultsGridEngine.pageIndex;
        var maxResults = resultsGridEngine.maxResults;

        if (jQuery('.serchRsltBox').length < 1) {
            //reload from page 1, back button may be at different page
            maxResults = pageIndex * maxResults;
            //keep results under max json limit
            if (maxResults > resultsGridEngine.maxJsonResults) {
                if (resultsGridEngine.maxResults > resultsGridEngine.maxJsonResults) {
                    resultsGridEngine.maxResults = resultsGridEngine.maxJsonResults;
                    maxResults = resultsGridEngine.maxResults;
                }
                else {
                    resultsGridEngine.pageIndex = Math.floor(resultsGridEngine.maxJsonResults / resultsGridEngine.maxResults);
                    maxResults = resultsGridEngine.pageIndex * resultsGridEngine.maxResults;
                }
            }
            pageIndex = 1;
        }

        //Show/hide loading messages
        jQuery('#retResultsMessage').show();
        jQuery('#searchingMessage').show();
        jQuery('#retResults').show();
        jQuery('#searchNoRslts').hide();
        jQuery('#errResults').hide();

        var successCallback = function (data) {
            try {

                //Setup the jQuery Address
                jQuery.address.parameter("term", resultsGridEngine.searchTerm)
                    .parameter("nav", resultsGridEngine.navigationValue)
                    .parameter("pi", resultsGridEngine.pageIndex)
                    .parameter("ps", resultsGridEngine.maxResults)
                    .parameter("si", resultsGridEngine.sortBy)
                    .parameter("so", resultsGridEngine.sortOption)
				    .parameter("fv", resultsGridEngine.filterValue)
                    .update();

                var srchResults = data.d;

                if (srchResults.AllResultsCount > 0) {

                    if (getContentTypeCount(srchResults, ContentTypeEnum.RecipeListView) > 0 || getContentTypeCount(srchResults, ContentTypeEnum.RecipeGridView) > 0) {
                        jQuery.get('/shared/search/templates/SearchRecipeGalleryViewTemplate.htm', function (template) {
                            jQuery.tmpl(template, srchResults.Results,
                            {
                                dataArrayIndex: function (item) {
                                    return jQuery.inArray(item, srchResults.Results);
                                }
                            }).appendTo('#srchRsltsGridView');
                        });
                    } else {
                        jQuery('.srchMore').hide();
                        jQuery('#retResults').hide();
                        jQuery('ul#SearchResultCountSection').find('li').each(function () {
                            var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                            if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                                if (jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeGridView ||
                                jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeListView) {

                                    currentSearchType = jQuery(this).find("a").attr("searchcontenttype");
                                }
                            }
                            if (currentSearchType == jQuery(this).find("a").attr("searchcontenttype")) {
                                var filterResultCount = 0;
                                jQuery.each(srchResults.SearchResultCountList, function () {
                                    if (jQuery(this).attr("ContentValue") == currentSearchType) {
                                        filterResultCount = jQuery(this).attr("Count");
                                    }
                                });
                                jQuery(this).find("a").find('span#SearchResultCountSpan').text(filterResultCount);
                            }
                        });

                        jQuery('#searchingMessage').hide();

                        //No results on 1st search
                        if (resultsGridEngine.pageIndex == 1) {
                            jQuery('#noResultsTerm').text(decodeURIComponent(resultsGridEngine.searchTerm));
                            jQuery('#searchNoRslts').show();
                            jQuery(".pagenation").hide();
                        }
                    }

                    jQuery("<div class=\"CL\"></div>").appendTo("#srchRsltsGridView");

                    if (getUrlVars()["fv"] == '' || getUrlVars()["fv"] == undefined) {
                        // Search result count template filling
                        jQuery.get('/shared/search/templates/SearchResultCountTemplate.htm', function (template) {
                            jQuery("#SearchResultCountSection").html('');
                            jQuery.tmpl(template, srchResults.SearchResultCountList,
								{
								    dataArrayIndex: function (item) {
								        return jQuery.inArray(item, srchResults.SearchResultCountList);
								    }
								}
							  ).appendTo('#SearchResultCountSection');
                        });
                    }
                    else {
                        jQuery('ul#SearchResultCountSection').find('li').each(function () {
                            var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                            if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                                if (jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeGridView ||
                                    jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeListView) {

                                    currentSearchType = jQuery(this).find("a").attr("searchcontenttype");
                                }
                            }
                            if (currentSearchType == jQuery(this).find("a").attr("searchcontenttype")) {
                                var filterResultCount = 0;
                                jQuery.each(srchResults.SearchResultCountList, function () {
                                    if (jQuery(this).attr("ContentValue") == currentSearchType) {
                                        filterResultCount = jQuery(this).attr("Count");
                                    }
                                });
                                jQuery(this).find("a").find('span#SearchResultCountSpan').text(filterResultCount);
                            }
                        });
                    }

                    jQuery('#retResults').hide();
                    jQuery('#searchingMessage').hide();

                    if (srchResults.RecipesCount < resultsGridEngine.maxResults) {
                        jQuery('.srchMore').hide();
                    }
                    else {
                        resultsGridEngine.pageIndex++;
                        jQuery('.srchMore').show();
                    }
                } else {
                    jQuery('.srchMore').hide();
                    jQuery('#retResults').hide();
                    jQuery('ul#SearchResultCountSection').find('li').each(function () {
                        var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                        if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                            if (jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeGridView ||
                                    jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeListView) {

                                currentSearchType = jQuery(this).find("a").attr("searchcontenttype");
                            }
                        }
                        if (currentSearchType == jQuery(this).find("a").attr("searchcontenttype")) {
                            var filterResultCount = 0;
                            jQuery.each(srchResults.SearchResultCountList, function () {
                                if (jQuery(this).attr("ContentValue") == currentSearchType) {
                                    filterResultCount = jQuery(this).attr("Count");
                                }
                            });
                            jQuery(this).find("a").find('span#SearchResultCountSpan').text(filterResultCount);
                        }
                    });
                    jQuery('#searchingMessage').hide();

                    //No results on 1st search
                    if (resultsGridEngine.pageIndex == 1) {
                        jQuery('#noResultsTerm').text(decodeURIComponent(resultsGridEngine.searchTerm));
                        jQuery('#searchNoRslts').show();
                        jQuery(".pagenation").hide();
                        //jQuery("#SortingViewRslt").hide();
                        // jQuery("#narrowSrchRsltBtn").hide();
                        //jQuery("#listViewLink").hide();
                    }
                }
                resultsGridEngine.submitting = false;
            }
            catch (err) {
                resultsGridEngine.submitting = false;
                ConsoleLog(err);
                jQuery('#retResults').hide();
                jQuery('#errResults').show();
            }
        };

        function ajaxFailed(xmlRequest) {
            resultsGridEngine.submitting = false;
            ConsoleLog(xmlRequest.status + ' \n\r ' + xmlRequest.statusText + '\n\r' + xmlRequest.responseText);
            jQuery('#retResults').hide();
            jQuery('#errResults').show();
        }

        var parametersAsJSONObject = {
            searchTerm: resultsGridEngine.searchTerm,
            searchType: 6,
            pageIndex: resultsGridEngine.pageIndex,
            pageSize: resultsGridEngine.maxResults,
            sortIndex: resultsGridEngine.sortBy,
            sortingViewItemPath: jQuery('.SortingViewItemConfigKeyNameHiddenField').val(),
            filterValue: resultsGridEngine.filterValue,
            navValues: resultsGridEngine.navigationValue,
            sortOptions: resultsGridEngine.sortOption
        };

        resultsGridEngine.ajaxRequest = jQuery.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(parametersAsJSONObject),
            error: ajaxFailed,
            success: function (data) {
                successCallback(data);
                if (callback) callback();
            },
            type: "POST",
            url: "/Shared/Search/Services/SearchService.asmx/GetSearchResults"
        });
    },

    initializeResults: function (callback) {

        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            jQuery('#searchTermTb').val(urlParams.term);
            resultsGridEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }

        var urlVars = getUrlVars();
        if (urlVars["ps"] != null && urlVars["ps"].length > 0) {
            resultsGridEngine.maxResults = urlVars["ps"];
        }
        if (urlVars["pi"] != null && urlVars["pi"].length > 0) {
            resultsGridEngine.pageIndex = urlVars["pi"];
        }
        if (urlVars["si"] != null && urlVars["si"].length > 0) {
            resultsGridEngine.sortBy = urlVars["si"];
        }
        if (urlVars["so"] != null && urlVars["so"].length > 0) {
            resultsGridEngine.sortOption = urlVars["so"];
        }
        if (urlVars["st"] != null && urlVars["st"].length > 0) {
            resultsGridEngine.searchResultType = urlVars["st"];
        }
        if (urlVars["fv"] != null && urlVars["fv"].length > 0) {
            resultsGridEngine.filterValue = urlVars["fv"];
        }

        resultsGridEngine.searchType = 6; //urlParams.st;

        resultsGridEngine.maxResults = jQuery('.PageSizeHiddenField').val();
        resultsGridEngine.pagesPerPageSet = jQuery('.PagesPerPageSetHiddenField').val();

        SortingView.Initialize(resultsGridEngine);
        searchFactesFilter.initFacets(resultsGridEngine);
        SortingView.EventBinding(resultsGridEngine);

        //Setup Reset Filters Click
        jQuery(".resetFacetFilters").click(function () {
            resultsGridEngine.clearSearchFilters();
            jQuery.address.parameter("fv", "");
            jQuery("#srchRsltsGridView").html('');
            resultsGridEngine.pageIndex = 1;
            resultsGridEngine.submitting = true;
            resultsGridEngine.updateFilterValue();
            resultsGridEngine.getSearchResults();
        });

        jQuery(".recpImg").live("mouseenter", function (event) {

            jQuery(this).nextAll('.rcpiDetails').show();

        });

        jQuery(".recpImg").live("mouseleave", function (event) {

            jQuery(this).nextAll('.rcpiDetails').hide();

        });


        jQuery(".rcpiDetails").live("mouseenter", function (event) {

            jQuery(this).show();

        });

        jQuery(".rcpiDetails").live("mouseleave", function (event) {

            jQuery(this).hide();

        });
        //Setup recipe detail links
        jQuery('.recipeLink').live('click', function () {
            var urlParams = decodeURI(window.location.search.substring(1));
            var recipeUrl = jQuery(this).attr('href');
            recipeUrl += "#?";
            if (urlParams == false | urlParams == '') {
                jQuery(this).attr('href', recipeUrl);
                return;
            }

            var pageSize = getUrlVars()["ps"];
            if (pageSize != null) {
                urlParams += "&ps=" + pageSize;
            }
            var pageIndex = getUrlVars()["pi"];
            if (pageIndex != null) {
                urlParams += "&pi=" + pageSize;
            }

            var facetValue = getUrlVars()["fv"];
            if (facetValue != null) {
                urlParams += "&fv=" + facetValue;
            }
            recipeUrl += urlParams;
            jQuery(this).attr('href', recipeUrl);
        });


        //Setup more results click
        jQuery('.moreResultsButton').live("click", function (e) {
            if (!resultsGridEngine.submitting) {
                jQuery('#retResults').show();
                jQuery('#searchingMessage').show();
                resultsGridEngine.submitting = true;
                resultsGridEngine.getSearchResults();
            }
        });

        //Setup result/error message links
        jQuery('#retrySearchLink').live('click', function () {
            if (!resultsGridEngine.submitting) {
                count = 1;
                resultsGridEngine.submitting = true;
                resultsGridEngine.clearSearchResults(resultsGridEngine.pageIndex);
                resultsGridEngine.getSearchResults();
            }
        });

        jQuery('#cancelSearchLink').live('click', function () {
            if (resultsGridEngine.ajaxRequest != null) {
                resultsGridEngine.submitting = false;
                resultsGridEngine.ajaxRequest.abort();
                jQuery('#retResults').hide();
                jQuery('#searchingMessage').hide();
            }
        });

        //Setup Filter window shade open/close
        jQuery('#filterRecipesOn').live('click', function () {
            jQuery('.narrowSrchRslt').show();
            jQuery('#filterRecipesOff').show();
            jQuery('#filterRecipesOn').hide();
        });

        jQuery('#filterRecipesOff').live('click', function () {
            jQuery('.narrowSrchRslt').hide();
            jQuery('#filterRecipesOff').hide();
            jQuery('#filterRecipesOn').show();
        });

        if (!resultsGridEngine.submitting) {
            count = 1;
            resultsGridEngine.submitting = true;
            resultsGridEngine.clearSearchResults();
            resultsGridEngine.getSearchResults(callback);
        }


    },

    updateFilterUI: function () {

        var selectedFilters = resultsGridEngine.filterValue;
        if (selectedFilters.length > 0) {
            selectedFilters = selectedFilters.replace('AND(HasGridViewImage:True)', '');
            if (selectedFilters.length > 0) {
                searchFactesFilter.updateFacetFilterUI(selectedFilters);
                jQuery('.moreResultsButton').trigger('click');
            }
        }
    },

    updateFilterValue: function () {
        resultsGridEngine.filterValue = searchFactesFilter.getFacetFilterValues();

        if (resultsGridEngine.filterValue.length == 0) {
            resultsGridEngine.filterValue += ""; //AND(AND(HasGridViewImage:True))
        }
        else {
            resultsGridEngine.filterValue = "AND(AND(HasGridViewImage:True) " + resultsGridEngine.filterValue + ")";
        }

        jQuery.address.parameter("fv", resultsGridEngine.filterValue);
        jQuery.address.update();
    },

    openSaveRecipeToRecipeBoxLink: function (recipeId) {
        if (jQuery(".SaveRecipeBoxHiddenField").val() == "1") {
            jQuery("[id$=RecipeIdHiddenField]").val(recipeId);
            if (jQuery("[id$=_SaveRecipeToolbarHyperLink]").attr("redirecturl")) {
                var redirectUrl = jQuery("[id$=_SaveRecipeToolbarHyperLink]").attr("redirecturl").split(";")[0].split(",'");
                var url = redirectUrl[redirectUrl.length - 1].replace("')", "") + "&rid=" + recipeId + "')";
                url = url.replace(getQueryVariableWithUrl("st", url), "st=6");
                var newFn = jQuery("[id$=_SaveRecipeToolbarHyperLink]").attr("redirecturl").replace(redirectUrl[redirectUrl.length - 1], url)
                jQuery("[id$=_SaveRecipeToolbarHyperLink]").removeAttr("onclick");
                jQuery("[id$=_SaveRecipeToolbarHyperLink]").bind("click", function (event) {
                    eval(newFn.split(";")[0]);
                    event.preventDefault();
                });
            }
            var searchRecipeTitle = jQuery('a[href$=' + recipeId + ']').eq(0).text();
            jQuery("[id$=RecipeTitleHiddenField]").val(searchRecipeTitle);
            jQuery(".recipebox").trigger('click');
        }
        else {
            alert("Save recipe is not available.");
        }
    },

    updateSortUI: function () {
        updateSortingUI(resultsGridEngine);
    }
};

function getQueryVariableWithUrl(variable, url) {
    if (url.split("?").length == 1)
        return '';
    var query = url.split("?")[1];
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[0] + '=' + pair[1];
        }
    }
}

/* END - SEARCH RESULT - GALLERY VIEW */

/* START  - SEARCH RESULT  - ALL RESULT VIEW - HARENDER*/
var allSearchResultListEngine = {
    ajaxRequest: null,
    filterValue: "",
    maxResults: null,
    maxJsonResults: 35,
    pagesPerPageSet: null,
    navigationValue: "",
    pageIndex: 1,
    searchTerm: "",
    searchType: null,
    sortBy: 0,
    prepTimeFilters: null,
    totalTimeFilters: null,
    formsubmit: false,
    sortingAjaxRequest: null,
    sortOption: "",

    clearSearchFilters: function () {
        jQuery(".listFilterContainer input:checkbox").attr("checked", false);
        jQuery("#prepSlider, #totalSlider").slider("option", "value", 7);
    },

    clearSearchResults: function () {
        jQuery("#srchRslts").html('');
        jQuery("#searchButtonOptions").hide();
        jQuery('#otherTypeCounts').hide();
        jQuery("#PrevPage").hide();
        jQuery("#PageNumbers").html("");
        jQuery("#NextPage").hide();
        jQuery("#NextPages").hide();
        jQuery("#PrevPages").hide();
        jQuery(".pagenation").hide();
    },

    getSearchResults: function (scrollTop, callback) {
        if (scrollTop && typeof (scrollTop) == 'function') {
            callback = scrollTop;
            scrollTop = false;
        }
        if (callback && typeof (callback) != 'function') callback = undefined;

        if (count < 1) {
            count++
            //Show/hide loading messages
            jQuery("#srchRslts").addClass("results_muted");
            var top = jQuery(window).height() / 2;
            var left = jQuery(window).width() / 4;
            jQuery('#searchingMessage').show().css("top", top);
            jQuery('#searchingMessage').show().css("left", left);
            jQuery('#retResults').show();
            jQuery('#searchNoRslts').hide();
            jQuery('#errResults').hide();

            //keep results under max json limit
            if (allSearchResultListEngine.maxResults > allSearchResultListEngine.maxJsonResults) {
                allSearchResultListEngine.maxResults = allSearchResultListEngine.maxJsonResults;
            }
            var successCallback = function (data) {
                try {
                    jQuery("#srchRslts").removeClass("results_muted");
                    allSearchResultListEngine.clearSearchResults();
                    //Setup the jQuery Address
                    jQuery.address.parameter("term", allSearchResultListEngine.searchTerm)
                        .parameter("nav", allSearchResultListEngine.navigationValue)
                        .parameter("fv", allSearchResultListEngine.filterValue)
                        .parameter("pi", allSearchResultListEngine.pageIndex)
                        .parameter("ps", allSearchResultListEngine.maxResults)
                        .parameter("so", allSearchResultListEngine.sortOption)
                        .parameter("si", allSearchResultListEngine.sortBy)
                        .update();

                    var srchResults = data.d;

                    if (srchResults.AllResultsCount > 0) {
                        //All Result VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.All) {

                            var allResultCount = getContentTypeCount(srchResults, ContentTypeEnum.All);

                            if (allResultCount > 0) {
                                jQuery.get('/shared/search/templates/ViewAllResultListViewTemplate.htm', function (template) {
                                    jQuery("#srchRslts").html('');
                                    jQuery.tmpl(template, srchResults.Results,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.Results);
							    }
							}
						  ).appendTo('#srchRslts');
                                });
                            }
                            else {
                                DisplayNoSearchResult(srchResults.AllResultsCount);
                            }

                        }
                        //COMMUNITY VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.Community) {
                            var communityCountTemp = getContentTypeCount(srchResults, ContentTypeEnum.Community);

                            if (communityCountTemp > 0) {
                                jQuery.get('/shared/search/templates/CommunityListViewTemplate.htm', function (template) {
                                    jQuery("#srchRslts").html('');
                                    jQuery.tmpl(template, srchResults.Results,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.Results);
							    }
							}
						  ).appendTo('#srchRslts');
                                });
                            }
                            else {
                                DisplayNoSearchResult(srchResults.CommunityCount);
                            }
                        }
                        //ARTICLE VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.Article) {
                            var articleCountTemp = getContentTypeCount(srchResults, ContentTypeEnum.Article);

                            if (articleCountTemp > 0) {
                                jQuery.get('/shared/search/templates/ArticleListViewTemplate.htm', function (template) {
                                    jQuery("#srchRslts").html('');
                                    jQuery.tmpl(template, srchResults.Results,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.Results);
							    }
							}
						  ).appendTo('#srchRslts');

                                });
                            }
                            else {
                                DisplayNoSearchResult(srchResults.ArticlesCount);
                            }
                        }
                        //RECIPE GRID VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == "6") {
                            if (filterON == false) {
                                resultsGridEngine.filterValue = "";
                                filterON = true;
                            }
                            resultsGridEngine.initializeResults();
                        }
                        //Video VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.Video) {
                            var videoCountTemp = getContentTypeCount(srchResults, ContentTypeEnum.Video);

                            if (videoCountTemp > 0) {
                                jQuery.get('/shared/search/templates/VideoListViewTemplate.htm', function (template) {
                                    jQuery("#srchRslts").html('');
                                    jQuery.tmpl(template, srchResults.Results,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.Results);
							    }
							}
						  ).appendTo('#srchRslts');
                                });
                            }
                            else {
                                DisplayNoSearchResult(srchResults.VideosCount);
                            }
                        }
                        //RECIPE LIST VIEW
                        if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.RecipeListView) {
                            if (getContentTypeCount(srchResults, ContentTypeEnum.RecipeListView) > 0 || getContentTypeCount(srchResults, ContentTypeEnum.RecipeGridView) > 0) {
                                jQuery.get('/shared/search/templates/SearchRecipeListViewTemplate.htm', function (template) {
                                    jQuery("#srchRslts").html('');
                                    jQuery.tmpl(template, srchResults.Results,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.Results);
							    }
							}
						  ).appendTo('#srchRslts');
                                });
                            }
                            else {
                                DisplayNoSearchResult(srchResults.RecipesCount);
                            }

                        }
                        if (getUrlVars()["fv"] == '' || getUrlVars()["fv"] == undefined) {
                            // Search result count template rendering
                            jQuery.get('/shared/search/templates/SearchResultCountTemplate.htm', function (template) {
                                jQuery("#SearchResultCountSection").html('');
                                jQuery.tmpl(template, srchResults.SearchResultCountList,
							{
							    dataArrayIndex: function (item) {
							        return jQuery.inArray(item, srchResults.SearchResultCountList);
							    }
							}
						  ).appendTo('#SearchResultCountSection');
                            });
                        }
                        else {
                            jQuery('ul#SearchResultCountSection').find('li').each(function () {
                                var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                                if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                                    if (jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeGridView ||
                                    jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeListView) {

                                        currentSearchType = jQuery(this).find("a").attr("searchcontenttype");
                                    }
                                }
                                if (currentSearchType == jQuery(this).find("a").attr("searchcontenttype")) {
                                    var filterResultCount = 0;
                                    jQuery.each(srchResults.SearchResultCountList, function () {
                                        if (jQuery(this).attr("ContentValue") == currentSearchType) {
                                            filterResultCount = jQuery(this).attr("Count");
                                        }
                                    });
                                    jQuery(this).find("a").find('span#SearchResultCountSpan').text(filterResultCount);
                                }
                            });
                        }

                        var artVidCount = srchResults.ArticlesCount;

                        if (artVidCount > 0) {
                            jQuery("#videoArticleCount").html("(" + artVidCount + ") ");
                            jQuery('#otherTypeCounts').show();
                        }


                        jQuery('#retResults').fadeOut(700);
                        jQuery('#searchingMessage').fadeOut(700);
                        if (scrollTop) {
                            allSearchResultListEngine.ScrollTop();
                        }

                        if (jQuery("#searchNoRslts").is(':visible')) {
                            jQuery(".pagenation").hide();
                        } else {
                            jQuery(".pagenation").show();
                        }

                        //Call Pagination 
                        Pagination.PopulatePagination(allSearchResultListEngine, srchResults.SearchResultCountList);


                    }
                    else {
                        DisplayNoSearchResult(srchResults.AllResultsCount);
                    }

                    allSearchResultListEngine.submitting = false;

                }
                catch (err) {
                    allSearchResultListEngine.submitting = false;
                    ConsoleLog(err);
                    jQuery('#retResults').hide();
                    jQuery('#errResults').show();
                }
            };
            function DisplayNoSearchResult(resultCount) {
                jQuery('#retResults').hide();
                jQuery('ul#SearchResultCountSection').find('li').each(function () {
                    var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                    if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                        if (jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeGridView ||
                                    jQuery(this).find("a").attr("searchcontenttype") == ContentTypeEnum.RecipeListView) {

                            currentSearchType = jQuery(this).find("a").attr("searchcontenttype");
                        }
                    }
                    if (currentSearchType == jQuery(this).find("a").attr("searchcontenttype")) {
                        jQuery(this).find("a").find('span#SearchResultCountSpan').text(resultCount);
                    }
                });
                jQuery('#searchingMessage').hide();
                if (scrollTop) {
                    allSearchResultListEngine.ScrollTop();
                }
                //No results 
                if (allSearchResultListEngine.pageIndex == 1) {
                    jQuery('#noResultsTerm').text(decodeURIComponent(allSearchResultListEngine.searchTerm));
                    jQuery('#searchNoRslts').show();
                    //jQuery("#SortingViewRslt").hide();
                    jQuery("#narrowSrchRsltBtn").hide();
                    jQuery("#listViewLink").hide();
                    jQuery(".pagenation").hide();
                }
            }
            function ajaxFailed(xmlRequest) {
                allSearchResultListEngine.submitting = false;
                ConsoleLog(xmlRequest.status + ' \n\r ' + xmlRequest.statusText + '\n\r' + xmlRequest.responseText);
                jQuery('#retResults').hide();
                jQuery('#errResults').show();
            }

            var parametersAsJSONObject = {
                searchTerm: allSearchResultListEngine.searchTerm,
                searchType: jQuery('.SearchTypeHiddenField').val(),
                pageIndex: allSearchResultListEngine.pageIndex,
                pageSize: allSearchResultListEngine.maxResults,
                sortIndex: allSearchResultListEngine.sortBy,
                sortingViewItemPath: jQuery('.SortingViewItemConfigKeyNameHiddenField').val(),
                filterValue: allSearchResultListEngine.filterValue,
                navValues: jQuery.trim(allSearchResultListEngine.navigationValue.replace(/\+/g, ' ')),
                sortOptions: allSearchResultListEngine.sortOption
            };

            allSearchResultListEngine.ajaxRequest = jQuery.ajax({
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(parametersAsJSONObject),
                error: ajaxFailed,
                success: function (data) {
                    successCallback(data);
                    if (callback) callback();
                },
                type: "POST",
                url: "/Shared/Search/Services/SearchService.asmx/GetSearchResults"
            });
        }
    },

    initializeResults: function (callback) {


        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            jQuery('#searchTermTb').val(urlParams.term);
            allSearchResultListEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }
        var urlVars = getUrlVars();
        if (jQuery('.SearchTypeHiddenField').val() == urlVars["st"]) {
            jQuery.address.parameter("fv", "");
        }
        if (urlVars["ps"] != null && urlVars["ps"].length > 0) {
            allSearchResultListEngine.maxResults = urlVars["ps"];
        }
        if (urlVars["pi"] != null && urlVars["pi"].length > 0) {
            allSearchResultListEngine.pageIndex = urlVars["pi"];
        }
        if (urlVars["si"] != null && urlVars["si"].length > 0) {
            allSearchResultListEngine.sortBy = urlVars["si"];
        }
        if (urlVars["so"] != null && urlVars["so"].length > 0) {
            allSearchResultListEngine.sortOption = urlVars["so"];
        }
        if (urlVars["st"] != null && urlVars["st"].length > 0) {
            allSearchResultListEngine.searchResultType = urlVars["st"];
        }
        if (urlVars["fv"] != null && urlVars["fv"].length > 0) {
            allSearchResultListEngine.filterValue = urlVars["fv"];
        }

        allSearchResultListEngine.formsubmit = true;
        allSearchResultListEngine.maxResults = jQuery('.PageSizeHiddenField').val();
        allSearchResultListEngine.pagesPerPageSet = jQuery('.PagesPerPageSetHiddenField').val();


        SortingView.Initialize(allSearchResultListEngine);
        searchFactesFilter.initFacets(allSearchResultListEngine);
        allSearchResultListEngine.updateFilterUI();
        allSearchResultListEngine.getSearchResults(callback);
        if (jQuery('.SearchTypeHiddenField').val() != ContentTypeEnum.RecipeGridView) {
            SortingView.EventBinding(allSearchResultListEngine);
        }
        Pagination.Initialize(allSearchResultListEngine);
        //Setup result/error message links
        jQuery('#retrySearchLink').click(function () {
            if (!allSearchResultListEngine.submitting) {
                allSearchResultListEngine.submitting = true;
                allSearchResultListEngine.getSearchResults(callback);
            }
        });

        jQuery('#cancelSearchLink').click(function () {
            if (allSearchResultListEngine.ajaxRequest != null) {
                allSearchResultListEngine.submitting = false;
                allSearchResultListEngine.ajaxRequest.abort();
                jQuery("#srchRslts").removeClass("results_muted");
                jQuery('#retResults').hide();
                jQuery('#searchingMessage').hide();
            }
        });




        //Setup recipe detail links
        jQuery('.recipeLink').live('click', function () {
            var urlParams = decodeURI(window.location.search.substring(1));
            var recipeUrl = jQuery(this).attr('href');
            recipeUrl += "#?";
            if (urlParams == false | urlParams == '') {
                jQuery(this).attr('href', recipeUrl);
                return;
            }
            var facetValue = getUrlVars()["fv"];
            if (facetValue != null) {
                urlParams += "&fv=" + facetValue;
            }
            recipeUrl += urlParams;
            jQuery(this).attr('href', recipeUrl);
        });


    },

    updateFilterUI: function () {

        allSearchResultListEngine.filterValue = decodeURIComponent(allSearchResultListEngine.filterValue);

        searchFactesFilter.updateFacetFilterUI(allSearchResultListEngine.filterValue);
    },

    updateFilterValue: function () {
        allSearchResultListEngine.filterValue = searchFactesFilter.getFacetFilterValues();
        allSearchResultListEngine.filterValue = decodeURIComponent(allSearchResultListEngine.filterValue);

        jQuery.address.parameter("fv", allSearchResultListEngine.filterValue);
        jQuery.address.update();
    },

    updateSortUI: function () {
        updateSortingUI(allSearchResultListEngine);
    },

    ScrollTop: function () { window.scrollTo(0, 0); }
};
/* END  - SEARCH RESULT  - ALL RESULT VIEW - HARENDER*/


/* COMMON SEARCH RESULT FUNCTIONS */
function updateSortingUI(resultsEngine) {
    if (jQuery(".on").length == 0) {
        jQuery('.menuSrchMenu ul li:first a').addClass("on");
        jQuery('.menuSrchMenu ul li.sortHeader').next("li").find("a").addClass("on");
    }
}
/* END - COMMON SEARCH RESULT FUNCTIONS */


/* START - ADV SEARCH FUNCTIONS */

function onClearAdvSearchCriteriaClick(keywordsWatermark) {
    jQuery("[id$=KeywordsTextBox]").val(keywordsWatermark);
    jQuery(".advSearchFacetsDiv input:checkbox").attr("checked", false);
    jQuery(".advSearchFacetsDiv select").each(function (index) {
        jQuery(this).find("option:first").attr("selected", "selected");
    });
    return false;
}

function onAdvSearchClick(keywordsWatermark, requiredLabelId, requiredErrorMessage) {
    if (keywordsWatermark == jQuery("[id$=KeywordsTextBox]").val() || jQuery("[id$=KeywordsTextBox]").val().trim() == "") {
        alert(requiredErrorMessage);
    }
    else {
        ApplyUnicaEventTag('ev=search_BT&sitekeyword=' + jQuery("[id$=KeywordsTextBox]").val().toLowerCase() + '&ActionType=Search');
        var facetval = searchFactesFilter.getFacetFilterValues();
        var rsltUrl = jQuery("[id$=AdvSearchRsltPageHiddenField]").val() + "?term=" + jQuery("[id$=KeywordsTextBox]").val();
        rsltUrl += "&st=7&ads=1";
        if (facetval != null && facetval != '') {
            rsltUrl += "&fv=" + facetval;
        }
        facetval = facetval.replace(/AND\(/g, '');
        facetval = facetval.replace(/OR\(/g, '');
        facetval = facetval.replace(/NOT\(/g, '');
        facetval = facetval.replace(/\)/g, '');
        facetval = facetval.replace(/,/g, ' ');
        LogSearch(jQuery("[id$=KeywordsTextBox]").val(), facetval, true, false);
        window.location.href = rsltUrl;
    }
    return false;
}

/* END - ADV SEARCH FUNCTIONS */


/* START - FACETS */

var searchFactesFilter = {
    prepTimeFilters: "",
    totalTimeFilters: "",
    prepTimeFilterOperter: "",
    totalTimeFilterOperter: "",

    updateFacetFilterUI: function (selectedFilters) {

        if (selectedFilters && selectedFilters.length > 0) {
            //Remove operator logic and default filter value
            selectedFilters = selectedFilters.replace(/AND\(/g, '');
            selectedFilters = selectedFilters.replace(/OR\(/g, '');
            selectedFilters = selectedFilters.replace(/NOT\(/g, '');
            selectedFilters = selectedFilters.replace(/\)/g, '');

            if (selectedFilters.length > 0) {
                selectedFilters = ',' + selectedFilters + ',';
                //Loop all check boxes
                var filters = jQuery(".listFilterContainer input:checkbox");
                var filterValue;

                jQuery.each(filters, function (idx) {
                    filterValue = jQuery(this).parent().attr("alt");
                    if (filterValue != null && filterValue.length > 0) {
                        filterValue = ',' + filterValue + ',';
                        if (selectedFilters.indexOf(filterValue) >= 0) {
                            jQuery(this).attr('checked', true);
                        }
                    }
                });

                filters = jQuery(".listFilterContainer select");
                var sltVal = "";
                jQuery.each(filters, function (idx) {
                    jQuery.each(jQuery(this).children(), function (index) {
                        sltVal = jQuery(this).val();
                        if (sltVal != null && sltVal.length > 0) {
                            filterValue = ',' + sltVal + ',';
                            if (selectedFilters.indexOf(filterValue) >= 0) {
                                jQuery(this).parent().val(sltVal);
                            }
                        }
                    });
                });

                //Loop through Prep and Total Time arrays and check for selected value
                jQuery.each(searchFactesFilter.prepTimeFilters, function (idx, val) {
                    val = ',' + val + ',';
                    if (selectedFilters.indexOf(val) >= 0) {
                        jQuery("#prepSlider").slider("option", "value", idx);
                        return;
                    }
                });

                jQuery.each(searchFactesFilter.totalTimeFilters, function (idx, val) {
                    val = ',' + val + ',';
                    if (selectedFilters.indexOf(val) >= 0) {
                        jQuery("#totalSlider").slider("option", "value", idx);
                        return;
                    }
                });
            }
        }
    },

    getFacetFilterValues: function () {

        var filterValue = "";

        var andValues = "";
        var orValues = "";
        var notValues = "";

        var checkedBoxes = jQuery(".listFilterContainer input:checked");
        var navValue;
        var opter;

        jQuery.each(checkedBoxes, function (idx) {
            navValue = jQuery(this).parent().attr("alt");
            opter = jQuery(this).parent().attr("opter");

            if (navValue != null && navValue.length > 0) {
                if (navValue != null && navValue.length > 0) {
                    if (opter == "NOT")
                        notValues += navValue + ",";
                    else if (opter == "OR")
                        orValues += navValue + ",";
                    else
                        andValues += navValue + ",";
                }
            }
        });

        var ddlValues = jQuery(".listFilterContainer select");

        jQuery.each(ddlValues, function (idx) {
            navValue = jQuery(this).val();
            opter = jQuery(this).attr("opter");
            if (navValue != null && navValue.length > 0) {
                if (opter == "NOT")
                    notValues += navValue + ",";
                else if (opter == "OR")
                    orValues += navValue + ",";
                else
                    andValues += navValue + ",";
            }
        });

        //Get Prep Time Filter
        var prepTimeFiltrIdx = jQuery("#prepSlider").slider("option", "value");
        if (prepTimeFiltrIdx < 6 && searchFactesFilter.prepTimeFilters[prepTimeFiltrIdx] != null && searchFactesFilter.prepTimeFilters[prepTimeFiltrIdx].length > 0) {
            if (searchFactesFilter.prepTimeFilterOperter == "NOT")
                notValues += searchFactesFilter.prepTimeFilters[prepTimeFiltrIdx] + ",";
            else if (searchFactesFilter.prepTimeFilterOperter == "OR")
                orValues += searchFactesFilter.prepTimeFilters[prepTimeFiltrIdx] + ",";
            else
                andValues += searchFactesFilter.prepTimeFilters[prepTimeFiltrIdx] + ",";
        }

        //Get Total Time Filter
        var totalTimeFiltrIdx = jQuery("#totalSlider").slider("option", "value");
        if (totalTimeFiltrIdx < 6 && searchFactesFilter.totalTimeFilters[totalTimeFiltrIdx] != null && searchFactesFilter.totalTimeFilters[totalTimeFiltrIdx].length > 0) {
            if (searchFactesFilter.totalTimeFilterOperter == "NOT")
                notValues += searchFactesFilter.totalTimeFilters[totalTimeFiltrIdx] + ",";
            else if (searchFactesFilter.totalTimeFilterOperter == "OR")
                orValues += searchFactesFilter.totalTimeFilters[totalTimeFiltrIdx] + ",";
            else
                andValues += searchFactesFilter.totalTimeFilters[totalTimeFiltrIdx] + ",";
        }

        if (andValues.length > 0)
            filterValue = "AND(" + andValues.substring(0, andValues.length - 1) + "),";
        if (orValues.length > 0)
            filterValue += "OR(" + orValues.substring(0, orValues.length - 1) + "),";
        if (notValues.length > 0)
            filterValue += "NOT(" + notValues.substring(0, notValues.length - 1) + "),";

        if (filterValue.length > 0)
            filterValue = "AND(" + filterValue.substring(0, filterValue.length - 1) + ")";

        return filterValue;
    },

    initFacets: function (resultsEngine) {

        if (jQuery(".PrepTimeFiltersHiddenField") != null && jQuery(".PrepTimeFiltersHiddenField").val() != null) {
            searchFactesFilter.prepTimeFilters = jQuery(".PrepTimeFiltersHiddenField").val().split(',');
        }

        if (jQuery(".TotalTimeFiltersHiddenField") != null && jQuery(".TotalTimeFiltersHiddenField").val() != null) {
            searchFactesFilter.totalTimeFilters = jQuery(".TotalTimeFiltersHiddenField").val().split(',');
        }

        if (jQuery(".PrepTimeFilterOperatorHiddenField") != null && jQuery(".PrepTimeFilterOperatorHiddenField").val() != null) {
            searchFactesFilter.prepTimeFilterOperter = jQuery(".PrepTimeFilterOperatorHiddenField").val();
        }

        if (jQuery(".TotalTimeFilterOperatorHiddenField") != null && jQuery(".TotalTimeFilterOperatorHiddenField").val() != null) {
            searchFactesFilter.totalTimeFilterOperter = jQuery(".TotalTimeFilterOperatorHiddenField").val();
        }
        jQuery("#prepSlider, #totalSlider").slider({
            value: 6,
            min: 0,
            max: 6,
            step: 1,
            slide: function (event, ui) {
                if (resultsEngine.submitting) {
                    return false;
                }
            },
            stop: function (event, ui) {
                if (!resultsEngine.submitting) {
                    resultsEngine.clearSearchResults();
                    resultsEngine.updateFilterValue();
                    count = 0;
                    resultsEngine.pageIndex = 1;
                    jQuery.address.parameter("pi", "1");
                    resultsEngine.getSearchResults();
                }
            }
        });
    }
};

/* END - FACETS */

function isEnterKeyPressed(obj, event, keywordsWatermarkText, errorMessgeLabel, KeywordsRequiredMessage) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        onAdvSearchClick(keywordsWatermarkText, errorMessgeLabel, KeywordsRequiredMessage);
        return false;
    }
    else {
        return true;
    }
}

function removeMessage(autoCompleteTextBox, WaterMarkText, requiredLabelId, requiredErrorMessage) {
    if (document.getElementById(autoCompleteTextBox).value == WaterMarkText) {
        document.getElementById(autoCompleteTextBox).value = "";
    }
    if (document.getElementById(requiredLabelId).innerText == requiredErrorMessage | document.getElementById(requiredLabelId).innerHTML == requiredErrorMessage) {
        document.getElementById(requiredLabelId).innerText = "";
        document.getElementById(requiredLabelId).innerHTML = "";
    }
}
function removeErrorMessage(autoCompleteTextBox, WaterMarkText, requiredLabelId, requiredErrorMessage) {
    var textValue = document.getElementById(autoCompleteTextBox).value;
    if (textValue == WaterMarkText || textValue.length == 0) {
        document.getElementById(autoCompleteTextBox).value = WaterMarkText;
    }
    if (document.getElementById(requiredLabelId).innerText == requiredErrorMessage | document.getElementById(requiredLabelId).innerHTML == requiredErrorMessage) {
        document.getElementById(requiredLabelId).innerText = "";
        document.getElementById(requiredLabelId).innerHTML = "";
    }
}
function FireOnSearchSpotLightTag() {
    var axel = Math.random() + "";
    var a = axel * 10000000000000;
    document.getElementById("SearchSpotLightTagContainer").innerHTML = '<IFRAME SRC="http://fls.doubleclick.net/activityi;src=1869704;type=betty077;cat=searc844;ord=1;num=' + a + '?" WIDTH=1 HEIGHT=1 FRAMEBORDER=0></IFRAME>';

}

//resets the address params that should not persist when switching search type
function resetAddressParams() {
    jQuery.address
        .parameter("pi", "1")
        .parameter("si", "")
        .parameter("so", "")
        .parameter("fv", "")
        .update();
}

jQuery("#SearchResultCountSection li a.tabUnselectedLink").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    tabContentType = jQuery(this).attr('SearchContentType');
    resetAddressParams();
    doSearch(tabContentType)
});
jQuery(".viewaslist a").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    resetAddressParams();
    doSearch(ContentTypeEnum.RecipeListView);
});
jQuery("#galleryLink a").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    resetAddressParams();
    doSearch(ContentTypeEnum.RecipeGridView);
});

var SortingView = {
    Initialize: function (resultEngine) {
        var sortingSuccessCallback = function (data) {
            try {
                var srchResults = data.d;

                jQuery.get('/shared/search/templates/SortingViewTemplate.htm', function (template) {
                    jQuery("#SortingViewRslt").html('');
                    jQuery.tmpl(template, srchResults,
					{
					    dataArrayIndex: function (item) {
					        return jQuery.inArray(item, srchResults);
					    }
					}
				  ).appendTo('#SortingViewRslt');
                    jQuery('.menuSrchMenu ul li:first a').addClass("on");
                    jQuery('.menuSrchMenu ul li.sortHeader').next("li").find("a").addClass("on");
                });
            }
            catch (err) {
                resultEngine.submitting = false;
                ConsoleLog(err);
                jQuery('#retResults').hide();
                jQuery('#errResults').show();
            }
        };
        function sortingAjaxFailed(xmlRequest) {
            resultEngine.submitting = false;
            ConsoleLog(xmlRequest.status + ' \n\r ' + xmlRequest.statusText + '\n\r' + xmlRequest.responseText);
            jQuery('#retResults').hide();
            jQuery('#errResults').show();
        }
        resultEngine.sortingAjaxRequest = jQuery.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'searchContentType':'" + jQuery('.SearchTypeHiddenField').val() + "','searchTerm':'" + encodeURI(resultEngine.searchTerm) + "'}",
            error: sortingAjaxFailed,
            success: sortingSuccessCallback,
            type: "POST",
            url: "/Shared/Search/Services/SearchService.asmx/GetSortingView"
        });
    },
    EventBinding: function (resultsEngine) {
        //Setup sort actions
        jQuery(".sortingTrue").die("click").live("click", function (event) {
            event.stopPropagation();
            jQuery(this).unbind('click');
            if (!resultsEngine.submitting) {
                count = 0;
                if (jQuery(this).parents("div:eq(0)").hasClass('subMenu')) {
                    jQuery(".on").removeClass('on');
                    jQuery(this).parents("div:eq(0)").prev(".hasSubmenu").addClass('on');
                    jQuery(this).addClass('on');
                    jQuery(this).parent().clone().prependTo(jQuery(this).parents("div:eq(0)").find("ul"));
                    jQuery(this).parent().remove();
                    resultsEngine.sortBy = jQuery(this).parent().index();
                    resultsEngine.sortOption = jQuery(this).parent().attr("sortOption");
                }
                else {
                    jQuery(".on").removeClass('on');
                    jQuery(this).addClass('on');
                    resultsEngine.sortBy = jQuery(this).parent().index();
                    resultsEngine.sortOption = jQuery(this).parent().attr("sortOption");
                }
                resultsEngine.pageIndex = 1;
                resultsEngine.clearSearchResults();
                jQuery("div.subMenu").hide();
                resultsEngine.updateFilterValue();
                resultsEngine.getSearchResults(true, function () {
                    resultsEngine.submitting = false;
                    jQuery(".hideOptions").hide();
                    jQuery('#retResults').fadeOut(700);
                    jQuery('#searchingMessage').fadeOut(700);
                });
            }

        });
        jQuery("select#sortingViewDropdown").live("change", function () {
            jQuery('#retResults').show();
            jQuery('#searchingMessage').show();
            var optionSelected = jQuery('#sortingViewDropdown option:selected').attr('sortoption');
            var sortBy = jQuery('#sortingViewDropdown option:selected').attr('value');
            if (!resultsEngine.submitting) {
                count = 0;
                resultsEngine.sortBy = parseInt(sortBy);
                resultsEngine.sortOption = optionSelected;
                resultsEngine.pageIndex = 1;
                jQuery("#srchRsltsGridView").html('');
                resultsEngine.getSearchResults(true);
            }
            jQuery(".hideOptions").hide();
            jQuery('#retResults').fadeOut(700);
            jQuery('#searchingMessage').fadeOut(700);
        });
    }
};


var Pagination = {
    Initialize: function (resultEngine) {
        //Setup the Previous/Next Pager clicks
        jQuery("#PrevPage").die("click").live("click", function () {
            if (!resultEngine.submitting) {
                count = 0;
                resultEngine.pageIndex = parseInt(resultEngine.pageIndex) - 1;
                resultEngine.updateFilterValue();
                resultEngine.getSearchResults(true);

            }
        });

        jQuery("#NextPage").die("click").live("click", function () {
            if (!resultEngine.submitting) {
                count = 0;
                resultEngine.pageIndex = parseInt(resultEngine.pageIndex) + 1;
                resultEngine.updateFilterValue();
                resultEngine.getSearchResults(true);
            }
        });

        jQuery("#NextPages").die("click").live("click", function () {
            if (!resultEngine.submitting) {
                count = 0;
                resultEngine.pageIndex = (Math.ceil(resultEngine.pageIndex / resultEngine.pagesPerPageSet) * resultEngine.pagesPerPageSet) + 1;
                resultEngine.updateFilterValue();
                resultEngine.getSearchResults(true);
            }
        });
        jQuery("#PrevPages").die("click").live("click", function () {
            if (!resultEngine.submitting) {
                count = 0;
                if (resultEngine.pageIndex % resultEngine.pagesPerPageSet == 0) {
                    resultEngine.pageIndex = resultEngine.pageIndex - resultEngine.pagesPerPageSet;
                }
                else {
                    resultEngine.pageIndex = (Math.floor(resultEngine.pageIndex / resultEngine.pagesPerPageSet) * resultEngine.pagesPerPageSet);
                }
                ConsoleLog(resultEngine.pageIndex);
                resultEngine.updateFilterValue();
                resultEngine.getSearchResults(true);
            }
        });

        jQuery("#ResultsPerPage").live("change", function () {
            count = 0;
            resultEngine.maxResults = jQuery(this).val();
            resultEngine.pageIndex = 1;
            resultEngine.updateFilterValue();
            resultEngine.getSearchResults(true);
        });
    },
    PopulatePagination: function (resultEngine, srchResultCountList) {
        // Pagination start
        var filterResultCount = 0;
        if (srchResultCountList != null) {
            jQuery(".SearchTbOptions:first ul").find('li').each(function () {
                var currentSearchType = jQuery('.SearchTypeHiddenField').val();
                if (currentSearchType == ContentTypeEnum.RecipeGridView || currentSearchType == ContentTypeEnum.RecipeListView) {
                    if (jQuery(this).find("input").attr("value") == ContentTypeEnum.RecipeGridView ||
                        jQuery(this).find("input").attr("value") == ContentTypeEnum.RecipeListView) {

                        currentSearchType = jQuery(this).find("input").attr("value");
                    }
                }
                if (currentSearchType == jQuery(this).find("input").attr("value")) {
                    jQuery.each(srchResultCountList, function () {
                        if (jQuery(this).attr("ContentValue") == currentSearchType) {
                            filterResultCount = jQuery(this).attr("Count");
                        }
                    });
                }
            });
        }

        //Update Pager
        var totalPages = Math.ceil(filterResultCount / resultEngine.maxResults);

        if (resultEngine.pageIndex > 1) {
            jQuery("#PrevPage").show();
        }

        if (resultEngine.pageIndex < totalPages) {
            jQuery("#NextPage").show();
        }


        var pageNumbers = new Array();
        var pagesConstant = resultEngine.pagesPerPageSet - 1;
        var pageRangeStart = (Math.floor(resultEngine.pageIndex / resultEngine.pagesPerPageSet) * resultEngine.pagesPerPageSet);
        if (resultEngine.pageIndex % resultEngine.pagesPerPageSet == 0) {
            pageRangeStart = pageRangeStart - pagesConstant;
        }
        else {
            pageRangeStart = pageRangeStart + 1;
        }

        for (i = pageRangeStart; i <= totalPages; i++) {
            var currentPage = ((i == resultEngine.pageIndex) ? true : false);
            pageNumbers[i] = { "PageIndex": i, "IsCurrentPage": currentPage };
            if (i == (pagesConstant + pageRangeStart)) { break; }
        }

        if (totalPages > (pagesConstant + parseInt(resultEngine.pageIndex))) {
            jQuery("#NextPages").show();
        }
        else { jQuery("#NextPages").hide(); }

        if ((resultEngine.pageIndex / resultEngine.pagesPerPageSet) > 1) {
            jQuery("#PrevPages").show();
        }
        else { jQuery("#PrevPages").hide(); }

        jQuery.get('/shared/search/templates/SearchPageNumberTemplate.htm', function (template) {
            jQuery("#PageNumbers").html("");
            jQuery.tmpl(template, pageNumbers).appendTo('#PageNumbers');
        });

        jQuery(".pageIndex").live("click", function () {

            if (parseInt(jQuery(this).attr("pageindex")) != resultEngine.pageIndex) {
                resultEngine.pageIndex = parseInt(jQuery(this).attr("pageindex"));
                resultEngine.clearSearchResults();
                if (jQuery("#srchRslts").html() == "") {
                    count = 0;
                    resultEngine.updateFilterValue();
                    resultEngine.getSearchResults(true);
                }
            }
        });
        var pageSize = getUrlVars()["ps"];
        jQuery("#ResultsPerPage").val(pageSize).attr('selected', true);
        //pagination ends
    }
};
//HARENDER
function GetFacets(searchType, callback) {
    //var searchType = jQuery(searchTabObject).attr("SearchContentType");
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'searchContentType':'" + searchType + "'}",
        error: facetAjaxFailed,
        success: function (facetHtml) {
            facetSuccessCallback(facetHtml);
            if (callback) callback();
        },
        type: "POST",
        url: "/Shared/Search/Services/SearchService.asmx/PopulateFacetControl"
    });
}

function facetSuccessCallback(facetHtml) {
    var newdiv1 = jQuery('<div id="facetViewHtml"/>');
    jQuery('.narrow').append(newdiv1);
    jQuery("#facetViewHtml").html(facetHtml.d).show();
    if (jQuery('.SearchTypeHiddenField').val() != "6") {
        searchFactesFilter.initFacets(allSearchResultListEngine);
    }
}
function facetAjaxFailed(xmlRequest) {
    alert('error');
    alert(xmlRequest.status + ' \n\r ' + xmlRequest.statusText + '\n\r' + xmlRequest.responseText);
}

//Setup Filter window shade open/close
jQuery(".listFilterContainer h3").live("click", function () {
    if (!jQuery(this).hasClass('noExpandCollapse')) {
        if (jQuery(this).hasClass('down')) {
            jQuery(this).removeClass('down');
            jQuery(this).next('.filterWindow').hide();
        }
        else {
            jQuery(this).addClass('down');
            jQuery(this).next('.filterWindow').show();
        }
        jQuery(".hideOptions").hide();
    }
});

//Setup Filter actions
jQuery(".filterListToggle").live("click", function (event) {
    event.stopPropagation();
    // resultsEngine.submitting = true;
    var filterHeader = jQuery(this).parent();
    var nextFilterWindow = jQuery(filterHeader).next('.filterWindow');

    if (this.checked && filterHeader.hasClass('down') == false) {
        filterHeader.addClass('down');
        nextFilterWindow.show();
    }
    nextFilterWindow.find(':checkbox').attr('checked', this.checked);
    count = 0;
    allSearchResultListEngine.updateFilterValue();
    jQuery(".hideOptions").hide();
});

jQuery(".listFilterContainer input:checkbox").live("click", function () {
    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();
    jQuery(this).parents(".filterWindow").prev("h3").find(':checkbox').attr('checked', "");
    count = 0;
    jQuery.address.parameter("pi", "1");
    jQuery(".hideOptions").hide();
    if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.RecipeGridView) {
        resultsGridEngine.pageIndex = 1;
        resultsGridEngine.clearSearchResults();
        resultsGridEngine.updateFilterValue();
        resultsGridEngine.getSearchResults();
    }
    else {
        allSearchResultListEngine.updateFilterValue();
        allSearchResultListEngine.pageIndex = 1;
        function waitForUpdate() {
            allSearchResultListEngine.getSearchResults(false);
        }
        setTimeout(waitForUpdate, 200);
    }
    filterON = true;
});


jQuery(".listFilterContainer select").live("change", function () {
    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();
    count = 0;
    jQuery.address.parameter("pi", "1");
    jQuery(".hideOptions").hide();
    if (jQuery('.SearchTypeHiddenField').val() == ContentTypeEnum.RecipeGridView) {
        resultsGridEngine.pageIndex = 1;
        resultsGridEngine.updateFilterValue();
        resultsGridEngine.submitting = true;
        resultsGridEngine.clearSearchResults();
        resultsGridEngine.getSearchResults();
    }
    else {
        allSearchResultListEngine.updateFilterValue();
        allSearchResultListEngine.getSearchResults(false);
    }
});
jQuery(".menuSrchMenu ul li a.hasSubmenu").live("click", function (event) {
    event.stopPropagation();
    jQuery(".hideOptions").hide();
    if (jQuery(this).hasClass("on")) {
        jQuery(this).next("div.subMenu").toggle();
    }
    else {
        jQuery(this).toggleClass('on');
        jQuery(this).next("div.subMenu").toggle();
    }
});
/*added for badges*/
jQuery(".popTrigger").live("mouseenter", function () {
    alignHoverMesage();
    jQuery(this).parent("a").next('span.badgesDesc').css("display", "block");
});
jQuery(".popTrigger").live("mouseleave", function () {
    jQuery(this).parent("a").next('span.badgesDesc').css("display", "none");
});

function alignHoverMesage() {
    jQuery('span.badgesDesc').filter(function () {
        return jQuery.trim(jQuery(this).text()) === ''
    }).removeClass("badgesDesc");
    jQuery(".badgeListSec li a img").addClass("popTrigger");
    jQuery(".badgeListSec li").each(function () {
        var listWdth = jQuery(this).find("img.popTrigger").width();
        var listHeight = jQuery(this).find("img.popTrigger").height();
        jQuery(this).find("div.holdPanl").css("width", listWdth);
        jQuery(this).find("span.badgesDesc").css("left", ((listWdth / 2) - 37));
        jQuery(this).find("span.badgesDesc").css("bottom", ((listHeight / 2) + 5));
    });
}

jQuery().ready(function ($) {
    $.address.init(function (event) {
        $.address.autoUpdate(false);

        if (!event.parameters || !event.parameters.st) {
            //initial page load, nothing in the querystring fragment yet
            var searchType = getUrlVars()["st"];
            doSearch(searchType);
        }
    }).externalChange(function (event) {
        //browser back button or page refresh
        if (!event.parameters || !event.parameters.st) return false;

        doSearch(event.parameters.st);
    });
});

//do a search using current querystring params and the given searchType
function doSearch(searchType) {
    if (!searchType) return false;

    //if (console && console.log) console.log('Running search');
    count = 0;

    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();

    var oldSearchType = jQuery('.SearchTypeHiddenField').val();
    if (searchType != oldSearchType && (searchType == ContentTypeEnum.RecipeGridView || oldSearchType == ContentTypeEnum.RecipeGridView)) {
        //switching from or to grid-view.  Need to switch out the html from the server...
        var searchUrl = jQuery(".SearchUrlHiddenField").val();
        var ajaxLoadUrl = searchUrl + "?st=" + searchType + "&term=" + getUrlVars()["term"].replace(/ /g, '+') + ' .searchGrid';
        jQuery(".searchGrid").load(ajaxLoadUrl, function () {
            showResults();
        });
    } else {
        //current html is ok, just show the results
        showResults();
    }

    function showResults() {
        jQuery(".hideOptions").hide();

        jQuery('.SearchTypeHiddenField').val(searchType);
        jQuery.address.parameter("st", searchType);
        //jQuery.address.title(jQuery.address.title() + '+');     //just for testing browser history

        var engine;
        if (searchType == ContentTypeEnum.RecipeGridView) {
            engine = resultsGridEngine;
        } else {
            engine = allSearchResultListEngine;
        }
        engine.clearSearchFilters();

        GetFacets(searchType, function () {
            setEngineSearchParams(engine, searchType);
            engine.initializeResults(function () {
                updateSearchMenuUI();

                jQuery.address.update();
                jQuery('#retResults').fadeOut(700);
                jQuery('#searchingMessage').fadeOut(700);
            });
        });
    }

    function setEngineSearchParams(engine, searchType) {
        engine.searchResultType = searchType;
        var urlVars = jQuery.address.parameter;
        if (urlVars["ps"]) {
            engine.maxResults = urlVars["ps"];
        }
        if (urlVars["pi"]) {
            engine.pageIndex = urlVars["pi"];
        } else {
            engine.pageIndex = 1;
        }
        if (urlVars["si"]) {
            engine.sortBy = urlVars["si"];
        } else {
            engine.sortBy = 0;
        }
        if (urlVars["so"]) {
            engine.sortOption = urlVars["so"];
        } else {
            engine.sortOption = "";
        }
        if (urlVars["fv"]) {
            engine.filterValue = urlVars["fv"];
        } else {
            engine.filterValue = "";
        }
    }

    function updateSearchMenuUI() {
        var si = jQuery.address.parameter('si');
        if (si) {
            jQuery('li a.on').removeClass('on');

            var siNum = Number(si);
            if (siNum == -1) {
                jQuery('li a.hasSubmenu').addClass('on');
            } else {
                jQuery.each(jQuery("#menuSrchMenuId li a"), function (idx) {
                    if (idx == siNum) {
                        jQuery(this).addClass('on');
                        jQuery(this).parents("div:eq(0)").prev(".hasSubmenu").addClass('on');
                    }
                });
            }
        }
    }
}
