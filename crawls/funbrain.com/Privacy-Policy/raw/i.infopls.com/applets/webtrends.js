// START OF WEBTRENDS LIVE TAG 
// Copyright 2001 NetIQ Corporation 
// For privacy concerns, check our Privacy Policy at http://www.webtrendslive.com/privacy_policy.htm 
// eCommerce Revenue Tracking (patent pending) 
// For eCommerce implementation, visit the following page: 

// Changed by Dan Franklin 01092003 to use global FEN_cartview variable
// This variable is set in template/default/webtrends.php.

// $Revision: 2.17 $

function wtl_Tag6(iSiteID,CONTENTGROUP,sURL)
{
	var ORDER= "";
	if (window.FEN_order) {
		ORDER = FEN_order;
	}
	var SERVER= "";
	var INVOICE= "";
	var CARTVIEW= "";
	if (window.FEN_cartview) {
		CARTVIEW = FEN_cartview;
	}
	var CARTADD= "";
	var CARTREMOVE= "";
	var CHECKOUT= "";
	var CARTBUY= "";
	if (window.FEN_cartbuy) {
		CARTBUY = FEN_cartbuy;
	}
	var CustomC = location.search.replace(/\?/,""); 
	var CustomD = "";
	if (CustomC.indexOf("wtlAC=") != -1) {
		CustomD = CustomC.substring((CustomC.indexOf("wtlAC=")+6),CustomC.length);
	}
	var ADCAMPAIGN = CustomD;

	var VIRTUALSEARCH = "Main="+CONTENTGROUP;
	var wtl_URL= sURL+"?"+VIRTUALSEARCH;
	
	var wtl_Title= document.title;

	function D8( d)
	{
		var fwd=0, seed= new Date('01/01/2000'), key= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var s= key.charAt( d.getFullYear()-2000)+key.charAt( d.getMonth()+1)+key.charAt( d.getDate());
		s+= key.charAt( d.getHours())+key.charAt( d.getMinutes())+key.charAt( d.getSeconds());
		while( seed.getDay()!=fwd) seed= new Date(seed.getTime() + 86400000);
		var w= Math.floor( (d.getTime()-(seed.getTime()+86400000)) / 604800000 );
		s+= key.charAt( (w-(w%16))/16 );
		s+= key.charAt( w%16);
		return s;
	}

	function A( B, C)
	{
		W+="&"+B+"="+escape(C);
	}

	var t = new Date();
	var W="http"+(document.URL.indexOf('https:')==0?'s':'')+"://statse.webtrendslive.com/S" + iSiteID + "/button6.asp?tagver=6&si=" + iSiteID + "&fw=0";
	A( "server", typeof(SERVER)== "string" ? SERVER : "");
	A( "order", typeof(ORDER)== "string" ? ORDER : "");
	A( "Group", typeof(CONTENTGROUP)== "string" ? CONTENTGROUP : "");
	A( "invoice", typeof(INVOICE)== "string" ? INVOICE : "");
	A( "cartview", typeof(CARTVIEW)== "string" ? CARTVIEW : "");
	A( "cartadd", typeof(CARTADD)== "string" ? CARTADD : "");
	A( "cartremove", typeof(CARTREMOVE)== "string" ? CARTREMOVE : "");
	A( "checkout", typeof(CHECKOUT)== "string" ? CHECKOUT : "");
	A( "cartbuy", typeof(CARTBUY)== "string" ? CARTBUY : "");
	A( "adcampaign", typeof(ADCAMPAIGN)== "string" ? ADCAMPAIGN : "");
	A( "tz", t.getTimezoneOffset());
	A( "ch", t.getHours());
	A( "cl", D8(t));
	A( "ti", typeof(wtl_Title)== "string" ? wtl_Title : document.title);
	A( "url", typeof(wtl_URL)== "string" ? wtl_URL : document.URL);
	A( "rf", window.document.referrer);
	A( "js", "Yes");
	A( "ul", navigator.appName=="Netscape" ? navigator.language : navigator.userLanguage);
	if(typeof(screen)=="object")
	{
	A( "sr", screen.width+"x"+screen.height);
	A( "cd", screen.colorDepth);
	A( "jo", navigator.javaEnabled() ? "Yes" : "No");
	}
	if( W.length>2048 && navigator.userAgent.indexOf('MSIE')>=0)
		W= W.substring( 0, 2043)+"&tu=1";

	document.write('<IMG ID="WTL_TAG" BORDER="0" WIDTH="1" HEIGHT="1" SRC="'+W+'">');
}

function dcs_track(dcsid,dcsuri,dcsqry,dcssip)
{
	function dcs_createImage(dcs_src)
	{
		dcs_imgarray[dcs_ptr] = new Image;
		dcs_imgarray[dcs_ptr].src = dcs_src;
		dcs_ptr++; 
	}
	var P="";
	var sCurrent ="";
	var dCurrent = new Date();
	sCurrent = dCurrent;
	// add the new parameters
	P += "dcsuri="+dcsuri;
	P += "&dcsqry="+dcsqry;
	P += "&dcssip=" +dcssip;
	if ((window.document.referrer != "") && (window.document.referrer != "-"))
	{
		if (!(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) < 4) )
		{
			P +="&dcsref="+escape(window.document.referrer);
		}
	}
	P += "&dcsdat="+escape(sCurrent);
	dcs_createImage("http://dcs.wtlive.com/" + dcsid + "/dcs.gif?"+P);
}

// Version8 functions
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
	WT.tv="8.0.0";
	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
 	if (!DCS.dcsuri) {
		DCS.dcsuri=window.location.pathname;
	}
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
	//if ( dcsSrc.search("annabel")) { alert(dcsSrc); } else { alert("test"); }
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
    //alert("P="+P);
    tved_display=P; //for webtrends info display in tveditor view page

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
			else if (arguments[i].indexOf('gDcsId')==0){
			        gDcsId = arguments[i+1];	
			}
		}
		var dCurrent=new Date();
                if ( !gDcsId ) {
                    gDcsId="dcsdindis10000gkqafn3wijp_4m7k";
                }
		DCS.dcsdat=dCurrent.getTime();
		dcsFunc("dcsCookie");
		dcsTag();
	}
}
