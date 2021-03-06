//	Changes on this version:
//	090130-01 - assigned custom domain
//	090130-01 - added client center tracking
//	090203-01 - TGR javascript files versioning control
//  091118-01 - Recover visitor ID from WEBTRENDS_ID cookie
//  07-28-2011 - hidden tracking for onsite ads, single tracker
//  11-08-2011 - fix for PDF onsite ad links

var gImages=new Array;
var gIndex=0;
var gI18n=true;
if (window.RegExp){
	var RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	var I18NRE={"%25":/\%/g};
}
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();
var gService = true;
var gTimeZone = -5;
var gTempWtId = "";
var gWtId = "";
var gFpc="TN_FPC";
var gWTFpc="WT_FPC";
var gClickOn = 0;
var gDcsId = "";
var gRollupDCSId = "";
var gRollFpc="TN_ROLLUP";
var gRollupDom=".thomasnet.com";
var gRollWT = new Object();
var gDomain="sdctrack2.thomasnet.com";
var gDcsId = "dcswownlk00000gkmr5w3q0yk_3d4c";
var gSecondary = "";
if (gService){
	var gConvert=true;
}
function dcsCookie(){
	if (typeof(dcsOther)=="function"){
		dcsOther();
	}
	else if (typeof(dcsPlugin)=="function"){
		dcsPlugin();
	}
	else if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
		dcsRollup(gTimeZone);
	}
}
function dcsGetCookie(name){
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		}
		return unescape(document.cookie.substring(start,end));
	}
	return null;
}
function dcsGetCrumb(name,crumb){
	var aCookie=dcsGetCookie(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsGetIdCrumb(name,crumb){
	var cookie=dcsGetCookie(name);
	var id=cookie.substring(0,cookie.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsDeleteCookie(cookie_name){
    var curdom = "";
    if ((window.location.hostname.indexOf('www.') >= 0) || (window.location.hostname.indexOf('ww8.') >= 0) || (window.location.hostname.indexOf('dev.') >= 0)) {
	var curdom = window.location.hostname.substring(4,window.location.hostname.length);
    }
    else if (window.location.hostname.indexOf('news.') >= 0) {
	var curdom = window.location.hostname.substring(5,window.location.hostname.length);
    }
    else if (window.location.hostname.indexOf('chopper.') >= 0) {
	var curdom = window.location.hostname.substring(8,window.location.hostname.length);
    } else {
	var curdom = window.location.hostname.substring(0,window.location.hostname.length);
    }
    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; domain=." + curdom + "; expires=" + cookie_date.toGMTString();
}

function dcsFPC(offset){
    if (typeof(offset)=="undefined"){
	return;
    }
   if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
   	return;
   }
   var dCur=new Date();
   var adj=(dCur.getTimezoneOffset()*60000)+(offset*3600000);
   dCur.setTime(dCur.getTime()+adj);
   var dExp=new Date(dCur.getTime()+315360000000);
   var dSes=new Date(dCur.getTime());
   WT.co_f=WT.vt_sid=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
   if (document.cookie.indexOf(gWTFpc+"=")!=-1){
       dSes = assignSessionVars(gWTFpc,dCur,adj,WT);
       WT.cc="a";
   }
   else if ((document.cookie.indexOf(gFpc+"=")!=-1) && (document.cookie.indexOf(gWTFpc+"=")==-1)){
       dSes = assignSessionVars(gFpc,dCur,adj,WT);
       WT.cc="b";
       dcsDeleteCookie(gFpc);
   }
   else{
       var tmpname=gWTFpc+"_TMP=";
       document.cookie=tmpname+"1";
       if (document.cookie.indexOf(tmpname)!=-1){
	   document.cookie=tmpname+"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	   if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
	       WT.co_f=gWtId;
	   }
	   else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
	       WT.co_f=gTempWtId;
	       WT.vt_f="1";
	   }
	   else{
	       WT.co_f="2";
	       var cur=dCur.getTime().toString();
	       for (var i=2;i<=(32-cur.length);i++){
		   WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
	       }
	       WT.co_f+=cur;
	       WT.vt_f="1";
	   }
	   if (typeof(gWtAccountRollup)=="undefined"){
	       WT.vt_f_a="1";
	   }
	   WT.vt_f_s="1";
	   WT.vt_f_d="1";
	   WT.vt_f_tlh=WT.vt_f_tlv="0";
	   WT.cc="c";
       }
       else{
	   WT.co_f=WT.vt_sid=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	   WT.vt_f="2";
	   WT.vt_f_a="2";
	   WT.cc="d";
	   return;
       }
   }
   WT.co_f=escape(WT.co_f);
   WT.vt_sid=WT.co_f+"."+(dSes.getTime()-adj);
   var expiry="; expires="+dExp.toGMTString();
   document.cookie=gWTFpc+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
}

function assignSessionVars(fpc,dCur,adj,thisWT) {
   var id=dcsGetIdCrumb(fpc,"id");
   var lv=parseInt(dcsGetCrumb(fpc,"lv"));
   var ss=parseInt(dcsGetCrumb(fpc,"ss"));
   // if ID is null, try to get it from WEBTRENDS_ID
   if  ((id==null)||(id=="null")||(id=="")) {
   		id = gWtId!=""?gWtId:gTempWtId;
   }
   if ((id==null)||(id=="null")||(id=="")||isNaN(lv)||isNaN(ss)){
       return dCur;
   }
   thisWT.co_f=id;
   var dLst=new Date(lv);
   thisWT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
   var dSes=new Date(ss);
   if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
     thisWT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
     dSes.setTime(dCur.getTime());
     thisWT.vt_f_s="1";
   }
   if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
      thisWT.vt_f_d="1";
   }
   return dSes;
}


