jQuery(document).ready(function($) {

  function show_rand_items() {
    $("#chart-browsing-ajax .module.module_chart_summary.module_chart_archived").hide()
      .rand(4).show().addClass("item_visible")
      .eq(0).css('marginLeft', '0');
  }
  show_rand_items();

  $('.form-item.form-type-radio.form-item-month').bind('click', function () {
    var year_selected = $('.chart_archives_container .form-item-year .current_year').html();
    var month_selected = $('.form-radio', this).val();
    $('#chart-browsing-ajax').html('Loading...');
    $.ajax({
      url: '/billboard-chart-browsing/' + year_selected + '/' + month_selected,
      success: function(data) {
        $('#chart-browsing-ajax').html(data);
        show_rand_items();
      }
    });
    return false;
  });

  $('#chart-browsing-ajax .paginator li a').live('click', function () {
    var url = $(this).attr('href');
    var url_parts = url.split('/');
    var month = url_parts[url_parts.length-1];
    var year = url_parts[url_parts.length-2];
    var url = $(this).attr('href');
    $('#chart-browsing-ajax').html('Loading...');
    $.ajax({
      url: url,
      success: function(data) {
        $('.chart_archives_container .form-item-year .current_year').html(year);
        $('#chart-browsing-ajax').html(data);
        var month_id = '.form-item.form-type-radio.form-item-month #edit-month-' + month;
        $('.form-item.form-type-radio.form-item-month').find('.option').removeClass('current');
        $(month_id).parent().find('.option').addClass('current');
        show_rand_items();
      }
    });
    return false;
  });

  $('.chart_archives_container .form-item-year').bind('click', function () {
    return false;
  });

  $('.chart_archives_container .form-item-year #edit-year').live('change', function () {
    var year_selected = $('.chart_archives_container .form-item-year .current_year').html();
    $('.form-item.form-type-radio.form-item-month').find('.option').removeClass('current');
    var month_id = '.form-item.form-type-radio.form-item-month #edit-month-1';
    $(month_id).parent().find('.option').addClass('current');
    $('#chart-browsing-ajax').html('Loading...');
    $.ajax({
      url: '/billboard-chart-browsing/' + year_selected + '/1',
      success: function(data) {
        $('#chart-browsing-ajax').html(data);
        show_rand_items();
      }
    });
    return false;
  });


});


/**
 * jQuery.rand v1.0
 * Randomly filters any number of elements from a jQuery set.
 * MIT License: @link http://www.afekenholm.se/license.txt
 * @author: Alexander Wallin (http://www.afekenholm.se)
 * @version: 1.0
 * @url: http://www.afekenholm.se/jquery-rand
 * http://www.afekenholm.se/wordpress/wp-content/themes/afekenholm/js/jQuery.rand/jquery.rand.js
 * http://www.afekenholm.se/wordpress/wp-content/themes/afekenholm/js/jQuery.rand/jquery.rand.min.js
 */

(function($){
  $.fn.rand = function(k){
    var b = this,
      n = b.size(),
      k = k ? parseInt(k) : 1;

    // Special cases
    if (k > n) return b.pushStack(b);
    else if (k == 1) return b.filter(":eq(" + Math.floor(Math.random()*n) + ")");

    // Create a randomized copy of the set of elements,
    // using Fisher-Yates sorting
    r = b.get();
    for (var i = 0; i < n - 1; i++) {
      var swap = Math.floor(Math.random() * (n - i)) + i;
      r[swap] = r.splice(i, 1, r[swap])[0];
    }
    r = r.slice(0, k);

    // Finally, filter jQuery stack
    return b.filter(function(i){
      return $.inArray(b.get(i), r) > -1;
    });
  };
})(jQuery);
;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
// $Id$
/*
 * Drupal Most Popular - Showcase the most popular content across your Drupal website and engage your audience.
 * Copyright © 2009-2012 New Signature
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * You can contact New Signature by electronic mail at labs@newsignature.com -or- by U.S. Postal Service at 1100 H St. NW, Suite 940, Washington, DC 20005.
 */
/**
 * @file 
 * Overwrites jQuery's fade functions to better support IE.
 * Borrowed from http://www.malsup.com/jquery/fadetest.html
 */
(function ($) {
	
    $.fn.fadeIn = function (speed, callback) {
        return this.animate({opacity: 'show'}, speed, function () { 
            if ($.browser.msie) {
                this.style.removeAttribute('filter');
            }
            if ($.isFunction(callback)) { 
                callback();
            }
        }); 
    }; 
 
    $.fn.fadeOut = function (speed, callback) { 
        return this.animate({opacity: 'hide'}, speed, function () { 
            if ($.browser.msie) {
                this.style.removeAttribute('filter');
            }
            if ($.isFunction(callback)) { 
                callback();  
            }
        }); 
    };
     
    $.fn.fadeTo = function (speed, to, callback) { 
        return this.animate({opacity: to}, speed, function () { 
            if (to == 1 && $.browser.msie) {
                this.style.removeAttribute('filter');
            }
            if ($.isFunction(callback)) {
                callback();
            }
        });
    };
    
})(jQuery);;
// $Id$
/*
 * Drupal Most Popular - Showcase the most popular content across your Drupal website and engage your audience.
 * Copyright © 2009-2012 New Signature
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * You can contact New Signature by electronic mail at labs@newsignature.com -or- by U.S. Postal Service at 1100 H St. NW, Suite 940, Washington, DC 20005.
 */
/**
 * @file Adds javascript actions to the most popular block.
 */
