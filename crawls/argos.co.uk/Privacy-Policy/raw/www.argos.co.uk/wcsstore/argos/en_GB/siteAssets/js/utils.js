argos.check("utils");

/*  General utility functions for global use.

	Note: These are written as extenders to an existing argos.utils 
	object in the event it already exists elsewhere. 
*/


argos.utils.cleanHtml = function(content) {
	// Attempts to clean up the bad HTML received from Argos site.
	var contents = null;
	var html = "";
	
	// Testing revealed some content without tags around text. 
	// These got left out of calculations because we work with 
	// elements only. Trying to wrap with P tags to make sure 
	// they're included.
	contents = content.contents(":empty"); 
	for(var i=0; i<contents.length; i++) {
		if(contents.get(i).length > 0) {
			contents.eq(i).wrap("<p></p>");
		}
	}
	
	html = (content.html()) ? content.html() : "";
	html = html.replace(/<b>(.*?)</gim,"<strong>$1</strong><");
	html = html.replace(/<\/b>/gim,"");

	return html.replace(/<p>[\s]*<\/p>|<br[ \w="/]*>/gim,"");
	
}

argos.utils.cleanClassName = function(str) {
	return str.replace(/^\d+|[^\w-]+/gm,"");
}

argos.utils.verticallyClipContent = function($elements, height) {
	var $content = $("<div></div>");
	var h = 0;
	var $clone;	

	for(var i=0; i<$elements.length; i++) { 
		var $element = $elements.eq(i);
		var elementHeight = $element.outerHeight(true); 
		if(elementHeight < height) {
			$content.append($element.clone(true));
			height -= elementHeight;
		}
		else {
			$clone = $element.clone(true);
			$clone = $clone.empty();
			$element.children().each(function() { 
				h += $(this).outerHeight(true);
			});

			if(h > 0 && (elementHeight - h) < height) {
				height -= (elementHeight - h);
				$content.append($clone.append(argos.utils.verticallyClipContent($element.children(), height)));
			}
			break;
		}
	}
	return $content.contents();
}

argos.utils.clipString = function(str, characters, ellipsis) {
	if(argos.utils.getType(str) == "String" && str.length > characters) {
		str = ellipsis ? str.substring(0, characters - 3) + "..." : str.substring(0,characters);
	}
	return str;
}

// Get maximum outer height of collection items.
argos.utils.getMaxHeight = function(items, includeMargin) {
	var max =0; 
	var h = 0;
	for(var i=0; i < items.length; i++) {
		h = $(items[i]).outerHeight(includeMargin);
		max = (h > max) ? h : max;  
	}
	return max;
}

// Attempt to return type of object.
argos.utils.getType = function(o) {
	var type = "unknown"; 
	if(o) {
		if(o.constructor == (new Array).constructor) return "Array";
		else if(o.constructor == (new Boolean).constructor) return "Boolean";
		else if(o.constructor == (new Date).constructor) return "Date";
		else if(o.constructor == (new Error).constructor) return "Error";
		else if(o.constructor == (new Function).constructor) return "Function";
		else if(o.constructor == (new Number).constructor) return "Number";
		else if(o.constructor == (new RegExp).constructor) return "RegExp";
		else if(o.constructor == (new String).constructor) return "String";
		else if(o.constructor == (new Object).constructor && o.jquery) return "jQueryObject";
		else if(o.constructor == (new Object).constructor) return "Object";
		else if(o.constructor == (new argos.classes.Element).constructor) return "Element";
		else if(o["nodeType"] && o.nodeType == 1) return "Node";
	}
	return type;
}


// Attempt to convert string into more useful dectected type based on value.
argos.utils.strToDetectedType = function(str) {
	// Currently only detects String, Number, Boolean, Function.
	// Assumes everything else is an Array and tries to return as that. Obviously not perfect, yet.
	// Extend with other types as necessary...
	// Array detection is not perfect. See notes at the end of this function for what will and will not work.
	var innerStrings, splitResult, detectedType;

	str = str.replace(/\n|\r/g, ""); // Remove line break characters.
	str = str.replace(/^\s*(.*)\s*$/gm, "$1"); // Trim leading and trailing whitespace.

	// Return NUMBER
	if(!isNaN(str)) detectedType = Number(str);

	// Return Primitive BOOLEAN
	else if(str.toLowerCase() == "true" || str.toLowerCase() == "false") detectedType = str.toLowerCase() == "true" ? true : false;

	// Return FUNCTION (currently on string representation of).
	else if(str.search(/^\s*function\s*\(\s*\)\s*{.*}\s*$/gm) != -1) { 
		// It's a function but nothing done to convert (yet).
		return str.replace("\s",""); 
	}

	// Return STRING (probably got here after detecting string in array)
	else if(str.search(/^"{1}.*?"{1}$|^'{1}.*?'{1}$/gm) != -1) detectedType = String(str.substring(1,str.length-1));

	// Return ARRAY (would benefit from check first, but just using as catch all_
	else {
		str = str.replace(/^\[{1}(.*)\]{1}$/gm, "$1"); // Remove any encasing brackets.
		innerStrings = str.match(/".*?"|'.*?'/mg); // Find any inner strings.
		if(innerStrings) {
			// convert inner string commas so they don't screw up the later str.split.
			for(var i=0; i<innerStrings.length; i++) {
				str = str.replace(innerStrings[i], innerStrings[i].replace(",", "&comma;"));
			}
		}

		splitResult = str.split(",");
		if(splitResult.length > 1) {
			// Its an array so keep going...
			for(var i=0; i<splitResult.length; i++) {
				splitResult[i] = splitResult[i].replace("&comma;", ","); // unconvert commas so they work with recursive call.
				splitResult[i] = argos.utils.strToDetectedType(splitResult[i]);
			}
			detectedType = splitResult;
		}
		else {
			// What was that? Or, it was just a string, afterall.
			detectedType = str;
		}
	}

	return detectedType;

	/* ARRAY detection notes (what currently works, and what doesn't). If the following are all strings
	   passed to this function, currently, 22 - 24 do not work. 22 and 23 remain unchanged, and 24
	   results in an Array of four items, '["something"', '1]', 2, 3  (single quotes added to show they are strings).
		 1) 3
		 2) true
		 3) ['.group', 1, 2, 3]
		 4) [".group", 1, 2, 3]
		 5) '.group', 1, 2, 3
		 6) ".group", 1, 2, 3
		 7) [',something', 1, 2, 3]
		 8) ',something', 1, 2, 3
		 9) ",something", 1, 2, 3
		11) ['some,thing', 1, 2, 3]
		12) 'some,thing', 1, 2, 3
		13) "some,thing", 1, 2, 3
		14) ['something,', 1, 2, 3]
		15) 'something,', 1, 2, 3
		16) "something,", 1, 2, 3
		17) [1, 2, function() { alert(\"something stupid\"); }]
		18) 1, 2, function() { alert(\"something stupid\"); }, \"string\"
		19) 1, 2, \"something\"
		20) 'somet, hing', 1
		21) "somet, hing", 1
		22) "something", 1, 2, \"something\"
		23) "so,me,thing", 1, 2, \"so,mething\"
		24) [["something", 1], 2, 3]
	*/
}

// Returns an array of jQuery objects (each one for element between the start/end markers).
argos.utils.getContentBetween = function(from, until) {
	// Note: Written while restricted to low version of jQuery so cannot use nextUntil().
	//return $("#" + from).nextUntil("#" + until).not("script"); // relies on >= jQuery 1.4

	/* Pre jQuery 1.4 */
	var content = new Array();
	var f = $("#" + from);
	var u = $("#" + until);
	var next = f;

	if(f.length > 0 && u.length > 0) {
		while(1) {
			next = next.next();
			try {
				if(next.length > 0 && next.attr("id") != u.attr("id")) {
					if(next.get(0).tagName.toLowerCase() != "script") {
						// Exclude script because JQuery appears to re-run it on append actions.
						content.push(next[0]);
					}
				}
				else {
					break;
				}
			}
			catch(e) {
				// Probably want this to fail silently
				//alert("Exception occurred for " + next.get(0).tagName + " element");
			}
		}
	}
	return content;
}

// Returns a jQuery collection, built from passed Array.
argos.utils.arrayToCollection = function(arr) {
	var collection = new argos.classes.Collection();
	for(var i=0; i<arr.length; ++i) {
		collection = collection.add(arr[i]);
	}
	return collection;
}


// Appends a stylesheet to the HEAD element by passing a URL. 
// If styles need to be fully loaded before progressing, use
// the pauseUntilReady value. This will get the stylesheet by
// a synchronous XMLHttpRequest and place the content in a 
// style element, rather than using the url to add a link element.
argos.utils.attachStylesheet = function (url, pauseUntilReady) {
	var id = (new Date().toString().replace(" ", "")) + url.replace(/\/[\w-_]+\.\w+\$/, "$1");
	var xhr, failed;
	if(pauseUntilReady) {
		xhr = $.ajax({
			url: url,
			async : false,
			error : function() { 
				alert("Error: Failed to find specified css file \n" + this.url); 
				failed = true; 
			}
		});
		$("head").append("<style id=\"" + id + "\" type=\"text/css\">" + ((!failed) ? xhr.responseText : "/*failed*/") + "</style>");
	}
	else {
		$("head").append("<link href=\"" + url + "\" id=\"" + id + "\" rel=\"stylesheet\" type=\"text/css\" />");
	}

	return document.getElementById(id);
} 


argos.utils.deduplication = new (function(){
	var _strDeduplicatedItems = "" ;
	
	// setup params for the containers we need to dedupe product components
	// need to supplied as array thus formed [[".pdpPicker",".partnum","a.pickerItem"],[...],[...]]
	// [x,0] = the container (either class or id - id is probably safer as no exclude function has been factored in)
	// [x,1] = the element ref to match for dupes
	// [x,2] = the parent component (the targeted element) to remove from DOM (use safe specifity)
	// [x,3] = name of an attribute containing the value required from [x,1]  is not the text value
	// precedence is set to the first container where ref first occurs
	this.removeTargetedElementsFromPage = function(containerDetails){
		var c,items;
		for(var i=0; i < containerDetails.length; i++) {
			//locate all refs within this container 
			c= $(containerDetails[i][0]);
			var refStr;
			items = c.find(containerDetails[i][1]);
			$(items).each(function(){ 
				//are we looking for element text of for attribute value
				if(containerDetails[i][3] == "undefined" || containerDetails[i][3] == null){
					// element text
					refStr = $(this).text();
				} else {
					//attributes
					refStr = $(this).attr(containerDetails[i][3]);
				}

				// remove parent component from this container if ref exists in deduplicated list
				if(_dedupeRef(refStr)) {
					$(this).parents(containerDetails[i][2]).remove();
		
				}
			});
	

	

		}
	}
	
	// this works directly off the supplied array of refs AND also the value of _strDeduplicatedItems
	// thus it should always be called after removeTargetedElementsFromPage
	this.getUniqueValues = function(suppliedRefs){
		var items = $.makeArray(suppliedRefs);
	
		$(items).each(function(){
			//if this ref is not to be included
			if(_dedupeRef(this)){
	
				// remove it from the supplied array
				items.splice($.inArray(this,items),1);
			}
		});
	
	
		//send clean array back to specific objective
		return items;
	}
	
	// simply checks if current ref already exists in deduplication list
	function _dedupeRef(suppliedRef){
		var result = true;
		if(_strDeduplicatedItems.indexOf(suppliedRef.replace("/","")) == -1) {
			//add ref to deduplicated list
			_strDeduplicatedItems += suppliedRef.replace("/","");
			_strDeduplicatedItems += ",";
			result = false;
		}
		return result;
	}

});

// Pass it a string and get a camel-case Argos ID formatted string as return value.
argos.utils.makeIdFromString = function(str) {
	var exploded = str.split(" ");
	for(var i=0; i<exploded.length; ++i) {
		exploded[i] = exploded[i].toLowerCase();
		if(i>0) {
			exploded[i] = (exploded[i].charAt(0).toUpperCase() + exploded[i].substring(1));
		}
		exploded[i] = exploded[i].replace(/\W/g,"");
	}
	return exploded.join().replace(/\W/g,"");
}

// Attempt to dynamically generate a unique String value. 
argos.utils.generateUniqueStr = function(str) {
	return (str ? str : "") + ((new Date().getTime()) + "_" + Math.random().toString()).replace(/[^\w]*/mig, "");
}

// Quick check to see if an element has either absolute or relative positioning.
argos.utils.hasPosition = function(element) {
	var position;
	if(argos.utils.getType(element) != "jQueryElement")
		element = $(element);
	
	position = element.css("position");
	return position == "absolute" || position == "relative" ? true : false;
}

argos.utils.objectWithDefaults = function(obj, defaults) {
	var merged = defaults;
	for(var i in obj) {
		if(obj.hasOwnProperty(i)) {
			merged[i] = obj[i];
		}
	}
	return merged;
}

argos.utils.createElementFrom = function(target) {
	// target = Object(HTML Node) || String(HTML element id) || String(jQuery selector) 
	// Return argos.classes.Element instance.
	var node;
	if(argos.utils.getType(target) == "String") {
		// See if it is an element id.
		node = document.getElementById(target);
		if(!node) {
			// Assume it's a jQuery selector.
			node = $(target).get(0); 
		}
	}
	else {
		// Assume it's a Node.
		node = target; 
	}
	return (new argos.classes.Element(node)).setElementCreator(target);
}

argos.utils.disableCheckBoxes = function (checkboxes, maxSize) {
	if(checkboxes.length < 1) return;
	toggleCheckboxes();
	$(checkboxes).bind("click", toggleCheckboxes);
	
	// toggle checkboxes state by determining if maxSize has been reached
	function toggleCheckboxes() {
		var count = getCheckedCount();
		if (count>=maxSize) {
			disableRemainingCheckboxes();
		}
		else {
			enableCheckboxes();
		}
	}
	
	// get the number of checked items
	function getCheckedCount() {
		var count = 0;
		for (var i=0;i<checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				count++
			}
		}
		return count;
	}
	
	// disable remaining checkboxes
	function disableRemainingCheckboxes() {
		for (var i=0;i<checkboxes.length; i++) {
			if (!checkboxes[i].checked) {
				checkboxes[i].disabled = true;
			}
		}			
	}
	
	// enable checkboxes
	function enableCheckboxes() {
		for (var i=0;i<checkboxes.length; i++) {
			checkboxes[i].disabled = false;
		}
	}
}

argos.utils.clearInputValue = function (input) {
	$(input)
		.bind("click", inputValue_onClick)
		.bind("blur", inputValue_onBlur);
	
	function inputValue_onBlur() {

		// In case we want to replace the value on no change (see onClick below)
		var t = $(this);
		if(!t.attr("value") && t.attr("tempValue")) {
			t.attr("value",t.attr("tempValue"));
			t.attr("tempValue","");
			t.addClass('defaultText');
		}
	}

	function inputValue_onClick() {
		var t = $(this);
		t.attr("tempValue", t.attr("value"));
		t.attr("value","");
		t.removeClass('defaultText');
	}
}



// Add missing JS functionality. just use $.trim()
if(!String.trim) String.prototype.trim = function() {
	return $.trim(this);
}
