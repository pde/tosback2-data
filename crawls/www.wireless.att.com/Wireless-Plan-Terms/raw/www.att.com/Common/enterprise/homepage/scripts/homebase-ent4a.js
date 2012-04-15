/* Version 1.00 last updated by PM2731 on 01-19-2010 at 11:50am CST */
try{document.execCommand('BackgroundImageCache', false, true);} catch(e){}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();

/* ROTATE MARQUEES */
	var timeoutVariable; // Global variable for Timeouts. 
	var heroTime = 7000; // used by initiateRotateHero() and  autoRotate(heroToShow)	
	var heroID = 1;	

/* WINDOWS ONLOAD */
Event.observe(window, 'load', function(){
	var bUnit = $("pageID").readAttribute("rel");
	
	box1Ad(bUnit);
	box2Ad(bUnit);
	box3Ad(bUnit);
	box4Ad(bUnit);
	checkReg();	
	if($("accordion")){
		loadAccordions();
	}
	initiateRotateHero('hero1');
	assignPopupHandler();		
	
	if(getCookie("uvp_env")){ setCookie("uvp_env_homeGreen","yes","365","/","") }	
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){ document.title = "AT&T" }	
	
	$$(".accPromo").each(function(element){
		element.show();
	});
	
	//window.onunload = killSession;
	
	$$(".topLeftTabs a").each(function(element){
		element.onclick = function(){
			var lnkPath = element.readAttribute("href");
			var temp = new Array;
			temp = lnkPath.split('=');
			var lnk = temp[1];
			if(lnk == "9213"){
				setCookie("DTAB", "Tab=Bus", "365", "/",".att.com");
				if(getCookie("attPersistantLocalization")){
					var cookieval = getCookie("attPersistantLocalization").replace(/ltype=res\|segment=res/, 'ltype=bus|segment=bus');
					setCookie("attPersistantLocalization",cookieval,"365","/",".att.com");
					setCookie("attPersistantLocalization",cookieval,"365","/",".sbc.com");
					setCookie("attPersistantLocalization",cookieval,"365","/",".bellsouth.com");
				}
			}
			if(lnk == "3308"){
				setCookie("DTAB", "Tab=Res", "365", "/",".att.com");
				if(getCookie("attPersistantLocalization")){
					var cookieval = getCookie("attPersistantLocalization").replace(/ltype=bus\|segment=bus/, 'ltype=res|segment=res');
					setCookie("attPersistantLocalization",cookieval,"365","/",".att.com");
					setCookie("attPersistantLocalization",cookieval,"365","/",".sbc.com");
					setCookie("attPersistantLocalization",cookieval,"365","/",".bellsouth.com");
				}
			}
		}
	});
	
	
	$$(".shopForLink a").each(function(element){
		element.onclick = function(){
			var lnkPath = element.readAttribute("href");
			var temp = new Array;
			temp = lnkPath.split('=');
			var lnk = temp[1];
			if(lnk == "9214"){
				setCookie("subDTAB","BUSINESS","365","/",".att.com");
				window.location.replace("/gen/landing-pages?pid=9214");
				return false;
			}
			if(lnk == "11624"){
				setCookie("subDTAB","WHOLESALE","365","/",".att.com");
				window.location.replace("/gen/general?pid=11624");
				return false;
			}
			if(lnk == "11625"){
				setCookie("subDTAB","GOVERNMENT","365","/",".att.com");
				window.location.replace("/gen/general?pid=11625");
				return false;
			}			
		}
	});
});

function checkReg(){
	$$('sup').each(function(element){
		var newReg = escape(element.innerHTML);
		if(newReg == "%AE"){
			element.addClassName("reg");
		}
		if(navigator.userAgent.match(/Safari/i)){
			element.addClassName("supSafari");			
		}
	});
}

function killSession(){
	if(getCookie("JSID_coredisp")){
		setCookie("JSID_coredisp", "xxx", "-1", "/","");
	}

	if(getCookie("JSESSIONID")){ 
		setCookie("JSESSIONID", "xxx", "-1", "/","");
	}	
	
}

function checkEntSearch(){
	var dirtyText = document.getElementById("q").value;
	var searchText = unescape(dirtyText);
	var sendText = searchText.replace(/\s+/g, '+');
		
	if((searchText == "") || 
		(searchText == "Search Business for...") || 
		(searchText == "Search Wholesale for...") || 
		(searchText == "Search Government for...")){
		alert('Please enter at least one search keyword in the search field.');
		$("q").value="";
		$("q").focus();
		return false;
	}
	$("homeSearch").submit();
}

