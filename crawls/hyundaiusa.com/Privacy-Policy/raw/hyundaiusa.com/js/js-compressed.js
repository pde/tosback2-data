/*
 * jQuery Address Plugin v1.0
 * http://www.asual.com/jquery/address/
 *
 * Copyright (c) 2009 Rostislav Hristov
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-04-28 16:54:00 +0300 (Tue, 28 Apr 2009)
 * Revision: 399
 */
if(typeof jquery_address != "undefined"){
(function(a){a.address=(function(){var c=function(i){a(this).trigger(a.extend(a.Event(i),(function(){var af={value:this.value(),path:this.path(),pathNames:this.pathNames(),parameterNames:this.parameterNames(),parameters:{},queryString:this.queryString()};for(var ae=0,p=af.parameterNames.length;ae<p;ae++){af.parameters[af.parameterNames[ae]]=this.parameter(af.parameterNames[ae])}return af}).call(this)))};var U=function(){c.call(a.address,"init")};var n=function(){c.call(a.address,"change")};var O=function(){var i=T.href.indexOf("#");return i!=-1?ac(o(T.href.substr(i+1))):""};var g=function(){try{top.document;return top}catch(i){return window}};var E=function(p,i){if(B.strict){p=i?(p.substr(0,1)!="/"?"/"+p:p):(p==""?"/":p)}return p};var q=function(i,p){return(h&&T.protocol=="file:")?(p?P.replace(/\?/,"%3F"):P.replace(/%253F/,"?")):i};var ad=function(ag){for(var ae=0,p=ag.childNodes.length,af;ae<p;ae++){if(ag.childNodes[ae].src){k=String(ag.childNodes[ae].src)}if(af=ad(ag.childNodes[ae])){return af}}};var W=function(){if(!s){var p=O();var i=!(P==p);if(t&&r<523){if(D!=X.length){D=X.length;if(typeof z[D-1]!=F){P=z[D-1]}S()}}else{if(h&&i){if(r<7){T.reload()}else{G.value(p)}}else{if(i){P=p;S()}}}}};var S=function(){n();m(v,10)};var v=function(){var p=(T.pathname+(/\/$/.test(T.pathname)?"":"/")+C.value()).replace(/\/\//,"/").replace(/^\/$/,"");var i=window[B.tracker];if(typeof i==f){i(p)}else{if(typeof pageTracker!=F&&typeof pageTracker._trackPageview==f){pageTracker._trackPageview(p)}else{if(typeof urchinTracker==f){urchinTracker(p)}}}};var e=function(){var i=w.contentWindow.document;i.open();i.write("<html><head><title>"+aa.title+"</title><script>var "+x+' = "'+O()+'";<\/script></head></html>');i.close()};var M=function(){if(!R){R=true;a("a").attr("xref",function(){return a(this).attr("href")});if(h&&r<8){aa.body.innerHTML='<iframe id="'+x+'" src="javascript:false;" width="0" height="0"></iframe>'+aa.body.innerHTML;w=aa.getElementById(x);m(function(){a(w).bind("load",function(){var i=w.contentWindow;var p=i.location.href;P=(typeof i[x]!=F?i[x]:"");if(P!=O()){S();T.hash=q(P,true)}});if(typeof w.contentWindow[x]==F){e()}},50)}else{if(t){if(r<418){a(aa.body).append('<form id="'+x+'" style="position:absolute;top:-9999px;" method="get"></form>');I=aa.getElementById(x)}if(typeof T[x]==F){T[x]={}}if(typeof T[x][T.pathname]!=F){z=T[x][T.pathname].split(",")}}}m(function(){U();n();v()},1);if(h&&r>=8){aa.body.onhashchange=W}else{u(W,50)}a("a").attr("href",function(){return a(this).attr("xref")}).removeAttr("xref");a("a[rel*=address:]").address()}};var C={baseURL:function(){var i=T.href;if(i.indexOf("#")!=-1){i=i.substr(0,i.indexOf("#"))}if(i.substr(i.length-1)=="/"){i=i.substr(0,i.length-1)}return i},strict:function(){return B.strict},history:function(){return B.history},tracker:function(){return B.tracker},title:function(){return aa.title},value:function(){if(!Z){return null}return o(E(q(P,false),false))},path:function(){var i=this.value();return(i.indexOf("?")!=-1)?i.split("?")[0]:i},pathNames:function(){var p=this.path();var i=p.split("/");if(p.substr(0,1)=="/"||p.length==0){i.splice(0,1)}if(p.substr(p.length-1,1)=="/"){i.splice(i.length-1,1)}return i},queryString:function(){var p=this.value();var i=p.indexOf("?");return(i!=-1&&i<p.length)?p.substr(i+1):""},parameter:function(aj){var ag=this.value();var ae=ag.indexOf("?");if(ae!=-1){ag=ag.substr(ae+1);var ai=ag.split("&");var ah,af=ai.length;while(af--){ah=ai[af].split("=");if(ah[0]==aj){return ah[1]}}}},parameterNames:function(){var af=this.value();var p=af.indexOf("?");var ag=[];if(p!=-1){af=af.substr(p+1);if(af!=""&&af.indexOf("=")!=-1){var ah=af.split("&");var ae=0;while(ae<ah.length){ag.push(ah[ae].split("=")[0]);ae++}}}return ag}};var G={strict:function(i){B.strict=i},history:function(i){B.history=i},tracker:function(i){B.tracker=i},title:function(i){m(function(){H=aa.title=i;if(J&&w&&w.contentWindow&&w.contentWindow.document){w.contentWindow.document.title=i;J=false}if(!L&&Y){T.replace(T.href.indexOf("#")!=-1?T.href:T.href+"#")}L=false},50)},value:function(ae){ae=ac(o(E(ae,true)));if(ae=="/"){ae=""}if(P==ae){return}L=true;P=ae;s=true;S();z[X.length]=P;if(t){if(B.history){T[x][T.pathname]=z.toString();D=X.length+1;if(r<418){if(T.search==""){I.action="#"+P;I.submit()}}else{if(r<523||P==""){var i=aa.createEvent("MouseEvents");i.initEvent("click",true,true);var p=aa.createElement("a");p.href="#"+P;p.dispatchEvent(i)}else{T.hash="#"+P}}}else{T.replace("#"+P)}}else{if(P!=O()){if(B.history){T.hash="#"+q(P,true)}else{T.replace("#"+P)}}}if((h&&r<8)&&B.history){m(e,50)}if(t){m(function(){s=false},1)}else{s=false}}};var x="jQueryAddress",f="function",F="undefined",A=a.browser,r=parseFloat(a.browser.version),Y=A.mozilla,h=A.msie,K=A.opera,t=A.safari,Z=false,N=g(),aa=N.document,X=N.history,T=N.location,u=setInterval,m=setTimeout,o=decodeURI,ac=encodeURI,ab=navigator.userAgent,w,I,k,H=aa.title,D=X.length,s=false,R=false,L=true,J=true,z=[],y={},P=O(),j={},B={history:true,strict:true};if(h){r=parseFloat(ab.substr(ab.indexOf("MSIE")+4))}Z=(Y&&r>=1)||(h&&r>=6)||(K&&r>=9.5)||(t&&r>=312);if(Z){for(var V=1;V<D;V++){z.push("")}z.push(O());if(h&&T.hash!=O()){T.hash="#"+q(O(),true)}if(K){history.navigationMode="compatible"}ad(document);var b=k.indexOf("?");if(k&&b>-1){var l,d=k.substr(b+1).split("&");for(var V=0,Q;Q=d[V];V++){l=Q.split("=");if(/^(history|strict)$/.test(l[0])){B[l[0]]=(isNaN(l[1])?/^(true|yes)$/i.test(l[1]):(parseInt(l[1])!=0))}if(/^tracker$/.test(l[0])){B[l[0]]=l[1]}}}a(M)}else{if((!Z&&T.href.indexOf("#")!=-1)||(t&&r<418&&T.href.indexOf("#")!=-1&&T.search!="")){aa.open();aa.write('<html><head><meta http-equiv="refresh" content="0;url='+T.href.substr(0,T.href.indexOf("#"))+'" /></head></html>');aa.close()}else{v()}}a.each(("init,change").split(","),function(ae,p){j[p]=function(af,i){a(a.address).bind(p,i||af,i&&af);return this}});a.each(("baseURL,strict,history,tracker,title,value").split(","),function(ae,p){j[p]=function(i){if(typeof i!="undefined"){if(Z){G[p](i)}return a.address}else{return C[p]()}}});a.each(("path,pathNames,queryString,parameter,parameterNames").split(","),function(ae,p){j[p]=function(i){return C[p](i)}});return j})();a.fn.address=function(b){a(this).click(function(){var c=b?b.call(this):/address:/.test(a(this).attr("rel"))?a(this).attr("rel").split("address:")[1].split(" ")[0]:a(this).attr("href").replace(/^#/,"");a.address.value(c);return false})}}(jQuery));
}/*

jQuery Browser Plugin
	* Version 2.3
	* 2008-09-17 19:27:05
	* URL: http://jquery.thewikies.com/browser
	* Description: jQuery Browser Plugin extends browser detection capabilities and can assign browser selectors to CSS classes.
	* Author: Nate Cavanaugh, Minhchau Dang, & Jonathan Neal
	* Copyright: Copyright (c) 2008 Jonathan Neal under dual MIT/GPL license.
	* JSLint: This javascript file passes JSLint verification.
*//*jslint
		bitwise: true,
		browser: true,
		eqeqeq: true,
		forin: true,
		nomen: true,
		plusplus: true,
		undef: true,
		white: true
*//*global
		jQuery
*/

(function ($) {
	$.browserTest = function (a, z) {
		var u = 'unknown', x = 'X', m = function (r, h) {
			for (var i = 0; i < h.length; i = i + 1) {
				r = r.replace(h[i][0], h[i][1]);
			}

			return r;
		}, c = function (i, a, b, c) {
			var r = {
				name: m((a.exec(i) || [u, u])[1], b)
			};

			r[r.name] = true;

			r.version = (c.exec(i) || [x, x, x, x])[3];

			if (r.name.match(/safari/) && r.version > 400) {
				r.version = '2.0';
			}

			if (r.name === 'presto') {
				r.version = ($.browser.version > 9.27) ? 'futhark' : 'linear_b';
			}
			r.versionNumber = parseFloat(r.version, 10) || 0;
			r.versionX = (r.version !== x) ? (r.version + '').substr(0, 1) : x;
			r.className = r.name + r.versionX;

			return r;
		};

		a = (a.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? m(a, [
			[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''],
			['Chrome Safari', 'Chrome'],
			['KHTML', 'Konqueror'],
			['Minefield', 'Firefox'],
			['Navigator', 'Netscape']
		]) : a).toLowerCase();

		if (!z) {
			$.browser = $.extend((!z) ? $.browser : {}, c(a, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
		}

		$.layout = c(a, /(gecko|konqueror|msie|opera|webkit)/, [
			['konqueror', 'khtml'],
			['msie', 'trident'],
			['opera', 'presto']
		], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);

		$.os = {
			name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris')
		};

		if (!z) {			
			$('html').addClass([$.os.name, $.browser.name, $.browser.className, $.layout.name, $.layout.className].join(' '));			
		}
	};

	$.browserTest(navigator.userAgent, $.browser.safari ? true : false);
})(jQuery);
/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-07-21 19:45:56 -0400 (Sat, 21 Jul 2007) $
 * $Rev: 2447 $
 *
 * Version 2.1.1
 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);/*
 * jQuery clueTip plugin
 * Version 1.0.4  (June 28, 2009)
 * @requires jQuery v1.2.6+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
/*
 *
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 *
 * Examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 *
*/

;(function($) { 
  $.cluetip = {version: '1.0.4'};
  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $cluetipWait, $dropShadow, imgCount;
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      return this.unbind('.cluetip');
    }
    return this.each(function(index) {
      var link = this, $this = $(this);
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(true, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = +opts.cluezIndex;
      $this.data('thisInfo', {title: link.title, zIndex: cluezIndex});
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $(['<div id="cluetip">',
          '<div id="cluetip-outer">',
            '<div id="cluetip-title"></div>',
            '<div id="cluetip-inner"></div>',
			'<div class="cluetip-bottom"></div>' + 
          '</div>',
		  '<div id="cluetip-topRight"></div>',
          '<div id="cluetip-bottomLeft"></div>',
          '<div id="cluetip-arrows" class="cluetip-arrows"></div>',
        '</div>'].join(''))
        [insertionType](insertionElement).hide();
        
        $cluetip = $('#cluetip').css({position: 'absolute'});
        $cluetipOuter = $('#cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
        $cluetipInner = $('#cluetip-inner');
        $cluetipTitle = $('#cluetip-title');        
        $cluetipArrows = $('#cluetip-arrows');
        $cluetipWait = $('<div id="cluetip-waitimage"></div>')
          .css({position: 'absolute'}).insertBefore($cluetip).hide();
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-1, opacity:.1, top: 1+i, left: 1+i}));
        };
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass, opClass = opts.cluetipAddClass;
      if (!tipAttribute && !opts.splitTitle && !js) return true;
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'),10)||0) + (parseInt($cluetip.css('paddingRight'),10)||0) + dropShadowSteps,
          linkWidth = this.offsetWidth,
		  linkHeight = this.offsetHeight,
          linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if(tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }
      
      var localContent;
      function returnFalse() { return false; }

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
		$cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
	  } else if (opts.positionBy == 'fixed_left') {
        posX = linkLeft - lOffset - tipWidth;
        $cluetip.css({left: posX});
		$cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
	  } else if (opts.positionBy == 'topBottom' || opts.positionBy == 'bottomTop') {
        posX = linkLeft - tipWidth/2 - lOffset;
        $cluetip.css({left: posX});
		$cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({
          left: (posX > 0 && opts.positionBy != 'bottomTop' && opts.positionBy != 'topBottom') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0),
          zIndex: $this.data('thisInfo').zIndex
        });
        $cluetipArrows.css({zIndex: $this.data('thisInfo').zIndex+1});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tipParts[0]);
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }          
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') != 0) {
        if (/\.(jpe?g|tiff?|gif|png)$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;
          var ajaxSettings = {
            cache: false, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $this.data('thisInfo').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');  
                }
              }
            },
            success: function(data, textStatus) {       
              cluetipContents = opts.ajaxProcess.call(link, data);
              if (isActive) {
                if (optionSuccess) {optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);}
                $cluetipInner.html(cluetipContents);
              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);}
              imgCount = $('#cluetip-inner img').length;
              if (imgCount && !$.browser.opera) {
                $('#cluetip-inner img').bind('load error', function() {
                  imgCount--;
                  if (imgCount<1) {
                    $cluetipWait.hide();
                    if (isActive) cluetipShow(pY);
                  }
                }); 
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              } 
            }
          };
          var ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);
          
          $.ajax(ajaxMergedSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local) {
        
        var $localContent = $(tipAttribute + (/#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html('&nbsp;') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipInner) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipInner);
        $closeLink.bind('click.cluetip', function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          $cluetip.bind('mouseleave.cluetip', function() {
            cluetipClose();
          });
        } else {
          $cluetip.unbind('mouseleave.cluetip');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({zIndex: $this.data('thisInfo').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;

      if (opts.positionBy == 'fixed' || opts.positionBy == 'fixed_left') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop' || opts.positionBy == 'topBottom') {
        if ((posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) || opts.positionBy == 'topBottom') {   
		  tipY = (opts.positionBy == 'topBottom') ? posY - tipHeight - tOffset : mouseY - tipHeight - tOffset;         
          direction = 'top';
        } else { 		
          tipY = (opts.positionBy == 'bottomTop') ? posY + linkHeight - tOffset : mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
	  if(opClass != ''){		
		$cluetip.addClass(' ' + opClass);
	  }
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.open != 'show' && opts.fx.openSpeed);
      if (opts.dropShadow) { $dropShadow.css({height: tipHeight, width: tipInnerWidth, zIndex: $this.data('thisInfo').zIndex-1}).show(); }
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // delayed close (not fully tested)
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
        clearTimeout(closeOnDelay);        
      };
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass();
      opts.onHide.call(link, $cluetip, $cluetipInner);
      $this.removeClass('cluetip-clicked');
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) $cluetipArrows.css({top: ''});
    };

    $(document).bind('hideCluetip', function(e) {
      cluetipClose();
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.bind('focus.cluetip', function(event) {
          activate(event);
        });
        $this.bind('blur.cluetip', function(event) {
          inactivate(event);
        });
  // activate by hover
      } else {
        // clicking is returned false if clickThrough option is set to false
        $this[opts.clickThrough ? 'unbind' : 'bind']('click', returnFalse);
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove.cluetip');}
          });           
        } else {
          $this.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $this.unbind('mousemove.cluetip');
          });
        }
        // remove default title tooltip on hover
        $this.bind('mouseenter.cluetip', function(event) {
          $this.attr('title','');
        })
        .bind('mouseleave.cluetip', function(event) {
          $this.attr('title', $this.data('thisInfo').title);
        });
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto','mouse','bottomTop','topBottom','fixed','fixed_left'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    localPrefix:      null,       // string to be prepended to the tip attribute if local is true
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    escapeTitle:      false,    // whether to html escape the title attribute
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
	cluetipAddClass:  '',       // class added to outermost clueTip div and displayed exactly as entered to style special cases.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs
    
    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // short-circuit function to run just before clueTip is shown. 
    onActivate:       function(e) {return true;},

    // function to run just after clueTip is shown. 
    onShow:           function(ct, ci){},
    // function to run just after clueTip is hidden.
    onHide:           function(ct, ci){},
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend, 
    // will be queued first within the default callbacks. 
    // The only exception is error, which overrides the default
    ajaxSettings: {
                      // error: function(ct, ci) { /* override default error callback */ }
                      // beforeSend: function(ct, ci) { /* called first within default beforeSend callback }
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';

  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//**
 * --------------------------------------------------------------------
 * jQuery-Plugin "executePngFix"
 * Version: 1.2, 09.03.2009
 * by Andreas Eberhard, andreas.eberhard@gmail.com
 *                      http://jquery.andreaseberhard.de/
 *
 * Copyright (c) 2007 Andreas Eberhard
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Changelog:
 *    09.03.2009 Version 1.2
 *    - Update for jQuery 1.3.x, removed @ from selectors
 *    11.09.2007 Version 1.1
 *    - removed noConflict
 *    - added png-support for input type=image
 *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
 *    31.05.2007 initial Version 1.0
 * --------------------------------------------------------------------
 * @example $(function(){$(document).executePngFix();});
 * @desc Fixes all PNG's in the document on document.ready
 *
 * jQuery(function(){jQuery(document).executePngFix();});
 * @desc Fixes all PNG's in the document on document.ready when using noConflict
 *
 * @example $(function(){$('div.examples').executePngFix();});
 * @desc Fixes all PNG's within div with class examples
 *
 * @example $(function(){$('div.examples').executePngFix( { blankgif:'ext.gif' } );});
 * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
 * --------------------------------------------------------------------
 */

(function($) {

jQuery.fn.executePngFix = function(settings) {

	// Settings
	settings = jQuery.extend({
		blankgif: 'blank.gif'
	}, settings);

	var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
	var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);

	if (jQuery.browser.msie && (ie55 || ie6)) {

		//fix images with png-source
		jQuery(this).find("img[src$=.png]").each(function() {

			jQuery(this).attr('width',jQuery(this).width());
			jQuery(this).attr('height',jQuery(this).height());

			var prevStyle = '';
			var strNewHTML = '';
			var imgId = (jQuery(this).attr('id')) ? 'id="' + jQuery(this).attr('id') + '" ' : '';
			var imgClass = (jQuery(this).attr('class')) ? 'class="' + jQuery(this).attr('class') + '" ' : '';
			var imgTitle = (jQuery(this).attr('title')) ? 'title="' + jQuery(this).attr('title') + '" ' : '';
			var imgAlt = (jQuery(this).attr('alt')) ? 'alt="' + jQuery(this).attr('alt') + '" ' : '';
			var imgAlign = (jQuery(this).attr('align')) ? 'float:' + jQuery(this).attr('align') + ';' : '';
			var imgHand = (jQuery(this).parent().attr('href')) ? 'cursor:hand;' : '';
			if (this.style.border) {
				prevStyle += 'border:'+this.style.border+';';
				this.style.border = '';
			}
			if (this.style.padding) {
				prevStyle += 'padding:'+this.style.padding+';';
				this.style.padding = '';
			}
			if (this.style.margin) {
				prevStyle += 'margin:'+this.style.margin+';';
				this.style.margin = '';
			}
			var imgStyle = (this.style.cssText);

			strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
			strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
			strNewHTML += 'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;';
			strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + jQuery(this).attr('src') + '\', sizingMethod=\'scale\');';
			strNewHTML += imgStyle+'"></span>';
			if (prevStyle != ''){
				strNewHTML = '<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:' + jQuery(this).width() + 'px;' + 'height:' + jQuery(this).height() + 'px;'+'">' + strNewHTML + '</span>';
			}

			jQuery(this).hide();
			jQuery(this).after(strNewHTML);

		});

		// fix css background pngs
		jQuery(this).find("*").each(function(){
			var bgIMG = jQuery(this).css('background-image');
			if(bgIMG.indexOf(".png")!=-1){
				var iebg = bgIMG.split('url("')[1].split('")')[0];
				jQuery(this).css('background-image', 'none');
				jQuery(this).get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + iebg + "',sizingMethod='scale')";
			}
		});
		
		//fix input with png-source
		jQuery(this).find("input[src$=.png]").each(function() {
			var bgIMG = jQuery(this).attr('src');
			jQuery(this).get(0).runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader' + '(src=\'' + bgIMG + '\', sizingMethod=\'scale\');';
   		jQuery(this).attr('src', settings.blankgif)
		});
	
	}
	
	return jQuery;

};

})(jQuery);
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 2.4.3
------------------------------------------------------------------------- */

var $pp_pic_holder;
var $ppt;

(function($) {
	$.fn.prettyPhoto = function(settings) {
		// global Variables
		var doresize = true;
		var percentBased = false;
		var imagesArray = [];
		var setPosition = 0; /* Position in the set */
		var pp_contentHeight;
		var pp_contentWidth;
		var pp_containerHeight;
		var pp_containerWidth;
		var pp_type = 'image';
	
		// Global elements
		var $caller;
		var $scrollPos = _getScroll();
	
		$(window).scroll(function(){ $scrollPos = _getScroll(); _centerPicture(); });
		$(window).resize(function(){ _centerPicture(); _resizeOverlay(); });
		$(document).keypress(function(e){
			switch(e.keyCode){
				case 37:
					if (setPosition == 1) return;
					changePicture('previous');
					break;
				case 39:
					if (setPosition == setCount) return;
					changePicture('next');
					break;
				case 27:
					close();
					break;
			};
	    });
 
	
		settings = jQuery.extend({
			animationSpeed: 'normal', /* fast/slow/normal */
			padding: 40, /* padding for each side of the picture */
			opacity: 0.80, /* Value between 0 and 1 */
			showTitle: false, /* true/false */
			allowresize: true, /* true/false */
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'light_rounded', /* light_rounded / dark_rounded / light_square / dark_square */
			pp_type: 'image', /* youtube , iframe, ajax, image, movie, flash */
			iframeWidth: 750,
			iframeHeight: 450,
			modalSection: '',
			flashPlayer: 'flashPlayer.flv',
			callback: function(){}
		}, settings);
		
	
		$(this).each(function(){
			var hasTitle = false;
			var isSet = false;
			var setCount = 0; /* Total images in the set */
			var arrayPosition = 0; /* Total position in the array */
			
			imagesArray[imagesArray.length] = this;
			$(this).bind('click',function(){
				open(this);
				return false;
			});
		});
	
		function open(el) {
			$caller = $(el);
		
			var iframeWidth = $caller.attr('href');
			var iframeHeight = $caller.attr('href');
		
			// Find out if the picture is part of a set
			theRel = $caller.attr('rel');
			galleryRegExp = /\[(?:.*)\]/;
			theGallery = galleryRegExp.exec(theRel);
		
			// Calculate the number of items in the set, and the position of the clicked picture.
			isSet = false;
			setCount = 0;
			
			_getFileType();
			
			for (i = 0; i < imagesArray.length; i++){
				if($(imagesArray[i]).attr('rel').indexOf(theGallery) != -1){
					setCount++;
					if(setCount > 1) isSet = true;

					if($(imagesArray[i]).attr('href') == $caller.attr('href')){
						setPosition = setCount;
						arrayPosition = i;
					};
				};
			};
		
			_buildOverlay();

			// Display the current position
			$pp_pic_holder.find('p.currentTextHolder').text(setPosition + settings.counter_separator_label + setCount);

			// Position the picture in the center of the viewing area
			_centerPicture();
		
			$('#pp_full_res').hide();
			$pp_pic_holder.find('.pp_loaderIcon').show();
		};
	
		showimage = function(width,height,containerWidth,containerHeight,contentHeight,contentWidth,resized){
			$('.pp_loaderIcon').hide();

			if($.browser.opera) {
				windowHeight = window.innerHeight;
				windowWidth = window.innerWidth;
			}else{
				windowHeight = $(window).height();
				windowWidth = $(window).width();
			};

			$pp_pic_holder.find('.pp_content').animate({'height':contentHeight},settings.animationSpeed);

			projectedTop = $scrollPos['scrollTop'] + ((windowHeight/2) - (containerHeight/2));
			if(projectedTop < 0) projectedTop = 0 + $pp_pic_holder.find('.ppt').height();

			// Resize the holder
			$pp_pic_holder.animate({
				'top': projectedTop,
				'left': ((windowWidth/2) - (containerWidth/2)),
				'width': containerWidth
			},settings.animationSpeed,function(){
				$pp_pic_holder.width(containerWidth);
				$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(height).width(width);

				// Fade the new image
				$pp_pic_holder.find('#pp_full_res').fadeIn(settings.animationSpeed,function(){
					$(this).find('object,embed').css('visibility','visible');
				});

				// Show the nav elements
				_showContent();
			
				// Fade the resizing link if the image is resized
				if(resized) $('a.pp_expand,a.pp_contract').fadeIn(settings.animationSpeed);
			});
		};
		
		function _showContent(){
			// Show the nav
			if(isSet && pp_type=="image") { $pp_pic_holder.find('.pp_hoverContainer').fadeIn(settings.animationSpeed); }else{ $pp_pic_holder.find('.pp_hoverContainer').hide(); }
			$pp_pic_holder.find('.pp_details').fadeIn(settings.animationSpeed);
			
			// Show the title
			if(settings.showTitle && hasTitle){
				$ppt.css({
					'display' : 'none'
				});
			
				$ppt.fadeIn(settings.animationSpeed);
			};
			settings.callback();
		}
		
		function _hideContent(){
			// Fade out the current picture
			$pp_pic_holder.find('.pp_hoverContainer,.pp_details').fadeOut(settings.animationSpeed);
			$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');
			$pp_pic_holder.find('#pp_full_res').fadeOut(settings.animationSpeed,function(){
				$('.pp_loaderIcon').show();
			
				// Preload the image
				_preload();
			});
			
			// Hide the title
			$ppt.fadeOut(settings.animationSpeed);
		}
	
		function changePicture(direction){
			if(direction == 'previous') {
				arrayPosition--;
				setPosition--;
			}else{
				arrayPosition++;
				setPosition++;
			};

			// Allow the resizing of the images
			if(!doresize) doresize = true;

			_hideContent();
			$('a.pp_expand,a.pp_contract').fadeOut(settings.animationSpeed,function(){
				$(this).removeClass('pp_contract').addClass('pp_expand');
			});
		};
	
		function close(){
			$pp_pic_holder.find('object,embed').css('visibility','hidden');
			
			$('div.pp_pic_holder,div.ppt').fadeOut(settings.animationSpeed);
			
			$('div.pp_overlay').fadeOut(settings.animationSpeed, function(){
				$('div.pp_overlay,div.pp_pic_holder,div.ppt').remove();
			
				// To fix the bug with IE select boxes
				if($.browser.msie && $.browser.version == 6){
					$('select').css('visibility','visible');
				};
				
				
			});
			
			doresize = true;
		};
	
		function _checkPosition(){
			// If at the end, hide the next link
			if(setPosition == setCount) {
				$pp_pic_holder.find('a.pp_next').css('visibility','hidden');
				$pp_pic_holder.find('a.pp_arrow_next').addClass('disabled').unbind('click');
			}else{ 
				$pp_pic_holder.find('a.pp_next').css('visibility','visible');
				$pp_pic_holder.find('a.pp_arrow_next.disabled').removeClass('disabled').bind('click',function(){
					changePicture('next');
					return false;
				});
			};
		
			// If at the beginning, hide the previous link
			if(setPosition == 1) {
				$pp_pic_holder.find('a.pp_previous').css('visibility','hidden');
				$pp_pic_holder.find('a.pp_arrow_previous').addClass('disabled').unbind('click');
			}else{
				$pp_pic_holder.find('a.pp_previous').css('visibility','visible');
				$pp_pic_holder.find('a.pp_arrow_previous.disabled').removeClass('disabled').bind('click',function(){
					changePicture('previous');
					return false;
				});
			};
		
			// Change the current picture text
			var counterSection = (settings.modalSection == '') ? ' gallery items' : ' ' + settings.modalSection;
			
			$pp_pic_holder.find('p.currentTextHolder').text('Viewing '+setPosition + settings.counter_separator_label + setCount+counterSection);
		
			$caller = (isSet) ? $(imagesArray[arrayPosition]) : $caller;
			_getFileType();

			if($caller.attr('title')){
				$pp_pic_holder.find('.pp_description').show().html(unescape($caller.attr('title')));
			}else{
				$pp_pic_holder.find('.pp_description').hide().text('');
			};

			if($caller.attr('download')){
				$pp_pic_holder.find('.content_button').show();
				$pp_pic_holder.find('.content_button').attr('href',$caller.attr('download'));
			}else{
				$pp_pic_holder.find('.content_button').hide();
			};

			if($caller.attr('dimension')){
				$pp_pic_holder.find('.image_dimension').show().html(unescape($caller.attr('dimension')));
			}else{
				$pp_pic_holder.find('.image_dimension').hide().text('');
			};

			if($caller.attr('size')){
				$pp_pic_holder.find('.image_size').show().html(unescape($caller.attr('size')));
			}else{
				$pp_pic_holder.find('.image_size').hide().text('');
			};
		
			if($caller.find('img').attr('alt') && settings.showTitle){
				hasTitle = true;
				$ppt.html(unescape($caller.find('img').attr('alt')));
			}else{
				hasTitle = false;
			};
		};
	
		function _fitToViewport(width,height){
			hasBeenResized = false;
		
			_getDimensions(width,height);
			
			// Define them in case there's no resize needed
			imageWidth = width;
			imageHeight = height;

			windowHeight = $(window).height();
			windowWidth = $(window).width();
		
			if( ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allowresize && !percentBased) {
				hasBeenResized = true;
				notFitting = true;
			
				while (notFitting){
					if((pp_containerWidth > windowWidth)){
						imageWidth = (windowWidth - 200);
						imageHeight = (height/width) * imageWidth;
					}else if((pp_containerHeight > windowHeight)){
						imageHeight = (windowHeight - 200);
						imageWidth = (width/height) * imageHeight;
					}else{
						notFitting = false;
					};

					pp_containerHeight = imageHeight;
					pp_containerWidth = imageWidth;
				};
			
				_getDimensions(imageWidth,imageHeight);
			};

			return {
				width:imageWidth,
				height:imageHeight,
				containerHeight:pp_containerHeight,
				containerWidth:pp_containerWidth,
				contentHeight:pp_contentHeight,
				contentWidth:pp_contentWidth,
				resized:hasBeenResized
			};
		};
		
		function _getDimensions(width,height){
			$pp_pic_holder.find('.pp_details').width(width); /* To have the correct height */
			
			// Get the container size, to resize the holder to the right dimensions
			pp_contentHeight = height + $pp_pic_holder.find('.pp_details').height() + parseFloat($pp_pic_holder.find('.pp_details').css('marginTop')) + parseFloat($pp_pic_holder.find('.pp_details').css('marginBottom'));
			pp_contentWidth = width;
			pp_containerHeight = pp_contentHeight + $pp_pic_holder.find('.ppt').height() + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
			pp_containerWidth = width + settings.padding;
		}
	
		function _getFileType(){
		var cAttr = $caller.attr('href');
			if (cAttr.match(/youtube\.com\/watch/i)) {
				pp_type = 'youtube';
			}else if(cAttr.indexOf('.mov') != -1){ 
				pp_type = 'quicktime';
			}else if(cAttr.indexOf('.swf') != -1){
				pp_type = 'flash';
			}else if(cAttr.indexOf('iframe') != -1){
				pp_type = 'iframe';
			}else if(cAttr.indexOf('.flv') != -1){
			pp_type = 'flv'
			}else if(cAttr.indexOf('.jpg') != -1 || cAttr.indexOf('.png') != -1 || cAttr.indexOf('.gif') != -1 || cAttr.indexOf('.bmp') != -1){
				pp_type = 'image';
			}else{
			pp_type = settings.pp_type;
			}
		}
	
		function _centerPicture(){
			if ($pp_pic_holder){ if($pp_pic_holder.size() == 0){ return; }}else{ return; }; //Make sure the gallery is open

			if($.browser.opera) {
				windowHeight = window.innerHeight;
				windowWidth = window.innerWidth;
			}else{
				windowHeight = $(window).height();
				windowWidth = $(window).width();
			};
		
			if(doresize) {
				$pHeight = $pp_pic_holder.height();
				$pWidth = $pp_pic_holder.width();
				$tHeight = $ppt.height();
				
				projectedTop = (windowHeight/2) + $scrollPos['scrollTop'] - ($pHeight/2);
				if(projectedTop < 0) projectedTop = 0 + $tHeight;
				
				$pp_pic_holder.css({
					'top': projectedTop,
					'left': (windowWidth/2) + $scrollPos['scrollLeft'] - ($pWidth/2)
				});

			};
		};
	
		function _preload(){
			// Hide the next/previous links if on first or last images.
			_checkPosition();
		
			if(pp_type == 'image'){
				// Set the new image
				imgPreloader = new Image();
		
				// Preload the neighbour images
				nextImage = new Image();
				if(isSet && setPosition > setCount) nextImage.src = $(imagesArray[arrayPosition + 1]).attr('href');
				prevImage = new Image();
				if(isSet && imagesArray[arrayPosition - 1]) prevImage.src = $(imagesArray[arrayPosition - 1]).attr('href');

				pp_typeMarkup = '<img id="fullResImage" src="" />';				
				$pp_pic_holder.find('#pp_full_res')[0].innerHTML = pp_typeMarkup;

				$pp_pic_holder.find('.pp_content').css('overflow','hidden');
				$pp_pic_holder.find('#fullResImage').attr('src',$caller.attr('href'));

				imgPreloader.onload = function(){
					var correctSizes = _fitToViewport(imgPreloader.width,imgPreloader.height);
					imgPreloader.width = correctSizes['width'];
					imgPreloader.height = correctSizes['height'];
					showimage(imgPreloader.width,imgPreloader.height,correctSizes["containerWidth"],correctSizes["containerHeight"],correctSizes["contentHeight"],correctSizes["contentWidth"],correctSizes["resized"]);
				};
		
				imgPreloader.src = $caller.attr('href');
			}else{
				// Get the dimensions
				content_width = ( parseFloat(grab_param('width',$caller.attr('rel'))) ) ? grab_param('width',$caller.attr('rel')) : "425";
				content_height = ( parseFloat(grab_param('height',$caller.attr('rel'))) ) ? grab_param('height',$caller.attr('rel')) : "344";
				
				// If pp_type is AJAX
				if(pp_type == 'ajax') {
					content_width = ( parseFloat($('.pp_ajax').css('width')) ) ? $('.pp_ajax').css('width') : "784";
					content_height = ( parseFloat($('.pp_ajax').css('height')) ) ? $('.pp_ajax').css('height') : "353";
				}
				
				if (pp_type == 'iframe') {
					content_width = grab_param('width', $caller.attr('href')) || settings.iframeWidth + '';
					content_height = grab_param('height', $caller.attr('href')) || settings.iframeHeight + '';
				}
				
				// If the size is % based
				if(content_width.indexOf('%') != -1 || content_height.indexOf('%') != -1){
					content_height = ($(window).height() * parseFloat(content_height) / 100) - 100;
					content_width = ($(window).width() * parseFloat(content_width) / 100) - 100;
					parsentBased = true;
				}else{
					content_height = parseFloat(content_height);
					content_width = parseFloat(content_width);
				}
				
				if(pp_type == 'quicktime'){ content_height+=13; }
				
				// Fit them to viewport
				correctSizes = _fitToViewport(content_width,content_height);
				
				if(pp_type == 'youtube'){
					pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://www.youtube.com/v/'+grab_param('v',$caller.attr('href'))+'" /><embed src="http://www.youtube.com/v/'+grab_param('v',$caller.attr('href'))+'" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'"></embed></object>';
				}else if(pp_type == 'quicktime'){
					pp_typeMarkup = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="'+correctSizes['height']+'" width="'+correctSizes['width']+'"><param name="src" value="'+$caller.attr('href')+'"><param name="autoplay" value="true"><param name="type" value="video/quicktime"><embed src="'+$caller.attr('href')+'" height="'+correctSizes['height']+'" width="'+correctSizes['width']+'" autoplay="true" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>';
				}else if(pp_type == 'flash'){
					flash_vars = $caller.attr('href');
					flash_vars = flash_vars.substring($caller.attr('href').indexOf('flashvars') + 10,$caller.attr('href').length);

					filename = $caller.attr('href');
					filename = filename.substring(0,filename.indexOf('?'));

					pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'"><param name="allowfullscreen" value="true" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /><param name="movie" value="'+filename+'?'+flash_vars+'" /><embed src="'+filename+'?'+flash_vars+'" type="application/x-shockwave-flash" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'"></embed></object>';
				}else if(pp_type == 'flv'){
					flash_player = settings.flashPlayer;
					filename = $caller.attr('href');

					pp_typeMarkup = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="'+flash_player+'"/><param name="bgcolor" value="#000000"/><param name="wmode" value="transparent"/><param name="flashvars" value="video='+filename+'&width='+correctSizes['width']+'&height='+correctSizes['height']+'"/><embed src="'+flash_player+'"  type="application/x-shockwave-flash" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" width="'+correctSizes['width']+'" height="'+correctSizes['height']+'" flashvars="video='+filename+'&width='+correctSizes['width']+'&height='+correctSizes['height']+'"></embed></object>';
				}else if(pp_type == 'iframe'){
					movie_url = $caller.attr('href');
					movie_url = movie_url.substr(0,movie_url.indexOf('iframe')-1);
					var setIframeWidth = (settings.iframeWidth == 0) ? correctSizes['width']-10 : settings.iframeWidth;
					var setIframeHight = (settings.iframeHeight == 0) ? correctSizes['width']-10 : settings.iframeHeight;
					pp_typeMarkup = '<iframe src ="'+movie_url+'" width="'+setIframeWidth+'" height="'+setIframeHight+'" frameborder="no"></iframe>';
				}else if(pp_type == 'ajax') {
					hrefUrl = $caller.attr('href');
					ajaxUrl = hrefToAjax(hrefUrl);
					$.get(ajaxUrl,function (data) {
						$pp_pic_holder.find('#pp_full_res')[0].innerHTML = data;
					});
				} 
				// Append HTML
				if(pp_type != 'ajax') {
					$pp_pic_holder.find('#pp_full_res')[0].innerHTML = pp_typeMarkup;
				}
				
				// Show content
				showimage(correctSizes['width'],correctSizes['height'],correctSizes["containerWidth"],correctSizes["containerHeight"],correctSizes["contentHeight"],correctSizes["contentWidth"],correctSizes["resized"]);
			}
		};
	
		function _getScroll(){
			if (self.pageYOffset) {
				scrollTop = self.pageYOffset;
				scrollLeft = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
				scrollTop = document.documentElement.scrollTop;
				scrollLeft = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				scrollTop = document.body.scrollTop;
				scrollLeft = document.body.scrollLeft;	
			}
			
			return {scrollTop:scrollTop,scrollLeft:scrollLeft};
		};
	
		function _resizeOverlay() {
			$('div.pp_overlay').css({
				'height':$(document).height(),
				'width':$(window).width()
			});
		};
	
		function _buildOverlay(){
			toInject = "";
			
			// Build the background overlay div
			toInject += "<div class='pp_overlay'></div>";
			
			// Define the markup to append, depending on the content type.
			if(pp_type == 'image'){
				pp_typeMarkup = '<img id="fullResImage" src="" />';
			}else{
				pp_typeMarkup = '';
			}
			
			// Basic HTML for the picture holder
			toInject += '<div class="pp_ajax"></div><div class="pp_pic_holder"><div class="pp_content"><a class="pp_close" href="#">Close</a><a href="#" class="pp_expand" title="Expand the image">Expand</a><div class="pp_loaderIcon"></div><div class="pp_hoverContainer"><a class="pp_next" href="#">next</a><a class="pp_previous" href="#">previous</a></div><div id="pp_full_res">'+ pp_typeMarkup +'</div><div class="pp_details clearfix"><p class="pp_description"></p><p class="currentTextHolder">0'+settings.counter_separator_label+'0</p><div style="padding-top:5px;width:100px;float:right;margin-right:80px;margin-bottom:10px;"><a href="#" class="content_button" target="_blank" style="width:100px;">Download Image</a><p class="image_dimension" style="padding-bottom:0px;"></p><p class="image_size"></p></div><div class="ppt"></div><div class="pp_nav"><a href="#" class="pp_arrow_previous">Previous</a><a href="#" class="pp_arrow_next">Next</a></div></div></div></div>';
			
			$('body').append(toInject);
			
			// Set my global selectors
			$pp_pic_holder = $('.pp_pic_holder');
			$ppt = $('.ppt');
			
			$('div.pp_overlay').css('height',$(document).height()).bind('click',function(){
				close();
			});
			
			$('.pp_ajax').css('display','none');

			$pp_pic_holder.css({'opacity': 0}).addClass(settings.theme);

			$('a.pp_close').bind('click',function(){ close(); return false; });

			$('a.pp_expand').bind('click',function(){				
				$this = $(this);
				
				// Expand the image
				if($this.hasClass('pp_expand')){
					$this.removeClass('pp_expand').addClass('pp_contract');
					doresize = false;
				}else{
					$this.removeClass('pp_contract').addClass('pp_expand');
					doresize = true;
				};
			
				_hideContent();
				
				$pp_pic_holder.find('.pp_hoverContainer, #pp_full_res, .pp_details').fadeOut(settings.animationSpeed,function(){
					_preload();
				});
		
				return false;	
			});
		
			$pp_pic_holder.find('.pp_previous, .pp_arrow_previous').bind('click',function(){
				changePicture('previous');
				return false;
			});
		
			$pp_pic_holder.find('.pp_next, .pp_arrow_next').bind('click',function(){
				changePicture('next');
				return false;
			});

			$pp_pic_holder.find('.pp_hoverContainer').css({
				'margin-left': settings.padding/2
			});
		
			// If it's not a set, hide the links
			if(!isSet) {
				$pp_pic_holder.find('.pp_hoverContainer,.pp_nav').hide();
			};


			// To fix the bug with IE select boxes
			if($.browser.msie && $.browser.version == 6){
				$('body').addClass('ie6');
				$('select').css('visibility','hidden');
			};

			// Then fade it in
			$('div.pp_overlay').css('opacity',0).fadeTo(settings.animationSpeed,settings.opacity, function(){
				$pp_pic_holder.css('opacity',0).fadeIn(settings.animationSpeed,function(){
					$pp_pic_holder.attr('style','left:'+$pp_pic_holder.css('left')+';top:'+$pp_pic_holder.css('top')+';');
					_preload();
				});
			});
		};
	};

	function hrefToAjax (hrefURL) {
		return hrefURL;
		//NOTE: Removed SEO page call from Pretty Photo
		/*var reg = "^(.*)\/([^\/]+)\/([^\.]+)\.(.*)$";
		var regex = new RegExp(reg);
		
		var hrefURL = hrefURL;
		var temp = regex.exec(hrefURL);
		
		var ajaxURL = RegExp.$1 + '/ajax/' + RegExp.$2 + '/' + RegExp.$3 + '.' + RegExp.$4;
		if( ajaxURL != null)
			return ajaxURL;
		else
			return '';*/
	}	
	
	function grab_param(name,url){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  if( results == null )
	    return "";
	  else
	    return results[1];
	}
})(jQuery);
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);/*
  PHP style date() plugin
  Call in exactly the same way as you do the "date" command in PHP
  e.g. s = $.PHPDate("l, jS F Y", dtDate);

  License:
  PHPDate 1.0 jQuery Plugin

  Copyright (c) 2008 Jon Combe (http://joncom.be)

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
*/

