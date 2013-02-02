/*
 ** Copyright Â© 2013 Apple Inc.
 ** All rights reserved.
 */

function _itsdlogHasClientLogger(e) {
	return window.its && its.client && its.client[e] && typeof its.client[e] == "function"
}

function _itsdlogHasConsoleLogger(e) {
	return window.console && console[e]
}

function _itsdlogFunnel(e, t, n) {
	t || (t = "log");
	if (_itsdlogHasClientLogger(t)) return its.client[t](e, n);
	if (_itsdlogHasConsoleLogger(t) && !n) return console[t](e)
}

function itsdlog(e) {
	return _itsdlogFunnel(e, "log")
}

function itsdinfo(e) {
	return _itsdlogFunnel(e, "info")
}

function itsddebug(e) {
	return _itsdlogFunnel(e, "debug")
}

function itsdslog(e, t) {
	return _itsdlogFunnel(e, t, !0)
}

function itsdalert(e) {
	return alert(e)
}

function bind(e, t) {
	typeof t == "string" && (t = e[t]);
	var n = Array.prototype.slice,
		r = n.call(arguments, 2);
	return r.length > 0 ? t.bind.apply(t, [e].concat(r)) : t.bind(e)
}

function bindAsEventListener(e, t) {
	typeof t == "string" && (t = e[t]);
	var n = Array.prototype.slice,
		r = n.call(arguments, 2);
	return function(i) {
		return t.apply(e, [i].concat(r))
	}
}

function defer(e, t, n) {
	return n || (n = 0), setTimeout(bind(e, t), n)
}

function defined(e) {
	return typeof window[e] != "undefined"
}

function getGlobalConst(e) {
	return defined(e) ? window[e] : null
}

function definedValue(e, t) {
	return typeof e != "undefined" && e != null ? e : t
}

function classNameForObject(e) {
	if (e === null) return "null";
	var t = typeof e;
	if (t == "undefined") return "undefined";
	if (t == "string" || e instanceof String) return "String";
	if (t == "number" || e instanceof Number) return "Number";
	if (e.constructor === Array) return "Array";
	if (t == "object" || t == "function") {
		if (e.klassName) return e.klassName;
		var n = e.toString();
		n == "[object Object]" && (n = e.constructor.toString());
		if (n.indexOf("function ") === 0) return n.replace("function ", "")
			.split("(")[0].toString();
		if (n.indexOf("[object ") === 0) return n.replace("[object ", "")
			.replace("]", "");
		if (n.indexOf("[object]") === 0) return "object"
	}
	return "unknown"
}

function newElement(e, t, n) {
	var e = document.createElement(e);
	return t && (typeof t == "string" ? e.innerHTML = t : e.appendChild(t)), n && (e.className = n), e
}

function ITSEvent(e, t) {
	this.eventName = e, this.eventSource = t
}

function ITSSpriteAnimator(e, t, n, r, i, s) {
	this.anElement = e, this.width = t, this.frameCount = n, this.totalMilliseconds = r, this.loopInterval = i, this.perFrameInterval = Math.round(this.loopInterval ? this.loopInterval : this.totalMilliseconds / this.frameCount), this.currentFrameIndex = 0, this.ourTimer = null, this.playState = ITSSpriteAnimator.PLAYSTATE_STOPPED, this.animationName = s
}

function s_gi(e, t, n) {
	var r = "s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s.an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(wd){var s=this,c=''+s_gi,a=c.indexOf(\"{\"),b=c.lastIndexOf(\"}\"),m;c=s_fe(a>0&&b>0?c.substring(a+1,b):0);if(wd&&wd.document&&c){wd.setTimeout('function s_sv(o,n,k){var v=o[k],i;if(v){if(typeof(v)==\"string\"||typeof(v)==\"number\")n[k]=v;else if (typeof(v)==\"array\"){n[k]=new Array;for(i=0;i<v.length;i++)s_sv(v,n[k],i)}else if (typeof(v)==\"object\"){n[k]=new Object;for(i in v)s_sv(v,n[k],i)}}}function s_si(t){var wd=window,s,i,j,c,a,b;wd.s_gi=new Function(\"un\",\"pg\",\"ss\",\"'+c+'\");wd.s=s_gi(\"'+s.oun+'\");s=wd.s;s.sa(\"'+s.un+'\");s.tfs=wd;s.pt(s.vl_g,\",\",\"vo1\",t);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3=\\'\\';if(t.m_l&&t.m_nl)for(i=0;i<t.m_nl.length;i++){n=t.m_nl[i];if(n){m=t[n];c=t[\"m_\"+n];if(m&&c){c=\"\"+c;if(c.indexOf(\"function\")>=0){a=c.indexOf(\"{\");b=c.lastIndexOf(\"}\");c=a>0&&b>0?c.substring(a+1,b):0;s[\"m_\"+n+\"_c\"]=c;if(m._e)s.loadModule(n);if(s[n])for(j=0;j<m._l.length;j++)s_sv(m,s[n],m._l[j])}}}}}var e,o,t;try{o=window.opener;if(o&&o.s_gi){t=o.s_gi(\"'+s.un+'\");if(t)s_si(t)}}catch(e){}',1)}};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedRequests=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.20.3/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if(t=='INPUT'&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1)):''};s.rq=function(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta='',q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}if((vo&&vo._t)||!s.m_m('d')){s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}ta=n?o.target:1;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
		i = window,
		s = i.s_c_il,
		o = navigator,
		u = o.userAgent,
		a = o.appVersion,
		f = a.indexOf("MSIE "),
		l = u.indexOf("Netscape6/"),
		c, h, p;
	if (e) {
		e = e.toLowerCase();
		if (s) for (h = 0;
		h < s.length;
		h++) {
			p = s[h];
			if (!p._c || p._c == "s_c") {
				if (p.oun == e) return p;
				if (p.fs && p.sa && p.fs(p.oun, e)) return p.sa(e), p
			}
		}
	}
	return i.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", i.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a"), i.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x"), i.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)"), i.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x"), i.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")"), i.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a"), i.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;"), r = s_d(r), f > 0 ? (c = parseInt(h = a.substring(f + 5)), c > 3 && (c = parseFloat(h))) : l > 0 ? c = parseFloat(u.substring(l + 10)) : c = parseFloat(a), c >= 5 && a.indexOf("Opera") < 0 && u.indexOf("Opera") < 0 ? (i.s_c = new Function("un", "pg", "ss", "var s=this;" + r), new s_c(e, t, n)) : (p = new Function("un", "pg", "ss", "var s=new Object;" + s_ft(r) + ";return s"), p(e, t, n))
}

function _ITSBindingInfo(e, t, n, r) {
	this.perElementControllerClass = e, this.selector = t, this.bindingDict = n, this.isStaticBinding = r
}

function ITSPlayMusicController(e) {
	this.centerStateIconDiv = its.x.querySelector(this.__domElement, "div.center-control-state"), this.playState = ITSPlayMusicController.PLAYSTATE_STOPPED, this.mouseState = ITSPlayMusicController.MOUSESTATE_DEFAULT, this.mediaURL = null, this.progressMeter = null, e.getAttribute("show-preview-control-always") && ITSPlayMusicController.rowMouseIn(its.x.element.parentByAttributeName(this.__domElement, "audio-preview-url"));
	var t = its.x.element.parentByAttributeName(e, "adam-id");
	t && (this.adamId = t.getAttribute("adam-id"))
}

function ITSPlayVideoController(e) {
	this.init(e)
}

function dbg(e) {}

function info(e) {}

function detectAndOpenItunes(e) {
	if (-1 < navigator.userAgent.indexOf("iPhone") || -1 < navigator.userAgent.indexOf("iPod") && -1 < window.location.href.indexOf("ign-iphone")) {
		e = window.location.href;
		var t = "ign-iphone=1";
		if (!e.indexOf(t)) {
			var n = e.indexOf("?") === -1 ? "?" : "&";
			e += n + t
		}
		return window.location.href != e && setTimeout(function() {
			window.location.href = e
		}, 1), !1
	}
	var r = its.detect.itunesDetected(),
		i = its.detect.shouldAutolaunch();
	return itms.PageData.itunesDetectedCallback(r, i), r && i ? its.detect.openItunes(e) : !0
}