(function($) {
  Drupal.behaviors.mostpopular = {
    attach: function(context) {

      // Get the configuration options
      var options = $.extend(Drupal.behaviors.mostpopular.defaultOptions,
          Drupal.settings.mostpopular);
  
      // Attach to all the most popular blocks on the page
      var parents = $(options.blockSelector, context);
      parents.each(function() {
        var block = $(this);
        
        var serviceTabs = block.find(options.servicesSelector).filter('[data-sid]');
        var intervalTabs = block.find(options.intervalsSelector).filter('[data-iid]');
  
        // Keep track of the page we're currently looking at
        var selected = { 'sid' : null, 'iid' : null };
        
        // Get our current page from the cookies
        var bid = block.attr('data-bid');
        var cookie = $.cookie('mostpopular-' + bid);
        if (cookie) {
          var parts = cookie.split('/');
          selected.sid = parts[0];
          selected.iid = parts[1];
        }
  
        // Create a content container
        var content = block.find(options.contentSelector);
        var wrapper = content.wrap("<div />").parent()
        .css({
          position : 'relative'
        });
  
        // Create a throbber image
        if (options.showThrobber) {
          var throbber = $(Drupal.theme('MostPopularThrobber'))
          .css({
            position : 'absolute',
            zIndex : 100
          }).appendTo(wrapper).hide();
  
          // Redefine the show function for the throbber to center it
          throbber.centerAndShow = function() {
            var top = parseInt((wrapper.outerHeight({margin: true}) - throbber.height()) / 2);
            var left = parseInt((wrapper.outerWidth({margin: true}) - throbber.width()) / 2);
            throbber.css({
              top : top,
              left : left
            }).show();
          };
        }
  
        // -----------------------------------------------------
        // Bind all the links to services
        serviceTabs.each(function() {
          var tab = $(this).data('service', true);
          var sid = tab.attr('data-sid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.sid = sid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            return link.click();
          });
          
          // If this service is currently selected, load the content
          if (!selected.sid) {
            selected.sid = sid;
          }
          if (selected.sid == sid) {
            tab.addClass(options.selectedClass);
          }
        });
  
        // -----------------------------------------------------
        // Bind all the links to intervals
        intervalTabs.each(function() {
          var tab = $(this).data('interval', true);
          var iid = tab.attr('data-iid');
          
          var link = $('<a href="#"/>')
            .text(tab.text())
            .click(function() {
              selected.iid = iid;
              
              getSelected(tab);
              return false;
            });
          tab.html(link);
          tab.click(function() {
            link.click();
          });
          
          // If this interval is currently selected, load the content
          if (!selected.iid) {
            selected.iid = iid;
          }
          //if (selected.iid == iid) {
          //  tab.click();
          //}
        });
        
        function getSelected(tab) {
          if (selected.sid && selected.iid) {
            startReload();
            
            var path = selected.sid + '/' + selected.iid;
            
            // Save the cookie
            $.cookie('mostpopular-' + bid, path, { path: '/' });
            
            // Fetch the content via AJAX
            var url = options.url + '/' + bid + '/' + path;
            $.get(url, function(data) {
              onGet(tab, data);
            });
          }
        }
        
        /**
         * This function is called when there is new data from the AJAX call.
         * 
         * @param link
         *   The link object that clicked.
         * @param data
         *   The new HTML sent back from Drupal.
         */
        function onGet(tab, data) {
          finishReload(data);
  
          // Select the appropriate tabs
          if (tab.data('service')) {
            serviceTabs.removeClass(options.selectedClass);
          }
          else if (tab.data('interval')) {
            intervalTabs.removeClass(options.selectedClass);
          }
          tab.addClass(options.selectedClass);
          return false;
        }
  
        /**
         * Starts the process of reloading the most popular items, by hiding
         * the existing content and showing the throbber, if necessary.
         * 
         * The hideContent() method defined in the options will be called.
         */
        function startReload() {
          // Show the throbber and dim the content
          if (throbber) {
            throbber.centerAndShow();
          }
          options.hideContent(content);
        }
  
        /**
         * Finishes the process of reloading the most popular items, by showing
         * the new content and hiding the throbber, if necessary.
         * 
         * The showContent() method defined in the options will be called.
         * 
         * @param response
         *   A JSON response from Drupal.  It contains one key, 'data', whose
         *   value is an HTML string to render.
         */
        function finishReload(response) {
          // Replace the content, fade it back in and hide the throbber
          options.showContent(content, response);
          if (throbber) {
            throbber.hide();
          }
        }
      });
    },
  
    /**
     * Defines the default options. Override these options in
     * Drupal.settings.mostpopular.
     */
    defaultOptions: {  
      'hideContent' : function(content) {
        content.fadeTo(200, 0.5);
      },
      'showContent' : function(content, html) {
        content.html(html).fadeTo(200, 1.0);
      },
      'showThrobber' : true,
      'blockSelector' : '.mostpopular-block',
      'servicesSelector' : 'ul.mostpopular--services li',
      'intervalsSelector' : 'ul.mostpopular--intervals li',
      'contentSelector' : 'div.mostpopular--content',
      'selectedClass' : 'selected',
      'url' : '/mostpopular/ajax'
    }
  };

  /**
   * Provides a default theme for the throbber that appears when content is
   * reloading.   You can override this in your own theme.
   * 
   * @return An HTML string to render the throbber.
   */
  Drupal.theme.prototype.MostPopularThrobber = function() {
    return '<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>';
  };
  
})(jQuery);;
(function ($) {

$(document).ready(function() {

  // Expression to check for absolute internal links.
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (ga.trackDomainMode == 2 && isCrossDomain($(this).attr('hostname'), ga.trackCrossDomains)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            event.preventDefault();
            _gaq.push(["_link", this.href]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function() {
    var href = $.colorbox.element().attr("href");
    if (href) {
      _gaq.push(["_trackPageview", href.replace(isInternal, '')]);
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
function isCrossDomain(hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
}

})(jQuery);
;
