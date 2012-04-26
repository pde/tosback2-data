/** fake console */
(function(b){function c(){}for (var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})
		((function(){try{console.log();return window.console;}catch(err){return window.console={};}})());

/**
Clear Default
    
When applied to a form element, it removes the default content when the user focus and returns it
if the user doesn't change the default.
*/

// create a closure
(function ($) {
	$.fn.clearDefault = function () {
	    $(this).each(function() {
	    	var input = $(this);
	    	this.defaultValue = $(this).val();

	    	$(this).focus(function(){
	            if($(this).val() == this.defaultValue || $(this).val() == "")
	            	$(this).val('');
	        }).blur(function() {
	            if($(this).val() == this.defaultValue || $(this).val() == "")
	                $(this).val(this.defaultValue);
	        });
	    });
	};
})(jQuery);