/*jslint browser: true, indent: 2 */
/*global $: false, dojo: false, popup: false, button: false, setEqualHeight: false */

/*********************************************************************************************************************/
/* Popups                                                                                                            */
/*********************************************************************************************************************/

dojo.addOnLoad(function () {
  "use strict";
  popup.loadPopups([
    { id: 'CUTOFFS',             title: 'Holiday Shipping Cut-Off Dates'                                   },
    { id: 'CYOFRUIT',            title: 'Discounts'                                                        },
    { id: 'ENOUNCE',             title: 'Gift E-Nouncement&reg; Service'                                   },
    { id: 'festive-wine-covers', title: 'Festive Wine Covers', name: 'FestiveWineCovers'                   },
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                     },
    { id: 'FOMCLIST',            title: 'Fruit of the Month Club&reg; Collection'                          },
    { id: 'FOREIGN',             title: 'Foreign Countries We Ship To'                                     },
    { id: 'FOODWINE',            title: 'Terms &amp; Conditions'                                           },
    { id: 'GC-Terms',            title: 'Gift Card Terms &amp; Conditions', name: 'GC_Terms'               },
    { id: 'GUAR',                title: 'Our Guarantee'                                                    },
    { id: 'SHIPTO',              title: 'Countries we ship to:'                                            },
    { id: 'WINESHIP',            title: 'Wine Shipping Details'                                            },
    { id: 'ALLMOMS',        type: 'coupon' },
    { id: 'FLOWERS',        type: 'coupon' },
    { id: 'FREEFSD',        type: 'coupon' },
    { id: 'GIFT4U',         type: 'coupon' },
    { id: 'MOMSGIFT',       type: 'coupon' },
    { id: 'PINTEREST',      type: 'coupon' },
    { id: 'EMAIL', title: 'Email Sign-up', callback: function () {
      var $email, starting;
      $email   = $('#dialog-EMAIL input:text');
      starting = 'Enter Your Email';

      button.enhanceAll();
      $email
        .bind('focus', function () { if ($email.val() === starting) { $email.val(''); } $email.select(); })
        .bind('blur',  function () { if ($email.val() === '') { $email.val(starting); } });
    } }
  ]);
});

/*********************************************************************************************************************/
/* Home Page                                                                                                         */
/*********************************************************************************************************************/

$(function () {
  "use strict";

  var homeFeature, body, clear, nav, homeCat, top, bottom;

  homeFeature = $('#content .homeFeature');
  if (homeFeature.length !== 0) {
    homeCat = $('#content .homeCat');
    nav     = $('#content .homeFeature .nav');

    body    = $('body');
    if ((body.hasClass('ie_7') || body.hasClass('ie_8'))) {
      // Remove all the comments that annoy IE
      clear   = homeCat.add(nav);
      clear.contents().filter(function (index, element) { return element.nodeType === 8; }).remove();
      clear.children().not('.caption').hide().show();

      // Add a first and last for the nav
      nav.children(':first').addClass('first');
      nav.children(':last').addClass('last');
    }

    // name the navigation caps
    nav.children('a:first').addClass('first');
    nav.children('a:last').addClass('last');

    // name the home category spots
    homeCat.children('a').each(function (index, element) {
      $(element).addClass('homeCat-' + index);
    });

    // match the community banners heights.
    top    = $('#content .homeCommunity .top a');
    bottom = $('#content .homeCommunity .bottom a');
    if (top.length !== 0) { setEqualHeight(top); }
    if (bottom.length !== 0) { setEqualHeight(bottom); }
  }
});

/*********************************************************************************************************************/
/* Facebook                                                                                                          */
/*********************************************************************************************************************/

window.fbAsyncInit = function() {
  FB.init({
    status     : true, // check the login status upon init?
    cookie     : true, // set sessions cookies to allow your server to access the session?
    xfbml      : true  // parse XFBML tags on this page?
  });
};

$(window).load(function () {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});
