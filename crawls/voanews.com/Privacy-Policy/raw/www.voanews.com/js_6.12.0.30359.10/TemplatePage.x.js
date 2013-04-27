/* /js_6.12.0.30359.10/jquery/jquery.ba-bbq.js */
/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,r){var h,n=Array.prototype.slice,t=decodeURIComponent,a=$.param,j,c,m,y,b=$.bbq=$.bbq||{},s,x,k,e=$.event.special,d="hashchange",B="querystring",F="fragment",z="elemUrlAttr",l="href",w="src",p=/^.*\?|#.*$/g,u,H,g,i,C,E={};function G(I){return typeof I==="string"}function D(J){var I=n.call(arguments,1);return function(){return J.apply(this,I.concat(n.call(arguments)))}}function o(I){return I.replace(H,"$2")}function q(I){return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(K,P,I,L,J){var R,O,N,Q,M;if(L!==h){N=I.match(K?H:/^([^#?]*)\??([^#]*)(#?.*)/);M=N[3]||"";if(J===2&&G(L)){O=L.replace(K?u:p,"")}else{Q=m(N[2]);L=G(L)?m[K?F:B](L):L;O=J===2?L:J===1?$.extend({},L,Q):$.extend({},Q,L);O=j(O);if(K){O=O.replace(g,t)}}R=N[1]+(K?C:O||!N[1]?"?":"")+O+M}else{R=P(I!==h?I:location.href)}return R}a[B]=D(f,0,q);a[F]=c=D(f,1,o);a.sorted=j=function(J,K){var I=[],L={};$.each(a(J,K).split("&"),function(P,M){var O=M.replace(/(?:%5B|=).*$/,""),N=L[O];if(!N){N=L[O]=[];I.push(O)}N.push(M)});return $.map(I.sort(),function(M){return L[M]}).join("&")};c.noEscape=function(J){J=J||"";var I=$.map(J.split(""),encodeURIComponent);g=new RegExp(I.join("|"),"g")};c.noEscape(",/");c.ajaxCrawlable=function(I){if(I!==h){if(I){u=/^.*(?:#!|#)/;H=/^([^#]*)(?:#!|#)?(.*)$/;C="#!"}else{u=/^.*#/;H=/^([^#]*)#?(.*)$/;C="#"}i=!!I}return i};c.ajaxCrawlable(0);$.deparam=m=function(L,I){var K={},J={"true":!0,"false":!1,"null":null};$.each(L.replace(/\+/g," ").split("&"),function(O,T){var N=T.split("="),S=t(N[0]),M,R=K,P=0,U=S.split("]["),Q=U.length-1;if(/\[/.test(U[0])&&/\]$/.test(U[Q])){U[Q]=U[Q].replace(/\]$/,"");U=U.shift().split("[").concat(U);Q=U.length-1}else{Q=0}if(N.length===2){M=t(N[1]);if(I){M=M&&!isNaN(M)?+M:M==="undefined"?h:J[M]!==h?J[M]:M}if(Q){for(;P<=Q;P++){S=U[P]===""?R.length:U[P];R=R[S]=P<Q?R[S]||(U[P+1]&&isNaN(U[P+1])?{}:[]):M}}else{if($.isArray(K[S])){K[S].push(M)}else{if(K[S]!==h){K[S]=[K[S],M]}else{K[S]=M}}}}else{if(S){K[S]=I?h:""}}});return K};function A(K,I,J){if(I===h||typeof I==="boolean"){J=I;I=a[K?F:B]()}else{I=G(I)?I.replace(K?u:p,""):I}return m(I,J)}m[B]=D(A,0);m[F]=y=D(A,1);$[z]||($[z]=function(I){return $.extend(E,I)})({a:l,base:l,iframe:w,img:w,input:w,form:"action",link:l,script:w});k=$[z];function v(L,J,K,I){if(!G(K)&&typeof K!=="object"){I=K;K=J;J=h}return this.each(function(){var O=$(this),M=J||k()[(this.nodeName||"").toLowerCase()]||"",N=M&&O.attr(M)||"";O.attr(M,a[L](N,K,I))})}$.fn[B]=D(v,B);$.fn[F]=D(v,F);b.pushState=s=function(L,I){if(G(L)&&/^#/.test(L)&&I===h){I=2}var K=L!==h,J=c(location.href,K?L:{},K?I:2);location.href=J};b.getState=x=function(I,J){return I===h||typeof I==="boolean"?y(I):y(J)[I]};b.removeState=function(I){var J={};if(I!==h){J=x();$.each($.isArray(I)?I:arguments,function(L,K){delete J[K]})}s(J,2)};e[d]=$.extend(e[d],{add:function(I){var K;function J(M){var L=M[F]=c();M.getState=function(N,O){return N===h||typeof N==="boolean"?m(L,N):m(L,O)[N]};K.apply(this,arguments)}if($.isFunction(I)){K=I;return J}else{K=I.handler;I.handler=J}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);;

/* /js_6.12.0.30359.10/jquery/jquery.scrollTo-1.4.2.js */
(function(c){var a=c.scrollTo=function(f,e,d){c(window).scrollTo(f,e,d)};a.defaults={axis:"xy",duration:parseFloat(c.fn.jquery)>=1.3?0:1};a.window=function(d){return c(window)._scrollable()};c.fn._scrollable=function(){return this.map(function(){var e=this,d=!e.nodeName||c.inArray(e.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!d){return e}var f=(e.contentWindow||e).document||e.ownerDocument||e;return c.browser.safari||f.compatMode=="BackCompat"?f.body:f.documentElement})};c.fn.scrollTo=function(f,e,d){if(typeof e=="object"){d=e;e=0}if(typeof d=="function"){d={onAfter:d}}if(f=="max"){f=9000000000}d=c.extend({},a.defaults,d);e=e||d.speed||d.duration;d.queue=d.queue&&d.axis.length>1;if(d.queue){e/=2}d.offset=b(d.offset);d.over=b(d.over);return this._scrollable().each(function(){var l=this,j=c(l),k=f,i,g={},m=j.is("html,body");switch(typeof k){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)){k=b(k);break}k=c(k,this);case"object":if(k.is||k.style){i=(k=c(k)).offset()}}c.each(d.axis.split(""),function(q,r){var s=r=="x"?"Left":"Top",u=s.toLowerCase(),p="scroll"+s,o=l[p],n=a.max(l,r);if(i){g[p]=i[u]+(m?0:o-j.offset()[u]);if(d.margin){g[p]-=parseInt(k.css("margin"+s))||0;g[p]-=parseInt(k.css("border"+s+"Width"))||0}g[p]+=d.offset[u]||0;if(d.over[u]){g[p]+=k[r=="x"?"width":"height"]()*d.over[u]}}else{var t=k[u];g[p]=t.slice&&t.slice(-1)=="%"?parseFloat(t)/100*n:t}if(/^\d+$/.test(g[p])){g[p]=g[p]<=0?0:Math.min(g[p],n)}if(!q&&d.queue){if(o!=g[p]){h(d.onAfterFirst)}delete g[p]}});h(d.onAfter);function h(n){j.animate(g,e,d.easing,n&&function(){n.call(this,f,d)})}}).end()};a.max=function(j,i){var h=i=="x"?"Width":"Height",e="scroll"+h;if(!c(j).is("html,body")){return j[e]-c(j)[h.toLowerCase()]()}var g="client"+h,f=j.ownerDocument.documentElement,d=j.ownerDocument.body;return Math.max(f[e],d[e])-Math.min(f[g],d[g])};function b(d){return typeof d=="object"?d:{top:d,left:d}}})(jQuery);;

