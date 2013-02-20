//  Copyright (c) 2000-2013 ZEDO Inc. All Rights Reserved.
function U1(){
var o1=navigator.userAgent.toLowerCase();var t5=(o1.indexOf('mac')!=-1);var d12=(o1.indexOf("android")!=-1);var t6=parseInt(navigator.appVersion);
var r3=(!t5&&(o1.indexOf('opera')==-1)&&(o1.indexOf('msie')!=-1)&&(t6>=4)&&(o1.indexOf('webtv')==-1)&&(o1.indexOf('msie 4')==-1));
if(r3){
document.writeln('<scr'+'ipt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('p0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(p0<=0)then p0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var r2=navigator.plugins["Shockwave Flash"].description;
if(parseInt(r2.substring(r2.indexOf(".")-2))>=4){
p0=1;
}}}
else if(d12){
if(navigator.plugins&&navigator.plugins.length){
var o3;
for(o3=0;o3<navigator.plugins.length;o3++){
if(navigator.plugins[o3].name.indexOf('Shockwave Flash')!=-1){
p0=1;
break;
}}}}
var q3=navigator.javaEnabled();var c0=1;
if(q3){c0 |=4;}
if(p0){c0 |=8;}
if(r3){
if(document.documentElement){
document.documentElement.style.behavior='url(#default#clientCaps)';
if(document.documentElement.connectionType=='lan'){
c0 |=16;
}}
else if(document.body){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
c0 |=16;
}}}
return c0;
}
function B1(){
var q4=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return q4;
}
var n0=0;var w8='';var e1=0;var e1=0;var e12;var i13;var v11;var r12;var n10;var w10;var a12='';var e0='0';var i0=0;var y6='';var y2='';var zd_$='';var p0=0;var r1='';var o2='';var w2='';var a2="";
var n4='';var v4='';var z1=new Array();var w0='';var c6=0;var i3='';var z3="";var o11='';var d15="2148,2170,2146,2147,996,647,1962,876,1241,480";var o14=d15.split(",");var i14=false;
if(typeof zflag_nid!='undefined'){
n0=zflag_nid;
}
for(var i=0;i<o14.length;i++){
if(n0==o14[i]){
i14=true;
break;
}}
if(i14){
document.write('<scr'+'ipt language="javascript" src="http://axp.zedo.com/client/axp/fo.js"></scr'+'ipt>');
}else{
zflag_nid=0;
if(typeof zflag_charset!='undefined'){
w8="charset="+zflag_charset;
zflag_charset="";
}
if(typeof zflag_sid!='undefined'){
e1=zflag_sid;
}
if(typeof zflag_pbnw!='undefined'){
z3+="&pn="+zflag_pbnw;
zflag_pbnw=0;
}
if(typeof zflag_6!='undefined'){
z3+="&6="+zflag_6;
zflag_6=0;
}
if(typeof zflag_pbad!='undefined'){
z3+="&pa="+zflag_pbad;
zflag_pbad=0;
}
if(typeof zflag_pbch!='undefined'){
if(zflag_pbch.indexOf("/")!=-1){
var i15=zflag_pbch.substr(0,zflag_pbch.indexOf("/"));
z3+="&pc="+i15;
}
else{
z3+="&pc="+zflag_pbch;
}
zflag_pbch="0";
}
if(typeof zflag_pbr!='undefined'){
z3+="&pr="+zflag_pbr;
zflag_pbr=0;
}
if(typeof zflag_pbsid!='undefined'){
z3+="&ps="+zflag_pbsid;
}
if(typeof zflag_cid!='undefined'){
e0=zflag_cid;
if(e0<0||e0>999999){
e0=0;
}}
if(typeof zflag_chanlimits!='undefined'){
c6=zflag_chanlimits;
zflag_chanlimits=0;
}
if(typeof zflag_sz!='undefined'){
i0=zflag_sz;
if(i0<0||i0>95){
i0=0;
}
zflag_sz=0;
}
if(typeof zflag_alter_sz!='undefined'){
y6=zflag_alter_sz;
if(y6<0||y6>95){
y6=0;
}
y6="&adm="+y6;
zflag_alter_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
y2=escape(zflag_kw);
zflag_kw="";
}
if(typeof zflag_$!='undefined'){
zd_$=zflag_$;
zflag_$='';
}
if(typeof zflag_geo!='undefined'){
if(!isNaN(zflag_geo)){
o2="&gc="+zflag_geo;
zflag_geo=0;
}}
if(typeof zflag_param!='undefined'){
a2="&p="+zflag_param;
zflag_param="";
}
if(typeof zflag_click!='undefined'){
zzTrd=escape(zflag_click);
w2='&l='+zzTrd;
zflag_click="";
}
if(typeof zflag_ad_title!='undefined'){
zzTitle=escape(zflag_ad_title);
i3='&t='+zzTitle;
zflag_ad_title="";
}
if(typeof zflag_hasAd!='undefined'){
n4='&y='+zflag_hasAd;
}
if(typeof zflag_num!='undefined'){
v4=zflag_num;
zflag_num=0;
}
if(typeof zflag_ck!='undefined'){
w0='&ck='+zflag_ck;
zflag_ck=0;
}
if(typeof zflag_smooth!='undefined'){
o11='&zsm='+zflag_smooth;
}else{
o11='&zsm=0';
}
z1=B1();
for(var i=0;i<z1.length;i++){
if(eval('typeof(zflag_'+z1[i]+')!="undefined"')){
w0=w0+'&'+z1[i]+'='+eval('zflag_'+z1[i]);
eval('zflag_'+z1[i]+'="";');
}}
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=e1;var zzPbNId=e12;var zzPbEId=v11;var zzPbAId=r12;var zzPbCId=n10;var zzPbGeoLvl=w10;var zzPbk=a12;
if(typeof zzPbk=='undefined'){
zzPbk=-1;
}
var zzPbSId=i13;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;var zzNw=0;var zzCh=0;
var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
r1=U1();
if(r1<0||r1>31){
r1=1;
}
t0='<scr'+'ipt language="javascript" src="http://c7.zedo.com/bar/v17-005/c5/jsc/fm.js?c='+e0+'&a='+c6+'&f='+v4+'&n='+n0+'&r='+r1+'&d='+i0+y6+'&q='+y2+'&$='+zd_$+z3+'&s='+e1+o2+a2+w2+n4+i3+w0+o11+'&z='+Math.random()+'" '+w8+'></scr'+'ipt>';
document.write(t0);
}