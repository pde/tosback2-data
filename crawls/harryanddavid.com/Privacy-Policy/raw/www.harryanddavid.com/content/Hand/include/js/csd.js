"use strict";

/*********************************************************************************************************************/
/* Popups                                                                                                            */
/*********************************************************************************************************************/

dojo.addOnLoad(function () {
  popup.loadPopups([
    { id: '20HOL',               title: 'Terms &amp; Conditions'                                         },
    { id: 'AAA',                 title: 'Terms &amp; Conditions'                                         },
    { id: 'AMEX',                title: 'AMEX Subscriptions Info'                                        },
    { id: 'AMEXFSD',             title: 'FREE Standard Delivery on your entire product purchase'         },
    { id: 'AMEXSAVE20',          title: 'Details: 20% Off for American Express Employees'                },
    { id: 'AMEXSAVE20',          title: 'Details: 20% Off for American Express Employees'                },
    { id: 'AMEXTERMS1',          title: 'Save 15%'                                                       },
    { id: 'AMEXTERMS2',          title: 'Earn Double Membership Rewards Points'                          },
    { id: 'AMEXTRIPLE',          title: 'Earn Triple Membership Rewards&reg; Points'                     },
    { id: 'BUYNOW',              title: 'Terms &amp; Conditions'                                         },
    { id: 'CHICKENPIE',          title: 'Chicken Pie Baking Instructions'                                },
    { id: 'Coachella',           title: 'Offer Details'                                                  },
    { id: 'COOKINGSWEEPS',       title: 'Sweepstakes Details'                                            },
    { id: 'CUTOFFS',             title: 'Holiday Shipping Cut-Off Dates'                                 },
    { id: 'CYOFRUIT',            title: 'Discounts'                                                      },
    { id: 'DADSDAY',             title: 'Details: Save 20% on your product purchase'                     },
    { id: 'DBF',                 title: 'Discount Disclaimer'                                            },
    { id: 'DELFREE',             title: 'Terms &amp; Conditions'                                         },
    { id: 'DISC25',              title: 'Terms &amp; Conditions'                                         },
    { id: 'DISC30',              title: 'Terms &amp; Conditions'                                         },
    { id: 'DISCFSD',             title: 'Terms &amp; Conditions'                                         },
    { id: 'EMAIL20',             title: 'Terms &amp; Conditions'                                         },
    { id: 'EASTERFSD',           title: 'Terms &amp; Conditions'                                         },
    { id: 'EASTERFSD50',         title: 'Terms &amp; Conditions'                                         },
    { id: 'ENOUNCE',             title: 'Gift E-Nouncement&reg; Service'                                 },
    { id: 'ENT1',                title: 'Terms &amp; Conditions'                                         },
    { id: 'ENT2',                title: 'Terms &amp; Conditions'                                         },
    { id: 'ENT10',               title: 'Details: 10% off your entire product purchase!'                 },
    { id: 'ENT20',               title: 'Details: $20 off your $75 product purchase!'                    },
    { id: 'ENTERTAINMENT',       title: 'Take 10% Off Your Entire Product Purchase'                      },
    { id: 'EPRIZE',              title: 'Mom&rsquo;s the Best (by a mile!) Sweepstakes - Official Rules' },
    { id: 'EPRIZE2',             title: 'Better Than a Tie Giveaway - Official Rules'                    },
    { id: 'FEDEX20',             title: 'Terms &amp; Conditions'                                         },
    { id: 'festive-wine-covers', title: 'Festive Wine Covers', name: 'FestiveWineCovers'                 },
    { id: 'FEUG',                title: 'Free Express Upgrade on Select Items'                           },
    { id: 'FEUSELECT',           title: 'Terms &amp; Conditions'                                         },
    { id: 'FFDETAILS',           title: 'Friends &amp; Family Details'                                   },
    { id: 'FFDETAILS1',          title: 'Friends &amp; Family Details'                                   },
    { id: 'FOMC25',              title: 'Terms &amp; Conditions'                                         },
    { id: 'FOMCFRUITS',          title: 'Fruit of the Month Club&reg;'                                   },
    { id: 'FOMCLIST',            title: 'Fruit of the Month Club&reg; Collection'                        },
    { id: 'FOODWINE1',           title: 'Terms &amp; Conditions'                                         },
    { id: 'FOREIGN',             title: 'Foreign Countries We Ship To'                                   },
    { id: 'FRIENDS',             title: '3 Ways to Save*'                                                },
    { id: 'FREEDEL',             title: 'Terms &amp; Conditions'                                         },
    { id: 'FREESTDDEL',          title: 'Terms &amp; Conditions'                                         },
    { id: 'FSD50',               title: 'Terms &amp; Conditions'                                         },
    { id: 'FSDHOL',              title: 'Terms &amp; Conditions'                                         },
    { id: 'FSDNOMIN',            title: 'Terms &amp; Conditions'                                         },
    { id: 'FSDSELECT',           title: 'Terms &amp; Conditions'                                         },
    { id: 'GC-Terms',            title: 'Gift Card Terms &amp; Conditions', name: 'GC_Terms'             },
    { id: 'GUAR',                title: 'Our Guarantee'                                                  },
    { id: 'holidaycutoffs',      title: 'Holiday Shipping Cut-Off Dates', name: 'HolidayCutOffs'         },
    { id: 'ice-sweepstakes',     title: 'Sweepstakes Rules &amp; Regulations', name: 'ice_sweepstakes'   },
    { id: 'ice-sweepstakes-banner',    title: 'Sweepstakes Rules &amp; Regulations', name: 'ice_sweepstakes_banner'    },
    { id: 'ice-sweepstakes-home-page', title: 'Sweepstakes Rules &amp; Regulations', name: 'ice_sweepstakes_home_page' },
    { id: 'INSADV',              title: 'Terms &amp; Conditions'                                         },
    { id: 'MACKCALI',            title: 'Terms &amp; Conditions'                                         },
    { id: 'MCDONALDS',           title: 'Terms &amp; Conditions'                                         },
    { id: 'MDAYFSD',             title: 'Terms &amp; Conditions'                                         },
    { id: 'MONETATE',            title: 'Terms &amp; Conditions'                                         },
    { id: 'MOMSFSD',             title: 'Terms &amp; Conditions'                                         },
    { id: 'MSOL',                title: 'Offer &amp; Refund Details'                                     },
    { id: 'MYSTDISC',            title: 'Details: Mystery Discount'                                      },
    { id: 'NOMINFSD',            title: 'Terms &amp; Conditions'                                         },
    { id: 'OVER50FSD',           title: 'Terms &amp; Conditions'                                         },
    { id: 'PETSMART',            title: 'Terms &amp; Conditions'                                         },
    { id: 'RIPENING',            title: 'Ripening and Storage'                                           },
    { id: 'RVSWEEPS',            title: 'Sweepstakes Details'                                            },
    { id: 'SAVE10',              title: 'Terms &amp; Conditions'                                         },
    { id: 'SAVE25',              title: 'Terms &amp; Conditions'                                         },
    { id: 'SEND_LOVE',           title: 'Details: coupon code SEND LOVE'                                 },
    { id: 'SHIPTO',              title: 'Countries we ship to:'                                          },
    { id: 'SKADDEN',             title: 'Terms &amp; Conditions'                                         },
    { id: 'StewartTC',           title: 'Offer and Refund Details'                                       },
    { id: 'STJUDE',              title: 'St. Jude Disclaimer'                                            },
    { id: 'STORY',               title: 'Story of Harry &amp; David Disclaimer'                          },
    { id: 'THANKSXD',            title: 'Terms &amp; Conditions'                                         },
    { id: 'TPO',                 title: 'Discount Disclaimer'                                            },
    { id: 'VALOFFER',            title: 'Valentine&rsquo;s Day Delivery Deals'                           },
    { id: 'WAW',                 title: 'Terms &amp; Conditions'                                         },
    { id: 'WINESHIP',            title: 'Wine Shipping Details'                                          },
    { id: 'XMASFSD',             title: 'Terms &amp; Conditions'                                         },
    { id: '20SAVINGS' , type: 'coupon' },
    { id: 'BFAD25'    , type: 'coupon' },
    { id: 'BIRTHDAY'  , type: 'coupon' },
    { id: 'CHEERS'    , type: 'coupon' },
    { id: 'CLOVER'    , type: 'coupon' },
    { id: 'CMAD25'    , type: 'coupon' },
    { id: 'DASHER'    , type: 'coupon' },
    { id: 'DEAL'      , type: 'coupon' },
    { id: 'DISCOUNT20', type: 'coupon' },
    { id: 'DISCOVER'  , type: 'coupon' },
    { id: 'FAMILY'    , type: 'coupon' },
    { id: 'FLAG'      , type: 'coupon' },
    { id: 'FREE50'    , type: 'coupon' },
    { id: 'FREECARD'  , type: 'coupon' },
    { id: 'FREEFSD'   , type: 'coupon' },
    { id: 'FREESHIP'  , type: 'coupon' },
    { id: 'FRSHP'     , type: 'coupon' },
    { id: 'FSDEL'     , type: 'coupon' },
    { id: 'GIVE'      , type: 'coupon' },
    { id: 'H66'       , type: 'coupon' },
    { id: 'HAPPY'     , type: 'coupon' },
    { id: 'HD10P'     , type: 'coupon' },
    { id: 'HD10WEB'   , type: 'coupon' },
    { id: 'HDFREE'    , type: 'coupon' },
    { id: 'HND10WB'   , type: 'coupon' },
    { id: 'HD5WEB'    , type: 'coupon' },
    { id: 'HDGIFT'    , type: 'coupon' },
    { id: 'HOLLY'     , type: 'coupon' },
    { id: 'JINGLE'    , type: 'coupon' },
    { id: 'JOLLY'     , type: 'coupon' },
    { id: 'JOY'       , type: 'coupon' },
    { id: 'LABOR'     , type: 'coupon' },
    { id: 'LOVE'      , type: 'coupon' },
    { id: 'MERRY'     , type: 'coupon' },
    { id: 'MDAY11'    , type: 'coupon' },
    { id: 'PEARDEAL'  , type: 'coupon' },
    { id: 'PRANCER'   , type: 'coupon' },
    { id: 'ROSES'     , type: 'coupon' },
    { id: 'SANTA'     , type: 'coupon' },
    { id: 'SAVE'      , type: 'coupon' },
    { id: 'SAVE20'    , type: 'coupon' },
    { id: 'SAVENOW'   , type: 'coupon' },
    { id: 'SAVETODAY' , type: 'coupon' },
    { id: 'SENDFREE'  , type: 'coupon' },
    { id: 'SHIP'      , type: 'coupon' },
    { id: 'SHIP49'    , type: 'coupon' },
    { id: 'SHIP69'    , type: 'coupon' },
    { id: 'SHIPFREE'  , type: 'coupon' },
    { id: 'SHIPNOW'   , type: 'coupon' },
    { id: 'SIZZLE'    , type: 'coupon' },
    { id: 'SNOW'      , type: 'coupon' },
    { id: 'SPARKLE'   , type: 'coupon' },
    { id: 'SPECIAL'   , type: 'coupon' },
    { id: 'SPRING20'  , type: 'coupon' },
    { id: 'STAR'      , type: 'coupon' },
    { id: 'SUMMERFREE', type: 'coupon' },
    { id: 'TINSEL'    , type: 'coupon' },
    { id: 'VAL20'     , type: 'coupon' },
    { id: 'WELCOME'   , type: 'coupon' },
    { id: 'YIPPEE'    , type: 'coupon' },
    { id: 'WrappingPaper',   title: 'Wrapping Paper Showcase', callback: function () { $('#dialog-WrappingPaper .widget').cyclable(); } },
    { id: 'EMAIL',           title: 'Email Sign-up',           callback: function () {
      var $email, starting;
      $email   = $('#dialog-EMAIL input:text');
      starting = 'Enter Your Email';
      
      button.enhanceAll();
      $email
        .bind('focus', function () { if ($email.val() === starting) { $email.val('');       } $email.select(); })
        .bind('blur',  function () { if ($email.val() === ''      ) { $email.val(starting); } });
    } }
  ]);
});


