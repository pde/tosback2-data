/* this file to be pulled in via a script tag at ft.com 
 * we should set max-age cache header to about an hour on this dir
 * 
 */

var SymbolSearch = function(elForm) {
	
	this.localCache = {};
	this.eventManager = new EventManager();
	this.query = "";
	this.issueType = "";
	this.isPortfolio = false; //isPortfolio = Excluding US mutual funds from only portfolio symbol search
	
	this.setDestinationURL(this.DESTINATION_URL);
	this.setRequestURL(this.REQUEST_URL);
	this.setFinderURL(this.FINDER_URL);
	
	if (elForm || Element.get(this.DEFAULT_FORM_ID)) {
		// DOM has loaded
		this.setForm(elForm);
	}
	else {
		this.eventManager.add(window, "load", function() { this.setForm(elForm) }, this);
	}
};

SymbolSearch.prototype.DEFAULT_FORM_ID = "wsod-symbolSearch";
SymbolSearch.prototype.FORM_INPUT_SELECTOR = "input[name='s'],input[name='query']";

SymbolSearch.prototype.REQUEST_URL = "/ft/symbolSearch/data/getSymbols.asp";
SymbolSearch.prototype.DESTINATION_URL = "";
SymbolSearch.prototype.FUND_DESTINATION_URL = "http://funds.ft.com/UK/Tearsheet/Summary?s=";
SymbolSearch.prototype.FINDER_URL = "/ft/markets/finder.asp";
SymbolSearch.prototype.KEY_PRESS_WAIT = 0;

SymbolSearch.prototype.CSS_HIDDEN = "symbolSearchHidden";
SymbolSearch.prototype.CSS_SELECTED = "selected";
SymbolSearch.prototype.CSS_RESULTS = "symbolSearch";
SymbolSearch.prototype.CSS_ISSUE_NAME = "issueName";
SymbolSearch.prototype.CSS_GROUP_END = "symbolSearchGroupEnd";
SymbolSearch.prototype.CSS_FLAG = "wsod-flag";
SymbolSearch.prototype.CSS_FLAG_COUNTRY = "flag-";
SymbolSearch.prototype.CSS_MORE_LINK = "more";
SymbolSearch.prototype.CSS_MORE_SEARCH_RESULTS = "searchResultsMoreLink";

SymbolSearch.prototype.ATTR_NO_RESULTS = "noresults";

SymbolSearch.prototype.KEY_CODE_UP = 38;
SymbolSearch.prototype.KEY_CODE_DOWN = 40;
SymbolSearch.prototype.KEY_CODE_ESC = 27;
SymbolSearch.prototype.KEY_CODE_ENTER = 13;

SymbolSearch.prototype.invalidChars = /\s/g;
SymbolSearch.prototype.countryPrefix = /^[a-z]{2}\:/i;

SymbolSearch.prototype.setForm = function(elForm) {
	this.clearInputEventHandlers();
	
	this.elForm = elForm || Element.get(this.DEFAULT_FORM_ID);
	this.elInput = Element.parseSelector(this.FORM_INPUT_SELECTOR, this.elForm, "first");
	
	this.addInputEventHandlers();
};

SymbolSearch.prototype.addInputEventHandlers = function() {
	this.eventManager.add(this.elInput, "keyup", this.search, this, null, this.KEY_PRESS_WAIT);
	this.eventManager.add(this.elInput, "click", function(e) {
		e.cancel();
	});
};

SymbolSearch.prototype.clearInputEventHandlers = function() {
	if (this.elInput) {
		this.eventManager.remove(this.elInput);
	}
};

SymbolSearch.prototype.addResultEvents = function(noResults) {
	this.selectedRow = -1;
	
	if (!noResults) {
		this.getOnNavResults().addElement(this.elInput);
		this.getOnHoverResults().addElement(this.elResultRows);
		this.getOnClickResults().addElement(this.elResultRows);
	}
	
	this.getOnHideResults().addElement(document);
	this.getOnSubmitResults().addElement(this.elInput);
	this.getOnChangeInput(true).addElement(this.elInput);
	
	if (this.moreResultsPopupMode() && this.elMoreResults){
		this.getOnMoreLinkResults().addElement(this.elMoreResults);
	}	
};