(function($) {
  var aDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var aMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // main function
  $.PHPDate = function(sString, dtDate) {
    var sElement = "";
    var sOutput = "";

    // we can cheat with "r"...
    sString = sString.replace(/r/g, "D, j M Y H;i:s O");

    // loop through string
    for (var i = 0; i < sString.length; i++) {
      sElement = sString.charAt(i);
      switch (sElement) {
        case "a": sElement = AMPM(dtDate.getHours()); break;
        case "c":
          sElement = (dtDate.getFullYear() + "-" +
                      AddLeadingZero(dtDate.getMonth()) + "-" +
                      AddLeadingZero(dtDate.getDate()) + "T" +
                      AddLeadingZero(dtDate.getHours()) + ":" +
                      AddLeadingZero(dtDate.getMinutes()) + ":" +
                      AddLeadingZero(dtDate.getSeconds()));
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            sElement += sTemp.substr(sTemp.indexOf("-"));
          } else if (sTemp.indexOf("+") > -1) {
            sElement += sTemp.substr(sTemp.indexOf("+"));
          } else {
            sElement += "+0000";
          }
          break;
        case "d": sElement = AddLeadingZero(dtDate.getDate()); break;
        case "g": sElement = TwelveHourClock(dtDate.getHours()); break;
        case "h": sElement = AddLeadingZero(TwelveHourClock(dtDate.getHours())); break;
        case "i": sElement = AddLeadingZero(dtDate.getMinutes()); break;
        case "j": sElement = dtDate.getDate(); break;
        case "l": sElement = aDays[dtDate.getDay()]; break;
        case "m": sElement = AddLeadingZero(dtDate.getMonth() + 1); break;
        case "n": sElement = dtDate.getMonth() + 1; break;
        case "o": (new Date(FirstMonday(dtDate.getFullYear())) > dtDate) ? sElement = (dtDate.getFullYear() - 1) : sElement = dtDate.getFullYear(); break;
        case "s": sElement = AddLeadingZero(dtDate.getSeconds()); break;
        case "t":
          var dtTemp = new Date(dtDate.valueOf());
          dtTemp.setMonth(dtTemp.getMonth() + 1)
          dtTemp.setDate(0);
          sElement = dtTemp.getDate();
          break;
        case "u": sElement = dtDate.getMilliseconds(); break;
        case "w": sElement = dtDate.getDay(); break;
        case "y": sElement = dtDate.getFullYear().toString().substr(2, 2); break;
        case "z":
          var dtFirst = new Date(dtDate.getFullYear(), 0, 1, 0, 0, 0, 0);
          var dtLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate(), 0, 0, 0, 0);
          sElement = Math.round((dtLast.valueOf() - dtFirst.valueOf()) / 1000 / 60 / 60/ 24);
          break;
        case "A": sElement = AMPM(dtDate.getHours()).toUpperCase(); break;
        case "B":
          sElement = Math.floor(((dtDate.getHours() * 60 * 60 * 1000) +
          (dtDate.getMinutes() * 60 * 1000) +
          (dtDate.getSeconds() * 1000) +
          (dtDate.getMilliseconds())) / 86400);
          break;
        case "D": sElement = aDays[dtDate.getDay()].substr(0, 3); break;
        case "F": sElement = aMonths[dtDate.getMonth()]; break;
        case "G": sElement = dtDate.getHours(); break;
        case "H": sElement = AddLeadingZero(dtDate.getHours()); break;
        case "I":
          var dtTempFirst = new Date(dtDate.getFullYear(), 0, 1);
          var dtTempLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate());
          var iDaysDiff = (dtTempLast.valueOf() - dtTempFirst.valueOf()) / 1000 / 60 / 60 / 24;
          (iDaysDiff == Math.round(iDaysDiff)) ? sElement = 0 : sElement = 1;
          break;
        case "L": ((new Date(dtDate.getFullYear(), 2, 0)).getDate() == 29) ? sElement = 1 : sElement = 0; break;
        case "M": sElement = aMonths[dtDate.getMonth()].substr(0, 3); break;
        case "N": (dtDate.getDay() == 0) ? sElement = 7 : sElement = dtDate.getDay(); break;
        case "O":
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            sElement = sTemp.substr(sTemp.indexOf("-"));
          } else if (sTemp.indexOf("+") > -1) {
            sElement = sTemp.substr(sTemp.indexOf("+"));
          } else {
            sElement = "+0000";
          }
          break;
        case "P":
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            var aTemp = sTemp.substr(sTemp.indexOf("-") + 1).split("");
            sElement = ("-" + aTemp[0] + aTemp[1] + ":" + aTemp[2] + aTemp[3]);
          } else if (sTemp.indexOf("+") > -1) {
            var aTemp = sTemp.substr(sTemp.indexOf("+") + 1).split("");
            sElement = ("+" + aTemp[0] + aTemp[1] + ":" + aTemp[2] + aTemp[3]);
          } else {
            sElement = "+00:00";
          }
          break;
        case "S": sElement = DateSuffix(dtDate.getDate()); break;
        case "T":
          sElement = dtDate.toString().split(" ")[5];
          if (sElement.indexOf("+") > -1) {
            sElement = sElement.substr(0, sElement.indexOf("+"));
          } else if (sElement.indexOf("-") > -1) {
            sElement = sElement.substr(0, sElement.indexOf("-"));
          }
          break;
        case "U": sElement = Math.floor(dtDate.getTime() / 1000); break;
        case "W":
          var dtTempFirst = new Date(FirstMonday(dtDate.getFullYear()));
          var dtTempLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate());
          sElement = Math.ceil(Math.round((dtTempLast.valueOf() - dtTempFirst.valueOf()) / 1000 / 60 / 60/ 24) / 7);
          break;
        case "Y": sElement = dtDate.getFullYear(); break;
        case "Z":
          (dtDate.getTimezoneOffset() < 0) ? sElement = Math.abs(dtDate.getTimezoneOffset() * 60) : sElement = (0 - (dtDate.getTimezoneOffset() * 60));
          break;
      }
      sOutput += sElement.toString();
      }
    return sOutput;
  }

  // add leading zero
  function AddLeadingZero(iValue) {
    if (iValue < 10) {
      iValue = ("0" + iValue);
    }
    return iValue;
  }

  // Ante meridiem and Post meridiem
  function AMPM(iHours) {
    if (iHours > 11) {
      return "pm";
    } else {
      return "am";
    }
  }

  // date suffix
  function DateSuffix(iDay) {
    var sSuffix = "th";
    switch (parseInt(iDay)) {
      case 1:
      case 21:
      case 31:
        sSuffix = "st";
        break;
      case 2:
      case 22:
        sSuffix = "nd";
        break;
      case 3:
      case 23:
        sSuffix = "rd";
    }
    return sSuffix;
  }

  // find the first Monday in a given year (for ISO 8601 dates)
  function FirstMonday(iYear) {
    var dtTemp = new Date(iYear, 0, 1);
    while (dtTemp.getDay() != 1) {
      dtTemp.setDate(dtTemp.getDate() + 1);
    }
    return dtTemp.valueOf();
  }

  // 12-Hour clock
  function TwelveHourClock(iHours) {
    if (iHours == 0) {
      iHours = 24;
    } else if (iHours > 12) {
      iHours -= 12;
    }
    return iHours;
  }
})(jQuery);// Add Shadow Borders
(function($) {
   $.fn.addShadowBorder = function(options) {      
      // Merge defaults and user options
	var o = $.extend({}, $.fn.addShadowBorder.defaults, options);
      
	return this.each(function() {	
	  	$(this).css('position', 'relative');
		$(this).wrapInner('<span class="shadow"></span>');
		$(this).append('<span class="shadow_left"></span><span class="shadow_right"></span>');
		if ($.browser.className == 'msie6' && $(this).find('img').width()%2 != 0) {
			$(this).find('.shadow_right').css('right','-1');			
		}
		if ($.browser.className == 'msie6' && $(this).find('img').height()%2 != 0) {
			$(this).find('.shadow_left').css('bottom','-1');
		}		
      });
   };
   // Defaults (public)
   $.fn.addShadowBorder.defaults = {
            
   };
})(jQuery);
// Animate Price
/* @title         AnimatePrice
 * @version       1.0
 * @author        Chad Romanski
 * @description   Animate price from old amount to new amount
 */
// used in payment calculator to animate a number like a cash register
(function($) {
	$.fn.animatePrice = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.animatePrice.defaults, options);		
		
		var fps = 30;
		var numFrames = parseInt((o.duration * .001) * fps);
		var rule = new RegExp('[^0-9.]', "g");
		var currentValue = +$(this).html().replace(rule,'');
		var delta = o.amount - currentValue;
		var incrementValue = delta / numFrames;
		var lastAnimationAmount = $(this).data('lastAnimationAmount');
		if(typeof(lastAnimationAmount) != 'undefined') {
			if(lastAnimationAmount == o.amount) {
				return this;	
			}
		}
		$(this).data('lastAnimationAmount',o.amount);
		if(incrementValue > 0 && incrementValue < 1) {
			incrementValue = 1;
		}
		if(incrementValue < 0 && incrementValue > -1) {
			incrementValue = -1;
		}
		if(incrementValue == 0) {
			return this;	
		}
		var accurateNumFrames = Math.abs(parseInt(delta / incrementValue));
		var stepSpeed = parseInt(o.duration / accurateNumFrames); 
		for (var i = 1; i <= accurateNumFrames; i++) {
			if(i == accurateNumFrames) {
				$(this).animate({border: 0}, stepSpeed,
				function() {
					$(this).text(o.currency + hyundaiForms.addCommas(o.amount));
				});
			}
			else {
				$(this).animate({border: 0}, stepSpeed,
				function() {
					currentValue = parseInt(currentValue+incrementValue);
						$(this).html(o.currency + hyundaiForms.addCommas(currentValue));
				});
			}
		}			
		o.callback;
		return this;
	};
	
	
    
	// Defaults (public)
	$.fn.animatePrice.defaults = {
		amount: 0,
		duration: 400,
		currency: '$',
		callback: function () {}
		
	};
})(jQuery);
// Generic Carousel
/* @title         GenericCarousel
 * @version       1.0
 * @author        Ben Kimpel
 * @description   Generic carousel with flexible HTML configuration
 */
(function($) {
   $.fn.carousel = function(options) {      
      // Merge defaults and user options
      var o = $.extend({}, $.fn.carousel.defaults, options);
	  
	  	var $navigation = (o.nextPrevContainer != '') ? $(o.nextPrevContainer) : $(this);
		var $totals = (o.totalContainer != '') ? $(o.totalContainer) : $(this);
			
		var carouselID = $.fn.carousel.carouselCount;
	  	$navigation.each(function () {
	  		$(this).addClass('carouselID_' + carouselID);
			carouselID++;
	  	});
	  	
	    carouselID = $.fn.carousel.carouselCount;
	  	$totals.each(function () {
	  		$(this).addClass('carouselID_' + carouselID);
	  		carouselID++;
	  	});
      
        carouselID = $.fn.carousel.carouselCount;
      	$.fn.carousel.carouselCount += 1000;
      	
      return this.each(function() {
         var $this = $(this);
         var current = 0;

		 var totalElement = $('.carouselID_' + carouselID).find(o.totalSelector);
		 var counterElement = $('.carouselID_' + carouselID).find(o.counterSelector);
         var nextButton = $('.carouselID_' + carouselID).find(o.nextSelector);
		 var previousButton = $('.carouselID_' + carouselID).find(o.previousSelector);
         
         // Collect sections, hide all but first
         var sections = $this.find(o.sectionSelector);
         sections.each(function(i) { (i != 0) ? $(this).hide() : false; });

         counterElement.text(current + 1);
         totalElement.text(sections.length);

		 //If loop is set to false, hide the previous button on start
		 (sections.length <= 1) ? nextButton.css('visibility','hidden') : nextButton.css('visibility','visible');			
         (!o.loop && current + 1 == 1) ? previousButton.css('visibility','hidden') : previousButton.css('visibility','visible');

		 carouselID++;
		 
         // Next
		 nextButton.click(function () {
			if(!o.slideTransition){
				$(sections[current]).hide();
				current = (current === sections.length - 1) ? 0 : current + 1;
				$(sections[current]).show();
				counterElement.text(current + 1);
				// Show/Hide the previous/next buttons depending on the the loop flag
				(!o.loop && current + 1 == 1) ? previousButton.css('visibility','hidden') : previousButton.css('visibility','visible');
				(!o.loop && current === sections.length - 1) ? nextButton.css('visibility','hidden') : nextButton.css('visibility','visible');
			}else{				
				$(sections[current]).css('width',$(sections[current]).parent().outerWidth()).animate({ 'left':-$(sections[current]).width() }, o.slideSpeed, 'swing');	
				current = (current === sections.length - 1) ? 0 : current + 1;
				$(sections[current]).css({'width':$(sections[current]).parent().outerWidth(),'left':$(sections[current]).width()})		
					.show()							
					.animate({ 'left':0 }, o.slideSpeed, 'swing', function () {								
						counterElement.text(current + 1);						
						// Show/Hide the previous/next buttons depending on the the loop flag
						(!o.loop && current + 1 == 1) ? previousButton.css('visibility','hidden') : previousButton.css('visibility','visible');
						(!o.loop && current === sections.length - 1) ? nextButton.css('visibility','hidden') : nextButton.css('visibility','visible');
						});	
			}
            return false;
		 });         

         // Previous
         previousButton.click(function() {			
			if(!o.slideTransition){
				$(sections[current]).hide();
				current = (current === 0) ? sections.length - 1 : current - 1;
				$(sections[current]).show();
				counterElement.text(current + 1);
				// Show/Hide the previous/next buttons depending on the the loop flag
				(!o.loop && current + 1 == 1) ? previousButton.css('visibility','hidden') : previousButton.css('visibility','visible');
				(!o.loop && current === sections.length - 1) ? nextButton.css('visibility','hidden') : nextButton.css('visibility','visible');				
			}else{					
				$(sections[current]).css('width',$(sections[current]).parent().outerWidth()).animate({ 'left':$(sections[current]).parent().width() }, o.slideSpeed, 'swing');	
				current = (current === 0) ? sections.length - 1 : current - 1;
				$(sections[current]).css({'width':$(sections[current]).parent().outerWidth(),'left':-$(sections[current]).width()})		
					.show()							
					.animate({ 'left':0 }, o.slideSpeed, 'swing', function () {								
						counterElement.text(current + 1);						
						// Show/Hide the previous/next buttons depending on the the loop flag
						(!o.loop && current + 1 == 1) ? previousButton.css('visibility','hidden') : previousButton.css('visibility','visible');
						(!o.loop && current === sections.length - 1) ? nextButton.css('visibility','hidden') : nextButton.css('visibility','visible');
						});	
			}
			return false;            
         });         
      }); // Matched element iterator
   };
   
   $.fn.carousel.carouselCount = 1000;
   
   // Defaults (public)
   $.fn.carousel.defaults = {
      loop: true,
	  slideTransition: false,
	  slideSpeed: 300,
      sectionSelector: '._contents li',
      nextSelector: '._next',
      previousSelector: '._previous',
      counterSelector: '._counter',
      totalSelector: '._total',
	  totalContainer: '',
	  nextPrevContainer: ''
   };
})(jQuery);
// Click and Enter Listener
/* @title         clickEnter
 * @version       1.0
 * @author        William Wallace
 * @description   Listener For Clicks and Enter Keys

	useage examples:
	
	//Fire on click OR enter key press
	$('.some_input').clickAndEnter(function (){
		//Do something here
	});
	
	//Fire on ONLY on enter key press
	$('.some_input').enterKey(function (){
		//Do something here
	});

 */
