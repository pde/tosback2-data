/**
 * Load rail ad if exists
 */
Drupal.behaviors.pub_rail_ad = {
  attach: function(context) {
    Drupal.pub_ads.loadRailAd();
  }
};

})(jQuery);

Drupal.pub_rail_ad.loadRailAd = function() {
  if ((typeof(railAdBg)!='undefined') && (railAdBg)) {
      // site specific custom background code. 
      $('body').css({'background-image':'url('+railAdBg+')'})    } 
  if ((typeof(railAdBgColor)!='undefined') && (railAdBgColor)) {
      // site specific custom background color code. 
      $('body').css({'background-color':railAdBgColor});
  }
  if ((typeof(railAdBgRepeat)!='undefined') && (railAdBgRepeat)) {
      // site specific custom background repeat code. 
      $('body').css({'background-repeat':railAdBgRepeat});
  } 
  if ((typeof(railAdBgClickthru) != 'undefined') && (railAdBgClickthru)) {
    $('body').addClass('railad')
    $('body').click(function (e) {
      evt = e || window.event;
      if (e.target)
        targ = e.target;
      else if (e.srcElement)
        targ = e.srcElement;
        // Safari bug
        if (targ.nodeType == 3)
          targ = targ.parentNode;
        if ($(targ).get(0).tagName == 'BODY' || $(targ).get(0).tagName == 'HTML') {
          window.open(railAdBgClickthru);
        }
    });
  }
}