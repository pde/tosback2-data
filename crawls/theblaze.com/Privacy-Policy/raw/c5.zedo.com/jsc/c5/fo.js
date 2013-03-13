//  Copyright (c) 2000-2013 ZEDO Inc. All Rights Reserved.
function U1(){
var o1=navigator.userAgent.toLowerCase();var a5=(o1.indexOf('mac')!=-1);var z12=(o1.indexOf("android")!=-1);var t6=parseInt(navigator.appVersion);
var q3=(!a5&&(o1.indexOf('opera')==-1)&&(o1.indexOf('msie')!=-1)&&(t6>=4)&&(o1.indexOf('webtv')==-1)&&(o1.indexOf('msie 4')==-1));
if(q3){
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
else if(z12){
if(navigator.plugins&&navigator.plugins.length){
var o3;
for(o3=0;o3<navigator.plugins.length;o3++){
if(navigator.plugins[o3].name.indexOf('Shockwave Flash')!=-1){
p0=1;
break;
}}}}
var a3=navigator.javaEnabled();var c0=1;
if(a3){c0 |=4;}
if(p0){c0 |=8;}
if(q3){
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
var v4=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return v4;
}
var n0=0;var w8='';var d1=0;var d1=0;var w12;var q14;var v11;var d12;var d10;var e11;var i12='';var e0='0';var i0=0;var o7='';var v2='';var zd_$='';var p0=0;var p1='';var o2='';var q2='';var a2="";
var n4='';var y4='';var z1=new Array();var w0='';var i6=0;var i3='';var y2="";var c11='';var w16="1424,1666,996,647,1962,876,1241,480";var n15=w16.split(",");var q12=false;
var v16="1424-111:134:120:118:140:116:561:119:117:142:148:150:145:143:1052:1053:146:1054:277:1189:1292:1190:1191:1310:1313:1311:1312:1477:1478:1480:1479:1778:1781:1779:1780:1460:1463:1461:1462:276:106:480:419:109:107:1297:108:1264:1282:1265:1266:1256:1249:1250:1251:1286:1532:1534:1535:1536:1267:1283:1268:1269:161:164:163:162:492:982:7:478:50:48:49:47:664:568:93:1096:1274:1285:1275:1276:1489:1490:1573:1574:1431:1432:1435:1436:1433:1434:1442:1443:1487:1488:1782:1785:1783:1784:1704:1707:1705:1706:165:444:168:167:441:166:1169:630:567:442:443:472:578:581:1866:1856:973:974:490:557:563:780:793:781:782:812:1154:1158:1290:1156:1159:1155:1160:1157:1165";
var r13=v16.split(',');var o14=false;
if(typeof zflag_nid!='undefined'){
n0=zflag_nid;
}
if(typeof zflag_cid!='undefined'){
e0=zflag_cid;
if(e0<0||e0>999999){
e0=0;
}
var w7=e0;var q13=w7.toString().indexOf('/');
if(q13!=-1){
w7=parseInt(w7.substr(0,q13));
}else{
w7=parseInt(w7);
}}
for(var i=0;i<n15.length;i++){
if(n0==n15[i]){
for(var k=0;k<r13.length;k++){
var c13=r13[k].split('-');
if(n0==c13[0]){
o14=true;
var o13=c13[1].split(':');
for(var j=0;j<o13.length;j++){
if(w7==o13[j]){
q12=true;
break;
}}}}
if(!o14){
q12=true;
break;
}}}
if(q12){
document.write('<scr'+'ipt language="javascript" src="http://axp.zedo.com/client/axp/fo.js"></scr'+'ipt>');
}else{
zflag_nid=0;
if(typeof zflag_charset!='undefined'){
w8="charset="+zflag_charset;
zflag_charset="";
}
if(typeof zflag_sid!='undefined'){
d1=zflag_sid;
}
if(typeof zflag_pbnw!='undefined'){
y2+="&pn="+zflag_pbnw;
zflag_pbnw=0;
}
if(typeof zflag_6!='undefined'){
y2+="&6="+zflag_6;
zflag_6=0;
}
if(typeof zflag_pbad!='undefined'){
y2+="&pa="+zflag_pbad;
zflag_pbad=0;
}
if(typeof zflag_pbch!='undefined'){
if(zflag_pbch.indexOf("/")!=-1){
var y16=zflag_pbch.substr(0,zflag_pbch.indexOf("/"));
y2+="&pc="+y16;
}
else{
y2+="&pc="+zflag_pbch;
}
zflag_pbch="0";
}
if(typeof zflag_pbr!='undefined'){
y2+="&pr="+zflag_pbr;
zflag_pbr=0;
}
if(typeof zflag_pbsid!='undefined'){
y2+="&ps="+zflag_pbsid;
}
if(typeof zflag_chanlimits!='undefined'){
i6=zflag_chanlimits;
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
o7=zflag_alter_sz;
if(o7<0||o7>95){
o7=0;
}
o7="&adm="+o7;
zflag_alter_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
v2=escape(zflag_kw);
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
q2='&l='+zzTrd;
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
y4=zflag_num;
zflag_num=0;
}
if(typeof zflag_ck!='undefined'){
w0='&ck='+zflag_ck;
zflag_ck=0;
}
if(typeof zflag_smooth!='undefined'){
c11='&zsm='+zflag_smooth;
}else{
c11='&zsm=0';
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
var zzState=0;}var zzSection=d1;var zzPbNId=w12;var zzPbEId=v11;var zzPbAId=d12;var zzPbCId=d10;var zzPbGeoLvl=e11;var zzPbk=i12;
if(typeof zzPbk=='undefined'){
zzPbk=-1;
}
var zzPbSId=q14;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;var zzNw=0;var zzCh=0;
var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
p1=U1();
if(p1<0||p1>31){
p1=1;
}
t0='<scr'+'ipt language="javascript" src="http://c7.zedo.com/bar/v17-006/c5/jsc/fm.js?c='+e0+'&a='+i6+'&f='+y4+'&n='+n0+'&r='+p1+'&d='+i0+o7+'&q='+v2+'&$='+zd_$+y2+'&s='+d1+o2+a2+q2+n4+i3+w0+c11+'&z='+Math.random()+'" '+w8+'></scr'+'ipt>';
document.write(t0);
}