function dcsAdv(){
	dcsFunc("dcsCookie");
	dcsFunc("dcsLogin");
	/*
		if (typeof(dcsAdSearch)=="function") {
		if (window.addEventListener){
			window.addEventListener("load",dcsAdSearch.wtbind(this),false);
		}
		else if (window.attachEvent){
			window.attachEvent("onload",dcsAdSearch.wtbind(this));
		}
	} */
}

function dcsAssignDcsId(dcshostname) {}

function dcsRollup(offset) {
    // This functions sets a domainwide cookie and uses it to generate new global sid values
    // when the target domains are within the rollup DCSid.

    // it needs to get called as part of dcsCookie (i.e., before dcsTag)
    if (typeof(offset)=="undefined"){
	return;
    }
   if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
   	return;
   }
   if (gRollupDCSId == "") {
       return;
   }
   var dCur=new Date();
   var adj=(dCur.getTimezoneOffset()*60000)+(offset*3600000);
   dCur.setTime(dCur.getTime()+adj);
   var dExp=new Date(dCur.getTime()+315360000000);
   var dSes=new Date(dCur.getTime());
   gRollWT.co_f=gRollWT.vt_sid=gRollWT.vt_f=gRollWT.vt_f_a=gRollWT.vt_f_s=gRollWT.vt_f_d=gRollWT.vt_f_tlh=gRollWT.vt_f_tlv="";
   if (document.cookie.indexOf(gRollFpc+"=")==-1){
       var tmpname=gRollFpc+"_TMP=";
       document.cookie=tmpname+"1";
       if (document.cookie.indexOf(tmpname)!=-1){
	   document.cookie=tmpname+"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	   if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
	       gRollWT.co_f=gWtId;
	   }
	   else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
	       gRollWT.co_f=gTempWtId;
	       gRollWT.vt_f="1";
	   }
	   else{
	       gRollWT.co_f="2";
	       var cur=dCur.getTime().toString();
	       for (var i=2;i<=(32-cur.length);i++){
		   gRollWT.co_f+=Math.floor(Math.random()*16.0).toString(16);
	       }
	       gRollWT.co_f+=cur;
	       gRollWT.vt_f="1";
	   }
	   if (typeof(gWtAccountRollup)=="undefined"){
	       gRollWT.vt_f_a="1";
	   }
	   gRollWT.vt_f_s="1";
	   gRollWT.vt_f_d="1";
	   gRollWT.vt_f_tlh=gRollWT.vt_f_tlv="0";
	   gRollWT.cc="c";
       } else{
	   gRollWT.co_f=gRollWT.vt_sid=gRollWT.vt_f_s=gRollWT.vt_f_d=gRollWT.vt_f_tlh=gRollWT.vt_f_tlv="";
	   gRollWT.vt_f="2";
	   gRollWT.vt_f_a="2";
	   gRollWT.cc="d";
	   return;
       }
   } else {
       dSes = assignSessionVars(gRollFpc,dCur,adj,gRollWT);
       gRollWT.cc="a";
  }

   gRollWT.co_f=escape(gRollWT.co_f);
   gRollWT.vt_sid=gRollWT.co_f+"."+(dSes.getTime()-adj);
   var expiry="; expires="+dExp.toGMTString();
   document.cookie=gRollFpc+"="+"id="+gRollWT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gRollupDom)!="undefined")&&(gRollupDom!=""))?("; domain="+gRollupDom):(""));
}

