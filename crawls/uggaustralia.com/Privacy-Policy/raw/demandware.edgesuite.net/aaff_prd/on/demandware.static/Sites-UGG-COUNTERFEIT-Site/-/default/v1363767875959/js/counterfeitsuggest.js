/*
 * All java script logic for the search suggestions.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */

(function(app){
	if (app) {
		// add counterfeitsuggest to namespace
		app.counterfeitsuggest = {
			// configuration parameters and required object instances
			acListTotal   :  0,
			acListCurrent : -1,
			acDelay       : 300,
			acURL         : null,
			acFormId      : null,
			acSearchId	  : null,
			acResultsId	  : null,
			acHiddenFieldId : null,
			acSearchField : null,
			acHiddenField : null,
			acResultsDiv  : null,
			fieldDefault  : null,
			suggestionsJson: null,
			
			init : function(fieldId, hiddenFieldId, resultsId, url) {
				// initialize vars
				/*app.counterfeitsuggest.acFormId = "#" + formId;*/
				/*app.counterfeitsuggest.fieldDefault = fieldDefault;*/
				app.counterfeitsuggest.acSearchId = "#" + fieldId;
				app.counterfeitsuggest.acHiddenFieldId = "#" + hiddenFieldId;
				app.counterfeitsuggest.acResultsId = "#" + resultsId;
				app.counterfeitsuggest.acURL = url;
				
				// disable browser auto comlete
				app.util.disableAutoComplete(fieldId);
				
				// create the results div
				jQuery(".cwlookupinputbox").append("<div id=\"" + resultsId + "\"></div>");
			
				// register mostly used vars (jQuery object)
				app.counterfeitsuggest.acSearchField = jQuery(app.counterfeitsuggest.acSearchId);
				app.counterfeitsuggest.acHiddenField = jQuery(app.counterfeitsuggest.acHiddenFieldId);
				app.counterfeitsuggest.acResultsDiv = jQuery(app.counterfeitsuggest.acResultsId);
			
				// reposition div
				app.counterfeitsuggest.repositionResultsDiv();
			
				// on blur listener
				app.counterfeitsuggest.acSearchField.blur(function(){ setTimeout("app.counterfeitsuggest.clear()", 200) });
			
				// on key up listener
				app.counterfeitsuggest.acSearchField.keyup(function(e) {
					// get keyCode (window.event is for IE)
					var keyCode = e.keyCode || window.event.keyCode;
					var lastVal = app.counterfeitsuggest.acSearchField.val();
					
					// check an treat up and down arrows
					if(app.counterfeitsuggest.updownArrow(keyCode)){ 
						
						return;
					}
					
					// check for an ENTER or ESC
					if(keyCode == 13 || keyCode == 27) {
						app.counterfeitsuggest.clear();
						return;
					}
					
					app.counterfeitsuggest.acHiddenField.val("http://" + lastVal.replace('www.',''));
					// if is text, call with delay
					setTimeout(function() { app.counterfeitsuggest.suggest(lastVal) }, app.counterfeitsuggest.acDelay);
				});
				
				// on focus listener (clear default value)
				/*app.counterfeitsuggest.acSearchField.focus(function() {
					var val = app.counterfeitsuggest.acSearchField.val();
					if(val == app.counterfeitsuggest.fieldDefault)
					{
						app.counterfeitsuggest.acSearchField.val("");
					}
				});*/
				
				// on submit we do not submit the form, but change the window location
				// in order to avoid https to http warnings in the browser
				// only if it's not the default value and it's not empty
				/*jQuery(app.counterfeitsuggest.acFormId).submit(function() {
					var searchUrl = jQuery(app.counterfeitsuggest.acFormId).attr("action");
					var searchTerm = app.counterfeitsuggest.acSearchField.val();		
					if (searchTerm != app.counterfeitsuggest.fieldDefault && searchTerm != '') {
						window.location = app.util.appendParamToURL(searchUrl, "q", searchTerm);
					}
					return false;					
				});*/
			},
			
			// trigger suggest action
			suggest : function(lastValue)
			{
				// get the field value
				var part = app.counterfeitsuggest.acSearchField.val();
				
				// if it's empty clear the resuts box and return
				if(part == "") {
					app.counterfeitsuggest.clear();
					return;
				}
			
				// if it's equal the value from the time of the call, allow
				if(lastValue != part) {
					return;
				}
				
				// build the request url
				var reqUrl = app.util.appendParamToURL(app.counterfeitsuggest.acURL, "lookup", part);

				// get remote data as JSON
				jQuery.getJSON(reqUrl, function(json) {
					// get the total of results
					var ansLength = app.counterfeitsuggest.acListTotal = json.suggestions.length;
					
					// if there are results populate the results div
					if(ansLength > 0) {
			
						var newData = "";
						// create a div for each result
						for(i=0; i < ansLength; i++) {
							newData += "<div class=\"unselected\"><div class=\"suggestionterm\">" + json.suggestions[i].suggestion + "</div></div>";
						}
						app.counterfeitsuggest.suggestionsJson = json.suggestions;
						// update the results div
						app.counterfeitsuggest.acResultsDiv.html(newData);
						app.counterfeitsuggest.acResultsDiv.css("display","block");
						// reposition in case user resizes browser between searches
						app.counterfeitsuggest.repositionResultsDiv();
						
						// for all divs in results
						var divs = jQuery(app.counterfeitsuggest.acResultsId + " > div");
						
						// on mouse over clean previous selected and set a new one
						divs.mouseover( function() {
							divs.each(function(){ this.className = "unselected"; });
							this.className = "selected";
						});
						
						// on click copy suggestion to search field, hide the list and submit the search
						divs.each(function(i){
							jQuery(this).click( function() {
								app.counterfeitsuggest.acSearchField.val(app.counterfeitsuggest.suggestionsJson[i].suggestion);
								app.counterfeitsuggest.acHiddenField.val("http://" + app.counterfeitsuggest.suggestionsJson[i].suggestion);
								app.counterfeitsuggest.clear();
								/*jQuery(app.counterfeitsuggest.acFormId).submit();*/
							})
						});
					} else {
						app.counterfeitsuggest.clear();
					}
				});
			},
			
			// clear suggestions
			clear : function()
			{
				app.counterfeitsuggest.acResultsDiv.html("");
				app.counterfeitsuggest.acResultsDiv.css("display","none");
			},
			
			// reposition the results div accordingly to the search field
			repositionResultsDiv : function()
			{
				// get the input position
				var inPos = app.counterfeitsuggest.acSearchField.offset();
				var inTop = inPos.top;
				var inLeft = inPos.left;
				
				// get the field size
				var inHeight = app.counterfeitsuggest.acSearchField.height();
				var inWidth = app.counterfeitsuggest.acSearchField.width();
				
				// apply the css styles
				app.counterfeitsuggest.acResultsDiv.addClass("lookup_suggestions");
				//app.counterfeitsuggest.acResultsDiv.css("position","absolute");
				//app.counterfeitsuggest.acResultsDiv.css("left", inLeft + 7); // to tweak
				//app.counterfeitsuggest.acResultsDiv.css("top", inTop + inHeight + 3);
				//app.counterfeitsuggest.acResultsDiv.css("width", inWidth - 2); // to tweak
				//app.counterfeitsuggest.acResultsDiv.css("z-index", "7777");
			},
			
			// treat up and down key strokes defining the next selected element
			updownArrow : function(keyCode) {
				if(keyCode == 40 || keyCode == 38) {
					if(keyCode == 38) { // keyUp
						if(app.counterfeitsuggest.acListCurrent == 0 || app.counterfeitsuggest.acListCurrent == -1) {
							app.counterfeitsuggest.acListCurrent = app.counterfeitsuggest.acListTotal-1;
						} else {
							app.counterfeitsuggest.acListCurrent--;
						}
					} else { // keyDown
						if(app.counterfeitsuggest.acListCurrent == app.counterfeitsuggest.acListTotal-1) {
							app.counterfeitsuggest.acListCurrent = 0;
						} else {
							app.counterfeitsuggest.acListCurrent++;
						}
					}
					
					// loop through each result div applying the correct style
					app.counterfeitsuggest.acResultsDiv.children().each(function(i) {
						if(i == app.counterfeitsuggest.acListCurrent) {
							app.counterfeitsuggest.acSearchField.val(app.counterfeitsuggest.suggestionsJson[i].suggestion);
							app.counterfeitsuggest.acHiddenField.val("http://" + app.counterfeitsuggest.suggestionsJson[i].suggestion);
							this.className = "selected";
						} else {
							this.className = "unselected";
						}
					});
					return true;
				} else {
					// reset
					app.counterfeitsuggest.acListCurrent = -1;
					return false;
				}
			}
		} // end counterfeitsuggest
	} else {
		// namespace has not been defined yet
		alert("app namespace is not loaded yet!");
	}
})(app);