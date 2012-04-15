/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.2
 */
(function(a,b){a.fn.extend({copyEvents:function(c){a.event.copy(a(c),this);return this},copyEventsTo:function(c){a.event.copy(this,a(c));return this}});a.event.copy=function(f,e){var d=f[0],c=d&&(a.data&&a.data(d,"events")||d.$events||d.events)||{};e.each(function(){var h=this;for(var g in c){a.each(c[g],function(i,j){var k=j.namespace!==b&&j.namespace||j.type||"";k=k.length?(k.indexOf(".")===0?"":".")+k:"";a.event.add(h,g+k,j.handler||j,j.data)})}})}})(jQuery);