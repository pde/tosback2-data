/*jslint nomen: true,indent: 2 */
/*global window, document, navigator */

(function (w, d, n, a) {
  // keep JSLint happy
  "use strict";
  var $ = w[a.k] = {
    'a': a,
    'd': d,
    'w': w,
    'n': n,
    's': {},
    'f': (function () {
      return {
                
        collectionToArray: function(coll) {
          var arr = [], i = 0;
          for (; i < coll.length; i = i + 1) {
            arr.push(coll[i]);
          }
          return arr;
        },
        addClass: function (el, text) {
          var c = el.className.split(' '), i, n = c.length, found = false;
          for (i = 0; i < n; i = i + 1) {
            if (text === c[i]) {
              found = true;
            }
          }
          if (!found) {
            if (el.className) {
              text = ' ' + text;
            }
            el.className = el.className + text;
          }
        },
        removeClass: function (el, text) {
          var c = el.className.split(' '), i, n = c.length, newClassName = '', sep = '';
          for (i = 0; i < n; i = i + 1) {
            if (c[i] !== text) {
              newClassName = newClassName  + sep + c[i];
              sep = ' ';  
            }
          }
          el.className = newClassName;
        },
        getScroll : function () {
          var y = 0;
          if (typeof $.w.pageYOffset !== 'undefined') {
            y = $.w.pageYOffset;
          } else {
            if ($.d.d && $.d.d.scrollTop) {
              y = $.d.d.scrollTop;
            } else {
              y = $.d.b.scrollTop;
            }
          }
          return y; 
        },
        getHeight : function () {
          var h = 0;
          if (typeof $.w.innerWidth !== 'undefined') {
            h = $.w.innerHeight;
          } else {
            if ($.d.d && $.d.d.clientHeight) {
              h = $.d.d.clientHeight;
            } else {
              h = $.d.b.clientHeight;
            }
          }
          return h; 
        },
        getPos: function (el) {
        	var l = 0, t = 0;
        	if (el && el.offsetParent) {
            do {
              l = l + el.offsetLeft;
              t = t + el.offsetTop;
            } while (el = el.offsetParent);
          }
        	return {'top': t, 'left': l};        
        },
        getDocHeight: function () {
          return Math.max(
            Math.max($.d.b.scrollHeight, $.d.d.scrollHeight),
            Math.max($.d.b.offsetHeight, $.d.d.offsetHeight),
            Math.max($.d.b.clientHeight, $.d.d.clientHeight)
          );
        },
        hazBottom: function (bottom) {
          var scrollY = $.f.getScroll();
          var viewHeight = $.f.getHeight();
          var docHeight = $.f.getDocHeight();
          if ($.v.hazBottomedOut !== true) {
            if (scrollY + viewHeight > docHeight - bottom) {
              if ($.a.bottomOut) {
                $.w[$.a.bottomOut.func]();
              }
              $.v.hazBottomedOut = true;
            }
          }
          return {'scrollY': scrollY, 'viewHeight': viewHeight, 'docHeight': docHeight};
        },
        scroll: function () {
          var y = $.f.getScroll();
          
          if ($.d.b.className.match(/home/)) {
            if (y > 330) {
              $.s.bd.className = 'hazScroll';
            } else {
              $.s.bd.className = '';
            }
          }

          if ($.a.scrollish) {
            for (var i = 0, n = $.a.scrollish.length; i < n; i = i + 1) {
              // key to database of watching things
              var aim = $.s.aim[i];
              // key to database of scrolling things
              var a = $.a.scrollish[i];
              // top range
              var minRange = a.t;
              // bottom range
              var maxRange = a.b;            
              // element
              var el = $.s[a.id];

              if (el) {
                var offsetTop = $.f.getPos(el).top;
                // top of element
                var middleOfElement = offsetTop + (el.offsetHeight / 2);
                var delta = middleOfElement - aim.y;
                var min = scrollY + minRange;
                var max = scrollY + maxRange
                var t = 0, o = null;
                if (min < delta && max > delta) {
                  if (a.className) {
                    el.className = a.className;
                  } else {
                    if (max - delta < delta - min) {
                      t = max - delta;
                      o = t / a.t * a.mod;
                    } else {
                      t = delta - min;
                      o = t / a.b * a.mod;
                    }
                  }
                }
                if (typeof o !== 'number' && a.failover) {
                  o = a.failover;
                }
                if (o) {
                  if (a.abs) {
                    o = Math.abs(o);
                  }
                  if (a.units) {
                    o = o + a.units;
                  }
                  el.style[a.p] = o;
                }
              }
            }   
          }       
 
        },
        aim: function (n) {
          var h = $.f.getHeight();
          $.s.aim[n].y = h * $.a.scrollish[n].y;
          // $.s.aim[n].style.top = $.s.aim[n].y + 'px';          
        },
        resize: function () {
          if ($.a.scrollish) {
            for (var i = 0; i < $.a.scrollish.length; i = i + 1) {
              $.f.aim(i);
            }
          }          
          $.f.scroll();
        },
        
        // get a DOM property or text attribute
        get: function (el, att) {
          var v = null;
          if (typeof el[att] === 'string') {
            v = el[att];
          } else {
            v = el.getAttribute(att);
          }
          return v;
        },
        // set a DOM property or text attribute
        set: function (el, att, string) {
          if (typeof el[att] === 'string') {
            el[att] = string;
          } else {
            el.setAttribute(att, string);
          }
        },
        // create a DOM element
        make: function (obj) {
          var el = false, tag, att;
          for (tag in obj) {
            if (obj[tag].hasOwnProperty) {
              el = $.d.createElement(tag);
              for (att in obj[tag]) {
                if (obj[tag][att].hasOwnProperty) {
                  if (typeof obj[tag][att] === 'string') {
                    $.f.set(el, att, obj[tag][att]);
                  }
                }
              }
              break;
            }
          }
          return el;
        },
        // remove a DOM element
        kill: function (obj) {
          if (typeof obj === 'string') {
            obj = $.d.getElementById(obj);
          }
          if (obj && obj.parentNode) {
            obj.parentNode.removeChild(obj);
          }
        },
        // listen for events in a cross-browser fashion
        listen : function (el, ev, fn) {
          if ($.w.addEventListener !== undefined) {
            el.addEventListener(ev, fn, false);
          } else if ($.w.attachEvent !== undefined) {
            el.attachEvent('on' + ev, fn);
          }
        },
        keyup: function (v) {
          var v = v || $.w.event;
          if (v.keyCode === 27) {
          }
        },

        // a click!
        click: function (v) {
          // decode events and targets in a cross-browser manner
          var el = null, cmd;
          v = v || $.w.event;
          // find the event target
          if (v.target) {
            el = (v.target.nodeType === 3) ? v.target.parentNode : v.target;
          } else {
            el = v.srcElement;
          }
          if (el) {
            cmd = $.f.get(el, 'cmd');
            if (cmd && $.f.cmd[cmd]) {
              $.f.cmd[cmd](el);
            }
          }
        },
        
        hashchange: function () {
          var hash = $.d.URL.split('#')[1];
          if (typeof $.f.hash === 'function') {
            $.f.hash(hash);
          }
        },

        cmd: {
          cancelApplyForAJob: function (el) {
            var code = $.f.get(el, 'val');
            if (code) {
              var iframe = $.d.getElementById('frame_' + code);
              if (iframe) {
                $.f.addClass(iframe, 'hidden');
              }
              var applyButton = $.d.getElementById('apply_' + code);
              if (applyButton) {
                $.f.removeClass(applyButton, 'hidden');
              }
              $.f.addClass(el, 'hidden');
            }
          },
          applyForAJob: function (el) {
            var code = $.f.get(el, 'val');
            if (code) {
              var iframe = $.d.getElementById('frame_' + code);
              if (iframe) {
                iframe.src = $.a.applicationUrl + code;
                $.f.removeClass(iframe, 'hidden');
                var cancelButton = $.d.getElementById('cancel_' + code);
                if (cancelButton) {
                  $.f.removeClass(cancelButton, 'hidden');
                }
              }
              $.f.addClass(el, 'hidden');
            }
          },
          caroAbsoluteNav: function (el) {
            $.f.removeClass($.s.caroNav[$.v.caroNavSelected], 'selected');
            $.f.removeClass($.s.caroText[$.v.caroNavSelected], 'selected');
            $.v.caroNavSelected = parseInt($.f.get(el, 'val'));
            $.f.addClass($.s.caroNav[$.v.caroNavSelected], 'selected');
            $.f.addClass($.s.caroText[$.v.caroNavSelected], 'selected');
            $.s.caroContent.style.marginLeft = 0 - ($.v.caroNavSelected * $.v.caroBgWidth + $.v.caroBgWidth / 2) + 'px';
            $.s.caroMaskLeft.className = 'carousel_mask';
            if ($.v.caroNavSelected > 0) {
              $.s.caroMaskLeft.className = 'carousel_mask clickable';
            }
            $.s.caroMaskRight.className = 'carousel_mask';
            if ($.v.caroNavSelected < $.s.caroNav.length - 1) {
              $.s.caroMaskRight.className = 'carousel_mask clickable';
            }
          },
          caroRelativeNav: function (el) {
            var dir = parseInt($.f.get(el, 'val'));
            var t = $.v.caroNavSelected + dir;
            if ($.s.caroNav[t]) {
              $.f.cmd.caroAbsoluteNav($.s.caroNav[t]);
            }
          }
        },

        
        structureInit: {
          carousel: function () {
            // the big wide container window
            $.s.caroContent = $.d.getElementById('carousel_content');
            $.s.caroMaskLeft = $.d.getElementById('carousel_mask_left');
            $.s.caroMaskRight = $.d.getElementById('carousel_mask_right');
            // 960 or 968px, typically
            $.v.caroBgWidth = parseInt($.f.get($.s.caroContent, 'carousel_bg_width'));
            // all the nav links
            $.s.caroNav = $.f.collectionToArray($.d.getElementById('carousel_nav').getElementsByTagName('A'));
            // all the text blocks
            $.s.caroText = $.f.collectionToArray($.d.getElementById('carousel_text').getElementsByTagName('DIV'));
            // pick one at random
            $.v.caroNavSelected = ~~(Math.random() * $.s.caroNav.length);
            // go there
            $.f.cmd.caroAbsoluteNav($.s.caroNav[$.v.caroNavSelected]);
          },
          collage_content: function () {
            var c = $.s.collage_content.getElementsByTagName('A');
            for (var i = 0; i < c.length; i = i + 2) {
              var r = Math.floor(Math.random() * 2);
              if (r) {
                $.f.addClass(c[i], 'alt');
                $.f.removeClass(c[i+1], 'alt');
              }
            }
          }
        },
        
        initMobile: function () {
          $.s.selectedNav = $.d.getElementById('selectedNav');
          var s = $.d.b.className.split(' ')[0];
          if (!$.a.selectableNav[s]) { 
            if ($.a.selectableNavSub[s]) {
              // subtitude things like career_list, use, about, terms
              s = $.a.selectableNavSub[s];
            } else {
              s = 'home';
            }
          }
          
          $.s.toggleMobileNav = $.f.make({'A':{'id': 'toggleMobileNav', 'innerHTML': $.a.selectableNav[s].text}});
          $.s.selectedNav.appendChild($.s.toggleMobileNav);
          $.s.selectedNav.style.display = 'block';

          $.s.mainNavList = $.d.getElementById('mainNavList');
          
          $.f.listen($.d.b, 'touchstart', $.f.click);
          
          $.s.toggleMobileNav.ontouchstart = function (e) {
            if (this.className === 'up') {
              this.className = '';
              $.s.mainNavList.style.display = 'none';
            } else {
              this.className = 'up';
              $.s.mainNavList.style.display = 'block';
            }
            e.preventDefault();
          }

          $.s.toggleMobileNav.onmousedown = function (e) {
            if (this.className === 'up') {
              this.className = '';
              $.s.mainNavList.style.display = 'none';
            } else {
              this.className = 'up';
              $.s.mainNavList.style.display = 'block';
            }
          }
          
        },
        
        init: function () {
          var i, el, ua;
          
          $.d.b = $.d.getElementsByTagName('BODY')[0];
          $.d.d = $.d.documentElement;


          $.v = { 
            'hash': $.d.URL.split('#')[1],
            'hazAiee': false,
            'hazBrowser': {}
          };
          
          if ($.d.getElementById('hazAiee')) {
            $.v.hazAiee = true;
          }

          // get structural nodes we're watching
          for (i = 0; i < $.a.struc.length; i = i + 1) {
            el = $.d.getElementById($.a.struc[i]);
            if (el) {
              $.s[$.a.struc[i]] = $.d.getElementById($.a.struc[i]);
              // do we need to perform an optional init for this element?
              if ($.f.structureInit[$.a.struc[i]]) {
                $.f.structureInit[$.a.struc[i]]();
              }
            }
          }
          
          for (ua in $.a.ua) {
            if ($.a.ua[ua].hasOwnProperty) {
              if ($.n.userAgent.indexOf($.a.ua[ua]) > -1) {
                if (ua === 'safari' && $.v.hazBrowser.chrome) {
                } else {
                  $.v.hazBrowser[ua] = true;
                  $.f.addClass($.d.b, ua);
                }
              }
            }
          }
                    
          if ($.v.hazBrowser.android === true || $.v.hazBrowser.ios === true) {
            $.f.addClass($.d.b, 'favOn');
            $.f.initMobile();
          }

          if ($.v.hazAiee === false) {
            if ($.w.loadToArgs) {
              for (i = 0; i < $.w.loadToArgs.length; i = i + 1) {
                $.a[$.w.loadToArgs[i].k] = $.w.loadToArgs[i].v;
              }
            }
  
            if ($.w.loadToFunc) {
              for (i = 0; i < $.w.loadToFunc.length; i = i + 1) {
                $.f[$.w.loadToFunc[i].k] = $.w.loadToFunc[i].v;
              }
            }
            
            if ($.a.scrollish) {
              $.s.aim = [];
              for (i = 0; i < $.a.scrollish.length; i = i + 1) {
                $.a.struc.push($.a.scrollish[i].id);
                $.s.aim[i] = {};
              }
            }
          
            $.f.listen($.w, 'scroll', $.f.scroll);
            $.f.listen($.w, 'resize', $.f.resize);
            $.f.resize();
          
          }          

          $.f.listen($.w, 'hashchange', $.f.hashchange);
          $.f.listen($.d.b, 'keyup', $.f.keyup);
          $.f.listen($.d.b, 'click', $.f.click);

          
          $.f.hashchange();
          
          $.d.b.appendChild($.f.make({'SCRIPT': {'type': 'text/javascript', 'src': 'http://www.google-analytics.com/ga.js', 'async': true}}));

        }
      };
    }())
  };
  $.f.init();
}(window, document, navigator, {
  'k': 'P',
  'ua': {
    'ios': 'iP',
    'chrome': 'Chrome',
    'android': 'Android', 
    'safari': 'Safari',
    'firefox': 'Firefox',
    'ie': 'Windows NT'
  },
  'struc': [
    'bd', 'carousel', 'collage_content'
  ],
  'applicationUrl': 'http://pinterest.theresumator.com/apply/embed/form/',
  'selectableNav': {
    'home': {'link': '/', 'text': 'About'}, 
    'basics': {'link': '/basics', 'text': 'Basics'}, 
    'goodies': {'link': '/goodies', 'text': 'Goodies'}, 
    'careers': {'link': '/careers', 'text': 'Careers'}, 
    'team': {'link': '/team', 'text': 'Team'}, 
    'press': {'link': '/press', 'text': 'Press'}, 
    'business': {'link': 'http://business.pinterest.com/', 'text': 'Business'},
    'blog': {'link': 'http://blog.pinterest.com/', 'text': 'Blog'},
    'help': {'link': 'http://help.pinterest.com/', 'text': 'Help'}
  },
  'selectableNavSub': {
    'career_list': 'careers',
    'terms': 'home',
    'privacy': 'home',
    'use': 'home'
  }
}));


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-12967896-6']);
_gaq.push(['_trackPageview']);

