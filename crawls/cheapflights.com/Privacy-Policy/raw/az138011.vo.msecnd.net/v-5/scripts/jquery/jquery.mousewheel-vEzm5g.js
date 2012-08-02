/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(a){var d=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks){for(var c=d.length;c;){a.event.fixHooks[d[--c]]=a.event.mouseHooks}}a.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=d.length;e;){this.addEventListener(d[--e],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var e=d.length;e;){this.removeEventListener(d[--e],b,false)}}else{this.onmousewheel=null}}};a.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}});function b(i){var j=i||window.event,e=[].slice.call(arguments,1),f=0,k=true,g=0,h=0;i=a.event.fix(j);i.type="mousewheel";if(j.wheelDelta){f=j.wheelDelta/120}if(j.detail){f=-j.detail/3}h=f;if(j.axis!==undefined&&j.axis===j.HORIZONTAL_AXIS){h=0;g=-1*f}if(j.wheelDeltaY!==undefined){h=j.wheelDeltaY/120}if(j.wheelDeltaX!==undefined){g=-1*j.wheelDeltaX/120}e.unshift(i,f,g,h);return(a.event.dispatch||a.event.handle).apply(this,e)}})(jQuery);