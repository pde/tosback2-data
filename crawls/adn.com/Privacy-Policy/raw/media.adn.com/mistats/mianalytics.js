// MI Analytics Library

var mianalytics = mianalytics || {};
var mi_aurora_page;
var trifecta;

mi_aurora_page = true;

// Trifecta Widget Tagging
trifecta =
{
   name: 'widget',
   site:
   [
      {id: 'group',        label: ''},
      {id: 'homes_widget', label: 'homes'},
      {id: 'cars_widget',  label: 'cars'},
      {id: 'jobs_widget',  label: 'jobs'}
   ]
};

// Code to track Aurora customization use
mianalytics.trackCustomizations = function (mi_cn)
{
   var mi_kcc;
   var mi_i;
   var mi_ci;
   var mi_w;
   var mi_cw;
   var mi_cc;

   mi_kcc = '' + document.cookie;
   mi_i   = mi_kcc.indexOf(mi_cn);
   mi_ci  = mi_kcc.indexOf(';', mi_i);
   mi_w   = '';
   mi_cw  = [];
   mi_cc  = 0;

   if (mi_i === -1 || mi_cn === '')
      return '';

   if (mi_ci === -1)
      mi_ci = mi_kcc.length;

   mi_w  = unescape(mi_kcc.substring(mi_i + mi_cn.length + 1, mi_ci));
   mi_w  = mi_w.split(',');
   mi_cc = mi_w.length;

   while (mi_cc--)
      if (mi_w[mi_cc].match(/tease/g))
         mi_cw += mi_w[mi_cc] + ',';

   if(mi_cw.length > 0)
   {
      mi_cw = mi_cw.replace(/sec_|split|tease|_widget-widget|\;| |mipanelState=/g, '');
      mi_cw = mi_cw.substr(0, mi_cw.length - 1);
      return 'Widgets: ' + mi_cw;
   } else
      return 'Widgets: Touched';
};

// Section order tracking
mianalytics.getSectionOrder = function (mi_cn)
{
   var mi_kcc;
   var mi_i;
   var mi_ci;
   var mi_w;

   mi_kcc = '' + document.cookie;
   mi_i   = mi_kcc.indexOf(mi_cn);
   mi_ci  = mi_kcc.indexOf(';',mi_i);
   mi_w   = '';

   if (mi_i === -1 || mi_cn === '')
      return '';

   if (mi_ci === -1)
      mi_ci = mi_kcc.length;

   mi_w = unescape(mi_kcc.substring(mi_i + mi_cn.length + 1, mi_ci)).replace(/sec_|_widget/g, '');

   return 'Order: ' + mi_w;
};

mianalytics.getWidgets = function ()
{
   var a;
   var allDivs;
   var wgtDict;
   var wgtList;

   allDivs = document.getElementsByTagName('div');
   wgtDict = {};

   for (a = 0; a < allDivs.length; a++)
      if (allDivs[a].id.match(/^wgt_/i) && !allDivs[a].id.match(/_sec/i))
         wgtDict[allDivs[a].id.toLowerCase().replace(/^wgt_/, '')] = true;

   wgtList = [];
   for (a in wgtDict)
      wgtList[wgtList.length] = a;

   return wgtList.join(',');
};

mianalytics.getElementByClassName = function (pClass, pParent)
{
   var a;
   var allObjs;

   if (typeof pParent === 'string')
      pParent = document.getElementById(pParent);

   if (!pParent)
      pParent = document;

   if (typeof pClass === 'string')
      pClass = new RegExp('^' + pClass + '$');

   allObjs = pParent.getElementsByTagName('*');

   for (a = 0; a < allObjs.length; a++)
      if (allObjs[a].className.match(pClass))
         return allObjs[a];

   return null;
};

mianalytics.unbind = function (pObj, pType, pCallout)
{
   if (pObj.removeEventListener)
      pObj.removeEventListener(pType, pCallout, false);
   else if (pObj.detachEvent)
      pObj.detachEvent('on' + pType, pCallout);
};

mianalytics.bind = function (pObj, pType, pCallout)
{
   if (pObj.addEventListener)
      pObj.addEventListener(pType, pCallout, false);
   else if (pObj.attachEvent)
      pObj.attachEvent('on' + pType, pCallout);
};

