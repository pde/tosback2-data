// START OF Advanced SmartSource Data Collector TAG
// Copyright (c) 1996-2006 WebTrends Inc. All rights reserved.
// $DateTime: 2006/03/09 14:15:22 $
var gService = false;
var gTimeZone = -5;
var gDomain="sitestats.ets.org";
var gDcsId="dcs4z9z5284gol4nko46dauim_9c9l";
var gFpc="WT_FPC";
var gConvert=false;	// not using FPC

// Code section for Enable Event Tracking
function dcsParseSvl(sv){
	sv=sv.split(" ").join("");
	sv=sv.split("\t").join("");
	sv=sv.split("\n").join("");
	var pos=sv.toUpperCase().indexOf("WT.SVL=");
	if (pos!=-1){
		var start=pos+8;
		var end=sv.indexOf('"',start);
		if (end==-1){
			end=sv.indexOf("'",start);
			if (end==-1){
				end=sv.length;
			}
		}
		return sv.substring(start,end);
	}
	return "";
}
function dcsIsOnsite(host){
	var doms="ets.org";
    var aDoms=doms.split(',');
    for (var i=0;i<aDoms.length;i++){
		if (host.indexOf(aDoms[i])!=-1){
		       return 1;
		}
    }
    return 0;
}
function dcsIsHttp(e){
	return (e.href&&e.protocol&&(e.protocol.indexOf("http")!=-1))?true:false;
}

var gHref="";
function dcsSaveHref(evt){
	if (evt.preventDefault&&evt.target.href){
		evt.preventDefault();
		gHref=evt.target.href;
	}
}
function dcsLoadHref(evt){
	if (gHref.length>0){
		window.location=gHref;
		gHref="";
	}
}
function dcsEvt(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
function dcsBind(event,func){
	if ((typeof(window[func])=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, window[func], true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, window[func]);
		}
	}
}
function dcsET(){
	dcsBind("click","dcsDownload");
	dcsBind("click","dcsDynamic");
	dcsBind("click","dcsFormButton");
	dcsBind("click","dcsOffsite");
	dcsBind("click","dcsAnchor");
	dcsBind("mousedown","dcsRightClick");
}
	
function dcsMultiTrack(){
	if (arguments.length%2==0){
		for (var i=0;i<arguments.length;i+=2){
			if (arguments[i].indexOf('WT.')==0){
				WT[arguments[i].substring(3)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCS.')==0){
				DCS[arguments[i].substring(4)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCSext.')==0){
				DCSext[arguments[i].substring(7)]=arguments[i+1];
			}
		}
		var dCurrent=new Date();
		DCS.dcsdat=dCurrent.getTime();
		dcsFunc("dcsCookie");
		dcsTag();
	}
}

// Add event handlers here
// Code section for Track clicks to download links.

function dcsDownload(evt){
	evt=evt||(window.event||"");
	if (evt){
		var e=dcsEvt(evt,"A");
		if (e.hostname&&dcsIsOnsite(e.hostname)){
			var types="xls,doc,pdf,swf,exe,wmv,ppt,xlsx,mp4,docx,pptx";
			if (types.indexOf(e.pathname.substring(e.pathname.lastIndexOf(".")+1,e.pathname.length))!=-1){
				var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
				if (qry.toUpperCase().indexOf("WT.SVL=")==-1){
					WT.svl=dcsParseSvl(e.name?e.name.toString():(e.onclick?e.onclick.toString():""));
				}
				var path=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
				dcsSaveHref(evt);
				dcsMultiTrack("DCS.dcssip",e.hostname,"DCS.dcsuri",path,"DCS.dcsqry",e.search||"","WT.ti","Download:"+(e.innerHTML||""),"WT.dl","1");
				DCS.dcssip=DCS.dcsuri=DCS.dcsqry=WT.ti=WT.svl=WT.dl="";
			}
		}
	}
}

function dcsAdv(){
	dcsFunc("dcsET");
	dcsFunc("dcsCookie");
	dcsFunc("dcsAdSearch");
	dcsFunc("dcsTP");
}
// END OF Advanced SmartSource Data Collector TAG

// START OF Basic SmartSource Data Collector TAG
// Copyright (c) 1996-2006 WebTrends Inc. All rights reserved.
// $DateTime: 2006/03/09 14:15:22 $
var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();
var gI18n=false;
if (window.RegExp){
	var RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	var I18NRE={"%25":/\%/g};
}

// Add customizations here

function dcsVar(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=gI18n?dcsEscape(dcsEncode(document.title),I18NRE):document.title;
	}
	WT.js="Yes";
	WT.jv=dcsJV();
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		if (document.body.connectionType){
			WT.ct=document.body.connectionType;
		}
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		for(var i=10;i>0;i--){
			try{
				var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
				WT.fi="Yes";
				WT.fv=i+".0";
				break;
			}
			catch(e){
			}
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}
	if (gI18n){
		WT.em=(typeof(encodeURIComponent)=="function")?"uri":"esc";
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
	}
//	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=gI18n?dcsEscape(window.document.referrer, I18NRE):window.document.referrer;
		}
	}
}

function dcsA(N,V){
	return "&"+N+"="+dcsEscape(V, RE);
}

function dcsEscape(S, REL){
	if (typeof(REL)!="undefined"){
		var retStr = new String(S);
		for (R in REL){
			retStr = retStr.replace(REL[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsEncode(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}

function dcsCreateImage(dcsSrc){
	if (document.images){
		gImages[gIndex]=new Image;
		if ((typeof(gHref)!="undefined")&&(gHref.length>0)){
			gImages[gIndex].onload=gImages[gIndex].onerror=dcsLoadHref;
		}
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}

function dcsMeta(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		for (var i=1;i<=elems.length;i++){
			var meta=elems.item(i-1);
			if (meta.name){
				if (meta.name.indexOf('WT.')==0){
					WT[meta.name.substring(3)]=(gI18n&&(meta.name.indexOf('WT.ti')==0))?dcsEscape(dcsEncode(meta.content),I18NRE):meta.content;
				}
				else if (meta.name.indexOf('DCSext.')==0){
					DCSext[meta.name.substring(7)]=meta.content;
				}
				else if (meta.name.indexOf('DCS.')==0){
					DCS[meta.name.substring(4)]=(gI18n&&(meta.name.indexOf('DCS.dcsref')==0))?dcsEscape(meta.content,I18NRE):meta.content;
				}
			}
		}
	}
}

function dcsTag(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=dcsA(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var nn=((agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
	var nn4=(nn&&(major==4));
	var nn6up=(nn&&(major>=5));
	var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
	var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
	var ie5up=(ie&&!ie4);
	var op=(agt.indexOf("opera")!=-1);
	var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
	var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
	var op7up=(op&&!op5&&!op6);
	var jv="1.1";
	if (nn6up||op7up){
		jv="1.5";
	}
	else if ((mac&&ie5up)||op6){
		jv="1.4";
	}
	else if (ie5up||nn4||op5){
		jv="1.3";
	}
	else if (ie4){
		jv="1.2";
	}
	return jv;
}

function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

// END OF Basic SmartSource Data Collector TAG