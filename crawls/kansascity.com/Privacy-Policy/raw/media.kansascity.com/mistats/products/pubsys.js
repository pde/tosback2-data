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

// Interaction Tracking object == 2012-01-31 JG
mistats.InteractionTracker = function ()
{
   var cEvent    = 'event21';
   var cPagename = 'eVar11';
   var cChannel  = 'eVar12';

   var pending;
   var counts;
   var sessionStorage;
   var listeners;
   var types;
   var origEvents;

   types =
   {
      'cs_vote':        {key: 'mi_css', product: 'Poll Votes'},
      'cs_results':     {key: 'mi_csr', product: 'Poll Results'},
      'cs_details':     {key: 'mi_csd', product: 'Poll Details'},
      'cs_hover':       {key: 'mi_csh', product: 'Poll Hover'},
      'gallery_views':  {key: 'mi_gvc', product: 'Gallery Views', eVar: 'eVar6'},
      'gallery_panel':  {key: 'mi_gpc', product: 'Gallery Panel Views'},
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

      if (origEvents)
         s.events = origEvents;

      if (s.products)
         s.products = '';

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

   function generateProductsString()
   {
      var type;
      var products;

      products = [];

      for (type in counts)
         if (types[type].product && counts[type])
            products[products.length] = ';' + ((mistats.sitename) ? mistats.sitename : 'Unknown') + ': ' + types[type].product + ';;;' + cEvent + '=' + counts[type];

      return products.join(',');
   };

   function sendCountsNow(pEvent)
   {
      var newVars;
      var type;

      if (!pending)
         return;

      newVars =
      {
         products:        generateProductsString(),
         events:          cEvent,
         linkTrackEvents: cEvent,
         linkTrackVars:   ['events', 'products', cPagename, cChannel].join(',')
      };

      newVars[cPagename] = s.pageName;
      newVars[cChannel]  = s.channel;

      includeOptionalVars(newVars, true);
      clearStoredStats();

      s.tl(true, 'o', 'Interactions', newVars);
   };

   function sendCountsOnPageView()
   {
      var pollCount;
      var pollPtr;
      var type;

      if (!pending || (typeof mitagsent !== 'undefined' && mitagsent))
         return false;

      if (s.events && s.events.length)
         origEvents = s.events;

      s.events     = (origEvents) ? [origEvents, cEvent].join(',') : cEvent;
      s.products   = generateProductsString();

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
      var thisObj;

      if (!pending)
         return;

      if (pEvent.type === 'mouseout')
         if (pEvent.clientX > 0 && pEvent.clientX < document.documentElement.clientWidth
          && pEvent.clientY > 0 && pEvent.clientY < document.documentElement.clientHeight)
            return;

      if (pEvent.type === 'mousedown')
      {
         thisObj = (pEvent.srcElement) ? pEvent.srcElement : pEvent.target;

         if (pEvent.button > 1 || thisObj.nodeName.match(/OBJECT|EMBED/))
            return;

         while (thisObj && !thisObj.nodeName.match(/HTML|BODY|A/))
            thisObj = (thisObj.parentElement) ? thisObj.parentElement : thisObj.parentNode;

         if (!thisObj.href || thisObj.href.match(/^javascript:|^#/i) || (thisObj.target && thisObj.target.match(/_blank/i)))
            return;

         if (thisObj.href.toLowerCase().replace(new RegExp('https*://'), '').split('/')[0] == location.hostname.toLowerCase())
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

      s[cPagename] = s.c_r('mi_ppn');
      s[cChannel]  = s.getPreviousValue(s.channel, 'mi_pch');

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
      console.log(pType);
      if (!(pType in types))
         return false;

      if (!listeners)
         setupEvents();

      if (counts[pType])
         counts[pType]++;
      else
         counts[pType] = 1;

      sessionStorage.setItem(types[pType].key, counts[pType]);

      if (!pending)
         pending = true;

      return counts[pType];
   };

   this.setCount = function (pType, pCount)
   {
      console.log(pType);
      if (!(pType in types))
         return false;

      if (!listeners)
         setupEvents();

      if (pCount)
         counts[pType] = pCount;

      sessionStorage.setItem(types[pType].key, counts[pType]);

      if (!pending)
         pending = true;

      return counts[pType];
   };

   init();

   return this;
};

// Gallery tracking object -- 2011-12-07 JG
mistats.GalleryTracker = function ()
{
   var count;
   var clicked;
   var clickTimer;

   function updateTracking(pEvent)
   {
      var newVars;
      var thisObj;

      if (!count || clicked)
         return;

      if (pEvent.target)
         thisObj = pEvent.target;
      else if (pEvent.srcElement)
         thisObj = pEvent.srcElement;

      if (!thisObj)
         thisObj = document;

      newVars =
      {
         channel:         mistats.sitename + ': ' + mistats.channel,
         events:          'event21',
         linkTrackEvents: 'event21',
         linkTrackVars:   'events,products,channel,eVar4,eVar6',
         products:        ';' + ((mistats.sitename) ? mistats.sitename : 'Unknown') + ': Gallery Views;;;event21=' + count.toString(),
         eVar4:           mistats.pagename,
         eVar6:           '+' + count.toString()
      };

      try
      {
         s.tl(thisObj, 'o', 'Gallery Views', newVars);
         count = 0;
      } catch (miError)
      {
         try
         {
            s.tl(true, 'o', 'Gallery Views', newVars);
            count = 0;
         } catch (miError)
         {
            if (typeof console === 'object')
               if (console.log)
                  console.log('s.tl() failed. Event: "' + pEvent.type + '"');
         };
      };
   };

   function beforeUnload(pEvent)
   {
      var href;
      var hashIdx;
      var thisObj;

      if (pEvent.type.match(/mouse|click/))
      {
         thisObj = pEvent.target;

         if (pEvent.button > 1 || thisObj.nodeName.match(/OBJECT|EMBED/))
            return;

         while (thisObj && !thisObj.nodeName.match(/BODY|#document/) && !(thisObj.href || thisObj.action))
            thisObj = thisObj.parentNode;

         if (thisObj.href)
         {
            href = thisObj.href.toLowerCase();;
            if (href.length)
            {
               if (!href.search(/^javascript:|^#/))
                  return;
               hashIdx = href.indexOf('#');
               if (hashIdx !== -1)
                  href = href.substring(0, hashIdx);
               if (href == location.href.toLowerCase())
                  return;
            }
         } else
            return;
      }

      setTimeout(function ()
      {
         updateTracking(pEvent);
      }, 0);
   };

   function init()
   {
      var evtTest;

      count   = 0;
      clicked = false;

      if (window.addEventListener)
      {
         if (!('ontouchstart' in window))
         {
            window.addEventListener('mousedown', beforeUnload, false);
            window.addEventListener('blur', beforeUnload, false);

            evtTest = document.createElement('iframe');
            evtTest.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(evtTest);
            evtTest.contentWindow.addEventListener('beforeunload', function ()
            {
               window.removeEventListener('blur', beforeUnload, false);
               window.removeEventListener('mousedown', beforeUnload, false);
            }, false);
            evtTest.contentWindow.location.reload(true);
            setTimeout(function ()
            {
               evtTest.parentNode.removeChild(evtTest);
            }, 0);
         } else
            window.addEventListener('pagehide', updateTracking, false);

         window.addEventListener('unload', updateTracking, false);
         window.addEventListener('beforeunload', updateTracking, false);
      } else if (window.attachEvent)
      {
         if (window != top)
            document.body.attachEvent('ondeactivate', updateTracking);
         window.attachEvent('onunload', updateTracking);
         window.attachEvent('onbeforeunload', updateTracking);
      }

      return true;
   };

   this.increment = function (pCount)
   {
      count += pCount;

      clicked = true;

      if (clickTimer)
         clearTimeout(clickTimer);

      clickTimer = setTimeout(function ()
      {
         clicked = false;
      }, 1000);
   };

   init();

   return this;
}

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

   function unbind(pObj, pType, pCallout)
   {
      if (pObj.removeEventListener)
         pObj.removeEventListener(pType, pCallout, false);
      else if (pObj.detachEvent)
         pObj.detachEvent('on' + pType, pCallout);
   };

   function bind(pObj, pType, pCallout)
   {
      if (pObj.addEventListener)
         pObj.addEventListener(pType, pCallout, false);
      else if (pObj.attachEvent)
         pObj.attachEvent('on' + pType, pCallout);
   };

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
            unbind(window, 'scroll', trackView);
            unbind(window, 'resize', trackView);
            unbind(window, 'zoom', trackView);

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

      bind(window, 'scroll', trackView);
      bind(window, 'resize', trackView);
      bind(window, 'zoom', trackView);

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

