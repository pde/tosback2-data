//POP UP FUNCTION
function dotComPopUp(theURL, theWidth, theHeight) {
	window.open(theURL, "", "width=" + theWidth + ", height=" + theHeight + ", resizable=1, scrollbars=1");
}
/**
 Function: Function will submit email address to servlet and determine if user qualifies for Premier
 
 Required input is formObj as defined:
 formName: This is the name of the form being submitted from (REQUIRED)
 textElement: ID of element that contains the email (REQUIRED)
 bref: hold BREF
 */
function onSubmitCheckElgible(formObj) {
    if(!formObj) { return false; }
    var formName = formObj.formName;
    var txtField = formObj.textElement;
    var strUrl = window.open("https://www.wireless.att.com/IRUEmailDispatch.dyn?emailAddr=" + document.getElementById(txtField).value + "&bref=" + formObj.bref);
    return false;
    eval("document." + formObj.formName + ".action = strUrl;");
    eval("document." + formObj.formName + ".submit();");
}
//REPLACES marketing_reporting.js
var ev = {
	eventObserve: function (elm, evType, fn, useCapture) {
		//
		//	Cross-browser friendly means of registering event handlers
		//	based on the addEvent function by Scott Andrew
		//	with slight customization.
		//
		if((typeof elm == 'undefined') || (elm == null)){return false}
		
		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, useCapture);
			return fn;
		}
		else if (elm.attachEvent) {
			try {
				elm['e'+evType+fn] = fn;
				elm[evType+fn] = function(){
                                    elm['e'+evType+fn](window.event);
                                };
				elm.attachEvent( 'on'+evType, elm[evType+fn] );
			} catch (e) {}
			return fn;
		}
		else {
			elm['on' + evType] = fn;
		}
	},
	eventStopObserving: function(elm, evType, fn, useCapture) {
		//
		//	Cross-browser friendly means of unregistering event handlers
		//	modified from prototype event.stopObserving, then formatted to cooperate with eventObserve
		//
		if (elm.removeEventListener) {
			elm.removeEventListener(evType, fn, useCapture);
		} else if (elm.detachEvent) {
		  try {
			elm.detachEvent( 'on'+evType, elm[evType+fn] );
			elm[evType+fn] = null;	  
			} 
		  catch (e) {}
		}
		return fn;
	}
};
 
//END REPLACE
//PNG FIX FOR IE 6
var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);	
function fixPNG(myImage) 
{
	var imgName = myImage.src.toUpperCase();
	if (imgName.substring(imgName.length-3, imgName.length) != "PNG") return;
	if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
	{
	   var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
	   var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : ""
	   var imgTitle = (myImage.title) ? 
					 "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' "
	   var imgStyle = "display:inline-block;" + myImage.style.cssText
	   var strNewHTML = "<span " + imgID + imgClass + imgTitle
				  + " style=\"" + imgStyle + ";"
				  + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
				  + "(src=\'" + myImage.src + "\');\">" 
				  + "<img style=\"filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);\" src=\'" + myImage.src + "\' border=\"0\" />"
				  +"</span>"
	   myImage.outerHTML = strNewHTML	  
	}
}
function displayFlash(width,height,filename){
	AC_FL_RunContent('codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0','width',width,'height',height, 'src','videoLibrary','quality','high',
					'pluginspage','http://www.macromedia.com/go/getflashplayer','wmode','transparent','movie',filename);
}  
//SWF CODE
//v1.0
//Copyright 2006 Adobe Systems, Inc. All rights reserved.
function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}
 
function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '<object ';
  for (var i in objAttrs)
    str += i + '="' + objAttrs[i] + '" ';
  str += '>';
  for (var i in params)
    str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  str += '<embed ';
  for (var i in embedAttrs)
    str += i + '="' + embedAttrs[i] + '" ';
  str += ' ></embed></object>';
 
  document.write(str);
}
function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
 
function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}
 
function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    
 
    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "id":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function changePage(element_id){
var changes = document.getElementById(element_id).value.split(",")
	if (changes[1] == 'popup'){
		dotComPopUp(changes[0],800,600);
	}else{
		if(changes[1] == 'window'){
			window.open(changes[0])
		}else{
			document.location.href= changes[0]
		}
		
	}
}

    var _elqQ = _elqQ || [];
    _elqQ.push(['elqSetSiteId', '2789']);
    _elqQ.push(['elqTrackPageView']);
    
    (function () {
        function async_load() {
            var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
            s.src = '//img.en25.com/i/elqCfg.min.js';
            var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
        }
        if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
        else if (window.attachEvent) window.attachEvent('onload', async_load); 
    })();

