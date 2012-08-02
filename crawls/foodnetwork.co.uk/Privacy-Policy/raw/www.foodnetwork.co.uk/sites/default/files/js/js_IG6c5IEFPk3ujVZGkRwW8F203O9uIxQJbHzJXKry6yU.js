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

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        setTimeout(function () { $('#cboxTitle', context).slideUp() }, 1500);
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
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
// $Id: hint.js,v 1.4 2009/12/20 02:05:12 quicksketch Exp $
(function ($) {

/**
 * The Drupal behavior to add the $.hint() behavior to elements.
 */
Drupal.behaviors.hint = {};
Drupal.behaviors.hint.attach = function(content) {
  // Even though it's unlikely that another class name would be used, we ensure
  // that the behavior uses the default class names used in the module.
  jQuery('input.hint-enabled:not(input.hint)', content).hint({
    hintClass: 'hint',
    triggerClass: 'hint-enabled'
  });
};

/**
 * The jQuery method $.hint().
 *
 * This method can be used on any text field or password element and is not
 * Drupal-specific. Any elements using hint must have a "title" attribute,
 * which will be used as the hint.
 */
jQuery.fn.hint = function(options) {
  var opts = jQuery.extend(false, jQuery.fn.hint.defaults, options);

  $(this).find('input').andSelf().filter('[type=text], [type=password]').each(function() {
    if (this.title) {
      var attributes = opts.keepAttributes;
      var $element = $(this);
      var $placeholder = $('<input type="textfield" value="" />');

      // Set the attributes on our placeholder.
      for (var key in attributes) {
        var attribute = attributes[key];
        $placeholder.attr(attribute, $element.get(0)[attribute]);
      }
      $placeholder.val($element.get(0).title);
      $placeholder.get(0).autocomplete = false;
      $placeholder.removeClass(opts.triggerClass).addClass(opts.hintClass);
      $element.after($placeholder);
      if ($element.val() == '') {
        $element.hide();
      }
      else {
        $placeholder.hide();
      }

      $placeholder.focus(function() {
        $placeholder.hide();
        $element.show().get(0).focus();
      });
      $element.blur(function() {
        if (this.value == '') {
          $element.hide();
          $placeholder.show();
        }
      });
    }
  });
};

jQuery.fn.hint.defaults = {
  // The class given the textfield containing the hint.
  hintClass: 'hint',

  // A class that will trigger the hint if $.hint() is used on multiple
  // elements or the entire page.
  triggerClass: 'hint-enabled',

  // A list of attributes that will be copied to the placeholder element.
  // Usually this list will be sufficient, but a special list may be specified
  // if needing to keep custom or obscure attributes.
  keepAttributes: ['style', 'className', 'title', 'size']
};

})(jQuery);
;
//set debug to debug=1 to see adcalls in page
var debug = 0;
// set dev to dev=1 to point to Dev Adservers vs. Production Adservers
var dev = 0;

// base url paths for dev & production ( iframe and javascript ) verions
var devAdserverBasePathJS = "http://devadsremote.scrippsnetworks.com/js.ng/";
var devAdserverBasePathHTML = "http://devadsremote.scrippsnetworks.com/html.ng/";
var adserverBasePathJS = "http://adsremote.scrippsnetworks.com/js.ng/";
var adserverBasePathHTML = "http://adsremote.scrippsnetworks.com/html.ng/";
var multiAdBasePathHTML = "http://adsremote.scrippsnetworks.com/";
var devMultiAdBasePathHTML = "http://devadsremote.scrippsnetworks.com/";

//sets defined adtype to render as Iframes
function adRestrictionIframe(site, adtype, pos, category, vgncontent, subsection, topic, uniqueId, adkey1, adkey2, keywords){
	if(adtype == 'UK_LEADERBOARD' || adtype == 'UK_BIGBOX' || adtype == 'UK_SLIVER' || adtype == 'UK_TOWER'){ return true; }
	else{ return false; }
}

// sets defined name value pairs to be inactive and not render on the page based on name value pairs set
function adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, uniqueId, adkey1, adkey2, keywords){
	if(adtype == '' || adtype == null || adtype == undefined ){return true;}
	else{return false;}	
}
;
﻿// FOOD TV MAIN AD LIBRARY 

