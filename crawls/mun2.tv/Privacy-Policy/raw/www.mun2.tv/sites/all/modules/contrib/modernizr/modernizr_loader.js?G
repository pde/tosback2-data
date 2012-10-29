// $Id: modernizr_loader.js,v 1.1 2010/08/16 12:40:08 yorirou Exp $

(function($) {
  $(function() {
    // adding the no-js class to html
    // in order to make modernizr triggered
    $('html')
      .addClass('modernizr')
      .addClass('no-js');
    // loading modernizr
    $('head').append(
      $('<script></script>')
        .attr('type', 'text/javascript')
        .attr('src', Drupal.settings.basePath + Drupal.settings.modernizrPath)
    );
  });
})(jQuery);