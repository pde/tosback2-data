// Flash and tinymce content scripts

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
/* SWFObject ends */

/* Initializing SWFObject begins */
function initSWFObject(replaceDivID,swfWidth,swfHeight,swfPath,autoplay,params,attributes){
	var flashvars = {};
	if (autoplay!=='false'){
		flashvars.playauto="true";
	}
	if(params == null){
		var params = {};
	}
	params.menu = "false";
	params.quality = "high";
	
	if(location.href.indexOf("vision-entertainment.html") > 0){
		params.wmode = "transparent";
	}
	
	if(attributes == null){
		var attributes = {};	
	}
	
	swfobject.embedSWF(swfPath,replaceDivID,swfWidth,swfHeight,"9.0.0", false, flashvars, params, attributes);
}
/* Initializing SWFObject ends */

/* jqueryui assets */
/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui||(function(c){var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui={version:"1.7.2",plugin:{add:function(k,l,n){var m=c.ui[k].prototype;for(var j in n){m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])}},call:function(j,l,k){var n=j.plugins[l];if(!n||!j.element[0].parentNode){return}for(var m=0;m<n.length;m++){if(j.options[n[m][0]]){n[m][1].apply(j.element,k)}}}},contains:function(k,j){return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)},hasScroll:function(m,k){if(c(m).css("overflow")=="hidden"){return false}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0){return true}m[j]=1;l=(m[j]>0);m[j]=0;return l},isOverAxis:function(k,j,l){return(k>j)&&(k<(j+l))},isOver:function(o,k,n,m,j,l){return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(d){var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l){var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))};c.fn.removeAttr=function(j){return(a.test(j)?this.each(function(){this.removeAttributeNS(h,j.replace(a,""))}):e.call(this,j))}}c.fn.extend({remove:function(){c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return i.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){j=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}else{j=this.parents().filter(function(){return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!j.length?c(document):j}});c.extend(c.expr[":"],{data:function(l,k,j){return !!c.data(l,j[3])},focusable:function(k){var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length},tabbable:function(k){var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")}});function g(m,n,o,l){function k(q){var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\s+/):p)}var j=k("getter");if(l.length==1&&typeof l[0]=="string"){j=j.concat(k("getterSetter"))}return(c.inArray(o,j)!=-1)}c.widget=function(k,j){var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p){var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_"){return this}if(n&&g(l,k,p,o)){var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)}return this.each(function(){var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))})};c[l]=c[l]||{};c[l][k]=function(o,n){var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend({},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r){if(q.target==o){return m._setData(p,r)}}).bind("getData."+k,function(q,p){if(q.target==o){return m._getData(p)}}).bind("remove",function(){return m.destroy()})};c[l][k].prototype=c.extend({},c.widget.prototype,j);c[l][k].getterSetter="option"};c.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")},option:function(l,m){var k=l,j=this;if(typeof l=="string"){if(m===undefined){return this._getData(l)}k={};k[l]=m}c.each(k,function(n,o){j._setData(n,o)})},_getData:function(j){return this.options[j]},_setData:function(j,k){this.options[j]=k;if(j=="disabled"){this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)},_trigger:function(l,m,n){var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent){for(var k=c.event.props.length,o;k;){o=c.event.props[--k];m[o]=m.originalEvent[o]}}this.element.trigger(m,n);return !(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())}};c.widget.defaults={disabled:false};c.ui.mouse={_mouseInit:function(){var j=this;this.element.bind("mousedown."+this.widgetName,function(k){return j._mouseDown(k)}).bind("click."+this.widgetName,function(k){if(j._preventClickEvent){j._preventClickEvent=false;k.stopImmediatePropagation();return false}});if(c.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},_mouseDown:function(l){l.originalEvent=l.originalEvent||{};if(l.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){k.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l)){this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted){l.preventDefault();return true}}this._mouseMoveDelegate=function(n){return k._mouseMove(n)};this._mouseUpDelegate=function(n){return k._mouseUp(n)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true},_mouseMove:function(j){if(c.browser.msie&&!j.button){return this._mouseUp(j)}if(this._mouseStarted){this._mouseDrag(j);return j.preventDefault()}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))}return !this._mouseStarted},_mouseUp:function(j){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)}return false},_mouseDistanceMet:function(j){return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)},_mouseDelayMet:function(j){return this.mouseDelayMet},_mouseStart:function(j){},_mouseDrag:function(j){},_mouseStop:function(j){},_mouseCapture:function(j){return true}};c.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);;/*
 * jQuery UI Tabs 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */
