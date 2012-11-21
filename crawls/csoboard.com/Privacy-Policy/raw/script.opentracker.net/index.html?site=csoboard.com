ot_d=document;ot_un="undefined";
if(typeof otgoal!==ot_un){ot_goal=escape(otgoal);if(ot_goal.indexOf('%u')!=-1)ot_goal=escape(ot_goal);ot_goal='&otgoal='+ot_goal;}else ot_goal='';
if(typeof otclv!==ot_un)ot_clv='&otclv='+otclv;else ot_clv='';
ot_is='http'+(ot_d.URL.indexOf('https:')==0?'s://':'://');
ot_b=ot_is+'at1.opentracker.net';
if(typeof(top.document)=="object") ot_r=top.document;else ot_r=ot_d;
ot_c=ot_r;
ot_cd=(new Date("December 31, 2023")).toGMTString();ot_cld=new Date();ot_fv=false;ot_ac=false;
if (typeof ot_ti===ot_un) {
  ot_ti=ot_d.title;
}
ot_ti=escape(ot_ti);if (ot_ti.indexOf('%u')!=-1) ot_ti=escape(ot_ti);
ot_mj=parseInt(navigator.appVersion);if(ot_mj>=5){if(ot_d.referrer.indexOf(ot_r.location.hostname)==-1)ot_r=ot_d;}else{ot_r=document;}
if(ot_c.cookie.indexOf('machine-id')!=-1)ot_ac=true;else{
 if(ot_c.cookie.indexOf('machine-id')==-1) f_sc("machine-id","64.147.188.8:1353503384387",ot_cd,"/");
 if(ot_c.cookie.indexOf('machine-id')!=-1)ot_ac=true;
}
ot_rc=f_rc("machine-id");ot_lc=escape((typeof ot_url===ot_un)?ot_d.location:ot_url);ot_t0=1353503384387;

function f_log() {

 var r = ot_r.referrer;
 if (typeof ot_ref !== ot_un) r=ot_ref;
 ot_im=new Image(1,1);
 ot_im.src=ot_b+'/collect.jsp?p=1&mid='+ot_rc
  +'&fv='+ot_fv+'&ti='+ot_ti+'&si=csoboard.com'
  +ot_goal+ot_clv
  +'&sh='+screen.height+'&sw='+screen.width
  +'&sc='+screen.pixelDepth+ot_goal+ot_clv
  +'&lc='+ot_lc+'&ref='+escape(r)
  +'&t0='+ot_t0;

}

function f_sc(n,v,h,p,d,s){
ot_fv=true;ot_c.cookie=n+'='+escape(v)+((h)?(';expires='+h):'')+((p)?';path='+p:'')+((d)?';domain='+d:'')+((s && (s==true))?'; secure':'');
}

function f_rc(n){
 if(ot_c.cookie=='')return false;else{
 var fc,lc;var tbc=ot_c.cookie;fc=tbc.indexOf(n);var NN2Hack=fc+n.length;
 if((fc != -1) && (tbc.charAt(NN2Hack)=='=')){
  fc += n.length+1;lc=tbc.indexOf(';',fc);
  if(lc==-1)lc=tbc.length;return unescape(tbc.substring(fc,lc));
  }else{return false;}
 }
}

function ot_f(e) {
 et=e.target;
 ot_o=et;
 if (ot_o.caught==true) {ot_o.caught=false;return;}
 ep=et.parentNode;
 if (ep==null) return;
 if (ep.tagName=="A" || ep.tagName=="AREA") et = ep; else {
  if (ep.parentNode) {
   epp=ep.parentNode;
   if (epp.tagName=="A" || epp.tagName=="AREA") et = epp;
  }
 }
 isA=(et.tagName=="A" || et.tagName=="AREA")?1:0;
 isL=(isA && et.href)?1:0;
 if (!isL || et.href.indexOf('ot_evt(')!=-1) return;
 ot_i=et.href.indexOf(ot_d.domain);
 if ((ot_i<9&&ot_i!=-1) || et.href.indexOf("/")==1) return;
 ot_l=escape(et.href);

 ot_im=new Image(1,1);
 ot_im.src=ot_b+'/collect_.jsp?p=3&mid='+ot_rc+'&si=csoboard.com&ms='+ot_l+'&lc='+ot_lc+'&ti='+ot_ti+'&t0='+ot_t0;

 if(navigator.userAgent.toLowerCase().indexOf('safari')!=-1) {
   e.preventDefault();
   ot_o.caught=true;
   setTimeout("var ot_e=document.createEvent('MouseEvents');ot_e.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);ot_o.dispatchEvent(ot_e);",100);
 }
}

function _j(m){
var n=new Date();n=n.getTime()+m;
if(m==0)return n;
if(m>15){while(true){m=new Date();if(m.getTime()>n)return;}}
else{n+="";return n.substring(n.length-m,n.length);}
}

function ot_evt(m,c){
if(m===undefined)m="unknown";
if(typeof m=="object"){m="unload";return;}
if(c==undefined)c=0;
m=escape(m+"|"+c+"|"+_j(5));if (m.indexOf('%u')!=-1) m=escape(m);

ot_im=new Image(1,1);
ot_im.src=ot_b+'/collect_.jsp?p=2&mid='+ot_rc+'&si=csoboard.com&ms='+m+'&lc='+ot_lc+'&ti='+ot_ti+'&t0='+ot_t0;

_j(250);
}

if (ot_d.getElementById && ot_d.createElement){
 if (window.addEventListener){
  window.addEventListener("unload",ot_evt,true);
  self.addEventListener("click",ot_f,true);
 }
}
f_log();

