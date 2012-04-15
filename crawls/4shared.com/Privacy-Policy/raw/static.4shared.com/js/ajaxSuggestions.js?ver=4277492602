/*
	AJAX Suggestions is developed by Robert Nyman, http://www.robertnyman.com, and it is released according to the
	Creative Commons Deed license (http://creativecommons.org/licenses/GPL/2.0/)
	For more information, please see http://www.robertnyman.com/ajax-suggestions
*/
// ---
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
var ajaxSuggestions = {
	// Settings
	elmIdToPresentResultsIn : "search-results",
	elmIdResultsContainer : "search-result-suggestions",
	charactersBeforeSearch : 0,
	timeBeforeSuggest : 300, // In milliseconds
	sameWidthAsInputElm : false,
	offsetLeft: 0,
	offsetTop : 0,
	urlExt : "search=",
	addSearchTermToQueryString : true,
	addKeyNavigationEvents : true,
	hideResultsOnDocumentClick : true,
	enabled : true,
	itemClassName : "item",
	itemSelectedClassName : "selected",
	itemInsertValueIntoInputClassName : "choose-value",
	itemInsertValueSetFocusToInput : true,
	hideResultsWhenInsertValueIsSelected : true,
	itemSeparator : ";",
	turnAutoCompleteOff : true,
	// Object properties
	xmlHttp : null,
	elements : [],
	timer : null,
	currentElm : null,
	currentKeyEvent : null,
	suggestionsForElm : null,
	elmToPresentResultsIn : null,
	elmResultsContainer : null,
	suggestions : [],
	resultIndex : 0,
	selectedItem : -1,
	resultsAreVisible : false,
	valueAddedFromResultsListToInput : true,
  suggestionsText:'Suggestions',
  closeText:'Close',
    jsonSuggestions: [],

	init : function (){
		this.xmlHttp = this.createXmlHttp();
		if(this.xmlHttp){
			if(typeof document.getElementsByClassName != "function"){
				document.getElementsByClassName = this.elmByClass;
			}
			this.elements = document.getElementsByClassName("ajax-suggestion", "input");
			this.applyEvents();
			this.elmToPresentResultsIn = document.getElementById(this.elmIdToPresentResultsIn);
			this.elmResultsContainer = document.getElementById(this.elmIdResultsContainer);
			if(this.addKeyNavigationEvents){
				this.addEvent(document, "keydown", this.navigateResults);
				this.addEvent(document, "keypress", this.preventDefaultForArrowKeys);
				this.addEvent(document, "keyup", this.preventDefaultForArrowKeys);
			}
			if(this.hideResultsOnDocumentClick){
				this.addEvent(document, "click", this.clearResultsElement);
			}
		}
	},
	
	createXmlHttp : function (){
		this.xmlHttp = null;
		if(typeof XMLHttpRequest != "undefined"){
			this.xmlHttp = new XMLHttpRequest();
		}
		else if(typeof window.ActiveXObject != "undefined"){
			try {
				this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
			}
			catch(e){
				try {
					this.xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
				}
				catch(e){
					try {
						this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch(e){
						this.xmlHttp = null;
					}
				}
			}
		}
		return this.xmlHttp;
	},
	
	applyEvents : function (){
		var element;
		for(var i=0; i<this.elements.length; i++){
			element = this.elements[i];
			if(this.turnAutoCompleteOff){
				element.setAttribute("autocomplete", "off");
			}
			this.addEvent(element, "keyup", this.startSuggestionsTimer);
			if(this.hideResultsOnDocumentClick){
				this.addEvent(element, "click", this.preventInputClickBubbling);
			}
		}
	},
	
	startSuggestionsTimer : function (evt){
    if(!ajaxSuggestions.enabled) return;
//    alert(evt.keyCode);
    if(!/13|27|40|37|38/.test(evt.keyCode)){
      clearTimeout(ajaxSuggestions.timer);
      ajaxSuggestions.currentElm = (/input/i.test(this.nodeName))? this : evt.srcElement;
      ajaxSuggestions.currentKeyEvent = evt.keyCode;
      ajaxSuggestions.timer = setTimeout("ajaxSuggestions.getSuggestions()", ajaxSuggestions.timeBeforeSuggest);
    }
	},
	
	getSuggestions : function (){
		var value = this.currentElm.value;
		if(!/13|27|38|37|40/.test(this.currentKeyEvent)){
      var url = '/network/search-suggest.jsp';
//			var url = this.currentElm.className.replace(/.*url-([\w\/\?\.-]+).*/, "$1");
			if(!this.valueAddedFromResultsListToInput){
				ajaxSuggestions.clearResults(true);
			}
			if(value.length > this.charactersBeforeSearch && url.length > 0){
				this.makeSuggestionCall(value, url);
			}
			else if(value.length == 0 || !this.valueAddedFromResultsListToInput){
				ajaxSuggestions.clearResults();
			}
		}
	},
	
	makeSuggestionCall : function (value, url){
		var regExpValue = new RegExp(("^" + value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "$"), "i");
		var exists = false;
		var suggestionItem;
		var url = url + ((/\?/.test(url))? "&" : "?") + this.urlExt + ((this.addSearchTermToQueryString)? Base64.encode(value) : "");
		for(var i=0; i<this.suggestions.length; i++){
			suggestionItem = this.suggestions[i];
			if(regExpValue.test(suggestionItem[0]) && url == suggestionItem[2]){
				exists = true;
				this.resultIndex = i;
				this.presentResult(this.suggestions[i][1]);
				break;
			}
		};
		if(!exists){
			/*this.xmlHttp.onreadystatechange = function (){};
			this.xmlHttp.abort();
			this.currentValue = value;
			this.currentURL = url;
			this.xmlHttp.open("GET", url, true);
			this.xmlHttp.onreadystatechange = this.getResults;
			this.xmlHttp.send(null);*/
            this.createTag(url);
		}
	},
    scriptCounter : 0,
    searchBase : "",
    createTag: function (url) {
        this.headLoc = document.getElementsByTagName("head").item(0);
        this.scriptId = 'JscriptId' + ajaxSuggestions.scriptCounter++;
        this.scriptObj = document.createElement("script");
        this.scriptObj.setAttribute("type", "text/javascript");
        this.scriptObj.setAttribute("charset", "utf-8");
        this.scriptObj.setAttribute("src", this.searchBase+url+"&format=jsonp");
        this.scriptObj.setAttribute("id", this.scriptId);

        this.headLoc.appendChild(this.scriptObj);
    },

    jsonpCallback: function(jsonData) {
        //alert(jsonData.suggestions.length);
        this.resultIndex = this.suggestions.length;
        this.suggestions.push([this.currentValue, this.buildText(jsonData.suggestions), this.currentURL]);
        ///this.suggestions = jsonData.suggestions;
        this.headLoc.removeChild(this.scriptObj);
        if(jsonData.suggestions.length > 0) {
          this.presentResult();
        } else {
            this.clearResults();
        }
    },

    buildText : function(suggest) {
        this.jsonSuggestions = suggest;
        var res = "<ul>";
        for(var i = 0; i<suggest.length;i++) {
            res+= '<li><a href="#" onclick="ajaxSuggestions.submitForm('+i+')"'+
                 'class="item" onmouseover="ajaxSuggestions.selectByMouseOver('+i+')" id="suggestion'+i+'">';

            res+= suggest[i];
            res+= "</a></li>";
        }
        res += "</ul>"+
        "<div class='xsmall lgrey' style='padding:3px 3px 0 0;float:right;'>"+ajaxSuggestions.suggestionsText+"</div>" +
        "<div class='xsmall' style='position:absolute;top:0;right:0;background:#FFFFFF;height:21px'><a href='#' onclick='ajaxSuggestions.clearResults()' style='color:#585B55'>[x]"+ajaxSuggestions.closeText+"</a></div>";
        return res;
    },

	getResults : function (){
		if(ajaxSuggestions.xmlHttp.readyState == 4 && trim(ajaxSuggestions.xmlHttp.responseText).length > 0){
			ajaxSuggestions.loadResults();
		}else {
      ajaxSuggestions.clearResults();
    }
	},
	
	loadResults : function (){
		this.resultIndex = this.suggestions.length;
		this.suggestions.push([this.currentValue, this.xmlHttp.responseText, this.currentURL]);
		this.presentResult();
	},
	
	presentResult : function (){
		this.elmToPresentResultsIn.innerHTML = this.suggestions[this.resultIndex][1];
		var coordinates = this.getCoordinates();
		var elm = this.elmResultsContainer.style;
		elm.left = coordinates[0] + this.offsetLeft + "px";
		elm.top = coordinates[1] + this.currentElm.offsetHeight + this.offsetTop + "px";
		if(this.sameWidthAsInputElm){
			elm.width = this.currentElm.offsetWidth + "px";
		}
		this.applyResultEvents();
		elm.display = "block";
		this.resultsAreVisible = true;
		if(this.addKeyNavigationEvents && /38|40/.test(this.currentKeyEvent)){
			if(!this.valueAddedFromResultsListToInput){
				this.selectedItem = -1;
			}
			this.navigateResults(null, this.currentKeyEvent);
		}
	},
	
	clearResults : function (justClear){
		if(this.elmResultsContainer && this.elmToPresentResultsIn){
			if(!justClear){
				this.elmResultsContainer.style.display = "none";
				this.resultsAreVisible = false;
			}
			this.elmToPresentResultsIn.innerHTML = "";
			this.selectedItem = -1;
		}
	},
	
	clearResultsElement : function (){
		ajaxSuggestions.clearResults();
	},
	
	navigateResults : function (evt, keyCode){
    if(ajaxSuggestions.currentElm && ajaxSuggestions.elmToPresentResultsIn){
			var event = (typeof evt != "undefined")? evt : event;
			if(typeof ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName != "function"){
				ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName = ajaxSuggestions.elmByClass;
			}
			var results = ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName(ajaxSuggestions.itemClassName);
			var selectedItem = (!evt && keyCode == 38)? results.length : ajaxSuggestions.selectedItem;
			var keyCode = keyCode || event.keyCode;
			var navigateUp =  keyCode == 38;
			var navigateDown =  keyCode == 40;
			if(results.length > 0 && (navigateUp || navigateDown)){
				if(navigateUp){
					if((selectedItem - 1) >= 0){
						selectedItem--;
					}
					else{
						selectedItem = results.length-1;
					}
				}		
				else if(navigateDown){
					if((selectedItem + 1) < results.length){
						selectedItem++;
					}
					else{
						selectedItem = 0;				
					}
				}
				var item;
				var classToRemove;
				for(var i=0; i<results.length; i++){
					item = results[i];
					classToRemove = new RegExp((ajaxSuggestions.itemSelectedClassName + "\s?"), "i");
					item.className = item.className.replace(classToRemove, "").replace(/^\s?|\s?$/g, "");
				};
				ajaxSuggestions.selectedItem = selectedItem;
        var elmToFocus = ajaxSuggestions.currentElm;
				if(selectedItem > -1){
					var currentItem = results[selectedItem];
					var currentClass = item.className;
					if(!new RegExp(ajaxSuggestions.itemSelectedClassName, "i").test(currentClass)){
						currentItem.className = currentClass + ((currentClass.length > 0)? " " : "") + ajaxSuggestions.itemSelectedClassName;
					}
					elmToFocus = results[selectedItem];
          for(var i=0; i<ajaxSuggestions.elements.length; i++){
//            alert(isHiddenByParent(ajaxSuggestions.elements[i])+":"+ajaxSuggestions.elements[i].class);
            if(!isHiddenByParent(ajaxSuggestions.elements[i])){
              ajaxSuggestions.elements[i].value=currentItem.innerHTML;
              try {
                ajaxSuggestions.elements[i].focus();
                break;
              }
              catch(e) {
                //              					 Just in case... :-)
              }
            }
          }
        }
//				try{
//					elmToFocus.focus();
//				}
//				catch(e){
//					 Just in case... :-)
//				}
				if(event){
					if(event.preventDefault){
						event.preventDefault();
					}
					else{
						event.returnValue = false;
					}
					if(event.stopPropagation){
						event.stopPropagation();
					}
					else{
						event.cancelBubble = true;
					}
				}
				return false;
			}
			else if(keyCode == 27){
				ajaxSuggestions.clearResults();
				try{
					ajaxSuggestions.currentElm.focus();
				}
				catch(e){
					// Just in case... :-)
				}
			}
		}
	},
  
  insertTermIntoField : function (selectedIndex){
    var results = ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName(ajaxSuggestions.itemClassName);    
    for(var i=0; i<ajaxSuggestions.elements.length; i++){
      ajaxSuggestions.elements[i].value=results[selectedIndex].innerHTML;
      try{
        ajaxSuggestions.elements[i].focus();
      }
      catch(e){
        // Just in case... :-)
      }
    }
  },

  selectByMouseOver : function (selectedIndex){
    if(ajaxSuggestions.currentElm && ajaxSuggestions.elmToPresentResultsIn){
			var event = (typeof evt != "undefined")? evt : event;
			if(typeof ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName != "function"){
				ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName = ajaxSuggestions.elmByClass;
			}
			var results = ajaxSuggestions.elmToPresentResultsIn.getElementsByClassName(ajaxSuggestions.itemClassName);
      var selectedItem =selectedIndex;
			if(results.length > 0){
				var item;
				var classToRemove;
				for(var i=0; i<results.length; i++){
					item = results[i];
					classToRemove = new RegExp((ajaxSuggestions.itemSelectedClassName + "\s?"), "i");
					item.className = item.className.replace(classToRemove, "").replace(/^\s?|\s?$/g, "");
				};
				ajaxSuggestions.selectedItem = selectedItem;
				var elmToFocus = ajaxSuggestions.currentElm;
				if(selectedItem > -1){
					var currentItem = results[selectedItem];
					var currentClass = item.className;
					if(!new RegExp(ajaxSuggestions.itemSelectedClassName, "i").test(currentClass)){
						currentItem.className = currentClass + ((currentClass.length > 0)? " " : "") + ajaxSuggestions.itemSelectedClassName;
					}
					elmToFocus = results[selectedItem];
//          for(var i=0; i<ajaxSuggestions.elements.length; i++){
//            ajaxSuggestions.elements[i].value=currentItem.innerHTML;
//            ajaxSuggestions.elements[i].focus();
//            break;
//          }
        }
//				try{
//					elmToFocus.focus();
//				}
//				catch(e){
//					 Just in case... :-)
//				}
				if(event){
					if(event.preventDefault){
						event.preventDefault();
					}
					else{
						event.returnValue = false;
					}
					if(event.stopPropagation){
						event.stopPropagation();
					}
					else{
						event.cancelBubble = true;
					}
				}
				return false;
			}
			else if(keyCode == 27){
				ajaxSuggestions.clearResults();
				try{
					ajaxSuggestions.currentElm.focus();
				}
				catch(e){
					// Just in case... :-)
				}
			}
		}
	},

	applyResultEvents : function (){
		if(typeof this.elmToPresentResultsIn.getElementsByClassName != "function"){
			this.elmToPresentResultsIn.getElementsByClassName = this.elmByClass;
		}
		var insertValueItems = this.elmToPresentResultsIn.getElementsByClassName(this.itemInsertValueIntoInputClassName, "a");
		var item;
		for(var i=0; i<insertValueItems.length; i++){
			item = insertValueItems[i];
			item.inputRef = this.currentElm;
			this.addEvent(item, "click", this.insertValueIntoField);
		};		
	},
	
	insertValueIntoField : function (evt){
		var elm = (/a/i.test(this.nodeName))? this : evt.srcElement;
		var input = elm.inputRef;
		var value = elm.getAttribute("href");
		if(!new RegExp(value).test(input.value)){
			input.value = ((input.value.length > 0 && /;/i.test(input.value))? (input.value + value) : value) + ajaxSuggestions.itemSeparator;
		}
		if(evt.preventDefault){
			evt.preventDefault();
		}
		else{
			evt.returnValue = false;
		}
		if(evt.stopPropagation){
			evt.stopPropagation();
		}
		else{
			evt.cancelBubble = true;
		}
		if(ajaxSuggestions.itemInsertValueSetFocusToInput){
			try{
				input.focus();
			}
			catch(e){
				// Just in case... :-)
			}
		}
		if(ajaxSuggestions.hideResultsWhenInsertValueIsSelected){
			ajaxSuggestions.clearResults();
		}
		ajaxSuggestions.valueAddedFromResultsListToInput = true;
	},
	
	preventInputClickBubbling : function (evt){
		if(evt.preventDefault){
			evt.preventDefault();
		}
		else{
			evt.returnValue = false;
		}
		if(evt.stopPropagation){
			evt.stopPropagation();
		}
		else{
			evt.cancelBubble = true;
		}
		return false;
	},
	
	preventDefaultForArrowKeys : function (evt){
    var keyCode = evt.keyCode;
		var navigateUp = keyCode == 38;
		var navigateDown = keyCode == 40;
		if((!evt.ctrlKey && !evt.metaKey) && ajaxSuggestions.resultsAreVisible && (navigateUp || navigateDown)){
			if(evt.preventDefault){
				evt.preventDefault();
			}
			else{
				evt.returnValue = false;
			}
			if(evt.stopPropagation){
				evt.stopPropagation();
			}
			else{
				evt.cancelBubble = true;
			}
			return false;
		}	
	},
	
	getCoordinates : function (){
		var elm = this.currentElm;
		var offsetLeft = 0;
		var offsetTop = 0;
		while(elm.offsetParent){
			offsetLeft += elm.offsetLeft;
			offsetTop += elm.offsetTop;
			if(elm.scrollTop > 0){
				offsetTop -= elm.scrollTop;
			}
			elm = elm.offsetParent;
		}
		return [offsetLeft, offsetTop];
	},
	
	closeSession : function (){
		delete ajaxSuggestions;
		ajaxSuggestions = null;
	},
	
	elmByClass : function (className, tag){
		return ajaxSuggestions.getElementsByClassName.call(this, className, tag);
	},
	
	getElementsByClassName : function (className, tag){		
		var elms = ((!tag || tag == "*") && this.all)? this.all : this.getElementsByTagName(tag || "*");
		var returnElms = [];
		var className = className.replace(/\-/g, "\\-");
		var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var elm;
		for(var i=0; i<elms.length; i++){
			elm = elms[i];		
			if(regExp.test(elm.className)){
				returnElms.push(elm);
			}
		}
		return (returnElms);
	},



  submitForm : function (counter){

    ajaxSuggestions.insertTermIntoField(counter);
    for(var i=0; i<ajaxSuggestions.elements.length; i++){
      if(!isHiddenByParent(ajaxSuggestions.elements[i])){
        var callSubmit=true;
        if(ajaxSuggestions.elements[i].form.onsubmit!='' && ajaxSuggestions.elements[i].form.onsubmit!=null){
            try {
                callSubmit=ajaxSuggestions.elements[i].form.onsubmit();
            }
            catch(e){
            }
        }
        if(callSubmit) ajaxSuggestions.elements[i].form.submit();
        break;
      }
    }

  },
  addEvent : function (elm, evt, func){
		if(elm){
			if(elm.addEventListener){
				elm.addEventListener(evt, func, false);
			}
			else if(window.attachEvent){
				elm.attachEvent(("on" + evt), func)
			}
		}
	}
};
// ---
if(typeof $ != 'undefined'){
   $('.ajax-suggestion').ready(function(){ajaxSuggestions.init()})
}else{
   ajaxSuggestions.addEvent(window, "load", function(){ajaxSuggestions.init();});
}
ajaxSuggestions.addEvent(window, "unload", function(){ajaxSuggestions.closeSession();});
// ---


function isHiddenByParent(element){
  if(element!=null && element.style!=null && element.style.display=='none') {
    return true;
  }
  var element=element.parentNode;
  while(element!=null){
    if(element!=null && element.style!=null && element.style.display=='none') {
      return true;
    }
    element=element.parentNode;
  }
  return false;
}