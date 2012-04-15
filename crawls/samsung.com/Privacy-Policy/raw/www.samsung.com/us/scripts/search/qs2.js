// Global array of all instantiated query-suggesters
var querySuggesters = new Array();

var QuerySuggester = Class.create();
QuerySuggester.prototype =  {   
	initialize: function(suggestionUrl, tooltipId, queryId) {
		this.id = querySuggesters.length;
	    querySuggesters[this.id] = this;
	
		this.__suggestionUrl = false;   // The url to fetch suggestions from
		this.__query = false;           // The query input field
		this.__queryId = false;         // The id of the query input field
		this.__tooltip = false;         // The tooltip div
		this.__debugAreaBox = false;   	// Text-area for debugging
	
		this.__timeout = false;         // The current timeout
		this.__prev = "";               // The previously sent term
		this.__original = "";           // The term before panning into the suggestions
		this.__index = -1;              // The index of the text cursor in the list of suggestions
		this.__focusIndex = -1;
		
		this.__terms = new Array();     // The list of suggestions
		this.__cache = new Array();     // A result-cache
		this.__enabled = false;
		this.__deletePressed = false;   // Delete or backspace has been pressed
		this.__trans = null;   // Modifyied by choong10
		this.__submitFunc = function(content) {}; // Modifyied by choong10
	
		this.__queryString = null;   // Modifyied by choong10
		this.__transQueryString = function(content) {}; // Modifyied by choong10
		
		
		this.useInlineSuggestion = false;                // Whether or not to display the first suggestion as marked text within the search-box
		this.clearInlineSuggestionBeforeSubmit = false; // Whether or not to remove inline suggestions before submitting
		
		this.__showListenerFunc = function(showFlag) {};	// hide, show listener function
		this.__isTooltipAbsolutePosition = false;				// tooltip position attribute
		this.__checkQueryFunc = function(query) { return true };
		this.__makeSuggestionsHtmlFunc = this.makeSuggestionsHtml; // function(queryString, terms0, transQueryString, terms1, recommendTerms)
		this.__recommendTerms = new Array();	// 추천 키워드
		this.__focusClassNames = ["", "on"];	//(none, on) //["suggestionEntry", "suggestionEntryHover"]
		this.__findTooltipFunc = null;
		this.__pageNo = null;
		this.__prePageNo = null;
		this.__displayMaxCount = 4;
		this.__unexpectedKeywordClickCallbackFunc = null;
	    		
		/**
		 * Initialize the query-suggester.
		 *
		 * @param suggestionUrl the url to fetch suggestions from, will append the query string to it
		 * @param tooltipId     the id of the div used to display the suggestsions
		 */
	    this.__enabled = new BackgroundLoader().isEnabled();
	    if (this.__enabled) {
			this.__suggestionUrl = suggestionUrl;
			this.__trans = new EnKoTransformer();	// Modified by choong10

			this.__tooltip = this.byId(tooltipId);
			this.__queryId = queryId;
			this.__query = this.byId(queryId);
			if (this.__query) {
			    //Event.observe(this.__query, 'keydown', this.keyDown.bind(this), false);	
			    //Event.observe(this.__query, 'keyup', this.keyUp.bind(this), false);

			    $("#" + queryId).keydown(this.keyDown.bind(this));
			    $("#" + queryId).keyup(this.keyUp.bind(this));
			}
	    } else {
	        this.debug("Unable to instantiate XMLHttpRequest, disabling.");
	    }
    },
    
    // Public functions
    /**
     * Set the id of the textarea where debug-output is written. Initially, there is no such
     * textarea assigned to the suggester.
     *
     * @param debugAreaID the id of the textarea to print debug messages to, or boolean false
                          to disable debugging
     */
    setDebugAreaId : function(debugAreaId) {
    	if(debugAreaId) {
    		if(Object.isString(debugAreaId))
    			this.__debugAreaBox = this.byId(debugAreaId);
    		else 
    			this.__debugAreaBox = debugAreaId;
    	}
    },
    
    
	// set hide, show listener function
	setShowListenerFunc : function(showFunc) {
	    this.__showListenerFunc = showFunc;
	},
	
	// set tooltip absolute position attrubute
	setTooltipAbsolutePosition : function(isAbsolute) {
		if(isAbsolute) {
			this.__isTooltipAbsolutePosition = true;
		}
	},
	
	// set check query function
	setCheckQueryFunc : function(checkQueryFunc) {
	    this.__checkQueryFunc = checkQueryFunc;
	},
	
	// set makeSuggestionsHtml function
	setMakeSuggestionsHtmlFunc : function(makeSuggestionsHtmlFunc) {
	    this.__makeSuggestionsHtmlFunc = makeSuggestionsHtmlFunc;
	},
	
	// set focus class names(none, on)
	setFocusClassNames : function(focusClassNames) {
		if(focusClassNames && focusClassNames.length == 2) {
			this.__focusClassNames = focusClassNames;
		}
	},
	
	setFindTooltipFunc : function(findTooltipFunc) {
		this.__findTooltipFunc = findTooltipFunc;
	},
	
	setDisplayMaxCount : function(displayMaxCount) {
		this.__displayMaxCount = displayMaxCount;
	},
	
	// set unexpectedKeywordClickCallback function
	setUnexpectedKeywordClickCallbackFunc : function(unexpectedKeywordClickCallbackFunc) {
	    this.__unexpectedKeywordClickCallbackFunc = unexpectedKeywordClickCallbackFunc;
	},
	
    
    // Overridable functions
    /**
     * Some keys also require keyDown handlers, because they never give a key up event. For
     * instance, pressing the 'tab' key will typically cause focus to leave the search input
     * box, causing the key up event to be sent to another component.
     */
    keyDown : function(event) {
        if (!this.__enabled) return;

        if (event && event.keyCode) {
            if(this.isDebug()) {
        		this.debug(this.id + ":qs:keyDown:this.__index='" + this.__index + "'");
        	}
            
            switch (event.keyCode) {
                case 9 : // Tab
                    this.hide();
                    break;
                case 13 : // Enter
                    if (this.__index == -1) this.clearInlineSuggestion();
                    break;
                case 38 : // Up-arrow
					//if (this.__index >= 0) this.updateSuggestions(this.__index--, -2);
					if(this.__focusIndex >= 0) this.updateSuggestions(this.__focusIndex - 1, -1);
					break;
                case 40 : // Down-arrow
					//if (this.__index < this.__terms.length - 1) this.updateSuggestions(this.__index++, -2);
                	if(this.__focusIndex < this.__terms.length - 1) this.updateSuggestions(this.__focusIndex + 1, -1);
					break;
            }
        }
    },
    
    /**
     * Event handler for key up events.
     */
    keyUp : function(event) {
    	if(this.isDebug()) {
    		this.debug(this.id + ":qs:keyUp" + ((event) ?  ":" + event.keyCode : ""));
    	}

        if (!this.__enabled) return;
        
        if (event) {
            if (this.__timeout) {
                clearTimeout(this.__timeout);
                this.__timeout = false;
            }
            if (event.ctrlKey || event.altKey) {
                return;
            }
            var timeout = 100;
            this.__deletePressed = false;
            switch (event.keyCode) {
                case 9 : // Tab
                case 27 : // Escape
                    this.hide();
                    return;
                case 8 : // Backspace
                case 46 : // Delete
                    this.__deletePressed = true;
                    timeout = 200;
                    break;
                case 13 : // Enter
                case 16 : // Shift
                case 17 : // Ctrl
                case 18 : // Alt
                case 20 : // Caps Lock
                case 33 : // Page up
                case 34 : // Page down
                case 35 : // End
                case 36 : // Home
                case 37 : // Arrow left
                case 38 : // Arrow up
                case 39 : // Arrow right
                case 40 : // Arrow down
                case 45 : // Insert
                case 229 : // onClick
                    return;
                default :
                    timeout = 100;
                    break;
            }
            this.__index = -1;
            var qc = this;
            this.__timeout = setTimeout(function() {qc.fetchAndDisplaySuggestions();}, timeout);
        }
    },
    
    
	byId : function(element) {
    	if(element) {
			if(Object.isString(element))
				element = document.getElementById(element);
    	}
		return element;
	},
    
    trim : function(str) {
    	if(str) 
    		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    	return "";
    },
    
    moveSuggestion : function(index) {
    	if(index >=0 && index < this.__terms.length) {
	    	this.updateSuggestions(index, -1);
    	}
    },
    
    saveCache : function(key, value) {
    	var index = this.__cache.length;
    	this.__cache[index] = [key, value];
    },
    
    getCache : function(key) {
    	for(var i=0; i<this.__cache.length; i++) {
    		if(this.__cache[i][0] == key)
    			return this.__cache[i][1];
    	}
    	return null;
    }
};





