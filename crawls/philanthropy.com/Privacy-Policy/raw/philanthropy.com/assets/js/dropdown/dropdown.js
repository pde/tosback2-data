/**
  Adds the designated dropdown on hover or click of the calling element.

  @class addDropdown
  @constructor $(element).addDropdown(options)
    options that are required: dropdown$
  @version 0.4.3
**/

(function($) {
  $.fn.addDropdown = function(opts) {
    "use strict";
    /**
      Options, default and after merging with user-sent. These really need to be overridden in most cases.

      @property defaults
      @property options
      @type Object

      @property dropdown$ (jQuery Object, the dropdown div, it should be contained in the hovered$ element and set to hide())
      @property callback (Function, any callback function to be done after load)
      @property behavior (String, click or hover for now)
      @property css (Object, contains css properties needed to place the dropdown)
      @property hoverClassElement$ (jQuery Object, the place where a hover element needs to stay. So, if your hovered-on element is an li with an a inside, and you want the a to have the class, make this property $(this).find('a'))
      @property hoverClass (String, the hover class you've set in your css)
    **/
    var defaults = {
      dropdown$: $('body'),
      callback: function() {},
      behavior: 'hover', // hover, click
      css: {},
      invisible: false, // use visibility:hidden over display:none to keep layout
      delays: { // this is for hover behavior
        on: 150, // should probably always be zero
        off: 350
      },
      hoverClassElement$: $(this),
      hoverClass: 'hover'
    };

    var options = $.extend(defaults, opts),
    /**
      Timeout extension. Stores active timeouts and cancels them when necessary to control megamenu behavior.

      @property t
      @type Timeout
    **/
        timeout = new Timeout(),
        hovered$ = $(this);

    // setting any prestyled css that's passed in
    options.dropdown$.css(options.css);

    // jQuery<1.6 substitution for is(jQuery); operator
    var isSameElement = function(a$, b$) {
      return a$.html() === b$.html();
    }

    switch (options.behavior) {
      case ('hover'):
        /**
           Set actual dropdown hover event. This is for when a user is hovered on the dropdown itself to keep it alive. It has a 350ms delay before it closes to allow for some user mousing error.

          @method options.dropdown$.add(hovered$).mousenter().mouseleave();
        **/
        var jq_version = /\.(\d)\./.exec($.fn.jquery);
        hovered$.mouseenter(function() {
          timeout.clear();

          var removeClass = function () {
            $('body').find(options.hoverClassElement$[0]['nodeName'] + '.' + options.hoverClass).removeClass(options.hoverClass);
          }
          // if jquery < 1.6
          if (jq_version[1] < 7) {
            if (isSameElement($(this),hovered$)) removeClass();
          // if jquery >= 1.6
          } else {
            if ($(this).is(hovered$)) removeClass();
          }
          
          timeout.set(function() {
            options.hoverClassElement$.addClass(options.hoverClass);
            // if invisible is false, use default, otherwise use visible/invisible
            options.invisible ? 
              options.dropdown$.visible() :
              options.dropdown$.show(0);
          }, options.delays.on, 'show');
        }).mouseleave(function() {
          timeout.clear();
          timeout.set(function() {
            // if invisible is false, use default, otherwise use visible/invisible
            options.invisible ?
              options.dropdown$.invisible() :
              options.dropdown$.hide(0);
            options.hoverClassElement$.removeClass(options.hoverClass);
          }, options.delays.off, 'hide');
        });
        break;
      case ('click'):
        /**
          Main menu click event. This opens and closes the correct megamenu. It toggles with a 50ms duration.

          @method $(this).hover();
        **/
        $(this).click(function() {
          options.dropdown$.fadeToggle(50);
        });
        break;
    }
    // Applies callback, if it exists
    if (options.callback !== undefined) {
      options.callback($(this));
    }

    return $(this);
  };
  $.fn.visible = function() {
    return this.css('visibility','visible');
  };
  $.fn.invisible = function() {
    return this.css('visibility','hidden');
  };
})(jQuery);