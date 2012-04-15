/**
 * Copyright (c) 2009-2011 Rachael Ray Digital, John Shearer
 * 
 */
 
/**
 * @namespace
 * The top-level namespace for rachaelray.com
 */
var RR = (function () {
  
  // private attributes
      // read-only values
  var ro = {
        version:      "0.1 alpha",
        flashVersion: "8"             // min flash version for swfobject
      },
      
      // read/write variables
      rw = {
        section:    "",
        subsection: "",
        error:      ""
      },
      
      // the return object
      my = {};
  // end var
  
  
  // public methods
  /**
   * Getter function for RR top-level attributes, looks for the
   * attribute in both the read-only and read/write objects
   *
   * @param {String} name Then name of the value to get
   * @return {Mixed} Returns a string if found, else undefined
   */
  my.get = function (name) {
    if (ro.hasOwnProperty(name)) {
      return ro[name];
    }
    if (rw.hasOwnProperty(name)) {
      return rw[name];
    }
    return;
  };
  
  /**
   * Setter function for RR top-level read/write attributes
   * 
   * @param {String} name The name of the attribute to set
   * @param {Mixed} value The value to set the attribute to
   * @return {Object} Returns this
   */
  my.set = function (name, value) {
    if (rw.hasOwnProperty(name)) {
      rw[name] = value;
    }
    return this;
  };
  
  return my;
  
})();