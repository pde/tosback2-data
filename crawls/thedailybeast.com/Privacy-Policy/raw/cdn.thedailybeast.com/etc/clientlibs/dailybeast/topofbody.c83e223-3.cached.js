var primaryAccount="rtstdailybeast";
var contentPath=dailybeast.metatags.getContentPath();
if(isContentNewsweek(contentPath)){primaryAccount="rtstnewsweek"
}var s_account=primaryAccount+",rtstglobal";
if(phantomFacebookRequestCheck()||googleWebPreviewRequestCheck()){s_account="rtstdailybeastfbexclude"
}var s=s_gi(s_account);
s.usePlugins=true;
function s_doPlugins(A){if(!A.campaign){A.campaign=A.getValOnce(A.getQueryParam("ref"),"s_campaign",0)
}if(A.campaign){A.events=A.apl(A.events,"event3",",",1)
}A.__checkSessionCookie();
A.events=A.apl(A.events,"event1",",",1);
A.eVar1="D=c1";
A.eVar2="D=c2";
A.eVar3="D=c3";
A.eVar4="D=c4";
A.eVar5="D=c5";
A.eVar6="D=c12";
A.eVar7="D=c13";
A.eVar8="D=c21";
A.eVar9="D=c22";
A.prop31=isUserLoggedIn();
A.prop37=A.getTimeParting("h","-5");
A.prop38=A.getTimeParting("d","-5");
A.prop39=A.getTimeParting("w","-5");
A.eVar10="D=c37";
A.eVar11="D=c38";
A.eVar12="D=c39";
A.prop40=A.getNewRepeat();
A.eVar13="D=c40";
A.prop41=A.getDaysSinceLastVisit("s_lv");
A.eVar14="D=c41";
A.eVar16="D=pageName";
A.eVar19="D=c15";
A.eVar20="D=c16";
A.eVar21="D=c17";
A.eVar22="D=c6";
A.eVar23="D=c7";
A.eVar24="D=c8"
}s.doPlugins=s_doPlugins;
s.charSet="ISO-8859-1";
s.currencyCode="USD";
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.useForcedLinkTracking=false;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="javascript:,www.thedailybeast.com,thedailybeast.com,outbrain.com,newsweek.com,localhost,127.0.0.1,mailto:,https://twitter.com/intent/tweet,http://www.twitter.com/thedailybeast,http://www.facebook.com/thedailybeast,https://plus.google.com/share";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s._channelDomain="Social Media Sites|facebook.com,twitter.com,digg.com,stumbleupon.com,fark.com,reddit.com,linkedin.com,myspace.com,buzz.yahoo.com,delicious.com,del.icio.us,newsvine.com>MSN|.msn.com>MSNBC|msnbc.com,msnbc.msn.com";
var declare_s_Media=function(){s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.co=0;i.cot=0;i.lm=0;i.lom=0;m.l[n]=i}};m._delete=function(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;c['a.contentType']='video';c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y){if(y=='view'||y=='segmentView'||y=='complete'||y=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'COMPLETE':('CLOSE'))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if((x<=3||x==5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||i.x>=100){x=0;m.e(n,2,-1,0,0,-1,pd);v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m.completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";
s.m_i("Media");
s.loadModule("Media")
};
this.declare_s_Media();
s.debugTracking=false;
s.trackLocal=true;
function isContentNewsweek(A){if(A==undefined){return false
}if(A.toLowerCase().indexOf("/content/newsweek")==0){return true
}return false
}function phantomFacebookRequestCheck(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("facebookexternalhit/*")!=-1){return true
}var C=window.location.href.toLowerCase();
if(C.indexOf("fb_xd_bust")!=-1){return true
}if(C.indexOf("fb_xd_fragment")!=-1){return true
}var B=document.referrer.toLowerCase();
if(B.indexOf("//www.facebook.com/plugins/")!=-1){return true
}return false
}function googleWebPreviewRequestCheck(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("google web preview")!=-1){return true
}return false
}function googleWebPreviewCheck(C){var B="";
var A=navigator.userAgent.toLowerCase();
if(A.indexOf("google web preview")==-1){return C
}return B
}var isUserLoggedIn=function(){var A=getCookie("userLoggedIn");
if(A=="true"){return"member"
}return"unregistered"
};
function getCookie(B){var A=document.cookie.split(/[; ]+/);
for(var C=0;
C<A.length;
C++){var D=A[C].substring(0,A[C].indexOf("="));
if(D==B){return A[C].substring(B.length+1)
}}}function trackReadMoreCollapseClick(B,A){s.linkTrackVars="events,prop19,prop20,prop23";
s.linkTrackEvents="event13";
s.events="event13";
s.prop23=B;
if(A!=undefined){s.prop19=A.attr("href")
}s.prop20=document.title;
s.tl(this,"o","Read More - Collapse Click")
}s.getQueryParam=new Function("p","d","u","var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k","if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''");
s.getValOnce=function(E,H,C,A){var D=this,I=new Date,E=E?E:"",H=H?H:"s_gvo",C=C?C:0,B=A=="m"?60000:86400000,G=D.__customSessionCookie||"s_vi__s",F=D.c_r(H);
if(E&&F&&C==0&&D.c_r(G)){if(Math.round(new Date/1000)-D.c_r(G)>1800||E!=F){D.c_w(H,E,0);
return E
}}if(E){I.setTime(I.getTime()+C*B);
D.c_w(H,E,C==0?0:I)
}return E==F?"":E
};
s.__checkSessionCookie=function(){setTimeout(function(){try{s.__views=s.__views||0;
s.__vt=0;
var C="s_i_"+(s.visitorNamespace?s.visitorNamespace:""),A=s.__views||1;
if(typeof window[C]!=="undefined"){s.__vt=1;
for(A;
A>=1;
A++){var D=C+"_"+A;
if(typeof window[D]!=="undefined"){s.__vt=A+1;
continue
}else{break
}}if(s.__vt>s.__views){s.c_w(s.__customSessionCookie||"s_vi__s",Math.round(new Date/1000));
s.__views=s.__vt
}}else{return 
}}catch(B){}},30)
};
s.getNewRepeat=new Function("d","cn","var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length==0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'New';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
s.getTimeParting=new Function("t","z","var s=this,cy;dc=new Date('1/1/2000');if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}else{;z=parseFloat(z);var dsts=new Date(s.dstStart);var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}if(t=='d'){return dow};if(t=='w'){return dt}}};");
s.getDaysSinceLastVisit=new Function("c","var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getTime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.setTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s.c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) return f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s!=f5) return '';else return cval_s;");
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.apl=new Function("l","v","d","u","var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)l=l?l+d+v:v;return l");
s.getPercentPageViewed=new Function("","var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
s.getPPVCalc=new Function("","var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
s.getPPVSetup=new Function("","var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s.getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,false);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEvent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCalc);}");
s.getPPVSetup();
s.getPreviousValue=new Function("v","c","el","var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.visitorNamespace="rtst";
s.trackingServer="rtst.122.2o7.net";
var s_code="",s_objectID;
function s_gi(F,G,P){var I="s.version='H.25.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();e.stopImmediatePropagation();e.preventDefault();n=s.d.createEvent(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_fe=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.applyADMS=function(){var s=this,vb=new Object;if(s.wd.ADMS&&!s.visitorID&&!s.admsc){if(!s.adms)s.adms=ADMS.getDefault();if(!s.admsq){s.visitorID=s.adms.getVisitorID(new Function('v','var s=s_c_il['+s._in+'],l=s.admsq,i;if(v==-1)v=0;if(v)s.visitorID=v;s.admsq=0;if(l){s.admsc=1;for(i=0;i<l.length;i++)s.t(l[i]);s.admsc=0;}'));if(!s.visitorID)s.admsq=new Array}if(s.admsq){s.vob(vb);vb['!visitorID']=0;s.admsq.push(vb);return 1}else{if(s.visitorID==-1)s.visitorID=0}}return 0};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}s.fid=s.gfid();if(s.applyADMS())return '';if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);s.abort=0;s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",L=window,C=L.s_c_il,A=navigator,N=A.userAgent,M=A.appVersion,H=M.indexOf("MSIE "),B=N.indexOf("Netscape6/"),K,E,D,J,O;
if(F){F=F.toLowerCase();
if(C){for(D=0;
D<2;
D++){for(E=0;
E<C.length;
E++){O=C[E];
J=O._c;
if((!J||J=="s_c"||(D>0&&J=="s_l"))&&(O.oun==F||(O.fs&&O.sa&&O.fs(O.oun,F)))){if(O.sa){O.sa(F)
}if(J=="s_c"){return O
}}else{O=0
}}}}}L.s_an="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
L.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
L.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
L.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
L.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
L.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
L.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
L.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
I=s_d(I);
if(H>0){K=parseInt(E=M.substring(H+5));
if(K>3){K=parseFloat(E)
}}else{if(B>0){K=parseFloat(N.substring(B+10))
}else{K=parseFloat(M)
}}if(K<5||M.indexOf("Opera")>=0||N.indexOf("Opera")>=0){I=s_ft(I)
}if(!O){O=new Object;
if(!L.s_c_in){L.s_c_il=new Array;
L.s_c_in=0
}O._il=L.s_c_il;
O._in=L.s_c_in;
O._il[O._in]=O;
L.s_c_in++
}O._c="s_c";
(new Function("s","un","pg","ss",I))(O,F,G,P);
return O
}function s_giqf(){var A=window,E=A.s_giq,C,B,D;
if(E){for(C=0;
C<E.length;
C++){B=E[C];
D=s_gi(B.oun);
D.sa(B.un);
D.setTagContainer(B.tagContainerName)
}}A.s_giq=0
}s_giqf();
var dailybeast=dailybeast||{};
var _gaq=_gaq||[];
var _qevents=_qevents||[];
dailybeast.analytics=function(){var V=["google","sitecatalyst","nielsen","comscore","quantcast"];
var Y={};
function C(g,f){g=g.toLocaleLowerCase();
if(_.indexOf(V,g)>-1){Y[g]=f
}}function B(i,h){if(_.hasValue(Y[i])&&_.hasValue(Y[i].rules)){var g=Y[i].rules;
for(var f in h){if(_.hasValue(g[f])){g[f](h)
}}}return h
}function K(h){if(!_.hasValue(h)){h={}
}for(var g in Y){var f=_.deepClone(h);
switch(g){case"google":D(f);
break;
case"sitecatalyst":E(f);
break;
case"nielsen":d(f);
break;
case"comscore":e(f);
break;
case"quantcast":H(f);
break
}}}function M(h){if(_.hasValue(h.title)){for(var g in Y){var f=_.deepClone(h);
switch(g){case"google":c(f);
break;
case"sitecatalyst":N(f);
break;
case"nielsen":break;
case"comscore":break;
case"quantcast":break
}}}}function D(f){f.url=(_.hasValue(f.url))?f.url:window.location.pathname;
B("google",f);
_gaq.push(["_setDomainName","none"]);
_gaq.push(["_trackPageview",f.url])
}function E(k){var i=s_gi(s_account);
var f=_.keys(i);
$.grep(f,function(m,l){if(_.startsWith(m,"eVar")){i[m]=""
}});
i.events="event1";
if(k.campaignTracking){i.campaign=i.getValOnce(k.campaignTracking,"s_campaign",0);
delete k.campaignTracking
}B("sitecatalyst",k);
var j=Y.sitecatalyst;
if(_.hasValue(j.mappings)){for(var h in k){var g=j.mappings[h];
if(g){i[g]=k[h]
}}}i.t();
i.__checkSessionCookie()
}function d(g){B("nielsen",g);
var f=Y.nielsen;
(function(){var h=new Image(1,1);
h.src=["//secure-us.imrworldwide.com/cgi-bin/m?ci="+f.providerID+"&cg=0&cc=1&si=",escape(window.location.href),"&rp=",escape(document.referrer),"&ts=usergen&rnd=",(new Date()).getTime()].join("")
})()
}function e(g){B("comscore",g);
var f=Y.comscore;
if(typeof COMSCORE=="undefined"){$.warn("COMSCORE was not defined.  comScore call was was not performed.");
return 
}COMSCORE.beacon({c1:f.c1,c2:f.c2,c3:"",c4:"",c5:"",c6:"",c7:g.url?g.url:"",c8:g.pageName?g.pageName:"",c9:g.referer?g.referer:"",c15:""})
}function H(l){var j=[],g,f,h,m,k;
if(l.tags){f=l.tags.split("|");
for(g=0;
g<f.length;
g++){if(f[g].indexOf("topic:")==0){j.push(f[g])
}}h="";
m=j.length;
for(g=0;
g<m;
g++){if(h.length>0){h+=", "
}h+=j[g]
}}k=Y.quantcast;
_qoptions={qacct:k.qacct,labels:h,event:"refresh"};
if(typeof quantserve=="undefined"){$.warn("Function quantserve() is not defined.  Quantcast call was not performed.");
return 
}quantserve()
}function N(m){var f="";
if(m.section||m.title){f="tdb";
f+=" - "+dailybeast.metatags.getTemplate();
if(_.hasValue(m.section)){f+=" - "+m.section
}if(_.hasValue(m.title)){f+=" - "+m.title
}if(_.hasValue(m.index)){f+=" - item "+m.index
}}var j=s_gi(s_account);
var l=[];
for(var h in m.eVars){j[h]=m.eVars[h];
l.push(h)
}j.linkTrackVars=l.join(",");
var g=m.events.join(",");
j.linkTrackVars+=(j.linkTrackVars)?","+g:g;
j.linkTrackVars+=",events";
j.linkTrackEvents=g;
j.events=g;
if(m.delayLoad){var k=m.link||(document.createElement("a"));
j.tl(k,"o",f)
}else{j.tl(true,"o",f)
}}function c(g){var f="";
if(_.hasValue(g.section)){f+=g.section
}if(_.hasValue(g.title)){f+=((f.length>0)?" - ":"")+g.title
}if(_.hasValue(g.index)){f+=" - item "+g.index
}_gaq.push(["_trackEvent","Module Click",dailybeast.metatags.getTemplate(),f])
}function O(f,i){var h=false;
if(i){h=true
}var g={};
g.account=s_account;
g.eventName="Vertical Gallery Click Tracking";
g.event="event32";
g.eVars={};
g.eVars.eVar50=f;
g.eVars.eVar51=""+h;
U(g)
}function Z(i,g,f){var h={};
h.account=s_account;
h.eventName="Sharetool Click Tracking";
h.event="event33";
h.eVars={};
h.eVars.eVar37=i;
h.eVars.eVar38=g;
h.eVars.eVar58=f;
U(h)
}function F(h,f,g){var i={};
i.account=s_account;
i.eventName="More Galleries Conversion Click Tracking";
i.event="event34";
i.eVars={};
i.eVars.eVar52=f;
i.eVars.eVar53=g;
i.eVars.eVar54=h;
U(i)
}function b(g){var f={};
f.account=s_account;
f.eventName="Galleries Complete Click Tracking";
f.event="event35";
f.eVars={};
f.eVars.eVar52=g;
U(f)
}function S(g){var f={};
f.account=s_account;
f.eventName="Mobile to/from Desktop Switching";
f.event="event36";
f.eVars={};
f.eVars.eVar56=g;
f.eVars.eVar57=dailybeast.metatags.getTemplate();
f.eVars.eVar58=getAnalyticsPageName();
f.eVars.eVar59=A();
f.eVars.eVar60=X();
f.eVars.eVar61=Q();
U(f)
}function T(f,h,g){var i={};
i.account=s_account;
i.eventName="Mobile Navigation Click";
i.event="event39";
i.eVars={};
i.eVars.eVar57=g;
i.eVars.eVar58=h;
i.eVars.eVar64=f;
U(i)
}function G(){var f={};
f.account=s_account;
f.eventName="Screen Orientation Switch";
f.event="event37";
f.eVars={};
f.eVars.eVar58=getAnalyticsPageName();
f.eVars.eVar59=A();
f.eVars.eVar60=X();
f.eVars.eVar61=Q();
U(f)
}function P(h,g){var k={};
k.account=s_account;
k.eventName="Mobile Cheat Sheet Tracking";
k.event="event38";
k.eVars={};
var f=$(g).children("h2.title").contents();
var i=$(f[1]).text();
k.eVars.eVar63="db - Cheat - "+i;
if(h=="CHEAT-HEADER"){var j=$(g).hasClass("caret-down");
if(!j){k.eVars.eVar62="open"
}else{k.eVars.eVar62="close"
}}else{k.eVars.eVar62="close"
}U(k)
}function a(f,j,i,h){var g={};
g.account=s_account;
g.eventName="Social Media Tracking";
g.event="event4";
g.eVars={};
g.eVars.eVar30=j;
g.eVars.eVar31=i;
g.eVars.eVar32=h;
g.eVars.eVar58=f;
U(g)
}function J(i,f,g){var h={};
h.account=s_account;
h.eventName="Stories You Might Like Click";
h.event="event44";
h.eVars={};
h.eVars.eVar57=g;
h.eVars.eVar58=f;
h.eVars.eVar65=i;
U(h)
}function I(i,f,g){var h={};
h.account=s_account;
h.eventName="Related Articles Click";
h.event="event46";
h.eVars={};
h.eVars.eVar57=g;
h.eVars.eVar58=f;
h.eVars.eVar65=i;
U(h)
}function R(i,f,g){var h={};
h.account=s_account;
h.eventName="Mobile Related Galleries";
h.event="event45";
h.eVars={};
h.eVars.eVar57=g;
h.eVars.eVar58=f;
h.eVars.eVar65=i;
U(h)
}function U(i){if(typeof i.account=="undefined"){$.error("siteCatalystCustomLinkTracking(): Parameter is not optional");
return 
}if(typeof i.account=="undefined"){$.error("siteCatalystCustomLinkTracking(): account was not provided");
return 
}if(typeof i.eventName=="undefined"){$.error("siteCatalystCustomLinkTracking(): eventName was not provided");
return 
}if(typeof i.event=="undefined"){$.error("siteCatalystCustomLinkTracking(): Success event was not provided");
return 
}if(typeof i.eVars=="undefined"){$.error("siteCatalystCustomLinkTracking(): Conversion variables were not provided");
return 
}var g=s_gi(i.account),j=g.linkTrackVars,f=g.linkTrackEvents,h=g.events;
g.linkTrackVars="events";
g.linkTrackEvents=g.events=i.event;
$.each(i.eVars,function(k,l){g[k]=l;
g.linkTrackVars+=(","+k)
});
g.tl(this,"o",i.eventName);
g.linkTrackVars=j;
g.linkTrackEvents=f;
g.events=h
}function Q(){if(typeof window.orientation=="undefined"){return undefined
}if("Android"==A()){if(screen.height>screen.width){return("Portrait")
}return("Landscape")
}else{switch(window.orientation){case 0:case 180:return("Portrait");
break;
case 90:case -90:return("Landscape")
}}return"Unknown"
}function X(){var f=screen.width;
var g=screen.height;
return f+"x"+g
}function A(){(function(n){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(n)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(n.substr(0,4))
})(navigator.userAgent||navigator.vendor||window.opera);
if(!jQuery.browser.mobile){return"Desktop"
}else{var m=navigator.userAgent.toLowerCase();
var f=/ipad/i.test(m);
if(f){return"iPad"
}var h=/iphone/i.test(m);
if(h){return"iPhone"
}var l=/ipod/i.test(m);
if(l){return"iPod"
}var i=/android/i.test(m);
if(i){return"Android"
}var j=/blackberry/i.test(m);
if(j){return"Blackberry"
}var k=/webos/i.test(m);
if(k){return"WebOS"
}var g=/windows phone/i.test(m);
if(g){return"Windows Phone"
}}}function W(){var l=[];
var h=dailybeast.metatags.getContentPath();
var k=dailybeast.metatags.getWrap();
var f=dailybeast.metatags.getTags("topic",false);
if(h=="/content/dailybeast"){l.push("Homepage");
return l
}else{if(h.indexOf("/content/dailybeast/cheat-sheets")==0){l.push("Cheat-Sheet-Landing-Page");
return l
}else{if(h.indexOf("/cheats/")!=-1){l.push("Cheat");
return l
}else{if(h.indexOf("/content/dailybeast/videos")==0){l.push("Video");
return l
}}}}if(h.indexOf("/content/newsweek")==0){l.push("Newsweek")
}if(k.length>0){var g=k.lastIndexOf("/");
var m=k.substring(g+1);
l.push("wrap:"+m)
}for(var j=0;
j<f.length;
j++){l.push(f[j])
}return l
}function L(f){var j=W();
var h="";
var k=j.length;
for(var g=0;
g<k;
g++){if(h.length>0){h+=", "
}h+=j[g]
}return h
}return{addProvider:C,trackPageview:K,trackEvent:M,trackGalleryClick:O,trackSharetoolClick:Z,trackMoreGalleriesConversionClick:F,trackGalleriesCompleteClick:b,getQuantcastLabelString:L,trackPlatformSwitch:S,trackScreenOrientationChange:G,determineScreenOrientation:Q,trackNavigationClick:T,trackCheatSheetClick:P,trackStoriesYouMightLike:J,trackRelatedGalleries:R,trackMoreArticles:I,trackSocialMedia:a}
}();
$.priorityQ.domReady.add("Adobe SiteCatalyst Social Media Tracking",$.priorityQ.WHENEVER,function(){var C=s_gi(s_account);
var D=C.getQueryParam("source");
if(D){var A=C.getQueryParam("account");
var B=C.getQueryParam("medium");
dailybeast.analytics.trackSocialMedia(getAnalyticsPageName(),D,A,B)
}});
$(window).bind("orientationchange",checkOrientation);
$(window).bind("resize",checkOrientation);
setInterval(checkOrientation,2000);
var previousOrientation=window.orientation;
function checkOrientation(){if(window.orientation!==previousOrientation){previousOrientation=window.orientation;
dailybeast.analytics.trackScreenOrientationChange()
}}var dailybeast=dailybeast||{};
dailybeast.analytics=dailybeast.analytics||{};
dailybeast.analytics.configuration=function(){function init(){bindDocumentClick();
bindCustomLinkTrack()
}function bindDocumentClick(){$("*[data-track]").live("click",function(event){var target=$(event.target);
var link=$(target).closest("a");
var track=$(this);
var section=$(target).closest("[data-section]");
if(link.length>0){var data=eval("("+track.attr("data-track")+")");
if(typeof data.delayLoad==undefined){data.delayLoad=(link.attr("href").indexOf("#")!=0)
}if(data.isRealLink){data.link=link.get(0)
}var context=(section.length>0)?section:$(document);
var siblings=$(context).find("[data-track='"+track.attr("data-track")+"']");
if(siblings.length>1){data.index=$(siblings).index($(track))+1
}var parents=track.parents();
var sections=[];
for(var i=parents.length-1;
i>=0;
i--){var parent=$(parents[i]);
if(parent.attr("data-section")){var sectionData=$.parseJSON(parent.attr("data-section"));
sections.push(sectionData.title)
}}if(sections.length>0){data.section=sections.join(" - ")
}data.events=["event2"];
data.eVars={eVar1:null,eVar3:null,eVar15:data.section,eVar16:"D=pageName",eVar17:data.title};
dailybeast.analytics.trackEvent(data)
}})
}function bindCustomLinkTrack(){}return{init:init}
}();
dailybeast.analytics.addProvider("google",{rules:{pageNum:function(A){A.pageNum++;
A.url=A.url.replace(".html",".page"+A.pageNum+".html")
}}});
dailybeast.analytics.addProvider("sitecatalyst",{rules:{pageNum:function(A){A.pageNum++
}},mappings:{contentPath:"prop1",templateName:"prop3",pageNum:"prop4",previousPageName:"prop7",wrapName:"prop8",tags:"prop17",url:"pageURL",referer:"referrer",pageName:"pageName",platform:"prop44"}});
dailybeast.analytics.addProvider("nielsen",{providerID:"us-302188h"});
dailybeast.analytics.addProvider("comscore",{c1:2,c2:6433482});
dailybeast.analytics.addProvider("quantcast",{qacct:"p-bcLY1r4ynM-2-"});
$.priorityQ.domReady.add("Analytics Providers",$.priorityQ.CRITICAL,function(){dailybeast.analytics.configuration.init()
});
var dailybeast=dailybeast||{};
s.Media.autoTrack=false;
s.Media.SegmentByMilestones=false;
s.Media.completeByCloseOffset=false;
s.Media.playerName="Brightcove video player with Adobe Omniture video tracking integration";
s.Media.trackUsingContextData=true;
s.Media.contextDataMapping={"a.media.name":"eVar40,prop60","a.contentType":"eVar42","a.media.timePlayed":"event41","a.media.view":"event40","a.media.segmentView":"event43","a.media.complete":"event42","a.media.milestones":{}};
dailybeast.OmnitureVideoTracking=function(){D("dailybeast.OmnitureVideoTracking(): I am starting!");
if(typeof s.Media=="undefined"){D("dailybeast.OmnitureVideoTracking(): s.Media is undefined!");
D("dailybeast.OmnitureVideoTracking(): Redefining s.Media by calling declare_s_Media()");
declare_s_Media();
if(typeof s.Media=="undefined"){D("dailybeast.OmnitureVideoTracking(): WOW! s.Media is still undefined!")
}else{D("dailybeast.OmnitureVideoTracking(): Now s.Media is defined!")
}}var K=brightcove.api;
var b=K.modules;
var J=b.APIModules;
var B=b.APIModules.VIDEO_PLAYER;
var T="";
var d;
var S;
var n=false;
var A=false;
var Y=false;
var g=true;
var U=20;
var G={};
var i=75;
var Z={videoName_eVar:"eVar40",videoName_prop:"prop60",segments_eVar:"eVar41",contentType_eVar:"eVar42",videoTime_event:"event41",videoViews_event:"event40",videoCompletes_event:"event42",videoSegmentViews_event:"event43"};
var L=["contextData.page_name,contextData.page_url,contextData.brightcove_playertype,contextData.live_video"];
var N=[];
if(g){D("Video progress tracking turned on every "+U+" seconds.")
}function M(w){if(dailybeast.videoUtility.getUrlVar("debug")=="true"){Y=true
}D("onPlayerLoaded("+w+") starts.");
if(typeof s==undefined){D("onPlayerLoaded("+w+"): s is undefined!")
}if(typeof s.Media==undefined){D("onPlayerLoaded("+w+"): s is undefined!")
}D("onPlayerLoaded(): Calling resetVideoInfo()");
v();
T=w;
var t=K.getExperience(w);
D("experience object created by calling brightcove.api.getExperience("+w+");");
var q=t.getModule(b.APIModules.EXPERIENCE);
q.addEventListener(K.events.ExperienceEvent.TEMPLATE_READY,r);
D("onPlayerLoaded("+w+") completed");
function v(){T="";
d=undefined;
S=undefined
}function u(){if(typeof (d)=="undefined"||d==null){D("determineCurrentVideo(): Calling asynchronous version of videoPlayer.getCurrentVideo()");
var x=t.getModule(B);
x.getCurrentVideo(y)
}function y(z){D("currentVideoHandler() was called back with result=");
D(z);
d=z
}}function p(){if(typeof (S)=="undefined"||S==null){D("determineCurrentRendition(): Calling asynchronous version of videoPlayer.getCurrentRendition()");
var y=t.getModule(B);
y.getCurrentRendition(x)
}function x(z){D("currentRenditionHandler() was called back with result=");
D(z);
S=z
}}function r(z){D("onTemplateReady() starts");
u();
p();
var x=K.getExperience(T);
var AA="HTML5";
if(x.type==brightcove.playerType.FLASH){AA="FLASH";
n=false
}else{n=true
}if(Y){if(AA=="HTML5"){D("HTML5 Brightcove Player is loaded!")
}else{D("Flash Brightcove Player is loaded!")
}}if(s){s.contextData.brightcove_playertype=AA;
s.contextData.page_name=s.pageName;
s.contextData.page_url=s.prop1
}else{D("onTemplateReady(): Error!  s is undefined.")
}var y=x.getModule(B);
var AB=K.events.MediaEvent;
y.addEventListener(AB.BEGIN,a);
y.addEventListener(AB.PLAY,l);
y.addEventListener(AB.CHANGE,l);
y.addEventListener(AB.STOP,l);
y.addEventListener(AB.SEEK_NOTIFY,l);
y.addEventListener(AB.ERROR,l);
y.addEventListener(AB.COMPLETE,l);
y.addEventListener(K.events.CuePointEvent.CUE,c);
D("onTemplateReady() completed")
}}function a(p){if(Y){}var v=o();
var u=X();
var q=false;
var t=p.media.length;
if(t<0){D(v+" is a live video");
q=true
}else{D(v+" is not a live video because it has a length of "+t)
}s.contextData.live_video=q;
var r="1:s:0-"+U;
s.eVar41=r;
s.Media.trackVars="events,"+Z.videoName_prop+","+Z.videoName_eVar+","+Z.segments_eVar+","+Z.contentType_eVar;
if(L.length>0){s.Media.trackVars=s.Media.trackVars+","+L.join(",")
}D("s.Media.trackVars="+s.linkTrackVars);
s.Media.trackEvents=Z.videoTime_event+","+Z.videoCompletes_event+","+Z.videoViews_event+","+Z.videoSegmentViews_event;
if(N.length>0){s.Media.trackEvents=s.Media.trackEvents+N.join(",")
}D("mediaBeginEventHandler(): Calling trackStartVideo() with mediaName="+v+" and mediaLength="+u);
V(v,u,"Brightcove Smart Player")
}function j(p,q){var t={};
for(var r=q;
r<p;
r+=q){t[r]=r
}return t
}function f(p,q){var r={};
var u=1;
for(var t=0;
t<p;
t+=q){r[t]=u+":s:"+t+"-"+(t+q);
u++
}return r
}function l(p){var r=o();
var q=p.type;
if(q=="mediaProgress"){D("mediaEventHandler(pEvent): Event: "+q+" fired for video "+r+".  Video position: "+p.position);
return 
}D("mediaEventHandler(pEvent): Event: "+q+" fired for video "+r+".  Video position: "+p.position);
if(q=="mediaStop"){e(r,p.position)
}else{if(q=="mediaPlay"){Q(r,p.position)
}else{if(q=="mediaComplete"){P(r,p.position);
C(r)
}else{if(q=="mediaSeekNotify"){if(!n){return 
}m(T).pause(true);
return 
}else{if(q=="mediaError"){e(r,p.position)
}else{D("mediaEventHandler() called with pEvent type:"+q+", position: "+p.position);
console.trace();
D("This event was NOT handled by mediaEventHandler()")
}}}}}}s.Media.monitor=function(AB,q){var z=q.event;
var u=q.name;
var t=q.length;
var p=Math.round(q.offset);
var y=false;
if(typeof s.Media=="undefined"){D("s.Media.monitor(): ERROR!  s.Media has not been defined!")
}D("s.Media.monitor(): Event "+z+" / Event video "+u+" caught. Offset="+q.offset);
if(z=="PLAY"){D("s.Media.monitor(): Event "+z+" caught for video "+u+", position: "+p);
G[u].lastSecondHandled=p;
return 
}if(z!="MONITOR"){D("Exit s.Media.monitor() for video "+u+": Events of type "+z+" that are NOT 'MONITOR' events are not welcome here");
D(q);
return 
}if(A){D("s.Media.monitor() Position:"+p+"- No more tracking for:"+u);
e(u,p);
return 
}if(t==-1){t=2*60*60*1000;
y=true
}D("s.Media.monitor(): OK, this is a real MONITOR event for "+u);
if(G[u]==undefined){D("mediaBeginEventHandler(): I will now start to track "+u);
G[u]=[];
if(g){var w=t/1000;
var r=j(w,U);
var x=f(w,U);
G[u]=r;
G[u].segmentNames=x;
G[u].lastSecondHandled=0
}G[u].videoPlaybackComplete=false
}if(g){var v=p-G[u].lastSecondHandled;
if(v>1){D("Oops!  We skipped "+(p-G[u].lastSecondHandled)+" seconds!");
while(v>1){G[u].lastSecondHandled++;
AA(G[u].lastSecondHandled);
v--
}}AA(p);
G[u].lastSecondHandled=p
}var AC=q.percent*1000;
if(typeof (i)!="undefined"&&AC>=i&&!G[u].videoPlaybackComplete){D("s.Media.monitor(): The video playback for video "+u+" reached "+AC+" percent and now is considered complete.  Let's track this milestone by calling trackCompleteVideo("+u+","+p+").");
P(u,p);
G[u].videoPlaybackComplete=true
}function AA(AD){D("s.Monitor.trackThisSecond(): Tracking second: "+AD);
var AF=G[u];
if(AF[AD]!=undefined){var AE=G[u].segmentNames[AD];
D("s.Media.monitor(): The video playback reached "+AD+" seconds.  Let's track this milestone by calling trackVideoProgress("+u+"). with s.eVar41="+AE);
s.eVar41=AE;
O(u);
AF[AD]=undefined;
G[u]=AF
}}};
function V(r,q,p){D("trackStartVideo("+r+", "+q+", "+p+") called");
if(!s.Media){$.log("Error!  s.Media has not been defined!")
}D("trackStartVideo(): Now calling s.Media.open()...");
s.Media.open(r,q,p);
D("Omniture s.Media.open('"+r+"',"+q+", "+p+") called.");
Q(r,0);
D("trackStartVideo: trackPlayVideo() has been  called - starting the video has completed.")
}function Q(q,p){D("trackPlayVideo("+q+","+p+") here");
if(typeof s.Media.play=="undefined"){D("Error: s.Media.play is undefined")
}else{s.Media.play(q,p);
D("Omniture s.Media.play("+q+","+p+") called.")
}}function e(q,p){s.Media.stop(q,p);
D("Omniture s.Media.stop("+q+","+p+") called.")
}function C(p){s.Media.close(p);
D("Omniture s.Media.close("+p+") called.")
}function P(q,p){s.Media.complete(q,p);
D("Omniture s.Media.complete("+q+","+p+") called.")
}function O(p){if(!s.Media){$.log("Error!  s.Media has not been defined!")
}s.Media.track(p);
D("Omniture s.Media.track("+p+") called.")
}function c(p){D("EVENT: "+p.type+" fired ("+p.cuePoint.time+", "+p.cuePoint.metadata+")");
D(p)
}function R(){return d
}function h(){return S
}function k(){if(!Y){return 
}var p=R();
$.log("--------------");
$.log("Current Video:");
$.log("--------------");
W(p)
}function H(){if(!Y){return 
}var p=h();
$.log("------------------");
$.log("Current Rendition:");
$.log("------------------");
W(p)
}function m(r){var p=K.getExperience(r);
var q=p.getModule(B);
return q
}function W(q){if(!Y){return 
}for(var p in q){$.log("  "+p+" = "+q[p])
}}function o(){return E()+" - ("+I()+")"
}function E(){return R().displayName
}function I(){return R().id
}function X(){return R().length
}function D(p){if(!Y){return 
}$.log(T+":"+p)
}function F(){A=true
}this.onPlayerLoaded=M;
this.stopVideoTracker=F;
D("dailybeast.OmnitureVideoTracking() completed");
return this
};
dailybeast.videoUtility=(function(){var C=function(){var G=(window.ActiveXObject!=undefined);
var D=false;
if(typeof navigator.plugins!="undefined"&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){D=true
}}else{if(G){var F=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
var E=F.GetVariable("$version");
D=true
}}return D
};
var B=function(){var G=document.createElement("video");
var K=document.createElement("canvas");
var F=!!document.createElement("canvas").getContext;
var J=G.canPlayType!=undefined;
var H=!!(G.canPlayType&&G.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,""));
var D=!!(navigator.userAgent.match(new RegExp("android","i")));
var E=/BlackBerry.*Version\/6\.0/.test(navigator.userAgent);
var I=(F&&J&&H&&!E)||D;
return I
};
var A=function(H){var G=[],F;
var D=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");
for(var E=0;
E<D.length;
E++){F=D[E].split("=");
if(F[0]==H){return F[1]
}}return""
};
return{isFlashInstalled:C,isHtml5VideoSupported:B,getUrlVar:A}
}());
var dailybeast=dailybeast||{};
dailybeast.video=function(){var G=[];
var E=this;
var C={};
var F=false;
function J(K){return C[K]
}function H(N){try{$.log("Calling onPlayerLoaded() for experienceId: "+N);
C[N]=dailybeast.OmnitureVideoTracking();
C[N].onPlayerLoaded(N)
}catch(O){$.error("An error occurred when calling dailybeast.OmnitureVideoTracking(): "+O.message)
}var L=brightcove.api.getExperience(N);
var M=L.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
function K(P){I(P)
}M.addEventListener(brightcove.api.events.MediaEvent.COMPLETE,K)
}function B(K){if(dailybeast.video.ytAPIReady){new YT.Player(K,{events:{onStateChange:I}})
}}function D(K){if($.inArray(K,G)){G.push(K)
}}function I(L){for(var K=0;
K<G.length;
K++){G[K].call(dailybeast,L)
}}function A(O){var N="1140772469001";
var Q="AQ~~,AAAAAAEDRq0~,qRcfDOX2mNtWW87VePrJiaFRXUo43tGn";
var M=false;
var L=dailybeast.videoUtility.getUrlVar("debug");
if(L=="true"){M=true
}var K=dailybeast.videoUtility.getUrlVar("forceHTML");
var P=dailybeast.videoUtility.getUrlVar("HTML5VIDEO");
if(M){_.logMessage("forceHTML="+K+" - HTML5VIDEO="+P)
}if((!dailybeast.videoUtility.isFlashInstalled()&&dailybeast.videoUtility.isHtml5VideoSupported())||K=="true"||P=="true"){if(M){_.logMessage("Flash Player not supported or HTML5 video player requested.")
}O("object.BrightcoveExperience > param[name='playerID']").attr("value",N);
O("object.BrightcoveExperience > param[name='playerKey']").attr("value",Q);
if(M){_.logMessage("Chromeless Player which is HTML5 video capable applied")
}}else{if(M){_.logMessage("Flash is supported - <%=videoPlayerKeyMapping.get(playerKey)%> used.")
}}}return{onPlayerLoaded:H,addVideoEventListener:D,determineBrightcoveVideoPlayerType:A,getOmnitureTracker:J,initYTPlayer:B}
}();
function onYouTubePlayerAPIReady(){dailybeast.video.ytAPIReady=true
}(function(){var A=document.createElement("script");
A.src="http://www.youtube.com/player_api";
var B=document.getElementsByTagName("script")[0];
B.parentNode.insertBefore(A,B)
})();