(function(a){a.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable}this._tabify(true)},_setData:function(b,c){if(b=="selected"){if(this.options.collapsible&&c==this.options.selected){return}this.select(c)}else{this.options[b]=c;if(b=="deselectable"){this.options.collapsible=c}this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+a.data(b)},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(c,b){return{tab:c,panel:b,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(n){this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o){var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href)){q=o.hash;o.href=q}if(c.test(q)){p.panels=p.panels.add(p._sanitizeSelector(q))}else{if(q!="#"){a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length){v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)}p.panels=p.panels.add(v)}else{d.disabled.push(r)}}});if(n){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined){if(location.hash){this.anchors.each(function(q,o){if(o.hash==location.hash){d.selected=q;return false}})}if(typeof d.selected!="number"&&d.cookie){d.selected=parseInt(p._cookie(),10)}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}d.selected=d.selected||0}else{if(d.selected===null){d.selected=-1}}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o){return p.lis.index(q)}))).sort();if(a.inArray(d.selected,d.disabled)!=-1){d.disabled.splice(a.inArray(d.selected,d.disabled),1)}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length){this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))});this.load(d.selected)}a(window).bind("unload",function(){p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null})}else{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie){this._cookie(d.selected,d.cookie)}for(var g=0,m;(m=this.lis[g]);g++){a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")}if(d.cache===false){this.anchors.removeData("cache.tabs")}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover"){var f=function(o,i){if(i.is(":not(.ui-state-disabled)")){i.addClass("ui-state-"+o)}};var j=function(o,i){i.removeClass("ui-state-"+o)};this.lis.bind("mouseover.tabs",function(){f("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){f("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var b,h;if(d.fx){if(a.isArray(d.fx)){b=d.fx[0];h=d.fx[1]}else{b=h=d.fx}}function e(i,o){i.css({display:""});if(a.browser.msie&&o.opacity){i[0].style.removeAttribute("filter")}}var k=h?function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function(){e(o,h);p._trigger("show",null,p._ui(i,o[0]))})}:function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))};var l=b?function(o,i){i.animate(b,b.duration||"normal",function(){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")})}:function(o,i,q){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")};this.anchors.bind(d.event+".tabs",function(){var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false){this.blur();return false}d.selected=p.anchors.index(this);p.abort();if(d.collapsible){if(r.hasClass("ui-tabs-selected")){d.selected=-1;if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){l(o,i)}).dequeue("tabs");this.blur();return false}else{if(!i.length){if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this));this.blur();return false}}}if(d.cookie){p._cookie(d.selected,d.cookie)}if(q.length){if(i.length){p.element.queue("tabs",function(){l(o,i)})}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this))}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(a.browser.msie){this.blur()}});this.anchors.bind("click.tabs",function(){return false})},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var c=a.data(this,"href.tabs");if(c){this.href=c}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f){d.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){if(a.data(this,"destroy.tabs")){a(this).remove()}else{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}});if(b.cookie){this._cookie(null,b.cookie)}},add:function(e,d,c){if(c===undefined){c=this.anchors.length}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\{href\}/g,e).replace(/#\{label\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length){f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length){i.appendTo(this.list);f.appendTo(this.list[0].parentNode)}else{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])}g.disabled=a.map(g.disabled,function(k,j){return k>=c?++k:k});this._tabify();if(this.anchors.length==1){i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))},remove:function(b){var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(b+(b+1<this.anchors.length?1:-1))}d.disabled=a.map(a.grep(d.disabled,function(g,f){return g!=b}),function(g,f){return g>=b?--g:g});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))},enable:function(b){var c=this.options;if(a.inArray(b,c.disabled)==-1){return}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d){return e!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))},disable:function(c){var b=this,d=this.options;if(c!=d.selected){this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}},select:function(b){if(typeof b=="string"){b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))}else{if(b===null){b=-1}}if(b==-1&&this.options.collapsible){b=this.options.selected}this.anchors.eq(b).trigger(this.options.event+".tabs")},load:function(e){var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner){var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)}this.xhr=a.ajax(a.extend({},g.ajaxOptions,{url:d,success:function(i,h){a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache){a.data(b,"cache.tabs",true)}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try{g.ajaxOptions.success(i,h)}catch(j){}c.element.dequeue("tabs")}}))},abort:function(){this.element.queue([]);this.panels.stop(false,true);if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup()},url:function(c,b){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.7.2",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(d,f){var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=g.selected;b.select(++i<b.anchors.length?i:0)},d);if(h){h.stopPropagation()}});var e=b._unrotate||(b._unrotate=!f?function(h){if(h.clientX){b.rotate(null)}}:function(h){t=g.selected;c()});if(d){this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate}}})})(jQuery);;
/* jquery ui assets end */

/* jquery jcarousel plugin */
(function(i){i.fn.jcarousel=function(a){if(typeof a=="string"){var c=i(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){i(this).data("jcarousel",new h(this,a))})};var p={vertical:false,rtl:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null, itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},q=false;i(window).bind("load.jcarousel",function(){q=true});i.jcarousel=function(a,c){this.options=i.extend({},p,c||{});this.locked=false;this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===undefined)this.options.rtl= (i(a).attr("dir")||i("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),e=0;e<d.length;e++)if(d[e].indexOf("jcarousel-skin")!=-1){i(a).removeClass(d[e]);b=d[e];break}if(a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"){this.list=i(a);this.container=this.list.parent();if(this.container.hasClass("jcarousel-clip")){if(!this.container.parent().hasClass("jcarousel-container"))this.container= this.container.wrap("<div></div>");this.container=this.container.parent()}else if(!this.container.hasClass("jcarousel-container"))this.container=this.list.wrap("<div></div>").parent()}else{this.container=i(a);this.list=this.container.find("ul,ol").eq(0)}b!=""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.clip=this.list.parent();if(!this.clip.length||!this.clip.hasClass("jcarousel-clip"))this.clip=this.list.wrap("<div></div>").parent(); this.buttonNext=i(".jcarousel-next",this.container);if(this.buttonNext.size()==0&&this.options.buttonNextHTML!=null)this.buttonNext=this.clip.after(this.options.buttonNextHTML).next();this.buttonNext.addClass(this.className("jcarousel-next"));this.buttonPrev=i(".jcarousel-prev",this.container);if(this.buttonPrev.size()==0&&this.options.buttonPrevHTML!=null)this.buttonPrev=this.clip.after(this.options.buttonPrevHTML).next();this.buttonPrev.addClass(this.className("jcarousel-prev"));this.clip.addClass(this.className("jcarousel-clip")).css({overflow:"hidden", position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var f=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;b=this.list.children("li");var g= this;if(b.size()>0){var j=0;e=this.options.offset;b.each(function(){g.format(this,e++);j+=g.dimension(this,f)});this.list.css(this.wh,j+100+"px");if(!c||c.size===undefined)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){g.next()};this.funcPrev=function(){g.prev()};this.funcResize=function(){g.reload()};this.options.initCallback!=null&&this.options.initCallback(this,"init");if(!q&& i.browser.safari){this.buttons(false,false);i(window).bind("load.jcarousel",function(){g.setup()})}else this.setup()};var h=i.jcarousel;h.fn=h.prototype={jcarousel:"0.2.5"};h.fn.extend=h.extend=i.extend;h.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=false;this.tail=this.timer=null;this.inTail=false;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start);this.prevFirst=this.prevLast=null;this.animate(a, false);i(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize)}},reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!=null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!=null&&this.inTail&&this.list.css(this.lt,h.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=false;this.options.reloadCallback!=null&&this.options.reloadCallback(this);if(this.options.visible!= null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(e){b+=a.dimension(this,c);if(e+1<a.first)d=b});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,false)},lock:function(){this.locked=true;this.buttons()},unlock:function(){this.locked=false;this.buttons()},size:function(a){if(a!=undefined){this.options.size=a;this.locked||this.buttons()}return this.options.size},has:function(a,c){if(c==undefined||!c)c= a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return false}return true},get:function(a){return i(".jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,e=i(c);if(b.length==0){var f;b=this.create(a);for(var g=h.intval(a);f=this.get(--g);)if(g<=0||f.length){g<=0?this.list.prepend(b):f.after(b);break}}else d=this.dimension(b);if(e.get(0).nodeName.toUpperCase()=="LI"){b.replaceWith(e); b=e}else b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);e=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,e)-d;a>0&&a<this.first&&this.list.css(this.lt,h.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,h.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(!(!c.length||a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt, h.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,h.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.stopAuto();this.tail!=null&&!this.inTail?this.scrollTail(false):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!=null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.stopAuto();this.tail!=null&&this.inTail?this.scrollTail(true):this.scroll((this.options.wrap=="both"||this.options.wrap== "first")&&this.options.size!=null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!(this.locked||this.animating||!this.tail)){var c=h.intval(this.list.css(this.lt));!a?c-=this.tail:c+=this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){this.locked||this.animating||this.animate(this.pos(a),c)},pos:function(a){var c=h.intval(this.list.css(this.lt));if(this.locked||this.animating)return c;if(this.options.wrap!= "circular")a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a;for(var b=this.first>a,d=this.options.wrap!="circular"&&this.first<=1?1:this.first,e=b?this.get(d):this.get(this.last),f=b?d:d-1,g=null,j=0,l=false,k=0;b?--f>=a:++f<a;){g=this.get(f);l=!g.length;if(g.length==0){g=this.create(f).addClass(this.className("jcarousel-item-placeholder"));e[b?"before":"after"](g);if(this.first!=null&&this.options.wrap=="circular"&&this.options.size!==null&&(f<=0||f>this.options.size)){e=this.get(this.index(f)); if(e.length)g=this.add(f,e.clone(true))}}e=g;k=this.dimension(g);if(l)j+=k;if(this.first!=null&&(this.options.wrap=="circular"||f>=1&&(this.options.size==null||f<=this.options.size)))c=b?c+k:c-k}d=this.clipping();var o=[],n=0;f=a;var m=0;for(e=this.get(a-1);++n;){g=this.get(f);l=!g.length;if(g.length==0){g=this.create(f).addClass(this.className("jcarousel-item-placeholder"));e.length==0?this.list.prepend(g):e[b?"before":"after"](g);if(this.first!=null&&this.options.wrap=="circular"&&this.options.size!== null&&(f<=0||f>this.options.size)){e=this.get(this.index(f));if(e.length)g=this.add(f,e.clone(true))}}e=g;k=this.dimension(g);if(k==0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");if(this.options.wrap!="circular"&&this.options.size!==null&&f>this.options.size)o.push(g);else if(l)j+=k;m+=k;if(m>=d)break;f++}for(g=0;g<o.length;g++)o[g].remove();if(j>0){this.list.css(this.wh,this.dimension(this.list)+j+"px");if(b){c-=j;this.list.css(this.lt,h.intval(this.list.css(this.lt))- j+"px")}}j=a+n-1;if(this.options.wrap!="circular"&&this.options.size&&j>this.options.size)j=this.options.size;if(f>j){n=0;f=j;for(m=0;++n;){g=this.get(f--);if(!g.length)break;m+=this.dimension(g);if(m>=d)break}}f=j-n+1;if(this.options.wrap!="circular"&&f<1)f=1;if(this.inTail&&b){c+=this.tail;this.inTail=false}this.tail=null;if(this.options.wrap!="circular"&&j==this.options.size&&j-n+1>=1){b=h.margin(this.get(j),!this.options.vertical?"marginRight":"marginBottom");if(m-b>d)this.tail=m-d-b}for(;a-- > f;)c+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=f;this.last=j;return c},animate:function(a,c){if(!(this.locked||this.animating)){this.animating=true;var b=this,d=function(){b.animating=false;a==0&&b.list.css(b.lt,0);if(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size==null||b.last<b.options.size)b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var e= b.prevFirst;e<=b.prevLast;e++)if(e!==null&&!(e>=b.first&&e<=b.last)&&(e<1||e>b.options.size))b.remove(e)};this.notify("onBeforeAnimation");if(!this.options.animation||c==false){this.list.css(this.lt,a+"px");d()}else this.list.animate(!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},this.options.animation,this.options.easing,d)}},startAuto:function(a){if(a!=undefined)this.options.auto=a;if(this.options.auto==0)return this.stopAuto();if(this.timer==null){var c=this;this.timer=setTimeout(function(){c.next()}, this.options.auto*1E3)}},stopAuto:function(){if(this.timer!=null){clearTimeout(this.timer);this.timer=null}},buttons:function(a,c){if(a==undefined||a==null){a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size==null||this.last<this.options.size);if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!=null&&this.last>=this.options.size)a=this.tail!=null&&!this.inTail}if(c==undefined||c==null){c=!this.locked&&this.options.size!== 0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1);if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!=null&&this.first==1)c=this.tail!=null&&this.inTail}var b=this;this.buttonNext[a?"bind":"unbind"](this.options.buttonNextEvent+".jcarousel",this.funcNext)[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?false:true);this.buttonPrev[c?"bind":"unbind"](this.options.buttonPrevEvent+".jcarousel",this.funcPrev)[c?"removeClass": "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?false:true);this.options.buttonNextCallback!=null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a);this.options.buttonPrevCallback!=null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)},notify:function(a){var c=this.prevFirst==null?"init":this.prevFirst< this.first?"next":"prev";this.callback("itemLoadCallback",a,c);if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",a,c,this.first);this.callback("itemFirstOutCallback",a,c,this.prevFirst)}if(this.prevLast!==this.last){this.callback("itemLastInCallback",a,c,this.last);this.callback("itemLastOutCallback",a,c,this.prevLast)}this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast, this.first,this.last)},callback:function(a,c,b,d,e,f,g){if(!(this.options[a]==undefined||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var j=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(i.isFunction(j)){var l=this;if(d===undefined)j(l,b,c);else if(e===undefined)this.get(d).each(function(){j(l,this,d,b,c)});else for(var k=d;k<=e;k++)k!==null&&!(k>=f&&k<=g)&&this.get(k).each(function(){j(l,this,k,b,c)})}}},create:function(a){return this.format("<li></li>",a)},format:function(a, c){a=i(a);for(var b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")},dimension:function(a,c){var b=a.jquery!=undefined?a[0]:a,d=!this.options.vertical?(b.offsetWidth|| h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginLeft")+h.margin(b,"marginRight"):(b.offsetHeight||h.intval(this.options.itemFallbackDimension))+h.margin(b,"marginTop")+h.margin(b,"marginBottom");if(c==undefined||d==c)return d;d=!this.options.vertical?c-h.margin(b,"marginLeft")-h.margin(b,"marginRight"):c-h.margin(b,"marginTop")-h.margin(b,"marginBottom");i(b).css(this.wh,d+"px");return this.dimension(b)},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-h.intval(this.clip.css("borderLeftWidth"))- h.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-h.intval(this.clip.css("borderTopWidth"))-h.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==undefined)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});h.extend({defaults:function(a){return i.extend(p,a||{})},margin:function(a,c){if(!a)return 0;var b=a.jquery!=undefined?a[0]:a;if(c=="marginRight"&&i.browser.safari){var d={display:"block","float":"none",width:"auto"},e,f;i.swap(b,d, function(){e=b.offsetWidth});d.marginRight=0;i.swap(b,d,function(){f=b.offsetWidth});return f-e}return h.intval(i.css(b,c))},intval:function(a){a=parseInt(a);return isNaN(a)?0:a}})})(jQuery);
/* jquery jcarousel plugin ends */