// Monitor widget interactions
mianalytics.TrackWidgets = function ()
{
   var origNext;

   function trackViewMore(pEvent)
   {
      mistats.interactionTracker.increment('view_more');
   }

   function trackShowHide(pEvent)
   {
      var thisObj;

      thisObj = (pEvent.srcElement) ? pEvent.srcElement : pEvent.target;

      while (!thisObj.className.match(/section_digest|widget/) && thisObj.nodeName !== 'BODY')
         thisObj = (thisObj.parentElement) ? thisObj.parentElement : thisObj.parentNode;

      if (!thisObj || !thisObj.className.match(/section_digest|widget/))
         return;

      if (thisObj.className.match(/tease/))
         mistats.interactionTracker.increment('widget_show');
      else
         mistats.interactionTracker.increment('widget_hide');
   };

   function verifyMove(pEvent)
   {
      var evtType;
      var section;
      var thisObj;

      evtType = pEvent.type;
      thisObj = (pEvent.srcElement) ? pEvent.srcElement : pEvent.target;
      section = thisObj;

      while (!section.className.match(/section_digest/) && section.nodeName !== 'BODY')
         section = (section.parentElement) ? section.parentElement : section.parentNode;

      setTimeout(function ()
      {
         if (section && section.className.match(/section_digest/) && section.nextSibling != origNext)
            mistats.interactionTracker.increment('widget_move');

         mianalytics.unbind(thisObj, evtType, verifyMove);
      }, 1500);
   };

   function trackMove(pEvent)
   {
      var section;
      var thisObj;

      thisObj = (pEvent.srcElement) ? pEvent.srcElement : pEvent.target;
      section = thisObj;

      while (!section.className.match(/section_digest/) && section.nodeName !== 'BODY')
         section = (section.parentElement) ? section.parentElement : section.parentNode;

      if (!section || !section.className.match(/section_digest/))
         return;

      origNext = section.nextSibling;

      mianalytics.bind(thisObj, 'mouseup', verifyMove);
   };

   function init()
   {
      var c;
      var ch;

      if (typeof mistats === 'undefined' || !mistats.interactionTracker)
         return;

      ch = document.getElementsByTagName('*');
      for (c = 0; c < ch.length; c++)
         if (ch[c].className === 'arrow')
            mianalytics.bind(ch[c], 'mouseup', trackShowHide);
         else if (ch[c].className === 'heading')
            mianalytics.bind(ch[c], 'mousedown', trackMove);
         else if (ch[c].className === 'more_button')
            mianalytics.bind(ch[c], 'mouseup', trackViewMore);
   };

   mianalytics.bind(window, 'load', init);
};

// Monitor Trifecta interactions
mianalytics.TrackTrifecta = function ()
{
   var cTrifectaId = 'widget_bundle';
   var cWidgetIds = /wgt_topjobs|wgt_cars|wgt_homefinder/;

   function trifectaClk(pEvent)
   {
      var delay;
      var thisObj;
      var wgtLabel;

      thisObj = (pEvent.srcElement) ? pEvent.srcElement : pEvent.target;

      if (!thisObj || (pEvent.button && pEvent.button > 1) || (pEvent.keyCode && pEvent.keyCode !== 13))
         return;

      while (thisObj && !wgtLabel)
      {
         thisObj = (thisObj.parentElement) ? thisObj.parentElement : thisObj.parentNode;
         if (thisObj && thisObj.id)
            wgtLabel = thisObj.id.match(cWidgetIds);
      }

      if (wgtLabel)
      {
         mianalytics.unbind(thisObj, pEvent.type, trifectaClk);
         setTimeout(function ()
         {
            mistats.interactionTracker.increment(wgtLabel[0]);
         }, 0);
      }

      delay = [];
      delay[0] = new Date();
      delay[1] = new Date();
      while (delay[1].getTime() - delay[0].getTime() < 500)
         delay[1] = new Date();
   };

   function init()
   {
      var c;
      var ch;
      var tc;

      tc = document.getElementById(cTrifectaId);

      if (!tc || typeof mistats === 'undefined' || !mistats.interactionTracker)
         return;

      ch = tc.getElementsByTagName('*');
      for (c = 0; c < ch.length; c++)
         switch(ch[c].nodeName)
         {
            case 'A':
               if (ch[c].target)
                  ch[c].target = '_top';
            case 'BUTTON':
               mianalytics.bind(ch[c], 'mousedown', trifectaClk);
               break;
            case 'INPUT':
               mianalytics.bind(ch[c], 'keypress', trifectaClk);
               break;
         }
   };

   mianalytics.bind(window, 'load', init);
};

