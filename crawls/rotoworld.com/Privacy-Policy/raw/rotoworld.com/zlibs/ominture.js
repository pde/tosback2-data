/* SiteCatalyst code version: H.2.
Copyright 1997-2005 Omniture, Inc. More info available at
http://www.omniture.com */
/* Specify the Report Suite ID(s) to track here */

s_linkInternalFilters = "javascript:,.,/,rotoworld.com";
var s_account = "nbcuglobal, nbcusportsd, nbcurotoworldbu"
var s_prop8 = "NBC Sports";
var s_prop9 = "Rotoworld.com";

var s = s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode = "USD"
/* Link Tracking Config */
s.trackDownloadLinks = true
s.trackExternalLinks = true
s.trackInlineStats = true
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkLeaveQueryString = false
s.linkTrackVars = "s_prop21,s_prop30"
s.linkTrackEvents = "None"

/* WARNING: Changing the visitor namespace will cause drastic changes
to how your visitor data is collected.  Changes should only be made
when instructed to do so by your account manager.*/
s.visitorNamespace = "nbcuniversal"

s.siteID = ""; // optional
s.defaultPage = "index.html";
s.queryVarsList = ""; // if list, comma delimit
s.pathExcludeDelim = ";";
s.pathConcatDelim = ":"; // page name component separator