function detectAndOpenMacAppStore(e) {
	var t = its.detect.macAppStoreDetected(),
		n = its.detect.shouldAutolaunch();
	return itms.PageData.macAppStoreDetectedCallback(t, n), t && n ? its.detect.openItunes(e) : !0
}
window.its || (window.its = {}), its.files || (its.files = {}), Function.prototype.bind || (Function.prototype.bind = function(e) {
	var t = this,
		n = Array.prototype.slice,
		r = n.call(arguments, 1);
	return function() {
		return t.apply(e, r.concat(n.call(arguments)))
	}
}), Class = {
	create: function(e, t) {
		return Class._create(e, t)
	},
	createSubclass: function(e, t, n) {
		if (!t) throw new Error("Undefined base class when creating subclass: " + e);
		return Class._create(e, n, t)
	},
	_create: function(e, t, n) {
		function r() {
			this.initialize.apply(this, arguments)
		}

		function i(e, t, n) {
			var r = e[n];
			e[n] = function() {
				var i = t[n],
					s = this.base,
					o = arguments;
				this.base = function() {
					return arguments.length && (o = arguments), i.apply(this, o)
				};
				try {
					return r.apply(this, o)
				} finally {
					this.base = s
				}
			}
		}
		if (n) {
			var s = function() {};
			s.prototype = n.prototype, r.prototype = new s
		}
		Class.extend(r.prototype, t);
		if (n) for (var o in n.prototype) r.prototype.hasOwnProperty(o) && typeof r.prototype[o] == "function" && typeof n.prototype[o] == "function" && i(r.prototype, n.prototype, o);
		return r.prototype.initialize || (r.prototype.initialize = its.emptyFunction), r.prototype.constructor = r, r.klassName = e, r
	},
	extend: function(e, t) {
		for (var n in t) e[n] = t[n];
		return e
	},
	shallowClone: function(e) {
		return Class.extend({}, e)
	}
}, window.its || (window.its = {}), window.its.client || (window.its.client = {}), its.client.isRunning = defined("iTunes"), its.client.isTouchSupported = "createTouch" in document, its.client.getPlistStringValueForKey = function(e, t) {
	var n = e.getElementsByTagName("key");
	for (var r = 0;
	n != null && r < n.length;
	r++) if (n[r].textContent == t && n[r].nextElementSibling != null && n[r].nextElementSibling.nodeName == "string") return n[r].nextElementSibling.textContent;
	return null
}, its.client.isAuthDialog = function(e) {
	return "authorization" == its.client.getPlistStringValueForKey(e, "kind")
}, its.client.isClientGreaterThanOrEqualToSpecifiedVersion = function(e) {
	if (!its.client.isRunning) return !0;
	var t = its.client.version();
	return !t || !e ? "undefined" : its.string.compareNumerically(t, e) >= 0
}, its.client.onscreenConsole = function() {
	return window.ITSOnScreenConsole ? ITSOnScreenConsole.onScreenConsoleForObject("ITSClient") : null
}, its.client._logFunnel = function(t, n, r) {
	n || (n = "log");
	if ((r || its.x && its.x.isIE && its.x.isIE()) && window.ITSOnScreenConsole) its.client.onscreenConsole()
		.log(t, n);
	else if (window.console) {
		if (console[n]) return console[n](t);
		var i = "Error: Attempt to log with unknown level: " + n + " with message: " + t;
		console.error ? console.error(i) : console.log && console.log(i)
	}
}, its.client.log = function(t, n) {
	its.client._logFunnel(t, "log", n)
}, its.client.error = function(t, n) {
	its.client._logFunnel(t, "error", n)
}, its.client.warn = function(t, n) {
	its.client._logFunnel(t, "warn", n)
}, its.client.info = function(t, n) {
	its.client._logFunnel(t, "info", n)
}, its.client.debug = function(t, n, r) {
	(r || its.dev) && its.client._logFunnel(t, "debug", n)
}, its.client.findChildElementNodeAtPosition = function(e, t) {
	if (!e) return;
	var n = e.childNodes.length;
	if (t >= n) return;
	var r = 0;
	for (var i = 0;
	i < n;
	i++) {
		var s = e.childNodes[i];
		if (s.nodeType === Node.ELEMENT_NODE) {
			if (r === t) return s;
			r += 1
		}
	}
	return null
}, its.client.findPositionChildElementNodeNamed = function(e, t) {
	if (!e) return;
	var n = e.childNodes.length;
	if (n == 0) return;
	var r = 0;
	for (var i = 0;
	i < n;
	i++) {
		var s = e.childNodes[i];
		if (s.nodeType === Node.ELEMENT_NODE) {
			if (s.lastChild && s.lastChild.textContent == t) return r;
			r++
		}
	}
	return
}, window.its || (window.its = {}), its.x || (its.x = {}), its.x.util || (its.x.util = {}), its.x.util.array || (its.x.util.array = {}), its.x.uniqueGuid = 1, its.x.attachGuid = function(t) {
	t.__guid || (t.__guid = its.x.uniqueGuid++)
}, its.x.browserName = function() {
	return its.x.isOpera() ? "opera" : its.x.isKhtml() ? "khtml" : its.x.isSafari() ? "safari" : its.x.isChrome() ? "chrome" : its.x.isWebKit() ? "webkit" : its.x.isIE7() ? "ie7" : its.x.isIE8() ? "ie8" : its.x.isIE() ? "ie" : its.x.isFirefox() ? "firefox" : "unknown"
}, its.x.initBrowserDetect = function() {
	if (typeof its.x.initBrowserDetect.browser == "undefined" || !its.x.initBrowserDetect.browser) {
		var t = navigator,
			n = t.userAgent,
			r = t.appVersion,
			i = parseFloat(r),
			s = {};
		s.isOpera = n.indexOf("Opera") >= 0 ? i : undefined, s.isKhtml = r.indexOf("Konqueror") >= 0 ? i : undefined, s.isWebKit = parseFloat(n.split("WebKit/")[1]) || undefined, s.isChrome = parseFloat(n.split("Chrome/")[1]) || undefined, s.isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(n);
		var o = Math.max(r.indexOf("WebKit"), r.indexOf("Safari"), 0);
		if (o && !s.isChrome) {
			s.isSafari = parseFloat(r.split("Version/")[1]);
			if (!s.isSafari || parseFloat(r.substr(o + 7)) <= 419.3) s.isSafari = 2
		}
		if (document.all && !s.isOpera) {
			s.isIE = parseFloat(r.split("MSIE ")[1]) || undefined;
			var u = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"),
				a = -1;
			u.exec(n) != null && (a = parseFloat(RegExp.$1)), s.isIE7 = a >= 7 && a < 8, s.isIE8 = a >= 8 && a < 9
		}
		its.x.initBrowserDetect.browser = s
	}
	return its.x.initBrowserDetect.browser
}, its.x.isIE = function() {
	return its.x.initBrowserDetect()
		.isIE
}, its.x.isIE7 = function() {
	return its.x.initBrowserDetect()
		.isIE7
}, its.x.isIE8 = function() {
	return its.x.initBrowserDetect()
		.isIE8
}, its.x.isOpera = function() {
	return its.x.initBrowserDetect()
		.isOpera
}, its.x.isKhtml = function() {
	return its.x.initBrowserDetect()
		.isKhtml
}, its.x.isWebKit = function() {
	return its.x.initBrowserDetect()
		.isWebKit
}, its.x.isChrome = function() {
	return its.x.initBrowserDetect()
		.isChrome
}, its.x.isSafari = function() {
	return its.x.initBrowserDetect()
		.isSafari
}, its.x.isFirefox = function() {
	return its.x.initBrowserDetect()
		.isFirefox
}, its.x.PLATFORMS || (its.x.PLATFORMS = {}), its.x.PLATFORMS.Windows = "Windows", its.x.PLATFORMS.MacOS = "MacOS", its.x.PLATFORMS.Linux = "Linux", its.x.PLATFORMS.Unix = "Unix", its.x.__detectOS = function() {
	var t = undefined;
	return navigator.appVersion.indexOf("Win") != -1 ? t = its.x.PLATFORMS.Windows : navigator.appVersion.indexOf("Mac") != -1 ? t = its.x.PLATFORMS.MacOS : navigator.appVersion.indexOf("X11") != -1 ? t = its.x.PLATFORMS.Unix : navigator.appVersion.indexOf("Linux") != -1 && (t = its.x.PLATFORMS.Linux), t
}, its.x.isWindows = function() {
	return its.x.__detectOS() == its.x.PLATFORMS.Windows
}, its.x.isMacOS = function() {
	return its.x.__detectOS() == its.x.PLATFORMS.MacOS
}, its.x.util.array.indexOf = function(t, n) {
	var r = -1;
	if (t.indexOf) r = t.indexOf(n);
	else for (var i = 0;
	i < t.length && r == -1;
	i++) t[i] == n && (r = i);
	return r
}, its.x.util.array.shallowCopy = function(t) {
	return t.slice(0)
}, its.x.notifyOfDOMContentLoaded = function(t) {
	var n = !0;
	return its.x.isIE() ? n = window.attachEvent("onload", t) : document.addEventListener("DOMContentLoaded", t, !1), n
}, its.x.addEventListener = function(t, n, r) {
	t.addEventListener ? t.addEventListener(n, r, !1) : t.attachEvent && t.attachEvent("on" + n, function(e) {
		r.call(t, e)
	})
}, ITSEvent.prototype.preventDefault = function() {
	this._preventDefaultFlag = !0
}, ITSEvent.prototype.shouldPreventDefault = function() {
	return this._preventDefaultFlag
}, its.x.extendWithEventDispatching = function(t) {
	t.__eventToListenersMap || (t.__eventToListenersMap = {}, t.__additionalDispatchers = new Array, Class.extend(t, its.x._ITSEventDispatcher))
}, its.x._ITSEventDispatcher = function() {}, its.x._ITSEventDispatcher.itsAddEventListener = function(t, n) {
	var r = !1;
	if (typeof n == "function") {
		var i = this.__eventToListenersMap[t];
		i || (i = new Array, this.__eventToListenersMap[t] = i), its.x.util.array.indexOf(i, n) == -1 && (i.push(n), r = !0)
	}
	return r
}, its.x._ITSEventDispatcher.itsRemoveEventListener = function(t, n) {
	var r = this.__eventToListenersMap[t];
	if (r) {
		var i = its.x.util.array.indexOf(r, n);
		i >= 0 && r.splice(i, 1)
	}
}, its.x._ITSEventDispatcher.itsHasEventListeners = function(t) {
	if (!t) throw new Error("itsHasEventListeners called with null event");
	var n = this.__eventToListenersMap[t.eventName];
	return n && n.length || this.__additionalDispatchers && this.__additionalDispatchers.length
}, its.x._ITSEventDispatcher.itsDispatchEvent = function(t) {
	var n = this.__eventToListenersMap[t.eventName];
	if (n) for (var r = 0;
	r < n.length;
	r++) try {
		n[r].apply(this, arguments)
	} catch (i) {
		console && console.error && i.line && i.sourceURL && console.error(i + "    See line " + i.line + " of " + i.sourceURL)
	}
	if (this.__additionalDispatchers.length > 0) for (var r = 0;
	r < this.__additionalDispatchers.length;
	r++) try {
		this.__additionalDispatchers[r].itsDispatchEvent(t)
	} catch (i) {
		console && console.error && i.line && i.sourceURL && console.error(i + "    See line " + i.line + " of " + i.sourceURL)
	}
}, its.x._ITSEventDispatcher.itsDelegateEvents = function(t) {
	its.x.extendWithEventDispatching(t), this.__additionalDispatchers.push(t)
}, its.x.dynaLoadResourceFile = function(t, n) {
	var r = !1;
	if (its && its.property && its.property("DynaLoader.allowDynaLoading")) {
		its._dynaLoadedFiles || (its._dynaLoadedFiles = []);
		if (t && !its.contains(its._dynaLoadedFiles, t)) {
			var i = null,
				s = null,
				o = null,
				i = document.getElementsByTagName("head");
			i && (s = i[0]), s && (o = s.firstChild);
			if (o) {
				its._dynaLoadedFiles.push(t);
				var u = its.contains(t, ".js") || its.contains(t, ".jsz") ? "js" : "css",
					a = u == "js" ? "SCRIPT" : "LINK",
					f = u == "js" ? "text/javascript" : "text/css",
					l = document.createElement(a);
				l.onload = l.onreadystatechange = n, l.type = f, u == "css" ? (l.rel = "stylesheet", l.href = t) : (l.charset = "utf-8", l.src = t), its.x.element.insertBeforeElement(o, l), r = !0
			} else window.console && console.log && (console.log("its.x.dynaLoadResourceFile: Waiting for DOM <head> section to be created before fetching resource: " + t), window.setTimeout(function() {
				its.x.dynaLoadResourceFile(t, n)
			}, 200))
		} else t && (r = !0)
	}
	return r
}, window.its || (window.its = {}), its.x || (its.x = {}), its.x.element || (its.x.element = {}), its.x.element.logger = function() {
	return its.x.element.loggerInstance ? its.x.element.loggerInstance : (window.ITSLogger && ITSLogger.level ? its.x.element.loggerInstance = new ITSLogger("ITSXBaseElement") : its.Logger && (its.x.element.loggerInstance = its.Logger.named("ITSXBaseElement")), its.x.element.loggerInstance)
}, its.rootResourcesPathFromCssFilename = function(t) {
	var n = null;
	for (var r = 0; !n && r < document.styleSheets.length;
	r++) {
		var i = document.styleSheets[r];
		if (i.href) {
			var s = i.href.indexOf("stylesheets/" + t);
			s == -1 && (s = i.href.indexOf(t)), s != -1 && (n = i.href.substring(0, s))
		}
	}
	return n
}, its.imagesPath = function(t) {
	var n = null,
		r = its.rootResourcesPathFromCssFilename(t);
	return r && (n = r + "images/"), n
}, its.x.uniquifyId = function(t) {
	var n = t,
		r = 100;
	do n = t + "-" + r++;
	while (document.getElementById(n));
	return n
}, its.x.removeClassNames = function(t, n) {
	for (var r = 0;
	r < t.length;
	r++) its.x.element.removeClassName(t[r], n)
}, its.x.element._printAll = function() {
	for (var t in its.x.element) {
		var n = its.x.element[t],
			r = its.dev.parseFunctionArgsToArray(n),
			i = r.shift(),
			s = r.join(", ");
		console.log("Element.prototype." + t + "(" + s + ")")
	}
}, its.x.element.altTag = function(t) {
	return t.getAttribute("alt")
}, its.x.element.isOverflowing = function(t) {
	var n = its.x.element.getComputedStyleProperty(t, "overflow");
	if (!n || n === "visible") t.style.overflow = "hidden";
	var r = t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight;
	return r
}, its.x.element.isShowingEllipsis = function(t) {
	var n = its.x.element.isOverflowing(t),
		r = "ellipsis",
		i = "532",
		s = its.webkitVersion();
	its.webkitVersionCompare(s, i) > 0 && (r = its.x.element.getComputedStyleProperty(t, "text-overflow"));
	var o = r == "ellipsis";
	return n && o
}, its.x.element.getAttributesStartingWith = function(t, n) {
	var r = null;
	for (var i = 0;
	i < t.attributes.length;
	i++) {
		var s = t.attributes.item(i)
			.nodeName;
		its.string.startsWith(s, n) && (r == null && (r = []), r.push(s))
	}
	return r
}, its.x.element.removeAttributes = function(t, n) {
	if (n) for (var r = 0;
	r < n.length;
	r++) t.removeAttribute(n[r])
}, its.x.element.removeAttributesStartingWith = function(t, n) {
	var r = its.x.element.getAttributesStartingWith(t, n);
	its.x.element.removeAttributes(t, r)
}, its.x.element.getIntAttribute = function(t, n) {
	var r = t.getAttribute(n);
	return r != null && (r = its.string.toInt(r)), r
}, its.x.element.getBooleanAttribute = function(t, n) {
	var r = t.getAttribute(n);
	return r != null ? "true" == r : !1
}, its.x.element.getAttributeWithDefault = function(t, n, r) {
	var i = t.getAttribute(n);
	if (i === null || i === undefined) i = r;
	return i
}, its.x.element.getAttributeValuesOfChildren = function(t, n) {
	var r = [];
	for (var i = 0;
	i < t.children.length;
	i++) {
		var s = t.children[i].getAttribute(n);
		s && r.push(s)
	}
	return r
}, its.x.element.hasClassName = function(t, n) {
	return (new RegExp("(?:^|\\s+)" + n + "(?:\\s+|$)"))
		.test(t.className)
}, its.x.element.hasClassNames = function(t, n) {
	for (var r = 0;
	r < n.length;
	r++) if (!its.x.element.hasClassName(t, n[r])) return !1;
	return !0
}, its.x.element.addClassName = function(t, n) {
	its.isEmpty(its.string.trim(n)) || its.x.element.hasClassName(t, n) || (t.className && t.className != "" ? t.className = t.className + " " + n : t.className = n)
}, its.x.element.classNameStartingWith = function(t, n) {
	var r = its.x.element.classNamesStartingWith(t, n),
		i = r.length ? r[0] : null;
	return i
}, its.x.element.classNamesStartingWith = function(t, n) {
	var r = t.className.split(" "),
		i = [];
	for (var s = 0;
	s < r.length;
	s++) its.string.startsWith(r[s], n) && i.push(r[s]);
	return i
}, its.x.element.removeClassNamesStartingWith = function(t, n) {
	var r = its.x.element.classNamesStartingWith(t, n);
	if (r && r.length) for (var i = 0;
	i < r.length;
	i++) its.x.element.removeClassName(t, r[i])
}, its.x.element.removeClassName = function(t, n) {
	if (its.x.element.hasClassName(t, n)) {
		var r = t.className;
		t.className = its.string.trim(r.replace(new RegExp("(?:^|\\s+)" + n + "(?:\\s+|$)", "g"), " "))
	}
}, its.x.removeClassNames = function(t, n, r) {
	for (var i = 0;
	i < t.length;
	i++)(!r || t[i] != r) && its.x.element.removeClassName(t[i], n)
}, its.x.element.toggleClassName = function(t, n) {
	its.x.element[its.x.element.hasClassName(t, n) ? "removeClassName" : "addClassName"](t, n)
}, its.x.element.replaceClassName = function(t, n, r) {
	its.x.element.removeClassName(t, n), its.x.element.addClassName(t, r)
}, its.x.element.getComputedStyleProperty = function(t, n) {
	return getComputedStyle(t)
		.getPropertyValue(n)
}, its.x.element.getPosition = function(t) {
	var n = t,
		r = new Object;
	r.left = r.top = 0;
	if (n.offsetParent) do r.left += n.offsetLeft, r.top += n.offsetTop;
	while (n = n.offsetParent);
	n = t;
	do {
		if (n === document.body) break;
		r.left -= n.scrollLeft != undefined ? n.scrollLeft : 0, r.top -= n.scrollTop != undefined ? n.scrollTop : 0
	} while (n = n.parentNode);
	return r.right = r.left + t.offsetWidth, r.bottom = r.top + t.offsetHeight, r
}, its.x.element.center = function(t, n) {
	n == "fixed" ? t.style.position = "fixed" : t.style.position = "absolute", t.style.top = "50%", t.style.left = "50%", t.style.marginTop = 0, t.style.marginTop = -(its.x.element.offsetHeightPlusMargin(t) / 2) + "px", t.style.marginLeft = 0, t.style.marginLeft = -(its.x.element.offsetWidthPlusMargin(t) / 2) + "px"
}, its.x.element.offsetWidthPlusMargin = function(t) {
	return t.offsetWidth + its.x.element.marginWidth(t)
}, its.x.element.offsetWidthLessPadding = function(t) {
	return t.offsetWidth - its.x.element.paddingWidth(t)
}, its.x.element.usableContentWidth = function(t) {
	return t.clientWidth - its.x.element.paddingWidth(t)
}, its.x.element.marginWidth = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "margin-left")) + its.string.toInt(its.x.element.getComputedStyleProperty(t, "margin-right"))
}, its.x.element.paddingWidth = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "padding-left")) + its.string.toInt(its.x.element.getComputedStyleProperty(t, "padding-right"))
}, its.x.element.offsetHeightPlusMargin = function(t) {
	return t.offsetHeight + its.x.element.marginHeight(t)
}, its.x.element.offsetHeightLessPadding = function(t) {
	return t.offsetHeight + its.x.element.paddingHeight(t)
}, its.x.element.marginHeight = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "margin-top")) + its.string.toInt(its.x.element.getComputedStyleProperty(t, "margin-bottom"))
}, its.x.element.paddingHeight = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "padding-top")) + its.string.toInt(its.x.element.getComputedStyleProperty(t, "padding-bottom"))
}, its.x.element.lineCount = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "height")) / its.string.toInt(its.x.element.getComputedStyleProperty(t, "line-height"))
}, its.x.element.webkitLineClamp = function(t) {
	return its.string.toInt(its.x.element.getComputedStyleProperty(t, "-webkit-line-clamp"))
}, its.x.element.isMultiLineTruncated = function(t) {
	return its.x.element.webkitLineClamp(t) != null && t.clientHeight < t.scrollHeight
}, its.x.element.isMultiLineTruncatedK2 = function(t) {
	return its.x.element.webkitLineClamp(t) != null && t.clientHeight < t.scrollHeight
}, its.x.element.isVisible = function(t, n) {
	var r = t,
		i = !0,
		s = null,
		o = null,
		u = null,
		a = null,
		f = its.x.element.logger(),
		l = !1,
		c = null;
	while (i && r) {
		c = null, s = getComputedStyle(r);
		if (s) {
			o = s.getPropertyValue("display"), u = s.getPropertyValue("visibility"), a = s.getPropertyValue("opacity"), o === "none" ? c = "display" : u === "hidden" ? c = "visibility" : a == "0" && (c = "opacity");
			if (c) {
				i = !1;
				var h = window.ITSLogger && ITSLogger.level ? ITSLogger.level() == ITSLogger.DEBUG : its.Logger && f.isAnyDebugLevel ? f.isAnyDebugLevel() : !1;
				if (h) {
					var p = l ? "ancestor." : "element.";
					f.debug("isVisible: " + p + "notVisible due to " + c)
				}
			}
		}
		r = n ? r.parentNode : null, r && (l = !0)
	}
	return i
}, its.x.element.isOnscreen = function(t) {
	var n = its.x.element.isVisible(t),
		r = its.x.element.logger();
	if (n) {
		var i = !1,
			s = t.getBoundingClientRect(),
			o = {
				top: s.top,
				bottom: s.bottom,
				left: s.left,
				right: s.right,
				width: s.width,
				height: s.height
			}, u = t.parentNode,
			a = parseInt(t.getAttribute("width"), 10),
			f = parseInt(t.getAttribute("height"), 10);
		a && (o.width = a, o.right = o.left + a), f && (o.height = f, o.bottom = o.top + f);
		while (n && u && !i && its.x.element.isVisible(u)) {
			var l = getComputedStyle(u);
			if (l && l.getPropertyValue("position") == "absolute") i = !0;
			else {
				var c = u.getBoundingClientRect ? u.getBoundingClientRect() : null;
				if (c) {
					var h = !its.geometry.doesRectIntersectRect(o, c);
					h && u.style.overflow == "hidden" && (n = !1), n || r.debug("isOnscreen: elementIsOnscreen = false due to child out of overflow:hidden ancestor")
				}
				u = u.parentNode
			}
		}
		if (n) {
			var p = {
				top: 0,
				bottom: window.innerHeight,
				left: 0,
				right: window.innerWidth
			};
			n = its.geometry.doesRectIntersectRect(o, p), n || r.debug("isOnscreen: elementIsOnscreen = false due to element being outside of window bounds")
		}
	} else r.debug("isOnscreen: image.isVisible() = false");
	return n
}, its.x.element.rectString = function(t, n) {
	var r = t.getBoundingClientRect();
	return n ? n += ". " : n = "", n + t.tagName + " - left:" + r.left + ", right:" + r.right + ", top:" + r.top + ", bottom:" + r.bottom
}, its.x.element.show = function(t, n) {
	t.style.display = n || "block";
	var r = t;
	setTimeout(function() {
		r.style.opacity = "1"
	}, 0)
}, its.x.element.hide = function(t) {
	var n = function(e) {
		e.target.style.display = "none", e.target.removeEventListener("webkitTransitionEnd", n, !1)
	};
	t.style.opacity = "0", its.x.element.getComputedStyleProperty(t, "-webkit-transition-duration") !== "0s" ? t.addEventListener("webkitTransitionEnd", n, !1) : t.style.display = "none"
}, its.x.element.toggle = function(t, n) {
	var r = t.style.display == "none";
	return r ? its.x.element.show(t, n) : its.x.element.hide(t), r
}, its.x.element.moveToBottom = function(t) {
	var n = t.parentNode;
	n && (its.x.element.remove(t), n.appendChild(t))
}, its.x.element.insertBeforeElement = function(t, n) {
	n && t.parentNode && t.parentNode.insertBefore(n, t)
}, its.x.element.insertAfter = function(t, n) {
	n && t.parentNode && t.parentNode.insertBefore(n, t.nextSibling)
}, its.x.element.remove = function(t) {
	t.parentNode && t.parentNode.removeChild(t)
}, its.x.element.clear = function(t) {
	t.innerHTML = ""
}, its.x.element.replace = function(t, n) {
	if (t.parentNode) return t.parentNode.replaceChild(n, t)
}, its.x.element.localSearch = function(t, n) {
	var r = t,
		i;
	do i = r.querySelectorAll(n), r = r.parentNode;
	while (r && r != document && i.length < 1);
	return i
}, its.x.element.elementOrAncestorByFunction = function(t, n) {
	while (t && t != document) {
		if (n(t)) return t;
		t = t.parentNode
	}
	return null
}, its.x.element.parentByAttributeName = function(t, n) {
	return its.x.element.elementOrAncestorByFunction(t.parentNode, function(e) {
		return e.hasAttribute(n)
	})
}, its.x.element.parentByClassName = function(t, n) {
	return its.x.element.elementOrAncestorByFunction(t.parentNode, function(e) {
		return its.x.element.hasClassName(e, n)
	})
}, its.x.element.parentByTagName = function(t, n) {
	return its.x.element.elementOrAncestorByFunction(t.parentNode, function(e) {
		return e.tagName.toLowerCase() === n.toLowerCase()
	})
}, its.x.element.parentBySelector = function(t, n) {
	var r = document.querySelectorAll(n),
		s = r.length;
	return its.x.element.elementOrAncestorByFunction(t, function(e) {
		for (i = 0;
		i < s;
		i++) if (r[i] === e) return !0;
		return !1
	})
}, its.x.element.containsElement = function(t, n) {
	return its.x.element.elementOrAncestorByFunction(n, function(e) {
		return e === t
	}) || !1
}, its.x.element.itsInnerText = function(t, n) {
	var r = t.innerText;
	return its.isEmpty(r) && typeof t.textContent != "undefined" && (r = t.textContent, n || (r = its.string.trim(r))), r
}, window.its || (window.its = {}), its.x || (its.x = {}), its.x.querySelectorAll = function(t, n) {
	return acme.query(n, t)
}, its.x.querySelector = function(t, n) {
	var r = its.x.querySelectorAll(t, n);
	return r && r.length > 0 ? r[0] : r
}, typeof dojo != "undefined" ? (dojo.provide("dojo._base.query"), dojo.require("dojo._base.NodeList"), dojo.require("dojo._base.lang")) : !this.acme && !this.queryPortability && function() {
	acme = {
		trim: function(e) {
			e = e.replace(/^\s+/, "");
			for (var t = e.length - 1;
			t >= 0;
			t--) if (/\S/.test(e.charAt(t))) {
				e = e.substring(0, t + 1);
				break
			}
			return e
		},
		forEach: function(e, t, n) {
			if (!e || !e.length) return;
			for (var r = 0, i = e.length;
			r < i; ++r) t.call(n || window, e[r], r, e)
		},
		byId: function(e, t) {
			return typeof e == "string" ? (t || document)
				.getElementById(e) : e
		},
		doc: document,
		NodeList: Array
	};
	var e = navigator,
		t = e.userAgent,
		n = e.appVersion,
		r = parseFloat(n);
	acme.isOpera = t.indexOf("Opera") >= 0 ? r : undefined, acme.isKhtml = n.indexOf("Konqueror") >= 0 ? r : undefined, acme.isWebKit = parseFloat(t.split("WebKit/")[1]) || undefined, acme.isChrome = parseFloat(t.split("Chrome/")[1]) || undefined, acme.isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(t);
	var i = Math.max(n.indexOf("WebKit"), n.indexOf("Safari"), 0);
	if (i && !acme.isChrome) {
		acme.isSafari = parseFloat(n.split("Version/")[1]);
		if (!acme.isSafari || parseFloat(n.substr(i + 7)) <= 419.3) acme.isSafari = 2
	}
	document.all && !acme.isOpera && (acme.isIE = parseFloat(n.split("MSIE ")[1]) || undefined), Array._wrap = function(e) {
		return e
	}
}(),

