
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (FilterService == null) var FilterService = {};
FilterService._path = '/cell-phone-service/dwr';
FilterService.compatible = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'compatible', p0, callback);
}
FilterService.setRepository = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setRepository', p0, callback);
}
FilterService.getRepository = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getRepository', callback);
}
FilterService.doStartService = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'doStartService', callback);
}
FilterService.getProductId = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getProductId', callback);
}
FilterService.setProductId = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setProductId', p0, callback);
}
FilterService.getModels = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getModels', p0, callback);
}
FilterService.getSIMCompatibleModels = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getSIMCompatibleModels', p0, callback);
}
FilterService.getManufacturers = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getManufacturers', callback);
}
FilterService.retrieveItems = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'retrieveItems', p0, p1, p2, callback);
}
FilterService.retrieveAllItems = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'retrieveAllItems', p0, callback);
}
FilterService.retrieveItem = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'retrieveItem', p0, p1, callback);
}
FilterService.retrieveSimCompatibleItems = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'retrieveSimCompatibleItems', p0, callback);
}
FilterService.getManufacturerId = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getManufacturerId', callback);
}
FilterService.setManufacturerId = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setManufacturerId', p0, callback);
}
FilterService.getSIMCompatibleQuery = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getSIMCompatibleQuery', callback);
}
FilterService.setSIMCompatibleQuery = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setSIMCompatibleQuery', p0, callback);
}
FilterService.getName = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getName', callback);
}
FilterService.resolveName = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'resolveName', p0, p1, callback);
}
FilterService.resolveName = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'resolveName', p0, p1, callback);
}
FilterService.resolveName = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'resolveName', p0, callback);
}
FilterService.resolveName = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'resolveName', p0, callback);
}
FilterService.startService = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'startService', p0, callback);
}
FilterService.stopService = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'stopService', callback);
}
FilterService.isRunning = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isRunning', callback);
}
FilterService.logTrace = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logTrace', p0, callback);
}
FilterService.logTrace = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logTrace', p0, p1, callback);
}
FilterService.logTrace = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logTrace', p0, callback);
}
FilterService.logError = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logError', p0, p1, callback);
}
FilterService.logError = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logError', p0, callback);
}
FilterService.logError = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logError', p0, callback);
}
FilterService.getRoot = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getRoot', callback);
}
FilterService.logDebug = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logDebug', p0, p1, callback);
}
FilterService.logDebug = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logDebug', p0, callback);
}
FilterService.logDebug = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logDebug', p0, callback);
}
FilterService.getServiceInfo = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getServiceInfo', callback);
}
FilterService.logInfo = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logInfo', p0, callback);
}
FilterService.logInfo = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logInfo', p0, callback);
}
FilterService.logInfo = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logInfo', p0, p1, callback);
}
FilterService.logWarning = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logWarning', p0, p1, callback);
}
FilterService.logWarning = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logWarning', p0, callback);
}
FilterService.logWarning = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'logWarning', p0, callback);
}
FilterService.doStopService = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'doStopService', callback);
}
FilterService.setServiceInfo = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setServiceInfo', p0, callback);
}
FilterService.addLogListener = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'addLogListener', p0, callback);
}
FilterService.removeLogListener = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'removeLogListener', p0, callback);
}
FilterService.getLogListeners = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getLogListeners', callback);
}
FilterService.getLogListenerCount = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getLogListenerCount', callback);
}
FilterService.sendLogEvent = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'sendLogEvent', p0, callback);
}
FilterService.getAbsoluteName = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getAbsoluteName', callback);
}
FilterService.nameContextElementBound = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'nameContextElementBound', p0, callback);
}
FilterService.nameContextElementUnbound = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'nameContextElementUnbound', p0, callback);
}
FilterService.getNameContext = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getNameContext', callback);
}
FilterService.getNucleus = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getNucleus', callback);
}
FilterService.setNucleus = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setNucleus', p0, callback);
}
FilterService.getServiceConfiguration = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getServiceConfiguration', callback);
}
FilterService.isLoggingInfo = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isLoggingInfo', callback);
}
FilterService.setLoggingInfo = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setLoggingInfo', p0, callback);
}
FilterService.isLoggingWarning = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isLoggingWarning', callback);
}
FilterService.setLoggingWarning = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setLoggingWarning', p0, callback);
}
FilterService.isLoggingError = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isLoggingError', callback);
}
FilterService.setLoggingError = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setLoggingError', p0, callback);
}
FilterService.isLoggingDebug = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isLoggingDebug', callback);
}
FilterService.setLoggingDebug = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setLoggingDebug', p0, callback);
}
FilterService.isLoggingTrace = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'isLoggingTrace', callback);
}
FilterService.setLoggingTrace = function(p0, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'setLoggingTrace', p0, callback);
}
FilterService.getAdminServlet = function(callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'getAdminServlet', callback);
}
FilterService.vlogDebug = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogDebug', p0, p1, p2, callback);
}
FilterService.vlogDebug = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogDebug', p0, p1, p2, callback);
}
FilterService.vlogDebug = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogDebug', p0, p1, callback);
}
FilterService.vlogDebug = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogDebug', p0, p1, p2, p3, callback);
}
FilterService.vlogError = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogError', p0, p1, callback);
}
FilterService.vlogError = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogError', p0, p1, p2, callback);
}
FilterService.vlogError = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogError', p0, p1, p2, callback);
}
FilterService.vlogError = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogError', p0, p1, p2, p3, callback);
}
FilterService.vlogInfo = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogInfo', p0, p1, p2, p3, callback);
}
FilterService.vlogInfo = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogInfo', p0, p1, p2, callback);
}
FilterService.vlogInfo = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogInfo', p0, p1, callback);
}
FilterService.vlogInfo = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogInfo', p0, p1, p2, callback);
}
FilterService.vlogTrace = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogTrace', p0, p1, p2, p3, callback);
}
FilterService.vlogTrace = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogTrace', p0, p1, p2, callback);
}
FilterService.vlogTrace = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogTrace', p0, p1, callback);
}
FilterService.vlogTrace = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogTrace', p0, p1, p2, callback);
}
FilterService.vlogWarning = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogWarning', p0, p1, p2, callback);
}
FilterService.vlogWarning = function(p0, p1, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogWarning', p0, p1, callback);
}
FilterService.vlogWarning = function(p0, p1, p2, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogWarning', p0, p1, p2, callback);
}
FilterService.vlogWarning = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(FilterService._path, 'FilterService', 'vlogWarning', p0, p1, p2, p3, callback);
}
