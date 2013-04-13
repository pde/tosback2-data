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
    { id: 'ENT1',                title: 'Terms &amp; Conditions'                                           },
    { id: 'ENT2',                title: 'Terms &amp; Conditions'                                           },
    { id: 'ENTERTAINMENT',       title: 'Take 10% Off Your Entire Product Purchase'                        },
    { id: 'festive-wine-covers', title: 'Festive Wine Covers', name: 'FestiveWineCovers'                   },
    { id: 'FBFSD',               title: 'Offer Details'                                                    },
    { id: 'FLATRATE',            title: 'Offer Details'                                                    },
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                     },
    { id: 'FOMCLIST',            title: 'Fruit of the Month Club&reg; Collection'                          },
    { id: 'FOREIGN',             title: 'Foreign Countries We Ship To'                                     },
    { id: 'FOODWINE',            title: 'Terms &amp; Conditions'                                           },
    { id: 'GC-Terms',            title: 'Gift Card Terms &amp; Conditions', name: 'GC_Terms'               },
    { id: 'GreetingCardOffer',   title: 'Greeting Card Offer'                                              },
    { id: 'GreetingCardOffer2',  title: 'Greeting Card Offer'                                              },
    { id: 'GUAR',                title: 'Our Guarantee'                                                    },
    { id: 'RIPENING',            title: 'Ripening and Storage'                                             },
    { id: 'SHIPTO',              title: 'Countries we ship to:'                                            },
    { id: 'TENOFFFORTY',         title: 'Terms &amp; Conditions'                                           },
    { id: 'TWENTYFIVEOFF',       title: 'Terms &amp; Conditions'                                           },
    { id: 'WINESHIP',            title: 'Wine Shipping Details'                                            },
    { id: '9HM',            type: 'coupon', name: 'ninehj' },
    { id: '9HM',            type: 'coupon', name: 'ninehk' },
    { id: '9HM',            type: 'coupon', name: 'ninehl' },
    { id: '9HM',            type: 'coupon', name: 'ninehm' },
    { id: '20OFF',          type: 'coupon', name: 'twentyoff' },
    { id: 'ALLMOMS',        type: 'coupon' },
    { id: 'BDAY',           type: 'coupon' },
    { id: 'BUD',            type: 'coupon' },
    { id: 'BUNNIES',        type: 'coupon' },
    { id: 'CUPID',          type: 'coupon' },
    { id: 'EGGHUNT',        type: 'coupon' },
    { id: 'FAMILY',         type: 'coupon' },
    { id: 'FAM',            type: 'coupon' },
    { id: 'FFM',            type: 'coupon' },
    { id: 'FLOWERS',        type: 'coupon' },
    { id: 'FREEFSD',        type: 'coupon' },
    { id: 'FREESHIPPING',   type: 'coupon' },
    { id: 'FREESHIPPINGW',  type: 'coupon', title: 'Details: coupon code <span style="color: #f00;">SHIPJOY</span>' },
    { id: 'FREESHIPPING49', type: 'coupon' },
    { id: 'GIFTS',          type: 'coupon' },
    { id: 'GIFT4U',         type: 'coupon' },
    { id: 'GOLDEN',         type: 'coupon' },
    { id: 'HDGIFT',         type: 'coupon' },
    { id: 'HOLIDAYSAVINGS', type: 'coupon' },
    { id: 'JOY',            type: 'coupon' },
    { id: 'JOYFUL',         type: 'coupon' },
    { id: 'JOYOUS',         type: 'coupon' },
    { id: 'MOMSGIFT',       type: 'coupon' },
    { id: 'PINTEREST',      type: 'coupon' },
    { id: 'SHIP99',         type: 'coupon' },
    { id: 'SHIPJOY',        type: 'coupon' },
    { id: 'SHIPPING',       type: 'coupon' },
    { id: 'SHIPPING49',     type: 'coupon' },
    { id: 'THANKS',         type: 'coupon' },
    { id: 'TWENTYOFF',      type: 'coupon' },
    { id: 'TWENTYOFF49',    type: 'coupon' },
    { id: 'TWENTYOFF89',    type: 'coupon' },
    { id: 'TWENTYOFF99',    type: 'coupon' },
    { id: 'TWENTYOFFNOMIN', type: 'coupon' },
    { id: 'WED',            type: 'coupon' },
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
