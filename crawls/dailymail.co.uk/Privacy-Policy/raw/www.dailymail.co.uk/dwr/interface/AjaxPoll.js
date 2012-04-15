
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (AjaxPoll == null) var AjaxPoll = {};
AjaxPoll._path = '/dwr';
AjaxPoll.vote = function(p0, p1, p2, callback) {
  dwr.engine._execute(AjaxPoll._path, 'AjaxPoll', 'vote', p0, p1, p2, callback);
}
AjaxPoll.getYesterdaysPoll = function(p0, p1, callback) {
  dwr.engine._execute(AjaxPoll._path, 'AjaxPoll', 'getYesterdaysPoll', p0, p1, callback);
}
