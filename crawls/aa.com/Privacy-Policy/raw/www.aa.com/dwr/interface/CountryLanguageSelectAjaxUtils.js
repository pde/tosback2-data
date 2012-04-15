
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CountryLanguageSelectAjaxUtils == null) var CountryLanguageSelectAjaxUtils = {};
CountryLanguageSelectAjaxUtils._path = '/dwr';
CountryLanguageSelectAjaxUtils.languageLookup = function(p0, callback) {
  dwr.engine._execute(CountryLanguageSelectAjaxUtils._path, 'CountryLanguageSelectAjaxUtils', 'languageLookup', p0, callback);
}
