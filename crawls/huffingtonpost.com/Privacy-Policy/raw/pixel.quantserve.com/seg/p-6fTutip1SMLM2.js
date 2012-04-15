function _qcdomain2(){
 var d=document.domain;
 if(d.substring(0,4)=="www.")d=d.substring(4,d.length);
 var a=d.split(".");var len=a.length;
 if(len<3)return d;
 var e=a[len-1];
 if(e.length<3)return d;
 d=a[len-2]+"."+a[len-1];
 return d;
}
function quantseg()
{
 var segs="Q_D";
 var u=document;
 var d=_qcdomain2();
 u.cookie="__qseg="+segs+"; expires=Sun, 18 Jan 2038 00:00:00 GMT; path=/; domain="+d;
}
quantseg();