/**
 * Returns the url to visit to obtain suggestions for a query. By default appends the
 * query to the suggestionUrl member. Override for different behavior.
 *
 * @param quer the query for which to fetch suggestions
 * @return the url that will return the suggestions
 */
 // modified by choong10
QuerySuggester.prototype.getSuggestionUrl = function(query, query2, pageNo) {
    return this.__suggestionUrl + query + "&transq=" + query2 + (pageNo ? "&pageNo=" + pageNo : "");
};

/**
 * Called when the search form should be submitted (usually because of mouse clik on one
 * of the suggestions in the list). By default submits the form specified by the formId
 * parameter of the initialize() function. Override for different behavior.
 */
 // modified by choong10
 // 검색페이지에 있는 submit 함수를 호출하게 변경
 // 이렇게 함으로써 검색어 완성에서 검색텀을 선택시 검색페이지에 있는 submit 함수를 호출한다.
QuerySuggester.prototype.submitForm = function(index) {
	this.__submitFunc(index);
};





QuerySuggester.prototype.mouseOver = function(index) {
	if (!this.__enabled) return;

	this.updateSuggestions(-1, index);
};

QuerySuggester.prototype.mouseOut = function(index) {
	if (!this.__enabled) return;

};

QuerySuggester.prototype.mouseClick = function(index) {
	if (!this.__enabled) return;
	
	if (index >= 0) {
		this.__query.value = this.__terms[index];
		//this.updateSuggestions(index, -1);
		this.submitForm(index);
	} else {
	    this.hide();
	}
};