(function($) {
	$.fn.extend({
		clickAndEnter: function(callback) {
			return this.each(function(){
				this.callback = callback || function () {};
				$(this).bind('click', function(event) {
					this.callback();
			  		return false;
				});
				$(this).bind('keypress', function(event) {
					var code=event.charCode || event.keyCode;
					if(code && code == 13) {// if enter is pressed
			  			this.callback();
			  			return false;
					};
				});
			});
		},
		enterKey: function(callback) {
			return this.each(function(){
				this.callback = callback || function () {};
				$(this).bind('keypress', function(event) {
					var code=event.charCode || event.keyCode;
					if(code && code == 13) {// if enter is pressed
			  			this.callback();
			  			return false;
					};
				});
			});
		}
	});
})(jQuery);(function ($) {
	$.fn.enterKeySubmit = function () {
		return this.each(function () {
			$(this).find('#bodyContent input[type=text]:enabled').eq(0).focus();

			$(this).find('#bodyContent input[type=text]').enterKey(function () {
				$(this).parents('form').find('.submit').click();
			});
		});
	};
})(jQuery);
// External Site Tool Tip
/* @title         External Site Tool Tip
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.externalSiteToolTip = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.externalSiteToolTip.defaults, options);		
		
		return this.each(function(i) {
			//Find links that open a new browser window
			if($(this).attr('target') === '_blank'){
				$(this).attr('rel','#modalExternalSiteCluetip');
				if($(this).attr('title') === ''){
					$(this).attr('title',globalExternalLinkTitle);
				}
				
				$(this).cluetip({					
					cluezIndex: 10000,
					cursor: 'pointer',
					dropShadow: false,			
					local: true,
					arrows: true,
					width: 225,
					topOffset: -15,
					positionBy: 'auto',
					clickThrough: true,
					sticky: false
				});	
				
				$(this).mouseenter(function(){
					$('#modalExternalSiteCluetip span.external_url').text($(this).attr('href'));							
				});
				
				
			}
			
		});
	};   
	// Defaults (public)
	$.fn.externalSiteToolTip.defaults = {
	};
})(jQuery);// General Content Display
/* @title         General Content Layout
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.generalContent = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.generalContent.defaults, options);

		var total = $(this).length;
		
		return this.each(function(i) {
			var index = i;
			
			if($(this).hasClass('image_left') || $(this).hasClass('image_right')){
				var gc = $(this);
				
				if($(this).hasClass('video_content')){
					var genContentWidthOffset = gc.outerWidth() - gc.width();
					var parentWidth = gc.parent().width();
					var contentImageWidth = gc.find('div.content_image').outerWidth();
					var contentCopyWidth = gc.find('div.content_copy').outerWidth() - gc.find('div.content_copy').width();		
					
					var width = parentWidth - contentImageWidth - genContentWidthOffset - contentCopyWidth;
					width = width > 0 ? width : 'auto';
					gc.find('div.content_copy').width(width);
				}else{
					$('<img src="' + gc.find('div.content_image img').attr('src') + '" />').load(function () {
						var genContentWidthOffset = gc.outerWidth() - gc.width();
						var parentWidth = gc.parent().width();
						var contentImageWidth = gc.find('div.content_image').outerWidth();
						var contentCopyWidth = gc.find('div.content_copy').outerWidth() - gc.find('div.content_copy').width();		

						var width = parentWidth - contentImageWidth - genContentWidthOffset - contentCopyWidth;
						width = width > 0 ? width : 'auto';
						gc.find('div.content_copy').width(width);
					});
				}
				
			}			
			if (index + 1 == total) {
				(o.complete || function () {})();
			}
		});
	};   
	// Defaults (public)
	$.fn.generalContent.defaults = {
	};
})(jQuery);
// General Column Layout Display
/* @title         General Column Layout
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.generalColumnLayout = function(options) {  		
		var o = $.extend({}, $.fn.generalColumnLayout.defaults, options);

		return this.each(function(i) {
			// Get container and default column width to test against
			var container = $(this);
			var defaultColumnWidth = (container.width() - o.columnGap) / 2;
			
			// Image load tracking
			var imagesLoaded = 0;
			var resizeColumns = false;
			var maxImageWidth = 0;
			var maxImageColumn = 0;
			
			// Find columns
			var columns = [];
			$(this).find('.general_content').each(function (i) {
				columns[i] = $(this).parent();											
			});
			
			// Check image widths
			for (var i = 0; i < columns.length; i++) {				
				columns[i].find('.content_image').each(function () {
					if($(this).find('img').length){
						var actualImage = $(this).find('img');														 
						var index = i;											 
			
						$('<img src="' + actualImage.attr('src') + '" />').load(function () {																	  
							imageCount(actualImage.parents('.content_image').outerWidth(), index);
						});						
					}else{							
						imageCount($(this).outerWidth(), i);								
					}
				});				
			}
			
			//Set Max image width and increase imaage count
			function imageCount(imageWidth, columnIndex){				
				imagesLoaded = imagesLoaded + 1;
				
				if (imageWidth > defaultColumnWidth) {					
					resizeColumns = true;
					maxImageWidth = imageWidth;
					maxImageColumn = columnIndex;					
				}	
			}

			
			(function () {
				if (imagesLoaded == container.find('.content_image').length) {					
					// Set column widths if one is greater than half of the total	
					if (resizeColumns === true) {						
						for (var i = 0; i < columns.length; i++) {	
							if(i === maxImageColumn){
								columns[i].width(maxImageWidth);
							}else{
								columns[i].width(container.width() - maxImageWidth - o.columnGap);
							}
						}
					} else {
						// Set the default column width if it has not been exceeded
						container.find('.general_content').parent().width(defaultColumnWidth);
					}					
					
					(function () {
						if (sIFR.isActive){
							if (container.find('h2').length === container.find('h2.sIFR-replaced').length) {
								container.find('h2').each(function(){								
									var sIFRAlternate = $(this).find('.sIFR-alternate').html();
									$(this).removeClass('sIFR-replaced').html(sIFRAlternate);
									
									sIFR.replace(univers, {
										elements: [this],
										transparent: true,
										fixWrap: true,
										css: {
										  '.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3e3d3a', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '24px' },
										  '.subhead': {'color': '#4C647E' }
										}
									});
								});
							} else {
								setTimeout(arguments.callee, 250);
							}
						}
					})();
				} else {
					setTimeout(arguments.callee, 250);
				}
			})();
		});
	};
	
	$.fn.generalColumnLayout.defaults = {
		columnGap: 7
	}
})(jQuery);// Raed More Functionality
/* @title         Read More Functionality
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.readMore = function() {  
		return this.each(function() {
			var tempLabel = '';					  
			$(this).toggle(function () {
				var arrow = $(this).find('img');
				tempLabel = $(this).attr('rel'); 
				$(this).attr('rel', $(this).text());			
				$(this).text(tempLabel).append(arrow);
				$(this).parent().find('.read_more_content').slideDown('slow');
			}, function () { 
				var arrow = $(this).find('img');
				tempLabel = $(this).attr('rel'); 
				$(this).attr('rel', $(this).text());			
				$(this).text(tempLabel).append(arrow);
				$(this).parent().find('.read_more_content').slideUp('slow');
			});	
		});
	};  	
})(jQuery);/*
	Plugin: addHover class.
	By: Jeremy Ricketts, iCrossing
	WTF: Adds and removes a "hover" class on the targeted node or nodes
*/
(function($) {
	$.fn.hoverClass = function () {
		return $(this).each(function () {
			$(this).hover(function () {
				$(this).addClass('hover');
			}, function () {
				$(this).removeClass('hover');
			});
		});
	};    
})(jQuery);
// Add Image Hover
(function($) {
   $.fn.imageHover = function(options) {      
      // Merge defaults and user options
	var o = $.extend({}, $.fn.imageHover.defaults, options);
      
	return this.each(function() {	
		//$(this).wrapInner('<span class="image_hover_bgnd"></span>');		
		if(/(\.swf|\.flv){1}$/.test($(this).attr('href')) || $(this).attr('href').indexOf('video.html') != -1){
			$(this).append('<span class="video_icon"></span>');			
		}
		$(this).hover (
			function () {				
				$(this).find('img').animate({ opacity: '0.8' }, 180, 'linear');
				},
			function() {
				$(this).find('img').animate({ opacity: '1' }, 180, 'linear');
				}
			);
	});
   };
   // Defaults (public)
   $.fn.imageHover.defaults = {
            
   };

})(jQuery);

/**
 * @author iCrossing
 * @usage any element with a class name of modal_*
 * @example <div class="myclass modal_targetNode">This is the clicked item</div>
 * @example <div id="targetNode">This is the node to be inserted into the modal</div>
 */
(function ($) {
	$.fn.modal = function (options) {
		var o = $.extend({}, $.fn.modal.defaults, options);
		
		var modal;
		var xDifference = 0;

		// Create the modal
		function createModal(contentID, xPos, yPos) {
			// IE6 fix for positioning
			if ($.browser.msie && $.browser.version == 6)
				scroll(0, 0);
				
			// Find the content for the modal			
			var content = $('#' + contentID);

			// Locations related to the original placement of the modal content
			var contentPrev = content.prev();
			var contentNext = content.next();
			var contentParent = content.parent();
			
			// Build the modal and add the content
			modal = $('' +
				'<div id="' + o.modalID + '" class="content_modal" style="display:none;">' +
					'<div class="content_modalInner">' +
						'<div class="content_modalContent"><div class="content_modalClear"></div></div>' + 
						'<div class="content_modalBottom"></div>' + 
					'</div>' + 
					'<div class="content_modalTopRight"></div>' +
					'<div class="content_modalBottomLeft"></div>' + 
					'<div class="content_modalPointer"></div>' + 
					'<a class="content_modalClose">Close</a>' +
				'</div>'
			);
			modal.find('.content_modalContent').prepend(content);

			// Build positioning function
			function f_scrollTop() {
				return f_filterResults (
					window.pageYOffset ? window.pageYOffset : 0,
					document.documentElement ? document.documentElement.scrollTop : 0,
					document.body ? document.body.scrollTop : 0
				);
			}
			function f_filterResults(n_win, n_docel, n_body) {
				var n_result = n_win ? n_win : 0;
				if (n_docel && (!n_result || (n_result > n_docel)))
					n_result = n_docel;
				return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
			}
			
			var setModalPosition = (xPos && yPos) ?
				function () {
					if (xDifference == 0) {
						xDifference = $(window).width() - $('#content').width() > 0 ? 
							xPos - (($(window).width() - $('#content').width()) / 2) : 
							xPos;
					} else {
						xPos = $(window).width() - $('#content').width() > 0 ? 
							xDifference + (($(window).width() - $('#content').width()) / 2) : 
							xDifference;
					}
					modal.css({ bottom:$(window).height() - (yPos - pointerHeight), left:xPos });
				} :
				function () {
					var top = $(window).height() > modal.height() ? 
						($(window).height() - modal.height()) * 0.5 : 
						0;
					var left = $(window).width() > modal.width() ? 
						($(window).width() - modal.width()) * 0.5 : 
						0;
					
					top = ($(window).height() > modal.height()) ? top + f_scrollTop() : top;
					modal.css({ display:'block', position:'absolute', top:top, left:left });
					modal.find('.content_modalPointer').hide();
				}

			// Get pointer height			
			var pointerHeight = modal.find('.content_modalPointer').height() || 17;
			// Animate and append the modal
			$.fn.overlay('show', { callback: function () {
				modal.appendTo('body').fadeIn(500, function(){
					setModalPosition();
					resetModal = setInterval(setModalPosition, 1);	
					o.callback();
				});
			}});

			// Close Button Interaction
			modal.find('.content_modalClose')
				.hoverClass()
				.mousedown(function () { $(this).addClass('down'); })
				.click(function () { 
					modal.fadeOut(500, function () { 
						// Put the content back where we found it before we destroy the modal
						if (contentPrev.length) {
							content.insertAfter(contentPrev);
						} else if (contentNext.length) {
							content.insertBefore(contentNext);
						} else {
							contentParent.prepend(content);
						}
					
						$(this).remove();
						$.fn.overlay('hide');
						clearInterval(resetModal);
						if (o.onClose) o.onClose();
					});
				});
			
			// Make sure the modal stays positioned during window resize
			$(window).resize(function () {
				setModalPosition();
			});	
			
			$(window).scroll(function () {
				setModalPosition();				
			});	

			// Listen for clicks and see if call reposition in case modal size has changed
			modal.click(function () {
				setModalPosition();
			});
			
			
			var resetModal;
		}
		
		// Position to an element
		if (!o.xPos && !o.yPos && !o.contentID) {
			$(this).click(function () {
				var contentID = $(this).attr('class').match(/modal_(.*)/)[1];
				createModal(contentID, $(this).offset().left, $(this).offset().top);
			});
		// Position to coordinates
		} else if ((o.xPos || o.xPos === 0) && (o.yPos || o.yPos === 0) && o.contentID) {
			createModal(o.contentID, parseInt(o.xPos), parseInt(o.yPos));
		// Position to center
		} else {
			createModal(o.contentID);
		}
	};
	
	// Defaults (public)
	$.fn.modal.defaults = {
		modalID: 'modal',
		contentID: false,
		xPos: false,
		yPos: false,
		callback: function(){}
	};
	
	
})(jQuery);

// Global Identifier for our plugin
$(document).ready(function(){
	$("*[class*=modal_]").modal();
});

// Multi Content Box Display
/* @title         Multi Content Box Display
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.multiContentBox = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.multiContentBox.defaults, options);
		
		
		return this.each(function() {
			$this = $(this);			
			
			$(this).find('.navigation_container li:not(li.line)').each(function(index){ 
				var selector = '#nav' + (index + 1) + ' a' ;
				var $navItem = $('#nav'+ (index + 1));	
/*				sIFR.replace(univers, {
					selector: selector
					,transparent: true
					,fitExactly: true					
					,onRelease: function() {if ($.browser.msie) $navItem.click();}	
					,css: {
					  '.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4c647e', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '13px', 'cursor': 'pointer' },
					  'a:link, a:visited, a:active, a': {  'color': '#4c647e', 'text-decoration': 'none', 'cursor':'pointer'},
					  'a:hover': { 'color': '#618EC2', 'text-decoration': 'none','cursor':'pointer'}
					}
				});*/
			});					
			
			$(this).find('.navigation_container li').click(function(){				
				if(!$(this).hasClass('line') && !$(this).hasClass('active')){
					var $listContainer = $(this).parent();
					$('.navigation_container li.active').removeClass('active');	
					$(this).addClass('active');
					$('.content_container .active').removeClass('active').slideUp(300);
					$(".content_container #content" + $(this).attr('id').split('nav')[1]).addClass("active").slideDown(300);
				}
				
				return false;										  
			});	
			
			$(this).find('.navigation_container li:first').click();
		});
	};   
	// Defaults (public)
	$.fn.multiContentBox.defaults = {
	};
})(jQuery);// Multi Content Box Display
/* @title         Multi Content Box Display
 * @version       1.0
 * @author        Chad Romanski  
 */
(function($) {
	$.fn.multiContentBox1 = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.multiContentBox1.defaults, options);
		
		return this.each(function() {
			$this = $(this);			
			
			$(this).find('.navigation_container1 li:not(li.line)').each(function(index){ 
				var selector = '#nav1' + (index + 1) + ' a' ;
				var $navItem = $('#nav1'+ (index + 1));	
/*				sIFR.replace(univers, {
					selector: selector
					,transparent: true
					,fitExactly: true					
					,onRelease: function() {if ($.browser.msie) $navItem.click();}	
					,css: {
					  '.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4c647e', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '13px', 'cursor': 'pointer' },
					  'a:link, a:visited, a:active, a': {  'color': '#4c647e', 'text-decoration': 'none', 'cursor':'pointer'},
					  'a:hover': { 'color': '#618EC2', 'text-decoration': 'none','cursor':'pointer'}
					}
				});*/
			});					
			
			$(this).find('.navigation_container1 li').click(function(){				
				if(!$(this).hasClass('line') && !$(this).hasClass('active')){
					var $listContainer = $(this).parent();
					$('.navigation_container1 li.active').removeClass('active');	
					$(this).addClass('active');
					$('.content_container1 .active').removeClass('active').slideUp(300);
					$('.content_container1 #content1' + $(this).attr('id').split('nav1')[1]).addClass("active").slideDown(300);
				}
				
				return false;										  
			});	
			
			$(this).find('.navigation_container1 li:first').click();
		});
	};   
	// Defaults (public)
	$.fn.multiContentBox1.defaults = {
	};
})(jQuery);/**
 * @title         Overlay
 * @author        iCrossing
 * @description   A simple overlay as a jquery plugin
 * @usage         $.fn.overlay('show');  $.fn.overlay('hide');
 */
(function ($) {
	$.fn.overlay = function (action, options) { 
		var o = $.extend($.fn.overlay.defaults, options);
		
		// Browser/OS Flags (Necessary evil)
		var ie6 = ($.browser.msie && parseInt($.browser.version) == 6) ? true : false;
		var macff2 = (($.browser.mozilla && parseFloat($.browser.version) < 1.9) && (navigator.userAgent.indexOf('Mac') !== -1)) ? true : false;

		if (action == 'show' && !$('#OVERLAY').length) {
			// Build overlay
			// IE6 CSS Compensation + Select box hiding
			if (ie6) {
				$('select').css({ visibility:'hidden' });
				$.extend(o.overlayCSS, { position:'absolute', height:'100%', top:0, left:0 });
			}
			
			// Mac FF2 / Flash bug
			if (macff2)
				$.extend(o.overlayCSS, { opacity:1, background:'transparent url(' + o.macFF2Image + ') 0 0 repeat' });
			
			var overlay = $('<div id="OVERLAY"></div>');
			var overlayOpacity = o.overlayCSS.opacity;
			o.overlayCSS.opacity = 0;
			overlay
				.css(o.overlayCSS)
				.attr('class', o.overlayClass)
				.prependTo('body')
				.animate({ opacity:overlayOpacity }, o.duration, 'swing', o.callback);
			 o.overlayCSS.opacity = overlayOpacity;
			
			// IE6 CSS compensation
			if (ie6) {
				$('html')
					/*.css({ overflow:'scroll' })*/
					.find('body')
					.andSelf()
					.css({ height:'100%', width:'100%' });
				overlay.height($(document).height()); 
				var ie6Resize = function () { overlay.height($(document).height()); };
				$(window).resize(ie6Resize);
			}
		} else if (action == 'hide') {
			$('#OVERLAY').remove();
			
			if (ie6){
				/*$('html').css({ overflow:'auto' });*/
				$('select').css('visibility', 'visible');
				$(window).unbind(ie6Resize);
			}
		}
	};
	
	$.fn.overlay.defaults = {
		macFF2Image: '',
		overlayClass: '',
		overlayCSS: { backgroundColor:'#000', position:'fixed', opacity:0.3, zIndex:8001, top:0, left:0, height:'100%', width:'100%' },
		callback: function () {},
		duration: 600
	}
})(jQuery);
// Generic Carousel
/* @title         GenericPagination
 * @version       1.0
 * @author        Chad Romanski
 */
(function($) {
	$.fn.pagination = function(options) {      
	// Merge defaults and user options
		var o = $.extend({}, $.fn.pagination.defaults, options);  
	
	
		return this.each(function() {
			var $this = $(this);
			//List Max Number of Pages to Show
			var maxPageView = o.maxPageView;
			//Set Alt Color to odd rows and show the first set of results
			if(o.altRows) $this.find(o.pageTag + ':odd').addClass('altrow');
			//hide pages
			$this.find(o.pageTag).each(function(index){		
				if(index < maxPageView){
					$(this).show();
				}else{
					$(this).hide();
				}
			});	
			var totalPages = $this.find(o.pageTag).length;
			//If the total number of pages is greater than the max allowed on page, use pagination
			if (totalPages > maxPageView){
				var pagesTotal = (totalPages % maxPageView == 0) ? Math.floor(totalPages / maxPageView) : Math.floor(totalPages / maxPageView) + 1;
				//Create and show pagination
				$(o.paginationContainer).show().addClass('prev').append('<div class="prev"><a href="#">Prev</a></div>');
				for(var pageLoop = 1; pageLoop <= pagesTotal; pageLoop++){
					var currentPage = (pageLoop == 1) ? 'number current_number' : 'number';
					$(o.paginationContainer).append('<div class="'+ currentPage +'"><a href="#">'+ pageLoop +'</a></div>');
				}
				$(o.paginationContainer).append('<div class="next"><a href="#">Next</a></div>');
				//Add click event to page through articles				
				$(o.paginationContainer).find('a').click(function(){			
					switch($(this).html()){
						case 'Prev':
							if(!$(this).parents(o.paginationContainer).hasClass('prev')){
								$(o.paginationContainer).find('.current_number').prev().find('a').click();								
							}
							break;
						case 'Next':
							if(!$(this).parents(o.paginationContainer).hasClass('next')){
								$(o.paginationContainer).find('.current_number').next().find('a').click();	
							}
							break;
						default:						
							if(!$(this).parent().hasClass('current_number')){
								var tempStartNumber = (parseInt($(this).html()) * maxPageView) - maxPageView;
								var displayCounter = 1;
								for(var displayLoop = 0; displayLoop <= $this.find(o.pageTag).length; displayLoop++){
									if(displayLoop >= tempStartNumber && displayCounter <= maxPageView){
										$this.find(o.pageTag).eq(displayLoop).show();
										displayCounter++;
									}else{
										$this.find(o.pageTag).eq(displayLoop).hide();
									}
								}
								$(o.paginationContainer).find('.number.current_number').removeClass('current_number');								
								$(this).parent().addClass('current_number');	
								$(this).parents(o.paginationContainer)[(parseInt($(this).html()) != 1) ? 'removeClass' : 'addClass']('prev');
								$(this).parents(o.paginationContainer)[(parseInt($(this).html()) != pagesTotal) ? 'removeClass' : 'addClass']('next');
								
								
							}
					}
					return false;
				});
			}			
		}); // Matched element iterator
	}; 
	
	// Defaults (public)
	$.fn.pagination.defaults = {
		loop: false,
		altRows: false,
		pageTag: 'li',
		paginationContainer: '',
		maxPageView: 1		
	};
})(jQuery);
// General PNG and Rescaling Plugin
(function($) {
	$.fn.pngFix = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.pngFix.defaults, options);		
		
		return this.each(function(i) {
			if ($.browser.msie && $.browser.version == 6){
				var $this = $(this);
				var $pngTarget = (this.tagName != 'IMG') ? $(this) : $(this).parent();
				if(this.tagName == 'IMG'){
					if (!$this.data('processed')) {
						var cssWidth = ($this.css('width') == 'auto') ? false : parseInt($this.css('width').split('px')[0]);
						var cssHeight = ($this.css('height') == 'auto') ? false : parseInt($this.css('height').split('px')[0]);	
						if (cssWidth) $this.attr('width', cssWidth);
						if (cssHeight) $this.attr('height', cssHeight);	
					}

					
					$('<img src="' + $this.attr('src') + '" />').load(function () {
						$(this).wrap('<div style="height:0;overflow:hidden;"></div>');
						$(this).parent().appendTo('body');
						
						if(((cssWidth && !cssHeight) || (!cssWidth && cssHeight)) || $this.data('processed')){
							if (cssWidth || $this.data('scale') == 'width'){								
								$this.attr('height', $(this).height() * ($this.attr('width') / $(this).width()));
								$this.data('processed', 'true');
								$this.data('scale', 'width');
							} else {
								$this.attr('width', $(this).width() * ($this.attr('height') / $(this).height()));
								$this.data('processed', 'true');
								$this.data('scale', 'height');
							}
							
							if($this.next('span').length){									
								$this.next('span').remove();
								$pngTarget.executePngFix();	
								$this.next('span').css('display','inline-block');								
							}else{
								$pngTarget.executePngFix();
							}
						}else{
							$pngTarget.executePngFix();
						}
						
						$(this).parent().remove();
					});
				}else{
					$pngTarget.executePngFix();
				}
			}
		});
	}; 
	
	// Defaults (public)
	$.fn.pngFix.defaults = {
		imageSrc: ''
	};
})(jQuery);
/*
	Plugin: valueHold
	By: Jeremy Ricketts
	WTF: On input fields, get the initual value and save it as the default value. 
		If the user clicks the input, then clear out the value. If nothing is entered 
		and the user clicks away, then the initial value is restored.
	
	Example useage:
	$("input.value_hold").valueHold();
	
*/
(function($) {
	$.fn.extend({
		valueHold: function() {
			return this.each(function() {
				var iv = $(this).val();
				$(this).focus(function () {
					if ($(this).attr('value') == iv) {
						$(this).val('');
					}
				});
				$(this).blur(function () {
					if ($(this).attr('value') == '') {
						$(this).val(iv);
					}
				});
			});
		}
	});      
})(jQuery);
// Vehicle Trim Data
/* @title         vehicleJsonData
 * @version       1.0
 * @author        Chad Romanski
 * @description   Plugin to Retrieve Certain Data from the Pricing JSON
 */