/* Generic functions begin */
function hoverable(j){ // sets jquery object as a hoverable item
	j.hover(function(){
		j.css({cursor:'pointer'});
	}, function(){
		j.css({cursor:'none'});
	});
}

function bindModal(m){ // binds class with media
	$('.'+m).bind('click',function(){
		$('#'+m).modal();
	});
}

function bookmark_us(url, title) {// used with page tools
	if (window.sidebar) // firefox
		window.sidebar.addPanel(title, url, "");
	else if (window.opera && window.print) { // opera 
		var elem = document.createElement('a');
		elem.setAttribute('href', url);
		elem.setAttribute('title', title);
		elem.setAttribute('rel', 'sidebar');
		elem.click();
	}
	else if (document.all)// ie
		window.external.AddFavorite(url, title);
}

function grabFeeds(elemId,feedUrl,feedCount,elemIdObj){
	//google.load("feeds", "1");
	google.load('feeds', '1', {callback: initialize});
	
	function initialize() {
		var feed = new google.feeds.Feed(feedUrl);
		if(typeof feedCount != null){
			feed.setNumEntries(feedCount);
		}
		feed.load(function(result) {
		  var container = $("#" + elemId);
		  if (!result.error) {
			for (var i = 0; i < result.feed.entries.length; i++) {	
			  var entry = result.feed.entries[i];
			  var attributes = ["title", "link", "publishedDate", "contentSnippet"];
			  container.append("<ul id=\"feed_post"+ i +"\" class=\"feed_post\"></ul>");
			  for (var j = 0; j < attributes.length; j++) {	
				if(entry[attributes[j]] && attributes[j] !='link'){ // ignore empty j and link
					var thisFeedPost = container.find("#feed_post"+i);
					thisFeedPost.append("<li class=\""+ attributes[j] +"\"></li>");
					if(attributes[j]=='title'){
						if(entry[attributes[1]]){ // if link returned with result
							thisFeedPost.find("li[class=\""+ attributes[j] +"\"]").append("<a href=\""+ entry[attributes[1]] +"\" target=\"blank\">"+ entry[attributes[j]] +"</a>");
						}
						else{
							thisFeedPost.find("li[class=\""+ attributes[j] +"\"]").append(entry[attributes[j]]);
						}
					}
					else if(j==2){ // if publishDate
						var publishDateString = entry[attributes[j]];
						var publishDateArray = publishDateString.split(' ');
						var fullMonthVal = fullMonth(publishDateArray[2]); 
						thisFeedPost.find("li[class=\""+ attributes[j] +"\"]").append(" " + publishDateArray[1] + " " + fullMonthVal + " " + publishDateArray[3]); // example: 04 January 2011
					}
					else if(j==3){ // if contentSnippet
						thisFeedPost.find("li[class=\""+ attributes[j] +"\"]").append(entry[attributes[j]] + " <a href='" + entry[attributes[1]] +"' target='blank'>Read More</a>");
					}
					else{ 
						thisFeedPost.find("li[class=\""+ attributes[j] +"\"]").append(entry[attributes[j]]);
					}
				}
			  } 
			}
			if (getIEVersion() == 6 || getIEVersion() == 7){ // if ie6 or ie7
				var containerElement = document.getElementById(elemId);
				if(containerElement.currentStyle.hasLayout == false){
					containerElement.style.zoom = "1"; // force hasLayout
				}
			}
			try{
				elemIdObj.grabFeedsSuccess(); // callback implemented locally
			}
			catch(e){}
			
		  }
		  else{
			$(container).html("<p style='margin-left:10px;'>Feed is currently not available.</p>");
		  }
		});
	}
	//google.setOnLoadCallback(initialize);
}

