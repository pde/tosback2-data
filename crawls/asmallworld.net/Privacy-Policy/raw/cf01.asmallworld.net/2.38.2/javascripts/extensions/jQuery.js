/* This functions are used to extend jQuery itself and should
 * be reviewed whenever jQuery is upgraded
 */

jQuery.extend({
  // required for any version of jQuery under 1.4.1
  error: function( msg ) {
    throw msg;
  },

  // required for any version of jQuery under 1.4.4
  parseJSON: function( data ) {
    if ( typeof data !== "string" || !data ) {
      return null;
    }
    data = jQuery.trim( data );
    if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {
      return window.JSON && window.JSON.parse ? window.JSON.parse( data ) : (new Function("return " + data))();
    } else {
      jQuery.error( "Invalid JSON: " + data );
    }
  }
});

jQuery.fn.clearForm = function() {
  // iterate each matching form
  return this.each(function() {
    // iterate the elements within the form
    jQuery(':input', this).each(function() {
      var type = this.type, tag = this.tagName.toLowerCase();
      if (type == 'text' || type == 'password' || tag == 'textarea')
        this.value = '';
      else if (type == 'checkbox' || type == 'radio')
        this.checked = false;
      else if (tag == 'select')
        this.selectedIndex = -1;
    });
  });
};

