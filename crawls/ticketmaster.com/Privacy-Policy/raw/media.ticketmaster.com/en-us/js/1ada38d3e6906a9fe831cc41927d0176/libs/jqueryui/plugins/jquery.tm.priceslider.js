/* 
 * TM Price Slider Widget
 * extends jquery.ui.slider
 * -- trung lam
 */
;(function($, undefined) {
    
    $.widget('ui.tmPriceSlider', $.ui.slider, {
        
        _price_slider_widget: null,
        _prices: [],
        _price_range: [],
        _min_price: null,
        _max_price: null,
        _display_min: null,
        _display_max: null,
        _additional_max: false,
        
        options: {
            prices: [],
            min: $(),
            max: $(),
            plus: $(),
            change: $.noop,
            increment: 5
        },
        
        _create: function () {
            this._create_price_data(this.options.prices);
            this._create_price_slider();
        },
        
        _create_price_data: function (prices) {
            this._prices = this._unique_sort_prices(prices);
            this._min_price = this._prices[0];
            this._max_price = this._prices[this._prices.length-1];
            this._display_min = this._calc_display_min(this._prices);
            this._display_max = this._calc_display_max(this._prices);
            this._price_range = [this._display_min, this._display_max];
            this._additional_max = false;
            if (this._display_max < this._max_price) {
                this._additional_max = true;
                this._price_range[1] = this._max_price;
            }
        },
        
        _create_price_slider: function () {
            var self = this;
            var o = self.options;
            var start_v, stop_v;
            self._price_slider_widget = self.element.slider({
                range: true,
                values: self._price_range,
                min: self._display_min,
                max: self._display_max,
                step: o.increment,
                create: function () {
                    start_v = [self._display_min, self._display_max];
                    stop_v = start_v;
                    o.min.text(self._display_min);
                    o.max.text(self._display_max);
                    if (self._additional_max) {
                        o.plus.show();
                    }
                },
                start: function (event, ui) {
                    start_v = ui.values;
                },
                slide: function (event, ui) {
                    if (ui.values[0] === ui.values[1]) {
                        return false;
                    }
                    o.min.text(ui.values[0]);
                    o.max.text(ui.values[1]);
                    if (self._additional_max && ui.values[1] === self._display_max) {
                        o.plus.show();
                    }
                    else {
                        o.plus.hide();
                    }
                },
                stop: function (event, ui) {
                    stop_v = ui.values;
                },
                change: function (event, ui) {
                    if (start_v[0] === stop_v[0] && start_v[1] === stop_v[1]) {
                        return false;
                    }
                    self._price_range = [ui.values[0], ui.values[1]];
                    if (self._additional_max && ui.values[1] === self._display_max) {
                        self._price_range[1] = self._max_price;
                        o.plus.show();
                    }
                    else {
                        o.plus.hide();
                    }
                    self._trigger('change');
                }
            });
        },
        
        _unique_sort_prices: function (prices) {
            return get_unique_array(prices.sort(function(a,b){return a-b}));
        },
        
        _calc_display_min: function (price) {
            var price = (typeof price === 'object') ? price[0] : price;
            var display_min = 0;
            if (price >= this.options.increment) {
                display_min = price - (price % this.options.increment);
            }
            return display_min;
        },
        
        _calc_display_max: function (prices) {
            var prices_length = prices.length;
            var global_median = this._calc_median(prices);
            var q1_median = this._calc_q1_median(prices, global_median);
            var cutoff = this._calc_cutoff(prices[0], q1_median);
            var display_max = prices[prices_length - 1];
            if (display_max > cutoff) {
                for (var i = (prices_length - 2); i >= 0; i--) {
                    if (prices[i] <= cutoff) {
                        display_max = prices[i];
                        break;
                    }
                }
            }
            if (display_max % this.options.increment !== 0) {
                display_max = Math.ceil(display_max / this.options.increment) * this.options.increment;
            }
            return display_max;
        },
        
        _calc_median: function (prices) {
            var prices_length = prices.length;
            var middle = Math.floor(prices_length / 2);
            var median = prices[middle];
            if (prices_length % 2 === 0) {
                median = (prices[middle - 1] + prices[middle]) / 2;
            }
            return median;
        },
        
        _calc_q1_median: function (prices, global_median) {
            var q1_prices = [];
            var prices_length = prices.length;
            for (var i = 0; i < prices_length; i++) {
                if (prices[i] <= global_median) {
                    q1_prices.push(prices[i]);
                }
            }
            return this._calc_median(q1_prices);
        },
        
        _calc_cutoff: function (lowest_price, q1_median) {
            return lowest_price + (q1_median * 4);
        },
        
        _update_price_slider: function (prev_price_range) {
            var o = this.options;
            var values = this._price_range;
            if (prev_price_range) {
                if (prev_price_range[0] > this._display_min && prev_price_range[0] < this._display_max) {
                    values[0] = prev_price_range[0];
                }
                if (prev_price_range[1] < this._display_max && prev_price_range[1] > this._display_min) {
                    values[1] = prev_price_range[1];
                }
            }
            this._price_slider_widget.slider('option', 'min', this._display_min);
            this._price_slider_widget.slider('option', 'max', this._display_max);
            this._price_slider_widget.slider('values', values);
            o.min.text(values[0]);
            o.max.text(values[1]);
            if (this._additional_max && values[1] === this._display_max) {
                o.plus.show();
            }
            else {
                o.plus.hide();
            }
        },
        
        update_prices: function (new_prices, prev_price_range) {
            this._create_price_data(new_prices);
            this._update_price_slider(prev_price_range);
        },
        
        price_range: function () {
            return this._price_range;
        },
        
        reset: function () {
            this._update_price_slider();
        },
        
        destroy: function () {
            this._price_slider_widget.slider('destroy');
            $.Widget.prototype.destroy.call(this);
        }
        
    });
    
}(jQuery));