function(e) {
	var t = e.trim,
		n = e.forEach,
		r = e._NodeListCtor = e.NodeList,
		i = function() {
			return e.doc
		}, s = (e.isWebKit || e.isMozilla) && i()
			.compatMode == "BackCompat",
		o = i()
			.firstChild.children ? "children" : "childNodes",
		u = ">~+",
		a = !1,
		f = function() {
			return !0
		}, l = function(e) {
			u.indexOf(e.slice(-1)) >= 0 ? e += " * " : e += " ";
			var n = function(n, r) {
				return t(e.slice(n, r))
			}, r = [],
				i = -1,
				s = -1,
				o = -1,
				f = -1,
				l = -1,
				c = -1,
				h = -1,
				p = "",
				d = "",
				v, m = 0,
				g = e.length,
				y = null,
				b = null,
				w = function() {
					if (h >= 0) {
						var e = h == m ? null : n(h, m);
						y[u.indexOf(e) < 0 ? "tag" : "oper"] = e, h = -1
					}
				}, E = function() {
					c >= 0 && (y.id = n(c, m)
						.replace(/\\/g, ""), c = -1)
				}, S = function() {
					l >= 0 && (y.classes.push(n(l + 1, m)
						.replace(/\\/g, "")), l = -1)
				}, x = function() {
					E(), w(), S()
				}, T = function() {
					x(), f >= 0 && y.pseudos.push({
						name: n(f + 1, m)
					}), y.loops = y.pseudos.length || y.attrs.length || y.classes.length, y.oquery = y.query = n(v, m), y.otag = y.tag = y.oper ? null : y.tag || "*", y.tag && (y.tag = y.tag.toUpperCase()), r.length && r[r.length - 1].oper && (y.infixOper = r.pop(), y.query = y.infixOper.query + " " + y.query), r.push(y), y = null
				};
			for (;
			p = d, d = e.charAt(m), m < g;
			m++) {
				if (p == "\\") continue;
				y || (v = m, y = {
					query: null,
					pseudos: [],
					attrs: [],
					classes: [],
					tag: null,
					oper: null,
					id: null,
					getTag: function() {
						return a ? this.otag : this.tag
					}
				}, h = m);
				if (i >= 0) {
					if (d == "]") {
						b.attr ? b.matchFor = n(o || i + 1, m) : b.attr = n(i + 1, m);
						var N = b.matchFor;
						N && (N.charAt(0) == '"' || N.charAt(0) == "'") && (b.matchFor = N.slice(1, - 1)), y.attrs.push(b), b = null, i = o = -1
					} else if (d == "=") {
						var C = "|~^$*".indexOf(p) >= 0 ? p : "";
						b.type = C + d, b.attr = n(i + 1, m - C.length), o = m + 1
					}
				} else s >= 0 ? d == ")" && (f >= 0 && (b.value = n(s + 1, m)), f = s = -1) : d == "#" ? (x(), c = m + 1) : d == "." ? (x(), l = m) : d == ":" ? (x(), f = m) : d == "[" ? (x(), i = m, b = {}) : d == "(" ? (f >= 0 && (b = {
					name: n(f + 1, m),
					value: null
				}, y.pseudos.push(b)), s = m) : d == " " && p != d && T()
			}
			return r
		}, c = function(e, t) {
			return e ? t ? function() {
				return e.apply(window, arguments) && t.apply(window, arguments)
			} : e : t
		}, h = function(e, t) {
			var n = t || [];
			return e && n.push(e), n
		}, p = function(e) {
			return 1 == e.nodeType
		}, d = "",
		v = function(e, t) {
			return e ? t == "class" ? e.className || d : t == "for" ? e.htmlFor || d : t == "style" ? e.style.cssText || d : (a ? e.getAttribute(t) : e.getAttribute(t, 2)) || d : d
		}, m = {
			"*=": function(e, t) {
				return function(n) {
					return v(n, e)
						.indexOf(t) >= 0
				}
			},
			"^=": function(e, t) {
				return function(n) {
					return v(n, e)
						.indexOf(t) == 0
				}
			},
			"$=": function(e, t) {
				var n = " " + t;
				return function(n) {
					var r = " " + v(n, e);
					return r.lastIndexOf(t) == r.length - t.length
				}
			},
			"~=": function(e, t) {
				var n = " " + t + " ";
				return function(t) {
					var r = " " + v(t, e) + " ";
					return r.indexOf(n) >= 0
				}
			},
			"|=": function(e, t) {
				var n = " " + t + "-";
				return function(r) {
					var i = " " + v(r, e);
					return i == t || i.indexOf(n) == 0
				}
			},
			"=": function(e, t) {
				return function(n) {
					return v(n, e) == t
				}
			}
		}, g = typeof i()
			.firstChild.nextElementSibling == "undefined",
		y = g ? "nextSibling" : "nextElementSibling",
		b = g ? "previousSibling" : "previousElementSibling",
		w = g ? p : f,
		E = function(e) {
			while (e = e[b]) if (w(e)) return !1;
			return !0
		}, S = function(e) {
			while (e = e[y]) if (w(e)) return !1;
			return !0
		}, x = function(e) {
			var t = e.parentNode,
				n = 0,
				r = t[o],
				i = e._i || -1,
				s = t._l || -1;
			if (!r) return -1;
			var u = r.length;
			if (s == u && i >= 0 && s >= 0) return i;
			t._l = u, i = -1;
			for (var a = t.firstElementChild || t.firstChild;
			a;
			a = a[y]) w(a) && (a._i = ++n, e === a && (i = n));
			return i
		}, T = function(e) {
			return !(x(e) % 2)
		}, N = function(e) {
			return x(e) % 2
		}, C = {
			checked: function(e, t) {
				return function(e) {
					return "checked" in e ? !! e.checked : !! e.selected
				}
			},
			"first-child": function() {
				return E
			},
			"last-child": function() {
				return S
			},
			"only-child": function(e, t) {
				return function(e) {
					return E(e) ? S(e) ? !0 : !1 : !1
				}
			},
			empty: function(e, t) {
				return function(e) {
					var t = e.childNodes,
						n = e.childNodes.length;
					for (var r = n - 1;
					r >= 0;
					r--) {
						var i = t[r].nodeType;
						if (i === 1 || i == 3) return !1
					}
					return !0
				}
			},
			contains: function(e, t) {
				var n = t.charAt(0);
				if (n == '"' || n == "'") t = t.slice(1, - 1);
				return function(e) {
					return e.innerHTML.indexOf(t) >= 0
				}
			},
			not: function(e, t) {
				var n = l(t)[0],
					r = {
						el: 1
					};
				n.tag != "*" && (r.tag = 1), n.classes.length || (r.classes = 1);
				var i = L(n, r);
				return function(e) {
					return !i(e)
				}
			},
			"nth-child": function(e, t) {
				var n = parseInt;
				if (t == "odd") return N;
				if (t == "even") return T;
				if (t.indexOf("n") != -1) {
					var r = t.split("n", 2),
						i = r[0] ? r[0] == "-" ? -1 : n(r[0]) : 1,
						s = r[1] ? n(r[1]) : 0,
						o = 0,
						u = -1;
					i > 0 ? s < 0 ? s = s % i && i + s % i : s > 0 && (s >= i && (o = s - s % i), s %= i) : i < 0 && (i *= -1, s > 0 && (u = s, s %= i));
					if (i > 0) return function(e) {
						var t = x(e);
						return t >= o && (u < 0 || t <= u) && t % i == s
					};
					t = s
				}
				var a = n(t);
				return function(e) {
					return x(e) == a
				}
			}
		}, k = e.isIE ? function(e) {
			var t = e.toLowerCase();
			return t == "class" && (e = "className"),

			function(n) {
				return a ? n.getAttribute(e) : n[e] || n[t]
			}
		} : function(e) {
			return function(t) {
				return t && t.getAttribute && t.hasAttribute(e)
			}
		}, L = function(e, t) {
			if (!e) return f;
			t = t || {};
			var r = null;
			return "el" in t || (r = c(r, p)), "tag" in t || e.tag != "*" && (r = c(r, function(t) {
				return t && t.tagName == e.getTag()
			})), "classes" in t || n(e.classes, function(e, t, n) {
				var i = new RegExp("(?:^|\\s)" + e + "(?:\\s|$)");
				r = c(r, function(e) {
					return i.test(e.className)
				}), r.count = t
			}), "pseudos" in t || n(e.pseudos, function(e) {
				var t = e.name;
				C[t] && (r = c(r, C[t](t, e.value)))
			}), "attrs" in t || n(e.attrs, function(e) {
				var t, n = e.attr;
				e.type && m[e.type] ? t = m[e.type](n, e.matchFor) : n.length && (t = k(n)), t && (r = c(r, t))
			}), "id" in t || e.id && (r = c(r, function(t) {
				return !!t && t.id == e.id
			})), r || "default" in t || (r = f), r
		}, A = function(e) {
			return function(t, n, r) {
				while (t = t[y]) {
					if (g && !p(t)) continue;
					(!r || Q(t, r)) && e(t) && n.push(t);
					break
				}
				return n
			}
		}, O = function(e) {
			return function(t, n, r) {
				var i = t[y];
				while (i) {
					if (w(i)) {
						if (r && !Q(i, r)) break;
						e(i) && n.push(i)
					}
					i = i[y]
				}
				return n
			}
		}, M = function(e) {
			return e = e || f,

			function(t, n, r) {
				var i, s = 0,
					u = t[o];
				while (i = u[s++]) w(i) && (!r || Q(i, r)) && e(i, s) && n.push(i);
				return n
			}
		}, _ = function(e, t) {
			var n = e.parentNode;
			while (n) {
				if (n == t) break;
				n = n.parentNode
			}
			return !!n
		}, D = {}, P = function(t) {
			var n = D[t.query];
			if (n) return n;
			var r = t.infixOper,
				o = r ? r.oper : "",
				u = L(t, {
					el: 1
				}),
				a = t.tag,
				l = "*" == a,
				c = i()
					.getElementsByClassName;
			if (!o) if (t.id) u = !t.loops && l ? f : L(t, {
				el: 1,
				id: 1
			}), n = function(n, r) {
				var i = e.byId(t.id, n.ownerDocument || n);
				if (!i || !u(i)) return;
				if (9 == n.nodeType) return h(i, r);
				if (_(i, n)) return h(i, r)
			};
			else if (c && /\{\s*\[native code\]\s*\}/.test(String(c)) && t.classes.length && !s) {
				u = L(t, {
					el: 1,
					classes: 1,
					id: 1
				});
				var p = t.classes.join(" ");
				n = function(e, t, n) {
					var r = h(0, t),
						i, s = 0,
						o = e.getElementsByClassName(p);
					while (i = o[s++]) u(i, e) && Q(i, n) && r.push(i);
					return r
				}
			} else !l && !t.loops ? n = function(e, n, r) {
				var i = h(0, n),
					s, o = 0,
					u = e.getElementsByTagName(t.getTag());
				while (s = u[o++]) Q(s, r) && i.push(s);
				return i
			} : (u = L(t, {
				el: 1,
				tag: 1,
				id: 1
			}), n = function(e, n, r) {
				var i = h(0, n),
					s, o = 0,
					a = e.getElementsByTagName(t.getTag());
				while (s = a[o++]) u(s, e) && Q(s, r) && i.push(s);
				return i
			});
			else {
				var d = {
					el: 1
				};
				l && (d.tag = 1), u = L(t, d), "+" == o ? n = A(u) : "~" == o ? n = O(u) : ">" == o && (n = M(u))
			}
			return D[t.query] = n
		}, H = function(e, t) {
			var n = h(e),
				r, i, s, o = t.length,
				u, a;
			for (var f = 0;
			f < o;
			f++) {
				a = [], r = t[f], i = n.length - 1, i > 0 && (u = {}, a.nozip = !0);
				var l = P(r);
				for (var c = 0;
				s = n[c];
				c++) l(s, a, u);
				if (!a.length) break;
				n = a
			}
			return a
		}, B = {}, j = {}, F = function(e) {
			var n = l(t(e));
			if (n.length == 1) {
				var i = P(n[0]);
				return function(e) {
					var t = i(e, new r);
					return t && (t.nozip = !0), t
				}
			}
			return function(e) {
				return H(e, n)
			}
		}, I = navigator.userAgent,
		q = "WebKit/",
		R = e.isWebKit && I.indexOf(q) > 0 && parseFloat(I.split(q)[1]) > 528,
		U = e.isIE ? "commentStrip" : "nozip",
		z = "querySelectorAll",
		W = !! i()[z] && (!e.isSafari || e.isSafari > 3.1 || R),
		X = /n\+\d|([^ ])?([>~+])([^ =])?/g,
		V = function(e, t, n, r) {
			return n ? (t ? t + " " : "") + n + (r ? " " + r : "") : e
		}, $ = function(t, n) {
			t = t.replace(X, V);
			if (W) {
				var r = j[t];
				if (r && !n) return r
			}
			var i = B[t];
			if (i) return i;
			var o = t.charAt(0),
				a = -1 == t.indexOf(" ");
			t.indexOf("#") >= 0 && a && (n = !0);
			var f = W && !n && u.indexOf(o) == -1 && (!e.isIE || t.indexOf(":") == -1) && !(s && t.indexOf(".") >= 0) && t.indexOf(":contains") == -1 && t.indexOf(":checked") == -1 && t.indexOf("|=") == -1;
			if (f) {
				var l = u.indexOf(t.charAt(t.length - 1)) >= 0 ? t + " *" : t;
				return j[t] = function(e) {
					try {
						if (9 != e.nodeType && !a) throw "";
						var n = e[z](l);
						return n[U] = !0, n
					} catch (r) {
						return $(t, !0)(e)
					}
				}
			}
			var c = t.split(/\s*,\s*/);
			return B[t] = c.length < 2 ? F(t) : function(e) {
				var t = 0,
					n = [],
					r;
				while (r = c[t++]) n = n.concat(F(r)(e));
				return n
			}
		}, J = 0,
		K = e.isIE ? function(e) {
			return a ? e.getAttribute("_uid") || e.setAttribute("_uid", ++J) || J : e.uniqueID
		} : function(e) {
			return e._uid || (e._uid = ++J)
		}, Q = function(e, t) {
			if (!t) return 1;
			var n = K(e);
			return t[n] ? 0 : t[n] = 1
		}, G = "_zipIdx",
		Y = function(t) {
			if (t && t.nozip) return r._wrap ? r._wrap(t) : t;
			var n = new r;
			if (!t || !t.length) return n;
			t[0] && n.push(t[0]);
			if (t.length < 2) return n;
			J++;
			if (e.isIE && a) {
				var i = J + "";
				t[0].setAttribute(G, i);
				for (var s = 1, o;
				o = t[s];
				s++) t[s].getAttribute(G) != i && n.push(o), o.setAttribute(G, i)
			} else if (e.isIE && t.commentStrip) try {
				for (var s = 1, o;
				o = t[s];
				s++) p(o) && n.push(o)
			} catch (u) {} else {
				t[0] && (t[0][G] = J);
				for (var s = 1, o;
				o = t[s];
				s++) t[s][G] != J && n.push(o), o[G] = J
			}
			return n
		};
	e.query = function(t, n) {
		r = e._NodeListCtor;
		if (!t) return new r;
		if (t.constructor == r) return t;
		if (typeof t != "string") return new r(t);
		if (typeof n == "string") {
			n = e.byId(n);
			if (!n) return new r
		}
		n = n || i();
		var s = n.ownerDocument || n.documentElement;
		a = n.contentType && n.contentType == "application/xml" || e.isOpera && (n.doctype || s.toString() == "[object XMLDocument]") || !! s && (e.isIE ? s.xml : n.xmlVersion || s.xmlVersion);
		var o = $(t)(n);
		return o && o.nozip && !r._wrap ? o : Y(o)
	}, e.query.pseudos = C, e._filterQueryResult = function(t, n) {
		var r = new e._NodeListCtor,
			i = L(l(n)[0]);
		for (var s = 0, o;
		o = t[s];
		s++) i(o) && r.push(o);
		return r
	}
}(this.queryPortability || this.acme || dojo), ITSSpriteAnimator.PLAYSTATE_STOPPED = "stopped", ITSSpriteAnimator.PLAYSTATE_PLAYING = "playing", ITSSpriteAnimator.PLAYSTATE_PAUSED = "paused", ITSSpriteAnimator.prototype.playState = function() {
	return this.playState
}, ITSSpriteAnimator.prototype.play = function() {
	this.playing != ITSSpriteAnimator.PLAYSTATE_PLAYING && this.totalMilliseconds && (this.playing = ITSSpriteAnimator.PLAYSTATE_PLAYING, this.ourTimer = window.setInterval(bind(this, function() {
		this.currentFrameIndex++, this.currentFrameIndex >= this.frameCount && (this.loopInterval ? this.currentFrameIndex = 0 : this.stop()), this.anElement.style.backgroundPosition = "-" + this.currentFrameIndex * this.width + "px 0px"
	}), this.perFrameInterval))
}, ITSSpriteAnimator.prototype.pause = function() {
	this.playing = PLAYSTATE_PAUSED, window.clearInterval(this.ourTimer)
}, ITSSpriteAnimator.prototype.stop = function() {
	this.playing = ITSSpriteAnimator.PLAYSTATE_STOPPED, window.clearInterval(this.ourTimer), this.currentFrameIndex = 0, this.anElement.style.backgroundPosition = "-" + this.currentFrameIndex * this.width + "px 0px"
}, window.its || (window.its = {}), window.its.client || (window.its.client = {}), window.its.client.log || (window.its.client.log = function(e) {
	window.console && console.log && console.log(e)
}), window.ITSMetrics || (window.ITSMetrics = {}), ITSMetrics.decodeMetricsPassThruParams = function(e) {
	if (e == null) return null;
	var t = its.string.xmlUnescape(e),
		n = its.url.parseQueryParams(t);
	return its.client.log(n), n
}, ITSMetrics.encodeMetricsPassThruParams = function(e) {
	if (e == null) return null;
	var t = "",
		n = 0;
	for (var r in e) {
		var i = e[r];
		n > 0 && (t += "&"), t += r += "=" + encodeURIComponent(i), n++
	}
	return its.string.xmlEscape(t)
}, ITSMetrics.omniturePageName = function() {
	return ITSMetrics.omniture && ITSMetrics.omniture.pageName ? ITSMetrics.omniture.pageName : null
}, ITSMetrics.omnitureChannel = function() {
	return ITSMetrics.omniture && ITSMetrics.omniture.channel ? ITSMetrics.omniture.channel : null
}, ITSMetrics.processQueryParameterInfoInCurrentRequest = function(e) {
	var t = its.url.queryParamsDict();
	if (!its.isEmpty(t)) {
		e.campaign = t.v0;
		var n = {}, r = ITSMetrics.decodeMetricsPassThruParams(t["ign-mpt"]);
		r && (n = r);
		var i = ITSMetrics.decodeMetricsPassThruParams(t["gc-mpt"]);
		for (var s in i) i.hasOwnProperty(s) && (n[s] = i[s]);
		for (var s in n) if (s.length >= 1 && s.length <= 3) {
			var o = parseInt(s.substr(1), 10);
			isNaN(o) || (s[0] == "c" ? e["prop" + o] = n[s] : s[0] == "v" && (o === 0 ? e.campaign = n[s] : e["eVar" + o] = n[s]))
		}
		var u = t["ign-msr"];
		if (u) {
			its.client.log("Found SEO Referrer: " + u);
			var a = ITSMetrics._parseHostAndSearchTerm(u);
			its.client.log("Referrer domain: " + a.hostname + ", search term: " + a.searchTerm), a.hostname && a.hostname.indexOf("itunes.apple.com") ? (console.log("Setting seo referrer cookie: " + u), its.cookies.set("seoReferrer", u, its.cookies.EXPIRE_ONE_DAY, null, "itunes.apple.com"), e.prop23 = a.hostname, e.eVar23 = a.hostname, e.prop24 = a.searchTerm, e.eVar24 = a.searchTerm) : its.client.log("SEO Referrer's hostname is an SEO Page.  Ignoring")
		}
	}
}, ITSMetrics.userAgentForMetrics = function() {
	var e = navigator.userAgent;
	return e.indexOf("å‘©") == 0 && (e = "iTunes Pre 9.2 (Windows Version Unknown)"), e
}, ITSMetrics.gameCenterUserAgent = "GameCenter", ITSMetrics.gameCenterPrefix = ITSMetrics.gameCenterUserAgent + "-", ITSMetrics.isGameCenter = function(e) {
	return e.length > ITSMetrics.gameCenterUserAgent.length && e.substr(0, ITSMetrics.gameCenterUserAgent.length) == ITSMetrics.gameCenterUserAgent
}, ITSMetrics._parseHostAndSearchTerm = function(t) {
	var n = {}, r = its.url.parseHostname(t),
		i = null,
		s = null;
	return r.indexOf("www.google.") >= 0 || r.indexOf(".ask.com") >= 0 || r == "www.bing.com" ? i = "q" : r.indexOf(".yahoo.com") >= 0 && (i = "p"), i && (s = its.url.queryParamValue(i, t), s && (n.searchTerm = s)), n.hostname = r, n
}, ITSMetrics.metricsId = function() {
	return its.cookies.get(ITSMetrics.OMNITURE_COOKIE_NAME)
}, window.ITSMetrics || (window.ITSMetrics = {}), ITSMetrics._shouldFakeUserAgentVersion = function() {
	var t = "MacAppStore/|CastleSettings/|iTunes Pre 9.",
		n = ITSMetrics.userAgentForMetrics(),
		r = n && n.match(t);
	return r
}, ITSMetrics.createBaselineOmnitureObject = function() {
	function n(e) {
		ITSMetrics._shouldFakeUserAgentVersion() && (e.apv = 10), ITSMetrics.shouldTrackBrowserPlugins || (e.plugins = "")
	}
	var e = "applesuperglobal",
		t = s_gi(e);
	return t.charSet = "UTF-8", ITSMetrics.reportingSuite && (t.hier5 = ITSMetrics.reportingSuite), t.cookieLifetime = 15778463, t.trackDownloadLinks = !1, t.trackExternalLinks = !1, t.trackInlineStats = !1, t.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls", t.linkInternalFilters = "javascript:,itunes,apple", t.linkLeaveQueryString = !1, t.linkTrackVars = "None", t.linkTrackEvents = "None", t.usePlugins = !0, t.doPlugins = n, t.trackingServer = "metrics.apple.com", t.trackingServerSecure = "securemetrics.apple.com", t.dc = "112", t.pingImage = null, t
};
var s_code = "",
	s_objectID;