SymbolSearch.prototype.removeResultEvents = function() {	
	this.getOnNavResults().removeAllElements();
	this.getOnHoverResults().removeAllElements();
	this.getOnClickResults().removeAllElements();
	this.getOnHideResults().removeAllElements();
	this.getOnSubmitResults().removeAllElements();
	this.getOnChangeInput(true).removeAllElements();
	this.getOnMoreLinkResults().removeAllElements();
};

SymbolSearch.prototype.attachResizeEvent = function() {
	WSDOM.Events.add(window, "resize", this.repositionResults, this);
}

SymbolSearch.prototype.repositionResults = function() {
	if (this.resizeTimeout) { clearTimeout(this.resizeTimeout); }
	
	var ss = this;

	this.resizeTimeout = setTimeout(function() {
		if (ss.localCache[ss.query + ss.issueType]) {
			ss.drawResults(ss.localCache[ss.query + ss.issueType]);
		}
	}, 200);
}

SymbolSearch.prototype.getOnChangeInput = function(cancelNative) {
	var eventSourceCancel = this.eventManager.add(null, "change", this.delayChangeEvent, this, true);
	var eventSourcePassThrough = this.eventManager.add(null, "change", this.delayChangeEvent, this);
	
	this.getOnChangeInput = function(cancelNative) {
		if (cancelNative) {
			return eventSourceCancel;
		}
		return eventSourcePassThrough;
	};
	
	return this.getOnChangeInput(cancelNative);
};

SymbolSearch.prototype.delayChangeEvent = function(e, el, cancelNative) {
	if (cancelNative) {
		e.cancel();
	}
};

SymbolSearch.prototype.getOnNavResults = function() {
	var eventSource = this.eventManager.add(null, "keydown", this.navigate, this);
	this.getOnNavResults = function() {
		return eventSource;
	};
	
	return this.getOnNavResults();
};

SymbolSearch.prototype.getOnHoverResults = function() {
	var eventHandler = function(e, el) {
		this.highlightRow(el.rowIndex);

	};
	var eventSource = this.eventManager.add(null, "mouseover", eventHandler, this);
	this.getOnMouseOverResults = function() {
		return eventSource;
	};
	
	return this.getOnMouseOverResults();
};
SymbolSearch.prototype.getOnHideResults = function() {
	var eventSource = this.eventManager.add(null, "click", this.clearResults, this);

	this.getOnHideResults = function() {
		return eventSource;
	};
	
	return this.getOnHideResults();
};
SymbolSearch.prototype.getOnClickResults = function() {
	var eventSource = this.eventManager.add(null, "click", this.selectResult, this);
	this.getOnClickResults = function() {
		return eventSource;
	};
	
	return this.getOnClickResults();
};
SymbolSearch.prototype.getOnSubmitResults = function() {
	var eventSource = this.eventManager.add(null, "keypress", this.selectResult, this);
	this.getOnSubmitResults = function() {
		return eventSource;
	};
	
	return this.getOnSubmitResults();
};
SymbolSearch.prototype.setRequestor = function(requestor) {
	this.requestor = requestor;
};
SymbolSearch.prototype.setDestinationURL = function(URL) {
	this.destinationURL = URL;
};

SymbolSearch.prototype.setRequestURL = function(URL) {
	this.requestURL = URL;
};
SymbolSearch.prototype.setFinderURL = function(URL) {
	this.finderURL = URL;
};

