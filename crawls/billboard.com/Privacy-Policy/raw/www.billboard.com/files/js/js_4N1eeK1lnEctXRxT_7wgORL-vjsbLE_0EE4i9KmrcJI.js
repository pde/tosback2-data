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
