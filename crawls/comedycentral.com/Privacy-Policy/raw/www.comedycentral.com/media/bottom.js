/* jquery.tools.min.js */
/*
 * jQuery Tools 1.2.5 - The missing UI library for the Web
 * 
 * [toolbox.flashembed, toolbox.history, toolbox.expose, toolbox.mousewheel, tabs, tabs.slideshow, tooltip, tooltip.slide, tooltip.dynamic, scrollable, scrollable.autoscroll, scrollable.navigator, overlay, overlay.apple, dateinput, rangeinput, validator]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 * File generated: Wed Sep 22 06:12:53 GMT 2010
 */
(function(){function f(a,b){if(b)for(var c in b)if(b.hasOwnProperty(c))a[c]=b[c];return a}function l(a,b){var c=[];for(var d in a)if(a.hasOwnProperty(d))c[d]=b(a[d]);return c}function m(a,b,c){if(e.isSupported(b.version))a.innerHTML=e.getHTML(b,c);else if(b.expressInstall&&e.isSupported([6,65]))a.innerHTML=e.getHTML(f(b,{src:b.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title});else{if(!a.innerHTML.replace(/\s/g,"")){a.innerHTML="<h2>Flash version "+b.version+
" or greater is required</h2><h3>"+(g[0]>0?"Your version is "+g:"You have no flash plugin installed")+"</h3>"+(a.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+k+"'>here</a></p>");if(a.tagName=="A")a.onclick=function(){location.href=k}}if(b.onFail){var d=b.onFail.call(this);if(typeof d=="string")a.innerHTML=d}}if(i)window[b.id]=document.getElementById(b.id);f(this,{getRoot:function(){return a},getOptions:function(){return b},getConf:function(){return c},
getApi:function(){return a.firstChild}})}var i=document.all,k="http://www.adobe.com/go/getflashplayer",n=typeof jQuery=="function",o=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,j={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}});
window.flashembed=function(a,b,c){if(typeof a=="string")a=document.getElementById(a.replace("#",""));if(a){if(typeof b=="string")b={src:b};return new m(a,f(f({},j),b),c)}};var e=f(window.flashembed,{conf:j,getVersion:function(){var a,b;try{b=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(c){try{b=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"))&&a.GetVariable("$version")}catch(d){try{b=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"))&&a.GetVariable("$version")}catch(h){}}}return(b=
o.exec(b))?[b[1],b[3]]:[0,0]},asString:function(a){if(a===null||a===undefined)return null;var b=typeof a;if(b=="object"&&a.push)b="array";switch(b){case "string":a=a.replace(new RegExp('(["\\\\])',"g"),"\\$1");a=a.replace(/^\s?(\d+\.?\d+)%/,"$1pct");return'"'+a+'"';case "array":return"["+l(a,function(d){return e.asString(d)}).join(",")+"]";case "function":return'"function()"';case "object":b=[];for(var c in a)a.hasOwnProperty(c)&&b.push('"'+c+'":'+e.asString(a[c]));return"{"+b.join(",")+"}"}return String(a).replace(/\s/g,
" ").replace(/\'/g,'"')},getHTML:function(a,b){a=f({},a);var c='<object width="'+a.width+'" height="'+a.height+'" id="'+a.id+'" name="'+a.id+'"';if(a.cachebusting)a.src+=(a.src.indexOf("?")!=-1?"&":"?")+Math.random();c+=a.w3c||!i?' data="'+a.src+'" type="application/x-shockwave-flash"':' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';c+=">";if(a.w3c||i)c+='<param name="movie" value="'+a.src+'" />';a.width=a.height=a.id=a.w3c=a.src=null;a.onFail=a.version=a.expressInstall=null;for(var d in a)if(a[d])c+=
'<param name="'+d+'" value="'+a[d]+'" />';a="";if(b){for(var h in b)if(b[h]){d=b[h];a+=h+"="+(/function|object/.test(typeof d)?e.asString(d):d)+"&"}a=a.slice(0,-1);c+='<param name="flashvars" value=\''+a+"' />"}c+="</object>";return c},isSupported:function(a){return g[0]>a[0]||g[0]==a[0]&&g[1]>=a[1]}}),g=e.getVersion();if(n){jQuery.tools=jQuery.tools||{version:"1.2.5"};jQuery.tools.flashembed={conf:j};jQuery.fn.flashembed=function(a,b){return this.each(function(){$(this).data("flashembed",flashembed(this,
a,b))})}}})();
(function(b){function h(c){if(c){var a=d.contentWindow.document;a.open().close();a.location.hash=c}}var g,d,f,i;b.tools=b.tools||{version:"1.2.5"};b.tools.history={init:function(c){if(!i){if(b.browser.msie&&b.browser.version<"8"){if(!d){d=b("<iframe/>").attr("src","javascript:false;").hide().get(0);b("body").append(d);setInterval(function(){var a=d.contentWindow.document;a=a.location.hash;g!==a&&b.event.trigger("hash",a)},100);h(location.hash||"#")}}else setInterval(function(){var a=location.hash;
a!==g&&b.event.trigger("hash",a)},100);f=!f?c:f.add(c);c.click(function(a){var e=b(this).attr("href");d&&h(e);if(e.slice(0,1)!="#"){location.href="#"+e;return a.preventDefault()}});i=true}}};b(window).bind("hash",function(c,a){a?f.filter(function(){var e=b(this).attr("href");return e==a||e==a.replace("#","")}).trigger("history",[a]):f.eq(0).trigger("history",[a]);g=a});b.fn.history=function(c){b.tools.history.init(this);return this.bind("history",c)}})(jQuery);
(function(b){function k(){if(b.browser.msie){var a=b(document).height(),d=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a-d<20?d:a]}return[b(document).width(),b(document).height()]}function h(a){if(a)return a.call(b.mask)}b.tools=b.tools||{version:"1.2.5"};var l;l=b.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var c,i,e,g,j;b.mask={load:function(a,d){if(e)return this;if(typeof a=="string")a={color:a};a=a||g;g=a=b.extend(b.extend({},l.conf),a);c=b("#"+a.maskId);if(!c.length){c=b("<div/>").attr("id",a.maskId);b("body").append(c)}var m=k();c.css({position:"absolute",top:0,left:0,width:m[0],height:m[1],display:"none",opacity:a.startOpacity,zIndex:a.zIndex});a.color&&c.css("backgroundColor",a.color);if(h(a.onBeforeLoad)===false)return this;a.closeOnEsc&&b(document).bind("keydown.mask",function(f){f.keyCode==
27&&b.mask.close(f)});a.closeOnClick&&c.bind("click.mask",function(f){b.mask.close(f)});b(window).bind("resize.mask",function(){b.mask.fit()});if(d&&d.length){j=d.eq(0).css("zIndex");b.each(d,function(){var f=b(this);/relative|absolute|fixed/i.test(f.css("position"))||f.css("position","relative")});i=d.css({zIndex:Math.max(a.zIndex+1,j=="auto"?0:j)})}c.css({display:"block"}).fadeTo(a.loadSpeed,a.opacity,function(){b.mask.fit();h(a.onLoad);e="full"});e=true;return this},close:function(){if(e){if(h(g.onBeforeClose)===
false)return this;c.fadeOut(g.closeSpeed,function(){h(g.onClose);i&&i.css({zIndex:j});e=false});b(document).unbind("keydown.mask");c.unbind("click.mask");b(window).unbind("resize.mask")}return this},fit:function(){if(e){var a=k();c.css({width:a[0],height:a[1]})}},getMask:function(){return c},isLoaded:function(a){return a?e=="full":e},getConf:function(){return g},getExposed:function(){return i}};b.fn.mask=function(a){b.mask.load(a);return this};b.fn.expose=function(a){b.mask.load(a,this);return this}})(jQuery);
(function(b){function c(a){switch(a.type){case "mousemove":return b.extend(a.data,{clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY});case "DOMMouseScroll":b.extend(a,a.data);a.delta=-a.detail/3;break;case "mousewheel":a.delta=a.wheelDelta/120;break}a.type="wheel";return b.event.handle.call(this,a,a.delta)}b.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)};b.event.special.wheel={setup:function(){b.event.add(this,d,c,{})},teardown:function(){b.event.remove(this,
d,c)}};var d=!b.browser.mozilla?"mousewheel":"DOMMouseScroll"+(b.browser.version<"1.9"?" mousemove":"")})(jQuery);
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs=="a"&&d.find("[href="+location.hash+"]").length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.5"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);
(function(c){function p(g,a){function m(f){var e=c(f);return e.length<2?e:g.parent().find(f)}var b=this,i=g.add(this),d=g.data("tabs"),h,j=true,n=m(a.next).click(function(){d.next()}),k=m(a.prev).click(function(){d.prev()});c.extend(b,{getTabs:function(){return d},getConf:function(){return a},play:function(){if(h)return b;var f=c.Event("onBeforePlay");i.trigger(f);if(f.isDefaultPrevented())return b;h=setInterval(d.next,a.interval);j=false;i.trigger("onPlay");return b},pause:function(){if(!h)return b;
var f=c.Event("onBeforePause");i.trigger(f);if(f.isDefaultPrevented())return b;h=clearInterval(h);i.trigger("onPause");return b},stop:function(){b.pause();j=true}});c.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(f,e){c.isFunction(a[e])&&c(b).bind(e,a[e]);b[e]=function(q){return c(b).bind(e,q)}});a.autopause&&d.getTabs().add(n).add(k).add(d.getPanes()).hover(b.pause,function(){j||b.play()});a.autoplay&&b.play();a.clickable&&d.getPanes().click(function(){d.next()});if(!d.getConf().rotate){var l=
a.disabledClass;d.getIndex()||k.addClass(l);d.onBeforeClick(function(f,e){k.toggleClass(l,!e);n.toggleClass(l,e==d.getTabs().length-1)})}}var o;o=c.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:false,autopause:true,interval:3E3,clickable:true,api:false}};c.fn.slideshow=function(g){var a=this.data("slideshow");if(a)return a;g=c.extend({},o.conf,g);this.each(function(){a=new p(c(this),g);c(this).data("slideshow",a)});return g.api?a:this}})(jQuery);
(function(f){function p(a,b,c){var h=c.relative?a.position().top:a.offset().top,d=c.relative?a.position().left:a.offset().left,i=c.position[0];h-=b.outerHeight()-c.offset[0];d+=a.outerWidth()+c.offset[1];if(/iPad/i.test(navigator.userAgent))h-=f(window).scrollTop();var j=b.outerHeight()+a.outerHeight();if(i=="center")h+=j/2;if(i=="bottom")h+=j;i=c.position[1];a=b.outerWidth()+a.outerWidth();if(i=="center")d-=a/2;if(i=="left")d-=a;return{top:h,left:d}}function u(a,b){var c=this,h=a.add(c),d,i=0,j=
0,m=a.attr("title"),q=a.attr("data-tooltip"),r=o[b.effect],l,s=a.is(":input"),v=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),k=b.events[t]||b.events[s?v?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';k=k.split(/,\s*/);if(k.length!=2)throw"Tooltip: bad events configuration for "+t;a.bind(k[0],function(e){clearTimeout(i);if(b.predelay)j=setTimeout(function(){c.show(e)},b.predelay);else c.show(e)}).bind(k[1],function(e){clearTimeout(j);if(b.delay)i=
setTimeout(function(){c.hide(e)},b.delay);else c.hide(e)});if(m&&b.cancelDefault){a.removeAttr("title");a.data("title",m)}f.extend(c,{show:function(e){if(!d){if(q)d=f(q);else if(b.tip)d=f(b.tip).eq(0);else if(m)d=f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else{d=a.next();d.length||(d=a.parent().next())}if(!d.length)throw"Cannot find tooltip for "+a;}if(c.isShown())return c;d.stop(true,true);var g=p(a,d,b);b.tip&&d.html(a.data("title"));e=e||f.Event();e.type="onBeforeShow";
h.trigger(e,[g]);if(e.isDefaultPrevented())return c;g=p(a,d,b);d.css({position:"absolute",top:g.top,left:g.left});l=true;r[0].call(c,function(){e.type="onShow";l="full";h.trigger(e)});g=b.events.tooltip.split(/,\s*/);if(!d.data("__set")){d.bind(g[0],function(){clearTimeout(i);clearTimeout(j)});g[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&d.bind(g[1],function(n){n.relatedTarget!=a[0]&&a.trigger(k[1].split(" ")[0])});d.data("__set",true)}return c},hide:function(e){if(!d||!c.isShown())return c;
e=e||f.Event();e.type="onBeforeHide";h.trigger(e);if(!e.isDefaultPrevented()){l=false;o[b.effect][1].call(c,function(){e.type="onHide";h.trigger(e)});return c}},isShown:function(e){return e?l=="full":l},getConf:function(){return b},getTip:function(){return d},getTrigger:function(){return a}});f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(e,g){f.isFunction(b[g])&&f(c).bind(g,b[g]);c[g]=function(n){n&&f(c).bind(g,n);return c}})}f.tools=f.tools||{version:"1.2.5"};f.tools.tooltip=
{conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,c){o[a]=[b,c]}};var o={toggle:[function(a){var b=this.getConf(),c=this.getTip();b=b.opacity;b<1&&c.css({opacity:b});c.show();a.call()},function(a){this.getTip().hide();
a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,a)}]};f.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=f.extend(true,{},f.tools.tooltip.conf,a);if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){b=new u(f(this),a);f(this).data("tooltip",b)});return a.api?b:this}})(jQuery);
(function(d){var i=d.tools.tooltip;d.extend(i.conf,{direction:"up",bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!d.browser.msie});var e={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};i.addEffect("slide",function(g){var a=this.getConf(),f=this.getTip(),b=a.slideFade?{opacity:a.opacity}:{},c=e[a.direction]||e.up;b[c[1]]=c[0]+"="+a.slideOffset;a.slideFade&&f.css({opacity:0});f.show().animate(b,a.slideInSpeed,g)},function(g){var a=this.getConf(),f=a.slideOffset,
b=a.slideFade?{opacity:0}:{},c=e[a.direction]||e.up,h=""+c[0];if(a.bounce)h=h=="+"?"-":"+";b[c[1]]=h+"="+f;this.getTip().animate(b,a.slideOutSpeed,function(){d(this).hide();g.call()})})})(jQuery);
(function(g){function j(a){var c=g(window),d=c.width()+c.scrollLeft(),h=c.height()+c.scrollTop();return[a.offset().top<=c.scrollTop(),d<=a.offset().left+a.width(),h<=a.offset().top+a.height(),c.scrollLeft()>=a.offset().left]}function k(a){for(var c=a.length;c--;)if(a[c])return false;return true}var i=g.tools.tooltip;i.dynamic={conf:{classNames:"top right bottom left"}};g.fn.dynamic=function(a){if(typeof a=="number")a={speed:a};a=g.extend({},i.dynamic.conf,a);var c=a.classNames.split(/\s/),d;this.each(function(){var h=
g(this).tooltip().onBeforeShow(function(e,f){e=this.getTip();var b=this.getConf();d||(d=[b.position[0],b.position[1],b.offset[0],b.offset[1],g.extend({},b)]);g.extend(b,d[4]);b.position=[d[0],d[1]];b.offset=[d[2],d[3]];e.css({visibility:"hidden",position:"absolute",top:f.top,left:f.left}).show();f=j(e);if(!k(f)){if(f[2]){g.extend(b,a.top);b.position[0]="top";e.addClass(c[0])}if(f[3]){g.extend(b,a.right);b.position[1]="right";e.addClass(c[1])}if(f[0]){g.extend(b,a.bottom);b.position[0]="bottom";e.addClass(c[2])}if(f[1]){g.extend(b,
a.left);b.position[1]="left";e.addClass(c[3])}if(f[0]||f[2])b.offset[0]*=-1;if(f[1]||f[3])b.offset[1]*=-1}e.css({visibility:"visible"}).hide()});h.onBeforeShow(function(){var e=this.getConf();this.getTip();setTimeout(function(){e.position=[d[0],d[1]];e.offset=[d[2],d[3]]},0)});h.onHide(function(){var e=this.getTip();e.removeClass(a.classNames)});ret=h});return a.api?ret:this}})(jQuery);
(function(e){function p(f,c){var b=e(c);return b.length<2?b:f.parent().find(c)}function u(f,c){var b=this,n=f.add(b),g=f.children(),l=0,j=c.vertical;k||(k=b);if(g.length>1)g=e(c.items,f);e.extend(b,{getConf:function(){return c},getIndex:function(){return l},getSize:function(){return b.getItems().size()},getNaviButtons:function(){return o.add(q)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(a,d){return b.seekTo(l+
a,d)},next:function(a){return b.move(1,a)},prev:function(a){return b.move(-1,a)},begin:function(a){return b.seekTo(0,a)},end:function(a){return b.seekTo(b.getSize()-1,a)},focus:function(){return k=b},addItem:function(a){a=e(a);if(c.circular){g.children("."+c.clonedClass+":last").before(a);g.children("."+c.clonedClass+":first").replaceWith(a.clone().addClass(c.clonedClass))}else g.append(a);n.trigger("onAddItem",[a]);return b},seekTo:function(a,d,h){a.jquery||(a*=1);if(c.circular&&a===0&&l==-1&&d!==
0)return b;if(!c.circular&&a<0||a>b.getSize()||a<-1)return b;var i=a;if(a.jquery)a=b.getItems().index(a);else i=b.getItems().eq(a);var r=e.Event("onBeforeSeek");if(!h){n.trigger(r,[a,d]);if(r.isDefaultPrevented()||!i.length)return b}i=j?{top:-i.position().top}:{left:-i.position().left};l=a;k=b;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){n.trigger("onSeek",[a])});return b}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(a,d){e.isFunction(c[d])&&e(b).bind(d,c[d]);b[d]=function(h){h&&
e(b).bind(d,h);return b}});if(c.circular){var s=b.getItems().slice(-1).clone().prependTo(g),t=b.getItems().eq(1).clone().appendTo(g);s.add(t).addClass(c.clonedClass);b.onBeforeSeek(function(a,d,h){if(!a.isDefaultPrevented())if(d==-1){b.seekTo(s,h,function(){b.end(0)});return a.preventDefault()}else d==b.getSize()&&b.seekTo(t,h,function(){b.begin(0)})});b.seekTo(0,0,function(){})}var o=p(f,c.prev).click(function(){b.prev()}),q=p(f,c.next).click(function(){b.next()});if(!c.circular&&b.getSize()>1){b.onBeforeSeek(function(a,
d){setTimeout(function(){if(!a.isDefaultPrevented()){o.toggleClass(c.disabledClass,d<=0);q.toggleClass(c.disabledClass,d>=b.getSize()-1)}},1)});c.initialIndex||o.addClass(c.disabledClass)}c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(a,d){if(c.mousewheel){b.move(d<0?1:-1,c.wheelSpeed||50);return false}});if(c.touch){var m={};g[0].ontouchstart=function(a){a=a.touches[0];m.x=a.clientX;m.y=a.clientY};g[0].ontouchmove=function(a){if(a.touches.length==1&&!g.is(":animated")){var d=a.touches[0],h=
m.x-d.clientX;d=m.y-d.clientY;b[j&&d>0||!j&&h>0?"next":"prev"]();a.preventDefault()}}}c.keyboard&&e(document).bind("keydown.scrollable",function(a){if(!(!c.keyboard||a.altKey||a.ctrlKey||e(a.target).is(":input")))if(!(c.keyboard!="static"&&k!=b)){var d=a.keyCode;if(j&&(d==38||d==40)){b.move(d==38?-1:1);return a.preventDefault()}if(!j&&(d==37||d==39)){b.move(d==37?-1:1);return a.preventDefault()}}});c.initialIndex&&b.seekTo(c.initialIndex,0,function(){})}e.tools=e.tools||{version:"1.2.5"};e.tools.scrollable=
{conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,touch:true,wheelSpeed:0}};var k;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},e.tools.scrollable.conf,f);this.each(function(){c=new u(e(this),f);e(this).data("scrollable",c)});return f.api?c:this}})(jQuery);
(function(b){var f=b.tools.scrollable;f.autoscroll={conf:{autoplay:true,interval:3E3,autopause:true}};b.fn.autoscroll=function(c){if(typeof c=="number")c={interval:c};var d=b.extend({},f.autoscroll.conf,c),g;this.each(function(){var a=b(this).data("scrollable");if(a)g=a;var e,h=true;a.play=function(){if(!e){h=false;e=setInterval(function(){a.next()},d.interval)}};a.pause=function(){e=clearInterval(e)};a.stop=function(){a.pause();h=true};d.autopause&&a.getRoot().add(a.getNaviButtons()).hover(a.pause,
a.play);d.autoplay&&a.play()});return d.api?g:this}})(jQuery);
(function(d){function p(b,g){var h=d(g);return h.length<2?h:b.parent().find(g)}var m=d.tools.scrollable;m.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,idPrefix:null,history:false}};d.fn.navigator=function(b){if(typeof b=="string")b={navi:b};b=d.extend({},m.navigator.conf,b);var g;this.each(function(){function h(a,c,i){e.seekTo(c);if(j){if(location.hash)location.hash=a.attr("href").replace("#","")}else return i.preventDefault()}function f(){return k.find(b.naviItem||
"> *")}function n(a){var c=d("<"+(b.naviItem||"a")+"/>").click(function(i){h(d(this),a,i)}).attr("href","#"+a);a===0&&c.addClass(l);b.indexed&&c.text(a+1);b.idPrefix&&c.attr("id",b.idPrefix+a);return c.appendTo(k)}function o(a,c){a=f().eq(c.replace("#",""));a.length||(a=f().filter("[href="+c+"]"));a.click()}var e=d(this).data("scrollable"),k=b.navi.jquery?b.navi:p(e.getRoot(),b.navi),q=e.getNaviButtons(),l=b.activeClass,j=b.history&&d.fn.history;if(e)g=e;e.getNaviButtons=function(){return q.add(k)};
f().length?f().each(function(a){d(this).click(function(c){h(d(this),a,c)})}):d.each(e.getItems(),function(a){n(a)});e.onBeforeSeek(function(a,c){setTimeout(function(){if(!a.isDefaultPrevented()){var i=f().eq(c);!a.isDefaultPrevented()&&i.length&&f().removeClass(l).eq(c).addClass(l)}},1)});e.onAddItem(function(a,c){c=n(e.getItems().index(c));j&&c.history(o)});j&&f().history(o)});return b.api?g:this}})(jQuery);
(function(a){function t(d,b){var c=this,j=d.add(c),o=a(window),k,f,m,g=a.tools.expose&&(b.mask||b.expose),n=Math.random().toString().slice(10);if(g){if(typeof g=="string")g={color:g};g.closeOnClick=g.closeOnEsc=false}var p=b.target||d.attr("rel");f=p?a(p):d;if(!f.length)throw"Could not find Overlay: "+p;d&&d.index(f)==-1&&d.click(function(e){c.load(e);return e.preventDefault()});a.extend(c,{load:function(e){if(c.isOpened())return c;var h=q[b.effect];if(!h)throw'Overlay: cannot find effect : "'+b.effect+
'"';b.oneInstance&&a.each(s,function(){this.close(e)});e=e||a.Event();e.type="onBeforeLoad";j.trigger(e);if(e.isDefaultPrevented())return c;m=true;g&&a(f).expose(g);var i=b.top,r=b.left,u=f.outerWidth({margin:true}),v=f.outerHeight({margin:true});if(typeof i=="string")i=i=="center"?Math.max((o.height()-v)/2,0):parseInt(i,10)/100*o.height();if(r=="center")r=Math.max((o.width()-u)/2,0);h[0].call(c,{top:i,left:r},function(){if(m){e.type="onLoad";j.trigger(e)}});g&&b.closeOnClick&&a.mask.getMask().one("click",
c.close);b.closeOnClick&&a(document).bind("click."+n,function(l){a(l.target).parents(f).length||c.close(l)});b.closeOnEsc&&a(document).bind("keydown."+n,function(l){l.keyCode==27&&c.close(l)});return c},close:function(e){if(!c.isOpened())return c;e=e||a.Event();e.type="onBeforeClose";j.trigger(e);if(!e.isDefaultPrevented()){m=false;q[b.effect][1].call(c,function(){e.type="onClose";j.trigger(e)});a(document).unbind("click."+n).unbind("keydown."+n);g&&a.mask.close();return c}},getOverlay:function(){return f},
getTrigger:function(){return d},getClosers:function(){return k},isOpened:function(){return m},getConf:function(){return b}});a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(e,h){a.isFunction(b[h])&&a(c).bind(h,b[h]);c[h]=function(i){i&&a(c).bind(h,i);return c}});k=f.find(b.close||".close");if(!k.length&&!b.close){k=a('<a class="close"></a>');f.prepend(k)}k.click(function(e){c.close(e)});b.load&&c.load()}a.tools=a.tools||{version:"1.2.5"};a.tools.overlay={addEffect:function(d,
b,c){q[d]=[b,c]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var s=[],q={};a.tools.overlay.addEffect("default",function(d,b){var c=this.getConf(),j=a(window);if(!c.fixed){d.top+=j.scrollTop();d.left+=j.scrollLeft()}d.position=c.fixed?"fixed":"absolute";this.getOverlay().css(d).fadeIn(c.speed,b)},function(d){this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)});a.fn.overlay=function(d){var b=this.data("overlay");if(b)return b;if(a.isFunction(d))d={onBeforeLoad:d};d=a.extend(true,{},a.tools.overlay.conf,d);this.each(function(){b=new t(a(this),d);s.push(b);a(this).data("overlay",b)});return d.api?b:this}})(jQuery);
(function(h){function k(d){var e=d.offset();return{top:e.top+d.height()/2,left:e.left+d.width()/2}}var l=h.tools.overlay,f=h(window);h.extend(l.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function o(d,e){var a=this.getOverlay(),c=this.getConf(),g=this.getTrigger(),p=this,m=a.outerWidth({margin:true}),b=a.data("img"),n=c.fixed?"fixed":"absolute";if(!b){b=a.css("backgroundImage");if(!b)throw"background-image CSS property not set for overlay";b=b.slice(b.indexOf("(")+1,b.indexOf(")")).replace(/\"/g,
"");a.css("backgroundImage","none");b=h('<img src="'+b+'"/>');b.css({border:0,display:"none"}).width(m);h("body").append(b);a.data("img",b)}var i=c.start.top||Math.round(f.height()/2),j=c.start.left||Math.round(f.width()/2);if(g){g=k(g);i=g.top;j=g.left}if(c.fixed){i-=f.scrollTop();j-=f.scrollLeft()}else{d.top+=f.scrollTop();d.left+=f.scrollLeft()}b.css({position:"absolute",top:i,left:j,width:0,zIndex:c.zIndex}).show();d.position=n;a.css(d);b.animate({top:a.css("top"),left:a.css("left"),width:m},
c.speed,function(){a.css("zIndex",c.zIndex+1).fadeIn(c.fadeInSpeed,function(){p.isOpened()&&!h(this).index(a)?e.call():a.hide()})}).css("position",n)}function q(d){var e=this.getOverlay().hide(),a=this.getConf(),c=this.getTrigger();e=e.data("img");var g={top:a.start.top,left:a.start.left,width:0};c&&h.extend(g,k(c));a.fixed&&e.css({position:"absolute"}).animate({top:"+="+f.scrollTop(),left:"+="+f.scrollLeft()},0);e.animate(g,a.closeSpeed,d)}l.addEffect("apple",o,q)})(jQuery);
(function(d){function R(a,c){return 32-(new Date(a,c,32)).getDate()}function S(a,c){a=""+a;for(c=c||2;a.length<c;)a="0"+a;return a}function T(a,c,j){var q=a.getDate(),h=a.getDay(),r=a.getMonth();a=a.getFullYear();var f={d:q,dd:S(q),ddd:B[j].shortDays[h],dddd:B[j].days[h],m:r+1,mm:S(r+1),mmm:B[j].shortMonths[r],mmmm:B[j].months[r],yy:String(a).slice(2),yyyy:a};c=c.replace(X,function(s){return s in f?f[s]:s.slice(1,s.length-1)});return Y.html(c).html()}function v(a){return parseInt(a,10)}function U(a,
c){return a.getFullYear()===c.getFullYear()&&a.getMonth()==c.getMonth()&&a.getDate()==c.getDate()}function C(a){if(a){if(a.constructor==Date)return a;if(typeof a=="string"){var c=a.split("-");if(c.length==3)return new Date(v(c[0]),v(c[1])-1,v(c[2]));if(!/^-?\d+$/.test(a))return;a=v(a)}c=new Date;c.setDate(c.getDate()+a);return c}}function Z(a,c){function j(b,e,g){n=b;D=b.getFullYear();E=b.getMonth();G=b.getDate();g=g||d.Event("api");g.type="change";H.trigger(g,[b]);if(!g.isDefaultPrevented()){a.val(T(b,
e.format,e.lang));a.data("date",b);h.hide(g)}}function q(b){b.type="onShow";H.trigger(b);d(document).bind("keydown.d",function(e){if(e.ctrlKey)return true;var g=e.keyCode;if(g==8){a.val("");return h.hide(e)}if(g==27)return h.hide(e);if(d(V).index(g)>=0){if(!w){h.show(e);return e.preventDefault()}var i=d("#"+f.weeks+" a"),t=d("."+f.focus),o=i.index(t);t.removeClass(f.focus);if(g==74||g==40)o+=7;else if(g==75||g==38)o-=7;else if(g==76||g==39)o+=1;else if(g==72||g==37)o-=1;if(o>41){h.addMonth();t=d("#"+
f.weeks+" a:eq("+(o-42)+")")}else if(o<0){h.addMonth(-1);t=d("#"+f.weeks+" a:eq("+(o+42)+")")}else t=i.eq(o);t.addClass(f.focus);return e.preventDefault()}if(g==34)return h.addMonth();if(g==33)return h.addMonth(-1);if(g==36)return h.today();if(g==13)d(e.target).is("select")||d("."+f.focus).click();return d([16,17,18,9]).index(g)>=0});d(document).bind("click.d",function(e){var g=e.target;if(!d(g).parents("#"+f.root).length&&g!=a[0]&&(!L||g!=L[0]))h.hide(e)})}var h=this,r=new Date,f=c.css,s=B[c.lang],
k=d("#"+f.root),M=k.find("#"+f.title),L,I,J,D,E,G,n=a.attr("data-value")||c.value||a.val(),m=a.attr("min")||c.min,p=a.attr("max")||c.max,w;if(m===0)m="0";n=C(n)||r;m=C(m||c.yearRange[0]*365);p=C(p||c.yearRange[1]*365);if(!s)throw"Dateinput: invalid language: "+c.lang;if(a.attr("type")=="date"){var N=d("<input/>");d.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","),function(b,e){N.attr(e,a.attr(e))});a.replaceWith(N);a=N}a.addClass(f.input);var H=
a.add(h);if(!k.length){k=d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({position:"absolute"}).attr("id",f.root);k.children().eq(0).attr("id",f.head).end().eq(1).attr("id",f.body).children().eq(0).attr("id",f.days).end().eq(1).attr("id",f.weeks).end().end().end().find("a").eq(0).attr("id",f.prev).end().eq(1).attr("id",f.next);M=k.find("#"+f.head).find("div").attr("id",f.title);if(c.selectors){var z=d("<select/>").attr("id",f.month),A=d("<select/>").attr("id",f.year);M.html(z.add(A))}for(var $=
k.find("#"+f.days),O=0;O<7;O++)$.append(d("<span/>").text(s.shortDays[(O+c.firstDay)%7]));d("body").append(k)}if(c.trigger)L=d("<a/>").attr("href","#").addClass(f.trigger).click(function(b){h.show();return b.preventDefault()}).insertAfter(a);var K=k.find("#"+f.weeks);A=k.find("#"+f.year);z=k.find("#"+f.month);d.extend(h,{show:function(b){if(!(a.attr("readonly")||a.attr("disabled")||w)){b=b||d.Event();b.type="onBeforeShow";H.trigger(b);if(!b.isDefaultPrevented()){d.each(W,function(){this.hide()});
w=true;z.unbind("change").change(function(){h.setValue(A.val(),d(this).val())});A.unbind("change").change(function(){h.setValue(d(this).val(),z.val())});I=k.find("#"+f.prev).unbind("click").click(function(){I.hasClass(f.disabled)||h.addMonth(-1);return false});J=k.find("#"+f.next).unbind("click").click(function(){J.hasClass(f.disabled)||h.addMonth();return false});h.setValue(n);var e=a.offset();if(/iPad/i.test(navigator.userAgent))e.top-=d(window).scrollTop();k.css({top:e.top+a.outerHeight({margins:true})+
c.offset[0],left:e.left+c.offset[1]});if(c.speed)k.show(c.speed,function(){q(b)});else{k.show();q(b)}return h}}},setValue:function(b,e,g){var i=v(e)>=-1?new Date(v(b),v(e),v(g||1)):b||n;if(i<m)i=m;else if(i>p)i=p;b=i.getFullYear();e=i.getMonth();g=i.getDate();if(e==-1){e=11;b--}else if(e==12){e=0;b++}if(!w){j(i,c);return h}E=e;D=b;g=new Date(b,e,1-c.firstDay);g=g.getDay();var t=R(b,e),o=R(b,e-1),P;if(c.selectors){z.empty();d.each(s.months,function(x,F){m<new Date(b,x+1,-1)&&p>new Date(b,x,0)&&z.append(d("<option/>").html(F).attr("value",
x))});A.empty();i=r.getFullYear();for(var l=i+c.yearRange[0];l<i+c.yearRange[1];l++)m<=new Date(l+1,-1,1)&&p>new Date(l,0,0)&&A.append(d("<option/>").text(l));z.val(e);A.val(b)}else M.html(s.months[e]+" "+b);K.empty();I.add(J).removeClass(f.disabled);l=!g?-7:0;for(var u,y;l<(!g?35:42);l++){u=d("<a/>");if(l%7===0){P=d("<div/>").addClass(f.week);K.append(P)}if(l<g){u.addClass(f.off);y=o-g+l+1;i=new Date(b,e-1,y)}else if(l>=g+t){u.addClass(f.off);y=l-t-g+1;i=new Date(b,e+1,y)}else{y=l-g+1;i=new Date(b,
e,y);if(U(n,i))u.attr("id",f.current).addClass(f.focus);else U(r,i)&&u.attr("id",f.today)}m&&i<m&&u.add(I).addClass(f.disabled);p&&i>p&&u.add(J).addClass(f.disabled);u.attr("href","#"+y).text(y).data("date",i);P.append(u)}K.find("a").click(function(x){var F=d(this);if(!F.hasClass(f.disabled)){d("#"+f.current).removeAttr("id");F.attr("id",f.current);j(F.data("date"),c,x)}return false});f.sunday&&K.find(f.week).each(function(){var x=c.firstDay?7-c.firstDay:0;d(this).children().slice(x,x+1).addClass(f.sunday)});
return h},setMin:function(b,e){m=C(b);e&&n<m&&h.setValue(m);return h},setMax:function(b,e){p=C(b);e&&n>p&&h.setValue(p);return h},today:function(){return h.setValue(r)},addDay:function(b){return this.setValue(D,E,G+(b||1))},addMonth:function(b){return this.setValue(D,E+(b||1),G)},addYear:function(b){return this.setValue(D+(b||1),E,G)},hide:function(b){if(w){b=d.Event();b.type="onHide";H.trigger(b);d(document).unbind("click.d").unbind("keydown.d");if(b.isDefaultPrevented())return;k.hide();w=false}return h},
getConf:function(){return c},getInput:function(){return a},getCalendar:function(){return k},getValue:function(b){return b?T(n,b,c.lang):n},isOpen:function(){return w}});d.each(["onBeforeShow","onShow","change","onHide"],function(b,e){d.isFunction(c[e])&&d(h).bind(e,c[e]);h[e]=function(g){g&&d(h).bind(e,g);return h}});a.bind("focus click",h.show).keydown(function(b){var e=b.keyCode;if(!w&&d(V).index(e)>=0){h.show(b);return b.preventDefault()}return b.shiftKey||b.ctrlKey||b.altKey||e==9?true:b.preventDefault()});
C(a.val())&&j(n,c)}d.tools=d.tools||{version:"1.2.5"};var W=[],Q,V=[75,76,38,39,74,72,40,37],B={};Q=d.tools.dateinput={conf:{format:"mm/dd/yy",selectors:false,yearRange:[-5,5],lang:"en",offset:[0,0],speed:0,firstDay:0,min:undefined,max:undefined,trigger:false,css:{prefix:"cal",input:"date",root:0,head:0,title:0,prev:0,next:0,month:0,year:0,days:0,body:0,weeks:0,today:0,current:0,week:0,off:0,sunday:0,focus:0,disabled:0,trigger:0}},localize:function(a,c){d.each(c,function(j,q){c[j]=q.split(",")});
B[a]=c}};Q.localize("en",{months:"January,February,March,April,May,June,July,August,September,October,November,December",shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",shortDays:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"});var X=/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,Y=d("<a/>");d.expr[":"].date=function(a){var c=a.getAttribute("type");return c&&c=="date"||!!d(a).data("dateinput")};d.fn.dateinput=function(a){if(this.data("dateinput"))return this;
a=d.extend(true,{},Q.conf,a);d.each(a.css,function(j,q){if(!q&&j!="prefix")a.css[j]=(a.css.prefix||"")+(q||j)});var c;this.each(function(){var j=new Z(d(this),a);W.push(j);j=j.getInput().data("dateinput",j);c=c?c.add(j):j});return c?c:this}})(jQuery);
(function(e){function F(d,a){a=Math.pow(10,a);return Math.round(d*a)/a}function q(d,a){if(a=parseInt(d.css(a),10))return a;return(d=d[0].currentStyle)&&d.width&&parseInt(d.width,10)}function C(d){return(d=d.data("events"))&&d.onSlide}function G(d,a){function h(c,b,f,j){if(f===undefined)f=b/k*z;else if(j)f-=a.min;if(s)f=Math.round(f/s)*s;if(b===undefined||s)b=f*k/z;if(isNaN(f))return g;b=Math.max(0,Math.min(b,k));f=b/k*z;if(j||!n)f+=a.min;if(n)if(j)b=k-b;else f=a.max-f;f=F(f,t);var r=c.type=="click";
if(D&&l!==undefined&&!r){c.type="onSlide";A.trigger(c,[f,b]);if(c.isDefaultPrevented())return g}j=r?a.speed:0;r=r?function(){c.type="change";A.trigger(c,[f])}:null;if(n){m.animate({top:b},j,r);a.progress&&B.animate({height:k-b+m.width()/2},j)}else{m.animate({left:b},j,r);a.progress&&B.animate({width:b+m.width()/2},j)}l=f;H=b;d.val(f);return g}function o(){if(n=a.vertical||q(i,"height")>q(i,"width")){k=q(i,"height")-q(m,"height");u=i.offset().top+k}else{k=q(i,"width")-q(m,"width");u=i.offset().left}}
function v(){o();g.setValue(a.value!==undefined?a.value:a.min)}var g=this,p=a.css,i=e("<div><div/><a href='#'/></div>").data("rangeinput",g),n,l,u,k,H;d.before(i);var m=i.addClass(p.slider).find("a").addClass(p.handle),B=i.find("div").addClass(p.progress);e.each("min,max,step,value".split(","),function(c,b){c=d.attr(b);if(parseFloat(c))a[b]=parseFloat(c,10)});var z=a.max-a.min,s=a.step=="any"?0:a.step,t=a.precision;if(t===undefined)try{t=s.toString().split(".")[1].length}catch(I){t=0}if(d.attr("type")==
"range"){var w=e("<input/>");e.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","),function(c,b){w.attr(b,d.attr(b))});w.val(a.value);d.replaceWith(w);d=w}d.addClass(p.input);var A=e(g).add(d),D=true;e.extend(g,{getValue:function(){return l},setValue:function(c,b){o();return h(b||e.Event("api"),undefined,c,true)},getConf:function(){return a},getProgress:function(){return B},getHandle:function(){return m},getInput:function(){return d},step:function(c,
b){b=b||e.Event();var f=a.step=="any"?1:a.step;g.setValue(l+f*(c||1),b)},stepUp:function(c){return g.step(c||1)},stepDown:function(c){return g.step(-c||-1)}});e.each("onSlide,change".split(","),function(c,b){e.isFunction(a[b])&&e(g).bind(b,a[b]);g[b]=function(f){f&&e(g).bind(b,f);return g}});m.drag({drag:false}).bind("dragStart",function(){o();D=C(e(g))||C(d)}).bind("drag",function(c,b,f){if(d.is(":disabled"))return false;h(c,n?b:f)}).bind("dragEnd",function(c){if(!c.isDefaultPrevented()){c.type=
"change";A.trigger(c,[l])}}).click(function(c){return c.preventDefault()});i.click(function(c){if(d.is(":disabled")||c.target==m[0])return c.preventDefault();o();var b=m.width()/2;h(c,n?k-u-b+c.pageY:c.pageX-u-b)});a.keyboard&&d.keydown(function(c){if(!d.attr("readonly")){var b=c.keyCode,f=e([75,76,38,33,39]).index(b)!=-1,j=e([74,72,40,34,37]).index(b)!=-1;if((f||j)&&!(c.shiftKey||c.altKey||c.ctrlKey)){if(f)g.step(b==33?10:1,c);else if(j)g.step(b==34?-10:-1,c);return c.preventDefault()}}});d.blur(function(c){var b=
e(this).val();b!==l&&g.setValue(b,c)});e.extend(d[0],{stepUp:g.stepUp,stepDown:g.stepDown});v();k||e(window).load(v)}e.tools=e.tools||{version:"1.2.5"};var E;E=e.tools.rangeinput={conf:{min:0,max:100,step:"any",steps:0,value:0,precision:undefined,vertical:0,keyboard:true,progress:false,speed:100,css:{input:"range",slider:"slider",progress:"progress",handle:"handle"}}};var x,y;e.fn.drag=function(d){document.ondragstart=function(){return false};d=e.extend({x:true,y:true,drag:true},d);x=x||e(document).bind("mousedown mouseup",
function(a){var h=e(a.target);if(a.type=="mousedown"&&h.data("drag")){var o=h.position(),v=a.pageX-o.left,g=a.pageY-o.top,p=true;x.bind("mousemove.drag",function(i){var n=i.pageX-v;i=i.pageY-g;var l={};if(d.x)l.left=n;if(d.y)l.top=i;if(p){h.trigger("dragStart");p=false}d.drag&&h.css(l);h.trigger("drag",[i,n]);y=h});a.preventDefault()}else try{y&&y.trigger("dragEnd")}finally{x.unbind("mousemove.drag");y=null}});return this.data("drag",true)};e.expr[":"].range=function(d){var a=d.getAttribute("type");
return a&&a=="range"||!!e(d).filter("input").data("rangeinput")};e.fn.rangeinput=function(d){if(this.data("rangeinput"))return this;d=e.extend(true,{},E.conf,d);var a;this.each(function(){var h=new G(e(this),e.extend(true,{},d));h=h.getInput().data("rangeinput",h);a=a?a.add(h):h});return a?a:this}})(jQuery);
(function(e){function t(a,b,c){var k=a.offset().top,f=a.offset().left,l=c.position.split(/,?\s+/),p=l[0];l=l[1];k-=b.outerHeight()-c.offset[0];f+=a.outerWidth()+c.offset[1];if(/iPad/i.test(navigator.userAgent))k-=e(window).scrollTop();c=b.outerHeight()+a.outerHeight();if(p=="center")k+=c/2;if(p=="bottom")k+=c;a=a.outerWidth();if(l=="center")f-=(a+b.outerWidth())/2;if(l=="left")f-=a;return{top:k,left:f}}function y(a){function b(){return this.getAttribute("type")==a}b.key="[type="+a+"]";return b}function u(a,
b,c){function k(g,d,i){if(!(!c.grouped&&g.length)){var j;if(i===false||e.isArray(i)){j=h.messages[d.key||d]||h.messages["*"];j=j[c.lang]||h.messages["*"].en;(d=j.match(/\$\d/g))&&e.isArray(i)&&e.each(d,function(m){j=j.replace(this,i[m])})}else j=i[c.lang]||i;g.push(j)}}var f=this,l=b.add(f);a=a.not(":button, :image, :reset, :submit");e.extend(f,{getConf:function(){return c},getForm:function(){return b},getInputs:function(){return a},reflow:function(){a.each(function(){var g=e(this),d=g.data("msg.el");
if(d){g=t(g,d,c);d.css({top:g.top,left:g.left})}});return f},invalidate:function(g,d){if(!d){var i=[];e.each(g,function(j,m){j=a.filter("[name='"+j+"']");if(j.length){j.trigger("OI",[m]);i.push({input:j,messages:[m]})}});g=i;d=e.Event()}d.type="onFail";l.trigger(d,[g]);d.isDefaultPrevented()||q[c.effect][0].call(f,g,d);return f},reset:function(g){g=g||a;g.removeClass(c.errorClass).each(function(){var d=e(this).data("msg.el");if(d){d.remove();e(this).data("msg.el",null)}}).unbind(c.errorInputEvent||
"");return f},destroy:function(){b.unbind(c.formEvent+".V").unbind("reset.V");a.unbind(c.inputEvent+".V").unbind("change.V");return f.reset()},checkValidity:function(g,d){g=g||a;g=g.not(":disabled");if(!g.length)return true;d=d||e.Event();d.type="onBeforeValidate";l.trigger(d,[g]);if(d.isDefaultPrevented())return d.result;var i=[];g.not(":radio:not(:checked)").each(function(){var m=[],n=e(this).data("messages",m),v=r&&n.is(":date")?"onHide.v":c.errorInputEvent+".v";n.unbind(v);e.each(w,function(){var o=
this,s=o[0];if(n.filter(s).length){o=o[1].call(f,n,n.val());if(o!==true){d.type="onBeforeFail";l.trigger(d,[n,s]);if(d.isDefaultPrevented())return false;var x=n.attr(c.messageAttr);if(x){m=[x];return false}else k(m,s,o)}}});if(m.length){i.push({input:n,messages:m});n.trigger("OI",[m]);c.errorInputEvent&&n.bind(v,function(o){f.checkValidity(n,o)})}if(c.singleError&&i.length)return false});var j=q[c.effect];if(!j)throw'Validator: cannot find effect "'+c.effect+'"';if(i.length){f.invalidate(i,d);return false}else{j[1].call(f,
g,d);d.type="onSuccess";l.trigger(d,[g]);g.unbind(c.errorInputEvent+".v")}return true}});e.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),function(g,d){e.isFunction(c[d])&&e(f).bind(d,c[d]);f[d]=function(i){i&&e(f).bind(d,i);return f}});c.formEvent&&b.bind(c.formEvent+".V",function(g){if(!f.checkValidity(null,g))return g.preventDefault()});b.bind("reset.V",function(){f.reset()});a[0]&&a[0].validity&&a.each(function(){this.oninvalid=function(){return false}});if(b[0])b[0].checkValidity=
f.checkValidity;c.inputEvent&&a.bind(c.inputEvent+".V",function(g){f.checkValidity(e(this),g)});a.filter(":checkbox, select").filter("[required]").bind("change.V",function(g){var d=e(this);if(this.checked||d.is("select")&&e(this).val())q[c.effect][1].call(f,d,g)});var p=a.filter(":radio").change(function(g){f.checkValidity(p,g)});e(window).resize(function(){f.reflow()})}e.tools=e.tools||{version:"1.2.5"};var z=/\[type=([a-z]+)\]/,A=/^-?[0-9]*(\.[0-9]+)?$/,r=e.tools.dateinput,B=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
C=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,h;h=e.tools.validator={conf:{grouped:false,effect:"default",errorClass:"invalid",inputEvent:null,errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:false,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(a,b){e.each(b,function(c,k){h.messages[c]=h.messages[c]||{};h.messages[c][a]=k})},
localizeFn:function(a,b){h.messages[a]=h.messages[a]||{};e.extend(h.messages[a],b)},fn:function(a,b,c){if(e.isFunction(b))c=b;else{if(typeof b=="string")b={en:b};this.messages[a.key||a]=b}if(b=z.exec(a))a=y(b[1]);w.push([a,c])},addEffect:function(a,b,c){q[a]=[b,c]}};var w=[],q={"default":[function(a){var b=this.getConf();e.each(a,function(c,k){c=k.input;c.addClass(b.errorClass);var f=c.data("msg.el");if(!f){f=e(b.message).addClass(b.messageClass).appendTo(document.body);c.data("msg.el",f)}f.css({visibility:"hidden"}).find("p").remove();
e.each(k.messages,function(l,p){e("<p/>").html(p).appendTo(f)});f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});k=t(c,f,b);f.css({visibility:"visible",position:"absolute",top:k.top,left:k.left}).fadeIn(b.speed)})},function(a){var b=this.getConf();a.removeClass(b.errorClass).each(function(){var c=e(this).data("msg.el");c&&c.css({visibility:"hidden"})})}]};e.each("email,url,number".split(","),function(a,b){e.expr[":"][b]=function(c){return c.getAttribute("type")===b}});
e.fn.oninvalid=function(a){return this[a?"bind":"trigger"]("OI",a)};h.fn(":email","Please enter a valid email address",function(a,b){return!b||B.test(b)});h.fn(":url","Please enter a valid URL",function(a,b){return!b||C.test(b)});h.fn(":number","Please enter a numeric value.",function(a,b){return A.test(b)});h.fn("[max]","Please enter a value smaller than $1",function(a,b){if(b===""||r&&a.is(":date"))return true;a=a.attr("max");return parseFloat(b)<=parseFloat(a)?true:[a]});h.fn("[min]","Please enter a value larger than $1",
function(a,b){if(b===""||r&&a.is(":date"))return true;a=a.attr("min");return parseFloat(b)>=parseFloat(a)?true:[a]});h.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return!!b});h.fn("[pattern]",function(a){var b=new RegExp("^"+a.attr("pattern")+"$");return b.test(a.val())});e.fn.validator=function(a){var b=this.data("validator");if(b){b.destroy();this.removeData("validator")}a=e.extend(true,{},h.conf,a);if(this.is("form"))return this.each(function(){var c=
e(this);b=new u(c.find(":input"),c,a);c.data("validator",b)});else{b=new u(this,this.eq(0).closest("form"),a);return this.data("validator",b)}}})(jQuery);/* swfobject.js */
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();/* namespace.js */
/* 
 * jQuery Namespace 
 * Use namespaces to protect your global integrity.
 * Creates new object (namespace) within JQuery / JQuery.fn
 */