SymbolSearch.prototype.highlightText = function(c) {
	var sTermArray = String(this.query).replace(this.countryPrefix, "").split(" ");
	var sTermLen = sTermArray.length;
	
	if (c.n.indexOf(" ")) {
		var coName = c.n.split(" ");
		var coNameLen = coName.length;
	} else {
		var coName = c.n;
		var coNameLen = 1;
	}
	
	if(sTermLen == 1){
		var replacement = '<b>$1</b>';
		var re = new RegExp("\\b(" + sTermArray + ")", "gi");
		c.d = String(c.s).replace(re, replacement);
		c.n = String(c.n).replace(re, replacement);
	} else {
		for (var i = 0; i < coNameLen; i++) {
			var coNamePart = coName[i];
			if(!coNamePart.length){
				continue;
			}
			for(var z = 0; z < sTermLen; z++){
				var term = sTermArray[z].replace(/\s/g, "");
				var termLen = term.length;
				if (termLen && term.toLowerCase() == coNamePart.toLowerCase().substring(0, termLen)) {
					coName[i] = '<b>' + coNamePart.substring(0, termLen) + '</b>' + coNamePart.substring(termLen);
					z = sTermLen;
				}
			}
			
			c.n = coName.join(' ');
		}
	}
	
	return c;
};

SymbolSearch.prototype.ISSUE_TYPES = {
	ALL: "",
	EQ: "EQ",
	ETF: "ETF",
	MF: "MF",
	IN: "IN"
};

SymbolSearch.prototype.setIssueType = function(type) {
	this.issueType = type;
};

SymbolSearch.prototype.search = function(e, el) {
	if (el.value == this.query) {
		return;
	}	

	else if (!String(el.value).replace(this.invalidChars, "")) {
		this.query = el.value;
		this.clearResults();

	}
	else {
		this.abortActiveRequests();
		this.query = el.value;
		if (this.localCache[this.query + this.issueType]) {
			this.drawResults(this.localCache[this.query + this.issueType]);

		}
		else {
			this.requestor.load({
				url: this.requestURL,
				contentType: "text/javascript",
				data: { q: this.query, issueType: this.issueType, callback: "handleResults", context: "this", isPortfolio: this.isPortfolio }, //isPortfolio = Excluding US mutual funds from only portfolio symbol search
				context: this
			});
		}
	}	

};

SymbolSearch.prototype.handleResults = function(query, results, showMoreLink) {
	var cachedNodes = [];
	var elTable = Element.create("table");
	
	for (var i=0,group; i<results.length; i++) {
		group = results[i];
		if (group.length) {
			var elTbody = Element.create("tbody"); 
			
			for (var j=0,c; j<group.length; j++) {
				c = this.highlightText(group[j]);
				
				var elFlag = Element.create("div");
				Element.addClass(elFlag, this.CSS_FLAG);
				Element.addClass(elFlag, this.CSS_FLAG_COUNTRY + c.c);
		
				var elRow = Element.create("tr", { symbol: c.s, isfund: c.f }, [
					Element.create("td", { "class": this.CSS_ISSUE_NAME }, c.n),
					Element.create("td", null, elFlag),
					Element.create("td", null, c.d)
				], elTbody);
				
				if (group.length-1 == j && (results.length -1 != i || showMoreLink)) {
					Element.addClass(elRow, this.CSS_GROUP_END);
				}

			}
			Element.addChild(elTable, elTbody);
		}
	}
	
	if (showMoreLink) {
		Element.create("tbody", null, [
			Element.create("tr", { "class": this.CSS_MORE_LINK }, [
				Element.create("td", { "colspan":3 }, [
					Element.create("a", { "class":this.CSS_MORE_SEARCH_RESULTS, href: this.moreResultsPopupMode() ? "#" : this.buildMoreLink() }, "Additional matches for " + query + " &gt;")
				])
			])
		], elTable);	
	}
	
	if (!elTable.childNodes.length) {
		Element.create("tbody", null, [
			Element.create("tr", { "class": this.CSS_GROUP_END }, [
				Element.create("td", null, "No securities were found for \"<b>" + query + "</b>\".<br />Try symbol lookup for a more advanced search.")
			])
		], elTable);
		elTable.setAttribute(this.ATTR_NO_RESULTS, "true");
	}
	
	cachedNodes.push(elTable);
	this.localCache[query + this.issueType] = cachedNodes;
	
	this.drawResults(cachedNodes);
	
};

