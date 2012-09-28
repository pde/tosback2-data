<!--  
if (typeof TSC=="undefined"){var TSC={reporting:{},util:{},ads:{},logger:{}};}	
if(typeof TSC!="undefined"){if(typeof TSC.reporting=="undefined"){TSC.reporting={};}}
TSC.util={

    /**
    * TODO: update with TSCM.util.getparam
    */
	getPuc: function(){
		var puc = "";
		try {
			var path = window.location.pathname;

			var index = path.indexOf("/_")+1;
			if(index > -1) {
				puc = path.substring(index, path.indexOf("/", index));
			}
			var qRef=TSC.util.getQueryString("ref");
			if (TSC.util.isDefined(qRef)){
				puc="_" + qRef;
			}			
			var qPuc=TSC.util.getQueryString("puc");
			if (TSC.util.isDefined(qPuc)){
				puc=qPuc;
			}
		}catch(e){}
		try {
			var reg = /_/g;newstr = '';
	        puc= puc.replace(reg,newstr);
		}catch(e){}
		return puc;
		 }
	,

   	isValidPuc: function(checkPuc){
	  if (TSC.util.isDefined(checkPuc)){
				if (checkPuc.indexOf("txt")!=-1 || checkPuc.indexOf("html")!=-1 || checkPuc.indexOf("text")!=-1 || checkPuc.indexOf("tscrmb")!=-1){
				 return false;
				} 
				else 
					return true;
		}		 
		else {
		  return true;
		}	 
		}
	,

    /**
    * TODO: see if this can be consolidated with YAHOO.cookie or TSCM cookie
    */
	getCookie: function(c_name){
				 if (document.cookie.length>0)
				   {
					   var c_start=document.cookie.indexOf(c_name + "=");
						   if (c_start!=-1)
							     {
									     c_start=c_start + c_name.length+1;
									     var c_end=document.cookie.indexOf(";",c_start);
									     if (c_end==-1) { c_end=document.cookie.length;}
										     return unescape(document.cookie.substring(c_start,c_end));
						       }
			    }
				  return "";
	 }
	,

    /**
    * TODO: consolidate with TSCM.util.getParam
    */
	getQueryString: function (variable) {
 								try {
									var query = window.location.search.substring(1);
									var vars = query.split("&");
									for (var i=0;i<vars.length;i++) {
									    var pair = vars[i].split("=");
											  if (pair[0].toLowerCase() == variable.toLowerCase()) {
												      return pair[1];
											    }
								 } 
								  return "";
								 }catch(e){ return "";}
        },
    
    /**
    * TODO: point to TSCM.util.isDefined or YAHOO.lang.isUndefined
    */
	isDefined: function(v){if(typeof v==='undefined'||v===null||v===''||v==='undefined'){return false;}else{return true};},		 

    /**
    * TODO: see if YAHOO.lang has this (it has trim)
    */
	cleanString: function(thestring)
							 {		
					  if (TSC.util.isDefined(thestring)){
							var	reg = /"/g;newstr = '\\"';
							return thestring.replace(reg,newstr);
					}else return "";		
							 }
};
	
	
TSC.reporting.propMap={
	pageName:"pageName",
	pageURL:"pageURL",
	referrer:"referrer",
	linkTrackVars:"linkTrackVars",
	linkTrackEvents:"linkTrackEvents",
	channel:"channel",
	server:"server",
	pageType:"pageType",
	lnk:"lnk",
	linkName:"linkName",
	linkType:"linkType",
	trackDownloadLinks:"trackDownloadLinks",
	trackExternalLinks:"trackExternalLinks",
	trackInlineStats:"trackInlineStats",
	linkDownloadFileTypes:"linkDownloadFileTypes",
	linkInternalFilters:"linkInternalFilters",
	linkLeaveQueryString:"linkLeaveQueryString",
	linkTrackVars:"linkTrackVars",
	linkTrackEvents:"linkTrackEvents",
	//topArticles:"prop1",
	sectionFront:"prop2",
	emailedStory:"prop3",
  	contentType:"prop4",
	pubDate:"prop5",
	//contentCat:"prop6",
	searchTerm:"prop7",
	searchResults:"prop8",
	xxx:"prop9",  //set auto- day of week
	xxx:"prop10",  //set auto-hour of day
	xxx:"prop11",   //set auto- weekend/weekday
	articleId:"prop12",
	articleName:"prop13",
	authorName:"prop14",
	pagination:"prop15",
	videoViews:"prop16",
	audioDownloads:"prop17",
	flashTracking:"prop18",
	topBlogs:"prop19",
	printedPages:"prop20",
	xxx:"prop21", //set auto- days since last visit
	visitorSegmentation:"prop22",
	visitorSegmentationPath:"prop23",
	authorId:"prop24",
	puc:"prop25",
	pi:"prop26",
	xxx:"prop27", //set auto
	tickers:"prop28",
	keywords:"prop29",
	debug:"prop30",
	subsection:"prop31", //re-purposed this from subMenu
	searchType:"prop32",
	rollUp:"prop33",
	stories:"prop34",
	videoChannel:"prop35",
	xxxx:"prop36",//affiliate id set auto
	adzone:"prop37",
	storyType:"prop38",
	advancedSearch:"prop39",
	searchPagination:"prop40",
    pageOfTotal:"prop41",
    intCmp:"prop42",
    contextualLinks:"prop43", //set auto cm_ven_int
    xxx:"prop44",     //set auto from ?cm_ven
    campaign:"campaign",
	hier1:"hier1",
	hier2:"hier2",
	state:"state",
	zip:"zip",
	events:"events",
	products:"products",
	purchaseID:"purchaseID",
	comOID:"eVar1",
	xxx:"eVar2", //set auto
  	xxx:"eVar3", //set auto
	contentCat:"eVar4", //set auto
  	xxx:"eVar5", //set auto-search term
	xxx:"eVar6", //set auto
	trialOrderId:"eVar7",
  	userStatus:"eVar8",
	userSuperStatus:"eVar9",
	flowType:"eVar10",
	flowId:"eVar11",
  	xxx:"eVar12", //set auto grouppart val
	purchaseOrderId:"eVar13",
	comPuc:"eVar14",
	storyIntCmp:"eVar15",
	offerCode:"eVar16",
	promo:"eVar17",
	orderType:"eVar18",
	marketingType:"eVar19",
	globalStatus:"eVar20",
	upgradeOrderId:"eVar21",
	orderUnit:"eVar22",
	xxx:"eVar23", //internal tracking code
	creativeId:"eVar24",
	investorDetails:"eVar25",
	newsletters:"eVar26",
    xxx:"eVar27", //set auto psv
    xxx:"eVar28", //set auto cm_ven
	xxx:"eVar29", //empty
    xxx:"eVar30", //set auto content type
    xxx:"eVar31" //set auto cm_ven_int

};
TSC.reporting.setAccount=function(account){
	try{
		if(TSC.util.isDefined(account)){s.un=account;}
	}catch(e){}
};
TSC.reporting.sendLinkEvent=function(lnkName){
var s=s_gi(s_account);
s.linkTrackVars='None';
s.linkTrackEvents='None';
s.tl(this,'o',lnkName);
};
TSC.reporting.sendDebug=function(lnkName){
//var s=s_gi("streetrd");
//s.linkTrackVars='None';
//s.linkTrackEvents='None';
//s.tl(this,'o',lnkName);
};
TSC.reporting.config=function(o){
 try{
			for (var i in o)
			{
			eval("s." + TSC.reporting.propMap[i] + "=\"" + TSC.util.cleanString(o[i]) + "\";");
			}
      if (!TSC.util.isDefined(s.eVar4)){
				s.eVar4=s.hier1;
		}
		s.eVar2=s.pageName;
		s.eVar5=s.prop7;
		if (!TSC.util.isDefined(s.prop25)){
			s.prop25=TSC.util.getPuc();
		}
        //s.eVar23=TSC.util.getCookiePuc();
        s.prop42=s.eVar23;
        
		var firstPipe=s.hier1.indexOf("|");
		if (firstPipe==-1){
	 		 firstPipe=s.hier1.length;
		 }
		var theChannel=s.hier1.substring(0,firstPipe);
		s.channel=theChannel;
		s.eVar3=s.channel;
		s.server="TheStreet.com";
		//s.hier2="TheStreet.com|" + s.hier1;
		s.prop36=TSC.util.getQueryString("affiliate");
        s.eVar30=s.prop4;
    }catch(e){TSC.reporting.sendDebug("TSC.reporting.config error-" + e.message);}
};
TSC.reporting.makeCall=function(){
   try{
    var s_code=s.t();if(s_code)document.write(s_code);
   }catch(e){TSC.reporting.sendDebug("TSC.reporting.makeCall error-"+ e.message);}
};
/* SiteCatalyst code version: H.8.
Copyright 1997-2006 Omniture, Inc. More info available at
http://www.omniture.com */
/* Specify the Report Suite ID(s) to track here */

