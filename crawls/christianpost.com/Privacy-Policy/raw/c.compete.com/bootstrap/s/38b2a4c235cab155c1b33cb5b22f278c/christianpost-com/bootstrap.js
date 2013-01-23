
(function(){var run_safe,trigger,universal_trigger_token,validate,settings,control;if(!this.__compete_code_control){this.__compete_code_control={};}
control=this.__compete_code_control;control.synchronous=true;universal_trigger_token="*";validate=function(site){var hostname,hostname_length;if(!site){return false;}
hostname=window.location.hostname.toLowerCase();return(site===universal_trigger_token)||(site===hostname)||(hostname.slice(-(site.length+1))===("."+site));};if(!validate("christianpost.com")){return;}
run_safe=function(action,control){try{action.call(window,control);}catch(err){if(typeof console!="undefined"&&console!==null){if(typeof console.error=="function"){console.error(err);}}}};}).call(this);