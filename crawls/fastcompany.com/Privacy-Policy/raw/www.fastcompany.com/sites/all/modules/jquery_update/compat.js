// $Id: compat.js,v 1.1.2.1 2008/05/02 21:05:06 stevemckenzie Exp $
// UPGRADE: The following attribute helpers should now be used as:
// .attr("title") or .attr("title","new title")
jQuery.each(["id","title","name","href","src","rel"], function(i,n){
  jQuery.fn[ n ] = function(h) {
    return h == undefined ?
      this.length ? this[0][n] : null :
      this.attr( n, h );
  };
});

// UPGRADE: The following css helpers should now be used as:
// .css("top") or .css("top","30px")
jQuery.each("top,left,position,float,overflow,color,background".split(","), function(i,n){
  jQuery.fn[ n ] = function(h) {
    return h == undefined ?
      ( this.length ? jQuery.css( this[0], n ) : null ) :
      this.css( n, h );
  };
});

// UPGRADE: The following event helpers should now be used as such:
// .oneblur(fn) -> .one("blur",fn)
// .unblur(fn) -> .unbind("blur",fn)
var e = ("blur,focus,load,resize,scroll,unload,click,dblclick," +
  "mousedown,mouseup,mousemove,mouseover,mouseout,change,reset,select," + 
  "submit,keydown,keypress,keyup,error").split(",");

// Go through all the event names, but make sure that
// it is enclosed properly
for ( var i = 0; i < e.length; i++ ) new function(){
      
  var o = e[i];
    
  // Handle event unbinding
  jQuery.fn["un"+o] = function(f){ return this.unbind(o, f); };
    
  // Finally, handle events that only fire once
  jQuery.fn["one"+o] = function(f){
    // save cloned reference to this
    var element = jQuery(this);
    var handler = function() {
      // unbind itself when executed
      element.unbind(o, handler);
      element = null;
      // apply original handler with the same arguments
      return f.apply(this, arguments);
    };
    return this.bind(o, handler);
  };
      
};

// UPGRADE: .ancestors() was removed in favor of .parents()
jQuery.fn.ancestors = jQuery.fn.parents;

// UPGRADE: The CSS selector :nth-child() now starts at 1, instead of 0
jQuery.expr[":"]["nth-child"] = "jQuery.nth(a.parentNode.firstChild,parseInt(m[3])+1,'nextSibling')==a";

// UPGRADE: .filter(["div", "span"]) now becomes .filter("div, span")
jQuery.fn._filter = jQuery.fn.filter;
jQuery.fn.filter = function(arr){
  return this._filter( arr.constructor == Array ? arr.join(",") : arr );
};

/*
 * Compatibility Plugin for jQuery 1.1 (on top of jQuery 1.2)
 * By John Resig
 * Dual licensed under MIT and GPL.
 *
 * For XPath compatibility with 1.1, you should also include the XPath
 * compatability plugin.
 */
(function(jQuery){

	// You should now use .slice() instead of eq/lt/gt
	// And you should use .filter(":contains(text)") instead of .contains()
	jQuery.each( [ "eq", "lt", "gt", "contains" ], function(i,n){
		jQuery.fn[ n ] = function(num,fn) {
			return this.filter( ":" + n + "(" + num + ")", fn );
		};
	});

	// This is no longer necessary in 1.2
	jQuery.fn.evalScripts = function(){};

	// You should now be using $.ajax() instead
	jQuery.fn.loadIfModified = function() {
		var old = jQuery.ajaxSettings.ifModified;
		jQuery.ajaxSettings.ifModified = true;
	
		var ret = jQuery.fn.load.apply( this, arguments );
	
		jQuery.ajaxSettings.ifModified = old;

		return ret;
	};

	// You should now be using $.ajax() instead
	jQuery.getIfModified = function() {
		var old = jQuery.ajaxSettings.ifModified;
		jQuery.ajaxSettings.ifModified = true;
	
		var ret = jQuery.get.apply( jQuery, arguments );
	
		jQuery.ajaxSettings.ifModified = old;

		return ret;
	};

	jQuery.ajaxTimeout = function( timeout ) {
		jQuery.ajaxSettings.timeout = timeout;
	};

})(jQuery);
