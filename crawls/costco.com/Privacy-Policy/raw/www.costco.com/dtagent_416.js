function DynaTraceCls(){var d=this;this.version='416';d._aa=[];d._ba=1;d._ca=0;d._da='';d._ea=[];d._fa=[];d._ga=[];d._ha=function(){return new Date().getTime();};d._ia=function(ug){return document.getElementsByTagName(ug);};d._ja=function(){var vg=null;if(!d._ka){vg=d._la._ma;d._la._ma=null;}
else{vg=d._ka._la._ma;d._ka._la._ma=null;}
return vg;};d._na=function(){if(d._oa){return;}
try{d._pa._na();d._qa._na();d._oa=true;}
catch(e){}};d._ra=function(wg,xg,yg,zg){var Ag='';if(!wg){Ag=d._sa._ta(xg);}
else{Ag=d._sa._ua();}
if(Ag.length>0){var Bg=new d._va();if(d._wa.reportUrl){Bg.monitorUrl=d._wa.reportUrl;}
if(wg){Bg.a('PV',1);}
Bg.a('url',d._qa._xa(document.location.toString()));Bg.a('title',d._qa._xa(document.title));Bg.a('frames',d._ca);Bg.a('pId',d._ya);Bg.a('fId',d._za);Bg.a('pFId',d._da);Bg.a('rId',d._wa.requestId);Bg.a('rpId',d._wa.rpid);Bg.a('actions',d._qa._xa(Ag));Bg.a('domR',d.getDomReadyTime());Bg.a('dtV',d.version);if(d._sa._Aa()){Bg.a('unload','xhr');}
var Cg=d._la._Ba();if(Cg){Bg.a('ttfb',d._la._Ba());}
for(var i=0;i<d._fa.length;i++){d._fa[i](Bg,wg);}
var Dg=null;if(yg){Dg=function(Eg){d._qa.setLatencyCookie(Eg/2);};}
d._Ca._Da(Bg,Dg,zg);}};d.sls=function(){if(!d._Ea){return;}
if(!d._ka){d._la._ma=d._ha();}
else{d._ka._la._ma=d._ha();}};d.sle=function(){if(!d._Ea){return;}
d._Fa();};d._Ga=function(){d._ra(false,true,false,true);var ua=d._pa._Ha();if(ua){d._sa._Ia(ua.name,ua.type,ua.time);}else{d._sa._Ia(null,null,null);}
if(navigator.vendor&&(navigator.vendor.search('Apple')>=0)){if(window.frames){for(var i=0;i<window.frames.length;i++){try{if(window.frames[i].dT_){window.frames[i].dT_._Ga();}}
catch(err){}}}}
d._Ja();d._Ka();};d._Ka=function(){if(d._La){return;}
d._Ma.remove(d._za);d._La=true;};d._Na=function(){d._Ma.add(d._za);d._sa._Oa('_load_','_load_',d._la._Pa(),null);if(d._la._Qa){d._sa._Ra('_load_','_ttfb_',d._la._Pa(),d._la._Sa());}
d._Ta();};d._Fa=function(){if(!d._Ua){d.la('_load_');d._Ta();d._Ua=true;}};d._Va=function(){d._Ta();if(!d._Wa){if(document.readyState=='complete'){if(!d._Xa){d._Xa=true;setTimeout(d._Va,3000);}
else{d._ra(false,true,true,false);}}
else{setTimeout(d._Va,3000);}}};d.iolm=function(){d._ba++;};d.solb=function(){if(!d._Ya){d._Ya=true;d._sa._Oa("_onload_","_load_",null,d._sa._Za());}};d._$a=function(){d._Ta();if(!d._Wa){d.solb();d._Wa=true;d._ab._bb();setTimeout(d._cb,0);}};d.sole=function(){d._ba--;if(d._ba<=0){d._db();}};d._cb=function(){if(!d._eb){d._eb=true;d._Ta();for(var i=0;i<d._ea.length;i++){try{d._ea[i]();}
catch(e){}}
d.sole();}};d._db=function(){d._wa.checkImagesTimeout=0;d._wa.checkScriptsTimeout=0;var Fg=d._la._fb();var Gg=d._la._gb();if(Fg&&Gg){d.la("_onload_",Fg,Gg);}
else{d.la("_onload_");}
if(!d._hb){d._Fa();}};d._Ja=function(){};d._ib=function(){d._qa._jb(window,'beforeunload',d._Ga);if(window.opera){d._qa._jb(window,'unload',d._Ga);}
d._qa._jb(window,'unload',d._na);if(d._qa._kb){d._qa._jb(document,'readystatechange',d._lb);}
else{d._qa._jb(window,'load',d._$a);setTimeout(d._Va,3000);}};d._lb=function(){if(document.readyState=='loaded'){d._Ta();}
if(document.readyState=='complete'){d._$a();}};d._mb='dtCookie';d._nb=false;d._ob=function(){d._nb=false;d._ra(false,false,true,false);};d._pb=function(){if(!d._nb){setTimeout(d._ob,5000);d._nb=true;}};d._qb=function(Hg,Ig){var Jg=d._ha();var Kg=d._sa._Ra(Ig,Hg,Jg,Jg,-1,null);if(Kg){d._pb();}};d.getDomReadyTime=function(){var p=d._qa.getPerformance();if(p&&p.timing){if(p.timing.domComplete&&p.timing.domComplete>0){return p.timing.domComplete;}else if(p.timing.domContentLoaded&&p.timing.domContentLoaded>0){return p.timing.domContentLoaded;}}
return d._rb;};d._sb=function(){if(d._qa._kb){(function(){var Lg=document.createElement('doc:rdy');try{Lg.doScroll('left');Lg=null;d._rb=new Date().getTime();d._Ta();}
catch(e){setTimeout(arguments.callee,0);}})();}
else{document.addEventListener('DOMContentLoaded',function(){d._rb=new Date().getTime();d._Ta();},false);}};d._tb=function(){try{if(parent&&(parent!=self)&&parent.dT_){return parent.dT_._tb();}}
catch(err){}
return d;};d._bb=function(){var Mg=d._qa._ub(d._mb);if(!Mg){d._vb=true;}
if(Mg=='blocked'){}
else if(!d._Ea){d._wa._bb();if(!d._wa.requestId){d._wa.requestId=d._qa.getRID(d._wa.ridPath);}
d._Ea=true;d._Ca.init(d._qa);d._za='G_'+d._ha().toString();try{if(parent&&(parent!=self)&&parent.dT_){d._wb=parent.dT_;d._ka=parent.dT_._tb();}}
catch(err){}
if(!d._ka){d._ya=d._za;d._xb=document.title;}
else{d._ya=d._ka._ya;d._xb=d._ka._xb;d._da=d._wb._za;d._wb._ca++;}
var Ng=(d._wb?d._wb._sa:null);d._sa._bb(d._qa,Ng,d._za,d._ab,d._pb,d._ra,d._Ma);d._pa.init(d._wa,d._qa,d._za);d._ab._bb(d._qa,d._pa,d._qb);d._ib();d._la._bb(d._qa,d._wa.nottfb);if(d._wa._yb){d._zb();}
if(d._wa.checkImagesEnabled){d._Ab();}
d._sb();d._Na();}};d.isc=function(Og){return(Og&&Og>=371);};d.cfg=function(Pg){if(!d._Ea){return;}
return d._wa[Pg];};d._Bb=function(Qg){if(!d._Ea){return;}
d._ea.push(Qg);};d._Cb=function(Rg){if(!d._Ea){return;}
d._fa.push(Rg);};d._Db=function(Sg){d._ga.push(Sg);};d._Ta=function(){if(d._Ea){d._pa._Eb();for(var i=0;i<d._ga.length;i++){d._ga[i]();}}};d.ex=function(Tg,Ug){if(!d._Ea){return;}
if(arguments.length==1){Ug=3;}
var ua=d._pa._Ha();var Vg=null;if(ua){Vg=d._aa[ua.time];}
var Wg=null;if(!Vg){Vg=d._sa._Aa();}
if(Vg){Wg=d._sa._Fb(Vg);}else{if(ua){if(Ug>=3){Wg=d._sa._Gb(ua.name,ua.type,ua.time);d._aa[ua.time]=Wg;if(d._Hb){d._Hb._Ib();}}}
else{var ca=d._sa._Za();if(ca){if(Ug>=1){Wg=d._sa._Fb(ca._Jb,Tg,'xhr',d._ha());if(d._Hb){d._Hb._Ib();}}}else{d._Kb('No Current action found: ignoring new ajax action: '+Tg);}}}
return Wg;};d.lx=function(Xg){if(!d._Ea){return;}
var Yg=d._sa._Lb();if(Yg>1){setTimeout(function(){d._sa._Mb(Xg);},0);}
else{if(d._Hb){d._Hb._Nb(function(){setTimeout(function(){d._sa._Mb(Xg);},0);});}
else{setTimeout(function(){d._sa._Mb(Xg);},0);}
d._Ta();return true;}
return false;};d.ec=function(Zg){if(!d._Ea){return;}
d._sa._Ob(Zg);};d.lc=function($g){if(!d._Ea){return;}
d._sa._Pb($g);};d.bi=function(ah,bh,ch){if(!d._Ea){return;}
return d._pa._Qb(ah,bh,ch);};d.ei=function(ui){if(!d._Ea){return;}
d._pa._Rb(ui);};d.aad=function(dh){d._pa._Sb(dh);};d.ea=function(eh,fh,gh,hh){if(!d._Ea){return;}
if(arguments.length<4||typeof hh=='undefined'){hh=true;}
return d._sa._Oa(eh,fh,gh,hh)._Jb;};d.la=function(ih,jh,kh){if(!d._Ea){return;}
d._Ta();var lh=arguments;if(d._Hb&&d._Hb._Tb){d._Hb._Nb(function(){d._sa._Ub.apply(d._sa,lh);});}
else{d._sa._Ub.apply(d._sa,lh);}};d.pe=function(mh,nh){if(!d._Ea){return;}
d._qb(mh,'_error_',nh);};d.pw=function(oh,ph){if(!d._Ea){return;}
d._qb(oh,'_warning_',ph);};d.pl=function(qh,rh){if(!d._Ea){return;}
d._qb(qh,'_log_',rh);};d.tp=function(){if(!d._Ea){return;}
return!d._ka;};d.slem=function(){if(!d._Ea){return;}
d._hb=true;};d.ti=function(){dT_._Ta();};d.dbg=function(e){d._qa._Vb('dtUseDebugAgent',e);};}
if(typeof window.dT_!='undefined'){if(typeof console!='undefined'){console.log('WARNING: dynaTrace agent does already exist on this page! Is it injected multiple times?');}}else{window.dT_=new DynaTraceCls();document.dT_=window.dT_;}(function(){var u={};u._Wb=(typeof window.XMLHttpRequest!='undefined')?window.XMLHttpRequest:null;u._Xb=(typeof window.ActiveXObject!='undefined')?window.ActiveXObject:null;u._Yb='dtLatC';u._Zb=false;u._kb=(navigator.userAgent.indexOf('MSIE')>=0);u._$b=[];u._ac=(navigator.appName=='Safari'||navigator.userAgent.indexOf('Safari')>-1);u._bc=(typeof window.opera!='undefined');u._cc=navigator.userAgent.toLowerCase().indexOf('chrome')>-1;u._dc=/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);u._ec=u._dc?Number(RegExp.$1):-1;u._fc=function(sh,th){for(var p in th){if(th.hasOwnProperty(p)){sh[p]=th[p];}}
return sh;};u._gc=function(uh){var r=false;if(u._kb){if(uh.complete){r=true;}}
else{if(uh.naturalWidth>0){r=true;}}
return r;};u._hc=function(vh){if(vh.indexOf('://')==-1){return null;}
var wh=vh.split('/');var xh=wh[2].split(':');var yh=xh[0];return yh.toLowerCase();};u._ic=function(zh){if(!zh){return null;}
zh=zh.replace(/^\s+/,'');for(var i=zh.length-1;i>=0;i--){if(/\S/.test(zh.charAt(i))){zh=zh.substring(0,i+1);break;}}
return zh;};u._xa=function(Ah){Ah=encodeURIComponent(Ah);var Bh=[];var i=0;while(i<Ah.length){var Ch=Ah.charAt(i++);if(Ch=='!'){Bh.push('%21');}
else if(Ch=='~'){Bh.push('%7E');}
else if(Ch=='*'){Bh.push('%2A');}
else if(Ch=='('){Bh.push('%28');}
else if(Ch==')'){Bh.push('%29');}
else if(Ch=='\''){Bh.push('%27');}
else if(Ch=='$'){Bh.push('%24');}
else if(Ch==';'){Bh.push('%3B');}
else if(Ch==','){Bh.push('%2C');}
else{Bh.push(Ch);}}
return Bh.join('');};u._Vb=function(Dh,Eh){document.cookie=Dh+'='+Eh+';path=/'+((u._jc)?";domain="+u._jc:"");};u.getPerformance=function(){if(!u._kc&&!u._dc){if(typeof window.performance!='undefined'){u._kc=window.performance;}
else if(typeof window.msPerformance!='undefined'){u._kc=window.msPerformance;}
else if(typeof window.mozPerformance!='undefined'){u._kc=window.mozPerformance;}}
return u._kc;};u._ub=function(Fh){var i,pos,key,value;var Gh=document.cookie.split(";");for(i=0;i<Gh.length;i++){pos=Gh[i].indexOf("=");key=Gh[i].substring(0,pos);value=Gh[i].substring(pos+1);key=key.replace(/^\s+|\s+$/g,"");if(key==Fh){return value;}}
return null;};u.getRID=function(Hh){var Ih=Hh?Hh:window.location.pathname;var Jh=window.location.search;if(Jh&&Jh.length>0){if(Jh.charAt(0)=='?'){Jh=Jh.substring(1);}}
return 'RID_'+u._lc(Ih,Jh);};u._lc=function(Kh,Lh){var Mh=1;Mh=31*Mh+u._mc(Kh);Mh=31*Mh+u._mc(Lh);Mh=Mh&Mh;return Mh;};u._mc=function(s){var Nh=0;if(s){var Oh=s.length;for(var i=0;i<Oh;i++){Nh=Nh*31+s.charCodeAt(i);Nh=Nh&Nh;}}
return Nh;};u._nc=function(){};u.trace=function(Ph){u._nc();if(u._oc){u._oc._Kb(Ph);return;}};u._Kb=function(Qh){u._nc();if(u._oc){u._oc._Kb(Qh);return;}else if((typeof console)!='undefined'&&console.log){console.log(Qh);}};u._jb=function(Rh,Sh,Th){if(u._kb){Rh.attachEvent('on'+Sh,Th);}
else{Rh.addEventListener(Sh,Th,false);}
u._$b.push({_pc:Rh,_qc:Sh,_rc:Th});};u._na=function(){var i;for(i=0;i<u._$b.length;i++){var li=u._$b[i];u._sc(li._pc,li._qc,li._rc);}
u._$b=null;};u._sc=function(Uh,Vh,Wh){if(u._kb){Uh.detachEvent('on'+Vh,Wh);}
else{Uh.removeEventListener(Vh,Wh,false);}};u.getXHR=function(){var Xh=null;if(!u._Wb){var ax=['Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP','Microsoft.XMLHTTP'];for(var i=0;i<ax.length&&!Xh;i++){try{Xh=new u._Xb(ax[i]);}
catch(e){}}}
else{Xh=new u._Wb();}
return Xh;};u._tc=function(){var Yh=u._ub(u._Yb);if(Yh){var Zh=Yh.split('|');if(Zh.length>0){return parseInt(Zh[0],10);}}
return 0;};u.setLatencyCookie=function($h){var ai=u._ub(u._Yb);var ci=0;var di=[];var fi=0;if(ai&&(ai.length>0)){var gi=ai.split('|');if(gi.length>1){fi=gi.length-1;}
if(fi>9){fi=9;}
for(var i=1;i<=fi;i++){ci+=parseFloat(gi[i]);di[i+1]=gi[i];}}
ci+=$h;fi++;di[0]=parseInt(ci/fi,10);di[1]=$h;u._Vb(u._Yb,di.join('|'));};if(!dT_._qa){dT_._qa=u;dT_._Kb=u._Kb;u._Zb=(u._ub('dt_dbg_console')=='true');}})();(function(){var a={};a._qa=dT_._qa;a._uc=true;a._vc=0;a.t=dT_._qa._ic;a._wc=function(hi){if(hi){parts=hi.split('/');if(parts.length>0){return a.t(parts[parts.length-1]);}}
return hi;};a._xc=a._wc(window.location.href);a._ia=function(ii){return document.getElementsByTagName(ii);};a._yc=function(){for(var i=0;i<arguments.length;i++){var v=arguments[i];if(v&&a.t(v)){return a.t(v);}}
return null;};a._zc=function(o){if(o.childNodes){var ji=null;for(var i=0;i<o.childNodes.length;i++){a._vc++;var ki=a._Ac(o.childNodes[i]);a._vc--;if(ki){if(ji){return null;}
else{ji=ki;}}}
if(ji){return ji;}}
return null;};a._Bc=function(mi){if(mi){parts=mi.split('/');if(parts.length>0){return parts[parts.length-1].split('.')[0];}}
return null;};a._Ac=function(o){if(!o||a._vc>20){return null;}
if(o.attributes){var ni=o.attributes["data-dtName"];if(ni&&ni.value){return ni.value;}}
var r=a.t(a._zc(o));if(r){return r;}
var on=o.nodeName?o.nodeName.toUpperCase():'';var ot=o.type?o.type.toUpperCase():null;if((on=='INPUT')&&ot!='HIDDEN'){var s=(ot&&(ot=='BUTTON'||ot=='SUBMIT'||ot=='RESET'))?o.value:null;return a._yc(s,o.name,o.title,o.alt,o.id,a._wc(o.src),o.className,'input: '+ot);}
else if(on=='BUTTON'){return a._yc(o.textContent,o.innerText,o.name,o.title,o.alt,o.id,o.className,'button');}
else if(on=='IMG'){return a._yc(o.name,o.title,o.alt,o.id,a._Bc(o.src));}
else if(on=='FORM'){return a._yc(o.name,o.id,o.action,'FORM');}
else if(on=='A'){return a._yc(o.textContent,o.innerText,o.title,o.id,a._wc(o.href),o.className,'Link');}
else if(on=='HTML'||on=='BODY'){return 'Page: '+a._xc;}
else{if(!o.childNodes||o.childNodes.length<=1){r=a._yc(o.textContent,o.innerText,o.data,o.wholeText);}
if(r){return r;}
r=a._yc(o.title,o.id,o.className);if(r){return r;}}
if(a._vc&&a._vc>0){return null;}
else{return on;}};a._Cc=function(oi){if(oi){a._Rb(oi);}};a._Dc=function(pi){return function(e){a._Ec(pi,e||window.event);};};a._Fc=function(c){var qi=[[13,'<RETURN>'],[9,'<TAB>'],[8,'<BACKSPACE>'],[127,'<DELETE>'],[27,'<ESCAPE>'],[33,'<PAGE UP>'],[34,'<PAGE DOWN>'],[116,'<F5>']];for(var i=0;i<qi.length;i++){if(qi[i][0]==c){return qi[i][1];}}
var r=String.fromCharCode(c);if(r>='a'&&r<='z'||r>='A'&&r<='Z'||r>='0'&&r<='9'){return r;}
return c;};a._Gc=function(e){var ev=e||window.event;var t='keypress '+a._Fc(ev.keyCode?ev.keyCode:ev.charCode);a._Ec(t,ev);};a._Ec=function(ri,e){var si=null;if(e.target){si=e.target;}
else if(e.srcElement){si=e.srcElement;}
var vi=a._Qb(si,ri,'detection');setTimeout(function(){a._Cc(vi);},30);};a._Hc=[];a._Ic=function(o){if(a._Jc){if(!o._Kc&&o.mouseup){if(typeof o.onmouseup=='function'){o._Kc=o.onmouseup;}
o.onmouseup=function(){var ui=a._Qb(this,'click','mouseup wrapper');var wi=null;if(this._Kc){wi=this._Kc.apply(this,arguments);}
setTimeout(function(){a._Rb(ui);},30);return wi;};if(a._Lc){o.onmouseup.toString=function(){if(o._Kc){return o._Kc.toString();}};}}}
if(a._Mc){if(o.onclick&&!o._Nc){o._Nc=o.onclick;o.onclick=function(){var ui=a._Qb(this,'click','click wrapper');var xi=null;if(this._Nc){xi=this._Nc.apply(this,arguments);}
setTimeout(function(){a._Rb(ui);},0);return xi;};if(a._Lc){o.onclick.toString=function(){if(o._Nc){return o._Nc.toString();}};}}}};a._Oc=function(o){if(a._Pc){if(o.onblur&&!o._Qc){o._Qc=o.onblur;o.onblur=function(){var ui=a._Qb(this,'blur','blur wrapper');var yi=null;if(this._Qc){yi=this._Qc.apply(this,arguments);}
setTimeout(function(){a._Rb(ui);},30);return yi;};}}};a._Rc=function(o){if(a._Sc){if(o.onchange&&!o._Tc){o._Tc=o.onchange;o.onchange=function(){var ui=a._Qb(this,'change','change wrapper');var zi=null;if(this._Tc){zi=this._Tc.apply(this,arguments);}
setTimeout(function(){a._Rb(ui);},30);return zi;};}}};a._Uc=function(o){var h=false;if(o.onclick){h=true;a._Ic(o);}
if(o.onblur){h=true;a._Oc(o);}
if(o.onchange){h=true;a._Rc(o);}
if(h){a._Hc.push(o);}};a._Eb=function(){if(a._Mc||a._Jc||a._Pc||a._Sc){if(typeof document.createTreeWalker=='function'){var Ai=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,false);while(Ai.nextNode()){a._Uc(Ai.currentNode);}}
else{var Bi=document.getElementsByTagName('*');var Ci=Bi.length;if(!a._qa._kb||a._Vc>=9||Ci<5000){for(var i=0;i<Ci;i++){a._Uc(Bi[i]);}}else{if(!a._Wc){a._Wc=true;dT_.pw("Document has "+Ci+" dom nodes. Disabling instrumentation!");}}}}
else{}};a._Xc=function(s){if(s){var r=[];for(var i=0;i<s.length;i++){if(s.charAt(i)!='\n'&&s.charAt(i)!='\r'&&s.charAt(i)!='\t'){r.push(s.charAt(i));}}
s=r.join('');}
return s;};a._Ha=function(){if(a._Yc){var ui=a._Yc;var ua={};var an=a._Xc(a._Ac(ui._Zc));if(an.length>100){an=an.substring(0,97)+'...';}
ua.name=ui._$c+' on "'+an+'"';ua.time=ui._ad;ua.type=ui._$c;return ua;}
else{return null;}};a._Sb=function(Di){a._uc=Di;if(!Di){a._Yc=null;}};a._Qb=function(Ei,Fi,Gi){var ui={};ui._Zc=Ei;ui._$c=Fi;ui._ad=new Date().getTime();ui._bd=Gi;if(a._uc){if(!a._Yc){a._Yc=ui;}
else{var Hi=a._Yc;while(Hi._cd){Hi=Hi._cd;}
Hi._cd=ui;ui._dd=Hi;}}
else{}
return ui;};a._Rb=function(Ii){if(a._Yc){var Ji=a._Yc;while(Ji._cd&&(Ji!==Ii)){Ji=Ji._cd;}
if(Ji===Ii){Ji.htmlObj=null;if(Ji._dd){Ji._dd._cd=Ji._cd;}
else{a._Yc=Ji._cd;}
if(Ji._cd){Ji._cd._dd=Ji._dd;}}}};a._ed=function(Ki,Li,Mi){var c=false;if(Mi&&a._wa._fd){for(var i=0;i<a._wa._fd.length;i++){if(a._wa._fd[i]==Mi){c=true;}}}
if(!c){a._qa._jb(document,Ki,Li);}
else{}};a.init=function(Ni){a._wa=Ni;var ua=navigator.userAgent;var Oi=ua.indexOf("MSIE ");if(Oi>=0){a._Vc=parseFloat(ua.substring(Oi+5,ua.indexOf(";",Oi)));}
a._Mc=true;a._Jc=true;a._Lc=true;a._Pc=true;a._Sc=true;var i=0;if(a._wa._gd){for(i=0;i<a._wa._gd.length;i++){var f=a._wa._gd[i];if(f=='clk'){a._Mc=false;}
else if(f=='mup'){a._Jc=false;}
else if(f=='tos'){a._Lc=false;}
else if(f=='blr'){a._Pc=false;}
else if(f=='chg'){a._Sc=false;}
else{a._qa._Kb('Invalid config flag for doNotInstrument parameter: '+f);}}}
a._ed('click',a._Dc('click'),'clk');a._ed('mousedown',a._Dc('click'),'mdw');a._ed('mouseup',a._Dc('click'),'mup');a._ed('dblclick',a._Dc('dblclick'),'dcl');a._ed('keydown',a._Gc,'kyd');a._ed('keyup',a._Gc,'kyu');a._ed('scroll',a._Dc('scroll'),'scr');if(a._wa.ade){var Pi=a._wa.ade.split(',');if(Pi&&Pi.length>0){i=0;for(i=0;i<Pi.length;i++){a._ed(Pi[i],a._Dc(Pi[i]),null);}}}};a._na=function(){for(var i=0;i<a._Hc.length;i++){var o=a._Hc[i];if(o.onclick){o.onclick.toString=null;}
o.onclick=null;o._Nc=null;if(o.mouseup){o.mouseup.toString=null;}
o.mouseup=null;o._hd=null;o.onchange=null;o._Tc=null;o.onblur=null;o._Qc=null;}
a._Hc=null;};if(!dT_._pa){dT_._pa=a;}})();(function(){var m={};m._id=[];m._jd=[];m._kd=[];m._ld=[];m._md=function(){return new Date().getTime();};m._nd=function(Qi,Ri,Si,Ti,Ui){var Vi={_od:Si,_pd:Ti,_$c:Qi,_Jb:Ri,_qd:Ui,next:[],_rd:null,_sd:null,_td:null,_ud:null,_vd:null,_wd:null,add:function(Wi){if(Wi&&Wi._Jb){Vi.next.push(Wi);}
else{}},toString:function(){var s=[];s.push('Action (type: ');s.push(Vi._$c);s.push(', name:');s.push(Vi._Jb);s.push(', start:');s.push(Vi._od);s.push(', stop:');s.push(Vi._pd);s.push(', domNodes: ');s.push(Vi._qd);s.push(', sendNextPreview: ');s.push(Vi._rd);s.push(', previewCountMax: ');s.push(Vi._sd);s.push((Vi.next?(', subactions: '+Vi.next.length):''));s.push(')');return s.join('');}};if(!m._ld[Vi._Jb]){m._ld[Vi._Jb]=1;}
else{m._ld[Vi._Jb]++;Vi._vd=Vi._Jb;Vi._wd=m._ld[Vi._Jb];Vi._Jb+='#'+Vi._wd;}
return Vi;};m._xd=function(Xi,Yi){if(Xi._ud){var Zi=[];var $i=[];$i[0]='0';$i[1]=Xi._ud;$i[2]=Xi._td;Zi[0]=$i.join('|');Zi[1]=m._yd(Xi,1,Yi);return Zi.join(',');}
else{return m._yd(Xi,1,Yi);}};m._yd=function(aj,bj,cj){if(!aj._qd){aj._qd=document.getElementsByTagName('*').length;}
var dj=[];if(aj.next&&(aj.next.length>0)){for(var i=0;i<aj.next.length;i++){dj[i+1]=m._yd(aj.next[i],bj+1,cj);}
if(cj){var ej=aj.next[aj.next.length-1];if(!ej._pd){aj._pd=undefined;}
else if(aj._pd&&ej._pd>aj._pd){aj._pd=ej._pd;}}}
var fj=[];fj[0]=bj.toString();fj[1]=m._qa._xa(aj._vd?aj._vd:aj._Jb);fj[2]=aj._wd?aj._wd:'-';fj[3]=m._qa._xa(aj._$c);fj[4]=aj._od;fj[5]=aj._pd?aj._pd:0;fj[6]=aj._qd;if((bj==1)&&aj._zd){fj[7]=aj._zd;}
dj[0]=fj.join('|');if(dj.length>1){return dj.join(',');}
return dj[0];};m._Ad=function(gj){m._Bd=null;if(m._Cd){m._Bd=m._Cd._Dd;if(m._Bd){gj._ud=m._Bd._Jb;if(m._Bd._zd){m._Bd._zd++;}
else{m._Bd._zd=1;}}}};m._ua=function(){return m._xd(m._Dd,false);};m._ta=function(hj){var ij='';if(m._Ed){if(m._Ed._Fd){ij='d|'+m._Ed._Jb+'|'+m._Ed._$c+'|'+m._Ed._za+'|'+m._Ed._od+'|'+m._Ed._Gd+'|'+m._Ed._Hd;}else{ij='s|'+m._Ed._Jb+'|'+m._Ed._$c+'|'+m._Ed._za+'|'+m._Ed._od;}
m._Ed=null;}
var jj=0;if(hj){jj=m._id.length;m._Dd=null;}
else{if(m._Dd){jj=m._id.length-1;}
else{jj=m._id.length;}}
if(jj>0){for(var i=0;i<jj;i++){var kj=m._xd(m._id[i],true);if(kj.length>0){if(ij.length>0){ij+=',';}
ij+=kj;}
else{break;}}
m._id=[];if(m._Dd){m._id.push(m._Dd);}}
return ij;};m._Ra=function(lj,mj,nj,oj,pj,qj){var sj=m._nd(lj,mj,nj,oj,pj);var pa;if(!qj){pa=m._Id;}else{pa=m._Jd(qj);}
if(pa){pa.add(sj);return true;}
else{m._Ad(sj);m._id.push(sj);return false;}};m._Kd=function(){var tj=m._qa._ub('dtSa');m._qa._Kb('Resetting source action: '+tj);m._qa._Vb('dtSa','-');if(tj&&tj!='-'){var uj=tj.split('|');if(uj.length==7){var a={_Fd:uj[0]=='true',_$c:uj[1],_Jb:uj[2],_od:uj[3],_za:uj[4],_Gd:uj[5],_Hd:uj[6]};if(!document.referrer||(a._Gd==m._qa._xa(document.referrer))||(a._Gd==m._qa._xa(document.location))){m._Ed=a;m._Ld=a;}
else{}}}};m._Za=function(){return m._Id;};m._Gb=function(vj,wj,xj){return m._Md(vj,wj,xj,null);};m._Md=function(yj,zj,Aj,Bj){var a=m._Oa(yj,zj,Aj,Bj);m._jd[a._Jb]=a;a._Nd=1;return a._Jb;};m._Fb=function(Cj,Dj,Ej,Fj){var Gj=m._jd[Cj];var Hj;if(Gj){Gj._Nd++;Hj=Gj._Jb;}
else if(m._Id){Hj=m._Md(Dj,Ej,Fj,m._Id._Jb);}
return Hj;};m._Mb=function(Ij){var Jj=0;var a=m._jd[Ij];if(a){a._Nd--;Jj=a._Nd;if(Jj<=0){m._Ub(Ij);m._jd[Ij]=null;m._pb();}}
return Jj;};m._Lb=function(){var Kj=0;for(var a in m._jd){if(a&&m._jd.hasOwnProperty(a)){Kj+=a._Nd;}}
return Kj;};m._Jd=function(Lj){if(m._id){for(var i=0;i<m._id.length;i++){var a=m._id[i];if(a._Jb==Lj||a._vd&&a._vd==Lj){return a;}
for(var j=0;j<a.next.length;j++){if(a.next[j]._Jb==Lj||a.next[j]._vd&&a.next[j]._vd==Lj){return a.next[j];}}}}
return null;};m._Oa=function(Mj,Nj,Oj,Pj){m._ab._bb();if(!Oj){Oj=m._md();}
var Qj=m._nd(Nj,Mj,Oj,null,null);if(typeof Pj=='boolean'&&Pj){Pj=m._Id;}
if(!Pj){m._Od(Qj);m._Pd(Qj);}else{var pa=null;if(typeof Pj=='string'){pa=m._Jd(Pj);}else if(typeof Pj=='object'){pa=Pj;}
else{pa=m._Id;}
if(pa){pa.add(Qj);m._Od(Qj);if(m._Dd&&m._Dd._rd>Qj._od+10000){m._Dd._rd=Qj._od+10000;}}else{}}
return Qj;};m._Ub=function(Rj,Sj,Tj){if(!Sj){Sj=m._md();}
var Uj;var Vj=null;if(m._id){for(var i=0;i<m._id.length;i++){Vj=m._id[i];while(Vj){if((Vj._vd&&(Vj._vd==Rj))||(Vj._Jb==Rj)){Vj._pd=Sj;if(Tj){Vj._od=Tj;}
Vj._qd=document.getElementsByTagName('*').length;}
else if(!Vj._pd){Uj=Vj;}
if(Vj.next&&(Vj.next.length>0)){Vj=Vj.next[Vj.next.length-1];}
else{Vj=null;}}}}
if(!Uj){m._Ld=null;if(m._Bd){if(parent&&(m._Cd._Dd==m._Bd)){m._Dd._td='S';}
else{m._Dd._td='A';}
m._Bd=null;}
m._Dd=null;m._pb();}
m._Od(Uj);};m._Od=function(Wj){if(m._Id!=Wj){m._Id=Wj;if(Wj){m._Ma.change(m._za,Wj._Jb);}
else{}}};m._Pd=function(Xj){m._Ad(Xj);m._Dd=Xj;m._Id=Xj;m._id.push(Xj);Xj._rd=Xj._od+10000;Xj._sd=100;setTimeout(m._Qd,5000);};m._Qd=function(){if(m._Dd){if(m._Dd._sd>0){if(m._md()>m._Dd._rd){m._Dd._rd+=60000;m._ob(true,true,true,false);m._Dd._sd--;}
setTimeout(m._Qd,1000);}}};m._Rd=function(){var s=document.location.href;var p=s.indexOf('#');if(p>=0){s=s.substr(0,p);}
return s;};m._Ia=function(Yj,Zj,$j){var ak=m._Aa();if(!ak&&Yj&&Zj&&$j){m._qa._Vb('dtSa','true|'+m._qa._xa(Zj)+'|'+m._qa._xa(Yj)+'|'+$j+'|'+m._za+'|'+m._qa._xa(m._Rd())+'|'+m._qa._xa(document.title));}
else{var bk=m._Ld;dT_._Kb('Original source action: '+bk+' in xhr: '+ak+' current action: '+m._Id);if(ak&&bk){m._qa._Vb('dtSa','false|'+bk._$c+'|'+bk._Jb+'|'+m._md()+'|'+bk._za+'|'+m._qa._xa(m._Rd())+'|'+m._qa._xa(document.title));m._Ld=null;}else if(m._Id&&m._Id._Jb!='_load_'){m._qa._Vb('dtSa','false|'+m._qa._xa(m._Id._$c)+'|'+m._qa._xa(m._Id._Jb)+'|'+m._md()+'|'+m._za+'|'+m._qa._xa(m._Rd())+'|'+m._qa._xa(document.title));}}};m._Ob=function(ck){m._kd.push(ck);};m._Pb=function(dk){setTimeout(function(){var l=m._kd.length;if(l>0){if(m._kd[l-1]==dk){m._kd.pop();}}},0);};m._Aa=function(){var l=m._kd.length;if(l>0){return m._kd[l-1];}
return null;};m._bb=function(ek,fk,gk,hk,ik,jk,kk){m._qa=ek;m._Cd=fk;m._za=gk;m._ab=hk;m._pb=ik;m._ob=jk;m._Ma=kk;m._Kd();};if(!dT_._sa){dT_._sa=m;}})();(function(){var c={};c.requestId=null;c.responseId="0";c.checkScriptsTimeout=false;c.checkImagesEnabled=false;c.nottfb=false;c.ridPath=null;c.reportUrl='dynaTraceMonitor';c._qa=dT_._qa;c._Sd=function(lk,mk){if(lk=='rid'){c.requestId=mk;}
else if(lk=='domain'){c._qa._jc=mk;}
else if(lk=='reportUrl'){c.reportUrl=decodeURIComponent(mk);}else if(lk=='doNotDetect'){var nk=mk.split(',');c._fd=nk;}else if(lk=='doNotInstrument'){var ok=mk.split(',');c._gd=ok;}
else{c[lk]=mk;}};c._Td=function(pk){if(pk){var qk=pk.split('|');for(var i=0;i<qk.length;i++){var p=qk[i].indexOf('=');if(p==-1){c._Sd(qk[i],true);}
else{var rk=qk[i].substring(0,p);var sk=qk[i].substring(p+1,qk[i].length);c._Sd(rk,sk);}}}};c._bb=function(){var tk='';var uk=document.getElementsByTagName('script');if(uk.length>0){var vk;for(var j=uk.length-1;j>=0;j--){vk=uk[j];if((vk.src.search('dtagent')>=0)&&vk.attributes){var wk=vk.attributes.getNamedItem('data-dtconfig');if(wk&&wk.nodeValue){tk=wk.nodeValue;}
break;}}}
c._Td(tk);};if(!dT_._wa){dT_._wa=c;}})();(function(){dT_._va=function(){var m=this;m.monitorUrl=null;m._Ud=[];m.a=function(k,v){m._Ud.push(k);m._Ud.push('=');m._Ud.push(v);m._Ud.push('$');};m.l=function(){var xk=0;for(var i=0;i<m._Ud.length;i++){for(var j=0;j<m._Ud[i].length;j++){xk++;}}
return xk;};m.getSignals=function(){var yk=m.monitorUrl?m.monitorUrl:'dynaTraceMonitor';var l=dT_._qa._kb?1500:7000;if(dT_._wa.msl){l=Math.min(l,parseInt(dT_._wa.msl,10));}
var zk=[];var s=m._Ud.join('');var Ak=((s.length%l)===0)?Math.floor(s.length/l):Math.floor(s.length/l)+1;var Bk;var Ck=new Date().getTime();var j=0;if(Ak>1){if(Ak<100){for(var i=0;i<Ak;i++){var id='sid='+Ck+'&p'+(i+1)+'_'+Ak+'=';if(j+l<=s.length){Bk=s.slice(j,j+l);if(Bk.charAt(Bk.length-1)=='%'&&s.length>=(j+l+1)){Bk+=s.charAt(j+l);Bk+=s.charAt(j+l+1);j+=2;}
if(Bk.charAt(Bk.length-2)=='%'&&s.length>=(j+l+2)){Bk+=s.charAt(j+l);j+=1;}}
else{Bk=s.slice(j);}
zk.push(yk+'?'+id+Bk);j+=l;}}
else{return null;}}
else{zk.push(yk+'?'+s);}
return zk;};};})();(function(){var m={};m._qa=null;m._Da=function(Dk,Ek,Fk){var Gk=new Date().getTime();Dk.a('time',Gk);var r=Dk.getSignals();var Hk=!(Fk&&(m._qa._ac||m._qa._bc))&&!((r.length>1)&&m._qa._dc);var u=m._qa;stateChange=function(Ik){Ik.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var Jk=new Date().getTime()-Gk;if(Ek){Ek(Jk);}}
else{try{}
catch(err){}}}};};if(r!==null){for(var i=0;i<r.length;i++){var Kk=m._qa.getXHR();Gk=new Date().getTime();stateChange(Kk);Kk.open('POST',r[i],Hk);Kk.send(null);}}
else{}};m.init=function(Lk){m._qa=Lk;};if(!dT_._Ca){dT_._Ca=m;}})();(function(){var t={};t._Vd=new Date().getTime();t._Wd=new Date().getTime();t._Xd=escape(document.URL.split('#')[0]);t._Yd=escape(document.referrer);t._fb=function(){return t._Zd?t._Zd.loadEventEnd:0;};t._gb=function(){return t._Zd?t._Zd.loadEventStart:0;};t._Sa=function(){return t._Wd;};t._Pa=function(){return t._Vd;};t._Ba=function(){var Mk;if(t._bd){if(t._Zd){Mk=t._bd+" DNS:"+(t._Zd.domainLookupEnd-t._Zd.domainLookupStart);}
else{Mk=t._bd;}
return t._qa._xa(Mk);}else{return null;}};t._$d=function(){t._Vd=t._Wd;var Nk=t._qa.getPerformance();if(Nk&&Nk.timing){t._Zd=Nk.timing;t._Qa='webtiming';var Ok=t._Zd.navigationStart||t._Zd.fetchStart||t._Zd.requestStart||undefined;if(Ok!==undefined){t._Vd=Ok;if(Nk.navigation){t._bd='webtiming '+Nk.navigation.type;}
else{t._bd='webtiming';}}}
else if((typeof chrome!='undefined')&&chrome.loadTimes&&chrome.loadTimes()){t._Qa='chrome';if(chrome.loadTimes().requestTime>0){t._Vd=parseInt(chrome.loadTimes().requestTime*1000,10);t._bd='chrome '+chrome.loadTimes().navigationType+' rT';}
else if(chrome.loadTimes().startLoadTime>0){t._Vd=parseInt(chrome.loadTimes().startLoadTime*1000,10);t._bd='chrome '+chrome.loadTimes().navigationType+' sLT';}}};t._bb=function(Pk,Qk){t._qa=Pk;t._ae=Qk;if(!Qk&&!t._qa._dc){t._$d();}};if(!dT_._la){dT_._la=t;}})();(function(){var h={};h._be=function(Rk,Sk,Tk){if(!h._ce){h._ce=true;var Uk=null;try{if(typeof(Rk)=='object'){if(Rk.srcElement){if(Rk.srcElement.outerHTML&&(Rk.srcElement.outerHTML.length<200)){Uk=document.URL.split('#')[0]+"[-]: Error at '"+Rk.srcElement.outerHTML+"'";}
else{Uk=document.URL.split('#')[0]+"[-]: Error at tag: '"+Rk.srcElement.tagName+"'";}}
else{Uk='unknown error';}}
else{Uk=Sk+'['+Tk+']: '+Rk;}
if(Uk){var ua=h._pa._Ha();if(ua){Uk+=', user action: '+ua.name;}
h._de(Uk,'_error_');}}
catch(e){}
if(h._ee&&h._ee!=h._be){h._ee(Rk,Sk,Tk);}
h._ce=false;}
else{}
return false;};h._fe=function(){if(h._qa._kb){h._de(event.type+':'+event.errorUrl+'['+event.errorLine+'] Code: '+event.errorCode+': '+event.errorMessage,'_error_');}
else{if(window.onerror!=h._be){h._de('window.onerror is overwritten - JavaScript error probably lost!','_warning_');h._bb();}}};h._bb=function(Vk,Wk,Xk){if(Vk){h._qa=Vk;}
if(Wk){h._pa=Wk;}
if(Xk){h._de=Xk;}
if(!h._ge){h._qa._jb(window,'error',h._fe);h._ge=true;}
if(!h._qa._kb&&(window.onerror!=h._be)){if(window.onerror){h._ee=window.onerror;}
window.onerror=h._be;}
h._qa._jb(window,'unload',function(){window.onerror=null;});};if(!dT_._ab){dT_._ab=h;}})();(function(){var p={};p._he='dtPC';p._qa=dT_._qa;p._ie=function(Yk){var f=Yk.split('_');var t=parseInt(f[1],10);var Zk=new Date().getTime();return(t+1000*60*15>Zk);};p._ub=function(){var $k=[];var al=p._qa._ub(p._he);if(al&&al!=''){var bl=al.split('|');for(var i=0;i<bl.length;i++){var cl=bl[i].split('#');if(cl.length==2&&cl[0]&&cl[1]){var dl=cl[0];if(p._ie(dl)){$k.push({_za:dl,_je:cl[1]});}}}}
return $k;};p._Vb=function(el){var c;if(el){var fl=[];for(var i=0;i<el.length;i++){if(i>0){fl.push('|');}
fl.push(el[i]._za);fl.push('#');fl.push(el[i]._je);}
c=fl.join('');}
else{c='';}
p._qa._Vb(p._he,c);};p.add=function(gl,hl){var il=p._ub();if(!hl){hl='_load_';}
var jl={_za:gl,_je:p._qa._xa(hl)};il.push(jl);p._Vb(il);};p.replace=function(kl,ll){var ml=[{_za:kl,_je:p._qa._xa(ll)}];p._Vb(ml);};p.change=function(nl,ol){var ql=p._ub();var rl=false;for(var i=0;i<ql.length;i++){if(ql[i]._za==nl){ql[i]._je=p._qa._xa(ol);rl=true;}}
if(rl){p._Vb(ql);}
else{p.add(nl,ol);}};p.remove=function(sl){var tl=p._ub();if(tl.length>0){var ul=[];for(var i=0;i<tl.length;i++){if(tl[i]._za!=sl){ul.push(tl[i]);}}
p._Vb(ul);}};if(!dT_._Ma){dT_._Ma=p;}})();if(dT_._Kb){}
dT_._bb();(function(){var x={};dT_._qa._fc(x,{_ke:0,_le:0,_me:function(vl){var wl=0;var xl=dT_._ia("img");for(var i=0;i<xl.length;i++){if(xl[i].src!=""){wl+=vl(xl[i]);}}
var yl=dT_._ia("input");for(i=0;i<yl.length;i++){if((yl[i].type=='image')&&(yl[i].src!="")){wl+=vl(yl[i]);}}
return wl;},_Ib:function(){x._me(function(zl){zl._ne=true;});},_oe:function(){if(x._pe){for(var i=0;i<x._pe.length;i++){x._pe[i]();}
x._pe=null;}},_qe:function(){x._le++;if(x._le===x._ke){x._oe();}},_re:function(Al){if(!Al._ne){Al._ne=true;if(x._qa._gc(Al)){return;}
x._qa._jb(Al,'load',x._qe);x._qa._jb(Al,'error',x._qe);if(!x._qa._kb){var Bl=Al.src;Al.src="";Al.src=Bl;}
else{Al.src=Al.src;}
x._ke++;}},_Nb:function(Cl){x._me(x._re);if(!x._pe){x._pe=[];}
x._pe.push(Cl);if(x._le===x._ke){x._oe();}}});var Dl=dT_.cfg('wi');if(Dl){x._qa=dT_._qa;x._Tb=(Dl=='all');dT_._Hb=x;}})();(function(){var d={};d._se=false;d._te=false;d._ue=0;d._ve=null;d._we=function(El,Fl,Gl){var Hl=null;if(d._ue===0||!d._ve){Hl=dT_.ex('dojo xhr'+Gl,3);if(!d._ve){d._ve=Hl;}}
var Il;if((El.sync===undefined)||!El.sync){Il=Fl.call(this,El);var Jl=Il.callback;var Kl=El.url;Il.callback=function(Ll){if(Hl){dT_.ec(Hl);}
var Ml=Jl.apply(this,arguments);if(Hl){dT_.lc(Hl);dT_.lx(Hl);}
return Ml;};var Nl=Il.errback;Il.errback=function(Ol){try{if(Hl){dT_.ec(Hl);}
var Pl=Nl.apply(this,arguments);return Pl;}finally{if(Hl){dT_.lc(Hl);dT_.lx(Hl);}}};var Ql=Il.cancel;Il.cancel=function(){if(Hl){dT_.ec(Hl);}
var Rl=Ql.apply(this,arguments);if(Hl){dT_.lc(Hl);dT_.lx(Hl);}
return Rl;};return Il;}
else{if(Hl){dT_.ec(Hl);}
Il=Fl.apply(this,arguments);if(Hl){dT_.lc(Hl);dT_.lx(Hl);}
return Il;}};d.init=function(){if(!d._te&&(typeof dojo!='undefined')&&dojo){var Sl=['click','onclick','mousedown','onmousedown','mouseup','onmouseup'];var Tl=dojo.connect;dojo.connect=function(Ul,Vl,Wl,Xl,Yl){var ev=Vl?Vl.toLowerCase():'';var Zl=false;var i=0;while(!Zl&&i<Sl.length){Zl=(Sl[i]==ev);i++;}
if(Zl){if(Wl&&!Xl){Xl=Wl;Wl=null;}
var $l=function(){var am=dT_.bi(Ul,'click','dojo');var bm;if(typeof Xl=='string'){if(Wl){bm=Wl[Xl].apply(Wl,arguments);}
else{bm=Wl[Xl].apply(dojo.global,arguments);}}
else{if(Wl){bm=Xl.apply(Wl,arguments);}
else{bm=Xl.apply(this,arguments);}}
dT_.ei(am);return bm;};return Tl.call(this,Ul,Vl,Wl,$l,Yl);}else{return Tl.apply(this,arguments);}};var cm=dojo.xhrGet;dojo.xhrGet=function(em){return d._we.call(this,em,cm,'Get');};var fm=dojo.rawXhrPost;dojo.rawXhrPost=function(gm){return d._we.call(this,gm,fm,'RawPost');};var hm=dojo.xhrPost;dojo.xhrPost=function(im){return d._we.call(this,im,hm,'Post');};var jm=dojo.rawXhrPut;dojo.rawXhrPut=function(km){return d._we.call(this,km,jm,'RawPut');};var lm=dojo.xhrPut;dojo.xhrPut=function(mm){return d._we.call(this,mm,lm,'xhrPut');};var nm=dojo.xhrDelete;dojo.xhrDelete=function(om){return d._we.call(this,om,nm,'Delete');};var pm=dojo.addOnLoad;dojo.ready=dojo.addOnLoad=function(){d._ue++;dT_.iolm();var qm=-1;var rm=[];for(var i=0;i<arguments.length;i++){var f=arguments[i];if(qm==-1&&(typeof f=='function')){qm=i;}
rm.push(f);}
if(qm!=-1){var sm=rm[qm];rm[qm]=function(){dT_.solb();sm.apply(this,arguments);dT_.sole();d._ue--;};}
var tm=pm.apply(this,rm);return tm;};d._te=true;dT_._Ta();}};d._Ke=function(){if(dT_._Le){dT_._Le.init();}};var um=dT_.cfg('dojo.xhr');if(um){dT_._Le=d;dT_.initDojo=d._Ke;dT_._Bb(function(){dT_.initDojo();});}else{dT_.initDojo=function(){dT_._Kb('Dojo is disabled!');};}})();(function(){var f={};f._Me=false;f._Ne=null;f._Oe=function(vm,wm,xm){f._Ne=dT_.ex('ice.jsfXhr',3);f._Pe(vm,wm,xm);};f._Qe=function(){dT_.ec(f._Ne);var ym=f._Re.apply(this,arguments);dT_.lc(f._Ne);dT_.lx(f._Ne);return ym;};f._Se=function(){if(f._Te()){if(jsf.ajax.request!=f._Oe){f._Pe=jsf.ajax.request;jsf.ajax.request=f._Oe;}
if(jsf.ajax.response!=f._Qe){f._Re=jsf.ajax.response;jsf.ajax.response=f._Qe;}}else if(f._Ue()){if(!f._Ve){f._Ve=Ice.Ajax.RequestProxy;Ice.Ajax.RequestProxy=function(zm,b){var Am=dT_.ex('ice.1.8.ajax',3);var Bm=new f._Ve(zm,b);var Cm=Bm.responseCallback;Bm.responseCallback=function(){dT_.ec();var Dm=Cm.apply(this,arguments);dT_.lc();if(zm.readyState==4){dT_.lx(Am);}
return Dm;};return Bm;};}}};f._Te=function(){return!!((typeof jsf!='undefined')&&(typeof jsf.ajax!='undefined'));};f._Ue=function(){return!!(typeof container!='undefined'&&typeof container.bridge!='undefined');};f.init=function(){if(!f._Me){if(f._Te()||f._Ue()){dT_._Db(f._Se);f._Me=true;dT_._Ta();}else{}}else{}};var Em=dT_.cfg('icefaces.ajax');if(Em){dT_._Kb('DynaTraceIceFacesHook.Initializing');dT_._Bb(function(){f.init();});}})();(function(){var j={};j._We=function(Fm){var Gm=dT_.ex('jQuery.ajax',3);if((Fm.async===undefined)||Fm.async){var Hm=Fm.complete;Fm.complete=function(Im,Jm){if(Jm!="success"){dT_.pw('jQuery reported "'+Jm+'"');}
dT_.ec(Gm);var Km=undefined;if(Hm){if(typeof Hm=='function'){Km=Hm.apply(this,arguments);}else if(Hm.length){for(var i=0;i<Hm.length;i++){Hm[i].apply(this,arguments);}}}
dT_.lc(Gm);dT_.lx(Gm);return Km;};var Lm=Fm.success;if(Lm){Fm.success=function(Mm,Nm,Om){dT_.ec(Gm);var Pm=undefined;if(typeof Lm=='function'){Pm=Lm.apply(this,arguments);}else if(Lm.length){for(var i=0;i<Lm.length;i++){Lm[i].apply(this,arguments);}}
dT_.lc(Gm);return Pm;};}
var Qm=Fm.error;if(Qm){Fm.error=function(Rm,Sm,Tm){dT_.ec(Gm);var Um=Qm.apply(this,arguments);dT_.lc(Gm);return Um;};}
j._$e(Fm);}
else{dT_.ec(Gm);j._$e(Fm);dT_.lc(Gm);dT_.lx(Gm);}};j._af=function(Vm,Wm){if(Vm){var Xm=function(e){var Ym=null;if(e.currentTarget){Ym=dT_.bi(e.currentTarget,Wm,'jquery');}
else if(e.srcElement){Ym=dT_.bi(e.srcElement,Wm,'jquery');}
var Xm=Vm.apply(this,arguments);if(Ym){setTimeout(function(){dT_.ei(Ym);},10);}
return Xm;};Xm._bf=true;return Xm;}else{return Vm;}};j._cf=function(Zm,$m){var bn=Zm[$m];if(bn){for(var i=0;i<bn.length;i++){if(bn[i].handler&&!bn[i].handler._bf){bn[i].handler=j._af(bn[i].handler,$m);}}}};j._df=function(cn,dn,en){var fn=j._ef.apply(this,arguments);if(typeof fn!='undefined'&&fn){if(dn=='events'){j._cf(fn,'click');j._cf(fn,'mousedown');j._cf(fn,'keydown');j._cf(fn,'autocomplete');}}
return fn;};j.init=function(){if(!j._ff&&(typeof(jQuery)!='undefined')&&jQuery){j._ff=true;dT_._Ta();j._$e=jQuery.ajax;jQuery.ajax=j._We;j._ef=jQuery.data;jQuery.data=j._df;}};var gn=dT_.cfg('jquery.ajax');if(gn){dT_._Kb('Initializing jquery');dT_._Bb(function(){j.init();});}})();(function(){var b={};b._gf=-1;b._hf=0;b._if=-1;b._jf='';b._kf=false;var hn=dT_._qa._ub(dT_._mb);b._kf=(hn&&hn.substr(hn.length-2)=="_m");b._lf='dtLatCT';b.getInfo=function(){if(b._hf>0&&b._if>0){return b._hf+'_'+b._if;}
else{return null;}};b._$d=function(){var jn=dT_._qa._tc();var kn=dT_._qa.getXHR();var ln=b._jf+'dtbwimg_';ln+=b._hf;ln+='.jpg';if(kn){kn.onreadystatechange=function(){if(kn.readyState==4){var mn=new Date().getTime();b._if=mn-b._mf-jn;if(b._hf>0){if(b._hf>=6||b._if>100){dT_._qa._Vb(b._lf,mn+'|'+b._hf+'|'+b._if);}
else{window.setTimeout(b._$d,100);}}
else{dT_._qa.setLatencyCookie(b._if);window.setTimeout(b._$d,100);}
b._hf++;}};}
b._mf=new Date().getTime();kn.open('GET',ln,true);kn.send(null);};b._nf=function(){var nn=dT_._qa._ub(b._lf);if(nn){var ps=nn.split('|');var pn=ps[0];if((new Date().getTime()-pn)<b._gf){if(ps.length>1){b._hf=ps[1];b._if=ps[2];}
return;}}
window.setTimeout(b._$d,100);};var bw=dT_.cfg('bandwidth');if((bw&&dT_.tp())){if(b._kf){if(bw.substr(bw.length-2)!='_m'){return;}
else{bw=bw.substr(0,bw.length-2);}}
b._gf=parseInt(bw,10)*1000;var qn=dT_.cfg('reportUrl');if(qn){var p=qn.lastIndexOf("/");if(p>=0){b._jf=qn.substring(0,p+1);}}
dT_._Kb('Initializing bandwidth check: '+b._gf+', basurl: '+b._jf);dT_._Cb(function(rn){rn.a('bw',b.getInfo());});setTimeout(b._nf,2000);}})();(function(){var t={};var sn=function(){this._pf=null;this._qf=function(tn,un){if(tn>un){throw 'Error: Start('+tn+') must be before stop ('+un+')';}
var vn={_od:tn,_pd:un};var c=this._pf;var p=null;if(!c){this._pf=vn;vn._cd=null;}else{while(c&&tn>c._od){p=c;c=c._cd;}
if(p){vn._cd=p._cd;p._cd=vn;}else{vn._cd=this._pf;this._pf=vn;}}};this._rf=function(){var c=this._pf;while(c&&c._cd){while(c._cd&&c._pd>=c._cd._od){if(c._pd<=c._cd._pd){c._pd=c._cd._pd;}
c._cd=c._cd._cd;}
c=c._cd;}};this._sf=function(){this._rf();var wn=[];var c=this._pf;while(c){if(wn.length>0){wn.push('_');}
wn.push(c._od);wn.push('_');wn.push(c._pd);c=c._cd;}
var r=wn.join('');return r;};};dT_._qa._fc(t,{_tf:2000,_uf:30,_vf:500,_wf:3,_xf:'i',_yf:'s',_zf:'c',_md:function(){return new Date().getTime();},_Af:[],_Bf:function(xn,yn){var ca=dT_._sa._Za();var n=t._md();t._Af.push({_$c:xn,_od:n,_ze:yn,_Cf:ca?ca._Jb:'-',_pd:0});},_Df:function(zn,An,Bn,Cn){for(var i=0;i<t._Af.length;i++){if(t._Af[i]._ze==zn){if(arguments.length>2&&Bn>0){t._Af[i]._od=Bn;}
if(arguments.length>3&&Cn>0){t._Af[i]._pd=Cn;}else{t._Af[i]._pd=t._md();}
t._Af[i]._Ef=An;return;}}},_Ff:function(a,b){var Dn=(a._pd-a._od);var En=(b._pd-b._od);if(Dn<En){return 1;}
if(Dn==En){return 0;}
return -1;},_Gf:function(v1,v2){return v1<v2?v1:v2;},_Hf:function(v1,v2){return v1>v2?v1:v2;},_If:function(){if(t._Af.length>0){var ts=dT_._la._Sa();var Fn={};var i;for(i=0;i<t._Af.length;i++){var Gn=t._Af[i];if(Gn._pd===0){if(Gn._$c===t._xf){Gn._Jf=true;Gn._Ef=false;Gn._pd=t._md();}else{Gn._pd=Gn._od;Gn._Ef=true;}}
var dm=t._qa._hc(Gn._ze);if(!Fn[dm]){Fn[dm]=[];}
Fn[dm].push(Gn);}
var Hn={};var In=null;var Jn;for(In in Fn){if(Fn.hasOwnProperty(In)&&Fn[In].length){Jn=Fn[In];Jn.sort(t._Ff);var Kn=new sn();var Ln=new sn();var Mn=new sn();var Nn=0;var On=0;var Pn=0;var Qn=0;var Rn=0;var Sn=0;var Tn=ts+99999999;var Un=0;var Vn=0;var Wn=Tn;var Xn=0;var Yn=ts+99999999;var Zn=0;var $n=0;for(i=0;i<Jn.length;i++){var ao=Jn[i]._pd-Jn[i]._od;if(Jn[i]._$c==t._xf){Tn=t._Gf(Tn,ao);Un=t._Hf(Un,ao);var bo=Nn+On+Pn;Sn=parseInt((Sn*bo+ao)/(bo+1),10);Kn._qf(Jn[i]._od-ts,Jn[i]._pd-ts);if(Jn[i]._Ef){Nn++;}else{if(Jn[i]._Jf){Pn++;}else{On++;}}}else if(Jn[i]._$c==t._yf){Ln._qf(Jn[i]._od-ts,Jn[i]._pd-ts);Wn=t._Gf(Wn,ao);Xn=t._Hf(Xn,ao);Vn=parseInt((Vn*Qn+ao)/(Qn+1),10);Qn++;}else{Mn._qf(Jn[i]._od-ts,Jn[i]._pd-ts);Yn=t._Gf(Yn,ao);Zn=t._Hf(Zn,ao);$n=parseInt(($n*Rn+ao)/(Rn+1),10);Rn++;}}
Hn[In]={_Kf:Nn,_Lf:On,_Mf:Pn,_Nf:Qn,_Of:Kn._sf(),_Pf:Sn,_Qf:(Nn+On+Pn)>0?Tn:0,_Rf:Un,_Sf:Ln._sf(),_Tf:Vn,_Uf:Qn>0?Wn:0,_Vf:Xn,_Wf:Rn,_Xf:Mn._sf(),_Yf:$n,_Zf:Rn>0?Yn:0,_$f:Zn};}}
var co=[];for(In in Fn){if(Fn.hasOwnProperty(In)){Jn=Fn[In];var eo=Hn[In];if(co.length>0){co.push(';');}
co.push(t._qa._xa(In));co.push('|');co.push(eo._Kf);co.push('|');co.push(eo._Lf);co.push('|');co.push(eo._Mf);co.push('|');co.push(eo._Of);co.push('|');co.push(eo._Pf);co.push('|');co.push(eo._Qf);co.push('|');co.push(eo._Rf);co.push('|');co.push(eo._Nf);co.push('|');co.push(eo._Sf);co.push('|');co.push(eo._Tf);co.push('|');co.push(eo._Uf);co.push('|');co.push(eo._Vf);co.push('|');co.push(eo._Wf);co.push('|');co.push(eo._Xf);co.push('|');co.push(eo._Yf);co.push('|');co.push(eo._Zf);co.push('|');co.push(eo._$f);for(i=0;i<Jn.length&&i<t._wf&&Jn[i]._pd-Jn[i]._od>=t._vf;i++){co.push(',');co.push(Jn[i]._$c);if(!Jn[i]._Ef){if(Jn[i]._Jf){co.push('i');}else{co.push('f');}}
co.push('|');co.push(Jn[i]._od-ts);co.push('|');co.push(Jn[i]._pd-ts);co.push('|');co.push(t._qa._xa(Jn[i]._Cf));co.push('|');co.push(t._qa._xa(Jn[i]._ze));}}}
var rj=co.join('');return t._qa._xa(rj);}else{return null;}},_ag:function(fo,go){if(!go){var ho=t._If();if(ho){fo.a('3p',ho);}
t._Af=[];}},_bg:function(io){var d=t._qa._hc(io);return d&&d!=t._cg;},_dg:function(jo){return document.getElementsByTagName(jo);},_eg:function(ko){t._Df(ko.src,true);},_fg:function(e){t._eg(e.target);},_gg:function(){if(window.event.srcElement.readyState=='loaded'||window.event.srcElement.readyState=='complete'){t._eg(window.event.srcElement);}},_hg:function(sc){if(!sc._ig){sc._ig=t._md();if((sc.src!='')&&(sc.src!=dT_._jg)&&t._bg(sc.src)){if((sc.attributes&&sc.attributes['data-dtconfig'])){}else{t._Bf(t._yf,sc.src);if(t._qa._kb){t._qa._jb(sc,'readystatechange',t._gg);}else{t._qa._jb(sc,'load',t._fg);}}}}},_kg:function(){var lo=t._dg('script');for(var i=0;i<lo.length;i++){var sc=lo[i];t._hg(sc);}},_lg:function(mo){t._Df(mo.src,true);},_mg:function(no){var oo=null;if(no){if(no.target){oo=no.target;}
else if(no.srcElement){oo=no.srcElement;}}
else{oo=window.event.srcElement;}
if(oo){t._lg(oo);}else{}},_ng:function(e){var po=null;if(e){if(e.target){po=e.target;}
else if(e.srcElement){po=e.srcElement;}}
else{po=window.event.srcElement;}
if(po){if(po.src!=document.location.href){t._Df(po.src,false);}}},_og:function(qo){if(!qo._ig){qo._ig=t._md();if(qo.src!=''&&t._bg(qo.src)){t._Bf(t._xf,qo.src);if(dT_._qa._gc(qo)){t._lg(qo);return;}
dT_._qa._jb(qo,'load',t._mg);dT_._qa._jb(qo,'error',t._ng);if(!t._qa._kb){var ro=qo.src;qo.src="";qo.src=ro;}
else{qo.src=qo.src;}}}},_pg:function(){var so=t._dg('img');var i;var to;for(i=0;i<so.length;i++){to=so[i];t._og(to);}
so=t._dg('input');for(i=0;i<so.length;i++){to=so[i];if(to.type&&to.type.toUpperCase()=='SUBMIT'){t._og(to);}}},_qg:function(){t._pg();t._kg();},_rg:function(){if(t._md()-t._sg>t._tf){t._tg=false;return;}
t._qg();setTimeout(t._rg,t._uf);},_bb:function(){t._qg();if(dT_._sa._Za()){if(!t._tg){t._sg=t._md();t._tg=true;t._rg();}}else{}}});var uo=dT_.cfg('tp');if(uo){var vo=uo.split(',');if(vo.length!=3){dT_._Kb('Invalid number of arguments for parameter tp: '+uo);return;}
t._vf=parseInt(vo[0],10);t._uf=parseInt(vo[1],10);t._wf=parseInt(vo[2],10);t._qa=dT_._qa;t._cg=dT_._qa._hc(document.location.href);dT_._Db(t._bb);dT_._Cb(t._ag);t._qa._fc(dT_,{tpstr:t._Bf,tpsto:t._Df});t._bb();}})();