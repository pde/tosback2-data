
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (DWRRequestManager == null) var DWRRequestManager = {};
DWRRequestManager._path = '/dsl/dwr';
DWRRequestManager.getServiceAddress = function(callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'getServiceAddress', callback);
}
DWRRequestManager.addItemsToOrder = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'addItemsToOrder', p0, callback);
}
DWRRequestManager.setPhonyOptionSelected = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'setPhonyOptionSelected', p0, callback);
}
DWRRequestManager.getPreviousURL = function(callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'getPreviousURL', callback);
}
DWRRequestManager.setPreviousURL = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'setPreviousURL', p0, callback);
}
DWRRequestManager.getErrorMessagesByCodes = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'getErrorMessagesByCodes', p0, callback);
}
DWRRequestManager.getQualificationByAddress = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'getQualificationByAddress', p0, callback);
}
DWRRequestManager.getServiceQualificationEligibilityByPhone = function(p0, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'getServiceQualificationEligibilityByPhone', p0, callback);
}
DWRRequestManager.resetShowAAFlag = function(callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'resetShowAAFlag', callback);
}