/* /js_6.12.0.30359.10/custom/globalFunctions.js */
var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var isOpera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1)?true:false;var isIE6=navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1;var isIE7=navigator.userAgent.toLowerCase().indexOf("msie 7")!=-1;var isIE8=navigator.userAgent.toLowerCase().indexOf("msie 8")!=-1;var isChrome=navigator.userAgent.toLowerCase().indexOf("chrome")!=-1;var isSafari=navigator.userAgent.toLowerCase().indexOf("safari")!=-1&&navigator.userAgent.toLowerCase().indexOf("chrome")==-1;function thisMovie(b){var a=window[b];if(typeof(a)=="undefined"){a=document[b]}if(typeof(a)=="undefined"){a=document.getElementById(b)}return a}function flashPlay(a){a1=thisMovie("MediaPlayer"+a);a1.jsPlay()}function openMainMedia(){var a=$("#mainMediaSmall").children();a.find("script").each(function(){var b=$(this);if(b.text().indexOf("Sys.Application.add_init")!==-1){b.empty()}});$("#mainMediaBig").empty().append(a);$("#mainMediaSmall").empty();$("#mainMediaBig a[rel^='ibox']").fancybox({type:"image",titlePosition:"inside",transitionOut:"elastic",padding:12,margin:0,onComplete:imageFancyboxOpened,onClosed:imageFancyboxClosed})}function closeMainMedia(){$("#mainMediaSmall").empty().append($("#mainMediaBig").children());$("#mainMediaBig").empty()}function expandMedia(b,a){a1=thisMovie("MediaPlayer"+b);isMainMedia=false;isMSIE7=($.browser.msie&&$.browser.version.slice(0,1)=="7");if(a=="Big"){if($("#expandSmall"+b).parents("#mainMediaSmall").length>0){isMainMedia=true}if(isMainMedia){openMainMedia()}$(".expandedElement").hide();if($("#mainMediaBig .expandedElement").length>0){closeMainMedia()}$(".collapsedElement").show();$(".collapsedElement .expandedObject").show();$(".collapsedElement").animate({width:"268"},400,function(){});$(".expandedElement").removeClass("expandedElement");$(".collapsedElement").removeClass("collapsedElement");$("#expandSmall"+b+" img").addClass("expandedObject");$("#expandSmall"+b+" .expandedObject").attr("style","width:100%;");if(a1==null){$("#expandSmall"+b+" .contentImage").attr("style","width:100%;")}$("#expandSmall"+b).animate({width:"640"},300,function(){$("#expandSmall"+b).hide();$("#expandSmall"+b).addClass("collapsedElement");$("#expandSmall"+b+" .expandedObject").hide();var e=$("#expandBig"+b+" object");if(e.attr("name")&&e.attr("name").toLowerCase()==="photogalleryplayer"&&e.html().toLowerCase().indexOf('param name="flashvars" value=""')!==-1){var d=e.parent();var c=$("param[name='flashvars']",e);var g=d.html();var f=function(h){if(h.toLowerCase().indexOf("configfilepath")!==-1){return h}else{return"configFilePath="+encodeURIComponent("/GetFlashXml.aspx?param="+e.attr("id").split("_")[1]+"|user|photogalleryEmbeded&roloverFlimstripDisabled=0")}};g=g.replace(/PARAM NAME="FlashVars" VALUE=""/gi,'PARAM NAME="flashvars" VALUE="'+f(c.attr("value"))+'"');d.html("");window.setTimeout(function(){d.html(g)},10)}$("#expandBig"+b).show();$("#expandBig"+b).addClass("expandedElement")});if(a1!=null&&!isMSIE7){setTimeout("flashPlay('"+b+"')",1000)}}else{if($("#expandBig"+b).parents("#mainMediaBig").length>0){isMainMedia=true}$("#expandBig"+b).hide();$("#expandSmall"+b).show();$("#expandSmall"+b+" .expandedObject").show();$("#expandSmall"+b).animate({width:"268"},400,function(){if(isMainMedia){closeMainMedia()}$(".expandedElement").removeClass("expandedElement");$(".collapsedElement").removeClass("collapsedElement")});if(a1!=null&&!isMSIE7){a1.jsStop()}}return false}function RedirectToForum(a,b){window.location=a+b+"#relatedInfoContainer"}function in_array(c,b){for(var a=0;a<b.length;a++){if(b[a]==c){return true}}return false}function setThumbOpacity(b,a){b.style.opacity=a/10;b.style.filter="alpha(opacity="+a*10+")"}var files2include=new Array();function includeJS(a){if(!in_array(a,files2include)){files2include[files2include.length]=a}}var onloadActions=new Array();function addOnloadAction(a){onloadActions[onloadActions.length]=a}var included_files=new Array();function include_once(a){if(!in_array(a,included_files)){included_files[included_files.length]=a;include_dom(a)}}function include_dom(a){var b=document.getElementsByTagName("head").item(0);var c=document.createElement("script");c.setAttribute("language","javascript");c.setAttribute("type","text/javascript");c.setAttribute("src",a);b.appendChild(c);return false}function Set_Cookie(c,e,a,h,d,g){var b=new Date();b.setTime(b.getTime());if(a){a=a*1000*60*60*24}var f=new Date(b.getTime()+(a));document.cookie=c+"="+escape(e)+((a)?";expires="+f.toGMTString():"")+((h)?";path="+h:"")+((d)?";domain="+d:"")+((g)?";secure":"")}function Get_Cookie(c){var d=document.cookie.indexOf(c+"=");var a=d+c.length+1;if((!d)&&(c!=document.cookie.substring(0,c.length))){return null}if(d==-1){return null}var b=document.cookie.indexOf(";",a);if(b==-1){b=document.cookie.length}return unescape(document.cookie.substring(a,b))}function saveVolume(a){Set_Cookie("mp_volume",a,365)}function getVolume(){var a=Get_Cookie("mp_volume");if(a===null){a=0.75}return a}function mixMail(){var d=$(".mixmail");for(var b=0;b<d.length;b++){var a=d[b].firstChild.nodeValue.lastIndexOf("/");if(a>-1){d[b].firstChild.nodeValue=d[b].firstChild.nodeValue.substr(a+1)}d[b].firstChild.nodeValue=d[b].firstChild.nodeValue.replace("+","@");for(var c=0;c<d[b].attributes.length;c++){if(d[b].attributes[c].name=="href"){var a=d[b].attributes[c].nodeValue.lastIndexOf("/");if(a>-1){d[b].attributes[c].nodeValue=d[b].attributes[c].nodeValue.substr(a+1)}d[b].attributes[c].nodeValue="mailto:"+d[b].attributes[c].nodeValue.replace("+","@");break}}}}function fixTabs(){$(".tablink").click(function(a){a.preventDefault()});$(".tab_acc").click(function(a){a.preventDefault()});$(".nohref").click(function(a){a.preventDefault()})}function SearchButton(a,c,b){if(b!=""){location.href="/"+b+"/search/?k="+encodeURI(this.document.getElementById(a).value)}else{location.href="/search/?k="+encodeURI(this.document.getElementById(a).value)}}var fixOperaRedrawInProgress=false;function fixOperaRedraw(a){if(window.opera){var b=$(document.body).css("background-color");if(!a){a="#ffffff"}$(document.body).css("background-color",a);if(fixOperaRedrawInProgress!=true){setTimeout(function(){$(document.body).css("background-color",b);fixOperaRedrawInProgress=false},10)}fixOperaRedrawInProgress=true}}function sharemoreOut(a){var b=document.getElementById(a);b.style.display="none"}function sharelinkOver(a){var b=document.getElementById(a);if(b.style.display=="block"){b.style.display="none"}else{b.style.display="block"}}function winName(b,c){b=b==null?publicSiteId:b;c=(c==null)?"embededPopupWin":c;var a=c+"_"+b;return a}function winFocus(a){if(window.focus){a.focus()}if(isChrome){a.blur()}}function playNextItem(a){playlist&&playlist.playNextItem(a)}var coverageMapURI="http://flashvideo.rferl.org/Flashmaps/en-US/coverageOneWin/default.htm";function FlashMapOpen(){wleft=(screen.width-969)/2;wtop=(screen.height-644)/2;newwindow=window.open(coverageMapURI,"rferlCoverageMap","titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=969,height=644,left="+wleft+",top="+wtop);if(window.focus){newwindow.focus()}}function disableSelection(a){if(typeof a.onselectstart!="undefined"){a.onselectstart=function(){return false}}else{if(typeof a.style.MozUserSelect!="undefined"){a.style.MozUserSelect="none"}else{a.onmousedown=function(){return false}}}a.style.cursor="default"}function RFERLExternalWidgetGACall(i,j,a,c,g,h){try{if(i==window.Settings.GoogleAnalytics.SiteIdentifier){var d=(g==undefined)?"":g;var b=(h==undefined)?"":h;j=String(j);a=String(a);c=String(c);d=String(d);_gaq.push([j,a,c,d]);return true}else{return"Sending aborted, not original site."}}catch(f){return f}}function resolveFlashWidth(f){var a=$("#"+f),e=a.parents(".middle_content");if(e.length>0){if(isIE6){e=e.parents(".content_column2_1")}var d=$(".articleLeftContainer",e),c=a.position().top,b=d.position().top;return(c>=b&&c<=(b+d.outerHeight(true)))?e.outerWidth()-d.outerWidth()-(isIE6||isIE7?50:0):"100%"}else{return"100%"}}function watchWmpVolume(a){if(a===null){return}var b=null;if(a.settings){b=a.settings.volume}if($.browser.msie){window.setInterval(function(){if(a.object){if(b===null){b=a.object.Volume}else{if(b!=a.object.Volume){b=a.object.Volume;saveVolume(b==-10000?1:Math.exp(b/1000))}}}},500)}else{window.setInterval(function(){if(a.settings){if(b===null){b=a.settings.volume}else{if(b!=a.settings.volume){saveVolume((b=a.settings.volume)/100)}}}},500)}}function setWmpVolume(a,b){if(a===null||b===null){return}if($.browser.msie){var c=0;if(b==0){c=-10000}else{c=Math.log(b/100)*1000}if(a.object){a.object.Volume=c}else{window.setTimeout(function(){if(a.object){a.object.Volume=c}else{$(a).ready(function(){if(a.object){a.object.Volume=c}})}},500)}}else{if(a.settings){a.settings.volume=b}else{window.setTimeout(function(){if(a.settings){a.settings.volume=b}else{$(a).ready(function(){if(a.settings){a.settings.volume=b}})}},500)}}}function smallMessageBox(c){var b=$(".smallMessageBox");var a=null;if(b.length>0){a=b}else{a=$("<div>").addClass("smallMessageBox").append($("<div>").addClass("smallMessageBoxX").html("&nbsp;").click(function(d){a.hide()}),$("<div>").addClass("smallMessageBoxContent")).appendTo("body");$(window).click(function(f){var d=$(f.target);if(!d.hasClass("smallMessageBox")&&d.parents(".smallMessageBox").length===0){a.hide()}})}a.show();if(c){if(c.html){$(".smallMessageBoxContent",a).html(c.html)}if(c.left){a.css("left",c.left+"px")}if(c.top){a.css("top",c.top+"px")}if(c.hide){a.hide()}}return a}function openSharePopup(b){var a=window.open(b,"SharePopup","width=940,height=600,menubar=no,resizable=yes,scrollbars=yes");a.focus();void (0);return false};;

