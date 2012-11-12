(function() {
  var Sailthru,
    __indexOf = Array.prototype.indexOf || function(item) {for (var i = 0, l = this.length; i < l; i++) {if (i in this && this[i] === item) return i;}return -1;};

  window.Sailthru = window.sailthru = Sailthru = (function() {
    var __instance;

    __instance = null;

    function Sailthru() {
      this.options = {};
      this.hidden = false;
      this.protocol = window.location.protocol;
    }

    Sailthru.setup = function(options) {
      var k, v, _, _ref, cookie_enabled, concierge_blocked, stage_mode;
      if (typeof options.domain === 'undefined') return;
      _ = Sailthru;
      _.tracked = {};
      if (!(_.__instance instanceof Sailthru)) {
        _.__instance = new this;
        _.__instance.options = {
          spider: true,
          concierge: false,
          akamai: false,
          cookieDomain: window.location.host
        };
        for (k in options) {
          v = options[k];
          _.__instance.options[k] = options[k];
        }
        if (typeof _.__instance.options.tags === 'undefined') {
          _.__instance.options.tags = _.__instance.getContentTags();
        }
        cookie_enabled = _.__instance.cookieIsEnabled();
        stage_mode = document.location.search.indexOf('concierge_stage') !== -1;
        concierge_blocked = _.__instance.getCookie('sailthru_recommendation_hidden') === 'true';
        if ((_.__instance.options.concierge || stage_mode) && cookie_enabled && !concierge_blocked) {
          _.__instance.options.concierge = _.__instance._conciergeDefaultOptions();
          if (options.concierge !== true) {
            _ref = options.concierge;
            for (k in _ref) {
              v = _ref[k];
              _.__instance.options.concierge[k] = options.concierge[k];
            }
          }
          if(stage_mode){
              _.__instance.options.concierge.stage = 1;
          }
          if(!options.concierge.stage_only || stage_mode){
                _.__instance._recommendationBox();
          }
        } else if (typeof _.__instance.options.tags !== 'undefined' || _.__instance.options.spider === true) {
          _.__instance._horizonTrack();
        }
      }
      return _.__instance;
    };

    Sailthru.logFB = function(url) {
      var login_status, _data, _fb, _get_share_count2;
      if (url == null) url = false;
      if (url === false) url = window.location.href;
      _data = {};
      _get_share_count2 = function(url, callback) {
        var params;
        if (typeof window.FB !== 'undefined') {
          window.FB.api('/', {
            id: url
          }, function(response) {
            if (response['shares'] !== 'undefined') {
              return callback(response['shares']);
            }
          });
        } else {
          params = {
            url: 'https://graph.facebook.com/?id=' + encodeURIComponent(url),
            async: false,
            success: function(response) {
              if (response['shares'] !== 'undefined') {
                return callback(response['shares']);
              }
            }
          };
          $.ajax(params);
        }
      };
      if (window.FB) {
        _fb = window.FB;
        login_status = (function() {
          var _login_status;
          _login_status = false;
          _fb.getLoginStatus(function(response) {
            if (response.authResponse) {
              if (response.authResponse.userID) {
                _login_status = {
                  logged_in: true,
                  uid: response.authResponse.userID != null
                };
              }
            } else if (response.session) {
              if (response.session.uid) {
                _login_status = {
                  uid: response.session.uid,
                  logged_in: true
                };
              }
            } else {
              _login_status = false;
            }
          });
          return _login_status;
        })();
        if (login_status !== false) _data = login_status;
      }
      _get_share_count2(url, function(count) {
        if (count !== 'undefined') _data['shares'] = count;
      });
      return _data;
    };

    Sailthru.prototype.getContentTags = function() {
      var metaTags, tag, _i, _j, _len, _len2;
      metaTags = document.getElementsByTagName('meta');
      if (metaTags.length > 0) {
        for (_i = 0, _len = metaTags.length; _i < _len; _i++) {
          tag = metaTags[_i];
          if (typeof tag.name !== 'undefined' && tag.name.toLowerCase() === 'sailthru.tags' && typeof tag.content !== 'undefined') {
            return tag.content;
          }
        }
        for (_j = 0, _len2 = metaTags.length; _j < _len2; _j++) {
          tag = metaTags[_j];
          if (typeof tag.name !== 'undefined' && tag.name.toLowerCase() === 'keywords' && typeof tag.content !== 'undefined') {
            return tag.content;
          }
        }
      }
      return null;
    };

    Sailthru.prototype.getCookie = function(name) {
      var c, ca, nameEQ, _i, _len;
      if (this.cookieIsEnabled() !== true) return null;
      nameEQ = name + "=";
      ca = document.cookie.split(';');
      for (_i = 0, _len = ca.length; _i < _len; _i++) {
        c = ca[_i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    Sailthru.prototype.setCookie = function(name, value, days) {
      var cookie_str, date;
      if (this.cookieIsEnabled() !== true) return false;
      date = new Date();
      date.setDate(date.getDate() + days);
      cookie_str = name + "=" + escape(value);
      if (days !== null) {
        date = new Date();
        date.setDate(date.getDate() + days);
        cookie_str += ";expires=" + date.toUTCString();
      }
      cookie_str += ';path=/;domain=' + this.options.cookieDomain;
      document.cookie = cookie_str;
      return true;
    };

    Sailthru.prototype.cookieIsEnabled = function() {
      return navigator.cookieEnabled || (__indexOf.call(document, 'cookie') >= 0 && (document.cookie.length > 0 || (document.cookie = 'test').indexOf.call(document.cookie, "test") > -1));
    };

    Sailthru.prototype.tagsToString = function(tags) {
      var _tags;
      _tags = tags instanceof Array ? tags.join(',') : tags;
      return _tags;
    };

    Sailthru.recommendationTrack = function(domain, id, event, track) {
      var clicks, img, instance, k, random, url, _t;
      if (typeof Sailthru.tracked === 'undefined') Sailthru.tracked = {};
      if (Sailthru.tracked[event]) return;
      Sailthru.tracked[event] = true;
      if (window.location.protocol === 'https:') {
          url = "https://horizon.sailthru.com/horizon/recommendtrack?id=" + id;
          url += '&d=' + domain;
          sailthru_hid = this.getCookie('sailthru_hid');
          if (sailthru_hid !== null) {
              url += '&hid=' + sailthru_hid;
          }
      } else {
          url = window.location.protocol + '//' + domain + "/horizon/recommendtrack?id=" + id;
      }
      if (event) url += "&event=" + event;
      if (track) {
        for (k in track) {
          _t = track[k];
          url += '&' + k + '=' + encodeURIComponent(_t);
        }
      }
      if (event === 'click') {
        instance = Sailthru.__instance;
        clicks = parseInt(instance.getCookie('hcl'));
        clicks = isNaN(clicks) ? 1 : clicks + 1;
        instance.setCookie('hcl', clicks, 5);
      }
      random = parseInt(Math.random() * 10000, 10);
      url += '&cb=' + random;
      img = new Image(1, 1);
      img.src = url;
      img.onerror = "";
      return;
    };

    Sailthru.recommendationBoxCallback = function(response) {
      return Sailthru.jq(document).trigger('SailthruDataLoaded', [response]);
    };
    
    Sailthru.emailSignup = function() {
            var options = Sailthru.__instance.options;
            var url, data;
            data = $(this).serialize();
            if(document.getElementById('sailthru_email_address')){
                url = window.location.protocol + '//' + options.domain + '/horizon/conciergesignup?format=jsonp&callback=?&'+data;
                if(options.concierge.stage){
                    url+='&concierge_stage=1'
                }
                Sailthru.jq.getJSON(url);
            }
            return false;
    };
        
    Sailthru.signupCallback = function(response){
        var $signup, $form;
        $signup = Sailthru.jq('.recommendationSignup');
        $signup.html(response.content.html);
        $form = $signup.find('form');
        $form.submit(Sailthru.emailSignup);
        if(response.ok){
            setTimeout(
            function(){
                Sailthru.prototype._hide();
                Sailthru.__instance.hidden = true;
            }, 1500);
        }
    };

    Sailthru.prototype.test = function() {
      if (typeof console !== 'undefined') console.log('this is test call');
      return;
    };

    Sailthru.prototype._conciergeDefaultOptions = function() {
      var cdn_domain, _default;
      cdn_domain = 'ak.sail-horizon.com';
      return _default = {
        from: 'top',
        threshold: 400,
        delay: null,
        offsetBottom: 0,
        cssPath: this.protocol + '//' + cdn_domain + '/assets/css/horizon/recommendation'+(this.protocol==='https:'?'_https':'')+'.css'
      };
    };

    Sailthru.prototype._recommendationBox = function() {
      var cfg, dataLoaded, delay, self, timer, _createBox, _init, _loadCSS, _show;
      cfg = Sailthru.jq.extend({}, this.options.concierge);
      timer = null;
      dataLoaded = false;
      if (this.protocol === 'https:') {
          cfg.url = 'https://horizon.sailthru.com/recommend?format=jsonp&callback=?';
          sailthru_hid = this.getCookie('sailthru_hid');
          cfg.url += '&d=' + this.options.domain;
          if (sailthru_hid !== null) {
              cfg.url += '&hid=' + sailthru_hid;
          }
      } else {
          cfg.url = this.protocol + '//' + this.options.domain + '/recommend?format=jsonp&callback=?';
      }
      if (this.options.concierge.filter && this.options.concierge.filter.tags) {
        cfg.url += '&filter[tags]=' + this.tagsToString(this.options.concierge.filter.tags);
      }
      if (this.options.spider !== true) cfg.url += '&nospider=1';
      if (this.options.tags) {
        cfg.url += '&tags=' + encodeURIComponent(this.tagsToString(this.options.tags));
      }
      if (this.getCookie('hcl')) cfg.url += '&num_clicks=' + this.getCookie('hcl');
      if(this.options.concierge.stage){
          cfg.url += '&concierge_stage=1';
      }
      cfg.domain = this.options.domain;
      this.data = {};
      self = this;
      delay = typeof this.options.delay !== 'undefined' ? this.options.delay : false;
      _init = function() {
        var _this = this;
        _loadCSS(cfg.cssPath);
        Sailthru.jq(document).bind('SailthruDataLoaded', function(e, response) {
          _this.data = response;
          _this.dataLoaded = true;
          return _createBox.call(_this);
        });
        Sailthru.jq.getJSON(cfg.url);
        Sailthru.jq(window).scroll(function(e) {
          var $this, maxScroll, scrollTop, start, threshold;
          if (_this.dataLoaded === true) {
            $this = Sailthru.jq(this);
            scrollTop = $this.scrollTop();
            maxScroll = Sailthru.jq(document).height() - Sailthru.jq(window).height();
            if (cfg.threshold instanceof jQuery) {
              threshold = 0 - (cfg.threshold.eq(0).offset().top - Sailthru.jq(window).height());
              start = 0;
            } else {
              threshold = cfg.from === 'bottom' ? cfg.threshold : -cfg.threshold;
              start = cfg.from === 'bottom' ? maxScroll : 0;
            }
            if (scrollTop >= (start - threshold) && !_this.hidden) {
              return _show.call(_this);
            } else {
              return Sailthru.__instance._hide();
            }
          }
        });
        if (delay) {
          return timer = setTimeout(function() {
            clearTimeout(timer);
            return _show.call(_this);
          }, delay);
        }
      };
      _loadCSS = function(path) {
        var css;
        css = document.createElement('link');
        css.href = path;
        css.rel = "stylesheet";
        css.type = "text/css";
        css.async = true;
        document.getElementsByTagName("head")[0].appendChild(css);
      };
      _createBox = function() {
        var $box, $close, $open, data, $form,
          _this = this;
        data = this.data.content;
        $box = Sailthru.jq('<div class="recommendation sailthruRecommendation" />');
        if (typeof data.html !== 'undefined') {
          $box.html(data.html);
          $close = $box.find('a.closeRecommendation');
          $open = $box.find('a.openRecommendation');
          $form = $box.find('form');
          $box.appendTo('body');
        }
        $close.click(function(e) {
          e.preventDefault();
          self.setCookie('sailthru_recommendation_hidden', 'true', 30);
          _this.hidden = true;
          Sailthru.__instance._hide();
          return false;
        });
        $open.click(function(e) {
          e.preventDefault();
          self.setCookie('sailthru_recommendation_hidden', 'false', 30);
          _this.hidden = false;
          _show.call(_this);
          return false;
        });
        $form.submit(Sailthru.emailSignup);
        setTimeout(function() {
          var $iframe, css_bottom, css_fixed;
          $iframe = Sailthru.jq('<iframe id="sailthru_iframe" src="" FRAMEBORDER="0" />');
          css_bottom = {
            bottom: cfg.offsetBottom,
            zIndex: '10000'
          };
          $box.css(css_bottom);
          css_fixed = {
            position: 'fixed',
            width: $box.outerWidth(),
            height: $box.outerHeight(),
            zIndex: '9999',
            right: 0,
            bottom: cfg.offsetBottom,
            display: 'none'
          };
          $iframe.css(css_fixed);
          $iframe.appendTo('body');
          _this.$elem = $box;
          return _this.$iframe = $iframe;
        }, 100);
      };
      _show = function() {
        if (!navigator.cookieEnabled) return false;
        if (self.getCookie('sailthru_recommendation_hidden' === 'true')) {
          return false;
        }
        if (Sailthru.__instance.hidden) return false;
        if (this.$elem && !this.$elem.is(':animated')) {
          this.$elem.find('.openWrapper').hide();
          this.$iframe.show();
          this.$elem.show().animate({
            right: 0
          }, 'normal');
        }
        if(!this.data.content.id){
            return false;
        }
        return Sailthru.recommendationTrack(cfg.domain, this.data.content.id, 'show', this.data.track);
      };
      
      return _init.call(this);
    };
    
    Sailthru.prototype._hide = function() {
        var $open, $elem, $iframe, $openWrapper, newMargin, rightPx, 
          _this = this;
          $elem = Sailthru.jq('.sailthruRecommendation');
          $iframe = Sailthru.jq('#sailthru_iframe');
        if ($elem && !$elem.is(':animated')) {
          $openWrapper = $elem.find('.openWrapper');
          $open = $openWrapper.children('a');
          newMargin = ($elem.outerHeight() / 2) - 11;
          $openWrapper.show();
          rightPx = $elem.outerWidth() - $openWrapper.outerWidth();
          return $elem.animate({
            right: -rightPx
          }, 'normal', function() {
            return $iframe.hide();
          });
        }
      };

    Sailthru.prototype._horizonTrack = function() {
      var domain, img, random, sailthru_hid, uri, _i, _len, _ref, _tag, akamai_uri;
      random = parseInt(Math.random() * 10000, 10);
      domain = this.protocol === 'https:' ? 'horizon.sailthru.com' : this.options.domain;
      uri = this.protocol + '//' + domain + '/horizon/track';
      akamai_uri = this.protocol + '//' + 'ak.sail-horizon.com';
      uri = this.options.akamai === true ? akamai_uri + '/aktrack.gif' : uri;
      uri += '?r=' + random + '&url=' + encodeURIComponent(document.location);
      if (this.protocol === 'https:' || this.options.akamai === true) uri += '&d=' + this.options.domain;
      sailthru_hid = this.getCookie('sailthru_hid');
      if (sailthru_hid !== null && (this.options.akamai === true || this.protocol === 'https:')) {
        uri += '&hid=' + sailthru_hid;
      }
      if (typeof this.options.tag !== 'undefined') {
        this.options.tags = this.options.tag;
      }
      if (this.options.tags) {
        if (this.options.tags instanceof Array) {
          uri += '&tags=' + encodeURIComponent(this.options.tags.join(','));
        } else if (this.options.tags instanceof Object) {
          _ref = this.options.tags;
          for (_i in _ref) {
            _tag = _ref[_i];
            uri += '&tags[' + encodeURIComponent(_i) + ']=' + encodeURIComponent(_tag);
          }
        } else {
          uri += '&tags=' + encodeURIComponent(this.options.tags);
        }
      }
      if (this.options.spider) uri += '&spider=1';
      img = new Image(1, 1);
      img.src = uri;
      img.onerror = "";
      return img;
    };

    return Sailthru;

  })();

  if (window.jQuery) Sailthru.jq = jQuery;

}).call(this);

