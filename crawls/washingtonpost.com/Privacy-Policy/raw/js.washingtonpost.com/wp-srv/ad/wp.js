/*global wpAd, commercialNode:true, wpAds:true, wp_meta_data, placeAd2, unescape, escape, $, crtg_content, wpTiles:true, countyName:true, stateName:true  */
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
  wpAd.flags.vi_test = /vi_test/.test(location.search) && win.wp_meta_data && win.wp_meta_data.contentType && /CompoundStory/i.test(win.wp_meta_data.contentType.toString());

  //Friendly Iframe supported domains and URL's:
  wpAd.config.fifDomains = {
    'www.washingtonpost.com': 'http://www.washingtonpost.com/wp-srv/ad/fif.html',
    'qaprev.digitalink.com': 'http://qaprev.digitalink.com/wp-srv/ad/fif.html',
    'prodprev.digitalink.com': 'http://prodprev.digitalink.com/wp-srv/ad/fif.html'
  };

  wpAd.constants = {
    'ad_config_url': /ad_config_url\=/.test(location.search) ? decodeURIComponent(location.search.split(/ad_config_url\=/)[1].split(/&/)[0]) : 'http://js.washingtonpost.com/wp-srv/ad/wp_config.js',
    'site': 'wpni',
    'domain': 'washingtonpost.com',
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

  wpAd.tools.add_criteo = function(){
    var cookieName = 'cto_was',
      script_base = 'http://rtax.criteo.com/delivery/rta/rta.js';

    wpAd.cache.cookies = wpAd.cache.cookies || {};

    if(!wpAd.cache.cookies.hasOwnProperty('criteo')){
     wpAd.cache.cookies.criteo = wpAd.tools.getCookie(cookieName);
    }

    win.crtg_content = wpAd.cache.cookies.criteo;

    wpAd.tools.ajax({
      cache: true,
      dataType: 'script',
      url: script_base,
      timeout: 2000,
      crossDomain: true,
      data: {
        netId: '1180',
        cookieName: cookieName,
        rnd: Math.floor(Math.random() * 1E11),
        varName: 'crtg_content'
      },
      error: function(err){
        if(wpAd.flags.debug){
          try{win.console.log('CRITEO timeout error:', err);}catch(e){}
        }
      },
      success: function(data){
        if(wpAd.flags.debug){
          try{win.console.log(script_base, 'loaded:');}catch(e){}
        }
      }
    });
  };

  if(!wpAd.flags.no_ads) {
    //ADD THE TEMPLATES - generated via flight manager tool:
    wpAd.tools.writeScript(wpAd.constants.ad_config_url);

    //add the tiffany tiles
    wpAd.tools.writeScript('http://js.washingtonpost.com/wp-srv/ad/tiffanyTiles.js');

    //19882 - Criteo Implementation
    if(!/msie 6|msie 7|msie 8/i.test(navigator.userAgent)){
      wpAd.tools.add_criteo();
    }

    //20951 - CW - WP+ pixel for wp sitewide
    var wp_plus_pix = [
          'http://pixel.mathtag.com/event/js?mt_id=193782&mt_adid=109699&v1=&v2=&v3=&s1=&s2=&s3='
        ], wp_plus_pix_l = wp_plus_pix.length;
    while(wp_plus_pix_l--){
      wpAd.tools.loadScript(wp_plus_pix[wp_plus_pix_l]);
    }

  }

  //called on first placeAd2 call
  wpAd.config.init = function () {

    //sponsorship for surface 2/14/13-2/28/13 - JH
    if(((!wpAd.flags.is_homepage && win.estNowWithYear >= 201302140000 && /^201302/.test(win.estNowWithYear)) || /testads\=surface_sponsor/.test(location.search)) && win.jQuery){
      $(function(){
        $.ajax({
          cache: true,
          dataType: 'script',
          crossDomain: true,
          url: 'http://js.washingtonpost.com/wp-srv/ad/ghost.js',
          timeout: 2000,
          error: function(err){
            if(wpAd.flags.debug){
              try{win.console.log('ghost.js timeout error:', err);}catch(e){}
            }
          },
          success: function(data){
            if(wpAd.flags.debug){
              try{win.console.log('ghost.js', 'loaded:');}catch(e){}
            }
          }
        });
      });
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
    author: function () {
        return wpAd.cache.hasOwnProperty('author') ? wpAd.cache.author : (function() {
            wpAd.cache.author = [];
            if (typeof wp_meta_data !== 'undefined' && wp_meta_data.author) {
                for (var i=0; i < wp_meta_data.author.length; i++) {
                    wpAd.cache.author[i]=wp_meta_data.author[i].replace(" ","_").toLowerCase();
                }
            }
            if (typeof wp_meta_data !== 'undefined' && wp_meta_data.blogger) {
                for (var j=0; j < wp_meta_data.blogger.length; j++) {
                    wpAd.cache.author.push(wp_meta_data.blogger[j].replace(" ","_").toLowerCase());
                }
            }
            return wpAd.cache.author;
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
    },
    ppwidget: function(){
      return wpAd.cache.hasOwnProperty('ppwidget') ? wpAd.cache.ppwidget : (function(){
        wpAd.cache.ppwidget = wpAd.tools.urlCheck('tid', {type:'variable'}) === 'pp_stream' ? '1' : '';
        return wpAd.cache.ppwidget;
      })();
    },
    wpnode: function(){
      return [commercialNode];
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

  //QUIGO TEXTLINKS
  wpAd.textlinks = {
    //configuration file url:
    config_url: 'http://www.washingtonpost.com/wp-srv/ad/textlink_quigo_data.json',
    //if the textlinks config script is not yet loaded, ajax it in
    //once wpAd.textlinks.templates is available, so some initialisation
    init: function(contentType, position, cnode) {
      if(!wpAd.textlinks.templates){
        wpAd.tools.ajax({
          url: wpAd.textlinks.config_url,
          dataType: 'json',
          timeout: 2000,
          crossDomain: true,
          cache: true,
          success: function(data){
            wpAd.textlinks.templates = data.templates;
            wpAd.textlinks.category = data.category;
            wpAd.textlinks.init(contentType, position, cnode);
          },
          error: function(){
            if(win.console && typeof win.console.log === 'function'){
              win.console.log('Quigo textlinks config AJAX error:');
              win.console.log(arguments);
            }
          }
        });
        return false;
      }

      contentType = wpAd.textlinks.templates[contentType] ? contentType : 'CompoundStory';
      cnode = wpAd.textlinks.cat_check(cnode);

      var cmpid = win.cmpid && win.cmpid.toLowerCase() || false,
          template = cmpid && wpAd.textlinks.templates[contentType][position][cmpid] || wpAd.textlinks.templates[contentType][position].standard;
      cnode = template[cnode] ? cnode : 'ros';

      if(wpAd.tools.urlCheck('debugAdCode') && win.console && typeof win.console.log === 'function') {
        win.console.log('template=', contentType);
        win.console.log('pos=', position);
        win.console.log('channel=', cnode);
        if(cmpid){
          win.console.log('Test Recipe:', 'cmpid=' + win.cmpid, template);
        } else{
          win.console.log('Standard Placement:', template);
        }
      }

      return wpAd.textlinks.build(template[cnode], position);
    },
    cat_check: function(cNode) {
      if(wpAd.textlinks.category[0][cNode]) {
        return cNode;
      }

      var categories = wpAd.textlinks.category,
        l = cNode.match(/\//) ? categories.length : 1,
        category, i;

      while(l--) {
        for(category in categories[l]) {
          i = categories[l][category].length;
          while(i--) {
            if(cNode.match(new RegExp('^' + categories[l][category][i] + '(\/|$)'))) {
              return category;
            }
          }
        }
      }
      return 'ros';
    },
    article_check: function() {
      return !wpAd.tools.urlCheck('_Comments.html') && (wpAd.tools.urlCheck('/wp-dyn/content/article/') || wpAd.tools.urlCheck('/wp-dyn/content/discussion/')) ? true : false;
    },
    index_check: function() {
      var k = ['politics', 'opinion', 'business', 'technology'],
        j = k.length,
        i;
      for(i = 0; i < j; i++) {
        if(commercialNode.match(k[i])) {
          return(commercialNode.match(k[i] + '/')) ? false : 'index';
        }
      }
      return 'index2';
    },
    blog_check: function() {
      return(wpAd.tools.urlCheck(/\/\d{4}\/\d{2}\/.*\.htm/gi)) ? 'blog_permalink' : 'blog_main';
    },
    //return the parsed document title
    getTitle: function() {
      var h = doc.title;
      if(h && h !== "undefined") {
        if(h.length > 100) {
          h = h.substring(0, 50) + "-" + h.substring(h.length - 50, h.length);
        }
      }
      return escape(h);
    },
    //return the meta keywords as an URL safe encoded String (limited to 100 chars)
    getMetaVals: function() {
      return encodeURIComponent((win.wp_meta_data.keywords || []).join(',')).replace(/\%2C/g, ',').slice(0, 100);
    },
    //get the target container to append the textlinks to
    getSlug: function(pos){
      return doc.getElementById('wpni_adi_' + pos) || doc.getElementById('slug_' + pos);
    },
    //build the quigo iframe URL, generate the iframe and pass it to wpAd.textlinks.render to render it
    build: function(template, position) {
      var url = window.location,
        adsonar_placementId = template[0],
        adsonar_pid = template[1],
        adsonar_ps = /^local/.test(commercialNode) ? '0' : '-1',
        adsonar_zw = template[2],
        adsonar_zh = template[3],
        rand = wpAd.cache.ord || Math.floor(Math.random() * 1E6),
        srcUrl = "http://ads.adsonar.com/adserving/getAds.jsp?previousPlacementIds=&placementId=" + adsonar_placementId + "&pid=" + adsonar_pid + "&ps=" + adsonar_ps + "&zw=" + adsonar_zw + "&zh=" + adsonar_zh + "&url=" + escape(url) + "&v=5&dct=" + wpAd.textlinks.getTitle() + "&metakw=" + wpAd.textlinks.getMetaVals();

      wpAd.textlinks.render(wpAd.tools.iframeBuilder({
        'src': srcUrl,
        'id': "adsonar_serve" + rand,
        'name': "adsonar_serve" + rand,
        'width': adsonar_zw,
        'height': adsonar_zh,
        'vspace': '0',
        'hspace': '0'
      }), 'sponsor_links_' + position);
      return true;
    },
    //render the iframe by appending it to the slug container div
    render: function(element, pos){
      var slug = wpAd.textlinks.getSlug(pos);
      if(slug){
        slug.appendChild(element);
      }
    }
  };

  wpAd.tools.initVITest = function(elements){
    //doing it this way, since waiting for document ready may miss the leaderboard view:
    if($.fn.viewable){
      $(elements).viewable({}, function(el, options){
        var what = el.id.replace('slug_', '');
        wpAd.tools.addPixel(wpAd.tools.vi_pixels[what][1], what + ' viewed');
      });
    } else{
      setTimeout(function(){ wpAd.tools.initVITest(elements); }, 100);
    }
  };

  wpAd.tools.vi_pixels = {
    'extra_bb': [
      'http://ad.doubleclick.net/ad/wpni.test/view1;sz=1x1;ord=[timestamp]',
      'http://ad.doubleclick.net/ad/wpni.test/view2;sz=1x1;ord=[timestamp]'
    ]
  };

  //homepage refresh modification:
  win.TWP = win.TWP || {};
  win.TWP.hpRefreshTests = win.TWP.hpRefreshTests || {};
  win.TWP.hpRefreshTests.adRefreshFunction = function() {
    return wpAd.flags.test_ads ? false : true;
  };

  //gog temp /front hack
  if(commercialNode === 'cityguide' && /^\/gog\/(index\.html)?/.test(location.pathname)){
    commercialNode += '/front';
  }

  //last chance to overwrite/add/modify keyvalues for specific or non-standard purposes:
  wpAd.config.hackBin = function () {

    //important that we clone this
    var tempcase = wpAd.tools.clone(wpAd.briefcase);

    //homepage hacks:
    if(wpAd.flags.is_homepage) {
      //20757-CD
      if(tempcase.what === 'leaderboard'){
        tempcase.where += '/lb';
      }
      if((tempcase.what === 'leaderboard' || tempcase.what === 'flex_bb_hp') && wpAd.flags.hpRefresh){
        tempcase.where += 'refresh';
      }
/*
      if(window.jQuery){
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
*/
      //20007-CD
      if(tempcase.what === 'pushdown'){
        var adi_push = doc.getElementById('wpni_adi_pushdown');
        if(adi_push){
          adi_push.style.backgroundImage = 'url(http://img.wpdigital.net/wp-adv/test/mstest/pushdown-ad-small.png)';
          adi_push.style.backgroundPosition = '-7px -100px';
        }
      }
    }

    if(tempcase.what === 'featrent' && window.jQuery){
      $('#wpni_adi_featrent').css({
        background: 'none',
        padding: '0'
      });
    }

    //
    if(/^tiffany_tile/i.test(tempcase.what)){
      if(wpAd.flags.is_homepage){
        tempcase.keyvalues.sz = ['184x90'];
      }
      //important to disable carousel
      wpTiles.hasTiff = true;
    }

    //20074-CD
    if(tempcase.what === 'flex_ss_bb_hp' && (tempcase.where === 'lifestyle/home' || tempcase.where === 'lifestyle/home/front' || tempcase.where === 'lifestyle/home-garden')){
      tempcase.where += '/flex';
    }

    //Viewable Impression unique zone + exclusions:
    if(tempcase.delivery === 'vi'){
      tempcase.where += '/viewable';
      tempcase.keyvalues['!c'].push('media', 'intrusive');
    }

    //persistant_bb render when viewable
    if(tempcase.defaults.what === 'persistent_bb' && /viewable_test/.test(location.search)){
      tempcase.delivery = 'vi';
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

    //viewable impression pixel test:
    if(wpAd.tools.vi_pixels[tempcase.what] && wpAd.flags.vi_test){
      wpAd.tools.addPixel(wpAd.tools.vi_pixels[tempcase.what][0], tempcase.what + ' impression');

      if(!wpAd.flags.vi_script_loaded && !$.fn.viewable){
        wpAd.flags.vi_script_loaded = true;
        wpAd.tools.loadScript('http://js.washingtonpost.com/wp-srv/ad/$.viewable.js');
      }

      wpAd.tools.initVITest('#slug_' + tempcase.what);
    }

    //20892 - CW - WP plus pixel
    if(!wpAd.wpPlusPixelAdded){
      wpAd.wpPlusPixelAdded = true;
      if(/^jobs/i.test(tempcase.where)){
        wpAd.tools.loadScript('http://pixel.mathtag.com/event/js?mt_id=189665&mt_adid=109479&v1=&v2=&v3=&s1=&s2=&s3=');
      }
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

  //20999 - JH - brand connect tracking:
  if(win.jQuery){
    $(function(){
      var bcdiv = $('div.brand-connect-module');
      if(bcdiv.length){
        $.ajax({
          cache: true,
          dataType: 'script',
          crossDomain: true,
          url: 'http://js.washingtonpost.com/wp-srv/ad/brandConnectTracking.js',
          timeout: 2000,
          error: function(err){
            if(wpAd.flags.debug){
              try{win.console.log('brandConnectTracking.js timeout error:', err);}catch(e){}
            }
          },
          success: function(data){
            wpAd.brandConnect.init();
            if(wpAd.flags.debug){
              try{win.console.log('brandConnectTracking.js', 'loaded:');}catch(e){}
            }
          }
        });
      }
    });
  }

})(window, document, wpAd);