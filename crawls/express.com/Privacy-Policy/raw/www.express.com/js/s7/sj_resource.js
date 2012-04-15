/*
ADOBE SYSTEMS INCORPORATED
Copyright 2007 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the terms of the 
Adobe license agreement accompanying it.  If you have received this file from a source other than Adobe, 
then your use, modification, or distribution of it requires the prior written permission of Adobe.
*/
sj_resource = new Object();
sj_resource.getResource  = function(inString){
var res = inString;
	for (var key in this) {
		if (typeof key == 'string') {
			var old;
			do {
				old = res
				res = res.replace('%' + key + '%', this[key]);
			} while (old != res);
		}
	}

	return res;
} 
sj_resource.NOT_FOUND = "Not found";
sj_resource.INVALID_PARAMETER = "Invalid parameter";
sj_resource.IMAGE_IS_NOT_SPECIFIED = "image is not specified";
sj_resource.CONTEXT_PROCESSING_FAILED = "context processing FAILED";
sj_resource.ERROR = "Error";
sj_resource.THERE_WAS_A_PROBLEM_RETRIEVING_DATA = "There was a problem retrieving data";
sj_resource.ERROR_LOADING_CONTEXT = "Error loading context";
sj_resource.PROBLEMS = "Problems";
sj_resource.HANDLER_COULD_NOT_BE_ATTACHED = "Handler could not be attached";
sj_resource.HANDLER_COULD_NOT_BE_REMOVED = "Handler could not be removed";
sj_resource.TO_PREVIOUS_PAGE = "To previous page";
sj_resource.TO_NEXT_PAGE = "To next page";
sj_resource.PLEASE_TRY_AGAIN_LATER = 'Please try again later...';
sj_resource.PAGE_XX_YY = 'Page %2*idx%-%2*idx+1%';
