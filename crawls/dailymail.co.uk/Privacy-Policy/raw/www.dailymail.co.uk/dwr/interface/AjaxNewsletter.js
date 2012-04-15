
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (AjaxNewsletter == null) var AjaxNewsletter = {};
AjaxNewsletter._path = '/dwr';
AjaxNewsletter.getNewsletters = function(p0, callback) {
  dwr.engine._execute(AjaxNewsletter._path, 'AjaxNewsletter', 'getNewsletters', p0, callback);
}
AjaxNewsletter.subscribeToNewsLetters = function(p0, p1, callback) {
  dwr.engine._execute(AjaxNewsletter._path, 'AjaxNewsletter', 'subscribeToNewsLetters', p0, p1, callback);
}
