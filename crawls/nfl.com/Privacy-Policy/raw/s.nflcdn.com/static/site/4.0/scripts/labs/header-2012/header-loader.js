
/*globals YUI, console
*/

(function() {

  YUI().use("node", "cookie", "io", function(Y) {
    "use strict";
    var Constants, cookieDomain, encQS, hideDefaultHeader, loadNewHeader, renderNewFooter, renderNewHeader, showDefaultHeader;
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
    @method renderNewHeader
    */
    renderNewHeader = function() {
      return YUI({
        groups: {
          "header-2012": {
            combine: Constants.NFL_COMBO_ENABLED,
            comboBase: [Constants.NFL_COMBO_URL, "?", encQS(Constants.ASSET_VERSION + Constants.ASSET_BUILD), "&b=", encQS("yui3/static/" + Constants.ASSET_VERSION + "/scripts"), "&f="].join(""),
            comboSep: ",",
            base: (function() {
              switch (Constants.NFL_COMBO_ENABLED) {
                case true:
                  return Constants.SCRIPT_PATH + '/scripts/';
                default:
                  return Constants.SCRIPT_PATH + '/scripts/labs/header-2012/';
              }
            })(),
            root: "labs/header-2012/",
            modules: {
              "header-2012-css": {
                fullpath: nfl.constants.STYLE_PATH + "/styles/labs/header-2012/header-2012.css",
                type: "css",
                requires: ["font-endzoneslab-condmedium", "font-endzonetech-bold"]
              },
              "header-team-colors": {
                fullpath: nfl.constants.STYLE_PATH + "/styles/teams/colors.css",
                type: "css"
              },
              "footer-2012-css": {
                fullpath: nfl.constants.STYLE_PATH + "/styles/labs/footer-2012/footer-2012.css",
                type: "css"
              },
              "header-2012-css-touch": {
                fullpath: nfl.constants.STYLE_PATH + "/styles/labs/header-2012/header-2012-touch.css",
                type: "css",
                condition: {
                  trigger: "header-2012-css",
                  when: 'after',
                  test: function(Y) {
                    if (Y.UA.mobile) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              },
              "header-anim-plugins": {
                path: "header-anim-plugins.js",
                requires: ["node", "anim"]
              },
              "hp-teams-links": {
                path: "header-teams-links.js",
                requires: ["node", "substitute", "header-teams", "header-season"]
              },
              "header-2012-base": {
                path: "header-base.js",
                requires: ["node", "transition"]
              },
              "header-2012-base-ie7": {
                path: "header-base-ie7.js",
                requires: ["node"],
                condition: {
                  trigger: 'header-2012-base',
                  when: 'after',
                  test: function(Y) {
                    if (Y.UA.ie && Y.UA.ie <= 7) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              },
              "footer-2012-base-ie7": {
                path: "footer-base-ie7.js",
                requires: ["node"],
                condition: {
                  trigger: 'header-2012-base',
                  when: 'after',
                  test: function(Y) {
                    if (Y.UA.ie && Y.UA.ie <= 7) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              },
              "header-2012-base-touch": {
                path: "header-base-touch.js",
                requires: ["node", "event-flick", "event-custom"],
                condition: {
                  trigger: 'header-2012-base',
                  when: 'after',
                  test: function(Y) {
                    if (Y.UA.mobile) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              },
              "header-main-nav": {
                path: "header-main-nav.js",
                requires: ["node", "event-mouseenter", "event-touch", "header-2012-base", "header-anim-plugins", "plugin", "hp-teams-links", "event-custom"]
              },
              "header-secondary-nav": {
                path: "header-secondary-nav.js",
                requires: ["node", "event-mouseenter", "event-touch", "header-2012-base", "header-anim-plugins", "plugin", "hp-teams-links", "event-custom"]
              },
              "header-tertiary-content": {
                path: "header-tertiary-content.js",
                requires: ["node", "event-mouseenter", "header-2012-base", "header-anim-plugins", "plugin", "hp-teams-links"]
              },
              "hp-user-greet": {
                path: "header-personalize-user-greet.js",
                requires: ["nfl-user", "node", "substitute", "event-mouseenter", "anim", "header-anim-plugins", "plugin", "header-2012-base", "event-touch"]
              },
              "hp-fantasy": {
                path: "header-personalize-fantasy.js",
                requires: ["nfl-fantasy-myteams", "cookie", "querystring-parse", "nfl-user"]
              },
              "hp-team": {
                path: "header-personalize-team.js",
                requires: ["nfl-user", "node", "substitute", "header-2012-base", "header-teams", "hp-teams-links", "header-season"]
              },
              "hp-fans": {
                path: "header-personalize-fans.js",
                requires: ["nfl-user", "node"]
              },
              "hp-subscriptions": {
                path: "header-personalize-subscriptions.js",
                requires: ["nfl-user", "nfl-subscriptions", "geocode", "node", "json-parse", "cookie"]
              }
            }
          }
        }
      }).use("header-2012-css", "footer-2012-css", "header-2012-base", "header-main-nav", "header-secondary-nav", "header-tertiary-content", "cookie", function(Y) {
        var personalize;
        Y.Cookie.set("navType", "b", cookieDomain);
        Y.NFL.NewHeader.LoadHeader();
        Y.NFL.NewHeader.ObserveMainNav();
        Y.NFL.NewHeader.ObserveSecondaryNav();
        Y.NFL.NewHeader.ObserveTertiaryContent();
        personalize = function() {
          return YUI().use("header-team-colors", "hp-user-greet", "hp-fantasy", "hp-team", "hp-fans", "hp-subscriptions", function(Y) {
            Y.NFL.NewHeader.LoadUserGreet();
            Y.NFL.NewHeader.PersonalizeFantasySection();
            Y.NFL.NewHeader.PersonalizeTeam();
            Y.NFL.NewHeader.PersonalizeFan();
            return Y.NFL.NewHeader.PersonalizeSubscriptions();
          });
        };
        nfl.use("nfl-user", personalize);
      });
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
    Loads the New Header
    @method loadNewHeader
    @param {Boolean} lazyLoad - If true, make the AJAX call. Otherwise the markup should already be in place.
    */
    loadNewHeader = function(lazyLoad) {
      var ioCfg;
      lazyLoad = lazyLoad || false;
      if (lazyLoad) {
        ioCfg = {
          method: "GET",
          headers: {
            'Content-Type': 'text/html'
          },
          on: {
            complete: function(id, xhr) {
              var headerNode, scriptTeamNode;
              hideDefaultHeader();
              headerNode = Y.one("#header-2012");
              if (headerNode != null) headerNode.setContent(xhr.responseText);
              if (Y.UA.ie && Y.UA.ie < 9) {
                scriptTeamNode = Y.Node.create("<script DEFER>" + (headerNode.one("script.teams").getContent()) + "</script>");
                Y.one("body").append(scriptTeamNode);
              } else {
                scriptTeamNode = document.createElement("script");
                scriptTeamNode.innerHTML = headerNode.one("script.teams").getContent();
                document.body.appendChild(scriptTeamNode);
              }
              renderNewHeader();
              return renderNewFooter();
            }
          }
        };
        Y.io("/widget/labs/header-2012/header-w-events", ioCfg);
      } else {
        hideDefaultHeader();
        renderNewHeader();
        Y.on("domready", renderNewFooter);
      }
    };
    /**
    Shows the default Header
    @method showDefaultHeader
    */
    showDefaultHeader = function() {
      var _ref;
      Y.Cookie.set("navType", "a", cookieDomain);
      if ((_ref = Y.one("#current-header")) != null) {
        _ref.setStyle("visibility", "visible");
      }
    };
    /**
    Force show header if query string is passed
    */
    if (window.location.href.indexOf("defaultHeader") > -1) {
      showDefaultHeader();
      return;
    }
    if (window.location.href.indexOf("newHeader") > -1) {
      loadNewHeader(false);
      return;
    }
    /**
    Show header based on cookie information
    */
    if (Y.Cookie.get("navType") === "a") {
      showDefaultHeader();
      return;
    }
    if (Y.Cookie.get("navType") === "b") {
      loadNewHeader(false);
      return;
    }
    window.navType = window.navType || "a";
    if (window.navType === "b") {
      return loadNewHeader(false);
    } else {
      return showDefaultHeader();
    }
  });

}).call(this);