function box1Ad(bUnit){
	var box1Ads = $("box1").getElementsByClassName("slot").length;
	var box1AdsLength = Math.floor(Math.random()*box1Ads);
	$("box1").childElements().invoke('hide');  		
	if ((getCookie(bUnit+"HomeBox1") != null) && (box1Ads > "0")){
		setCookie(bUnit+"HomeBox1", box1AdsLength, "30","/",""); //set cookie
		switch (parseInt(box1AdsLength)){
			case 0: if($("box1_ad_1")){$("box1_ad_1").show()} break;
			case 1: if($("box1_ad_2")){$("box1_ad_2").show()} break;
			case 2: if($("box1_ad_3")){$("box1_ad_3").show()} break;
			case 3: if($("box1_ad_4")){$("box1_ad_4").show()} break;
		}
	}
	else if(box1Ads > 0){
		$("spacer1").hide();
		$("box1_ad_1").show();
		setCookie(bUnit+"HomeBox1", "0", "30","/","");
	}
}

function box2Ad(bUnit){
	var box2Ads = $("box2").getElementsByClassName("slot").length;
	var box2AdsLength = Math.floor(Math.random()*box2Ads);
	$("box2").childElements().invoke('hide');  		
	if ((getCookie(bUnit+"HomeBox2") != null) && (box2Ads > "0")){
		setCookie(bUnit+"HomeBox2", box2AdsLength, "30","/",""); //set cookie
		switch (parseInt(box2AdsLength)){
			case 0: if($("box2_ad_1")){$("box2_ad_1").show()} break;
			case 1: if($("box2_ad_2")){$("box2_ad_2").show()} break;
			case 2: if($("box2_ad_3")){$("box2_ad_3").show()} break;
			case 3: if($("box2_ad_4")){$("box2_ad_4").show()} break;
		}		
	}
	else if(box2Ads > 0){
		$("spacer2").hide();
		$("box2_ad_1").show();
		setCookie(bUnit+"HomeBox2", "0", "30","/","");
	}
}
function box3Ad(bUnit){
	var box3Ads = $("box3").getElementsByClassName("slot").length;
	var box3AdsLength = Math.floor(Math.random()*box3Ads);
	$("box3").childElements().invoke('hide');  		
	if ((getCookie(bUnit+"HomeBox3") != null) && (box3Ads > "0")){
		setCookie(bUnit+"HomeBox3", box3AdsLength, "30","/",""); //set cookie
		switch (parseInt(box3AdsLength)){
			case 0: if($("box3_ad_1")){$("box3_ad_1").show()} break;
			case 1: if($("box3_ad_2")){$("box3_ad_2").show()} break;
			case 2: if($("box3_ad_3")){$("box3_ad_3").show()} break;
			case 3: if($("box3_ad_4")){$("box3_ad_4").show()} break;
		}		
	}
	else if(box3Ads > 0){
		$("spacer3").hide();
		$("box3_ad_1").show();
		setCookie(bUnit+"HomeBox3", "0", "30","/","");
	}
}

function box4Ad(bUnit){
	var box4Ads = $("box4").getElementsByClassName("slot").length;
	var box4AdsLength = Math.floor(Math.random()*box4Ads);
	if ((getCookie(bUnit+"HomeBox4") != null) && (box4Ads > "0")){
		$("box4").childElements().invoke('hide');  
		setCookie(bUnit+"HomeBox4", box4AdsLength, "30","/",""); //set cookie
		switch (parseInt(box4AdsLength)){
			case 0: if($("box4_ad_1")){$("box4_ad_1").show()} break;
			case 1: if($("box4_ad_2")){$("box4_ad_2").show()} break;
			case 2: if($("box4_ad_3")){$("box4_ad_3").show()} break;
			case 3: if($("box4_ad_4")){$("box4_ad_4").show()} break;
		}		
	}
	else if(box4Ads > 0){
		$("spacer4").hide();
		$("box4_ad_1").show();
		setCookie(bUnit+"HomeBox4", "0", "30","/","");
	}
}