(function ($) { 
	var methods = {}; 

	/**
	 * This one defines namespace 
	 */
	$.namespace = function(ns) { 
    
		methods[ns] =  methods[ns] || {}; 
		
		// getting reference to a namespaced jquery object
		function nsfun(selector, context) {
			return $(selector, context).namespace(ns);
		}
    
		// adding methods to FN (using namespaces in jquery plugins)
		nsfun.fn = methods[ns];

		return nsfun;
	};
  
	/**
	 * Function that allows using namespaces in jQuery plugins
	 */
	$.fn.namespace = function(ns) { 
		if (methods[ns]) {
			$.extend(this, methods[ns]);
		}
		return this; 
	}; 
}) (jQuery);/* pluginize.js */
/* 
 * JQuery Pluginize
 * Use it for pluginize classes
 * It allows use classes (within some namespace) like plugins
 */ 
$.pluginize = function(name, object, namespace) {
	namespace.fn[name] = function(options) {
		// getting plugin arguments
		var args = Array.prototype.slice.call(arguments, 1);
		
		// returning this for saving chainability 
		return this.each(function() {
			var instance = $.data(this, name);

			// if incstance of our object is defined
			if (instance) {
				// applying arguments to options
				instance[options].apply(instance, args);
			} else {
				var o = $Crabapple.instantiate(object, [this, options]);
				// concrete adding plugin to $ using JQuery.data method
				instance = $.data(this, name, o);
			}
		});
	};
};/* cookie.js */
/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
/* jquery.form.js */
/*!
 * jQuery Form Plugin
 * version: 2.92 (22-NOV-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}
	
	var method, action, url, $form = this;

	if (typeof options == 'function') {
		options = { success: options };
	}

	method = this.attr('method');
	action = this.attr('action');
	url = (typeof action === 'string') ? $.trim(action) : '';
	url = url || window.location.href || '';
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	}

	options = $.extend(true, {
		url:  url,
		success: $.ajaxSettings.success,
		type: method || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var traditional = options.traditional;
	if ( traditional === undefined ) {
		traditional = $.ajaxSettings.traditional;
	}
	
	var qx,n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		qx = $.param(options.data, traditional);
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a, traditional);
	if (qx) {
		q = ( q ? (q + '&' + qx) : qx );
	}	
	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}

	var callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(options.includeHidden); });
	}

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;	// jQuery 1.4+ supports scope context 
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};

	// are there files to upload?
	var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
	var hasFileInputs = fileInputs.length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	var fileAPI = !!(hasFileInputs && fileInputs.get(0).files && window.FormData);
	log("fileAPI :" + fileAPI);
	var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
	if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
		// hack to fix Safari hang (thanks to Tim Molendijk for this)
		// see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
		if (options.closeKeepAlive) {
			$.get(options.closeKeepAlive, function() {
				fileUploadIframe(a);
			});
		}
  		else {
			fileUploadIframe(a);
  		}
	}
	else if ((hasFileInputs || multipart) && fileAPI) {
		options.progress = options.progress || $.noop;
		fileUploadXhr(a);
	}
	else {
		$.ajax(options);
	}

	 // fire 'notify' event
	 this.trigger('form-submit-notify', [this, options]);
	 return this;

	 // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	function fileUploadXhr(a) {
		var formdata = new FormData();

		for (var i=0; i < a.length; i++) {
			if (a[i].type == 'file')
				continue;
			formdata.append(a[i].name, a[i].value);
		}

		$form.find('input:file:enabled').each(function(){
			var name = $(this).attr('name'), files = this.files;
			if (name) {
				for (var i=0; i < files.length; i++)
					formdata.append(name, files[i]);
			}
		});

		options.data = null;
		var _beforeSend = options.beforeSend;
		options.beforeSend = function(xhr, options) {
			options.data = formdata;
			if (xhr.upload) { // unfortunately, jQuery doesn't expose this prop (http://bugs.jquery.com/ticket/10190)
				xhr.upload.onprogress = function(event) {
					options.progress(event.position, event.total);
				}
			}
			if (_beforeSend)
				_beforeSend.call(options, xhr, options);
		}
		$.ajax(options);
	}

	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUploadIframe(a) {
		var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
		var useProp = !!$.fn.prop;

		if (a) {
			if ( useProp ) {
				// ensure that every serialized input is still enabled
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.prop('disabled', false);
				}
			} else {
				for (i=0; i < a.length; i++) {
					el = $(form[a[i].name]);
					el.removeAttr('disabled');
				}
			};
		}

		if ($(':input[name=submit],:input[id=submit]', form).length) {
			// if there is an input with a name or id of 'submit' then we won't be
			// able to invoke the submit fn on the form (at least not x-browser)
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		
		s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		id = 'jqFormIO' + (new Date().getTime());
		if (s.iframeTarget) {
			$io = $(s.iframeTarget);
			n = $io.attr('name');
			if (n == null)
			 	$io.attr('name', id);
			else
				id = n;
		}
		else {
			$io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
			$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
		}
		io = $io[0];


		xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function(status) {
				var e = (status === 'timeout' ? 'timeout' : 'aborted');
				log('aborting upload... ' + e);
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, e, status);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
				s.complete && s.complete.call(s.context, xhr, e);
			}
		};

		g = s.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}

		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) {
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}

		// add submitting element to data if we know it
		sub = form.clk;
		if (sub) {
			n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}
		
		var CLIENT_TIMEOUT_ABORT = 1;
		var SERVER_ABORT = 2;

		function getDoc(frame) {
			var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
			return doc;
		}
		
		// Rails CSRF hack (thanks to Yvan BARTH�LEMY)
		var csrf_token = $('meta[name=csrf-token]').attr('content');
		var csrf_param = $('meta[name=csrf-param]').attr('content');
		if (csrf_param && csrf_token) {
			s.extraData = s.extraData || {};
			s.extraData[csrf_param] = csrf_token;
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (!method) {
				form.setAttribute('method', 'POST');
			}
			if (a != s.url) {
				form.setAttribute('action', s.url);
			}

			// ie borks in some cases when setting encoding
			if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (s.timeout) {
				timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
			}
			
			// look for server aborts
			function checkState() {
				try {
					var state = getDoc(io).readyState;
					log('state = ' + state);
					if (state.toLowerCase() == 'uninitialized')
						setTimeout(checkState,50);
				}
				catch(e) {
					log('Server abort: ' , e, ' (', e.name, ')');
					cb(SERVER_ABORT);
					timeoutHandle && clearTimeout(timeoutHandle);
					timeoutHandle = undefined;
				}
			}

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
								.appendTo(form)[0]);
					}
				}

				if (!s.iframeTarget) {
					// add iframe to doc and submit the form
					$io.appendTo('body');
					io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				}
				setTimeout(checkState,15);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}

		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}

		var data, doc, domCheckCount = 50, callbackProcessed;

		function cb(e) {
			if (xhr.aborted || callbackProcessed) {
				return;
			}
			try {
				doc = getDoc(io);
			}
			catch(ex) {
				log('cannot access response document: ', ex);
				e = SERVER_ABORT;
			}
			if (e === CLIENT_TIMEOUT_ABORT && xhr) {
				xhr.abort('timeout');
				return;
			}
			else if (e == SERVER_ABORT && xhr) {
				xhr.abort('server abort');
				return;
			}

			if (!doc || doc.location.href == s.iframeSrc) {
				// response not received yet
				if (!timedOut)
					return;
			}
			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var status = 'success', errMsg;
			try {
				if (timedOut) {
					throw 'timeout';
				}

				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					// let this fall through because server response could be an empty document
					//log('Could not access iframe DOM after mutiple tries.');
					//throw 'DOMException: not available';
				}

				//log('response detected');
				var docRoot = doc.body ? doc.body : doc.documentElement;
				xhr.responseText = docRoot ? docRoot.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				if (isXml)
					s.dataType = 'xml';
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};
				// support for XHR 'status' & 'statusText' emulation :
				if (docRoot) {
					xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
					xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
				}

				var dt = (s.dataType || '').toLowerCase();
				var scr = /(json|script|text)/.test(dt);
				if (scr || s.textarea) {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
						// support for XHR 'status' & 'statusText' emulation :
						xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
						xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
					}
					else if (scr) {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
						}
						else if (b) {
							xhr.responseText = b.textContent ? b.textContent : b.innerText;
						}
					}
				}
				else if (dt == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}

				try {
					data = httpData(xhr, dt, s);
				}
				catch (e) {
					status = 'parsererror';
					xhr.error = errMsg = (e || status);
				}
			}
			catch (e) {
				log('error caught: ',e);
				status = 'error';
				xhr.error = errMsg = (e || status);
			}

			if (xhr.aborted) {
				log('upload aborted');
				status = null;
			}

			if (xhr.status) { // we've set xhr.status
				status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (status === 'success') {
				s.success && s.success.call(s.context, data, 'success', xhr);
				g && $.event.trigger("ajaxSuccess", [xhr, s]);
			}
			else if (status) {
				if (errMsg == undefined)
					errMsg = xhr.statusText;
				s.error && s.error.call(s.context, xhr, status, errMsg);
				g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
			}

			g && $.event.trigger("ajaxComplete", [xhr, s]);

			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}

			s.complete && s.complete.call(s.context, xhr, status);

			callbackProcessed = true;
			if (s.timeout)
				clearTimeout(timeoutHandle);

			// clean up
			setTimeout(function() {
				if (!s.iframeTarget)
					$io.remove();
				xhr.responseXML = null;
			}, 100);
		}

		var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
		};
		var parseJSON = $.parseJSON || function(s) {
			return window['eval']('(' + s + ')');
		};

		var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

			var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

			if (xml && data.documentElement.nodeName === 'parsererror') {
				$.error && $.error('parsererror');
			}
			if (s && s.dataFilter) {
				data = s.dataFilter(data, type);
			}
			if (typeof data === 'string') {
				if (type === 'json' || !type && ct.indexOf('json') >= 0) {
					data = parseJSON(data);
				} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
					$.globalEval(data);
				}
			}
			return data;
		};
	}
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	// in jQuery 1.3+ we can fix mistakes with the ready state
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}

	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val(), type: el.type });
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v, type: el.type});
		}
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function(includeHidden) {
	return this.each(function() {
		$('input,select,textarea', this).clearFields(includeHidden);
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (re.test(t) || tag == 'textarea' || (includeHidden && /hidden/.test(t)) ) {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
	if (!$.fn.ajaxSubmit.debug) 
		return;
	var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
	else if (window.opera && window.opera.postError) {
		window.opera.postError(msg);
	}
};

})(jQuery);
/* selectbox.js */
/*!
 * jQuery Selectbox plugin 0.1.3
 *
 * Copyright 2011, Dimitar Ivanov (http://www.bulgaria-web-developers.com/projects/javascript/selectbox/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 * 
 * Date: Wed Jul 29 23:20:57 2011 +0200
 */