/* /js_6.12.0.30359.10/custom/zoomContent.js */
var measureUnit="px";var minStyleSize=11;var maxStyleSize=25;var defaultStyleSize=15;var stepStyleSize=2;var defaultLineHeight;var defaultFontSize;function loadzoom(){var a=$(".zoomMe");defaultLineHeight=parseInt(a.css("line-height"));var b=parseInt(a.css("font-size"));if(b>0&&b!==defaultStyleSize){defaultStyleSize=b}defaultFontSize=defaultStyleSize;var c=Get_Cookie("ZoomSize");if((c!=undefined)&&(parseInt(c)>=minStyleSize)){changeFontSize(parseInt(c))}}function changeFontSizeRecursive(e,a){if(e.innerHTML!=""){var f=$(e);if(f.hasClass("imageCaption")||f.hasClass("photo_caption")||f.hasClass("firstLetter")||f.hasClass("htmlPhg")||f.hasClass("mediaplayer")){return}if(e.style!=undefined){var d=f.prop("tagName").toLowerCase();if(d!=="h1"&&d!=="h2"&&d!=="h3"&&d!=="h4"&&d!=="h5"&&d!=="h6"){var c=(e.style.fontSize=="")?a:parseInt(e.style.fontSize)+a-defaultStyleSize;f.css("font-size",c+measureUnit);f.css("line-height",parseInt((c/defaultFontSize)*defaultLineHeight)+measureUnit)}}for(var b=0;b<e.childNodes.length;b++){changeFontSizeRecursive(e.childNodes[b],a)}}}function changeFontSize(a){var c=$(".zoomMe");for(var b=0;b<c.length;b++){changeFontSizeRecursive(c[b],a)}defaultStyleSize=a;Set_Cookie("ZoomSize",a,365,"","","")}function increaseFontSize(){if(defaultStyleSize<maxStyleSize){var a=Math.min(parseInt(defaultStyleSize)+stepStyleSize,maxStyleSize);changeFontSize(a)}}function decreaseFontSize(){if(defaultStyleSize>minStyleSize){var a=Math.max(parseInt(defaultStyleSize)-stepStyleSize,minStyleSize);changeFontSize(a)}};;

/* /js_6.12.0.30359.10/custom/restoreIframes.js */
function setIframes(){var g=(navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1);var c=(navigator.userAgent.toLowerCase().indexOf("msie")!=-1);var e=$(".iframe");for(var j=0;j<e.length;j++){var a=$(e[j]).text();var d=$(e[j]).attr("class");var k="";var f=0;var b=$(e[j]).parent();if($(b).attr("style")!=undefined){var n=$(b).attr("style");n=n.toLowerCase();if(n.indexOf("height:")==-1){f=parseInt($(b).css("margin-top"))+parseInt($(b).css("margin-bottom"));var b=$(b).parent()}}else{f=parseInt($(b).css("margin-top"))+parseInt($(b).css("margin-bottom"));var b=$(b).parent()}if($(b).attr("style")!=undefined){var n=$(b).attr("style");n=n.toLowerCase();if(g){var m=n.split(";");for(var l=0;l<m.length;l++){if(m[l].substr(0,10)=="min-height"){$(b).height(m[l].substr(11))}}}else{if(n.indexOf("height:")!=-1){var k=$(b).height()-f}}}$(e[j]).replaceWith('<iframe src="'+a+'" class="'+d+'"'+(k!=""?' style="height:'+k+'px"':"")+' frameborder="0" scrolling="no"'+(c?' allowtransparency="true"':"")+"></iframe>")}};;

/* /js_6.12.0.30359.10/general.js */
/// <reference assembly="System.Web.Extensions" name="MicrosoftAjax.debug.js"/>
/// <reference path="http://code.jquery.com/jquery-1.4.1-vsdoc.js"/>

// regex support for jQuery selectors
jQuery.expr[':'].regex = function (elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ?
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels, '')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}


function getVerticalScrollbarWidth() {
    if ($('body').outerHeight() === $(window).height()) return 0; // has NOT vertical scrollbars

    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
    $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
    inner = $inner[0],
    outer = $outer[0];

    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();

    return (width1 - width2);
}

// switch displaying of an element (hide or display)
function slideToggle(element) {
    $(element).slideToggle("slow", "swing");
}


// open generic modal window (modal_<PARAM:MODAL>.aspx)
function openIframeModal(modal) {

    if (typeof (disableModal) != 'undefined' && disableModal && typeof(disableModal[modal]) != 'undefined') return;

    var queryString = jQuery.url.attr("query");
    if (queryString) queryString = '?' + queryString;

    var href = '/modal_' + modal + '.aspx';
    if (queryString != null) href = href + queryString;

    $.fancybox({
        'href': href,
        'hideOnContentClick': false,
        'type': 'iframe',
        'titleShow': false,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        //'opacity': true,
        'width': 800,
        'height': 600,
        'padding': 0,
        'margin': 0,
        'onComplete': iframeFancyboxOpened,
        'onClosed': iframeFancyboxClosed
    });
}

function openModalUrl(url, title, options) {
    /// <summary>Opens an URL in iframe in modal popup using FancyBox</summary>
    /// <param name="url" type="String">URL to open</param>
    /// <param name="title" type="String" optinal="true" mayBeNull="true">Optional modal popup title</param>
    /// <param name="options" optional="true" myBeNull="true">Additional optional options for FancyBox</param>
    /// <remarks>This function is intened to be called by users if they want to open their links in modal popup iframe. They should use link like javascript:openModalUrl("http://rferl.org").</remarks>
    var defopt = {
        onComplete: iframeFancyboxOpened,
        onClosed: iframeFancyboxClosed,
        hideOnContentClick: false,
        type: 'iframe',
        titleShow: (typeof(title) != 'undefined' && title) ? true : false,
        transitionIn: 'elastic',
        transitionOut: 'elastic',
        speedIn: 600,
        speedOut: 200,
        width: 800,
        height: 600,
        padding: 0,
        margin: 0
    };
    if(typeof(options) == 'undefined' || !options) options = defopt;
    else for(o in defopt)
        if(typeof(options[o]) == 'undefined') options[o] = defopt[o];
    $('<a>').attr("href", url).text( (typeof(title) != 'undefined' && title) ? title : "" ).fancybox(options).click();
}


function closeIframeModal() {
    parent.$.fancybox.close();
}


function toggletalkshowbox(liEl) {

    var titleEl = $(liEl).find('span.title');
    var contentEl = $(liEl).find('div.content');

    var content = '';

    if ($(titleEl).html() != '') {
        content = content + '<div class="inlineModalHeader"><div class="modalHeaderInner"><h2>' + $(titleEl).html() + '</h2></div></div>';
    }

    content = content + '<div class="inlineModalContent">' + $(contentEl).html() + '</div>';

    $.fancybox({
        'content': content,
        'hideOnContentClick': false,
        'autoScale': true,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'autoDimensions': false,
        'width': '50%',
        'padding': 0,
        'margin': 0
    });


}

function highlightFirstLetter(element) {
    if ($(element)[0]) { // only if the element exists
        /*
        $(element).each(function (index) {
        var html = $(this).html();
        if (html) {
        var match = html.match(/>[ \s]*([^<\s]){1}/);
        if (match && match[1]) {
        html = html.replace(/>[ \s]*([^<\s]){1}/, '><span class="firstLetter">' + match[1] + '</span>');
        $(this).html(html);
        }
        }

        });
        */
        var mytrim = function (str) {
            return str.trim().replace(/^\u00A0+|\u00A0+$/g, ''); //NBSP because of IE
        }
        var filterTextNodes = function () {
            if ($(this).is("script, iframe, object, embed, video, noscript, style")) //Ignore these elements
                return null;
            return (this.nodeType == 3 && mytrim($(this).text())) ? true : false;
        };
        $(element).each(function (index) {
            var textNode = $(findFirstNodeDFS($(this), filterTextNodes));
            var textParent = textNode.parent();
            var text = mytrim(textNode.text());

            if (textParent.length > 0 && textNode.length > 0 && text) {
                text = text + ' '; // fix for links in text (missing space before first link)
                var firstLetter;
                //                 "      '     «     »     ‘      ’    ‛     “     „      ‟     ‹    ›      ❛     ❜   ❝       ❞    「     『     〝    〞    〟   ＂        NBSP because of IE
                if (text.match(/^[\u0022\u0027\u00AB\u00BB\u2018\u201A\u201B\u201C\u201E\u201F\u2039\u203A\u275B\u275C\u275D\u275E\u300C\u300E\u301D\u301E\u301F\uFF02][^\s\u00A0]/)) //Left quotes (plus › and »; see http://en.wikipedia.org/wiki/Quotation_mark_glyphs)
                    firstLetter = text.substring(0, 2);
                else
                    firstLetter = text.substring(0, 1);
                var span = $("<span class='firstLetter'/>");
                span.text(firstLetter);
                var rest = document.createTextNode(text.substring(firstLetter.length));

                textParent[0].insertBefore(span[0], textNode[0]);
                textParent[0].insertBefore(rest, textNode[0]);
                textNode.remove();
            }
        });


    }
    /*
    if ($(element)[0]) { // only if the element exists
    var html = $(element).html();
    if (html) {
    var match = html.match(/>[ \s]*([^<\s]){1}/);
    if (match && match[1]) {
    html = html.replace(/>[ \s]*([^<\s]){1}/, '><span class="firstLetter">' + match[1] + '</span>');
    $(element).html(html);
    }
    }
    } 
    */
}