function initiateRotateHero(heroToShow) {
	if ($("hero2")) { // if more than one marqee exists (assumes marquees are named correctly)
		$$(".rotateHero").each(function(element) {element.show()}); // unhide marquee controls for all marquees. Originally hidden from non-js browsers.
		
		var heroQty = $$(".hero").length; // how many marquees?
		var hero = "hero" + heroID;
		heroID = heroID + 1; // start loop
		if(heroID == heroQty+1){ // if loop reaches total number of marquees, start over
			heroID = 1 
		}

		$$(".hero").each(function(element){ element.hide()	}); // hide all marquees
		document.getElementById(hero).show(); // show first/next marquee
		
		clearTimeout(timeoutVariable);
		timeoutVariable = setTimeout(function(){initiateRotateHero('hero'+heroID)}, heroTime);
		
		$$(".rotateNum").each(function(element){ // automatically add numbers to the Marquee control
			var numOfId = element.up(1).readAttribute("id");
			var numTemp1 = new Array;
			numTemp1 = numOfId.split("hero");
			var heroNum = numTemp1[1];
			element.innerHTML = heroNum + " of " + heroQty;
		});
		
		/* onclick function */
		$$(".rotateHero a").each(function(element) {			
			element.onclick = function() {
				if(element.readAttribute("href") == "#heroPause"){ // call function to stop if pause is selected
					clearTimeout(timeoutVariable);
					return false;
				}
				// get link value and strip # 
				var gotoHero = element.readAttribute("href");
				var temp = new Array;
				temp  = gotoHero.split("#");	
				var showHero = temp[1];

				/* get hero number */
				var heroNum = new Array;
				temp2 = showHero.split("hero");
				var nextHero = temp2[1];
				
				var hero = element.up(1).readAttribute("id"); // get hero container id value 

				document.getElementById(hero).hide();
				document.getElementById(showHero).show(); 
				
				var heroTime = parseInt(heroTime)/2;  
				clearTimeout(timeoutVariable);
				timeoutVariable = setTimeout(function(){initiateRotateHero('hero'+nextHero)}, heroTime);
				heroID = parseInt(nextHero); // reset loop to start over at the next/previous marquee
				return false;					
			}
			return false;	
		});					
	}
}

