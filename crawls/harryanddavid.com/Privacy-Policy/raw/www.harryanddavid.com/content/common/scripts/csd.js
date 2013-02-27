/*jslint browser: true, nomen: true, plusplus: true, regexp: true, indent: 2, maxerr: 5 */
/*global $: false, jQuery: false, dojo: false, $f: false, Scene7: false,
  console: false, bec: false, eSiteIncludeDir: false,
  cmCreateElementTag: false */

/*********************************************************************************************************************/
/* Error Handling                                                                                                    */
/*********************************************************************************************************************/
if (console !== undefined && console.error !== undefined) { jQuery.error = console.error; }

/*********************************************************************************************************************/
/* Utility Functions                                                                                                 */
/*********************************************************************************************************************/

/**
 * Find nodes that match a criteria
 *
 * @param {String} property the property to check
 * @param {Var} value null to match the existence of a property or the value to match
 * @param {Boolean} blnMatch false to use equality and true to use String.match
 * @param {node} node the DOM node to start searching from
 */
function getNodes(property, value, blnMatch, node) {
  "use strict";
  var results, any, i, children, it;
  results = [];
  any = (value === null);

  node = node || document.documentElement;
  if (node.splice) { node = { childNodes: node }; }

  for (i = 0, children = node.childNodes; children[i]; i++) {
    it = children[i];
    if (it.childNodes.length) { results = results.concat(getNodes(property, value, blnMatch, it)); }
    if ((any && it[property]) || (it[property] === value) || (blnMatch && !!String(it[property]).match(value))) { results.push(it); }
  }

  return results;
}


/**
 * Determine if an element is empty.  Does not count comment nodes.
 * @param target element to check
 * @returns {Boolean} true if the target contains nothing excluding comments
 */
function isEmpty(target) {
  "use strict";
  var i, il;

  try {
    for (i = 0, il = target.childNodes.length; i < il; i++) {
      if (target.childNodes[i].nodeType !== 8) { return false; }
    }
  } catch (e) {}

  return true;
}

var comment = {
  find: function (text) {
    "use strict";
    return comment.findAll(text)[0];
  },
  findAll: function (text) {
    "use strict";
    return $.map(getNodes('nodeType', 8), function (element, index) {
      return element.nodeValue === text ? element : null;
    });
  }
};

var filterByDate = (function () {
  "use strict";
  var obj, now;
  now = new Date();

  obj = function (index, element) {
    var $element, start, end;
    $element = $(element);
    start    = $element.data('start');
    end      = $element.data('end');
    return (start === undefined || new Date(start) < now) && (end === undefined || new Date(end) > now);
  };
  obj.updateNow = function () { now = new Date(); };

  return obj;
}());

function setEqualHeight(elements) {
  "use strict";
  var max;
  max      = 0;
  elements = $(elements);
  elements.each(function (index, element) { element = $(element).height(); if (element > max) { max = element; } });
  elements.height(max);
}

var urlParams = {};
(window.onpopstate = function () {
  try {
    var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);
    
    urlParams = {};
    while (match = search.exec(query)) { urlParams[decode(match[1])] = decode(match[2]); }
  } catch (e) {}
}());

/*********************************************************************************************************************/
/* onReady                                                                                                           */
/*********************************************************************************************************************/

try {
  $(window).bind('load', function (e) {
    "use strict";
    $('body').addClass('ready');
  });
} catch (e) {}


/*********************************************************************************************************************/
/* Buttons                                                                                                           */
/*********************************************************************************************************************/

