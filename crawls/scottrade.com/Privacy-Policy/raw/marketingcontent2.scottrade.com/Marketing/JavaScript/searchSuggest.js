
/* --- Symbol Suggest Autocomplete --- */

/*
* jQuery UI Autocomplete HTML Extension
* http://github.com/scottgonzalez/jquery-ui-extensions
*/
(function($) {
    var proto = $.ui.autocomplete.prototype,
        initSource = proto._initSource;
    function filter(array, term) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function(value) {
            return matcher.test($("<div>").html(value.label || value.value || value).text());
        });
    }
    $.extend(proto, {
        _initSource: function() {
            if (this.options.html && $.isArray(this.options.source)) {
                this.source = function(request, response) {
                    response(filter(this.options.source, request.term));
                };
            } else {
                initSource.call(this);
            }
        },
        _renderItem: function(ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append($("<a></a>")[this.options.html ? "html" : "text"](item.label)).appendTo(ul);
        }
    });

})(jQuery);



/**
* Stock Symbol Suggest - jQuery UI Plugin
* 
*/
(function($) {
    $.widget("ui.symbolsuggest", {
    	exactMatch: false,
        options: {
            source: "https://symbollookupsvcext.scottrade.com/SecuritiesService/SecuritiesService.svc/security/{0}?callback=?",
            delay: 100,
            searchUrl: "",
            quoteUrl: ""
        },
        _create: function() {
            var self = this,
                o = self.options,
                $el = self.element;
            $el.autocomplete({
                source: function(req, res) {
                    self._getSuggestions(req.term, res);
                },
                search: function(req, res) {
            	    self.exactMatch = false;
                },
                select: function(req, res) {
            	    self.exactMatch = true;
                },
                html: true,
                delay: o.delay,
                position: o.position
            }).keypress(function(e) {
                    if (!e) e = window.event;
                    if (e.keyCode == 13) {
                    	self._submitQuery();
                    }
            });
            self.element.siblings("a").first().click(function() {
            	self._submitQuery();
            });
            self.element.parents(".search-field").children(".search").first().click(function() {
            	self._submitQuery();
            });
        },
        destroy: function() {
            this.element.autocomplete("destroy");
        },
        _getSuggestions: function(term, res) {
            var self = this,
                lastTerm = term.split(',').pop(),
                source = self.options.source.replace("{0}", encodeURIComponent(lastTerm));

            $.getJSON(source, function(data) {
                var suggestions = [];
                $.each(data, function(i, security) {
                	self.exactMatch = self.exactMatch || security.Symbol == lastTerm.toUpperCase();
                    suggestions.push({
                        label: self._getDisplayableRow(security, lastTerm),
                        value: security.Symbol
                    });
                });
                res(suggestions);
            });
        },
        _highlightTerm: function(item, term) {
            var re = new RegExp("\\b" + term, "i");
            return item.replace(re, "<b>$&</b>");
        },
        _getDisplayableRow: function(sec, term) {
            var row = "<span class='security-sym'>" + this._highlightTerm(sec.Symbol, term) + "</span>";
            row += "<span class='security-name'>" + this._highlightTerm(sec.Name, term) + "</span>";
            row += "<span class='security-xch'>" + sec.Exchange + "</span>";
            return row;
        },
        _submitQuery: function() {
            if (this.options.searchUrl == "" || this.exactMatch) {
                location.href = this.options.quoteUrl + "?symbol=" + encodeURIComponent(this.element[0].value);
            } else {
                location.href = this.options.searchUrl + "?q=" + encodeURIComponent(this.element[0].value);
            }
        }
    });
})(jQuery);

function autofillButtonSwitch(obj) {
    if (obj.src.match(/_off\.gif$/)) {
        obj.src = obj.src.replace(/_off/, "_on");
    } else {
        obj.src = obj.src.replace(/_on/, "_off");
    }
}

/* --- End Symbol Suggest Autocomplete --- */
