
/**
 * Adds the custom autocomplete widget behavior.
 */
Drupal.behaviors.apachesolr_autocomplete = {
  attach: function(context) {
    jQuery(".apachesolr-autocomplete.unprocessed", context).add(".apachesolr-autocomplete.unprocessed input", context).autocomplete(Drupal.settings.apachesolr_autocomplete.path,
    {
      // Classnames for the widget.
      inputClass: "",
      loadingClass: "throbbing",
      // Do not select first suggestion by default.
      selectFirst: false,
      // Specify no matching as it wil be done on server-side.
      matchContains: false,
      matchSubset: false,
      // Maximum number of items to show in widget.
      max: 50,
      scroll: true,
      scrollHeight: 360,
      // Data returned from server is JSON-encoded.
      dataType: "json",
      // Function to parse returned json into elements.
      parse: function(data) {
        return jQuery.map(data, function(item) {
          return {
            data: item,          // Echo the input data.
            value: item.display, // This will be shown in the options widget.
            result: item.key     // The actual value to put into the form element.
          }
        });
      },
      // Return the HTML to display in the options widget.
      formatItem: function(item) {
        return item.display;
      }
    }).result(function(item, element) {
      // Handle selection of an element in the autocomplete widget.
      // We should submit the widget's parent form.
      jQuery(this).get(0).form.submit();
    }).addClass('form-autocomplete'); // Add Drupal autocomplete widget's style.
  }
};
;
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
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
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					query: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

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
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
      var chart_archived_ajax = null;
      var chart_archived_carousel = null;


      // function chart_archived_carousel_buttonNextCallback(carousel, button, enabled) {
      //     console.log('Next button is now ' + (enabled ? 'enabled' : 'disabled'));
      // };

      // function chart_archived_carousel_buttonPrevCallback(carousel, button, enabled) {
      //     console.log('Prev button is now ' + (enabled ? 'enabled' : 'disabled'));
      // };




      function chart_archived_highlight_month(item_id) {
        var item = jQuery("#chart-browsing-year .jcarousel-item-" + item_id + " .month_group");
        var className = item.attr('class');
        var matches = className.match(/month_([\d]+)/);
        if (matches[1]) {
          // var month_id = '.form-item.form-type-radio.form-item-archived-month #edit-archived-month-' + matches[1];
          var month_id = '.form-item.form-type-radio.form-item-archived-month input[value='+matches[1]+']';
          month_id = jQuery(month_id);
          if (month_id) {
            // console.log(month_id);
            jQuery('.form-item.form-type-radio.form-item-archived-month').find('.option').removeClass('current');
            jQuery(month_id).parent().find('.option').addClass('current');
          }
        }
        return false;
      }

      function chart_archived_show_rand_items_year_itemFirstInCallback(carousel, item, idx, state) {
        e_first = jQuery("#chart-browsing-year .jcarousel-item-" + idx + " .chart_date").html();
        e_last = '';
        for (var i = idx + 1; i < idx + 4; i++) {
          var e = jQuery("#chart-browsing-year .jcarousel-item-" + i + " .chart_date");
          if (e) e_last = e.html();
        };
        e_first = e_first.split(' ')[0].toLowerCase();
        if (e_last != null)
          e_last = e_last.split(' ')[0].toLowerCase();
        else
          e_last = e_first;
        var months = {"jan":"January","feb":"February","mar":"March","apr":"April","may":"May","jun":"June","jul":"July","aug":"August","sep":"September","oct":"October","nov":"November","dec":"December"};
        e_first = months[e_first];
        e_last = months[e_last];
        e_title = (e_first == e_last) ? e_first : e_first + " - " + e_last;
        jQuery('#chart-browsing-year .paginator .current .month').html(e_title);

        chart_archived_highlight_month(idx);
      };

      function chart_archived_get_near_year(year, is_next) {
        years_objects_list = [];
        jQuery('#bb-chart-archived-form .form-type-select.form-item-archived-year ul li').each(function(){
          years_objects_list.push(this);
        });
        // console.log(years_objects_list);
        for (var i = 0; i < years_objects_list.length; i++) {
          if (jQuery('a', years_objects_list[i]).html() == year) {
            if (is_next && i-1 >= 0) {
              // console.log(jQuery(years_objects_list[i-1]).text());
              return jQuery(years_objects_list[i-1]).text();
            }
            if (!is_next && i+1 <= years_objects_list.length-1) {
              // console.log(jQuery(years_objects_list[i+1]).text());
              return jQuery(years_objects_list[i+1]).text();
            }
          }
        };
        return false;
      }

      function chart_archived_show_rand_items_year_initCallback(carousel) {
        jQuery('#chart-browsing-year .paginator .next a').bind('click', function() {
          if (carousel) {

            if (!carousel.buttonNextState) {
              var year = jQuery('.chart_archives_container .form-item-archived-year .current_year').html();
              year = year*1;
              year = chart_archived_get_near_year(year, true);

              // year = year*1+1;
              if (year) {
                jQuery('#bb-chart-archived-form .form-type-select.form-item-archived-year ul li a').each(function(){
                  if (jQuery(this).text() == year) {
                    jQuery(this).trigger('click');
                  }
                });
              }
              return false;
            }
            carousel.next();

          }
          return false;
        });
        jQuery('#chart-browsing-year .paginator .prev a').bind('click', function() {
          if (carousel) {

            if (!carousel.buttonPrevState) {
              var year = jQuery('.chart_archives_container .form-item-archived-year .current_year').html();
              year = year*1;
              year = chart_archived_get_near_year(year, false);

              // year = year*1-1;
              if (year) {
                jQuery('#bb-chart-archived-form .form-type-select.form-item-archived-year ul li a').each(function(){
                  if (jQuery(this).text() == year) {
                    jQuery(this).trigger('click');
                  }
                });
              }
              return false;
            }
            carousel.prev();

          }
          return false;
        });
      }

      function chart_archived_show_rand_items_year(scroll_to_last) {
        jQuery('#chart-browsing-year-loading').css('display', 'none');
        jQuery('#chart-browsing-year').css('display', 'block');

        jQuery('#chart-browsing-year .paginator .next a').bind('click', function() {
          return false;
        });
        jQuery('#chart-browsing-year .paginator .prev a').bind('click', function() {
          return false;
        });

        var groups_array = jQuery("#chart-browsing-year .groups").html();
        if (groups_array) {
          groups_array = groups_array.split(',');
          var months = [];
          for (var i=0; i < groups_array.length; i++) {
            jQuery("#chart-browsing-year .module.module_chart_summary.module_chart_archived.month_group_"+groups_array[i]).rand(1).removeClass("item_hidden");
            jQuery("#chart-browsing-year .item_hidden.module.module_chart_summary.module_chart_archived.month_group_"+groups_array[i]).parent().remove();
            if (groups_array[i].length == 8) {
              var month = groups_array[i].substr(4, 2);
              month = parseInt(month, 10);
              month = month.toString();
              if (jQuery.inArray(month, months) == -1)
                months.push(month);
            }
          }
          jQuery('.form-item.form-type-radio.form-item-archived-month').removeClass('disabled');
          jQuery('.form-item.form-type-radio.form-item-archived-month').each(function () {
            var month = jQuery("input", this).attr('value');
            month = month.toString();
            if (jQuery.inArray(month, months) < 0) {
              jQuery(this).addClass('disabled');
            }
          });

          // var last_month = jQuery("#chart-browsing-year .module.module_chart_summary.module_chart_archived.month_group_"+groups_array[groups_array.length-1]);
          // console.log(last_month);

          jQuery('#module_chart_archived_carousel').jcarousel({
            animation: 'slow',
            scroll: 4,
            // buttonNextHTML: '<span>NEXT</span>',
            // buttonPrevHTML: '<span>PREV</span>'
            initCallback: chart_archived_show_rand_items_year_initCallback,
            buttonNextHTML: null,
            buttonPrevHTML: null,
            itemFirstInCallback: chart_archived_show_rand_items_year_itemFirstInCallback

            // buttonNextCallback:  chart_archived_carousel_buttonNextCallback,
            // buttonPrevCallback:  chart_archived_carousel_buttonPrevCallback
          });

          if (jQuery.browser.safari) {
              jQuery(window).trigger('load.jcarousel');
              jQuery(window).unbind('load.jcarousel');
          }

          var carousel = jQuery('#module_chart_archived_carousel').data('jcarousel');
          if (carousel && scroll_to_last) carousel.scroll(parseInt(carousel.size()-1));

          // test
          // chart_archived_get_near_year('', '');

        } else {
          jQuery('#chart-browsing-year').html('No data found');
        }
      }

      function chart_archived_binds() {
        jQuery('.form-item.form-type-radio.form-item-archived-month').bind('click', function () {
          var month_selected = jQuery('.form-radio', this).val();
          var month_selected_carousel = jQuery('#module_chart_archived_carousel .month_'+month_selected);
          if (month_selected.length && month_selected_carousel) {
            var position = jQuery(month_selected_carousel[0]).parent().attr('jcarouselindex');
            var carousel = jQuery('#module_chart_archived_carousel').data('jcarousel');
            if (carousel) carousel.scroll(jQuery.jcarousel.intval(position));
           }
          return false;
        });

        jQuery('.chart_archives_container .form-item-archived-year #edit-archived-year').live('change', function () {
          var year_selected = jQuery('.chart_archives_container .form-item-archived-year .current_year').html();
          jQuery('.form-item.form-type-radio.form-item-archived-month').find('.option').removeClass('current');
          // var month_id = '.form-item.form-type-radio.form-item-archived-month #edit-archived-month-1';
          var month_id = '.form-item.form-type-radio.form-item-archived-month input';
          jQuery(month_id).parent().find('.option').addClass('current');
          var site_selected = jQuery('.chart_archives_container .data .site').html();
          var chart_selected = jQuery('.chart_archives_container .data .chart_code').html();

          jQuery('#bb-chart-archived-form .form-item-archived-month label').removeClass('current'); // test

          jQuery('#chart-browsing-year').html('Loading...');
          if (chart_archived_ajax != null)
            chart_archived_ajax.abort();
          chart_archived_ajax = jQuery.ajax({
            // url: '/billboard-chart-archived-browsing/' + year_selected + '',
            url: '/billboard-chart-archived-browsing/' + site_selected + '/' + chart_selected + '/' + year_selected + '',
            success: function(data) {
              chart_archived_ajax = null;
              jQuery('.form-item.form-type-radio.form-item-archived-month').addClass('disabled');
              jQuery('#chart-browsing-year').html(data);
              chart_archived_show_rand_items_year(false);
            }
          });
          return false;
        });

        if (jQuery('#bb-chart-archived-form').size()) {
            jQuery('#bb-chart-archived-form input[checked=checked]').next().addClass('current');
            jQuery('#bb-chart-archived-form .form-item-archived-month label').click(function(){
                jQuery('#bb-chart-archived-form .form-item-archived-month label').removeClass('current');
                jQuery(this).addClass('current');
            });
            var _obj_html = jQuery('<ul/>');
            var _current_year = jQuery('<a onclick="return false;" class="current_year" href="#"></a>');
            var years_array = jQuery("#chart-browsing-year .years").html();
            var current_year = jQuery('.chart_archives_container .year').html();
            years_array = (years_array) ? years_array.split(',') : '';
            jQuery('#edit-archived-year').find('option').each(function()
            {
                var _li = jQuery('<li><a href="#">'+jQuery(this).text()+'</a></li>');
                var _val = jQuery(this).attr('value');
                if (jQuery(this).attr('selected') == 'selected') {
                  // _current_year.text(_val);
                  // jQuery('a', _li).css('background', '#F2F2F2');
                }

                if (jQuery(this).text() == current_year) {
                  _current_year.text(current_year);
                  jQuery('a', _li).css('background', '#F2F2F2');
                }

                _li.find('a').click(function()
                {
                    jQuery('#edit-archived-year').val(_val);
                    jQuery('#bb-chart-archived-form .current_year').text(_val);
                    jQuery('#edit-archived-year').change();

                    jQuery('#bb-chart-archived-form .form-type-select.form-item-archived-year ul li a').each(function(){
                      if (jQuery(this).html() == _val) {
                        jQuery(this).css('background', '#F2F2F2');
                      } else {
                        jQuery(this).css('background', '#fff');
                      }
                    });

                    return false;
                });

                if (years_array) {
                  if (jQuery.inArray(jQuery(this).text(), years_array) > -1) {
                    _obj_html.append(_li);
                  }
                } else {
                  _obj_html.append(_li);
                }


            });
            jQuery('#edit-archived-year').after(_obj_html);
            jQuery('#edit-archived-year').after(_current_year);
        }

        jQuery.fn.rand = function(k){
          var b = this,
            n = b.size(),
            k = k ? parseInt(k) : 1;

          // Special cases
          if (k > n) return b.pushStack(b);
          else if (k == 1) return b.filter(":eq(" + Math.floor(Math.random()*n) + ")");

          // Create a randomized copy of the set of elements,
          // using Fisher-Yates sorting
          r = b.get();
          for (var i = 0; i < n - 1; i++) {
            var swap = Math.floor(Math.random() * (n - i)) + i;
            r[swap] = r.splice(i, 1, r[swap])[0];
          }
          r = r.slice(0, k);

          // Finally, filter jQuery stack
          return b.filter(function(i){
            return $.inArray(b.get(i), r) > -1;
          });
        };

      }


