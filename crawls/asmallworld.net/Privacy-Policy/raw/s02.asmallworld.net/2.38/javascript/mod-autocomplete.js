//Modified version of the YUI AutoComplete widget.
//yui modifications used to add previous/next navigation features.


//Custom jQueryDataSource
var jQueryDataSource = function(uri){
	this.uri = uri;
	this._init();
}

jQueryDataSource.prototype = new YAHOO.widget.DataSource();
jQueryDataSource.prototype.scriptQueryParam = "query";
jQueryDataSource.prototype.scriptQueryAppend = "";
jQueryDataSource.prototype.doQuery = function(callback, query, parent){
	var uri = this.uri + "?" + this.scriptQueryParam + "=" + query;
	if(this.scriptQueryAppend.length > 0){
		uri += "&" + this.scriptQueryAppend;
	}
	var self = this;

	jQuery.getJSON(uri, function(data){
		var results = [];

		if(data && data.length > 0){      
			results = data;
			self.getResultsEvent.fire(self, parent, query, data);
		}else{
			self.dataErrorEvent.fire(self, parent, query, YAHOO.widget.DataSource.ERROR_DATANULL);
		}

		callback(query, results, parent);		
	});	
}

//previous value
YAHOO.widget.AutoComplete.prototype.prevValue = false;

//page the result set
YAHOO.widget.AutoComplete.prototype.currentPage = 0;
YAHOO.widget.AutoComplete.prototype.currentResults = [];
YAHOO.widget.AutoComplete.prototype.currentQuery = false;

//properties that regulate the previous and next buttons.
YAHOO.widget.AutoComplete.prototype.prevEnabled = false;
YAHOO.widget.AutoComplete.prototype.nextEnabled = false;
YAHOO.widget.AutoComplete.prototype.prevId = "arrow-prev";
YAHOO.widget.AutoComplete.prototype.nextId = "arrow-next";

YAHOO.widget.AutoComplete.prototype.arrowText = "";

//updates the previous and next buttons based on status
YAHOO.widget.AutoComplete.prototype.onUpdateArrows = function(){

	//<a id="{id}-link" ><img id="{id}-image" /></a>
	var prevLink = document.getElementById(this.prevId + "-link");
	var prevImage = document.getElementById(this.prevId + "-image");
	var nextLink = document.getElementById(this.nextId + "-link");
	var nextImage = document.getElementById(this.nextId + "-image");

	var oSelf = this;

	//enable/disable buttons
	if(this.prevEnabled){
		YAHOO.util.Event.removeListener(prevLink, "click");
		YAHOO.util.Event.addListener(prevLink, "click", oSelf.onPrevPage, oSelf);
		prevImage.src = static_server + "/images/autocomplete/" + this.arrowText + "arrow-enabled-up.gif";    
	}else{
		YAHOO.util.Event.removeListener(prevLink, "click");
		YAHOO.util.Event.removeListener(prevLink, "click", oSelf.onPrevPage);
		YAHOO.util.Event.addListener(prevLink, "click", function(event){
			YAHOO.util.Event.stopEvent(event);
		});
		prevImage.src = static_server + "/images/autocomplete/" + this.arrowText + "arrow-disabled-up.gif";
	}

	if(this.nextEnabled){
		YAHOO.util.Event.removeListener(nextLink, "click");
		YAHOO.util.Event.addListener(nextLink, "click", oSelf.onNextPage, oSelf);
		nextImage.src = static_server + "/images/autocomplete/" + this.arrowText + "arrow-enabled-down.gif";
	}else{
		YAHOO.util.Event.removeListener(nextLink, "click");
		YAHOO.util.Event.removeListener(nextLink, "click", oSelf.onNextPage);
		YAHOO.util.Event.addListener(nextLink, "click", function(event){
			YAHOO.util.Event.stopEvent(event);
		});
		nextImage.src = static_server + "/images/autocomplete/" + this.arrowText + "arrow-disabled-down.gif";
	}
}

//previous button click handler
YAHOO.widget.AutoComplete.prototype.onPrevPage = function(event, oAuto){
	//calculate current previous page
	var current = oAuto.currentPage;
	var results = oAuto.currentResults;
	var pages = Math.ceil(results.length / oAuto.maxResultsDisplayed);
	var next = current - 1;
	if(next > (pages-1)){
		next = (pages-1);
	}else if(next <= 0){
		next = 0;
	}
	var start = (next * oAuto.maxResultsDisplayed);
	var end = (start + oAuto.maxResultsDisplayed);    

	var group = [];
	for(var i = start; i < end; i++){
		group.push(results[i]);
	}

	//render the previous page
	oAuto.onRenderPage(group);

	oAuto.currentPage = next;  

	if(oAuto.currentPage > 0){
		oAuto.prevEnabled = true;
	}else{
		oAuto.prevEnabled = false;
	}

	if(oAuto.currentPage < pages){
		oAuto.nextEnabled = true;
	}else{
		oAuto.nextEnabled = false;
	}

	//update status of arrows
	oAuto.onUpdateArrows();  

	YAHOO.util.Event.stopEvent(event);
}

