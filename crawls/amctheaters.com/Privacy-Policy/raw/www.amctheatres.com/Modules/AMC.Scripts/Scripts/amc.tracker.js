/*
* AMC GA Tracker 
* Author: Adam Anderson 
* Created: 4/25/2012
*/

//#region Available Events
/***** Document Events *****
*** Locator ***
searchStarted.Locator: label, query
searchSuccess.Locator: label, query, matches
searchError.Locator label, query, message, details
searchCompleted.Locator label, query, success, duration

*** LocationSearchBox ***
searchStarting.LocationSearchBox: label, query
searchSuccess.LocationSearchBox: label, query, matches, preliminary
searchError.LocationSearchBox: label, query, message, details: details
autocompleteSearchStarting.LocationSearchBox: label, query
autocompleteSearchSuccess.LocationSearchBox: label, query, matches

*** TheatresLocationSearchWidget ***
stateSearch.TheatresLocationSearchWidget
geoSearch.TheatresLocationSearchWidget
stateSearchError.TheatresLocationSearchWidget
geoSearchError.TheatresLocationSearchWidget
showInfoBoxClick.TheatresLocationSearchWidget
pinClick.TheatresLocationSearchWidget
directionsClick.TheatresLocationSearchWidget
showtimesClick.TheatresLocationSearchWidget

*** ShowtimesWidget, MovieShowtimesWidget, MobileShowtimesWidget ***
savedSearchRestore
savedSearchTheatreRestore
favoriteTheatreRestore
prepopulatePostalCodeRestore
stateSearch
geoSearch
gpsSearch
stateSearchError
geoSearchError
gpsSearchError
showtimesLoaded
showtimesLoadingError

*** TheatreShowtimesWidget ***
showtimesLoaded
showtimesLoadingError

*** MovieShowtimesWidget, TheatreShowtimesWidget ***
printShowtimesClick

***** Element Events *****
*** .showtimes-link.click ***
data-irn: Movie.IRN
title: Movie.Title
href: Showtime.PurchaseURL
data-showtimedate: ShowtimeDate
data-attributes :Movie.AttributesString
text: Showtime.DisplayShowTime

*** .theatre-link.click ***
href: Theatre.WebsiteUrl
data-unitnumber: Theatre.UnitNumber
text: Theatre.TheatreName

*** .movie-link.click ***
href: Movie.WebsiteURL
data-unitnumber: UnitNumber
data-showtimedate: ShowtimeDate
text: Movie.Title
*/
//#endregion

var AmcTracker = function(options) {
    this.initialize($.extend({
        documentEvents: [],
        elementEvents:[],
        elementAttributes: []
    }, options));
};

