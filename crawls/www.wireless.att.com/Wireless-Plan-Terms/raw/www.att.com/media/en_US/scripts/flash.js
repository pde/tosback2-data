
// this class encapsulates swfobject in a way that aims to preserve the still in use parts of the public API of the legacy attws version of flash.js
// while allowing for a single, akamai hosted version of the provided functionality that won't rot out over time
// @author - Andrew Burgess
if(typeof swfobject === 'undefined') {
	// replace this with newer versions of minified swfobject as stable builds are released by google: http://code.google.com/p/swfobject
	// currently at v2.2
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
}
if (typeof flash === 'undefined') {
	// this flag holds a global set by @queryParamsToFlashVars
	var shouldConvertQueryParamsToFlashVars = false;
	var altHolder = '';
	var g_divToUpdate = '';
	if(typeof altFlash != 'undefined') {
		altHolder = altFlash;
	}

	var FlashLibrary = function(){
		// these containers hold the 3 arg types for the object tag
		var newVars;
		var newParams;
		var newAttribs;
		// assetPath is a pointer to the uri of the bootstrap swf
		var assetPath;
		// global debug flag defaults to false
		var logDebug = false;
		
		/* begin JSAM variables */
		var JSAM_loaded;
		//URLs to use JSAM on
		var JSAM_urls = ['/shop/', '/shop/index.jsp', '/shop/bundles/', '/shop/bundles/index.jsp', '/shop/wireless/', '/shop/wireless/index.jsp', '/shop/tv/', '/shop/tv/index.jsp', '/shop/internet/', '/shop/internet/index.jsp', '/shop/home-phone/', '/shop/home-phone/index.jsp', '/shop/u-verse/', '/shop/u-verse/index.jsp', '/shop/special-offers/', '/shop/special-offers/index.jsp'];
		var JSAM_isHomepage = function() {
			if (typeof targetingFW != 'undefined')
				return true;
			return false;
		}();
		var JSAM_myURL = location.pathname.replace(location.hash,'').replace(location.search,'');
		var JSAM_takeOver = function() {
			if (location.search.indexOf('disableJSAM=true')!= -1) {
				return false;
			}
			if (JSAM_isHomepage)
				return true;
			for (var i=0; i<JSAM_urls.length; i++) {
				if (JSAM_urls[i] === JSAM_myURL) {
					return true;
				}
			}
			return false;
		}();
		var JSAM_isEnabled = function() {
			if (location.search.indexOf('enableJSAM=true') != -1) {
				return true;
			}
			return false;
		}();
		/* end JSAM variables */
		
		// debug handler
		this.debug = function(msg) {
			if(typeof console != 'undefined' && logDebug) {
				console.info(msg);
			}
		};

		// this function will re-write the params args given as strings to a JSON struct if needed.
		this.rewriteParams = function(params) {
			var hasPassedInFlashVars = false;
			var baseArr = params.split(( new RegExp( "[,]{1}", "g" ) ));
			var newVarsArr = "{";
			newParams = '{';
			for (var i = 0; i < baseArr.length; i++){
				if (baseArr[i].toLowerCase().indexOf('flashvars') != -1) {
					hasPassedInFlashVars = true;
					if(shouldConvertQueryParamsToFlashVars) {
						baseArr[i] = baseArr[i]+='&'+this.convertQueryParamsToFlashVars();
					}
					newVarsArr += baseArr[i].substring(baseArr[i].indexOf('=') +1 , baseArr[i].length).split('&');
					newVarsArr = newVarsArr.toString().replace(/=/g,':"');
					newVarsArr = newVarsArr.toString().replace(/,/g,'", ');
				} else {
					var base2d = baseArr[i].split('=');
					for (var n=0; n < base2d.length; n++) {
						newParams += base2d[n] + ':"' + base2d[n+1] + '"';
						n = n+1;
					}
				}
				if (newParams != '{' && i == baseArr.length -1) {
					newParams += '}';
				} else if (newParams != '{') {
					newParams += ',';
				}
			}
			if(shouldConvertQueryParamsToFlashVars && !hasPassedInFlashVars) {
				// if we need to convert QP's to flashVars, but there is no existing FlashVars struct to append to
				newVarsArr += this.convertQueryParamsToFlashVars();
				newVarsArr = newVarsArr.replace(/=/g,':"');
				newVarsArr = newVarsArr.replace(/&/g,'", ');
			}
			newVarsArr += '"}';
			try {
				newParams = eval( '(' + newParams + ')');
			} catch (e) {
				this.debug(e.toString());
			}
			if (newVarsArr != '{"}') {
				try {
					newVars = eval( '(' + newVarsArr + ')');
				} catch (e) {
					this.debug(e.toString());
				}
			}
		};

		// this flags whether or not to convert any query params appended to the swfFile path to members of the flashVars struct.
		this.queryParamsToFlashVars = function(flag) {
			if(flag) {
				shouldConvertQueryParamsToFlashVars = true;
			}
		};
	
		//this function supports not changing the public API enough to have to modify teamsite
		this.hasVersion = function(version) {
			//override for pages with JSAM
			if (JSAM_takeOver) {
				return true;
			}
			return swfobject.hasFlashPlayerVersion(version.toString());
		};
	
		//this function supports not changing the public API enough to have to modify teamsite
		this.showNoFlash = function(divToUpdate,alt){
			if(arguments.length > 1) {
				document.getElementById(divToUpdate).innerHTML += alt;
			}
			else {
				document.write(alt);
			}
		}
	
		// this actually does the conversion of query params to flashvars
		this.convertQueryParamsToFlashVars  = function() {
			var addToFlashVars = '';
			if(assetPath.indexOf('?') != -1) {
				var baseP = assetPath.split(( new RegExp( "[?&]{1}", "g" ) ));
				for(i = 1; i <baseP.length; i++) {
					addToFlashVars+= baseP[i];
					addToFlashVars += '&';
				}
				addToFlashVars = addToFlashVars.substring(0,addToFlashVars.length-1);
				this.debug('addToFlashVars = '+addToFlashVars);
				assetPath = assetPath.substring(0,assetPath.indexOf('?'));
			}
			return addToFlashVars;
		};
		
		//recursive loading checker for JSAM includes
		this.JSAM_loader = function(myParams, myHeight, myWidth, numOfReps) {
			if (typeof jQuery !== 'undefined' && !JSAM_loaded) {
				var loader = jQuery(document.createElement('img'))
					.attr({'id':'JSAM_loader', 'src':'/images/global/ajaxLoader.gif'})
					.css({'position':'absolute', 'left':Math.round((myWidth-43)/2) + 'px', 'top':Math.round((myHeight-43)/2) + 'px'});
				if (JSAM_isHomepage)
					loader.css('top', '290px');
				jQuery('#marqueeHolder').css({'height':myHeight+'px', 'width':myWidth+'px', 'position':'relative'})
					.append(loader);
				if (typeof JSAM == 'undefined') {
					// load JSAM_min.js if this isn't the homepage
					if(!(typeof (IS_HOMEPAGE) !== "undefined" && IS_HOMEPAGE === true)) {
						jQuery.getScript('/media/en_US/scripts/JSAM/JSAM_min.js');
					}
				}
				JSAM_loaded = true;
			}
			if (typeof JSAM !== 'undefined' && typeof JSAM_json !== 'undefined') {
				JSAM.createMarquee(myParams, {height:myHeight, width:myWidth});
			}
			else {
				if (typeof numOfReps === 'undefined')
					var numOfReps = '1';
				var delay = (numOfReps > 5? (numOfReps-4)*100: 100);
				numOfReps++;
				setTimeout(function(){flash.JSAM_loader(myParams, myHeight, myWidth, numOfReps);}, delay);
			}
		}
		
		//recursive loading checker for jQuery used to insert Marquee Manager loading gif
		this.loadLoader = function(divToUpdate, width, height, numOfReps) {
			if (typeof jQuery !== 'undefined') {
				var flashDiv = jQuery('#' + divToUpdate);
				var wrapper = jQuery(document.createElement('div'))
					.attr('id', divToUpdate + 'Wrap')
					.css({'width':width+'px', 'height':height+'px', 'position':'relative'});
				flashDiv.wrap(wrapper);
				var loader = jQuery(document.createElement('img'))
					.attr({'id':'MM_loader', 'src':'/images/global/ajaxLoader.gif'})
					.css({'position':'absolute', 'left':Math.round((width-43)/2) + 'px', 'top':Math.round((height-43)/2) + 'px'});
				if (JSAM_isHomepage)
					loader.css('top', '290px');
				loader.insertBefore(flashDiv);
				jQuery(document).ready(function(){
					setTimeout(function(){jQuery('#MM_loader').remove();}, 6000);
				});
			}
			else {
				if (typeof numOfReps === 'undefined')
					var numOfReps = '1';
				var delay = (numOfReps > 5? (numOfReps-4)*100: 100);
				numOfReps++;
				setTimeout(function(){flash.loadLoader(divToUpdate, width, height, numOfReps);}, delay);
			}
		}
		
		// main embed function signature from AWEd flash js
		this.embedMovie = function(divToUpdate,swfFile,width,height,bgcolor,ver,altFormat,params, callbackFn){
			// JSAM start
			if (JSAM_isEnabled || JSAM_takeOver) {
				var myParams;
				var myWidth;
				var myHeight;
				if (arguments[0].indexOf('.swf') === -1) {
					myWidth = arguments[2];
					myHeight = arguments[3];
					myParams = arguments[7];
				}
				else {
					myWidth = arguments[1];
					myHeight = arguments[2];
					myParams = arguments[6];
				}
				flash.JSAM_loader(myParams, myHeight, myWidth);
			}
			else {
			// JSAM end
				if(typeof forceFlashDebugMode != 'undefined') {
					if(forceFlashDebugMode){
						logDebug = true;
						if(params && params.length>0){
							if(params.toLowerCase().indexOf('flashvars=') != -1){
								params = params.replace(/flashvars=/i, 'flashvars=debug=1&');
							}else{
								if(typeof params == 'string') {
									params += 'debug:"1"';
								} else if(typeof params == 'object') {
									params.debug = '1';
								}
							}
						}else{
							params = {debug:"1"};
						}
					}
				}

				if(divToUpdate.indexOf('/') == -1) {
					// passed a div id to inject into, we'll use it, but override with the default if it doesn't exist
					callbackPtr = callbackFn;
					if(typeof callbackPtr == 'undefined' || callbackPtr == null) {callbackPtr = null;} 
					assetPath = swfFile;
					this.debug('PARAMS');
					this.rewriteParams(params);
					ver = ver.toString();
					this.debug('PASSED DIV: '+divToUpdate+' file: '+assetPath);
					var currentDivs = document.getElementsByTagName('div');
					if (currentDivs.length === 1) {
						divToUpdate = 'marqueeHolder';
						if(document.getElementById('marqueeHolder') === null) {
							document.write('<div id="marqueeHolder"></div>');
						}
					} else if(currentDivs.length === 0) {
						divToUpdate = 'marqueeHolder';
						document.write('<div id="marqueeHolder"></div>');
					}
					g_divToUpdate = divToUpdate;
					this.loadLoader(divToUpdate, width, height);  //loader
					swfobject.embedSWF(assetPath, divToUpdate, width, height, ver, "http://www.att.com/media/en_US/swf/expressInstall.swf", newVars, newParams, {'style':'position:relative;'}, callbackPtr );
				}
				else {
					// did not pass a div id to inject the flash into, we'll use the default of marqueeHolder, if it doesnt exist, document.write it
					this.debug('ARGS');
				
					if(typeof callbackFn != 'undefined') {
						callbackPtr = arguments[arguments.length-1];
					} else {
						callbackPtr = null;
					}
					assetPath = arguments[0];
					this.rewriteParams(arguments[6]);
					this.debug('last arg ='+arguments[6]);
					// figure it out
					var arg6ArrStr = arguments[6].toString();
					var arg6Arr = arg6ArrStr.split(',');
					if(arg6Arr.length === 3) {
						var idToPoke = arg6Arr[2].substr(parseInt(arg6Arr[2].indexOf(',')+4), arg6Arr[2].length);
					} else if(arg6Arr.length === 2) {
						var idToPoke = arg6Arr[1].substr(parseInt(arg6Arr[1].indexOf(',')+4), arg6Arr[1].length);
					}
					this.debug('id: '+idToPoke);
					if(document.getElementById(idToPoke) === null) {
						document.write('<div id="'+idToPoke+'"></div>');
					}			
					arguments[4] = arguments[4].toString();
					this.debug('DEFAULT DIV');
					this.debug(newParams);
					this.debug(newVars);
					g_divToUpdate = idToPoke;
					this.loadLoader(idToPoke, arguments[1], arguments[2]); //loader
					swfobject.embedSWF(assetPath, idToPoke, arguments[1], arguments[2], arguments[4], "http://www.att.com/media/en_US/swf/expressInstall.swf", newVars, newParams, {'style':'position:relative;'}, callbackPtr );	
				}
			} //JSAM else
		};

		this.getWindowLocation = function(){
	        return window.location;
	    };

	};
	var flash = new FlashLibrary();
	function rplFlashSetter() {
		rplFlash = function () {
			var flashErrorHandler = document.createElement('div');
			flashErrorHandler.setAttribute('id', 'ad_rpl');
			var p_parentObj = document.getElementById(g_divToUpdate).parentNode;
			p_parentObj.insertBefore(flashErrorHandler, document.getElementById(g_divToUpdate));
			document.getElementById('ad_rpl').innerHTML = altFlash; 
			document.getElementById(g_divToUpdate).style.display = 'none';
			return true;
		} 
	}
	if (window.attachEvent) {
		window.attachEvent("onload", function(){	
			var t=setTimeout("rplFlashSetter();",500);
		});
	} else {
		window.addEventListener('load',function(){
			var t=setTimeout("rplFlashSetter();",500);
		},false);
	}

	rplFlash = function () {
		var flashErrorHandler = document.createElement('div');
		flashErrorHandler.setAttribute('id', 'ad_rpl');
		var p_parentObj = document.getElementById(g_divToUpdate).parentNode;
		p_parentObj.insertBefore(flashErrorHandler, document.getElementById(g_divToUpdate));
		document.getElementById('ad_rpl').innerHTML = altFlash; 
		document.getElementById(g_divToUpdate).style.display = 'none';
		return true;
	}
}