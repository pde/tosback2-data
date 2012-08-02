
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (AjaxFeedsFacade == null) var AjaxFeedsFacade = {};
AjaxFeedsFacade._path = '/dwr';
AjaxFeedsFacade.getTable = function(p0, callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getTable', p0, callback);
}
AjaxFeedsFacade.getResults = function(p0, callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getResults', p0, callback);
}
AjaxFeedsFacade.getCompetitionsList = function(callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getCompetitionsList', callback);
}
AjaxFeedsFacade.getPagination = function(p0, callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getPagination', p0, callback);
}
AjaxFeedsFacade.getFixtures = function(p0, callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getFixtures', p0, callback);
}
AjaxFeedsFacade.getTeamsList = function(p0, callback) {
  dwr.engine._execute(AjaxFeedsFacade._path, 'AjaxFeedsFacade', 'getTeamsList', p0, callback);
}
