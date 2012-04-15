(function($) {
    $.tabbedContentData = {};
    $.fn.tabbedContent = function(userSettings) {
        var defaultSettings = {
            'tabContainer': 'ul.tabbed_modules_tabs',
            'tabSelector':  'li a',
            'tabInitial':   1,
            'tabClass':     'active',
            'contentClass': 'show'
        };
        var settings = $.extend(defaultSettings, userSettings);
        return this.each(function(idx) {
            var key = '0123456789abcdef'.random(10);
            $.tabbedContentData[key] = { 'elements': {}, 'previous': null };
            // find the container tab content
            $(this).find(settings.tabContainer+' '+settings.tabSelector).each(function(pos) {
                // create the tab content selector
                var tabSelector = $(this).attr('rel');
                // find the tab content element
                var content = $('#'+tabSelector);
                if (content.size() > 0) {
                    // intial tab comes from one-based array, so format the value to conform to a zero-based array
                    var selectedTab = settings.tabInitial-1;
                    // store the tab elements for faster access
                    $.tabbedContentData[key].elements[tabSelector] = { 'tab': $(this), 'content': content };
                    // remove the active class either way
                    $.tabbedContentData[key].elements[tabSelector].tab.removeClass(settings.tabClass);
                    $.tabbedContentData[key].elements[tabSelector].content.removeClass(settings.contentClass);
                    // display the initial tab
                    if (pos === selectedTab) {
                        $.tabbedContentData[key].elements[tabSelector].tab.addClass(settings.tabClass);
                        $.tabbedContentData[key].elements[tabSelector].content.addClass(settings.contentClass);
                        $.tabbedContentData[key].previous = tabSelector;
                    }
                    // add click event listener to tab
                    $(this).click(function(evt) {
                        var currentTab = $(this).attr('rel');
                        var previousTab = $.tabbedContentData[key].previous;
                        // perform this step only when the previous and current tab are not the same
                        if (currentTab !== previousTab) {
                            // hide the previous tab
                            $.tabbedContentData[key].elements[previousTab].tab.removeClass(settings.tabClass);
                            $.tabbedContentData[key].elements[previousTab].content.removeClass(settings.contentClass);
                            // show the current tab
                            $.tabbedContentData[key].elements[currentTab].tab.addClass(settings.tabClass);
                            $.tabbedContentData[key].elements[currentTab].content.addClass(settings.contentClass);
                            // update the previous tab reference
                            $.tabbedContentData[key].previous = currentTab;
                        }
                        evt.preventDefault();
                    });
                }
            });
        });
    };
})(jQuery);
