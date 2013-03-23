var _ga = _ga || {};
var _gaq = _gaq || [];
_ga.trackSocial = function (opt_pageUrl, opt_trackerName) {
    _ga.trackFacebook(opt_pageUrl, opt_trackerName);
    _ga.trackTwitter(opt_pageUrl, opt_trackerName);
};
_ga.trackFacebook = function (opt_pageUrl, opt_trackerName) {
    var trackerName = _ga.buildTrackerName_(opt_trackerName);
    try {
        if (FB && FB.Event && FB.Event.subscribe) {
            FB.Event.subscribe('edge.create', function (targetUrl) {
                _gaq.push([trackerName + '_trackSocial', 'facebook', 'like',
            targetUrl, opt_pageUrl]);
            });
            FB.Event.subscribe('edge.remove', function (targetUrl) {
                _gaq.push([trackerName + '_trackSocial', 'facebook', 'unlike',
            targetUrl, opt_pageUrl]);
            });
            FB.Event.subscribe('message.send', function (targetUrl) {
                _gaq.push([trackerName + '_trackSocial', 'facebook', 'send',
            targetUrl, opt_pageUrl]);
            });
        }
    } catch (e) { }
};
_ga.buildTrackerName_ = function (opt_trackerName) {
    return opt_trackerName ? opt_trackerName + '.' : '';
};
_ga.trackTwitter = function (opt_pageUrl, opt_trackerName) {
    var trackerName = _ga.buildTrackerName_(opt_trackerName);
    try {
        if (twttr && twttr.events && twttr.events.bind) {
            twttr.events.bind('tweet', function (event) {
                if (event) {
                    var targetUrl;
                    if (event.target && event.target.nodeName == 'IFRAME') {
                        targetUrl = _ga.extractParamFromUri_(event.target.src, 'url');
                    }
                    _gaq.push([trackerName + '_trackSocial', 'twitter', 'tweet',
            targetUrl, opt_pageUrl]);
                }
            });
        }
    } catch (e) { }
};
_ga.extractParamFromUri_ = function (uri, paramName) {
    if (!uri) {
        return;
    }
    var uri = uri.split('#')[0];
    var parts = uri.split('?');
    if (parts.length == 1) {
        return;
    }
    var query = decodeURI(parts[1]);
    paramName += '=';
    var params = query.split('&');
    for (var i = 0, param; param = params[i]; ++i) {
        if (param.indexOf(paramName) === 0) {
            return unescape(param.split('=')[1]);
        }
    }
    return;
};