function findFirstNodeDFS(where, condition) {
    /// <summary>Finds first DOM node for which a condition evaluates to true. Nodes are evaluated in Deep First Search order.</summary>
    /// <param name="where" type="jQuery">A root jQuery object to look for items inside it.</param>
    /// <param name="condition" type="Function">The condition to evaluate. It takes no parameter. This object is set to current DOM node to evaluate. Returns true to use this node, null not to use this node and  ignore its children, false not to use this node but try children.</param>
    /// <returns type="Object" domElement="true" mayBeNull="true">A DOM element representing first node found or null if no such node was found.</returns>
    var ret = null;
    where.each(function () {
        var cret = condition.call(this);
        if (cret === true) {
            ret = this;
            return false;
        }
        if (cret === null) return true; //Continue
        var iret = findFirstNodeDFS($(this).contents(), condition);
        if (iret) {
            ret = iret;
            return false;
        }
    });
    return ret;
}


function imageFancyboxOpened() {
    $("#fancybox-outer").addClass('imageFancybox');
    $("a#fancybox-close").html('<span class="title">' + window.Localizations.Common.Title.CloseWindow + '</span>');
}

function imageFancyboxClosed() {
    $("#fancybox-outer").removeClass('imageFancybox');
    $("a#fancybox-close").html('');
}

function iframeFancyboxOpened() {
    $("#fancybox-outer").addClass('iframeFancybox');
    $("a#fancybox-close").html('<span class="title" title="' + window.Localizations.Common.Title.CloseWindow + '">' + window.Localizations.Common.Title.CloseWindow + '</span>');
}

function iframeFancyboxClosed() {
    $("#fancybox-outer").removeClass('iframeFancybox');
    $("a#fancybox-close").html('');
}

function setOpenedMultimediaControl() {
    if ($('#audio_menu_trigger').hasClass('opened')) $('.mm_control_audio').addClass('opened');
    else $('.mm_control_audio').removeClass('opened');

    if ($('#itv_menu_trigger').hasClass('opened')) $('.mm_control_itv').addClass('opened');
    else $('.mm_control_itv').removeClass('opened');
}


// javascript 'class' deffinition for validation framework class - Hadankar Validation framework
function hadValid() {

    // objective global variables - settings
    this.imgPath = "img/";
    this.okFileName = "OK.png";
    this.okAlternativeText = "OK";
    this.errorFileName = "errorHS.png";
    this.errorAlternativeText = "Mandatory field";

    // common regular expressions
    this.datum = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}\s\d{1,2}:\d{2}$/);
    this.int = new RegExp(/^-?\d+$/);
    this.intNulable = new RegExp(/^((-?\d+)|(NULL))$/i); //
    this.htmlTag = new RegExp(/<.*?>/ig);
    this.float = new RegExp(/^-?\d+[.,]?\d*$/);

    // register methods (actions) after control onchange event
    this.registerChange = function (tagID, controlType, regEx, checkNow, bAutotrim, imagePath) {
        if (imagePath) this.imgPath = imagePath;
        var tag = myValid.pageIdAdapter(tagID, controlType);
        if (tag == null) return;
        if (checkNow == true) {
            if (bAutotrim == true) myValid.autoTrim(tagID);
            myValid.setStateImages(myValid.validateRegEx(tagID, controlType, regEx), tag);
        }
        tag.onchange = function () {
            if (bAutotrim == true) myValid.autoTrim(tagID);
            myValid.setStateImages(myValid.validateRegEx(tagID, controlType, regEx), tag);
        };
    }

    // register methods (actions) after control onkeydown event
    this.registerKeyDownChange = function (tagID, controlType, regEx, checkNow, bAutotrim, imagePath) {
        if (imagePath) this.imgPath = imagePath;
        var tag = myValid.pageIdAdapter(tagID, controlType);
        if (tag == null) return;
        if (checkNow == true) {
            if (bAutotrim == true) myValid.autoTrim(tagID);
            myValid.setStateImages(myValid.validateRegEx(tagID, controlType, regEx), tag);
        }
        tag.onkeyup = function () {
            if (bAutotrim == true) myValid.autoTrim(tagID);
            tag = document.getElementById(tag.id); // load tag by ID again, to determine corect value
            myValid.setStateImages(myValid.validateRegEx(tagID, controlType, regEx), tag);
        }
        tag.onchange = function () {
            if (bAutotrim == true) myValid.autoTrim(tagID);
            tag = document.getElementById(tag.id); // load tag by ID again, to determine corect value
            myValid.setStateImages(myValid.validateRegEx(tagID, controlType, regEx), tag);
        };
    }

    // registration function on select control change value
    this.registerChangeSelect = function (tagID, checkNow) {
        var tag = myValid.pageIdAdapter(tagID, 'select');
        if (tag == null) return;
        if (checkNow == true) myValid.validateSelectForElements(tag);
        tag.onchange = function () { myValid.validateSelectForElements(tag); };
    };

    // select control according end of clientID (generated by asp.net webforms) and control type
    this.pageIdAdapter = function (tagID, controlType) {
        var inputs = document.getElementsByTagName(controlType);
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.id.search(tagID) >= 0) return input;
        }
        return null;
    }

    // validate if current select has not default (first) value - assign element id
    this.validateSelect = function (ServerTagID) {
        var select = myValid.pageIdAdapter(ServerTagID, 'select');
        return myValid.validateSelectForElements(select);
    }

    // validate if current select has not default (first) value - assign element (tag)
    this.validateSelectForElements = function (DOMelement) {
        if (!DOMelement) return false;
        var bNotDefault = DOMelement.selectedIndex > 0;
        myValid.setStateImages(bNotDefault, DOMelement);
        return bNotDefault;
    }

    // calls validateSelect with all items of assigned array 
    this.validateSelectArray = function (serTagsArr) {
        if (!serTagsArr || serTagsArr.length < 0) return false;
        var bRet = true;

        for (var i = 0; i < serTagsArr.length; i++) {
            bRet = bRet && myValid.validateSelect(serTagsArr[i]);
        }
        return bRet;
    }

    // adds img tag with bellongs icon path to html item
    this.setStateImages = function (ok, validatedTag) {
        var imgID = validatedTag.id + '_img';
        var imgCheckIcon = myValid.pageIdAdapter(imgID, 'img');
        if (!imgCheckIcon) {
            var imgCheckIcon = document.createElement('img');
            imgCheckIcon.id = imgID;
            imgCheckIcon.style.display = "inline";
            validatedTag.parentNode.appendChild(imgCheckIcon);
        }

        if (ok == true) {
            if (imgCheckIcon.src != null && imgCheckIcon.src != undefined) imgCheckIcon.src = this.imgPath + this.okFileName;
            if (imgCheckIcon.alt != null && imgCheckIcon.alt != undefined) imgCheckIcon.alt = this.okAlternativeText;
            if (imgCheckIcon.isOk != null && imgCheckIcon.isOk != undefined) imgCheckIcon.isOk = "1";
        }
        else {
            if (imgCheckIcon.src != null && imgCheckIcon.src != undefined) imgCheckIcon.src = this.imgPath + this.errorFileName;
            if (imgCheckIcon.alt != null && imgCheckIcon.alt != undefined) imgCheckIcon.alt = this.errorAlternativeText;
            if (imgCheckIcon.isOk != null && imgCheckIcon.isOk != undefined) imgCheckIcon.isOk = "0";
        }
    }

    // validate control value with assigned regular expression
    this.validateRegEx = function (tagId, controlType, reExp) {
        var tb = myValid.pageIdAdapter(tagId, controlType);
        if (tb == null) return false;
        var modif = reExp.test(tb.value);
        if (typeof AfterValidAction == 'function') {
            AfterValidAction(modif);
        }
        return modif;
    }

    // validate corporate ID (IČ)
    this.validateIC = function (tbVal) {
        var modif = myValid.IC.test(tbVal);

        //zvazeni kodu
        var result = new Number(0);
        for (var i = 0; i < tbVal.length - 1; i++) {
            var sub = new Number(tbVal.substr(i, 1));
            result = result + ((tbVal.length - i) * sub);
        }

        //modulo 11
        var zbytek = result % 11;
        var c8 = new Number(tbVal.substr(7, 1));
        if ((zbytek == 0 || zbytek == 10) && c8 == 1) modif = true;
        else if (zbytek == 1 && c8 == 0) modif = true;
        else if (c8 == 11 - zbytek) modif = true;
        else modif = false;

        return modif;
    }

    // validate rodné číslo
    this.validateRC = function (text) {
        var isOk = false;
        if (text == null || text.match(/.+/g) == null) return false;
        var sRc = text.toString().replace('/', '');
        if (sRc.match(/^00.+$|^\d{2}00.+$/) != null) return true;

        if (text.match(/^\d{6}[^0-9]?\d{3,4}$/) == null) return false
        if (sRc.match(/^\d{9}$/) != null) {
            var rok = new Number(sRc.substr(0, 2));
            if (rok > 53) return false;
        }
        else if (sRc.match(/^\d{10}$/) != null) {
            var ctrlNum = new Number(sRc.substr(9, 1));
            var mod = new Number(sRc.substr(0, 9)) % 11;
            if (mod != ctrlNum || (mod == 10 && ctrlNum == 0)) return false;
        }
        else return false;
        return true;
    }

    // automatic trimming in textbox (input type="text")
    this.autoTrim = function (tagName) {
        var tbEmail = myValid.pageIdAdapter(tagName, "input");
        if (tbEmail == null || tbEmail == undefined || tbEmail.value == null) return;
        tbEmail.value = tbEmail.value.replace(/\s*/g, "");
    }

    // get selected item of combo box (select)
    this.getSelectValue = function (selectElement) {
        for (var i = 0; i < selectElement.childNodes.length; i++) {
            var chld = selectElement.childNodes[i];
            if (chld.selected == true) return chld;
        }
        return null;
    }

    // special deserialize method for best browser ever!!!
    this.parseIe6 = function (myJson, selService) {
        var replRex = /(\"\w+\":\")|\"/g;
        var jsonArr = myJson.match(/\"Key\":\"[\w\[\]\sáéíóäëiöúàèììù\-\/\\]+\",\"Value\":\"[\w\[\]\sáéíóäëiöúàèììù\-\/\\]+\"/g);
        if (!jsonArr || jsonArr.length < 1) return null;

        for (var i = 0; i < jsonArr.length; i++) {
            var optSrc = jsonArr[i];
            if (!optSrc) continue;
            var myKeyVal = optSrc.split(',');

            if (!myKeyVal || myKeyVal.length != 2) continue;
            var newOpt = document.createElement('option');
            newOpt.innerHTML = myKeyVal[0].replace(replRex, '');
            newOpt.setAttribute('value', myKeyVal[1].replace(replRex, ''));
            selService.appendChild(newOpt);
        }
    }

    // common method - save cookie from inputs and selects
    this.setCookie = function (name, type) {
        var element = myValid.pageIdAdapter(name, type);
        if (element) $.cookie(element.id, element.value, { expires: 744, path: document.URL });
    }

    // common method - load cookie to inputs and selects
    this.loadCookie = function (name, type) {
        var sel = myValid.pageIdAdapter(name, type);
        if (sel) {
            var cookVal = $.cookie(sel.id);
            sel.value = !cookVal || cookVal == 'null' ? '' : cookVal;
            if (type == 'input') sel.onkeyup = function () { setCookies(); };
            else if (type == 'select') sel.onchange = function () { setCookies(); };
        }
    }
}


var myValid = new hadValid();;

/* /jssettings_6.12.0.30359.10/default.js */
if(typeof(window.Settings) == 'undefined') window.Settings = {};
if(typeof(window.Settings.GoogleAnalytics) == 'undefined') window.Settings.GoogleAnalytics = {};
window.Settings.GoogleAnalytics.SiteIdentifier = 'UA-18560519-1';
if(typeof(window.Settings.Video) == 'undefined') window.Settings.Video = {};
window.Settings.Video.MediaPlayerURL = '/flash{0}/MediaPlayer.swfx';
if(typeof(window.Settings.Article) == 'undefined') window.Settings.Article = {};
window.Settings.Article.Initial = false;
if(typeof(window.Settings.Video) == 'undefined') window.Settings.Video = {};
window.Settings.Video.FlashPlayerBranding = 'VOA';
;

/* /js_6.12.0.30359.10/jquery/jquery.cookie.js */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};;