(function($) {
	$.fn.vehicleJsonData = function(options) {      
		// Merge defaults and user options
		var o = $.extend({}, $.fn.vehicleJsonData.defaults, options);	
		return this.each(function() {
			var $this = $(this);
			var currentModel = HN.Vehicles.findModelByID(o.vehicle);
			var currentModelTrim = currentModel.findTrimByID(o.trim);
								  
			
			if(o.key == 'BasePrice' || o.key == 'Price'){
				$this.html(o.currency + hyundaiForms.addCommas(currentModelTrim.getJSONData()[o.key]));	
			}else{
				$this.html(currentModelTrim.getJSONData()[o.key]);	
			}			
		}); 
	};
	
	// Defaults (public)
	$.fn.vehicleJsonData.defaults = {
		vehicle: '',
		trim: '',
		key: '',
		currency: '' 
	};
})(jQuery);/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.1.7
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = settings.spaces === false ? false : true;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  var $numbers = settings.numbers === false ? false : true;
  
  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
      while (m = rx.exec(match[2])) tokens.push(m[1]);
      return [base, tokens];
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        jQuery.each(arguments, function() {
          var q = "" + this;
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = decodeURIComponent(this.split('=')[0] || "");
            var val = decodeURIComponent(this.split('=')[1] || "");
            
            if (!key) return;
            
            if ($numbers) {
              if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                val = parseFloat(val);
              else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
                val = parseInt(val, 10);
            }
            
            val = (!val && val !== 0) ? true : val;
            
            if (val !== false && val !== true && typeof val != 'number')
              val = val;
            
            self.SET(key, val);
          });
        });
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key) {
        return this.SET(key, null).COMPACT();
      },
      remove: function(key) {
        return this.copy().REMOVE(key);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      load: function(url) {
        var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
        return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var encode = function(str) {
          str = str + "";
          if ($spaces) str = str.replace(/ /g, "+");
          return encodeURIComponent(str);
        };
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [encode(key)];
          if (value !== true) {
            o.push("=");
            o.push(encode(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object

/*****************************************************************************
scalable Inman Flash Replacement (sIFR) version 3, revision 436.

Copyright 2006 – 2008 Mark Wubben, <http://novemberborn.net/>

Older versions:
* IFR by Shaun Inman
* sIFR 1.0 by Mike Davidson, Shaun Inman and Tomas Jogin
* sIFR 2.0 by Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

See also <http://novemberborn.net/sifr3> and <http://wiki.novemberborn.net/sifr3>.

This software is licensed and provided under the CC-GNU LGPL.
See <http://creativecommons.org/licenses/LGPL/2.1/>
*****************************************************************************/

var sIFR=new function(){var O=this;var E={ACTIVE:"sIFR-active",REPLACED:"sIFR-replaced",IGNORE:"sIFR-ignore",ALTERNATE:"sIFR-alternate",CLASS:"sIFR-class",LAYOUT:"sIFR-layout",FLASH:"sIFR-flash",FIX_FOCUS:"sIFR-fixfocus",DUMMY:"sIFR-dummy"};E.IGNORE_CLASSES=[E.REPLACED,E.IGNORE,E.ALTERNATE];this.MIN_FONT_SIZE=6;this.MAX_FONT_SIZE=126;this.FLASH_PADDING_BOTTOM=5;this.VERSION="436";this.isActive=false;this.isEnabled=true;this.fixHover=true;this.autoInitialize=true;this.setPrefetchCookie=true;this.cookiePath="/";this.domains=[];this.forceWidth=true;this.fitExactly=false;this.forceTextTransform=true;this.useDomLoaded=true;this.useStyleCheck=false;this.hasFlashClassSet=false;this.repaintOnResize=true;this.replacements=[];var L=0;var R=false;function Y(){}function D(c){function d(e){return e.toLocaleUpperCase()}this.normalize=function(e){return e.replace(/\n|\r|\xA0/g,D.SINGLE_WHITESPACE).replace(/\s+/g,D.SINGLE_WHITESPACE)};this.textTransform=function(e,f){switch(e){case"uppercase":return f.toLocaleUpperCase();case"lowercase":return f.toLocaleLowerCase();case"capitalize":return f.replace(/^\w|\s\w/g,d)}return f};this.toHexString=function(e){if(e.charAt(0)!="#"||e.length!=4&&e.length!=7){return e}e=e.substring(1);return"0x"+(e.length==3?e.replace(/(.)(.)(.)/,"$1$1$2$2$3$3"):e)};this.toJson=function(g,f){var e="";switch(typeof(g)){case"string":e='"'+f(g)+'"';break;case"number":case"boolean":e=g.toString();break;case"object":e=[];for(var h in g){if(g[h]==Object.prototype[h]){continue}e.push('"'+h+'":'+this.toJson(g[h]))}e="{"+e.join(",")+"}";break}return e};this.convertCssArg=function(e){if(!e){return{}}if(typeof(e)=="object"){if(e.constructor==Array){e=e.join("")}else{return e}}var l={};var m=e.split("}");for(var h=0;h<m.length;h++){var k=m[h].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);if(!k||k.length!=3){continue}if(!l[k[1]]){l[k[1]]={}}var g=k[2].split(";");for(var f=0;f<g.length;f++){var n=g[f].match(/\s*([^:\s]+)\s*\:\s*([^;]+)/);if(!n||n.length!=3){continue}l[k[1]][n[1]]=n[2].replace(/\s+$/,"")}}return l};this.extractFromCss=function(g,f,i,e){var h=null;if(g&&g[f]&&g[f][i]){h=g[f][i];if(e){delete g[f][i]}}return h};this.cssToString=function(f){var g=[];for(var e in f){var j=f[e];if(j==Object.prototype[e]){continue}g.push(e,"{");for(var i in j){if(j[i]==Object.prototype[i]){continue}var h=j[i];if(D.UNIT_REMOVAL_PROPERTIES[i]){h=parseInt(h,10)}g.push(i,":",h,";")}g.push("}")}return g.join("")};this.escape=function(e){return escape(e).replace(/\+/g,"%2B")};this.encodeVars=function(e){return e.join("&").replace(/%/g,"%25")};this.copyProperties=function(g,f){for(var e in g){if(f[e]===undefined){f[e]=g[e]}}return f};this.domain=function(){var f="";try{f=document.domain}catch(g){}return f};this.domainMatches=function(h,g){if(g=="*"||g==h){return true}var f=g.lastIndexOf("*");if(f>-1){g=g.substr(f+1);var e=h.lastIndexOf(g);if(e>-1&&(e+g.length)==h.length){return true}}return false};this.uriEncode=function(e){return encodeURI(decodeURIComponent(e))};this.delay=function(f,h,g){var e=Array.prototype.slice.call(arguments,3);setTimeout(function(){h.apply(g,e)},f)}}D.UNIT_REMOVAL_PROPERTIES={leading:true,"margin-left":true,"margin-right":true,"text-indent":true};D.SINGLE_WHITESPACE=" ";function U(e){var d=this;function c(g,j,h){var k=d.getStyleAsInt(g,j,e.ua.ie);if(k==0){k=g[h];for(var f=3;f<arguments.length;f++){k-=d.getStyleAsInt(g,arguments[f],true)}}return k}this.getBody=function(){return document.getElementsByTagName("body")[0]||null};this.querySelectorAll=function(f){return window.parseSelector(f)};this.addClass=function(f,g){if(g){g.className=((g.className||"")==""?"":g.className+" ")+f}};this.removeClass=function(f,g){if(g){g.className=g.className.replace(new RegExp("(^|\\s)"+f+"(\\s|$)"),"").replace(/^\s+|(\s)\s+/g,"$1")}};this.hasClass=function(f,g){return new RegExp("(^|\\s)"+f+"(\\s|$)").test(g.className)};this.hasOneOfClassses=function(h,g){for(var f=0;f<h.length;f++){if(this.hasClass(h[f],g)){return true}}return false};this.ancestorHasClass=function(g,f){g=g.parentNode;while(g&&g.nodeType==1){if(this.hasClass(f,g)){return true}g=g.parentNode}return false};this.create=function(f,g){var h=document.createElementNS?document.createElementNS(U.XHTML_NS,f):document.createElement(f);if(g){h.className=g}return h};this.getComputedStyle=function(h,i){var f;if(document.defaultView&&document.defaultView.getComputedStyle){var g=document.defaultView.getComputedStyle(h,null);f=g?g[i]:null}else{if(h.currentStyle){f=h.currentStyle[i]}}return f||""};this.getStyleAsInt=function(g,i,f){var h=this.getComputedStyle(g,i);if(f&&!/px$/.test(h)){return 0}return parseInt(h)||0};this.getWidthFromStyle=function(f){return c(f,"width","offsetWidth","paddingRight","paddingLeft","borderRightWidth","borderLeftWidth")};this.getHeightFromStyle=function(f){return c(f,"height","offsetHeight","paddingTop","paddingBottom","borderTopWidth","borderBottomWidth")};this.getDimensions=function(j){var h=j.offsetWidth;var f=j.offsetHeight;if(h==0||f==0){for(var g=0;g<j.childNodes.length;g++){var k=j.childNodes[g];if(k.nodeType!=1){continue}h=Math.max(h,k.offsetWidth);f=Math.max(f,k.offsetHeight)}}return{width:h,height:f}};this.getViewport=function(){return{width:window.innerWidth||document.documentElement.clientWidth||this.getBody().clientWidth,height:window.innerHeight||document.documentElement.clientHeight||this.getBody().clientHeight}};this.blurElement=function(g){try{g.blur();return}catch(h){}var f=this.create("input");f.style.width="0px";f.style.height="0px";g.parentNode.appendChild(f);f.focus();f.blur();f.parentNode.removeChild(f)}}U.XHTML_NS="http://www.w3.org/1999/xhtml";function H(r){var g=navigator.userAgent.toLowerCase();var q=(navigator.product||"").toLowerCase();var h=navigator.platform.toLowerCase();this.parseVersion=H.parseVersion;this.macintosh=/^mac/.test(h);this.windows=/^win/.test(h);this.linux=/^linux/.test(h);this.quicktime=false;this.opera=/opera/.test(g);this.konqueror=/konqueror/.test(g);this.ie=false/*@cc_on||true@*/;this.ieSupported=this.ie&&!/ppc|smartphone|iemobile|msie\s5\.5/.test(g)/*@cc_on&&@_jscript_version>=5.5@*/;this.ieWin=this.ie&&this.windows/*@cc_on&&@_jscript_version>=5.1@*/;this.windows=this.windows&&(!this.ie||this.ieWin);this.ieMac=this.ie&&this.macintosh/*@cc_on&&@_jscript_version<5.1@*/;this.macintosh=this.macintosh&&(!this.ie||this.ieMac);this.safari=/safari/.test(g);this.webkit=!this.konqueror&&/applewebkit/.test(g);this.khtml=this.webkit||this.konqueror;this.gecko=!this.khtml&&q=="gecko";this.ieVersion=this.ie&&/.*msie\s(\d\.\d)/.exec(g)?this.parseVersion(RegExp.$1):"0";this.operaVersion=this.opera&&/.*opera(\s|\/)(\d+\.\d+)/.exec(g)?this.parseVersion(RegExp.$2):"0";this.webkitVersion=this.webkit&&/.*applewebkit\/(\d+).*/.exec(g)?this.parseVersion(RegExp.$1):"0";this.geckoVersion=this.gecko&&/.*rv:\s*([^\)]+)\)\s+gecko/.exec(g)?this.parseVersion(RegExp.$1):"0";this.konquerorVersion=this.konqueror&&/.*konqueror\/([\d\.]+).*/.exec(g)?this.parseVersion(RegExp.$1):"0";this.flashVersion=0;if(this.ieWin){var l;var o=false;try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(m){try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");this.flashVersion=this.parseVersion("6");l.AllowScriptAccess="always"}catch(m){o=this.flashVersion==this.parseVersion("6")}if(!o){try{l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(m){}}}if(!o&&l){this.flashVersion=this.parseVersion((l.GetVariable("$version")||"").replace(/^\D+(\d+)\D+(\d+)\D+(\d+).*/g,"$1.$2.$3"))}}else{if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){var n=navigator.plugins["Shockwave Flash"].description.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var p=n.replace(/^\D*(\d+\.\d+).*$/,"$1");if(/r/.test(n)){p+=n.replace(/^.*r(\d*).*$/,".$1")}else{if(/d/.test(n)){p+=".0"}}this.flashVersion=this.parseVersion(p);var j=false;for(var k=0,c=this.flashVersion>=H.MIN_FLASH_VERSION;c&&k<navigator.mimeTypes.length;k++){var f=navigator.mimeTypes[k];if(f.type!="application/x-shockwave-flash"){continue}if(f.enabledPlugin){j=true;if(f.enabledPlugin.description.toLowerCase().indexOf("quicktime")>-1){c=false;this.quicktime=true}}}if(this.quicktime||!j){this.flashVersion=this.parseVersion("0")}}}this.flash=this.flashVersion>=H.MIN_FLASH_VERSION;this.transparencySupport=this.macintosh||this.windows||this.linux&&(this.flashVersion>=this.parseVersion("10")&&(this.gecko&&this.geckoVersion>=this.parseVersion("1.9")||this.opera));this.computedStyleSupport=this.ie||!!document.defaultView.getComputedStyle;this.fixFocus=this.gecko&&this.windows;this.nativeDomLoaded=this.gecko||this.webkit&&this.webkitVersion>=this.parseVersion("525")||this.konqueror&&this.konquerorMajor>this.parseVersion("03")||this.opera;this.mustCheckStyle=this.khtml||this.opera;this.forcePageLoad=this.webkit&&this.webkitVersion<this.parseVersion("523");this.properDocument=typeof(document.location)=="object";this.supported=this.flash&&this.properDocument&&(!this.ie||this.ieSupported)&&this.computedStyleSupport&&(!this.opera||this.operaVersion>=this.parseVersion("9.61"))&&(!this.webkit||this.webkitVersion>=this.parseVersion("412"))&&(!this.gecko||this.geckoVersion>=this.parseVersion("1.8.0.12"))&&(!this.konqueror)}H.parseVersion=function(c){return c.replace(/(^|\D)(\d+)(?=\D|$)/g,function(f,e,g){f=e;for(var d=4-g.length;d>=0;d--){f+="0"}return f+g})};H.MIN_FLASH_VERSION=H.parseVersion("8");function F(c){this.fix=c.ua.ieWin&&window.location.hash!="";var d;this.cache=function(){d=document.title};function e(){document.title=d}this.restore=function(){if(this.fix){setTimeout(e,0)}}}function S(l){var e=null;function c(){try{if(l.ua.ie||document.readyState!="loaded"&&document.readyState!="complete"){document.documentElement.doScroll("left")}}catch(n){return setTimeout(c,10)}i()}function i(){if(l.useStyleCheck){h()}else{if(!l.ua.mustCheckStyle){d(null,true)}}}function h(){e=l.dom.create("div",E.DUMMY);l.dom.getBody().appendChild(e);m()}function m(){if(l.dom.getComputedStyle(e,"marginLeft")=="42px"){g()}else{setTimeout(m,10)}}function g(){if(e&&e.parentNode){e.parentNode.removeChild(e)}e=null;d(null,true)}function d(n,o){l.initialize(o);if(n&&n.type=="load"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",d,false)}if(window.removeEventListener){window.removeEventListener("load",d,false)}}}function j(){l.prepareClearReferences();if(document.readyState=="interactive"){document.attachEvent("onstop",f);setTimeout(function(){document.detachEvent("onstop",f)},0)}}function f(){document.detachEvent("onstop",f);k()}function k(){l.clearReferences()}this.attach=function(){if(window.addEventListener){window.addEventListener("load",d,false)}else{window.attachEvent("onload",d)}if(!l.useDomLoaded||l.ua.forcePageLoad||l.ua.ie&&window.top!=window){return}if(l.ua.nativeDomLoaded){document.addEventListener("DOMContentLoaded",i,false)}else{if(l.ua.ie||l.ua.khtml){c()}}};this.attachUnload=function(){if(!l.ua.ie){return}window.attachEvent("onbeforeunload",j);window.attachEvent("onunload",k)}}var Q="sifrFetch";function N(c){var e=false;this.fetchMovies=function(f){if(c.setPrefetchCookie&&new RegExp(";?"+Q+"=true;?").test(document.cookie)){return}try{e=true;d(f)}catch(g){}if(c.setPrefetchCookie){document.cookie=Q+"=true;path="+c.cookiePath}};this.clear=function(){if(!e){return}try{var f=document.getElementsByTagName("script");for(var g=f.length-1;g>=0;g--){var h=f[g];if(h.type=="sifr/prefetch"){h.parentNode.removeChild(h)}}}catch(j){}};function d(f){for(var g=0;g<f.length;g++){document.write('<script defer type="sifr/prefetch" src="'+f[g].src+'"><\/script>')}}}function b(e){var g=e.ua.ie;var f=g&&e.ua.flashVersion<e.ua.parseVersion("9.0.115");var d={};var c={};this.fixFlash=f;this.register=function(h){if(!g){return}var i=h.getAttribute("id");this.cleanup(i,false);c[i]=h;delete d[i];if(f){window[i]=h}};this.reset=function(){if(!g){return false}for(var j=0;j<e.replacements.length;j++){var h=e.replacements[j];var k=c[h.id];if(!d[h.id]&&(!k.parentNode||k.parentNode.nodeType==11)){h.resetMovie();d[h.id]=true}}return true};this.cleanup=function(l,h){var i=c[l];if(!i){return}for(var k in i){if(typeof(i[k])=="function"){i[k]=null}}c[l]=null;if(f){window[l]=null}if(i.parentNode){if(h&&i.parentNode.nodeType==1){var j=document.createElement("div");j.style.width=i.offsetWidth+"px";j.style.height=i.offsetHeight+"px";i.parentNode.replaceChild(j,i)}else{i.parentNode.removeChild(i)}}};this.prepareClearReferences=function(){if(!f){return}__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}};this.clearReferences=function(){if(f){var j=document.getElementsByTagName("object");for(var h=j.length-1;h>=0;h--){c[j[h].getAttribute("id")]=j[h]}}for(var k in c){if(Object.prototype[k]!=c[k]){this.cleanup(k,true)}}}}function K(d,g,f,c,e){this.sIFR=d;this.id=g;this.vars=f;this.movie=null;this.__forceWidth=c;this.__events=e;this.__resizing=0}K.prototype={getFlashElement:function(){return document.getElementById(this.id)},getAlternate:function(){return document.getElementById(this.id+"_alternate")},getAncestor:function(){var c=this.getFlashElement().parentNode;return !this.sIFR.dom.hasClass(E.FIX_FOCUS,c)?c:c.parentNode},available:function(){var c=this.getFlashElement();return c&&c.parentNode},call:function(c){var d=this.getFlashElement();if(!d[c]){return false}return Function.prototype.apply.call(d[c],d,Array.prototype.slice.call(arguments,1))},attempt:function(){if(!this.available()){return false}try{this.call.apply(this,arguments)}catch(c){if(this.sIFR.debug){throw c}return false}return true},updateVars:function(c,e){for(var d=0;d<this.vars.length;d++){if(this.vars[d].split("=")[0]==c){this.vars[d]=c+"="+e;break}}var f=this.sIFR.util.encodeVars(this.vars);this.movie.injectVars(this.getFlashElement(),f);this.movie.injectVars(this.movie.html,f)},storeSize:function(c,d){this.movie.setSize(c,d);this.updateVars(c,d)},fireEvent:function(c){if(this.available()&&this.__events[c]){this.sIFR.util.delay(0,this.__events[c],this,this)}},resizeFlashElement:function(c,d,e){if(!this.available()){return}this.__resizing++;var f=this.getFlashElement();f.setAttribute("height",c);this.getAncestor().style.minHeight="";this.updateVars("renderheight",c);this.storeSize("height",c);if(d!==null){f.setAttribute("width",d);this.movie.setSize("width",d)}if(this.__events.onReplacement){this.sIFR.util.delay(0,this.__events.onReplacement,this,this);delete this.__events.onReplacement}if(e){this.sIFR.util.delay(0,function(){this.attempt("scaleMovie");this.__resizing--},this)}else{this.__resizing--}},blurFlashElement:function(){if(this.available()){this.sIFR.dom.blurElement(this.getFlashElement())}},resetMovie:function(){this.sIFR.util.delay(0,this.movie.reset,this.movie,this.getFlashElement(),this.getAlternate())},resizeAfterScale:function(){if(this.available()&&this.__resizing==0){this.sIFR.util.delay(0,this.resize,this)}},resize:function(){if(!this.available()){return}this.__resizing++;var g=this.getFlashElement();var f=g.offsetWidth;if(f==0){return}var e=g.getAttribute("width");var l=g.getAttribute("height");var m=this.getAncestor();var o=this.sIFR.dom.getHeightFromStyle(m);g.style.width="1px";g.style.height="1px";var c=this.getAlternate().childNodes;var n=[];for(var k=0;k<c.length;k++){var h=c[k].cloneNode(true);n.push(h);m.appendChild(h)}var d=this.sIFR.dom.getWidthFromStyle(m);for(var k=0;k<n.length;k++){m.removeChild(n[k])}g.style.width=g.style.height=m.style.minHeight="";g.setAttribute("width",this.__forceWidth?d:e);g.setAttribute("height",l);if(sIFR.ua.ie){g.style.display="none";var j=g.offsetHeight;g.style.display=""}if(d!=f){if(this.__forceWidth){this.storeSize("width",d)}this.attempt("resize",d)}this.__resizing--},replaceText:function(g,j){var d=this.sIFR.util.escape(g);if(!this.attempt("replaceText",d)){return false}this.updateVars("content",d);var f=this.getAlternate();if(j){while(f.firstChild){f.removeChild(f.firstChild)}for(var c=0;c<j.length;c++){f.appendChild(j[c])}}else{try{f.innerHTML=g}catch(h){}}return true},changeCSS:function(c){c=this.sIFR.util.escape(this.sIFR.util.cssToString(this.sIFR.util.convertCssArg(c)));this.updateVars("css",c);return this.attempt("changeCSS",c)},remove:function(){if(this.movie&&this.available()){this.movie.remove(this.getFlashElement(),this.id)}}};var X=new function(){this.create=function(p,n,j,i,f,e,g,o,l,h,m){var k=p.ua.ie?d:c;return new k(p,n,j,i,f,e,g,o,["flashvars",l,"wmode",h,"bgcolor",m,"allowScriptAccess","always","quality","best"])};function c(s,q,l,h,f,e,g,r,n){var m=s.dom.create("object",E.FLASH);var p=["type","application/x-shockwave-flash","id",f,"name",f,"data",e,"width",g,"height",r];for(var o=0;o<p.length;o+=2){m.setAttribute(p[o],p[o+1])}var j=m;if(h){j=W.create("div",E.FIX_FOCUS);j.appendChild(m)}for(var o=0;o<n.length;o+=2){if(n[o]=="name"){continue}var k=W.create("param");k.setAttribute("name",n[o]);k.setAttribute("value",n[o+1]);m.appendChild(k)}while(l.firstChild){l.removeChild(l.firstChild)}l.appendChild(j);this.html=j.cloneNode(true)}c.prototype={reset:function(e,f){e.parentNode.replaceChild(this.html.cloneNode(true),e)},remove:function(e,f){e.parentNode.removeChild(e)},setSize:function(e,f){this.html.setAttribute(e,f)},injectVars:function(e,g){var h=e.getElementsByTagName("param");for(var f=0;f<h.length;f++){if(h[f].getAttribute("name")=="flashvars"){h[f].setAttribute("value",g);break}}}};function d(p,n,j,h,f,e,g,o,k){this.dom=p.dom;this.broken=n;this.html='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="'+f+'" width="'+g+'" height="'+o+'" class="'+E.FLASH+'"><param name="movie" value="'+e+'"></param></object>';var m="";for(var l=0;l<k.length;l+=2){m+='<param name="'+k[l]+'" value="'+k[l+1]+'"></param>'}this.html=this.html.replace(/(<\/object>)/,m+"$1");j.style.minHeight=o+"px";j.innerHTML=this.html;this.broken.register(j.firstChild)}d.prototype={reset:function(f,g){g=g.cloneNode(true);var e=f.parentNode;e.innerHTML=this.html;this.broken.register(e.firstChild);e.appendChild(g)},remove:function(e,f){this.broken.cleanup(f)},setSize:function(e,f){this.html=this.html.replace(e=="height"?/(height)="\d+"/:/(width)="\d+"/,'$1="'+f+'"')},injectVars:function(e,f){if(e!=this.html){return}this.html=this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/,"$1"+f)}}};this.errors=new Y(O);var A=this.util=new D(O);var W=this.dom=new U(O);var T=this.ua=new H(O);var G={fragmentIdentifier:new F(O),pageLoad:new S(O),prefetch:new N(O),brokenFlashIE:new b(O)};this.__resetBrokenMovies=G.brokenFlashIE.reset;var J={kwargs:[],replaceAll:function(d){for(var c=0;c<this.kwargs.length;c++){O.replace(this.kwargs[c])}if(!d){this.kwargs=[]}}};this.activate=function(){if(!T.supported||!this.isEnabled||this.isActive||!C()||a()){return}G.prefetch.fetchMovies(arguments);this.isActive=true;this.setFlashClass();G.fragmentIdentifier.cache();G.pageLoad.attachUnload();if(!this.autoInitialize){return}G.pageLoad.attach()};this.setFlashClass=function(){if(this.hasFlashClassSet){return}W.addClass(E.ACTIVE,W.getBody()||document.documentElement);this.hasFlashClassSet=true};this.removeFlashClass=function(){if(!this.hasFlashClassSet){return}W.removeClass(E.ACTIVE,W.getBody());W.removeClass(E.ACTIVE,document.documentElement);this.hasFlashClassSet=false};this.initialize=function(c){if(!this.isActive||!this.isEnabled){return}if(R){if(!c){J.replaceAll(false)}return}R=true;J.replaceAll(c);if(O.repaintOnResize){if(window.addEventListener){window.addEventListener("resize",Z,false)}else{window.attachEvent("onresize",Z)}}G.prefetch.clear()};this.replace=function(x,u){if(!T.supported){return}if(u){x=A.copyProperties(x,u)}if(!R){return J.kwargs.push(x)}if(this.onReplacementStart){this.onReplacementStart(x)}var AM=x.elements||W.querySelectorAll(x.selector);if(AM.length==0){return}var w=M(x.src);var AR=A.convertCssArg(x.css);var v=B(x.filters);var AN=x.forceSingleLine===true;var AS=x.preventWrap===true&&!AN;var q=AN||(x.fitExactly==null?this.fitExactly:x.fitExactly)===true;var AD=q||(x.forceWidth==null?this.forceWidth:x.forceWidth)===true;var s=x.ratios||[];var AE=x.pixelFont===true;var r=parseInt(x.tuneHeight)||0;var z=!!x.onRelease||!!x.onRollOver||!!x.onRollOut;if(q){A.extractFromCss(AR,".sIFR-root","text-align",true)}var t=A.extractFromCss(AR,".sIFR-root","font-size",true)||"0";var e=A.extractFromCss(AR,".sIFR-root","background-color",true)||"#FFFFFF";var o=A.extractFromCss(AR,".sIFR-root","kerning",true)||"";var AW=A.extractFromCss(AR,".sIFR-root","opacity",true)||"100";var k=A.extractFromCss(AR,".sIFR-root","cursor",true)||"default";var AP=parseInt(A.extractFromCss(AR,".sIFR-root","leading"))||0;var AJ=x.gridFitType||(A.extractFromCss(AR,".sIFR-root","text-align")=="right")?"subpixel":"pixel";var h=this.forceTextTransform===false?"none":A.extractFromCss(AR,".sIFR-root","text-transform",true)||"none";t=/^\d+(px)?$/.test(t)?parseInt(t):0;AW=parseFloat(AW)<1?100*parseFloat(AW):AW;var AC=x.modifyCss?"":A.cssToString(AR);var AG=x.wmode||"";if(!AG){if(x.transparent){AG="transparent"}else{if(x.opaque){AG="opaque"}}}if(AG=="transparent"){if(!T.transparencySupport){AG="opaque"}else{e="transparent"}}else{if(e=="transparent"){e="#FFFFFF"}}for(var AV=0;AV<AM.length;AV++){var AF=AM[AV];if(W.hasOneOfClassses(E.IGNORE_CLASSES,AF)||W.ancestorHasClass(AF,E.ALTERNATE)){continue}var AO=W.getDimensions(AF);var f=AO.height;var c=AO.width;var AA=W.getComputedStyle(AF,"display");if(!f||!c||!AA||AA=="none"){continue}c=W.getWidthFromStyle(AF);var n,AH;if(!t){var AL=I(AF);n=Math.min(this.MAX_FONT_SIZE,Math.max(this.MIN_FONT_SIZE,AL.fontSize));if(AE){n=Math.max(8,8*Math.round(n/8))}AH=AL.lines}else{n=t;AH=1}var d=W.create("span",E.ALTERNATE);var AX=AF.cloneNode(true);AF.parentNode.appendChild(AX);for(var AU=0,AT=AX.childNodes.length;AU<AT;AU++){var m=AX.childNodes[AU];if(!/^(style|script)$/i.test(m.nodeName)){d.appendChild(m.cloneNode(true))}}if(x.modifyContent){x.modifyContent(AX,x.selector)}if(x.modifyCss){AC=x.modifyCss(AR,AX,x.selector)}var p=P(AX,h,x.uriEncode);AX.parentNode.removeChild(AX);if(x.modifyContentString){p.text=x.modifyContentString(p.text,x.selector)}if(p.text==""){continue}var AK=Math.round(AH*V(n,s)*n)+this.FLASH_PADDING_BOTTOM+r;if(AH>1&&AP){AK+=Math.round((AH-1)*AP)}var AB=AD?c:"100%";var AI="sIFR_replacement_"+L++;var AQ=["id="+AI,"content="+A.escape(p.text),"width="+c,"renderheight="+AK,"link="+A.escape(p.primaryLink.href||""),"target="+A.escape(p.primaryLink.target||""),"size="+n,"css="+A.escape(AC),"cursor="+k,"tunewidth="+(x.tuneWidth||0),"tuneheight="+r,"offsetleft="+(x.offsetLeft||""),"offsettop="+(x.offsetTop||""),"fitexactly="+q,"preventwrap="+AS,"forcesingleline="+AN,"antialiastype="+(x.antiAliasType||""),"thickness="+(x.thickness||""),"sharpness="+(x.sharpness||""),"kerning="+o,"gridfittype="+AJ,"flashfilters="+v,"opacity="+AW,"blendmode="+(x.blendMode||""),"selectable="+(x.selectable==null||AG!=""&&!sIFR.ua.macintosh&&sIFR.ua.gecko&&sIFR.ua.geckoVersion>=sIFR.ua.parseVersion("1.9")?"true":x.selectable===true),"fixhover="+(this.fixHover===true),"events="+z,"delayrun="+G.brokenFlashIE.fixFlash,"version="+this.VERSION];var y=A.encodeVars(AQ);var g=new K(O,AI,AQ,AD,{onReplacement:x.onReplacement,onRollOver:x.onRollOver,onRollOut:x.onRollOut,onRelease:x.onRelease});g.movie=X.create(sIFR,G.brokenFlashIE,AF,T.fixFocus&&x.fixFocus,AI,w,AB,AK,y,AG,e);this.replacements.push(g);this.replacements[AI]=g;if(x.selector){if(!this.replacements[x.selector]){this.replacements[x.selector]=[g]}else{this.replacements[x.selector].push(g)}}d.setAttribute("id",AI+"_alternate");AF.appendChild(d);W.addClass(E.REPLACED,AF)}G.fragmentIdentifier.restore()};this.getReplacementByFlashElement=function(d){for(var c=0;c<O.replacements.length;c++){if(O.replacements[c].id==d.getAttribute("id")){return O.replacements[c]}}};this.redraw=function(){for(var c=0;c<O.replacements.length;c++){O.replacements[c].resetMovie()}};this.prepareClearReferences=function(){G.brokenFlashIE.prepareClearReferences()};this.clearReferences=function(){G.brokenFlashIE.clearReferences();G=null;J=null;delete O.replacements};function C(){if(O.domains.length==0){return true}var d=A.domain();for(var c=0;c<O.domains.length;c++){if(A.domainMatches(d,O.domains[c])){return true}}return false}function a(){if(document.location.protocol=="file:"){if(O.debug){O.errors.fire("isFile")}return true}return false}function M(c){if(T.ie&&c.charAt(0)=="/"){c=window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/,"$1$2$3")+c}return c}function V(d,e){for(var c=0;c<e.length;c+=2){if(d<=e[c]){return e[c+1]}}return e[e.length-1]||1}function B(g){var e=[];for(var d in g){if(g[d]==Object.prototype[d]){continue}var c=g[d];d=[d.replace(/filter/i,"")+"Filter"];for(var f in c){if(c[f]==Object.prototype[f]){continue}d.push(f+":"+A.escape(A.toJson(c[f],A.toHexString)))}e.push(d.join(","))}return A.escape(e.join(";"))}function Z(d){var e=Z.viewport;var c=W.getViewport();if(e&&c.width==e.width&&c.height==e.height){return}Z.viewport=c;if(O.replacements.length==0){return}if(Z.timer){clearTimeout(Z.timer)}Z.timer=setTimeout(function(){delete Z.timer;for(var f=0;f<O.replacements.length;f++){O.replacements[f].resize()}},200)}function I(f){var g=W.getComputedStyle(f,"fontSize");var d=g.indexOf("px")==-1;var e=f.innerHTML;if(d){f.innerHTML="X"}f.style.paddingTop=f.style.paddingBottom=f.style.borderTopWidth=f.style.borderBottomWidth="0px";f.style.lineHeight="2em";f.style.display="block";g=d?f.offsetHeight/2:parseInt(g,10);if(d){f.innerHTML=e}var c=Math.round(f.offsetHeight/(2*g));f.style.paddingTop=f.style.paddingBottom=f.style.borderTopWidth=f.style.borderBottomWidth=f.style.lineHeight=f.style.display="";if(isNaN(c)||!isFinite(c)||c==0){c=1}return{fontSize:g,lines:c}}function P(c,g,s){s=s||A.uriEncode;var q=[],m=[];var k=null;var e=c.childNodes;var o=false,p=false;var j=0;while(j<e.length){var f=e[j];if(f.nodeType==3){var t=A.textTransform(g,A.normalize(f.nodeValue)).replace(/</g,"&lt;");if(o&&p){t=t.replace(/^\s+/,"")}m.push(t);o=/\s$/.test(t);p=false}if(f.nodeType==1&&!/^(style|script)$/i.test(f.nodeName)){var h=[];var r=f.nodeName.toLowerCase();var n=f.className||"";if(/\s+/.test(n)){if(n.indexOf(E.CLASS)>-1){n=n.match("(\\s|^)"+E.CLASS+"-([^\\s$]*)(\\s|$)")[2]}else{n=n.match(/^([^\s]+)/)[1]}}if(n!=""){h.push('class="'+n+'"')}if(r=="a"){var d=s(f.getAttribute("href")||"");var l=f.getAttribute("target")||"";h.push('href="'+d+'"','target="'+l+'"');if(!k){k={href:d,target:l}}}m.push("<"+r+(h.length>0?" ":"")+h.join(" ")+">");p=true;if(f.hasChildNodes()){q.push(j);j=0;e=f.childNodes;continue}else{if(!/^(br|img)$/i.test(f.nodeName)){m.push("</",f.nodeName.toLowerCase(),">")}}}if(q.length>0&&!f.nextSibling){do{j=q.pop();e=f.parentNode.parentNode.childNodes;f=e[j];if(f){m.push("</",f.nodeName.toLowerCase(),">")}}while(j==e.length-1&&q.length>0)}j++}return{text:m.join("").replace(/^\s+|\s+$|\s*(<br>)\s*/g,"$1"),primaryLink:k||{}}}};
var parseSelector=(function(){var B=/\s*,\s*/;var A=/\s*([\s>+~(),]|^|$)\s*/g;var L=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var F=/(^|\))[^\s>+~]/g;var M=/(\)|^)/;var K=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function H(R,P){P=P||document.documentElement;var S=R.split(B),X=[];for(var U=0;U<S.length;U++){var N=[P],W=G(S[U]);for(var T=0;T<W.length;){var Q=W[T++],O=W[T++],V="";if(W[T]=="("){while(W[T++]!=")"&&T<W.length){V+=W[T]}V=V.slice(0,-1)}N=I(N,Q,O,V)}X=X.concat(N)}return X}function G(N){var O=N.replace(A,"$1").replace(L,"$1*$2").replace(F,D);return O.match(K)||[]}function D(N){return N.replace(M,"$1 ")}function I(N,P,Q,O){return(H.selectors[P])?H.selectors[P](N,Q,O):[]}var E={toArray:function(O){var N=[];for(var P=0;P<O.length;P++){N.push(O[P])}return N}};var C={isTag:function(O,N){return(N=="*")||(N.toLowerCase()==O.nodeName.toLowerCase())},previousSiblingElement:function(N){do{N=N.previousSibling}while(N&&N.nodeType!=1);return N},nextSiblingElement:function(N){do{N=N.nextSibling}while(N&&N.nodeType!=1);return N},hasClass:function(N,O){return(O.className||"").match("(^|\\s)"+N+"(\\s|$)")},getByTag:function(N,O){return O.getElementsByTagName(N)}};var J={"#":function(N,P){for(var O=0;O<N.length;O++){if(N[O].getAttribute("id")==P){return[N[O]]}}return[]}," ":function(O,Q){var N=[];for(var P=0;P<O.length;P++){N=N.concat(E.toArray(C.getByTag(Q,O[P])))}return N},">":function(O,R){var N=[];for(var Q=0,S;Q<O.length;Q++){S=O[Q];for(var P=0,T;P<S.childNodes.length;P++){T=S.childNodes[P];if(T.nodeType==1&&C.isTag(T,R)){N.push(T)}}}return N},".":function(O,Q){var N=[];for(var P=0,R;P<O.length;P++){R=O[P];if(C.hasClass([Q],R)){N.push(R)}}return N},":":function(N,P,O){return(H.pseudoClasses[P])?H.pseudoClasses[P](N,O):[]}};H.selectors=J;H.pseudoClasses={};H.util=E;H.dom=C;return H})();/**
 * Namespace for iCrossing utility classes
 * @namespace
 */