(function ($, undefined) {
	var PROP_NAME = 'selectbox',
		FALSE = false,
		TRUE = true;
	/**
	 * Selectbox manager.
	 * Use the singleton instance of this class, $.selectbox, to interact with the select box.
	 * Settings for (groups of) select boxes are maintained in an instance object,
	 * allowing multiple different settings on the same page
	 */
	function Selectbox() {
		this._state = [];
		this._defaults = { // Global defaults for all the select box instances
			classHolder: "sbHolder",
			classHolderDisabled: "sbHolderDisabled",
			classSelector: "sbSelector",
			classOptions: "sbOptions",
			classGroup: "sbGroup",
			classSub: "sbSub",
			classDisabled: "sbDisabled",
			classToggleOpen: "sbToggleOpen",
			classToggle: "sbToggle",
			speed: 200,
			effect: "slide", // "slide" or "fade"
			onChange: null, //Define a callback function when the selectbox is changed
			onOpen: null, //Define a callback function when the selectbox is open
			onClose: null //Define a callback function when the selectbox is closed
		};
	}
	
	$.extend(Selectbox.prototype, {
		/**
		 * Is the first field in a jQuery collection open as a selectbox
		 * 
		 * @param {Object} target
		 * @return {Boolean}
		 */
		_isOpenSelectbox: function (target) {
			if (!target) {
				return FALSE;
			}
			var inst = this._getInst(target);
			return inst.isOpen;
		},
		/**
		 * Is the first field in a jQuery collection disabled as a selectbox
		 * 
		 * @param {HTMLElement} target
		 * @return {Boolean}
		 */
		_isDisabledSelectbox: function (target) {
			if (!target) {
				return FALSE;
			}
			var inst = this._getInst(target);
			return inst.isDisabled;
		},
		/**
		 * Attach the select box to a jQuery selection.
		 * 
		 * @param {HTMLElement} target
		 * @param {Object} settings
		 */
		_attachSelectbox: function (target, settings) {
			if (this._getInst(target)) {
				return FALSE;
			}
			var $target = $(target),
				self = this,
				inst = self._newInst($target),
				sbHolder, sbSelector, sbToggle, sbOptions,
				s = FALSE, optGroup = $target.find("optgroup"), opts = $target.find("option"), olen = opts.length;
				
			$target.attr("sb", inst.uid);
				
			$.extend(inst.settings, self._defaults, settings);
			self._state[inst.uid] = FALSE;
			$target.hide();
			
			function closeOthers() {
				var key, uid = this.attr("id").split("_")[1];
				for (key in self._state) {
					if (key !== uid) {
						if (self._state.hasOwnProperty(key)) {
							if ($(":input[sb='" + key + "']")[0]) {
								self._closeSelectbox($(":input[sb='" + key + "']")[0]);
							}
						}
					}
				}
			}
			
			sbHolder = $("<div>", {
				"id": "sbHolder_" + inst.uid,
				"class": inst.settings.classHolder
			});
			
			sbSelector = $("<a>", {
				"id": "sbSelector_" + inst.uid,
				"href": "#",
				"class": inst.settings.classSelector,
				"click": function (e) {
					e.preventDefault();
					closeOthers.apply($(this), []);
					var uid = $(this).attr("id").split("_")[1];
					if (self._state[uid]) {
						self._closeSelectbox(target);
					} else {
						self._openSelectbox(target);
					}
				}
			});
			
			sbToggle = $("<a>", {
				"id": "sbToggle_" + inst.uid,
				"href": "#",
				"class": inst.settings.classToggle,
				"click": function (e) {
					e.preventDefault();
					closeOthers.apply($(this), []);
					var uid = $(this).attr("id").split("_")[1];
					if (self._state[uid]) {
						self._closeSelectbox(target);
					} else {
						self._openSelectbox(target);
					}
				}
			});
			sbToggle.appendTo(sbHolder);

			sbOptions = $("<ul>", {
				"id": "sbOptions_" + inst.uid,
				"class": inst.settings.classOptions,
				"css": {
					"display": "none"
				}
			});
			
			$target.children().each(function(i) {
				var that = $(this), li, config = {};
				if (that.is("option")) {
					getOptions(that);
				} else if (that.is("optgroup")) {
					li = $("<li>");
					$("<span>", {
						"text": that.attr("label")
					}).addClass(inst.settings.classGroup).appendTo(li);
					li.appendTo(sbOptions);
					if (that.is(":disabled")) {
						config.disabled = true;
					}
					config.sub = true;
					getOptions(that.find("option"), config);
				}
			});
			
			function getOptions () {
				var sub = arguments[1] && arguments[1].sub ? true : false,
					disabled = arguments[1] && arguments[1].disabled ? true : false;
				arguments[0].each(function (i) {
					var that = $(this),
						li = $("<li>"),
						child;
					if (that.is(":selected")) {
						sbSelector.text(that.text());
						s = TRUE;
					}
					if (i === olen - 1) {
						li.addClass("last");
					}
					if (!that.is(":disabled") && !disabled) {
						child = $("<a>", {
							"href": "#" + that.val(),
							"rel": that.val(), 
							"text": that.text(),
							"click": function (e) {
								e.preventDefault();
								var t = sbToggle,
									uid = t.attr("id").split("_")[1];
								self._changeSelectbox(target, $(this).attr("rel"), $(this).text());
								self._closeSelectbox(target);
							}
						});
						if (sub) {
							child.addClass(inst.settings.classSub);
						}
						child.appendTo(li);
					} else {
						child = $("<span>", {
							"text": that.text()
						}).addClass(inst.settings.classDisabled);
						if (sub) {
							child.addClass(inst.settings.classSub);
						}
						child.appendTo(li);
					}
					li.appendTo(sbOptions);
				});
			}
			
			if (!s) {
				sbSelector.text(opts.first().text());
			}
			
			$.data(target, PROP_NAME, inst);
			
			sbSelector.appendTo(sbHolder);
			sbOptions.appendTo(sbHolder);			
			sbHolder.insertAfter($target);
		},
		/**
		 * Remove the selectbox functionality completely. This will return the element back to its pre-init state.
		 * 
		 * @param {HTMLElement} target
		 */
		_detachSelectbox: function (target) {
			var inst = this._getInst(target);
			if (!inst) {
				return FALSE;
			}
			$("#sbHolder_" + inst.uid).remove();
			$.data(target, PROP_NAME, null);
			$(target).show();			
		},
		/**
		 * Change selected attribute of the selectbox.
		 * 
		 * @param {HTMLElement} target
		 * @param {String} value
		 * @param {String} text
		 */
		_changeSelectbox: function (target, value, text) {
			var inst = this._getInst(target),
				onChange = this._get(inst, 'onChange');
			$("#sbSelector_" + inst.uid).text(text);
			$(target).find("option[value='" + value + "']").attr("selected", TRUE);
			if (onChange) {
				onChange.apply((inst.input ? inst.input[0] : null), [value, inst]);
			} else if (inst.input) {
				inst.input.trigger('change');
			}
		},
		/**
		 * Show the selectbox.
		 * 
		 * @param {HTMLElement} target
		 */
		_showSelectbox: function (target) {
			this._enableSelectbox(target);
			var inst = this._getInst(target);
			if (!inst) return FALSE;
			$("#sbHolder_" + inst.uid).show();
		},
		/**
		 * Hide the selectbox.
		 * 
		 * @param {HTMLElement} target
		 */
		_hideSelectbox: function (target) {
			this._disableSelectbox(target);
			var inst = this._getInst(target);
			if (!inst) return FALSE;
			$("#sbHolder_" + inst.uid).hide();
		},
		/**
		 * Enable the selectbox.
		 * 
		 * @param {HTMLElement} target
		 */
		_enableSelectbox: function (target) {
			var inst = this._getInst(target);
			if (!inst || !inst.isDisabled) {
				return FALSE;
			}
			$("#sbHolder_" + inst.uid).removeClass(inst.settings.classHolderDisabled);
			inst.isDisabled = FALSE;
			$.data(target, PROP_NAME, inst);
		},
		/**
		 * Disable the selectbox.
		 * 
		 * @param {HTMLElement} target
		 */
		_disableSelectbox: function (target) {
			var inst = this._getInst(target);
			if (!inst || inst.isDisabled) {
				return FALSE;
			}
			$("#sbHolder_" + inst.uid).addClass(inst.settings.classHolderDisabled);
			inst.isDisabled = TRUE;
			$.data(target, PROP_NAME, inst);
		},
		/**
		 * Get or set any selectbox option. If no value is specified, will act as a getter.
		 * 
		 * @param {HTMLElement} target
		 * @param {String} name
		 * @param {Object} value
		 */
		_optionSelectbox: function (target, name, value) {
			var inst = this._getInst(target);
			if (!inst) {
				return FALSE;
			}
			//TODO check name
			inst[name] = value;
			$.data(target, PROP_NAME, inst);
		},
		/**
		 * Call up attached selectbox
		 * 
		 * @param {HTMLElement} target
		 */
		_openSelectbox: function (target) {
			var inst = this._getInst(target);
			//if (!inst || this._state[inst.uid] || inst.isDisabled) {
			if (!inst || inst.isOpen || inst.isDisabled) {
				return;
			}
			var	el = $("#sbOptions_" + inst.uid),
				viewportHeight = parseInt($(window).height(), 10),
				offset = $("#sbHolder_" + inst.uid).offset(),
				scrollTop = $(window).scrollTop(),
				height = el.prev().height(),
				diff = viewportHeight - (offset.top - scrollTop) - height / 2,
				onOpen = this._get(inst, 'onOpen');
			el.css({
				"top": height + "px",
				"maxHeight": (diff - height) + "px"
			});
			inst.settings.effect === "fade" ? el.fadeIn(inst.settings.speed) : el.slideDown(inst.settings.speed);
			$("#sbToggle_" + inst.uid).addClass(inst.settings.classToggleOpen);
			this._state[inst.uid] = TRUE;
			inst.isOpen = TRUE;
			if (onOpen) {
				onOpen.apply((inst.input ? inst.input[0] : null), [inst]);
			}
			$.data(target, PROP_NAME, inst);
		},
		/**
		 * Close opened selectbox
		 * 
		 * @param {HTMLElement} target
		 */
		_closeSelectbox: function (target) {
			var inst = this._getInst(target);
			//if (!inst || !this._state[inst.uid]) {
			if (!inst || !inst.isOpen) {
				return;
			}
			var onClose = this._get(inst, 'onClose');
			inst.settings.effect === "fade" ? $("#sbOptions_" + inst.uid).fadeOut(inst.settings.speed) : $("#sbOptions_" + inst.uid).slideUp(inst.settings.speed);
			$("#sbToggle_" + inst.uid).removeClass(inst.settings.classToggleOpen);
			this._state[inst.uid] = FALSE;
			inst.isOpen = FALSE;
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [inst]);
			}
			$.data(target, PROP_NAME, inst);
		},
		/**
		 * Create a new instance object
		 * 
		 * @param {HTMLElement} target
		 * @return {Object}
		 */
		_newInst: function(target) {
			var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
			return {
				id: id, 
				input: target, 
				uid: Math.floor(Math.random() * 99999999),
				isOpen: FALSE,
				isDisabled: FALSE,
				settings: {}
			}; 
		},
		/**
		 * Retrieve the instance data for the target control.
		 * 
		 * @param {HTMLElement} target
		 * @return {Object} - the associated instance data
		 * @throws error if a jQuery problem getting data
		 */
		_getInst: function(target) {
			try {
				return $.data(target, PROP_NAME);
			}
			catch (err) {
				throw 'Missing instance data for this selectbox';
			}
		},
		/**
		 * Get a setting value, defaulting if necessary
		 * 
		 * @param {Object} inst
		 * @param {String} name
		 * @return {Mixed}
		 */
		_get: function(inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
		}
	});

	/**
	 * Invoke the selectbox functionality.
	 * 
	 * @param {Object|String} options
	 * @return {Object}
	 */
	$.fn.selectbox = function (options) {
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string' && options == 'isDisabled') {
			return $.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this[0]].concat(otherArgs));
		}
		
		if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string') {
			return $.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this[0]].concat(otherArgs));
		}
		
		return this.each(function() {
			typeof options == 'string' ?
				$.selectbox['_' + options + 'Selectbox'].apply($.selectbox, [this].concat(otherArgs)) :
				$.selectbox._attachSelectbox(this, options);
		});
	};
	
	$.selectbox = new Selectbox(); // singleton instance
	$.selectbox.version = "0.1.3";
})(jQuery);/* crabapple.js */
/**
 * Creates $Crabapple global object which will hold all crabapple core javascript
 */
(function ($) {
	$Crabapple = $.namespace('Crabapple');
}) (jQuery);/* class.js */
/**
 * Crabapple Class class is a base parent class for all classes
 * //TODO DOC all features of this class
 */
(function($){
	$Crabapple.Class = function(){};

	/**
	 * Type hierarchy class.
	 * 
	 * This class helps us navigate through type hierarchy.
	 * 
	 * @class
	 * @memberOf $Crabapple.Class
	 * @param type
	 */
	var Hierarchy = $Crabapple.Class.Hierarchy = function(/** Function */type){
		this.type = type;
	}
	/**
	 * @param type
	 * @returns Fluent interface
	 */
	Hierarchy.prototype.set = function(/** Function */type)/** Hierarchy */{
		this.type = type;
		return this;
	}
	/**
	 * @param cb callback will receive ancestor
	 * @returns Fluent interface
	 */
	Hierarchy.prototype.map = function(/** Function */cb)/** Hierarchy */{
		var stack = this.stack = [];
		for (var ancestor = this.type.prototype; 'parentClass' in ancestor; ancestor = ancestor.parentClass) {
			if (false !== cb(ancestor)) {
				stack.push(ancestor);
			}
		}
		return this;
	}
	/**
	 * @param cb callback will receive all matched ancestor and should return array with filtered ancestors 
	 * @returns Fluent interface
	 */
	Hierarchy.prototype.reduce = function(/** Function */cb)/** Hierarchy */{
		this.stack = cb(this.stack);
		return this;
	}
	/**
	 * @param cb callback will receive ancestor
	 * @returns Fluent interface
	 */
	Hierarchy.prototype.apply = function(/** Function */cb)/** Hierarchy */{
		var stack = this.stack;
		for (var i = stack.length - 1; i > -1; -- i) {
			cb(stack[i]);
		}
		return this;
	}

	/**
	 * Create a new Class that inherits from this class.
	 * 
	 * Merge 'options' and 'requires' properties.
	 * 
	 * @param parent parent class to extends
	 * @param child new child class
	 * @param [o] options to add to child's prototype
	 */
	$Crabapple.extend = function(/** Function */parent, /** Function */child, /** Object */o){
		o = o || {};
		var fn = function(){};

		fn.prototype = parent.prototype;
		child.prototype = new fn();
		child.prototype.parentClass = parent.prototype;
		child.prototype.constructor = child;

		for (var key in o) {
			child.prototype[key] = o[key];
		}

		var h = new Hierarchy(child).map(function(ancestor){
			return 'options' in ancestor;

		}).apply(function(ancestor){
			$.extend(child.prototype.options, ancestor.options);
		});
		
		h.set(child).map(function(ancestor){
			return 'requires' in ancestor;

		}).apply(function(ancestor){
			$.extend(child.prototype.requires, ancestor.requires);
		});
	};

	/**
	 * Instantiate new instance of specified type.
	 * 
	 * Calls init() methods step-by-step.
	 * 
	 * @param type type to instantiate
	 * @param args arguments for init() method
	 * @returns initialized new instance of type
	 */
	$Crabapple.instantiate = function(/** Function */type, /** Array */args)/** Object */{
		var o = new type();
		new Hierarchy(type).map(function(ancestor){
			return 'init' in ancestor;

		}).apply(function(ancestor){
			ancestor.init.apply(o, args);
		});
		return o;
	};

})(jQuery);/* module.js */
/**
 * Crabapple Module class is a base parent class for all Crabapple Modules
 */
