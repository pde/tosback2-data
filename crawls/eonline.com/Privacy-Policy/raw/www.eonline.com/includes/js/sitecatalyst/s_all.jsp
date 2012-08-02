



//Tracking Functions
function sTrackPhotoView(photoName,cleanGalleryTitle) { //Tracks as a Page View
	/* Custom Photo View Implementation Coming Soon */
	s.linkTrackVarsTmp=s.linkTrackVars;
	s.linkTrackVars+=",eVar21,prop43,prop38,";
	s.linkTrackEvents="event22";
	s.events="event22";
	s.eVar21="photo";
	s.prop15 ="photos";
	s.prop62="detail";
	s.prop26="scroll:" + photoName;

	s.prop38=cleanGalleryTitle;
	
	s.pageName+=":"+photoName;
//else
//	s.pageName = "";

//	sSetHeavyPhoto();
//	sGetHeavyPhoto("gallery");
	s.eVar43=s.prop43;
	s.t();
	s.linkTrackEvents=s.events=s.eVar21="";
	s.linkTrackVars=s.linkTrackVarsTmp;
}

function sTrackForm(formName, formEvent, contributeEvent, assetType, formMeta, visitorID) {
	s.linkTrackVars=s.linkTrackVars + ",eVar8,prop5,";
	s.eVar8=formName.toLowerCase();

	if (formEvent=="start"){
		s.linkTrackEvents="event17"
		s.events="event17";
	} else if (formEvent=="complete"){
		s.linkTrackEvents="event18";
		s.events="event18";
	} else {
		s.linkTrackEvents="event17,event18";
		s.events="event17,event18";
	}
	if ((contributeEvent.length)> 0){
		sSetHeavyContributor();
	}
	if ((contributeEvent.length)> 0 && contributeEvent != "distribute"){
	//track real-time contributions
		s.linkTrackVars+=",prop5";
		s.linkTrackEvents+=",event7";
		s.events+=",event7";
		s.prop5=s.eVar4 + ":" + contributeEvent
	} else if(formEvent!="start"){
		s.linkTrackEvents+=",event5";
		s.events+=",event5";
	}
	if ((assetType.length)> 0){
	//track asset uploaded
		s.linkTrackVars+=",eVar21";
		s.eVar21 = assetType;
	}
	if ((formMeta.length)> 0){
		//track meta fields in form
		s.linkTrackVars+=",prop24";
		s.prop24 = formMeta;
	}
	if ((visitorID.length)> 0){
	//track obsfuscated visitor ID On form complete
		s.linkTrackVars+=",eVar25";
		s.eVar25 = visitorID;
	}

	s.tl(document.URL,'o',formName.toLowerCase());
	s.eVar21=s.eVar25=s.prop24=s.linkTrackEvents=s.prop8=s.prop5=s.events="";
	s.linkTrackVars=s.linkTrackVars;
}

function sTrackDownload(downloadName) {
	s.tl(document.URL,'d',downloadName.toLowerCase());
}

function sGetVideoViewed() {
//	videoViewed = s.getAndPersistValue(s.propa,'s_video_seconds',cookieLifetime);
	if(!videoViewed){
		videoViewed = 0;
	}
	return videoViewed;
}

function sGetYear(){
	var d = new Date();
	return d.getFullYear();
}

//Updates the cookie with # of photos viewed, videos viewed, items contributed
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    currval = unescape(document.cookie.substring(c_start,c_end));
    if(currval < 100)
	setCookie(c_name,parseInt(currval) +1);
    return currval;
    }
  }
