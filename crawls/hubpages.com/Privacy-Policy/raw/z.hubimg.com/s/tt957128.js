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
if(arguments.length>=4&&(relatedHubStats.articleid==-1||relatedHubStats.relatedhubstrackingenabled)){
_4=arguments[3];
var _6="";
var i;
for(i=0;i<arguments[3].td.length;++i){
_6+="&t"+i+"="+escape(arguments[3].td[i]);
}
_5+="&tid="+arguments[3].tid+"&tm="+arguments[3].tm+_6;
}
_3.open("GET",_5,true);
_3.send(null);
}};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,trackedclass:null,clickoptions:null,impoptions:null,trackingtype:"n",monthviews:0,initEventHandlers:function(){
jq(""+this.trackedclass).click(function(_7){
return (relatedHubStats.recordRelatedHubClick(_7));
});
},recordRelatedHubClick:function(_8){
if(!this.relatedhubstrackingenabled&&this.monthviews>=1000){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _9=_8.target;
var i=0;
while(jq(_9).attr("href")==undefined){
var _a=jq(_9).parent();
if(_a!=undefined){
_9=_a;
}
++i;
if(i>4){
break;
}
}
if(jq(_9).attr("href")==undefined){
return (true);
}
var _b=jq(_9).attr("rel");
var _c=_b.indexOf("_");
var _d=_b.lastIndexOf("_");
var _e=_b.substring(_d+1);
var _f=_b.substring(_c+1,_d);
var aid=this.articleid;
this.clickoptions.td[0]=_f;
this.clickoptions.td[1]=_e;
this.clickoptions.td[2]=(this.relatedhubstrackingenabled)?1:0;
this.clickoptions.cb=function(_10){
jq(_9).trigger("click");
};
this.relatedhubstrackingenabled=true;
hubpagesSiteTracking.gotAHit(this.trackingtype,aid,"?rf=none",this.clickoptions);
this.ifired=true;
this.ifiredtarget=_9;
return (false);
},commitImpressions:function(){
if(!this.relatedhubstrackingenabled||this.impoptions==null){
return (false);
}
var _11=JSONstring.make(this.relatedhubs,false);
var aid=this.articleid;
var i;
var _12=this.trackingtype;
for(i=0;i<this.relatedhubs.length;++i){
this.impoptions.td[this.relatedhubs[i].rank-1001]=this.relatedhubs[i].raid;
}
var _13=this.impoptions;
jq(document).ready(function(){
setTimeout(function(){
hubpagesSiteTracking.gotAHit(_12,aid,"?rf=none",_13);
},3000);
});
},recordImpression:function(aid,_14,_15){
if(!this.relatedhubstrackingenabled){
return (false);
}
_14+=1000;
this.relatedhubs[this.relatedhubs.length]={aid:aid,rank:_14,raid:_15};
return (true);
},armRelatedHubEvents:function(_16,aid,_17){
this.monthviews=_17;
if(aid==2169847||Math.random()>_16){
this.relatedhubstrackingenabled=true;
}
this.articleid=aid;
}};

