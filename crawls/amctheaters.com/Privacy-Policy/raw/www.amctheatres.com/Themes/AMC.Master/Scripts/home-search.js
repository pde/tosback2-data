/*
* Home Page Search Control
* Authors: Brandon Kent
* Created: 2012 APR 4
*
*/

var homePageSearchControl = function () {

    var settings = {
        searchContainerSelector: '.search-container',
        formSelector: '.search-form',
        searchTextBoxSelector: '.search-query',
        searchButtonSelector: '.search-button',
        searchSourceButtonSelector: '.search-source-button',
        searchSourceContainerSelector: '.search-sources'
    };

    var init = function () {

        $(settings.formSelector)
            .submit(handleSearchSubmit);

        $(settings.searchSourceContainerSelector)
            .find('li')
            .bind('click', handleSearchSourceClick);

        $(settings.searchSourceButtonSelector)
            .bind('click', handleSourceContainerToggle);

        $(settings.searchTextBoxSelector)
            .bind('focus', handleSearchTextboxFocus);

    };

    // Event handling
    var handleSearchSubmit = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var searchContainerId = getSearchContainerId(this);

        var query = $('#' + searchContainerId)
                        .find(settings.searchTextBoxSelector)
                        .first()
                        .val();

        if ($('#' + searchContainerId)
            .find('li:first-child')
            .hasClass('source-checked')) {
            redirectInternal(query);
        }
        else {
            redirectToBing(query);
        }

        return false;
    };

    var handleSearchSourceClick = function () {

        var searchContainerId = getSearchContainerId(this);

        $('#' + searchContainerId)
            .find('li')
            .removeClass('source-checked');

        $(this).addClass('source-checked');
    };

    var handleSourceContainerToggle = function () {

        var searchContainerId = getSearchContainerId(this);

        var sourceContainerElement =
            $('#' + searchContainerId)
                .find(settings.searchSourceContainerSelector);

        if ($('#' + searchContainerId)
                .find(settings.searchSourceContainerSelector + ':visible')
                .size() > 0) {
            sourceContainerElement.fadeOut('fast');
        }
        else {
            sourceContainerElement.fadeIn('fast');
        }
    };

    var handleSearchTextboxFocus = function () {

        var searchContainerId = getSearchContainerId(this);

        var sourceContainerElement =
            $('#' + searchContainerId)
                .find(settings.searchSourceContainerSelector);

        if ($('#' + searchContainerId)
                .find(settings.searchSourceContainerSelector + ':visible')
                .size() > 0) {
            sourceContainerElement.fadeOut('fast');
        }
    };

    var getSearchContainerId = function (child) {
        return $(child).parents().find('.search-container').first().attr('id');
    };

    var redirectToBing = function (query) {
        var params = $.param(
			{
			    q: query
			}
		);

        window.location = 'http://www.bing.com/search?' + params;
    };

    var redirectInternal = function (query) {
        var params = $.param(
			{
			    q: query
			}
		);

        window.location = '/search?' + params;
    };



    // Return Public Interface
    return {
        init: init
    };
} ();

jQuery(
    function () {
        homePageSearchControl.init();
    });