function fullMonth(abbrev){
	switch(abbrev){
		case 'Jan':
			return "January";
			break;
		case 'Feb':
			return "February";
			break;
		case 'Mar':
			return "March";
			break;
		case 'Apr':
			return "April";
			break;
		case 'May':
			return "May";
			break;
		case 'Jun':
			return "June";
			break;
		case 'Jul':
			return "July";
			break;
		case 'Aug':
			return "August";
			break;
		case 'Sep':
			return "September";
			break;
		case 'Oct':
			return "October";
			break;
		case 'Nov':
			return "November";
			break;
		case 'Dec':
			return "December";
			break;		
		default:
			return abbrev;
			break;
		}
}

function initModal(linkClass,modalID,modalWidth,modalTitle){
	$('#'+modalID).prepend('<div class="modalTitleBar"><h6>'+modalTitle+'</h6></div>');
	$('#'+modalID).css('width',modalWidth);
	hoverable($('.'+linkClass));
	$('.'+linkClass).bind('click',function(){
		$('#'+modalID).modal();
	});
}

function initVideoGallery1(){ 
	var bcExperience;
	var videoplayerModule;
	var experienceModule;
	var contentModule;
	var socialModule;
	 
	// called when template loads, this function stores a reference to the player and modules.
	onTemplateLoaded = function (experienceID) {
		bcExperience = brightcove.getExperience(experienceID);
		videoplayerModule = bcExperience.getModule(APIModules.VIDEO_PLAYER);
		experienceModule = bcExperience.getModule(APIModules.EXPERIENCE);
		contentModule = bcExperience.getModule(APIModules.CONTENT);
		socialModule = bcExperience.getModule(APIModules.SOCIAL);
		  
		experienceModule.addEventListener(BCExperienceEvent.TEMPLATE_READY, onTemplateReady);
		experienceModule.addEventListener(BCExperienceEvent.CONTENT_LOAD, onContentLoad);
	}

	// gets media and creates playlist user interface when template is ready
	onTemplateReady = function (evt) {		
		var currentPlaylist, activePlaylistsArray;
		activePlaylistsArray = contentModule.getAllMediaCollections(); // get all media collections (playlists)
		var playlistTitle = activePlaylistsArray[0].displayName;
		if(typeof pageUrl.video != "undefined"){
			loadThisVideo(playlistTitle,pageUrl.video,false);
		}
		else if(typeof pageUrl.bcvid != "undefined"){
			loadThisVideo(playlistTitle,pageUrl.bcvid,false);
		}
		else{
			loadThisVideo(playlistTitle,activePlaylistsArray[0].mediaIds[0],false); // load video player with first video from first media collection (playlist)
		}
				
		$("#gallery_watchnow_btn").bind("click", function(){ // bind play button
			videoplayerModule.play();
		});
		hoverable($("#gallery_watchnow_btn"));
	
		var allMediaIds = new Array();
		for(var i=0; i<activePlaylistsArray.length; i++){
			for(var j=0; j<activePlaylistsArray[i].mediaIds.length; j++){
				allMediaIds.push(activePlaylistsArray[i].mediaIds[j]); // extract media ids from each playlist and populate allMediaIds array
			}
		}
		
		contentModule.addEventListener(BCContentEvent.MEDIA_COLLECTION_LOAD, onCollectVideos); // add event listener for getMediaInGroupAsynch
		contentModule.getMediaInGroupAsynch(allMediaIds); // get media dtos
		
		buildPlayListUi = function(){
			var currentVideo;
			var currentVideoId;
			var gallery_video_position;
			
			for(var k=0; k<activePlaylistsArray.length; k++){
				var playlistTitle = activePlaylistsArray[k].displayName;
				$("#gallery_bottom").append("<div class=\"gallery_playlist gallery_playlist" + k + "\"><h4>" + playlistTitle + "</h4><ul class=\"jcarousel-experian-skin\"></ul></div>");
				for(var l=0; l<activePlaylistsArray[k].mediaIds.length;l++){
					currentVideo = contentModule.getMedia(activePlaylistsArray[k].mediaIds[l]);
					currentVideoId = activePlaylistsArray[k].mediaIds[l];
					$(".gallery_playlist"+k+" .jcarousel-experian-skin").append("<li class=\"gallery_video\" onclick=\"loadThisVideo('"+ playlistTitle + "'," + currentVideoId + "," + true +")\"><ul><li class=\"gallery_thumbnail\"><img src=\"" + currentVideo.thumbnailURL +"\" width=\"120\" height=\"88\" alt=\"\" /></li><li class=\"gallery_title\">"+ currentVideo.customFields.maintitle +"</li><li class=\"gallery_subtitle\">"+ currentVideo.customFields.subtitle +"</li></ul></li>");
				}
				$(".gallery_playlist"+k+ " .jcarousel-experian-skin").jcarousel(); // activate jcarousel around playlist
			}
			$(".gallery_video").live("mouseover",function(event){ // replace with hover or mouseenter after jquery 1.4 upgrade
				$(this).css({cursor:'pointer'});
			});
		} 
	}

	function onContentLoad(evt) {}

	function onVideoLoad(evt) { 
		// Play video that was just loaded
		//videoplayerModule.loadVideo(evt.video.id);
	}

	onCollectVideos = function (evt){
		contentModule.removeEventListener(BCContentEvent.MEDIA_COLLECTION_LOAD, onCollectVideos);
		buildPlayListUi(); // start building playlist user interface
	}

	loadThisVideo = function (playlistTitle, currentVideoId, autoplay){
		videoplayerModule.cueVideo(currentVideoId);
		if(autoplay == true){
			videoplayerModule.play();
		}
		
		// dynamically construct share link
		
		var sharelink_new = document.location.href.split("?")[0];
		socialModule.setLink(sharelink_new + "?video="+currentVideoId);
		
		loadThisVideoDetails(playlistTitle,currentVideoId);
	}

	loadThisVideoDetails = function (playlistTitle, currentVideoId){
		var currentVideoDto = contentModule.getMedia(currentVideoId);
		
		// empty/remove previous details
		$("#gallery_top_content_inner").empty();
		$("#gallery_social_icons").remove();
			
		/*if(currentVideoDto.customFields.grouptitle != null){
			$("#gallery_top_content_inner").append("<h1 id=\"gallery_grouptitle\">"+ currentVideoDto.customFields.grouptitle + "</h1>");
		}
		
		else{
			$("#gallery_top_content_inner").append("<h1 id=\"gallery_grouptitle\">"+ playlistTitle + "</h1>");
		}*/
		
		$("#gallery_top_content_inner").append("<h1 id=\"gallery_grouptitle\">"+ playlistTitle + "</h1>");
		
		if(currentVideoDto.customFields.maintitle != null){
			$("#gallery_top_content_inner").append("<h2 id=\"gallery_maintitle\">"+ currentVideoDto.customFields.maintitle + "</h2>");
		}
		
		else{
			$("#gallery_top_content_inner").append("<h2 id=\"gallery_maintitle\">"+ currentVideoDto.displayName + "</h2>");
		}
		
		if(currentVideoDto.customFields.subtitle != null){
			$("#gallery_top_content_inner").append("<h3 id=\"gallery_subtitle\">"+ currentVideoDto.customFields.subtitle + "</h3>");
		}
		
		$("#gallery_top_content_inner").append("<p id=\"gallery_shortdescription\">"+ currentVideoDto.shortDescription + "</p>");
		
		if(currentVideoDto.customFields.experianblogurl != null || currentVideoDto.customFields.facebookurl !=null || currentVideoDto.customFields.twitterurl != null || currentVideoDto.customFields.linkedinurl != null || currentVideoDto.customFields.rssurl != null){
			$("#gallery_top_content").append("<div id=\"gallery_social_icons\"></div>");
		}
		
		if(currentVideoDto.customFields.experianblogurl != null){
			$("#gallery_social_icons").append("<a class=\"blog_icon16x16\" target=\"_blank\" href='" + currentVideoDto.customFields.experianblogurl +"'></a>");
		}
		
		if(currentVideoDto.customFields.facebookurl != null){
			$("#gallery_social_icons").append("<a class=\"facebook_icon16x16\" target=\"_blank\" href='" + currentVideoDto.customFields.facebookurl +"'></a>");
		}
		
		if(currentVideoDto.customFields.twitterurl != null){
			$("#gallery_social_icons").append("<a class=\"twitter_icon16x16\" target=\"_blank\" href='" + currentVideoDto.customFields.twitterurl +"'></a>");
		}
		
		if(currentVideoDto.customFields.linkedinurl != null){
			$("#gallery_social_icons").append("<a class=\"linkedin_icon16x16\" target=\"_blank\" href='" + currentVideoDto.customFields.linkedinurl +"'></a>");
		}
		
		if(currentVideoDto.customFields.rssurl != null){
			$("#gallery_social_icons").append("<a class=\"rss_icon16x16\" target=\"_blank\" href='" + currentVideoDto.customFields.rssurl +"'></a>");
		}
		
		// truncate if exceeds 300 characters
		if($("#gallery_top_content_inner").html().length > 500){
			var truncatedGalleryContent = $("#gallery_top_content_inner").html();
			$("#gallery_top_content_inner").empty();
			truncatedGalleryContent = truncatedGalleryContent.substring(0,500);
			if(truncatedGalleryContent.charAt(truncatedGalleryContent.length-1) != '.'){
				$("#gallery_top_content_inner").append(truncatedGalleryContent+"...");
			}
			else{
				$("#gallery_top_content_inner").append(truncatedGalleryContent);
			}
		}
	}
}

