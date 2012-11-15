// Copyright 2007 Google, Inc.
// This sample code is under the Apache2 license, see
// http://www.apache.org/licenses/LICENSE-2.0 for license details.

/**
 * @fileoverview Wrapper for Time Tracking
 */

/**
 * @class Time Tracking component.
 *     This class encapsulates all logic for time tracking on a particular
 *     page. Time tracking could be for any object within a page or the page
 *     itself.
 *
 * @param {Array.<Number>} arg1 Optional array that represents the bucket
 * @constructor
 */

var TimeTracker=function(opt_bucket){if(opt_bucket){this.bucket_=opt_bucket.sort(this.sortNumber);}else{this.bucket_=TimeTracker.DEFAULT_BUCKET;}};TimeTracker.prototype.startTime_;TimeTracker.prototype.stopTime_;TimeTracker.prototype.bucket_;TimeTracker.DEFAULT_BUCKET=[1,2,3,4,5,10];TimeTracker.prototype._getTimeDiff=function(){return(this.stopTime_-this.startTime_)/1000;};TimeTracker.prototype.sortNumber=function(a,b){return(a-b);}
TimeTracker.prototype._recordStartTime=function(opt_time){if(opt_time!=undefined){this.startTime_=opt_time;}else{this.startTime_=(new Date()).getTime();}};TimeTracker.prototype._recordEndTime=function(opt_time){if(opt_time!=undefined){this.stopTime_=opt_time;}else{this.stopTime_=(new Date()).getTime();}};TimeTracker.prototype._track=function(tracker,opt_event_category,opt_event_action){var i;var bucketString;var category;var page;if(opt_event_category!=undefined&&opt_event_category.length!=0){category=opt_event_category;}else{category='Static';}
if(opt_event_action!=undefined&&opt_event_action.length!=0){page=opt_event_action;}else{page='Page';}
for(i=0;i<this.bucket_.length;i++){if((this._getTimeDiff())<this.bucket_[i]){if(i==0){bucketString="0-"+(this.bucket_[0]);break;}else{bucketString=this.bucket_[i-1]+"-"+(this.bucket_[i]);break;}}}
if(!bucketString){bucketString=this.bucket_[i-1]+"+";}
try{if(typeof(tracker)=='object')
{tracker._trackEvent(category,page,"LoadTime_"+bucketString+"secs",this._getTimeDiff()*1000);}}catch(e){}};TimeTracker.prototype._setHistogramBuckets=function(buckets_array){this.bucket_=buckets_array.sort(this.sortNumber);};function AddToOnload(func)
{var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}}
function StopPageTimer()
{AddToOnload(function(){timeTracker._recordEndTime();timeTracker._track(pageTracker,undefined,window.location.pathname);});}