// tile value global per page load ( allows Ad to sync together from 1 advertiser for own a page functionality )
var tile = Math.floor(Math.random()*999999);
var searchCategory = 'undefined';
var searchBusiness = 'undefined';
var searchLocation = 'undefined';
var searchType = 'undefined';
var minPrice = 'undefined';
var maxPrice = 'undefined';
var propertyType = 'undefined';
var bedrooms = 'undefined';
var radius = 'undefined';
var cookieString = '';
var searchString = document.location.search;
searchString = searchString.substring(1); // strip off the leading '?'


function readUrlCookie(){
var nvPairs = searchString.split("&");
	if(nvPairs.length != 1){
		for (i = 0; i < nvPairs.length; i++){
     		var nvPair = nvPairs[i].split("=");
     		var name = nvPair[0];
     		var value = nvPair[1];
	 
	 		switch(name){
	 			case "category":
				searchCategory = value;
				break;
				case "business":
				searchBusiness = value;
				break;
				case "location":
				searchLocation = value;
				break;
				case "domain":
				searchType = value;
				brea;k
				case "min":
				minPrice = value;
				break;
				case "max":
				maxPrice = value;
				break;
				case "type":
				propertyType = value;
				break;
				case "bedrooms":
				bedrooms = value;
				break;
				case "radius":
				radius = value;
				break;
				default:
				value;
				break;
	 		}
		
			cookieString += name + "=" + value + ";";
		}
		
        // write search values into cookie for session targeting across site
		document.cookie = escape(cookieString);	
	}else{
		//reading and splitting the whole cookie
		var whole_cookie = unescape(document.cookie);
		var each_cookie = whole_cookie.split(";");

		for (i = 0; i < each_cookie.length; i++){
			var nvPair = each_cookie[i].split("=");
     			var name = nvPair[0];
     			var value = nvPair[1];
			if (each_cookie[i].indexOf("category") > -1){searchCategory = nvPair[1];}
			if (each_cookie[i].indexOf("business") > -1){searchBusiness = nvPair[1];}
			if (each_cookie[i].indexOf("location") > -1){searchLocation = nvPair[1];}
			if (each_cookie[i].indexOf("domain") > -1){searchType = nvPair[1];}
			if (each_cookie[i].indexOf("min") > -1){minPrice = nvPair[1];}
			if (each_cookie[i].indexOf("max") > -1){maxPrice = nvPair[1];}
			if (each_cookie[i].indexOf("type") > -1){propertyType = nvPair[1];}
			if (each_cookie[i].indexOf("bedrooms") > -1){bedrooms = nvPair[1];}
			if (each_cookie[i].indexOf("radius") > -1){radius = nvPair[1];}
		}
	}
}

readUrlCookie();


////////////begin debug & dev environment check switch cases ///////////////////////////
function devCheckHTML(){
	switch (dev){
		case 0: var adUrl = adserverBasePathHTML; return adUrl; break;
		case 1: var adUrl = devAdserverBasePathHTML; return adUrl; break;
		default: var adUrl = adserverBasePathHTML; return adUrl; break;
	}
}
function mutliDevCheckHTML(){
	switch (dev){
		case 0: var adUrl = multiAdBasePathHTML; return adUrl; break;
		case 1: var adUrl = devMultiAdBasePathHTML; return adUrl; break;
		default: var adUrl = multiAdBasePathHTML; return adUrl; break;
	}
}
function devCheckJS(){
	switch (dev){
		case 0: var adUrl = adserverBasePathJS; return adUrl; break;
		case 1: var adUrl = devAdserverBasePathJS; return adUrl; break;
		default: var adUrl = adserverBasePathJS; return adUrl; break;
	}
}
function debugCheck(adCallHolder, fullAdCall){
	switch(debug){
		case 0: document.write(fullAdCall); break;
		case 1: document.write('<div style="background:black;color:white;">'+ adCallHolder +'</div>' + fullAdCall); break;
		default: document.write(fullAdCall); break;
	}
}
////////////end debug & dev environment check switch cases ///////////////////////////

// converts all metadata parameters to uppercase, converts special characters to underscores
function convert(value){
    var re = /\$|,| |@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
	if(value == '' || value == null || value == undefined){return;}
	var valueHolder = value.toUpperCase();
	valueHolder = valueHolder.replace(re, "_");
	return valueHolder;
}