(function($){

  Drupal.behaviors.chart_archived = {
    attach: function (context, settings) {

      // chart_archived_binds();
      // chart_archived_show_rand_items_year();

    } /* attach */
  };

  $.fn.rand = function(k){
    var b = this,
      n = b.size(),
      k = k ? parseInt(k) : 1;

    // Special cases
    if (k > n) return b.pushStack(b);
    else if (k == 1) return b.filter(":eq(" + Math.floor(Math.random()*n) + ")");

    // Create a randomized copy of the set of elements,
    // using Fisher-Yates sorting
    r = b.get();
    for (var i = 0; i < n - 1; i++) {
      var swap = Math.floor(Math.random() * (n - i)) + i;
      r[swap] = r.splice(i, 1, r[swap])[0];
    }
    r = r.slice(0, k);

    // Finally, filter jQuery stack
    return b.filter(function(i){
      return $.inArray(b.get(i), r) > -1;
    });
  };

})(jQuery);
;
/*
* JS Redirection Mobile
*
* Copyright (c) 2011-2012 Sebastiano Armeli-Battana (http://www.sebastianoarmelibattana.com)
*
* By Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
* Licensed under the MIT license.
* https://github.com/sebarmeli/JS-Redirection-Mobile-Site/blob/master/MIT-LICENSE.txt
*
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site
* @author Sebastiano Armeli-Battana
* @date 29/10/2012
* @version 1.0.0
*
*/
	