(function($) {
	$Crabapple.Module = function(){};
	
	$Crabapple.extend($Crabapple.Class, $Crabapple.Module, {
		/**
		 * Default module class options
		 * 
		 * @type Object
		 */
		options: {},

		/**
		 * @type Array
		 */
		required: [],

		/**
		 * Initialize method. Called by chain.
		 * 
		 * @param options
		 * @param elem
		 */
		init: function(/** DOMElement */elem, /** Object */options){
			this.elem  = elem;
			this.$elem = $(elem);
			$.extend(this.options, options);
		}
	});
}) (jQuery);/* utils.js */
(function($) {
	/**
	 * @namespace Holds Crabapple utils methods
	 */
	$Crabapple.utils = {};
		
	$Crabapple.utils.DateTime = {};
	$Crabapple.utils.DateTime.currentDate = false;
	$Crabapple.utils.DateTime.format = function(format) {
		var returnStr = '';
		var replace = this.replaceChars;
		for (var i = 0; i < format.length; i++) {
			var curChar = format.charAt(i);
			if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
				returnStr += curChar;
			}
			else if (replace[curChar]) {
				returnStr += replace[curChar].call(this);
			} else if (curChar != "\\") {
				returnStr += curChar;
			}
		}

		return returnStr;
	};
	
	$Crabapple.utils.DateTime.replaceChars = {
		shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

		// Day
		d: function() { return (this.currentDate.getDate() < 10 ? '0' : '') + this.currentDate.getDate(); },
		D: function() { return this.replaceChars.shortDays[this.currentDate.getDay()]; },
		j: function() { return this.currentDate.getDate(); },
		l: function() { return this.replaceChars.longDays[this.currentDate.getDay()]; },
		N: function() { return this.currentDate.getDay() + 1; },
		S: function() { return (this.currentDate.getDate() % 10 == 1 && this.currentDate.getDate() != 11 ? 'st' : (this.currentDate.getDate() % 10 == 2 && this.currentDate.getDate() != 12 ? 'nd' : (this.currentDate.getDate() % 10 == 3 && this.currentDate.getDate() != 13 ? 'rd' : 'th'))); },
		w: function() { return this.currentDate.getDay(); },
		z: function() { var d = new Date(this.currentDate.getFullYear(),0,1); return Math.ceil((this.currentDate - d) / 86400000); }, // Fixed now
		// Week
		W: function() { var d = new Date(this.currentDate.getFullYear(), 0, 1); return Math.ceil((((this.currentDate - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
		// Month
		F: function() { return this.replaceChars.longMonths[this.currentDate.getMonth()]; },
		m: function() { return (this.currentDate.getMonth() < 9 ? '0' : '') + (this.currentDate.getMonth() + 1); },
		M: function() { return this.replaceChars.shortMonths[this.currentDate.getMonth()]; },
		n: function() { return this.currentDate.getMonth() + 1; },
		t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
		// Year
		L: function() { var year = this.currentDate.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
		o: function() { var d  = new Date(this.currentDate.valueOf());  d.setDate(d.getDate() - ((this.currentDate.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
		Y: function() { return this.currentDate.getFullYear(); },
		y: function() { return ('' + this.currentDate.getFullYear()).substr(2); },
		// Time
		a: function() { return this.currentDate.getHours() < 12 ? 'am' : 'pm'; },
		A: function() { return this.currentDate.getHours() < 12 ? 'AM' : 'PM'; },
		B: function() { return Math.floor((((this.currentDate.getUTCHours() + 1) % 24) + this.currentDate.getUTCMinutes() / 60 + this.currentDate.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
		g: function() { return this.currentDate.getHours() % 12 || 12; },
		G: function() { return this.currentDate.getHours(); },
		h: function() { return ((this.currentDate.getHours() % 12 || 12) < 10 ? '0' : '') + (this.currentDate.getHours() % 12 || 12); },
		H: function() { return (this.currentDate.getHours() < 10 ? '0' : '') + this.currentDate.getHours(); },
		i: function() { return (this.currentDate.getMinutes() < 10 ? '0' : '') + this.currentDate.getMinutes(); },
		s: function() { return (this.currentDate.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
		u: function() { var m = this.currentDate.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; },
		// Timezone
		e: function() { return "Not Yet Supported"; },
		I: function() { return "Not Yet Supported"; },
		O: function() { return (-this.currentDate.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.currentDate.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.currentDate.getTimezoneOffset() / 60)) + '00'; },
		P: function() { return (-this.currentDate.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.currentDate.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.currentDate.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
		T: function() { var m = this.currentDate.getMonth(); this.currentDate.setMonth(0); var result = this.currentDate.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.currentDate.setMonth(m); return result;},
		Z: function() { return -this.currentDate.getTimezoneOffset() * 60; },
		// Full Date/Time
		c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
		r: function() { return this.currentDate.toString(); },
		U: function() { return this.currentDate.getTime() / 1000; }
	};
	
	/**
	 * "2009-04-29 08:53:31" => relative time format
	 * "2009-04-29T08:53:31+0000" => relative time format
	 * object Date => relative time format
	 */
	$Crabapple.utils.DateTime.relativeTime = function(originalDate) {
		formatPattern = (arguments[1] && arguments[1].length > 0) ? arguments[1] : "F d, Y";
		if(originalDate instanceof Date){
			this.currentDate = originalDate;
		}else{
			currentDate = (originalDate || "").replace(/-/g,"/").replace(/TZ/g," ").replace(/\+(\w+)/g,"")
			this.currentDate  = new Date(currentDate);
		}
		this.currentDate.setMinutes(this.currentDate.getMinutes()-(new Date()).getTimezoneOffset()); /* takes into account the time zone */
		var diff = (((new Date()).getTime() - this.currentDate.getTime()) / 1000);
		var day_diff = Math.floor(diff / 86400);
			
		if ( isNaN(day_diff) || day_diff < 0)
			return;
		
		return day_diff == 0 && (
				diff < 60 && "just now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "Yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			day_diff < 30 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
			day_diff < 365 && Math.floor( day_diff / 30 ) + " months ago" ||
			this.format(formatPattern);
	};
	
	
	/**
	 * replace links in text to their html compliance
	 */
	$Crabapple.utils.linkToHtml = function(elm) {
		var returning = [];
		var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
		elm.each(function() {
			returning.push(this.replace(regexp,"<a href=\"$1\">$1</a>"));
		});

		return jQuery(returning);
	}
}) (jQuery); /* search.js */
/**
 * Search module
 * @class Search
 * @package CC
 */
(function($) {
	$Crabapple.Search = function(){};

	$Crabapple.extend($Crabapple.Module, $Crabapple.Search, {
		onMouseClick	: function() {},
		onElementFocus	: function() {},
		searchContainer	: null,
		localSearchBtn	: null,
		webSearchBtn	: null,
		
		options: {
			searchLabel: 'Search',
			searchContainerSelector: '',
			webSearchSelector: '',
			localSearchSelector: ''
		},
		/**
		 * init params and handlers
		 */
		init: function(elem, options)
		{
			this.searchContainer = $(this.options.searchContainerSelector);
			this.localSearchBtn = $(this.options.localSearchSelector, this.searchContainer);
			this.webSearchBtn = $(this.options.webSearchSelector, this.searchContainer);
			this.onElementActivities();
			this.onMouseClick();
			
		},
		/**
		 * add on click event handling 
		 */
		onMouseClick: function()
		{
			this.webSearchBtn.unbind().bind('click', $.proxy(function() {
				window.open(config.getSiteSearchEngine() + this.$elem.val().replace(/ /g,"+"));
				return false;
			}, this));
		},
		/**
		 * processing of serch elements behavior 
		 */
		onElementActivities: function()
		{
			this.$elem.parents('form:first').bind('submit', $.proxy(function(e) {
				if (this.$elem.val().length == 0 || ($.data(this.$elem).edited != true)) {
					this.$elem.val('');
					this.$elem.trigger('focus');
					return false;
				}
			}, this));

			this.$elem.unbind().bind('blur', $.proxy(function() {
				
				if (this.$elem.val().length == 0) {
					this.$elem.val(this.options.searchLabel);
					$.data(this.$elem, 'edited', false);
				}
				
			}, this)).bind('focus', $.proxy(function () {
				
				if ($.data(this.$elem).edited != true) {
					this.$elem.val('');
				}
				
			}, this)).bind('keyup', $.proxy(function(event) {

				$.data(this.$elem, 'edited', (this.$elem.val().length == 0) ? false : true);
				
			}, this));
			
			this.webSearchBtn.unbind().bind('click', $.proxy(function() {
				window.open(config.getSiteSearchEngine() + this.$elem.val().replace(/ /g,"+"));
				return false;
			}, this));
		}

	});
	$.pluginize('search', $Crabapple.Search, $Crabapple);
}) (jQuery);/* tweetriver.js */
(function($) {
	$Crabapple.TweetRiver = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.TweetRiver, {
		beforeLoadTweets: function () {},
		afterLoadTweets: function (container, tweets) {
			return tweets;
		},

		init: function (elm, options) {
			this.loadTweets($(elm));
		},

		loadTweets: function (container) {
			if(this.options.feedUrl) {
				feedUrl = this.options.feedUrl;
			} else {
				feedUrl = config.getTweetRiverUrl() + config.getTweetRiverFeed() + '.' + config.getTweetRiverType();
			}
			jQuery.ajax ({
				url: feedUrl,
				dataType: 'jsonp',
				cache: 'true',
				scriptCharset:	'utf-8',
				beforeSend: jQuery.proxy(function () {
					if (typeof (this.options.beforeLoadTweets) == 'function') {
						this.options.beforeLoadTweets ();
					} else {
						this.beforeLoadTweets ();
					}
				}, this),
				success: jQuery.proxy(function (data) {
					if (typeof (this.options.afterLoadTweets) == 'function') {
						this.options.afterLoadTweets (container, data);
					} else {
						this.afterLoadTweets (container, data);
					}
				}, this)
			});
		}
	});

}) (jQuery);/* flux_widget.js */
(function($) {
	$Crabapple.FluxWidget = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.FluxWidget, {

		afterLoadWidgets: function (widgetObj, widget) {},

		/**
		 * flux widgets initialization
		 */
		init: function (widget, options) {
			widget = $(widget);

			if (typeof (getIndex) == 'undefined') {
				getIndex = this.getIndex();
			}

			if (typeof (MTVN) == 'undefined' || typeof (MTVN.conf) == 'undefined') {
				if (typeof (MTVN) == 'undefined') MTVN = {};
				MTVN.conf = MTVN.conf || {};
				MTVN.conf.flux4 = MTVN.conf.flux4 || {};
				MTVN.conf.flux4['ucid'] = config.getFluxCommunityId();
				MTVN.conf.flux4['widgets'] = {};
			}

			var widgetId = widget.data('widget') + '_' + getIndex();

			MTVN.conf.flux4['widgets'][widgetId] = {
				'name': this.getWidgetName(widget),
				'opts': this.getWidgetConfig(widget),
				'onLoad': $.proxy(function (widgetObj) {
					this.afterLoadWidgets(widgetObj, widget);
				}, this)
			};

			widget.data('widget', widgetId);

			widget.flux4();
		},

		/**
		 * function returned flux widget identefication
		 */
		getIndex: function () {
			var index = 0;
			return function () {
				return ++ index;
			}
		},

		/**
		 * return widget name
		 */
		getWidgetName: function (widget) {
			return widget.data('widget');
		},

		/**
		 * return widget options
		 */
		getWidgetConfig: function (widget) {
			var opts = {};

			// run method to get widget config by it type
			if(typeof this['get' + widget.data('widget') + 'Config'] == 'function') {
				opts = eval('this.get' + widget.data('widget') + 'Config')(widget);
			}
			return opts;
		},

		/**
		 * return activity feed configuration
		 */
		getActivityFeedConfig: function (widget) {
			return {};
		},

		/**
		 * get contentUri from dom element and return share button configuration
		 */
		getShareConfig: function (widget) {
			return {};
		},

		/**
		 * return user bar configuration
		 */
		getUserBarConfig: function (widget) {
			return {};
		}
	});

	/**
	 * Get content json feed by mgid
	 */
	$Crabapple.FluxWidget.requestContentFeed = function (mgid, func) {
		$.ajax({
			url: config.getFluxBaseHref() + '/2.0/00001/JSON/' + config.getFluxCommunityId() + '/feeds/content/?q=' + mgid,
			dataType: 'jsonp',
			success: func,
			cache: true,
			jsonpCallback: mgid.replace(/[^A-Za-z0-9]/gi,"")
		});
	}

	/**
	 * Get comments json feed by mgid
	 */
	$Crabapple.FluxWidget.requestCommentsFeed = function (mgid, maxResults, func) {
		var max = "";
		var mgidString;
		if(maxResults != null && !isNaN(maxResults = parseInt(maxResults))){
			max="?max-results="+maxResults;
			mgidString ="&q="+mgid;
		}else{
			mgidString ="?q="+mgid;
		}
		$.ajax({
			url: config.getFluxBaseHref() + '/2.0/00001/JSON/' + config.getFluxCommunityId() + '/feeds/Content'+max+mgidString,
			dataType: 'jsonp',
			success: func,
			cache: true,
			jsonpCallback: mgid.replace(/[^A-Za-z0-9]/gi,"")
		});
	}

	/**
	 * Get comments on all GT comunity content
	 * 
	**/
	$Crabapple.FluxWidget.requestCommentsRiver = function (maxResults, func) {
		if(maxResults == null && isNaN(maxResults = parseInt(maxResults))){	maxResults="2";	}
		$.ajax({
			url: config.getFluxActivityBaseHref()+'/api/ActivityService/FindActivities?communityId=' + config.getFluxCommunityId() + '&contentId=&dashboardShowAllCommunities=false&dashboardShowCommunityFeed=false&dashboardShowOnlyFollowFeed=false&activityType=&activityFeedFilter=Comments&maxResults='+maxResults+'&cultureLcid=0&nextPageToken=&sortByTopCounter=false&untilPageToken=&includeChildren=false&includeTweets=true&includeGuestActivities=false&includeRating=true&showParentAddedChild=false&contentAliases=&popularActivitiesCount=0&popularActivitiesType=CommentContent',
			dataType: 'jsonp',
			cache: true,
			success: func
		});
	}

	/**
	 * Get following statistics of an content
	 **/
	$Crabapple.FluxWidget.requestFollowingStats = function(mgid, func){
		console.log(mgid)
		$.ajax({
			url: config.getFluxBaseHref() + '/2.0/00001/JSON/' + config.getFluxCommunityId() + "/feeds/FollowingStats/?q="+mgid,
			dataType: 'jsonp',
			success: func,
			cache: true,
			jsonpCallback: mgid.replace(/[^A-Za-z0-9]/gi,"")
		});
	}

	/**
	 * Performs item tracking
	 **/
	$Crabapple.FluxWidget.requestItemTracking = function(mgid, func){
		$.ajax({
			url: config.getFluxBaseHref() + '/2.0/00001/JSON/' + config.getFluxCommunityId() + '/Action/Follow?product=API&productLocation=brand',
			type: 'POST',
			parameters: {"contentUri":mgid,"FollowingService":"flux"},
			crossDomain: true,
			success: func,
			cache: true,
			jsonpCallback: mgid.replace(/[^A-Za-z0-9]/gi,"")
		});
	}

	/**
	 * Get information about currently logged user and comunity.
	 **/
	$Crabapple.FluxWidget.requestUserCoumunityInfo = function(func){
		window.getUserComunityInfo = function(context){
			func(context);
		}
		$.getScript("http://cus.flux.com/api/ContextService/Context?communityUcid="+config.getFluxCommunityId()+"&callback=getUserComunityInfo");
	}
	
}) (jQuery);/* selectbox.js */
/**
 * Selectbox module
 * @class Selectbox
 * @package CC
 * @author shcherba
 */
(function($) {
	$Crabapple.Selectbox = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.Selectbox, {
		el: null,
		options: {
			classHolder: 'sb_holder',
			classHolderDisabled: 'sb_holder_disabled',
			classSelector: 'sb_selector',
			classOptions: 'sb_options',
			classGroup: 'sb_group',
			classSub: 'sb_sub',
			classDisabled: 'sb_disabled',
			classToggleOpen: 'sb_toggle_open',
			classToggle: 'sb_toggle',
			speed: 200,
			effect: "slide", // "slide" or "fade"
			onChange: null,  // Define a callback function when the selectbox is changed
			onOpen: null,    // Define a callback function when the selectbox is open
			onClose: null    // Define a callback function when the selectbox is closed
		},
		init: function (elm, options) {
			if (options.classHolder)         this.options.classHolder         = options.classHolder;
			if (options.classHolderDisabled) this.options.classHolderDisabled = options.classHolderDisabled;
			if (options.classSelector)       this.options.classSelector       = options.classSelector;
			if (options.classOptions)        this.options.classOptions        = options.classOptions;
			if (options.classGroup)          this.options.classGroup          = options.classGroup;
			if (options.classSub)            this.options.classSub            = options.classSub;
			if (options.classDisabled)       this.options.classDisabled       = options.classDisabled;
			if (options.classToggleOpen)     this.options.classToggleOpen     = options.classToggleOpen;
			if (options.classToggle)         this.options.classToggle         = options.classToggle;
			if (options.speed)               this.options.speed               = options.speed;
			if (options.effect)              this.options.effect              = options.effect;
			if (options.onChange)            this.options.onChange            = options.onChange;
			if (options.onOpen)              this.options.onOpen              = options.onOpen;
			if (options.onClose)             this.options.onClose             = options.onClose;
			this.el = elm;
			$(elm).selectbox(this.options);
		},
		enable: function(){
			$(this.el).selectbox('enable');
		},
		disable: function(){
			$(this.el).selectbox('disable');
		},
		show: function(){
			$(this.el).selectbox('show');
		},
		hide: function(){
			$(this.el).selectbox('hide');
		}
	});
	
	$.pluginize('selectboxx', $Crabapple.Selectbox, $Crabapple);
}) (jQuery);/* pagination.js */
/**
 * Pagination module
 * @class Pagination
 * @package CC
 * @author shcherba
 */
(function($){
	$Crabapple.Pagination = function(){
	};
	
	$Crabapple.extend($Crabapple.Module, $Crabapple.Pagination, {
		options: {
			context: null,
			reloadArea: null,
			paginationContainer: null,
			onClick: function(){
			},
			pequestParams: {},
			afterLoadHandler: null,
			afterLoadHandlerContext: null,
			fragmentLlink: '',
			paginationHolder: '.pagination_wrap',
			spinnerTemplate: "<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>",
			scrollToTop: false
		},
		/**
		 * init params and handlers
		 */
		init: function(elm, options){
			this._options = options ? options : this._options;
			this.options.context = (options.context) ? options.context : this;
			this.options.onClick = (options.onClick) ? options.onClick : this.ajaxPageReload;
			$.extend(this.options, options);
			this.initActions(elm);
		},
		/**
		 * @param {Object} block
		 */
		initActions: function(block){
			var self = this;
			$(block).undelegate('click');
			$(block).delegate('a', 'click', function(e){
				var page = $(e.target).attr("href").match(/currentPage=([0-9]+)/)[1];
				self.options.onClick.apply(self.options.context, [page ? page : '']);
				return false;
			});
		},
		/**
		 * @param {Object} data
		 */
		ajaxReloadActions: function(data){
			$Crabapple(this.elem).remove();
			$(this.options.reloadArea).empty();
			$(this.options.reloadArea).html(data);
			var elem = $($(this.options.paginationHolder), this.options.reloadArea)[0];
			this._reload(elem);
			
			if (this.options.afterLoadHandler) {
				delete this.options.pequestParams.currentPage;
				this.options.afterLoadHandler.call(this.options.afterLoadHandlerContext, this.options.pequestParams);
			}
		},
		/**
		 * @param {init} page
		 */
		ajaxPageReload: function(page){
			//add page param into request
			this.options.pequestParams.currentPage = page;
			//show spinner
			$(this.options.reloadArea).html(this.options.spinnerTemplate);
			//scroll to Top if needed
			if (this.options.scrollToTop == true){
				$(document).scrollTop(0);
			}
			$.ajax({
				url: this.options.fragmentLlink,
				type: 'GET',
				data: this.options.pequestParams,
				context: this,
				success: function(data){
					this.ajaxReloadActions(data);
				},
				error: function(data){
					//this.ajaxReloadActions(data);
				}
			});
		},
		
		_reload: function(newElem, options){
			this.elem = this.$elem = null;
			$.extend(this._options, options);
			this.init(newElem, this._options);
		}
	});
	
	$.pluginize('pagination', $Crabapple.Pagination, $Crabapple);
	
})(jQuery);
/* player.js */
(function($) {
	$Crabapple.Player = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.Player, {

		player: new Array(),				
		
	

		init: function (elm, options) {
			//this.onReady = this.options.onReady;

			//********************
			var autoPlay = $(elm).attr('data-autoplay');
			var configParams = escape("site=" + config.getMediaConfigParamSite());
			if (config.getMediaFreewheelNID()) {
				configParams += escape("&nid=" + config.getMediaFreewheelNID());	
			} 
			if (typeof(siteSectionId) == 'undefined') { siteSectionId = 'The_Daily_Show_Home'; }
		
			var flashvars = { sid:siteSectionId, autoPlay:autoPlay, configParams:configParams };
		
			var parobj = {
				wmode:'opaque',
				bgcolor: $(elm).attr('data-bgcolor'),
				seamlesstabbing:true,
				swliveconnect:true,
				allowscriptaccess:'always',
				allownetworking:'all',
				allowfullscreen:true
			};
			
			var mgid = $(elm).attr('data-mgid');
			var width = $(elm).attr('data-width');
			var height = $(elm).attr('data-height');
			
			$Crabapple.playerA = this;

			this.player[$(elm).attr('id')] = new MTVNPlayer.Player($(elm).attr('id'),
				{
					width:width,
					height:height,
					uri:mgid,
					flashVars:flashvars,
					params:parobj
				},
				{
					onReady:this.onReady,
					onMetadata:this.onMetadata,
					onMediaEnd:this.onMediaEnd,
					onPlayheadUpdate:this.onPlayheadUpdate,
					onStateChange:this.onStateChange,
					onPlaylistComplete:this.onPlaylistComplete
				}		
				

			);
						
			return this.player;
				
			//**********************			
			
		},
	
		onReady:function(event){},				
		onMetadata:function(event){},		
		onMediaEnd:function(event){},		
		onPlayheadUpdate:function(event){},	
		onStateChange:function(event){},
		onPlaylistComplete:function(event){}
	});

	$.pluginize('player', $Crabapple.Player, $Crabapple);

}) (jQuery);/* cc.js */
/**
 * Creates $CC global object which will hold all CC javascript stuff
 */
(function($) {
	$CC = $.namespace('CC'); 
}) (jQuery);/* tabs.js */
/**
 * @license 
 * jQuery Tools @VERSION Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 *
 * Since: November 2008
 * Date: @DATE 
 */  
(function($) {
		
	// static constructs
	$.tools = $.tools || {version: '@VERSION'};
	
	$.tools.tabs = {
		
		conf: {
			tabs: 'a',
			current: 'current',
			onBeforeClick: null,
			onClick: null, 
			effect: 'default',
			initialIndex: 0,			
			event: 'click',
			rotate: false,
			
			// 1.2
			history: false
		},
		
		addEffect: function(name, fn) {
			effects[name] = fn;
		}
		
	};
	
	var effects = {
		
		// simple "toggle" effect
		'default': function(i, done) { 
			this.getPanes().hide().eq(i).show();
			done.call();
		}, 
		
		/*
			configuration:
				- fadeOutSpeed (positive value does "crossfading")
				- fadeInSpeed
		*/
		fade: function(i, done) {		
			
			var conf = this.getConf(),            
				 speed = conf.fadeOutSpeed,
				 panes = this.getPanes();
			
			if (speed) {
				panes.fadeOut(speed);	
			} else {
				panes.hide();	
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);	
		},
		
		// for basic accordions
		slide: function(i, done) {
			this.getPanes().slideUp(200);
			this.getPanes().eq(i).slideDown(400, done);			 
		}, 

		/**
		 * AJAX effect
		 */
		ajax: function(i, done)  {			
			this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done);	
		}		
	};   	
	
	var w;
	
	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	 */
	$.tools.tabs.addEffect("horizontal", function(i, done) {
	
		// store original width of a pane into memory
		if (!w) { w = this.getPanes().eq(0).width(); }
		
		// set current pane's width to zero
		this.getCurrentPane().animate({width: 0}, function() { $(this).hide(); });
		
		// grow opened pane to it's original width
		this.getPanes().eq(i).animate({width: w}, function() { 
			$(this).show();
			done.call();
		});
		
	});	

	
	function Tabs(root, paneSelector, conf) {
		
		var self = this, 
			 trigger = root.add(this),
			 tabs = root.find(conf.tabs),
			 panes = paneSelector.jquery ? paneSelector : root.children(paneSelector),			 
			 current;
			 
		
		// make sure tabs and panes are found
		if (!tabs.length)  { tabs = root.children(); }
		if (!panes.length) { panes = root.parent().find(paneSelector); }
		if (!panes.length) { panes = $(paneSelector); }
		
		
		// public methods
		$.extend(this, {				
			click: function(i, e) {
				
				var tab = tabs.eq(i);												 
				
				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}
								
				if (conf.rotate) {
					var last = tabs.length -1; 
					if (i < 0) { return self.click(last, e); }
					if (i > last) { return self.click(0, e); }						
				}
				
				if (!tab.length) {
					if (current >= 0) { return self; }
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}				
				
				// current tab is being clicked
				if (i === current) { return self; }
				
				// possibility to cancel click action				
				e = e || $.Event();
				e.type = "onBeforeClick";
				trigger.trigger(e, [i]);				
				if (e.isDefaultPrevented()) { return; }

				// call the effect
				effects[conf.effect].call(self, i, function() {

					// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [i]);					
				});			
				
				// default behaviour
				current = i;
				tabs.removeClass(conf.current);	
				tab.addClass(conf.current);				
				
				return self;
			},
			
			getConf: function() {
				return conf;	
			},

			getTabs: function() {
				return tabs;	
			},
			
			getPanes: function() {
				return panes;	
			},
			
			getCurrentPane: function() {
				return panes.eq(current);	
			},
			
			getCurrentTab: function() {
				return tabs.eq(current);	
			},
			
			getIndex: function() {
				return current;	
			}, 
			
			next: function() {
				return self.click(current + 1);
			},
			
			prev: function() {
				return self.click(current - 1);	
			},
			
			destroy: function() {
				tabs.unbind(conf.event).removeClass(conf.current);
				panes.find("a[href^=#]").unbind("click.T"); 
				return self;
			}
		
		});

		// callbacks	
		$.each("onBeforeClick,onClick".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) {
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;	
			};
		});
	
		
		if (conf.history && $.fn.history) {
			$.tools.history.init(tabs);
			conf.event = 'history';
		}	
		
		// setup click actions for each tab
		tabs.each(function(i) { 				
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});			
		});
		
		// cross tab anchor link
		panes.find("a[href^=#]").bind("click.T", function(e) {
			self.click($(this).attr("href"), e);		
		}); 
		
		// open initial tab
		if (location.hash && conf.tabs == "a" && root.find("[href=" +location.hash+ "]").length) {
			self.click(location.hash);

		} else {
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		}				
		
	}
	
	
	// jQuery plugin implementation
	$.fn.tabs = function(paneSelector, conf) {
		
		// return existing instance
		var el = this.data("tabs");
		if (el) { 
			el.destroy();	
			this.removeData("tabs");
		}

		if ($.isFunction(conf)) {
			conf = {onBeforeClick: conf};
		}
		
		// setup conf
		conf = $.extend({}, $.tools.tabs.conf, conf);		
		
		
		this.each(function() {				
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("tabs", el); 
		});		
		
		return conf.api ? el: this;		
	};		
		
}) (jQuery); 


/* tabs.slideshow.js */
/**
 * @license 
 * jQuery Tools @VERSION Slideshow - Extend it.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/slideshow.html
 *
 * Since: September 2009
 * Date: @DATE 
 */
(function($) {
	
	var tool;
	
	tool = $.tools.tabs.slideshow = { 

		conf: {
			next: '.forward',
			prev: '.backward',
			disabledClass: 'disabled',
			autoplay: false,
			autopause: true,
			interval: 3000, 
			clickable: true,
			api: false
		}
	};  
	
	function Slideshow(root, conf) {
	
		var self = this,
			 fire = root.add(this),
			 tabs = root.data("tabs"),
			 timer, 
			 stopped = true;
		
			 
		// next / prev buttons
		function find(query) {
			var el = $(query);
			return el.length < 2 ? el : root.parent().find(query);	
		}	
		
		var nextButton = find(conf.next).click(function() {
			tabs.next();		
		});
		
		var prevButton = find(conf.prev).click(function() {
			tabs.prev();		
		}); 


		// extend the Tabs API with slideshow methods			
		$.extend(self, {
				
			// return tabs API
			getTabs: function() {
				return tabs;	
			},
			
			getConf: function() {
				return conf;	
			},
				
			play: function() {
	
				// do not start additional timer if already exists
				if (timer) { return self; }	
				
				// onBeforePlay
				var e = $.Event("onBeforePlay");
				fire.trigger(e);				
				if (e.isDefaultPrevented()) { return self; }				
				
				
				// construct new timer
				timer = setInterval(tabs.next, conf.interval);
				stopped = false;				
				
				// onPlay
				fire.trigger("onPlay");				
				
				return self;
			},
		
			pause: function() {
				
				if (!timer) { return self; }

				// onBeforePause
				var e = $.Event("onBeforePause");
				fire.trigger(e);					
				if (e.isDefaultPrevented()) { return self; }		
				
				timer = clearInterval(timer);
				
				// onPause
				fire.trigger("onPause");	
				
				return self;
			},
			
			// when stopped - mouseover won't restart 
			stop: function() {					
				self.pause();
				stopped = true;	
			}
			
		});

		// callbacks	
		$.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods				
			self[name] = function(fn) {
				return $(self).bind(name, fn);
			};
		});	
		
	
		/* when mouse enters, slideshow stops */
		if (conf.autopause) {
			tabs.getTabs().add(nextButton).add(prevButton).add(tabs.getPanes()).hover(self.pause, function() {
				if (!stopped) { self.play(); }		
			});
		} 
		
		if (conf.autoplay) {
			self.play();	
		}
		
		if (conf.clickable) {
			tabs.getPanes().click(function()  {
				tabs.next();
			});
		} 
		
		// manage disabling of next/prev buttons
		if (!tabs.getConf().rotate) {
			
			var disabled = conf.disabledClass;
			
			if (!tabs.getIndex()) {
				prevButton.addClass(disabled);
			}
			
			tabs.onBeforeClick(function(e, i)  { 
				prevButton.toggleClass(disabled, !i);
				nextButton.toggleClass(disabled, i == tabs.getTabs().length -1); 
			});
		}  
	}
	
	// jQuery plugin implementation
	$.fn.slideshow = function(conf) {
	
		// return existing instance
		var el = this.data("slideshow");
		if (el) { return el; }
 
		conf = $.extend({}, tool.conf, conf);		
		
		this.each(function() {
			el = new Slideshow($(this), conf);
			$(this).data("slideshow", el); 			
		});	
		
		return conf.api ? el : this;
	};
	
})(jQuery); 

/* ZeroClipboard.js */
// Simple Set Clipboard System
// Author: Joseph Huckaby

var ZeroClipboard = {
	
	version: "1.0.7",
	clients: {}, // registered upload clients on page, indexed by id
	moviePath: 'ZeroClipboard.swf', // URL to movie
	nextId: 1, // ID of next movie
	
	$: function(thingy) {
		// simple DOM lookup utility function
		if (typeof(thingy) == 'string') thingy = document.getElementById(thingy);
		if (!thingy.addClass) {
			// extend element with a few useful methods
			thingy.hide = function() { this.style.display = 'none'; };
			thingy.show = function() { this.style.display = ''; };
			thingy.addClass = function(name) { this.removeClass(name); this.className += ' ' + name; };
			thingy.removeClass = function(name) {
				var classes = this.className.split(/\s+/);
				var idx = -1;
				for (var k = 0; k < classes.length; k++) {
					if (classes[k] == name) { idx = k; k = classes.length; }
				}
				if (idx > -1) {
					classes.splice( idx, 1 );
					this.className = classes.join(' ');
				}
				return this;
			};
			thingy.hasClass = function(name) {
				return !!this.className.match( new RegExp("\\s*" + name + "\\s*") );
			};
		}
		return thingy;
	},
	
	setMoviePath: function(path) {
		// set path to ZeroClipboard.swf
		this.moviePath = path;
	},
	
	dispatch: function(id, eventName, args) {
		// receive event from flash movie, send to client		
		var client = this.clients[id];
		if (client) {
			client.receiveEvent(eventName, args);
		}
	},
	
	register: function(id, client) {
		// register new client to receive events
		this.clients[id] = client;
	},
	
	getDOMObjectPosition: function(obj, stopObj) {
		// get absolute coordinates for dom element
		var info = {
			left: 0, 
			top: 0, 
			width: obj.width ? obj.width : obj.offsetWidth, 
			height: obj.height ? obj.height : obj.offsetHeight
		};

		while (obj && (obj != stopObj)) {
			info.left += obj.offsetLeft;
			info.top += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return info;
	},
	
	Client: function(elem) {
		// constructor for new simple upload client
		this.handlers = {};
		
		// unique ID
		this.id = ZeroClipboard.nextId++;
		this.movieId = 'ZeroClipboardMovie_' + this.id;
		
		// register client with singleton to receive flash events
		ZeroClipboard.register(this.id, this);
		
		// create movie
		if (elem) this.glue(elem);
	}
};

ZeroClipboard.Client.prototype = {
	
	id: 0, // unique ID for us
	ready: false, // whether movie is ready to receive events or not
	movie: null, // reference to movie object
	clipText: '', // text to copy to clipboard
	handCursorEnabled: true, // whether to show hand cursor, or default pointer cursor
	cssEffects: true, // enable CSS mouse effects on dom container
	handlers: null, // user event handlers
	
	glue: function(elem, appendElem, stylesToAdd) {
		// glue to DOM element
		// elem can be ID or actual DOM element object
		this.domElement = ZeroClipboard.$(elem);
		
		// float just above object, or zIndex 99 if dom element isn't set
		var zIndex = 99;
		if (this.domElement.style.zIndex) {
			zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
		}
		
		if (typeof(appendElem) == 'string') {
			appendElem = ZeroClipboard.$(appendElem);
		}
		else if (typeof(appendElem) == 'undefined') {
			appendElem = document.getElementsByTagName('body')[0];
		}
		
		// find X/Y position of domElement
		var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);
		
		// create floating DIV above element
		this.div = document.createElement('div');
		var style = this.div.style;
		style.position = 'absolute';
		style.left = '' + box.left + 'px';
		style.top = '' + box.top + 'px';
		style.width = '' + box.width + 'px';
		style.height = '' + box.height + 'px';
		style.zIndex = zIndex;
		
		if (typeof(stylesToAdd) == 'object') {
			for (addedStyle in stylesToAdd) {
				style[addedStyle] = stylesToAdd[addedStyle];
			}
		}
		
		// style.backgroundColor = '#f00'; // debug
		
		appendElem.appendChild(this.div);
		
		this.div.innerHTML = this.getHTML( box.width, box.height );
	},
	
	getHTML: function(width, height) {
		// return HTML for movie
		var html = '';
		var flashvars = 'id=' + this.id + 
			'&width=' + width + 
			'&height=' + height;
			
		if (navigator.userAgent.match(/MSIE/)) {
			// IE gets an OBJECT tag
			var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
			html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
		}
		else {
			// all other browsers get an EMBED tag
			html += '<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
		}
		return html;
	},
	
	hide: function() {
		// temporarily hide floater offscreen
		if (this.div) {
			this.div.style.left = '-2000px';
		}
	},
	
	show: function() {
		// show ourselves after a call to hide()
		this.reposition();
	},
	
	destroy: function() {
		// destroy control and floater
		if (this.domElement && this.div) {
			this.hide();
			this.div.innerHTML = '';
			
			var body = document.getElementsByTagName('body')[0];
			try { body.removeChild( this.div ); } catch(e) {;}
			
			this.domElement = null;
			this.div = null;
		}
	},
	
	reposition: function(elem) {
		// reposition our floating div, optionally to new container
		// warning: container CANNOT change size, only position
		if (elem) {
			this.domElement = ZeroClipboard.$(elem);
			if (!this.domElement) this.hide();
		}
		
		if (this.domElement && this.div) {
			var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
			var style = this.div.style;
			style.left = '' + box.left + 'px';
			style.top = '' + box.top + 'px';
		}
	},
	
	setText: function(newText) {
		// set text to be copied to clipboard
		this.clipText = newText;
		if (this.ready) this.movie.setText(newText);
	},
	
	addEventListener: function(eventName, func) {
		// add user event listener for event
		// event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');
		if (!this.handlers[eventName]) this.handlers[eventName] = [];
		this.handlers[eventName].push(func);
	},
	
	setHandCursor: function(enabled) {
		// enable hand cursor (true), or default arrow cursor (false)
		this.handCursorEnabled = enabled;
		if (this.ready) this.movie.setHandCursor(enabled);
	},
	
	setCSSEffects: function(enabled) {
		// enable or disable CSS effects on DOM container
		this.cssEffects = !!enabled;
	},
	
	receiveEvent: function(eventName, args) {
		// receive event from flash
		eventName = eventName.toString().toLowerCase().replace(/^on/, '');
				
		// special behavior for certain events
		switch (eventName) {
			case 'load':
				// movie claims it is ready, but in IE this isn't always the case...
				// bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
				this.movie = document.getElementById(this.movieId);
				if (!this.movie) {
					var self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 1 );
					return;
				}
				
				// firefox on pc needs a "kick" in order to set these in certain cases
				if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
					var self = this;
					setTimeout( function() { self.receiveEvent('load', null); }, 100 );
					this.ready = true;
					return;
				}
				
				this.ready = true;
				this.movie.setText( this.clipText );
				this.movie.setHandCursor( this.handCursorEnabled );
				break;
			
			case 'mouseover':
				if (this.domElement && this.cssEffects) {
					this.domElement.addClass('hover');
					if (this.recoverActive) this.domElement.addClass('active');
				}
				break;
			
			case 'mouseout':
				if (this.domElement && this.cssEffects) {
					this.recoverActive = false;
					if (this.domElement.hasClass('active')) {
						this.domElement.removeClass('active');
						this.recoverActive = true;
					}
					this.domElement.removeClass('hover');
				}
				break;
			
			case 'mousedown':
				if (this.domElement && this.cssEffects) {
					this.domElement.addClass('active');
				}
				break;
			
			case 'mouseup':
				if (this.domElement && this.cssEffects) {
					this.domElement.removeClass('active');
					this.recoverActive = false;
				}
				break;
		} // switch eventName
		
		if (this.handlers[eventName]) {
			for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
				var func = this.handlers[eventName][idx];
			
				if (typeof(func) == 'function') {
					// actual function reference
					func(this, args);
				}
				else if ((typeof(func) == 'object') && (func.length == 2)) {
					// PHP style object + method, i.e. [myObject, 'myMethod']
					func[0][ func[1] ](this, args);
				}
				else if (typeof(func) == 'string') {
					// name of function
					window[func](this, args);
				}
			} // foreach event handler defined
		} // user defined handler for event
	}
	
};
/* basic_b.js */
/**
 * @author shcherba
 */
$(function () {
	var firs_block_h   = $('#homepage #t1_mc .middle:eq(0)').height();
	var second_block_h = $('#homepage #t1_mc .middle:eq(1)').height();
	if (firs_block_h > second_block_h) {
		$('#homepage #t1_mc .middle:eq(1)').css('min-height',firs_block_h);
	} else {
		$('#homepage #t1_mc .middle:eq(0)').css('min-height', second_block_h);
	}
});
/* cc.collection_player.js */
/* cc.collection_player.js */
var collectionPlayer = {
		
		init : function () {
			
			// onload, show current video meta data
			current = $('.meta_holder').attr('data-current');	

			meta_class = "#meta_" + current;
			current_meta = "#meta_bottom_" + current;		
			
			$(meta_class).show();
			$(current_meta).addClass("current");	
			
			$(".meta_bottom_holder a").live('click', function (event) {
				collectionPlayer.videoClick(this);
				event.preventDefault();
			});				
			
			player = $Crabapple.playerA.player.video_player_box;					
			
			player.events = {
				onReady:collectionPlayer.onPlayerLoaded,
				onStateChange:collectionPlayer.onStateChange
			};			
			
		},
		
		onPlayerLoaded : function() {
			//alert("playing!");
			//collectionPlayer.playVideo(current);
		},
		
		onStateChange : function (event) {
			var state = event.data;
			
			switch (state) {
				case 'playing':
					if (isAd == false) {
						current = player.playlistMetadata.index;
						collectionPlayer.highlightCurrent();						
					}
				break;
				
				case 'paused':
				break;
		
				case 'initializing media':
				break;

				case 'stopped':
				break;				
				
			}
		},	
				
		videoClick : function (elm) {	
			current = $(elm).parents("li").attr('data-current');		
			collectionPlayer.playVideo(current);
		},

		highlightCurrent : function () {	
			var current_id = "#meta_" + current;	
			var current_meta_id = "#meta_bottom_" + current;
			var current_page = current + 1;
			$(".video_description").hide();
			$(current_id).show();
			$(".collection_showcase li").removeClass("current");	
			$(current_meta_id).addClass("current");	
			$("#collection_page_count").html(current_page);
		},
		
		playVideo : function (index) {
			player.playIndex(index);
		}
};

$(function() {
	if ($(".module.collection_player").length) {
		collectionPlayer.init();
	}
});/* cc.embed_code.js */
(function($) {
	$CC('#embed_code').each(function(index) {
		var current_player = $Crabapple.playerA.player.video_player_box;
		
		/*
		$(this).unbind("click").bind({
			click:function(){
				embed_code = current_player.getEmbedCode();
				alert(embed_code);	
        		return false;
			}
    	}); 
    	*/
		
		$(this).live('click', function (event) {
			embed_code = current_player.getEmbedCode();
			alert(embed_code);				
		});
	
	
	});	
})(jQuery);
/* cc.facebook.js */
$(function () {
	if ( !$CC('#fb-root').size() ) {
		$CC('body').append('<div id="fb-root"></div>');
	}
	
	window.fbAsyncInit = function() {
		FB.init({
	    	appId      : config.getFacebookAppId(), // App ID
	      	channelUrl : '//' + config.getSiteBaseHref() + 	'/channel.html', // Channel File
	     	status     : true, // check login status
	      	cookie     : true, // enable cookies to allow the server to access the session
	      	oauth      : true, // enable OAuth 2.0
	      	xfbml      : true  // parse XFBML
	    });
	};

	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
});


//Ensures function that is passed to it waits for facebook to load
function runAfterFacebookInit(callback) {
	if (typeof(window.fbAsyncInit) == 'undefined' || typeof(window.fbAsyncInit.hasRun) == 'undefined' || !window.fbAsyncInit.hasRun){
		setTimeout(function() { runAfterFacebookInit(callback); }, 200);
	} else {
		if (callback) { callback(); }
	};
}

function setLikeButtonReporting() {

	FB.Event.subscribe('edge.create',
	    function(href, widget) {
			shareBarLinkTracking('fblike');
	    }
	);
	
	FB.Event.subscribe('comment.create',
		function(href, widget) {
		commentLinkTracking('fb');
		}
	);
	// commented because throws an error and seems like this function doesn't in use (ENTTECH-1018)
	//window.indexOfLikeSubscribe = FB.Event._subscribersMap["edge.create"].length -1;
}
// Set up Facebook Like Reporting on the page
runAfterFacebookInit(setLikeButtonReporting);/* cc.flux_widget.js */
(function($) {
	$CC.FluxWidget = function () {};

	$Crabapple.extend($Crabapple.FluxWidget, $CC.FluxWidget, {

		afterLoadWidgets: function (widgetObj, widget) {
			if (widget.children().length) {

				// set comments amount
				if ($('.activityFeed', widget).length) {
					
					widgetObj.onDeleted = widgetObj.onCommented = function() {
						$Crabapple.FluxWidget.requestContentFeed(widget.attr('data-contentUri'), function (data) {
							if (data.NumberOfComments == 1) {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comment');
							} else {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comments');
							}
						});
					};					

					// post comments amount on load
					widgetObj.onCommented();
				}
			} else {
				setTimeout($.proxy(function() {this.afterLoadWidgets(widgetObj, widget);}, this), 500);
			}
		},

		init: function () {},

		/**
		 * get activity feed configuration for CC
		 */
		getActivityFeedConfig: function (widget) {
			return {
				enabledFilters: ['Comments'],
				title: widget.data('title'),
				sortingVisible: false,
				maxResults: 15,
				filterVisible: false,
				defaultFilter: 'Comments',
				paginationType: 'loadMore'
			};
		},

		/**
		 * get widget configuration by widget type
		 */
		getWidgetConfig: function (widget) {
			var opts = {};

			switch (widget.attr('data-widget')) {
				case 'ActivityFeed':
					opts = this.getActivityFeedConfig(widget);
					break;

				case 'UserBar':
					opts = this.getUserBarConfig(widget);
					break;

				case 'UserProfile':
					opts = this.getUserProfileConfig(widget);
					break;

				defaut:
					break;
			}

			return opts;
		},

		/**
		 * get confgutarion for user bar
		 */
		getUserBarConfig: function (widget) {
			return {
				displayMode: 'EmbeddedTop',
				elements: [{
					id: 'MyStuff',
					showThumbnail: true
				}]
			};
		},

		/**
		 * get confgutarion for user profile
		 */
		getUserProfileConfig: function (widget) {
			return {
				tabs: [
					{ id: 'Activity', title: 'My Activity', visibility: 'owner' },
					{ id: 'MyUpdates', title: 'My Updates', visibility: 'owner' },
					{ id: 'Account', title: 'Account', visibility: 'owner' }
				]
			};
		}
	});

	$.pluginize('fluxWidget', $CC.FluxWidget, $CC);
}) (jQuery);

$(function () {
	$CC('.flux4Widget').fluxWidget();
	
	$CC('.comments_count').each(function (index, comments_count) {
		$Crabapple.FluxWidget.requestContentFeed($(comments_count).attr('data-contentUri'), function (data) {
			if (data.NumberOfComments) {
				$(comments_count).text($(comments_count).text() + ' ' + data.NumberOfComments);
			} else {
				$(comments_count).find('span').remove();
			}
		});
	});	
});/* cc.google_plus.js */
// Callback function for Google Plus
// Use callback or data-callback in button tag
// obj{ "href":target URL,
//      "state": "on"|"off"}
// obj.state signifies whether the like was turned on or off
function google1Callback(obj) {
	if (String(obj.state) == 'on') {
	 shareBarLinkTracking('google1');
	}
}

$(function () {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
});/* cc.header_twitter.js */
$(function () {
	$CC('.visible_header .twitter_posts').tweetriver();
});/* cc.miniplayer.js */
/* cc.miniplayer.js */
var current;
var isAd = false;

var CCminiPlayer = {
		
		init : function () {
			miniPlayer = $Crabapple.playerA.player.video_player_box;		
			current = 0;
			
			var current_class = "#show_video_" + current;
			$(current_class).addClass("current");
			
			$(".miniplayer .video_thumb").live('click', function (event) {
				CCminiPlayer.videoClick(this);
				event.preventDefault();
			});			
			
			miniPlayer.events = {
				onReady:CCminiPlayer.onPlayerLoaded,
				onStateChange:CCminiPlayer.onStateChange
			};			
			
		},
		
		onPlayerLoaded : function() {
			//alert("playing!");
		},
		
		onStateChange : function (event) {
			var state = event.data;
			
			switch (state) {
				case 'playing':
					if (isAd == false) {
						current = miniPlayer.playlistMetadata.index;
						CCminiPlayer.highlightCurrent();						
					}
				break;
				
				case 'paused':
				break;
		
				case 'initializing media':
				break;

				case 'stopped':
				break;				
				
			}
		},	
				
		videoClick : function (video) {	
			$(".video_thumb").removeClass("current");
			index = video.getAttribute("data-videoindex");
			CCminiPlayer.playVideo(index);
		},

		highlightCurrent : function () {		
			$(".video_thumb").removeClass("current");
			var current_id = "#show_video_" + current;	
			$(current_id).addClass("current");
		},
		
		playVideo : function (index) {
			miniPlayer.playIndex(index);
		}
};

$(function() {
	if ($(".module.miniplayer").length) {
		CCminiPlayer.init();
	}
});/* cc.photo_gallery.js */
$(function () {
		$CC.photoGallery = {	

			initGallery: function (elm) {				
				
				//This is for IE7 
				$("div.gallery_thumbs").hide();
				
				click = 0;				
				feedURL = $(elm).attr("data-feed");
		
				// Number of images to cycle through comes from page data attribute
				last_image = $(elm).attr("data-images-count");
				
				// Initial load comes from page data attribute
				current_image = $(".current_image").attr("data-current");
				image_link = feedURL + current_image;
				$(".current_image").load(image_link, function () {
					if (current_image == 1) {
						$(".nav_previous").addClass("last");	
					}				
				});							
				
				// Initiate navigation functions
				this.nextPhoto(".nav_next");
				this.previousPhoto(".nav_previous");		
				this.showThumbs(".show_thumbs");				
				this.hideThumbs(".hide_thumbs");	
				this.linkThumbs(".photo_link");				
			},
			
			nextPhoto: function (elm) {					
				$(this).each(function() {
					$(elm).bind('click', function (e) {	
						current_image = $(".current_image").attr("data-current");
						current_image_number = parseInt(current_image);
						next_image = current_image_number + 1;	
				
						if (next_image <= last_image ) {						
							$(".current_image").load(feedURL + next_image, function () {
							});								
							$(".current_image").attr("data-current", next_image);
							$(".gallery_navigation a").removeClass("last");
							e.preventDefault();	
							click++;
						} else if (current_image <= last_image) {						
							$(".current_image").load(feedURL + "share", function () {
								var maxHeight = 0;
								$('div.image_holder').each(
									function(){
									  if ( $(this).height() > maxHeight ) 
									  {
										maxHeight = $(this).height();
									  }									 
									}
								);
								$("div.image_holder").css('min-height',maxHeight);
							});
							$(".current_image").attr("data-current", next_image);
							$(elm).addClass("last");
							e.preventDefault();	
							
						}						
					});				
				});				
			},
			
			previousPhoto: function (elm) {					
				$(this).each(function() {			
					$(elm).bind('click', function (e) {	
						$(".gallery_navigation a").removeClass("last");	
						current_image = $(".current_image").attr("data-current");
						current_image_number = parseInt(current_image);
						previous_image = current_image_number - 1;	
				
						if (current_image == 2) {
							$(".current_image").load(feedURL + previous_image, function () {
								// init new Flux elements
								$CC.photoGallery.sharebarUpdate();
							});
							$(".current_image").attr("data-current", previous_image);
							$(elm).addClass("last");
							e.preventDefault();					
						}
						else if (current_image == 1) {
							$(elm).addClass("last");	
							e.preventDefault();	
						}
						else {					
							$(".current_image").load(feedURL + previous_image, function () {
								// init new Flux elements
								$CC.photoGallery.sharebarUpdate();
							});
							$(".current_image").attr("data-current", previous_image);
							e.preventDefault();								
						}	
					});				
				});				
			},			
			
			showThumbs: function (elm) {				
				$(this).each(function() {			
					$(elm).live('click', function (e) {							
						$(".gallery_thumbs").show("slow", function(){$('.photo_gallery>.middle').css('min-height',$('.gallery_thumbs').height()+45);});
						$(this).text("hide thumbnails");
						$(this).removeClass("show_thumbs");
						$(this).addClass("hide_thumbs");				
					});				
				});								
			},
			
			hideThumbs: function (elm) {				
				$(this).each(function() {			
					$(elm).live('click', function (e) {							
						$(".gallery_thumbs").hide("slow");
						$('.photo_gallery>.middle').css('min-height',0);
						$(this).text("view thumbnails");
						$(this).removeClass("hide_thumbs");
						$(this).addClass("show_thumbs");				
					});				
				});								
			},			
			
			linkThumbs: function (elm) {				
				$(this).each(function() {			
					$(elm).bind('click', function (e) {							
						image_link = $(this).attr('href');	
						$(".gallery_navigation a").removeClass("last");
						$(".gallery_thumbs").hide("slow");
						$('.photo_gallery>.middle').css('min-height',0);
						$(".hide_thumbs").text("view thumbnails");
						$(".hide_thumbs").removeClass("hide_thumbs");
						$(".view_thumbnails").addClass("show_thumbs");
						$(".current_image").load(feedURL + image_link, function(){$CC.photoGallery.sharebarUpdate();});

						
						
						$(".current_image").attr('data-current', image_link);
						if (image_link == "1") {
							$("a.nav_previous").addClass("last");		
						}						
						e.preventDefault();	
						
					});				
				});				
			},
			sharebarUpdate: function(){
				window.fbAsyncInit();
			}
		}
		
	$CC.photoGallery.initGallery(".photo_gallery");
});/* cc.player_advance.js */
$(function () {

    $CC.playerAdvance = {	

        init: function (elm) {				
            
            // Find next URL on page
            nextURL = $(elm).attr("data-url");

			// Grab player
			$player_ready = false;
			$video_player = $Crabapple.playerA.player.video_player_box;			

			// Redirect onPlaylistComplete
			$video_player.events.onPlaylistComplete	= function(){
				window.location.href = nextURL;
			}			
			
        }
                            
    }
});

$(function() {
	if ($("#next_video_holder").length) {
		$CC.playerAdvance.init("#next_video_holder");
	}
});/* cc.share_bar.js */
(function($) {
	$CC('ul.share_bar li.share_button_container a.share_button').each(function(index) {
		var mediaId = $CC(this).attr('data-mediaId');
		
		$(this).unbind("click").bind({
			click:function(){
				$CC("ul.share_button_dropdown[data-mediaId='"+mediaId+"']").slideToggle('fast', function() {
					$CC("a.share_button[data-mediaId='"+mediaId+"']").toggleClass("openButton");	
				});
        		return false;
			}
    	}); 
	});	
	// Embed Button
	$('.embed_clip_container')
		.show()
		.each(function(){
			var clip = new ZeroClipboard.Client();
			// If the location for the SWF movie is not valid then zeroclip will not load
			ZeroClipboard.setMoviePath( '/sitewide/flash/ZeroClipboard.swf' );
			clip.setHandCursor( true );            
			clip.addEventListener('load', function(){});
			clip.addEventListener('mouseOver', function(client){
			    $('.tooltip', client.domElement).show();
			});
			clip.addEventListener('mouseOut', function(client){
			    $('.tooltip', client.domElement).hide()
			});
			clip.addEventListener( 'onMouseDown', function(client){
			    $(".ec_text", client.domElement).hide();
			    $(".ec_text_response", client.domElement).show();
			    clip.setText( $(client.domElement).attr('data') );
			});
			
			clip.glue( $('.embed_clip_button',this)[0], this );
			
		});	
})(jQuery);/* cc.show_header.js */
$(function() {
	var shareUrl = $('.facebook_like').attr('data-url');

    $.getJSON('http://graph.facebook.com/?id=' + shareUrl + '&callback=?', function(data) {
    	var displayed_number = 0,
    		buffer = data.shares,
    		container = $('.show_header .facebook_like');
        if (data.shares) { //if the tip of the day has been "liked" at least once
        	while (buffer != 0) {
        		displayed_number = buffer;
        		buffer = Math.floor(buffer/1000);
        	}
        	if (displayed_number < 100) {
        		container.css('width', '80px');
        	}
        }

    });
});/* cc.show_video_listings.js */
/**
 * Pagination and dropdown for Video Showcase
 */
var showVideoListings = {
	
	init : function () {
	
		$('#video_listings').load(ccVideoShowcaseFeed, function() { });

		$Crabapple('.video_showcase select.custom_dd').selectboxx({
			init: function() {},
			onChange: function(val, inst) {
				season = seasons[val];
				showVideoListings.ajaxLoading(season);						
			}
		});
		
		$(".pagination_wrap ul li a").each(function () {
			$(this).bind('click', function (e) {				
				var link = $(this).attr("href");					
				showVideoListings.ajaxLoading(link);
				e.preventDefault();	
			});	
		});
	
	},
	
	ajaxLoading : function (url) {
		$('#video_listings').empty();
		$('#video_listings').html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		$('#video_listings').load(url, function() { });
	}

};

$(function() {
	if ($(".module.video_showcase").length) {
		showVideoListings.init();
	}
});
/* cc.tweetriver.js */
(function($) {
	$CC.TweetRiver = function () {};

	$Crabapple.extend($Crabapple.TweetRiver, $CC.TweetRiver, {
		init: function (elm, options) {},

		afterLoadTweets: function (container, tweets) {
			var liTpl = $('li', container);

			$.each(tweets, function () {
				var li = liTpl.clone();

				var regLink		= new RegExp('http:\\/\\/\\S+');
				var regHashtag	= new RegExp('\\B#([_a-zA-Z0-9]+)');
				var regReply	= new RegExp('\\B@([_a-zA-Z0-9]+)');

				var id		= this.id_str;
				var name	= this.user.name;
				var link	= 'https://twitter.com/' + this.user.screen_name + '/status/' + id;
				var image	= this.user.profile_image_url;
				var content = this.text.replace(regLink, function (link) {
					return '<a href="' + link + '" target="_blank">' + link + '</a>';
				}).replace(regHashtag, function (hashtag) {
					return '<a href="https://twitter.com/#!/search/%23' + hashtag.substring(1) + '" target="_blank">' + hashtag + '</a>';
				}).replace(regReply, function (reply) {
					return '<a href="https://twitter.com/#!/' + reply.substring(1) + '" target="_blank">' + reply + '</a>';
				});
				var date	= $Crabapple.utils.DateTime.relativeTime(new Date(this.created_at));

				container.append(li);

				$('a[target="_blank"]', li).each(function () {
					$(this).attr('href', link);
				});
				$('img.avatar', li).attr('src', image);
				$('a.name', li).text(name).after(' ' + content);
				$('a.date', li).text(date);
				$('a.intent', li).each(function () {
					$(this).attr('href', $(this).attr('href') + id);
				});
			});

			liTpl.remove();
			$('li', container).removeClass('hide');

			return tweets;
		}
	});

	$.pluginize('tweetriver', $CC.TweetRiver, $CC);
}) (jQuery);/* cc.video_horizontal.js */
/**
 * Make entire li clickable for video_horizontal module
 */
$(function(){
	$('.video_horizontal .middle ul li').click(function(e){
		e.stopImmediatePropagation();
		var link = $(this).find('a').first();
		link.triggerHandler('click'); // trigger link handling
		document.location = link.attr('href');
	});
});
/* cc.web_show_category.js */
/**
 * Web Show Category Module
 * @author shcherba
 */
var WebShowCategory = {
	
	workingAreaClassName : '.web_show_category .middle',
	api                  : null,
	curPane              : $(".web_show_category .middle"),
	
	/**
	 * init module elements: tabs, pagination, sorting 
	 */
	init : function () {
		
		this.initSorting({});
		this.initPagination({});
		
	},
	/**
	 * add ajax processing for sorting
	 */
	initSorting : function (parameters) {
		
		$(this.workingAreaClassName+' .sort_panel a').bind('click', $.proxy( function (e) {
			this.showLoader();
			
			var sortBy = (e.target.innerHTML == 'Most Recent') ? 'date' : 'views';
			
			parameters.sortBy = sortBy;
			
			$.ajax({
				url     : searchResultsContentFragmentLlink,
				type    : 'GET',
				data    : parameters,
				context : this,
				success : function (data) {
					$Crabapple(this.workingAreaClassName+' .pagination_wrap').remove();
					
					$(this.curPane).html(data);
					
					this.initPagination(parameters);
					this.initSorting(parameters);
				},
				error   : function (data) {
				//TODO: add error processing
				}
			});
			return false;
		}, this));
		return false;
		
	},
	/**
	 * init pagination plagin
	 */
	initPagination : function (parameters) {
		
		$Crabapple(this.workingAreaClassName+' .pagination_wrap').pagination({
			reloadArea              : this.curPane,
			fragmentLlink           : searchResultsContentFragmentLlink,
			pequestParams           : parameters,
			afterLoadHandlerContext : this,
			afterLoadHandler        : this.initSorting
		});
		
	},
	/**
	 * show spinner
	 */
	showLoader : function () {
		
		$(this.curPane).empty();
		$(this.curPane).html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		
	}
};

$(function() {
		
	if ($(".module.web_show_category").length)
	{
		WebShowCategory.init();
	}
});
/* cchpblogs.js */
$(function() {
	$Crabapple('.cchpblogs .header ul').tabs('.cchpblogs .middle .pane');
});/* channel_finder.js */
$(function() {
	$('.channel_finder #zip_input').focus(function(){
		if($(this).val() == 'Enter ZIP Code') {
			$(this).val('');
		}
		$(this).addClass('active');
	});
	
	$('.channel_finder #zip_submit').click(function(e){
		e.preventDefault();
		var zip = $(this).siblings('#zip_input').val().replace(/\s*/g,'');
		$(this).siblings('#zip_input').val(zip);
		
		if( zip.search(/^\d{5}$/) == -1) {
			alert('Please enter a valid 5-digit zip code');
		} else {
			document.channel_finder.submit();
		}
	});
});/* click_tracking.js */
// click_tracking.js
// Auto & Top Nav Send Link Events Set Up

function autoLinkTrackEvent(promoName, destinationUrl){
	var destinationUrl = (typeof destinationUrl != 'undefined') ? destinationUrl : 'no_destination_url';
	
	if (destinationUrl.substr(0,1) == '/') {
		destinationUrl = window.location.protocol + "//" + window.location.host + destinationUrl;
	}
	
	promoName = promoName.toLowerCase();
	destinationUrl = destinationUrl.toLowerCase();
	
	if (typeof(mtvn) != 'undefined') {
			mtvn.btg.Controller.sendLinkEvent({
			linkName:promoName + '|' + pageName,
			linkType:'o',
			prop8:repCallObject.prop8,
			prop25:promoName,
			prop26:promoName + '|' + pageName,
			prop27:destinationUrl,
			eVar5:destinationUrl,
			eVar6:repCallObject.eVar6,
			eVar7:promoName,
			eVar8:promoName + '|' + pageName,
			eVar9:pageName
		});
	}
}

function shareBarLinkTracking (shareService) {
	var shareService = 'share_'+shareService;
	if (typeof(mtvn) != 'undefined') {
		mtvn.btg.Controller.sendLinkEvent({
			linkName:'share',
			linkType:'o',
			eVar9:pageName,
			eVar19:shareService,
			events:'event9'
		});	
	}
}

function commentLinkTracking (shareService) {
	var shareService = 'commenting_'+shareService+'comment';
	if (typeof(mtvn) != 'undefined') {
		mtvn.btg.Controller.sendLinkEvent({
			linkName:'commenting',
			linkType:'o',
			eVar9:pageName,
			eVar19:shareService,
			events:'event9'
		});	
	}
}

$(function() {
	// Top nav links	
	$('ul.top_nav a').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('top-nav', destinationUrl);
	});
	
	// Social Buttons (socialbuttons)
	// In share_bar.tpl
	
	// Top Logo
	$('.visible_header>.middle>a.logo').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('cclogo', destinationUrl);
	});

	// Schedule Strip links	
	$('ul.schedule_list a').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('schedule', destinationUrl);
	});
	
	// Full Schedule	
	$('a.full_schedule_btn').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('full-schedule', destinationUrl);
	});
	
	// Search Boxes
	$('div#visible_header_search>form:first').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('searchbox', destinationUrl);
	});
	
	$('div#footer_search>form:first').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('searchbox-footer', destinationUrl);
	});
	
	// CC Standup Tours Page Search
	$('form#frmLsSearchTours').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('laughstub_search', destinationUrl);
	});
	
	// CC Studios Nav
	$('div.web_show_visible_header li > a').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('top-nav-ccstudios', destinationUrl);
	});
	$('div#studios_header_search>form:first').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('searchbox', destinationUrl);
	});
	
	// Carousel
	$('ul#carousel li.active a').live('click', function() {
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('hpcarousel', destinationUrl);
	});

	// Workaholics Half Christmas Page Submit Button
	$('.halfxmas_wrapper .form_page .submit').click(function() {
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('workaholics_halfxmas_submit', destinationUrl);
	});
	
	// Click Tracking
    $('.overlay_wrapper a').click(function() {
    	var destinationUrl = $(this).attr('href');
    	autoLinkTrackEvent('overlay_clickthru', destinationUrl);
    });
    
    $('.stay_here').click(function() {
    	var destinationUrl = document.URL;
    	autoLinkTrackEvent('overlay_redirect_skipped', destinationUrl);
    });
    
    
	// All other auto link tracking
	skipTheseClasses = /(noAutoLinkTracking|ad_|visible_header|video_player_module|hpcarousel)/; // div classes to skip autolink tracking
	skipTheseAClasses = /\s*mute\s*/i; //a tag Classes to skip
	
	moduleRemove = /\s*module\s+/i; //To remove module from potential class names
	
	moduleTabs = /mod_tab/i; // For tabs on the page
	
	$('#content_holder div.module, div.global_footer').filter(function() { // Filter out known modules where auto link tracking is not wanted
		
		if ( skipTheseClasses.test($(this).attr('class')) ) {
			return false;			
		} else {
			return true;
		}
		
	}).each(function (){
		var promo_name = 'unnamed_promo'; // protect against no second class name
		
		var allClasses = ($(this).attr('class')).replace(moduleRemove, '');

		// Determine Promo Name
		var classNameArray = allClasses.split(' ');

		// assign first class name that is not module to reporting name
		if ( (typeof classNameArray != undefined) && (typeof classNameArray[0] != undefined) && (classNameArray[0] != null) && classNameArray[0] != ''  ) {		
			promo_name = classNameArray[0];
		}
	
		
		// Get all a tags except those that are a decendent of an element with class=noAutoLinkTracking class
		$(this).find('a').not('.noAutoLinkTracking a').click(function (){	
			// skip a tags with classes that are to be skipped
			//console.log( $(this).parent().attr('class') + ' --> ' + $(this).attr('class') );
			if ( !skipTheseAClasses.test($(this).attr('class')) ) {
				
				// add tab names to promo_name
				if ( moduleTabs.test( $(this).attr('class') ) ) {
					tabname = $(this).text();
				    reported_link_name = promo_name + '|' + tabname.replace(/[^a-zA-Z]+/g, ''); 
				} else {
					reported_link_name = promo_name;
				}

				autoLinkTrackEvent(reported_link_name, $(this).attr('href'));
			}
		});
		
	});
});/* club_showcase.js */
$(function() {
	// Show tooltip on hover.
	$Crabapple('.club_showcase div a').mousemove(function(e){    
		$(this).siblings("span").show();
	})    
	// Hide tooltip on mouseout.
	.mouseout(function(e){    
		$(this).siblings("span").hide();        
	});	 
});/* companion.js */
$(function () {

	allLeaderboardClasses = $('div#adCallDartLeader:first').attr('class');
	
	if (typeof allLeaderboardClasses != 'undefined') {
		leaderboardDimensionClass = allLeaderboardClasses.match(/d_\d{2,3}x\d{2,3}/i)[0];
		leaderboardWidth = parseInt(leaderboardDimensionClass.match(/\d{2,3}/i)[0]);
	}

	// Turn on leaderboard companion by default or if <= 728
	if( typeof leaderboardWidth == 'undefined' || typeof leaderboardWidth == 'null' || leaderboardWidth <= 728){
		$('.visible_header .ad_companion').show();
	} else {
		$('.visible_header .ad_companion').hide();
		if (leaderboardWidth == 970) {
			$('.visible_header .middle .ad_holder').css({"padding":"0 5px"}); // Center for a 970px add
		}
	}
});/* contact_form.js */
$(function() {
	function validateFieldRequired (field) {
		if ($(field).val() == '') {
			return 'You must enter a ' + $('label[for="' + $(field).attr('id') + '"]').text() + ".\n";
		} else {
			return '';
		}
	};

	function validateFieldEmailSyntax (field) {
		if ($(field).val() == '') {
			return 'You must enter a ' + $('[for="' + $(field).attr('id') + '"]').text() + ".\n";
		}

		if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/.test($(field).val())){
			return '';
		} else {
			return 'You must enter valid ' + $('[for="' + $(field).attr('id') + '"]').text() + ".\n";
		}
	};

	function validateFieldSelectBox (field) {
		if ($(field).val() == 0) {
			return 'You must select a ' + $('label[for="' + $(field).attr('id') + '"]').text() + ".\n";
		} else {
			return '';
		}
	};

	$('.programming_contact form, .web_contact form').submit(function () {
		var err_msg = '';
		var fields = $('input[type="text"], select, textarea', this);

		fields.each(function () {
			if ($(this).attr('name') == 'email') {
				err_msg += validateFieldEmailSyntax(this);
			} else if (this.tagName == 'SELECT') {
				err_msg += validateFieldSelectBox(this);
			} else {
				err_msg += validateFieldRequired(this);
			}
		});

		if (err_msg != '') {
			alert(err_msg);
		} else {
			if ($('.info', $(this).parent()).css('display') == 'block') {
				$('.info', $(this).parent()).fadeOut('fast');
			}

			$(this).ajaxSubmit({
				dataType : 'json',
				success : $.proxy(function (response) {
					if (response.result) {
						var info = $('.info', $(this).parent());

						$(this).clearForm().fadeOut('fast', function () {
							info.fadeIn('slow');
						});
					}
				}, this)
			});
		}

		return false;
	});
});/* dropdown.js */
$(function () {
	$Crabapple('.web_contact select.custom_dd').selectboxx({
		init:function(){},
		onChange: function (val, inst) {
			// TODO: add logic for Ajax request page reload according filter value
		}
	});
});