//next button click handler
YAHOO.widget.AutoComplete.prototype.onNextPage = function(event, oAuto){
	//calculate current next page

	var current = oAuto.currentPage;
	var results = oAuto.currentResults;
	var pages = Math.ceil(results.length / oAuto.maxResultsDisplayed);
	var next = current + 1;
	if(next > (pages-1)){
		next = (pages-1);
	}else if(next <= 0){
		next = 0;
	}
	var start = (next * oAuto.maxResultsDisplayed);
	var end = (start + oAuto.maxResultsDisplayed);  
	if(end > results.length){ end = results.length; }

	var group = [];
	for(var i = start; i < end; i++){
		group.push(results[i]);
	}

	//render the next page
	oAuto.onRenderPage(group);

	oAuto.currentPage = next;  

	if(oAuto.currentPage > 0){
		oAuto.prevEnabled = true;
	}else{
		oAuto.prevEnabled = false;
	}

	if(oAuto.currentPage < (pages-1)){
		oAuto.nextEnabled = true;
	}else{
		oAuto.nextEnabled = false;
	}

	//update status of arrows
	oAuto.onUpdateArrows();  

	YAHOO.util.Event.stopEvent(event);

}

// populate the ul list with the current result set
YAHOO.widget.AutoComplete.prototype.onRenderPage = function(aResults){
	var resultHTML;
	var sQuery = this.currentQuery;
	var sCurQuery = decodeURIComponent(sQuery);
	var nItems = Math.min(aResults.length, this.maxResultsDisplayed);
	this._nDisplayedItems = nItems;
	
	if(nItems > 0){
		var aItems = this._aListItems;

		//Fill items with data
		for(var i = nItems - 1; i >= 0; i--){
			var oItemi = aItems[i];
			var oResultItemi = aResults[i];
	  	oItemi.innerHTML = this.formatResult(oResultItemi, sCurQuery);
	  	oItemi.style.display = "list-item";
      oItemi._sResultKey = oResultItemi.name;
      oItemi._oResultData = oResultItemi;
		}

		//Empty out remining items if any
		for(var j = aItems.length - 1; j >= nItems; j--){
			var oItemj = aItems[j];
			oItemj.innerHTML = this.formatEmptyResult();
			oItemj.style.display = "list-item";
			oItemj._sResultKey = null;
			oItemj._oResultData = null;
		}

		// Expand the container
		var ok = this.doBeforeExpandContainer(this._elTextbox, this._elContainer, sQuery, aResults);
		this._toggleContainer(ok);

		if(this.autoHighlight){
			var oFirstItem = aItems[0];
			this._toggleHighlight(oFirstItem, "to");
			this.itemArrowToEvent.fire(this, oFirstItem);
			this._typeAhead(oFirstItem, sQuery);
		}else{
			this._oCurItem = null;
		}

	}
}

/* Modified YUI AutoComplete wrapper adds previous and next selection functionality. */

