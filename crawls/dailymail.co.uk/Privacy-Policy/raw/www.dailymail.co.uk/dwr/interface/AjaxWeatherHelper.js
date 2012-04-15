
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (AjaxWeatherHelper == null) var AjaxWeatherHelper = {};
AjaxWeatherHelper._path = '/dwr';
AjaxWeatherHelper.searchWeatherLocations = function(p0, callback) {
  dwr.engine._execute(AjaxWeatherHelper._path, 'AjaxWeatherHelper', 'searchWeatherLocations', p0, callback);
}
