/************AUTOFILL CODE**************/

(function($) {
	"use strict";
	var logpercentagelevel = 100,
	//used in getting userid from cookie
	//moduleselected values 1-cat, 2-model, 3-classic, 4-bso
	userid="", sessionid ="", afversion=2, moduleselected ="", wcPersistentString,
	hostname, logServer = "", sourceServer, baseurl, baseprodurl, nbrOfHistoryToMatch = 3,
	historyMaxLength = 50, historySplitCharacter = "|",spellCorrectionPhrase="",
	logpercentage = 100, HistoryCache = null, loginEnabled, lastIndex;

	 $.getUserID = function() {
		try {
			wcPersistentString = $.cookie("WC_PERSISTENT");  
			if (wcPersistentString) {
                  wcPersistentString = unescape(wcPersistentString); /* To split the string if , is found in the cookie value*/
                  if(wcPersistentString.indexOf(",") >= 0){
                        wcPersistentString = wcPersistentString.split(",")[0];
                  }                   
                  //see how many '_' are found
                 loginEnabled = wcPersistentString.split('_').length;                
                  if (loginEnabled > 2) { /* For getting the index of last _ value */
                       lastIndex = wcPersistentString.lastIndexOf("_");
                        if(lastIndex >= 0){
                        	userid = wcPersistentString.substr(lastIndex+1);
                        }
                  }
            }
		} catch (e) {
		}
	};
	
	 $.getSessionID = function () {
		sessionid = $.cookie("JSESSIONID");
	};

	$.populateKeyword = function (site) {
		var searchKeywordInput=$("#keyword"),  searchKeywordLabel=$("#keywordLabel"),
		af_value =decodeURIComponent((RegExp( 'keyword=' + '(.*?)(&|$)').exec(location.search)||[,null])[1]);
		
		searchKeywordLabel.hide();
		if(site=="sears"){
			searchKeywordLabel.text('Enter keyword or item number');
		}else if(site=="kmart"){
			searchKeywordLabel.text('What are you looking for?');
		}
		var keyword=searchKeywordInput.val();
		if(af_value=="null"){
			 af_value =decodeURIComponent((RegExp( 'search=' + '(.*?)(&|\\?|$)').exec(location.href)||[,null])[1]); 
		}
		if(af_value != "null" && af_value.trim() != "" ){
			af_value = af_value.replace(/\+/gi, " ");
			if(!af_value.contains('|') ){
				$(searchKeywordInput).focus();
				searchKeywordLabel.hide();
				var c = setTimeout(function(){$.updateTextBox(af_value)},100);
			}else{
				if(keyword.trim() == "" )
					searchKeywordLabel.show();	
			}	
		}else{
			if(keyword.trim() == "" )
				searchKeywordLabel.show();	
		}

		searchKeywordLabel.click(function() {
			$(searchKeywordInput).focus();
		});

		searchKeywordInput.focus(function() {
			searchKeywordLabel.hide();
			$("#keyword").blur(function() {
				var keywordVal=$("#keyword").val();
				if ($.trim(keywordVal) === "") {
					searchKeywordInput.val('');
					searchKeywordLabel.show();
				}
			});
		});
		
	};
	$.updateTextBox = function(value) {
		$("#keyword").val(value);
	};
	$.filterSpecialChars = function(value) {
		return value;
	};
	$.addToHistory = function() {
		var value = $('#keyword').val(), exisitngHistory = HistoryCache,  newHistory = "", delimiter = "", cookies, z;
		if (exisitngHistory !== null) {
			cookies = exisitngHistory.split(historySplitCharacter);
			for (z = 0; z < cookies.length; z += 1) {
				if (value !== unescape(cookies[z])) {
					newHistory += unescape(delimiter + cookies[z]);
					delimiter = historySplitCharacter;
				}
				if (z === historyMaxLength) {
					break;
				}
			}
			$.cookie('searsautocomplete', escape(value + historySplitCharacter) + escape(newHistory), { expires: 360});
		} else {
			$.cookie('searsautocomplete', escape(value), { expires: 360});

		}

		// add it to HistoryCache
		HistoryCache = value + historySplitCharacter + newHistory;

	};
	$.loadHistory = function() {
		HistoryCache = unescape($.cookie("searsautocomplete")) ;

	};
	
	$.fn.extend({
				autocomplete : function(urlOrData, options) {
					var isUrl = typeof urlOrData === "string", protocol = window.location.protocol;
					options = $.extend({}, $.Autocompleter.defaults, {
						url : isUrl ? urlOrData : null,
						data : isUrl ? null : urlOrData,
						delay : isUrl ? $.Autocompleter.defaults.delay : 200,
						max : options && !options.scroll ? 10 : 150
					}, options);
					
					
		
					
					logpercentage = Math.floor(Math.random() * 101);					
					sourceServer = urlOrData;
	
					hostname = document.location.hostname;
					
					// if highlight is set to false, replace it with a
					// do-nothing
					// function
					options.highlight = options.highlight || function(value) {
						return value;
					};
			
					logServer = sourceServer.substring(0,sourceServer.lastIndexOf("/")+1)+"log";

					// if the formatMatch option is not specified, then use
					// formatItem for
					// backwards compatibility
					options.formatMatch = options.formatMatch || options.formatItem;

					return this.each(function() {
						$.Autocompleter(this, options);
					});
				},
				result : function(handler) {
					return this.bind("result", handler);
				},
				search : function(handler) {
					return this.trigger("search", [ handler ]);
				},
				flushCache : function() {
					return this.trigger("flushCache");
				},
				setOptions : function(options) {
					return this.trigger("setOptions", [ options ]);
				},
				unautocomplete : function() {
					return this.trigger("unautocomplete");
				}

			});

	$.Autocompleter = function(input, options) {

		var KEY = {
			UP : 38,
			DOWN : 40,
			DEL : 46,
			TAB : 9,
			RETURN : 13,
			ESC : 27,
			COMMA : 188,
			PAGEUP : 33,
			PAGEDOWN : 34,
			BACKSPACE : 8,
			LEFT:	 37,
			RIGHT:	 39,
			HOME:	 36,
			END:	 35
		},
		resizingTimeout,
		environment = "null",
		maxTokens = 16, maxChars = 128, maxCharsPerWord = 32, count,
		// Create $ object for input element
		$input = $(input).attr("autocomplete", "off").addClass(
				options.inputClass), timeout, previousValue, serverResponseTimeOut, closeAutofillTimer, cache = $.Autocompleter
				.Cache(options), lastcache = $.Autocompleter.LastCache(options), hasFocus = 0, lastKeyPressCode, config = {
			mouseDownOnSelect : false
		}, idleTime = 0,
		// for cookie inclusion
		history = null,
		
		select = $.Autocompleter.Select(options, input,
				selectCurrent, config, subrequest, populatetextBox, logSelectedOnClick, selectCurrentOnClick), blockSubmit, formatedURL = "";

	
		
		$(document).click(function(e) { // when any click is received
			if ((select !== e.target)) {
				select.hide();
			}
		});

		
		$.getSessionID();
		$.getUserID();
		if (options.env) {
			environment = options.env;
		}
				
		if(environment=='qa' || environment=='dev'){
			baseurl="http://www.sears.com"+ $("#srchFrm").attr("action");
			baseprodurl = "http://www.sears.com/shc/s/";
		
		}else{
			baseurl = $("#srchFrm").attr("action");	
			baseprodurl = "/shc/s/";	
		}
		
		function getURLParameter(name, url) {
			if(url){
				 return decodeURI((RegExp(name + '=' + '(.+?)(\\?|$)').exec(url)||[,null])[1]);
			}
		    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
		}
		
		function encode(value){		
			return encodeURIComponent(value);
		}
		
		function callSearch(selected){
			if(selected){
				$input.trigger("result", [ selected.data, selected.value ]);
			}else{
				$input.trigger("result");
			}
		}

		function trimWords(value) {
			if (!value){
				return [""];
			}
			if (!options.multiple){
				return  [$.trim(value)];
			}
			return $.map(value.split(options.multipleSeparator),
					function(word) {
						return $.trim(value).length ? $.trim(word) : null;
					});
		}
	
		function stopLoading() {
			$input.removeClass(options.loadingClass);
		}
		
		function hideResultsNow() {
			var wasVisible = select.visible(),words;
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				// call search and run callback
				$input.search(function(result) {
					// if no value found, clear the input box
					if (!result) {
						if (options.multiple) {
							words = trimWords($input.val()).slice(0, -1);
							$input.val(words.join(options.multipleSeparator)
									+ (words.length ? options.multipleSeparator: ""));
						} else {
							$input.val("");
							$input.trigger("result", null);
						}
					}
				});
			}
		}

		function hideResults() {
			clearTimeout(timeout);
			// change
			timeout = setTimeout(hideResultsNow, 10000);
		}
		
		function closeAutoFill() {
			select.hide();
		}

		$(document).mousemove( function(e) { // any moves reset timer
				clearTimeout(closeAutofillTimer);
				closeAutofillTimer = setTimeout(closeAutoFill,
						options.hideAutocompleteOnIddle);

		});

		// prevent form submit in opera when selecting with return key
		$.browser.opera && $(input.form).bind("submit.autocomplete", function() {	
			if (blockSubmit) {
				blockSubmit = false;
				return false;
			}
		});

		function getSite(){
			if (hostname.match("kmart")) {
				return "kmart";
			}
			if(hostname.match("mygofer")) {
				return "mygofer";
			}
			return "sears";
		}

		function logSelected(value, terms, directInput) {
			var req ="";
			if (!options.disableLog) {
				try {
					if (logpercentage <= logpercentagelevel) {
						req ="";
						if(directInput!=0){
							req = logServer + "?q=" + encode(terms) + "&s=" + encode(value)+ "&ms=" + moduleselected+"&di=" + directInput
								+ "&uid="+userid+"&sid="+sessionid+"&site="+getSite()+"&callback=?";
						}else{
							req = logServer + "?q=" + encode(terms) + "&s=" + encode(value)+ "&ms=" + moduleselected
							+ "&uid="+userid+"&sid="+sessionid+"&site="+getSite()+"&callback=?";						
						}
				
						$.getJSON(req);
					}
				} catch (e) {}
			}
		}
		function logSelectedOnClick(value, terms, module) {
			var  req ="";
			if (!options.disableLog) {
				try {
					if (logpercentage <= logpercentagelevel) {
						req = logServer + "?q=" + encode(terms) + "&s=" + encode(value) + "&ms=" + module
							+ "&uid="+userid+"&sid="+sessionid+"&site="+getSite()+"&callback=?";					
						
						$.getJSON(req);
					}
				} catch (e) {}
			}
		}
	
		function log(url) {
			if (logServer !== null) {
				try {
					if (!options.disableLog) {
						if (logpercentage <= logpercentagelevel) {
						
							$.getJSON(url + "&uid="+userid+"&sid="+sessionid+"&site="+getSite()+"&callback=?", function(data) {});
						}
					}
				} catch (e) {}
			}
		}

		
		function selectCurrent() {
			var selected = select.selected(),selectedPhrase, selectedVertical = null, progress, newVertical,cursorAt,  decodedValue, wordAt, terms, words, seperator;
			if (!selected) {
				return false;
			}
		
			selectedPhrase = selected.result;
			AF_TRACKER.SELECTION = selectedPhrase;
			if (selected.selectedVertical) {
				selectedVertical = selected.selectedVertical;
				$('#vName').val(selectedVertical);
			} else {
				$('#vName').val("");
			}
			
			if (selected.partUrl) {			
				$('#part').val(selected.partUrl);
			} else {
				$('#part').val("");
			}
			if (selected.catUrl) {
				
				$('#url').val(selected.catUrl);
			} else {
				$('#url').val("");
			}
			
			if(selected.iscat){
				moduleselected =1;
			}else if(selected.ismodel){
				moduleselected =2;
			}else if(selected.isbso){
				moduleselected =4;
			}else{
				moduleselected =3;
			}
			
			previousValue = selectedPhrase;
			terms = $('#keyword').val();
			if (options.multiple) {
				words = trimWords($input.val());
				if (words.length > 1) {
					seperator = options.multipleSeparator.length; 
					cursorAt = $(input).selection().start;
					progress = 0;
					$.each(words, function(i, word) {
						progress += word.length;
						if (cursorAt <= progress) {
							wordAt = i;
							return false;
						}
						progress += seperator;
					});
					words[wordAt] = selectedPhrase;
					selectedPhrase = words.join(options.multipleSeparator);
				}
				selectedPhrase += options.multipleSeparator;
			}
			
			if(selectedPhrase){
				decodedValue = selectedPhrase.replace(/&reg;/gi, "");
				decodedValue = decodedValue.replace(/&trade;/gi, "");
			}

			if ((selected.partUrl)|| (selected.catUrl)) {
				$input.val("");
			}else{
				$input.val(decodedValue);
			}
		
			hideResultsNow();
			logSelected(selected.value, terms, 0);
			if(selected.flags && selected.flags.wcs && selected.flags.wcs=="1"){
				setTimeout(callSearch, 40);
				return true;	
			}
			if(selected.flags && selected.flags.pd && selected.flags.pd=="1"){
				window.location.href="http://parts.sears.com/partsdirect/part-model/"+selected.value+"?prst=0&shdMod="+selected.value;
				return true;	
			}
			setTimeout(callSearch, 40);
			
			return true;

		}		
		function selectCurrentOnClick(selected, vname, parturl, caturl, modselected, valSelected, ispd) {
			var   decodedValue,  terms;
	
			if (vname!=null) {
				$('#vName').val(vname);
			} else {
				$('#vName').val("");
			}
			if (parturl!=null) {			
				$('#part').val(parturl);
			} else {
				$('#part').val("");
			}
			if (caturl!=null) {
				$('#url').val(caturl);
			} else {
				$('#url').val("");
			}

			terms = $('#keyword').val();
			
			if(selected!=null){
				decodedValue = selected.replace(/&reg;/gi, "");
				decodedValue = selected.replace(/&trade;/gi, "");
				$input.val(decodedValue);
			}

			if ((parturl) || (caturl)) {
				$input.val("");
			}
		
			hideResultsNow();
			logSelectedOnClick(valSelected, terms, modselected);
			
			if(ispd){
				window.location.href="http://parts.sears.com/partsdirect/part-model/"+selected+"?prst=0&shdMod="+selected;
				return true;	
			}
			
			setTimeout(callSearch, 40);
			return true;
		}
		
		function getMatchingHistory() {
			var out = HistoryCache, returnList = "", delimiter = "", term,  matchFound, historyList, match,i=0;
			if (out !== null) {
				historyList = out.split(historySplitCharacter);
				term = $('#keyword').val();
				matchFound = 0;
				for ( i = 0; i < historyList.length; i+=1) {
					match = historyList[i].search(term.replace(/[-[\]{}()*+?.,\^$|#\s]/gi,'\\$&'));
					if (match !== -1) {
						returnList += delimiter + historyList[i];
						delimiter = historySplitCharacter;
						matchFound++;
						if (matchFound === nbrOfHistoryToMatch) {
							break;
						}
					}
				}
			}
			if (returnList === "") {
				return null;
			}
			return returnList;
		}
		
		
		function lastWord(value) {
			if (!options.multiple){
				return value;
			}
			var words = trimWords(value), cursorAt;
			if (words.length === 1){
				return words[0];
			}
			cursorAt = $(input).selection().start;
			if (cursorAt === value.length) {
				words = trimWords(value);
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""));
			}
			return words[words.length - 1];
		}

		// fills in the input box w/the first match (assumed to be the best
		// match)
		// q: the term entered
		// sValue: the first matching result
		function autoFill(q, sValue) {
			// autofill in the complete box w/the first match as long as the
			// user
			// hasn't entered in more data
			// if the last user key pressed was backspace, don't autofill
			if (options.autoFill
					&& (lastWord($input.val()).toLowerCase() === q.toLowerCase())
					&& lastKeyPressCode !== KEY.BACKSPACE) {
				// fill in the value (keep the case the user has typed)
				$input.val($input.val()+ sValue.substring(lastWord(previousValue).length));
				//select it
				$(input).selection(previousValue.length, previousValue.length + sValue.length);
			
			}

		}
		
		function populatetextBox(q, sValue, spellcheck) {
			if (lastKeyPressCode !== KEY.BACKSPACE) {
				if(spellcheck){
					$(input).val(sValue);
				}else{
					if(sValue){				
						$(input).val(q+ sValue.substring(lastWord(q).length));
						//select it
						$(input).selection(q.length, q.length + sValue.length);	
					}else{
						$(input).val(q);
					}
				}						
			}
		}
		function receiveData(q, data) {
			select.removeSelection();
			if (data && hasFocus) {
				stopLoading();
				if (data.length) {
					select.display(data, q);
					autoFill(q, data[0].value);
					lastcache.add(data);
				} else {
					select.display(lastcache.get(q), q);
					autoFill(q);
				}
				select.show();
			} else {
				hideResultsNow();
			}
		}

		function onResponseTimeout() {
			var currentValue = $input.val(), parsed = [];
			currentValue = lastWord(currentValue);
			receiveData(currentValue, parsed);
		}

		function findInList(value, items) {
			var i, item;
			if(items && items.length){
				for ( i = 0; i < items.length; i+=1) {
					item = items[i];
					if (value === item.k) {
						items.splice(i,1);
						return item;
					}
					if (item.pc) {
						if (value === item.pc) {
							items.splice(i,1);
							return item;
						}
					}
				}
			}
			return null;
		}

		function parse(data) {
			var out = getMatchingHistory(), parsed = [],x =0, i=0, ii =0, rows , bso , cat, model, cookie , row, addItem, serverItem,   showhline = false;

			if ('string' === typeof data) {
				try{
					data = $.parseJSON(data);
					//data = JSON.parse(data);
				}catch(e){}
			}
			
			//old autofill
			if(	typeof data.items  === 'undefined'
					&& typeof data.bso === 'undefined'
					&& typeof data.cat === 'undefined'
					&& typeof data.model === 'undefined'){
				rows = data;
			}
			//new autofill
			else{
				try{
					rows = data.items;
					bso = data.bso;
					cat = data.cat;
					model = data.model;
				}catch(ee){
					rows = data;
				}
			}

			
			//add Category Data
			if (cat) {
				//loop and add the rest
				for ( i = 0; i < cat.length; i+=1) {
					row = cat[i];
					parsed[parsed.length] = {
						c : row.c,
						p : row.p,
						pt : row.pt,
						image : row.i,
						def : row.def,
						t : row.t,
						iscat : true,
						value : row.it,
						result : (options.formatResult
								&& options.formatResult(row, row.p))
								|| row.p
					};
				}
			}
			//End category Data

			//add part Data
			if (model) {
				//loop and add the rest
				for ( i = 0; i < model.length; i+=1) {
					row = model[i];
					parsed[parsed.length] = {
						image : row.i,
						part : row.p,
						pu: row.pu,
						model : row.m,
						itemnr : row.inr,
						ismodel : true,
						value : row.t,
						result : (options.formatResult
								&& options.formatResult(row, row.t))
								|| row.t
					};
				}
			}
			//END add Part Data
			
			//Parse BSO Data
			if (bso) {
				//loop and add the rest
				for ( i = 0; i < bso.length; i+=1) {
					row = bso[i];
					parsed[parsed.length] = {
						 image : row.i,
						 part : row.p,
						 pu: row.pu,
						 isbso : true,
						 value : row.t,
						 result : (options.formatResult
								&& options.formatResult(row, row.t))
								|| row.t
					};
				}
			}			
			//End Bso Data

			// including history into autocomplete
			if (out !== null) {
				history = out.split(historySplitCharacter);
				for ( x = 0; x < history.length; x+=1) {
					cookie = history[x];
					serverItem = findInList(cookie, rows);
					if (cookie && serverItem) {
						parsed[parsed.length] = {
							value : serverItem.k,
							flags : serverItem.flags,
							pc : serverItem.pc,
							part : serverItem.p,
							isitem : true,
							sc : serverItem.sc,
							bso : serverItem.bso,
							cat : serverItem.cat,
							model : serverItem.model,
							result : (options.formatResult && options.formatResult(out, cookie)) || cookie
						};
						showhline = true;
					}
				}
			} else {
				history = null;
			}
			

			// add what is left
			if(rows && rows.length){
				for ( i = 0; i < rows.length; i+=1) {
					row = rows[i];
					if(i > 0){
						showhline=false;
					}
					if ( row) {
							parsed[parsed.length] = {
								verticals : row.vt,
								flags : row.flags,
								value : row.k,
								part : row.p,
								hline : showhline,
								isitem : true,
								pc : row.pc,
								sc : row.sc,
								bso : row.bso,
								cat : row.cat,
								model : row.model,
								result : (options.formatResult
										&& options.formatResult(row, row.k))
										|| row.k
							};
						
					}
				}
			}

			
			//for logging the spell correction
			if(parsed[0] && parsed[0].pc){
				spellCorrectionPhrase = parsed[0].pc;
			} else {
				spellCorrectionPhrase = "";
			}
			
			return parsed;
		}
		
		function formatRequest(q) {
			var val = q.split(""), modified= q;
			if (val === null || q === null) {
				formatedURL = "";
			}
			if (val.length >= 3) {
				formatedURL = sourceServer + "/" +encode(val[0]) + "/" + encode(val[0]
						+ val[1]) + "/" + encode(val[0] + val[1] + val[2]) + "/" + encode(modified)
						+ ".txt";
			} else {
				if (val.length === 1) {
					formatedURL = sourceServer +  "/" +encode( val[0]) + "/" + encode(modified)
							+ ".txt";
				} else if (val.length === 2) {
					formatedURL = sourceServer +  "/" + encode(val[0]) + "/" + encode(val[0]
							+ val[1]) + "/" + encode(modified) + ".txt";
				} else {
					formatedURL = sourceServer +  "/" + encode(modified) + ".txt";
				}
			}
		}
		
		function isValidRequest(requestString) {
			var request, tokens;
			if(!requestString ){
				return false;
			}

			request = trimExtraSpaces(requestString);

			//Any request longer than 128 characters (drop entire request)
			if(request.length > maxChars){
				return false;
			}

			tokens = request.split(" ");
			//Any phrase longer than 16 words (drop entire request)
			if(tokens && tokens.length > maxTokens){
				return false;
			}

			//Any single word longer than 32 characters (drop entire request)
			for (count = 0; count < tokens.length; count += 1) {
				if(tokens[count] && tokens[count].length > maxCharsPerWord){
					return false;
				}
			}
			return true;
		}
		

		function subrequest(term, success, flags) {
			$.ajaxSetup({
				cache : true
			});
			moduleselected ="";
			if (!options.matchCase){
				term = term.toLowerCase();
			}
			var subdata = cache.load(term), now, sentRequest, requestUrl, then , receivedResponse;
			
			if (isValidRequest(term)){
				// recieve the cached data
				if (subdata && subdata.length) {
					success(term, subdata);
					// if an AJAX url has been supplied, try loading the data now
				} else if ((typeof options.url === "string")) {
					now = new Date();
					sentRequest = parseInt(now.getTime(),10);			
					requestUrl = "";
					formatRequest(lastWord(term));
					if (sourceServer.match("www\.[a-zA-Z]+\.com")) {
						// PRD 
						requestUrl = formatedURL;
						//requestUrl = formatedURL;
						$.ajax({
							url : requestUrl,
							success : function(subdata) {
								then = new Date();
								receivedResponse = parseInt(then.getTime(),10);
								if (receivedResponse - sentRequest <= options.serverResponseTimeout) {
									cache.add(term, subdata);
									success(term, subdata, flags);
								}
							}
						});
					} else { // QA AND DEV 
						requestUrl = formatedURL+"?callback=?";						
						$.getJSON(requestUrl,
							function(subdata) {
								then = new Date();
								receivedResponse = parseInt(then.getTime(),10);
								if (receivedResponse - sentRequest <= options.serverResponseTimeout) {
									cache.add(term, subdata);
									success(term, subdata, flags);
	
								}
							});
					}
				} else {
					// if we have a failure, we need to empty the list -- this
					// prevents
					// the the [TAB] key from selecting the last successful match
		
					select.emptyRightList();
					//failure(term);
				}
				
				//log(logServer + "?q=" + term );
			} else {
				// if we have a failure, we need to empty the list -- this
				// prevents
				// the the [TAB] key from selecting the last successful match
				success(term, "");
				//select.emptyRightList();
				//failure(term);
			}
			// Added by Seth
			$.ajaxSetup({
				cache : false
			});
		}

		function request(term, success, failure) {
			$.ajaxSetup({
				cache : true
			});
			moduleselected ="";
			if (!options.matchCase){
				term = term.toLowerCase();
			}
			var data = cache.load(term), now, sentRequest, requestUrl, then , receivedResponse, parsed;
			
			if (isValidRequest(term)){
				// recieve the cached data
				if (data && data.length) {
					success(term, data);
					// if an AJAX url has been supplied, try loading the data now
				} else if ((typeof options.url === "string")) {
					now = new Date();
					sentRequest = parseInt(now.getTime(),10);			
					requestUrl = "";
	
					clearTimeout(serverResponseTimeOut);
					serverResponseTimeOut = setTimeout(onResponseTimeout,
							options.serverResponseTimeout);
		
					formatRequest(lastWord(term));
					if (sourceServer.match("www\.[a-zA-Z]+\.com")) {
						// PRD 
						requestUrl = formatedURL;
						//requestUrl = formatedURL;
						$.ajax({
							url : requestUrl,
							success : function(data) {
								then = new Date();
								receivedResponse = parseInt(then.getTime(),10);
								if (receivedResponse - sentRequest <= options.serverResponseTimeout) {
									clearTimeout(serverResponseTimeOut);
									parsed = (options.parse
											&& options.parse(data))
											|| parse(data);
									cache.add(term, parsed);
									success(term, parsed);
								}
							}
						});
					} else { // QA AND DEV 
						requestUrl = formatedURL+"?callback=?";						
						$.getJSON(requestUrl,
							function(data) {
								then = new Date();
								receivedResponse = parseInt(then.getTime(),10);
								if (receivedResponse - sentRequest <= options.serverResponseTimeout) {
									clearTimeout(serverResponseTimeOut);
									parsed = (options.parse
											&& options.parse(data))
											|| parse(data);
									cache.add(term, parsed);
									success(term, parsed);
	
								}
							});
					}
				} else {
					// if we have a failure, we need to empty the list -- this
					// prevents
					// the the [TAB] key from selecting the last successful match
					select.emptyList();
					failure(term);
				}
				
				log(logServer + "?q=" + encode(term) );
			} else {
				// if we have a failure, we need to empty the list -- this
				// prevents
				// the the [TAB] key from selecting the last successful match
				select.emptyList();
				failure(term);
			}
			// Added by Seth
			$.ajaxSetup({
				cache : false
			});
		}

		function onChange(skipPrevCheck) {
			if (lastKeyPressCode === KEY.DEL) {
				select.hide();
				return;
			}
			var currentValue = $input.val();
	
			AF_TRACKER.QUERY = currentValue;
			
			previousValue = currentValue;
			currentValue = lastWord(currentValue);
			if (currentValue.length >= options.minChars) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase){
					currentValue = currentValue.toLowerCase();
				}
				request(currentValue, receiveData, hideResultsNow);
			} else {
				stopLoading();
				select.hide();
			}
		}
		// only opera doesn't trigger keydown multiple times while pressed,
		// others
		// don't work with keypress at all
		$input.bind(
				($.browser.opera ? "keypress" : "keydown") + ".autocomplete",
				function(event) {
					// a keypress means the input has focus
					// avoids issue where input had focus before the
					// autocomplete was
					// applied
					hasFocus = 1;
					// track last key pressed
					lastKeyPressCode = event.keyCode;
					switch (event.keyCode) {
					case KEY.UP:
						
						event.preventDefault();
				
						if (select.visible()) {
							AF_TRACKER.increase(2);
							clearTimeout(closeAutofillTimer);
							closeAutofillTimer = setTimeout(closeAutoFill,
									options.hideAutocompleteOnIddle);
							select.prev();
						} else {
							onChange(true);
						}
						break;
					case KEY.TAB:
					case KEY.DOWN:	
						event.preventDefault();
						if (select.visible()) {
							AF_TRACKER.increase(2);
							clearTimeout(closeAutofillTimer);
							closeAutofillTimer = setTimeout(closeAutoFill,
									options.hideAutocompleteOnIddle);
							select.next();
						} else {
							onChange(true);
						}
						break;
					case KEY.LEFT:
					case KEY.RIGHT:
					case KEY.END:
					case KEY.HOME:
						AF_TRACKER.increase(1);
						break;
					case KEY.PAGEUP:
						event.preventDefault();
						if (select.visible()) {
							clearTimeout(closeAutofillTimer);
							closeAutofillTimer = setTimeout(closeAutoFill,
									options.hideAutocompleteOnIddle);
							select.pageUp();
						} else {
							onChange(true);
						}
						break;

					case KEY.PAGEDOWN:
						event.preventDefault();
						if (select.visible()) {
							clearTimeout(closeAutofillTimer);
							closeAutofillTimer = setTimeout(closeAutoFill,
									options.hideAutocompleteOnIddle);
							select.pageDown();
						} else {
							onChange(true);
						}
						break;

					// matches also semicolon
					case options.multiple
							&& $.trim(options.multipleSeparator) === ","
							&& KEY.COMMA:
					case KEY.RETURN:
						var keyword = $input.val();
						if(spellCorrectionPhrase !==""){
							log(logServer + "?q=" + encode($.trim(keyword.replace(/\s{2,}/g, ' ')))+ "&pc=" + encode(spellCorrectionPhrase) );
						}
						if (selectCurrent()) {
							event.preventDefault();
							blockSubmit = true;
							return false;
						}else{
							logSelected(keyword, keyword, 1);
							setTimeout(callSearch, 40);
							event.preventDefault();
							blockSubmit = true;
							return false;
						}
						break;

					case KEY.ESC:
						AF_TRACKER.increase(1);
						select.hide();
						break;

					default:
						clearTimeout(closeAutofillTimer);
						closeAutofillTimer = setTimeout(closeAutoFill, options.hideAutocompleteOnIddle);
						clearTimeout(timeout);
						timeout = setTimeout(onChange, options.delay);
						break;
					}
				}).focus(function() {
			// track whether the field has focus, we shouldn't process any
			// results if the field no longer has focus
					hasFocus++;
				}).blur(function() {
					hasFocus = 0;
					if (!config.mouseDownOnSelect) {
						hideResults();
					}
				}).click(function() {
					// show select when clicking in a focused field
					if (hasFocus++ > 1 && !select.visible()) {
						onChange(true);
					}
				}).bind(
						"keyword",
						function() {
							var  i, args = arguments, fn = (args.length > 1) ? args[1] : null;
							function findValueCallback(q, data) {
								var result;
								if (data && data.length) {
									for ( i = 0; i < data.length; i+=1) {
										if (data[i].result.toLowerCase() === q
										.toLowerCase()) {
									result = data[i];
									break;
								}
							}
						}
						if (typeof fn === "function"){
							fn(result);
						}
						else{
							$input.trigger("result", result
									&& [ result.data, result.value ]);
						}
					}
					$.each(trimWords($input.val()), function(i, value) {
						request(value, findValueCallback, findValueCallback);
					});
				}).bind("flushCache", function() {
							cache.flush();
				}).bind("setOptions", function() {
					var args1 =  arguments[1];
					$.extend(options, args1);
					// if we've updated the data, repopulate
					if (args1.hasOwnProperty('data')){
						cache.populate();
					}
				}).bind("unautocomplete", function() {
					select.unbind();
					$input.unbind();
					$(input.form).unbind(".autocomplete");
				}).bind("result", function() {
					options.action(options.env);
				});
		
		
		$(document).ready(function() {
			
			$.populateKeyword(options.site);
			
			$(window).resize(function() {
				clearTimeout(timeout);
				timeout = setTimeout(onChange, 500);
			
			});
	
		    $(window).scroll(function() {
		    	//if (select) {
		    	//	select.hide();
		    	//}
		    });
		});	
		
	};

	$.Autocompleter.defaults = {
		inputClass : "ac_input",
		resultsClass : "ac_results",
		loadingClass : "ac_loading",
		minChars : 1,
		delay : 50,
		matchCase : false,
		matchSubset : true,
		matchContains : false,
		cacheLength : 10,
		max : 20,
		mustMatch : false,
		extraParams : {},
		selectFirst : false,
		formatItem : function(row) {
			return row;
		},
		formatMatch : null,
		autoFill : false,
		width : 0,
		highlightInStr : function(value, term) {
			var aterm = $.trim(term.replace(/\s{2,}/g, ' '));
				return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("
						+ aterm.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i,
								"\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"),
						"<strong>$1</strong>");

		},
		highlight : function(item, term) {
			var aterm = $.trim(term.replace(/\s{2,}/g, ' ')),  isAdded, highlightedValue,space ="",sc,pctokens,z,d ;
			if (item.pc) {
				if (item.sc) {
					if (item.sc.constructor.toString().indexOf("Array") !== -1) {
						highlightedValue = "";
						sc = item.sc;
						pctokens = item.pc.split(" ");
						for (z = 0; z < pctokens.length; z += 1) {
							isAdded = false;
							for (d = 0; d < sc.length; d += 1) {
								if (sc[d] === z) {
									isAdded = true;
									highlightedValue += space + "<span class=\"corrected\">" + pctokens[z] + "</span>";
									space = " ";
								}
							}
							if (!isAdded) {
								highlightedValue += space + "<strong>" + pctokens[z] + "</strong>";
								space = " ";
							}
						}
						return item.value.replace(item.pc, highlightedValue)+ ((item.info != undefined) ? item.info : "");
					} else {
						return item.value.replace(item.pc, "<strong>" + item.pc + "</strong>").replace(item.sc,
								"<span id=corrected class=\"corrected\">" + item.sc + "</span>")+ ((item.info != undefined) ? item.info : "");
					}

				} else {
					// invalid PC it should not be there disregard it.
					return item.value
							.replace(
									new RegExp(
											"(?![^&;]+;)(?!<[^<>]*)("
													+ aterm
															.replace(
																	/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i,
																	"\\$1")
													+ ")(?![^<>]*>)(?![^&;]+;)",
											"i"), "<strong>$1</strong>")+ ((item.info != undefined) ? item.info : "");
				}
			} else {
				return  item.value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("
						+ aterm.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i,
						"\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"),
				"<strong>$1</strong>")+ ((item.info != undefined) ? item.info : "");


			}

		},
		multiple : false,
		multipleSeparator : ", ",
		serverResponseTimeout : 1000,
		hideAutocompleteOnIddle : 10000,
		disableLog : false,
		scroll : false
	};

	$.Autocompleter.LastCache = function(options) {
		var data = null;

		function add(value) {
			data = value;
		}
		function filterSelected(q) {
			var d = [], i, item, x;
			if (!data) {
				return d;
			}
			for (i = 0; i < data.length; i+=1) {
				item = data[i];
				x = item.value.indexOf(q);
				if (x == -1) {
					d[d.length] = item;
				}
			}
			return JSON.stringify(d );
		}
		function filterList(q, items) {
			var d = [], i, item, x;
			if (!items) {
				return d;
			}
			for (i = 0; i < items.length; i+=1) {
				item = items[i];
				x = item.value.indexOf(q);
				if (x !== -1) {
					d[d.length] = item;
				}
			}
			return d ;
		}
		function get(value) {
			return filterList(value, data);
		}

		return {
			add : add,
			filterList : filterList,
			filterSelected : filterSelected,
			get : get
		};
	};

	$.Autocompleter.Cache = function(options) {

		var data = {}, length = 0;
		function matchSubset(s, sub) {
			if (!options.matchCase){
				s = s.toLowerCase();
			}
			var i = s.indexOf(sub);
			if (options.matchContains === "word") {
				i = s.toLowerCase().search("\\b" + sub.toLowerCase());
			}
			if (i === -1){
				return false;
			}
			return (i === 0 || options.matchContains);
		}
		function flush() {
			data = {};
			length = 0;
		}

		function add(q, value) {
			if (length > options.cacheLength) {
				flush();
			}
			if (!data[q]) {
				length++;
			}
			data[q] = value;
		}

		function populate() {
			if (!options.data){
				return false;
			}
			// track the matches
			var stMatchSets = {}, nullData = 0, i, rawValue, value, firstChar, row, ol;
			// no url was specified, we need to adjust the cache length to make
			// sure
			// it fits the local data store
			if (!options.url){
				options.cacheLength = 1;
			}

			// track all options for minChars = 0
			stMatchSets[""] = [];

			// loop through the array and create a lookup structure
			for (i = 0, ol = options.data.length; i < ol; i+=1) {
				rawValue = options.data[i];
				value = options.formatMatch(rawValue, i + 1, options.data.length);
				firstChar = value.charAt(0).toLowerCase();
				row = {
					value : value,
					data : rawValue,
					result : (options.formatResult && options.formatResult(rawValue)) || value
				};
				// if rawValue is a string, make an array otherwise just
				// reference
				// the array
				rawValue = (typeof rawValue === "string") ? [ rawValue ]
						: rawValue;

				if (value !== false){
					// if no lookup array for this character exists, look it up now
					if (!stMatchSets[firstChar]){
						stMatchSets[firstChar] = [];
					}
	
					// push the current match into the set list
					stMatchSets[firstChar].push(row);
	
					// keep track of minChars zero items
					if (nullData++ < options.max) {
						stMatchSets[""].push(row);
					}
				}
			}
			// add the data items to the cache
			$.each(stMatchSets, function(i, value) {
				// increase the cache size
				options.cacheLength++;
				// add to the cache
				add(i, value);
			});
		}
		// populate any existing data 
		setTimeout(populate, 25);

		return {
			flush : flush,
			add : add,
			populate : populate,
			load : function(q) {
				return null;
			}
		};
	};

	$.Autocompleter.Select = function(options, input, select, config, subrequest, autopopulate, logSelectedOnClick, selectCurrentOnClick) {
		var CLASSES = {
			ACTIVE : "ac_over"
		},
		vertVal, modulewidth_l ,modulewidth_r, listItems, active = -1, data, vdata, term = "", needsInit = true, acbody, element, list, listr;
		// Create results
		

		function target(event) {
			var element = event.target;
			while (element && element.tagName !== "LI"){
				element = element.parentNode;
			}
			// more fun with IE, sometimes event.target is empty, just ignore it
			// then
			if (!element){
				return [];
			}
			return element;
		}


		function movePosition(step) {
			active += step;
			if (active < 0 || active >= listItems.size()) {
				active -= step;
				return false;
			}
			return true;
		}
		function receiveSubData(value, m2data, flags) {
			AF_TRACKER.SELECTION = value;
			populateM2Data(value, m2data, flags);
	
		}
		
		function moveSelect(step, alist, items) {
			var previous = active, previousItem, offset, activeItem, record, istheremore = movePosition(step, alist);
			if (istheremore) {
				previousItem = items.slice(previous, previous + 1)
						.removeClass(CLASSES.ACTIVE);
				activeItem = items.slice(active, active + 1).addClass(CLASSES.ACTIVE);
				offset = 0;
				if (options.scroll) {
					items.slice(0, active).each(function() {
						offset += this.offsetHeight;
					});
					if ((offset + activeItem[0].offsetHeight - alist.scrollTop()) > alist[0].clientHeight) {
						alist.scrollTop(offset + activeItem[0].offsetHeight
								- alist.innerHeight());
					} else if (offset < alist.scrollTop()) {
						alist.scrollTop(offset);
					}
				}
			} else {
				 //check if we need to remove focus from first item
				if (active + step === -1) {
					active += step;
					items.slice(previous, previous + 1).removeClass(CLASSES.ACTIVE);
				}
			}
			var selected = items && items.filter("." + CLASSES.ACTIVE);
			if(selected && selected[0]){
				record = selected && $.data(selected[0], "ac_data");
				if(record){
					receiveSubData(record.value, null, record.flags );
					subrequest(record.value, receiveSubData, record.flags);
					autopopulate(term, record.value, record.pc);
				}
			}else{
				receiveSubData(term, null, null);
				subrequest(term, receiveSubData, null);
				autopopulate(term);
			
			}
		
		}

		function init() {
			var msie7 = /msie 7/;
			if (!needsInit){
				return;
			}
			//	absolute to body
			//	acbody = $("<div id=autocomplete-div></div>").hide().addClass(
			//	options.resultsClass).css("position", "absolute").appendTo(
			//	document.body);
			
			//relative to search div
			acbody = $("<div id=autocomplete-div></div>").hide().addClass(
					options.resultsClass).css("position", "relative!important").css("z-index","9999").appendTo("#search");
			element = $("<div id=autocomplete-div_l/>").addClass(
			"ac_wrapper_div_l").appendTo(acbody);
			
			listr = $("<div id=autocomplete-div_r/>").addClass(
			"ac_wrapper_div_r").appendTo(acbody);
			listr.mousedown(function() {
				config.mouseDownOnSelect = true;
				}).mouseup(function() {
				config.mouseDownOnSelect = false;
				}).mouseover(function() {
					AF_TRACKER.increase(2);
				});
			list = $("<ul/>")
					.appendTo(element).mouseout(function(event) {
						if (target(event).nodeName
								&& target(event).nodeName.toUpperCase() === 'LI') {
							//active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
							//active =-1;
							input.focus();
							return false;
						}
					}).mouseover(function(event) {
								if (target(event).nodeName
										&& target(event).nodeName.toUpperCase() === 'LI') {
									active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
									$(target(event)).addClass(CLASSES.ACTIVE);							
									var selected= $(target(event)).filter("." + CLASSES.ACTIVE);
									selected  = (selected && selected.length && ($.data(selected[0], "ac_data")));
									if (!selected) {
										return false;
									}
									AF_TRACKER.increase(2);
									
									subrequest(selected.value, receiveSubData, selected.flags);
									return false;
								}
					}).click(function(event) {
							var element = $(target(event));
							$(target(event)).addClass(CLASSES.ACTIVE);
							if(element[0] && element[0].tagName == "LI"){
								select();
								input.focus();
								return false;
							}
					}).mousedown(function() {
						config.mouseDownOnSelect = true;
					}).mouseup(function() {
						config.mouseDownOnSelect = false;
					});
			
			list = list.prevObject;
			if (options.width > 0){
				acbody.css("width", options.width);
			}

			needsInit = false;
			AF_TRACKER.setAfVersion(afversion);
			//call mbox to track autofill versions
			callmbox(afversion, options.env);
		}

		function limitNumberOfItems(available) {
			return options.max && options.max < available ? options.max
					: available;
		}
		
		function replaceAndChar( value) {
			if(value){
				value = value.replace(/\u003d/g, "=");
				return value.replace(/\u0026/g, "&");
			}else{
				return null;
			}
		}
		
		function isHTTPS(value){
			if(!value){
				return false;
			}
			if (value.match("https:")){
				return true;
			}
			return false;
		}
		
		function isSearsImage(value){
			if(!value){
				return false;
			}
			if (value.match("//s.shld.net/is/image/Sears/")){
				return true;
			}
			return false;	
		}
		

		/**
		 * 
		 */
		//var tempDiv ;
		function modifyRatio(src, width, height, style, defurl){
			var img = new Image(), newheight, newwidth;
			img.onload= function() {
				if(img.width > img.height) { 
					 newheight =Math.floor(width*(img.height/img.width));
					 img.width =width;
					 img.height= newheight;
					 $(img).width(width+'px');
					 $(img).height(newheight+'px');
					 $(img).css({
						 top: ( Math.floor((height -newheight)/2) +'px')
					  });
				} else {
					 newwidth = Math.floor(height*(img.width/img.height));
					 img.height=height;
					 img.width =newwidth;
					 $(img).height(height+'px');
					 $(img).width(newwidth+'px');
					 $(img).css({
						 left: ( Math.floor((width -newwidth)/2) +'px')
					  });
				}			
			};
			
			if(defurl){
				img.onerror = function () { 
					if(isSearsImage(defurl)){	
						img.src = defurl+"?wid="+width+"&hei="+height;
					}else{
						img.src = defurl;
					}
					if(img.width > img.height) { 
						 newheight =Math.floor(width*(img.height/img.width));
						 img.width =width;
						 img.height=newheight;
						 $(img).width(width+'px');
						 $(img).height(newheight+'px');
						 $(img).css({
							 top: ( Math.floor((height -newheight)/2) +'px')
						  });
					} else {
						 newwidth = Math.floor(height*(img.width/img.height));
						 img.height=height;
						 img.width =newwidth;
						 $(img).height(height+'px');
						 $(img).width(newwidth+'px');
						 $(img).css({
							 left: ( Math.floor((width -newwidth)/2) +'px')
						  });
					}
				};
			}

			img.width = width;
			img.height= height;
			img.className = style;
			if(isSearsImage(src)){	
				img.src = src+"?wid="+width+"&hei="+height;
			}else{
				img.src = src;
			}

		    return img;
		}

		function hoverChange(item, textclassname ){
			$(item).hover(
				 function () {
					$(this).addClass(textclassname);
				  },
				  function (itemDiv) {
					$(this).removeClass(textclassname);
				  }
			);
		}
		
		function hoverChangeWImage(item, imgchld, imgclassname,textchild, textclassname ){
			$(item).hover(
				 function () {
					$(this).children('.'+imgchld).addClass(imgclassname);
					$(this).children('.'+textchild).addClass(textclassname);
				  },
				  function (itemDiv) {
					$(this).children('.'+imgchld).removeClass(imgclassname);
					$(this).children('.'+textchild).removeClass(textclassname);
				  }
			);
		}
		function hoverChangeItemAndImage(item, imgchld, imgclassname, item2, textclassname){
			$(item).hover(
				 function () {
					$(this).children('.'+imgchld).addClass(imgclassname);
				  },
				  function (itemDiv) {
					$(this).children('.'+imgchld).removeClass(imgclassname);
				  }
			);
			if(item2){
				hoverChange(item2, textclassname );
			}
		}


		function getProductTitle(title){
			return aftruncate(title, 30);

		}
		/**
		 * search keyword with or without vertical
		 */
		function searchWithVt(keyword,  ms, sel, vertical){
			if(vertical){
				selectCurrentOnClick(keyword, vertical, null, null, ms, sel, false);			
			}else{
				selectCurrentOnClick(keyword, null, null, null, ms, sel, false);
			}
		}
		/**
		 * search with part url
		 */
		function searchPartURL(value, ms, sel){
			selectCurrentOnClick(null, null, value, null, ms, sel, false);

		}
		/**
		 * search with Cat url
		 */
		function searchCatURL(value, ms, sel){
			selectCurrentOnClick(null, null, null, value, ms, sel, false);

		}
		/**
		 * @param url the search url
		 * @param terms the term typed
		 * @param selected the selected
		 * 
		 */
		function logAndSearch(event){
			if(event.data.part){
				searchPartURL(event.data.part, event.data.ms, event.data.sel);
			}else if(event.data.cat){
				searchCatURL(event.data.cat, event.data.ms, event.data.sel);
			}else if ( event.data.selection){
				if( event.data.vertical){
					searchWithVt(event.data.selection,  event.data.ms, event.data.sel, event.data.vertical);
				}else{
					searchWithVt(event.data.selection,  event.data.ms, event.data.sel);
				}
			}		
		}
		
		/**
		 * search parts direct
		 */
		function logAndSearchPD(event){
			selectCurrentOnClick(event.data.selection, null, null, null, event.data.ms, event.data.sel, true);
		}
		/**
		 * Include parts Direct Link in listr element
		 */
		function includePartsDirectLink(flags, listr, query, showHR){
			
			if(flags && flags.pd &&flags.pd=="1"){	
				if(showHR){
					hr = $("<hr>").appendTo(listr)[0];	
				}
				var ms =10, hr, vertLi;
				vertLi = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
				vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("Replacement Parts")
				.click(
					{selection: query,  ms: ms, sel: query}, logAndSearchPD
				)
				.appendTo(listr)[0];
				hoverChange(vertLi, 'ac_prod_title_hover');
	
			}
			
		}
		function populateM2Data(query, m2data, flags) {
			listr.empty();
			var li,
			prdwidth=125,
			hr,
			max = 0,
			counter = 0,
			i = 0,
			j = 0,
			newData,
			noItems,
			formatted,
			verticals,
			hasPart = false,
			hasCat = false,
			hasItems = false,
			hasBso = false,
			showPDLine = false,
			bsoData =[],
			imgUrl,
			defUrl,
			itemDiv,
			imgwrapper,
			imgwrapper1,
			sTable,
			sRow,
			sCell,
			td,
			vLink,
			tax_VName,
			taxCName,
			taxSName,
			tax_vert,
			taxitem,
			vertLi,
			child_t,
			xx,
			pmlabel,
			indexOfUnderscore,
			temp,
			ms=0,
			aggwidth=0,
			protocol = window.location.protocol,
			minClassicItemsCounter =0,
			bso , cat, model,items;
			if (m2data) {
				max = limitNumberOfItems(m2data.length);
			}
			if ('string' === typeof m2data) {
				try{
					m2data = $.parseJSON(m2data);
				}catch(e){
					ms=8;
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];			
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
							{selection: query,  ms: ms, sel: query}, logAndSearch
					)
					.appendTo(listr)[0];

					return;
				}
			}
			if(m2data==null){
				ms=8;
				noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
				vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
				.click(
						//part, cat, ms,selection, vertical
						{selection: query,  ms: ms, sel: query}, logAndSearch
					//	{url: searchWithVt(query), term: term, sel: query, ms: ms}, logAndSearch
				)
				.appendTo(listr)[0];

				return;
			}
			//old autofill
			if(	typeof m2data.items  === 'undefined'
					&& typeof m2data.bso === 'undefined'
					&& typeof m2data.cat === 'undefined'
					&& typeof m2data.model === 'undefined'){
				ms=8;
				noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
				vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
				.click(
						//part, cat, ms,selection, vertical
						{selection: query,  ms: ms, sel: query}, logAndSearch
					//{url: searchWithVt(query), term: term, sel: query, ms: ms}, logAndSearch
				)
				.appendTo(listr)[0];
				return;
			}
			//new autofill
			else{
				try{
					bso = m2data.bso;
					cat = m2data.cat;
					model = m2data.model;
					items = m2data.items;
				}catch(ee){
					ms=8;
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
						//part, cat, ms,selection, vertical
						{selection: query,  ms: ms, sel: query}, logAndSearch
						//{url: searchWithVt(query), term: term, sel: query, ms: ms}, logAndSearch
					)
					.appendTo(listr)[0];
					return;
				}
			}
			

			var selectedData =[], vtlist;
			if(items && items[0] && items[0].vt && items[0].vt.length > 0){
				vtlist= items[0].vt;
			}
			ms=0;
			if(model){
				ms=5;//model in 2 col layout
				i=0;
				while(model[i]) {
					aggwidth+=prdwidth;
					if( aggwidth > modulewidth_r	){
						break;
					}	
					model[i].value =model[i].t;
					model[i].i= replaceAndChar(model[i].i);
					if(!model[i].i ){
						i+=1;
						continue;
					}
					if(isHTTPS(protocol)){
						if(!isSearsImage(model[i].i)){
							i+=1;
							continue;
						}else{
							model[i].i =model[i].i.replace("http","https");
							selectedData[selectedData.length] = model[i];
						}
					}else{
						selectedData[selectedData.length] = model[i];
					}
					i+=1;
				}
				//render data
				sTable = $("<table/>").addClass("ac_table").appendTo(listr)[0];
				sRow = $("<tr/>").addClass("ac_row").appendTo(sTable)[0];
				//END List BSO Data if any
				//List BSO Data if any
				if(selectedData){
					for( xx=0;xx< selectedData.length;xx++) {
						formatted = options.formatItem(selectedData[xx], xx + 1, max, selectedData[xx].value, term);
						if (formatted === false){
							i+=1;
							continue;
						}	
						imgUrl = selectedData[xx].i;
		
						td = $("<td/>").addClass("ac_cell");
						td.css({
							width : prdwidth+'px'
						});
						imgwrapper1 = $("<div/>").addClass("ac_title").attr('title',trimExtraSpaces(selectedData[xx].value));
						imgwrapper = $("<div/>").addClass("ac_prod_img_div");
						imgwrapper.append(modifyRatio(imgUrl,  114, 114, 'ac_image'));
						hoverChangeWImage(imgwrapper1, 'ac_prod_img_div','ac_prod_hover','ac_prod_title','ac_prod_title_hover');
						
						imgwrapper1.append(imgwrapper).append("<span class='ac_prod_title'>"+options.highlightInStr( getProductTitle(selectedData[xx].value), term)+"</span>");
						td.click(
							{part: "p_"+options.storeId+ "_"+selectedData[xx].pu,  ms: ms, sel: selectedData[xx].pu}, logAndSearch
						).append(imgwrapper1)
						.appendTo(sRow)[0];	
						showPDLine =true;
						i+=1;
					}
				}
				td = 	$("<td/>").addClass("ac_cell").html("&nbsp;");
				td.css({
					width : 'auto'
				});
				td.appendTo(sRow)[0];
				/*######################  END MODEL   ##################################*/
				i+=1;
				//end model start bso	
	
				if(flags != undefined){
					includePartsDirectLink(flags, listr, query, showPDLine);
				}
			

			}else if(bso){
				showPDLine =false;
				ms=6;//bso in 2 col layout
				i=0;
				//noItems = $("<span></span>").addClass("no-items").append("BSO ").appendTo(listr);
				/*######################  BSO   ##################################*/
				while(bso[i]) {
					aggwidth+=prdwidth;
					if( aggwidth > modulewidth_r){
						break;
					}	
					bso[i].value =bso[i].t;
					bso[i].i= replaceAndChar(bso[i].i);
					if(!bso[i].i ){
						i+=1;
						continue;
					}
					if(isHTTPS(protocol)){
						if(!isSearsImage(bso[i].i)){
							i+=1;
							continue;
						}else{
							bso[i].i =bso[i].i.replace("http","https");
							selectedData[selectedData.length] = bso[i];
						}
					}else{
						selectedData[selectedData.length] = bso[i];
					}
					i+=1;
				}
				//render data
				sTable = $("<table/>").addClass("ac_table").appendTo(listr)[0];
				sRow = $("<tr/>").addClass("ac_row").appendTo(sTable)[0];
				//END List BSO Data if any
				//List BSO Data if any
				if(selectedData){
					for(xx=0;xx< selectedData.length;xx++) {
						formatted = options.formatItem(selectedData[xx], xx + 1, max, selectedData[xx].value, term);
						if (formatted === false){
							i+=1;
							continue;
						}	
						imgUrl = selectedData[xx].i;
						td = $("<td/>").addClass("ac_cell");
						td.css({
							width : prdwidth+ 'px'
	
						});
						imgwrapper1 = $("<div/>").addClass("ac_title").attr('title',trimExtraSpaces(selectedData[xx].value));
						imgwrapper = $("<div/>").addClass("ac_prod_img_div");
						
						imgwrapper.append(modifyRatio(imgUrl,  114, 114, 'ac_image'));
						
						hoverChangeWImage(imgwrapper1, 'ac_prod_img_div','ac_prod_hover','ac_prod_title','ac_prod_title_hover');
						imgwrapper1.append(imgwrapper).append("<span class='ac_prod_title'>"+options.highlightInStr( getProductTitle(selectedData[xx].value), term)+"</span>");
						td.click(
							{part: "p_"+options.storeId+ "_"+selectedData[xx].pu,  ms: ms, sel: selectedData[xx].pu}, logAndSearch
						)
						.append(imgwrapper1)
						.appendTo(sRow)[0];	
						showPDLine =true;
					}
				
					td = 	$("<td/>").addClass("ac_cell").html("&nbsp;");
					td.css({
						width : 'auto'
					});
					td.appendTo(sRow)[0];	
				}
				if(flags != undefined){
					includePartsDirectLink(flags, listr, query, showPDLine);
				}
				
				
				i=0;
				/*######################   END BSO  ##################################*/
				if(cat){
					showPDLine =false;
					ms=7;//taxonomy in 2 col layout
					hr = $("<hr>").appendTo(listr)[0];
				/*######################   CAT in BSO   ##################################*/
					sTable = $("<table/>").addClass("ac_table").appendTo(listr)[0];
					sRow = $("<tr/>").addClass("ac_row").appendTo(sTable)[0];
					var cols =0;
					while(cat[i]) {
						cat[i].value = cat[i].it;
						formatted = options.formatItem(cat[i], i + 1, max, cat[i].value, term);
						if (formatted === false){
							i+=1;
							continue;
						}
						tax_vert =null;
						if(cat[i].t){
							 if(cat[i].pt && cat[i].t && cat[i].t=="s"){
								indexOfUnderscore = cat[i].pt.indexOf("_");
								if(indexOfUnderscore != -1){
									tax_vert = cat[i].pt.substring(0, indexOfUnderscore);
									taxitem = cat[i].pt.substring(indexOfUnderscore+1);
								}else{
									tax_vert = cat[i].pt;
								}
							}
							if(cat[i].pt){
								 cat[i].catUrl = cat[i].t +"_"+ options.storeId+ "_" + cat[i].pt;	
							}

							itemDiv = $("<td/>").addClass("ac_cell").appendTo(sRow)[0];	
							if(cat[i].it){
								if(cat[i].t=="v"){
									li = $("<li/>").addClass("ac_tax_li_small_link").html(options.highlightInStr(cat[i].pt, query))
									.click(									
										{cat: cat[i].t +"_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
									)
									.appendTo(itemDiv)[0];									
								}else if(cat[i].t=="c" ){
									li = $("<li/>").addClass("ac_tax_li_small").html("<span class='black-color'>in</span>  "+ options.highlightInStr(cat[i].p, query))			
									.appendTo(itemDiv)[0];	
								}else{
									li = $("<li/>").addClass("ac_tax_li_small").html( "<span class='black-color'>in</span>  "+ options.highlightInStr(cat[i].p, query))
									.appendTo(itemDiv)[0];	
								
								}
							}
						
							if(cat[i].c && cat[i].c.length){
								child_t = cat[i].t;
								if(cat[i].t=="v"){
									child_t = "c";
								}else if(cat[i].t=="c"){
									child_t = "s";
								}
								for ( j = 0; j < cat[i].c.length; j+=1) {
									if(j==2){
										break;
									}
									if (cat[i].c[j].cName) {
										vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append(cat[i].c[j].cName)
										.click(
											{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j].cName,  ms: ms, sel: cat[i].c[j].cName}, logAndSearch
										).appendTo(itemDiv)[0];
										hoverChange(vertLi, 'ac_prod_title_hover');
									
									}
									else {
										vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append(cat[i].c[j])
										.click(
											{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j],  ms: ms, sel: cat[i].c[j]}, logAndSearch
										).appendTo(itemDiv)[0];
										hoverChange(vertLi, 'ac_prod_title_hover');
									
									}
								}
								//add the cat  or subcat page
								if((cat[i].t == "c")){
									vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All "+ cat[i].pt.substring( cat[i].pt.lastIndexOf("_")+1))
									.click(
										{cat: cat[i].t+ "_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
									).appendTo(itemDiv)[0];
									hoverChange(vertLi, 'ac_prod_title_hover');
								}else{
									j=2;
									if (cat[i].c[j].cName) {	
										vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append(cat[i].c[j].cName)
										.click(
											{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j].cName,  ms: ms, sel: cat[i].c[j].cName}, logAndSearch
										)
										.appendTo(itemDiv)[0];	
										hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
									
									}else  {	
										vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append(cat[i].c[j])
										.click(
											{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j],  ms: ms, sel: cat[i].c[j]}, logAndSearch
										)
										.appendTo(itemDiv)[0];	
										hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
									
									}
								}
							
							}else{
								vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append(cat[i].it)
								.click(
									{cat: "s_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
								).appendTo(itemDiv)[0];
								hoverChange(vertLi, 'ac_prod_title_hover');
							}
							hasCat =true;
						}
						i+=1;
						cols++;
						if(cols%2==0){
							sRow = $("<tr/>").addClass("ac_row").appendTo(sTable)[0];
						}
					}
					/*######################  END CAT in BSO   ##################################*/
				}else if(vtlist){
					ms=9;//vertical list in 2 col layout
					hr = $("<hr>").appendTo(listr)[0];
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in: ").appendTo(listr);
				
					itemDiv = $("<div/>").addClass("ac_li_wrapper").appendTo(listr)[0];

						for ( j = 0; j < vtlist.length; j+=1) {
							if(j==2){
								break;
							}
							if (vtlist[j]) {
								vertLi = $("<li id='" + i.toString()  + j.toString()  + "'></li>")
								.addClass("ac_arrow_vert_li").append( vtlist[j])
								.click(
									{selection: query, vertical: vtlist[j],  ms: ms, sel: query}, logAndSearch
								)
								.appendTo(itemDiv)[0];
								hoverChange(vertLi, 'ac_prod_title_hover');
							}
						}
						//add the all departments
						vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
						.click(
							{selection: query,  ms: 8, sel: query}, logAndSearch
						).appendTo(itemDiv)[0];
						hoverChange(vertLi, 'ac_prod_title_hover');
					
				}else{
					ms=8;
					hr = $("<hr>").appendTo(listr)[0];
					vertLi = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
						{selection: query,  ms: ms, sel: query}, logAndSearch
					)
					.appendTo(listr)[0];
					hoverChange(vertLi, 'ac_prod_title_hover');
				}
				
				//end bso start cat	
				
			}
			else if(flags != undefined){
				if(flags && flags.pd &&flags.pd=="1"){
					showPDLine =false;
					includePartsDirectLink(flags, listr, query, showPDLine);	
				} else{
					ms=8;
					vertLi = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
						{selection: query,  ms: ms, sel: query}, logAndSearch
					)
					.appendTo(listr)[0];
					hoverChange(vertLi, 'ac_prod_title_hover');
				}
			} else if( cat){
				ms=7;//cat in 2 col layout
				i=0;
				//noItems = $("<span></span>").addClass("no-items").append("CAT ").appendTo(listr);
				/*######################   CAT   ##################################*/
				while(cat[i]) {
					cat[i].value = cat[i].it;
					formatted = options.formatItem(cat[i], i + 1, max, cat[i].it, term);
					if (formatted === false){
						i+=1;
						continue;
					}
					tax_vert =null;
					if(cat[i].t){
						if (cat[i].hline) {
							hr = $("<hr>").appendTo(listr)[0];
						}
						/*
						 * To be used if link for parent is needed
						 */
						 if(cat[i].pt && cat[i].t && cat[i].t=="s"){
							indexOfUnderscore = cat[i].pt.indexOf("_");
							if(indexOfUnderscore != -1){
								tax_vert = cat[i].pt.substring(0, indexOfUnderscore);
							}else{
								tax_vert = cat[i].pt;
							}
						}
						if(cat[i].pt){
							 cat[i].catUrl = cat[i].t +"_"+ options.storeId+ "_" + cat[i].pt;	
						}

						imgUrl = replaceAndChar(cat[i].i);
						if(!imgUrl){
							i+=1;
							continue;
						}
						if(isHTTPS(protocol)){
							if(!isSearsImage(imgUrl)){
								i+=1;
								continue;
							}else{
								imgUrl = imgUrl.replace("http","https");
							}
						}

						if(cat[i].def){
							if(cat[i].def.toLowerCase()=="nil"){
								defUrl ="";
							}else{
								if(isHTTPS(protocol)){
									if(!isSearsImage(cat[i].def)){
										i+=1;
										continue;
									}else{
										defUrl = replaceAndChar(cat[i].def);	
										defUrl = defUrl.replace("http","https");
									}
								}else{
									defUrl = replaceAndChar(cat[i].def);
								}
									
							}
							itemDiv = $("<div/>").addClass("ac_li_img_wrapper").appendTo(listr)[0];	
							imgwrapper = $("<div/>").addClass("ac_tax_img_div");	
							imgwrapper.append(modifyRatio(imgUrl,  78, 78, 'ac_image', defUrl));
							imgwrapper.click(
									{cat: cat[i].catUrl,  ms: ms, sel: cat[i].catUrl}, logAndSearch
							).appendTo(itemDiv)[0];
						}else{
							itemDiv = $("<div/>").addClass("ac_li_img_wrapper").appendTo(listr)[0];	
							imgwrapper = $("<div/>").addClass("ac_tax_img_div");	
							imgwrapper.append(modifyRatio(imgUrl,  78, 78, 'ac_image'));
							imgwrapper.click(
									{cat: cat[i].catUrl,  ms: ms, sel: cat[i].catUrl}, logAndSearch
							).appendTo(itemDiv)[0];
						}
					
						if(cat[i].it){
							if(cat[i].t=="v"){
								li = $("<li/>").addClass("ac_tax_li_big_link").html(options.highlightInStr(cat[i].pt, query))
								.click(
									{cat: cat[i].t +"_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
								)
								.appendTo(itemDiv)[0];	
							}else if(cat[i].t=="c" ){
								li = $("<li/>").addClass("ac_tax_li_big").html("<span class='black-color'>in</span>  "+ options.highlightInStr(cat[i].p, query))
								.appendTo(itemDiv)[0];		
							}else{
								li = $("<li/>").addClass("ac_tax_li_big").html("<span class='black-color'>in</span>  "+ options.highlightInStr(cat[i].p, query))
								.appendTo(itemDiv)[0];
								
							}
						}
						
						$.data(li, "ac_data", cat[i]);
					
						if(cat[i].c && cat[i].c.length){
							child_t = cat[i].t;
							if(cat[i].t=="v"){
								child_t = "c";
							}else if(cat[i].t=="c"){
								child_t = "s";
							}
							for ( j = 0; j < cat[i].c.length; j+=1) {
								if(j==2){
									break;
								}
								if (cat[i].c[j].cName) {	
									vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append(cat[i].c[j].cName)
									.click(
										{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j].cName,  ms: ms, sel: cat[i].c[j].cName}, logAndSearch
									)
									.appendTo(itemDiv)[0];	
									hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
								
								} else {	
									vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append(cat[i].c[j])
									.click(
										{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j],  ms: ms, sel: cat[i].c[j]}, logAndSearch
									)
									.appendTo(itemDiv)[0];	
									hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
								
								}
							}
							//add the cat  or subcat page
							if((cat[i].t == "c")){
								vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append("All "+ cat[i].pt.substring( cat[i].pt.lastIndexOf("_")+1))
								.click(
										{cat: cat[i].t+ "_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
								)
								.appendTo(itemDiv)[0];
								hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');	
								
								
							}else{
								j=2;
								if (cat[i].c[j].cName) {	
									vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append(cat[i].c[j].cName)
									.click(
										{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j].cName,  ms: ms, sel: cat[i].c[j].cName}, logAndSearch
									).appendTo(itemDiv)[0];	
									hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
								
								}else {	
									vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append(cat[i].c[j])
									.click(
										{cat: child_t +"_"+ options.storeId+ "_"+cat[i].pt+ "_"+cat[i].c[j],  ms: ms, sel: cat[i].c[j]}, logAndSearch
									).appendTo(itemDiv)[0];	
									hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');								
								
								}
							}
						}else{
							vertLi = $("<li></li>").addClass("ac_arrow_vert_img_li").append(cat[i].it)							
							.click(
								{cat: "s_"+ options.storeId+ "_"+cat[i].pt,  ms: ms, sel: cat[i].pt}, logAndSearch
							)
							.appendTo(itemDiv)[0];
							hoverChangeItemAndImage(itemDiv, 'ac_tax_img_div','ac_prod_hover', vertLi, 'ac_prod_title_hover');	
						}
						hasCat =true;
					}
					i+=1;
				}
				i=0;
				/*######################   CAT END ####################################*/
				if(vtlist){
					ms=9;//vertical in 2 col layout
					hr = $("<hr>").appendTo(listr)[0];
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in: ").appendTo(listr);
					itemDiv = $("<div/>").addClass("ac_li_wrapper").appendTo(listr)[0];

						for ( j = 0; j < vtlist.length; j+=1) {
							if(j==2){
								break;
							}
							if (vtlist[j]) {
								vertLi = $("<li id='" + i.toString()  + j.toString()  + "'></li>")
								.addClass("ac_arrow_vert_li").append( vtlist[j])
								.click(
									{selection: query, vertical: vtlist[j], ms: ms, sel: query}, logAndSearch
								)
								.appendTo(itemDiv)[0];
								hoverChange(vertLi, 'ac_prod_title_hover');
							
							}
						}
						//add the all departments
						vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
						.click(
							{selection: query,  ms: 8, sel: query}, logAndSearch
						).appendTo(itemDiv)[0];
						hoverChange(vertLi, 'ac_prod_title_hover');
					
				}else{
					ms=8;
					hr = $("<hr>").appendTo(listr)[0];
					vertLi =  $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in:").appendTo(listr)[0];
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
						{selection: query,  ms: ms, sel: query}, logAndSearch
					)
					.appendTo(listr)[0];
					hoverChange(vertLi, 'ac_prod_title_hover');
				}
			}else{
				if(vtlist){
					ms=9;
					//hr = $("<hr>").appendTo(listr)[0];
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in: ").appendTo(listr);
					itemDiv = $("<div/>").addClass("ac_li_wrapper").appendTo(listr)[0];

						for ( j = 0; j < vtlist.length; j+=1) {
							if(j==2){
								break;
							}
							if (vtlist[j]) {
								vertLi = $("<li id='" + i.toString()  + j.toString()  + "'></li>")
								.addClass("ac_arrow_vert_li").append( vtlist[j])
								.click(
									{selection: query, vertical: vtlist[j], ms: ms, sel: query}, logAndSearch
								)
								.appendTo(itemDiv)[0];
								hoverChange(vertLi, 'ac_prod_title_hover');
							
							}
						}
						//add the all departments
						vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
						.click(
							{selection: query, ms: 8, sel: query}, logAndSearch
						).appendTo(itemDiv)[0];
						hoverChange(vertLi, 'ac_prod_title_hover');
					
				}else{
					ms=8;
					//hr = $("<hr>").appendTo(listr)[0];
					noItems = $("<div></div>").addClass("af-label").append("Search for &#34;"+ query+"&#34; in: ").appendTo(listr)[0];
					vertLi = $("<li></li>").addClass("ac_arrow_vert_li").append("All Departments")
					.click(
						{selection: query, ms: ms, sel: query}, logAndSearch
					)
					.appendTo(listr)[0];
					hoverChange(vertLi, 'ac_prod_title_hover');
				}
				
			}
		}

		function fillList() {
				list.empty();
				listr.empty();
				var li,
				hr,
				max = 0,
				counter = 0,
				i = 0,
				j = 0,
				newData,
				noItems,
				formatted,
				verticals,
				hasPart = false,
				hasCat = false,
				hasItems = false,
				hasBso = false,
				bsoData =[],
				imgUrl,
				defUrl,
				itemDiv,
				vLink,
				tax_vert,
				pmlabel,
				indexOfUnderscore,
				temp,
				firstitem=null,
				protocol = window.location.protocol,
				itemsCounter =0,
				minClassicItemsCounter =0;
				if (data) {
					max = limitNumberOfItems(data.length);
				}
				if (max === 0) {
					hr = $("<hr>").appendTo(list)[0];
					noItems = $("<span></span>").addClass("no-items").append(
							"Just click enter when you are ready").appendTo(list);
				} else {
				
				//List the Items
				//reset j variable
				j = 0;
				var flags, isPDOnly;
				while(data[i]) {
					if(data[i].isitem){
						if(firstitem==null){
							firstitem = data[i].value;
							flags =data[i].flags;
						}
						if(itemsCounter > 15 && minClassicItemsCounter >= 3){
							break;
						}
					
						formatted = options.formatItem(data[i], i + 1, max, data[i].value, term);
						if (formatted === false){
							i+=1;
							continue;
						}
						isPDOnly = ( data[i].flags  && data[i].flags.pd=="1" && data[i].flags.wcs=="0");
						if(isPDOnly){
							formatted.info = " <span class='black-color'>&nbsp;&nbsp;in parts</span>";
						}
						if (data[i].hline==true) {
							hr = $("<span class='black-color'><hr/></span> ").appendTo(list)[0];
							li = $("<li id='" + i.toString()  + "'/>")
									.addClass("ac_results_li").html(options.highlight(formatted, term )).appendTo(list)[0];
						} else {
							li = $("<li id='" + i.toString()  + "'/>")
									.addClass("ac_results_li").html(options.highlight(formatted, term)).appendTo(list)[0];
						}
	
						$.data(li, "ac_data", data[i]);
			
						minClassicItemsCounter +=1;
						itemsCounter+=1;
					}
					i+=1;
				}
				//List the Items
					
				//END List BSO Data if any
				
				listItems = list.find("li");
				if (options.selectFirst) {
					listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
					active = 0;
				}
				if(firstitem !=null ){
					subrequest(firstitem, receiveSubData, flags);
				}
			}
		}


		return {
		
			display : function(d, q) {
				init();
				data = d;
				term = q;
				fillList();
			},
			next : function() {
				moveSelect(1, list, listItems);
			
			},
			prev : function() {
				moveSelect(-1, list, listItems);
			},
			pageUp : function() {
				if (active !== 0 && active - 8 < 0) {
					moveSelect(-active, list);
				} else {
					moveSelect(-8, list);
				}
			},
			pageDown : function() {
				if (active !== listItems.size() - 1
						&& active + 8 > listItems.size()) {
					moveSelect(listItems.size() - 1 - active,  list);
				} else {
					moveSelect(8, list);
				}
			},
			hide : function() {
				if(acbody ){ acbody.hide();}
				if(listItems ){ listItems.removeClass(CLASSES.ACTIVE);}
				active = -1;
			},
			removeSelection : function() {
				if(listItems) { listItems.removeClass(CLASSES.ACTIVE);}
				active = -1;
			},
			visible : function() {
				return (acbody && acbody.is(":visible"));
			},
			current : function() {
				return this.visible() && ((listItems.filter("." + CLASSES.ACTIVE)[0]) || (options.selectFirst
								&& listItems[0]));
			},
			show : function() {
				var adjWidth = (options.site  =='kmart') ? 188 : 58;
				var offset = $(input).offset(), h1, h2, 
				inputwidth =  (typeof options.width === "string" || options.width > 0 ? (options.width) : ($(input).width())) + adjWidth;
				if(inputwidth < 500){
					modulewidth_r = (inputwidth /2)-1;
					modulewidth_l = inputwidth /2;
				}else{
					modulewidth_r = (inputwidth < 900) ? (inputwidth-301) :((inputwidth/3)*2)-1;
					modulewidth_l = (inputwidth < 900) ? 300 : (inputwidth / 3);
				}
				
				/********BODY POSITIONING*************
				acbody.css({
					width : inputwidth,
					top : (typeof calcafadj  =='undefined') ? (offset.top + input.offsetHeight) : calcafadj(input, options.storeId),
					left : offset.left+4
				}).show();
				********SEARCH DIV RELATIVE POSITIONING*************/
				acbody.css({
					width : inputwidth
				}).show();
				/**************************/
				
				element.css({width : modulewidth_l });
				listr.css({width : modulewidth_r });
	
				if (options.scroll) {
					list.scrollTop(0);
					list.css({
						maxHeight : options.scrollHeight,
						overflow : 'auto'
					});

					if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
						listHeight = 0;
						listItems.each(function() {
							listHeight += this.offsetHeight;
						});
						scrollbarsVisible = listHeight > options.scrollHeight;
						list.css('height',scrollbarsVisible ? options.scrollHeight: listHeight);
						if (!scrollbarsVisible) {
							// IE doesn't recalculate width when scrollbar
							// disappears
							listItems.width(list.width()
									- parseInt(listItems.css("padding-left"),10)
									- parseInt(listItems.css("padding-right"),10));
						}
					}
				}
				
			},
			selected : function() {
				var selected = listItems
						&& listItems.filter("." + CLASSES.ACTIVE).removeClass(
								CLASSES.ACTIVE);
				return (selected && selected.length
						&& ($.data(selected[0], "ac_data")));
			},
			highlighted : function() {
				var selected = (listItems
						&& listItems.filter("." + CLASSES.ACTIVE));
				return (selected && selected.length
						&& ($.data(selected[0], "ac_data")));
			},
			emptyList : function() {
				if( typeof list !== "undefined"){
					 list.empty();
				}
				
			},
			emptyRightList : function() {
				if( typeof listr !== "undefined"){
					 listr.empty();
				}
				
			},
			unbind : function() {
				if( typeof element !== "undefined"){
				   element.remove();
				}
			}
		};
	};

	$.fn.selection = function(start, end) {
		if (start !== undefined) {
			return this.each(function() {
				if (this.createTextRange) {
					var selRange = this.createTextRange();
					if (end === undefined || start === end) {
						selRange.move("character", start);
						selRange.select();
					} else {
						selRange.collapse(true);
						selRange.moveStart("character", start);
						selRange.moveEnd("character", end);
						selRange.select();
					}
				} else if (this.setSelectionRange) {
					this.setSelectionRange(start, end);
				} else if (this.selectionStart) {
					this.selectionStart = start;
					this.selectionEnd = end;
				}
			});
		}
		var field = this[0], range, orig , teststring, textLength, caretAt;
		if (field.createTextRange) {
			range = document.selection.createRange();
			orig = field.value;
			teststring = "<->";
			textLength = range.text.length;
			range.text = teststring;
			caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {
				start : caretAt,
				end : caretAt + textLength
			};
		} else if (field.selectionStart !== undefined) {
			return {
				start : field.selectionStart,
				end : field.selectionEnd
			};
		}
	};
})(jQuery);



