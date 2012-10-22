/* SiteCatalyst code H.22 */



if (!s_account) {

    if (location.hostname.indexOf('culture.scottrade.com') > -1) {

        var s_account = "scottradeculture,scottradeglobal"

    }

    else s_account = ((typeof s_account != 'undefined') ? s_account : 'scottradecom,scottradeglobal');

}

var s = s_gi(s_account)

/************************** CONFIG SECTION **************************/

s.currencyCode = "USD"

s.trackDownloadLinks = true

s.trackExternalLinks = true

s.trackInlineStats = true

s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,jpg,jpeg,png,gif"

s.linkInternalFilters = "javascript:,scottrade.,#," + window.location.hostname

s.linkLeaveQueryString = false

s.linkTrackVars = "None"

s.linkTrackEvents = "None"

s.dc = 112

s.visitorNamespace = "scottrade"

s.trackingServer = "metrics.scottrade.com"

s.trackingServerSecure = "smetrics.scottrade.com"



/* PageName Config */

s.siteID = ((typeof sc_siteID != 'undefined') ? sc_siteID : 'ST');

s.defaultPage = "Home"

s.queryVarsList = ""

s.pathExcludeDelim = ";"

s.pathConcatDelim = ":"

s.pathExcludeList = ";"



/* Channel Manager Configuration */

s._extraSearchEngines = "verizon.net|q|Google - Verizon>search.juno.com|query|Yahoo - Juno"

s._channelDomain = "Social Networks|facebook.com,myspace.com,twitter.com,digg.com,del.icio.us,youtube.com,friendfeed.com,flikr.com"

s._channelParameter = "Dream eMail|ep_mid>"

s._channelPattern = "Ad Manager|AM|>Press Release|PR_>Banner|BN|>Videos|VD|>Emails|EM|>Tools|TL|>Affiliate Networks|AN|>Social Media|SM|"



/* Link Tracking Plugin config */

s.hbx_lt = "automatic"



/* DynamicObjectIDs config */

function s_getObjectID(o) {

    var ID = o.href;

    return ID;

}

s.getObjectID = s_getObjectID



s.usePlugins = true



