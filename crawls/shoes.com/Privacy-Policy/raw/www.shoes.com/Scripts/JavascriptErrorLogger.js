var JavascriptErrorLogger = {
    initialize: function() {
        window.onerror = JavascriptErrorLogger.onError_handler;
    },

    onError_handler: function(errorMessage, errorUrl, lineNumber) {
        var browserCodeName = navigator.appCodeName;
        var browserAppName = navigator.appName;
        var browserName = navigator.product;
        var browserVersion = navigator.appVersion;
        var browserLanguage = ((typeof (navigator.browserLanguage) != 'undefined') ? navigator.browserLanguage : navigator.language);
        var userPlatform = navigator.platform;
        var userAgent = navigator.userAgent;
        var windowLocationUrl = window.location.href;

        var loggerURL = '/WebServices/ClientLogging.asmx/WriteJavascriptErrorToLog';
        var requestParameters = '?errorMessage=' + encodeURIComponent(errorMessage) + '&errorUrl=' + encodeURIComponent(errorUrl) + '&lineNumber=' + encodeURIComponent(lineNumber) + '&browserCodeName=' + encodeURIComponent(browserCodeName) + '&browserAppName=' + encodeURIComponent(browserAppName) + '&browserName=' + encodeURIComponent(browserName) + '&browserVersion=' + encodeURIComponent(browserVersion) + '&browserLanguage=' + encodeURIComponent(browserLanguage) + '&userPlatform=' + encodeURIComponent(userPlatform) + '&userAgent=' + encodeURIComponent(userAgent) + '&windowLocationUrl=' + encodeURIComponent(windowLocationUrl);

        var webServiceUrl = '' + loggerURL + requestParameters;
        jQuery.ajax({
            type: 'GET',
            url: webServiceUrl,
            dataType: 'text'
        });
    }
};
JavascriptErrorLogger.initialize();

