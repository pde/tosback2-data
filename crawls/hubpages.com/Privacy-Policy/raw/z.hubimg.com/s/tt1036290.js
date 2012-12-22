var hubpagesSiteTracking={gotAHit:function(_1,id,_2){
var _3;
var _4;
if(window.XMLHttpRequest){
_3=new XMLHttpRequest();
}else{
if(window.ActiveXObject){
_3=new ActiveXObject("Microsoft.XMLHTTP");
}else{
return;
}
}
_3.onreadystatechange=function(){
if(_3.readyState==4){
if(_3.status==200){
if(_4!=undefined&&_4.cb!=undefined){
_4.cb(_3.responseXML);
}
}
}
};
var _5="/c/"+_1+id+".gif"+_2;
var _6=(_2.length>0&&_2.charAt(0)=="?")?"&":"?";
if(arguments.length>=4&&(relatedHubStats.articleid==-1||relatedHubStats.relatedhubstrackingenabled)){
_4=arguments[3];
var _7="";
var i;
for(i=0;i<arguments[3].td.length;++i){
_7+="&t"+i+"="+escape(arguments[3].td[i]);
}
_5+=_6+"tid="+arguments[3].tid+"&tm="+arguments[3].tm+_7;
}
_3.open("GET",_5,true);
_3.send(null);
}};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,trackedclass:null,clickoptions:null,impoptions:null,trackingtype:"n",monthviews:0,initEventHandlers:function(){
jq(""+this.trackedclass).click(function(_8){
return (relatedHubStats.recordRelatedHubClick(_8));
});
},recordRelatedHubClick:function(_9){
if(!this.relatedhubstrackingenabled&&this.monthviews>=1000){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _a=_9.target;
var i=0;
while(jq(_a).attr("href")==undefined){
var _b=jq(_a).parent();
if(_b!=undefined){
_a=_b;
}
++i;
if(i>4){
break;
}
}
if(jq(_a).attr("href")==undefined){
return (true);
}
var _c=jq(_a).attr("rel");
var _d=_c.indexOf("_");
var _e=_c.lastIndexOf("_");
var _f=_c.substring(_e+1);
var _10=_c.substring(_d+1,_e);
var aid=this.articleid;
this.clickoptions.td[0]=_10;
this.clickoptions.td[1]=_f;
this.clickoptions.td[2]=(this.relatedhubstrackingenabled)?1:0;
this.clickoptions.cb=function(_11){
jq(_a).trigger("click");
};
this.relatedhubstrackingenabled=true;
hubpagesSiteTracking.gotAHit(this.trackingtype,aid,"?rf=none",this.clickoptions);
this.ifired=true;
this.ifiredtarget=_a;
return (false);
},commitImpressions:function(){
if(!this.relatedhubstrackingenabled||this.impoptions==null){
return (false);
}
var _12=JSONstring.make(this.relatedhubs,false);
var aid=this.articleid;
var i;
var _13=this.trackingtype;
for(i=0;i<this.relatedhubs.length;++i){
this.impoptions.td[this.relatedhubs[i].rank-1001]=this.relatedhubs[i].raid;
}
var _14=this.impoptions;
jq(document).ready(function(){
setTimeout(function(){
hubpagesSiteTracking.gotAHit(_13,aid,"?rf=none",_14);
},3000);
});
},recordImpression:function(aid,_15,_16){
if(!this.relatedhubstrackingenabled){
return (false);
}
_15+=1000;
this.relatedhubs[this.relatedhubs.length]={aid:aid,rank:_15,raid:_16};
return (true);
},armRelatedHubEvents:function(_17,aid,_18){
this.monthviews=_18;
if(aid==2169847||Math.random()>_17){
this.relatedhubstrackingenabled=true;
}
this.articleid=aid;
}};
if(typeof (hpstdata)!="undefined"){
var h=hpstdata,s=hubpagesSiteTracking;
if(typeof (h.extradata)=="object"){
s.gotAHit(h.hp_tracking_type,h.hp_tracking_id,h.tracking,h.extradata);
}else{
s.gotAHit(h.hp_tracking_type,h.hp_tracking_id,h.tracking);
}
relatedHubStats.armRelatedHubEvents(h.tratio,h.aid,h.mviews);
}

