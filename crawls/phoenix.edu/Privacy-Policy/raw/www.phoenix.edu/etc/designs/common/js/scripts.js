var COMMON_globalConstants={current:"current",currentFirstChild:"currentFirstChild",currentLastChild:"currentLastChild",currentNext:"currentNext",currentPrev:"currentPrev",failure:"failure",firstChild:"firstChild",hide:"hide",IE6Hover:"IE6Hover",lastChild:"lastChild",mouseoverImageSuffixRE:"_on\\.",mouseoutImageSuffixRE:"_off\\.",mouseoverImageSuffix:"_on.",mouseoutImageSuffix:"_off.",newWindowClass:"openNewWindow",show:"show",tabClass_close:"close",tabClass_expand:"expand",tabClass_link:"link",tabClass_tab:"tab"};
var lightboxObjects=new Array();
var COMMON_imageMouseover=function(){var a={mouseoverClass:"mouseover"};
return{init:function(){COMMON_imageMouseover.bindMouseEvents()
},bindMouseEvents:function(){$("img, input[type=image]").each(function(){$(this).bind("mouseover.COMMON_imageMouseover",function(){var c=$(this).attr("src");
var b=new RegExp(COMMON_globalConstants.mouseoutImageSuffixRE,"g");
if(c.search(b)>-1){$(this).attr("src",c.replace(b,COMMON_globalConstants.mouseoverImageSuffix));
$(this).addClass(a.mouseoverClass)
}});
$(this).bind("mouseout.COMMON_imageMouseover",function(){var c=$(this).attr("src");
var b=new RegExp(COMMON_globalConstants.mouseoverImageSuffixRE,"g");
if(c.search(b)>-1&&$(this).hasClass(a.mouseoverClass)){$(this).attr("src",c.replace(b,COMMON_globalConstants.mouseoutImageSuffix));
$(this).removeClass(a.mouseoverClass)
}})
})
}}
}();
var COMMON_links=function(){return{init:function(){COMMON_links.bindMouseEvents()
},bindMouseEvents:function(){$(document).off("mouseover.COMMON_links").on("mouseover.COMMON_links","a."+COMMON_globalConstants.newWindowClass,function(a){var a=a||window.event;
a.preventDefault();
$(this).attr("target","_blank")
})
}}
}();
var COMMON_moduleInitializer=function(){var modules=[];
var miscModules=[{functionName:"COMMON_imageMouseover"},{functionName:"COMMON_links"},{functionName:"COMMON_table"}];
var overlaidModules={};
var scriptsLoaded=[];
var queueMode=true;
return{moduleList:modules,scriptsLoaded:scriptsLoaded,miscList:miscModules,overlays:overlaidModules,init:function(){},activateScripts:function(jqueryObj){jqueryObj.each(function(){var divContents=this;
var divContentsCheck=setInterval(function(){if(divContents.innerHTML.length>0){$(divContents).find("script").each(function(){eval(this.innerHTML)
});
clearInterval(divContentsCheck)
}},500)
})
},addScriptToLoad:function(jsLocation){scriptsLoaded[jsLocation]=false
},addToMiscModulesList:function(functionName){miscModules.push(functionName)
},initializeMiscModules:function(){for(var i=0;
i<miscModules.length;
i++){var miscConfigObj=miscModules[i];
COMMON_moduleInitializer.runModuleInitFunction(miscConfigObj)
}},addToModuleList:function(configObj){if(typeof configObj!=="object"){return false
}if(!configObj.hasOwnProperty("functionName")&&!configObj.hasOwnProperty("jsLocation")){return false
}if(configObj.runInit===true&&!configObj.hasOwnProperty("functionName")){return false
}for(var i=1;
i<arguments.length;
i++){if(!configObj.hasOwnProperty("moduleArguments")){configObj.moduleArguments=[]
}(configObj.moduleArguments).push(arguments[i])
}configObj.isInitialized=false;
if(!configObj.hasOwnProperty("runInit")){configObj.runInit=false
}var modulesLength=modules.push(configObj);
if(!queueMode){COMMON_moduleInitializer.initializeModule(modules[modulesLength-1])
}},doInitialization:function(configObj){if(!configObj.isInitialized){if(configObj.runInit===true){COMMON_moduleInitializer.runModuleInitFunction(configObj);
COMMON_moduleInitializer.markInitialized(configObj)
}}if(overlaidModules.hasOwnProperty(configObj.functionName)){var overlayArray=overlaidModules[configObj.functionName];
for(var i=0;
i<overlayArray.length;
i++){var overlayConfigObj=overlayArray[i];
var addObj={};
for(var property in overlayConfigObj){if(overlayConfigObj.hasOwnProperty(property)){addObj[property]=overlayConfigObj[property]
}}if(configObj.hasOwnProperty("moduleArguments")){addObj.moduleArguments=configObj.moduleArguments
}COMMON_moduleInitializer.addToModuleList(addObj)
}}},initializeQueuedModules:function(){for(var i=0;
i<modules.length;
i++){COMMON_moduleInitializer.initializeModule(modules[i])
}queueMode=false
},initializeModule:function(configObj){if(configObj.hasOwnProperty("functionName")&&!COMMON_moduleInitializer.util_functionExists(configObj.functionName)){if(configObj.hasOwnProperty("jsLocation")&&!scriptsLoaded.hasOwnProperty(configObj.jsLocation)){COMMON_moduleInitializer.addScriptToLoad(configObj.jsLocation);
COMMON_moduleInitializer.loadJS(configObj,function(configObj){COMMON_moduleInitializer.doInitialization(configObj);
if(configObj.hasOwnProperty("scriptLoadedCallback")){configObj.scriptLoadedCallback()
}})
}else{var jsLoadedCheck=setInterval(function(){if(COMMON_moduleInitializer.util_functionExists(configObj.functionName)){COMMON_moduleInitializer.doInitialization(configObj);
if(configObj.hasOwnProperty("scriptLoadedCallback")){configObj.scriptLoadedCallback()
}clearInterval(jsLoadedCheck)
}},500)
}}else{if(!configObj.hasOwnProperty("functionName")&&configObj.hasOwnProperty("jsLocation")&&!scriptsLoaded.hasOwnProperty(configObj.jsLocation)){COMMON_moduleInitializer.addScriptToLoad(configObj.jsLocation);
COMMON_moduleInitializer.loadJS(configObj,function(configObj){COMMON_moduleInitializer.doInitialization(configObj);
if(configObj.hasOwnProperty("scriptLoadedCallback")){configObj.scriptLoadedCallback()
}})
}else{COMMON_moduleInitializer.doInitialization(configObj);
if(configObj.hasOwnProperty("scriptLoadedCallback")){configObj.scriptLoadedCallback()
}}}},loadJS:function(configObj,callbackFunction){if(!configObj.hasOwnProperty("jsLocation")){return false
}COMMON_moduleInitializer.util_getScript(configObj.jsLocation,function(){COMMON_moduleInitializer.updateScriptsLoadedList(configObj.jsLocation);
callbackFunction(configObj)
})
},markInitialized:function(configObj){configObj.isInitialized=true
},registerOverlay:function(baseFunctionName,configObj){if(overlaidModules[baseFunctionName]===undefined){overlaidModules[baseFunctionName]=[]
}overlaidModules[baseFunctionName].push(configObj)
},runModuleInitFunction:function(configObj){if(COMMON_moduleInitializer.util_functionExists(configObj.functionName)){var moduleObj=COMMON_moduleInitializer.util_functionNameToObj(configObj.functionName);
if(typeof moduleObj.init==="function"){if(configObj.hasOwnProperty("moduleArguments")){(moduleObj.init).apply(this,configObj.moduleArguments)
}else{moduleObj.init()
}}}},runOverlayModule:function(configObj){if(overlaidModules.hasOwnProperty(configObj.functionName)){var overlayArray=overlaidModules[configObj.functionName];
for(var i=0;
i<overlayArray.length;
i++){var overlayConfigObj=overlayArray[i];
var addObj={};
for(var property in overlayConfigObj){if(overlayConfigObj.hasOwnProperty(property)){addObj[property]=overlayConfigObj[property]
}}if(configObj.hasOwnProperty("moduleArguments")){addObj.moduleArguments=configObj.moduleArguments
}COMMON_moduleInitializer.addToModuleList(addObj)
}}},updateScriptsLoadedList:function(jsLocation){scriptsLoaded[jsLocation]=true
},util_functionExists:function(functionName){var moduleObj=COMMON_moduleInitializer.util_functionNameToObj(functionName);
return(moduleObj!==false)
},util_functionNameToObj:function(fn){if(typeof fn==="string"){return window[fn]||false
}else{if(typeof fn==="object"||typeof fn==="function"){return fn
}}},util_getScript:function(url,callbackFn){var head=document.getElementsByTagName("head")[0]||document.documentElement;
var script=document.createElement("script");
script.src=url;
var done=false;
script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;
if(callbackFn){callbackFn()
}script.onload=script.onreadystatechange=null;
if(head&&script.parentNode){head.removeChild(script)
}}};
head.insertBefore(script,head.firstChild)
}}
}();
var COMMON_table=function(){var a={rowStyle:"altRow"};
return{init:function(){COMMON_table.addClasses();
COMMON_table.stripeRows()
},addClasses:function(){$("div.text table").each(function(){var b=$(this);
b.children("tbody").children("tr:first").addClass(COMMON_globalConstants.firstChild);
b.children("tbody").children("tr:last").addClass(COMMON_globalConstants.lastChild)
});
$("div.text table tr").each(function(){var b=$(this);
b.children("td:first").addClass(COMMON_globalConstants.firstChild);
b.children("td:last").addClass(COMMON_globalConstants.lastChild);
b.children("th:first").addClass(COMMON_globalConstants.firstChild);
b.children("th:last").addClass(COMMON_globalConstants.lastChild)
})
},stripeRows:function(){$("div.text table").find("tr:even").addClass(a.rowStyle)
}}
}();
var COMMON_tracking=function(){return{init:function(){},trackingRedirect:function(b,a,c){cmCreatePageElementTag(a,c);
var d=b;
if(d.match("^http://")=="http://"){d=d.substring(d.indexOf("/",7))
}cmCreateManualLinkClickTag(d,"Features");
window.location=b
},triggerTracking:function(a,b){cmCreatePageElementTag(a,b)
}}
}();
function getFlashVersion(){try{try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
try{a.AllowScriptAccess="always"
}catch(b){return"6,0,0"
}}catch(b){}return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]
}catch(b){try{if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){return(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1]
}}catch(b){}}return"0,0,0"
}function getElementsByClassName(c,b){var a=[];
walkTheDOM(b||document.body,function(f){var d,g=f.className,e;
if(g){d=g.split(" ");
for(e=0;
e<d.length;
e+=1){if(d[e]===c){a.push(f);
break
}}}});
return a
}function walkTheDOM(b,a){a(b);
b=b.firstChild;
while(b){walkTheDOM(b,a);
b=b.nextSibling
}}function getSiblings(c,b){if(!c){return false
}var d=[];
var a=c;
if(b==="next"){while(a){a=nextSibling(a);
if(a){d.push(a)
}}}else{if(b==="previous"){while(a){a=previousSibling(a);
if(a){d.push(a)
}}}}if(!d.length){return false
}return d
}function nextSibling(a){do{a=a.nextSibling
}while(a&&a.nodeType!=1);
return a
}function previousSibling(a){do{a=a.previousSibling
}while(a&&a.nodeType!=1);
return a
}function setDialogStorePath(a,c){var b=a.findParentByType("dialog");
b.tmpLoad=b.loadContent;
b.loadContent=function(d){b.content=c;
b.tmpLoad(b.content)
}
}var _XHR_MS=false;
function createXHR(){var d=false;
try{d=new ActiveXObject("Msxml2.XMLHTTP");
_XHR_MS=true
}catch(b){try{d=new ActiveXObject("Microsoft.XMLHTTP");
_XHR_MS=true
}catch(a){try{d=new XMLHttpRequest();
_XHR_MS=false
}catch(c){d=false
}}}return d
}function isXHR_MS(){return _XHR_MS
}function debug(a){}function obj2Xml(e,g){g=(g)?g:0;
var b="\n";
var c="";
for(var a=0;
a<g;
a++){c+=" "
}if(typeof e==="object"){if(e.constructor.toString().indexOf("Array")!==-1){for(a=0;
a<e.length;
a++){b+=c+"<item>"+obj2Xml(e[a],g+1)+"</item>\n"
}b=b.substr(0,b.length-1)
}else{for(a in e){var f=obj2Xml(e[a],g+1);
if(!f){return false
}b+=((b==="\n")?"":"\n")+c+"<"+a+">"+f+((typeof e[a]==="object")?"\n"+c:"")+"</"+a+">"
}}}else{if(typeof e==="string"){b=e
}else{if(e.toString){b=e.toString()
}else{return false
}}}return b
}function json2Xml(json){return eval("obj2Xml("+json+");")
}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
}
}$(function(){var a=$("html");
if(a.hasClass("ie6")||a.hasClass("ie7")||a.hasClass("ie8")){$(document).find("select").on("focus",function(d){var c=$(d.currentTarget),b=c.css("width");
c.css({width:"auto","min-width":b})
}).on("blur",function(c){var b=$(c.currentTarget);
b.css("width",b.css("min-width"))
})
}});
/*  
 *  Font UnStack 0.1
 * 
 *  Developed by Phil Oye
 *  Copyright (c) 2009 Phil Oye, http://philoye.com/
 *
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
  $.fn.fontunstack = function(defaults, opts) {
     $.fontunstack.init(defaults,opts,this);
  };

  $.fontunstack = {

    options: {
      class_prefix: "set_in_"
    },

    init: function(stack, opts, elems){
       var elems = elems || "body";
       $.extend(this.options,opts);

       if( this.options.class_prefix == "") {
         this.options.class_prefix = "set_in_";
       }

       // If a css-style font-family declaration (string) passed in, convert to array
        if (typeof stack == "string") {
          stack = stack.match(/[^'",;\s][^'",;]*/g) || [];
        }
       this.analyzeStack(stack, elems);
     },

     analyzeStack: function(stack, elems) {
       var generics = ["monospace", "sans-serif", "serif", "cursive", "fantasy"];
       var baseline = generics[0];
       var num_fonts = stack.length;
       var last_resort = stack[num_fonts -1];

      // If author hasn't included a generic (tsk, tsk), let's add one
      if ($.inArray(last_resort, generics)) { 
        stack.push(baseline);
        num_fonts++;
      }
      
      // If the generic is the same as our baseline, let's use another.
      if (last_resort == baseline) {
        baseline = generics[1]; 
      };
    
      // At this point we're sure there is a generic fallback font, so we'll only iterate though the non-generics.
      for (var i=0; i<num_fonts -1; i++) {
        font = stack[i];
        if ($.fontunstack.testFont(font, baseline)) {

          // Remove any class that has our prefix to prevent doubles.
          var re = new RegExp("\\b" + this.options.class_prefix + ".*?\\b","g");
          $(elems).get(0).className = $(elems).get(0).className.replace(re, "");

          // This should convert UTF8 to lowercase ANSI, removing all punctuation/spaces, but regexp scares me.
          safe_font_name = encodeURIComponent( font.replace( /[\s\-.!~*'()"]/g, "").toLowerCase() );
          $(elems).addClass(this.options.class_prefix + safe_font_name);
          break; //We only want to find one installed font per stack.
        }
      }
    },

    testFont: function(requested_font, baseline_font) {
      var span = $('<span id="font_tester" style="font-family:' + baseline_font + '; font-size:144px;position:absolute;left:-10000px;top:-10000px;visibility:hidden;">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmml</span>');
      $("body").prepend(span);

      var baseline_width = span.width();
      span.css("font-family", requested_font + "," + baseline_font );
      var requested_width = span.width();
      span.remove();

      // If the dimensions change, the font is installed
      return (requested_width != baseline_width);
    }

  };

})(jQuery);
/*
 * Modernizr JavaScript library 1.1
 * http://modernizr.com/
 *
 * Copyright (c) 2009 Faruk Ates - http://farukat.es/
 * Licensed under the MIT license.
 * http://modernizr.com/license/
 *
 * Featuring major contributions by
 * Paul Irish  - http://paulirish.com
 * Ben Alman   - http://benalman.com/
 */
 window.Modernizr=(function(P,l){var _='1.1', J={},T=true,ab=true,M=100,ad=l.documentElement,U=l.createElement("modernizr"),k=U.style,Z=l.createElement("input"),o="canvas",Y="canvastext",V="rgba",g="hsla",Q="multiplebgs",x="borderimage",D="borderradius",v="boxshadow",X="opacity",B="cssanimations",R="csscolumns",a="cssgradients",p="cssreflections",h="csstransforms",w="csstransforms3d",aa="csstransitions",F="fontface",K="geolocation",e="video",A="audio",d="input",u=d+"types",N="background",b=N+"Color",G="canPlayType",H="localstorage",j="sessionstorage",C="webworkers",O="applicationcache",c=" -o- -moz- -ms- -webkit- ".split(" "),s={},z={},r={},q,S,W,L,n=[];function y(f){k.cssText=f}function E(i,f){return y(c.join(i+";")+(f||""))}function I(i,f){return i.indexOf(f)!==-1}function ac(m,ae){for(var f in m){if(k[m[f]]!==undefined&&(!ae||ae(m[f]))){return true}}}function t(ae,m){var i=ae.charAt(0).toUpperCase()+ae.substr(1),f=[ae,"webkit"+i,"Moz"+i,"moz"+i,"o"+i,"ms"+i];return !!ac(f,m)}s[o]=function(){return !!l.createElement(o).getContext};s[Y]=function(){return !!(s[o]()&&typeof l.createElement(o).getContext("2d").fillText=="function")};s[K]=function(){return !!navigator.geolocation};s[V]=function(){y(N+"-color:rgba(150,255,150,.5)");return I(k[b],V)};s[g]=function(){y(N+"-color:hsla(120,40%,100%,.5)");return I(k[b],V)};s[Q]=function(){y(N+":url(m.png),url(a.png),#f99 url(m.png)");return/(url\s*\(.*?){3}/.test(k[N])};s[x]=function(){return t("borderImage")};s[D]=function(){return t("borderRadius","",function(f){return I(f,"orderRadius")})};s[v]=function(){return t("boxShadow")};s[X]=function(){y("opacity:.5");return I(k[X],"0.5")};s[B]=function(){return t("animationName")};s[R]=function(){return t("columnCount")};s[a]=function(){var m=N+"-image:",i="gradient(linear,left top,right bottom,from(#9f9),to(white));",f="linear-gradient(left top,#9f9, white);";y(m+i+m+"-webkit-"+i+m+"-moz-"+i+m+"-o-"+i+m+"-ms-"+i+m+f+m+"-webkit-"+f+m+"-moz-"+f+m+"-o-"+f+m+"-ms-"+f);return I(k.backgroundImage,"gradient")};s[p]=function(){return t("boxReflect")};s[h]=function(){return !!ac(["transformProperty","webkitTransform","MozTransform","mozTransform","oTransform","msTransform"])};s[w]=function(){return !!ac(["perspectiveProperty","webkitPerspective","MozPerspective","mozPerspective","oPerspective","msPerspective"])};s[aa]=function(){return t("transitionProperty")};s[F]=(function(){var i;if(!(!/*@cc_on@if(@_jscript_version>=5)!@end@*/0)){i=true}else{var aj=l.createElement("style"),ae=l.createElement("span"),ak,af,ah=false,ag=l.body,ai,m;aj.textContent="@font-face{font-family:testfont;src:url('data:font/ttf;base64,AAEAAAAMAIAAAwBAT1MvMliohmwAAADMAAAAVmNtYXCp5qrBAAABJAAAANhjdnQgACICiAAAAfwAAAAEZ2FzcP//AAMAAAIAAAAACGdseWYv5OZoAAACCAAAANxoZWFk69bnvwAAAuQAAAA2aGhlYQUJAt8AAAMcAAAAJGhtdHgGDgC4AAADQAAAABRsb2NhAIQAwgAAA1QAAAAMbWF4cABVANgAAANgAAAAIG5hbWUgXduAAAADgAAABPVwb3N03NkzmgAACHgAAAA4AAECBAEsAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAACAAMDAAAAAAAAgAACbwAAAAoAAAAAAAAAAFBmRWQAAAAgqS8DM/8zAFwDMwDNAAAABQAAAAAAAAAAAAMAAAADAAAAHAABAAAAAABGAAMAAQAAAK4ABAAqAAAABgAEAAEAAgAuqQD//wAAAC6pAP///9ZXAwAAAAAAAAACAAAABgBoAAAAAAAvAAEAAAAAAAAAAAAAAAAAAAABAAIAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEACoAAAAGAAQAAQACAC6pAP//AAAALqkA////1lcDAAAAAAAAAAIAAAAiAogAAAAB//8AAgACACIAAAEyAqoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8sgECAO0yMxEhESczESMiARDuzMwCqv1WIgJmAAACAFUAAAIRAc0ADwAfAAATFRQWOwEyNj0BNCYrASIGARQGKwEiJj0BNDY7ATIWFX8aIvAiGhoi8CIaAZIoN/43KCg3/jcoAWD0JB4eJPQkHh7++EY2NkbVRjY2RgAAAAABAEH/+QCdAEEACQAANjQ2MzIWFAYjIkEeEA8fHw8QDxwWFhwWAAAAAQAAAAIAAIuYbWpfDzz1AAsEAAAAAADFn9IuAAAAAMWf0i797/8zA4gDMwAAAAgAAgAAAAAAAAABAAADM/8zAFwDx/3v/98DiAABAAAAAAAAAAAAAAAAAAAABQF2ACIAAAAAAVUAAAJmAFUA3QBBAAAAKgAqACoAWgBuAAEAAAAFAFAABwBUAAQAAgAAAAEAAQAAAEAALgADAAMAAAAQAMYAAQAAAAAAAACLAAAAAQAAAAAAAQAhAIsAAQAAAAAAAgAFAKwAAQAAAAAAAwBDALEAAQAAAAAABAAnAPQAAQAAAAAABQAKARsAAQAAAAAABgAmASUAAQAAAAAADgAaAUsAAwABBAkAAAEWAWUAAwABBAkAAQBCAnsAAwABBAkAAgAKAr0AAwABBAkAAwCGAscAAwABBAkABABOA00AAwABBAkABQAUA5sAAwABBAkABgBMA68AAwABBAkADgA0A/tDb3B5cmlnaHQgMjAwOSBieSBEYW5pZWwgSm9obnNvbi4gIFJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgT3BlbiBGb250IExpY2Vuc2UuIEtheWFoIExpIGdseXBocyBhcmUgcmVsZWFzZWQgdW5kZXIgdGhlIEdQTCB2ZXJzaW9uIDMuYmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhTGlnaHRiYWVjMmE5MmJmZmU1MDMyIC0gc3Vic2V0IG9mIEZvbnRGb3JnZSAyLjAgOiBKdXJhIExpZ2h0IDogMjMtMS0yMDA5YmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhIExpZ2h0VmVyc2lvbiAyIGJhZWMyYTkyYmZmZTUwMzIgLSBzdWJzZXQgb2YgSnVyYUxpZ2h0aHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkwAQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMAA5ACAAYgB5ACAARABhAG4AaQBlAGwAIABKAG8AaABuAHMAbwBuAC4AIAAgAFIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAdABlAHIAbQBzACAAbwBmACAAdABoAGUAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALgAgAEsAYQB5AGEAaAAgAEwAaQAgAGcAbAB5AHAAaABzACAAYQByAGUAIAByAGUAbABlAGEAcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAEcAUABMACAAdgBlAHIAcwBpAG8AbgAgADMALgBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQBMAGkAZwBoAHQAYgBhAGUAYwAyAGEAOQAyAGIAZgBmAGUANQAwADMAMgAgAC0AIABzAHUAYgBzAGUAdAAgAG8AZgAgAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAASgB1AHIAYQAgAEwAaQBnAGgAdAAgADoAIAAyADMALQAxAC0AMgAwADAAOQBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQAgAEwAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMgAgAGIAYQBlAGMAMgBhADkAMgBiAGYAZgBlADUAMAAzADIAIAAtACAAcwB1AGIAcwBlAHQAIABvAGYAIABKAHUAcgBhAEwAaQBnAGgAdABoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwAAAAAAgAAAAAAAP+BADMAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAQACAQIAEQt6ZXJva2F5YWhsaQ==')}";l.getElementsByTagName("head")[0].appendChild(aj);ae.setAttribute("style","font:99px _,serif;position:absolute;visibility:hidden");if(!ag){ag=ad.appendChild(l.createElement(F));ah=true}ae.innerHTML="........";ae.id="fonttest";ag.appendChild(ae);ak=ae.offsetWidth;ae.style.font="99px testfont,_,serif";i=ak!==ae.offsetWidth;var f=function(){i=J[F]=ak!==ae.offsetWidth;ad.className=ad.className.replace(/(no-)?font.*?\b/,"")+(i?" ":" no-")+F;ai&&(m=true)&&ai(i);ah&&setTimeout(function(){ag.parentNode.removeChild(ag)},50)};setTimeout(f,M)}J._fontfaceready=function(al){(m||i)?al(i):(ai=al)};return function(){return i||ak!==ae.offsetWidth}})();s[e]=function(){var i=l.createElement(e),f=!!i[G];if(f){f=new Boolean(f);f.ogg=i[G]('video/ogg; codecs="theora, vorbis"');f.h264=i[G]('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')}return f};s[A]=function(){var i=l.createElement(A),f=!!i[G];if(f){f=new Boolean(f);f.ogg=i[G]('audio/ogg; codecs="vorbis"');f.mp3=i[G]("audio/mpeg3;");f.wav=i[G]('audio/wav; codecs="1"');f.m4a=i[G]("audio/x-m4a;")}return f};s[H]=function(){return"localStorage" in P};s[j]=function(){return"sessionStorage" in P};s[C]=function(){return !!P.Worker};s[O]=function(){return !!P.applicationCache};for(L in s){if(s.hasOwnProperty(L)){n.push((!(J[L]=s[L]())&&ab?"no-":"")+L)}}J.addTest=function(f,i){if(this.hasOwnProperty(f)){}i=!!(i());ad.className+=" "+(!i&&ab?"no-":"")+f;J[f]=i};J[d]=(function(m){for(var f in m){r[m[f]]=!!(m[f] in Z)}return r})("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));J[u]=(function(m){for(var f in m){Z.setAttribute("type",m[f]);z[m[f]]=!!(Z.type!=="text")}return z})("search tel url email datetime date month week time datetime-local number range color".split(" "));y("");U=Z=null;if(T&&!(!/*@cc_on!@*/0)){q="abbr article aside audio canvas datalist details eventsource figure footer header hgroup mark menu meter nav output progress section time video".split(" ");W=q.length+1;while(--W){S=l.createElement(q[W])}S=null}J._enableHTML5=T;J._enableNoClasses=ab;J._version=_;(function(f,i){f[i]=f[i].replace(/\bno-js\b/,"js")})(ad,"className");ad.className+=" "+n.join(" ");return J})(this,this.document);
/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);
var Mustache=function(){var a={};
var b=function(){};
b.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":true},context:{},render:function(f,e,d,g){if(!g){this.context=e;
this.buffer=[]
}if(!this.includes("",f)){if(g){return f
}else{this.send(f);
return
}}f=this.render_pragmas(f);
var c=this.render_section(f,e,d);
if(c===false){c=this.render_tags(f,e,d,g)
}if(g){return c
}else{this.sendLines(c)
}},send:function(c){if(c!==""){this.buffer.push(c)
}},sendLines:function(e){if(e){var c=e.split("\n");
for(var d=0;
d<c.length;
d++){this.send(c[d])
}}},render_pragmas:function(c){if(!this.includes("%",c)){return c
}var e=this;
var d=this.getCachedRegex("render_pragmas",function(g,f){return new RegExp(g+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+f,"g")
});
return c.replace(d,function(h,f,g){if(!e.pragmas_implemented[f]){throw ({message:"This implementation of mustache doesn't understand the '"+f+"' pragma"})
}e.pragmas[f]={};
if(g){var i=g.split("=");
e.pragmas[f][i[0]]=i[1]
}return""
})
},render_partial:function(c,e,d){c=this.trim(c);
if(!d||d[c]===undefined){throw ({message:"unknown_partial '"+c+"'"})
}if(typeof(e[c])!="object"){return this.render(d[c],e,d,true)
}return this.render(d[c],e[c],d,true)
},render_section:function(e,d,c){if(!this.includes("#",e)&&!this.includes("^",e)){return false
}var g=this;
var f=this.getCachedRegex("render_section",function(i,h){return new RegExp("^([\\s\\S]*?)"+i+"(\\^|\\#)\\s*(.+)\\s*"+h+"\n*([\\s\\S]*?)"+i+"\\/\\s*\\3\\s*"+h+"\\s*([\\s\\S]*)$","g")
});
return e.replace(f,function(k,o,n,j,l,i){var q=o?g.render_tags(o,d,c,true):"",m=i?g.render(i,d,c,true):"",h,p=g.find(j,d);
if(n==="^"){if(!p||g.is_array(p)&&p.length===0){h=g.render(l,d,c,true)
}else{h=""
}}else{if(n==="#"){if(g.is_array(p)){h=g.map(p,function(r){return g.render(l,g.create_context(r),c,true)
}).join("")
}else{if(g.is_object(p)){h=g.render(l,g.create_context(p),c,true)
}else{if(typeof p==="function"){h=p.call(d,l,function(r){return g.render(r,d,c,true)
})
}else{if(p){h=g.render(l,d,c,true)
}else{h=""
}}}}}}return q+h+m
})
},render_tags:function(l,c,e,g){var f=this;
var k=function(){return f.getCachedRegex("render_tags",function(n,i){return new RegExp(n+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+i+"+","g")
})
};
var h=k();
var j=function(o,i,n){switch(i){case"!":return"";
case"=":f.set_delimiters(n);
h=k();
return"";
case">":return f.render_partial(n,c,e);
case"{":return f.find(n,c);
default:return f.escape(f.find(n,c))
}};
var m=l.split("\n");
for(var d=0;
d<m.length;
d++){m[d]=m[d].replace(h,j,this);
if(!g){this.send(m[d])
}}if(g){return m.join("\n")
}},set_delimiters:function(d){var c=d.split(" ");
this.otag=this.escape_regex(c[0]);
this.ctag=this.escape_regex(c[1])
},escape_regex:function(d){if(!arguments.callee.sRE){var c=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];
arguments.callee.sRE=new RegExp("(\\"+c.join("|\\")+")","g")
}return d.replace(arguments.callee.sRE,"\\$1")
},find:function(e,f){e=this.trim(e);
function d(h){return h===false||h===0||h
}var g;
if(e.match(/([a-z_]+)\./ig)){var c=this.walk_context(e,f);
if(d(c)){g=c
}}else{if(d(f[e])){g=f[e]
}else{if(d(this.context[e])){g=this.context[e]
}}}if(typeof g==="function"){return g.apply(f)
}if(g!==undefined){return g
}return""
},walk_context:function(c,d){var g=c.split(".");
var f=(d[g[0]]!=undefined)?d:this.context;
var e=f[g.shift()];
while(e!=undefined&&g.length>0){f=e;
e=e[g.shift()]
}if(typeof e==="function"){return e.apply(f)
}return e
},includes:function(d,c){return c.indexOf(this.otag+d)!=-1
},escape:function(c){c=String(c===null?"":c);
return c.replace(/&(?!\w+;)|["'<>\\]/g,function(d){switch(d){case"&":return"&amp;";
case'"':return"&quot;";
case"'":return"&#39;";
case"<":return"&lt;";
case">":return"&gt;";
default:return d
}})
},create_context:function(d){if(this.is_object(d)){return d
}else{var e=".";
if(this.pragmas["IMPLICIT-ITERATOR"]){e=this.pragmas["IMPLICIT-ITERATOR"].iterator
}var c={};
c[e]=d;
return c
}},is_object:function(c){return c&&typeof c=="object"
},is_array:function(c){return Object.prototype.toString.call(c)==="[object Array]"
},trim:function(c){return c.replace(/^\s*|\s*$/g,"")
},map:function(g,e){if(typeof g.map=="function"){return g.map(e)
}else{var f=[];
var c=g.length;
for(var d=0;
d<c;
d++){f.push(e(g[d]))
}return f
}},getCachedRegex:function(d,g){var f=a[this.otag];
if(!f){f=a[this.otag]={}
}var c=f[this.ctag];
if(!c){c=f[this.ctag]={}
}var e=c[d];
if(!e){e=c[d]=g(this.otag,this.ctag)
}return e
}};
return({name:"mustache.js",version:"0.4.0-dev",to_html:function(e,c,d,g){var f=new b();
if(g){f.send=g
}f.render(e,c||{},d);
if(!g){return f.buffer.join("\n")
}}})
}();
(function(){function N(b,n,m){if(b===n){return b!==0||1/b==1/n
}if(b==null||n==null){return b===n
}if(b._chain){b=b._wrapped
}if(n._chain){n=n._wrapped
}if(af.isFunction(b.isEqual)){return b.isEqual(n)
}if(af.isFunction(n.isEqual)){return n.isEqual(b)
}var l=typeof b;
if(l!=typeof n){return false
}if(!b!=!n){return false
}if(af.isNaN(b)){return af.isNaN(n)
}var j=af.isString(b),k=af.isString(n);
if(j||k){return j&&k&&String(b)==String(n)
}j=af.isNumber(b);
k=af.isNumber(n);
if(j||k){return j&&k&&+b==+n
}j=af.isBoolean(b);
k=af.isBoolean(n);
if(j||k){return j&&k&&+b==+n
}j=af.isDate(b);
k=af.isDate(n);
if(j||k){return j&&k&&b.getTime()==n.getTime()
}j=af.isRegExp(b);
k=af.isRegExp(n);
if(j||k){return j&&k&&b.source==n.source&&b.global==n.global&&b.multiline==n.multiline&&b.ignoreCase==n.ignoreCase
}if(l!="object"){return false
}if(b.length!==n.length){return false
}if(b.constructor!==n.constructor){return false
}for(l=m.length;
l--;
){if(m[l]==b){return true
}}m.push(b);
var l=0,j=true,i;
for(i in b){if(aa.call(b,i)&&(l++,!(j=aa.call(n,i)&&N(b[i],n[i],m)))){break
}}if(j){for(i in n){if(aa.call(n,i)&&!l--){break
}}j=!l
}m.pop();
return j
}var T=this,M=T._,Y={},ac=Array.prototype,X=Object.prototype,ae=ac.slice,K=ac.unshift,ab=X.toString,aa=X.hasOwnProperty,L=ac.forEach,h=ac.map,f=ac.reduce,d=ac.reduceRight,a=ac.filter,W=ac.every,V=ac.some,U=ac.indexOf,S=ac.lastIndexOf,X=Array.isArray,g=Object.keys,R=Function.prototype.bind,af=function(b){return new Z(b)
};
if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=af
}exports._=af
}else{typeof define==="function"&&define.amd?define("underscore",function(){return af
}):T._=af
}af.VERSION="1.2.1";
var ad=af.each=af.forEach=function(j,m,i){if(j!=null){if(L&&j.forEach===L){j.forEach(m,i)
}else{if(j.length===+j.length){for(var l=0,k=j.length;
l<k;
l++){if(l in j&&m.call(i,j[l],l,j)===Y){break
}}}else{for(l in j){if(aa.call(j,l)&&m.call(i,j[l],l,j)===Y){break
}}}}}};
af.map=function(j,l,i){var k=[];
if(j==null){return k
}if(h&&j.map===h){return j.map(l,i)
}ad(j,function(b,n,m){k[k.length]=l.call(i,b,n,m)
});
return k
};
af.reduce=af.foldl=af.inject=function(b,l,k,j){var i=k!==void 0;
b==null&&(b=[]);
if(f&&b.reduce===f){return j&&(l=af.bind(l,j)),i?b.reduce(l,k):b.reduce(l)
}ad(b,function(n,m,o){i?k=l.call(j,k,n,m,o):(k=n,i=true)
});
if(!i){throw new TypeError("Reduce of empty array with no initial value")
}return k
};
af.reduceRight=af.foldr=function(b,k,j,i){b==null&&(b=[]);
if(d&&b.reduceRight===d){return i&&(k=af.bind(k,i)),j!==void 0?b.reduceRight(k,j):b.reduceRight(k)
}b=(af.isArray(b)?b.slice():af.toArray(b)).reverse();
return af.reduce(b,k,j,i)
};
af.find=af.detect=function(j,l,i){var k;
Q(j,function(b,n,m){if(l.call(i,b,n,m)){return k=b,true
}});
return k
};
af.filter=af.select=function(j,l,i){var k=[];
if(j==null){return k
}if(a&&j.filter===a){return j.filter(l,i)
}ad(j,function(b,n,m){l.call(i,b,n,m)&&(k[k.length]=b)
});
return k
};
af.reject=function(j,l,i){var k=[];
if(j==null){return k
}ad(j,function(b,n,m){l.call(i,b,n,m)||(k[k.length]=b)
});
return k
};
af.every=af.all=function(j,l,i){var k=true;
if(j==null){return k
}if(W&&j.every===W){return j.every(l,i)
}ad(j,function(b,n,m){if(!(k=k&&l.call(i,b,n,m))){return Y
}});
return k
};
var Q=af.some=af.any=function(b,k,j){var k=k||af.identity,i=false;
if(b==null){return i
}if(V&&b.some===V){return b.some(k,j)
}ad(b,function(m,l,n){if(i|=k.call(j,m,l,n)){return Y
}});
return !!i
};
af.include=af.contains=function(j,k){var i=false;
if(j==null){return i
}return U&&j.indexOf===U?j.indexOf(k)!=-1:i=Q(j,function(b){if(b===k){return true
}})
};
af.invoke=function(b,j){var i=ae.call(arguments,2);
return af.map(b,function(k){return(j.call?j||k:k[j]).apply(k,i)
})
};
af.pluck=function(b,i){return af.map(b,function(j){return j[i]
})
};
af.max=function(b,k,j){if(!k&&af.isArray(b)){return Math.max.apply(Math,b)
}if(!k&&af.isEmpty(b)){return -Infinity
}var i={computed:-Infinity};
ad(b,function(m,l,n){l=k?k.call(j,m,l,n):m;
l>=i.computed&&(i={value:m,computed:l})
});
return i.value
};
af.min=function(b,k,j){if(!k&&af.isArray(b)){return Math.min.apply(Math,b)
}if(!k&&af.isEmpty(b)){return Infinity
}var i={computed:Infinity};
ad(b,function(m,l,n){l=k?k.call(j,m,l,n):m;
l<i.computed&&(i={value:m,computed:l})
});
return i.value
};
af.shuffle=function(j){var i=[],k;
ad(j,function(b,l){l==0?i[0]=b:(k=Math.floor(Math.random()*(l+1)),i[l]=i[k],i[k]=b)
});
return i
};
af.sortBy=function(b,j,i){return af.pluck(af.map(b,function(l,k,m){return{value:l,criteria:j.call(i,l,k,m)}
}).sort(function(l,k){var n=l.criteria,m=k.criteria;
return n<m?-1:n>m?1:0
}),"value")
};
af.groupBy=function(b,k){var j={},i=af.isFunction(k)?k:function(l){return l[k]
};
ad(b,function(m,l){var n=i(m,l);
(j[n]||(j[n]=[])).push(m)
});
return j
};
af.sortedIndex=function(b,m,l){l||(l=af.identity);
for(var k=0,i=b.length;
k<i;
){var j=k+i>>1;
l(b[j])<l(m)?k=j+1:i=j
}return k
};
af.toArray=function(b){return !b?[]:b.toArray?b.toArray():af.isArray(b)?ae.call(b):af.isArguments(b)?ae.call(b):af.values(b)
};
af.size=function(b){return af.toArray(b).length
};
af.first=af.head=function(j,i,k){return i!=null&&!k?ae.call(j,0,i):j[0]
};
af.initial=function(j,i,k){return ae.call(j,0,j.length-(i==null||k?1:i))
};
af.last=function(j,i,k){return i!=null&&!k?ae.call(j,j.length-i):j[j.length-1]
};
af.rest=af.tail=function(j,i,k){return ae.call(j,i==null||k?1:i)
};
af.compact=function(b){return af.filter(b,function(i){return !!i
})
};
af.flatten=function(b,i){return af.reduce(b,function(j,k){if(af.isArray(k)){return j.concat(i?k:af.flatten(k))
}j[j.length]=k;
return j
},[])
};
af.without=function(b){return af.difference(b,ae.call(arguments,1))
};
af.uniq=af.unique=function(b,k,j){var j=j?af.map(b,j):b,i=[];
af.reduce(j,function(n,m,l){if(0==l||(k===true?af.last(n)!=m:!af.include(n,m))){n[n.length]=m,i[i.length]=b[l]
}return n
},[]);
return i
};
af.union=function(){return af.uniq(af.flatten(arguments,true))
};
af.intersection=af.intersect=function(b){var i=ae.call(arguments,1);
return af.filter(af.uniq(b),function(j){return af.every(i,function(k){return af.indexOf(k,j)>=0
})
})
};
af.difference=function(b,i){return af.filter(b,function(j){return !af.include(i,j)
})
};
af.zip=function(){for(var b=ae.call(arguments),k=af.max(af.pluck(b,"length")),j=Array(k),i=0;
i<k;
i++){j[i]=af.pluck(b,""+i)
}return j
};
af.indexOf=function(b,k,j){if(b==null){return -1
}var i;
if(j){return j=af.sortedIndex(b,k),b[j]===k?j:-1
}if(U&&b.indexOf===U){return b.indexOf(k)
}for(j=0,i=b.length;
j<i;
j++){if(b[j]===k){return j
}}return -1
};
af.lastIndexOf=function(j,i){if(j==null){return -1
}if(S&&j.lastIndexOf===S){return j.lastIndexOf(i)
}for(var k=j.length;
k--;
){if(j[k]===i){return k
}}return -1
};
af.range=function(j,i,n){arguments.length<=1&&(i=j||0,j=0);
for(var n=arguments[2]||1,m=Math.max(Math.ceil((i-j)/n),0),k=0,l=Array(m);
k<m;
){l[k++]=j,j+=n
}return l
};
var P=function(){};
af.bind=function(b,k){var j,i;
if(b.bind===R&&R){return R.apply(b,ae.call(arguments,1))
}if(!af.isFunction(b)){throw new TypeError
}i=ae.call(arguments,2);
return j=function(){if(!(this instanceof j)){return b.apply(k,i.concat(ae.call(arguments)))
}P.prototype=b.prototype;
var l=new P,m=b.apply(l,i.concat(ae.call(arguments)));
return Object(m)===m?m:l
}
};
af.bindAll=function(b){var i=ae.call(arguments,1);
i.length==0&&(i=af.functions(b));
ad(i,function(j){b[j]=af.bind(b[j],b)
});
return b
};
af.memoize=function(b,j){var i={};
j||(j=af.identity);
return function(){var k=j.apply(this,arguments);
return aa.call(i,k)?i[k]:i[k]=b.apply(this,arguments)
}
};
af.delay=function(j,i){var k=ae.call(arguments,2);
return setTimeout(function(){return j.apply(j,k)
},i)
};
af.defer=function(b){return af.delay.apply(af,[b,1].concat(ae.call(arguments,1)))
};
af.throttle=function(b,n){var m,l,j,k,i;
i=af.debounce(function(){k=false
},n);
return function(){l=this;
j=arguments;
var o;
m||(m=setTimeout(function(){m=null;
b.apply(l,j);
i()
},n));
k||b.apply(l,j);
i&&i();
k=true
}
};
af.debounce=function(j,i){var k;
return function(){var l=this,b=arguments;
clearTimeout(k);
k=setTimeout(function(){k=null;
j.apply(l,b)
},i)
}
};
af.once=function(j){var i=false,k;
return function(){if(i){return k
}i=true;
return k=j.apply(this,arguments)
}
};
af.wrap=function(j,i){return function(){var b=[j].concat(ae.call(arguments));
return i.apply(this,b)
}
};
af.compose=function(){var b=ae.call(arguments);
return function(){for(var i=ae.call(arguments),j=b.length-1;
j>=0;
j--){i=[b[j].apply(this,i)]
}return i[0]
}
};
af.after=function(j,i){return function(){if(--j<1){return i.apply(this,arguments)
}}
};
af.keys=g||function(j){if(j!==Object(j)){throw new TypeError("Invalid object")
}var i=[],k;
for(k in j){aa.call(j,k)&&(i[i.length]=k)
}return i
};
af.values=function(b){return af.map(b,af.identity)
};
af.functions=af.methods=function(b){var j=[],i;
for(i in b){af.isFunction(b[i])&&j.push(i)
}return j.sort()
};
af.extend=function(b){ad(ae.call(arguments,1),function(i){for(var j in i){i[j]!==void 0&&(b[j]=i[j])
}});
return b
};
af.defaults=function(b){ad(ae.call(arguments,1),function(i){for(var j in i){b[j]==null&&(b[j]=i[j])
}});
return b
};
af.clone=function(b){return !af.isObject(b)?b:af.isArray(b)?b.slice():af.extend({},b)
};
af.tap=function(j,i){i(j);
return j
};
af.isEqual=function(j,i){return N(j,i,[])
};
af.isEmpty=function(b){if(af.isArray(b)||af.isString(b)){return b.length===0
}for(var i in b){if(aa.call(b,i)){return false
}}return true
};
af.isElement=function(b){return !!(b&&b.nodeType==1)
};
af.isArray=X||function(b){return ab.call(b)=="[object Array]"
};
af.isObject=function(b){return b===Object(b)
};
af.isArguments=ab.call(arguments)=="[object Arguments]"?function(b){return ab.call(b)=="[object Arguments]"
}:function(b){return !(!b||!aa.call(b,"callee"))
};
af.isFunction=function(b){return ab.call(b)=="[object Function]"
};
af.isString=function(b){return ab.call(b)=="[object String]"
};
af.isNumber=function(b){return ab.call(b)=="[object Number]"
};
af.isNaN=function(b){return b!==b
};
af.isBoolean=function(b){return b===true||b===false||ab.call(b)=="[object Boolean]"
};
af.isDate=function(b){return ab.call(b)=="[object Date]"
};
af.isRegExp=function(b){return ab.call(b)=="[object RegExp]"
};
af.isNull=function(b){return b===null
};
af.isUndefined=function(b){return b===void 0
};
af.noConflict=function(){T._=M;
return this
};
af.identity=function(b){return b
};
af.times=function(j,i,l){for(var k=0;
k<j;
k++){i.call(l,k)
}};
af.escape=function(b){return(""+b).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")
};
af.mixin=function(b){ad(af.functions(b),function(i){e(i,af[i]=b[i])
})
};
var c=0;
af.uniqueId=function(j){var i=c++;
return j?j+i:i
};
af.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
af.template=function(b,j){var i=af.templateSettings,i="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+b.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(i.escape,function(l,k){return"',_.escape("+k.replace(/\\'/g,"'")+"),'"
}).replace(i.interpolate,function(l,k){return"',"+k.replace(/\\'/g,"'")+",'"
}).replace(i.evaluate||null,function(l,k){return"');"+k.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"
}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",i=new Function("obj",i);
return j?i(j):i
};
var Z=function(b){this._wrapped=b
};
af.prototype=Z.prototype;
var O=function(b,i){return i?af(b).chain():b
},e=function(b,i){Z.prototype[b]=function(){var j=ae.call(arguments);
K.call(j,this._wrapped);
return O(i.apply(af,j),this._chain)
}
};
af.mixin(af);
ad("pop,push,reverse,shift,sort,splice,unshift".split(","),function(j){var i=ac[j];
Z.prototype[j]=function(){i.apply(this._wrapped,arguments);
return O(this._wrapped,this._chain)
}
});
ad(["concat","join","slice"],function(j){var i=ac[j];
Z.prototype[j]=function(){return O(i.apply(this._wrapped,arguments),this._chain)
}
});
Z.prototype.chain=function(){this._chain=true;
return this
};
Z.prototype.value=function(){return this._wrapped
}
})();
(function(){var I=this,A=I.Backbone,L;
L=typeof exports!=="undefined"?exports:I.Backbone={};
L.VERSION="0.5.3";
var K=I._;
if(!K&&typeof require!=="undefined"){K=require("underscore")._
}var J=I.jQuery||I.Zepto;
L.noConflict=function(){I.Backbone=A;
return this
};
L.emulateHTTP=!1;
L.emulateJSON=!1;
L.Events={bind:function(f,e,h){var g=this._callbacks||(this._callbacks={});
(g[f]||(g[f]=[])).push([e,h]);
return this
},unbind:function(g,f){var j;
if(g){if(j=this._callbacks){if(f){j=j[g];
if(!j){return this
}for(var i=0,h=j.length;
i<h;
i++){if(j[i]&&f===j[i][0]){j[i]=null;
break
}}}else{j[g]=[]
}}}else{this._callbacks={}
}return this
},trigger:function(j){var i,p,o,n,m=2;
if(!(p=this._callbacks)){return this
}for(;
m--;
){if(i=m?j:"all",i=p[i]){for(var l=0,k=i.length;
l<k;
l++){(o=i[l])?(n=m?Array.prototype.slice.call(arguments,1):arguments,o[0].apply(o[1]||this,n)):(i.splice(l,1),l--,k--)
}}}return this
}};
L.Model=function(f,e){var g;
f||(f={});
if(g=this.defaults){K.isFunction(g)&&(g=g.call(this)),f=K.extend({},g,f)
}this.attributes={};
this._escapedAttributes={};
this.cid=K.uniqueId("c");
this.set(f,{silent:!0});
this._changed=!1;
this._previousAttributes=K.clone(this.attributes);
if(e&&e.collection){this.collection=e.collection
}this.initialize(f,e)
};
K.extend(L.Model.prototype,L.Events,{_previousAttributes:null,_changed:!1,idAttribute:"id",initialize:function(){},toJSON:function(){return K.clone(this.attributes)
},get:function(e){return this.attributes[e]
},escape:function(f){var e;
if(e=this._escapedAttributes[f]){return e
}e=this.attributes[f];
return this._escapedAttributes[f]=(e==null?"":""+e).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")
},has:function(e){return this.attributes[e]!=null
},set:function(i,f){f||(f={});
if(!i){return this
}if(i.attributes){i=i.attributes
}var n=this.attributes,m=this._escapedAttributes;
if(!f.silent&&this.validate&&!this._performValidation(i,f)){return !1
}if(this.idAttribute in i){this.id=i[this.idAttribute]
}var l=this._changing;
this._changing=!0;
for(var k in i){var j=i[k];
if(!K.isEqual(n[k],j)){n[k]=j,delete m[k],this._changed=!0,f.silent||this.trigger("change:"+k,this,j,f)
}}!l&&!f.silent&&this._changed&&this.change(f);
this._changing=!1;
return this
},unset:function(f,e){if(!(f in this.attributes)){return this
}e||(e={});
var g={};
g[f]=void 0;
if(!e.silent&&this.validate&&!this._performValidation(g,e)){return !1
}delete this.attributes[f];
delete this._escapedAttributes[f];
f==this.idAttribute&&delete this.id;
this._changed=!0;
e.silent||(this.trigger("change:"+f,this,void 0,e),this.change(e));
return this
},clear:function(f){f||(f={});
var e,h=this.attributes,g={};
for(e in h){g[e]=void 0
}if(!f.silent&&this.validate&&!this._performValidation(g,f)){return !1
}this.attributes={};
this._escapedAttributes={};
this._changed=!0;
if(!f.silent){for(e in h){this.trigger("change:"+e,this,void 0,f)
}this.change(f)
}return this
},fetch:function(f){f||(f={});
var e=this,g=f.success;
f.success=function(j,i,h){if(!e.set(e.parse(j,h),f)){return !1
}g&&g(e,j)
};
f.error=H(f.error,e,f);
return(this.sync||L.sync).call(this,"read",this,f)
},save:function(g,e){e||(e={});
if(g&&!this.set(g,e)){return !1
}var j=this,i=e.success;
e.success=function(k,m,l){if(!j.set(j.parse(k,l),e)){return !1
}i&&i(j,k,l)
};
e.error=H(e.error,j,e);
var h=this.isNew()?"create":"update";
return(this.sync||L.sync).call(this,h,this,e)
},destroy:function(f){f||(f={});
if(this.isNew()){return this.trigger("destroy",this,this.collection,f)
}var e=this,g=f.success;
f.success=function(h){e.trigger("destroy",e,e.collection,f);
g&&g(e,h)
};
f.error=H(f.error,e,f);
return(this.sync||L.sync).call(this,"delete",this,f)
},url:function(){var e=F(this.collection)||this.urlRoot||E();
if(this.isNew()){return e
}return e+(e.charAt(e.length-1)=="/"?"":"/")+encodeURIComponent(this.id)
},parse:function(e){return e
},clone:function(){return new this.constructor(this)
},isNew:function(){return this.id==null
},change:function(e){this.trigger("change",this,e);
this._previousAttributes=K.clone(this.attributes);
this._changed=!1
},hasChanged:function(e){if(e){return this._previousAttributes[e]!=this.attributes[e]
}return this._changed
},changedAttributes:function(f){f||(f=this.attributes);
var e=this._previousAttributes,h=!1,g;
for(g in f){K.isEqual(e[g],f[g])||(h=h||{},h[g]=f[g])
}return h
},previous:function(e){if(!e||!this._previousAttributes){return null
}return this._previousAttributes[e]
},previousAttributes:function(){return K.clone(this._previousAttributes)
},_performValidation:function(f,e){var g=this.validate(f);
if(g){return e.error?e.error(this,g,e):this.trigger("error",this,g,e),!1
}return !0
}});
L.Collection=function(f,e){e||(e={});
if(e.comparator){this.comparator=e.comparator
}K.bindAll(this,"_onModelEvent","_removeReference");
this._reset();
f&&this.reset(f,{silent:!0});
this.initialize.apply(this,arguments)
};
K.extend(L.Collection.prototype,L.Events,{model:L.Model,initialize:function(){},toJSON:function(){return this.map(function(e){return e.toJSON()
})
},add:function(f,e){if(K.isArray(f)){for(var h=0,g=f.length;
h<g;
h++){this._add(f[h],e)
}}else{this._add(f,e)
}return this
},remove:function(f,e){if(K.isArray(f)){for(var h=0,g=f.length;
h<g;
h++){this._remove(f[h],e)
}}else{this._remove(f,e)
}return this
},get:function(e){if(e==null){return null
}return this._byId[e.id!=null?e.id:e]
},getByCid:function(e){return e&&this._byCid[e.cid||e]
},at:function(e){return this.models[e]
},sort:function(e){e||(e={});
if(!this.comparator){throw Error("Cannot sort a set without a comparator")
}this.models=this.sortBy(this.comparator);
e.silent||this.trigger("reset",this,e);
return this
},pluck:function(e){return K.map(this.models,function(f){return f.get(e)
})
},reset:function(f,e){f||(f=[]);
e||(e={});
this.each(this._removeReference);
this._reset();
this.add(f,{silent:!0});
e.silent||this.trigger("reset",this,e);
return this
},fetch:function(f){f||(f={});
var e=this,g=f.success;
f.success=function(j,h,i){e[f.add?"add":"reset"](e.parse(j,i),f);
g&&g(e,j)
};
f.error=H(f.error,e,f);
return(this.sync||L.sync).call(this,"read",this,f)
},create:function(f,e){var h=this;
e||(e={});
f=this._prepareModel(f,e);
if(!f){return !1
}var g=e.success;
e.success=function(i,k,j){h.add(i,e);
g&&g(i,k,j)
};
f.save(null,e);
return f
},parse:function(e){return e
},chain:function(){return K(this.models).chain()
},_reset:function(){this.length=0;
this.models=[];
this._byId={};
this._byCid={}
},_prepareModel:function(f,e){if(f instanceof L.Model){if(!f.collection){f.collection=this
}}else{var g=f;
f=new this.model(g,{collection:this});
f.validate&&!f._performValidation(g,e)&&(f=!1)
}return f
},_add:function(f,e){e||(e={});
f=this._prepareModel(f,e);
if(!f){return !1
}var g=this.getByCid(f);
if(g){throw Error(["Can't add the same model to a set twice",g.id])
}this._byId[f.id]=f;
this._byCid[f.cid]=f;
this.models.splice(e.at!=null?e.at:this.comparator?this.sortedIndex(f,this.comparator):this.length,0,f);
f.bind("all",this._onModelEvent);
this.length++;
e.silent||f.trigger("add",f,this,e);
return f
},_remove:function(f,e){e||(e={});
f=this.getByCid(f)||this.get(f);
if(!f){return null
}delete this._byId[f.id];
delete this._byCid[f.cid];
this.models.splice(this.indexOf(f),1);
this.length--;
e.silent||f.trigger("remove",f,this,e);
this._removeReference(f);
return f
},_removeReference:function(e){this==e.collection&&delete e.collection;
e.unbind("all",this._onModelEvent)
},_onModelEvent:function(f,e,h,g){(f=="add"||f=="remove")&&h!=this||(f=="destroy"&&this._remove(e,g),e&&f==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],this._byId[e.id]=e),this.trigger.apply(this,arguments))
}});
K.each(["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","rest","last","without","indexOf","lastIndexOf","isEmpty","groupBy"],function(e){L.Collection.prototype[e]=function(){return K[e].apply(K,[this.models].concat(K.toArray(arguments)))
}
});
L.Router=function(e){e||(e={});
if(e.routes){this.routes=e.routes
}this._bindRoutes();
this.initialize.apply(this,arguments)
};
var z=/:([\w\d]+)/g,y=/\*([\w\d]+)/g,x=/[-[\]{}()+?.,\\^$|#\s]/g;
K.extend(L.Router.prototype,L.Events,{initialize:function(){},route:function(f,e,g){L.history||(L.history=new L.History);
K.isRegExp(f)||(f=this._routeToRegExp(f));
L.history.route(f,K.bind(function(h){h=this._extractParameters(f,h);
g.apply(this,h);
this.trigger.apply(this,["route:"+e].concat(h))
},this))
},navigate:function(f,e){L.history.navigate(f,e)
},_bindRoutes:function(){if(this.routes){var f=[],e;
for(e in this.routes){f.unshift([e,this.routes[e]])
}e=0;
for(var g=f.length;
e<g;
e++){this.route(f[e][0],f[e][1],this[f[e][1]])
}}},_routeToRegExp:function(e){e=e.replace(x,"\\$&").replace(z,"([^/]*)").replace(y,"(.*?)");
return RegExp("^"+e+"$")
},_extractParameters:function(f,e){return f.exec(e).slice(1)
}});
L.History=function(){this.handlers=[];
K.bindAll(this,"checkUrl")
};
var G=/^#*/,d=/msie [\w.]+/,D=!1;
K.extend(L.History.prototype,{interval:50,getFragment:function(f,e){if(f==null){if(this._hasPushState||e){f=window.location.pathname;
var g=window.location.search;
g&&(f+=g);
f.indexOf(this.options.root)==0&&(f=f.substr(this.options.root.length))
}else{f=window.location.hash
}}return decodeURIComponent(f.replace(G,""))
},start:function(f){if(D){throw Error("Backbone.history has already been started")
}this.options=K.extend({},{root:"/"},this.options,f);
this._wantsPushState=!!this.options.pushState;
this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);
f=this.getFragment();
var e=document.documentMode;
if(e=d.exec(navigator.userAgent.toLowerCase())&&(!e||e<=7)){this.iframe=J('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(f)
}this._hasPushState?J(window).bind("popstate",this.checkUrl):"onhashchange" in window&&!e?J(window).bind("hashchange",this.checkUrl):setInterval(this.checkUrl,this.interval);
this.fragment=f;
D=!0;
f=window.location;
e=f.pathname==this.options.root;
if(this._wantsPushState&&!this._hasPushState&&!e){return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0
}else{if(this._wantsPushState&&this._hasPushState&&e&&f.hash){this.fragment=f.hash.replace(G,""),window.history.replaceState({},document.title,f.protocol+"//"+f.host+this.options.root+this.fragment)
}}if(!this.options.silent){return this.loadUrl()
}},route:function(f,e){this.handlers.unshift({route:f,callback:e})
},checkUrl:function(){var e=this.getFragment();
e==this.fragment&&this.iframe&&(e=this.getFragment(this.iframe.location.hash));
if(e==this.fragment||e==decodeURIComponent(this.fragment)){return !1
}this.iframe&&this.navigate(e);
this.loadUrl()||this.loadUrl(window.location.hash)
},loadUrl:function(f){var e=this.fragment=this.getFragment(f);
return K.any(this.handlers,function(g){if(g.route.test(e)){return g.callback(e),!0
}})
},navigate:function(f,e){var h=(f||"").replace(G,"");
if(!(this.fragment==h||this.fragment==decodeURIComponent(h))){if(this._hasPushState){var g=window.location;
h.indexOf(this.options.root)!=0&&(h=this.options.root+h);
this.fragment=h;
window.history.pushState({},document.title,g.protocol+"//"+g.host+h)
}else{if(window.location.hash=this.fragment=h,this.iframe&&h!=this.getFragment(this.iframe.location.hash)){this.iframe.document.open().close(),this.iframe.location.hash=h
}}e&&this.loadUrl(f)
}}});
L.View=function(e){this.cid=K.uniqueId("view");
this._configure(e||{});
this._ensureElement();
this.delegateEvents();
this.initialize.apply(this,arguments)
};
var c=/^(\S+)\s*(.*)$/,C=["model","collection","el","id","attributes","className","tagName"];
K.extend(L.View.prototype,L.Events,{tagName:"div",$:function(e){return J(e,this.el)
},initialize:function(){},render:function(){return this
},remove:function(){J(this.el).remove();
return this
},make:function(f,e,g){f=document.createElement(f);
e&&J(f).attr(e);
g&&J(f).html(g);
return f
},delegateEvents:function(g){if(g||(g=this.events)){for(var f in K.isFunction(g)&&(g=g.call(this)),J(this.el).unbind(".delegateEvents"+this.cid),g){var j=this[g[f]];
if(!j){throw Error('Event "'+g[f]+'" does not exist')
}var i=f.match(c),h=i[1];
i=i[2];
j=K.bind(j,this);
h+=".delegateEvents"+this.cid;
i===""?J(this.el).bind(h,j):J(this.el).delegate(i,h,j)
}}},_configure:function(f){this.options&&(f=K.extend({},this.options,f));
for(var e=0,h=C.length;
e<h;
e++){var g=C[e];
f[g]&&(this[g]=f[g])
}this.options=f
},_ensureElement:function(){if(this.el){if(K.isString(this.el)){this.el=J(this.el).get(0)
}}else{var e=this.attributes||{};
if(this.id){e.id=this.id
}if(this.className){e["class"]=this.className
}this.el=this.make(this.tagName,e)
}}});
L.Model.extend=L.Collection.extend=L.Router.extend=L.View.extend=function(f,e){var g=b(this,f,e);
g.extend=this.extend;
return g
};
var a={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};
L.sync=function(f,e,h){var g=a[f];
h=K.extend({type:g,dataType:"json"},h);
if(!h.url){h.url=F(e)||E()
}if(!h.data&&e&&(f=="create"||f=="update")){h.contentType="application/json",h.data=JSON.stringify(e.toJSON())
}if(L.emulateJSON){h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}
}if(L.emulateHTTP&&(g==="PUT"||g==="DELETE")){if(L.emulateJSON){h.data._method=g
}h.type="POST";
h.beforeSend=function(i){i.setRequestHeader("X-HTTP-Method-Override",g)
}
}if(h.type!=="GET"&&!L.emulateJSON){h.processData=!1
}return J.ajax(h)
};
var B=function(){},b=function(f,e,h){var g;
g=e&&e.hasOwnProperty("constructor")?e.constructor:function(){return f.apply(this,arguments)
};
K.extend(g,f);
B.prototype=f.prototype;
g.prototype=new B;
e&&K.extend(g.prototype,e);
h&&K.extend(g,h);
g.prototype.constructor=g;
g.__super__=f.prototype;
return g
},F=function(e){if(!e||!e.url){return null
}return K.isFunction(e.url)?e.url():e.url
},E=function(){throw Error('A "url" property or function must be specified')
},H=function(f,e,g){return function(h){f?f(e,h,g):e.trigger("error",e,h,g)
}
}
}).call(this);
var COMMONCssInclude=function(){var a=[];
return{init:function(){},loadCss:function(b){if(b.length>0&&$.inArray(b,a)<0){a.push(b);
$("<link>").appendTo("head").attr({rel:"stylesheet",type:"text/css",href:b})
}}}
}();
var COMMONTestUtilities=function(){var a=false;
return{init:function(){},pageReady:function(){return a
},setPageReady:function(b){a=b
}}
}();
var COMMONAjaxUtilities=function(){var b=0,a=0;
var c=function(){COMMONTestUtilities.setPageReady(false)
};
var d=function(){if(a===0){COMMONTestUtilities.setPageReady(true)
}};
return{init:function(){},doAjax:function(f){var e=(f.dataType!==undefined)?f.dataType:"html";
if(b===0){c()
}b+=1;
$.ajax({type:f.type,url:f.url,data:f.data,dataType:e,success:function(g){if(typeof f.success==="function"){a+=1;
f.success(g);
a-=1;
b-=1;
if(b===0){d()
}}},error:function(g){if(typeof f.error==="function"){a+=1;
f.error(g);
a-=1;
b-=1;
if(b===0){d()
}}},statusCode:function(g){if(typeof f.statusCode==="function"){a+=1;
f.statusCode(g);
a-=1;
b-=1;
if(b===0){d()
}}}})
},doJSON:function(){var e,f={},g;
e=arguments[0];
if(typeof arguments[1]==="function"){g=arguments[1]
}else{f=arguments[1];
if(typeof arguments[2]==="function"){g=arguments[2]
}}if(b===0){c()
}b+=1;
$.getJSON(e,f,function(j,h,i){if(typeof g==="function"){a+=1;
g(j,h,i);
a-=1;
b-=1;
if(b===0){d()
}}})
},enableAjaxDropdownProgress:function(e){$("#"+e).after('<img class="throbber" src="/etc/designs/ac/img/ajax-loader-small.gif" style="position:relative; top:5px; left: 5px;"/>')
},disableAjaxDropdownProgress:function(){$(".throbber").remove()
},enableAjaxButtonProgress:function(e){$("#"+e).addClass("ajaxDisabled throbberButton");
$("#"+e).append('<img class="throbber" src="/etc/designs/ac/img/ajax-loader-small-disabledButton.gif" style="position:relative; right: 45%; top: 3px; margin: 0px; padding: 0px;" />')
},disableAjaxButtonProgress:function(){$(".throbberButton").removeClass("ajaxDisabled throbberButton");
$(".throbber").remove()
}}
}();
/**
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){"use strict",a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=c,this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(b){return b||(this.paused=!1),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},to:function(b){var c=this.$element.find(".active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(a){return a||(this.paused=!0),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this,j=a.Event("slide");this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h]();if(e.hasClass("active"))return;if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=a.extend({},a.fn.carousel.defaults,typeof c=="object"&&c);e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):typeof c=="string"||(c=f.slide)?e[c]():f.interval&&e.cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b,c,d,e;if(this.transitioning)return;b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find("> .accordion-group > .in");if(d&&d.length){e=d.data("collapse");if(e&&e.transitioning)return;d.collapse("hide"),e||d.data("collapse",null)}this.$element[b](0),this.transition("addClass",a.Event("show"),"shown"),this.$element[b](this.$element[0][c])},hide:function(){var b;if(this.transitioning)return;b=this.dimension(),this.reset(this.$element[b]()),this.transition("removeClass",a.Event("hide"),"hidden"),this.$element[b](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a!==null?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c.type=="show"&&e.reset(),e.transitioning=0,e.$element.trigger(d)};this.$element.trigger(c);if(c.isDefaultPrevented())return;this.transitioning=1,this.$element[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();a(e).collapse(f)})})}(window.jQuery),!function(a){function d(){a(b).parent().removeClass("open")}"use strict";var b='[data-toggle="dropdown"]',c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),e,f,g;if(c.is(".disabled, :disabled"))return;return f=c.attr("data-target"),f||(f=c.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,"")),e=a(f),e.length||(e=c.parent()),g=e.hasClass("open"),d(),g||e.toggleClass("open"),!1}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api",d),a("body").on("click.dropdown",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api",b,c.prototype.toggle)})}(window.jQuery),!function(a){function c(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),d.call(b)},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),d.call(b)})}function d(a){this.$element.hide().trigger("hidden"),e.call(this)}function e(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(f,this)):f.call(this)):b&&b()}function f(){this.$backdrop.remove(),this.$backdrop=null}function g(){var b=this;this.isShown&&this.options.keyboard?a(document).on("keyup.dismiss.modal",function(a){a.which==27&&b.hide()}):this.isShown||a(document).off("keyup.dismiss.modal")}"use strict";var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this))};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this,c=a.Event("show");this.$element.trigger(c);if(this.isShown||c.isDefaultPrevented())return;a("body").addClass("modal-open"),this.isShown=!0,g.call(this),e.call(this,function(){var c=a.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in"),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();var e=this;b=a.Event("hide"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,a("body").removeClass("modal-open"),g.call(this),this.$element.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?c.call(this):d.call(this)}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,d.data(),typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({},e.data(),c.data());b.preventDefault(),e.modal(f)})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show)return c.show();clearTimeout(this.timeout),c.hoverState="in",this.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.hide)return c.hide();clearTimeout(this.timeout),c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},isHTML:function(a){return typeof a!="string"||a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3||/^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(a)},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.isHTML(b)?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.isHTML(b)?"html":"text"](b),a.find(".popover-content > *")[this.isHTML(c)?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body"),this.refresh(),this.process()}"use strict",b.prototype={constructor:b,refresh:function(){var b=this,c;this.offsets=a([]),this.targets=a([]),c=this.$body.find(this.selector).map(function(){var b=a(this),c=b.data("target")||b.attr("href"),d=/^#\w/.test(c)&&a(c);return d&&c.length&&[[d.position().top,c]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},activate:function(b){var c,d;this.activeTarget=b,a(this.selector).parent(".active").removeClass("active"),d=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',c=a(d).parent("li").addClass("active"),c.parent(".dropdown-menu")&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(),this.hide()},updater:function(a){return a},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c=this,d,e;return this.query=this.$element.val(),this.query?(d=a.grep(this.source,function(a){return c.matcher(a)}),d=this.sorter(d),d.length?this.render(d.slice(0,this.options.items)).show():this.shown?this.hide():this):this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(new RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keypress,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},keypress:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:if(a.type!="keydown")break;a.preventDefault(),this.prev();break;case 40:if(a.type!="keydown")break;a.preventDefault(),this.next()}a.stopPropagation()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);