// builds full adcall UrL. Checks for empty metadata parameters and excludes them from the adcall string if empty.
function buildExpandedUrl(adtype, adsize, pos, adUrl, ord){

	var adCallString = adUrl + 'site=' + site;
	if(category != ''){adCallString += '&category=' + convert(category);}
	if(vgncontent != ''){adCallString += '&vgncontent=' + convert(vgncontent);}
	if(subsection != ''){adCallString += '&subsection=' + convert(subsection);}
	if(subsection2 != ''){adCallString += '&subsection2=' + convert(subsection2);}
	
	/*
	if(pca != ''){adCallString += '&pca=' + convert(pca);}
	if(pcd != ''){adCallString += '&pcd=' + convert(pcd);}
	if(pcs != ''){adCallString += '&pcs=' + convert(pcs);}
	if(postcode != ''){adCallString += '&postcode=' + convert(postcode);}
	if(acorn != 0){adCallString += '&acorn=' + convert(acorn);}
	*/
	
	if(topic != ''){adCallString += '&topic=' + convert(topic);}
	if(adkey1 != ''){adCallString += '&adkey1=' + convert(adkey1);}
	if(adkey2 != ''){adCallString += '&adkey2=' + convert(adkey2);}
	adCallString += '&adtype=' + convert(adtype);
	adCallString += '&pagepos=' + pos;
	adCallString += '&uniqueid=' + convert(uniqueId);
	adCallString += '&ord=' + ord;
	adCallString += '&tile=' + tile;
	if(keywords != ''){
	var searchString = '';
	var words = keywords.split(",");
	for(i = 0; i < words.length; i++) { searchString += '&keyword=' + convert(words[i]);}
	adCallString += searchString;
	}
	
	if(searchCategory != 'undefined'){adCallString += '&searchCat=' + convert(searchCategory);}
	if(searchBusiness != 'undefined'){adCallString += '&searchBus=' + convert(searchBusiness);}
	if(searchLocation != 'undefined' ){adCallString += '&searchLoc=' + convert(searchLocation);}
	if(searchType != 'undefined' ){adCallString += '&searchType=' + convert(searchType);}
	if(minPrice != 'undefined' ){adCallString += '&minPrice=' + convert(minPrice);}
	if(maxPrice != 'undefined' ){adCallString += '&maxPrice=' + convert(maxPrice);}
	if(propertyType != 'undefined' ){adCallString += '&propertyType=' + convert(propertyType);}
	if(bedrooms != 'undefined' ){adCallString += '&bedrooms=' + convert(bedrooms);}
	if(radius != 'undefined' ){adCallString += '&radius=' + convert(radius);}
	return adCallString ;
}

// builds Javascript mark for Multi Logo or Multi Textlinks and doc.write to html page.
function buildMultiUrl(adtype, pos, adUrl){
	var ord = Math.floor(Math.random()*999999);
	var adsize ='';
	var adCallHolder = buildExpandedUrl(adtype, adsize, pos, adUrl, ord);
	var fullAdCall = '<script type="text/javascript" src="'+ adCallHolder + '"></script>';
	switch(debug){
			case 0:
				document.write(fullAdCall);
			break;
			case 1:
				document.write('<div style="background:black;color:white;width:500px;">'+ adCallHolder +'</div>' + fullAdCall);
			break;
			default:
				document.write(fullAdCall);
			break;
		}
}

// builds flat url for Flash Video Player to ingest for preroll, midroll, postroll, & overlays
function buildVideoUrl(adtype, adsize, pos, adUrl){
	var ord = Math.floor(Math.random()*999999);
	return buildExpandedUrl(adtype, adsize, pos, adUrl, ord);
}

// building Ad JavaScript or Iframe html mark up and doc.write to html page
function buildUrl(adtype, adsize, pos, adUrl, width, height){
this.frameborder = 0;
this.marginheight = 0;
this.marginwidth = 0;
this.scrolling = 'no';
var baseString = /html.ng/;
var searchHolder = adUrl.search(baseString);
var ord = Math.floor(Math.random()*999999);
var adCallHolder = buildExpandedUrl(adtype, adsize, pos, adUrl, ord);


if(searchHolder != -1){
	var fullAdCall = '<iframe src ="'+ adCallHolder + '" align ="'+this.align+'" frameborder ="'+this.frameborder+'" height ="'+ height +'" longdesc ="'+this.longdesc+'" marginheight ="'+this.marginheight+'" marginwidth ="'+this.marginwidth+'" name ="'+ adtype + '_IFRAME" scrolling ="'+this.scrolling+'" width ="'+ width +'"></iframe>';
		debugCheck(adCallHolder, fullAdCall);
	}else{
		var fullAdCall = '<script type="text/javascript" src="'+ adCallHolder + '"></script>';
		debugCheck(adCallHolder, fullAdCall);
	}
}

