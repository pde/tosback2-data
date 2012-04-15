
var rsi_segs = [];
var segs_beg=document.cookie.indexOf('rsi_segs=');
if (segs_beg>=0){
segs_beg=document.cookie.indexOf('=',segs_beg)+1;
if(segs_beg>0){
var segs_end=document.cookie.indexOf(';',segs_beg);
if(segs_end==-1) segs_end=document.cookie.length;
rsi_segs=document.cookie.substring(segs_beg,segs_end)
.split('|');
}
}

var segLen=20;
var segQS="";
if (rsi_segs.length<segLen){segLen=rsi_segs.length}
for (var i=0;i<segLen;i++){
segQS+=("rsi"+"="+rsi_segs[i]+";")
segQS = segQS.replace (/I09839_/ig,'');
}