function initVideoPlayer1(){
	var bcExp;
	var modVP;
	var modExp;
	var modCon;
	 
	function onTemplateLoaded(experienceID) {
		bcExp = brightcove.getExperience(experienceID);
		modVP = bcExp.getModule(APIModules.VIDEO_PLAYER);
		modExp = bcExp.getModule(APIModules.EXPERIENCE);
		modCon = bcExp.getModule(APIModules.CONTENT);
		modExp.addEventListener(BCExperienceEvent.TEMPLATE_READY, onTemplateReady);
		modExp.addEventListener(BCExperienceEvent.CONTENT_LOAD, onContentLoad);
		modCon.addEventListener(BCContentEvent.VIDEO_LOAD, onVideoLoad); 
	}
	function onTemplateReady(evt) {}
	function onContentLoad(evt) {
		var currentVideo = modVP.getCurrentVideo();
		alert("INFO: Currently Loaded videoID: " + currentVideo.id);
		//modCon.getMediaAsynch(1488633950);
	}
	function onVideoLoad(evt) {
		// Play video that was just loaded
		//modVP.loadVideo(evt.video.id);
	}
}

function initMediaPlayer(media){
	$.getScript('http://admin.brightcove.com/js/BrightcoveExperiences_all.js', function() {
		var bcparams = {};
		bcparams.playerID = media.bcpid;
		bcparams.videoId = media.bcvid;
		bcparams.playerKey = media.bckey;
		bcparams.autoStart = "true";
		bcparams.bgcolor = "#FFFFFF";
		bcparams.width = media.width;
		bcparams.height = media.height;
		bcparams.isVid = "true";
		bcparams.isUI = "true";
		bcparams.dynamicStreaming = "true";
		bcparams.wmode = "transparent"; 
		
		var bcplayer = brightcove.createElement("object");
		bcplayer.id = media.name + "_player";
		var bcparameter;
		for(var i in bcparams){
			bcparameter = brightcove.createElement("param");
			bcparameter.name = i;
			bcparameter.value = bcparams[i];
			bcplayer.appendChild(bcparameter);
		}
		  
		var bcplayerContainer = document.getElementById(media.container);
		brightcove.createExperience(bcplayer, bcplayerContainer, true);	
	});  
}