window.its || (window.its = {}), its.useragent || (its.useragent = {});
var DigitSplittingRegExp = /(\d+|\D+)/g,
	DigitMatchingRegexp = /\d/;
its.useragent.compareVersionStrings = function(t, n) {
	t || (t = ""), n || (n = "");
	var r = t.match(DigitSplittingRegExp),
		i = n.match(DigitSplittingRegExp),
		s = 0,
		o = 0;
	do {
		var u = r && r[o] ? 1 : 0,
			a = i && i[o] ? 1 : 0;
		if (u == 0 || a == 0) {
			s = u - a;
			break
		}
		var f = r[o],
			l = i[o];
		DigitMatchingRegexp.test(f.charAt(0)) && DigitMatchingRegexp.test(l.charAt(0)) ? s = parseInt(f) - parseInt(l) : s = f < l ? -1 : f > l ? 1 : 0, o += 1
	} while (s == 0);
	return s
}, its.useragent.versionMeetsMinRequirements = function(t, n) {
	return its.useragent.compareVersionStrings(t, n) >= 0
}, its.useragent.macOsVersion = function(t) {
	t || (t = navigator.userAgent);
	var n = t.match(/Mac OS X ([\d_\-\.]+)/);
	return n && n.length > 1 ? n[1] : null
}, its.registerElementBinding = function(t, n, r, i) {
	var s = new _ITSBindingInfo(t, n, r, i),
		o = s.hashKey();
	_itsControllersToBind[o] = s, its._bindingPageLoaded && its._bindControllers()
}, its.bindToElements = function(t, n, r, i) {
	t.__boundElements = n;
	var s = n.length;
	for (var o = 0;
	o < s;
	o++) {
		var u = null,
			a = n[o];
		if (i) u = t;
		else {
			function f(e) {
				this.__domElement = e, e.__controller = this, this.constructor = t, this.prototype = t.constructor.prototype, t.apply(this, arguments)
			}
			f.prototype = t.prototype, u = new f(a)
		}
		t.bindToElement ? t.bindToElement(u, a, r, i) : !i && u.bindToElement ? u.bindToElement(u, a, r, i) : its.bindToElement(u, a, r, i)
	}
}, its.bindToElement = function(t, n, r, i) {
	for (var s in r) {
		var o = function() {
			var e = r[s];
			i ? its.x.addEventListener(n, s, function() {
				t[e](this)
			}) : its.x.addEventListener(n, s, bind(t, e))
		};
		o()
	}
}, its._bindControllers = function() {
	its._bindingPageLoaded = !0;
	for (var t in _itsControllersToBind) {
		var n = _itsControllersToBind[t],
			r = its.x.querySelectorAll(document, n.selector);
		r && r.length ? n.perElementControllerClass.bindToElements ? n.perElementControllerClass.bindToElements(n.perElementControllerClass, r, bindingDict, isStaticBinding) : its.bindToElements(n.perElementControllerClass, r, n.bindingDict, n.isStaticBinding) : its.dev && its.client.debug("WARNING: registerElementBinding()/bindToElements(" + classNameForObject(n.perElementControllerClass) + ", " + n.selector + "). No objects found matching that selector.")
	}
	_itsControllersToBind = {}
}, _ITSBindingInfo.prototype.hashKey = function() {
	return classNameForObject(this.perElementControllerClass) + "_" + this.selector
};
var _itsControllersToBind = {};
its.x.notifyOfDOMContentLoaded(its._bindControllers), window.ITSMediaPlayer || (window.ITSMediaPlayer = {}), ITSMediaPlayer.events || (ITSMediaPlayer.events = {}), its.x.extendWithEventDispatching(ITSMediaPlayer), ITSMediaPlayer.events.PLAYBACK_STARTED = "playbackStarted", ITSMediaPlayer.events.PLAYBACK_PAUSED = "playbackPaused", ITSMediaPlayer.events.PLAYBACK_ENDED = "playbackEnded", ITSMediaPlayer.events.CAN_PLAY = "canPlay", ITSMediaPlayer._QUICK_TIME_PLAYER = "quick-time", ITSMediaPlayer._HTML5_AUDIO_PLAYER = "html5-audio", ITSMediaPlayer._ID = "media-player", ITSMediaPlayer._QUICK_TIME_VERSION_SUPPORTING_DOM_EVENTS = 721, ITSMediaPlayer._MIN_QUICK_TIME_VERSION_WIN_SETURL_BROKEN = 766, ITSMediaPlayer._MAX_QUICK_TIME_VERSION_WIN_SETURL_BROKEN = 768, ITSMediaPlayer._DEBUG = !1, ITSMediaPlayer._mediaPlayer = "undefined", ITSMediaPlayer._mediaPlayerTypeToUse = "undefined", ITSMediaPlayer._timers = new Array, ITSMediaPlayer._qtVersion = "undefined", its.x.isWindows() && its.x.isFirefox() ? ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds = 500 : ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds = 1e3, ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds = 50, ITSMediaPlayer._clearTimers = function() {
	if (ITSMediaPlayer._timers) {
		ITSMediaPlayer._DEBUG && console.log("clearing timers");
		for (var t = 0;
		t < ITSMediaPlayer._timers.length;
		t++) clearTimeout(ITSMediaPlayer._timers[t]);
		ITSMediaPlayer._timers = new Array
	}
}, ITSMediaPlayer.shouldRecreateMediaPlayerToPlay = function() {
	return ITSMediaPlayer.isQuickTimeBeingUsed() && ITSMediaPlayer._quickTimeVersion() && its.x.isWindows() && ITSMediaPlayer._quickTimeVersion() >= ITSMediaPlayer._MIN_QUICK_TIME_VERSION_WIN_SETURL_BROKEN && ITSMediaPlayer._quickTimeVersion() <= ITSMediaPlayer._MAX_QUICK_TIME_VERSION_WIN_SETURL_BROKEN ? !0 : !1
}, ITSMediaPlayer.stop = function() {
	if (ITSMediaPlayer._played) {
		ITSMediaPlayer._stopPlayTime = (new Date)
			.getTime(), ITSMediaPlayer._clearTimers();
		var t = ITSMediaPlayer._mediaPlayer;
		t && (ITSMediaPlayer.isQuickTimeBeingUsed() ? t.Stop() : ITSMediaPlayer.isHtml5AudioTagBeingUsed() && (ITSMediaPlayer._pausePlayTime = (new Date)
			.getTime(), t.pause(), t.src = ""))
	}
}, ITSMediaPlayer._tryToPlay = function() {
	var t = ITSMediaPlayer._mediaPlayer,
		n = its.x.isWindows() && its.x.isFirefox();
	n && t._qtInitializationElapsedPollingMilliSeconds >= ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds || !n && t.GetPluginStatus() == "Complete" ? (ITSMediaPlayer._internalCanPlayCallback(), ITSMediaPlayer._timers.push(window.setTimeout(ITSMediaPlayer._internalPlaybackEndedCallback, ITSMediaPlayer.durationInSeconds() * 1e3)), ITSMediaPlayer.reallyPlay()) : (t._qtInitializationElapsedPollingMilliSeconds || (t._qtInitializationElapsedPollingMilliSeconds = 0), t._qtInitializationElapsedPollingMilliSeconds += ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds, t._qtInitializationElapsedPollingMilliSeconds <= ITSMediaPlayer._qtInitializationCompleteTimeoutMilliSeconds && ITSMediaPlayer._timers.push(window.setTimeout(ITSMediaPlayer._tryToPlay, ITSMediaPlayer._qtInitializationPollingFrequencyMilliSeconds)))
}, ITSMediaPlayer.play = function(t) {
	ITSMediaPlayer._played = !0, ITSMediaPlayer._clearTimers(), ITSMediaPlayer.shouldRecreateMediaPlayerToPlay() ? (ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl(t, !1), ITSMediaPlayer._tryToPlay()) : ITSMediaPlayer.reallyPlay(t)
}, ITSMediaPlayer.reallyPlay = function(t) {
	var n = ITSMediaPlayer._mediaPlayer;
	if (n) {
		ITSMediaPlayer._registerCallbacks();
		if (ITSMediaPlayer.isQuickTimeBeingUsed()) {
			t && !ITSMediaPlayer.shouldRecreateMediaPlayerToPlay() && n.SetURL(t);
			var r = n.GetVolume();
			n.SetVolume(0), ITSMediaPlayer._startPlayTime = (new Date)
				.getTime(), n.Play(), r && (ITSMediaPlayer._DEBUG && console.log(n.GetVolume()), ITSMediaPlayer._timers.push(setTimeout(function() {
				ITSMediaPlayer._setFadeInForQTPlayer(n, r, 10)
			}, 0)));
			var i = n.GetDuration(),
				s = n.GetTimeScale();
			ITSMediaPlayer._DEBUG && (console.log("duration: " + i), console.log("timeScale: " + s));
			if (i && s) {
				var o = i / s * 1e3 - 4e3;
				o > 0 && (ITSMediaPlayer._DEBUG && console.log(" fadeStart: " + o), ITSMediaPlayer._timers.push(setTimeout(function() {
					ITSMediaPlayer._setFadeOutForQTPlayer(n, 10)
				}, o)))
			}
		} else ITSMediaPlayer.isHtml5AudioTagBeingUsed() && (n.src = t, its.x.addEventListener(n, "loadedmetadata", ITSMediaPlayer._startFadeOutForHTML5AudioPlayer), ITSMediaPlayer._startLoadTimeHtml5 = (new Date)
			.getTime(), n.load(), n.volume = .1, ITSMediaPlayer._startPlayTime = (new Date)
			.getTime(), n.play(), ITSMediaPlayer._timers.push(setTimeout(function() {
			ITSMediaPlayer._setFadeInForHTML5AudioPlayer(n, 1, .01)
		}, 0)))
	}
}, ITSMediaPlayer.durationInSeconds = function() {
	var t = ITSMediaPlayer._mediaPlayer,
		n = 0;
	return ITSMediaPlayer.isQuickTimeBeingUsed() ? (n = t.GetDuration() / t.GetTimeScale(), ITSMediaPlayer._DEBUG && its.client.debug("its-media-player: ITSMediaPlayer.QUICKTIME.durationInSeconds: " + Math.floor(Math.ceil(n) / 60) + ":" + (Math.round(Math.ceil(n) % 60) < 10 ? "0" + Math.round(Math.ceil(n) % 60) : Math.round(Math.ceil(n) % 60)) + "sec")) : ITSMediaPlayer.isHtml5AudioTagBeingUsed() && (n = t.duration, ITSMediaPlayer._DEBUG && its.client.debug("its-media-player: ITSMediaPlayer.HTML5.durationInSeconds: " + Math.floor(Math.ceil(n) / 60) + ":" + (Math.round(Math.ceil(n) % 60) < 10 ? "0" + Math.round(Math.ceil(n) % 60) : Math.round(Math.ceil(n) % 60)) + "sec")), Math.ceil(n)
}, ITSMediaPlayer._startFadeOutForHTML5AudioPlayer = function(t) {
	var n = t.target,
		r = n.duration;
	if (r) {
		var i = r * 1e3 - 4e3;
		i > 0 && ITSMediaPlayer._timers.push(setTimeout(function() {
			ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(n, .1)
		}, i))
	}
}, ITSMediaPlayer._setFadeInForHTML5AudioPlayer = function(t, n, r) {
	var i = t.volume;
	i + r < n ? (t.volume = i + r, ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeInForHTML5AudioPlayer(t, n, r)
	}, 100))) : t.volume = n
}, ITSMediaPlayer._setFadeOutForHTML5AudioPlayer = function(t, n) {
	var r = t.volume;
	r && (r - n > n ? (t.volume = r - n, ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(t, n)
	}, 100))) : r > .01 ? (t.volume = r - .01, ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeOutForHTML5AudioPlayer(t, .01)
	}, 500))) : t.volume = 0)
}, ITSMediaPlayer._setFadeInForQTPlayer = function(t, n, r) {
	var i = t.GetVolume();
	i + r < n ? (t.SetVolume(i + r), ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeInForQTPlayer(t, n, r)
	}, 100))) : t.SetVolume(n)
}, ITSMediaPlayer._setFadeOutForQTPlayer = function(t, n) {
	var r = t.GetVolume();
	r && (r - n > n ? (t.SetVolume(r - n), ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeOutForQTPlayer(t, n)
	}, 100))) : r > 1 ? (t.SetVolume(r - 1), ITSMediaPlayer._timers.push(setTimeout(function() {
		ITSMediaPlayer._setFadeOutForQTPlayer(t, 1)
	}, 500))) : t.SetVolume(0))
}, ITSMediaPlayer._internalPlaybackStartedCallback = function() {
	ITSMediaPlayer.isHtml5AudioTagBeingUsed() && ITSMediaPlayer._DEBUG && console.log((new Date)
		.getTime() - ITSMediaPlayer._startLoadTimeHtml5 + "ms Elapsed time between internal Html5load request and playbackStarted callback"), ITSMediaPlayer._DEBUG && console.log((new Date)
		.getTime() - ITSMediaPlayer._startPlayTime + "ms Elapsed time between client play request and playbackStarted callback"), ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_STARTED, ITSMediaPlayer))
}, ITSMediaPlayer._internalCanPlayCallback = function() {
	ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.CAN_PLAY, ITSMediaPlayer))
}, ITSMediaPlayer._internalPlaybackPausedCallback = function() {
	ITSMediaPlayer._DEBUG && console.log((new Date)
		.getTime() - ITSMediaPlayer._pausePlayTime + "ms Elapsed time between client pause request and playbackPaused callback"), ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_PAUSED, ITSMediaPlayer))
}, ITSMediaPlayer._internalPlaybackEndedCallback = function() {
	ITSMediaPlayer._DEBUG && console.log((new Date)
		.getTime() - ITSMediaPlayer._stopPlayTime + "ms Elapsed time between client stop request and playbackEnded callback"), ITSMediaPlayer.itsDispatchEvent(new ITSEvent(ITSMediaPlayer.events.PLAYBACK_ENDED, ITSMediaPlayer))
}, ITSMediaPlayer._registerCallbacks = function() {
	var t = ITSMediaPlayer._mediaPlayer;
	ITSMediaPlayer.isQuickTimeBeingUsed() ? (its.x.addEventListener(t, "qt_play", ITSMediaPlayer._internalPlaybackStartedCallback), its.x.addEventListener(t, "qt_canplay", ITSMediaPlayer._internalCanPlayCallback), its.x.addEventListener(t, "qt_pause", ITSMediaPlayer._internalPlaybackPausedCallback), its.x.addEventListener(t, "qt_ended", ITSMediaPlayer._internalPlaybackEndedCallback)) : ITSMediaPlayer.isHtml5AudioTagBeingUsed() && (its.x.addEventListener(t, "play", ITSMediaPlayer._internalPlaybackStartedCallback), its.x.addEventListener(t, "canplay", ITSMediaPlayer._internalCanPlayCallback), its.x.addEventListener(t, "pause", ITSMediaPlayer._internalPlaybackPausedCallback), its.x.addEventListener(t, "ended", ITSMediaPlayer._internalPlaybackEndedCallback))
}, ITSMediaPlayer.insertMediaPlayer = function() {
	ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl(null, !1)
}, ITSMediaPlayer.insertMediaPlayerWithSpecifiedUrl = function(t, n) {
	var r = !1,
		i = document.getElementById("media-player-container");
	i ? r = !0 : (i = document.createElement("div"), i.id = "media-player-container");
	var s = "";
	ITSMediaPlayer._isHTML5AudioTagSupported() ? (ITSMediaPlayer._mediaPlayerTypeToUse = ITSMediaPlayer._HTML5_AUDIO_PLAYER, s = '<audio id="' + ITSMediaPlayer._ID + '" ', t ? s = s + 'src="' + t + '" ' : s += 'src="" ', s += 'hidden="true" ', n ? s += 'autoplay = "true"' : s += 'autoplay = "false"', s += "></audio>", i.innerHTML = s, document.body.appendChild(i)) : ITSMediaPlayer._isQuickTimeSupported() ? (ITSMediaPlayer._mediaPlayerTypeToUse = ITSMediaPlayer._QUICK_TIME_PLAYER, its.x.isIE() ? (s += '<object id="qt_event_source" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598"></object>', s += '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"', s += 'codebase="http://www.apple.com/qtactivex/qtplugin.cab"', s = s + 'width="1" height="1" id="' + ITSMediaPlayer._ID + '" style="behavior:url(#qt_event_source);">', t ? s = s + '<param name="src" value="' + t + '"/>' : s += '<param name="src" value=""/>', s += '<param name="controller" value="false" />', n ? s += '<param name="autoplay" value="true" />' : s += '<param name="autoplay" value="false" />', s += '<param name="hide" value="true" />', s += '<param name="EnableJavaScript" value="true" />', s += '<param name="postdomevents" value="true"/>', s += "</object>") : (s += '<object type="video/quicktime"', t ? s = s + 'data="' + t + '"' : s += 'data=""', s = s + 'width="1" height="1" id="' + ITSMediaPlayer._ID + '" style="behavior:url(#qt_event_source);">', n ? s += '<param name="autoplay" value="true" />' : s += '<param name="autoplay" value="false" />', s += '<param name="controller" value="false" />', s += '<param name="hide" value="true" />', s += '<param name="EnableJavaScript" value="true" />', s += '<param name="postdomevents" value="true"/>', s += "</object>"), i.innerHTML = s, r === !1 && document.body.appendChild(i)) : ITSMediaPlayer._mediaPlayerTypeToUse = "undefined", ITSMediaPlayer._count || (ITSMediaPlayer._count = 0), ITSMediaPlayer._mediaPlayer = document.getElementById(ITSMediaPlayer._ID)
}, ITSMediaPlayer.isQuickTimeBeingUsed = function() {
	return ITSMediaPlayer._mediaPlayerTypeToUse === ITSMediaPlayer._QUICK_TIME_PLAYER
}, ITSMediaPlayer.isHtml5AudioTagBeingUsed = function() {
	return ITSMediaPlayer._mediaPlayerTypeToUse === ITSMediaPlayer._HTML5_AUDIO_PLAYER
}, ITSMediaPlayer.isAudioPreviewSupported = function() {
	var t = ITSMediaPlayer._mediaPlayer;
	return t && ITSMediaPlayer._mediaPlayerTypeToUse != "undefined"
}, ITSMediaPlayer._isQuickTimeSupported = function() {
	return ITSMediaPlayer._canDetectPlugins() && ITSMediaPlayer._detectQuickTime()
}, ITSMediaPlayer._isHTML5AudioTagSupported = function() {
	return !1
}, ITSMediaPlayer.doesMediaPlayerSupportCallbacks = function() {
	return ITSMediaPlayer.isHtml5AudioTagBeingUsed() || ITSMediaPlayer._quickTimeVersion() && ITSMediaPlayer._quickTimeVersion() >= ITSMediaPlayer._QUICK_TIME_VERSION_SUPPORTING_DOM_EVENTS
}, ITSMediaPlayer._quickTimeVersion = function() {
	if (ITSMediaPlayer._qtVersion === "undefined") {
		var t = new RegExp("([0-9]).([0-9]).([0-9])");
		if (navigator.plugins && navigator.plugins.length) for (var n = 0;
		n < navigator.plugins.length && ITSMediaPlayer._qtVersion === "undefined";
		n++) {
			var r = navigator.plugins[n].name.match(/quicktime\D*([\.\d]*)/i);
			if (r && r[1]) {
				var i = r[1];
				if (i) {
					i = t.exec(i);
					var s = 0,
						o = 0,
						u = 0;
					RegExp.$1 && (s = parseInt(RegExp.$1)), RegExp.$2 && (o = parseInt(RegExp.$2)), RegExp.$3 && (u = parseInt(RegExp.$3)), ITSMediaPlayer._qtVersion = s * 100 + o * 10 + u
				}
			}
		} else typeof execScript != "undefined" && (ieQTVersion = null, execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion', "VBScript"), ieQTVersion && (ITSMediaPlayer._qtVersion = (ieQTVersion >> 16)
			.toString(16)))
	}
	return ITSMediaPlayer._qtVersion
}, ITSMediaPlayer.detectableWithVB = !1, ITSMediaPlayer._goURL = function(t) {
	javascriptVersion1_1 ? window.location.replace(t) : window.location = t;
	return
}, ITSMediaPlayer._redirectCheck = function(t, n, r) {
	return n && (t && r || !t && !r) ? (ITSMediaPlayer._goURL(n), t) : t
}, ITSMediaPlayer._canDetectPlugins = function() {
	return ITSMediaPlayer.detectableWithVB || navigator.plugins && navigator.plugins.length > 0 ? !0 : !1
}, ITSMediaPlayer._detectQuickTime = function(t, n) {
	var r = ITSMediaPlayer._detectPlugin("QuickTime");
	return !r && ITSMediaPlayer.detectableWithVB && (r = detectQuickTimeActiveXControl()), ITSMediaPlayer._redirectCheck(r, t, n)
}, ITSMediaPlayer._detectPlugin = function() {
	var t = ITSMediaPlayer._detectPlugin.arguments,
		n = !1;
	if (navigator.plugins && navigator.plugins.length > 0) {
		var r = navigator.plugins.length;
		for (pluginsArrayCounter = 0;
		pluginsArrayCounter < r;
		pluginsArrayCounter++) {
			var i = 0;
			for (namesCounter = 0;
			namesCounter < t.length;
			namesCounter++)(navigator.plugins[pluginsArrayCounter].name.indexOf(t[namesCounter]) >= 0 || navigator.plugins[pluginsArrayCounter].description.indexOf(t[namesCounter]) >= 0) && i++;
			if (i == t.length) {
				n = !0;
				break
			}
		}
	}
	return n
}, ITSMediaPlayer.quicktimeVersionStringForReporting = function() {
	var t = ITSMediaPlayer._canDetectPlugins() ? ITSMediaPlayer._quickTimeVersion() : "unknown";
	return "undefined" === t && (t = "not_installed"), t = "QT:" + t, t
}, navigator.userAgent.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Win") != -1 && (document.writeln('<script language="VBscript">'), document.writeln("'do a one-time test for a version of VBScript that can handle this code"), document.writeln("ITSMediaPlayer.detectableWithVB = False"), document.writeln("If ScriptEngineMajorVersion >= 2 then"), document.writeln("  ITSMediaPlayer.detectableWithVB = True"), document.writeln("End If"), document.writeln("'this next function will detect most plugins"), document.writeln("Function detectActiveXControl(activeXControlName)"), document.writeln("  on error resume next"), document.writeln("  detectActiveXControl = False"), document.writeln("  If ITSMediaPlayer.detectableWithVB Then"), document.writeln("     detectActiveXControl = IsObject(CreateObject(activeXControlName))"), document.writeln("  End If"), document.writeln("End Function"), document.writeln("'and the following function handles QuickTime"), document.writeln("Function detectQuickTimeActiveXControl()"), document.writeln("  on error resume next"), document.writeln("  detectQuickTimeActiveXControl = False"), document.writeln("  If ITSMediaPlayer.detectableWithVB Then"), document.writeln("    detectQuickTimeActiveXControl = False"), document.writeln("    hasQuickTimeChecker = false"), document.writeln('    Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1")'), document.writeln("    If IsObject(hasQuickTimeChecker) Then"), document.writeln("      If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then "), document.writeln("        detectQuickTimeActiveXControl = True"), document.writeln("      End If"), document.writeln("    End If"), document.writeln("  End If"), document.writeln("End Function"), document.writeln("</script>")), window.its || (window.its = {}), window.webPreview || (window.webPreview = {}), webPreview.domReady = function() {
	if (getGlobalConst("_previewAllowed")) {
		if (ITSMediaPlayer.isAudioPreviewSupported()) {
			var t = its.x.querySelectorAll(document, ".has-preview-capable-text");
			if (t) for (var n = 0;
			n < t.length;
			n++) {
				var r = t[n];
				r.innerHTML = r.getAttribute("preview-capable-text")
			}
			its.registerElementBinding(ITSPlayMusicController, "table.tracklist-table tbody tr[audio-preview-url] td div.circular-preview-control", {
				click: "togglePlayState",
				mousedown: "mousePressed"
			}), its.registerElementBinding(ITSPlayMusicController, "table.tracklist-table tbody tr[audio-preview-url]", {
				mouseover: "rowMouseIn",
				mouseout: "rowMouseOut"
			}, !0)
		}
		its.registerElementBinding(ITSPlayVideoController, ".w3h-video-social-preview-lockup", {
			click: "playVideo"
		})
	}
}, its.x.notifyOfDOMContentLoaded(webPreview.domReady), ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX = "foreground-image-", ITSPlayMusicController.ACCESSIBILITY_FEATURE = "preview", ITSPlayMusicController.PLAYSTATE_STOPPED = "stopped", ITSPlayMusicController.PLAYSTATE_LOADING = "loading", ITSPlayMusicController.PLAYSTATE_PLAYING = "playing", ITSPlayMusicController.PLAYSTATE_PAUSED = "paused", ITSPlayMusicController.MOUSESTATE_DEFAULT = "default", ITSPlayMusicController.MOUSESTATE_HOVER = "hover", ITSPlayMusicController.MOUSESTATE_PRESSED = "pressed", ITSPlayMusicController.Events = {
	PREVIEW_PLAYED: "ITSPlayMusicController.Events.PREVIEW_PLAYED"
}, its.x.extendWithEventDispatching(ITSPlayMusicController), ITSPlayMusicController.rowMouseIn = function(t) {
	var n = its.x.querySelector(t, "td div.circular-preview-control");
	n.__controller && n.__controller.setMouseState(ITSPlayMusicController.MOUSESTATE_HOVER)
}, ITSPlayMusicController.rowMouseOut = function(t) {
	var n = its.x.querySelector(t, "td div.circular-preview-control");
	n.__controller && n.__controller.setMouseState(ITSPlayMusicController.MOUSESTATE_DEFAULT)
}, ITSPlayMusicController.prototype = {
	togglePlayState: function(t) {
		this.playState != ITSPlayMusicController.PLAYSTATE_STOPPED ? this.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED) : this.setPlayState(ITSPlayMusicController.PLAYSTATE_LOADING)
	},
	mousePressed: function(t) {
		this.setMouseState(ITSPlayMusicController.MOUSESTATE_PRESSED)
	},
	playbackStarted: function() {
		this.setPlayState(ITSPlayMusicController.PLAYSTATE_PLAYING);
		var t = new ITSEvent(ITSPlayMusicController.Events.PREVIEW_PLAYED, this);
		t.adamId = this.adamId, ITSPlayMusicController.itsDispatchEvent(t)
	},
	playbackEnded: function() {
		this.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED)
	},
	setPlayState: function(t) {
		if (this.playState != t) {
			this.playState = t;
			if (this.playState == ITSPlayMusicController.PLAYSTATE_STOPPED) ITSMediaPlayer.stop(), ITSMediaPlayer.itsRemoveEventListener(ITSMediaPlayer.events.CAN_PLAY, this._playbackStartedCallback), ITSMediaPlayer.itsRemoveEventListener(ITSMediaPlayer.events.PLAYBACK_ENDED, this._playbackEndedCallback), ITSPlayMusicController.__activeTrack == this && (ITSPlayMusicController.__activeTrack = null);
			else if (this.playState == ITSPlayMusicController.PLAYSTATE_LOADING) {
				var n = its.x.element.parentByTagName(this.__domElement, "tr");
				if (ITSPlayMusicController.__activeTrack) {
					var r = ITSPlayMusicController.__activeTrack;
					r.setPlayState(ITSPlayMusicController.PLAYSTATE_STOPPED)
				}
				ITSPlayMusicController.__activeTrack = this, this._playbackStartedCallback = bind(this, this.playbackStarted), this._playbackEndedCallback = bind(this, this.playbackEnded), ITSMediaPlayer.itsAddEventListener(ITSMediaPlayer.events.CAN_PLAY, this._playbackStartedCallback), ITSMediaPlayer.itsAddEventListener(ITSMediaPlayer.events.PLAYBACK_ENDED, this._playbackEndedCallback), this.mediaURL = n.getAttribute("audio-preview-url"), ITSMediaPlayer.play(this.mediaURL), ITSMediaPlayer.doesMediaPlayerSupportCallbacks || this.playbackStarted()
			} else this.playState != ITSPlayMusicController.PLAYSTATE_PLAYING && this.playState == ITSPlayMusicController.PLAYSTATE_PAUSED;
			this.setImagesFromState()
		}
	},
	setMouseState: function(t) {
		this.mouseState != t && (this.mouseState = t, this.setImagesFromState())
	},
	setImagesFromState: function() {
		this.showOrHideControl();
		var t = this.playState + "_" + this.mouseState,
			n = ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX + this.playState + "-" + this.mouseState;
		if (this.playState == ITSPlayMusicController.PLAYSTATE_STOPPED) this.progressMeter && this.progressMeter.stop();
		else if (this.playState == ITSPlayMusicController.PLAYSTATE_PLAYING) {
			if (!this.progressMeter) {
				var r = ITSMediaPlayer.durationInSeconds();
				this.progressMeter = new ITSSpriteAnimator(this.__domElement, 21, 101, ITSMediaPlayer.durationInSeconds() * 1e3, 0, this.mediaURL)
			}
			this.progressMeter.play()
		}
		var i = its.x.element.classNameStartingWith(this.centerStateIconDiv, ITSPlayMusicController.FOREGROUND_IMAGE_PREFIX);
		its.x.element.replaceClassName(this.centerStateIconDiv, i, n), this.centerStateIconDiv.title = ITSPlayMusicController.ACCESSIBILITY_FEATURE + " " + this.playState
	},
	showOrHideControl: function() {
		this.playState != ITSPlayMusicController.PLAYSTATE_STOPPED || this.mouseState != ITSPlayMusicController.MOUSESTATE_DEFAULT ? this.__domElement.style.visibility = "visible" : this.__domElement.getAttribute("show-preview-control-always") || (this.__domElement.style.visibility = "hidden")
	}
}, ITSPlayVideoController.prototype = {
	MAX_WIDTH: 416,
	init: function(e) {
		var t = document.createElement("video");
		this.supportsVideoTag = typeof t.canPlayType != "undefined" && t.canPlayType("video/mp4") != "" && !its.x.isChrome(), this.container = its.x.querySelector(e, ".w3h-video-container"), this.videoWrapper = its.x.querySelector(this.container, ".video-wrapper"), this.video = its.x.querySelector(this.videoWrapper, "video"), this.videoScreen = its.x.querySelector(this.videoWrapper, "div.video-screen"), this.videoPoster = its.x.querySelector(this.container, "div.video-poster"), this.constrainVideoWidth()
	},
	constrainVideoWidth: function() {
		var e = parseInt(this.videoWrapper.getAttribute("video-width")),
			t = parseInt(this.videoWrapper.getAttribute("video-height")),
			n = e / t,
			r = this.videoWrapper.getAttribute("max-width") || this.MAX_WIDTH,
			i = Math.floor(r / n);
		this.newWidth = r, this.newHeight = i, this.ratio = n, this.video.style && (this.video.style.width = r + "px", this.video.style.height = i + "px");
		var s = its.x.querySelector(this.videoPoster, "img");
		s.style.width = r + "px", s.style.height = i + "px", this.videoScreen.style.width = r + "px", this.videoScreen.style.height = i + "px", this.container.style.width = r + "px"
	},
	playVideo: function() {
		this.supportsVideoTag ? this.playHtml5Video() : this.playQuickTimeVideo()
	},
	playHtml5Video: function() {
		var t = this;
		this.videoPoster.style.opacity = "0", window.setTimeout(function() {
			t.videoPoster.style.display = "none", t.videoScreen.style.display = "none"
		}, 300), this.video.play()
	},
	playQuickTimeVideo: function() {
		this.videoPoster.style.display = "none", this.videoScreen.style.display = "none";
		var t = this.newHeight + 15,
			n = this.newWidth,
			r = this.videoWrapper.getAttribute("poster"),
			i = document.getElementsByTagName("source")[0],
			s = i.getAttribute("src"),
			o = "tofit",
			u = '<object width="' + n + '" height="' + t + '" ' + 'classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" ' + 'codebase="http://www.apple.com/qtactivex/qtplugin.cab" scale="' + o + '"> ' + '<param name="src" value="' + s + '"> ' + '<param name="autoplay" value="true"> ' + '<param name="poster" value="' + r + '"> ' + '<param name="controller" value="true"> ' + '<param name="scale" value="' + o + '"> ' + '<embed src="' + s + '" width="' + n + '" height="' + t + '" ' + 'scale="' + o + '" ' + 'controller="true" autoplay="true" poster="' + r + '" ' + 'pluginspage="http://www.apple.com/quicktime/download/"> ' + "</embed> " + "</object>",
			a = document.createElement("div");
		a.innerHTML = u, this.video.parentNode ? (this.video.parentNode.appendChild(a), this.video.parentNode.removeChild(this.video)) : this.videoWrapper.appendChild(a), this.videoWrapper.style.height = t + "px", its.x.element.hasClassName(document.body, "social-preview") && twttr.remote.ui("resizeFrame", document.body.offsetHeight)
	}
},

