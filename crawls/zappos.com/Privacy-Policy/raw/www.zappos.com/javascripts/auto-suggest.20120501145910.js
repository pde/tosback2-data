


var AutoSuggest = new Class({
    Implements: [Options, Events],
    options: {
      'defaultValue': "",
      'compare': 'beginning',
      'autofill': false,
      'suggestions': 7,
      'encodeInput': false,
      'allowLastElement':false
    },
    
    initialize: function(textfield, data, options) {
        if ($type(data) != "array")
            this._error("initialize(textfield, data, [options])", "`data` must be an Array");
      
        if ($type(textfield) != "string" && $type(textfield) != "element")
            this._error("initialize(textfield, data, [options])", "`textfield` must be a String or Element");  
      
        if ($type(textfield) == "string")
            textfield = document.getElement(textfield);
        this.textfield = textfield;
        
        if ($type(this.textfield) != "element")
            this._error("initialize(textfield, data, [options])", "`textfield` must be an element or css selector");
        
        var self = this;
        this.textfield.addEvents({
           'keyup':   function(e) {self._onKeyup.call(self, e);},
           'keydown': function(e) {self._onKeydown.call(self, e)},
           'focus':   function(e) {self._onFocus.call(self, e)},
           'blur':    function(e) {self._onBlur.call(self, e)}
        });

        self.textfield.getParent("form").addEvent('submit', function(e) {
            if (self.textfield.value == options['defaultValue']) self.textfield.value = "";
        });
        
        this.setOptions(options);
        this.binder = new Binder(this);
        this.binder.set('term', this.textfield.get('value'));
        this.binder.bind('term', 'set', this._termSet);
        this.data = data.slice();
        
        this.suggestions = new Element('ul', {'class': 'suggestions currentSuggestions'});
        this.textfield.set('autocomplete', 'off');
    },
    
    _onKeyup: function(e) { 
        this.binder.set('term', this.textfield.get('value'));
    },
    
    _onKeydown: function(e) {
        switch (e.key) {
        case 'down':
            e.preventDefault();
            var active = this.suggestions.getElement('.active');
            if (active) {
                if (active.getNext()) {
                    active.removeClass('active');
                    active.getNext().addClass('active');
                }
            } else {
                if (this.suggestions.getChildren().length > 0) {
                    active = this.suggestions.getChildren()[0];
                    active.addClass('active');
                }
            }
            break;
        case 'up':
            e.preventDefault();
            var active = this.suggestions.getElement('.active');
            if (active) {
                if (active.getPrevious()) {
                    active.removeClass('active');
                    active.getPrevious().addClass('active');
                }
            } else {
                if (this.suggestions.getChildren().length > 0)
                    this.suggestions.getChildren()[0].addClass('active');
            }
            break;
        case 'enter':
            var active = this.suggestions.getElement('.active');
            if (active)
                active.getElement('a').fireEvent('click', new Event(e));
            break;
        case 'tab':
            var active = this.suggestions.getElement('.active');
            if (active)
                active.getElement('a').fireEvent('click', new Event(e));
            break;
        }
    },
    
    _onFocus: function(e) {
        if (this.textfield.get('value') == this.options['defaultValue']){
            this.binder.set('term', '');
        } else {
            this.binder.set('term', this.textfield.get('value'));
        }
    },
    
    _onBlur: function(e) {
        var self = this;
        if (this.textfield.get('value') == '')
            this.binder.set('term', this.options['defaultValue']);
        (function() {
            self._removeSuggestions();
        }).delay(500);
    },
    
    _termSet: function(value, oldValue) {
        if (value != this.textfield.get('value'))
            this.textfield.set('value', value);
        
        this._empty(this.suggestions);
        this._removeSuggestions();
        
        if (value == '' || value == this.options['defaultValue']) return;
        var num = 0;
        var self = this;
        var length = this.data.length;
        var regexp = null;
        var encodedValue = this.options["encodeInput"] ? value.encodeNonChar() : value;
        
        switch (this.options['compare']) {
        case 'anywhere':
            regexp = new RegExp("(.*)(" + encodedValue + ")(.*)", "i");
            break;
        default:
            regexp = new RegExp("^(" + encodedValue + ")(.*)", "i");
        }
            
        console.time("Finding matches for AutoSuggest");
        for (i = 0; i < length; i++) {
            var item = this.data[i];
            var results = "";
            if ($type(item) == 'string') {
                results = regexp.exec(item);
                if (results) {
                    var li = new Element('li');
                    var a = new Element('a', {'href': item, 'text': item.cleanASCII()});
                    a.addEvent('click', function(e) {
                        e.preventDefault();
                        self.binder.set('term', this.get('text'));
                        self.textfield.focus();
                        self.textfield.getParent("form").submit();
                    });
                    li.grab(a);
                    item = new Hash({'title': item, 'element': li, 'a': a});
                    this.data[i] = item;
                    switch (this.options['compare']) {
                    case 'anywhere':
                        item["a"].set('html', results[1] + "<strong>" + results[2] + "</strong>" + results[3]);
                        break;
                    default:
                        item["a"].set('html', "<strong>" + results[1] + "</strong>" + results[2]);
                    }
                    self.suggestions.grab(item['element']);
                    num++;
                }
            } else {
                results = regexp.exec(item['title']);
                if (results) {
                    switch (this.options['compare']) {
                    case 'anywhere':
                        item["a"].set('html', results[1] + "<strong>" + results[2] + "</strong>" + results[3]);
                        break;
                    default:
                        item["a"].set('html', "<strong>" + results[1] + "</strong>" + results[2]);
                    }
                    self.suggestions.grab(item['element']);
                    num++;
                }
            }
            if (num > this.options['suggestions']-1) break;
        }
        console.timeEnd("Finding matches for AutoSuggest");

        // Kids, don't do this at home
        if (self.options['allowLastElement']) {
          var spacersAreCool = new Element('div', {'class':'lastSuggestion'});
          self.suggestions.grab(spacersAreCool);
        }
        
        if (num == 1) {
            var child = this.suggestions.getChildren()[0];
            if (child.get('text') == value) {
                this.suggestions.removeChild(child);
                num = 0;
            }
        }
        if (num > 0)
            $(this.textfield.parentNode).grab(this.suggestions);
    },
    
    _removeSuggestions: function() {
        if (this.suggestions && this.suggestions.parentNode)
            this.suggestions.dispose()
    },
    
    _empty: function(element) {
        element.getChildren().each(function(child) {
            element.removeChild(child);
        });
    },
    
    _error: function(fn, msg) {
        throw("AutoSuggest Error in " + fn + ": " + msg);
    }
});
