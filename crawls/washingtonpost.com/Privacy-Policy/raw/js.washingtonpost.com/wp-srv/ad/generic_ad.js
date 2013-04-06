/*global commercialNode:true,wp_meta_data:true,escape,unescape,TWP,estNowWithYear,dfpcomp,spec_ord,console,$,postscribe*/
var wpAd, placeAd2;

(function (win, doc, undefined) {

  'use strict';

  wpAd = {
    //this is function is called on the FIRST placeAd2 call only
    init: function () {
      if(!win.jQuery){
        wpAd.tools.writeScript('http://js.washingtonpost.com/wpost/js/combo?token=20121010232000&c=true&m=true&context=eidos&r=/jquery-1.7.1.js');
      }
      if(typeof wpAd.config.init === 'function') {
        wpAd.config.init();
      }
      wpAd.cache.init();
    },
    //delayed ad injection:
    dai: {
      queue: [],
      delay: 500,
      init: function(pos){
        wpAd.dai.queue.push(pos);
        if(!wpAd.dai.initialised && win.jQuery){
          wpAd.dai.initialised = true;
          $(function(){
            wpAd.dai.timeout = setTimeout(wpAd.dai.exec, wpAd.dai.delay);
          });
        }
      },
      exec: function(){
        var adToMove, slug, item;
        while(wpAd.dai.queue.length){
          item = wpAd.dai.queue.shift();
          slug = doc.getElementById('wpni_adi_' + item) || doc.getElementById('slug_' + item);
          adToMove = doc.getElementById('dai_' + item);
          if(slug && adToMove){
            slug.appendChild(adToMove);
            adToMove.style.display = 'block';
            if(wpAd.flags.debug && win.console){
              console.log('moved', item, adToMove, 'into', slug);
            }
          }
        }
        wpAd.dai.executed = true;
      }
    },
    exec: {
      vi: function(){
        if(!wpAd.viewableImpressions){
          wpAd.viewableImpressions = [];
          if(!$.fn.viewable){
            wpAd.tools.loadScript('http://js.washingtonpost.com/wp-srv/ad/$.viewable.js', wpAd.tools.initViewableImpressions);
          } else {
            wpAd.tools.initViewableImpressions();
          }
        }
        var slug = doc.getElementById('slug_' + wpAd.briefcase.pos);
        if(slug){
          wpAd.viewableImpressions.push(slug);
          //set a height so that we can measure when 50% of the ad is visible:
          slug.style.height = wpAd.config.adtypes[wpAd.briefcase.what].size[0][1] + 'px';
        }
      },
      adj: function () {
        var slug = doc.getElementById('wpni_adi' + wpAd.briefcase.pos) || doc.getElementById('slug_' + wpAd.briefcase.pos);
        if(wpAd.flags.postscribe && slug){
          postscribe('#' + slug.id, wpAd.tools.tagBuilder());
        } else{
          doc.write(wpAd.tools.tagBuilder());
        }
      },
      pfadx: function () {
        //this is lame, but we have no choice at the moment:
        doc.write(wpAd.tools.tagBuilder('adj'));
      },
      pfadxjs: function(){
        //append script to the head
        wpAd.tools.addScript(wpAd.briefcase.dcUrl);
      },
      adi: function () {
        var briefcase = arguments[0] || wpAd.briefcase,
          pos = briefcase.pos,
          what = briefcase.what,
          slug = doc.getElementById('wpni_adi_' + pos) || doc.getElementById('slug_' + pos);
        if(slug) {
          wpAd.tools.removeChildren(slug);
          slug.appendChild(wpAd.tools.iframeBuilder({
            "src": briefcase.dcUrl,
            "id": "ad_iframe_" + pos,
            "name": "ad_iframe_" + pos,
            "width": wpAd.config.adtypes[what].size[0][0],
            "height": wpAd.config.adtypes[what].size[0][1]
          }));
        } else {
          doc.write(wpAd.tools.tagBuilder());
        }
      },
      fif: function () {
        wpAd.briefcase.fif = true;
        var pos = arguments[0] || wpAd.briefcase.pos,
          slug = doc.getElementById('wpni_adi_' + pos) || doc.getElementById('slug_' + pos);

        if(slug) {
          //wpAd.tools.removeChildren(slug);
          slug.appendChild(wpAd.tools.iframeBuilder({
            "src": wpAd.constants.fifURL,
            "id": "fif_" + pos,
            "name": "fif_" + pos
          }));
        } else {
          doc.write(wpAd.tools.tagBuilder());
        }
      },
      hardcode: function () {
        //if hardcode is a function, execute it:
        var hc = typeof wpAd.briefcase.hardcode === 'function' ? wpAd.briefcase.hardcode() : wpAd.briefcase.hardcode,
          slug;
        if(hc) {
          slug = doc.getElementById('wpni_adi_' + wpAd.briefcase.pos) || doc.getElementById('slug_' + wpAd.briefcase.pos);
          //else if hc is an html element, append it,
          if(typeof hc === 'object' && hc.tagName) {
            if(slug) {
              slug.appendChild(hc);
            }
          }
          //else we need to just document.write it.
          else if(typeof hc === 'string') {
            if(wpAd.flags.postscribe && slug){
              postscribe('#' + slug.id, wpAd.tools.escapeScriptTags(hc));
            } else{
              doc.write(wpAd.tools.escapeScriptTags(hc));
            }
          }
        }
      },
      ajax: function () {
        var pos = wpAd.briefcase.pos,
          what = wpAd.briefcase.what,
          slug = doc.getElementById('wpni_adi_' + pos) || doc.getElementById('slug_' + pos);
        if(slug) {
          wpAd.tools.removeChildren(slug);
          slug.appendChild(wpAd.tools.iframeBuilder({
            "src": wpAd.briefcase.dcUrl,
            "id": "ad_iframe_" + pos,
            "name": "ad_iframe_" + pos,
            "width": wpAd.config.adtypes[what].size[0][0],
            "height": wpAd.config.adtypes[what].size[0][1]
          }));
        }
      },
      keysval: function () {
        var keysVal = '',
          key, b;
        for(key in wpAd.briefcase.keyvalues) {
          if(wpAd.briefcase.keyvalues.hasOwnProperty(key)) {
            if(key !== 'onTheFly') {
              if(typeof wpAd.briefcase.keyvalues[key] !== 'object' && wpAd.briefcase.keyvalues[key] !== '') {
                wpAd.briefcase.keyvalues[key] = [wpAd.briefcase.keyvalues[key]];
              }
              b = wpAd.briefcase.keyvalues[key].length;
              while(b--) {
                keysVal = keysVal + key + '=' + wpAd.briefcase.keyvalues[key][b] + ';';
              }
            } else {
              keysVal += wpAd.briefcase.keyvalues.onTheFly;
            }
          }
        }
        keysVal = keysVal.slice(0, keysVal.length - 1);
        return keysVal;
      }
    },
    cleanScriptTags: function () {
      var ad = wpAd.tools.adsToBeCleaned.length,
        s, slug, scripts;
      while(ad--) {
        slug = doc.getElementById('slug_' + wpAd.tools.adsToBeCleaned[ad]);
        if(slug) {
          scripts = slug.getElementsByTagName('script');
          s = scripts.length;
          while(s--) {
            if(scripts[s].src && /serving-sys.com/i.test(scripts[s].src)) {
              scripts[s].src = "#";
            }
          }
        }
      }
    },
    tools: {
      adsToBeCleaned: [],
      addCSS: function (b) {
        var a = doc.createElement('link');
        a.href = b;
        a.rel = 'stylesheet';
        a.type = 'text/css';
        doc.getElementsByTagName('head')[0].appendChild(a);
        return true; //this needs to return a true value because of the way that the google ads are written via the hardcode
      },
      addElement: function (el, o) {
        var key;
        el = typeof el === 'string' ? doc.createElement(el) : el;

        if(arguments[1] && typeof arguments[1] === 'object') {
          if(o.css) {
            for(key in o.css) {
              if(o.css.hasOwnProperty(key)) {
                el.style[key] = o.css[key];
              }
            }
            delete o.css;
          }
          if(o.appendTo) {
            var appendTo = typeof o.appendTo === 'string' ? doc.getElementById(o.appendTo) : o.appendTo;
            if(appendTo) {
              appendTo.appendChild(el);
            }
            delete o.appendTo;
          }
          for(key in o) {
            if(o.hasOwnProperty(key)) {
              el[key] = o[key];
            }
          }
        }
        return el;
      },
      addPixel: function(url){
        var i = doc.createElement('img');
        i.src = url.replace(/\[timestamp\]|%n|\[random\]/gi, Math.floor(Math.random() * 1E9));
        i.width = '1';
        i.height = '1';
        i.alt = arguments[1] || '';
        i.style.display = 'none';
        i.style.border = '0';
        doc.body.appendChild(i);
      },
      addScript: function(){
        var l = arguments.length,
          h = doc.getElementsByTagName('head')[0],
          i = 0, s;
        for(i;i<l;i++){
          s = doc.createElement('script');
          s.type = 'text/javascript';
          s.src = arguments[i];
          h.appendChild(s);
        }
      },
      adopsDebug: function () {
        if(wpAd.flags.debug) {
          if(!doc.getElementById('adopsDebugDiv')) {
            var d = wpAd.tools.addElement('div', {
              css: {
                fontSize: '9px',
                textAlign: 'left',
                fontFamily: 'Verdana,Arial,Helvetica,sans-serif',
                padding: '10px',
                marginBottom: '10px',
                borderBottom: '1px solid #a8a1a1',
                backgroundColor: '#e1e1e8'
              },
              innerHTML: "<p style='margin:0px 0px 5px 0px;padding:0px;font-size:14px;color:#272127'>AdOps Debug Info&nbsp;<a href='javascript:wpAd.tools.adopsDebugToggle()' style='font-weight:bold;font-size:10px' id='adopsDebugToggle'>Show Data</a></p>"
            });
            wpAd.tools.addElement('div', {
              appendTo: d,
              css: {
                display: 'none'
              },
              id: 'adopsDebugDiv'
            });

            doc.body.insertBefore(d, doc.body.firstChild);
          }
          wpAd.tools.addElement('div', {
            css: {
              padding: '10px 0',
              lineHeight: '12px',
              borderTop: '1px dashed #aaa'
            },
            innerHTML: '<div style="margin-bottom:4px;"><span style="color:#360;font-size:12px;font-weight:bold;">' + wpAd.briefcase.pos + ': </span><span style="color:#000;font-size:14px;">placeAd2("' + wpAd.briefcase.defaults.where + '","' + wpAd.briefcase.defaults.what + '","' + wpAd.briefcase.defaults.delivery + '","' + wpAd.briefcase.defaults.onTheFly + '");</span></div>' + (wpAd.briefcase.id ? '<div style="font-weight:bold;">Successful Template: <span style="color:#369;">' + wpAd.briefcase.id + '</span></div>' : '') + '<div>' + ((wpAd.briefcase.keyvalues || wpAd.briefcase.hardcode) ? (!wpAd.briefcase.hardcode ? wpAd.briefcase.dcUrl : '<span style="color:#770077;font-weight:bold;">Hardcoded: </span><textarea cols="150" rows="3" style="display:block;padding:3px;">' + wpAd.briefcase.hardcode + '</textarea>') : '<span style="font-style:italic;color:#a00">Failed template check.</div>') + '</div>',
            appendTo: doc.getElementById('adopsDebugDiv')
          });
        }
      },
      adopsDebugToggle: function () {
        var toggleButton = doc.getElementById('adopsDebugToggle'),
          adopsDebugDiv = doc.getElementById('adopsDebugDiv');
        adopsDebugDiv.style.display = (toggleButton.innerHTML === 'Show Data') ? 'block' : 'none';
        toggleButton.innerHTML = (toggleButton.innerHTML === 'Show Data') ? 'Hide Data' : 'Show Data';
      },
      ajax: function(config){
        if(win.$){
          win.$.ajax(config);
        } else if(config.url) {
          wpAd.tools.loadScript(config.url + (config.data ? (function(d){
            var rv = [], key;
            for(key in d){
              rv.push(key + '=' + d[key]);
            }
            return '?' + rv.join('&');
          })(config.data) : ''), config.success);
        }
      },
      charToCodeAt: function (arg) {
        var rv = '',
          l = arg.length,
          j;
        for(j = 0; j < l; j++) {
          rv += (arg.charAt(j).match(/[^a-zA-Z0-9]/gi)) ? '_' + arg.charCodeAt(j).toString(16) : arg.charAt(j);
        }
        return rv;
      },
      checkCookieVal: function (cookieName, val) {
        var cookie = wpAd.tools.getCookie(cookieName),
          l;
        if(cookie) {
          if(typeof val === 'string') {
            val = [val];
          }
          l = val.length;
          while(l--) {
            if(cookie.match(val[l])) {
              return true;
            }
          }
        }
        return false;
      },
      checks: {
        exec: function (template) {
          var val, rule;
          for(rule in wpAd.tools.checks) {
            if(wpAd.tools.checks.hasOwnProperty(rule) && template[rule]){
              if(typeof template[rule] === 'string' || typeof template[rule] === 'boolean') {
                template[rule] = [template[rule]];
              }
              val = template[rule].length;
              this.check = null; //evaluates to false, but isn't === false. Important for the logic in these checks.
              while(val--) {
                //this is a bit strange but is to ensure that if this.check is set to false in the "where" or "what" check (with a ! in template), it will always fail, as opposed to just being null and not passing the specific check
                if(this[rule](template[rule][val], template) && this.check !== false) {
                  this.check = true;
                }
              }
              //if this.check === false || this.check === null
              if(!this.check) {
                return false;
              }
            }
          }
          return true;
        },
        test: function(template_value, obj){
          return typeof template_value === 'function' ? template_value() : template_value;
        },
        where: function (template_value, obj) {
          if(/^\!/.test(template_value)) {
            if(commercialNode.match(template_value.split('!')[1])){
              //this template will fail and the ad will not show
              this.check = false;
              return false;
            } else {
              return true;
            }
          }
          return commercialNode.match(template_value) ? true : false;
        },
        page_id: function (template_value, obj) {
          return template_value.replace(/\./g, '-') === wpAd.cache.page_id ? true : false;
        },
        when: function (template_value, obj) {
          var dates = template_value.split('/');
          return estNowWithYear >= dates[0] && estNowWithYear <= dates[1] ? true : false;
        },
        cookie_check: function (template_value, obj) {
          for(var key in template_value) {
            if(template_value.hasOwnProperty(key) && !wpAd.tools.checkCookieVal(key, template_value[key])) {
              return false;
            }
          }
          return true;
        },
        url_check: function(template_value, obj){
          return !!(typeof template_value === 'string' ? new RegExp(template_value) : template_value).test(location.href);
        },
        is_local: function(template_value, obj){
          return template_value === wpAd.flags.is_local;
        },
        what: function (what, obj) {
          if(/^\!/.test(what)) {
            //this template will fail and the ad will not show
            var ad = what.split('!')[1];
            if(wpAd.templates[ad]) {
              delete wpAd.templates[ad];
            }
          } else {
            //temp object created for each "what" value
            var temp = {};
            if(/\*$/.test(what)){
              what = what.split(/\*/)[0];
              temp.openAll = true;
            }
            wpAd.templates[what] = wpAd.templates[what] || {};
            wpAd.templates[what].id = obj.id;
            wpAd.templates[what].openAll = temp.openAll || false;
            if(obj.hardcode && !obj.preempt) {
              wpAd.templates[what].hardcode = obj.hardcode;
            }
          }
          return true;
        }
      },
      //clones an object (ie: wpAd.briefcase cloned in hackbin)
      clone: function (obj) {
        if(obj === null || typeof (obj) !== 'object') {
          return obj;
        }
        var temp = new obj.constructor(),
          key;
        for(key in obj) {
          if(key !== '') {
            temp[key] = wpAd.tools.clone(obj[key]);
          }
        }
        return temp;
      },
      convertOldPosValue: function(pos){
        var convert = {
          'ad1': 'leaderboard',
          'ad2': 'leaderboard_2',
          'ad3': 'skyscraper',
          'ad6': 'flex_ss_bb_hp',
          'ad7': 'featurebar',
          'ad14': 'tiffany_tile',
          'ad16': 'flex_bb_hp',
          'ad19': '336x35',
          'ad20': 'bigbox',
          'ad43': 'pushdown',
          'ad44': 'extra_bb',
          'ad45': 'deal'
        };
        return convert[pos] ? convert[pos] : pos;
      },
      dcFileType: function () {
        var types = {
          'adj': 'adj',
          'fif': 'adj',
          'ajax': 'adi',
          'adi': 'adi',
          'pfadx': 'pfadx',
          'pfadxjs': 'pfadx'
        };
        return types[wpAd.briefcase.delivery] ? types[wpAd.briefcase.delivery] : 'adi';
      },
      dcnode: function(){
        return wpAd.flags.dcnode;
      },
      dcUrl: function () {
        return 'http://ad.doubleclick.net/' + (wpAd.flags.network_id ? wpAd.flags.network_id : 'N701') + '/' + wpAd.tools.dcFileType() + '/' + wpAd.constants.site + '.' + wpAd.briefcase.where + ';' + wpAd.exec.keysval() + '?';
      },
      debug: function () {
        if(wpAd.flags.debug) {
          var a = doc.getElementById('wpni_adi_' + wpAd.briefcase.pos) || doc.getElementById('slug_' + wpAd.briefcase.pos),
            html = '<div style="line-height:normal;position:absolute;float:left;z-index:10000000"><div style="border:1px solid #000;text-align:left;text-transform:none;letter-spacing:normal;line-spacing:normal;padding:8px;width:320px;background-color:#FA0;color:#5B24FF5B24FF;font-family:verdana;font-size:10px;word-wrap:break-word;text-wrap:unrestricted;font-weight:normal;"><div style="font-weight:bold;line-height:14px;">' + wpAd.briefcase.pos + ':</div><div>' + (!wpAd.briefcase.hardcode ? wpAd.briefcase.dcUrl : '<div>Hardcoded:</div><textarea cols="56" rows="8" style="font-size:10px;display:block;padding:3px;width:310px;background-color:#eeeeee;border:1px solid #333;">' + wpAd.briefcase.hardcode + '</textarea>') + '</div></div></div>';

          if(a) {
            wpAd.tools.addElement('div', {
              appendTo: a,
              innerHTML: html,
              css: {
                position: 'relative',
                cssFloat: 'left',
                zIndex: 1E7
              }
            });
          } else {
            doc.write(html);
          }
        }
      },
      deliveryType: function (delivery) {
        if(!delivery) {
          return wpAd.flags.test_fif ? 'fif' : 'adj';
        }
        var types = {
          'adj': wpAd.flags.test_fif ? 'fif' : 'adj',
          'dai': wpAd.flags.test_fif ? 'fif' : 'adj',
          'ajax': 'ajax',
          'adi': 'adi',
          'iframe': 'adi',
          'inline': 'adi',
          'fif': 'fif',
          'pfadx': 'pfadx',
          'pfadxjs': 'pfadxjs',
          'vi': 'vi'
        };
        delivery = delivery.toLowerCase();
        //delayed ad injection
        if(delivery === 'dai'){
          wpAd.dai.init(wpAd.briefcase.pos);
        }
        return types[delivery] ? types[delivery] : 'adj';
      },
      demoAds: function () {
        var demoAds = wpAd.flags.demoAds.replace(/;$/, '').split(';'),
          l = demoAds.length,
          obj = {};
        while(l--) {
          if(demoAds[l] === 'tiffanytile' && wpAd.constants && wpAd.constants.site === 'wpni'){
            obj.tiffany_tile = {};
            obj.tiffany_tile_2 = {};
          } else {
            obj[wpAd.tools.convertOldPosValue(demoAds[l])] = {};
          }
        }
        return obj;
      },
      escapeScriptTags: function (str) {
        return str.replace(/<\/script/gi, '<\/script');
      },
      estNowWithYear: typeof estNowWithYear !== 'undefined' ? estNowWithYear : (function () {
        var a = new Date(),
          e = a.getTime(),
          t = a.getDate(),
          // z = get date of the first sunday in the current month.
          z = (a.getDate() - a.getDay()) % 7,
          // s = if the current date is or before the first sunday of the current month, then the result will be 7 less than . This check returns the correct date of the first sunday of this month.
          s = (z <= 0) ? z + 7 : z,
          n = a.getMonth() + 1,
          m = (a.getTimezoneOffset() - ((n < 3 || n > 11) ? 300 : (n > 3 && n < 11) ? 240 : (n === 3) ? (t > (s + 7) || (t === (s + 7) && a.getHours() >= 2)) ? 240 : 300 : (t > s || (t === s && a.getHours() >= 2)) ? 300 : 240)) * 60000,
          b = new Date(e + m),
          d = '' + ((b.getYear() < 1900) ? b.getYear() + 1900 : b.getYear()) + (((b.getMonth() + 1) < 10) ? "0" + (b.getMonth() + 1) : (b.getMonth() + 1)) + ((b.getDate() < 10) ? "0" + b.getDate() : b.getDate()) + ((b.getHours() < 10) ? "0" + b.getHours() : b.getHours()) + ((b.getMinutes() < 10) ? "0" + b.getMinutes() : b.getMinutes());
        win.estNowWithYear = d.toString();
        return win.estNowWithYear;
      })(),
      extendTemplates: function(flights){
        for(var key in flights){
          if(flights.hasOwnProperty(key) && !wpAd.config.templates.hasOwnProperty(key)){
            wpAd.config.templates[key] = flights[key];
          }
        }
      },
      generateTemplate: function () {
        if(!wpAd.flags.demoAds) {
          wpAd.templates = {};
          if(wpAd.config.tiffanyTiles){
            wpAd.tools.extendTemplates(wpAd.config.tiffanyTiles);
          }
          for(var key in wpAd.config.templates) {
            if(wpAd.config.templates.hasOwnProperty(key)){
              wpAd.config.templates[key].id = key;
              wpAd.tools.checks.exec(wpAd.config.templates[key]);
            }
          }
        } else {
          wpAd.templates = wpAd.tools.demoAds();
        }
      },
      getCookie: function (name) {
        var cookie = " " + doc.cookie,
          search = " " + name + "=",
          str = null,
          offset = 0,
          end = 0;
        if(cookie.length > 0) {
          offset = cookie.indexOf(search);
          if(offset !== -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if(end === -1) {
              end = cookie.length;
            }
            str = unescape(cookie.substring(offset, end));
          }
        }
        return(str);
      },
      iframeBuilder: function (atts) {
        var i = doc.createElement('iframe'),
          key;

        atts = atts || {};

        //defaults
        i.frameBorder = "0";
        i.height = "0";
        i.width = "0";
        i.scrolling = "no";
        i.marginHeight = "0";
        i.marginWidth = "0";

        for(key in atts) {
          if(atts.hasOwnProperty(key)) {
            i[key] = atts[key];
          }
        }

        return i;
      },
      initViewableImpressions: function(){
        $(function(){
          if(wpAd.viewableImpressions){ //wpAd.viewableImpressions Array
            $(wpAd.viewableImpressions).viewable({}, wpAd.tools.viewable_cb); //initialise the plugin
          }
        });
      },
      interstitial: function(){
        if(doc.cookie && !wpAd.flags.hpRefresh && !wpAd.flags.no_interstitials){
          var name = 'wp_pageview',
          cookieVal = wpAd.tools.getCookie(name),
          rv = true,
          time = new Date(parseInt(new Date().getTime(), 10) + 432E5).toString();
          if(cookieVal){
            rv = Number(cookieVal)%3 ? false : true;
            wpAd.tools.setCookie(name, Number(cookieVal) + 1, time, '/', wpAd.constants.domain);
          } else {
            wpAd.tools.setCookie(name, '1', time, '/', wpAd.constants.domain);
          }

          return rv;
        }
        return false;
      },
      //async load script with optional callback function as 2nd arg
      //potentially replace wpAd.tools.addScript with this
      loadScript: function(src) {
        var s = doc.createElement('script'),
          target = doc.body || doc.getElementsByTagName('head')[0] || false,
          callback = arguments[1] || false;
        if(target){
          s.type = 'text/' + (src.type || 'javascript');
          s.src = src.src || src;
          if(typeof callback === 'function'){
            s.onreadystatechange = s.onload = function() {
              var state = s.readyState;
              if (!callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
              }
            };
          }
          target.appendChild(s);
        }
      },
      metaCheck: function (arry) {
        var regex = '\\b',
          len;

        if(typeof arry === 'object') {
          len = arry.length;
          while(len--) {
            regex += arry[len] + '(|s|es|ed|ing|er)' + (len !== 0 ? '\\b|' : '') + '\\b';
          }
        } else {
          regex += arry + '(|s|es|ed|ing|er)' + '\\b';
        }

        if(wpAd.cache.keywords.search(new RegExp(regex)) !== -1) {
          return true;
        }
        return false;
      },
      // fallback for the placeAd legacy function
      placeAd: function () {
        try {
          console.warn('The "placeAd" function is no longer supported.\nPlease contact adOps for updated ad code');
        } catch(e) {}
        placeAd2(arguments[1], arguments[0], false, '');
      },
      posOverride: function (what) {
        wpAd.briefcase.pos_override = 0;
        if(/\|/.test(what)) {
          what = what.split('|');
          if(!wpAd.config.adtypes[what.join('_')]){
            wpAd.briefcase.pos_override = what[1];
            what = what[0];
          } else{
            what = what.join('_');
          }
        }
        return what;
      },
      postLoadDebug: function () {
        var s = doc.getElementsByTagName('script'),
          a = s.length;

        while(a--) {
          if(s[a].innerHTML.match('placeAd') && s[a].parentNode.nodeName.toLowerCase() !== 'head') {
            s[a].parentNode.innerHTML += wpAd.tools.postLoadDebugBox(s[a].parentNode.innerHTML);
          }
        }
      },
      postLoadDebugBox: function (ac) {
        var debugLink = '',
          possAdIds = ac.match(/[^\d]\d{7,9}[^\d]/gi);

        if(possAdIds) {
          var newPAI = '',
            id = possAdIds.length,
            stripped;

          while(id--) {
            stripped = possAdIds[id].substring(1, possAdIds[id].length - 1);
            if(!newPAI.match(stripped)) {
              newPAI += stripped + ', ';
            }
          }
          debugLink = '<div style="color:#000000;font-weight:bold;text-decoration:none"><span style="font-style:italic;">Possible</span> Ad Ids: ' + (newPAI !== '' ? newPAI : '<span style="font-style:italic;">NONE</span>') + '</div>';
        }

        return '<div style="position:relative;float:left;z-index:1000000000;border:1px solid #000"><div style="text-align:left;text-transform:none;letter-spacing:normal;line-spacing:normal;padding:8px;position:absolute:top:0px;left:0px;width:300px;background-color:#D9CCFF;color:#5B24FF;font-family:verdana;font-size:9px;word-wrap:break-word;text-wrap:unrestricted;overflow:auto">' + debugLink + wpAd.tools.textifyCode(ac) + '</div></div>';
      },
      removeChildren: function (slug) {
        if(typeof slug === 'string') {
          slug = doc.getElementById(slug);
        }
        if(slug && slug.hasChildNodes()) {
          var l = slug.childNodes.length;
          while(l--) {
            //need to check back on this....
            slug.removeChild(slug.childNodes[l]);
          }
        }
      },
      setCookie: function (name, val, expires, path, domain, secure) {
        doc.cookie = name + "=" + escape(val) + (expires ? "; expires=" + expires : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
      },
      slugDisplay: function () {
        var slug = doc.getElementById('slug_' + wpAd.briefcase.pos);
        if(slug) {
          slug.style.display = 'block';
        }
      },
      tagBuilder: function () {
        var methods = {
          'adj': {
            'tag': 's' + 'cript',
            'src': wpAd.briefcase.dcUrl,
            'atts': 'type="text/javascript"'
          },
          'adi': {
            'tag': 'iframe',
            'src': wpAd.briefcase.dcUrl,
            'atts': 'frameborder="0" marginwidth="0" marginheight="0" height="' + wpAd.config.adtypes[wpAd.briefcase.what].size[0][1] + '" width="' + wpAd.config.adtypes[wpAd.briefcase.what].size[0][0] + '" scrolling="no" id="ad_iframe_' + wpAd.briefcase.pos + '" name="ad_iframe_' + wpAd.briefcase.pos + '"'
          },
          'fif': {
            'tag': 'iframe',
            'src': wpAd.constants.fifURL,
            'atts': 'frameborder="0" height="0" marginwidth="0" marginheight="0" width="0" scrolling="no" id="fif_' + wpAd.briefcase.pos + '" name="fif_' + wpAd.briefcase.pos + '"'
          }
        },
          tt = arguments[0] || wpAd.briefcase.delivery,
          m = '<' + methods[tt].tag + ' ' + methods[tt].atts + ' src="' + methods[tt].src + '"></' + methods[tt].tag + '>';
        return m;
      },
      textifyCode: function (c) {
        return c.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
      },
      urlCheck: function (arg) {
        var loc = parent.window.location.href || doc.referrer,
          obj = (arguments[1] && typeof arguments[1] === 'object') ? arguments[1] : null,
          regex = (obj !== null && obj.type === 'variable') ? new RegExp("[\\?&;]" + arg + "=([^&#?]*)") : new RegExp(arg),
          results = regex.exec(loc);
        return(results === null) ? null : results[results.length - 1];
      },
      templatecheck: function () {
        if(!wpAd.templates) {
          wpAd.tools.generateTemplate();
        }
        if(wpAd.templates[wpAd.briefcase.pos] || (wpAd.templates[wpAd.briefcase.what] && wpAd.templates[wpAd.briefcase.what].openAll) || wpAd.flags.allAds) {
          wpAd.templates[wpAd.briefcase.pos] = wpAd.templates[wpAd.briefcase.pos] || {};
          if(wpAd.templates[wpAd.briefcase.pos].hardcode) {
            wpAd.briefcase.hardcode = wpAd.templates[wpAd.briefcase.pos].hardcode;
          }

          wpAd.briefcase.id = wpAd.templates[wpAd.briefcase.pos].id ||
            (wpAd.templates[wpAd.briefcase.what] &&
            wpAd.templates[wpAd.briefcase.what].openAll &&
            wpAd.templates[wpAd.briefcase.what].id ||
            false);

          // hack to fix double ad calls - add current ad type to array:
          if(wpAd.flags.IE) {
            wpAd.tools.adsToBeCleaned.push(wpAd.briefcase.what);
          }
          return true;
        }
        return false;
      },
      viewable_cb: function(slug, options){
        var template = wpAd.templates[slug.id.split('slug_')[1]];
        if(template && template.briefcase){
          $(slug).css({height:''}); //remove set height (added initially to measure midpoint of ad container):
          wpAd.exec.adi(template.briefcase); //render iframe ad
          if(options.fadeInSpeed){
            $(slug).hide().fadeIn(options.fadeInSpeed);
          }
        }
      },
      writeScript: function(){
        var l = arguments.length, i = 0;
        for(i;i<l;i++){
          doc.write('<script type="text/javascript" src="' + arguments[i] + '"><\/script>');
        }
      },
      zoneBuilder: {
        contentType: {
          audiostory: 'audio',
          blogstory: 'blog',
          front: 'front',
          graphicstory: 'graphic',
          mediagallery: 'photo',
          panostory: 'pano',
          ugcphotostory: 'ugc',
          videostory: 'video'
        },
        zones: {
          contentType: function(){
            var self = wpAd.tools.zoneBuilder,
              a = self.getString(wp_meta_data.contentType);
            return a && commercialNode !== 'washingtonpost.com' && self.contentType[a.toLowerCase()] || '';
          },
          contentName: function(){
            return wpAd.tools.zoneBuilder.getString(wp_meta_data.contentName);
          },
          subsection: function(){
            return wpAd.tools.zoneBuilder.getString(wp_meta_data.subsection);
          }
        },
        getString: function(a){
          return a ? (typeof a === 'string' ? a : a[0]) : '';
        },
        validate: function(a){
          if(!a){return false;}
          a = a.replace(/\s/g, '').replace(/^\/*|\/*$/g, '').replace(/[^0-9a-zA-Z_\.\-\/]/g, '');
          return (/^[^a-z]/i.test(a) ? 'c' : '') + a;
        },
        exec: function(){
          var self = wpAd.tools.zoneBuilder,
            zones = self.zones,
            cn = [self.validate(commercialNode)],
            key, t;
          for(key in zones){
            if(zones.hasOwnProperty(key)){
              t = self.validate(zones[key]());
              if(t){
                cn.push(t);
              }
            }
          }
          self.executed = true;
          return cn.join('/').toLowerCase();
        }
      }
    },
    cache: {
      init: function () {
        wpAd.cache.initialised = true;

        //reference the site specific script for front check:
        wpAd.cache.front = wpAd.cache.hasOwnProperty('front') ? wpAd.cache.front : (wpAd.config.front() || false);

        wpAd.cache.page_id = (function () {
          if(wp_meta_data.page_id) {
            return(typeof wp_meta_data.page_id === 'object' ? wp_meta_data.page_id[0] : (typeof wp_meta_data.page_id === 'string' ? wp_meta_data.page_id : '')).replace(/\./g, '-');
          }
          //non-methode pages:
          return '';
        })();

        wpAd.cache.keywords = (function () {
          if(!wpAd.cache.front) {
            if(wp_meta_data.keywords) {
              return typeof wp_meta_data.keywords === 'object' ? wp_meta_data.keywords.join(",").toLowerCase() : wp_meta_data.keywords.toLowerCase();
            } else {
              //non-methode pages and pages where wp_meta_data.keywords is not defined:
              var meta = doc.getElementsByTagName('meta'),
                l = meta.length || 0;

              while(l--) {
                if(meta[l].getAttribute('name') === 'keywords' && meta[l].getAttribute('content')) {
                  return meta[l].getAttribute('content').toLowerCase();
                }
              }
            }
          }
          return '';
          //return typeof wp_meta_data!=='undefined' && wp_meta_data.keywords ? wp_meta_data.keywords.join(",")/*.replace(/\s/g,'_')*/.toLowerCase() : '';
        })();
      },
      cookies: {}
    },
    keyvalues: {
      exec: function () {
        wpAd.briefcase.keyvalues = !wpAd.briefcase.keyvalues ? {} : wpAd.briefcase.keyvalues;
        for(var a in wpAd.keyvalues) {
          if(a !== 'exec' && wpAd.keyvalues.hasOwnProperty(a)) {
            if(typeof wpAd.keyvalues[a] === 'function') {
              wpAd.briefcase.keyvalues[a] = wpAd.keyvalues[a]();
            } else if(typeof wpAd.keyvalues[a].exec === 'function') {
              wpAd.keyvalues[a].exec();
            }
          }
        }
        //wpAd.tools.keyvalue_overrides();
        return wpAd.briefcase;
      },
      sz: function () {
        var arg = wpAd.briefcase.what,
          size = '',
          wca = wpAd.config.adtypes[arg],
          sizeslength, a;
        wpAd.briefcase.sizes = [];
        if(wca && wca.size) {
          sizeslength = wca.size.length;
          for(a = 0; a < sizeslength; a = a + 1) {
            size += wca.size[a][0] + 'x' + wca.size[a][1];
            wpAd.briefcase.sizes[a] = size;
            if(sizeslength >= 1 && a !== sizeslength - 1) {
              size += ',';
            }
          }
        }
        return size;
      },
      pos: function () {
        var rv = [wpAd.briefcase.pos],
          newPOS = wpAd.config.adtypes[wpAd.briefcase.what];
        newPOS = newPOS && newPOS.keyvalues && newPOS.keyvalues.pos ? newPOS.keyvalues.pos : null;
        if(newPOS) {
          return rv.concat(newPOS);
          //return newPOS;
        }
        return wpAd.briefcase.pos;
      },
      poe: function () {
        if(wpAd.briefcase.delivery === 'ajax'){
          return ['no'];
        }

        return wpAd.cache.hasOwnProperty('poe') ? wpAd.cache.poe : (function () {
          var name = wpAd.constants.site + '_poe',
            cookieVal = wpAd.tools.getCookie(name);

          wpAd.cache.poe = ['no'];

          if(!cookieVal) {
            wpAd.tools.setCookie(name, 'true', '', '/', '','');
            wpAd.cache.poe = ['yes'];
          }

          return wpAd.cache.poe;
        })();
      },
      ad: function () {
        var arg = wpAd.briefcase.what,
          keys = [],
          wca = wpAd.config.adtypes[arg],
          a, keyslength;
        if(wca && wca.keyvalues && wca.keyvalues.ad) {
          if(typeof wca.keyvalues.ad === 'string') {
            wca.keyvalues.ad = [wca.keyvalues.ad];
          }
          keyslength = wca.keyvalues.ad.length;
          for(a = 0; a < keyslength; a = a + 1) {
            keys.push(wca.keyvalues.ad[a]);
          }
        }

        //this needs to be before the dcopt check in keyvalues:
        if(!wpAd.cache.dcopt && (wpAd.briefcase.delivery === 'adj' || wpAd.briefcase.delivery === 'fif') && !wpAd.flags.is_homepage && wpAd.tools.interstitial()) {
          keys.push('interstitial');
        }

        return keys;
      },
      //this needs a rewrite to match up with current script:
      kw: function () {
        return wpAd.cache.hasOwnProperty('kw') ? wpAd.cache.kw : (function () {
          var obj = {
              energy: ['energy'],
              re: ['builder', 'condo', 'home', 'homeowner', 'housing', 'mortgage', 'property', 'real estate', 'realtor', 'refinance', 'neighborhood']
            },
            key;

          wpAd.cache.kw = [];
          if(wpAd.flags.test_ads) {
            wpAd.cache.kw.push('test_' + wpAd.flags.test_ads);
          }
          for(key in obj) {
            if(obj.hasOwnProperty(key) && wpAd.tools.metaCheck(obj[key])) {
              wpAd.cache.kw.push(key);
            }
          }
          return wpAd.cache.kw;
        })();
      },
      testads: function(){
        return wpAd.cache.hasOwnProperty('testads') ? wpAd.cache.testads : (function () {
          wpAd.cache.testads = [];
          if(wpAd.flags.testads){
            wpAd.cache.testads.push(wpAd.flags.testads);
          }
          return wpAd.cache.testads;
        })();
      },
      del: function () {
        var del = wpAd.briefcase.delivery,
          types = {
            'adj': 'js',
            'ajax': 'iframe',
            'adi': 'iframe',
            'fif': 'js',
            'pfadx': 'pfadx',
            'pfadxjs': 'pfadxjs',
            'vi': 'iframe'
          };
        if(wpAd.exec[del] && types.hasOwnProperty(del)) {
          return types[del];
        } else {
          wpAd.briefcase.delivery = "adi";
          return "iframe";
        }
      },
      dcopt: function () {
        if(!wpAd.cache.dcopt && (wpAd.briefcase.delivery === 'adj' || wpAd.briefcase.delivery === 'fif') && !wpAd.flags.no_interstitials) {
          wpAd.cache.dcopt = true;
          return ['ist'];
        } else {
          return [];
        }
      },
      pageId: function () {
        return wpAd.cache.page_id;
      },
      //this needs a rewrite to match up with current script:
      '!c': function () {
        return wpAd.cache.hasOwnProperty('exclusion') ? wpAd.cache.exclusion : (function () {
          var rv = [],
            obj = {
                natural_disaster : ['shell', 'exxon', 'citgo', 'bp', 'chevron', 'hess', 'sunoco', 'disaster', 'fire', 'explosion', 'oil', 'coal', 'death', 'dead', 'quake', 'earthquake', 'tsunami', 'tornado', 'hurricane', 'flood','bed bug','infestation'],
                human_disaster : ['shoot', 'vatican', 'spanair', 'aground', 'rescue', 'attack', 'disaster', 'explosion', 'war', 'hostage', 'terror', 'terrorist', 'bomb', 'blast', 'mining', 'miner', 'violence', 'riot', 'crash', '9/11', 'sept. 11', 'september 11'],
                financial_crisis : ['corrupt', 'goldman', 'aig', 'foreclosure', 'enron', 'sec', 'mortgage', 'Insurance', 'health', 'bank', 'wall street', 'protest', 'labor strike', 'union strike', 'labor issue', 'union issue', 'teacher strike', 'teachers strike', 'election'],
                inappropriate : ['gambling','sex','alcohol','pornography']
            },
            key;

          if(!wpAd.cache.front) {
            for(key in obj) {
              if(obj.hasOwnProperty(key) && wpAd.tools.metaCheck(obj[key])) {
                rv.push(key);
              }
            }
          }

          wpAd.cache.exclusion = rv;

          return rv;
        })();
      },
      u: function () {
        return wpAd.cache.hasOwnProperty('u') ? wpAd.cache.u : (function () {
          var s_vi = wpAd.tools.getCookie('s_vi'),
            m = win.wp_meta_data || {},
            rv = '';

          //pass in s_vi cookie value:
          if(s_vi) {
            s_vi = s_vi.split(/\|/)[1];
            if(s_vi) {
              s_vi = s_vi.split(/\[/)[0].split(/-/);
              rv = 'o*' + s_vi[0] + ',' + s_vi[1];

              //get page name, replace spaces with underscores and then limit the string to 100 characters
              rv += (win.TWP && TWP.Data && TWP.Data.Tracking && TWP.Data.Tracking.props && TWP.Data.Tracking.props.page_name ? ',' + TWP.Data.Tracking.props.page_name.replace(/ /g, '_').slice(0, 100) : '');

              //",,,", then get page type and then need to append ",abc" to the end
              rv += ',,,' + (m.contentType && wpAd.tools.zoneBuilder.contentType[m.contentType.toString()] ? wpAd.tools.zoneBuilder.contentType[m.contentType.toString()] : 'article') + ',abc';
            }
          }

          //store the string for reuse:
          wpAd.cache.u = rv;

          return wpAd.cache.u;
        })();
      },
      front: function () {
        return wpAd.cache.front ? ['y'] : ['n'];
      },
      ref: function () {
        return wpAd.cache.hasOwnProperty('ref') ? wpAd.cache.ref : (function () {
          wpAd.cache.ref = [];
          var d = doc.referrer || '';
          if(/facebook\.com|digg\.com|reddit\.com|myspace\.com|newstrust\.net|twitter\.com|delicious\.com|stumbleupon\.com/i.test(d)) {
            wpAd.cache.ref.push('social');
          }
          if(location.search.match('wpisrc=')) {
            wpAd.cache.ref.push('email');
          }
          return wpAd.cache.ref;
        })();
      },
      onTheFly: function () {
        //this is really only here as an "insert at this position" into ad call
        return wpAd.briefcase.onTheFly ? wpAd.briefcase.onTheFly : '';
      },
      siteSpecificKeyvalues: {
        //this checks the site specific ad script and adds the site specific keyvalues to wpAd.briefcase.keyvalues
        exec: function () {
          if(wpAd.config.keyvalues) {
            for(var key in wpAd.config.keyvalues) {
              if(wpAd.config.keyvalues.hasOwnProperty(key)) {
                if(typeof wpAd.config.keyvalues[key] === 'function') {
                  wpAd.briefcase.keyvalues[key] = wpAd.config.keyvalues[key]();
                } else if(typeof wpAd.config.keyvalues[key].exec === 'function') {
                  wpAd.config.keyvalues[key].exec();
                }
              }
            }
          }
        }
      },
      rs: function () {
        return wpAd.cache.hasOwnProperty('rs') ? wpAd.cache.rs : (function () {
          var rs_arr = wpAd.cache.cookies.hasOwnProperty('rsi_segs') ? wpAd.cache.cookies.rsi_segs : (function () {
            wpAd.cache.cookies.rsi_segs = wpAd.tools.getCookie('rsi_segs');
            return wpAd.cache.cookies.rsi_segs;
          })(),
            len, i;

          wpAd.cache.rs = [];
          if(rs_arr) {
            rs_arr = rs_arr.replace(/J05531_/gi, "j").replace(/D08734_/gi, "d").split('|');
            len = rs_arr.length;
            for(i = 0; i < len; i++) {
              wpAd.cache.rs[i] = rs_arr[i];
            }
          }
          return wpAd.cache.rs;
        })();
      },
      dfpcomp: function () {
        return typeof dfpcomp !== 'undefined' ? dfpcomp : '';
      },
      dcmt: function () {
        if(wpAd.briefcase.delivery === 'pfadx'){
          return ['text/html'];
        }
        if(wpAd.briefcase.delivery === 'pfadxjs'){
          return ['text/javascript'];
        }
        return [];
      },
      tile: function () {
        wpAd.tile = wpAd.tile ? wpAd.tile + 1 : 1;
        return wpAd.tile;
      },
      ord: function () {
        if(wpAd.briefcase.delivery !== 'ajax' || !wpAd.templates[wpAd.briefcase.what].briefcase) {
          return wpAd.cache.hasOwnProperty('ord') ? wpAd.cache.ord : (function () {
            wpAd.cache.ord = typeof spec_ord !== 'undefined' ? spec_ord : Math.floor(Math.random() * 1E18);
            return wpAd.cache.ord;
          })();
        } else {
          return Math.floor(Math.random() * 1E18);
        }
      }
    }
  };

  placeAd2 = function(where, what, delivery, onTheFly) {
    if(wpAd.flags.debugAds){
      try {
        console.log('\n');
        console.log(what);
        console.time('Time to build ad call');
      } catch(e) {}
    }

    if(wpAd.flags.no_ads || !wpAd.config || !wpAd.config.adtypes) {
      return false;
    }

    if(!wpAd.initialised) {
      wpAd.init();
      wpAd.initialised = true;
    }

    wpAd.briefcase = {};

    //store original placeAd2 arguments
    wpAd.briefcase.defaults = {
      where: where,
      what: what,
      delivery: delivery,
      onTheFly: onTheFly
    };

    what = wpAd.tools.posOverride(what);

    if(!wpAd.config.adtypes[what]) {
      return false;
    }

    wpAd.briefcase.where = where;
    wpAd.briefcase.what = what;
    wpAd.briefcase.onTheFly = onTheFly;
    wpAd.briefcase.pos = wpAd.briefcase.what + (wpAd.briefcase.pos_override ? '_' + wpAd.briefcase.pos_override : '');
    wpAd.briefcase.delivery = wpAd.tools.deliveryType(delivery); //returns adj, adi, ajax, pfadx, fif

    if(wpAd.tools.templatecheck()) {
      if(!wpAd.briefcase.hardcode) {
        wpAd.keyvalues.exec();
        wpAd.briefcase = wpAd.config.hackBin();
        wpAd.briefcase.dcUrl = wpAd.tools.dcUrl();
        wpAd.exec[wpAd.briefcase.delivery]();
      } else {
        wpAd.exec.hardcode();
      }

      wpAd.tools.slugDisplay();
      wpAd.tools.debug();

      //store briefcase object for reference:
      wpAd.templates[wpAd.briefcase.pos].briefcase = wpAd.briefcase;
    }
    wpAd.tools.adopsDebug();

    if(wpAd.flags.debugAds){
      try {
        console.timeEnd('Time to build ad call');
        if(wpAd.templates[wpAd.briefcase.pos]){
          console.log('Successful Template:', wpAd.briefcase.id);
          console.log('Briefcase: ', wpAd.briefcase);
        } else {
          console.log('Failed Template Check');
        }
      } catch(e) {}
    }

  };

  //generic flags
  wpAd.flags = {
    postscribe: !!/postscribe/i.test(location.search),
    debug: !!/debugAdCode/i.test(location.search),
    demoAds: wpAd.tools.urlCheck('demoAds', {type: 'variable'}),
    dcnode: wpAd.tools.urlCheck('dcnode', {type: 'variable'}),
    test_ads: wpAd.tools.urlCheck('test_ads', {type: 'variable'}),
    testads: wpAd.tools.urlCheck('testads', {type: 'variable'}),
    no_interstitials: !!wpAd.tools.urlCheck('no_interstitials'),
    no_ads: !!/no_ads/.test(location.search),
    allAds: !!/allAds/i.test(location.search),
    IE: !!/msie/i.test(navigator.userAgent),
    test_fif: !!/test_fif/i.test(location.search),
    debugAds: !!/debugAds/i.test(location.search),
    hpRefresh: !!wpAd.tools.urlCheck('reload=true'),
    is_homepage: !!(win.commercialNode && /^homepage|^washingtonpost\.com/i.test(commercialNode)),
    is_local: wpAd.tools.checkCookieVal('WPATC', 'C=1:'),
    network_id: wpAd.tools.urlCheck('network_id', {type: 'variable'}) || (wpAd.tools.urlCheck('network_id') ? 'N328291' : false)
  };

  //Legacy functions that may still have calls made to them (ie: urlCheck in tiffany_manager.js). Defining/Redefining them here:
  win.urlCheck = win.urlCheck || wpAd.tools.urlCheck;
  win.getCookie = win.getCookie || wpAd.tools.getCookie;
  win.setCookie = win.setCookie || wpAd.tools.setCookie;
  win.postLoadDebug = win.postLoadDebug || wpAd.tools.postLoadDebug;
  win.placeAd = win.placeAd || wpAd.tools.placeAd;

  //safety check for wp_meta_data:
  win.wp_meta_data = win.wp_meta_data || {};

  //redefine commercialNode:
  commercialNode = !wpAd.flags.dcnode ? wpAd.tools.zoneBuilder.exec() : wpAd.tools.dcnode();

  if(wpAd.flags.postscribe){
    wpAd.tools.writeScript('http://js.washingtonpost.com/wp-srv/ad/postscribe.min.js');
  }

})(window, document);