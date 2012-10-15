/*global wpAd, commercialNode:true, wpAds:true, wp_meta_data, placeAd2, unescape, $, crtg_content, wpTiles:true, countyName:true, stateName:true  */
(function (win, doc, wpAd, undefined) {

  'use strict';

  wpAd.config = wpAd.config || {};
  
  //20127-CD
  if(commercialNode.match("lifestyle/kidspost")){
    commercialNode = commercialNode.replace(/^lifestyle\/kidspost/i,"kidspost");
  }
  //19879-CD
  //arkadium games section commercialNode hack:
  if(/games\.washingtonpost/i.test(doc.domain) && /entertainment\/arkadium/.test(commercialNode) && !wpAd.arkadiumNodeHack){
    commercialNode += '/' + (function(){
      var a = location.href.split('/');
      a = a[a.length-1];
      wpAd.arkadiumNodeHack = true;
      return (/\.aspx$/i.test(a)) ? a.split('.aspx')[0] : 'front';
    })();
  }

  //wp specific flags
  wpAd.flags.testEnv = !!wpAd.tools.urlCheck(/http:\/\/devprev\.|http:\/\/qaprev\.|http:\/\/prodprev\./);
  wpAd.flags.hpRefresh = !!wpAd.tools.urlCheck('reload=true');
  
  //Friendly Iframe supported domains and URL's:
  wpAd.config.fifDomains = {
    'www.washingtonpost.com': 'http://www.washingtonpost.com/wp-srv/ad/fif.html',
    'qaprev.digitalink.com': 'http://qaprev.digitalink.com/wp-srv/ad/fif.html',
    'prodprev.digitalink.com': 'http://prodprev.digitalink.com/wp-srv/ad/fif.html'
  };
  
  wpAd.constants = {
    'ad_config_url': /ad_config_url\=/.test(location.search) ? decodeURIComponent(location.search.split(/ad_config_url\=/)[1].split(/&/)[0]) : 'http://js.washingtonpost.com/wp-srv/ad/wp_config.js',
    'wpniSite': 'wpni',
    'wpniDomain': 'washingtonpost.com',
    'fifURL': (function () {
      if(!doc.domain) {
        return './fif.html'; //local test pages
      }
      var d = wpAd.config.fifDomains, key;
      for(key in d) {
        if(new RegExp(key, 'i').test(doc.domain)) {
          return d[key];
        }
      }
      //no FIF support on current domain:
      wpAd.flags.test_fif = false;
      return false;
    })()
  };

  if(!wpAd.flags.no_ads) {
    //ADD THE TEMPLATES - generated via flight manager tool:
    wpAd.tools.writeScript(wpAd.constants.ad_config_url);

    //sponsored advertiser (quigo) links:
    if(typeof wpAds === 'undefined' || !win.wpAds.textlinks) {
      wpAd.tools.addScript("http://js.washingtonpost.com/wp-srv/ad/textlink_driver.js");
    }

    //19882 - Criteo Implementation
    if(!/msie 6|msie 7|msie 8/i.test(navigator.userAgent)){
      wpAd.tools.writeScript('http://js.washingtonpost.com/wp-srv/ad/criteo.js');
    }

  }

  //called on first placeAd2 call
  wpAd.config.init = function () {
    //20246-CD-TEST
    if(/ad_test\=topratedlawyers/i.test(location.search)){
      wpAd.config.templates.toprated_lawyers_test = {
        what: ['marketing'],
        hardcode: '<div style="height:30;background-color:rgb(243,243,243);text-align:center;"><a href="http://topratedlawyers.washingtonpost.com" target="_blank" style="font-size:1.2em;line-height:30px;">Click Here to view the Area\'s Top-Rated Lawyers</a></div>'
      };
    }
  };

  //called via wpAd.cache.init:
  wpAd.config.front = function () {
    if(wp_meta_data.contentType) {
      return(typeof wp_meta_data.contentType === 'object' && wp_meta_data.contentType[0] === 'front') || (wp_meta_data.contentType === 'front') ? true : false;
    }
    //non-methode pages:
    return win.commercialPageType && win.commercialPageType === 'front' ? true : false;
  };

  //site specific keyvalues, in addition to generic keyvalues:
  wpAd.config.keyvalues = {
    articleId: function () {
      return wpAd.cache.hasOwnProperty('articleId') ? wpAd.cache.articleId : (function () {
        wpAd.cache.articleId = [];
        if(typeof wp_meta_data !== 'undefined' && wp_meta_data.contentType && wp_meta_data.contentType[0] === "CompoundStory") {
          var a = doc.location.href.split("/");
          wpAd.cache.articleId = [a[a.length - 1].toLowerCase().split("_story")[0]];
        }
        return wpAd.cache.articleId;
      })();
    },
    page: function () {
      return wpAd.cache.hasOwnProperty('page') ? wpAd.cache.page : (function () {
        if(typeof wp_meta_data !== 'undefined' && wp_meta_data.contentType && wpAd.tools.zoneBuilder.contentType[wp_meta_data.contentType[0]]) {
          wpAd.cache.page = [wpAd.tools.zoneBuilder.contentType[wp_meta_data.contentType[0]]];
          return wpAd.cache.page;
        }
        //default to article
        wpAd.cache.page = ['article'];
        return wpAd.cache.page;
      })();
    },
    wpatc: {
      exec: function () {
        if(!wpAd.cache.hasOwnProperty('wpatc')) {

          var cookie = wpAd.cache.cookies.hasOwnProperty('WPATC') ? wpAd.cache.cookies.WPATC : (function () {
            wpAd.cache.cookies.WPATC = wpAd.tools.getCookie('WPATC');
            return wpAd.cache.cookies.WPATC;
          })(),
            l, a;

          wpAd.cache.cookies.WPATC = cookie ? unescape(cookie) : null;
          wpAd.cache.wpatc = {};

          if(cookie) {
            cookie = unescape(cookie).split(':');
            l = cookie.length;
            while(l--) {
              a = cookie[l].split('=');
              if(wpAd.cache.wpatc[a[0]]) {
                wpAd.cache.wpatc[a[0]].push(a[1]);
              } else {
                wpAd.cache.wpatc[a[0]] = [a[1]];
              }
            }
          }
        }
        //loop through previously cached object with wpatc values in saved to it
        for(var key in wpAd.cache.wpatc) {
          wpAd.briefcase.keyvalues[key] = wpAd.cache.wpatc[key];
        }
      }
    },
    areaId: function () {
      return wpAd.cache.hasOwnProperty('areaId') ? wpAd.cache.areaId : (function () {
        wpAd.cache.areaId = [];
        var a = wpAd.tools.urlCheck('areaId', {
          type: 'variable'
        });
        if(win.hs && win.hs.geo_area_id) {
          wpAd.cache.areaId = win.hs.geo_area_id.split(';');
        }
        if(a) {
          wpAd.cache.areaId.push(a);
        }
        return wpAd.cache.areaId;
      })();
    },
    aptco: function () {
      return wpAd.cache.hasOwnProperty('aptco') ? wpAd.cache.aptco : (function () {
        var a = wpAd.tools.urlCheck('aptco', {
          type: 'variable'
        });
        wpAd.cache.aptco = a ? [a] : [];
        return wpAd.cache.aptco;
      })();
    },
    metro: function () {
      return wpAd.cache.hasOwnProperty('metro') ? wpAd.cache.metro : (function () {
        var a = wpAd.tools.urlCheck('metro', {
          type: 'variable'
        });
        wpAd.cache.metro = a ? [a] : [];
        return wpAd.cache.metro;
      })();
    },
    locExpSponsor: function () {
      return wpAd.cache.hasOwnProperty('locExpSponsor') ? wpAd.cache.locExpSponsor : (function () {
        wpAd.cache.locExpSponsor = [];
        if(win.countyName && win.stateName) {
          var invalidKW = ['?', '=', '/', '\\', ':', ';', ',', '*', '(', ')', '&', '$', '%', '@', '!', '^', '+', ' ', '[', ']', '{', '}', '.'],
            l = invalidKW.length,
            csRE;

          while(l--) {
            csRE = new RegExp('(\\' + invalidKW[l] + ')', 'g');
            countyName = countyName.replace(csRE, "").toLowerCase();
            stateName = stateName.replace(csRE, "").toLowerCase();
          }

          wpAd.cache.locExpSponsor = [win.countyName + "-" + win.stateName];
        }
        return wpAd.cache.locExpSponsor;
      })();
    }
  };

  //media page check:
  wpAd.tools.mediaPage = function () {
    //cache as many of these as possible to reduce duplicate checks:
    return wpAd.cache.hasOwnProperty('mediaPage') ? wpAd.cache.mediaPage : (function () {
      //default to false:
      wpAd.cache.mediaPage = false;

      //17457-CD
      if((win.thisNode && /media|photo|video/.test(win.thisNode)) || (commercialNode && /media|photo|video/.test(commercialNode)) || wpAd.tools.urlCheck(/video|gallery|scene-in|mobile|\/wp-srv\//)) {
        wpAd.cache.mediaPage = true;
      }
      //N/A
      else if(win.wp_meta_data && wp_meta_data.contentType && /GraphicStory|MediaGallery|PanoStory|VideoStory/.test(wp_meta_data.contentType.toString())) {
        wpAd.cache.mediaPage = true;
      }
      //10522-RZ,12622-ML
      else if(/\/email|admin|\/puzzles|reachwall/.test(commercialNode) || wpAd.tools.urlCheck('_print.html')) {
        wpAd.cache.mediaPage = true;
      }
      return wpAd.cache.mediaPage;
    })();
  };

  
  //homepage refresh modification:
  win.TWP = win.TWP || {};
  win.TWP.hpRefreshTests = win.TWP.hpRefreshTests || {};
  win.TWP.hpRefreshTests.adRefreshFunction = function() {
    return wpAd.flags.test_ads ? false : true;
  };

  
  // last chance to overwrite/add/modify keyvalues for specific or non-standard purposes:
  wpAd.config.hackBin = function () {

    //important that we clone this
    var tempcase = wpAd.tools.clone(wpAd.briefcase);

    if(tempcase.where.match(/washingtonpost\.com/) && tempcase.what === 'flex_bb_hp' && wpAd.flags.hpRefresh) {
      tempcase.where += 'refresh';
    }
    
    if(/washingtonpost\.com/.test(tempcase.where) && window.jQuery){
      if(tempcase.what === 'flex_bb_hp'){
        $(function(){
          var $target = $('#eyeDiv');
          if($target.length){
            $('li.entertainment, li.lifestyle', '#main-nav').hover(function(){
              $target.css({left: '-9999px'});
            }, function(){
              $target.css({left: '0px'});
            });
          }
        });
      } else if(tempcase.what === 'pushdown'){
        $(function(){
          var $target = $('div.prWrap[id^="prf"]');
          if($target.length){
            $('#main-nav>li:not(.jobs)').hover(function(){
              $target.hide();
            }, function(){
              $target.show();
            });
          }
        });
      }
    }

    //20007-CD
    if(tempcase.what === 'pushdown' && /washingtonpost\.com/.test(tempcase.where)){
      var adi_push = doc.getElementById('wpni_adi_pushdown');
      if(adi_push){
        adi_push.style.backgroundImage = 'url(http://img.wpdigital.net/wp-adv/test/mstest/pushdown-ad-small.png)';
        adi_push.style.backgroundPosition = '-7px -100px';
      }              
    }
    
    //20074-CD
    if(tempcase.what === 'flex_ss_bb_hp' && (tempcase.where === 'lifestyle/home' || tempcase.where === 'lifestyle/home/front' || tempcase.where === 'lifestyle/home-garden')){
      tempcase.where += '/flex';
    }
    
    //Viewable Impression unique zone + exclusions:
    if(tempcase.delivery === 'vi'){
      tempcase.where += '/viewable';
      tempcase.keyvalues['!c'].push('media');
      tempcase.keyvalues['!c'].push('intrusive');
    }

    //19882-criteo implementation
    if(win.crtg_content){
      tempcase.keyvalues.onTheFly += crtg_content;
    }

    if(tempcase.defaults.what === 'sponsor|rental') {
      tempcase.keyvalues.onTheFly += 'tn=12;tr=1;tcp=0;to=v;ta=left;tva=top;';
    }

    //18344
    if(tempcase.where === 'rentals' && win.wpAds && wpAds.metro && wpAds.metro.exec) {
      tempcase.keyvalues.onTheFly += wpAds.metro.exec();
    }

    if(tempcase.where.match(/realestate|trulia/)) {
      tempcase.keyvalues.onTheFly += (function () {
        if(win._AD_TARGETING && win._AD_TARGETING.county && win._AD_TARGETING.state) {
          var co_spon = win._AD_TARGETING.county + '-' + win._AD_TARGETING.state;
          return 'co_spon=' + co_spon.toLowerCase().replace(/ /gi, '_').replace(/&[a-z]*(?=;)/gi, '').replace(/[^a-z\d\-\_]/gi, '') + ';';
        }
        return '';
      })();
    }

    if(tempcase.where.match(/^wiki|innovation/) && tempcase.what.match('leaderboard')) {
      tempcase.keyvalues.onTheFly += '!category=bigleaderboard;';
    }

    //11958-MB, 13745-JM
    if(tempcase.where === 'trulia') {
      if(tempcase.what === 'leaderboard') {
        tempcase.keyvalues['!c'].push('media');
      } else if(tempcase.what === 'flex_bb_tp') {
        tempcase.keyvalues['!c'].push('intrusive');
      }
    }

    //18593-personalpost
    //19648-AL
    if(commercialNode.match(/washingtonpost\.com|personalpost|obituaries|weather|jobs\/search/)) {
      tempcase.keyvalues['!c'].push('intrusive');
    }

    if(wpAd.tools.mediaPage()) {
      tempcase.keyvalues['!c'].push('media');
    }

    return tempcase;
  };
  

  win.wpTiles = win.wpTiles || {};
  wpTiles.nnHasAd = function () {
    if(win.NetworkNews && win.NetworkNews.Constants) {
      win.NetworkNews.Constants.hasAd = true;
    }
  };
  wpTiles.init = function (a) {
    placeAd2(commercialNode, a, false, '');
  };
  
  //MS - promo tile test
  if(/test_ads\=promotile/.test(location.search) && win.jQuery){
    $(function(){
      $(doc.createElement('script')).attr({
        type: 'text/javascript',
        src: 'http://ad.doubleclick.net/pfadx/wpni.'+ commercialNode +';sz=184x90,200x60;pos=promo;kw=test_promotile;dcmt=text/javascript;ord=' + Math.floor(Math.random()*1E9) + '?'
      }).appendTo('head');
    });
  }

})(window, document, wpAd);