/*globals window,document, navigator, SA */
if (!window.SA) {window.SA = {};}

SA.redirection_mobile = function(configuration) {

	// Helper function for adding time to the current date -> used by cookie
	var addTimeToDate = function(msec) {
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + msec);
		return exdate;
	};

	// Helper function for getting a value from a parameter in the querystring of a URL
	var getQueryValue = function(param) {

		if (!param) {
			return;
		}

		var querystring = document.location.search,
			queryStringArray = querystring && querystring.substring(1).split("&"),
			i = 0,
			length = queryStringArray.length;

		for (; i < length; i++) {
			var token = queryStringArray[i],
				firstPart = token && token.substring(0, token.indexOf("="));
			if (firstPart === param ) {
				return token.substring(token.indexOf("=") + 1, token.length);
			}
		}

	};
				
	// Retrieve the User Agent of the browser
	var agent = navigator.userAgent.toLowerCase(),
		FALSE = "false",
		TRUE = "true",

		// configuration object
		config = configuration || {},
	
		// parameter to pass in the URL to avoid the redirection
		redirection_param = config.redirection_param || "mobile_redirect",
		
		// prefix appended to the hostname
		mobile_prefix = config.mobile_prefix || "m",
		
		// new url for the mobile site domain 
		mobile_url = config.mobile_url,
		
		// protocol for the mobile site domain 
		mobile_protocol = config.mobile_scheme ?
			config.mobile_scheme + ":" :
				document.location.protocol,
		
		host = document.location.host,

		// value for the parameter passed in the URL to avoid the redirection
		queryValue = getQueryValue(redirection_param),

		// Compose the mobile hostname considering "mobile_url" or "mobile_prefix" + hostname
		mobile_host = mobile_url ||
			(mobile_prefix + "." + 
				(!!host.match(/^www\./i) ?
					host.substring(4) : 
						host)),

		// Expiry hours for cookie
		cookie_hours = config.cookie_hours || 1,
		
		// Parameters to determine if the pathname and the querystring need to be kept
		keep_path = config.keep_path || false,
		keep_query = config.keep_query || false,
		
		//append referrer 
		append_referrer = config.append_referrer || false,
		append_referrer_key = config.append_referrer_key || "original_referrer",

		// new url for the tablet site 
		tablet_host = config.tablet_host || mobile_host,
		isUAMobile = false,
		isUATablet = false;

		// Check if the UA is a mobile one (regexp from http://detectmobilebrowsers.com/ (WURFL))
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4))) {
			isUAMobile = true;
		}	

	// Check if the device is a Tablet such as iPad, Samsung Tab, Motorola Xoom, Amazon Kindle or MS Surface
	if (!!(agent.match(/(iPad|SCH-I800|xoom|NOOK|silk|kindle|GT-P7510|tablet)/i))) {

		// Check if the redirection needs to happen for tablets
		isUATablet = (config.tablet_redirection === TRUE || !!config.tablet_host) ? true : false;
		isUAMobile = false;
	}

	// Check if the referrer was a mobile page (probably the user clicked "Go to full site") or in the 
	// querystring there is a parameter to avoid the redirection such as "?noredireciton=true"
	// (in that case we need to set a variable in the sessionStorage or in the cookie)
	if ((isUAMobile && document.referrer.indexOf(mobile_host) >= 0 ) || (isUATablet && document.referrer.indexOf(tablet_host) >= 0) || queryValue === FALSE ) {

		if (window.sessionStorage) {
			window.sessionStorage.setItem(redirection_param, FALSE);
		} else {
			document.cookie = redirection_param + "=" + FALSE + ";expires="+
				addTimeToDate(3600*1000*cookie_hours).toUTCString();
		}
	}

	// Check if the sessionStorage contain the parameter
	var isSessionStorage = (window.sessionStorage) ? 
			(window.sessionStorage.getItem(redirection_param) === FALSE) :
				false,

		// Check if the Cookie has been set up
		isCookieSet = document.cookie ? 
			(document.cookie.indexOf(redirection_param) >= 0) :
				false;

	// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
	if ((isUATablet || isUAMobile) && !isCookieSet && !isSessionStorage) {

		// Callback call
		if (config.beforeredirection_callback) {
			if (!config.beforeredirection_callback.call(this)) {
				return;
			}
		}
		
		var path_query = "";
		
		if(keep_path) { 
			path_query += document.location.pathname;
		}
		
		if (keep_query) {
			path_query += document.location.search;
		}
		
		if (append_referrer && document.referrer) {
			if (path_query.indexOf('?') === -1) {
				path_query += "?";
			} else {
				path_query += "&";
			}
			path_query += append_referrer_key + "=" + encodeURIComponent(document.referrer);
		}
		
		if (isUATablet){
			document.location.href = mobile_protocol + "//" + tablet_host + path_query;
		} else if (isUAMobile) {
			document.location.href = mobile_protocol + "//" + mobile_host + path_query;
		}
		
	} 
};	
;