$(function () {
	$Crabapple('.programming_contact select.custom_dd').selectboxx({
		init:function(){},
		onChange: function (val, inst) {
			// TODO: add logic for Ajax request page reload according filter value
		}
	});
});/* episode_showcase.js */
/**
 * Episode Showcase Module
 * @author shcherba
 */
var episodeShowcase = {
	infoBlockClass : '.episode_showcase .content',
	requestParams  : {},
	/**
	 * init module elements: dropdown, pagination, sorting 
	 */
	init : function () {
		/*$Crabapple('.episode_showcase select.custom_dd').selectboxx({
			init : function() {},
			onChange : $.proxy( function (seasonId, inst) {
				this.requestParams.currentSeasonId = seasonId;
				this.showLoader();
				$.ajax({
					url     : episodeShowcaseLlink,
					type    : 'GET',
					data    : this.requestParams,
					context : this,
					success : function (data) {
						$(this.infoBlockClass).html(($('.content', data).html()));

						this.initSorting();
						this.initPagination();
					},
					error   : function (data) {
					//TODO: add error processing
					}
				});
				return false;
			},this)
		});

		this.initSorting();*/
		
		this.initPagination();
		
	},
	/**
	 * init sorting
	 */
	initSorting : function () {
		$('.episode_showcase .status_bar .selector a').bind('click', $.proxy( function (e) {
			var params = this.requestParams;
			params.sortBy = (e.currentTarget.id == 'recent') ? 'OriginalPublishDate' : '';
			this.showLoader();
			$.ajax({
				url     : episodeShowcaseLlink,
				type    : 'GET',
				data    : params,
				context : this,
				success : function (data) {
					$(this.infoBlockClass).html(($('.content', data).html()));
					
					this.initPagination();
				},
				error   : function (data) {
				//TODO: add error processing
				}
			});
			return false;
		},this));
		
	},
	/**
	 * init pagination plagin
	 */
	initPagination : function () {
		$Crabapple(this.infoBlockClass+' .pagination_wrap').pagination({
			//context					: this,
			reloadArea              : $(this.infoBlockClass),
			fragmentLlink           : episodeShowcaseLlink,
			pequestParams           : this.requestParams,
			//onClick                 : this.paginationHandler,
			afterLoadHandlerContext : this,
			afterLoadHandler        : this.makeItemsClickable
		});
		
	},
	/**
	 * show spinner
	 */
	showLoader : function () {
		$(this.infoBlockClass).empty();
		$(this.infoBlockClass).html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		
	},
	/**
	 * ajax page reload
	 */
	paginationHandler : function (page) {
		//add page param into request
		this.requestParams.currentPage = page;
		this.showLoader();
		$.ajax({
			url     : episodeShowcaseLlink,
			type    : 'GET',
			data    : this.requestParams,
			context : this,
			success : function (data) {
				$Crabapple(this.infoBlockClass+' .pagination_wrap').remove();
				
				$(this.infoBlockClass).html(($('.content', data).html()));
				delete this.requestParams.currentPage;
				this.initSorting();
				this.initPagination();
			},
			error   : function (data) {
				//TODO: add error processing
			}
		});
	},
	
	makeItemsClickable : function() {
		$(".module.episode_showcase .content .block").each(function () {
			var a = $(this).find('.thumbnail a:eq(0)');
			$(this).bind('click', function (e) {
				$(this).unbind('click');
				$(a).click();
				window.location.href = $(a).attr('href');
			});
			$(this).css('cursor', 'pointer');
		});
	}

};