function getHeightByLength(length){
	var height;
	
	if(length > 0){
		if(length < 100){
			height = 100;
		}
		else if(length < 150){
			height = 150;
		}
		else if(length < 200){
			height = 200;
		}
		
		else if(length < 250){
			height = 250;
		}
		
		else{
			height = 500;
		}
		
	}
	
	else{
		height = 0;
	}
	
	return height;
}


function initMediaTxt(media){
	$("#"+media.container).html("<h3>"+media.title+"</h3>"+media.description);
}

function openTab(tabNum){
	$('#tabs').tabs().tabs('select', tabNum);
}

function getIEVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

function printSection(j){
	$.getScript('/global-scripts/jqueryPrint.js', function() {
		j.jqprint();
	});
}

function getPageElement(srcUrl,srcId,destId,fetchtype){
	function filterPageData(data){
		var data = $(data).find("#"+srcId);
		return data.html();
	}
	// check if cross domain
	if((! srcUrl.match(/^\//)) && (srcUrl.indexOf(location.hostname) < 0 || location.protocol == 'https:' || fetchtype == 1)){
	// call YQL to get cross domain html
	$.getJSON("http://query.yahooapis.com/v1/public/yql?"+"q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(srcUrl)+"%22&format=xml'&callback=?",
	// this function gets the data from the successful JSON-P call
	function(data){
	if(data.results[0]){
		data = filterPageData(data.results[0]);
		$("#"+destId).html(data);
	
		try{
			getPageElementSuccess(srcId); // defined locally as needed
		}
		catch(e){}	
	} 
	else {}
	}
	);
	// if not cross domain
	} 
	else {
			if(destId.indexOf("_ajax") < 0){
				$("#"+destId).wrap('<div id="'+destId+'_ajax"></div>');
				$("#"+destId+"_ajax").load(srcUrl + " #" + srcId, function(){
					try{
						getPageElementSuccess(srcId); // defined locally as needed
					}
					catch(e){}	 
				});
			}
			else{
				$("#"+destId).load(srcUrl + " #" + srcId, function(){
					try{
						getPageElementSuccess(srcId); // defined locally as needed
					}
					catch(e){}	 
				});
			}
	}
}

function sbsBannerWidget(divId,bannerId,trackingId,width,height){
	var swfPath = '/small-business/flex/bannerAd.swf?formType=2&bannerId='+bannerId+'&amp;trackingId='+trackingId+'&amp;image=&amp;x=10&amp;y=10" type="application/x-shockwave-flash" id="VideoPlayback"';
	var flashvars = {};
	flashvars.playauto="true";
	var params = {};
	params.menu = "false";
	params.quality = "high";
	params.movie = "/small-business/small-business/flex/bannerAd.swf?formType=2&"+bannerId+"&amp;formType=2&amp;trackingId="+trackingId+"&amp;image=&amp;x=10&amp;y=10";
	var attributes = {};
	swfobject.embedSWF(swfPath,divId,width,height,"9.0.0", false, flashvars, params, attributes);
}

function activateNav(level,label){
	label = label.substring(0,20);
	label = label.replace(" ","");
	label = label.replace("<br>","");
	var navlinks;
	var regexp = new RegExp("^"+label,"gi");
	var linktext = "";

	switch(level){
			case 0:
				$("#globalNav li").removeClass("active"); // clear active class
				navlinks = $("#globalNav li a");
				break;
			
			case 1:
				$("#nav li").removeClass("active"); // clear active class
				navlinks = $("#nav li a");
				break;	
			
			case 2:
				$("#leftnav200 li").removeClass("active"); // clear active class
				navlinks = $("#leftnav200 li a");
				break;		
	}
	
	
navlinks.each(function(){
    linktext = $(this).text();
    linktext = linktext.replace(" ","");
    linktext = linktext.replace("<br>","");
    if(regexp.test(linktext)){
        $(this).parents("li").addClass("active");          
    }
});
}


/* Generic functions end */

/* init object arrays */
var medias = {}; // populated with media objects

$(document).ready(function() { 
/* Media begins */
	$('a[href^=media]').each(function(){ // sets class for media
		var m = $(this).attr('href');
        $(this).removeAttr('href').removeAttr('onClick').removeAttr('target');
		hoverable($(this));
		$(this).bind("click", function(){
			if(typeof medias[m] != "undefined"){
				$("#"+m).modal({
					onShow:function(dialog){
						if(medias[m].type=='bcvid'){
							dialog.container.width(parseInt(medias[m].width)+30);
							var modalheight = parseInt(medias[m].height)+getHeightByLength(medias[m].title.length)+getHeightByLength(medias[m].description.length);
							
							if(modalheight > 600){
								dialog.container.height(600);
							}
							else{
								dialog.container.height(modalheight);
							}
							
							initMediaPlayer(medias[m]);
							initMediaTxt(medias[m]);
						}
						else if(medias[m].type=='swf' || medias[m].type=='flv'){
							dialog.container.width(parseInt(medias[m].width)+30);
							var modalheight = parseInt(medias[m].height)+getHeightByLength(medias[m].title.length)+getHeightByLength(medias[m].description.length);
							
							if(modalheight > 600){
								dialog.container.height(600);
							}
							else{
								dialog.container.height(modalheight);
							}
							
							initMediaTxt(medias[m]);
						}
						else if(medias[m].type=='txt'){
							if(medias[m].width != ''){
								dialog.container.width(parseInt(medias[m].width));
							}
							else{
								dialog.container.width(500);
							}
							if(medias[m].height != ''){
								dialog.container.height(parseInt(medias[m].height));
							}
							else{
								dialog.container.height(500);
							}
							initMediaTxt(medias[m]);
						}	
						$(window).trigger('resize.simplemodal'); // redraw modal with video content
					},
					onClose:function(){
						//brightcove.removeExperience(medias[m].name+"_player");
						if(medias[m].type=='bcvid'){
							brightcove.getExperience(medias[m].name+"_player").getModule("experience").unload();
						}
						$.modal.impl.close();
					}
				});
			}
			else{
				$("#"+m).modal();
			}
		});
	});
/* Media ends */

/* TinyMCE begins */	
	$(".editorcontent img[align=left]").addClass('imageleft'); // previous version of tinymce used align vs float
	$(".editorcontent img[align=right]").addClass('imageright');
	$(".editorcontent img[align=center]").addClass('imagecenter'); 

	$(".editorcontent img[style]").each(function(){
		switch($(this).attr('style')){
		case 'float: left;':
			$(this).addClass('imageleft');
			break;
			
		case 'FLOAT: left':
			$(this).addClass('imageleft');
			break;
		case 'float: right;':
			$(this).addClass('imageright');
			break;
			
		case 'FLOAT: right':
			$(this).addClass('imageright');
			break;	
		
		default:
			break;
		}
	});

	$(".contentTable").each(function(){
		$(this).attr({ 
		  cellspacing: "0",
		  cellpadding: "0"
		});
		$(this).find('tr').eq(0).addClass('contentTableTitle');
	});
	
	$(".contentTableZ").each(function(){
		$(this).attr({ 
		  cellspacing: "0",
		  cellpadding: "0"
		});
		$(this).find('tr:first').addClass('contentTableTitle');
		$(this).find('tr:even:not(".contentTableTitle")').addClass('contentTableStripe');
	});
	
	$(".contentTable2").each(function(){
		$(this).attr({ 
		  cellspacing: "0",
		  cellpadding: "0"
		});
		$(this).find('tr:first').addClass('contentTableTitle');
		$(this).find('tr:even:not(".contentTableTitle")').addClass('contentTableStripe');
	});
/* TinyMCE ends */

/* page tools */
	$('#printbtn').bind('click', function () {
		window.print(); return false;
    });
	
	$('#bookmarkbtn').bind('click', function () {
		bookmark_us(document.URL, document.TITLE);
	});
	
	if ($("#printbtn")){
		hoverable($("#printbtn"));
	}
	
	if ($("#bookmarkbtn")){
		hoverable($("#bookmarkbtn"));
	}
/* page tools end */

/* activate jquery ui tabs */
	if($("#tabs").length > 0){
		$("#tabs").tabs();
	}

	if($('#tabs .ui-tabs-nav > li a:contains("<br>")')){
		$('#tabs .ui-tabs-nav > li').css('height','50px');
	}
	
	if(typeof pageUrl !== "undefined"){
		if(typeof pageUrl.tab !== "undefined"){
			$('#tabs').tabs().tabs('select', pageUrl.tab);
		}
	}
/* ui tabs end */

/* hide/show content */	
$('.showContentBtn').toggle(function() {
  $(this).parent('li').next("li.showContent").slideDown("slow");
  return false;
  }, function() {
  $(this).parent('li').next("li.showContent").slideUp("normal");
  return false;
});
	
$("img.dynamicClose").click(function () {
  $(this).parent(".showContent").slideUp("normal");
});

// for eloqua test
if(location.host == "www.experian.com"){
	$.getScript('/global-scripts/marketing-operations/marketing-automation.js');
}
	
// init carousels
if($(".slidebox").length > 0){
	var carousel = $(".slidebox").parent("div").attr("id");
	carousel = carousel + " .slidebox";
	
	getCarouselScripts = function(){
			var scriptCount = 0;
			$.getScript("/global-scripts/jquery-1.6.2.min.js",function(){
					++scriptCount;
					carouselReady(scriptCount);
			});
	}
	carouselReady = function(scriptCount){
		if(scriptCount == 1){
				$.getScript("/global-scripts/jquery.flexslider.js",function(){
				/*do nothing */
			});	
		}
	};
	getCarouselScripts();
}
});

// Mobile Redirect Function

function mobile(mobileurl)
					{
					var classicView = getUrlVars()["classic"];

								function getUrlVars() {
									var vars = {};
									var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
										vars[key] = value
									});
									return vars
								}

								var exp_agent = navigator.userAgent.toLowerCase();
								var exp_scrHeight = screen.height;
								var exp_iOS = (exp_agent.indexOf("iphone") != -1) || (exp_agent.indexOf("ipod") != -1) ? true : false;
								var exp_otherBrowser = (exp_agent.indexOf("series60") != -1) || (exp_agent.indexOf("symbian") != -1) || (exp_agent.indexOf("windows ce") != -1) || (exp_agent.indexOf("blackberry") != -1) || (exp_agent.indexOf('sonyericsson') != -1) || (exp_agent.indexOf('webos') != -1) || (exp_agent.indexOf('wap') != -1) || (exp_agent.indexOf('motor') != -1) || (exp_agent.indexOf('samsung') != -1) || (exp_agent.indexOf('nokia') != -1) ? true : false;
								var exp_tablet = (exp_agent.indexOf("xoom") != -1) || (exp_agent.indexOf("pad") != -1) || (exp_agent.indexOf("tab") != -1) || (exp_agent.indexOf("nextbook") != -1) || (exp_agent.indexOf("kindle") != -1) || (exp_agent.indexOf("picasso") != -1) || (exp_agent.indexOf("playbook") != -1) || (exp_agent.indexOf("touchpad") != -1) || (exp_agent.indexOf("flyer") != -1) ? true : false;
								var exp_mobileOS = typeof orientation != 'undefined' ? true : false;
								var exp_touchOS = ('ontouchstart' in document.documentElement) ? true : false;
								var exp_android = (exp_agent.indexOf("android") != -1) || (!exp_iOS && !exp_otherBrowser && exp_touchOS && exp_mobileOS) ? true : false;
								if (exp_scrHeight >= 480 && exp_tablet == false && (exp_iOS == true || exp_otherBrowser == true || exp_android == true) && classicView == null) {
									window.location = mobileurl
									};
					}
					
