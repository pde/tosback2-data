


var ToggleList = new Class({
    Implements: Options,
    options: {
        'collapsed': 10,
        'grace': 3,
        'moreText': 'Show More Options',
        'lessText': 'Show Less Options',
        'doScroll': false,
        'scrollTo': null,
        'placement': 'bottom',
        'listDisplay':'block'
    },
    
    initialize: function(list, options) {
        this.setOptions(options);
        
        if ($type(list) != 'string' && $type(list) != 'element')
            this._error("initialize(list, options)", "list must be either a string or an element");
        
        if ($type(list) == 'string')
            list = document.getElement(list);
        
        if ($type(list) != 'element')
            this._error("initialize(list, options)", "list must be an element or a proper CSS selector");
        
        this.list = list;
        if ($type(this.options['scrollTo']) != 'element')
            this.options['scrollTo'] = this.list;
        this.items = list.getChildren();
		if (this.items.length < this.options['collapsed'])
			return;
        this.items.applyToEach("setStyle", "display", "none");
        
        this.moreLi = new Element('li', {'class': 'toggle-show'});
        this.moreA = new Element('a', {'href': 'toggle-more', 'text': this.options['moreText']});
        
        var self = this;
        this.moreA.addEvent('click', function(e) { self.toggleMore.call(self, e) });
        
        this.moreLi.grab(this.moreA);
        this.moreLi.inject(this.list, this.options['placement']);
        
        this.showCollapsed();
    },
    
    toggleMore: function(e) {
        e.preventDefault();
        if (this.moreA.hasClass('expanded')) {
            this.items.applyToEach('setStyle', 'display', 'none');
            this.showCollapsed();
            this.moreA.set('text', this.options['moreText']);
            this.moreA.removeClass('expanded');
            if (this.options['doScroll'] && Fx && Fx.Scroll)
                new Fx.Scroll(window).toElement(this.options['scrollTo']);
        } else {
            this.items.applyToEach('setStyle', 'display', this.options['listDisplay']);
            this.moreA.set('text', this.options['lessText']);
            this.moreA.addClass('expanded');
        }
    },
    
    showCollapsed: function() {
        for (var i = 0; i < this.options.collapsed; i++) {
            this.items[i].setStyle('display', this.options['listDisplay']);
        };
    },
    
    _error: function(fn, msg) {
        throw("ToggleList Error in " + fn + ": " + msg);
    }
});