/* /js_6.12.0.30359.10/jquery/jquery.ui.slider-and-progressbar.js */
/* jQuery UI - v1.9.2 - 2013-01-16
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js
* Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */
(function(b,f){var a=0,e=/^ui-id-\d+$/;b.ui=b.ui||{};if(b.ui.version){return}b.extend(b.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});b.fn.extend({_focus:b.fn.focus,focus:function(g,h){return typeof g==="number"?this.each(function(){var i=this;setTimeout(function(){b(i).focus();if(h){h.call(i)}},g)}):this._focus.apply(this,arguments)},scrollParent:function(){var g;if((b.ui.ie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){g=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(b.css(this,"position"))&&(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}else{g=this.parents().filter(function(){return(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}return(/fixed/).test(this.css("position"))||!g.length?b(document):g},zIndex:function(j){if(j!==f){return this.css("zIndex",j)}if(this.length){var h=b(this[0]),g,i;while(h.length&&h[0]!==document){g=h.css("position");if(g==="absolute"||g==="relative"||g==="fixed"){i=parseInt(h.css("zIndex"),10);if(!isNaN(i)&&i!==0){return i}}h=h.parent()}}return 0},uniqueId:function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++a)}})},removeUniqueId:function(){return this.each(function(){if(e.test(this.id)){b(this).removeAttr("id")}})}});function d(i,g){var k,j,h,l=i.nodeName.toLowerCase();if("area"===l){k=i.parentNode;j=k.name;if(!i.href||!j||k.nodeName.toLowerCase()!=="map"){return false}h=b("img[usemap=#"+j+"]")[0];return !!h&&c(h)}return(/input|select|textarea|button|object/.test(l)?!i.disabled:"a"===l?i.href||g:g)&&c(i)}function c(g){return b.expr.filters.visible(g)&&!b(g).parents().andSelf().filter(function(){return b.css(this,"visibility")==="hidden"}).length}b.extend(b.expr[":"],{data:b.expr.createPseudo?b.expr.createPseudo(function(g){return function(h){return !!b.data(h,g)}}):function(j,h,g){return !!b.data(j,g[3])},focusable:function(g){return d(g,!isNaN(b.attr(g,"tabindex")))},tabbable:function(i){var g=b.attr(i,"tabindex"),h=isNaN(g);return(h||g>=0)&&d(i,!h)}});b(function(){var g=document.body,h=g.appendChild(h=document.createElement("div"));h.offsetHeight;b.extend(h.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});b.support.minHeight=h.offsetHeight===100;b.support.selectstart="onselectstart" in h;g.removeChild(h).style.display="none"});if(!b("<a>").outerWidth(1).jquery){b.each(["Width","Height"],function(j,g){var h=g==="Width"?["Left","Right"]:["Top","Bottom"],k=g.toLowerCase(),m={innerWidth:b.fn.innerWidth,innerHeight:b.fn.innerHeight,outerWidth:b.fn.outerWidth,outerHeight:b.fn.outerHeight};function l(o,n,i,p){b.each(h,function(){n-=parseFloat(b.css(o,"padding"+this))||0;if(i){n-=parseFloat(b.css(o,"border"+this+"Width"))||0}if(p){n-=parseFloat(b.css(o,"margin"+this))||0}});return n}b.fn["inner"+g]=function(i){if(i===f){return m["inner"+g].call(this)}return this.each(function(){b(this).css(k,l(this,i)+"px")})};b.fn["outer"+g]=function(i,n){if(typeof i!=="number"){return m["outer"+g].call(this,i)}return this.each(function(){b(this).css(k,l(this,i,true,n)+"px")})}})}if(b("<a>").data("a-b","a").removeData("a-b").data("a-b")){b.fn.removeData=(function(g){return function(h){if(arguments.length){return g.call(this,b.camelCase(h))}else{return g.call(this)}}})(b.fn.removeData)}(function(){var g=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];b.ui.ie=g.length?true:false;b.ui.ie6=parseFloat(g[1],10)===6})();b.fn.extend({disableSelection:function(){return this.bind((b.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(g){g.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});b.extend(b.ui,{plugin:{add:function(h,j,l){var g,k=b.ui[h].prototype;for(g in l){k.plugins[g]=k.plugins[g]||[];k.plugins[g].push([j,l[g]])}},call:function(g,j,h){var k,l=g.plugins[j];if(!l||!g.element[0].parentNode||g.element[0].parentNode.nodeType===11){return}for(k=0;k<l.length;k++){if(g.options[l[k][0]]){l[k][1].apply(g.element,h)}}}},contains:b.contains,hasScroll:function(j,h){if(b(j).css("overflow")==="hidden"){return false}var g=(h&&h==="left")?"scrollLeft":"scrollTop",i=false;if(j[g]>0){return true}j[g]=1;i=(j[g]>0);j[g]=0;return i},isOverAxis:function(h,g,i){return(h>g)&&(h<(g+i))},isOver:function(l,h,k,j,g,i){return b.ui.isOverAxis(l,k,g)&&b.ui.isOverAxis(h,j,i)}})})(jQuery);(function(b,e){var a=0,d=Array.prototype.slice,c=b.cleanData;b.cleanData=function(f){for(var g=0,h;(h=f[g])!=null;g++){try{b(h).triggerHandler("remove")}catch(j){}}c(f)};b.widget=function(g,j,f){var m,l,i,k,h=g.split(".")[0];g=g.split(".")[1];m=h+"-"+g;if(!f){f=j;j=b.Widget}b.expr[":"][m.toLowerCase()]=function(n){return !!b.data(n,m)};b[h]=b[h]||{};l=b[h][g];i=b[h][g]=function(n,o){if(!this._createWidget){return new i(n,o)}if(arguments.length){this._createWidget(n,o)}};b.extend(i,l,{version:f.version,_proto:b.extend({},f),_childConstructors:[]});k=new j();k.options=b.widget.extend({},k.options);b.each(f,function(o,n){if(b.isFunction(n)){f[o]=(function(){var p=function(){return j.prototype[o].apply(this,arguments)},q=function(r){return j.prototype[o].apply(this,r)};return function(){var t=this._super,r=this._superApply,s;this._super=p;this._superApply=q;s=n.apply(this,arguments);this._super=t;this._superApply=r;return s}})()}});i.prototype=b.widget.extend(k,{widgetEventPrefix:l?k.widgetEventPrefix:g},f,{constructor:i,namespace:h,widgetName:g,widgetBaseClass:m,widgetFullName:m});if(l){b.each(l._childConstructors,function(o,p){var n=p.prototype;b.widget(n.namespace+"."+n.widgetName,i,p._proto)});delete l._childConstructors}else{j._childConstructors.push(i)}b.widget.bridge(g,i)};b.widget.extend=function(k){var g=d.call(arguments,1),j=0,f=g.length,h,i;for(;j<f;j++){for(h in g[j]){i=g[j][h];if(g[j].hasOwnProperty(h)&&i!==e){if(b.isPlainObject(i)){k[h]=b.isPlainObject(k[h])?b.widget.extend({},k[h],i):b.widget.extend({},i)}else{k[h]=i}}}}return k};b.widget.bridge=function(g,f){var h=f.prototype.widgetFullName||g;b.fn[g]=function(k){var i=typeof k==="string",j=d.call(arguments,1),l=this;k=!i&&j.length?b.widget.extend.apply(null,[k].concat(j)):k;if(i){this.each(function(){var n,m=b.data(this,h);if(!m){return b.error("cannot call methods on "+g+" prior to initialization; attempted to call method '"+k+"'")}if(!b.isFunction(m[k])||k.charAt(0)==="_"){return b.error("no such method '"+k+"' for "+g+" widget instance")}n=m[k].apply(m,j);if(n!==m&&n!==e){l=n&&n.jquery?l.pushStack(n.get()):n;return false}})}else{this.each(function(){var m=b.data(this,h);if(m){m.option(k||{})._init()}else{b.data(this,h,new f(k,this))}})}return l}};b.Widget=function(){};b.Widget._childConstructors=[];b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(f,g){g=b(g||this.defaultElement||this)[0];this.element=b(g);this.uuid=a++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=b.widget.extend({},this.options,this._getCreateOptions(),f);this.bindings=b();this.hoverable=b();this.focusable=b();if(g!==this){b.data(g,this.widgetName,this);b.data(g,this.widgetFullName,this);this._on(true,this.element,{remove:function(h){if(h.target===g){this.destroy()}}});this.document=b(g.style?g.ownerDocument:g.document||g);this.window=b(this.document[0].defaultView||this.document[0].parentWindow)}this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:b.noop,_getCreateEventData:b.noop,_create:b.noop,_init:b.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},_destroy:b.noop,widget:function(){return this.element},option:function(j,k){var f=j,l,h,g;if(arguments.length===0){return b.widget.extend({},this.options)}if(typeof j==="string"){f={};l=j.split(".");j=l.shift();if(l.length){h=f[j]=b.widget.extend({},this.options[j]);for(g=0;g<l.length-1;g++){h[l[g]]=h[l[g]]||{};h=h[l[g]]}j=l.pop();if(k===e){return h[j]===e?null:h[j]}h[j]=k}else{if(k===e){return this.options[j]===e?null:this.options[j]}f[j]=k}}this._setOptions(f);return this},_setOptions:function(f){var g;for(g in f){this._setOption(g,f[g])}return this},_setOption:function(f,g){this.options[f]=g;if(f==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!g).attr("aria-disabled",g);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_on:function(i,h,g){var j,f=this;if(typeof i!=="boolean"){g=h;h=i;i=false}if(!g){g=h;h=this.element;j=this.widget()}else{h=j=b(h);this.bindings=this.bindings.add(h)}b.each(g,function(p,o){function m(){if(!i&&(f.options.disabled===true||b(this).hasClass("ui-state-disabled"))){return}return(typeof o==="string"?f[o]:o).apply(f,arguments)}if(typeof o!=="string"){m.guid=o.guid=o.guid||m.guid||b.guid++}var n=p.match(/^(\w+)\s*(.*)$/),l=n[1]+f.eventNamespace,k=n[2];if(k){j.delegate(k,l,m)}else{h.bind(l,m)}})},_off:function(g,f){f=(f||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;g.unbind(f).undelegate(f)},_delay:function(i,h){function g(){return(typeof i==="string"?f[i]:i).apply(f,arguments)}var f=this;return setTimeout(g,h||0)},_hoverable:function(f){this.hoverable=this.hoverable.add(f);this._on(f,{mouseenter:function(g){b(g.currentTarget).addClass("ui-state-hover")},mouseleave:function(g){b(g.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(f){this.focusable=this.focusable.add(f);this._on(f,{focusin:function(g){b(g.currentTarget).addClass("ui-state-focus")},focusout:function(g){b(g.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(f,g,h){var k,j,i=this.options[f];h=h||{};g=b.Event(g);g.type=(f===this.widgetEventPrefix?f:this.widgetEventPrefix+f).toLowerCase();g.target=this.element[0];j=g.originalEvent;if(j){for(k in j){if(!(k in g)){g[k]=j[k]}}}this.element.trigger(g,h);return !(b.isFunction(i)&&i.apply(this.element[0],[g].concat(h))===false||g.isDefaultPrevented())}};b.each({show:"fadeIn",hide:"fadeOut"},function(g,f){b.Widget.prototype["_"+g]=function(j,i,l){if(typeof i==="string"){i={effect:i}}var k,h=!i?g:i===true||typeof i==="number"?f:i.effect||f;i=i||{};if(typeof i==="number"){i={duration:i}}k=!b.isEmptyObject(i);i.complete=l;if(i.delay){j.delay(i.delay)}if(k&&b.effects&&(b.effects.effect[h]||b.uiBackCompat!==false&&b.effects[h])){j[g](i)}else{if(h!==g&&j[h]){j[h](i.duration,i.easing,l)}else{j.queue(function(m){b(this)[g]();if(l){l.call(j[0])}m()})}}}});if(b.uiBackCompat!==false){b.Widget.prototype._getCreateOptions=function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]}}})(jQuery);(function(b,c){var a=false;b(document).mouseup(function(d){a=false});b.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var d=this;this.element.bind("mousedown."+this.widgetName,function(e){return d._mouseDown(e)}).bind("click."+this.widgetName,function(e){if(true===b.data(e.target,d.widgetName+".preventClickEvent")){b.removeData(e.target,d.widgetName+".preventClickEvent");e.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);if(this._mouseMoveDelegate){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)}},_mouseDown:function(f){if(a){return}(this._mouseStarted&&this._mouseUp(f));this._mouseDownEvent=f;var e=this,g=(f.which===1),d=(typeof this.options.cancel==="string"&&f.target.nodeName?b(f.target).closest(this.options.cancel).length:false);if(!g||d||!this._mouseCapture(f)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){e.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(f)&&this._mouseDelayMet(f)){this._mouseStarted=(this._mouseStart(f)!==false);if(!this._mouseStarted){f.preventDefault();return true}}if(true===b.data(f.target,this.widgetName+".preventClickEvent")){b.removeData(f.target,this.widgetName+".preventClickEvent")}this._mouseMoveDelegate=function(h){return e._mouseMove(h)};this._mouseUpDelegate=function(h){return e._mouseUp(h)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);f.preventDefault();a=true;return true},_mouseMove:function(d){if(b.ui.ie&&!(document.documentMode>=9)&&!d.button){return this._mouseUp(d)}if(this._mouseStarted){this._mouseDrag(d);return d.preventDefault()}if(this._mouseDistanceMet(d)&&this._mouseDelayMet(d)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,d)!==false);(this._mouseStarted?this._mouseDrag(d):this._mouseUp(d))}return !this._mouseStarted},_mouseUp:function(d){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;if(d.target===this._mouseDownEvent.target){b.data(d.target,this.widgetName+".preventClickEvent",true)}this._mouseStop(d)}return false},_mouseDistanceMet:function(d){return(Math.max(Math.abs(this._mouseDownEvent.pageX-d.pageX),Math.abs(this._mouseDownEvent.pageY-d.pageY))>=this.options.distance)},_mouseDelayMet:function(d){return this.mouseDelayMet},_mouseStart:function(d){},_mouseDrag:function(d){},_mouseStop:function(d){},_mouseCapture:function(d){return true}})})(jQuery);(function(e,c){e.ui=e.ui||{};var i,j=Math.max,n=Math.abs,l=Math.round,d=/left|center|right/,g=/top|center|bottom/,a=/[\+\-]\d+%?/,k=/^\w+/,b=/%$/,f=e.fn.position;function m(q,p,o){return[parseInt(q[0],10)*(b.test(q[0])?p/100:1),parseInt(q[1],10)*(b.test(q[1])?o/100:1)]}function h(o,p){return parseInt(e.css(o,p),10)||0}e.position={scrollbarWidth:function(){if(i!==c){return i}var p,o,r=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),q=r.children()[0];e("body").append(r);p=q.offsetWidth;r.css("overflow","scroll");o=q.offsetWidth;if(p===o){o=r[0].clientWidth}r.remove();return(i=p-o)},getScrollInfo:function(s){var r=s.isWindow?"":s.element.css("overflow-x"),q=s.isWindow?"":s.element.css("overflow-y"),p=r==="scroll"||(r==="auto"&&s.width<s.element[0].scrollWidth),o=q==="scroll"||(q==="auto"&&s.height<s.element[0].scrollHeight);return{width:p?e.position.scrollbarWidth():0,height:o?e.position.scrollbarWidth():0}},getWithinInfo:function(p){var q=e(p||window),o=e.isWindow(q[0]);return{element:q,isWindow:o,offset:q.offset()||{left:0,top:0},scrollLeft:q.scrollLeft(),scrollTop:q.scrollTop(),width:o?q.width():q.outerWidth(),height:o?q.height():q.outerHeight()}}};e.fn.position=function(y){if(!y||!y.of){return f.apply(this,arguments)}y=e.extend({},y);var z,v,s,x,r,u=e(y.of),q=e.position.getWithinInfo(y.within),o=e.position.getScrollInfo(q),t=u[0],w=(y.collision||"flip").split(" "),p={};if(t.nodeType===9){v=u.width();s=u.height();x={top:0,left:0}}else{if(e.isWindow(t)){v=u.width();s=u.height();x={top:u.scrollTop(),left:u.scrollLeft()}}else{if(t.preventDefault){y.at="left top";v=s=0;x={top:t.pageY,left:t.pageX}}else{v=u.outerWidth();s=u.outerHeight();x=u.offset()}}}r=e.extend({},x);e.each(["my","at"],function(){var C=(y[this]||"").split(" "),B,A;if(C.length===1){C=d.test(C[0])?C.concat(["center"]):g.test(C[0])?["center"].concat(C):["center","center"]}C[0]=d.test(C[0])?C[0]:"center";C[1]=g.test(C[1])?C[1]:"center";B=a.exec(C[0]);A=a.exec(C[1]);p[this]=[B?B[0]:0,A?A[0]:0];y[this]=[k.exec(C[0])[0],k.exec(C[1])[0]]});if(w.length===1){w[1]=w[0]}if(y.at[0]==="right"){r.left+=v}else{if(y.at[0]==="center"){r.left+=v/2}}if(y.at[1]==="bottom"){r.top+=s}else{if(y.at[1]==="center"){r.top+=s/2}}z=m(p.at,v,s);r.left+=z[0];r.top+=z[1];return this.each(function(){var B,K,D=e(this),F=D.outerWidth(),C=D.outerHeight(),E=h(this,"marginLeft"),A=h(this,"marginTop"),J=F+E+h(this,"marginRight")+o.width,I=C+A+h(this,"marginBottom")+o.height,G=e.extend({},r),H=m(p.my,D.outerWidth(),D.outerHeight());if(y.my[0]==="right"){G.left-=F}else{if(y.my[0]==="center"){G.left-=F/2}}if(y.my[1]==="bottom"){G.top-=C}else{if(y.my[1]==="center"){G.top-=C/2}}G.left+=H[0];G.top+=H[1];if(!e.support.offsetFractions){G.left=l(G.left);G.top=l(G.top)}B={marginLeft:E,marginTop:A};e.each(["left","top"],function(M,L){if(e.ui.position[w[M]]){e.ui.position[w[M]][L](G,{targetWidth:v,targetHeight:s,elemWidth:F,elemHeight:C,collisionPosition:B,collisionWidth:J,collisionHeight:I,offset:[z[0]+H[0],z[1]+H[1]],my:y.my,at:y.at,within:q,elem:D})}});if(e.fn.bgiframe){D.bgiframe()}if(y.using){K=function(O){var Q=x.left-G.left,N=Q+v-F,P=x.top-G.top,M=P+s-C,L={target:{element:u,left:x.left,top:x.top,width:v,height:s},element:{element:D,left:G.left,top:G.top,width:F,height:C},horizontal:N<0?"left":Q>0?"right":"center",vertical:M<0?"top":P>0?"bottom":"middle"};if(v<F&&n(Q+N)<v){L.horizontal="center"}if(s<C&&n(P+M)<s){L.vertical="middle"}if(j(n(Q),n(N))>j(n(P),n(M))){L.important="horizontal"}else{L.important="vertical"}y.using.call(this,O,L)}}D.offset(e.extend(G,{using:K}))})};e.ui.position={fit:{left:function(s,r){var q=r.within,u=q.isWindow?q.scrollLeft:q.offset.left,w=q.width,t=s.left-r.collisionPosition.marginLeft,v=u-t,p=t+r.collisionWidth-w-u,o;if(r.collisionWidth>w){if(v>0&&p<=0){o=s.left+v+r.collisionWidth-w-u;s.left+=v-o}else{if(p>0&&v<=0){s.left=u}else{if(v>p){s.left=u+w-r.collisionWidth}else{s.left=u}}}}else{if(v>0){s.left+=v}else{if(p>0){s.left-=p}else{s.left=j(s.left-t,s.left)}}}},top:function(r,q){var p=q.within,v=p.isWindow?p.scrollTop:p.offset.top,w=q.within.height,t=r.top-q.collisionPosition.marginTop,u=v-t,s=t+q.collisionHeight-w-v,o;if(q.collisionHeight>w){if(u>0&&s<=0){o=r.top+u+q.collisionHeight-w-v;r.top+=u-o}else{if(s>0&&u<=0){r.top=v}else{if(u>s){r.top=v+w-q.collisionHeight}else{r.top=v}}}}else{if(u>0){r.top+=u}else{if(s>0){r.top-=s}else{r.top=j(r.top-t,r.top)}}}}},flip:{left:function(u,t){var s=t.within,y=s.offset.left+s.scrollLeft,B=s.width,q=s.isWindow?s.scrollLeft:s.offset.left,v=u.left-t.collisionPosition.marginLeft,z=v-q,p=v+t.collisionWidth-B-q,x=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,A=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,r=-2*t.offset[0],o,w;if(z<0){o=u.left+x+A+r+t.collisionWidth-B-y;if(o<0||o<n(z)){u.left+=x+A+r}}else{if(p>0){w=u.left-t.collisionPosition.marginLeft+x+A+r-q;if(w>0||n(w)<p){u.left+=x+A+r}}}},top:function(t,s){var r=s.within,A=r.offset.top+r.scrollTop,B=r.height,o=r.isWindow?r.scrollTop:r.offset.top,v=t.top-s.collisionPosition.marginTop,x=v-o,u=v+s.collisionHeight-B-o,y=s.my[1]==="top",w=y?-s.elemHeight:s.my[1]==="bottom"?s.elemHeight:0,C=s.at[1]==="top"?s.targetHeight:s.at[1]==="bottom"?-s.targetHeight:0,q=-2*s.offset[1],z,p;if(x<0){p=t.top+w+C+q+s.collisionHeight-B-A;if((t.top+w+C+q)>x&&(p<0||p<n(x))){t.top+=w+C+q}}else{if(u>0){z=t.top-s.collisionPosition.marginTop+w+C+q-o;if((t.top+w+C+q)>u&&(z>0||n(z)<u)){t.top+=w+C+q}}}}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments);e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments);e.ui.position.fit.top.apply(this,arguments)}}};(function(){var s,u,p,r,q,o=document.getElementsByTagName("body")[0],t=document.createElement("div");s=document.createElement(o?"div":"body");p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(o){e.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"})}for(q in p){s.style[q]=p[q]}s.appendChild(t);u=o||document.documentElement;u.insertBefore(s,u.firstChild);t.style.cssText="position: absolute; left: 10.7432222px;";r=e(t).offset().left;e.support.offsetFractions=r>10&&r<11;s.innerHTML="";u.removeChild(s)})();if(e.uiBackCompat!==false){(function(p){var o=p.fn.position;p.fn.position=function(r){if(!r||!r.offset){return o.call(this,r)}var s=r.offset.split(" "),q=r.at.split(" ");if(s.length===1){s[1]=s[0]}if(/^\d/.test(s[0])){s[0]="+"+s[0]}if(/^\d/.test(s[1])){s[1]="+"+s[1]}if(q.length===1){if(/left|center|right/.test(q[0])){q[1]="center"}else{q[1]=q[0];q[0]="center"}}return o.call(this,p.extend(r,{at:q[0]+s[0]+" "+q[1]+s[1],offset:c}))}}(jQuery))}}(jQuery));(function(a,b){a.widget("ui.progressbar",{version:"1.9.2",options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove()},value:function(c){if(c===b){return this._value()}this._setOption("value",c);return this},_setOption:function(c,d){if(c==="value"){this.options.value=d;this._refreshValue();if(this._value()===this.options.max){this._trigger("complete")}}this._super(c,d)},_value:function(){var c=this.options.value;if(typeof c!=="number"){c=0}return Math.min(this.options.max,Math.max(this.min,c))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var d=this.value(),c=this._percentage();if(this.oldValue!==d){this.oldValue=d;this._trigger("change")}this.valueDiv.toggle(d>this.min).toggleClass("ui-corner-right",d===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",d)}})})(jQuery);(function(b,c){var a=5;b.widget("ui.slider",b.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var f,d,j=this.options,h=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),g="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",e=[];this._keySliding=false;this._mouseSliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(j.disabled?" ui-slider-disabled ui-disabled":""));this.range=b([]);if(j.range){if(j.range===true){if(!j.values){j.values=[this._valueMin(),this._valueMin()]}if(j.values.length&&j.values.length!==2){j.values=[j.values[0],j.values[0]]}}this.range=b("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+((j.range==="min"||j.range==="max")?" ui-slider-range-"+j.range:""))}d=(j.values&&j.values.length)||1;for(f=h.length;f<d;f++){e.push(g)}this.handles=h.add(b(e.join("")).appendTo(this.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(i){i.preventDefault()}).mouseenter(function(){if(!j.disabled){b(this).addClass("ui-state-hover")}}).mouseleave(function(){b(this).removeClass("ui-state-hover")}).focus(function(){if(!j.disabled){b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");b(this).addClass("ui-state-focus")}else{b(this).blur()}}).blur(function(){b(this).removeClass("ui-state-focus")});this.handles.each(function(k){b(this).data("ui-slider-handle-index",k)});this._on(this.handles,{keydown:function(n){var o,l,k,m,i=b(n.target).data("ui-slider-handle-index");switch(n.keyCode){case b.ui.keyCode.HOME:case b.ui.keyCode.END:case b.ui.keyCode.PAGE_UP:case b.ui.keyCode.PAGE_DOWN:case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:n.preventDefault();if(!this._keySliding){this._keySliding=true;b(n.target).addClass("ui-state-active");o=this._start(n,i);if(o===false){return}}break}m=this.options.step;if(this.options.values&&this.options.values.length){l=k=this.values(i)}else{l=k=this.value()}switch(n.keyCode){case b.ui.keyCode.HOME:k=this._valueMin();break;case b.ui.keyCode.END:k=this._valueMax();break;case b.ui.keyCode.PAGE_UP:k=this._trimAlignValue(l+((this._valueMax()-this._valueMin())/a));break;case b.ui.keyCode.PAGE_DOWN:k=this._trimAlignValue(l-((this._valueMax()-this._valueMin())/a));break;case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:if(l===this._valueMax()){return}k=this._trimAlignValue(l+m);break;case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:if(l===this._valueMin()){return}k=this._trimAlignValue(l-m);break}this._slide(n,i,k)},keyup:function(k){var i=b(k.target).data("ui-slider-handle-index");if(this._keySliding){this._keySliding=false;this._stop(k,i);this._change(k,i);b(k.target).removeClass("ui-state-active")}}});this._refreshValue();this._animateOff=false},_destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all");this._mouseDestroy()},_mouseCapture:function(f){var j,m,e,h,l,n,i,d,k=this,g=this.options;if(g.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();j={x:f.pageX,y:f.pageY};m=this._normValueFromMouse(j);e=this._valueMax()-this._valueMin()+1;this.handles.each(function(o){var p=Math.abs(m-k.values(o));if(e>p){e=p;h=b(this);l=o}});if(g.range===true&&this.values(1)===g.min){l+=1;h=b(this.handles[l])}n=this._start(f,l);if(n===false){return false}this._mouseSliding=true;this._handleIndex=l;h.addClass("ui-state-active").focus();i=h.offset();d=!b(f.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=d?{left:0,top:0}:{left:f.pageX-i.left-(h.width()/2),top:f.pageY-i.top-(h.height()/2)-(parseInt(h.css("borderTopWidth"),10)||0)-(parseInt(h.css("borderBottomWidth"),10)||0)+(parseInt(h.css("marginTop"),10)||0)};if(!this.handles.hasClass("ui-state-hover")){this._slide(f,l,m)}this._animateOff=true;return true},_mouseStart:function(){return true},_mouseDrag:function(f){var d={x:f.pageX,y:f.pageY},e=this._normValueFromMouse(d);this._slide(f,this._handleIndex,e);return false},_mouseStop:function(d){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(d,this._handleIndex);this._change(d,this._handleIndex);this._handleIndex=null;this._clickOffset=null;this._animateOff=false;return false},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"},_normValueFromMouse:function(e){var d,h,g,f,i;if(this.orientation==="horizontal"){d=this.elementSize.width;h=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{d=this.elementSize.height;h=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}g=(h/d);if(g>1){g=1}if(g<0){g=0}if(this.orientation==="vertical"){g=1-g}f=this._valueMax()-this._valueMin();i=this._valueMin()+g*f;return this._trimAlignValue(i)},_start:function(f,e){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}return this._trigger("start",f,d)},_slide:function(h,g,f){var d,e,i;if(this.options.values&&this.options.values.length){d=this.values(g?0:1);if((this.options.values.length===2&&this.options.range===true)&&((g===0&&f>d)||(g===1&&f<d))){f=d}if(f!==this.values(g)){e=this.values();e[g]=f;i=this._trigger("slide",h,{handle:this.handles[g],value:f,values:e});d=this.values(g?0:1);if(i!==false){this.values(g,f,true)}}}else{if(f!==this.value()){i=this._trigger("slide",h,{handle:this.handles[g],value:f});if(i!==false){this.value(f)}}}},_stop:function(f,e){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}this._trigger("stop",f,d)},_change:function(f,e){if(!this._keySliding&&!this._mouseSliding){var d={handle:this.handles[e],value:this.value()};if(this.options.values&&this.options.values.length){d.value=this.values(e);d.values=this.values()}this._trigger("change",f,d)}},value:function(d){if(arguments.length){this.options.value=this._trimAlignValue(d);this._refreshValue();this._change(null,0);return}return this._value()},values:function(e,h){var g,d,f;if(arguments.length>1){this.options.values[e]=this._trimAlignValue(h);this._refreshValue();this._change(null,e);return}if(arguments.length){if(b.isArray(arguments[0])){g=this.options.values;d=arguments[0];for(f=0;f<g.length;f+=1){g[f]=this._trimAlignValue(d[f]);this._change(null,f)}this._refreshValue()}else{if(this.options.values&&this.options.values.length){return this._values(e)}else{return this.value()}}}else{return this._values()}},_setOption:function(e,f){var d,g=0;if(b.isArray(this.options.values)){g=this.options.values.length}b.Widget.prototype._setOption.apply(this,arguments);switch(e){case"disabled":if(f){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.prop("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.prop("disabled",false);this.element.removeClass("ui-disabled")}break;case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case"value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case"values":this._animateOff=true;this._refreshValue();for(d=0;d<g;d+=1){this._change(null,d)}this._animateOff=false;break;case"min":case"max":this._animateOff=true;this._refreshValue();this._animateOff=false;break}},_value:function(){var d=this.options.value;d=this._trimAlignValue(d);return d},_values:function(d){var g,f,e;if(arguments.length){g=this.options.values[d];g=this._trimAlignValue(g);return g}else{f=this.options.values.slice();for(e=0;e<f.length;e+=1){f[e]=this._trimAlignValue(f[e])}return f}},_trimAlignValue:function(g){if(g<=this._valueMin()){return this._valueMin()}if(g>=this._valueMax()){return this._valueMax()}var d=(this.options.step>0)?this.options.step:1,f=(g-this._valueMin())%d,e=g-f;if(Math.abs(f)*2>=d){e+=(f>0)?d:(-d)}return parseFloat(e.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var i,h,l,j,m,g=this.options.range,f=this.options,k=this,e=(!this._animateOff)?f.animate:false,d={};if(this.options.values&&this.options.values.length){this.handles.each(function(n){h=(k.values(n)-k._valueMin())/(k._valueMax()-k._valueMin())*100;d[k.orientation==="horizontal"?"left":"bottom"]=h+"%";b(this).stop(1,1)[e?"animate":"css"](d,f.animate);if(k.options.range===true){if(k.orientation==="horizontal"){if(n===0){k.range.stop(1,1)[e?"animate":"css"]({left:h+"%"},f.animate)}if(n===1){k.range[e?"animate":"css"]({width:(h-i)+"%"},{queue:false,duration:f.animate})}}else{if(n===0){k.range.stop(1,1)[e?"animate":"css"]({bottom:(h)+"%"},f.animate)}if(n===1){k.range[e?"animate":"css"]({height:(h-i)+"%"},{queue:false,duration:f.animate})}}}i=h})}else{l=this.value();j=this._valueMin();m=this._valueMax();h=(m!==j)?(l-j)/(m-j)*100:0;d[this.orientation==="horizontal"?"left":"bottom"]=h+"%";this.handle.stop(1,1)[e?"animate":"css"](d,f.animate);if(g==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[e?"animate":"css"]({width:h+"%"},f.animate)}if(g==="max"&&this.orientation==="horizontal"){this.range[e?"animate":"css"]({width:(100-h)+"%"},{queue:false,duration:f.animate})}if(g==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[e?"animate":"css"]({height:h+"%"},f.animate)}if(g==="max"&&this.orientation==="vertical"){this.range[e?"animate":"css"]({height:(100-h)+"%"},{queue:false,duration:f.animate})}}}})}(jQuery));;