QuerySuggester.prototype.unexpectedKeywordClick = function(index) { 
	if (!this.__enabled) return;

	if(index < this.__recommendTerms.length && this.__unexpectedKeywordClickCallbackFunc) {
		var keyword = this.__recommendTerms[index][1];
		this.__unexpectedKeywordClickCallbackFunc(keyword);
	}	
};


// Functions for retrieving suggestions

QuerySuggester.prototype.fetchAndDisplaySuggestions = function(pageNo) {
	if(this.isDebug()) {
		this.debug(this.id + ":qs:fetchAndDisplaySuggestions:" + this.__query.value);
		if(pageNo) {
			this.debug(this.id + ":qs:fetchAndDisplaySuggestions:pageNo='" + pageNo + "'");
		}
	}
	
	if(pageNo) {
		this.__pageNo = pageNo;
	} else {
		this.__pageNo = null;
	}
	
    var val = this.__query.value;
   
    if (this.canHandleRanges()) {
        val = val.substring(0, this.getCaretPosition());
        
        if(this.isDebug()) {
    		this.debug(this.id + ":qs:fetchAndDisplaySuggestions:val: '" + val + "'");
    	}
    }
    if (val.length == 0) {
        this.hide();
        this.__prev = val;
        return;
    } else {
        val = val.replace(new RegExp("\\\\", "g"), "\\\\");
    }
        
    this.__prev = val;
    this.__prePageNo = this.__pageNo;
    
    // modified by choong10 start
    this.__queryString = val;    
    var transQuery = null; 
    this.__transQueryString = this.__trans.transform( val );

    if(this.isDebug()) {
    	this.debug(this.id + ":qs:fetchAndDisplaySuggestions:-trans query: '" + this.__transQueryString + "'"); 
	}
    // modified by choong10 end

    
    var cacheKey = val + (pageNo ? "___pageno=" + pageNo : "");
    var cacheValue = this.getCache(cacheKey);
    if(this.isDebug()) {
		this.debug(this.id + ":qs:fetchAndDisplaySuggestions:cacheKey: '" + cacheKey + "'"); 
	}
    
    if (cacheValue) {
    	if(this.isDebug()) {
    		this.debug(this.id + ":qs:fetchAndDisplaySuggestions:cacheValue: '" + cacheValue + "'"); 
    	}
        this.displaySuggestions(cacheValue, this.__prev, this.__prePageNo);
    } else {
    	if(this.isDebug()) {
    		this.debug(this.id + ":qs:fetchAndDisplaySuggestions:query: '" + val + "'"); 
    	}
        this.fetchSuggestion(val, pageNo);
    }
 };

