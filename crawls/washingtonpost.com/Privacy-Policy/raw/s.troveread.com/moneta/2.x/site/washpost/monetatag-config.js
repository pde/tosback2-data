/*global window */
/**
 * Moneta Tag API config file for Washington Post deployment.
 */
(function(global) {

  // Enable the Moneta Tag API
  var monetatag = (global.monetatag = global.monetatag || {});
  monetatag.q = monetatag.q || [];

  // tell MonetaJS not to parse data-moneta-config attribute on
  // on main MonetaJS script tag and use this config instead
  monetatag.config = {
    renderBeforeDomReady: true
  };

  // tell MonetaJS not to parse automatically
  monetatag._noparse = true;
  monetatag._ignoreLegacyOptions = true;

  // ------------------------------------------------------
  // Washington Post specific helper functions
  //
  //    monetatag.site.washpost = {
  //
  //      // Call directly below a Moneta Widget Tag
  //      // in order to parse it immediately
  //      parseWidgetById: function(domId) { ... },
  //
  //      // Call whenever Washington Post wants to initialize
  //      // the non-priority Moneta widgets
  //      init: function() { ... }
  //
  //    }
  //
  //  Feel free to add any functions needed under the
  //  monetatag.site.washpost namespace (MonetaJS doesn't
  //  care about anything under the monetatag.site namespace
  //  in general, so you will not cause any conflicts).
  // ------------------------------------------------------

  monetatag.site = monetatag.site || {};
  monetatag.site.washpost = monetatag.site.washpost || {};

  monetatag.site.washpost.parseWidgetById = function(domId) {
      monetatag.q.push(function() {
          var moneta = monetatag.moneta();
          moneta.parseWidgets(global.$("#" + domId), true);
      });
  };

  monetatag.site.washpost.init = function() {

      // Process deferred Moneta widgets
      monetatag.q.push(function() {

          var moneta = monetatag.moneta();

          // (Note: this LEGACY stuff will go away when all widgets are converted
          // from adOptions based widgets to Moneta Widget Tags

          // ----------- LEGACY ------------------
          // Copied from: http://s.troveread.com/moneta/2.x/js/revplat.wp-config.js
          // This config file defines the ads associated with given containers on the WP pages
          var adOptions = [{ container: 'rev_ad1' }, { container: 'rev_ad2' }, { container: 'rev_ad3' },
                           { container: 'rev_ad4' }, { container: 'rev_ad_5' }, { container: 'perpos_rr' },
                           { container: 'rev_ad_6' }, { container: 'rev_ad_7' }, { container: 'rev_ad_8' }];

          global.$.each(adOptions, function(index, widget) {
              // only add the widget if the DIV for the widget is on the page
              if(global.$('#'+widget.container).length > 0) {
                  moneta.addWidget({
                      options: widget
                  });
              }
          });
          // ----------- /LEGACY ------------------


          // parse everything that hasn't already been parsed;
          moneta.parseWidgets();
      });
  };
}(window));
