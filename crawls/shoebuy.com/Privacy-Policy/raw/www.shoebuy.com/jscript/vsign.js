if (typeof dn == 'undefined') {
   dn='WWW.SHOEBUY.COM';
}
lang="en";
aff="VeriSignCACenter";
tpt="opaque";
vrsn_style="WW";
splash_url="https://seal.verisign.com";
seal_url="https://seal.verisign.com";
u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang="+lang;
u2=seal_url+"/getseal?at=0&&sealid=1&dn="+dn+"&aff="+aff+"&lang="+lang;
function vrsn_splash() {
tbar = "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";
sw = window.open(u1,'VRSN_Splash',tbar);
sw.focus();
v_ua=navigator.userAgent.toLowerCase();
v_oie=(v_ua.indexOf("msie")!=-1);
if(v_oie) v_oie=(v_ua.indexOf("msie 5")==-1 && v_ua.indexOf("msie 6")==-1);
}
function v_mact(e){
 if (document.addEventListener) {
  var s=(e.target.name=="seal");
   if (s) { vrsn_splash(); return false; }
 }else if(document.captureEvents) {
  var tgt=e.target.toString(); var s=(tgt.indexOf("splash")!=-1);
  if (s){ vrsn_splash(); return false; }
 }
 return true;
}