function s_doPlugins(s) {



    /* s_code version, hostname, URL, clickmap */

    s.prop11 = "09-06-2012";

    s.prop9 = location.hostname;

    s.prop10 = document.URL;

    s.setupDynamicObjectIDs();

    s.server = s_account;



    /* Set landing page event at visit start */

    if (location.hostname.indexOf('scottrade.com') > -1) {

        if (s.getVisitStart('s_viss'))

            s.events = s.apl(s.events, 'event30', ',', 1);

    }

    

    /*Site Section and Sub Section Naming*/

    if(s.pageName){

    var s_site_section=s.split(s.pageName,":")

    s.channel=s_site_section[1]

    s.prop5=s_site_section[2]

        

    }



    /* Set the campaign variable from cid - external campaigns, sctr - paid search,(s_kwcid - old paid search) - , epmid - email campaigns */

    if (!s.campaign) {

        s.campaign = s.getQueryParam('cid,sctr,ep_mid', '_');

        s.campaign = s.getValOnce(s.campaign, "s_campaign", 0)

    }

    if (s.campaign) s.events = s.apl(s.events, 'event7', ',', 1);



    /* Capture internal campaigns, ticker symbol, internal search, samvisid */

	/* Internal Campaigns */

	if(!s.eVar16){s.eVar16 = s.getQueryParam('icid')};

    s.eVar17 = s.getQueryParam('symbol');

    s.prop18 = s.eVar18 = s.getQueryParam('searchtxt,q');

    s.eVar45 = s.prop45 = s.getQueryParam('amvid');

	/*Campaign Stacking*/

	s.eVar16=s.crossVisitParticipation(s.eVar16,'s_ev16','15','5','>','event4',0);

	



    /* Time Parting */

    s.eVar23 = s.prop6 = s.getTimeParting('h', '-6'); // Set hour 

    s.eVar24 = s.prop7 = s.getTimeParting('d', '-6'); // Set day

    s.eVar25 = s.prop8 = s.getTimeParting('m', '-6') // Set minute



    /* pageURL for Search Center*/

    if (s.getQueryParam('s_kwcid,sctr')) {

        s.pageURL = s.manageQueryParam('s_kwcid', 1, 1);

        s.pageURL = s.manageQueryParam('sctr', 1, 1);

    }



    /* Define pageName and Channel */

    if (location.hostname.indexOf('about.scottrade.com') > -1) {

        s.siteID = "ST:About";

    }

    if (location.hostname.indexOf('careers.scottrade.com') > -1) {

        s.siteID = "ST:Careers";

    }

    if (!s.pageType && !s.pageName) {

        s.pageName = s.getPageName()

        if (s.pageName.indexOf('ST:index.asp') > -1) { s.pageName = "ST:Home" }

        s.pageName = unescape(s.pageName);

    }

    if (!s.channel) {

        s.channel = s.siteID

    }



    /* get Previous pageName */

    s.eVar11 = s.getPreviousValue(s.pageName, 'gpv_pn', '');



    /* Channel Manager */

    s.channelManager('cid,sctr,ep_mid', ':', 'c_m', '', 'cm_dl', '1');

    if (s.getQueryParam('sctr').indexOf('|C|') > -1) {

        s._channel = "Content Network";

        s._partner = s._referringDomain;

    }

    s.prop31 = s.eVar31 = s._partner;

    s.prop26 = s.eVar26 = s._campaign;

    s.prop30 = s.prop39 = s.eVar30 = s.eVar39 = s._channel;

    if (s._keywords == 'n/a') s._keywords = "";

    s.prop32 = s.eVar32 = s._keywords;

    s.prop33 = s.eVar33 = s._referringDomain;

    s.prop34 = s.eVar34 = s._campaignID;

    /* make channel variables that don't count typed/bookmarked */

    if (s._channel == 'Direct Load')

        s.prop39 = s.eVar39 = "";



    /* Natural Search */

    if (s._channel == 'Natural Search') {

        s.eVar37 = s.prop35 = ((typeof s._keywords != 'undefined') ? s._keywords : '');

        s.prop36 = s.getAndPersistValue(s.prop35, 'omtrKW');

    }



    /* Paid Search */

    if (s._channel == 'Paid Search') {

        s.eVar38 = s.prop37 = ((typeof s._keyword != 'undefined') ? s._keywords : '');

        s.prop38 = s.getAndPersistValue(s.prop37, 'omtrPKW');

    }



    /* Keyword + pageName pathing */

    if (s.getAndPersistValue(s.prop35, 'omtrKW'))

        s.prop36 = s.getAndPersistValue(s.prop35, 'omtrKW') + ">>" + s.pageName;

    if (s.getAndPersistValue(s.prop37, 'omtrPKW'))

        s.prop38 = s.getAndPersistValue(s.prop37, 'omtrPKW') + ">>" + s.pageName;



    /* Capture Google Natural Search rank when available */

    s.getGoogleRank('event31', 'event32', '', 'eVar27');



    /* clickpast analysis to determine searchCenter bounce rates */

    s.tempSCCT = s.getQueryParam('sctr');

    s.tempSCCT = s.getValOnce(s.tempSCCT, 's_tempSCCT', 0);

    s.clickPast(s.tempSCCT, 'event21', 'event22');



    /* Capture T&T PCID for remarketing from Insight segments */

    if (window.mboxFactoryDefault && typeof mboxFactoryDefault.getPCId == "function")

    { s.prop44 = mboxFactoryDefault.getPCId().getId(); }



    /* Link tracking pageName + | + link name/href */

    s.setupLinkTrack(",,prop16,", "SC_LINKS");

    if (s.prop16) {

        s.prop16 = s.repl(s.prop16, '<br>', ' ');

        s.prop16 = s.repl(s.prop16, '<BR>', ' ');

    }



    /* Capture T&T recipe id */

    s.tnt = s.trackTNT();



    /* Decreases image URL length */

    s.plugins = "";



    /* Dynamic Copy to eVars */

    s.eVar48 = "D=pageName"



    /* Replace any s variables with the scOverride version of the variable */

    if (typeof window.scOverride != "undefined") {

        s.scCopy(scOverride, s);

    }
	
	/* Read cookie value and place in variable sCookieVal */


	grabCookie();

}

s.doPlugins = s_doPlugins



/************************** PLUGINS SECTION *************************/


/*
* Function - grab dvi cookie value
*/
var sCookieVal = "";
function grabCookie() {
    dviInterval = setInterval(function() {
        var dviCookie = s.c_r('s_vi');
        if (dviCookie.length > 0) {
            clearInterval(dviInterval);
            var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
            var dvi = dviCookie.match(visRegExp);
            sCookieVal = dvi;
        }
    }, 100)
}


/*

 *	Plug-in: crossVisitParticipation v1.7 - stacks values from

 *	specified variable in cookie and returns value

 */



s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""

+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"

+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"

+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"

