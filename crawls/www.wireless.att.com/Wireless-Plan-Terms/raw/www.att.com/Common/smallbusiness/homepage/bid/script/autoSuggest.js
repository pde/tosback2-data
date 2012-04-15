
function getParameter ( parameterName ) {
	var queryString = window.top.location.search.substring(1);
	// Add "=" to the parameter name (i.e. parameterName=value)
	var parameterName = parameterName + "=";
	if ( queryString.length > 0 ) {
		// Find the beginning of the string
		begin = queryString.indexOf ( parameterName );
		// If the parameter name is not found, skip it, otherwise return the value
		if ( begin != -1 ) {
			// Add the length (integer) to the beginning
			begin += parameterName.length;
			// Multiple parameters are separated by the "&" sign
			end = queryString.indexOf ( "&" , begin );
			if ( end == -1 ) {
				end = queryString.length
			}
			// Return the string
			return unescape ( queryString.substring ( begin, end ) );
		}
		// Return "null" if no parameter has been found
		return "null";
	}
} 

function insertAutoSuggestScript_main(inputId, fontFamily, fontSize, fontStyle, fontWeight, width, jsOnDemandUrl) {
	if(inputId) {
	  var input = document.getElementById(inputId);
	  
	  if(input && jsOnDemandUrl) {
		  var params = '';
		  if(jsOnDemandUrl.indexOf('?') >= 0)
			  params += '&';
		  else
			  params += '?';
		  params += 'q=' + input.value;
		  if(fontFamily)
			  params += '&font-family=' + fontFamily;
		  if(fontSize)
			  params += '&font-size=' + fontSize;
		  if(fontStyle)
			  params += '&font-style=' + fontStyle;
		  if(fontWeight)
			  params += '&font-weight=' + fontWeight;
		  if(width)
			  params += '&width=' + width;
		  jsOnDemandUrl += params;
		  var scriptTag = document.createElement('script');
		  scriptTag.src = jsOnDemandUrl;
		  document.body.appendChild(scriptTag);
	  }
	}
}

/**
 * Creates an unordered list of autoSuggestDiv in a human-readable form
 *
 * @param {json} root is the root JSON-formatted content from GData
 * @param {string} divId is the div in which the autoSuggestDiv are added
 */ 
function insertAutoSuggestions_main(root, divId, autocompleter) {
  var autoSuggestDiv = document.getElementById(divId);

  if(autoSuggestDiv) {
	  if (autoSuggestDiv.childNodes.length > 0) {
	    autoSuggestDiv.removeChild(autoSuggestDiv.childNodes[0]);
	  }	  
	
	  // create a new unordered list
	  var ul = document.createElement('ul');
	
	  // loop through each event in the feed
	  for (var i = 0; i < root.length; i++) {
	    var entry = root[i];
	    var short = entry['short'];
	    var long = entry['long'];
	    var li = document.createElement('li');
	
	    li.setAttribute('title', long);
	    li.appendChild(document.createTextNode(short));
	    ul.appendChild(li);
	  }
	  autoSuggestDiv.appendChild(ul);
	  autocompleter.updateChoices(null);
  }
}