/************AUTOFILL CODE **************/
var AF_TRACKER = {
	AF_SELECTED: "Not Selected", 
	QUERY: "",
	SELECTION: "",
	KEY_STROK_COUNT: 0,
	AF_VERSION: 0,

	getTrackInfo : function() {
		return  this.AF_SELECTED;
	},
	setAfVersion : function(val) {
		this.AF_VERSION =val;
	},
	getQuery : function() {
		return trimExtraSpaces(this.QUERY);
	},
	getSelection : function() {
		return trimExtraSpaces(this.SELECTION);
	},
	increase : function(val) {
		this.KEY_STROK_COUNT +=val;
		if(this.KEY_STROK_COUNT >= 2){
			this.AF_SELECTED = "Selected";
		}
	}
};

function trimExtraSpaces(s){
	return s.mtrim().trim();
}

function af_omniture_update(){
	var keyword = escape($('#keyword').val());
	if(typeof s != 'undefined'){
		try{
			s.eVar56 = s.prop56 = (typeof AF_TRACKER =='undefined')  ? "Autofill > Selected": "Autofill > "+ AF_TRACKER.getTrackInfo();
			s.linkTrackVars = "prop56,eVar4,evar40,eVar56,prop12,prop10,channel,prop1,prop2,prop3,prop23,prop27,prop28,prop44";
			s.prop12 = "Search Click";
			s.prop44 = (typeof AF_TRACKER =='undefined')  ? keyword.trim(): AF_TRACKER.getSelection();
			s.evar40 = 'Search';
			s.prop23 = 'Autofill:'+ AF_TRACKER.getTrackInfo();
			s.eVar4  = (typeof AF_TRACKER =='undefined')  ? keyword.trim(): AF_TRACKER.getSelection();
			s.tl(true, "o", "Search Click");
		}catch(e){
		}
	}
}
/**
 * Truncate a string to a specified length, optionally adding suffix (for ex '...').
 * @param {String} val the string to operate on
 * @param {Object} [{length: 30, suffix: '', delim: ''}]
 * @returns the truncated string with delimiter if truncated else the string itself
*/
function aftruncate (val, ln) {
	if(val.length < ln){
		return val;
	}
	return FED.Util.truncate(trimExtraSpaces(val), {length:ln, delim:'', suffix:'...'});
}

