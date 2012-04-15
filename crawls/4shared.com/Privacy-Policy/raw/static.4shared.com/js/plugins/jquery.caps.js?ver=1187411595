// jQuery plugin to detect if a user's caps lock is on or not.
jQuery.fn.caps = function(cb) {
  return this.keypress(function(e) {
    var w = e.which ? e.which : (e.keyCode ? e.keyCode : -1);
    var s = e.shiftKey ? e.shiftKey : (e.modifiers ? !!(e.modifiers & 4) : false);
    var c = (((w >= 65 && w <= 90) || (w >= 1040 && w <= 1071)) && !s) || ((w >= 97 && w <= 122) && s);
    
    cb.call(this, c);
  });
};