$(function () {
	if ($(".module.episode_showcase").length) {
		episodeShowcase.init();
		episodeShowcase.makeItemsClickable();
	}
});
/* fan_activity.js */
$(function () {
	$Crabapple('.fan_activity .module_tabs').tabs('.fan_activity .activities');

	$CC('.fan_activity .twitter').tweetriver();
});/* follow.js */
$(function () {
	$CC('.follow .tweetriver').tweetriver({feedUrl: $CC('.follow .tweetriver').data('feed')});
});/* hpcarousel.js */
$(function () {

        var player_ready = false;

        function init()
        {
                $carousel = $('#carousel');


                if ($('#video_player_box').length) {
                        $video_player = $Crabapple.playerA.player.video_player_box;
                        player_ready = true;
                } else {
                        player_ready = false;
                }

                $(window).focus(function(){
                        $('#carousel li:last').addClass('active');
                });

                //autoplay detect
                if (!$('#adExpand').length)
                {
                        autoplay($carousel);
                        $autoplay_time = $carousel.attr('data-autoplay');
                }


                if (player_ready == true)
                {
                        $video_player = $Crabapple.playerA.player.video_player_box;

                        //player ready detect and hide when ready                               
                        $video_player.events.onMetadata = function(){
                                player_ready = true;
                                hidePlayer();
                                        if($.cookie('playerSound') != 'true')
                                        {
                                                $('#carouser_wrapper a.mute').removeClass('on');
                                                $video_player.mute();
                                                $.cookie('playerSound','false');
                                        }
                                        else
                                        {
                                                $('#carouser_wrapper a.mute').addClass('on');
                                                $video_player.unmute();
                                                $.cookie('playerSound','true');
                                        }


                                $video_player.events.onMetadata = function(){};
                        }

                        $video_player.events.onPlaylistComplete = function(){
                                hidePlayer();
                                goNext();
                                //continue autoplay after video stop
                                if ($autoplay_time)
                                {
                                        $carousel.attr('data-autoplay', $autoplay_time);
                                        autoplay($carousel);
                                }
                        }
                }

                $carousel.find('li a').click(function(){
                        $active = $(this).parent();
                        //make video player clickable
                        $('.link_overlay_disabled').attr('href',$(this).attr('href'));
                        $carousel.attr('data-autoplay',0);

                        if ($(this).parent().hasClass('active'))
                        {
                                return;
                        }
                        else
                        {
                                hidePlayer();
                                animate($active);
                                return false;
                        }

                });

                $('#carouser_wrapper a.mute').click(function(){
                        if($.cookie('playerSound') == 'true')
                        {
                                $(this).removeClass('on');
                                $video_player.mute();
                                $.cookie('playerSound','false');
                        }
                        else
                        {
                                $(this).addClass('on');
                                $video_player.unmute();
                                $.cookie('playerSound','true');
                        }

                        return false;
                })

                $('.hpcarousel .video_wrapper .link_overlay_disabled, .hpcarousel ul li:last .full_info, .hpcarousel .video_wrapper #video_player_box').live({mouseenter:
                        function(){
                                $carousel.find('li:last').addClass('hovered');},
                        mouseleave: function(){
                                $carousel.find('li:last').removeClass('hovered');}
                });
        }

        function autoplay($carousel){
                if($carousel.attr('data-autoplay')>0)
                {
                        setTimeout(function(){
                                if($carousel.attr('data-autoplay')>0)
                                {
                                        goNext();
                                        autoplay($carousel);
                                }
                        }, $carousel.attr('data-autoplay'));
                }
        }

                $('#carousel li:hover a').click(function(){
                $carousel.attr('data-autoplay', '0');
        });



        function animate($active)
        {
                $active.animate({
                        width: 480
                }, 150, function(){move($active)}).addClass('active');
        }

        function move($active)
        {
                hidePlayer();
                $active.nextAll().css('width','34').prependTo('#carousel').removeClass('active');

                $active_link = $active.find('a').attr('href');
                $('.link_overlay_disabled').attr('href',$active_link);

            $active_id =$active.attr('data-mgid');
                //alert(player_ready);  

                if (player_ready == true) {
                        if ($active_id)
                        {
                                $video_player.playURI($active_id);
                                showPlayer();
                                //$video_player.play();                 
                                //console.log($video_player.state);
                                $carousel.attr('data-autoplay', '0');
                        }
                        else{
                                if (player_ready == true) {
                                        $video_player.pause();
                                        hidePlayer();
                                }
                        }
                }

        }

        function goNext(){
                $carousel.attr('data-autoplay',5000);
                animate($carousel.find('li:eq(4)'));
        }

        function hidePlayer()
        {
                if (player_ready) {
                        $('#carouser_wrapper').css('opacity','0.01');
                }
        }

        function showPlayer()
        {
                $video_player.events.onPlayheadUpdate = function(){
                        if ($Crabapple.playerA.player.video_player_box.state == 'playing')
                        {
                                $('#carouser_wrapper').css('opacity','1');
                                $video_player.events.onPlayheadUpdate = function(){};
                        }
                }
        }

        if      ($('.hpcarousel').length)
        {
                init();
        }

});/* latest_photo.js */
$(function() {
	// setup div.scrollable as a container for our carousel
	$Crabapple(".latest_photo .scrollable").scrollable();
});/* miniplayer_tooltips.js */
$(function() {
	// Show tooltip on hover and follow mouse position.
	$Crabapple('.miniplayer .tabs > li > a').mousemove(function(e){    
		$(this).siblings(".tooltip").show()
		.css({
			top: (e.pageY - 25) + "px",
			left: (e.pageX + 15) + "px"
		});	
	})    
	// Hide tooltip on mouseout.
	.mouseout(function(e){    
		$(this).siblings(".tooltip").hide();        
	});	 
});

	
/* overlay.js */

var overlayOn = getCookie('cc_overlay')? false: true;
//Disables cookie: //var overlayOn = true;

if (overlayOn) { // Only serve Overlay if cookie is not set

	//Only show Overlay once
	setCookie('cc_overlay','true', 1);

	//Display Overlay
	$('#screen').css({opacity: 0.5, "width":$(document).width(),"height":$(document).height()});
	$("#screen, .overlay_wrapper").fadeIn('slow')
	$('.close').css({"display": "block"});
	valignOverlay();
	var redirect = true;

	//Stay on current pate
	$('.stay_here').click(function(event){
		$(".overlay_wrapper, #screen").css("display", "none");
		$(this).css("display", "none");		
		preventBubbledEvents(event)
	});
	
	//For Tracking purposes, stop event propegation
	//(so that clickthru and stay_here aren't tracked at the same time)
	$("a[href]").click(function(event){ preventBubbledEvents(event)	});  
}	

$(window).resize(function(){
	$('.overlay_wrapper').css("display") == 'block'?$("#screen").css("width", "100%"):"";
	valignOverlay()
});

function redirectOverlay(redirectUrl) {
	//Redirect after cmsOverlayTimer seconds
	if (redirect) {
	   	var audio = $("audio").get(0);

		// if there is an audio file, it will redirect when it ends (onended), if not, just redirect
	   	(isNaN(audio.duration) )?callRedirect(redirectUrl):audio.play();
	}
}

function callRedirect(redirectUrl) 
{	
	if (redirect) //Checking again JIC they stopped redirect during sound clip
	{	
		window.location.href = redirectUrl;
		preventBubbledEvents();

		//Tracking: Users who are redirected
		autoLinkTrackEvent('overlay_redirected', redirectUrl);
	}	
}
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	    {
	    return unescape(y);
	    }
	  }
}

function valignOverlay() {
	var valign = ($(window).height() - $(".overlay_wrapper").outerHeight())/2;
	valign = (valign > 0)?valign: 0;
	$(".overlay_wrapper").css("top", valign);
}

//Disabling other clicking for tracking purposes
function preventBubbledEvents(event) {
	if (event)
		event.stopPropagation();
	
	redirect=false;
	
	//Disabling other clicking for tracking purposes 
	$('.stay_here, .overlay_wrapper, .overlay_wrapper a').unbind('click');
	$(".overlay_wrapper").children("a[href]").click(function(event) {event.preventDefault();});
}/* search.js */
$(function () {
	$Crabapple('input.query').search({
		webSearchSelector: 'input.web',
		localSearchSelector: 'input.cc',
		searchContainerSelector: '#visible_header_search, #footer_search, #studios_header_search, #page_not_found_search, #search_page'
	});
});/* search_results.js */
/**
 * Search Results Module
 * @author shcherba
 */
var searchResults = {
	
	workingAreaClassName : '.search_results .middle',
	api                  : null,
	curPane              : null,
	
	/**
	 * init module elements: tabs, pagination, sorting 
	 */
	init : function () {
		// init jquery tools tabs
		$Crabapple('.search_results .module_tabs').tabs(this.workingAreaClassName+' > div');
		// get jquery tools api obj
		this.api = $Crabapple('.search_results .module_tabs').data("tabs");
		this.curPane = this.api.getCurrentPane();
		var parameters = (keywords != '') ? {keywords : keywords} : {};
		
		this.initTabsActions(parameters);
		this.initPagination(parameters);
		this.initSorting(parameters);
		
	},
	/**
	 * add ajax processing on tabs switch
	 */
	initTabsActions : function (parameters) {
		
		this.api.onClick( $.proxy( function (e, index) {
			
			var panes = this.api.getPanes();
			this.curPane = panes[index];
			
			this.showLoader();
			parameters.selectedTabIndex = index;
			
			$.ajax({
				url     : searchResultsContentFragmentLlink,
				type    : 'GET',
				data    : parameters,
				context : this,
				success : function (data) {
					$Crabapple(this.workingAreaClassName+' .pagination_wrap').remove();
					$(panes[index]).html(data);
					
					this.initPagination(parameters);
					this.initSorting(parameters);
				},
				error   : function (data) {
					//TODO: add error processing
				}
			});
		}, this));
		
	},
	/**
	 * add ajax processing for sorting
	 */
	initSorting : function (parameters) {
		
		 $(this.workingAreaClassName+' .nav_panel a').bind('click', $.proxy( function (e) {
			this.showLoader();
			parameters.sortBy = (e.currentTarget.id == 'searchResultsDate') ? 'date' : 'rating';
			
			$.ajax({
				url     : searchResultsContentFragmentLlink,
				type    : 'GET',
				data    : parameters,
				context : this,
				success : function (data) {
					$Crabapple(this.workingAreaClassName+' .pagination_wrap').remove();
					$(this.curPane).html(data);
					
					this.initPagination(parameters);
					this.initSorting(parameters);
				},
				error   : function (data) {
					//TODO: add error processing
				}
			});
		}, this));
		return false;
		
	},
	/**
	 * init pagination plagin
	 */
	initPagination : function (parameters) {

		if (parameters.selectedTabIndex != null) { 
			parameters.selectedTabIndex = parameters.selectedTabIndex;
		} else { 
			parameters.selectedTabIndex = 0;
		}

		$Crabapple(this.workingAreaClassName+' .pagination_wrap').pagination({
			reloadArea              : this.curPane,
			fragmentLlink           : searchResultsContentFragmentLlink,
			pequestParams           : parameters,
			afterLoadHandler        : this.initSorting,
			afterLoadHandlerContext : this
		});
		
	},
	/**
	 * show spinner
	 */
	showLoader : function () {
		
		$(this.curPane).empty();
		$(this.curPane).html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		
	}
};

$(function() {
	if ($(".module.search_results").length)
		searchResults.init();
});
/* show_archive.js */
$(function() {
	// setup ul.tabs to work as tabs for each li directly under ul.panes
	$Crabapple('.show_archive .module_tabs').tabs('.show_archive .shows_list');
});/* show_carousel.js */
$(function() {
	// setup ul.tabs to work as tabs for each li directly under ul.content + enabling autoplay
	$Crabapple(".show-carousel .tabs").tabs(".show-carousel .content > li", {
		event: 'mouseover',
		rotate: true,
		tabs: 'li'
	})
	.slideshow({
		autoplay: true,
		interval: 4000,
		clickable: false
	});
	
	// Workaround for Firefox "mouseover" bug for links with href - emulating "open link in new window".
	$Crabapple(".show-carousel .tabs a").click(function() {
		window.open($(this).children('.link').html(), '_blank');
	});
});/* tag_results.js */
/**
 * Tag Results Module
 * @author shcherba
 */
var tagResults = {
	
	workingAreaClassName : '.tag_results .middle',
	api                  : null,
	curPane              : null,
	
	/**
	 * init module elements: tabs, pagination, sorting 
	 */
	init : function () {
		// init jquery tools tabs
		$Crabapple('.tag_results .module_tabs').tabs(this.workingAreaClassName+' > div');
		// get jquery tools api obj
		this.api = $Crabapple('.tag_results .module_tabs').data("tabs");
		this.curPane = this.api.getCurrentPane();
		var parameters = {};
		
		this.initTabsActions(parameters);
		this.initPagination(parameters);
		this.initSorting(parameters);
		
	},
	/**
	 * add ajax processing on tabs switch
	 */
	initTabsActions : function (parameters) {
		
		this.api.onClick( $.proxy( function (e, index) {
			
			var panes = this.api.getPanes();
			this.curPane = panes[index];
			
			this.showLoader();
			parameters.selectedTabIndex = index;
			
			$.ajax({
				url     : tagResultsContentFragmentLlink,
				type    : 'GET',
				data    : parameters,
				context : this,
				success : function (data) {
					$Crabapple(this.workingAreaClassName+' .pagination_wrap').remove();
					$(panes[index]).html(data);
					
					this.initPagination(parameters);
					this.initSorting(parameters);
				},
				error   : function (data) {
					//TODO: add error processing
				}
			});
		}, this));
		
	},
	/**
	 * add ajax processing for sorting
	 */
	initSorting : function (parameters) {
		
		 $(this.workingAreaClassName+' .nav_panel a').bind('click', $.proxy( function (e) {
			this.showLoader();
			parameters.sortBy = (e.currentTarget.id == 'searchResultsDate') ? 'date' : 'rating';
			
			$.ajax({
				url     : tagResultsContentFragmentLlink,
				type    : 'GET',
				data    : parameters,
				context : this,
				success : function (data) {
					$Crabapple(this.workingAreaClassName+' .pagination_wrap').remove();
					$(this.curPane).html(data);
					
					this.initPagination(parameters);
					this.initSorting(parameters);
				},
				error   : function (data) {
					//TODO: add error processing
				}
			});
		}, this));
		return false;
		
	},
	/**
	 * init pagination plagin
	 */
	initPagination : function (parameters) {

		if (parameters.selectedTabIndex != null) { 
			parameters.selectedTabIndex = parameters.selectedTabIndex;
		} else { 
			parameters.selectedTabIndex = 0;
		}		

		$Crabapple(this.workingAreaClassName+' .pagination_wrap').pagination({
			reloadArea              : this.curPane,
			fragmentLlink           : tagResultsContentFragmentLlink,
			pequestParams           : parameters,
			afterLoadHandler        : this.initSorting,
			afterLoadHandlerContext : this
		});
		
	},
	/**
	 * show spinner
	 */
	showLoader : function () {
		
		$(this.curPane).empty();
		$(this.curPane).html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		
	}
};