/* Plugin Config */
s.usePlugins = true
function s_doPlugins(s) {
    /* Add calls to plugins here */
    if (!s.pageType && !s.pageName) {
        s.pageName = s.getPageName();
    }

    s.linkInternalFilters = s_linkInternalFilters;
    s.prop6 = unescape(unescape(window.location.href));
    if (typeof (s_prop8) != 'undefined') { s.prop8 = s_prop8; }
    if (typeof (s_prop9) != 'undefined') { s.prop9 = s_prop9; }
    if (typeof (s_prop10) != 'undefined') { s.prop10 = s_prop10; }
    s.heir1 = s.prop8 + "|" + s.prop9 + "|" + s.prop10;
    s.prop11 = s.prop10 + " | " + s.pageName;
    s.prop12 = s.prop9 + " | " + s.prop10;
    s.prop13 = s.getNewRepeat();


    s.campaign = s.getQueryParam("__source");
    //If the campaign variable has been set, then store it in a session cookie

    if (s.campaign) {

        s.c_w('campaignname', s.campaign, 0);
    }



    //If the cookie has a value, then store it in an sprop along with pagename

    if (s.c_r('campaignname')) {

        s.prop14 = s.c_r('campaignname') + ":"



        //If the page has been assigned a pagename, concatenate the pagename

        if (s.pageName) {

            s.prop14 = s.prop14 + s.pageName;

        } else {

            //If no pagename, then use the url

            s.prop14 = s.prop14 + document.location;

        }

    }

    //ivillage functions

    //g to hcode mapping (version 08_02_06-1)

    if (typeof (s_prop5) != 'undefined') { s.prop25 = s_prop5; }
    if (typeof (s_prop7) != 'undefined') { s.prop22 = s_prop7; }
    if (typeof (s_prop14) != 'undefined') { s.prop23 = s_prop14; }

    if (typeof (s_eVar1) != 'undefined') { s.eVar17 = s_eVar1; }
    if (typeof (s_eVar2) != 'undefined') { s.eVar18 = s_eVar2; }
    if (typeof (s_eVar7) != 'undefined') { s.eVar25 = s_eVar7; }
    if (typeof (s_eVar8) != 'undefined') { s.eVar26 = s_eVar8; }
    if (typeof (s_eVar9) != 'undefined') { s.eVar27 = s_eVar9; }

    if (typeof (s_eVar10) != 'undefined') { s.eVar10 = s_eVar10; }
    if (typeof (s_eVar11) != 'undefined') { s.eVar11 = s_eVar11; }
    if (typeof (s_eVar12) != 'undefined') { s.eVar12 = s_eVar12; }
    if (typeof (s_eVar13) != 'undefined') { s.eVar13 = s_eVar13; }
    if (typeof (s_eVar14) != 'undefined') { s.eVar14 = s_eVar14; }
    if (typeof (s_eVar15) != 'undefined') { s.eVar15 = s_eVar15; }
    if (typeof (s_eVar21) != 'undefined') { s.eVar21 = s_eVar21; }
    if (typeof (s_eVar22) != 'undefined') { s.eVar22 = s_eVar22; }

    if (typeof (s_prop15) != 'undefined') { s.eVar28 = s_prop15; }


    if (typeof (s_events) != 'undefined') {
        var s_gCodeEvents = s_events.split(',');
        var s_hCodeEvents = new Array();
        for (var i = 0; i < s_gCodeEvents.length; i++) {

            switch (s_gCodeEvents[i]) {
                case 'event1':
                    s_hCodeEvents.push('event10');
                    break;

                case 'event2':
                    s_hCodeEvents.push('event11');
                    break;

                case 'event3':
                    s_hCodeEvents.push('event12');
                    break;

                case 'event4':
                    s_hCodeEvents.push('event13');
                    break;

                default:
                    s_hCodeEvents.push(s_gCodeEvents[i]);
            }
        }
        s.events = s.events + "," + s_hCodeEvents.join(',');
    }



    s.server = window.location.host.toLowerCase(); //do we still need this?

    s.eVar20 = s.getQueryParam("dst"); //was evar3
    s.eVar24 = s.getQueryParam("o"); //was evar6
    s.eVar23 = s.getQueryParam("par"); //was evar4
    s.eVar19 = s.getQueryParam("WT.srch"); //was evar4
    s.eVar18 = s.getQueryParam("sky"); //was evar2
    s.prop21 = s.getQueryParam("nlcid"); //was sprop3
    s.eVar16 = s.getQueryParam("hcoref");

    //was sprop13
    if (!(window.s_prop30 && window.s_prop30.length > 0))
        s.prop30 = s.getQueryParam("ice");

    s.prop24 = s.getQueryParam("vty"); //was sprop13

    if (s.events) {
        s.events = s.events + ",event6";
    } else {
        s.events = "event6";
    }


}
s.doPlugins = s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
* Plugin: getQueryParam 1.3 - Return query string parameter values
*/
s.getQueryParam = new Function("qp", "d", ""
+ "var s=this,v='',i,t;d=d?d:'';while(qp){i=qp.indexOf(',');i=i<0?qp.l"
+ "ength:i;t=s.gcgi(qp.substring(0,i));if(t)v+=v?d+t:t;qp=qp.substring"
+ "(i==qp.length?i:i+1)}return v");
s.gcgi = new Function("k", ""
+ "var v='',s=this;if(k&&s.wd.location.search){var q=s.wd.location.sea"
+ "rch.toLowerCase(),qq=q.indexOf('?');q=qq<0?q:q.substring(qq+1);v=s."
+ "pt(q,'&','cgif',k.toLowerCase())}return v");
s.cgif = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),sk=i<0?t:t.substring(0,i),sv=i<0?"
+ "'True':t.substring(i+1);if(sk.toLowerCase()==k)return s.epa(sv)}ret"
+ "urn ''");

