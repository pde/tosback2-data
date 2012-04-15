/**
 * JSLoad
 * Copyright (C) 2007-2008 Instructables
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * Contact information:
 *   Eric Nguyen <ericn at instructables dot com>
 *
 * @version  0.9
 * @url      http://www.instructables.com
 */

function JSLoad(tags, path, version, executeAfterLoad, scriptConcatenatorURL) {
  // convert the tags array into a hash and keep a separate tagOrder array.
  if (!tags) return;
  var objectHash = {};
  var ordering = [];
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    objectHash[tag.name] = tag;
    ordering.push(tag.name);
  }
  this.tags = objectHash;
  this.tagOrder = ordering;

  // set flags and one-time data
  this.path = path ? path : "";
  this.version = version;
  this.executeAfterLoad = executeAfterLoad ? true : false;
  this.scriptConcatenatorURL = scriptConcatenatorURL;

  // for Safari when using a scriptConcatenator
  if (this.scriptConcatenatorURL && /WebKit|khtml/i.test(navigator.userAgent)) {
    this.safariSetsLoaded = {};
  }

  // Initialize "Private" attributes
  this.tagsLoaded = {};
  this.sourceFileSetQueue = [];
  this.sourceFilesLoaded = {};
  this.ALLJS = true; // a constant
}

JSLoad.prototype.load = function(tagNames, callback, path, version, executeAfterLoad) {
  if (!tagNames) return; // tagNames required
  var path = path || this.path;
  var version = version || this.version;
  var executeAfterLoad = executeAfterLoad || this.executeAfterLoad;

  // Keep track of all the source files that we are about to load
  // This allows us to skip repeat calls to load a file, if it is pending.
  var srcToLoad = this.getSrcToLoad(tagNames, path);
  this.sourceFileSetQueue.push({
    srcToLoad: srcToLoad,
    callback: callback,
    version: version
  });

  // Finally, load all the source files. Only run loadScript if it's
  // not running. ExecuteAfterLoad will postpone all loading until after the page
  // has loaded.
  if (!this.sourceFileSetQueue.isRunning) {
    if (executeAfterLoad) {
      // Note: this is a dependency on prototype 1.6 that should probably be removed in the
      // public version of JSLoad. We could copy FastInit code into here, instead.
      var thisObj = this;
      document.observe('dom:loaded', function() {
        thisObj.loadScript(thisObj.sourceFileSetQueue[0]);
      });
      // Don't have any more loadScript calls set. The first call after the
      // page load will open this back up.
      this.sourceFileSetQueue.isRunning = true;
    } else {
      this.loadScript(this.sourceFileSetQueue[0]);
    }
  }
}

JSLoad.prototype.getSrcToLoad = function(tagNames, path) {
  if (!path) var path = this.path;

  // for closures in markDependentTags()
  var tags = this.tags;
  var dependentTags = {};

  // private function, to be called recursively
  function markDependentTags(tagName) {
    var tag = tags[tagName];
    if (!tag) return;
    dependentTags[tagName] = true;
    if (!tag.requires) return;
    for (var i = 0; i < tag.requires.length; i++) {
      var requiredTagName = tag.requires[i];
      // only load if not already loaded
      if (!dependentTags[requiredTagName]) {
        markDependentTags(requiredTagName);
      }
    }
  }

  // create the full set of dependent tags
  for (var i = 0; i < tagNames.length; i++) {
    markDependentTags(tagNames[i]);
  }

  // Using the tag order, figure out what source files to load.
  // Don't load a source file if any of the following is true:
  //  - the tag is not linked to a source file ("tagOnly")
  //  - the tag isn't marked for loading
  //  - the tag has an isLoaded test and that test returns true
  //  - the tag's source file has already been loaded
  //  - the tag's source file is in the queue for loading
  var srcToLoad = [];
  for (var i = 0; i < this.tagOrder.length; i++) {
    var tagName = this.tagOrder[i];
    var tag = this.tags[tagName];

    if (tag.tagOnly ||
        !dependentTags[tagName] ||
        (tag.isLoaded && tag.isLoaded())) continue;
    if ( tagName.indexOf("http://") > -1 ) {
      var filePath = tagName;
    } else {
      var filePath = (path ? path : "") + tagName + '.js';
    }
    if (this.sourceFilesLoaded[filePath] || this.isQueued(filePath)) continue;

    srcToLoad.push(filePath);
  }

  return srcToLoad;
}

