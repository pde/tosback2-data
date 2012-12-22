/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * MIT License
 * Check out the README.md file for instructions and optimizations
*/
(function(win){
	//defaults / mixins
	var	rwdi = (function(){
			var defaults = {
				// this option assumes data- attributes aren't in use
				// set to false if you need them (see README.md)
				immediateRedirect:	true,
				//default width for small/large images
				widthBreakPoint:	480,
				cookieName: 		"rwdimgsize",
				cookiePath: 		"/" 
				
				/* The path above is set to "/" For the sake of testing on the development subdomain. When the site is moved to the bostonglobe.com primary domain, the line above will need to be changed to the following: */
				//cookiePath: 		".bostonglobe.com"

			};
			//mixins from rwd_images global
			if( win.rwd_images ){
				for (var setting in win.rwd_images) {
			        defaults[setting] = win.rwd_images[setting];
			    }
			}
			return defaults;
		})(),		
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = win.screen.availWidth > widthBreakPoint && location.search.indexOf("mobile-assets") <= 0,
		doc = win.document,
		
		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = rwdi.cookieName + "=" + ( wideload ? "large" : "small" ) + "; expires=" + date.toGMTString() + "; path=" + rwdi.cookiePath;
		})();

		//if wideload is false quit now
		if( !wideload ){
			return;
		}
		
		//find and replace img elements
		var findrepsrc = function(){
			var imgs = doc.getElementsByTagName('img'),
				il = imgs.length;
				
			for(var i = 0; i < il; i++){
				var img = imgs[i],
					fullsrc = img.getAttribute('data-fullsrc');
					
				if(fullsrc){
					img.src = fullsrc;
				}
			}
		},
			    
	    //flag for whether loop has run already
	    complete = false,
	    
	    //rfind/rep image srcs if wide enough (maybe make this happen at domready?)
	    readyCallback = function(){
	    	if( complete ){ return; }
	    	complete = true;
	    	findrepsrc();
	    },
	
		unsetCookie = function(){
			document.cookie = rwdi.cookieName + "=; expires=" + (new Date()).toGMTString() + "; path=" + rwdi.cookiePath;
		};
		
	//DOM-ready or onload handler
	//W3C event model
	if ( doc.addEventListener ) {
		doc.addEventListener( "DOMContentLoaded", readyCallback, false );
		//fallback
		win.addEventListener( "load", function(){
			readyCallback();
			unsetCookie();
		}, false );
		
	}
	// If IE event model is used
	else if ( doc.attachEvent ) {
		doc.attachEvent("onreadystatechange", readyCallback );
		//fallback
		win.attachEvent( "onload", function(){
			readyCallback();
			unsetCookie();
		} );
	}
})(this);

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var w=e.document,s=w.documentElement,i=[],k=[],q=[],o={},h=30,f=w.getElementsByTagName("head")[0]||s,g=w.getElementsByTagName("base")[0],b=f.getElementsByTagName("link"),d=[],a=function(){var D=b,y=D.length,B=0,A,z,C,x;for(;B<y;B++){A=D[B],z=A.href,C=A.media,x=A.rel&&A.rel.toLowerCase()==="stylesheet";if(!!z&&x&&!o[z]){if(A.styleSheet&&A.styleSheet.rawCssText){m(A.styleSheet.rawCssText,z,C);o[z]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(z)&&!g)||z.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:z,media:C})}}}}u()},u=function(){if(d.length){var x=d.shift();n(x.href,function(y){m(y,x.href,x.media);o[x.href]=true;u()})}},m=function(I,x,z){var G=I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),J=G&&G.length||0,x=x.substring(0,x.lastIndexOf("/")),y=function(K){return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+x+"$2$3")},A=!J&&z,D=0,C,E,F,B,H;if(x.length){x+="/"}if(A){J=1}for(;D<J;D++){C=0;if(A){E=z;k.push(y(I))}else{E=G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&y(RegExp.$2))}B=E.split(",");H=B.length;for(;C<H;C++){F=B[C];i.push({media:F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:k.length-1,hasquery:F.indexOf("(")>-1,minw:F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}j()},l,r,v=function(){var z,A=w.createElement("div"),x=w.body,y=false;A.style.cssText="position:absolute;font-size:1em;width:1em";if(!x){x=y=w.createElement("body");x.style.background="none"}x.appendChild(A);s.insertBefore(x,s.firstChild);z=A.offsetWidth;if(y){s.removeChild(x)}else{x.removeChild(A)}z=p=parseFloat(z);return z},p,j=function(I){var x="clientWidth",B=s[x],H=w.compatMode==="CSS1Compat"&&B||w.body[x]||B,D={},G=b[b.length-1],z=(new Date()).getTime();if(I&&l&&z-l<h){clearTimeout(r);r=setTimeout(j,h);return}else{l=z}for(var E in i){var K=i[E],C=K.minw,J=K.maxw,A=C===null,L=J===null,y="em";if(!!C){C=parseFloat(C)*(C.indexOf(y)>-1?(p||v()):1)}if(!!J){J=parseFloat(J)*(J.indexOf(y)>-1?(p||v()):1)}if(!K.hasquery||(!A||!L)&&(A||H>=C)&&(L||H<=J)){if(!D[K.media]){D[K.media]=[]}D[K.media].push(k[K.rules])}}for(var E in q){if(q[E]&&q[E].parentNode===f){f.removeChild(q[E])}}for(var E in D){var M=w.createElement("style"),F=D[E].join("\n");M.type="text/css";M.media=E;f.insertBefore(M,G.nextSibling);if(M.styleSheet){M.styleSheet.cssText=F}else{M.appendChild(w.createTextNode(F))}q.push(M)}},n=function(x,z){var y=c();if(!y){return}y.open("GET",x,true);y.onreadystatechange=function(){if(y.readyState!=4||y.status!=200&&y.status!=304){return}z(y.responseText)};if(y.readyState==4){return}y.send(null)},c=(function(){var x=false;try{x=new XMLHttpRequest()}catch(y){x=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return x}})();a();respond.update=a;function t(){j(true)}if(e.addEventListener){e.addEventListener("resize",t,false)}else{if(e.attachEvent){e.attachEvent("onresize",t)}}})(this);

