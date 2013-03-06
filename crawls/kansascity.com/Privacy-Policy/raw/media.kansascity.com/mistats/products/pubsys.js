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
   session: function ()
   {
      var vs;

      vs = parseInt(s.c_r('mi_vs1'));
      if (!isNaN(vs) && (new Date()).getTime() - vs < 43200000)
         return vs;

      return null;
   }(),

   hasCookies: function ()
   {
      if (navigator.cookieEnabled && !s.c_r('mi_act'))
      {
         s.c_w('mi_act', '1', new Date((new Date()).getTime() + 1000));
         if (s.c_r('mi_act') == '1')
            return true;
      }

      return false;
   },

   nextWeek: function ()
   {
      var date;

      date = new Date();
      date.setTime(date.getTime() + (Math.abs(7 - date.getDay()) * 86400000));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      return new Date(date.getTime() - mistats.date.getOffset());
   },

   nextMonth: function (pDate)
   {
      var date;

      date = new Date();

      return new Date((new Date(date.getFullYear(), (date.getMonth() + 1), 1)).getTime() - mistats.date.getOffset());
   },

   updateProducts: function (pName, pInc, pDec)
   {
      if (!pInc)
         return;

      s.products = (s.products) ? s.products.replace(new RegExp(',*;' + pName + ' \d+;;;' + this.event + '=-*\d+', 'g'), '').split(',') : [];
      if (pDec && pDec < pInc)
         s.products[s.products.length] = ';' + pName + ' ' + pDec + ';;;' + this.event + '=-1';
      s.products[s.products.length] = ';' + pName + ' ' + pInc + ';;;' + this.event + '=1';
      s.products = s.products.join(',');

      s.events = (s.events) ? s.events.replace(new RegExp(',*' + this.event + '[^,]*', 'g'), '').split(',') : [];
      s.events[s.events.length] = this.event;
      s.events = s.events.join(',');
   },

   updateCount: function (pLabel, pCookie, pValidate)
   {
      var c;
      var cm;
      var cw;
      var i;
      var o;

      cm = pCookie + '_m';
      cw = pCookie + '_w';

      c = s.c_r(cw).match(/\d+/g);
      i = c ? parseInt(c[1] || 0) : 0;
      if (pValidate)
         i++;
      o = c ? parseInt(c[0] || 0) : i;
      if (!this.session)
         this.updateProducts('Weekly ' + pLabel, i, o);
      s.c_w(cw, [this.session ? o : i, i].join('|'), (new Date(this.nextWeek())));

      c = s.c_r(cm).match(/\d+/g);
      i = c ? parseInt(c[1] || 0) : 0;
      if (pValidate)
         i++;
      o = c ? parseInt(c[0] || 0) : i;
      if (!this.session)
         this.updateProducts('Monthly ' + pLabel, i, o);
      s.c_w(cm, [this.session ? o : i, i].join('|'), (new Date(this.nextMonth())));
   },

   updateAll: function ()
   {
      if (!this.hasCookies())
         return;

      this.updateCount('PVs', 'mi_pc1', true);
      this.updateCount('Stories', 'mi_sc1', mistats.pagelevel && mistats.pagelevel.match(/story/i));
      this.updateCount('Visits', 'mi_vc1', !this.session);

      s.c_w('mi_vs1', this.session || (new Date()).getTime(), (new Date((new Date()).getTime() + 1800000)));
   }
};

