
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (AjaxReaderComments == null) var AjaxReaderComments = {};
AjaxReaderComments._path = '/dwr';
AjaxReaderComments.paginateReaderComments = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'paginateReaderComments', p0, p1, p2, p3, callback);
}
AjaxReaderComments.getReaderCommentsCountForArticles = function(p0, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'getReaderCommentsCountForArticles', p0, callback);
}
AjaxReaderComments.getReaderCommentsCacheable5minutes = function(p0, p1, p2, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'getReaderCommentsCacheable5minutes', p0, p1, p2, callback);
}
AjaxReaderComments.getReaderCommentsCacheable30days = function(p0, p1, p2, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'getReaderCommentsCacheable30days', p0, p1, p2, callback);
}
AjaxReaderComments.incrementReaderCommentVoteCount = function(p0, p1, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'incrementReaderCommentVoteCount', p0, p1, callback);
}
AjaxReaderComments.decrementReaderCommentVoteCount = function(p0, p1, callback) {
  dwr.engine._execute(AjaxReaderComments._path, 'AjaxReaderComments', 'decrementReaderCommentVoteCount', p0, p1, callback);
}
