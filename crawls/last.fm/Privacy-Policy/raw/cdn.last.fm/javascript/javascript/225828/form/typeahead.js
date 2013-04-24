/** section: Typeahead
 * class LFM.Form.Typeahead
 * 
 * Form field autocompletion
 **/
LFM.Form.Typeahead = Class.create({});
LFM.Form.Typeahead.email_regex = /^([a-z0-9])+([a-z0-9\._\-\+])*@([a-z0-9_\-])+([a-z0-9\._\-]+)+$/i;

LFM.Form.Typeahead.prototype = {
    /**
     * new LFM.Form.Typeahead(element, source[, options])
     * - element (Element | ID): Input element for the typeahead behaviour
     * - source (Object | URL): Object with data to search within or URL to a JSON source
     * - options (Object):
     *     `onSelect` (Function): Callback function after selections
     *     `hint_text` (String): Hint text to display under the input
     *     `prefill` (Array) Prefilled values
     *     `suggest` (Array) Suggestion
     *     `template` (Function): Template function to run against input values
     *     `allow_freeform = true` (Boolean): Allow input outside of source
     *     `allow_email = true` (Boolean): Allow and validate email addresses
     *     `focus = false` (Boolean): Focus the input after initialising
     **/
    initialize: function (element, source, options) {
        this.source_hash = new Hash();
        if (typeof (source) == 'string') {
            this.source_url = source;
        } else if (source && !Object.isArray(source))  {
            this.source_list = source;
        }
        
        this.onSelect = null;
        this.hint_text = '';
        this.prefill = null;
        this.suggest = null;
        this.template = null;
        this.allow_freeform = true;
        this.allow_email = true;
        this.focus = false;
        if (options) {
            Object.extend(this, options);
        }
        
        // Prime the input field
        this.caret = $(element);
        this.caret.writeAttribute('size', 1)
                  .writeAttribute('autocomplete', 'off')
                  .writeAttribute('value', '');
        
        this.element = this.caret.wrap(new Element('div', {
            'class': 'typeahead clearit'
        }));
        if (this.caret.className) {
            this.element.addClassName(this.caret.className);
        }
        this.caret.addClassName('typeaheadCaret');
        
        this.dialog = this.element.up('.dialogBox');
        
        this.selection_values = [];
        this.selections = [];
        this.selection_inputs = [];
        this.matches = new Hash();
        
        this.caret_index = 0;
        this.current_page_index = 1;
        
        this.caret_shim = new Element('span').setStyle({
            height: 0,
            visibility: 'hidden'
        });
        $('page').insert(this.caret_shim);
        setInterval(this.update_shim.bind(this), 100);
        
        // Suggestions
        if (this.suggest) {
            var that = this;
            $A(this.suggest).reverse().each(function (item) {
                if (item.list && !Object.isArray(item.list)) {
                    var suggestions = new Element('p', {
                        'class': 'typeaheadSuggestions'
                    });
                    if (item.prefix) {
                        suggestions.insert(new Element('span').update(item.prefix));
                    }
                    $H(item.list).each(function (pair, index) {
                        if (index != 0) {
                            suggestions.insert(" &bull; ");
                        }
                        var value = that.render_template(pair.value);
                        var suggestion = new Element('a', {
                            'href': '#',
                            'id': pair.key
                        }).update(value);
                        suggestions.insert(suggestion);
                    });
                    suggestions.observe('click', function (e) {
                        e.stop();
                        var item = e.element();
                        if (item && item.match('a')) {
                            that.convert_to_selection(item);
                            that.focus_caret();
                        }
                    });
                    that.element.insert({ after: suggestions });
                }
            });
        }
        
        // Position the hint
        if (this.hint_text) {
            this.hint = new Element('div', {
                'class': 'typeaheadHint'
            }).update(this.hint_text);
            this.element.insert({ after: this.hint });
        }
        
        // Bind event listeners
        this.element.observe('click', function (e) {
            var el = e.element();
            var selection = e.findElement('a.typeaheadSelected');
            if (selection && el.match('span.typeaheadRemove')) {
                // Remove selections
                e.stop();
                this.remove_selection(this.selections.indexOf(selection));
            } else if (el.match('a.typeaheadSelected span')) {
                // Highlight selections
                e.stop();
                this.highlight_selection(selection);
            } else if (this.selections.size()) {
                // Move caret
                var closest = this.get_closest(e);
                if (closest.right) {
                    this.move_caret({ before: this.selections[closest.i] });
                } else {
                    this.move_caret({ after: this.selections[closest.i] });
                }
                this.show_caret();
            } else {
                this.show_caret();
            }
        }.bindAsEventListener(this));
        
        if (this.focus) {
            this.focus_caret();
        }
        
        this.caret.observe('focus', this.onfocus.bindAsEventListener(this));
        this.caret.observe('blur', this.onblur.bindAsEventListener(this));
        this.caret.observe('keydown', this.onkeydown.bindAsEventListener(this));
        this.caret.observe('keyup', this.onkeyup.bindAsEventListener(this));
        this.caret.observe('keypress', this.onkeypress.bindAsEventListener(this));
        
        // Create the result container
        this.result_list = new Element('ul', {
            'class': 'typeaheadResults'
        }).setStyle({
            'zIndex': 999999
        }).observe('mousedown', function (e) {
            e.stop();
            var item = e.findElement('li.typeaheadItem');
            if (item) {
                this.select(item);
            }
        }.bindAsEventListener(this)).hide();
        if (this.caret.className) {
            this.result_list.addClassName(this.caret.className);
        }
        
        $('page').insert(this.result_list);
        this.reposition_results();
        if (this.dialog) {
            LFM.Dialog.registerDragCallback(this.reposition_results.bind(this));
        }
        
        // Prefill selector
        if (this.prefill && !Object.isArray(this.prefill)) {
            $H(this.prefill).each(function (pair) {
                var value = this.render_template(pair.value);
                var item = this.build_item(pair.key, value);
                this.convert_to_selection(item);
            }.bind(this));
        }
        
        // Pull in the source if passed in a URL
        if (!this.source_hash.size() && this.source_url) {
            new Ajax.Request(this.source_url, {
                method: 'get',
                onSuccess: function (transport) {
                    var json = transport.responseText.evalJSON();
                    if (json.error) {
                        // TODO: Error Handling
                        log(json.error);
                    }
                    this.render_source(json);
                }.bind(this)
            });
        } else if (this.source_list && !Object.isArray(this.source_list)) {
            this.render_source(this.source_list);
        }
    },
    reposition_results: function () {
        var offsets = this.element.cumulativeOffset();
        var offset_top = offsets.top;
        var offset_left = offsets.left;
        // Results are positioned relative to the #page div
        // so subtract those offsets
        var page_offsets = $('page').cumulativeOffset();
        offset_top -= page_offsets.top;
        offset_left -= page_offsets.left;
        
        var style = {
            'width': this.element.getWidth() + 'px',
            'top': offset_top + this.element.getHeight() - 1 + 'px',
            'left': offset_left - 1 + 'px'
        };
        this.result_list.setStyle(style);
        if (this.current_page) {
            var results_offset = this.result_list.cumulativeOffset();
            var results_bottom = results_offset.top + this.result_list.getHeight();
            var overflow = results_bottom - document.viewport.getHeight();
            var current_list = this.current_page.down('ul');
            var list_height = current_list.getHeight() - overflow;
            list_height = (overflow > 0) ? Math.max(0, list_height) + 'px' : 'auto';
            current_list.setStyle({
                'height': list_height
            });
        }
    },
    render_source: function (source_list) {
        $H(source_list).each(function (pair) {
            this.source_hash.set(pair.key, this.render_template(pair.value));
        }.bind(this));
    },
    get_closest: function (e) {
        var pointer = {
            x: e.pointerX(),
            y: e.pointerY()
        };
        var position, dimensions, margin,
            dx, dx2, dy, dy2, d_tl, d_tr, d_bl, d_br, index,
            deltas = new Hash();
        this.selections.each(function (selection, i) {
            // Get positions
            position = selection.cumulativeOffset();
            dimensions = selection.getDimensions();
            margin = selection.getStyle('margin-left').replace('px', '') - 0;
            position.left = position.left + margin;
            position.right = position.left + dimensions.width;
            position.bottom = position.top + dimensions.height;
            // Calculate deltas if we're on the same row
            if (pointer.y > position.top && pointer.y < position.bottom) {
                dx  = pointer.x - position.left;
                dx2 = pointer.x - position.right;
                dy  = pointer.y - position.top;
                dy2 = pointer.y - position.bottom;
                d_tl = (Math.pow( dx, 2) + Math.pow(10 *  dy, 2));
                d_tr = (Math.pow(dx2, 2) + Math.pow(10 *  dy, 2));
                d_bl = (Math.pow( dx, 2) + Math.pow(10 * dy2, 2));
                d_br = (Math.pow(dx2, 2) + Math.pow(10 * dy2, 2));
                deltas.set(d_tl, { i: i, right: true });
                deltas.set(d_tr, { i: i, right: false  });
                deltas.set(d_bl, { i: i, right: true });
                deltas.set(d_br, { i: i, right: false  });
            }
        }.bind(this));
        if (deltas.size()) {
            var int_keys = deltas.keys().collect(function (k) {
                return k - 0;
            });
            return deltas.get(int_keys.min());
        } else {
            // Return the last item 
            return { i: this.selections.size() - 1, right: false };
        }
    },
    update_shim: function () {
        // This shouldn't get stuck
        this.stopPress = false;
        // Dynamic input sizing
        if (this.caret_shim_value != $F(this.caret)) {
            this.caret_shim.innerHTML = (this.caret_shim_value = $F(this.caret)) + 'mmmmmm__m';
            var shim_width = this.caret_shim.getWidth();
            var el_width = this.element.getWidth();
            var caret_width = (shim_width > el_width) ? el_width : shim_width;
            if (caret_width > 0) {
                this.caret.setStyle({ width: caret_width - 10 + 'px' });
            }
        }
    },
    onfocus: function (e) {
        // if (this.hint) {
        //     this.hint.hide();
        // }
        // Perform the search
        this.element.addClassName('typeaheadFocus');
        this.filter();
    },
    onblur: function (e) {
        // if (this.hint && !$F(this.caret) && !this.selections.size()) {
        //     this.hint.show();
        // }
        // Hide results
        // this.clear_results.bind(this).defer();
        this.element.removeClassName('typeaheadFocus');
        this.hide_results.bind(this).defer();
    },
    onkeypress: function (e) {
        var key = e.keyCode;
        switch (key) {
        case Event.KEY_ESC:
            if (this.result_list.visible() || this.stopPress) {
                this.stopPress = false;
                e.stop();
            }
            break;
        case Event.KEY_TAB:
            break;
        case 44: // comma
        case Event.KEY_RETURN:
            if ($F(this.caret) || this.result || this.stopPress) {
                this.stopPress = false;
                e.stop();
            }
            break;
        case Event.KEY_UP:
        case Event.KEY_DOWN:
            break;
        case Event.KEY_LEFT:
        case Event.KEY_RIGHT:
            break;
        case Event.KEY_DELETE:
        case Event.KEY_BACKSPACE:
            break;
        default:
            this.update_shim();
            break;
        }
    },
    onkeydown: function (e) {
        var key = e.keyCode;
        switch (key) {
        case Event.KEY_ESC:
            if (this.result_list.visible()) {
                this.stopPress = true;
                e.stop();
                this.hide_results();
            }
            break;
        case Event.KEY_UP:
        case Event.KEY_DOWN:
            e.stop();
            this.scroll(key);
            break;
        case Event.KEY_LEFT:
        case Event.KEY_RIGHT:
            if (!this.active_selection && this.result) {
                e.stop();
            }
        case Event.KEY_DELETE:
        case Event.KEY_BACKSPACE:
            this.navigate(e);
            break;
        case 188: // comma
            this.result = null;
            // Fall through!
        case Event.KEY_RETURN:
        case Event.KEY_TAB:
            if ($F(this.caret) || this.result) {
                this.stopPress = true;
                e.stop();
                this.select();
            }
            break;
        }
    },
    onkeyup: function (e) {
        var key = e.keyCode;
        switch (key) {
        case Event.KEY_TAB:
        case Event.KEY_RETURN:
        case Event.KEY_ESC:
        case Event.KEY_UP:
        case Event.KEY_DOWN:
        case Event.KEY_LEFT:
        case Event.KEY_RIGHT:
            break;
        case Event.KEY_DELETE:
        case Event.KEY_BACKSPACE:
            break;
        default:
            // Perform the search
            this.show_caret();
            break;
        }
    },
    scroll: function (key) {
        if (!this.active_selection) {
            var down = [Event.KEY_DOWN, 63233].include(key);
            if (this.result) {
                var result = down ? this.result.next('li') : this.result.previous('li');
                if (down && !result) {
                    this.switch_page(true, true);
                }
                this.highlight_result(result, down);
            } else {
                if (this.matches.size()) {
                    this.show_results();
                } else {
                    this.filter(down);
                }
                this.highlight_result(null, down);
            }
        }
    },
    navigate: function (e) {
        var key = e.keyCode;
        var forward = [Event.KEY_DELETE, Event.KEY_RIGHT].include(key);
        var remove = [Event.KEY_DELETE, Event.KEY_BACKSPACE].include(key);
        if (this.active_selection) {
            e.stop();
            if (remove) {
                // Delete the selection
                this.remove_selection(this.caret_index);
            } else if (forward) {
                // Push caret along
                this.move_caret({ after: this.active_selection });
            } 
            this.show_caret();
        } else if (this.result) {
            if (remove) {
                this.filter.bind(this).defer();
            } else {
                e.stop();
                // Switch pages
                this.current_page = this.result.up('li');
                this.switch_page(forward);
            }
        } else {
            // Select the adjacent item if the caret's blank
            var c_index = this.caret_index;
            var boundary_selection = forward ? (c_index == this.selections.size()) : (c_index == 0);
            var index = forward ? c_index : (c_index - 1);
            if (!$F(this.caret) && !boundary_selection) {
                e.stop();
                this.highlight_selection(this.selections[index]);
            } else if ($F(this.caret)) {
                this.filter.bind(this).defer();
            }
        }
    },
    switch_page: function (forward, first) {
        var nth_child = 1;
        if (!first) {
            // Get the current position within the group
            var group_index = -1;
            var i = 0;
            while (group_index < 0) {
                var group_index = this.grouped_results[i].indexOf(this.result);
                i++;
            }
            if (group_index > -1) {
                nth_child = nth_child + group_index;
            }
        }
        // Switch pages
        var page = forward ? this.current_page.next('li') : this.current_page.previous('li');
        if (page) {
            // TODO: flash arrows
            
            
            this.current_page.hide();
            
            this.current_page = page;
            this.current_page.show();
            forward ? this.current_page_index++ : this.current_page_index--;
            var result = this.current_page.down('li:nth-child(' + nth_child + ')');
            if (!result) {
                result = this.current_page.down('li');
            }
            this.highlight_result(result);
        }
    },
    show_caret: function () {
        if (this.active_selection) {
            this.active_selection.removeClassName('typeaheadActive');
            this.active_selection = null;
        }
        
        this.caret.removeClassName('typeaheadHidden');
        this.focus_caret();
        this.filter();
    },
    focus_caret: function () {
        function doit() {
            this.caret.focus();
        };
        doit.bind(this).defer();
    },
    move_caret: function (element) {
        if (element.after) {
            this.caret.insert({ before: element.after.remove() });
            this.caret_index = this.selections.indexOf(element.after) + 1;
        } else if (element.before) {
            this.caret.insert({ after: element.before.remove() });
            this.caret_index = this.selections.indexOf(element.before);
        }
        this.focus_caret();
    },
    /**
     * LFM.Form.Typeahead#add_selection(value, selected_input) -> false | Number
     * - value (String): Value to add to selections
     * - selected_input (Element): Input element containing serialisation of the value
     * 
     * Adds a string to selections. Returns the numerical insertion position.
     * If the value already exists, return false
     * 
     **/
    add_selection: function (value, selected_input) {
        var selected_value = selected_input.serialize();
        // Don't add a value twice
        if (this.selection_values.include(selected_value)) {
            return false;
        }
        
        // Wrap the value in a span
        var selected = new Element('span').update(value);
        // Insert a span.typeaheadRemove at the end
        selected.insert(new Element('span', {
            'class': 'typeaheadRemove'
        }).update(', '));
        // Wrap it in an a.typeaheadSelected
        var selected_link = selected.wrap('a', {
            'href': '#',
            'class': 'typeaheadSelected'
        });
        
        var position = this.caret_index;
        this.selection_values.splice(position, 0, selected_value);
        this.selections.splice(position, 0, selected_link);
        this.selection_inputs.splice(position, 0, selected_input);
        
        // if (this.hint) {
        //     this.hint.hide();
        // }
        
        this.caret_index++;
        this.caret.insert({ before: selected_link });
        this.reposition_results();
        
        return position;
    },
    highlight_selection: function (selection) {
        // update selection
        this.selections.invoke('removeClassName', 'typeaheadActive');
        if (selection) {
            this.active_selection = selection;
            this.active_selection.addClassName('typeaheadActive');
            // hide and update caret
            this.caret.addClassName('typeaheadHidden');
            this.reposition_results();
            this.move_caret({ before: this.active_selection });
        }
    },
    remove_selection: function (index) {
        this.highlight_selection(this.selections[index]);
        this.selection_values.splice(index, 1);
        
        var selection = this.selections.splice(index, 1);
        
        if(selection && selection.length) {
            selection[0].remove();
        }
        
        var selection_input = this.selection_inputs.splice(index, 1);
        
        if(selection_input && selection_input.length) {
            selection_input[0].remove();
        }
        
        this.reposition_results();
        this.show_caret();
    },
    /** related to: LFM.Form.Typeahead#add_selection
     * LFM.Form.Typeahead#convert_to_selection(element) -> false | Number
     * - element (Element): Element with a resource encoded in its id encoding e.g. "r32_200"
     * 
     * Converts an item stored in an HTML element to a selection and calls add_selection
     **/
    convert_to_selection: function (element) {
        var resource = element.getResource();
        selected_input = new Element('input', {
            'type': 'hidden',
            'name': this.caret.name + '_ids[]',
            'value': resource.id
        });
        this.element.insert(selected_input);
        return this.add_selection(element.innerHTML.stripTags().replace(/ /g, '&nbsp;'), selected_input);
    },
    select: function (item) {
        if (item) {
            this.highlight_result(item);
        }
        var selected = null;
        var selected_input = null;
        var position;
        if (this.matches && this.result && this.result_list.visible()) {
            position = this.convert_to_selection(this.result);
        } else if (this.allow_freeform && this.query) {
            selected_input = new Element('input', {
                'type': 'hidden',
                'name': this.caret.name + '_free[]',
                'value': this.query
            });
            this.element.insert(selected_input);
            position = this.add_selection(this.query, selected_input);
        } else if (this.allow_email && this.query.match(LFM.Form.Typeahead.email_regex)) {
            selected_input = new Element('input', {
                'type': 'hidden',
                'name': this.caret.name + '_free[]',
                'value': this.query
            });
            this.element.insert(selected_input);
            position = this.add_selection(this.query, selected_input);
        }
        
        this.caret.value = '';
        this.focus_caret();
        this.filter();
        
        if (this.onSelect) {
            this.onSelect(this.result);
        }
    },
    clear_results: function () {
        this.result_list.update();
        this.matches = new Hash();
        this.highlight_result();
        this.current_page = null;
        this.current_page_index = 1;
    },
    highlight_result: function (result, down) {
        if (this.result) {
            this.result.removeClassName('highlight');
        }
        if (result) {
            this.result = result;
        } else if (down && this.current_page) {
            if (!this.result) {
                this.result = this.current_page.down('li.typeaheadItem');
                this.current_page.show();
            }
        } else {
            this.result = null;
        }
        if (this.result) {
            this.result.addClassName('highlight');
        }
    },
    process_match: function (id, value, build_all, match_regex) {
        var is_match = this.query.length && value.match(match_regex);
        if (build_all || is_match) {
            this.matches.set(id, value);
            if (is_match) {
                value = value.gsub(match_regex, function (match) {
                    return '<span>' + match[0] + '</span>';
                });
            }
            return value;
        }
        return false;
    },
    /**
     * LFM.Form.Typeahead#build_item(id, value) -> Element
     * - id (String): A resource encoding (type and id) e.g. "r32_200"
     * - value (String): Value for the item
     * 
     * Builds a typeahead list item and returns an Element a#id.typeaheadItem
     */
    build_item: function (id, value) {
        var item = new Element('li', {
            'class': 'typeaheadItem',
            'id': id
        }).insert(new Element('a', {
            'href': '#'
        }).update(value));
        return item;
    },
    render_template: function (value) {
        if (this.template && typeof (value) == 'object') {
            return this.template(value);
        }
        return value;
    },
    render_list: function (list, paginate) {
        var page, page_list, paging_controls, page_next, page_prev;
        if (paginate) {
            this.grouped_results = list.inGroupsOf(6);
        } else {
            this.grouped_results = list.inGroupsOf(list.size());
        }
        
        this.grouped_results.each(function (group, i) {
            // Built the list for this page
            page_list = new Element('ul');
            group.each(function (item) {
                page_list.insert(item);
            });
            page = new Element('li', {
                'class': 'paginatedResults'
            }).hide();
            if (!this.current_page) {
                this.current_page = page;
            }
            page.insert(page_list);
            
            if (paginate) {
                // Build the controls
                paging_controls = new Element('p');
                page_prev = new Element('span').update('&laquo;');
                if (i) {
                    page_prev = page_prev.wrap('a', {
                        'href': '#'
                    }).observe('click', function (e) {
                        e.stop();
                        this.switch_page(false);
                    }.bindAsEventListener(this));
                }
                paging_controls.insert(page_prev);
                
                page_next = new Element('span').update('&raquo;');
                if (i + 1 < this.grouped_results.size()) {
                    page_next = page_next.wrap('a', {
                        'href': '#'
                    }).observe('click', function (e) {
                        e.stop();
                        this.switch_page(true);
                    }.bindAsEventListener(this));
                }
                paging_controls.insert(page_next);
                
                page.insert(paging_controls);
            }
            this.result_list.insert(page);
        }.bind(this));
        this.reposition_results();
    },
    filter: function (show_all) {
        var query = this.caret.getValue();
        if (this.query != query || show_all) {
            this.clear_results();
            this.query = query;
            if (this.source_hash) {
                // Match against the source list
                var match_regex = new RegExp(this.query.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"), 'i');
                var build_all = show_all && !this.query.length;
                var result_list = [];
                var insertion_count = 0;
                this.source_hash.each(function (pair) {
                    var match_value = this.process_match(pair.key, pair.value, build_all, match_regex);
                    if (match_value) {
                        var item = this.build_item(pair.key, match_value);
                        if (match_value.indexOf('<span>') == 0) { // String starts with searched-for term
                            result_list.splice(insertion_count, 0, item);
                            insertion_count++;
                        } else { 
                            result_list.push(item);
                        }
                    }
                }.bind(this));
                this.render_list(result_list);
                this.matches.size() ? this.show_results() : this.hide_results();
            }
        }
    },
    show_results: function () {
        if (this.current_page) {
            this.highlight_result(null, true);
            this.result_list.show();
            return true;
        }
        return false;
    },
    hide_results: function () {
        if (this.result_list.visible()) {
            if (this.result) {
                this.result.removeClassName('highlight');
            }
            this.result = null;
            this.result_list.hide();
        }
    }
};