var IC = COM = {};	// COM is legacy, remove when all references are gone.
/**
 * JavaScript library independent HTML utility functions
 * @namespace
 */ 
IC.HTML = new function () {
	/**
	 * Get a plain DOM interface to an HTML element. Will return only the first element if given an array
	 * @public
	 * @param {ExtendedHTMLElement} element A library-extended HTML element
	 * @returns {HTMLElement} A plain HTML element (or an extended HTML element with DOM interface intact)
	 */
	this.getPlainElement = function (element) {
		if (element) {
			if (element.nodeType == 1)
				return element;
			else if (element.jquery || (element.length && element[0].nodeType == 1))
				return element[0];
			else
				return false;
		}
	};

	/**
	 * Get an array of plain HTML elements
	 * @public
	 * @param {ExtendedHTMLElement[]} elements An array of library-extended HTML elements
	 * @returns {HTMLElement[]} Array of plain HTML elements (or extended HTML elements with DOM interface intact)
	 */
	this.getPlainElements = function (elements) {
		var plainElements = [];

		if (elements.length) for (var i = 0; i < elements.length; i++) {
			plainElement = this.getPlainElement(elements[i]);

			if (plainElement)
				plainElements.push(plainElement);
		}

		return plainElements;
	};
};

/**
 * A simple cookie manager with sensible defaults.  Set(/update), get, and toss individual cookies.
 * @namespace
 */
IC.CookieJar = new function () {
	/**
	 * Default cookie settings
	 */
	var defaults = {
		'path': '/',
		'domain': window.location.host.indexOf('.') != -1 ?
			window.location.host.match(/[^\.]*\.[^\.]*$/)[0] :
			window.location.host,
		'expires': new Date((new Date()).getTime() + (new Date('Jan 1, 1971')).getTime()).toUTCString(),
		'max-age': new Date('Jan 1, 1971').getTime() / 1000,
		'secure': window.location.protocol.indexOf('https') != -1 ?
			true :
			false
	};	

	/**
	 * Set or update a cookie
	 * @public
	 * @param {String} name The name of the cookie to set.
	 * @param {String} value The value of the cookie.
	 * @param {Object} [params] A parameters object.
	 * @param {String} [params.path="/"] The path where the cookie is valid.
	 * @param {String} [params.domain=the current domain minus any subdomains] The domain where the cookie is valid.
	 * @param {String} [params.max-age="31557600" (one year)] The max age of the cookie in seconds.
	 * @param {Boolean} [params.secure=true if https, false if not] Flag to set whether the cookie is secure.
	 */
	this.setCookie = function (name, value, params) {		
		var params = params || defaults;
		var cookie = name + '=' + encodeURIComponent(value);
		
		for (var prop in defaults) if (defaults.hasOwnProperty(prop)) {
			if (prop != 'secure')
				cookie += ';' + prop + '=' + (params[prop] || defaults[prop]);
		}

		if (params.secure)
			cookie += ';secure';

		document.cookie = cookie;
	};

	/**
	 * Retrieve a cookie value by cookie name
	 * @public
	 * @param {String} name The name of the cookie to retrieve.
	 * @returns {String} The value of the cookie if found or empty string.
	 */
	this.getCookie = function (name) {
		return document.cookie.indexOf(name + '=') != -1 ?
			decodeURIComponent(document.cookie.match(new RegExp(name + '=([^;]*)'))[1]) :
			'';
	};
	
	/**
	 * Toss a cookie by name
	 * @public
	 * @param {String} name The name of the cookie to toss.
	 */
	this.tossCookie = function (name) {
		document.cookie = name + '=;max-age=0;;';
	};
};
/**
 * String/HTML template parser
 * @namespace
 */
IC.Template = new function () {
	/**
	 * Regular expression representing the pattern that identifies a template variable
	 */
	var variablePattern = /\{\{([^\}]*)\}\}/g;	// pattern matches this: {{variableName}}
	
	/**
	 * Method to strip the delimiters defined in variablePattern leaving only the variable name
	 * @param {String} templateVariable A template variable matching the variablePattern
	 * @returns {String} The template variable name with the delimiters removed for use as a key
	 */
	var stripDelimiters = function (templateVariable) {
		return templateVariable.replace(/^\{\{/, '').replace(/\}\}$/, '');
	};
	
	/**
	 * Parses a string template
	 * @param {String} template A string template.
	 * @param {Object} data An object of key value pairs to populate the template.
	 * @returns {String} Parsed string template.
	 */
	var parseStringTemplate = function (template, data) {
		// Extend the data with some of our environment related data in case it's needed
		data = data || {};
		data.postalCode = data.postalCode || (HN ? HN.getPostalCode : '');
		data.language = data.language || (HN ? HN.getLanguage() : '');
		data.languagePath = data.languagePath || (HN ? HN.getLanguagePath() : '');

		var actions, actionName, variableName, param;
		var matches = template.match(variablePattern);
		
		if (matches) for (var i = 0; i < matches.length; i++) {
			actions = stripDelimiters(matches[i]).split(':');
			variableName = actions.shift();
			
			if (actions.length) for (var j = 0; j < actions.length; j++) {
				actionName = actions[j].split('(')[0];
				param = actions[j].match(/\(\'(.*)\'\)/)[1];
				
				if (data[variableName] && data[variableName][actionName]) {
					data[variableName] = data[variableName][actionName](param);
				}
			}
			template = template.replace(matches[i], data[variableName] || '');
		}
		
		return template;
	};
	
	/**
	 * Parses an HTML template, uses parseStringTemplate to handle the innerHTML
	 * @param {HTMLElement} template An HTML template.
	 * @param {Object} data An object of key value pairs to populate the template.
	 * @returns {HTMLElement} Parsed HTML node (clone).
	 */
	var parseHTMLTemplate = function (template, data) {
		var clone = template.cloneNode(true);
		var wrapper;
		
		switch(clone.tagName.toLowerCase()) {
			case 'option':
				wrapper = document.createElement('select');
				break;
			case 'li':
				wrapper = document.createElement('ul');
				break;
			default:
				wrapper = document.createElement('div');
				break;
		}
		
		wrapper.appendChild(clone);
		
		
		if($.browser.msie){
			var attributes = ['name', 'value', 'id', 'class'];
			for (var i = 0; i < attributes.length; i++) {
				clone[attributes[i]] = parseStringTemplate(decodeURIComponent(clone[attributes[i]]), data);
			}
		}
		
		// Parse the innerHTML
		var innerHTML = ($.browser.msie) ? parseStringTemplate(decodeURIComponent(wrapper.childNodes[0].innerHTML), data) : parseStringTemplate(decodeURIComponent(wrapper.innerHTML), data);
		
		// Our syntax for preventing broken links in nodes is href="##{{SomeVar}}
		// Convert it back to valid link
		innerHTML = innerHTML.replace(/##/g, '');

		// Our syntax for preventing broken images in the templates is tpl-src="{{SomeVar}} 
		// Convert it back to a valid src
		innerHTML = innerHTML.replace(/tpl\-src\=/, 'src=');

		if($.browser.msie){
			wrapper.childNodes[0].innerHTML = innerHTML;
		}else{
			wrapper.innerHTML = innerHTML;
		}		
		
		return wrapper.childNodes[0];
	};
	
	/**
	 * Parse an HTML or string template
	 * @public
	 * @param {HTMLElement|String} template An HTML or string template.
	 * @param {Object} data An object of key value pairs to use in populating the template.
	 * @returns {HTMLElement|String} Parsed template.
	 */
	this.parse = function (template, data) {
		if (typeof template == 'string') {
			return parseStringTemplate(template, data);
		} else if (typeof template == 'object') {
			return parseHTMLTemplate(IC.HTML.getPlainElement(template), data);
		}
	};
};

/**
 * Global Validation object
 * @namespace
 */
IC.Validator = new function () {
	/**
	 * An object of validation patterns and functions
	 */
	var validationRules = {
		'postalCode': {
			'us': { 
				'short': /^([0-9]{5}){0,1}$/, 
				'long': /^([0-9]{5}\-[0-9]{4}){0,1}$/ 
			},
			'canada': /^([A-Ya-y]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}){0,1}$/
		},
		'email': /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}){0,1}$/,
		'alpha': /^[a-zA-Z\s]*$/,
		'numeric': /^[0-9]*$/,
		'alphanumeric': /^[a-zA-Z0-9\s]*$/,
		'required': /^.+$/,
		'alwaysFail': /a^/,
		'integerLessThan': function (value, maxValue) {
			var negative = '';
			if ((value + '').match(/^-/)) {
				negative = '-';
			}
			
			value = parseInt((value + '').replace(/[^0-9]/g, ''), 10);
			if (negative) {
				value = -value;
			}
			
			return (value || 0) < maxValue;
		},
		/** @ignore */
		'maxLength': function (value, maxLength) {
			return value.length <= maxLength;
		},
		/** @ignore */
		'minLength': function (value, minLength) {
			return value.length >= minLength;
		},
		/** @ignore */
		'match': function (value, field) {
			return value.toLowerCase() == IC.HTML.getPlainElement(field).value.toLowerCase();
		}
	};
	
	/**
	 * Validate a string against a validation rule
	 * @public
	 * @param {String} ruleName The name of the validation rule to use.
	 * @param {String} value The string value to test.
	 * @param {String|Object} [param] A parameter to pass in if the rule we're testing is a validation function, see min/max validations.
	 * @returns {Boolean} True if passed, false if failed.
	 */
	this.validate = function (ruleName, value, param) {
		var keys = ruleName.split('.');
		var param = param || '';
		var rule;
		
		if (keys.length <= 1) {
			rule = validationRules[ruleName];
		} else {
			rule = validationRules[keys[0]];
			for (var i = 1; i < keys.length; i++) {
				rule = rule[keys[i]];
			}
		}

		return (typeof rule == 'function') ? rule(value, param) : rule.test(value);
	};

	/**
	 * 
	 * @param {Object[]} rules An array of rule Objects to apply to the field. <br>
	 	- Ex: [{ ruleName:'alpha', errorMessage:'Only alpha allowed' }, { ruleName:'numeric', ... }].
	 * @param {HTMLElement} field The field to validate.
	 * @param {Function} [callback="function () {}"] A callback to fire on completion. <br>
	 	- Parameters to callback are: ({HTMLElement} field, {String} ruleName, {String} errorMessage).
	 * @returns {String[]} An array of error messages for the field.
	 */
	this.validateField = function (rules, field, callback, fieldID) {
		var field = IC.HTML.getPlainElement(field);
		var callback = callback || function () {};
		var errors = [];

		for (var i = 0; i < rules.length; i++) {
			if (!IC.Validator.validate(rules[i].ruleName, field.value, rules[i].param)) {
				callback(field, rules[i].ruleName, rules[i].errorMessage, fieldID);
				errors.push(rules[i].errorMessage);
			}
		}
		
		return errors;
	};

	/**
	 * Validate a form against the given rules and execute callbacks as supplied by caller.
	 * @param {Object} rules A rules object to apply to the form <br> 
	 	- Ex: { 'fieldIdentifier' : [{ ruleName:'alpha', ... }, { minLength:5, ...}], 'nextFieldIdentifier': [ ... ] }.
	 * @param {HTMLElement} form The form or parent element of the target fields.
	 * @param {Object} [params] A parameters object.
	 * @param {String} [params.fieldAttribute="name"] A string indicating the attribute used in the rules to identify a field [name|class|id].
	 * @param {Function} [params.fieldError="function () {}"] A callback fired for each field error, typically used to set an error class on the field and add the error message to the error summary. <br>
	 	- Parameters to the params.fieldError callback are: ({HTMLElement} field, {String} ruleName, {String} errorMessage). <br>
	 	- params.fieldError is called for each rule that fails validation.
	 * @param {Function} [params.complete="function () {}"] A callback fired when validation is complete. <br>
	 	- Parameters to the params.complete callback are: ({Array} ...).
	 * @returns {Boolean} True if passed, false if failed.
	 */
	this.validateForm = function (rules, form, params) {
		var form = IC.HTML.getPlainElement(form);
		var fields = form.tagName == 'FORM' ? 
			form.elements : 
			new Array()
				.concat(form.getElementsByTagName('input'))
				.concat(form.getElementsByTagName('select'))
				.concat(form.getElementsByTagName('textarea'));
		var errors = [];
		
		var params = params || {};
		params.fieldAttribute = params.fieldAttribute || 'name';
		params.fieldError = params.fieldError || function () {};
		params.complete = params.complete || function () {};
		
		var field;
		// Loop through the fields identified in the rules
		for (var fieldID in rules) if (rules.hasOwnProperty(fieldID)) {
			// Get the field according to the fieldAttribute param
			if (params.fieldAttribute == 'id') {
				field = document.getElementById(fieldID);
			} else if (params.fieldAttribute == 'class') {
				field = $(form).find('.' +  fieldID)[0];
			} else if (params.fieldAttribute == 'name') {
				field = form[fieldID];
			}

			// Call validate field and add errors to the form's errors
			errors = errors.concat(this.validateField(rules[fieldID], field, params.fieldError, fieldID));
		}
		
		params.complete(errors);
		
		return errors.length ? false : true;
	};
};

/**
 * Hyundai namespace
 * @namespace HN
 */
var HN = new function () {
	var self = this;
	
	/**
	 * Default site config for JavaScript
	 * (Loaded only to prevent disasters... such as a missing environment.js file)
	 */
	if (typeof CONFIG === 'undefined') {
		console.log("WARNING: global CONFIG is undefined, using defaults from HN");
		CONFIG = {};
	}
	
	CONFIG.servers = CONFIG.servers || {
		'servicesServer': 'http://papp.hyundaiusa.com',
		'localServicesServer': '/Services'
	};

	CONFIG.languages = CONFIG.languages || {
		'kr-KO': '/korean',
		'es-US': '/espanol',
		'en-US': ''
	};

	CONFIG.googleMapsAPIKey = CONFIG.googleMapsAPIKey || 
		'ABQIAAAAv_tfbxe92JJeVK17zbioJxSH1oCJjHGkwfpr8Sigh5dyfCpT-BQhUwNR7EAne_YYXateIiTz7YgoHA';

	/**
	 * Detect language by checking window.location against keys set in environment.js
	 */
	var language = (function () {
		for (var prop in CONFIG.languages) if (CONFIG.languages.hasOwnProperty(prop)) {
			// If there is a path set for the language code, check it agains the current location
			if (CONFIG.languages[prop] !== '' && CONFIG.languages[prop] !== '/') {
				// Build the regex to test the pathname
				var regex = new RegExp('^' + CONFIG.languages[prop]);
				var pathname = window.location.pathname.toLowerCase();

				// If we have a match this is the current language so return the language id
				if (pathname.match(regex)) {
					return prop;
				}
			}
		}

		// Default to english
		return 'en-US';
	})();

	/**
	 * Language Path
	 */
	var languagePath = CONFIG.languages[language];
	
	/**
	 * Postal code
	 */
	var postalCode = IC.CookieJar.getCookie('postal-code');
	
	/**
	 * Postal code detection flag
	 */
	this.postalCodeDetected = postalCode ? true : false;

	/**
	 * Base image path for use in code
	 * @public
	 */
	this.imagePath = '/images';
	
	/**
	 * Base xml path for use in code
	 * @public
	 */
	this.xmlPath = '/xml';
	
	/**
	 * A wrapper for swfobject.embedSWF that uses our SWF defaults for www.hyundaiusa.com. <br>
	 	- Note: Height and width are pulled from the element, so these must be set in the CSS or on the element itself...
	 * @param {String} url The URL to the SWF
	 * @param {String} id The id attribute of the element to replace
	 * @param {Object} [vars={}] A flashvars object for swfobject call
	 * @param {Object} [params] A parameters object for swfobject call
	 * @param {String} [params.wmode="transparent"] 
	 * @param {String} [params.allowscriptaccess="always"] 
	 * @param {String} [params.menu="false"] 
	 * @param {Object} [attributes] An attributes object for swfobject call
	 * @param {String} [attributes.id=the element id || '']
	 * @param {String} [attributes.name=the element name || '']
	 * @param {Function} [callback=function () {}]
	 */
	this.embedSWF = function (url, id, vars, params, attributes, callback) {
		var element = document.getElementById(id);

		// Allow vars, params, attributes to be optional and pass through to callback		
		if (typeof vars == 'function') {
			var callback = vars;
			vars = false;
		} else if (typeof params == 'function') {
			var callback = params;
			params = false;
		} else if (typeof attributes == 'function') {
			var callback = attributes;
			attributes = false;
		} else {
			var callback = callback || function () {};
		}
		
		var vars = vars || {};
		var params = params || { 'wmode': 'transparent', 'allowscriptaccess': 'always', 'menu':'false' };
		var attributes = attributes || { 'id': element.id || '', 'name': element.name || '' };
		
		swfobject.embedSWF(url, id, element.clientWidth, element.clientHeight, '9.0.115', false, vars, params, attributes, callback);
	};
	
	/**
	 * Flag for Google Maps load state
	 */
	var mapsAPILoaded = false;
	
	/**
	 * Hash of service patterns used in getServiceURL
	 */
	var servicePatterns = {
		'globalPromotions': CONFIG.servers.servicesServer + '/GlobalPromotionService.svc/content/{{language}}/{{postalCode}}/{{modelID}}/{{trimID}}/{{powertrainID}}/json?method=?',
		'specialOffers': CONFIG.servers.servicesServer + '/SpecialOffersService.svc/content/{{language}}/{{postalCode}}/{{modelID}}/{{trimID}}/{{powertrainID}}/json?method=?',
		'quickQuoteDealerLocations': CONFIG.servers.servicesServer + '/DealerService.svc/content/lead/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?',
		'appDealerLocations': CONFIG.servers.servicesServer + '/DealerService.svc/content/app/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?',
		'dealerLocations': CONFIG.servers.servicesServer + '/DealerService.svc/content/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?',
		'vehicles': '{{languagePath}}/js/json_data/vehicles.js',
		'postalCode': 'http://sweb.hyundaiusa.com/Services/GeoIPService.svc/GetGeoIP?method=?',
		'compare': CONFIG.servers.servicesServer + '/VehicleService.svc/comp/competition/{{year}}/{{make}}/{{modelID}}/{{type}}?method=?',
		'compareSimilar': CONFIG.servers.servicesServer + '/VehicleService.svc/comp/competition/close/{{trimID}}/trims?method=?',
		'compareFeatures': '/Comparator/vehicle-comparison-features.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}',
		'compareSpecifications': '/Comparator/vehicle-comparison-specs.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}',
        'comparePhotos': '/Comparator/vehicle-photo-comparison.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}',
		'compareInteriorPhotos': '/Comparator/vehicle-photo-comparison-interior.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}',
		'compareExteriorPhotos': '/Comparator/vehicle-photo-comparison-exterior.aspx?trims={{trimID1}}|{{trimID2}}|{{trimID3}}',
		'saveBYO': CONFIG.servers.localServicesServer + '/LeadVehicleService.svc/LeadVehicle/Save/',
		'retrieveBYO': CONFIG.servers.localServicesServer + '/LeadVehicleService.svc/LeadVehicle/ByEmail/{{email}}',
		'equusOnlyDealerLocations': CONFIG.servers.servicesServer + '/DealerService.svc/content/equus/{{language}}/{{postalCode}}/{{maxResults}}/json?method=?'
		
        		
	};
	
	/**
	 * Get parsed service URL
	 * @public
	 * @param {String} serviceName The name of the service, EX: 'specialOffers'
	 * @param {Object} serviceParams Hash params to pass into the service pattern, EX: { postalCode:'60606', language:'en_us' }
	 * @returns {String} Service URL parsed with given params
	 */
	this.getServiceURL = function (serviceName, serviceParams) {
		// Parse the service URL with the parameters
		var serviceURL = IC.Template.parse(servicePatterns[serviceName], serviceParams);

		// Strip double slashes from unset parameters
		// this allows parameters to be optional if the service supports it
		serviceURL = serviceURL
						.replace(/\/{2,}/g, '/')
						.replace(/(\:\/)/g, '://');

		return serviceURL;
	};
	
	/**
	 * mapsAPILoaded getter
	 * @public
	 * @returns {Boolean} Maps API load state
	 */
	this.mapsAPILoaded = function () { 
		return mapsAPILoaded;
	};
	
	/**
	 * Dynamically load the Google Maps API and any extensions that we're using (extInfoWindow)
	 * @public
	 * @param {Function} [callback=function () {}] A callback to fire when all scripts have loaded
	 */
	this.loadMapsAPI = function (callback) {
		if (mapsAPILoaded) {
			(callback || function () {})();
		} else {
		    var safetyTimeout;
		    
            $.getScript("http://www.google.com/jsapi?key=" + CONFIG.googleMapsAPIKey, function () {
				if (typeof google !== 'undefined') {
					clearTimeout(safetyTimeout);
					
                    google.load('maps', '2', { callback: function () {
                        $.getScript("/js/google/extinfowindow.js", function () {
						    mapsAPILoaded = true;
						    (callback || function () {})();
						    callback = function () {};
                        });
                    }});
				} else {
					safetyTimeout = setTimeout(arguments.callee, 250);
					return false;
				}

            });		
		}
	};
	
	/**
	 * Postal code setter
	 * @public
	 * @param {String} p The postal code
	 */
	this.setPostalCode = function (p) {
		postalCode = p;
		IC.CookieJar.setCookie('postal-code', p);
	};
	
	/** 
	 * Laguage setter
	 * @public
	 * @params {String} l The site language
	 */
	this.setLanguage = function (l) {
		language = l;
	};
		
	/**
	 * Language getter
	 * @public
	 * @returns {String} The current HN language setting
	 */
	this.getLanguage = function () {
		return language;
	};
	
	/**
	 * Language Path getter
	 * @public
	 * @returns {String} The current HN language setting
	 */
	this.getLanguagePath = function () {
		return languagePath;
	};
	
	/**
	 * Environment getter
	 * @public
	 * @returns {String} The current HN environment setting
	 */
	this.getEnvironment = function () {
		return environment;
	};
	
	/**
	 * Get postalCode
	 * @public
	 * @returns {String} The cookied or sniffed postal code
	 */
	this.getPostalCode = function () {
		return postalCode;
	};
	
	/**
	 * Formats a number by adding commas and a $ symbol
	 * @public
	 * @param {String|Number} price The price to format
	 * @param {Boolean} [addCurrency=true] Prepend a "$"
	 * @returns {String} Formatted price
	 */
	this.formatPrice = function (price, addCurrency) {
		price = (price + '').split('.')[0].replace(/[^0-9]/g, '');
		addCurrency = typeof addCurrency !== 'undefined' ? addCurrency : true;
		var nicePrice = '';
		
		for (var i = price.length - 1; i >=0; i--) {
			nicePrice = price.charAt(i) + nicePrice;

			if ((price.length - i) % 3 == 0 && i != 0) {
				nicePrice = ',' + nicePrice;
			}
		}

		return (addCurrency ? '$' : '') + nicePrice;
	}

	// Request the detected postalCode if we don't have it from a cookie
	if (!postalCode) {
		// Handle JSONP failure
		setTimeout(function () {
			self.postalCodeDetected = true;
		}, 10000);
		
		
		self.postalCodeDetected = true;
		// Make actual call
		/*
		$.getJSON(this.getServiceURL('postalCode'), function (data) {
			if (data.GetGeoIPResult !== null) {
				self.postalCodeDetected = true;
				// We're going to set the city cookie here, but it is not 
				// (and cannot be with the current set up) synced with the postalCode, 
				// so it should be used with caution.
				IC.CookieJar.setCookie('city', data.GetGeoIPResult.City);
				if (data.GetGeoIPResult.PostalCode !== null) {
					self.setPostalCode(data.GetGeoIPResult.PostalCode);					
				} else {
					self.setPostalCode('');	
				}
			}
		});
		*/
	}
};
/**
 * Hyundai Dealer Locator Class
 * @class HN.DealerLocator
 * @constructor
 * @param {Object} [params={}] A parameters object
 * @param {HTMLElement} [params.mapTarget] An HTML target for the map (if there is one)
 * @param {HTMLElement} [params.infoWindowTemplate] An HTML template for the info window
 * @param {String} [params.infoWindowID] The ID of the info window element
 * @param {String} [params.link] A string indicating the type of link to create between the element and the marker ['markerToElement'|'elementToMarker'|'both']
 * @param {String} [params.dealerType='all'] A string indicating the type of dealers to find - determines service to call - app, quickQuote, or all (default)
 */
