/*
The MIT License

Copyright (c) 2008 Fredrik Holmström

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function($){
	
	defaults = {
		speed:500,
		delay:5000,
		linked:true,
		selection:"li"
	};
		
	callbacks = {
		_in:false,
		out:false,
		init:false
	};
	
	animations = {
		_in:"fadeIn",
		out:"fadeOut"
	};
	
	ticker = {
		init:function(collection, args) {
			settings = $.extend(defaults, {});
			settings.animations = animations;
			settings.callbacks = callbacks;
			
			if(args) {
				settings = $.extend(settings, args);
				settings.animations = $.extend(settings.animations, args.animations);
				settings.callbacks = $.extend(settings.callbacks, args.callbacks);
			}
			
			return collection.each(function(n, element){
				element.ticker = {
					looping:false,
					current:false,
					settings:settings,
					animating:false
				};
				
				$(element.ticker.settings.selection, element).each(function(n, item){
					if(!element.ticker.current) {
						element.ticker.current = item;
					} else {
						$(item).hide();
					}
				});
				
				ticker._callback(element, "init");
			});
		},
		
		_callback:function(element, name) {
			if(element.ticker.settings.callbacks[name]) {
				element.ticker.settings.callbacks[name](element);
			}
		},
		
		_change:function(element, next) {
			if(element.ticker.current != next && !element.ticker.animating) {
				element.ticker.animating = true;
				
				if(element.ticker.current) {
					eval("jQuery(element.ticker.current)."+element.ticker.settings.animations.out+"(element.ticker.settings.speed);");
					ticker._callback(element, "out");
				}
				
				element.ticker.current = next;
				
				setTimeout(function(){
						eval("jQuery(element.ticker.current)."+element.ticker.settings.animations._in+"(element.ticker.settings.speed);");
						ticker._callback(element, "_in");
						setTimeout(function(){element.ticker.animating = false;}, element.ticker.settings.speed);
					}, element.ticker.settings.speed+10);
			}
		},
		
		_loop:function(element, now) {
			return function(){
				if(element.ticker.looping) {
					$(element).ticker("next");
				}
			};
		},
		
		go:function(collection, to) {
			return collection.each(function(n, element){
				if(typeof to == "number") {
					$(element.ticker.settings.selection, element).each(function(n, item){
						if(n == to) {
							ticker._change(element, item);
						}
					});
				} else if (typeof to == "object") {
					ticker._change(element, to);
				} else if (typeof to == "string") {
					$(to, element).each(function(n, item){
						ticker._change(element, item);
					});
				}
			});
		},
		
		next:function(collection) {
			return collection.each(function(n, element){
				next = false;
				first = false;
				step = 0;
				
				$(element.ticker.settings.selection, element).each(function(n, item){
					if(n === 0) {
						first = item;
					}
					if(item == element.ticker.current && step === 0) {
						step++;
					} else if(step == 1) {
						next = item;
						step++;
					}
				});
				
				if(!next && element.ticker.settings.linked) {
					next = first;
				}
				
				if(next) {
					ticker._change(element, next);
				}
			});
		},
		
		prev:function(collection) {
			return collection.each(function(n, element){
				prev = false;
				found = false;
				
				$(element.ticker.settings.selection, element).each(function(n, item){
					if(item == element.ticker.current && n > 0) {
						found = true;
					}
					if(!found) {
						prev = item;
					}
				});
				
				if(found || element.ticker.settings.linked) {
					ticker._change(element, prev);
				}
			});
		},
		
		loop:function(collection) {
			return collection.each(function(n, element){
				ticker.start(collection);
				setInterval(ticker._loop(element), element.ticker.settings.delay);
			});
		},
		
		stop:function(collection) {
			return collection.each(function(n, element){
				element.ticker.looping = false;
			});
		},
		
		start:function(collection) {
			return collection.each(function(n, element){
				element.ticker.looping = true;
			});
		}
	};
	
	$.fn.ticker = function(call, args) {
		return ticker[call](this, args);
	};
	
})(jQuery);