mistats.AdTracker = function ()
{
   var cEvent = 'event18';

   var adZone;
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
         def = null;

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

         if (!adZone)
         {
            adZone = src.match(/\/mi\.\w{3}[^;]+/);
            if (adZone)
               adZone = adZone[0].replace(/\/[^\/]+/, '');
         }

         do
            def = (def || scripts[i]).nextSibling || null;
         while (def && def.nodeName.match(/^#/));

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

   function track()
   {
      fillAdArray();

      s.eVar15 = '';

      if (!allAds.length)
         return;
         
      s.eVar15 = adZone || 'Unknown';

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

mistats.InteractionTracker = function ()
{
   var cEvent    = 'event21';
   var cPagename = 'eVar13';
   var cChannel  = 'eVar14';

   var counts;
   var listeners;
   var pending;
   var pendTimer;
   var types;

   types =
   {
      'cs_vote':    {product: 'Poll Votes'},
      'cs_results': {product: 'Poll Results'},
      'cs_details': {product: 'Poll Details'},
      'cs_hover':   {product: 'Poll Hover'},

      'dsq-like-thread':    {product: 'Dsq Like Page'},
      'dsq-dislike-thread': {product: 'Dsq Dislike Page'},
      'dsq-toolbar':        {product: 'Dsq Community'},
      'dsq-account':        {product: 'Dsq Login'},
      'dsq-collapse':       {product: 'Dsq Hide/Show'},
      'dsq-expand':         {product: 'Dsq Hide/Show'},
      'dsq-button':         {product: 'Dsq Post'},
      'dsq-sort':           {product: 'Dsq Sort'},
      'dsq-like':           {product: 'Dsq Like Post'},
      'dsq-reply':          {product: 'Dsq Reply'},
      'dsq-email':          {product: 'Dsq Email'},
      'dsq-rss':            {product: 'Dsq RSS'},
      'dsq-pagination':     {product: 'Dsq Page'},

      'gallery_views': {product: 'Gallery Views', eVar: 'eVar6'},
      'gallery_panel': {product: 'Gallery Panel Views'},

      'gcs_another':  {product: 'GCS Ask Another'},
      'gcs_signup':   {product: 'GCS Signup'},
      'gcs_survey':   {product: 'GCS Answered Survey'},
      'gcs_abandon':  {product: 'GCS Exited Site'},
      'gcs_navigate': {product: 'GCS Exited Page'},

      'share_fb':    {product: 'Share Facebook'},
      'share_tw':    {product: 'Share Twitter'},
      'share_gp':    {product: 'Share Google+'},
      'share_print': {product: 'Share Print'},
      'share_email': {product: 'Share Email'},
      'share_any':   {product: 'Share Any'},

      'view_more': {product: 'View More Stories'},

      'widget_show': {product: 'Widget Show'},
      'widget_hide': {product: 'Widget Hide'},
      'widget_move': {product: 'Widget Move'},

      'wgt_topjobs':    {product: 'Trifecta Jobs'},
      'wgt_cars':       {product: 'Trifecta Cars'},
      'wgt_homefinder': {product: 'Trifecta Homes'}
   };

   function resetCounts()
   {
      var type;

      for (type in types)
      {
         counts[type] = 0;
         sessionStorage[type] = null;
      }

      pending = false;
   };

   function resetProps()
   {
      var type;

      for (type in types)
         if (types[type].eVar)
            s[types[type].eVar] = '';

      s[cPagename] = '';
      s[cChannel] = '';
   };

   function save()
   {
      var type;

      for (type in types)
         sessionStorage[type] = counts[type] || null;

      pending = false;
   };

   function currentBeacon()
   {
      var beacons;
      var i;
      var index;

      beacons = [];

      for (i in window)
         if (i.match(/s_i_\w+[_\d+]*$/))
         {
            index = i.match(/\d+$/);
            index = index ? parseInt(index[0]) : 0;
            beacons[index] = i.replace(/_\d+$/, '') + '_' + index;
         }

      return beacons.length ? beacons[beacons.length - 1] : null;
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
      var beaconUrl;
      var currBeacon;
      var evtStr;
      var lastBeacon;
      var newVars;
      var type;
      var xmlReq;

      if (!pending)
         return;

      lastBeacon = currentBeacon();
      evtStr = generateEventsString();

      newVars =
      {
         products:        generateProductsString(false),
         events:          evtStr,
         linkTrackEvents: evtStr,
         linkTrackVars:   ['events', 'products', cPagename, cChannel].join(',')
      };

      newVars[cPagename] = s.pageName;
      newVars[cChannel]  = (mistats.bizunit || '').match(/MAC/) ? (s.prop16 + ': ' + s.prop17) : s.channel;

      includeOptionalVars(newVars, true);
      resetCounts();

      if (newVars.products)
         s.tl(true, 'o', 'Interactions', newVars);

      currBeacon = currentBeacon();
      if (currBeacon !== lastBeacon && typeof XMLHttpRequest !== 'undefined')
      {
         beaconUrl = window[currBeacon].src || '';
         window[currBeacon].src = '';
         xmlReq = new XMLHttpRequest();
         xmlReq.open('get', beaconUrl, false);
         xmlReq.send(null);
      }
   };

   function sendCountsOnPageView()
   {
      var type;

      if (!pending || (typeof mitagsent !== 'undefined' && mitagsent))
         return false;

      s.products = generateProductsString(true);
      if (!s.products)
         return reset();

      s.events = generateEventsString();

      s[cPagename] = s.c_r('mi_ppn');
      s[cChannel]  = s.c_r('mi_pch');

      includeOptionalVars(s);
      resetCounts();
   };

   function setPending()
   {
      if (pendTimer)
         clearTimeout(pendTimer);

      pending = false;
      pendTimer = setTimeout(function ()
      {
         pending = true;
      }, 25);
   };

   function beforeUnload(pEvent)
   {
      var href;
      var i;
      var thisObj;

      if (!pending)
         return;

      if (pEvent.type === 'mouseup')
      {
         thisObj = pEvent.srcElement || pEvent.target;

         if (pEvent.button > 1 || thisObj.nodeName.match(/OBJECT|EMBED/))
            return;

         while (thisObj && thisObj.nodeName !== 'A')
            thisObj = thisObj.parentNode || null;

         if (!thisObj)
            return;

         if ((thisObj.getAttribute('href') || '').match(/^$|^javascript:|^#|^mailto:/i) || ((thisObj.target || '').match(/_blank/i)))
            return setPending();

         if ((thisObj.href || '').toLowerCase().replace(/^https*:\/{2}/, '').split('/')[0] == location.hostname.toLowerCase())
            return save();
      }

      sendCountsNow(pEvent);
   };

   function setupEvents()
   {
      if (listeners)
         return false;

      mistats.bind(document.documentElement, 'mouseup', beforeUnload);
      mistats.bind(window, 'beforeunload', beforeUnload);
      if (window.addEventListener && 'ontouchstart' in window)
         window.addEventListener('pagehide', beforeUnload, false);

      listeners = true;

      return true;
   }

   function init()
   {
      var tmpCount;
      var type;

      if (!window.sessionStorage)
         return;

      listeners = false;
      pending   = false;
      counts    = {};

      for (type in types)
         if (sessionStorage[type])
         {
            tmpCount = sessionStorage[type];
            if (tmpCount && !isNaN(tmpCount))
            {
               counts[type] = parseInt(tmpCount);
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

      if (!types[pType])
         return false;

      if (!listeners)
         setupEvents();

      counts[pType] = (counts[pType] || 0) + 1;

      setPending();

      if (this.callout)
         this.callout(pType);

      return counts[pType];
   };

   this.setCount = function (pType, pCount)
   {
      if (typeof console !== 'undefined')
         console.log(pType);

      if (!types[pType])
         return false;

      if (!listeners)
         setupEvents();

      counts[pType] = pCount;

      setPending();

      if (this.callout)
         this.callout(pType);

      return counts[pType];
   };

   this.getCount = function (pType)
   {
      if (types[pType] && counts[pType])
         return counts[pType];
      return 0;
   };

   this.resetProps = resetProps;

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
      var thisObj;

      thisObj = pEvent.srcElement || pEvent.target;

      mistats.unbind(thisObj, pEvent.type, trackSignup);
      mistats.interactionTracker.increment('gcs_signup');
      mistats.interactionTracker.setCount('gcs_abandon', 0);
      bindToAnchors(false);
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
            var login;

            if (++pollCnt > cPollLim)
            {
               clearInterval(pollPtr);
               pollPtr = null;
            }

            if (!(signup && signup[0] && signup[0].contentWindow && signup[0].contentWindow.document))
               return;

            login = signup[0].contentWindow.document.getElementById('plus-link');
            if (!login)
               return;

            mistats.bind(login, 'click', trackSignup);
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
         if (typeof mi !== 'undefined'
          && mi.surveywall
          && mi.surveywall.getConf
          && mi.surveywall.getConf('enabled'))
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