HN.DealerLocator = function(params) {
    /**
    * A parameters hash
    */
    params = params || {};

    /**
    * An instance of HN.Map
    */
    this.map = params.mapTarget ?
		new HN.Map({
		    mapTarget: params.mapTarget,
		    infoWindowTemplate: params.infoWindowTemplate,
		    infoWindowID: params.infoWindowID
		}) : false;

    /**
    * A cache of requested dealers indexed by postal code.
    */
    this.dealers = {};
    this.dealersEquus = {};

    /**
    * Parsed dealer HTML templates, stored to allow removal of click links to markers on map change
    */
    this.dealerElements = [];

    /**
    * The last postal code searched
    */
    this.postalCode = '';

    /**
    * List processed flag
    */
    this.listProcessed = false;

    /**
    * The validation rule to apply to the postal code.
    */
    var postalCodeRule = 'postalCode.us.short';

    /**
    * Service name to query - quickQuote, app, or all (default)
    */

    var serviceName = (function() {
        switch (params.dealerType || 'all') {
            case 'quickQuote':
                return 'quickQuoteDealerLocations';
            case 'app':
                return 'appDealerLocations';
            case 'equusOnly':
                return 'equusOnlyDealerLocations';
            case 'all':
            default:
                return 'dealerLocations';
        }
    })();

    /**
    * Find dealers by postal code, store in cache, and execute callback.
    * @public
    * @param {String} postalCode Postal code for the dealer search
    * @param {Function} [callback=function () {}] A callback function to run on completion of a dealer search. Called with the context of the HN.DealerLocator instance
    * @param {Number} [maxResults=30] A maximum number of results to get from the service
    * @returns {Hash} A hash of dealers for the postal code requested 
    */
    this.getDealersByPostalCode = function(postalCode, callback, maxResults, serviceNameExt) {
        
        if ($('#chkEquusDealerLocatorPage').val() != undefined && $('#chkEquusDealerLocatorPage').is(':checked'))
            serviceNameExt = 'equusOnlyDealerLocations';
        else if ($('#chkEquusDealerLocatorPage').val() != undefined && $('#chkEquusDealerLocatorPage').is(':checked') == false)
            serviceNameExt = 'dealerLocations';
        
        
        callback = callback || function() { };
        maxResults = maxResults || 32;
        var self = this;

        // Make sure the postal code is valid
        if (IC.Validator.validate(postalCodeRule, postalCode)) {
            // Store this postal code for use as a key in the dealers cache
            this.postalCode = postalCode;

            // Check dealers cache to see if we've already made this request
            //debugger;

            //            if (equusOnlyInd == 'Y') {
            //                serviceName = 'equusOnlyDealerLocations';
            //            }
            if (serviceNameExt != '' && serviceNameExt != undefined) {
                serviceName = serviceNameExt;
            }
            $.getJSON(HN.getServiceURL(serviceName, { postalCode: self.postalCode, language: HN.getLanguage(), maxResults: maxResults }), function(data, textStatus) {
                self.dealers[self.postalCode] =
		            data.GetDealerLocationJSONResult ||
		            data.GetLeadDealerLocationJSONResult ||
		             data.GetEquusDealerLocationJSONResult ||
		             data.GetEquusDealerLocationJSONResult ||
		            data.GetAppDealerLocationJSONResult;
                callback.call(self, self.dealers[self.postalCode]);
            });

            /*
            if (this.dealersEquus[this.postalCode] && equusOnlyInd == 'Y') {
            callback.call(self, self.dealersEquus[this.postalCode]);
            }
            else if (this.dealers[this.postalCode] && equusOnlyInd != 'Y') {
            callback.call(self, self.dealers[this.postalCode]);
            } 
            else {
            if (equusOnlyInd == 'Y') {
            serviceName = 'equusOnlyDealerLocations';
            }
            $.getJSON(HN.getServiceURL(serviceName, { postalCode: self.postalCode, language: HN.getLanguage(), maxResults: maxResults }), function(data, textStatus) {
            if (equusOnlyInd == 'Y') {
            self.dealersEquus[self.postalCode] = data.GetEquusDealerLocationJSONResult
            callback.call(self, self.dealersEquus[self.postalCode]);
            }
            else {
            self.dealers[self.postalCode] =
            data.GetDealerLocationJSONResult ||
            data.GetLeadDealerLocationJSONResult ||
            data.GetEquusDealerLocationJSONResult ||
            data.GetAppDealerLocationJSONResult;
            callback.call(self, self.dealers[self.postalCode]);
            }
            });
            }
            */
        }

        //return equusOnlyInd == 'Y' ? this.dealersEquus[this.postalCode] : this.dealers[this.postalCode];
        return this.dealers[this.postalCode];
    };

    /**
    * Links click events between marker and corresponding dealer element based on params.link
    * @access private
    * @param {GMarker} marker The GMarker instance created for the dealer
    * @param {HTMLElement} element The parsed dealer node
    */
    this.linkMarkerAndElement = function(marker, element) {
        var self = this;

        // A click on the marker triggers a click on the dealer node
        if (params.link == 'markerToElement') {
            google.maps.Event.addListener(marker, 'click', function() {
                if (element.dispatchEvent) {
                    var clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    element.dispatchEvent(clickEvent);
                } else if (element.fireEvent) {
                    element.fireEvent('onclick');
                }
            });
            // A click on the dealer node triggers a click on the marker
        } else if (params.link == 'elementToMarker') {
            google.maps.Event.addDomListener(element, 'click', function() {
                google.maps.Event.trigger(marker, 'click');
            });
            // A click on the dealer node triggers a click on the marker and vice versa
        } else if (params.link == 'both') {
            // A handler to create a two way link, but prevent an infinite loop
            var handler = function() {
                if (this == element && marker !== self.map.selectedMarker) {
                    google.maps.Event.trigger(marker, 'click');
                    self.selectedElement = element;
                } else if (this == marker && this !== self.selectedElement) {
                    if (element.dispatchEvent) {
                        var clickEvent = document.createEvent('MouseEvents');
                        clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        element.dispatchEvent(clickEvent);
                    } else if (element.fireEvent) {
                        element.fireEvent('onclick');
                    }
                }
            };

            // Bind the handler
            google.maps.Event.addDomListener(element, 'click', handler);
            google.maps.Event.addListener(marker, 'click', handler);
        }
    };

    /**
    * Remove the event listener linking for each marker/element pair
    * @access public
    */
    this.unlinkDealerElements = function() {
        if (this.dealerElements) {
            for (var i = 0; i < this.dealerElements.length; i++) {
                google.maps.Event.clearListeners(this.dealerElements[i], 'click');
            }
        }

        this.dealerElements = [];
    };

    /**
    * Called for each dealer in this.dealers[this.postalCode] and can apply a callback, simple append, or just return the array of parsed dealers
    * @access public
    * @param {HTMLElement} template An HTML template element representing a single dealer
    * @param {Function|HTMLElement} [operation] A callback function or an HTML insertion target
    * @returns {HTMLElement[]} An array of parsed dealer nodes
    */
    this.dealersToHTML = function(template, operation) {
        var parsedTemplate, handler;

        this.listProcessed = false;
        this.unlinkDealerElements();

        if (this.map) {
            this.map.toHTML(this.dealers[this.postalCode]);
        }

        if (template) {
            template = IC.HTML.getPlainElement(template);

            // Build an appropriate handler for the chosen operation - callback, simple append, or nothing
            if (typeof operation == 'function') {
                handler = operation;
            } else if (typeof operation == 'object' && (operation.nodeType == 1 || operation.jquery)) {
                handler = function(t) {
                    IC.HTML.getPlainElement(operation).appendChild(t);
                };
            } else {
                handler = function() { };
            }

            // Parse the template for each dealer and execute the handler
            var distance = 0;
            for (var i = 0; i < this.dealers[this.postalCode].length; i++) {
                // Format the distance
                distance = this.dealers[this.postalCode][i].DistanceFromVisitor;

                this.dealers[this.postalCode][i].DistanceFromVisitor = parseInt(distance, 10) >= 1 ? parseInt(distance, 10) : "&lt; 1";
                this.dealerElements.push(IC.Template.parse(template, this.dealers[this.postalCode][i]));

                if (this.map && params.link) {
                    this.linkMarkerAndElement(this.map.markers[i], this.dealerElements[i]);
                }

                handler(this.dealerElements[i], this.map.markers[i], i);
            }
        }

        this.listProcessed = true;

        return this.dealerElements;
    };

    /**
    * Call getDirections on the HN.Map instance
    * @access public
    */
    this.getDirections = function(from, callback) {
        //this.unlinkDealerElements();
        this.map.getDirections(from, callback);
    };
};
/**
 * @class Map
 * @constructor
 * @param {Hash} params A parameters hash
 * @param {HTMLElement} params_mapTarget
 * @param {HTMLElement} params_directionsTarget
 * @param {HTMLElement} params_infoWindowTemplate
 */
HN.Map = function (params) { if (google.maps.BrowserIsCompatible) {
	/**
	 * An HTML element to hold the map instance
	 * @access private
	 */
	var mapTarget = IC.HTML.getPlainElement(params.mapTarget);
	
	/**
	 * An HTML template for the contents of the info window
	 * @access private
	 */
	var infoWindowTemplate = params.infoWindowTemplate || "{{dealerName}}";

	/**
	 * The HTML ID of the info window template, used by ExtInfoWindow
	 * @access private
	 */
	var infoWindowID = params.infoWindowID || "";
	
	/**
	 * Google Map instance
	 * @access private
	 */
	var map;
	
	/**
	 * Google Directions instance
	 * @access private
	 */
	var directions;
	
	/**
	 * The bounds object for the points on the map
	 * @access private
	 */
	var bounds = new google.maps.LatLngBounds();

	/**
	 * An array of markers on the map, can be used for attaching events to markers externally
	 * Markers are cleared from this array on map changes
	 * @access public
	 */
	this.markers = [];
	
	/**
	 * The current/last selected dealer marker
	 * @access public
	 */
	this.selectedMarker;
	
	/**
	 * The current/last/only start marker placed by a directions query
	 * @access public
	 */
	this.startMarker;


	this.route;

	/**
	 * Custom icon to use as a base for creating our markers
	 * @access private
	 */
	var customIcon = new google.maps.Icon(google.maps.DEFAULT_ICON);
	customIcon.shadow = HN.imagePath + '/map/marker-shadow.png';
	customIcon.iconSize = new google.maps.Size(26, 28);
	customIcon.shadowSize = new google.maps.Size(26, 28);
	customIcon.iconAnchor = new google.maps.Point(10, 21);
	customIcon.infoWindowAnchor = new google.maps.Point(9, 2);
	
	/**
	 * Custom start icon for directions, based on customIcon
	 * @access private
	 */
	var startIcon = new google.maps.Icon(customIcon);
	startIcon.image = HN.imagePath + '/map/marker-home.png';
	
	/**
	 * Custom UI settings to pass to our Google Map instance
	 * @access private
	 */
	var customUI = {};
	customUI.controls = { largemapcontrol3d:false, smallzoomcontrol3d:false, maptypecontrol:false, scalecontrol:false };
	customUI.keyboard = true;
	customUI.maptypes = { hybrid:false, physical:false, normal:true, satellite:true };
	customUI.zoom = { doubleclick:true, scrollwheel:true };
	
	/**
	 * Custom google.maps.Control
	 * @access private
	 */
	var customMapControls = function () {};
	customMapControls.prototype = new google.maps.Control();
	
	// Creates a one DIV for each of the buttons and places them in a container
	customMapControls.prototype.initialize = function () {
		// Create our divs to replace our default controls
		var container = document.createElement("div");
		var mapTypeControl = document.createElement("div");
		var zoomInDiv = document.createElement("a");
		var zoomOutDiv = document.createElement("a");
		var mapNormDiv = document.createElement("a");
		var mapSatDiv = document.createElement("a");
		
		// create classes for our divs
		container.className = 'zoom_controls';
		mapTypeControl.className = 'map_type_controls';
		zoomInDiv.className = 'zoom_in';
		zoomOutDiv.className = 'zoom_out';
		mapNormDiv.className = 'map_normal';
		mapSatDiv.className = 'map_sat';
		
		// Event listeners for custom map controls
		google.maps.Event.addDomListener(zoomInDiv, "click", function () { 
			map.zoomIn();
		});
		google.maps.Event.addDomListener(zoomOutDiv, "click", function () { 
			map.zoomOut(); 
		});
		google.maps.Event.addDomListener(mapNormDiv, "click", function () { 
			map.setMapType(G_NORMAL_MAP); 
		});
		google.maps.Event.addDomListener(mapSatDiv, "click", function () { 
			map.setMapType(G_SATELLITE_MAP); 
		});
		
		// Append the map type and zoom buttons to a parent container
		mapTypeControl.appendChild(mapNormDiv);
		mapTypeControl.appendChild(mapSatDiv);
		container.appendChild(zoomInDiv);
		container.appendChild(zoomOutDiv);
		
		// Append the button containers to the map
		map.getContainer().appendChild(mapTypeControl);
		map.getContainer().appendChild(container);
		
		return container;
	};

	customMapControls.prototype.getDefaultPosition = function () {
		return new google.maps.ControlPosition(G_ANCHOR_TOP_LEFT, new google.maps.Size(1, 1));
	};
	
	/**
	 * Create a custom google.maps.Marker and attach the click event for the info window
	 * @access public
	 * @param {google.maps.Point} point A google.maps.Point object
	 * @param {Integer} index The index of the marker
	 * @param {Hash} dealerData The dealer data to pass to the info window template
	 * @returns {google.maps.Marker} A custom google.maps.Marker instance
	 */
	this.createMarker = function (point, index, dealerData) {
		var self = this;

		var icon = new google.maps.Icon(customIcon); 
		var markerID = '';
		if (Math.floor(index / 26) === 0) {
			markerID = String.fromCharCode('A'.charCodeAt(0) + index);
		} else {
			markerID = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / 26) - 1);
			markerID = markerID + String.fromCharCode('A'.charCodeAt(0) + index % 26);
		}

		icon.image = HN.imagePath + '/map/blue/marker' + markerID + '.png';

		var marker = new google.maps.Marker(point, { icon:icon });
		google.maps.Event.addListener(marker, 'click', function () {
			var container = document.createElement('div');
			container.appendChild(IC.Template.parse(infoWindowTemplate, dealerData));
			
			this.openExtInfoWindow(map, infoWindowID, container.innerHTML, { beakOffset:10 });
			
			if (this !== self.selectedMarker) {
				if (self.selectedMarker) {
					self.selectedMarker.setImage(self.selectedMarker.getIcon().image);
				}
				
				self.selectedMarker = this;
				self.selectedMarker.setImage(self.selectedMarker.getIcon().image.replace('blue', 'orange'));
			}
		});
		
		return marker;
	};
	
	// TODO Maybe move this or mirror this in HN.DealerLocator so the element events can get cleared... ??
	/**
	 * Clear map - close info window, clear overlays, unset selectedMarker, and empty markers array
	 * @access public
	 */
	this.clearMap = function () {
		map.closeExtInfoWindow();
		map.clearOverlays();
		bounds = new google.maps.LatLngBounds();
		this.selectedMarker = false;
		this.markers = [];
	};

	/**
	 * Create the map/directions instance or clear and update the map/directions
	 * @access public
	 * @param {Array} data An array of dealer hashes for each info window template
	 */
	this.toHTML = function (data) {
		// There's no google maps instance yet, create one
		if (!map) {
			map = new google.maps.Map2(mapTarget);
			map.setUI(customUI);

			// There's no directions instance yet, create one
			if (!directions) {
				directions = new google.maps.Directions(map);
			}
		} else {
			this.clearMap();
		}

		var point, marker;
		for (var i = 0; i < data.length; i++) {
			point = new google.maps.LatLng(data[i].Latitude, data[i].Longitude);
			marker = this.createMarker(point, i, data[i]);
			this.markers.push(marker);

			map.setCenter(point, 13);
			map.addOverlay(marker);
			bounds.extend(point);
		}
		var zoom = map.getBoundsZoomLevel(bounds);
		map.addControl(new customMapControls());
		map.setCenter(bounds.getCenter(), zoom > 13 ? 13 : zoom);
	};
	
	/**
	 * Get and plot directions in current map instance
	 * @access public
	 * @param {String} from The start address in a Google maps approved format
	 */
	this.getDirections = function (from, callback) {
		var defaultTo = this.selectedMarker || this.markers[0];
		var to = defaultTo.getLatLng().lat() + ', ' + defaultTo.getLatLng().lng();
		var callback = callback || function () {};
		var self = this;
		
		directions.clear();
		directions.load('from: ' + from + ' to: ' + to, { getSteps: true, getPolyline: true });
		
		google.maps.Event.clearListeners(directions, 'error');
		google.maps.Event.clearListeners(directions, 'addoverlay');

		google.maps.Event.addListener(directions, 'error', function () { callback.call(self, false); });
		
		// Create directions once they've loaded
		// Need to use addoverlay so that we can manipulate the start and end markers
		google.maps.Event.addListener(directions, "addoverlay", function () {
			// Get the default start/end markers and remove them
			var defaultStartMarker = directions.getMarker(0);
			var defaultEndMarker = directions.getMarker(1);
			map.removeOverlay(defaultStartMarker);
			map.removeOverlay(defaultEndMarker);
			
			// Remove the old custom start marker and add the new one
			if (self.startMarker)
				map.removeOverlay(self.startMarker);
			
			self.startMarker = new google.maps.Marker(defaultStartMarker.getLatLng(), { icon: new google.maps.Icon(startIcon) });
			map.addOverlay(self.startMarker);
			
			self.route = directions.getRoute(0);
			callback.call(self, true);
		});
	};
	
	this.directionsToHTML = function (template, handler) {
		var handler = handler || function () {};
		var step;

		for (var i = 0; i < this.route.getNumSteps(); i++) {
			step = this.route.getStep(i);
			handler(IC.Template.parse(template, { Description:step.getDescriptionHtml(), Distance:step.getDistance().html }));
		}
	};
	
	this.summaryToHTML = function (template, handler) {
		handler(IC.Template.parse(template, { Summary:this.route.getSummaryHtml() }));
	};

	/**
	 * Return the Google Map instance in case it's needed externally
	 * @access public
	 */
	this.getGoogleMapInstance = function () {
		return map;
	};
	
	/**
	 * Return the Google Directions instance in case it's needed externally
	 * @access public
	 */
	this.getGoogleDirectionsInstance = function () {
		return directions;
	};
}};
/**
 * Hyundai Financial Tools Calculations
 * @class HN.Financial
 * @param {Hash} params A parameters hash
 * @param {String} params_apr The vehicle price
 * @param {String} params_desiredPayment
 * @param {String} params_downPayment
 * @param {String} params_interest
 * @param {String} params_months
 * @param {String} params_price
 * @param {String} params_rate
 */
HN.Financial = function (params) {
	/**
	 * 
	 */
	var properties = ['apr','desiredPayment','downPayment','interest','months','price','rate','rebate','tradeValue','tradeOwed','tradeOffset'];

	/**
	 * 
	 * 
	 */
	this.setValues = function (params) {
		// Sanitize values in params before setting them as properties
		var params = params || {};
		for (var i = 0; i < properties.length; i++) {
			this[properties[i]] = params[properties[i]] ? 
				params[properties[i]].replace(/[^0-9\.]/g, '') : 
				0;

			// Negative allowed for tradeValue
			if (properties[i] === 'tradeValue' && params[properties[i]] && params[properties[i]].match(/^-/)) {
				this[properties[i]] = -this[properties[i]];
			}
		}

		this.interest = parseFloat(this.apr || 0);
		this.tradeOffset = this.tradeValue - this.tradeOwed;
		this.rate = this.apr ? this.interest / (12 * 100) : 0;
	}
	this.setValues(params);
	
	/**
	 * 
	 * 
	 */
	this.calculatePayment = function () {
		var principal, estimatedPayment, p;

		principal = (this.price - this.rebate - this.tradeOffset) - this.downPayment;

		// Prevent error if you 'pow' with 0 interest 
		if (this.interest == 0) {
			estimatedPayment = Math.round(principal / this.months);
		} else {
			p = (principal * this.rate * Math.pow((1 + this.rate), this.months)) / (Math.pow((1 + this.rate), this.months) - 1);
			estimatedPayment = Math.round((Math.round(p * 100) / 100));
		}
		
		estimatedPayment = estimatedPayment > 0 ? estimatedPayment : 0;

		return estimatedPayment;
	};
	
	/**
	 * 
	 * 
	 */
	this.calculateBudget = function () {
		var factor, loanPrice, financeTotal;
		
		if(this.desiredPayment > 0) {
			factor = Math.pow(1 + this.rate, this.months);
			
			if (this.rate != 0) {
				loanPrice = this.desiredPayment / ( this.rate / (1 - 1/factor) );
			} else {
				loanPrice = this.desiredPayment * this.months;	
			}
			// Typecast numbers to make sure calcs right
			financeTotal = parseInt(+loanPrice + +this.downPayment + +this.tradeOffset);
		}

		financeTotal = financeTotal > 0 ? financeTotal : 0;

		return financeTotal;
	}
};
/**
 * A module-like function that will build automatically build getters/setters
 * into any of the vehicles classes
 * 
 */
HN.VehicleMixIn = function (data, buildGetters) {
	var self = this;
	
	/**
	 * The data to perform searches on
	 * @access private
	 */
	var data = data;
	
	// Sanitize price fields in case content entry is inconsistent
	if (typeof data.BasePrice !== 'undefined') {
		data.BasePrice = (data.BasePrice + '').replace(/[^0-9]/g, '');
	}

	if (typeof data.Price !== 'undefined') {
		data.Price = (data.Price + '').replace(/[^0-9]/g, '');
	}


	// Make a comma-separated price called NicePrice
	if (data.BasePrice || data.Price) {
		data.NicePrice = HN.formatPrice((data.BasePrice || data.Price), false);
	}


	// Fix empty vehicle images
	if (data.DefaultImageLarge === '') {
		data.DefaultImageLarge = '/images/global/blank_vehicle.png';
	}

	if (data.DefaultImageMedium === '') {
		data.DefaultImageMedium = '/images/global/blank_vehicle.png';
	}

	if (data.DefaultImageSmall === '') {
		data.DefaultImageSmall = '/images/global/blank_vehicle.png';
	}


	// Fix for JSON format change
	data.DefaultImage = data.DefaultImageLarge;

	
	// Dynamically build named getters from the properties
	if (data && buildGetters !== false) {
		for (var prop in data) if (data.hasOwnProperty(prop)) {
			// Create a closure for the property name so that it doesn't always equal the last in the loop
			(function () {
				var p = prop;
				self['get' + p] = function () { return data[p]; };
			})();
		}
	}
	
	/**
	 * A method to search the data, and return an object of specified type
	 * @access public
	 * @param {Object} data Data to search
	 * @param {String} className The class to instantiate
	 * @param {String} property The property to search on
	 * @param {String} value The value to use in the search
	 * @param {String} condition The conditional operation to use for the search
	 * @returns {Array} 
	 */
	this._find = function (data, className, property, value, condition) {
		var matches = [];
		var match;
		
		for (var i = 0; i < data.length; i++) {
			match = false;
			switch (condition) {
				case '<':
					match = data[i][property] < value ? true : match;
					break;
				case '<=':
					match = data[i][property] <= value ? true : match;
					break;
				case '>':
					match = data[i][property] > value ? true : match;
					break;
				case '>=':
					match = data[i][property] >= value ? true : match;
					break;
				case '!=':
					match = data[i][property] != value ? true : match;
					break;
				case '==':
				default:			
					match = (data[i][property] + '').toLowerCase() == (value + '').toLowerCase() ? true : match;
					break;
			}
				
			if (match)
				matches.push(new HN[className](data[i]));
		}
		return matches;
	}
	
	/**
	 * Allows direct access to the unmodified JSON data
	 * @access public
	 * @returns {Object}
	 */
	this.getJSONData = function () {
		return data;
	};
};

/**
 * 
 * 
 */
HN.Powertrain = function (data) {
	// Extend HN.Powertrain using the mixin
	HN.VehicleMixIn.call(this, data);
};

/**
 * 
 * 
 */
HN.Trim = function (data) {
	// Extend HN.Trim using the mixin
	HN.VehicleMixIn.call(this, data);
	
	/**
	 * Wrapper around the _find method from the mixin, adds extra parameters to the class
	 * @access public
	 * @param {String} property The object property to check against
	 * @param {String} value The value to use in the check
	 * @param {String} condition Conditional operator as a string
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.find = function (property, value, condition) {
		return this._find(data.Powertrains, 'Powertrain', property, value, condition);
	};
	
	/**
	 * Find powertrain by ID
	 * @access public
	 * @param {String} id
	 * @returns {HN.Powertrain}
	 */
	this.findPowertrainByID = function (id) {
		return this.find('ID', id)[0];
	};
	
	/**
	 * Find all powertrains
	 * @access public
	 * @returns {Array} An array of matching powertrains (as HN.Powertrain instances)
	 */
	this.findAllPowertrains = function () {
		return this.find('_' + (new Date()).getTime(), '_', '!=');
	}
};

/**
 *
 *
 */
