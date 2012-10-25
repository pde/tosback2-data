(function (LFM, $) {
    var COOKIE_BROWSER_CAPABILITIES = 'BrowserCapabilities';

    if ( ! LFM.BrowserCapabilities) {
        LFM.BrowserCapabilities = {};
    }

    LFM.BrowserCapabilities.CORS = !!($.support.cors || 'withCredentials' in new XMLHttpRequest() || window.IEXMLHttpRequest);
    LFM.BrowserCapabilities.HistorySupport = !!(window.history && window.history.pushState);
    LFM.BrowserCapabilities.JavaScript = true;

    // From: https://gist.github.com/2997187
    LFM.BrowserCapabilities.Retina = !!(window.matchMedia && window.matchMedia('(min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)').matches);

    // Cookie-ise!
    var parts = [];

    for (name in LFM.BrowserCapabilities) {
        parts.push(name + '=' + (LFM.BrowserCapabilities[name] ? 'true' : 'false'));
    }

    var cookie = parts.join('|');

    LFM.setCookie(COOKIE_BROWSER_CAPABILITIES, cookie);
})(LFM, jQuery);

