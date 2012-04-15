
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (SmartSuggestAjaxUtils == null) var SmartSuggestAjaxUtils = {};
SmartSuggestAjaxUtils._path = '/dwr';
SmartSuggestAjaxUtils.smartSuggestLookup = function(p0, p1, callback) {
  dwr.engine._execute(SmartSuggestAjaxUtils._path, 'SmartSuggestAjaxUtils', 'smartSuggestLookup', p0, p1, callback);
}