QuerySuggester.prototype.fetchSuggestion = function(query, pageNo) {
	//if(this.checkQuery(query)) {
	if(this.__checkQueryFunc(query)) {	
	    var qc = this;
	    var bl = new BackgroundLoader();
	    bl.setLoadedCallback(function(content){qc.parseSuggestions(content);});
	    bl.setErrorCallback(function(error){qc.debug("Couldn't get suggestions:\n" + error);});
	    
	    // modified by choong10
	    //bl.loadUrl(this.getSuggestionUrl(query, this.__transQueryString)); 
	    // & 같은 문자로 인해 문제가  발생할 수 있으므로 
	    // encodeURIComponent 사용하여 query, transQueryString을 인코딩해야한다.
	    //bl.loadUrl(this.getSuggestionUrl( encodeURIComponent(query), encodeURIComponent(this.__transQueryString), pageNo));
	    bl.loadUrl(this.getSuggestionUrl( encodeURIComponent(query), encodeURIComponent(this.__transQueryString), pageNo));
	}
};

/*
QuerySuggester.prototype.checkQuery = function(query) {
	return true;
}*/

// Functions for displaying suggestions

/* block by choong 10 :  밑에 주석으로 막은 함수들을 재정의 하였음
QuerySuggester.prototype.parseSuggestions = function(matches) {
    if (matches == "") return;
    var params = eval(matches);
    if (params.length > 2) {
        this.__cache[params[0]] = params;
    }
    this.displaySuggestions(params, params.length > 2 ? params[0] : "");
};

QuerySuggester.prototype.displaySuggestions = function(matches, query) {
    if (matches.length <= 2) {
        this.noSuggestions();
        return;
    }
    if (this.__tooltip && this.__query) {
        this.buildSuggestionsHtml(matches);
        this.show();
        this.showInlineSuggestions(query);
    }
};

QuerySuggester.prototype.buildSuggestionsHtml = function(matches) {
    var text = "";
    var length = matches.length / 2 - 1;
    this.__terms = new Array(length);
    for (var i = 0; i < length; ++i) {
        text += "<div class=\"suggestionEntry\" id=\"tooltip_" + i + "\" onmouseover=\"mouseOver(" + this.id + "," + i + ")\" onmouseout=\"mouseOut(" + this.id + "," + i + ")\" onclick=\"mouseClick(" + this.id + "," + i + ")\" style=\"cursor: pointer\">" +
                matches[i * 2 + 2] +
                "</div>\n";
        this.__terms[i] = matches[i * 2 + 2];
    }
    this.__tooltip.innerHTML = text;
};
*/

