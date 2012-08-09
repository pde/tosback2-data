/* $Id: modernizr-2.0.6.js 1914 2012-03-30 17:26:26Z jowilso $ */

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-iepp-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function F(){e.input=function(a){for(var b=0,c=a.length;b<c;b++)s[a[b]]=a[b]in l;return s}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)l.setAttribute("type",f=a[d]),e=l.type!=="text",e&&(l.value=m,l.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&l.style.WebkitAppearance!==c?(g.appendChild(l),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(l,null).WebkitAppearance!=="textfield"&&l.offsetHeight!==0,g.removeChild(l)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=l.checkValidity&&l.checkValidity()===!1:/^color$/.test(f)?(g.appendChild(l),g.offsetWidth,e=l.value!=m,g.removeChild(l)):e=l.value!=m)),r[a[d]]=!!e;return r}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function E(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return D(d,b)}function D(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function C(a,b){return!!~(""+a).indexOf(b)}function B(a,b){return typeof a===b}function A(a,b){return z(o.join(a+";")+(b||""))}function z(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={},r={},s={},t=[],u=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},v=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=B(e[d],"function"),B(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),w,x={}.hasOwnProperty,y;!B(x,c)&&!B(x.call,c)?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],c)},q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.canvastext=function(){return!!e.canvas&&!!B(b.createElement("canvas").getContext("2d").fillText,"function")},q.postmessage=function(){return!!a.postMessage},q.websqldatabase=function(){var b=!!a.openDatabase;return b},q.indexedDB=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b].toLowerCase()+"IndexedDB"])return!0;return!!a.indexedDB},q.hashchange=function(){return v("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},q.history=function(){return!!a.history&&!!history.pushState},q.draganddrop=function(){return v("dragstart")&&v("drop")},q.websockets=function(){for(var b=-1,c=p.length;++b<c;)if(a[p[b]+"WebSocket"])return!0;return"WebSocket"in a},q.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType){c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"');var d='video/mp4; codecs="avc1.42E01E';c.h264=a.canPlayType(d+'"')||a.canPlayType(d+', mp4a.40.2"'),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"')}}catch(e){}return c},q.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"'),c.mp3=a.canPlayType("audio/mpeg;"),c.wav=a.canPlayType('audio/wav; codecs="1"'),c.m4a=a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")}catch(d){}return c},q.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},q.sessionstorage=function(){try{return!!sessionStorage.getItem}catch(a){return!1}},q.webworkers=function(){return!!a.Worker},q.applicationcache=function(){return!!a.applicationCache};for(var G in q)y(q,G)&&(w=G.toLowerCase(),e[w]=q[G](),t.push((e[w]?"":"no-")+w));e.input||F(),z(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=o,e._domPrefixes=p,e.hasEvent=v,e.testProp=function(a){return D([a])},e.testAllProps=E,e.testStyles=u,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+t.join(" "):"");return e}(this,this.document),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/* $Id: rei.js 1914 2012-03-30 17:26:26Z jowilso $ */

// old deprecated code
function init() { }								
(function($){
/* rei namespace
 * setup, jmontgo Dec 2010
*/
if(window.rei) return;

var rei;
window.rei = rei = {
	error:[],
	analytics:[],
	re: { // RegExp cache
		cleanUrlChars: /[;'<>=()]/gm
	},
	perf: {start: window.perf_start || (new Date()).getTime(), ready: 0, load: 0},
	
	util: {
		randomID: function(size) {
			var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
			var str = '', i=0;
			while(i++<size){
				// get random character in range
				str += chars.substr( Math.floor(Math.random() * 62), 1 );
			}
			return str;
		},
		autocomplete: function(_src){
		// jmontgo 2011 Feb, jquery-ui autocomplete
			var leftSpace = /^\s+/, rightSpace = /\s+$/, manySpaces = /\s\s+/g;
			$("#headerQuery").autocomplete({
				appendTo: $("#autocomplete"),
				select: function(event, ui) { 
			        $("#headerQuery").val(ui.item.label);
			        $("#psearch").submit(); },
				source: function source(query,result) {
					// autocomplete terms are all lowercase
					var r = [], a = [], n, item, i=0,
						q = query.term.toLowerCase().replace(leftSpace, '').replace(rightSpace, '').replace(manySpaces, ' ');
					while(item=_src[i++]){
						n = item.indexOf(q);
						switch(n){
						case -1:
						break;
						// match starts with query (result desired)
						case 0: r.push(item);
						break;
						// match contains query (alternate match)
						default: a.push(item);
						};
					}
					// 10 is the maxlength
					result(r.concat(a).slice(0,10));
				}
			});
			$("#bottomSearchText").autocomplete({
				appendTo: $("#autocomplete"),
				select: function(event, ui) { 
			        $("#bottomSearchText").val(ui.item.label);
			        $("#psearch2").submit(); },
				source: function source(query,result) {
					// autocomplete terms are all lowercase
					var r = [], a = [], n, item, i=0,
						q = query.term.toLowerCase().replace(leftSpace, '').replace(rightSpace, '').replace(manySpaces, ' ');
					while(item=_src[i++]){
						n = item.indexOf(q);
						switch(n){
						case -1:
						break;
						// match starts with query (result desired)
						case 0: r.push(item);
						break;
						// match contains query (alternate match)
						default: a.push(item);
						};
					}
					// 10 is the maxlength
					result(r.concat(a).slice(0,10));
				}
			});
		},
		//bind a click event that will in turn add the addthis listner after the user mouseover of the share button
		//this is to make sure the addthis object exists before that listner is added
		bindaddthisonclick: function bindaddthisonclick(){
			//register an event for the addthis
			if (!rei.shareButtonPreviousClick) {
				// Listen for the share event
				addthis.addEventListener('addthis.menu.share', rei.util.shareEventHandler);
			}

			rei.shareButtonPreviousClick=true;
			
		},
		// throw event33 when the user shares somewhere, include product sku if available
		shareEventHandler: function shareEventHandler(e) { 
		    if (e.type == 'addthis.menu.share') { 
		    	if (rei.analytics.options.products==undefined) {
		    		rei.analytics.sendToFriend("");
		    	} else {
		    		rei.analytics.sendToFriend(rei.analytics.options.products);
		    	}
		    }
		},
		mboxSetup: function mboxSetup(){
			var div = document.createElement('div'), mbox = document.createElement('mbox'), isSetup = /\bmbox_setup\b/,
				gid = function gid(){ return _PREFIX.concat(_j++); },
				_PREFIX = 'mbox_'+(new Date()).getTime(), i=0, _j = 0, TYPE = /*@cc_on 'propertychange';@*/'DOMNodeInserted';

			$(document.getElementsByTagName('mbox')).each(function(){
				if(isSetup.test(this.className)) return;
				var $mb, mb = mbox.cloneNode(true), d = div.cloneNode(true),
					j=0, _a, attr = this.attributes, v,
					complete = false, k,
					evt, hdlr, handlers, events = $(this).data("events");
				$mb = $(mb)
				d.id = gid();
				v = [d.id,this.getAttribute('name')];
				mb.appendChild(d);
				while(_a=attr[j++]){
					if(_a.name.indexOf('jQuery') == 0) continue;
					mb.setAttribute(_a.name, _a.value);
					if(_a.name == 'mbox'){
						var ready = _a.value;
						$mb.bind('mbox',function(e){
							(new Function(ready)).call(this, e);
						});
					}
					// entity.someName="value" attributes are mbox options
					else if(_a.name.indexOf('entity.') == 0) v.push(_a.name+'='+_a.value);
				};
				mb.className += ' mbox_setup';
				for(evt in events){
					handlers = events[evt];
					k=0;
					while(hdlr=handlers[k++]){
						$mb.bind(evt, hdlr.handler);
					}
				};

				$(TYPE == 'propertychange'? d:mb).bind(TYPE, function(e){
					setTimeout(function(){
						// our div is replaced with a new element, so access it via firstChild
						if(complete || !mb.firstChild.childNodes.length) return;
						complete = true;
						$mb.trigger('mbox');
					}, 0);
				});
				this.parentNode.replaceChild(mb, this);
				// mboxDefine(dom_id, mbox_name, options...);
				mboxDefine.apply(window,v);
				// mboxUpdate(mbox_name, options...);
				mboxUpdate.apply(window,v.slice(1)); // without dom_id
			}); // each()
		} // mboxSetup()
	},
	ready: function(){
		rei.perf.ready = (new Date()).getTime();

		// storeId setup in unvHeader
		if(storeId == 8000 && storeClass.toLowerCase() == 'outlet'){ storeId = 8001; }
		if(document.getElementById('unvHeader')){ hdrObj.init(); }

		// overwrite any thickbox instances
		if(window.tb_bootstrap){
				tb_bootstrap = function(){};
				tb_bootstrap.override = true;
		};
	}, // ready()
	load: function(){
		var perf = rei.perf;
		perf.load = (new Date()).getTime();
		// rei.util.mboxSetup(); - removing until mboxUpdate issue resolved

	// init site-search autocomplete
	var js = document.createElement('script');
	js.type = 'text/javascript', js.async = true, js.src = (location.protocol == "https:" ? "https:" : "http:").concat(
		"//content.atomz.com/autocomplete/sp10/04/6f/84", ((document.getElementById("sp_staged") && document.getElementById("sp_staged").value) ? "-stage/" : "/"),
		'?callback=rei.util.autocomplete'
	);
	document.body.appendChild(js);

	setTimeout(function(){
	// priority items

		// was findAStore.js
		// TODO find and test this zip feature
		function checkZip(){
			var zipCodeWithZero = $(document.getElementById('findAStoreZip')).val();
			var zip = parseInt($(document.getElementById('findAStoreZip')).val()||'',10);
			if (isNaN(zip) || (zip < 1)) { alert("Please enter a valid ZIP code."); return false; };
			for(var i=0;i<zipCodeWithZero.length;i++){
				if(zipCodeWithZero.substring(i,i+1)=="0"){
				zip="0"+zip;
				}else{
				break;
				 }
				}
			window.location = "/map/store#"+zip;
		};
		$(document.getElementById('findAStoreZip')).focus(function(){ $(this).val(""); }).keydown(function(event){
			if (event.keyCode == "13") checkZip();
		})
		$(document.getElementById('findAStoreClick')).click(checkZip);

		// drowDown init
		var hunt3 = $(document.getElementById('hunt3'));
		hunt3.superfish({
			animation : { opacity:"show",height:"show" }
		});
		if ($.browser.msie) {
			var li_with = hunt3.children("li:has(ul)");
			li_with.mouseover(function(){
					$("ul", this).bgIframe({opacity:false});
			}).find("a").focus(function(){
				li_with.find("ul").bgIframe({opacity:false});
			});
		}
		// dropDown()

		//from mbox.js
		$('.recommendations6').jcarousel({scroll: 6});
		$('.recommendations5').jcarousel({ scroll: 5 });
		$('.recommendations4').jcarousel({ scroll: 4 });
		$(document.getElementById('recommendationsVertical')).jcarousel({ vertical: true });

		// setup (replace) thickbox with fancybox
		if(!window.tb_bootstrap || (window.tb_bootstrap && tb_bootstrap.override)){
		TB_remove = $.fancybox.close;
		var url, w, h, wRE = /width=([0-9]+)/, hRE = /height=([0-9]+)/, cRE = /(inlineId=)((?:[a-z][a-z0-9_]*))/i, l, item, items = document.querySelectorAll ? document.querySelectorAll('.thickbox'):$('.thickbox'), fbOptions = {};
		l=items.length;
		while(l&&(item=items[--l])){
			url = item.href || item.alt;
			w = url.match(wRE),
			h = url.match(hRE);						
			w = (w && w.length > 0) ? (w[1]*1):1,
				h = (h && h.length > 0) ? (h[1]*1):1;
			w = w < 560 ? 560:w,
				h = h < 340 ? 340:h;
			//check if thickbox content is inline 
			if(url.indexOf('#TB_inline') >= 0){
				var contentId = url.match(cRE);
				contentId = (contentId && contentId.length > 0) ? contentId[2] : null;
				fbOptions = (contentId !== null && document.getElementById(contentId) !== null ) ? {content:document.getElementById(contentId).innerHTML,titleShow:false,autoDimensions:true} : null;
			}else{
				fbOptions = {type:'iframe',width:w,height:h};
			}
			if(fbOptions !== null){
				$(item).fancybox(fbOptions);
			}
		}
		};

		minicart = new Minicart();
	}, 0);
	setTimeout(function(){
	// deferred items
		
		// must load analytics.js after minicart and other items are setup
		reiAnalytics();
		
		/* TODO does this work with the smart-buttons?
		 * esp on: /help/index.html
		 * */
		$(document.getElementById('unvHeader')).append('<img src="'.concat(
			location.protocol, '//admin.instantservice.com/resources/smartbutton/5514/15502/available.gif?',
			Math.floor(Math.random()*10001), '" style="width:0px;height:0px;visibility:hidden;position:absolute;" width="0" height="0" onLoad="hdrObj.liveChatOn();" onError="hdrObj.liveChatOff();"/>'
		) );
		var img = new Image();
		img.src = '/etc/static/rei-wcm/pix/common/pixel.gif?perf:r'.concat( (perf.ready - perf.start).toString(),',l',(perf.load - perf.start).toString(),',',(window.perf_start ? 'y,':'n,'),location.href);
		document.body.appendChild(img);
		// END:: load analytics
		
				
		//load addthis_widget.js for share button functionality if there is a .share on the page
		if($(".share").length > 0){
			try{
				var addthisjs = document.createElement('script');
				addthisjs.src= "http://s7.addthis.com/js/250/addthis_widget.js?domready=1";
				addthisjs.async = true;
				addthisjs.id = 'addthisscriptloadtest';
				document.body.appendChild(addthisjs);
				addthisjs=0;

				rei.shareButtonPreviousClick = false;
				var l = $('a.share');
				$(l).bind('mouseover',rei.util.bindaddthisonclick);
				
			}catch(e){}
		}
		
	}, 100);
	
	} // load()
};

$(rei.ready);
$(window).load(rei.load);

/* COREMETRICS deprecated content;
 * most used: cmSpFromCmRE, cmCreateManualLinkClickTag, cmCreatePageviewTag
 */
var item, fn = function(){
	if(!document.body) return;
	var img = new Image();
	img.src = '/etc/static/rei-wcm/pix/common/pixel.gif?cm_='.concat(location.href);
	document.body.appendChild(img);
}, cm_ = 'initToken,cmSpFromCmRE,makeOneCmSp,makeCmRe,getABString,cmCreateConversionEventTag,cmCreatePageElementTag,cmCreateProductElementTag,cmCreateManualLinkClickTag,cmCreateManualImpressionTag,cmCreateManualPageviewTag,cmErrorTag,cmCreateTechPropsTag,cmCreateDefaultPageviewTag,cmCreateProductviewTag,cmAddShop,cmCreateShopAction5Tag,cmCreateShopAction9Tag,cmDisplayShop5s,cmDisplayShop9s,cmCalcSKUString,cmCreateOrderTag,cmCreateRegistrationTag,cmCreateErrorTag,cmReportLoadTime,cmGetDefaultPageID,cmCreateApplicationStepTag,cmIndexOfParameter,cmExtractParameter,cmRemoveParameter,cmCheckCMEM,cmSafeZero,myNormalizeURL,cmSendFormFieldTag,cmCreatePageviewTag,cmMultipleOnChange,cmCheckForOnChange,cmSetupFormFieldTags,cmMakeTag,cmCreateFormFieldTag'.split(',');
while(item=cm_.shift()){
	window[item] = fn;
};


/*
window.onerror = function(err,url,line){
	var o = {'error':err,'url':url,'line':line};
	rei.error.push(o);
	if(window.console && console.log) console.log('error!',o);
	if(!document.body) return true;
	var img = new Image();
	img.src = '/static/rei-wcm/pix/common/pixel.gif?err='.concat(location.href,'&line=',line,'&url=',encodeURIComponent(url),'&err=',encodeURIComponent(err));
	document.body.appendChild(img);
	return true;
};
*/

/**
 *	REI Location Object
 *	@namespace rei
 *	@desc			Builds the rei.location object, this function allows the user to navigate Ajax pages with ether the hash tag or a query string
 *	@version		0.01
 *	@requires		jQuery
 *	@returns		{Object}
 */
rei.location = (function () {
	var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = window.location.search.substring(1),
		h = window.location.hash.substring(1),
		hp = {},
		p = {},
		count = 0;
	
	//Build get param object
	while (e = r.exec(q)){
	   p[d(e[1])] = d(e[2]);
	   count++;
	}	
	if(count===0){p = null;}
	
	/**
	 * Build hash param object
	 * @private
	 */
	function _buildHashParams(evt){
		var hashChangeEvent = (evt && evt.type === 'hashchange');
		count = 0;
		if(hashChangeEvent){
			h = window.location.hash.substring(1);
			rei.location.hash = h;
			hp = {};
		}
		while (e = r.exec(h)){
		   hp[d(e[1])] = d(e[2]);
		   count++;
		}	
		if(count===0){
			hp = null;
		}else if(hashChangeEvent){
			rei.location.getHash = _searchObjPropsScaffold(hp);
		}
	}
	
	/**
	 * Search Object Scaffolding
	 * @private
	 * @param		{Object} haystack, name-value pairs
	 * @returns		{Function}
	 */
	function _searchObjPropsScaffold(haystack){
		return function(needle){
			var rtn = false;
			if(typeof haystack != "undefined" || haystack != null){
				for (var name in haystack){
					if(name == needle){
						return haystack[name];
						break;
					}
				}
			}
		};
	}

	_buildHashParams();
	$(window).bind("hashchange", _buildHashParams);
	
	return {
		/**
		 * Get Request Param Value by Name
		 * @function
		 * @public
		 * @param		{String} needle
		 * @returns		{String}
		 */
		getParam : _searchObjPropsScaffold(p),
		/**
		 * Get Hash Value by Name
		 * @function
		 * @public
		 * @param		{String} needle
		 * @returns		{String}
		 */
		getHash : _searchObjPropsScaffold(hp),
		href : window.location.href,
		hash : h,
		params : p
	}
		
})();

/**
 *	REI User Object
 *	@namespace rei
 *	@desc			Builds the rei.user object
 *	@version		0.01
 *	@requires		jQuery, jQuery.cookie
 *	@returns		{Object}
 */
rei.user = (function(){
	var firstName = '', memberType = '', userCookie = [], isLoggedIn = false;

	/** @private */
	function _readUserCookie(s){
		userCookie = s;
		userCookie = (typeof userCookie !== "undefined" && userCookie !== null) ? userCookie.split("~") : false;
		if(userCookie){
			firstName = userCookie[0];
			memberType = (userCookie.length > 0 && (typeof userCookie[1] !== 'undefined' || userCookie[1] != null)) ? userCookie[1] : false;
		}else{
			firstName = null;
			memberType = null;
		}
		return userCookie;
	}
	
	/** @private */
	function _testString(s){
		return (typeof s == 'undefined' && typeof s != 'string') ? null : s ;
	}
	
	//Contructor
	isLoggedIn = Boolean(Number($.cookie('loggedin')));
	if(isLoggedIn){
		_readUserCookie($.cookie('rei_user_info'));
	}else{
		_readUserCookie(null);
	}
	
	return {
		/**
		 * Set first name of current REI user.
		 * @function
		 * @public
		 * @param		{String} s
		 * @returns		{String}
		 */
		setFirstName : function(s){return firstName = _testString(s);},
		/**
		 * Get first name of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getFirstName : function(){return firstName;},
		/**
		 * Set member type of current REI user.
		 * @function
		 * @public
		 * @param		{String} s
		 * @returns		{String}
		 */
		setMemberType : function(s){return memberType = _testString(s);},
		/**
		 * Get member type of current REI user.
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getMemberType : function(){return memberType;},
		/**
		 * Get user's login status
		 * @function
		 * @public
		 * @returns		{Boolean}
		 */
		isLoggedIn : function(){return isLoggedIn;},
		/**
		 * Make a request to the backend for this users's member type
		 * @function
		 * @public
		 * @returns		{String} user's member type
		 */
		requestMemberType : function(){
			if(isLoggedIn && memberType == false){
				$.ajax({
					type: 'GET',
					url: '/rest/user/memberType',
					async: false,
					dataType: 'text',
					timeout: 10000,
					success: function(data){memberType = data;},
					error: function(jqXHR, textStatus, errorThrown){memberType = false;}
				});
			}else if(isLoggedIn == false){
				memberType = null;
			}
			return memberType;
		}
	};
	
})();

/**
 *	REI User Location Object
 *	@namespace rei
 *	@desc			Builds the rei.user.location object.  The location data is based upon the user's IP address
 *	@version		0.01
 *	@requires		jQuery, jQuery.cookie
 *	@returns		{Object} 
 */
rei.user.location = (function(){
	var _this = {};

	if($.cookie("IS3_GSV") != null){
		$.each($.cookie("IS3_GSV").split("_"),function(index,value){
			_this[value.split("-")[0]] = value.split("-")[1]; 
		});
	}

	return {
		/**
		 * Get User's city
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getCity : function(){
			return _this["GeoCt"];
		},
		/**
		 * Get User's country
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getCountry : function(){
			return _this["GeoCo"];
		},
		/**
		 * Get User's region
		 * @function
		 * @public
		 * @returns		{String}
		 */
		getRegion : function(){
			return _this["GeoRg"];
		},
		_l : _this
	}

})();

//TODO review with team, need feedback on how we want to deal with REST within javascript
rei.services = (function($){
	var defaultOptions = {
		async: true,
		cache: true,
		dataType: "json",
		timeout: 5000,
		error: function(jqXHR, textStatus, errorThrown){
			rei.errors.push(errorThrown);
		}
	};

	if(typeof $ !== "function" && !$().jquery) return;

	function _rest(url, data, options){
		var restOptions = {};
		data = data || {};
		options = options || {};
		options.data = data;
		options.url = url;
		restOptions = $.extend(defaultOptions, options);
		return $.ajax(restOptions);
	}

	return {
		Read: function(url, data, options){
			options.type = "GET";
			return _rest(url, data, options);
		},
		Create: function(url, data, options){
			options.type = "POST";
			return _rest(url, data, options);
		},
		Put: function(url, data, options){
			options.type = "PUT";
			return _rest(url, data, options);
		},		
		Delete: function(url, data, options){
			options.type = "DELETE";
			return _rest(url, data, options);
		}
	};
}(jQuery));


rei.gps = new gps();
function gps(){
	me = this;
	this.locationReadyCallback = null;
	this.callLocationReadyCallback = function(){
		try{
			me.locationReadyCallback();
		}
		catch(err){
			
		}
	};
	this.debug = false;
	this.coordinate =  {city:null, state: null, zip: null, lat:null, lng:null, autoDetect:false};
	this.errorMessages = {
		invalidZipCode: 'Sorry, we don\'t recognize that ZIP code. Please enter a valid 5-digit ZIP code.',
		invalidCityAndState: 'Sorry, we don\'t recognize that city and/or state.  Please re-enter your city and state.',
		missingCityOrState:'You must specify both a city and a state, or enter your ZIP code.',
		missingZipCodeCityAndState:'Please provide a valid 5-digit ZIP code or city and state.'
	};
	this.saveToCookie = function(){
	    //$.cookie('gps', me.coordinate.city.concat('|', me.coordinate.state, '|', me.coordinate.zip, '|', me.coordinate.lat, '|', me.coordinate.lng, '|', me.coordinate.autoDetect));
	    $.cookie('gps', me.coordinate.city.concat('|', me.coordinate.state, '|', me.coordinate.zip, '|', me.coordinate.lat, '|', me.coordinate.lng, '|', me.coordinate.autoDetect), {path: '/', expires:10});
	};	
	this.getUserLocation = function(){
		var gpsCookie = $.cookie('gps');
		if(gpsCookie != null && gpsCookie != ''){
			var gpsCoordinate = $.cookie('gps').split('|');
			if(gpsCoordinate.length == 6){
			    me.coordinate.city = gpsCoordinate[0];
			    me.coordinate.state = gpsCoordinate[1];
			    me.coordinate.zip = gpsCoordinate[2];
			    me.coordinate.lat = gpsCoordinate[3];
			    me.coordinate.lng = gpsCoordinate[4];
			    me.coordinate.autoDetect = gpsCoordinate[5];
			    me.callLocationReadyCallback();
			    if(me.debug == true) me.showUserLocation();
			}
		}
		if(me.coordinate.city == null){
			if(window.google === undefined || google.loader == null){
				initLoader();
			}
			else{
				loadMaps();
			}
		}
		function initLoader() {
			var script = document.createElement("script");
			script.src = "https://www.google.com/jsapi?callback=loadMaps";
			script.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(script);
		}
	};
	this.autoLocate = function(){
		$.cookie('gps', '');
		$.cookie('gps', null);
		me.coordinate =  {city:null, state: null, zip: null, lat:null, lng:null, autoDetect:false};
		me.getUserLocation();
	};
	this.showUserLocation = function(){
		if($('#locationInfo').length == 0){
			$('body').append('<div id="locationInfo" style="position:fixed; bottom: 8px; left:2px;"><span></span> - <a id="changeLocationLink" href="javascript:void(0);"> change location</a>  <a href="javascript:void(0);" onclick="rei.gps.autoLocate();"><img style="margin-bottom:-10px;" src="/img/autolocation.png" /></a>', '</div>');
			$('#changeLocationLink').bind('click', function(e){
				try{
					e.preventDefault();
					e.stopPropagation();
				}
				catch(err){
					//ie browsers may land here
				}
				me.editLocation($('body'));				
			});
		}
		var zip = me.coordinate.zip == null || me.coordinate.zip == 'null' ? '' : me.coordinate.zip;
		$('#locationInfo span').html(me.coordinate.city.concat(', ', me.coordinate.state, ' ', zip));
	};
	this.hideLocationForm = function(){
		$('#zipChangeForm').hide();	
	};
	this.updateLocation= function(){
		var zipCode = $('#cfZipCode').val();
		var city =  $('#cfCity').val();
		var state =  $('#cfState').val();
		if(zipCode == '' && (city == '' && state == '')){
			alert(me.errorMessages.missingZipCodeCityAndState);
			return;
		}
		else if(zipCode != ''){
			me.changeLocationByZipCode(zipCode, function(found){
				if(found == false){
					if((city != '' && state != '')){
						me.changeLocationByCityAndState(city, state, function(found){
							if(found == false){
								alert('Zip code not found, city and state did not return a valid location. Please enter a valid zip code, or a valid city and state.');					
							}
						});
					}
					else{
						alert(me.errorMessages.invalidZipCode);	
					}
				}
				else{
					me.hideLocationForm();
					if(me.debug == true) me.showUserLocation();			
				}
			});
		}
		if(city != '' && state != ''){
			me.changeLocationByCityAndState(city, state, function(found){
				if(found == false){
					alert(me.errorMessages.invalidCityAndState);					
				}
				else{
					me.hideLocationForm();
					if(me.debug == true) me.showUserLocation();			
				}
			});
		}
		else{
			alert(me.errorMessages.missingCityOrState);
			return;
		}
	};
	this.changeLocationByUrl = function(restUrl, callback){
		$.ajax({
			type: "GET",
			url: restUrl,
			dataType: "json",
			// does not fire for 500 or 400 errors:
			success: function(json){
				if(json != null && json.length){
					json = json[0];
					if(json.zipcode){
						json = json.zipcode;
					}
				}
				if(json != null && json.latitude != null && json.longitude != null){
					var lat = json.latitude;
					var lng = json.longitude;
					me.coordinate.city = json.city;
					me.coordinate.state = json.stateAbbr;
					me.coordinate.zip = json.zip;
					me.coordinate.lat = json.latitude;
					me.coordinate.lng = json.longitude;				
					me.coordinate.autoDetect = false;
					me.saveToCookie();
					try{					
						callback(true);
					}
					catch(err){					
					}
					try{
						clientUpdateCallback();
					}
					catch(err){
						
					}
				}
				else{
					try{					
						callback(false);
					}
					catch(err){					
					}
				}
			},
			// fires for non-500 responses (including 400's):
			complete: function(){
				
			},
			// fires for 500 errors:
			error: function(){
			}
		}); // ajax()
	}
	this.changeLocationByZipCode= function(zipCode, callback){
		me.changeLocationByUrl('/rest/geo/' + zipCode, callback);
	};
	this.changeLocationByCityAndState= function(city, state, callback){
		me.changeLocationByUrl('/rest/geo/'.concat(city, '/', state), callback);
	};

	this.editLocation = function($parent){
		if($('#zipChangeForm').length == 0){
			var html = '' +
			'<div id="zipChangeForm" style="display: block;"><div style="position:relative;">' + 
			'<div id="zipChangeFormCB" onclick="rei.gps.hideLocationForm(); try{closeClientCallBack();}catch(err){}"></div>' + 
			'<div class="chat-bubble">' + 
			'	<form action="javascript:this.updateLocation();">' + 
			'		<div id="changeYourLocation" class="cf">Change Your Location</div>' + 
			'		<div id="zipBlock">' + 
			'			Zip Code<br>' + 
			'			<input type="text" id="cfZipCode">' + 
			'		</div>' + 
			'		<div id="orBlock">' + 
			'			<br>' + 
			'			<div id="or">- or -</div>' + 
			'		</div>' + 
			'		<div id="cityBlock">' + 
			'			City<br>' + 
			'			<input type="text" id="cfCity">' + 
			'		</div>' + 
			'		<div id="stateBlock">' + 
			'			State<br>' + 
			'			<select id="cfState"><option value=""></option>' + 
			'				<option value="AL" title="Alabama">AL</option>' + 
			'				<option value="AK" title="Alaska">AK</option>' + 
			'				<option value="AZ" title="Arizona">AZ</option>' + 
			'				<option value="AR" title="Arkansas">AR</option>' + 
			'				<option value="CA" title="California">CA</option>' + 
			'				<option value="CO" title="Colorado">CO</option>' + 
			'				<option value="CT" title="Connecticut">CT</option>' + 
			'				<option value="DE" title="Delaware">DE</option>' + 
			'				<option value="DC" title="District of Columbia">DC</option>' + 
			'				<option value="FL" title="Florida">FL</option>' + 
			'				<option value="GA" title="Georgia">GA</option>' + 
			'				<option value="HI" title="Hawaii">HI</option>' + 
			'				<option value="ID" title="Idaho">ID</option>' + 
			'				<option value="IL" title="Illinois">IL</option>' + 
			'				<option value="IN" title="Indiana">IN</option>' + 
			'				<option value="IA" title="Iowa">IA</option>' + 
			'				<option value="KS" title="Kansas">KS</option>' + 
			'				<option value="KY" title="Kentucky">KY</option>' + 
			'				<option value="LA" title="Louisiana">LA</option>' + 
			'				<option value="ME" title="Maine">ME</option>' + 
			'				<option value="MD" title="Maryland">MD</option>' + 
			'				<option value="MA" title="Massachusetts">MA</option>' + 
			'				<option value="MI" title="Michigan">MI</option>' + 
			'				<option value="MN" title="Minnesota">MN</option>' + 
			'				<option value="MS" title="Missippi">MS</option>' + 
			'				<option value="MO" title="Missouri">MO</option>' + 
			'				<option value="MT" title="Montana">MT</option>' + 
			'				<option value="NE" title="Nebraska">NE</option>' + 
			'				<option value="NV" title="Nevada">NV</option>' + 
			'				<option value="NH" title="New Hampshire">NH</option>' + 
			'				<option value="NJ" title="New Jersey">NJ</option>' + 
			'				<option value="NM" title="New Mexico">NM</option>' + 
			'				<option value="NY" title="New York">NY</option>' + 
			'				<option value="NC" title="North Carolina">NC</option>' + 
			'				<option value="ND" title="North Dakota">ND</option>' + 
			'				<option value="OH" title="Ohio">OH</option>' + 
			'				<option value="OK" title="Oklahoma">OK</option>' + 
			'				<option value="OR" title="Oregon">OR</option>' + 
			'				<option value="PA" title="Pennsylvania">PA</option>' + 
			'				<option value="RI" title="Rhode Island">RI</option>' + 
			'				<option value="SC" title="South Carolina">SC</option>' + 
			'				<option value="SD" title="South Dakota">SD</option>' + 
			'				<option value="TN" title="Tennessee">TN</option>' + 
			'				<option value="TX" title="Texas">TX</option>' + 
			'				<option value="UT" title="Utah">UT</option>' + 
			'				<option value="VT" title="Vermont">VT</option>' + 
			'				<option value="WA" title="Washington">WA</option>' + 
			'				<option value="WV" title="West Virginia">WV</option>' + 
			'				<option value="WI" title="Wisconsin">WI</option>' + 
			'				<option value="WY" title="Wyoming">WY</option>' + 
			'			</select>' + 
			'		</div>' + 
			'		<div id="goBlock">' + 
			'			<br>' + 
			'			<button class="fancyBox white medium button" id="cfGo" onclick="rei.gps.updateLocation();">GO</button>' + 
			'		</div>' + 
			'	</form>' + 
			'	<div class="cf"></div>' + 
			'	<div class="chat-bubble-arrow-border"></div>' + 
			'	<div class="chat-bubble-arrow"></div>' + 
			'</div>' + 
			'</div></div>';
			$parent.append(html);
			$('#zipChangeForm').bind('click', function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			var css = '<style>' +
			'#zipChangeForm .chat-bubble-arrow {border-color: white transparent transparent; border-style: solid; border-width: 10px; bottom: -19px; height: 0; left: 20px; position: absolute; width: 0;}' +
			'#zipChangeForm .chat-bubble-arrow-border {border-color: #666666  transparent transparent transparent; border-style: solid; border-width: 10px; height: 0;width: 0; position: absolute; bottom: -22px; left: 20px;}' +
			'#zipChangeForm .chat-bubble {font-family:Verdana; font-size:10px; color: #696A6C; background-color: white; border:2px solid #666666; margin:10px auto; padding:10px; position:relative; -moz-border-radiuss:10px; -webkit-border-radiuss:10px; -moz-box-shadow:3px 3px 3px #888888; -webkit-box-shadow:3px 3px 3px #888888; min-width:200px;}' +
			'#zipChangeForm{position: absolute;font-weight: bold; color: black;width:370px; z-index:9999999999;}' +
			'#zipChangeForm{' +
			'position: fixed;' +
			'bottom:20px;' +
			'}' +
			'#zipChangeForm  #zipChangeFormCB{' +
			'	position:absolute;' +
			'width: 30px;' +
			'height: 30px;' +
			'background-image: url(\'/etc/static/rei-wcm/pix/common/modal/fancybox.png\');' +
			'background-position: -40px 0px;' +
			'cursor: pointer;' +
			'z-index: 1103;' +
			'}' +
			'#zipChangeFormCB{' +
			'top: -12px;' +
			'right: -13px;' +
			'}' +
			'#zipChangeForm .chat-bubble-arrow, #zipChangeForm .chat-bubble-arrow-border {left: 205px;}' +
			'#zipChangeForm #zipBlock,#zipChangeForm  #orBlock,#zipChangeForm  #cityBlock,#zipChangeForm #stateBlock,#zipChangeForm  #goBlock{float: left; margin-right:5px;}' +
			'#or{margin-top:5px;}' +
			'#cfZipCode{width:60px;}' +
			'#cfCity{width:120px;}' +
			'#cfState{margin-top:2px; width:50px;}' +
			'#cfGo{margin-top:2px;}' +
			'</style>';
			$('head').append(css);
		}
		$('#zipChangeForm').show();
		$('#cfCity').val('');
		$('#cfState').val('');
		$('#cfZipCode').val('').focus();
	};
}

})(jQuery);



function loadMaps() {
	//set default location to seattle
	var city='Seattle';
	var state = 'WA';
	var lat = 47.543348;
	var lng = -122.27496;	
    if (google.loader.ClientLocation) {
    	var clientLocation = google.loader.ClientLocation;
    	city=clientLocation.address.city;
    	state = clientLocation.address.region;
    	lat = clientLocation.latitude;
    	lng = clientLocation.longitude;	
        rei.gps.coordinate.city = city;
        rei.gps.coordinate.state = state;
        rei.gps.coordinate.lat = lat;
        rei.gps.coordinate.lng = lng;
        rei.gps.changeLocationByCityAndState(city, state, function(found){    	
            rei.gps.coordinate.autoDetect = true;
        	rei.gps.saveToCookie();
        	rei.gps.callLocationReadyCallback();
        	if(rei.gps.debug == true)rei.gps.showUserLocation();
        });
    } 	  
    else{
    	rei.gps.callLocationReadyCallback();    	
    }
}

/* $Id: common_ultra.js 3304 2012-06-09 00:20:04Z sfleshe $ */

/**
 * TODO
 * 1) Remove hard-coded storeId's
 * 
 */
var perf_start = (new Date()).getTime(),
	isUltraTransform = false,
	jsIsCheckout = false,
	httpsPath,
	httpPath,
	jscript_path,
	httpHost,
	httpsHost,
	gomez,
	returnUrl,
	currentUrl,
	fullDomain = window.location.host,
	domainArray = fullDomain.split('.'),
	subDomain=domainArray[0]+' ',
	storeId = '8000',
	image_path = '',
	yourAccountInView = 'YourAccountInfoInView?storeId=8000',
	yourAccountOutView = 'YourAccountInfoOutView?storeId=8000',
	pageIsSecure = false,
	referringUrlPath = '',
	navClass = '',
	storeClass = 'rei',
	sectionClass = '',
	pageClass = '',
	contentClass = '';
	
returnUrl = currentUrl =  location.href;
//httpPath = httpHost = jscript_path = 'http://www.rei.com/';
//httpsPath = httpsHost = 'https://www.rei.com/';

httpPath = httpHost = jscript_path = 'http://'+ fullDomain +'/';
httpsPath = httpsHost = 'https://'+ fullDomain +'/';
if(subDomain=='www' || subDomain=='findout')
{
	subDomain = '';
}

function openWindow(surl,windowName,params) { 
// We have to double-encode some URL strings to account for an IE bug where
// IE un-encodes the URL before passing it to this function. This line
// causes the function to un-encode the URL if the URL was double-encoded
// but was (correctly) passed without decoding by a sane browser.
  if (surl.indexOf('%2520') != -1) {
    surl = unescape(surl);
  }    
  windowHandle = window.open(surl,windowName,params);
    
  if(window.focus) {
    windowHandle.focus();
  }
}

// add a name and value dynamically to the hard-coded URL before calling openWindow().

function modURLOpenWindow(the_name, the_value,surl,windowName,params) {
  if ( (the_value!=null) && (the_name!=null)) {
    if (surl.indexOf('#')>=0) {
      xa = surl.split("#");
      if (xa[0].indexOf('?')>=0) {
        surl = xa[0] + '&' + the_name + '=' + the_value + '#' + xa[1];
      } else {
        surl = xa[0] + '?' + the_name + '=' + the_value + '#' + xa[1];
      }
    } else {
      if (surl.indexOf('?')>=0) {
        surl = surl + '&' + the_name + '=' + the_value ;
      } else {
        surl = surl + '?' + the_name + '=' + the_value ;
      }
    }
  }
  openWindow(surl,windowName,params);
}

function urlencode(str) {
    return escape(str).replace(/\+/g,'%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
}

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function getCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function getAffiliateID() {
  var PAT = getCookie("PAT");
  var ID = 0;
  if(PAT != null) {
    var i = PAT.indexOf("=", 0) + 1;
    var j = PAT.indexOf(":", i);
    ID = PAT.substring(i, j);
  }
  return ID;
}

function stripSpaces(string) {
  while('' + string.charAt(string.length-1) == ' ')
    string = string.substring(0, string.length-1);
  while('' + string.charAt(0) == ' ')
    string = string.substring(1, string.length);
  return string;
}

function clearCookie(name) {
  document.cookie = name + "=" + "" + ";PATH=/";
}

function emailCheck (emailStr) {

/* The following pattern is used to check if the entered e-mail address
   fits the user@domain format.  It also is used to separate the username
   from the domain. */

var emailPat=/^(.+)@(.+)$/

/* The following string represents the pattern for matching all special
   characters.  We don't want to allow special characters in the address.
   These characters include ( ) < > @ , ; : \ " . [ ]    */

var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"

/* The following string represents the range of characters allowed in a
   username or domainname.  It really states which chars aren't allowed. */

var validChars="\[^\\s" + specialChars + "\]"

/* The following pattern applies if the "user" is a quoted string (in
   which case, there are no rules about which characters are allowed
   and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
   is a legal e-mail address. */

var quotedUser="(\"[^\"]*\")"

/* The following pattern applies for domains that are IP addresses,
   rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
   e-mail address. NOTE: The square brackets are required. */

var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/

/* The following string represents an atom (basically a series of
   non-special characters.) */

var atom=validChars + '+'

/* The following string represents one word in the typical username.
   For example, in john.doe@somewhere.com, john and doe are words.
   Basically, a word is either an atom or quoted string. */
   
var word="(" + atom + "|" + quotedUser + ")"

// The following pattern describes the structure of the user

var userPat=new RegExp("^" + word + "(\\." + word + ")*$")

/* The following pattern describes the structure of a normal symbolic
   domain, as opposed to ipDomainPat, shown above. */
   
var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")

/* Strip leading spaces */

while(''+emailStr.charAt(0)==' ')
  emailStr=emailStr.substring(1,emailStr.length);

/* Strip trailing spaces */

while(''+emailStr.charAt(emailStr.length-1)==' ')
  emailStr=emailStr.substring(0,emailStr.length-1);

/* Finally, let's start trying to figure out if the supplied address is
   valid. */

   if(emailStr.length == 0) {
     var errStr="You must enter a valid email address"
     alert(errStr)
     return false
   }

/* Begin with the coarse pattern to simply break up user@domain into
   different pieces that are easy to analyze. */

var matchArray=emailStr.match(emailPat)
if (matchArray==null) {

  /* Too many/few @'s or something; basically, this address doesn't
     even fit the general mould of a valid e-mail address. */

  alert("The e-mail address must include a @ and a . to be valid. Please try again.")
  return false
}

var user=matchArray[1]
var domain=matchArray[2]

// See if "user" is valid

if (user.match(userPat)==null) {

    // user is not valid

    alert("The e-mail address must include a username without spaces or punctuation.")
    return false
}

/* if the e-mail address is at an IP address (as opposed to a symbolic
   host name) make sure the IP address is valid. */

var IPArray=domain.match(ipDomainPat)

if (IPArray!=null) {

    // this is an IP address

    for (var i=1;i<=4;i++) {
      if (IPArray[i]>255) {
          alert("Destination IP in email address is invalid!")
          return false
      }
    }
    return true
}

// Domain is symbolic name

var domainArray=domain.match(domainPat)
if (domainArray==null) {
  alert("The e-mail address must include an extension: (.com, .org, .ca, etc.)")
  return false
}

/* domain name seems valid, but now make sure that it ends in a
   three-letter word (like com, edu, gov) or a two-letter word,
   representing country (uk, nl), and that there's a hostname preceding
   the domain or country. */

/* Now we need to break up the domain to get a count of how many atoms
   it consists of. */
   
var atomPat=new RegExp(atom,"g")
var domArr=domain.match(atomPat)
var len=domArr.length
if (domArr[domArr.length-1].length<2 ||
    domArr[domArr.length-1].length>6) {
    
   // the address must end in a two letter or three letter word.

   alert("The e-mail address must include an extension: (.com, .org, .ca, etc.)")
   return false
}

// Make sure there's a host name preceding the domain.

if (len<2) {
   var errStr="The e-mail address must include an extension: (.com, .org, .ca, etc.)"
   alert(errStr)
   return false
}

// If we've gotten this far, everything's valid!

return true;
}

function printpage() {
  if (window.print != null) {
    window.print();
  } else {
    alert("Unfortunately, your browser does not support this shortcut.  Please select File and then Print from your browser's menu.");
  }
}

function setCookie(name, value) {
  document.cookie=name+"="+escape(value)+";PATH=/";
}

function DelCookie (name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path == null) ? "" : "; path=" + path) +
      ((domain == null) ? "" : "; domain=" + domain) +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function Set_Cookie( name, value, expires)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    
    /*
    if the expires variable is set, make the correct expires time, the current script below will set it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires ){
        expires =  parseInt(expires, 10) * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    
    document.cookie = name + "=" + escape( value ) + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}

// common_header processing (safe every page?)

var affiliateID = getAffiliateID();

if ((affiliateID == "9048" || affiliateID == "11917" || affiliateID == "14028" || affiliateID == "14172") && window.location.protocol == "https:") {
  if (top.location != self.location) {
    top.location = self.location;
  }
}

var numOfItems = getCookie("rei_cart");
var multipleItems = (numOfItems == 1) ? 's':'';
var loggedIn = getCookie( "loggedin" );

if (!numOfItems) numOfItems = 0;


var cartStatusText = '';

if (document.title != "REI.com: Shopping Basket") {
    if (numOfItems == 1) {
        cartStatusText = '(contains ' + numOfItems + ' item)';
    } else {
        cartStatusText = '(contains ' + numOfItems + ' items)';
    }
}

// PLOONEY ADDITION
// Read the two GR cookies if they exist.

function ReadGRCookie (CookieName) {
    var gr_id = 0;
    var gr_event_type = "";
    var gr_event_date = "";
    var gr_personal_name = "";
    var which_cookie = "";

    var cook_obj = new Object();

    which_cookie = CookieName;
    
    var CookieString = document.cookie;
    var CookieSet = CookieString.split (';');
    var SetSize = CookieSet.length;
    var CookiePieces
    var ReturnValue = "";
    var x = 0;

    for (x = 0; ((x < SetSize) && (ReturnValue == "")); x++) {

        CookiePieces = CookieSet[x].split ('=');

        if (CookiePieces[0].substring (0,1) == ' ') {
            CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
        }

        if (CookiePieces[0] == CookieName) {
            ReturnValue = CookiePieces[1];
        }
    }

    if (ReturnValue != "") {
        CleanRetVal = unescape(ReturnValue);
        RetArray = CleanRetVal.split(":");
        gr_id = RetArray[0];
        gr_event_type = RetArray[1];
        gr_event_date = RetArray[2];
        gr_personal_name = RetArray[3];

        //if (gr_id) alert(gr_id);
        //if (gr_personal_name) alert(gr_personal_name);

        var alertStr = "ID: " + gr_id + "\n" +
        "Name: " + gr_personal_name + "\n" +
        "Type: " + gr_event_type + "\n" +
        "Date: " + gr_event_date;
        
        cook_obj.cook_name = which_cookie;
        cook_obj.id = gr_id;
        cook_obj.event_type = gr_event_type ;
        cook_obj.event_date = gr_event_date ;
        cook_obj.personal_name = gr_personal_name ;

        return cook_obj;
    } 
}

var setup_cook_obj = ReadGRCookie("GiftRegistrySetup");

// END PLOONEY ADDITION

//
// QueryString
//
// this is duplicated from querystring.js

function QueryString(key) {
	var value = null;
	for (var i=0;i<QueryString.keys.length;i++)
	{
		if (QueryString.keys[i]==key)
		{
			value = QueryString.values[i];
			break;
		}
	}
	return value;
}
QueryString.keys = new Array();
QueryString.values = new Array();

function QueryString_Parse() {
	var query = window.location.search.substring(1);
	var pairs = query.split("&");
	
	for (var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf('=');
		if (pos >= 0)
		{
			var argname = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			QueryString.keys[QueryString.keys.length] = argname;
			QueryString.values[QueryString.values.length] = value;		
		}
	}

}

QueryString_Parse();
  
// Product page check for MID pages

function checkSKUSelect() {
	var error;
	$('.quantity').each(function(i){
		var j = i+1;
		var quantity = document.getElementsByName('quantity_'+j)[0].value;
		var selection = document.getElementById('dropDown_'+j).value;
		if(quantity==0 || selection=='LABEL'){
			$('#selectFlag_'+j).show();
			$('.selectFlagFooter').show();
			error = true;
		}
		else if(quantity!=0 && selection!='LABEL'){
			$('#selectFlag_'+j).hide();
		}
		else{
			$('#selectFlag_'+j).hide();
			$('.selectFlagFooter').hide();
			error = false;
		}
	});
	if(error==true){
		return false;
	}
	else{
		return true;
	}
	
}


// Product page validation for Collections pages
function checkSKUCollectionsSelect() {
	var error = new Array(), selectedItem = new Array();
	var oneItemSelected = false;
	var returnValue = false;
	
	$('.quantity').each(function(i){//loop through each item on page
		var j = i+1;
		var quantity = parseInt(document.getElementsByName('quantity_'+j)[0].value);
		var selection = document.getElementById('dropDown_'+j).value;
		var selected = document.getElementById('selectCollectionCheckBox-'+j).checked;
		if(selected==true){
			if(quantity==0 || selection=='LABEL'){//either input value is invalid
				$('#selectFlag_'+j).show();
				$('.selectFlagFooter').show();
				selectedItem[i] = false;
				error[i] = true;
			}			
			if(quantity>0 && selection!='LABEL'){//valid inputs on both input fields
				$('#selectFlag_'+j).hide();
				$('.selectFlagFooter').hide();
				selectedItem[i] = true;
				error[i] = false;
			}
		}
		else{
			$('#selectFlag_'+j).hide();
                    		selectedItem[i] = false;
			error[i] = false;
		}
	});
	
	var oneSelectedItemPassed = false;
	var errorFound = false;
	for(var i=0; i<error.length;i++){//check productError array for input errors
		if(error[i]==false){//submit document.additem[form] here
		        if(selectedItem[i] == true){
		            oneSelectedItemPassed = true;
		        }
 		}
 		else{//found an error in the array
            $('.selectFlagFooter').show();
            errorFound = true;
            break;
 		}
 	}
	if (errorFound) {
		returnValue = false;
	} else {
		if(oneSelectedItemPassed){//want to remove form fields for unSelected Items here 	
            for(j = 0; j<error.length; j++){
                itemPos = j+1;
                if(selectedItem[j] == false){
                    $('#dropDown_'  + itemPos).remove();
                    $('#quantity_'  + itemPos).remove();
                    $('#selectCollectionCheckBox_'  + itemPos).remove(); 
                }
            }
            returnValue = true;
		} else {
			$('.selectFlagFooter').show();
			returnValue = false;
		}
	}
	if (returnValue) {
		var f = $("#additem");
		$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
		minicart.addToCart("/REIOrderItemUpdate?" + f.serialize());
	}
	return false;
}
function getCheckedItems() {
    var subTotal = 0, returnTotal = 0, elemPos = 0, itemsSelected = 0;
    var cBoxes = document.additem.selectCollectionCheckBox;
    for (ii = 0; ii < cBoxes.length; ii++) {
        subTotal = 0;        

        if (cBoxes[ii].checked) {
            elemPos = cBoxes[ii].id;
                elemPos = elemPos.substring(elemPos.lastIndexOf('-')+1, elemPos.length);
                
            itemsSelected++;
            if (parseInt($("#quantity_" + elemPos).val()) > 0) {
                subTotal = getSubTotal(elemPos, getItemPrice(elemPos));
            }
        }
        returnTotal += subTotal;
    }
    $("#merchSubTotal").html(returnTotal.toFixed(2));
    $("#itemsSelected").html(itemsSelected);

}
function getItemPrice(pricePos){
        var itemPrice = $(".pricePara span#price_" + pricePos).html();
        itemPrice = itemPrice.substring(itemPrice.indexOf('$')+1, itemPrice.length);
        return parseFloat(itemPrice);
}
function getSubTotal(pricePos, itemPrice){
        var qty = $('#quantity_'  + pricePos).val();
        var returnVal = itemPrice * parseInt(qty);
        return returnVal;
}


function escapeHTML (str) {
   var div = document.createElement('div');
   var text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
}


//Put onKeyPress="onReturnKeySubmit(this)" in any <form> element that you want to force to submit when the "return" or "enter" keys are pressed.
//NOTE: Textareas in forms should be able to accept "return" values without the form submitting. This function may need to be modified to support textareas.

function onReturnKeySubmit(theForm, theFn, thePar){
	

	if (window.event)
	{
    var node = (event.target) ? event.target : ((event.srcElement) ? event.srcElement : null);

 if (node.type && node.type != "textarea")
 {
 try
 { 
  if(event.keyCode == 13)
  {
  if (!theFn){
   theForm.submit();
  }
  else
  {
  theFn(thePar);
  }
  }
  
 }
 catch(err)
 {
  try
  {
   if(event.which == 13)
   
   if (!theFn){
  
  theForm.submit();
  }
  else
  {
  
  theFn(thePar);
  }
  
  
  }
  catch(err){}
  }
 }
}
}


// this code fixes the IE6 flicker bug 
try {
document.execCommand("BackgroundImageCache", false, true);
} catch(err) {}
// end IE6 flicker bug fix
	
/* create searchId cookie for SC event serialization */
function genSearchId(){        
               var newDate = new Date();
           
                      var myYear = newDate.getUTCFullYear();
                      myYear = myYear.toString();
                      myYear = myYear.substring(myYear.length-2,myYear.length);
                      
                      var myMonth = newDate.getUTCMonth() +1;
                      myMonth = myMonth < 10 ? ('0'+myMonth) : myMonth;
                      
                      var myDay = newDate.getUTCDate();                      
                      myDay = myDay < 10 ? ('0'+myDay) : myDay;                   
                      
                      var myMinutes = newDate.getUTCHours()*60 + newDate.getUTCMinutes();                         
                      var shortDate=myYear+myMonth+myDay;                        
                     
                     var newValue = shortDate+myMinutes+rei.util.randomID(10);
           
               Set_Cookie('searchId', newValue, 1);        	     
}
			
function checkSearchBoxValue(form){
	if(form){
	    var parentForm = form.headerQuery;
	    if (parentForm.value=='') {
	        var url = '/emptysearch';
	        if (storeClass == 'outlet') {
	        	url = '/outlet/emptysearch';
	        }
	        window.location.replace(url);
	        return false;
	    } else {
	        /* create searchId cookie for SC event serialization */
	       genSearchId();
	    }
	}else{
	    return false;
	}
}

function getUserInfoCookie(dIngredient){
	var cookieData = getCookie('rei_user_info');
	
		if(cookieData == null){
			return null;
		}
		else if(cookieData.length > 1){
			cookieData = cookieData.split('~');
		}
		else if(cookieData.length == 1){
			
		}
		else{ return null; }
			
		switch(dIngredient){
			case 'userName':
				if(cookieData.length > 1){
					return cookieData[0].toString();
				}
				else{
					return cookieData.toString();
				}
				break;
				
			case 'memberType':
				if(cookieData.length > 1){
					return cookieData[1].toLowerCase();				
				}
				else{
					return null;
				}
				break;
			
			case 'zipCode':
				break;				
		}
		
}

function ReadGRCookie (CookieName) {

    var gr_id = 0;
    var gr_event_type = "";
    var gr_event_date = "";
    var gr_personal_name = "";
    var which_cookie = "";

    var cook_obj = new Object();

    which_cookie = CookieName;
    
    var CookieString = document.cookie;
    var CookieSet = CookieString.split (';');
    var SetSize = CookieSet.length;
    var CookiePieces
    var ReturnValue = "";
    var x = 0;

    for (x = 0; ((x < SetSize) && (ReturnValue == "")); x++) {

        CookiePieces = CookieSet[x].split ('=');

        if (CookiePieces[0].substring (0,1) == ' ') {
            CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
        }

        if (CookiePieces[0] == CookieName) {
            ReturnValue = CookiePieces[1];
        }
    }

    if (ReturnValue != "") {
        CleanRetVal = unescape(ReturnValue);
        RetArray = CleanRetVal.split(":");
        gr_id = RetArray[0];
        gr_event_type = RetArray[1];
        gr_event_date = RetArray[2];
        gr_personal_name = RetArray[3];

        //if (gr_id) alert(gr_id);
        //if (gr_personal_name) alert(gr_personal_name);

        var alertStr = "ID: " + gr_id + "\n" +
        "Name: " + gr_personal_name + "\n" +
        "Type: " + gr_event_type + "\n" +
        "Date: " + gr_event_date;
        
        cook_obj.cook_name = which_cookie;
        cook_obj.id = gr_id;
        cook_obj.event_type = gr_event_type ;
        cook_obj.event_date = gr_event_date ;
        cook_obj.personal_name = gr_personal_name ;

        return cook_obj;
        
    } 
        

}
/* $Id: mbox.js 1914 2012-03-30 17:26:26Z jowilso $ */var mboxCopyright = "Copyright 1996-2011. Adobe Systems Incorporated. All rights reserved.";mboxUrlBuilder = function(a, b) { this.a = a; this.b = b; this.c = new Array(); this.d = function(e) { return e; }; this.f = null;};mboxUrlBuilder.prototype.addParameter = function(g, h) { var i = new RegExp('(\'|")'); if (i.exec(g)) { throw "Parameter '" + g + "' contains invalid characters"; } for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; if (k.name == g) { k.value = h; return this; } } var l = new Object(); l.name = g; l.value = h; this.c[this.c.length] = l; return this;};mboxUrlBuilder.prototype.addParameters = function(c) { if (!c) { return this; } for (var j = 0; j < c.length; j++) { var m = c[j].indexOf('='); if (m == -1 || m == 0) { continue; } this.addParameter(c[j].substring(0, m), c[j].substring(m + 1, c[j].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(n) { this.o = n;};mboxUrlBuilder.prototype.setBasePath = function(f) { this.f = f;};mboxUrlBuilder.prototype.setUrlProcessAction = function(p) { this.d = p;};mboxUrlBuilder.prototype.buildUrl = function() { var q = this.f ? this.f : '/m2/' + this.b + '/mbox/' + this.o; var r = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var e = r + "//" + this.a + q; var s = e.indexOf('?') != -1 ? '&' : '?'; for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; e += s + encodeURIComponent(k.name) + '=' + encodeURIComponent(k.value); s = '&'; } return this.t(this.d(e));};mboxUrlBuilder.prototype.getParameters = function() { return this.c;};mboxUrlBuilder.prototype.setParameters = function(c) { this.c = c;};mboxUrlBuilder.prototype.clone = function() { var u = new mboxUrlBuilder(this.a, this.b); u.setServerType(this.o); u.setBasePath(this.f); u.setUrlProcessAction(this.d); for (var j = 0; j < this.c.length; j++) { u.addParameter(this.c[j].name, this.c[j].value); } return u;};mboxUrlBuilder.prototype.t = function(v) { return v.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');};mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + w.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = w.buildUrl(); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.y = new Object(); this.z = new Array();};mboxMap.prototype.put = function(A, h) { if (!this.y[A]) { this.z[this.z.length] = A; } this.y[A] = h;};mboxMap.prototype.get = function(A) { return this.y[A];};mboxMap.prototype.remove = function(A) { this.y[A] = undefined;};mboxMap.prototype.each = function(p) { for (var j = 0; j < this.z.length; j++ ) { var A = this.z[j]; var h = this.y[A]; if (h) { var B = p(A, h); if (B === false) { break; } } }};mboxFactory = function(C, b, D) { this.E = false; this.C = C; this.D = D; this.F = new mboxList(); mboxFactories.put(D, this); this.G = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.H = this.G && mboxGetPageParameter('mboxDisable') == null; var I = D == 'default'; this.J = new mboxCookieManager( 'mbox' + (I ? '' : ('-' + D)), (function() { return mboxCookiePageDomain(); })()); this.H = this.H && this.J.isEnabled() && (this.J.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.K(); this.L = mboxGenerateId(); this.M = mboxScreenHeight(); this.N = mboxScreenWidth(); this.O = mboxBrowserWidth(); this.P = mboxBrowserHeight(); this.Q = mboxScreenColorDepth(); this.R = mboxBrowserTimeOffset(); this.S = new mboxSession(this.L, 'mboxSession', 'session', 31 * 60, this.J); this.T = new mboxPC('PC', 1209600, this.J); this.w = new mboxUrlBuilder(C, b); this.U(this.w, I); this.V = new Date().getTime(); this.W = this.V; var X = this; this.addOnLoad(function() { X.W = new Date().getTime(); }); if (this.G) { this.addOnLoad(function() { X.E = true; X.getMboxes().each(function(Y) { Y.setFetcher(new mboxAjaxFetcher()); Y.finalize(); }); }); this.limitTraffic(100, 10368000); if (this.H) { this.Z(); this._ = new mboxSignaler(function(ab, c) { return X.create(ab, c); }, this.J); } }};mboxFactory.prototype.isEnabled = function() { return this.H;};mboxFactory.prototype.getDisableReason = function() { return this.J.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.G;};mboxFactory.prototype.disable = function(bb, cb) { if (typeof bb == 'undefined') { bb = 60 * 60; } if (typeof cb == 'undefined') { cb = 'unspecified'; } if (!this.isAdmin()) { this.H = false; this.J.setCookie('disable', cb, bb); }};mboxFactory.prototype.enable = function() { this.H = true; this.J.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(db, bb) {};mboxFactory.prototype.addOnLoad = function(eb) { if (this.isDomLoaded()) { eb(); } else { var fb = false; var gb = function() { if (fb) { return; } fb = true; eb(); }; this.hb.push(gb); if (this.isDomLoaded() && !fb) { gb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.W - this.V;};mboxFactory.prototype.getEllapsedTimeUntil = function(ib) { return ib - this.V;};mboxFactory.prototype.getMboxes = function() { return this.F;};mboxFactory.prototype.get = function(ab, jb) { return this.F.get(ab).getById(jb || 0);};mboxFactory.prototype.update = function(ab, c) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var X = this; this.addOnLoad(function() { X.update(ab, c); }); return; } if (this.F.get(ab).length() == 0) { throw "Mbox " + ab + " is not defined"; } this.F.get(ab).each(function(Y) { Y.getUrlBuilder() .addParameter('mboxPage', mboxGenerateId()); Y.load(c); });};mboxFactory.prototype.create = function( ab, c, kb) { if (!this.isSupported()) { return null; } var e = this.w.clone(); e.addParameter('mboxCount', this.F.length() + 1); e.addParameters(c); var jb = this.F.get(ab).length(); var lb = this.D + '-' + ab + '-' + jb; var mb; if (kb) { mb = new mboxLocatorNode(kb); } else { if (this.E) { throw 'The page has already been loaded, can\'t write marker'; } mb = new mboxLocatorDefault(lb); } try { var X = this; var nb = 'mboxImported-' + lb; var Y = new mbox(ab, jb, e, mb, nb); if (this.H) { Y.setFetcher( this.E ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } Y.setOnError(function(ob, n) { Y.setMessage(ob); Y.activate(); if (!Y.isActivated()) { X.disable(60 * 60, ob); window.location.reload(false); } }); this.F.add(Y); } catch (pb) { this.disable(); throw 'Failed creating mbox "' + ab + '", the error was: ' + pb; } var qb = new Date(); e.addParameter('mboxTime', qb.getTime() - (qb.getTimezoneOffset() * 60000)); return Y;};mboxFactory.prototype.getCookieManager = function() { return this.J;};mboxFactory.prototype.getPageId = function() { return this.L;};mboxFactory.prototype.getPCId = function() { return this.T;};mboxFactory.prototype.getSessionId = function() { return this.S;};mboxFactory.prototype.getSignaler = function() { return this._;};mboxFactory.prototype.getUrlBuilder = function() { return this.w;};mboxFactory.prototype.U = function(e, I) { e.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.S.getId()); if (!I) { e.addParameter('mboxFactoryId', this.D); } if (this.T.getId() != null) { e.addParameter('mboxPC', this.T.getId()); } e.addParameter('mboxPage', this.L); e.addParameter('screenHeight', this.M); e.addParameter('screenWidth', this.N); e.addParameter('browserWidth', this.O); e.addParameter('browserHeight', this.P); e.addParameter('browserTimeOffset', this.R); e.addParameter('colorDepth', this.Q); e.setUrlProcessAction(function(e) { e += '&mboxURL=' + encodeURIComponent(document.location); var rb = encodeURIComponent(document.referrer); if (e.length + rb.length < 2000) { e += '&mboxReferrer=' + rb; } e += '&mboxVersion=' + mboxVersion; return e; });};mboxFactory.prototype.sb = function() { return "";};mboxFactory.prototype.Z = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.E;};mboxFactory.prototype.K = function() { if (this.hb != null) { return; } this.hb = new Array(); var X = this; (function() { var tb = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var ub = false; var vb = function() { if (ub) { return; } ub = true; for (var i = 0; i < X.hb.length; ++i) { X.hb[i](); } }; if (document.addEventListener) { document.addEventListener(tb, function() { document.removeEventListener(tb, arguments.callee, false); vb(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); vb(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(tb, function() { if (document.readyState === 'complete') { document.detachEvent(tb, arguments.callee); vb(); } }); } else { var wb = function() { try { document.documentElement.doScroll('left'); vb(); } catch (xb) { setTimeout(wb, 13); } }; wb(); } } if (document.readyState === "complete") { vb(); } })();};mboxSignaler = function(yb, J) { this.J = J; var zb = J.getCookieNames('signal-'); for (var j = 0; j < zb.length; j++) { var Ab = zb[j]; var Bb = J.getCookie(Ab).split('&'); var Y = yb(Bb[0], Bb); Y.load(); J.deleteCookie(Ab); }};mboxSignaler.prototype.signal = function(Cb, ab ) { this.J.setCookie('signal-' + Cb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.F = new Array();};mboxList.prototype.add = function(Y) { if (Y != null) { this.F[this.F.length] = Y; }};mboxList.prototype.get = function(ab) { var B = new mboxList(); for (var j = 0; j < this.F.length; j++) { var Y = this.F[j]; if (Y.getName() == ab) { B.add(Y); } } return B;};mboxList.prototype.getById = function(Db) { return this.F[Db];};mboxList.prototype.length = function() { return this.F.length;};mboxList.prototype.each = function(p) { if (typeof p != 'function') { throw 'Action must be a function, was: ' + typeof(p); } for (var j = 0; j < this.F.length; j++) { p(this.F[j]); }};mboxLocatorDefault = function(g) { this.g = 'mboxMarker-' + g; document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Eb = document.getElementById(this.g); while (Eb != null) { if (Eb.nodeType == 1) { if (Eb.className == 'mboxDefault') { return Eb; } } Eb = Eb.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Fb = document.createElement('div'); Fb.className = 'mboxDefault'; var Gb = document.getElementById(this.g); Gb.parentNode.insertBefore(Fb, Gb); return Fb;};mboxLocatorNode = function(Hb) { this.Eb = Hb;};mboxLocatorNode.prototype.locate = function() { return typeof this.Eb == 'string' ? document.getElementById(this.Eb) : this.Eb;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(ab ) { var Y = mboxFactoryDefault.create( ab, mboxShiftArray(arguments)); if (Y) { Y.load(); } return Y;};mboxDefine = function(kb, ab ) { var Y = mboxFactoryDefault.create(ab, mboxShiftArray(mboxShiftArray(arguments)), kb); return Y;};mboxUpdate = function(ab ) { mboxFactoryDefault.update(ab, mboxShiftArray(arguments));};mbox = function(g, Ib, w, Jb, nb) { this.Kb = null; this.Lb = 0; this.mb = Jb; this.nb = nb; this.Mb = null; this.Nb = new mboxOfferContent(); this.Fb = null; this.w = w; this.message = ''; this.Ob = new Object(); this.Pb = 0; this.Ib = Ib; this.g = g; this.Qb(); w.addParameter('mbox', g) .addParameter('mboxId', Ib); this.Rb = function() {}; this.Sb = function() {}; this.Tb = null;};mbox.prototype.getId = function() { return this.Ib;};mbox.prototype.Qb = function() { if (this.g.length > 250) { throw "Mbox Name " + this.g + " exceeds max length of " + "250 characters."; } else if (this.g.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.g;};mbox.prototype.getParameters = function() { var c = this.w.getParameters(); var B = new Array(); for (var j = 0; j < c.length; j++) { if (c[j].name.indexOf('mbox') != 0) { B[B.length] = c[j].name + '=' + c[j].value; } } return B;};mbox.prototype.setOnLoad = function(p) { this.Sb = p; return this;};mbox.prototype.setMessage = function(ob) { this.message = ob; return this;};mbox.prototype.setOnError = function(Rb) { this.Rb = Rb; return this;};mbox.prototype.setFetcher = function(Ub) { if (this.Mb) { this.Mb.cancel(); } this.Mb = Ub; return this;};mbox.prototype.getFetcher = function() { return this.Mb;};mbox.prototype.load = function(c) { if (this.Mb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Lb = 0; var w = (c && c.length > 0) ? this.w.clone().addParameters(c) : this.w; this.Mb.fetch(w); var X = this; this.Vb = setTimeout(function() { X.Rb('browser timeout', X.Mb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var X = this; setTimeout(function() { X.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Lb) { return this.Lb; } this.setEventTime('activate' + ++this.Pb + '.start'); if (this.show()) { this.cancelTimeout(); this.Lb = 1; } this.setEventTime('activate' + this.Pb + '.end'); return this.Lb;};mbox.prototype.isActivated = function() { return this.Lb;};mbox.prototype.setOffer = function(Nb) { if (Nb && Nb.show && Nb.setOnLoad) { this.Nb = Nb; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Nb;};mbox.prototype.show = function() { this.setEventTime('show.start'); var B = this.Nb.show(this); this.setEventTime(B == 1 ? "show.end.ok" : "show.end"); return B;};mbox.prototype.showContent = function(Wb) { if (Wb == null) { return 0; } if (this.Fb == null || !this.Fb.parentNode) { this.Fb = this.getDefaultDiv(); if (this.Fb == null) { return 0; } } if (this.Fb != Wb) { this.Xb(this.Fb); this.Fb.parentNode.replaceChild(Wb, this.Fb); this.Fb = Wb; } this.Yb(Wb); this.Sb(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var B = this.showContent(this.getDefaultDiv()); this.setEventTime(B == 1 ? 'hide.end.ok' : 'hide.end.fail'); return B;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.mb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.Vb) { clearTimeout(this.Vb); } if (this.Mb != null) { this.Mb.cancel(); }};mbox.prototype.getDiv = function() { return this.Fb;};mbox.prototype.getDefaultDiv = function() { if (this.Tb == null) { this.Tb = this.mb.locate(); } return this.Tb;};mbox.prototype.setEventTime = function(Zb) { this.Ob[Zb] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Ob;};mbox.prototype.getImportName = function() { return this.nb;};mbox.prototype.getURL = function() { return this.w.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.w;};mbox.prototype._b = function(Fb) { return Fb.style.display != 'none';};mbox.prototype.Yb = function(Fb) { this.ac(Fb, true);};mbox.prototype.Xb = function(Fb) { this.ac(Fb, false);};mbox.prototype.ac = function(Fb, bc) { Fb.style.visibility = bc ? "visible" : "hidden"; Fb.style.display = bc ? "block" : "none";};mboxOfferContent = function() { this.Sb = function() {};};mboxOfferContent.prototype.show = function(Y) { var B = Y.showContent(document.getElementById(Y.getImportName())); if (B == 1) { this.Sb(); } return B;};mboxOfferContent.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferAjax = function(Wb) { this.Wb = Wb; this.Sb = function() {};};mboxOfferAjax.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferAjax.prototype.show = function(Y) { var cc = document.createElement('div'); cc.id = Y.getImportName(); cc.innerHTML = this.Wb; var B = Y.showContent(cc); if (B == 1) { this.Sb(); } return B;};mboxOfferDefault = function() { this.Sb = function() {};};mboxOfferDefault.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferDefault.prototype.show = function(Y) { var B = Y.hide(); if (B == 1) { this.Sb(); } return B;};mboxCookieManager = function mboxCookieManager(g, dc) { this.g = g; this.dc = dc == '' || dc.indexOf('.') == -1 ? '' : '; domain=' + dc; this.ec = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(g, h, bb) { if (typeof g != 'undefined' && typeof h != 'undefined' && typeof bb != 'undefined') { var fc = new Object(); fc.name = g; fc.value = escape(h); fc.expireOn = Math.ceil(bb + new Date().getTime() / 1000); this.ec.put(g, fc); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(g) { var fc = this.ec.get(g); return fc ? unescape(fc.value) : null;};mboxCookieManager.prototype.deleteCookie = function(g) { this.ec.remove(g); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(gc) { var hc = new Array(); this.ec.each(function(g, fc) { if (g.indexOf(gc) == 0) { hc[hc.length] = g; } }); return hc;};mboxCookieManager.prototype.saveCookies = function() { var ic = new Array(); var jc = 0; this.ec.each(function(g, fc) { ic[ic.length] = g + '#' + fc.value + '#' + fc.expireOn; if (jc < fc.expireOn) { jc = fc.expireOn; } }); var kc = new Date(jc * 1000); document.cookie = this.g + '=' + ic.join('|') + '; expires=' + kc.toGMTString() + '; path=/' + this.dc;};mboxCookieManager.prototype.loadCookies = function() { this.ec = new mboxMap(); var lc = document.cookie.indexOf(this.g + '='); if (lc != -1) { var mc = document.cookie.indexOf(';', lc); if (mc == -1) { mc = document.cookie.indexOf(',', lc); if (mc == -1) { mc = document.cookie.length; } } var nc = document.cookie.substring( lc + this.g.length + 1, mc).split('|'); var oc = Math.ceil(new Date().getTime() / 1000); for (var j = 0; j < nc.length; j++) { var fc = nc[j].split('#'); if (oc <= fc[2]) { var pc = new Object(); pc.name = fc[0]; pc.value = fc[1]; pc.expireOn = fc[2]; this.ec.put(pc.name, pc); } } }};mboxSession = function(qc, rc, Ab, sc, J) { this.rc = rc; this.Ab = Ab; this.sc = sc; this.J = J; this.tc = false; this.Ib = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.rc); if (this.Ib == null || this.Ib.length == 0) { this.Ib = J.getCookie(Ab); if (this.Ib == null || this.Ib.length == 0) { this.Ib = qc; this.tc = true; } } J.setCookie(Ab, this.Ib, sc);};mboxSession.prototype.getId = function() { return this.Ib;};mboxSession.prototype.forceId = function(uc) { this.Ib = uc; this.J.setCookie(this.Ab, this.Ib, this.sc);};mboxPC = function(Ab, sc, J) { this.Ab = Ab; this.sc = sc; this.J = J; this.Ib = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : J.getCookie(Ab); if (this.Ib != null) { J.setCookie(Ab, this.Ib, sc); }};mboxPC.prototype.getId = function() { return this.Ib;};mboxPC.prototype.forceId = function(uc) { if (this.Ib != uc) { this.Ib = uc; this.J.setCookie(this.Ab, this.Ib, this.sc); return true; } return false;};mboxGetPageParameter = function(g) { var B = null; var vc = new RegExp(g + "=([^\&]*)"); var wc = vc.exec(document.location); if (wc != null && wc.length >= 2) { B = wc[1]; } return B;};mboxSetCookie = function(g, h, bb) { return mboxFactoryDefault.getCookieManager().setCookie(g, h, bb);};mboxGetCookie = function(g) { return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain = function() { var dc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var xc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!xc.exec(dc)) { var yc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(dc); if (yc) { dc = yc[0]; } } return dc ? dc: "";};mboxShiftArray = function(zc) { var B = new Array(); for (var j = 1; j < zc.length; j++) { B[B.length] = zc[j]; } return B;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 40; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('recreationalequipmen.tt.omtrdc.net', 'recreationalequipmen', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin16.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=recreationalequipmen.tt.omtrdc.net' + '&clientCode=recreationalequipmen"><' + '\/scr' + 'ipt>');};mboxScPluginFetcher = function(b, Ac) { this.b = b; this.Ac = Ac;};mboxScPluginFetcher.prototype.Bc = function(w) { w.setBasePath('/m2/' + this.b + '/sc/standard'); this.Cc(w); var e = w.buildUrl(); e += '&scPluginVersion=1'; return e;};mboxScPluginFetcher.prototype.Cc = function(w) { var Dc = [ "dynamicVariablePrefix","visitorID","vmk","ppu","charSet", "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName", "currencyCode","variableProvider","channel","server", "pageType","transactionID","purchaseID","campaign","state","zip","events", "products","linkName","linkType","resolution","colorDepth", "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth", "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3", "visitorSampling","visitorSamplingGroup","dynamicAccountSelection", "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks", "trackExternalLinks","trackInlineStats","linkLeaveQueryString", "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters", "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ]; for (var j = 0; j < Dc.length; j++) { this.Ec(Dc[j], w); } for (var j = 1; j <= 75; j++) { this.Ec('prop' + j, w); this.Ec('eVar' + j, w); this.Ec('hier' + j, w); }};mboxScPluginFetcher.prototype.Ec = function(g, w) { var h = this.Ac[g]; if (typeof(h) === 'undefined' || h === null || h === '') { return; } w.addParameter(g, h);};mboxScPluginFetcher.prototype.cancel = function() { };mboxStandardScPluginFetcher = function(b, Ac) { mboxScPluginFetcher.call(this, b, Ac);};mboxStandardScPluginFetcher.prototype = new mboxScPluginFetcher;mboxStandardScPluginFetcher.prototype.getType = function() { return 'standard';};mboxStandardScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.Bc(w); document.write('<' + 'scr' + 'ipt src="' + e + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxAjaxScPluginFetcher = function(b, Ac) { mboxScPluginFetcher.call(this, b, Ac);};mboxAjaxScPluginFetcher.prototype = new mboxScPluginFetcher;mboxAjaxScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.Bc(w); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxScPluginFetcher.prototype.getType = function() { return 'ajax';};function mboxLoadSCPlugin(Ac) { if (!Ac) { return null; } Ac.m_tt = function(Ac) { var Fc = Ac.m_i('tt'); Fc.H = true; Fc.b = 'recreationalequipmen'; Fc['_t'] = function() { if (!this.isEnabled()) { return; } var Y = this.Hc(); if (Y) { var Ub = mboxFactoryDefault.isDomLoaded() ? new mboxAjaxScPluginFetcher(this.b, this.s) : new mboxStandardScPluginFetcher(this.b, this.s); Y.setFetcher(Ub); Y.load(); } }; Fc.isEnabled = function() { return this.H && mboxFactoryDefault.isEnabled(); }; Fc.Hc = function() { var ab = this.Ic(); var Fb = document.createElement('DIV'); return mboxFactoryDefault.create(ab, new Array(), Fb); }; Fc.Ic = function() { var Jc = this.s.events && this.s.events.indexOf('purchase') != -1; return 'SiteCatalyst: ' + (Jc ? 'purchase' : 'event'); }; }; return Ac.loadModule('tt');};
/* $Id: dropDown.js 3024 2012-05-24 17:01:47Z agersho $ */

/* All Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php, http://www.gnu.org/licenses/gpl.html */

/*Superfish v1.3.1  - jQuery menu widget Copyright (c) 2007 Joel Birch */
/* Custom settings used for delay and speed. REI  5/28/08  delay: 500, speed: 400*/
/* Patched by REI 6/20/2008 */


//SHOP REI: Clearance tab hack

(function($){
    $.fn.superfish = function(o){
		var $sf = this,
			defaults = {
			hoverClass	: 'sfHover',
			pathClass	: 'overideThisToUse',
			delay		: 500,
			animation	: {opacity:'show'},    
			speed		: 400    
		},
		over = function(){
				clearTimeout(this.sfTimer);
				clearTimeout($sf[0].sfTimer);
				$(this)
				.showSuperfishUl()
				.siblings()
				.hideSuperfishUl();
				
				//Add bottom border; count of the number of ul and apply the correct width to the container div: catitemsWrapper
				var catitemWrapper = $(this).children('.catitemsWrapper');
				var numUl = $(".sfHover").children('.catitemsWrapper').children('ul').length;
				$(catitemWrapper).addClass("Column"+ numUl);
				$(catitemWrapper).addClass("catitemsWrapperBorder");
								
				//Get width of container div: catitemsWrapper
				var widthcatitemsWrapper = $(catitemWrapper).width();
				
				//Get width of #hunt3
				var hunt3Width = $("ul#hunt3").width();
								
				//check to see if .sfHover exist; if so get li sfHover position
				if ($('.sfHover').length) {
					var curLiPosition = $(".sfHover").position().left;
				}

				//Calculate the amount of overhang of the catitemWrapper
				var offsetWrapper =  hunt3Width - (curLiPosition + widthcatitemsWrapper - 9);
								
				//If the dropdown menu + location is greater than the overall width of the page...move the catitemWrapper to the left (pixel difference).
				if ((curLiPosition + widthcatitemsWrapper) > hunt3Width) {
					$(catitemWrapper).css('left', offsetWrapper);
				}
				
			},
		out = function(){
				var $$ = $(this);
				if ( !$$.is('.'+o.bcClass) ) {
					this.sfTimer=setTimeout(function(){
						$$.hideSuperfishUl();
						if (!$('.'+o.hoverClass,$sf).length) { 
							over.call($currents.hideSuperfishUl());
						}
					},o.delay);
				}
			};
		$.fn.extend({
			hideSuperfishUl : function(){
				return this
					.removeClass(o.hoverClass)
					.find('div ul:visible')
						.hide()
					.end();
			},
			showSuperfishUl : function(){
				//remove bottom border
				$('.catitemsWrapper').removeClass("catitemsWrapperBorder");
				return this
					.addClass(o.hoverClass)
					.find('>div ul:hidden')
						.animate(o.animation,o.speed)
					.end();
			},
			applySuperfishHovers : function(){
				return this[($.fn.hoverIntent) ? 'hoverIntent' : 'hover'](over,out);
			}
		});
		o = $.extend({bcClass:'sfbreadcrumb'},defaults,o || {});
		var $currents = $('li:has(div ul)',this).filter('.'+o.pathClass);
		if ($currents.length) {
			$currents.each(function(){
				$(this).removeClass(o.pathClass).addClass(o.hoverClass+' '+o.bcClass);
			});
		}
		var $sfHovAr=$('li:has(div ul)',this)
			.applySuperfishHovers(over,out)
/* commented out .find('a').each(superfishFocusBlur) for performance - glowney & tguffee 6/08 */
/*			.find('a')
			.each(superfishFocusBlur)
*/			.end()
			.not('.'+o.bcClass)
				.hideSuperfishUl()
			.end();
		$(window).unload(function(){
			$sfHovAr.unbind('mouseover').unbind('mouseout');
		});
		return this.addClass('superfish').blur(function(){
			out.call(this);
		});
	};

function superfishFocusBlur(){
			var $a = $(this), $li = $a.parents('li');
			$a.focus(superfishOverCall).blur(superfishRemoveClass);
}
function superfishOverCall(){
			over.call($li);
			return false;
}		
function superfishRemoveClass(){
			$li.removeClass(o.hoverClass);
}	

/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * @name bgiframe
 * @type jQuery
 * @cat Plugins/bgiframe
 *
 * Version 2.1.1
 * Custom settings used for $.extend. REI  5/28/08 top:'-1px',left:'0px',width:'180px' 
 */
$.fn.bgIframe = $.fn.bgiframe = function (s) {
    if ($.browser.msie6) {
        s = $.extend({
            top: '-1px', left: '0px', width: '180px', height: 'auto', opacity: true, src: 'javascript:false;'
        },
        s || {
        });
        var prop = function (n) {
            return n && n.constructor == Number? n + 'px': n;
        },
        html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' +(s.opacity !== false? 'filter:Alpha(Opacity=\'0\');': '') + 'top:' +(s.top == 'auto'? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')': prop(s.top)) + ';' + 'left:' +(s.left == 'auto'? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')': prop(s.left)) + ';' + 'width:' +(s.width == 'auto'? 'expression(this.parentNode.offsetWidth+\'px\')': prop(s.width)) + ';' + 'height:' +(s.height == 'auto'? 'expression(this.parentNode.offsetHeight+\'px\')': prop(s.height)) + ';' + '"/>';
        return this.each(function () {
            if ($('> iframe.bgiframe', this).length == 0) {
            this.insertBefore(document.createElement(html), this.firstChild);
            }
        });
    }
    return this;
};

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
* Custom settings used for sensitivity setting. REI  5/28/08 sensitivity:6 
*/
$.fn.hoverIntent=function(f,g){var cfg={sensitivity:6,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};

})(jQuery);

// init dropDown from rei.js

/* $Id: oo_engine.js 1914 2012-03-30 17:26:26Z jowilso $ */

/* OnlineOpinion (S3tS v3.1.1) 
Multiple links on same page - support added 10-16-2009 - jvernon
*/

/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

var custom_var,
_sp = '%3A\\/\\/',
_rp = '%3A//',
_poE = 0.0,
_poX = 0.0,
_sH = screen.height,
_d = document,
_w = window,
_ht = escape(_w.location.href),
_hr = _d.referrer,
_tm = (new Date()).getTime(),
_kp = 0,
_sW = screen.width;
function _fC(_u) {
    _aT = _sp + ',\\/,\\.,-,_,' + _rp + ',%2F,%2E,%2D,%5F';
    _aA = _aT.split(',');
    for (i = 0; i < 5; i++) {
        eval('_u=_u.replace(/' + _aA[i] + '/g,_aA[i+5])')
    }
    return _u
};
function O_LC(new_domain) {
    _domain = _ht.replace('https%3A//', '').replace('http%3A//', '');
    if (typeof new_domain == 'undefined' || new_domain == '') {
        _sp = '%3A\\/\\/';
        _rp = '%3A//'
    } else {
        _sp = '%3A\\/\\/' + _domain.substr(0, _domain.indexOf('/'));
        _rp = '%3A//' + new_domain
    }
    _w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1=' + _tm + '&time2=' + (new Date()).getTime() + '&prev=' + _fC(escape(_hr)) + '&referer=' + _fC(_ht) + '&height=' + _sH + '&width=' + _sW + '&custom_var=' + custom_var, 'comments', 'width=535,height=192,screenX=' + ((_sW - 535) / 2) + ',screenY=' + ((_sH - 192) / 2) + ',top=' + ((_sH - 192) / 2) + ',left=' + ((_sW - 535) / 2) + ',resizable=yes,copyhistory=yes,scrollbars=no')
};
function _fPe() {
    if (Math.random() >= 1.0 - _poE) {
        O_LC();
        _poX = 0.0
    }
};
function _fPx() {
    if (Math.random() >= 1.0 - _poX) O_LC()
};
window.onunload = _fPx;
function O_GoT(_p) {
    _d.write('<a href=\'javascript:O_LC()\'>' + _p + '</a>');
    _fPe()
}
/* $Id: minicart.class.js 4490 2012-08-06 16:12:58Z jspires $ */

// Requirements: 
//	jQuery
//  jQuery.carousel
//  jQuery.highlightFade.js
//  thickbox
//  12:32

function Minicart() {
// Private Properties and Methods   
	var miniCartAvailableArrow = $(document.getElementById('unvHeader'));
	var itemAddedToCartMsg = 0; 
	var m = 0;  // minicart
	var mc = 0; // Minicart Carousel
	var cartData = 0;
	var itemsInCart = 0;
	var cartSubtotal = 0;
	var isVisible = false;
	var isBusy = true;  // Used to prevent internal actions while busy
	var timeoutHide = 0;
	var carouselItems = 0;
	var state = "";
	var originalAddToCartHtml = 0;
	var whenNoLongerBusyFunction = 0;
	var dontHide = false;
	var mclick = false;
	var publicState = "busy";
	var scrollToTopEnabled = true;
	var beforeSubmitFunction = function(){};
	var onCompleteFunction = function(){};
	var onSuccessFunction = function(){};
	var onErrorFunction = function(){};
	var me = this;
	var wlProdRow = null;
	var wlNoteRow = null;
	var toUrl ;
	// TODO What to do if the AJAX call fails?
	//Rashmi: Stewardship Release 1: Commented because we won't be using minicart.jsp
	/*var minicartHTML = '<div id="minicartContainer"></div>';
	if (REIMinicartURL && REIMinicartURL.length > 0) {
		jQuery.ajax({
	    	url: REIMinicartURL,
         	success: function(result) {
            	minicartHTML = result;
            },
         	async: false
    	});
	}*/
	var template = { 
			images: ["/etc/static/rei-wcm/pix/minicart/arrow_carousel_left.png",
			         "/etc/static/rei-wcm/pix/minicart/arrow_carousel_right.png",
			         "/etc/static/rei-wcm/pix/minicart/carousel_bkgrnd_left.png",
			         "/etc/static/rei-wcm/pix/minicart/carousel_bkgrnd_right.png",
			         "/etc/static/rei-wcm/pix/minicart/checkmark_green.png",
			         "/etc/static/rei-wcm/pix/common/successChkMark_19x18.gif"],	
		    minicart : '\
						 <div id="minicartContainer">\
							<div id="minicart" class="minicart">\
								<div id="minicartBusy">\
									<div class="loadingMsg"><img src="/etc/static/rei-wcm/pix/minicart/ajax-loader.gif" alt=""/></div>\
								</div>\
								<div id="minicartError">\
									<div class="errorMsg">We\'re unable to display this view of your cart right now. Don\'t worry. This temporary issue doesn\'t affect your cart contents.</div>\
								</div>\
								<div class="minicartMain" id="minicartMain">\
									<h3 class="lineA" style="display:none;"><span id="itemAddedMsg"><img src="/etc/static/rei-wcm/pix/minicart/checkmark_green.png" alt=""/>This Item Was Added to Your Cart</span></h3>\
									<ul id="minicartCarousel" class="minicartCarouselStyle"></ul>\
									<div id="minicartCarouselPlaceholder"></div>\
									<div class="horizdots"> </div>\
									<p id="lineB">Total Items in Cart:&nbsp;&nbsp;<a href="/ShoppingCart?storeId=' + storeId + '" id="minicartQuantity">0</a></p>\
									<div class="horizdots"> </div>\
									<p id="lineC">Merchandise Subtotal:&nbsp;&nbsp;<span id="minicartSubtotal">$0.00</span></p>\
									<div class="horizdots"> </div>\
									<div id="lineD" class="cf">\
										<a href="/CheckoutLoginView?storeId=' + storeId + '" id="minicartCheckoutBtnLink" class="hdrLink_checkoutBtn button primary" style="float:right">checkout</a>\
										<div id="minicartNonBtn"><a href="#" onclick="javascript:minicart.hideCart(); return false;" id="minicartClose">Continue Shopping</a>|<a href="/ShoppingCart?storeId=' + storeId + '" id="minicartViewCart">View Your Cart</a></div>\
									</div>\
									<div id="lineE">\
									</div>\
								</div>\
							</div>\
						</div>',
			carousel : '<ul id="minicartCarousel" class="minicartCarouselStyle"></ul>'
	}; // end template

	// Common support functions
    function ltrim(s){if(typeof(s)!="string"){s = "";}var l=0;while(l<s.length&&s[l]==' '){l++;}return s.substring(l,s.length);}
    function rtrim(s){if(typeof(s)!="string"){s="";}var r=s.length-1;while(r>0&&s[r]==' '){r-=1;}return s.substring(0,r+1);}
    function trim(s){if(typeof(s)!="string"){s="";}return rtrim(ltrim(s));}
    function isBlankString(testString){if(typeof testString=="string"){return(testString=="");}return true;}
    function formatDollars(num) {
    	num = num.toString().replace(/\$|\,/g,'');
    	if(isNaN(num)) num = "0";
    	sign = (num == (num = Math.abs(num)));
    	num = Math.floor(num*100+0.50000000001);
    	cents = num%100;
    	num = Math.floor(num/100).toString();
    	if(cents<10) cents = "0" + cents;
    	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    	num = num.substring(0,num.length-(4*i+3))+','+
    	num.substring(num.length-(4*i+3));
    	return (((sign)?'':'-') + '$' + num + '.' + cents);
    }
    function replaceValuesInQuerystring(url,param,value) {
        var re = new RegExp("([?|&])" + param + "=.*?(&|$)","i");
        if (url && url.match(re))
            return url.replace(re,'$1' + param + "=" + value + '$2');
        else
            return url + '&' + param + "=" + value;
    }
    function getValueInQuerystring(url,param) {
    	if (typeof(url)=='string'&&typeof('param')=='string') {
    		var splitUrl = url.split('?');
    		if (splitUrl.length>1) {
    			var vars = splitUrl[1].split("&");
    			for (var i=0;i<vars.length;i++) {
    				var pair = vars[i].split("=");
    				if (pair.length>=1) {
    					if (pair[0]==param) {
    						if (pair.length>1) {
    							return pair[1];
    						} 
    					}
    			  	}
    		  } 
    	  }
    	} 
    	return null;
    }
    String.prototype.wordWrap = function(m, b, c){
        var i, j, l, s, r;
        if(m < 1)
            return this;
        for(i = -1, l = (r = this.split("\n")).length; ++i < l; r[i] += s)
            for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ""))
                j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length
                || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        return r.join("\n");
    };
    function loadImages(i) {
    	// Background loding minicart images
    	if (i==undefined) i=0;
    	if (i<template.images.length) {
    		$(new Image())
    			.load(function() {loadImages(i+1);})
    			.error(function() {loadImages(i+1);})
    			.attr('src',template.images[i]);
    	} 
    }
    function hide(delay) {
		cancelHide();
		if (!delay) delay=0;
		if (!dontHide) {
			if ((isNaN(delay)||delay==0)&&!isBusy) {
				if (isVisible) {
					setState("busy");
					$(m.find('div.jcarousel-container')).unbind().empty();
					$("#minicartCheckoutBtn").hide();
					itemAddedToCart.hide();
					m.hide();
					isVisible=false;
					setState("ready");
					
					//undo arrow styling when cart closes
					$("#miniCartAvailableArrow", "#topBar_right").removeClass('menuActive');
							$("#miniCartAvailableArrow img", "#topBar_right").attr("src", "/etc/static/rei-wcm/pix/common/arrow_tiny_help_AE9E8B.png");
					$("#miniCartAvailableArrow", "#unvHeader").unbind("mouseenter mouseleave");
					$("#minicartContainer").trigger("hideCart");
					$("h3.lineA").hide();
				}
			}
			else {
				timeoutHide = setTimeout(function() {
				hide(0);
				},delay);
			}
		}
    }
    function scrollToTop() {
    	if (scrollToTopEnabled) {
    		$('html, body').animate({scrollTop:0}, 0);
    	}
    }
    
    function cssModify(fix) {
    	if (typeof(fix)=="string") {
	    	switch(fix.toLowerCase()) {
	    		case "thickbox":
	    			$("#TB_overlay").css({
	    				"z-index":"9070"
	    			});
	    			var TB_window = $("#TB_window").css({
	    				"z-index":"9070"
	    			});
	    			$("#TB_ajaxContent",TB_window).css({
	    				"padding-left":"20px"
	    			});
	    			$("div.splash",TB_window).css({
	    				"margin":"0 15px 0 11px"
	    			});
	    			$("h, p",TB_window).css({
	    				"font":"#333"
	    			});
	    			$("h2",TB_window).css({
	    				"font-size":"14px"
	    			});
	    			$("h1",TB_window).css({
	    				"line-height":"27px",
	    				"margin-top":"20px"
	    			});
	    			$("#acceptCssButton",TB_window).css({"margin-right":"18px"});
	    			$("table.shoppingCart",TB_window).css({"width":"670px"});
	    			$("th.product,td.product",TB_window).css({"text-align":"left"});
	    			$("tr.tr2",TB_window).css({"background-color":"#E5E5E5"});
	    			$("tr.tr0",TB_window).css({"background-color":"#FFFFFF"});
	    			$("ul.productDesc,ul.quantity",TB_window).css({"list-style":"none outside none"});
	    			$("li",TB_window).css({"line-height":"18px"});
	    			$("li a,p a", TB_window).css({"text-decoration":"underline"});
	    			$("li a:link,li a:visited,p a:link,p a:visited", TB_window).css({"color":"#668800"});
	    			break;
	    		case "minicart" :
	    			var userAgent = navigator.userAgent.toLowerCase();
	    			if (/chrome/.test( userAgent )) {
	    				$(".minicartProductName", m).css({"font-size":"11px"});
	    			}
	    			break;

	    	}
    	}
    	
    }
    
    function whileBusy(busyFunction, noLongerBusyFunction) {
    	busyFunction();
    	if ($.isFunction(noLongerBusyFunction)) {
    		whenNoLongerBusyFunction = noLongerBusyFunction;
    	}
    }
    
    function whenNoLongerBusy() {
    	if ($.isFunction(whenNoLongerBusyFunction)) {
    		whenNoLongerBusyFunction();
    		whenNoLongerBusyFunction = 0;
    	}
    }
	
	function itemLoadCallbackFunction(carousel, state) 	{
	}
	
	function flashItemAddedToCart() {
		itemAddedToCart.show();
		$("h3.lineA").show().highlightFade({color:'#F6F4F2',speed:2000,iterator:'sinusoidal'});
	}
	
	function setState(stateProperties) {
		stateProperties = (""+stateProperties).toLowerCase();
		if  (stateProperties.indexOf("busy")>=0) {
			isBusy = true;
			state = "busy";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").hide();
				$("#minicartBusy").show();
				$("#minicartMain").hide();
			}
		} else if (stateProperties.indexOf("ready")>=0) {
			isBusy = false;
			state = "ready";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").hide();
				$("#minicartBusy").hide();
				$("#minicartMain").show();
			} 	
		} else if (stateProperties.indexOf("error")>=0) {
			isBusy = false;
			state = "error";
			if (stateProperties.indexOf("show")>=0) {
				$("#minicartError").show();
				$("#minicartBusy").hide();
				$("#minicartMain").hide();
			} 	
		}
	}
	
	function getState() {
		return state;
	}
	
	function cancelHide() {
		clearTimeout(timeoutHide);
	}
	
	function appendMinicartToContainer() {
		miniCartAvailableArrow.after(template.minicart);
		m = $(document.getElementById('minicartContainer'));
		m.hide();
		mc = 0;
		mOriginalWidth = m.outerWidth();
		itemAddedToCart = $("#itemAddedMsg",m);
		itemAddedToCart.hide();
		$("#minicartClose",m).click(hide);
	}
	
	function compareOrderItemId(thisItem,thatItem){
		//return thatItem.createDate - thisItem.createDate;
		return thatItem.createDateInMilliSec - thisItem.createDateInMilliSec;
	}
	
	function formatTwoLineDescription(s) {
		s = s.wordWrap(24, "|", 1);
		var lines = s.split("|");
		var returnVal = 0;
		returnVal = {"firstLine":trim(lines[0]),"secondLine":null,"thirdLine":null};
		return returnVal;
	}

	function refreshCart() {
		carouselItems = 0;
		var scratch = $(m.find('div.jcarousel-container'));
		if (scratch.length>0) {
			scratch.replaceWith(template.carousel);
		} else {
			$(m.find('#minicartCarousel')).replaceWith(template.carousel);
			$("#minicartCarouselPlaceholder",m).show();
		}
		mc = 0;
		if (cartData!=null&&cartData!=undefined) {
			setState("ready show");
			var html = "";
			var itemQuantity = 0;
			var cartQuantity = 0;
			var itemPrice = 0;
			var itemSalePrice = 0;
			var itemSavedAmount = 0;
			var itemTotalPrice = 0;
			var cartPrice = 0;
			var scratch = 0;
			// For each Item:
			cartData.order.orderItems.sort(compareOrderItemId);
			$.each(cartData.order.orderItems, function(i,item) {
			    var hiddenFlag = item.hiddenFlag;
			    if (hiddenFlag == 1){
			     return;
			    }
				var scratch = parseInt(item.quantity),
				priceInfo = [];
				itemQuantity = (isNaN(scratch))?0:scratch;
				cartQuantity += itemQuantity;
				
				scratch = parseFloat(item.totalProductPrice);
				cartPrice += (isNaN(scratch))?0:scratch;
				
				scratch = parseFloat(item.price);
				itemPrice = (isNaN(scratch))?0:scratch;
				itemSalePrice = parseFloat(item.compareAtPrice).toFixed(2);
				itemSavedAmount = parseFloat(item.totalSavings).toFixed(2);
				itemTotalPrice = parseFloat(item.totalProductPrice).toFixed(2);
				carouselItems++;

				//Build Price Info
				if((itemSavedAmount == 0) || (isNaN(itemSalePrice)) || (isNaN(itemSavedAmount))) {
					priceInfo.push(["Price: ", formatDollars(itemPrice)]);
				}else if (itemSalePrice == 0) {
					priceInfo.push(["Original price: " + "<span class='priceOriginal'>", formatDollars(itemPrice) + "</span>"]);
					priceInfo.push(["<span class='priceSaved'>" + "You save: ", formatDollars(itemSavedAmount) + "</span>"]);
						if (itemTotalPrice != 0) {
							priceInfo.push(["<strong>" + "Unit price: ", formatDollars(itemTotalPrice / itemQuantity) + "</strong>"]);
						} else {
							priceInfo.push(["<strong>" + "Unit price: ", "FREE" + "</strong>"]);
						}
				}else {
					priceInfo.push(["Original price: " + "<span class='priceOriginal'>", formatDollars(itemSalePrice) + "</span>"]);
					priceInfo.push(["<span class='priceSaved'>" + "You save: ", formatDollars(itemSavedAmount) + "</span>"]);
					priceInfo.push(["<strong>" + "Unit price: ", formatDollars(itemPrice) + "</strong>"]);
				}
							
				var itemLi = document.createElement("LI");
				var itemImg = document.createElement("IMG");
				
					var attr = document.createAttribute("height");
					attr.value = "80";
					itemImg.setAttributeNode(attr);
					
					attr = document.createAttribute("width");
					attr.value = "80";
					itemImg.setAttributeNode(attr);
					
					//attr = document.createAttribute("alt");
					//attr.value = item.skuDescription;
					//itemImg.setAttributeNode(attr);
					
					attr = document.createAttribute("src");
					attr.value = "/skuimage/" + item.sku + "/80";
					itemImg.setAttributeNode(attr);
				
				itemLi.appendChild(itemImg);
				
					var itemDiv = document.createElement("DIV");
					var skuDescription = formatTwoLineDescription(item.skuDescription);
					attr = document.createAttribute("class");
					attr.value = "minicartProductName";
					itemDiv.setAttributeNode(attr);
					
					itemDiv.appendChild(document.createTextNode(skuDescription.firstLine));
					if (skuDescription.secondLine) {
						itemDiv.appendChild(document.createElement("br"));
						itemDiv.appendChild(document.createTextNode(skuDescription.secondLine));
						// Ellipses ?
					}
					
					itemDiv.appendChild(document.createElement("br"));
					
					itemDiv.appendChild(document.createTextNode("Quantity: "));
					var _quantity = document.createElement("strong");
					_quantity.appendChild(document.createTextNode(itemQuantity));
					itemDiv.appendChild(_quantity);				
					itemDiv.appendChild(document.createElement("br"));
	
					//Display Price
					for(var i = 0; i < priceInfo.length; i++){
						$(itemDiv).append(
							priceInfo[i][0] + priceInfo[i][1] + '<br />'
						);
					}
		
						var itemA = document.createElement("A");
						
						attr = document.createAttribute("href");
						attr.value = "/ShoppingCart?storeId=" + storeId;
						itemA.setAttributeNode(attr);
						
						itemA.appendChild(document.createTextNode("Edit"));
						
						itemDiv.appendChild(itemA);
						
					itemLi.appendChild(itemDiv);
					
				$("#minicartCarousel",m).append(itemLi);
				
			});
			if (carouselItems>0) {
				$(m.find('#minicartCarousel')).jcarousel({
					"start": 1,
/* jmontgo Jan2011 for @qc2194, see http://sorgalla.com/projects/jcarousel/
window-resize triggers error */
					itemFallbackDimension:248,
					"scroll": 1
                });
				$("#minicartCarouselPlaceholder",m).hide();
			}
			hdrObj.setCartStatus(cartQuantity);
			$("#minicartQuantity",m).text(cartQuantity);
			$("#minicartSubtotal",m).text(formatDollars(cartPrice));
			$("#minicartCheckoutBtnLink").attr("href",$("#checkoutLink").attr("href"));
			$("#minicartCheckoutBtn").css({
						"background":"url(\"/etc/static/rei-wcm/pix/checkout/checkout_button_bkgrnd_orange.png\") no-repeat center center"
			});
			var lastLine = $("lineD");
			$("#minicartViewCart",lastLine).each(function() {
				$(this).mouseover(function() {
					manual_cm_sp();
				});
			});
			
			//set arrow styling when the cart is open
			$(document.getElementById('miniCartAvailableArrow')).addClass('menuActive');
		}
		$(document.getElementById('minicartCheckoutBtn')).show();
		cssModify("minicart");
		
		setState("ready show");
		m.mouseover(function() {
			cancelHide();
		});
		m.mouseout(function() {
			hide(5000);
		});
		hide(5000);
	}
	
	function parseJSON( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}
		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();
		} else {
			return null;
		}
	}
	
	function goWithTheOldFlow(serviceCallURL) {
		var oldUrl = "&URL=" + escape("/minicart?storeId=" + storeId);
		var newUrl = "&URL=" + escape("/ShoppingCart?storeId=" + storeId);
		serviceCallURL = serviceCallURL.replace(oldUrl,newUrl);
		window.location.href = serviceCallURL;
	}

	/**
	 * This function adds item to cart and if added successfully then opens the minicart.
	 *  If serviceCallURL is passed, then AJAX call is made to respective URL or web-service for adding items to cart. 
	 *       Currently supports add to cart workflow URLs, '/AddItemToCart & '/REIOrderItemUpdate'.
	 *       Currently supports view cart web service, /minicart = /minicart
	 *       Currently supports add to cart web-service , '/rest/cart/item'.
	 * @param serviceCallURL - The AJAX URL
	 * @param successCallBack - Function to be run if the AJAX call succeeds
	 * @param errorCallback - Function to be run if the AJAX call fails
	 */
	
	function refreshCartData(serviceCallURL, successCallBack, errorCallBack) 
	{
		var prod = rei.prod;
		beforeSubmitFunction();
		setState("busy show");
		scrollToTop();
		cartData = null;
		
		if(serviceCallURL != null || serviceCallURL != "") 
		{
			serviceCallURL = replaceValuesInQuerystring(serviceCallURL,"URL",escape("/minicart?storeId=" + storeId));
			
			//If calling new Add to cart web service (currently called from product page only), 
			//then make sure guest user token is generated using web service and set in cookie before calling add to cart web service
			if(serviceCallURL.indexOf('/rest/cart/item') != -1)
			{
				_updateCartUsingWebService(serviceCallURL, successCallBack);
			}
			//Using workflow for add to cart
			else
			{
				_updateCartUsingWorkflow(serviceCallURL, successCallBack);
	
			}
		}
		else
		{
			 setState("error show");
			 window.location.href = "/Error";	
		}
		
		
		/**
		 * Function to enable div for displaying the error in minicart
		 */
		function _showErrorState(){
			onErrorFunction();
			setState("error show");
			$("#minicartContainer")
				.css('visibility','none')
				.show();
		};
		
		function _showError(serviceCallURL)
		{
			if(prod && prod.reenableCart)
			{
				prod.reenableCart();
			}
			//If not minicart then show error page
			if(serviceCallURL.indexOf("/minicart") == -1 && serviceCallURL.indexOf("/rest/cart.json") == -1)
			{
				window.location.href = "/Error";
			}
			//For minicart show error in minicart pop up
			else
			{
				_showErrorState();
			}
		};
		
		/**
		 * 	Private function supports the AJAX call for,
		 * 	1>  workflow for adding item to cart 
		 *  2>  showing minicart 
		 * @param serviceCallURL - The AJAX URL
		 * @param successCallBack - Function to be run if the AJAX call succeeds
		 */

		function _updateCartUsingWorkflow(serviceCallURL, successCallBack)
		{
			//Calling AJAX wrapper method of type GET
			rei.services.Read(serviceCallURL,{},{
						dataType: 'text',
						cache: false,
						success: function(data)
						{
							var returnedJson = null;
							try {
								returnedJson = parseJSON(data);
							}
							catch (e) {
								_showError(serviceCallURL);
							}
							//Take user to shopping cart, terms & conditions or back order page
							if (returnedJson==null) {
								//Redirect to Shopping Cart when backend returns the Shopping Cart Page.
								// Because the same request for adding an item to cart is being used for
								// the non-javascript and ajax code.
								if(data && (data.indexOf('<meta name="reiShortcut_requestUri" content="/ShoppingCart">') >= 0 || $(data).find("order").length) > 0)
								{
									var sId = window.storeId || "8000";
									window.location.href = '/ShoppingCart?storeId=' + sId;
									return true;
								}	
								//Show T & C page or Back order page
								goWithTheOldFlow(serviceCallURL);
							} 
							//Open minicart
							else {
								try {
									cartData = $.extend(true, {}, returnedJson);
									setState("ready show");
								}
								catch (e){
									_showError(serviceCallURL);
								}
								//Enable 'Add to cart' button
								if ($.isFunction(successCallBack)){
									successCallBack();
								}
								//Show desired page after item is added to cart and minicart shown
								if(toUrl != null && toUrl != '' )
								{
									toUrl = unescape(toUrl);
									window.location.href = toUrl;
								}
							}
						},
						error: function(jqXHR, textStatus, errorThrown){
							var errors =  $.parseJSON(jqXHR.responseText),
								statusCode = jqXHR.status,
								errorCodes = [];
							
							errors = (errors.error && $.isArray(errors.error)) ? errors.error : errors;
							
							if($.isArray(errors)){
								for(var i = 0; i < errors.length; i++){
									errorCodes.push(errors[i].code);
								}
							}

							/*
								FIX for ONLINE-12703 and INC203367 
								@desc	We are emptying the cookies and reloading the page for a user when the REI_SESSION_ID is empty.
							*/
							if(statusCode === 400 && ( $.inArray(1400, errorCodes) > -1 || !$.cookie("REI_SESSION_ID") )){
								setCookie("REI_SESSION_ID","");
								setCookie("REI_SSL_SESSION_ID","");
								setCookie("loggedin","");
								setCookie("rei_cart","0");
								setCookie("outlet_cart","");
								window.location.reload();
								return;
							}
							_showError(serviceCallURL);	
						}
					}
			);	
		};
		
		
		/**
		 * Sets "REI_SESSION_ID" in cookie with expiry of 14 days
		 * @param token
		 */
		function _setGuestUserCookie(token)
		{
			 // set time, it's in milliseconds
		    var today = new Date();
		    today.setTime( today.getTime() );
		    var expires = parseInt(14) * 1000 * 60 * 60 * 24;
		    var expires_date = new Date( today.getTime() + (expires) );
		    document.cookie = "REI_SESSION_ID=" +  token  + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
		};
		
		
		/**
		 * Private function making AJAX call to add to cart web service
		 * @param serviceCallURL -- add to cart webservice URL
		 * @param successCallBack - Function to be run if the AJAX call succeeds
		 */
		function _updateCartUsingWebService(serviceCallURL, successCallBack)
		{
			//Commented the below call cause it doesn't work with beforeSend
			//rei.services.Create(serviceCallURL,{},{
			jQuery.ajax({
			    type: "POST",
			    cache: false,
			    url: serviceCallURL,
			    dataType: "json",
						beforeSend:function(){
							//If user isn't logged in and guest cookie not set,
							//then make sure guest user token is generated using web service and is set in cookie before calling add to cart web service
							var loggedInUser = Get_Cookie("REI_SESSION_ID");
							if (loggedInUser == null || loggedInUser === "")
							{
								rei.services.Create('/rest/user/guest',{},{
					    	  		dataType: "text",
					    	  		async: false,
					    			success: function(token){
					    				//Set_Cookie("REI_SESSION_ID", json); Not using Set_Cookie because it escapes the token value due tp which the
					    				// guest user token returned by server doesn't match the one set in browser cookie
					    				//$.cookie("REI_SESSION_ID",token,{path:'/', expires: 10}); Can't use this cause even this encodes the token
					    				_setGuestUserCookie(token);
				
					    			},
					    			error: function(){
					    				_showError(serviceCallURL);
					    			}
					    		});
							}
						},						
						success:function(json, status, xhr){
							try {
									if(xhr != null)
									{
										if(xhr.status == '201' && status == 'success'){
											setState("ready show");
											//Show the moving to cart message for wishlist 
											var wLForm = $("form[id*=wishlistaddtocartform]");
											if(wLForm && $("#owner"))
		    								{
												if(wlNoteRow)
													wlNoteRow.hide();
												if(wlProdRow)
													wlProdRow.html("<td colspan='6'>" + "<p class='wishListCartAction'>" + "Moving to cart!" + "</p>" + "</td>").fadeOut(2000, function () {});															    									
		    								}	
											toUrl = getValueInQuerystring(serviceCallURL,"toUrl");//_getQueryStringParamVal("toUrl");
											//Open minicart	
											minicart.addToCart("/minicart?storeId="+storeId, successCallBack);		
										}
										else{
											_showError(serviceCallURL);
										}
									}
							}
							catch (e){
								_showError(serviceCallURL);
							}
						},
						error: function(xhr){
							if(xhr != null)
							{
								var status = xhr.status;
								var returnedError = jQuery.parseJSON(xhr.responseText); 
								var errorCode = null;
						    	if(returnedError != null)
						    	{
						    		errorCode = returnedError.error[0].code;
						    	}
								//Show back order page
						    	var backOrderErrors = new Array();
						    	backOrderErrors.push(3504);
						    	backOrderErrors.push(3505);
						    	backOrderErrors.push(3506);
						    	
						    	var termsCondErrors = new Array();
						    	termsCondErrors.push(3502);
						    	
						    	//If it isn't error because of backorder or termsconditions, then show error page.
						    	if(jQuery.inArray(errorCode,backOrderErrors) == -1 && jQuery.inArray(errorCode,termsCondErrors) == -1)
						    	{
						    		_showError(serviceCallURL);
						    		return;
						    	}
					    		//Show Terms and Conditions page
						    	//else if(status == '412' && (jQuery.inArray(errorCode,termsCondErrors) != -1  || xhr.responseText.indexOf('3502') != -1))
						    	else if(status == '412' && jQuery.inArray(errorCode,termsCondErrors) != -1)
					    		{
					    			/*var n = document.additem;
					    			n = n.sku;
					    			n = n[n.selectedIndex].value;						    		
					    		    var sku = n + '.json'; */
						    		var sku = getValueInQuerystring(serviceCallURL,"sku") + '.json';//_getQueryStringParamVal("sku") + '.json';
					    			rei.services.Read("/rest/cart/terms/"+sku,{},{
					    				dataType:'text',
					    				success: function(data) {
					    					var splashJson = null;
											try {
												splashJson = parseJSON(data);
												splashText = splashJson.text;
											}
											catch (e) {
												_showError(serviceCallURL);
											}
											
											var splashContent = '<div id="termsFancy" class="splash" style="">'+
																	'<h1 style="">Terms and Conditions: '+ splashJson.categoryTitle+'</h1>'+ 
																	'<h2 style=""> WARNING: Please read carefully before accepting.</h2>'+	
																	 '<div id="splashContent">'+
																	 	splashJson.text +
																	 '</div>'+
																	 '<div class="horizdots2"></div>'+
																	 '<div style="height:90px;">'+
														 			     '<p class="terms">Click to accept the Terms and Conditions and place item in your shopping cart.</p>'+
														 			     '<div id="buttons">'+
														 			     	'<ul style="width:55px;" id="acceptCssButton" class="button">'+
														 			     		'<a href="#" class="medium primary button">Accept</a>'+
														 			     	 '</ul>'+
														 			     	 '<ul style="padding-top:5px;width:0px;height:10px;">or</ul>'+
														 			     	 '<ul style="padding-top:5px;width:0px;height:10px;" id="cancelLink">'+
														 			     	 	'<a href="#">Cancel</a>'+
														 			     	  '</ul>'+
														 			     '</div>'+
														 			  '</div>'+
													 			 '</div>'; 
												
					    					$.fancybox(					    							
					    							splashContent,
					    							{
					    								 autoDimensions: true,	
						    							 padding: 0,
						    							 margin:0,
						    							 scrolling: 'yes',	
					    							    onClosed: function(){
					    									var prod = rei.prod;
					    									if(prod && prod.reenableCart)
					    									{
					    										prod.reenableCart();
					    									}
						  
					    								},
					    								onComplete: function(){
					    									$("#acceptCssButton a").bind("click", function(e){
					    										e.preventDefault();
					    										var acceptedURL = "termsCategoryAgreedTo=true";
					    										if(serviceCallURL.indexOf('?') == -1)
					    										{
					    											acceptedURL = serviceCallURL.concat("?", acceptedURL);
					    										}
					    										else
					    										{
					    											acceptedURL = serviceCallURL.concat("&", acceptedURL);
					    										}
					    										_updateCartUsingWebService(acceptedURL);
					    										$.fancybox.close();
					    									});
					    									$("#cancelLink a").bind("click", function(e){
					    										e.preventDefault();
					    										var prod = rei.prod;
					    										if(prod && prod.reenableCart)
					    										{
					    											prod.reenableCart();
					    										}
							    								$.fancybox.close();
					    									});
					    									
					    								}
					    							}
					    					);
					    				},
					    				error: function()
					    				{
					    					serviceCallURL = serviceCallURL.replace('/rest/cart/item','/AddItemToCartController');
							    			goWithTheOldFlow(serviceCallURL);
					    				}
					    			});
					    		
					    			return;
					    		}
						       // else if(status == '412' && (jQuery.inArray(errorCode,backOrderErrors) != -1 
					    		//		|| (xhr.responseText.indexOf('350') != -1 && xhr.responseText.indexOf('3502') == -1)))
						    	else if(status == '412' && jQuery.inArray(errorCode,backOrderErrors) != -1)
					    		{
									//serviceCallURL = serviceCallURL.replace('/rest/cart/item','/AddItemToCartController');
					    			serviceCallURL = serviceCallURL.replace('/rest/cart/item','/backOrderController');
									goWithTheOldFlow(serviceCallURL);
									return;
					    		}
					    		// If the user's cookie is out of sync with REI.com we will clear out the cookie and recall this function and let the ajax beforeSend callback get a set a new user cookie (ONLINE-14256)
					    		else if(status == '400' && errorCode == 1400)
					    		{
					    			setCookie("loggedin","");
					    			setCookie("REI_SESSION_ID","");
									setCookie("REI_SSL_SESSION_ID","");
					    			/*setCookie("WCS_SESSION_ID","");
									setCookie("WCS_AUTHENTICATION_ID","");
									setCookie("rei_ila_appids","");
									setCookie("guestAddess","");
									setCookie("rei_cart","");
									setCookie("outlet_cart","");
									setCookie("GiftRegistrySetup","");
									setCookie("GiftRegistryPurchase", "");*/
					    			_updateCartUsingWebService(serviceCallURL, successCallBack);
					    			return;
					    		}
							}
							//Show error page for any other errors
				    		window.location.href = "/Error";
						}
					});
		};//end of update fn
	}//end of refreshCartData fn
		
	
	
	function modifyAddToCartBehaviours() {
		var membershipSku = "membership";//"36936";

		function addToMinicart() {
		    var qty;
	        for (var i=0; i < document.additem.yourChoice.length; i++){
	        	if (document.additem.yourChoice[i].checked){
	        		qty = document.additem.yourChoice[i].value;
	        	}
	        }
	        if (qty == "useTextInput"){
	            qty = document.additem.quantityTxt.value;
	        }
	        if (isNaN(qty) || qty <= 0) {
	            alert( "Please enter a valid quantity before adding this item to your shopping cart." );
	            return;
	        }
	        document.additem.quantity.value = qty;	        
	    }

		/**
		 * This function adds membership to cart
		 * @param anchor
		 */
		function becomeAMemberAnchor(anchor) {
			var a = $(anchor);
			
			//if (a.attr("href")=="/buyMembership?tracking=mem_dir_mem_pg")
			//	var href = a.attr("href");
				a.attr("href","#");
				a.click( function () {
					var url = "/rest/cart/item?" + 
						"storeId=" + storeId +
					//	"&URL=" + escape("/minicart?storeId=" + storeId) +
						"&quantity=1" + 
					//	"&from_url=ProductPage" +
					//	"&orig_action=REIOrderItemUpdate" + 
					//	"&product_desc=REI%20Membership" +
					//	"&vendor=REI" +
						"&sku=" + membershipSku ;
					//	"&tracking=mem_dir_mem_pg";	
					show(url);
				});
		}		

		function reiOrderItemUpdateAnchor(anchor) {
			if ($("#shoppingBasket").length==0) { // Don't change links on shopping cart page
				var a = $(anchor);
				var url = $(anchor).attr("href");
				var re1 = /^\/REIOrderItemUpdate?.+/;
				var re2 = /\?URL=ShoppingBasket/;
				var re3 = /&URL=ShoppingBasket/;
				if (url.match(re1)&&(url.match(re2)||url.match(re3))) {
					url=url.replace(re2,"?URL=" + escape("/minicart?storeId=" + storeId));
					url=url.replace(re3,"&URL=" + escape("/minicart?storeId=" + storeId));
					a.attr("href","#");
					a.click( function () {
						show(url);
						return false;
					});
				} else if (url.match(re1)&&!url.match(re2)&&!url.match(re3)) {
					if (url.indexOf("?") > 0) {
						url = url + "&";
					} else {
						url = url + "?";
					}
					url = url + "URL=" + escape("/minicart?storeId=" + storeId);
				}
			}
		}
	
		/**
		 * This function adds wish list items to cart
		 * @param i
		 * @param wishlistAddToCartForm
		 */
		function modifyWishlistAddToCartForm(i,wishlistAddToCartForm) {
			var targetedForm = $(wishlistAddToCartForm);
			var onsubmit = targetedForm.attr("onsubmit");
			if (onsubmit) {
				onsubmit = onsubmit.replace("return ", "");
			}
			targetedForm.removeAttr("onsubmit"); 
			
			targetedForm.submit(function(event){
				event.preventDefault();
				var oldOnSubmitResult = true;
				try {
					// submittedForm = false;
					oldOnSubmitResult = eval(onsubmit);
				}
				catch(e){
					// alert(e);
				}
				if (oldOnSubmitResult)  {
					//$("input[name=URL]",targetedForm).val("/minicart?storeId=" + storeId);
					// Disable all add to carts while i'm busy updating minicart
					//show(targetedForm.attr("action")+ "?" + targetedForm.serialize());
					show('/rest/cart/item'+ "?" + targetedForm.serialize());
				}
				return false;
			});
			$("button",targetedForm).click(function(e)  {
				e.preventDefault();
				targetedForm.submit();
				wlProdRow = $(this).parents("tr#owner");
				wlNoteRow = $(this).parents("tr#owner").next("tr#noteRow");
				//$(this).parents("tr#owner").next("tr#noteRow").hide();
				//$(this).parents("tr#owner").html("<td colspan='6'>" + "<p class='wishListCartAction'>" + "Moving to cart!" + "</p>" + "</td>").fadeOut(2000, function () {});
			});
		}

		function frmOrderYakimaOrThuleFitGuide() {
			var f = $("form[name=frmOrder]");
			if ($("table.rackOrder",f).length>0) {
				var d = $("div.shop2 div.shopCssButton",f);
				var a = $("a.btnStyle1[name!=cancel]:first",f);
				a.attr("href","#").click(function() {
					$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
					whileBusy(function() {
						$("#cartFormButton").enabled = false;
						submittedForm = true;
					},function() {
						$("#cartFormButton").enabled = true;
						submittedForm = false;
					});
					show("/REIOrderItemUpdate?" + f.serialize());
				});
				var a = $("a.btnStyle1[name=cancel]:first",f);
				a.attr("href","/category/4500010");
			}
		}

		/**
		 * This function adds gift card or e-gift card to cart
		 */
		function prepareGiftCertificateAddToCart() {
			
			var giftCardButton = $("a.button[name=giftCard]");
            var giftCardAnotherButton = $("a.button[name=giftCardAnother]");

            var eGiftCardButton = $("a.button[name=eGiftCard]");
            var eGiftcardAnotherButton = $("a.button[name=eGiftCardAnother]");

			if(giftCardButton)
			{
				var g_url= giftCardButton.attr("href");
				giftCardButton.bind('click',function(e) {
					_addCardToCart(g_url, e);
				});
			}
			if(giftCardAnotherButton)
			{
				var g_anoUrl= giftCardAnotherButton.attr("href");
				giftCardAnotherButton.bind('click',function(e){
					_addCardToCart(g_anoUrl, e);
				});
			}
			
			if(eGiftCardButton)
			{
				var e_url= eGiftCardButton.attr("href");
				eGiftCardButton.bind('click',function(e) {
					_addCardToCart(e_url, e);
				});
			}
			
			if(eGiftcardAnotherButton)
			{
				var e_anoUrl= eGiftcardAnotherButton.attr("href");
				eGiftcardAnotherButton.bind('click',function(e){
					_addCardToCart(e_anoUrl, e);
				});
			}
			function _addCardToCart(url,e)
			{
				e.preventDefault();
				url = url.replace("/giftCardController","/rest/cart/item");
				show(url);
			}
		}
		
		/**
		 * This function adds gift registry items to cart
		 */
		function rewriteGiftRegistryEditProducts() {
			if ($("#GiftRegistryEditProductsView").length>0||$("#GiftRegistryDetailsView").length>0) {
				getHrefUrl = function(storeId,catalogId,catEntryId,partNumber,registryEntryId,productDesc,quantity,sku ) {
					show("/rest/cart/item?" + 
							//"?URL=" + escape("/minicart?storeId=" + storeId) +
							"storeId=" + storeId +
							//"&catalogId=" + catalogId +
							//"&catEntryId=" + catEntryId +
							"&sku=" + sku +
							"&giftRegistryEntryId=" + registryEntryId +
							//"&product_desc=" + productDesc +
							"&quantity=" + quantity); 
				};
			}
		}
		
		/**
		 * This function is used for DOTD page only (I think)
		 * @param i
		 * @param form
		 */
		function modifyAddItemToCartForm(i,form) {
			var f = $(form);
			if (($("#product #productSelect").length>=1)&&($("#prodInventoryView").length==0)&&($("body#termsSplash").length==0)) {
				if (f.attr("id")!="productSelectForm2") {
					// Product Page Context
					var onsubmit = f.attr("onsubmit");
					var onsubmitText = "return true";
					if (onsubmit) {
						onsubmitText = onsubmit.toString();
						onsubmitText = onsubmitText.replace("return", "");
					}
					f.removeAttr("onsubmit");
					f.submit(function(event){
						var oldOnSubmitResult = true;
						try {
							// submittedForm = false;
							oldOnSubmitResult = eval(onsubmitText);
						}
						catch(e){
							var noop=e;
						}
						if (oldOnSubmitResult)  {
							$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
							whileBusy(function() {
								$("#cartFormButton").enabled = false;
								submittedForm = true;
							},function() {
								$("#cartFormButton").enabled = true;
								submittedForm = false;
							});
							//show(f.attr("action")+ "?" + f.serialize());
							show('/rest/cart/item'+ "?" + f.serialize());
						}
						event.preventDefault();
						return false;
					});
				}
			} else if ($("body#prodInventoryView").length>=1||$("#termsSplash").length>=1) {
				// last minute  work around for #1665
				$("input[name=URL]",f).val("/ShoppingCart");
			} else if (false) { 
				// BackorderPages
				// "Sorry. We don't have the quantity you've asked for in stock" Page
				// There are two versions of this page: one with three radio buttons 
				// and the other just has the "buy what's in stock" option.
				var addToCartButton = $("a.btnStyle1",f);
				if (addToCartButton.length>0) {
					var onclick = addToCartButton.attr("onclick");	
					if (onclick) {
						var addToCartIndex = 0;
						var anchorCollection = document.getElementsByTagName("a");
						var foundItem = false;
						$("input[name=URL]",f).val("/minicart?storeId=" + storeId);
						var submitAction = "";
						try {
							while (!foundItem && addToCartIndex<anchorCollection.length) {
								if (anchorCollection[addToCartIndex].className) {
									foundItem = (anchorCollection[addToCartIndex].className.indexOf("btnStyle1")>=0);
								}
								if (!foundItem) addToCartIndex++;
							}
						}
						catch(e) {}

						var onclickText = "";
						if (foundItem) {
							onclickText = anchorCollection[addToCartIndex].onclick.toString();
						} else {
							onclickText = onclick.toString();
						}
						if ($("input[type=radio][name=yourChoice]").length>=3) {
							submitAction = 
								"var f=$(this).parents(\"form:first\");" +
								"var qty = $(\"input[type=radio][name=yourChoice]:checked\").val();" +
								"if (qty == \"useTextInput\"){" +
							        "qty = $(\"#quantityTxt\").val();" +
							    "}" +
								"if (isNaN(qty) || qty <= 0) {" +
						            "alert( \"Please enter a valid quantity before adding this item to your shopping cart.\");" +
						            "return false;" +
								"}" +
								"$(\"input[name=quantity]\",f).val(qty);" + 
								"minicart.addToCart(f.attr(\"action\")+ \"?\" + f.serialize());" +
								"return false;";
						} else {
							submitAction = 
								"var f = $(this).parents(\"form:first\");" +
								"minicart.addToCart(f.attr(\"action\")+ \"?\" + f.serialize());" +
								"return false;";
						}
						if (onclickText.indexOf("document.additem.submit()")>=0) {
							onclickText = onclickText.replace("document.additem.submit()",submitAction);
						} else {
							onclickText = onclickText.replace("addToCart()",submitAction);
						}
						onclickText = onclickText.replace(new RegExp("\\n", "g" )," ");
						var i = onclickText.indexOf("{")+1;
						var j = onclickText.lastIndexOf("}");
						onclickText = onclickText.substring(i, j-1);

						var addToMinicart = new Function("event", onclickText);
						if (foundItem) {
							anchorCollection[addToCartIndex].onclick = addToMinicart;
						} else {
							addToCartButton.click(addToMinicart);
						}
					}
				}				
			}
		}
		
		
		$.each($("form[name=additem],form[action=/AddItemToCartController]"),modifyAddItemToCartForm);
		
		$.each($("a[href*=buyMembership]"), function (i,anchor){
			becomeAMemberAnchor(anchor);
		});

		$.each($("a[href*=REIOrderItemUpdate]"), function (i,anchor){
			reiOrderItemUpdateAnchor(anchor);
		});
		
		$.each($("form[id*=wishlistaddtocartform]"), modifyWishlistAddToCartForm );
		
		frmOrderYakimaOrThuleFitGuide();
		
		prepareGiftCertificateAddToCart();
		
		rewriteGiftRegistryEditProducts();
	}

	function show(serviceCallUrl, successCallback) {
		hdrObj.closeMenu();
		cancelHide();
		if (!isVisible&&!isBusy) {
			setState("busy show");
			if ((serviceCallUrl) ||(!cartData)) {
				publicState = "busy";
				if (serviceCallUrl) {
					refreshCartData(serviceCallUrl, function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							flashItemAddedToCart();
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
						});
						if ($.isFunction(successCallback)) {
							successCallback();
						}
					});
				} else {
					refreshCartData("/minicart?storeId="+storeId,function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
						});
						if ($.isFunction(successCallback)) {
							successCallback();
						}
					});
				}		
			} else {
				m.slideDown("fast",  function() {
					isVisible = true;
					setState("ready show");
					refreshCart();
					publicState = "ready";
				});
			}
		}
		me.setVisibility(true);
		$("#minicartContainer").trigger("showCart");
	}
	
	function addItemAndForward(serviceCallUrl,forwardUrl) {
		if (typeof(serviceCallUrl)=='string'&&typeof(forwardUrl)=='string') {
			hdrObj.closeMenu();
			cancelHide();
			if (!isVisible&&!isBusy) {
				setState("busy show");
				if ((serviceCallUrl) ||(!cartData)) {
					publicState = "busy";
					refreshCartData(serviceCallUrl, function() {
						setState("ready");
						m.slideDown("fast",  function() {
							isVisible = true;
							flashItemAddedToCart();
							refreshCart();
							whenNoLongerBusy();
							publicState = "ready";
							window.location.href = forwardUrl;
						}, false);  
					});
				}
			}
		}
	}
	
	
// Public Methods
	this.setVisibility = function(isVisible){
		$("#minicartContainer").css({visibility:isVisible ==  false ? "hidden" : "visible"});
	}
	this.showCart = function() {
		show();
	};	
	this.hideCart = function(delay) {
		if (isNaN(delay)) {
			hide();
		} else {
			hide(delay);
		}
	};	
	this.addToCart = function(serviceCallUrl,successCallback) {
		$("h3.lineA").show();
		show(serviceCallUrl,successCallback);
	};
	this.addItemAndForward = function(serviceCallUrl,forwardUrl) {
		addItemAndForward(serviceCallUrl,forwardUrl);
	};
	this.getState = getState;
	
	this.isBusy = function() {
		return (publicState=="busy");
	};
	
	this.onComplete = function(f) {
		if ($.isFunction(f)) {
			onCompleteFunction = f;
		}
	};

	this.beforeSubmit = function(f) {
		if ($.isFunction(f)) {
			beforeSubmitFunction = f;
		}
	};

	this.onSuccess = function(f) {
		if ($.isFunction(f)) {
			onSuccessFunction = f;
		}
	};

	this.onError = function(f) {
		if ($.isFunction(f)) {
			onErrorFunction = f;
		}
	};
	this.enableScrollToTop = function(b) {
		if (typeof b == 'boolean') {
			scrollToTopEnabled = true;
		}
	};
	this.disableScrollToTop = function(b) {
		if (typeof b == 'boolean') {
			scrollToTopEnabled = false;
		}
	};
	
	// Initialization Code
	appendMinicartToContainer();
	modifyAddToCartBehaviours();
	loadImages();
	m.click(function(e) { 
		mclick =true;	
	});
	$(document).click( function(){ 
		if (mclick) {
			mclick = false;
		} else {
			setState("ready"); 
			hide();
		}
	});
	
	setState("ready show");
	publicState = "ready";
	
	$(document).keyup = function(e){ 	
		if (e == null) { // ie keycode = event.keyCode;
		} else { // mozilla
			keycode = e.which;
		}
		if(keycode == 27){ // close
			hide();
		}	
	};
	window.document.onload = null;
	
	
	//Add Minicart Banner
	try{
		var minicartBanner = $.trim($('#gHMessaging').find('div').html());
		if(minicartBanner.length > 0){
				$("#minicartCarousel").before($('<div id="bannerMinicart" />').html(minicartBanner));
			}
		}catch(e){
			rei.error.push(e);
		}

	}

var minicart=0;
// minicart is initialized from rei.js
/* $Id: unvHeader.js 4012 2012-07-13 23:20:09Z cromeis $ */
ReiUserLogin = {
	helloUserNameLabel  : "Hello ",
    welcomeUserLabel    : "Welcome to REI!",
    notUserLabel        : "Not "
};
	
var setup_cook_obj = ReadGRCookie("GiftRegistrySetup");

//these vars are for the JSP side of things where we don't have those variables at times.
var storeId = storeId || 0;
var storeClass = storeClass || '';

var hdrObj = {
	isModernBrowser: navigator.appName != 'Microsoft Internet Explorer' || $.browser.version > 8,
	isHelpMenu: false,
	helpMenuOpen: false,
	closeTimeout: '',
	noClick: function(e){
		e.preventDefault();
		e.stopPropagation();
	},
	setCartStatus: function(testItemsAmt){
		var miniCartHover ='miniCartHover';
		var miniCartClick = 'miniCartClick';
		testItemsAmt = parseInt((testItemsAmt||numOfItems), 10);

		/*
			FIX for ONLINE-12703 and INC203367 
			@desc	We are emptying the rei_cart cookies for a user when the REI_SESSION_ID is empty.
		*/
		if(!$.cookie("REI_SESSION_ID")){
			$.cookie("rei_cart", "0", { expires: 14, path: "/" });
			testItemsAmt = 0;
		}
		
		if (testItemsAmt > 0) {
			if((document.body.className.indexOf('checkout') < 0) && ($('#shoppingBasket').length == 0)){		
				$('#ghCartNew').unbind('mouseover').bind('mouseover',function(e){
					$('#ghCartNew').addClass(miniCartHover);
					e.preventDefault();	
					if(hdrObj.isModernBrowser == true){
						if($("#minicartContainer").css('visibility') == 'hidden'){
							if(window.minicart) minicart.showCart();
						}
					}
					else{
						if(window.minicart) minicart.showCart();
					}
					$('#itemAddedMsg').hide();
				}).unbind('mouseout').bind('mouseout', function(e){
					e.preventDefault();	
					if(window.minicart && hdrObj.isModernBrowser) minicart.setVisibility(false);
					$('#ghCartNew').removeClass(miniCartHover);
				}).bind('click', function(){
					$('#ghCartNew').removeClass(miniCartHover).addClass(miniCartClick);
				}); 
				$('#minicartContainer').bind('mouseover', function(e){
					if(hdrObj.isModernBrowser == true) $(this).css({visibility:'visible'});
				}).bind('mouseout', function(e){
					if(hdrObj.isModernBrowser == true) $(this).css({visibility:'hidden'});
				});
				$('#checkoutLink').unbind('mouseover').bind('mouseover',function(e){
					$('#ghCheckout').addClass(miniCartHover);
					e.preventDefault();
				}).unbind('mouseout').bind('mouseout', function(){
					$('#ghCheckout').removeClass(miniCartHover);
				}).bind('click', function(){
					$('#ghCheckout').removeClass(miniCartHover).addClass(miniCartClick);
				}); 
			}
			//Disable checkout button for checkout
			if(typeof rei.analytics[0] == "object" && rei.analytics[0].site_section == 'checkout'){
				hdrObj.checkoutBtnDisable();
			}else if ($('.checkout').length > 0){
				hdrObj.checkoutBtnDisable();
			}else{
				hdrObj.checkoutBtnEnable();
			}
		}else{			
			hdrObj.checkoutBtnDisable();
		}
		$('#cartItemCount').html('<div style="margin-top:-3px;">'.concat((testItemsAmt > 999 ? '999+' : testItemsAmt),'</div>'));
		var cicMarginLeft = 180;
		if(testItemsAmt > 999){
			cicMarginLeft -= 12;
		}
		else if(testItemsAmt > 99){
			cicMarginLeft -= 10;			
		}
		else if(testItemsAmt > 9){
			cicMarginLeft -= 6;						
		}
		else{
			cicMarginLeft -= 1;						
			
		}
		//if($.browser.msie && $.browser.version < 8){
			//$('#ghCartAndCheckout').css({'margin-left':cicMarginLeft});
		//}
		//$('#cartItemCount').css({'margin-left': cicMarginLeft});
	},
	//funcs for liveHelp
// TODO revise so now so many redraws
	liveChatOn: function(){
		$(document.getElementById('hdrLink_liveHelp')).css({display:'block'});
	},
	liveChatOff: function(){
		$(document.getElementById('hdrLink_liveHelp')).css({display:'none'});
	},
	checkoutBtnDisable: function(options){
		$([document.getElementById('cartLink'), document.getElementById('checkoutLink')]).attr({'class':'cartLinkInactive'});
		$(document.getElementById('ghDividerCart')).attr({'class':'dividerCartInactive'});
		$(document.getElementById('ghCartAndCheckoutInner')).removeClass('cartActive').addClass('cartInactive');
		$(document.getElementById('cartLink')).bind('click',hdrObj.noClick);
		return $(document.getElementById('checkoutLink')).css("display","block").bind('click',hdrObj.noClick);
	},
	checkoutBtnEnable: function(){
		$([document.getElementById('cartLink'), document.getElementById('checkoutLink')]).attr({'class':'cartLinkActive'});
		$(document.getElementById('ghDividerCart')).attr({'class':'dividerCartActive'});
		$(document.getElementById('ghCartAndCheckoutInner')).removeClass('cartInactive').addClass('cartActive');
		$(document.getElementById('cartLink')).unbind('click',hdrObj.noClick);
		return $(document.getElementById('checkoutLink')).css("display","block").unbind('click',hdrObj.noClick).addClass(' hdrLink_checkoutBtnOns').attr('href', (
				(loggedIn == 1) ? 
				''.concat(httpsHost, 'CheckCart?storeId=', storeId, '&checkInventory=Y')
				:
				''.concat(httpsHost, 'CheckoutLoginView?storeId=', storeId)
			));
	},
	checkoutBtnHide: function(){
		return $(document.getElementById('hdrLink_checkoutBtn')).css("display","none");
	},
	clearCookie: function(){
		document.cookie = 'rei_user_info' + "=" + "" + ";PATH=/";
		hdrObj.checkForUserName();
	},
	//misc funcs for helpMenu functionality
	closeMenu: function(){	
		$(document.getElementById('helpMenu')).css({top: '-500px', display:'none'});
		$(document.getElementById('helpDDL')).removeClass('menuActive').unbind('mouseenter mouseleave');
		hdrObj.helpMenuOpen = false;
	},
	goToURL: function(strUrl){
		document.location.href = strUrl;
	},
	checkCartOption: function(){
		if(document.body.className.indexOf('checkout') < 0){
			if(window.minicart) minicart.showCart();
		}
	},
	init: function(){
	// init called from rei.js
		//TODO, consider moving to rei.js, makes sense to have this set in the rei namespace
		storeId = (storeId == 0 && rei.location.params != null && rei.location.params.storeId != undefined) ? rei.location.params.storeId : "8000";

		if(storeClass == ''){
			storeClass = document.body.className;
			if(storeClass.indexOf('adv') > -1){
				storeClass = 'adv';
			}
			else if(storeClass.indexOf('outlet') > -1){
				storeClass = 'outlet';
			}
			else{
				storeClass = 'rei';
			}
		}
	// setJSEnabledUX()
	var helpMenu = $(document.getElementById('helpMenu'));
	var helpMenuHotSpot = $(document.getElementById('helpDDL'));
	var firstOldBG = $('.first').css('background-color');
	var firstActiveBG = '#ffffff';
	helpMenuHotSpot.mouseover( function(e){
		helpMenuEvent = e;
		var hoverDelay = 0;
		window.setTimeout('showHelpMenu(helpMenuEvent);',hoverDelay);
	});
	helpMenu.hover( 
		function(){//mouseOver
			hdrObj.isHelpMenu = true;
			$('.first').css({'background-color':firstActiveBG});
			helpMenuHotSpot.mouseover(e);
		},
		function(){//mouseOff
			$('.first').css({'background-color':firstOldBG});
			hdrObj.isHelpMenu = false;
			hdrObj.closeMenu();
		}
	);
	helpMenuHotSpot.mouseout( function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.first').css({'background-color':firstOldBG});
		window.setTimeout("eval('if(hdrObj.isHelpMenu == false)hdrObj.closeMenu();')",0);
	});
	//-- add event listeners --				
		$(document).mousedown( function(event){
			try{
			if(!hdrObj.isHelpMenu && $(document.getElementById('helpMenu')).is(":visible") && hdrObj.helpMenuOpen){
				hdrObj.closeMenu();
			}
			}catch(err){}
		});
		$("a#helpMenuCloseButton").click( function(event){
			try{
				if($(document.getElementById('helpMenu')).is(":visible") && hdrObj.helpMenuOpen){
					hdrObj.closeMenu();
				}
				}catch(err){}
			});

	//now do other JSEnabled actions
	hdrObj.setCartStatus();
	hdrObj.checkForUserName();
	$(document.getElementById('hdrLink_liveHelp')).attr('href', 'javascript:'.concat(
		(storeClass == 'adv' || parseInt(storeId) == 8003) ? 'launchAdventureChatPopup();':'launchContactUsPopup("liveHelp_tab");',
		' hdrObj.closeMenu();'
	));
	if(parseInt(getCookie('events_cart'), 10) > 0){
		$(document.getElementById('hdrLink_events')).attr('href', '/DisplayCart');		
	}	
	if(parseInt(loggedIn) == 1){
		$(document.getElementById('hdrLink_orderStatus')).attr('href', '/OrderHistoryView?storeId=' + storeId);
	}

	$(document.getElementById("logOut")).bind("click",function(){
		setCookie("loggedin", "0");
	});
	
	var isWindows = true;
	try{
		isWindows = navigator.platform.toLowerCase().indexOf('win') == 0;
	}
	catch(e){
		
	}
	if(navigator.appName == 'Microsoft Internet Explorer'){
		if($.browser.version > 7){ 
			$('.searchBtn .btnCTA').css({'margin-top':1});
			$('#gHMessaging').css({'margin-top':6}); 
		}	
		else{
			$('.searchBtn .btnCTA').css({'margin-top':0});
		}
		if(hdrObj.isModernBrowser == false){
			$('.searchBtn').css({width:93}).bind('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				$('#psearch').submit();
			});
		}
		else{
			//ie9 and up
			$('.searchBtn').css({width:93});			
		}
	}
	else{
		if(isWindows == false){
			$('.searchBtn').css({width:95});			
		}
	}
	}, // init();
	checkForUserName: function(){
	var userName = getUserInfoCookie('userName');
	if(!userName || userName == '""' || userName == null || userName == ''){
		$(document.getElementById('welcomeUser')).html(ReiUserLogin.welcomeUserLabel + ' |').show();
		$(document.getElementById('loginRegister')).show();
		$(document.getElementById('notUser')).hide();
		$(document.getElementById('separatorB')).hide();
		$(document.getElementById('sepRegister')).hide();
		return false;
	}else{
		userName = userName.replace(/[+]/g, " ").substring(0, 20);
		if (loggedIn == 1) {
			//welcomeUser msg
			$(document.getElementById('helloUserName')).html(ReiUserLogin.helloUserNameLabel + ' ' + userName + '! |').show();
			$(document.getElementById('welcomeUser')).html('<a href="/YourAccountInfoInView?storeId=' + storeId + '&amp;stat=header_account">Your Account</a>').show();
			
			//show
			$(document.getElementById('separatorA')).show();
			$(document.getElementById('logOut')).show();
			
			//hide
			$(document.getElementById('loginRegister')).hide();
			$(document.getElementById('separatorB')).hide();
			$(document.getElementById('notUser')).hide();
		}	
		else {
			//welcomeUser msg
			if(userName.length > 0){
				$(document.getElementById('welcomeUser')).html(ReiUserLogin.helloUserNameLabel + ' ' + userName + '!').show();
				$(document.getElementById('hdrLink_notUser')).html(ReiUserLogin.notUserLabel + ' ' + userName).click(hdrObj.clearCookie);
				$(document.getElementById('notUser')).show();
				$(document.getElementById('separatorB')).show();
			}
			else{
				//alert('weird condition hit: userName.length >1 and <= ZERO???');
				$(document.getElementById('welcomeUser')).html(ReiUserLogin.welcomeUserLabel + ' |').show();
				$(document.getElementById('notUser')).hide();
				$(document.getElementById('separatorB')).hide();
			}
			
			$(document.getElementById('loginRegister')).show();
			$(document.getElementById('logOut')).hide();
		}
	}
	} // checkForUserName()
}; // hdrObj

function showHelpMenu(e){
	try{
		e.preventDefault();
		e.stopPropagation();
	}
	catch(e){
		//ie browsers may land here
	}
	if(window.minicart){ minicart.hideCart(); }

	var hdr = hdrObj;
	hdr.helpMenuOpen = true;
	//trigger hover state to cancel hdrObj.closeMenu() call from document.click handler
	$(document.getElementById('helpDDL')).addClass('menuActive');
	$('.first').css({'background-color':'#ffffff'});
	$(document.getElementById('helpMenu')).show().css({'top':'38px'}).hover( 
		function(){//mouseOver
			hdrObj.isHelpMenu = true;
		},
		function(){//mouseOff
			hdrObj.isHelpMenu = false;
		}
	);
}

$(document).ready(function(){
	$('.linklist3 li a').bind('click', function(){
		$(this).css({color:'#333333'});
	});  
});
/* $Id: liveHelp.js 1914 2012-03-30 17:26:26Z jowilso $ */

function launch_chat_form()
{
    var chat_form_url = "/rei/livehelp/memformsecure1.html";
	var firstName = $(document.getElementById("firstName"));
	var chk = document.chk;
	if(!firstName.length && !chk) return;
	window.open(
	((!firstName.length) ? 
	chat_form_url.concat(
		"?bill_safname=", chk.bill_safname.value,
		"&amp;bill_salname=", chk.bill_salname.value,
		"&amp;bill_saaddr1=", chk.bill_saaddr1.value,
		"&amp;bill_sacity=", chk.bill_sacity.value,
		"&amp;bill_sazipc=", chk.bill_sazipc.value,
		"&amp;bill_saphone1=", chk.bill_saphone1.value,
		"&amp;bill_saemail1=", chk.bill_saemail1.value,
		"&amp;cm_sp=checkout*livehelp*general"
	): chat_form_url.concat(
		"?bill_safname=", firstName.val(),
		"&amp;bill_salname=", $(document.getElementById("lastName")).val(),
		"&amp;bill_saphone1=", $(document.getElementById("phone")).val(),
		"&amp;bill_saemail1=", $(document.getElementById("emailAddress")).val()
	)),"chat_form","width=600,height=425,scrollbars=1");
}
var isMemberChat,
isServiceChat,
isMemberLookUpChat,
isGearChat,
isOrderChat,
isAdventureChat;
function launchMemberChatPopup() {
	isMemberChat = 'yes';
	launchChatPopup();
}
function launchServiceChatPopup() {
	isServiceChat = 'yes';
	launchChatPopup();
}

function launchMemberLookupChatPopup(arrCustInfo, fromWhere) {
	isMemberLookUpChat = 'yes';
	//need to get variables from lookup tool
	if(arrCustInfo){ launchChatPopup(arrCustInfo, fromWhere); }
	else{ launchChatPopup(); }
}


function launchGearChatPopup() {

	isGearChat = 'yes';
	launchChatPopup();
}

function launchOrderChatPopup() {

	isOrderChat = 'yes';
	launchChatPopup();
}

function launchAdventureChatPopup() {

	isAdventureChat = 'yes';
	launchChatPopup();
}

function launchChatPopup(custCheckoutInfo, doWhat) {
	var winW;
	var winH;
	var newH;
	var loadPage;
	
	if (isMemberChat == 'yes'){
		loadPage = 'memformsecure1.html?cm_sp=checkout*livehelp*general';
		isMemberChat = '';
	}
	else if (isServiceChat == 'yes'){
		loadPage = 'memformsecure_service.html';
		isServiceChat = '';
	}	
	else if (isMemberLookUpChat == 'yes'){
		loadPage = 'memformsecure1.html';		
		if(custCheckoutInfo){
			if(doWhat == 'checkout' || doWhat == 'adventures'){
				loadPage += "?bill_safname=" + custCheckoutInfo[0] + "&bill_salname=" + custCheckoutInfo[1] + "&bill_saaddr1=" + custCheckoutInfo[2] + "&bill_sacity=" + custCheckoutInfo[3] + "&bill_sastate=" + custCheckoutInfo[4]  + "&bill_sazipc=" + custCheckoutInfo[5] + "&bill_saphone1=" + custCheckoutInfo[6] + "&bill_saemail1=" + custCheckoutInfo[7];
			}
			else if(doWhat == 'support' || doWhat == 'divLookupForm'){
				loadPage += "?bill_safname=" + custCheckoutInfo[0] + "&bill_salname=" + custCheckoutInfo[1] + "&bill_saemail1=" + custCheckoutInfo[2] + "&bill_saphone1=" + custCheckoutInfo[3];
			}
			else{}			
		}
		isMemberLookUpChat = '';
	}		
	else if (isGearChat == 'yes'){
		loadPage = 'genformsecure_gear.html';
		isGearChat = '';
	}
	else if (isOrderChat == 'yes'){
		loadPage = 'genformsecure_order.html';
		isOrderChat = '';
	}
	else if (isAdventureChat == 'yes'){
		loadPage = 'genformsecure_adventure.html';
		isAdventureChat = '';
	}
	else {
		loadPage = 'genformsecure.html?cm_sp=checkout*livehelp*general';
	}
// set a default target height for the window in case we can't calculate one dynamically

	var targetH = 425;

// set default height and width for the screen in case we can't sniff one

	var screenW = 600;
	var screenH = 425;

// get the screen width and height to make sure we don't size things inappropriately



// get window width and height. if we get it, we reset the default target height to
// the current window height.
// first property is IE implementation, second is Moz/Gecko/Saf.
// Moz/Gecko/Saf recognize IE function, but some return bad numbers, so
// calling it second corrects the var values.



// calculate the difference in height between the screen and the window



// we only resize the window if it's too tall to display the popup...

// ...or if it's so short that we think it will need to be resized to cover the popup


// set the new window height

// resize the parent window



// now we get the parent window position and move if absolutely necessary to work well with the popup.
// if we can't get it, we'll move the window to the top left by default

	topP = 1;
	leftP = 1;

// first method Moz/Gecko (Safari?), second method IE. For IE we can only get the position of the display screen,
// so we additionally subtract the height and width of the window frame and toolbars with default installation settings.



// failsafe to correct for unfriendly IE behavior


	
// move parent window and reset it to be resizable, which is sometimes loses in IE



// set top position and tweak width for chat popup window

	var chatTopP = topP + targetH;
	var chatW = winW - 8;
        self.name = "new";
	
//	var chatUrl = httpHost + '/rei/livehelp/genformsecure.html?cm_sp=checkout*livehelp*general'; replaces the line below this for interim.
	var chatUrl = '/rei/livehelp/' + loadPage;
	var newWindow = 'chatPopup';
//	var openParams ='width=800' + chatW +',height=300, top =' + chatTopP + ', left=10' + leftP;

	var openParams ='width=600' + chatW +',height=425, top =' + chatTopP + ', left=10' + leftP + ',resizable=1,scrollbars=1';
	
	chatPopupOpen = window.open(chatUrl, newWindow, openParams);
	if(window.focus){
		chatPopupOpen.focus();
	}
}

function launchContactUsPopup(activeTab) {
	// this opens the contact us popup window from /xsl/help/helpContacts.xsl
	
	var loadPage = '/helpContacts';
	if (activeTab) { loadPage = loadPage + '#' + activeTab; }
	var newWindow = 'chatPopup';
	var openParams = "width=600,height=500,titlebar=no,resizable=1,scrollbars=1";
	
	var chatPopupOpen = window.open(loadPage, newWindow, openParams);
	if(window.focus){
		chatPopupOpen.focus();
	}
}
/* $Id: InstantInvite3.js 1914 2012-03-30 17:26:26Z jowilso $ */

function ii_AnimObj(){this.moveTimer=null;
this.hideTimer=null;this.prx=0;this.pry=0;this.flx=10;this.fly=10;this.flw=0;this.flh=0;this.flpos=0;this.flopac=0;this.flfade=0;
}function ii_getIEel(){if(document.compatMode&&document.compatMode=="BackCompat"){return(document.body);}else{return((document.documentElement&&typeof document.documentElement.scrollTop!="undefined")?document.documentElement:document.body);
}}function ii_reset(){var A=ii_getIEel();ii_Anim.prx=((ii_Var.MZ)?window.pageXOffset:A.scrollLeft)+ii_Anim.flx;ii_Anim.pry=((ii_Var.MZ)?window.pageYOffset:A.scrollTop)+ii_Anim.fly;
}function ii_mark(){var E=ii_Var;var D=ii_Anim;if(!E.MZ&&!E.IE){return ;}var B=ii_getIEel();var A=(E.MZ)?window.innerWidth:B.offsetWidth;
var C=(E.MZ)?window.innerHeight:B.offsetHeight;if((D.flpos%3)==0){D.flx=A-D.flw-30;}if((D.flpos%3)==1){D.flx=10;}if((D.flpos%3)==2){D.flx=Math.round(((A-20)/2)-(D.flw/2));
}if(D.flpos<4){D.fly=10;}else{if(D.flpos<7){D.fly=Math.round(((C-20)/2)-(D.flh/2));}else{if(D.flpos<10){D.fly=C-40-D.flh;
}}}}function ii_move(){var C=ii_Var;var D=ii_Anim;var A=ii_getIEel();var B=((C.MZ)?window.pageXOffset:A.scrollLeft)+D.flx;
var H=((C.MZ)?window.pageYOffset:A.scrollTop)+D.fly;var J=Math.abs(B-D.prx);var I=Math.abs(H-D.pry);var E=Math.sqrt(J*J+I*I);
var F=Math.round(E/20)+2;if(B>D.prx){D.prx=D.prx+F;}if(B<D.prx){D.prx=D.prx-F;}if(H>D.pry){D.pry=D.pry+F;}if(H<D.pry){D.pry=D.pry-F;
}var G=document.getElementById("invitelayer");(C.MZ)?G.style.left=D.prx+"px":G.style.posLeft=D.prx;(C.MZ)?G.style.top=D.pry+"px":G.style.posTop=D.pry;
if(!ii_Anim.islteIE6){(C.MZ)?G.style.MozOpacity=D.flopac/100:G.style.filter="alpha(opacity="+D.flopac+")";D.flopac+=D.flfade;
if(D.flopac<0){D.flopac=0;}if(D.flopac>100){D.flopac=100;}}}function ii_getDomain(){var B=document.domain;if(ii_matchRegExp(B,"^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$")){return(B);
}var A=B.split(".");if(A.length==3){B=A[1]+"."+A[2];}else{if(A.length>3){B=A[A.length-3]+"."+A[A.length-2]+"."+A[A.length-1];
}}return(B);}function ii_callServer(F,E){var D=(ii_callServer.arguments.length==3)?ii_callServer.arguments[2]:window;var C=D.document.getElementsByTagName("head").item(0);
var A=D.document.getElementById(F);if(A){C.removeChild(A);}var B=document.createElement("script");B.src=E;B.type="text/javascript";
B.defer=true;B.id=F;void (C.appendChild(B));}function ii_getProtocol(){return((document.location.href.toLowerCase().indexOf("https")==0)?"https":"http");
}function ii_getCookie(D){var B=D+"=";var G=B.length;var A=document.cookie.length;var E=0;while(E<A){var C=E+G;if(document.cookie.substring(E,C)==B){var F=document.cookie.indexOf(";",C);
if(F==-1){F=document.cookie.length;}return unescape(document.cookie.substring(C,F));}E=document.cookie.indexOf(" ",E)+1;if(E==0){break;
}}return(null);}function ii_setCookie(C,D){var A=ii_setCookie.arguments;var E=ii_setCookie.arguments.length;var B=(E>2)?A[2]:null;
document.cookie=C+"="+escape(D)+((B==null)?"":("; expires="+B.toGMTString()))+"; path=/"+((ii_Var.domain==null||ii_Var.domain=="")?"":("; domain="+ii_Var.domain));
}function ii_upGSV(C,F){var A=false;var B="";var E=ii_getCookie(ii_Var.GSV_COOKIE);E=(E==null)?[]:E.split("_");if(typeof (F)=="string"){F=F.replace(/\-/g,"%2D");
F=F.replace(/\_/g,"%5F");}for(var D=0;D<E.length;D++){if((E[D].split("-"))[0]==C){E[D]=C+"-"+F;A=true;break;}}if(!A){E[E.length]=C+"-"+F;
}for(D=0;D<E.length;D++){B+=E[D];if(D<E.length-1){B+="_";}}ii_setCookie(ii_Var.GSV_COOKIE,B,null);}function ii_getGSV(A){var D=ii_getCookie(ii_Var.GSV_COOKIE);
D=(D==null)?[]:D.split("_");for(var B=0;B<D.length;B++){if((D[B].split("-"))[0]==A){var C=(D[B].split("-"))[1];C=C.replace(/\%2D/g,"-");
C=C.replace(/\%5F/g,"_");return(C);}}return("");}function ii_upHLArr(C,E,B){var A=false;for(var D=0;D<C.length;D++){if(C[D][0]==E){if(B==1||B==2||B==3){if(C[D][B]==""){C[D][B]=1;
}else{C[D][B]=parseInt(C[D][B],10)+1;}}if(B==4){C[D][B]=parseInt(new Date().getTime()/1000);}A=true;break;}}if(!A){C[C.length]=[E,"","","",""];
if(B==1||B==2||B==3){C[C.length-1][B]=1;}if(B==4){C[C.length-1][B]=parseInt(new Date().getTime()/1000);}}}function ii_getHLArr(B,E,A){var D=null;
for(var C=0;C<B.length;C++){if(B[C][0]==E){D=parseInt(B[C][A],10);if(isNaN(D)){D=null;}break;}}return(D);}function ii_wrapHL(){var C=ii_Var;
var B=C.publ+"-"+C.pgvis+"-"+C.randid+"_";for(var A=0;A<C.phl.length;A++){B+=C.phl[A][0]+"-"+C.phl[A][1]+"-"+C.phl[A][2];
if(A<C.phl.length-1){B+="+";}}B+="_";for(var A=0;A<C.ihl.length;A++){B+=C.ihl[A][0]+"-"+C.ihl[A][1]+"-"+C.ihl[A][2]+"-"+C.ihl[A][3]+"-"+C.ihl[A][4];
if(A<C.ihl.length-1){B+="+";}}B+="_";for(var A=0;A<C.cpml.length;A++){B+=C.cpml[A];if(A<C.cpml.length-1){B+="-";}}B+="_";
for(var A=0;A<C.ppml.length;A++){B+=C.ppml[A];if(A<C.ppml.length-1){B+="-";}}ii_setCookie(C.HIST_COOKIE,B,C.HIST_COOKIE_EXP);
}function ii_unwrapHL(){var F=ii_Var;var C=ii_getCookie(F.HIST_COOKIE);C=(C!=null)?C.split("_"):[];if(C.length==0){return ;
}var B=C[0].split("-");F.publ=B[0];F.pgvis=B[1];F.randid=B[2];F.phl=[];if(C[1].length>0){B=C[1].split("+");for(var D=0;D<B.length;
D++){var E=B[D].split("-");F.phl[F.phl.length]=[E[0],E[1],E[2]];}}F.ihl=[];if(C[2].length>0){B=C[2].split("+");for(var D=0;
D<B.length;D++){var A=B[D].split("-");F.ihl[F.ihl.length]=[A[0],A[1],A[2],A[3],A[4]];}}F.cpml=[];if(C[3].length>0){B=C[3].split("-");
for(var D=0;D<B.length;D++){F.cpml[F.cpml.length]=B[D];}}F.ppml=[];if(C[4].length>0){B=C[4].split("-");for(var D=0;D<B.length;
D++){F.ppml[F.ppml.length]=B[D];}}}function ii_resetHistCookie(){ii_setCookie(ii_Var.HIST_COOKIE,"0-0-0____",ii_Var.HIST_COOKIE_EXP);
}function ii_resetGSVCookie(){ii_upGSV("DPL",0);ii_upGSV("TES",parseInt(new Date().getTime()/1000));ii_upGSV("PCT",parseInt(new Date().getTime()/1000));
ii_upGSV("GeoIP","*");ii_upGSV("GeoCo","");ii_upGSV("GeoRg","");ii_upGSV("GeoCt","");ii_upGSV("GeoNs","");ii_upGSV("GeoDm","");
}function ii_initGeoIP(){var A=ii_Var;if(ii_getGSV("GeoIP")!="*"){A.geoinit=1;}if(window.isgeoipapi_ip_addr!=undefined&&A.geoinit==0){A.geoinit=1;
ii_upGSV("GeoIP",window.isgeoipapi_ip_addr);ii_upGSV("GeoCo",(window.isgeoipapi_country_code!=undefined)?window.isgeoipapi_country_code:"");
ii_upGSV("GeoRg",(window.isgeoipapi_region!=undefined)?window.isgeoipapi_region:"");ii_upGSV("GeoCt",(window.isgeoipapi_city!=undefined)?window.isgeoipapi_city:"");
ii_upGSV("GeoNs",(window.isgeoipapi_netspeed!=undefined)?window.isgeoipapi_netspeed:"");ii_upGSV("GeoDm",(window.isgeoipapi_domain!=undefined)?window.isgeoipapi_domain:"");
}if(A.geoip==null&&A.geoinit==1){A.geoip=ii_getGSV("GeoIP");A.geoco=ii_getGSV("GeoCo");A.georg=ii_getGSV("GeoRg");A.geoct=ii_getGSV("GeoCt");
A.geons=ii_getGSV("GeoNs");A.geodm=ii_getGSV("GeoDm");A.tmes=ii_getGSV("TES");}}function ii_getIPRange(C){var B=null;var A=ii_matchRegExp(C,"^([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})(\\/([0-1]?[0-9]?|[1-2][0-9]|3[0-2]))?$");
if(A!=null){var D=ii_matchRegExp(A[1],"^(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)$");if(D[1]!=null&&D[1]<=255&&D[2]<=255&&D[3]<=255&&D[4]<=255){B=[A[1],(A[2]==undefined||A[2]=="")?"32":A[3]];
}}return(B);}function ii_ipCheck(G,E,C){var D=G.split(".");var A=(D[0]*16777216)+(D[1]*65536)+(D[2]*256)+(D[3]*1);var F=E.split(".");
var H=(F[0]*16777216)+(F[1]*65536)+(F[2]*256)+(F[3]*1);var B=((4294967295<<(32-C))&4294967295);return((A&B)==(H&B));}function ii_doAvailCheck(D,F,C){var G=ii_Var;
if(D==1){G.checkDeptID=C;if(C==-2){C="Default";}}else{if(typeof (window[C])!="undefined"){G.checkDeptID=window[C];C=window[C];
if(C=="-2"){C="Default";}}else{ii_noshow();return ;}}G.checkState=F;for(var B=0;B<G.deptavail.length;B++){if(G.deptavail[B][0]==G.checkDeptID){if(G.deptavail[B][1]==G.checkState){availOnLoad(null);
}else{availOnError(null);}return ;}}var E=parseInt(new Date().getTime()/1000);var A=(G.checkState==2?"un":"")+"available.gif";
G.availImg.src=ii_getProtocol()+"://"+G.rsvr+"/resources/smartbutton/"+G.accountid+"/"+C+"/"+A+"?src=ii3&ts="+E;}function availOnLoad(A){var D=ii_Var;
var C=false;for(var B=0;B<D.deptavail.length;B++){if(D.deptavail[B][0]==D.checkDeptID){D.deptavail[B][1]=D.checkState;C=true;
break;}}if(!C){D.deptavail[D.deptavail.length]=[D.checkDeptID,D.checkState];}D.checkDeptID=0;D.checkState=0;ii_show();}function availOnError(A){var D=ii_Var;
var C=false;for(var B=0;B<D.deptavail.length;B++){if(D.deptavail[B][0]==D.checkDeptID){D.deptavail[B][1]=(D.checkState==0?1:0);
C=true;break;}}if(!C){D.deptavail[D.deptavail.length]=[D.checkDeptID,(D.checkState==0?1:0)];}D.checkDeptID=0;D.checkState=0;
ii_noshow();}function ii_noshow(){var B=ii_Var;if(B.trigru>0){var A=ii_getRuleOrInv(ii_Rules,B.trigru);if(A[9]==1){ii_executeRuleTriggeredEvent(A[10],A[11],A[12],A[0],A[4]);
}if(A[3]>=2){if(window.ISVT_onInviteNotOffered&&A[2]!=0){ISVT_onInviteNotOffered(B.trigru,A[2]);}ii_stop();}else{ii_continue(B.evalidx,100);
}}}function ii_show(){var F=ii_Var;if(F.trigru>0){var E=ii_getRuleOrInv(ii_Rules,F.trigru);var A=ii_getRuleOrInv(ii_Inv,E[2]);
if(E[9]==1){ii_executeRuleTriggeredEvent(E[10],E[11],E[12],E[0],E[4]);}if(A!=null){F.invtoshow=A[0];if(A[2]==3){ii_display();
}else{var D=null;var C=null;var B=null;if(navigator.appName.indexOf("Microsoft")!=-1&&navigator.platform.indexOf("Mac")!=-1){D=document.createElement("IMG");
C=document.createElement("IMG");B=document.createElement("IMG");}else{D=new Image();C=new Image();B=new Image();}if(A[15].length>0){C.src=A[15];
}if(A[23].length>0){B.src=A[23];}D.onload=function(G){this.onload=null;ii_display();};D.src=A[10];}}else{if(E[3]==1||E[1]==3){ii_continue(F.evalidx,100);
}else{ii_stop();}}}}function ii_display(){var c="ii_div_hide(\u0027[%0]\u0027,\u0027[%1]\u0027,[%2],[%3],[%4]);";var T="self.close();";
var d="var ii_IE=!!(document.all&&document.getElementById);var ii_MZ=(!ii_IE)?!!(document.getElementById):false;var ii_gpop = true;function ii_callServer(id,scr) {  var win = (ii_callServer.arguments.length==3) ? ii_callServer.arguments[2] : window;var head = win.document.getElementsByTagName(\u0027head\u0027).item(0); var old = win.document.getElementById(id);  if (old) head.removeChild(old);  script = document.createElement(\u0027script\u0027);  script.src = scr;  script.type = \u0027text/javascript\u0027;  script.defer = true;  script.id = id;  void(head.appendChild(script));}\r\n";
var b="function ii_executeInvitationAcceptedEvent(param1,param2,param3){var js=ii_invTokenReplace(ii_custacc,ii_inv[0],ii_inv[1]);eval(js);}\r\n";
var a="function ii_executeInvitationDeclinedEvent(param1,param2,param3){var js=ii_invTokenReplace(ii_custdecl,ii_inv[0],ii_inv[1]);eval(js);}\r\n";
var Y="function ii_invTokenReplace(js,arg3,arg4) { arg4 = arg4.replace(/\\u0027/g,\u0027\\\\\\'\u0027);js=js.replace(/\\[\\%INVITATIONID\\%\\]/g,arg3);js=js.replace(/\\[\\%INVITATIONNAME\\%\\]/g,arg4);return(js);}\r\n";
var X="var ii_inv;var ii_custacc;var ii_custdecl;";var V="ii_executeInvitationAcceptedEvent(\u0027[%0]\u0027,\u0027[%1]\u0027,\u0027[%2]\u0027,\u0027[%3]\u0027,\u0027[%4]\u0027);\r\n";
var R="ii_executeInvitationDeclinedEvent(\u0027[%0]\u0027,\u0027[%1]\u0027,\u0027[%2]\u0027,\u0027[%3]\u0027,\u0027[%4]\u0027);\r\n";
var e="var op=window;if (window.ii_gpop) { if (window.opener&amp;&amp;!window.opener.closed)op=window.opener;else op=null; }";
var N="if (op!=null&amp;&amp;op.ISVT_onInviteAccepted) op.ISVT_onInviteAccepted(\u0027[%0]\u0027,\u0027[%1]\u0027);";var K="if (op!=null&amp;&amp;op.ISVT_onInviteDeclined) op.ISVT_onInviteDeclined(\u0027[%0]\u0027,\u0027[%1]\u0027);";
var M="if (op!=null) {op.ii_upHLArr(op.ii_Var.ihl,op.ii_Var.invtoshow,2); op.ii_wrapHL(); }";var B="if (op!=null) {op.ii_upHLArr(op.ii_Var.ihl,op.ii_Var.invtoshow,3); op.ii_wrapHL(); }";
var g='\u003cimg src=\u0022[%0]\u0022 alt="" style=\u0022position:absolute;left:0px;top:0px;width:[%1]px;height:[%2]px;\u0022/\u003e';
var D="\u003cdiv id=\u0022[%0]\u0022 style=\u0022position:absolute;left:[%1]px;top:[%2]px;\u0022\u003e";var Q='\u003cimg src=\u0022[%0]\u0022 alt="" style=\u0022top:0px;left:0px;\u0022 onclick=\u0022[%1][%2][%3][%4]\u0022 onmouseover=\u0022this.style.cursor=\u0027pointer\u0027\u0022 onmouseout=\u0022this.style.cursor=\u0027\u0027\u0022/\u003e';
var O="\u003cform name=\u0022[%0]\u0022 method=\u0022post\u0022 action=\u0022\u0022\u003e\u003cinput style=\u0022font:normal 11px Arial, Helvetica, sans-serif;text-align:center;background-color:#E4E4E4;color:#000000;\u0022 type=\u0022button\u0022 name=\u0022[%1]\u0022 value=\u0022[%2]\u0022 onclick=\u0022[%3][%4][%5][%6]\u0022/\u003e\u003c/form\u003e";
var J="window.open(\u0027[%0]\u0027,\u0027chatclient\u0027,\u0027width=[%1],height=[%2],scrollbars=0\u0027);";var F="if (op!=null) op.document.location=\u0027[%0]\u0027;";
var G=ii_Var;var U="";var f="";var A=ii_getRuleOrInv(ii_Inv,G.invtoshow);var H=ii_getRuleOrInv(ii_Rules,G.trigru);ii_upHLArr(G.ihl,A[0],1);
ii_upHLArr(G.ihl,A[0],4);ii_wrapHL();ii_executeInvitationOfferedEvent(A[25],A[26],A[27],A[0],A[1]);if(window.ISVT_onInviteOffered){ISVT_onInviteOffered(G.trigru,G.invtoshow);
}G.evalru[ii_getRuleOrInvIdx(ii_Rules,G.trigru)][4]=ii_getRuleOrInvIdx(ii_Inv,G.invtoshow);if(A[2]==1||A[2]==2){U+='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r\n';
U+='<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\r\n';U+="<head>\r\n<title></title>\r\n";if(A[2]==2){U+=G.scrinc+"\r\n";
U+='<script type="text/javascript">\r\n//<![CDATA[\r\n';U+=d+b+a+Y+X;U+="\r\n//]]>\r\n<\/script>\r\n";}U+='</head>\r\n<body><div id="iibody">\r\n';
U+=ii_rt(g,A,[ii_encodeHTML(A[10]),11,12],1);U+=ii_rt(D,A,["iiacc",13,14],1);var S=ii_rt(V,A,[ii_encodeHTML(A[28]),ii_encodeHTML(A[29]),ii_encodeHTML(A[30]),0,ii_encodeHTML(A[1])],1);
var P=e+ii_rt(N,A,[0,""+H[8]],1);var L="";if(A[2]==1){L=ii_rt(c,A,[4,"aclk",7,(A[9]==1?"-3":"0"),0],1);}else{L=M+T;}var Z=ii_encodeHTML(ii_parsejs(A[17]));
if(A[18]==1){f=ii_rt(J,A,[Z,19,20],1);}else{if(A[18]==2){f=ii_rt(F,A,[Z],1);}}if(A[15].length>0){U+=ii_rt(Q,A,[15,S,P,f,L],0);
}else{if(A[16].length>0){U+=ii_rt(O,A,["iiaccfrm","iiaccbtn",ii_encodeHTML(A[16]),S,P,f,L],0);}}U+="</div>";U+=ii_rt(D,A,["iidecl",21,22],1);
S=ii_rt(R,A,[ii_encodeHTML(A[31]),ii_encodeHTML(A[32]),ii_encodeHTML(A[33]),0,ii_encodeHTML(A[1])],1);P=e+ii_rt(K,A,[0,""+H[8]],1);
var L="";if(A[2]==1){L=ii_rt(c,A,[4,"dclk",8,(A[9]==1?"-3":"0"),0],1);}else{L=B+T;}if(A[23].length>0){U+=ii_rt(Q,A,[23,S,P,L,""],0);
}else{if(A[24].length>0){U+=ii_rt(O,A,["iideclfrm","iideclbtn",ii_encodeHTML(A[24]),S,P,L,""],0);}}U+="</div></div></body></html>";
if(A[2]==1){if(A[4]=="invitelayer"){var W=document.getElementById(A[4]);var C=document.getElementById("invitelayercontent");
var I=document.getElementById("divshim");ii_Anim=new ii_AnimObj();ii_Anim.islteIE6=(I==null?false:true);ii_Anim.flx=10;ii_Anim.fly=10;
ii_Anim.flw=A[11];ii_Anim.flh=A[12];ii_Anim.flpos=A[5];ii_Anim.flopac=(A[9]==1?0:100);ii_Anim.flfade=(A[9]==1?3:0);W.style.width=ii_Anim.flw;
W.style.height=ii_Anim.flh;C.style.display="block";C.innerHTML=U;C.childNodes[0].data="";if(ii_Anim.islteIE6){I.style.display="block";
I.style.width=ii_Anim.flw+"px";I.style.height=ii_Anim.flh+"px";I.style.top="0px";I.style.left="0px";I.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
I.style.zIndex=C.style.zIndex-1;}else{W.style.filter="alpha(opacity=0);-moz-opacity:0.0;";}ii_mark();window.onresize=ii_mark;
ii_reset();ii_Anim.moveTimer=setInterval("ii_move();",25);setTimeout("document.getElementById('"+A[4]+"').style.visibility='visible'",40);
ii_Anim.flpos=A[6];ii_mark();ii_Anim.hideTimer=setTimeout("ii_div_hide('"+A[4]+"','auto',"+A[8]+","+(A[9]==1?-3:0)+","+A[0]+");",(A[7]*1000));
}else{C=document.getElementById(A[4]);if(C){C.innerHTML=U;C.style.visibility="visible";}}}else{if(A[2]==2){var E=window.open("","InstantInvite","width="+A[11]+",height="+A[12]);
if(E){E.document.close();E.document.write(U);E.document.close();E.ii_inv=A;E.ii_custacc=G.CustomAcceptedJS;E.ii_custdecl=G.CustomDeclinedJS;
E.focus();}}}}if(A[2]==3){if(confirm(A[3])){ii_executeInvitationAcceptedEvent(A[28],A[29],A[30],A[0],A[1]);if(window.ISVT_onInviteAccepted){ISVT_onInviteAccepted(G.invtoshow,H[8]);
}ii_upHLArr(G.ihl,G.invtoshow,2);ii_wrapHL();var Z=ii_parsejs(A[17]);if(A[18]==1){window.open(Z,"InstantInvite","width="+A[19]+",height="+A[20]+"");
}else{if(A[18]==2){document.location=Z;}}}else{ii_executeInvitationDeclinedEvent(A[31],A[32],A[33],A[0],A[1]);if(window.ISVT_onInviteDeclined){ISVT_onInviteDeclined(G.invtoshow,H[8]);
}ii_upHLArr(G.ihl,G.invtoshow,3);ii_wrapHL();}}if(H[3]==1||H[3]==3){ii_continue(G.evalidx,100);}else{ii_stop();}}function ii_rt(D,A,E,B){for(var C=0;
C<E.length;C++){if(typeof (E[C])=="number"){if(B==1){D=D.replace("[%"+C+"]",(""+A[E[C]]).replace(/\u0027/g,"\\'"));}else{D=D.replace("[%"+C+"]",A[E[C]]);
}}else{if(B==1){D=D.replace("[%"+C+"]",E[C].replace(/\u0027/g,"\\'"));}else{D=D.replace("[%"+C+"]",E[C]);}}}return(D);}function ii_parsejs(s){var regexp=/\[\%jsvar\:([a-zA-Z_\.]*)\%\]/;
var match=regexp.exec(s);while(match!=null){result=eval("'"+window.ii_jsvar[match[1]]+"'");s=s.replace(/\[\%jsvar\:([a-zA-Z_\.]*)\%\]/,result);
match=regexp.exec(s);}return(s);}function ii_div_hide(B,C,G,E,A){var F=ii_Var;if(A==F.lastinvhid){return ;}F.lastinvhid=A;
var D=(B=="invitelayer");if(D){clearTimeout(ii_Anim.hideTimer);}if(C=="auto"||C=="aclk"||C=="dclk"){if(C=="aclk"){ii_upHLArr(F.ihl,A,2);
ii_wrapHL();}if(C=="dclk"){ii_upHLArr(F.ihl,A,3);ii_wrapHL();}if(D&&G>0){ii_Anim.flpos=G;ii_Anim.flfade=E;ii_mark();}if(D){setTimeout("ii_div_clear('"+B+"');",(C=="auto")?1000:500);
}}}function ii_div_clear(A){document.getElementById(A).style.visibility="hidden";clearInterval(ii_Anim.moveTimer);}function ii_trap(){ii_Var.abshown=true;
this.onbeforeunload=null;return ii_Var.abmsg;}function ii_delay_abandon(D){window.onbeforeunload=null;var C=setTimeout("window.onbeforeunload=ii_trap;",2000);
var A=null;if(!D){var D=window.event;}if(D.target){A=D.target;}else{if(D.srcElement){A=D.srcElement;}}if(A.nodeType==3){A=A.parentNode;
}if(A!=null){var B=A.tagName;if(B!=null){B=B.toLowerCase();if(B=="a"||B=="area"||B=="img"){clearTimeout(C);}else{if(B=="input"){if(A.getAttribute){var E=A.getAttribute("type");
if(E!=null){E=E.toLowerCase();if(E=="image"||E=="submit"||E=="button"){clearTimeout(C);}}}}}}}return true;}function ii_checkRules(L){var J=ii_Var;
if(L==0){J.runcnt++;}if(J.abshown==true&&J.abflag!=9999){J.trigru=ii_Rules[parseInt(J.abflag,10)][0];J.evalru[parseInt(J.abflag,10)][2]=2;
J.evalru[parseInt(J.abflag,10)][3]=J.trigrucnt++;J.abflag=9999;window.onbeforeunload=null;J.abmsg=null;document.onclick=null;
return ;}var V=0;for(var O=L;O<ii_Rules.length;O++){J.evalidx=O;if(J.evalru[O][2]==0||J.evalru[O][3]>0){V++;continue;}else{J.evalru[O][2]=2;
}var P=true;var U=ii_Rules[O][5];for(var R=0;R<U.length;R++){var N=2;var W=U[R].split("`");switch(W[0]){case"1":if(J.pgvis==1){N=1;
}break;case"2":if(!J.abshown){J.abmsg=W[1];window.onbeforeunload=ii_trap;if(J.IE){document.onclick=ii_delay_abandon;}else{if(J.MZ){window.captureEvents(Event.CLICK);
}}window.onclick=ii_delay_abandon;J.abflag=O;N=3;}break;case"3":if(ii_compOp(J.pgvis,W[1],W[2],W[3],0)){N=1;}break;case"4":if((W[2]==7||W[2]==9)&&J.cpml.contains(W[1])&&!J.stringNoContain.contains(W[1])&&ii_compOp(ii_getHLArr(J.phl,W[1],1),W[4],W[5],W[6],0)){N=1;
}else{if(W[2]==8&&J.cpml.contains(W[1])&&J.stringNoContain.contains(W[1])&&ii_compOp(ii_getHLArr(J.phl,W[1],2),W[4],W[5],W[6],0)){N=1;
}}break;case"5":if(ii_compOp(J.randid,W[1],W[2],W[3],0)&&ii_compOp(J.randid,W[4],W[5],W[6],0)){N=1;}break;case"10":if((W[2]==7||W[2]==9)&&J.ppml.contains(W[1])&&!J.stringNoContain.contains(W[1])){N=1;
}else{if(W[2]==8&&J.ppml.contains(W[1])&&J.stringNoContain.contains(W[1])){N=1;}}break;case"11":if((W[2]==7||W[2]==9)&&!J.stringNoContain.contains(W[1])&&ii_compOp(J.referrer,J.urlStrings[W[1]],W[2],W[3],0)){N=1;
}else{if(W[2]==8&&J.stringNoContain.contains(W[1])&&ii_compOp(J.referrer,J.urlStrings[W[1]],W[2],W[3],0)){N=1;}}break;case"12":if((W[2]==7||W[2]==9)&&!J.stringNoContain.contains(W[1])){for(var Q=0;
Q<J.phl.length;Q++){var S=ii_getHLArr(J.phl,W[1],1);if(S!=null&&S>0){if(!J.cpml.contains(W[1])||S>1){N=1;}break;}}}else{if(W[2]==8&&J.stringNoContain.contains(W[1])){for(var Q=0;
Q<J.phl.length;Q++){var S=ii_getHLArr(J.phl,W[1],2);if(S!=null&&S>0){if(!J.cpml.contains(W[1])||S>1){N=1;}break;}}}}break;
case"30":if(J.geoinit==1){if((W[2]==9&&ii_matchRegExp(J.geoip,W[1]))||((W[2]==7||W[2]==8)&&ii_compOp(J.geoip,W[1],W[2],0,1))){N=1;
}else{if(W[2]==1||W[2]==2){var M=false;var T=ii_extractStrings(W[1]);for(var Q=0;Q<T.length;Q++){var H=ii_getIPRange(T[Q]);
if(H!=null){if(ii_ipCheck(J.geoip,H[0],H[1])){M=true;}}}if(W[2]==1&&M){N=1;}else{if(W[2]==2&&!M){N=1;}}}}}break;case"31":case"32":case"33":case"34":case"35":if(J.geoinit==1){var C="";
if(W[0]=="31"){C=J.geoco;}else{if(W[0]=="32"){C=J.georg;}else{if(W[0]=="33"){C=J.geoct;}else{if(W[0]=="34"){C=J.geons;}else{if(W[0]=="35"){C=J.geodm;
}}}}}if(ii_compOp(C,W[1],W[2],0,1)){N=1;break;}}break;case"50":case"51":var E=parseInt(new Date().getTime()/1000);var K=(W[0]=="50"?J.tmentpg:parseInt(J.tmes,10));
var G=parseInt(W[1],10);if(ii_compOp(E-K,G,W[2],W[3],0)){N=1;}break;case"70":var D=ii_getHLArr(J.ihl,ii_Rules[O][2],3);if(D==null||D==0){N=1;
}break;case"71":var D=0;for(var Q=0;Q<J.ihl.length;Q++){if(!isNaN(parseInt(J.ihl[Q][3],10))){D+=parseInt(J.ihl[Q][3],10);
}}if(D==0){N=1;}break;case"72":var X=ii_getHLArr(J.ihl,ii_Rules[O][2],1);if(X==null){X=0;}if(ii_compOp(X,W[1],W[2],W[3],0)){N=1;
}break;case"73":var X=0;for(var Q=0;Q<J.ihl.length;Q++){if(!isNaN(parseInt(J.ihl[Q][1],10))){X+=parseInt(J.ihl[Q][1],10);
}}if(ii_compOp(X,W[1],W[2],W[3],0)){N=1;}break;case"74":var E=parseInt(new Date().getTime()/1000);var G=parseInt(W[1],10);
var A=ii_getHLArr(J.ihl,ii_Rules[O][2],4);if(A==null||ii_compOp(G,E-A,W[2],W[3],0)){N=1;}break;case"75":var E=parseInt(new Date().getTime()/1000);
var G=parseInt(W[1],10);var N=1;for(var Q=0;Q<J.ihl.length;Q++){var A=J.ihl[Q][4];if(A!=null&&ii_compOp(E-A,G,W[2],W[3],0)){N=2;
break;}}break;case"76":var I=ii_getHLArr(J.ihl,ii_Rules[O][2],2);if(I==null||I==0){N=1;}break;case"77":var I=0;for(var Q=0;
Q<J.ihl.length;Q++){if(!isNaN(parseInt(J.ihl[Q][2],10))){I+=parseInt(J.ihl[Q][2],10);}}if(I==0){N=1;}break;case"80":case"81":case"82":var F=ii_getCookie(W[1]);
if(W[0]=="80"&&(F==null?(W[4]==0?1:0):(W[4]==1?1:0))){N=1;}if(F!=null){if((W[0]=="81"&&ii_compOp(F,W[4],W[5],W[6],1))||(W[0]=="82"&&!isNaN(F)&&ii_compOp(parseFloat(F),W[4],W[5],W[6],1))){N=1;
break;}}break;case"90":case"91":case"92":var B=ii_validateParam(0,W[1]);if(B!=null){if((W[0]=="90"&&typeof (B)=="string")||(W[0]=="91"&&typeof (B)=="number")){if((W[0]=="90"&&typeof (B)=="string"&&ii_compOp(B,W[4],W[5],W[6],1))||(W[0]=="91"&&typeof (B)=="number"&&ii_compOp(B,W[4],W[5],W[6],1))){N=1;
break;}}else{if((W[0]=="92")&&typeof (B)=="boolean"){if(ii_compOp(B,(W[4]==0?false:true),1,W[6])){N=1;}}}}break;case"100":case"101":case"102":case"103":case"104":case"105":case"106":case"107":var B=null;
if(W[0]=="100"||W[0]=="101"||W[0]=="102"||W[0]=="103"){B=ii_validateParam(1,W[1]);}else{B=ii_validateParam(2,W[1]);}if(B!=null){if(((W[0]=="100"||W[0]=="104")&&ii_compOp(B.value,W[4],W[5],W[6],1))||((W[0]=="101"||W[0]=="105")&&!isNaN(B.value)&&ii_compOp(parseFloat(B.value),W[4],W[5],W[6],1))||((W[0]=="102"||W[0]=="106")&&ii_compOp((B.checked==true?1:0),W[4],1,W[6],0))||((W[0]=="103"||W[0]=="107")&&ii_compOp(B.selectedIndex,W[4],W[5],W[6],1))){N=1;
}}break;default:}J.evalru[O][1][R]=N;if(N>1){P=false;break;}}if(P){J.trigru=ii_Rules[O][0];J.evalru[O][3]=++J.trigrucnt;J.abflag=9999;
window.onbeforeunload=null;J.abmsg=null;document.onclick=null;return ;}}if(V==ii_Rules.length){ii_stop();}else{ii_continue(0,2500);
}}function ii_continue(B,A){setTimeout("ii_restart("+B+");",A);}function ii_stop(){ii_Var.run=false;}function ii_getRuleOrInv(A,C){for(var B=0;
B<A.length;B++){if(A[B][0]==C){return(A[B]);}}return(null);}function ii_getRuleOrInvIdx(A,C){for(var B=0;B<A.length;B++){if(A[B][0]==C){return(B);
}}return(-1);}function ii_compOp(I,H,E,F,J){var D=[];var A=false;if(J==1&&E!=9){D=ii_extractStrings(H);}else{D[0]=H;}var G=(typeof I=="string");
var B=(typeof H=="string");for(var C=0;C<D.length;C++){if(E==1&&F==0&&G&&B){if(D[C].toLowerCase()==I.toLowerCase()){A=true;
break;}}else{if(E==1){if(D[C]==I){A=true;break;}}else{if(E==2&&F==0&&G&&B){if(D[C].toLowerCase()!=I.toLowerCase()){A=true;
}else{A=false;break;}}else{if(E==2){if(D[C]!=I){A=true;}else{A=false;break;}}else{if(E==3){if(I>D[C]){A=true;break;}}else{if(E==4){if(I<D[C]){A=true;
break;}}else{if(E==5){if(I<=D[C]){A=true;break;}}else{if(E==6){if(I>=D[C]){A=true;break;}}else{if(E==7&&F==0){if(I.toLowerCase().indexOf(D[C].toLowerCase())!=-1){A=true;
break;}}else{if(E==7&&F==1){if(I.indexOf(D[C])!=-1){A=true;break;}}else{if(E==8&&F==0){if(I.toLowerCase().indexOf(D[C].toLowerCase())==-1){A=true;
}else{A=false;break;}}else{if(E==8&&F==1){if(I.indexOf(D[C])==-1){A=true;}else{A=false;break;}}else{if(E==9){if(ii_matchRegExp(I,D[C])!=null){A=true;
break;}}}}}}}}}}}}}}}return(A);}function ii_validateParam(H,E){if(H==2){return(document.getElementById(E));}var J=(H==0?window:window.document);
var B="";var C=E.split(".");for(var F=0;F<C.length;F++){var D=C[F];var G=ii_matchRegExp(D,"^([^\\]']*)\\['?([^']*)'?\\]$");
if(G!=null){B+=G[1]+"`"+G[2];}else{B+=D;}if(F<C.length-1){B+="`";}}var I=null;var A=B.split("`");for(var F=0;F<A.length;F++){if(F==0){if(typeof (J[A[0]])=="undefined"){I=null;
break;}else{I=J[A[0]];}}else{if(F==1){if(typeof (J[A[0]][A[1]])=="undefined"){I=null;break;}else{I=J[A[0]][A[1]];}}else{if(F==2){if(typeof (J[A[0]][A[1]][A[2]])=="undefined"){I=null;
break;}else{I=J[A[0]][A[1]][A[2]];}}else{if(F==3){if(typeof (J[A[0]][A[1]][A[2]][A[3]])=="undefined"){I=null;break;}else{I=J[A[0]][A[1]][A[2]][A[3]];
}}}}}}return(I);}function ii_matchRegExp(C,A){var B=ii_Var.tokenizedexps[A];if(!B){B=ii_Var.tokenizedexps[A]=new RegExp(A);
}return(B.exec(C));}Array.prototype.contains=function(B){for(var A=0;A<this.length;A++){if(this[A]==B){return true;}}return false;
};String.prototype.reverse=function(){var A="";if(this.length>0){A=this.split("").reverse().join("");}return A;};function ii_findMatches(D){var E=ii_Var;
for(var B=0;B<E.urlStrings.length;B++){if(!E.stringNoContain.contains(B)){var C=(E.stringTypes[B]==2)?[E.urlStrings[B]]:ii_extractStrings(E.urlStrings[B]);
for(var A=0;A<C.length;A++){if((E.stringTypes[B]==0&&D.toLowerCase().indexOf(C[A].toLowerCase())!=-1)||(E.stringTypes[B]==1&&D.indexOf(C[A])!=-1)||(E.stringTypes[B]==2&&new RegExp(C[A]).exec(D)!=null)){E.cpml[E.cpml.length]=B;
ii_upHLArr(E.phl,B,1);break;}}}}}function ii_findNoMatches(E){var F=ii_Var;for(var B=0;B<F.urlStrings.length;B++){if(F.stringNoContain.contains(B)){var C=true;
var D=ii_extractStrings(F.urlStrings[B]);for(var A=0;A<D.length;A++){if((F.stringTypes[B]==0&&E.toLowerCase().indexOf(D[A].toLowerCase())!=-1)||(F.stringTypes[B]==1&&E.indexOf(D[A])!=-1)){C=false;
}}if(C){F.cpml[F.cpml.length]=B;ii_upHLArr(F.phl,B,2);}}}}function ii_extractStrings(A){var C=(A.reverse().split(/[\s]*,(?!\\)[\s]*/).reverse());
for(var B=0;B<C.length;B++){C[B]=C[B].reverse().replace(/\\,/g,",");}return(C);}function ii_decodeHTML(C){var B=/&#([0-9a-fA-F]*);/;
var A=B.exec(C);while(A!=null){C=C.replace(/&#([0-9a-fA-F])*;/,String.fromCharCode(A[1]));var A=B.exec(C);}return(C);}function ii_encodeHTML(C){var A="";
for(var B=0;B<C.length;B++){A+="&#"+C.charCodeAt(B)+";";}return(A);}function ii_invTokenReplace(C,B,A){A=A.replace(/\u0027/g,"\\'");
C=C.replace(/\[\%INVITATIONID\%\]/g,B);C=C.replace(/\[\%INVITATIONNAME\%\]/g,A);return(C);}function ii_ruleTokenReplace(C,B,A){A=A.replace(/\u0027/g,"\\'");
C=C.replace(/\[\%RULEID\%\]/g,B);C=C.replace(/\[\%RULENAME\%\]/g,A);return(C);}function ii_executeInvitationOfferedEvent(param1,param2,param3){var arg=ii_executeInvitationOfferedEvent.arguments;
eval(ii_invTokenReplace(ii_Var.CustomOfferedJS,arg[3],arg[4]));}function ii_executeInvitationAcceptedEvent(param1,param2,param3){var arg=ii_executeInvitationAcceptedEvent.arguments;
eval(ii_invTokenReplace(ii_Var.CustomAcceptedJS,arg[3],arg[4]));}function ii_executeInvitationDeclinedEvent(param1,param2,param3){var arg=ii_executeInvitationDeclinedEvent.arguments;
eval(ii_invTokenReplace(ii_Var.CustomDeclinedJS,arg[3],arg[4]));}function ii_executeRuleTriggeredEvent(param1,param2,param3){var arg=ii_executeRuleTriggeredEvent.arguments;
eval(ii_ruleTokenReplace(ii_Var.CustomTriggeredJS,arg[3],arg[4]));}function ii_loadDiag(){var A=ii_Var;ii_unwrapHL();A.diag=[A.run,A.runcnt,ii_getGSV("TES"),A.tmentpg,A.pgvis,A.randid,A.abflag,A.trigru,A.invtoshow,A.trigrucnt,A.phl,A.ihl,A.cpml,A.ppml,A.deptavail,A.evalru,ii_getGSV("GeoIP"),ii_getGSV("GeoCo"),ii_getGSV("GeoRg"),ii_getGSV("GeoCt"),ii_getGSV("GeoNs"),ii_getGSV("GeoDm"),A.publ,A.deploy,A.domain];
}function ii_getDiag(A){return(ii_Var.diag[A]);}function ii_restart(E){var D=ii_Var;D.trigru=0;ii_initGeoIP();if(E==0){for(var B=0;
B<D.evalru.length;B++){if(D.evalru[B][2]>1){D.evalru[B][2]=1;}for(var A=0;A<D.evalru[B][1].length;A++){D.evalru[B][1][A]=0;
}}}ii_checkRules(E);if(D.trigru>0){var C=ii_getRuleOrInv(ii_Rules,D.trigru);if(C[6]>=1){ii_doAvailCheck(C[6],C[7],C[8]);}else{ii_show();
}}}function ii_init(){var C=ii_Var;C.deploy=(window.ii_deployment?window.ii_deployment:ii_getGSV("DPL"));if(C.deploy>0&&C.jscalled==0){if(C.deploy==1){ii_callServer("II3_TestRules.js",ii_getProtocol()+"://"+C.rsvr+"/resources/smartbutton/"+C.accountid+"/II3_TestRules.js?src=ii3&ts="+C.pct);
}if(C.deploy==2){ii_callServer("II3_Rules.js",ii_getProtocol()+"://"+C.rsvr+"/resources/smartbutton/"+C.accountid+"/II3_Rules.js?src=ii3&ts="+C.pct);
}C.jscalled=1;ii_upGSV("DPL",C.deploy);}if(window.ii_Rules&&window.ii_Rules.length>0){if(C.vtscrloc.length>0){ii_callServer(C.vtscrname,ii_getProtocol()+"://"+C.vtscrloc);
}ii_unwrapHL();if(C.publ!=C.publishversion){ii_resetHistCookie();}C.publ=C.publishversion;C.pgvis=parseInt(C.pgvis,10)+1;
C.ppml=C.cpml;C.cpml=[];if(C.randid==0){C.randid=Math.floor(Math.random()*100+1);}ii_findMatches(document.location.href);
ii_findNoMatches(document.location.href);ii_wrapHL();for(var B=0;B<ii_Rules.length;B++){C.evalru[B]=[ii_Rules[B][0],new Array(ii_Rules[B][5].length),(ii_Rules[B][1]==0?0:1),0,-1];
for(var A=0;A<ii_Rules[B][5].length;A++){C.evalru[B][1][A]=0;}}C.run=true;ii_restart(0);}else{setTimeout("ii_init();",1000);
}}function ii_start(){var B=ii_Var;if(B.IE||B.MZ){if(document.location.host.indexOf(B.domain)!=-1){if(B.ishosted){var A=(parseInt(new Date().getTime()/1000));
B.pct=ii_getGSV("PCT");if((A-B.cachetimeout)>=B.pct){B.pct=A;ii_upGSV("PCT",B.pct);}if(ii_getGSV("DPL")==0){ii_callServer("II3_Servers.js",ii_getProtocol()+"://"+B.rsvr+"/resources/smartbutton/"+B.accountid+"/II3_Servers.js?src=ii3&ts="+A);
}}if(ii_getGSV("GeoIP")=="*"){ii_callServer("geoipAPI.js",ii_getProtocol()+"://"+B.gsvr+"/geoipAPI.js?src=ii3&ts="+A);}ii_init();
}}}function ii_VarObj(){this.IE=!!(document.all&&document.getElementById);this.MZ=(!this.IE)?!!(document.getElementById):false;
this.version=14;this.accountid=5514;this.ishosted=true;this.domain="";this.rsvr="rs.instantservice.com";this.gsvr="gs.instantservice.com";
this.vtscrname="";this.vtscrloc="";this.GSV_COOKIE="IS3_GSV";this.HIST_COOKIE="IS3_History";this.HIST_COOKIE_EXP=new Date();
if(this.HIST_COOKIE_EXP!=null){this.HIST_COOKIE_EXP.setTime(this.HIST_COOKIE_EXP.getTime()+(43200*60*1000));}this.run=true;
this.runcnt=0;this.tmentpg=parseInt(new Date().getTime()/1000);this.trigru=0;this.trigrucnt=0;this.lastinvhid=0;this.invtoshow=0;
this.referrer=document.referrer;this.evalidx=0;this.deptavail=[];this.evalru=[];this.deploy=0;this.jscalled=0;this.cachetimeout=300;
this.geoinit=0;this.geoip=null;this.geoco=null;this.georg=null;this.geoct=null;this.geons=null;this.geodm=null;this.tmes=null;
this.diag=[];this.publ=0;this.pct=0;this.pgvis=0;this.randid=0;this.phl=[];this.ihl=[];this.cpml=[];this.ppml=[];this.tokenizedexps={};
this.abflag=9999;this.abshown=false;this.abmsg=null;this.availImg=null;this.checkDeptID=0;this.checkState=0;if(navigator.appName.indexOf("Microsoft")!=-1&&navigator.platform.indexOf("Mac")!=-1){this.availImg=document.createElement("IMG");
}else{this.availImg=new Image();}this.availImg.onload=availOnLoad;this.availImg.onerror=availOnError;}ii_Var=new ii_VarObj();
ii_Var.domain+=ii_getDomain();if(navigator.cookieEnabled){if(ii_getCookie(ii_Var.HIST_COOKIE)==null){ii_resetHistCookie();
}if(ii_getCookie(ii_Var.GSV_COOKIE)==null){ii_resetGSVCookie();}}document.write('<div id="invitelayer" style="position:absolute;left:10px;top:10px;visibility:hidden;z-index:1000;">');
document.write('<div id="invitelayercontent" style="position:relative;left:0px;top:0px;z-index:100">&nbsp;</div>');document.write('<!--[if lte IE 6]><iframe id="divshim" src="javascript:\'&lt;html&gt;&lt;/html&gt;\'" scrolling="no" frameborder="0" style="position:absolute;top:0px;left:0px;display:none;"></iframe><![endif]--></div>');
if(ii_Var.IE||ii_Var.MZ){ii_start();}
/* $Id: cookies.js 1914 2012-03-30 17:26:26Z jowilso $ */

// set a cookie for a particular name
function setCookie(name, value) {
   var docLocation = document.URL;
   var docLocationLen = docLocation.length;
   document.cookie = name + "=" + docLocationLen + "~" + escape(document.location) + escape(value) + ";PATH=/" ;
}
function readCookie (CookieName) {
  var lf = "\n";
  var CookieString = document.cookie;
  var CookieSet = CookieString.split (';');
  var SetSize = CookieSet.length;
  var CookiePieces
  var cookieValue = "";
  var x = 0;
  for (x = 0; ((x < SetSize) && (cookieValue == "")); x++) {
    CookiePieces = CookieSet[x].split ('=');
    if (CookiePieces[0].substring (0,1) == ' ') {
      CookiePieces[0] = CookiePieces[0].substring (1, CookiePieces[0].length);
    }
    if (CookiePieces[0] == CookieName) {
     if(CookiePieces[1])
     {
    	 cookieValue = CookiePieces[1];
     }
    }
  }
  return cookieValue;
}

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Set_Cookie( name, value, expires)
{
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    
    /*
    if the expires variable is set, make the correct expires time, the current script below will set it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires ){
        expires = parseInt(expires) * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    
    document.cookie = name + "=" + escape( value ) + ";path=/" +( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
    if ( Get_Cookie( name ) ) document.cookie = name + "=" +
    ( ( path ) ? ";path=" + path : "") +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/* $Id: cslogic.js 1914 2012-03-30 17:26:26Z jowilso $ */

/* This code will set the continue shopping link that retains the users last search position for use by Shopping Basket page.*/
/* expires - number of days until cookie should expire. If not specified, session cookie */
function setCSCookie(name, value) { document.cookie=name+"="+value+"; path=/"; }
//function setCSCookie(name, value) { document.cookie=name+"="+value+"; expires="+expires_date.toGMTString()+"; path=/"; }
function setContinueShoppingCookie(url) { setCSCookie("rei_continue", url); }
function setDCSCookie(name, value, expires) {
// set time, it's in milliseconds
var today = new Date();
today.setTime(today.getTime());
/* if the expires variable is set, make the correct expires time, the current script below will set 
it for x number of days, to make it for hours, delete * 24, for minutes, delete * 60 * 24 */
if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
var expires_date = new Date(today.getTime() + (expires)); /*var expdate = "Sun, 27-Sep-1998 11:59:59 GMT"*/
document.cookie=name+"="+value+"; expires="+expires_date.toGMTString()+"; path=/";
}
function setDatedContinueShoppingCookie(url, days) { setDCSCookie("rei_continue", url, days); }

function getPreferredPageSize() {
	// Get page size from URL
	var path = window.location.href;
	var pageSize = 29;
	var pageSizeIndex = path.indexOf("page_size", 0);
	if(pageSizeIndex > -1) {
		var pageSizeEndIndex = path.indexOf("&", pageSizeIndex);
		if(pageSizeEndIndex == -1) {
		    pageSizeEndIndex = path.length;
		}
		pageSize = path.substring(pageSizeIndex+10, pageSizeEndIndex);
	} else {
	// Get page size from cookie
      if (getCookie("searchPreferences") == null) {
      var searchPreferences = 'null';
      }
      else {
      var searchPreferences = getCookie("searchPreferences");
      }
      pageSizeIndex = searchPreferences.indexOf("page_size", 0);
      if(pageSizeIndex > -1) {
      var pageSizeEndIndex = searchPreferences.indexOf("%26", pageSizeIndex);
      if(pageSizeEndIndex == -1) {
      pageSizeEndIndex = searchPreferences.length;
      }
      pageSize = searchPreferences.substring(pageSizeIndex+10, pageSizeEndIndex);
      if (pageSize == 22) {
      pageSize = 29;
      }
      if (pageSize == 50) {
      pageSize = 57;
      }
      if (pageSize == 102) {
      pageSize = 109;
      }
      }
	}
    return pageSize;
}       
/* $Id: helpShared.js 1914 2012-03-30 17:26:26Z jowilso $ */

var url = window.location.toString();
var loc = url.indexOf("storeId=");
var storeId = url.substring(loc+8,loc+12);
if(storeId/storeId != 1){
	storeId = '8000';
}
function addStoreId() {
	var pageLinks = document.getElementsByTagName('a');
	for(i=0; i<pageLinks.length; i++){
		var href = pageLinks[i].href
		var hasQuery = href.indexOf('?');
		var hasHash = href.indexOf('#');
		var toLoc = href.indexOf('storeId=');
		var isHelp = href.indexOf("/help/membership");
		if(toLoc == -1 && isHelp > -1){
			if(loc == -1){
				storeId = 8000;
			}
			if(hasQuery > -1 && hasHash == -1){
				href = href + '&storeId=' + storeId;
			}
			if(hasQuery == -1 && hasHash == -1){
				href = href + '?storeId=' + storeId;
			}
			if(hasQuery > -1 && hasHash > -1){
				href = href.substring(0, hasHash) + '&storeId=' + storeId + href.substring(hasHash);
			}
			if(hasQuery == -1 && hasHash > -1){
				href = href.substring(0, hasHash) + '?storeId=' + storeId + href.substring(hasHash);
			}
			document.getElementsByTagName('a')[i].href = href;
		}
	}
}

var helpAccordion = {
		init : function() {

			var helpAccordionHeader = $(".msg_head");

			helpAccordion.closeAllSections();

			//-- add event listeners --
			$("p.msg_head").click( function(event){
				try{
					helpAccordion.whenclick($(this));
				}catch(err){}
			});
		},

		whenclick : function(locationHeader) //toggle the section with class msg_body
		{
			if (locationHeader.next(".msg_body").is(":visible"))
			{
				helpAccordion.closeSection(locationHeader);
			}
			else
			{
			// closeAllSections is not compatible with the current standard.
			// All sections stay open unless a user clicks to close.
			// helpAccordion.closeAllSections();
				helpAccordion.openSection(locationHeader);
			}
		},
		openSection : function(currentSection){
			// for the clicked header switch a down arrow for a right arrow
			currentSection.find("span.rightArrowSmall").addClass("downArrowSmall").removeClass("rightArrowSmall");

			// for the clicked header switch the closed bottom to open
			currentSection.addClass("openBottom").removeClass("closeBottom");

			// msg_body always have gradients, just remove it from the open header
			currentSection.removeClass("gradient");

			// open the message body for the clicked header 
			currentSection.next(".msg_body").slideToggle(200);

		},
		closeSection : function(currentSection){
			// close the message body for the clicked header 
			currentSection.next(".msg_body").slideToggle(200);

			// change all the bottom open headers to closed
			currentSection.removeClass("openBottom").addClass("closeBottom");

			//all closed header have to have the gradient
			currentSection.addClass("gradient");

			// for message header, make and down arrow back to right arrows
			currentSection.find("span.downArrowSmall").removeClass("downArrowSmall").addClass("rightArrowSmall");

		},
		closeAllSections : function(){
			//look for any open message bodies and close them
			$(".msg_body").hide(); //hide all message bodies

			// change all the bottom open headers to closed
			$(".msg_head").removeClass("openBottom").addClass("closeBottom");

			//all closed header have to have the gradient
			$(".msg_head").removeClass("gradient");

			// for all message headers, make and down arrow back to right arrows
			$(".msg_head").find("span.downArrowSmall").removeClass("downArrowSmall").addClass("rightArrowSmall");
		},
		openAllSections : function(){
			//look for any closed message bodies and open them
			$(".msg_body").show(); //show all message bodies

			// change all the bottom open headers to closed
			$(".msg_head").removeClass("closeBottom").addClass("openBottom");

			//all closed header have to have the gradient
			$(".msg_head").addClass("gradient");

			// for all message headers, make and down arrow back to right arrows
			$(".msg_head").find("span.rightArrowSmall").addClass("downArrowSmall").removeClass("rightArrowSmall");
		}
}
/* $Id: marqueeImageSlideShow.js 1914 2012-03-30 17:26:26Z jowilso $ */

function initMarqueeImageSlideShow(componentId, imgCount, interval) 
{



	var imageCount = imgCount;
	var currImg = "#" + componentId + "-image1";
	var currThumb = "#" + componentId + "-thumb1";
	var currLeadThumb = "#" + componentId + "-leadThumb1";
	var prevImg = null;
	var prevThumb = null;
	var prevLeadThumb = null;
	var isPlaying = true;
	var indx = 0;
	var metronome = setTimeout(triggerSlide, interval);
	$(currThumb).addClass("activeBtn");
	$(currLeadThumb).addClass("activeThumb");
		
	function triggerSlide() 
	{
			prevImg = currImg;
			prevThumb = currThumb;
			prevLeadThumb = currLeadThumb;
			if (indx == (imageCount-1)) 
			{
				indx = 0;
				currImg = "#" + componentId + "-image1";
				currThumb = "#" + componentId + "-thumb1";
				currLeadThumb = "#" + componentId + "-leadThumb1";
				isPlaying = false;
			}
			else
			{
				indx += 1;
				currImg = "#" + componentId + "-image" + (indx + 1);
				currThumb = "#" + componentId + "-thumb" + (indx + 1);
				currLeadThumb = "#" + componentId + "-leadThumb" +(indx + 1);
			}
			fade();
			
			if(isPlaying)
			{
				metronome = setTimeout(triggerSlide, interval);
			}
	}
	
	/*--    THUMB CLICK EVENT HANDLER    -----------------------*/                    
	$("#" + componentId + "-thumbs li a").click(function () {
		clearTimeout(metronome);
		isPlaying = false;
		if (currImg) 
		{ 
			prevImg = currImg; 
		}
		if (currThumb) 
		{ 
			prevThumb = currThumb;
		}
		if(currLeadThumb)
		{
			prevLeadThumb = currLeadThumb;
		}
		//indx = (this.id).substring(this.id.length-1, this.id.length) - 1;
		indx = $("#" + componentId + "-thumbs li a").index(this);
		currThumb = "#" + componentId + "-thumb" + (indx + 1);
		currImg = "#" + componentId + "-image" + (indx + 1);
		currLeadThumb = "#" + componentId + "-leadThumb" +(indx + 1);
		fade();
	});
	
	function fade() 
	{
		if (currImg != prevImg) 
		{
			$(currImg).css("z-index", "auto").fadeIn("slow");
			$(currThumb).addClass("activeBtn");
			$(currLeadThumb).addClass("activeThumb");
			$(prevThumb).removeClass("activeBtn");
			$(prevLeadThumb).removeClass("activeThumb");
			if(prevImg){ $(prevImg).css("z-index", "auto").fadeOut("fast");}
		}	
	}
}
(function($) {
	$.extend({
		tablesorterPager: new function() {
			
			function updatePageDisplay(c) {
				var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);	
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {
				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			this.defaults = {
				size: 20,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisplay',
				cssPageSize: '.pagesize',
				seperator: " | ",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));
						return false;
					});
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);				
/*
 * 
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.3
 * @requires jQuery v1.2.3
 * 
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 * 
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column in ascending order.
 * 
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 * @desc Create a tablesorter interface and disableing the first and secound column headers.
 * 
 * @example $('table').tablesorter({ 0: {sorter:"integer"}, 1: {sorter:"currency"} });
 * @desc Create a tablesorter interface and set a column parser for the first and secound column.
 * 
 * 
 * @param Object settings An object literal containing key/value pairs to provide optional settings.
 * 
 * @option String cssHeader (optional) 			A string of the class name to be appended to sortable tr elements in the thead of the table. 
 * 												Default value: "header"
 * 
 * @option String cssAsc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a ascending sort. 
 * 												Default value: "headerSortUp"
 * 
 * @option String cssDesc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a descending sort. 
 * 												Default value: "headerSortDown"
 * 
 * @option String sortInitialOrder (optional) 	A string of the inital sorting order can be asc or desc. 
 * 												Default value: "asc"
 * 
 * @option String sortMultisortKey (optional) 	A string of the multi-column sort key. 
 * 												Default value: "shiftKey"
 * 
 * @option String textExtraction (optional) 	A string of the text-extraction method to use. 
 * 												For complex html structures inside td cell set this option to "complex", 
 * 												on large tables the complex option can be slow. 
 * 												Default value: "simple"
 * 
 * @option Object headers (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortList (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortForce (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is prepended to user-selected rules.
 * 												Default value: null
 *  
  * @option Array sortAppend (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is appended to user-selected rules.
 * 												Default value: null
 * 
 * @option Boolean widthFixed (optional) 		Boolean flag indicating if tablesorter should apply fixed widths to the table columns.
 * 												This is usefull when using the pager companion plugin.
 * 												This options requires the dimension jquery plugin.
 * 												Default value: false
 *
 * @option Boolean cancelSelection (optional) 	Boolean flag indicating if tablesorter should cancel selection of the table headers text.
 * 												Default value: true
 *
 * @option Boolean debug (optional) 			Boolean flag indicating if tablesorter should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 * 
 * @cat Plugins/Tablesorter
 * 
 * @author Christian Bach/christian.bach@polyester.se
 */

(function($) {
	$.extend({
		tablesorter: new function() {
			
			var parsers = [], widgets = [];
			
			this.defaults = {
				cssHeader: "header",
				cssAsc: "headerSortUp",
				cssDesc: "headerSortDown",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				textExtraction: "simple",
				parsers: {}, 
				widgets: [],		
				widgetZebra: {css: ["even","odd"]},
				headers: {},
				widthFixed: false,
				cancelSelection: true,
				sortList: [],
				headerList: [],
				dateFormat: "us",
				decimal: '.',
				debug: false
			};
			
			/* debuging utils */
			function benchmark(s,d) {
				log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
			}
			
			this.benchmark = benchmark;
			
			function log(s) {
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}
						
			/* parsers utils */
			function buildParserCache(table,$headers) {
				
				if(table.config.debug) { var parsersDebug = ""; }
				
				var rows = table.tBodies[0].rows;
				
				if(table.tBodies[0].rows[0]) {

					var list = [], cells = rows[0].cells, l = cells.length;
					
					for (var i=0;i < l; i++) {
						var p = false;
						
						if($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)  ) {
						
							p = getParserById($($headers[i]).metadata().sorter);	
						
						} else if((table.config.headers[i] && table.config.headers[i].sorter)) {
	
							p = getParserById(table.config.headers[i].sorter);
						}
						if(!p) {
							p = detectParserForColumn(table,cells[i]);
						}
	
						if(table.config.debug) { parsersDebug += "column:" + i + " parser:" +p.id + "\n"; }
	
						list.push(p);
					}
				}
				
				if(table.config.debug) { log(parsersDebug); }

				return list;
			};
			
			function detectParserForColumn(table,node) {
				var l = parsers.length;
				for(var i=1; i < l; i++) {
					if(parsers[i].is($.trim(getElementText(table.config,node)),table,node)) {
						return parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return parsers[0];
			}
			
			function getParserById(name) {
				var l = parsers.length;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == name.toLowerCase()) {	
						return parsers[i];
					}
				}
				return false;
			}
			
			/* utils */
			function buildCache(table) {
				
				if(table.config.debug) { var cacheTime = new Date(); }
				
				
				var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
					totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
					parsers = table.config.parsers, 
					cache = {row: [], normalized: []};
				
					for (var i=0;i < totalRows; ++i) {
					
						/** Add the table data to main data array */
						var c = table.tBodies[0].rows[i], cols = [];
					
						cache.row.push($(c));
						
						for(var j=0; j < totalCells; ++j) {
							cols.push(parsers[j].format(getElementText(table.config,c.cells[j]),table,c.cells[j]));	
						}
												
						cols.push(i); // add position for rowCache
						cache.normalized.push(cols);
						cols = null;
					};
				
				if(table.config.debug) { benchmark("Building cache for " + totalRows + " rows:", cacheTime); }
				
				return cache;
			};
			
			function getElementText(config,node) {
				
				if(!node) return "";
								
				var t = "";
				
				if(config.textExtraction == "simple") {
					if(node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
						t = node.childNodes[0].innerHTML;
					} else {
						t = node.innerHTML;
					}
				} else {
					if(typeof(config.textExtraction) == "function") {
						t = config.textExtraction(node);
					} else { 
						t = $(node).text();
					}	
				}
				return t;
			}
			
			function appendToTable(table,cache) {
				
				if(table.config.debug) {var appendTime = new Date()}
				
				var c = cache, 
					r = c.row, 
					n= c.normalized, 
					totalRows = n.length, 
					checkCell = (n[0].length-1), 
					tableBody = $(table.tBodies[0]),
					rows = [];
				
				for (var i=0;i < totalRows; i++) {
					rows.push(r[n[i][checkCell]]);	
					if(!table.config.appender) {
						
						var o = r[n[i][checkCell]];
						var l = o.length;
						for(var j=0; j < l; j++) {
							
							tableBody[0].appendChild(o[j]);
						
						}
						
						//tableBody.append(r[n[i][checkCell]]);
					}
				}	
				
				if(table.config.appender) {
				
					table.config.appender(table,rows);	
				}
				
				rows = null;
				
				if(table.config.debug) { benchmark("Rebuilt table:", appendTime); }
								
				//apply table widgets
				applyWidget(table);
				
				// trigger sortend
				setTimeout(function() {
					$(table).trigger("sortEnd");	
				},0);
				
			};
			
			function buildHeaders(table) {
				
				if(table.config.debug) { var time = new Date(); }
				
				var meta = ($.metadata) ? true : false, tableHeadersRows = [];
			
				for(var i = 0; i < table.tHead.rows.length; i++) { tableHeadersRows[i]=0; };
				
				$tableHeaders = $("thead th",table);
		
				$tableHeaders.each(function(index) {
							
					this.count = 0;
					this.column = index;
					this.order = formatSortingOrder(table.config.sortInitialOrder);
					
					if(checkHeaderMetadata(this) || checkHeaderOptions(table,index)) this.sortDisabled = true;
					
					if(!this.sortDisabled) {
						$(this).addClass(table.config.cssHeader);
					}
					
					// add cell to headerList
					table.config.headerList[index]= this;
				});
				
				if(table.config.debug) { benchmark("Built headers:", time); log($tableHeaders); }
				
				return $tableHeaders;
				
			};
						
		   	function checkCellColSpan(table, rows, row) {
                var arr = [], r = table.tHead.rows, c = r[row].cells;
				
				for(var i=0; i < c.length; i++) {
					var cell = c[i];
					
					if ( cell.colSpan > 1) { 
						arr = arr.concat(checkCellColSpan(table, headerArr,row++));
					} else  {
						if(table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row+1])) {
							arr.push(cell);
						}
						//headerArr[row] = (i+row);
					}
				}
				return arr;
			};
			
			function checkHeaderMetadata(cell) {
				if(($.metadata) && ($(cell).metadata().sorter === false)) { return true; };
				return false;
			}
			
			function checkHeaderOptions(table,i) {	
				if((table.config.headers[i]) && (table.config.headers[i].sorter === false)) { return true; };
				return false;
			}
			
			function applyWidget(table) {
				var c = table.config.widgets;
				var l = c.length;
				for(var i=0; i < l; i++) {
					
					getWidgetById(c[i]).format(table);
				}
				
			}
			
			function getWidgetById(name) {
				var l = widgets.length;
				for(var i=0; i < l; i++) {
					if(widgets[i].id.toLowerCase() == name.toLowerCase() ) {
						return widgets[i]; 
					}
				}
			};
			
			function formatSortingOrder(v) {
				
				if(typeof(v) != "Number") {
					i = (v.toLowerCase() == "desc") ? 1 : 0;
				} else {
					i = (v == (0 || 1)) ? v : 0;
				}
				return i;
			}
			
			function isValueInArray(v, a) {
				var l = a.length;
				for(var i=0; i < l; i++) {
					if(a[i][0] == v) {
						return true;	
					}
				}
				return false;
			}
				
			function setHeadersCss(table,$headers, list, css) {
				// remove all header information
				$headers.removeClass(css[0]).removeClass(css[1]);
				
				var h = [];
				$headers.each(function(offset) {
						if(!this.sortDisabled) {
							h[this.column] = $(this);					
						}
				});
				
				var l = list.length; 
				for(var i=0; i < l; i++) {
					h[list[i][0]].addClass(css[list[i][1]]);
				}
			}
			
			function fixColumnWidth(table,$headers) {
				var c = table.config;
				if(c.widthFixed) {
					var colgroup = $('<colgroup>');
					$("tr:first td",table.tBodies[0]).each(function() {
						colgroup.append($('<col>').css('width',$(this).width()));
					});
					$(table).prepend(colgroup);
				};
			}
			
			function updateHeaderSortCount(table,sortList) {
				var c = table.config, l = sortList.length;
				for(var i=0; i < l; i++) {
					var s = sortList[i], o = c.headerList[s[0]];
					o.count = s[1];
					o.count++;
				}
			}
			
			/* sorting methods */
			function multisort(table,sortList,cache) {
				
				if(table.config.debug) { var sortTime = new Date(); }
				
				var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length;
					
				for(var i=0; i < l; i++) {
					
					var c = sortList[i][0];
					var order = sortList[i][1];
					var s = (getCachedSortType(table.config.parsers,c) == "text") ? ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ? "sortNumeric" : "sortNumericDesc");
					
					var e = "e" + i;
					
					dynamicExp += "var " + e + " = " + s + "(a[" + c + "],b[" + c + "]); ";
					dynamicExp += "if(" + e + ") { return " + e + "; } ";
					dynamicExp += "else { ";
				}
				
				// if value is the same keep orignal order	
				var orgOrderCol = cache.normalized[0].length - 1;
				dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
						
				for(var i=0; i < l; i++) {
					dynamicExp += "}; ";
				}
				
				dynamicExp += "return 0; ";	
				dynamicExp += "}; ";	
				
				eval(dynamicExp);
				
				cache.normalized.sort(sortWrapper);
				
				if(table.config.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time:", sortTime); }
				
				return cache;
			};
			
			function sortText(a,b) {
				return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			};
			
			function sortTextDesc(a,b) {
				return ((b < a) ? -1 : ((b > a) ? 1 : 0));
			};	
			
	 		function sortNumeric(a,b) {
				return a-b;
			};
			
			function sortNumericDesc(a,b) {
				return b-a;
			};
			
			function getCachedSortType(parsers,i) {
				return parsers[i].type;
			};
			
			/* public methods */
			this.construct = function(settings) {

				return this.each(function() {
					
					if(!this.tHead || !this.tBodies) return;
					
					var $this, $document,$headers, cache, config, shiftDown = 0, sortOrder;
					
					this.config = {};
					
					config = $.extend(this.config, $.tablesorter.defaults, settings);
					
					// store common expression for speed					
					$this = $(this);
					
					// build headers
					$headers = buildHeaders(this);
					
					// try to auto detect column type, and store in tables config
					this.config.parsers = buildParserCache(this,$headers);
					
					
					// build the cache for the tbody cells
					cache = buildCache(this);
					
					// get the css class names, could be done else where.
					var sortCSS = [config.cssDesc,config.cssAsc];
					
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers.click(function(e) {
						
						$this.trigger("sortStart");
						
						var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
						
						if(!this.sortDisabled && totalRows > 0) {
							
							
							// store exp, for speed
							var $cell = $(this);
	
							// get current column index
							var i = this.column;
							
							// get current column sort order
							this.order = this.count++ % 2;
							
							// user only whants to sort on one column
							if(!e[config.sortMultiSortKey]) {
								
								// flush the sort list
								config.sortList = [];
								
								if(config.sortForce != null) {
									var a = config.sortForce; 
									for(var j=0; j < a.length; j++) {
										if(a[j][0] != i) {
											config.sortList.push(a[j]);
										}
									}
								}
								
								// add column to sort list
								config.sortList.push([i,this.order]);
							
							// multi column sorting
							} else {
								// the user has clicked on an all ready sortet column.
								if(isValueInArray(i,config.sortList)) {	 
									
									// revers the sorting direction for all tables.
									for(var j=0; j < config.sortList.length; j++) {
										var s = config.sortList[j], o = config.headerList[s[0]];
										if(s[0] == i) {
											o.count = s[1];
											o.count++;
											s[1] = o.count % 2;
										}
									}	
								} else {
									// add column to sort list array
									config.sortList.push([i,this.order]);
								}
							};
							setTimeout(function() {
								//set css for headers
								setHeadersCss($this[0],$headers,config.sortList,sortCSS);
								appendToTable($this[0],multisort($this[0],config.sortList,cache));
							},1);
							// stop normal event by returning false
							return false;
						}
					// cancel selection	
					}).mousedown(function() {
						if(config.cancelSelection) {
							this.onselectstart = function() {return false};
							return false;
						}
					});
					
					// apply easy methods that trigger binded events
					$this.bind("update",function() {
						
						// rebuild parsers.
						this.config.parsers = buildParserCache(this,$headers);
						
						// rebuild the cache map
						cache = buildCache(this);
						
					}).bind("sorton",function(e,list) {
						
						$(this).trigger("sortStart");
						
						config.sortList = list;
						
						// update and store the sortlist
						var sortList = config.sortList;
						
						// update header count index
						updateHeaderSortCount(this,sortList);
						
						//set css for headers
						setHeadersCss(this,$headers,sortList,sortCSS);
						
						
						// sort the table and append it to the dom
						appendToTable(this,multisort(this,sortList,cache));

					}).bind("appendCache",function() {
						
						appendToTable(this,cache);
					
					}).bind("applyWidgetId",function(e,id) {
						
						getWidgetById(id).format(this);
						
					}).bind("applyWidgets",function() {
						// apply widgets
						applyWidget(this);
					});
					
					if($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
						config.sortList = $(this).metadata().sortlist;
					}
					// if user has supplied a sort list to constructor.
					if(config.sortList.length > 0) {
						$this.trigger("sorton",[config.sortList]);	
					}
					
					// apply widgets
					applyWidget(this);
				});
			};
			
			this.addParser = function(parser) {
				var l = parsers.length, a = true;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
						a = false;
					}
				}
				if(a) { parsers.push(parser); };
			};
			
			this.addWidget = function(widget) {
				widgets.push(widget);
			};
			
			this.formatFloat = function(s) {
				var i = parseFloat(s);
				return (isNaN(i)) ? 0 : i;
			};
			this.formatInt = function(s) {
				var i = parseInt(s);
				return (isNaN(i)) ? 0 : i;
			};
			
			this.isDigit = function(s,config) {
				var DECIMAL = '\\' + config.decimal;
				var exp = '/(^[+]?0(' + DECIMAL +'0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)' + DECIMAL +'(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*' + DECIMAL +'0+$)/';
				return RegExp(exp).test($.trim(s));
			};
			
			this.clearTableBody = function(table) {
				if($.browser.msie) {
					function empty() {
						while ( this.firstChild ) this.removeChild( this.firstChild );
					}
					empty.apply(table.tBodies[0]);
				} else {
					table.tBodies[0].innerHTML = "";
				}
			};
		}
	});
	
	// extend plugin scope
	$.fn.extend({
        tablesorter: $.tablesorter.construct
	});
	
	var ts = $.tablesorter;
	
	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s) {
			return true;
		},
		format: function(s) {
			return $.trim(s.toLowerCase());
		},
		type: "text"
	});
	
	ts.addParser({
		id: "digit",
		is: function(s,table) {
			var c = table.config;
			return $.tablesorter.isDigit(s,c);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "currency",
		is: function(s) {
			return /^[£$€?.]/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g),""));
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
		},
		format: function(s) {
			var a = s.split("."), r = "", l = a.length;
			for(var i = 0; i < l; i++) {
				var item = a[i];
			   	if(item.length == 2) {
					r += "0" + item;
			   	} else {
					r += item;
			   	}
			}
			return $.tablesorter.formatFloat(r);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "url",
		is: function(s) {
			return /^(https?|ftp|file):\/\/$/.test(s);
		},
		format: function(s) {
			return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));
		},
		type: "text"
	});
	
	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g),"/")).getTime() : "0");
		},
		type: "numeric"
	});
		
	ts.addParser({
		id: "percent",
		is: function(s) { 
			return /\%$/.test($.trim(s));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate",
		is: function(s) {
			return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
		},
		format: function(s,table) {
			var c = table.config;
			s = s.replace(/\-/g,"/");
			if(c.dateFormat == "us") {
				// reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
			} else if(c.dateFormat == "uk") {
				//reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
			} else if(c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");	
			}
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
	    id: "time",
	    is: function(s) {
	        return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
	    },
	    format: function(s) {
	        return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
	    },
	  type: "numeric"
	});
	
	
	ts.addParser({
	    id: "metadata",
	    is: function(s) {
	        return false;
	    },
	    format: function(s,table,cell) {
			var c = table.config, p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
	        return $(cell).metadata()[p];
	    },
	  type: "numeric"
	});
	
	// add default widgets
	ts.addWidget({
		id: "zebra",
		format: function(table) {
			if(table.config.debug) { var time = new Date(); }
			$("tr:visible",table.tBodies[0])
	        .filter(':even')
	        .removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0])
	        .end().filter(':odd')
	        .removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);
			if(table.config.debug) { $.tablesorter.benchmark("Applying Zebra widget", time); }
		}
	});	
})(jQuery);
(function($) {
	$.extend({
		tablesorterMultiPager: new function() {
		
		              function setCookie(c_name,value,expiredays) {
                                                var exdate=new Date();
                                                exdate.setDate(exdate.getDate()+expiredays);
                                                document.cookie=c_name+ "=" +escape(value)+
                                                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
                                            }
			
			function updatePageDisplay(table) {
			              
			              var c = table.config;
			              if (c.totalRows >= c.minItemsForPaging) {
    			                  var multiPager = 
                                                                    "<div class='show' id='pages' style='padding-left:30px; padding-right:30px; top-margin:8px' >" +
                                                                        "<a href='#'  class='previousBtn' id='" + (c.page-1) + "'><div class='arrowLeft'></div></a>";
                                                              for (var i = 0; i < c.totalPages; i++)  {
                                                                  if ((i  > (c.page - 5)) && (i  < (c.page + 5))) { 
                                                                    if (i  == c.page) {
                                                                        multiPager = multiPager +
                                                                            "<div class='current'>" + (i + 1) + "</div>";
                                                                    } else {
                                                                        multiPager = multiPager +
                                                                            "<a href='#' id='" + i  + "' >" + (i + 1) + "</a>";
                                                                    }
                                                                  }
                                                              }
                                                               multiPager = multiPager +
                                                                        "<a href='#' class='nextBtn' id='" + (c.page+1) + "'><div class='arrowRight'></div></a>" +
                                                                    "</div>" +
                                                                    "<div class='show' >" + 
                                                                        c.items + " per page: " +
                                                                        "<select name='itemsPerPage'>" +
                                                                        "<option style='padding-right:4px;' value='5'>5</option>" +
                                                                        "<option style='padding-right:4px;' value='10'>10</option>" +
                                                                        "<option style='padding-right:4px;' value='15'>15</option>" +
                                                                        "<option style='padding-right:4px;' value='20'>20</option>"
                                                                        "</select>" +
                                                                    "</div>";
                                                                $('.MultiPager > *').remove();
	    		                    $('.MultiPager').append(multiPager);
	    		                    
	    		                    $('.MultiPager option[value="' + c.size +'"]').attr('selected', true);
	    		                    
	    		                    if (c.page == 0) {
	    		                        $('.MultiPager #pages .previousBtn').hide();
        	    		                    }
			                    if (c.page == (c.totalPages - 1)) {
			                        $('.MultiPager #pages .nextBtn').hide();
			                    }
			                
			                    // events
			                    $('.MultiPager #pages a').click( function() {
			                        var pageNum = $(this).attr('id');
    		                        if (pageNum) {
      		                            c.page = parseInt(pageNum);
      			                        moveToPage(table);
      			                        
      			                        var o = $('.MultiPager').offset();
                                        $('html, body').animate({
                                          scrollTop: o.top - 60
                                        }, 1000);
            			           }
            			         return false;
				                });
			                 
                                $(".MultiPager select[name='itemsPerPage']").change(function() { 
                                    setPageSize(table, parseInt($(this).find('option:selected').val(), 10));
                                    
                                    var o = $('.MultiPager').offset();
                                    $('html, body').animate({
                                      scrollTop: o.top - 60
                                    }, 1000);
                                    return false;
                                });
                                                    }
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				setCookie("itemsPerPage",size,365);
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				    }
				}
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				    }
// In CQ5 we now deal with random unique IDs created for each table element.  The scrollTop must be placed within the JSP.
//				    $( 'html, body' ).delay(500).animate( { scrollTop: $('#sortableTable').offset().top - 300}, 'fast' );
				    renderTable(table,c.rowsCopy);
				}
			}
			
			function renderTable(table,rows) {
				var c = table.config;
				
			              if (c.totalRows >= c.minItemsForPaging) {
    				    var l = rows.length;
				    var s = (c.page * c.size);
				    var e = (s + c.size);
				    if(e > rows.length ) {
					e = rows.length;
				    }
				    var tableBody = $(table.tBodies[0]);
				    // clear the table body
				    $.tablesorter.clearTableBody(table);
				    for(var i = s; i < e; i++) {
					//tableBody.append(rows[i]);
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				    }
				} else {
				    var l = rows.length;
				    var tableBody = $(table.tBodies[0]);
				    // clear the table body
				    $.tablesorter.clearTableBody(table);
				    for(var i = 0; i < c.totalRows; i++) {
					//tableBody.append(rows[i]);
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				    }
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
			              if (c.totalRows >= c.minItemsForPaging) {
				    if( c.page >= c.totalPages ) {
        			                        moveToLastPage(table);
        			                    }
				}
				
				updatePageDisplay(table);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			var itemsPerPageStr = getCookie("itemsPerPage");
			var itemsPerPage = parseInt(itemsPerPageStr);
			if  ((!itemsPerPageStr) || (isNaN(itemsPerPage))) {
			    itemsPerPageStr = '20';
			    itemsPerPage = 20;
			}
			setCookie("itemsPerPage",itemsPerPageStr,365);
			
			this.defaults = {
			               items: 'Items', 
			               size: itemsPerPage,
			               minItemsForPaging: 20,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisply',
				cssPageSize: '.pagesize',
				seperator: " | ",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterMultiPager.defaults, settings);
					
					var table = this;
				
					$(this).trigger("appendCache");
										
					config.size = parseInt($(".MultiPager select[name='itemsPerPage']:first option:selected").val());
					
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
                    tablesorterMultiPager: $.tablesorterMultiPager.construct
	});
	
})(jQuery);				
