// Final Omniture Code File
// Used to convert MI variable to Omniture variables and
// also makes the final img call.
///////////////////////////////////////////////////////////////

// Set Doubletag flag if page already counted - Added 10/25/2010 - JJ
if(typeof(mitagsent) === 'undefined') {
	var mitagsent;if(mitagsent){ mistats.taxonomy = "DOUBLETAG-Not-Reported||||"; }
}
else {
	if(mitagsent){ mistats.taxonomy = "DOUBLETAG-Not-Reported||||" };
}

// Server and URL variables
mistats.server      = (location.hostname || '').toLowerCase().replace(/^www\./, '');
mistats.url         = location.protocol + '//' + location.hostname + location.pathname;
mistats.querystring = ((location.search || '').length > 1 ? location.search : '') + ((location.hash || '').length > 1 ? location.hash : '');

// New Insite Tracking
// Added 8/19/09 - JJ
function getMIcookie( cookie_name, type ) {

	// Get contents of cookie
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

	// Type of cookie to parse
	switch(type) {
		case 'user': {
			// Make sure we have an Insite cookie and it contains data
			if(typeof(results) != 'undefined') {
				if(results != null) {
					insiteData = unescape(results[2]);
					insiteData = insiteData.split('|');
					return insiteData[0];
				}
				else
					return 'Unknown';
			}
			else
				return 'Unknown';
		}
		case 'segment': {
			// Make sure we have a Segments cookie and it contains data
			if(typeof(results) != 'undefined') {
				if(results != null) {
					segmentData = unescape(results[2]);
					segmentData = segmentData.replace(/%20/g,'|');
					return segmentData;
				}
				else
					return 'Unknown';
			}
			else
				return 'Unknown';
		}
	}
}

// Track PressPlus users - 2012-09-12 JG
mistats.pressPlus =
{
   PP_COOKIE: 'ppUser',
   MI_COOKIE: 'mi_pptkid',

   readCookie: function (pKey)
   {
      var dc;
      var i;

      dc = document.cookie.split('; ');
      for (i = 0; i < dc.length; i++)
         if (dc[i].indexOf(pKey + '=') === 0)
            return unescape(dc[i].substring(dc[i].indexOf('=') + 1));
      return null;
   },

   writeCookie: function (pKey, pVal, pDays)
   {
      var date;
      var h;

      date = new Date();
      date.setTime(date.getTime() + (86400000 * pDays));
      h = location.hostname.toLowerCase().split('.');
      h.splice(0, (h.length > 2) ? h.length - 2 : 0);

      document.cookie = [pKey + '=' + escape(pVal), 'expires=' + date.toGMTString(), 'path=/', 'domain=' + h.join('.')].join('; ');

      return null;
   },

   getToken: function ()
   {
      var i;
      var pp;
      var sd;
      var token;

      sd = mistats.staffDomains || [];
      sd.push('mcclatchyinteractive.com', 'mcclatchy.com');

      pp = this.readCookie(this.PP_COOKIE);
      if (pp)
      {
         email = pp.match(/email=.*[&|$]/);
         if (email)
         {
            email = email[0].substring(6).replace(/&$/, '');
            for (i = 0; i < sd.length; i++)
               if (email.match(sd[i]))
                  return this.writeCookie(this.MI_COOKIE, '', -1);
         }
      }

      token = this.readCookie(this.MI_COOKIE);
      if (!token && pp)
      {
         token = pp.match(/token=.+/);
         if (token)
            token = token[0].substring(6).replace(/&.*$/, '');
      }

      if (token)
      {
         this.writeCookie(this.MI_COOKIE, token, 14);
         return ['PressPlus', (mistats.bizunit || 'XXX'), token].join(': ');
      }

      return null;
   }
};

mistats.insiteid = mistats.pressPlus.getToken();
if (!mistats.insiteid)
{
   mistats.insiteid = getMIcookie(mistats.regcookie,'user');
   mistats.segments = getMIcookie(mistats.segcookie,'segment');
}

if (navigator.cookieEnabled && (navigator.userAgent || '').match(/ipod|ipad|iphone/i))
{
   mistats.visitorId = s.c_r(mistats.pressPlus.MI_COOKIE) || s.c_r('mi_svid');
   if (!mistats.visitorId)
   {
      mistats.visitorId = Math.round(Math.random() * 1000000) + '.' + (new Date()).getTime();
      s.c_w('mi_svid', mistats.visitorId, new Date((new Date()).getTime() + 63072000000));
   }
}

