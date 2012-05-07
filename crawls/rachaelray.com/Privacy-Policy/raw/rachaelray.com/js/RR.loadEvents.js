/**
 * The top-level namespace for rachaelray.com
 */
var RR = RR || {};

RR.loadEvents = (function () {
  var events = {
    common: {
      init: function () {
        var section = RR.get('section');
        jQuery('.siteNav > li.' + section).addClass('on');
        jQuery('#search .query').placeholder();
      },
      finalize: function () {}
    },
    home: {
      init: function () {
        /* TODO I saw my baby gettin' sloppy */
        jQuery('.topRecipes .tabs a').bind('click', function (e) {
          var that = jQuery(this),
              mytab  = that.hasClass('newest') ? 'newest' : 'popular';
          e.preventDefault();
          that.addClass('current');
          if (mytab === 'newest') {
            jQuery('.topRecipes div.newest').removeClass('hidden');
            jQuery('.topRecipes div.popular').addClass('hidden');
            jQuery('.topRecipes .tabs a.popular').removeClass('current');
          } else {
            jQuery('.topRecipes div.popular').removeClass('hidden');
            jQuery('.topRecipes div.newest').addClass('hidden');
            jQuery('.topRecipes .tabs a.newest').removeClass('current');
          }
        });
      },
      home: function () {
        jQuery(function ($) {
          $(".tweets").tweet({
            username: "rachael_ray",
            template: "{text}{time}",
            retweets: false,
            count: 1,
            fetch: 5,
            loading_text: "loading tweets..."
          });
        });
      }
    },
    food: {
      init: function () {},
      budget: function () {
        jQuery("a.signUp").bind("click", function () {
          return RR.chimp.getSignup("bml");
        });
      },
      recipes: function () {
        jQuery("#mailFriendForm").bind('submit', RR.checkMailFriendForm);
        jQuery("a.mailfriend").bind('click', function (e) {
          e.preventDefault();
          jQuery('.email-friend').modal({overlayClose:true});

        });
      },
      collections: function () {
        jQuery(".collection .tabs. li." + current).addClass('selected');
        jQuery(".collection .rbbn-hdr-tabs li." + current).addClass('selected');
      },
      searchForm: function () {
        jQuery("#bigForm").bind('submit', RR.checkAdvancedRecipeForm);
        // TODO: let the bubble do the work
        jQuery('#bigForm .unit label input').each(function () {
          var that = jQuery(this),
              parent = that.parent();
          if (that.is(':checked')) {
            parent.addClass('selected');
          } else {
            parent.removeClass('selected');
          }
          that.bind('change', function (e) {
            if (that.is(':checked')) {
              parent.addClass('selected');
            } else {
              parent.removeClass('selected');
            }
          });
        });
      },
      roundup: function() {
        jQuery("a.roundupSubscribe").bind("click", function () {
          return RR.chimp.getSignup("wru");
        });
      }
    },
    travel: {
      init: function () {},
      feedback: function () {
        jQuery.ajax({
            url:      '/js/libs/jquery.cycle.all-2.9999.4.min.js',
            dataType: 'script',
            context:   jQuery('.sldshw-screen'),
            success:   RR.loadFeedCycle
        });
        jQuery(".js-tabs.event li." + currentEvent).addClass('selected');
        jQuery(".js-tabs.cat   li." + currentCat).addClass('selected');
      }
    },
    shop: {
      init: function () {
        /* AdRoll code from Cooking.com */
        // these need to stay globally scoped
        adroll_adv_id = "WHGX64HU55GNVAUA4B2VIN";
        adroll_pix_id = "6DG2TYX3E5ARBDVDGY2X66";
        __adroll_loaded = true;

        var scr  = document.createElement("script"),
            host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com"),
            e    = document.getElementsByTagName('script')[0];
        scr.setAttribute('async', 'true');
        scr.src = host + "/j/roundtrip.js";
        e.parentNode.insertBefore(scr, e);
        /* end AdRoll code */
      },
      videos: function () {
        jQuery('a.signup').bind('click', function () {
          return RR.chimp.getSignup('cso');
        });
      }
    },
    rach: {
      init: function () {},
      home: function () {
        jQuery(function ($) {
          $(".tweets").tweet({
            username: "rachael_ray",
            template: "{text}{time}",
            retweets: false,
            count: 2,
            fetch: 5,
            loading_text: "loading tweet..."
          });
        });
      },
      slideshow: function () {
        jQuery.ajax({
            url:      '/js/libs/jquery.cycle.lite-1.5.min.js',
            dataType: 'script',
            context:   jQuery('.sldshw-screen'),
            success:   RR.loadCycle
        });
      }
    },
    kids: {
      init: function () {},
      quick: function () {
        jQuery(".collection .tabs. li." + current).addClass('selected');
        jQuery(function ($) {
          $(".tweets").tweet({
            username: ["lastminutelady", "planbmom"],
            template: "{avatar}{user}: {text}<br>{time}",
            avatar_size: 48,
            retweets: false,
            count: 8,
            fetch: 12,
            loading_text: "loading tweets..."
          });
        });
      }
    }
  },
  fire = function (func, funcname) {
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && events[func] && typeof events[func][funcname] === 'function') {
      events[func][funcname]();
    }
  };
  // end var

  return function () {
    var body = document.body,
        bodyId = body.id;

    // hit up common first.
    fire('common');

    // do all the classes too.
    jQuery.each(body.className.split(/\s+/), function (i, classname) {
      fire(classname);
      fire(classname, bodyId);
    });
    fire('common', 'finalize');
    return this;
  };
})();

// this'll start the ball rolling when the DOM's ready
jQuery(document).ready(RR.loadEvents);
