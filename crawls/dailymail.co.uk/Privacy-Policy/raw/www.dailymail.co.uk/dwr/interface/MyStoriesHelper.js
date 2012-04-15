
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (MyStoriesHelper == null) var MyStoriesHelper = {};
MyStoriesHelper._path = '/dwr';
MyStoriesHelper.addStory = function(p0, p1, callback) {
  dwr.engine._execute(MyStoriesHelper._path, 'MyStoriesHelper', 'addStory', p0, p1, callback);
}
MyStoriesHelper.removeStories = function(p0, callback) {
  dwr.engine._execute(MyStoriesHelper._path, 'MyStoriesHelper', 'removeStories', p0, callback);
}
MyStoriesHelper.getMyStories = function(callback) {
  dwr.engine._execute(MyStoriesHelper._path, 'MyStoriesHelper', 'getMyStories', callback);
}