/*********************************************************************************************************************/
/* Home Page Timeline                                                                                                */
/*********************************************************************************************************************/

function initTimeline () {
  var now, ONE_DAY, $timeline, $countdown;
  now = new Date();
  
  ONE_DAY = 1000 * 60 * 60 * 24;
  function days_between(date1, date2) { return Math.ceil(Math.abs(date1.getTime() - date2.getTime())/ONE_DAY); }
  function updateDays (currSlideElement, nextSlideElement, options, forwardFlag) {
    var $this;
    $this = $(nextSlideElement);
    $this.find('.days').text(days_between(new Date(), $this.data('date')));
  }

  function filterDates () {
    var start, end;
    start = $(this).attr('start');
    end = $(this).attr('end');
    return (start === undefined || new Date(start) < now) && (end === undefined || new Date(end) > now);
  }
  
  function activateTimeline () {
    var $viewport, $view, $images, $left, $right, position, tiles, slot;
    
    // Animate the changing of the viewport
    function updateViewport(direction) {
      position += direction;
      $view.stop().animate({ left: (-position * 130) + 'px' }, { duration: '1500', easing: 'easeInOutQuad' });
    }
    
    $viewport = $timeline.find('.viewport');
    $view     = $timeline.find('.view');
    $images   = $view.children();
    $left     = $timeline.find('.arrow-left');
    $right    = $timeline.find('.arrow-right');
    
    position = 0;
    tiles = $images.length - 1;
    slot = tiles - 3;
    
    // Only Activate the offset arrows if there are enough images to need them.
    if ($view.width() > $viewport.width()) {
      $left.click(function () {
          if (position !== 0) { updateViewport(-1); $right.css('cursor', 'pointer'); }
          if (position === 0) { $left.css('cursor', ''); }
        });
      $right.click(function () {
          if (position !== slot) { updateViewport(1); $left.css('cursor', 'pointer'); }
          if (position === slot) { $right.css('cursor', ''); }
        });
      $left.css('cursor', '');
      $right.css('cursor', 'pointer');
    } else {
      $left.add($right).css('display', 'hidden');
    }
    
    // Start the countdown
    $countdown.cycle({
      fx:     'scrollUp',
      speed:  1500,
      easing: 'easeOutElastic',
      before: updateDays
    });
  }
  
  function loadTimeline (data, textStatus, XMLHttpRequest) {
    var $view, $data;
    $timeline  = $('#timeline,#espotTimeline');
    $view      = $timeline.find('.view');
    $data      = $(data);
    $countdown = $timeline.find('.countdown');
    
    dojo.require("dijit.Tooltip");
    $data.find('entry').filter(filterDates).each(function (index, element) {
      var $element, image, tooltip, link, id, tag, $tag, end, countdown, $pane;
      $element = $(element);
      
      if ($view.children().length >= 8) { return; }
      
      image     = $element.find('image').filter(filterDates).first().text();
      tooltip   = $element.find('tooltip').filter(filterDates).first().text();
      link      = $element.find('link').filter(filterDates).first().text();
      countdown = $element.find('countdown').filter(filterDates).first();
      end       = $element.attr('end');
      
      if (image === undefined || image === "") { return; }
      link = link.replace("${storeId}", storeId).replace("${catalogId}", catalogId);
      
      id = 'timeline-entry-' + index;
      tag = [];
      if (link) {
        tag.push(' href="' + link + '"');
        tag = '<a' + tag.join(' ') + '></a>';
      } else {
        tag = '<span' + tag.join(' ') + '></span>';
      }
      
      $tag = $(tag);
      $tag.attr({
        id:    id,
        start: $element.attr('start'),
        end:   end
      });
      $tag.append('<img src="/content/Hand/images/timeline/'+image+'" />');
      
      $view.append($tag);
      if (tooltip) {
        tooltip = '<div class="timeline-tooltip">' + tooltip + '</div>';
        new dijit.Tooltip({ connectId: [ id ], label: tooltip, position: [ 'above', 'below' ] });
      }
      
      end = end === undefined ? now : new Date(end);
      if (countdown !== undefined && countdown.text() !== '' && end > now) {
        $pane = $('<div></div>');
        if ($countdown.children().length !== 0) { $pane.hide(); }
        $pane.attr('id', 'countdown-date-' + index);
        if (countdown.attr('lines') !== undefined) { $pane.addClass('lines-' + countdown.attr('lines')); }
        $pane.data('date', end);
        $pane.append('<span class="name">' + countdown.text() + '</span><br/><span class="days"></span>&nbsp;Days');
        $pane.find('.days').text(days_between(now, end));
        $countdown.append($pane);
      }

    });
    
    activateTimeline();
  }
  
  function requestTimeline () {
    $.ajax({
      cache:    true,
      dataType: 'xml',
      error:    function (XMLHttpRequest, textStatus, errorThrown) { $('#content .timeLine > .right').text(textStatus); },
      success:  loadTimeline,
      url:      '/content/Hand/include/xml/timeline.xml'
    });
  }
  
  if ($('#content .timeLine').length) { requestTimeline(); }
}