function setCookie( name, value, expires, path, domain, secure ){
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name + "=" +( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
	( ( path ) ? ";path=" + path : "" ) + 
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function getCookie(name) {
	var dc = document.cookie;
	var cname = name + "=";
	var clen = dc.length;
	var cbegin = 0;
	while (cbegin < clen) {
	var vbegin = cbegin + cname.length;
	if (dc.substring(cbegin, vbegin) == cname) {
		var vend = dc.indexOf (";", vbegin);
		if (vend == -1) vend = clen;
			return unescape(dc.substring(vbegin, vend));
		}
		cbegin = dc.indexOf(" ", cbegin) + 1;
		if (cbegin== 0) break;
	}
	return null;
}	

function loadAccordions() {
	if(Prototype.Browser.Opera){
		if($("accTable")){$("accTable").setStyle({fontSize:"10px", textAlign:"left"});}
	}	
	var topAccordion = new accordion('accordion', {
		classNames : {
			toggle : 'accToggler',
			toggleActive : 'toggleActive',
			content : 'accContent'
		},
		defaultSize : {
			width : 230
		},
		direction : 'vertical'
	});
	
	// Open first one
	topAccordion.activate($$('#accordion .accToggler')[0]);		
}

/*-----------------------------------------------------------------------------------------------*/
// accordion.js v2.0
//
// Copyright (c) 2007 stickmanlabs
// Author: Kevin P Miller | http://www.stickmanlabs.com
// 
// Accordion is freely distributable under the terms of an MIT-style license.
//
// I don't care what you think about the file size...
//   Be a pro: 
//	    http://www.thinkvitamin.com/features/webapps/serving-javascript-fast
//     http://rakaz.nl/item/make_your_pages_load_faster_by_combining_and_compressing_javascript_and_css_files
//

if (typeof Effect == 'undefined') 
	throw("accordion.js requires the script.aculo.us effects.js library!");

	var accordion = Class.create();
	accordion.prototype = {
		showAccordion : null, 
		currentAccordion : null, 
		duration : null, 
		effects : [], 
		animating : false,		
		initialize: function(container, options) {
			if (!$(container)) {
				throw(container+" doesn't exist!"); 
				return false;
			}		  
			this.options = Object.extend({
				resizeSpeed : 8,
				classNames : {
					toggle : 'accordion_toggle',
					toggleActive : 'accordion_toggle_active',
					content : 'accordion_content'
				},
				defaultSize : {
					height : null,
					width : null
				},
				direction : 'vertical',
				onEvent : 'mouseover'
			}, 
			options || {});
			this.duration = ((11-this.options.resizeSpeed)*0.15);
			var accordions = $$('#'+container+' .'+this.options.classNames.toggle);
			accordions.each(function(accordion) {
				Event.observe(accordion, 'mouseover', this.activate.bind(this, accordion), false);
				Event.observe(accordion, 'click', this.activate.bind(this, accordion), false);
				if (this.options.onEvent == 'click') {
					accordion.onclick = function() {
						return false;
					};
				}
				if (this.options.direction == 'horizontal') {
					var options = $H({
						width: '0px'
					});
				} 
				else {
					var options = $H({
						height: '0px'
					});
				}
				options.merge({display: 'none'});			
				this.currentAccordion = $(accordion.next(0)).setStyle(options);			
			}.bind(this));
		},
		//  Activate an accordion
		activate : function(accordion) {
			if (this.animating) {
				return false;
			}
			
			this.effects = [];
		
			this.currentAccordion = $(accordion.next(0));
			this.currentAccordion.setStyle({
				display: 'block'
			});		
			
			this.currentAccordion.previous(0).addClassName(this.options.classNames.toggleActive);
	
			if (this.options.direction == 'horizontal') {
				this.scaling = $H({
					scaleX: true,
					scaleY: false
				});
			} else {
				this.scaling = $H({
					scaleX: false,
					scaleY: true
				});			
			}
				
			if (this.currentAccordion == this.showAccordion) {
				//this.deactivate();
			} else {
				this._handleAccordion();
			}
		},
		
		// Deactivate an active accordion
		deactivate : function() {
			var options = $H({
				duration: this.duration,
				scaleContent: false,
				transition: Effect.Transitions.sinoidal,
				queue: {
					position: 'end', 
					scope: 'accordionAnimation'
				},
				scaleMode: { 
					originalHeight: this.options.defaultSize.height ? this.options.defaultSize.height : this.currentAccordion.scrollHeight,
					originalWidth: this.options.defaultSize.width ? this.options.defaultSize.width : this.currentAccordion.scrollWidth
				},
				afterFinish: function() {
					this.showAccordion.setStyle({
						height: 'auto',
						display: 'none'
					});				
					this.showAccordion = null;
					this.animating = false;
				}.bind(this)
			});    
			options.merge(this.scaling);
	
			this.showAccordion.previous(0).removeClassName(this.options.classNames.toggleActive);    
			new Effect.Scale(this.showAccordion, 0, options);
		},
	
		// Handle the open/close actions of the accordion
		_handleAccordion : function() {
			//alert(this.currentAccordion.scrollHeight);
			var options = $H({
				sync: true,
				scaleFrom: 0,
				scaleContent: false,
				transition: Effect.Transitions.sinoidal,
				scaleMode: { 
					originalHeight: this.options.defaultSize.height ? this.options.defaultSize.height : this.currentAccordion.scrollHeight,
					originalWidth: this.options.defaultSize.width ? this.options.defaultSize.width : this.currentAccordion.scrollWidth
				}
			});
			options.merge(this.scaling);
			
			this.effects.push(
				new Effect.Scale(this.currentAccordion, 100, options)
			);
	
			if (this.showAccordion) {
				this.showAccordion.previous(0).removeClassName(this.options.classNames.toggleActive);
				
				options = $H({
					sync: true,
					scaleContent: false,
					transition: Effect.Transitions.sinoidal
				});
				options.merge(this.scaling);
				
				this.effects.push(
					new Effect.Scale(this.showAccordion, 0, options)
				);				
			}
			
			new Effect.Parallel(this.effects, {
				duration: this.duration, 
				queue: {
					position: 'end', 
					scope: 'accordionAnimation'
				},
				beforeStart: function() {
					this.animating = true;
				}.bind(this),
				afterFinish: function() {
					if (this.showAccordion) {
						this.showAccordion.setStyle({
							display: 'none'
						});				
					}
					$(this.currentAccordion).setStyle({
						height: 'auto'
					});
					this.showAccordion = this.currentAccordion;
					this.animating = false;
				}.bind(this)
			});
		}
	}
	var verticalAccordions = $$('.accordion_toggle'); 
	verticalAccordions.each(function(accordion) {     
		$(accordion.next(0)).setStyle({         
			height: '0px'
		});
	}); 
/*-----------------------------------------------------------------------------------------------*/


function assignPopupHandler() {
	$$('a.popup').each(function(element) {
		element.onclick = function() {
			return openPopup(this.href);
		}
	});
	
	$$('a.popupClose').each(function(element) {
		element.onclick = function() {
			return window.close();
		}
	});
}

function openPopup(url){
	window.open(url,'popup_window','height=600,width=800,resizable=yes,scrollbars=yes');
	return false;
}