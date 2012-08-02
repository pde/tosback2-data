/*global commercialNode:true, wp_quantcast, wp_meta_data, estNowWithYear, placeAd2, wpAd*/
(function (window, wpAd, undefined) {
  
  'use strict';
 
  wpAd.config = wpAd.config || {};

  if(!wpAd.flags.no_ads) {
    //ADD THE TEMPLATES - generated via flight manager tool:
    document.write('<scr' + 'ipt type="text/javascript" src="' + (document.domain ? 'http://js.washingtonpost.com/wp-srv/ad' : 'wp-ad-scripts') + '/slate_config.js"></scr' + 'ipt>');
  }

  //Friendly Iframe supported domains and URL's:
  wpAd.config.fifDomains = {
    'www.slate.com': 'http://www.slate.com/fif.html',
    'www.dev.slate.com': 'http://www.dev.slate.com/fif.html',
    'pub1.dev.slate.com': 'http://pub1.dev.slate.com/fif.html',
    'www.washingtonpost.com': 'http://www.washingtonpost.com/wp-srv/ad/fif.html' //for SPS test pages only
  };

  wpAd.constants = {
    'wpniSite': 'slate',
    'wpniDomain': 'slate.com',
    'fifURL': (function () {
      if(!document.domain) {
        return './fif.html'; //local test pages
      }
      var d = wpAd.config.fifDomains, key;
      for(key in d) {
        if(new RegExp(key, 'i').test(document.domain)) {
          return d[key];
        }
      }
      //no FIF support on current domain:
      wpAd.flags.test_fif = false;
      return false;
    })()
  };
  
  //legacy quantcast code - may still be on some older pages:
  if(window.wp_quantcast) {
    try {
      wp_quantcast.exec('p-5cYn7dCzvaeyA');
    } catch(e) {}
  }

  //slate specific flags
  wpAd.flags.testEnv = !!wpAd.tools.urlCheck(/http:\/\/www\.dev\.slate\.com|http:\/\/pub1\.dev\.slate\.com/);
  wpAd.flags.hpRefresh = !!wpAd.tools.urlCheck('reload=true');

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
        wpAd.cache.dept = window.PStax ? [window.PStax] : [];
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
    document.write("<style type=\"text\/css\">#slug_pushdown { background-color:#660033 } #pushdown_ad { width:970px;margin:0 auto;text-align:center }<\/style>");
  }*/

  //ad refresh on gallery pages
  window.wpniAds = window.wpniAds || {};
  window.wpniAds.gallery = {
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
    if(window.crtg_content){
      tempcase.keyvalues.onTheFly += window.crtg_content;
    }

    return tempcase;
  };

})(window, wpAd);