var s_account="streetprod,streetglobal";
if (window.location.hostname!=null)
{
 if (window.location.hostname.indexOf("tsctest.thestreet.com") !=-1)
 {
 	s_account="streetredesignqa";
 }
 if (window.location.hostname.indexOf("tscstage.thestreet.com")!=-1 || window.location.hostname.indexOf("stools.thestreet.com")!=-1 || window.location.hostname.indexOf("dfind01")!=-1 || window.location.hostname.indexOf("cms01")!=-1 || window.location.hostname.indexOf("commercestage")!=-1 || window.location.hostname.indexOf("appsstage")!=-1){
   s_account="streetstage"; //change this later to streetstage
 }	 
 if (window.location.hostname.indexOf("devweb")!=-1 || window.location.hostname.indexOf("commercedev")!=-1){
   s_account="streetdevelopment";
 }	 
}
var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,devweb.thestreet.com,cms01.thestreet.com,thestreet.com,commercedev.,commercestage.,stockpickr.com"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* WARNING: Changing the visitor namespace will cause drastic changes
to how your visitor data is collected.  Changes should only be made
when instructed to do so by your account manager.*/
s.visitorNamespace="thestreet"
s.vmk="45F99B4B"

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
/* Set campaign if cid is found */
s.campaign=s.getQueryParam('cm_ven,cm_cat,cm_pla,cm_ite',':');
s.eVar27=s.getQueryParam('psv');
s.eVar28=s.getQueryParam('cm_ven');
s.eVar31=s.getQueryParam('cm_ven_int');
s.eVar12=s.getQueryParam('grouppart');
s.prop44=s.getQueryParam('cm_ven');

