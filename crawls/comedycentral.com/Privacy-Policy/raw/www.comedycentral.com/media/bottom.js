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
})(jQuery);/* jcarousel.js */
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

/*global window, jQuery */
(function($) {
    // Default configuration properties.
    var defaults = {
        vertical: false,
        rtl: false,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: 'normal',
        easing: 'swing',
        auto: 0,
        wrap: null,
        initCallback: null,
        setupCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        animationStepCallback: null,
        buttonNextHTML: '<div></div>',
        buttonPrevHTML: '<div></div>',
        buttonNextEvent: 'click',
        buttonPrevEvent: 'click',
        buttonNextCallback: null,
        buttonPrevCallback: null,
        itemFallbackDimension: null
    }, windowLoaded = false;

    $(window).bind('load.jcarousel', function() { windowLoaded = true; });

    /**
     * The jCarousel object.
     *
     * @constructor
     * @class jcarousel
     * @param e {HTMLElement} The element to create the carousel for.
     * @param o {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.jcarousel = function(e, o) {
        this.options    = $.extend({}, defaults, o || {});

        this.locked          = false;
        this.autoStopped     = false;

        this.container       = null;
        this.clip            = null;
        this.list            = null;
        this.buttonNext      = null;
        this.buttonPrev      = null;
        this.buttonNextState = null;
        this.buttonPrevState = null;

        // Only set if not explicitly passed as option
        if (!o || o.rtl === undefined) {
            this.options.rtl = ($(e).attr('dir') || $('html').attr('dir') || '').toLowerCase() == 'rtl';
        }

        this.wh = !this.options.vertical ? 'width' : 'height';
        this.lt = !this.options.vertical ? (this.options.rtl ? 'right' : 'left') : 'top';

        // Extract skin class
        var skin = '', split = e.className.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i].indexOf('jcarousel-skin') != -1) {
                $(e).removeClass(split[i]);
                skin = split[i];
                break;
            }
        }

        if (e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL') {
            this.list      = $(e);
            this.clip      = this.list.parents('.jcarousel-clip');
            this.container = this.list.parents('.jcarousel-container');
        } else {
            this.container = $(e);
            this.list      = this.container.find('ul,ol').eq(0);
            this.clip      = this.container.find('.jcarousel-clip');
        }

        if (this.clip.size() === 0) {
            this.clip = this.list.wrap('<div></div>').parent();
        }

        if (this.container.size() === 0) {
            this.container = this.clip.wrap('<div></div>').parent();
        }

        if (skin !== '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1) {
            this.container.wrap('<div class=" '+ skin + '"></div>');
        }

        this.buttonPrev = $('.jcarousel-prev', this.container);

        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
            this.buttonPrev = $(this.options.buttonPrevHTML).appendTo(this.container);
        }

        this.buttonPrev.addClass(this.className('jcarousel-prev'));

        this.buttonNext = $('.jcarousel-next', this.container);

        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
            this.buttonNext = $(this.options.buttonNextHTML).appendTo(this.container);
        }

        this.buttonNext.addClass(this.className('jcarousel-next'));

        this.clip.addClass(this.className('jcarousel-clip')).css({
            position: 'relative'
        });

        this.list.addClass(this.className('jcarousel-list')).css({
            overflow: 'hidden',
            position: 'relative',
            top: 0,
            margin: 0,
            padding: 0
        }).css((this.options.rtl ? 'right' : 'left'), 0);

        this.container.addClass(this.className('jcarousel-container')).css({
            position: 'relative'
        });

        if (!this.options.vertical && this.options.rtl) {
            this.container.addClass('jcarousel-direction-rtl').attr('dir', 'rtl');
        }

        var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var li = this.list.children('li');

        var self = this;

        if (li.size() > 0) {
            var wh = 0, j = this.options.offset;
            li.each(function() {
                self.format(this, j++);
                wh += self.dimension(this, di);
            });

            this.list.css(this.wh, (wh + 100) + 'px');

            // Only set if not explicitly passed as option
            if (!o || o.size === undefined) {
                this.options.size = li.size();
            }
        }

        // For whatever reason, .show() does not work in Safari...
        this.container.css('display', 'block');
        this.buttonNext.css('display', 'block');
        this.buttonPrev.css('display', 'block');

        this.funcNext   = function() { self.next(); };
        this.funcPrev   = function() { self.prev(); };
        this.funcResize = function() { 
            if (self.resizeTimer) {
                clearTimeout(self.resizeTimer);
            }

            self.resizeTimer = setTimeout(function() {
                self.reload();
            }, 100);
        };

        if (this.options.initCallback !== null) {
            this.options.initCallback(this, 'init');
        }

        if (!windowLoaded && $.browser.safari) {
            this.buttons(false, false);
            $(window).bind('load.jcarousel', function() { self.setup(); });
        } else {
            this.setup();
        }
    };

    // Create shortcut for internal use
    var $jc = $.jcarousel;

    $jc.fn = $jc.prototype = {
        jcarousel: '0.2.8'
    };

    $jc.fn.extend = $jc.extend = $.extend;

    $jc.fn.extend({
        /**
         * Setups the carousel.
         *
         * @method setup
         * @return undefined
         */
        setup: function() {
            this.first       = null;
            this.last        = null;
            this.prevFirst   = null;
            this.prevLast    = null;
            this.animating   = false;
            this.timer       = null;
            this.resizeTimer = null;
            this.tail        = null;
            this.inTail      = false;

            if (this.locked) {
                return;
            }

            this.list.css(this.lt, this.pos(this.options.offset) + 'px');
            var p = this.pos(this.options.start, true);
            this.prevFirst = this.prevLast = null;
            this.animate(p, false);

            $(window).unbind('resize.jcarousel', this.funcResize).bind('resize.jcarousel', this.funcResize);

            if (this.options.setupCallback !== null) {
                this.options.setupCallback(this);
            }
        },

        /**
         * Clears the list and resets the carousel.
         *
         * @method reset
         * @return undefined
         */
        reset: function() {
            this.list.empty();

            this.list.css(this.lt, '0px');
            this.list.css(this.wh, '10px');

            if (this.options.initCallback !== null) {
                this.options.initCallback(this, 'reset');
            }

            this.setup();
        },

        /**
         * Reloads the carousel and adjusts positions.
         *
         * @method reload
         * @return undefined
         */
        reload: function() {
            if (this.tail !== null && this.inTail) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);
            }

            this.tail   = null;
            this.inTail = false;

            if (this.options.reloadCallback !== null) {
                this.options.reloadCallback(this);
            }

            if (this.options.visible !== null) {
                var self = this;
                var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                this.list.children('li').each(function(i) {
                    wh += self.dimension(this, di);
                    if (i + 1 < self.first) {
                        lt = wh;
                    }
                });

                this.list.css(this.wh, wh + 'px');
                this.list.css(this.lt, -lt + 'px');
            }

            this.scroll(this.first, false);
        },

        /**
         * Locks the carousel.
         *
         * @method lock
         * @return undefined
         */
        lock: function() {
            this.locked = true;
            this.buttons();
        },

        /**
         * Unlocks the carousel.
         *
         * @method unlock
         * @return undefined
         */
        unlock: function() {
            this.locked = false;
            this.buttons();
        },

        /**
         * Sets the size of the carousel.
         *
         * @method size
         * @return undefined
         * @param s {Number} The size of the carousel.
         */
        size: function(s) {
            if (s !== undefined) {
                this.options.size = s;
                if (!this.locked) {
                    this.buttons();
                }
            }

            return this.options.size;
        },

        /**
         * Checks whether a list element exists for the given index (or index range).
         *
         * @method get
         * @return bool
         * @param i {Number} The index of the (first) element.
         * @param i2 {Number} The index of the last element.
         */
        has: function(i, i2) {
            if (i2 === undefined || !i2) {
                i2 = i;
            }

            if (this.options.size !== null && i2 > this.options.size) {
                i2 = this.options.size;
            }

            for (var j = i; j <= i2; j++) {
                var e = this.get(j);
                if (!e.length || e.hasClass('jcarousel-item-placeholder')) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Returns a jQuery object with list element for the given index.
         *
         * @method get
         * @return jQuery
         * @param i {Number} The index of the element.
         */
        get: function(i) {
            return $('>.jcarousel-item-' + i, this.list);
        },

        /**
         * Adds an element for the given index to the list.
         * If the element already exists, it updates the inner html.
         * Returns the created element as jQuery object.
         *
         * @method add
         * @return jQuery
         * @param i {Number} The index of the element.
         * @param s {String} The innerHTML of the element.
         */
        add: function(i, s) {
            var e = this.get(i), old = 0, n = $(s);

            if (e.length === 0) {
                var c, j = $jc.intval(i);
                e = this.create(i);
                while (true) {
                    c = this.get(--j);
                    if (j <= 0 || c.length) {
                        if (j <= 0) {
                            this.list.prepend(e);
                        } else {
                            c.after(e);
                        }
                        break;
                    }
                }
            } else {
                old = this.dimension(e);
            }

            if (n.get(0).nodeName.toUpperCase() == 'LI') {
                e.replaceWith(n);
                e = n;
            } else {
                e.empty().append(s);
            }

            this.format(e.removeClass(this.className('jcarousel-item-placeholder')), i);

            var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var wh = this.dimension(e, di) - old;

            if (i > 0 && i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');
            }

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

            return e;
        },

        /**
         * Removes an element for the given index from the list.
         *
         * @method remove
         * @return undefined
         * @param i {Number} The index of the element.
         */
        remove: function(i) {
            var e = this.get(i);

            // Check if item exists and is not currently visible
            if (!e.length || (i >= this.first && i <= this.last)) {
                return;
            }

            var d = this.dimension(e);

            if (i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');
            }

            e.remove();

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
        },

        /**
         * Moves the carousel forwards.
         *
         * @method next
         * @return undefined
         */
        next: function() {
            if (this.tail !== null && !this.inTail) {
                this.scrollTail(false);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
            }
        },

        /**
         * Moves the carousel backwards.
         *
         * @method prev
         * @return undefined
         */
        prev: function() {
            if (this.tail !== null && this.inTail) {
                this.scrollTail(true);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
            }
        },

        /**
         * Scrolls the tail of the carousel.
         *
         * @method scrollTail
         * @return undefined
         * @param b {Boolean} Whether scroll the tail back or forward.
         */
        scrollTail: function(b) {
            if (this.locked || this.animating || !this.tail) {
                return;
            }

            this.pauseAuto();

            var pos  = $jc.intval(this.list.css(this.lt));

            pos = !b ? pos - this.tail : pos + this.tail;
            this.inTail = !b;

            // Save for callbacks
            this.prevFirst = this.first;
            this.prevLast  = this.last;

            this.animate(pos);
        },

        /**
         * Scrolls the carousel to a certain position.
         *
         * @method scroll
         * @return undefined
         * @param i {Number} The index of the element to scoll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        scroll: function(i, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.pauseAuto();
            this.animate(this.pos(i), a);
        },

        /**
         * Prepares the carousel and return the position for a certian index.
         *
         * @method pos
         * @return {Number}
         * @param i {Number} The index of the element to scoll to.
         * @param fv {Boolean} Whether to force last item to be visible.
         */
        pos: function(i, fv) {
            var pos  = $jc.intval(this.list.css(this.lt));

            if (this.locked || this.animating) {
                return pos;
            }

            if (this.options.wrap != 'circular') {
                i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);
            }

            var back = this.first > i;

            // Create placeholders, new list width/height
            // and new list position
            var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
            var c = back ? this.get(f) : this.get(this.last);
            var j = back ? f : f - 1;
            var e = null, l = 0, p = false, d = 0, g;

            while (back ? --j >= i : ++j < i) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    c[back ? 'before' : 'after' ](e);

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);

                if (p) {
                    l += d;
                }

                if (this.first !== null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size === null || j <= this.options.size)))) {
                    pos = back ? pos + d : pos - d;
                }
            }

            // Calculate visible items
            var clipping = this.clipping(), cache = [], visible = 0, v = 0;
            c = this.get(i - 1);
            j = i;

            while (++visible) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    // This should only happen on a next scroll
                    if (c.length === 0) {
                        this.list.prepend(e);
                    } else {
                        c[back ? 'before' : 'after' ](e);
                    }

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);
                if (d === 0) {
                    throw new Error('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
                }

                if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size) {
                    cache.push(e);
                } else if (p) {
                    l += d;
                }

                v += d;

                if (v >= clipping) {
                    break;
                }

                j++;
            }

             // Remove out-of-range placeholders
            for (var x = 0; x < cache.length; x++) {
                cache[x].remove();
            }

            // Resize list
            if (l > 0) {
                this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                if (back) {
                    pos -= l;
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                }
            }

            // Calculate first and last item
            var last = i + visible - 1;
            if (this.options.wrap != 'circular' && this.options.size && last > this.options.size) {
                last = this.options.size;
            }

            if (j > last) {
                visible = 0;
                j = last;
                v = 0;
                while (++visible) {
                    e = this.get(j--);
                    if (!e.length) {
                        break;
                    }
                    v += this.dimension(e);
                    if (v >= clipping) {
                        break;
                    }
                }
            }

            var first = last - visible + 1;
            if (this.options.wrap != 'circular' && first < 1) {
                first = 1;
            }

            if (this.inTail && back) {
                pos += this.tail;
                this.inTail = false;
            }

            this.tail = null;
            if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                var m = $jc.intval(this.get(last).css(!this.options.vertical ? 'marginRight' : 'marginBottom'));
                if ((v - m) > clipping) {
                    this.tail = v - clipping - m;
                }
            }

            if (fv && i === this.options.size && this.tail) {
                pos -= this.tail;
                this.inTail = true;
            }

            // Adjust position
            while (i-- > first) {
                pos += this.dimension(this.get(i));
            }

            // Save visible item range
            this.prevFirst = this.first;
            this.prevLast  = this.last;
            this.first     = first;
            this.last      = last;

            return pos;
        },

        /**
         * Animates the carousel to a certain position.
         *
         * @method animate
         * @return undefined
         * @param p {Number} Position to scroll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        animate: function(p, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.animating = true;

            var self = this;
            var scrolled = function() {
                self.animating = false;

                if (p === 0) {
                    self.list.css(self.lt,  0);
                }

                if (!self.autoStopped && (self.options.wrap == 'circular' || self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size === null || self.last < self.options.size || (self.last == self.options.size && self.tail !== null && !self.inTail))) {
                    self.startAuto();
                }

                self.buttons();
                self.notify('onAfterAnimation');

                // This function removes items which are appended automatically for circulation.
                // This prevents the list from growing infinitely.
                if (self.options.wrap == 'circular' && self.options.size !== null) {
                    for (var i = self.prevFirst; i <= self.prevLast; i++) {
                        if (i !== null && !(i >= self.first && i <= self.last) && (i < 1 || i > self.options.size)) {
                            self.remove(i);
                        }
                    }
                }
            };

            this.notify('onBeforeAnimation');

            // Animate
            if (!this.options.animation || a === false) {
                this.list.css(this.lt, p + 'px');
                scrolled();
            } else {
                var o = !this.options.vertical ? (this.options.rtl ? {'right': p} : {'left': p}) : {'top': p};
                // Define animation settings.
                var settings = {
                    duration: this.options.animation,
                    easing:   this.options.easing,
                    complete: scrolled
                };
                // If we have a step callback, specify it as well.
                if ($.isFunction(this.options.animationStepCallback)) {
                    settings.step = this.options.animationStepCallback;
                }
                // Start the animation.
                this.list.animate(o, settings);
            }
        },

        /**
         * Starts autoscrolling.
         *
         * @method auto
         * @return undefined
         * @param s {Number} Seconds to periodically autoscroll the content.
         */
        startAuto: function(s) {
            if (s !== undefined) {
                this.options.auto = s;
            }

            if (this.options.auto === 0) {
                return this.stopAuto();
            }

            if (this.timer !== null) {
                return;
            }

            this.autoStopped = false;

            var self = this;
            this.timer = window.setTimeout(function() { self.next(); }, this.options.auto * 1000);
        },

        /**
         * Stops autoscrolling.
         *
         * @method stopAuto
         * @return undefined
         */
        stopAuto: function() {
            this.pauseAuto();
            this.autoStopped = true;
        },

        /**
         * Pauses autoscrolling.
         *
         * @method pauseAuto
         * @return undefined
         */
        pauseAuto: function() {
            if (this.timer === null) {
                return;
            }

            window.clearTimeout(this.timer);
            this.timer = null;
        },

        /**
         * Sets the states of the prev/next buttons.
         *
         * @method buttons
         * @return undefined
         */
        buttons: function(n, p) {
            if (n == null) {
                n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size === null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size !== null && this.last >= this.options.size) {
                    n = this.tail !== null && !this.inTail;
                }
            }

            if (p == null) {
                p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size !== null && this.first == 1) {
                    p = this.tail !== null && this.inTail;
                }
            }

            var self = this;

            if (this.buttonNext.size() > 0) {
                this.buttonNext.unbind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);

                if (n) {
                    this.buttonNext.bind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);
                }

                this.buttonNext[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);

                if (this.options.buttonNextCallback !== null && this.buttonNext.data('jcarouselstate') != n) {
                    this.buttonNext.each(function() { self.options.buttonNextCallback(self, this, n); }).data('jcarouselstate', n);
                }
            } else {
                if (this.options.buttonNextCallback !== null && this.buttonNextState != n) {
                    this.options.buttonNextCallback(self, null, n);
                }
            }

            if (this.buttonPrev.size() > 0) {
                this.buttonPrev.unbind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);

                if (p) {
                    this.buttonPrev.bind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);
                }

                this.buttonPrev[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

                if (this.options.buttonPrevCallback !== null && this.buttonPrev.data('jcarouselstate') != p) {
                    this.buttonPrev.each(function() { self.options.buttonPrevCallback(self, this, p); }).data('jcarouselstate', p);
                }
            } else {
                if (this.options.buttonPrevCallback !== null && this.buttonPrevState != p) {
                    this.options.buttonPrevCallback(self, null, p);
                }
            }

            this.buttonNextState = n;
            this.buttonPrevState = p;
        },

        /**
         * Notify callback of a specified event.
         *
         * @method notify
         * @return undefined
         * @param evt {String} The event name
         */
        notify: function(evt) {
            var state = this.prevFirst === null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

            // Load items
            this.callback('itemLoadCallback', evt, state);

            if (this.prevFirst !== this.first) {
                this.callback('itemFirstInCallback', evt, state, this.first);
                this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
            }

            if (this.prevLast !== this.last) {
                this.callback('itemLastInCallback', evt, state, this.last);
                this.callback('itemLastOutCallback', evt, state, this.prevLast);
            }

            this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
        },

        callback: function(cb, evt, state, i1, i2, i3, i4) {
            if (this.options[cb] == null || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation')) {
                return;
            }

            var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

            if (!$.isFunction(callback)) {
                return;
            }

            var self = this;

            if (i1 === undefined) {
                callback(self, state, evt);
            } else if (i2 === undefined) {
                this.get(i1).each(function() { callback(self, this, i1, state, evt); });
            } else {
                var call = function(i) {
                    self.get(i).each(function() { callback(self, this, i, state, evt); });
                };
                for (var i = i1; i <= i2; i++) {
                    if (i !== null && !(i >= i3 && i <= i4)) {
                        call(i);
                    }
                }
            }
        },

        create: function(i) {
            return this.format('<li></li>', i);
        },

        format: function(e, i) {
            e = $(e);
            var split = e.get(0).className.split(' ');
            for (var j = 0; j < split.length; j++) {
                if (split[j].indexOf('jcarousel-') != -1) {
                    e.removeClass(split[j]);
                }
            }
            e.addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i)).css({
                'float': (this.options.rtl ? 'right' : 'left'),
                'list-style': 'none'
            }).attr('jcarouselindex', i);
            return e;
        },

        className: function(c) {
            return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
        },

        dimension: function(e, d) {
            var el = $(e);

            if (d == null) {
                return !this.options.vertical ?
                       (el.outerWidth(true) || $jc.intval(this.options.itemFallbackDimension)) :
                       (el.outerHeight(true) || $jc.intval(this.options.itemFallbackDimension));
            } else {
                var w = !this.options.vertical ?
                    d - $jc.intval(el.css('marginLeft')) - $jc.intval(el.css('marginRight')) :
                    d - $jc.intval(el.css('marginTop')) - $jc.intval(el.css('marginBottom'));

                $(el).css(this.wh, w + 'px');

                return this.dimension(el);
            }
        },

        clipping: function() {
            return !this.options.vertical ?
                this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
        },

        index: function(i, s) {
            if (s == null) {
                s = this.options.size;
            }

            return Math.round((((i-1) / s) - Math.floor((i-1) / s)) * s) + 1;
        }
    });

    $jc.extend({
        /**
         * Gets/Sets the global default configuration properties.
         *
         * @method defaults
         * @return {Object}
         * @param d {Object} A set of key/value pairs to set as configuration properties.
         */
        defaults: function(d) {
            return $.extend(defaults, d || {});
        },

        intval: function(v) {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        },

        windowLoaded: function() {
            windowLoaded = true;
        }
    });

    /**
     * Creates a carousel for all matched elements.
     *
     * @example $("#mycarousel").jcarousel();
     * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
     * @result
     *
     * <div class="jcarousel-skin-name">
     *   <div class="jcarousel-container">
     *     <div class="jcarousel-clip">
     *       <ul class="jcarousel-list">
     *         <li class="jcarousel-item-1">First item</li>
     *         <li class="jcarousel-item-2">Second item</li>
     *       </ul>
     *     </div>
     *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
     *     <div class="jcarousel-next"></div>
     *   </div>
     * </div>
     *
     * @method jcarousel
     * @return jQuery
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
    $.fn.jcarousel = function(o) {
        if (typeof o == 'string') {
            var instance = $(this).data('jcarousel'), args = Array.prototype.slice.call(arguments, 1);
            return instance[o].apply(instance, args);
        } else {
            return this.each(function() {
                var instance = $(this).data('jcarousel');
                if (instance) {
                    if (o) {
                        $.extend(instance.options, o);
                    }
                    instance.reload();
                } else {
                    $(this).data('jcarousel', new $jc(this, o));
                }
            });
        }
    };

})(jQuery);
/* crabapple.js */
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
			/*
			miniPlayer.events = {
				onReady:CCminiPlayer.onPlayerLoaded,
				onStateChange:CCminiPlayer.onStateChange
			};
			*/
			
			//Player API updated.  New Way to bind Events.  See http://mtvn-player.github.com/embed-api/docs/#!/api/MTVNPlayer.Events
			miniPlayer.bind("onReady", CCminiPlayer.onPlayerLoaded);
			miniPlayer.bind("onStateChange", CCminiPlayer.onStateChange);
			
		},
		
		onPlayerLoaded : function() {
			
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
			miniPlayer.pause();
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

		init: function (elm){
			// Find next URL on page
			nextURL = $(elm).attr("data-url");

			// Grab player
			$player_ready = false;
			if ($Crabapple.playerA != undefined){
				$video_player = $Crabapple.playerA.player.video_player_box;
				// Redirect onPlaylistComplete
				$video_player.events.onPlaylistComplete	= function(){
					window.location.href = nextURL;
				}
			}else{
				console.info("Note: $Crabapple.playerA is undefined!");
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
});/* ccstandup_header.js */
/*
 * Used in SUP G002
 **/
$(document).ready(function(){
	$Crabapple(".channel_schedule .carousel_wrap .scrollable").carousel({
			scroll: 1,
			wrap: null,
			circularOnLast: false,
			buttonNextHTML: '<a href="#" onclick="return false" class="next">Next<span></span></a>',
			buttonPrevHTML: '<a href="#" onclick="return false" class="prev">Previous<span></span></a>'
		});
});


/* ccsu.js */
/**
 * Creates $CCSU global object which will hold all CCSU javascript stuff
 */
(function($) {
	$CCSU = $.namespace('CCSU');
}) (jQuery);

/* ccsu.tweetriver.js */
/* 
 * Used in SUP M052
 */
(function($) {
	$CCSU.TweetRiver = function () {};
	
	$Crabapple.extend($Crabapple.TweetRiver, $CCSU.TweetRiver, {
		init: function (elm, options) {},

		afterLoadTweets: function (container, tweets) {
			$CCSU.TweetRiver.tweetRiverData = tweets;
			$CCSU.TweetRiver.moduleContainer = container;
			$CCSU.TweetRiver.template = $('li.tweet', container).removeClass('hide');
			$CCSU.TweetRiver.tweetsNumber = this.options.tweetsNumber;
			$CCSU.TweetRiver.maxLoads = this.options.maxLoads;
			$CCSU.TweetRiver.index = 0;

			$('li.tweet',container).remove();
			this.loadTweetsToDom(container, tweets);

			var loadTweets = this.loadTweetsToDom;

			$('.get_more_button a').click(function(){
				if (!(loadTweets($CCSU.TweetRiver.moduleContainer,$CCSU.TweetRiver.tweetRiverData))){
					$(this).closest('.footer').remove();
				}
				return false;
			})
			
		},

		loadTweetsToDom: function(container, tweets){
			var currentTweetsNumber = $CCSU.TweetRiver.moduleContainer.find('li.tweet').length;
			var iteration = (Math.floor(currentTweetsNumber / $CCSU.TweetRiver.tweetsNumber))+1;
			var tweetsToShow = $CCSU.TweetRiver.tweetsNumber * iteration;

			$.each(tweets, function (index){
				if($CCSU.TweetRiver.tweetsNumber * (iteration-1) <= index && index < tweetsToShow){
					var li = $CCSU.TweetRiver.template.clone().hide();
					var regLink = new RegExp('http:\\/\\/\\S+');
					var regHashtag	= new RegExp('\\B#([_a-zA-Z0-9]+)');
					var regReply = new RegExp('\\B@([_a-zA-Z0-9]+)');
					var id = this.id_str;
					var name	= this.user.name;
					var link	= 'https://twitter.com/' + this.user.screen_name + '/status/' + id;
					var image	= this.user.profile_image_url;
					var nickname = this.user.screen_name;
					var date	= $Crabapple.utils.DateTime.relativeTime(new Date(this.created_at));
					var content = this.text.replace(regLink, function (link) {
						return '<a href="' + link + '" target="_blank">' + link + '</a>';
					}).replace(regHashtag, function (hashtag) {
						return '<a href="https://twitter.com/#!/search/%23' + hashtag.substring(1) + '" target="_blank">' + hashtag + '</a>';
					}).replace(regReply, function (reply) {
						return '<a href="https://twitter.com/#!/' + reply.substring(1) + '" target="_blank">' + reply + '</a>';
					});

					$('.twitter_avatar img', li).attr('src', image);
					$('.twitter_name', li).text(name);
					$('.twitter_handle', li).append(nickname);
					$('.message', li).append(content);
					$('.date', li).append(date);
					$('.intent', li).each(function () {
						$(this).attr('href', $(this).attr('href') + id);
					});
					container.append(li);
					$(li).slideDown(500);
				}
				if(tweetsToShow-1 == index){return false;}
			});
			if(iteration < $CCSU.TweetRiver.maxLoads && $CCSU.TweetRiver.tweetRiverData.length > tweetsToShow){
				return true;
			}else{
				return false;	
			}
		}		
	});

	$.pluginize('tweetriver', $CCSU.TweetRiver, $CCSU);
}) (jQuery);

/* ccsu_joke_gallery.js */
$(function() {
	// setup div.scrollable as a container for our carousel
	$Crabapple(".joke_gallery .carousel_wrapper").scrollable();
	$Crabapple(".joke_gallery a.arrow").click(function(){
		//TODO: Sharebar reInit.
	})
});/* ccsu_laughstub_search.js */
/* 
 * Used in SUP M036 LaughStub Tour Search
 */
$(function() {
	$('#ls_widget_search_btn').mousedown(function(){
		var placeholder = 'Search by comedian, venue or show',
			$textInput = $('#ls_widget_search_query'),
			$buttonSubmit = $('#frmLsSearchTours');
		if($textInput.val() === placeholder || $.trim($textInput.val()) === ''){
			$('#ls-widget-search-results').html('<div class="error-message ls-widget-search-results-head">No search data was entered</div>');
			if(!$buttonSubmit.data('valueSubmit')){
				$buttonSubmit.data('valueSubmit',$buttonSubmit.attr('onsubmit'));
			}
			$buttonSubmit.attr('onsubmit','return false');
			$textInput.focus();
		}
	});
	$('#ls_widget_search_btn').mouseup(function(){
		var $buttonSubmit = $('#frmLsSearchTours');
		if($buttonSubmit.data('valueSubmit')){
			setTimeout(function(){
				$buttonSubmit.attr('onsubmit',$buttonSubmit.data('valueSubmit'))
			},100);
		}
	});
});/* ccsu_tv_schedule.js */
$(function() {
	// setup div.scrollable as a container for our carousel
	$Crabapple(".ccsu_tv_schedule .carousel_wrapper").scrollable({
		vertical: true,
		onSeek: function(){	
			if (this.getIndex() >= (this.getSize()-3))
			{
				$Crabapple('.ccsu_tv_schedule a.next').addClass('disabled');				
			} 
			else
			{
				$Crabapple('.ccsu_tv_schedule a.next').removeClass('disabled');
			}
			
		}
	});
	$(".ccsu_tv_schedule a.next, .ccsu_tv_schedule a.prev").click(function(){
		return false
	});
});/* comedian_showcase.js */
/* 
 * Used in SUP M056 Comedian Showcase
 */
$(function() {
	$Crabapple(".comedian_showcase .tabs_filter").tabs(".comedian_showcase .tabs_content>li", {
		event: 'click',
		rotate: true,
		tabs: 'li'
	});
	$(".comedian_showcase .tabs_filter a").click(function(){
		$(this).parent().trigger('click');
		return false
	});
});/* homepage_tweets.js */
$(function () {
	$CCSU('.homepage_tweets .tweetriver').tweetriver({feedUrl: $CCSU('.homepage_tweets .tweetriver').data('feed'),tweetsNumber: 4, maxLoads: 3});
});

/* ccsu.carousel.js */
(function($) {
	$Crabapple.Carousel = function(){};

	$Crabapple.extend($Crabapple.Module, $Crabapple.Carousel, {
		timer: null,
		realSize: 0,
		jCarouselIndexAttr: 'jcarouselindex',

		options: {
	        vertical: false,
	        rtl: false,
	        start: 1,
	        offset: 1,
	        scroll: 3,
	        visible: null,
	        animation: 'normal',
	        easing: 'swing',
	        auto: 0,
	        wrap: null,
	        initCallback: null,
	        setupCallback: null,
	        reloadCallback: null,
	        itemLoadCallback: null,
	        itemFirstInCallback: null,
	        itemFirstOutCallback: null,
	        itemLastInCallback: null,
	        itemLastOutCallback: null,
	        itemVisibleInCallback: null,
	        itemVisibleOutCallback: null,
	        animationStepCallback: null,
	        buttonNextHTML: '<a href="javascript:" class="next">Next</a>',
	        buttonPrevHTML: '<a href="javascript:" class="prev">Previous</a>',
	        buttonNextEvent: 'click',
	        buttonPrevEvent: 'click',
	        buttonNextCallback: null,
	        buttonPrevCallback: null,
	        itemFallbackDimension: null,
	        rotateInterval: 5000, //additional params
	        freezeOnHover: true, //if true, rotation will stop on content hover acrion
	        nextButtonCallbackList: '', //list of callbacks likes: '_highlightFirstItem,_stopAutoScroll'
	        prevButtonCallbackList: '', //list of callbacks likes: '_highlightFirstItem,_stopAutoScroll'
	        hightLightFirstVisibleItem: false,
	        circularOnLast: false,
	        hideButtons: true // hide buttons prev|next if elements size is less or equal scroll value
		},

		init: function(elem, options)
		{
			if( this.$elem.attr('auto_rotate_interval') ){
				this.options.auto = this.$elem.attr('auto_rotate_interval');
			}
			this.realSize = $('li',this.$elem).size();

			if (this.options.hideButtons && this.options.scroll && this.options.scroll >= this.realSize){
				this.options.buttonNextHTML = '';
				this.options.buttonPrevHTML = '';
			}

			if( this.options.hightLightFirstVisibleItem ){
				this.options.itemFirstInCallback = jQuery.proxy(function(args){
					this._highlightFirstVisibilityElement(args);
				},this);
			}

			if( this.options.circularOnLast ){
				this.options.itemLastInCallback = jQuery.proxy(function(carousel, item, idx, state){
					this._circularOnLast(carousel, item, idx, state);
				},this);
			}

			this.$elem.jcarousel( this.options );
		   return this;
		},

		autoHighlight: function( interval, callback )
		{
			this.options.rotateInterval = interval;
			$('li',this.$elem).closest('.middle').mouseover( jQuery.proxy(function(e){
				if (this.options.freezeOnHover) {
					this._autoRotateStop();
				}
			}, this )).mouseout(jQuery.proxy(function(e){
				if (this.options.freezeOnHover) {
					this._autoRotateStart();
				}
			}, this )
			).filter(':first').mouseout();

			$('li',this.$elem).hover(jQuery.proxy(function(e){
				this._setActiveElement($('.active', this.$elem ), $(e.currentTarget) )
				this._highlightContentBlock();
				if (callback) {
					callback.call(this);
				}
			}, this ));
		},

		setFreezeOnHover: function ( value )
		{
			this.options.freezeOnHover = value;
		},

		_autoHihlightNextElement: function()
		{
			var currentElement 	= $('li.active', this.$elem);
			var allContainers	= $('li',this.$elem);
			if(!currentElement){
				$(allContainers).filter(':first').addClass('.active');
			} else {
				var currentIndex = currentElement.attr(this.jCarouselIndexAttr);
				var nextIndex = parseInt(currentIndex) + 1;

				if( currentIndex%this.options.scroll == 0 ) {
					if( this.options.buttonNextHTML ){
						$('.next',this.$elem.closest('.middle')).trigger(this.options.buttonNextEvent);
					} else {
						nextIndex = 1;
					}
				}
				var nextElement = $('li['+this.jCarouselIndexAttr+'="'+nextIndex.toString()+'"]')

				this._setActiveElement( allContainers, nextElement );
				this._highlightContentBlock();
			}
		},

		_highlightFirstVisibilityElement: function(args)
		{
			var allContainers	= $('li',this.$elem);
			var firstVisbleElement = $('li['+this.jCarouselIndexAttr+'="'+args.first+'"]',this.$elem).filter(':last');

			this._setActiveElement( allContainers, firstVisbleElement );
			this._highlightContentBlock();
		},

		_highlightContentBlock: function()
		{
			var currentElement 	= $('li.active', this.$elem);
			var currentIndex = currentElement.attr(this.jCarouselIndexAttr);
			var contentElementIndex = 0;

			if( currentIndex <= this.realSize ) {
				contentElementIndex = currentIndex-1;
			} else {
				contentElementIndex = (currentIndex-1)%this.realSize;
			}

			var middleBlock = this.$elem.closest('.middle');
			var blockLiHeight = $("ul.area li", middleBlock).height();

			var topOffsetPx = parseInt(blockLiHeight) * contentElementIndex;
			
			if( parseInt(topOffsetPx)){
				topOffset = '-'+topOffsetPx+'px';
			} else {
				topOffset = '0';
			}

			$("ul.area", middleBlock).first().css('top', topOffset);
		},

		_autoRotateStart: function()
		{
			this.timer =  setInterval(jQuery.proxy(function(e){
				this._autoHihlightNextElement();
			}, this
			), this.options.rotateInterval);
		},

		_autoRotateStop: function()
		{
			this.timer = clearInterval(this.timer);
		},

		_setActiveElement: function(container, element)
		{
			container.removeClass('active');
			element.addClass('active');
		},

		_circularOnLast: function(carousel, item, idx, state)
		{
			if( idx >= this.realSize && this.realSize != this.options.scroll ){
				this.options.wrap 	= 'circular';
				this.$elem.jcarousel( this.options );
			}
			return this;
		}

	});
	$.pluginize('carousel', $Crabapple.Carousel, $Crabapple);
}) (jQuery);


/* channel_finder.js */
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
$(function() {		
	var player_ready = false;
	function init()
	{
		$carousel = $('#carousel');		
		if ($('#video_player_box').length) {		
			$video_player = $Crabapple.playerA.player.video_player_box;
			$video_player.events.onReady = function() {
				player_ready = true;							
			}	
			$video_player.events.onMetadata = function() {					
				if ($.cookie('playerSound') != 'true') {			
					$('#carouser_wrapper a.mute').removeClass('on');
					$video_player.mute();
					$.cookie('playerSound','false');
				} else {
					$('#carouser_wrapper a.mute').addClass('on');
					$video_player.unmute();
					$.cookie('playerSound','true');			
				}	
				$video_player.events.onMetadata = function() {};
			}				
			$video_player.events.onPlaylistComplete	= function() {
				if (player_ready == true) { 
					hidePlayer();
				}
				goNext();				
				if ($autoplay_time == "0")
				{
					$carousel.attr('data-autoplay',5000);
				}
			}													
		} else {
			player_ready = false;
		}	
		//autoplay detect
		if (!$('#adExpand').length)
		{		
			autoplay($carousel);
			$autoplay_time = $carousel.attr('data-autoplay');
		}				
		$carousel.find('li a').click(function() {
		
        	if ($(this).parent().hasClass('active')) {
        		//alert("omg this is active!!!");
        		return;
            } else {
        		//alert("omg this is HELLA NOT active!!!");    
				// stop rotation
				$carousel.attr('data-autoplay',0);			
				//hide the player
				if (player_ready == true) { 
					hidePlayer();				
				}			
				// make current li active
				$active = $(this).parent();		
				animate($active);		
				return false;        			
            }						
		});			
		$('#carouser_wrapper a.mute').click(function() {
			if ($.cookie('playerSound') == 'true') {			
				$(this).removeClass('on');
				$video_player.mute();
				$.cookie('playerSound','false');
			} else {
				$(this).addClass('on');
				$video_player.unmute();
				$.cookie('playerSound','true');			
			}
			return false;
		})
		$('.hpcarousel .video_wrapper .link_overlay_disabled, .hpcarousel ul li:last .full_info, .hpcarousel .video_wrapper #video_player_box').live({mouseenter:
			function() {
				$carousel.find('li:last').addClass('hovered');},
			mouseleave: function() {
				$carousel.find('li:last').removeClass('hovered');}	
		});
	}	
	function autoplay($carousel) {			
		//console.log("autoplay");		
		$autoplay_seconds = $carousel.attr('data-autoplay');		
		if ($autoplay_seconds != 0) {
			setTimeout(function() {
				if ($carousel.attr('data-autoplay') > 0) {					
					goNext();
				}
			}, 5000);
		}
	}
	
	function animate($active) {
		//console.log("animate");
		$active.animate({
			width: 480
		}, 150, function() {move($active)});								
	}
	
	function move($active) {	
		//console.log("move");
		//remove all active classes
		$('li').removeClass('active');				
		$active.addClass('active');				
		$active.nextAll().css('width','34').prependTo('#carousel');
		$active_link = $active.find('a').attr('href');
		$('.link_overlay_disabled').attr('href',$active_link);		
	        
		// do we have a video?
		mgid = $active.attr('data-mgid');
		
		if(typeof(mgid) != "undefined" && mgid !== null) {	
	    	player_state = $video_player.state;	
	    	//console.log(player_state);
			if (player_ready == true) {
				$carousel.attr('data-autoplay', '0');
				showPlayer();
				
				if (player_state == "playing") {
					$video_player.playURI(mgid);
				} else if (player_state == "stopped") {
					$video_player.playURI(mgid);
				} else if (player_state == "paused") {
					$video_player.playURI(mgid);
				} else {
					$video_player.play();
				}		
			} 
		} else {	
			$autoplay_time = $carousel.attr('data-autoplay');
			autoplay($carousel);
			if ($autoplay_time == "0")
			{
				$carousel.attr('data-autoplay',5000);
			}		
		}	
	}
	function goNext() {
		//console.log("goNext");
		$carousel.attr('data-autoplay',5000);		
		animate($carousel.find('li:eq(4)'));
	}
	function hidePlayer() {
		//console.log("hidePlayer");
		if (player_ready == true) { 
			$video_player.pause();					
		}
		$('#carouser_wrapper').css('opacity','0.01');
	}
	function showPlayer() {
		//console.log("showPlayer");
		setTimeout(function(){
		    $('#carouser_wrapper').css('opacity','1');
		},500);
	}
	if 	($('.hpcarousel').length) {
		init();
	}	
});/* latest_photo.js */
$(function() {
	// setup div.scrollable as a container for our carousel
	$Crabapple(".latest_photo .scrollable").scrollable();
});/* miniplayer_scrollable.js */
$(function() {
	$('.miniplayer.scrollable').find('.tabs-left:not(.disabled)').live('click', function(){
		var tabs = $(this).parent().find('.tabs');
		if (!tabs.data('page')) {
			tabs.data('page', 0);
		}
		var elementWidth = parseInt(tabs.find('li:last-child').outerWidth()) + parseInt(tabs.find('li:last-child').css('marginLeft'));
		var originalPosition = elementWidth * 4 * parseInt(tabs.data('page')) * -1;
		tabs.stop();
		tabs.css({ left: originalPosition });
		tabs.data('page', tabs.data('page') - 1);
		var shiftTo = originalPosition + (elementWidth * 4);
		tabs.animate({ left: shiftTo }, 700);
		var totalElements = tabs.find('li').length;
		if (tabs.data('page') == 0) {
			$(this).parent().find('.tabs-left').addClass('disabled');
		}
		if ((tabs.data('page') + 1)*4 < totalElements) {
			$(this).parent().find('.tabs-right').removeClass('disabled');
		}
	});
	$('.miniplayer.scrollable').find('.tabs-right:not(.disabled)').live('click', function(){
		var tabs = $(this).parent().find('.tabs');
		if (!tabs.data('page')) {
			tabs.data('page', 0);
		}
		var elementWidth = parseInt(tabs.find('li:last-child').outerWidth()) + parseInt(tabs.find('li:last-child').css('marginLeft'));
		var originalPosition = elementWidth * 4 * parseInt(tabs.data('page')) * -1;
		tabs.stop();
		tabs.css({ left: originalPosition });
		tabs.data('page', tabs.data('page') + 1);
		var shiftTo = originalPosition - (elementWidth * 4);
		tabs.animate({ left: shiftTo }, 700);
		
		var totalElements = tabs.find('li').length;
		if (tabs.data('page') > 0) {
			$(this).parent().find('.tabs-left').removeClass('disabled');
		}
		if ((tabs.data('page') + 1)*4 >= totalElements) {
			$(this).parent().find('.tabs-right').addClass('disabled');
		}
	});
});
/* miniplayer_tooltips.js */
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
if(!window.__twttrlr){(function(a,b){function s(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}function t(a){return Array.prototype.slice.call(a)}function v(a,b){for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function w(){var a=t(arguments),b=[];for(var c=0,d=a.length;c<d;c++)a[c].length>0&&b.push(a[c].replace(/\/$/,""));return b.join("/")}function x(a,b,c){var d=b.split("/"),e=a;while(d.length>1){var f=d.shift();e=e[f]=e[f]||{}}e[d[0]]=c}function y(){}function z(a,b){this.id=this.path=a,this.force=!!b}function A(a,b){this.id=a,this.body=b,typeof b=="undefined"&&(this.path=this.resolvePath(a))}function B(a,b){this.deps=a,this.collectResults=b,this.deps.length==0&&this.complete()}function C(a,b){this.deps=a,this.collectResults=b}function D(){for(var a in d)if(d[a].readyState=="interactive")return l[d[a].id]}function E(a,b){var d;return!a&&c&&(d=k||D()),d?(delete l[d.scriptId],d.body=b,d.execute()):(j=d=new A(a,b),i[d.id]=d),d}function F(){var a=t(arguments),b,c;return typeof a[0]=="string"&&(b=a.shift()),c=a.shift(),E(b,c)}function G(a,b){var c=b.id||"",d=c.split("/");d.pop();var e=d.join("/");return a.replace(/^\./,e)}function H(a,b){function d(a){return A.exports[G(a,b)]}var c=[];for(var e=0,f=a.length;e<f;e++){if(a[e]=="require"){c.push(d);continue}if(a[e]=="exports"){b.exports=b.exports||{},c.push(b.exports);continue}c.push(d(a[e]))}return c}function I(){var a=t(arguments),b=[],c,d;return typeof a[0]=="string"&&(c=a.shift()),u(a[0])&&(b=a.shift()),d=a.shift(),E(c,function(a){function f(){var e=H(t(b),c),f;typeof d=="function"?f=d.apply(c,e):f=d,typeof f=="undefined"&&(f=c.exports),a(f)}var c=this,e=[];for(var g=0,h=b.length;g<h;g++){var i=b[g];v(["require","exports"],i)==-1&&e.push(G(i,c))}e.length>0?J.apply(this,e.concat(f)):f()})}function J(){var a=t(arguments),b,c;typeof a[a.length-1]=="function"&&(b=a.pop()),typeof a[a.length-1]=="boolean"&&(c=a.pop());var d=new B(K(a,c),c);return b&&d.then(b),d}function K(a,b){var c=[];for(var d=0,e;e=a[d];d++)typeof e=="string"&&(e=L(e)),u(e)&&(e=new C(K(e,b),b)),c.push(e);return c}function L(a){var b,c;for(var d=0,e;e=J.matchers[d];d++){var f=e[0],g=e[1];if(b=a.match(f))return g(a)}throw new Error(a+" was not recognised by loader")}function N(){return a.using=m,a.provide=n,a.define=o,a.loadrunner=p,M}function O(a){for(var b=0;b<J.bundles.length;b++)for(var c in J.bundles[b])if(c!=a&&v(J.bundles[b][c],a)>-1)return c}var c=a.attachEvent&&!a.opera,d=b.getElementsByTagName("script"),e=0,f,g=b.createElement("script"),h={},i={},j,k,l={},m=a.using,n=a.provide,o=a.define,p=a.loadrunner;for(var q=0,r;r=d[q];q++)if(r.src.match(/loadrunner\.js(\?|#|$)/)){f=r;break}var u=Array.isArray||function(a){return a.constructor==Array};y.prototype.then=function(b){var c=this;return this.started||(this.started=!0,this.start()),this.completed?b.apply(a,this.results):(this.callbacks=this.callbacks||[],this.callbacks.push(b)),this},y.prototype.start=function(){},y.prototype.complete=function(){if(!this.completed){this.results=t(arguments),this.completed=!0;if(this.callbacks)for(var b=0,c;c=this.callbacks[b];b++)c.apply(a,this.results)}},z.loaded=[],z.prototype=new y,z.prototype.start=function(){var a=this,b,c,d;return(d=i[this.id])?(d.then(function(){a.complete()}),this):((b=h[this.id])?b.then(function(){a.loaded()}):!this.force&&v(z.loaded,this.id)>-1?this.loaded():(c=O(this.id))?J(c,function(){a.loaded()}):this.load(),this)},z.prototype.load=function(){var b=this;h[this.id]=b;var c=g.cloneNode(!1);this.scriptId=c.id="LR"+ ++e,c.type="text/javascript",c.async=!0,c.onerror=function(){throw new Error(b.path+" not loaded")},c.onreadystatechange=c.onload=function(c){c=a.event||c;if(c.type=="load"||v(["loaded","complete"],this.readyState)>-1)this.onreadystatechange=null,b.loaded()},c.src=this.path,k=this,d[0].parentNode.insertBefore(c,d[0]),k=null,l[c.id]=this},z.prototype.loaded=function(){this.complete()},z.prototype.complete=function(){v(z.loaded,this.id)==-1&&z.loaded.push(this.id),delete h[this.id],y.prototype.complete.apply(this,arguments)},A.exports={},A.prototype=new z,A.prototype.resolvePath=function(a){return w(J.path,a+".js")},A.prototype.start=function(){var a,b,c=this,d;this.body?this.execute():(a=A.exports[this.id])?this.exp(a):(b=i[this.id])?b.then(function(a){c.exp(a)}):(bundle=O(this.id))?J(bundle,function(){c.start()}):(i[this.id]=this,this.load())},A.prototype.loaded=function(){var a,b,d=this;c?(b=A.exports[this.id])?this.exp(b):(a=i[this.id])&&a.then(function(a){d.exp(a)}):(a=j,j=null,a.id=a.id||this.id,a.then(function(a){d.exp(a)}))},A.prototype.complete=function(){delete i[this.id],z.prototype.complete.apply(this,arguments)},A.prototype.execute=function(){var a=this;typeof this.body=="object"?this.exp(this.body):typeof this.body=="function"&&this.body.apply(window,[function(b){a.exp(b)}])},A.prototype.exp=function(a){this.complete(this.exports=A.exports[this.id]=a||{})},B.prototype=new y,B.prototype.start=function(){function b(){var b=[];a.collectResults&&(b[0]={});for(var c=0,d;d=a.deps[c];c++){if(!d.completed)return;d.results.length>0&&(a.collectResults?d instanceof C?s(b[0],d.results[0]):x(b[0],d.id,d.results[0]):b=b.concat(d.results))}a.complete.apply(a,b)}var a=this;for(var c=0,d;d=this.deps[c];c++)d.then(b);return this},C.prototype=new y,C.prototype.start=function(){var a=this,b=0,c=[];return a.collectResults&&(c[0]={}),function d(){var e=a.deps[b++];e?e.then(function(b){e.results.length>0&&(a.collectResults?e instanceof C?s(c[0],e.results[0]):x(c[0],e.id,e.results[0]):c.push(e.results[0])),d()}):a.complete.apply(a,c)}(),this},I.amd={};var M=function(a){return a(J,F,M,define)};M.Script=z,M.Module=A,M.Collection=B,M.Sequence=C,M.Dependency=y,M.noConflict=N,a.loadrunner=M,a.using=J,a.provide=F,a.define=I,J.path="",J.matchers=[],J.matchers.add=function(a,b){this.unshift([a,b])},J.matchers.add(/(^script!|\.js$)/,function(a){var b=new z(a.replace(/^\$/,J.path.replace(/\/$/,"")+"/").replace(/^script!/,""),!1);return b.id=a,b}),J.matchers.add(/^[a-zA-Z0-9_\-\/]+$/,function(a){return new A(a)}),J.bundles=[],f&&(J.path=f.getAttribute("data-path")||f.src.split(/loadrunner\.js/)[0]||"",(main=f.getAttribute("data-main"))&&J.apply(a,main.split(/\s*,\s*/)).then(function(){}))})(this,document);(window.__twttrlr = loadrunner.noConflict());}__twttrlr(function(using, provide, loadrunner, define) {provide("util/iframe",function(a){a(function(a){var b=(a.replace&&a.replace.ownerDocument||document).createElement("div"),c;b.innerHTML="<iframe allowtransparency='true' frameBorder='0' scrolling='no'></iframe>",c=b.firstChild,c.src=a.url,c.className=a.className||"";if(a.css)for(var d in a.css)c.style[d]=a.css[d];if(a.attributes)for(var e in a.attributes)c.setAttribute(e,a.attributes[e]);return a.replace&&a.replace.parentNode.replaceChild(c,a.replace),c})});
provide("util/querystring",function(a){function b(a){return encodeURIComponent(a).replace(/\+/g,"%2B")}function c(a){return decodeURIComponent(a)}function d(a){var c=[],d;for(d in a)a[d]!==null&&typeof a[d]!="undefined"&&c.push(b(d)+"="+b(a[d]));return c.sort().join("&")}function e(a){var b={},d,e,f,g;if(a){d=a.split("&");for(g=0;f=d[g];g++)e=f.split("="),e.length==2&&(b[c(e[0])]=c(e[1]))}return b}function f(a,b){var c=d(b);return c.length>0?a.indexOf("?")>=0?a+"&"+d(b):a+"?"+d(b):a}function g(a){var b=a&&a.split("?");return b.length==2?e(b[1]):{}}a({url:f,decodeURL:g,decode:e,encode:d,encodePart:b,decodePart:c})});
provide("util/util",function(a){function b(a){var b=1,c,d;for(;c=arguments[b];b++)for(d in c)a[d]=c[d];return a}function c(a){return b([],a)}function d(a){for(var b in a)a.hasOwnProperty(b)&&!a[b]&&a[b]!==!1&&a[b]!==0&&delete a[b]}function e(a,b){var c=0,d;for(;d=a[c];c++)if(b==d)return c;return-1}function f(a,b){if(!a)return null;if(a.filter)return a.filter.apply(a,[b]);if(!b)return a;var c=[],d=0,e;for(;e=a[d];d++)b(e)&&c.push(e);return c}function g(a,b){if(!a)return null;if(a.map)return a.map.apply(a,[b]);if(!b)return a;var c=[],d=0,e;for(;e=a[d];d++)c.push(b(e));return c}function h(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function i(a){return a&&String(a).toLowerCase().indexOf("[native code]")>-1}function j(a,b){if(a.contains)return a.contains(b);var c=b.parentNode;while(c){if(c===a)return!0;c=c.parentNode}return!1}a({array:c,aug:b,compact:d,containsElement:j,filter:f,map:g,indexOf:e,isNative:i,toType:h})});
provide("dom/get",function(a){using("util/util",function(b){function c(a,c,d,e){var f,g,h=[],i,j,k,l,m,n;c=c||document;if(b.isNative(c.getElementsByClassName))return h=b.filter(c.getElementsByClassName(a),function(a){return!d||a.tagName.toLowerCase()==d.toLowerCase()}),[].slice.call(h,0,e||h.length);i=a.split(" "),l=i.length,f=c.getElementsByTagName(d||"*"),n=f.length;for(k=0;k<l&&n>0;k++){h=[],j=i[k];for(m=0;m<n;m++){g=f[m],~b.indexOf(g.className.split(" "),j)&&h.push(g);if(k+1==l&&h.length===e)break}f=h,n=f.length}return h}function d(a,b,d){return c(a,b,d,1)[0]}function e(a,c,d){var f=c&&c.parentNode,g;if(!f||f===d)return;return f.tagName==a?f:(g=f.className.split(" "),0===a.indexOf(".")&&~b.indexOf(g,a.slice(1))?f:e(a,f,d))}a({all:c,one:d,ancestor:e})})});
provide("$vendor/domready/ready.js", function(exports) {!function(a){function k(){b=1;for(var a=0,d=c.length;a<d;a++)c[a]()}var b=0,c=[],d,e,f=!1,g=a.createElement("a"),h="DOMContentLoaded",i="addEventListener",j="onreadystatechange";/^loade|c/.test(a.readyState)&&(b=1),a[i]&&a[i](h,e=function(){a.removeEventListener(h,e,f),k()},f),g.doScroll&&a.attachEvent(j,d=function(){/^c/.test(a.readyState)&&(a.detachEvent(j,d),k())});var l=g.doScroll?function(a){self!=top?b?a():c.push(a):!function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){l(a)},50)}a()}()}:function(a){b?a():c.push(a)};typeof module!="undefined"&&module.exports?module.exports={domReady:l}:window.domReady=l}(document);exports();loadrunner.Script.loaded.push("$vendor/domready/ready.js")});
provide("util/domready",function(a){using("$vendor/domready/ready.js",function(){a(domReady)})});
provide("tfw/widget/base",function(a){using("util/util","util/domready","dom/get","util/querystring","util/iframe",function(b,c,d,e,f){function l(a){var b;if(!a)return;a.ownerDocument?(this.srcEl=a,this.classAttr=a.className.split(" ")):(this.srcOb=a,this.classAttr=[]),b=this.params(),this.id=o(),this.setLanguage(),this.related=b.related||this.dataAttr("related"),this.partner=b.partner||this.dataAttr("partner"),this.dnt=b.dnt||this.dataAttr("dnt")||"",this.styleAttr=[]}function m(a){if(!a)return;return a.lang?a.lang:m(a.parentNode)}function n(a){var b=i.widgets,c,e,f,g,h,k;a=a||document;for(f in b){f.match(/\./)?(g=f.split("."),c=d.all(g[1],a,g[0])):c=a.getElementsByTagName(f);for(h=0;k=c[h];h++){if(k.getAttribute("data-twttr-rendered"))continue;k.setAttribute("data-twttr-rendered","true"),e=new b[f](k),j.list.push(e),j.byId[e.id]=e,e.render(i)}}}function o(){return this.srcEl&&this.srcEl.id||"twitter-widget-"+g++}function p(a){i=a}function q(a){return a&&j.byId[a]?j.byId[a].element:null}var g=0,h,i,j={list:[],byId:{}},k={ko:{"%{followers_count} followers":"%{followers_count}명의 팔로워","100K+":"100만 이상","10k unit":"만 단위",Follow:"팔로우","Follow %{screen_name}":"%{screen_name} 팔로우하기",K:"천",M:"백만",Tweet:"트윗","Tweet %{hashtag}":"%{hashtag} 관련 트윗하기","Tweet to %{name}":"%{name}님에게 트윗하기","Twitter Stream":"트위터 스트림"},ar:{"%{followers_count} followers":"عدد المتابعين %{followers_count}","100K+":"+100 ألف","10k unit":"10 آلاف وحدة",Follow:"تابع","Follow %{screen_name}":"تابع %{screen_name}",K:"ألف",M:"مليون",Tweet:"غرِّد","Tweet %{hashtag}":"غرِّد %{hashtag}","Tweet to %{name}":"غرِّد لـ %{name}","Twitter Stream":"خطّ تويتر الزمنيّ"},sv:{"%{followers_count} followers":"%{followers_count} följare","100K+":"100K+","10k unit":"10k",Follow:"Följ","Follow %{screen_name}":"Följ %{screen_name}",K:"K",M:"M",Tweet:"Tweeta","Tweet %{hashtag}":"Tweeta %{hashtag}","Tweet to %{name}":"Tweeta till %{name}"},it:{"%{followers_count} followers":"%{followers_count} follower","100K+":"100K+","10k unit":"10k unità",Follow:"Segui","Follow %{screen_name}":"Segui %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Twitta %{hashtag}","Tweet to %{name}":"Twitta a %{name}","Twitter Stream":"Twitter Stream"},id:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikuti","Follow %{screen_name}":"Ikuti %{screen_name}",K:"&nbsp;ribu",M:"&nbsp;juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet ke %{name}","Twitter Stream":"Aliran Twitter"},fr:{"%{followers_count} followers":"%{followers_count} abonnés","100K+":"100K+","10k unit":"unité de 10k",Follow:"Suivre","Follow %{screen_name}":"Suivre %{screen_name}",K:"K",M:"M",Tweet:"Tweeter","Tweet %{hashtag}":"Tweeter %{hashtag}","Tweet to %{name}":"Tweeter à %{name}","Twitter Stream":"Flux Twitter"},fi:{"%{followers_count} followers":"%{followers_count} seuraajaa","100K+":"100 000+","10k unit":"10 000 yksikköä",Follow:"Seuraa","Follow %{screen_name}":"Seuraa käyttäjää %{screen_name}",K:"tuhatta",M:"milj.",Tweet:"Twiittaa","Tweet %{hashtag}":"Twiittaa %{hashtag}","Tweet to %{name}":"Twiittaa käyttäjälle %{name}","Twitter Stream":"Twitter-virta"},pl:{"%{followers_count} followers":"%{followers_count} obserwujących","100K+":"100 tys.+","10k unit":"10 tys.",Follow:"Obserwuj","Follow %{screen_name}":"Obserwuj %{screen_name}",K:"tys.",M:"mln",Tweet:"Tweetnij","Tweet %{hashtag}":"Tweetnij %{hashtag}","Tweet to %{name}":"Tweetnij do %{name}","Twitter Stream":"Strumień Twittera"},pt:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"+100 mil","10k unit":"10 mil unidades",Follow:"Seguir","Follow %{screen_name}":"Seguir %{screen_name}",K:"Mil",M:"M",Tweet:"Tweetar","Tweet %{hashtag}":"Tweetar %{hashtag}","Tweet to %{name}":"Tweetar para %{name}","Twitter Stream":"Transmissões do Twitter"},fa:{"%{followers_count} followers":"%{followers_count} دنبال‌کننده","100K+":">۱۰۰هزار","10k unit":"۱۰هزار واحد",Follow:"دنبال کردن","Follow %{screen_name}":"دنبال کردن %{screen_name}",K:"هزار",M:"میلیون",Tweet:"توییت","Tweet %{hashtag}":"توییت کردن %{hashtag}","Tweet to %{name}":"به %{name} توییت کنید"},"zh-cn":{"%{followers_count} followers":"%{followers_count} 关注者","100K+":"10万+","10k unit":"1万单元",Follow:"关注","Follow %{screen_name}":"关注 %{screen_name}",K:"千",M:"百万",Tweet:"发推","Tweet %{hashtag}":"以 %{hashtag} 发推","Tweet to %{name}":"发推给 %{name}","Twitter Stream":"Twitter 信息流"},ur:{"%{followers_count} followers":"%{followers_count} فالورز","100K+":"1 لاکھ+","10k unit":"دس ہزار یونٹ",Follow:"فالو کریں","Follow %{screen_name}":"%{screen_name} کو فالو کریں",K:"ہزار",M:"ملین",Tweet:"ٹویٹ کریں","Tweet %{hashtag}":"ٹویٹ کریں %{hashtag}","Tweet to %{name}":"%{name} کو ٹویٹ کریں","Twitter Stream":"ٹوئٹر سٹریم"},hi:{"%{followers_count} followers":"%{followers_count} फ़ॉलोअर्स","100K+":"१०० हजार+","10k unit":"१० हजार इकाईयां",Follow:"फ़ॉलो","Follow %{screen_name}":"%{screen_name} को फ़ॉलो करें",K:"हजार",M:"१० लाख",Tweet:"ट्वीट","Tweet %{hashtag}":"ट्वीट %{hashtag}","Tweet to %{name}":"%{name} को ट्वीट करें"},ru:{"%{followers_count} followers":"Читатели: %{followers_count} ","100K+":"100 тыс.+","10k unit":"блок 10k",Follow:"Читать","Follow %{screen_name}":"Читать %{screen_name}",K:"тыс.",M:"млн.",Tweet:"Твитнуть","Tweet %{hashtag}":"Твитнуть %{hashtag}","Tweet to %{name}":"Твитнуть %{name}"},hu:{"%{followers_count} followers":"%{followers_count} követő","100K+":"100E+","10k unit":"10E+",Follow:"Követés","Follow %{screen_name}":"%{screen_name} követése",K:"E",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"%{hashtag} tweetelése","Tweet to %{name}":"Tweet küldése neki: %{name}"},he:{"%{followers_count} followers":"%{followers_count} עוקבים","100K+":"מאות אלפים","10k unit":"עשרות אלפים",Follow:"מעקב","Follow %{screen_name}":"לעקוב אחר %{screen_name}",K:"אלף",M:"מיליון",Tweet:"ציוץ","Tweet %{hashtag}":"צייצו %{hashtag}","Tweet to %{name}":"ציוץ אל %{name}","Twitter Stream":"התזרים של טוויטר"},es:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"100K+","10k unit":"10k unidad",Follow:"Seguir","Follow %{screen_name}":"Seguir a %{screen_name}",K:"K",M:"M",Tweet:"Twittear","Tweet %{hashtag}":"Twittear %{hashtag}","Tweet to %{name}":"Twittear a %{name}","Twitter Stream":"Cronología de Twitter"},fil:{"%{followers_count} followers":"%{followers_count} mga tagasunod","100K+":"100K+","10k unit":"10k yunit",Follow:"Sundan","Follow %{screen_name}":"Sundan si %{screen_name}",K:"K",M:"M",Tweet:"I-tweet","Tweet %{hashtag}":"I-tweet ang %{hashtag}","Tweet to %{name}":"Mag-Tweet kay %{name}","Twitter Stream":"Stream ng Twitter"},msa:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikut","Follow %{screen_name}":"Ikut %{screen_name}",K:"ribu",M:"juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet kepada %{name}"},ja:{"%{followers_count} followers":"%{followers_count}人のフォロワー","100K+":"10万以上","10k unit":"万",Follow:"フォローする","Follow %{screen_name}":"%{screen_name}さんをフォロー",K:"K",M:"M",Tweet:"ツイート","Tweet %{hashtag}":"%{hashtag} をツイートする","Tweet to %{name}":"%{name}さんへツイートする","Twitter Stream":"Twitterストリーム"},tr:{"%{followers_count} followers":"%{followers_count} takipçi","100K+":"+100 bin","10k unit":"10 bin birim",Follow:"Takip et","Follow %{screen_name}":"Takip et: %{screen_name}",K:"bin",M:"milyon",Tweet:"Tweetle","Tweet %{hashtag}":"Tweetle: %{hashtag}","Tweet to %{name}":"Tweetle: %{name}"},th:{"%{followers_count} followers":"%{followers_count} ผู้ติดตาม","100K+":"100พัน+","10k unit":"หน่วย 10พัน",Follow:"ติดตาม","Follow %{screen_name}":"ติดตาม %{screen_name}",K:"พัน",M:"ล้าน",Tweet:"ทวีต","Tweet %{hashtag}":"ทวีต %{hashtag}","Tweet to %{name}":"ทวีตถึง %{name}"},"zh-tw":{"%{followers_count} followers":"%{followers_count} 位跟隨者","100K+":"超過十萬","10k unit":"1萬 單位",Follow:"跟隨","Follow %{screen_name}":"跟隨 %{screen_name}",K:"千",M:"百萬",Tweet:"推文","Tweet %{hashtag}":"推文%{hashtag}","Tweet to %{name}":"推文給%{name}"},de:{"%{followers_count} followers":"%{followers_count} Follower","100K+":"100Tsd+","10k unit":"10tsd-Einheit",Follow:"Folgen","Follow %{screen_name}":"%{screen_name} folgen",K:"Tsd",M:"M",Tweet:"Twittern","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet an %{name}","Twitter Stream":"Twitter Stream"},da:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k enhed",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet til %{name}","Twitter Stream":"Twitter-strøm"},no:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k ",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Send tweet til %{name}","Twitter Stream":"Twitter-strøm"},nl:{"%{followers_count} followers":"%{followers_count} volgers","100K+":"100k+","10k unit":"10k-eenheid",Follow:"Volgen","Follow %{screen_name}":"%{screen_name} volgen",K:"k",M:" mln.",Tweet:"Tweeten","Tweet %{hashtag}":"%{hashtag} tweeten","Tweet to %{name}":"Tweeten naar %{name}"}};b.aug(l.prototype,{setLanguage:function(a){var b;a||(a=this.params().lang||this.dataAttr("lang")||m(this.srcEl)),a=a&&a.toLowerCase();if(!a)return this.lang="en";if(k[a])return this.lang=a;b=a.replace(/[\-_].*/,"");if(k[b])return this.lang=b;this.lang="en"},_:function(a,b){var c=this.lang;b=b||{};if(!c||!k.hasOwnProperty(c))c=this.lang="en";return a=k[c]&&k[c][a]||a,this.ringo(a,b,/%\{([\w_]+)\}/g)},ringo:function(a,b,c){return c=c||/\{\{([\w_]+)\}\}/g,a.replace(c,function(a,c){return b[c]!==undefined?b[c]:a})},add:function(a){j.list.push(this),j.byId[this.id]=a},create:function(a,b,c,d){return d["data-twttr-rendered"]=!0,f({url:a,css:c,className:b,id:this.id,attributes:d,replace:this.srcEl})},params:function(){var a,b;return this.srcOb?b=this.srcOb:(a=this.srcEl&&this.srcEl.href&&this.srcEl.href.split("?")[1],b=a?e.decode(a):{}),this.params=function(){return b},b},dataAttr:function(a){return this.srcEl&&this.srcEl.getAttribute("data-"+a)},attr:function(a){return this.srcEl&&this.srcEl.getAttribute(a)},styles:{base:"font: normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; white-space: nowrap;",button:"font-weight: bold; text-shadow: 0 1px 0 rgba(255,255,255,.5);",large:"font-size: 13px; line-height: 26px;",vbubble:"font-size: 16px;"},width:function(){throw new Error(name+" not implemented")},height:function(){return this.size=="m"?20:28},minWidth:function(){},maxWidth:function(){},minHeight:function(){},maxHeight:function(){},dimensions:function(){function a(a){switch(typeof a){case"string":return a;case"undefined":return;default:return a+"px"}}var b,c={width:this.width(),height:this.height()};this.minWidth()&&(c["min-width"]=this.minWidth()),this.maxWidth()&&(c["max-width"]=this.maxWidth()),this.minHeight()&&(c["min-height"]=this.minHeight()),this.maxHeight()&&(c["max-height"]=this.maxHeight());for(b in c)c[b]=a(c[b]);return c},generateId:o}),a({Base:l,init:p,embed:n,find:q})})});
provide("util/events",function(a){using("util/util",function(b){function d(){this.completed=!1,this.callbacks=[]}var c={bind:function(a,b){return this._handlers=this._handlers||{},this._handlers[a]=this._handlers[a]||[],this._handlers[a].push(b)},unbind:function(a,c){if(!this._handlers[a])return;if(c){var d=b.indexOf(this._handlers[a],c);d>=0&&this._handlers[a].splice(d,1)}else this._handlers[a]=[]},trigger:function(a,b){var c=this._handlers&&this._handlers[a];b.type=a;if(c)for(var d=0,e;e=c[d];d++)e.call(this,b)}};d.prototype.addCallback=function(a){this.completed?a.apply(this,this.results):this.callbacks.push(a)},d.prototype.complete=function(){this.results=makeArray(arguments),this.completed=!0;for(var a=0,b;b=this.callbacks[a];a++)b.apply(this,this.results)},a({Emitter:c,Promise:d})})});
provide("util/uri",function(a){using("util/querystring","util/util",function(b,c){function d(a){var b;return a.match(/^https?:\/\//)?a:(b=location.host,location.port.length>0&&(b+=":"+location.port),[location.protocol,"//",b,a].join(""))}function e(){var a=document.getElementsByTagName("link");for(var b=0,c;c=a[b];b++)if(c.getAttribute("rel")=="canonical")return d(c.getAttribute("href"));return null}function f(){var a=document.getElementsByTagName("a"),b=document.getElementsByTagName("link"),d=/\bme\b/,e=/^https?\:\/\/(www\.)?twitter.com\/([a-zA-Z0-9_]+)$/,f=c.array(a).concat(c.array(b)),g,h,i;for(var j=0,k;k=f[j];j++){h=k.getAttribute("rel"),i=k.getAttribute("href");if(h&&i&&h.match(d)&&(g=i.match(e)))return g[2]}}a({absolutize:d,getCanonicalURL:e,getScreenNameFromPage:f})})});
provide("tfw/widget/intent",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri",function(b,c,d,e){function m(a){var b=Math.round(k/2-h/2),c=0;j>i&&(c=Math.round(j/2-i/2)),window.open(a,"intent",g+",width="+h+",height="+i+",left="+b+",top="+c)}function n(a,b){using("tfw/widget/hubclient",function(c){c.openIntent(a,b)})}function o(a){var b="original_referer="+location.href;return[a,b].join(a.indexOf("?")==-1?"?":"&")}function p(a,b){this.id=a,this.element=this.srcEl=b}function q(a){a=a||window.event;var b=a.target||a.srcElement,c,d,e;while(b&&b.nodeName.toLowerCase()!=="a")b=b.parentNode;b&&b.nodeName.toLowerCase()==="a"&&b.href&&(c=b.href.match(f),c&&(e=o(b.href),e=e.replace(/^http[:]/,"https:"),e=e.replace(/^\/\//,"https://"),r(e,b),a.returnValue=!1,a.preventDefault&&a.preventDefault()))}function r(a,b){if(twttr.events.hub&&b){var c=new p(l.generateId(),b);l.add(c),n(a,b),twttr.events.trigger("click",{target:b,region:"intent",type:"click",data:{}})}else m(a)}function s(a){this.srcEl=[],this.element=a}var f=/twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,g="scrollbars=yes,resizable=yes,toolbar=no,location=yes",h=550,i=520,j=screen.height,k=screen.width,l;s.prototype=new c.Base,b.aug(s.prototype,{render:function(a){l=this,window.__twitterIntentHandler||(document.addEventListener?document.addEventListener("click",q,!1):document.attachEvent&&document.attachEvent("onclick",q),window.__twitterIntentHandler=!0)}}),a({Listener:s,open:r})})});
provide("dom/sandbox",function(a){using("util/domready",function(b){function d(a,b){var c,d,e;if(a.name){try{e=document.createElement('<iframe name="'+a.name+'"></iframe>')}catch(f){e=document.createElement("iframe"),e.name=a.name}delete a.name}else e=document.createElement("iframe");a.id&&(e.id=a.id,delete a.id);for(c in a)a.hasOwnProperty(c)&&e.setAttribute(c,a[c]);e.allowtransparency="true",e.scrolling="no",e.setAttribute("frameBorder",0);for(d in b||{})b.hasOwnProperty(d)&&(e.style[d]=b[d]);return e}function e(a,b,c,e){var f;this.attrs=b||{},this.styles=c||{},this.appender=e,this.onReady=a,this.sandbox={},f=d(this.attrs,this.styles),f.onreadystatechange=f.onload=this.getCallback(this.onLoad),this.sandbox.frame=f,e?e(f):document.body.appendChild(f)}function f(a,c,d,f){b(function(){new e(a,c,d,f)})}var c=0;window.twttr||(window.twttr={}),window.twttr.sandbox||(window.twttr.sandbox={}),e.prototype.getCallback=function(a){var b=this,c=!1;return function(){c||(c=!0,a.call(b))}},e.prototype.registerCallback=function(a){var b="cb"+c++;return window.twttr.sandbox[b]=a,b},e.prototype.onLoad=function(){try{this.sandbox.frame.contentWindow.document}catch(a){this.setDocDomain();return}this.sandbox.win=this.sandbox.frame.contentWindow,this.sandbox.doc=this.sandbox.frame.contentWindow.document,this.writeStandardsDoc(),this.sandbox.body=this.sandbox.frame.contentWindow.document.body,this.onReady(this.sandbox)},e.prototype.setDocDomain=function(){var a,b=this.registerCallback(this.getCallback(this.onLoad));a=["javascript:",'document.write("");',"try { window.parent.document; }","catch (e) {",'document.domain="'+document.domain+'";',"}",'window.parent.twttr.sandbox["'+b+'"]();'].join(""),this.sandbox.frame.parentNode.removeChild(this.sandbox.frame),this.sandbox.frame=null,this.sandbox.frame=d(this.attrs,this.styles),this.sandbox.frame.src=a,this.appender?this.appender(this.sandbox.frame):document.body.appendChild(this.sandbox.frame)},e.prototype.writeStandardsDoc=function(){var a=["<!DOCTYPE html>","<html>","<head>","<scr","ipt>","try { window.parent.document; }",'catch (e) {document.domain="'+document.domain+'";}',"</scr","ipt>","</head>","<body></body>","</html>"].join("");this.sandbox.doc.write(a),this.sandbox.doc.close()},a(f)})});
provide("dom/classname",function(a){function b(a,b){a.classList?a.classList.add(b):f(b).test(a.className)||(a.className+=" "+b)}function c(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(f(b)," ")}function d(a,d,g){a.classList&&e(a,d)?(c(a,d),b(a,g)):a.className=a.className.replace(f(d),g)}function e(a,b){return a.classList?a.classList.contains(b):f(b).test(a.className)}function f(a){return new RegExp("\\b"+a+"\\b","g")}a({add:b,remove:c,replace:d,present:e})});
provide("util/env",function(a){var b=window.navigator.userAgent;a({retina:function(){return(window.devicePixelRatio||1)>1},ie6:function(){return/MSIE 6/.test(b)},ie7:function(){return/MSIE 7/.test(b)},touch:function(){return"ontouchstart"in window},cssTransitions:function(){var a=document.body.style;return a.transition!==undefined||a.webkitTransition!==undefined||a.mozTransition!==undefined||a.oTransition!==undefined||a.msTransition!==undefined}})});
provide("dom/delegate",function(a){using("util/env",function(b){function e(a){var b=a.getAttribute("data-twitter-event-id");return b?b:(a.setAttribute("data-twitter-event-id",++d),d)}function f(a,b,c){var d=0,e=a&&a.length||0;for(d=0;d<e;d++)a[d].call(b,c)}function g(a,b,c){var d=c||a.target||a.srcElement,e=d.className.split(" "),h=0,i,j=e.length;for(;h<j;h++)f(b["."+e[h]],d,a);f(b[d.tagName],d,a);if(a.cease)return;d!==this&&g.call(this,a,b,d.parentElement||d.parentNode)}function h(a,b,c){if(a.addEventListener){a.addEventListener(b,function(d){g.call(a,d,c[b])},!1);return}a.attachEvent&&a.attachEvent("on"+b,function(){g.call(a,a.ownerDocument.parentWindow.event,c[b])})}function i(a,b,d,f){var g=e(a);c[g]=c[g]||{},c[g][b]||(c[g][b]={},h(a,b,c[g])),c[g][b][d]=c[g][b][d]||[],c[g][b][d].push(f)}function j(a,b,d){var f=e(b),h=c[f]&&c[f];g.call(b,{target:d},h[a])}function k(a){return m(a),l(a),!1}function l(a){a&&a.preventDefault?a.preventDefault():a.returnValue=!1}function m(a){a&&(a.cease=!0)&&a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}var c={},d=-1;a({stop:k,stopPropagation:m,preventDefault:l,delegate:i,simulate:j})})});
provide("util/twitter",function(a){using("util/querystring",function(b){function f(a){return typeof a=="string"&&c.test(a)&&RegExp.$1.length<=20}function g(a){return f(a)&&RegExp.$1}function h(a){var c=b.decodeURL(a);c.screen_name=g(a);if(c.screen_name)return b.url("https://twitter.com/intent/user",c)}function i(a){return typeof a=="string"&&!/\W/.test(a)}function j(a){return i(a)?"#"+a:""}function k(a){return typeof a=="string"&&d.test(a)}function l(a){return k(a)&&RegExp.$1}function m(a){return e.test(a)}var c=/(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,d=/(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,e=/^http(s?):\/\/((www\.)?)twitter.com\//;a({isHashTag:i,hashTag:j,isScreenName:f,screenName:g,isStatus:k,status:l,intentForProfileURL:h,isTwitterURL:m,regexen:{profile:c}})})});
provide("util/insert",function(a){a(function(a,b){if(b){if(!b.parentNode)return b;b.parentNode.replaceChild(a,b),delete b}else document.body.insertBefore(a,document.body.firstChild);return a})});
provide("util/datetime",function(a){using("util/util",function(b){function n(a){var e=a||"",h=e.toString(),i,j;return i=function(){var a;if(f.test(h))return parseInt(h,10);if(a=h.match(d))return Date.UTC(a[7],b.indexOf(g,a[1]),a[2],a[3],a[4],a[5]);if(a=h.match(c))return Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6])}(),i?(j=new Date(i),!isNaN(j.getTime())&&j):!1}function o(a,b){function q(a,b){return p&&p[a]&&(a=p[a]),a.replace(/%\{([\w_]+)\}/g,function(a,c){return b[c]!==undefined?b[c]:a})}var c=n(a),d=+(new Date),e=d-c,f,l=b&&b.months||g,o=b&&b.formats||{abbr:"%{number}%{symbol}",shortdate:"%{day} %{month}",longdate:"%{day} %{month} %{year}"},p=b&&b.phrases;return c?isNaN(e)||e<h*2?q("now"):e<i?(f=Math.floor(e/h),q(o.abbr,{number:f,symbol:q(m,{abbr:q("s"),expanded:f>1?q("seconds"):q("second")})})):e<j?(f=Math.floor(e/i),q(o.abbr,{number:f,symbol:q(m,{abbr:q("m"),expanded:f>1?q("minutes"):q("minute")})})):e<k?(f=Math.floor(e/j),q(o.abbr,{number:f,symbol:q(m,{abbr:q("h"),expanded:f>1?q("hours"):q("hour")})})):e<k*365?q(o.shortdate,{day:c.getDate(),month:q(l[c.getMonth()])}):q(o.longtime,{day:c.getDate(),month:q(l[c.getMonth()]),year:c.getFullYear().toString().slice(2)}):""}var c=/(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,d=/[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,e=/[a-z]{3,4}, (\d{1,2}) ([a-z]{3}) (\d{4}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2})/i,f=/^\d+$/,g=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],h=1e3,i=h*60,j=i*60,k=j*24,l=k*7,m='<abbr title="%{expanded}">%{abbr}</abbr>';a({parse:n,timeAgo:o})})});
provide("tfw/widget/params",function(a){using("dom/delegate","dom/get","util/querystring","util/twitter",function(b,c,d,e){a(function(a,b){return function(c){var f,g="data-tw-params",h;if(!c)return;if(!e.isTwitterURL(c.href))return;if(c.getAttribute(g))return;c.setAttribute(g,!0);if(typeof f=="function"){f=b.call(c);for(h in f)f.hasOwnProperty(h)&&(a[h]=f[h])}c.href=d.url(c.href,a)}})})});
provide("$xd/json2.js", function(exports) {window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();exports();loadrunner.Script.loaded.push("$xd/json2.js")});
provide("util/params",function(a){using("util/querystring",function(b){var c=function(a){var c=a.search.substr(1);return b.decode(c)},d=function(a){var c=a.href,d=c.indexOf("#"),e=d<0?"":c.substring(d+1);return b.decode(e)},e=function(a){var b={},e=c(a),f=d(a);for(var g in e)e.hasOwnProperty(g)&&(b[g]=e[g]);for(var g in f)f.hasOwnProperty(g)&&(b[g]=f[g]);return b};a({combined:e,fromQuery:c,fromFragment:d})})});
provide("tfw/widget/env",function(a){using("util/params",function(b){function d(){var a=36e5,d=b.combined(document.location)._;return c!==undefined?c:(c=!1,d&&/^\d+$/.test(d)&&(c=+(new Date)-parseInt(d)<a),c)}var c;a({isDynamicWidget:d})})});
provide("util/decider",function(a){function c(a){var c=b[a]||!1;if(!c)return!1;if(c===!0||c===100)return!0;var d=Math.random()*100,e=c>=d;return b[a]=e,e}var b={force_new_cookie:100,rufous_pixel:100,decider_fixture:12.34};a({isAvailable:c})});
provide("dom/cookie",function(a){using("util/util",function(b){a(function(a,c,d){var e=b.aug({},d);if(arguments.length>1&&String(c)!=="[object Object]"){if(c===null||c===undefined)e.expires=-1;if(typeof e.expires=="number"){var f=e.expires,g=new Date((new Date).getTime()+f*60*1e3);e.expires=g}return c=String(c),document.cookie=[encodeURIComponent(a),"=",e.raw?c:encodeURIComponent(c),e.expires?"; expires="+e.expires.toUTCString():"",e.path?"; path="+e.path:"",e.domain?"; domain="+e.domain:"",e.secure?"; secure":""].join("")}e=c||{};var h,i=e.raw?function(a){return a}:decodeURIComponent;return(h=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?i(h[1]):null})})});
provide("util/donottrack",function(a){using("dom/cookie",function(b){a(function(a){var c=/\.(gov|mil)(:\d+)?$/i,d=/https?:\/\/([^\/]+).*/i;return a=a||document.referrer,a=d.test(a)&&d.exec(a)[1],b("dnt")?!0:c.test(document.location.host)?!0:a&&c.test(a)?!0:document.navigator?document.navigator["doNotTrack"]==1:navigator?navigator["doNotTrack"]==1||navigator["msDoNotTrack"]==1:!1})})});
provide("tfw/widget/guest_cookie",function(a){using("dom/cookie","util/donottrack","util/decider",function(b,c,d){function f(){var a=b(e)||!1;if(!a)return;a.match(/^v3\:/)||g()}function g(){b(e)&&b(e,null,{domain:".twitter.com",path:"/"})}function h(){c()&&g()}var e="pid";a({set:h,destroy:g,forceNewCookie:f,guest_id_cookie:e})})});
provide("tfw/widget/tracking",function(a){using("dom/cookie","dom/sandbox","util/donottrack","tfw/widget/guest_cookie","tfw/widget/env","util/util","$xd/json2.js",function(b,c,d,e,f,g,h){function u(){function a(a){t=a.frame,s=a.doc,r=a.doc.body,n=D(),o=E();while(p[0])y.apply(this,p.shift());q&&z()}t=document.getElementById("rufous-sandbox"),t?(s=t.contentWindow.document,r=s.body):c(a,{id:"rufous-sandbox"},{display:"none"})}function v(a,b,c){var d=i+b;if(!a)return;return a[d]=c,a}function w(a,c,g,h,i){var k=j[g],l,m={},n;if(!k)return;c||(c={}),i=!!i,h=!!h,n=c.original_redirect_referrer||document.referrer,i=i||d(n);for(l in c)m[l]=c[l];h||(v(m,"referrer",n),v(m,"widget",+f.isDynamicWidget()),v(m,"hask",+!!b("k")),v(m,"li",+!!b("twid")),v(m,e.guest_id_cookie,b(e.guest_id_cookie)||"")),i&&(v(m,"dnt",1),G(m)),F(a,k+"?"+C(m)),x(a,c,g,h,i)}function x(a,b,c,d,e){var f=B(b,c,d,e),g="//r.twimg.com/jot?";if(!f)return;g+=C({l:H(f)}),f.dnt&&(g+="&dnt="+ +f.dnt),F(a,g)}function y(a,b,c,d){var e,f,g,h;if(!r){p.push([a,b,c,d]);return}e=B(a,b,c,d),f=n.firstChild;if(!e)return;g=s.createElement("input"),f.value=+f.value||+e.dnt,h=H(e),g.type="hidden",g.name="l",g.value=h,n.appendChild(g)}function z(){if(!n){q=!0;return}if(n.children.length<=1)return;r.appendChild(n),r.appendChild(o),n.submit(),window.setTimeout(A(n,o),6e4),n=D(),o=E()}function A(a,b){return function(){var c=a.parentNode;c.removeChild(a),c.removeChild(b)}}function B(a,c,h,i){var j={_category_:"tfw_widgets"},l,m,n,o,p;c=~g.indexOf(k,c)&&c;if(!c)return;a||(a={}),h=!!h,i=!!i,j.event_name=c+":impression",p=a.original_redirect_referrer||document.referrer,j.dnt=i=i||d(p);for(l in a)a.hasOwnProperty(l)&&(j[l]=a[l]);return h||(j.logged_in=!!b("twid"),j.referrer=p,j.widget=f.isDynamicWidget(),j.pid=b(e.guest_id_cookie)||""),i&&G(j),j}function C(a){var b=[],c,d,e;for(c in a)a.hasOwnProperty(c)&&(d=encodeURIComponent(c),e=encodeURIComponent(a[c]),e=e.replace(/'/g,"%27"),b.push(d+"="+e));return b.join("&")}function D(){var a=s.createElement("form"),b=s.createElement("input");return m++,a.action="//r.twimg.com/jot",a.method="POST",a.target="rufous-frame-"+m,a.id="rufous-form-"+m,b.type="hidden",b.name="dnt",b.value=0,a.appendChild(b),a}function E(){var a,b="rufous-frame-"+m,c=0;try{a=s.createElement("<iframe name="+b+">")}catch(d){a=s.createElement("iframe"),a.name=b}return a.id=b,a.style.display="none",a.width=0,a.height=0,a.border=0,a}function F(a,b){var c=a.ownerDocument.createElement("img");c.src=b,c.alt="",c.style.position="absolute",c.style.height="1px",c.style.width="1px",c.style.top="-9999px",c.style.left="-9999px",a.appendChild(c)}function G(a){var b;for(b in a)~g.indexOf(l,b)&&delete a[b]}function H(a){var b=Array.prototype.toJSON,c;return delete Array.prototype.toJSON,c=JSON.stringify(a),Array.prototype.toJSON=b,c}var i="twttr_",j={tweetbutton:"//p.twitter.com/t.gif",followbutton:"//p.twitter.com/f.gif",tweetembed:"//p.twitter.com/e.gif"},k=["tweetbutton","followbutton","tweetembed","tweetbox","timeline","timeline-poll"],l=["hask","li","logged_in","pid",e.guest_id_cookie,i+"hask",i+"li",i+e.guest_id_cookie],m=0,n,o,p=[],q,r,s,t;e.forceNewCookie(),a({enqueue:y,flush:z,initPostLogging:u,addPixel:w,addRufousPixel:x,addVar:v})})});
provide("tfw/assets",function(a){using("util/env",function(b){function d(a,d){var e=c[a],f;return b.retina()?f="2x":b.ie6()||b.ie7()?f="gif":f="default",d&&(f+=".rtl"),e[f]}var c={"embed/timeline.css":{"default":"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.default.css","2x":"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.2x.css",gif:"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.gif.css","default.rtl":"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.default.rtl.css","2x.rtl":"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.2x.rtl.css","gif.rtl":"embed/timeline.9c37da75f27f61a1bca1d1803af4f6a1.gif.rtl.css"},"embed/embed.db2c829c654880a40587573127775568.css":{"default":"embed/embed.default.css","2x":"embed/embed.2x.css",gif:"embed/embed.gif.css","default.rtl":"embed/embed.default.rtl.css","2x.rtl":"embed/embed.2x.rtl.css","gif.rtl":"embed/embed.gif.rtl.css"}};a(d)})});
provide("util/logger",function(a){function c(a){window[b]&&window[b].log&&window[b].log(a)}function d(a){window[b]&&window[b].warn&&window[b].warn(a)}function e(a){window[b]&&window[b].error&&window[b].error(a)}var b=["con","sole"].join("");a({info:c,warn:d,error:e})});
provide("tfw/data",function(a){using("util/logger","util/util","util/querystring",function(b,c,d){function l(a,b){return a=={}.toString.call(b).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function m(a){return function(c){c.error?a.error&&a.error(c):c.headers&&c.headers.status!=200?(a.error&&a.error(c),b.warn(c.headers.message)):a.success&&a.success(c),a.complete&&a.complete(c),n(a)}}function n(a){var b=a.script;b&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),a.script=undefined,b=undefined),a.callbackName&&twttr.tfw.callbacks[a.callbackName]&&delete twttr.tfw.callbacks[a.callbackName]}function o(a){var b={};return a.success&&l("function",a.success)&&(b.success=a.success),a.error&&l("function",a.error)&&(b.error=a.error),a.complete&&l("function",a.complete)&&(b.complete=a.complete),b}function p(a,b,c){var d=a.length,e=[],f={},g=0;return function(e){var h,i=[],j=[],k=[],l,m;h=c(e),f[h]=e;if(++g===d){for(l=0;l<d;l++)m=f[a[l]],i.push(m),m.error?k.push(m):j.push(m);b.error&&k.length>0&&b.error(k),b.success&&j.length>0&&b.success(j),b.complete&&b.complete(i)}}}twttr=twttr||{},twttr.tfw=twttr.tfw||{},twttr.tfw.callbacks=twttr.tfw.callbacks||{};var e="twttr.tfw.callbacks",f=twttr.tfw.callbacks,g="cb",h=0,i=!1,j={},k={userLookup:"//api.twitter.com/1/users/lookup.json",userShow:"//cdn.api.twitter.com/1/users/show.json",status:"//cdn.api.twitter.com/1/statuses/show.json",count:"//cdn.api.twitter.com/1/urls/count.json",friendship:"//cdn.api.twitter.com/1/friendships/exists.json",timeline:"//cdn.syndication.twimg.com/widgets/timelines/",timelinePoll:"//syndication.twimg.com/widgets/timelines/paged/",timelinePreview:"//syndication.twimg.com/widgets/timelines/preview/"};twttr.widgets&&twttr.widgets.endpoints&&c.aug(k,twttr.widgets.endpoints),j.jsonp=function(a,b,c){var j=c||g+h,k=e+"."+j,l=document.createElement("script"),n={callback:k,suppress_response_codes:!0};f[j]=m(b);if(i||!/^https?\:$/.test(window.location.protocol))a=a.replace(/^\/\//,"https://");l.src=d.url(a,n),l.async="async",document.body.appendChild(l),b.script=l,b.callbackName=j,c||h++},j.config=function(a){if(a.forceSSL===!0||a.forceSSL===!1)i=a.forceSSL},j.user=function(){var a,b={},c,e,f;arguments.length===1?(a=arguments[0].screenName,b=o(arguments[0])):(a=arguments[0],b.success=arguments[1]),c=l("array",a)?k.userLookup:k.userShow,a=l("array",a)?a.join(","):a,e={screen_name:a},f=d.url(c,e),this.jsonp(f,b)},j.userById=function(a){var b,c={},e,f,g;arguments.length===1?(b=arguments[0].ids,c=o(arguments[0])):(b=arguments[0],c.success=arguments[1]),e=l("array",b)?k.userLookup:k.userShow,b=l("array",b)?b.join(","):b,f={user_id:b},g=d.url(e,f),this.jsonp(g,c)},j.status=function(){var a,b={},c,e,f,g;arguments.length===1?(a=arguments[0].id,b=o(arguments[0])):(a=arguments[0],b.success=arguments[1]);if(!l("array",a))c={id:a,include_entities:!0},e=d.url(k.status,c),this.jsonp(e,b);else{f=p(a,b,function(a){return a.error?a.request.split("id=")[1].split("&")[0]:a.id_str});for(g=0;g<a.length;g++)c={id:a[g],include_entities:!0},e=d.url(k.status,c),this.jsonp(e,{success:f,error:f})}},j.tweet=j.status,j.count=function(){var a="",b,c,e={};arguments.length===1?(a=arguments[0].url,e=o(arguments[0])):arguments.length===2&&(a=arguments[0],e.success=arguments[1]),c={url:a},b=d.url(k.count,c),this.jsonp(b,e)},j.friendshipExists=function(a){var b=arguments[0],c=o(arguments[0]),e={screen_name_a:a.screenNameA,screen_name_b:a.screenNameB},f=d.url(k.friendship,e);this.jsonp(f,c)},j.timeline=function(a){var b=arguments[0],c=o(b),e,f=9e5,g=Math.floor(+(new Date)/f),h={lang:a.lang,t:g,domain:window.location.host};a.dnt&&(h.dnt=a.dnt),e=d.url(k.timeline+a.id,h),this.jsonp(e,c,"tl_"+a.id)},j.timelinePoll=function(a){var b=arguments[0],c=o(b),e={lang:a.lang,since_id:a.sinceId,max_id:a.maxId,domain:window.location.host},f;a.dnt&&(e.dnt=a.dnt),f=d.url(k.timelinePoll+a.id,e),this.jsonp(f,c,"tlPoll_"+a.id+"_"+(a.sinceId||a.maxId))},j.timelinePreview=function(a){var b=arguments[0],c=o(b),e=a.params,f=d.url(k.timelinePreview,e);this.jsonp(f,c)},a(j)})});
provide("anim/transition",function(a){function b(a,b){var c;return b=b||window,c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.msRequestAnimationFrame||b.oRequestAnimationFrame||function(c){b.setTimeout(function(){a(+(new Date))},1e3/60)},c(a)}function c(a,b){return Math.sin(Math.PI/2*b)*a}function d(a,c,d,e,f){function i(h){var j=h-g,k=Math.min(j/d,1),l=e?e(c,k):c*k;a(l);if(k==1)return;b(i,f)}var g=+(new Date),h;b(i)}a({animate:d,requestAnimationFrame:b,easeOut:c})});
provide("tfw/widget/timeline",function(a){using("anim/transition","tfw/widget/base","tfw/widget/intent","tfw/data","tfw/assets","tfw/widget/tracking","tfw/widget/params","util/datetime","util/env","util/iframe","util/insert","util/twitter","util/querystring","util/util","dom/delegate","dom/classname","dom/get","dom/sandbox",function(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){function Z(a,b,c){var d;c=c||document;if(c.getElementById(a))return;d=c.createElement("link"),d.id=a,d.rel="stylesheet",d.type="text/css",d.href=twttr.widgets.config.assetUrl()+"/"+b,c.getElementsByTagName("head")[0].appendChild(d)}function $(a){if(!a)return;var b,d,e,f,g=this;c.Base.apply(this,[a]),b=this.params(),this.preview=b.previewParams,this.widgetId=b.widgetId||this.dataAttr("widget-id"),this.targetEl=this.srcEl&&this.srcEl.parentNode||b.targetEl||document.body,e=this.targetEl&&this.targetEl.offsetWidth,d=b.width||this.attr("width")||e,this.height=u.test(b.height||this.attr("height"))&&RegExp.$1,this.width=Math.max(z,Math.min(u.test(d)?RegExp.$1:x,x)),this.narrow=b.narrow||this.width<=y,this.linkColor=v.test(b.linkColor||this.dataAttr("link-color"))&&RegExp.$1,this.theme=b.theme||this.attr("data-theme"),this.theme=/(dark|light)/.test(this.theme)?this.theme:"",this.classAttr.push("twitter-timeline-rendered"),this.classAttr.push(j.touch()?"is-touch":"not-touch"),this.ariaPolite=b.ariaPolite||this.dataAttr("aria-polite"),s(function(a){g.sandboxReady=!0,g.setupSandbox.call(g,a)},{className:"twitter-timeline twitter-timeline-rendered",id:this.id},{width:"1px",height:"1px",border:"none",position:"absolute"},function(a){g.srcEl?g.targetEl.insertBefore(a,g.srcEl):g.targetEl.appendChild(a)})}function _(a,b){var c=a.ownerDocument,d=r.one(N,a,"DIV"),e=d.children[0],f=e.getAttribute("data-expanded-media"),g,h=0,i=r.one(O,a,"A"),j=i&&i.getElementsByTagName("B")[0],k=j&&(j.innerText||j.textContent),l;if(!j)return;j.innerHTML=i.getAttribute("data-toggled-text"),i.setAttribute("data-toggled-text",k);if(q.present(a,M)){q.remove(a,M),d.style.cssText="";return}f&&(g=c.createElement("DIV"),g.innerHTML=f,ba(g),h=bc(g,b),e.removeAttribute("data-expanded-media"),e.appendChild(g)),l=Math.max(e.offsetHeight,h),d.style.cssText="height:"+l+"px",q.add(a,M)}function ba(a){if(!j.retina())return;var b=a.getElementsByTagName("IMG"),c,d,e=0,f=b.length;for(;e<f;e++)c=b[e],d=c.getAttribute("data-src-2x"),d&&(c.src=d)}function bb(a,b,c,d){return b>a&&b>d?(a*=d/b,b=d):a>c&&(b*=c/a,a=c),{width:Math.ceil(a),height:Math.ceil(b)}}function bc(a,b){var c=a.getElementsByTagName("IMG"),d=a.getElementsByTagName("IFRAME"),e,f,g,h=0,i=0,j;for(;e=[c,d][i];i++)if(e.length)for(j=0;f=e[j];j++)g=bb(f.getAttribute("width")||f.width,f.getAttribute("height")||f.height,b,f.getAttribute("height")||f.height),g.width>0&&(f.width=g.width),g.height>0&&(f.height=g.height),h=g.height>h?g.height:h;return h}var t="1.0",u=/^([0-9]+)( ?px)?$/,v=/^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i,w="600",x="520",y="320",z="220",A="350",B=81,C=16,D=[".customisable",".customisable:link",".customisable:visited",".customisable:hover",".customisable:active",".customisable-highlight:hover","a:hover .customisable-highlight","a:focus .customisable-highlight"],E=["a:hover .ic-mask","a:focus .ic-mask"],F="timeline",G="new-tweets-bar",H="timeline-header",I="timeline-footer",J="stream",K="h-feed",L="tweet",M="expanded",N="detail-expander",O="expand",P="permalink",Q="twitter-tweet-box",R="tweet-box-button",S="twitter-follow-button",T="no-more-pane",U="pending-scroll-in",V="pending-new-tweet",W="show-new-tweet",X="show-tweet-box",Y="web-intent";$.prototype=new c.Base,o.aug($.prototype,{create:function(a){var b=this.sandbox.doc.createElement("div"),c,d=this,e,f,g;b.innerHTML=a.body,c=b.children[0]||!1;if(!c)return;return this.reconfigure(a.config),this.augmentWidgets(c),ba(c),bc(c,this.contentWidth()),this.logImpressions(b,"timeline"),this.ariaPolite=="assertive"&&(f=r.one(G,c,"DIV"),f.setAttribute("aria-polite","assertive")),c.id=this.id,c.className+=" "+this.classAttr.join(" "),c.lang=this.lang,twttr.widgets.load(c),g=function(){d.sandbox.body.appendChild(c),d.sandbox.win.setTimeout(function(){var a=r.one(H,c,"DIV"),b=r.one(I,c,"DIV"),f=r.one(J,c,"DIV");b?e=a.offsetHeight+b.offsetHeight:e=a.offsetHeight,f.style.cssText="height:"+(d.height-e-2)+"px"},500),d.sandbox.frame.style.cssText="",d.sandbox.frame.width=d.width,d.sandbox.frame.height=d.height,d.sandbox.frame.style.border="none"},this.frameIsReady?g():this.onFrameReady=g,this.srcEl&&this.srcEl.parentNode.removeChild(this.srcEl),c},render:function(a,b){function j(){d.success=function(a){c.element=c.create(a),c.readTranslations(),c.bindEvents(),b&&b(c.sandbox.frame);return},d.error=function(a){a&&a.headers&&b&&b(a.headers.status)},d.params=c.preview,e.timelinePreview(d);return}function k(){g.initPostLogging(),e.timeline({id:c.widgetId,dnt:c.dnt,lang:c.lang,success:function(a){c.element=c.create(a),c.readTranslations(),c.bindEvents(),a.headers.xPolling&&/\d/.test(a.headers.xPolling)&&(c.pollInterval=a.headers.xPolling*1e3),c.updateTimeStamps(),c.schedulePolling(),b&&b(c.sandbox.frame);return},error:function(a){a&&a.headers&&b&&b(a.headers.status)}})}var c=this,d={},f,h,i;if(!this.preview&&!this.widgetId){b&&b(400);return}i=this.preview?j:k,this.sandboxReady?i():window.setTimeout(i,0)},reconfigure:function(a){this.lang=a.lang,this.theme||(this.theme=a.theme),this.theme=="dark"&&this.classAttr.push("thm-dark"),!this.linkColor&&a.linkColor&&v.test(a.linkColor)&&(this.linkColor=RegExp.$1),this.linkColor&&this.addLinkColorStyle(this.linkColor),!this.height&&u.test(a.height)&&(this.height=RegExp.$1),this.height=Math.max(A,this.height?this.height:w),this.preview&&this.classAttr.push("var-preview"),this.narrow=this.width<=y,this.narrow&&this.classAttr.push("var-narrow")},logImpressions:function(a,b){var c=r.all(P,a,"A"),d=c.length,e,f=0;for(;e=c[f];f++)g.enqueue({widget_id:this.widgetId,tweet_ids:[m.status(e.href)]},b,!0,this.dnt);f&&g.flush()},addLinkColorStyle:function(a){var b=this,c=this.sandbox.doc,d=this.id+"-styles",e,f=0,g=function(a){return(b.theme=="dark"?".thm-dark ":"")+a},h,i;if(c.getElementById(d))return;h=o.map(D,g).join(",")+"{color:"+a+"}",i=o.map(E,g).join(",")+"{background-color:"+a+"}",e=c.createElement("style"),e.id=d,e.type="text/css";if(window.createPopup&&c.styleSheets){c.styleSheets.userCss=e,c.styleSheets.userCss.cssText=h+i;return}e.appendChild(c.createTextNode(h)),e.appendChild(c.createTextNode(i)),c.getElementsByTagName("head")[0].appendChild(e)},bindEvents:function(){var a=this,b=this.element,c=!0;p.delegate(b,"click",".profile",function(b){var c;a.addUrlParams(this),c=m.intentForProfileURL(this.href),c&&(d.open(c),p.preventDefault(b))}),p.delegate(b,"click","."+Y,function(b){a.addUrlParams(this),d.open(this.href),p.preventDefault(b)}),p.delegate(b,"click","."+O,function(c){_(r.ancestor("."+L,this,b),a.contentWidth()),p.stop(c)}),p.delegate(b,"click","A",function(a){p.stopPropagation(a)}),p.delegate(b,"click",".with-expansion",function(b){_(this,a.contentWidth()),p.stop(b)}),p.delegate(b,"click",".load-more",function(b){a.loadMore()}),p.delegate(b,"click","."+G,function(b){a.scrollToTop(),a.hideNewTweetNotifier(!0)}),p.delegate(b,"click",".load-tweets",function(b){c&&(c=!1,a.forceLoad(),p.stop(b))}),p.delegate(b,"click",".display-sensitive-image",function(c){a.showNSFW(r.ancestor("."+L,this,b)),p.stop(c)}),p.delegate(b,"mouseover","."+F,function(b){a.mouseOver=!0}),p.delegate(b,"mouseout","."+F,function(b){a.mouseOver=!1}),p.delegate(b,"mouseover","."+G,function(b){a.mouseOverNotifier=!0}),p.delegate(b,"mouseout","."+G,function(b){a.mouseOverNotifier=!1,window.setTimeout(function(){a.hideNewTweetNotifier()},3e3)}),!j.ie6()&&!j.ie7()&&(p.delegate(b,"click","."+R,function(b){a.expandTweetBox(),p.stop(b)}),p.delegate(document.documentElement,"click","HTML",function(b){a.collapseTweetBox()}),p.delegate(b,"click","DIV",function(b){a.collapseTweetBox()}))},scrollToTop:function(){var a=r.one(J,this.element,"DIV");a.scrollTop=0,a.focus()},update:function(){var a=this,b=r.one(L,this.element,"LI"),c=b&&b.getAttribute("data-tweet-id");this.updateTimeStamps(),this.requestTweets(c,!0,function(b){b.childNodes.length>0&&a.insertNewTweets(b)})},loadMore:function(){var a=this,b=r.all(L,this.element,"LI").pop(),c=b&&b.getAttribute("data-tweet-id");this.requestTweets(c,!1,function(b){var d=r.one(T,a.element,"P"),e=b.childNodes[0];d.style.cssText="",e&&e.getAttribute("data-tweet-id")==c&&b.removeChild(e);if(b.childNodes.length>0){a.appendTweets(b);return}q.add(a.element,"no-more"),d.focus()})},forceLoad:function(){var a=this,b=!!r.all(K,this.element,"OL").length;this.requestTweets(1,!0,function(c){c.childNodes.length&&(a[b?"insertNewTweets":"appendTweets"](c),q.add(a.element,"has-tweets"))})},schedulePolling:function(a){var b=this;if(this.pollInterval===null)return;a=twttr.widgets.poll||a||this.pollInterval||1e4,a>-1&&window.setTimeout(function(){this.isUpdating||b.update(),b.schedulePolling()},a)},requestTweets:function(a,b,c){var d=this,f={id:this.widgetId,dnt:this.dnt,lang:this.lang};f[b?"sinceId":"maxId"]=a,f.complete=function(){this.isUpdating=!1},f.error=function(a){if(a&&a.headers){if(a.headers.status=="404"){d.pollInterval=null;return}if(a.headers.status=="503"){d.pollInterval*=1.5;return}}},f.success=function(a){var b=d.sandbox.doc.createDocumentFragment(),e=d.sandbox.doc.createElement("div");a&&a.headers&&a.headers.xPolling&&/\d+/.test(a.headers.xPolling)&&(d.pollInterval=a.headers.xPolling*1e3);if(a&&a.body!==undefined){e.innerHTML=a.body;if(e.children[0]&&e.children[0].tagName!="LI")return;d.logImpressions(e,"timeline-poll"),ba(e),bc(e,d.contentWidth());while(e.children[0])b.appendChild(e.children[0]);c(b)}},e.timelinePoll(f)},insertNewTweets:function(a){var c=this,d=r.one(J,this.element,"DIV"),e=r.one(K,d,"OL"),f=e.offsetHeight,g;this.updateTimeStamps(),e.insertBefore(a,e.firstChild),g=e.offsetHeight-f;if(d.scrollTop>40||this.mouseIsOver()){d.scrollTop=d.scrollTop+g,this.showNewTweetNotifier();return}q.remove(this.element,U),e.style.cssText="margin-top: -"+g+"px",window.setTimeout(function(){d.scrollTop=0,q.add(c.element,U),j.cssTransitions()?e.style.cssText="":b.animate(function(a){a<g?e.style.cssText="margin-top: -"+(g-a)+"px":e.style.cssText=""},g,500,b.easeOut)},500),this.gcTweets(50)},appendTweets:function(a){var b=r.one(J,this.element,"DIV"),c=r.one(K,b,"OL");this.updateTimeStamps(),c.appendChild(a)},gcTweets:function(a){var b=r.one(K,this.element,"OL"),c=b.children.length,d;a=a||50;for(;c>a&&(d=b.children[c-1]);c--)b.removeChild(d)},showNewTweetNotifier:function(){var a=this,b=r.one(G,this.element,"DIV"),c=b.children[0];b.style.cssText="",q.add(this.element,V),b.removeChild(c),b.appendChild(c),q.replace(this.element,V,W),this.newNoticeDisplayTime=+(new Date),window.setTimeout(function(){a.hideNewTweetNotifier()},5e3)},hideNewTweetNotifier:function(a){var b=this,c=r.one(G,this.element,"DIV");if(!a&&this.mouseOverNotifier)return;q.replace(this.element,W,V),window.setTimeout(function(){q.remove(b.element,V)},500)},expandTweetBox:function(){var a=r.one(Q,this.element,"IFRAME"),b=a&&a.parentNode;if(!a)return;q.add(this.element,X),window.postMessage&&a.contentWindow.postMessage("autofocus","*")},collapseTweetBox:function(){q.remove(this.element,X)},augmentWidgets:function(a){var b=r.all(S,a,"A"),c=r.one(Q,a,"A"),d=r.one(R,a,"BUTTON"),e=0,f=b.concat([c]),g;for(;g=f[e];e++)g.setAttribute("data-related",this.related),g.setAttribute("data-partner",this.partner),g.setAttribute("data-dnt",this.dnt),g.setAttribute("data-autofocus","true");if(this.width<250)for(e=0;g=b[e];e++)g.setAttribute("data-show-screen-name","false");c&&(j.ie6()||j.ie7()?(d&&d.parentNode.removeChild(d),c.className=[R,Y].join(" ")):(c.setAttribute("data-width",this.width),c.setAttribute("data-theme",this.theme=="dark"?"tweetdeck":"")))},readTranslations:function(){var a=this.element,b="data-dt-";this.i18n={phrases:{now:a.getAttribute(b+"now"),s:a.getAttribute(b+"s"),m:a.getAttribute(b+"m"),h:a.getAttribute(b+"h"),second:a.getAttribute(b+"second"),seconds:a.getAttribute(b+"seconds"),minute:a.getAttribute(b+"minute"),minutes:a.getAttribute(b+"minutes"),hour:a.getAttribute(b+"hour"),hours:a.getAttribute(b+"hours")},months:a.getAttribute(b+"months").split("|"),formats:{abbr:a.getAttribute(b+"abbr"),shortdate:a.getAttribute(b+"short"),longdate:a.getAttribute(b+"long")}}},updateTimeStamps:function(){var a=r.all(P,this.element,"A"),b,c,d=0,e,f;for(;a[d]&&(b=a[d]);d++){e=a[d].getAttribute("data-datetime"),f=i.timeAgo(e,this.i18n),c=b.getElementsByTagName("TIME")[0];if(c&&c.innerHTML){c.innerHTML=f;continue}b.innerHTML=f}},mouseIsOver:function(){return this.mouseOver},addStyleSheet:function(){var a=q.present(document.documentElement,"twitter-dev")?"/components/syndication-templates/lib/css/index.css":f("embed/timeline.css");Z("twitter-timeline-css",a,this.sandbox.doc)},setupSandbox:function(a){var b=a.doc,c=b.createElement("base"),d=b.createElement("style"),e=b.getElementsByTagName("head")[0],f="body{display:none}";this.sandbox=a;if(j.ie6())try{b.execCommand("BackgroundImageCache",!1,!0)}catch(g){}this.addStyleSheet(),c.target="_top",e.appendChild(c),window.createPopup&&b.styleSheets?(b.styleSheets.hiddenBody=d,b.styleSheets.hiddenBody.cssText=f):(d.appendChild(b.createTextNode(f)),e.appendChild(d)),this.frameIsReady=!0,this.onFrameReady&&(this.onFrameReady(),this.onFrameReady=null)},addUrlParams:function(a){var b=this,c={tw_w:this.widgetId,related:this.related,partner:this.partner,tw_p:"embeddedtimeline"};return this.addUrlParams=h(c,function(a){var c=r.ancestor("."+L,a,b.element);return{tw_i:c.getAttribute("data-tweet-id")}}),this.addUrlParams(a)},contentWidth:function(){return this.width-(this.narrow?C:B)},showNSFW:function(a){var b=r.one("nsfw",a,"DIV"),c,d,e=0,f,g,h,i;if(!b)return;d=bb(b.getAttribute("data-width"),b.getAttribute("data-height"),this.contentWidth(),b.getAttribute("data-height")),c=!!(g=b.getAttribute("data-player")),c?h=this.sandbox.doc.createElement("iframe"):(h=this.sandbox.doc.createElement("img"),g=b.getAttribute(j.retina()?"data-image-2x":"data-image"),h.alt=b.getAttribute("data-alt"),i=this.sandbox.doc.createElement("a"),i.href=b.getAttribute("data-href"),i.appendChild(h)),h.title=b.getAttribute("data-title"),h.src=g,h.width=d.width,h.height=d.height,f=r.ancestor("."+N,b,a),e=d.height-b.offsetHeight,b.parentNode.replaceChild(c?h:i,b),f.style.cssText="height:"+(f.offsetHeight+e)+"px"}}),a({Embeddable:$})})});
provide("lib/twt",function(a){a(function(a,b){var c=a!="en"?a+".":"";using("$vendor/twt/dist/twt."+c+"min.js",function(){twt.settings.lang=a,b(twt)})})});
provide("util/tweetparser",function(a){using("util/util",function(b){function g(a,c){var d=document.getElementsByTagName(a),e=b.filter(d,function(a){return b.containsElement(c,a)});return e||[]}function h(a){return a&&c.test(a)&&RegExp.$1}function i(a){if(!a||!a.nodeName||!/blockquote/i.test(a.nodeName))return;var b={},c=g("p",a).shift(),d=g("a",a).pop();if(!c&&g("br",a).length){c=document.createElement("p");for(var e=0,f;f=a.childNodes[e];e++){if(f.nodeType===1&&/^br$/i.test(f.nodeName))break;c.appendChild(f)}}return c&&(b.text=c.textContent||c.innerText||"",b.rendered_text=c.innerHTML||""),d&&(d.getAttribute("data-datetime")?b.created_at=d.getAttribute("data-datetime"):b.time=d.textContent||d.innerText),b.user=j(a),b.id=b.id_str=h(d.href),b.id_str&&b.text&&b.user&&b}function j(a){var b={},c=0,d=a.childNodes.length,h,i;for(;c<d;c++){h=a.childNodes[c],h.nodeType===1&&/^p$/i.test(h.nodeName)&&(h=h.childNodes[0]);if(h&&h.nodeType===3&&e.test(h.nodeValue)){b.name=RegExp.$1.split(" ").slice(1).join(" "),b.screen_name=RegExp.$2;break}}if(b.screen_name)return b;i=g("a",a).pop();if(i&&f.test(i.href))return b.name="",b.screen_name=RegExp.$2,b}var c=/\/(\d+)\/?$/,d=/^https?:\/\/(?:www\.)?twitter\.com\/(?:#!\/)?[\w_]+\/status(?:es)?\/(\d+)\/?/,e=/^\s*(.+)\s+\(@([\w_]{1,20})\)\s*$/,f=/^https?:\/\/(?:www\.)?twitter\.com\/(#!\/)?([\w_]{1,20})/;a({parseTweet:i,parseId:h,parseAuthor:j})})});
provide("i18n/i18n",function(a){function b(){twttr.i18n_missing_interval||(twttr.i18n_missing_interval=window.setInterval(function(){twttr.i18n_missing&&twttr.i18n_missing.length>0&&($.ajax({type:"POST",data:$.param({authenticity_token:twttr.form_authenticity_token,location:window.location.href,"strings[]":twttr.i18n_missing}),url:"/translate/untranslated_javascript"}),twttr.i18n_missing=new Array)},1e4))}function c(a){twttr.i18n_missing||(twttr.i18n_missing=new Array),twttr.i18n_missing_reported||(twttr.i18n_missing_reported={}),twttr.i18n_missing_reported[a]||(twttr.i18n_missing.push(encodeURIComponent(a)),twttr.i18n_missing_reported[a]=!0)}function d(a,b){if(b)for(var c in b)a=a.replace(new RegExp("\\%\\{"+c+"\\}","gi"),b[c]);return a}window.setupTranslationCallback=b,a({_:function(a,b){if(twttr.i18n){var e=twttr.i18n[a];e?a=e:c(a)}return d(a,b)},setupTranslationCallback:b})});
provide("tfw/widget/tweetembed",function(a){using("util/util","tfw/widget/base","tfw/assets","util/uri","util/insert","tfw/data","i18n/i18n","util/tweetparser","tfw/widget/tracking",function(b,c,d,e,f,g,h,i,j){function p(a){var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.href=twttr.widgets.config.assetUrl()+"/"+a,document.getElementsByTagName("head")[0].appendChild(b)}function q(){if(l)return;p("embed/embed.db2c829c654880a40587573127775568.css"),l=!0}function r(a,b){var c={};c.status_id=a.id_str,c.tweet_ids=[a.id_str],c.context=n,j.addVar(c,"variant",k),j.addVar(c,"referrer",document.location.href),j.addPixel(document.body,c,"tweetembed",!0),b&&a._wjs_reply&&(c.status_id=a._wjs_reply.id_str,c.tweet_ids=[a._wjs_reply.id_str],c.context=o,j.addPixel(document.body,c,"tweetembed",!0))}function s(a){if(!a)return;var d,e;c.Base.apply(this,[a]),d=this.params(),e=d.width||this.attr("width"),this.classNames=b.filter(this.classAttr,function(a){return a!="twitter-tweet"}),this.classNames.push("twitter-tweet-rendered"),this.styleAttr=[],this.styleAttr.push(this.attr("style")||"");if(m.test(e))this.explicitWidth=RegExp.$1;else if(~b.indexOf(this.classNames,"tw-align-l")||~b.indexOf(this.classNames,"tw-align-r"))this.explicitWidth="350";this.explicitWidth&&this.styleAttr.push("width:"+this.explicitWidth+"px!important"),this.showThread=d.hideThread!==!0&&!~b.indexOf(this.classNames,"tw-hide-thread"),this.showMedia=d.hideMedia!==!0&&!~b.indexOf(this.classNames,"tw-hide-media"),this.data=i.parseTweet(this.srcEl),this.inReplyTo=d.inReplyTo||this.dataAttr("data-in-reply-to")||""}var k="1.0",l,m=/^([0-9]+)( ?px)?$/,n="subject",o="thread";s.prototype=new c.Base,b.aug(s.prototype,{create:function(a,b){var c=this,d,e=!!a._wjs_stub_data;return!e&&r(a,c.showThread),using("lib/twt",function(g){g(c.lang,function(g){var h=document.createElement("div"),i=g.autoFormat(c.explicitWidth||c.element),j=g(a,{format:i,popupWebIntents:!1,tweetElement:"blockquote",showMedia:c.showMedia,showErrors:!1,showFollowButton:!e,renderActions:!e,product:"tweetembed",partner:c.partner,related:c.related}),k='<div id="{{id}}" class="{{classNames}}" lang="{{lang}}" style="{{style}}">{{twt}}</div>',l={id:c.id,classNames:b||"",style:c.styleAttr.join(";"),lang:c.lang,twt:c.data._wjs_reply?j.inReplyTo(a._wjs_reply).html():j.html()};h.innerHTML=c.ringo(k,l),d=f(h.firstChild,c.element)})}),d},render:function(a){var b=this,c,d;if(!b.data)return;q(),using("lib/twt",function(a){a(b.lang,function(){c=b.classNames.join(" "),b.data._wjs_stub_data=!0,b.element=b.srcEl,b.element=b.create(b.data,c),d=[b.data.id_str],b.inReplyTo&&b.showThread&&d.push(b.inReplyTo),g.status({id:d,complete:function(a){var d=a[0],e=a[1];if(d.error)return;b.data=d;if(b.showThread&&d.in_reply_to_status_id_str&&(!e||d.in_reply_to_status_id_str!=e.id_str)){g.status({id:d.in_reply_to_status_id_str,complete:function(a){a&&!a.error&&(b.data._wjs_reply=a),b.element=b.create(b.data,c)}});return}d.in_reply_to_status_id_str&&e&&!e.error&&(b.data._wjs_reply=e),b.element=b.create(b.data,c)}})})})}}),a({Embeddable:s})})});
provide("dom/textsize",function(a){function c(a,b,c){return a+b+c}var b={};a(function(a,d,e){var f=document.createElement("span"),g={},h;return e=e||"",d=d||"",h=c(a,d,e),b[h]?b[h]:(f.className=d+" twitter-measurement",f.setAttribute("style",e),f.innerHTML=a,document.body.appendChild(f),g.width=f.clientWidth||f.offsetWidth,g.height=f.clientHeight||f.offsetHeight,document.body.removeChild(f),delete f,b[h]=g)})});
provide("tfw/widget/tweetbase",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri",function(b,c,d,e){function h(a){if(!a)return;var b;c.Base.apply(this,[a]),b=this.params(),this.text=b.text||this.dataAttr("text"),this.align=b.align||this.dataAttr("align")||"",this.via=b.via||this.dataAttr("via"),this.placeid=b.placeid||this.dataAttr("placeid"),this.hashtags=b.hashtags||this.dataAttr("hashtags"),this.screen_name=b.screen_name||this.dataAttr("button-screen-name"),this.url=b.url||this.dataAttr("url")}var f=document.title,g=encodeURI(location.href);h.prototype=new c.Base,b.aug(h.prototype,{parameters:function(){var a={text:this.text,url:this.url,related:this.related,lang:this.lang,placeid:this.placeid,original_referer:location.href,id:this.id,screen_name:this.screen_name,hashtags:this.hashtags,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)}}),a({TweetBase:h})})});
provide("tfw/widget/tweetbutton",function(a){using("util/util","tfw/widget/tweetbase","util/querystring","util/uri","dom/textsize",function(b,c,d,e,f){var g=document.title,h=encodeURI(location.href),i=["vertical","horizontal","none"],j=function(a){c.TweetBase.apply(this,[a]);var d=this.params(),f=d.count||this.dataAttr("count"),j=d.size||this.dataAttr("size"),k=e.getScreenNameFromPage();~b.indexOf(this.classAttr,"twitter-hashtag-button")?this.type="hashtag":~b.indexOf(this.classAttr,"twitter-mention-button")&&(this.type="mention"),this.text=d.text||this.dataAttr("text"),this.align=d.align||this.dataAttr("align")||"",this.via=d.via||this.dataAttr("via"),this.related=d.related||this.dataAttr("related"),this.counturl=d.counturl||this.dataAttr("counturl"),this.searchlink=d.searchlink||this.dataAttr("searchlink"),this.placeid=d.placeid||this.dataAttr("placeid"),this.hashtags=d.hashtags||this.dataAttr("hashtags"),this.screen_name=d.screen_name||this.dataAttr("button-screen-name"),this.button_hashtag=d.button_hashtag||this.dataAttr("button-hashtag"),this.url=d.url||this.dataAttr("url"),this.size=j=="large"?"l":"m",this.dnt=d.dnt||this.dataAttr("dnt")||"",this.type?(this.count="none",k&&(this.related=this.related?k+","+this.related:k)):(this.text=this.text||g,this.url=this.url||e.getCanonicalURL()||h,this.count=~b.indexOf(i,f)?f:"horizontal",this.count=this.count=="vertical"&&this.size=="l"?"none":this.count,this.via=this.via||k)};j.prototype=new c.TweetBase,b.aug(j.prototype,{parameters:function(){var a={text:this.text,url:this.url,via:this.via,related:this.related,count:this.count,lang:this.lang,counturl:this.counturl,searchlink:this.searchlink,placeid:this.placeid,original_referer:location.href,id:this.id,size:this.size,type:this.type,screen_name:this.screen_name,button_hashtag:this.button_hashtag,hashtags:this.hashtags,align:this.align,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},height:function(){return this.count=="vertical"?62:this.size=="m"?20:28},width:function(){var a={ver:8,cnt:14,btn:24,xlcnt:18,xlbtn:38},c=this.count=="vertical",d=this.type=="hashtag"?"Tweet %{hashtag}":this.type=="mention"?"Tweet to %{name}":"Tweet",e=this._(d,{name:"@"+this.screen_name,hashtag:"#"+this.button_hashtag}),g=this._("K"),h=this._("100K+"),i=(c?"8888":"88888")+g,j=0,k=0,l=0,m=0,n=this.styles.base,o=n;return~b.indexOf(["ja","ko"],this.lang)?i+=this._("10k unit"):i=i.length>h.length?i:h,c?(o=n+this.styles.vbubble,m=a.ver,l=a.btn):this.size=="l"?(n=o=n+this.styles.large,l=a.xlbtn,m=a.xlcnt):(l=a.btn,m=a.cnt),this.count!="none"&&(k=f(i,"",o).width+m),j=f(e,"",n+this.styles.button).width+l,c?j>k?j:k:this.calculatedWidth=j+k},render:function(){var a=twttr.widgets.config.assetUrl()+"/widgets/tweet_button.1347008535.html#"+this.parameters();this.count&&(this.srcEl.className+=" twitter-count-"+this.count),this.element=this.create(a,this.srcEl.className,this.dimensions(),{title:this._("Twitter Tweet Button")})}}),a({Embeddable:j})})});
provide("tfw/widget/tweetbox",function(a){using("util/util","tfw/widget/tweetbase","util/querystring","util/uri",function(b,c,d,e){function k(a){c.TweetBase.apply(this,[a]);var b=this.params(),d=e.getScreenNameFromPage();this.setLanguage(),this.width(b.width||this.dataAttr("width")),this.theme=b.theme||this.dataAttr("theme"),this.autofocus=b.autofocus||this.dataAttr("autofocus"),this.related=b.related||this.dataAttr("related"),this.placeid=b.placeid||this.dataAttr("placeid"),this.screen_name=b.screen_name||this.dataAttr("screen-name")||this.dataAttr("button-screen-name"),this.hashtags=b.hashtags||this.dataAttr("hashtags"),this.dnt=b.dnt||this.dataAttr("dnt")||""}var f=document.title,g=encodeURI(location.href),h="100%",i="220px",j=140;k.prototype=new c.TweetBase,b.aug(k.prototype,{parameters:function(){var a={related:this.related,lang:this.lang,placeid:this.placeid,original_referer:location.href,id:this.id,size:this.size,width:this.width(),height:this.height(),theme:this.theme,type:this.type,screen_name:this.screen_name,hashtags:this.hashtags,autofocus:this.autofocus,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},minWidth:function(){return i},height:function(a){return j},width:function(a){var b=/^([0-9]+)( ?(px|%))?$/.test(a);return b&&RegExp.$2?this.setWidth(a):b?this.setWidth(a+"px"):this.setWidth(h)},setWidth:function(a){return this.width=function(){return a}},render:function(){var a=twttr.widgets.config.assetUrl()+"/widgets/tweet_box.1347008535.html#"+this.parameters();this.element=this.create(a,this.srcEl.className,this.dimensions(),{title:this._("Twitter Tweet Box")})}}),a({Embeddable:k})})});
provide("tfw/widget/follow",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri","util/twitter","dom/textsize",function(b,c,d,e,f,g){function h(a){if(!a)return;var b,d,e,g;c.Base.apply(this,[a]),b=this.params(),d=b.size||this.dataAttr("size"),e=b.show_screen_name||this.dataAttr("show-screen-name"),g=b.show_count||this.dataAttr("show-count"),this.showScreenName=e!="false",this.showCount=g!="false",this.explicitWidth=b.width||this.dataAttr("width")||"",this.screenName=b.screenName||f.screenName(this.attr("href")),this.preview=b.preview||this.dataAttr("preview")||"",this.align=b.align||this.dataAttr("align")||"",this.size=d=="large"?"l":"m"}h.prototype=new c.Base,b.aug(h.prototype,{parameters:function(){var a={screen_name:this.screenName,lang:this.lang,show_count:this.showCount,show_screen_name:this.showScreenName,align:this.align,id:this.id,preview:this.preview,size:this.size,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},render:function(){if(!this.screenName)return;var a=twttr.widgets.config.assetUrl()+"/widgets/follow_button.1347008535.html#"+this.parameters();this.element=this.create(a,"twitter-follow-button",this.dimensions(),{title:this._("Twitter Follow Button")})},width:function(){if(this.calculatedWidth)return this.calculatedWidth;if(this.explicitWidth)return this.explicitWidth;var a={cnt:13,btn:24,xlcnt:22,xlbtn:38},c=this.showScreenName?"Follow %{screen_name}":"Follow",d=this._(c,{screen_name:"@"+this.screenName}),e=~b.indexOf(["ja","ko"],this.lang)?this._("10k unit"):this._("M"),f=this._("%{followers_count} followers",{followers_count:"88888"+e}),h=0,i=0,j,k,l=this.styles.base;return this.size=="l"?(l+=this.styles.large,j=a.xlbtn,k=a.xlcnt):(j=a.btn,k=a.cnt),this.showCount&&(i=g(f,"",l).width+k),h=g(d,"",l+this.styles.button).width+j,this.calculatedWidth=h+i}}),a({Embeddable:h})})});
!function(){function a(a){return(a||!/^http\:$/.test(window.location.protocol))&&!twttr.ignoreSSL?"https":"http"}window.twttr=window.twttr||{},twttr.host=twttr.host||"platform.twitter.com";if(twttr.widgets&&twttr.widgets.loaded)return twttr.widgets.load(),!1;if(twttr.init)return!1;twttr.init=!0,twttr._e=twttr._e||[],twttr.ready=twttr.ready||function(a){twttr.widgets&&twttr.widgets.loaded?a(twttr):twttr._e.push(a)},using.path.length||(using.path=a()+"://"+twttr.host+"/js"),twttr.ignoreSSL=twttr.ignoreSSL||!1;var b=[];twttr.events={bind:function(a,c){return b.push([a,c])}},using("util/domready",function(c){c(function(){using("util/util","tfw/widget/follow","tfw/widget/tweetbox","tfw/widget/tweetbutton","tfw/widget/tweetembed","tfw/widget/timeline","tfw/widget/intent","util/events","tfw/widget/base",function(c,d,e,f,g,h,i,j,k){function q(b){var c=twttr.host;return a(b)=="https"&&twttr.secureHost&&(c=twttr.secureHost),a(b)+"://"+c}function r(){using("tfw/widget/hubclient",function(a){twttr.events.hub=a.init(n),a.init(n,!0)})}var l,m,n={widgets:{"a.twitter-share-button":f.Embeddable,"a.twitter-mention-button":f.Embeddable,"a.twitter-hashtag-button":f.Embeddable,"a.twitter-follow-button":d.Embeddable,"a.twitter-tweet-box":e.Embeddable,"blockquote.twitter-tweet":g.Embeddable,"a.twitter-timeline":h.Embeddable,body:i.Listener}},o=twttr.events&&twttr.events.hub?twttr.events:{},p;n.assetUrl=q,c.aug(twttr.events,o,j.Emitter),p=twttr.events.bind,twttr.events.bind=function(a,b){r(),this.bind=p,this.bind(a,b)};for(l=0;m=b[l];l++)twttr.events.bind(m[0],m[1]);for(l=0;m=twttr._e[l];l++)m(twttr);twttr.ready=function(a){a(twttr)},twttr.widgets=twttr.widgets||{},c.aug(twttr.widgets,{config:{assetUrl:q},load:function(a){k.init(n),k.embed(a),twttr.widgets.loaded=!0}}),/twitter\.com(\:\d+)?$/.test(document.location.host)&&(twttr.widgets.createTimelinePreview=function(a,b,c){(new h.Embeddable({previewParams:a,targetEl:b,linkColor:a.link_color,theme:a.theme,height:a.height})).render(n,c)}),twttr.widgets.load()})})})}()});