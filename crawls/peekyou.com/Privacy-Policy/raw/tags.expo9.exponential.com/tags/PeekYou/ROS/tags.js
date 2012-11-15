var e9Loader;
var e9Manager;
var e9AdSlots;

var isMobileDevice = navigator.userAgent.match(/iPhone|iPad/i) ? true : false;

window.e9ObjectMap = window.e9ObjectMap || {};
window.e9WaitingSlotsQueue  = window.e9WaitingSlotsQueue || [];

if (typeof e9Manager === "undefined") 
 {
   e9Manager = {};
   e9Manager.init = false;

   e9Manager.displayAdSlot = 
     function (slotName) 
      {
	var		adSlots = e9AdSlots;

	if (    (adSlots !== undefined)
	     && (adSlots[slotName] !== undefined))
	 {
	   var		adSlot = adSlots[slotName];
	   var 	     	center = 1;

	   if (adSlot.center !== undefined)
	      center = adSlot.center;

	   e9Loader.createContainerDiv(slotName,center);
	 }
     };
 }

if (e9Loader === undefined) 
 {
   e9Loader = (function () {
     var isIEOrOpera     =    (navigator.appVersion.indexOf("MSIE") !== -1) 
			   || (navigator.userAgent.indexOf("Opera") !== -1);

     getRealTagsScript = 
       function(e9Obj) 
	{
	  return "http://" +  "a.tribalfusion.com/real" + getCurrentTagsScript(e9Obj);            
	};

     getCurrentTagsScript = 
       function (e9Obj) 
	{
	  var        	scriptsOnthePage = document.getElementsByTagName('script');
	  var        	numScripts = scriptsOnthePage.length;
	  var        	tagsScriptName = "/tags.js";
	  var        	tagsScriptLen = tagsScriptName.length;
	  var        	asyncTagsScriptName = "asyncTags.js";
	  var        	asyncTagsScriptLen = asyncTagsScriptName.length;

	  for (var i = numScripts - 1; i >= 0; i--)
	   {
	     var     scriptSrc = scriptsOnthePage[i].src;
	     var     tagsScriptSrc;

	     if (scriptSrc.substr(scriptSrc.length - asyncTagsScriptLen) === asyncTagsScriptName) 
	      {
 	        if (    (e9Obj.site !== undefined) 
		     && (e9Obj.adSpace !== undefined))
	           return "/tags/" + e9Obj.site + "/" + e9Obj.adSpace + "/tags.js";
		return "";
	      } 
	     else if (scriptSrc.substr(scriptSrc.length - tagsScriptLen) === tagsScriptName) 
	      {
		tagsScriptSrc = scriptSrc.split("//")[1];
		tagsScriptSrc = tagsScriptSrc.substr(tagsScriptSrc.indexOf("/"));
		return tagsScriptSrc;
	      }
	   }
	  return "";
	};

     createSameDomainIframeTag = 
       function(iframeID,width,height) 
	{
	  var        	asyncIframe;
	  var        	style = "";

	  if (width === 1 && height === 1) 
	   {
	     width = 0;
	     height = 0;
	   }

          if (width === 0 && height === 0)
           {
             style = 'style="position:absolute; top:-15000px; left:-15000px;"';  
           }

	  asyncIframe = '<iframe src="about:blank" id="' + iframeID + '"'
			   + 'marginwidth=0 align="center" marginheight=0 hspace=0 vspace=0 frameBorder=0 scrolling=no allowTransparency=true '
			   + 'width="' + width + '" height="' + height + '"  ' + style + '> <\/iframe>';

	  return asyncIframe;
	};

     writeContentInIframe = 
       function(frameWindow,iframeID,content) 
	{
	  var	idoc = frameWindow.document.getElementById(iframeID).contentWindow;

	  if (isIEOrOpera === true)
	   {
	     idoc.contents = content;
	     idoc.location.replace('javascript:window["contents"]');	       
	   }             
	  else
	   {
	     idoc.document.open();
	     idoc.document.write(content);
	     idoc.document.close();	          
	   }
	};

     getFrameID = 
       function (frameWindow) 
	{
	  return "tfasyncframe_" + frameWindow.document.getElementsByTagName("iframe").length;
	};

     getDivID = 
       function(slotName) 
	{
	  return "tfasyncid_" + slotName;
	};

     createAndWriteContentInIframe = 
       function(frameWindow,iframeID,width,height,content,wrapWithCenterDiv) 
	{
	  var frameTag = createSameDomainIframeTag(iframeID,width,height);
	  if (wrapWithCenterDiv === true)
	     frameTag = '<div align="center">' + frameTag + '</div>';
	  document.write(frameTag);
	  writeContentInIframe(frameWindow,iframeID,content);
	};

     processMultiTagsRequest = 
       function () 
	{
	  var        	iframeID = getFrameID(window);
	  var 		content;
	  var		adSlot;
		
          for (var slotName in e9AdSlots) 
	   {
	     adSlot = e9AdSlots[slotName];
	     break;
	   }

	  content = '<!DOCTYPE html><html><head>' +
			       '<scr' + 'ipt> var e9AdSlots=parent.window.e9AdSlots; var inMultiAsyncFrame = true; </sc' + 'ript>' +
			       '<scr' + 'ipt type="text/javascript" src="' + getRealTagsScript(adSlot) + '">  </sc' + 'ript>'  +
			     '</head><body style="position:absolute;top:-15000px;"></body>' + 
		      '</html>';

	  createAndWriteContentInIframe(window,iframeID,0,0,content,false);
	};

     processSingleTagsRequest = 
       function() 
	{
	  if (canAsyncFrameBeDrawn() === true) 
	   {
	     var        iframeID = getFrameID(window);
	     var 	content;
	     var	maxSize = getMaxSize(window.e9.size);
	     var        wrapWithCenterDiv = true;

	     if ((e9.center !== undefined) && e9.center === 0)
		wrapWithCenterDiv = false;

	     window.e9ObjectMap[iframeID] =  e9;

	     content = '<!DOCTYPE html><html>  <head></head>' +
			 '<body style="margin-left:0;margin-top:0px;">' + 
			     '<scr' + 'ipt> var e9 = parent.window.e9ObjectMap["' + iframeID + '"]; var inSingleAsyncFrame = true; </sc' + 'ript>' +
			     '<scr' + 'ipt type="text/javascript" src="' + getRealTagsScript(e9) + '">  </sc' + 'ript>' + 
			 '</body></html>';

	     createAndWriteContentInIframe(window,iframeID,maxSize.width,maxSize.height,content,wrapWithCenterDiv);
	   }
	  else 
	   {
	     document.writeln('<scr' + 'ipt type="text/javascript" src="' + getRealTagsScript() + '"><\/sc' + 'ript>');
	   }
	};

     canAsyncFrameBeDrawn = 
       function () 
	{
	  var        	win = window;

	  if (win.e9 === undefined)
	     return false;

	  if (    (win.top === self) /*Frame Level is 0, tags on the page */
	       && (    (win.e9.toolbar === undefined)
		    || (win.e9.toolbar !== 1))
	       && (    (win.e9.busted === undefined)
		    || (win.e9.busted !== 1))
	       && (    (typeof(win.e9.async) === "undefined")
		    || (win.e9.async === true))		 
	       && (    (win.e9.tagType === undefined)
		    || (    (win.e9.tagType.toLowerCase() !== "iframe")
			 && (win.e9.tagType.toLowerCase() !== "img")))
	     )
	     return true;
	  else
	     return false;
	};

     getMaxSize = 
       function(size) 
	{
	  var 	fw = 0, fh = 0, w = 0, h = 0, sz;
	  var	sizeArray, warray;

	  if (size === undefined || size === "") 
	     return { width: 468, height: 60 };

	  sizeArray = size.split(",");
	  for (var i = 0; i < sizeArray.length; i++) 
	   {
	     sz = sizeArray[i];
	     warray = sz.split("x");

	     w = warray[0] - 0;
	     h = warray[1] - 0;
	     if (w > fw) fw = w;
	     if (h > fh) fh = h;
	   }
	  return {width: fw, height: fh };
	};

     var loader  =  
      {
	loaderVersion : "0.1",

	createContainerDiv:
	  function(slotName,center) 
	   {
	     document.write('<div id="' + getDivID(slotName) + '" name="tfasyncdiv" '
			      + ((center === 1) ? 'align="center"' : '')
			      + '> </div>');
	     window.e9WaitingSlotsQueue.push(slotName);
	   },

	loadAd:
	  function () 
	   {
	     if (isMobileDevice === true)
              {
	        document.writeln('<scr' + 'ipt type="text/javascript" src="' + getRealTagsScript({}) + '"><\/sc' + 'ript>');
	      }		     
	     else 
	      {     
	        if (typeof e9 !== "undefined") 
		   processSingleTagsRequest();
	        else if (typeof e9AdSlots !== "undefined") 
		   processMultiTagsRequest();
	        else 
		   document.writeln('<scr' + 'ipt type="text/javascript" src="' + getRealTagsScript({}) + '"><\/sc' + 'ript>');
	      }
	   }
      };

     e9Loader = loader;
     return loader;
   })();
 }

e9Loader.loadAd();