JSLoad.prototype.loadScript = function(srcSetObj, iteration) {
  this.sourceFileSetQueue.isRunning = true;
  var thisObj = this; // for closures
  var thisFn = arguments.callee;

  // This fires the callback when a srcSet is finished loading. First, it
  // executes the callback.
  function loadNext () {
    if (srcSetObj.callback) srcSetObj.callback();
    thisObj.sourceFileSetQueue.shift();
    if (thisObj.sourceFileSetQueue.length > 0) {
      thisFn.call(thisObj, thisObj.sourceFileSetQueue[0]);
    } else {
      thisObj.sourceFileSetQueue.isRunning = false;
    }
  }

  // Creates script el, adds onload handlers, and inserts into the dom.
  function createScriptEl (url, srcSetObj, iteration) {
    // Create script, set properties, load
	  var script = document.createElement("script");
  	script.type = "text/javascript";
  	script.src = url
	  // script onload, handling Safari 2.0
    function scriptOnLoad() {
  		if (script.readyState && script.readyState != "loaded" &&
  		    script.readyState != "complete") { return; }
  		script.onreadystatechange = script.onload = null;
      // next iteration
      if (thisObj.scriptConcatenatorURL) {
        loadNext();
      } else {
        thisObj.loadScript(srcSetObj, iteration);
      }
  	};
  	if (thisObj.safariSetsLoaded) { // Safari hack
      var callbackTimer = setInterval(function() {
        if (thisObj.safariSetsLoaded[srcSetObj.srcToLoad.join(",")]) {
          clearInterval(callbackTimer);
          scriptOnLoad();
        }
      }, 100);
    } else {
      script.onload = script.onreadystatechange = scriptOnLoad;
    }
	  document.getElementsByTagName("head")[0].appendChild(script);
  }

	// If there are no source files in this set, just execute the callback and
	// move on.
	if (srcSetObj.srcToLoad.length == 0) {
	  loadNext();

	// If there are source files, run them and set the callbacks to run when
	// the source files finish.
	} else {
  	// If we're using a script concatenator on the server, then we load
  	// all the scripts in one fell swoop.
  	if (this.scriptConcatenatorURL) {
  	  // Mark all files as loaded
    	for (var i = 0; i < srcSetObj.srcToLoad.length; i++) {
    	  var url = srcSetObj.srcToLoad[i];
      	this.sourceFilesLoaded[url] = true;
    	}
      createScriptEl(
        this.scriptConcatenatorURL
          + srcSetObj.srcToLoad.join(",")
      	  + (srcSetObj.version ? "&version=" + srcSetObj.version : ""),
      	srcSetObj
      );

    // If we're not using a script concatenator, then this function will
    // recurse through the each of the scripts in this srcSet.
  	} else {
  	  // If we've hit the end of this srcSet, run loadNext()
  	  iteration = iteration || 0;
  	  if ( (iteration + 1) > srcSetObj.srcToLoad.length ) {
  	    loadNext();
  	    return;
  	  }

  	  // Mark this file as loaded
  	  var url = srcSetObj.srcToLoad[iteration];
  	  this.sourceFilesLoaded[url] = true;
  	  createScriptEl(
  	    url + (srcSetObj.version ? "?version=" + srcSetObj.version : ""),
  	    srcSetObj,
  	    iteration + 1
  	  );
  	}
	}
}

JSLoad.prototype.isQueued = function(url) {
  for (var i = 0; i < this.sourceFileSetQueue.length; i++) {
    var set = this.sourceFileSetQueue[i];
    for (var j = 0; j < set.srcToLoad.length; j++) {
      if (url == set.srcToLoad[j]) return true;
    }
  }
  return false;
}
