var e9Manager;
var e9AdSlots;
var e9;
var expo9_ad;

if (e9Manager === undefined) 
 {
   e9Manager = (
     function() 
      {
        var trace = (typeof console !== "undefined" && typeof console.log !== "undefined" && typeof console.log.apply !== "undefined") ?
                                          function() { console.log.apply(console,arguments); }
                                        : function() {} ;

	function getRnd()
	 {
	   var			rnd  = (new Date()).getTime() % 20000001 + parseInt(Math.random() * 10000,10);

	   return rnd;
	 }

	function sfv() 
	 {
	   for (var i =0; i < arguments.length; i++) {
	     var arg = arguments[i];
	     if (arg !== undefined)
	       return arg;
           }
           return undefined;
	 }

        function pfs(arg)
         {
	   if (arg === undefined || arg === "" || arg.indexOf('%') > 0)
              return 0; 
           return parseInt(arg.split("px")[0]);
         }

        function getFrameWxH(frame)
         {
	   var		frameWidth = 0; 
	   var		frameHeight = 0;

	   if (frame.tagName.toLowerCase() === "iframe")
	    {
	      frameWidth = pfs(frame.width);
	      frameHeight= pfs(frame.height);
	    }
	   return { width : frameWidth , height : frameHeight };
         }

        function stripParam(adParams,param)
         { 
           var             	rVal = "";
           var             	pVal = "";
         
	   if (adParams)
	    { 
	      var pIndex = adParams.indexOf(param+"=");
	      var adParamsArray = adParams.substring(pIndex+param.length+1).split('&');
	      rVal = adParams.substring(0,pIndex-1)
	      if (adParamsArray.length > 1)
	         rVal +=  "&"+ adParamsArray.slice(1).join('&');
	      pVal = adParamsArray[0];
	    }
	   return { adParams : rVal, param : pVal };
	 }

        function isAdEnclosedInIframe(adWidth,adHeight,frame,overlapRatio)
         { 
	   var                  frameWH = getFrameWxH(frame);
	   var		   	frameWidth  = frameWH.width;
	   var			frameHeight = frameWH.height;

           if ((frameWidth > 0) && (frameHeight > 0))
            {
              return (    (adWidth  <= frameWidth)
                       && (adHeight <= frameHeight)
                       && ((adWidth * adHeight) >= ((overlapRatio/100) * frameWidth * frameHeight)));
            }
           else
              return false;
         }

	function px(t, p, k, v) 
	 {
	   var          	s = (t[p] === undefined) ? "?" : t[p] + "&";
	   t[p] = s + k + "=" + v;
	 }

        function cpx(t, p, k, v) 
	 {
	   if (v !== undefined) 
	      px(t,p,k,v);
	 }

        function cpex(t, p, k, v) 
	 {
	   if (v !== undefined) 
	      px(t,p,k,E(v));
	 }

        function E(s) 
	 {
	   if (typeof encodeURIComponent === "function") 
	      return encodeURIComponent(s);
	   else 
	      return escape(s);
	 }

        function combineArgs(value) 
	 {
	   var             retVal;
	   var             paramArray = value.split(",");

	   for (var i = 0; i < paramArray.length; i++) 
	    {
	      var          param = trim(paramArray[i]);
	      retVal = m(retVal, param, ",");
	    }
	   return retVal;
	 }

        function trim(s) 
	 {
	   if (s !== null)
	      return s.replace(/^\s + /, '').replace(/\s + $ /, '');
	   return null;
	 }

        function m(a,b,c) 
	 {
	   if (a === undefined || a === "")
	      return b;

	   a += c + b;
	   return a;
	 }

        function isMember(item, array) 
	 {
	   for (var i = 0; i < array.length; i++) 
	    {
	      if (array[i] === item)
		 return true;
	    }
	   return false;
	 }

	function inspect(obj)
	 {
	   trace(stringify(obj));
	 }

	function inspectNameObj(name,obj)
	 {
	   trace(name + " = " + stringify(obj));
	 }

	function canServePops()
	 {
	   document.cookie='tf0=y0; path=/;';
	   if (document.cookie.indexOf('f0=y0') >= 0 && document.cookie.indexOf('f1=y1') < 0) 
	      return true;

	   return false;
	 }

	function detectFlash()
	 {
	   var             	flashinstalled = 0;
	   var             	flashversion = 0;
	   var		   	x;

	   if (navigator.plugins && navigator.plugins.length) 
	    {
	      x = navigator.plugins["Shockwave Flash"];
	      if (x) 
	       {
		 flashinstalled = 2;
		 if (x.description) 
		  {
		    x.description.toString().replace(/[0-9]+/, 
		       function(u) 
			{
			  flashversion = parseInt(u, 10);
			  return u;
			}
		    );
		  }
	       } 
	      else 
	       {
		 flashinstalled = 1;
	       }

	      if (navigator.plugins["Shockwave Flash 2.0"]) 
	       {
		 flashinstalled = 2;
		 flashversion = 2;
	       }
	    } 
	   else if (navigator.mimeTypes && navigator.mimeTypes.length) 
	    {
	      x = navigator.mimeTypes['application/x-shockwave-flash'];
	      flashinstalled = (x && x.enabledPlugin) ? 2 : 1;
	    }
	   else 
	    {
	      for (var i = 9; i > 0; i--) 
	       {
		 flashversion = 0;
		 try 
		  {
		    var        	flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
		    flashversion = i;
		    return i;
		  } 
		 catch(e) {}
	       }
	    }
	   return flashversion;
	 }

	function hash(name, data, hashVal) 
	 {
	   var			n = 0;

	   data = getData(name,data);
	   if (data) 
	    {
	      for (var i=0; i < data.length; i++) 
		 n = ((n * 997) + data.charCodeAt(i)) & 0x7fffffff;
	    }

	   hashVal += n;
	   return hashVal;
	 }

	function getData(name,data) 
	 {
	   if (name === "appVersion" || name === 'userAgent') 
	    {
	      if (data.indexOf("Trident/4.0") > 0) 
		 data = data.replace(/MSIE \d+.0/,'MSIE 8.0');
	      if (data.indexOf("Trident/5.0") > 0) 
		 data = data.replace(/MSIE \d+.0/,'MSIE 9.0');
	    } 
	   else 
	    {
	      if (    (name === 'constructor')
		   || (name === 'plugins')
		   || (name === undefined)) 
		 data = null;
	    }
	   return data;
	 }

        function makeTagHash()
         { 
           var             tagHash = 0;

           for (var pn in navigator)
            { 
              var          navElem = navigator[pn];
	      var	   navType = objectType(navElem);

              if (navType === 'string')
                 tagHash = hash(pn,'' + navElem, tagHash);
              else if (navType === 'array')
               { 
                 for (var i=0;i<navElem.length;i++)
                  { 
                    var p = navElem[i];
                    tagHash = hash(i,p.name + p.description, tagHash);
                  }
               }
             } 
           return tagHash;
         }

        function objectType(o)
         {
           try
            {
              switch (typeof(o))
               {
                 case 'object':
                       if (o === null) return 'null';
                       if (o.constructor == Array) return 'array';
                       if (o.constructor == Date) return 'date';
                       return 'object';
                 case 'function':
                       if (o.constructor === RegExp) return 'regex';
                       return 'function';
                 default:
                       return typeof(o);
               }
            }
           catch(e)
            {
              return 'undefined';
            }
         }

       function stringify(obj) 
	{

	  function stringifyValue(v)
	   {
	     switch (objectType(v))
	      {
		case 'number': 
		case 'null': 
		case 'boolean':
		      return String(v);

		case 'string':
		      return '"' + v + '"';

		case 'object':
		      return stringifyObject(v);

		default:
		      return undefined;
	      }
	   }

	  function stringifyObject(object)
	   {
	     var 	values = [];
	     var	nameReg = /^\w+$/;

	     for (var name in object)
	      {
		var valStr = stringifyValue(object[name]);
		if (valStr != undefined)
		 {
		   if (nameReg.test(name) === false)
		      name = '"' + name + '"';
		   values.push(name + ':' + valStr);
		 }
	      }
	     return "{" + String(values) + "}";
	   }

	  return (stringifyValue(obj));
	}

	var validFields = 
	 [
	  'site',
	  'adSpace',
	  'tagType',
	  'center',
	  'busted',
	  'noAd',
	  'contentType',
	  'adType',
	  'pf',
	  'rsize',
	  'pop',
	  'clickTrackURL',
	  'clickURL',
	  'z',
	  'y',
	  'g',
	  'c',
	  'debug',
	  'adApp',
	  'mediaType',
	  'mediaDataID',
	  'clientID',
	  'playTrackURL',
	  'imgURL',
          'flushMedia',
	  'async',
 	  'noAdChoice',
	  'env'
	 ];

	var validCombineFields =
         [
	  'size',
	  'blockingCategories',
	  'addBlockingCategories',
	  'blockingDomains',
	  'addBlockingDomains'
	 ];

	function buildAdSpec(e9)
	 { 
	   var 	adSpec = {};
           var 	p = e9Page;

	   for (var i=0; i<validFields.length; i++)
	    {
	      var		fieldName = validFields[i];
	      if (e9[fieldName] !== undefined) 
		adSpec[fieldName] = e9[fieldName];
	    }

	   for (var i=0; i<validCombineFields.length; i++)
	    {
	      var		fieldName = validCombineFields[i];
	      if (e9[fieldName] !== undefined) 
		adSpec[fieldName] = combineArgs(e9[fieldName]);
	    }

	   for (var k in e9) 
	    {
	      var		v = e9[k];

	      if (typeof v !== 'function') 
	       {
		 if (k.substr(0, 5) === 'param') 
		    adSpec['p9_' + k] = v;

		 if (k.substr(0, 3) === 'c9_') 
		    adSpec[k] = v;
	       }
	    }

	   if (e9.popOnly === 1)
	    {
	      adSpec.tagType = "iframe";
	      adSpec.size = "1x1";
	      adSpec.noAd = 1;
	      adSpec.pop = 'only';
	    }

	   if (e9.toolbar === 1)
            {
              var toolbar = e9Page.getToolBarOptions();

              adSpec.tagType = "toolbar";
	      adSpec.env = "toolbar";
              adSpec.adApp = 1;
              adSpec.mediaType     = toolbar.mediaType     || 0;
              adSpec.mediaDataID   = toolbar.mediaDataID   || 0;
              adSpec.clientID      = toolbar.clientID      || 0;
              adSpec.clickTrackURL = toolbar.clickTrackURL || "http://" + p.host + "/hd.click/random/";
              adSpec.noAdChoice = 1;	      
            }

           if (   typeof(p.enabledAdChoices) == "undefined" 
	       || p.enabledAdChoices === false)
              adSpec.noAdChoice = 1;

	   return adSpec;
	 }

        var manager = 
	 {
           fetchAds:
	     function() 
              {
                e9Page.fetchAds();
              },

           inspect:
	     function() 
              {
	        inspectNameObj("e9Page",e9Page);
              },

           setSite:
	     function(site,adSpace) 
              {
                e9Page.site = site;
                e9Page.adSpace = adSpace;
              },

           setTKey:
	     function(tkey) 
              {
                e9Page.tKey = tkey;
              },

           setAdResponse:
	     function(adResponse) 
              {
                e9Page.adResponse = adResponse;
              },

           displayAdFromE9:
	     function(e9) 
              {
                e9Page.displayAdFromE9(e9);
              },

           displayAdSlot:
	     function(slotName) 
              {
                e9Page.displayAdSlot(slotName);
              }
         };

	e9Manager = manager;

        var e9Page = 
	 {
	   version: "1.24",
	   displayAdVersion: "0.4",
	   adNum:0,
	   adResponse:undefined,
	   displayFlags: {},
	   host: "a.tribalfusion.com",
  	   busterframe: "",
  	   busterDomain: "",
	   site: "cookscom",
	   adSpace: "ros",
	   tagKey: "1883697412",
	   enabledRichAdInIframe: true,
	   enabledAdChoices: true,
	   tagOptions: {},
           
	   isIE: (navigator.appVersion.indexOf("MSIE") !== -1),

	   init: 
             function()
	      {
	        var             p = this;

		p.setPageData();
		p.center = 1;
		p.async = true;
		p.env = "display";
		p.pageId = p.pageData.pageId;

		p.setPageParams();
		p.fetchedScripts = {};
		p.displayAdURL ="http://"+p.host+"/displayAd.js?dver=" + p.displayAdVersion + "&th=" + p.tagHash;

		p.includeJScript(p.displayAdURL);
	      },

	   setPageParams:
	     function() 
	      {
	        var             p = this;
 		p.pageParams = undefined;

		p.flashVer = detectFlash();
		p.tagHash  = makeTagHash();

		px(p,'pageParams','flashVer',p.flashVer);
		px(p,'pageParams','ver',p.version);
		px(p,'pageParams','th',p.tagHash);
		px(p,'pageParams','tagKey',p.tagKey);
	      },

	   setPageData:
             function()
              {
	        var             p = this;

		try 
		 {
		   if (window.top.e9PageData !== undefined)
		      p.pageData = window.top.e9PageData 
		 }
		catch (e) {}

		if (p.pageData === undefined)
		 {
		   p.pageData = 
		    {
		      pageId: getRnd(),
		      adNum: 0
		    }
		   try 
		    {
		      window.top.e9PageData = p.pageData;
		    }
		   catch (e) {}
                 }
              },
	     
	   getAdNum:
             function()
              {
	        var             p = this;

		p.pageData.adNum++;
		return p.pageData.adNum;
              },

	   getToolBarOptions:
	     function()
	      {
		var		p = this;
		if (typeof p.tagOptions.toolbar !== "undefined")
		 {
		   var 		toolbarOptions = p.tagOptions.toolbar;
		   return {
			    mediaType     :  toolbarOptions.mediaType,
			    mediaDataID   :  toolbarOptions.mediaDataID,
			    clientID      :  toolbarOptions.clientID,
			    clickTrackURL :  toolbarOptions.clickTrackURL
		          };
		 }
                return {};
	      },
	   

	   includeJScript: 
             function(f) 
	      {
	        var             p = this;

		if (p.fetchedScripts[f] === undefined) 
		 {
		   document.writeln('<scr' + 'ipt type="text/javascript" src="' + f + '"><\/sc' + 'ript>');
		   p.fetchedScripts[f] = true;
		 }
	      },

	   displayAdFromE9:
	     function(e9) 
	      {
	        var             p = this;
		var		adSpec = p.pageBuildAdSpec(e9);

		p.displayAdFromAdSpec(adSpec);
	      },

	   displayAdFromAdSpec:
	     function(adSpec) 
	      {
	        var             p = this;
	        var             e9Ad = p.makeAd(adSpec);

		e9Ad.displayAd();
	      },

	   fetchAds:
	     function() 
	      {
	        var             p = this;
		var		isHead = (document.getElementsByTagName('body')[0] === undefined);

		if (    (isHead)
	             && (e9AdSlots !== undefined))
		 {
		   var		e9Ad = p.makeAd({});
		   
		   e9Ad.fetchAds();
		 }
	      },

           pageBuildAdSpec:
	     function(e9) 
	      {
	        var             p = this;
		var		adSpec = buildAdSpec(e9);

		if (adSpec.site === p.site)
		   delete adSpec.site;

		if (adSpec.adSpace === p.adSpace)
		   delete adSpec.adSpace;

		return adSpec;
	      },

	   pageBuildAdSlotsFromE9Slots:
	     function(e9AdSlots)
	      {
	        var             p = this;
		var		adSlots = {};
		var		firstSlot = undefined;

		for (var slotName in e9AdSlots) 
		 {
		   var e9 = e9AdSlots[slotName];
		   if (    (e9.popOnly !== 1)
			|| (canServePops() === true))
		      adSlots[slotName] = p.pageBuildAdSpec(e9);

		   if (firstSlot == undefined)
		      firstSlot = adSlots[slotName];
		 }
		for (var key in firstSlot) 
		 {
		   var isPresentInAll = true;
		   var sameVal = firstSlot[key];

		   for (var slotName in adSlots) 
		    { 
		      var slot = adSlots[slotName];

		      if (objectType(slot) !== 'object' || slot === firstSlot) 
			 continue;

		      if (slot[key] !== sameVal)
		       {
			 isPresentInAll = false;
			 break;
		       }
		    }
			
		   if (    (isPresentInAll) 
			&& (    ((key === 'site') && (sameVal !== p.site))
		             || ((key === 'adSpace') && (sameVal !== p.adSpace))
		             || (key === 'size')
                           ))
                      isPresentInAll = false;

		   if (isPresentInAll) 
		    {
		      adSlots[key] = sameVal;
		      for (var slotName in adSlots)
		       {
		         var slot = adSlots[slotName];
			 if (objectType(slot) === 'object')
			    delete slot[key];
		       }
		    }
		 }
		return adSlots;
	      },

	   makeAd:
	     function (adSpec)
	      {
		var e9Ad = 
		 {
		   init:
		     function()
		      {
			var          	t = this;
			var		p = e9Page;

			t.page	     = p;
			t.pageParams = p.pageParams;
			t.adParams   =   "";

			t.center = (adSpec.center !== undefined) ? adSpec.center
				    		      		 : p.center;
		      },

		   setTagType:
		     function() 
		      {
			var             t = this;

			switch (adSpec.tagType) 
			 {
			   case "img":
				t.cmd = "i.ad";
				t.tagType = "img";
				break;
			   case "iframe":
				t.cmd =  "f.ad";
				t.tagType = "iframe";
				break;
			   case "toolbar":
				t.cmd =  "j.ad";
				t.tagType = "toolbar";
				break;
			   default:
				t.cmd = "j.ad";
				t.tagType = "jscript";
				break;
			 }
		      },

		   setAdReqParams:    
		     function() 
		      {
			var             t = this;
			var             p = t.page;

			cpx(t,'adParams','site', adSpec.site || p.site);
			cpx(t,'adParams','adSpace', adSpec.adSpace || p.adSpace);

			px(t,'adParams','center', t.center);
			cpx(t,'adParams','pop', adSpec.pop);
			cpx(t,'adParams','noAd', adSpec.noAd);
			cpx(t,'adParams','ct', adSpec.contentType);
			cpx(t,'adParams','at', adSpec.adType);
			cpx(t,'adParams','pf', adSpec.pf);
			cpx(t,'adParams','noAdChoice', adSpec.noAdChoice);

			cpx(t,'adParams','size', t.filterValidSizesAndSetSizeFrame());

			cpex(t,'adParams','clickTrackURL', adSpec.clickTrackURL);
			cpex(t,'adParams','playTrackURL', adSpec.playTrackURL);

		        cpx(t,'adParams','adApp', adSpec.adApp);
                        cpx(t,'adParams','mediaType', adSpec.mediaType);
			cpx(t,'adParams','mediaDataID', adSpec.mediaDataID);
			cpx(t,'adParams','clientID', adSpec.clientID);
			cpx(t,'adParams','env', adSpec.env || p.env);
			cpx(t,'adParams','flushMedia', adSpec.flushMedia);
		      },

		   copyFixedBehaviors:
		     function() 
		      {
			var             t = this;

			cpx(t,'adParams','blockingCategories',    adSpec.blockingCategories);
			cpx(t,'adParams','addBlockingCategories', adSpec.addBlockingCategories);
			cpx(t,'adParams','blockingDomains',       adSpec.blockingDomains);
			cpx(t,'adParams','addBlockingDomains',    adSpec.addBlockingDomains);

			cpx(t,'adParams','z', adSpec.z);
			cpx(t,'adParams','y', adSpec.y);
			cpx(t,'adParams','g', adSpec.g);
			cpx(t,'adParams','c', adSpec.c);
		      },

		   copyPubParams:
		     function() 
		      {
			var             t = this;

			for (var k in adSpec) 
			 {
			   var		v = adSpec[k];

			   if (typeof v !== 'function') 
			    {
			      if (k.substr(0, 8) === 'p9_param') 
				 cpex(t,'adParams',k,v);

			      if (k.substr(0, 3) === 'c9_') 
				 cpex(t,'adParams',k,v);
			    }
			 }
		      },


		   validSizes:    [ "468x60",  "234x60",   "120x240",  "120x90",
				    "120x60",  "88x31",    "392x72",   "125x125",
				    "230x33",  "120x600",  "160x600",  "160x160",
				    "728x90",  "336x280",  "1x1",      "300x250",
				    "300x600", "425x600",  "180x150",  "0x0",
                                    "320x480", "1024x768", "320x50",   "768x66",
                                    "1024x66", "300x50",   "1024x90",  "768x60",
                                    "480x32" ],

                   filterSizeToFrameWxH:
		     function(size,frame)
                      { 
                        var             t = this;
                        var             sizeArray,sz,warray,w,h,retVal = "";
	                var		bfw = 0, bfh = 0;
			var             frameWH = getFrameWxH(frame);
                        var		frameWidth  = frameWH.width;
                        var		frameHeight = frameWH.height;

           		if ((frameWidth > 0) && (frameHeight > 0))
                         {
                           sizeArray = size.split(",");
                           for (var i=0; i<sizeArray.length; i++)
                            { 
                              sz = trim(sizeArray[i]);
                              warray = sz.split("x");
                              w = warray[0] - 0;
                              h = warray[1] - 0;

                              if (    (w <= frameWidth)
			           && (h <= frameHeight))
                               {
			         retVal = m(retVal,w+"x"+h,",");

			         if (w > bfw)
                                    bfw = w;
			         if (h > bfh)
			   	    bfh = h;
			       }
                            }
                         }
                        else
                         {
                           retVal = size;
                         }

		        return {size:retVal, fw:bfw, fh:bfh};
                      },

		   filterValidSizesAndSetSizeFrame:
		     function() 
		      {
			var             t = this;
			var		size = adSpec.size;
			var		sizeArray,sz,warray,retVal;
			var             p = t.page;

			t.fw = t.fh = 0;

			if (size === undefined || size === "")
			   size = "468x60";

			sizeArray = size.split(",");

			if (t.tagType === "img")
			 {
			   sz = sizeArray[0];
			   warray = sz.split("x");
			   t.fw = warray[0] - 0;
			   t.fh = warray[1] - 0;
			   return sizeArray[0];
			 }

			for (var i=0; i<sizeArray.length; i++)
			 {
			   var sz = trim(sizeArray[i]);

			   if (isMember(sz,t.validSizes)) 
			    {
			      retVal = m(retVal,sz,",");
			      if (t.tagType === "iframe" || t.tagType === "jscript")
			       {
				 warray = sz.split("x");
				 var w = warray[0] - 0;
				 var h = warray[1] - 0;
				 if (w > t.fw)
				    t.fw = w;
				 if (h > t.fh) 
				    t.fh = h;
			       }
			    }
			 }
			if (adSpec.rsize !== undefined)
			 {
			   var 		sizeArray = adSpec.rsize.split('x');
			   if (sizeArray.length === 2)
			    {
			      t.fw = sizeArray[0];
			      t.fh = sizeArray[1];
			    }
			 }
			return retVal;
		      },

		   setURLs:
		     function(isForFetchAds) 
		      {
			var             t = this;
			var		p = t.page;
			var             frameLevel;
			var		isBustable;
			var		isHead = (document.getElementsByTagName('body')[0] === undefined);

			isBustable = true;
			if (    (adSpec.busted === 1)
			     || (p.busterframe.indexOf("http") !== 0)
			     || (isHead)
			     || (isForFetchAds))
			   isBustable = false;

			if (    (typeof p.tagOptions.turnOffPageSafety !== "undefined") 
			     && (p.tagOptions.turnOffPageSafety === true)
			     && (p.busterframe.indexOf("http") === -1))
                         {
			    frameLevel = (window.top.location === document.location)
                                          ? 0 
				          :1;	                        
                         }
                        else
                         {
			   frameLevel = (window.top.location === document.location)
				          ? 0
				          : ((window.parent === window.top)
					     ? 1
					     : 2);
                         }

			if (adSpec.busted === 1)
			 {
			   try 
			    {
			      if (p.busterDomain !== "")
				 document.domain = p.busterDomain;
			    } 
			   catch(e) {}
			 }

			try 
			 {
			   t.pageURL = window.top.location.href;
			   if (t.pageURL === undefined)  /*FD1, FDN */
			    {
			      if (isBustable === true)
				 t.tagType = "buster";
			      else 
				 throw("Error");
			    } 
                           else
                            {
		              if (p.enabledRichAdInIframe == true)
                               {
				 if (frameLevel === 2) /*FSN */
				  {
				    if (t.bustTopIframe() === true)
				       return false;
				  }

				 if (frameLevel === 1) /*FS1 */
				  {
			            var		sendBusted = true;
				    var		currFrame = window.frameElement;
                                    var         ret = stripParam(t.adParams,"size");
                                    var         filterObj;

                                    t.adParams = ret.adParams;
                                    filterObj = t.filterSizeToFrameWxH(ret.param,currFrame);
                                    adSpec.size = filterObj.size;

                                    cpx(t,'adParams','size', t.filterValidSizesAndSetSizeFrame());

				    if (adSpec.busted === undefined) 
                                     {
				       if (isAdEnclosedInIframe(t.fw,t.fh,currFrame,70) === false)
				          sendBusted = false;
	                             }

				    if (sendBusted)
				       px(t,"adParams","busted",1);
				  }
                               }

			      if (frameLevel === 2)
			         frameLevel = 1;
                            }
                         }
		        catch (exception) 
			 {
			   /*FD1, FDN */
			   if (isBustable === true)
			      t.tagType = "buster";
			   else
			      t.pageURL = document.referrer;
			 }

			if (t.tagType !== "buster")
			 {
			   t.refURL = (t.pageURL !== document.referrer) ? document.referrer : undefined;

			   if (t.pageURL) 
			    {
			      t.pageURL = E(t.pageURL);
			      px(t,'adParams',"url", t.pageURL.substring(0, 512));
			    }

			   if (t.refURL) 
			    {
			      t.refURL = E(t.refURL);
			      px(t,'adParams',"rurl", t.refURL.substring(0, 512));
			    }

			   px(t,'adParams',"f", frameLevel);
			   px(t,'adParams','p',p.pageId);
			   cpx(t,'adParams','tKey',p.tKey);
			   if (isForFetchAds === false)
			      px(t,'adParams','a',p.getAdNum()); 
			 }
                        return true;
		      },

		   displayAd:    
		     function() 
		      {
			var             t = this;
                        var             p = t.page;

			t.setTagType();
			if (adSpec.busted === undefined)
			 {
			   t.setAdReqParams();
			   t.copyFixedBehaviors();
			   t.copyPubParams();
                         }
			else
			 {
			   var fragmentIndex = document.URL.indexOf('#');

			   if (fragmentIndex !== -1) 
			    {
			      t.cmd = "j.ad"; 
			      t.pageParams = "";
			      t.adParams = document.URL.substring(fragmentIndex+1);
			    }
			 }
                    
			if (t.setURLs(false) === false)
		           return;

			t.async = (adSpec.async !== undefined) ? adSpec.async
						    	       : false;
			if (    (t.async === true)
			     && (t.tagType === "jscript"))
			 {
			   t.tagType = "iframe";
			   t.cmd = 'f.ad';
                         }

			t.url = "http://" + p.host + "/" + t.cmd + t.pageParams + t.adParams + "&rnd=" + getRnd();

			if (adSpec.pop === 'only')
			   t.drawPopTags();
			else
			   t.drawTags();

			if (adSpec.debug === 1)
			   inspectNameObj("e9Ad",t);
		      },

		   drawPopTags:
		     function()
		      {
			var             t = this;

			if (canServePops() === true)
			 {
			   t.drawTags();
			   var tfdate = new Date();
			   tfdate.setTime(tfdate.getTime()+3600000);
			   document.cookie='tf1=y1; path=/; expires='+ tfdate.toGMTString();
			 }
		      },

		   drawTags:
		     function()
		      {
			var             t = this;
   			var             p = t.page;

			switch (t.tagType)
			 {
			   case "iframe":
				{
				  t.tagSrc = '<iframe src="' + t.url + '" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no allowTransparency=true width='
						   + t.fw + ' height=' + t.fh + ' ><\/iframe>';
				}
				break;

			   case "jscript":
			   case "toolbar":
				{
				  t.tagSrc = '<scr' + 'ipt type="text/javascript" SRC="' + t.url + '"><\/sc' + 'ript>';
				}
				break;

			   case "img":
				{
				  var hrefURL = "http://"+p.host+"/i.click" + t.pageParams + t.adParams;
				  t.tagSrc =  '<a href="' + hrefURL + '"><img width='  
						    + t.fw + ' height=' + t.fh + ' src="' + t.url + '" alt="Click Here" border=0></img></a>';
				}
				break;

			   case "buster":
				{
				  t.tagSrc = '<iframe src="' + p.busterframe + '#' + t.pageParams + t.adParams + '" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 ' +
				       'scrolling=no allowTransparency=true width=' + t.fw + ' height=' + t.fh + '></iframe>';
				}
				break;
			 }

			if (t.center === 1)
			   t.tagSrc = '<div align="center">'+t.tagSrc+'</div>';

			document.writeln(t.tagSrc);
		      },

                   isAncestor:
		     function(window,frame)
                      {
                        var w = window;
                        while (w.parent != w.top)
                         {
                           w = w.parent;
                           if (w == frame.contentWindow)
                              return true;
                         }
                        return false;
                      },

                   bustTopIframe:
		     function()
		      {
                        var             t = this;

                        try 
                         {
			   if (adSpec.busted === 1)
                            {
			      var sizeIndex = t.adParams.indexOf("size=");
                              adSpec.size = t.adParams.substring(sizeIndex+5).split('&')[0];
			    }

        		   var frames = window.top.document.getElementsByTagName("iframe");
			   if (frames)
			    {
			      for (var i=0; i<frames.length; i++)
			       { 
				 var   frame = frames[i];
                                 if (t.isAncestor(window,frame))
                                  {
				    var		filterObj = t.filterSizeToFrameWxH(adSpec.size,frame);
				    if (isAdEnclosedInIframe(filterObj.fw,filterObj.fh,frame,70) === true)
				     {
				       frame.src = window.location.href;
				       return true;
				     }
                                    else
				       return false;
			          }
                               }
			    }
                          }
                        catch(err) { }
		        return false;
                      },

		   fetchAds:
		     function() 
		      {
			var             t = this;
			var             p = t.page;

			function checkForAdSlotsNotDisplayed() 
			 { 
			   var fragment = '';
			   for (var slotName in p.adSlots)
			      if (  (objectType(p.adSlots[slotName]) === 'object')
				 && (p.displayFlags[slotName] === undefined))
				  fragment += '&' + slotName + '=' + encodeURIComponent(stringify(p.adSlots[slotName]));
			   if (fragment !== '') 
			    {
			      var tf0img = new Image();
			      tf0img.src = "http://" + p.host + "/i.u" + t.pageParams + "&multiad=1&site=" + p.site 
							       + "&adSpace=" + p.adSpace + t.adParams + fragment;
			    }
			 };

			p.adSlots = p.pageBuildAdSlotsFromE9Slots(e9AdSlots);
			t.setURLs(true);
			var adslots = t.encodeAdSlots(p.adSlots);

			if (adslots != '') 
			 {
			   var url = "http://" + p.host + "/j.multi" + t.pageParams + "&site=" + p.site + "&adSpace=" + p.adSpace + t.adParams + "&rnd=" + getRnd() + '&' + adslots;
			   if (p.isIE === false)
			      window.addEventListener('load',checkForAdSlotsNotDisplayed,false);   
			   p.includeJScript(url);
		         }
		      },

		   encodeAdSlots:
		     function(adSlots) 
		      {
			var             s = []; 

			function add (key,value) 
			 {
			   if (typeof value !== 'function')
		              s[s.length] = encodeURI(key) + "=" + encodeURI(value);
			 }
		   
		        function buildParams(name,val) 
			 {
			   if (val instanceof Array || val instanceof Object) 
			    {
			      for (var k in val) 
			         buildParams(name + '.' + k, val[k]);
			    } 
			   else 
			    {
			      add(name, val);
			    }
			 }

			for (var param in adSlots) {
			   var obj = adSlots[param];
			   if (objectType(obj) !== 'object')
			      buildParams(param,obj);
			}
			      
			for (var slotName in adSlots) {
			   var obj = adSlots[slotName];
			   if (objectType(obj) === 'object')
			      buildParams(slotName,obj);
			}

			return s.join("&").replace(/%20/g, "+");
		      }
		 };
	        e9Ad.init();

		return e9Ad;
	      },

           drawDataSlots:
	     function()
              {
	        var             p = this;
		var 		dataCreative;
		var 		data1x1Creative;

		if (p.adResponse) 
		 {
		   dataCreative = "";
		   data1x1Creative = "";
		   for (var k in p.adResponse) 
		    {
		      if (k.indexOf("data_slot_") === 0) 
		       {
			 dataCreative += p.adResponse[k].creative;
			 delete(p.adResponse[k]);
		       }
		      else if (k.indexOf("ad_1x1_slot_") === 0) 
		       {
			 data1x1Creative += p.adResponse[k].creative;
			 delete(p.adResponse[k]);
		       }
		    }

		   if (dataCreative !== "") 
		      p.writeAsyncFrame({},{ 'creative':dataCreative, 'size':"0x0", 'style':"display:none;" });

		   if (data1x1Creative !== "") 
		      document.write(data1x1Creative);
		 }
              },

	   displayAdSlot:    
	     function(slotName) 
	      {
	        var             p = this;
		var		adSlots = p.adSlots;

		p.drawDataSlots();
		if (adSlots && (adSlots[slotName] !== undefined))
                 {
		   if (p.adResponse === undefined || p.adResponse[slotName] === undefined) 
		    {
		      p.displayAdFromE9(e9AdSlots[slotName]);
		    }
		   else
		    {
		      var	adSpec = adSlots[slotName];
		      var       adResponse = p.adResponse[slotName];
		      var	creative,mediaURL,frmsize,viewpixel;
		      var 	center = sfv(adSpec.center,adSlots.center,p.center);
		      var 	async = sfv(adSpec.async,adSlots.async,p.async);
		      var 	debug = sfv(adSpec.debug,adSlots.debug);

		      creative = adResponse.creative;
		      mediaURL = (adResponse.mtype != 22)?adResponse.html:undefined;

		      if (adResponse.viewpixel.indexOf('http') === 0) 
		         viewpixel = '<img src="' + adResponse.viewpixel + '" height=0 width=0 border=0 style="display:none"/>';

		      if (debug === 1)
		       {
			 inspectNameObj(slotName,adSpec);
			 inspectNameObj(slotName + ".adResponse",adResponse);
		       }
		      
		      if (    (mediaURL === undefined)
		           || (mediaURL.indexOf('http') !== 0)
			   || (async === false))
		       {
		         if (center === 1)
		            creative = '<div align="center">' + creative + '</div>';
		   	 document.write(creative + (viewpixel || ''));
  		       }
		      else
		       {
		         var frmsize = adResponse.size;
		         if (adSpec.rsize !== undefined)
		            frmsize = adSpec.rsize;

			 var frameSpec = { 
			     	       	   'creative' : creative, 
			     	       	   'mediaURL' : mediaURL,
					   'size'     : frmsize, 
					   'viewpixel':viewpixel 
					 };

		         p.writeAsyncFrame(adSpec,frameSpec);
		       }
		      p.displayFlags[slotName] = 1;
                    }
		 }
	      },

	   writeAsyncFrame: 
	     function(adSpec,frameSpec) 
	      {
	        var		p = this;
		var 		rnd  = getRnd();
		var		center = (adSpec.center !== undefined) ? adSpec.center
				    		      		       : p.center;
		var 		sizeArray = frameSpec.size.split('x');
		var 		frameSrc = "";
		var 		style = frameSpec.style ? 'style='+frameSpec.style: '';
		var 		viewpixel = frameSpec.viewpixel || '';
		var		frameTags;

		frameTags = '<iframe id="tfadfrm' + rnd + '" ' + frameSrc + ' width="' + sizeArray[0] + 'px" height="' + sizeArray[1] +
			   'px" scrolling="no" allowTransparency=true marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 ' +
			    style + ' ></iframe>' + viewpixel;
	
	        if (center)
		   frameTags = '<div align="center">' + frameTags + '</div>';

		document.write(frameTags);

		if (frameSrc === "")
		 {
		   var		idoc = document.getElementById('tfadfrm' + rnd).contentWindow.document;

		   idoc.open();
		   idoc.write('<html><head></head><body>' + frameSpec.creative + '</body></html>');
		   if (p.isIE === false && p.isOpera === false)
		      idoc.close(); 
		 }
	      }
	 };


	function expo9Ad() {}

 	expo9Ad.prototype.displayAd = 
	  function() 
	   {
   	     var t = this;
      	     manager.displayAdFromE9(t); 
           }

	expo9_ad = expo9Ad;
	     
        e9Page.init();
        return manager;
      })();
 }
else
 {
   if (e9 !== undefined) 
    {
      e9Manager.setSite("cookscom","ros");
      e9Manager.displayAdFromE9(e9); 
    }
 } 
