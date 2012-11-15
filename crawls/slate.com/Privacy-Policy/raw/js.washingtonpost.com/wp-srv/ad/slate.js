/*global commercialNode:true, wp_quantcast, wp_meta_data, estNowWithYear, placeAd2, wpAd*/
(function (win, doc, wpAd, undefined) {
  
  'use strict';

  wpAd.config = wpAd.config || {};
  
  //20353 - mini overlay hack:
  if((estNowWithYear.substr(0,8) === '20121022' && commercialNode === 'homepage' && !wpAd.tools.getCookie('mini_overlay_served')) || wpAd.tools.urlCheck('mini_overlay_test=true')){
    var mini_date = new Date();
    mini_date.setDate(mini_date.getDate()+1);
    wpAd.tools.setCookie('mini_overlay_served', 'true', mini_date.toGMTString(), '/', 'slate.com');
    wpAd.tools.writeScript('http://ads.jetpackdigital.com/lineitems/8460/jpd.js?n=' + Math.floor(Math.random()*1E7));
  }

  //Friendly Iframe supported domains and URL's:
  wpAd.config.fifDomains = {
    'www.slate.com': 'http://www.slate.com/fif.html',
    'www.dev.slate.com': 'http://www.dev.slate.com/fif.html',
    'pub1.dev.slate.com': 'http://pub1.dev.slate.com/fif.html',
    'www.washingtonpost.com': 'http://www.washingtonpost.com/wp-srv/ad/fif.html' //for SPS test pages only
  };

  wpAd.constants = {
    'ad_config_url': /ad_config_url\=/.test(location.search) ? decodeURIComponent(location.search.split(/ad_config_url\=/)[1].split(/&/)[0]) : 'http://js.washingtonpost.com/wp-srv/ad/slate_config.js',
    'site': 'slate',
    'domain': 'slate.com',
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
  }
  
  //legacy quantcast code - may still be on some older pages:
  if(win.wp_quantcast) {
    try {
      wp_quantcast.exec('p-5cYn7dCzvaeyA');
    } catch(e) {}
  }

  //slate specific flags
  wpAd.flags.testEnv = !!wpAd.tools.urlCheck(/http:\/\/www\.dev\.slate\.com|http:\/\/pub1\.dev\.slate\.com/);

  //called on first placeAd2 call, before wpAd.cache.init is called
  //conditional ad flights, etc., can be added here
  wpAd.config.init = function () {
    if(wpAd.tools.urlCheck('test_ads=agoogleaday')){
      wpAd.config.templates.agoogleadaytest = {
        what: ['agoogleaday']
      };
    }
  };

  //called via wpAd.cache.init:
  wpAd.config.front = function () {
    return !!/^homepage/.test(commercialNode);
  };

  //slate specific keyvalues
  wpAd.config.keyvalues = {
    amazon: {
      exec: function(){
        var args = doc.amzn_args || win.amzn_args || false;
        if(args){
          for(var key in args){
            if(args.hasOwnProperty(key)){
              wpAd.briefcase.keyvalues[key] = args[key];
            }
          }
        }
      }
    },
    page: function () {
      return wpAd.cache.hasOwnProperty('page') ? wpAd.cache.page : (function () {
        if(typeof wp_meta_data !== 'undefined' && wp_meta_data.contentType && wpAd.tools.zoneBuilder.contentType[wp_meta_data.contentType[0]]) {
          wpAd.cache.page = [wpAd.tools.zoneBuilder.contentType[wp_meta_data.contentType[0]]];
          return wpAd.cache.page;
        }
        //default to article and check for homepage
        wpAd.cache.page = commercialNode !== 'homepage' ? ['article'] : ['front'];
        return wpAd.cache.page;
      })();
    },
    dept: function () {
      return wpAd.cache.hasOwnProperty('dept') ? wpAd.cache.dept : (function () {
        wpAd.cache.dept = win.PStax ? [win.PStax] : [];
        return wpAd.cache.dept;
      })();
    },
    articleId: function () {
      return wpAd.cache.hasOwnProperty('articleId') ? wpAd.cache.articleId : (function () {
        var href = location.href.split('/'),
          title = href[href.length-1].split(/\..*?\.html|\.html/)[0],
          len, i;

        wpAd.cache.articleId = '';

        if(title){
          len = title.length;
          if(len > 30){
            title = title.split('_');
            for(i = 0; i < len; i++){
              if(title[i]){
                wpAd.cache.articleId = wpAd.cache.articleId + title[i].slice(0,1);
              }
            }
          } else{
            wpAd.cache.articleId = title;
          }
        }
        return wpAd.cache.articleId;
      })();
    }
  };

  //need to rewrite this or include in pushdown template in dfp:
  /*if(typeof commercialNode!='undefined' && commercialNode=='homepage'){
    doc.write("<style type=\"text\/css\">#slug_pushdown { background-color:#660033 } #pushdown_ad { width:970px;margin:0 auto;text-align:center }<\/style>");
  }*/

  //ad refresh on gallery pages
  win.wpniAds = win.wpniAds || {};
  win.wpniAds.gallery = {
    count: 0,
    picViews : estNowWithYear <= '201207020600' ? 1 : 5,
    refresh: function () {
      this.count++;
      if(this.count % this.picViews === 0){
        placeAd2(commercialNode, "leaderboard", "AJAX", "");
        placeAd2(commercialNode, "bigbox", "AJAX", "");
      }
    }
  };

  wpAd.config.hackBin = function () {

    //important that we clone this
    var tempcase = wpAd.tools.clone(wpAd.briefcase);

    if(tempcase.what === 'rightflex' && tempcase.where === 'homepage'){
      tempcase.where += '/hp' + (wpAd.flags.hpRefresh ? 'refresh' : '');
    }

    //18477-CD-CRITEO implementation
    if(win.crtg_content){
      tempcase.keyvalues.onTheFly += win.crtg_content;
    }

    return tempcase;
  };

})(window, document, wpAd);