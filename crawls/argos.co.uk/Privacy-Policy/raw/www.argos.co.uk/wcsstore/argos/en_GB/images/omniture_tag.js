/**
 * Manual javascript omniture tagging to preset or modify variables.
 * Must place file before the omniture javascript inclusion.
 */
 
// initialise namespace
if (!argos) var argos = {};
if (!argos.omniture) argos.omniture = {};

argos.omniture.tag = {
	REF_PARAM : "sRefURL",
	QUERY_SEP : "?",
	
	/**
	 * Tag the omniture variable s.referrer only when the parameter  
	 * <code>argos.omniture.tag.REF_PARAM</code> is present in the currently viewing URL. 
	 */
	setReferrer : function() {
		var url = document.location.href;
		var queryIndex = url.indexOf(this.QUERY_SEP);
		
		if (queryIndex!=-1 && queryIndex!=url-1) {
			var refQuery = url.substring(queryIndex + 1);
			var refIndex = refQuery.indexOf(this.REF_PARAM);
			
			if (refIndex!=-1 && refIndex!=refQuery-this.REF_PARAM.length) {
				 var refUrl = refQuery.substring(refIndex + this.REF_PARAM.length + 1);					 
				 s.referrer = argos.url.decode(refUrl);
			} 
		}
	}
};

// this method need to be executed before omniture code.
// DO NOT put this in $(document).ready because it will it to
// execute AFTER the omniture code.
argos.omniture.tag.setReferrer();
