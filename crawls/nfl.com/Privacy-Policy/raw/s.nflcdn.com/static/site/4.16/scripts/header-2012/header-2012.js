/*globals YUI, console, nfl
*/

(function() {
  "use strict";
  var Constants, encQS;

  Constants = nfl.constants;

  encQS = encodeURIComponent;

  /**
  Dynamically adds modules and dependencies to YUI config and loads the new Header.
  @namespace window.nfl.Y.NFL
  @method LoadHeader2012
  @static
  */
  window.nfl.Y.namespace("NFL").LoadHeader2012 = function(config) {
    /**
    LoadHeader2012 has the ability to load the base CSS files, which is true by default.
    Some pages may already have it loaded via link tag, so this can be turned off optionally
    */
    var Y, _loaderFn, _loaderParams, _baseModules;

    config = config || {
      loadBaseCSS: true
    };
    
    /**
    Create a new instance of YUI by adding
    the header & footer modules to the global dependency tree
    */
    Y = YUI({
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
                return Constants.SCRIPT_PATH + '/scripts/header-2012/';
            }
          })(),
          root: "header-2012/",
          modules: {
            "footer-2012-styles": {
              fullpath: Constants.STYLE_PATH + "/styles/footer-2012/footer-2012.css",
              type: "css"
            },            
            "header-2012-styles": {
              fullpath: Constants.STYLE_PATH + "/styles/header-2012/header-2012.css",
              type: "css",
              requires: ["font-endzoneslab-condmedium", "font-endzonetech-bold"]
            },
            "header-team-colors": {
              fullpath: Constants.STYLE_PATH + "/styles/teams/colors.css",
              type: "css"
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
            "header-2012-css-touch": {
              fullpath: Constants.STYLE_PATH + "/styles/header-2012/header-2012-touch.css",
              type: "css",
              condition: {
                trigger: "header-2012-base-touch",
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
              requires: ["nfl-user", "node", "substitute", "event-mouseenter", "anim", "header-anim-plugins", "plugin", "header-2012-base", "event-touch", "modal-login" ]
            },
            "hp-notifictations": {
              path: "header-personalize-notifications.js",
              requires: ["base-build", "async-queue", "transition", "widget-base", "rewards"]
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
            },
            "header-static-team-bar": {
              path: "header-static-team-bar.js",
              requires: ["node","data-teams","transition","cookie"]
            }
          }
        }
      }
    });

    /**
    This is the YUI callback after the base-modules are loaded.
    @method _loaderFn
    @private
    @param {Object} Y - YUI instance
    */
    _loaderFn = function(Y) {
      var personalize, includesLoaded, includesCheck;
      Y.NFL.Header2012.LoadHeader();

        // Look for the header-base.js setting window.loadHeaderIncludesCompleted
        // as the header's sub-content is loaded now via AJAX for SEO purpose.
        includesCheck = setInterval(function(){

          // Well, IE 8.. that's what. the global Y instance gets recreated in prototype-based pages (where I don't know) 
          // and loses window.Y.NFL.Header2012.headerNode which MUST be available for navigation work.
          try {
            if (!window.Y.NFL.Header2012.headerNode) {
              window.Y.namespace("NFL.Header2012").headerNode = Y.one("#header-2012");
            }
          } catch(ex) {
            window.Y.namespace("NFL.Header2012").headerNode = Y.one("#header-2012");
          }

          if(typeof window.loadHeaderIncludesCompleted !== "undefined") {
            clearInterval(includesCheck);
            Y.NFL.Header2012.ObserveMainNav();  
            Y.NFL.Header2012.ObserveSecondaryNav();
            Y.NFL.Header2012.ObserveTertiaryContent();
            Y.NFL.Header2012.HeaderStaticTeamBar();            
            includesLoaded = true;
          }  
        }, 300);
      
      /**
      Needed to wrap this into a function for personalization 
      to load late for pages using prototype.js, because of prototype-compat loading later.
      */
      personalize = function() {
        var personalizeCheck;
        Y.use("hp-user-greet", "hp-fantasy", "hp-team", "hp-fans", "hp-subscriptions", "hp-notifictations", function() {
          
          personalizeCheck = setInterval(function(){            
            if(typeof window.loadHeaderIncludesCompleted !== "undefined" && includesLoaded) {   
              clearInterval(personalizeCheck);
              Y.NFL.Header2012.LoadUserGreet();
              Y.NFL.Header2012.PersonalizeSubscriptions(); 
              Y.NFL.Header2012.PersonalizeFantasySection();
              Y.NFL.Header2012.PersonalizeTeam();
              Y.NFL.Header2012.PersonalizeFan();
              Y.NFL.Header2012.LoadNotifications();
            }
          }, 300);
            
        });
      };
      /**
      Personalize all aspect, only if the nfl.com domain or sub-domain. 
      */
      if (/nfl.com$/i.test(window.location.hostname) || /nfl.net$/i.test(window.location.hostname)) { 
        if (window.Prototype) {
          Y.use("prototype-compat", "nfl-user", personalize);
        } else {
          Y.use("nfl-user", personalize);
        }
      }
    };
    
    _baseModules = [ "header-2012-base", "header-main-nav", "header-secondary-nav", "header-tertiary-content", "header-static-team-bar", _loaderFn ];
    if (config.loadBaseCSS) {
        Array.prototype.unshift.apply(_baseModules, [ "header-2012-styles", "footer-2012-styles", "header-team-colors" ]);
    }
    
    /**
    Let the header & footer loading begin...
    */
    Y.use.apply(Y, _baseModules);
  };

}).call(this);