setCookie(c_name,1);
return 0;
}
function setCookie(c_name,value)
{
	expiredays=cookieLifetime;
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//Configuration Variables
cookieLifetime=365; //# of Days the cookie will last
photoCookieName="photo";
photoHeavyMinimum=18; //Minimum # of Photos to view before being categorized as high-photo;
videoCookieName="video";
VideoHeavyMinimum=3; //Minimum # of videos to view before being categorized as high-video;
contributionCookieName="contribution";
contributionHeavyMinimum=3; //Minimum # of contributions before being categorized as high-contributions;
    /* SiteCatalyst code version: H.24.3.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

var s_account="comcastegegdevelopment"
var loc=document.location.toString();
if (loc.indexOf('au.eonline.com') > -1) { s_account = "comcastegegeonlineau"; } 
else if (loc.indexOf('ca.eonline.com') > -1) { s_account = "comcastegegeonlineca"; } 
else if (loc.indexOf('fr.eonline.com') > -1) { s_account = "comcastegegeonlinefr"; } 
else if (loc.indexOf('de.eonline.com') > -1) { s_account = "comcastegegeonlinegdr"; } 
else if (loc.indexOf('it.eonline.com') > -1) { s_account = "comcastegegeonlineitaly"; } 
else if (loc.indexOf('uk.eonline.com') > -1) { s_account = "comcastegegeonlineuk"; } 
else if (loc.indexOf('www.eonline.com') > -1 || 
    loc.indexOf('boards.eonline.com') > -1 ||
	loc.indexOf('comcast.eonline.com') > -1 ||
    loc.indexOf('www.moviefinder.com') > -1 ||
	loc.indexOf('aol.eonline.com') > -1 ||
	loc.indexOf('netscape.eonline.com') > -1 ||	
	loc.indexOf('music.eonline.com') > -1 ||
	loc.indexOf('earthlink.eonline.com') > -1 ||
	loc.indexOf('earthlink.eonline.com') > -1 ||
	loc.indexOf('www.thesouptv.com') > -1 ||
	loc.indexOf('thesouptv.com') > -1) {
	s_account = "comcastegegeonlinecom";
}

var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,jpg";
s.linkInternalFilters="javascript:,eonline.com,seenon.com,#,moviefinder.comlocalhost,aim:BuddyIcon";
s.linkLeaveQueryString=false
s.linkTrackVars="eVar17,";
s.linkTrackEvents="event21,event28"
// For Time Parting Plug-in
s.dstStart="03/14/2010";  //daylight saving time begins
s.dstEnd="11/07/2010";  //daylight saving time ends

/* Plugin Config */
s.usePlugins=true;
function s_doPlugins(s) {

	/* External Campaign Tracking */
	if(!s.campaign) s.campaign=s.getQueryParam('cmpid','_');
	s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
	
	/* Internal Campaign Tracking */
	if(!s.eVar45) s.eVar45=s.prop17=s.getQueryParam('intcid');
	s.eVar45=s.getValOnce(s.eVar45,'s_eVar45',0);

	/* Sponsor Campaign Tracking */
	if(!s.eVar46) s.eVar46=s.getQueryParam('spon');
	s.eVar46=s.getValOnce(s.eVar46,'s_eVar46',0);

	// s.channel=location.hostname; /* Set Site Section to host?*/
	s.events=s.apl(s.events,'event2',',',2); /* Set Page View Event */

	/* Set Time Parting Variables  */
	if(!s.prop11&&!s.eVar11) s.prop11=s.eVar11=s.getTimeParting('h','-8'); // Set hour
	if(!s.prop12&&!s.eVar12) s.prop12=s.eVar12=s.getTimeParting('d','-8'); // Set day
	if(!s.prop13&&!s.eVar13) s.prop13=s.eVar13=s.getTimeParting('w','-8'); // Set weekday 
	
	s.prop23=s.eVar24=s.getNewRepeat();
	s.eVar10=s.prop22=s.getDaysSinceLastVisit('s_lv');
	s.eVar23=s.prop46=s.getQueryParam('query').toLowerCase();

	/* Get Percent Page Viewed */
	var ppvArray = s.getPercentPageViewed(s.pageName);
	s.prop60 = ppvArray[0] //contains the previous page name
	s.prop61 = ppvArray[1] //contains the total percent viewed

	/* Copy Variables from props and eVars */
	if (!s.eVar4 && s.pageName) s.eVar4 = "D=pageName";
	if (s.pageName) s.hier1=s.pageName;
	if (!s.eVar1 && s.prop1) s.eVar1 = "D=c1";
	if (!s.eVar2 && s.prop2) s.eVar2 = "D=c2";
	if (!s.eVar3 && s.prop3) s.eVar3 = "D=c3";
	if (!s.eVar48 && s.prop48) s.eVar48 = "D=c48";
	if (!s.eVar62 && s.prop62) s.eVar62 = "D=c62";
	if (!s.eVar63 && s.prop63) s.eVar63 = "D=c63";
	if (!s.eVar66 && s.prop66) s.eVar66 = "D=c66";
	if (!s.eVar58 && s.prop58) s.eVar58 = "D=c58";
	if (!s.eVar56 && s.prop56) s.eVar56 = "D=c56";
	if (!s.eVar55 && s.prop55) s.eVar55 = "D=c55";
	if (!s.eVar38 && s.prop38) s.eVar58 = "D=c38";
	if (!s.eVar64 && s.prop64) s.eVar56 = "D=c64";
	if (!s.eVar65 && s.prop65) s.eVar65 = "D=c65";
	if (!s.eVar46 && s.prop47) s.eVar46 = "D=c47";
	if (!s.eVar57 && s.prop57) s.eVar57 = "D=c57";
	
}
s.doPlugins=s_doPlugins;

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="comcastentertainmentgroup";
s.trackingServer="wa.eonline.com";
s.dc=112;

/************************** PLUGINS SECTION *************************/
/*
Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'new';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'new';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'repeat';}else retur"
+"n 'repeat';");
/*
 * Plugin: getTimeParting 2.0 
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getValOnce 1.0 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Plugin: Days since last Visit 1.1.H -JE-  ALTERED
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);var rval = 0;if(cval.length==0){"
+"s.c_w(c,ct,e);s.c_w(c+'_s',f1,es);}else{var d=ct-cval;rval = d/(100"
+"0*60*60*24);if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);s.c_w(c+'_s"
+"',f2,es);}else if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);s.c_w(c+'_s'"
+",f3,es);}else if(d<7*day+1 && d>day){s.c_w(c,ct,e);s.c_w(c+'_s',f4,"
+"es);}else if(d<day+1){s.c_w(c,ct,e);s.c_w(c+'_s',f5,es);}}else{s.c_"
+"w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,es);}}cval_s=s"
+".c_r(c+'_s');return Math.floor(rval);"
);
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/*
 * Plugin: getPercentPageViewed v1.5
 */
s.handlePPVevents=new Function("",""
+"var s=s_c_il["+s._in+"];if(!s.getPPVid)return;var dh=Math.max(Math."
+"max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma"
+"x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max("
+"s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i"
+"nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh"
+"t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s"
+".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh"
+"*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]"
+",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt"
+"(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars"
+"eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy"
+")?vh:cy)):'';s.c_w('s_ppv',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.24.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)"
+"&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)"
+"sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(s"
+"v)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk="
+"='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring("
+"0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv"
+"+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].tra"
+"ckEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.sub"
+"string(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';"
+"else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigra"
+"tionServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUp"
+"perCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='varia"
+"bleProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDep"
+"th')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connec"
+"tionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('"
+"c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else "
+"if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b="
+"='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=funct"
+"ion(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?"
+"t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=li"
+"f?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef'"
+",h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true"
+"');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||"
+"s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if"
+"(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.subs"
+"tring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toU"
+"pperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c"
+",n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),"
+"\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.s"
+"rc;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf('"
+",'+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&'"
+",'rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=functi"
+"on(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x i"
+"n s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q"
+"||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.leng"
+"th;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s"
+"=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'o"
+"nload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*="
+"100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,"
+"x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccoun"
+"tMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0"
+"?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substrin"
+"g(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in"
+"++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r"
+"._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._"
+"in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m."
+"_i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_"
+"l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if"
+"(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.lengt"
+"h;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+"
+"1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;"
+"b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.m"
+"axDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\""
+");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}r"
+"eturn o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};"
+"s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k]"
+"[x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)f"
+"or(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.d"
+"lt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250"
+";s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.ge"
+"tYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='"
+"',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&Str"
+"ing.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Funct"
+"ion('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'"
+"Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.doc"
+"umentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}cat"
+"ch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl"
+".length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight"
+"=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pag"
+"eURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,o"
+"c;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.ind"
+"exOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s."
+"linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o."
+"sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}"
+"else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s"
+".retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd"
+".s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.l"
+"ightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&"
+"&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s["
+"x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if"
+"(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLow"
+"erCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netsca"
+"pe6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netsc"
+"ape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s"
+".ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%"
+"C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,v"
+"isitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,"
+"retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+"vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s."
+"vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaE"
+"nabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCo"
+"okieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlin"
+"eStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg="
+"pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=functio"
+"n(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


    // indexes 0=url, 1=pagename 2=source 3=type
var sUrlToPageNameMappingArray = [
	'/index.jsp news null news',
	'/ news null news',
	'/site/site.jsp news null news',
    '/Insider/Boards/forum.jspa?forumID=57 girls-next-door:boards null board',
    '/on/shows/index.jsp shows null landing',
    '/on/index.jsp schedule null landing',
    '/on/ schedule null landing',
    '/on/personalities/bio/chelsea.jsp chelsea:personalities:bio null bio',
    '/on/personalities/index.jsp personalities null landing',
    '/uberblog/index.jsp news null news',
    '/account/home/index.jsp account:home null account',
    '/uberblog/ news null news',
    '/uberblog/fashion/index.html fashion:news null news',
    '/uberblog/fashion/ fashion:news null news',
	'/uberblog/the_soup/index.html the-soup null news',
	'/uberblog/the_soup/ the-soup null news',
    '/sweepstakes/ sweepstakes null landing',
    '/uberblog/fashion/ fashion null news',
	'/photos/index.jsp gallery:photos null page',
    '/movies/reviews/ movies:reviews null index',
	'/shows/chelsea/index.jsp chelsea null show',
	'/shows/chelsea/chelseaness/index.jsp chelsea:news null news',
	'/shows/chelsea/theshow/index.jsp chelsea:the-show null show',
	'/shows/chelsea/chuy/index.html chelsea:chuy:news null news',
	'/shows/chelsea/chuy/index.jsp chelsea:chuy:news null news',
	'/shows/chelsea/whoachuy/ chelsea:whoachuy null extras',
	'/uberblog/the_awful_truth/index.html the_awful_truth null news'
];

//property  initialization
//BEGINS HERE


(function($){
    //Widget Tracking
    var widgetArray = [];
    
    
    //functions and variables to see if a window.location.pathname should be checked for dynamic page naming rules
    function isPath( path ) {
        return ( $.type(path) === "regex" ) ? path.test(window.location.pathname) : window.location.pathname.indexOf(path) === 0;        
    }

    //Convert string to lowercase, remove punctuation, and replace spaces with "-"
    function cleanString(dirtyString) {
	    return dirtyString.toLowerCase().replace(/\s+/g,'-').replace(/[\/!@#$%^&*(),.?'"]+/g,'').replace("--","-").replace(/-ï¿½/g,"").replace(/btch/g,"bitch").replace(/amp\;/g,"and").replace(/ï¿½/g,"e");
    }

    function runScrollTracking(status){
	    var randomNum = Math.floor(Math.random()* 101);
	    if (randomNum <= 5 || status == 'true') {
	        s.events = ( ! s.events ) ? "event22" : s.events + ",event22";
		    
			if (typeof(sSetPercentSeen) !== 'undefined') {
				sSetPercentSeen( sGetScrollPercentage() ); //set page viewed by default when page first loads
			}
		    s.prop26 = "scroll:" + s.pageName; //traffic variable for pages to detect time btw scrolls
//		    s.products = ";;;;event22=" + sGetPercentSeen()  + "|event4=" +  sGetNumberOfProducts(); //initial value sent with page view
		    
		    $(window).bind("scroll", sScrollingEvent); 
	    }
    }

    //Big Picture module click tracking        
    function bigPicModule(){
            widgetArray.push('the-big-picture');
	        //Establish current titles
	        var moduleTitle = "big-picture";
            $('#module_bigpicture').each(function(el){
	                var imgTitle = cleanString($(this).find('.bigPicImgLink').first().attr('title').stripTags());
	                var captionTitle = cleanString($(this).find('.bigPicFullTitle').html().stripTags());
                    
                    $(this).find(".bigPicImgLink").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':image');
			                pageTracker._trackPageview($(e.target).attr("rel"));
		                });
                
                    $(this).find(".bigPicFullTitle").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':' + captionTitle);
			                pageTracker._trackPageview($(e.target).attr("rel"));        
                        });

                    $(this).find(".bigPicGrab").bind('click', function(e) {
			                sSetWidgetDistributeInfo('big-picture:grab-share','big-picture','widget','clearspring')
		                });
            	    
	                $(this).find(".bigPicMore").bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':more-photos');			
			                pageTracker._trackPageview($(e.target).attr("rel"));
		                });        
                });
        };

    //Fashion Police module click tracking
    function fashionPoliceModule(){
            widgetArray.push('the-fashion-police');
	        //Establish current titles
	        var moduleTitle = "fashion-police";

            $('#module_fashion_police').each(function(el){
	                var imgTitle = cleanString($(this).find('.img_link img').first().attr('title'));
	                var captionTitle = cleanString($(this).find('.gallerySpotTitle').first().text());    
            
	                $(this).find('.more_button').bind('click', function(e) {
			                var titleString = moduleTitle + ':' + imgTitle+ ':more-photos';
			                sTrackWidgetClick(titleString);
		                });

                    $(this).find('.img_link').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':image');            
                        });
        	        
	                $(this).find('.gallerySpotTitle').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':' + imgTitle+ ':' + captionTitle);
		                });    
                });
        };

    function topGalleryModule(){
            widgetArray.push('top-galleries');
	        var moduleTitle = "top-galleries";

            $('#module_topgalleries').each(function(el){
	                $(this).find('.more_button').bind('click', function(e) {
			                sTrackWidgetClick(moduleTitle + ':more-photos');
		                });

	                $(this).find('.topGalImg').bind('click', function(e) {
			                var imgTitle = cleanString($(e.target).attr("title"));
			                var titleString = moduleTitle + ':' + imgTitle+ ':image';
			                sTrackWidgetClick(titleString);
		                });

	                $(this).find('.gallery_title').bind('click', function(e) {
			                var imgTitle = cleanString($(e.target).attr("rel"));
			                var titleString = moduleTitle + ':' + imgTitle + ':text';
			                sTrackWidgetClick(titleString);
		                });    
                });
        }; 
                
    //end of dynamic page naming, the following is static mapping that overrides any dynamic rules or variables passed into nielsen.jsp
    
    //note that if the page is in the mapping array, all the pagename logic that was set above is overwrittens
    
    var match = (new RegExp("(" + window.location.pathname + " )(.*? )(.*? )(.*?(?=\]\]|$))")).exec(sUrlToPageNameMappingArray.join("]]"));
    if ( match ) {
        s.pageName = $.trim(match[2]); // page name
        s.prop7 = $.trim(match[3]); // page content source
        s.prop15 = $.trim(match[4]); // page type        
    }
                
	s.pageName = s.pageName + ( eol.uattr("author") ? ":by-author:" + eol.uattr("author").replace("+","-").replace(" ","-") : "" );	
	s.pageName = s.pageName + ( eol.uattr("start") ? ':' + eol.uattr("start") : "" );

        //s.prop16 = sGetTitlesByCssClass(sTrackingCssNameWidgets);
