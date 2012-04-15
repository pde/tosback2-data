// ColorBox v1.3.17.2 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(a,b,c){function bc(b){if(!U){P=b,_(),y=a(P),Q=0,K.rel!=="nofollow"&&(y=a("."+g).filter(function(){var b=a.data(this,e).rel||this.rel;return b===K.rel}),Q=y.index(P),Q===-1&&(y=y.add(P),Q=y.length-1));if(!S){S=T=!0,r.show();if(K.returnFocus)try{P.blur(),a(P).one(l,function(){try{this.focus()}catch(a){}})}catch(c){}q.css({opacity:+K.opacity,cursor:K.overlayClose?"pointer":"auto"}).show(),K.w=Z(K.initialWidth,"x"),K.h=Z(K.initialHeight,"y"),X.position(),o&&z.bind("resize."+p+" scroll."+p,function(){q.css({width:z.width(),height:z.height(),top:z.scrollTop(),left:z.scrollLeft()})}).trigger("resize."+p),ba(h,K.onOpen),J.add(D).hide(),I.html(K.close).show()}X.load(!0)}}function bb(){var a,b=f+"Slideshow_",c="click."+f,d,e,g;K.slideshow&&y[1]?(d=function(){F.text(K.slideshowStop).unbind(c).bind(j,function(){if(Q<y.length-1||K.loop)a=setTimeout(X.next,K.slideshowSpeed)}).bind(i,function(){clearTimeout(a)}).one(c+" "+k,e),r.removeClass(b+"off").addClass(b+"on"),a=setTimeout(X.next,K.slideshowSpeed)},e=function(){clearTimeout(a),F.text(K.slideshowStart).unbind([j,i,k,c].join(" ")).one(c,d),r.removeClass(b+"on").addClass(b+"off")},K.slideshowAuto?d():e()):r.removeClass(b+"off "+b+"on")}function ba(b,c){c&&c.call(P),a.event.trigger(b)}function _(b){K=a.extend({},a.data(P,e));for(b in K)a.isFunction(K[b])&&b.substring(0,2)!=="on"&&(K[b]=K[b].call(P));K.rel=K.rel||P.rel||"nofollow",K.href=K.href||a(P).attr("href"),K.title=K.title||P.title,typeof K.href=="string"&&(K.href=a.trim(K.href))}function $(a){return K.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(a)}function Z(a,b){return Math.round((/%/.test(a)?(b==="x"?z.width():z.height())/100:1)*parseInt(a,10))}function Y(c,d,e){e=b.createElement("div"),c&&(e.id=f+c),e.style.cssText=d||"";return a(e)}var d={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:!1,returnFocus:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:!1},e="colorbox",f="cbox",g=f+"Element",h=f+"_open",i=f+"_load",j=f+"_complete",k=f+"_cleanup",l=f+"_closed",m=f+"_purge",n=a.browser.msie&&!a.support.opacity,o=n&&a.browser.version<7,p=f+"_IE6",q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X;X=a.fn[e]=a[e]=function(b,c){var f=this;b=b||{};if(!f[0]){if(f.selector)return f;f=a("<a/>"),b.open=!0}c&&(b.onComplete=c),f.each(function(){a.data(this,e,a.extend({},a.data(this,e)||d,b)),a(this).addClass(g)}),(a.isFunction(b.open)&&b.open.call(f)||b.open)&&bc(f[0]);return f},X.init=function(){z=a(c),r=Y().attr({id:e,"class":n?f+(o?"IE6":"IE"):""}),q=Y("Overlay",o?"position:absolute":"").hide(),s=Y("Wrapper"),t=Y("Content").append(A=Y("LoadedContent","width:0; height:0; overflow:hidden"),C=Y("LoadingOverlay").add(Y("LoadingGraphic")),D=Y("Title"),E=Y("Current"),G=Y("Next"),H=Y("Previous"),F=Y("Slideshow").bind(h,bb),I=Y("Close")),s.append(Y().append(Y("TopLeft"),u=Y("TopCenter"),Y("TopRight")),Y(!1,"clear:left").append(v=Y("MiddleLeft"),t,w=Y("MiddleRight")),Y(!1,"clear:left").append(Y("BottomLeft"),x=Y("BottomCenter"),Y("BottomRight"))).children().children().css({"float":"left"}),B=Y(!1,"position:absolute; width:9999px; visibility:hidden; display:none"),a("body").prepend(q,r.append(s,B)),t.children().hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")}).addClass("hover"),L=u.height()+x.height()+t.outerHeight(!0)-t.height(),M=v.width()+w.width()+t.outerWidth(!0)-t.width(),N=A.outerHeight(!0),O=A.outerWidth(!0),r.css({"padding-bottom":L,"padding-right":M}).hide(),G.click(function(){X.next()}),H.click(function(){X.prev()}),I.click(function(){X.close()}),J=G.add(H).add(E).add(F),t.children().removeClass("hover"),q.click(function(){K.overlayClose&&X.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;S&&K.escKey&&b===27&&(a.preventDefault(),X.close()),S&&K.arrowKey&&y[1]&&(b===37?(a.preventDefault(),H.click()):b===39&&(a.preventDefault(),G.click()))})},X.remove=function(){r.add(q).remove(),a("."+g).removeData(e).removeClass(g)},X.position=function(a,c){function g(a){u[0].style.width=x[0].style.width=t[0].style.width=a.style.width,C[0].style.height=C[1].style.height=t[0].style.height=v[0].style.height=w[0].style.height=a.style.height}var d=0,e=0;z.unbind("resize."+f),r.hide(),K.fixed&&!o?r.css({position:"fixed"}):(d=z.scrollTop(),e=z.scrollLeft(),r.css({position:"absolute"})),K.right!==!1?e+=Math.max(z.width()-K.w-O-M-Z(K.right,"x"),0):K.left!==!1?e+=Z(K.left,"x"):e+=Math.round(Math.max(z.width()-K.w-O-M,0)/2),K.bottom!==!1?d+=Math.max(b.documentElement.clientHeight-K.h-N-L-Z(K.bottom,"y"),0):K.top!==!1?d+=Z(K.top,"y"):d+=Math.round(Math.max(b.documentElement.clientHeight-K.h-N-L,0)/2),r.show(),a=r.width()===K.w+O&&r.height()===K.h+N?0:a||0,s[0].style.width=s[0].style.height="9999px",r.dequeue().animate({width:K.w+O,height:K.h+N,top:d,left:e},{duration:a,complete:function(){g(this),T=!1,s[0].style.width=K.w+O+M+"px",s[0].style.height=K.h+N+L+"px",c&&c(),setTimeout(function(){z.bind("resize."+f,X.position)},1)},step:function(){g(this)}})},X.resize=function(a){if(S){a=a||{},a.width&&(K.w=Z(a.width,"x")-O-M),a.innerWidth&&(K.w=Z(a.innerWidth,"x")),A.css({width:K.w}),a.height&&(K.h=Z(a.height,"y")-N-L),a.innerHeight&&(K.h=Z(a.innerHeight,"y"));if(!a.innerHeight&&!a.height){var b=A.wrapInner("<div style='overflow:auto'></div>").children();K.h=b.height(),b.replaceWith(b.children())}A.css({height:K.h}),X.position(K.transition==="none"?0:K.speed)}},X.prep=function(b){function h(){K.h=K.h||A.height(),K.h=K.mh&&K.mh<K.h?K.mh:K.h;return K.h}function g(){K.w=K.w||A.width(),K.w=K.mw&&K.mw<K.w?K.mw:K.w;return K.w}if(!!S){var c,d=K.transition==="none"?0:K.speed;A.remove(),A=Y("LoadedContent").append(b),A.hide().appendTo(B.show()).css({width:g(),overflow:K.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(t),B.hide(),a(R).css({"float":"none"}),o&&a("select").not(r.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(k,function(){this.style.visibility="inherit"}),c=function(){function o(){n&&r[0].style.removeAttribute("filter")}var b,c,g,h,i=y.length,k,l;!S||(l=function(){clearTimeout(W),C.hide(),ba(j,K.onComplete)},n&&R&&A.fadeIn(100),D.html(K.title).add(A).show(),i>1?(typeof K.current=="string"&&E.html(K.current.replace("{current}",Q+1).replace("{total}",i)).show(),G[K.loop||Q<i-1?"show":"hide"]().html(K.next),H[K.loop||Q?"show":"hide"]().html(K.previous),b=Q?y[Q-1]:y[i-1],g=Q<i-1?y[Q+1]:y[0],K.slideshow&&F.show(),K.preloading&&(h=a.data(g,e).href||g.href,c=a.data(b,e).href||b.href,h=a.isFunction(h)?h.call(g):h,c=a.isFunction(c)?c.call(b):c,$(h)&&(a("<img/>")[0].src=h),$(c)&&(a("<img/>")[0].src=c))):J.hide(),K.iframe?(k=a("<iframe/>").addClass(f+"Iframe")[0],K.fastIframe?l():a(k).one("load",l),k.name=f+ +(new Date),k.src=K.href,K.scrolling||(k.scrolling="no"),n&&(k.frameBorder=0,k.allowTransparency="true"),a(k).appendTo(A).one(m,function(){k.src="//about:blank"})):l(),K.transition==="fade"?r.fadeTo(d,1,o):o())},K.transition==="fade"?r.fadeTo(d,0,function(){X.position(0,c)}):X.position(d,c)}},X.load=function(b){var c,d,e=X.prep;T=!0,R=!1,P=y[Q],b||_(),ba(m),ba(i,K.onLoad),K.h=K.height?Z(K.height,"y")-N-L:K.innerHeight&&Z(K.innerHeight,"y"),K.w=K.width?Z(K.width,"x")-O-M:K.innerWidth&&Z(K.innerWidth,"x"),K.mw=K.w,K.mh=K.h,K.maxWidth&&(K.mw=Z(K.maxWidth,"x")-O-M,K.mw=K.w&&K.w<K.mw?K.w:K.mw),K.maxHeight&&(K.mh=Z(K.maxHeight,"y")-N-L,K.mh=K.h&&K.h<K.mh?K.h:K.mh),c=K.href,W=setTimeout(function(){C.show()},100),K.inline?(Y().hide().insertBefore(a(c)[0]).one(m,function(){a(this).replaceWith(A.children())}),e(a(c))):K.iframe?e(" "):K.html?e(K.html):$(c)?(a(R=new Image).addClass(f+"Photo").error(function(){K.title=!1,e(Y("Error").text("This image could not be loaded"))}).load(function(){var a;R.onload=null,K.scalePhotos&&(d=function(){R.height-=R.height*a,R.width-=R.width*a},K.mw&&R.width>K.mw&&(a=(R.width-K.mw)/R.width,d()),K.mh&&R.height>K.mh&&(a=(R.height-K.mh)/R.height,d())),K.h&&(R.style.marginTop=Math.max(K.h-R.height,0)/2+"px"),y[1]&&(Q<y.length-1||K.loop)&&(R.style.cursor="pointer",R.onclick=function(){X.next()}),n&&(R.style.msInterpolationMode="bicubic"),setTimeout(function(){e(R)},1)}),setTimeout(function(){R.src=c},1)):c&&B.load(c,K.data,function(b,c,d){e(c==="error"?Y("Error").text("Request unsuccessful: "+d.statusText):a(this).contents())})},X.next=function(){!T&&y[1]&&(Q<y.length-1||K.loop)&&(Q=Q<y.length-1?Q+1:0,X.load())},X.prev=function(){!T&&y[1]&&(Q||K.loop)&&(Q=Q?Q-1:y.length-1,X.load())},X.close=function(){S&&!U&&(U=!0,S=!1,ba(k,K.onCleanup),z.unbind("."+f+" ."+p),q.fadeTo(200,0),r.stop().fadeTo(300,0,function(){r.add(q).css({opacity:1,cursor:"auto"}).hide(),ba(m),A.remove(),setTimeout(function(){U=!1,ba(l,K.onClosed)},1)}))},X.element=function(){return a(P)},X.settings=d,V=function(a){a.button!==0&&typeof a.button!="undefined"||a.ctrlKey||a.shiftKey||a.altKey||(a.preventDefault(),bc(this))},a.fn.delegate?a(b).delegate("."+g,"click",V):a("."+g).live("click",V),a(X.init)})(jQuery,document,this);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $('a, area, input', context)
      .filter('.colorbox')
      .once('init-colorbox-processed')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxStockholmsyndromeStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_open', function () {
      // Hide close button initially.
      $('#cboxClose', context).css('opacity', 0);
    });
    $(document).bind('cbox_load', function () {
      // Hide close button. (It doesn't handle the load animation well.)
      $('#cboxClose', context).css('opacity', 0);
    });
    $(document).bind('cbox_complete', function () {
      // Show close button with a delay.
      $('#cboxClose', context).fadeTo('fast', 0, function () {$(this).css('opacity', 1)});
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('a, area, input', context)
      .filter('.colorbox-load')
      .once('init-colorbox-load-processed', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('a, area, input', context).filter('.colorbox-inline').once('init-colorbox-inline-processed').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */
var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());;
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright (c) Mark Simonson, 2005. All rights reserved.
 */
Cufon.registerFont({"w":91,"face":{"font-family":"Proxima Nova Bold","font-weight":700,"font-stretch":"normal","units-per-em":"360","panose-1":"2 0 8 3 9 0 0 2 0 3","ascent":"288","descent":"-72","x-height":"4","bbox":"-37 -276 330 72","underline-thickness":"7.2","underline-position":"-40.68","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":92},"\u00a0":{"w":92},"!":{"d":"26,-78r-8,-162r55,0r-7,162r-40,0xm46,-54v30,-4,40,45,11,55v-20,7,-39,-7,-40,-26v0,-15,13,-30,29,-29"},"\"":{"d":"41,-244v47,6,11,73,10,109r-20,0r-15,-84v-1,-14,11,-27,25,-25xm106,-244v47,6,11,73,10,109r-20,0r-15,-84v-1,-14,11,-27,25,-25","w":146,"k":{"s":11,"J":38,"G":3,"A":35,".":30,",":30}},"#":{"d":"88,0r21,-61r-34,0r-21,61r-34,0r21,-61r-35,0r9,-29r36,0r19,-60r-35,0r9,-29r36,0r20,-61r34,0r-20,61r34,0r20,-61r34,0r-21,61r35,0r-8,29r-36,0r-20,60r36,0r-9,29r-37,0r-20,61r-34,0xm138,-150r-34,0r-19,60r33,0","w":222},"$":{"d":"209,-73v-1,49,-33,72,-79,77r0,32r-34,0r0,-32v-37,-3,-64,-18,-85,-38r28,-40v13,14,34,28,57,31r0,-56v-39,-9,-77,-24,-77,-72v0,-46,34,-66,77,-72r0,-33r34,0r0,34v30,3,54,14,73,32r-28,38v-11,-11,-28,-19,-45,-23r0,49v38,11,80,24,79,73xm130,-42v21,-1,37,-27,19,-40v-5,-3,-11,-5,-19,-8r0,48xm96,-198v-19,1,-34,23,-18,36v5,3,11,6,18,8r0,-44","w":221},"%":{"d":"131,-184v0,38,-24,60,-61,60v-37,0,-61,-23,-61,-60v0,-36,24,-60,61,-60v37,0,61,22,61,60xm47,0r153,-240r28,0r-154,240r-27,0xm264,-55v0,36,-24,59,-62,59v-38,0,-61,-24,-61,-59v0,-37,24,-61,61,-61v38,0,62,24,62,61xm42,-184v0,18,11,32,28,32v17,0,29,-14,29,-32v0,-19,-12,-32,-29,-32v-17,0,-28,14,-28,32xm174,-55v0,18,11,31,28,31v18,0,29,-13,29,-31v0,-19,-11,-32,-29,-32v-18,0,-28,14,-28,32","w":272},"&":{"d":"217,-106v-8,20,-21,40,-34,57r47,49r-59,0r-18,-18v-43,37,-148,28,-144,-47v2,-39,26,-55,51,-70v-31,-45,-10,-114,53,-109v34,3,63,16,63,51v0,40,-31,53,-59,66r41,51v9,-14,18,-30,22,-47xm78,-106v-30,14,-27,77,16,74v14,0,26,-5,35,-12xm115,-211v-30,-1,-29,38,-15,58v16,-8,36,-15,36,-37v0,-12,-9,-21,-21,-21","w":232,"k":{"Y":29,"W":12,"V":18,"T":24}},"'":{"d":"41,-244v47,6,11,73,10,109r-20,0r-15,-84v-1,-14,11,-27,25,-25","w":81,"k":{"s":11,"J":38,"A":35,".":30,",":30}},"(":{"d":"100,-225v-46,68,-47,207,0,274r-28,23v-60,-57,-77,-205,-24,-285v7,-12,15,-24,24,-34","w":106,"k":{"j":-40}},")":{"d":"35,-247v60,57,78,205,24,285v-7,12,-15,24,-24,34r-29,-23v48,-66,48,-208,0,-274","w":107},"*":{"d":"52,-132r2,-39r-33,21r-12,-20r35,-18r-35,-18r12,-19r33,21r-2,-40r23,0r-2,40r33,-21r11,19r-35,18r35,18r-11,20r-33,-21r2,39r-23,0","w":126,"k":{"J":44,"A":33}},"+":{"d":"107,-107r0,73r-32,0r0,-73r-65,0r0,-29r65,0r0,-70r32,0r0,70r64,0r0,29r-64,0","w":181},",":{"d":"45,-54v35,0,40,48,22,74v-7,12,-16,21,-27,29r-19,-16v12,-7,23,-19,27,-34v-17,5,-31,-8,-31,-25v0,-15,13,-28,28,-28","k":{"y":19,"w":13,"v":23,"t":10,"j":-14,"f":10,"Y":32,"W":23,"V":30,"U":11,"T":35,"7":26,"6":8,"1":36,"0":8,"'":30,"\"":30}},"-":{"d":"11,-68r0,-39r86,0r0,39r-86,0","w":108,"k":{"Y":43,"X":17,"W":13,"V":21}},".":{"d":"75,-25v0,16,-14,29,-29,29v-15,0,-29,-14,-29,-29v0,-15,13,-29,29,-29v16,0,29,13,29,29","w":92,"k":{"y":19,"w":13,"v":23,"t":10,"j":-14,"f":10,"Y":32,"W":23,"V":30,"U":11,"T":35,"7":26,"6":8,"1":36,"0":8,"'":30,"\"":30}},"\/":{"d":"0,7r85,-254r33,0r-85,254r-33,0","w":118},"0":{"d":"211,-120v0,69,-29,124,-99,124v-71,0,-100,-55,-100,-124v0,-69,30,-124,100,-124v69,0,99,55,99,124xm64,-120v0,40,8,79,48,79v39,0,47,-39,47,-79v0,-39,-8,-78,-47,-78v-40,0,-48,38,-48,78","w":223,"k":{".":8,",":8}},"1":{"d":"73,0r0,-174r-40,40r-29,-30r76,-76r44,0r0,240r-51,0","w":147},"2":{"d":"144,-167v-4,-51,-87,-30,-103,-4r-29,-33v41,-58,189,-55,184,37v-3,64,-55,88,-96,122r98,0r0,45r-181,0r0,-40v39,-35,90,-63,121,-105v4,-7,6,-15,6,-22","w":216},"3":{"d":"197,-66v0,89,-152,85,-190,32r27,-34v19,28,108,46,111,-4v2,-33,-42,-26,-78,-27r0,-46v31,1,74,6,75,-25v-8,-43,-83,-32,-106,-4r-26,-32v35,-50,183,-59,183,27v0,33,-24,50,-53,55v31,5,57,23,57,58","w":211},"4":{"d":"124,0r0,-50r-115,0r0,-40r95,-150r71,0r0,145r31,0r0,45r-31,0r0,50r-51,0xm124,-195r-65,100r65,0r0,-100","w":214},"5":{"d":"206,-79v0,96,-142,104,-188,47r28,-35v21,28,106,43,108,-10v2,-46,-74,-42,-93,-16r-36,-10r0,-137r165,0r0,45r-114,0r0,59v42,-42,130,-15,130,57","w":218},"6":{"d":"208,-78v-4,53,-37,82,-92,82v-73,0,-100,-51,-104,-124v-6,-103,105,-158,183,-99r-23,39v-13,-11,-24,-18,-48,-18v-41,2,-59,30,-60,73v34,-54,150,-32,144,47xm64,-90v-5,54,86,68,92,14v0,-48,-74,-42,-92,-14","w":218},"7":{"d":"44,0r86,-195r-121,0r0,-45r180,0r0,36r-89,204r-56,0","w":196,"k":{".":34,",":34}},"8":{"d":"206,-62v0,90,-193,90,-193,0v0,-35,25,-51,51,-62v-26,-8,-47,-23,-47,-56v2,-88,185,-85,185,0v0,32,-23,47,-48,56v26,11,52,27,52,62xm149,-172v0,-36,-80,-35,-81,0v6,35,76,37,81,0xm64,-69v3,38,87,38,90,0v-6,-41,-84,-41,-90,0","w":218},"9":{"d":"207,-120v6,103,-106,158,-183,99r23,-39v37,39,118,12,108,-54v-36,52,-151,32,-144,-48v5,-52,37,-82,92,-82v73,0,100,51,104,124xm63,-163v1,46,74,43,91,13v6,-55,-87,-67,-91,-13","w":218,"k":{".":8,",":8}},":":{"d":"75,-147v0,16,-14,29,-29,29v-15,0,-29,-14,-29,-29v0,-15,13,-29,29,-29v16,0,29,13,29,29xm75,-25v0,16,-14,29,-29,29v-15,0,-29,-14,-29,-29v0,-15,13,-29,29,-29v16,0,29,13,29,29","w":88,"k":{"Y":25,"T":18}},";":{"d":"75,-148v0,16,-14,30,-29,30v-15,0,-29,-15,-29,-30v0,-15,14,-28,29,-28v15,0,29,13,29,28xm45,-56v34,0,40,48,22,75v-7,12,-16,21,-27,29r-19,-16v12,-7,23,-19,27,-34v-17,5,-31,-8,-31,-25v0,-15,14,-29,28,-29","k":{"Y":25,"T":18}},"<":{"d":"10,-104r0,-33r161,-72r0,34r-128,55r128,54r0,34","w":181},"=":{"d":"10,-140r0,-28r161,0r0,28r-161,0xm10,-72r0,-28r161,0r0,28r-161,0","w":181},">":{"d":"10,-32r0,-34r128,-54r-128,-55r0,-34r161,72r0,33","w":181},"?":{"d":"105,-178v-4,-34,-62,-19,-73,2r-29,-33v34,-57,182,-44,149,45v-11,30,-71,40,-48,79r-40,12v-23,-23,-8,-66,15,-75v9,-8,28,-15,26,-30xm111,-25v0,15,-15,29,-30,29v-15,0,-29,-14,-29,-29v0,-15,13,-29,29,-29v16,0,30,14,30,29","w":164},"@":{"d":"202,3v-20,12,-46,22,-75,22v-70,0,-114,-43,-114,-113v0,-85,60,-142,143,-142v68,0,113,42,113,110v0,51,-24,86,-71,89v-21,1,-33,-12,-36,-28v-10,15,-28,28,-51,28v-37,-1,-56,-22,-56,-60v0,-68,86,-118,126,-64r4,-19r41,0r-20,96v-1,10,6,16,14,16v26,0,33,-28,33,-58v0,-60,-38,-96,-99,-96v-74,0,-123,52,-127,127v-5,87,100,126,167,81xm97,-95v0,43,63,38,69,8r9,-42v-19,-36,-78,-10,-78,34","w":281},"A":{"d":"190,0r-15,-41r-103,0r-15,41r-58,0r92,-240r64,0r93,240r-58,0xm123,-189r-37,103r75,0","w":246,"k":{"y":7,"w":5,"v":7,"u":5,"t":8,"f":7,"Y":24,"W":16,"V":17,"U":12,"T":23,"S":3,"Q":12,"O":12,"J":-7,"G":12,"C":12,"?":27,"*":33,"'":34,"\"":34}},"B":{"d":"178,-124v71,17,54,124,-24,124r-130,0r0,-240v80,5,195,-24,195,61v0,30,-16,49,-41,55xm167,-170v0,-36,-56,-23,-92,-25r0,50v36,-3,92,12,92,-25xm172,-72v0,-40,-59,-25,-97,-28r0,55v38,-3,97,14,97,-27","w":238,"k":{"Y":11,"W":4,"V":6,"T":5,"'":4,"\"":4}},"C":{"d":"65,-120v-7,79,104,104,132,44r43,21v-18,33,-48,59,-100,59v-77,0,-123,-47,-128,-124v-8,-124,177,-167,228,-65r-43,21v-9,-18,-31,-35,-57,-35v-47,2,-71,31,-75,79","w":247,"k":{"Y":8,"W":3,"A":3,"?":3}},"D":{"d":"246,-120v-1,77,-50,120,-127,120r-95,0r0,-240v120,-8,224,7,222,120xm194,-120v0,-64,-49,-81,-119,-75r0,150v70,6,118,-12,119,-75","w":258,"k":{"Z":5,"Y":14,"X":11,"W":7,"V":7,"T":9,"J":7,"A":12,"?":8,".":9,",":9,"'":4,"\"":4}},"E":{"d":"24,0r0,-240r170,0r0,45r-119,0r0,50r116,0r0,45r-116,0r0,55r119,0r0,45r-170,0","w":209},"F":{"d":"24,0r0,-240r170,0r0,45r-119,0r0,50r116,0r0,45r-116,0r0,100r-51,0","w":205,"k":{"J":25,"A":15,".":18,",":18,"&":5}},"G":{"d":"242,-41v-22,26,-55,46,-102,45v-78,-2,-122,-47,-128,-124v-9,-123,172,-166,227,-70r-42,23v-11,-16,-32,-32,-57,-32v-47,0,-72,31,-75,79v-5,70,80,100,126,61r0,-29r-63,0r0,-45r114,0r0,92","w":259,"k":{"Y":7,"V":5,"?":5}},"H":{"d":"188,0r0,-101r-113,0r0,101r-51,0r0,-240r51,0r0,94r113,0r0,-94r52,0r0,240r-52,0","w":263},"I":{"d":"24,0r0,-240r51,0r0,240r-51,0","w":98},"J":{"d":"152,-79v8,81,-98,106,-150,60r22,-39v20,26,76,22,76,-22r0,-160r52,0r0,161","w":174,"k":{"J":9,"A":12,".":11,",":11}},"K":{"d":"166,0r-72,-96r-19,22r0,74r-51,0r0,-240r51,0r0,107r85,-107r63,0r-96,113r102,127r-63,0","w":228,"k":{"y":22,"x":12,"w":14,"v":22,"u":7,"t":18,"q":10,"o":10,"g":10,"f":12,"e":10,"d":10,"c":10,"a":5,"Y":4,"Q":17,"O":17,"G":17,"C":17,"-":18}},"L":{"d":"22,0r0,-240r51,0r0,195r102,0r0,45r-153,0","w":185,"k":{"y":19,"w":12,"v":19,"u":3,"t":13,"q":4,"o":4,"g":4,"e":4,"d":4,"c":4,"a":3,"Y":46,"W":26,"V":32,"U":9,"T":36,"Q":10,"O":10,"G":10,"C":10,"?":39,"*":60,"'":49,"\"":49}},"M":{"d":"233,0r0,-173r-68,173r-22,0r-68,-173r0,173r-51,0r0,-240r71,0r59,150r58,-150r72,0r0,240r-51,0","w":307},"N":{"d":"189,0r-114,-157r0,157r-51,0r0,-240r52,0r112,151r0,-151r51,0r0,240r-50,0","w":262},"O":{"d":"263,-120v0,77,-48,124,-125,124v-78,0,-126,-48,-126,-124v0,-76,48,-124,126,-124v77,0,125,47,125,124xm65,-120v0,47,26,79,73,79v48,0,73,-33,73,-79v0,-46,-25,-79,-73,-79v-47,0,-73,32,-73,79","w":275,"k":{"Z":5,"Y":14,"X":11,"W":7,"V":7,"T":9,"J":7,"A":12,"?":8,".":9,",":9,"'":4,"\"":4}},"P":{"d":"217,-163v0,71,-64,83,-142,77r0,86r-51,0r0,-240r112,0v50,2,81,28,81,77xm165,-163v-1,-39,-50,-32,-90,-32r0,64v40,0,90,8,90,-32","w":225,"k":{"q":6,"o":6,"g":6,"e":6,"d":6,"c":6,"a":7,"Y":3,"X":7,"J":43,"A":27,".":31,"-":10,",":31,"&":12}},"Q":{"d":"194,-8v-88,36,-186,-17,-182,-112v3,-76,48,-124,126,-124v77,0,122,47,125,124v1,37,-13,64,-31,85r17,21r-35,29xm65,-120v-1,55,41,91,98,75r-27,-31r36,-29r26,31v30,-49,4,-128,-60,-125v-47,2,-72,32,-73,79","w":275,"k":{"Z":5,"Y":14,"X":11,"W":7,"V":7,"T":9,"J":7,"A":12,"?":8,".":9,",":9,"'":4,"\"":4}},"R":{"d":"217,-163v-1,39,-22,63,-53,72r55,91r-60,0r-47,-85r-37,0r0,85r-51,0r0,-240v0,0,196,-15,193,77xm165,-163v0,-39,-50,-32,-90,-32r0,65v40,0,90,7,90,-33","w":231,"k":{"s":5,"q":11,"o":11,"g":11,"e":11,"d":11,"c":11,"a":7,"Y":6,"V":4,"T":4}},"S":{"d":"170,-130v70,39,26,134,-61,134v-46,0,-79,-15,-102,-38r28,-40v16,18,43,31,77,33v31,2,57,-29,31,-43v-46,-25,-129,-15,-128,-87v1,-88,137,-90,185,-39r-29,38v-17,-16,-40,-24,-69,-26v-27,-2,-48,26,-24,38v26,14,67,16,92,30","w":216,"k":{"y":5,"x":6,"v":5,"t":5,"Y":4,"T":5,"A":4}},"T":{"d":"79,0r0,-195r-70,0r0,-45r192,0r0,45r-70,0r0,195r-52,0","w":209,"k":{"z":24,"y":10,"x":14,"w":10,"v":10,"u":24,"s":29,"r":24,"q":35,"p":24,"o":35,"n":24,"m":24,"g":35,"f":8,"e":35,"d":35,"c":35,"a":28,"Q":9,"O":9,"J":31,"G":9,"C":9,"A":23,";":18,":":18,".":35,"-":22,",":35,"&":19}},"U":{"d":"240,-96v0,68,-40,100,-108,100v-68,0,-107,-33,-108,-100r0,-144r52,0v8,77,-30,199,56,199v86,0,48,-122,56,-199r52,0r0,144","w":264,"k":{"J":9,"A":12,".":11,",":11}},"V":{"d":"91,0r-92,-240r58,0r66,184r67,-184r58,0r-93,240r-64,0","w":246,"k":{"z":20,"y":5,"x":10,"w":5,"v":6,"u":20,"t":6,"s":18,"r":20,"q":22,"p":20,"o":22,"n":20,"m":20,"g":22,"f":10,"e":22,"d":22,"c":22,"a":24,"Q":7,"O":7,"J":35,"G":7,"C":7,"A":17,".":32,"-":21,",":32,"&":14}},"W":{"d":"207,0r-42,-165r-42,165r-54,0r-69,-240r58,0r42,173r45,-173r40,0r46,173r42,-173r57,0r-68,240r-55,0","w":330,"k":{"z":11,"y":3,"x":10,"u":11,"t":6,"s":11,"r":11,"q":14,"p":11,"o":14,"n":11,"m":11,"g":14,"f":6,"e":14,"d":14,"c":14,"a":14,"Q":7,"O":7,"J":21,"G":7,"C":7,"A":16,".":23,"-":13,",":23,"&":7}},"X":{"d":"180,0r-60,-88r-60,88r-61,0r87,-123r-82,-117r61,0r55,82r55,-82r61,0r-82,117r88,123r-62,0","w":240,"k":{"y":12,"w":13,"v":12,"t":11,"f":11,"Q":11,"O":11,"G":11,"C":11,"-":17}},"Y":{"d":"91,0r0,-98r-92,-142r58,0r59,96r60,-96r58,0r-92,142r0,98r-51,0","w":232,"k":{"z":32,"y":22,"x":28,"w":22,"v":22,"u":32,"t":12,"s":36,"r":32,"q":45,"p":32,"o":45,"n":32,"m":32,"g":45,"f":22,"e":45,"d":45,"c":45,"a":40,"S":7,"Q":14,"O":14,"J":42,"G":14,"C":14,"A":24,";":25,":":25,".":32,"-":44,",":32,"&":22}},"Z":{"d":"15,0r0,-41r114,-154r-114,0r0,-45r180,0r0,41r-113,154r116,0r0,45r-183,0","w":213,"k":{"Q":5,"O":5,"G":5,"C":5}},"[":{"d":"17,68r0,-312r78,0r0,31r-45,0r0,251r45,0r0,30r-78,0","w":100,"k":{"j":-40}},"\\":{"d":"0,-247r33,0r85,254r-33,0","w":118},"]":{"d":"6,68r0,-30r45,0r0,-251r-45,0r0,-31r78,0r0,312r-78,0","w":100},"^":{"d":"118,-120r-39,-89r-38,89r-34,0r56,-120r33,0r56,120r-34,0","w":158},"_":{"d":"-1,45r0,-31r205,0r0,31r-205,0","w":203},"`":{"d":"58,-200r-58,-52r42,0r48,52r-32,0","w":90},"a":{"d":"21,-151v39,-41,152,-42,152,39r0,112r-46,0r0,-18v-29,36,-115,27,-115,-35v0,-62,86,-70,115,-35v12,-60,-57,-63,-88,-31xm58,-53v0,34,57,32,69,11v5,-29,-15,-36,-37,-37v-17,-1,-32,10,-32,26","w":195,"k":{"Y":40,"W":17,"V":26,"T":34,"?":15,"'":5,"\"":5}},"b":{"d":"152,-87v6,-52,-62,-66,-84,-30r0,61v23,34,90,21,84,-31xm199,-87v7,80,-86,119,-131,65r0,22r-45,0r0,-240r45,0r0,88v12,-16,29,-26,54,-26v52,0,73,38,77,91","w":210,"k":{"x":12,"Y":42,"W":14,"V":22,"T":35,"?":19,"'":4,"\"":4}},"c":{"d":"172,-27v-14,18,-34,32,-68,31v-57,-2,-88,-34,-92,-91v-6,-87,112,-119,160,-60r-29,28v-23,-36,-90,-16,-84,32v-6,48,62,68,84,32","w":179,"k":{"Y":24,"W":10,"V":15,"T":26,"?":10,"'":3,"\"":3}},"d":{"d":"12,-87v-7,-80,87,-120,130,-65r0,-88r46,0r0,240r-46,0r0,-22v-13,15,-29,26,-53,26v-52,0,-72,-36,-77,-91xm59,-87v-6,51,61,66,83,31r0,-62v-22,-34,-90,-20,-83,31","w":210},"e":{"d":"59,-72v3,41,71,50,97,22r20,30v-16,15,-43,24,-72,24v-57,0,-92,-34,-92,-91v0,-56,34,-91,90,-91v60,0,88,43,87,106r-130,0xm145,-104v-1,-47,-86,-48,-86,0r86,0","w":199,"k":{"Y":40,"W":14,"V":21,"T":33,"?":15,"*":5,"'":3,"\"":3}},"f":{"d":"120,-199v-17,-15,-47,-5,-41,25r35,0r0,40r-35,0r0,134r-46,0r0,-134r-29,0r0,-40r29,0v-10,-63,62,-90,104,-53","w":117,"k":{"}":-24,"]":-24,"Z":-14,"Y":-23,"X":-14,"W":-24,"V":-24,"U":-14,"T":-14,"S":-10,"R":-14,"P":-14,"N":-14,"M":-14,"L":-14,"K":-14,"I":-14,"H":-14,"F":-14,"E":-14,"D":-14,"B":-14,"?":-19,".":17,",":17,"*":-23,")":-24,"'":-23,"&":3,"\"":-23,"!":-14}},"g":{"d":"188,-12v7,89,-116,104,-169,57r21,-33v29,35,118,29,102,-40v-12,15,-29,27,-54,27v-50,0,-76,-35,-76,-89v0,-80,89,-115,130,-62r0,-22r46,0r0,162xm59,-90v-6,51,62,61,83,28r0,-56v-21,-33,-89,-22,-83,28","w":210,"k":{"j":-19,"Y":32,"W":11,"V":20,"T":24,"?":10}},"h":{"d":"69,-152v25,-36,117,-40,117,29r0,123r-46,0r0,-106v5,-45,-59,-35,-71,-11r0,117r-46,0r0,-240r46,0r0,88","w":208,"k":{"Y":40,"W":17,"V":26,"T":34,"?":15,"'":5,"\"":5}},"i":{"d":"73,-220v0,16,-12,27,-28,27v-14,0,-27,-12,-27,-27v0,-15,13,-27,27,-27v16,0,28,11,28,27xm23,0r0,-174r45,0r0,174r-45,0"},"j":{"d":"73,-220v0,16,-12,27,-28,27v-14,0,-27,-12,-27,-27v0,-15,13,-27,27,-27v16,0,28,11,28,27xm68,5v7,58,-61,84,-105,53r13,-34v14,16,47,10,47,-19r0,-179r45,0r0,179"},"k":{"d":"135,0r-46,-67r-21,22r0,45r-45,0r0,-240r45,0r0,144r66,-78r56,0r-68,79r71,95r-58,0","w":192,"k":{"q":3,"o":3,"g":3,"e":3,"d":3,"c":3,"Y":26,"W":10,"V":10,"T":16,"-":9}},"l":{"d":"23,0r0,-240r45,0r0,240r-45,0"},"m":{"d":"233,-178v78,0,44,109,51,178r-46,0r0,-110v3,-40,-52,-30,-62,-7r0,117r-46,0r0,-110v3,-40,-52,-30,-62,-7r0,117r-45,0r0,-174r45,0r0,22v19,-29,96,-40,106,5v12,-17,30,-31,59,-31","w":307,"k":{"Y":40,"W":17,"V":26,"T":34,"?":15,"'":5,"\"":5}},"n":{"d":"68,-152v25,-36,118,-39,118,29r0,123r-46,0v-7,-50,22,-136,-32,-138v-18,0,-32,11,-40,21r0,117r-45,0r0,-174r45,0r0,22","w":208,"k":{"Y":40,"W":17,"V":26,"T":34,"?":15,"'":5,"\"":5}},"o":{"d":"195,-87v0,56,-35,91,-92,91v-57,0,-91,-35,-91,-91v0,-56,34,-91,91,-91v57,0,92,35,92,91xm59,-87v0,29,14,51,44,51v30,0,45,-22,45,-51v0,-30,-17,-51,-45,-51v-28,0,-44,22,-44,51","w":207,"k":{"x":12,"Y":42,"W":14,"V":22,"T":35,"?":19,"'":4,"\"":4}},"p":{"d":"199,-87v0,53,-25,91,-77,91v-25,0,-42,-10,-54,-26r0,88r-45,0r0,-240r45,0r0,22v13,-14,29,-26,54,-26v52,2,77,38,77,91xm68,-57v21,36,91,22,84,-30v6,-51,-61,-66,-84,-31r0,61","w":209,"k":{"x":12,"Y":42,"W":14,"V":22,"T":35,"?":19,"'":4,"\"":4}},"q":{"d":"58,-87v-5,50,62,67,83,30r0,-61v-22,-35,-89,-19,-83,31xm141,-22v-12,16,-28,26,-53,26v-52,0,-77,-38,-77,-91v0,-53,25,-89,77,-91v24,0,41,12,53,26r0,-22r47,0r0,240r-47,0r0,-88","w":209,"k":{"j":-19,"Y":32,"W":11,"V":20,"T":24,"?":10}},"r":{"d":"124,-134v-23,-4,-46,6,-56,19r0,115r-45,0r0,-174r45,0r0,24v11,-14,32,-28,56,-28r0,44","w":129,"k":{"Y":18,"X":7,"W":5,"V":10,"T":12,".":31,",":31}},"s":{"d":"134,-96v54,31,19,100,-49,100v-31,0,-61,-12,-77,-27r19,-33v14,13,34,22,60,24v23,2,42,-20,22,-29v-35,-16,-95,-8,-95,-62v0,-67,106,-67,141,-31r-19,32v-10,-11,-30,-20,-51,-20v-18,0,-38,17,-20,26v19,9,50,9,69,20","w":171,"k":{"Y":35,"W":18,"V":17,"T":27,"?":17,"'":7,"\"":7}},"t":{"d":"119,-7v-27,22,-87,12,-87,-37r0,-90r-29,0r0,-40r29,0r0,-47r46,0r0,47r35,0r0,40r-35,0r0,78v-3,19,21,25,31,14","w":121,"k":{"Y":13,"W":6,"V":12,"T":11}},"u":{"d":"68,-68v-4,44,60,36,72,12r0,-118r46,0r0,174r-46,0r0,-22v-24,35,-117,41,-117,-28r0,-124r45,0r0,106","w":208,"k":{"Y":32,"W":11,"V":20,"T":24,"?":10}},"v":{"d":"68,0r-70,-174r49,0r45,121r46,-121r49,0r-70,174r-49,0","w":184,"k":{"Y":22,"X":12,"V":6,"T":10,"A":7,".":23,",":23}},"w":{"d":"175,0r-36,-118r-37,118r-49,0r-53,-174r48,0r32,117r38,-117r41,0r38,117r32,-117r48,0r-53,174r-49,0","w":277,"k":{"Y":22,"X":13,"V":5,"T":10,"A":5,".":13,",":13}},"x":{"d":"130,0r-39,-59r-40,59r-51,0r62,-89r-58,-85r51,0r36,53r35,-53r51,0r-57,85r61,89r-51,0","w":181,"k":{"q":12,"o":12,"g":12,"e":12,"d":12,"c":12,"Y":28,"W":10,"V":10,"T":14}},"y":{"d":"23,27v24,10,42,-5,45,-25r-70,-176r49,0r45,121r46,-121r49,0r-82,202v-11,35,-45,49,-88,40","w":184,"k":{"Y":22,"X":12,"V":5,"T":10,"A":7,".":19,",":19}},"z":{"d":"15,0r0,-34r79,-100r-79,0r0,-40r141,0r0,33r-80,101r81,0r0,40r-142,0","w":172,"k":{"Y":32,"W":11,"V":20,"T":24,"?":10}},"{":{"d":"37,-88v46,24,-27,140,61,126r0,30v-48,4,-75,-15,-78,-57v-2,-32,12,-83,-19,-86r0,-26v31,-3,17,-54,19,-85v3,-42,30,-63,78,-58r0,31v-25,-3,-45,2,-45,26v0,36,11,88,-16,99","w":103,"k":{"j":-40}},"|":{"d":"24,7r0,-254r30,0r0,254r-30,0","w":77},"}":{"d":"84,-51v0,70,-1,130,-78,119r0,-30v26,3,44,-4,45,-27v2,-36,-10,-86,16,-99v-46,-16,28,-137,-61,-125r0,-31v74,-10,78,46,78,119v0,12,6,24,19,24r0,26v-13,0,-19,12,-19,24","w":103},"~":{"d":"121,-176v20,-7,19,-39,22,-64r31,3v-4,42,-9,86,-53,89v-42,2,-32,-50,-58,-64v-20,7,-19,39,-22,64r-32,-4v-3,-54,42,-120,85,-71v12,13,9,40,27,47","w":183}}});
;
/*!
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Copyright 2005 House Industries/Brand Design Co., Inc. All Rights Reserved.
 * 
 * Trademark:
 * House Holiday Sans is a trademark of House Industries/Brand Design Co., Inc.
 * 
 * Description:
 * Part of the House Holiday collection from House Industries.
 * 
 * Manufacturer:
 * House Industries
 * 
 * Designer:
 * Ken Barber, Laura Meseguer
 * 
 * Vendor URL:
 * http://www.houseindustries.com
 * 
 * License information:
 * http://www.houseindustries.com/license/
 */
Cufon.registerFont({"w":153,"face":{"font-family":"House Holiday TTF Sans","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 0 0 0 0 0 0 0 0 0","ascent":"288","descent":"-72","x-height":"11","cap-height":"6","bbox":"-32 -258 216 69.3215","underline-thickness":"18","underline-position":"-18","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":54},"\u00a0":{"w":54},"!":{"d":"62,-201r3,130v-18,1,-33,1,-51,0r2,-126xm5,-22v0,-20,13,-33,33,-33v20,0,36,15,36,35v0,20,-16,33,-36,33v-20,-1,-33,-14,-33,-35","w":79,"k":{"V":4,"X":4,"8":4,"5":7,"4":4,"1":7,"7":4,"3":7,"2":4,"x":7,"J":4,"T":4,"Y":14,"Z":4,"j":-18}},"\"":{"d":"7,-98r2,-89r35,1r-8,89xm48,-88r7,-92r29,1r1,90","w":92,"k":{"6":2,"X":4,"8":5,"5":4,"4":7,"3":9,"2":4,"v":-4,"w":2,"x":5,"M":2,"J":22,"t":-4,"0":2,"C":2,"G":2,"O":2,"Q":2,"A":14,"a":7,"c":5,"d":5,"e":5,"g":5,"o":5,"q":5,"u":4,"y":4}},"#":{"d":"126,-80r-7,32r-16,0r-4,27v-9,0,-18,-1,-28,-2r5,-26r-22,-1r-3,23r-29,2r5,-25r-19,0r5,-27r18,-1r4,-25r-28,1r4,-30r26,0r2,-28r30,3r-3,25r21,-1r5,-42v10,1,19,2,29,4r-5,37r20,-1r-6,30r-18,0r-4,26xm80,-78r4,-27r-22,1r-4,26r22,0","w":141,"k":{"8":9,"7":4,"6":4,"5":11,"4":11,"3":14,"2":4,"1":4,"0":4,"C":4,"G":4,"O":4,"Q":4}},"$":{"d":"30,-85v-30,-8,-32,-60,1,-68r-4,-32r40,-1r-1,29r28,3v-3,13,-5,28,-9,40v-14,-5,-27,-8,-31,3v14,18,49,21,48,55v-1,22,-16,39,-38,42r2,24r-39,2r4,-25r-23,-4r1,-49v18,6,39,12,46,-2v-3,-9,-17,-12,-25,-17","w":107,"k":{"9":7,"8":5,"7":7,"5":11,"4":4,"3":11,"2":9,"1":11}},"%":{"d":"52,-190v54,0,50,108,-5,108v-26,0,-43,-21,-42,-50v1,-32,17,-58,47,-58xm50,-123v9,0,13,-8,13,-19v0,-10,-4,-17,-12,-17v-10,0,-13,8,-13,19v0,8,4,17,12,17xm203,-46v-1,31,-15,55,-44,55v-26,0,-42,-22,-41,-50v0,-34,16,-58,46,-58v26,0,40,23,39,53xm162,-32v16,0,18,-36,1,-36v-10,0,-15,8,-14,19v1,7,4,17,13,17xm136,-189v8,4,14,8,20,13r-77,183v-11,-4,-21,-10,-31,-16","w":208,"k":{"5":11,"9":7,"1":14,"7":11,"3":4,"2":4}},"&":{"d":"118,-6v-27,37,-117,31,-113,-32v2,-27,17,-48,39,-54v-46,-52,13,-130,80,-86r-13,47v-28,-12,-39,15,-22,35v6,8,12,17,20,25r3,-22v12,1,29,6,38,10v-2,16,-5,29,-11,41r23,19r-28,32xm64,-62v-15,6,-12,37,8,35v7,0,12,-3,17,-7","w":163,"k":{"y":4,"x":7,"w":4,"v":14,"h":4,"X":4,"W":14,"V":14,"E":4,"D":4,"B":4,"9":14,"8":7,"7":14,"5":11,"4":7,"3":7,"2":4,"1":18,"F":4,"H":4,"I":4,"K":4,"L":4,"N":4,"P":4,"R":4,"[":4,"S":4,"T":18,"Y":29,"Z":7,"f":7,"t":7,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"U":5,"c":4,"d":4,"e":4,"g":4,"o":4,"q":4,"s":4,"u":4}},"'":{"d":"45,-186r-5,90r-30,0r-3,-89","w":51,"k":{"6":2,"X":4,"8":5,"5":4,"4":7,"3":9,"2":4,"v":-4,"w":2,"x":5,"M":2,"J":22,"t":-4,"0":2,"C":2,"G":2,"O":2,"Q":2,"A":14,"a":7,"c":5,"d":5,"e":5,"g":5,"o":5,"q":5,"u":4,"y":4}},"(":{"d":"48,30v-54,-49,-54,-175,0,-225r24,18v-39,51,-35,142,0,189","w":73,"k":{"x":9,"w":7,"v":11,"1":7,"f":7,"t":7,"0":4,"6":4,"C":4,"G":4,"O":4,"Q":4,"a":4,"c":11,"d":11,"e":11,"g":11,"o":11,"q":11,"u":7,"y":7,"j":-19}},")":{"d":"2,12v35,-47,39,-138,0,-189v8,-6,16,-13,24,-18v52,49,55,176,0,225","w":73},"*":{"d":"44,-84v-10,-3,-20,-7,-30,-11r16,-28r-28,-2v1,-11,3,-22,6,-34r28,9r-10,-33v13,-1,26,-2,38,-2r-4,29r26,-14r12,36r-27,8r21,17v-6,9,-13,15,-20,22r-21,-27","w":99,"k":{"x":4,"X":4,"M":4,"8":4,"6":4,"5":7,"4":7,"3":7,"J":18,"t":-4,"0":4,"C":4,"G":4,"O":4,"Q":4,"A":18,"a":7,"c":7,"d":7,"e":7,"g":7,"o":7,"q":7,"u":4,"y":4}},"+":{"d":"9,-63r-1,-41r33,4r-1,-39v14,0,27,0,41,1r-3,37r31,-4v0,14,-1,28,-2,42r-30,-3r1,40r-41,-2r5,-39","w":116,"k":{"V":7,"W":7,"X":22,"8":7,"5":7,"4":7,"1":14,"7":11,"3":14,"2":14,"v":4,"x":11,"J":14,"S":7,"T":14,"Y":31,"Z":11,"A":9,"a":11,"z":7}},",":{"d":"41,-49v24,0,36,19,36,42v0,31,-14,55,-43,75v-6,-10,-13,-20,-19,-31v11,-5,18,-11,26,-18v-20,0,-34,-14,-34,-34v0,-17,15,-34,34,-34","w":84,"k":{"y":7,"g":4,"E":7,"V":23,"W":14,"8":7,"5":11,"4":5,"9":29,"1":18,"7":11,"3":4,"v":18,"w":4,"B":4,"T":25,"Y":36,"Z":4,"f":11,"t":11,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"U":7,"c":4,"d":4,"e":4,"o":4,"q":4,"s":4,"j":-16}},"-":{"d":"7,-100r82,0r-2,39r-79,0v-1,-12,-1,-25,-1,-39","w":96},"\u00ad":{"d":"7,-100r82,0r-2,39r-79,0v-1,-12,-1,-25,-1,-39","w":96,"k":{"V":7,"W":7,"X":22,"8":7,"5":7,"4":7,"1":14,"7":11,"3":14,"2":14,"v":4,"x":11,"J":14,"S":7,"T":14,"Y":31,"Z":11,"A":9,"a":11,"z":7}},".":{"d":"75,-20v0,30,-39,43,-59,24v-19,-20,-5,-59,26,-59v20,0,33,16,33,35","w":82,"k":{"y":7,"E":7,"V":23,"W":14,"8":7,"5":11,"4":5,"9":29,"1":18,"7":11,"3":4,"v":18,"w":4,"B":4,"T":25,"Y":36,"Z":4,"f":11,"t":11,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"U":7,"c":4,"d":4,"e":4,"g":4,"o":4,"q":4,"s":4,"j":-16}},"\/":{"d":"75,-203r39,14r-81,200v-11,-3,-21,-7,-31,-11","w":115,"k":{"~":18,"x":25,"w":25,"v":14,"p":14,"_":18,"X":11,"W":4,"M":14,"@":18,"=":7,"<":14,"9":14,"8":18,"7":4,"6":23,"5":14,"4":27,"3":14,"2":14,"1":14,"&":18,"%":11,"D":4,"E":4,"F":4,"H":4,"I":4,"K":4,"L":4,"N":4,"P":4,"R":4,"[":4,"J":40,"S":11,"Y":4,"f":14,"t":14,"0":23,"C":23,"G":23,"O":23,"Q":23,"A":29,"U":11,"a":29,"m":14,"n":14,"r":14,"c":32,"d":32,"e":32,"g":32,"o":32,"q":32,"s":22,"u":22,"y":22,"z":14,"b":4,"h":4,"k":4,"l":4}},"0":{"d":"142,-86v0,55,-18,98,-70,98v-49,0,-66,-44,-66,-95v0,-54,20,-101,71,-101v49,0,65,44,65,98xm78,-44v32,1,33,-83,3,-86v-30,0,-35,84,-3,86","w":148,"k":{"V":5,"W":5,"X":13,"\\":18,"8":7,"5":7,"4":5,"1":7,"?":14,"7":7,"3":13,"2":5,"x":11,"\/":11,"&":4,"_":14,"J":11,"S":4,"T":4,"Y":17,"Z":7,"A":11,"a":9,",":7,".":7,"z":2}},"1":{"d":"25,-107v-10,-11,-17,-23,-25,-35r50,-43r34,5r6,186r-55,2r9,-140","w":97,"k":{"x":7,"V":2,"W":2,"X":4,"\\":7,"5":4,"4":2,"1":4,"?":4,"$":-4,")":-7,"Y":9,"Z":4}},"2":{"d":"53,-94v10,-29,-22,-30,-47,-34r15,-58v44,7,92,13,92,58v0,40,-30,70,-58,94r58,-11v0,19,-1,37,-2,56r-101,-5r-5,-32v15,-22,39,-41,48,-68","w":118,"k":{"V":4,"X":11,"\\":14,"8":5,"5":7,"4":5,"1":2,"?":11,"7":4,"3":5,"2":2,"x":4,"~":4,"@":4,"\/":4,"_":4,"=":4,">":4,"<":7,"J":2,"Y":11,"Z":4,"0":2,"6":2,"C":2,"G":2,"O":2,"Q":2,"A":4,"+":4}},"3":{"d":"65,-122v-3,-16,-25,-17,-49,-14r7,-47v46,-5,98,1,98,45v0,26,-15,35,-35,45v24,11,41,21,42,51v2,60,-76,65,-121,42r9,-50v30,13,70,4,49,-19v-4,-5,-15,-8,-28,-10v-1,-7,-2,-14,-3,-23v18,-5,27,-7,31,-20","w":133,"k":{"B":4,"V":7,"W":5,"X":7,"\\":18,"8":4,"5":11,"4":5,"\u00ad":4,"9":7,"1":7,"?":14,"7":11,"3":7,"2":5,"v":4,"x":11,"^":7,"~":4,"\/":5,"_":11,"=":4,">":4,"<":7,"#":4,"J":4,"S":4,"T":5,"Y":14,"Z":7,"f":7,"\"":5,"'":5,"t":4,"0":4,"6":4,"C":4,"G":4,"O":4,"Q":4,"A":4,":":2,";":2,"+":4,",":2,".":2,"s":4,"!":4,"%":4}},"4":{"d":"77,-183v15,0,29,4,42,6r2,97r17,-2v1,15,1,30,1,46r-17,1r0,40v-15,3,-32,5,-49,6r1,-44r-68,3r18,-125v16,2,32,6,48,9r-18,75r21,-2","w":144,"k":{"x":11,"v":5,"_":4,"^":11,"\\":22,"X":13,"W":11,"V":13,"B":4,"?":14,">":4,"<":4,"9":11,"8":5,"7":9,"5":11,"4":4,"3":9,"2":5,"1":14,"\/":7,"*":11,"(":-4,"#":4,"J":7,"S":4,"T":13,"Y":22,"Z":7,"f":4,"\"":11,"'":11,"0":2,"6":2,"C":2,"G":2,"O":2,"Q":2,"A":7,"+":4,",":4,".":4,"s":4,"z":4,"!":4,"%":11}},"5":{"d":"75,-59v-4,-20,-32,-23,-61,-20r6,-98r96,-7v2,18,4,35,4,52r-61,0r1,24v69,-11,101,73,48,106v-20,12,-50,15,-85,13v-3,-17,-5,-32,-7,-48v27,0,55,-4,59,-22","w":141,"k":{"B":4,"V":14,"W":11,"X":11,"*":11,"\\":18,"8":7,"5":14,"4":5,"\u00ad":4,"9":14,"1":14,"?":18,"7":14,"3":11,"2":7,"v":9,"x":13,"^":14,"$":2,"\/":7,"_":18,"=":4,">":4,"<":4,"#":4,"J":7,"S":7,"T":14,"Y":22,"Z":13,"f":7,"\"":11,"'":11,"t":4,"0":4,"6":4,"C":4,"G":4,"O":4,"Q":4,"A":5,":":4,";":4,"+":4,",":4,".":4,"s":5,"!":4,"%":14}},"6":{"d":"68,13v-89,3,-65,-139,-24,-178v9,-8,17,-18,26,-25r36,30v-13,13,-25,25,-32,44v34,2,61,22,61,57v-1,44,-25,71,-67,72xm62,-33v11,11,24,-3,24,-18v0,-14,-13,-25,-27,-27v-4,15,-5,35,3,45","w":139,"k":{"x":11,"v":7,"_":14,"^":14,"\\":31,"X":11,"W":11,"V":14,"B":4,"?":18,"9":7,"8":5,"7":14,"5":11,"4":4,"3":11,"2":7,"1":18,"\/":7,"*":14,"(":-5,"J":7,"S":5,"T":13,"Y":29,"Z":11,"f":4,"\"":11,"'":11,"A":5,",":4,".":4,"s":4,"%":14}},"7":{"d":"4,-183r113,2r6,44r-56,150v-19,-4,-37,-12,-54,-18r66,-128r-69,14v-3,-22,-5,-44,-6,-64","w":126,"k":{"~":7,"y":4,"x":7,"w":7,"_":18,"]":-7,"\\":7,"X":9,"M":5,"@":11,"?":4,">":7,"=":7,"<":11,"8":7,"7":2,"6":7,"5":11,"4":13,"3":11,"2":4,"\/":22,"-":7,"&":14,"#":4,"J":25,"S":2,"Y":13,"Z":2,"f":4,"0":7,"C":7,"G":7,"O":7,"Q":7,"A":22,":":4,";":4,"+":7,"i":4,"c":14,"d":14,"e":14,"g":14,"o":14,"q":14,",":25,".":25,"s":4,"!":4,"j":4}},"8":{"d":"13,-139v0,-47,66,-59,91,-29r10,-12v9,8,17,17,26,27r-49,51v19,14,42,26,44,57v3,66,-124,83,-125,9v0,-25,13,-43,25,-59v-11,-11,-22,-23,-22,-44xm69,-32v20,-2,16,-31,-1,-40v-10,9,-18,37,1,40xm85,-146v-9,-10,-33,-7,-32,10v0,6,2,11,7,15","w":138,"k":{"~":4,"x":9,"v":4,"_":11,"^":11,"\\":11,"X":4,"W":7,"V":11,"?":5,">":4,"<":4,"9":7,"8":4,"7":7,"5":9,"4":4,"3":7,"2":5,"1":5,"\/":7,"-":4,"#":4,"J":4,"T":7,"Y":14,"Z":9,"f":7,"t":4,"A":4,"+":4,",":4,".":4,"s":4}},"9":{"d":"71,-184v92,-1,63,148,29,197v-19,-3,-37,-7,-54,-12v10,-18,20,-35,27,-56v-44,9,-69,-18,-69,-61v0,-41,23,-68,67,-68xm70,-143v-20,1,-20,44,-1,47v3,1,8,1,13,0v7,-16,5,-44,-12,-47","w":139,"k":{"Y":17,"W":5,"\/":11,",":7,"&":4,"V":5,"X":13,"\\":18,"8":7,"5":7,"4":5,"1":7,"?":14,"7":7,"3":13,"2":5,"x":11,"_":14,"J":11,"S":4,"T":4,"Z":7,"A":11,"a":9,".":7,"z":2}},":":{"d":"7,-22v0,-20,13,-33,33,-33v21,1,35,14,36,35v1,19,-17,33,-36,33v-20,1,-33,-16,-33,-35xm7,-102v2,-21,15,-34,36,-35v20,-1,33,13,33,33v0,19,-13,35,-33,35v-19,0,-37,-13,-36,-33","w":82,"k":{"V":4,"W":4,"8":4,"5":7,"4":4,"1":7,"7":4,"3":4,"T":4,"Y":18,"j":-7}},";":{"d":"8,-105v0,-20,14,-33,33,-33v21,0,34,15,35,36v1,19,-16,32,-35,32v-20,1,-33,-16,-33,-35xm41,-49v24,0,36,19,36,42v0,31,-14,55,-43,75v-6,-10,-13,-20,-19,-31v11,-5,18,-11,26,-18v-20,0,-34,-14,-34,-34v0,-17,15,-34,34,-34","w":84,"k":{"V":4,"W":4,"8":4,"5":7,"4":4,"1":7,"7":4,"3":4,"T":4,"Y":18,"j":-7}},"<":{"d":"99,-70r-9,38r-78,-22r-5,-41r82,-43v4,13,9,24,11,39r-50,19","w":107,"k":{"8":7,"7":7,"5":7,"4":7,"3":14,"2":7,"1":7}},"=":{"d":"11,-92r-4,-28r80,-6r-2,36v-24,0,-49,-1,-74,-2xm8,-43v0,-12,0,-24,1,-36r77,3r-2,30","w":93,"k":{"8":4,"7":7,"5":4,"4":4,"3":14,"2":4,"1":4}},">":{"d":"9,-96v2,-14,4,-27,8,-39r79,23v3,14,3,25,4,41r-82,43r-11,-39r51,-19","w":107,"k":{"8":11,"7":14,"5":7,"4":7,"3":18,"2":11,"1":11}},"?":{"d":"69,-128v-6,-18,-33,-2,-45,3r-19,-51v52,-40,152,-10,118,61v-13,27,-42,40,-75,48v-5,-13,-8,-18,-11,-32v17,-7,29,-14,32,-29xm23,-14v1,-21,15,-36,36,-36v19,0,33,13,33,33v0,19,-13,36,-33,35v-19,0,-37,-13,-36,-32","w":135,"k":{"X":7,"8":9,"5":11,"4":14,"3":11,"2":4,"w":7,"x":11,"M":7,"J":25,"Y":4,"f":4,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"A":22,"U":4,"a":14,"c":14,"d":14,"e":14,"g":14,"o":14,"q":14,",":22,".":22,"s":5,"u":7,"y":7,"z":4}},"@":{"d":"68,-67v0,-33,31,-61,62,-45v-2,-15,19,-5,28,-5v-2,17,-11,57,6,60v35,-20,17,-98,-36,-91v-50,6,-81,34,-84,85v-3,47,46,67,86,47r5,30v-59,29,-131,-4,-127,-74v4,-72,50,-120,122,-120v56,0,86,28,86,82v0,39,-18,71,-55,71v-14,0,-27,-7,-30,-19v-19,20,-63,15,-63,-21xm112,-65v11,1,16,-7,14,-22v-17,-6,-34,18,-14,22","w":221,"k":{"x":7,"v":-2,"X":14,"8":7,"7":4,"5":4,"4":4,"3":14,"2":4,"1":4,"J":14,"Y":14,"Z":4,"t":-4,"A":5,"a":7}},"A":{"d":"153,2v-18,4,-35,6,-55,8r-6,-50r-34,5v-4,14,-6,28,-9,43v-17,-2,-34,-7,-49,-11r47,-178r64,-8xm86,-78v-1,-21,-7,-38,-9,-58r-18,56","k":{"y":5,"\\":25,"E":4}},"B":{"d":"150,-47v0,59,-75,66,-136,56r-9,-189v46,-23,120,-22,120,35v0,22,-13,36,-28,46v34,6,53,19,53,52xm49,-104v19,-1,41,-33,15,-40v-5,0,-10,1,-16,4xm59,-37v23,3,42,-18,23,-31v-6,-3,-14,-6,-25,-6","w":152,"k":{"x":11,"v":11,"^":11,"\\":29,"X":7,"W":11,"V":16,"?":18,"9":11,"8":4,"7":14,"5":11,"4":2,"3":7,"2":4,"1":22,"\/":4,"*":18,"D":4,"E":4,"F":4,"H":4,"I":4,"K":4,"L":4,"N":4,"P":4,"R":4,"[":4,"J":4,"S":4,"T":22,"Y":27,"Z":11,"f":4,"\"":22,"'":22,"t":4}},"C":{"d":"6,-74v0,-74,50,-120,128,-110v-2,22,-5,43,-9,61v-36,-7,-62,12,-65,46v-3,38,46,36,65,17v8,16,12,31,18,49v-13,12,-37,23,-61,23v-50,0,-76,-36,-76,-86","w":144,"k":{"y":4,"E":4,"V":9,"W":4,"X":7,"\\":7,"8":5,"5":9,"4":7,"\u00ad":11,"9":11,"1":11,"?":4,"7":4,"3":5,"2":2,"v":9,"w":4,"x":4,"^":7,"~":11,"@":4,"J":2,"T":7,"Y":20,"Z":7,"f":7,"\"":5,"'":5,"t":7,"0":9,"6":9,"C":9,"G":9,"O":9,"Q":9,"U":7,"+":11,"c":4,"d":4,"e":4,"g":4,"o":4,"q":4,"s":4,"u":4}},"D":{"d":"12,-185v73,-23,147,12,143,89v-3,79,-60,113,-142,112xm63,-39v34,-1,50,-54,28,-80v-7,-8,-17,-11,-30,-11","w":158,"k":{"J":11,".":7,",":7,"V":5,"W":5,"X":13,"\\":18,"8":7,"5":7,"4":5,"1":7,"?":14,"7":7,"3":13,"2":5,"x":11,"\/":11,"&":4,"_":14,"S":4,"T":4,"Y":17,"Z":7,"A":11,"a":9,"z":2}},"E":{"d":"17,13r-12,-196r114,-9v0,25,-3,43,-5,65r-55,-5r-1,33r35,-4v0,16,0,32,-1,48v-11,-1,-23,-3,-36,-2r1,24r62,-15v1,22,1,42,0,59v-34,1,-68,2,-102,2","w":124,"k":{"y":2,"g":4,"V":4,"W":2,"X":7,"8":4,"5":7,"4":4,"\u00ad":11,"9":4,"1":4,"?":4,"7":2,"3":4,"2":2,"v":7,"w":4,"x":9,"^":4,"~":11,"@":4,"J":2,"Y":13,"f":7,"t":5,"0":5,"6":5,"C":5,"G":5,"O":5,"Q":5,"A":2,"U":4,"+":11,"c":4,"d":4,"e":4,"o":4,"q":4,"s":4,"u":2}},"F":{"d":"119,-122r-59,-8r-1,34r42,-4r-2,42r-36,-1r3,64r-57,4r3,-192v36,-3,72,-5,108,-6","w":124,"k":{"~":7,"x":9,"w":7,"l":4,"k":4,"b":4,"_":11,"]":-4,"X":13,"M":4,"@":11,"8":7,"5":7,"4":13,"3":11,"2":4,"\/":18,"-":7,"*":-7,"&":11,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"N":2,"P":2,"R":2,"[":2,"J":25,"Y":13,"f":2,"\"":-2,"'":-2,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"A":18,"U":4,"a":14,":":4,";":4,"+":7,"i":2,"m":4,"n":4,"p":4,"r":4,"c":13,"d":13,"e":13,"g":13,"o":13,"q":13,",":29,".":29,"s":4,"u":7,"y":7,"z":4}},"G":{"d":"60,-70v-1,28,19,44,44,34r2,-27r-23,4r-2,-39v21,0,42,0,63,1r4,93v-58,32,-148,10,-143,-68v5,-75,47,-112,117,-120r11,54v-41,6,-71,25,-73,68","k":{"E":2,"V":9,"W":7,"X":7,"*":11,"\\":22,"8":4,"5":7,"4":4,"9":5,"1":14,"?":14,"7":7,"3":4,"2":4,"v":5,"x":4,"^":11,"(":-4,"J":2,"T":13,"Y":20,"Z":4,"\"":9,"'":9,"A":2,"u":2,"y":2}},"H":{"d":"87,-86r3,-89r46,-2r5,186v-18,2,-32,2,-51,3r3,-57r-32,2r2,44r-56,5r6,-192r45,-6r1,105","w":148,"k":{"V":2,"W":2,"X":4,"\\":7,"5":4,"4":2,"1":4,"?":4,"x":7,"$":-4,")":-7,"Y":9,"Z":4}},"I":{"d":"12,4r-2,-190r54,-4r-4,196v-17,0,-33,0,-48,-2","w":73,"k":{"J":5,"V":2,"W":2,"X":4,"\\":7,"5":4,"4":2,"1":4,"?":4,"x":7,"$":-4,")":-7,"Y":9,"Z":4}},"J":{"d":"67,-70v-1,-39,-8,-78,-15,-111v17,-4,36,-6,55,-8v8,72,33,200,-53,202v-19,0,-36,-6,-52,-18v3,-19,9,-37,15,-53v15,14,51,30,50,-12","w":123,"k":{"V":4,"W":2,"X":9,"\\":11,"8":5,"5":4,"4":4,"1":4,"?":11,"7":4,"3":7,"2":4,"v":2,"x":9,"M":2,"\/":11,"&":2,"_":14,"J":11,"S":2,"T":2,"Y":11,"Z":5,"A":9,"a":5,",":9,".":9,"z":2}},"K":{"d":"99,-187r47,22r-53,84r63,61v-23,18,-22,18,-49,37r-49,-64r0,58r-50,2r5,-200r46,2r3,80","w":152,"k":{"q":11,"p":7,"o":11,"e":11,"d":11,"c":11,"I":2,"E":2,"B":2,"6":11,"V":14,"W":11,"X":9,"*":7,"\\":14,"8":14,"5":18,"4":20,"\u00ad":22,"9":14,"1":14,"?":7,"7":11,"3":14,"2":7,"v":16,"w":13,"x":13,"^":14,"~":22,"@":4,"M":7,"\/":11,"D":2,"F":2,"H":2,"K":2,"L":2,"N":2,"P":2,"R":2,"[":2,"J":11,"S":7,"T":16,"Y":22,"Z":7,"f":14,"\"":7,"'":7,"t":11,"0":11,"C":11,"G":11,"O":11,"Q":11,"A":9,"U":7,"a":7,"+":22,"i":7,"m":7,"n":7,"r":7,"g":11,"s":11,"u":11,"y":11,"z":5,"!":4,"j":5,"b":2,"h":2,"k":2,"l":2}},"L":{"d":"103,12r-95,-7r5,-190r47,-5r1,145r45,-10","w":109,"k":{"y":4,"E":4,"V":14,"W":11,"X":11,"*":14,"\\":25,"8":4,"5":11,"4":4,"\u00ad":7,"9":18,"1":20,"?":14,"7":11,"3":4,"2":4,"v":11,"x":4,"^":14,"~":11,"J":2,"T":22,"Y":29,"Z":4,"f":4,"\"":11,"'":11,"t":2,"+":7}},"M":{"d":"161,-178r14,184r-57,6r-2,-100r-32,73r-32,-60r1,83v-17,-1,-33,-2,-49,-4r14,-181r37,-8r34,77r31,-68","w":178,"k":{"y":2,"v":4,"^":4,"\\":14,"X":7,"W":5,"V":7,"?":11,"9":4,"8":4,"7":5,"5":5,"4":4,"3":4,"1":7,"*":4,"T":5,"Y":14,"Z":4,"\"":4,"'":4,"U":2}},"N":{"d":"100,-81r-4,-104r49,2v0,62,-2,124,-4,187r-38,5r-49,-85r2,82r-49,3r7,-189r42,-3","k":{"Y":9,"X":4,"J":4,"A":4,"V":2,"W":2,"\\":7,"5":4,"4":2,"1":4,"?":4,"x":7,"$":-4,")":-7,"Z":4}},"O":{"d":"91,-185v52,0,73,44,73,99v0,59,-27,98,-82,98v-50,0,-76,-36,-76,-86v0,-60,27,-111,85,-111xm89,-44v35,1,38,-85,2,-88v-37,1,-39,88,-2,88","w":170,"k":{"x":11,"V":5,"W":5,"X":13,"\\":18,"8":7,"5":7,"4":5,"1":7,"?":14,"7":7,"3":13,"2":5,"\/":11,"&":4,"_":14,"J":11,"S":4,"T":4,"Y":17,"Z":7,"A":11,"a":9,",":7,".":7,"z":2}},"P":{"d":"12,-175v54,-32,143,-18,139,54v-3,49,-41,68,-89,73r-1,56r-52,-1xm96,-122v2,-19,-22,-21,-37,-15r1,45v21,-5,35,-9,36,-30","k":{"x":5,"w":2,"v":-2,"g":5,"_":22,"^":-4,"\\":7,"X":11,"M":2,"@":4,"?":7,"9":-4,"8":5,"6":4,"5":7,"4":9,"3":11,"2":2,"\/":22,"*":-7,"&":14,"J":29,"Y":7,"Z":2,"\"":-4,"'":-4,"t":-4,"A":18,"a":9,"c":5,"d":5,"e":5,"o":5,"q":5,",":43,".":43,"u":2,"y":2}},"Q":{"d":"93,-185v86,-4,94,146,38,182r21,30v-17,10,-32,16,-50,24r-11,-39v-56,5,-85,-30,-85,-86v0,-62,28,-108,87,-111xm90,-44v20,0,29,-17,29,-41v0,-27,-6,-46,-26,-46v-19,0,-28,24,-28,47v0,27,8,40,25,40","w":172,"k":{"z":2,"x":11,"V":5,"W":5,"X":13,"\\":18,"8":7,"5":7,"4":5,"1":7,"?":14,"7":7,"3":13,"2":5,"\/":11,"&":4,"_":14,"J":11,"S":4,"T":4,"Y":17,"Z":7,"A":11,"a":9,",":7,".":7}},"R":{"d":"151,-125v0,31,-21,48,-46,59r49,39v-14,16,-27,29,-43,43v-17,-18,-33,-42,-49,-61r1,54v-17,2,-34,5,-52,4r1,-188v54,-22,140,-17,139,50xm62,-88v36,-3,44,-55,-1,-42","k":{"y":2,"X":4,"\\":11,"8":5,"5":5,"4":4,"\u00ad":4,"1":9,"?":7,"3":7,"2":2,"w":2,"x":5,"~":4,"@":4,"\/":4,"_":7,"J":11,"Y":9,"Z":4,"\"":-4,"'":-4,"0":2,"6":2,"C":2,"G":2,"O":2,"Q":2,"A":9,"a":5,"+":4,"c":4,"d":4,"e":4,"g":4,"o":4,"q":4,"u":2}},"S":{"d":"130,-42v0,59,-79,68,-126,45r6,-52v16,9,73,16,56,-14v-24,-17,-59,-25,-60,-66v-1,-49,56,-66,105,-53v-1,19,-2,36,-4,51v-24,-1,-39,0,-41,17v13,31,64,24,64,72","w":132,"k":{"E":4,"V":11,"W":9,"X":5,"*":14,"\\":18,"8":2,"5":9,"4":2,"\u00ad":4,"9":13,"1":18,"?":14,"7":11,"3":4,"2":4,"v":11,"x":7,"^":18,"~":4,"_":18,"J":2,"T":13,"Y":25,"Z":9,"f":7,"\"":11,"'":11,"t":5,"+":4,"c":-2,"d":-2,"e":-2,"g":-2,"o":-2,"q":-2,"u":-2,"y":-2}},"T":{"d":"90,-121r6,126v-16,2,-35,5,-54,4r4,-138r-42,8r1,-60r127,-3r0,64","w":136,"k":{"X":11,"8":7,"5":7,"4":13,"\u00ad":14,"1":7,"3":11,"2":4,"w":7,"x":7,"~":14,"@":14,"M":4,"\/":22,"&":14,"_":14,"J":22,"Y":7,"\"":-2,"'":-2,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"A":20,"U":2,"a":13,":":4,";":4,"+":14,"m":2,"n":2,"p":2,"r":2,"c":13,"d":13,"e":13,"g":13,"o":13,"q":13,",":25,".":25,"s":4,"u":5,"y":5,"!":4}},"U":{"d":"75,15v-86,0,-76,-128,-54,-197v18,2,33,7,49,11v-6,29,-15,59,-15,94v0,25,0,39,17,42v33,-12,16,-92,13,-128r53,-7v17,71,18,185,-63,185","k":{"y":2,"V":4,"W":2,"X":9,"\\":11,"8":5,"5":4,"4":4,"1":4,"?":11,"7":4,"3":7,"2":4,"v":2,"x":9,"M":2,"\/":11,"&":2,"_":14,"J":11,"S":2,"T":2,"Y":11,"Z":5,"A":9,"a":5,",":9,".":9,"z":2}},"V":{"d":"99,-174r47,12r-41,171r-61,4r-44,-181r55,-18r24,150","w":145,"k":{"~":7,"x":13,"w":7,"v":9,"d":11,"_":11,"]":-5,"\\":7,"X":11,"W":5,"V":7,"M":5,"@":7,"?":4,"8":7,"7":7,"5":9,"4":11,"3":11,"2":4,"1":9,"\/":14,"-":7,"*":-4,"&":11,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"N":2,"P":2,"R":2,"[":2,"J":22,"S":2,"Y":14,"f":4,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"A":16,"U":4,"a":14,":":4,";":4,"+":7,"i":5,"m":5,"n":5,"p":5,"r":5,"c":11,"e":11,"g":11,"o":11,"q":11,",":22,".":22,"s":5,"u":7,"y":7,"z":4,"!":4,"j":4,"b":2,"h":2,"k":2,"l":2}},"W":{"d":"0,-171r59,-12r8,127r19,-105r32,1r20,87r13,-111r50,6r-35,187v-15,-1,-31,-3,-47,-4r-21,-70r-13,73r-51,2","w":200,"k":{"~":7,"}":-7,"x":13,"w":7,"v":11,"_":11,"]":-7,"X":9,"W":5,"V":5,"N":2,"M":5,"@":9,"9":2,"8":9,"7":7,"5":7,"4":11,"3":11,"2":4,"1":11,"\/":11,"-":7,")":-4,"&":11,"D":2,"E":2,"F":2,"H":2,"I":2,"K":2,"L":2,"P":2,"R":2,"[":2,"J":18,"S":2,"Y":11,"f":4,"t":2,"0":9,"6":9,"C":9,"G":9,"O":9,"Q":9,"A":16,"U":4,"a":14,":":4,";":4,"+":7,"i":2,"m":5,"n":5,"p":5,"r":5,"c":9,"d":9,"e":9,"g":9,"o":9,"q":9,",":18,".":18,"s":5,"u":9,"y":9,"z":5,"b":2,"h":2,"k":2,"l":2}},"X":{"d":"113,-95r47,80r-52,27r-26,-65r-29,70r-54,-28r52,-77r-46,-77r51,-25r27,65r28,-68v16,9,28,20,43,30","w":158,"k":{"~":14,"y":4,"x":13,"w":5,"v":13,"g":5,"_":11,"^":11,"\\":11,"X":4,"W":7,"V":9,"M":5,"E":2,"@":7,"?":7,"9":11,"8":5,"7":7,"5":13,"4":16,"3":13,"2":7,"1":11,"-":16,"*":4,"D":2,"F":2,"H":2,"I":2,"K":2,"L":2,"N":2,"P":2,"R":2,"[":2,"J":7,"S":5,"T":11,"Y":18,"Z":5,"f":11,"\"":4,"'":4,"t":9,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"A":7,"U":5,"a":7,"+":16,"i":4,"c":5,"d":5,"e":5,"o":5,"q":5,"s":4,"u":4,"!":4,"j":4,"b":2,"h":2,"k":2,"l":2}},"Y":{"d":"109,-72r4,79r-59,4r5,-86r-59,-91v18,-10,35,-17,58,-23r28,80r27,-75r45,16","w":158,"k":{"h":7,"N":4,"H":4,"V":7,"W":5,"X":14,"\\":4,"8":13,"5":14,"4":22,"\u00ad":23,"9":11,"1":11,"?":4,"7":11,"3":16,"2":11,"v":22,"w":20,"x":23,"^":7,"~":22,"@":22,"M":13,"\/":25,"&":18,"_":18,"D":4,"E":4,"F":4,"I":4,"K":4,"L":4,"P":4,"R":4,"[":4,"J":25,"S":9,"T":7,"Y":11,"Z":9,"f":13,"t":11,"0":20,"6":20,"C":20,"G":20,"O":20,"Q":20,"A":23,"U":7,"a":23,":":14,";":14,"+":23,"i":13,"m":14,"n":14,"p":14,"r":14,"c":25,"d":25,"e":25,"g":25,"o":25,"q":25,",":29,".":29,"s":18,"u":20,"y":20,"z":13,"!":11,"j":14,"b":7,"k":7,"l":7}},"Z":{"d":"9,-123r-4,-62r113,-3r-41,143r44,-10r1,61r-117,-3r55,-141","w":126,"k":{"y":4,"V":7,"W":7,"X":7,"*":7,"\\":4,"8":5,"5":13,"4":5,"\u00ad":7,"9":14,"1":16,"?":7,"7":7,"3":5,"2":4,"v":13,"x":11,"^":11,"~":14,"_":7,"S":2,"T":7,"Y":20,"Z":4,"f":7,"\"":4,"'":4,"t":4,"0":4,"6":4,"C":4,"G":4,"O":4,"Q":4,"A":7,"U":4,"+":7}},"[":{"d":"67,18r-53,7r-6,-214r61,-5v0,14,1,26,-2,38r-21,-3r-1,147r19,-1","w":72,"k":{"x":9,"w":11,"v":11,"f":7,"t":7,"c":11,"d":11,"e":11,"g":11,"o":11,"q":11,"s":4,"u":7,"y":7,"z":4,"j":-16}},"\\":{"d":"2,-189v13,-6,25,-10,39,-14r73,203r-31,11","w":115,"k":{"w":5,"v":11,"W":11,"V":14,"E":7,"B":4,"9":18,"8":7,"7":11,"5":11,"4":11,"3":4,"2":4,"1":22,"T":22,"Y":32,"Z":4,"f":11,"t":11,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"U":7,"c":7,"d":7,"e":7,"g":7,"o":7,"q":7,"u":4,"y":4,"j":-11}},"]":{"d":"2,-194r61,5r-6,214r-53,-7r2,-31r20,1r-1,-147r-22,3","w":69,"k":{"V":2,"W":2,"X":4,"\\":7,"5":4,"4":2,"1":4,"?":4,"x":7,"$":-4,")":-7,"Y":9,"Z":4}},"^":{"d":"55,-157r-19,58v-13,-2,-25,-5,-36,-8r35,-84v14,-1,27,-1,41,0r32,85r-37,7","w":107,"k":{"x":4,"X":11,"M":2,"8":7,"6":4,"5":4,"4":7,"3":11,"2":4,"1":4,"J":22,"Y":7,"t":-4,"a":7}},"_":{"d":"169,23r-2,38r-167,0r-2,-38r171,0","w":166,"k":{"w":7,"v":14,"p":-11,"j":-43,"X":11,"W":11,"V":11,"9":18,"8":11,"7":11,"5":18,"4":14,"3":4,"2":11,"1":14,"T":14,"Y":18,"Z":7,"f":7,"t":11,"0":14,"6":14,"C":14,"G":14,"O":14,"Q":14,"U":14,"c":7,"d":7,"e":7,"g":7,"o":7,"q":7,"s":7,"u":7,"y":7}},"`":{"d":"43,-194r-41,-36r33,-28r33,52v-12,6,-14,8,-25,12","w":73},"a":{"d":"84,-3v-19,28,-83,26,-81,-19v1,-39,33,-58,77,-58v-4,-16,-38,-17,-59,-13v-3,1,-2,1,-2,1r1,-47v55,-22,106,2,106,72v0,25,-2,53,-4,76r-38,3r0,-15xm84,-53v-17,-1,-31,7,-31,20v0,17,22,9,31,2r0,-22","w":132,"k":{"*":4,"\\":29,"8":5,"5":7,"4":4,"9":4,"1":14,"?":18,"7":9,"3":5,"2":4,"v":7,"x":7,"^":4,")":4,"_":4,"]":4,"\"":4,"'":4,"s":2,"u":2,"y":2,"z":2}},"b":{"d":"137,-67v-1,39,-13,70,-50,71v-14,0,-30,-7,-36,-16r-2,23r-43,3r5,-218r46,3r0,66v50,-9,80,21,80,68xm56,-55v26,24,46,-14,27,-30v-5,-5,-13,-8,-25,-8","w":140,"k":{"*":4,"\\":29,"8":5,"5":7,"4":4,"9":2,"1":14,"?":18,"7":11,"3":9,"2":7,"v":5,"x":13,")":11,"\/":7,"_":11,"}":4,"]":11,"\"":2,"'":2,"t":2,"a":4,",":5,".":5,"s":4,"z":4,"j":2}},"c":{"d":"104,-138v-3,13,-11,31,-15,43v-25,-7,-40,4,-40,27v0,26,28,33,48,19r15,43v-40,38,-117,12,-108,-55v-5,-61,46,-109,100,-77","w":111,"k":{"y":4,"q":5,"h":4,"e":5,"c":5,"*":4,"\\":22,"8":7,"5":11,"4":9,"\u00ad":11,"9":5,"1":5,"?":14,"7":7,"3":4,"2":2,"v":7,"w":5,"x":9,"^":4,"~":11,"@":7,")":4,"f":7,"\"":4,"'":4,"t":5,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"a":2,"+":11,"d":5,"g":5,"o":5,"u":4,"!":4}},"d":{"d":"55,-60v0,22,27,18,35,7r-1,-39v-20,-1,-34,13,-34,32xm4,-56v5,-51,32,-82,84,-78r-1,-67r51,3r-3,207r-38,5v-1,-6,-3,-18,-3,-27v-29,37,-97,18,-90,-43","w":145,"k":{"x":4}},"e":{"d":"77,-81v3,-20,-12,-33,-22,-16v-3,5,-4,13,-4,21xm54,-55v6,18,41,14,56,6r12,47v-47,28,-118,11,-118,-57v0,-55,38,-103,90,-81v21,9,25,41,23,73","w":123,"k":{"\\":25,"*":4,"8":7,"5":7,"4":4,"9":2,"1":11,"?":14,"7":7,"3":4,"2":2,"v":5,"w":2,"x":7,")":4}},"f":{"d":"15,-124v-4,-59,26,-94,78,-77r-3,50v-17,-4,-24,6,-24,24r18,-2v1,16,1,31,1,47r-19,0r6,90r-48,8r-8,-98r-12,1r0,-42","w":91,"k":{"l":-4,"k":-4,"i":-4,"h":-4,"b":-4,"*":-4,"\\":-2,"8":4,"5":4,"4":4,"7":-4,"3":7,"w":2,"x":7,"@":4,")":-7,"\/":7,"&":4,"_":7,"}":-7,"]":-7,"\"":-4,"'":-4,"a":5,"c":2,"d":2,"e":2,"g":2,"o":2,"q":2,",":11,".":11,"z":2}},"g":{"d":"4,-68v-4,-54,49,-92,91,-60r-2,-19r41,2v6,95,25,235,-97,202v-9,-3,-17,-5,-25,-10v5,-18,9,-27,16,-43v28,12,69,6,64,-31v-30,27,-95,12,-88,-41xm93,-98v-27,-9,-53,33,-24,41v20,2,28,-15,24,-41","w":146,"k":{"\\":22,"8":5,"5":7,"4":5,"9":2,"1":7,"?":14,"7":7,"3":7,"2":4,"v":4,"x":5,")":4,"]":4,"f":4,"a":2,"u":2,"y":2}},"h":{"d":"89,-142v59,1,46,95,40,148r-51,2v2,-30,16,-90,-9,-102v-5,0,-8,2,-11,4r3,102r-50,-1r-5,-201v18,-4,36,-6,56,-9r-1,64v6,-5,17,-7,28,-7","w":140,"k":{"\\":29,"'":4,"\"":4,"*":4,"8":5,"5":7,"4":4,"9":4,"1":14,"?":18,"7":9,"3":5,"2":4,"v":7,"x":7,"^":4,")":4,"_":4,"]":4,"s":2,"u":2,"y":2,"z":2}},"i":{"d":"8,9r4,-139r45,3r3,132xm36,-213v17,0,27,14,27,33v0,21,-12,35,-31,35v-17,0,-28,-15,-28,-34v0,-20,12,-34,32,-34","w":67,"k":{"8":4,"5":5,"4":4,"1":9,"3":5,"2":4,"v":4,"w":1,"x":4,"]":-4}},"j":{"d":"12,-39r-3,-92r46,1v-1,81,33,214,-70,198v-5,-1,-11,-4,-17,-7v3,-16,6,-31,10,-45v31,12,36,-18,34,-55xm36,-216v17,0,27,15,27,33v0,22,-11,36,-31,36v-17,0,-27,-15,-27,-34v0,-20,12,-35,31,-35","w":66,"k":{"l":-5,"8":4,"5":7,"4":4,"9":2,"1":7,"3":4,"2":2,"v":4,"x":2,"]":-4}},"k":{"d":"6,7r4,-201r45,-6r3,108r32,-51v13,9,25,16,37,26r-36,48r44,51v-12,13,-26,27,-40,37r-42,-66r3,58v-16,-1,-33,-2,-50,-4","w":133,"k":{"y":5,"g":5,"*":7,"\\":29,"8":7,"5":13,"4":11,"\u00ad":14,"9":14,"1":16,"?":18,"7":11,"3":13,"2":7,"v":14,"w":5,"x":11,"^":4,"~":11,"@":7,")":7,"_":7,"}":4,"]":4,"f":7,"\"":5,"'":5,"t":5,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"a":7,"+":14,"i":4,"m":2,"n":2,"p":2,"r":2,"c":5,"d":5,"e":5,"o":5,"q":5,",":2,".":2,"s":4,"u":5,"z":5,"!":4,"j":5,"b":2,"h":2,"k":2,"l":2}},"l":{"d":"8,15r4,-210r44,-1r4,203","w":68,"k":{"x":4}},"m":{"d":"78,-2v1,-32,14,-101,-21,-87r1,98v-18,2,-36,4,-53,5r6,-153r43,-4r-2,22v15,-24,57,-30,67,-2v7,-12,19,-23,37,-23v59,0,40,97,37,155r-50,-6v2,-24,6,-51,4,-75v2,-17,-11,-30,-23,-19v-1,29,2,60,-2,86","w":204,"k":{"\\":29,"*":4,"8":5,"5":7,"4":4,"9":4,"1":14,"?":18,"7":9,"3":5,"2":4,"v":7,"x":7,"^":4,")":4,"_":4,"]":4,"\"":4,"'":4,"s":2,"u":2,"y":2,"z":2}},"n":{"d":"57,7r-51,3r4,-152v14,-2,28,-4,43,-4r-2,18v10,-12,23,-17,36,-17v61,3,43,96,42,154r-52,-5r4,-66v2,-25,-6,-40,-24,-29r0,98","w":138,"k":{"\\":29,"*":4,"8":5,"5":7,"4":4,"9":4,"1":14,"?":18,"7":9,"3":5,"2":4,"v":7,"x":7,"^":4,")":4,"_":4,"]":4,"\"":4,"'":4,"s":2,"u":2,"y":2,"z":2}},"o":{"d":"128,-68v0,44,-22,79,-64,79v-39,0,-60,-30,-60,-71v0,-47,23,-86,68,-86v40,0,56,36,56,78xm70,-47v23,1,29,-52,4,-52v-12,0,-19,14,-19,30v0,12,5,22,15,22","w":132,"k":{"\\":29,"*":4,"8":5,"5":7,"4":4,"9":2,"1":14,"?":18,"7":11,"3":9,"2":7,"v":5,"x":13,")":11,"\/":7,"_":11,"}":4,"]":11,"\"":2,"'":2,"t":2,"a":4,",":5,".":5,"s":4,"z":4,"j":2}},"p":{"d":"47,-119v11,-14,23,-25,44,-25v38,0,45,35,49,71v6,56,-44,101,-85,67r2,67r-51,-4r3,-196r40,-4xm94,-73v0,-25,-32,-20,-40,-6r0,29v17,12,40,0,40,-23","w":144,"k":{"a":4,"_":11,"\\":29,"*":4,"8":5,"5":7,"4":4,"9":2,"1":14,"?":18,"7":11,"3":9,"2":7,"v":5,"x":13,")":11,"\/":7,"}":4,"]":11,"\"":2,"'":2,"t":2,",":5,".":5,"s":4,"z":4,"j":2}},"q":{"d":"4,-59v-3,-56,47,-97,94,-69r-1,-20r40,3r3,200v-16,3,-31,5,-50,6r2,-74v-10,11,-23,19,-42,19v-34,0,-44,-29,-46,-65xm91,-94v-20,-2,-34,11,-34,29v0,21,26,20,34,9r0,-38","w":146,"k":{"_":-11,"\\":18,"8":4,"5":4,"4":2,"?":11,"3":5,"x":4,")":4,"a":2,"z":2}},"r":{"d":"99,-91v-21,0,-34,7,-44,18r2,79v-17,2,-34,6,-52,6r6,-158r43,6r1,27v7,-16,22,-29,40,-34v2,18,5,36,4,56","w":99,"k":{"*":-7,"\\":11,"8":7,"5":4,"4":4,"9":-2,"?":9,"7":2,"3":11,"2":2,"v":-2,"x":5,"^":-5,"~":-4,")":4,"\/":14,"&":11,"_":11,"]":4,"f":-2,"\"":-5,"'":-5,"t":-5,"a":9,"c":2,"d":2,"e":2,"g":2,"o":2,"q":2,",":25,".":25,"s":-2}},"s":{"d":"111,-56v22,57,-55,79,-105,61r4,-45v22,4,44,4,48,-9v-10,-23,-55,-19,-54,-55v1,-43,54,-52,95,-41v-1,13,-1,27,-4,39v-29,-6,-45,12,-20,22v15,6,30,13,36,28","w":116,"k":{"y":2,"\\":29,"*":7,"8":2,"5":9,"4":2,"\u00ad":7,"9":11,"1":13,"?":18,"7":11,"3":4,"2":4,"v":9,"x":9,"^":7,"~":7,")":7,"_":18,"]":4,"f":9,"\"":7,"'":7,"t":5,"+":7,"s":5}},"t":{"d":"60,12v-47,-3,-49,-49,-46,-103r-11,0r-1,-39r16,-1r5,-39r46,6r-7,29r23,-2r-3,48r-20,-1v-1,29,-1,50,23,45v1,17,3,33,4,50v-8,4,-18,7,-29,7","w":92,"k":{"y":2,"f":4,"\\":18,"8":4,"5":7,"4":4,"\u00ad":4,"9":2,"1":5,"?":11,"7":4,"3":4,"2":2,"v":2,"w":2,"x":7,"~":4,"@":4,"\"":2,"'":2,"+":4,"c":4,"d":4,"e":4,"g":4,"o":4,"q":4,"u":2}},"u":{"d":"15,-137r45,8v1,29,-23,98,19,86r0,-98r48,-2r-5,153r-38,-2r-1,-16v-7,10,-23,20,-38,20v-59,0,-38,-100,-30,-149","w":133,"k":{"\\":18,"8":4,"5":4,"4":2,"?":11,"3":5,"x":4,")":4,"a":2,"z":2}},"v":{"d":"0,-140r55,-9r15,116r23,-114r42,13r-34,143r-65,2","w":134,"k":{"y":4,"x":11,"w":4,"v":5,"g":5,"_":14,"]":7,"\\":18,"@":5,"?":11,"8":7,"7":4,"5":7,"4":4,"3":7,"\/":11,"-":4,"*":-4,")":11,"&":9,"\"":-4,"'":-4,"t":-2,"a":11,"+":4,"i":4,"m":2,"n":2,"p":2,"r":2,"c":5,"d":5,"e":5,"o":5,"q":5,",":16,".":16,"u":4,"z":4}},"w":{"d":"45,4v-58,0,-40,-105,-27,-150v14,1,29,3,43,6v-6,19,-10,40,-10,63v0,15,1,26,11,28v20,-7,12,-49,11,-75r40,-4v1,29,-5,73,14,82v22,-16,9,-74,3,-102r46,1v12,59,19,160,-47,160v-25,0,-42,-17,-45,-39v-6,16,-20,30,-39,30","w":189,"k":{"x":9,"v":2,"_":11,"]":7,"\\":20,"?":14,"8":5,"7":7,"5":7,"4":4,"3":9,"2":5,"1":7,"\/":7,")":7,"(":-4,"a":4,"i":1,",":5,".":5,"z":4}},"x":{"d":"0,4r38,-81r-30,-52v17,-7,33,-14,51,-20r17,50r15,-44v15,0,36,4,49,6r-33,73r36,56v-16,9,-31,15,-49,22r-25,-55r-16,52","w":142,"k":{"~":11,"y":4,"x":9,"w":5,"v":5,"o":9,"c":9,"]":4,"\\":18,"@":7,"?":14,"8":7,"7":7,"5":13,"4":14,"3":11,"2":4,"1":11,"-":11,")":7,"&":4,"f":4,"t":4,"0":7,"6":7,"C":7,"G":7,"O":7,"Q":7,"a":7,"+":11,"i":4,"m":2,"n":2,"p":2,"r":2,"d":9,"e":9,"g":9,"q":9,"s":4,"u":4,"z":2,"!":4,"j":2,"b":4,"h":4,"k":4,"l":4}},"y":{"d":"122,-139v5,89,29,227,-88,196v-9,-3,-18,-6,-25,-11r10,-43v21,11,66,15,63,-22v-38,22,-76,-4,-76,-52v0,-28,5,-58,12,-79v17,2,31,4,45,8v-2,26,-22,98,19,84r-6,-77","w":133,"k":{"\\":22,"8":5,"5":7,"4":5,"9":2,"1":7,"?":14,"7":7,"3":7,"2":4,"v":4,"x":5,")":4,"]":4,"f":4,"a":2,"u":2,"y":2}},"z":{"d":"12,-84r-6,-62r98,1r2,41r-50,64r54,-10r-2,59r-99,2v-3,-14,-5,-28,-6,-43r64,-69","w":113,"k":{"y":4,"\\":22,"8":4,"5":9,"4":4,"\u00ad":7,"9":2,"1":4,"?":14,"7":4,"3":4,"2":2,"v":4,"w":2,"x":4,"~":7,"f":4,"+":7,"c":2,"d":2,"e":2,"g":2,"o":2,"q":2}},"{":{"d":"27,-44v2,-14,-9,-20,-21,-21v-1,-9,-2,-18,-2,-29v38,2,11,-55,25,-77v5,-10,19,-29,31,-16r12,13v-29,16,4,88,-35,94v41,3,4,75,34,92r-17,22v-30,-7,-32,-43,-27,-78","w":73,"k":{"1":7,"j":-22}},"|":{"d":"9,-210r41,-1r-5,247r-34,-1","w":59},"}":{"d":"48,-114v0,14,8,20,22,20r-3,29v-36,0,-8,58,-23,78v-7,16,-28,28,-36,7v-3,-4,-2,-4,-5,-8v31,-11,-11,-84,33,-92v-39,-6,-6,-78,-34,-94r19,-20v28,11,27,43,27,80","w":73},"~":{"d":"2,-77v3,-34,38,-47,64,-26v10,5,16,1,20,-10r31,13v-3,34,-38,47,-64,26v-10,-5,-16,-1,-20,10","w":119,"k":{"x":11,"X":18,"W":4,"V":7,"8":11,"7":11,"5":4,"4":4,"3":11,"2":11,"1":14,"J":18,"S":4,"T":11,"Y":25,"Z":14,"t":-4,"a":7}}}});
;
(function ($) {
  Drupal.behaviors.cufonReplace = {
    attach: function(context) {
      for (o in Drupal.settings.cufonSelectors) { 
        var s = Drupal.settings.cufonSelectors[o];
        $(s.selector + ':not(.cufon-replace-processed)', context)
          .each(function() {
            Cufon.replace($(this), s.options);
          })
          .addClass('cufon-replace-processed');
      }
    }
  }
})(jQuery);
;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          o.retainPath=($.inArray($$[0],o.$path)>-1);
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
        $(this).addClass([o.hoverClass,c.bcClass].join(' '))
          .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $('>a:first-child',this) );
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
      this.toggleClass(sf.c.shadowClass+'-off');
    };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'normal',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .find('>ul').hide().css('visibility','hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .find('>ul:hidden').css('visibility','visible');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/*
 * Supersubs v0.2b - jQuery plugin - LAST UPDATE: MARCH 23rd, 2011
 * Copyright (c) 2008 Joel Birch
 *
 * Jan 16th, 2011 - Modified a little in order to work with NavBar menus as well.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

(function($){ // $ will refer to jQuery within this closure

  $.fn.supersubs = function(options){
    var opts = $.extend({}, $.fn.supersubs.defaults, options);
	// return original object to support chaining
    return this.each(function() {
      // cache selections
      var $$ = $(this);
      // support metadata
      var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
        'padding' : 0,
        'position' : 'absolute',
        'top' : '-99999em',
        'width' : 'auto'
      }).appendTo($$).width(); //clientWidth is faster, but was incorrect here
      // remove em dash
      $('#menu-fontsize').remove();

      // Jump on level if it's a "NavBar"
      if ($$.hasClass('sf-navbar')) {
        $$ = $('li > ul', $$);
      }
      // cache all ul elements 
      $ULs = $$.find('ul:not(.sf-megamenu)');
      // loop through each ul in menu
      $ULs.each(function(i) {
        // cache this ul
        var $ul = $ULs.eq(i);
        // get all (li) children of this ul
        var $LIs = $ul.children();
        // get all anchor grand-children
        var $As = $LIs.children('a');
        // force content to one line and save current float property
        var liFloat = $LIs.css('white-space','nowrap').css('float');
        // remove width restrictions and floats so elements remain vertically stacked
        var emWidth = $ul.add($LIs).add($As).css({
          'float' : 'none',
          'width'  : 'auto'
        })
        // this ul will now be shrink-wrapped to longest li due to position:absolute
        // so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
        .end().end()[0].clientWidth / fontsize;
        // add more width to ensure lines don't turn over at certain sizes in various browsers
        emWidth += o.extraWidth;
        // restrict to at least minWidth and at most maxWidth
        if (emWidth > o.maxWidth)    { emWidth = o.maxWidth; }
        else if (emWidth < o.minWidth)  { emWidth = o.minWidth; }
        emWidth += 'em';
        // set ul to width in ems
        $ul.css('width',emWidth);
        // restore li floats to avoid IE bugs
        // set li width to full width of this ul
        // revert white-space to normal
        $LIs.css({
          'float' : liFloat,
          'width' : '100%',
          'white-space' : 'normal'
        })
        // update offset position of descendant ul to reflect new width of parent
        .each(function(){
          var $childUl = $('>ul',this);
          var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
          $childUl.css(offsetDirection,emWidth);
        });
      });

    });
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    minWidth: 9, // requires em unit.
    maxWidth: 25, // requires em unit.
    extraWidth: 0 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };

})(jQuery); // plugin code ends;
/*
* Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget - LAST UPDATE: MARCH 23rd, 2011
*
* Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
* Special thanks to Karl Swedberg for valuable input.
* 
* Dec 28th, 2010 - Modified for the Superfish project for Drupal (http://drupal.org/project/superfish)
*
* jQuery version: 1.3.x or higher.
*
* Dual licensed under the MIT and GPL licenses:
* 	http://www.opensource.org/licenses/mit-license.php
* 	http://www.gnu.org/licenses/gpl.html
*/

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({Top:'',Right:'',Bottom:'',Left:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;  
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            $u.css('left', menuParentWidth + 'px');
            $u.css('right', 'auto');
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            $u.css('right', menuParentWidth + 'px');
            $u.css('left', 'auto');
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentHeight = $u.parent().outerHeight(true),
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css('bottom', menuParentHeight + 'px');
          $u.css('top', 'auto');
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
    var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

    /* if callbacks already set, store them */
    var _onBeforeShow = o.onBeforeShow,
    _onHide = o.onHide;

    $.extend($.fn.superfish.o[this.serial],{
    onBeforeShow: function() {
    onBeforeShow.call(this); /* fire our Supposition callback */
    _onBeforeShow.call(this); /* fire stored callbacks */
    },
    onHide: function() {
    onHide.call(this); /* fire our Supposition callback */
    _onHide.call(this); /* fire stored callbacks */
    }
    });
    });
  };
})(jQuery);;
/*
 * sf-Touchscreen v1.0b - Provides touchscreen compatibility for the jQuery Superfish plugin. - LAST UPDATE: MARCH 23rd, 2011
 *
 * Developer's notes:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish) 
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
*/