SymbolSearch.prototype.createResultsContainer = function() {
	this.elResults = Element.create("div", { "class": this.CSS_HIDDEN }, null, document.body);
	Element.addClass(this.elResults, this.CSS_RESULTS);
};


SymbolSearch.prototype.drawResults = function(cachedNodes) {
	this.clearResults();
	
	if (!this.elResults) {
		this.createResultsContainer(); 

	}

	var pos = Element.getXY(this.elInput);
	var size = Element.getSize(this.elInput);
	
	Element.setXY(this.elResults, pos.x, pos.y + size.height);
	
	Element.removeClass(this.elResults, this.CSS_HIDDEN);
	for (var i=0; i<cachedNodes.length; i++) {
		Element.addChild(this.elResults, cachedNodes[i]);
	}
	this.elResultRows = Element.parseSelector("tr", this.elResults);
	this.elMoreLink = Element.parseSelector("tr." + this.CSS_MORE_LINK + " a", this.elResults, "first");
	this.elMoreResults = Element.parseSelector("a.searchResultsMoreLink", this.elResults, "first");
	
	this.addResultEvents(cachedNodes[0].getAttribute(this.ATTR_NO_RESULTS));
	
	WCH.Apply(this.elResults, null, true);
};


SymbolSearch.prototype.clearResults = function() {
	if (!this.elResults) {
		return;

	}
	if (this.elResultRows && this.elResultRows.length) {
		Element.removeClass(this.elResultRows, this.CSS_SELECTED);
	}
	Element.addClass(this.elResults, this.CSS_HIDDEN);
	Element.removeChildNodes(this.elResults);
	this.removeResultEvents();
	WCH.Discard(this.elResults);
};

SymbolSearch.prototype.buildMoreLink = function() {
	// var URL = this.finderURL + "?query=" + this.query;
	var URL = this.finderURL + "?time=" + new Date().getTime() + "&query=" + escape(this.query);

	if (this.issueType) {
		if ('IN' == this.issueType) {
			URL += "&view=markets&issueType=" + this.issueType;
		}
		else {
			URL += "&issueType=" + this.issueType;
		}
	}
	
	return URL;
};

SymbolSearch.prototype.navigate = function(e) {
	switch (e.nativeEvent.keyCode) {
		case this.KEY_CODE_DOWN :
			e.cancel();
			var rowIdx = Math.min(this.selectedRow + 1, this.elResultRows.length-1);
			this.highlightRow(rowIdx);
			break;
		
		case this.KEY_CODE_UP :
			e.cancel();
			var rowIdx = Math.max(this.selectedRow - 1, -1);
			this.highlightRow(rowIdx);
			break;
		
		case this.KEY_CODE_ESC :
			e.cancel();
			this.clearResults();
			break;
	}

};

SymbolSearch.prototype.highlightRow = function(rowIdx) {
	if (this.selectedRow != rowIdx) {
		if (this.elResultRows[this.selectedRow]) {
			Element.removeClass(this.elResultRows[this.selectedRow], this.CSS_SELECTED);		
		}
		if (this.elResultRows[rowIdx]) {

			Element.addClass(this.elResultRows[rowIdx], this.CSS_SELECTED)
		}
		
		this.selectedRow = rowIdx;
	}

};