$(function() {
	if ($(".module.tag_results").length)
		tagResults.init();
});
/* tv_listings.js */
$(function () {
	$Crabapple('.tv_schedule_listings select.custom_dd').selectboxx({
		init: function() {},
		onChange: function(val, inst) {
			var table = $('.tv_schedule_listings .right_col table');
			var table_height = table.height();

			table.empty();
			table.html('<div class="ajax_spinner"></div>');

			$('.ajax_spinner', table).height(table_height);

			$.ajax({
				url     : tvListingsContentFragmentLink,
				type    : 'GET',
				data    : {'selectedDate' : val},
				context : this,
				success : function (data) {
					table.html(data);
				},
				error   : function (data) {
					// TODO: add error processing
				}
			});
		}
	});
});
/* video_portal.js */
$(function () {
	$('.video_portal li').hover(
		function(){
			var clone = $(this).clone().addClass('cloned');
			
			$(this).addClass('active').after(clone)
			.children('.description').stop(false, true).fadeIn('slow', function(){
				$('.video_portal li:not(.active) .description').hide();	
			});
		}, function(){
			$(this)
			.children('.description').hide().end()
			.siblings('.cloned').remove().end()
			.removeClass('active');
		});
});/* video_showcase.js */
/**
 * Tag Results Module
 * @author agaudry
 */
 /*
var videoShowcase = {
	
	workingAreaClassName : '.video_showcase .content',
	api                  : null,
	curPane              : null,
	
	/**
	 * init module elements: pagination
	 */
	 /*
	init : function () {

		this.curPane = '.video_showcase .content'
		
		console.log(this.curPane);
		
		var parameters = {};
		

		this.initPagination(parameters);
		
	},
	/**
	 * init pagination plagin
	 */
	 /*
	initPagination : function (parameters) {

		alert("foo!");

		if (parameters.selectedTabIndex != null) { 
			parameters.selectedTabIndex = parameters.selectedTabIndex;
		} else { 
			parameters.selectedTabIndex = 0;
		}	
		
		alert(videoShowcaseLink);
		console.log(this.curPane);

		$Crabapple(this.workingAreaClassName+' .pagination_wrap').pagination({
			reloadArea              : this.curPane,
			fragmentLlink           : videoShowcaseLink,
			pequestParams           : parameters,
			//afterLoadHandler        : this.initSorting,
			afterLoadHandlerContext : this
		});
		
		alert("dumb...");
		
	},
	/**
	 * show spinner
	 */
	 /*
	showLoader : function () {
		
		$(this.curPane).empty();
		$(this.curPane).html("<div align='center'><img src='/sitewide/images/modules/ajax_busy.gif' width='32' height='32' alt='' border='0' /></div>");
		
	}
};

$(function() {
	if ($(".module.video_showcase").length)
		videoShowcase.init();
});
/* visible_header.js */
$(function () {
		$CC.bgLogo = {
		bgColorsList: new Array(
			'#f6981d',
			'#eb2929',
			'#e53465',
			'#ed6b23',
			'#f05d22',
			'#ef512b',
			'#cdad2c',
			'#7f973b',
			'#69cada',
			'#3bb9d6',
			'#2780a4',
			'#92a5bb',
			'#9ebbbe'
		),

		setBgColor: function (elm, bgColorsList) {
			bgColorsList = bgColorsList || this.bgColorsList;

			$(elm).css('background', bgColorsList[Math.floor(Math.random() * bgColorsList.length)]);
		}
	}

	$CC.bgLogo.setBgColor('.visible_header .logo_bg');
	
	if ($.browser.msie)
	{
		t_feed = $CC('.twitter_feed');
		t_share = $CC('.twitter_share')
		fb_feed = $CC('.facebook_feed');
		fb_share = $CC('.facebook_share');
	
		$CC('.twitter_holder').mouseenter(
			function(){
				t_share.addClass('hover');
				t_feed.show();
				fb_feed.hide();
				fb_share.removeClass('hover');
			}
		);
		
		t_feed.mouseleave(function(){
			t_feed.hide();
			t_share.removeClass('hover');
		});
		
		
		$CC('.facebook_holder').mouseenter(
			function(){
				fb_share.addClass('hover');
				fb_feed.show();
				t_feed.hide();
				t_share.removeClass('hover');
			}
		);
		
		fb_feed.mouseleave(function(){
			fb_feed.hide();
			fb_share.removeClass('hover');
		});
	
	}
	
	/*Mac/Win/Linux font face bug fix*/
	var os = navigator.platform;
	if (os && os.indexOf('Mac') >= 0)
	{
		$CC('body').addClass('Mac');
	}
	else
	{
		$CC('body').addClass(os);
	}
});
/* http://btg.mtvnservices.com/mtvn/jquery-flux4/0.11/flux4.js */
;(function($, w) {
	
	var configured, conf, stub, loading, extant = {}, _guid = 0; waiting = $();
	var version = "0.1";

	var createConf = function() {

		if (w.MTVN && w.MTVN.conf && w.MTVN.conf.flux4) {
			$.extend(conf, w.MTVN.conf.flux4);
			configured = true;
		}
		
	}
	
	var loadScript = function(url, callback) {
	 
		 var script = document.createElement("script"),
			  body = document.body;
		 script.type = "text/javascript";
	 
		 if ( script.readyState ) {     //IE <= 8
			  script.onreadystatechange = function() {
				   if ( script.readyState == "loaded" || script.readyState == "complete" ) {
						script.onreadystatechange = null;
						
						w.setTimeout(function() {
							callback();
						}, 100);						
				   }
			  };
		 }
		 else {     //Others
			  script.onload = function() {
				   callback();
			  };
		 }
	 
		 body.insertBefore(script, body.firstChild);
		 script.src = url;
	 
	}
	
	var loadCore = function() {
		var core =  (MTVN.conf.flux4.staging) ? 
					"http://widgets4.flux-staging.com/Core?includeJquery=false":
					"http://widgets4.flux.com/Core?includeJquery=false";
					
		loading = true;
		


		// flux needs an id on a script tag to figure out the UCID, so we add an empty one to the document
		stub = document.createElement("script");
		stub.setAttribute('id', conf.ucid);
		stub.setAttribute('widgets4Debug', "true");
		document.body.appendChild(stub)

		loadScript(core, function () {
				loading = false;
				if (w.Flux4) {
					waiting.trigger("Flux4.coreLoad", [true]);
				} else {
					waiting.trigger("Flux4.coreLoad", [false]);
				}
			});


	}

	var loadElement = function(element) {

		var el = $(element);
		
		if (!el.data("_guid")) {
			el.data("_guid", _guid++)
		}
		
		var wGuid = el.data("_guid");
		var wName = el.data("widget")
		var wContentUri = el.data("contenturi");
		
		if (conf.widgets[wName]) {

			var opts = $.extend({"container": element}, conf.widgets[wName].opts)

			if (wContentUri) {
				opts.contentUri = wContentUri;
				opts.contentId = wContentUri;
			}
			
			if (extant[wGuid] != wName + "|" + wContentUri) {
				extant[wGuid] = wName + "|" + wContentUri;
				
				el.empty();
				
				w.Flux4.createWidget(conf.widgets[wName]["name"], opts, function(widget) {

					if  (conf.widgets[wName]["onLoad"]) {
							conf.widgets[wName]["onLoad"](widget);				
					}
					el.trigger("Flux4.widget.load", [widget, true, conf.widgets[wName]["name"], opts]);

				});
			} else {		
				el.trigger("Flux4.widget.load", [undefined, false, conf.widgets[wName]["name"], opts]);
			}
		} 
	}

	
	var init = function() {
	
		configured = false;
		loading = false;
		extant = {};
		waiting = $();
		
		conf = {}		

		if (stub) {
			stub.parentNode.removeChild(stub);
			stub = undefined;
		}
	}

	init();

	$.fn.flux4 = function(cmd) {
		var filtered;	

		if (cmd == "init") {
		
			init();
			return this;
		
		} else if (cmd == "debug") {
		
			return {
				configured: configured,
				extant: extant,
				waiting: waiting
			}
			
		} else {
	
			if (configured !== true) {
				createConf();
			}
		
			if (!conf.ucid) {
				return this
			}
			
			
			filtered = this.filter(function() {
				if (conf.widgets[$(this).data("widget")]) {
					return true;
				} else {
					return false;
				}
			});
			
			waiting = waiting.add(filtered);

			if (filtered.length) {
			
				if (!window.Flux4) {
					
					if (!loading) {
						loadCore(filtered);
					}

					filtered.bind("Flux4.coreLoad", function(){

						loadElement(this);
					});
	
				} else {
	
					filtered.each(function() {
						loadElement(this);
					});
	
				}
			} 
		}
		
		return filtered;
	
	};

	
})(jQuery, window);