// Dynamic Content

function getDynamicElement(srcUrl,srcId,destId,fetchtype){
	function filterPageData(data){
		var data = $(data).find("#"+srcId);
		return data.html();
	}
	// check if cross domain
	if((! srcUrl.match(/^\//)) && (srcUrl.indexOf(location.hostname) < 0 || location.protocol == 'https:' || fetchtype == 1)){
	// call YQL to get cross domain html
	$.getJSON("http://query.yahooapis.com/v1/public/yql?"+"q=select%20*%20from%20html%20where%20url%3D%22"+encodeURIComponent(srcUrl)+"%22&format=xml'&callback=?",
	// this function gets the data from the successful JSON-P call
	function(data){
	if(data.results[0]){
		data = filterPageData(data.results[0]);
		$("#"+destId).html(data);
	
		try{
			getDynamicElementSuccess(srcId); // defined locally as needed
		}
		catch(e){}
	} 
	else {}
	}
	);
	// if not cross domain
	} 
	else {
			if(destId.indexOf("_ajax") < 0){
				//$("#"+destId).fadeOut(5000);
				$("#"+destId).wrap('<div id="'+destId+'_ajax"></div>');
				$("#"+destId+"_ajax").fadeOut('slow').load(srcUrl + " #" + srcId, function(){
				$(this).fadeIn(2000);
					//try{
						//getDynamicElementSuccess(srcId); // defined locally as needed
					//}
					//catch(e){}	 
				});
			}
			else{
				$("#"+destId).fadeOut('slow').load(srcUrl + " #" + srcId, function(){
				$(this).fadeIn(2000);
					//try{
					//	getDynamicElementSuccess(srcId); // defined locally as needed
					//}
					//catch(e){}	 
				});
			}
	}
}
