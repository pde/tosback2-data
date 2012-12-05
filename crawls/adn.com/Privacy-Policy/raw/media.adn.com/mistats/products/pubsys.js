// Omniture Product Specific File
// Desc: Used to store a single vendors information.
// Product: Pubsys (WorkBench)
////////////////////////////////////////////////////////////////////////////////

/* XMUltra Feed Fix - Added 12/5/2007 - JJ */
// Check for content source
if(mistats.contentsource != undefined)
{
   // Temp var
   var new_cs = mistats.contentsource;

   // Filter HTML encoding and multiple blank spaces
   new_cs = new_cs.replace(/&#60;.+?&#62;/g, "");
   new_cs = new_cs.replace(/\s{2,}/g, "");

   // Reset mistats.contentsource with new
   mistats.contentsource = new_cs;
}
/* End XMUltra Feed Fix */

/* Flag for tracking improper vendor tags */
var pubsys = true;

/* Geography DART geopick - Added 1/25/2008 - JJ */
var mistats_geography;
if(!mistats_geography) mistats.geography = mistats_geography;
/* End Geography DART geopick */

/* Multipage Story Tagging Catcher  - Added 5/20/2008 - JJ */
var baseURL = window.location.href;
var pageNum;

if(baseURL.match(/-p[2-9]/g))
{
   pageNum = baseURL.match(/-p[2-9]/g);
   pageNum = pageNum.toString();
   mistats.cmsid += " | Page: " + pageNum.split('-p')[1];
} else
{
   splitURL = baseURL.split('.html');
   searchURL = splitURL[0] + '-p2.html';
   for(i=0; i < document.links.length; i++)
   {
      if(document.links[i] == searchURL)
      {
         mistats.cmsid += " | Page: 1";
         break;
      }
   }
}
/* End Multipage Story Tagging Catcher */

// we will be checking the URL for a hash or query string
// the following line is depcrecated for this file, not sure if its needed elsewhere though - GD 8/19/08
var internalSearch = window.location.hash;

mistats.unbind = function (pObj, pType, pCallout)
{
   if (pObj.removeEventListener)
      pObj.removeEventListener(pType, pCallout, false);
   else if (pObj.detachEvent)
      pObj.detachEvent('on' + pType, pCallout);
};

mistats.bind = function (pObj, pType, pCallout)
{
   if (pObj.addEventListener)
      pObj.addEventListener(pType, pCallout, false);
   else if (pObj.attachEvent)
      pObj.attachEvent('on' + pType, pCallout);
};

// Server date/time
mistats.Date = function ()
{
   var to;

   function init()
   {
      var ct;
      var x;

      to = document.cookie.match(/mi_to=-*\d+/);
      to = (to) ? parseInt(to[0].replace(/mi_to=/, '')) : 0;

      if (!to)
      {
         if (typeof XMLHttpRequest === 'undefined')
            return null;

         ct = new Date();
         x = new XMLHttpRequest();

         x.onreadystatechange = function ()
         {
            if (to || x.readyState < 2)
               return;

            to = x.getResponseHeader('date');

            if (to)
            {
               x.abort();
               to = Date.parse(to) - ct.getTime();
               s.c_w('mi_to', to, (new Date(ct.getTime() + 1209600000)));
            }
         };
         x.open('get', '/mistats/timestamp.txt', true);
         x.send(null);
      }
   };

   this.getDate = function ()
   {
      return new Date((new Date()).getTime() + to);
   };

   this.getOffset = function ()
   {
      return to;
   };

   init();
};

mistats.date = new mistats.Date();

// Audience Counts
mistats.audienceCounts =
{
   event: 'event17',

   nextWeek: function (pDate)
   {
      var d;
      var t;

      d = 0;
      t = pDate.getDay();

      while (t)
      {
         if (++t === 7)
            t = 0;
         d++;
      }

      t = pDate;
      t.setTime(t.getTime() + (d * 86400000));

      return new Date((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - mistats.date.getOffset());
   },

   nextMonth: function (pDate)
   {
      var m;
      var y;

      m = pDate.getMonth() + 1;
      y = pDate.getFullYear();

      if (m === 12)
      {
         m = 0;
         y++;
      }

      return new Date((new Date(y, m, 1)).getTime() - mistats.date.getOffset());
   },

   updateProducts: function (pName, pCount)
   {
      s.products = (s.products) ? s.products.replace(new RegExp(',*;' + pName + ' \d+;;;' + this.event + '=-*\d+', 'g'), '').split(',') : [];
      if (pCount > 1)
         s.products[s.products.length] = ';' + pName + ' ' + (pCount - 1) + ';;;' + this.event + '=-1';
      s.products[s.products.length] = ';' + pName + ' ' + pCount + ';;;' + this.event + '=1';
      s.products = s.products.join(',');

      s.events = (s.events) ? s.events.replace(new RegExp(',*' + this.event, 'g'), '').split(',') : [];
      s.events[s.events.length] = this.event;
      s.events = s.events.join(',');
   },

   updateCount: function (pLabel, pCookie, pValidate)
   {
      var c;
      var cm;
      var cw;
      var d;

      if (!pValidate)
         return;

      d = new Date();
      cm = pCookie + '_m';
      cw = pCookie + '_w';

      c = s.c_r(cw).match(/\d+/);
      c = (c) ? parseInt(c[0]) : 0;
      c++;
      s.c_w(cw, c, (new Date(this.nextWeek(d))));
      this.updateProducts('Weekly ' + pLabel, c);

      c = s.c_r(cm).match(/\d+/);
      c = (c) ? parseInt(c[0]) : 0;
      c++;
      s.c_w(cm, c, (new Date(this.nextMonth(d))));
      this.updateProducts('Monthly ' + pLabel, c);
   },

   updateAll: function ()
   {
      this.updateCount('PVs', 'mi_pc', true);
      this.updateCount('Stories', 'mi_sc', mistats.pagelevel && mistats.pagelevel.match(/story/i));
      this.updateCount('Visits', 'mi_vc', function ()
      {
         var r;
         r = s.c_r('mi_vs');
         s.c_w('mi_vs', '1', (new Date((new Date()).getTime() + 1200000)));
         return !r;
      }());
   }
};

mistats.AdTracker = function ()
{
   var cEvent = 'event18';

   var allAds;
   var pl;

   function getPageLevel()
   {
      if (s.prop3)
      {
         if (s.prop3.match(/home/i))
            return 'H';
         if (s.prop3.match(/section/i))
            return 'F';
         if (s.prop3.match(/story/i))
            return 'S';
         if (s.prop3.match(/gallery/i))
            return 'G';
         if (s.prop3.match(/postload/i))
            return 'P';
         if (s.prop3.match(/cgi/i))
            return 'C';
         if (s.prop3.match(/static/i))
            return 'T';
      }
      
      return 'U';
   };

   function scanObj(pObj)
   {
      var ad;
      var ads;
      var c;
      var def;
      var i;
      var pos;
      var scripts;
      var size;
      var src;

      if (!pObj)
         pObj = window;

      ads = [];
      scripts = pObj.document.getElementsByTagName('script');
      for (i = 0; i < scripts.length; i++)
      {
         ad = null;

         src = (scripts[i].src || '').toLowerCase();
         if (!src.match(/^https*:\/{2}ad\.doubleclick\.net\/adj\/mi\.\w{3}/) || scripts[i].tracked)
            continue;

         size = src.match(/sz=[^\;]+/);
         if (!size)
            continue;

         pos = src.match(/pos=\d+/);
         if (!pos)
            continue;

         size = size[0].replace(/sz=/, '');
         pos = pos[0].replace(/pos=/, '');
         ad = ((pObj != top) ? 'I' : '') + size + ((pos > 1) ? ('P' + pos) : '');

         def = scripts[i].nextSibling || null;
         while (def && def.nodeName.match(/^#/))
            def = def.nextSibling || null;
         if (def
          && def.nodeName === 'A'
          && (def.href || '').match(/^https*:\/\/ad\.doubleclick\.net\/click\;/i)
          && (def.innerHTML || '').match(/https*:\/\/s0\.2mdn\.net\/viewad\/817-grey\.gif/))
            ad += 'D';

         ads[ads.length] = ad;

         if (src.match(/dcopt=ist/))
         {
            if (scripts[i].parentNode.nodeName !== 'BODY')
               for (ad = null, c = scripts[i].nextSibling; !ad && c; c = c.nextSibling)
                  if (c.nodeName === '#comment' && (c.data || '').match(/^\s*Begin Interstitial Ad\s*$/i))
                     ad = true;
            ads[ads.length] = 'N' + (ad ? '' : '');
         }

         scripts[i].tracked = true;
      }

      return ads;
   };

   function scanIframe(pEvent)
   {
      var ads;
      var thisObj;
      
      thisObj = (pEvent.srcElement || pEvent.target) || pEvent;

      try
      {
         ads = scanObj(thisObj.contentWindow).join(',');
         if (thisObj.parentNode.nodeName !== 'BODY')
            thisObj = thisObj.parentNode;
         if (ads)
            thisObj.setAttribute('mi_ads', ads);
      } catch (miError)
      {
      }
   };

   function scanIframes()
   {
      var ads;
      var i;
      var obj;
      var objs;

      objs = document.getElementsByTagName('iframe');
      for (i = 0; i < objs.length; i++)
         if (objs[i].contentWindow)
         {
            scanIframe(objs[i]);
            obj = (objs[i].parentNode.nodeName !== 'BODY') ? objs[i].parentNode : objs[i];
            ads = obj.getAttribute('mi_ads');
            if (ads)
               allAds = allAds.concat(ads.split(','));
            obj.setAttribute('mi_ads', '');
            mistats.unbind(objs[i], 'load', scanIframe);
            mistats.bind(objs[i], 'load', scanIframe);
         }
   };

   function fillAdArray()
   {
      var ads;

      pl = getPageLevel();
      ads = scanObj(window);
      allAds = [ads.length] ? ads : [];
      scanIframes();
   };

   function updateProducts()
   {
      var dict;
      var i;

      dict = {};

      for (i = 0; i < allAds.length; i++)
      {
         if (!dict[allAds[i]])
            dict[allAds[i]] = 0;
         dict[allAds[i]]++;
      }

      s.products = (s.products) ? s.products.replace(/,*;\w+;;;event18=\d+/g, '').split(',') : [];
      for (i in dict)
         s.products[s.products.length] = ';' + pl + '|' + i + ';;;event18=' + dict[i];
      s.products = s.products.join(',');

      s.events = (s.events) ? s.events.replace(/,*event18/g, '').split(',') : [];
      s.events[s.events.length] = 'event18';
      s.events = s.events.join(',');
   };

   function track(pProd)
   {
      fillAdArray();
      s.prop38 = '';

      if (!allAds.length)
         return;
         
      s.prop38 = pl + '|' + allAds.join(',') + ',';
      if (pProd)
         updateProducts();
   };

   function onload()
   {
      var a;
      var h;

      fillAdArray();

      h = location.href.replace(/https*:\/{2}/i, '').replace(/^www\./i, '').replace(/(#|\?).*$/, '').replace(/\/$/, '');
      s.c_w('mi_adlst', ((allAds.length) ? ([h, pl, allAds.join(',')].join('|')) : ''));
   };

   function init()
   {
      iframes = {};
      mistats.bind(window, 'load', onload);
   };

   this.track = track;
   init();
};

mistats.adTracker = new mistats.AdTracker();

// Interaction Tracking object == 2012-01-31 JG
mistats.InteractionTracker = function ()
{
   var cEvent    = 'event21';
   var cPagename = 'eVar13';
   var cChannel  = 'eVar14';

   var pending;
   var counts;
   var sessionStorage;
   var listeners;
   var types;

   types =
   {
      'cs_vote':        {key: 'mi_css', product: 'Poll Votes'},
      'cs_results':     {key: 'mi_csr', product: 'Poll Results'},
      'cs_details':     {key: 'mi_csd', product: 'Poll Details'},
      'cs_hover':       {key: 'mi_csh', product: 'Poll Hover'},
      'gallery_views':  {key: 'mi_gvc', product: 'Gallery Views', eVar: 'eVar6'},
      'gallery_panel':  {key: 'mi_gpc', product: 'Gallery Panel Views'},
      'gcs_another':    {key: 'mi_gan', product: 'GCS Ask Another'},
      'gcs_signup':     {key: 'mi_gsu', product: 'GCS Signup'},
      'gcs_survey':     {key: 'mi_gsv', product: 'GCS Answered Survey'},
      'gcs_abandon':    {key: 'mi_gas', product: 'GCS Exited Site', event: 'event21'},
      'gcs_navigate':   {key: 'mi_gap', product: 'GCS Exited Page', event: 'event21'},
      'view_more':      {key: 'mi_vmc', product: 'View More Stories'},
      'widget_show':    {key: 'mi_wsc', product: 'Widget Show'},
      'widget_hide':    {key: 'mi_whc', product: 'Widget Hide'},
      'widget_move':    {key: 'mi_wmc', product: 'Widget Move'},
      'wgt_topjobs':    {key: 'mi_tjc', product: 'Trifecta Jobs'},
      'wgt_cars':       {key: 'mi_tcc', product: 'Trifecta Cars'},
      'wgt_homefinder': {key: 'mi_thc', product: 'Trifecta Homes'}
   };

   function clearStoredStats()
   {
      var type;

      for (type in counts)
      {
         counts[type] = 0;
         sessionStorage.removeItem(types[type].key);

         if (types[type].eVar && s[types[type].eVar])
            s[types[type].eVar] = '';
      }

      s[cPagename] = '';
      s[cChannel] = '';

      pending = false;
   };

   function includeOptionalVars(pObj)
   {
      var type;

      for (type in counts)
         if (counts[type])
            if (types[type].eVar)
            {
               pObj[types[type].eVar] = '+' + counts[type];
               if (pObj != s)
                  pObj.linkTrackVars += ',' + types[type].eVar;
            }
   };

   function generateProductsString(pCopy)
   {
      var type;
      var products;

      products = (s.products && pCopy) ? s.products.split(',') : [];

      for (type in counts)
         if (types[type].product && counts[type])
            products[products.length] = ';' + ((mistats.sitename) ? mistats.sitename : 'Unknown') + ': ' + types[type].product + ';;;' + cEvent + '=' + counts[type];

      return products.join(',');
   };

   function generateEventsString()
   {
      var events;

      events = (s.events) ? s.events.replace(new RegExp(',*' + cEvent, 'g'), '').split(',') : [];
      events[events.length] = cEvent;

      return events.join(',');
   };

   function sendCountsNow(pEvent)
   {
      var evtStr;
      var newVars;
      var type;

      if (!pending)
         return;

      evtStr = generateEventsString();

      newVars =
      {
         products:        generateProductsString(false),
         events:          evtStr,
         linkTrackEvents: evtStr,
         linkTrackVars:   ['events', 'products', cPagename, cChannel].join(',')
      };

      newVars[cPagename] = s.pageName;
      newVars[cChannel]  = s.channel;

      includeOptionalVars(newVars, true);
      clearStoredStats();

      if (newVars.products)
         s.tl(true, 'o', 'Interactions', newVars);
   };

   function sendCountsOnPageView()
   {
      var pollCount;
      var pollPtr;
      var type;

      if (!pending || (typeof mitagsent !== 'undefined' && mitagsent))
         return false;

      s.products = generateProductsString(true);
      if (!s.products)
         return clearStoredStats();

      s.events = generateEventsString();

      s[cPagename] = s.c_r('mi_ppn');
      s[cChannel]  = s.c_r('mi_pch');

      includeOptionalVars(s);

      pollCount = 0;
      pollPtr = setInterval(function ()
      {
         if (++pollCount >= 200)
            clearInterval(pollPtr);

         if (window['s_i_' + mistats.account])
         {
            clearStoredStats();
            clearInterval(pollPtr);
         }
      }, 200);
   };

   function beforeUnload(pEvent)
   {
      var href;
      var thisObj;

      if (!pending)
         return;

      if (pEvent.type === 'mouseout')
         if (pEvent.clientX > 0 && pEvent.clientX < document.documentElement.clientWidth
          && pEvent.clientY > 0 && pEvent.clientY < document.documentElement.clientHeight)
            return;

      if (pEvent.type === 'mousedown')
      {
         thisObj = pEvent.srcElement || pEvent.target;

         if (pEvent.button > 1 || thisObj.nodeName.match(/OBJECT|EMBED/))
            return;

         while (thisObj && thisObj.nodeName !== 'A')
            thisObj = thisObj.parentNode || null;

         if (!thisObj)
            return;

         href = thisObj.getAttribute('href') || '';
         if (href.match(/^javascript:\s*void\(/i))
         {
            thisObj.removeAttribute('href');
            mistats.bind(thisObj, 'click', function setHref()
            {
               setTimeout(function ()
               {
                  if (thisObj && thisObj.setAttribute)
                     thisObj.setAttribute('href', href);
               }, 50);
               mistats.unbind(thisObj, 'click', arguments.callee)
            });
         }

         if (!href || href.match(/^javascript:|^#/i)
          || thisObj.href.toLowerCase().replace(/^https*:\/{2}/, '').split('/')[0] == location.hostname.toLowerCase()
          || ((thisObj.getAttribute('target') || '').match(/_blank/i)))
            pending = false;
      }

      sendCountsNow(pEvent);
   };

   function setupEvents()
   {
      var evtTest;

      if (listeners)
         return false;

      if (window.addEventListener)
      {
         if (!('ontouchstart' in window))
         {
            evtTest = document.createElement('iframe');
            evtTest.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(evtTest);
            window.addEventListener('blur', beforeUnload, false);
            window.addEventListener('mouseout', beforeUnload, false);
            evtTest.contentWindow.addEventListener('beforeunload', function ()
            {
               window.removeEventListener('mouseout', beforeUnload, false);
               window.removeEventListener('blur', beforeUnload, false);
            }, false);
            evtTest.contentWindow.location.reload(true);
            setTimeout(function ()
            {
               evtTest.parentNode.removeChild(evtTest);
            }, 0);
         } else
            window.addEventListener('pagehide', beforeUnload, false);

         window.addEventListener('unload', beforeUnload, false);
         window.addEventListener('beforeunload', beforeUnload, false);
         window.addEventListener('mousedown', beforeUnload, false);
      } else if (window.attachEvent)
      {
         if (window != top)
            document.documentElement.attachEvent('ondeactivate', beforeUnload);
         window.attachEvent('onunload', beforeUnload);
         window.attachEvent('onbeforeunload', beforeUnload);
         document.documentElement.attachEvent('onmousedown', beforeUnload);
      }

      listeners = true;

      return true;
   }

   function init()
   {
      var tmpCount;
      var type;

      listeners = false;
      pending   = false;
      counts    = {};

      if (typeof window.sessionStorage === 'object')
         sessionStorage = window.sessionStorage;
      else
         sessionStorage =
         {
            getItem: function (pKey)
            {
               var c;
               var crumbs;

               crumbs = document.cookie.split('; ');

               for (c = 0; c < crumbs.length; c++)
                  if (crumbs[c].search(pKey) === 0)
                     return crumbs[c].substring(crumbs[c].indexOf('=') + 1);

               return null;
            },

            removeItem: function (pKey)
            {
               var date;

               date = new Date();
               date.setTime(date.getTime() - 86400000);
               document.cookie = pKey + '=; expires=' + date.toGMTString() + '; path=/';
            },

            setItem: function (pKey, pValue)
            {
               document.cookie = pKey + '=' + pValue + '; path=/';
            }
         };

      for (type in types)
      {
         tmpCount = sessionStorage.getItem(types[type].key);
         if (tmpCount && !isNaN(tmpCount))
         {
            counts[type] = parseInt(tmpCount);
            if (!pending)
               pending = true;
         }
      }

      sendCountsOnPageView();

      return true;
   };

   this.increment = function (pType)
   {
      var tmp;

      if (typeof console !== 'undefined')
         console.log(pType);

      if (!(pType in types))
         return false;

      if (!listeners)
         setupEvents();

      if (counts[pType])
         counts[pType]++;
      else
      {
         tmp = sessionStorage.getItem(types[pType].key);
         counts[pType] = (!tmp || isNaN(tmp)) ? 1 : tmp;
      }

      sessionStorage.setItem(types[pType].key, counts[pType]);

      if (!pending)
         pending = true;

      if (this.callout)
         this.callout();

      return counts[pType];
   };

   this.setCount = function (pType, pCount)
   {
      if (typeof console !== 'undefined')
         console.log(pType);

      if (!(pType in types))
         return false;

      if (!listeners)
         setupEvents();

      counts[pType] = pCount;

      sessionStorage.setItem(types[pType].key, counts[pType]);

      if (!pending)
         pending = true;

      if (this.callout)
         this.callout();

      return counts[pType];
   };

   this.getCount = function (pType)
   {
      if (pType in types && counts[pType])
         return counts[pType];
      return 0;
   };

   init();

   return this;
};

// View Tracker
mistats.ViewTracker = function ()
{
   var date;
   var events;
   var height;
   var length;
   var page;
   var peakView;
   var pgLevel;
   var poller;
   var scroll;

   var cCookie = 'mi_ppv';
   var cTTL = 604800000;

   function trackView(pEvent)
   {
      var comments;
      var newView;
      var numPages;
      var pageLength;
      var rect;
      var zoom;

      zoom = 1;

      if (document.body.getBoundingClientRect)
      {
         rect = document.body.getBoundingClientRect();
         zoom = (rect.right - rect.left) / document.body.offsetWidth;
      }

      if (page.clientHeight / zoom < height || (window.pageYOffset || page.scrollTop) / zoom < scroll)
         return;

      height = page.clientHeight / zoom;
      length = page.scrollHeight / zoom;
      scroll = (window.pageYOffset || page.scrollTop) / zoom;

      date.setTime(date.getTime() + cTTL);

      if (!height)
         return s.c_w(cCookie, 'No Viewport Height', date);

      if (!length)
         return s.c_w(cCookie, 'No Page Height', date);

      comments = document.getElementById('disqus_thread');

      if (comments && comments.offsetTop)
      {
         length -= comments.scrollHeight;
         if (scroll > comments.offsetTop - height)
         {
            if (scroll > (comments.offsetTop - height) + comments.scrollHeight)
               scroll -= comments.scrollHeight;
            else
               scroll = comments.offsetTop - height;
         }
      }

      pageLength = (Math.round(length / 500) * 500);
      numPages = Math.round(length / height);

      if (pageLength <= 250)
         pageLength = 500;
      else if (pageLength > 20000)
         pageLength = 'Over20k';

      if (numPages > 10)
         numPages = '10+';

      newView = (Math.round((((scroll + height) / length) * 100) / 5) * 5);

      if (peakView < newView)
         peakView = newView;
         
      if (peakView >= 100)
      {
         if (events)
         {
            mistats.unbind(window, 'scroll', trackView);
            mistats.unbind(window, 'resize', trackView);
            mistats.unbind(window, 'zoom', trackView);

            events = false;
         }
         peakView = 100;
      }

      s.c_w(cCookie, pgLevel + ': ' + [pageLength + 'px', numPages + 'sc', peakView + '%'].join(' : '), date);
   };

   function init()
   {
      page = document.documentElement;
      peakView = 0;
      date = new Date();

      if (s.prop3.match(/Home|Section|Story|Vendor|Product/i) && !s.prop3.match(/Drupal/i))
         pgLevel = s.prop3.replace(/^\*/, '').substring(0, 3);
      else
         pgLevel = 'Oth';

      trackView();

      mistats.bind(window, 'scroll', trackView);
      mistats.bind(window, 'resize', trackView);
      mistats.bind(window, 'zoom', trackView);

      events = true;
   };

   poller = setInterval(function ()
   {
      if (typeof mitagsent === 'undefined' || !mitagsent)
         return;

      clearTimeout(poller);
      init();
   }, 1000);
};

mistats.viewTracker = new mistats.ViewTracker();

mistats.GCSTracker = function ()
{
   var cPollLim = 500;
   var cFrameId  = /prompt-iframe/i;
   var cSurvey   = /task-form/i;
   var cAnother  = /task-flag/i;

   var first;
   var gcs;
   var origProps;
   var pollPtr;
   var pollCnt;
   var prompt;
   var responses;

   function getElementLikeId(pStr, pObj)
   {
      var a;
      var allObjs;

      pObj = pObj || document;
      allObjs = pObj.getElementsByTagName('*');

      for (a = 0; a < allObjs.length; a++)
         if (allObjs[a].id && allObjs[a].id.match(pStr))
            return allObjs[a];

      return null;
   };

   function navigate()
   {
      mistats.interactionTracker.setCount('gcs_abandon', 0);
      mistats.interactionTracker.setCount('gcs_navigate', 1);
   };

   function bindToAnchors(pState)
   {
      var a;
      var anchors;
      var binder;
      var host;

      binder = (pState) ? mistats.bind : mistats.unbind;

      host = location.hostname.split('.');
      host.splice(0, ((host.length > 2) ? (host.length - 2) : 0));
      host = new RegExp(host.join('.'), 'i');

      anchors = document.getElementsByTagName('a');
      for (a = 0; a < anchors.length; a++)
         if (anchors[a].href && anchors[a].href.replace(/^https*\W{3}/, '').replace(/\/.*/, '').match(host))
            binder(anchors[a], 'mouseup', navigate);
   };

   function askAnother()
   {
      if (pollPtr)
         return;

      mistats.interactionTracker.increment('gcs_another');
      clearInterval(pollPtr);
      pollCnt = 0;
      pollPtr = setInterval(function ()
      {
         if (++pollCnt < cPollLim && !bindResponses())
            return;

         clearInterval(pollPtr);
         pollPtr = null;
      }, 1500);
   };

   function trackSignup(pEvent)
   {
      var evtType;
      var thisDoc;
      var thisObj;

      thisObj = pEvent.srcElement || pEvent.target;
      thisDoc = thisObj.ownerDocument;
      evtType = pEvent.type;

      if (pollPtr)
         clearInterval(pollPtr);

      pollCnt = 0;
      pollPtr = setInterval(function ()
      {
         var msg;

         if (++pollCnt > cPollLim)
         {
            clearInterval(pollPtr);
            pollPtr = null;
         }

         msg = thisDoc.getElementById('et_msgBlock');

         if (!msg || !msg.innerHTML.match || !msg.innerHTML.match(/confirmation/i))
            return;

         mistats.unbind(thisObj, evtType, trackSignup);
         mistats.interactionTracker.increment('gcs_signup');
         mistats.interactionTracker.setCount('gcs_abandon', 0);
         bindToAnchors(false);

         clearInterval(pollPtr);
         pollPtr = null;
      }, 500);
   };

   function next()
   {
      track();
   };

   function surveyTrack(pEvent)
   {
      var r;
      var thisObj;
      
      thisObj = pEvent.srcElement || pEvent.target;

      if (thisObj.className && thisObj.className.match(/disabled/i))
      {
         mistats.interactionTracker.setCount('gcs_abandon', 0);
         setTimeout(function ()
         {
            mistats.interactionTracker.setCount('gcs_abandon', 1);
         }, 50);
         return true;
      }

      mistats.interactionTracker.increment('gcs_survey');
      mistats.interactionTracker.setCount('gcs_abandon', 0);

      if (responses && responses.length)
         for (r = 0; r < responses.length; r++)
            mistats.unbind(responses[r], pEvent.type, surveyTrack);

      bindToAnchors(false);
      setTimeout(next, 1500);
   };

   function bindResponses()
   {
      var r;

      responses = prompt.getElementsByTagName('*');
      if (!responses.length)
         return false;

      for (r = 0; r < responses.length; r++)
         if (responses[r].className
          && responses[r].className.match(/response|ratings|menuitem/i)
          && !responses[r].className.match(/check/i))
         {
            mistats.unbind(responses[r], 'mouseup', surveyTrack);
            mistats.bind(responses[r], 'mouseup', surveyTrack);
         }

      return true;
   };

   function trackContents()
   {
      var a;
      var signup;

      mistats.interactionTracker.setCount('gcs_abandon', 1);

      bindToAnchors(true);

      signup = prompt.getElementsByTagName('iframe');
      if (signup)
      {
         pollCnt = 0;
         pollPtr = setInterval(function ()
         {
            var submit;

            if (++pollCnt > cPollLim)
            {
               clearInterval(pollPtr);
               pollPtr = null;
            }

            if (!(signup && signup[0] && signup[0].contentWindow && signup[0].contentWindow.document))
               return;

            submit = getElementLikeId(/Submit/i, signup[0].contentWindow.document);
            if (!submit)
               return;

            mistats.bind(submit, 'click', trackSignup);
            clearInterval(pollPtr);
            pollPtr = null;
         }, 500);
      }

      mistats.bind(getElementLikeId(cAnother, prompt), 'click', askAnother);
      bindResponses();
   };

   function resetPoller()
   {
      clearTimeout(pollPtr);
      pollPtr = null;
      pollCnt = 0;
   };

   function hasGCS()
   {
      return (gcs) ? gcs : false;
   };

   function track(pReset)
   {
      var p;

      if (pReset)
      {
         resetPoller();
         if (gcs && typeof mitnt === 'object')
         {
            mitnt.createCookie('mi_gcsGallery', '1', 14);
            if (!mitnt.isInitialized)
               mitnt.load();
         }
      }

      prompt = getElementLikeId(cFrameId);

      if (!(prompt && prompt.style.display === ''))
      {
         if (mistats.interactionTracker.getCount('gcs_abandon'))
            mistats.interactionTracker.setCount('gcs_abandon', 0);

         if (++pollCnt < cPollLim)
            pollPtr = setTimeout(track, 250);

         return;
      }

      resetPoller();

      if (arguments.callee.caller != next)
      {
         s.pageName = 'GallerySurvey Form' + ((first) ? '' : ': First');
         s.channel  = mistats.sitename + ': GallerySurvey: ' + mistats.channel;
         s.prop3    = 'GallerySurvey';

         s.t();

         for (p in origProps)
            s[p] = origProps[p];

         first = true;
      }

      prompt = prompt.contentWindow.document;
      trackContents();
   };

   function init()
   {
      origProps =
      {
         pageName: s.pageName,
         channel:  s.channel,
         prop3:    s.prop3
      };

      pollCnt = 0;

      mistats.bind(window, 'load', function ()
      {
         if (typeof mi !== 'undefined' && mi.surveywall && mi.surveywall.surveywallcookie)
         {
            gcs = true;
            track(true);
         }
      });
   };

   this.track = track;
   this.hasGCS = hasGCS;

   init();
};

/* MI/Omniture Ajax Function Call */
function mistats_resend()
{
   if (mistats.updateTracking)
      mistats.updateTracking('page');
   else
   {
      if (!mistats.galleryTracker)
         mistats.galleryTracker = new mistats.GalleryTracker();
      mistats.galleryTracker.increment(1);

      s.prop3 = 'Postload';
      s.t();
   }
}
/* End MI/Omniture Ajax Function Call */

/* Mobile Tracking Code - Ticket# 727-7330633 - 03/24/08 - JJ*/
if(window.location.pathname.match(/mobile/i))
   mistats.version='1.0|v-mobile'
/* End Mobile Tracking Code */

/* VMix Video Widget Tracking Code - Added: 7/15/09 - JJ*/
var player_loaded = 0;

/* A/B Test Name Tracker - Ticket# 727-8271403 - 09/21/09 -JJ*/
if(typeof(mistats_testsuffix) != 'undefined') {
   if(mistats_testsuffix != "" && mistats_testsuffix.indexOf("a_case") < 0  && mistats_testsuffix.indexOf("default") < 0) {
      mistats.pagename += '|' + mistats_testsuffix;
   }
}

function dhtmlLoadScript(url)
{
   var e = document.createElement("script");
   e.src = url;
   e.type="text/javascript";
   document.getElementsByTagName("head")[0].appendChild(e);
}

function vmixEventHandler(event)
{
   if ((event.type == "player_load") && (!player_loaded))
   {
      player_loaded = 1;
      // Updated evenhandler path/file per ticket # 727-8286782  - JJ
      dhtmlLoadScript("http://media.modbee.com/mistats/vendors/vmix_eventhandler.js");
   } else if (player_loaded) {
      myPlayerEventHandler(event);
   }
}

// Pagename Correction for high-ascii characters - Added 3/8/10 - JJ
var tempString   = new String(mistats.pagename);
mistats.pagename = tempString.replace(/[^\x00-\x7f]/g,'');

// Facebook Fix

// Local Vars
var mi_wls = window.location.search, mi_dr = document.referrer, mi_dc = document.cookie;

// Read Previous Page Cookie
mistats.ppu = mi_dc.match ( '(^|;) ?' + 'mi_ppu' + '=([^;]*)(;|$)' );

// FBC Referrer Check
if(mi_dr.match('facebook.com') && mistats.ppu !== 'null') {
   // Get previous page url
   var mi_rr = unescape(mistats.ppu);
   mi_rr = mi_rr.split('=');
   mi_rr = mi_rr[1].split(',');
   mi_rr = mi_rr[0].split(';');

   // Set s.prop10 (mistats.popstoryurl)
   mistats.popstoryurl = 'Facebook_rec_widget';

   // Get API Key if available
   if(mi_wls.match(/api_key/ig)) {
      mistats.popstoryurl = mistats.popstoryurl + ': api_key';
   }

   // Override Referrer
   s.referrer = mi_rr[0];

   // Make sure we send data
   var mitagsent;
}

// Check for FB caused pageview
if(mi_wls.match(/fb_xd_fragment/ig) || mi_wls.match(/fbc_channel/ig)) {
   var mitagsent = true;
}

// Aurora widget customization tracking. See mianalytics.js
if (typeof mi_aurora_page !== 'undefined' && mi_aurora_page)
{
   mistats.custom2 = mianalytics.getSectionOrder('milistOrder');
   mistats.custom3 = mianalytics.trackCustomizations('mipanelState');
}

// If Caspio form is present, prepend pageName and populate s.prop10
if (document.getElementById('caspioform'))
{
   mistats.pagename = 'CaspioPage|' + mistats.pagename;
   s.prop10 = mistats.bizunit + '|' + mistats.sitename + ': CaspioPage';
}

// Place mistats.popular into one of the local variables if specified in the site file
if (mistats.popular && mistats.subPub)
   switch(mistats.subPub)
   {
      case 1:
         mistats.custom1 = mistats.popular;
         break;
      case 2:
         mistats.custom2 = mistats.popular;
         break;
      case 3:
         mistats.custom3 = mistats.popular;
         break;
      default:
         break;
   };