// Error Checking and Code Enhancements
///////////////////////////////////////////////////////////////

// MSR Fix - Added 11/26/2007/
mistats.bizunit = mistats.bizunit.toUpperCase();

// Link Tagging Function
mistats.graffiti = function(a,b) {
 		var c = a.length, cc, cn, cl, d = document, e, f;

 		while(c--) {
     		if(c !== 0 && d.getElementById( a[c].id)) {
	        	cn = d.getElementById( a[c].id ).getElementsByTagName('*');
         			cl = cn.length;
         			while(cl--) {
             			cc = cn[cl];
             			if(cc.href && !cc.href.match(/\@|\#|mailto:/) ) {
                     			e = (a[0].label === '') ? mistats.pagelevel : a[0].label;
                     			f = (a[c].label === '') ? a[c].id : a[c].label;
                     			cc.href += '#' + b + '=' + e + ':' + f;
             			}
         			}
     		}
 		}
};


// Taxonomy Error Checking /
if(mistats.taxonomy.split("|").length != 5) { mistats.taxonomy = "BadTaxonomy||||";}

// Temporary New Tag Flags /
mistats.pagelevel = "*" + mistats.pagelevel;

// Catch pages improperly labeled as homepage
if(window.location.pathname.length > 1 && mistats.taxonomy.match(/^_Homepage\|/i)) {
	mistats.taxonomy = 'BadTaxonomy||||';
}

if(window.location.pathname.length > 1 && mistats.pagelevel.match(/^\*Home/i)) {
 		mistats.pagelevel = 'Bad Page Level';
}

// Convert MI variables to Omniture variables
s_account  = mistats.account;
s.pageName = mistats.pagename && !mistats.pagename.match(/^pubsys:/i) ? mistats.pagename : ('noname:' + location.href);
s.channel  = mistats.sitename + ": " + mistats.channel;
s.server   = mistats.server;
s.referrer = document.referrer;

s.hier1 = mistats.bizunit + '|' + mistats.sitename + '|' + mistats.taxonomy + '|' + mistats.channel;

s.prop1  = mistats.url;
s.prop2  = mistats.version;
s.prop3  = mistats.pagelevel;
s.prop4  = mistats.contentsource;
s.prop5  = mistats.insiteid;
s.prop6  = 'D=h1';
s.prop7  = mistats.custom1;
s.prop8  = mistats.custom2;
s.prop9  = mistats.custom3;
s.prop13 = mistats.segments;
s.prop20 = mistats.cmsid;
s.prop18 = mistats.altcategories;
s.prop29 = (mistats.keywords || '').replace(/,+/g, ',').replace(/^,/, '').replace(/,$/, '');
s.prop30 = mistats.geography;
s.prop31 = mistats.pubdate;
s.prop32 = mistats.moddate;
s.prop37 = mistats.popular;
s.prop39 = mistats.querystring;
s.prop47 = mistats.widgets;

s.pageURL = 'D=c1' + (s.prop39 ? '+c39' : '');

if (mistats.visitorId)
   s.visitorID = mistats.visitorId;

s.prop2 = function ()
{
   var r;
   var ua;

   function detectDevice()
   {
      var pw;

      pw = Math.min(screen.width, screen.height) / (window.devicePixelRatio && !isNaN(window.devicePixelRatio) ? parseFloat(window.devicePixelRatio) : 1);

      if ((navigator.platform || ua).match(/ipad/i)
       || (ua.match(/windows\snt\s/i) && !ua.match(/windows\sphone/i) && ua.match(/\sarm;/i))
       || (ua.match(/android/i) && pw > 800)
       || ua.match(/android\s3/i)
       || ua.match(/rim\stablet/i)
       || ua.match(/silk/i))
         return 'tablet';

      if ((navigator.platform || ua).match(/iphone|ipod/i)
       || (ua.match(/android/i) && !ua.match(/android\s3/i) && pw <= 800)
       || (ua.match(/blackberry/i) && ua.match(/mobile/i))
       || ua.match(/windows\sphone/i)
       || (pw && pw <= 320))
         return 'phone';

      return 'other';
   };

   ua = navigator.userAgent;
   r = 'dev:' + detectDevice();

   if (mistats.pagename.match(/^vendor:/i) && ua.match(/(ipad|iphone|ipod).+applewebkit.+mobile\/\S+$/i))
      r += ':in-app browser';

   return r
}();

// Pagename as a conversion variable - Added 3/31/10 - JJ - Ticket# 727-8314208
s.events = 'event7';
s.eVar4 = 'D=pageName';

s.prop15 = s.c_r('mi_adlst');
s.c_w('mi_adlst', '');

if (mistats.audienceCounts)
   mistats.audienceCounts.updateAll();

if (mistats.adTracker)
   mistats.adTracker.track();

// Improper Vendor Tracking Code
// Added 09/06/09
if(typeof(pubsys) != 'undefined') {
	if(pubsys == true) {
             	s.prop20 += '|P: ' + s.channel + ' : ' + mistats.server;
	}
}
else {
	s.prop20 = '|U: ' + s.channel + ' : ' + mistats.server;
}

// Prepend CMSID if this is an Iframe
if (window != top)
   s.prop20 = 'IFRM|' + s.prop20;

// Capture referring domain -- 2012-02-03 JG
s.prop49 = function ()
{
   var g;
   var h;
   var hs;
   var r;
   var rs;

   r = document.referrer.toLowerCase() || '';

   if (!r.length || !r.match(/\w+/))
   {
      if (window.opener)
         try
         {
            r = window.opener.location.href || '';
         } catch (miError)
         {
            return 'external opener';
         }
      else
         return 'no referrer';
   }

   r = r.replace(/https*\W+/, '').split('/')[0];
   h = location.hostname.toLowerCase();

   if (r == h)
      return 'internal';

   rs = r.split('.');
   hs = h.split('.');

   r = r.replace(/[www\.]*/, '');

   rs.splice(0, (rs.length > 2) ? rs.length - 2 : 0);
   hs.splice(0, (hs.length > 2) ? hs.length - 2 : 0);

   if (rs.join('.') == hs.join('.'))
      return 'subdomain: ' + r;

   g = r.lastIndexOf('google.');

   if (g !== -1)
      return r.substring(0, g + 7);

   return r;
} ();

// Script Loader
function scriptLoader() {}

// Script Loader Prototype
scriptLoader.prototype =
{
   injectScript: function (url, callback)
   {
      var script;

      script = document.createElement('script');
      script.type = 'text/javascript';

      if (callback)
      {
         // IE
         if (script.readyState)
            script.onreadystatechange = function ()
            {
               if (script.readyState == 'loaded' || script.readyState == 'complete')
               {
                  script.onreadystatechange = null;
                  callback();
               }
            };
         // Everyone else
         else
            script.onload = function()
            {
               callback();
            };
      }

      // Inject script into html head
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
   },

   injectStyle: function (url, callback)
   {
      var style;

      style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';

      // IE
      if (callback)
      {
         if (style.readyState)
            style.onreadystatechange = function ()
            {
               if (style.readyState == 'loaded' || style.readyState == 'complete')
               {
                  style.onreadystatechange = null;
                  callback();
               }
            };
         // Everyone else
         else
            style.onload = function ()
            {
               callback();
            };
      }

      // Inject script into html head
      style.href = url;
      document.getElementsByTagName('head')[0].appendChild(style);
   }
};

// Interaction Tracker
if (mistats.InteractionTracker)
   mistats.interactionTracker = new mistats.InteractionTracker();

// Track surveywall on CharlotteObserver
if (mistats.GCSTracker && mistats.bizunit && mistats.bizunit.match(/CLT|NAO/))
   mistats.gcsTracker = new mistats.GCSTracker();

// Post Load Omniture Tracking
mistats.updateTracking = function()
{
   if (mistats.waitBeforeUpdate)
      clearTimeout(mistats.waitBeforeUpdate);
   else
   {
      if (mistats.interactionTracker)
         mistats.interactionTracker.increment('gallery_views');

      if (mistats.gcsTracker)
         mistats.gcsTracker.track(true);

      if (mistats.bizunit && !mistats.bizunit.match(/MIA|ELN/))
      {
         mistats.postLoadArgs = arguments;
         if (!mistats.postLoadTracking)
         {
            mistats.postLoad = new scriptLoader();
            mistats.postLoad.injectScript('http://www.mcclatchyinteractive.com/mistats/refinalizestats.js', function ()
            {
               mistats.postLoadTracking.omniture(mistats.postLoadArgs)
            });
         } else
            mistats.postLoadTracking.omniture(mistats.postLoadArgs);
      }
   }

   if (mistats.bizunit && mistats.bizunit === 'NAO')
      mistats.waitBeforeUpdate = setTimeout(function ()
      {
         mistats.waitBeforeUpdate = 0;
      }, 1000);
};

// Check and report iframe usage -- 2011/11/22 JG
mistats.iframes =
{
   topLevel: window,
   nestCount: 0
};

while (mistats.iframes.topLevel != top)
{
   mistats.iframes.nestCount++;

   try
   {
      mistats.iframes.topLevel = mistats.iframes.topLevel.parent;
   } catch(e)
   {
      break;
   }
}

if (mistats.iframes.nestCount)
{
   s.prop48 = ['IFRM', mistats.iframes.nestCount, document.referrer.split('?')[0].replace(new RegExp('https*://', 'i'), '')];
   if (mistats.iframes.nestCount > 1)
      try
      {
         s.prop48[s.prop48.length] = mistats.iframes.topLevel.location.href.split('?')[0].replace(new RegExp('https*://', 'i'), '');
      } catch (e)
      {
         s.prop48[s.prop48.length] = 'Diff';
      }
   s.prop48 = s.prop48.join('|');
}

if (location.href.match(/mcclatchydc\.com\/2011\/11\/13\/130169\/occupy-wall-street-is-many-things|bradenton\.com\/2011\/11\/10\/3641446\/4-burglary-suspects-arrested-in\.html/i))
   mitagsent = true;

s.prop12 = function ()
{
   var n;

   for (n in navigator)
      if (navigator[n] && typeof navigator[n] === 'string')
      {
         if (navigator[n].match(/gomez/i))
            return 'GomezAgent: ' + mistats.bizunit + ': ' + location.hostname.replace(/^www\./i, '');
         else if (navigator[n].match(/facebookexternal/i))
            return 'FacebookAgent: ' + mistats.bizunit + ': ' + location.hostname.replace(/^www\./i, '');
      }

   return null;
}();

// Do not execute Omniture tag if this is a footer Iframe for an Aurora site
if (location.pathname.match(/\/footer/i)
 && mistats.bizunit
 && mistats.bizunit.match(/KEN|IDA|CDT|BRA|LED|MAC|RHH|TCH|TBH|SUN|BEL/))
   mitagsent = true;

// Capture Tacoda tag
s.prop47 = function ()
{
   var layout;
   var s
   var scripts;

   layout = document.getElementById('layout_type');
   if (layout && layout.className)
      return ['layout', location.hostname.replace(/^www\./i, ''), layout.className.toLowerCase()].join(':');

   scripts = document.getElementsByTagName('script');
   for (s = 0; s < scripts.length; s++)
      if (scripts[s].src && scripts[s].src.match(/tacoda\.net\/.*slf\.js/i))
         return 'TacodaTag: ' + location.hostname + location.pathname;

   return '';
}();

s.prop14 = function ()
{
   var c;
   var s;
   var scripts;

   scripts = document.getElementsByTagName('script');

   c = 0;

   for (s = 0; s < scripts.length; s++)
      if (scripts[s].src && scripts[s].src.match(/mcclatchyinteractive\.tt\.omtrdc\.net/i))
         c++;

   return (c) ?
   [
      'mbox',
      c,
      mistats.bizunit,
      location.hostname.toLowerCase(),
      'limit=' + ((mistats.mitntrules && mistats.mitntrules.limit) ? mistats.mitntrules.limit : 'unknown')
   ].join(':') : '';
}();

s.prop46 = function ()
{
   if (!('msDoNotTrack' in navigator || 'doNotTrack' in navigator))
      return 'dnt:n/a';
   switch (navigator.msDoNotTrack || navigator.doNotTrack)
   {
      case '1':
      case 'yes':
         return 'dnt:on'
   }
   return 'dnt:off';
}();

if ((mistats.bizunit || '') === 'DFW')
   (function ()
   {
       var adList;
       var hasApt;
       var i;
       var scripts;

       adList = [];
       scripts = document.getElementsByTagName('script');

       for (i = 0; i < scripts.length; i++)
           if ((scripts[i].src || '').match(/https*:\/\/open.ad.yieldmanager.net/i))
               hasApt = true;
           else if ((scripts[i].innerHTML || '').match(/yld_mgr.place_ad_here/))
              adList[adList.length] = (scripts[i].parentNode.nodeName || 'UnknownNode') + '#' + (scripts[i].parentNode.id || 'UnknownID');

       if (hasApt || adList.length)
           s.prop38 = 'apt|' + location.hostname + location.pathname + '|' + adList.join(',');
   })();

// IMG tag call
// Double Tag Check - Added 11/31/2007 - JJ
<!-- ** DO NOT ALTER ANYTHING BELOW THIS LINE ** -->
if(!mitagsent)
{
	var s_code=s.t();if(s_code)document.write(s_code)
	var mitagsent = true;
}


// Log data to V15 suite for Merced
if (!mistats.tagSentV15 && mistats.bizunit && mistats.bizunit === 'MER')
{
   mistats.tagSentV15 = true;
   s.sa('nmv15-Merced');
   s_code = s.t();
   if (s_code)
      document.write(s_code);
   s.sa(mistats.account);
}

if ((location.search || '').match(/hashtagtest/i))
   s.c_w('mi_httest', '1', new Date((new Date()).getTime() + 604800000));

if (s.c_r('mi_httest') == '1')
   if (location.href.match(/#\s*$/) || (location.hash || '').match(/wgt=|navlinks*=|storylink=/))
   {
      if (history.replaceState)
         history.replaceState('', document.title, location.pathname + (location.search || ''))
      else if (location.hash !== '#')
         location.hash = '';
   }

// Call quantserve .js file - Added 7/22/2008 - JJ Ticket # 727-5945439
if (!location.hostname.match(/dealsaver/i))
{
   var _qoptions = { qacct:"p-50B2Fi6bBqYto", labels: mistats.bizunit };
   document.write("\n<" + "script type='text/javascript' src='http://edge.quantserve.com/quant.js'>" + "</" + "script>");
}

// Inject content tracking script -- 2011/12/19 JG
if (mistats.tyntid && !location.hostname.match(/adperfect/i))
{
   if (!mistats.mediahostname)
      mistats.mediahostname = (mistats.sitefile && mistats.sitefile.match(/https*\W+[^\/]+/i)) ?
         mistats.sitefile.match(/https*\W+[^\/]+/i)[0] : 'http://media.mcclatchyinteractive.com';
   (new scriptLoader()).injectScript(mistats.mediahostname + '/mistats/mi_content_tracker.js');
}

(function () {
	var d = new Image(1, 1);
	d.onerror = d.onload = function () {
	d.onerror = d.onload = null;
};
d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-203838h&cg=0&cc=1&si=", escape(window.location.href), "&rp=",
escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
})();

mistats.initAnalyzer = function (pSwitch)
{
   var t;
   var tmpObj;
   var analyzerMode;

   if (typeof localStorage === 'undefined' || typeof scriptLoader === 'undefined')
      return;

   analyzerMode = location.search.toLowerCase().match(/mi_analyzer=\w+/);
   analyzerMode = pSwitch || (analyzerMode ? analyzerMode[0].substr(12) : '');

   if (analyzerMode === 'off')
   {
      for (t in localStorage)
         if (t.indexOf('mianalyzer_') === 0)
            localStorage.removeItem(t);

      tmpObj = document.getElementById('mistats_cp');
      if (tmpObj)
         document.body.removeChild(tmpObj);
      tmpObj = document.getElementById('mistats_panel');
      if (tmpObj)
         document.body.removeChild(tmpObj);

      return;
   }

   for (t in localStorage)
      if (t.indexOf('mianalyzer_') === 0)
      {
         analyzerMode = 'on';
         break;
      }

   if (analyzerMode === 'on')
   {
      mistats.mediadomain = (mistats.sitefile || '').match(/^https*:\/{2}[^\/]+/i);
      mistats.mediadomain = mistats.mediadomain ? mistats.mediadomain[0].replace(/https*:\/{2}/i, '') : 'media.mcclatchyinteractive.com';

      mistats.loadCP = new scriptLoader();
      mistats.loadCP.injectScript('http://' + mistats.mediadomain + '/mistats/analyzer/js/analyticsCP.js', function () {});
      mistats.loadCP.injectStyle('http://' + mistats.mediadomain + '/mistats/analyzer/css/analyticsCP.css', function () {});
   }
};

mistats.initAnalyzer();

