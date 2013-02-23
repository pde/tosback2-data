/**
 * Function.bind Polyfill for ECMAScript 5 Support
 * Kangax's bind with Broofa's arg optimization.
 * http://www.broofa.com/Tools/JSLitmus/tests/PrototypeBind.html
 */
if (typeof Function.prototype.bind !== "function") {
    Function.prototype.bind = function() {
        var slice = Array.prototype.slice;
        return function(context) {
            var fn = this,
                args = slice.call(arguments, 1);
            if (args.length) {
                return function() {
                    return arguments.length
                        ? fn.apply(context, args.concat(slice.call(arguments)))
                        : fn.apply(context, args);
                };
            }
            return function() {
                return arguments.length
                    ? fn.apply(context, arguments)
                    : fn.call(context);
            };
        };
    };
}
;
/*globals window*/
/**
 * The later method causes a method on the object to be invoked in the future.
 */
Function.prototype.later = function (msec) {
  var fn = this,
    args = Array.prototype.slice.call(arguments, 1);
  return window.setTimeout(
    function () {
      fn.apply(this, args);
    },
    msec
  );
};
;
if (!window.localStorage) {
  window.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) {
      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
    },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
;
(function ($) {

  function setupZclip() {
    $(".button-copy").zclip('remove').zclip({
      path: '/'+Drupal.settings.themePath+'/assets/swf/ZeroClipboard.swf',
      copy: $('#copy-link-input').val(),
      afterCopy: function () {
        $('.button-copy').html('copied');
      }
    });
  }

  function getExcapedDescription() {
    return $('#slideshow-description-container .inner').text() || 'no desc';
  }

  function setupShareControl() {
    $('.item-share').unbind('click').bind('click', function () {
      $('.share-container').css({height: '100%'}).show('slow', function () {
        setupZclip();
        $('body').addClass('share-open');
      });
    });
    $('.share-container-close').unbind('click').bind('click', function () {
      $('.share-container').hide('slow');
      $('body').removeClass('share-open');
      $('.button-copy').html('copy');
    });
    $('.icon-share-twitter').unbind('click').bind('click', function (event){
      var wWidth, wHeight, pHeight, pWidth, popLeft, popTop, winSize;
      var url = $(this).attr('href');
      wWidth = document.body.clientWidth;
      wHeight = document.body.clientHeight;
      pHeight = '300';
      pWidth = '450';
      popTop =  wHeight / 2 - pHeight / 2;
      popLeft = wWidth / 2 - pWidth / 2;
      winSize = 'width=' + pWidth + ', height=' + pHeight + ', top=' + popTop + ', left=' + popLeft;
      window.open(url, '_new', winSize);
      event.preventDefault();
    });
    $('.icon-share-facebook').unbind('click').bind('click', function (e) {
      e.preventDefault();
      var description = getExcapedDescription(),
        title = $('.node-slideshow h1').html();
      // Need to init with appid/etc before using this.
      // look into best fb module
      if (typeof FB !== 'undefined') {
        FB.ui({
          method: 'feed',
          name: title,
          link: document.location.href,
          description: description,
          message: "twitter text placeholder"
        });
      }
    });
  }

  function setupFullscreenControl() {
    $('.fullscreen').unbind('click').bind('click', function () {
      slideshow.enterFullscreen();
      return false;
    });
    $('.fullscreen-close').unbind('click').bind('click', function () {
      slideshow.exitFullscreen();
      return false;
    });
  }

  function setupCommentLink() {
    $('.item-comment').unbind('click').bind('click', function () {
      $('html, body').animate({scrollTop: $("#block-mun2-blocks-mun2-facebook-comments").offset().top - 10}, 1000);
      return false;
    });
  }

  function setupControls() {
    if ($('#interactions-wrapper').length) {
      setupShareControl();
      // setupFullscreenControl();
      setupCommentLink();
    }
  }

  $(setupControls);

}(jQuery));
/*globals FB, navigator, window, document, jQuery*/
var mun2 = mun2 || {};
mun2.mobile = {};