// master Ad function ( handes iframe & active checks and diverts to iframe / javascript logic branches
function sndAd(adtype, adsize, pos, width, height) {
	if(pos < 0 || pos == undefined) {pos = 1;}
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
		if(adRestrictionIframe(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == true){		
			var adUrl = devCheckHTML();
			buildUrl(adtype, adsize, pos, adUrl, width, height);
		}else{
			var adUrl = devCheckJS();
			buildUrl(adtype, adsize, pos, adUrl, width, height);
		}	
	}else{
		return;
	}	
}



////////// begin main display Ad functions ///////////////
function LeaderboardAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_LEADERBOARD', '',  pos, '728', '90');
}

function UtilityAd(pos) {
	if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_UTILITY', '',  pos, '1', '1');
}



////////// begin main display Ad functions ///////////////
function SuperSkyAd(pos) {
        if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_WIDE_TOWER', '',  pos, '160', '600');
}
function SkyAd(pos) {
        if(pos < 0 || pos == undefined || pos=='') {pos = 1;} sndAd('UK_TOWER', '',  pos, '160', '600');
}
function MpuAd(pos) {
        if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_BIGBOX', '', pos, '300', '250');
}
function SliverAd(pos) {
        if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_SLIVER', '', pos, '800', '30');
}
function WideIntAd(pos) {
        if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_WIDE_INTEGRATED', '', pos, '', '');
}
function FatIntAd(pos) {
        if(pos < 0 || pos == undefined) {pos = 1;} sndAd('UK_FAT_INTEGRATED', '', pos, '', '');
}
///////// end main display Ad functions ////////////////






//Video Ad functions
function VideoPlayerAd(adtype, adsize, pos) {
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
		var adUrl = devCheckHTML();
		var videoUrlHolder = buildVideoUrl(adtype, adsize, pos, adUrl);
		return videoUrlHolder;
	}
}

//Flash Video Player calls this function to pull back preroll, midroll, postroll or overlay XML from Dart 
function getDartEnterpriseUrl(adtype,pos){
   		adtype = adtype.toUpperCase();
   		var strUrl = VideoPlayerAd(adtype,'', pos);
   		return strUrl;
}

//Flash Video Player calls this function to pass sync banner url from XML back to html page
function setDartEnterpriseBanner(adType, sync_banner) {
	if (adType == 'UK_LEADERBOARD') {
	  if($("#leaderboard").length > 0) {
			boxW = 728;
			boxH = 90;
			$("#leaderboard").html("<iframe src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}
	} else { // assumes adType == 'BIGBOX' or should
		if($("#bigbox").length > 0) {
			boxW = 300;
			boxH = 250;
			if (sync_banner.indexOf("336x850") > -1) {
				boxW = 336;
				boxH = 850;
			} else if (sync_banner.indexOf("300x600") > -1)	{
				boxW = 300;
				boxH = 600;
			}
			$("#bigbox").html("<iframe src='" + sync_banner + "\' width=\'" + boxW + "\' height=\'" + boxH + "\'" + "frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>");
		}
	}
	return;
}

// multiple sponsor logo tag
function MultiLogoAd(adtype,logoNum) {
	if (logoNum == undefined || logoNum == '' || logoNum > 4 || logoNum < 1) { logoNum = 4; }
	if (adtype == undefined || adtype == '') { adtype = 'LOGO';	}
	var file = "snDigitalLogoUK" + logoNum + ".html?";
	var pos = 1;
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
			var adUrl = mutliDevCheckHTML();
			adUrl += file;
			buildMultiUrl(adtype, pos, adUrl);
	}else{
		return;
	}	
}

// multiple text link ad tag
function sponsorLinks(adtype,linkNum) {
	if (linkNum == undefined || linkNum == '' || linkNum > 6 || linkNum < 1) { linkNum = 6; }
	if (adtype == undefined || adtype == '') { adtype = 'SPONSORSHIP';	}
	var file = "sndTextlinksUK" + linkNum + ".html?";
	var pos = 1;
	if(adRestrictionActive(site, adtype, pos, category, vgncontent, subsection, topic, adkey1, adkey2, uniqueId) == false){
			var adUrl = mutliDevCheckHTML();
			adUrl += file;
			buildMultiUrl(adtype, pos, adUrl);
	}else{
		return;
	}	
}

function dartTrack(url){
	var container = document.getElementById('dartTrackDiv').innerHTML = "<iframe src=\'" + url + "\' frameborder=\'0\' scrolling=\'no\' width=\'1\' height=\'1\' style=\'display:none;\'><\/iframe>";
	return true ;
}

// end main ad library (written by T.Overstreet 3/27/2009 );