// modified by choong10
QuerySuggester.prototype.parseSuggestions = function(matches) {
	if (matches == "") {
		this.hide();	// added by YH Lim on 08/11/10
		return;
	}
	if(this.isDebug()) {
		this.debug(this.id + ":qs:parseSuggestions:matches: '" + matches + "'"); 
	}
    var params;
    try {
    	params = eval(matches);
    } catch(err) {
    	if(this.isDebug()) {
    		this.debug(this.id + ":qs:parseSuggestions:err: '" + (err.description) + "'"); 
    	}
    	params = [[this.__prev, ""],["", ""]];
    }
    
    if(this.isDebug()) {
    	this.debug(this.id + ":qs:parseSuggestions:result 1: " + params[0]);
    	this.debug(this.id + ":qs:parseSuggestions:result 2: " + params[1]);
	}
	
    //if (params[0].length > 2 || params[1].length > 2 ) {
    	var cacheKey = params[0][0];
        if(this.isDebug()) {
    		this.debug(this.id + ":qs:parseSuggestions:cacheKey: '" + cacheKey + "'"); 
    	}
        this.saveCache(cacheKey, params);
    //}

    this.displaySuggestions(params, params[0].length > 2 ||  params[1].length > 2 ? params[0][0] : "");
};

// modified by choong10
QuerySuggester.prototype.displaySuggestions = function(matches, query) {
    if (matches[0].length <= 2 && matches[1].length <= 2 ) {
        this.noSuggestions();
        return;
    }
    if(this.__prev != query) {
    	//this.noSuggestions();
        return;
    }
    if (this.__tooltip && this.__query) {
        this.buildSuggestionsHtml(matches);
        this.show();
        this.showInlineSuggestions(query);
    }
};


QuerySuggester.prototype.__updatePriceableTerms = function(terms, term) {
	for(var i=0; i<terms.length; i++) {
		if(terms[i][1] == term[1]) {
			if(parseInt(term[0]) > terms[i][0]) {
				terms[i][0] = parseInt(term[0]);
			}
			
			return true;
		}
	}
	return false;
};

QuerySuggester.prototype.__addRecommendTerms = function(terms, _words) {
	var foo = _words;
	var bar = foo.split("/");

	for(var i=0; i<bar.length; i++){
		if(bar[i].length > 0) {
			var bar2 = bar[i].split(",");
			if(!this.__updatePriceableTerms(terms, bar[i])) {
				terms[terms.length] = [parseInt(bar2[0]), bar2[1]];
			}
		}
	}
};

QuerySuggester.prototype.__sortPriceableTerms = function(terms) {
	for(var i=0; i<terms.length - 1; i++){
		for(var j=i+1; j<terms.length; j++) {
			if(terms[j][0] > terms[i][0]) {
				var tmp = terms[i];
				terms[i] = terms[j];
				terms[j] = tmp;
			}
		}
	}
};

QuerySuggester.prototype.__addPriceableTerms = function(terms, term) {
	if(!this.__updatePriceableTerms(terms, term)) {
		terms[terms.length] = [parseInt(term[0]), term[1]];
	}
};



// modified by choong10
QuerySuggester.prototype.buildSuggestionsHtml_old = function(matches) {
    var length0 = parseInt(matches[0].length / 2) - 1;
    var length1 = parseInt(matches[1].length / 2) - 1

    this.__terms = new Array();
    this.__index = -1;
    this.__focusIndex = -1;
    
    this.__recommendTerms = new Array();
    var terms0 = new Array();
    var terms1 = new Array();

    for (var i = 0; i < length0; ++i) {
		this.__terms[i] = matches[0][i * 2 + 2];
		terms0[i] = matches[0][i * 2 + 2];
		this.__addRecommendTerms(this.__recommendTerms, matches[0][i * 2 + 3]);
    }

    for (var i = 0; i < length1; ++i) {
		this.__terms[this.__terms.length] = matches[1][i * 2 + 2];
		terms1[i] = matches[1][i * 2 + 2];
		this.__addRecommendTerms(this.__recommendTerms, matches[1][i * 2 + 3]);
    }
    this.__sortPriceableTerms(this.__recommendTerms);
    
    this.__tooltip.innerHTML = this.__makeSuggestionsHtmlFunc(this.id, this.__queryString.toLowerCase(), terms0, this.__transQueryString.toLowerCase(), terms1, this.__recommendTerms);
    
    if(this.isDebug()) {
		this.debug(this.id + ":qs:buildSuggestionsHtml:__tooltip: '" + this.__tooltip.innerHTML + "'"); 
	}
};