HN.Model = function (data) {
	// Get the default images from the first trim so we have an image at the model level
	data.DefaultImageLarge = data.Trims[0] ? data.Trims[0].DefaultImageLarge : '/images/global/blank_vehicle.png';
	data.DefaultImageSmall = data.Trims[0] ? data.Trims[0].DefaultImageSmall : '/images/global/blank_vehicle.png';
	data.DefaultImageMedium = data.Trims[0] ? data.Trims[0].DefaultImageMedium : '/images/global/blank_vehicle.png';
	data.DeepLink = data.ModelName.toLowerCase().replace(/\s/g, '-');
	
	// Extend HN.Model using the mixin
	HN.VehicleMixIn.call(this, data);
	
	/**
	 * Wrapper around the _find method from the mixin, adds extra parameters to the class
	 * @access public
	 * @param {String} property The object property to check against
	 * @param {String} value The value to use in the check
	 * @param {String} condition Conditional operator as a string
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.find = function (property, value, condition) {
		return this._find(data.Trims, 'Trim', property, value, condition);
	};
	
	/**
	 * Find trim by ID
	 * @access public
	 * @param {String} id
	 * @returns {HN.Trim} Matching trim
	 */
	this.findTrimByID = function (id) {
		return this.find('ID', id)[0];
	};	
	/**
	 * Find trims by name
	 * @access public
	 * @param {String} trimName
	 * @returns {Array} An array of matching trims (as HN.Trim instances)
	 */
	this.findTrimsByName = this.findTrimsByTrimName = function (trimName) {
		return this.find('TrimName', trimName);
	};
	
	/**
	 * Find trims by price
	 * @access public
	 * @param {Number} price
	 * @returns {Array} An array of matching trims (as HN.Trim instances)
	 */
	this.findTrimsByPrice = function (price) {
		return this.find('Price', price);
	};
	
	/**
	 * Find trims by price greater than value
	 * @access public
	 * @param {Number} price
	 * @returns {Array} An array of matching trims (as HN.Trim instances)
	 */
	this.findTrimsByPriceGreaterThan = function (price) {
		return this.find('Price', price, '>');
	};
	
	/**
	 * Find trims by price less than value
	 * @access public
	 * @param {Number} price
	 * @returns {Array} An array of matching trims (as HN.Trim instances)
	 */
	this.findTrimsByPriceLessThan = function (price) {
		return this.find('Price', price, '<');
	};

	/**
	 * Find all trims
	 * @access public
	 * @returns {Array} An array of matching trims (as HN.Trim instances)
	 */
	this.findAllTrims = function () {
		return this.find('_' + (new Date()).getTime(), '_', '!=');
	}
};


/**
 * 
 * 
 */
HN.Vehicles = new function () {
	/**
	 * The vehicles data
	 * @access private
	 */
	var data = [];
	
	// Get vehicles data (synchronously, so we don't have to worry about callbacks.)
	$.ajax({
		async: false,
		dataType: 'json',
		url: HN.getServiceURL('vehicles', { 'languagePath': HN.getLanguagePath() }),
		success: function (vehiclesJSON) { 
			data = vehiclesJSON;
		}
	});
	

	// Extend HN.Vehicles using the mixin
	HN.VehicleMixIn.call(this, data, false);
	
	/**
	 *
	 *
	 */
	this.getDeeplinkValue = this.getURLValue = function (identifier) {
		return (identifier + '').toLowerCase().replace(/\s/g, '-');
	};
	
	/**
	 * Wrapper around the _find method from the mixin, adds extra parameters specific to the class
	 * @access public
	 * @param {String} property The object property to check against
	 * @param {String} value The value to use in the check
	 * @param {String} condition Conditional operator as a string
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.find = function (property, value, condition) {
		return this._find(data, 'Model', property, value, condition);
	};
	
	/**
	 * Find model by ID
	 * @access public
	 * @param {String} id
	 * @returns {HN.Model} Matching model
	 */
	this.findModelByID = function (id) {
		return this.find('ID', id)[0];
	};
	
	/**
	 * Find models by name
	 * @access public
	 * @param {String} modelName
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByName = this.findModelsByModelName = function (modelName) {
		return this.find('ModelName', modelName);
	};
	
	/**
	 * Find models deep link value
	 * @access public
	 * @param {String} deepLink A transformed version of the model name
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByDeepLink = function (deeplink) {
		return this.find('DeepLink', deeplink);	
	}

	/**
	 * Find the single latest model by deep link value
	 * @access public
	 * @param {string} deepLink A transformed version of the model name
	 * @returns {Object} An instance of HN.Model
	 */
	this.findLatestModelByDeepLink = function (deepLink) {
		var models = this.find('DeepLink', deepLink);
		var model = models[0];

		if (models.length > 1) {
			for (var i = 0; i < models.length; i++) {
				if (models[i].getModelYear() > model.getModelYear()) {
					model = models[i];
				}
			}
		}
		
		return model;
	}	

	/**
	 * Find models by price
	 * @access public
	 * @param {Number} price
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByPrice = function (price) {
		return this.find('BasePrice', price);
	};
	
	/**
	 * Find models by price less than value
	 * @access public
	 * @param {Number} price Maximum price
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByPriceLessThan = function (price) {
		return this.find('BasePrice', price, '<');
	};
	
	/**
	 * Find models by price greater than value
	 * @access public
	 * @param {Number} price Minimum price
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByPriceGreaterThan = function (price) {
		return this.find('BasePrice', price, '>');
	};
	
	/**
	 * Find models by vehicle type
	 * @access public
	 * @param {String} vehicleType
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByVehicleType = function (vehicleType) {
		return this.find('VehicleType', vehicleType);
	};

	/**
	 * Find models by year
	 * @access public
	 * @param {Number} modelYear
	 * @returns {Array} An array of matching models (as HN.Model instances)
	 */
	this.findModelsByYear = this.findModelsByModelYear = function (modelYear) {
		return this.find('ModelYear', modelYear);
	};
	
	/**
	 * Find all models
	 * @access public
	 * @returns {Array} An array of all models (as HN.Model instances)
	 */
	this.findAllModels = function () {
		return this.find('_' + (new Date()).getTime(), '_', '!=');
	};


	/**
	 * Find all models excluding duplicates of older years
	 * @access public
	 * @returns {Array} An array of latest models (as HN.Model isntances)
	 */
	this.findLatestModels = function () {
		// Get all the models
		var models = this.findAllModels();
		var filteredModels = [];
		var model;

		// Filter out the duplicate models that are of a lower year
		for (var i = 0; i < models.length; i++) {
			model = models[i];
			
			for (var j = 0; j < models.length; j++) {
				if (model.getModelName() == models[j].getModelName() && model !== models[j]) {
					model = (models[j].getModelYear() > model.getModelYear()) ?
						models[j] :
						model;

					models = Array.prototype.concat(
						models.slice(0, j),
						models.slice(j + 1)
					);
				}
			}
			
			filteredModels.push(model);
		}

		return filteredModels;
	};
};
HN.Vehicles.findAllModels();
/**
 * 
 * 
 */
HN.SpecialOffers = function () {
	/**
	 * SpecialOffer data from the special offer requests, builds a cache by indexing on postal codes
	 * @access public
	 */
	this.specialOffers = {};

	/**
	 * GlobalPromotion data from the special offer requests, builds a cache by indexing on postal codes
	 * @access public
	 */
	this.globalPromotions = {};
	
	/**
	 * Parsed special offer HTML templates, stored to allow removal of event listeners
	 * @access public
	 */
	this.specialOffersElements = [];

	/**
	 * Parsed global promotions HTML templates, stored to allow removal of event listeners
	 * @access public
	 */
	this.globalPromotionsElements = [];
	
	/**
	 * Currently selected offers - Doesn't apply to global promotions
	 * @access public
	 */
	this.selectedOffers = [];

	/**
	 * The last postal code searched
	 * @access public
	 */
	this.postalCode = '';
	
	/**
	 * The validation rule to apply to the postal code. Rule is set based on HN.getLanguage()
	 * @access private
	 */
	var postalCodeRule = 'postalCode.us.short';

	/**	 * Find special offers/global promotions by postal code and execute optional user callback when response is received
	 * @access public
	 * @param {String} type	 * @param {Object} queryData 
	 * @param {String} queryData.language	 * @param {String} queryData.postalCode
	 * @param {String} queryData.modelID	 * @param {String} queryData.trimID
	 * @param {String} queryData.powertrainID	 * @param {Function} callback A callback function to run on completion of a special offers search. Called with the context of the HN.SpecialOffers instance	 * @returns {Object} A hash of offers for the postal code requested 	 */
	this.query = function (type, queryData, callback) {
		callback = callback || function () {};
		var self = this;

		if (IC.Validator.validate(postalCodeRule, queryData.postalCode)) {
			// Store this postal code for use as a key in the cache
			this.postalCode = queryData.postalCode;
			
			$.ajax({
				url: HN.getServiceURL(type, queryData),
				dataType: 'json',
				success: function (data, textStatus) {
					// Get the first key...which is the ASP.NET method generating the response
					// Since this could be a global promotion, model, trim, or powertrain response, we can't hardcode
					for (var prop in data) if (data.hasOwnProperty(prop)) {
						data = data[prop];
						break;
					}
					
					self[type][self.postalCode] = data;
					callback.call(self, self[type][self.postalCode]);
				}
			});
			
			return this[type][self.postalCode];
		}
	};

	/**
	 * Find Special offers by postal code and execute optional user callback when response is received
	 * @access public
	 * @param {Object} queryData 
	 * @param {String} queryData.language
	 * @param {String} queryData.postalCode
	 * @param {String} queryData.modelID
	 * @param {String} queryData.trimID
	 * @param {String} queryData.powertrainID
	 * @param {Function} callback A callback function to run on completion of a special offers search. Called with the context of the HN.SpecialOffers instance
	 * @returns {Object} A hash of offers for the postal code requested 
	 */
	this.getOffers = function (queryData, callback) {
		this.query('specialOffers', queryData, callback);
	};
	
	/**	 * Find global promotions by postal code and execute optional user callback when response is received
	 * @access public	 * @param {Object} queryData 
	 * @param {String} queryData.language	 * @param {String} queryData.postalCode
	 * @param {String} queryData.modelID	 * @param {String} queryData.trimID
	 * @param {String} queryData.powertrainID	 * @param {Function} callback A callback function to run on completion of a special offers search. Called with the context of the HN.SpecialOffers instance	 * @returns {Object} A hash of offers for the postal code requested 	 */
	this.getPromotions = function (queryData, callback) {
		this.query('globalPromotions', queryData, callback);
	};

	 /**
	 * Populate the special offer template for each offer received
	 * @access public
	 * @param {HTMLElement} template An HTML template element representing a single offer
	 * @param {Function|HTMLElement|} operation A callback function, HTML insertion target, or nothing
	 * @returns {Array} An array of parsed HTML elements
	 */
	this.offersToHTML = function (type, template, operation) {
		var parsedTemplate, handler;
		
		this[type + 'Elements'] = [];
		
		if (template) {
			template = IC.HTML.getPlainElement(template);
			
			// Build an appropriate handler for the chosen operation - callback, simple append, or nothing
			if (typeof operation == 'function') {
				handler = operation;
			} else if (typeof operation == 'object' && (operation.nodeType == 1 || operation.jquery)) {
				handler = function (t) { IC.HTML.getPlainElement(operation).appendChild(t); };
			} else {
				handler = function () {};
			}
			
			for (var i = 0; i < this[type][this.postalCode].length; i++) {
				this[type + 'Elements'].push(IC.Template.parse(template, this[type][this.postalCode][i]));
				handler(this[type + 'Elements'][i], i);
			}
		}
		
		return this[type + 'Elements'];
	};
};
/**
 * 
 * 
 */
HN.Comparator = new function () {
	/** 
	 * Cached hierarchical compare data collected from service requests
	 * @access private
	 */
	var compareData = {};

	/**
	 * Add makes data to cache
	 * @access private
	 * @param {String|Number} year
	 * @param {Object} data 
	 */
	var populateMakes = function (year, data) {
		compareData[year] = compareData[year] || {};
	
		for (var i = 0; i < data.length; i++) {
			compareData[year][data[i]] = compareData[year][data[i]] || {};
		}
	};
	
	/**
	 * Add models data to cache
	 * @access private
	 * @param {String|Number} year
	 * @param {String} make
	 * @param {Object} data
	 */
	var populateModels = function (year, make, data) {
		compareData[year] = compareData[year] || {};
		compareData[year][make] = compareData[year][make] || {};
		
		for (var i = 0; i < data.length; i++) {
			compareData[year][make][data[i].Id] = data[i];
		}
	};
	
	/**
	 * Add trims data to cache
	 * @access private
	 * @param {String|Number} year
	 * @param {String} make
	 * @param {String} modelID
	 * @param {Object} data
	 */
	var populateTrims = function (year, make, modelID, data) {
		compareData[year] = compareData[year] || {};
		compareData[year][make] = compareData[year][make] || {};
		compareData[year][make][modelID] = compareData[year][make][modelID] || {};
		compareData[year][make][modelID].Trims = compareData[year][make][modelID].Trims || {};
		
		for (var i = 0; i < data.length; i++) {
			// Clean TrimName
			var regex = new RegExp('^' + year + '\\s*' + make + '\\s*' + compareData[year][make][modelID].Name + '\\s*');
			data[i].Name = data[i].Name.toUpperCase().replace(regex, '');

			compareData[year][make][modelID].Trims[data[i].Id] = data[i];
		}
	};
	
	/**
	 * Find competitor makes, models, trims based on params and store data in cache
	 * @access public
	 * @param {Object} params
	 * @param {String|Number} params_year
	 * @param {String} params_make
	 * @param {String} params_modelID
	 * @param {Function} callback
	 */
	this.find = function (params, callback) {
		params = params || {};
		callback = callback || function () {};
		
		params.type = params.modelID ? 'trims' : (params.make ? 'models' : 'makes');
		
		// TODO enable caching
		$.getJSON(HN.getServiceURL('compare', params), function (data) {
			var callbackParam;
			switch (params.type) {
				case 'makes':
					populateMakes(params.year, data);
					callbackParam = compareData[params.year];
					break;
				case 'models':
					populateModels(params.year, params.make, data);
					callbackParam = compareData[params.year][params.make];
					break;
				case 'trims':
					populateTrims(params.year, params.make, params.modelID, data);
					callbackParam = compareData[params.year][params.make][params.modelID];
					break;
			}
			
			callback(callbackParam);
		});
	};

	/**
	 * Get comparison for specified comparison type and trims, and execute callback with comparison HTML
	 * @access public
	 * @param {String} serviceName
	 * @param {String[]} trimIds
	 * @param {Function} [callback=function () {}]
	 */
	this.getComparison = function (serviceName, trimIds, callback) {
		callback = callback || function () {};
		var serviceParams = {};
		
		for (var i = 0; i < trimIds.length; i++) {
			serviceParams['trimID' + (i + 1)] = trimIds[i];
		}
		
		$.ajax({
			dataType: 'html',
			url: HN.getServiceURL(serviceName, serviceParams).replace(/\|$/, ''),
			success: callback
		});
	};
	
	/**
	 * Get feature comparison given array of trim IDs, execute callback with comparison HTML
	 * @access public
	 * @param {String[]} trimIds
	 * @param {Function} [callback=function () {}]
	 */
	this.getFeatureComparison = function (trimIds, callback) {
		this.getComparison('compareFeatures', trimIds, callback);
	};

	/**
	 * Get feature comparison given array of trim IDs, execute callback with comparison HTML
	 * @access public
	 * @param {String[]} trimIds
	 * @param {Function} [callback=function () {}]
	 */
	this.getSpecificationComparison = function (trimIds, callback) {
		this.getComparison('compareSpecifications', trimIds, callback);
	};

	/**
	 * Get photo comparison given array of trim IDs, execute callback with comparison HTML
	 * @access public
	 * @param {String[]} trimIds
	 * @param {Function} [callback=function () {}]
	 */
	this.getPhotoComparison = function (trimIds, callback) {
		this.getComparison('comparePhotos', trimIds, callback);
	};

    this.getInteriorPhotoComparison = function (trimIds, callback) {
        this.getComparison('compareInteriorPhotos', trimIds, callback);
    };

    this.getExteriorPhotoComparison = function (trimIds, callback) {
        this.getComparison('compareExteriorPhotos', trimIds, callback);
    }

	/**
	 * Getter for cached compare data
	 * @access public
	 */
	this.getCompareData = function () {
		return compareData;
	};
};
/**
 * A namespace for Flash functions
 * 
 */
HN.ExternalInterface = new function () {
	this.isSafari = function() {
		return navigator.vendor && navigator.vendor.indexOf('Apple') != -1;
	};
};

/**
 * A namespace for Flash nav functions
 * 
 */
HN.ExternalInterface.Nav = new function () {
	/**
	 * Sets the height of the HTML element containing the nav
	 * @access public
	 * @param {String|Number} height The new height of the nav
	 */
	this.setHeight = function (height) {		
		if ($.browser.msie && $.browser.version == 6 && height > 200) {
			$('select').css('visibility','hidden');	
		} else {
			$('select').css('visibility','visible');	
		}
		$('#flashNavContainer').height(height);
	};
};

/**
 * A namespace for Flash 360 viewer functions
 * 
 */
HN.ExternalInterface.Viewer360 = new function () {
	/**
	 * Calls the modal and loads the content of the clicked marker
	 * @access public
	 * @param {String} url The URL of the media represented by the marker
	 */
	this.showMarker = function (url) {		
		$("#vehicle360MarkerData a").each(function () {
			if ($(this).attr('href').indexOf(url) > -1) {
				$(this).click();
				return false;
			}
		});
	};

	this.showEnlargedInterior360 = function(a,b) {
		Shadowbox.open({
			content:"/swf/interior/interior360.swf",
			player:"swf",
			height:"452",
			width:"800",
			options:{
				flashVars:{
					enlarged:"true",
					configXML:"/xml/interior360/config.xml",
					trimXMLPath:a,
					currentState:b
				},
				flashParams:{
					wmode:"transparent",
					allowscriptaccess:"always",
					menu:"false"
				}
			}
		})
	};
};

/**
 * A namespace for Flash BYO functions
 * 
 */
HN.ExternalInterface.BYO = new function () {
	/**
	 * Calls the save/request quote modal
	 * @access public
	 * @param {String} xmlString Vehicle configuration XML as a string as built by BYO flash
	 * @param {Boolean} requestQuote A flag to determine whether the modal should behave as a save or request quote modal
	 */
	this.saveConfig = function (xmlString, requestQuote) {
		
		var bolRequestQuoteChecked = $('#saveCreationModal input.save_request_quote').attr('defaultChecked');
		
		var el = {};
		el.saveModal = $('#saveCreationModal');
		el.saveContactInfo = $('#saveContactInfo');
		el.saveRequestQuote = el.saveContactInfo.find('.save_request_quote');
		el.postalCodeInput = el.saveContactInfo.find('input.save_zip');


		var buttonArrow = $('#saveCreationModal #saveContactInfo a.submit img');
		var tempModel = xmlString.split("<model>");
		byoModelName = HN.Vehicles.findModelByID(tempModel[1].split("</model>")[0]);
		
		//Set Correct Postal Code from BYO		
		if(el.postalCodeInput.val() != HN.getPostalCode()){
			el.postalCodeInput.val(HN.getPostalCode());			
		}


		if (requestQuote) {
			el.saveRequestQuote.find('input.save_request_quote').attr('defaultChecked', true).attr('checked', 'checked');
			el.saveRequestQuote.find('input.save_quote_only').val('1');
			el.saveRequestQuote.find('input.save_request_quote').hide();
			el.saveRequestQuote.find('label.standard_label').hide();
			$('#saveCreationModal .save_email_disclaimer').hide();

			$('#saveCreationModal #saveContactInfo p').not($('#saveCreationModal #saveContactInfo .save_request_quote p, #saveCreationModal #saveContactInfo .error_summary p')).hide();
			$('#saveCreationModal h2').attr('class','').html(saveModalHeaders[1].toUpperCase());
			$('#saveCreationModal #saveContactInfo a.submit').html(saveModalSubmit[1]).append(buttonArrow);
			$('#saveCreationModal').addClass('request_quote');	
		} else {
			$('#saveCreationModal').removeClass('request_quote');
			$('#saveCreationModal .save_email_disclaimer').show();
			el.saveRequestQuote.find('input.save_request_quote').attr('defaultChecked', false).attr('checked', '');					
			$('#saveCreationModal #saveContactInfo .save_request_quote input.save_quote_only').val('0');
			$('#saveCreationModal #saveContactInfo .save_request_quote input.save_request_quote').show();
			if (byoModelName.getID().indexOf('sonata-hybrid') < 0) {
			 $('#saveCreationModal #saveContactInfo div.save_request_quote').css({'display':'block'});
			 $('#saveCreationModal #saveContactInfo .save_request_quote label.standard_label').show();
			} else {
			 $('#saveCreationModal #saveContactInfo div.save_request_quote').css({'display':'none'});
			 $('#saveCreationModal #saveContactInfo .save_request_quote label.standard_label').hide();
			}
			$('#saveCreationModal #saveContactInfo p').not($('#saveCreationModal #saveContactInfo .save_request_quote p, #saveCreationModal .save_email_disclaimer')).show();
			$('#saveCreationModal h2').attr('class','').html(saveModalHeaders[0].toUpperCase());
			$('#saveCreationModal #saveContactInfo a.submit').html(saveModalSubmit[0]).append(buttonArrow);
		}

		$('#saveCreationModal span.modelName').html(byoModelName.getModelName());

		$('#saveCreationModal #saveContactInfo input.save_xml').val(xmlString);
		$('#saveCreationModal').removeClass('confirmation');	
/*		sIFR.replace(univers, {
			selector: '#saveCreationModal h2',
			transparent: true,
			fitExactly: true,
			css: {
			  '.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4c647e', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '18px' }
			}
		});*/
		$.fn.modal({
			contentID:'saveCreationModal',
			callback:function(){
			    // NOTE: The double focus is intentional and corrects a FF3.5/OS X bug!!
				$('#saveContactInfo input.save_first_name').focus().focus();				
				// Load Google maps API (if not loaded already) when the user triggers a 
				// Request a Quote call from Flash BYO
				HN.loadMapsAPI(function () {
					// Create global instance of HN.DealerLocator.
					// It will be used in the modal events attached from BYO page JS.
					//el.postalCodeInput.trigger('change');
					
					window.dealerLocator = window.dealerLocator || new HN.DealerLocator({
						mapTarget: $('#saveDealerInfo .map_frame .map'),
						infoWindowID: 'HNInfoWindow',
						infoWindowTemplate: $('#templates .info_window'),
						link:'both',
						dealerType: 'quickQuote'
					});
					
					
					// check for request a quote modal
					if (el.postalCodeInput.val() && requestQuote) {	
						el.postalCodeInput.trigger('change');								
					}				
					
				});				
			},
			onClose: function() {
				if (HN.ExternalInterface.isSafari()) $('#pageFlash').css("visibility", "visible");
			}
		});

		if (HN.ExternalInterface.isSafari()) $('#pageFlash').css("visibility", "hidden");
	};
	
	/**
	 * Sets the height of the HTML element containing the BYO
	 * @access public
	 * @param {String|Number} height The new height of the BYO
	 */
	this.setHeight = function (height) {
		if($('.global_disclaimer').length) $('.global_disclaimer').show();
		var disclaimerHeight = ($('.global_disclaimer').length) ? $('.global_disclaimer').outerHeight() : 0;		
		$('#mainContent').height(height);		
		$('.global_disclaimer').css('top', (height - disclaimerHeight) + 'px');
	};

	this.openReceiveModal = function() {
		$('a[name=modal]').click();
                $('.myForm_1').show();
                $('.myForm_2').hide();
	};

	this.printSummary = function(data) {
		window.print();
	};
};

HN.ExternalInterface.HomePage = new function() { 
	this.openShadowbox = function($content, $player, $title, $height, $width) {
		Shadowbox.open({
			content:$content,
			player:$player,
			title:$title,
			height:$height,
			width:$width
		});
	}
};

HN.ExternalInterface.DealerLocator = new function() {
	var toOpen = null;
	
	this.onReady = function() {
		if (toOpen) {
			$('#dealerLocatorFlash').get(0).findDealer(toOpen.zip, toOpen.selectedDealerCode);
			toOpen = null;
		}
	}
	
	this.open = function($zip, $selectedDealerCode) {
		toOpen = {
			zip: $zip,
			selectedDealerCode: $selectedDealerCode
		};
		$('#dealerLocatorModal').html("<div id='dealerLocatorFlash' style='width: 800px; height: 550px'>&nbsp;</div>");
		$.fn.modal({
			contentID: 'dealerLocatorModal',
			callback: _embedSWF,
			onClose: function() {
				if (HN.ExternalInterface.isSafari()) $('#pageFlash').css("visibility", "visible");
			}
		});
		if (HN.ExternalInterface.isSafari()) $('#pageFlash').css("visibility", "hidden");
	};
	
	this.dealerSelected = function($dealer) {
		$('#pageFlash').get(0).dealerSelected($dealer);
		_close();
	}
	
	this.dealerNotSelected = function() {
		_close();
	}
	
	function _close() {
		$('.content_modalClose').click();
	}
	
	function _embedSWF() {
		var params = {
			menu: 'false',
			wmode: HN.ExternalInterface.isSafari() ? 'window' : 'transparent',
			allowscriptaccess: 'always'
		};
		var flashVars = {
			configXML: '/xml/dealerlocator/config.xml'
		};
		swfobject.embedSWF('/swf/dealerlocator/DealerLocator.swf', 'dealerLocatorFlash', '800', '550', '9.0.115', false, flashVars, params);
	}
};

HN.ExternalInterface.EventsMap = new function () {
	
	this.showEventsByState = function (state) {
		// Set value on hidden .NET text field
		$('#ctl00_ContentPlaceHolderContent_ucSearchResults_hidState').val(state);
		
		// Call the postback
		__doPostBack('', '');
	}
};

HN.ExternalInterface.DealerMap = new function () {
	this.showTarget = function (showFlag) {
		if (showFlag)
			$('#navUtility .dealer_locator').find('.drop_down').slideDown({ duration:700, easing:'easeInExpo' });
		else
			$('#navUtility .dealer_locator').find('.drop_down:visible').slideUp({ duration:700, easing:'easeOutExpo' });		
	};
};

HN.ExternalInterface.Popup = new function() {
    this.showPopup = function(type, opts) {
        if (type) {
            var content_id = type;
            $("#" + content_id + " div .btnClose").click(function() {
                $('.content_modalClose').click();
                return false;
            })
            $.fn.modal({ 'contentID': content_id });
            $(window).resize();
        }
    };
};// Mutes firebug console code and errors on browsers where firebug is not installed
if (!window.console || !console.firebug) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};

    for (var i = 0; i < names.length; ++i) {
        window.console[names[i]] = function() { };
    }
}

// Make sure we have indexOf on Array
if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    };
}


/*	DOM-READY FUNCTIONS 
===================================================================================================== */
// Separate related functionality into dinstinct DOM-Ready handlers for easy reading
// and to limit potential scope errors like variable clobbering.

/* MEMORY LEAK PREVENTION
-------------------------------------------------
------------------------------------------------- */
$(function() {
    $('body').unload(function() {
        GUnload();
        try { $('*').add(window).add(document).unbind(); } catch (err) { }
    });
});

/* TOP NAV MENU
-------------------------------------------------
------------------------------------------------- */
$(function() {

    // Hide the stuff in the $('#flashNavContainer') div asap!
    $('#flashNavContainer ul').hide();

    // Hyundai Global, Dealer Locator drop downs
    $('#navUtility li.hyundai_global a:first').click(function() {
        var target = $(this);
        var parent = target.parent();
        var nav = target.parents('#navUtility');

        var showTarget = function() {
            target.addClass('down');
            parent.find('.drop_down').slideDown({ duration: 700, easing: 'easeInExpo' });
        };

        var hideVisible = function(callback) {
            nav.find('.drop_down:visible').slideUp({ duration: 700, easing: 'easeOutExpo',
                complete: function() {
                    (callback || function() { })();
                    nav.find('a.down').not(target).removeClass('down');
                }
            });
        };

        if (target.hasClass('down')) {
            hideVisible(function() {
                target.removeClass('down');
            });
        } else if (nav.find('.drop_down:visible').length) {
            hideVisible(showTarget);
        } else {
            showTarget();
        }

        return false;
    });

    // Close dealer locator drop down
    //	$('#navUtility li.dealer_locator a.close').click(function () {
    //		$('#navUtility li.dealer_locator a.down').click();
    //		return false;
    //	});
    //Changed for adding the dealer locator close functionality when its called from flash 07/15
    $('#navUtility li.dealer_locator a.close').click(function() {
        HN.ExternalInterface.DealerMap.showTarget(false);
        document.getElementById("flashNavMovie").dealerLocatorClosed();
        return false;
    });


    // Hyundai global tab - Regions lists
    $('#navUtility li.hyundai_global ul li span').click(function() {
        if ($(this).hasClass('.on')) {
            $(this).removeClass('on').next().slideUp();
        } else {
            $(this).addClass('on').next().slideDown();
        }
    });

    // Collapse hyundai global drop down if hovered off for 1.5 seconds
    var collapseMenuTimeout, hoverState;
    $('#navUtility li.hyundai_global').hover(function() {
        hoverState = 'on';
        clearTimeout(collapseMenuTimeout);
    },
	function() {
	    hoverState = 'off';
	    collapseMenuTimeout = setTimeout(function() {
	        if (hoverState == 'off') {
	            $('#navUtility li.hyundai_global a.down').click();
	        }
	    }, 1500);
	});
});