(function($){
  $.fn.sftouchscreen = function() {
    // Return original object to support chaining.
    return this.each( function() {
      // Select hyperlinks from parent menu items.
      $(this).find('li > ul').closest('li').children('a').each( function() {
	    var $item = $(this);
        // No .toggle() here as it's not possible to reset it.
        $item.click( function(event){
	      // Already clicked? proceed to the URI.
          if ($item.hasClass('sf-clicked')) {
            var $uri = $item.attr('href');
            window.location = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('sf-clicked');
          }
        }).closest('li').mouseleave( function(){
          // So, we reset everything.
          $item.removeClass('sf-clicked');
        });
	  });
    });
  };
})(jQuery);;
(function ($) {
  Drupal.viewsSlideshow = Drupal.viewsSlideshow || {};

  /**
   * Views Slideshow Controls
   */
  Drupal.viewsSlideshowControls = Drupal.viewsSlideshowControls || {};

  /**
   * Implement the play hook for controls.
   */
  Drupal.viewsSlideshowControls.play = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the pause hook for controls.
   */
  Drupal.viewsSlideshowControls.pause = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Text Controls
   */

  // Add views slieshow api calls for views slideshow text controls.
  Drupal.behaviors.viewsSlideshowControlsText = {
    attach: function (context) {

      // Process previous link
      $('.views_slideshow_controls_text_previous:not(.views-slideshow-controls-text-previous-processed)', context).addClass('views-slideshow-controls-text-previous-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_previous_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process next link
      $('.views_slideshow_controls_text_next:not(.views-slideshow-controls-text-next-processed)', context).addClass('views-slideshow-controls-text-next-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_next_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process pause link
      $('.views_slideshow_controls_text_pause:not(.views-slideshow-controls-text-pause-processed)', context).addClass('views-slideshow-controls-text-pause-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_pause_', '');
        $(this).click(function() {
          if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
          }
          else {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
          }
          return false;
        });
      });
    }
  };

  Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.pause = function (options) {
    var pauseText = Drupal.theme.prototype['viewsSlideshowControlsPause'] ? Drupal.theme('viewsSlideshowControlsPause') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(pauseText);
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.play = function (options) {
    var playText = Drupal.theme.prototype['viewsSlideshowControlsPlay'] ? Drupal.theme('viewsSlideshowControlsPlay') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(playText);
  };

  // Theme the resume control.
  Drupal.theme.prototype.viewsSlideshowControlsPause = function () {
    return Drupal.t('Resume');
  };

  // Theme the pause control.
  Drupal.theme.prototype.viewsSlideshowControlsPlay = function () {
    return Drupal.t('Pause');
  };

  /**
   * Views Slideshow Pager
   */
  Drupal.viewsSlideshowPager = Drupal.viewsSlideshowPager || {};

  /**
   * Implement the transitionBegin hook for pagers.
   */
  Drupal.viewsSlideshowPager.transitionBegin = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the goToSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.goToSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the previousSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.previousSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the nextSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.nextSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Pager Fields
   */

  // Add views slieshow api calls for views slideshow pager fields.
  Drupal.behaviors.viewsSlideshowPagerFields = {
    attach: function (context) {
      // Process pause on hover.
      $('.views_slideshow_pager_field:not(.views-slideshow-pager-field-processed)', context).addClass('views-slideshow-pager-field-processed').each(function() {
        // Parse out the location and unique id from the full id.
        var pagerInfo = $(this).attr('id').split('_');
        var location = pagerInfo[2];
        pagerInfo.splice(0, 3);
        var uniqueID = pagerInfo.join('_');

        // Add the activate and pause on pager hover event to each pager item.
        if (Drupal.settings.viewsSlideshowPagerFields[uniqueID][location].activatePauseOnHover) {
          $(this).children().each(function(index, pagerItem) {
            var mouseIn = function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
              Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID });
            }
            
            var mouseOut = function() {
              Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID });
            }
          
            if (jQuery.fn.hoverIntent) {
              $(pagerItem).hoverIntent(mouseIn, mouseOut);
            }
            else {
              $(pagerItem).hover(mouseIn, mouseOut);
            }
            
          });
        }
        else {
          $(this).children().each(function(index, pagerItem) {
            $(pagerItem).click(function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
            });
          });
        }
      });
    }
  };

  Drupal.viewsSlideshowPagerFields = Drupal.viewsSlideshowPagerFields || {};

  /**
   * Implement the transitionBegin hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.transitionBegin = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_'+ pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }

  };

  /**
   * Implement the goToSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.goToSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the previousSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.previousSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');

      // If we are on the first pager then activate the last pager.
      // Otherwise activate the previous pager.
      if (pagerNum == 0) {
        pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length() - 1;
      }
      else {
        pagerNum--;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + pagerNum).addClass('active');
    }
  };

  /**
   * Implement the nextSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.nextSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');
      var totalPagers = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length();

      // If we are on the last pager then activate the first pager.
      // Otherwise activate the next pager.
      pagerNum++;
      if (pagerNum == totalPagers) {
        pagerNum = 0;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + slideNum).addClass('active');
    }
  };


  /**
   * Views Slideshow Slide Counter
   */

  Drupal.viewsSlideshowSlideCounter = Drupal.viewsSlideshowSlideCounter || {};

  /**
   * Implement the transitionBegin for the slide counter.
   */
  Drupal.viewsSlideshowSlideCounter.transitionBegin = function (options) {
    $('#views_slideshow_slide_counter_' + options.slideshowID + ' .num').text(options.slideNum + 1);
  };

  /**
   * This is used as a router to process actions for the slideshow.
   */
  Drupal.viewsSlideshow.action = function (options) {
    // Set default values for our return status.
    var status = {
      'value': true,
      'text': ''
    }

    // If an action isn't specified return false.
    if (typeof options.action == 'undefined' || options.action == '') {
      status.value = false;
      status.text =  Drupal.t('There was no action specified.');
      return error;
    }

    // If we are using pause or play switch paused state accordingly.
    if (options.action == 'pause') {
      Drupal.settings.viewsSlideshow[options.slideshowID].paused = 1;
      // If the calling method is forcing a pause then mark it as such.
      if (options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 1;
      }
    }
    else if (options.action == 'play') {
      // If the slideshow isn't forced pause or we are forcing a play then play
      // the slideshow.
      // Otherwise return telling the calling method that it was forced paused.
      if (!Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce || options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].paused = 0;
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 0;
      }
      else {
        status.value = false;
        status.text += ' ' + Drupal.t('This slideshow is forced paused.');
        return status;
      }
    }

    // We use a switch statement here mainly just to limit the type of actions
    // that are available.
    switch (options.action) {
      case "goToSlide":
      case "transitionBegin":
      case "transitionEnd":
        // The three methods above require a slide number. Checking if it is
        // defined and it is a number that is an integer.
        if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
          status.value = false;
          status.text = Drupal.t('An invalid integer was specified for slideNum.');
        }
      case "pause":
      case "play":
      case "nextSlide":
      case "previousSlide":
        // Grab our list of methods.
        var methods = Drupal.settings.viewsSlideshow[options.slideshowID]['methods'];

        // if the calling method specified methods that shouldn't be called then
        // exclude calling them.
        var excludeMethodsObj = {};
        if (typeof options.excludeMethods !== 'undefined') {
          // We need to turn the excludeMethods array into an object so we can use the in
          // function.
          for (var i=0; i < excludeMethods.length; i++) {
            excludeMethodsObj[excludeMethods[i]] = '';
          }
        }

        // Call every registered method and don't call excluded ones.
        for (i = 0; i < methods[options.action].length; i++) {
          if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
            Drupal[methods[options.action][i]][options.action](options);
          }
        }
        break;

      // If it gets here it's because it's an invalid action.
      default:
        status.value = false;
        status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
    }
    return status;
  };
})(jQuery);
;
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9995 (09-AUG-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($) {

var ver = '2.9995';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	$.fn.cycle.debug && log(s);
}		
function log() {
	window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
}


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards)}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			opts.elements && $(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide)
		opts.startingSlide = parseInt(opts.startingSlide,10);
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		opts.randomIndex = 1;
		opts.startingSlide = opts.randomMap[1];
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
	  	$slides.each(function(){
	    	var $slide = $(this);
	    	$slide.css({
	      		"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
	      		"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
	    	});
	  	});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.hover(
			function(){
				pauseFlag = true;
				this.cyclePause++;
				triggerPause(cont, true);
			},
			function(){
				pauseFlag && this.cyclePause--;
				triggerPause(cont, true);
			}
		);

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length)
				opts.randomIndex = 0;
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	// stage the next transition
	var ms = 0;
	if (opts.timeout && !opts.continuous)
		ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
	else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
		ms = 10;
	if (ms > 0)
		p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards) }, ms);
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	}
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				pauseFlag && cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	activePagerClass: 'activeSlide', // class name used for the active pager link
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	aspect:		   false,  // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	backwards:     false, // true to start slideshow at last slide and move backwards through the stack
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	center: 	   null,  // set to true to have cycle add top/left margin to each slide (use with width and height options)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	containerResize: 1,	  // resize container to fit largest slide
	continuous:	   0,	  // true to start next transition immediately after current one completes
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	easing:		   null,  // easing method for both in and out transitions
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	fit:		   0,	  // force slides to fit container
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height (if the 'fit' option is true, the slides will be set to this height as well)
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	metaAttr:     'cycle',// data- attribute that holds the option data for the slideshow
	next:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	onPrevNextEvent: null,// callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	pager:		   null,  // element, jQuery object, or jQuery selector string for the element to use as pager container
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	prev:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	rev:		   0,	  // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	slideResize:   1,     // force slide width/height to fixed size before every transition
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	timeout:	   4000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	width:         null   // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (!rev === true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (!rev === true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++)
				fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);