// Make the buttons special
var button = {
  enhance: function (obj) {
    "use strict";
    var $obj;
    if (obj === undefined) { return; }
    $obj = $(obj);
    if ($obj.length === 0) { return; }

    // Create the structure needed for the enhanced button
    $obj
      .wrapInner('<span class="btn-label"></span>')
      .wrapInner('<span class="btn-part"></span>')
      .prepend('<i class="btn-part"></i>')
      .find('span.btn-part')
        .prepend('<span class="btn-part"></span><i class="btn-part"></i>')
      .end();
  },
  reset: function (obj) {
    "use strict";
    var $obj;
    if (obj === undefined) { return; }
    $obj = $(obj);
    if ($obj.length === 0) { return; }

    // Remove the enhanced button structure
    $(obj).find('.btn-part').remove();
  },
  enhanceAll: function () {
    "use strict";
    // Enhance any buttons that are not already enhanced
    button.enhance('.btn:not([dojoType="bec.widget.Button"]):not(:has(.btn-part))');
  }
};

// Enhance all of the non-enhanced buttons once the page is ready
$(button.enhanceAll);


/*********************************************************************************************************************/
/* Dialogs                                                                                                           */
/*********************************************************************************************************************/

var dialog = {};
var popup = {};

dojo.addOnLoad(function () {
  "use strict";
  var defaults = {
    id:              'unnamed',
    contentType:     'href',
    titlebar:        true,
    backgroundClose: true
  };

  popup.create = function (options) {
    options = $.extend({}, defaults, options);

    if (options.content === undefined) {
      options.content = eSiteIncludeDir + "/dialogs/" + options.id + '.html';
    }
    if (options.type === 'error') {
      options.additionalProps = new bec.widget._ErrorDialog();
    }
    if (options.title === undefined) {
      if (options.type === 'coupon') {
        options.title = 'Details: coupon code <span style="color: #f00;">' + options.id + '</span>';
      } else {
        options.title = '';
      }
    }

    popup.doPopup(
      "dialog-" + options.id,
      options.title,
      options.contentType,
      options.content,
      options.titlebar,
      options.backgroundClose,
      options.positionAroundNode,
      options.popupPosition,
      options.callback,
      options.additionalProps
    );
  };

  popup.loadPopups = function (popups) {
    var regex_dash = /-(\w)/g;
    function dashToCamel(str, p1, offset, s) { return p1.toUpperCase(); }

    $.each(popups, function (index, value) {
      var name;

      if (value.name) {
        value.name = value.name.replace(regex_dash, dashToCamel);
        name = value.name;
      } else {
        name = value.id;
      }

      try { dialog[name] = function () { popup.create(value); }; } catch (e) { $.error(e.message); }
    });
  };
});


/*********************************************************************************************************************/
/* Video Player                                                                                                      */
/*********************************************************************************************************************/

var video = (function ($) {
  "use strict";
  var func;

  func = {
    options: {
      overlay: {
        color:     '#999',
        loadSpeed: 200,
        opacity:   0.75,
        size:      { width: 550, height: 316 } // Height should be 15 pixels taller than the player
      },
      player: {
        id:       'player',
        swf:      document.location.protocol + '//' + document.location.hostname + '/content/common/include/flowplayer/flowplayer.commercial-3.2.11.swf',
        controls: document.location.protocol + '//' + document.location.hostname + '/content/common/include/flowplayer/flowplayer.controls-3.2.11.swf',
        key:      '#$6a8e0125b5792e49020',
        size:     { width: 550, height: 309 }
      }
    },
    $player: undefined,
    $overlay: undefined,
    create: function (options) {
      var $close;
      options = $.extend({}, video.options, options);

      if (video.$player === undefined) {
        // Build the flash player
        video.$player  = $('<a></a>');
        if (options.player.id) { video.$player.attr('id', options.player.id); }
        if (options.player.size !== undefined) { video.$player.css(options.player.size); }
        video.$player.flowplayer(options.player.swf, { key: options.player.key, plugins: { controls: { url: options.player.controls } } });
      }

      if (video.$overlay === undefined) {
        // Build the overlay container
        video.$overlay = $('<div></div>');
        // Build the close button
        $close = $('<a class="sprite-close-black-medium"></a>').click(video.close);
        // Set an ID if available
        if (options.player.id) { video.$overlay.attr('id', options.player.id + '-overlay'); }
        if (options.overlay.size !== undefined) { video.$overlay.css(options.overlay.size); }
        // Bring it all together
        video.$overlay
          .append($('<div></div>').addClass('titlebar').append($close))
          .append(video.$player)
          .appendTo('body');
      }

      return video.$player;
    },
    open: function (options) {
      options = $.extend({}, video.options, options);

      // Create the player if needed
      if (video.$player === undefined || video.$overlay === undefined) { video.create(options); }

      // No reason to continue without a URL to load
      if (options.URL) {
        // prepare the overlay for this video
        video.$overlay.overlay({
          onLoad:  function () { $f(options.player.id).play(options.URL); },
          onClose: function () { $f(options.player.id).stop().unload(); video.$overlay.remove(); video.$overlay = undefined; },
          mask: options.overlay
        });
        // Load the overlay
        video.$overlay.overlay().load();
      }
    },
    close: function () {
      video.$overlay.overlay().close();
    }
  };

  return func;
}(jQuery));