/* http://platform.twitter.com/widgets.js */
if(!window.__twttrlr){(function(a,b){function s(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}function t(a){return Array.prototype.slice.call(a)}function v(a,b){for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function w(){var a=t(arguments),b=[];for(var c=0,d=a.length;c<d;c++)a[c].length>0&&b.push(a[c].replace(/\/$/,""));return b.join("/")}function x(a,b,c){var d=b.split("/"),e=a;while(d.length>1){var f=d.shift();e=e[f]=e[f]||{}}e[d[0]]=c}function y(){}function z(a,b){this.id=this.path=a,this.force=!!b}function A(a,b){this.id=a,this.body=b,typeof b=="undefined"&&(this.path=this.resolvePath(a))}function B(a,b){this.deps=a,this.collectResults=b,this.deps.length==0&&this.complete()}function C(a,b){this.deps=a,this.collectResults=b}function D(){for(var a in d)if(d[a].readyState=="interactive")return l[d[a].id]}function E(a,b){var d;return!a&&c&&(d=k||D()),d?(delete l[d.scriptId],d.body=b,d.execute()):(j=d=new A(a,b),i[d.id]=d),d}function F(){var a=t(arguments),b,c;return typeof a[0]=="string"&&(b=a.shift()),c=a.shift(),E(b,c)}function G(a,b){var c=b.id||"",d=c.split("/");d.pop();var e=d.join("/");return a.replace(/^\./,e)}function H(a,b){function d(a){return A.exports[G(a,b)]}var c=[];for(var e=0,f=a.length;e<f;e++){if(a[e]=="require"){c.push(d);continue}if(a[e]=="exports"){b.exports=b.exports||{},c.push(b.exports);continue}c.push(d(a[e]))}return c}function I(){var a=t(arguments),b=[],c,d;return typeof a[0]=="string"&&(c=a.shift()),u(a[0])&&(b=a.shift()),d=a.shift(),E(c,function(a){function f(){var e=H(t(b),c),f;typeof d=="function"?f=d.apply(c,e):f=d,typeof f=="undefined"&&(f=c.exports),a(f)}var c=this,e=[];for(var g=0,h=b.length;g<h;g++){var i=b[g];v(["require","exports"],i)==-1&&e.push(G(i,c))}e.length>0?J.apply(this,e.concat(f)):f()})}function J(){var a=t(arguments),b,c;typeof a[a.length-1]=="function"&&(b=a.pop()),typeof a[a.length-1]=="boolean"&&(c=a.pop());var d=new B(K(a,c),c);return b&&d.then(b),d}function K(a,b){var c=[];for(var d=0,e;e=a[d];d++)typeof e=="string"&&(e=L(e)),u(e)&&(e=new C(K(e,b),b)),c.push(e);return c}function L(a){var b,c;for(var d=0,e;e=J.matchers[d];d++){var f=e[0],g=e[1];if(b=a.match(f))return g(a)}throw new Error(a+" was not recognised by loader")}function N(){return a.using=m,a.provide=n,a.define=o,a.loadrunner=p,M}function O(a){for(var b=0;b<J.bundles.length;b++)for(var c in J.bundles[b])if(c!=a&&v(J.bundles[b][c],a)>-1)return c}var c=a.attachEvent&&!a.opera,d=b.getElementsByTagName("script"),e=0,f,g=b.createElement("script"),h={},i={},j,k,l={},m=a.using,n=a.provide,o=a.define,p=a.loadrunner;for(var q=0,r;r=d[q];q++)if(r.src.match(/loadrunner\.js(\?|#|$)/)){f=r;break}var u=Array.isArray||function(a){return a.constructor==Array};y.prototype.then=function(b){var c=this;return this.started||(this.started=!0,this.start()),this.completed?b.apply(a,this.results):(this.callbacks=this.callbacks||[],this.callbacks.push(b)),this},y.prototype.start=function(){},y.prototype.complete=function(){if(!this.completed){this.results=t(arguments),this.completed=!0;if(this.callbacks)for(var b=0,c;c=this.callbacks[b];b++)c.apply(a,this.results)}},z.loaded=[],z.prototype=new y,z.prototype.start=function(){var a=this,b,c,d;return(d=i[this.id])?(d.then(function(){a.complete()}),this):((b=h[this.id])?b.then(function(){a.loaded()}):!this.force&&v(z.loaded,this.id)>-1?this.loaded():(c=O(this.id))?J(c,function(){a.loaded()}):this.load(),this)},z.prototype.load=function(){var b=this;h[this.id]=b;var c=g.cloneNode(!1);this.scriptId=c.id="LR"+ ++e,c.type="text/javascript",c.async=!0,c.onerror=function(){throw new Error(b.path+" not loaded")},c.onreadystatechange=c.onload=function(c){c=a.event||c;if(c.type=="load"||v(["loaded","complete"],this.readyState)>-1)this.onreadystatechange=null,b.loaded()},c.src=this.path,k=this,d[0].parentNode.insertBefore(c,d[0]),k=null,l[c.id]=this},z.prototype.loaded=function(){this.complete()},z.prototype.complete=function(){v(z.loaded,this.id)==-1&&z.loaded.push(this.id),delete h[this.id],y.prototype.complete.apply(this,arguments)},A.exports={},A.prototype=new z,A.prototype.resolvePath=function(a){return w(J.path,a+".js")},A.prototype.start=function(){var a,b,c=this,d;this.body?this.execute():(a=A.exports[this.id])?this.exp(a):(b=i[this.id])?b.then(function(a){c.exp(a)}):(bundle=O(this.id))?J(bundle,function(){c.start()}):(i[this.id]=this,this.load())},A.prototype.loaded=function(){var a,b,d=this;c?(b=A.exports[this.id])?this.exp(b):(a=i[this.id])&&a.then(function(a){d.exp(a)}):(a=j,j=null,a.id=a.id||this.id,a.then(function(a){d.exp(a)}))},A.prototype.complete=function(){delete i[this.id],z.prototype.complete.apply(this,arguments)},A.prototype.execute=function(){var a=this;typeof this.body=="object"?this.exp(this.body):typeof this.body=="function"&&this.body.apply(window,[function(b){a.exp(b)}])},A.prototype.exp=function(a){this.complete(this.exports=A.exports[this.id]=a||{})},B.prototype=new y,B.prototype.start=function(){function b(){var b=[];a.collectResults&&(b[0]={});for(var c=0,d;d=a.deps[c];c++){if(!d.completed)return;d.results.length>0&&(a.collectResults?d instanceof C?s(b[0],d.results[0]):x(b[0],d.id,d.results[0]):b=b.concat(d.results))}a.complete.apply(a,b)}var a=this;for(var c=0,d;d=this.deps[c];c++)d.then(b);return this},C.prototype=new y,C.prototype.start=function(){var a=this,b=0,c=[];return a.collectResults&&(c[0]={}),function d(){var e=a.deps[b++];e?e.then(function(b){e.results.length>0&&(a.collectResults?e instanceof C?s(c[0],e.results[0]):x(c[0],e.id,e.results[0]):c.push(e.results[0])),d()}):a.complete.apply(a,c)}(),this},I.amd={};var M=function(a){return a(J,F,M,define)};M.Script=z,M.Module=A,M.Collection=B,M.Sequence=C,M.Dependency=y,M.noConflict=N,a.loadrunner=M,a.using=J,a.provide=F,a.define=I,J.path="",J.matchers=[],J.matchers.add=function(a,b){this.unshift([a,b])},J.matchers.add(/(^script!|\.js$)/,function(a){var b=new z(a.replace(/^\$/,J.path.replace(/\/$/,"")+"/").replace(/^script!/,""),!1);return b.id=a,b}),J.matchers.add(/^[a-zA-Z0-9_\-\/]+$/,function(a){return new A(a)}),J.bundles=[],f&&(J.path=f.getAttribute("data-path")||f.src.split(/loadrunner\.js/)[0]||"",(main=f.getAttribute("data-main"))&&J.apply(a,main.split(/\s*,\s*/)).then(function(){}))})(this,document);(window.__twttrlr = loadrunner.noConflict());}__twttrlr(function(using, provide, loadrunner, define) {provide("util/iframe",function(a){a(function(a){var b=document.createElement("div"),c;b.innerHTML="<iframe allowtransparency='true' frameborder='0' scrolling='no'></iframe>",c=b.firstChild,c.src=a.url,c.className=a.className||"";if(a.css)for(var d in a.css)c.style[d]=a.css[d];if(a.attributes)for(var e in a.attributes)c.setAttribute(e,a.attributes[e]);return a.replace?a.replace.parentNode.replaceChild(c,a.replace):document.body.insertBefore(c,document.body.firstChild),c})});
provide("util/querystring",function(a){function b(a){return encodeURIComponent(a).replace(/\+/g,"%2B")}function c(a){return decodeURIComponent(a)}function d(a){var c=[];for(var d in a)a[d]!==null&&typeof a[d]!="undefined"&&c.push(b(d)+"="+b(a[d]));return c.sort().join("&")}function e(a){var b={},d,e,f,g;if(a){d=a.split("&");for(g=0;f=d[g];g++)e=f.split("="),e.length==2&&(b[c(e[0])]=c(e[1]))}return b}function f(a,b){var c=d(b);return c.length>0?a.indexOf("?")>=0?a+"&"+d(b):a+"?"+d(b):a}a({url:f,decode:e,encode:d,encodePart:b,decodePart:c})});
provide("util/nodeselect",function(a){var b=document,c="querySelectorAll"in b?function(a,c){return b.querySelectorAll(a+"."+c)}:"getElementsByClassName"in b?function(a,c){var d=b.getElementsByClassName(c),e,f=[];for(i=0;e=d[i];i++)e.tagName.toLowerCase()==a&&f.push(e);return f}:function(a,c){var d=b.getElementsByTagName(a),e,f=new RegExp("(?:^|\\s+)"+c+"(?:\\s+|$)"),g=[];for(i=0;e=d[i];i++)f.test(e.className)&&g.push(e);return g};a(c)});
provide("$vendor/domready/ready.js", function(exports) {!function(a){function k(){b=1;for(var a=0,d=c.length;a<d;a++)c[a]()}var b=0,c=[],d,e,f=!1,g=a.createElement("a"),h="DOMContentLoaded",i="addEventListener",j="onreadystatechange";/^loade|c/.test(a.readyState)&&(b=1),a[i]&&a[i](h,e=function(){a.removeEventListener(h,e,f),k()},f),g.doScroll&&a.attachEvent(j,d=function(){/^c/.test(a.readyState)&&(a.detachEvent(j,d),k())});var l=g.doScroll?function(a){self!=top?b?a():c.push(a):!function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){l(a)},50)}a()}()}:function(a){b?a():c.push(a)};typeof module!="undefined"&&module.exports?module.exports={domReady:l}:window.domReady=l}(document);exports();loadrunner.Script.loaded.push("$vendor/domready/ready.js")});
provide("util/domready",function(a){using("$vendor/domready/ready.js",function(){a(domReady)})});
provide("util/util",function(a){function b(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}function c(a){return b([],a)}function d(a){for(var b in a)a.hasOwnProperty(b)&&!a[b]&&a[b]!==!1&&a[b]!==0&&delete a[b]}function e(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function f(a,b){if(!a)return null;if(!b)return a;if(a.filter)return a.filter(b);var c=[],d=0,e=a.length;for(;d<e;d++)b(a[d])&&c.push(a[d]);return c}function g(a,b){if(a.contains)return a.contains(b);var c=b.parentNode;while(c){if(c===a)return!0;c=c.parentNode}return!1}a({aug:b,array:c,indexOf:e,filter:f,compact:d,containsElement:g})});
provide("tfw/widget/base",function(a){using("util/util","util/domready","util/nodeselect","util/querystring","util/iframe",function(b,c,d,e,f){function m(a){if(!a)return;return a.lang?a.lang:m(a.parentNode)}function n(){var a=i.widgets,b,c;for(var e in a){e.match(/\./)?b=d.apply(this,e.split(".")):b=document.getElementsByTagName(e);for(var f=0,g;g=b[f];f++){if(g.getAttribute("data-twttr-rendered"))continue;g.setAttribute("data-twttr-rendered","true"),c=new a[e](g),j.list.push(c),j.byId[c.id]=c,c.render(i)}}}function o(a){i=a}function p(){n()}function q(a){return a&&j.byId[a]?j.byId[a].element:null}var g=0,h,i,j={list:[],byId:{}},k={"zh-tw":{"%{followers_count} followers":"%{followers_count} 位跟隨者","100K+":"超過十萬","10k unit":"1萬 單位",Follow:"跟隨","Follow %{screen_name}":"跟隨 %{screen_name}",K:"千",M:"百萬",Tweet:"推文","Tweet %{hashtag}":"推文%{hashtag}","Tweet to %{name}":"推文給%{name}"},"zh-cn":{"%{followers_count} followers":"%{followers_count} 关注者","100K+":"10万+","10k unit":"1万单元",Follow:"关注","Follow %{screen_name}":"关注 %{screen_name}",K:"千",M:"百万",Tweet:"发推","Tweet %{hashtag}":"以 %{hashtag} 发推","Tweet to %{name}":"发推给 %{name}"},ja:{"%{followers_count} followers":"%{followers_count}人のフォロワー","100K+":"10万以上","10k unit":"万",Follow:"フォローする","Follow %{screen_name}":"%{screen_name}さんをフォロー",K:"K",M:"M",Tweet:"ツイート","Tweet %{hashtag}":"%{hashtag} をツイートする","Tweet to %{name}":"%{name}さんへツイートする"},ru:{"%{followers_count} followers":"Читатели: %{followers_count} ","100K+":"100 тыс.+","10k unit":"блок 10k",Follow:"Читать","Follow %{screen_name}":"Читать %{screen_name}",K:"тыс.",M:"млн.",Tweet:"Твитнуть","Tweet %{hashtag}":"Твитнуть %{hashtag}","Tweet to %{name}":"Твитнуть %{name}"},da:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k enhed",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet til %{name}"},de:{"%{followers_count} followers":"%{followers_count} Follower","100K+":"100Tsd+","10k unit":"10tsd-Einheit",Follow:"Folgen","Follow %{screen_name}":"%{screen_name} folgen",K:"Tsd",M:"M",Tweet:"Twittern","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet an %{name}"},fil:{"%{followers_count} followers":"%{followers_count} mga tagasunod","100K+":"100K+","10k unit":"10k yunit",Follow:"Sundan","Follow %{screen_name}":"Sundan si %{screen_name}",K:"K",M:"M",Tweet:"I-tweet","Tweet %{hashtag}":"I-tweet ang %{hashtag}","Tweet to %{name}":"Mag-Tweet kay %{name}"},ur:{"%{followers_count} followers":"%{followers_count} فالورز","100K+":"1 لاکھ+","10k unit":"دس ہزار یونٹ",Follow:"فالو کریں","Follow %{screen_name}":"%{screen_name} کو فالو کریں",K:"ہزار",M:"ملین",Tweet:"ٹویٹ کریں","Tweet %{hashtag}":"ٹویٹ کریں %{hashtag}","Tweet to %{name}":"%{name} کو ٹویٹ کریں"},id:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikuti","Follow %{screen_name}":"Ikuti %{screen_name}",K:"&nbsp;ribu",M:"&nbsp;juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet ke %{name}"},it:{"%{followers_count} followers":"%{followers_count} follower","100K+":"100K+","10k unit":"10k unità",Follow:"Segui","Follow %{screen_name}":"Segui %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Twitta %{hashtag}","Tweet to %{name}":"Twitta a %{name}"},fr:{"%{followers_count} followers":"%{followers_count} abonnés","100K+":"100K+","10k unit":"unité de 10k",Follow:"Suivre","Follow %{screen_name}":"Suivre %{screen_name}",K:"K",M:"M",Tweet:"Tweeter","Tweet %{hashtag}":"Tweeter %{hashtag}","Tweet to %{name}":"Tweeter à %{name}"},fi:{"%{followers_count} followers":"%{followers_count} seuraajaa","100K+":"100 000+","10k unit":"10 000 yksikköä",Follow:"Seuraa","Follow %{screen_name}":"Seuraa käyttäjää %{screen_name}",K:"tuhatta",M:"milj.",Tweet:"Twiittaa","Tweet %{hashtag}":"Twiittaa %{hashtag}","Tweet to %{name}":"Twiittaa käyttäjälle %{name}"},tr:{"%{followers_count} followers":"%{followers_count} takipçi","100K+":"+100 bin","10k unit":"10 bin birim",Follow:"Takip et","Follow %{screen_name}":"Takip et: %{screen_name}",K:"bin",M:"milyon",Tweet:"Tweetle","Tweet %{hashtag}":"Tweetle: %{hashtag}","Tweet to %{name}":"Tweetle: %{name}"},fa:{"%{followers_count} followers":"%{followers_count} دنبال‌کننده","100K+":">۱۰۰هزار","10k unit":"۱۰هزار واحد",Follow:"دنبال کردن","Follow %{screen_name}":"دنبال کردن %{screen_name}",K:"هزار",M:"میلیون",Tweet:"توییت","Tweet %{hashtag}":"توییت کردن %{hashtag}","Tweet to %{name}":"به %{name} توییت کنید"},ko:{"%{followers_count} followers":"%{followers_count}명의 팔로워","100K+":"100만 이상","10k unit":"만 단위",Follow:"팔로우","Follow %{screen_name}":"%{screen_name} 팔로우하기",K:"천",M:"백만",Tweet:"트윗","Tweet %{hashtag}":"%{hashtag} 관련 트윗하기","Tweet to %{name}":"%{name}님에게 트윗하기"},th:{"%{followers_count} followers":"%{followers_count} ผู้ติดตาม","100K+":"100พัน+","10k unit":"หน่วย 10พัน",Follow:"ติดตาม","Follow %{screen_name}":"ติดตาม %{screen_name}",K:"พัน",M:"ล้าน",Tweet:"ทวีต","Tweet %{hashtag}":"ทวีต %{hashtag}","Tweet to %{name}":"ทวีตถึง %{name}"},ar:{"%{followers_count} followers":"عدد المتابعين %{followers_count}","100K+":"+100 ألف","10k unit":"10 آلاف وحدة",Follow:"تابع","Follow %{screen_name}":"تابع %{screen_name}",K:"ألف",M:"مليون",Tweet:"غرِّد","Tweet %{hashtag}":"غرِّد %{hashtag}","Tweet to %{name}":"غرِّد لـ %{name}"},hi:{"%{followers_count} followers":"%{followers_count} फ़ॉलोअर्स","100K+":"१०० हजार+","10k unit":"१० हजार इकाईयां",Follow:"फ़ॉलो","Follow %{screen_name}":"%{screen_name} को फ़ॉलो करें",K:"हजार",M:"१० लाख",Tweet:"ट्वीट","Tweet %{hashtag}":"ट्वीट %{hashtag}","Tweet to %{name}":"%{name} को ट्वीट करें"},sv:{"%{followers_count} followers":"%{followers_count} följare","100K+":"100K+","10k unit":"10k",Follow:"Följ","Follow %{screen_name}":"Följ %{screen_name}",K:"K",M:"M",Tweet:"Tweeta","Tweet %{hashtag}":"Tweeta %{hashtag}","Tweet to %{name}":"Tweeta till %{name}"},he:{"%{followers_count} followers":"%{followers_count} עוקבים","100K+":"מאות אלפים","10k unit":"עשרות אלפים",Follow:"מעקב","Follow %{screen_name}":"לעקוב אחר %{screen_name}",K:"אלף",M:"מיליון",Tweet:"ציוץ","Tweet %{hashtag}":"צייצו %{hashtag}","Tweet to %{name}":"ציוץ אל %{name}"},pl:{"%{followers_count} followers":"%{followers_count} obserwujących","100K+":"100 tys.+","10k unit":"10 tys.",Follow:"Obserwuj","Follow %{screen_name}":"Obserwuj %{screen_name}",K:"tys.",M:"mln",Tweet:"Tweetnij","Tweet %{hashtag}":"Tweetnij %{hashtag}","Tweet to %{name}":"Tweetnij do %{name}"},nl:{"%{followers_count} followers":"%{followers_count} volgers","100K+":"100k+","10k unit":"10k-eenheid",Follow:"Volgen","Follow %{screen_name}":"%{screen_name} volgen",K:"k",M:" mln.",Tweet:"Tweeten","Tweet %{hashtag}":"%{hashtag} tweeten","Tweet to %{name}":"Tweeten naar %{name}"},es:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"100K+","10k unit":"10k unidad",Follow:"Seguir","Follow %{screen_name}":"Seguir a %{screen_name}",K:"K",M:"M",Tweet:"Twittear","Tweet %{hashtag}":"Twittear %{hashtag}","Tweet to %{name}":"Twittear a %{name}"},hu:{"%{followers_count} followers":"%{followers_count} követő","100K+":"100E+","10k unit":"10E+",Follow:"Követés","Follow %{screen_name}":"%{screen_name} követése",K:"E",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"%{hashtag} tweetelése","Tweet to %{name}":"Tweet küldése neki: %{name}"},pt:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"+100 mil","10k unit":"10 mil unidades",Follow:"Seguir","Follow %{screen_name}":"Siga %{screen_name}",K:"Mil",M:"M",Tweet:"Tweetar","Tweet %{hashtag}":"Tweetar %{hashtag}","Tweet to %{name}":"Tweetar para %{name}"},msa:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikut","Follow %{screen_name}":"Ikut %{screen_name}",K:"ribu",M:"juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet kepada %{name}"},no:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k ",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Send tweet til %{name}"}},l=function(){};b.aug(l.prototype,{setLanguage:function(a){var b;a||(a=this.params().lang||this.originElement.getAttribute("data-lang")||m(this.originElement)),a=a&&a.toLowerCase();if(!a)return this.lang="en";if(k[a])return this.lang=a;b=a.replace(/[-_].*/,"");if(k[b])return this.lang=b;this.lang="en"},_:function(a,b){var c=this.lang;b=b||{};if(!c||!k.hasOwnProperty(c))c=this.lang="en";return a=k[c]&&k[c][a]||a,this.ringo(a,b,/%\{([\w_]+)\}/g)},ringo:function(a,b,c){return c=c||/\{\{([\w_]+)\}\}/g,a.replace(c,function(a,c){return b[c]!==undefined?b[c]:a})},add:function(a){j.list.push(this),j.byId[this.id]=a},create:function(a,b,c,d){return this.id=this.generateId(),f({url:a,css:{width:c[0]+(typeof c[0]!="string"?"px":""),height:c[1]+(typeof c[1]!="string"?"px":"")},className:b,id:this.id,attributes:d,replace:this.originElement})},params:function(){var a=this.originElement.href&&this.originElement.href.split("?")[1],b=a?e.decode(a):{};return(this.params=function(){return b})()},dataAttr:function(a){return this.originElement.getAttribute("data-"+a)},generateId:function(){return this.originElement.id||"twitter-widget-"+g++},styles:{base:"font: normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; white-space: nowrap;",button:"font-weight: bold; text-shadow: 0 1px 0 rgba(255,255,255,.5);",large:"font-size: 13px; line-height: 26px;",vbubble:"font-size: 16px;"},width:function(){throw new Error(name+" not implemented")},height:function(){return this.size=="m"?20:28},dimensions:function(){return[this.width(),this.height()]}}),a({Base:l,init:o,embed:p,find:q,TWITTER_PROFILE_URL:/^https?\:\/\/(?:www\.)?twitter\.com\/(?:#!?\/)?([\w_]{1,20})\/?$/})})});
provide("util/events",function(a){using("util/util",function(b){function d(){this.completed=!1,this.callbacks=[]}var c={bind:function(a,b){return this._handlers=this._handlers||{},this._handlers[a]=this._handlers[a]||[],this._handlers[a].push(b)},unbind:function(a,c){if(!this._handlers[a])return;if(c){var d=b.indexOf(this._handlers[a],c);d>=0&&this._handlers[a].splice(d,1)}else this._handlers[a]=[]},trigger:function(a,b){var c=this._handlers&&this._handlers[a];b.type=a;if(c)for(var d=0,e;e=c[d];d++)e.call(this,b)}};d.prototype.addCallback=function(a){this.completed?a.apply(this,this.results):this.callbacks.push(a)},d.prototype.complete=function(){this.results=makeArray(arguments),this.completed=!0;for(var a=0,b;b=this.callbacks[a];a++)b.apply(this,this.results)},a({Emitter:c,Promise:d})})});
provide("util/uri",function(a){using("util/querystring","util/util",function(b,c){function d(a){var b;return a.match(/^https?:\/\//)?a:(b=location.host,location.port.length>0&&(b+=":"+location.port),[location.protocol,"//",b,a].join(""))}function e(){var a=document.getElementsByTagName("link");for(var b=0,c;c=a[b];b++)if(c.getAttribute("rel")=="canonical")return d(c.getAttribute("href"));return null}function f(){var a=document.getElementsByTagName("a"),b=document.getElementsByTagName("link"),d=/\bme\b/,e=/^https?\:\/\/(www\.)?twitter.com\/([a-zA-Z0-9_]+)$/,f=c.array(a).concat(c.array(b)),g,h,i;for(var j=0,k;k=f[j];j++){h=k.getAttribute("rel"),i=k.getAttribute("href");if(h&&i&&h.match(d)&&(g=i.match(e)))return g[2]}}a({absolutize:d,getCanonicalURL:e,getScreenNameFromPage:f})})});
provide("tfw/widget/intent",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri",function(b,c,d,e){function m(a){var b=Math.round(k/2-h/2),c=0;j>i&&(c=Math.round(j/2-i/2)),window.open(a,"intent",g+",width="+h+",height="+i+",left="+b+",top="+c)}function n(a,b){using("tfw/widget/hubclient",function(c){c.openIntent(a,b)})}function o(a){var b="original_referer="+location.href;return[a,b].join(a.indexOf("?")==-1?"?":"&")}function q(a){a=a||window.event;var b=a.target||a.srcElement,c,d;while(b&&b.nodeName.toLowerCase()!=="a")b=b.parentNode;if(b&&b.nodeName.toLowerCase()==="a"&&b.href){c=b.href.match(f);if(c){var e=o(b.href);e=e.replace(/^http[:]/,"https:"),e=e.replace(/^\/\//,"https://"),twttr.events.hub?(d=new p(l.generateId(),b),l.add(d),n(e,b),twttr.events.trigger("click",{target:b,region:"intent",type:"click",data:{}})):m(e),a.returnValue=!1,a.preventDefault&&a.preventDefault()}}}var f=/twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,g="scrollbars=yes,resizable=yes,toolbar=no,location=yes",h=550,i=520,j=screen.height,k=screen.width,l,p=function(a,b){this.id=a,this.element=this.originElement=b},r=function(a){this.originElement=[],this.element=a};r.prototype=new c.Base,b.aug(r.prototype,{render:function(a){l=this,window.__twitterIntentHandler||(document.addEventListener?document.addEventListener("click",q,!1):document.attachEvent&&document.attachEvent("onclick",q),window.__twitterIntentHandler=!0)}}),a({Listener:r})})});
provide("lib/twt",function(a){a(function(a,b){var c=a!="en"?a+".":"";using("$vendor/twt/dist/twt."+c+"min.js",function(){twt.settings.lang=a,b(twt)})})});
provide("$xd/json2.js", function(exports) {window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();exports();loadrunner.Script.loaded.push("$xd/json2.js")});
provide("util/decider",function(a){function c(a){var c=b[a]||!1;if(!c)return!1;if(c===!0||c===100)return!0;var d=Math.random()*100,e=c>=d;return b[a]=e,e}var b={force_new_cookie:100,rufous_pixel:100,decider_fixture:12.34};a({isAvailable:c})});
provide("util/params",function(a){using("util/querystring",function(b){var c=function(a){var c=a.search.substr(1);return b.decode(c)},d=function(a){var c=a.href,d=c.indexOf("#"),e=d<0?"":c.substring(d+1);return b.decode(e)},e=function(a){var b={},e=c(a),f=d(a);for(var g in e)e.hasOwnProperty(g)&&(b[g]=e[g]);for(var g in f)f.hasOwnProperty(g)&&(b[g]=f[g]);return b};a({combined:e,fromQuery:c,fromFragment:d})})});
provide("tfw/widget/env",function(a){using("util/params",function(b){function d(){var a=36e5,d=b.combined(document.location)._;return c!==undefined?c:(c=!1,d&&/^\d+$/.test(d)&&(c=+(new Date)-parseInt(d)<a),c)}var c;a({isDynamicWidget:d})})});
provide("dom/cookie",function(a){using("util/util",function(b){a(function(a,c,d){var e=b.aug({},d);if(arguments.length>1&&String(c)!=="[object Object]"){if(c===null||c===undefined)e.expires=-1;if(typeof e.expires=="number"){var f=e.expires,g=new Date((new Date).getTime()+f*60*1e3);e.expires=g}return c=String(c),document.cookie=[encodeURIComponent(a),"=",e.raw?c:encodeURIComponent(c),e.expires?"; expires="+e.expires.toUTCString():"",e.path?"; path="+e.path:"",e.domain?"; domain="+e.domain:"",e.secure?"; secure":""].join("")}e=c||{};var h,i=e.raw?function(a){return a}:decodeURIComponent;return(h=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?i(h[1]):null})})});
provide("util/donottrack",function(a){using("dom/cookie",function(b){a(function(a){var c=/\.(gov|mil)(:\d+)?$/i,d=/https?:\/\/([^\/]+).*/i;return a=a||document.referrer,a=d.test(a)&&d.exec(a)[1],b("dnt")?!0:c.test(document.location.host)?!0:a&&c.test(a)?!0:document.navigator?document.navigator["doNotTrack"]==1:navigator?navigator["doNotTrack"]==1||navigator["msDoNotTrack"]==1:!1})})});
provide("tfw/widget/guest_cookie",function(a){using("dom/cookie","util/donottrack","util/decider",function(b,c,d){function f(){var a=b(e)||!1;if(!a)return;a.match(/^v3\:/)||g()}function g(){b(e)&&b(e,null,{domain:".twitter.com",path:"/"})}function h(){c()&&g()}var e="pid";a({set:h,destroy:g,forceNewCookie:f,guest_id_cookie:e})})});
provide("tfw/widget/tracking",function(a){using("dom/cookie","util/donottrack","tfw/widget/guest_cookie","tfw/widget/env","util/decider",function(b,c,d,e,f){function i(a,b,c){var d=g+b;if(!a)return;return a[d]=c,a}function j(a,g,j,k,l){k||(k=!1),l||(l=!1),g||(g={}),j=j||"tweetbutton";var m=h[j]||h.tweetbutton,n=a.ownerDocument.createElement("img"),o=[];if(!k){var p=g.original_redirect_referrer||document.referrer.toString();i(g,"referrer",p),i(g,"widget",+e.isDynamicWidget()),!l&&!c(p)?(i(g,"hask",+!!b("k")),i(g,"li",+!!b("twid")),i(g,d.guest_id_cookie,b(d.guest_id_cookie)||"")):i(g,"dnt","1")}for(var q in g)if(g.hasOwnProperty(q)){var r=encodeURIComponent(q),s=encodeURIComponent(g[q]);s=s.replace(/'/g,"%27"),o.push(r+"="+s)}n.src=m+"?"+o.join("&"),n.alt="",n.style.position="absolute",n.style.height="1px",n.style.width="1px",n.style.top="-9999px",n.style.left="-9999px",a.appendChild(n);if(f.isAvailable("rufous_pixel")){var t={twttr_referrer:"referrer",twttr_variant:"version",lang:"language",screen_name:"screen_name"},u={_category_:"tfw_widgets",event_name:j+":impression"};for(var q in g){var v=t[q];v&&(u[v]=g[q])}!l&&!c(p)&&(g.twttr_li&&(u.logged_in=g["twttr_li"]=="1"),u.pid=b(d.guest_id_cookie)||""),g.status_id&&(u.tweet_ids=[g.status_id]),g.twttr_widget&&(u.widget=g["twttr_widget"]=="1");var n=a.ownerDocument.createElement("img"),w=Array.prototype.toJSON;delete Array.prototype.toJSON;var x="//r.twimg.com/jot?l="+encodeURIComponent(JSON.stringify(u)).replace(/'/g,"%27");Array.prototype.toJSON=w;if(l||c(p))x+="&dnt=1";n.src=x,n.alt="",n.style.position="absolute",n.style.height="1px",n.style.width="1px",n.style.top="-9999px",n.style.left="-9999px",a.appendChild(n)}}function k(){a({addPixel:j,addVar:i})}var g="twttr_",h={tweetbutton:"//p.twitter.com/t.gif",followbutton:"//p.twitter.com/f.gif",tweetembed:"//p.twitter.com/e.gif"};f.isAvailable("force_new_cookie")&&d.forceNewCookie(),typeof JSON=="undefined"?using("$xd/json2.js",function(){k()}):k()})});
provide("util/tweetparser",function(a){using("util/util",function(b){function g(a,c){var d=document.getElementsByTagName(a),e=b.filter(d,function(a){return b.containsElement(c,a)});return e||[]}function h(a){return a&&c.test(a)&&RegExp.$1}function i(a){if(!a||!a.nodeName||!/blockquote/i.test(a.nodeName))return;var b={},c=g("p",a).shift(),d=g("a",a).pop();if(!c&&g("br",a).length){c=document.createElement("p");for(var e=0,f;f=a.childNodes[e];e++){if(f.nodeType===1&&/^br$/i.test(f.nodeName))break;c.appendChild(f)}}return c&&(b.text=c.textContent||c.innerText||"",b.rendered_text=c.innerHTML||""),d&&(d.getAttribute("data-datetime")?b.created_at=d.getAttribute("data-datetime"):b.time=d.textContent||d.innerText),b.user=j(a),b.id=b.id_str=h(d.href),b.id_str&&b.text&&b.user&&b}function j(a){var b={},c=0,d=a.childNodes.length,h,i;for(;c<d;c++){h=a.childNodes[c],h.nodeType===1&&/^p$/i.test(h.nodeName)&&(h=h.childNodes[0]);if(h&&h.nodeType===3&&e.test(h.nodeValue)){b.name=RegExp.$1.split(" ").slice(1).join(" "),b.screen_name=RegExp.$2;break}}if(b.screen_name)return b;i=g("a",a).pop();if(i&&f.test(i.href))return b.name="",b.screen_name=RegExp.$2,b}var c=/\/(\d+)\/?$/,d=/^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?[\w_]+\/status(?:es)?\/(\d+)\/?/,e=/^\s*(.+)\s+\(@([\w_]{1,20})\)\s*$/,f=/^https?:\/\/(?:www\.)?twitter\.com\/(#!\/)?([\w_]{1,20})/;a({parseTweet:i,parseId:h,parseAuthor:j})})});
provide("i18n/i18n",function(a){function b(){twttr.i18n_missing_interval||(twttr.i18n_missing_interval=window.setInterval(function(){twttr.i18n_missing&&twttr.i18n_missing.length>0&&($.ajax({type:"POST",data:$.param({authenticity_token:twttr.form_authenticity_token,location:window.location.href,"strings[]":twttr.i18n_missing}),url:"/translate/untranslated_javascript"}),twttr.i18n_missing=new Array)},1e4))}function c(a){twttr.i18n_missing||(twttr.i18n_missing=new Array),twttr.i18n_missing_reported||(twttr.i18n_missing_reported={}),twttr.i18n_missing_reported[a]||(twttr.i18n_missing.push(encodeURIComponent(a)),twttr.i18n_missing_reported[a]=!0)}function d(a,b){if(b)for(var c in b)a=a.replace(new RegExp("\\%\\{"+c+"\\}","gi"),b[c]);return a}window.setupTranslationCallback=b,a({_:function(a,b){if(twttr.i18n){var e=twttr.i18n[a];e?a=e:c(a)}return d(a,b)},setupTranslationCallback:b})});
provide("tfw/data",function(a){using("util/querystring",function(b){window.twttr=window.twttr||{},window.twttr.tfw=window.twttr.tfw||{},window.twttr.tfw.callbacks=window.twttr.tfw.callbacks||{};var c="twttr.tfw.callbacks",d=twttr.tfw.callbacks,e="cb",f=0,g=!1,h=function(a,b){return a=={}.toString.call(b).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},i=function(a){return function(b){b.error?a.error&&a.error(b):a.success&&a.success(b),a.complete&&a.complete(b),j(a)}},j=function(a){var b=a.script;b&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),a.script=undefined,b=undefined),a.callbackName&&twttr.tfw.callbacks[a.callbackName]&&delete twttr.tfw.callbacks[a.callbackName]},k=function(a){var b={};return a.success&&h("function",a.success)&&(b.success=a.success),a.error&&h("function",a.error)&&(b.error=a.error),a.complete&&h("function",a.complete)&&(b.complete=a.complete),b},l=function(a,h){if(g||!/^https?\:$/.test(window.location.protocol))a=a.replace(/^\/\//,"https://");var j=e+f,k=c+"."+j;d[j]=i(h);var l=document.createElement("script"),m={callback:k,suppress_response_codes:!0};l.src=b.url(a,m),l.async="async";var n=document.head||document.getElementsByTagName("head")[0]||document.documentElement;n.appendChild(l),h.script=l,h.callbackName=j,f++},m=function(a,b,c){var d=a.length,e=[],f={},g=0;return function(e){var h;h=c(e),f[h]=e;if(++g===d){var i=[],j=[],k=[];for(var l=0;l<d;l++){var e=f[a[l]];i.push(e),e.error?k.push(e):j.push(e)}b.error&&k.length>0&&b.error(k),b.success&&j.length>0&&b.success(j),b.complete&&b.complete(i)}}},n={};n.config=function(a){if(a.forceSSL===!0||a.forceSSL===!1)g=a.forceSSL},n.user=function(){var a="//api.twitter.com/1/users/lookup.json",c="//cdn.api.twitter.com/1/users/show.json";return function(){var d,e={};arguments.length===1?(d=arguments[0].screenName,e=k(arguments[0])):(d=arguments[0],e.success=arguments[1]);var f=h("array",d)?a:c;d=h("array",d)?d.join(","):d;var g={screen_name:d},i=b.url(f,g);l(i,e)}}(),n.status=function(){var a="//cdn.api.twitter.com/1/statuses/show.json";return function(){var c,d={};arguments.length===1?(c=arguments[0].id,d=k(arguments[0])):(c=arguments[0],d.success=arguments[1]);if(!h("array",c)){var e={id:c,include_entities:!0},f=b.url(a,e);l(f,d)}else{var g=m(c,d,function(a){var b;return a.error?b=a.request.split("id=")[1].split("&")[0]:b=a.id_str,b});for(var i=0;i<c.length;i++){var e={id:c[i],include_entities:!0},f=b.url(a,e);l(f,{success:g,error:g})}}}}(),n.tweet=n.status,n.count=function(){var a="//cdn.api.twitter.com/1/urls/count.json";return function(){var c="",d={};arguments.length===1?(c=arguments[0].url,d=k(arguments[0])):arguments.length===2&&(c=arguments[0],d.success=arguments[1]);var e={url:c},f=b.url(a,e);l(f,d)}}(),n.friendshipExists=function(){var a="//cdn.api.twitter.com/1/friendships/exists.json";return function(c){var d=arguments[0],e=k(arguments[0]),f={screen_name_a:c.screenNameA,screen_name_b:c.screenNameB},g=b.url(a,f);l(g,e)}}(),a(n)})});
provide("util/insert",function(a){a(function(a,b){if(b){if(!b.parentNode)return b;b.parentNode.replaceChild(a,b),delete b}else document.body.insertBefore(a,document.body.firstChild);return a})});
provide("dom/textsize",function(a){function c(a,b,c){return a+b+c}var b={};a(function(a,d,e){var f=document.createElement("span"),g={},h;return e=e||"",d=d||"",h=c(a,d,e),b[h]?b[h]:(f.className=d+" twitter-measurement",f.setAttribute("style",e),f.innerHTML=a,document.body.appendChild(f),g.width=f.clientWidth||f.offsetWidth,g.height=f.clientHeight||f.offsetHeight,document.body.removeChild(f),delete f,b[h]=g)})});
provide("tfw/widget/tweet",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri","dom/textsize",function(b,c,d,e,f){var g=document.title,h=encodeURI(location.href),i=["vertical","horizontal","none"],j=function(a){this.originElement=a,this.id=this.generateId();var c=this.params(),d=c.count||this.dataAttr("count"),f=c.size||this.dataAttr("size"),j=e.getScreenNameFromPage();this.setLanguage(),~a.className.indexOf("twitter-hashtag-button")?this.type="hashtag":~a.className.indexOf("twitter-mention-button")&&(this.type="mention"),this.text=c.text||this.dataAttr("text"),this.align=c.align||this.dataAttr("align")||"",this.via=c.via||this.dataAttr("via"),this.related=c.related||this.dataAttr("related"),this.counturl=c.counturl||this.dataAttr("counturl"),this.searchlink=c.searchlink||this.dataAttr("searchlink"),this.placeid=c.placeid||this.dataAttr("placeid"),this.hashtags=c.hashtags||this.dataAttr("hashtags"),this.screen_name=c.screen_name||this.dataAttr("button-screen-name"),this.button_hashtag=c.button_hashtag||this.dataAttr("button-hashtag"),this.url=c.url||this.dataAttr("url"),this.size=f=="large"?"l":"m",this.dnt=c.dnt||this.dataAttr("dnt")||"",this.type?(this.count="none",j&&(this.related=this.related?j+","+this.related:j)):(this.text=this.text||g,this.url=this.url||e.getCanonicalURL()||h,this.count=~b.indexOf(i,d)?d:"horizontal",this.count=this.count=="vertical"&&this.size=="l"?"none":this.count,this.via=this.via||j)};j.prototype=new c.Base,b.aug(j.prototype,{parameters:function(){var a={text:this.text,url:this.url,via:this.via,related:this.related,count:this.count,lang:this.lang,counturl:this.counturl,searchlink:this.searchlink,placeid:this.placeid,original_referer:location.href,id:this.id,size:this.size,type:this.type,screen_name:this.screen_name,button_hashtag:this.button_hashtag,hashtags:this.hashtags,align:this.align,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},height:function(){return this.count=="vertical"?62:this.size=="m"?20:28},width:function(){var a={ver:8,cnt:14,btn:24,xlcnt:18,xlbtn:38},c=this.count=="vertical",d=this.type=="hashtag"?"Tweet %{hashtag}":this.type=="mention"?"Tweet to %{name}":"Tweet",e=this._(d,{name:"@"+this.screen_name,hashtag:"#"+this.button_hashtag}),g=this._("K"),h=this._("100K+"),i=(c?"8888":"88888")+g,j=0,k=0,l=0,m=0,n=this.styles.base,o=n;return~b.indexOf(["ja","ko"],this.lang)?i+=this._("10k unit"):i=i.length>h.length?i:h,c?(o=n+this.styles.vbubble,m=a.ver,l=a.btn):this.size=="l"?(n=o=n+this.styles.large,l=a.xlbtn,m=a.xlcnt):(l=a.btn,m=a.cnt),this.count!="none"&&(k=f(i,"",o).width+m),j=f(e,"",n+this.styles.button).width+l,c?j>k?j:k:this.calculatedWidth=j+k},render:function(a){var b=a.assetUrl()+"/widgets/tweet_button.1345016233.html#"+this.parameters();this.count&&(this.originElement.className+=" twitter-count-"+this.count),this.element=this.create(b,this.originElement.className,this.dimensions(),{title:this._("Twitter Tweet Button")})}}),a({Embeddable:j})})});
provide("tfw/widget/tweetembed",function(a){using("util/util","tfw/widget/base","tfw/widget/tweet","util/uri","util/insert","tfw/data","i18n/i18n","util/params","util/tweetparser","tfw/widget/tracking",function(b,c,d,e,f,g,h,i,j,k){function r(a){var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.href=twttr.widgets.config.assetUrl()+"/"+a,document.getElementsByTagName("head")[0].appendChild(b)}function s(){if(n)return;r("embed/embed.a7496683edd7dac5ab847ca2a44e080b.css"),n=!0}function t(a,b){var c={};c.status_id=a.id_str,c.context=p,k.addVar(c,"variant",l),k.addVar(c,"referrer",document.location.href),k.addPixel(document.body,c,"tweetembed",!0),b&&a._wjs_reply&&(c.status_id=a._wjs_reply.id_str,c.context=q,k.addPixel(document.body,c,"tweetembed",!0))}var l="1.0",m=i.fromQuery(document.location),n,o=/^([0-9]+)( ?px)?$/,p="subject",q="thread",u=function(a){var c,d,e=a.getAttribute("width")||"";this.originElement=a,this.id=this.generateId(),c=this.params(),this.setLanguage(),this.related=c.related||a.getAttribute("data-related"),this.partner=c.partner||a.getAttribute("data-partner"),this.classNames=b.filter(a.className.split(" "),function(a){return a!="twitter-tweet"}),this.classNames.push(["twitter-tweet-rendered"]),this.styleAttr=[],this.styleAttr.push(a.getAttribute("style")||""),o.test(e)?this.explicitWidth=RegExp.$1:a.className.match(/(?:\b|^)tw-align-[lr]/i)&&(this.explicitWidth="350"),this.explicitWidth&&this.styleAttr.push("width:"+this.explicitWidth+"px!important"),this.showThread=!~b.indexOf(this.classNames,"tw-hide-thread"),this.showMedia=!~b.indexOf(this.classNames,"tw-hide-media"),this.data=j.parseTweet(this.originElement),this.inReplyTo=a.getAttribute("data-in-reply-to")||""};u.prototype=new c.Base,b.aug(u.prototype,{create:function(a,b){var c=this,d,e=!!a._wjs_stub_data;return!e&&t(a,c.showThread),using("lib/twt",function(g){g(c.lang,function(g){var h=document.createElement("div"),i=g.autoFormat(c.explicitWidth||c.element),j=g(a,{format:i,popupWebIntents:!1,tweetElement:"blockquote",showMedia:c.showMedia,showErrors:!1,showFollowButton:!e,renderActions:!e,product:"tweetembed",partner:c.partner,related:c.related}),k='<div id="{{id}}" class="{{classNames}}" lang="{{lang}}" style="{{style}}">{{twt}}</div>',l={id:c.id,classNames:b||"",style:c.styleAttr.join(";"),lang:c.lang,twt:c.data._wjs_reply?j.inReplyTo(a._wjs_reply).html():j.html()};h.innerHTML=c.ringo(k,l),d=f(h.firstChild,c.element)})}),d},render:function(a){var b=this,c,d;if(!b.data)return;s(),using("lib/twt",function(a){a(b.lang,function(){c=b.classNames.join(" "),b.data._wjs_stub_data=!0,b.element=b.originElement,b.element=b.create(b.data,c),d=[b.data.id_str],b.inReplyTo&&b.showThread&&d.push(b.inReplyTo),g.status({id:d,complete:function(a){var d=a[0],e=a[1];if(d.error)return;b.data=d;if(b.showThread&&d.in_reply_to_status_id_str&&(!e||d.in_reply_to_status_id_str!=e.id_str)){g.status({id:d.in_reply_to_status_id_str,complete:function(a){a&&!a.error&&(b.data._wjs_reply=a),b.element=b.create(b.data,c)}});return}d.in_reply_to_status_id_str&&e&&!e.error&&(b.data._wjs_reply=e),b.element=b.create(b.data,c)}})})})}}),a({Embeddable:u})})});
provide("tfw/widget/follow",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri","dom/textsize",function(b,c,d,e,f){var g=function(a){this.originElement=a;var b=this.params(),c=b.size||this.dataAttr("size"),d=b.show_screen_name||this.dataAttr("show-screen-name"),e=b.show_count||this.dataAttr("show-count");this.id=this.generateId(),this.setLanguage(),this.showScreenName=d!="false",this.showCount=e!="false",this.explicitWidth=b.width||this.dataAttr("width")||"",this.screenName=this.screenNameFromHref(),this.preview=b.preview||this.dataAttr("preview")||"",this.align=b.align||this.dataAttr("align")||"",this.dnt=b.dnt||this.dataAttr("dnt")||"",this.size=c=="large"?"l":"m"};g.prototype=new c.Base,b.aug(g.prototype,{parameters:function(){var a={screen_name:this.screenName,lang:this.lang,show_count:this.showCount,show_screen_name:this.showScreenName,align:this.align,id:this.id,preview:this.preview,size:this.size,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},screenNameFromHref:function(){var a=this.originElement.href;return c.TWITTER_PROFILE_URL.test(a),RegExp.$1},render:function(a){if(!this.screenName)return;var b=a.assetUrl()+"/widgets/follow_button.1345016233.html#"+this.parameters();this.element=this.create(b,"twitter-follow-button",this.dimensions(),{title:this._("Twitter Follow Button")})},width:function(){if(this.calculatedWidth)return this.calculatedWidth;if(this.explicitWidth)return this.explicitWidth;var a={cnt:13,btn:24,xlcnt:22,xlbtn:38},c=this.showScreenName?"Follow %{screen_name}":"Follow",d=this._(c,{screen_name:"@"+this.screenName}),e=~b.indexOf(["ja","ko"],this.lang)?this._("10k unit"):this._("M"),g=this._("%{followers_count} followers",{followers_count:"88888"+e}),h=0,i=0,j=this.styles.base;return this.size=="l"?(j+=this.styles.large,buttonPadding=a.xlbtn,countPadding=a.xlcnt):(buttonPadding=a.btn,countPadding=a.cnt),this.showCount&&(i=f(g,"",j).width+countPadding),h=f(d,"",j+this.styles.button).width+buttonPadding,this.calculatedWidth=h+i}}),a({Embeddable:g})})});
!function(){function a(a){return(a||!/^http\:$/.test(window.location.protocol))&&!twttr.ignoreSSL?"https":"http"}window.twttr=window.twttr||{},twttr.host=twttr.host||"platform.twitter.com";if(twttr.widgets)return twttr.widgets.loaded&&twttr.widgets.load(),!1;if(twttr.init)return!1;twttr.init=!0,!function(){twttr._e=twttr._e||[],twttr.ready=twttr.ready||function(a){twttr.widgets&&twttr.widgets.loaded?a(twttr):twttr._e.push(a)}}(),using.path.length||(using.path=a()+"://"+twttr.host+"/js"),twttr.ignoreSSL=twttr.ignoreSSL||!1;var b=[];twttr.events={bind:function(a,c){return b.push([a,c])}},using("util/domready",function(c){c(function(){using("util/util","tfw/widget/follow","tfw/widget/tweet","tfw/widget/tweetembed","tfw/widget/intent","util/events","tfw/widget/base",function(c,d,e,f,g,h,i){function l(){using("tfw/widget/hubclient",function(a){twttr.events.hub=a.init(j),a.init(j,!0)})}var j={widgets:{"a.twitter-share-button":e.Embeddable,"a.twitter-mention-button":e.Embeddable,"a.twitter-hashtag-button":e.Embeddable,"a.twitter-follow-button":d.Embeddable,"blockquote.twitter-tweet":f.Embeddable,body:g.Listener}},k=twttr.events&&twttr.events.hub?twttr.events:{};twttr.events=c.aug(k,h.Emitter),j.assetUrl=function(b){var c=twttr.host;return a(b)=="https"&&twttr.secureHost&&(c=twttr.secureHost),a(b)+"://"+c},twttr.events.oldbind=twttr.events.bind,twttr.events.bind=function(a,b){l(),this.bind=this.oldbind,this.bind(a,b)};for(var m=0,n;n=b[m];m++)twttr.events.bind(n[0],n[1]);for(m=0;n=twttr._e[m];m++)n(twttr);twttr.ready=function(a){a(twttr)},twttr.widgets={load:function(){i.init(j),i.embed(),twttr.widgets.loaded=!0},config:j},twttr.widgets.load()})})})}()});