// Monitor CivicScience Poll
mianalytics.TrackPoll = function ()
{
   var cBeacon = 'mi_CSBeacon';

   var bb;
   var clk;
   var pb;

   result = function ()
   {
      mistats.interactionTracker.increment('cs_results');
   };

   details = function (pEvent)
   {
      mistats.interactionTracker.increment('cs_details');
      mianalytics.unbind((pEvent.srcElement || pEvent.target), pEvent.type, details);
   };

   vote = function (pEvent)
   {
      if (!clk)
         return;

      clk = false;
      mistats.interactionTracker.increment('cs_vote');

      if (typeof mitnt !== 'undefined' && mitnt.offerCallout)
         mitnt.offerCallout();
   };

   function updateBeacon()
   {
      var b;
      var c;
      var ch;

      bb = bb || mianalytics.getElementByClassName('civicscience ballotbox');
      if (!bb)
         return;

      pb = pb || mianalytics.getElementByClassName('poll_body', bb)
      if (!pb)
         return;

      if (document.getElementById(cBeacon))
         return;

      b = document.createElement('div');
      b.id = cBeacon;
      b.style.display = 'none';
      pb.appendChild(b);

      ch = pb.getElementsByTagName('*');

      for (c = 0; c < ch.length; c++)
         if (ch[c].className === 'answer')
            mianalytics.bind(ch[c], 'mouseup', function ()
            {
               clk = true;
            });
         else if (ch[c].className === 'vote')
            mianalytics.bind(ch[c], 'mouseup', vote);
         else if (ch[c].nodeName === 'A' && ch[c].parentNode.className === 'detailed_results')
            mianalytics.bind(ch[c], 'mouseup', details);

      if (mianalytics.getElementByClassName('result', pb))
         return result();
   };

   function init()
   {
      if (mistats.interactionTracker && mianalytics.getElementByClassName(/^widget civicscience/))
         setInterval(updateBeacon, 1000);
   };

   this.ballotBox = function ()
   {
      return bb;
   };

   mianalytics.bind(window, 'load', init);
};

mianalytics.TrackShares = function ()
{
   var bound;
   var count;
   var iframes;
   var mouseX;
   var mouseY;

   function trackAnchor(pEvent)
   {
      var thisObj;
      
      thisObj = pEvent.srcElement || pEvent.target;

      if (thisObj && thisObj.className && !(thisObj.className === 'print' || thisObj.className === 'email'))
         return;

      mianalytics.unbind(thisObj, pEvent.type, trackAnchor);
      mistats.interactionTracker.increment('share_' + thisObj.className);
      mistats.interactionTracker.increment('share_any');
   };

   function trackIframe(pEvent)
   {
      var coords;
      var i;

      for (i = 0; i < iframes.length; i++)
         if (iframes[i].obj)
         {
            coords = iframes[i].obj.getBoundingClientRect();
            if (mouseX >= coords.left
             && mouseX <= coords.left + iframes[i].width
             && mouseY >= coords.top
             && mouseY <= coords.top + iframes[i].height
             && !iframes[i].shared)
            {
               iframes[i].shared = true;
               mistats.interactionTracker.increment('share_' + iframes[i].id);
               mistats.interactionTracker.increment('share_any');
               return;
            }
         }
   };

   function mouseover(pEvent)
   {
      mouseX = pEvent.clientX;
      mouseY = pEvent.clientY;

      if (bound)
         return;

      bound = true;

      if (window.addEventListener)
         window.addEventListener('blur', trackIframe, false);
      else if (document.documentElement.attachEvent)
         document.documentElement.attachEvent('ondeactivate', trackIframe);
   };

   function mouseout(pEvent)
   {
      bound = false;

      if (window.removeEventListener)
         window.removeEventListener('blur', trackIframe, false);
      else if (document.documentElement.detachEvent)
         document.documentElement.detachEvent('ondeactivate', trackIframe);
   };

   function init()
   {
      var objs;
      var o;
      var st;
      var t;

      if (count++ < 120 && !(document.readyState || '').match(/complete|ready/i))
      {
         setTimeout(init, 500);
         return;
      }

      st = mianalytics.getElementByClassName('story-toolbar');
      if (!(st && typeof mistats === 'object' && mistats.interactionTracker))
         return;

      mianalytics.bind(st, 'mouseover', mouseover);
      mianalytics.bind(st, 'mouseout', mouseout);

      iframes =
      [
         {id: 'fb', url: /facebook\.com.*\/like\.php/i,  width: -25, height: 0, obj: null, shared: false},
         {id: 'tw', url: /twitter.com.*\/tweet_button/i, width: -40, height: 0, obj: null, shared: false},
         {id: 'gp', url: /plusone\.google\.com/i,        width: -50, height: 0, obj: null, shared: false}
      ];

      objs = st.getElementsByTagName('iframe');
      for (o = 0; o < objs.length; o++)
         if (objs[o].src)
            for (t = 0; t < iframes.length; t++)
               if (iframes[t].url.test(objs[o].src))
               {
                  iframes[t].obj = objs[o];
                  iframes[t].width += objs[o].clientWidth;
                  iframes[t].height += objs[o].clientHeight;
               }

      objs = st.getElementsByTagName('a');
      for (o = 0; o < objs.length; o++)
         mianalytics.bind(objs[o], 'mouseup', trackAnchor);
   };

   count = 0;
   init();
};

mianalytics.trackShares = new mianalytics.TrackShares();
mianalytics.trackPoll = new mianalytics.TrackPoll();
mianalytics.trackWidgets = new mianalytics.TrackWidgets();
mianalytics.trackTrifecta = new mianalytics.TrackTrifecta();

