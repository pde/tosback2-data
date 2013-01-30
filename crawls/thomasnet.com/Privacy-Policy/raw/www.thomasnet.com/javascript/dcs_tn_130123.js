// 090130-01
// 080528-01
// 080528-01  : set dcsExternal to call dcsMultiTrack
// 07-06-2011 : single tracker
// 08-08-2011 : reset WT.ac and WT.ad after each tracking call
// 01-23-2013 : dcsEvent wrapper for event/async tracking, w/ sequence detection

function dcsVar(uri, query, evt){
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
	WT.tv="8.0.2";
	//	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	if (typeof(uri)!="undefined") {
	    DCS.dcsuri=uri;
	    DCS.dcsqry=query;
	    DCS.dcsref=evt?window.location.href.split('?')[0]:window.location.pathname;
	}
	else {
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
    }

function dcsA(N,V){
	return "&"+N+"="+dcsEscape(V, RE);
}

function dcsEscape(S, REL){
	if (typeof(REL)!="undefined"){
		var retStr = new String(S);
		for (var R in REL){
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
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
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
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.indexOf("WT.")==0){
					var encode=false;
					if (gI18n){
						var params=["mc_id","oss","ti"];
						for (var j=0;j<params.length;j++){
							if (name.indexOf("WT."+params[j])==0){
								encode=true;
								break;
							}
						}
					}
					WT[name.substring(3)]=encode?dcsEscape(dcsEncode(content),I18NRE):content;
				}
				else if (name.indexOf("DCSext.")==0){
					DCSext[name.substring(7)]=content;
				}
				else if (name.indexOf("DCS.")==0){
					DCS[name.substring(4)]=(gI18n&&(name.indexOf("DCS.dcsref")==0))?dcsEscape(content,I18NRE):content;
				}
			}
			else if (gI18n&&(equiv=="Content-Type")){
				var pos=content.toLowerCase().indexOf("charset=");
				if (pos!=-1){
					WT.mle=content.substring(pos+8);
				}
			}
		}
	}
}

function dcsTag(dcssip){

	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	dcsAdSearch();
	if (typeof(dcssip)!="undefined") {
		DCS.dcssip=dcssip;
	}
	else {
		DCS.dcssip=window.location.hostname;
	}
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=dcsA(N,DCS[N]);
		}
	}
	var keys=["co_f","vt_sid","vt_f_tlv","vt_f_tlh","vt_f","vt_f_a","vt_f_s","vt_f_d"];
	for (var i=0;i<keys.length;i++){
		var key=keys[i];
		if (WT[key]){
			P+=dcsA("WT."+key,WT[key]);
			delete WT[key];
		}
	}
	for (N in gRollWT) {  //Get the session ids into the new image tag
	    if (gRollWT[N]){
		    P1+=dcsA("WT."+N,gRollWT[N]);
		    delete gRollWT[N];
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
	WT.ac=WT.ad='';
}
function dcsExtend(N,V){
	if (N.toLowerCase() == 'wt.ad')
		WT.ad?WT.ad+=','+V:WT.ad=V;
	else
		DCSext[N]=V;
}
function dcsExternal(uri,query,dcssip){
	DCSext = "";
	gClickOn = 1;
	dcsMultiTrack("DCS.dcssip",dcssip,"DCS.dcsuri",uri,"DCS.dcsqry",query,"DCS.dcsref",window.location.href);
	DCS.dcssip=DCS.dcsuri=DCS.dcsqry=DCS.dcsref="";
	gClickOn = 0;
}

// WebTrends SmartSource Data Collector
// Copyright (c) 1996-2007 WebTrends Inc. All rights reserved.
// $DateTime: 2007/02/02 09:07:21 $

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
	


function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var ff=(agt.indexOf("firefox")!=-1);
	var ff0=(agt.indexOf("firefox/0.")!=-1);
	var ff10=(agt.indexOf("firefox/1.0")!=-1);
	var ff15=(agt.indexOf("firefox/1.5")!=-1);
	var ff2up=(ff&&!ff0&&!ff10&!ff15);
	var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
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
	if (ff2up){
		jv="1.7";
	}
	else if (ff15){
		jv="1.6";
	}
	else if (ff0||ff10||nn6up||op7up){
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

function dcsEvent(){

	var post = gIndex, a = arguments;
	
	if (post) {
		$.extend(bWT = {}, WT, true);
		$.extend(bDCS = {}, DCS, true);
		$.extend(bDCSext = {}, DCSext, true);
		WT = {}, DCS = {}, DCSext = {};
	}
	
	if (a.length%2==0) {
		
		for (var i=0; i<a.length; i+=2) {
			if (a[i].indexOf('WT.')==0) {
				WT[a[i].substring(3)]=a[i+1];
			}
			else if (a[i].indexOf('DCS.')==0) {
				DCS[a[i].substring(4)]=a[i+1];
			}
			else if (a[i].indexOf('DCSext.')==0) {
				DCSext[a[i].substring(7)]=a[i+1];
			}
		}
		if (post) {
			var dCurrent=new Date();
			DCS.dcsdat=dCurrent.getTime();
			dcsVar("async.event", "", 1);
			dcsFunc("dcsCookie");
			dcsTag();
		}
	}
	
	if (post) {
		$.extend(WT = {}, bWT, true);
		$.extend(DCS = {}, bDCS, true);
		$.extend(DCSext = {}, bDCSext, true);
	}
}

dcsVar();
dcsMeta();
dcsFunc("dcsAdv");