/* TOP NAV MENU
-------------------------------------------------
------------------------------------------------- */
$(function() {

    // Hide the stuff in the $('#flashNavContainer') div asap!
    $('#flashNavContainer ul').hide();

    // Hyundai Global, Dealer Locator drop downs
    $('#navUtility li.follow_us a:first').click(function() {
        var target = $(this);
        var parent = target.parent();
        var nav = target.parents('#navUtility');

        var showTarget = function() {
            target.addClass('down');
            parent.find('.drop_down').slideDown({ duration: 700, easing: 'easeInExpo' });
        };

        var hideVisible = function(callback) {
            nav.find('.drop_down:visible').slideUp({ duration: 700, easing: 'easeOutExpo',
                complete: function() {
                    (callback || function() { })();
                    nav.find('a.down').not(target).removeClass('down');
                }
            });
        };

        if (target.hasClass('down')) {
            hideVisible(function() {
                target.removeClass('down');
            });
        } else if (nav.find('.drop_down:visible').length) {
            hideVisible(showTarget);
        } else {
            showTarget();
        }

        return false;
    });

    // Collapse hyundai global drop down if hovered off for 1.5 seconds
    var collapseMenuTimeout, hoverState;
    $('#navUtility li.follow_us').hover(function() {
        hoverState = 'on';
        clearTimeout(collapseMenuTimeout);
    },
	function() {
	    hoverState = 'off';
	    collapseMenuTimeout = setTimeout(function() {
	        if (hoverState == 'off') {
	            $('#navUtility li.follow_us a.down').click();
	        }
	    }, 1500);
    });

//    // Hyundai global tab - Regions lists
//    $('#navUtility li.follow_us ul li span').click(function() {
//        if ($(this).hasClass('.on')) {
//            $(this).removeClass('on').next().slideUp();
//        } else {
//            $(this).addClass('on').next().slideDown();
//        }
//    });

    // Collapse hyundai global drop down if hovered off for 1.5 seconds
//    var collapseMenuTimeout, hoverState;
//    $('#navUtility li.follow_us').hover(function() {
//        hoverState = 'on';
//        clearTimeout(collapseMenuTimeout);
//    },
//	function() {
//	    hoverState = 'off';
//	    collapseMenuTimeout = setTimeout(function() {
//	        if (hoverState == 'off') {
//	            $('#navUtility li.follow_us a.down').click();
//	        }
//	    }, 1500);
//	});
});


/* MINI DEALER LOCATOR
-------------------------------------------------
------------------------------------------------- */
$(function() {
    // Get the HTML elements
    var el = {};
    el.locator = $('#miniDealerLocator');
    el.dealers = el.locator.find('.dealers');
    el.postalCodeInput = el.locator.find('input.postal_code');
    el.locateButton = el.locator.find('a.locate');
    el.results = el.locator.find('.results');
    el.noResults = el.locator.find('.no_results');
    el.seeAllDealerships = el.locator.find('.see_all_dealerships');
    el.equusOnlyCheckbox = $('#chkEquusDealer');

    // Close the mini dealer locator if any link within the results is clicked.
    el.results.click(function(event) {
        if (event.target && event.target.tagName == "A") {
            $('#navUtility li.dealer_locator ul a.close').click();
        }
    });



    // Set up scope for mini locator
    var miniDealerLocator;


    // Set validation rules for search form
    var miniDealerLocatorRules = {
        'postal_code': [
			{ ruleName: 'required', errorMessage: 'Postal code is required.' },
			{ ruleName: 'postalCode.us.short', errorMessage: 'Postal code is invalid.' }
		]
    };


    //Add click event
    el.equusOnlyCheckbox.click(function(event) {
        el.locateButton.click();
    });

    // Search
    el.postalCodeInput.enterKey(function() { el.locateButton.click(); });
    el.locateButton.clickAndEnter(function() {
        //debugger;

        var equusInd = $('#chkEquusDealer').is(':checked') ? 'Y' : 'N';
        //alert(equusInd);

        var form = $(this).parents('.form');
        var errorBox = el.locator.find('.error_summary');
        var errorSummary = errorBox.find('ul').empty();

        // Clean up past validation errors
        el.locator.attr('class', 'searching');
        form.find('.invalid_input').removeClass('invalid_input');

        // Run validation
        var validated = IC.Validator.validateForm(miniDealerLocatorRules, form, {
            fieldAttribute: 'class',
            fieldError: function(field, ruleName, errorMessage) {
                $(field).addClass('invalid_input');
                el.locator.attr('class', 'no-dealers-found');
                errorSummary.append('<li>' + errorMessage + '</li>');
            },
            complete: function(errors) {
                errorBox[errors.length ? 'show' : 'hide']();
            }
        });



        // Execute the search
        if (validated) {
            // Make sure the maps API is loaded before going any further
            if (!HN.mapsAPILoaded()) {
                HN.loadMapsAPI(function() { el.locateButton.click(); });
                return false;
            }

            // Create the mini locator instance
            if (typeof miniDealerLocator == 'undefined') {
                miniDealerLocator = new HN.DealerLocator({
                    mapTarget: $('#miniDealerLocator .map'),
                    infoWindowID: 'HNMiniInfoWindow',
                    infoWindowTemplate: $('#templates .info_window'),
                    link: 'both',
                    dealerType: 'all'
                });
            }

            //debugger;
            var processDealers = function() {
                // Iterate over each processed dealer node
                miniDealerLocator.dealersToHTML($('#templates .miniDealerLocator li'), function(dealerNode, marker, index) {

                    dealerNode = $(dealerNode);

                    // Append the dealerNode and attach some behaviors
                    dealerNode.appendTo(el.dealers);
                    dealerNode.hoverClass();
                    dealerNode.click(function() {
                        if (!$(this).hasClass('selected')) {
                            // Handle the marker and dealer select states
                            var targetDealer = $(this);
                            var targetMarker = targetDealer.find('.dealer_marker');

                            if (targetDealer.siblings('li.selected').length) {
                                var currentDealer = targetDealer.siblings('li.selected');
                                var currentMarker = currentDealer.find('.dealer_marker');
                                currentMarker.attr('style', currentMarker.attr('style').replace('orange', 'blue'));
                                currentDealer.removeClass('selected');
                            }

                            el.dealers.scrollTo(targetDealer, 800);
                            targetMarker.attr('style', targetMarker.attr('style').replace('blue', 'orange'));
                            targetDealer.addClass('selected');

                            // OMNITURE TRACKING: Dealer Selected
                            var strSelectDealerName = $(this).find('a.dealer_name').text();
                            s.linkTrackVars = 'prop25,products,eVar10,channel';
                            s.linkTrackEvents = 'prodView';
                            s.pageName = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav : Select Dealer';
                            s.channel = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav';
                            s.eVar10 = index + 1;
                            s.prop25 = strSelectDealerName;
                            s.products = ';' + strSelectDealerName;
                            s.events = "prodView";
                            s.t();
                        }
                    });

                    dealerNode.find('#EquusLabel').each(function() {
                        if ($(this).text() == 'Y') {
                            $(this).css("display", "block");
                            $(this).html("AUTHORIZED <font color='#626262'><i>EQUUS</i></font> DEALER");
                        }
                    });

                    // Hide all dealer website links that do not have websites
                    dealerNode.find('.dealer_links a.dealer_url').each(function() {
                        if ($(this).attr('href') == 'http://' || $(this).attr('href') == 'http:///')
                            $(this).hide();
                    });

                    // Hide all dealer Xtime website links that do not have websites
                    dealerNode.find('.dealer_links a.dealer_Xtimeurl').each(function() {
                        if ($(this).attr('href') == '' || $(this).attr('href') == null) {
                            $(this).hide();
                        }
                    });

                    // Hide all dealer Search Inventory URL if Cobalt Flag set to 'Y' and Dealer URl is Blank
                    dealerNode.find('.dealer_links a.dealer_CobaltDealerUrl').each(function() {
                        if ($(this).attr('href') == '' || $(this).attr('href') == null || $(this).attr('href') == 'http://' || $(this).attr('href') == 'http:///') {
                            $(this).hide();
                        }
                    });
                    
                    // Omniture Request Quote
                    dealerNode.find('.dealer_links a.quote').click(function(e) {
                        e.stopPropagation();
                        var requestDealerName = $(this).parents('.dealer_info').find('a.dealer_name').text();
                        s.linkTrackVars = 'prop25,events,products,eVar10,channel';
                        s.linkTrackEvents = 'event1';
                        s.pageName = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav : Request Quote';
                        s.channel = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav';
                        s.eVar10 = index + 1;
                        s.events = 'event1';
                        s.prop25 = requestDealerName;
                        s.products = ';' + requestDealerName;
                        s.t();
                    });

                    // OMNITURE TRACKING: Dealer Website
                    dealerNode.find('.dealer_links a.dealer_url').click(function(e) {
                        e.stopPropagation();
                        var requestDealerName = $(this).parents('.dealer_info').find('a.dealer_name').text();
                        s.linkTrackVars = 'prop25,products,eVar10,channel';
                        s.linkTrackEvents = 'event9';
                        s.pageName = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav : Website';
                        s.channel = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav';
                        s.eVar10 = index + 1;
                        s.prop25 = requestDealerName;
                        s.products = ';' + requestDealerName;
                        s.events = 'event9';
                        s.t();
                    });

                    // Omniture Directions
                    dealerNode.find('.dealer_links a.directions').click(function(e) {
                        e.stopPropagation();
                        var requestDealerName = $(this).parents('.dealer_info').find('a.dealer_name').text();
                        s.linkTrackVars = "events,eVar21,channel";
                        s.linkTrackEvents = 'event23';
                        s.pageName = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav : Driving Directions';
                        s.channel = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav';
                        s.eVar21 = requestDealerName;
                        s.events = 'event23';
                        s.t();
                    });

                    // Build the deeplinks...
                    var dealerCode = miniDealerLocator.dealers[miniDealerLocator.postalCode][index].DealerCode || '';
                    var deepLinkValue = '#/' + miniDealerLocator.postalCode + '/' + (dealerCode ? dealerCode + '/' : '');

                    var dealerLink = dealerNode.find('a.dealer_name');
                    var directionsLink = dealerNode.find('a.directions');

                    dealerLink.attr('href', dealerLink.attr('href') + deepLinkValue);
                    directionsLink.attr('href', directionsLink.attr('href') + deepLinkValue);

                    // Get/set the path for the marker based on index
                    var markerPath = HN.imagePath + '/map/blue/marker' + String.fromCharCode('A'.charCodeAt(0) + index) + '.png';
                    var markerCSS = ($.browser.msie && $.browser.version == 6) ?
						{ background: 'none', filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + markerPath + '", sizingMethod="crop")'} :
						{ background: 'transparent url(' + markerPath + ') no-repeat' };

                    dealerNode.find('.dealer_marker').css(markerCSS);
                });
            };

            // Get dealers
            miniDealerLocator.getDealersByPostalCode(el.postalCodeInput.val(), function() {
                // Limit dealers to 5 for the mini

                this.dealers[this.postalCode] = this.dealers[this.postalCode].slice(0, 5);

                var dealerCount = this.dealers[this.postalCode].length;
                el.locator.find('.dealer_count .count').text(dealerCount);

                //Omniture Taging
                var omnitureDealerNames = [];
                if (dealerCount) {
                    // Omniture Dealer Names					
                    for (var omnitureLoop = 0; omnitureLoop < dealerCount; omnitureLoop++) {
                        omnitureDealerNames.push(";" + this.dealers[this.postalCode][omnitureLoop].DealerName.replace("'", "\'"));
                    }
                } else {
                    omnitureDealerNames.push(';No dealers found');
                }
                // Omniture Tracking
                s.linkTrackVars = 'prop22,events,products,channel';
                s.linkTrackEvents = 'event22,prodView';
                s.pageName = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav : Dealer Results';
                s.channel = HN.getLanguage() + ' : hmausa : Dealer Locator : Top Nav';
                s.events = 'event22,prodView';
                s.prop22 = this.postalCode;
                s.products = omnitureDealerNames.join(',');
                s.t();


                // Cleanup
                el.seeAllDealerships.attr('href', el.seeAllDealerships.attr('href').split('#')[0] + '#/' + this.postalCode + '/');
                el.dealers.empty();

                el.locator.attr('class', dealerCount ? 'dealers-found' : 'no-dealers-found');
                el[dealerCount ? 'noResults' : 'results'].slideUp({ duration: 1000, easing: 'easeOutExpo', complete: function() {
                    el[dealerCount ? 'results' : 'noResults'].slideDown({ duration: 1000, easing: 'easeOutExpo', complete: dealerCount ? processDealers : function() { } });
                }
                });
            }, 5, equusInd == 'Y' ? 'equusOnlyDealerLocations' : 'dealerLocations');
        }

        return false;
    });
});

$(function() {
    // Trigger Korean => English interstitial
    $('#modalToEnglishSite a.cancel').click(function() {
        $('.content_modalClose').click();
    });
    window.openInterstitial = function(href) {
        $('#modalToEnglishSite a.ok').attr('href', href || '#');
        $.fn.modal({ 'contentID': 'modalToEnglishSite' });
    };

    //Edit content height to make sure footer is at the bottom on short content pages
    if ($('#page').outerHeight() < $(window).height() && !(typeof upgradeFlashPage != "undefined")) {
        var cssAttribute = ($.browser.msie && $.browser.version == 6) ? 'height' : 'min-height';
        $('#bodyContent').css(cssAttribute, $('#bodyContent').outerHeight() + ($(window).height() - $('#page').outerHeight()) + 'px');
    }

    // Populate zip code form fields with detected or cookied zip
    (function() {
        if (HN.postalCodeDetected) {
            $('input.zip_code, input.postal_code').each(function() {
                if (HN.getPostalCode()) {
                    $(this).val(HN.getPostalCode());
                }
            }).bind('change blur', function() {
                if (IC.Validator.validate('postalCode.us.short', $(this).val()) && IC.Validator.validate('required', $(this).val())) {
                    HN.setPostalCode($(this).val());
                    $(this).trigger('change blur');
                }
            });
        } else {
            setTimeout(arguments.callee, 100);
        }
    })();

    //Add Arrow to Right Column Content Navigation
    if ($("ul#contentNavigation > li.section_on").length > 0) {
        var contentNavigationSection = $("ul#contentNavigation > li.section_on").position();
        $("#altContent").append("<div id='contentNavigationArrow'></div>");
        $("#contentNavigationArrow").css({ "height": $("ul#contentNavigation > li.section_on").outerHeight() + 5 + "px", "top": contentNavigationSection.top - 4 + "px" }).show();
    }
    
    if ($("ul.vehicle_trims > li.trimOn").length > 0) {
        var contentNavigationSection = $("ul.vehicle_trims > li.trimOn").position();
        $("#dynVehicleContent").append("<div id='contentNavigationArrow'></div>");
        $("#contentNavigationArrow").css({ "height": $("ul.vehicle_trims > li.trimOn").outerHeight() + 5 + "px", "top": contentNavigationSection.top - 4 + "px" }).show();
    }    

    //Create hover class for hovering over li items in the global footer nav
    $('#footerNav > ul li').hoverClass();

    //Add Gradient to Right Column
    $('#altContent').not('.large_flash_page #altContent').wrap('<div id="altContentBtm"></div>');

    //Add image hover to links with images
    $('a.image_hover').imageHover();

    //Add Shadow borders to element
    $('.has_shadow').addShadowBorder();

    //General Content
    $('.general_content').generalContent();

    //General Column Layout
    $('.general_column_layout.two_column').generalColumnLayout();

    //Multi Content Box Layout
    $('.multicontent_box').multiContentBox();

    //Multi Content Box Layout
    $('.multicontent_box1').multiContentBox1();

    //Right Nav External site tool tip
    $('#contentNavigation a, .content_sub_navigation a, #footerNav a').externalSiteToolTip();

    //Print Page	
    $('.button_print a, a.content_print').click(function() { window.print(); return false; });

    //Email
    $('#modalEmail.form input').enterKey(function() { $('#modalEmail.form a.submit').click(); });
    $('#modalEmail.form a.submit').click(function() {
        var form = $(this).parents('.form');
        var errorBox = form.find('.error_summary').hide();
        var errorSummary = errorBox.find('ul').empty();

        form.find('.invalid_input').removeClass('invalid_input');

        var emailRules = {
            'recipient_email': [
				{ 'ruleName': 'required', 'errorMessage': 'Email address is required' },
				{ 'ruleName': 'email', 'errorMessage': 'Email address is invalid.' }
			]
        };

        var validated = IC.Validator.validateForm(emailRules, $('#modalEmail'), {
            'fieldAttribute': 'class',
            'fieldError': function(field, ruleName, errorMessage) {
                $(field).addClass('invalid_input');
                errorSummary.append('<li>' + errorMessage + '</li>');
            },
            'complete': function(errors) {
                if (errors.length) {
                    errorBox.fadeIn(2000);
                }
            }
        });
    });
    $('.content_email, .button_email').click(function() {
        $.fn.modal({ 'contentID': 'modalEmail' });
    });

    //Read More
    $('a.read_more').readMore();

    //General Content Buttons
    //	$('a.content_button').append('<img src="/images/buttons/button_arrow.png" class="content_button_arrow" width="5" height="5" />');
    //	$('a.content_button_same_page').append('<img src="/images/buttons/button_arrow.png" width="5" height="5" />');

    //General Content Links with arrow
    //	$('a.content_link').append('<img src="/images/buttons/content_link_arrow.png" width="6" height="5" />');

    //General Content Links with chevron
    $('a.content_link_chevron').prepend('<img src="/images/buttons/research_chevron.gif" width="7" height="8" />');

    //Content Sub Nav Link Arrows
    //	$('.content_sub_navigation li a, .carousel li a')
    //		.not('.content_sub_navigation .pagination li a, .concept_cars .carousel li a, .about_news .carousel li a, .featured_events_carousel .carousel li a')
    //		.append('<img src="/images/icons/subnav_arrow.png" width="5" height="5" />');

    //Special Offers Link Arrow
    $('.special_offers a').append('<img src="/images/icons/special_offers_arrow.png" width="5" height="5"  />');

    //Vehicle Page Awards & Reviews Carousel
    $('.carousel_container .carousel').carousel({
        loop: false,
        slideTransition: true,
        totalContainer: '.content_sub_navigation .carousel_status',
        nextPrevContainer: '.content_sub_navigation .pagination'
    });

    //Sitemap link width adjustment. Makes sure that the little arrows stay witht he last word, and don't jump to the next line.
    $('.sitemap_row li a').each(function() {
        if ($(this).width() >= 157) {
            $(this).parent().css('width', '154px');
        }
    });

    //Forms utilities
    $("textarea, input[type='text']").focus(function() {
        $(this).addClass('input_focus');
    }).blur(function() {
        $(this).removeClass('input_focus');
    });

    //BEGIN HELP/FAQ PAGE

    //Hides the FAQ Answers via javascript. (Better for SEO)
    $('#bodyContent .faq-section .answer').hide();

    //Click the Question
    $('#bodyContent .faq-section .question a').click(function() {
        var theLi = $(this).closest('li');
        if (theLi.attr('class') == "selected") {
            theLi.find('.answer').slideUp('slow', function() {
                theLi.removeClass('selected');
            });
        } else {
            theLi.addClass('selected').find('.answer').slideDown('slow');
        }
        return false;
    });

    //Click the "view all" buttons.
    $('#bodyContent .faq-section .content_button').click(function() {
        $(this).parent().find('li').each(function() {
            if ($(this).attr('class') != "selected") {
                $(this).addClass('selected').find('.answer').slideDown('slow');
            }
        });
        return false;
    });

    //Click the Close "X" within each question.
    $('#bodyContent .faq-section li .close').hoverClass().click(function() {
        $(this).siblings('.question').find('a').click();
    });

    //END HELP/FAQ PAGE

    $('.newsletter_option label').hoverClass();

    //Clear the input fields on the Financial Overview
    $("input.value_hold").valueHold();

    //Adjust the margin on those special offer pages
    $('.financial_tools .banner_heading').siblings('h2:first').css('margin-top', '0');

    var promoSearchField = $('#promoControls .promocontrol_location');

    //Promo page "enter to submit" functionality. On the zip code field.
    promoSearchField.enterKey(function() {
        $(this).parent().next('div').find('.content_button').click();
    });
});

// Expose some form helpers but namespace
var hyundaiForms = {};

// intelligently add commas to a number field
hyundaiForms.addCommas = function(str) {
    str += '';
    x = str.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};


/*******************************
sIFR Initialization
*******************************/

// sIFR replacement calls 
// http://wiki.novemberborn.net/sifr3/JavaScript+Methods
/*Comment Apr 27
parseSelector.pseudoClasses = {
'not': function(nodes, selector) {
var result = [];
each: for(var i = 0, node; i < nodes.length; i++) {
node = nodes[i];
var ignore = parseSelector(selector, node.parentNode);
for(var j = 0; j < ignore.length; j++) {
if(ignore[j] == node) continue each;
}
result.push(node);
}
return result;
}
};

var univers = {
src: '/swf/univers47.swf',
ratios: [8, 1.42, 9, 1.33, 12, 1.35, 21, 1.3, 31, 1.27, 40, 1.26, 41, 1.24, 49, 1.25, 72, 1.24, 73, 1.23, 74, 1.24, 77, 1.23, 78, 1.24, 86, 1.23, 87, 1.24, 1.23	]
};
sIFR.repaintOnResize = true;
sIFR.useDomLoaded = false;

//Handle Korean sIFR replacement and Korean Font Size
if (HN.getLanguagePath() != '/korean') {
sIFR.activate({ '9': univers });
} else {
$('head').append('<link rel="stylesheet" type="text/css" charset="utf-8" href="/korean/css/hyundai-korean-offset.css" media="all" />');
univers = {
src: '/swf/YGO340.swf',
ratios: [8, 1.42, 9, 1.33, 12, 1.35, 21, 1.3, 31, 1.27, 40, 1.26, 41, 1.24, 49, 1.25, 72, 1.24, 73, 1.23, 74, 1.24, 77, 1.23, 78, 1.24, 86, 1.23, 87, 1.24, 1.23]
};
sIFR.activate({ '9': univers });
}


sIFRCommonCSS = { 
'letter-spacing':'-0.3', 
'background-color':'transparent',
'text-transform':'uppercase'
};

sIFR.replace(univers, {
selector: 'h2.vehicle_header',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#403f3c', 'font-size':'36px' })
}
});
sIFR.replace(univers, {
selector: 'h1 .page_section',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#375c7e', 'font-size':'21px' })
}
});	
sIFR.replace(univers, {
selector: '#specsCarTrims h2',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#626262', 'text-transform':'none', 'font-size':'21px' })
}
});		
sIFR.replace(univers, {
selector: '.banner_heading p',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#727272', 'font-size':'21px' })
}
});
sIFR.replace(univers, {
selector: '.financial_tools .grid_block h2',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#4C647E', 'font-size':'20px' }),
'.subhead': {'color':'#4C647E' }
}
});
sIFR.replace(univers, {
selector: '.about_overview .masthead h2',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#FFFFFF', 'font-size':'24px' })
}
});

sIFR.replace(univers, {
selector: '.about_overview .block_tl h4',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#4c647e', 'font-size':'16px' }),
'a:link, a:visited, a:active, a': {  'color':'#4c647e', 'text-decoration':'none'},
'a:hover': { 'color':'#618EC2', 'text-decoration':'none'}
}
});
sIFR.replace(univers, {
selector: '.about_overview .block_tl h5',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#4c647e', 'font-size':'13px' }),
'a:link, a:visited, a:active, a': {  'color': '#4c647e', 'text-decoration': 'none'},
'a:hover': { 'color': '#618EC2', 'text-decoration': 'none'}
}
});
sIFR.replace(univers, {
selector: '.about_overview .block_tl .time',
transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'color':'#707070', 'font-size':'11px' }
}
});
* End comment Apr 27/
/*
sIFR.replace(univers, {
selector: '#vehicleDetails .model_name',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#555555', 'font-size':'20px' })
}
});
*/
/* Begin comment Apr 27
sIFR.replace(univers, {
selector: '.about_overview .content_block h3',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#4c647e', 'font-size':'18px' }),
'a:link, a:visited, a:active, a': {  'color': '#4c647e', 'text-decoration': 'none'},
'a:hover': { 'color': '#618EC2', 'text-decoration': 'none'}
}
});
sIFR.replace(univers, {
selector: '#saveCreationModal h2, #retrieveCreationModal h2'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4c647e', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '18px' }
}
});
sIFR.replace(univers, {
selector: '#saveCreationModal h3'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#636363', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '12px' }
}
});
sIFR.replace(univers, {
selector: '.about_overview .content_block h4',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#555555', 'font-size':'12px' })
}
});
sIFR.replace(univers, {
selector: '.about_news h2',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#403f3c', 'font-size':'18px' })
}
});
sIFR.replace(univers, {
selector: '.search_result h2',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#303030', 'font-size':'20px' }),
'.subhead': {'color': '#4C647E' }
}
});
sIFR.replace(univers, {
selector: '#search_articles .search_header A',
transparent: true,
css: {
'.sIFR-root': $.extend({}, sIFRCommonCSS, { 'color':'#4C647E', 'font-size':'16px', 'text-decoration':'none', 'cursor':'pointer' })
}
});	
sIFR.replace(univers, {
selector: '.search_result h3'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4C647E', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '15px' },
'.subhead': {'color': '#4C647E' }
}
});
sIFR.replace(univers, {
selector: '.utility_page #bodyContent h2, .financial_tools #bodyContent h2, .contact_page #bodyContent h2, .schedule_test_drive #bodyContent h2'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#4C647E', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px' },
'a:link, a:visited, a:active, a': {  'color': '#5D7E9B', 'text-decoration': 'none'},
'a:hover': { 'color': '#618EC2', 'text-decoration': 'none'}
}
});	
sIFR.replace(univers, {
selector: '.financial_tools #bodyContent h3, .schedule_test_drive #bodyContent h3'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#555555', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px' }
}
});		
sIFR.replace(univers, {
selector: '.package_title'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3c4f63', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px' }
}
});		
sIFR.replace(univers, {
selector: '.careers_main h3'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3e3d3a', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '15px' }
}
});
sIFR.replace(univers, {
selector: '#mainDealerLocator h3'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#555555', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '15px' }
}
});	
sIFR.replace(univers, {
selector: '#specsCarTrims .review'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#727272', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '14px' },
'.publication': {'font-size': '9px'}
}
});		
sIFR.replace(univers, {
selector: '#mainDealerLocator #mainDealerSearch.form label'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#808080', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '12px' }
}
});	
sIFR.replace(univers, {
selector: '.contact_form label, #emailUpdates1 label, #emailUpdates2 table label, #emailUnsub label, #promoControls label'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#8b8b8b', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '12px' }
}
});
sIFR.replace(univers, {
selector: '.financial_tools .form label:not(.incentives_label),.research .form label:not(.incentives_label),#saveCreationModal label:not(.standard_label),#retrieveCreationModal label'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#5d5d5d', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '11px' }
}
});
sIFR.replace(univers, {
selector: '.financial_tools .form .and_or',
transparent: true,
css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#5d5d5d', 'background-color': 'transparent', 'text-transform': 'uppercase', 'text-align': 'center', 'font-size': '11px' }
}
});

sIFR.replace(univers, {
selector: '.resources .overview_gridblock h2',
transparent: true,
fitExactly: true,
css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#456584', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '20px' }
}
});
sIFR.replace(univers, {
selector: '.resources .reviews_awards h2, .resources .reviews_awards .overview h2'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#456584', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '12px' }
}
});
sIFR.replace(univers, {
selector: '.content_copy.why_hyundai h3'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#456584', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '20px' }
}
});

sIFR.replace(univers, {
selector: '.why_hyundai h3'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#666666', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '18px' }
}
});
sIFR.replace(univers, {
selector: '.review_text .review_headline'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#456584', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px' }
}
});	
sIFR.replace(univers, {
selector: '#comparisonContainer #imageComparison .image_caption'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#8c8c8c', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px','text-align':'center' },
'.trim': {'color': '#3e3d3a'}
}
});	
sIFR.replace(univers, {
selector: '.review_actions .model_text'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#5f5f5f', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '14px' }
}
});

sIFR.replace(univers, {
selector: '.car_details .review_headline'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#456584', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '14px' }
}
});
sIFR.replace(univers, {
selector: '.car_title'
,transparent: true
,fitExactly: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#5f5f5f', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '14px' },
'.subheadline': {'color': '#4c647e'}
}
});	
*/
/* Basic Replacements */

/* Begin comment Apr 27
sIFR.replace(univers, {
selector: 'h1:not(.specs_title)'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#555555', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '18px' },
'.subtitle': {'color': '#4C647E' }
}
});	
sIFR.replace(univers, {
selector: 'h2'
,transparent: true
,fixWrap: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3e3d3a', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '24px' },
'.subhead': {'color': '#4C647E' }
}
});
sIFR.replace(univers, {
selector: 'h3:not(.specs_header_text):not(.sitemap h3)'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3e3d3a', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '20px' },
'.subhead': {'color': '#707070', 'font-size':'11px', 'text-transform' :'none' },
'a:link, a:visited, a:active, a': {  'color': '#5D7E9B', 'text-decoration': 'none'},
'a:hover': { 'color': '#618EC2', 'text-decoration': 'none'}
}
});	
sIFR.replace(univers, {
selector: 'h4'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#3e3d3a', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '16px' }
}
});
sIFR.replace(univers, {
selector: 'h5'
,transparent: true
,css: {
'.sIFR-root': { 'letter-spacing': '-0.3', 'color': '#8b8b8b', 'background-color': 'transparent', 'text-transform': 'uppercase', 'font-size': '12px' }
}
});	
End comment Apr 27*/

