/* 
* smartscroll: debounced scroll event for jQuery *
* https://github.com/lukeshumard/smartscroll
* based on smartresize by @louis_remi: https://github.com/lrbabe/jquery.smartresize.js *
* Copyright 2011 Louis-Remi & lukeshumard * Licensed under the MIT license. *
*/

var event = $.event,
	scrollTimeout;

event.special.smartscroll = {
	setup: function() {
	  $(this).bind( "scroll", event.special.smartscroll.handler );
	},
	teardown: function() {
	  $(this).unbind( "scroll", event.special.smartscroll.handler );
	},
	handler: function( event, execAsap ) {
	  // Save the context
	  var context = this,
	      args = arguments;
	
	  // set correct event type
	  event.type = "smartscroll";
	
	  if (scrollTimeout) { clearTimeout(scrollTimeout); }
	  scrollTimeout = setTimeout(function() {
	    jQuery.event.handle.apply( context, args );
	  }, execAsap === "execAsap"? 0 : 100);
	}
};

$.fn.smartscroll = function( fn ) {
	return fn ? this.bind( "smartscroll", fn ) : this.trigger( "smartscroll", ["execAsap"] );
};