/*********************************************************************************************************************/
/* Slideshow                                                                                                         */
/*********************************************************************************************************************/

// Make the slide shows controllable
var slideshow = (function () {
  "use strict";
  var ls;
  ls = window.localStorage;
  return {
    getState: function () {
      var state;
      try { state = ls.getItem('slideshow'); } catch (e) {}
      return (state === undefined || state === null || state === 'On') ? true : false;
    },
    setState: function (state) { try { ls.setItem('slideshow', state ? 'On' : 'Off'); } catch (e) {} }
  };
}());


/*********************************************************************************************************************/
/* Dynamic JavaScript                                                                                                */
/*********************************************************************************************************************/

(function () {
  "use strict";
  try {
    var value;
    $.Artare.QueryString.initialize();
    value = $.Artare.QueryString.get('dynjs');
    if (value !== undefined) {
      $.ajax({
        dataType: 'script',
        url:      eSiteIncludeDir + '/dynjs/' + value + '.js',
        error:    function (XMLHttpRequest, textStatus, errorThrown) { $.error('Dynamic JavaScript: ' + value + ' - ' + textStatus); }
      });
    }
  } catch (e) { $.error(e.message); }
}());


/*********************************************************************************************************************/
/* Bread Crumb Trail                                                                                                 */
/*********************************************************************************************************************/

// Mark the last bread crumb as last
$(function () { "use strict"; $('#breadcrumb .crumb:last').addClass('last'); });


/*********************************************************************************************************************/
/* Footer                                                                                                            */
/*********************************************************************************************************************/

$(function () {
  try {
    $('#footer form .button')
      .each(function (index, element) {
        var form, field, validators;
        element = $(element);
        form = element.parents('form');
        field = form.find('input:not(:hidden)')
        
        validators = [
          /* simple not empty check */
          function (value) { return value !== undefined && value.length !== 0; }
        ];
        
        if (field.attr('type') === 'email') {
          validators.push(function () {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return function (value) { return regex.test(value); }
          }());
        }
        
        function submitIfValid() {
          var i, il, value;
          value = field.val();
          for(i=0, il=validators.length; i<il; i++) {
            if (!validators[i](value)) { return false; }
          }
          form.submit();
        }
        
        if (form.length !== 0) {
          field.on('keypress', function (e) { if (e.keyCode === 13) { submitIfValid(); e.preventDefault(); } });
          element.on('click', submitIfValid).css('cursor', 'pointer');
        }
      });
  } catch (e) { $.error(e.message); }
});


/*********************************************************************************************************************/
/* VeriSign Seal                                                                                                     */
/*********************************************************************************************************************/

function vrsn_splash(anchor) {
  "use strict";
  var win;
  win = window.open(
    anchor.href,
    "VRSN_Splash",
    "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500"
  );
  if (win) { win.focus(); }
  return false;
}


/*********************************************************************************************************************/
/* Home Page Feature                                                                                                 */
/*********************************************************************************************************************/