//    s.prop19 = sGetTitlesByCssClass(sTrackingCssNameVideos);
//    s.products = ";;;;event4=" +  sGetNumberOfProducts(); //initial value sent with page view

    //initialize %page viewed and set/check cookie
    if(eol.uattr("scroll") == "true" ){
	    eol.cookie('scrolltracking', 'true', 0);
    } else if(eol.uattr("scroll") == "false" ){
	    eol.cookie('scrolltracking', 'false', 0);
    }
    if (eol.cookie('scrolltracking').length === 0) {
	    eol.cookie('scrolltracking', 'false', 0);
	    runScrollTracking('false');
    } else {
	    if(eol.cookie('scrolltracking') == 'true'){
		    runScrollTracking('true');
	    }
    }

    //Initializing Home nav tracking depending on which host the site is being dispalyed on    
    $("#top_navigation_links").each(function() {
	        // For 5% of all visitors, enable widget tracking on the home nav 
	        // Set a session cookie containing so inclusion/exclusion persists across page views
    	
	        if ( eol.cookie('s_includeInMainNavTracking') === 0 ) {
		        var includeInRandomSample = (Math.random() <= 0.05 ) ? 'include': 'exclude';
		        eol.cookie('s_includeInMainNavTracking', includeInRandomSample, 0); // Set a session cookie
	        }
        	
	        if (eol.cookie('s_includeInMainNavTracking') === 'include'){
		        widgetArray.push('top-navigation');
		        homeNavTracking(); //Call home nav click function
	        }
        });
    

    //Main Nav click tracking
    function homeNavTracking(){
        $("#top_navigation_links a").each(function(anchor){                
                    var $this = $(this);
                    var subSection = "";                    
                    var hostVal = ( $this.attr("href").match(window.location.host)) ? 'e' : $this.attr("href").replace(/(^.*?\:\/\/.*?\.(?=.*?\..*?))|((\.\w{2,3}){1,2}\/.*?$)/,"");
                           
                    if ( ! $this.hasClass("tab") ) {
                        subSection = cleanString($this.parents(".tab").text());
                    }
			        sTrackWidgetClick('top-navigation:' + cleanString($this.parents(".tab").text()) + ( subSection ) ? ':' + subSection : "" ,'',hostVal);
            });                
    }

    function pagesUberblog( path, page ){
            // /(watch_with_kristin)|(hwood_party_girl)|(ask_the_answer_bitch)|(the_soup)|(movie_reviews)|(the_awful_truth)|(marc_malkin)|(lyons_den)/    
            var uberblog = path.replace(/.*?uberblog\//,"");
                        
            if ( uberblog.match(/\/poseoff\/index/) ) {
	            var query = location.search; 
	            //Extract value and year from value 1 to flip it to the other side of the show and strip the underscores
	            var value1 = query.split("=")[1];
	            value1 = value1.split("&")[0];
	            var year = value1.split("_")[0];
	            value1 = value1.replace(year + "_","").replace("golden_","").replace("_awards","").replace("sag","sags");
	            value1 = value1 + year;

	            var value2 = query.split("=")[2];
        	    
	            page.prop1 = "red_carpet";
	            page.prop2 = value1;
	            page.prop3 = "extras";

	            //Set full string
	            page.pageName = [page.prop1, page.prop2, page.prop3,"poseoff",value2];            
            } else if ( uberblog.match("/redcarpet/video/")){
                page.prop15 = "video";
            } else if ( uberblog.match("/redcarpet/games/")){
                page.prop15 = "extras";
            } else if ( uberblog.match(/\/celebs\/[\w\d]/i)){ //Celebs
	            var value = location.split("/uberblog/celebs/")[1];
	            
	            var pageId = value.split('_')[0];
	            var celebId = value.split(pageId)[1].replace("_","").replace(".html","").toLowerCase();
        	   
	            page.pageName = ["celebs", pageId, celebId];
            } else if ( uberblog.match(/\/index.[0-9].html\?categories\=/i)){ //Category Paging
	            var topicRaw = location.split("/uberblog/")[1];
	            var topic = topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	            var category = location.split("?categories=")[1];
	            var pageNum	= parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1;
    	        
    	        page.pageName = [topic, category, "news", pageNum];
    	        
	            if ( uberblog.match(/oscar|sag|grammys|emmys|golden/i)) { //If we find a red carpet package add redcarpet
		            topicDate = topic.split("_")[0];
		            topicName = topic.split("_")[1];
		            topicCombined = topicName + topicDate.replace("-","");
		            page.pageName = ["red_carpet", topicCombined, "news", pageNum];
	            }
            } else if ( uberblog.match(/^\/uberblog\/.*?\/index/i)){ //Franchise Paging
	            var topicRaw = location.split("/uberblog/")[1];
	            var topic = topicRaw.split("/")[0].replace("golden_","").replace("_awards","");
	            var franchise = eol.uattr("franchise") || "";
	            var pageNum	= parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || "";

	            //If we find a red carpet package add redcarpet
	            page.pageName = [ franchise, topic, "news"];
	            if ( uberblog.match(/oscar|sag|grammys|emmys|golden/i) ) {
		            topicDate = topic.split("_")[0];
		            topicName = topic.split("_")[1];
		            topicCombined = topicName + topicDate.replace("-","");
		            page.pageName = ["red_carpet", topicCombined, "news"];
	            }
	            if ( pageNum ) { 
	                page.pageName.push(pageNum);
	            }   
            } else if( uberblog.match(/bio\.jsp/)){
                p.prop15 = "bio";
	            p.pageName = [eol.uattr("category"),"bio"];
            }
    
    }

    function pagesChelsea( path, page ){
            var chelsea = path.replace(/.*?chelsea\//,"");
            
            if (chelsea.match("/chelseaness/b")) { //Custom Chelsea Values placed here to prevent override	
	            var value = location.split("/chelseaness/")[1].replace('.html','');
	            page.prop15 = "news";
	            page.pageName = ["chelsea","news","detail",value];
            } else if ( chelsea.match(/\/chuy\/b/)) {	    
	            var value = location.split("/chuy/")[1].replace('.html','');
	            page.prop15 = "news";
	            page.pageName = ["chelsea", "chuy", "news", "detail", value];
            }  else if ( chelsea.match(/\/chelseaness\/chelsea\/index\.\d\.html/i)) {
	            page.prop15 = "news";
	            page.pageName = ["chelsea", "news", parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1];
            }  else if ( chelsea.match(/\/chuy\/chelsea\/index\.\d+.html/i)) {
	            page.prop15 = "news";
	            page.pageName = ["chelsea","chuy","news",parseInt( location.replace(/^.*?index\.|\.html.*?$/g,""),10) || 1];
            }  else if ( chelsea.match(/\/chelseaness\/index.jsp\?cid=bio/i) ) {
	            page.prop15 = "bio";
	            page.pageName = ["chelsea","bio"];
            } else if ( chelsea.match(/\/chuy\/index\.jsp\?cid=bio/i)) {
	            page.prop15 = "bio";
	            page.pageName = ['chelsea','chuy','bio'];
            }  else if ( chelsea.match(/\/bigfatbaby\/thankyou.jsp/i)) {
	            page.pageName = ["chelsea","the-show","big-fat-baby","thankyou"];
	            page.prop15 = "show";
	        } else if ( chelsea.match(/\/index\.jsp\?cid=book/i) ) {
	            page.pageName = ['chelsea','book'];
                page.prop15 = "show";
            } else if ( chelsea.match(/\/index\.jsp\?cid=tour/i) ) {
	            page.prop15 = "show";
	            page.pageName = ['chelsea','tour'];
            } else if ( chelsea.match(/\/vids\/index\.jsp/i)) {
	            page.prop15 = "video";
            }     
    }

    function pageDetails() {
        var p = {};
        var page = window.location.href.replace(/http.*?\//,"");
        
        if ( page.match(/^\/error\//) ){
            p.prop15 = p.pageType = "errorPage";
        } else if ( page.match(/^\/videos\//) ) {
            p.prop15 = "video";
            p.pageName = p.prop1 = "videos";
            p.prop7 = eol.uattr("franchise");

	        if ( p.pageName || page.match(/^\/on\//) ) {
                //we always override the nielsen.jsp values from "/on/" since there were legacy values there that we haven't been able to clear out yet 
	            //some special cases about what the page type will be        
	            if ( page.match(/\/sponsor\//) ) {
		            p.prop15 = "landing";
	            } else if ( page.match(/\/uberblog\//)) {
		            p.prop15 = "news";
	            } else {
		            p.prop15 = "page";
	            }

	            var strPageName = window.location.pathname.replace(/\/$/,"");
	            //all the custom string replacment rules go heres
	            strPageName = strPageName.replace("/index.jsp", "").replace("/redcarpet/", "/red-carpet/").replace("/includes/", "").replace("/index.html", "").replace("/on/shows/", "").replace("/on/", "").replace("/e/","").replace("/uberblog/index", "/news/index").replace("/uberblog/", "/").replace("/celebrities/", "/celebs/").replace(".jsp", "").replace(".html", "").replace(/\//g, ":").replace("_", "-").replace("index.", "index:").replace("@","at").replace(/^:/,"");
                
	            if( eol.uattr("cid") ) {
	                p.pageName.push(eol.uattr("cid"));
	            }
	        } else {
	            p.pageName = p.pageName.replace(".html", "");
            }
        } else if ( page.match(/^(\/on\/shows\/|^\/e\/enews\/)/) ) { 
            p = ( page.indexOf("chelsea") >= 0 ) ? pagesChelsea( page, p ) : { prop15 : "show" };
        } else if ( page.match(/^\/photos\/index.jsp\?category/i) ) { /* Photo Gallery Filtering Naming */
            p.pageName = ["gallery", "photos", $("#category_header h3").first().text()];
	        p.prop15 = "page";
	    } else if ( page.match(/^\/uberblog/) ) {
            p = pagesUberblog( page, p );
        }
        p.pageName = ( $.isArray(p.pageName) ) ? p.pageName.join(":") : p.pageName; 

        return p;
   }
   
    //INIT
    (function(){
        $('#front_door_spots_cont').each(function() {
            widgetArray.push('frontdoor-brick');
        });
        topGalleryModule();
        fashionPoliceModule();
        bigPicModule();
                
        $.extend(s, pageDetails() );
        s.prop16 = widgetArray.join("");   
        if ( s.prop7 ) { //stick page content source name in front of the page name if it's not already there
            if (s.pageName.length < s.prop7.length || s.pageName.substring(0,s.prop7.length) != s.prop7) {
	            s.pageName = s.prop7 + ":" + s.pageName
            }
        }
    })();   
   
})(jQuery);

//Property and page initialization
//ENDS HERE