AmcTracker.prototype = function () {

    //#region Declarations
    var _self;
    var options = {
        debug: false
    };
    var defaults = {
        documentEvents: [
            'searchCompleted.Locator',
            'searchStarting.LocationSearchBox',
            'searchSuccess.LocationSearchBox',
            'searchError.LocationSearchBox',
            'autocompleteSearchStarting.LocationSearchBox',
            'autocompleteSearchSuccess.LocationSearchBox',
            'showInfoBoxClick.TheatresLocationSearchWidget',
            'pinClick.TheatresLocationSearchWidget',
            'directionsClick.TheatresLocationSearchWidget',
            'showtimesClick.TheatresLocationSearchWidget',
            'stateSearch.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatresLocationSearchWidget',
            'geoSearch.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatresLocationSearchWidget',
            'stateSearchError.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatresLocationSearchWidget',
            'geoSearchError.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatresLocationSearchWidget',
            'savedSearchRestore.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'savedSearchTheatreRestore.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'favoriteTheatreRestore.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'prepopulatePostalCodeRestore.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'gpsSearch.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'gpsSearchError.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget',
            'showtimesLoaded.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatreShowtimesWidget',
            'showtimesLoadingError.ShowtimesWidget.MovieShowtimesWidget.MobileShowtimesWidget.TheatreShowtimesWidget',
            'printShowtimesClick.MovieShowtimesWidget.TheatreShowtimesWidget'
        ],
        elementEvents: [
            { selector: '.showtimes-link', eventName: 'click' },
            { selector: '.theatre-link', eventName: 'click' },
            { selector: '.movie-link', eventName: 'click' }
        ],
        elementAttributes: [
            'data-irn',
            'data-showtimedate',
            'data-attributes',
            'data-unitnumber',
            'href'
        ]
    };
    //#endregion

    //#region Public Methods
    var initialize = function (o) {
        options = $.extend(options, o);

        _self = this;
        $.each(defaults.documentEvents, function (i, eventName) {
            addDocumentEvent(eventName);
        });
        $.each(defaults.elementEvents, function (i, evt) {
            addElementEvent(evt);
        });
        $.each(defaults.elementAttributes, function (i, attrName) {
            addElementAttribute(attrName);
        });

    };

    var addDocumentEvent = function (eventName) {
        if ($.inArray(eventName, options.documentEvents) == -1) {
            options.documentEvents.push(eventName);
            $(document).on(eventName, handleDocumentEvent);
        }
        return _self;
    };

    var addElementEvent = function (evt) {
        if (evt && evt.selector && evt.eventName && $.inArray(evt, options.elementEvents) == -1) {
            options.elementEvents.push(evt);
            $(document).on(evt.eventName, evt.selector, evt, handleElementEvent);
        }
        return _self;
    };

    var addElementAttribute = function (attrName) {
        if ($.inArray(attrName, options.elementAttributes) == -1) {
            options.elementAttributes.push(attrName);
        }
        return _self;
    };

    var getElementEventLabel = function (el) {
        var label = el.attr('title');

        if (!label)
            label = el.text() || '';

        if (label)
            label += ": ";

        var lblParts = [];
        $.each(options.elementAttributes, function (i, attrName) {
            var attrVal = el.attr(attrName);
            if (typeof attrVal != 'undefined')
                lblParts.push(attrName.replace('data-', '').replace('-', ' ') + ": " + attrVal);
        });

        lblParts.push("page: " + window.location.href);

        label += lblParts.join(', ');

        return label;
    };

    var trackEvent = function (category, action, label, value) {
        var g = ['_trackEvent', category, action, label];
        if (value)
            g.push(value);
        _gaq.push(g);

        if (options.debug)
            log("GA Push Event: category:'" + category + "', action:'" + action + "', label:'" + label + (value ? "', value:'" + value + "'" : "'"));

        return _self;
    };

    var trackTiming = function (category, action, label, duration) {


        //Make sure the duration is a valid value (greater than 0 and less than an hour)
        if (0 < duration && duration < (1000 * 60 * 60)) {
            var g = ['_trackTiming', category, action, duration, label];

            //if we are in debug mode, track 100% of visits.
            if (options.debug)
                g.push(100);

            _gaq.push(g);

            if (options.debug)
                log("GA Push Timing: category:'" + category + "', action:'" + action + "', duration:'" + duration + "', label:'" + label + "'");

            trackEvent(category, action, label, duration);
        } else if (options.debug) {
            trackEvent(category, action, label + ', duration: invalid');
            log("GA Push Timing: skipping timing push. Invalid duration :" + duration);
        }

        return _self;
    };

    var trackLink = function (target, url) {
        _gaq.push(
            function () {
                var tracker = _gaq._getAsyncTracker();  // Gets the default tracker
                var linkerUrl = tracker._getLinkerUrl(url);  // Builds new URL with GATC cookie info appended as query string params

                if (options.debug) {
                    log("GA Push Link: '" + url + "'");
                    log("GA Linker URL: " + linkerUrl);
                }

                //Update the url
                target.attr('href', linkerUrl);
            });

        return _self;
    };

    var handleDocumentEvent = function (event, data) {

        var category = event.namespace,
            action = event.type,
            label = data.label + ", page:" + window.location.href,
            value = data.value;

        if (data.duration)
            trackTiming(category, action, label, data.duration);
        else
            trackEvent(category, action, label, value);
    };

    var handleElementEvent = function (event) {
        var d = event.data,
            t = $(event.target),
            lblFn = getElementEventLabel,
            valueFn = function (el) { };

        if (d.eventLabelFn && $.isFunction(d.eventLabelFn))
            lblFn = d.eventLabelFn;

        if (d.eventValueFn && $.isFunction(d.eventValueFn))
            valueFn = d.eventValueFn;

        var category = d.selector.replace('.', '').replace('-', ' '),
            action = event.type,
            label = lblFn(t),
            value = valueFn(t);
        try {

            trackEvent(category, action, label, value);

            if (t.is('a') && (action || '').toLowerCase() == 'click' && (t.attr('href') || '').toLowerCase().indexOf('javascript:') == -1) {

                var url = t.attr('href');

                // Cross-domain link tracking when 'data-tracklink' attribute is true
                // BCK 2012 JUL 19
                if ((t.attr('data-tracklink') || 'false') == 'true') {
                    trackLink(t, url);
                    return;
                }

                // This to prevent the page moving on before the event can be tracked.
                if ((t.attr('target') || '_self').toLowerCase() == '_self') {
                    event.preventDefault();
                    setTimeout(function () {
                        if (options.debug)
                            alert('DEBUG ALERT: Pausing for station identification, and verification of GA event firing.');
                        document.location = url;
                    }, 100);
                }
            }
        } catch (err) { }
    };

    var log = function (msg) {
        if (msg && typeof window['console'] != 'undefined')
            console.log(msg);
    };

    return {
        initialize: initialize,
        addDocumentEvent: addDocumentEvent,
        addElementEvent: addElementEvent,
        addElementAttribute: addElementAttribute,
        trackEvent: trackEvent,
        trackTiming: trackTiming
    };
} ();
