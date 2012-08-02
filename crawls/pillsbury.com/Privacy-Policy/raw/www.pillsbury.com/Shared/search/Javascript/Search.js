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
var searchText;
// This function is used to redirect  to searchResult page.
function OnSearchButtonClick(resultURL, searchTextBox, searchResultType, searchButton, waterMarkDefaultValue, processingText,
requiredText, searchResultTypeHiddenFieldID) {
    var term = encodeURI(jQuery.trim(document.getElementById(searchTextBox).value));
    var actualTerm = jQuery.trim(document.getElementById(searchTextBox).value);
    if (jQuery("#" + searchResultTypeHiddenFieldID).val() == "") {

        jQuery("#" + searchResultTypeHiddenFieldID).val(urlParams.st);
    }
    var searchType = jQuery("#" + searchResultTypeHiddenFieldID).val();
    if (term != null) {
        if (actualTerm.length > 0 && actualTerm != waterMarkDefaultValue) {
            ApplyUnicaEventTag('ev=search_BT&sitekeyword=' + term.toLowerCase());

            if (searchType.length <= 0)
                searchType = searchResultType;
            var newUrl = resultURL + "?st=" + searchType + "&term=" + term;
            //            if (urlParams.st > 0 && searchType > 4 && urlParams.st > 4) {
            //                newUrl = resultURL + "?st=" + urlParams.st + "&term=" + term;
            //            }
            //            else {
            //                newUrl = resultURL + "?st=" + searchType + "&term=" + term;
            //            }
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
            //alert(requiredText);
            document.getElementById(searchTextBox).focus();
        }
    }
    else {
        //alert(requiredText);
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
        vars[key] = value;
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

var resultsListEngine = {
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
        jQuery.address.parameter("fv", "");
    },

    getSearchResults: function (scrollTop) {
        //Show/hide loading messages
        jQuery("#srchRslts").addClass("results_muted");
        var top = jQuery(window).height() / 2;
        var left = jQuery(window).width() / 4;
        //jQuery('#searchingMessage').show().position({ my: "center center", at: "center center", of: window });
        jQuery('#searchingMessage').show().css("top", top);
        jQuery('#searchingMessage').show().css("left", left);
        jQuery('#retResults').show();
        jQuery('#searchNoRslts').hide();
        jQuery('#errResults').hide();

        //keep results under max json limit
        if (resultsListEngine.maxResults > resultsListEngine.maxJsonResults) {
            resultsListEngine.maxResults = resultsListEngine.maxJsonResults;
        }

        var scroll = false;
        if (typeof (scrollTop) != "undefined" && scrollTop == true) {
            var scroll = true;
        }

        var successCallback = function (data) {
            try {
                jQuery("#srchRslts").removeClass("results_muted");
                resultsListEngine.clearSearchResults();

                //Setup the jQuery Address
                jQuery.address.parameter("term", resultsListEngine.searchTerm)
                .parameter("nav", resultsListEngine.navigationValue)
                .parameter("fv", resultsListEngine.filterValue)
                .parameter("pi", resultsListEngine.pageIndex)
                .parameter("ps", resultsListEngine.maxResults)
                .parameter("si", resultsListEngine.sortBy);

                var srchResults = data.d;

                if (srchResults.RecipesCount > 0) {
                    jQuery.get('/shared/search/templates/SearchRecipeListViewTemplate.htm', function (template) {
                        jQuery.tmpl(template, srchResults.Results,
                        {
                            dataArrayIndex: function (item) {
                                return jQuery.inArray(item, srchResults.Results);
                            }
                        }
                      ).appendTo('#srchRslts');
                    });

                    var artVidCount = srchResults.ArticlesCount;

                    if (artVidCount > 0) {
                        jQuery("#videoArticleCount").html("(" + artVidCount + ") ");
                        jQuery('#otherTypeCounts').show();
                    }
                    jQuery(".pagenation").show();
                    jQuery('#retResults').fadeOut(700);
                    jQuery('#searchingMessage').fadeOut(700);
                    if (scroll) {
                        resultsListEngine.ScrollTop();
                    }

                    //Update Pager
                    var totalPages = Math.ceil(srchResults.RecipesCount / resultsListEngine.maxResults);

                    if (resultsListEngine.pageIndex > 1) {
                        jQuery("#PrevPage").show();
                    }

                    if (resultsListEngine.pageIndex < totalPages) {
                        jQuery("#NextPage").show();
                    }


                    var pageNumbers = new Array();
                    var pagesConstant = resultsListEngine.pagesPerPageSet - 1;
                    var pageRangeStart = (Math.floor(resultsListEngine.pageIndex / resultsListEngine.pagesPerPageSet) * resultsListEngine.pagesPerPageSet);
                    if (resultsListEngine.pageIndex % resultsListEngine.pagesPerPageSet == 0) {
                        pageRangeStart = pageRangeStart - pagesConstant;
                    }
                    else {
                        pageRangeStart = pageRangeStart + 1;
                    }

                    for (i = pageRangeStart; i <= totalPages; i++) {
                        var currentPage = ((i == resultsListEngine.pageIndex) ? true : false);
                        pageNumbers[i] = { "PageIndex": i, "IsCurrentPage": currentPage };
                        if (i == (pagesConstant + pageRangeStart)) { break; }
                    }

                    if (totalPages > (pagesConstant + resultsListEngine.pageIndex)) {
                        jQuery("#NextPages").show();
                    }
                    else { jQuery("#NextPages").hide(); }

                    if ((resultsListEngine.pageIndex / resultsListEngine.pagesPerPageSet) > 1) {
                        jQuery("#PrevPages").show();
                    }
                    else { jQuery("#PrevPages").hide(); }

                    jQuery.get('/shared/search/templates/SearchPageNumberTemplate.htm', function (template) {
                        jQuery("#PageNumbers").html("");
                        jQuery.tmpl(template, pageNumbers).appendTo('#PageNumbers');
                    });

                    jQuery(".pageIndex").live("click", function () {
                        if (parseInt(jQuery(this).attr("pageindex")) != resultsListEngine.pageIndex) {
                            resultsListEngine.pageIndex = parseInt(jQuery(this).attr("pageindex"));
                            resultsListEngine.clearSearchResults();
                            if (jQuery("#srchRslts").html() == "") {
                                resultsListEngine.getSearchResults(true);
                            }
                        }
                    });

                }
                else {
                    jQuery('#retResults').hide();
                    jQuery('#searchingMessage').hide();
                    if (scroll) {
                        resultsListEngine.ScrollTop();
                    }

                    //No results 
                    if (resultsListEngine.pageIndex == 1) {
                        jQuery('#noResultsTerm').text(decodeURIComponent(resultsListEngine.searchTerm));
                        jQuery('#searchNoRslts').show();
                        jQuery("#SortingViewRslt").hide();
                        jQuery("#narrowSrchRsltBtn").hide();
                        jQuery("#listViewLink").hide();
                        jQuery(".pagination").hide();
                    }
                }

                resultsListEngine.submitting = false;
            }
            catch (err) {
                resultsListEngine.submitting = false;
                ConsoleLog(err);
                jQuery('#retResults').hide();
                jQuery('#errResults').show();
            }
        };

        function ajaxFailed(xmlRequest) {
            resultsListEngine.submitting = false;
            ConsoleLog(xmlRequest.status + ' \n\r ' + xmlRequest.statusText + '\n\r' + xmlRequest.responseText);
            jQuery('#retResults').hide();
            jQuery('#errResults').show();
        }

        var parametersAsJSONObject = {
            searchTerm: resultsListEngine.searchTerm,
            //searchType: 2,
            searchType: 7,
            pageIndex: resultsListEngine.pageIndex,
            pageSize: resultsListEngine.maxResults,
            sortIndex: resultsListEngine.sortBy,
            sortingViewItemPath: jQuery('.SortingViewItemConfigKeyNameHiddenField').val(),
            filterValue: resultsListEngine.filterValue,
            navValues: jQuery.trim(resultsListEngine.navigationValue.replace(/\+/g, ' '))
        };

        resultsListEngine.ajaxRequest = jQuery.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(parametersAsJSONObject),
            error: ajaxFailed,
            async: false,
            success: successCallback,
            type: "POST",
            url: "/Shared/Search/Services/SearchService.asmx/GetSearchResults"
        });

    },

    initializeResultsListEngine: function () {

        jQuery(".pagenation").hide();

        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            jQuery('#searchTermTb').val(urlParams.term);
            resultsListEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }

        if (getUrlVars()["ps"] != null && getUrlVars()["ps"].length > 0) {
            resultsListEngine.maxResults = getUrlVars()["ps"];
        }
        if (getUrlVars()["pi"] != null && getUrlVars()["pi"].length > 0) {
            resultsListEngine.pageIndex = getUrlVars()["pi"];
        }
        if (getUrlVars()["si"] != null && getUrlVars()["si"].length > 0) {
            resultsListEngine.sortBy = getUrlVars()["si"];
        }
        if (getUrlVars()["st"] != null && getUrlVars()["st"].length > 0) {
            resultsListEngine.searchResultType = getUrlVars()["st"];
        }
        if (getUrlVars()["fv"] != null && getUrlVars()["fv"].length > 0) {
            resultsListEngine.filterValue = getUrlVars()["fv"];
        }
        resultsListEngine.formsubmit = true;
        resultsListEngine.maxResults = jQuery('.PageSizeHiddenField').val();
        resultsListEngine.pagesPerPageSet = jQuery('.PagesPerPageSetHiddenField').val();


        searchFactesFilter.initFacets(resultsListEngine);
        resultsListEngine.updateFilterUI();
        applySortingEvents(resultsListEngine, false);

        //Setup result/error message links
        jQuery('#retrySearchLink').die("click").live("click", function () {
            if (!resultsListEngine.submitting) {
                resultsListEngine.submitting = true;
                resultsListEngine.getSearchResults();
            }
        });

        jQuery('#cancelSearchLink').die("click").live("click", function () {
            if (resultsListEngine.ajaxRequest != null) {
                resultsListEngine.submitting = false;
                resultsListEngine.ajaxRequest.abort();
                jQuery("#srchRslts").removeClass("results_muted");
                jQuery('#retResults').hide();
                jQuery('#searchingMessage').hide();
            }
        });

        //Harender commented
        // jQuery("#galleryLink a, #otherTypeCounts a").click(function (e) {
        // if (!resultsListEngine.submitting) {
        // var term = jQuery.trim(jQuery('#searchTermTb').val());
        // var searchUrl = jQuery(this).attr('href');
        // searchUrl = searchUrl.replace('{0}', term);
        // jQuery(this).attr('href', searchUrl);
        // if (jQuery(this).parent().attr('id') == 'galleryLink') {
        // setCookie('searchresulttype', 3);
        // }
        // }
        // });

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

        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        //Setup the Previous/Next Pager clicks
        jQuery("#PrevPage").click(function () {
            if (!resultsListEngine.submitting) {
                resultsListEngine.submitting = true;
                resultsListEngine.pageIndex = resultsListEngine.pageIndex - 1;
                resultsListEngine.getSearchResults(true);

            }
        });

        jQuery("#NextPage").click(function () {
            if (!resultsListEngine.submitting) {
                resultsListEngine.submitting = true;
                resultsListEngine.pageIndex = parseInt(resultsListEngine.pageIndex) + 1;
                resultsListEngine.getSearchResults(true);
            }
        });


        jQuery("#ResultsPerPage").change(function () {
            resultsListEngine.maxResults = jQuery(this).val();
            resultsListEngine.pageIndex = 1;
            resultsListEngine.getSearchResults(true);
        });


    },

    updateFilterUI: function () {

        resultsListEngine.filterValue = decodeURIComponent(resultsListEngine.filterValue);

        searchFactesFilter.updateFacetFilterUI(resultsListEngine.filterValue);

        resultsListEngine.getSearchResults(false);
    },

    updateFilterValue: function () {
        resultsListEngine.filterValue = searchFactesFilter.getFacetFilterValues();

        resultsListEngine.filterValue = decodeURIComponent(resultsListEngine.filterValue);

        resultsListEngine.pageIndex = 1;
        allSearchResultListEngine.initializeResultsListEngine();
    },

    updateSortUI: function () {
        updateSortingUI(resultsListEngine);
    },

    ScrollTop: function () { window.scrollTo(0, 0); }
};

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

    getSearchResults: function () {

        var pageIndex = resultsGridEngine.pageIndex;
        var maxResults = resultsGridEngine.maxResults;

        //Show/hide loading messages
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
            jQuery('#retResultsMessage').show();
        }
        else {
            jQuery('#retResultsMessage').show();
        }

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
				.parameter("fv", resultsGridEngine.filterValue);

                //commented to remove fv at url so that count cna come poperly 
                //

                var srchResults = data.d;

                if (srchResults.AllResultsCount > 0) {

                    if (getContentTypeCount(srchResults, ContentTypeEnum.RecipeListView) > 0 || getContentTypeCount(srchResults, ContentTypeEnum.RecipeGridView) > 0) {
                        jQuery.get('/shared/search/templates/SearchRecipeGalleryViewTemplate.htm', function (template) {
                            jQuery.tmpl(template, srchResults.Results,
                        {
                            dataArrayIndex: function (item) {
                                return jQuery.inArray(item, srchResults.Results);
                            }
                        }
                      ).appendTo('#srchRsltsGridView');
                        });
                    }
                    else {
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
                            //jQuery("#narrowSrchRsltBtn").hide();
                            //jQuery("#listViewLink").hide();
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


                }
                else {
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
            //searchType: 3,
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
            success: successCallback,
            type: "POST",
            url: "/Shared/Search/Services/SearchService.asmx/GetSearchResults"
        });
    },

    initializeResultsGridEngine: function () {

        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            jQuery('#searchTermTb').val(urlParams.term);
            resultsGridEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }

        if (urlParams.ps != null && urlParams.ps.length > 0) {
            resultsGridEngine.maxResults = urlParams.ps;
        }

        if (urlParams.pi != null && urlParams.pi.length > 0) {
            resultsGridEngine.pageIndex = urlParams.pi;
        }

        if (urlParams.si != null && urlParams.si.length > 0) {
            resultsGridEngine.sortBy = urlParams.si;
        }

        if (urlParams.st != null && urlParams.st.length > 0) {
            resultsGridEngine.searchType = 6; //urlParams.st;

        }

        resultsGridEngine.maxResults = jQuery('.PageSizeHiddenField').val();
        resultsGridEngine.pagesPerPageSet = jQuery('.PagesPerPageSetHiddenField').val();

        SortingView.Initialize(resultsGridEngine);
        searchFactesFilter.initFacets(resultsGridEngine);
        applySortingEvents(resultsGridEngine, true);
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
        /*
        jQuery.address.parameter("pi", "1");
        if(jQuery('.SearchTypeHiddenField').val() == "6"){
        resultsGridEngine.pageIndex = 1;
        resultsGridEngine.updateFilterValue();
        resultsGridEngine.submitting = true;
        resultsGridEngine.clearSearchResults();
        resultsGridEngine.getSearchResults();
        //Setup mouse events on result images
        jQuery(".recpImg").live({
        mouseenter:
        function () {
        jQuery(this).nextAll('.rcpiDetails').show();
        },
        mouseleave:
        function () {
        jQuery(this).nextAll('.rcpiDetails').hide();
        }
        }
        );

        jQuery(".rcpiDetails").live({
        mouseenter:
        function () {
        jQuery(this).show();
        },
        mouseleave:
        function () {
        jQuery(this).hide();
        }
        }
        );*/

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
            resultsGridEngine.getSearchResults();
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

        //        resultsGridEngine.submitting = true;
        //        resultsGridEngine.clearSearchResults();
        //        resultsGridEngine.getSearchResults();
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


    /*  searchResultType: null,
    navValues: null,
    submitting: null,*/

    clearSearchFilters: function () {
        jQuery(".listFilterContainer input:checkbox").attr("checked", false);
        jQuery("#prepSlider, #totalSlider").slider("option", "value", 7);
        jQuery.address.parameter("fv", "");
        jQuery.address.parameter("term", "");
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

    getSearchResults: function (scrollTop) {
        if (count < 1) {
            count++
            //Show/hide loading messages
            jQuery("#srchRslts").addClass("results_muted");
            var top = jQuery(window).height() / 2;
            var left = jQuery(window).width() / 4;
            //jQuery('#searchingMessage').show().position({ my: "center center", at: "center center", of: window });
            jQuery('#searchingMessage').show().css("top", top);
            jQuery('#searchingMessage').show().css("left", left);
            jQuery('#retResults').show();
            jQuery('#searchNoRslts').hide();
            jQuery('#errResults').hide();

            //keep results under max json limit
            if (allSearchResultListEngine.maxResults > allSearchResultListEngine.maxJsonResults) {
                allSearchResultListEngine.maxResults = allSearchResultListEngine.maxJsonResults;
            }
            var scroll = false;
            if (typeof (scrollTop) != "undefined" && scrollTop == true) {
                var scroll = true;
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
                .parameter("si", allSearchResultListEngine.sortBy);

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
                            resultsGridEngine.initializeResultsGridEngine();
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
                        if (scroll) {
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
                if (scroll) {
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
                async: false,
                success: successCallback,
                type: "POST",
                url: "/Shared/Search/Services/SearchService.asmx/GetSearchResults"
            });
        }
    },

    initializeResultsListEngine: function () {


        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            jQuery('#searchTermTb').val(urlParams.term);
            allSearchResultListEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }
        if (jQuery('.SearchTypeHiddenField').val() == getUrlVars()["st"]) {
            jQuery.address.parameter("fv", "");
        }
        if (getUrlVars()["ps"] != null && getUrlVars()["ps"].length > 0) {
            allSearchResultListEngine.maxResults = getUrlVars()["ps"];
        }
        if (getUrlVars()["pi"] != null && getUrlVars()["pi"].length > 0) {
            allSearchResultListEngine.pageIndex = getUrlVars()["pi"];
        }
        if (getUrlVars()["si"] != null && getUrlVars()["si"].length > 0) {
            allSearchResultListEngine.sortBy = getUrlVars()["si"];
        }
        if (getUrlVars()["st"] != null && getUrlVars()["st"].length > 0) {
            allSearchResultListEngine.searchResultType = getUrlVars()["st"];
        }
        if (getUrlVars()["fv"] != null && getUrlVars()["fv"].length > 0) {
            allSearchResultListEngine.filterValue = getUrlVars()["fv"];
        }

        allSearchResultListEngine.formsubmit = true;
        allSearchResultListEngine.maxResults = jQuery('.PageSizeHiddenField').val();
        allSearchResultListEngine.pagesPerPageSet = jQuery('.PagesPerPageSetHiddenField').val();


        SortingView.Initialize(allSearchResultListEngine);
        searchFactesFilter.initFacets(allSearchResultListEngine);
        allSearchResultListEngine.updateFilterUI();
        allSearchResultListEngine.getSearchResults(false);
        applySortingEvents(allSearchResultListEngine, false);
        if (jQuery('.SearchTypeHiddenField').val() != ContentTypeEnum.RecipeGridView) {
            SortingView.EventBinding(allSearchResultListEngine);
        }
        Pagination.Initialize(allSearchResultListEngine);
        //Setup result/error message links
        jQuery('#retrySearchLink').click(function () {
            if (!allSearchResultListEngine.submitting) {
                allSearchResultListEngine.submitting = true;
                allSearchResultListEngine.getSearchResults();
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

        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }



    },

    updateFilterUI: function () {

        allSearchResultListEngine.filterValue = decodeURIComponent(allSearchResultListEngine.filterValue);

        searchFactesFilter.updateFacetFilterUI(allSearchResultListEngine.filterValue);
    },

    updateFilterValue: function () {
        allSearchResultListEngine.filterValue = searchFactesFilter.getFacetFilterValues();
        allSearchResultListEngine.filterValue = decodeURIComponent(allSearchResultListEngine.filterValue);
    },

    updateSortUI: function () {
        updateSortingUI(allSearchResultListEngine);
    },

    ScrollTop: function () { window.scrollTo(0, 0); }
};
/* END  - SEARCH RESULT  - ALL RESULT VIEW - HARENDER*/


/* COMMON SEARCH RESULT FUNCTIONS */
function applySortingEvents(resultsEngine, clearResults) {
    // jQuery('.menuSrchMenu ul li').each(function (index) {
    // if (jQuery("#MORESort").parent().index() < index) {
    // jQuery('#menuSrchMenuId u').remove(jQuery(this));
    // jQuery('.menuMore ul').append(jQuery(this));
    // }
    // });

}

function updateSortingUI(resultsEngine) {
    //    jQuery(".menuSrchMenu li a, .menuMore li a").removeClass('on');
    //    if (resultsEngine.sortBy > 0) {
    //        var si = resultsEngine.sortBy - 1;
    //        jQuery(".INDEX_" + si).addClass('on');
    //        if (jQuery("#MORESort").parent().index() < resultsEngine.sortBy) {
    //            jQuery("#MORESort").addClass('on');
    //            jQuery(".INDEX_" + si).parent().remove().insertBefore('#moreSortMenu ul li:first');
    //        }
    //   }
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
        ApplyUnicaEventTag('ev=search_BT&sitekeyword=' + jQuery("[id$=KeywordsTextBox]").val().toLowerCase());
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

/* START - FULL SEARCH RESULTS */

var fullResultsEngine = {
    searchTerm: null,
    maxResults: null,
    pageIndex: 1,
    sortBy: 0,
    searchResultType: null,
    filterValue: null,
    navValues: null,
    submitting: null,

    initializeEngine: function () {

        //Read in querystring parameters
        if (urlParams.term != null && urlParams.term.length > 0) {
            fullResultsEngine.searchTerm = urlParams.term.replace(/\'/g, '');
        }

        if (urlParams.ps != null && urlParams.ps.length > 0) {
            fullResultsEngine.maxResults = urlParams.ps;
        }

        if (urlParams.pi != null && urlParams.pi.length > 0) {
            fullResultsEngine.pageIndex = urlParams.pi;
        }

        if (urlParams.si != null && urlParams.si.length > 0) {
            fullResultsEngine.sortBy = urlParams.si;
        }

        if (urlParams.st != null && urlParams.st.length > 0) {
            fullResultsEngine.searchResultType = urlParams.st;
        }

        if (urlParams.fv != null && urlParams.fv.length > 0) {
            fullResultsEngine.filterValue = urlParams.fv;
        }

        searchFactesFilter.initFacets(fullResultsEngine);

        searchFactesFilter.updateFacetFilterUI(fullResultsEngine.filterValue);

        //Setup recipe detail links
        jQuery('.recipeLink').live('click', function () {
            var urlParams = decodeURI(window.location.search.substring(1));
            var recipeUrl = jQuery(this).attr('href');
            recipeUrl += "#?";
            if (urlParams == false | urlParams == '') {
                jQuery(this).attr('href', recipeUrl);
                return;
            }

            recipeUrl += urlParams;
            jQuery(this).attr('href', recipeUrl);
        });

        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

    },

    updateFilterValue: function () {
        fullResultsEngine.filterValue = searchFactesFilter.getFacetFilterValues();

        var redUrl = window.location.toString().split("?")[0] + "?";
        redUrl += "st=" + fullResultsEngine.searchResultType;
        redUrl += "&term=" + fullResultsEngine.searchTerm;

        if (fullResultsEngine.pageIndex > 0) {
            redUrl += "&pi=" + fullResultsEngine.pageIndex;
        }
        if (fullResultsEngine.maxResults > 0) {
            redUrl += "&ps=" + fullResultsEngine.maxResults;
        }
        if (fullResultsEngine.sortBy > 0) {
            redUrl += "&si=" + fullResultsEngine.sortBy;
        }
        if (fullResultsEngine.filterValue.length > 0) {
            redUrl += "&fv=" + jQuery.trim(fullResultsEngine.filterValue);
        }

        window.location.href = redUrl;
    }



};
/* END - FULL SEARCH RESULTS */

/* START - FACETS */

var searchFactesFilter = {
    prepTimeFilters: "",
    totalTimeFilters: "",
    prepTimeFilterOperter: "",
    totalTimeFilterOperter: "",

    updateFacetFilterUI: function (selectedFilters) {
        if (selectedFilters != null && selectedFilters.length > 0) {
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


        jQuery.address.externalChange(function (event) {

            if (!allSearchResultListEngine.formsubmit) {
                if (event.parameterNames.length > 0) {
                    if (event.parameters.term != undefined) {
                        var term = decodeURIComponent(event.parameters.term);
                        term = term.replace(/\+/g, " ");
                        jQuery('#searchTermTb').val(term);
                        allSearchResultListEngine.searchTerm = term.replace(/\'/g, '');
                    }
                    if (event.parameters.nav != undefined) {
                        allSearchResultListEngine.navigationValue = event.parameters.nav;
                    }
                    if (event.parameters.fv != undefined) {

                        allSearchResultListEngine.filterValue = ''; // event.parameters.fv;
                        allSearchResultListEngine.updateFilterUI();
                    }
                    if (event.parameters.pi != undefined) {
                        allSearchResultListEngine.pageIndex = event.parameters.pi;


                    }
                    if (event.parameters.mr != undefined) {
                        allSearchResultListEngine.maxResults = event.parameters.mr;
                    }
                    if (event.parameters.sb != undefined) {

                        allSearchResultListEngine.sortBy = event.parameters.sb;
                        allSearchResultListEngine.updateSortUI();
                    }
                }
            }
            allSearchResultListEngine.formsubmit = false;

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
//HARENDER
jQuery("#SearchResultCountSection li a.tabUnselectedLink").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    count = 0;
    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();
    tabContentType = jQuery(this).attr('SearchContentType');
    if (!allSearchResultListEngine.submitting) {
        allSearchResultListEngine.submitting = true;
        allSearchResultListEngine.clearSearchFilters();
        jQuery(".tabSelected").removeClass("tabSelected").addClass("tabUnselected");
        jQuery(this).find(".tabUnselected").addClass("tabSelected").removeClass("tabUnselected");
        jQuery('.SearchTypeHiddenField').val(jQuery(this).attr('SearchContentType'));
        // var searchUrl = window.location.href + ' .searchGrid';
        var searchUrl = jQuery(".SearchUrlHiddenField").val();
        var ContentType = jQuery(this).attr("SearchContentType");
        var RecipeGridUrlNew = searchUrl + "?st=" + ContentType + "&term=" + getUrlVars()["term"] + ' .searchGrid';
        jQuery(".searchGrid").load(RecipeGridUrlNew, function () {
            jQuery(this).find(".classTab").remove();
            jQuery(".hideOptions").hide();
            getOtherSrchfunction();
        });
        function getOtherSrchfunction() {
            if (count == 0) {
                jQuery('.SearchTypeHiddenField').val(ContentType);
                jQuery.address.parameter("pi", "1");
                jQuery.address.parameter("fv", "");
                allSearchResultListEngine.pageIndex = 1;
                filterON = false;
                allSearchResultListEngine.initializeResultsListEngine();
                GetFacets(tabContentType);
                count = 1;
            }
            jQuery('#retResults').fadeOut(1000);
            jQuery('#searchingMessage').fadeOut(1000);
        };
    }
    //}
});
jQuery(".viewaslist a").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    count = 0;
    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();
    if (!allSearchResultListEngine.submitting) {
        allSearchResultListEngine.submitting = true;
        jQuery('.SearchTypeHiddenField').val(jQuery(this).attr('SearchContentType'));
        var searchUrl = jQuery(".SearchUrlHiddenField").val();
        RecipeGridUrlLstview = searchUrl + "?st=7" + "&term=" + getUrlVars()["term"] + ' .searchGrid';
        jQuery(".searchGrid").load(RecipeGridUrlLstview, function () {
            jQuery(".hideOptions").hide();
            callsearchAndFacets();
        });
        function callsearchAndFacets() {
            var serchType = jQuery('.SearchTypeHiddenField').val('7');
            jQuery.address.parameter("fv", "");
            jQuery.address.parameter("pi", "1");
            if (count == 0) {
                allSearchResultListEngine.initializeResultsListEngine();
            }
            GetFacets('7');
        }
        jQuery('#retResults').fadeOut(700);
        jQuery('#searchingMessage').fadeOut(700);
    }
});
jQuery("#galleryLink a").die("click").live("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    count = 0;
    jQuery('#retResults').show();
    jQuery('#searchingMessage').show();
    var searchUrl = jQuery(".SearchUrlHiddenField").val();
    var RecipeGridUrl = searchUrl + "?st=6" + "&term=" + getUrlVars()["term"] + ' .searchGrid';
    jQuery(".searchGrid").load(RecipeGridUrl, function () {
        jQuery(".hideOptions").hide();
        jQuery.address.parameter("fv", "");
        callotherFunctions();
    });

    function callotherFunctions() {
        jQuery('.SearchTypeHiddenField').val('6');
        if (count == 0) {
            resultsGridEngine.clearSearchFilters();
            jQuery.address.parameter("fv", "");
            resultsGridEngine.updateFilterValue();
            resultsGridEngine.initializeResultsGridEngine();
        }
        jQuery('#retResults').fadeOut(700);
        jQuery('#searchingMessage').fadeOut(700);
    }
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
                resultsEngine.getSearchResults(true);
                resultsEngine.submitting = false;
                jQuery(".hideOptions").hide();
                jQuery('#retResults').fadeOut(700);
                jQuery('#searchingMessage').fadeOut(700);
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

        //changed to use bind instead of live because it was not working in IE - Griff
        //jQuery("#ResultsPerPage").live("change", function () {
        jQuery("#ResultsPerPage").bind("change", function () {
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
function GetFacets(searchType) {
    //var searchType = jQuery(searchTabObject).attr("SearchContentType");
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{'searchContentType':'" + searchType + "'}",
        error: facetAjaxFailed,
        success: facetSuccessCallback,
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
        resultsListEngine.pageIndex = 1;
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

/*jQuery(".popTrigger").removeClass("popTrigger").addClass("hero_badge");*/

jQuery(".popTrigger").live("mouseenter", function () {
    alignHoverMesage();
    jQuery(this).parent("a").next('span.badgesDesc').css("display", "block");
});
jQuery(".popTrigger").live("mouseleave", function () {
    jQuery(this).parent("a").next('span.badgesDesc').css("display", "none");
});

jQuery("span.badgesDesc").live("mouseenter", function () {
    alignHoverMesage();
    jQuery(this).css("display", "block");
});
jQuery("span.badgesDesc").live("mouseleave", function () {
    jQuery(this).css("display", "none");
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