function(e) {
	jQuery.fn.AppGallery = function(e) {
		var t = {
			content: ".content",
			control: ".control",
			control_cap: ".control_cap",
			scroll: ".scroll",
			scroll_cap: ".scroll_cap",
			image_wrapper: "img"
		};
		e && jQuery.extend(t, e);
		var n, r, i = jQuery.browser.webkit,
			s = function(e, n) {
				this.willScroll = !1;
				var r = function(e) {
					e.append('<div id="scroller_' + n + '" class="' + s(t.control) + '"><div class="' + s(t.control_cap) + '"><div class="' + s(t.scroll) + '"><div class="' + s(t.scroll_cap) + '"></div></div></div></div>')
				}, s = function(e) {
					return e.replace(/(\.|#)/g, "")
				};
				this.container = jQuery(e), this.content = new o(jQuery(t.content, this.container), this.container);
				var u = this.container.attr("num-items");
				u && this.container.addClass("items" + u);
				if (this.container.width() < this.content.width) {
					var a = jQuery("div:first-child", this.container)
						.get(0);
					if (u > 1) {
						jQuery(a)
							.css({
							width: this.content.width + "px"
						})
							.addClass("image-wrapper");
						if (!i) {
							r(this.container);
							var f = {
								orientation: "horizontal",
								track_wrapper: jQuery("#scroller_" + n),
								track_well: "null",
								track_well_cap: "null",
								track_thumb: jQuery(".scroll", this.container),
								track_thumb_cap: jQuery(".scroll_cap", this.container),
								content_wrapper: this.container,
								content: jQuery(".image-wrapper", this.container)
							};
							jQuery(this.container)
								.is_scrollable(f)
						}
					} else a.style.width = "auto"
				}
			}, o = function(e, n) {
				this.position_images = function(t) {
					var n = 0,
						r;
					jQuery.each(this.images, function(e, t) {
						n += t.get_dimensions()
							.width
					}), e.css({
						left: t,
						width: n
					})
				};
				var r = function(e) {
					var t = [],
						n = 0,
						r = 0,
						i, s;
					return jQuery.each(e, function(e, o) {
						i = new u(o), s = i.get_dimensions(), t[t.length] = i, s.height > n && (n = s.height), r += s.width
					}), {
						image_list: t,
						tallest: n,
						width: r
					}
				}, s = function(e) {}, o = function(e, t) {
					var n;
					jQuery.each(e, function(e, r) {
						n = r.get_height();
						if (t <= n) return;
						r.set_y(t - n)
					})
				};
				this.get_view_width = function() {
					return n.width()
				}, this.images_meta = r(jQuery(t.image_wrapper, e)), this.images = this.images_meta.image_list, this.height = this.images_meta.tallest, this.width = this.images_meta.width, s(this.height), o(this.images, this.height), n && !i && jQuery(n.get(0))
					.css({
					"overflow-x": "hidden",
					padding: "0"
				})
			}, u = function(e) {
				var t = jQuery(e);
				this.get_dimensions = function() {
					return {
						width: t.outerWidth(!0),
						height: t.height()
					}
				}, this.get_height = function() {
					return jQuery("img", t)
						.height()
				}, this.set_x = function(e) {
					t.css({
						left: e + "px"
					})
				}, this.set_y = function(e) {}
			};
		return this.each(function(e, t) {
			r = new s(t, e)
		})
	}
}(), jQuery(window)
	.load(function() {
	jQuery(".screenshots .content")
		.AppGallery({
		content: "div:first",
		image_wrapper: ".lockup"
	})
}),

function() {
	jQuery.fn.Pill = function(e) {
		var t = {
			toggleDiv: "div.screenshots div.content",
			toggleButtons: "div.screenshots div.pill a"
		};
		e && jQuery.extend(t, e);
		var n, r = function(e) {
			jQuery(e)
				.each(function(e, n) {
				e < 1 && (jQuery(n)
					.addClass("first active"), i(), jQuery(document.body)
					.hasClass("social-preview") && twttr.remote.ui("resizeFrame", jQuery(document.body)
					.height())), jQuery(n)
					.click(function(e) {
					e.preventDefault(), e.stopPropagation();
					if (!jQuery(this)
						.hasClass("active")) {
						var n = jQuery(this);
						jQuery(t.toggleDiv)
							.each(function() {
							jQuery(this)
								.toggle()
						}), jQuery(t.toggleButtons)
							.each(function() {
							jQuery(this)
								.removeClass("active")
						}), jQuery(this)
							.addClass("active")
					}
				})
			})
		}, i = function() {
			jQuery(t.toggleDiv)
				.each(function(e, t) {
				e > 0 && jQuery(t)
					.addClass("ipad")
			})
		};
		return n = new r(this), this
	}
}(), jQuery(window)
	.load(function() {
	jQuery("body.software #main #content div.center-stack div.screenshots > div.title > div.pill > a")
		.Pill()
}),

function() {
	jQuery.fn.Hud = function(e) {
		var t = {
			table_row: "tr.podcast-episode",
			scroller: ".scroller",
			hide_hud: "#hide_hud",
			hud_close_link: "a.close_link",
			hud_content_wrapper: "div.content_wrapper",
			hud_content: "div.content",
			hud_title: "h2",
			hud_release_date_label: "span.release_date_label",
			hud_release_date_value: "span.release_date_value",
			hud_description: "p.description",
			left_offset: 321,
			top_offset: 12,
			fade_duration: 300
		};
		e && jQuery.extend(t, e);
		var n = this,
			r = null,
			i = null,
			s = !1,
			o = function(e) {
				jQuery(e)
					.each(function(e, t) {
					var n = null;
					n = l(t), jQuery(t)
						.click(function() {
						u(this, n)
					})
				})
			}, u = function(e, r) {
				if (e != null && r != null) {
					var i = jQuery(e)
						.offset();
					n.hud ? jQuery(n.hud)
						.css({
						top: parseInt(i.top - t.top_offset) + "px",
						left: parseInt(i.left - t.left_offset) + "px"
					}) : (jQuery("body")
						.append('<div id="hide_hud"></div><div id="description_hud"><a class="close_link" href="#">Close</a><div class="scroller"><div class="track_well"><div class="track_well_cap"><div class="track_thumb"><div class="track_thumb_cap"></div></div></div></div></div><div class="content_wrapper"><div class="content"><h2></h2><p class="release_date"><span class="release_date_label"></span><span class="release_date_value"></span></p><p class="description"></p></div></div></div>'), n.hud = jQuery("#description_hud")[0], jQuery(n.hud)
						.css({
						top: parseInt(i.top - t.top_offset) + "px",
						left: parseInt(i.left - t.left_offset) + "px"
					}), jQuery(n.hud)
						.find(t.hud_close_link)
						.click(function() {
						return a(), !1
					}), jQuery(t.hide_hud)
						.click(function() {
						return a(), !1
					})), f(r)
				}
			}, a = function() {
				n.hud && (h(), its.x.isIE() ? (jQuery(n.hud)
					.css({
					display: "none"
				}), jQuery(t.hide_hud)
					.hide()) : jQuery(n.hud)
					.fadeOut(t.fade_duration, function() {
					jQuery(t.hide_hud)
						.hide()
				}))
			}, f = function(e) {
				if (n.hud && e) {
					var r = window["__desc_popup_d_" + e];
					r != null && (jQuery(n.hud)
						.find(t.hud_title)
						.html(r.title), jQuery(n.hud)
						.find(t.hud_release_date_label)
						.html(r.release_date_label), jQuery(n.hud)
						.find(t.hud_release_date_value)
						.html(r.release_date), jQuery(n.hud)
						.find(t.hud_description)
						.html(r.description)), its.x.isIE() ? (jQuery(n.hud)
						.css({
						display: "block"
					}), its.x.isSafari() || c(), jQuery(t.hide_hud)
						.show()) : jQuery(n.hud)
						.fadeIn(t.fade_duration, function() {
						its.x.isSafari() || c(), jQuery(t.hide_hud)
							.show()
					})
				}
			}, l = function(e) {
				if (e) return jQuery(t.table_row)
					.attr("adam-id")
			}, c = function() {
				this.scroll = jQuery(n.hud)
					.find(t.hud_content)
					.height() - jQuery(n.hud)
					.find(t.hud_content_wrapper)
					.height(), this.scroll > 0 && (jQuery(t.hud_content_wrapper)
					.css({
					"overflow-y": "hidden"
				}), jQuery(t.scroller)
					.css({
					left: "auto"
				}), jQuery(n.hud)
					.is_scrollable({
					track_wrapper: t.scroller
				}))
			}, h = function() {
				this.scroll > 0 && (jQuery(t.scroller)
					.css({
					left: "-9999px"
				}), jQuery(t.scroller + " .track_thumb")
					.css({
					top: "0"
				}), jQuery(t.hud_content)
					.css({
					top: "0"
				}))
			};
		return r = new o(this), this
	}
}(), jQuery(document)
	.ready(function() {
	var e = {};
	jQuery("#main #content .track-list table tr")
		.each(function(t, n) {
		e.table_row = n, jQuery(n)
			.find("td span.episode-info")
			.Hud(e)
	})
}),

function() {
	jQuery.fn.is_scrollable = function(r) {
		var i = {
			orientation: "vertical",
			track_wrapper: ".track_wrapper",
			track_well: ".track_well",
			track_well_cap: ".track_well_cap",
			track_thumb: ".track_thumb",
			track_thumb_cap: ".track_thumb_cap",
			content_wrapper: ".content_wrapper",
			content: ".content",
			image_cap_size: 5
		};
		r && jQuery.extend(i, r);
		var s = new e(this, i),
			o = new t(this, i, s),
			u = new n(this, i, o);
		return this
	};
	var e = function(e, t) {
		var n = jQuery(t.content_wrapper, e),
			r = jQuery(t.content, n);
		this.get_wrapper_height = function() {
			return n.height()
		}, this.get_wrapper_width = function() {
			return n.width()
		}, this.get_content_height = function() {
			return r.height()
		}, this.get_content_width = function() {
			return r.width()
		}, this.set_top = function(e) {
			r.css({
				top: e + "px"
			})
		}, this.set_left = function(e) {
			r.css({
				left: e + "px"
			})
		}
	}, t = function(e, t, n) {
		var r = this,
			i = t.track_wrapper ? jQuery(t.track_wrapper, e) : null,
			s = t.track_well ? jQuery(t.track_well, i) : null,
			o = t.track_well_cap ? jQuery(t.track_well_cap, s) : null,
			u = t.track_thumb ? jQuery(t.track_thumb, s) : null,
			a = t.track_thumb_cap ? jQuery(t.track_thumb_cap, u) : null,
			f = 0;
		this.track_wrapper = i, this.is_target = function(e) {
			return u.get(0) == e || a.get(0) == e
		}, this.get_scroll_position = function() {
			return f
		}, this.set_scroll_position = function(e) {
			f = e
		}, this.get_scroll_left = function() {
			return u.offset()
				.left
		};
		var l = function(e) {
			u.css({
				left: e + "%"
			})
		};
		this.get_scroll_top = function() {
			return u.offset()
				.top
		};
		var c = function(e) {
			e > 100 && (e = 100), e < 0 && (e = 0), u.css({
				top: e + "%"
			})
		}, h = function() {
			return u.width()
		}, p = function() {
			return u.outerHeight(!0)
		}, d = function() {
			return parseFloat(u.css("width"))
		}, v = function(e) {
			e > 100 && (e = 100), e < -1.5 && (e = 0), u.css({
				width: e + "%"
			})
		}, m = function() {
			return parseFloat(u.css("height"))
		}, g = function(e) {
			e > 100 && (e = 100), e < -1.5 && (e = 0), u.css({
				height: e + "%"
			})
		}, y = function() {
			return i.offset()
				.left
		}, b = function() {
			return i.offset()
				.top
		}, w = function() {
			return i.outerWidth(!0)
		}, E = function() {
			return i.outerHeight(!0)
		}, S = function() {
			if (t["orientation"] == "vertical") {
				var e = t.image_cap_size,
					n = s.height() - e * 2;
				s.css({
					height: n + "px"
				}), o.css({
					top: e + "px"
				}), a.css({
					top: -1 * e + "px"
				})
			}
			f = x(t.orientation)
				.min
		}, x = function(e) {
			var t, n;
			return e == "vertical" ? (t = b(), n = t + E() - p()) : (t = y(), n = t + w() - h()), r.range = {
				min: t,
				max: n
			}, r.range
		};
		this.set_scroll = function(e) {
			var r = this.range ? this.range : x(t.orientation);
			this.set_scroll_position(e);
			var i, s, o = 100 * (e - r.min) / (r.max - r.min);
			t["orientation"] == "vertical" ? (i = (100 - m()) * (e - r.min) / (r.max - r.min), c(i), s = o * (n.get_wrapper_height() - n.get_content_height()) / 100, n.set_top(s)) : (i = (100 - d()) * (e - r.min) / (r.max - r.min), l(i), s = o * (n.get_wrapper_width() - n.get_content_width()) / 100, n.set_left(s))
		}, S(), t["orientation"] == "vertical" ? g(100 * n.get_wrapper_height() / n.get_content_height()) : v(100 * n.get_wrapper_width() / n.get_content_width())
	}, n = function(e, t, n) {
		var r = !1,
			i = {
				x: 0,
				y: 0
			}, s = 0,
			o = Math,
			u = n.range,
			a = function(e) {
				return e.wheelDelta ? o.abs(e.wheelDeltaY / e.wheelDeltaX) <= .5 : e.axis == 1
			};
		jQuery(e)
			.bind({
			content_select: function(e) {
				if (!r) return;
				e.deselect()
			},
			mousewheel: function(e) {
				var t = n.get_scroll_position(),
					r = a(e.originalEvent);
				if (r) {
					var i = e.detail ? e.detail * -120 : e.wheelDelta,
						s = e.detail ? o.round(3 * (i / -120)) : o.round(.3 * (i / -120));
					if (s != 0) {
						var f = t + s;
						f > u.max && (f = u.max), f < u.min && (f = u.min), n.set_scroll(f)
					}
				}
			}
		}), jQuery(n.track_wrapper)
			.bind({
			click: function(e) {
				var r = t["orientation"] == "vertical" ? e.pageY : e.pageX;
				r > u.max && (r = u.max), r < u.min && (r = u.min), console.log(e.pageX, i.x), n.set_scroll(r)
			}
		}), jQuery(document)
			.bind({
			mousedown: function(e) {
				if (r) {
					r = !1;
					return
				}
				if (!n.is_target(e.target)) return;
				r = !0, i.x = e.pageX - n.get_scroll_left(), i.y = e.pageY - n.get_scroll_top()
			},
			mouseup: function(e) {
				r = !1
			},
			mousemove: function(e) {
				if (!r) return;
				var s = t["orientation"] == "vertical" ? e.pageY - i.y : e.pageX - i.x;
				s > u.max && (s = u.max), s < u.min && (s = u.min), n.set_scroll(s)
			}
		})
	};
	jQuery.event.special.content_select = {
		setup: function(e, t) {
			jQuery(this)
				.data("content_selected", !1), jQuery(this)
				.bind("mouseup", jQuery.event.special.content_select.handler), jQuery(this)
				.bind("mousedown", jQuery.event.special.content_select.handler), jQuery(this)
				.bind("mousemove", jQuery.event.special.content_select.handler), jQuery.event.special.content_select.scope = this
		},
		teardown: function(e) {
			jQuery(this)
				.unbind("mouseup", jQuery.event.special.content_select.handler), jQuery(this)
				.unbind("mousedown", jQuery.event.special.content_select.handler), jQuery(this)
				.unbind("mousemove", jQuery.event.special.content_select.handler)
		},
		handler: function(e) {
			var t = jQuery.event.special.content_select.get_selected_text();
			t && (jQuery(this)
				.data("content_selected", !0), e.type = "content_select", e.text = t, e.deselect = jQuery.event.special.content_select.deselect, jQuery.event.handle.apply(this, arguments))
		},
		deselect: function() {
			window.getSelection ? window.getSelection()
				.removeAllRanges() : document.selection ? document.selection.empty() : document.getSelection && document.getSelection()
				.removeAllRanges()
		},
		get_selected_text: function() {
			var e = "";
			return window.getSelection ? e = window.getSelection() : document.getSelection ? e = document.getSelection() : document.selection && (e = document.selection.createRange()
				.text), e
		}
	};
	var r = ["DOMMouseScroll", "mousewheel"];
	$.event.special.mousewheel = {
		setup: function() {
			if (this.addEventListener) for (var e = r.length;
			e;) this.addEventListener(r[--e], i, !1);
			else this.onmousewheel = i
		},
		teardown: function() {
			if (this.removeEventListener) for (var e = r.length;
			e;) this.removeEventListener(r[--e], i, !1);
			else this.onmousewheel = null
		}
	}, $.fn.extend({
		mousewheel: function(e) {
			return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
		},
		unmousewheel: function(e) {
			return this.unbind("mousewheel", e)
		}
	});
	var i = function(e) {
		var t = [].slice.call(arguments, 1),
			n = 0,
			r = !0;
		return e = $.event.fix(e || window.event), e.type = "mousewheel", e.wheelDelta && (n = e.wheelDelta / 120), e.detail && (n = -e.detail / 3), t.unshift(e, n), $.event.handle.apply(this, t)
	}
}(),

function() {
	jQuery.fn.Truncate = function(e) {
		var t = {
			maxHeight: 54
		};
		e && jQuery.extend(t, e);
		var n, r = function(e) {
			jQuery(e)
				.each(function(e, n) {
				var r = jQuery(n);
				if (jQuery(r)
					.height() > t.maxHeight) {
					var s = jQuery(r)
						.parent("div.product-review"),
						o = jQuery(s)
							.attr("more-text") || "More";
					jQuery(r)
						.addClass("truncate")
						.css({
						height: t.maxHeight + "px"
					}), jQuery(r)
						.parent("div.product-review")
						.append('<a href="#" class="more-link">...' + o + "</a>"), i(jQuery(r)
						.siblings("a.more-link"))
				}
			})
		}, i = function(e) {
			e && jQuery(e)
				.click(function(e) {
				e.preventDefault(), jQuery(this)
					.siblings(".truncate")
					.each(function(e, t) {
					jQuery(t)
						.css({
						height: "auto"
					}), jQuery(t)
						.removeClass("truncate")
				}), jQuery(this)
					.remove()
			})
		};
		return n = new r(this), this
	}
}(), jQuery(window)
	.load(function() {
	jQuery("body")
		.hasClass("preorder") ? jQuery("body.preorder #main #content div.center-stack div.product-review > p")
		.Truncate({
		maxHeight: 540
	}) : jQuery("body")
		.hasClass("ebook") ? (jQuery("body.ebook #main #content div.center-stack div.product-review > p")
		.Truncate({
		maxHeight: 180
	}), jQuery("body.ebook #main #content div.center-stack div.product-review > div.book-summary")
		.Truncate({
		maxHeight: 180
	})) : jQuery("body")
		.hasClass("software") ? jQuery("body.software #main #content div.center-stack div.product-review > p")
		.Truncate() : jQuery("body #main #content div.center-stack div.product-review > div")
		.Truncate({
		maxHeight: 180
	})
}), 
window.its || (window.its = {}), 
its.detect || (its.detect = {}), 
its.detect.ITUNES_INSTALLED_COOKIE_NAME = "iTunesPresent", 
its.detect.LAUNCH_STORE_QP = "ls", 
its.detect._shouldAutolaunch = !1, 
its.detect.init = function() {
	var t = its.url.originalLocationQueryParams[its.detect.LAUNCH_STORE_QP];
	if (!t || t == "") t = its.url.originalLocationHashAnchorParams[its.detect.LAUNCH_STORE_QP];
	if (!t || t == "") t = its.cookies.get(its.detect.LAUNCH_STORE_QP);
	t && (t = t.toLowerCase(), its.detect._shouldAutolaunch = t == "1" || t == "true"), its.cookies.remove(its.detect.LAUNCH_STORE_QP)
}, 
//its.detect.init(), 
its.detect.itunesDetected = function() {
	return its.cookies.get(its.detect.ITUNES_INSTALLED_COOKIE_NAME) || navigator.userAgent.indexOf("Macintosh") != -1 || its.x.isIE() && its.detect.iTunesActiveXComponentInstalled() || its.x.isSafari() && window.location.href.indexOf("volume.itunes.apple.com") > -1 || its.x.isSafari() && window.location.href.indexOf("mint.itunes.apple.com") > -1 || its.x.isSafari() && window.location.href.indexOf("vpp.itunes.apple.com") > -1 || (its.x.isFirefox() || its.x.isSafari() || its.x.isChrome()) && its.detect.iTunesMozillaPluginDetected()
}, its.detect.userOverrideSetItunesInstalled = function() {
	its.cookies.set(its.detect.ITUNES_INSTALLED_COOKIE_NAME, "1", 99999999, "/", null)
}, its.detect.macAppStoreDetected = function() {
	return its.useragent.versionMeetsMinRequirements(its.useragent.macOsVersion(), "10_6_6") || its.x.isFirefox() && its.useragent.versionMeetsMinRequirements(its.useragent.macOsVersion(), "10.6")
}, its.detect.currentPageIsMacAppStore = function() {
	return window.location.href.indexOf("/mac-app/") > 0 || its.url.originalLocationQueryParams["mt"] == "12"
}, its.detect.iTunesActiveXComponentInstalled = function() {
	var t = document.getElementById("iTunesDetectorIE"),
		n = !1;
	if (t != null && typeof t != "undefined") {
		typeof t.IsITMSHandlerAvailable != "undefined" && (n = t.IsITMSHandlerAvailable, dbg(typeof t.IsITMSHandlerAvailable));
		if (n == null || typeof n == "undefined") n = !1
	}
	return info("IE ActiveXControl present: " + n), n
}, its.detect.iTunesMozillaPluginDetected = function() {
	var t = !1;
	if (navigator.plugins && navigator.plugins.length > 0) for (var n = 0;
	n < navigator.plugins.length;
	n++) {
		var r = navigator.plugins[n],
			i = r.name;
		i.indexOf("iTunes Application Detector") > -1 && (t = !0)
	}
	return info("FF plugin detected: " + t), t
}, its.detect.shouldAutolaunch = function() {
	return its.detect._shouldAutolaunch
}, its.detect.openItunes = function(t) {
	t || (t = window.location.href);
	var n = its.detect.currentPageIsMacAppStore() || its.url.queryParamValue("mt", t) == "12",
		r = n ? its.detect.macAppStoreDetected() : its.detect.itunesDetected();
	if (r) {
		t = t.replace(/^http/, n ? "macappstore" : "itms");
		var i = t.indexOf("#");
		i > -1 && (t = t.substring(0, i));
		if (t.indexOf("payPalMIPReturn") === -1 && t.indexOf("firstGateReturn") === -1 && t.indexOf("payclickSignUpReturn") === -1 && t.indexOf("payclickBillingReturn") === -1) {
			var s = t.indexOf("?") === -1 ? "?" : "&",
				o = its.cookies.get("a");
			o && (t += s + "affC=" + its.detect.encodedQueryParameter(o), s = "&");
			if (document.referrer) {
				var u = its.detect.encodedQueryParameter(document.referrer);
				t.length + u.length < 400 && (dbg("openItunes: Attaching " + document.referrer), t += s + "ign-msr=" + u)
			}
		}
	} else t = itms.PageData.itunesDownloadUrl;
	return dbg("openItunes: " + t), window.location.href != t && (setTimeout(function() {
		window.location.href = t
	}, 1), n && setTimeout(function() {
		window.location.href = t
	}, 2e3)), !1
}, its.detect.encodedQueryParameter = function(t) {
	var n = encodeURIComponent(t);
	return its.x.isIE() && (n = encodeURIComponent(n)), n
};
var deviceDetect = function() {
	var e = navigator.userAgent;
	switch (!0) {
	case -1 != e.indexOf("iPhone"):
		setViewport("iphone"), setTouchEvents(), jQuery("html")
			.addClass("iphone"), jQuery("body")
			.addClass("iphone");
		break;
	case -1 != e.indexOf("iPod"):
		setViewport("iphone"), setTouchEvents(), jQuery("html")
			.addClass("iphone"), jQuery("body")
			.addClass("iphone");
		break;
	case -1 != e.indexOf("iPad"):
		setViewport("ipad"), setTouchEvents(), jQuery("html")
			.addClass("ipad"), jQuery("body")
			.addClass("ipad");
		break;
	default:
		return
	}
}, setTouchEvents = function() {
	jQuery(document)
		.ready(function() {
		jQuery("div.bottom-content a")
			.each(function(e, t) {
			t.addEventListener("touchstart", function() {}, !1)
		})
	})
}, setViewport = function(e) {
	if (e) {
		var t = e != "ipad" ? jQuery('<meta name = "viewport" content = "width = 320,initial-scale = 1.0,minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no">') : jQuery('<meta name = "viewport" content = "initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no">');
		jQuery("head")
			.append(t), window.addEventListener("load", function() {
			setTimeout(function() {
				window.scrollTo(0, 1)
			}, 0)
		})
	}
}, itms = function() {
	return {
		replaceClass: function(e, t, n) {
			return n || (n = ""), dbg("Replacing " + t + " with " + n), e.className = e.className.replace(t, n), !1
		},
		PageData: {
			itunesDetectedCallback: function(e, t) {
				e ? (t ? document.getElementsByTagName("body")[0].className += " launching-itunes" : document.getElementsByTagName("body")[0].className += " no-action", setTimeout(function() {
					var e = document.getElementsByTagName("body")[0].className;
					e.match("ebook") || (e = e.replace(/ itunes-detected/, "")), e = e.replace(/ launching-itunes/, ""), document.getElementsByTagName("body")[0].className = e;
					var t = document.getElementById("status")
						.getElementsByTagName("span");
					for (i = 0;
					i < t.length;
					i++) t[i].className == "spinner" && (t[i].className = "no-spinner")
				}, 1e4), document.getElementsByTagName("body")[0].className += " itunes-detected") : document.getElementsByTagName("body")[0].className += " itunes-not-detected"
			},
			itunesDownloadUrl: "http://apple.com/itunes/download",
			itunesDetectorElement: document.getElementById("iTunesDetectorIE"),
			macAppStoreDetectedCallback: function(e, t) {
				e ? document.getElementsByTagName("body")[0].className += " mac-app-store-detected" : document.getElementsByTagName("body")[0].className += " mac-app-store-not-detected"
			},
			macAppStoreDownloadUrl: "http://www.apple.com/mac/app-store/"
		}
	}
}(),
	Tracklist = {
		toHover: "div.track-list tbody tr",
		url: null,
		isSocial: null,
		init: function() {
			this.url = this.getURL(), 
			this.isSocial = document.body.className.match(/song/);
			if (this.toHover) try {
				this.elements = its.x.querySelectorAll(document, this.toHover), this.elementsInit()
			} catch (e) {
				this.elements = its.x.querySelectorAll(document, this.toHover), this.elementsInit()
			}
		},
		getURL: function() {
			var e = "[\\?&]i=([^&#]*)",
				t = new RegExp(e),
				n = t.exec(window.location.href);
			if (n) return n[1]
		},
		elementsInit: function() {
			if (this.elements && this.elements.length > 0) {
				var e = this.elements;
				if (this.url) var t = !1;
				else var t = !0;
				var n = this;
				acme.forEach(e, function(e) {
					var r = n.previousRow(e);
					!t && e.getAttribute("adam-id") == n.url && (e.className = e.className + " selected", t = !0, n.isSocial == null && its.x.addEventListener(e, "mouseout", function() {
						return this.className = this.className.replace("selected", ""), !1
					})), its.x.addEventListener(e, "mouseover", function(e) {
						return r && (r.className = r.className + " borderless"), !1
					}), its.x.addEventListener(e, "mouseout", function(e) {
						return r && (r.className = r.className.replace("borderless", "")), !1
					})
				})
			}
		},
		previousRow: function(e) {
			if (e) {
				p = e;
				do p = p.previousSibling;
				while (p && p.nodeType != 1);
				return p
			}
		},
		domready: function() {
			var e = this;
			try {
				window.attachEvent("onload", function() {
					e.init && e.init()
				}, !1)
			} catch (t) {
				typeof window.addEventListener == "function" ? document.addEventListener("DOMContentLoaded", function() {
					e.init && e.init()
				}, !1) : window.onload = function() {
					e.init() && e.init()
				}
			}
		}
	};

Tracklist.domready(),

function(e) {
	var t = 54;
	e.fn.willTruncate = function(n) {
		var r = t;
		n > 0 && (r = n);
		var i, s, o, u;
		return this.each(function() {
			i = e(this), i.height() > r && (s = i.parent(), o = s.attr("more-text") || iTSLocalization ? iTSLocalization.localize("Js.TextTruncation.More") : "More", i.addClass("truncate")
				.css({
				height: r + "px"
			}), s.append('<a href="#" class="more-link">...' + o + "</a>"), u = i.siblings("a.more-link"), u.click(function() {
				return jQuery(this)
					.siblings(".truncate")
					.removeClass("truncate")
					.css({
					height: "auto"
				}), e(this)
					.remove(), jQuery(document.body)
					.hasClass("social-preview") && twttr.remote.ui("resizeFrame", jQuery(document.body)
					.height()), !1
			}))
		})
	}
}(jQuery), jQuery(document)
	.ready(function() {
	if ( !! window.location.hash.match(/fullText/)) return;
	var e = jQuery("[will-truncate-max-height]");
	e.willTruncate(e.attr("will-truncate-max-height"))
}),

function(e) {
	e.fn.TVRating = function() {
		return this.each(function() {
			var e = jQuery(this),
				t = e.attr("rating-id"),
				n = e.attr("rating-system"),
				r = n + "-" + t;
			e.addClass(r)
		})
	}
}(jQuery), jQuery(document)
	.ready(function() {
	jQuery.browser.msie && jQuery("span.content-rating")
		.TVRating()
}),

function(e) {
	e.fn.LockupLink = function() {
		return this.each(function() {
			var e = jQuery(this)
				.attr("href");
			jQuery(this)
				.click(function() {
				window.location = e
			}, !0)
		})
	}
}(jQuery), jQuery(document)
	.ready(function() {
	jQuery.browser.msie && jQuery.browser.version < 8 && jQuery("a.artwork-link")
		.LockupLink()
}), jQuery(document)
	.ready(function() {
	init_nav()
}),

function(e, t) {
	var n = 4,
		r = "Previous Tab",
		i = "Next Tab",
		s = /'s* celebrity playlist/i,
		o, u = [],
		a = {}, f, l = 0,
		c = 0;
	e.init_nav = function() {
		o = jQuery(".stack-section"), f = jQuery(".tabs-control");
		for (var e = 0, t = o.length;
		e < t;
		e++) {
			var n = o[e];
			e === 0 ? n.style.display = "block" : n.style.display = "none", u[e] = jQuery(".blurbs-title", n)
				.get(0)
		}
		o.length > 1 && v()
	};
	var h = function() {
		for (var e = 0, t = o.length;
		e < t;
		e++) o[e].style.display = "none"
	}, p = function(e, t, n, r, i) {
		var s = document.createElement("a");
		return s.className = "button " + t, s.innerHTML = e, s.href = "#", s.onclick = function(e) {
			return r === !1 && (d(o[n]), l = n, h(), o[n].style.display = "block", c += i, v()), e.returnValue = !1, !1
		}, s
	}, d = function(e) {
		jQuery("#left-stack .lockup .list li span.price")
			.html(jQuery("div.price", e)
			.html()), jQuery("#left-stack .lockup div.artwork img.artwork")
			.get(0)
			.src = jQuery("div.artwork img.artwork", e)
			.get(0)
			.src
	}, v = function() {
		n = u.length < n ? u.length : n;
		var e = c * n,
			m = u.length,
			g = l,
			y = n * 10;
		if (f[g] === t) return;
		f[g].innerHTML = "";
		var b = n;
		for (var w = 0;
		w < b;
		w++) {
			if (u[w + e] === t) break;
			var E = o[w + e],
				S = document.createElement("a"),
				x = document.createElement("span");
			a[u[w + e].innerHTML.split(s)
				.join("")] = {
				section: E,
				index: w + e
			}, S.className = "tab", S.style.zIndex = y, y -= 10, w === 0 && (S.className += " first"), w + c * n === l && (S.style.zIndex = 99999, S.className += " active", w < b - 1 && (S.className += " shadower")), S.href = "#", S.onclick = function(e) {
				var t = jQuery("span", this)
					.get(0)
					.innerHTML;
				return d(a[t].section), l = a[t].index, h(), a[t].section.style.display = "block", v(), e && e.returnValue && (e.returnValue = !1), !1
			}, x.innerHTML = u[w + e].innerHTML.split(s)
				.join(""), S.appendChild(x), f[g].appendChild(S)
		}
		if (n !== u.length) {
			var T;
			e + n < m ? (T = "next", is_disabled = !1) : (is_disabled = !0, T = "next disabled"), f[g].appendChild(p(i, T, e + n, is_disabled, 1)), e === 0 ? (is_disabled = !0, T = "prev disabled") : (is_disabled = !1, T = "prev"), f[g].appendChild(p(r, T, e, is_disabled, - 1))
		}
		jQuery(f[g])
			.eq(0)
			.height() > jQuery(f[g].children[0])
			.outerHeight() && (n--, v())
	}
}(window)
