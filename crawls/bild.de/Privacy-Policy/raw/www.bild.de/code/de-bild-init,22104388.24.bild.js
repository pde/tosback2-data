
/*de.bild.init:22104388.24*/

/**
 * de.bild.init
 * Elternobjekt
 * Hier wird seitweite Initialisierungen gemacht
 * CSS Klassen:
 * keine
 */
jQuery.noConflict()
var de = de || {};
de.bild = de.bild || {};
de.bild.init = ( function($) {
 var siteInitalised = false;
 // run once
 function init($context) {
  if( typeof $context === 'undefined' || $context.length === 0) {
   return false;
  }
  // sso.init : see navi.js
  // run once
  if(siteInitalised === false) {
   /* social */
   if(de.bild.social) {
    de.bild.social.init();
   }
   /* community */
   if(de.bild.community) {
    de.bild.community.init();
   }
   // A-Teasers
   if(de.bild.ateaser) {
    var $tfxs = $context.find('.tfx');
    if($tfxs.length) {
     de.bild.ateaser.init($tfxs);
    }
   }
   //newsticker
   if(de.bild.newsTicker) {
    var $nts = $context.find('div.nticker, div.message-ticker, div.show-news');
    if($nts.length) {
     de.bild.newsTicker.init($nts);
    }
   }
   // fotogallery
   if(de.bild.fotoGallery) {
    var $fgs = $context.find('div.photoGallery');
    if($fgs.length) {
     de.bild.fotoGallery.init($fgs);
    }
   }
   /* general functions from sfx  */
   var $toolLinks = $('#tools > ul > li');
   if($toolLinks.length) {
    $toolLinks.hover(function() {
     $(this).addClass('active');
    }, function() {
     $(this).removeClass('active');
    });
   }
   var $boerseUhrzeit = $('#pm113v3-zeit');
   if($boerseUhrzeit.length) {
    $boerseUhrzeit.html(de.bild.utils.getTime('($d.$m.$y $h:$i Uhr)'));
   }
  }
  // everything below will be reinitialised -> de.bild.init()
  // video
  if(de.bild.video) {
   de.bild.video.init();
  }
  // multiteaser
  if(de.bild.multiteaser) {
   /* Alle Multiteaser haben die Klasse multiteaser (auch videos). Deswegen die Exklussion an der Stelle */
   var $mts = $context.find('div.multiteaser:not(.vmt1)');
   if($mts.length) {
    de.bild.multiteaser.init($mts);
   }
  }
  // video multiteaser
  if(de.bild.videoMultiteaser) {
   var $vmts = $context.find('div.vmt1');
   if($vmts.length) {
    de.bild.videoMultiteaser.init($vmts);
   }
  }
  //sliders
  if(de.bild.slider) {
   var $sldrs = $context.find('div.slideshow');
   if($sldrs.length) {
    de.bild.slider.init($sldrs);
   }
  }
  // accordeon
  if(de.bild.accordeon) {
   var $acs = $context.find('div.ranking, div.simVids, div.topVids, div.simPhotos, div.discussed, div.regComments, .acctoggle');
   if($acs.length) {
    de.bild.accordeon.init($acs);
   }
  }
  //personalised Teaser
  var $pTeasers = $context.find('div.personalised-teaser');
  if($pTeasers.length) {
   if(de.bild.personalisedTeaser)
    de.bild.personalisedTeaser.init($pTeasers);
  }
  //liveticker
  var $ticker = $context.find('div.liveticker');
  if($ticker.length) {
   if(de.bild.live)
    de.bild.live.init($ticker);
  }
  //tooltip
  if(de.bild.tooltip) {
      var $tooltips = $context.find('a.title-tip');
      if($tooltips.length) {
          de.bild.tooltip.init();
      }
   }

//onDemand Bilder AM ENDE(WICHTIG!)
de.bild.onDemand.init($context);


  siteInitalised = true;
  return siteInitalised;
 };
 //document.ready
 $(function() {
  init($('#contentWrapper'));   
 });
 return init;
}(jQuery));