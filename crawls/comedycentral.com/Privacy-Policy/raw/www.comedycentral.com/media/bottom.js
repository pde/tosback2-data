/* jquery.tools-1.2.7.min.js */
/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * dateinput/dateinput.js
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * rangeinput/rangeinput.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * toolbox/toolbox.expose.js
 * toolbox/toolbox.flashembed.js
 * toolbox/toolbox.history.js
 * toolbox/toolbox.mousewheel.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 * validator/validator.js
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
 * MUST use JQuery 1.7.2
 */
(function(a,b){a.tools=a.tools||{version:"v1.2.7"};var c=[],d={},e,f=[75,76,38,39,74,72,40,37],g={};e=a.tools.dateinput={conf:{format:"mm/dd/yy",formatter:"default",selectors:!1,yearRange:[-5,5],lang:"en",offset:[0,0],speed:0,firstDay:0,min:b,max:b,trigger:0,toggle:0,editable:0,css:{prefix:"cal",input:"date",root:0,head:0,title:0,prev:0,next:0,month:0,year:0,days:0,body:0,weeks:0,today:0,current:0,week:0,off:0,sunday:0,focus:0,disabled:0,trigger:0}},addFormatter:function(a,b){d[a]=b},localize:function(b,c){a.each(c,function(a,b){c[a]=b.split(",")}),g[b]=c}},e.localize("en",{months:"January,February,March,April,May,June,July,August,September,October,November,December",shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",shortDays:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"});function h(a,b){return(new Date(a,b+1,0)).getDate()}function i(a,b){a=""+a,b=b||2;while(a.length<b)a="0"+a;return a}var j=a("<a/>");function k(a,b,c,e){var f=b.getDate(),h=b.getDay(),k=b.getMonth(),l=b.getFullYear(),m={d:f,dd:i(f),ddd:g[e].shortDays[h],dddd:g[e].days[h],m:k+1,mm:i(k+1),mmm:g[e].shortMonths[k],mmmm:g[e].months[k],yy:String(l).slice(2),yyyy:l},n=d[a](c,b,m,e);return j.html(n).html()}e.addFormatter("default",function(a,b,c,d){return a.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,function(a){return a in c?c[a]:a})}),e.addFormatter("prefixed",function(a,b,c,d){return a.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g,function(a,b){return b in c?c[b]:a})});function l(a){return parseInt(a,10)}function m(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()==b.getMonth()&&a.getDate()==b.getDate()}function n(a){if(a!==b){if(a.constructor==Date)return a;if(typeof a=="string"){var c=a.split("-");if(c.length==3)return new Date(l(c[0]),l(c[1])-1,l(c[2]));if(!/^-?\d+$/.test(a))return;a=l(a)}var d=new Date;d.setDate(d.getDate()+a);return d}}function o(d,e){var i=this,j=new Date,o=j.getFullYear(),p=e.css,q=g[e.lang],r=a("#"+p.root),s=r.find("#"+p.title),t,u,v,w,x,y,z=d.attr("data-value")||e.value||d.val(),A=d.attr("min")||e.min,B=d.attr("max")||e.max,C,D;A===0&&(A="0"),z=n(z)||j,A=n(A||new Date(o+e.yearRange[0],1,1)),B=n(B||new Date(o+e.yearRange[1]+1,1,-1));if(!q)throw"Dateinput: invalid language: "+e.lang;if(d.attr("type")=="date"){var D=d.clone(),E=D.wrap("<div/>").parent().html(),F=a(E.replace(/type/i,"type=text data-orig-type"));e.value&&F.val(e.value),d.replaceWith(F),d=F}d.addClass(p.input);var G=d.add(i);if(!r.length){r=a("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({position:"absolute"}).attr("id",p.root),r.children().eq(0).attr("id",p.head).end().eq(1).attr("id",p.body).children().eq(0).attr("id",p.days).end().eq(1).attr("id",p.weeks).end().end().end().find("a").eq(0).attr("id",p.prev).end().eq(1).attr("id",p.next),s=r.find("#"+p.head).find("div").attr("id",p.title);if(e.selectors){var H=a("<select/>").attr("id",p.month),I=a("<select/>").attr("id",p.year);s.html(H.add(I))}var J=r.find("#"+p.days);for(var K=0;K<7;K++)J.append(a("<span/>").text(q.shortDays[(K+e.firstDay)%7]));a("body").append(r)}e.trigger&&(t=a("<a/>").attr("href","#").addClass(p.trigger).click(function(a){e.toggle?i.toggle():i.show();return a.preventDefault()}).insertAfter(d));var L=r.find("#"+p.weeks);I=r.find("#"+p.year),H=r.find("#"+p.month);function M(b,c,e){z=b,w=b.getFullYear(),x=b.getMonth(),y=b.getDate(),e||(e=a.Event("api")),e.type=="click"&&!a.browser.msie&&d.focus(),e.type="beforeChange",G.trigger(e,[b]);e.isDefaultPrevented()||(d.val(k(c.formatter,b,c.format,c.lang)),e.type="change",G.trigger(e),d.data("date",b),i.hide(e))}function N(b){b.type="onShow",G.trigger(b),a(document).on("keydown.d",function(b){if(b.ctrlKey)return!0;var c=b.keyCode;if(c==8||c==46){d.val("");return i.hide(b)}if(c==27||c==9)return i.hide(b);if(a(f).index(c)>=0){if(!C){i.show(b);return b.preventDefault()}var e=a("#"+p.weeks+" a"),g=a("."+p.focus),h=e.index(g);g.removeClass(p.focus);if(c==74||c==40)h+=7;else if(c==75||c==38)h-=7;else if(c==76||c==39)h+=1;else if(c==72||c==37)h-=1;h>41?(i.addMonth(),g=a("#"+p.weeks+" a:eq("+(h-42)+")")):h<0?(i.addMonth(-1),g=a("#"+p.weeks+" a:eq("+(h+42)+")")):g=e.eq(h),g.addClass(p.focus);return b.preventDefault()}if(c==34)return i.addMonth();if(c==33)return i.addMonth(-1);if(c==36)return i.today();c==13&&(a(b.target).is("select")||a("."+p.focus).click());return a([16,17,18,9]).index(c)>=0}),a(document).on("click.d",function(b){var c=b.target;!a(c).parents("#"+p.root).length&&c!=d[0]&&(!t||c!=t[0])&&i.hide(b)})}a.extend(i,{show:function(b){if(!(d.attr("readonly")||d.attr("disabled")||C)){b=b||a.Event(),b.type="onBeforeShow",G.trigger(b);if(b.isDefaultPrevented())return;a.each(c,function(){this.hide()}),C=!0,H.off("change").change(function(){i.setValue(l(I.val()),l(a(this).val()))}),I.off("change").change(function(){i.setValue(l(a(this).val()),l(H.val()))}),u=r.find("#"+p.prev).off("click").click(function(a){u.hasClass(p.disabled)||i.addMonth(-1);return!1}),v=r.find("#"+p.next).off("click").click(function(a){v.hasClass(p.disabled)||i.addMonth();return!1}),i.setValue(z);var f=d.offset();/iPad/i.test(navigator.userAgent)&&(f.top-=a(window).scrollTop()),r.css({top:f.top+d.outerHeight({margins:!0})+e.offset[0],left:f.left+e.offset[1]}),e.speed?r.show(e.speed,function(){N(b)}):(r.show(),N(b));return i}},setValue:function(c,d,f){var g=l(d)>=-1?new Date(l(c),l(d),l(f==b||isNaN(f)?1:f)):c||z;g<A?g=A:g>B&&(g=B),typeof c=="string"&&(g=n(c)),c=g.getFullYear(),d=g.getMonth(),f=g.getDate(),d==-1?(d=11,c--):d==12&&(d=0,c++);if(!C){M(g,e);return i}x=d,w=c,y=f;var k=new Date(c,d,1-e.firstDay),o=k.getDay(),r=h(c,d),t=h(c,d-1),D;if(e.selectors){H.empty(),a.each(q.months,function(b,d){A<new Date(c,b+1,1)&&B>new Date(c,b,0)&&H.append(a("<option/>").html(d).attr("value",b))}),I.empty();var E=j.getFullYear();for(var F=E+e.yearRange[0];F<E+e.yearRange[1];F++)A<new Date(F+1,0,1)&&B>new Date(F,0,0)&&I.append(a("<option/>").text(F));H.val(d),I.val(c)}else s.html(q.months[d]+" "+c);L.empty(),u.add(v).removeClass(p.disabled);for(var G=o?0:-7,J,K;G<(o?42:35);G++)J=a("<a/>"),G%7===0&&(D=a("<div/>").addClass(p.week),L.append(D)),G<o?(J.addClass(p.off),K=t-o+G+1,g=new Date(c,d-1,K)):G<o+r?(K=G-o+1,g=new Date(c,d,K),m(z,g)?J.attr("id",p.current).addClass(p.focus):m(j,g)&&J.attr("id",p.today)):(J.addClass(p.off),K=G-r-o+1,g=new Date(c,d+1,K)),A&&g<A&&J.add(u).addClass(p.disabled),B&&g>B&&J.add(v).addClass(p.disabled),J.attr("href","#"+K).text(K).data("date",g),D.append(J);L.find("a").click(function(b){var c=a(this);c.hasClass(p.disabled)||(a("#"+p.current).removeAttr("id"),c.attr("id",p.current),M(c.data("date"),e,b));return!1}),p.sunday&&L.find("."+p.week).each(function(){var b=e.firstDay?7-e.firstDay:0;a(this).children().slice(b,b+1).addClass(p.sunday)});return i},setMin:function(a,b){A=n(a),b&&z<A&&i.setValue(A);return i},setMax:function(a,b){B=n(a),b&&z>B&&i.setValue(B);return i},today:function(){return i.setValue(j)},addDay:function(a){return this.setValue(w,x,y+(a||1))},addMonth:function(a){var b=x+(a||1),c=h(w,b),d=y<=c?y:c;return this.setValue(w,b,d)},addYear:function(a){return this.setValue(w+(a||1),x,y)},destroy:function(){d.add(document).off("click.d keydown.d"),r.add(t).remove(),d.removeData("dateinput").removeClass(p.input),D&&d.replaceWith(D)},hide:function(b){if(C){b=a.Event(),b.type="onHide",G.trigger(b);if(b.isDefaultPrevented())return;a(document).off("click.d keydown.d"),r.hide(),C=!1}return i},toggle:function(){return i.isOpen()?i.hide():i.show()},getConf:function(){return e},getInput:function(){return d},getCalendar:function(){return r},getValue:function(a){return a?k(e.formatter,z,a,e.lang):z},isOpen:function(){return C}}),a.each(["onBeforeShow","onShow","change","onHide"],function(b,c){a.isFunction(e[c])&&a(i).on(c,e[c]),i[c]=function(b){b&&a(i).on(c,b);return i}}),e.editable||d.on("focus.d click.d",i.show).keydown(function(b){var c=b.keyCode;if(C||a(f).index(c)<0)(c==8||c==46)&&d.val("");else{i.show(b);return b.preventDefault()}return b.shiftKey||b.ctrlKey||b.altKey||c==9?!0:b.preventDefault()}),n(d.val())&&M(z,e)}a.expr[":"].date=function(b){var c=b.getAttribute("type");return c&&c=="date"||a(b).data("dateinput")},a.fn.dateinput=function(b){if(this.data("dateinput"))return this;b=a.extend(!0,{},e.conf,b),a.each(b.css,function(a,c){!c&&a!="prefix"&&(b.css[a]=(b.css.prefix||"")+(c||a))});var d;this.each(function(){var e=new o(a(this),b);c.push(e);var f=e.getInput().data("dateinput",e);d=d?d.add(f):f});return d?d:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).on("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).on("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).off("click."+m+" keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:b.top,left:b.left,width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"};var b;b=a.tools.rangeinput={conf:{min:0,max:100,step:"any",steps:0,value:0,precision:undefined,vertical:0,keyboard:!0,progress:!1,speed:100,css:{input:"range",slider:"slider",progress:"progress",handle:"handle"}}};var c,d;a.fn.drag=function(b){document.ondragstart=function(){return!1},b=a.extend({x:!0,y:!0,drag:!0},b),c=c||a(document).on("mousedown mouseup",function(e){var f=a(e.target);if(e.type=="mousedown"&&f.data("drag")){var g=f.position(),h=e.pageX-g.left,i=e.pageY-g.top,j=!0;c.on("mousemove.drag",function(a){var c=a.pageX-h,e=a.pageY-i,g={};b.x&&(g.left=c),b.y&&(g.top=e),j&&(f.trigger("dragStart"),j=!1),b.drag&&f.css(g),f.trigger("drag",[e,c]),d=f}),e.preventDefault()}else try{d&&d.trigger("dragEnd")}finally{c.off("mousemove.drag"),d=null}});return this.data("drag",!0)};function e(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}function f(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function g(a){var b=a.data("events");return b&&b.onSlide}function h(b,c){var d=this,h=c.css,i=a("<div><div/><a href='#'/></div>").data("rangeinput",d),j,k,l,m,n;b.before(i);var o=i.addClass(h.slider).find("a").addClass(h.handle),p=i.find("div").addClass(h.progress);a.each("min,max,step,value".split(","),function(a,d){var e=b.attr(d);parseFloat(e)&&(c[d]=parseFloat(e,10))});var q=c.max-c.min,r=c.step=="any"?0:c.step,s=c.precision;s===undefined&&(s=r.toString().split("."),s=s.length===2?s[1].length:0);if(b.attr("type")=="range"){var t=b.clone().wrap("<div/>").parent().html(),u=a(t.replace(/type/i,"type=text data-orig-type"));u.val(c.value),b.replaceWith(u),b=u}b.addClass(h.input);var v=a(d).add(b),w=!0;function x(a,f,g,h){g===undefined?g=f/m*q:h&&(g-=c.min),r&&(g=Math.round(g/r)*r);if(f===undefined||r)f=g*m/q;if(isNaN(g))return d;f=Math.max(0,Math.min(f,m)),g=f/m*q;if(h||!j)g+=c.min;j&&(h?f=m-f:g=c.max-g),g=e(g,s);var i=a.type=="click";if(w&&k!==undefined&&!i){a.type="onSlide",v.trigger(a,[g,f]);if(a.isDefaultPrevented())return d}var l=i?c.speed:0,t=i?function(){a.type="change",v.trigger(a,[g])}:null;j?(o.animate({top:f},l,t),c.progress&&p.animate({height:m-f+o.height()/2},l)):(o.animate({left:f},l,t),c.progress&&p.animate({width:f+o.width()/2},l)),k=g,n=f,b.val(g);return d}a.extend(d,{getValue:function(){return k},setValue:function(b,c){y();return x(c||a.Event("api"),undefined,b,!0)},getConf:function(){return c},getProgress:function(){return p},getHandle:function(){return o},getInput:function(){return b},step:function(b,e){e=e||a.Event();var f=c.step=="any"?1:c.step;d.setValue(k+f*(b||1),e)},stepUp:function(a){return d.step(a||1)},stepDown:function(a){return d.step(-a||-1)}}),a.each("onSlide,change".split(","),function(b,e){a.isFunction(c[e])&&a(d).on(e,c[e]),d[e]=function(b){b&&a(d).on(e,b);return d}}),o.drag({drag:!1}).on("dragStart",function(){y(),w=g(a(d))||g(b)}).on("drag",function(a,c,d){if(b.is(":disabled"))return!1;x(a,j?c:d)}).on("dragEnd",function(a){a.isDefaultPrevented()||(a.type="change",v.trigger(a,[k]))}).click(function(a){return a.preventDefault()}),i.click(function(a){if(b.is(":disabled")||a.target==o[0])return a.preventDefault();y();var c=j?o.height()/2:o.width()/2;x(a,j?m-l-c+a.pageY:a.pageX-l-c)}),c.keyboard&&b.keydown(function(c){if(!b.attr("readonly")){var e=c.keyCode,f=a([75,76,38,33,39]).index(e)!=-1,g=a([74,72,40,34,37]).index(e)!=-1;if((f||g)&&!(c.shiftKey||c.altKey||c.ctrlKey)){f?d.step(e==33?10:1,c):g&&d.step(e==34?-10:-1,c);return c.preventDefault()}}}),b.blur(function(b){var c=a(this).val();c!==k&&d.setValue(c,b)}),a.extend(b[0],{stepUp:d.stepUp,stepDown:d.stepDown});function y(){j=c.vertical||f(i,"height")>f(i,"width"),j?(m=f(i,"height")-f(o,"height"),l=i.offset().top+m):(m=f(i,"width")-f(o,"width"),l=i.offset().left)}function z(){y(),d.setValue(c.value!==undefined?c.value:c.min)}z(),m||a(window).load(z)}a.expr[":"].range=function(b){var c=b.getAttribute("type");return c&&c=="range"||a(b).filter("input").data("rangeinput")},a.fn.rangeinput=function(c){if(this.data("rangeinput"))return this;c=a.extend(!0,{},b.conf,c);var d;this.each(function(){var b=new h(a(this),a.extend(!0,{},c)),e=b.getInput().data("rangeinput",b);d=d?d.add(e):e});return d?d:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),e.size>1&&(e.circular=!1),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return n.add(o)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.find(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(e.size,a)},prev:function(a){return f.move(-e.size,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children().last().before(b),h.children().first().replaceWith(b.clone().addClass(e.clonedClass))):(h.append(b),o.removeClass("disabled")),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}});var m=b.parents().add(b).filter(function(){if(a(this).css("display")==="none")return!0});m.length?(m.show(),f.seekTo(0,0,function(){}),m.hide()):f.seekTo(0,0,function(){})}var n=c(b,e.prev).click(function(a){a.stopPropagation(),f.prev()}),o=c(b,e.next).click(function(a){a.stopPropagation(),f.next()});e.circular||(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(n.toggleClass(e.disabledClass,b<=0),o.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||n.addClass(e.disabledClass)),f.getSize()<2&&n.add(o).addClass(e.disabledClass),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var p={};h[0].ontouchstart=function(a){var b=a.touches[0];p.x=b.clientX,p.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=p.x-b.clientX,d=p.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).on("keydown.scrollable",function(b){if(!(!e.keyboard||b.altKey||b.ctrlKey||b.metaKey||a(b.target).is(":input"))){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.autoscroll={conf:{autoplay:!0,interval:3e3,autopause:!0}},a.fn.autoscroll=function(c){typeof c=="number"&&(c={interval:c});var d=a.extend({},b.autoscroll.conf,c),e;this.each(function(){var b=a(this).data("scrollable"),c=b.getRoot(),f,g=!1;function h(){f&&clearTimeout(f),f=setTimeout(function(){b.next()},d.interval)}b&&(e=b),b.play=function(){f||(g=!1,c.on("onSeek",h),h())},b.pause=function(){f=clearTimeout(f),c.off("onSeek",h)},b.resume=function(){g||b.play()},b.stop=function(){g=!0,b.pause()},d.autopause&&c.add(b.getNaviButtons()).hover(b.pause,b.resume),d.autoplay&&b.play()});return d.api?e:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}a.fn.navigator=function(d){typeof d=="string"&&(d={navi:d}),d=a.extend({},b.navigator.conf,d);var e;this.each(function(){var b=a(this).data("scrollable"),f=d.navi.jquery?d.navi:c(b.getRoot(),d.navi),g=b.getNaviButtons(),h=d.activeClass,i=d.history&&history.pushState,j=b.getConf().size;b&&(e=b),b.getNaviButtons=function(){return g.add(f)},i&&(history.pushState({i:0},""),a(window).on("popstate",function(a){var c=a.originalEvent.state;c&&b.seekTo(c.i)}));function k(a,c,d){b.seekTo(c),d.preventDefault(),i&&history.pushState({i:c},"")}function l(){return f.find(d.naviItem||"> *")}function m(b){var c=a("<"+(d.naviItem||"a")+"/>").click(function(c){k(a(this),b,c)});b===0&&c.addClass(h),d.indexed&&c.text(b+1),d.idPrefix&&c.attr("id",d.idPrefix+b);return c.appendTo(f)}l().length?l().each(function(b){a(this).click(function(c){k(a(this),b,c)})}):a.each(b.getItems(),function(a){a%j==0&&m(a)}),b.onBeforeSeek(function(a,b){setTimeout(function(){if(!a.isDefaultPrevented()){var c=b/j,d=l().eq(c);d.length&&l().removeClass(h).eq(c).addClass(h)}},1)}),b.onAddItem(function(a,c){var d=b.getItems().index(c);d%j==0&&m(d)})});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialEffect:!1,initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){var c=this.getConf();this.getPanes().slideUp(c.slideUpSpeed),this.getPanes().eq(a).slideDown(c.slideDownSpeed,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c,d;a.tools.tabs.addEffect("horizontal",function(b,e){if(!c){var f=this.getPanes().eq(b),g=this.getCurrentPane();d||(d=this.getPanes().eq(0).width()),c=!0,f.show(),g.animate({width:0},{step:function(a){f.css("width",d-a)},complete:function(){a(this).hide(),e.call(),c=!1}}),g.length||(e.call(),c=!1)}});function e(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(d,i){var k=h.eq(d),l=!c.data("tabs");typeof d=="string"&&d.replace("#","")&&(k=h.filter("[href*=\""+d.replace("#","")+"\"]"),d=Math.max(h.index(k),0));if(e.rotate){var m=h.length-1;if(d<0)return f.click(m,i);if(d>m)return f.click(0,i)}if(!k.length){if(j>=0)return f;d=e.initialIndex,k=h.eq(d)}if(d===j)return f;i=i||a.Event(),i.type="onBeforeClick",g.trigger(i,[d]);if(!i.isDefaultPrevented()){var n=l?e.initialEffect&&e.effect||"default":e.effect;b[n].call(f,d,function(){j=d,i.type="onClick",g.trigger(i,[d])}),h.removeClass(e.current),k.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.off(e.event).removeClass(e.current),i.find("a[href^=\"#\"]").off("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).on(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=\"#\"]").on("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href=\""+location.hash+"\"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var d=this.data("tabs");d&&(d.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){d=new e(a(this),b,c),a(this).data("tabs",d)});return c.api?d:this}})(jQuery);
(function(a){var b;b=a.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:!1,autopause:!0,interval:3e3,clickable:!0,api:!1}};function c(b,c){var d=this,e=b.add(this),f=b.data("tabs"),g,h=!0;function i(c){var d=a(c);return d.length<2?d:b.parent().find(c)}var j=i(c.next).click(function(){f.next()}),k=i(c.prev).click(function(){f.prev()});function l(){g=setTimeout(function(){f.next()},c.interval)}a.extend(d,{getTabs:function(){return f},getConf:function(){return c},play:function(){if(g)return d;var b=a.Event("onBeforePlay");e.trigger(b);if(b.isDefaultPrevented())return d;h=!1,e.trigger("onPlay"),e.on("onClick",l),l();return d},pause:function(){if(!g)return d;var b=a.Event("onBeforePause");e.trigger(b);if(b.isDefaultPrevented())return d;g=clearTimeout(g),e.trigger("onPause"),e.off("onClick",l);return d},resume:function(){h||d.play()},stop:function(){d.pause(),h=!0}}),a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(b,e){a.isFunction(c[e])&&a(d).on(e,c[e]),d[e]=function(b){return a(d).on(e,b)}}),c.autopause&&f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause,d.resume),c.autoplay&&d.play(),c.clickable&&f.getPanes().click(function(){f.next()});if(!f.getConf().rotate){var m=c.disabledClass;f.getIndex()||k.addClass(m),f.onBeforeClick(function(a,b){k.toggleClass(m,!b),j.toggleClass(m,b==f.getTabs().length-1)})}}a.fn.slideshow=function(d){var e=this.data("slideshow");if(e)return e;d=a.extend({},b.conf,d),this.each(function(){e=new c(a(this),d),a(this).data("slideshow",e)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).on("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.on("click.mask",function(b){a.mask.close(b)}),a(window).on("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).off("keydown.mask"),e.off("click.mask"),a(window).off("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(){var a=document.all,b="http://www.adobe.com/go/getflashplayer",c=typeof jQuery=="function",d=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,e={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:!0,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:!1,cachebusting:!1};window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){},__flash_savedUnloadHandler=function(){}});function f(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function g(a,b){var c=[];for(var d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d]));return c}window.flashembed=function(a,b,c){typeof a=="string"&&(a=document.getElementById(a.replace("#","")));if(a){typeof b=="string"&&(b={src:b});return new j(a,f(f({},e),b),c)}};var h=f(window.flashembed,{conf:e,getVersion:function(){var a,b;try{b=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(c){try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a&&a.GetVariable("$version")}catch(e){try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b=a&&a.GetVariable("$version")}catch(f){}}}b=d.exec(b);return b?[b[1],b[3]]:[0,0]},asString:function(a){if(a===null||a===undefined)return null;var b=typeof a;b=="object"&&a.push&&(b="array");switch(b){case"string":a=a.replace(new RegExp("([\"\\\\])","g"),"\\$1"),a=a.replace(/^\s?(\d+\.?\d*)%/,"$1pct");return"\""+a+"\"";case"array":return"["+g(a,function(a){return h.asString(a)}).join(",")+"]";case"function":return"\"function()\"";case"object":var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push("\""+d+"\":"+h.asString(a[d]));return"{"+c.join(",")+"}"}return String(a).replace(/\s/g," ").replace(/\'/g,"\"")},getHTML:function(b,c){b=f({},b);var d="<object width=\""+b.width+"\" height=\""+b.height+"\" id=\""+b.id+"\" name=\""+b.id+"\"";b.cachebusting&&(b.src+=(b.src.indexOf("?")!=-1?"&":"?")+Math.random()),b.w3c||!a?d+=" data=\""+b.src+"\" type=\"application/x-shockwave-flash\"":d+=" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"",d+=">";if(b.w3c||a)d+="<param name=\"movie\" value=\""+b.src+"\" />";b.width=b.height=b.id=b.w3c=b.src=null,b.onFail=b.version=b.expressInstall=null;for(var e in b)b[e]&&(d+="<param name=\""+e+"\" value=\""+b[e]+"\" />");var g="";if(c){for(var i in c)if(c[i]){var j=c[i];g+=i+"="+encodeURIComponent(/function|object/.test(typeof j)?h.asString(j):j)+"&"}g=g.slice(0,-1),d+="<param name=\"flashvars\" value='"+g+"' />"}d+="</object>";return d},isSupported:function(a){return i[0]>a[0]||i[0]==a[0]&&i[1]>=a[1]}}),i=h.getVersion();function j(c,d,e){if(h.isSupported(d.version))c.innerHTML=h.getHTML(d,e);else if(d.expressInstall&&h.isSupported([6,65]))c.innerHTML=h.getHTML(f(d,{src:d.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title});else{c.innerHTML.replace(/\s/g,"")||(c.innerHTML="<h2>Flash version "+d.version+" or greater is required</h2><h3>"+(i[0]>0?"Your version is "+i:"You have no flash plugin installed")+"</h3>"+(c.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+b+"'>here</a></p>"),c.tagName=="A"&&(c.onclick=function(){location.href=b}));if(d.onFail){var g=d.onFail.call(this);typeof g=="string"&&(c.innerHTML=g)}}a&&(window[d.id]=document.getElementById(d.id)),f(this,{getRoot:function(){return c},getOptions:function(){return d},getConf:function(){return e},getApi:function(){return c.firstChild}})}c&&(jQuery.tools=jQuery.tools||{version:"v1.2.7"},jQuery.tools.flashembed={conf:e},jQuery.fn.flashembed=function(a,b){return this.each(function(){jQuery(this).data("flashembed",flashembed(this,a,b))})})})();
(function(a){var b,c,d,e;a.tools=a.tools||{version:"v1.2.7"},a.tools.history={init:function(g){e||(a.browser.msie&&a.browser.version<"8"?c||(c=a("<iframe/>").attr("src","javascript:false;").hide().get(0),a("body").append(c),setInterval(function(){var d=c.contentWindow.document,e=d.location.hash;b!==e&&a(window).trigger("hash",e)},100),f(location.hash||"#")):setInterval(function(){var c=location.hash;c!==b&&a(window).trigger("hash",c)},100),d=d?d.add(g):g,g.click(function(b){var d=a(this).attr("href");c&&f(d);if(d.slice(0,1)!="#"){location.href="#"+d;return b.preventDefault()}}),e=!0)}};function f(a){if(a){var b=c.contentWindow.document;b.open().close(),b.location.hash=a}}a(window).on("hash",function(c,e){e?d.filter(function(){var b=a(this).attr("href");return b==e||b==e.replace("#","")}).trigger("history",[e]):d.eq(0).trigger("history",[e]),b=e}),a.fn.history=function(b){a.tools.history.init(this);return this.on("history",b)}})(jQuery);
(function(a){a.fn.mousewheel=function(a){return this[a?"on":"trigger"]("wheel",a)},a.event.special.wheel={setup:function(){a.event.add(this,b,c,{})},teardown:function(){a.event.remove(this,b,c)}};var b=a.browser.mozilla?"DOMMouseScroll"+(a.browser.version<"1.9"?" mousemove":""):"mousewheel";function c(b){switch(b.type){case"mousemove":return a.extend(b.data,{clientX:b.clientX,clientY:b.clientY,pageX:b.pageX,pageY:b.pageY});case"DOMMouseScroll":a.extend(b,b.data),b.delta=-b.detail/3;break;case"mousewheel":b.delta=b.wheelDelta/120}b.type="wheel";return a.event.handle.call(this,b,b.delta)}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.on(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).on(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.off(p[0]).on(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.off(p[1]).on(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.tooltip;b.dynamic={conf:{classNames:"top right bottom left"}};function c(b){var c=a(window),d=c.width()+c.scrollLeft(),e=c.height()+c.scrollTop();return[b.offset().top<=c.scrollTop(),d<=b.offset().left+b.width(),e<=b.offset().top+b.height(),c.scrollLeft()>=b.offset().left]}function d(a){var b=a.length;while(b--)if(a[b])return!1;return!0}a.fn.dynamic=function(e){typeof e=="number"&&(e={speed:e}),e=a.extend({},b.dynamic.conf,e);var f=a.extend(!0,{},e),g=e.classNames.split(/\s/),h;this.each(function(){var b=a(this).tooltip().onBeforeShow(function(b,e){var i=this.getTip(),j=this.getConf();h||(h=[j.position[0],j.position[1],j.offset[0],j.offset[1],a.extend({},j)]),a.extend(j,h[4]),j.position=[h[0],h[1]],j.offset=[h[2],h[3]],i.css({visibility:"hidden",position:"absolute",top:e.top,left:e.left}).show();var k=a.extend(!0,{},f),l=c(i);if(!d(l)){l[2]&&(a.extend(j,k.top),j.position[0]="top",i.addClass(g[0])),l[3]&&(a.extend(j,k.right),j.position[1]="right",i.addClass(g[1])),l[0]&&(a.extend(j,k.bottom),j.position[0]="bottom",i.addClass(g[2])),l[1]&&(a.extend(j,k.left),j.position[1]="left",i.addClass(g[3]));if(l[0]||l[2])j.offset[0]*=-1;if(l[1]||l[3])j.offset[1]*=-1}i.css({visibility:"visible"}).hide()});b.onBeforeShow(function(){var a=this.getConf(),b=this.getTip();setTimeout(function(){a.position=[h[0],h[1]],a.offset=[h[2],h[3]]},0)}),b.onHide(function(){var a=this.getTip();a.removeClass(e.classNames)}),ret=b});return e.api?ret:this}})(jQuery);
(function(a){var b=a.tools.tooltip;a.extend(b.conf,{direction:"up",bounce:!1,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!a.browser.msie});var c={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};b.addEffect("slide",function(a){var b=this.getConf(),d=this.getTip(),e=b.slideFade?{opacity:b.opacity}:{},f=c[b.direction]||c.up;e[f[1]]=f[0]+"="+b.slideOffset,b.slideFade&&d.css({opacity:0}),d.show().animate(e,b.slideInSpeed,a)},function(b){var d=this.getConf(),e=d.slideOffset,f=d.slideFade?{opacity:0}:{},g=c[d.direction]||c.up,h=""+g[0];d.bounce&&(h=h=="+"?"-":"+"),f[g[1]]=h+"="+e,this.getTip().animate(f,d.slideOutSpeed,function(){a(this).hide(),b.call()})})})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"};var b=/\[type=([a-z]+)\]/,c=/^-?[0-9]*(\.[0-9]+)?$/,d=a.tools.dateinput,e=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,f=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,g;g=a.tools.validator={conf:{grouped:!1,effect:"default",errorClass:"invalid",inputEvent:null,errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:!1,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(b,c){a.each(c,function(a,c){g.messages[a]=g.messages[a]||{},g.messages[a][b]=c})},localizeFn:function(b,c){g.messages[b]=g.messages[b]||{},a.extend(g.messages[b],c)},fn:function(c,d,e){a.isFunction(d)?e=d:(typeof d=="string"&&(d={en:d}),this.messages[c.key||c]=d);var f=b.exec(c);f&&(c=i(f[1])),j.push([c,e])},addEffect:function(a,b,c){k[a]=[b,c]}};function h(b,c,d){c=a(c).first()||c;var e=b.offset().top,f=b.offset().left,g=d.position.split(/,?\s+/),h=g[0],i=g[1];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var j=c.outerHeight()+b.outerHeight();h=="center"&&(e+=j/2),h=="bottom"&&(e+=j);var k=b.outerWidth();i=="center"&&(f-=(k+c.outerWidth())/2),i=="left"&&(f-=k);return{top:e,left:f}}function i(a){function b(){return this.getAttribute("type")==a}b.key="[type=\""+a+"\"]";return b}var j=[],k={"default":[function(b){var c=this.getConf();a.each(b,function(b,d){var e=d.input;e.addClass(c.errorClass);var f=e.data("msg.el");f||(f=a(c.message).addClass(c.messageClass).appendTo(document.body),e.data("msg.el",f)),f.css({visibility:"hidden"}).find("p").remove(),a.each(d.messages,function(b,c){a("<p/>").html(c).appendTo(f)}),f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});var g=h(e,f,c);f.css({visibility:"visible",position:"absolute",top:g.top,left:g.left}).fadeIn(c.speed)})},function(b){var c=this.getConf();b.removeClass(c.errorClass).each(function(){var b=a(this).data("msg.el");b&&b.css({visibility:"hidden"})})}]};a.each("email,url,number".split(","),function(b,c){a.expr[":"][c]=function(a){return a.getAttribute("type")===c}}),a.fn.oninvalid=function(a){return this[a?"on":"trigger"]("OI",a)},g.fn(":email","Please enter a valid email address",function(a,b){return!b||e.test(b)}),g.fn(":url","Please enter a valid URL",function(a,b){return!b||f.test(b)}),g.fn(":number","Please enter a numeric value.",function(a,b){return c.test(b)}),g.fn("[max]","Please enter a value no larger than $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("max");return parseFloat(b)<=parseFloat(c)?!0:[c]}),g.fn("[min]","Please enter a value of at least $1",function(a,b){if(b===""||d&&a.is(":date"))return!0;var c=a.attr("min");return parseFloat(b)>=parseFloat(c)?!0:[c]}),g.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return b}),g.fn("[pattern]",function(a,b){return b===""||(new RegExp("^"+a.attr("pattern")+"$")).test(b)}),g.fn(":radio","Please select an option.",function(b){var c=!1,d=a("[name='"+b.attr("name")+"']").each(function(b,d){a(d).is(":checked")&&(c=!0)});return c?!0:!1});function l(b,c,e){var f=this,i=c.add(f);b=b.not(":button, :image, :reset, :submit"),c.attr("novalidate","novalidate");function l(b,c,d){if(e.grouped||!b.length){var f;if(d===!1||a.isArray(d)){f=g.messages[c.key||c]||g.messages["*"],f=f[e.lang]||g.messages["*"].en;var h=f.match(/\$\d/g);h&&a.isArray(d)&&a.each(h,function(a){f=f.replace(this,d[a])})}else f=d[e.lang]||d;b.push(f)}}a.extend(f,{getConf:function(){return e},getForm:function(){return c},getInputs:function(){return b},reflow:function(){b.each(function(){var b=a(this),c=b.data("msg.el");if(c){var d=h(b,c,e);c.css({top:d.top,left:d.left})}});return f},invalidate:function(c,d){if(!d){var g=[];a.each(c,function(a,c){var d=b.filter("[name='"+a+"']");d.length&&(d.trigger("OI",[c]),g.push({input:d,messages:[c]}))}),c=g,d=a.Event()}d.type="onFail",i.trigger(d,[c]),d.isDefaultPrevented()||k[e.effect][0].call(f,c,d);return f},reset:function(c){c=c||b,c.removeClass(e.errorClass).each(function(){var b=a(this).data("msg.el");b&&(b.remove(),a(this).data("msg.el",null))}).off(e.errorInputEvent+".v");return f},destroy:function(){c.off(e.formEvent+".V reset.V"),b.off(e.inputEvent+".V change.V");return f.reset()},checkValidity:function(c,g){c=c||b,c=c.not(":disabled");var h={};c=c.filter(function(){var b=a(this).attr("name");if(!h[b]){h[b]=!0;return a(this)}});if(!c.length)return!0;g=g||a.Event(),g.type="onBeforeValidate",i.trigger(g,[c]);if(g.isDefaultPrevented())return g.result;var m=[];c.each(function(){var b=[],c=a(this).data("messages",b),h=d&&c.is(":date")?"onHide.v":e.errorInputEvent+".v";c.off(h),a.each(j,function(){var a=this,d=a[0];if(c.filter(d).length){var h=a[1].call(f,c,c.val());if(h!==!0){g.type="onBeforeFail",i.trigger(g,[c,d]);if(g.isDefaultPrevented())return!1;var j=c.attr(e.messageAttr);if(j){b=[j];return!1}l(b,d,h)}}}),b.length&&(m.push({input:c,messages:b}),c.trigger("OI",[b]),e.errorInputEvent&&c.on(h,function(a){f.checkValidity(c,a)}));if(e.singleError&&m.length)return!1});var n=k[e.effect];if(!n)throw"Validator: cannot find effect \""+e.effect+"\"";if(m.length){f.invalidate(m,g);return!1}n[1].call(f,c,g),g.type="onSuccess",i.trigger(g,[c]),c.off(e.errorInputEvent+".v");return!0}}),a.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}}),e.formEvent&&c.on(e.formEvent+".V",function(a){if(!f.checkValidity(null,a))return a.preventDefault();a.target=c,a.type=e.formEvent}),c.on("reset.V",function(){f.reset()}),b[0]&&b[0].validity&&b.each(function(){this.oninvalid=function(){return!1}}),c[0]&&(c[0].checkValidity=f.checkValidity),e.inputEvent&&b.on(e.inputEvent+".V",function(b){f.checkValidity(a(this),b)}),b.filter(":checkbox, select").filter("[required]").on("change.V",function(b){var c=a(this);(this.checked||c.is("select")&&a(this).val())&&k[e.effect][1].call(f,c,b)}),b.filter(":radio[required]").on("change.V",function(b){var c=a("[name='"+a(b.srcElement).attr("name")+"']");c!=null&&c.length!=0&&f.checkValidity(c,b)}),a(window).resize(function(){f.reflow()})}a.fn.validator=function(b){var c=this.data("validator");c&&(c.destroy(),this.removeData("validator")),b=a.extend(!0,{},g.conf,b);if(this.is("form"))return this.each(function(){var d=a(this);c=new l(d.find(":input"),d,b),d.data("validator",c)});c=new l(this,this.eq(0).closest("form"),b);return this.data("validator",c)}})(jQuery);
/* swfobject.js */
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
			if (instance && instance[options]) {
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
/* jquery.masonry.min.js */
/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);/* jquery.carouFredSel-5.6.4-packed.js */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(H($){8($.1P.1J)J;$.1P.1J=H(y,z){8(1g.V==0){1e(N,\'5s 4q 6u 1m "\'+1g.3U+\'".\');J 1g}8(1g.V>1){J 1g.1K(H(){$(1g).1J(y,z)})}F A=1g,$19=1g[0];8(A.1r(\'4r\')){F B=A.1D(\'34\',\'3w\');A.X(\'34\',[\'5t\',[N]])}Q{F B=O}A.3V=H(o,b,c){o=3W($19,o);F e=[\'G\',\'1n\',\'T\',\'17\',\'1a\',\'1b\'];1m(F a=0,l=e.V;a<l;a++){o[e[a]]=3W($19,o[e[a]])}8(K o.1n==\'13\'){8(o.1n<=50)o.1n={\'G\':o.1n};Q o.1n={\'1j\':o.1n}}Q{8(K o.1n==\'1k\')o.1n={\'1G\':o.1n}}8(K o.G==\'13\')o.G={\'P\':o.G};Q 8(o.G==\'1d\')o.G={\'P\':o.G,\'S\':o.G,\'1l\':o.G};8(K o.G!=\'1o\')o.G={};8(b)2u=$.25(N,{},$.1P.1J.4s,o);7=$.25(N,{},$.1P.1J.4s,o);8(K 7.G.12!=\'1o\')7.G.12={};8(7.G.2J==0&&K c==\'13\'){7.G.2J=c}C.4t=(7.2K);C.2k=(7.2k==\'4u\'||7.2k==\'1t\')?\'1a\':\'17\';F f=[[\'S\',\'35\',\'26\',\'1l\',\'5u\',\'2L\',\'1t\',\'2M\',\'1E\',0,1,2,3],[\'1l\',\'5u\',\'2L\',\'S\',\'35\',\'26\',\'2M\',\'1t\',\'3X\',3,2,1,0]];F g=f[0].V,5v=(7.2k==\'2N\'||7.2k==\'1t\')?0:1;7.d={};1m(F d=0;d<g;d++){7.d[f[0][d]]=f[5v][d]}F h=A.11();1x(K 7.G.P){W\'1o\':7.G.12.2O=7.G.P.2O;7.G.12.27=7.G.P.27;7.G.P=O;18;W\'1k\':8(7.G.P==\'1d\'){7.G.12.1d=N}Q{7.G.12.2l=7.G.P}7.G.P=O;18;W\'H\':7.G.12.2l=7.G.P;7.G.P=O;18}8(K 7.G.1v==\'1y\'){7.G.1v=(h.1v(\':2P\').V>0)?\':P\':\'*\'}8(7[7.d[\'S\']]==\'T\'){7[7.d[\'S\']]=3x(h,7,\'26\')}8(3Y(7[7.d[\'S\']])&&!7.2K){7[7.d[\'S\']]=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);C.4t=N}8(7[7.d[\'1l\']]==\'T\'){7[7.d[\'1l\']]=3x(h,7,\'2L\')}8(!7.G[7.d[\'S\']]){8(7.2K){1e(N,\'5w a \'+7.d[\'S\']+\' 1m 6v G!\');7.G[7.d[\'S\']]=3x(h,7,\'26\')}Q{7.G[7.d[\'S\']]=(4v(h,7,\'26\'))?\'1d\':h[7.d[\'26\']](N)}}8(!7.G[7.d[\'1l\']]){7.G[7.d[\'1l\']]=(4v(h,7,\'2L\'))?\'1d\':h[7.d[\'2L\']](N)}8(!7[7.d[\'1l\']]){7[7.d[\'1l\']]=7.G[7.d[\'1l\']]}8(!7.G.P&&!7.2K){8(7.G[7.d[\'S\']]==\'1d\'){7.G.12.1d=N}8(!7.G.12.1d){8(K 7[7.d[\'S\']]==\'13\'){7.G.P=1L.3y(7[7.d[\'S\']]/7.G[7.d[\'S\']])}Q{F i=36($1A.3a(),7,\'35\');7.G.P=1L.3y(i/7.G[7.d[\'S\']]);7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];8(!7.G.12.2l)7.1B=O}8(7.G.P==\'6w\'||7.G.P<1){1e(N,\'28 a 4w 13 3z P G: 5w 41 "1d".\');7.G.12.1d=N}}}8(!7[7.d[\'S\']]){7[7.d[\'S\']]=\'1d\';8(!7.2K&&7.G.1v==\'*\'&&!7.G.12.1d&&7.G[7.d[\'S\']]!=\'1d\'){7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];7.1B=O}}8(7.G.12.1d){7.3A=(7[7.d[\'S\']]==\'1d\')?36($1A.3a(),7,\'35\'):7[7.d[\'S\']];8(7.1B===O){7[7.d[\'S\']]=\'1d\'}7.G.P=2Q(h,7,0)}Q 8(7.G.1v!=\'*\'){7.G.12.42=7.G.P;7.G.P=3B(h,7,0)}8(K 7.1B==\'1y\'){7.1B=(7[7.d[\'S\']]==\'1d\')?O:\'4x\'}7.G.P=2R(7.G.P,7,7.G.12.2l,$19);7.G.12.2m=7.G.P;7.1u=O;8(7.2K){8(!7.G.12.2O)7.G.12.2O=7.G.P;8(!7.G.12.27)7.G.12.27=7.G.P;7.1B=O;7.1i=[0,0,0,0];F j=$1A.1W(\':P\');8(j)$1A.3b();F k=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);8(K 7[7.d[\'S\']]==\'13\'&&k<7[7.d[\'S\']]){k=7[7.d[\'S\']]}8(j)$1A.3c();F m=4y(1L.2v(k/7.G[7.d[\'S\']]),7.G.12);8(m>h.V){m=h.V}F n=1L.3y(k/m),4z=7[7.d[\'1l\']],5x=3Y(4z);h.1K(H(){F a=$(1g),4A=n-5y(a,7,\'6x\');a[7.d[\'S\']](4A);8(5x){a[7.d[\'1l\']](3Z(4A,4z))}});7.G.P=m;7.G[7.d[\'S\']]=n;7[7.d[\'S\']]=m*n}Q{7.1i=5z(7.1i);8(7.1B==\'2M\')7.1B=\'1t\';8(7.1B==\'4B\')7.1B=\'2N\';1x(7.1B){W\'4x\':W\'1t\':W\'2N\':8(7[7.d[\'S\']]!=\'1d\'){F p=43(3d(h,7),7);7.1u=N;7.1i[7.d[1]]=p[1];7.1i[7.d[3]]=p[0]}18;2w:7.1B=O;7.1u=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?O:N;18}}8(K 7.2n==\'1s\'&&7.2n)7.2n=\'6y\'+A.6z(\'6A\');8(K 7.G.3e!=\'13\')7.G.3e=7.G.P;8(K 7.1n.1j!=\'13\')7.1n.1j=5A;8(K 7.1n.G==\'1y\')7.1n.G=(7.G.12.1d||7.G.1v!=\'*\')?\'P\':7.G.P;7.T=3C($19,7.T,\'T\');7.17=3C($19,7.17);7.1a=3C($19,7.1a);7.1b=3C($19,7.1b,\'1b\');7.T=$.25(N,{},7.1n,7.T);7.17=$.25(N,{},7.1n,7.17);7.1a=$.25(N,{},7.1n,7.1a);7.1b=$.25(N,{},7.1n,7.1b);8(K 7.1b.44!=\'1s\')7.1b.44=O;8(K 7.1b.3f!=\'H\'&&7.1b.3f!==O)7.1b.3f=$.1P.1J.5B;8(K 7.T.1H!=\'1s\')7.T.1H=N;8(K 7.T.4C!=\'13\')7.T.4C=0;8(K 7.T.45==\'1y\')7.T.45=N;8(K 7.T.4D!=\'1s\')7.T.4D=N;8(K 7.T.3g!=\'13\')7.T.3g=(7.T.1j<10)?6B:7.T.1j*5;8(7.29){7.29=4E(7.29)}8(I.1e){1e(I,\'3h S: \'+7.S);1e(I,\'3h 1l: \'+7.1l);8(7.3A)1e(I,\'6C \'+7.d[\'S\']+\': \'+7.3A);1e(I,\'5C 6D: \'+7.G.S);1e(I,\'5C 6E: \'+7.G.1l);1e(I,\'46 3z G P: \'+7.G.P);8(7.T.1H)1e(I,\'46 3z G 4F 6F: \'+7.T.G);8(7.17.Y)1e(I,\'46 3z G 4F 4G: \'+7.17.G);8(7.1a.Y)1e(I,\'46 3z G 4F 5D: \'+7.1a.G)}};A.5E=H(){A.1r(\'4r\',N);F a={\'4H\':A.16(\'4H\'),\'4I\':A.16(\'4I\'),\'3D\':A.16(\'3D\'),\'2M\':A.16(\'2M\'),\'2N\':A.16(\'2N\'),\'4B\':A.16(\'4B\'),\'1t\':A.16(\'1t\'),\'S\':A.16(\'S\'),\'1l\':A.16(\'1l\'),\'4J\':A.16(\'4J\'),\'1E\':A.16(\'1E\'),\'3X\':A.16(\'3X\'),\'4K\':A.16(\'4K\')};1x(a.3D){W\'4L\':F b=\'4L\';18;W\'5F\':F b=\'5F\';18;2w:F b=\'6G\'}$1A.16(a).16({\'6H\':\'2P\',\'3D\':b});A.1r(\'5G\',a).16({\'4H\':\'1t\',\'4I\':\'47\',\'3D\':\'4L\',\'2M\':0,\'1t\':0,\'4J\':0,\'1E\':0,\'3X\':0,\'4K\':0});8(7.1u){A.11().1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}};A.5H=H(){A.4M();A.14(L(\'4N\',I),H(e,a){e.1h();8(!C.20){8(7.T.Y){7.T.Y.2S(2q(\'48\',I))}}C.20=N;8(7.T.1H){7.T.1H=O;A.X(L(\'2T\',I),a)}J N});A.14(L(\'4O\',I),H(e){e.1h();8(C.1S){3E(R)}J N});A.14(L(\'2T\',I),H(e,a,b){e.1h();1F=3i(1F);8(a&&C.1S){R.20=N;F c=2x()-R.2U;R.1j-=c;8(R.1p)R.1p.1j-=c;8(R.1Q)R.1Q.1j-=c;3E(R,O)}8(!C.1X&&!C.1S){8(b)1F.3F+=2x()-1F.2U}8(!C.1X){8(7.T.Y){7.T.Y.2S(2q(\'5I\',I))}}C.1X=N;8(7.T.5J){F d=7.T.3g-1F.3F,3G=3H-1L.2v(d*3H/7.T.3g);7.T.5J.1z($19,3G,d)}J N});A.14(L(\'1H\',I),H(e,b,c,d){e.1h();1F=3i(1F);F v=[b,c,d],t=[\'1k\',\'13\',\'1s\'],a=2V(v,t);F b=a[0],c=a[1],d=a[2];8(b!=\'17\'&&b!=\'1a\')b=C.2k;8(K c!=\'13\')c=0;8(K d!=\'1s\')d=O;8(d){C.20=O;7.T.1H=N}8(!7.T.1H){e.21();J 1e(I,\'3h 48: 28 2W.\')}8(C.1X){8(7.T.Y){7.T.Y.2y(2q(\'48\',I));7.T.Y.2y(2q(\'5I\',I))}}C.1X=O;1F.2U=2x();F f=7.T.3g+c;3I=f-1F.3F;3G=3H-1L.2v(3I*3H/f);1F.T=6I(H(){8(7.T.5K){7.T.5K.1z($19,3G,3I)}8(C.1S){A.X(L(\'1H\',I),b)}Q{A.X(L(b,I),7.T)}},3I);8(7.T.5L){7.T.5L.1z($19,3G,3I)}J N});A.14(L(\'2X\',I),H(e){e.1h();8(R.20){R.20=O;C.1X=O;C.1S=N;R.2U=2x();2a(R)}Q{A.X(L(\'1H\',I))}J N});A.14(L(\'17\',I)+\' \'+L(\'1a\',I),H(e,b,f,g){e.1h();8(C.20||A.1W(\':2P\')){e.21();J 1e(I,\'3h 48 6J 2P: 28 2W.\')}8(7.G.3e>=M.U){e.21();J 1e(I,\'28 5M G (\'+M.U+\', \'+7.G.3e+\' 5N): 28 2W.\')}F v=[b,f,g],t=[\'1o\',\'13/1k\',\'H\'],a=2V(v,t);F b=a[0],f=a[1],g=a[2];F h=e.4P.1c(I.3j.3J.V);8(K b!=\'1o\'||b==2b)b=7[h];8(K g==\'H\')b.22=g;8(K f!=\'13\'){8(7.G.1v!=\'*\'){f=\'P\'}Q{F i=[f,b.G,7[h].G];1m(F a=0,l=i.V;a<l;a++){8(K i[a]==\'13\'||i[a]==\'5O\'||i[a]==\'P\'){f=i[a];18}}}1x(f){W\'5O\':e.21();J A.1D(h+\'6K\',[b,g]);18;W\'P\':8(!7.G.12.1d&&7.G.1v==\'*\'){f=7.G.P}18}}8(R.20){A.X(L(\'2X\',I));A.X(L(\'3k\',I),[h,[b,f,g]]);e.21();J 1e(I,\'3h 6L 2W.\')}8(b.1j>0){8(C.1S){8(b.3k)A.X(L(\'3k\',I),[h,[b,f,g]]);e.21();J 1e(I,\'3h 6M 2W.\')}}8(b.4Q&&!b.4Q.1z($19)){e.21();J 1e(I,\'6N "4Q" 6O O.\')}1F.3F=0;A.X(L(\'5P\'+h,I),[b,f]);8(7.29){F s=7.29,c=[b,f];1m(F j=0,l=s.V;j<l;j++){F d=h;8(!s[j][2])d=(d==\'17\')?\'1a\':\'17\';8(!s[j][1])c[0]=s[j][0].1D(\'34\',[\'5Q\',d]);c[1]=f+s[j][3];s[j][0].X(\'34\',[\'5P\'+d,c])}}J N});A.14(L(\'6P\',I),H(e,f,g){e.1h();F h=A.11();8(!7.1M){8(M.Z==0){8(7.3l){A.X(L(\'1a\',I),M.U-1)}J e.21()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.12.1d){g=4a(h,7,M.U-1)}Q 8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5R(h,7,M.U-1,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}8(!7.1M){8(M.U-g<M.Z){g=M.U-M.Z}}7.G.12.2m=7.G.P;8(7.G.12.1d){F j=2Q(h,7,M.U-g);8(7.G.P+g<=j&&g<M.U){g++;j=2Q(h,7,M.U-g)}7.G.P=2R(j,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F j=3B(h,7,M.U-g);7.G.P=2R(j,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,N);8(g==0){e.21();J 1e(I,\'0 G 41 1n: 28 2W.\')}1e(I,\'5S \'+g+\' G 4G.\');M.Z+=g;23(M.Z>=M.U){M.Z-=M.U}8(!7.1M){8(M.Z==0&&f.4c)f.4c.1z($19);8(!7.3l)2z(7,M.Z,I)}A.11().1c(M.U-g,M.U).6Q(A);8(M.U<7.G.P+g){A.11().1c(0,(7.G.P+g)-M.U).4d(N).3K(A)}F h=A.11(),2r=5T(h,7,g),1T=5U(h,7),2c=h.1O(g-1),2d=2r.2Y(),2A=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),k=p[0],2s=p[1]}Q{F k=0,2s=0}F l=(k<0)?7.1i[7.d[3]]:0;8(f.1I==\'5V\'&&7.G.P<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2P\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2B(1T,7,N),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1u){1N(h,7,N);8(2s>=0){1N(2d,7,7.1i[7.d[1]])}1N(2c,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=k}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=24(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=7.1i[7.d[3]];8(2A.4S(2c).V){F r={};r[7.d[\'1E\']]=2c.1r(\'1R\');8(k<0)2c.16(r);Q R.1f.1q([2c,r])}8(2A.4S(2d).V){F s={};s[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,s])}8(2s>=0){F t={};t[7.d[\'1E\']]=2A.1r(\'1R\')+7.1i[7.d[1]];R.1f.1q([2A,t])}}Q{F q=0}o[7.d[\'1t\']]=q;F u=[2r,1T,2e,1w];8(f.2f)f.2f.3L($19,u);1Y.2f=3M(1Y.2f,$19,u);1x(f.1I){W\'2C\':W\'2g\':W\'2D\':W\'2h\':R.1p=24(R.1j,R.1G);R.1Q=24(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2D\':W\'2h\':F v=A.4d().3K($1A);18}1x(f.1I){W\'2h\':v.11().1c(0,g).1U();W\'2g\':W\'2D\':v.11().1c(7.G.P).1U();18}1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2D\':R=4T(R,A,v,7,N);18;W\'2h\':R=4U(R,A,v,7,N,g);18}F w=H(){F b=7.G.P+g-M.U;8(b>0){A.11().1c(M.U).1U();2r=$(A.11().1c(M.U-(7.G.P-b)).4h().5W(A.11().1c(0,b).4h()))}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){F c=A.11().1O(7.G.P+g-1);c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=24(R.4V,R.1G);F d=H(){1x(f.1I){W\'2C\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=24(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.22)f.22.3L($19,a);1Y.22=3M(1Y.22,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':1},d]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},d]);2a(R.1p);18;2w:d();18}};R.1f.1q([A,o,w]);C.1S=N;A.16(7.d[\'1t\'],-(n-l));1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3w\',I)));A.X(L(\'2E\',I),[O,2e]);J N});A.14(L(\'6R\',I),H(e,f,g){e.1h();F h=A.11();8(!7.1M){8(M.Z==7.G.P){8(7.3l){A.X(L(\'17\',I),M.U-1)}J e.21()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5Y(h,7,0,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}F j=(M.Z==0)?M.U:M.Z;8(!7.1M){8(7.G.12.1d){F k=2Q(h,7,g),i=4a(h,7,j-1)}Q{F k=7.G.P,i=7.G.P}8(g+k>j){g=j-i}}7.G.12.2m=7.G.P;8(7.G.12.1d){F k=4X(h,7,g,j);23(7.G.P-g>=k&&g<M.U){g++;k=4X(h,7,g,j)}7.G.P=2R(k,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F k=3B(h,7,g);7.G.P=2R(k,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,N);8(g==0){e.21();J 1e(I,\'0 G 41 1n: 28 2W.\')}1e(I,\'5S \'+g+\' G 5D.\');M.Z-=g;23(M.Z<0){M.Z+=M.U}8(!7.1M){8(M.Z==7.G.P&&f.4c)f.4c.1z($19);8(!7.3l)2z(7,M.Z,I)}8(M.U<7.G.P+g){A.11().1c(0,(7.G.P+g)-M.U).4d(N).3K(A)}F h=A.11(),2r=4Y(h,7),1T=4Z(h,7,g),2c=h.1O(g-1),2d=2r.2Y(),2A=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),l=p[0],2s=p[1]}Q{F l=0,2s=0}8(f.1I==\'5V\'&&7.G.12.2m<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2P\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2B(1T,7,N),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}8(7.1u){1N(h,7,N);1N(2d,7,7.1i[7.d[1]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=l}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=24(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=2A.1r(\'1R\');8(2s>=0){q+=7.1i[7.d[1]]}2A.16(7.d[\'1E\'],q);8(2c.4S(2d).V){F r={};r[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,r])}F s=2c.1r(\'1R\');8(l>=0){s+=7.1i[7.d[3]]}F t={};t[7.d[\'1E\']]=s;R.1f.1q([2c,t])}o[7.d[\'1t\']]=-n;8(l<0){o[7.d[\'1t\']]+=l}F u=[2r,1T,2e,1w];8(f.2f)f.2f.3L($19,u);1Y.2f=3M(1Y.2f,$19,u);1x(f.1I){W\'2C\':W\'2g\':W\'2D\':W\'2h\':R.1p=24(R.1j,R.1G);R.1Q=24(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2D\':W\'2h\':F v=A.4d().3K($1A);18}1x(f.1I){W\'2h\':v.11().1c(7.G.12.2m).1U();18;W\'2g\':W\'2D\':v.11().1c(0,g).1U();v.11().1c(7.G.P).1U();18}1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2D\':R=4T(R,A,v,7,O);18;W\'2h\':R=4U(R,A,v,7,O,g);18}F w=H(){F b=7.G.P+g-M.U,5Z=(7.1u)?7.1i[7.d[3]]:0;A.16(7.d[\'1t\'],5Z);8(b>0){A.11().1c(M.U).1U()}F c=A.11().1c(0,g).3K(A).2Y();8(b>0){1T=3d(h,7)}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){8(M.U<7.G.P+g){F d=A.11().1O(7.G.P-1);d.16(7.d[\'1E\'],d.1r(\'1R\')+7.1i[7.d[3]])}c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=24(R.4V,R.1G);F e=H(){1x(f.1I){W\'2C\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=24(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.22)f.22.3L($19,a);1Y.22=3M(1Y.22,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':1},e]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},e]);2a(R.1p);18;2w:e();18}};R.1f.1q([A,o,w]);C.1S=N;1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3w\',I)));A.X(L(\'2E\',I),[O,2e]);J N});A.14(L(\'2Z\',I),H(e,b,c,d,f,g,h){e.1h();F v=[b,c,d,f,g,h],t=[\'1k/13/1o\',\'13\',\'1s\',\'1o\',\'1k\',\'H\'],a=2V(v,t);F f=a[3],g=a[4],h=a[5];b=3n(a[0],a[1],a[2],M,A);8(b==0)J;8(K f!=\'1o\')f=O;8(C.1S){8(K f!=\'1o\'||f.1j>0)J O}8(g!=\'17\'&&g!=\'1a\'){8(7.1M){8(b<=M.U/2)g=\'1a\';Q g=\'17\'}Q{8(M.Z==0||M.Z>b)g=\'1a\';Q g=\'17\'}}8(g==\'17\')b=M.U-b;A.X(L(g,I),[f,b,h]);J N});A.14(L(\'6S\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3N\',I));J A.1D(L(\'51\',I),[c-1,a,\'17\',b])});A.14(L(\'6T\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3N\',I));J A.1D(L(\'51\',I),[c+1,a,\'1a\',b])});A.14(L(\'51\',I),H(e,a,b,c,d){e.1h();8(K a!=\'13\')a=A.1D(L(\'3N\',I));F f=7.1b.G||7.G.P,27=1L.2v(M.U/f)-1;8(a<0)a=27;8(a>27)a=0;J A.1D(L(\'2Z\',I),[a*f,0,N,b,c,d])});A.14(L(\'60\',I),H(e,s){e.1h();8(s)s=3n(s,0,N,M,A);Q s=0;s+=M.Z;8(s!=0){23(s>M.U)s-=M.U;A.6U(A.11().1c(s,M.U))}J N});A.14(L(\'29\',I),H(e,s){e.1h();8(s)s=4E(s);Q 8(7.29)s=7.29;Q J 1e(I,\'5s 6V 41 29.\');F n=A.1D(L(\'3w\',I)),x=N;1m(F j=0,l=s.V;j<l;j++){8(!s[j][0].1D(L(\'2Z\',I),[n,s[j][3],N])){x=O}}J x});A.14(L(\'3k\',I),H(e,a,b){e.1h();8(K a==\'H\'){a.1z($19,1V)}Q 8(31(a)){1V=a}Q 8(K a!=\'1y\'){1V.1q([a,b])}J 1V});A.14(L(\'6W\',I),H(e,b,c,d,f){e.1h();F v=[b,c,d,f],t=[\'1k/1o\',\'1k/13/1o\',\'1s\',\'13\'],a=2V(v,t);F b=a[0],c=a[1],d=a[2],f=a[3];8(K b==\'1o\'&&K b.3o==\'1y\')b=$(b);8(K b==\'1k\')b=$(b);8(K b!=\'1o\'||K b.3o==\'1y\'||b.V==0)J 1e(I,\'28 a 4w 1o.\');8(K c==\'1y\')c=\'4i\';8(7.1u){b.1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}F g=c,3O=\'3O\';8(c==\'4i\'){8(d){8(M.Z==0){c=M.U-1;3O=\'61\'}Q{c=M.Z;M.Z+=b.V}8(c<0)c=0}Q{c=M.U-1;3O=\'61\'}}Q{c=3n(c,f,d,M,A)}8(g!=\'4i\'&&!d){8(c<M.Z)M.Z+=b.V}8(M.Z>=M.U)M.Z-=M.U;F h=A.11().1O(c);8(h.V){h[3O](b)}Q{A.62(b)}M.U=A.11().V;F i=A.1D(\'52\');3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'53\',I));A.X(L(\'2E\',I),[N,i]);J N});A.14(L(\'63\',I),H(e,c,d,f){e.1h();F v=[c,d,f],t=[\'1k/13/1o\',\'1s\',\'13\'],a=2V(v,t);c=a[0];d=a[1];f=a[2];F g=O;8(c 64 $&&c.V>1){h=$();c.1K(H(i,a){F b=A.X(L(\'63\',I),[$(1g),d,f]);8(b)h=h.6X(b)});J h}8(K c==\'1y\'||c==\'4i\'){h=A.11().2Y()}Q{c=3n(c,f,d,M,A);F h=A.11().1O(c);8(h.V){8(c<M.Z)M.Z-=h.V}}8(h&&h.V){h.6Y();M.U=A.11().V;F j=A.1D(\'52\');3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'2E\',I),[N,j])}J h});A.14(L(\'2f\',I)+\' \'+L(\'22\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3J.V);8(31(a))1Y[b]=a;8(K a==\'H\')1Y[b].1q(a);J 1Y[b]});A.14(L(\'3w\',I),H(e,a){e.1h();8(M.Z==0)F b=0;Q F b=M.U-M.Z;8(K a==\'H\')a.1z($19,b);J b});A.14(L(\'3N\',I),H(e,a){e.1h();F b=7.1b.G||7.G.P;F c=1L.2v(M.U/b-1);8(M.Z==0)F d=0;Q 8(M.Z<M.U%b)F d=0;Q 8(M.Z==b&&!7.1M)F d=c;Q F d=1L.6Z((M.U-M.Z)/b);8(d<0)d=0;8(d>c)d=c;8(K a==\'H\')a.1z($19,d);J d});A.14(L(\'70\',I),H(e,a){e.1h();$i=3d(A.11(),7);8(K a==\'H\')a.1z($19,$i);J $i});A.14(L(\'1c\',I),H(e,f,l,b){e.1h();8(M.U==0)J O;F v=[f,l,b],t=[\'13\',\'13\',\'H\'],a=2V(v,t);f=(K a[0]==\'13\')?a[0]:0;l=(K a[1]==\'13\')?a[1]:M.U;b=a[2];f+=M.Z;l+=M.Z;23(f>M.U){f-=M.U}23(l>M.U){l-=M.U}23(f<0){f+=M.U}23(l<0){l+=M.U}F c=A.11();8(l>f){F d=c.1c(f,l)}Q{F d=$(c.1c(f,M.U).4h().5W(c.1c(0,l).4h()))}8(K b==\'H\')b.1z($19,d);J d});A.14(L(\'1X\',I)+\' \'+L(\'20\',I)+\' \'+L(\'1S\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3J.V);8(K a==\'H\')a.1z($19,C[b]);J C[b]});A.14(L(\'5Q\',I),H(e,a,b,c){e.1h();F d=O;8(K a==\'H\'){a.1z($19,7)}Q 8(K a==\'1o\'){2u=$.25(N,{},2u,a);8(b!==O)d=N;Q 7=$.25(N,{},7,a)}Q 8(K a!=\'1y\'){8(K b==\'H\'){F f=4j(\'7.\'+a);8(K f==\'1y\')f=\'\';b.1z($19,f)}Q 8(K b!=\'1y\'){8(K c!==\'1s\')c=N;4j(\'2u.\'+a+\' = b\');8(c!==O)d=N;Q 4j(\'7.\'+a+\' = b\')}Q{J 4j(\'7.\'+a)}}8(d){1N(A.11(),7);A.3V(2u);A.54();F g=3P(A,7,O);A.X(L(\'2E\',I),[N,g])}J 7});A.14(L(\'53\',I),H(e,a,b){e.1h();8(K a==\'1y\'||a.V==0)a=$(\'71\');Q 8(K a==\'1k\')a=$(a);8(K a!=\'1o\')J 1e(I,\'28 a 4w 1o.\');8(K b!=\'1k\'||b.V==0)b=\'a.65\';a.72(b).1K(H(){F h=1g.66||\'\';8(h.V>0&&A.11().68($(h))!=-1){$(1g).1Z(\'55\').55(H(e){e.2j();A.X(L(\'2Z\',I),h)})}});J N});A.14(L(\'2E\',I),H(e,b,c){e.1h();8(!7.1b.1C)J;8(b){F d=7.1b.G||7.G.P,l=1L.2v(M.U/d);8(7.1b.3f){7.1b.1C.11().1U();7.1b.1C.1K(H(){1m(F a=0;a<l;a++){F i=A.11().1O(3n(a*d,0,N,M,A));$(1g).62(7.1b.3f(a+1,i))}})}7.1b.1C.1K(H(){$(1g).11().1Z(7.1b.3q).1K(H(a){$(1g).14(7.1b.3q,H(e){e.2j();A.X(L(\'2Z\',I),[a*d,0,N,7.1b])})})})}7.1b.1C.1K(H(){$(1g).11().2y(2q(\'69\',I)).1O(A.1D(L(\'3N\',I))).2S(2q(\'69\',I))});J N});A.14(L(\'52\',I),H(e){F a=A.11(),3Q=7.G.P;8(7.G.12.1d)3Q=2Q(a,7,0);Q 8(7.G.1v!=\'*\')3Q=3B(a,7,0);8(!7.1M&&M.Z!=0&&3Q>M.Z){8(7.G.12.1d){F b=4a(a,7,M.Z)-M.Z}Q 8(7.G.1v!=\'*\'){F b=6a(a,7,M.Z)-M.Z}Q{b=7.G.P-M.Z}1e(I,\'73 74-1M: 75 \'+b+\' G 4G.\');A.X(\'17\',b)}7.G.P=2R(3Q,7,7.G.12.2l,$19);J 3P(A,7)});A.14(L(\'5t\',I),H(e,a){e.1h();1F=3i(1F);A.1r(\'4r\',O);A.X(L(\'4O\',I));8(a){A.X(L(\'60\',I))}8(7.1u){1N(A.11(),7)}A.16(A.1r(\'5G\'));A.4M();A.56();$1A.76(A);J N});A.14(\'34\',H(e,n,o){e.1h();J A.1D(L(n,I),o)})};A.4M=H(){A.1Z(L(\'\',I));A.1Z(L(\'\',I,O));A.1Z(\'34\')};A.54=H(){A.56();3p(7,M.U,I);2z(7,M.Z,I);8(7.T.2t){F c=3r(7.T.2t);$1A.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}8(7.T.Y){7.T.Y.14(L(7.T.3q,I,O),H(e){e.2j();F a=O,c=2b;8(C.1X){a=\'1H\'}Q 8(7.T.45){a=\'2T\';c=3r(7.T.45)}8(a){A.X(L(a,I),c)}})}8(7.17.Y){7.17.Y.14(L(7.17.3q,I,O),H(e){e.2j();A.X(L(\'17\',I))});8(7.17.2t){F c=3r(7.17.2t);7.17.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8(7.1a.Y){7.1a.Y.14(L(7.1a.3q,I,O),H(e){e.2j();A.X(L(\'1a\',I))});8(7.1a.2t){F c=3r(7.1a.2t);7.1a.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8($.1P.2F){8(7.17.2F){8(!C.57){C.57=N;$1A.2F(H(e,a){8(a>0){e.2j();F b=59(7.17.2F);A.X(L(\'17\',I),b)}})}}8(7.1a.2F){8(!C.5a){C.5a=N;$1A.2F(H(e,a){8(a<0){e.2j();F b=59(7.1a.2F);A.X(L(\'1a\',I),b)}})}}}8($.1P.3R){F d=(7.17.5b)?H(){A.X(L(\'17\',I))}:2b,3S=(7.1a.5b)?H(){A.X(L(\'1a\',I))}:2b;8(3S||3S){8(!C.3R){C.3R=N;F f={\'77\':30,\'78\':30,\'79\':N};1x(7.2k){W\'4u\':W\'6b\':f.7a=d;f.7b=3S;18;2w:f.7c=3S;f.7d=d}$1A.3R(f)}}}8(7.1b.1C){8(7.1b.2t){F c=3r(7.1b.2t);7.1b.1C.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8(7.17.2G||7.1a.2G){$(3T).14(L(\'6c\',I,O,N,N),H(e){F k=e.6d;8(k==7.1a.2G){e.2j();A.X(L(\'1a\',I))}8(k==7.17.2G){e.2j();A.X(L(\'17\',I))}})}8(7.1b.44){$(3T).14(L(\'6c\',I,O,N,N),H(e){F k=e.6d;8(k>=49&&k<58){k=(k-49)*7.G.P;8(k<=M.U){e.2j();A.X(L(\'2Z\',I),[k,0,N,7.1b])}}})}8(7.T.1H){A.X(L(\'1H\',I),7.T.4C)}8(C.4t){F g=$(3s),5c=g.S(),5d=g.1l();g.14(L(\'7e\',I,O,N,N),H(e){8(g.S()!=5c||g.1l()!=5d){A.X(L(\'4O\',I));8(7.T.4D&&!C.1X){A.X(L(\'1H\',I))}1N(A.11(),7);A.3V(2u);F a=3P(A,7,O);3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'2E\',I),[N,a]);5c=g.S();5d=g.1l()}})}};A.56=H(){F a=L(\'\',I),3t=L(\'\',I,O);5e=L(\'\',I,O,N,N);$(3T).1Z(5e);$(3s).1Z(5e);$1A.1Z(3t);8(7.T.Y)7.T.Y.1Z(3t);8(7.17.Y)7.17.Y.1Z(3t);8(7.1a.Y)7.1a.Y.1Z(3t);8(7.1b.1C){7.1b.1C.1Z(3t);8(7.1b.3f){7.1b.1C.11().1U()}}3p(7,\'3b\',I);2z(7,\'2y\',I)};F C={\'2k\':\'1a\',\'1X\':N,\'1S\':O,\'20\':O,\'5a\':O,\'57\':O,\'3R\':O},M={\'U\':A.11().V,\'Z\':0},1F={\'7f\':2b,\'T\':2b,\'3k\':2b,\'2U\':2x(),\'3F\':0},R={\'20\':O,\'1j\':0,\'2U\':0,\'1G\':\'\',\'1f\':[]},1Y={\'2f\':[],\'22\':[]},1V=[],I=$.25(N,{},$.1P.1J.6e,z),7={},2u=y,$1A=A.7g(\'<\'+I.5f.4q+\' 7h="\'+I.5f.6f+\'" />\').3a();I.3U=A.3U;I.4m=$.1P.1J.4m++;A.3V(2u,N,B);A.5E();A.5H();A.54();8(31(7.G.2J)){F D=7.G.2J}Q{F D=[];8(7.G.2J!=0){D.1q(7.G.2J)}}8(7.2n){D.7i(6g(7.2n))}8(D.V>0){1m(F a=0,l=D.V;a<l;a++){F s=D[a];8(s==0){5g}8(s===N){s=3s.7j.66;8(s.V<1){5g}}Q 8(s===\'6h\'){s=1L.3y(1L.6h()*M.U)}8(A.1D(L(\'2Z\',I),[s,0,N,{1I:\'47\'}])){18}}}F E=3P(A,7,O),6i=3d(A.11(),7);8(7.6j){7.6j.1z($19,6i,E)}A.X(L(\'2E\',I),[N,E]);A.X(L(\'53\',I));J A};$.1P.1J.4m=1;$.1P.1J.4s={\'29\':O,\'3l\':N,\'1M\':N,\'2K\':O,\'2k\':\'1t\',\'G\':{\'2J\':0},\'1n\':{\'1G\':\'7k\',\'1j\':5A,\'2t\':O,\'2F\':O,\'5b\':O,\'3q\':\'55\',\'3k\':O}};$.1P.1J.6e={\'1e\':O,\'3j\':{\'3J\':\'\',\'6k\':\'7l\'},\'5f\':{\'4q\':\'7m\',\'6f\':\'7n\'},\'5h\':{}};$.1P.1J.5B=H(a,b){J\'<a 7o="#"><6l>\'+a+\'</6l></a>\'};H 24(d,e){J{1f:[],1j:d,4V:d,1G:e,2U:2x()}}H 2a(s){8(K s.1p==\'1o\'){2a(s.1p)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];8(!b)5g;8(b[3])b[0].4N();b[0].6m(b[1],{6n:b[2],1j:s.1j,1G:s.1G})}8(K s.1Q==\'1o\'){2a(s.1Q)}}H 3E(s,c){8(K c!=\'1s\')c=N;8(K s.1p==\'1o\'){3E(s.1p,c)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];b[0].4N(N);8(c){b[0].16(b[1]);8(K b[2]==\'H\')b[2]()}}8(K s.1Q==\'1o\'){3E(s.1Q,c)}}H 3i(t){8(t.T)7p(t.T);J t}H 3M(b,t,c){8(b.V){1m(F a=0,l=b.V;a<l;a++){b[a].3L(t,c)}}J[]}H 7q(a,c,x,d,f){F o={\'1j\':d,\'1G\':a.1G};8(K f==\'H\')o.6n=f;c.6m({2i:x},o)}H 4T(a,b,c,o,d){F e=2B(4Y(b.11(),o),o,N)[0],5i=2B(c.11(),o,N)[0],4n=(d)?-5i:e,2H={},3u={};2H[o.d[\'S\']]=5i;2H[o.d[\'1t\']]=4n;3u[o.d[\'1t\']]=0;a.1p.1f.1q([b,{\'2i\':1}]);a.1Q.1f.1q([c,3u,H(){$(1g).1U()}]);c.16(2H);J a}H 4U(a,b,c,o,d,n){F e=2B(4Z(b.11(),o,n),o,N)[0],5j=2B(c.11(),o,N)[0],4n=(d)?-5j:e,2H={},3u={};2H[o.d[\'S\']]=5j;2H[o.d[\'1t\']]=0;3u[o.d[\'1t\']]=4n;a.1Q.1f.1q([c,3u,H(){$(1g).1U()}]);c.16(2H);J a}H 3p(o,t,c){8(t==\'3c\'||t==\'3b\'){F f=t}Q 8(o.G.3e>=t){1e(c,\'28 5M G: 7r 7s (\'+t+\' G, \'+o.G.3e+\' 5N).\');F f=\'3b\'}Q{F f=\'3c\'}F s=(f==\'3c\')?\'2y\':\'2S\',h=2q(\'2P\',c);8(o.T.Y)o.T.Y[f]()[s](h);8(o.17.Y)o.17.Y[f]()[s](h);8(o.1a.Y)o.1a.Y[f]()[s](h);8(o.1b.1C)o.1b.1C[f]()[s](h)}H 2z(o,f,c){8(o.1M||o.3l)J;F a=(f==\'2y\'||f==\'2S\')?f:O,4o=2q(\'7t\',c);8(o.T.Y&&a){o.T.Y[a](4o)}8(o.17.Y){F b=a||(f==0)?\'2S\':\'2y\';o.17.Y[b](4o)}8(o.1a.Y){F b=a||(f==o.G.P)?\'2S\':\'2y\';o.1a.Y[b](4o)}}H 3W(a,b){8(K b==\'H\')b=b.1z(a);8(K b==\'1y\')b={};J b}H 3C(a,b,c){8(K c!=\'1k\')c=\'\';b=3W(a,b);8(K b==\'1k\'){F d=5k(b);8(d==-1)b=$(b);Q b=d}8(c==\'1b\'){8(K b==\'1s\')b={\'44\':b};8(K b.3o!=\'1y\')b={\'1C\':b};8(K b.1C==\'H\')b.1C=b.1C.1z(a);8(K b.1C==\'1k\')b.1C=$(b.1C);8(K b.G!=\'13\')b.G=O}Q 8(c==\'T\'){8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'1s\')b={\'1H\':b};8(K b==\'13\')b={\'3g\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y)}Q{8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'13\')b={\'2G\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y);8(K b.2G==\'1k\')b.2G=5k(b.2G)}J b}H 3n(a,b,c,d,e){8(K a==\'1k\'){8(2p(a))a=$(a);Q a=2o(a)}8(K a==\'1o\'){8(K a.3o==\'1y\')a=$(a);a=e.11().68(a);8(a==-1)a=0;8(K c!=\'1s\')c=O}Q{8(K c!=\'1s\')c=N}8(2p(a))a=0;Q a=2o(a);8(2p(b))b=0;Q b=2o(b);8(c){a+=d.Z}a+=b;8(d.U>0){23(a>=d.U){a-=d.U}23(a<0){a+=d.U}}J a}H 4a(i,o,s){F t=0,x=0;1m(F a=s;a>=0;a--){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](N):0;8(t>o.3A)J x;8(a==0)a=i.V;x++}}H 6a(i,o,s){J 5l(i,o.G.1v,o.G.12.42,s)}H 5R(i,o,s,m){J 5l(i,o.G.1v,m,s)}H 5l(i,f,m,s){F t=0,x=0;1m(F a=s,l=i.V;a>=0;a--){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==0)a=l}}H 4R(a,o){J o.G.12.42||a.11().1c(0,o.G.P).1v(o.G.1v).V}H 2Q(i,o,s){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](N):0;8(t>o.3A)J x;x++;8(x==l+1)J x;8(a==l)a=-1}}H 4X(i,o,s,l){F v=2Q(i,o,s);8(!o.1M){8(s+v>l)v=l-s}J v}H 3B(i,o,s){J 5m(i,o.G.1v,o.G.12.42,s,o.1M)}H 5Y(i,o,s,m){J 5m(i,o.G.1v,m+1,s,o.1M)-1}H 5m(i,f,m,s,c){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==l)a=-1}}H 3d(i,o){J i.1c(0,o.G.P)}H 5T(i,o,n){J i.1c(n,o.G.12.2m+n)}H 5U(i,o){J i.1c(0,o.G.P)}H 4Y(i,o){J i.1c(0,o.G.12.2m)}H 4Z(i,o,n){J i.1c(n,o.G.P+n)}H 1N(i,o,m){F x=(K m==\'1s\')?m:O;8(K m!=\'13\')m=0;i.1K(H(){F j=$(1g);F t=2o(j.16(o.d[\'1E\']));8(2p(t))t=0;j.1r(\'6o\',t);j.16(o.d[\'1E\'],((x)?j.1r(\'6o\'):m+j.1r(\'1R\')))})}H 3P(a,o,p){F b=a.3a(),$i=a.11(),$v=3d($i,o),4p=4g(2B($v,o,N),o,p);b.16(4p);8(o.1u){F p=o.1i,r=p[o.d[1]];8(o.1B){8(r<0)r=0}F c=$v.2Y();c.16(o.d[\'1E\'],c.1r(\'1R\')+r);a.16(o.d[\'2M\'],p[o.d[0]]);a.16(o.d[\'1t\'],p[o.d[3]])}a.16(o.d[\'S\'],4p[o.d[\'S\']]+(3m($i,o,\'S\')*2));a.16(o.d[\'1l\'],5n($i,o,\'1l\'));J 4p}H 2B(i,o,a){F b=3m(i,o,\'S\',a),6p=5n(i,o,\'1l\',a);J[b,6p]}H 5n(i,o,a,b){8(K b!=\'1s\')b=O;8(K o[o.d[a]]==\'13\'&&b)J o[o.d[a]];8(K o.G[o.d[a]]==\'13\')J o.G[o.d[a]];F c=(a.5o().32(\'S\')>-1)?\'26\':\'2L\';J 3x(i,o,c)}H 3x(i,o,b){F s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F m=(j.1W(\':P\'))?j[o.d[b]](N):0;8(s<m)s=m}J s}H 36(b,o,c){8(!b.1W(\':P\'))J 0;F d=b[o.d[c]](),5p=(o.d[c].5o().32(\'S\')>-1)?[\'7u\',\'7v\']:[\'7w\',\'7x\'];1m(F a=0,l=5p.V;a<l;a++){F m=2o(b.16(5p[a]));d-=(2p(m))?0:m}J d}H 3m(i,o,b,c){8(K c!=\'1s\')c=O;8(K o[o.d[b]]==\'13\'&&c)J o[o.d[b]];8(K o.G[o.d[b]]==\'13\')J o.G[o.d[b]]*i.V;F d=(b.5o().32(\'S\')>-1)?\'26\':\'2L\',s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);s+=(j.1W(\':P\'))?j[o.d[d]](N):0}J s}H 4v(i,o,b){F s=O,v=O;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F c=(j.1W(\':P\'))?j[o.d[b]](N):0;8(s===O)s=c;Q 8(s!=c)v=N;8(s==0)v=N}J v}H 5y(i,o,d){J i[o.d[\'7y\'+d]](N)-36(i,o,\'7z\'+d)}H 3Y(x){J(K x==\'1k\'&&x.1c(-1)==\'%\')}H 3Z(s,o){8(3Y(o)){o=o.1c(0,-1);8(2p(o))J s;s*=o/3H}J s}H L(n,c,a,b,d){8(K a!=\'1s\')a=N;8(K b!=\'1s\')b=N;8(K d!=\'1s\')d=O;8(a)n=c.3j.3J+n;8(b)n=n+\'.\'+c.3j.6k;8(b&&d)n+=c.4m;J n}H 2q(n,c){J(K c.5h[n]==\'1k\')?c.5h[n]:n}H 4g(a,o,p){8(K p!=\'1s\')p=N;F b=(o.1u&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'S\']]=a[0]+b[1]+b[3];c[o.d[\'1l\']]=a[1]+b[0]+b[2];J c}H 2V(c,d){F e=[];1m(F a=0,6q=c.V;a<6q;a++){1m(F b=0,6r=d.V;b<6r;b++){8(d[b].32(K c[a])>-1&&K e[b]==\'1y\'){e[b]=c[a];18}}}J e}H 5z(p){8(K p==\'1y\')J[0,0,0,0];8(K p==\'13\')J[p,p,p,p];Q 8(K p==\'1k\')p=p.3v(\'7A\').6s(\'\').3v(\'7B\').6s(\'\').3v(\' \');8(!31(p)){J[0,0,0,0]}1m(F i=0;i<4;i++){p[i]=2o(p[i])}1x(p.V){W 0:J[0,0,0,0];W 1:J[p[0],p[0],p[0],p[0]];W 2:J[p[0],p[1],p[0],p[1]];W 3:J[p[0],p[1],p[2],p[1]];2w:J[p[0],p[1],p[2],p[3]]}}H 43(a,o){F x=(K o[o.d[\'S\']]==\'13\')?1L.2v(o[o.d[\'S\']]-3m(a,o,\'S\')):0;1x(o.1B){W\'1t\':J[0,x];W\'2N\':J[x,0];W\'4x\':2w:J[1L.2v(x/2),1L.3y(x/2)]}}H 4b(x,o,a,b){F v=x;8(K a==\'H\'){v=a.1z(b,v)}Q 8(K a==\'1k\'){F p=a.3v(\'+\'),m=a.3v(\'-\');8(m.V>p.V){F c=N,5q=m[0],2I=m[1]}Q{F c=O,5q=p[0],2I=p[1]}1x(5q){W\'7C\':v=(x%2==1)?x-1:x;18;W\'7D\':v=(x%2==0)?x-1:x;18;2w:v=x;18}2I=2o(2I);8(!2p(2I)){8(c)2I=-2I;v+=2I}}8(K v!=\'13\')v=1;8(v<1)v=1;J v}H 2R(x,o,a,b){J 4y(4b(x,o,a,b),o.G.12)}H 4y(v,i){8(K i.2O==\'13\'&&v<i.2O)v=i.2O;8(K i.27==\'13\'&&v>i.27)v=i.27;8(v<1)v=1;J v}H 4E(s){8(!31(s))s=[[s]];8(!31(s[0]))s=[s];1m(F j=0,l=s.V;j<l;j++){8(K s[j][0]==\'1k\')s[j][0]=$(s[j][0]);8(K s[j][1]!=\'1s\')s[j][1]=N;8(K s[j][2]!=\'1s\')s[j][2]=N;8(K s[j][3]!=\'13\')s[j][3]=0}J s}H 5k(k){8(k==\'2N\')J 39;8(k==\'1t\')J 37;8(k==\'4u\')J 38;8(k==\'6b\')J 40;J-1}H 4W(n,v){8(n)3T.2n=n+\'=\'+v+\'; 7E=/\'}H 6g(n){n+=\'=\';F b=3T.2n.3v(\';\');1m(F a=0,l=b.V;a<l;a++){F c=b[a];23(c.7F(0)==\' \'){c=c.1c(1)}8(c.32(n)==0){J c.1c(n.V)}}J 0}H 3r(p){8(p&&K p==\'1k\'){F i=(p.32(\'7G\')>-1)?N:O,r=(p.32(\'2X\')>-1)?N:O}Q{F i=r=O}J[i,r]}H 59(a){J(K a==\'13\')?a:2b}H 31(a){J K(a)==\'1o\'&&(a 64 7H)}H 2x(){J 7I 7J().2x()}H 1e(d,m){8(K d==\'1o\'){F s=\' (\'+d.3U+\')\';d=d.1e}Q{F s=\'\'}8(!d)J O;8(K m==\'1k\')m=\'1J\'+s+\': \'+m;Q m=[\'1J\'+s+\':\',m];8(3s.5r&&3s.5r.6t)3s.5r.6t(m);J O}$.1P.65=H(o,c){J 1g.1J(o,c)};$.25($.1G,{\'7K\':H(t){F a=t*t;J t*(-a*t+4*a-6*t+4)},\'7L\':H(t){J t*(4*t*t-9*t+6)},\'7M\':H(t){F a=t*t;J t*(33*a*a-7N*a*t+7O*a-67*t+15)}})})(7P);',62,486,'|||||||opts|if|||||||||||||||||||||||||||||||||var|items|function|conf|return|typeof|cf_e|itms|true|false|visible|else|scrl|width|auto|total|length|case|trigger|button|first||children|visibleConf|number|bind||css|prev|break|tt0|next|pagination|slice|variable|debug|anims|this|stopPropagation|padding|duration|string|height|for|scroll|object|pre|push|data|boolean|left|usePadding|filter|a_dur|switch|undefined|call|wrp|align|container|triggerHandler|marginRight|tmrs|easing|play|fx|carouFredSel|each|Math|circular|sz_resetMargin|eq|fn|post|cfs_origCssMargin|isScrolling|c_new|remove|queu|is|isPaused|clbk|unbind|isStopped|stopImmediatePropagation|onAfter|while|sc_setScroll|extend|outerWidth|max|Not|synchronise|sc_startScroll|null|l_cur|l_old|w_siz|onBefore|crossfade|uncover|opacity|preventDefault|direction|adjust|old|cookie|parseInt|isNaN|cf_c|c_old|pR|pauseOnHover|opts_orig|ceil|default|getTime|removeClass|nv_enableNavi|l_new|ms_getSizes|fade|cover|updatePageStatus|mousewheel|key|css_o|adj|start|responsive|outerHeight|top|right|min|hidden|gn_getVisibleItemsNext|cf_getItemsAdjust|addClass|pause|startTime|cf_sortParams|scrolling|resume|last|slideTo||is_array|indexOf||_cfs_triggerEvent|innerWidth|ms_getTrueInnerSize||||parent|hide|show|gi_getCurrentItems|minimum|anchorBuilder|pauseDuration|Carousel|sc_clearTimers|events|queue|infinite|ms_getTotalSize|gn_getItemIndex|jquery|nv_showNavi|event|bt_pauseOnHoverConfig|window|ns2|ani_o|split|currentPosition|ms_getTrueLargestSize|floor|of|maxDimention|gn_getVisibleItemsNextFilter|go_getNaviObject|position|sc_stopScroll|timePassed|perc|100|dur2|prefix|appendTo|apply|sc_callCallbacks|currentPage|before|sz_setSizes|vI|touchwipe|wN|document|selector|_cfs_init|go_getObject|marginBottom|ms_isPercentage|ms_getPercentage||to|org|cf_getAlignPadding|keys|pauseOnEvent|Number|none|stopped||gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|orgW|isHidden|cf_mapWrapperSizes|get|end|eval|mouseenter|mouseleave|serialNumber|cur_l|di|sz|element|cfs_isCarousel|defaults|upDateOnWindowResize|up|ms_hasVariableSizes|valid|center|cf_getItemAdjustMinMax|seco|nw|bottom|delay|pauseOnResize|cf_getSynchArr|scrolled|backward|textAlign|float|marginTop|marginLeft|absolute|_cfs_unbind_events|stop|finish|type|conditions|gn_getVisibleOrg|not|fx_cover|fx_uncover|orgDuration|cf_setCookie|gn_getVisibleItemsNextTestCircular|gi_getOldItemsNext|gi_getNewItemsNext||slideToPage|updateSizes|linkAnchors|_cfs_bind_buttons|click|_cfs_unbind_buttons|mousewheelPrev||bt_mousesheelNumber|mousewheelNext|wipe|_windowWidth|_windowHeight|ns3|wrapper|continue|classnames|new_w|old_w|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|ms_getLargestSize|toLowerCase|arr|sta|console|No|destroy|innerHeight|dx|Set|secp|ms_getPaddingBorderMargin|cf_getPadding|500|pageAnchorBuilder|Item|forward|_cfs_build|fixed|cfs_origCss|_cfs_bind_events|paused|onPausePause|onPauseEnd|onPauseStart|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|shift|gn_getScrollItemsNextFilter|new_m|jumpToStart|after|append|removeItem|instanceof|caroufredsel|hash||index|selected|gn_getVisibleItemsPrevFilter|down|keyup|keyCode|configs|classname|cf_readCookie|random|itm|onCreate|namespace|span|animate|complete|cfs_tempCssMargin|s2|l1|l2|join|log|found|the|Infinity|Width|caroufredsel_cookie_|attr|id|2500|Available|widths|heights|automatically|relative|overflow|setTimeout|or|Page|resumed|currently|Callback|returned|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|add|detach|round|currentVisible|body|find|Preventing|non|sliding|replaceWith|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|resize|timer|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|clearTimeout|fx_fade|hiding|navigation|disabled|paddingLeft|paddingRight|paddingTop|paddingBottom|outer|inner|px|em|even|odd|path|charAt|immediate|Array|new|Date|quadratic|cubic|elastic|106|126|jQuery'.split('|'),0,{}));/* jquery.history.js */
window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window);/* selectbox.js */
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
            if( i === undefined || i === 'NaN'){
                return;
            }
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
            var pos  = $jc.intval(this.list[0].style[this.lt]);

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
                if(this.options.defaultItemWidth) {
                    d = this.options.defaultItemWidth;
                }
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
			this.webSearchBtn.unbind().bind('click', $.proxy(function(e) {
				var query = $(e.target).closest('.search').find('input.query').focus().val();
				if(query) {
					window.open(config.getSiteSearchEngine() + query.replace(/ /g,"+"));
				}
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
			if (typeof (this.options.loadTweets) == 'function') {
				this.options.loadTweets($(elm));
			} else {
				this.loadTweets($(elm));
			}
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

}) (jQuery);/* social_proxy.js */
(function($) {
	$Crabapple.SocialProxy = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.SocialProxy, {
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
			function socialProxyCallback(d) { return d; }
			jQuery.ajax ({
				url: feedUrl,
				dataType: 'jsonp',
				jsonpCallback: 'socialProxyCallback',
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
	$Crabapple.FluxWidget.requestCommentsRiver = function (maxResults, contentId, func) {
		var includeChildren = false;
		if(maxResults == null && isNaN(maxResults = parseInt(maxResults))){	maxResults="2";	}
		if(contentId){
			includeChildren = true;
		}
		if(typeof(contentId) == 'undefined'){
			contentId='';
		}
		$.ajax({
			url: config.getFluxActivityBaseHref()+'/api/ActivityService/FindActivities?communityId=' + config.getFluxCommunityId() + '&contentId='+contentId+'&dashboardShowAllCommunities=false&dashboardShowCommunityFeed=false&dashboardShowOnlyFollowFeed=false&activityType=&activityFeedFilter=Comments&maxResults='+maxResults+'&cultureLcid=0&nextPageToken=&sortByTopCounter=false&untilPageToken=&includeChildren='+includeChildren+'&includeTweets=true&includeGuestActivities=false&includeRating=true&showParentAddedChild=false&contentAliases=&popularActivitiesCount=0&popularActivitiesType=CommentContent',
			// test url for -d testing m033 custom ENTREQ-4373//url: "http://activity.flux.com/api/ActivityService/FindActivities?communityId=B8F6FFFF0099CA9B0002FFFFF6B8&contentId=" + contentId + "&dashboardShowAllCommunities=false&dashboardShowCommunityFeed=false&dashboardShowOnlyFollowFeed=false&activityType=&activityFeedFilter=Comments&maxResults=5&cultureLcid=0&nextPageToken=&sortByTopCounter=false&untilPageToken=&includeChildren=true&includeTweets=true&includeGuestActivities=false&includeRating=true&showParentAddedChild=false&contentAliases=&popularActivitiesCount=0&popularActivitiesType=CommentContent",
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
			//changed from delegate as it was uneccessary
			$(block).find("a").click(function(e){
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
			
			var autoPlay = $(elm).attr('data-autoplay');
			var endCapAutoPlay = $(elm).attr('data-endcapautoplay');
			var nextvideo = $(elm).attr('data-nextvideo');
			var configParams = escape("site=" + config.getMediaConfigParamSite());
			if (config.getMediaFreewheelNID) {
				configParams += escape("&nid=" + config.getMediaFreewheelNID());	
			}
			var siteSectionId = $(elm).attr('data-sitesectionid');
			
			//this code is needed to preserve compatibility with other sites that use this js
			if(!siteSectionId){
				if(window.siteSectionId){
					siteSectionId = window.siteSectionId;
				}else{
					siteSectionId = 'Unknown_ComedyCentral';
				}
			}
			
			//if (typeof(siteSectionId) == 'undefined') { siteSectionId = 'Unknown_ComedyCentral'; }
		
			var flashvars = { sid:siteSectionId, autoPlay:autoPlay, endCapAutoPlay:endCapAutoPlay, configParams:configParams, nextvideo: nextvideo };

		
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

			var my_player = this.player[$(elm).attr('id')] = new MTVNPlayer.Player($(elm).attr('id'),
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
					onPlaylistComplete:this.onPlaylistComplete,
					onFullScreenChange:this.onFullScreenChange
				}		
				

			);
			
			//stuff for the do seek support
			var total_duration = null;
			var url_seek_processed = false;
			//adding support for seeks
			my_player.bind('onMediaStart',function(evt){
				if(url_seek_processed){
					return;
				}
				var duration = total_duration;
				if(total_duration == null){
					var query = window.location.search.substring(1);
					var vars = query.split('&');
					var duration = null;
					for(var i = 0; i < vars.length; i++){
						var pair = vars[i].split('=');
						if(decodeURIComponent(pair[0]) == "start") {
							duration = decodeURIComponent(pair[1]);
						}
					}
					if(duration == null){
						return;
					}
					duration = new Number(duration);
					duration = total_duration = duration.toString();
				}
				
				var data = my_player.currentMetadata;
				if(data.isAd || data.isBumper || data.isLive){
					return;
				}
				
				if(duration.toString() == "NaN" || duration < 0){
					return;
				}
				if(data.duration >= duration){
					url_seek_processed=true;
					my_player.seek(duration);
				}else{
					my_player.seek(data.duration);
					total_duration -= data.duration;
				}
			});
			
			return this.player;
				
			//**********************			
			
		},
	
		onReady:function(event){},				
		onMetadata:function(event){},	
		onMediaEnd:function(event){},		
		onPlayheadUpdate:function(event){},	
		onStateChange:function(event){},
		onPlaylistComplete:function(event){},
		onFullScreenChange:function(event){}
	});

	$.pluginize('player', $Crabapple.Player, $Crabapple);

}) (jQuery);/* super_footy.js */
/**
 * Used by http://confluence.mtvi.com/display/ENT/SuperFooty+-+Functional+Spec
 * @author: $author$
 */

var superFooty = {
	playerVisible : true,
	raisePlayer : "+=300",
	lowerPlayer : "-=300",
	presentSuperfooty : "+=383",
	playerLowered : "-296px",
	animationDuration : 2000,

	init : function() {
		this.getPlayers();
		
		$('.super_footy .player_button_holder .button_holder').click(function () {
			superFooty.raiseLowerPlayer();
		});
		
		var fn = this.msg;
		if ($.cookie("super_footy") != '' && $.cookie("super_footy") != "seen"){
			$.cookie("super_footy", "seen", { expires: 1 });
			fn = function(){ superFooty.reorder(15,16) };
			this.closeButton("up");
		}else{
			this.setPlayerDown();
		}
		this.animate('.super_footy .middle', this.presentSuperfooty, fn);		
	},

	raiseLowerPlayer : function(){
		try{
			this.super_footyPlayer.pause();
		}catch(e){ this.msg ("no player yet") }
		var direction = this.playerVisible ? this.lowerPlayer : this.raisePlayer;
		var fn = this.msg;
		if (direction == this.lowerPlayer){
			this.reorder(5,3);
			fn = function(){superFooty.closeButton("down");}
		}else{
			fn = function(){ superFooty.reorder(15,16); superFooty.pausePlayer();superFooty.closeButton("up"); };
		}
		this.animate('.super_footy .player_button_holder', direction, fn);
		this.playerVisible = !this.playerVisible;
	},
	
	closeButton : function(whichWay){
		if (whichWay == "down"){
			$('.super_footy .button_holder').removeClass('top');
		} else {
			$('.super_footy .button_holder').addClass('top');
		}
	},
	
	reorder : function (holder, promo){
		this.setZIndex('.video_player_holder', holder);
		this.setZIndex('.promo', promo);
	},
	
	getPlayers : function (){
		var players = MTVNPlayer.getPlayers();
		this.super_footyPlayer = this.determinePlayer(players,"super_footy_video_player_box");
		
		if (players.length > 1){
			this.msg ("binding event to superfooty");
			this.otherPlayer = this.determinePlayer(players,"video_player_box");
			this.super_footyPlayer.bind ("onStateChange",function(state){ 
				superFooty.pausePlayer();
			});
			
			this.bindPauseToPlayer();
		};
		
	},
	
	determinePlayer: function (players,whichOne){
		for (var x = 0; x < players.length; x++){
			if (players[x].id == whichOne){
				this.msg ("matched " + whichOne + " " + x)
				return players[x];
			}
		}
		this.msg (whichOne + " not found");
		return null;
	},
	
	bindPauseToPlayer : function(){
		this.msg ("trying to binding event handler to player");
		if (typeof this.otherPlayer == "object") {
			this.msg ("BINDING event to player");
			this.otherPlayer.bind ("onStateChange",function(state){ 
				superFooty.super_footyPlayer.pause();
			});
		}
	},
	
	pausePlayer: function (){
		if (typeof this.otherPlayer == "object"){
			this.msg ("pausing other player");
			this.otherPlayer.pause();
		};
	},

	setZIndex : function (whichObj, toWhat){
		$('.super_footy ' + whichObj).css({ "z-index" : toWhat });
	},

	setPlayerDown : function (){
		$('.super_footy .player_button_holder').css({ "bottom": this.playerLowered });
		this.closeButton("down");
		this.playerVisible = false;
	},

	animate : function (what, howMuch, fn){
		 $(what).animate({
		    bottom: howMuch
		  	}, this.animationDuration, fn
		  );
	},

	msg : function (txt) {
		if (typeof console != "undefined"){
			console.info (txt);
		}
	}

}
		
$(function () {
	if($('.super_footy').length > 0) superFooty.init();
});/* web_show-video_carousel.js */
/**
 * You should define _createItemHtml and _makeFakeUrl
 * functions when you will extend from this module.
 * required options: ajaxUrl
 * optional option: _showShareDropdown
 **/
(function($) {
	$Crabapple.WebVideoCarousel = function () {};

	$Crabapple.extend($Crabapple.Module, $Crabapple.WebVideoCarousel, {
		
		players: {},

		init: function() {
			var self = this;
			if ($(this).data('initialized')) { return; }
			$(this).data('initialized','true');
			this._cacheDOMElements();
			this._initHistory();
			this._initCarousel();
			this._addEventHandlers();
			setTimeout(function(){
				self._initPlayerHandler();
			}, 10000);
		},


		_cacheDOMElements: function() {
			this.options.notSendAjax = false;
			//here is the objects
			this.module = $(this.elem);
			this.ajaxSpinner = this.module.find('.ajax_spinner');
			//css classes
			this.currentClass = 'current';
			this.blankClass = 'blank';
			this.openArrowClass = 'opened';
			//here is the jquery selectors
			this.previousLink = '.previous';
			this.nextLink = '.next';
			this.videoContainer = '.videoWrapper';
			this.videoThumbnail = this.videoContainer + ' img';
			this.player = '#video_player_box';
			this.playBtn = '.videoWrapper .arrow';
			this.currentItem = '.' + this.currentClass;
			this.loadDescriptionLink = '.load_description';
			this.descriptionContent = '.meta';
			this.loadFbCommentsLink =  '.load_comments';
			this.fbComments = '.fb-comments';
			this.shareBtn = '.share_button_container .share_button';
			this.shareDropdown = '.share_button_dropdown';
			this.triangleArrow = '.triangle';
		},

		_initCarousel: function() {
			var self = this,
				$startItem = this.module.find(this.currentItem).prev();
			this.module.carouFredSel({
				items: {
					visible: 3,
					start: $startItem,
					height: 'variable'
				},
				scroll: {
					onBefore: function(oldItems, newItems) {
						var $current = $(newItems[1]);
						if (self.options.notSendAjax) {
							self.options.notSendAjax = false;
							self._replacePlayer($current.find(self.videoThumbnail));
						} else {
							self.ajaxSpinner.show();
							self.options.History.pushState({
								'videoId': $current.attr('id')
							}, null, self._makeFakeUrl($current.data('url')));
						}
					},
					items: 1
				},
				auto: false,
				prev: this.previousLink,
				next: this.nextLink,
				height: 'variable',
				circular: false,
				infinite: false
			});
		},

		_hidePlayer: function($item) {
			$item.find(this.player).remove();
			$item.find(this.videoThumbnail).show();
			$item.find(this.playBtn).show();
		},

		_initPlayerHandler: function() {
			MTVNPlayer.onPlayer(function (player) {
				player.bind('onPlaylistComplete', function() {
					self.module.trigger('slideTo', [self.module.find(this.currentItem), 1]);
				});
			});
		},

		_initHistory: function() {
			var self = this;
			this.options.History = window.History;
			this.options.History.Adapter.bind(window,'statechange',function() {
				var State = self.options.History.getState();
				self._sendAjax(State.data.videoId);
			});
		},

		_addEventHandlers: function() {
			var self = this;
			this.module.delegate(this.loadDescriptionLink, 'click', function(event) {
				self._loadContent($(this), event, self.descriptionContent);
			});
			this.module.delegate(this.loadFbCommentsLink, 'click', function(event) {
				self._loadContent($(this), event, self.fbComments);
			});
			this.module.delegate(this.videoContainer, 'click', function() {
				if (!$(this).find(self.player).length) {
					self._replacePlayer($(this));
				}
			});
			this.module.find(this.shareBtn).unbind('click');
			this.module.delegate(this.shareBtn, 'click', function(event) {
				self._initSharing(event, $(this));
			});
			this._addFbEventHandlers();	
},

		_addFbEventHandlers: function() {
			var self = this;
			setInterval(function () {
				self._resizeFbComments();
			}, 500);
		},

		_resizeFbComments: function() {
			var $carousel = this.module.parent(),
				height = $carousel.height(),
				currentHeight = this.module.find(this.currentItem).height();
			if (currentHeight != this.visibleHeight) {
				$carousel.height(height + currentHeight - this.visibleHeight);
				this.visibleHeight = $carousel.height();
			}
		},

		_initSharing: function(event, $elem) {
			var timeout = null,
				self = this;
			event.preventDefault();
			$elem.toggleClass('openButton');
			if (!this.options.excepted_elem) {
				this.options.excepted_elem = $elem.next()
					.addClass('web_carousel_sharing')
					.hide();
				$('#content_holder').append(this.options.excepted_elem);
			}
			// dynamically adjust position of share dropdown
			if (typeof this.options._showShareDropdown == 'function') {
				this.options._showShareDropdown(this.options.excepted_elem);
			} else {
				this.options.excepted_elem.slideToggle();
			}
			$(this.shareDropdown + ', ' + this.shareBtn).hover(function() {
				clearTimeout(timeout);
			}, function(){
				if(self.options.excepted_elem){
					timeout = setTimeout(function() {
						$elem.removeClass('openButton');
						self.options.excepted_elem.hide();
					}, 500);
				}
			});	
		},

		_replacePlayer: function($videoWrapper) {
			var html = $videoWrapper.html(),
				id = $videoWrapper.parent().attr('id');
			$videoWrapper.html(html + this.players[id]);
			$videoWrapper.find('img').hide();
			$videoWrapper.find('.arrow').hide();
		},

		_makeFakeUrl: function(link) {
			return link;
		},

		_loadContent: function($link, event, selector) {
			var $content = $link.parent().parent().find(selector),
				$carousel = this.module.parent(),
				height = $carousel.height();
			event.preventDefault();
			$link.find(this.triangleArrow).toggleClass(this.openArrowClass);
			if ($content.hasClass('hidden')) {
				$carousel.height(height + $content.outerHeight());
			} else {
				$carousel.height(height - $content.outerHeight());
			}
			this.visibleHeight = $carousel.height();
			$content.toggleClass('hidden').toggleClass('shown');
		},

		_sendAjax: function(videoId) {
			var self = this,
				feedUrl;
			if (typeof this.options.ajaxUrl == 'function') {
				feedUrl = this.options.ajaxUrl() + videoId;
			} else {
				feedUrl = this.options.ajaxUrl + videoId;
			}
			if (this.options.xhr && this.options.xhr.readyState != 4) {
				this.options.xhr.abort();
			}
			this.options.xhr = $.ajax({
				url: feedUrl,
				success: function(data) {
					self._ajaxSuccess(data);
				}
			});
		},

		getVideoById: function(videoId, url) {
			this.ajaxSpinner.show();
			this.options.notSendAjax = true;
			this.options.History.pushState({
				'videoId': videoId
			}, null, this._makeFakeUrl(url));
		},

		_ajaxSuccess: function(data) {
			this.ajaxSpinner.hide();
			var jsonObj = $.parseJSON(data),
				isScroll = false;
			this._storePlayers(jsonObj);
			this.module.find(this.triangleArrow + '.'  + this.openArrowClass).click();
			this._addItems(jsonObj, this.options.notSendAjax);
		},

		_addItems: function(jsonObj, isScroll) {
			this._addCarouselItem(jsonObj.currentVideo, true);
			if (jsonObj.nextVideo) {
				for (video in jsonObj.nextVideo) {
					this._addCarouselItem(jsonObj.nextVideo[video], false);
				}
			}
			if (jsonObj.previousVideo) {
				for (video in jsonObj.previousVideo) {
					this._addCarouselItem(jsonObj.previousVideo[video], false);
				}
			}
			if (isScroll) {
				this.module.trigger('slideTo', this.module.find(this.currentItem).prev());
			}
			FB.XFBML.parse();
			this._initEmbedBtn();
		},

		_addCarouselItem: function(videoObject, isCurrent) {
			var $container = $('#' + videoObject.id),
				$oldItem;
			if ($container.hasClass(this.blankClass)) {
				$container.removeClass(this.blankClass).data('url', videoObject.url);
				$container.html(this._createItemHtml(videoObject));
			}
			if (isCurrent) {
				$oldItem = this.module.find(this.currentItem);
				$oldItem.removeClass(this.currentClass);
				this._hidePlayer($oldItem);
				$container.addClass(this.currentClass);


			}
		},

		_createItemHtml: function(video) {
			return '';
		},

		_storePlayers: function(jsonObj) {
			this._savePlayerForVideos(jsonObj.nextVideo);
			this._savePlayerForVideos(jsonObj.previousVideos);
			if (!this.players[jsonObj.currentVideo.id]) {
				this.players[jsonObj.currentVideo.id] = jsonObj.currentVideo.player;
			}
		},

		_savePlayerForVideos: function(videosObject) {
			if (videosObject) {
				for (video in videosObject) {
					if (!this.players[videosObject[video].id]) {
						this.players[videosObject[video].id] = videosObject[video].player;
					}
				}
			}
		},
		
		_initEmbedBtn: function() {
			$(".ec_text_response").hide();
			$(".ec_text").show();
			var unsetEmbeds = $('.share_bar .embed_btn:visible').not(':has(embed,object)');
			if (unsetEmbeds.length > 0) {
				unsetEmbeds.each(function(){
					$(this).sharebar();
				});
			}
		}
	});
}) (jQuery);
/* preferences_check.js */
$(document).ready(function(){
	var timeout = new Date();
	timeout.setMinutes(timeout.getMinutes()+30);
	timeout = timeout.getTime();
	//check to see if the language settings are changing over time
	if(typeof Storage == 'undefined' || typeof config.getNiagaraActivityHomeURL == 'undefined') return;
	var lang = localStorage.getItem('_lang');
	if(lang != null){
		langtime = lang.split('|');
		if(langtime.length == 2){
			var testDate = new Date();
			testDate.setTime(langtime[1]);
			if(testDate > new Date()){
				if(langtime[0] == 'EN-US'){
					$(document).trigger('H.E.M.');
				}
				return;
			}
		}
	}
	//in case we need to support flash videos by language
	$.ajax({ url:"http://140cc.v.fwmrm.net/ad/l/1?s=",dataType:'html',error:function(){
		localStorage.setItem('_lang','EN-US|'+timeout);
		$.ajax({ url:config.getNiagaraActivityHomeURL()+'feeds/events/preferences',method:'GET',data:{ site:window.location.hostname,lang:'EN-US' }, dataType:'script' });
		$(document).trigger('H.E.M.');
	},success:function(){
		localStorage.setItem('_lang','EN|'+timeout);
		$.ajax({ url:config.getNiagaraActivityHomeURL()+'feeds/events/preferences',method:'GET',data:{ site:window.location.hostname,lang:'EN' }, dataType:'script' });
	} });
});/* overlay.js */
/**
 * Crabapple Entertainment Overlay Code
 * 
 * While originally spec'd for CC, this is a crabapple entertainment level overlay
 * suitable for use on other sites. It is based on Jessica Kosturko's code for the 
 * roast but pluginized for Crabapple Entertainment.
 * 
 * The screen is the black transparent overlay that covers the entire site. The holder
 * is a wrapper around the payload (which contains an image or something). This is
 * for auto-redirecting overlays but can be adjusted to do whatever else is necessary.
 * 
 * Built to work with controller \Crabapple_Entertainment\Controllers\Fragments\Overlay
 * 
 * @author: $author$
 * @functional: http://confluence.mtvi.com/display/ENT/EN+2012+-+CTA+Overlay
 */
(function($) {
	$Crabapple.Overlay = function(){};
	
	$Crabapple.extend($Crabapple.Module, $Crabapple.Overlay, {
		
		init: function (elm, options) {
			 
			var delay = parseInt($(elm).data("delay"));
			if (!delay)
			{
				delay = 0;
			}
				
			var startTime = parseInt($(elm).data("start"));
			var endTime = parseInt($(elm).data("end"));
			

			var newDay = new Date();
			var now = Date.UTC(
					newDay.getUTCFullYear(),
					newDay.getUTCMonth(),
					newDay.getUTCDate(),
					newDay.getUTCHours(),
					newDay.getUTCMinutes(),
					newDay.getUTCSeconds()
			);
			
			if (now < startTime)
			{
				return;
			}
			else if (now > endTime)
			{
				return;
			}
			
			if (!delay)
			{
				this.showOverlay();
			}
			else
			{
				setTimeout(this.showOverlay, delay);
			}
		},
		
		//Showing the overlay can appear on a delay, but most likely doesn't
		showOverlay: function() {
			
			var shouldRedirect = $(".overlay_holder").data("toggle");
			
			if ($(".overlay_holder").data("cookie") && typeof($.cookie) != "undefined")
			{
				if ($.cookie("crabappleOverlay"))
				{
					return;
				}
				
				$.cookie("crabappleOverlay", 1, {
					path: "/"
				});
			}
			
			$(".overlay_screen").css({opacity: 0.5, "width":$(document).width(),"height":$(document).height()});
			
			$(".overlay_screen").fadeIn("slow", shouldRedirect ? this.onFadeInComplete : function(){} );
			$(".overlay_payload").fadeIn("slow");
			
			$(".close").css({"display": "block"});
			
			//Stay on current page
			$(".overlay_holder, .close, .overlay_screen").click(this.onCloseOverlayClick);
			
			//For Tracking purposes, stop event propagation
			//(so that clickthru and stay_here aren't tracked at the same time)
			//$("a[href]").click(function(event){ this.preventBubbledEvents(event) });
			
			$(window).resize(this.onWindowResize);
			
			this.onWindowResize();
		},
		
		//When the window resizes, we should adjust the screen size and the payload position
		onWindowResize: function() {
			if ($(".overlay_payload").css("display") == "block")
			{
				$(".overlay_screen").css("width", "100%")
				
				var valign = ($(window).height() - $(".overlay_payload").outerHeight())/2;
				valign = (valign > 0)?valign: 0;
				
				var halign = ($(window).width() - $(".overlay_payload").outerWidth())/2;
				halign = (halign > 0)?halign: 0;
				
				$(".overlay_payload").css({
					top:valign,
					left:halign
				});
			}
		},
		
		//When the fade in is done, the count-down begins
		onFadeInComplete: function() {
			
			var overlay = $(".overlay_holder");
			
			var timeout = parseInt(overlay.data("timeout"));
			
			if (!timeout)
			{
				timeout = 5000;
			}
			else
			{
				//User probably entered "seconds" in ISIS, so convert to milli
				if (timeout < 1000)
				{
					timeout *= 1000;
				}
			}
					
			if (overlay.data("redirect"))
			{
				setTimeout(function(){
					if ($(".overlay_screen").css("display")=="block" && $(".overlay_holder").data("toggle")) 
					{	
						//Tracking: Users who are redirected
						autoLinkTrackEvent("overlay_redirected", $(".overlay_holder").data("redirect"));
						
						window.location.href = $(".overlay_holder").data("redirect");
						//this.preventBubbledEvents();
					}
				}, timeout);
			}
		},
		
		onCloseOverlayClick: function(event) {
			$(".overlay_payload, .overlay_screen").css("display", "none");
			$(".overlay_holder").data("toggle", "false");
			
			//$(this).css("display", "none");
			//this.preventBubbledEvents(event)
		},
		
		//Disabling other clicking for tracking purposes
		preventBubbledEvents: function(event) {
			if (event)
				event.stopPropagation();
			
			$(".overlay_holder").data("toggle", "false");
			
			//Disabling other clicking for tracking purposes 
			$(".close, .overlay_payload, .overlay_payload a").unbind("click");
			$(".overlay_payload").children("a[href]").click(function(event) {event.preventDefault();});
		}

	});
	
	$.pluginize("overlay", $Crabapple.Overlay, $Crabapple);
	
}) (jQuery);

/* cc.js */
/**
 * Creates $CC global object which will hold all CC javascript stuff
 */
(function($) {
	$CC = $.namespace('CC'); 
}) (jQuery);/* ZeroClipboard.js */
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
/* cc.auction.js */
$CC.Auction = function() {};

$Crabapple.extend($Crabapple.Module, $CC.Auction, {
	elm: null,
	init: function(elm, options) {
		var na = this;
		na.elm = $(elm);
		na.addShareEvents();
		na.addLinkEvents();
	},
	addShareEvents: function() {
		var na = this;
		var title = na.elm.find(".header h2").text();
		var escapedTitle = title.replace(/[^a-zA-z]+/g, '').toLowerCase();
		var image = na.elm.find(".image-holder img").attr("src");
		var copy = na.elm.find("p").text();
		
		na.elm.find("a.facebook").bind('click', function(event) {
			event.preventDefault();
			na.sendLinkEvent('share', 'share_fb', escapedTitle);
			var obj = {
				method: 'feed',
				link: $(this).attr("href"),
				picture: image,
				name: 'Celebrity Auction: ' + title,
				description: copy + ' Night of Too Many Stars Celebrity Auction presented by GEICO.'
			};
			FB.ui(obj, function(response) {});
		});
		na.elm.find("a.pinterest").bind('click', function(event) {
			event.preventDefault();
			var title = na.elm.find(".header h2").text();
			var escapedTitle = title.replace(/[^a-zA-z]+/g, '').toLowerCase();
			var image = na.elm.find(".image-holder img").attr("src");
			var copy = 'Now up on the auction block in the Night of Too Many Stars Celebrity Auction presented by GEICO: ' + title;
			var link = $(this).attr("href");
			na.sendLinkEvent('share', 'share_pinterest', escapedTitle);
			window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(link) + '&media=' + encodeURIComponent(image) + '&description=' + copy);
		});
		na.elm.find("a.tumblr").bind('click', function(event) {
			event.preventDefault();
			var title = na.elm.find(".header h2").text();
			var escapedTitle = title.replace(/[^a-zA-z]+/g, '').toLowerCase();
			var image = na.elm.find(".image-holder img").attr("src");
			var copy = 'Now up on the auction block in the Night of Too Many Stars Celebrity Auction presented by GEICO: ' + title;
			var link = $(this).attr("href");
			na.sendLinkEvent('share', 'share_tumblr', escapedTitle);
			window.open('http://www.tumblr.com/share/photo?source=' + encodeURIComponent(image) + '&clickthru=' + encodeURIComponent(link) + '&caption=' + copy);
		});
		na.elm.find("a.twitter").bind('click', function(event) {
			event.preventDefault();
			var title = na.elm.find(".header h2").text();
			var escapedTitle = title.replace(/[^a-zA-z]+/g, '').toLowerCase();
			var image = na.elm.find(".image-holder img").attr("src");
			var copy = 'Bid now on ' + title + ' in the #2manystars Celebrity Auction presented by @GEICO!';
			var link = $(this).attr("href");
			na.sendLinkEvent('share', 'share_twitter', escapedTitle);
			window.open('http://twitter.com/share?url=' + encodeURIComponent(link) + "&text=" + encodeURIComponent(copy));
		});
	},
	addLinkEvents : function() {
		var na = this;
		na.elm.find("a.bid-now").bind('click', function(event) {
			var title = na.elm.find(".header h2").text();
			var escapedTitle = title.replace(/[^a-zA-z]+/g, '').toLowerCase();
			na.sendLinkEvent('NOTMS_bid_'+ escapedTitle, 'NOTMS_bid_' + escapedTitle, '');
		});
		
		$("a[href='https://newyorkcenterforautism.org/secure/donation_notms.php?source=NOTMS']").bind('click', function(event) {
			na.sendLinkEvent('NOTMS_donate', 'NOTMS_donate', '');
		});
	},
	sendLinkEvent: function(text, item, service) {
		if (typeof(mtvn) != 'undefined') {
			if (text == "share") {
				mtvn.btg.Controller.sendLinkEvent({
					linkName:text,
					linkType:'o',
					eVar9:pageName,
					events:'event9',
					eVar16:service,
					eVar19:item
				});
			}
			else {
				mtvn.btg.Controller.sendLinkEvent({
					linkName:text,
					linkType:'o',
					eVar9:pageName,
					events:'event9',
					eVar16:item
				});
			}
				
		}
	}
});
$.pluginize('auction', $CC.Auction, $CC);
$(function() {
	if ($(".notms-auction-item").length) {
		$CC(".notms-auction-item").auction();
	}
});/* cc.collection_player.js */
/* cc.collection_player.js */
var collectionPlayer = {
	current : 0,
	player : null,
	init : function () {

		// onload, show current video meta data
		this.current = $('.meta_holder').attr('data-current');

		meta_class = "#meta_" + this.current;
		current_meta = "#meta_bottom_" + this.current;

		$(meta_class).show();
		$(current_meta).addClass("current");

		$(".meta_bottom_holder a").live('click', function (event) {
			collectionPlayer.videoClick(this);
			event.preventDefault();
		});

		this.player = $Crabapple.playerA.player.video_player_box;
		/*
		player.events = {
			onReady:collectionPlayer.onPlayerLoaded,
			onStateChange:collectionPlayer.onStateChange
		};
		*/

		//Player API updated.  New Way to bind Events.  See http://mtvn-player.github.com/embed-api/docs/#!/api/MTVNPlayer.Events
		this.player.bind("onReady", collectionPlayer.onPlayerLoaded);
		this.player.bind('onIndexChange', collectionPlayer.onIndexChange);
		//player.bind("onStateChange", collectionPlayer.onStateChange);
	},

	onPlayerLoaded : function() {
		//alert("playing!");
		//collectionPlayer.playVideo(current);
	},

	onIndexChange : function(event) {
		collectionPlayer.current = event.data;
		collectionPlayer.highlightCurrent();
	},

	videoClick : function (elm) {
		this.current = $(elm).parents("li").attr('data-current');
		this.playVideo(this.current);
	},

	highlightCurrent : function () {
		var current_id = "#meta_" + this.current;
		var current_meta_id = "#meta_bottom_" + this.current;
		var current_page = this.current + 1;
		$(".video_description").hide();
		$(current_id).show();
		$(".collection_showcase li").removeClass("current");
		$(current_meta_id).addClass("current");
		$("#collection_page_count").html(current_page);
	},

	playVideo : function (index) {
		this.player.playIndex(index);
	}
};

$(function() {
	if ($(".module.collection-collection_player").length) {
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
			// Do not fire Facebook standard click event if turned off by div class name 
			if (!$(widget.dom.parentElement).hasClass('noAutoLinkReportingFacebook')) {
				console.log(href);
				console.log(widget);
				shareBarLinkTracking('fblike');
			}
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

		updateCommentsDisplay: function (widget) {	
			$Crabapple.FluxWidget.requestContentFeed(widget.attr('data-contentUri'), function (data) {
				if (data.NumberOfComments == 1) {
					$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comment');
				} else {
					$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comments');
				}
			});
		},
			
		afterLoadWidgets: function (widgetObj, widget) {
			if (widget.children().length) {

				// set comments amount
				if ($('.activityFeed', widget).length) {
					
					widgetObj.onDeleted = function() {
						$Crabapple.FluxWidget.requestContentFeed(widget.attr('data-contentUri'), function (data) {
							if (data.NumberOfComments == 1) {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comment');
							} else {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comments');
							}
						});
					};
					
					widgetObj.onCommented = function() {
						$Crabapple.FluxWidget.requestContentFeed(widget.attr('data-contentUri'), function (data) {
							if (data.NumberOfComments == 1) {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comment');
							} else {
								$('.header', widget.parents('.module')).text(data.NumberOfComments + ' Comments');
							}
						});
						
						// Add Reporting Callback Function
						if (typeof handleFluxWidgetReporting(widget) !== 'undefined') {
							handleFluxWidgetReporting(widget);
						}
					};	

					// post comments amount on load
					this.updateCommentsDisplay(widget);
				}
			} else {
				setTimeout($.proxy(function() {this.afterLoadWidgets(widgetObj, widget);}, this), 500);
			}
		},

		init: function (widget, options) {
			
		},

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
	
	$CC('.comments_count:visible').each(function (index, comments_count) {
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
	
	var destinationUrl = (typeof obj.href != 'undefined') ? obj.href : '';

	if (String(obj.state) == 'on') {
		var googleShareServiceReportingName = 'google1';
		
		//Note on this page currently google +1 is ONLY available in a video lightbox share bar
		if ( $('body').attr('id') == 'cc_studios_refresh_homepage' ) { 
			mosiacShareBarTracking(googleShareServiceReportingName,'lightbox' , destinationUrl );
			
		} else {
			shareBarLinkTracking(googleShareServiceReportingName, destinationUrl);
		}
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

var CCminiPlayer = {

		module: null,

		thumbnails: null,
		
		currentVideoIndex: 0,

		miniPlayer: null,

		init : function (moduleName, playerInstance) {

			this.module = $(moduleName);
			this.thumbnails = this.module.find(".video_thumb");
			this.miniPlayer = playerInstance;
			this.highlightCurrent(this.currentVideoIndex);
			//Player API updated.  New Way to bind Events.  See http://mtvn-player.github.com/embed-api/docs/#!/api/MTVNPlayer.Events
			this.miniPlayer.bind("onReady", CCminiPlayer.onPlayerLoaded);
			this.miniPlayer.bind("onIndexChange", CCminiPlayer.onIndexChange);
		},
		
		onPlayerLoaded : function() {
			CCminiPlayer.thumbnails.live('click', function () {
				CCminiPlayer.videoClick(this);
				return false;
			});
		},
		
		onIndexChange: function(event){
			CCminiPlayer.highlightCurrent(event.data);
		},

		videoClick : function (video) {
			var index = video.getAttribute("data-videoindex");
			CCminiPlayer.playVideo(index);
		},

		highlightCurrent : function (index) {
			CCminiPlayer.thumbnails.removeClass("current");
			$(this.thumbnails[index]).addClass("current");
		},
		
		playVideo : function (index) {
			CCminiPlayer.miniPlayer.playIndex(index);
			CCminiPlayer.highlightCurrent(index);
		}
};

$(function() {
	if ($(".module.miniplayer").length) {
		CCminiPlayer.init(".module.miniplayer", $Crabapple.playerA.player.video_player_box);
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
				/*
				$video_player.events.onPlaylistComplete	= function(){
					window.location.href = nextURL;
				}
				*/
				
				//Player API updated.  New Way to bind Events.  See http://mtvn-player.github.com/embed-api/docs/#!/api/MTVNPlayer.Events
				$video_player.bind("onPlaylistComplete",function(event) {
					window.location.href = nextURL;
				 });
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
$CC.ShareBar = function() {};

$Crabapple.extend($Crabapple.Module, $CC.ShareBar, {
	init: function(elm, options) {
		if ($('body#ccsu').length) {
			$('.fb-like').attr("data-colorscheme", "dark");
		}
		$('ul.share_bar li.share_button_container a.share_button', elm).each(function(index) {
			$(this).unbind("click").bind({
				click:function(){
					$(this).toggleClass("openButton");
					$(this).siblings("ul.share_button_dropdown").slideToggle('fast', function() {
					});
	        		return false;
				}
	    	}); 
		});	
		// Embed Button
		$('.embed_clip_container', elm).show().each(function(i){
			if ($(this).is(':visible')) {
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
				
			}
		});
	}
});

$.pluginize('sharebar', $CC.ShareBar, $CC);

(function($) {
	$CC(document).sharebar();
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
		
		$('.pagination_wrap ul li a').each(function () {
			$(this).bind('click', function (e) {				
				var link = $(this).attr('href');					
				showVideoListings.ajaxLoading(link);
				e.preventDefault();	
			});	
		});
	
	},
	
	ajaxLoading : function (url) {
		$('#video_listings').empty();
		$('#video_listings').html('<div align="center"><img src="/sitewide/images/modules/ajax_busy.gif" width="32" height="32" alt="" border="0" /></div>');
		$('#video_listings').load(url, function() { });
	}

};

$(function() {
	if ($('.module.video_showcase').length) {
		showVideoListings.init();
		var changeSortOrder = function($target,sortBy){
			if(!$target.hasClass('selected')){
				$target.addClass('selected');
				$target.closest('ul').find('.selected').not($target).removeClass('selected');
				$('#video_listings').empty();
				$('#video_listings').html('<div align="center"><img src="/sitewide/images/modules/ajax_busy_dark.gif" width="32" height="32" alt="" border="0" /></div>');
				ccVideoShowcaseFeed = ccVideoShowcaseFeed.replace(/\/[a-zA-Z_]+[\/]{0,1}$/,'/'+sortBy);
				showVideoListings.init();
			}
		};
		$('.sort-by-views').click(function(){
			changeSortOrder($(this),'viewCount');
			return false
		});
		$('.sort-by-date').click(function(){
			changeSortOrder($(this),'date');
			return false
		});
	}
});
/* cc.tweetriver.js */
(function($) {
	$CC.TweetRiver = function () {};

	$Crabapple.extend($Crabapple.TweetRiver, $CC.TweetRiver, {
		init: function (elm, options) {},

		afterLoadTweets: function (container, tweets) {
			var liTpl = $('li', container),
				socialProxy = false;
			// check for social-proxy return
			if (tweets.downloaded && tweets.results) {
				tweets = tweets.results;
				socialProxy = true;
			}

			$.each(tweets, function () {
				var li = liTpl.clone(),
					regLink		= new RegExp('http:\\/\\/\\S+'),
					regHashtag	= new RegExp('\\B#([_a-zA-Z0-9]+)'),
					regReply	= new RegExp('\\B@([_a-zA-Z0-9]+)'),
					id = this.id_str,
					name,
					link,
					image,
					content,
					date;

				if (socialProxy) {
					name	= this.from_user;
					link	= 'https://twitter.com/' + this.from_user + '/status/' + id;
					image	= this.profile_image_url;
				} else {
					name	= this.user.name;
					link	= 'https://twitter.com/' + this.user.screen_name + '/status/' + id;
					image	= this.user.profile_image_url;
				}
				content = this.text.replace(regLink, function (link) {
					return '<a href="' + link + '" target="_blank">' + link + '</a>';
				}).replace(regHashtag, function (hashtag) {
					return '<a href="https://twitter.com/#!/search/%23' + hashtag.substring(1) + '" target="_blank">' + hashtag + '</a>';
				}).replace(regReply, function (reply) {
					return '<a href="https://twitter.com/#!/' + reply.substring(1) + '" target="_blank">' + reply + '</a>';
				});
				// get date; use regex to set timezone offset for IE7/8 compatibility (stupid IE)
				this.created_at = this.created_at.replace(/\s(\+\d{4})/,' GMT$1');
				date	= $Crabapple.utils.DateTime.relativeTime(new Date(this.created_at));

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
			// add the scrollbars if supported
			if (container.hasClass('scrollbars')) {
				container
					.parents('.middle')
					.tinyscrollbar();
			}

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
/* cc.web_show-video_carousel.js */
(function ($) {
	$CC.WebVideoCarousel = function () {};

	$Crabapple.extend($Crabapple.WebVideoCarousel, $CC.WebVideoCarousel, {

		init: function() {},
	
		_makeFakeUrl: function(link) {
			var splitedUrl,
				videoTitle,
				videoShortId,
				showName,
				franchise;
			if (link) {
				splitedUrl = link.split('/');
				videoTitle = splitedUrl.pop();
				videoShortId = splitedUrl.pop();
				if (!this.options.pathroot) {
					showName = splitedUrl.pop();
					franchise = splitedUrl.pop();
					this.options.pathroot = '/' + franchise + '/' + showName;
				}
				this.options.currentUrl = this.options.pathroot + '/' + videoShortId + '/' + videoTitle;
			} else {
				this.options.currentUrl = this.options.pathroot;
			}
			
			// Change Reporting Repo Object based on new Deep Link URL
			if (typeof forecastURL != 'undefined') {
				currentDeepLinkPath = this.options.currentUrl;			
				
				repRequest = $.ajax({
			        url: forecastURL,
			        dataType: "jsonp",
			        type: "POST",
			        data: {url: currentDeepLinkPath}
			    });
				
				repRequest.success(function(data) {
					repCallObject = data;
					pageName = repCallObject.pageName;
					
					if (typeof repCallObject == 'object' && typeof repCallObject.pageName != 'undefined') {
						//Send Reporting call
						mtvn.btg.Controller.sendPageCall( repCallObject );
					}
					
				});
				
				repRequest.fail(function(jqXHR, textStatus) {
					
				});

			}

			return this.options.currentUrl;
		},
		_addCarouselItem: function(videoObject, isCurrent) {
			var $container = $('#' + videoObject.id),
				$oldItem;
			if ($container.hasClass(this.blankClass)) {
				$container.removeClass(this.blankClass).data('url', videoObject.url);
				$container.html(this._createItemHtml(videoObject));
			}
			if (isCurrent) {
				$oldItem = this.module.find(this.currentItem);
				$oldItem.removeClass(this.currentClass);
				this._hidePlayer($oldItem);
				$container.addClass(this.currentClass);
				// Episode viewer for CC Studios
				if($CCSTU.episodeCarousel && $('.video-web_video_carousel').length) {
					$CCSTU.episodeCarousel.highlightActiveEpisode();
				}

			}
		},

		_createItemHtml: function(video) {
			var html = '<div class="videoWrapper">'
				+ 	'<img src="' + video.image + '" width="767" height="432">'
				+ 	'<div class="arrow"><!-- arrow --></div>'
				+ '</div>'
				+ '<h3 class="clearfix"><a class="load_description" href="#">'
				+ 	video.title + '<span class="triangle"></span></a></h3>'
				+ '<div class="meta hidden">'
				+ 	'<p class="info"><span class="posted">Posted: '
				+ 		video.posted + '</span> |'
				+ 		'<span class="views">Views: ' + video.views
				+ 	'</span></p>'
				+ 	'<p class="description">' + video.description + '('
				+ 	video.duration + ')</p>'
				+ '</div>'
				+ '<div class="commentsWrapper">'
				+ 	'<div class="commentCount">'
				+		'<a href="#" class="load_comments">'
				+ 			'Comments<span class="triangle"></span>'
				+ 		'</a>'
				+ 	'</div>'
				+ 	'<div class="fb-comments hidden  fb_iframe_widget" data-href="' + video.url 
				+ 		'" data-num-posts="2" data-width="767" data-colorscheme="dark"></div>'
				+ 	'</div>'
				+ 	'<div id="mod_' + video.id + '" class="module share_bar_wrapper_v2 noAutoLinkTracking ccstudio_sharing">'
				+ 		'<ul class="share_bar clearfix">'
				+ 			'<li class="fb">'
				+ 				'<div class="fb-like" data-href="' + video.url
				+ 				'" data-ref="share_fblike" data-layout="button_count"'
				+				' data-send="false" data-width="420" data-show-faces="false">'
				+ 				'</div>'
				+ 			'</li>'	
				+ 			'<li class="embed_btn share_button">'
				+ 				'Embed'
				+ 				'<div class="embed_clip_container" style="position:relative">'
				+ 				'<div class="embed_clip_button" data="&lt;div style=&quot;'
				+ 				'background-color:#000000;width:520px;&quot;&gt;&lt;div '
				+ 				'style=&quot;padding:4px;&quot;&gt;&lt;embed '
				+ 				'src=&quot;http://media.mtvnservices.com/mgid:arc:video:'
				+ 				'comedycentral.com:fd7a2803-4508-49d3-b099-7849a78183e5&quot; '
				+ 				'width=&quot;512&quot; height=&quot;288&quot; type=&quot;'
				+ 				'application/x-shockwave-flash&quot; allowFullScreen=&quot;'
				+ 				'true&quot; allowScriptAccess=&quot;always&quot; base=&quot;.'
				+ 				'&quot; flashVars=&quot;&quot;&gt;&lt;/embed&gt;&lt;p style='
				+ 				'&quot;text-align:left;background-color:#FFFFFF;padding:4px;'
				+				'margin-top:4px;margin-bottom:0px;font-family:Arial, Helvetica, '
				+ 				'sans-serif;font-size:12px;&quot;&gt;&lt;b&gt;&lt;a href=&quot;'
				+ 				'http://www.comedycentral.com&quot;&gt;Comedy Central&lt;/a&gt;'
				+ 				'&lt;/b&gt;&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;">'
				+ 				'<div class="tooltip" style="display: none;">'
				+ 					'<div class="ec_text">Click button to copy embed code</div>'
				+ 					'<div class="ec_text_response" style="display: none;">'
				+ 					'Embed code copied - you&apos;re ready to paste in your site '
				+ 					'or blog</div>'
				+ 				'</div>'
				+ 				'</div>'
				+ 				'</div>'
				+ 			'</li>'
				+ 			'<li class="share_button_container">'
				+ 				'<a class="share_button" href="#" data-mediaid="'
				+ 					video.id + '">Share<span class="arrow"><!-- arrow --></span></a>'
				+ 				'<ul class="share_button_dropdown" data-mediaid="' + video.id + '">'
				+ 					'<li>'
				+ 						'<a class="share fb" href="#"><span class="icon"><!--icon--></span>Facebook</a>'
				+ 					'</li>'
				+ 					'<li>'
				+ 						'<a class="share twitter" href="#" ><span class="icon"><!--icon--></span>Twitter</a>'
				+ 					'</li>'
				+ 				'</ul>'
				+ 			'</li>'
				+ 		'</ul>'
				+ 	'</div>';
			return html;
		}

	});

	$.pluginize('webvideocarousel', $CC.WebVideoCarousel, $CC);

} (jQuery));/* cc.web_show_category.js */
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
			$CCSU.TweetRiver.buttonMore = container.closest('.module').find('.get_more_button a');
			$CCSU.TweetRiver.template = $('li.tweet', container).removeClass('hide');
			$CCSU.TweetRiver.tweetsNumber = this.options.tweetsNumber;
			$CCSU.TweetRiver.maxLoads = this.options.maxLoads;
			$CCSU.TweetRiver.index = 0;
			$('li.tweet',container).remove();
			this.loadTweetsToDom(container, tweets);

			var loadTweets = this.loadTweetsToDom;

			$CCSU.TweetRiver.buttonMore.click(function(){
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
			$.each(tweets.results, function (index){
				if($CCSU.TweetRiver.tweetsNumber * (iteration-1) <= index && index < tweetsToShow){
					var li = $CCSU.TweetRiver.template.clone().hide();
					var regLink = new RegExp('http:\\/\\/\\S+');
					var regHashtag	= new RegExp('\\B#([_a-zA-Z0-9]+)');
					var regReply = new RegExp('\\B@([_a-zA-Z0-9]+)');
					var id = this.id_str;
					var name	= this.from_user;
					var link	= 'https://twitter.com/' + name + '/status/' + id;
					var image	= this.profile_image_url;
					var nickname = name
					var date	= $Crabapple.utils.DateTime.relativeTime(new Date(this.created_at));
					var content = this.text.replace(regLink, function (link) {
						return '<a href="' + link + '" target="_blank">' + link + '</a>';
					}).replace(regHashtag, function (hashtag) {
						return '<a href="https://twitter.com/#!/search/%23' + hashtag.substring(1) + '" target="_blank">' + hashtag + '</a>';
					}).replace(regReply, function (reply) {
						return '<a href="https://twitter.com/#!/' + reply.substring(1) + '" target="_blank">' + reply + '</a>';
					});

					$('.twitter_avatar', li).attr('href', 'http://twitter.com/'+nickname);
					$('.twitter_avatar img', li).attr('src', image);
					$('.twitter_name', li).text(name);
					$('.twitter_name, .twitter_handle', li).attr('href','http://twitter.com/'+nickname);
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

/* ccsu_laughstub_search.js */
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
	$('#ls-widget-search-tours .ls-widget-search-bar input[type="text"]').keypress(function(e){
		if(e.keyCode == 13){
			$('#ls_widget_search_btn').trigger('mousedown');
			$(this).focus();
		}
	});
});/* ccsu_on_demand_player.js */
var OnDemandPlayer;
var $oDPlayer;
$CCSU(function() {
	
	OnDemandPlayer = {
		_current_playlist_mgid:'',
		_current_index:0,
		init : function()
		{
			$oDPlayer = $Crabapple.playerA.player.video_player_box;
			//Bind Player Events
			OnDemandPlayer.bindPlayerEvents();
			
			//Init Tabs
			OnDemandPlayer.initTabs();
			
			//Init Carousel
			OnDemandPlayer.initCarousel();
			
			//Set active Video
			$CCSU('div.on_demand_player ul.content .videoClip:visible').eq(0).addClass('active');
			
			//Bind Videos to click functions
			$CCSU('div.on_demand_player ul.content .videoClip').live('click', function (event) {
				OnDemandPlayer.vidClick(this);
				event.preventDefault();
			});
		},
		
		initTabs : function() {
			$on_demand_player_tabs = $CCSU('div.on_demand_player ul.tabs');
			$on_demand_player_tab_content = $CCSU('div.on_demand_player ul.content');
			
			$on_demand_player_tabs.tabs('.on_demand_player .content > li', {
				event: 'click',
				rotate: false,
				tabs: 'li'
			});
			$on_demand_player_tabs.children('li:eq(0)').addClass('now_playing');
			$on_demand_player_tab_content.find('li:eq(0)').addClass('now_playing_content');
			$on_demand_player_tabs.children('li').click(function(){
				$on_demand_player_tabs.children('li.now_playing').removeClass('now_playing');
				$on_demand_player_tab_content.children('li.now_playing_content').removeClass('now_playing_content');
				$CCSU(this).addClass('now_playing');
				$CCSU(this).parent().attr('data-activeTab',$(this).index());
				$on_demand_player_tab_content.find('.videoClip').removeClass('active');
				$on_demand_player_tab_content.find('.videoClip:visible').eq(0).addClass('active').parent().parent().parent().addClass('now_playing_content');
				$on_demand_player_tab_content.find('li.now_playing_content .carousel_wrapper').scrollable().seekTo(0);
				$oDPlayer.playURI($CCSU(this).attr('data-mgid'));
				OnDemandPlayer.loadVideoMetaData($on_demand_player_tab_content.find('.videoClip.active').attr('data-videoMetaUrl'));
				return false;
			});
			
			$on_demand_player_tabs.children('li').hover(
				function(){
					$CCSU(this).addClass('current').siblings().removeClass('current');
					$on_demand_player_tab_content.children('li').hide().eq($(this).index()).show();
					$on_demand_player_tab_content.find('li:visible .carousel_wrapper').scrollable().seekTo(0);
				},
				function(){}
			);
			
			$CCSU('.on_demand_player .tab_wrapper').mouseleave(function(evt){
				$on_demand_player_tabs.children('li').removeClass('current');
				$on_demand_player_tabs.children('li.now_playing').addClass('current');
				$on_demand_player_tab_content.children('li').hide();
				$on_demand_player_tab_content.children('li.now_playing_content').show().find('.carousel_wrapper').scrollable().seekTo($CCSU('.on_demand_player .videoClip.active').attr('data-playlistIdx'));
			});
		},
		
		initCarousel : function() {
			$CCSU('.on_demand_player .carousel_wrapper').scrollable({
				next:'.prev',
				prev:'.next',
				onSeek: function() {
					var carouselWrap = $CCSU('.on_demand_player .carousel_wrapper:visible'),
						carousel = $CCSU('.on_demand_player .carousel_wrapper .carousel:visible'),
						carouselLast = carousel.find('li:last-child'),
						arrowNext = $CCSU('div.on_demand_player a.next'),
						arrowPrev = $CCSU('div.on_demand_player a.prev');
					if (parseInt(carousel.css("left"),10) == 0) {
						arrowNext.addClass('disabled');
					} else {
						arrowNext.removeClass('disabled');
					}

					if (carouselWrap.offset().left == carouselLast.offset().left) {
						arrowPrev.addClass('disabled');
					} else {
						arrowPrev.removeClass('disabled');
					}
				}
			});
		},
		
		vidClick : function(video) {
			//now_playing_content
			$on_demand_player_tab_content.find('.videoClip').removeClass('active');
			$CCSU(video).addClass('active');
			//check to see if this is on the same playlist or a new one
			if($on_demand_player_tabs.children('li.now_playing.current').length == 1){
				//we're on the same playlist so just play the new index
				$oDPlayer.playIndex($CCSU(video).attr('data-playlistIdx'));
				$on_demand_player_tab_content.find('li.now_playing_content .carousel_wrapper').scrollable().seekTo($CCSU(video).attr('data-playlistIdx'));
				OnDemandPlayer.loadVideoMetaData($CCSU(video).attr('data-videoMetaUrl'));
			}else{
				$on_demand_player_tabs.children('li.now_playing').removeClass('now_playing');
				$on_demand_player_tabs.find('li.current').addClass('now_playing');
				$on_demand_player_tab_content.children('li.now_playing_content').removeClass('now_playing_content');
				$CCSU(video).parents('.carousel_wrapper').parent().addClass('now_playing_content');
				
				//new playlist new index
				OnDemandPlayer._current_playlist_mgid = $on_demand_player_tabs.children('li.now_playing').attr('data-mgid');
				OnDemandPlayer._current_index = $CCSU(video).attr('data-playlistIdx');
				$oDPlayer.pause();
				$oDPlayer.playURI($on_demand_player_tabs.children('li.now_playing').attr('data-mgid'));
				
				$oDPlayer.playIndex(OnDemandPlayer._current_index);
			}
		},
		
		loadVideoMetaData : function(metaUrl) {
			$CCSU('.videoInformation').empty();
			$CCSU('.videoInformation').load(metaUrl, function() {
			    FB.XFBML.parse();
			    twttr.widgets.load();
			    $CC(document).sharebar();
			});

		},
		
		bindPlayerEvents : function () {
			$oDPlayer.bind('onIndexChange', OnDemandPlayer.onIndexChange);
			$oDPlayer.bind('onPlaylistComplete', OnDemandPlayer.onPlaylistComplete);
		},
		
		onPlaylistComplete : function(event) {
			var tabCount = $CCSU('.on_demand_player .tabs').children().length;
			var idx = $on_demand_player_tabs.attr('data-activeTab');
			if (idx <= tabCount) {
				$on_demand_player_tabs.children('li.now_playing').next().click();
			}
		},
		
		onIndexChange : function(event) {
			var $idx = event.data;
			if(OnDemandPlayer._current_playlist_mgid == $on_demand_player_tabs.children('li.now_playing').attr('data-mgid')){
				if($idx != OnDemandPlayer._current_index){
					//needed to trick the player to the correct play index
					OnDemandPlayer._ignoreNextCall=true;
					$oDPlayer.playIndex(OnDemandPlayer._current_index);
					return;
				}
			}
			if ($idx != 0 || OnDemandPlayer._current_playlist_mgid)
			{
				$on_demand_player_tab_content.find('li.now_playing_content .carousel_wrapper').scrollable().seekTo($idx);
				$on_demand_player_tab_content.find('.videoClip.active').removeClass('active');
				$on_demand_player_tab_content.find('li.now_playing_content .videoClip').eq($idx).addClass('active');
				OnDemandPlayer.loadVideoMetaData($on_demand_player_tab_content.find('.videoClip.active').attr('data-videoMetaUrl'));
			}
			if(OnDemandPlayer._ignoreNextCall){
				OnDemandPlayer._current_playlist_mgid='';
				OnDemandPlayer._ignoreNextCall=false;
			}
		}
	}
	
	if ($CCSU('.on_demand_player').length) {
		OnDemandPlayer.init();
	}
});


/* ccsu_social_proxy.js */
/* 
 * Used in SUP M052
 */
(function($) {
	$CCSU.SocialProxy = function () {};
	
	$Crabapple.extend($Crabapple.SocialProxy, $CCSU.SocialProxy, {
		init: function (elm, options) {},

		afterLoadTweets: function (container, tweets) {
			$CCSU.SocialProxy.tweetRiverData = tweets;
			$CCSU.SocialProxy.moduleContainer = container;
			$CCSU.SocialProxy.buttonMore = container.closest('.module').find('.get_more_button a');
			$CCSU.SocialProxy.template = $('li.tweet', container).removeClass('hide');
			$CCSU.SocialProxy.tweetsNumber = this.options.tweetsNumber;
			$CCSU.SocialProxy.maxLoads = this.options.maxLoads;
			$CCSU.SocialProxy.index = 0;
			$('li.tweet',container).remove();
			this.loadTweetsToDom(container, tweets);
			var loadTweets = this.loadTweetsToDom;

			$CCSU.SocialProxy.buttonMore.click(function(){
				if (!(loadTweets($CCSU.SocialProxy.moduleContainer,$CCSU.SocialProxy.tweetRiverData))){
					$(this).closest('.footer').remove();
				}
				return false;
			})
			
		},

		loadTweetsToDom: function(container, tweets){
			var currentTweetsNumber = $CCSU.SocialProxy.moduleContainer.find('li.tweet').length;
			var iteration = (Math.floor(currentTweetsNumber / $CCSU.SocialProxy.tweetsNumber))+1;
			var tweetsToShow = $CCSU.SocialProxy.tweetsNumber * iteration;	
			$.each(tweets.results, function (index){
				if($CCSU.SocialProxy.tweetsNumber * (iteration-1) <= index && index < tweetsToShow){
					var li = $CCSU.SocialProxy.template.clone().hide();
					var regLink = new RegExp('http:\\/\\/\\S+');
					var regHashtag	= new RegExp('\\B#([_a-zA-Z0-9]+)');
					var regReply = new RegExp('\\B@([_a-zA-Z0-9]+)');
					var id = this.id_str;
					var name	= this.from_user;
					var link	= 'https://twitter.com/' + name + '/status/' + id;
					var image	= this.profile_image_url;
					var nickname = name
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
			if(iteration < $CCSU.SocialProxy.maxLoads && $CCSU.SocialProxy.tweetRiverData.length > tweetsToShow){
				return true;
			}else{
				return false;	
			}
		}		
	});

	$.pluginize('socialproxy', $CCSU.SocialProxy, $CCSU);
}) (jQuery);

/* ccsu_tv_schedule.js */
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
});/* comedian_bio_description.js */
/* 
 * Used in SUP M011 Comedian Bio Description
 */
$(function() {
	$('#read_more').click(function(){
		$(this).hide();
		$('#shorttext').html($('span.fulltext').html());					
		return false;
	});
});/* comedian_showcase.js */
/* 
 * Used in SUP M056 Comedian Showcase
 */
$(function() {
	var currentPage = 1;
	
	$CCSU(".comedian_showcase .tabs_filter a").click(function(){
		var feedURL = $CCSU(this).attr("data-url");
		$CCSU(".current").removeClass("current");
		$CCSU(this).parent().addClass("current");
		$CCSU(".comedian_showcase_container").wrapInner("<div class=\"comedian_list_old\">");
		$CCSU(".loading_img").show();
		$CCSU(".comedian_showcase_container").load(feedURL, function(){
			if ($CCSU(this).find('.filter_alphabetical').length) {
				$CCSU('.filter_alphabetical').each(function(){
					$CCSU(this).find('.letter:eq(0)').addClass('current');
				});
			}
			$CCSU(".comedian_list_old").remove();
		});
		$CCSU('.loading_img').ajaxComplete(function(e, xhr, settings) {
			if (settings.url == feedURL) {
				$CCSU(".loading_img").hide();
				twttr.widgets.load();
				FB.XFBML.parse();
			}
		});
		
		currentPage = 1;
		return false
	});
	
	$CCSU(".comedian_showcase .letter a").live("click", function(event){
		var feedURL = $CCSU(this).attr("data-url"),
		currentIndex = $CCSU(this).parent().index();
		
		$CCSU('.filter_alphabetical').each(function(){
			$CCSU(this).find('.letter:eq('+currentIndex+')').addClass('current').siblings().removeClass("current");
		});
		if ($CCSU(this).closest(".filter").index() != 0) {
			$CCSU(document).scrollTop($CCSU(".comedian_showcase").offset().top - 10);
		}
		$CCSU(".comedian_list").wrapInner("<div class=\"comedian_list_old\">");
		$CCSU(".comedian_list").load(feedURL, function(){
			$CCSU(".comedian_list_old").remove();
		});
		$CCSU(".loading_img2").show();
		$CCSU('.loading_img2').ajaxComplete(function(e, xhr, settings) {
			if (settings.url == feedURL) {
				$CCSU(".loading_img2").hide();
				twttr.widgets.load();
				FB.XFBML.parse();
			}
		});
		
		currentPage = 1;
		return false;	
	});
	
	$CCSU(".comedian_showcase .loadMore").live("click", function(event){
		var feedURL = $CCSU(this).attr("data-url"),
		firstLetter = $CCSU(this).attr("data-firstLetter"),
		totalPages = $CCSU(this).attr("data-pages"),
		buttonText = $CCSU(this).html(),
		buttonTextLoading = "Loading...";
		
		currentPage++;
		
		if (currentPage <= totalPages) {
			$CCSU(".comedian_showcase .loadMore").css("width", $CCSU(".comedian_showcase .loadMore").width()).html(buttonTextLoading);
			var req = $.get('/feeds/comedian/showcase_comedian_list/'+firstLetter+'/'+currentPage, function(data) {
				$CCSU(".comedian_list .comedians").append(data);
			});
			
			req.complete(function(){
				if(currentPage >= totalPages){
					$CCSU(".comedian_showcase .loadMore").hide();
				}
				$CCSU(".comedian_showcase .loadMore").css("width", "auto").html(buttonText);
				twttr.widgets.load();
				FB.XFBML.parse();
			});
		}
		return false;	
	});
});/* homepage_tweets.js */
$(function () {
	$CCSU('.homepage_tweets .tweetriver').tweetriver({feedUrl: $CCSU('.homepage_tweets .tweetriver').data('feed'),tweetsNumber: 4, maxLoads: 3});
	
	$CCSU('.ccstandup_header .twitter_posts').socialproxy({feedUrl:$CCSU('.ccstandup_header .twitter_posts').attr('data-feed'),tweetsNumber: 4, maxLoads: 3});
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
// Base Setup for All Click Track Reporting

function debugPrint (toPrint) {
	if ( typeof console != 'undefined' && typeof console.log != 'undefined') {
		console.log(toPrint);
	}
}

function autoLinkTrackEvent(promoName, destinationUrl, extraReportingObjs){

	var destinationUrl = (typeof destinationUrl != 'undefined' || destinationUrl=='') ? destinationUrl : 'no_destination_url';
	
	if (destinationUrl.substr(0,1) == '/') {
		destinationUrl = window.location.protocol + "//" + window.location.host + destinationUrl;
	}
	
	var promoName = promoName.toLowerCase();
	destinationUrl = destinationUrl.toLowerCase();
	
	baseReportingObj = {
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
	};
	
	if (typeof extraReportingObjs == 'object') {
		jQuery.extend(baseReportingObj, extraReportingObjs);
	}
	
	if (typeof(mtvn) != 'undefined') {
			mtvn.btg.Controller.sendLinkEvent(baseReportingObj);
	}
}

function autoLinkTrackEventFootyPlayer(promoName, destinationUrl){
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
			prop48:'footy_player',
			eVar5:destinationUrl,
			eVar6:repCallObject.eVar6,
			eVar7:promoName,
			eVar8:promoName + '|' + pageName,
			eVar9:pageName,
			eVar31:'footy_player'
		});
	}
}

function shareBarLinkTracking (shareService, uniqueID) {
	var shareService = 'share_'+shareService;

	var baseReportingObj = {
			linkName:'share',
			linkType:'o',
			eVar9:pageName,
			eVar19:shareService,
			events:'event9'
	};

	if (typeof uniqueID != 'undefined' &&  uniqueID != '') {
		eVar16Add = {"eVar16":uniqueID};
		jQuery.extend(baseReportingObj, eVar16Add);
	}
	
	if (typeof extraReportingObjs == 'object') {
		jQuery.extend(baseReportingObj, extraReportingObjs);
	}
	
	if (typeof(mtvn) != 'undefined') {
			mtvn.btg.Controller.sendLinkEvent(baseReportingObj);
	}
}

function mosiacShareBarTracking(shareService, whereAmI, uniqueTitle) {
	
	if ( typeof whereAmI != 'undefined' && whereAmI != '' && ( whereAmI == 'rollover' ||  whereAmI == 'lightbox') ) {
		var whereAmI = whereAmI.toLowerCase();
		whereAmI = '_'+whereAmI;
	} else {
		var whereAmI = '';
	}
	
	//var mosiacPromoName = whereAmI + shareService + '|' + uniqueTitle;
	var mosiacPromoName = 'share_' + shareService + whereAmI;
	
	if (typeof(mtvn) != 'undefined') {
		mtvn.btg.Controller.sendLinkEvent({
			linkName:'share',
			linkType:'o',
			eVar9:pageName,
			eVar19:mosiacPromoName,
			eVar16:uniqueTitle,
			events:'event9'
		});	
	}
}

function commentLinkTracking (shareService) {
	var shareService = 'commenting_'+shareService;
	if (typeof(mtvn) != 'undefined') {
		mtvn.btg.Controller.sendLinkEvent({
			linkName:'commenting',
			linkType:'o',
			eVar9:pageName,
			eVar19:shareService,
			events:'event10'
		});	
	}
}

// Handler for CC Studios Lightbox Open Event
function reportingHandlerLightboxOpen(classList) {
	
	var contentType = classList.match(/(show_video|tumblr|instagram|tweet)/gi)[0];
	//debugPrint('contentType = '+contentType);
	//debugPrint($('body').is('.click'));
	
	/*
	if($('body').is('.click')){
		this.close();
	}*/
	
	
	var linkName = 'ccstudios_mosaic' + '|'+ contentType.toLowerCase();
	//autoLinkTrackEvent(linkName, '', {eVar19:'lightbox_'+contentType});
	
	// twitter box does not stop propagation so need to guard against this
	// body has .click class when on a button in share strip that appears on brick when brick is rolled over
	// no click class when on rest of brick and not touching a tweet,retweet, favorite button
	if ( contentType != 'tweet' || (contentType == 'tweet' && !$('body').is('.click')) ) {
		autoLinkTrackEvent(linkName);
	}

}

// Handler for Flux Object Reporting Events
// passes param widget which is the jQuery object of the Flux widget
function handleFluxWidgetReporting (widget) {
	var $widget = $(widget);
	
	// For comment tracking
	if (typeof widget.attr('ActivityFeed')){
		commentLinkTracking('flux');
		// Reporting calls to Facebook & Twitter if checkbox is checked
		// Removed per Reporting - coming up with new established practices
		/*
		if ($widget.find('.postToContainer>.socialPublishing>.publishingContainer>.facebookPublishing>input:checked').length > 0) {
			commentLinkTracking('flux_facebook');
		}
		if ($widget.find('.postToContainer>.socialPublishing>.publishingContainer>.twitterPublishing>input:checked').length > 0) {
			commentLinkTracking('flux_twitter');
		}
		*/
	}
}

// Function to handle FB response on video mosiac 
//var handleFacebookResponse = function(href, widget, whereAmI) {
function handleFacebookResponse(href, widget, whereAmI) {
	
	mosiacShareBarTracking('fblike', whereAmI, href);
};

// For Twitter buttons that use the Twitter widget with Web Intents
// And do not already have a click event on them
// This is used on the cc/stand-up/video-on-demand page, where tweet button is wrapped in an iFrame
function handleTweetEvent(event){
  if (event) {
	  //debugPrint( 'AUTO TWEET LINK = ' + $(event.target.parentElement).hasClass('autoLinkReportingTwitter'));
	  // Only fire this if the parent block has a class name of autoLinkReportingTwitter
	  if ($(event.target.parentElement).hasClass('autoLinkReportingTwitter')) {
		  //console.log(event.type);
		  // Determine event type from title of Twitter iFrame
		  var eventPattern = /(tweet|retweet|follow|favorite)/gi;
		  var twitterEvent = $(event.target).attr('title').match(eventPattern)[0].toLowerCase();
		  
		  if (twitterEvent != 'follow') {
			  if (twitterEvent == 'favorite') {
				  twitterEvent = 'fav';
			  }
			  twitterEvent = 'twitter_' + twitterEvent;
			  shareBarLinkTracking(twitterEvent);
		  } else {
			  twitterEvent = 'twitter_' + twitterEvent;
			  autoLinkTrackEvent(twitterEvent);
		  }
	  }
  }
}
// Twitter events must be wrapped in here
if (typeof twttr != 'undefined') {
	twttr.ready(function (twttr) {
		debugPrint('Twitter Auto Buttons Loaded');
		twttr.events.bind('click', handleTweetEvent); 
	});
}

//Tweet Feed Modules
//Pass in Href attribute as event
function handleTweetFeedEvent(destinationUrl){
	//debugPrint(destinationUrl);
	//var eventPattern = /(retweet|tweet|follow|favorite)/i; //simpler but less safe	
	var eventPattern = /(intent\/)(retweet|tweet|follow|favorite)(\?)/i;
	var matches = destinationUrl.match(eventPattern);
	
	var twitterEvent = destinationUrl.match(eventPattern)[2].toLowerCase();
	//debugPrint(twitterEvent);
	if (twitterEvent != 'follow') {
		if (twitterEvent == 'favorite') {
			twitterEvent = 'fav';
		}

		twitterEvent = 'twitter_' + twitterEvent;
		shareBarLinkTracking(twitterEvent,destinationUrl);
	} else {
		twitterEvent = 'twitter_' + twitterEvent;
		autoLinkTrackEvent(twitterEvent,destinationUrl);
	}
}

$(document).ready(function() {
	// Top nav links	
	$('ul.top_nav a').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('top-nav', destinationUrl);
	});

	// Cappy
	$('div.visibleCappy .moreSites li.logo a[href]').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('cappy-logo', destinationUrl);
	});
	$('div.visibleCappy .moreSites li.moreLinks ul>li>a[href]').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('cappy-more', destinationUrl);
	});
	
	// CC Studios Up Sub Nav
	$('div.cc_studio_header .nav_links li>a[href]').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('ccstudio-nav', destinationUrl);
	});
	
	// CC Stand Up Sub Nav
	$('div.ccstandup_header div.menu_wrap li>a[href]').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('ccstandup-nav', destinationUrl);
	});
	
	// CC Stand-Up Nav Logo
	$('div.ccstandup_header a.logo').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('ccstandup-nav-logo', destinationUrl);
	});
	
	// Studios Nav Logo
	$('div.cc_studio_header a.logo').click(function (){
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('ccstudio-nav-logo', destinationUrl);
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
	
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// CC STUDIOS & STAND-UP CLICK TRACKING /////////////////////
//////////////////////////////////////////////////////////////////////////////////////
	
	// CC Standup Tours Page Search
	$('form#frmLsSearchTours').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('laughstub_search', destinationUrl);
	});

	// CC Studio - HP Mosiac Tracking
	// clicks on lightbox open assigned in news_feed-mosiac.js
	
	// CC Studios Nav
	$('div#studios_header_search>form:first').submit(function() {
		var destinationUrl = $(this).attr('action');
		autoLinkTrackEvent('searchbox', destinationUrl);
	});
	
	// Load More Button Bottom of Mosiac
	$('div.news_feed-mosaic .load_more').click(function (){
		autoLinkTrackEvent('load_more');
	});
	
	$('div.web_series_list .middle ul li a').click(function() {
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('webseries_banners', destinationUrl);
	});
	
	$('div.web_series_grid .middle ul li a').click(function() {
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('webseries_grid', destinationUrl);
	});
	
	// More Like This Link in footer of Mosiac Lightbox
	$('div.news_feed-mosaic div.content div.footer a').live('click', function (){
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('more_like_this', destinationUrl);
	});
	
	// Dropdown Video Carousel
	$('.video-web_video_showcase .middle div.episode').live('click', function (){
		autoLinkTrackEvent('video-web_video_showcase', $(this).attr('data-url'));
	});
	// video-web_video_carousel--includes video, meta, prev/next buttons--module CC-Studios Series pages
	// video-web_video_carousel is disabled below from autolink tracking
	// 
	$('.video-web_video_carousel>.middle a.next, .video-web_video_carousel>.middle a.previous').click(function (){
		var destinationUrl = ( typeof $(this).attr('title') != 'undefined' ) ? $(this).attr('title') : '';
		autoLinkTrackEvent('video-web_video_arrows', destinationUrl);
	});
	// Meta clicks - note metaWrapper class disappears when clicked to expand
	$('.video-web_video_carousel .meta .description a').click(function (){
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('video-web_video_meta', destinationUrl);
	});
	$('.video-web_video_carousel .commentsWrapper a.load_comments').click(function (){
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('video-web_video_comments', destinationUrl);
	});
	//.metaWrapper is disappeariing $('.video-web_video_carousel>.middle .metaWrapper a.load_description').click(function (){
	$('.video-web_video_carousel a.load_description').click(function (){
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('video-web_video_loaddesc', destinationUrl);
	});
	
	// Video Clips Section on CC Stand Up does not get auto link tracking.  Think its a race issue.  Forcing here
	// This causes 2 click events.  The first is Omniture automatic lnk_e
	$('div.video_showcase.ccsu a').live('click', function() {
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('video_showcase', destinationUrl);
	});
	
	// CC Stand Up video clips section
	$('div.video_player_module.ccsu a').live('click', function() {
		var destinationUrl = ( typeof $(this).attr('href') != 'undefined' ) ? $(this).attr('href') : '';
		autoLinkTrackEvent('video_player_module', destinationUrl);
	});
	
	// Share to Facebook and twitter
	$(".ccstudio_sharing .share_button_dropdown li a").live('click', function() {
		var uniqueId = $(this).parents("ul").attr("data-mediaid");
		var shareService = ( $(this).hasClass("fb")) ? ("fb") : ("twitter");
		shareBarLinkTracking(shareService, uniqueId);
	});
	$("ul.web_carousel_sharing li a").live('click', function() {
		var link = $(this);
		var uniqueId = link.parents("ul").attr("data-mediaid");
		var shareService = "fb";
		if (link.hasClass("twitter")) shareService = "twitter";
		if (link.hasClass("tumblr")) shareService = "tumblr";
		if (link.hasClass("reddit")) shareService = "reddit";
		if (link.hasClass("digg")) shareService = "digg";
		if (link.hasClass("googleplus")) shareService = "google1";
		shareBarLinkTracking(shareService, uniqueId);
	});
	
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// END CC STUDIOS & STAND-UP CLICK TRACKING /////////////////
//////////////////////////////////////////////////////////////////////////////////////
	
	// Latest Tweets Twitter Feed Module
	$('.tweetriver .tweet a.intent').live('click', function (){
		handleTweetFeedEvent($(this).attr('href'));
	});
	
	// Carousel
	$('ul#carousel li.active a').live('click', function() {
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('hpcarousel', destinationUrl);
	});
	
	// Carousel Link Overlay Disabled
	$('#carouser_wrapper .link_overlay_disabled').click(function() {
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
    
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// AXE SPLITTING HAIRS CLICK TRACKING Oct 2012 //////////////
//////////////////////////////////////////////////////////////////////////////////////    
    
    // Required 3rd Party Tracking Pixels per Vendor
    if ($('body')[0].id.toLowerCase() == ('axe_hair_presents_splitting_hairs').toLowerCase()) {
    	var axePagePixelName = 'axePagePixel'; //Unique identifier for the page call
    	var $axeTrackDiv = $('body').append('<div id="axeTrack" style="display:none" width="1px" height="1px">&nbsp</div>');
    	var axeTrackDiv = document.getElementById('axeTrack');
		// Specific to this Campaign
		var type = 'axeha928';
		var cat = 'axeha544';
    	
    	
    	function fireAxeTracking(pixName) {

    		
    		// Fire page load tag
        	console.log('FIRED AXE: '+pixName);
        	var axel = Math.random() + "";
        	var a = axel * 10000000000000;
        	//var axeIFrame='<iframe id="axeIFrame" src="http://fls.doubleclick.net/activityi;src=12345678;type=' + type + ';cat=' + cat + ';u1=' + u1 + ';ord=' + a + '?" width="1" height="1" frameborder="0"><\/iframe>';
        	var axeIFrame='<iframe src="http://1608225.fls.doubleclick.net/activityi;src=1608225;type=' + type + ';cat=' + cat + ';u1=' + pixName + ';ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
        	axeTrackDiv.innerHTML = axeIFrame;
    	}
    	
    	
    	//document.write('<iframe src="http://1608225.fls.doubleclick.net/activityi;src=1608225;type=axeha928;cat=axeha544;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
    	
    	fireAxeTracking(axePagePixelName);
    	
    	// Attach Axe 3rd Party Trackig to Video Thumbnail
    	$('div.miniplayer .tabs-wrapper li a.video_thumb').live('click', function() {
    		var pixName = (typeof $(this).attr('data-videoid') != 'undefined') ? $(this).attr('data-videoid') : 'no_unique_pixel_name';
    		fireAxeTracking(pixName);
    	});
    } else {
    	//console.log('NOT AXE SPLITTING HAIRS'); // This errors out in IE
    }

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// END AXE SPLITTING HAIRS CLICK TRACKING Oct 2012 //////////
//////////////////////////////////////////////////////////////////////////////////////    

/////////////////////////// Tumbler Posts Promo  /////////////////////////////////////
	
    ///// share strip /////
    // Share to Facebook and twitter
    $(document).delegate("div.show_tumblr.module .share_button_container li>a.share", "click", function(){ 
		var uniqueId = $(this).attr('href');
		var shareService = 'unknown_service'; // Should never have this
		
		if ( $(this).hasClass('fb') ) {
			shareService = 'fb';
		} else if ( $(this).hasClass('twitter') ){
			shareService = 'twitter';
		}

		shareBarLinkTracking(shareService, uniqueId);
	});
	
	// Tumblr share button is embedded in the template
    
    ///// Follow Button /////
	$('div.show_tumblr.module a.follow').click(function() {
		var destinationUrl = $(this).attr('href');
		autoLinkTrackEvent('tumblr_follow', destinationUrl);
	});
	
	// Footer & Posts Content - gets regular link tracking - must eliminate share bar links
    $(document).delegate("div.show_tumblr.module .footer a, div.show_tumblr.module .tumblr_post a", "click", function(){
    	
    	if ( $(this).parents('.share_bar_wrapper_v2').length == false ) {
    		var destinationUrl = $(this).attr('href');
    		autoLinkTrackEvent('show_tumblr', destinationUrl);
    	}
	});
    
    
/////////////////////////// Super Footy Calls ////////////////////////////////////////
	$(".super_footy .promo_1").click(function(){
		autoLinkTrackEvent('super_footy_1', $(this).attr('href'));
	});
	
	$(".super_footy .promo_2").click(function(){
		autoLinkTrackEvent('super_footy_2', $(this).attr('href'));
	});
	
	$(".super_footy .video_player_holder").click(function(){
		autoLinkTrackEventFootyPlayer('super_footy_video', $(this).attr('href'));
	});
	
	$(".super_footy .button_holder").click(function(){
		autoLinkTrackEvent('super_footy_exit', $(this).attr('href'));
	});    

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// ALL OTHER AUTO MODULE TRACKING ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////	
	
	
	skipTheseClasses = /(noAutoLinkTracking|ad_|visible_header|video_player_module|hpcarousel|video-web_video_carousel)/; // div classes to skip autolink tracking
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
			//debugPrint('General Autolink Attached');	
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
				//console.log('++' + reported_link_name + '->' + $(this).attr('href'));
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
		// IE issue with .hide() so we'll use this instead
		$('.visible_header .ad_companion').attr("style", "display: none;");
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

		if (/^([A-Za-z0-9_+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/.test($(field).val())){
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
});/* flux4.js */
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

				var isFlux = setInterval(function(){ // fix for IE
					if(w.Flux4){
				
						w.Flux4.createWidget(conf.widgets[wName]["name"], opts, function(widget) {

							if  (conf.widgets[wName]["onLoad"]) {
									conf.widgets[wName]["onLoad"](widget);				
							}
							el.trigger("Flux4.widget.load", [widget, true, conf.widgets[wName]["name"], opts]);

						});
						clearInterval(isFlux);
					}
				},200);

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
/* follow.js */
$(function () {
	$CC('.follow .tweetriver').tweetriver({feedUrl: $CC('.follow .tweetriver').data('feed')});
});/* hpcarousel.js */
$(function() {
	var player_ready = false,
		playerTimer;
	function init() {
		$carousel = $('#carousel');
		if ($('#video_player_box').length) {
			$video_player = $Crabapple.playerA.player.video_player_box;

			//Player API updated.  New Way to bind Events.  See http://mtvn-player.github.com/embed-api/docs/#!/api/MTVNPlayer.Events
			$video_player.bind("onReady",function(event) {
				player_ready = true;
			});

			$video_player.bind("onMetadata",function(event) {
				if ($.cookie('playerSound') != 'true') {
					$('#carouser_wrapper a.mute').removeClass('on');
					$video_player.mute();
					$.cookie('playerSound','false');
				} else {
					$('#carouser_wrapper a.mute').addClass('on');
					$video_player.unmute();
					$.cookie('playerSound','true');
				}
				$video_player.bind("onReady",function(event){});
			});

			$video_player.bind("onPlaylistComplete",function(event) {
				if (player_ready == true) {
					hidePlayer();
				}
				goNext();
				if ($autoplay_time == "0")
				{
					$carousel.attr('data-autoplay',5000);
				}
			});

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

			if (player_ready == true) {
				$video_player.pause();
			}

        	if ($(this).parent().hasClass('active')) {
        		return;
            } else {
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
		});
		$('.hpcarousel .video_wrapper .link_overlay_disabled, .hpcarousel ul li:last .full_info, .hpcarousel .video_wrapper #video_player_box').live({
			mouseenter: function() {
				$carousel.find('li:last').addClass('hovered');
			},
			mouseleave: function() {
				$carousel.find('li:last').removeClass('hovered');
			}
		});
	}

	function autoplay($carousel) {
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
		$active.animate({
			width: 480
		}, 150, function() {move($active)});
	}

	function move($active) {
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
			if (player_ready == true) {

				id = mgid;
				item_id = id.substr(33,37);

				id_2 = $video_player.currentMetadata.rss.guid;
				item_id_2 = id_2.substr(33,37);

				$carousel.attr('data-autoplay', '0');
				showPlayer();

				if (item_id == item_id_2) {
					$video_player.play();
				} else {
					$video_player.playURI(mgid);
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
		$carousel.attr('data-autoplay',5000);
		animate($carousel.find('li:eq(4)'));
	}

	function hidePlayer() {
		if (player_ready == true) {
			$video_player.pause();
		}
		clearTimeout(playerTimer);
		$('.hpcarousel .video_wrapper').css('opacity','0.01')
			.find('embed,object').hide();
	}

	function showPlayer() {
		playerTimer = setTimeout(function(){
		    $('.hpcarousel .video_wrapper').css('opacity','1')
			.find('embed,object').show();
		},650);
	}

	if ($('.hpcarousel').length > 0) {
		init();
	}
});/* jquery.tinyscrollbar.min.js */
(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,lockscroll:true,size:"auto",sizethumb:"auto",invertscroll:false}};a.fn.tinyscrollbar=function(d){var c=a.extend({},a.tiny.scrollbar.options,d);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(q,g){var k=this,t=q,j={obj:a(".viewport",q)},h={obj:a(".overview",q)},d={obj:a(".scrollbar",q)},m={obj:a(".track",d.obj)},p={obj:a(".thumb",d.obj)},l=g.axis==="x",n=l?"left":"top",v=l?"Width":"Height",r=0,y={start:0,now:0},o={},e=("ontouchstart" in document.documentElement)?true:false;function c(){k.update();s();return k}this.update=function(z){j[g.axis]=j.obj[0]["offset"+v];h[g.axis]=h.obj[0]["scroll"+v];h.ratio=j[g.axis]/h[g.axis];d.obj.toggleClass("disable",h.ratio>=1);m[g.axis]=g.size==="auto"?j[g.axis]:g.size;p[g.axis]=Math.min(m[g.axis],Math.max(0,(g.sizethumb==="auto"?(m[g.axis]*h.ratio):g.sizethumb)));d.ratio=g.sizethumb==="auto"?(h[g.axis]/m[g.axis]):(h[g.axis]-j[g.axis])/(m[g.axis]-p[g.axis]);r=(z==="relative"&&h.ratio<=1)?Math.min((h[g.axis]-j[g.axis]),Math.max(0,r)):0;r=(z==="bottom"&&h.ratio<=1)?(h[g.axis]-j[g.axis]):isNaN(parseInt(z,10))?r:parseInt(z,10);w()};function w(){var z=v.toLowerCase();p.obj.css(n,r/d.ratio);h.obj.css(n,-r);o.start=p.obj.offset()[n];d.obj.css(z,m[g.axis]);m.obj.css(z,m[g.axis]);p.obj.css(z,p[g.axis])}function s(){if(!e){p.obj.bind("mousedown",i);m.obj.bind("mouseup",u)}else{j.obj[0].ontouchstart=function(z){if(1===z.touches.length){i(z.touches[0]);z.stopPropagation()}}}if(g.scroll&&window.addEventListener){t[0].addEventListener("DOMMouseScroll",x,false);t[0].addEventListener("mousewheel",x,false)}else{if(g.scroll){t[0].onmousewheel=x}}}function i(A){a("body").addClass("noSelect");var z=parseInt(p.obj.css(n),10);o.start=l?A.pageX:A.pageY;y.start=z=="auto"?0:z;if(!e){a(document).bind("mousemove",u);a(document).bind("mouseup",f);p.obj.bind("mouseup",f)}else{document.ontouchmove=function(B){B.preventDefault();u(B.touches[0])};document.ontouchend=f}}function x(B){if(h.ratio<1){var A=B||window.event,z=A.wheelDelta?A.wheelDelta/120:-A.detail/3;r-=z*g.wheel;r=Math.min((h[g.axis]-j[g.axis]),Math.max(0,r));p.obj.css(n,r/d.ratio);h.obj.css(n,-r);if(g.lockscroll||(r!==(h[g.axis]-j[g.axis])&&r!==0)){A=a.event.fix(A);A.preventDefault()}}}function u(z){if(h.ratio<1){if(g.invertscroll&&e){y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+(o.start-(l?z.pageX:z.pageY)))))}else{y.now=Math.min((m[g.axis]-p[g.axis]),Math.max(0,(y.start+((l?z.pageX:z.pageY)-o.start))))}r=y.now*d.ratio;h.obj.css(n,-r);p.obj.css(n,y.now)}}function f(){a("body").removeClass("noSelect");a(document).unbind("mousemove",u);a(document).unbind("mouseup",f);p.obj.unbind("mouseup",f);document.ontouchmove=document.ontouchend=null}return c()}}(jQuery));/* latest_photo.js */
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
$(document).ready(function(){
	$Crabapple('.overlay_holder').overlay();
});
/* search.js */
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
			parameters.selectedTabIndex = $('.module_tabs li:eq('+index+')').attr('data-id');
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
	$showCarouselTabs = $Crabapple(".show-carousel .tabs")
	$showCarouselTabs.tabs(".show-carousel .content > li", {
		event: "mouseover",
		rotate: true,
		tabs: "li"
	})
	.slideshow({
		autoplay: true,
		interval: 4000,
		clickable: false
	});


	$Crabapple(".show-carousel").hover(
		function(){
			$showCarouselTabs.data("slideshow").stop();
		},
		function(){
			$showCarouselTabs.slideshow({interval: 4000}).play();
		}
	);
	
	// Workaround for Firefox "mouseover" bug for links with href - emulating "open link in new window".
	$Crabapple(".show-carousel .tabs a").click(function() {
		window.open($(this).children(".link").html(), "_self");
	});
});/* ccstu.js */
/**
 * Creates $CCSU global object which will hold all CCSU javascript stuff
 */
(function($) {
	$CCSTU = $.namespace('CCSTU');
}) (jQuery);

/* grid.js */
/*  grid.js */

$(document).ready(function() {
	
	if($('.grid').length) {
		var cornerStamp = $('.ad_300x250').length ? '.ad_block' : '';
		// Masonry corner stamp modifications 
	$.Mason.prototype.resize = function() {
		this._getColumns();
		this._reLayout();
	};
	$.Mason.prototype._reLayout = function( callback ) {
		var freeCols = this.cols;
		if ( this.options.cornerStampSelector ) {
			var $cornerStamp = this.element.find( this.options.cornerStampSelector ),
				cornerStampX = $cornerStamp.offset().left - 
				( this.element.offset().left + this.offset.x + parseInt($cornerStamp.css('marginLeft')) );
			freeCols = Math.floor( cornerStampX / this.columnWidth );
		}
		// reset columns
		var i = this.cols;
		this.colYs = [];
		while (i--) {
			this.colYs.push( this.offset.y );
		}

		for ( i = freeCols; i < this.cols; i++ ) {
			this.colYs[i] = this.offset.y + $cornerStamp.outerHeight(true);
		}

		// apply layout logic to all bricks
		this.layout( this.$bricks, callback );
	};
		$('.grid').masonry({
			itemSelector : '.box',
			isAnimated: false,
			cornerStampSelector: cornerStamp
		});

	}
});
/*-*//* instagram.js */
/**
 * @package:    CC Studios 2012 M12 Instagram 300
 * @module:     M12 Instagram 300 JavaScript
 * @link:       http://jira.mtvi.com/browse/ENTCCSTU-46
 */

$(function(){
	// noop function declaration for JSONP Ajax calls
	window.studiosCallbackInstagram = function(d) { return d; };
	// support multiple Instagram modules on a page
	$('.module.instagram').each(function(){
		
		// get the thumbnail template
		var lightboxTPL = $('.instagram-lightbox',this).remove(),
			instagramMiddle = $CC('.middle', this);
		if (lightboxTPL.attr('data-instagram-feed')) {
			$.ajax({
				url: lightboxTPL.attr('data-instagram-feed'),
				dataType: 'jsonp',
				cache: true,
				jsonpCallback: "studiosCallbackInstagram",
				success: function(data) {
					// build thumbnails and lightbox markup
					var i = 0,
						// build the template, but fix the img tags which don't have real src attributes to prevent erroneous 404s
						template = lightboxTPL.html().replace(/data-src=/g, 'src='),
						lightboxHTML,
						html = '';
					do {
						if (data[i])
						{
							// makes for easier templat matching
							data[i].photoStandardUrl = data[i].photo.standard_resolution.url;
							data[i].date = parseInstagramDate(data[i].date);
							// set the current lightbox html
							lightboxHTML = template;
							html +='<div class="thumbnail"><img src="'+data[i].photo.thumbnail.url+'"><div class="overlay"><!--x--></div><div class="instagram-lightbox" style="display: none;">';
							$.each(template.match(/%%([a-zA-Z]*)%%/g), function(){
								lightboxHTML = lightboxHTML.replace(''+this, data[i][(''+this).split('%%').join('')])
							});
							$.each(template.match(/%25%25([a-zA-Z]*)%25%25/g), function(){
								lightboxHTML = lightboxHTML.replace(''+this, encodeURIComponent(data[i][(''+this.replace(/%25/g, '%')).split('%%').join('')]))
							});
							html += lightboxHTML + '</div></div>';
						}
					} while (++i < 9 && i <= data.length)
					instagramMiddle.append(html).sharebar();
					
					// Instagram lightbox
					instagramMiddle.find('.thumbnail')
						// attach overlay to thumbnail links
						.click(function(e){
							e.preventDefault();
							$('div.instagram-lightbox', this).overlay().load();
						})
						// create overlays
						.find('div.instagram-lightbox').overlay({
							effect: 'apple',
							mask: {
								color: '#000',
								opacity: 0.5,
								loadSpeed: 200
							},
							fixed: false,
							speed: 200,
							left: 180,
							top: -70,
							close: '.close-overlay',
							onLoad: function() {
								// the overlay should be absolute, but the mask still needs to be fixed
								$('#exposeMask').css('position','fixed');
							}
						})
						// prevent links in overlay from re-launching the overlay
						.find('a').click(function(e){
							e.stopPropagation();
							if ($(this).hasClass("share")) {
								var uniqueId = $(this).parents("ul").attr("data-mediaid");
								var shareService = ( $(this).hasClass("fb")) ? ("fb") : ("twitter");
								shareBarLinkTracking(shareService, uniqueId);
							}
							if ($(this).is('.close-overlay')) {
								return false;
							}
						});
				}
			});
		}
	});
	
});

function parseInstagramDate(d) {
	var dateString = d.date;
	
	var dateSplit = dateString.split(" ");
	if (dateSplit.length != 2) return "";
	return getInstagramTime(dateSplit[1]) + " " + getInstagramDate(dateSplit[0]);
}
function getInstagramTime(t) {
	var timeParts = t.split(":");
	var hour = parseInt(timeParts[0]);
	var min = timeParts[1];
	if (hour > 12) return (hour - 12) + ":" + min + " PM";
	else return hour + ":" + min + "AM";
}
function getInstagramDate(d) {
	var dateParts = d.split("-");
	var year = dateParts[0];
	var month = parseInt(dateParts[1]);
	var day = parseInt(dateParts[2]);
	var m = "JAN";
	switch (month) {
	case 2:
		m = "FEB";
		break;
	case 3:
		m = "MAR";
		break;
	case 4:
		m = "APR";
		break;
	case 5:
		m = "MAY";
		break;
	case 6: 
		m = "JUN";
		break;
	case 7:
		m = "JUL";
		break;
	case 8:
		m = "AUG";
		break;
	case 9:
		m = "SEP";
		break;
	case 10:
		m = "OCT";
		break;
	case 11:
		m = "NOV";
		break;
	case 12:
		m = "DEC";
		break;
	}
	
	return m + " " + day + ", " + year;
}
/* news_feed-mosaic.js */
/**
 * @package: CC Studios 2012 M07 Homepage Feed
 * @module:  M07 Homepage Feed JavaScript
 * @link:    http://jira.mtvi.com/browse/ENTCCSTU-33
 */

$(document).ready(function(){
	var mosiacOnclickPattern = /(.*mosiacShareBarTracking\([^,]+,)([^,]+)(,.*)/;
	
	if($('.news_feed-mosaic').length) {

		$CCSU.HomepageFeed = {
			options: {
				module: '.news_feed-mosaic',
				moduleWidthPadding: 60,
				updateFeed: '/feeds/studios/news_feed/',
				updatePageNumber: 2,
				headerHeight: 80 - $('.ccstudio_header').height()
			},

			init: function() {
				this.createQueries();
				this.attachHandlers();
			},

			createQueries: function(){
				this.container = this.options.module + ' .middle:first-child';
				this.arcVideo = this.options.module + ' .show_video';
				this.tumblr = this.options.module + ' .tumblr';
				this.videoTumblr = this.tumblr + '.video';
				this.photoTumblr = this.tumblr + '.image';
				this.textTumblr = this.tumblr + '.text';
				this.instagram = this.options.module + ' .instagram';
				this.tweet = this.options.module + ' .tweet';
				this.loadMore = this.options.module + ' .load_more';
			},
			
			swapReportingLocation: function($_shareBarBlock){
				$_shareBarBlock.each(function(index) {
					//Adjust Reporting Function in Lightbox share from 'rollover' to 'lightbox' 
					$(this).find('a.clickShare[onclick]').each(function(index) {
					   var inlineOnclick = $(this).attr('onclick');

					   var matches = inlineOnclick.match(mosiacOnclickPattern);

					   // Overwrite inline onclick with second param set to 'lightbox'
					   if (typeof matches[3] != 'undefined'){
						   $(this).attr('onclick', matches[1] + "'lightbox'" +  matches[3]);
					   }
				   });
				});
			},
			
			attachHandlers: function(){
				var self = this;
				$(this.tweet + ' .tweet_text a').click(function(event){
					event.preventDefault();
					$(this).parent().click();
				});
				$(this.container).masonry({
					itemSelector : '.box',
					columnWidth: 252,
					isAnimated: true,
					isFitWidth: true
				});
				$(this.loadMore).click(function() {
					if ($(this).is('.loading')) {
						return false;
					}
					$(this).addClass('loading');
					$.ajax({
						url: self.options.updateFeed + self.options.updatePageNumber,
						context: document.body,
						success: function(data) {
							$(self.loadMore).removeClass('loading');
							self.options.updatePageNumber++;
							if (self.options.updatePageNumber >= 5) {
								$(self.loadMore).hide();
							}
							$(self.container).append(data).masonry({isAnimated: false}).masonry('reload').masonry({isAnimated: true});
							self.createQueries();
							self.attachLightbox();
							self.attachShareDropdown();
							FB.XFBML.parse();
	  					},
	  					error: function() {
	  						$(self.loadMore).removeClass('loading');
	  					}
					});
				});
				//fix Tumbler highlight if it's wrong formatted (<p><strong /></p>)
				$(this.tumblr).each(function(){
					if($(this).find('p:first-child strong').length) {
						$(this).find('p:first-child').css('color', '#fff');
					}
				});

				self.attachLightbox();
			},
			attachShareDropdown: function() {
				$CC('ul.share_bar li.share_button_container a.share_button').each(function() {
					$(this).unbind("click").bind({
						click:function(){
							$(this).toggleClass("openButton").siblings("ul.share_button_dropdown").slideToggle('fast');
							return false;
						}
					}); 
				});	
			},
			attachEmbedButton: function() {
			$('.embed_clip_container').show().each(function(){
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
			},
			attachLightbox: function() {
				var self = this;
				$(this.container + ' a').click(function(event) {
					if($(this).is('.tweet_share')) {
						$('body').addClass('click');
					} else {
						event.stopPropagation();
					}
				});
				$(this.arcVideo).bind('mouseover', function (event) {
					$(this).overlay({
						close: '.close_btn',
						mask: '#000',
						effect: 'apple',
						target: '#content',
						fixed: false,
						top: self.options.headerHeight,
						onBeforeLoad:function(){
							// Copy Share Bar from Masonry Brick
							var $shareBarBlock=$('#' + this.getTrigger().data('itemid')).clone(false,false);//.html();

							self.swapReportingLocation($shareBarBlock);
							var shareBarBlockHtml = $shareBarBlock.html();
							if(this.getTrigger().data('showname').length) {
								this.getOverlay().find('.header h2').html('<a href="' + this.getTrigger().data('show') + '">' + this.getTrigger().data('showname') + '</a>');
								this.getOverlay().find('.footer').html('<a href="' + this.getTrigger().data('show') + '">More Like This<span class="arrow"><!--x--></span></a>');
							}
							else {
								this.getOverlay().find('.header').hide();
								this.getOverlay().find('.header h2').html('');
								this.getOverlay().find('.footer').html('');
							}
							this.getOverlay().find('.data').html(shareBarBlockHtml + this.getTrigger().data('player') +	'<h3>' + this.getTrigger().data('title') + '</h3><p class="description">' +	this.getTrigger().data('description') + '</p>');
						},
						onLoad: function() {
							self.attachEmbedButton();
							self.attachShareDropdown();
							//add fb handler 
							//FB.Event.subscribe('edge.create', handleFacebookResponse);
							
							FB.Event.subscribe('edge.create',
							    funcVar = function(href, widget) {
									handleFacebookResponse(href, widget, 'lightbox');
							    }
							);
							
						},
						onClose: function() {
							FB.Event.unsubscribe('edge.create', funcVar);
							this.getOverlay().find('.data').html(' ');
							this.getOverlay().find('.header').show();
						}
					});
				});
				$(this.photoTumblr).bind('mouseover', function (event) {
					$(this).overlay({
						close: '.close_btn',
						mask: '#000',
						effect: 'apple',
						target: '#content',
						fixed: false,
						top: self.options.headerHeight,
						onBeforeLoad: function(){
							
							// Copy Share Bar from Masonry Brick
							var $shareBarBlock=$('#' + this.getTrigger().data('itemid')).parent().clone(true,true);//.html();
							
							self.swapReportingLocation($shareBarBlock);
							var shareBarBlockHtml = $shareBarBlock.html();
							
							if(this.getTrigger().data('showname').length) {
								this.getOverlay().find('.header h2').html('<a href="' + this.getTrigger().data('show') + '">' + this.getTrigger().data('showname') + '</a>');
								this.getOverlay().find('.footer').html('<a href="' + this.getTrigger().data('show') + '">More Like This<span class="arrow"><!--x--></span></a>');
							}
							this.getOverlay().find('.data').html('<div class="author"><img src="'+ this.getTrigger().data('authorimage') +'" width="55" height="57" /><span class="author_name">'+ this.getTrigger().data('authorname') +'</span><p>Via Tumblr</p></div>' + shareBarBlockHtml + this.getTrigger().data('image') + '<div class="description">' + this.getTrigger().data('description') + this.getTrigger().data('text') + '<a href="' + this.getTrigger().data('link') + '" target="_blank">' + this.getTrigger().data('link') + '</a></div>');
						},
						onLoad: function() {
							self.attachShareDropdown();
						},
						onClose: function() {
							this.getOverlay().find('.data').html(' ');
						}
					});
				});
				$(this.textTumblr).bind('mouseover', function (event) {
					$(this).overlay({
						close: '.close_btn',
						mask: '#000',
						effect: 'apple',
						target: '#content',
						fixed: false,
						top: self.options.headerHeight,
						onBeforeLoad: function() {
						
							// Copy Share Bar from Masonry Brick
							var $shareBarBlock=$('#' + this.getTrigger().data('itemid')).parent().clone(true,true);//.html();
							
							self.swapReportingLocation($shareBarBlock);
							var shareBarBlockHtml = $shareBarBlock.html();
						
							if(this.getTrigger().data('showname').length) {
								this.getOverlay().find('.header h2').html('<a href="' + this.getTrigger().data('show') + '">' + this.getTrigger().data('showname') + '</a>');
								this.getOverlay().find('.footer').html('<a href="' + this.getTrigger().data('show') + '">More Like This<span class="arrow"><!--x--></span></a>');
							}
							this.getOverlay().find('.data').html('<div class="author"><img src="'+ this.getTrigger().data('authorimage') +'" width="55" height="57" /><span class="author_name">'+ this.getTrigger().data('authorname') +'</span><p>Via Tumblr</p></div>' + shareBarBlockHtml + '<div class="description">' + this.getTrigger().data('description') + this.getTrigger().data('text') + '<a href="' + this.getTrigger().data('link') + '" target="_blank">' + this.getTrigger().data('link') + '</a></div>');
						},
						onLoad: function() {
							self.attachShareDropdown();
						},
						onClose: function() {
							this.getOverlay().find('.data').html(' ');
						}
					});
				});
				$(this.instagram).bind('mouseover', function (event) {
					$(this).overlay({
						close: '.close_btn',
						mask: '#000',
						effect: 'apple',
						target: '#content',
						fixed: false,
						top: self.options.headerHeight,
						onBeforeLoad: function(){
						
							// Copy Share Bar from Masonry Brick
							var $shareBarBlock=$('#' + this.getTrigger().data('itemid')).parent().clone(true,true);//.html();
							
							self.swapReportingLocation($shareBarBlock);
							var shareBarBlockHtml = $shareBarBlock.html();
						
							if(this.getTrigger().data('showname').length) {
								this.getOverlay().find('.header h2').html('<a href="' + this.getTrigger().data('show') + '">' + this.getTrigger().data('showname') + '</a>');
								this.getOverlay().find('.footer').html('<a href="' + this.getTrigger().data('show') + '">More Like This<span class="arrow"><!--x--></span></a>');
							}
							this.getOverlay().find('.data').html('<div class="author"><img src="'+ this.getTrigger().data('authorimage') +'" width="55" height="57" /><span class="author_name">'+ this.getTrigger().data('authorname') +'</span><p>Via Instagram</p></div>' + shareBarBlockHtml + this.getTrigger().data('image') + '<div class="description">' + this.getTrigger().data('description') + '</div>');
						},
						onLoad: function() {
							self.attachShareDropdown();
						},
						onClose: function() {
							this.getOverlay().find('.data').html(' ');
						}
					});
				});
				$(this.tweet).bind('mouseover', function (event) {
					$(this).overlay({
						close: '.close_btn',
						mask: '#000',
						effect: 'apple',
						target: '#content',
						fixed: false,
						top: self.options.headerHeight,
						onBeforeLoad: function() {
							// Copy Share Bar from Masonry Brick
							var $shareBarBlock=this.getTrigger().find('.share_bar').clone(true,true);//.html();
							
							self.swapReportingLocation($shareBarBlock);
							var shareBarBlockHtml = $shareBarBlock.html();
						
							if(this.getTrigger().data('showname').length) {
								this.getOverlay().find('.header h2').html('<a href="' + this.getTrigger().data('show') + '">' + this.getTrigger().data('showname') + '</a>');
								this.getOverlay().find('.footer').html('<a href="' + this.getTrigger().data('show') + '">More Like This<span class="arrow"><!--x--></span></a>');
							}
							this.getOverlay().find('.data').html('<div class="author"><img src="'+ this.getTrigger().find('.header img').attr('src') +'" width="55" height="57" /><span class="author_name tweet_name">'+ this.getTrigger().find('.header h3').text() +'</span><p>@' + this.getTrigger().data('twittername') + '</p></div><a href="https://twitter.com/intent/user?screen_name=' + this.getTrigger().data('twittername') + '" class="twitter_follow" onclick=\'autoLinkTrackEvent("twitter_follow", "' + this.getTrigger().find('.header p').text() + '");\'' + '">Follow</a><p class="description tweet_text">' + this.getTrigger().find('.tweet_text').html() + '</p><ul class="share_bar twitter">' + shareBarBlockHtml + '</ul><p class="date">'+ this.getTrigger().data('date') +'</p>');
						},
						onLoad: function() {
							if($('body').is('.click')){
								this.close();
							}
						},
						onClose: function() {
							$('body').removeClass('click');
						}
					});
				});
				
				// ERIK Reporting Handler for Opening Lightbox Overlay
				$(this.tweet + ',' + this.arcVideo + ',' + this.tumblr + ',' + this.instagram).unbind('click').bind('click', function (event) {
					classList=$(this).attr('class');
					
					reportingHandlerLightboxOpen(classList);
				});

				// END Reporting Handler
				
			}
		};
		$CCSU.HomepageFeed.init();
	}
});/* series-web_series.js */
/**
 * @package: CC Studios 2012 M17 Series Archive
 * @module:  M17 Series Archive JavaScript
 * @link:    http://jira.mtvi.com/browse/ENTCCSTU-175
 */

$(document).ready(function(){
	$Crabapple('.series-web_series select#sort').selectboxx({
		init: function() {},
		onChange: function(val, inst) {
			if (val == 1)
			{
				val = 'title';
			}
			else
			{
				val = 'data';
			}
			$($CCSU.Archive.ajaxSpinner).show();
			$CCSU.Archive.options.activeSortingTrigger = val;
			$CCSU.Archive.options.pageNumber = 1;
			$CCSU.Archive.options.clearAllData = true;
			$CCSU.Archive.options.resultsPerPage = 14;
			$CCSU.Archive.ajaxCall();
		}
	});
	$Crabapple('.series-web_series select#filter').selectboxx({
		init: function() {},
		onChange: function(val, inst) {
			$($CCSU.Archive.ajaxSpinner).show();
			$CCSU.Archive.options.categoryId = val;
			$CCSU.Archive.options.pageNumber = 1;
			$CCSU.Archive.options.clearAllData = true;
			$CCSU.Archive.options.resultsPerPage = 14;
			$CCSU.Archive.ajaxCall();
		}
	});
	
	if($('.series-web_series').length) {

		$CCSU.Archive = {
			options: {
				module: $('.series-web_series'),
				pageNumber: 2,
				resultsPerPage: 15,
				categoryId: '',
				activeSortingTrigger: 'date',
				updateFeed: '/feeds/studios/series_archive/',
				clearAllData: false
			},

			init: function() {
				this.createQueries();
				this.attachHandlers();
				this.equalHeights();
			},

			createQueries: function(){
				this.container = this.options.module.find('.middle .content');
				this.loadMore = this.options.module.find('.load_more');
				this.sortingTrigger = this.options.module.find('.sort_trigger span');
				this.categoryFilter = this.options.module.find('.menu li');
				this.ajaxSpinner = this.options.module.find('.ajax_spinner');
				this.updateFeed = this.options.updateFeed + this.options.module.data('id');
				this.showItemClass = '.web_series-child';
			},

			attachHandlers: function() {
				var self = this;
				this.loadMore.click(function(){
					if ($(this).is('.loading')) {
						return false;
					}
					$(this).addClass('loading');
					self.options.resultsPerPage = 15;
					self.ajaxCall();
				});
				this.sortingTrigger.add(this.categoryFilter).click(function(){
					if(!$(this).is('.active')) {
						$(self.ajaxSpinner).show();
						$(this).addClass('active').siblings().removeClass('active');
						if($(this).is(self.sortingTrigger)) {
							self.options.activeSortingTrigger = $(this).data('sort');
						} else if($(this).is(self.categoryFilter)) {
							self.options.categoryId = $(this).data('sort');
						}
						self.options.pageNumber = 1;
						self.options.clearAllData = true;
						self.ajaxCall();
					}
				});
			},
			ajaxCall: function() {
				var self = this;
				$.ajax({
					url: self.updateFeed + '?page=' + self.options.pageNumber + '&category=' + self.options.categoryId + '&sort=' + self.options.activeSortingTrigger
						+ '&numberOfItems='+ self.options.resultsPerPage,
					context: document.body,
					success: function(data) {
						self.options.pageNumber++;
						if($(self.ajaxSpinner).length){
							$(self.ajaxSpinner).hide();
						}
						//count show items in response and if it less then results per page should be, "load more" button will be hide
						if ($('<html />').html(data).find(self.showItemClass).length < self.options.resultsPerPage) {
							$(self.loadMore).hide();
						} else {
							$(self.loadMore).show();
						}
						if($('.loading').length) {
							$(self.loadMore).removeClass('loading');
						}
						if(self.options.clearAllData == true) {
							$(self.container).html('');
							self.options.clearAllData = false;
						}
						$(self.container).append(data);
						self.equalHeights();
					},
					error: function() {
						$(self.ajaxSpinner).hide();
						$(self.loadMore).removeClass('loading');
					}
				});
			},
			// making show titles the same height in the same row
			equalHeights: function() {
				var iteration = 0,
					row = this.container.find('.row'),
					title = this.showItemClass + ' h3';
				$(row).each(function() {
					var currentTallest = 0;
					iteration+= 1;
					$(this).addClass('number' + iteration);
					$(this).find(title).each(function() {
						if ($(this).height() > currentTallest) {
							currentTallest = $(this).height();
						}
					});
					$(this).find(title).css({'height': currentTallest});
				});
			}
		};
		$CCSU.Archive.init();
	}
});/* series_feed-vertical.js */
/**
 * @package:    CC Studios 2012 M11 Series Feed
 * @module:     M11 Series Feed JavaScript
 * @link:       http://jira.mtvi.com/browse/ENTCCSTU-61
 */
// empty function for JSONP caching

$(function() {
	// noop function declaration for JSONP Ajax calls
	window.studiosCallbackSeriesFeed = function(d) {return d;}
	// animation speed
	var fxSpeed = 200;
	// build feed elements
	function buildFeed(data, templates, twitterReplies) {
		var newFeedObj = '';
		// loop through the items
		$.each(data, function(idx, feedObj){
			var feedType = feedObj.source + ((twitterReplies) ? "-reply" : ""),
				twitterData = '',
				thisTPL = '' + templates[feedType];
			dateStr = feedObj.date.date.replace(/-/g,'/') + ' GMT+' + (feedObj.date.timezone.split('+').join('').split(':').join(''));
			$Crabapple.utils.DateTime.currentDate = new Date(dateStr);
			feedObj.dateFormatted = $Crabapple.utils.DateTime.format("g:iA - M j, Y");
			feedObj.relativeTime = $Crabapple.utils.DateTime.relativeTime(new Date(dateStr));
			// build list item
			newFeedObj += "<li class='" + feedType + " new-item' style='display: none;'"
				+ twitterData
				+ ">"
				+ thisTPL.replace(/%%([a-zA-Z]*)%%/g, function(match, sub){
					return feedObj[sub];
				})
				+ "</li>";
		});
		return newFeedObj;
	}
	// search tumbler posts and find big ones
	function showMore() {
		$('.series_feed-vertical li.tumblr').each(function() {
			var $tumblr = $(this),
				$showMore = $tumblr.find('.show_more'),
				$description = $tumblr.find('.description');
			//check if tumblr has big description more than 750px(690+paddings)
			if($description.height() > 690) {
					$description.height(690);
				$showMore.show().toggle(function() {
					$description.height('auto');
					$showMore.remove();
				}, function() {
					$description.height(690);
					$showMore.removeClass('show_less');
				});
			}
		});
	}
	showMore();
	// support multiple Series Feed modules on a page
	$('.series_feed-vertical').each(function(){
		var feedEl = $('.feed', this),
			feedUrl = feedEl.attr('data-feed-link'),
			feedReplyUrl = feedEl.attr('data-reply-feed'),
			feedTypeTPL = {},
			feedTPL = $('.studios_series_feed_template', this)
				.remove()
				.find('li')
				.each(function(){
					feedTypeTPL[$(this).attr('class')] = $(this).html().replace(/data-src/g, 'src');
				}),
			loadMore = $('.load_more', this),
			maxItemsPerPage = 5,
			pageNum = 2;
		
		// load more feed items
		loadMore.click(function(e){
			if ($(this).is('.loading')) {
				return false;
			}
			// load the next 10 items
			$(this).addClass('loading');
			$.ajax(
				feedUrl.replace('%%pageNum%%', pageNum),
				{
					success: function(data) {
						loadMore.removeClass('loading');
						// iterate the page number ONLY if we got the data
						pageNum++;
						// build new feed elements
						var feedItems = $(data).find('.feed > li').addClass('new-item').hide().remove();
						if (feedItems.length > 0) {
							feedEl.append(feedItems);
							
							$CC(feedEl.find('.new-item'))
								// enable the share bar
								.sharebar()
								// mark the items as no longer "new"
								.removeClass('new-item')
								.slideDown(fxSpeed)
								// find tweets with replies
								.filter('.twitter[data-reply-count!=0]').find('a.more_replies').show();
							
							showMore();
						}
						if (feedItems.length < maxItemsPerPage) {
							loadMore.hide();
						}
					}
				}
			);
		});
		
		// check for tweets with replies
		$(this).delegate(
			'.twitter[data-reply-count!=0] a.more_replies',
			'click',
			function(e){
				e.preventDefault();
				var li = $(this).addClass('loading').parents('.twitter'),
					replies = $('ul.replies', li);
				$.ajax(
					feedReplyUrl.replace('%%id%%', li.attr('data-tweet-id')),
					{
						dataType: 'jsonp',
						jsonpCallback: 'studiosCallbackSeriesFeed',
						cache: true,
						success: function(data) {
							replies.append(buildFeed(data, feedTypeTPL, true))
								.find('.new-item')
								.slideDown(fxSpeed)
								.removeClass('new-item');
						},
						complete: function() {
							$('a.more_replies', li).hide();
						}
					}
				)
			}
		);

	});
});/* video-video_player_large.js */
(function($) {
	if ($('.ccstudio_clip_player.video_player_module').length) {
		var videoPlayerLarge = {
			_loadContent: function($link, event, selector) {
				event.preventDefault();
				var $content = $link.parent().parent().find(selector);
				$link.find('.triangle').toggleClass('opened');
				$content.toggleClass('hidden').toggleClass('shown');
			},
			init: function() {
				var self = this;
			    $('.ccstudio_clip_player').delegate('.load_comments', "click", function(event) {
			    	self._loadContent($(this), event, '.fb-comments');
			    });
			    $('.ccstudio_clip_player').delegate('.load_description', "click", function(event) {
			    	self._loadContent($(this), event, '.meta');
			    });
			}
		}
		videoPlayerLarge.init();
	}
}) (jQuery);
/* video-web_video_carousel.js */
(function($) {
	if ($('.video-web_video_carousel').length) {

		$CC('#spinnyThingy').webvideocarousel({
			ajaxUrl: function () {
				return '/feeds/studios/show_video_carousel/'+ $('#spinnyThingy').data('promotionid') +'/'
					+ $('#spinnyThingy').data('showid') + '/';
			}
		});
		$CCSTU.episodeCarousel = {
			options: {
				episodeCarousel: $('.episodeCarousel'),
				episodeCarouselElement: $('.episodeCarousel li'),
				tooltip: $('.tooltips li')
			},

			init: function() {
				this.initCarousel();
				this.highlightActiveEpisode(true);
				this.applyTooltips();
				this.attachHandlers();
			},

			initCarousel: function() {
				var episodeCarousel = this.options.episodeCarousel,
					episodeCarouselElement = this.options.episodeCarouselElement;
				episodeCarousel.carouFredSel({
					width: 780,
					height: 41,
					circular: false,
					infinite: false,
					align: 'left',
					scroll: {
						items: 1,
						duration: 1000,
						timeoutDuration: 2000,
						onAfter: function() {
							episodeCarouselElement.removeClass('visible');
							episodeCarousel.triggerHandler("currentVisible").addClass('visible');
						}
					},
					auto: false,
					prev: '.prevEpisode',
					next: '.nextEpisode'
				});
			},
			highlightActiveEpisode: function (firstRun) {
				var currentEpisodeId = $('.video-web_video_carousel .current')[0].id,
					self = this;
					this.options.episodeCarouselElement.removeClass('active').each(function() {
					if($(this).data('id') == currentEpisodeId) {
						$(this).addClass('active');
						if(firstRun || !self.options.episodeCarousel.find('.active').hasClass('visible')) {
							if(firstRun) {
								self.options.episodeCarousel.triggerHandler("currentVisible").addClass('visible');
							}
							self.options.episodeCarousel.trigger('slideTo', '.active');
						}
						return;
					}
				});
			},
			applyTooltips: function () {
				var $target = this.options.episodeCarouselElement.find('img'),
					$tooltip = this.options.tooltip,
					isIE = document.all ? true : false,
					tooltipIndex = 0;
				$target.mousemove(pos).mouseover(show).mouseleave(hide);

				function show (event) {
					tooltipIndex = $target.index($(event.currentTarget));
					$tooltip.eq(tooltipIndex).show();
				}
			
				function hide () {
					$tooltip.hide();
				}
			
				function pos (event) {
					var top       = isIE ? event.clientY + document.documentElement.scrollTop : event.pageY,
						left      = isIE ? event.clientX + document.documentElement.scrollLeft : event.pageX,
						width     = $tooltip.eq(tooltipIndex).outerWidth(),
						height    = $tooltip.eq(tooltipIndex).outerHeight(),
						relative  = $tooltip.eq(tooltipIndex).offsetParent(),
						relativeY = parseInt(relative.offset().top),
						relativeX = parseInt(relative.offset().left);
					
					$tooltip.eq(tooltipIndex).css('top', (top - (height + 5) - relativeY));
					$tooltip.eq(tooltipIndex).css('left', (left - (width / 2) - relativeX));
				}
			},

			attachHandlers: function () {
				var self = this;
				this.options.episodeCarouselElement.click(function() {
					if($(this).hasClass('active')) {
						return;
					}
					var videoId = $(this).data('id'),
						url = $(this).data('url');
					self.options.episodeCarouselElement.removeClass('active');
					$(this).addClass('active');
					$CC('#spinnyThingy').webvideocarousel('getVideoById', videoId, url);
				});
			}
		}
		$CCSTU.episodeCarousel.init();
	}
}) (jQuery);/* video-web_video_showcase.js */
/**
 * @package:    CC Studios 2012 M10 Series Video Showcase
 * @module:     M10 Series Video Showcase JavaScript
 * @link:       http://jira.mtvi.com/browse/ENTCCSTU-85
 */
$(document).ready(function(){
	if ($('.video-web_video_showcase').length) {
		var content = '.video-web_video_showcase',
			resultsPerPage = 12,
			moduleInitialHeight = 70,
			updatePageNumber = 2,
			showHideBtn = content + ' .show',
			dataContainer = content + ' .middle',
			episode = dataContainer + ' .episode',
			ajaxSpinner = dataContainer + ' .ajax_spinner',
			loadMore = content + ' .load_more',
			numberOfPages = Math.ceil($(loadMore).data('number') / resultsPerPage),
			showId = $(loadMore).data('showid'),
			updateFeed = '/feeds/studios/show_video_showcase/' + showId + '/',
			$shadow = $('.shadow'),
			playerFeed = '';
		$(showHideBtn).toggle(function(){
			$(this).html('Hide Episodes <span class="triangle opened"></span>');
			$shadow.hide();
			$(content).css('height', 'auto');
		},
		function(){
			$(this).html('View Episodes <span class="triangle"></span>');
			$shadow.show();
			$(content).css('height', moduleInitialHeight +'px');
		});

		$(episode).live('click', function(){
			var videoId = $(this).data('id'),
				url = $(this).data('url'),
				offset = $('.video-web_video_carousel').offset();
			if (offset.top && !isNaN(offset.top)) {
				$(document).scrollTop(offset.top);
			}
			$Crabapple.web_video_carousel.getVideoById(videoId, url);
		});

		$(loadMore).click(function(){
			$(loadMore).hide();
			$(ajaxSpinner).show();
			$.ajax({
				url: updateFeed + updatePageNumber,
				context: document.body,
				success: function(data) {
					$(ajaxSpinner).hide();
					updatePageNumber++;
					$(dataContainer).append(data);
					if (updatePageNumber <= numberOfPages) {
						$(loadMore).show();
					}
				},
				error: function() {
					$(ajaxSpinner).hide();
					$(loadMore).show();
				}
			});
		});
	}
});/* web_series_list.js */
/*  web_series_list.js */

$(document).ready(function(){
	if($('.web_series_list').length) {					
		var	regLink     = new RegExp('http:\\/\\/\\S+', 'g'),
			regHashtag  = new RegExp('\\B#([_a-zA-Z0-9]+)', 'g'),
			regReply    = new RegExp('\\B@([_a-zA-Z0-9]+)', 'g'),
			$content    = $('.web_series_list .description');
			/* colorize hashtags */
			$content.each(function() {
				var result = $(this).text().replace(regLink, function (link) {
					return '<span class="hash_tag">' + link + '</span>';
				}).replace(regHashtag, function (hashtag) {
					return '<span class="hash_tag">' + hashtag + '</span>';
				}).replace(regReply, function (reply) {
					return '<span class="hash_tag">' + reply + '</span>';
				});
				$(this).html(result);
			});
	}
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
/* tumblr.js */
/*
 * Tumblr Feed Object
 */
var tumblr_feed = {

	templates: null,
	feed_error_msg: '<div class="blog_entry" style="text-align:center;font-weight:bold;">Tumblr is experiencing technical difficulties. Please stay tuned.</div>',
	resultsObject: null,
	feed_url: null,
	blog_url: '',
	_images_total: 0,
	_images_loaded: 0,
	_show_more_enable: true,
	loading_image:'',
	maxPostHeight: 710,
	
	init: function(moduleClass, hostname, feedURL, loadingImage) {
		
		this.resultsObject = $('.' + moduleClass);
		var display_type = this._getDisplayType();

		if (this.resultsObject.length == 0)
		{
			//console.log("Can't find item ."+moduleClass+" for inserting tumblr data");
			return;
		}

		this.feed_url = feedURL;
		this.blog_url = 'http://'+hostname+'.tumblr.com/';
		
		this.loading_image = loadingImage;
		
		if (display_type != null)
		{
			this.feed_url += '?tumblr_type=' + display_type;
		}
		
		this._determineTemplates();
		this.query();
		
	},

	_determineTemplates: function() {
		var shar_bar = ''
			+ '<div id="mod_{post_id}" class="module share_bar_wrapper_v2 noAutoLinkTracking tumblr_sharing">'
				+ '<ul class="share_bar clearfix">'
					+ '<li class="reblog">'
						+ '<a class="share_button clickShare" href="http://tumblr.com/reblog/{post_id}/{reblog_key}?redirect_to=%2Ftagged%2Freblog-button" onclick="mosiacShareBarTracking(\'tumblr\', \'\', \'http://tumblr.com/reblog/{post_id}/{reblog_key}?redirect_to=%2Ftagged%2Freblog-button\');" target="_blank">Reblog</a>'
					+ '</li>'
					+ '<li class="share_button_container">'
						+ '<a class="share_button" href="#" data-mediaid="{post_id}">Share<span class="arrow"><!-- arrow --></span></a>'
						+ '<ul class="share_button_dropdown big" data-mediaid="{post_id}">'
							+ '<li>'
								+ '<a class="share fb clickShare" href="http://www.facebook.com/sharer.php?u={post_url}?xrs=share_fb&amp;t={post_title}" target="_blank"><!----></a>'
							+ '</li>'
							+ '<li>'
								+ '<a class="share twitter clickShare" href="https://twitter.com/share?url={post_url}?xrs=share_twitter&amp;text={post_title}" target="_blank"><!----></a>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>';
		
		var common = ''
			+ '<div class="posted bggray">'
				+ '{date_string}'
				+ '<a class="notes" href="{post_url}" target="_blank">{note_count} notes</a>'
			+ '</div>'
			+ '<div class="buttons">' + shar_bar + '</div>'			
			+ '<div class="tags bggray">'
				+ 'Tagged: {post_tags}' 
			+ '</div>';
			
		this.templates = {
			text: '<div class="tumblr_post">'
					+ '<div class="max-height">'
						+ '<div class="real-height">'
							+ '<div class="title">{post_title}</div>'
							+ '<div class="text">'
								+ '{post_text}'
							+ '</div>'
						+ '</div>'
					+ '</div>'
					+ common
				+ '</div>',

			video: '<div class="tumblr_post">'
					+ '<div class="max-height">'
						+ '<div class="real-height">'
							+ '<div class="promo">{post_video}</div>'
							+ '<div class="text">'
								+ '{caption}'
							+ '</div>'
						+ '</div>'
					+ '</div>'
					+ common
				+ '</div>',
				
			photo: '<div class="tumblr_post">'
					+ '<div class="max-height">'
						+ '<div class="real-height">'
							+ '<div class="promo">'
								+ '{post_photos}'
							+ '</div>'
							+ '<div class="text">'
								+ '{caption}'
							+ '</div>'
						+ '</div>'
					+ '</div>'
					+ common
				+ '</div>'
					
									
		}
	},

	query: function() {
		var loadingImg = this.loading_image;
		jQuery.ajax({
			type: "GET",
			url: this.feed_url,
			cache: true,
			success: function(data) {
				if (data != null && data != false && data != "") {
					tumblr_feed.querySuccess(data);
				}
				else
				{
					tumblr_feed.queryError();
				}
				$('#'+loadingImg).remove();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				tumblr_feed.queryError();
				$('#'+loadingImg).remove();
			}
		});
		
	},

	queryError: function() {
		//console.log('There was an error during query to '+this.feed_url);
		this.resultsObject.find('.middle').append(this.feed_error_msg);
	},

	querySuccess: function(posts) {
		var html = '';
		var display_type = this._getDisplayType();
		
		// loop through each post obj
		$.each(posts, function(i, val) {
			
			if ((!display_type || display_type == 'photo') && posts[i].itemType == "photo") {
				html += tumblr_feed.processPhotoTemplate(posts[i]);
			}

			if ((!display_type || display_type == 'text') && posts[i].itemType == "text") {
				html += tumblr_feed.processTextTemplate(posts[i]);
			}

			if ((!display_type || display_type == 'video') && posts[i].itemType == "video") {
				html += tumblr_feed.processVideoTemplate(posts[i]);
			}
			
		});

		if (html == '')
		{
			this.queryError();
			return;
		}
		
		this.resultsObject.show().find('.middle').append(html).find('.tumblr_post:last').addClass('last');	
		
		this._initShare();
		
		this._checkForShowMore();
	},

	processPhotoTemplate: function(post) {

		var replace_map = {};
		var template = this.templates.photo;
		var photo;
		var photos = new Array();
		var i;
		
		var width_optimal = 500;
		console.log(post);
		if (post.photos.length > 1)
		{
			width_optimal = 250;
		}
		
		for (i = 0; i < post.photos.length; i++)
		{
			photo = post.photos[i];
			photos[i] = {};
			
			$.each(photo.alt_sizes, function(alt_sizes_i, alt_sizes_val) {

				if ( photos[i].img_url == undefined && parseInt(photo.alt_sizes[alt_sizes_i].width) <= width_optimal )
				{
					photos[i].img_width = photo.alt_sizes[alt_sizes_i].width;
					photos[i].img_height = photo.alt_sizes[alt_sizes_i].height;
					photos[i].img_url = photo.alt_sizes[alt_sizes_i].url;
				}

			});

			if (photos[i].img_url == undefined)
			{
				photos[i].img_width = photo.original_size.width;
				photos[i].img_height = photo.original_size.height;
				photos[i].img_url = photo.original_size.url;
			}
			
			if (i == 0)
			{
				var width = photos[i].img_width;
				var height = photos[i].img_height;
			}
			
			photos[i].width = width;
			photos[i].height = height;
		}

		replace_map.post_title = '';
		replace_map.post_url = post.url;				
		replace_map.caption = post.excerpt;
		
		replace_map.date_string = this._dateToString(post);
		replace_map.note_count = post.numberOfReplies;
		replace_map.post_tags = this._tagsToString(post);
		replace_map.reblog_key = post.reblogKey;
		replace_map.post_id = post.id;
		
		var photos_str = '';
		for (i = 0; i < photos.length; i++)
		{
			photos_str += '<img src="'+photos[i].img_url+'" alt="" width="'+photos[i].width+'" height="'+photos[i].height+'" />';
		}
		
		replace_map.post_photos = photos_str;

		return this._doReplace(template, replace_map);
	},

	processTextTemplate: function(post) {

		var replace_map = {};
		var template = this.templates.text;

		replace_map.post_title = post.title;
		replace_map.post_text = post.text;
		replace_map.post_url = post.url;
		replace_map.date_string = this._dateToString(post);
		replace_map.note_count = post.numberOfReplies;
		replace_map.post_tags = this._tagsToString(post);
		replace_map.reblog_key = post.reblogKey;
		replace_map.post_id = post.id;

		this._images_total = $(replace_map.post_text).find('img').length;
		
		if (this._images_total > 0)
		{
			var tmp = $('<div>').append(replace_map.post_text);
			tmp.find('img').each(function(index) {
				if (index < 1)
				{
					$(this).load(function(){
						tumblr_feed._imageLoaded();
					});
				}
				else
				{
					$(this).remove();
				}
			});
			
			replace_map.post_text = tmp.html();
			replace_map.post_text = replace_map.post_text.replace(new RegExp('<p></p>', 'gi'), '');
			replace_map.post_text = replace_map.post_text.replace(new RegExp('<p>&nbsp;</p>', 'gi'), '');

		}
		
		return this._doReplace(template, replace_map);
	},

	processVideoTemplate: function(post) {

		var replace_map = {};
		var template = this.templates.video;
		
		replace_map.post_url = post.url;
		replace_map.post_title = '';
		replace_map.caption = post.text;
		replace_map.date_string = this._dateToString(post);
		replace_map.note_count = post.numberOfReplies;
		replace_map.post_tags = this._tagsToString(post);
		replace_map.reblog_key = post.reblogKey;
		replace_map.post_id = post.id;
		replace_map.post_video = post.excerpt;
		
		return this._doReplace(template, replace_map);
	},
	
	_doReplace: function(template, replace_map) {

		var item = null;
		for (item in replace_map)
		{
			template = template.replace(new RegExp('{'+item+'}', 'g'), replace_map[item]);
		}

		return template;
	},

	_getDisplayType: function() {

		var url_string = window.location.href.toLowerCase();
		var display_type = null;

		if (url_string.indexOf('tumblr_type=text') > 0)
		{
			display_type = 'text';
		}
		else if (url_string.indexOf('tumblr_type=video') > 0)
		{
			display_type = 'video';
		}
		else if (url_string.indexOf('tumblr_type=photo') > 0)
		{
			display_type = 'photo';
		}
		
		return display_type;
	},
	
	_imageLoaded: function() {
		
		this._images_loaded++;
		this._checkForShowMore();
		
	},
	
	_checkForShowMore: function() {

		this.resultsObject.find('.show_more').remove();

		if (this._show_more_enable == true)
		{
			this.resultsObject.find('.tumblr_post').each(function() {
				
				if ($(this).height() > tumblr_feed.maxPostHeight)
				{
					var maxHeight = tumblr_feed.maxPostHeight 
									- $(this).find('.posted').height();
									- $(this).find('.tags').height();

					$(this).find('.max-height').css({'max-height': maxHeight+'px', 'overflow': 'hidden', 'position': 'relative'});

					var showMore = $('<a href="javascript:void();" class="show_more">Show more <span /></a>');
					showMore.click(function(){
						var realHeight = $(this).parent().find('.real-height').height() + 40;
						$(this).parent().animate({ 'max-height': realHeight }, function(){ $(this).removeAttr('style'); }).find('.show_more').remove();
						return false;
					});
					
					$(this).find('.max-height').append(showMore);
				}
			});
		}
		
	},
	
	_tagsToString: function(post) {
		
		var tags = '';
		var tag;
		var i;
		
		for (i = 0; i < post.tags.length; i++)
		{
			if (tags != '')
			{
				tags += ', ';
			}
			
			tag = encodeURI(post.tags[i].replace(new RegExp(' ', 'g'), '-'));
			tags += '<a href="'+this.blog_url+'tagged/'+tag+'" target="_blank">' + post.tags[i] + '</a>';
		}
		
		return tags;
	},
	
	_dateToString: function(post) {

		var date = post.date_string;

		if (post.reblogged_from_id != undefined && post.reblogged_from_id != '')
		{
			date = 'Reblogged ' + date + ' from ' + post.reblogged_from_name;
		}
		else
		{
			date = 'Posted ' + date;
		}
		
		return date;
	},
	
	_initShare: function() {
		tumblr_feed.resultsObject.find('.middle').find('.share_button_container .share_button'). click(function(){
			$(this).toggleClass('open').parent().find('.share_button_dropdown').slideToggle();
			return false;
		});		
	}
		
}

$('.show_tumblr').find('.show_more').click(function(){
	$(this).parent().animate({ 'max-height': $(this).parent().find('.real-height').height() }).find('.show_more').remove(); 
	return false;
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
$(function() {
	if ($(".module.video_showcase").length) {
		
		$Crabapple("select[name=seasons]").selectboxx({
			init:function(){},
			onChange: function (val, inst) {
				var seasonId = val;
				if ($(this).attr("data-selected")) 
					var pattern = $(this).attr("data-selected");
				else
					var pattern = "all";
				
				$(this).attr("data-selected", seasonId);
				
				$(".module.video_showcase .pagination_wrap a").each(function() {
					var href = $(this).attr("href");
					href = href.replace(pattern + "?", seasonId + "?");
					$(this).attr("href", href);
				});
				
				$(".module.video_showcase .pagination_wrap ul li:first a").trigger("click");
			}
		});
		$(".video_showcase .sorting span").live('click',function(){
			if($(this).hasClass("active")) {
				return false;
			}
			
			var sortBy = $(this).data("sort"),
				$paginationContainer = $(".module.video_showcase .pagination_wrap"),
				$currentPageLink = $paginationContainer.find(".current"),
				sortingHref = $currentPageLink.attr("href") +'&sortBy=' + sortBy;

			$(this).addClass("active").siblings().removeClass("active");
			$currentPageLink.attr("href", sortingHref).click();
		});
	}

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

	$CC('.cappy .moreLinks .links li:last').addClass('last');
	
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
/* tabs.js */
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
		/*if (location.hash && conf.tabs == "a" && root.find("[href=" +location.hash+ "]").length) {
			self.click(location.hash);

		} else {*/
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		//}				
		
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

/* http://platform.twitter.com/widgets.js */
if(!window.__twttrlr){(function(a,b){function s(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}function t(a){return Array.prototype.slice.call(a)}function v(a,b){for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function w(){var a=t(arguments),b=[];for(var c=0,d=a.length;c<d;c++)a[c].length>0&&b.push(a[c].replace(/\/$/,""));return b.join("/")}function x(a,b,c){var d=b.split("/"),e=a;while(d.length>1){var f=d.shift();e=e[f]=e[f]||{}}e[d[0]]=c}function y(){}function z(a,b){this.id=this.path=a,this.force=!!b}function A(a,b){this.id=a,this.body=b,typeof b=="undefined"&&(this.path=this.resolvePath(a))}function B(a,b){this.deps=a,this.collectResults=b,this.deps.length==0&&this.complete()}function C(a,b){this.deps=a,this.collectResults=b}function D(){for(var a in d)if(d[a].readyState=="interactive")return l[d[a].id]}function E(a,b){var d;return!a&&c&&(d=k||D()),d?(delete l[d.scriptId],d.body=b,d.execute()):(j=d=new A(a,b),i[d.id]=d),d}function F(){var a=t(arguments),b,c;return typeof a[0]=="string"&&(b=a.shift()),c=a.shift(),E(b,c)}function G(a,b){var c=b.id||"",d=c.split("/");d.pop();var e=d.join("/");return a.replace(/^\./,e)}function H(a,b){function d(a){return A.exports[G(a,b)]}var c=[];for(var e=0,f=a.length;e<f;e++){if(a[e]=="require"){c.push(d);continue}if(a[e]=="exports"){b.exports=b.exports||{},c.push(b.exports);continue}c.push(d(a[e]))}return c}function I(){var a=t(arguments),b=[],c,d;return typeof a[0]=="string"&&(c=a.shift()),u(a[0])&&(b=a.shift()),d=a.shift(),E(c,function(a){function f(){var e=H(t(b),c),f;typeof d=="function"?f=d.apply(c,e):f=d,typeof f=="undefined"&&(f=c.exports),a(f)}var c=this,e=[];for(var g=0,h=b.length;g<h;g++){var i=b[g];v(["require","exports"],i)==-1&&e.push(G(i,c))}e.length>0?J.apply(this,e.concat(f)):f()})}function J(){var a=t(arguments),b,c;typeof a[a.length-1]=="function"&&(b=a.pop()),typeof a[a.length-1]=="boolean"&&(c=a.pop());var d=new B(K(a,c),c);return b&&d.then(b),d}function K(a,b){var c=[];for(var d=0,e;e=a[d];d++)typeof e=="string"&&(e=L(e)),u(e)&&(e=new C(K(e,b),b)),c.push(e);return c}function L(a){var b,c;for(var d=0,e;e=J.matchers[d];d++){var f=e[0],g=e[1];if(b=a.match(f))return g(a)}throw new Error(a+" was not recognised by loader")}function N(){return a.using=m,a.provide=n,a.define=o,a.loadrunner=p,M}function O(a){for(var b=0;b<J.bundles.length;b++)for(var c in J.bundles[b])if(c!=a&&v(J.bundles[b][c],a)>-1)return c}var c=a.attachEvent&&!a.opera,d=b.getElementsByTagName("script"),e=0,f,g=b.createElement("script"),h={},i={},j,k,l={},m=a.using,n=a.provide,o=a.define,p=a.loadrunner;for(var q=0,r;r=d[q];q++)if(r.src.match(/loadrunner\.js(\?|#|$)/)){f=r;break}var u=Array.isArray||function(a){return a.constructor==Array};y.prototype.then=function(b){var c=this;return this.started||(this.started=!0,this.start()),this.completed?b.apply(a,this.results):(this.callbacks=this.callbacks||[],this.callbacks.push(b)),this},y.prototype.start=function(){},y.prototype.complete=function(){if(!this.completed){this.results=t(arguments),this.completed=!0;if(this.callbacks)for(var b=0,c;c=this.callbacks[b];b++)c.apply(a,this.results)}},z.loaded=[],z.prototype=new y,z.prototype.start=function(){var a=this,b,c,d;return(d=i[this.id])?(d.then(function(){a.complete()}),this):((b=h[this.id])?b.then(function(){a.loaded()}):!this.force&&v(z.loaded,this.id)>-1?this.loaded():(c=O(this.id))?J(c,function(){a.loaded()}):this.load(),this)},z.prototype.load=function(){var b=this;h[this.id]=b;var c=g.cloneNode(!1);this.scriptId=c.id="LR"+ ++e,c.type="text/javascript",c.async=!0,c.onerror=function(){throw new Error(b.path+" not loaded")},c.onreadystatechange=c.onload=function(c){c=a.event||c;if(c.type=="load"||v(["loaded","complete"],this.readyState)>-1)this.onreadystatechange=null,b.loaded()},c.src=this.path,k=this,d[0].parentNode.insertBefore(c,d[0]),k=null,l[c.id]=this},z.prototype.loaded=function(){this.complete()},z.prototype.complete=function(){v(z.loaded,this.id)==-1&&z.loaded.push(this.id),delete h[this.id],y.prototype.complete.apply(this,arguments)},A.exports={},A.prototype=new z,A.prototype.resolvePath=function(a){return w(J.path,a+".js")},A.prototype.start=function(){var a,b,c=this,d;this.body?this.execute():(a=A.exports[this.id])?this.exp(a):(b=i[this.id])?b.then(function(a){c.exp(a)}):(bundle=O(this.id))?J(bundle,function(){c.start()}):(i[this.id]=this,this.load())},A.prototype.loaded=function(){var a,b,d=this;c?(b=A.exports[this.id])?this.exp(b):(a=i[this.id])&&a.then(function(a){d.exp(a)}):(a=j,j=null,a.id=a.id||this.id,a.then(function(a){d.exp(a)}))},A.prototype.complete=function(){delete i[this.id],z.prototype.complete.apply(this,arguments)},A.prototype.execute=function(){var a=this;typeof this.body=="object"?this.exp(this.body):typeof this.body=="function"&&this.body.apply(window,[function(b){a.exp(b)}])},A.prototype.exp=function(a){this.complete(this.exports=A.exports[this.id]=a||{})},B.prototype=new y,B.prototype.start=function(){function b(){var b=[];a.collectResults&&(b[0]={});for(var c=0,d;d=a.deps[c];c++){if(!d.completed)return;d.results.length>0&&(a.collectResults?d instanceof C?s(b[0],d.results[0]):x(b[0],d.id,d.results[0]):b=b.concat(d.results))}a.complete.apply(a,b)}var a=this;for(var c=0,d;d=this.deps[c];c++)d.then(b);return this},C.prototype=new y,C.prototype.start=function(){var a=this,b=0,c=[];return a.collectResults&&(c[0]={}),function d(){var e=a.deps[b++];e?e.then(function(b){e.results.length>0&&(a.collectResults?e instanceof C?s(c[0],e.results[0]):x(c[0],e.id,e.results[0]):c.push(e.results[0])),d()}):a.complete.apply(a,c)}(),this},I.amd={};var M=function(a){return a(J,F,M,define)};M.Script=z,M.Module=A,M.Collection=B,M.Sequence=C,M.Dependency=y,M.noConflict=N,a.loadrunner=M,a.using=J,a.provide=F,a.define=I,J.path="",J.matchers=[],J.matchers.add=function(a,b){this.unshift([a,b])},J.matchers.add(/(^script!|\.js$)/,function(a){var b=new z(a.replace(/^\$/,J.path.replace(/\/$/,"")+"/").replace(/^script!/,""),!1);return b.id=a,b}),J.matchers.add(/^[a-zA-Z0-9_\-\/]+$/,function(a){return new A(a)}),J.bundles=[],f&&(J.path=f.getAttribute("data-path")||f.src.split(/loadrunner\.js/)[0]||"",(main=f.getAttribute("data-main"))&&J.apply(a,main.split(/\s*,\s*/)).then(function(){}))})(this,document);(window.__twttrlr = loadrunner.noConflict());}__twttrlr(function(using, provide, loadrunner, define) {provide("util/util",function(a){function b(a){var b=1,c,d;for(;c=arguments[b];b++)for(d in c)if(!c.hasOwnProperty||c.hasOwnProperty(d))a[d]=c[d];return a}function c(a){for(var b in a)a.hasOwnProperty(b)&&(k(a[b])&&(c(a[b]),l(a[b])&&delete a[b]),(a[b]===undefined||a[b]===null||a[b]==="")&&delete a[b]);return a}function d(a,b){var c=0,d;for(;d=a[c];c++)if(b==d)return c;return-1}function e(a,b){if(!a)return null;if(a.filter)return a.filter.apply(a,[b]);if(!b)return a;var c=[],d=0,e;for(;e=a[d];d++)b(e)&&c.push(e);return c}function f(a,b){if(!a)return null;if(a.map)return a.map.apply(a,[b]);if(!b)return a;var c=[],d=0,e;for(;e=a[d];d++)c.push(b(e));return c}function g(a){return a&&a.replace(/(^\s+|\s+$)/g,"")}function h(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function i(a){return a&&String(a).toLowerCase().indexOf("[native code]")>-1}function j(a,b){if(a.contains)return a.contains(b);var c=b.parentNode;while(c){if(c===a)return!0;c=c.parentNode}return!1}function k(a){return a===Object(a)}function l(a){if(!k(a))return!1;if(Object.keys)return!Object.keys(a).length;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}a({aug:b,compact:c,containsElement:j,filter:e,map:f,trim:g,indexOf:d,isNative:i,isObject:k,isEmptyObject:l,toType:h})});
provide("util/events",function(a){using("util/util",function(b){function d(){this.completed=!1,this.callbacks=[]}var c={bind:function(a,b){return this._handlers=this._handlers||{},this._handlers[a]=this._handlers[a]||[],this._handlers[a].push(b)},unbind:function(a,c){if(!this._handlers[a])return;if(c){var d=b.indexOf(this._handlers[a],c);d>=0&&this._handlers[a].splice(d,1)}else this._handlers[a]=[]},trigger:function(a,b){var c=this._handlers&&this._handlers[a];b.type=a;if(c)for(var d=0,e;e=c[d];d++)e.call(this,b)}};d.prototype.addCallback=function(a){this.completed?a.apply(this,this.results):this.callbacks.push(a)},d.prototype.complete=function(){this.results=makeArray(arguments),this.completed=!0;for(var a=0,b;b=this.callbacks[a];a++)b.apply(this,this.results)},a({Emitter:c,Promise:d})})});
provide("tfw/util/globals",function(a){function c(){var a=document.getElementsByTagName("meta"),c,d,e=0;for(;c=a[e];e++){if(!/^twitter:/.test(c.name))continue;d=c.name.replace(/^twitter:/,""),b[d]=c.content}}function d(a){return b[a]}var b={};a({init:c,val:d})});
provide("util/querystring",function(a){function b(a){return encodeURIComponent(a).replace(/\+/g,"%2B")}function c(a){return decodeURIComponent(a)}function d(a){var c=[],d;for(d in a)a[d]!==null&&typeof a[d]!="undefined"&&c.push(b(d)+"="+b(a[d]));return c.sort().join("&")}function e(a){var b={},d,e,f,g;if(a){d=a.split("&");for(g=0;f=d[g];g++)e=f.split("="),e.length==2&&(b[c(e[0])]=c(e[1]))}return b}function f(a,b){var c=d(b);return c.length>0?a.indexOf("?")>=0?a+"&"+d(b):a+"?"+d(b):a}function g(a){var b=a&&a.split("?");return b.length==2?e(b[1]):{}}a({url:f,decodeURL:g,decode:e,encode:d,encodePart:b,decodePart:c})});
provide("util/twitter",function(a){using("util/querystring",function(b){function g(a){return typeof a=="string"&&c.test(a)&&RegExp.$1.length<=20}function h(a){if(g(a))return RegExp.$1}function i(a){var c=b.decodeURL(a);c.screen_name=h(a);if(c.screen_name)return b.url("https://twitter.com/intent/user",c)}function j(a){return typeof a=="string"&&f.test(a)}function k(a,b){b=b===undefined?!0:b;if(j(a))return(b?"#":"")+RegExp.$1}function l(a){return typeof a=="string"&&d.test(a)}function m(a){return l(a)&&RegExp.$1}function n(a){return e.test(a)}var c=/(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,d=/(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,e=/^http(s?):\/\/((www\.)?)twitter\.com\//,f=/^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;a({isHashTag:j,hashTag:k,isScreenName:g,screenName:h,isStatus:l,status:m,intentForProfileURL:i,isTwitterURL:n,regexen:{profile:c}})})});
provide("util/uri",function(a){using("util/querystring","util/util","util/twitter",function(b,c,d){function e(a,b){var c,d;return b=b||location,/^https?:\/\//.test(a)?a:/^\/\//.test(a)?b.protocol+a:(c=b.host+(b.port.length?":"+b.port:""),a.indexOf("/")!==0&&(d=b.pathname.split("/"),d.pop(),d.push(a),a="/"+d.join("/")),[b.protocol,"//",c,a].join(""))}function f(){var a=document.getElementsByTagName("link"),b=0,c;for(;c=a[b];b++)if(c.rel=="canonical")return e(c.href)}function g(){var a=document.getElementsByTagName("a"),b=document.getElementsByTagName("link"),c=[a,b],e,f,g=0,h=0,i=/\bme\b/,j;for(;e=c[g];g++)for(h=0;f=e[h];h++)if(i.test(f.rel)&&(j=d.screenName(f.href)))return j}a({absolutize:e,getCanonicalURL:f,getScreenNameFromPage:g})})});
provide("util/iframe",function(a){a(function(a){var b=(a.replace&&a.replace.ownerDocument||document).createElement("div"),c,d,e;b.innerHTML="<iframe allowtransparency='true' frameBorder='0' scrolling='no'></iframe>",c=b.firstChild,c.src=a.url,c.className=a.className||"";if(a.css)for(d in a.css)a.css.hasOwnProperty(d)&&(c.style[d]=a.css[d]);if(a.attributes)for(e in a.attributes)a.attributes.hasOwnProperty(e)&&c.setAttribute(e,a.attributes[e]);return a.replace?a.replace.parentNode.replaceChild(c,a.replace):a.insertTarget&&a.insertTarget.appendChild(c),c})});
provide("dom/get",function(a){using("util/util",function(b){function c(a,c,d,e){var f,g,h=[],i,j,k,l,m,n;c=c||document;if(b.isNative(c.getElementsByClassName))return h=b.filter(c.getElementsByClassName(a),function(a){return!d||a.tagName.toLowerCase()==d.toLowerCase()}),[].slice.call(h,0,e||h.length);i=a.split(" "),l=i.length,f=c.getElementsByTagName(d||"*"),n=f.length;for(k=0;k<l&&n>0;k++){h=[],j=i[k];for(m=0;m<n;m++){g=f[m],~b.indexOf(g.className.split(" "),j)&&h.push(g);if(k+1==l&&h.length===e)break}f=h,n=f.length}return h}function d(a,b,d){return c(a,b,d,1)[0]}function e(a,c,d){var f=c&&c.parentNode,g;if(!f||f===d)return;return f.tagName==a?f:(g=f.className.split(" "),0===a.indexOf(".")&&~b.indexOf(g,a.slice(1))?f:e(a,f,d))}a({all:c,one:d,ancestor:e})})});
provide("util/domready",function(a){function k(){b=1;for(var a=0,d=c.length;a<d;a++)c[a]()}var b=0,c=[],d,e,f=!1,g=document.createElement("a"),h="DOMContentLoaded",i="addEventListener",j="onreadystatechange";/^loade|c/.test(document.readyState)&&(b=1),document[i]&&document[i](h,e=function(){document.removeEventListener(h,e,f),k()},f),g.doScroll&&document.attachEvent(j,d=function(){/^c/.test(document.readyState)&&(document.detachEvent(j,d),k())});var l=g.doScroll?function(a){self!=top?b?a():c.push(a):!function(){try{g.doScroll("left")}catch(b){return setTimeout(function(){l(a)},50)}a()}()}:function(a){b?a():c.push(a)};a(l)});
provide("tfw/widget/base",function(a){using("util/util","util/domready","dom/get","util/querystring","util/iframe",function(b,c,d,e,f){function m(a){var b;if(!a)return;a.ownerDocument?(this.srcEl=a,this.classAttr=a.className.split(" ")):(this.srcOb=a,this.classAttr=[]),b=this.params(),this.id=o(),this.setLanguage(),this.related=b.related||this.dataAttr("related"),this.partner=b.partner||this.dataAttr("partner"),this.dnt=b.dnt||this.dataAttr("dnt")||"",this.styleAttr=[],this.targetEl=a.targetEl}function n(){var a=0,b;for(;b=k[a];a++)b.call()}function o(){return this.srcEl&&this.srcEl.id||"twitter-widget-"+g++}function p(a){if(!a)return;return a.lang?a.lang:p(a.parentNode)}var g=0,h,i,j={list:[],byId:{}},k=[],l={ar:{"%{followers_count} followers":"عدد المتابعين %{followers_count}","100K+":"+100 ألف","10k unit":"10 آلاف وحدة",Follow:"تابِع","Follow %{screen_name}":"تابِع %{screen_name}",K:"ألف",M:"مليون",Tweet:"غرِّد","Tweet %{hashtag}":"غرِّد %{hashtag}","Tweet to %{name}":"غرِّد لـ %{name}","Twitter Stream":"خطّ تويتر الزمنيّ"},da:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k enhed",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet til %{name}","Twitter Stream":"Twitter-strøm"},de:{"%{followers_count} followers":"%{followers_count} Follower","100K+":"100Tsd+","10k unit":"10tsd-Einheit",Follow:"Folgen","Follow %{screen_name}":"%{screen_name} folgen",K:"Tsd",M:"M",Tweet:"Twittern","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet an %{name}","Twitter Stream":"Twitter Stream"},es:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"100K+","10k unit":"10k unidad",Follow:"Seguir","Follow %{screen_name}":"Seguir a %{screen_name}",K:"K",M:"M",Tweet:"Twittear","Tweet %{hashtag}":"Twittear %{hashtag}","Tweet to %{name}":"Twittear a %{name}","Twitter Stream":"Cronología de Twitter"},fa:{"%{followers_count} followers":"%{followers_count} دنبال‌کننده","100K+":">۱۰۰هزار","10k unit":"۱۰هزار واحد",Follow:"دنبال کردن","Follow %{screen_name}":"دنبال کردن %{screen_name}",K:"هزار",M:"میلیون",Tweet:"توییت","Tweet %{hashtag}":"توییت کردن %{hashtag}","Tweet to %{name}":"به %{name} توییت کنید","Twitter Stream":"جریان توییت‌ها"},fi:{"%{followers_count} followers":"%{followers_count} seuraajaa","100K+":"100 000+","10k unit":"10 000 yksikköä",Follow:"Seuraa","Follow %{screen_name}":"Seuraa käyttäjää %{screen_name}",K:"tuhatta",M:"milj.",Tweet:"Twiittaa","Tweet %{hashtag}":"Twiittaa %{hashtag}","Tweet to %{name}":"Twiittaa käyttäjälle %{name}","Twitter Stream":"Twitter-virta"},fil:{"%{followers_count} followers":"%{followers_count} mga tagasunod","100K+":"100K+","10k unit":"10k yunit",Follow:"Sundan","Follow %{screen_name}":"Sundan si %{screen_name}",K:"K",M:"M",Tweet:"I-tweet","Tweet %{hashtag}":"I-tweet ang %{hashtag}","Tweet to %{name}":"Mag-Tweet kay %{name}","Twitter Stream":"Stream ng Twitter"},fr:{"%{followers_count} followers":"%{followers_count} abonnés","100K+":"100K+","10k unit":"unité de 10k",Follow:"Suivre","Follow %{screen_name}":"Suivre %{screen_name}",K:"K",M:"M",Tweet:"Tweeter","Tweet %{hashtag}":"Tweeter %{hashtag}","Tweet to %{name}":"Tweeter à %{name}","Twitter Stream":"Flux Twitter"},he:{"%{followers_count} followers":"%{followers_count} עוקבים","100K+":"מאות אלפים","10k unit":"עשרות אלפים",Follow:"מעקב","Follow %{screen_name}":"לעקוב אחר %{screen_name}",K:"אלף",M:"מיליון",Tweet:"ציוץ","Tweet %{hashtag}":"צייצו %{hashtag}","Tweet to %{name}":"ציוץ אל %{name}","Twitter Stream":"התזרים של טוויטר"},hi:{"%{followers_count} followers":"%{followers_count} फ़ॉलोअर्स","100K+":"1 लाख+","10k unit":"10 हजार इकाईयां",Follow:"फ़ॉलो","Follow %{screen_name}":"%{screen_name} को फ़ॉलो करें",K:"हजार",M:"मिलियन",Tweet:"ट्वीट","Tweet %{hashtag}":"ट्वीट %{hashtag}","Tweet to %{name}":"%{name} को ट्वीट करें","Twitter Stream":"ट्विटर स्ट्रीम"},hu:{"%{followers_count} followers":"%{followers_count} követő","100K+":"100E+","10k unit":"10E+",Follow:"Követés","Follow %{screen_name}":"%{screen_name} követése",K:"E",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"%{hashtag} tweetelése","Tweet to %{name}":"Tweet küldése neki: %{name}","Twitter Stream":"Twitter Hírfolyam"},id:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikuti","Follow %{screen_name}":"Ikuti %{screen_name}",K:"&nbsp;ribu",M:"&nbsp;juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet ke %{name}","Twitter Stream":"Aliran Twitter"},it:{"%{followers_count} followers":"%{followers_count} follower","100K+":"100K+","10k unit":"10k unità",Follow:"Segui","Follow %{screen_name}":"Segui %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Twitta %{hashtag}","Tweet to %{name}":"Twitta a %{name}","Twitter Stream":"Twitter Stream"},ja:{"%{followers_count} followers":"%{followers_count}人のフォロワー","100K+":"100K以上","10k unit":"万",Follow:"フォローする","Follow %{screen_name}":"%{screen_name}さんをフォロー",K:"K",M:"M",Tweet:"ツイート","Tweet %{hashtag}":"%{hashtag} をツイートする","Tweet to %{name}":"%{name}さんへツイートする","Twitter Stream":"Twitterストリーム"},ko:{"%{followers_count} followers":"%{followers_count}명의 팔로워","100K+":"100만 이상","10k unit":"만 단위",Follow:"팔로우","Follow %{screen_name}":"%{screen_name} 팔로우하기",K:"천",M:"백만",Tweet:"트윗","Tweet %{hashtag}":"%{hashtag} 관련 트윗하기","Tweet to %{name}":"%{name}님에게 트윗하기","Twitter Stream":"트위터 스트림"},msa:{"%{followers_count} followers":"%{followers_count} pengikut","100K+":"100 ribu+","10k unit":"10 ribu unit",Follow:"Ikut","Follow %{screen_name}":"Ikut %{screen_name}",K:"ribu",M:"juta",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Tweet kepada %{name}","Twitter Stream":"Strim Twitter"},nl:{"%{followers_count} followers":"%{followers_count} volgers","100K+":"100k+","10k unit":"10k-eenheid",Follow:"Volgen","Follow %{screen_name}":"%{screen_name} volgen",K:"k",M:" mln.",Tweet:"Tweeten","Tweet %{hashtag}":"%{hashtag} tweeten","Tweet to %{name}":"Tweeten naar %{name}","Twitter Stream":"Twitter Stream"},no:{"%{followers_count} followers":"%{followers_count} følgere","100K+":"100K+","10k unit":"10k ",Follow:"Følg","Follow %{screen_name}":"Følg %{screen_name}",K:"K",M:"M",Tweet:"Tweet","Tweet %{hashtag}":"Tweet %{hashtag}","Tweet to %{name}":"Send tweet til %{name}","Twitter Stream":"Twitter-strøm"},pl:{"%{followers_count} followers":"%{followers_count} obserwujących","100K+":"100 tys.+","10k unit":"10 tys.",Follow:"Obserwuj","Follow %{screen_name}":"Obserwuj %{screen_name}",K:"tys.",M:"mln",Tweet:"Tweetnij","Tweet %{hashtag}":"Tweetnij %{hashtag}","Tweet to %{name}":"Tweetnij do %{name}","Twitter Stream":"Strumień Twittera"},pt:{"%{followers_count} followers":"%{followers_count} seguidores","100K+":"+100 mil","10k unit":"10 mil unidades",Follow:"Seguir","Follow %{screen_name}":"Seguir %{screen_name}",K:"Mil",M:"M",Tweet:"Tweetar","Tweet %{hashtag}":"Tweetar %{hashtag}","Tweet to %{name}":"Tweetar para %{name}","Twitter Stream":"Transmissões do Twitter"},ru:{"%{followers_count} followers":"Читатели: %{followers_count} ","100K+":"100 тыс.+","10k unit":"блок 10k",Follow:"Читать","Follow %{screen_name}":"Читать %{screen_name}",K:"тыс.",M:"млн.",Tweet:"Твитнуть","Tweet %{hashtag}":"Твитнуть %{hashtag}","Tweet to %{name}":"Твитнуть %{name}","Twitter Stream":"Поток в Твиттере"},sv:{"%{followers_count} followers":"%{followers_count} följare","100K+":"100K+","10k unit":"10k",Follow:"Följ","Follow %{screen_name}":"Följ %{screen_name}",K:"K",M:"M",Tweet:"Tweeta","Tweet %{hashtag}":"Tweeta %{hashtag}","Tweet to %{name}":"Tweeta till %{name}","Twitter Stream":"Twitterflöde"},th:{"%{followers_count} followers":"%{followers_count} ผู้ติดตาม","100K+":"100พัน+","10k unit":"หน่วย 10พัน",Follow:"ติดตาม","Follow %{screen_name}":"ติดตาม %{screen_name}",K:"พัน",M:"ล้าน",Tweet:"ทวีต","Tweet %{hashtag}":"ทวีต %{hashtag}","Tweet to %{name}":"ทวีตถึง %{name}","Twitter Stream":"ทวิตเตอร์สตรีม"},tr:{"%{followers_count} followers":"%{followers_count} takipçi","100K+":"+100 bin","10k unit":"10 bin birim",Follow:"Takip et","Follow %{screen_name}":"Takip et: %{screen_name}",K:"bin",M:"milyon",Tweet:"Tweetle","Tweet %{hashtag}":"Tweetle: %{hashtag}","Tweet to %{name}":"Tweetle: %{name}","Twitter Stream":"Twitter Akışı"},ur:{"%{followers_count} followers":"%{followers_count} فالورز","100K+":"ایک لاکھ سے زیادہ","10k unit":"دس ہزار یونٹ",Follow:"فالو کریں","Follow %{screen_name}":"%{screen_name} کو فالو کریں",K:"ہزار",M:"ملین",Tweet:"ٹویٹ کریں","Tweet %{hashtag}":"%{hashtag} ٹویٹ کریں","Tweet to %{name}":"%{name} کو ٹویٹ کریں","Twitter Stream":"ٹوئٹر سٹریم"},"zh-cn":{"%{followers_count} followers":"%{followers_count} 关注者","100K+":"10万+","10k unit":"1万单元",Follow:"关注","Follow %{screen_name}":"关注 %{screen_name}",K:"千",M:"百万",Tweet:"发推","Tweet %{hashtag}":"以 %{hashtag} 发推","Tweet to %{name}":"发推给 %{name}","Twitter Stream":"Twitter 信息流"},"zh-tw":{"%{followers_count} followers":"%{followers_count} 位跟隨者","100K+":"超過十萬","10k unit":"1萬 單位",Follow:"跟隨","Follow %{screen_name}":"跟隨 %{screen_name}",K:"千",M:"百萬",Tweet:"推文","Tweet %{hashtag}":"推文%{hashtag}","Tweet to %{name}":"推文給%{name}"}};b.aug(m.prototype,{setLanguage:function(a){var b;a||(a=this.params().lang||this.dataAttr("lang")||p(this.srcEl)),a=a&&a.toLowerCase();if(!a)return this.lang="en";if(l[a])return this.lang=a;b=a.replace(/[\-_].*/,"");if(l[b])return this.lang=b;this.lang="en"},_:function(a,b){var c=this.lang;b=b||{};if(!c||!l.hasOwnProperty(c))c=this.lang="en";return a=l[c]&&l[c][a]||a,this.ringo(a,b,/%\{([\w_]+)\}/g)},ringo:function(a,b,c){return c=c||/\{\{([\w_]+)\}\}/g,a.replace(c,function(a,c){return b[c]!==undefined?b[c]:a})},add:function(a){j.list.push(this),j.byId[this.id]=a},create:function(a,b,c){return c["data-twttr-rendered"]=!0,f({url:a,css:b,className:this.classAttr.join(" "),id:this.id,attributes:c,replace:this.srcEl,insertTarget:this.targetEl})},params:function(){var a,b;return this.srcOb?b=this.srcOb:(a=this.srcEl&&this.srcEl.href&&this.srcEl.href.split("?")[1],b=a?e.decode(a):{}),this.params=function(){return b},b},dataAttr:function(a){return this.srcEl&&this.srcEl.getAttribute("data-"+a)},attr:function(a){return this.srcEl&&this.srcEl.getAttribute(a)},styles:{base:[["font","normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"],["margin","0"],["padding","0"],["whiteSpace","nowrap"]],button:[["fontWeight","bold"],["textShadow","0 1px 0 rgba(255,255,255,.5)"]],large:[["fontSize","13px"],["lineHeight","26px"]],vbubble:[["fontSize","16px"]]},width:function(){throw new Error(name+" not implemented")},height:function(){return this.size=="m"?20:28},minWidth:function(){},maxWidth:function(){},minHeight:function(){},maxHeight:function(){},dimensions:function(){function a(a){switch(typeof a){case"string":return a;case"undefined":return;default:return a+"px"}}var b,c={width:this.width(),height:this.height()};this.minWidth()&&(c["min-width"]=this.minWidth()),this.maxWidth()&&(c["max-width"]=this.maxWidth()),this.minHeight()&&(c["min-height"]=this.minHeight()),this.maxHeight()&&(c["max-height"]=this.maxHeight());for(b in c)c[b]=a(c[b]);return c},generateId:o}),m.afterLoad=function(a){k.push(a)},m.init=function(a){i=a},m.find=function(a){return a&&j.byId[a]?j.byId[a].element:null},m.embed=function(a){var b=i.widgets,c,e,f,g,h,k;a=a||document;for(f in b){f.match(/\./)?(g=f.split("."),c=d.all(g[1],a,g[0])):c=a.getElementsByTagName(f);for(h=0;k=c[h];h++){if(k.getAttribute("data-twttr-rendered"))continue;k.setAttribute("data-twttr-rendered","true"),e=new b[f](k),j.list.push(e),j.byId[e.id]=e,e.render(i)}}n()},a(m)})});
provide("tfw/widget/intent",function(a){using("tfw/widget/base","util/util","util/querystring","util/uri",function(b,c,d,e){function m(a){var b=Math.round(k/2-h/2),c=0;j>i&&(c=Math.round(j/2-i/2)),window.open(a,undefined,[g,"width="+h,"height="+i,"left="+b,"top="+c].join(","))}function n(a,b){using("tfw/hub/client",function(c){c.openIntent(a,b)})}function o(a){var b="original_referer="+location.href;return[a,b].join(a.indexOf("?")==-1?"?":"&")}function p(a){var b,d,e,g;a=a||window.event,b=a.target||a.srcElement;if(a.altKey||a.metaKey||a.shiftKey)return;while(b){if(~c.indexOf(["A","AREA"],b.nodeName))break;b=b.parentNode}b&&b.href&&(d=b.href.match(f),d&&(g=o(b.href),g=g.replace(/^http[:]/,"https:"),g=g.replace(/^\/\//,"https://"),q(g,b),a.returnValue=!1,a.preventDefault&&a.preventDefault()))}function q(a,b){if(twttr.events.hub&&b){var c=new r(l.generateId(),b);l.add(c),n(a,b),twttr.events.trigger("click",{target:b,region:"intent",type:"click",data:{}})}else m(a)}function r(a,b){this.id=a,this.element=this.srcEl=b}function s(a){this.srcEl=[],this.element=a}var f=/twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,g="scrollbars=yes,resizable=yes,toolbar=no,location=yes",h=550,i=520,j=screen.height,k=screen.width,l;s.prototype=new b,c.aug(s.prototype,{render:function(a){l=this,window.__twitterIntentHandler||(document.addEventListener?document.addEventListener("click",p,!1):document.attachEvent&&document.attachEvent("onclick",p),window.__twitterIntentHandler=!0)}}),s.open=q,a(s)})});
provide("dom/classname",function(a){function b(a,b){a.classList?a.classList.add(b):f(b).test(a.className)||(a.className+=" "+b)}function c(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(f(b)," ")}function d(a,d,g){a.classList&&e(a,d)?(c(a,d),b(a,g)):a.className=a.className.replace(f(d),g)}function e(a,b){return a.classList?a.classList.contains(b):f(b).test(a.className)}function f(a){return new RegExp("\\b"+a+"\\b","g")}a({add:b,remove:c,replace:d,present:e})});
provide("util/env",function(a){var b=window.navigator.userAgent;a({retina:function(){return(window.devicePixelRatio||1)>1},anyIE:function(){return/MSIE \d/.test(b)},ie6:function(){return/MSIE 6/.test(b)},ie7:function(){return/MSIE 7/.test(b)},cspEnabledIE:function(){return/MSIE 1\d/.test(b)},touch:function(){return"ontouchstart"in window||/Opera Mini/.test(b)||navigator.msMaxTouchPoints>0},cssTransitions:function(){var a=document.body.style;return a.transition!==undefined||a.webkitTransition!==undefined||a.mozTransition!==undefined||a.oTransition!==undefined||a.msTransition!==undefined}})});
provide("dom/delegate",function(a){using("util/env",function(b){function e(a){var b=a.getAttribute("data-twitter-event-id");return b?b:(a.setAttribute("data-twitter-event-id",++d),d)}function f(a,b,c){var d=0,e=a&&a.length||0;for(d=0;d<e;d++)a[d].call(b,c)}function g(a,b,c){var d=c||a.target||a.srcElement,e=d.className.split(" "),h=0,i,j=e.length;for(;h<j;h++)f(b["."+e[h]],d,a);f(b[d.tagName],d,a);if(a.cease)return;d!==this&&g.call(this,a,b,d.parentElement||d.parentNode)}function h(a,b,c){if(a.addEventListener){a.addEventListener(b,function(d){g.call(a,d,c[b])},!1);return}a.attachEvent&&a.attachEvent("on"+b,function(){g.call(a,a.ownerDocument.parentWindow.event,c[b])})}function i(a,b,d,f){var g=e(a);c[g]=c[g]||{},c[g][b]||(c[g][b]={},h(a,b,c[g])),c[g][b][d]=c[g][b][d]||[],c[g][b][d].push(f)}function j(a,b,d){var f=e(b),h=c[f]&&c[f];g.call(b,{target:d},h[a])}function k(a){return m(a),l(a),!1}function l(a){a&&a.preventDefault?a.preventDefault():a.returnValue=!1}function m(a){a&&(a.cease=!0)&&a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}var c={},d=-1;a({stop:k,stopPropagation:m,preventDefault:l,delegate:i,simulate:j})})});
provide("util/throttle",function(a){function b(a,b,c){function g(){var c=+(new Date);window.clearTimeout(f);if(c-e>b){e=c,a.call(d);return}f=window.setTimeout(g,b)}var d=c||this,e=0,f;return g}a(b)});
provide("util/insert",function(a){a(function(a,b){if(b){if(!b.parentNode)return b;b.parentNode.replaceChild(a,b),delete b}else document.body.insertBefore(a,document.body.firstChild);return a})});
provide("util/css",function(a){using("util/util",function(b){a({sanitize:function(a,c,d){var e=/^[\w ,%\/"'\-_#]+$/,f=a&&b.map(a.split(";"),function(a){return b.map(a.split(":").slice(0,2),function(a){return b.trim(a)})}),g=0,h,i=[],j=d?"!important":"";c=c||/^(font|text\-|letter\-|color|line\-)[\w\-]*$/;for(;f&&(h=f[g]);g++)h[0].match(c)&&h[1].match(e)&&i.push(h.join(":")+j);return i.join(";")}})})});
provide("tfw/util/params",function(a){using("util/querystring","util/twitter",function(b,c){a(function(a,d){return function(e){var f,g="data-tw-params",h,i=e.innerHTML;if(!e)return;if(!c.isTwitterURL(e.href))return;if(e.getAttribute(g))return;e.setAttribute(g,!0);if(typeof d=="function"){f=d.call(this,e);for(h in f)f.hasOwnProperty(h)&&(a[h]=f[h])}e.href=b.url(e.href,a),e.innerHTML=i}})})});
provide("$xd/json2.js", function(exports) {window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();exports();loadrunner.Script.loaded.push("$xd/json2.js")});
provide("util/params",function(a){using("util/querystring",function(b){var c=function(a){var c=a.search.substr(1);return b.decode(c)},d=function(a){var c=a.href,d=c.indexOf("#"),e=d<0?"":c.substring(d+1);return b.decode(e)},e=function(a){var b={},e=c(a),f=d(a);for(var g in e)e.hasOwnProperty(g)&&(b[g]=e[g]);for(var g in f)f.hasOwnProperty(g)&&(b[g]=f[g]);return b};a({combined:e,fromQuery:c,fromFragment:d})})});
provide("tfw/util/env",function(a){using("util/params",function(b){function d(){var a=36e5,d=b.combined(document.location)._;return c!==undefined?c:(c=!1,d&&/^\d+$/.test(d)&&(c=+(new Date)-parseInt(d)<a),c)}var c;a({isDynamicWidget:d})})});
provide("util/decider",function(a){function c(a){var c=b[a]||!1;if(!c)return!1;if(c===!0||c===100)return!0;var d=Math.random()*100,e=c>=d;return b[a]=e,e}var b={force_new_cookie:100,rufous_pixel:100,decider_fixture:12.34};a({isAvailable:c})});
provide("dom/cookie",function(a){using("util/util",function(b){a(function(a,c,d){var e=b.aug({},d);if(arguments.length>1&&String(c)!=="[object Object]"){if(c===null||c===undefined)e.expires=-1;if(typeof e.expires=="number"){var f=e.expires,g=new Date((new Date).getTime()+f*60*1e3);e.expires=g}return c=String(c),document.cookie=[encodeURIComponent(a),"=",e.raw?c:encodeURIComponent(c),e.expires?"; expires="+e.expires.toUTCString():"",e.path?"; path="+e.path:"",e.domain?"; domain="+e.domain:"",e.secure?"; secure":""].join("")}e=c||{};var h,i=e.raw?function(a){return a}:decodeURIComponent;return(h=(new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)")).exec(document.cookie))?i(h[1]):null})})});
provide("util/donottrack",function(a){using("dom/cookie",function(b){a(function(a){var c=/\.(gov|mil)(:\d+)?$/i,d=/https?:\/\/([^\/]+).*/i;return a=a||document.referrer,a=d.test(a)&&d.exec(a)[1],b("dnt")?!0:c.test(document.location.host)?!0:a&&c.test(a)?!0:document.navigator?document.navigator["doNotTrack"]==1:navigator?navigator["doNotTrack"]==1||navigator["msDoNotTrack"]==1:!1})})});
provide("tfw/util/guest_cookie",function(a){using("dom/cookie","util/donottrack","util/decider",function(b,c,d){function f(){var a=b(e)||!1;if(!a)return;a.match(/^v3\:/)||g()}function g(){b(e)&&b(e,null,{domain:".twitter.com",path:"/"})}function h(){c()&&g()}var e="pid";a({set:h,destroy:g,forceNewCookie:f,guest_id_cookie:e})})});
provide("dom/sandbox",function(a){using("util/domready","util/env",function(b,c){function e(a,b){var c,d,e;if(a.name){try{e=document.createElement('<iframe name="'+a.name+'"></iframe>')}catch(f){e=document.createElement("iframe"),e.name=a.name}delete a.name}else e=document.createElement("iframe");a.id&&(e.id=a.id,delete a.id);for(c in a)a.hasOwnProperty(c)&&e.setAttribute(c,a[c]);e.allowtransparency="true",e.scrolling="no",e.setAttribute("frameBorder",0),e.setAttribute("allowTransparency",!0);for(d in b||{})b.hasOwnProperty(d)&&(e.style[d]=b[d]);return e}function f(a,b,c,d){var f;this.attrs=b||{},this.styles=c||{},this.appender=d,this.onReady=a,this.sandbox={},f=e(this.attrs,this.styles),f.onreadystatechange=f.onload=this.getCallback(this.onLoad),this.sandbox.frame=f,d?d(f):document.body.appendChild(f)}function g(a,c,d,e){b(function(){new f(a,c,d,e)})}var d=0;window.twttr||(window.twttr={}),window.twttr.sandbox||(window.twttr.sandbox={}),f.prototype.getCallback=function(a){var b=this,c=!1;return function(){c||(c=!0,a.call(b))}},f.prototype.registerCallback=function(a){var b="cb"+d++;return window.twttr.sandbox[b]=a,b},f.prototype.onLoad=function(){try{this.sandbox.frame.contentWindow.document}catch(a){this.setDocDomain();return}this.sandbox.win=this.sandbox.frame.contentWindow,this.sandbox.doc=this.sandbox.frame.contentWindow.document,this.writeStandardsDoc(),this.sandbox.body=this.sandbox.frame.contentWindow.document.body,this.onReady(this.sandbox)},f.prototype.setDocDomain=function(){var a,b=this.registerCallback(this.getCallback(this.onLoad));a=["javascript:",'document.write("");',"try { window.parent.document; }","catch (e) {",'document.domain="'+document.domain+'";',"}",'window.parent.twttr.sandbox["'+b+'"]();'].join(""),this.sandbox.frame.parentNode.removeChild(this.sandbox.frame),this.sandbox.frame=null,this.sandbox.frame=e(this.attrs,this.styles),this.sandbox.frame.src=a,this.appender?this.appender(this.sandbox.frame):document.body.appendChild(this.sandbox.frame)},f.prototype.writeStandardsDoc=function(){if(!c.anyIE()||c.cspEnabledIE())return;var a=["<!DOCTYPE html>","<html>","<head>","<scr","ipt>","try { window.parent.document; }",'catch (e) {document.domain="'+document.domain+'";}',"</scr","ipt>","</head>","<body></body>","</html>"].join("");this.sandbox.doc.write(a),this.sandbox.doc.close()},a(g)})});
provide("tfw/util/tracking",function(a){using("dom/cookie","dom/sandbox","util/donottrack","tfw/util/guest_cookie","tfw/util/env","util/util","$xd/json2.js",function(b,c,d,e,f,g,h){function u(){function a(a){s=a.frame,r=a.doc,q=a.doc.body,m=F(),n=G();while(o[0])z.apply(this,o.shift());p&&A()}s=document.getElementById("rufous-sandbox"),s?(r=s.contentWindow.document,q=r.body):c(a,{id:"rufous-sandbox"},{display:"none"})}function v(a,b,c,d){var e=!g.isObject(a),f=b?!g.isObject(b):!1,h,i;if(e||f)return;if(/Firefox/.test(navigator.userAgent))return;h=C(a),i=D(b,!!c,!!d),y(h,i,!0)}function w(a,c,h,i){var k=j[c],l,m,n=e.guest_id_cookie;if(!k)return;a=a||{},i=!!i,h=!!h,m=a.original_redirect_referrer||document.referrer,i=i||d(m),l=g.aug({},a),h||(x(l,"referrer",m),x(l,"widget",+f.isDynamicWidget()),x(l,"hask",+!!b("k")),x(l,"li",+!!b("twid")),x(l,n,b(n)||"")),i&&(x(l,"dnt",1),I(l)),H(k+"?"+E(l))}function x(a,b,c){var d=i+b;if(!a)return;return a[d]=c,a}function y(a,b,c){var d,e,f,h,i,j="https://r.twimg.com/jot?";if(!g.isObject(a)||!g.isObject(b))return;if(Math.random()>t)return;f=g.aug({},b,{event_namespace:a}),c?(j+=E({l:J(f)}),H(j)):(d=m.firstChild,d.value=+d.value||+f.dnt,h=J(f),e=r.createElement("input"),e.type="hidden",e.name="l",e.value=h,m.appendChild(e))}function z(a,b,c,d){var e=!g.isObject(a),f=b?!g.isObject(b):!1,h,i;if(e||f)return;if(!q||!m){o.push([a,b,c,d]);return}h=C(a),i=D(b,!!c,!!d),y(h,i)}function A(){if(!m){p=!0;return}if(m.children.length<=1)return;q.appendChild(m),q.appendChild(n),m.submit(),window.setTimeout(B(m,n),6e4),m=F(),n=G()}function B(a,b){return function(){var c=a.parentNode;c.removeChild(a),c.removeChild(b)}}function C(a){var b={client:"tfw"},c,d;return c=g.aug(b,a||{}),c}function D(a,b,c){var e={_category_:"tfw_client_event"},f,h,i;return b=!!b,c=!!c,f=g.aug(e,a||{}),h=f.widget_origin||document.referrer,f.format_version=1,f.dnt=c=c||d(h),f.triggered_on=f.triggered_on||+(new Date),b||(f.widget_origin=h),c&&I(f),f}function E(a){var b=[],c,d,e;for(c in a)a.hasOwnProperty(c)&&(d=encodeURIComponent(c),e=encodeURIComponent(a[c]),e=e.replace(/'/g,"%27"),b.push(d+"="+e));return b.join("&")}function F(){var a=r.createElement("form"),b=r.createElement("input");return l++,a.action="https://r.twimg.com/jot",a.method="POST",a.target="rufous-frame-"+l,a.id="rufous-form-"+l,b.type="hidden",b.name="dnt",b.value=0,a.appendChild(b),a}function G(){var a,b="rufous-frame-"+l,c=0;try{a=r.createElement("<iframe name="+b+">")}catch(d){a=r.createElement("iframe"),a.name=b}return a.id=b,a.style.display="none",a.width=0,a.height=0,a.border=0,a}function H(a){var b=document.createElement("img");b.src=a,b.alt="",b.style.position="absolute",b.style.height="1px",b.style.width="1px",b.style.top="-9999px",b.style.left="-9999px",document.body.appendChild(b)}function I(a){var b;for(b in a)~g.indexOf(k,b)&&delete a[b]}function J(a){var b=Array.prototype.toJSON,c;return delete Array.prototype.toJSON,c=JSON.stringify(a),b&&(Array.prototype.toJSON=b),c}var i="twttr_",j={tweetbutton:"//p.twitter.com/t.gif",followbutton:"//p.twitter.com/f.gif",tweetembed:"//p.twitter.com/e.gif"},k=["hask","li","logged_in","pid","user_id",e.guest_id_cookie,i+"hask",i+"li",i+e.guest_id_cookie],l=0,m,n,o=[],p,q,r,s,t=1;e.forceNewCookie(),a({enqueue:z,flush:A,initPostLogging:u,addPixel:v,addLegacyPixel:w,addVar:x})})});
provide("util/logger",function(a){function c(a){window[b]&&window[b].log&&window[b].log(a)}function d(a){window[b]&&window[b].warn&&window[b].warn(a)}function e(a){window[b]&&window[b].error&&window[b].error(a)}var b=["con","sole"].join("");a({info:c,warn:d,error:e})});
provide("tfw/util/data",function(a){using("util/logger","util/util","util/querystring",function(b,c,d){function l(a,b){return a=={}.toString.call(b).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function m(a){return function(c){c.error?a.error&&a.error(c):c.headers&&c.headers.status!=200?(a.error&&a.error(c),b.warn(c.headers.message)):a.success&&a.success(c),a.complete&&a.complete(c),n(a)}}function n(a){var b=a.script;b&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),a.script=undefined,b=undefined),a.callbackName&&twttr.tfw.callbacks[a.callbackName]&&delete twttr.tfw.callbacks[a.callbackName]}function o(a){var b={};return a.success&&l("function",a.success)&&(b.success=a.success),a.error&&l("function",a.error)&&(b.error=a.error),a.complete&&l("function",a.complete)&&(b.complete=a.complete),b}function p(a,b,c){var d=a.length,e=[],f={},g=0;return function(e){var h,i=[],j=[],k=[],l,m;h=c(e),f[h]=e;if(++g===d){for(l=0;l<d;l++)m=f[a[l]],i.push(m),m.error?k.push(m):j.push(m);b.error&&k.length>0&&b.error(k),b.success&&j.length>0&&b.success(j),b.complete&&b.complete(i)}}}twttr=twttr||{},twttr.tfw=twttr.tfw||{},twttr.tfw.callbacks=twttr.tfw.callbacks||{};var e="twttr.tfw.callbacks",f=twttr.tfw.callbacks,g="cb",h=0,i=!1,j={},k={userLookup:"//api.twitter.com/1/users/lookup.json",userShow:"//cdn.api.twitter.com/1/users/show.json",status:"//cdn.api.twitter.com/1/statuses/show.json",tweets:"//syndication.twimg.com/tweets.json",count:"//cdn.api.twitter.com/1/urls/count.json",friendship:"//cdn.api.twitter.com/1/friendships/exists.json",timeline:"//cdn.syndication.twimg.com/widgets/timelines/",timelinePoll:"//syndication.twimg.com/widgets/timelines/paged/",timelinePreview:"//syndication.twimg.com/widgets/timelines/preview/"};twttr.widgets&&twttr.widgets.endpoints&&c.aug(k,twttr.widgets.endpoints),j.jsonp=function(a,b,c){var j=c||g+h,k=e+"."+j,l=document.createElement("script"),n={callback:k,suppress_response_codes:!0};f[j]=m(b);if(i||!/^https?\:$/.test(window.location.protocol))a=a.replace(/^\/\//,"https://");l.src=d.url(a,n),l.async="async",document.body.appendChild(l),b.script=l,b.callbackName=j,c||h++},j.config=function(a){if(a.forceSSL===!0||a.forceSSL===!1)i=a.forceSSL},j.user=function(){var a,b={},c,e,f;arguments.length===1?(a=arguments[0].screenName,b=o(arguments[0])):(a=arguments[0],b.success=arguments[1]),c=l("array",a)?k.userLookup:k.userShow,a=l("array",a)?a.join(","):a,e={screen_name:a},f=d.url(c,e),this.jsonp(f,b)},j.userById=function(a){var b,c={},e,f,g;arguments.length===1?(b=arguments[0].ids,c=o(arguments[0])):(b=arguments[0],c.success=arguments[1]),e=l("array",b)?k.userLookup:k.userShow,b=l("array",b)?b.join(","):b,f={user_id:b},g=d.url(e,f),this.jsonp(g,c)},j.status=function(){var a,b={},c,e,f,g;arguments.length===1?(a=arguments[0].id,b=o(arguments[0])):(a=arguments[0],b.success=arguments[1]);if(!l("array",a))c={id:a,include_entities:!0},e=d.url(k.status,c),this.jsonp(e,b);else{f=p(a,b,function(a){return a.error?a.request.split("id=")[1].split("&")[0]:a.id_str});for(g=0;g<a.length;g++)c={id:a[g],include_entities:!0},e=d.url(k.status,c),this.jsonp(e,{success:f,error:f})}},j.tweets=function(a){var b=arguments[0],c=o(b),e={ids:a.ids.join(","),lang:a.lang},f=d.url(k.tweets,e);this.jsonp(f,c)},j.count=function(){var a="",b,c,e={};arguments.length===1?(a=arguments[0].url,e=o(arguments[0])):arguments.length===2&&(a=arguments[0],e.success=arguments[1]),c={url:a},b=d.url(k.count,c),this.jsonp(b,e)},j.friendshipExists=function(a){var b=arguments[0],c=o(arguments[0]),e={screen_name_a:a.screenNameA,screen_name_b:a.screenNameB},f=d.url(k.friendship,e);this.jsonp(f,c)},j.timeline=function(a){var b=arguments[0],c=o(b),e,f=9e5,g=Math.floor(+(new Date)/f),h={lang:a.lang,t:g,domain:window.location.host};a.dnt&&(h.dnt=a.dnt),a.screenName&&(h.screen_name=a.screenName),a.userId&&(h.user_id=a.userId),a.withReplies&&(h.with_replies=a.withReplies),e=d.url(k.timeline+a.id,h),this.jsonp(e,c,"tl_"+a.id)},j.timelinePoll=function(a){var b=arguments[0],c=o(b),e={lang:a.lang,since_id:a.sinceId,max_id:a.maxId,domain:window.location.host},f;a.dnt&&(e.dnt=a.dnt),a.screenName&&(e.screen_name=a.screenName),a.userId&&(e.user_id=a.userId),a.withReplies&&(e.with_replies=a.withReplies),f=d.url(k.timelinePoll+a.id,e),this.jsonp(f,c,"tlPoll_"+a.id+"_"+(a.sinceId||a.maxId))},j.timelinePreview=function(a){var b=arguments[0],c=o(b),e=a.params,f=d.url(k.timelinePreview,e);this.jsonp(f,c)},a(j)})});
provide("anim/transition",function(a){function b(a,b){var c;return b=b||window,c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.msRequestAnimationFrame||b.oRequestAnimationFrame||function(c){b.setTimeout(function(){a(+(new Date))},1e3/60)},c(a)}function c(a,b){return Math.sin(Math.PI/2*b)*a}function d(a,c,d,e,f){function i(){var h=+(new Date),j=h-g,k=Math.min(j/d,1),l=e?e(c,k):c*k;a(l);if(k==1)return;b(i,f)}var g=+(new Date),h;b(i)}a({animate:d,requestAnimationFrame:b,easeOut:c})});
provide("util/datetime",function(a){using("util/util",function(b){function m(a){return a<10?"0"+a:a}function n(a){function e(a,c){return b&&b[a]&&(a=b[a]),a.replace(/%\{([\w_]+)\}/g,function(a,b){return c[b]!==undefined?c[b]:a})}var b=a&&a.phrases,c=a&&a.months||f,d=a&&a.formats||g;this.timeAgo=function(a){var b=n.parseDate(a),f=+(new Date),g=f-b,m;return b?isNaN(g)||g<h*2?e("now"):g<i?(m=Math.floor(g/h),e(d.abbr,{number:m,symbol:e(l,{abbr:e("s"),expanded:m>1?e("seconds"):e("second")})})):g<j?(m=Math.floor(g/i),e(d.abbr,{number:m,symbol:e(l,{abbr:e("m"),expanded:m>1?e("minutes"):e("minute")})})):g<k?(m=Math.floor(g/j),e(d.abbr,{number:m,symbol:e(l,{abbr:e("h"),expanded:m>1?e("hours"):e("hour")})})):g<k*365?e(d.shortdate,{day:b.getDate(),month:e(c[b.getMonth()])}):e(d.longdate,{day:b.getDate(),month:e(c[b.getMonth()]),year:b.getFullYear().toString().slice(2)}):""},this.localTimeStamp=function(a){var b=n.parseDate(a),f=b&&b.getHours();return b?e(d.full,{day:b.getDate(),month:e(c[b.getMonth()]),year:b.getFullYear(),hours24:m(f),hours12:f<13?f?f:"12":f-12,minutes:m(b.getMinutes()),seconds:m(b.getSeconds()),amPm:f<12?e("AM"):e("PM")}):""}}var c=/(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,d=/[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,e=/^\d+$/,f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],g={abbr:"%{number}%{symbol}",shortdate:"%{day} %{month}",longdate:"%{day} %{month} %{year}",full:"%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"},h=1e3,i=h*60,j=i*60,k=j*24,l='<abbr title="%{expanded}">%{abbr}</abbr>';n.parseDate=function(a){var g=a||"",h=g.toString(),i,j;return i=function(){var a;if(e.test(h))return parseInt(h,10);if(a=h.match(d))return Date.UTC(a[7],b.indexOf(f,a[1]),a[2],a[3],a[4],a[5]);if(a=h.match(c))return Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6])}(),i?(j=new Date(i),!isNaN(j.getTime())&&j):!1},a(n)})});
provide("tfw/util/assets",function(a){using("util/env",function(b){function d(a,d){var e=c[a],f;return b.retina()?f="2x":b.ie6()||b.ie7()?f="gif":f="default",d&&(f+=".rtl"),e[f]}var c={"embed/timeline.css":{"default":"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.default.css","2x":"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.2x.css",gif:"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.gif.css","default.rtl":"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.default.rtl.css","2x.rtl":"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.2x.rtl.css","gif.rtl":"embed/timeline.1b09d496be70f7c1dd907837cdcb3e87.gif.rtl.css"}};a(d)})});
provide("tfw/widget/syndicatedbase",function(a){using("tfw/widget/base","tfw/widget/intent","tfw/util/assets","tfw/util/globals","dom/classname","dom/delegate","dom/sandbox","util/env","util/twitter","util/util",function(b,c,d,e,f,g,h,i,j,k){function s(){p=v.VALID_COLOR.test(e.val("widgets:link-color"))&&RegExp.$1,r=v.VALID_COLOR.test(e.val("widgets:border-color"))&&RegExp.$1,q=e.val("widgets:theme")}function t(a,b,c){var d;c=c||document;if(c.getElementById(a))return;d=c.createElement("link"),d.id=a,d.rel="stylesheet",d.type="text/css",d.href=twttr.widgets.config.assetUrl()+"/"+b,c.getElementsByTagName("head")[0].appendChild(d)}function u(a){t("twitter-widget-css",d("embed/timeline.css"),a)}function v(a){if(!a)return;var c,d,e=this;this.sandboxReadyCallbacks=[],b.apply(this,[a]),c=this.params(),this.targetEl=this.srcEl&&this.srcEl.parentNode||c.targetEl||document.body,this.containerWidth=this.targetEl&&this.targetEl.offsetWidth,d=c.width||this.attr("width")||this.containerWidth||this.dimensions.DEFAULT_WIDTH,this.height=v.VALID_UNIT.test(c.height||this.attr("height"))&&RegExp.$1,this.width=Math.max(this.dimensions.MIN_WIDTH,Math.min(v.VALID_UNIT.test(d)?RegExp.$1:this.dimensions.DEFAULT_WIDTH,this.dimensions.DEFAULT_WIDTH)),this.narrow=c.narrow||this.width<=this.dimensions.NARROW_WIDTH,this.narrow&&this.classAttr.push("var-narrow"),v.VALID_COLOR.test(c.linkColor||this.dataAttr("link-color"))?this.linkColor=RegExp.$1:this.linkColor=p,v.VALID_COLOR.test(c.borderColor||this.dataAttr("border-color"))?this.borderColor=RegExp.$1:this.borderColor=r,this.theme=c.theme||this.attr("data-theme")||q,this.theme=/(dark|light)/.test(this.theme)?this.theme:"",this.classAttr.push(i.touch()?"is-touch":"not-touch"),h(function(a){e.sandboxReady=!0,e.setupSandbox.call(e,a)},{"class":this.renderedClassNames,id:this.id},{width:"1px",height:"1px",border:"none",position:"absolute"},function(a){e.srcEl?e.targetEl.insertBefore(a,e.srcEl):e.targetEl.appendChild(a)})}var l=[".customisable",".customisable:link",".customisable:visited",".customisable:hover",".customisable:active",".customisable-highlight:hover","a:hover .customisable-highlight","a:focus .customisable-highlight"],m=["a:hover .ic-mask","a:focus .ic-mask"],n=[".customisable-border"],o=[".timeline-header h1.summary",".timeline-header h1.summary a:link",".timeline-header h1.summary a:visited"],p,q,r;v.prototype=new b,k.aug(v.prototype,{setupSandbox:function(a){var b=a.doc,c=b.createElement("base"),d=b.createElement("style"),f=b.getElementsByTagName("head")[0],g="body{display:none}",h=this,i;this.sandbox=a,a.frame.title=this.a11yTitle,u(a.doc),c.target="_blank",f.appendChild(c),e.val("widgets:csp")!="on"&&(d.type="text/css",d.styleSheet?d.styleSheet.cssText=g:d.appendChild(b.createTextNode(g)),f.appendChild(d)),this.handleResize&&window.addEventListener?window.addEventListener("resize",function(){h.handleResize()},!0):document.body.attachEvent("onresize",function(){h.handleResize()}),a.win.onresize=function(a){h.handleResize&&h.handleResize()},this.frameIsReady=!0;for(;i=this.sandboxReadyCallbacks.shift();)i.fn.apply(i.context,i.args)},callsWhenSandboxReady:function(a){var b=this;return function(){var c=[],d=arguments.length,e=0;for(;e<d;e++)c.push(arguments[e]);b.callIfSandboxReady(a,b,c)}},callIfSandboxReady:function(a,b,c){c=c||[],b.frameIsReady?a.apply(b,[!1].concat(c)):b.sandboxReadyCallbacks.push({fn:a,context:b,args:[!0].concat(c)})},contentWidth:function(){var a=this.chromeless?0:this.narrow?this.dimensions.NARROW_MEDIA_PADDING:this.dimensions.WIDE_MEDIA_PADDING;return this.width-a},addSiteStyles:function(){var a=this,b=this.sandbox.doc,c=this.id+"-styles",d,f=0,g=function(b){return(a.theme=="dark"?".thm-dark ":"")+b},h="",i="",j="",p="";if(e.val("widgets:csp")=="on")return;if(b.getElementById(c))return;this.headingStyle&&(j=k.map(o,g).join(",")+"{"+this.headingStyle+"}"),this.linkColor&&(h=k.map(l,g).join(",")+"{color:"+this.linkColor+"}",i=k.map(m,g).join(",")+"{background-color:"+this.linkColor+"}"),this.borderColor&&(p=k.map(n,g).concat(this.theme=="dark"?[".thm-dark.customisable-border"]:[]).join(",")+"{border-color:"+this.borderColor+"}");if(!h&&!i&&!j)return;d=b.createElement("style"),d.id=c,d.type="text/css",d.styleSheet?d.styleSheet.cssText=h+i+j+p:(d.appendChild(b.createTextNode(h)),d.appendChild(b.createTextNode(i)),d.appendChild(b.createTextNode(j)),d.appendChild(b.createTextNode(p))),b.getElementsByTagName("head")[0].appendChild(d)},bindIntentHandlers:function(){var a=this,b=this.element;g.delegate(b,"click",".profile",function(b){var d;a.addUrlParams(this),d=j.intentForProfileURL(this.href);if(b.altKey||b.metaKey||b.shiftKey)return;d&&(c.open(d,a.sandbox.frame),g.preventDefault(b))}),g.delegate(b,"click",".web-intent",function(b){a.addUrlParams(this);if(b.altKey||b.metaKey||b.shiftKey)return;c.open(this.href,a.sandbox.frame),g.preventDefault(b)})}}),v.VALID_UNIT=/^([0-9]+)( ?px)?$/,v.VALID_COLOR=/^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i,v.retinize=function(a){if(!i.retina())return;var b=a.getElementsByTagName("IMG"),c,d,e=0,f=b.length;for(;e<f;e++)c=b[e],d=c.getAttribute("data-src-2x"),d&&(c.src=d)},v.scaleDimensions=function(a,b,c,d){return b>a&&b>d?(a*=d/b,b=d):a>c&&(b*=c/a,a=c,b>d&&(a*=d/b,b=d)),{width:Math.ceil(a),height:Math.ceil(b)}},v.constrainMedia=function(a,b){var c=a.getElementsByTagName("IMG"),d=a.getElementsByTagName("IFRAME"),e,f,g,h=0,i=0,j;for(;e=[c,d][i];i++)if(e.length)for(j=0;f=e[j];j++)g=v.scaleDimensions(f.getAttribute("width")||f.width,f.getAttribute("height")||f.height,b,375),g.width>0&&(f.width=g.width),g.height>0&&(f.height=g.height),h=g.height>h?g.height:h;return h},s(),a(v)})});
provide("tfw/widget/timeline",function(a){using("tfw/widget/syndicatedbase","util/datetime","anim/transition","tfw/util/data","tfw/util/tracking","tfw/util/params","util/css","util/env","util/iframe","util/insert","util/throttle","util/twitter","util/querystring","util/util","dom/delegate","dom/classname","dom/get",function(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){function K(a){if(!a)return;var c,d,e;this.a11yTitle=this._("Twitter Timeline Widget"),b.apply(this,[a]),c=this.params(),d=(c.chrome||this.dataAttr("chrome")||"").split(" "),this.preview=c.previewParams,this.widgetId=c.widgetId||this.dataAttr("widget-id"),this.widgetScreenName=c.screenName||this.dataAttr("screen-name"),this.widgetUserId=c.userId||this.dataAttr("user-id");if(c.showReplies===!0||this.dataAttr("show-replies")=="true")this.widgetShowReplies="true";d.length&&(e=~o.indexOf(d,"none"),this.chromeless=e||~o.indexOf(d,"transparent"),this.headerless=e||~o.indexOf(d,"noheader"),this.footerless=e||~o.indexOf(d,"nofooter"),this.borderless=e||~o.indexOf(d,"noborders")),this.headingStyle=h.sanitize(c.headingStyle||this.dataAttr("heading-style"),undefined,!0),this.classAttr.push("twitter-timeline-rendered"),this.ariaPolite=c.ariaPolite||this.dataAttr("aria-polite")}function L(a,c){var d=a.ownerDocument,e=r.one(C,a,"DIV"),f=e&&e.children[0],g=f&&f.getAttribute("data-expanded-media"),h,i=0,j=r.one(D,a,"A"),k=j&&j.getElementsByTagName("B")[0],l=k&&(k.innerText||k.textContent),m;if(!k)return;k.innerHTML=j.getAttribute("data-toggled-text"),j.setAttribute("data-toggled-text",l);if(q.present(a,B)){q.remove(a,B);if(!e)return;e.style.cssText="",f.innerHTML="";return}g&&(h=d.createElement("DIV"),h.innerHTML=g,b.retinize(h),i=b.constrainMedia(h,c),f.appendChild(h)),e&&(m=Math.max(f.offsetHeight,i),e.style.cssText="height:"+m+"px"),q.add(a,B)}var s="1.0",t={CLIENT_SIDE_USER:0,CLIENT_SIDE_APP:2},u="timeline",v="new-tweets-bar",w="timeline-header",x="timeline-footer",y="stream",z="h-feed",A="tweet",B="expanded",C="detail-expander",D="expand",E="permalink",F="twitter-follow-button",G="no-more-pane",H="pending-scroll-in",I="pending-new-tweet",J="show-new-tweet";K.prototype=new b,o.aug(K.prototype,{renderedClassNames:"twitter-timeline twitter-timeline-rendered",dimensions:{DEFAULT_HEIGHT:"600",DEFAULT_WIDTH:"520",NARROW_WIDTH:"320",MIN_WIDTH:"180",MIN_HEIGHT:"200",WIDE_MEDIA_PADDING:81,NARROW_MEDIA_PADDING:16},create:function(a){var c=this.sandbox.doc.createElement("div"),d,e=this,g,h,i,j=[],k,l;c.innerHTML=a.body,d=c.children[0]||!1;if(!d)return;this.reconfigure(a.config),this.augmentWidgets(d),b.retinize(d),b.constrainMedia(d,this.contentWidth()),this.searchQuery=d.getAttribute("data-search-query"),this.profileId=d.getAttribute("data-profile-id"),k=this.getTweetDetails(c);for(l in k)k.hasOwnProperty(l)&&j.push(l);return f.enqueue({page:"timeline",component:"timeline",element:"initial",action:j.length?"results":"no_results"},{widget_id:this.widgetId,widget_origin:document.location.href,item_ids:j,item_details:k,client_version:s,message:this.partner,query:this.searchQuery,profile_id:this.profileId},!0,this.dnt),f.flush(),this.ariaPolite=="assertive"&&(h=r.one(v,d,"DIV"),h.setAttribute("aria-polite","assertive")),d.id=this.id,d.className+=" "+this.classAttr.join(" "),d.lang=this.lang,twttr.widgets.load(d),i=function(){e.sandbox.body.appendChild(d),e.sandbox.win.setTimeout(function(){var a=r.one(w,d,"DIV"),b=r.one(x,d,"DIV"),c=r.one(y,d,"DIV");b?g=a.offsetHeight+b.offsetHeight:g=a.offsetHeight,c.style.cssText="height:"+(e.height-g-2)+"px"},500),e.sandbox.frame.style.cssText="",e.sandbox.frame.width=e.width,e.sandbox.frame.height=e.height,e.sandbox.frame.style.border="none",e.sandbox.frame.style.maxWidth="100%",e.sandbox.frame.style.minWidth=e.dimensions.MIN_WIDTH+"px"},this.callsWhenSandboxReady(i)(),this.srcEl&&this.srcEl.parentNode&&this.srcEl.parentNode.removeChild(this.srcEl),d},render:function(a,b){function h(){d.success=function(a){c.element=c.create(a),c.readTranslations(),c.bindInteractions(),b&&b(c.sandbox.frame);return},d.error=function(a){a&&a.headers&&b&&b(a.headers.status)},d.params=c.preview,e.timelinePreview(d);return}function i(){f.initPostLogging(),e.timeline({id:c.widgetId,screenName:c.widgetScreenName,userId:c.widgetUserId,withReplies:c.widgetShowReplies,dnt:c.dnt,lang:c.lang,success:function(a){c.element=c.create(a),c.readTranslations(),c.bindInteractions(),a.headers.xPolling&&/\d/.test(a.headers.xPolling)&&(c.pollInterval=a.headers.xPolling*1e3),c.updateTimeStamps(),c.schedulePolling(),b&&b(c.sandbox.frame);return},error:function(a){a&&a.headers&&b&&b(a.headers.status)}})}var c=this,d={},g;if(!this.preview&&!this.widgetId){b&&b(400);return}g=this.preview?h:i,this.sandboxReady?g():window.setTimeout(g,0)},reconfigure:function(a){this.lang=a.lang,this.theme||(this.theme=a.theme),this.theme=="dark"&&this.classAttr.push("thm-dark"),this.chromeless&&this.classAttr.push("var-chromeless"),this.borderless&&this.classAttr.push("var-borderless"),this.headerless&&this.classAttr.push("var-headerless"),this.footerless&&this.classAttr.push("var-footerless"),!this.linkColor&&a.linkColor&&b.VALID_COLOR.test(a.linkColor)&&(this.linkColor=RegExp.$1),this.addSiteStyles(),!this.height&&b.VALID_UNIT.test(a.height)&&(this.height=RegExp.$1),this.height=Math.max(this.dimensions.MIN_HEIGHT,this.height?this.height:this.dimensions.DEFAULT_HEIGHT),this.preview&&this.classAttr.push("var-preview"),this.narrow=this.width<=this.dimensions.NARROW_WIDTH,this.narrow&&this.classAttr.push("var-narrow")},getTweetDetails:function(a){var b=r.all(A,a,"LI"),c={},d,e,f,g,h={TWEET:0,RETWEET:10},i=0;for(;d=b[i];i++)e=r.one(E,d,"A"),f=m.status(e.href),g=d.getAttribute("data-tweet-id"),f===g?c[f]={item_type:h.TWEET}:c[f]={item_type:h.RETWEET,target_type:h.TWEET,target_id:g};return c},bindInteractions:function(){var a=this,b=this.element,c=!0;this.bindIntentHandlers(),p.delegate(b,"click","."+D,function(c){if(c.altKey||c.metaKey||c.shiftKey)return;L(r.ancestor("."+A,this,b),a.contentWidth()),p.stop(c)}),p.delegate(b,"click","A",function(a){p.stopPropagation(a)}),p.delegate(b,"click",".with-expansion",function(b){L(this,a.contentWidth()),p.stop(b)}),p.delegate(b,"click",".load-more",function(){a.loadMore()}),p.delegate(b,"click","."+v,function(){a.scrollToTop(),a.hideNewTweetNotifier(!0)}),p.delegate(b,"click",".load-tweets",function(b){c&&(c=!1,a.forceLoad(),p.stop(b))}),p.delegate(b,"click",".display-sensitive-image",function(c){a.showNSFW(r.ancestor("."+A,this,b)),p.stop(c)}),p.delegate(b,"mouseover","."+u,function(){a.mouseOver=!0}),p.delegate(b,"mouseout","."+u,function(){a.mouseOver=!1}),p.delegate(b,"mouseover","."+v,function(){a.mouseOverNotifier=!0}),p.delegate(b,"mouseout","."+v,function(){a.mouseOverNotifier=!1,window.setTimeout(function(){a.hideNewTweetNotifier()},3e3)})},scrollToTop:function(){var a=r.one(y,this.element,"DIV");a.scrollTop=0,a.focus()},update:function(){var a=this,b=r.one(A,this.element,"LI"),c=b&&b.getAttribute("data-tweet-id");this.updateTimeStamps(),this.requestTweets(c,!0,function(b){b.childNodes.length>0&&a.insertNewTweets(b)})},loadMore:function(){var a=this,b=r.all(A,this.element,"LI").pop(),c=b&&b.getAttribute("data-tweet-id");this.requestTweets(c,!1,function(b){var d=r.one(G,a.element,"P"),e=b.childNodes[0];d.style.cssText="",e&&e.getAttribute("data-tweet-id")==c&&b.removeChild(e);if(b.childNodes.length>0){a.appendTweets(b);return}q.add(a.element,"no-more"),d.focus()})},forceLoad:function(){var a=this,b=!!r.all(z,this.element,"OL").length;this.requestTweets(1,!0,function(c){c.childNodes.length&&(a[b?"insertNewTweets":"appendTweets"](c),q.add(a.element,"has-tweets"))})},schedulePolling:function(a){var b=this;if(this.pollInterval===null)return;a=twttr.widgets.poll||a||this.pollInterval||1e4,a>-1&&window.setTimeout(function(){this.isUpdating||b.update(),b.schedulePolling()},a)},requestTweets:function(a,c,d){var g=this,h={id:this.widgetId,screenName:this.widgetScreenName,userId:this.widgetUserId,withReplies:this.widgetShowReplies,dnt:this.dnt,lang:this.lang};h[c?"sinceId":"maxId"]=a,h.complete=function(){this.isUpdating=!1},h.error=function(a){if(a&&a.headers){if(a.headers.status=="404"){g.pollInterval=null;return}if(a.headers.status=="503"){g.pollInterval*=1.5;return}}},h.success=function(a){var e=g.sandbox.doc.createDocumentFragment(),h=g.sandbox.doc.createElement("div"),i=[],j,k;a&&a.headers&&a.headers.xPolling&&/\d+/.test(a.headers.xPolling)&&(g.pollInterval=a.headers.xPolling*1e3);if(a&&a.body!==undefined){h.innerHTML=a.body;if(h.children[0]&&h.children[0].tagName!="LI")return;j=g.getTweetDetails(h);for(k in j)j.hasOwnProperty(k)&&i.push(k);i.length&&(f.enqueue({page:"timeline",component:"timeline",element:c?"newer":"older",action:"results"},{widget_id:g.widgetId,widget_origin:document.location.href,item_ids:i,item_details:j,client_version:s,message:g.partner,query:g.searchQuery,profile_id:g.profileId,event_initiator:c?t.CLIENT_SIDE_APP:t.CLIENT_SIDE_USER},!0,g.dnt),f.flush()),b.retinize(h),b.constrainMedia(h,g.contentWidth());while(h.children[0])e.appendChild(h.children[0]);d(e)}},e.timelinePoll(h)},insertNewTweets:function(a){var b=this,c=r.one(y,this.element,"DIV"),e=r.one(z,c,"OL"),f=e.offsetHeight,g;this.updateTimeStamps(),e.insertBefore(a,e.firstChild),g=e.offsetHeight-f;if(c.scrollTop>40||this.mouseIsOver()){c.scrollTop=c.scrollTop+g,this.showNewTweetNotifier();return}q.remove(this.element,H),e.style.cssText="margin-top: -"+g+"px",window.setTimeout(function(){c.scrollTop=0,q.add(b.element,H),i.cssTransitions()?e.style.cssText="":d.animate(function(a){a<g?e.style.cssText="margin-top: -"+(g-a)+"px":e.style.cssText=""},g,500,d.easeOut)},500),this.gcTweets(50)},appendTweets:function(a){var b=r.one(y,this.element,"DIV"),c=r.one(z,b,"OL");this.updateTimeStamps(),c.appendChild(a)},gcTweets:function(a){var b=r.one(z,this.element,"OL"),c=b.children.length,d;a=a||50;for(;c>a&&(d=b.children[c-1]);c--)b.removeChild(d)},showNewTweetNotifier:function(){var a=this,b=r.one(v,this.element,"DIV"),c=b.children[0];b.style.cssText="",q.add(this.element,I),b.removeChild(c),b.appendChild(c),q.replace(this.element,I,J),this.newNoticeDisplayTime=+(new Date),window.setTimeout(function(){a.hideNewTweetNotifier()},5e3)},hideNewTweetNotifier:function(a){var b=this;if(!a&&this.mouseOverNotifier)return;q.replace(this.element,J,I),window.setTimeout(function(){q.remove(b.element,I)},500)},augmentWidgets:function(a){var b=r.all(F,a,"A"),c=0,d;for(;d=b[c];c++)d.setAttribute("data-related",this.related),d.setAttribute("data-partner",this.partner),d.setAttribute("data-dnt",this.dnt),d.setAttribute("data-search-query",this.searchQuery),d.setAttribute("data-profile-id",this.profileId),this.width<250&&d.setAttribute("data-show-screen-name","false")},readTranslations:function(){var a=this.element,b="data-dt-";this.datetime=new c(o.compact({phrases:{now:a.getAttribute(b+"now"),s:a.getAttribute(b+"s"),m:a.getAttribute(b+"m"),h:a.getAttribute(b+"h"),second:a.getAttribute(b+"second"),seconds:a.getAttribute(b+"seconds"),minute:a.getAttribute(b+"minute"),minutes:a.getAttribute(b+"minutes"),hour:a.getAttribute(b+"hour"),hours:a.getAttribute(b+"hours")},months:a.getAttribute(b+"months").split("|"),formats:{abbr:a.getAttribute(b+"abbr"),shortdate:a.getAttribute(b+"short"),longdate:a.getAttribute(b+"long")}}))},updateTimeStamps:function(){var a=r.all(E,this.element,"A"),b,c,d=0,e,f;for(;b=a[d];d++){e=b.getAttribute("data-datetime"),f=e&&this.datetime.timeAgo(e,this.i18n),c=b.getElementsByTagName("TIME")[0];if(!f)continue;if(c&&c.innerHTML){c.innerHTML=f;continue}b.innerHTML=f}},mouseIsOver:function(){return this.mouseOver},addUrlParams:function(a){var b=this,c={tw_w:this.widgetId,related:this.related,partner:this.partner,query:this.searchQuery,profile_id:this.profileId,tw_p:"embeddedtimeline"};return this.addUrlParams=g(c,function(a){var c=r.ancestor("."+A,a,b.element);return c&&{tw_i:c.getAttribute("data-tweet-id")}}),this.addUrlParams(a)},showNSFW:function(a){var c=r.one("nsfw",a,"DIV"),d,e,f=0,g,h,j,k;if(!c)return;e=b.scaleDimensions(c.getAttribute("data-width"),c.getAttribute("data-height"),this.contentWidth(),c.getAttribute("data-height")),d=!!(h=c.getAttribute("data-player")),d?j=this.sandbox.doc.createElement("iframe"):(j=this.sandbox.doc.createElement("img"),h=c.getAttribute(i.retina()?"data-image-2x":"data-image"),j.alt=c.getAttribute("data-alt"),k=this.sandbox.doc.createElement("a"),k.href=c.getAttribute("data-href"),k.appendChild(j)),j.title=c.getAttribute("data-title"),j.src=h,j.width=e.width,j.height=e.height,g=r.ancestor("."+C,c,a),f=e.height-c.offsetHeight,c.parentNode.replaceChild(d?j:k,c),g.style.cssText="height:"+(g.offsetHeight+f)+"px"},handleResize:function(){this.handleResize=l(function(){var a=Math.min(this.dimensions.DEFAULT_WIDTH,Math.max(this.dimensions.MIN_WIDTH,this.sandbox.frame.offsetWidth));if(!this.element)return;a<this.dimensions.NARROW_WIDTH?(this.narrow=!0,q.add(this.element,"var-narrow")):(this.narrow=!1,q.remove(this.element,"var-narrow"))},50,this),this.handleResize()}}),a(K)})});
provide("tfw/widget/embed",function(a){using("tfw/widget/base","tfw/widget/syndicatedbase","util/datetime","tfw/util/params","dom/classname","dom/get","util/env","util/util","util/throttle","util/twitter","tfw/util/data","tfw/util/tracking",function(b,c,d,e,f,g,h,i,j,k,l,m){function q(a,b,c){var d=g.one("subject",a,"BLOCKQUOTE"),e=g.one("reply",a,"BLOCKQUOTE"),f=d&&d.getAttribute("data-tweet-id"),h=e&&e.getAttribute("data-tweet-id"),i={},j={};if(!f)return;i[f]={item_type:0},m.enqueue({page:"tweet",section:"subject",component:"tweet",action:"results"},{client_version:n,widget_origin:document.location.href,message:b,item_ids:[f],item_details:i},!0,c);if(!h)return;j[h]={item_type:0},m.enqueue({page:"tweet",section:"conversation",component:"tweet",action:"results"},{client_version:n,widget_origin:document.location.href,message:b,item_ids:[h],item_details:j,associations:{4:{association_id:f,association_type:4}}},!0,c)}function r(a,b,c){var d={};if(!a)return;d[a]={item_type:0},m.enqueue({page:"tweet",section:"subject",component:"rawembedcode",action:"no_results"},{client_version:n,widget_origin:document.location.href,message:b,item_ids:[a],item_details:d},!0,c)}function s(a,b,c,d,e){p[a]=p[a]||[],p[a].push({s:c,f:d,r:e,lang:b})}function t(a){if(!a)return;var b,d,e;this.a11yTitle=this._("Embedded Tweet"),c.apply(this,[a]),b=this.params(),d=this.srcEl&&this.srcEl.getElementsByTagName("A"),e=d&&d[d.length-1],this.hideThread=(b.conversation||this.dataAttr("conversation"))=="none"||~i.indexOf(this.classAttr,"tw-hide-thread"),this.hideCard=(b.cards||this.dataAttr("cards"))=="hidden"||~i.indexOf(this.classAttr,"tw-hide-media");if((b.align||this.attr("align"))=="left"||~i.indexOf(this.classAttr,"tw-align-left"))this.align="left";else if((b.align||this.attr("align"))=="right"||~i.indexOf(this.classAttr,"tw-align-right"))this.align="right";else if((b.align||this.attr("align"))=="center"||~i.indexOf(this.classAttr,"tw-align-center"))this.align="center",this.containerWidth>this.dimensions.MIN_WIDTH*(1/.7)&&this.width>this.containerWidth*.7&&(this.width=this.containerWidth*.7);this.narrow=b.narrow||this.width<=this.dimensions.NARROW_WIDTH,this.narrow&&this.classAttr.push("var-narrow"),this.tweetId=b.tweetId||e&&k.status(e.href)}var n="2.0",o="tweetembed",p={};t.prototype=new c,i.aug(t.prototype,{renderedClassNames:"twitter-tweet twitter-tweet-rendered",dimensions:{DEFAULT_HEIGHT:"0",DEFAULT_WIDTH:"500",NARROW_WIDTH:"350",MIN_WIDTH:"220",MIN_HEIGHT:"0",WIDE_MEDIA_PADDING:32,NARROW_MEDIA_PADDING:32},create:function(a){var b=this.sandbox.doc.createElement("div"),d,e=this.sandbox.frame,f=e.style;b.innerHTML=a,d=b.children[0]||!1;if(!d)return;return this.theme=="dark"&&this.classAttr.push("thm-dark"),this.linkColor&&this.addSiteStyles(),this.augmentWidgets(d),c.retinize(d),c.constrainMedia(d,this.contentWidth()),d.id=this.id,d.className+=" "+this.classAttr.join(" "),d.lang=this.lang,twttr.widgets.load(d),this.sandbox.body.appendChild(d),f.cssText="",e.width=this.width,e.height=0,f.display="block",f.border="none",f.maxWidth="99%",f.minWidth=this.dimensions.MIN_WIDTH+"px",f.padding="0",q(d,this.partner,this.dnt),d},render:function(a,b){var c=this,d="",e=this.tweetId,f,g,h;if(!e)return;this.hideCard&&(d+="c"),this.hideThread&&(d+="t"),d&&(e+="-"+d),h=this.callsWhenSandboxReady(function(a){function d(){var a=c.sandbox.frame,b=a.style;c.srcEl&&c.srcEl.parentNode&&c.srcEl.parentNode.removeChild(c.srcEl),b.borderRadius="5px",b.margin="10px 0",b.border="#ddd 1px solid",b.borderTopColor="#eee",b.borderBottomColor="#bbb",b.boxShadow="0 1px 3px rgba(0,0,0,0.15)",c.align=="center"?(b.margin="7px auto",b.float="none"):c.align&&(c.width==c.dimensions.DEFAULT_WIDTH&&(a.width=c.dimensions.NARROW_WIDTH),b.float=c.align),c.handleResize()}var b;if((!window.getComputedStyle||c.sandbox.win.getComputedStyle(c.sandbox.body,null).display!=="none")&&c.element.offsetHeight)return d();b=window.setInterval(function(){(!window.getComputedStyle||c.sandbox.win.getComputedStyle(c.sandbox.body,null).display!=="none")&&c.element.offsetHeight&&(window.clearInterval(b),d())},100)}),f=this.callsWhenSandboxReady(function(a,d){c.element=c.create(d),c.readTimestampTranslations(),c.updateTimeStamps(),c.bindIntentHandlers(),b&&b(c.sandbox.frame)}),g=this.callsWhenSandboxReady(function(a){r(c.tweetId,c.partner,c.dnt)}),s(e,this.lang,f,g,h)},augmentWidgets:function(a){var b=g.all("twitter-follow-button",a,"A"),c,d=0;for(;c=b[d];d++)c.setAttribute("data-related",this.related),c.setAttribute("data-partner",this.partner),c.setAttribute("data-dnt",this.dnt),c.setAttribute("data-show-screen-name","false")},addUrlParams:function(a){var b=this,c={related:this.related,partner:this.partner,tw_p:o};return this.addUrlParams=e(c,function(a){var c=g.ancestor(".tweet",a,b.element);return{tw_i:c.getAttribute("data-tweet-id")}}),this.addUrlParams(a)},handleResize:function(){this.handleResize=j(function(){var a=this,b=Math.min(this.dimensions.DEFAULT_WIDTH,Math.max(this.dimensions.MIN_WIDTH,this.sandbox.frame.offsetWidth));if(!this.element)return;b<this.dimensions.NARROW_WIDTH?(this.narrow=!0,f.add(this.element,"var-narrow")):(this.narrow=!1,f.remove(this.element,"var-narrow")),window.setTimeout(function(){a.sandbox.frame.height=a.height=a.element.offsetHeight},0)},50,this),this.handleResize()},readTimestampTranslations:function(){var a=this.element,b="data-dt-",c=a.getAttribute(b+"months")||"";this.datetime=new d(i.compact({phrases:{AM:a.getAttribute(b+"am"),PM:a.getAttribute(b+"pm")},months:c.split("|"),formats:{full:a.getAttribute(b+"full")}}))},updateTimeStamps:function(){var a=g.one("long-permalink",this.element,"A"),b=a.getAttribute("data-datetime"),c=b&&this.datetime.localTimeStamp(b),d=a.getElementsByTagName("TIME")[0];if(!c)return;if(d&&d.innerHTML){d.innerHTML=c;return}a.innerHTML=c}}),t.fetchAndRender=function(){var a=p,b=[],c,d;p={};if(a.keys)b=a.keys();else for(c in a)a.hasOwnProperty(c)&&b.push(c);if(!b.length)return;m.initPostLogging(),d=a[b[0]][0].lang,l.tweets({ids:b.sort(),lang:d,complete:function(b){var c,d,e,f,g,h,i=[];for(c in b)if(b.hasOwnProperty(c)){g=a[c]&&a[c];for(e=0;g.length&&(f=g[e]);e++)f.s&&(f.s.call(this,b[c]),f.r&&i.push(f.r));delete a[c]}for(e=0;h=i[e];e++)h.call(this);for(d in a)if(a.hasOwnProperty(d)){g=a[d];for(e=0;g.length&&(f=g[e]);e++)f.f&&f.f.call(this,b[c])}m.flush()}})},b.afterLoad(t.fetchAndRender),a(t)})});
provide("dom/textsize",function(a){function c(a,b,c){var d=[],e=0,f;for(;f=c[e];e++)d.push(f[0]),d.push(f[1]);return a+b+d.join(":")}function d(a){var b=a||"";return b.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var b={};a(function(a,e,f){var g=document.createElement("span"),h={},i="",j,k=0,l=0,m=[];f=f||[],e=e||"",i=c(a,e,f);if(b[i])return b[i];g.className=e+" twitter-measurement";try{for(;j=f[k];k++)g.style[j[0]]=j[1]}catch(n){for(;j=f[l];l++)m.push(d(j[0])+":"+j[1]);g.setAttribute("style",m.join(";")+";")}return g.innerHTML=a,document.body.appendChild(g),h.width=g.clientWidth||g.offsetWidth,h.height=g.clientHeight||g.offsetHeight,document.body.removeChild(g),delete g,b[i]=h})});
provide("tfw/widget/tweetbase",function(a){using("util/util","tfw/widget/base","util/querystring","util/twitter","util/uri",function(b,c,d,e,f){function i(a){if(!a)return;var b;c.apply(this,[a]),b=this.params(),this.text=b.text||this.dataAttr("text"),this.text&&/\+/.test(this.text)&&!/ /.test(this.text)&&(this.text=this.text.replace(/\+/g," ")),this.align=b.align||this.dataAttr("align")||"",this.via=b.via||this.dataAttr("via"),this.placeid=b.placeid||this.dataAttr("placeid"),this.hashtags=b.hashtags||this.dataAttr("hashtags"),this.screen_name=e.screenName(b.screen_name||b.screenName||this.dataAttr("button-screen-name")),this.url=b.url||this.dataAttr("url")}var g=document.title,h=encodeURI(location.href);i.prototype=new c,b.aug(i.prototype,{parameters:function(){var a={text:this.text,url:this.url,related:this.related,lang:this.lang,placeid:this.placeid,original_referer:location.href,id:this.id,screen_name:this.screen_name,hashtags:this.hashtags,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)}}),a(i)})});
provide("tfw/widget/tweetbutton",function(a){using("tfw/widget/tweetbase","util/util","util/querystring","util/uri","util/twitter","dom/textsize",function(b,c,d,e,f,g){var h=document.title,i=encodeURI(location.href),j=["vertical","horizontal","none"],k=function(a){b.apply(this,[a]);var d=this.params(),g=d.count||this.dataAttr("count"),k=d.size||this.dataAttr("size"),l=e.getScreenNameFromPage();if(d.type=="hashtag"||~c.indexOf(this.classAttr,"twitter-hashtag-button"))this.type="hashtag";else if(d.type=="mention"||~c.indexOf(this.classAttr,"twitter-mention-button"))this.type="mention";this.counturl=d.counturl||this.dataAttr("counturl"),this.searchlink=d.searchlink||this.dataAttr("searchlink"),this.button_hashtag=f.hashTag(d.button_hashtag||d.hashtag||this.dataAttr("button-hashtag"),!1),this.size=k=="large"?"l":"m",this.type?(this.count="none",l&&(this.related=this.related?l+","+this.related:l)):(this.text=this.text||h,this.url=this.url||e.getCanonicalURL()||i,this.count=~c.indexOf(j,g)?g:"horizontal",this.count=this.count=="vertical"&&this.size=="l"?"none":this.count,this.via=this.via||l)};k.prototype=new b,c.aug(k.prototype,{parameters:function(){var a={text:this.text,url:this.url,via:this.via,related:this.related,count:this.count,lang:this.lang,counturl:this.counturl,searchlink:this.searchlink,placeid:this.placeid,original_referer:location.href,id:this.id,size:this.size,type:this.type,screen_name:this.screen_name,button_hashtag:this.button_hashtag,hashtags:this.hashtags,align:this.align,dnt:this.dnt,_:+(new Date)};return c.compact(a),d.encode(a)},height:function(){return this.count=="vertical"?62:this.size=="m"?20:28},width:function(){var a={ver:8,cnt:14,btn:24,xlcnt:18,xlbtn:38},b=this.count=="vertical",d=this.type=="hashtag"&&this.button_hashtag?"Tweet %{hashtag}":this.type=="mention"&&this.screen_name?"Tweet to %{name}":"Tweet",e=this._(d,{name:"@"+this.screen_name,hashtag:"#"+this.button_hashtag}),f=this._("K"),h=this._("100K+"),i=(b?"8888":"88888")+f,j=0,k=0,l=0,m=0,n=this.styles.base,o=n;return~c.indexOf(["ja","ko"],this.lang)?i+=this._("10k unit"):i=i.length>h.length?i:h,b?(o=n.concat(this.styles.vbubble),m=a.ver,l=a.btn):this.size=="l"?(n=o=n.concat(this.styles.large),l=a.xlbtn,m=a.xlcnt):(l=a.btn,m=a.cnt),this.count!="none"&&(k=g(i,"",o).width+m),j=g(e,"",n.concat(this.styles.button)).width+l,b?j>k?j:k:this.calculatedWidth=j+k},render:function(a,b){var c=twttr.widgets.config.assetUrl()+"/widgets/tweet_button.1366232305.html#"+this.parameters();this.count&&this.classAttr.push("twitter-count-"+this.count),this.element=this.create(c,this.dimensions(),{title:this._("Twitter Tweet Button")}),b&&b(this.element)}}),a(k)})});
provide("tfw/widget/follow",function(a){using("util/util","tfw/widget/base","util/querystring","util/uri","util/twitter","dom/textsize",function(b,c,d,e,f,g){function h(a){if(!a)return;var b,d,e,g,h;c.apply(this,[a]),b=this.params(),d=b.size||this.dataAttr("size"),e=b.showScreenName||this.dataAttr("show-screen-name"),h=b.count||this.dataAttr("count"),this.classAttr.push("twitter-follow-button"),this.showScreenName=e!="false",this.showCount=b.showCount!==!1&&this.dataAttr("show-count")!="false",h=="none"&&(this.showCount=!1),this.explicitWidth=b.width||this.dataAttr("width")||"",this.screenName=b.screen_name||b.screenName||f.screenName(this.attr("href")),this.preview=b.preview||this.dataAttr("preview")||"",this.align=b.align||this.dataAttr("align")||"",this.size=d=="large"?"l":"m"}h.prototype=new c,b.aug(h.prototype,{parameters:function(){var a={screen_name:this.screenName,lang:this.lang,show_count:this.showCount,show_screen_name:this.showScreenName,align:this.align,id:this.id,preview:this.preview,size:this.size,dnt:this.dnt,_:+(new Date)};return b.compact(a),d.encode(a)},render:function(a,b){if(!this.screenName)return;var c=twttr.widgets.config.assetUrl()+"/widgets/follow_button.1366232305.html#"+this.parameters();this.element=this.create(c,this.dimensions(),{title:this._("Twitter Follow Button")}),b&&b(this.element)},width:function(){if(this.calculatedWidth)return this.calculatedWidth;if(this.explicitWidth)return this.explicitWidth;var a={cnt:13,btn:24,xlcnt:22,xlbtn:38},c=this.showScreenName?"Follow %{screen_name}":"Follow",d=this._(c,{screen_name:"@"+this.screenName}),e=~b.indexOf(["ja","ko"],this.lang)?this._("10k unit"):this._("M"),f=this._("%{followers_count} followers",{followers_count:"88888"+e}),h=0,i=0,j,k,l=this.styles.base;return this.size=="l"?(l=l.concat(this.styles.large),j=a.xlbtn,k=a.xlcnt):(j=a.btn,k=a.cnt),this.showCount&&(i=g(f,"",l).width+k),h=g(d,"",l.concat(this.styles.button)).width+j,this.calculatedWidth=h+i}}),a(h)})});
!function(){function a(a){return(a||!/^http\:$/.test(window.location.protocol))&&!twttr.ignoreSSL?"https":"http"}window.twttr=window.twttr||{},twttr.host=twttr.host||"platform.twitter.com";if(twttr.widgets&&twttr.widgets.loaded)return twttr.widgets.load(),!1;if(twttr.init)return!1;twttr.init=!0,twttr._e=twttr._e||[],twttr.ready=twttr.ready||function(a){twttr.widgets&&twttr.widgets.loaded?a(twttr):twttr._e.push(a)},using.path.length||(using.path=a()+"://"+twttr.host+"/js"),twttr.ignoreSSL=twttr.ignoreSSL||!1;var b=[];twttr.events={bind:function(a,c){return b.push([a,c])}},using("util/domready",function(c){c(function(){using("tfw/widget/base","tfw/widget/follow","tfw/widget/tweetbutton","tfw/widget/embed","tfw/widget/timeline","tfw/widget/intent","tfw/util/globals","util/events","util/util",function(c,d,e,f,g,h,i,j,k){function q(b){var c=twttr.host;return a(b)=="https"&&twttr.secureHost&&(c=twttr.secureHost),a(b)+"://"+c}function r(){using("tfw/hub/client",function(a){twttr.events.hub=a.init(n),a.init(n,!0)})}var l,m,n={widgets:{"a.twitter-share-button":e,"a.twitter-mention-button":e,"a.twitter-hashtag-button":e,"a.twitter-follow-button":d,"blockquote.twitter-tweet":f,"a.twitter-timeline":g,body:h}},o=twttr.events&&twttr.events.hub?twttr.events:{},p;i.init(),n.assetUrl=q,twttr.widgets=twttr.widgets||{},k.aug(twttr.widgets,{config:{assetUrl:q},load:function(a){c.init(n),c.embed(a),twttr.widgets.loaded=!0},createShareButton:function(a,b,c,d){if(!a||!b)return c&&c(!1);d=k.aug({},d||{},{url:a,targetEl:b}),(new e(d)).render(n,c)},createHashtagButton:function(a,b,c,d){if(!a||!b)return d&&d(!1);c=k.aug({},c||{},{hashtag:a,targetEl:b,type:"hashtag"}),(new e(c)).render(n,d)},createMentionButton:function(a,b,c,d){if(!a||!b)return c&&c(!1);d=k.aug({},d||{},{screenName:a,targetEl:b,type:"mention"}),(new e(d)).render(n,c)},createFollowButton:function(a,b,c,e){if(!a||!b)return c&&c(!1);e=k.aug({},e||{},{screenName:a,targetEl:b}),(new d(e)).render(n,c)},createTweet:function(a,b,c,d){if(!a||!b)return c&&c(!1);d=k.aug({},d||{},{tweetId:a,targetEl:b}),(new f(d)).render(n,c),f.fetchAndRender()},createTimeline:function(a,b,c,d){if(!a||!b)return c&&c(!1);d=k.aug({},d||{},{widgetId:a,targetEl:b}),(new g(d)).render(n,c)}}),k.aug(twttr.events,o,j.Emitter),p=twttr.events.bind,twttr.events.bind=function(a,b){r(),this.bind=p,this.bind(a,b)};for(l=0;m=b[l];l++)twttr.events.bind(m[0],m[1]);for(l=0;m=twttr._e[l];l++)m(twttr);twttr.ready=function(a){a(twttr)},/twitter\.com(\:\d+)?$/.test(document.location.host)&&(twttr.widgets.createTimelinePreview=function(a,b,c){if(!n||!b)return c&&c(!1);(new g({previewParams:a,targetEl:b,linkColor:a.link_color,theme:a.theme,height:a.height})).render(n,c)}),twttr.widgets.createTweetEmbed=twttr.widgets.createTweet,twttr.widgets.load()})})})}()});