(function ($) {
  // Mobile functions, move to mobile
  mun2.mobile.detect = {
    Android: function () {
      if (navigator.userAgent.match(/Android/i)) {
        return (navigator.userAgent.match(/Mobile/i)) ? 'mobile' : 'tablet';
      }
      return false;
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
      return (mun2.mobile.detect.Android()
           || mun2.mobile.detect.BlackBerry()
           || mun2.mobile.detect.iOS()
           || mun2.mobile.detect.Windows());
    },
    touchSupport: function () {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;;
    }
  };
  

  mun2.mobile.getOrientation = function () {
    var orientation;
    switch (window.orientation) {
    case -90:
    case 90:
      orientation = 'landscape';
      break;
    default:
      orientation = 'portrait';
      break;
    }
    return orientation;
  };


  /**
   * Returns a Facebook Like button
   * @param href (optional) defaults to document.location.href
   * @param id (required) give the element an id attribute
   */
  mun2.getLikeButton = function (href, id) {
    href = href || document.location.href;
    if (!id) {
      throw 'mun2.getLikeButton no id specified, you must specify an id';
    }

    return $('<div />').attr({
      'id': id,
      'class': 'fb-like',
      'data-href': href,
      'data-layout': 'button_count',
      'data-width': 90,
      'data-show-faces': false,
      'data-font': 'arial'
    });
  };

  mun2.renderLikeButton = function (contextSelector) {
    if (typeof FB === 'undefined') { return; }
    contextSelector = contextSelector || 'body';
    FB.XFBML.parse($(contextSelector).get(0));
  };

  function init() {
    if (mun2.mobile.detect.iOS()) {
      $('body').addClass('iOS');
    }
  }

  $(init);

}(jQuery));

//TODO: remove this before release
function l(str){
    jQuery(".messages ul").append('<li>'+str+'</li>');
}

function mun2_load_video(url) {
	window.location.href = url;
};
/*globals jQuery, window*/
(function ($) {
  "use strict";

  // Replaces click handler that opens an intrusive flash overlay
  // with a direct link to the page containing the flash overlay
  function modifyAdChoiceLink() {
    $('#_bapw-link').replaceWith($('#_bapw-link').clone());
    $('#_bapw-link').bind('click', function () {
      window.location.href = 'http://info.evidon.com/pub_info/197?v=1';
    });
  }

  function bindFullsiteButton() {
    if (!window.localStorage) { return; }
    var forceDesktop = (window.localStorage.getItem('forceDesktop') === "true"),
      desktopLayoutWidth = 1010,
      defaultWindowWidth = window.innerWidth,
      desktopViewportZoom = defaultWindowWidth / desktopLayoutWidth,
      srcViewportFullsite = '<meta name="viewport" content="width=' + desktopLayoutWidth + ', initial-scale=' + desktopViewportZoom + ', maximum-scale=10, user-scalable=yes" />';

    if (forceDesktop) {
      $('body').removeClass('responsive');
      $('meta[name~=viewport]').replaceWith(srcViewportFullsite);
      $('.fullsite-toggle').html('view mobile site');
      // IF we detect a mobile device, show the toggle link so may switch back to the responsive view.
      // OR, if we are within a responsive breakpoint on desktop do the same.
      if (mun2.mobile.detect.any() || (window.innerWidth <= 1024)) {
        $('.fullsite-toggle').show().css('display', 'block');  
      }
    }

    $('.fullsite-toggle').bind('click', function (e) {
      e.preventDefault();
      if (forceDesktop) {
        window.localStorage.setItem('forceDesktop', "false");
      } else {
        window.localStorage.setItem('forceDesktop', "true");
      }
      window.location.reload();
    });
  }

  // Binds click event to the mobile nav items
  function bindNavButtons() {
    $('#nav-extra').delegate('li:not(.no-bind) a', 'click', function (e) {
      var anchor = $(e.currentTarget),
        container = $(e.liveFired),
        anchors = container.find('a'),
        slideContainerId = anchor.attr('data-slide'),
        slideContainer = $(slideContainerId),
        slideDivs = $('#nav-extra-slide').children();
      // Remove active class
      slideDivs.removeClass('open');
      anchors.not(anchor).removeClass('active');
      // Hide divs except for the one that toggled
      slideDivs.not(slideContainer).hide();
      // Slide clicked div down
      slideContainer.slideToggle('fast', function () {
        $(this).addClass('open');
        // Add active class
        anchor.toggleClass('active');
      });
      // Prevent default behavior
      e.preventDefault();
    });
  }

  function init() {
    bindNavButtons();
    bindFullsiteButton();
    modifyAdChoiceLink();
  }

  $(init);

}(jQuery));
// Drupal.brightcove_field.listeners.push(function () {
//   console.log(arguments);
// })
;