// Home page feature slide show
function initHomeFeature() {
  "use strict";
  var $container, $cycle, $preload, $pager, images, paused, loaded, target;

  if (!slideshow.getState()) { return; }

  $container = $('#content .homeFeature');
  $cycle     = $container.find('.slides:first');
  $pager     = $container.find('.pager:first');
  $preload   = $container.find('.preload:first');
  images     = [];
  paused     = false;

  function initCycle() {
    var $pause;

    function pause() { $cycle.cycle('pause'); $pause.attr('class', 'play'); paused = true; }
    function resume() { $cycle.cycle('resume'); $pause.attr('class', 'pause'); paused = false; }

    $cycle.cycle({
      delay:                 -2500,
      timeout:               8000,
      speed:                 1500,
      slideResize:           0,
      pager:                 '#content .homeFeature .pager:first',
      allowPagerClickBubble: true,
      pagerAnchorBuilder:    function (index, element) { return '<a href="#" class="indicator"></a>'; },
      updateActivePagerLink: function (pager, index) { $pager.find('.indicator').removeClass('on').eq(index).addClass('on'); }
    });

    if ($pager.is(':empty')) {
      $pager.hide();
    } else {
      $pager.find('a').click(pause);
      $pause = $('<a class="pause"></a>')
        .css('cursor', 'pointer')
        .appendTo($pager)
        .on('click', function () { if (paused) { resume(); } else { pause(); } });
      $pager.show();
    }
    
    $pager.css('left', (($cycle.outerWidth() - $pager.outerWidth())/2) + 'px');
  }

  $(function () {
    function preload() {
      var $container, $image;
      $container = $preload.children().first();
      if ($container.is('img')) {
        $image = $container;
      } else {
        $image = $container.find('img');
      }
      if ($container.length !== 0 && $image.length !== 0) {
        $image
          .bind('load', function () {
            $container.hide();
            $cycle.append($container);
            images.push(this);
            preload();
          })
          .bind('error', function () {
            $container.remove();
            preload();
          })
          .attr('src', $image.attr('psrc'))
          .removeAttr('psrc');
      } else {
        initCycle();
      }
    }
    preload();
  });
}


/*********************************************************************************************************************/
/* Media Class (Product/Category)                                                                                    */
/*********************************************************************************************************************/