;

/**
 *  @file
 *  A simple jQuery Cycle Div Slideshow Rotator.
 */

/**
 * This will set our initial behavior, by starting up each individual slideshow.
 */
(function ($) {
  Drupal.behaviors.viewsSlideshowCycle = {
    attach: function (context) {
      $('.views_slideshow_cycle_main:not(.viewsSlideshowCycle-processed)', context).addClass('viewsSlideshowCycle-processed').each(function() {
        var fullId = '#' + $(this).attr('id');
        var settings = Drupal.settings.viewsSlideshowCycle[fullId];
        settings.targetId = '#' + $(fullId + " :first").attr('id');
        settings.slideshowId = settings.targetId.replace('#views_slideshow_cycle_teaser_section_', '');

        settings.opts = {
          speed:settings.speed,
          timeout:settings.timeout,
          delay:settings.delay,
          sync:settings.sync,
          random:settings.random,
          nowrap:settings.nowrap,
          after:function(curr, next, opts) {
            // Need to do some special handling on first load.
            var slideNum = opts.currSlide;
            if (typeof settings.processedAfter == 'undefined' || !settings.processedAfter) {
              settings.processedAfter = 1;
              slideNum = (typeof settings.opts.startingSlide == 'undefined') ? 0 : settings.opts.startingSlide;
            }
            Drupal.viewsSlideshow.action({ "action": 'transitionEnd', "slideshowID": settings.slideshowId, "slideNum": slideNum });
          },
          before:function(curr, next, opts) {
            // Remember last slide.
            if (settings.remember_slide) {
              createCookie(settings.vss_id, opts.currSlide + 1, settings.remember_slide_days);
            }

            // Make variable height.
            if (!settings.fixed_height) {
              //get the height of the current slide
              var $ht = $(this).height();
              //set the container's height to that of the current slide
              $(this).parent().animate({height: $ht});
            }

            // Need to do some special handling on first load.
            var slideNum = opts.nextSlide;
            if (typeof settings.processedBefore == 'undefined' || !settings.processedBefore) {
              settings.processedBefore = 1;
              slideNum = (typeof settings.opts.startingSlide == 'undefined') ? 0 : settings.opts.startingSlide;
            }

            Drupal.viewsSlideshow.action({ "action": 'transitionBegin', "slideshowID": settings.slideshowId, "slideNum": slideNum });
          },
          cleartype:(settings.cleartype)? true : false,
          cleartypeNoBg:(settings.cleartypenobg)? true : false
        }

        // Set the starting slide if we are supposed to remember the slide
        if (settings.remember_slide) {
          var startSlide = readCookie(settings.vss_id);
          if (startSlide == null) {
            startSlide = 0;
          }
          settings.opts.startingSlide =  startSlide;
        }

        if (settings.effect == 'none') {
          settings.opts.speed = 1;
        }
        else {
          settings.opts.fx = settings.effect;
        }

        // Take starting item from fragment.
        var hash = location.hash;
        if (hash) {
          var hash = hash.replace('#', '');
          var aHash = hash.split(';');
          var aHashLen = aHash.length;

          // Loop through all the possible starting points.
          for (var i = 0; i < aHashLen; i++) {
            // Split the hash into two parts. One part is the slideshow id the
            // other is the slide number.
            var initialInfo = aHash[i].split(':');
            // The id in the hash should match our slideshow.
            // The slide number chosen shouldn't be larger than the number of
            // slides we have.
            if (settings.slideshowId == initialInfo[0] && settings.num_divs > initialInfo[1]) {
              settings.opts.startingSlide = parseInt(initialInfo[1]);
            }
          }
        }

        // Pause on hover.
        if (settings.pause) {
          var mouseIn = function() {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId });
          }
          
          var mouseOut = function() {
            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": settings.slideshowId });
          }
          
          if (jQuery.fn.hoverIntent) {
            $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hoverIntent(mouseIn, mouseOut);
          }
          else {
            $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hover(mouseIn, mouseOut);
          }
        }

        // Pause on clicking of the slide.
        if (settings.pause_on_click) {
          $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).click(function() {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId, "force": true });
          });
        }

        if (typeof JSON != 'undefined') {
          var advancedOptions = JSON.parse(settings.advanced_options);
          for (var option in advancedOptions) {
            advancedOptions[option] = $.trim(advancedOptions[option]);
            advancedOptions[option] = advancedOptions[option].replace(/\n/g, '');
            if (!isNaN(parseInt(advancedOptions[option]))) {
              advancedOptions[option] = parseInt(advancedOptions[option]);
            }
            else if (advancedOptions[option].toLowerCase() == 'true') {
              advancedOptions[option] = true;
            }
            else if (advancedOptions[option].toLowerCase() == 'false') {
              advancedOptions[option] = false;
            }

            switch(option) {

              // Standard Options
              case "activePagerClass":
              case "allowPagerClickBubble":
              case "autostop":
              case "autostopCount":
              case "backwards":
              case "bounce":
              case "cleartype":
              case "cleartypeNoBg":
              case "containerResize":
              case "continuous":
              case "delay":
              case "easeIn":
              case "easeOut":
              case "easing":
              case "fastOnEvent":
              case "fit":
              case "fx":
              case "height":
              case "manualTrump":
              case "metaAttr":
              case "next":
              case "nowrap":
              case "pager":
              case "pagerEvent":
              case "pause":
              case "pauseOnPagerHover":
              case "prev":
              case "prevNextEvent":
              case "random":
              case "randomizeEffects":
              case "requeueOnImageNotLoaded":
              case "requeueTimeout":
              case "rev":
              case "slideExpr":
              case "slideResize":
              case "speed":
              case "speedIn":
              case "speedOut":
              case "startingSlide":
              case "sync":
              case "timeout":
              case "width":
                settings.opts[option] = advancedOptions[option];
                break;

              // These process options that look like {top:50, bottom:20}
              case "animIn":
              case "animOut":
              case "cssBefore":
              case "cssAfter":
              case "shuffle":
                settings.opts[option] = eval('(' + advancedOptions[option] + ')');
                break;

              // These options have their own functions.
              case "after":
                // transition callback (scope set to element that was shown): function(currSlideElement, nextSlideElement, options, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  eval(advancedOptions[option]);
                }
                break;

              case "before":
                // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  eval(advancedOptions[option]);
                }
                break;

              case "end":
                // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
                settings.opts[option] = function(options) {
                  eval(advancedOptions[option]);
                }
                break;

              case "fxFn":
                // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag) {
                  eval(advancedOptions[option]);
                }
                break;

              case "onPagerEvent":
                settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                  eval(advancedOptions[option]);
                }
                break;

              case "onPrevNextEvent":
                settings.opts[option] = function(isNext, zeroBasedSlideIndex, slideElement) {
                  eval(advancedOptions[option]);
                }
                break;

              case "pagerAnchorBuilder":
                // callback fn for building anchor links:  function(index, DOMelement)
                settings.opts[option] = function(index, DOMelement) {
                  var returnVal = '';
                  eval(advancedOptions[option]);
                  return returnVal;
                }
                break;

              case "pagerClick":
                // callback fn for pager clicks:    function(zeroBasedSlideIndex, slideElement)
                settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                  eval(advancedOptions[option]);
                }
                break;

              case "timeoutFn":
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  eval(advancedOptions[option]);
                }
                break;

              case "updateActivePagerLink":
                // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
                settings.opts[option] = function(pager, currSlideIndex) {
                  eval(advancedOptions[option]);
                }
                break;
            }
          }
        }

        // If selected wait for the images to be loaded.
        // otherwise just load the slideshow.
        if (settings.wait_for_image_load) {
          // For IE/Chrome/Opera we if there are images then we need to make
          // sure the images are loaded before starting the slideshow.
          settings.totalImages = $(settings.targetId + ' img').length;
          if (settings.totalImages) {
            settings.loadedImages = 0;

            // Add a load event for each image.
            $(settings.targetId + ' img').each(function() {
              var $imageElement = $(this);
              $imageElement.bind('load', function () {
                Drupal.viewsSlideshowCycle.imageWait(fullId);
              });

              // Removing the source and adding it again will fire the load event.
              var imgSrc = $imageElement.attr('src');
              $imageElement.attr('src', '');
              $imageElement.attr('src', imgSrc);
            });
          }
          else {
            Drupal.viewsSlideshowCycle.load(fullId);
          }
        }
        else {
          Drupal.viewsSlideshowCycle.load(fullId);
        }
      });
    }
  };

  Drupal.viewsSlideshowCycle = Drupal.viewsSlideshowCycle || {};

  // This checks to see if all the images have been loaded.
  // If they have then it starts the slideshow.
  Drupal.viewsSlideshowCycle.imageWait = function(fullId) {
    if (++Drupal.settings.viewsSlideshowCycle[fullId].loadedImages == Drupal.settings.viewsSlideshowCycle[fullId].totalImages) {
      Drupal.viewsSlideshowCycle.load(fullId);
    }
  };

  // Start the slideshow.
  Drupal.viewsSlideshowCycle.load = function (fullId) {
    var settings = Drupal.settings.viewsSlideshowCycle[fullId];
    $(settings.targetId).cycle(settings.opts);

    // Start Paused
    if (settings.start_paused) {
      Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId, "force": true });
    }

    // Pause if hidden.
    if (settings.pause_when_hidden) {
      var checkPause = function(settings) {
        // If the slideshow is visible and it is paused then resume.
        // otherwise if the slideshow is not visible and it is not paused then
        // pause it.
        var visible = viewsSlideshowCycleIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
        if (visible) {
          Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": settings.slideshowId });
        }
        else {
          Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId });
        }
      }

      // Check when scrolled.
      $(window).scroll(function() {
       checkPause(settings);
      });

      // Check when the window is resized.
      $(window).resize(function() {
        checkPause(settings);
      });
    }
  };

  Drupal.viewsSlideshowCycle.pause = function (options) {
    $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('pause');
  };

  Drupal.viewsSlideshowCycle.play = function (options) {
    Drupal.settings.viewsSlideshowCycle['#views_slideshow_cycle_main_' + options.slideshowID].paused = false;
    $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('resume');
  };

  Drupal.viewsSlideshowCycle.previousSlide = function (options) {
    $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('prev');
  };

  Drupal.viewsSlideshowCycle.nextSlide = function (options) {
    $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('next');
  };

  Drupal.viewsSlideshowCycle.goToSlide = function (options) {
    $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle(options.slideNum);
  };

  // Verify that the value is a number.
  function IsNumeric(sText) {
    var ValidChars = "0123456789";
    var IsNumber=true;
    var Char;

    for (var i=0; i < sText.length && IsNumber == true; i++) {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1) {
        IsNumber = false;
      }
    }
    return IsNumber;
  }

  /**
   * Cookie Handling Functions
   */
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else {
      var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

  /**
   * Checks to see if the slide is visible enough.
   * elem = element to check.
   * type = The way to calculate how much is visible.
   * amountVisible = amount that should be visible. Either in percent or px. If
   *                it's not defined then all of the slide must be visible.
   *
   * Returns true or false
   */
  function viewsSlideshowCycleIsVisible(elem, type, amountVisible) {
    // Get the top and bottom of the window;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var docViewLeft = $(window).scrollLeft();
    var docViewRight = docViewLeft + $(window).width();

    // Get the top, bottom, and height of the slide;
    var elemTop = $(elem).offset().top;
    var elemHeight = $(elem).height();
    var elemBottom = elemTop + elemHeight;
    var elemLeft = $(elem).offset().left;
    var elemWidth = $(elem).width();
    var elemRight = elemLeft + elemWidth;
    var elemArea = elemHeight * elemWidth;

    // Calculate what's hiding in the slide.
    var missingLeft = 0;
    var missingRight = 0;
    var missingTop = 0;
    var missingBottom = 0;

    // Find out how much of the slide is missing from the left.
    if (elemLeft < docViewLeft) {
      missingLeft = docViewLeft - elemLeft;
    }

    // Find out how much of the slide is missing from the right.
    if (elemRight > docViewRight) {
      missingRight = elemRight - docViewRight;
    }

    // Find out how much of the slide is missing from the top.
    if (elemTop < docViewTop) {
      missingTop = docViewTop - elemTop;
    }

    // Find out how much of the slide is missing from the bottom.
    if (elemBottom > docViewBottom) {
      missingBottom = elemBottom - docViewBottom;
    }

    // If there is no amountVisible defined then check to see if the whole slide
    // is visible.
    if (type == 'full') {
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
      && (elemLeft >= docViewLeft) && (elemRight <= docViewRight)
      && (elemLeft <= docViewRight) && (elemRight >= docViewLeft));
    }
    else if(type == 'vertical') {
      var verticalShowing = elemHeight - missingTop - missingBottom;

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((verticalShowing/elemHeight)*100) >= parseInt(amountVisible));
      }
      else {
        return (verticalShowing >= parseInt(amountVisible));
      }
    }
    else if(type == 'horizontal') {
      var horizontalShowing = elemWidth - missingLeft - missingRight;

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((horizontalShowing/elemWidth)*100) >= parseInt(amountVisible));
      }
      else {
        return (horizontalShowing >= parseInt(amountVisible));
      }
    }
    else if(type == 'area') {
      var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((areaShowing/elemArea)*100) >= parseInt(amountVisible));
      }
      else {
        return (areaShowing >= parseInt(amountVisible));
      }
    }
  }
})(jQuery);
;
(function ($) {

$(document).ready(function() {

  // Accepts a string; returns the string with regex metacharacters escaped. The returned string
  // can safely be used at any point within a regex to match the provided literal string. Escaped
  // characters are [ ] { } ( ) * + ? - . , \ ^ $ # and whitespace. The character | is excluded
  // in this function as it's used to separate the domains names.
  RegExp.escapeDomains = function(text) {
    return (text) ? text.replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&") : '';
  }

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");
      // Expression to check for the sites cross domains.
      var isCrossDomain = new RegExp("^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\/.*(" + RegExp.escapeDomains(ga.trackCrossDomains) + ")", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href) {
          if (ga.trackDomainMode == 2 && isCrossDomain.test(this.href)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            _gaq.push(["_link", this.href]);
          }
          else if (ga.trackOutboundAsPageview) {
            // Track all external links as page views after URL cleanup.
            // Currently required, if click should be tracked as goal.
            _gaq.push(["_trackPageview", '/outbound/' + this.href.replace(/^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\//i, '').split('/').join('--')]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });
});

})(jQuery);
;
