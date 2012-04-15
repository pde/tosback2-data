/*  Basic page tracking using google analytics.

    Meant as a replacement for the legacy omniture tracking system.

    Legacy javascript calls would be of the form omniture.swap_vars_and_ping(vars),
    where vars would be a hash of data to be tracked.

    The most common data being tracked would be page name.

    For more info on google analytics tracking see the following:
    http://code.google.com/apis/analytics/docs/tracking/asyncUsageGuide.html
*/

var googleAnalytics={};

// Fire off a tracking ping to google analytics.
googleAnalytics.trackPageview = function(page) {

    if(page) {
        _gaq.push(['_trackPageview', page]);
    } else {
        _gaq.push(['_trackPageview']);
    }

}

// Retrieve the page name for tracking if availible.
googleAnalytics.getPageName = function(vars) {
    var page_name = '';

    for (var label in vars) {
        if (label.indexOf('pageName') != -1) {
            page_name = vars[label];
            break;
        }
    }

    return page_name
}

// Track a page view using google analytics.
//  * retrieve the page name
//  * fire off a tracking ping
googleAnalytics.do_googleAnalytics = function(vars) {

    pageName = googleAnalytics.getPageName(vars);
    googleAnalytics.trackPageview(pageName);

}    