var media = (function ($) {
  "use strict";
  var object;

  object = {
    options: {
      alt: {
        enable:       true,
        type:         'image',
        zoomer:       'zoomer',
        className:    { image: 'cloud-zoom-gallery', video: 'video' },
        margin:       '5px',
        preload:      true,
        target:       '#content #productImage',
        textTemplate: '<div class="group"><div class="image" /><div class="content" /></div>',
        textTarget:   '.content',
        textImage:    '.image'
      },
      scroller: {
        target:     '#content #productMediaAndUpSells .productAlts',
        template:   '<a class="prev browse left" /><div class="scrollable"><div class="items"><div /></div></div><a class="next browse right" />',
        items:      '> .scrollable > .items',
        containers: '> div',
        threshold:  5,
        passThru:   { disabledClass: 'disabled' },
        hide:       '#content #productMediaAndUpSells .altText'
      },
      zoomer: {
        id:        'zoomer',
        className: 'cloud-zoom',
        cloud:     '"zoomHeight":420,"zoomWidth":425,"adjustX":45,"adjustY":-10,"smoothMove":3',
        target:    '#content #productImage',
        show:      '.zoomText',
        hide:      '.image'
      },
      quickview: {
        parent:    '#quickViewPopUp',
        target:    '#productImage',
        id:        'zoomer',
        className: 'cloud-zoom',
        cloud:     '"zoomHeight":300,"zoomWidth":300,"adjustX":20,"adjustY":0,"smoothMove":3',
        show:      '.zoomText',
        hide:      '.image'
      }
    },
    quickview: function (options) {
      var $img, $parent, $target;
      options = $.extend({}, media.options.quickview, options);

      if (navigator.userAgent.toLowerCase().indexOf('ipad') !== -1) { return; }

      if (options.parent !== undefined && options.target !== undefined) {
        if (options.id) {
          options.regular = Scene7.createURL({ id: options.id, type: 'image', kind: 'regular', modifiers: options.modifiers});
          options.large = Scene7.createURL({ id: options.id, type: 'image', kind: 'large' });
        }

        $parent = $(options.parent);
        $target = $parent.find(options.target);

        if ($target.length !== 0) {
          // Build the link with the zoomer options
          media.quickview.$zoomer = $('<a></a>');
          if (options.id) { media.quickview.$zoomer.attr('id',    options.id); }
          if (options.className) { media.quickview.$zoomer.attr('class', options.className); }
          if (options.large) { media.quickview.$zoomer.attr('href',  options.large); }
          if (options.cloud) { media.quickview.$zoomer.attr('rel',   options.cloud); }
          media.quickview.$zoomer.click(function () { return false; });

          // Build the regular image
          $img = $('<img src="/content/common/images/spacer.gif" />');
          if (options.regular) { $img.attr('src', options.regular); }
          media.quickview.$zoomer.append($img);
        }

        $parent.find(options.hide).hide();
        $target.prepend(media.quickview.$zoomer);
        $parent.find(options.show).show();

        // Activate the zoomer
        $parent.find('.' + options.className).CloudZoom();
      }

      return media.quickview.$zoomer;
    },
    zoomer: {
      activate: function (options) {
        options = $.extend({}, media.options.zoomer, options);

        if (media.$zoomer !== undefined) {
          // Hide the placeholder and prepend the zoomer
          $(options.target)
            .find(options.hide).hide().end()
            .prepend(media.$zoomer)
            .find(options.show).show().end();

          // Activate the zoomer
          $('.cloud-zoom,.cloud-zoom-gallery').CloudZoom();
        }
      },
      create: function (options) {
        var  $img;

        if (media.$zoomer === undefined) {
          options = $.extend({}, media.options.zoomer, options);

          if ($(options.target).length !== 0) {
            // Build the link with the zoomer options
            media.$zoomer = $('<a></a>');
            if (options.id) { media.$zoomer.attr('id', options.id); }
            if (options.className) { media.$zoomer.attr('class', options.className); }
            if (options.large) { media.$zoomer.attr('href', options.large); }
            if (options.cloud) { media.$zoomer.attr('rel', options.cloud); }
            media.$zoomer.click(function () { return false; });

            // Build the regular image
            $img = $('<img src="/content/common/images/spacer.gif" />');
            if (options.regular) { $img.attr('src', options.regular); }
            media.$zoomer.append($img);
          }
        }

        return media.$zoomer;
      }
    },
    scroller: {
      create: function (options) {
        options = $.extend({}, media.options.scroller, options);

        if (media.$scroller === undefined && $(options.target).length !== 0) {
          media.$scroller = $(options.target).append(options.template);
        }

        return media.$scroller;
      },
      activate: function (options) {
        var api, height, $scrollable, $items;
        options = $.extend({}, media.options.scroller, options);

        // initialize the scrollable and find the elements we'll be using
        $scrollable = media.scroller.create();
        if ($scrollable !== undefined) {
          $scrollable.scrollable(options.passThru);
          api = media.$scroller.data("scrollable");
          $items = media.$scroller.find(options.items);
          $scrollable = $items.parent();

          // Only show the scroller navigational elements when needed and
          // disable the previous otherwise since we aren't using circular
          if ($items.find(options.containers).length > 1) {
            api.getNaviButtons().filter('.prev').addClass('disabled');
          } else {
            api.getNaviButtons().css('visibility', 'hidden');

          }

          // Hide the scroller if there are not multiple alts
          if ($items.find(options.containers).children().length < 2) {
            media.$scroller.hide();
            $(options.hide).hide();
          }

          // Adjust the height of the scroller to match the items
          height = $items.height();
          if (height > $scrollable.height()) { $scrollable.height(height); }
        }
      },
      getNextOpening: function (options) {
        var $result, $items, $last;
        options = $.extend({}, media.options.scroller, options);

        $items = $(options.target).find(options.items);
        $last = $items.find(options.containers + ":last");

        if ($last.children().length < options.threshold) {
          // If under the threshold, use the last container
          $result = $last;
        } else {

          // Create a new container
          $result = $('<div />');
          $items.append($result);
        }

        return $result;
      }
    },
    alt: {
      loaded: [],
      exists: function (options) {
        var found;

        // check for an already existing alt
        found = false;
        $.each(media.alt.loaded, function (index, value) {
          if ((value.thumb === options.thumb || value.regular === options.regular || value.large === options.large) &&
              value.text === options.text) {
            found = true;
            return false;
          }
        });

        return found;
      },
      add: function () {
        var $alt, $text, options;
        options = $.extend({}, media.options.alt, arguments[arguments.length - 1]);

        // If we have the ID, we can build any missing URLs
        if (options.id) {
          if (options.thumb   === undefined) { options.thumb   = Scene7.createURL({ id: options.id, type: 'image', kind: 'thumbnail' }); }
          if (options.regular === undefined) { options.regular = Scene7.createURL({ id: options.id, type: 'image', kind: 'regular', modifiers: options.modifiers}); }
          if (options.large   === undefined) { options.large   = Scene7.createURL({ id: options.id, type: 'image', kind: 'large' }); }
        }

        // No reason to add a duplicate alt
        if (media.alt.exists(options)) { return; }

        // Build the anchor
        $alt = $('<a></a>');
        if (options.className) { $alt.attr('class', options.className[options.type]); }
        if (options.thumb) {
          $alt.append($('<img src="/content/common/images/spacer.gif" />').attr('src', options.thumb));
        } else if (options.type) {
          $alt.append(options.type);
        }
        if (options.margin && options.index !== 0) { $alt.css('margin-left', options.margin); }

        if (options.type) {
          // Customize by type
          switch (options.type) {
          case 'image':
            if (options.regular) { $alt.attr('rel', "\"useZoom\":\"" + options.zoomer + "\",\"smallImage\":\"" + options.regular + "\""); }
            if (options.large) { $alt.attr('href', options.large); }
            if (options.text) {
              if (options.margin && options.index !== 0) { $alt.css('margin-left', ''); }
              $text = $('<span>' + options.text + '</span>');
              if (options.URL) { $text.wrap('<a href="' + options.URL + '"></a>'); }
              $alt = $(options.textTemplate)
                .find(options.textTarget).append($text).end()
                .find(options.textImage).append($alt).end();
              if (options.margin && options.index !== 0) { $alt.css('margin-left', options.margin); }
            }
            if (options.preload) { $.preload([options.regular, options.large]); }
            break;

          case 'video':
            if (options.regular) { $alt.attr('href', options.regular); }
            // Setup the click handler to show the video
            $alt.click(function () {
              video.open({ URL: { url: options.regular, scaling: 'fit' } });
              try { cmCreateElementTag('Play', 'Video: ' + options.regular.replace(/.*\/([^?#]*)(\?[^#]*)?(\#.*)?/i, '$1')); } catch (e) {}
              return false;
            });
            break;
          }
        }

        // Add the alt to the scroller
        media.scroller.getNextOpening().append($alt);
        // Add a reference to the total list of alts
        media.alt.loaded.push({ thumb: options.thumb, regular: options.regular, large: options.large, text: options.text });

        return $alt;
      },
      process: function (frames) {
        // Process any frames returned from Scene7
        if (frames !== undefined && frames.length > 0) { $.each(frames, media.alt.add); }
      }
    },
    queue: [],
    activate: function () {
      // Activate the scroller
      media.scroller.activate();
      // Activate the zoomer
      media.zoomer.activate();
    },
    init: function (options) {
      var element;
      if (navigator.userAgent.toLowerCase().indexOf('ipad') !== -1) { return; }

      // Combine all the defaults with any options passed in
      options = $.extend({}, media.options, options);

      // Fill in any missing images if possible
      if (options.zoomer.thumb   === undefined) { options.zoomer.thumb   = Scene7.createURL({ id: options.id, type: 'image', kind: 'thumbnail' }); }
      if (options.zoomer.regular === undefined) { options.zoomer.regular = Scene7.createURL({ id: options.id, type: 'image', kind: 'regular', modifiers: options.modifiers}); }
      if (options.zoomer.large   === undefined) { options.zoomer.large   = Scene7.createURL({ id: options.id, type: 'image', kind: 'large' }); }

      // Create the zoomer
      media.zoomer.create(options.zoomer);

      // Create the scroller
      media.scroller.create(options.scroller);

      if (media.queue.length !== 0) {
        // Process any queued alts
        while (media.queue.length !== 0) {
          // Get the next element
          element = media.queue.shift();
          // Add the item modifier to all of the queued alts
          element.modifiers = options.modifiers;
          // Add the element to the alts
          media.alt.add(element);
        }
        media.activate();
      } else if (!options.alt.enable) {
        media.activate();
      } else {
        // Create a default alt
        media.alt.add({ id: options.id, modifiers: options.modifiers, preload: false });
        // Check Scene7 for alts
        Scene7.getSet(options.id + 'is', { callback: function (frames) { media.alt.process(frames); media.activate(); } });
      }
    }
  };

  return object;
}(jQuery));


/*********************************************************************************************************************/
/* Checkout Breadcrumb                                                                                               */
/*********************************************************************************************************************/

$(function () {
  "use strict";
  var $breadcrumb, $image, $map;
  $breadcrumb     = $('#progress');
  $image          = $breadcrumb.find('> img[usemap]');
  $map            = $($image.attr('usemap'));

  if ($image.length === 1 && $map.length === 1) {
    $map.find('area').each(function (index, element) {
      index++;
      $(this)
        .css('cursor', 'pointer')
        .hover(function () { $breadcrumb.addClass('rollover-' + index); }, function () { $breadcrumb.removeClass('rollover-' + index); });
    });
  }
});


/*********************************************************************************************************************/
/* First Time Customer                                                                                               */
/*********************************************************************************************************************/

function parseQString(URL) {
  "use strict";
  var query = URL.substring(URL.indexOf("?") + 1, URL.length);
  return dojo.queryToObject(query);
}

function countProperties(obj) {
  "use strict";
  var i, count = 0;
  for (i in obj) { count++; }
  return count;
}

function isValidReferral(ref) {
  "use strict";
  var isValid, refUrls;
  isValid = false;
  refUrls = ["google.com", "yahoo.com", "bing.com"];

  if (ref === "") { // Direct load?
    console.debug("isValidReferral - Direct Load referring URL: " + ref);
    isValid = true;
  } else { // Natural Search?
    dojo.forEach(refUrls, function (refUrl, idx) {
      if (ref.indexOf(refUrl) !== -1) {
        console.debug("isValidReferral - Natural Search referring URL: " + ref);
        isValid = true;
      }
    });
  }

  return isValid;
}

function isValidLocation(loc) {
  "use strict";
  var isValid, refParamFound, mmcParamFound, queryStringObj, urlParamsCount, param;
  isValid = false;
  refParamFound = false;
  mmcParamFound = false;
  queryStringObj = parseQString(loc);
  urlParamsCount = countProperties(queryStringObj);

  if (urlParamsCount > 0) {
    for (param in queryStringObj) {
      switch (param) {
      case "ref":
        refParamFound = true;
        break;
      case "cm_mmc":
        mmcParamFound = true;
        break;
      }
    }
  }

  if (refParamFound === false && mmcParamFound === false) {
    console.debug("isValidLocation - Location contains no ref or cm_mmc URL params: " + loc);
    isValid = true;
  }

  return isValid;
}

function isRememberMe() {
  "use strict";
  var result, loggedInGreeting;
  result = false;
  loggedInGreeting = dojo.query(".greeting");

  if (loggedInGreeting.length > 0) {
    console.debug("isRememberMe - TRUE");
    result = true;
  } else {
    console.debug("isRememberMe - FALSE");
  }

  return result;
}