function dcsLogin() {
    var params = document.location.search;
    var logins = ["REGISTRANTID","TINID","TRID","TRDID"];
    for (i in logins) {
	var pos = params.toUpperCase().indexOf(logins[i]);
	if (pos != -1) {
	    var start = pos+logins[i].length+1;
	    var end = params.indexOf("&",start);
	    WT.dcsvid=params.substring(start, (end!=-1)?end:params.length);
	    return;
	}
    }
}

/* onsite ad tracking begin */
function exists(A) { return (typeof A != 'undefined' && A) }
Array.prototype.unique = function() {var n=[]; label: for(var i=0; i<this.length; i++ ) { for(var j=0; j<n.length;j++ ) { if(n[j]==this[i]) continue label; } n[n.length] = this[i]; } return n };  
dcsPageLoaded = false;

function dcsAdSearch() {
if (dcsPageLoaded) return;
dcsPageLoaded = true;
var ad = [];
	for (var i = 0; i < document.links.length; i++) {
		var a = document.links[i];
		var b = "";
		a.ad = a.getAttribute('ad');
		if (exists(a.ad) && a.ad) {
			ad.push(a.ad);
				if (exists(a.onclick)) {
					b = (""+a.onclick).substring((""+a.onclick).indexOf("{")-1);
					if (b.indexOf('dcsExternal') != -1) {
						a.setAttribute('more', b);
						a.onclick = function () { WT.ad = ''; WT.ac = this.getAttribute('ad'); eval(this.getAttribute('more')) };
					}
					else {
						a.setAttribute('more', b);
						a.onclick = function () { WT.ad = ''; document.cookie = "wtac=" +escape(this.getAttribute('ad')) + ';domain=' + gRollupDom + '; path=/'; eval(this.getAttribute('more')) };
					}
				}
				else
					a.onclick = function () { WT.ad = ''; document.cookie = "wtac=" +escape(this.getAttribute('ad')) + ';domain=' + gRollupDom + '; path=/' };
		}
	}
	if (ad && ad.length)
		exists(WT.ad)?WT.ad+=';'+ad.unique().join(';'):WT.ad=ad.unique().join(';');
	if (dcsGetCookie('wtac')) {
		var ac = unescape(dcsGetCookie('wtac'));
		exists(WT.ac)?WT.ac+=';'+ac:WT.ac=ac;
		document.cookie = 'wtac=;domain=' + gRollupDom + '; path=/';
	}
}

/* onsite ad tracking end */

dcsAssignDcsId(window.location.hostname);
if ((typeof(gConvert)!="undefined")&&gConvert&&((document.cookie.indexOf(gWTFpc+"=")==-1)||dcsGetIdCrumb(gWTFpc,"id")=="")){
    document.write("<SCR"+"IPT Language='JavaScript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'></SCR"+"IPT>");
}