if (!String.prototype.contains) {
	String.prototype.contains = function(s) {
		return this.indexOf(s) != -1; 
	};
}
function doSearch(env){
	$.addToHistory();
	var vertical, part, url, keyword, produrl="/shc/s/", action = $("#srchFrm").attr("action");
	vertical = escape($('#vName').val());
	part = escape($('#part').val());
	url = escape($('#url').val());
	keyword = $('#keyword').val();
	
	keyword = FED.Util.truncate(keyword, {length:100});
	
	keyword = escape(keyword);
	
	//add the Omniture stuff
	if(env=='beta' || env=='prod'|| env=='searsqa'){
		af_omniture_update();
	}
	if(env=='qa' || env=='dev'){
		action="http://www.sears.com"+ action;
		produrl = "http://www.sears.com/shc/s/";	
	}
	
	$('#vName, #part, #url').val("");

	if (trimExtraSpaces(part) !== "") {
		document.location = produrl + part;
	} else if (trimExtraSpaces(keyword) !== "") {
		if (trimExtraSpaces(vertical) !== "") {
			document.location = action + "?keyword=" + keyword + "&vName=" + vertical+ "&catPrediction=false";
		} else {
			document.location = action + "?keyword=" + keyword;
		}
	} else if (trimExtraSpaces(url) !== "") {
		document.location = produrl + url;
	}
}
/**
 * 
 * Method to determine the current autofill site
 * @returns {String}
 */
