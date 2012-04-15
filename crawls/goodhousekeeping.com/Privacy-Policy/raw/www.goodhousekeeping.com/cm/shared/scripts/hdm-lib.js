/*global jQuery, $, Modernizr */
//Douglas Crockford's json2.js
var JSON;if(!JSON){JSON={};}
(function(){"use strict";function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
/* jQuery Tools v1.2.5 - The missing UI library for the Web */
//$.tools.overlay
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).bind("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).bind("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).unbind("click."+m).unbind("keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:f.css("top"),left:f.css("left"),width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return m.add(n)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.children(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(1,a)},prev:function(a){return f.move(-1,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children("."+e.clonedClass+":last").before(b),h.children("."+e.clonedClass+":first").replaceWith(b.clone().addClass(e.clonedClass))):h.append(b),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}}),f.seekTo(0,0,function(){})}var m=c(b,e.prev).click(function(){f.prev()}),n=c(b,e.next).click(function(){f.next()});!e.circular&&f.getSize()>1&&(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(m.toggleClass(e.disabledClass,b<=0),n.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||m.addClass(e.disabledClass)),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var o={};h[0].ontouchstart=function(a){var b=a.touches[0];o.x=b.clientX,o.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=o.x-b.clientX,d=o.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(e.keyboard&&!b.altKey&&!b.ctrlKey&&!a(b.target).is(":input")){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.autoscroll={conf:{autoplay:!0,interval:3e3,autopause:!0}},a.fn.autoscroll=function(c){typeof c=="number"&&(c={interval:c});var d=a.extend({},b.autoscroll.conf,c),e;this.each(function(){var b=a(this).data("scrollable");b&&(e=b);var c,f=!0;b.play=function(){c||(f=!1,c=setInterval(function(){b.next()},d.interval))},b.pause=function(){c=clearInterval(c)},b.stop=function(){b.pause(),f=!0},d.autopause&&b.getRoot().add(b.getNaviButtons()).hover(b.pause,b.play),d.autoplay&&b.play()});return d.api?e:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}a.fn.navigator=function(d){typeof d=="string"&&(d={navi:d}),d=a.extend({},b.navigator.conf,d);var e;this.each(function(){var b=a(this).data("scrollable"),f=d.navi.jquery?d.navi:c(b.getRoot(),d.navi),g=b.getNaviButtons(),h=d.activeClass,i=d.history&&a.fn.history;b&&(e=b),b.getNaviButtons=function(){return g.add(f)};function j(a,c,d){b.seekTo(c);if(i)location.hash&&(location.hash=a.attr("href").replace("#",""));else return d.preventDefault()}function k(){return f.find(d.naviItem||"> *")}function l(b){var c=a("<"+(d.naviItem||"a")+"/>").click(function(c){j(a(this),b,c)}).attr("href","#"+b);b===0&&c.addClass(h),d.indexed&&c.text(b+1),d.idPrefix&&c.attr("id",d.idPrefix+b);return c.appendTo(f)}k().length?k().each(function(b){a(this).click(function(c){j(a(this),b,c)})}):a.each(b.getItems(),function(a){l(a)}),b.onBeforeSeek(function(a,b){setTimeout(function(){if(!a.isDefaultPrevented()){var c=k().eq(b);!a.isDefaultPrevented()&&c.length&&k().removeClass(h).eq(b).addClass(h)}},1)});function m(a,b){var c=k().eq(b.replace("#",""));c.length||(c=k().filter("[href="+b+"]")),c.click()}b.onAddItem(function(a,c){c=l(b.getItems().index(c)),i&&c.history(m)}),i&&k().history(m)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){this.getPanes().slideUp(200),this.getPanes().eq(a).slideDown(400,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c;a.tools.tabs.addEffect("horizontal",function(b,d){c||(c=this.getPanes().eq(0).width()),this.getCurrentPane().animate({width:0},function(){a(this).hide()}),this.getPanes().eq(b).animate({width:c},function(){a(this).show(),d.call()})});function d(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){d.type="onClick",g.trigger(d,[c])}),j=c,h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var e=this.data("tabs");e&&(e.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){e=new d(a(this),b,c),a(this).data("tabs",e)});return c.api?e:this}})(jQuery);
(function(a){var b;b=a.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:!1,autopause:!0,interval:3e3,clickable:!0,api:!1}};function c(b,c){var d=this,e=b.add(this),f=b.data("tabs"),g,h=!0;function i(c){var d=a(c);return d.length<2?d:b.parent().find(c)}var j=i(c.next).click(function(){f.next()}),k=i(c.prev).click(function(){f.prev()});a.extend(d,{getTabs:function(){return f},getConf:function(){return c},play:function(){if(g)return d;var b=a.Event("onBeforePlay");e.trigger(b);if(b.isDefaultPrevented())return d;g=setInterval(f.next,c.interval),h=!1,e.trigger("onPlay");return d},pause:function(){if(!g)return d;var b=a.Event("onBeforePause");e.trigger(b);if(b.isDefaultPrevented())return d;g=clearInterval(g),e.trigger("onPause");return d},stop:function(){d.pause(),h=!0}}),a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(b,e){a.isFunction(c[e])&&a(d).bind(e,c[e]),d[e]=function(b){return a(d).bind(e,b)}}),c.autopause&&f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause,function(){h||d.play()}),c.autoplay&&d.play(),c.clickable&&f.getPanes().click(function(){f.next()});if(!f.getConf().rotate){var l=c.disabledClass;f.getIndex()||k.addClass(l),f.onBeforeClick(function(a,b){k.toggleClass(l,!b),j.toggleClass(l,b==f.getTabs().length-1)})}}a.fn.slideshow=function(d){var e=this.data("slideshow");if(e)return e;d=a.extend({},b.conf,d),this.each(function(){e=new c(a(this),d),a(this).data("slideshow",e)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).bind("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.bind("click.mask",function(b){a.mask.close(b)}),a(window).bind("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).unbind("keydown.mask"),e.unbind("click.mask"),a(window).unbind("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(a){var b,c,d,e;a.tools=a.tools||{version:"v1.2.5"},a.tools.history={init:function(g){e||(a.browser.msie&&a.browser.version<"8"?c||(c=a("<iframe/>").attr("src","javascript:false;").hide().get(0),a("body").append(c),setInterval(function(){var d=c.contentWindow.document,e=d.location.hash;b!==e&&a.event.trigger("hash",e)},100),f(location.hash||"#")):setInterval(function(){var c=location.hash;c!==b&&a.event.trigger("hash",c)},100),d=d?d.add(g):g,g.click(function(b){var d=a(this).attr("href");c&&f(d);if(d.slice(0,1)!="#"){location.href="#"+d;return b.preventDefault()}}),e=!0)}};function f(a){if(a){var b=c.contentWindow.document;b.open().close(),b.location.hash=a}}a(window).bind("hash",function(c,e){e?d.filter(function(){var b=a(this).attr("href");return b==e||b==e.replace("#","")}).trigger("history",[e]):d.eq(0).trigger("history",[e]),b=e}),a.fn.history=function(b){a.tools.history.init(this);return this.bind("history",b)}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,a)}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.bind(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).bind(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=b||a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.bind(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.bind(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=c||a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.5"};var b=/\[type=([a-z]+)\]/,c=/^-?[0-9]*(\.[0-9]+)?$/,d=a.tools.dateinput,e=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,f=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,g;g=a.tools.validator={conf:{grouped:!1,effect:"default",errorClass:"invalid",inputEvent:null,errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:!1,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(b,c){a.each(c,function(a,c){g.messages[a]=g.messages[a]||{},g.messages[a][b]=c})},localizeFn:function(b,c){g.messages[b]=g.messages[b]||{},a.extend(g.messages[b],c)},fn:function(c,d,e){a.isFunction(d)?e=d:(typeof d=="string"&&(d={en:d}),this.messages[c.key||c]=d);var f=b.exec(c);f&&(c=i(f[1])),j.push([c,e])},addEffect:function(a,b,c){k[a]=[b,c]}};function h(b,c,d){var e=b.offset().top,f=b.offset().left,g=d.position.split(/,?\s+/),h=g[0],i=g[1];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var j=c.outerHeight()+b.outerHeight();h=="center"&&(e+=j/2),h=="bottom"&&(e+=j);var k=b.outerWidth();i=="center"&&(f-=(k+c.outerWidth())/2),i=="left"&&(f-=k);return{top:e,left:f}}function i(a){function b(){return this.getAttribute("type")==a}b.key="[type="+a+"]";return b}var j=[],k={"default":[function(b){var c=this.getConf();a.each(b,function(b,d){var e=d.input;e.addClass(c.errorClass);var f=e.data("msg.el");f||(f=a(c.message).addClass(c.messageClass).appendTo(document.body),e.data("msg.el",f)),f.css({visibility:"hidden"}).find("p").remove(),a.each(d.messages,function(b,c){a("<p/>").html(c).appendTo(f)}),f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});var g=h(e,f,c);f.css({visibility:"visible",position:"absolute",top:g.top,left:g.left}).fadeIn(c.speed)})},function(b){var c=this.getConf();b.removeClass(c.errorClass).each(function(){var b=a(this).data("msg.el");b&&b.css({visibility:"hidden"})})}]};a.each("email,url,number".split(","),function(b,c){a.expr[":"][c]=function(a){return a.getAttribute("type")===c}}),a.fn.oninvalid=function(a){return this[a?"bind":"trigger"]("OI",a)},g.fn(":email","Please enter a valid email address",function(a,b){return!b||e.test(b)}),g.fn(":url","Please enter a valid URL",function(a,b){return!b||f.test(b)}),g.fn(":number","Please enter a numeric value.",function(a,b){return c.test(b)}),g.fn("[max]","Please enter a value smaller than $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("max");return parseFloat(b)<=parseFloat(c)?!0:[c]}),g.fn("[min]","Please enter a value larger than $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("min");return parseFloat(b)>=parseFloat(c)?!0:[c]}),g.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return b}),g.fn("[pattern]",function(a){var b=new RegExp("^"+a.attr("pattern")+"$");return b.test(a.val())});function l(b,c,e){var f=this,i=c.add(f);b=b.not(":button, :image, :reset, :submit");function l(b,c,d){if(e.grouped||!b.length){var f;if(d===!1||a.isArray(d)){f=g.messages[c.key||c]||g.messages["*"],f=f[e.lang]||g.messages["*"].en;var h=f.match(/\$\d/g);h&&a.isArray(d)&&a.each(h,function(a){f=f.replace(this,d[a])})}else f=d[e.lang]||d;b.push(f)}}a.extend(f,{getConf:function(){return e},getForm:function(){return c},getInputs:function(){return b},reflow:function(){b.each(function(){var b=a(this),c=b.data("msg.el");if(c){var d=h(b,c,e);c.css({top:d.top,left:d.left})}});return f},invalidate:function(c,d){if(!d){var g=[];a.each(c,function(a,c){var d=b.filter("[name='"+a+"']");d.length&&(d.trigger("OI",[c]),g.push({input:d,messages:[c]}))}),c=g,d=a.Event()}d.type="onFail",i.trigger(d,[c]),d.isDefaultPrevented()||k[e.effect][0].call(f,c,d);return f},reset:function(c){c=c||b,c.removeClass(e.errorClass).each(function(){var b=a(this).data("msg.el");b&&(b.remove(),a(this).data("msg.el",null))}).unbind(e.errorInputEvent||"");return f},destroy:function(){c.unbind(e.formEvent+".V").unbind("reset.V"),b.unbind(e.inputEvent+".V").unbind("change.V");return f.reset()},checkValidity:function(c,g){c=c||b,c=c.not(":disabled");if(!c.length)return!0;g=g||a.Event(),g.type="onBeforeValidate",i.trigger(g,[c]);if(g.isDefaultPrevented())return g.result;var h=[];c.not(":radio:not(:checked)").each(function(){var b=[],c=a(this).data("messages",b),k=d&&c.is(":date")?"onHide.v":e.errorInputEvent+".v";c.unbind(k),a.each(j,function(){var a=this,d=a[0];if(c.filter(d).length){var h=a[1].call(f,c,c.val());if(h!==!0){g.type="onBeforeFail",i.trigger(g,[c,d]);if(g.isDefaultPrevented())return!1;var j=c.attr(e.messageAttr);if(j){b=[j];return!1}l(b,d,h)}}}),b.length&&(h.push({input:c,messages:b}),c.trigger("OI",[b]),e.errorInputEvent&&c.bind(k,function(a){f.checkValidity(c,a)}));if(e.singleError&&h.length)return!1});var m=k[e.effect];if(!m)throw"Validator: cannot find effect \""+e.effect+"\"";if(h.length){f.invalidate(h,g);return!1}m[1].call(f,c,g),g.type="onSuccess",i.trigger(g,[c]),c.unbind(e.errorInputEvent+".v");return!0}}),a.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.formEvent&&c.bind(e.formEvent+".V",function(a){if(!f.checkValidity(null,a))return a.preventDefault()}),c.bind("reset.V",function(){f.reset()}),b[0]&&b[0].validity&&b.each(function(){this.oninvalid=function(){return!1}}),c[0]&&(c[0].checkValidity=f.checkValidity),e.inputEvent&&b.bind(e.inputEvent+".V",function(b){f.checkValidity(a(this),b)}),b.filter(":checkbox, select").filter("[required]").bind("change.V",function(b){var c=a(this);(this.checked||c.is("select")&&a(this).val())&&k[e.effect][1].call(f,c,b)});var m=b.filter(":radio").change(function(a){f.checkValidity(m,a)});a(window).resize(function(){f.reflow()})}a.fn.validator=function(b){var c=this.data("validator");c&&(c.destroy(),this.removeData("validator")),b=a.extend(!0,{},g.conf,b);if(this.is("form"))return this.each(function(){var d=a(this);c=new l(d.find(":input"),d,b),d.data("validator",c)});c=new l(this,this.eq(0).closest("form"),b);return this.data("validator",c)}})(jQuery);

/* customSelect by Adam Coulombe - http://www.adamcoulombe.info/lab/jquery/select-box/ */
(function($){$.fn.extend({customStyle:function(options){if(!$.browser.msie||($.browser.msie&&$.browser.version>6)){return this.each(function(){var currentSelected=$(this).find(':selected');$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({position:'absolute',opacity:0,fontSize:$(this).next().css('font-size')});var selectBoxSpan=$(this).next();var selectBoxWidth=parseInt($(this).width())-parseInt(selectBoxSpan.css('padding-left'))-parseInt(selectBoxSpan.css('padding-right'));var selectBoxSpanInner=selectBoxSpan.find(':first-child');selectBoxSpan.css({display:'inline-block'});selectBoxSpanInner.css({width:selectBoxWidth,display:'inline-block'});var selectBoxHeight=parseInt(selectBoxSpan.height())+parseInt(selectBoxSpan.css('padding-top'))+parseInt(selectBoxSpan.css('padding-bottom'));$(this).height(selectBoxHeight).change(function(){selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');});});}}});})(jQuery);

/************************************************
HDM Javascript Library
	See http://wiki.ops.hearstdigital.com/wiki/HDM_Javascript_Library
*************************************************/
var HDM = {};
/** HDM.vars - Holds various site variables we get during HDM.init and used later on **/
HDM.vars = {
	siteName: null, //site name.. might not need this
	facebookAppID: null, //fb app id.. need this to init FB API
	twitterAPI: null, //twitter API URL.. Site's cached twitter feed
	articleID: null, //article id.. might not need this
	adRefreshInterval: null, //ad refresh interval.. how many pageviews does it take to refresh the ads
	flipbookAdPosition: null, //ad position for the flipbook.. will be something like "ams_gh_flipbook"
	flipbookAdInterval: null, //flipbook ad interval.. how many slides before you see an ad
	pageAdsParams: null //pageAdsParams.. global js variable declared in page-ads.js.. has ad targeting info for when we need to get new ads
};
/** HDM.init - Takes a "Site" JSON object and initializes certain values **/
HDM.init = function(siteObj){
	$.extend(HDM.vars,siteObj); //extend our vars with the Site's
	var vars = HDM.vars;
	HDM.registration.init(vars.facebookAppID); //initialize registration with the FB App ID
	HDM.ads.init(vars.pageAdsParams,vars.adRefreshInterval); //initialize ads with the pageAdsParams and refresh interval
};
/*****************************
*	HDM.utils
*	- HDM.utils is a namespace for utility methods
*	
******************************/
HDM.utils = {
	key: {
		BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESCAPE: 27, SPACE: 32, PAGEUP: 33, 
		PAGEDOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INS: 45, DEL: 46
	},
	setCookie: function(name,value,days){
		var expDate = new Date(), cookieValue;
		expDate.setDate(expDate.getDate() + days);
		cookieValue = encodeURIComponent(value) + ( (days == null) ? '' : ';expires=' + expDate.toUTCString() );
		document.cookie = name + '=' + cookieValue;
	},
	getCookie: function(name){
		var nameEQ = name + "=",
			ca = document.cookie.split(';');	
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {c = c.substring(1,c.length);}
			if (c.indexOf(nameEQ) === 0) {
				var result = c.substring(nameEQ.length,c.length);
				return result;
			}
		}
		return null;
	},
	eraseCookie: function(name){
		if ( HDM.utils.getCookie(name) ){
			document.cookie = name + '=' + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	},
	getCookieDump: function(){
		var cookies = document.cookie.split(';'), cookieDump = {};
		for (var i = 0; i < cookies.length; i++){
			var thisCookie = cookies[i].split('=');
			cookieDump[thisCookie[0]] = thisCookie[1];
		}
		return cookieDump;
	},
	buildScriptTag: function(src,callback){
		var script = document.createElement('script'), $head = $('head');
		$head.find('script').filter(function(i){
			return $(this).attr('src') && $(this).attr('src').split('?')[0] == src.split('?')[0];
		}).remove();
		script.src = src;
		script.onload = function(){
			try{
				callback();
			} catch(e){}
		};
		script.onreadystatechange = function(){
			if (script.readyState === 'loaded' || script.readyState === 'complete'){
				try{
					callback();
				} catch(e){}
			}
		};
		$head.get(0).appendChild(script);
	},
	cacheBust: function(){
		return Math.floor(1 + Math.random() * 100000);
	},
	getParameter: function(key){
		var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0, len = params.length; i < len; i++){
			var param = params[i].split('=');
			if (param[0] === key){
				return param[1];
			}
		}
		return false;
	},
	setBreadcrumb: function(){
		if (Modernizr.localstorage){
			localStorage.nextURL = window.location.href;
		} else {
			HDM.utils.setCookie('nextURL',window.location.href);
		}
		return true;
	},
	getBreadcrumb: function(preserve){
		var nextURL = '';
		if (Modernizr.localstorage && !!localStorage.nextURL){
			nextURL = localStorage.nextURL;
			if (!preserve){ delete localStorage.nextURL; }
		} else {
			nextURL = HDM.utils.getCookie('nextURL') || '/';
		}
		return nextURL;
	},
	storeData: function(key,data){
		if (Modernizr.localstorage){
			localStorage[key] = (typeof data === 'object') ? JSON.stringify(data) : data;
		} else {
			HDM.utils.setCookie(key,encodeURIComponent(data));
		}
	},
	getData: function(key){
		if (Modernizr.localstorage){
			return localStorage[key];
		} else {
			return HDM.utils.getCookie(key);
		}
	},
	eraseData: function(key){
		if (Modernizr.localstorage){
			delete localStorage[key];
		} else {
			HDM.utils.eraseCookie(key);
		}
	}
};

/*****************************
HDM.widgets
	HDM Widgets is a namespace for small reusable widgets that can be used in any given application.
*****************************/
HDM.widgets = {};
/*****************************
HDM.widgets.TabPanel - Provides a tab/panel interface
I will be deprecating this. $.tools.tabs is included above. Much better plugin.
*****************************/
HDM.widgets.TabPanel = function(){
	var TabPanel = this;
	this.currentIndex = 0;
	this.tabs = [];
	this.working = false;
	//moves to the next tab
	this.nextTab = function(){
		if (TabPanel.currentIndex < TabPanel.tabs.length - 1){
			TabPanel.setActiveTab(TabPanel.currentIndex + 1);
			return true;
		} else {
			return false;
		}
	};
	//moves to the previous tab
	this.prevTab = function(){
		if (TabPanel.currentIndex > 0){
			TabPanel.setActiveTab(TabPanel.currentIndex - 1);
			return true;
		} else {
			return false;
		}
	};
	this.onTabChange = function(currentTab,newTab){
		$(currentTab.panel).fadeOut();
		$(newTab.panel).fadeIn();
	};
	//sets the active tab
	this.setActiveTab = function(newIndex){
		this.working = true;
		//switch aria-hidden on the panels
		var currentTab = TabPanel.tabs[TabPanel.currentIndex],
			newTab = TabPanel.tabs[newIndex];
		//set the currentIndex
		TabPanel.currentIndex = newIndex;
		newTab.panel.setAttribute('aria-hidden',false);
		currentTab.panel.setAttribute('aria-hidden',true);
		//switch tabindex on the tabs
		newTab.tab.tabIndex = 0;
		currentTab.tab.tabIndex = -1;
		//switch selected states on tab
		$(newTab.tab).addClass('selected');
		$(currentTab.tab).removeClass('selected');
		//switch selected states on the panel
		$(newTab.panel).addClass('selected');
		$(currentTab.panel).removeClass('selected');
		//focus the new tab
		//newTab.tab.focus();
		//look for a tabChange callback and get'er dun
		if (typeof TabPanel.onTabChange === 'function'){
			TabPanel.onTabChange(currentTab,newTab);
		}
		this.working = false;
	};
	//adds a new tab into the tab list
	this.addTab = function(tab,panel,initCallback){
		var t = { tab: tab, panel: panel };
		if (typeof initCallback === 'function'){ t.init = initCallback; }
		TabPanel.tabs[TabPanel.tabs.length] = t;
	};
	//returns true if the node passed in is a tab
	this.isTab = function(node){
		return (TabPanel.getTabIndex(node) > -1);
	};
	//returns the index of the tab passed in or -1 if the tab is not in the tab list
	this.getTabIndex = function(node){
		var index = -1;
		for (var i = 0, len = TabPanel.tabs.length; i < len; i++){
			if (TabPanel.tabs[i].tab === node){ index = i; }
		}
		return index;
	};
	//click handler
	this.handleClick = function(tabClicked){
		if (TabPanel.working){ return false; }
		var tabIndex;
		if (TabPanel.isTab(tabClicked)){
			tabIndex = TabPanel.getTabIndex(tabClicked);
			if (tabIndex !== TabPanel.currentIndex){ TabPanel.setActiveTab(tabIndex); }
			return false;
		}
		return true;
	};
	this.init = function(container){
		//make sure we have tabs
		TabPanel.container = container;
		if (TabPanel.tabs.length < 1){
			try {
				console.error('No tabs have been added to the tabPanel widget.');
			} catch(e){ }
			return;
		}
		
		$(TabPanel.tabs).each(function(){
			$(this.tab).click(function(){
				TabPanel.handleClick(this);
				return false;
			});
		});
	};
	return this;
};
/****************************
HDM.widgets.Pager
	
****************************/
HDM.widgets.Pager = function(container){
	var Pager = this;
	this.currentIndex = 0; //track the current page's index
	this.pages = []; //array of pages in the widget
	this.container = container; //container for the widget.. when focused RIGHT will go to next page, LEFT will go back
	this.onPageChange = function(currentPage,nextPage){}; //onPageChange event.. called when page changes
	//moves to the next page if possible, if not, return false
	this.nextPage = function(){
		if (Pager.currentIndex < Pager.pages.length - 1){
			Pager.setActivePage(Pager.currentIndex + 1);
			return true;
		} else {
			return false;
		}
	};
	//moves to the last page if possible, if not, return false
	this.prevPage = function(){
		if (Pager.currentIndex > 0){
			Pager.setActivePage(Pager.currentIndex - 1);
			return true;
		} else {
			return false;
		}
	};
	this.setActivePage = function(newIndex){
		var curPage = Pager.pages[Pager.currentIndex],
			nextPage = Pager.pages[newIndex];
			
		$(curPage).removeClass('selected');
		$(nextPage).addClass('selected');
		
		Pager.currentIndex = newIndex;
		
		if (typeof Pager.onPageChange === 'function'){
			Pager.onPageChange(curPage,nextPage);
		}
	};
	this.addPage = function(page){
		var pages = Pager.pages;
		pages[pages.length] = page;
	};
	this.getPageIndex = function(page){
		var pages = Pager.pages, index = -1;
		for (var i = 0, len = pages.length; i < len; i++){
			if (pages[i] === page) index = i;
		}
		return index;
	};
	return this;
};
/****************************
HDM.video
	Namespace for video players
	Contains classes for Brightcove and MSN interfaces
****************************/
HDM.video = {
	BrightcovePlayer: function(bcExperienceName,params){},
	MSNPlayer: function(params){}
};
HDM.ads = {
	viewCount: 1, //this is the first view, so set to 1
	//fake ad tags taken from live GHK.. for testing
	fakeAdJSON: {
		"ams_gh_top":"<!-- Begin 728x90 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=728x90,1000x124;tile=1;pos=1;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 728x90 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof lb728t == 'object'){lb728t[0] = 1;lb728t[1]++} else {var lb728t = new Array(2);lb728t[0]=1;lb728t[1]=0};</script>",
		"ams_gh_gallery":"<!-- Begin 336x280 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=336x280;tile=2;pos=4;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 336x280 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof gal336t == 'object'){gal336t[0] = 1;gal336t[1]++} else {var gal336t = new Array(2);gal336t[0]=1;gal336t[1]=0};</script>"
	},
	//array of regular expressions that will match our ads.. i could have made one big one, but this is more readable (and easier to add to)
	refreshablePositions: [
		/^ams_\w+_top$/i, //banner ad
		/^ams_\w+_tower$/i, //tower ad
		/^ams_\w+_skyscraper$/i, //tower ad
		/^ams_\w+_bottom$/i, //bottom banner
		/^ams_\w+_gallery$/i, //gallery ad
		/^ams_\w+_gallery_bottom$/i, //bottom gallery ad
		/^ams_\w+_wild$/i, //wild card ad
		/^ams_\w+_social_ad$/i //social ad
	],
	positionList: '', //String - will store the position list string for page-ads.js
	pageAdsParams: {}, //Object - will store the pageAdsParams object for page-ads.js
	//intializer.. sets up the pageAdsParams object for page-ads calls.. sets the refresh and flipbook ad intervals
	init: function(pageAdsParams,refreshInterval,flipbookAdInterval){
		var self = HDM.ads,
			positionList, //this will hold our position list after filtering it through the white list
			$allPositions = $('[id^=ams_]'); //this collection will contain all ams elements on the page
		self.pageAdsParams = pageAdsParams || {};
		self.pageAdsParams.position_list = self.getPositionList($allPositions);
		self.refreshInterval = refreshInterval || 4;
		self.flipbookAdInterval = flipbookAdInterval || 5;
		window.refreshAds = self.refreshAds; //set the global refreshAds function for legacy applications
	},
	//returns a list of positions to refresh as a string: 'ams_gh_top,ams_gh_gallery'
	getPositionList: function($positions){
		//$positions will be a jQuery collection of all ad nodes on the page
		var self = HDM.ads,
			positionList = ''; //start off with an empty string
		//loop through the ads
		$positions.each(function(){
			//loop through the list of refreshable positions
			for (var i = 0, len = self.refreshablePositions.length; i < len; i++){
				//if our ad node's id matches the refreshable position, add it to the list
				if ( this.id.match(self.refreshablePositions[i]) ){
					positionList += this.id + ',';
				}
			}
		});
		return positionList.substring(0,positionList.length - 1); //return the list and get rid of the trailing comma
	},
	refreshAds: function(forceRefresh){
		var self = HDM.ads,
			//check to see if the dapMgr object exists and we're on delish.. if so we're gonna call a different function
			isMSN = (typeof dapMgr === 'object') && window.location.hostname.match('delish.com');
		if (isMSN){ return self.refreshMSNAds(); } //if it's MSN, call the msn refresh ads function and exit
		if (forceRefresh === true || self.viewCount >= self.refreshInterval){ //if we're forcing a refresh or we've reached the refresh interval..
			self.getAds(function(adjson){ //get the new ads
				self.renderAdJSON(adjson); //render the ads that come back
				self.trackingCalls(); //execute the tracking calls
			});
			self.viewCount = 1; //reset the view count
			return true;
		}
		self.trackingCalls();
		self.viewCount++; //if we didn't force a refresh or hit the refresh interval, increment the view count
		return false;
	},
	//this function will make all of our tracking calls
	trackingCalls: function(){
		try { pageviewTracking(); } catch(e) {}
		try { _vrtrack(); } catch(e) {}
	},
	refreshMSNAds: function(){
		//call the MSN tracking functions
        try { wlAnalytics.TrackPage(); }
		catch (e) {
			try {
				$.track.trackInfo.userStatic.requestId = null;
				$.track.trackPage();
			} catch(e){}
		}
		//find the msn ads
		$('[id^=ams_del]').each(function(){
			var adIndex = dapMgr.getAdItemIndex(this.firstChild.id); //get the index of the ad in dapMgr
			if (adIndex >= 0){ dapMgr.displayAd(adIndex); } //if we have a valid ad index, refresh it
		});
		return true;
	},
	//renderAds takes a position name and a target jQuery object
	//it makes a call to page-ads for the positionName and renders the ad inside the target
	renderAd: function(positionName,$target){
		var self = HDM.ads;
		//if a target wasn't passed, look for an element with the same id as the position name
		if (typeof target === 'undefined'){
			target = $(document.getElementById(positionName));
		}
		self.getAds(function(adjson){ //get the ad, passing in the position name
			self.renderAdJSON(adjson,$target); //render the ad
		},positionName);
	},
	//all this really does it take a string and wrap it in jQuery then append it to the container
	//need to look for the document.write doubleclick stuff and handle that appropriately
	renderAdJSON: function(adjson,$target){
		$.each(adjson,function(i,val){
			//if there's a target passed, that's out container.. otherwise get the element with the id of our ad object
			var $container = (typeof $target === 'undefined') ? $(document.getElementById(i)) : $target,
				$adHTML, //this will hold out ad html
				randomColor, //random color we'll give to preview ad backgrounds for lols
				isAdDebug = val.match('FOR PREVIEW ONLY - Ad Ops Debug'), //look for preview ads for testing the refresh
				isDoubleClick = val.match('ad.doubleclick.net/adj/'); //matches doubleclick javascript ads.. we need to turn them into iframe ads
			if ( isDoubleClick ){ //if it's a doubleclick ad.. handle it
				val = HDM.ads.handleDoubleclickAd(val); //swap the document.write for an iframe
			}
			$adHTML = $(val); //wrap the string in jquery and poof we have an ad
			if ( isAdDebug ){ //if it's a preview ad..
				randomColor = 'rgb(' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ')'; //get a random rgb color
				$adHTML.filter('div').css({'background-color':randomColor}); //set the divs background-color to our random color
			}
			$container.html($adHTML); //insert the ad html into the container
		});
	},
	handleDoubleclickAd: function(adCode){
		//finds the document.write line in the doubleclick ad
		var doubleclickReg = /document\.write\(\'<script[\s\w="]+src="([\w\s\:\/\.;=,'\+-?]+)"[\s\w="\/]+><\\\/script>'\);/,
			sizeCodeReg = /\d{2,4}x\d{2,4}/g, //looking for size codes like 336x280, 1024x90, etc..
			varReplaceReg = /'\s\+\s\w*\s\+\s'/g, //find variables we need to replace (' + ord + ')
			varNameReg = /\w+/, //matches the variable name in the string being replaced abovedoubleclickURL,
			doubleclickURL, //will hold our doubleclick iframe url
			variablesToReplace, //array for the variables we need to replace
			tempVar, //temp var to hold the variable names
			sizeArray, //array for the ad size codes
			tempSize, //temp var to hold the sizes
			styleString = ""; //style string for the iframe	
			
		doubleclickURL = doubleclickReg.exec(adCode)[1]; //the url for our doubleclick ad tag
		doubleclickURL = doubleclickURL.replace('/adj/','/adi/'); //swap adj (js document.write implementaion) for adi (iframe implementation)
		adCode = adCode.replace(doubleclickReg,''); //strip out the document.write line
		variablesToReplace = doubleclickURL.match(varReplaceReg); //get an array of the variables we need to replace
		//loop through the variables
		for (var j = 0; j < variablesToReplace.length; j++){
			tempVar = variablesToReplace[j].match(varNameReg)[0]; //get the variable name
			tempVar = window[tempVar] || ''; //look to window for a value.. or give it an empty string
			doubleclickURL = doubleclickURL.replace(variablesToReplace[j],tempVar); //replace the variables with values
		}
		sizeArray = doubleclickURL.match(sizeCodeReg); //get the size code array
		//if there's only 1 size code, just set the style string to that size
		tempSize = sizeArray[0].split('x'); //get [width,height]
		styleString = "width:" + tempSize[0] + "px;height:" + tempSize[1] + "px;border:none;";
		//add our iframe tag into the ad string
		adCode += '<iframe src="' + doubleclickURL + '" width="' + tempSize[0] + '" height="' + tempSize[1] + '" style="' + styleString + '" frameborder="0" scrolling="no"></iframe>';
		return adCode; //return it
	},
	getAds: function(callback,positionName){
		var self = HDM.ads,
			pageAdsParams = $.extend({},self.pageAdsParams); //get a temporary pageAds Params object
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//if we passed in a position, overwrite the temp position list
		if (typeof positionName === 'string'){
			pageAdsParams.position_list = positionName;
		}
		//get the ads
		$.ajax({
			url: '/ams/page-ads.js',
			data: pageAdsParams,
			dataType: 'json',
			success: function(json){
				callback(json); //fire the callback
				//callback(self.fakeAdJSON); //this is the callback with the test ads
			}
		});
	}
};

/** HDM.registration **/
HDM.registration = {
	mag_user: null, //where mag_user is going to live
	facebook: null, //where our facebook status and info will live
	getMagUserURL: function(){
		//if we're in high availability mode (does this still exist?..), then append ha=1
		return ( HDM.utils.getParameter('ha') ? false : '/registration/get_mag_user.js' );
	},
	getMagUser: function(callback,forceUpdate){
		var self = HDM.registration,
			tempMagUser, magUserURL;
			
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//if this browser supports localStorage AND we're not forcing an update..
		if ( Modernizr.localstorage && !forceUpdate ){
			tempMagUser = ( localStorage.mag_user ) ? JSON.parse(localStorage.mag_user) : { logged_in: false }; //set the temp mag_user to the stored mag_user, or a logged_out version of it
			self.updateMagUser(tempMagUser); //update mag_user with the stored mag_user
			callback(tempMagUser); //execute the callback
			return; //get out
		}
		magUserURL = self.getMagUserURL(); //check for ha and get the mag_user URL
		if ( !magUserURL ){
			tempMagUser = { logged_in: false };
			self.updateMagUser(tempMagUser);
			callback(tempMagUser);
		}
		//if there wasn't one, or we have to force an update..
		if (!tempMagUser || forceUpdate === true){
			//get the mag user script
			if ( forceUpdate ){ //if we're forcing an update, we need to add a cachebust.. mostly for the browser
				magUserURL += ( magUserURL.indexOf('?') > -1 ) ? '&cachebust=' : '?cachebust='; //if we've already added a parameter (ha), use '&'.. otherwise just use '?'
				magUserURL += HDM.utils.cacheBust(); //teh random
			}
			HDM.utils.buildScriptTag(magUserURL,function(){
				self.updateMagUser(window.mag_user); //get_mag_user script sets a global mag_user object.. lame, but w/e
				callback(tempMagUser); //execute the callback
			});
		} else {
			self.updateMagUser(tempMagUser); //set the global mag_user object too for legacy stuff
			callback(tempMagUser); //execute the callback
		}
	},
	updateMagUser: function(newMagUser){
		//if this browser supports localStorage, update the mag_user there
		if ( Modernizr.localstorage ){
			localStorage.mag_user = JSON.stringify(newMagUser);
		}
		HDM.registration.mag_user = window.mag_user = newMagUser; //set the mag_users, setting global for legacy apps :(
	},
	checkEmailExists: function(emailToCheck, callback){
		//check to see if the email exists in the db and return true or false to a callback function
		$.ajax({
			url: '/registration/email_exist',
			data: { email: emailToCheck },
			success: function(response){
				var exists = (response !== 'Does not exist');
				callback(exists);
			}
		});
	},
	isHDMLoggedIn: function(){
		return !!HDM.registration.mag_user.logged_in; //check hdm logged in
	},
	isFacebookLoggedIn: function(){ //check facebook logged in
		return HDM.registration.facebook.status !== 'unknown'; //if logged in, will be 'notConnected' or 'connected'
	},
	isFacebookConnected: function(){ //check if facebook account is connected with our app
		return HDM.registration.facebook.status === 'connected'; //if not connected, will be 'unknown' or 'connected'
	},
	isFacebookLinked: function(){ //check if we've linked our HDM and facebook accounts
		return !!HDM.registration.mag_user.facebook_id; //if unlinked, facebook_id will not exist
	},
	createLinkedAccount: function(email,callback){ //creates a linked account given the email address associated with the user's facebook account
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//hit FbLink with the email address.. we should get a valid mag_user back
		$.ajax({
			url: '/registration/FbLink',
			data: { email: email },
			dataType: 'json',
			success: function(data){
				HDM.registration.updateMagUser(data); //update the mag_users
				HDM.utils.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
				callback(data); //execute the callback with mag_user
			}
		});
	},
	linkFB: function(callback){
		//links fb accounts
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//don't need to pass params.. it reads acocunt info from the session cookies
		$.ajax({
			url: '/registration/FbLink',
			dataType: 'json',
			success: function(data){ //we should get back a valid mag_user with facebook_id set
				HDM.registration.updateMagUser(data); //update the mag_users
				HDM.utils.storeData('hdm_wasFBLinked',true); //store the "wasLinked" value for future checks
				callback(data); //execute the callback
			}
		});
	},
	//unlinks a facebook and hdm account
	unlinkFB: function(callback){
		var self = HDM.registration;
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//hit FbLink with delete=1.. will read account info from the session cookie
		$.ajax({
			url: '/registration/FbLink',
			data: { 'delete': 1 },
			dataType: 'json',
			success: function(){
				//this doesn't return a mag_user, so we have to delete facebook_id on our own
				var magUser = self.mag_user; //get a pointer to mag_user
				delete magUser.facebook_id; //delete the facebook_id
				HDM.utils.eraseData('hdm_wasFBLinked'); //erase the "wasLinked" value so future checks know we're not linked anymore
				self.updateMagUser(magUser); //update mag_user with the new object minus the facebook_id
				callback(); //execute the callback.. don't really need to pass mag_user back for anything
			}
		});
	},
	//logs the user out of HDM ***AND*** Facebook
	logout: function(){
		var self = HDM.registration,
			//get our current location, so we can redirect the user from logout
			nextURL = ( window.location.href.match('/registration/') ) ? '/' : window.location.href;
		//if this browser supports localStorage and we have a mag_user stored..
		if ( Modernizr.localstorage && localStorage.mag_user ){
			delete localStorage.mag_user; //delete it
		}
		//if facebook is logged in AND connected..
		if ( self.isFacebookLoggedIn() && self.isFacebookConnected() ){
			FB.Event.unsubscribe('auth.statusChange');
			FB.Event.subscribe('auth.statusChange',function(){
				//run logout, once the FB status has changed.. will change when we execute FB.logout below
				window.location.href = '/registration/logout?next_url=' + nextURL;
			});
			FB.logout(); //logout.. when done, the auth.statusChange event above will fire, logging us out of HDM
		} else {
			//if the facebook account isn't logged in AND connected, just logout of HDM
			window.location.href = '/registration/logout?next_url=' + nextURL;
		}
	},
	updateLoginLinks: function(){
		var self = HDM.registration,
			$linkContainer, $newRegLink, $editProfileLink, $signoutLink, $signinLink,
			$fbLink, fbLinkText, fbLoggedIn, fbConnected, hdmLoggedIn,
			mag_user = self.mag_user,
			fbStatus = self.facebook;
			
		$linkContainer = $('#hdmLoginLinks');
		$linkContainer.fadeOut().empty(); //fade the link container out
		//define our various states of logged in-ness
		fbLoggedIn = self.isFacebookLoggedIn();
		fbConnected = self.isFacebookConnected();
		hdmLoggedIn = self.isHDMLoggedIn();
		//fb link needs to say different stuff based on logged in ness
		fbLinkText = (hdmLoggedIn) ? 'Connect with Facebook' : 'Sign In with Facebook';
		$fbLink = $('<li><a class="fbLink trackSender" href="#">' + fbLinkText + '</a></li>');
		$fbLink.click(function(){
			FB.login(null,{scope:'email'});
			return false;
		});
		if ( hdmLoggedIn ){
			//logged in.. we'll need a signout link
			$signoutLink = $('<li><a href="#">Sign out</a></li>'); //the sign out link
			$signoutLink.click(function(){ //when you click signout, execute HDM.logout
				self.logout();
				return false;
			});
			//now lets figure out fb
			if ( fbConnected ){
				//fb is connected.. make the fb connected link
				if ( self.facebook.info != null ){
					$fbLink = $('<li><img src="https://graph.facebook.com/' + self.facebook.info.id + '/picture" width="15" height="15" /> Hi <a class="trackSender" href="/registration/editProfile.html">' + self.facebook.info.first_name + '</a></li>');
				} else {
					$fbLink = $('<li>Hi <a class="trackSender" href="/registration/editProfile.html">' + mag_user.first_name + '</a></li>'); //new fb link with profile link
				}
			} else {
				//if no fb, leave the fb link as-is
				$editProfileLink = $('<li>Hi <a class="trackSender" href="/registration/editProfile.html">' + mag_user.first_name + '</a></li>'); //append the hdm edit profile link
				$linkContainer.append($editProfileLink); //append the edit profile link
			}
			$linkContainer.append($fbLink); //append the facebook link
			$linkContainer.append($signoutLink); //append the signout link
		} else {
			//not logged into hdm.. not much else matters
			$newRegLink = $('<li><a class="trackSender" href="/registration/">JOIN FREE</a></li>'); //new reg link
			$signinLink = $('<li><a class="trackSender" href="/login/">Sign In</a></li>'); //sign in link
			$linkContainer.append($newRegLink); //append the join free
			$linkContainer.append($fbLink); //append the facebook link
			$linkContainer.append($signinLink); //append the sign in link
		}
		$linkContainer.fadeIn(); //fade the container back in
	},
	//updates HDM.registration.facebook with our status
	updateFBStatus: function(fbResponse){
		var self = HDM.registration;
		self.facebook = fbResponse; //set facebook to the response
		//if the user logged out, but we still have their info saved.. delete it
		if (fbResponse.status === 'unknown' && Modernizr.localstorage && !!localStorage.hdmFBInfo){
			delete localStorage.hdmFBInfo;
		}
		//if facebook is logged in, but not connected and we still see it as linked, they've probably removed the app at FB.. so unlink
		if ( self.isFacebookLoggedIn() && !self.isFacebookConnected() && self.isFacebookLinked() ){
			self.unlinkFB();
		}
	},
	getFacebookInfo: function(callback){
		var self = HDM.registration;
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//get the facebook user object and execute a callback when it's done
		FB.api('/me',function(response){
			self.facebook.info = response;
			callback();
		});
	},
	//linkFlow is for HDM logged in users linking their accounts
	linkFlow: function(){
		var self = HDM.registration, $linked = $('#accountsLinked'), modalAPI,
			$modalAnchor = $('<div id="modalAnchor" />').appendTo('body').hide();
			
		self.linkFB(function(){
			$modalAnchor.overlay({
				target: '#accountsLinked',
				load: true,
				closeOnClick: false
			});
			modalAPI = $modalAnchor.data('overlay');
			$linked.click(function(){
				modalAPI.close();
			});
			self.getFacebookInfo(function(){
				self.updateLoginLinks();
			});
		});
	},
	//connectFlow will be the flow for non HDM users
	connectFlow: function(){
		var self = HDM.registration,
			proceedWithLink = HDM.utils.getData('hdm_linkProcess'),
			wasLinked = HDM.utils.getData('hdm_wasFBLinked'),
			$exists, $thanks, $accountsLinked,
			modalAPI, $modalAnchor = $('<div id="hdmModalAnchor" />').appendTo('body').hide();
		
		if ( self.isFacebookLoggedIn() && self.isFacebookConnected() ){
			//if facebook is logged in and connected
			self.getFacebookInfo(function(){
				//once we have the info
				var info = self.facebook.info; //set a local pointer to it
				self.checkEmailExists(info.email,function(exists){ //check to see if the email exists in the HDM database
					if (exists){
						//if it exists, pop the existing account modal
						if ( proceedWithLink ){
							$accountsLinked = $('#accountsLinked');
							self.linkFB(function(){
								$modalAnchor.overlay({
									target: '#accountsLinked',
									load: true
								});
								modalAPI = $modalAnchor.data('overlay');
								$accountsLinked.find('a.continue').click(function(){
									modalAPI.close();
								});
								self.updateLoginLinks();
								HDM.utils.eraseData('hdm_linkProcess');
							});
							return;
						}
						$exists = $('#connectEmailExists');
						$exists.find('.hdmFacebookPic').html('<img src="https://graph.facebook.com/' + info.id + '/picture" width="50" height="50" />');
						$exists.find('.welcome').text('Welcome, ' + info.first_name);
						$exists.find('input[name=user_name]').val(info.email);
						$exists.find('form').submit(function(){
							var $error = $(this).find('.loginError');
							if ( ! $(this).find('[name=user_name]').val() || !$(this).find('[name=password]').val() ){
								$error.text('Please fill out your username and password');
								return false;
							} else {
								HDM.utils.storeData('hdm_linkProcess',true);
								return true;
							}
						});
						$modalAnchor.overlay({
							target: '#connectEmailExists',
							load: true,
							closeOnEsc: false,
							closeOnClick: false
						});
						modalAPI = $modalAnchor.data('overlay');
						$exists.find('.cancelLink').click(function(){
							modalAPI.close();
						});
					} else {
						//if the email doesn't exist in the db, lets create an HDM account
						self.createLinkedAccount(info.email,function(){
							self.updateLoginLinks();
							$thanks = $('#thanksForJoining');
							$modalAnchor.overlay({
								target: '#thanksForJoining',
								load: true,
								closeOnClick: false
							});
							modalAPI = $modalAnchor.data('overlay');
							$thanks.find('a.continue').click(function(){
								modalAPI.close();
							});
						});
					}
				});
			});
		}
	},
	init: function(fbAppID){
		var self = HDM.registration,
			forceMagUserUpdate = false; //we're going to check if any state variables are stored that need us to update mag_user
		
		//event for tracking nextURL
		$('a.trackSender').click(function(){
			return HDM.utils.setBreadcrumb();
		});
		//event to return to nextURL
		$('a.returnToSender').click(function(){
			var sender = HDM.utils.getBreadcrumb();
			if (!!sender){
				window.location.href = sender;
			}
			return false;
		});
		//learn more reg tooltips
		$('.learnMore.hdmTooltip').tooltip({
			tipClass: 'regTooltipContent',
			effect: 'fade',
			events: { def: 'mouseenter,mouseleave' },
			position: ['bottom','center'],
			offset: [10,0],
			delay: 100
		});
		//render 100 years back and set the users year if found
		//this should only run on pages with the dob_year select box on them
		$('select[name=dob_year]').each(function(){
			var currentYear = (new Date()).getFullYear(),
				startYear = currentYear - 100,
				$select = $(this), selectedYear = $select.data('selectedyear'),
				$option = $('<option />'), $optionClone;
				
			for (var i = currentYear; i >= startYear; i--){
				$optionClone = $option.clone();
				$optionClone.val(i);
				$optionClone.text(i);
				if (!!selectedYear && selectedYear == i){
					$optionClone.attr('selected','selected');
				}
				$select.append($optionClone);
			}
		});
		//set the user's month if found
		$('select[name=dob_month]').each(function(){
			var $select = $(this), selectedMonth = $select.data('selectedmonth'),
				$options = $select.find('option'), $selectedOption;
			if (!!selectedMonth){
				$selectedOption = $options.filter('[value='+ selectedMonth + ']');
				$select.get(0).selectedIndex = $options.index($selectedOption);
			}
		});
		//set the user's dob day if found
		$('select[name=dob_day]').each(function(){
			var $select = $(this), selectedDay = $select.data('selectedday'),
				$options = $select.find('option'), $selectedOption;
			if (!!selectedDay){
				$selectedOption = $options.filter('[value=' + selectedDay + ']');
				$select.get(0).selectedIndex = $options.index($selectedOption);
			}
		});
		//we need to do some basic validation on the login and reg forms and set the cookie so we get an updated mag_user on next load
		$('#hdmLoginForm, #hdmEditProfileForm, #hdmRegistrationForm, #hdmConnectLogin, #quizLogin').submit(function(){
			var $this     = $(this)
				, $required = $this.find('[required]')
				, $error    = $this.find('.formError')
				, valid     = true;
			//validation
			switch ( this.id ){
				case 'hdmLoginForm':
					$required.each(function(i, val){
						if ( !val.value ){
							valid = false;
							$(val).addClass('error');
						} else {
							$(val).removeClass('error');
						}
					});
					if ( !valid ){
						$error.text('Please fill in all required fields.');
						$error.fadeIn( 200 );
					} else {
						$error.fadeOut( 200 );
					}
				default:
					break;
			}
			if ( valid ){ HDM.utils.storeData('hdm_forceMagUserUpdate',true); }
			return valid;
		});
		
		if ( !Modernizr.localstorage || !!HDM.utils.getData('hdm_linkProcess') || !!HDM.utils.getData('hdm_forceMagUserUpdate') ){
			forceMagUserUpdate = true;
		}
		
		//First, lets make sure we have mag_user
		self.getMagUser(function(){
			if ( !!HDM.utils.getData('hdm_forceMagUserUpdate') ){
				HDM.utils.eraseData('hdm_forceMagUserUpdate');
			}
			HDM.utils.buildScriptTag('//connect.facebook.net/en_US/all.js',function(){
				//init the facebook api..
				FB.init({
					appId: fbAppID, //pass in the Site object's app id
					status: true, //we want status
					cookie: true, //we want fb to set cookies
					xfbml: true, //we want to parse xfbml
					channelUrl : document.location.protocol+"//"+document.location.host+"/cm/shared/channel.html" //this helps with issues in IE where we're getting hits from ?xd_fragment= or whatever it is
				});
				//get the login status
				FB.getLoginStatus(function(response){
					self.updateFBStatus(response); //update the facebook status
					if ( self.isFacebookConnected() ){ //check to see if the facebook account is connected to this site's app
						if ( self.isHDMLoggedIn() ){ //check to see if the HDM account is logged in
							//if HDM is logged in, check to see if we're halfway through the link process
							if ( !!HDM.utils.getData('hdm_linkProcess') ){
								//if we have the cookie from the linking process, get back into the connect flow
								self.connectFlow();
							} else {
								//if we're not in the link process.. get fb info and update login links
								self.getFacebookInfo(function(){
									self.updateLoginLinks();
								});
							}
						} else {
							//if we weren't linked already.. start the link process
							if ( !HDM.utils.getData('hdm_wasFBLinked') ){
								//this should only run on test cases.. since this cookie should be set during the link process
								self.linkFlow();
								return;
							}
							//if HDM account is logged out, but FB Account is logged in, force mag_user to update which should log you into HDM
							self.getFacebookInfo(function(){
								self.getMagUser(function(){
									//once it's updated get the info and update the links
									self.updateLoginLinks();
								},true);
							});
						}
					} else {
						//if fb account isn't connected, just update the links
						self.updateLoginLinks();
						//subscribe to the status change event
						FB.Event.subscribe('auth.statusChange',function(response){
							self.updateFBStatus(response); //update the status object
							//if we're not connected, update the login links and get out
							if ( !self.isFacebookConnected() ){
								self.updateLoginLinks();
								return;
							}
							if ( self.isHDMLoggedIn() ){
								self.linkFlow(); //if i'm already logged in link the accounts with the link flow
							} else {
								//if i'm not logged in, get mag_user again to see if we're logged in now
								self.getMagUser(function(){
									//if i'm still not logged in, start the connect flow
									if ( !self.isHDMLoggedIn() ){
										self.connectFlow();
									} else {
										//if i'm logged in now, get the facebook info and update the links
										self.getFacebookInfo(function(){
											self.updateLoginLinks();
										});
									}
								},true);
							}
						});
					}
				},true);
				//set up the link/unlink button on the profile form
				$('fieldset#facebookConnect').each(function linkUnlink(){
					var $this = $(this), $status = $('#editProfileFBStatus'),
						$button = $this.find('.linkButton'),
						statusText = '', buttonText = '';
					//set the appropriate button based on whether we're linked or not
					if ( self.isFacebookLinked() ){
						$status.addClass('linked').text('linked');
						$button.text('unlink');
					} else {
						$status.addClass('unlinked').text('unlinked');
						$button.text('link');
					}
					$button.click(function(){
						//when the button is clicked, check for existing link
						if ( self.isFacebookLinked() ){
							//if we're linked, unlink and switch the button
							self.unlinkFB(function(){
								$status.removeClass('linked').addClass('unlinked').text('unlinked');
								$button.text('link');
							});
						} else {
							//if we're not linked, link and switch the button
							self.linkFB(function(){
								$status.removeClass('unlinked').addClass('linked').text('linked');
								$button.text('unlink');
							});
						}
						return false;
					});
				});
			});
		},forceMagUserUpdate);
	}
};
/*****************************
slideModule - jQuery Plugin
	Creates a module that expands and collapses when you click the header
	Options:
		headerSelector - selector for the clickable header of the module
		bodySelector - selector for the portion of the module that will collapse and expand
		slideSpeed - speed of the slide effect
		onOpening - Callback that runs when the module begins to open
		onOpened - Callback that runs when the module has finished opening
		onClosing - Callback that runs when the module begins to close
		onClosed - Callback that runs when the module has finished closing
*****************************/
(function($){
	$.fn.slideModule = function(options){
		//define our default settings..
		var _settings = {
			headerSelector: '.moduleHeader',
			bodySelector: '.moduleBody',
			slideSpeed: 'fast',
			onOpening: function(){},
			onOpened: function(){},
			onClosing: function(){},
			onClosed: function(){}
		};
		//overwrite default settings with any options that were passed in
		if (options){ $.extend(_settings,options); }
		//return this to maintain chainability
		return this.each(function(){
			var $this = $(this),
				$header = $this.find(_settings.headerSelector),
				$body = $this.find(_settings.bodySelector),
				speed = _settings.slideSpeed;
			
			$header.click(function(){
				if ($this.hasClass('open')){
					_settings.onClosing();
					$this.removeClass('open');
					$this.addClass('closed');
					$body.slideUp(speed,function(){
						_settings.onClosed();
					});
				} else if ($this.hasClass('closed')){
					_settings.onOpening();
					$this.removeClass('closed');
					$this.addClass('open');
					$body.slideDown(speed,function(){
						_settings.onOpened();
					});
				}
			});
		});
	};
}(jQuery));
(function($){
	$.fn.brightcovePlayer = function(bcExperienceName,params){
		if (!window.brightcove){
			try {
				console.error('Brightcove API not found.');
			}catch(e){}
			return false;
		}
		var _params = {
			playerKey: null,
			playerID: null,
			width: 400,
			height: 300,
			isVid: true,
			isUI: true,
			dynamicStreaming: true,
			videoPlayer: null
		}, $target, $player, $param;
		bcExperienceName = bcExperienceName || 'myExperience';
		if (params){ $.extend(_params,params); }
		if (!params.videoPlayer){
			try {
				console.error('No video provided'); 
			} catch(e){}
		}
		$target = this;
		$player = $('<object></object>');
		$player.attr('id',bcExperienceName);
		$player.addClass('BrightcoveExperience');
		
		for (var i in _params){
			if (_params.hasOwnProperty(i) && _params[i] != null){
				$param = $('<param />');
				if ( i == 'videoPlayer' ) {
					$param.attr('name','@videoPlayer');
				} else {
					$param.attr('name',i);
				}
				$param.attr('value',_params[i]);
				$player.append($param);
			}
		}
		$target.append($player);
		brightcove.createExperiences(null,bcExperienceName);
		return this;
	};
}(jQuery));
(function($){
	$.fn.msnPlayer = function(options){
		if (!MSN.video.createWidget){
			try {
				console.error('MSN player API not found.');
			} catch(e){}
			return false;
		}
		var _config = {
			playerID: 'myPlayer',
			width: 400,
			height: 300,
			playerType: 'PlayerAd'
		};
		if (options){ $.extend(_config,options); }
		return this.each(function(){
			
		});
	};
}(jQuery));
(function($){
	$.fn.fbLikeButton = function fbLikeButton(options){
		var _options = {
			href: window.location.href.split('?')[0] + '?src=soc_fcbk',
			width: 90,
			height: 21,
			layout: 'button_count',
			show_faces: 'false',
			overwrite: true
		}, fbmlAttributes = ['href','width','height','layout','show_faces'];
		$.extend(_options,options);
		if ( !window.FB || !window.FB.XFBML ){ return false; }
		return this.each(function(){
			var $container = $(this),
				$likeButton = $('<fb:like></fb:like>');
			for (var i = 0; i < fbmlAttributes.length; i++){
				if ( !!_options[fbmlAttributes[i]] ){
					$likeButton.attr(fbmlAttributes[i],_options[fbmlAttributes[i]]);
				}
			}
			if ( !!_options.overwrite ){
				$container.html($likeButton);
			} else {
				$container.append($likeButton);
			}
			FB.XFBML.parse($container.get(0));
		});
	}
}(jQuery));
//Scroll To Element on a page
(function($){
	$.fn.scrollToElement = function scrollToElement(options){
		var _options = {
			speed: 200 //400ms to scroll
		};
		$.extend(_options,options);
		return this.each(function(){
			var $element = $(this);
			$('html,body').animate({
				scrollTop: $element.offset().top
			},_options.speed);
		});
	};
}(jQuery));
/****************************
HDM.promoPlayer
	Namespace for promo players
****************************/
HDM.promoPlayer = function (id,interval,speed) {
	//initialize vars than can be created without the needing the DOM ready
	var playerContainerId = id;
	var slideInterval = interval || 5000;
	var transitionSpeed = speed;
	var current = 0;
	var slidePosition = 0;
	var slideIntervalId = null;

	//player properties
	var playerContainer;
	var slideContainer;
	var slides;
	var total;
	var width;

	var slideTo = function(slide){
		if (!slideContainer.is(':animated')) {
			nav.pagination.children("li").eq(current).removeClass("current");
			if (slide == 'next') {
				current = (current < total - 1) ? current + 1 : 0;
				slidePosition -= width;
			} else if (slide == 'prev') {
				current = (current > 0) ? current - 1 : total - 1;
				slidePosition += width;
			} else {
				slide = parseInt(slide);
				current = slide;
				slidePosition = -(width * (current + 1));
			}
			nav.pagination.children("li").eq(current).addClass("current");
			$(slideContainer).animate({
				left: slidePosition
				},transitionSpeed,function() {
				slidePosition = -(width * (current + 1));
				nav.touch.position.init();
				slideContainer.css("left",slidePosition);
			});
			// restart animation interval
			startSlideshow();
		}
	};
	var stopSlideshow = function(){
		clearInterval(slideIntervalId);
		slides.stop(true,false);
	};
	var startSlideshow = function(){
		clearInterval(slideIntervalId);
		slideIntervalId = setInterval(function(){slideTo('next');},slideInterval);
	};
	var appendClickTracker = function(url) {
		if (url) {
			if (url.indexOf("doubleclick.net") > -1) {
				// Does not append click tracker when one already exists
				var newURL = url;
			} else {
				url = url.replace(" ", "");
				var newURL;
				var argIndex = url.indexOf("?");
				var anchorIndex = url.indexOf("#");
				
				if (argIndex >= 0) {
					newURL = url.replace("?","?click=pp&");
				} else if (anchorIndex >= 0) {
					newURL = url.replace("#","?click=pp#");
				} else {
					newURL = url + "?click=pp";
				}
			}
			return newURL;
		} else {
			return false;
		}
	};
	var nav = {
		navLayer: null,
		prev: null,
		next: null,
		pagination: null,
		generate: function() {
			//initialize the navigation elements
			this.navLayer = playerContainer.children(".navLayer");
			this.prev = this.navLayer.children("a.prev");
			this.next = this.navLayer.children("a.next");
			this.pagination = this.navLayer.children("ul.pagination");

			//create pagination loop based on number of slides
			for (var i = 0; i < total; i++) {
				var page = $(document.createElement("li"));
				var popupText = slides.eq(i).attr("title");
				
				page.html("&bull;");
				page.attr("page",i);
				this.pagination.append(page);				
				
				if (popupText) {
					var popupWidth, pageWidth;
					var popup = $(document.createElement("div"));
					var slideTitle = $(document.createElement("div"));
					var arrowDown = $(document.createElement("div"));
					
					//apply rollover title classes
					popup.addClass("popup");
					slideTitle.addClass("popupTitle");
					arrowDown.addClass("arrowDown");
					slideTitle.html(popupText);
				
					//add popup elements to the pagination item
					popup.append(slideTitle);
					popup.append(arrowDown);
					page.append(popup);					
					
					//calculate popup width and positioning
					popup.css("white-space","nowrap"); //fix to ensure that text doesn't break onto newlines for calculation slide title width
					pageWidth = page.width();					
					popupWidth = slideTitle.outerWidth() + 1;					
					popup.css("left","-"+((popupWidth-pageWidth)/2)+"px");
					popup.width(popupWidth);
					
					arrowDown.css("left",((popupWidth - arrowDown.outerWidth())/2)+"px");
				}
			}
			
			this.pagination.children("li").eq(current).addClass("current");
			this.navLayer.css("visibility","visible");
		},
		touch : {
			position : {
				mouseDown : false,
				startx : null,
				previousx : null,
				currentx : null,
				offsetx : null,
				delta : function(){
					return (this.currentx-this.startx+this.offsetx);
				},
				init : function(){
					this.mouseDown = false;
					this.startx = -(width * (current + 1));
					this.currentx = -(width * (current + 1));
					this.previousx = -(width * (current + 1));
					this.offsetx = -(width * (current + 1));
				}
			},
			start : function(x){
				this.position.init();
				//slideContainer.css('webkit-transition-duration',0);
				//slideContainer.css('moz-transition-duration',0);
				this.position.startx = x;
				this.position.currentx = x;
				this.position.previousx = x;
				this.position.mouseDown = true;
				this.disabletouch();
				stopSlideshow();
			},
			move : function(x){
				this.position.previousx = this.position.currentx;
				this.position.currentx = x;
				if (Math.abs(this.position.startx - this.position.currentx) > 25) {
					slideContainer.css('left',this.position.delta());
					//slideContainer.css('-webkit-transform','translate('+this.position.delta()+'px,0)');
				}
			},
			end : function(){
				var distancedelta = this.position.currentx-this.position.previousx;
				this.position.offsetx = (10*(distancedelta))+this.position.delta();
				this.enabletouch();
				//slidePosition -= this.position.delta();
				if (Math.abs(this.position.startx - this.position.currentx) > 25) {
					if (this.position.startx - this.position.currentx > 0) {
						slideTo('next');
					} else {
						slideTo('prev');
					}
				}
				else {
					slideTo(current);
				}
				this.position.init();
				startSlideshow();

			},
			preventBehavior : function(e) {
				e.preventDefault();
			},
			disabletouch : function(){
				// Enable fixed positioning
				document.addEventListener("touchmove", this.preventBehavior, false);
			},
			enabletouch : function(){
				// Disable fixed positioning
				document.removeEventListener("touchmove", this.preventBehavior, false);
			}
		}
	};
	this.init = function(){
		playerContainer = $('#'+playerContainerId);
		slideContainer = playerContainer.children(".slides");
		slides = slideContainer.children('.slide');
		total = slides.length;
		width = playerContainer.width();
		slides.eq(current).show();

		if (slides.length > 1) {
			nav.generate();
			var firstClone = slideContainer.children(".slide:first-child").clone();
			var lastClone = slideContainer.children(".slide:last-child").clone();
			slideContainer.prepend(lastClone);
			slideContainer.append(firstClone);
			slideContainer.css("left",-width);
			slidePosition = -width;
			startSlideshow();
			//touch navigation event handlers
			$(slides).each(function(){
				$(this).bind('touchstart',function(e){
					var pageX = null;
					if (e.originalEvent.touches) {
						pageX = e.originalEvent.touches[0].pageX;
					} else {
						pageX = e.pageX;
					}
					nav.touch.start(pageX)
				});
				$(this).bind('touchmove', function(e) {
					var pageX = null;
					if (e.originalEvent.touches) {
						pageX = e.originalEvent.touches[0].pageX;
					} else {
						pageX = e.pageX;
					}
					if (nav.touch.position.mouseDown) {
						nav.touch.move(pageX);
					}
				});
				$(this).bind('touchend', function(e) {
					nav.touch.end()
				});
			});
			//click navigation event handlers
			$(nav.prev).click(function(){
				slideTo('prev');
				nav.touch.position.init();
			});
			$(nav.next).click(function(){
				slideTo('next');
				nav.touch.position.init();
			});
			$(nav.pagination.children("li")).click(function(){
				if ($(this).attr("page") !== current) {
					slideTo($(this).attr("page"));
					nav.touch.position.init();
				}
			});
			// clear all animations when window regains focus.  this resolves animation issue caused by reduced interval firing for background tabs in Chrome.
			$(window).focus(function(){
				stopSlideshow();
				startSlideshow();
			});
		}
		//click handler for slide URLs
		$(slides).click(function(){
			var url = appendClickTracker($(this).attr("href"));
			var target = $(this).attr("target");
			
			if (url) {
				if (target=="Yes") {
					window.open(url);
				} else {
					window.location.href = url;
				}
			}
		});
		var links = $(slideContainer).find("a");
		links.each(function(){
			var url = $(this).attr("href");
			var newURL = appendClickTracker(url);
			
			if (newURL) {
				$(this).attr("href",newURL);
			}
		});
	};
	var self = this;
	$(document).ready(function(){
		self.init();
	});
};