/* getValOnce used to deflate campaign click-throughs */
s.campaign=s.getValOnce(s.campaign,"st_ctc",0);
s.eVar27=s.getValOnce(s.eVar27,"s_var_27",0);
s.eVar28=s.getValOnce(s.eVar28,"s_var_28",0);
s.eVar31=s.getValOnce(s.eVar31,"s_var_31",0);

/* Set event 1 (page view) on every page  */
if(s.events){
   if (s.events.indexOf("event1")==-1){
	    s.events=s.events + ',event1';
	 }
}
else{s.events='event1';}

/* Set event for unique searches if prop7 is found */
var temp=s.getValOnce(s.prop7,'fi_ust',0);
if(temp){s.events=s.appendList(s.events,'event2',',','1')}
}
s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.0 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:''+s.wd.loc"
+"ation);u=u=='f'?''+s.gtfs().location:u;while(p){i=p.indexOf(',');i="
+"i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u);if(t)v+=v?d+t:t;p=p.su"
+"bstring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin Utility: appendList v1.0
 */
s.appendList=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i in a){"
+"n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!"
+"m)L=L?L+d+v:v;return L");

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");



/* WARNING: Changing the visitor namespace will cause drastic changes
to how your visitor data is collected.  Changes should only be made
when instructed to do so by your account manager.*/
s.visitorNamespace="thestreet"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID;function s_c2fe(f){var x='',s=0,e,a,b,c;while(1){e=
f.indexOf('"',s);b=f.indexOf('\\',s);c=f.indexOf("\n",s);if(e<0||(b>=
0&&b<e))e=b;if(e<0||(c>=0&&c<e))e=c;if(e>=0){x+=(e>s?f.substring(s,e):
'')+(e==c?'\\n':'\\'+f.substring(e,e+1));s=e+1}else return x
+f.substring(s)}return f}function s_c2fa(f){var s=f.indexOf('(')+1,e=
f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')
a+='","';else if(("\n\r\t ").indexOf(c)<0)a+=c;s++}return a?'"'+a+'"':
a}function s_c2f(cc){cc=''+cc;var fc='var f=new Function(',s=
cc.indexOf(';',cc.indexOf('{')),e=cc.lastIndexOf('}'),o,a,d,q,c,f,h,x
fc+=s_c2fa(cc)+',"var s=new Object;';c=cc.substring(s+1,e);s=
c.indexOf('function');while(s>=0){d=1;q='';x=0;f=c.substring(s);a=
s_c2fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(
q){if(h==q&&!x)q='';if(h=='\\')x=x?0:1;else x=0}else{if(h=='"'||h=="'"
)q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)
+'new Function('+(a?a+',':'')+'"'+s_c2fe(c.substring(o+1,e))+'")'
+c.substring(e+1);s=c.indexOf('function')}fc+=s_c2fe(c)+';return s");'
eval(fc);return f}function s_gi(un,pg,ss){var c="function s_c(un,pg,s"
+"s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+"wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+"d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+"ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+"eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+"ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+"(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+"))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o),l="
+"n.length>0?n.length:1;while(x&&i>=0){x=x.substring(0,i)+n+x.substri"
+"ng(i+o.length);i=x.indexOf(o,i+l)}return x};s.ape=function(x){var s"
+"=this,i;x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&s.charSet&&s.em=="
+"1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>="
+"0){i++;if(('89ABCDEFabcdef').indexOf(x.substring(i,i+1))>=0)return "
+"x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}return x}"
+";s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')"
+"):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.ind"
+"exOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s.m(f)?s[f](t,a):f(t,"
+"a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.leng"
+"th?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0"
+")a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);retu"
+"rn (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf"
+"',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s"
+"=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.c_d='';s.c_gdf=f"
+"unction(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=func"
+"tion(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriod"
+"s,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n"
+"=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastInd"
+"exOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d"
+"}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s"
+".d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':"
+"s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v"
+":''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime"
+",t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'"
+"){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTim"
+"e()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B"
+"]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'"
+"')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=functi"
+"on(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.eh"
+"l=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i]"
+".e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;"
+"if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0"
+"};s.cet=function(f,a,t,o,b){var s=this,r;if(s.apv>=5&&(!s.isopera||"
+"s.apv>=7))eval('try{r=s.m(f)?s[f](a):f(a)}catch(e){r=s.m(t)?s[t](e)"
+":t(e)}');else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s.m(b)?s[b](a)"
+":b(a);else{s.eh(s.wd,'onerror',0,o);r=s.m(f)?s[f](a):f(a);s.eh(s.wd"
+",'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.t"
+"fs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'];s.eh(window,"
+"\"onerror\",1);s.etfs=1;var c=s.t();if(c)s.d.write(c);s.etfs=0;retu"
+"rn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){v"
+"ar s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.lo"
+"cation.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s."
+"gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s"
+".cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.ca=f"
+"unction(){var s=this,imn='s_i_'+s.fun;if(s.d.images&&s.apv>=3&&(!s."
+"isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){s.ios=1;if(!s.d.images[i"
+"mn]&&(!s.isns||(s.apv<4||s.apv>=5))){s.d.write('<im'+'g name=\"'+im"
+"n+'\" height=1 width=1 border=0 alt=\"\">');if(!s.d.images[imn])s.i"
+"os=0}}};s.mr=function(sess,q,ta){var s=this,ns=s.visitorNamespace,u"
+"nc=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'+(s.ssl?'s"
+"':'')+'://'+(s.ssl?'www32':'www33')+'.thestreet.com/b/ss/'+s.un+'/1"
+"/H.8-pdvu-2/'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if"
+"(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,20"
+"47)}if(s.ios||s.ss){if (!s.ss)s.ca();im=s.wd[imn]?s.wd[imn]:s.d.ima"
+"ges[imn];if(!im)im=s.wd[imn]=new Image;im.src=rs;if(rs.indexOf('&pe"
+"=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name)))"
+"{b=e=new Date;while(e.getTime()-b.getTime()<500)e=new Date}return '"
+"'}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt="
+"\"\">'};s.gg=function(v){var s=this;return s.wd['s_'+v]};s.glf=func"
+"tion(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s"
+".gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;s.pt(v,',','glf',0)"
+"};s.gv=function(v){var s=this;return s['vpm_'+v]?s['vpv_'+v]:(s[v]?"
+"s[v]:'')};s.havf=function(t,a){var s=this,b=t.substring(0,4),x=t.su"
+"bstring(4),n=parseInt(x),k='g_'+t,m='vpm_'+t,q=t,v=s.linkTrackVars,"
+"e=s.linkTrackEvents;s[k]=s.gv(t);if(s.lnk||s.eo){v=v?v+','+s.vl_l:'"
+"';if(v&&!s.pt(v,',','isf',t))s[k]='';if(t=='events'&&e)s[k]=s.fs(s["
+"k],e)}s[m]=0;if(t=='pageURL')q='g';else if(t=='referrer')q='r';else"
+" if(t=='vmk')q='vmt';else if(t=='charSet'){q='ce';if(s[k]&&s.em==2)"
+"s[k]='UTF-8'}else if(t=='visitorNamespace')q='ns';else if(t=='cooki"
+"eDomainPeriods')q='cdp';else if(t=='cookieLifetime')q='cl';else if("
+"t=='variableProvider')q='vvp';else if(t=='currencyCode')q='cc';else"
+" if(t=='channel')q='ch';else if(t=='campaign')q='v0';else if(s.num("
+"x)) {if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='hie"
+"r'){q='h'+n;s[k]=s.fl(s[k],255)}}if(s[k]&&t!='linkName'&&t!='linkTy"
+"pe')s.qav+='&'+q+'='+s.ape(s[k]);return ''};s.hav=function(){var s="
+"this;s.qav='';s.pt(s.vl_t,',','havf',0);return s.qav};s.lnf=functio"
+"n(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var te=t.index"
+"Of('=');if(t&&te>0&&h.indexOf(t.substring(te+1))>=0)return t.substr"
+"ing(0,te);return ''};s.ln=function(h){var s=this,n=s.linkNames;if(n"
+")return s.pt(n,',','lnf',h);return ''};s.ltdf=function(t,h){t=t?t.t"
+"oLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>="
+"0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'"
+"+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h"
+"=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt"
+"=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExter"
+"nalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.host"
+"name;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','"
+"ltdf',h))return 'd';if(s.trackExternalLinks&&(lef||lif)&&(!lef||s.p"
+"t(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';re"
+"turn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this"
+",\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e)"
+";return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f;if("
+"s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcEleme"
+"nt:e.target;eval(\"try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||"
+"s.eo.parentNode))s.t()}catch(f){}\");s.eo=0');s.ot=function(o){var "
+"a=o.type,b=o.tagName;return (a&&a.toUpperCase?a:b&&b.toUpperCase?b:"
+"o.href?'A':'').toUpperCase()};s.oid=function(o){var s=this,t=s.ot(o"
+"),p=o.protocol,c=o.onclick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'"
+"||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=o"
+".href;else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\""
+",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBM"
+"IT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid"
+"=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s"
+"=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&"
+"&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1)):''};s.rq=function"
+"(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)retur"
+"n s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t"
+",a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s."
+"sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sq"
+"s=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){"
+"var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Obj"
+"ect;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for"
+"(x in s.squ)s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s."
+"sqq)if(x&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x"
+");c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s"
+"._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for"
+"(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onc"
+"lick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&"
+"oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds"
+"=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+"f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&"
+"&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else"
+" s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visi"
+"torSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n"
+"=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));"
+"if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)retu"
+"rn 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)retu"
+"rn 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):"
+"-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.p"
+"t(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,"
+"x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccou"
+"ntMatch,n,i;s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;"
+"if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt"
+"(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s."
+"un.substring(0,i)};s.t=function(){var s=this,trk=1,tm=new Date,sed="
+"Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTi"
+"me(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,yr=tm.getYea"
+"r(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(yr<1900?yr+1900:yr)+' '+"
+"tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay"
+"()+' '+tm.getTimezoneOffset(),tfs=s.gtfs(),ta='',q='',qs='';s.uns()"
+";if(!s.q){var tl=tfs.location,x='',c='',v='',p='',bw='',bh='',j='1."
+"0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(s.apv>=4"
+")x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3"
+"){j='1.1';v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){j='1.2';c=screen"
+".pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight;if(s.apv>=4.06)j"
+"='1.3'}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEna"
+"bled()?'Y':'N';j='1.2';c=screen.colorDepth;if(s.apv>=5){bw=s.d.docu"
+"mentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;j='1.3'"
+";if(!s.ismac&&s.b){s.b.addBehavior('#default#homePage');hp=s.b.isHo"
+"mePage(tl)?\"Y\":\"N\";s.b.addBehavior('#default#clientCaps');ct=s."
+"b.connectionType}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){p"
+"s=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.q=(x?"
+"'&s='+s.ape(x):'')+(c?'&c='+s.ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:"
+"'')+(k?'&k='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s"
+".ape(ct):'')+(hp?'&hp='+hp:'')+(p?'&p='+s.ape(p):'')}if(s.usePlugin"
+"s)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s."
+"pageURL)s.pageURL=s.fl(l?l:'',255);if(!s.referrer)s.referrer=s.fl(r"
+"?r:'',255);if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';va"
+"r p=s.gv('pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;i"
+"f(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parent"
+"Element:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oid"
+"t}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.ind"
+"exOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}ta=n?o.targe"
+"t:1;h=o.href?o.href:'';i=h.indexOf('?');h=s.linkLeaveQueryString||i"
+"<0?h:h.substring(0,i);l=s.linkName?s.linkName:s.ln(h);t=s.linkType?"
+"s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'"
+"||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l"
+"):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.gv('pageURL');w="
+"0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID')"
+";x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')"
+"+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&"
+"oi='+i:'')}}if(!trk&&!qs)return '';if(s.p_r)s.p_r();var code='';if("
+"trk&&s.vs(sed))code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs"
+"?qs:s.rq(s.un)),ta);s.sq(trk?'':qs);s.lnk=s.eo=s.linkName=s.linkTyp"
+"e=s.wd.s_objectID=s.ppu='';return code};s.tl=function(o,t,n){var s="
+"this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t()};s.ssl=(s.wd.loc"
+"ation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b="
+"s.d.body;s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscap"
+"e6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o="
+"s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s"
+".isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape')"
+";s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s."
+"apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v"
+".substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s."
+"apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s."
+"em=0;if(String.fromCharCode){i=escape(String.fromCharCode(256)).toU"
+"pperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.un=un;s.uns();s"
+".vl_l='vmk,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieL"
+"ifetime,pageName,pageURL,referrer,currencyCode,purchaseID';s.vl_t=s"
+".vl_l+',variableProvider,channel,server,pageType,campaign,state,zip"
+",events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+=',"
+"prop'+n+',eVar'+n+',hier'+n;s.vl_g=s.vl_t+',trackDownloadLinks,trac"
+"kExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFi"
+"leTypes,linkExternalFilters,linkInternalFilters,linkNames';if(pg)s."
+"gl(s.vl_g);s.ss=ss;if(!ss){s.wds();s.ca()}}",
l=window.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf(
'MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(l)for(i=0;i<l.length;i++){
s=l[i];s.uns();if(s.un==un)return s;else if(s.pt(s.un,',','isf',un)){
s=s.co(s);s.un=un;s.uns();return s}}if(e>0){a=parseInt(i=v.substring(e
+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10)
);else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf(
'Opera')<0){eval(c);return new s_c(un,pg,ss)}else s=s_c2f(c);return s(
un,pg,ss)}


	var repObj = new Object();
	var override=false;
	//this is a default page name for anything without a metadata config
	repObj.pageName=window.location.pathname;
	repObj.hier1="tsc|misc";
	repObj.adzone="tsc/thestreet.com";
    repObj.contentType="Misc";

    try {
	if(typeof TSCM.metadata != "undefined"){
		if (typeof TSCM.metadata.Ads != "undefined") {
			repObj.adzone=TSCM.metadata.Ads.site;
			repObj.contextualLinks=TSCM.metadata.Ads.contextualLinks;
		}
		var page = TSCM.metadata.Page;
		var cat="";
		var h1="";
        if (typeof page == "undefined") {
			//	throw "this page does not appear to be omniture tagged. ";
		}
		else {
			//page.pageName += " " + page.contentType;
			override=TSC.util.isDefined(page.override)&&page.override=="true"?true:false;
   	 		cat = page.contentCat.join("|");
			h1 = page.contentCat.join("|");
			h1=h1.toLowerCase();
			if (page.contentType != "Subsection") {
				h1+="|" + page.pageName;
			}
			repObj.pageName = TSC.util.isDefined(page.pageName) ? page.pageName : "";
			repObj.contentType = TSC.util.isDefined(page.contentType) ? page.contentType : "Misc";
			repObj.pageType = TSC.util.isDefined(page.pageType) ? page.pageType : "";
			repObj.channel = TSC.util.isDefined(page.channel) ? page.channel : "";
            repObj.products = TSC.util.isDefined(page.products) ? page.products : "";
            repObj.events = TSC.util.isDefined(page.events) ? page.events : "";
            repObj.sectionFront = TSC.util.isDefined(page.sectionFront) ? page.sectionFront : "";
			repObj.searchPagination = TSC.util.isDefined(page.searchPagination) ? page.searchPagination : "";
			repObj.subsection = TSC.util.isDefined(page.subsection) ? page.subsection : "";
			//repObj.searchResults = TSC.util.isDefined(page.searchResults) ? page.searchResults : "";
			repObj.searchTerm = TSC.util.isDefined(page.searchTerm) ? page.searchTerm.toLowerCase() : "";
			repObj.advancedSearch = TSC.util.isDefined(page.advancedSearch) ? page.advancedSearch.toLowerCase() : "";
			repObj.searchType = TSC.util.isDefined(page.searchType) ? page.searchType: "";
			if (TSC.util.isDefined(page.searchType)) {
				repObj.searchType += TSC.util.isDefined(page.omOrig) ? " " + page.omOrig : " unknown";
			}
			if (!TSC.util.isDefined(repObj.searchTerm)){
				repObj.searchType="";
				repObj.searchResults="";
			}

			var cookies = document.cookie;
    		var index = cookies.indexOf("pageRefresh=true");
    		var refresh = "";
    		var isRefresh="false";
    		if (index > -1) {
            refresh = " - REFRESH";
        	repObj.pageName+= refresh;
			repObj.searchType= TSC.util.isDefined(page.searchType) ? page.searchType  + " refresh" : "";
        	document.cookie = "pageRefresh=false;expires=" + new Date(0).toGMTString();
    		}
		}
		//if story is defined
		if (TSC.util.isDefined(TSCM.metadata.Story)){
			var story = TSCM.metadata.Story;
			if (!TSC.util.isDefined(story.ignoreStory) || story.ignoreStory=="false") {
				if (TSC.util.isDefined(story.emailStory) && story.emailStory == "true") {
					repObj.emailedStory = story.headline;
				}

				else
				{
					repObj.pageName = TSC.util.isDefined(story.site) ? story.site : "";
					//repObj.pageName += TSC.util.isDefined(story.type.name) ? ":" + story.type.name : "";
					repObj.pageName += TSC.util.isDefined(story.headline) ? ":" + story.headline : "";
					repObj.pubDate = TSC.util.isDefined(story.pubDate) ? story.pubDate : "";
					h1 +=repObj.pageName;
					//reportingObj["searchTerm"]=TSC.util.getQueryString("qt");
					//reportingObj["searchResults"]=TSC.util.isDefined(pRepObj.searchResults)?pRepObj.searchResults:"";
					repObj.storyType = TSC.util.isDefined(story.type.dirname) ?  story.type.dirname : "";
					repObj.articleId = TSC.util.isDefined(story.storyid) ? story.storyid : "";
					//repObj.topArticles = TSC.util.isDefined(story.headline) ? story.headline : "";
					repObj.authorName = TSC.util.isDefined(story.authors[0]) ? story.authors[0] : "";
					repObj.pagination = TSC.util.isDefined(story.pagination) && !isNaN(story.pagination) ? story.pagination : "";
					repObj.pageOfTotal = TSC.util.isDefined(story.pageOfTotal) ? story.pageOfTotal : "";
					//repObj.authorId = TSC.util.isDefined(story.authorIds[0]) ? story.authorIds[0] : "";
					repObj.pi = story.site + "|" + story.authors + " - " + story.headline + " (" + story.storyid + ") " + story.pagination;
					repObj.puc = TSC.util.getPuc();
				//	repObj.tickers = TSC.util.isDefined(story.primaryTickers) ? story.primaryTickers : "";
					repObj.keywords = TSC.util.isDefined(story.keywords) ? story.keywords.toString() : "";
					repObj.printedPages = TSC.util.isDefined(story.isPrint) && story.isPrint == "true" && TSC.util.isDefined(story.headline) ? story.headline : "";
					//repObj.audioDownloads=TSC.util.isDefined(story.audioDownloads)?pRepObj.audioDownloads:"";
					repObj.articleName = TSC.util.isDefined(story.headline) ? story.headline : "";
					if (TSC.util.isValidPuc(TSC.util.getPuc())) {
						repObj.stories = TSC.util.isDefined(story.site) && TSC.util.isDefined(story.headline) && TSC.util.isDefined(story.authors) && TSC.util.isDefined(story.storyid) && TSC.util.isDefined(story.pubDate) ? story.site + "|" + story.authors[0] + "|" + story.storyid + "|" + story.pubDate + "|" + story.headline : "";
					}
				}
			}
		}
		if (TSC.util.isDefined(h1)) {
			repObj.hier1 = h1;
		}
		repObj.contentCat=cat;
	}else{
      //throw "page needs to be tagged properly.";
	  //log("page needs to be tagged properly")
	}

	}catch(e){
      //  TSC.reporting.sendDebug("reporting error 1");
    }
	TSC.reporting.config(repObj);
    if (!override) {
		TSC.reporting.makeCall();
	}
//});
//-->