QuerySuggester.prototype.buildSuggestionsHtml = function(matches) {
    var length0 = parseInt(matches[0].length / 2) - 1;
    var length1 = parseInt(matches[1].length / 2) - 1

    // init
    this.__terms = new Array();
    this.__index = -1;
    this.__focusIndex = -1;
    
    this.__recommendTerms = new Array();
    var priceableTerms0 = new Array();
    var priceableTerms1 = new Array();

    for(var i = 0; i < length0; ++i) {
    	match = matches[0][i * 2 + 3];
    	
    	var bar = match.split("^");
    	if(bar && bar.length && bar.length >= 2) {
        	var price = bar[0];
        	var q =  bar[1];
        	this.__addPriceableTerms(priceableTerms0, [price, q]);
        	for(var j=2; j<bar.length; j++) {
        		this.__addPriceableTerms(this.__recommendTerms, [price, bar[j]]);
        	}
    	}   	
    }
    
    for(var i = 0; i < length1; ++i) {
    	match = matches[1][i * 2 + 3];
    	
    	var bar = match.split("^");
    	if(bar && bar.length && bar.length >= 2) {
        	var price = bar[0];
        	var q =  bar[1];
        	this.__addPriceableTerms(priceableTerms1, [price, q]);
        	for(var j=2; j<bar.length; j++) {
        		this.__addPriceableTerms(this.__recommendTerms, [price, bar[j]]);
        	}
    	}   	
    }
    // sort
    this.__sortPriceableTerms(priceableTerms0);
    this.__sortPriceableTerms(priceableTerms1);
    this.__sortPriceableTerms(this.__recommendTerms);
    
    var terms0 = new Array();
    var terms1 = new Array();
    //var displayMaxCount = 4;
    var displayCount = 0;
    
    for(var i = 0; i < priceableTerms0.length && displayCount < this.__displayMaxCount; i++, displayCount++) {
    	terms0[i] = priceableTerms0[i][1];
    	this.__terms[this.__terms.length] = priceableTerms0[i][1];
    }
    
    for(var i = 0; i < priceableTerms1.length && displayCount < this.__displayMaxCount; i++, displayCount++) {
    	terms0[i] = priceableTerms1[i][1];
    	this.__terms[this.__terms.length] = priceableTerms1[i][1];
    }
    

    this.__tooltip.innerHTML = this.__makeSuggestionsHtmlFunc(this.id, this.__queryString.toLowerCase(), terms0, this.__transQueryString.toLowerCase(), terms1, this.__recommendTerms);
    
    if(this.isDebug()) {
		this.debug(this.id + ":qs:buildSuggestionsHtml:__tooltip: '" + this.__tooltip.innerHTML + "'"); 
	}
};






/*QuerySuggester.prototype.makeSuggestionsHtml = function(id, queryString, terms0, transQueryString, terms1, recommendTerms) {
	var text = "";
    for(var i=0; i<terms0.length; i++) {
        text += "<div class=\"suggestionEntry\" id=\"tooltip_" + i + "\" onmouseover=\"mouseOver(" + id + "," + i + ")\" onmouseout=\"mouseOut(" + id + "," + i + ")\" onclick=\"mouseClick(" + id + "," + i + ")\" style=\"cursor: pointer\">" +
                "<nobr>" + terms0[i].replace(queryString, "<font color=red>" +  queryString + "</font>") + "</nobr>" + 
                "</div>\n";
    }
    
//    termIdx = i;
    for(var i=0; i<terms1.length; i++) {
    	var idx = terms0.length + i;
        text += "<div class=\"suggestionEntry\" id=\"tooltip_" + idx + "\" onmouseover=\"mouseOver(" + id + "," + idx + ")\" onmouseout=\"mouseOut(" + id + "," + idx + ")\" onclick=\"mouseClick(" + id + "," + idx + ")\" style=\"cursor: pointer\">" +
                "<nobr>" + terms1[i].replace(transQueryString, "<font color=red>" +  transQueryString + "</font>")  + "</nobr>" +
                "</div>\n";
    }
    
    return text;
};*/
QuerySuggester.prototype.makeSuggestionsHtml = function(id, queryString, terms0, transQueryString, terms1, recommendTerms) {
	var text = "";
	text += "<div class='listbox'><ul>";
	for(var i=0; i<terms0.length; i++) {
		text += "<li onmouseover='mouseOver(" + id + "," + i + ")'><a id='tooltip_" + i + "' href='javascript:mouseClick(" + id + "," + i + ");'>" + terms0[i].replace(queryString, "<span>" + queryString + "</span>") + "</a></li>";
	}

	for(var i=0; i<terms1.length; i++) {
		var idx = terms0.length + i;
		text += "<li onmouseover='mouseOver(" + id + "," + idx + ")'><a id='tooltip_" + idx + "' href='javascript:mouseClick(" + id + "," + idx + ");'>" + terms1[i].replace(transQueryString, "<span>" +  transQueryString + "</span>") + "</a></li>";
	}
	text += "</ul></div>";

	if(recommendTerms.length > 0) {
		text += "<div class='listbox2'><ul>";		
		for(var i=0; i<recommendTerms.length; i++) {
			text += "<li><a href='javascript:unexpectedKeywordClick(" + id + "," + i + ");'>" + recommendTerms[i][1] + "</a></li>";
		}
		text += "</ul></div>";
	}

	return text;
};