function getAutofillSite(){
	 var host = location.hostname;
	 var result;
	 if (host.match("kmart")) {
		 if (host.match("m.kmart")) {
			 result = "mkmart";
		 } else {
			 result = "kmart";
		 }
	 } else if (host.match("mygofer")) {	 
		 result = "mygofer";
	 } else if (host.match("m.sears")) {
		 result = "msears";
	 } else {
		 result = "sears";
	 }

	 return result;
}




function loadAutofill() {
	loadAutofill(null);
}
/**
 * 
 * @param path (optional) for non standard path eg: testing in local, specify full path
 */

function loadAutofill(apath) {
	var afpath, storeid, path=apath, environment,
	otcookie = $.cookie("ot"),
	//above logic does not work for goldfish, this will take care of it.
	website = (typeof getLocalAutofillSite  =='undefined') ?  getAutofillSite() : getLocalAutofillSite();

	switch(website){
		case "sears":
			afpath="/AutoFill/sears";
			storeid=(location.hostname === "www.sears.com.pr") ? "10165_26151" : "10153_12605";
			//storeid="10153_12605";
			break;		
		case "kmart":
			afpath="/AutoFill/kmart";
			storeid="10151_10104";
			break;		
		case "msears":
			afpath="/AutoFill/msears";
			storeid="10153_12605";
			break;	
		case "mkmart":
			afpath="/AutoFill/mkmart";
			storeid="10151_10104";
			break;
		case "mygofer":
			afpath="/AutoFill/mygofer";
			storeid="10175_27151";
			break;		
		default:
			afpath="/AutoFill/sears";
			storeid="10153_12605";
			website="sears";
			break;	
	}
	
	// is local, takes care of goldfish page
	if((typeof getAutofillEnv  != 'undefined')){
		environment = getAutofillEnv();
	}else{	
		if(!FED.Util.isEmpty(otcookie)){
			//has ot cookie, is sears beta or prod.
			if(otcookie.startsWith("beta")){
				environment="beta";	
			}else if(otcookie.startsWith("prod")){
				environment="prod";	
			} else{
				//it should not come here, unless ot cookie local and zeta are put back
				environment="searsqa";
			}
		}else{
			// no ot cookie
			//is sears qa or kmart qa or mygofer qa otherwise is msears, kmart, mkmart, mygofer prod env.
			if(website=="sears"){
				environment = (typeof getAutofillEnv  =='undefined') ? "searsqa" : getAutofillEnv();
			}else{
				//is kmart qa, mygofer qa, msears, kmart, mkmart, mygofer prod env.
				//we have no other way of telling which one is it, just split prod from everything else.
				if (window.location.hostname.match("www\.[a-zA-Z]+\.com")) {
					environment = "prod";
				}else{
					environment="searsqa";
				}
			}
		}
	}
	
	if(environment=="searsqa" && path==null){
		path=location.protocol + "//autofill301p.qa.ch3.s.com:8180/AutoFill/"+website;
		storeid="10153_12605";
	}

	if(!FED.Util.isEmpty(path)){
		afpath=path;
	}

	$.loadHistory();

	if (location.href.match(/WeeklyAdHome|WeeklyAdDept/gi) && typeof searchwithinLocalAd === 'function') {
		//no autofill for WeeklyAd
		var  searchKeywordLabel=$("#keywordLabel");
		searchKeywordLabel.text('Search SearsLocalAd');
		searchKeywordLabel.show();
	} else {	
	 $("#keyword").autocomplete( afpath, {
			delay: 5,
			hideAutocompleteOnIddle: 10000,
			serverResponseTimeout: 1000,
			storeId: storeid,
			env: environment,
			site: website,
			action: doSearch
		});
	}
}

/***** MBOX CALL*****/
function callmbox(afversion, environment){	
	var otcookie = $.cookie("ot"), website = (typeof getLocalAutofillSite  =='undefined') ?  getAutofillSite() : getLocalAutofillSite();
	try{	
		//if(environment=='beta' || environment=='prod' || environment=='searsqa'){
		if(!FED.Util.isEmpty(otcookie) && website=="sears"){	
			mboxDefine("autocomplete-div", "mbox_autofill", "autofill="+ (afversion || "none"));	
			mboxUpdate("mbox_autofill");
		}
	}catch(e){}
}

/***********LOAD AUTOFILL***************/
loadAutofill();
/************AUTOFILL CODE**************/