SymbolSearch.prototype.selectResult = function(e) {
	if ("click" == e.nativeEvent.type || this.KEY_CODE_ENTER == e.nativeEvent.keyCode) {
		e.cancel();

		if (this.selectedRow == -1) {
			if (this.elResultRows && 1 == this.elResultRows.length) {
				// only one result, set it as selected
				this.selectedRow = 0;
			}
			else {
				// multiple results, just submit the form
				this.go(this.elInput.value);
				return;
			}
		}
		else {
			if (Element.hasClass(this.elResultRows[this.selectedRow], this.CSS_MORE_LINK)) {
				// more link clicked
				window.location = this.elMoreLink.href;
				return;
			}
		}
		
		// go to selected row
		this.go(
			this.elResultRows[this.selectedRow].getAttribute("symbol"), 
			(this.elResultRows[this.selectedRow].getAttribute("isfund") == "1")
		);
		
	}
};

SymbolSearch.prototype.setInputValue = function(value) {
	this.elInput.value = value;
	
	var onChangeInput = this.getOnChangeInput();
	onChangeInput.addElement(this.elInput);
	onChangeInput.fire();
	onChangeInput.removeAllElements();
};

SymbolSearch.prototype.go = function(symbol, isFund) {
	if (symbol) {
		this.query = symbol;
		this.setInputValue(symbol);
	}
	
	if (isFund) {
		window.location = this.FUND_DESTINATION_URL + this.query;
	}
	else {
		this.elForm.action = this.destinationURL;
		this.elForm.submit();
	}
	
	this.clearResults();
	
};

SymbolSearch.prototype.abortActiveRequests = function() {
	this.requestor.abortRequests();

};

// The following functions have been added to allow the "more results" piece to load in a popup rather than a separate page.
// This has a dependancy on /resources/client/markets/Finder.asp

SymbolSearch.prototype.MORE_RESULTS_URL = "/ft/markets/data/getFinderResults.asp?charts=true";

SymbolSearch.prototype.moreResultsPopupMode = function(enable) {
	var mode = enable ? enable : false;
	
	this.moreResultsPopupMode = function() {
		return mode;
	}
	
	return this.moreResultsPopupMode();
}

SymbolSearch.prototype.getOnMoreLinkResults = function() {
	var eventSource = this.eventManager.add(null, "click", this.getMoreResults, this);
	this.getOnMoreLinkResults = function() {
		return eventSource;
	};
	return this.getOnMoreLinkResults();
};

SymbolSearch.prototype.getMoreResults = function(e, el) {
	e.cancel();
	
	//this.showLoading();
	this.getBuffer().abortRequests();
	this.getBuffer().load({
		url: this.MORE_RESULTS_URL,
		data: {
			params: this.getFormSerializer().serialize(this.elForm)
		},
		onload: this.moreResultsHandler,
		onerror: this.drawError,
		context: this
	});
};

SymbolSearch.prototype.getBuffer = function() {
	var cb = new ContentBuffer();
	
	this.getBuffer = function() {
		return cb;
		
	};
	
	return this.getBuffer();
};

SymbolSearch.prototype.getFormSerializer = function() {
	var fs = new FormSerializerLite();
	
	this.getFormSerializer = function() {
		return fs;
	};
	
	return this.getFormSerializer();
};

SymbolSearch.prototype.moreResultsHandler = function(cb){
	if(cb){		
		if(!this.popup)
			this.popup = new Popup();
		this.popup.allowOthers(true);
		this.popup.clearContent();
		Element.setHTML(this.popup.getContent(), cb.getResult());
		this.popup.getContent().setAttribute('id', 'searchResults');
		Element.addClass(this.popup.getContent(), 'searchResults');
		Element.addClass(this.popup.getFrame(), 'moreResults');		
		this.popup.setTitleText('Search Results');
		this.popup.draw();
		if(!this.finder){ this.finder = new Finder(); }
		this.clearResults();
		var callback = this.moreResultsHandlerCallback();
		if (callback) { callback(this.popup, this.popup.getContent()); }
		this.finder.initResultEvents();
	}	
}

SymbolSearch.prototype.moreResultsHandlerCallback = function(handler, context) {
	var f = context ? handler.Context(context) : handler ? handler : null;
	
	this.moreResultsHandlerCallback = function() {
		return f;
	}
	
	this.moreResultsHandlerCallback();
}