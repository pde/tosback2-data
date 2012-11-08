/*jslint browser: true, indent: 2 */
/*global $: false, dojo: false, popup: false, button: false */

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
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                     },
    { id: 'FOMCLIST',            title: 'Fruit of the Month Club&reg; Collection'                          },
    { id: 'FOREIGN',             title: 'Foreign Countries We Ship To'                                     },
    { id: 'GC-Terms',            title: 'Gift Card Terms &amp; Conditions', name: 'GC_Terms'               },
    { id: 'GUAR',                title: 'Our Guarantee'                                                    },
    { id: 'RIPENING',            title: 'Ripening and Storage'                                             },
    { id: 'SHIPTO',              title: 'Countries we ship to:'                                            },
    { id: 'TWENTYFIVEOFF',       title: 'Terms &amp; Conditions' 							               },
    { id: 'WINESHIP',            title: 'Wine Shipping Details'                                            },
    { id: '9HM',        type: 'coupon', name: 'ninehj' },
    { id: '9HM',        type: 'coupon', name: 'ninehk' },
    { id: '9HM',        type: 'coupon', name: 'ninehl' },
    { id: '9HM',        type: 'coupon', name: 'ninehm' },
    { id: '20OFF',      type: 'coupon', name: 'twentyoff' },
    { id: 'BDAY',       type: 'coupon' },
    { id: 'FAMILY',     type: 'coupon' },
    { id: 'FFM',        type: 'coupon' },
    { id: 'FREEFSD',    type: 'coupon' },
    { id: 'GIFTS',      type: 'coupon' },
    { id: 'HDGIFT',     type: 'coupon' },
    { id: 'SHIPPING',   type: 'coupon' },
    { id: 'SHIPPING49', type: 'coupon' },
    { id: 'THANKS',     type: 'coupon' },
    { id: 'WED',        type: 'coupon' },
    { id: 'WrappingPaper',   title: 'Wrapping Paper Showcase', callback: function () { $('#dialog-WrappingPaper .widget').cyclable(); } },
    { id: 'EMAIL',           title: 'Email Sign-up',           callback: function () {
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