/*
* Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
*/
s.getNewRepeat = new Function(""
+ "var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+ "(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+ "'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+ ".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+ "al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+ "n 'Repeat';");

/*
* Utility Function: Split a string (compatible with Javascript 1.0)
*/
s.split = new Function("str", "sep", ""
+ "var si=0,sa=new Array(),i;while((str.length>0)&&(sep.length>0)){"
+ "i=str.indexOf(sep);if((!i)&&(sep!=str.substring(0,sep.length)))"
+ "break;if(i==-1){sa[si++] = str;break;}sa[si++]=str.substring(0,i);"
+ "str=str.substring(i+sep.length,str.length)}return sa");

/*
* Utility Function: Determine If A Particular Value Exists Within An Array
*/
s.ia = new Function("ar", "v", ""
+ "for(var i=0;i<ar.length;i++){if(ar[i]==v)return i}return -1");

/*
* Plugin: Dynamically Generate Page Name Based On Current URL
*/
s.getPageName = new Function(""
+ "var s=this,pn=(s.siteID&&(''+s.siteID).length>0)?''+s.siteID:"
+ "'',l=location,dp=(s.defaultPage)?''+s.defaultPage:'',e="
+ "(s.pathExcludeDelim)?s.pathExcludeDelim:'',cs=(s.pathConcatDelim)?"
+ "s.pathConcatDelim:'',q=l.search.substring(1),"
+ "p=l.pathname.substring(1),x=p.indexOf(e);p=((x<0)?p:p.substring(0,"
+ "x)).split('/');for(j=0;j<p.length;j++){if(p[j].length>0){if(pn."
+ "length>0)pn+=cs;pn+=p[j]}else{if(dp.length>0){if(pn.length>0)pn+="
+ "cs;pn+=dp}}}if(q.length>0){if(s.queryVarsList){var qpa=new Array()"
+ ",qv=s.split(s.queryVarsList,','),qp=s.split(q,'&'),tmp,idx;for(i="
+ "0;i<qp.length;i++){tmp=s.split(qp[i],'=');qpa[i]=tmp[0]}for(i=0;"
+ "i<qv.length;i++){idx=s.ia(qpa,qv[i]);if(idx>=0){if(pn.length"
+ ">0)pn+=cs;pn+=qp[idx]}}}}return pn");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID; function s_c2fe(f) {
    var x = '', s = 0, e, a, b, c; while (1) {
        e =
f.indexOf('"', s); b = f.indexOf('\\', s); c = f.indexOf("\n", s); if (e < 0 || (b >=
0 && b < e)) e = b; if (e < 0 || (c >= 0 && c < e)) e = c; if (e >= 0) {
            x += (e > s ? f.substring(s, e) :
'') + (e == c ? '\\n' : '\\' + f.substring(e, e + 1)); s = e + 1
        } else return x
+ f.substring(s)
    } return f
} function s_c2fa(f) {
    var s = f.indexOf('(') + 1, e =
f.indexOf(')'), a = '', c; while (s >= 0 && s < e) {
        c = f.substring(s, s + 1); if (c == ',')
            a += '","'; else if (("\n\r\t ").indexOf(c) < 0) a += c; s++
    } return a ? '"' + a + '"' :
a
} function s_c2f(cc) {
    cc = '' + cc; var fc = 'var f=new Function(', s =
cc.indexOf(';', cc.indexOf('{')), e = cc.lastIndexOf('}'), o, a, d, q, c, f, h, x
    fc += s_c2fa(cc) + ',"var s=new Object;'; c = cc.substring(s + 1, e); s =
c.indexOf('function'); while (s >= 0) {
        d = 1; q = ''; x = 0; f = c.substring(s); a =
s_c2fa(f); e = o = c.indexOf('{', s); e++; while (d > 0) {
            h = c.substring(e, e + 1); if (
q) { if (h == q && !x) q = ''; if (h == '\\') x = x ? 0 : 1; else x = 0 } else {
                if (h == '"' || h == "'"
) q = h; if (h == '{') d++; if (h == '}') d--
            } if (d > 0) e++
        } c = c.substring(0, s)
+ 'new Function(' + (a ? a + ',' : '') + '"' + s_c2fe(c.substring(o + 1, e)) + '")'
+ c.substring(e + 1); s = c.indexOf('function')
    } fc += s_c2fe(c) + ';return s");'
    eval(fc); return f
} function s_gi(un, pg, ss) {
    var c = "function s_c(un,pg,s"
+ "s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+ "wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+ "d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+ "ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+ "eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+ "ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+ "(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+ "))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o),l="
+ "n.length>0?n.length:1;while(x&&i>=0){x=x.substring(0,i)+n+x.substri"
+ "ng(i+o.length);i=x.indexOf(o,i+l)}return x};s.ape=function(x){var s"
+ "=this,i;x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&s.charSet&&s.em=="
+ "1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>="
+ "0){i++;if(('89ABCDEFabcdef').indexOf(x.substring(i,i+1))>=0)return "
+ "x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}return x}"
+ ";s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')"
+ "):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.ind"
+ "exOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s.m(f)?s[f](t,a):f(t,"
+ "a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.leng"
+ "th?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0"
+ ")a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);retu"
+ "rn (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf"
+ "',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s"
+ "=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.c_d='';s.c_gdf=f"
+ "unction(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=func"
+ "tion(){var s=this,d=s.wd.location.hostname,n=s.cookieDomainPeriods,"
+ "p;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');wh"
+ "ile(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','"
+ "c_gdf',0)?d.substring(p):''}return s.c_d};s.c_r=function(k){var s=t"
+ "his;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:"
+ "c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.leng"
+ "th:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s"
+ ".c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if("
+ "e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=n"
+ "ew Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cooki"
+ "e=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expir"
+ "es='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k"
+ ")==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in"
+ ",n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n"
+ "<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l"
+ "[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x."
+ "o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r;"
+ "if(s.isie&&a.apv>=5)eval('try{r=s.m(f)?s[f](a):f(a)}catch(e){r=s.m("
+ "t)?s[t](e):t(e)}');else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s.m("
+ "b)?s[b](a):b(a);else{s.eh(s.wd,'onerror',0,o);r=s.m(f)?s[f](a):f(a)"
+ ";s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;"
+ "return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'];s."
+ "eh(window,\"onerror\",1);s.etfs=1;var c=s.t();if(c)s.d.write(c);s.e"
+ "tfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=fun"
+ "ction(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.locatio"
+ "n!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return"
+ " s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.et"
+ "fs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.t"
+ "fs};s.ca=function(){var s=this,imn='s_i_'+s.fun;if(s.d.images&&s.ap"
+ "v>=3&&!s.isopera&&(s.ns6<0||s.apv>=6.1)){s.ios=1;if(!s.d.images[imn"
+ "]&&(!s.isns||(s.apv<4||s.apv>=5))){s.d.write('<im'+'g name=\"'+imn+"
+ "'\" height=1 width=1 border=0 alt=\"\">');if(!s.d.images[imn])s.ios"
+ "=0}}};s.mr=function(sess,q,ta){var s=this,ns=s.visitorNamespace,unc"
+ "=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'+(s.ssl?'s':"
+ "'')+'://'+(s.ssl?'osimg':'oimg')+'.nbcuni.com/b/ss/'+s.un+'/1/H"
+ ".2-pdv-2/'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if(s."
+ "isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)"
+ "}if(s.ios){im=s.wd[imn]?s.wd[imn]:s.d.images[imn];if(!im)im=s.wd[im"
+ "n]=new Image;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'|"
+ "|ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(e.getT"
+ "ime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c="
+ "\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){v"
+ "ar s=this;return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0"
+ ",2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=f"
+ "unction(v){var s=this;s.pt(v,',','glf',0)};s.gv=function(v){var s=t"
+ "his;return s['vpm_'+v]?s['vpv_'+v]:s[v]};s.havf=function(t,a){var s"
+ "=this,b=t.substring(0,4),x=t.substring(4),n=parseInt(x),k='g_'+t,m="
+ "'vpm_'+t,q=t,v=s.linkTrackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if("
+ "s.lnk||s.eo){v=v?v+','+s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]=''"
+ ";if(t=='events'&&e)s[k]=s.fs(s[k],e)}s[m]=0;if(t=='pageURL')q='g';e"
+ "lse if(t=='referrer')q='r';else if(t=='vmk')q='vmt';else if(t=='cha"
+ "rSet'){q='ce';if(s[k]&&s.em==2)s[k]='UTF-8'}else if(t=='visitorName"
+ "space')q='ns';else if(t=='cookieDomainPeriods')q='cdp';else if(t=='"
+ "cookieLifetime')q='cl';else if(t=='visitVariableProvider')q='vvp';e"
+ "lse if(t=='currencyCode')q='cc';else if(t=='channel')q='ch';else if"
+ "(t=='campaign')q='v0';else if(s.num(x)) {if(b=='prop')q='c'+n;else "
+ "if(b=='eVar')q='v'+n;else if(b=='hier'){q='h'+n;s[k]=s.fl(s[k],255)"
+ "}}if(s[k]&&t!='linkName'&&t!='linkType')s.qav+='&'+q+'='+s.ape(s[k]"
+ ");return ''};s.hav=function(){var s=this;s.qav='';s.pt(s.vl_t,',','"
+ "havf',0);return s.qav};s.lnf=function(t,h){t=t?t.toLowerCase():'';h"
+ "=h?h.toLowerCase():'';var te=t.indexOf('=');if(t&&te>0&&h.indexOf(t"
+ ".substring(te+1))>=0)return t.substring(0,te);return ''};s.ln=funct"
+ "ion(h){var s=this,n=s.linkNames;if(n)return s.pt(n,',','lnf',h);ret"
+ "urn ''};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCa"
+ "se():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.s"
+ "ubstring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=fu"
+ "nction(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.i"
+ "ndexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.l"
+ "inkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFi"
+ "lters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.tra"
+ "ckDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackE"
+ "xternalLinks&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s"
+ ".pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e',"
+ "'var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);"
+ "s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Functio"
+ "n('e','var s=s_c_il['+s._in+'];if(s.d&&s.d.all&&s.d.all.cppXYctnr)r"
+ "eturn;s.eo=e.srcElement?e.srcElement:e.target;s.t();s.eo=0');s.ot=f"
+ "unction(o){var a=o.type,b=o.tagName;return (a&&a.toUpperCase?a:b&&b"
+ ".toUpperCase?b:o.href?'A':'').toUpperCase()};s.oid=function(o){var "
+ "s=this,t=s.ot(o),p=o.protocol,c=o.onclick,n='',x=0;if(!o.s_oid){if("
+ "o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('java"
+ "script')<0))n=o.href;else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\"
+ "r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='I"
+ "NPUT'||t=='SUBMIT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.sr"
+ "c;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=funct"
+ "ion(t,un){var s=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+'"
+ ",':'';return u&&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1)):''"
+ "};s.rq=function(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q="
+ "'';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s"
+ ".sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.sub"
+ "string(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q)"
+ ";return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s."
+ "sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Objec"
+ "t;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','s"
+ "qs',q);v='';for(x in s.squ)s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':''"
+ ")+x;for(x in s.sqq)if(x&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+ "[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','v"
+ "ar s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r"
+ "=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onc"
+ "lick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\""
+ ".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}r"
+ "eturn r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.isma"
+ "c||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.b"
+ "c);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s"
+ ".bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var "
+ "s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un"
+ "+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y"
+ "<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if"
+ "(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.ind"
+ "exOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?"
+ "t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substr"
+ "ing(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=functio"
+ "n(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m"
+ "=s.dynamicAccountMatch,n,i;s.un.toLowerCase();if(x&&l){if(!m)m=s.wd"
+ ".location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLow"
+ "erCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s."
+ "fun=i<0?s.un:s.un.substring(0,i)};s.t=function(){var s=this,trk=1,t"
+ "m=new Date,sed=Math&&Math.random?Math.floor(Math.random()*100000000"
+ "00000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+s"
+ "ed,yr=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(yr<1900?y"
+ "r+1900:yr)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds("
+ ")+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tfs=s.gtfs(),ta='',q='"
+ "',qs='';s.uns();if(!s.q){var tl=tfs.location,x='',c='',v='',p='',bw"
+ "='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0"
+ ",ps;if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isope"
+ "ra){if(s.apv>=3){j='1.1';v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){j"
+ "='1.2';c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight;i"
+ "f(s.apv>=4.06)j='1.3'}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4"
+ "){v=s.n.javaEnabled()?'Y':'N';j='1.2';c=screen.colorDepth;if(s.apv>"
+ "=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offse"
+ "tHeight;j='1.3';if(!s.ismac&&s.b){s.b.addBehavior('#default#homePag"
+ "e');hp=s.b.isHomePage(tl)?\"Y\":\"N\";s.b.addBehavior('#default#cli"
+ "entCaps');ct=s.b.connectionType}}}else r=''}if(s.pl)while(pn<s.pl.l"
+ "ength&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+="
+ "ps;pn++}s.q=(x?'&s='+s.ape(x):'')+(c?'&c='+s.ape(c):'')+(j?'&j='+j:"
+ "'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:'"
+ "')+(ct?'&ct='+s.ape(ct):'')+(hp?'&hp='+hp:'')+(p?'&p='+s.ape(p):'')"
+ "}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document."
+ "referrer;if(!s.pageURL)s.pageURL=s.fl(l?l:'',255);if(!s.referrer)s."
+ "referrer=s.fl(r?r:'',255);if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if("
+ "!o)return '';var p=s.gv('pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s_"
+ "oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentE"
+ "lement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.o"
+ "id(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs"
+ "(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return "
+ "''}ta=o.target;h=o.href?o.href:'';i=h.indexOf('?');h=s.linkLeaveQue"
+ "ryString||i<0?h:h.substring(0,i);l=s.linkName?s.linkName:s.ln(h);t="
+ "s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=ln"
+ "k_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev"
+ "2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.gv('p"
+ "ageURL');w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg("
+ "'objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&p"
+ "idt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.a"
+ "pe(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';var code='';if(trk&&s"
+ ".vs(sed))code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s."
+ "rq(s.un)),ta);s.sq(trk?'':qs);s.lnk=s.eo=s.linkName=s.linkType=s.wd"
+ ".s_objectID='';return code};s.tl=function(o,t,n){var s=this;s.lnk=s"
+ ".co(o);s.linkType=t;s.linkName=n;s.t()};s.ssl=(s.wd.location.protoc"
+ "ol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;s.n"
+ "=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+ "n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),i;if(v.indexOf"
+ "('Opera')>=0||s.u.indexOf('Opera')>=0)apn='Opera';s.isie=(apn=='Mic"
+ "rosoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn="
+ "='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(ie>0){s.apv=parseInt(i"
+ "=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)"
+ "s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);"
+ "s.em=0;if(String.fromCharCode){i=escape(String.fromCharCode(256)).t"
+ "oUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.un=un;s.uns()"
+ ";s.vl_l='vmk,charSet,visitorNamespace,cookieDomainPeriods,cookieLif"
+ "etime,visitVariableProvider,pageName,pageURL,referrer,currencyCode,"
+ "purchaseID';s.vl_t=s.vl_l+',channel,server,pageType,campaign,state,"
+ "zip,events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+"
+ "=',prop'+n+',eVar'+n+',hier'+n;s.vl_g=s.vl_t+',trackDownloadLinks,t"
+ "rackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloa"
+ "dFileTypes,linkExternalFilters,linkInternalFilters,linkNames';if(pg"
+ ")s.gl(s.vl_g);if(!ss){s.wds();s.ca()}}",
l = window.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf(
'MSIE '), m = u.indexOf('Netscape6/'), a, i, s; if (l) for (i = 0; i < l.length; i++) {
        s = l[i]; s.uns(); if (s.un == un) return s; else if (s.pt(s.un, ',', 'isf', un)) {
            s = s.co(s); s.un = un; s.uns(); return s
        } 
    } if (e > 0) {
        a = parseInt(i = v.substring(e
+ 5)); if (a > 3) a = parseFloat(i)
    } else if (m > 0) a = parseFloat(u.substring(m + 10)
); else a = parseFloat(v); if (a >= 5 && v.indexOf('Opera') < 0 && u.indexOf(
'Opera') < 0) { eval(c); return new s_c(un, pg, ss) } else s = s_c2f(c); return s(
un, pg, ss)
}