/**
 * Copyright (c) 2011, Visual IQ Inc. All Rights Reserved.  
 */
var VNG_CONFIG = {
 "SEO_INSIGHT_MODE": "CONTAINER_TAG",
 "SEARCH_ENGINES" : {
	"GOOGLE" : {
		"NAME" : "Google",
		"QUERY_PARAM" : "q",
		"HOST" : "google"
	},

	"YAHOO" : {
		"NAME" : "Yahoo",
		"QUERY_PARAM" : "p",
		"HOST" : "yahoo"
	},

	"BING" : {
		"NAME" : "Bing",
		"QUERY_PARAM" : "q",
		"HOST" : "bing"
	},

	"ASK" : {
		"NAME" : "Ask",
		"QUERY_PARAM" : "q",
		"HOST" : "ask"
	}
 }
};


function trackRequest(referrerURL, currentURL, cmpId, additionalParams) {
	var result = checkReferrer(referrerURL, currentURL, cmpId);
	
	result = checkAffiliates(referrerURL,additionalParams, result);
	result = checkSocial(referrerURL,additionalParams, result);
	
	result.randomId = Math.floor(Math.random() * 100001);
	result.timestamp = new Date().getTime(); 
	
	return result;
}

function checkAffiliates(referrerURL,additionalParams, result){  
    if(additionalParams != null){  
      var affiliates = additionalParams["AFFILIATES"];
      
      if (affiliates != null){	      
	for (i=0 ; i< affiliates.length ; i++){
	  var affiliateHost = affiliates[i];
	  
	  if (referrerURL.toLowerCase().indexOf(affiliateHost.toLowerCase()) != -1) {
	    result.source = affiliateHost;
	    result.modeOfAccess = "AFFILIATE";
	  }
	}	      
      }
    }
    
    return result;
}

function checkSocial(referrerURL,additionalParams, result){  
    if(additionalParams != null){  
      var socialMedia = additionalParams["SOCIAL"];
      
      if (socialMedia != null){	      
	for (i=0 ; i< socialMedia.length ; i++){
	  var socialHost = socialMedia[i];
	  
	  if (referrerURL.toLowerCase().indexOf(socialHost.toLowerCase()) != -1) {
	    result.source = socialHost;
	    result.modeOfAccess = "SOCIAL";
	  }
	}	      
      }
    }
    
    return result;
}


function checkReferrer(referrerURL, currentURL, cmpId) {

	var result = new Object();
	var currentURLParams = parseUri(currentURL);

	// Initialize
	result.current_page_params = currentURLParams[parseUri.options.q.name];
	result.modeOfAccess = "UNKNOWN";
	result.source = "NONE";
	result.isSearchEngine = false;

	if (!referrerURL || (referrerURL== null) || (referrerURL=="")  || (whitespacetrim(referrerURL)==""))  {
		result.isRequestTracked = false;
		
		result.isSearchEngine = false;
		result.modeOfAccess = "DIRECT";
	} else {
	
		result.isRequestTracked = "UNKNOWN";
		
		var searchEngines = VNG_CONFIG.SEARCH_ENGINES ;
		
		for (var i in searchEngines){			
			var searchEngine = searchEngines[i];
    
			if (referrerURL.indexOf(searchEngine.HOST) != -1) {
				result.source = searchEngine.NAME;
				result.isSearchEngine = true;
				result.modeOfAccess = "ORGANIC";
				result.query = getQuery(referrerURL, searchEngine);
				
				result.isRequestTracked = isRequestTracked(currentURL, cmpId);
					
				if(result.isRequestTracked){
					result.modeOfAccess = "PAID";
				}
				
				break;
			}	
		}	
		
		if (!result.isSearchEngine) {
			result.source = encodeURI(referrerURL);
			result.isSearchEngine = false;
			result.isRequestTracked = isRequestTracked(currentURL, cmpId);
				
			if(result.isRequestTracked){
			
				result.modeOfAccess = "DISPLAY";
			} else {
				
				result.modeOfAccess = "UNKNOWN";				
			}
		}		
	}
		
	return result;
}

function isRequestTracked(currentURL, cmpId){
	
	return cmpId != null && (currentURL.indexOf("?"+cmpId+"=") != -1 || currentURL.indexOf("&"+cmpId+"=") != -1) ;
}

function getQuery(referrerURL, searchEngine){
	var uri = parseUri(referrerURL);
	var query = uri[parseUri.options.q.name][searchEngine.QUERY_PARAM];
	
	return encodeURI(query);
}

function whitespacetrim(str) {
	return str.replace(/^\s+|\s+$/g,"");
}

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: true,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


