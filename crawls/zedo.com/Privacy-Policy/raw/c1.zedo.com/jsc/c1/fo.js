//  Copyright (c) 2000-2013 ZEDO Inc. All Rights Reserved.
function U1(){
var y0=navigator.userAgent.toLowerCase();var q4=(y0.indexOf('mac')!=-1);var r9=(y0.indexOf("android")!=-1);var w5=parseInt(navigator.appVersion);
var d3=(!q4&&(y0.indexOf('opera')==-1)&&(y0.indexOf('msie')!=-1)&&(w5>=4)&&(y0.indexOf('webtv')==-1)&&(y0.indexOf('msie 4')==-1));
if(d3){
document.writeln('<scr'+'ipt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(r0<=0)then r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var o2=navigator.plugins["Shockwave Flash"].description;
if(parseInt(o2.substring(o2.indexOf(".")-2))>=4){
r0=1;
}}}
else if(r9){
if(navigator.plugins&&navigator.plugins.length){
var n2;
for(n2=0;n2<navigator.plugins.length;n2++){
if(navigator.plugins[n2].name.indexOf('Shockwave Flash')!=-1){
r0=1;
break;
}}}}
var i3=navigator.javaEnabled();var c0=1;
if(i3){c0 |=4;}
if(r0){c0 |=8;}
if(d3){
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
var o4=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return o4;
}
var n0=0;var e6='';var z1=0;var z1=0;var y11;var o13;var y10;var n11;var c9;var c10;var r11='';var e0='0';var d0=0;var e4='';var r2='';var zd_$='';var r0=0;var i1='';var v1='';var c2='';var e2="";
var o3='';var r3='';var v0=new Array();var q0='';var c4=0;var w2='';var r1="";var a6='';
var y12="1405,2235,1535,2056,2125,1468,1617,1803,1521,1429,2120,1528,1486,1252,1289,1656,1438,1273,1516,1474,2185,1408,1263,1668,1235,1504,1655,1231,1179,1480,1232,1094,211,1241,480";
var d10=y12.split(",");var a7=false;var z13="";var d9=z13.split(',');var a9=false;
if(typeof zflag_nid!='undefined'){
n0=zflag_nid;
}
if(typeof zflag_cid!='undefined'){
e0=zflag_cid;
if(e0<0||e0>999999){
e0=0;
}
var v3=e0;var i9=v3.toString().indexOf('/');
if(i9!=-1){
v3=parseInt(v3.substr(0,i9));
}else{
v3=parseInt(v3);
}}
for(var i=0;i<d10.length;i++){
if(n0==d10[i]){
for(var k=0;k<d9.length;k++){
var z9=d9[k].split('-');
if(n0==z9[0]){
a9=true;
var w8=z9[1].split(':');
for(var j=0;j<w8.length;j++){
if(v3==w8[j]){
a7=true;
break;
}}}}
if(!a9){
a7=true;
break;
}}}
if(a7){
document.write('<scr'+'ipt language="javascript" src="http://axp.zedo.com/client/axp/fo.js"></scr'+'ipt>');
}else{
zflag_nid=0;
if(typeof zflag_charset!='undefined'){
e6="charset="+zflag_charset;
zflag_charset="";
}
if(typeof zflag_sid!='undefined'){
z1=zflag_sid;
}
if(typeof zflag_pbnw!='undefined'){
r1+="&pn="+zflag_pbnw;
zflag_pbnw=0;
}
if(typeof zflag_6!='undefined'){
r1+="&6="+zflag_6;
zflag_6=0;
}
if(typeof zflag_pbad!='undefined'){
r1+="&pa="+zflag_pbad;
zflag_pbad=0;
}
if(typeof zflag_pbch!='undefined'){
if(zflag_pbch.indexOf("/")!=-1){
var e13=zflag_pbch.substr(0,zflag_pbch.indexOf("/"));
r1+="&pc="+e13;
}
else{
r1+="&pc="+zflag_pbch;
}
zflag_pbch="0";
}
if(typeof zflag_pbr!='undefined'){
r1+="&pr="+zflag_pbr;
zflag_pbr=0;
}
if(typeof zflag_pbsid!='undefined'){
r1+="&ps="+zflag_pbsid;
}
if(typeof zflag_chanlimits!='undefined'){
c4=zflag_chanlimits;
zflag_chanlimits=0;
}
if(typeof zflag_sz!='undefined'){
d0=zflag_sz;
if(d0<0||d0>95){
d0=0;
}
zflag_sz=0;
}
if(typeof zflag_alter_sz!='undefined'){
e4=zflag_alter_sz;
if(e4<0||e4>95){
e4=0;
}
e4="&adm="+e4;
zflag_alter_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
r2=escape(zflag_kw);
zflag_kw="";
}
if(typeof zflag_$!='undefined'){
zd_$=zflag_$;
zflag_$='';
}
if(typeof zflag_geo!='undefined'){
if(!isNaN(zflag_geo)){
v1="&gc="+zflag_geo;
zflag_geo=0;
}}
if(typeof zflag_param!='undefined'){
e2="&p="+zflag_param;
zflag_param="";
}
if(typeof zflag_click!='undefined'){
zzTrd=escape(zflag_click);
c2='&l='+zzTrd;
zflag_click="";
}
if(typeof zflag_ad_title!='undefined'){
zzTitle=escape(zflag_ad_title);
w2='&t='+zzTitle;
zflag_ad_title="";
}
if(typeof zflag_hasAd!='undefined'){
o3='&y='+zflag_hasAd;
}
if(typeof zflag_num!='undefined'){
r3=zflag_num;
zflag_num=0;
}
if(typeof zflag_ck!='undefined'){
q0='&ck='+zflag_ck;
zflag_ck=0;
}
if(typeof zflag_smooth!='undefined'){
a6='&zsm='+zflag_smooth;
}else{
a6='&zsm=0';
}
v0=B1();
for(var i=0;i<v0.length;i++){
if(eval('typeof(zflag_'+v0[i]+')!="undefined"')){
q0=q0+'&'+v0[i]+'='+eval('zflag_'+v0[i]);
eval('zflag_'+v0[i]+'="";');
}}
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=z1;var zzPbNId=y11;var zzPbEId=y10;var zzPbAId=n11;var zzPbCId=c9;var zzPbGeoLvl=c10;var zzPbk=r11;
if(typeof zzPbk=='undefined'){
zzPbk=-1;
}
var zzPbSId=o13;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;var zzNw=0;var zzCh=0;
var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
i1=U1();
if(i1<0||i1>31){
i1=1;
}
a0='<scr'+'ipt language="javascript" src="http://c7.zedo.com/bar/v17-007/c1/jsc/fm.js?c='+e0+'&a='+c4+'&f='+r3+'&n='+n0+'&r='+i1+'&d='+d0+e4+'&q='+r2+'&$='+zd_$+r1+'&s='+z1+v1+e2+c2+o3+w2+q0+a6+'&z='+Math.random()+'" '+e6+'></scr'+'ipt>';
document.write(a0);
}