var modAutoComplete = {

	/* creates the modified autocomplete dropdown with navigation arrows */
	create : function(input, container, datasource, options){

		/* get element references */
		if(YAHOO.lang.isString(input)){
			input = document.getElementById(input);        
		}
		if(YAHOO.lang.isString(container)){
			container = document.getElementById(container);
		}

		/* create AutoComplete widget with options */
		var oAuto = new YAHOO.widget.AutoComplete(input, container, datasource);

		var prevValue = input.value;
		if(prevValue != ""){
			oAuto.prevValue = prevValue;
		}

		var index_id = (YAHOO.widget.AutoComplete._nIndex - 1);
		oAuto.prevId = "arrow-prev-" + index_id;
		oAuto.nextId = "arrow-next-" + index_id;
		
		if(typeof(options.arrowText) !== 'undefined' && options.arrowText != "") {
			oAuto.arrowText = options.arrowText;
		}

		oAuto.allowBrowserAutocomplete = false;
		oAuto.maxResultsDisplayed = options.pageSize;
		oAuto.minQueryLength = options.minQueryLength;
		oAuto.queryDelay = options.queryDelay;
		oAuto.useShadow = true;
		oAuto.autoHighlight = true;
		oAuto.forceSelection = options.forceSelection;
		oAuto.cityField = options.cityField;
		oAuto.regionField = options.regionField;
		oAuto.setRegion = options.setRegion;
		oAuto.scrollbarsToHide = options.scrollbarsToHide;
		oAuto.autocompleteType = options.autocompleteType;

		oAuto.highlightClassName = "autocomplete-highlight";

		/* setup initial css classes */
		YAHOO.util.Dom.addClass(input, "autocomplete-input");
		YAHOO.util.Dom.addClass(container, "autocomplete-container");

		/* add footer next/previous arrows */
		oAuto.setFooter(modAutoComplete.onGetFooter(oAuto));

		/* register listeners */
		oAuto.dataReturnEvent.subscribe(modAutoComplete.onDataReturn);
		oAuto.dataErrorEvent.subscribe(modAutoComplete.onDataError);
		oAuto.itemSelectEvent.subscribe(modAutoComplete.onItemSelect);
		oAuto.containerExpandEvent.subscribe(modAutoComplete.onContainerExpandEvent);
		oAuto.containerCollapseEvent.subscribe(modAutoComplete.onContainerCollapseEvent);
				
		/* handles per item formating */
		oAuto.formatResult = options.formatResult;
		oAuto.formatEmptyResult = modAutoComplete.onFormatEmptyResult;
		if(options.preRequest){
			oAuto.onPreRequest = options.preRequest;
		}

		return oAuto;
	},
	onDataReturn : function(type, args){
		var oAuto = args[0];
		var query = args[1];
		var results = args[2];
		
		/* update properties used by previous/next paging */
		oAuto.currentPage = 0;
		oAuto.prevEnabled = false;
		oAuto.nextEnabled = false;        

		if(results.length > oAuto.maxResultsDisplayed){
			oAuto.nextEnabled = true;
		}
		oAuto.currentResults = results;
		oAuto.currentQuery = query;
		oAuto.onUpdateArrows();

		if(results.length == 0){
			modAutoComplete.onFormatEmptyBody(oAuto);
		}
	},
	onItemSelect : function(type, args){
		var oAuto = args[0];
		var results = args[2];
		
		if (oAuto.autocompleteType && oAuto.autocompleteType == "member-selector") {
			jQuery("#member-list #" + results.id).click();
		} else {
	    var region = results.region;
	    oAuto._elTextbox.value += ", " + region;
	    if (oAuto.cityField) oAuto.cityField.value = results.name;    
	    if (oAuto.setRegion && oAuto.regionField) oAuto.regionField.value = region;
	    else oAuto.regionField.value = 'undefined';
		}
	},
	onContainerExpandEvent : function(oAuto){ 
	  if (this.scrollbarsToHide) {
	    hideFirefoxScrollbars(null, true, this.scrollbarsToHide);
		}
		hideDropdowns(true)
	},
	onContainerCollapseEvent : function(oAuto){ 
    if (this.scrollbarsToHide) {
      hideFirefoxScrollbars(null, false, this.scrollbarsToHide);
    }
		hideDropdowns(false)
	},
	onDataError : function(type, args){
		/* in case of errors from the source */
	},
	onFormatEmptyResult : function(){
		var html = [];
		html.push("<span class='autocomplete-item'>");
		html.push("&nbsp;");
		html.push("</span>");
		return html.join("");
	},
	onFormatName : function( name, query ){
		/* bolds the name based on the query */
		var n = name.toLowerCase();
		var q = query.toLowerCase();      
		var r = "";
		var i = n.indexOf(q);
		var e = q.length;
		if(i > -1){
			for(var j = 0; j < name.length; j++){
				if(j == i){ r += "<b>"; }
				if(j == e){ r += "</b>"; }
				r += name.charAt(j);
			}
		}else{
			r = name;
		}   
		return r;
	},
	onFormatEmptyBody : function(oAuto){
		var html = [];
		html.push("<span class='autocomplete-empty'>None Found</span>");        
		oAuto.setBody(html.join(""));
	},
	onGetFooter : function(oAuto){
		/* adds the previous and next buttons */

		var html = [];

		html.push("<div class='autocomplete-previous'>");
		html.push("<a id='"+ oAuto.prevId + "-link' href='javascript:void(0);'>");
		html.push("<img id='"+ oAuto.prevId +"-image' src='"+ static_server +"/images/autocomplete/" + oAuto.arrowText + "arrow-disabled-up.gif' caption='previous' />");
		html.push("</a>");
		html.push("</div>");
		html.push("<div class='autocomplete-next'>");
		html.push("<a id='"+ oAuto.nextId +"-link' href='javascript:void(0);'>");
		html.push("<img id='"+ oAuto.nextId +"-image' src='"+ static_server +"/images/autocomplete/" + oAuto.arrowText + "arrow-disabled-down.gif' caption='next' />");
		html.push("</a>");
		html.push("</div>");

		return html.join("");
	}
};