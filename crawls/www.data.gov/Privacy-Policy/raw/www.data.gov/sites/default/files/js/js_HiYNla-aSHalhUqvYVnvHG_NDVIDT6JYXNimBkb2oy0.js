(function ($) {

Drupal.behaviors.fusionHasJS = {
  attach: function (context, settings) {
    $('html').removeClass('no-js');
  }
};

Drupal.behaviors.fusionEqualheights = {
  attach: function (context, settings) {
    if (jQuery().equalHeights) {
      $("#header-top-wrapper div.equal-heights div.content").equalHeights();
      $("#header-group-wrapper div.equal-heights div.content").equalHeights();
      $("#preface-top-wrapper div.equal-heights div.content").equalHeights();
      $("#preface-bottom div.equal-heights div.content").equalHeights();
      $("#sidebar-first div.equal-heights div.content").equalHeights();
      $("#content-region div.equal-heights div.content").equalHeights();
      $("#node-top div.equal-heights div.content").equalHeights();
      $("#node-bottom div.equal-heights div.content").equalHeights();
      $("#sidebar-second div.equal-heights div.content").equalHeights();
      $("#postscript-top div.equal-heights div.content").equalHeights();
      $("#postscript-bottom-wrapper div.equal-heights div.content").equalHeights();
      $("#footer-wrapper div.equal-heights div.content").equalHeights();
    }
  }
};

Drupal.behaviors.fusionIE6fixes = {
  attach: function (context, settings) {
    // IE6 & less-specific functions
    // Add hover class to main menu li elements on hover
    if ($.browser.msie && ($.browser.version < 7)) {
      $('form input.form-submit').hover(function() {
        $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
      });
      $('#search input#search_header').hover(function() {
        $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
      });
    };
  }
};

Drupal.behaviors.fusionOverlabel = {
  attach: function (context, settings) {
    if (jQuery().overlabel) {
      $("div.fusion-horiz-login label").overlabel();
    }
  }
};

})(jQuery);;
var tID;
var tDelay;
var tURL;

function autoLoadSite() {
    if (--tDelay == 0) {
        jQuery("span#extlink-counter").html("0");
        clearInterval(tID);
        window.location = tURL;
    } else {
        jQuery("span#extlink-counter").html(tDelay);                 
    }
}

jQuery(document).ready(function(){
    jQuery("a.ext").click(function(){
        var targetURL = (this.href.length > 50) ? this.href.substring(0, 40) + "..." : this.href;
        tURL = this.href;
        tDelay = 7;

        jQuery.colorbox({
            html: "<div id=\"extlink-popup\">" + 
                "<h2 class=\"align-center extlink-title\">You are existing Data.gov</h2>" + 
                "<div class=\"align-center extlink-content\">" +
                "<p>You will be taken to the following site in <span id=\"extlink-counter\">" + 
                tDelay + "</span> second(s).</p>" +
                "<p><a href=\"" + tURL + "\">" + targetURL + "</a></p></div></div>",
            onCleanup: function(){clearInterval(tID)},
            opacity: "0.35",
            width: "400",
            height: "150",
            scrolling: false,
        });
        tID = setInterval("autoLoadSite()", 1000);
        return false;
    });
});
;
