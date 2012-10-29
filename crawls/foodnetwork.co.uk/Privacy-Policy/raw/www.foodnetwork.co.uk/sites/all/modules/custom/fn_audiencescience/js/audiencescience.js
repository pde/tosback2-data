<!-- AUDIENCESCIENCE AD TAG CODE --> 
var rsi_segs = [];
var segs_beg=document.cookie.indexOf('rsi_segs=');
if (segs_beg>=0){
segs_beg=document.cookie.indexOf('=',segs_beg)+1;
if(segs_beg>0){
var segs_end=document.cookie.indexOf(';',segs_beg);
if(segs_end==-1) segs_end=document.cookie.length;
rsi_segs=document.cookie.substring(segs_beg,segs_end).split("|");
}
}
if((rsi_segs == null) || (rsi_segs.length == 0)) {
rsi_segs = "null";
}
<!-- END AUDIENCESCIENCE AD TAG CODE -->