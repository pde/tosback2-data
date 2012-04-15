(function(jQuery) {

    var RETURN = 13;
    var TAB = 9;
    var ESC = 27;
    var ARRLEFT = 37;
    var ARRUP = 38;
    var ARRRIGHT = 39;
    var ARRDOWN = 40;
    var BACKSPACE = 8;
    var DELETE = 46;

    function debug(s) {
        jQuery('#info').append(htmlspecialchars(s) + '<br>');
    }
    // getting caret position obj: {start,end}
    function getCaretPosition(obj) {
        var start = -1;
        var end = -1;
        if (typeof obj.selectionStart != "undefined") {
            start = obj.selectionStart;
            end = obj.selectionEnd;
        }
        else if (document.selection && document.selection.createRange) {
            var M = document.selection.createRange();
            var Lp;
            try {
                Lp = M.duplicate();
                Lp.moveToElementText(obj);
            } catch (e) {
                Lp = obj.createTextRange();
            }
            Lp.setEndPoint("EndToStart", M);
            start = Lp.text.length;
            if (start > obj.value.length)
                start = -1;

            Lp.setEndPoint("EndToStart", M);
            end = Lp.text.length;
            if (end > obj.value.length)
                end = -1;
        }
        return { 'start': start, 'end': end };
    }
    // set caret to
    function setCaret(obj, l) {
        obj.focus();
        if (obj.setSelectionRange) {
            obj.setSelectionRange(l, l);
        }
        else if (obj.createTextRange) {
            m = obj.createTextRange();
            m.moveStart('character', l);
            m.collapse();
            m.select();
        }
    }
    // prepare array with velued objects
    // required properties are id and value
    // rest of properties remaines
    // keep at two for start and interval to remove suggestion and blank lines
    function prepareArray(jsondata) {
        var new_arr = [];
        // for (var i = 2; i < jsondata.length; i += 2) {
        for (var i = 0; i < jsondata.length; i++) {
            if (jsondata[i].id != undefined && jsondata[i].value != undefined) {
                jsondata[i].id = jsondata[i].id + "";
                jsondata[i].value = jsondata[i].value + "";
                if (jsondata[i].info != undefined)
                    jsondata[i].info = jsondata[i].info + "";
                new_arr.push(jsondata[i]);
            }
        }
        return new_arr;
    }
    // escape parenthesis!
    function escapearg(s) {
        if (s == undefined || !s) return '';
        return s.replace('\\', '\\\\').
           replace('*', '\\*').
           replace('.', '\\.').
           replace('(', '\\(').
           replace(')', '\\)').
           replace('/', '\\/');
    }
    function htmlspecialchars(s) {
        if (s == undefined || !s) return '';
        return s.replace('&', '&amp;').
           replace('<', '&lt;').
           replace('>', '&gt;');
    }
    function ltrim(s) {
        if (s == undefined || !s) return '';
        return s.replace(/^\s+/g, '');
    }

    // extending jQuery
    jQuery.fn.autocomplete = function(options) {
        return this.each(function() {
            // take me
            var me = jQuery(this);
            var me_this = jQuery(this).get(0);

            // test for supported text elements
            if (!me.is('input:text,input:password,textarea'))
                return;

            // get or ajax_get required!
            if (!options && (!jQuery.isFunction(options.get) || !options.ajax_get)) {
                return;
            }
            // check plugin enabled
            if (me.attr('jqac') == 'on') return;

            // plugin on!
            me.attr('jqac', 'on');

            // no browser's autocomplete!
            me.attr('autocomplete', 'off');



            // State Farm designed options
            //dont change these settings.
            options = jQuery.extend({
                cacheLength: 1,
                delay: 10,
                timeout: 360000,
                minchars: 1,
                multi: false,
                cache: false,
                height: 150,
                autowidth: false,
                noresults: 'remove me'
            },
                      options);

            me.keydown(function(e) {

                var form_id = me.parents('form:eq(0)').attr('id');
                var form = document.getElementById(form_id);

                switch (e.keyCode) {
                    case 38: // up

                        if (!suggestions_menu) getSuggestions(getUserInput());
                        else changeHighlight(e.keyCode);
                        return false;
                        break;
                    case 40: // down

                        if (!suggestions_menu) getSuggestions(getUserInput());
                        else changeHighlight(e.keyCode);
                        return false;
                        break;
                    case 9:  // tab
                        clearSuggestions();
                        return true;
                        break;
                    case 13: // return
                        if (suggestions_menu) {
                            setHighlightedValue();
                            updateHidden(form.query, form.original)
                            form.submit();
                            return false;

                        }
                        break;
                    default:
                        if (e.keyCode == 46 || (e.keyCode > 8 && e.keyCode < 32)) {


                        } else {
                            return true;

                        }
                        return true;

                }
            })



            // handle normal characters here
            me.keyup(function(ev) {
                switch (ev.which) {
                    case RETURN:
                        jQuery(suggestions_menu).remove();
                        suggestions_menu = false;
                        suggestions_list = false;
                        current_highlight = 0;

                    case ESC: case ARRLEFT: case ARRRIGHT: case ARRUP: case ARRDOWN:
                        return false;
                    default:
                        getSuggestions(getUserInput());
                }
                return true;
            });

            // init variables
            var user_input = "";
            var input_chars_size = 0;
            var suggestions = [];
            var current_highlight = 0;
            var suggestions_menu = false;
            var suggestions_list = false;
            var loading_indicator = false;
            var clearSuggestionsTimer = false;
            var getSuggestionsTimer = false;
            var showLoadingTimer = false;
            // var zIndex = me.css('z-index');
            var zIndex = 1000;

            // get user input
            function getUserInput() {


                var val = me.val();

                if (options.multi) {
                    var pos = getCaretPosition(me_this);
                    var start = pos.start;
                    for (; start > 0 && val.charAt(start - 1) != ','; start--) { }
                    var end = pos.start;
                    for (; end < val.length && val.charAt(end) != ','; end++) { }
                    var val = val.substr(start, end - start);
                }
                return ltrim(val);
            }
            // set suggestion
            function setSuggestion(val) {
                user_input = val;
                if (options.multi) {
                    var orig = me.val();
                    var pos = getCaretPosition(me_this);
                    var start = pos.start;
                    for (; start > 0 && orig.charAt(start - 1) != ','; start--) { }
                    var end = pos.start;
                    for (; end < orig.length && orig.charAt(end) != ','; end++) { }
                    var new_val = orig.substr(0, start) + (start > 0 ? ' ' : '') + val + orig.substr(end);
                    me.val(new_val);
                    setCaret(me_this, start + val.length + (start > 0 ? 1 : 0));
                }
                else {
                    me_this.focus();
                    me.val(val);
                }
            }
            // get suggestions
            function getSuggestions(val) {
                /*
                if (val.length < 1) {
                alert('Length: ' + val.length + val);
                }
                */
                // input length is less than the min required to trigger a request
                // reset input string
                // do nothing
                if (val.length < options.minchars || val.length == 0) {
                   var form_id = me.parents('form:eq(0)').attr('id');
                    if (form_id == "searchBox") {
                        jQuery('#searchBtn').removeClass('searchBtnSelected');  
                    }
                    jQuery(suggestions_menu).remove();
                    hide_loading();
                    killTimeout();
                    clearSuggestions();
                    return false;
                }
                // if caching enabled, and user is typing (ie. length of input is increasing)
                // filter results out of suggestions from last request
                // remove results if continuing query
                else if (options.cache && val.length > input_chars_size && suggestions.length) {
                    
                    var arr = [];
                    for (var i = 0; i < suggestions.length; i++) {
                        var re = new RegExp("(" + escapearg(val) + ")", 'ig');
                        if (re.exec(suggestions[i].value))
                            arr.push(suggestions[i]);
                    }

                    user_input = val;
                    input_chars_size = val.length;
                    suggestions = arr;
                    createList(suggestions);
                    return false;

                } else {// do new request / new query
                    var form_id = me.parents('form:eq(0)').attr('id');
                    if (form_id == "searchBox") {
                         jQuery('#searchBtn').addClass('searchBtnSelected');
                    }

                    clearTimeout(getSuggestionsTimer);
                    user_input = val;
                    input_chars_size = val.length;
                    getSuggestionsTimer = setTimeout(
        function() {
            suggestions = [];
            // call pre callback, if exists
            if (jQuery.isFunction(options.pre_callback)) {
                options.pre_callback();

            }
            // call get
            if (jQuery.isFunction(options.get)) {
                suggestions = prepareArray(options.get(val));
                createList(suggestions);
            }
            // call AJAX get * always called
            else if (jQuery.isFunction(options.ajax_get)) {
                clearSuggestions();
                showLoadingTimer = setTimeout(show_loading, options.delay);

                options.ajax_get(val, ajax_continuation);
            }
        },
        options.delay);
                }
                return false;
            };
            // AJAX continuation
            function ajax_continuation(jsondata) {
                hide_loading();
                suggestions = prepareArray(jsondata);
                createList(suggestions);
            }
            // shows loading indicator
            function show_loading() {
                //no loading
            }
            // hides loading indicator 
            function hide_loading() {
                if (loading_indicator)
                    jQuery(loading_indicator).hide();
                clearTimeout(showLoadingTimer);
            }
            // create suggestions list
            function createList(arr) {
                if (suggestions_menu)
                    jQuery(suggestions_menu).remove();
                hide_loading();
                killTimeout();

                // create holding div
                suggestions_menu = jQuery('<div class="jqac-menu"></div>').get(0);

                // ovveride some necessary CSS properties 
                // edit css properties here and on search.js
                jQuery(suggestions_menu).css({ 'position': 'absolute',
                    'z-index': zIndex,
                    'max-height': options.height + 'px',
                    'overflow-y': 'hidden',
                    'color': '#333333',
                    'background-color': 'white',
                    'border': '1px solid #aaa',
                    'font-family': 'Arial',
                    'font-size': '12px'
                });

                // create and populate ul
                suggestions_list = jQuery('<ul></ul>').get(0);
                // set some CSS's
                jQuery(suggestions_list).
      css('list-style', 'none').
      css('margin', '0px').
      css('padding', '2px').
      css('overflow', 'hidden');
                // regexp for replace
                //   if(user_input.match('(' || ')'))
                // user_input = null;

                var escaped = escapearg(htmlspecialchars(user_input));
                var re = new RegExp("(" + escaped + ")", 'ig');


                // loop throught arr of suggestions creating an LI element for each suggestion
                for (var i = 0; i < arr.length; i++) {
                    var val = new String(arr[i].value);
                    // using RE
                    var output = htmlspecialchars(val).replace(re, '<span class="jqac-match">$1</span>');
                    // using substr
                    //var st = val.toLowerCase().indexOf( user_input.toLowerCase() );
                    //var len = user_input.length;
                    //var output = val.substring(0,st)+"<em>"+val.substring(st,st+len)+"</em>"+val.substring(st+len);

                    var span = jQuery('<span class="jqac-link">' + output + '</span>').get(0);
                    if (arr[i].info != undefined && arr[i].info != "") {
                        jQuery(span).append(jQuery('<div class="jqac-info">' + arr[i].info + '</div>'));
                    }

                    jQuery(span).attr('name', i + 1);
                    jQuery(span).click(function() {
                        setHighlightedValue();
                        var form_id = me.parents('form:eq(0)').attr('id');
                        var form = document.getElementById(form_id);
                        updateHidden(form.query, form.original)
                        form.submit();


                    });
                    jQuery(span).mouseover(function() { setHighlight(jQuery(this).attr('name'), true); });

                    var li = jQuery('<li></li>').get(0);
                    jQuery(li).append(span);

                    jQuery(suggestions_list).append(li);
                }

                // no results: remove suggestions menu, if we decide to append warning uncomment below
                if (arr.length == 0) {
                    //jQuery(suggestions_list).append('<li class="jqac-warning">' + options.noresults + '</li>');
                    killTimeout();
                    if (suggestions_menu) {
                        jQuery(suggestions_menu).remove();
                        suggestions_menu = false;
                        suggestions_list = false;
                        current_highlight = 0;
                    }
                }

                jQuery(suggestions_menu).append(suggestions_list);

                // get position of target textfield
                // position holding div below it
                // set width of holding div to width of field
                var form_id = me.parents('form:eq(0)').attr('id');

                if (form_id == "searchBox") {
                    var pos = me.offset();
                    // added 4 to each to match width of query and not overlap
                    jQuery(suggestions_menu).css('left', (pos.left + 4) + "px");
                    jQuery(suggestions_menu).css('top', (pos.top + me.height() + 1) + "px");
                    if (!options.autowidth)
                        jQuery(suggestions_menu).width(me.width() + 13);

                } else {


                    var pos = me.offset();
                    // added 4 to each to match width of query and not overlap
                    jQuery(suggestions_menu).css('left', pos.left + "px");
                    jQuery(suggestions_menu).css('top', (pos.top + me.height() + 4) + "px");
                    if (!options.autowidth)
                        jQuery(suggestions_menu).width(me.width() + 4);
                }
                // set mouseover functions for div
                // when mouse pointer leaves div, set a timeout to remove the list after an interval
                // when mouse enters div, kill the timeout so the list won't be removed
                jQuery(suggestions_menu).mouseover(function() { killTimeout() });
                jQuery(suggestions_menu).mouseout(function() { resetTimeout() });


                // add DIV to document
                jQuery('body').append(suggestions_menu);

                // bgIFRAME support
                if (jQuery.fn.bgiframe)
                    jQuery(suggestions_menu).bgiframe({ height: suggestions_menu.scrollHeight });

                // pulldown vertical height fine tuning
                if (suggestions_menu.scrollHeight > options.height) {
                    options.height = suggestions_menu.scrollHeight;
                    jQuery(suggestions_menu).height(options.height);
                    jQuery(suggestions_menu).width(jQuery(suggestions_menu).width());
                }

                // currently no item is highlighted
                current_highlight = 0;

                // remove list after an interval
                clearSuggestionsTimer = setTimeout(function() { clearSuggestions() }, options.timeout);
            };
            // set highlighted value
            function setHighlightedValue() {
                if (current_highlight && suggestions[current_highlight - 1]) {
                    var sugg = suggestions[current_highlight - 1];
                    if (sugg.affected_value != undefined && sugg.affected_value != '') {
                        setSuggestion(sugg.affected_value);


                    } else {
                        setSuggestion(sugg.value);


                    }
                    // pass selected object to callback function, if exists
                    if (jQuery.isFunction(options.callback))
                        options.callback(suggestions[current_highlight - 1]);

                    clearSuggestions();
                }
            };
            // change highlight according to key
            function changeHighlight(key) {
                if (!suggestions_list || suggestions.length == 0) return false;
                var n;
                if (key == ARRDOWN)
                    n = current_highlight + 1;
                else if (key == ARRUP)
                    n = current_highlight - 1;

                if (n > jQuery(suggestions_list).children().size())
                    n = 1;
                if (n < 1)
                    n = jQuery(suggestions_list).children().size();
                setHighlight(n);


            };
            // change highlight
            function setHighlight(n, mouse_mode) {
                if (!suggestions_list) return false;
                if (current_highlight > 0) clearHighlight();
                current_highlight = Number(n);
                var li = jQuery(suggestions_list).children().get(current_highlight - 1);
                li.className = 'jqac-highlight';
                jQuery(".jqac-highlight").css({
                    'background-color': '#4994cd',
                    'color': 'white'
                });

                // for mouse mode don't adjust scroll! prevent scrolling jumps
                if (!mouse_mode) adjustScroll(li);
                killTimeout();
            };
            // clear highlight
            function clearHighlight() {
                if (!suggestions_list) return false;
                if (current_highlight > 0) {
                    jQuery(suggestions_list).children().get(current_highlight - 1).className = 'jqac-nohighlight';
                    //Remove highlight style
                    jQuery(".jqac-nohighlight").css({
                        'background-color': 'white',
                        'color': 'black',
                        'border': ''
                    });
                    current_highlight = 0;
                }
            };
            // clear suggestions list
            function clearSuggestions() {

                killTimeout();
                if (suggestions_menu) {
                    jQuery(suggestions_menu).remove();
                    suggestions_menu = false;
                    suggestions_list = false;
                    current_highlight = 0;
                }
            };
            // set scroll
            function adjustScroll(el) {
                if (!suggestions_menu) return false;
                var viewportHeight = suggestions_menu.clientHeight;
                var wholeHeight = suggestions_menu.scrollHeight;
                var scrolled = suggestions_menu.scrollTop;
                var elTop = el.offsetTop;
                var elBottom = elTop + el.offsetHeight;
                if (elBottom > scrolled + viewportHeight) {
                    suggestions_menu.scrollTop = elBottom - viewportHeight;
                }
                else if (elTop < scrolled) {
                    suggestions_menu.scrollTop = elTop;
                }
                return true;
            }
            // timeout funcs
            function killTimeout() {
                clearTimeout(clearSuggestionsTimer);
            };
            function resetTimeout() {
                clearTimeout(clearSuggestionsTimer);
                clearSuggestionsTimer = setTimeout(function() { clearSuggestions() }, 1000);
            };

        })
    };

})(jQuery);