QuerySuggester.prototype.showInlineSuggestions = function(query) {
    if (this.__terms.length > 0 && this.__query.value == query && !this.__deletePressed && this.useInlineSuggestion) {
        this.__original = this.__query.value;
        if (this.canHandleRanges()) {
            this.__query.value = this.__terms[0];
            this.selectRange(this.__original.length, this.__query.value.length);
        }
    }
};

QuerySuggester.prototype.getTooltip = function(index) {
	if(this.__findTooltipFunc != null)
		return this.__findTooltipFunc(index);

	return this.byId("tooltip_" + index);
}

QuerySuggester.prototype.updateSuggestions = function(cursorIndex, focusIndex) {
	if(this.isDebug()) {
		this.debug(this.id + ":qs:updateSuggestions:cursorIndex='" + cursorIndex + "'" +
				", focusIndex='" + focusIndex + "'" + 
				", this.__index='" + this.__index + "'" + 
				", this.__focusIndex='" + this.__focusIndex + "'");
	}
	
	if(focusIndex >= 0) {
		var focusCurrent = this.getTooltip(focusIndex);
		if(focusCurrent) {
			if(this.__focusIndex >= 0) {
				var previousFocus = this.getTooltip(this.__focusIndex);
				if(previousFocus) {
					//previousFocus.className = "suggestionEntry";
					previousFocus.className = this.__focusClassNames[0];
				}
			}
			 
			//focusCurrent.className = "suggestionEntryHover";
			focusCurrent.className = this.__focusClassNames[1];
			this.__focusIndex = focusIndex;
		}
	}
	
	if(cursorIndex >= 0 && cursorIndex < this.__terms.length && this.__tooltip && this.__tooltip.style.display == 'block') {
		var current = this.getTooltip(cursorIndex);
		if(current) {
			if(this.__focusIndex >= 0) {
				var previousFocus = this.getTooltip(this.__focusIndex);
				if(previousFocus) {
					//previousFocus.className = "suggestionEntry";
					previousFocus.className = this.__focusClassNames[0];
				}
			}
			current.focus();
			current.blur();
			//current.className = "suggestionEntryHover";
	        current.className = this.__focusClassNames[1];
	        
	        this.__index = this.__focusIndex = cursorIndex;
	        if (this.canHandleRanges()) {
				this.__query.value = this.__terms[this.__index];
				//this.selectRange(this.__original.length, this.__query.value.length);
				this.__query.focus();
	        }
		}
	}
};

/**
 * Called when the list of matches returned is empty. Default implementation will simply
 * hide the list of suggestions. Override for custom behavior.
 */
QuerySuggester.prototype.noSuggestions = function() {
    this.hide();
};

