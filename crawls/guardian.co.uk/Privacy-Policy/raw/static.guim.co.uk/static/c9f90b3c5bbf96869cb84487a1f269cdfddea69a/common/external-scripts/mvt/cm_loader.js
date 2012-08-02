// Cognitive Match script loader

var MatchingEngine = [];
//Backwards compatibility for MatchingEngine.setup, logEvent, logConversion
MatchingEngine.setup = function (areaNamesList, externalParameters) {
    var setupCmd = ['setup', areaNamesList];
    if (typeof (externalParameters) !== 'undefined') {
        setupCmd.push(externalParameters);
    }
    this.push(setupCmd);
}
MatchingEngine.logEvent = function (eventType) {
    var logEventCmd = ['logEvent', eventType];
    if (typeof (eventParameters) !== 'undefined') {
        logEventCmd.push(eventParameters);
    }
    this.push(logEventCmd);
}
MatchingEngine.logConversion = function (eventType, eventParameters) {
    var logEventCmd = ['logEvent', eventType];
    var i;
    for (i = 1; i < arguments.length; i++) {
        if (document.getElementById(arguments[i]) !== null) {
            logEventCmd.push(arguments[i] + '=' + document.getElementById(arguments[i]).innerHTML);
        }
    }
    this.push(logEventCmd);
}
MatchingEngine.push(['setCustomerName', 'guardian']);

//Optional QA settings
//Force a timeout to test display-default logic
//MatchingEngine.push(['forceTimeout']);
//Enable debug logging to the browser console
//MatchingEngine.push(['enableConsole']);
// Set the name of tracking-info array (if used)
MatchingEngine.push(['setTrackingArrayName', 'trackingInfo']);
