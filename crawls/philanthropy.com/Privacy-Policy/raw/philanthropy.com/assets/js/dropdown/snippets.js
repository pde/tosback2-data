/**
Finds the primitive type of any property

@method toType
@return {String} type
@param {} obj
**/
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
Searches arrays for a string, returns whether it's there or not

@method inArray
@return {Integer} first position of the string or false
@param {String} n (needle)
@param {Array} h (haystack)
**/
var inArray = function(n,h) {
  for (var i=0;i<h.length;i++) {
    if (n === h[i]) {
      return i;
    }
  }
  return false;
};

/**
Simple timeout class. Sets and cancels timeouts

@class timeout
@constructor var t = timeout
**/
var Timeout = function() {
  /**
  @property id timeoutid
  @type Integer
  **/
  this.id = null;
  this.completed = false;
};
Timeout.prototype = {
  /**
  @method set
  @return {Integer} this.id
  @param {Integer} time in miliseconds
  @param {Function} callback
  **/
  set: function (callback,time) {
    this.id = window.setTimeout(callback,time);
    return this.id;
  },
  /**
  Cancels existing timeout

  @method cancel
  **/ 
  clear: function() {
    window.clearTimeout(this.id);
    this.id = null;
    return true;
  }
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/**
Extend jQuery to have a hide and show method that keeps the sizes. 
$.fn.show & $.fn.hide use display:block and display:none;

Should be chainable.

Used with $('.element').visible(); and $('.element').invisible();
**/
(function($) {
  $.fn.visible = function() {
    return this.css('visibility','visible');
  };
  $.fn.invisible = function() {
    return this.css('visibility','hidden');
  };
})(jQuery);