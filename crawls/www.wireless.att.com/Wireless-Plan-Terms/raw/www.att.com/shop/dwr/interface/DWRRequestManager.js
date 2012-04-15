
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (DWRRequestManager == null) var DWRRequestManager = {};
DWRRequestManager._path = '/shop/dwr';
DWRRequestManager.localize = function(p0, p1, callback) {
  dwr.engine._execute(DWRRequestManager._path, 'DWRRequestManager', 'localize', p0, p1, callback);
}
