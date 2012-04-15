
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CancelVPNRAjaxUtil == null) var CancelVPNRAjaxUtil = {};
CancelVPNRAjaxUtil._path = '/dwr';
CancelVPNRAjaxUtil.cancelVPNR = function(p0, callback) {
  dwr.engine._execute(CancelVPNRAjaxUtil._path, 'CancelVPNRAjaxUtil', 'cancelVPNR', p0, callback);
}
