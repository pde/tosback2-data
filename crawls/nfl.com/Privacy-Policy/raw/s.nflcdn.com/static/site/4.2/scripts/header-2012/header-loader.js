
/*globals YUI, console
*/

(function() {

  YUI().use("node", "cookie", "io", "get", function(Y) {
    "use strict";
    var Constants, cookieDomain, encQS, hideDefaultHeader, renderHeader2012, renderNewFooter, showDefaultHeader;
    Constants = nfl.constants;
    encQS = encodeURIComponent;
    cookieDomain = {
      path: "/",
      domain: ".nfl.com"
    };
    /**
    Hides the default header.
    @method hideDefaultHeader
    */
    hideDefaultHeader = function() {
      var hidedefaultHeaderBackgrounds, _ref;
      if ((_ref = Y.one("#current-header")) != null) {
        _ref.setStyles({
          display: "none",
          visibility: "hidden"
        });
      }
      hidedefaultHeaderBackgrounds = function() {
        var _ref2, _ref3, _ref4;
        if ((_ref2 = Y.one("#hd")) != null) _ref2.setStyle("background", "none");
        if ((_ref3 = Y.one("#hd-scorestrip")) != null) {
          _ref3.setStyles({
            "background": "none",
            filter: "none"
          });
        }
        if ((_ref4 = Y.one("#bd-gambit")) != null) {
          _ref4.setStyle("background", "transparent");
        }
      };
      hidedefaultHeaderBackgrounds();
      Y.later(4000, this, hidedefaultHeaderBackgrounds);
      Y.later(10000, this, hidedefaultHeaderBackgrounds);
      try {
        if (/^\/videos/i.test(window.location.pathname)) {
          Y.on("contentready", (function() {
            var _ref2;
            return (_ref2 = Y.one("#doc")) != null ? _ref2.setStyle("width", "985px") : void 0;
          }), "#doc");
          Y.on("contentready", (function() {
            var _ref2;
            return (_ref2 = Y.one("#doc-wrap")) != null ? _ref2.setStyles({
              padding: "0px",
              width: "985px",
              marginTop: "30px"
            }) : void 0;
          }), "#doc-wrap");
        }
      } catch (error) {
        console.error("Error updating videos page layout for the new nav", error);
      }
    };
    /**
    Loads the assets and renders and personalizes the new header.
    @method renderHeader2012
    */
    renderHeader2012 = function() {
      var headerLoaderChecker, loadHeader;

      hideDefaultHeader();
      Y.on("domready", renderNewFooter);
      
      Y.Get.script("" + Constants.SCRIPT_PATH + "/scripts/header-2012/header-2012.js");
      loadHeader = function() {
        if (window.nfl.Y.NFL && window.nfl.Y.NFL.LoadHeader2012) {
          headerLoaderChecker.cancel();
          window.nfl.Y.NFL.LoadHeader2012({
            loadCSS: true
          });
        } else {

        }
      };
      return headerLoaderChecker = Y.later(100, this, loadHeader, [], true);
    };
    /**
    Renders the New Footer
    @method renderNewFooter
    */
    renderNewFooter = function() {
      var _ref, _ref2;
      if ((_ref = Y.one("#br")) != null) _ref.setStyle("display", "none");
      if ((_ref2 = Y.one("#footer-2012")) != null) {
        _ref2.setStyle("display", "block");
      }
    };
    /**
    Shows the default Header
    @method showDefaultHeader
    */
    showDefaultHeader = function() {
      var _ref; 
      if ((_ref = Y.one("#current-header")) != null) {
        _ref.setStyle("visibility", "visible");

        Y.one("#current-header").delegate("click", (function(e) {

            var linkNode, linkText, linkValue, navGroupId, s_analytics, _ref2, linkGroup;
            linkNode = e.currentTarget;
            
            if ( linkNode.ancestor('li.alt-nv-group') != null ){
              linkGroup = linkNode.ancestor('li.alt-nv-group').getAttribute('id')
              linkText = linkNode.get("text").toLowerCase().replace(/[\W\s]/g, "");
            }else if( linkNode.ancestor('ul.xoxo') !== null ){
              linkGroup = 'teamLogos';
               linkText = linkNode.getAttribute('class');
            }
            
            linkValue = "tn-" + 'oldHeader-' + linkGroup +  "-" + linkText + "_a";
            s_analytics = s_gi(s_account);
            s_analytics.tl(this, 'o', linkText, {
              linkTrackVars: "events,eVar12",
              linkTrackEvents: "event50",
              events: "event50",
              eVar12: linkValue
            });

          }), "a");
      }
    };
    /**
    Force show header if query string is passed
    */

    renderHeader2012("f");
   
  });

}).call(this);