+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("

+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"

+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"

+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"

+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"

+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"

+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("

+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"

+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."

+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"

+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"

+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"

+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*

* Function - read combined cookies v 0.3

*/

if (!s.__ccucr) {

    s.c_rr = s.c_r; s.__ccucr = true;

    s.c_r = new Function("k", ""

+ "var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"

+ "urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="

+ "c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"

+ ",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"

+ "m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"

+ "Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"

+ "urn v;");

}

/*

* Function - write combined cookies v 0.3

*/

if (!s.__ccucw) {

    s.c_wr = s.c_w; s.__ccucw = true;

    s.c_w = new Function("k", "v", "e", ""

+ "this.new2 = true;"

+ "var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"

+ "c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"

+ ".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"

+ "ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"

+ ".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"

+ "ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"

+ "{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"

+ "='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"

+ ".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"

+ "ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"

+ "Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");

}

/*

 * YouTube Player plugin v0.4

 */ 

function onYouTubePlayerReady(a){if(!a)return;U();var b=document.getElementById(a);if(!b)return;YTO.E[a]=new Y('flash',a,b)}

function onYouTubeHtml5PlayerReady(c){if(!c)return;var a=(typeof c.target.a.videoUrl=='string')?X(c.target.a.videoUrl):'';if(!a)return;U();if(!YTO.E[a])YTO.E[a]=new Y('html5',a,'')}

function registerYThtml5Player(a,b){if(!a||!b)return;U();if(YTO.E[a]){YTO.E[a].B=b}else{YTO.E[a]=new Y('html5',a,b)}}

function onYouTubeHtml5PlayerChange(c){if(!c)return;var a=(typeof c.target.a.videoUrl=='string')?X(c.target.a.videoUrl):'';if(!a)return;U();if(!YTO.E[a]||!YTO.E[a].B)return;YTO.E[a].S(c.data)}

function U(){var t=this;if(typeof YTO!='object'){YTO=new Object();YTO.E=new Array();YTO.c=0;YTO.C=-1;YTO.T=0;V()}}

function V(){if(typeof YTO!='object')return;if(YTO.C==-1)YTO.C=s.Media?(s.Media.trackWhilePlaying?1:0):-1;var d=YTO.C,E,e;if(YTO.E){for(E in YTO.E){e++;if(!YTO.E[E].R&&!YTO.E[E].D())d=0}}YTO.c=e;if(YTO.C>0&&d)s.Media.trackWhilePlaying=true;YTO.T=setTimeout('V()',2000)}

function W(a){if(!a)return;var e=(typeof YTO.E[a]=='object')?YTO.E[a]:0;if(e){e.R=1;if(e.K){if(typeof s.Media=='object')s.Media.close(e.J);e.K=0}}e.regulatePolling();if(e.videoType=='flash'&&e.B)e.B.removeEventListener('onStateChange','YTO.E["'+a+'"].F');e.Z();YTO.c--}

function X(u){var a,b,c,d,e='',t=this;if(u){a=u.indexOf('?');if(a>-1){b='&'+u.substring(a+1);c=b.indexOf('&v=');if(c>-1){e=b.substring(c+3);d=e.indexOf('&');if(d>-1)e=e.substring(0,d)}}}return e}

function Y(q,a,b){var t=this;if(!a)return null;

t.Z=function(){var t=this;t.A=t.B=t.G=t.H=t.I=t.J='';t.K=t.L=t.M=t.N=t.O=t.P=t.Q=t.R=0};

t.D=function(){var k,t=this,d=1,x;if(typeof t.B.getVideoUrl!='function')return 1;t.H=t.B.getVideoUrl();if(t.H){k=X(t.H);t.J='YouTube|'+(k?k:t.H)}else{t.J='YouTube|unnamed'}if(t.B){x=t.B.getVideoBytesLoaded();if(typeof x!='undefined')t.N=x;x=t.B.getVideoBytesTotal();if(typeof x!='undefined')t.M=x;x=t.B.getCurrentTime();if(typeof x!='undefined')t.Q=x;x=t.B.getDuration();if(typeof x!='undefined')t.O=x;t.P=(t.M>0)?(t.O*t.N/t.M):0;x=2*YTO.c;if(x<2)x=2;if(t.L>-1&&typeof s.Media!='undefined'&&!(((t.P-t.Q)>=x)||((t.O-t.Q)<x)||(t.N==t.M))){d=0;s.Media.trackWhilePlaying=false}}return d};

t.F=function(){var t=this,d,f;if(!t.B||!s.Media)return;t.R=1;t.D();if(YTO.C>0){d=s.Media.trackWhilePlaying;s.Media.trackWhilePlaying=true}switch(t.L){case-1:if(typeof s.Media=='object'){if(t.K)s.Media.close(t.J);if(typeof s.Media=='object')s.Media.open(t.J,t.O,t.I)}t.K=1;break;case 0:if(t.K&&(typeof s.Media=='object'))s.Media.close(t.J);t.K=0;break;case 1:f=(t.Q<t.O)?2:3;if(f!=t.K&&(typeof s.Media=='object')){if(!t.K)s.Media.open(t.J,t.O,t.I);if(f==2)s.Media.play(t.J,t.Q);else s.Media.stop(t.J,t.Q)}t.K=f;break;case 2:if(t.K!=3){if(typeof s.Media=='object'){if(!t.K)s.Media.open(t.J,t.O,t.I);s.Media.stop(t.J,t.Q)}t.K=3}break;case 3:if(!t.K&&typeof s.Media=='object')s.Media.open(t.J,t.O,t.I);break;case 5:break;default:break}if(YTO.C>0){s.Media.trackWhilePlaying=d}t.R=0};

t.S=function(state){this.L=state;setTimeout('YTO.E["'+this.A+'"].F()',1)};if(YTO.E[a])W(a);t.Z();YTO.c++;t.G=q;t.A=a;t.B=b;t.I='YouTube '+q+' Player';t.D();if(q=='flash')t.B.addEventListener('onStateChange','YTO.E["'+a+'"].S',false)}



/* Custom s.tl function */

s.customTracklink = new Function("p", "ln", "up", ""

+ "var s=this;up=='true'?up=true:up=false;s.usePlugins=up;var lname=ln?ln:'customTrack';sTMP=p.split('|'),s_LTV=new Arr"

+ "ay(),s_LTE=new Array(),str='';for(i=0;i<sTMP.length;i++){s_TMP=sTMP[i].split"

+ "('=');eval(\"s.\"+s_TMP[0]+\"='\"+s_TMP[1]+\"';\");s_LTV.push(s_TMP"

+ "[0]);if(s_TMP[0]=='events'){s_LTE.push(s_TMP[1]);}}s.linkTrackVars=s_"

+ "LTV.join(',');s.linkTrackEvents=s_LTE.join(',');s.tl(this,'o',lname);s.clearVars();s.usePlugins=true;");

/* Custom s.t function */

s.customTrack = new Function("p", "up", ""

+ "var s=this;up=='true'?up=true:up=false;s.clearVars();s.usePlugins=up;sTMP=p.split('|'),s_LTV=new Arr"

+ "ay(),s_LTE=new Array(),s_lte='',str='';for(i=0;i<sTMP.length;i++){s_TMP=sTMP[i].split"

+ "('=');eval(\"s.\"+s_TMP[0]+\"='\"+s_TMP[1]+\"';\");s_LTV.push(s_TMP"

+ "[0]);if(s_TMP[0]=='events'){s_LTE.push(s_TMP[1]);}}"

+ "s.t();s.clearVars();s.usePlugins=true;");

/*

* TNT Integration Plugin v1.0

*/

s.trackTNT = new Function("v", "p", "b", ""

+ "var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."

+ "getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"

+ "]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/*

* Plugin: getVisitStart v2.0 - returns 1 on first page of visit

* otherwise 0

*/

s.getVisitStart = new Function("c", ""

+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"

+ ")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*

* Plugin: getAndPersistValue 0.3 - get a value on every page

*/

s.getAndPersistValue = new Function("v", "c", "e", ""

+ "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("

+ "v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/* Copies variables from one object into another */

s.scCopy = new Function("src", "dest", ""

+ "for (i in src)dest[i]=src[i];");

/*

* Plugin: linkHandler 0.5 - identify and report custom links

*/

s.linkHandler = new Function("p", "t", ""

+ "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"

+ "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."

+ "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"

+ "e=l=='[['?'':l;s.linkType=t;return h;}return '';");

s.p_gn = new Function("t", "h", ""

+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="

+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"

+ "return 0;");

/*

* Utility Function: p_gh

*/

s.p_gh = new Function(""

+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("

+ "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"

+ "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."

+ "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");



/*

* Plugin (H code): manageQueryParam 1.3 - swap parameters in query string 

*/

s.manageQueryParam = new Function("p", "w", "e", "u", ""

+ "var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"

+ "cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"

+ "?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("

+ "'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"

+ "(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"

+ "ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"

+ ",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"

+ "bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"

+ "{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"

+ ";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"

+ ";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"

+ "p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qv=s.rep(qv,'%27','\\'');qv=s"

+ ".rep(qv,'%23','#');qv=s.rep(qv,'%24','$');qv=s.rep(qv,'%3A',':');qv"

+ "=s.rep(qv,'%3a',':');qv=s.rep(qv,'%3B',';');qv=s.rep(qv,'%3b',';');"

+ "qv=s.rep(qv,'%21','!');qp=qp.substring(0,y+1)+qv;}if(w&&qp){if(f)qs"

+ "='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='?'+qp}else if(f)"

+ "qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if(qp)qs='?'+qp;re"

+ "turn u+qs;");

/*

* Plugin: getValOnce 0.2 - get a value once per session or number of days

*/

s.getValOnce = new Function("v", "c", "e", ""

+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("

+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*

* Plugin: getQueryParam 2.4

*/

s.getQueryParam = new Function("p", "d", "u", "h", ""

+ "var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"

+ "tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"

+ "?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"

+ "')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"

+ "g(i==p.length?i:i+1)}return v");

s.p_gpv = new Function("k", "u", "h", ""

+ "var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"

+ "string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");

s.p_gvf = new Function("t", "k", ""

+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"

+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."

+ "epa(v)}return''");



/* Plugin: getPreviousValue_v1.0 - return previous value of designated */

s.getPreviousValue = new Function("v", "c", "el", ""

+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"

+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"

+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"

+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"

+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*

* Plugin: getTimeParting 2.0 

*/

s.getTimeParting = new Function("t", "z", "y", "l", ""

+ "var s=this,d,A,U,X,Z,W,B,C,D,Y,mint;d=new Date();A=d.getFullYear();Y=U=S"

+ "tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"

+ ".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"

+ "|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"

+ "=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"

+ "g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"

+ "=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"

+ "a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"

+ " Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"

+ "etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"

+ "nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"

+ "Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"

+ "00';if(C>=15&&C<30){X='15'}if(C>=30&&C<45){X='30'}if(C>=45&&C<60){X='45'}"

+ "if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"

+ "||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"

+ "le'}else{if(t){if(t=='m'){mint=B+':'+C+U;return mint}if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"

+ "eturn A}}else{return Z+', '+W}}}");

/* Plugin: getPageName v2.1 - parse URL and return*/

s.getPageName = new Function("u", ""

+ "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"

+ "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."

+ "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"

+ "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"

+ "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"

+ "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"

+ "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."

+ "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"

+ ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"

+ "ubstring(x+1)}return n");

/* DynamicObjectIDs v1.3: Setup Dynamic Object IDs based on URL */

s.setupDynamicObjectIDs = new Function(""

+ "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"

+ ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"

+ " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"

+ "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"

+ "re=1}");

s.setOIDs = new Function("e", ""

+ "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"

+ ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"

+ "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"

+ "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"

+ "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','').substr"

+ "ing(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';if(c.indexOf('.t(')>="

+ "0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0)x='var x=\".tl(\";';"

+ "x+='s_objectID=\"'+u+'_'+a[u]+'\";return this.s_oc?this.s_oc(e):tru"

+ "e';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o]=new Function('e',x)"

+ "}}}s.wd.s_semaphore=0;return true");

/* s.join: 1.0 - s.join(v,p)*/

s.join = new Function("v", "p", ""

+ "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"

+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"

+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"

+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* Utility Function: p_c */

s.p_c = new Function("v", "c", ""

+ "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"

+ "ngth:x).toLowerCase()?v:0");

/*

* Plugin Utility: apl v1.1

*/

s.apl = new Function("l", "v", "d", "u", ""

+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."

+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"

+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*

* Plugin Utility: Replace v1.0

*/

s.repl = new Function("x", "o", "n", ""

+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."

+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/* Utility Function: split v1.5 - split a string (JS 1.0 compatible)*/

s.split = new Function("l", "d", ""

+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"

+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/* first load only plugin */

s.p_fo = new Function("n", ""

+ "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="

+ "new Object;return 1;}else {return 0;}");

/*

* Utility clearVars v0.1 - clear variable values (requires split 1.5)

*/

s.clearVars = new Function("l", "f", ""

+ "var s=this,vl,la,vla;l=l?l:'';f=f?f:'';vl='pageName,purchaseID,chan"

+ "nel,server,pageType,campaign,state,zip,events,products';for(var n=1"

+ ";n<51;n++)vl+=',prop'+n+',eVar'+n+',hier'+n;if(l&&(f==1||f==2)){if("

+ "f==1){vl=l}if(f==2){la=s.split(l,',');vla=s.split(vl,',');vl='';for"

+ "(x in la){for(y in vla){if(la[x]==vla[y]){vla[y]=''}}}for(y in vla)"

+ "{vl+=vla[y]?','+vla[y]:'';}}s.pt(vl,',','p_clr',0);return true}else"

+ " if(l==''&&f==''){s.pt(vl,',','p_clr',0);return true}else{return fa"

+ "lse}");

s.p_clr = new Function("t", "var s=this;s[t]=''");

/*

* getGoogleRank v1.0

*/

s.getGoogleRank = new Function("ce,ie,ev1,ev2,dn", ""

+ "var s=this,dr,rd,p,pa,kr,kw,dn=dn||'';qp='resnum,cd';dr=s.referrer|"

+ "|typeof s.referrer!='undefined'?s.referrer:document.referrer;if(!dr"

+ "||!ce||!ie)return;rd=s.split(dr,'/');if(rd[2].substring(0,11)!='www"

+ ".google.')return;kw=s.getQueryParam('q,as_q',' ',dr);if(!kw)return;"

+ "if(ev1)s[ev1]=kw;kr=rd[3].substring(0,4)=='url?'?s.getQueryParam(qp"

+ ",'|',dr):'';if(kr.indexOf('|')>-1)kr=kr.substring(0,kr.indexOf('|')"

+ ");if(!kr||kr=='0'){if(ev2)s[ev2]='no rank available';return;}if(ev2"

+ ")s[ev2]=kr;p=s.products;pa=s.split(p,',');pa[0]=s.split(pa[0],';');"

+ "pa[0][0]=pa[0][0]||'';pa[0][1]=pa[0][1]||dn;pa[0][2]=pa[0][2]||'';p"

+ "a[0][3]=pa[0][3]||'';pa[0][4]=s.apl(pa[0][4],ie+'='+kr,'|',2);pa[0]"

+ "=s.join(pa[0],{delim:';'});pa=s.join(pa,{delim:','});s.events=s.apl"

+ "(s.events,ce,',',2);s.events=s.apl(s.events,ie,',',2);s.products=pa"

+ ";return;");

/*                                                                  

* Plugin: clickPast - version 1.0

*/

s.clickPast = new Function("scp", "ct_ev", "cp_ev", "cpc", ""

+ "var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"

+ "{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"

+ ";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"

+ ",0,0);}}}");

/*

* channelManager v2.4 - Tracking External Traffic

*/

s.channelManager = new Function("a", "b", "c", "d", "e", "f", ""

+ "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"

+ "X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("

+ "e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"

+ "rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"

+ "ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"

+ "nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"

+ "l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"

+ "Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"

+ ",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"

+ "chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"

+ "=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"

+ "D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"

+ "G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("

+ "k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"

+ "=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"

+ "=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"

+ ");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"

+ "aid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Sea"

+ "rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct Load'}X=M+u+t;c=c?c:'c_m';"

+ "if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"

+ "plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"

+ "it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"

+ "=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"

+ "plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"

+ "it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"

+ "(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"

+ "h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"

+ "th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."

+ "indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"

+ "';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"

+ "ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"

+ "ign=u;s._keywords=M;s._channel=P");

/* non-custom list */

s.seList = "search.aol.com,search.aol.ca|query,q|AOL.com Search>ask.com"

+ ",ask.co.uk|ask,q|Ask Jeeves>google.co,googlesyndication.com|q,as_q|"

+ "Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as_q"

+ "|Google - Australia>google.be|q,as_q|Google - Belgium>google.com.br"

+ "|q,as_q|Google - Brasil>google.ca|q,as_q|Google - Canada>google.cl|"

+ "q,as_q|Google - Chile>google.cn|q,as_q|Google - China>google.com.co"

+ "|q,as_q|Google - Colombia>google.dk|q,as_q|Google - Denmark>google."

+ "com.do|q,as_q|Google - Dominican Republic>google.fi|q,as_q|Google -"

+ " Finland>google.fr|q,as_q|Google - France>google.de|q,as_q|Google -"

+ " Germany>google.gr|q,as_q|Google - Greece>google.com.hk|q,as_q|Goog"

+ "le - Hong Kong>google.co.in|q,as_q|Google - India>google.co.id|q,as"

+ "_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google.co.i"

+ "l|q,as_q|Google - Israel>google.it|q,as_q|Google - Italy>google.co."

+ "jp|q,as_q|Google - Japan>google.com.my|q,as_q|Google - Malaysia>goo"

+ "gle.com.mx|q,as_q|Google - Mexico>google.nl|q,as_q|Google - Netherl"

+ "ands>google.co.nz|q,as_q|Google - New Zealand>google.com.pk|q,as_q|"

+ "Google - Pakistan>google.com.pe|q,as_q|Google - Peru>google.com.ph|"

+ "q,as_q|Google - Philippines>google.pl|q,as_q|Google - Poland>google"

+ ".pt|q,as_q|Google - Portugal>google.com.pr|q,as_q|Google - Puerto R"

+ "ico>google.ro|q,as_q|Google - Romania>google.com.sg|q,as_q|Google -"

+ " Singapore>google.co.za|q,as_q|Google - South Africa>google.es|q,as"

+ "_q|Google - Spain>google.se|q,as_q|Google - Sweden>google.ch|q,as_q"

+ "|Google - Switzerland>google.co.th|q,as_q|Google - Thailand>google."

+ "com.tr|q,as_q|Google - Turkey>google.co.uk|q,as_q|Google - United K"

+ "ingdom>google.co.ve|q,as_q|Google - Venezuela>bing.com|q|Microsoft "

+ "Bing>naver.com,search.naver.com|query|Naver>yahoo.com,search.yahoo."

+ "com|p|Yahoo!>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Canada>yah"

+ "oo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>sg.yahoo.com,sg.sea"

+ "rch.yahoo.com|p|Yahoo! - Singapore>uk.yahoo.com,uk.search.yahoo.com"

+ "|p|Yahoo! - UK and Ireland>search.cnn.com|query|CNN Web Search>sear"

+ "ch.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Se"

+ "arch>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Searc"

+ "h";



/*

* Plugin: setupLinkTrack 2.0 - return links for HBX-based link 

*         tracking in SiteCatalyst (requires s.split and s.apl)

*/

s.setupLinkTrack = new Function("vl", "c", ""

+ "var s=this;var l=s.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s."

+ "c_r(c);if(vl&&cv!=''){cva=s.split(cv,'^^');vla=s.split(vl,',');for("

+ "x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s.c_w(c,'',0);if(!s.e"

+ "o&&!s.lnk)return '';o=s.eo?s.eo:s.lnk;y=s.ot(o);n=s.oid(o);if(s.eo&"

+ "&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"

+ ":o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);}for(i=0;i<4;i++"

+ ")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"

+ "ase()!='area')o=o.parentElement;}b=s._LN(o);o.lid=b[0];o.lpos=b[1];"

+ "if(s.hbx_lt&&s.hbx_lt!='manual'){if((o.tagName&&s._TL(o.tagName)=='"

+ "area')){if(!s._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"

+ "id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s._IL(o.lpos))"

+ "o.lpos=o.coords}else{if(s._IL(o.lid)<1)o.lid=s._LS(o.lid=o.name?o.name:o.text?o.t"

+ "ext:o.innerText?o.innerText:'');if(!s._IL(o.lid)||s._II(s._TL(o.lid"

+ "),'<img')>-1){h=''+o.innerHTML;bu=s._TL(h);i=s._II(bu,'<img');if(bu"

+ "&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"

+ ";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"

+ "i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l"

+ "=s.linkName?s.linkName:s._hbxln(h);t=s.linkType?s.linkType.toLowerC"

+ "ase():s.lt(h);oc=o.onclick?''+o.onclick:'';cv=s.pageName+'^^'+o.lid"

+ "+'^^'+s.pageName+' | '+(o.lid=o.lid?o.lid:h)+'^^'+o.lpos;if"

+ "(t&&(h||l)){cva=s.split(cv,'^^');vla=s.split(vl,',');for(x in vla)s"

+ "._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if(!t&&oc.indexOf('.tl(')<"

+ "0){s.c_w(c,cv,0);}else return ''");

s._IL = new Function("a", "var s=this;return a!='undefined'?a.length:0");

s._II = new Function("a", "b", "c", "var s=this;return a.indexOf(b,c?c:0)"

);

s._IS = new Function("a", "b", "c", ""

+ "var s=this;return b>s._IL(a)?'':a.substring(b,c!=null?c:s._IL(a))");

s._LN = new Function("a", "b", "c", "d", ""

+ "var s=this;b=a.href;b+=a.name?a.name:'';c=a.name?a.name:a.innerHTML?a.innerHTML:a.href?a.href:'';d=s._LVP("

+ "b,'lpos');r"

+ "eturn[c,d]");



s._LVP = new Function("a", "b", "c", "d", "e", ""

+ "var s=this;c=s._II(a,'&'+b+'=');c=c<0?s._II(a,'?'+b+'='):c;if(c>-1)"

+ "{d=s._II(a,'&',c+s._IL(b)+2);e=s._IS(a,c+s._IL(b)+2,d>-1?d:s._IL(a)"

+ ");return e}return ''");

s._LS = new Function("a", ""

+ "var s=this,b,c=100,d,e,f,g;b=(s._IL(a)>c)?escape(s._IS(a,0,c)):esca"

+ "pe(a);b=s._LSP(b,'%0A','%20');b=s._LSP(b,'%0D','%20');b=s._LSP(b,'%"

+ "09','%20');c=s._IP(b,'%20');d=s._NA();e=0;for(f=0;f<s._IL(c);f++){g"

+ "=s._RP(c[f],'%20','');if(s._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"

+ "rn unescape(b)");

s._LSP = new Function("a", "b", "c", "d", "var s=this;d=s._IP(a,b);return d"

+ ".join(c)");

s._IP = new Function("a", "b", "var s=this;return a.split(b)");

s._RP = new Function("a", "b", "c", "d", ""

+ "var s=this;d=s._II(a,b);if(d>-1){a=s._RP(s._IS(a,0,d)+','+s._IS(a,d"

+ "+s._IL(b),s._IL(a)),b,c)}return a");

s._TL = new Function("a", "var s=this;return a.toLowerCase()");

s._NA = new Function("a", "var s=this;return new Array(a?a:0)");

s._hbxm = new Function("m", "var s=this;return (''+m).indexOf('{')<0");

s._hbxln = new Function("h", "var s=this,n=s.linkNames;if(n)return s.pt("

+ "n,',','lnf',h);return ''");





/* Configure Modules and Plugins */

s.loadModule("Integrate")



/****************************** MODULES *****************************/

/* Module: Integrate */

s.m_Integrate_c = "var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"

+ "=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"

+ "];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"

+ "(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"

+ "0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="

+ "s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("

+ "'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"

+ "m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["

+ "x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"

+ "m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";

s.m_i("Integrate");



/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/

var s_code = '', s_objectID; function s_gi(un, pg, ss) {

    var c = "s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"

+ ".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"

+ "tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"

+ "f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"

+ "return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"

+ "16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"

+ "(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"

+ "codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"

+ "ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"

+ "sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="

+ "s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"

+ "c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"

+ " s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"

+ ".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."

+ "epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"

+ "E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"

+ "+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."

+ "o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"

+ ">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"

+ "'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"

+ ".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="

+ "p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"

+ "l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"

+ "ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"

+ "){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"

+ "(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"

+ ".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"

+ "&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."

+ "mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"

+ "'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="

+ "='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"

+ " alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="

+ "function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"

+ ";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"

+ "h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"

+ "+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"

+ "ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"

+ "inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"

+ "geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"

+ "tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="

+ "=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"

+ "')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"

+ "';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"

+ ";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"

+ "!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"

+ ")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"

+ "ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"

+ "!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"

+ "();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"

+ "on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"

+ "xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"

+ "')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"

+ ")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"

+ "=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"

+ ",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"

+ ");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"

+ "s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"

+ ",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"

+ "n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"

+ "ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"

+ "[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"

+ ".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"

+ "|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"

+ "tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"

+ ")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"

+ "ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"

+ "rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"

+ "s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"

+ "l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"

+ "ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"

+ "ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"

+ ";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("

+ "\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."

+ "length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"

+ "f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"

+ "dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "

+ "g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"

+ "o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"

+ "o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"

+ "cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"

+ "f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"

+ "||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"

+ "ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"

+ "l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"

+ "ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("

+ ")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"

+ "t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"

+ ";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"

+ "{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="

+ "screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"

+ "th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="

+ "tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"

+ "l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"

+ "t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"

+ ";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"

+ ",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"

+ ";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"

+ ";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="

+ "s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="

+ "'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("

+ ");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"

+ "Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"

+ "{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"

+ "xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"

+ "n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"

+ "ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="

+ "parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="

+ "'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"

+ "fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"

+ "linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"

+ "rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"

+ ",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"

+ "ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",

w = window, l = w.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf('MSIE '), m = u.indexOf('Netscape6/'), a, i, s; if (un) { un = un.toLowerCase(); if (l) for (i = 0; i < l.length; i++) { s = l[i]; if (!s._c || s._c == 's_c') { if (s.oun == un) return s; else if (s.fs && s.sa && s.fs(s.oun, un)) { s.sa(un); return s } } } } w.s_an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    w.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"

+ "ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");

    w.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");

    w.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");

    w.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"

+ "=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("

+ "x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");

    w.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");

    w.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"

+ "a");

    w.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"

+ "f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"

+ "'+c.substring(e+1);s=c.indexOf('=function(')}return c;");

    c = s_d(c); if (e > 0) { a = parseInt(i = v.substring(e + 5)); if (a > 3) a = parseFloat(i) } else if (m > 0) a = parseFloat(u.substring(m + 10)); else a = parseFloat(v); if (a >= 5 && v.indexOf('Opera') < 0 && u.indexOf('Opera') < 0) { w.s_c = new Function("un", "pg", "ss", "var s=this;" + c); return new s_c(un, pg, ss) } else s = new Function("un", "pg", "ss", "var s=new Object;" + s_ft(c) + ";return s"); return s(un, pg, ss)

}