/* Modernizr custom build of 1.7: applicationcache | localstorage | touch | iepp | innerShiv */

/* disable IEPP - the site is not printing well in IE, and this helps */
window.iepp = { disablePP: true };

/* Modernizr */
;window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.touch=function(){return"ontouchstart"in a||w("@media ("+o.join("touch-enabled),(")+"modernizr)")},r.localstorage=function(){try{return!!localStorage.getItem}catch(a){return!1}},r.applicationcache=function(){return!!a.applicationCache};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,f&&a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function p(a,b){var c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+=" iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document);

document.documentElement.className = document.documentElement.className.replace( "applicationcache", "");

/* innerShiv Plugin for appending HTML5 elements */
window.innerShiv=(function(){var lteIE8 = document.documentElement.className.match( /ie6|ie7|ie8/ ),d,r;return function(h,u){if(!lteIE8){return h}if(!d){d=document.createElement("div");r=document.createDocumentFragment();d.style.display="none";d.style.display="none"}var e=d.cloneNode(true);document.body.appendChild(e);e.innerHTML=h.replace(/^\s\s*/,"").replace(/\s\s*$/,"");document.body.removeChild(e);if(u===false){return e.childNodes}var f=r.cloneNode(true),i=e.childNodes.length;while(i--){f.appendChild(e.firstChild)}return f}}());

// display: table and table-cell test. (both are tested under one name "table-cell" )
// By @scottjehl
Modernizr.addTest( "display-table",function(){
  
  var doc   = window.document,
      docElem = doc.documentElement,   
      parent  = doc.createElement( "div" ),
      child = doc.createElement( "div" ),
      childb  = doc.createElement( "div" ),
      ret;
  
  parent.style.cssText = "display: table";
  child.style.cssText = childb.style.cssText = "display: table-cell; padding: 10px";    
          
  parent.appendChild( child );
  parent.appendChild( childb );
  docElem.insertBefore( parent, docElem.firstChild );
  
  ret = child.offsetLeft < childb.offsetLeft;
  docElem.removeChild(parent);
  return ret; 
});

//some quick support flags for enhanced scripting/styles
(function(win, undefined){
	//define some globals
	var doc 		= win.document,
		docElem 	= doc.documentElement,
		head		= doc.head || doc.getElementsByTagName( "head" )[0] || docElem,
		Modernizr	= win.Modernizr;

	//define "globe" global namespace
	globe = {};
	
	// mixins - utility object extender
	globe.extend = function( obj, props ){
		for (var i in props ) {
	        obj[i] = props[i];
	    }
	    return globe;
	};
	
	//support hash
	globe.extend( globe, {
		browser	: {},
		dev		: {},
		support	: {}
	});
	
	//define a few browsers (from conditional comments)
	var docElem = win.document.documentElement;
	globe.browser.ie6 = docElem.className.indexOf( "ie6" ) >= 0;
	globe.browser.ie7 = docElem.className.indexOf( "ie7" ) >= 0;
	globe.browser.ie8 = docElem.className.indexOf( "ie8" ) >= 0;	
	
	//dev mobile assets flag: use for previewing mobile-optimized assets
	globe.dev.mobileOverride = location.search.indexOf("mobile-assets") >= 0;
	
	//callback for dependencies. 
	// You can use isDefined to run code as soon as the document.body is defined, for example, for body-dependent scripts
	// or, for a script that's loaded asynchronously that depends on other scripts, such as jQuery.
	// First argument is the property that must be defined, second is the callback function
	globe.onDefine = function( prop, callback ){
		var callbackStack 	= [];
		
		if( callback ){
			callbackStack.push( callback );
		}
		
		function checkRun(){
			if( eval( prop ) ){
				while( callbackStack[0] && typeof( callbackStack[0] ) === "function" ){
					callbackStack.shift().call( win );
				}
			}
			else{
				setTimeout(checkRun, 15); 
			}
		};
		
		checkRun();
	};
	
	// shortcut of isDefine body-specific 
	globe.bodyready = function( callback ){
		globe.onDefine( "document.body", callback );
	};
	
	/* Asset loading functions:
		- globe.load is a simple script or stylesheet loader
		- scripts can be loaded via the globe.load.script() function
		- Styles can be loaded via the globe.load.style() function, 
		  which accepts an href and an optional media attribute
	*/

	//loading functions available on globe.load
	globe.load = {};

	//define globe.load.style
	globe.load.style = function( href, media ){
		if( !href ){ return; }
		var lk			= doc.createElement( "link" ),
			links		= head.getElementsByTagName("link"),
			lastlink	= links[links.length-1];
			lk.type 	= "text/css";
			lk.href 	= href;
			lk.rel		= "stylesheet";
			if( media ){
				lk.media = media;
			}
			
			//if respond.js is present, be sure to update its media queries cache once this stylesheet loads
			//IE should have no problems with the load event on links, unlike other browsers
			if( "respond" in window ){
				lk.onload = respond.update;
			}
			
			//might need to wait until DOMReady in IE...
			if( lastlink && lastlink.nextSibling ){
				head.insertBefore(lk, lastlink.nextSibling );
			} else {
				head.appendChild( lk );
			}
	};
	
	//define globe.load.script
	globe.load.script = function( src, callback ){
		if( !src ){ return; }
		var script		= doc.createElement( "script" ),
			fc			= head.firstChild;
		
		script.src 	= src;

		//might need to wait until DOMReady in IE...
		if( fc ){
			head.insertBefore(script, fc );
		} else {
			head.appendChild( script );
		}
		
		if( callback ) {
			script.onload = callback;
		}
	};
	
	// load a script, then fire a local callback function when script is finished loading
	globe.load.wait = function( src, callback ) {
		if( !src ) { return; } 
		
		var script		= doc.createElement( "script" ),
			fc			= head.firstChild;
			script.src 	= src;
			
			loadCheck = function() {
				if( this.readyState === 'complete' || this.readyState === 'loaded'){
					callback();
				}
			};
			
			script.onreadystatechange = loadCheck; // IE
			script.onload = callback; // Others
			
			//might need to wait until DOMReady in IE...
			if( fc ){
				head.insertBefore(script, fc );
			} else {
				head.appendChild( script );
			}
	};
	
	//quick element class existence function
	globe.hasClass = function( el, classname ){
		return el.className.indexOf( classname ) >= 0;
	};
	
	//cookie functions - set,get,forget
	globe.cookie = {
		set: function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		forget: function(name) {
			createCookie(name, "", -1);
		}
	};
	
	//extend globe.support with some modernizr definitions
	globe.extend( globe.support, {
		localStorage		: Modernizr.localstorage,
		applicationcache	: Modernizr.applicationcache,
		touch				: Modernizr.touch,
		displayTable		: Modernizr[ "display-table" ]
	});
	
	
		
	/*
		- CURRENT ITERATION
		- Function to send click to MSS so that the stats servlet can keep track of the most click (most popular)
		- Method expects at least two object properties, 1) loidEx and 2) portalCommons ( an instance of PortalCommons js from EIDOS )
	*/
	globe.stats = {};
	globe.stats.url = '/Statistics';
	globe.stats.update = function ( obj ){ 
		var counter = "visits",
    	loidEx = obj.loidEx,
		url = globe.stats.url + '?counter=' + escape(counter) + '&loid=' + escape( obj.loidEx ),
		data = "1",
		errorCode = obj.portalCommons.postRemoteHTML(url,data);
		
		if (errorCode == 0){
			//console.log('Thank for sharing on '+counter+'!');
		} else {
			//console.log('Error #' + errorCode );
		}			

	};
	
	
	
	// Future iteration WIP. Depends on new wait() method in this file
	/*
		- Sends click to MSS so that the stats servlet can keep track of the most click (most popular)
		- Method expects at least two object properties, 1) loidEx and 2) portalCommons ( an instance of PortalCommons js from EIDOS )
	*/
	/*
	globe.stats = {};
	globe.stats.url = '/Statistics';
	globe.stats.update = function (){
		var counter = "visits",
    		loidEx = $('meta[name=eomportal-loid]').prop('content'),
			url = globe.stats.url + '?counter=' + escape(counter) + '&loid=' + escape( loidEx ),
			data = "1";
			
			if( PortalCommons ){ // sanity check
				var errorCode = PortalCommons.postRemoteHTML(url,data); // PortalCommons obj gets loaded in globe-controller.js
			}
		
		if (errorCode == 0){
			//console.log('Thank for sharing on '+counter+'!');
		} else {
			//console.log('Error #' + errorCode );
		}
					
	};
	*/
	
	
	
	
	

	
})(this);


/*
Boston Globe JS asset controller
*/
(function(win, undefined){
	//define some globals
	var doc 		= win.document,
		docElem 	= doc.documentElement,
		head		= doc.head || doc.getElementsByTagName( "head" )[0] || docElem,
		globe	= win.globe,
		isStub	= false;
	
	//testing for our environment - devedit, prdedit, etc. 
	globe.environment = win.location.hostname.split('.')[0];
	
	//native media-query supporting browsers (and IE6+) are "enhanced"
	globe.enhanced 	= (respond.mediaQueriesSupported || globe.browser.ie6 || globe.browser.ie7 || globe.browser.ie8) && !(win.blackberry && !win.WebKitPoint);

	//non-mq-supporting browsers, exit here
	if( !globe.enhanced ){ 
		return;
	}

	//From here on -> enhanced experience
	docElem.className += " enhanced enhanced-rendering";	

	//remove the basic stylesheet
	var basicCSS = doc.getElementById( "basic-css" );
	if( basicCSS ){
		head.removeChild( basicCSS );
	}
	
	//add class to html element for homescreen mode
	if ( win.navigator.standalone ) {
		docElem.className += " standalone";	
	}

	//define file loading paths
	globe.config = {
		path: {
			"js"	: "/js/",
			"css"	: "/css/",
			"img"	: "_img/"
		}
	};
	
	globe.helpers = {};
	
	//define advertising urls, defaults
	globe.OAS = {
		//ad server url
		url : "http://rmedia.boston.com/RealMedia/ads/adstream_sx.ads/"
		//default sitepage
		,sitepage : "www.bostonglobe.com/news/traffic"
	};
	
	globe.analytics = {
		omniture: {},
		gravity: { 
			type       : 'content', 
			site_guid  : '73d84e96d2a2c9c7606d59891bd912b5'
		}
    };

	//define scripts and style assets for conditional loading
	globe.assets = {
		js: {
			jQuery				: "lib/jquery.js",
			uiCore				: "lib/jquery-ui-core.min.js",
			touch				: "lib/jquery.touch.js",
			resize				: "lib/jquery.throttledresize.js",
			ajaxInc				: "lib/jquery-ajax-include.js",
			uiWidget			: "lib/jquery-ui-widget.min.js",
			uiMouse				: "lib/jquery-ui-mouse.min.js",
			uiResizable			: "lib/jquery-ui-resizable.min.js",
			transfer			: "lib/jquery.transfer.js",
			uiDatepicker		: "lib/jquery-ui-datepicker.min.js",
			delayedEnter		: "lib/jquery.delayedenter.min.js",
			collapsible			: "lib/jquery.collapsible.js",
			carousel			: "lib/jquery.carousel.js",
			growlerCarousel		: "lib/jquery.carousel4growler.js",
			stickyScroll		: "lib/jquery.stickyscroll.js",
			countdown			: "lib/jquery.countdown.js,freeTrial-setCountdownTime.js",
			json2				: "lib/json2.js",
			mbox				: "lib/mbox.js", //Test and Target from MEC
			mboxinit			: "mboxinit.js", //Test and Target init code
			placeholder			: "lib/jquery.placeholder.js",
			picturefill			: "lib/picturefill.js",
			
			//globe-specific
			common				: "globe-common.js",
			masthead			: "globe-masthead.js",
			article				: "globe-article.js,globe-share-tools.js",
			newcomments         : "lib/tiny_mce/tiny_mce.js,globe-newcomments.js",
			gallery				: "globe-gallery.js,globe-share-tools.js",
			gallery_legacy		: "globe-gallery.js,lib/jquery.mobile-1.0b2pre.min.js,lib/jquery.mobile.pagination.js,globe-share-tools.js",
			magazine			: "globe-magazine.js",
			special				: "globe-special.js",
			saved				: "globe-saved.js",
			savedStorage		: "globe-saved-storage.js",
			savedApp			: "globe-saved-app.js",
			savedDrawer         : "globe-saved-drawer.js",
			todaysPaper			: "globe-todays-paper.js",
			frontPageGallery    : "globe-fpgallery.js,lib/jquery.history.js",
			adCatalog			: "globe-adcatalog.js",
			adInclude			: "globe-adinclude.js",
			crossword           : "globe-crossword.js",
			contentInclude		: "globe-contentinclude.js",
			staff				: "globe-staff.js",
			statusmsg			: "globe-statusmsg.js",
			memberCenter		: "globe-membercenter.js",
			serp				: "globe-serp.js",
			regi				: "globe-regi.js", 
			videoplayer			: "globe-videoplayer.js",
			scoreboard			: "globe-scoreboard.js",
			videoSection		: "globe-toolbar.js,globe-share-tools.js,globe-videosection.js",
			portalCommons		: "/commons/js/portal.js",
			analytics           : "globe-analytics.js",
			optimizely			: "lib/optimizely/optimizely-124489811.js",
			optimizelyCDN		: "//cdn.optimizely.com/js/124489811.js",
			growler				: "globe-growler.js"
		},
		css: {
			fonts 				: "globe-fonts.css",
			savedDrawer			: "globe-saved-drawer.css",
			uiDatepicker		: "lib-ui-datepicker.css",
			frontPageGallery	: "globe-fpgallery.css"
			},
		//these are auto-preloaded
		img: [
			globe.config.path.img + "ajax-loader.gif"
		]
	};


	//start compiling which scripts and styles to load based on various conditions
	var jsToLoad = [
			globe.assets.js.jQuery,
			globe.assets.js.analytics,
			globe.assets.js.resize,
			globe.assets.js.carousel,
			globe.assets.js.collapsible,
			globe.assets.js.stickyScroll,
			globe.assets.js.delayedEnter,
			globe.assets.js.ajaxInc,
			globe.assets.js.statusmsg,
			globe.assets.js.common,
			globe.assets.js.masthead,
			globe.assets.js.picturefill
		],
		cssToLoad = [];

	//wait for body to be ready for the rest, so we can check the body class and load accordingly
	globe.bodyready(function(){
	
		var body	 	= doc.body,
			tmplTypes	= [
					"home",
					"internal",
					"crossword",
					"article",
					"gallery",
					"staff",
					"membercenter", 
					"regi"
					
					
			],
			sections	= [
				"my-saved",
				"magazine",
				"special",
				"todays-paper",
				"front-page-gallery",
				"search",
				"video"
			],
			//get longer for loop length
			lLength = tmplTypes.length > sections.length ? tmplTypes.length : sections.length;

		//run one loop to determine type, section
		for( var x=0; x < lLength; x++ ){

			if( tmplTypes[x] ){
				if( globe.hasClass( body, "type-" + tmplTypes[x] ) ){
					globe.tmplType = tmplTypes[x];
				}
			}

			if( sections[x] ){
				if( globe.hasClass( body, "section-" + sections[x] ) ){
					globe.section = sections[x];
				}
			}
			if (globe.hasClass( body, "stub")){
				isStub = true;
			}		
		}
		//cache some section/type lookups
		var gallery			=	globe.tmplType		=== "gallery",
			crossword       =   globe.tmplType      === "crossword",
			magazine		=	globe.section		=== "magazine",
			savedApp		=	globe.section		=== "my-saved",
			todaysPaper		=	globe.section		=== "todays-paper",
			fpGallery		=   globe.section		=== "front-page-gallery",
			video			=	globe.section		=== "video",
			loggedIn       	=   globe.cookie.get( "pathAuth" ), // TODO better login detection
			savedDrawer		=	window.screen.width > 480 
							&& !globe.support.touch 
							&& !globe.browser.ie6 
							&& !globe.dev.mobileOverride
							&& !globe.hasClass( body, "no-saved-drawer"),
		    analyticsIndex=-1; // for removing globe-analytics.js on regi pages ...this process WILL be fixed

		//load custom fonts at > 480px
		if( window.screen.width > 480 && !savedApp && !globe.dev.mobileOverride ){
			cssToLoad.push( globe.assets.css.fonts );
			//add non-fontface classname
			docElem.className += " fontface";
		}

		
		//touch event optimizations
		
		// If it's a device that supports touch...
		var touch = globe.support.touch;
		if( touch || savedApp ) {
			jsToLoad.push( globe.assets.js.touch );
		}
		
		//when binding to click for UI behavior scripting, bind to globe.e[click, down, up, move]
		//for improved responsiveness on touch devices
		globe.e = {};
		globe.extend( globe.e, {
			click	: touch ? "vclick"		: "click",
			down		: touch ? "vmousedown"	: "mousedown",
			up		: touch ? "vmouseup"	: "mouseup",
			move		: touch ? "vmousemove"	: "mousemove"
		});
		globe.loggedIn = loggedIn;
		globe.firstClick = false;
		
		//add article JS 
		if( globe.tmplType === "article" ){
		
			jsToLoad.push(globe.assets.js.article);
			
			// Load Comment JS
			cssToLoad.push( "globe-comments.css" );
			
			// Mbox stuff
			//jsToLoad.push(globe.assets.js.mbox);
			//add a class to the HTML element while mbox js is loading
			//docElem.className += " mbox-loading";	
			//globe.load.script( "/js/" + globe.assets.js.mboxinit );
		}
		
		// add video section page JS and css	
		if ( globe.section === "video" ) {
			jsToLoad.push( globe.assets.js.videoSection );
			cssToLoad.push( "globe-videosection.css" );	
		}
		
		//GROWLER	
		//first we check our environment to remove the growler on QA-EDIT and PRD-EDIT - SEE BGLOBE-2778
		if (globe.browser.ie6 === true || globe.browser.ie7 === true || globe.browser.ie8 === true){

		}// end IE < 9 check
		else {
			if (globe.environment != 'prdedit'){
				if (globe.tmplType != 'article' && isStub === true){
					//a false value indicates we are on an internal page that has been arrived at by navigating from one page/section to another.
					//it also means we are not on an article page
					//this value is used in globe-growler.js to determine if the timer or scroll trigger are active
					globe.growlerTrigger = false;
				} else {
					globe.growlerTrigger = true;
				}
				if (!globe.loggedIn && isStub === false && globe.tmplType === 'article' || !globe.loggedIn && globe.tmplType != 'article' && globe.tmplType != 'membercenter') {
					jsToLoad.push( globe.assets.js.growlerCarousel );
					jsToLoad.push( globe.assets.js.growler );			
					cssToLoad.push( "globe-growler.css");
				}
			}		
		
		} //
			
		//saved section js is loaded for savedApp page
	
		if ( loggedIn && !video) {
		
			globe.saved = {
				drawer : savedDrawer,
				saveArticleUrl	: "/saved/article",
				savedContentUrl : "/_ajax/saved/content.jpt",
				savedPreviewUrl : "/_ajax/saved/preview.jpt"
			};
			
			if ( globe.support.localStorage ){
				jsToLoad.push( globe.assets.js.json2 )
				jsToLoad.push( globe.assets.js.savedStorage )
			}
			
			jsToLoad.push ( globe.assets.js.saved );
			
			if( savedApp ){
				// hack to disable analytics on mysaved app page
				// caz will fix after testing
				// delete jsToLoad[1];
				jsToLoad.push( globe.assets.js.savedApp );
			}
			
			
			//My Saved Drawer and relevant dependencies
			if( savedDrawer && !savedApp){

				jsToLoad = jsToLoad.concat( [
					globe.assets.js.uiCore,
					globe.assets.js.uiWidget,
					globe.assets.js.uiMouse,
					globe.assets.js.uiResizable,
					globe.assets.js.transfer,
					globe.assets.js.savedDrawer
				] );

				cssToLoad.push( globe.assets.css.savedDrawer );
			}

		} 

		//today's paper and gallery use the datepicker
		if( todaysPaper || gallery || magazine || fpGallery ){
			
			jsToLoad.push( globe.assets.js.uiDatepicker );
			cssToLoad.push( globe.assets.css.uiDatepicker );

			//today's paper scripting
			if( todaysPaper ){
				jsToLoad.push( globe.assets.js.todaysPaper );
			}

			// magazine scripting
			if( magazine ){
				jsToLoad.push( globe.assets.js.magazine );
			}

			//photo galleries
			if( gallery ){
				jsToLoad.push( globe.assets.js.gallery );
			}
			
			if( fpGallery ){
				cssToLoad.push( globe.assets.css.frontPageGallery );
				jsToLoad.push( globe.assets.js.frontPageGallery );
			}
		}

		// Staff bio pages, mostly for radio-toggle interactions
		if (globe.tmplType === "staff") {
			jsToLoad.push( globe.assets.js.staff );
			cssToLoad.push( "globe-staff.css" );			
		}
		
		// Regi/member center	
		if ( globe.tmplType === "membercenter" ) {
			jsToLoad.push( globe.assets.js.memberCenter );
			jsToLoad.push( globe.assets.js.placeholder );
			cssToLoad.push( "globe-membercenter.css" );
			
		}

		// search engine results page	
		if ( globe.section === "search" ) {
			jsToLoad.push( globe.assets.js.serp );
			cssToLoad.push( "globe-serp.css" );			
			
		}
		
		if (globe.section === "special" ) {
			cssToLoad.push("globe-special.css");
			jsToLoad.push( globe.assets.js.special );
		}
		
		// search engine results page	
		if ( globe.tmplType === "regi" ) {
			jsToLoad.push( globe.assets.js.regi );
			cssToLoad.push( "globe-regi-coldwell.css" );	
		}
		
		if ( crossword ) {
            jsToLoad.push( globe.assets.js.crossword );
        }
		
		if ( document.getElementById( "video" ) ) { 
  			jsToLoad.push( globe.assets.js.videoplayer );
		}
		
		if ( document.getElementById("newcomments")) {
			jsToLoad.push( globe.assets.js.newcomments);
		}
		
		if ( document.getElementById( "bg-scores" ) ) {
			jsToLoad.push( globe.assets.js.scoreboard );
		}
		
		if ( document.getElementById( "freeTrialChallenge" ) ) {
			analyticsIndex = 1;
			jsToLoad.push( globe.assets.js.countdown );
			cssToLoad.push( "globe-freeTrial.css" )
		}
		if (globe.tmplType === "home" ) {
			// WISHABI
			cssToLoad.push('wishabi.css');
			jsToLoad.push('lib/wishabi-carousel.js');
			jsToLoad.push('wishabi.js');
		}
		if(analyticsIndex>-1) {
			jsToLoad.splice(analyticsIndex,1);
		}
		
		//ad loader comes last
		if( !savedApp ){
			jsToLoad.push( globe.assets.js.adCatalog + "," + globe.assets.js.adInclude );
		}

		jsToLoad.push( globe.assets.js.contentInclude );

		//load enhanced assets
		globe.load.script( globe.config.path.js + jsToLoad.join(",") );
		
		if( cssToLoad.length ){
			globe.load.style( globe.config.path.css + cssToLoad.join(",") );
		}
	});
	
	
	//scroll to top, hide address bar on mobile devices - 1 for android, 0 for the rest
	if( !location.hash ){
		
		//scroll to top
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return "scrollTop" in doc.body ? doc.body.scrollTop : 1;
			};
			
		
		//reset to 0 on bodyready, if needed
		globe.bodyready(function(){
			var scrollTop = getScrollTop();
			window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
		});
		
		window.onload = function(){
			setTimeout(function(){
				//reset to hide addr bar at onload
				if( getScrollTop() < 20 ) {
					window.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		};
	}

	// WebReflection Solution for ensuring domready fires when dynamically appending jQuery in older browsers
	(function(h,a,c,k){if(h[a]==null&&h[c]){h[a]="loading";h[c](k,c=function(){h[a]="complete";h.removeEventListener(k,c,!1)},!1)}})(document,"readyState","addEventListener","DOMContentLoaded");


})( this );	