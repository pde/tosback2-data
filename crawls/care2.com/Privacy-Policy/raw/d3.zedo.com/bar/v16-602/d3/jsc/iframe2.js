//  Copyright (c) 2000-2012 ZEDO Inc. All Rights Reserved.
var t9=new Image();
function F23(p20){
var r13=p20.toString().match(/function\s+(\w*)/)[1];
if((r13==null)||(r13.length==0)){
return "anonymous();";
}
else{
return r13+"();";
}}
function B16(){
var n19="";
for(var a=arguments.caller;a!=null;a=a.caller){
n19+=F23(a.callee);
if(a.caller==a)break;
}
return n19;
}
function F25(){
var z5="";var r13="anonymous();";var w18=0;
window.onerror=null;
for(var i=0;i<arguments.length;i++){
z5+='a'+i+'='+arguments[i]+';';
if(i==2){
w18=escape(arguments[i]);
}}
z5=B16()+z5;
if(navigator.cookieEnabled){
z5=z5+'c='+navigator.cookieEnabled+';';
}
z5=z5+"C="+document.cookie+";";
if(document.cookie.indexOf('FFERROR')==-1){
var i20='ads5';
t9.src='http://r1.zedo.com/log/ERR.gif?v=bar/v16-602/d3;'+z5+'b='+navigator.userAgent;
document.cookie="FFERROR="+w18;
}
return true;
}
window.onerror=F25; 
var v13=new Array();var z17=0;
function F0(c4){
if(z17<1){
var z15=''+window.location.search;var a11=new Array();
z15=z15.replace(/^\?/,'');
a11=z15.split(';');
z17=a11.length;
for(var i=0;i<z17;i++){
if(a11[i].length>2){
var d15=a11[i].split('=');
if(d15[0]=='l'){
v13['l']=a11[i].substring(2);
}
else{
v13[d15[0]]=d15[1];
}}}}
if(v13[c4]){return v13[c4];}
else{return '';}
}
function B12(){
var i0=U0('ZEDOIDX',false);var o1=navigator.userAgent.toLowerCase();var v21=((o1.indexOf('mac')!=-1)&&(o1.indexOf('msie 4.')!=-1));var q4=navigator.javaEnabled();var n11=0;
i0=1;
if(v21){
return i0;
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var e3=navigator.plugins["Shockwave Flash"].description;
if(parseInt(e3.substring(e3.indexOf(".")-2))>=4){
n11=1;
}}}
if(q4){i0 |=4;}
if(n11){i0 |=8;}
if(!F3()){
i0 |=16;
}
else{
if(typeof zzConn!='undefined'){
if(zzConn==0){
i0 |=0;
}
else if((zzConn>=1)&&(zzConn<15)){
i0 |=16;
}
else{
t1=new Date();
d1.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
d1.onload=F1;
}
} 
else{
t1=new Date();
d1.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
d1.onload=F1;
}
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}
return i0;
}
var o2=0;var a0=0;var n2=0;var e22=new Image();
var y4=new Array();
function B0(d10,d9,a9){
var d2=new Date();
if(!a9){a9=31536000000;}
d2.setTime(d2.getTime()+a9);
document.cookie=d10+'='+d9+';expires='+d2.toGMTString()+';domain=.zedo.com;path=/;';
}
function U0(c4,w11){
if(!y4[c4]||w11){
var p11=document.cookie;var a2=new Array();var n9=new Array();
a2=p11.split(';');
var t10=(a2!=null)?a2.length:0;
for(var i=0;i<t10;i++){
a2[i]=a2[i].replace(/^\s/,'');
n9=a2[i].split('=');
y4[n9[0]]=n9[1];
}}
if(y4[c4]){return y4[c4];}
else{return '';}
}
function U2(){
var r1=new Date();var p0=new Date();
p0.setUTCHours(5);
p0.setUTCMinutes(0);
p0.setUTCSeconds(0);
var a3=p0.getTime()-r1.getTime();
if(a3<0){
p0.setUTCDate(p0.getUTCDate()+1);
a3=p0.getTime()-r1.getTime();
}
return a3;
}
var t1;var d1=new Image();
function F1(){
var o6=new Date();var p5=o6.getTime()-t1.getTime();var e6=10239/p5;
if(e6>6){
var i0=U0('ZEDOIDX',false);
i0 |=16;
if(F3()){
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}}}
function U15(src){
var o9;
try{
o9=new XMLHttpRequest();
}catch(e){
try{
o9=new ActiveXObject('Msxml2.XMLHTTP');
}catch(e){
try{
o9=new ActiveXObject('Microsoft.XMLHTTP');
}catch(e){
if(document.cookie.indexOf('FFERROR')==-1){
var p14=new Image();var z5='Your browser does not support AJAX!';
p14.src='http://r1.zedo.com/log/ERR.gif?v=bar/v16-602/d3;'+z5+'b='+navigator.userAgent;
document.cookie="FFERROR=0";
}
return false;
}}}
o9.open('GET',src,false);
o9.send(null);
if(o9.status==200){
eval(o9.responseText);
}}
function F3(){
if(document.cookie.indexOf('ZEDOIDX')!=-1){
return true;
}else{
return false;
}}
function U1(){
var i0=U0('ZEDOIDX',false);var o1=navigator.userAgent.toLowerCase();var r7=(o1.indexOf('mac')!=-1);var w4=(!r7&&(o1.indexOf('msie 5')!=-1)||(o1.indexOf('msie 6')!=-1));
document.writeln('<scri'+'pt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('a0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(a0<=0)then a0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
var q4=navigator.javaEnabled();
i0=1;
if(q4){i0 |=4;}
if(a0){i0 |=8;}
if(w4){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
i0 |=16;
}}
else{
if(F3()){
if(typeof zzConn!='undefined'){
if(zzConn==0){
i0 |=0;
}
else if((zzConn>=1)&&(zzConn<15)){
i0 |=16;
}
else{
t1=new Date();
d1.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
d1.onload=F1;
}}
else{
t1=new Date();
d1.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
d1.onload=F1;
}}
else{
i0 |=16;
} 
}
if(F3()){
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}
return i0;
}
function B11(n10){
var v6=0;var d2=new Date();var y14=U0('FFcat',false);var o19=U0('FFad',false);
if(!y14){
y14=n10;
o19="-1";
y3=U0('FFSkp',false);
if(y3.length>0){
d2.setUTCDate(d2.getUTCDate()-1);
document.cookie='FFSkp=1;expires='+d2.toGMTString()+';domain='+document.domain+';path=/;';
}}
v6=F20(y14,o19,n10);
zzPos=v6;
return v6;
}
function F20(p10,e12,n10){
var y17=false;var a7=p10.split(":");var q7=e12.split(":");var v6=0;var t20=0;var i;
for(i=0;i<a7.length;i++){
if(a7[i]==n10){
t20=a7[i];
q7[i]++;
if(q7[i]>101){q7[i]=0;}
v6=q7[i];
if(isNaN(v6)){
e22.src='http://r1.zedo.com/ads3/p/'+zzRand+'/NaN.gif?v=bar/v16-602/d3;C='+document.cookie+';b='+navigator.userAgent;
v6=0;
q7[i]=0;
}
y17=true;
break;
}}
if(!y17&&a7.length<60){
p10=n10+":"+p10;
e12=0+":"+e12;
}
else{
if(i==a7.length){
i--;
}
for(var j=i;j>0;j--){
a7[j]=a7[j-1];
q7[j]=q7[j-1];
}
a7[0]=n10;
q7[0]=v6;
p10=a7.join(":");
e12=q7.join(":");
}
if(F3()){
var a3=U2();
B0('FFcat',p10,a3);
B0('FFad',e12,a3);
}
else{
v6=Math.floor((Math.random()* 1000000)% 20);
}
return v6;
}
function B10(q16,z18){
if(q16.length<1){
return 0;
}
if((q16==0)&&(z18>0)){
return 1;
}
if(q16>z18){
return 1;
}else{
return 0;
}}
function U10(d7){
if(d7>255){
d7=(d7 & 255);
}
return d7;
}
function F8(d7){
var y19=0;
if(d7>255){
y19=((d7>>16)& 4095);
}
return y19;
}
function U9(d7){
var e18=0;
if(d7>255){
e18=((d7>>8)& 255);
}
return e18;
}
function B2(){
var p19=10;var z10=new Date();var i13=z10.getUTCMinutes();var c20=z10.getUTCHours();var o22=z10.getUTCMonth()+1;var z10=z10.getUTCDate();
i13=i13+(p19-(i13 % p19));
return B5(z10)+B5(o22)+B5(c20)+B5(i13);
}
function B5(e10){
e10=""+e10;
if(e10.length<2){
e10="0"+e10;
}
return e10;
}
function B0(d10,d9,a9){
if(d9.length>=3000){
B14(d10,d9);
}
var d2=new Date();
if(!a9){a9=31536000000;}
d2.setTime(d2.getTime()+a9);
document.cookie=d10+'='+d9+';expires='+d2.toGMTString()+';domain=.zedo.com;path=/;';
}
function U0(c4,w11){
if(!y4[c4]||w11){
var p11=document.cookie;var a2=new Array();var n9=new Array();
a2=p11.split(';');
var t10=(a2!=null)?a2.length:0;
for(var i=0;i<t10;i++){
a2[i]=a2[i].replace(/^\s/,'');
n9=a2[i].split('=');
y4[n9[0]]=n9[1];
}}
if(y4[c4]){return y4[c4];}
else{return '';}
}
function U2(){
var r1=new Date();var p0=new Date();
p0.setUTCHours(5);
p0.setUTCMinutes(0);
p0.setUTCSeconds(0);
var a3=p0.getTime()-r1.getTime();
if(a3<0){
p0.setUTCDate(p0.getUTCDate()+1);
a3=p0.getTime()-r1.getTime();
}
return a3;
}
function U11(){
var r1=new Date();var q5=r1.getDate();
if(q5>=0&&q5<=9)
q5="0"+q5;
var t5=r1.getMonth()+1;
if(t5>=0&&t5<=9)
t5="0"+t5;
var p15=(r1.getFullYear()).toString()+t5+q5;
return p15;
}
function B14(t21,v19){
var n17=v19.length / 4;var c14=v19;var z21=(U0('ZEDOIDA')=='')?'unknown':U0('ZEDOIDA');
for(var i=0;i<4;i++){
var p14=new Image();var v20=escape(c14.substring(0,n17-1));
c14=c14.substring(n17);
var z5=t21+'.length>3KB;'+'u='+z21+';'+'c'+i+'='+v20;
p14.src='http://r1.zedo.com/log/ERR.gif?'+z5+';b='+navigator.userAgent;
}}
function F13(){
var n6=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return n6;
}
function F9(){
var w19=F13();var w17=new Array();
for(var i=0;i<w19.length;i++){
w17[i]=w19[i].substring(1);
}
return w17;
}
function F11(){
var c18=F13();var q11=new Array();var r20=new RegExp(",","g");
for(var i=0;i<c18.length;i++){
q11[i]=F0(c18[i]);
if(q11[i]!=""){
q11[i]=q11[i].replace(r20,"Z");
}}
return q11;
}
var o20=F0('ck');
if(o20==1){
var o0=F0('n');var v9=F0('e');
if(v9==1){
var q2=U0('ZFFdm',true);var c2='ZFFdm';
}else{
var q2=U0('FFdm',true);var c2='FFdm';}
var zzuid="unknown";
if(document.cookie.indexOf('FFgeo')==-1)
zzuid='blocked';
if(document.cookie.match(/ZEDOIDA=([^;]*)/)){
zzuid=RegExp.$1;
}
if(zzuid=="OPT_OUT"&&q2.length>0){
var d2=new Date('October 12,1988 13:14:00');
document.cookie=c2+'=1;expires='+d2.toGMTString()+';domain=.zedo.com;path=/;';
}
if(zzuid!="OPT_OUT"){
var v9=F0('e');
if(!o0){o0=0;}
if(v9.length==0){v9=0;}
var o10=new Array();var t17=new Array();var v12=new Array();var a12=new Array();var y12=new Array();
t17=F9();
a12=F11();
var d8=0;
for(var i=0;i<a12.length;i++){
if(a12[i]!=""){
o10[d8]=t17[i];
v12[d8++]=a12[i];
}}
var v0=o0+"-"+U11();
for(var p=0;p<d8;p++){
v0=v0+","+o10[p]+"|"+v12[p];
y12[p]=o10[p]+"|";
}
var a10=false;var t8=false;
if(q2.length>0){
var i2=q2.split(":");var i,k;
for(i=0;i<i2.length;i++){
if(i2[i].length>0&&i2[i].substring(0,i2[i].indexOf("-"))==o0){
var q1=i2[i].split(",");var z8=q1.length;
for(var q=0;q<d8;q++){
t8=false;
for(k=1;k<z8;k++){
if(q1[k].substring(0,q1[k].indexOf('|')+1)==y12[q]){
t8=true;
break;
}}
if(!t8&&z8<15){
q1[0]=q1[0]+","+y12[q]+v12[q];
}else{
if(k==z8){
k--;
}
for(var j=k;j>1;j--){
q1[j]=q1[j-1];
}
q1[1]=y12[q]+v12[q];
}}
v0=q1.join(",")
a10=true;
break;
}}
if(!a10&&i2.length<40){
q2=v0+":"+q2;
}else{
if(i==i2.length){
i--;
}
for(var j=i;j>0;j--){
i2[j]=i2[j-1];
}
i2[0]=v0;
q2=i2.join(":");
}
}else{
q2=v0;
}
B0(c2,q2,31536000000);
}}
var d4='http://yads.zedo.com/ads5/';var d17='http://d3.zedo.com/ads6/';var o16='http://d7.zedo.com/ads6/';var t0=U0('ZEDOIDX',false);var y0=254;var z9="";var c3=0;var ftn=0;var q0='';var a5="";
var z2=0;var i8=0;var v11='';var y7='';var y3='';var v15=0;var v2=new Date();var c11=new Date();var w10='';var w0=navigator.userAgent.toLowerCase();var v5=parseInt(navigator.appVersion);
var e8=((w0.indexOf('msie')!=-1)&&(w0.indexOf('opera')==-1)&&(w0.indexOf('webtv')==-1));var z14=(e8&&(v5>=4));var y6=(w0.indexOf('mac')!=-1);
var p7=((w0.indexOf('mac')!=-1)&&(w0.indexOf('msie 4.')!=-1));var v10=(w0.indexOf('webtv')!=-1);var n12=((w0.indexOf('gecko')!=-1)&&(v5==5));var w7=(w0.indexOf('opera')!=-1);
var zz_exp_publisher=F0('e');var o0=F0('n');var p3=F0('w');var r3=F0('h');var z0=F0('c');var e0=F0('d');var e1=F0('s');var p2=F0('q');var i5=F0('l');var o4=unescape(F0('t'));var r18=F0('y');
var n20=F0('a');var t2="";var n3="";var z13=new Array();var q12=new Array();var o13=new Array();var q18='';var z16=F0('$');var v16=F0('pn');var r15=F0('6');var t15=F0('pa');var n15=F0('pc');
var n14=F0('pr');var y18=F0('ps');var d6="";var y9="";var a21=U2();var zd_$_value=F0('$');var a8=U0('FFpb',false);
zz_exp_publisher=unescape(zz_exp_publisher);
zz_exp_publisher=zz_exp_publisher.replace(/\s/g,"")
zz_exp_publisher=zz_exp_publisher.replace(/'/g,"")
d6=a8.match(eval('/'+o0+':[^\$]*/'));
if(!d6){d6='';}
if(zd_$_value||d6){
if(d6){
d6=d6[0].split(':')[1];
if(d6.match(zd_$_value)){
zd_$_value='';
}}
if(zd_$_value){
zd_$_value=zd_$_value+',';
}
y9=o0+':'+zd_$_value+d6;
y9=y9.replace(/^,+|,+$/g,'');
if(a8){
if(d6){
a8=a8.replace(eval('/'+o0+':[^\$]*/'),y9);
}else{
a8=a8+'$'+y9;
}
}else{
a8=y9;
}
p2=p2+','+zd_$_value+d6;
p2=p2.replace(/^,+|,+$/g,'');
B0('FFpb',a8,a21);
}
var t14=U0('ZFFbh',false);var o21=U0('ZFFAbh',false);var q19=new Date("October 12,1988 13:14:00");
if(t14.length>0){
document.cookie='ZFFbh='+t14+';expires='+q19.toGMTString()+';domain=.zedo.com'+';path=/;';
}
if(o21.length>0){
document.cookie='ZFFAbh='+t14+';expires='+q19.toGMTString()+';domain=.zedo.com'+';path=/;';
}
if(!o0){o0=0;}
if(!p3){p3=0;}
if(!r3){r3=0;}
if((!z0)||(z0<0)||(z0>999999)){z0=0;}
if(!e0){e0=0;}
if(e0<0||e0>95){
e0=0;
}
if(!e1){e1=0;}
if(isNaN(parseInt(t0)))t0=0;
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=e1;var zzPbNId=v16;var zzPbEId=r15;var zzPbAId=t15;var zzPbCId=n15;var zzPbGeoLvl=n14;var zzPbk=z16;
if(typeof zzPbk=='undefined'){
zzPbk=-1;
}
var zzPbSId=y18;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;var zzNw=0;var zzCh=0;
var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
var r0='';var v3='';
if(navigator.userAgent.match(/(Chrome)\/(\d+)\.\d+/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(Android).*(Opera Mobi).*Version\/(\d+)\.\d*/)!=null){
r0="Opera_Mobile_Android";
}
else if(navigator.userAgent.match(/.*(Opera Mobi).*(iPad).*Version\/(\d+)\.\d*/)!=null){
r0="Opera_Mobile_iPad";
}
else if(navigator.userAgent.match(/(Opera Mobi)\/(\d+)\.\d*/)!=null){
r0="Opera_Mobile_All";
}
else if(navigator.userAgent.match(/.*(iPad).*(Opera Mini).*Version\/(\d+)\.\d*/)!=null){
r0="Opera_Mini_iPad";
}
else if(navigator.userAgent.match(/.*(Android).*(Opera Mini).*Version\/(\d+)\.\d*/)!=null){
r0="Opera_Mini_Android";
}
else if(navigator.userAgent.match(/(Opera Mini)\/(\d+)\.\d*/)!=null){
r0="Opera_Mini";
}
else if(navigator.userAgent.match(/.*(Android).*(Opera).*Version\/(\d+)\.\d*/)!=null){
r0="Android_Opera";
}
else if(navigator.userAgent.match(/.*(Opera).*(iPad).*Version\/(\d+)\.\d*/)!=null){
r0="iPad_Opera";
}
else if(navigator.userAgent.match(/(Opera)\/(\d+)\.\d*/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(iPhone).*(Safari)\/(\d+)\.\d*/)!=null){
r0="Safari_iphone";
}
else if(navigator.userAgent.match(/.*(iPad).*(Safari)\/(\d+)\.\d*/)!=null){
r0="Safari_ipad";
}
else if(navigator.userAgent.match(/.*(Android).*Version\/(\d+)\.\d*/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Safari)\/(\d+)\.\d*/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(BlackBerry)[0-9]+\/(\d+)\.\d+/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Navigator)\/(\d+)\.\d*/)!=null){
r0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Firefox)\/(\d+)\.\d*/)!=null){
r0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape6)\/(\d+)\.\d*/)!=null){
r0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape)\/(\d+)\.\d*/)!=null){
r0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
r0=RegExp.$1+"_"+RegExp.$2;
}
if(typeof(zzblist['Others'])=="undefined"){
zzblist['Others']=99;
}
if(typeof r0!="undefined"){
if(typeof(zzblist[r0])=="undefined"){
r0=r0.substring(0,(r0.indexOf('_')+1));
}
if(typeof(zzblist[r0])!="undefined"){
zzBr=zzblist[r0];
}
else{
zzBr=zzblist['Others'];
}}
/*if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
v3=navigator.systemLanguage;
}
else{
v3=navigator.language;
}*/
if(typeof(zzllist['ot'])=="undefined"){
zzllist['ot']=99;
}
v3=zzl;
if((v3.indexOf('zh'))!=0){
v3=v3.substring(0,2);
}
if(typeof(zzllist[v3])!="undefined"){
zzLang=zzllist[v3];
}
else{
zzLang=zzllist['ot'];
}
if(y6&&e8){
var z4=document.createElement("div");
z4.className="zd_src";
z4.id="zd_src";
document.body.appendChild(z4);
}
q12=F9();
o13=F11();
for(var i=0;i<o13.length;i++){
if(o13[i]!=""){
zzDmValues[q12[i]]=o13[i];
zzDmCodes[zzDmCodes.length]=q12[i];
z13[z13.length]=zzDmCodes[zzDmCodes.length-1]+":"+zzDmValues[q12[i]];
}}
if(z13.length!=0){
q18='&dm='+z13;
}
if(o0!=0){
zzNw=o0;
}
if(document.getElementById||document.all){
if(o4){
document.title=o4;
}}
if(p2!=""){
p2=unescape(p2);
var w14=p2.replace(/&/g,'zzazz');
w10='&q='+escape(w14);
p2=';q='+escape(p2);
zzPat=p2;
}
if(i5!=""){
zzTrd=escape(i5);
i5='&l='+escape(i5);
}
zzCustom=escape(F0('p'));
if(zzCustom.length>1)
n3='&p='+zzCustom;
var r8=z0.toString().indexOf('/');
if(r8!=-1){
z2=parseInt(z0.substr(0,r8));
}else{
z2=parseInt(z0);
}
zzCh=z2;
i8=parseInt(o0)+","+parseInt(z2);
z2=parseInt(z2)+(parseInt(o0)* 1000000);
if(t0<=0||t0>31){
if(document.all&&!y6&&!w7){
t0=U1();
}else{
t0=B12();
}}
if(t0<=0||t0>31){
t0=1;
}
t0=((e0<<8)|t0);
n2=i8+","+e0;
o2=B11(n2);
var o15=o2;var t7=U0(n2,false);
if(document.cookie.indexOf('FFcat')==-1&&document.cookie.indexOf('ZCBC')==-1){
t0=t0 | 2;
}
c11.setTime(c11.getTime()+U2());
v2.setUTCHours(v2.getUTCHours()+4);
v2.setUTCMinutes(v2.getUTCMinutes());
v2.setUTCSeconds(v2.getUTCSeconds());
zzSkip=';expires='+v2.toGMTString()+';domain='+document.domain+';path=/;';
zzExp=';expires='+v2.toGMTString()+';domain='+document.domain+';path=/;';
zzStr='i='+o2+';';
if(t7.length>0&&t7!=0){
v11=t7;
var i9=v11.split(',');
if(i9!=null&&i9.length>1){
o2=i9[0];
}}
else{
y7=t7;
if(parseInt(y7)==0){
if((F3())&&(o2==0)){
B0(n2,0,-2592000000);
}}
else{
y3=U0('FFSkp',false);
if(y3.length>0){
if(y3.indexOf(n2+",1:")>=0){
v15=1;
}
if((y3.indexOf(n2+":")>=0)||(y3.indexOf(n2+",1:")>=0)){
if(o2==0){
var d2=new Date("October 12,1988 13:14:00");
document.cookie='FFSkp='+y3+';expires='+d2.toGMTString()+';domain=.'+document.domain+';path=/;';
zzSkip=":"+zzSkip;
}
else{
y7=0;
}}
else{
zzSkip=':'+y3+zzSkip;
}}
else{
zzSkip=":"+zzSkip;
}}}
var zzsrand=Math.random();
if(r18!=''){
zzsrand=r18;
}
if((F0('gc')&&(typeof d20!='undefined')&&(d20=='demographic'))
||(!F0('gc')||isNaN(F0('gc')))){
if(zzGeo==254){
y0=U0('FFgeo',false);
}else{ 
y0=zzGeo; 
}
}else{
y0=F0('gc');
t2="&gc="+y0;
}
if(isNaN(parseInt(y0))){y0=254;t2="&gc="+y0;}
y0=parseInt(y0);
c3=parseInt(U10(y0));
zzCountry=c3;
if(y0>255){
zzState=U9(y0);
if(zzState!=0){
z9=";w="+zzState;
}
zzMetro=F8(y0);
if(zzMetro!=0){
z9+=";m="+zzMetro;
}}
if(document.cookie.match(/ZEDOIDA=([^;]*)/))
zzuid=RegExp.$1;
zzStr=zzStr+'u='+zzuid+';1='+zzBr+';2='+zzLang+';e=i;s='+e1+';g='+c3+z9+p2+';z='+Math.random();
var bl=new Array();var v=new Array();
if(B10(y7,o2)){
if(v15==1){
if(n20==1){
q0='http://d3.zedo.com/ads3/i/'+t0+'/'+y0+'/'+z2+'/b.js';
}}
else if(v15!=1){
q0='http://d3.zedo.com/ads3/i/'+t0+'/'+y0+'/'+z2+'/b.js';
}
}else{
U15('http://d3.zedo.com/ads2/e/'+o0+'/eli.js');
if(c3==172){
q0='http://d14.zedo.com/ads6/'+'d/'+t0+'/'+c3+'/'+o0+'/'+ftn+'/'+z0+'/i.js?z='+B2();
}
else{
q0='http://d3.zedo.com/ads6/'+'d/'+t0+'/'+c3+'/'+o0+'/'+ftn+'/'+z0+'/i.js?z='+B2();
}}
var q20=U0('ZEDOIDA',false);
if(!(q20=="OPT_OUT"&&e0==15)){
if(q0!=''){
if(y6&&e8){
document.getElementById("zd_src").innerHTML='<scr'+'ipt language="JavaScript" src="'+q0+'"></sc'+'ript>';
}else{
document.write('<scr'+'ipt language="JavaScript" src="'+q0+'"></sc'+'ript>');
}}}
if(zzuid!="unknown"){
if(!(zzuid.match(/^[A-Za-z0-9@-~]*$/))){
var d2=new Date('October 12,1988 13:14:00');
document.cookie='ZEDOIDA=-1;expires='+d2.toGMTString()+';domain=.zedo.com;path=/;';
r4.src='http://h.zedo.com/init/'+Math.random()+'/g.gif';
}}