// modified by choong 10
QuerySuggester.prototype.show = function() {
    if (this.__tooltip && this.__query) {
    	if(!this.__isTooltipAbsolutePosition) {
			this.__tooltip.style.left = this.findPosX(this.__query) + "px";
			// added + 3 by choong10
			this.__tooltip.style.top = (this.findPosY(this.__query) + this.__query.offsetHeight + 3) + "px";
			this.__tooltip.style.width = this.__query.offsetWidth + "px";
    	}
		
		//this.__tooltip.style.visibility = "visible";
		this.__tooltip.style.display = "block";
		this.__showListenerFunc(true);
    }
};

QuerySuggester.prototype.hide = function() {
    if (this.__tooltip) {
		//this.__terms = new Array();
		
		//this.__tooltip.style.visibility = "hidden";   
		this.__tooltip.style.display='none';
		this.__showListenerFunc(false);
    }
};

// Text-selection helper-functions

QuerySuggester.prototype.canHandleRanges = function() {
    return this.__query.createTextRange || this.__query.setSelectionRange;
};

QuerySuggester.prototype.selectRange = function(from, to) {
	if(this.isDebug()) {
		this.debug(this.id + ":qs:selectRange:form='" + from + "'  to='" + to + "'");
	}
	/*
    if (this.__query.createTextRange) {
		var t = this.__query.createTextRange();
		//t.findText("character");
		//t.select();
    } else if (this.__query.setSelectionRange) {
        this.__query.setSelectionRange(from, to);
    } else {
        this.debug("Couldn't select range.");
    }*/
	this.__query.focus();
};

QuerySuggester.prototype.getCaretPosition = function() {
    if (document.selection) {
        var range = document.selection.createRange().duplicate();
        range.collapse(true);
        range.moveStart("character", -1000);
        return range.text.length;
    } else if (this.__query.setSelectionRange) {
        return this.__query.selectionStart;
    } else {
        this.debug("Couldn't find caret position.");
        return this.__query.value.length;
    }
};

QuerySuggester.prototype.clearInlineSuggestion = function() {
    if (this.__query && this.canHandleRanges() && this.clearInlineSuggestionBeforeSubmit) {
        this.__query.value = this.__query.value.substring(0, this.getCaretPosition());
    }
};

// General helper-functions


QuerySuggester.prototype.findPosX = function(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent && obj.className != "pageContainer") {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    } else if (obj.x)
        curleft += obj.x;
    return curleft;
};

QuerySuggester.prototype.findPosY = function(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent && obj.className != "pageContainer") {
            curtop += obj.offsetTop
        	//alert(curtop + "    " + obj.offsetTop);
            obj = obj.offsetParent;
        }
    } else if (obj.y) {
        curtop += obj.y;
    }
    return curtop;
};


QuerySuggester.prototype.isDebug = function() {
    return (this.__debugAreaBox) ? true : false;
};

QuerySuggester.prototype.debug = function(message) {
    if (this.__debugAreaBox) {
        this.__debugAreaBox.value += message + "\n";
    }
};

// Added by choong10
QuerySuggester.prototype.setSubmitFunc = function(submitFunc) {
    this.__submitFunc = submitFunc;
};


// Private members


// Global stuff




// Global mouse-handling function
function mouseOver(id, index) {
    if (id >= 0 && id < querySuggesters.length) {
        querySuggesters[id].mouseOver(index);
    }
}

// Global mouse-handling function
function mouseOut(id, index) {
    if (id >= 0 && id < querySuggesters.length) {
        querySuggesters[id].mouseOut(index);
    }
}

// Global mouse-handling function
function mouseClick(id, index) {
    if (id >= 0 && id < querySuggesters.length) {
        querySuggesters[id].mouseClick(index);
    } else if (id == -1 && index == -1) {
        for (var i = 0; i < querySuggesters.length; ++i) {
            querySuggesters[i].mouseClick(index);
        }
    }
}

function unexpectedKeywordClick(id, index) {
	if (id >= 0 && id < querySuggesters.length) {
        querySuggesters[id].unexpectedKeywordClick(index);
    }
}

