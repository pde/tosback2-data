/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


var DemandBaseToCoreMetrics={CM_SENT_COOKIE_KEY:"cmAlreadySent",coreMetricsData:["marketing_alias","industry","sub_industry","employee_count","annual_sales","street_address","city","state","zip","country","demandbase_sid","primary_sic","VIDEO_RESERVE","VIDEO_RESERVE","VIDEO_RESERVE","ip","registry_area_code","registry_country_code","registry_zip_code","account_watch_fld_1"],init:function(){
if(typeof DemandBaseHandler!=="undefined"){
var d=DemandBaseHandler.getDemandBaseData();
if(d){
DemandBaseToCoreMetrics.sendData(d);
}else{
DemandBaseHandler.addCallback(DemandBaseToCoreMetrics.sendData);
}
}
},sendData:function(_2){
if(typeof DemandBaseHandler!=="undefined"){
var v=DemandBaseHandler.getValueFromLocal(DemandBaseToCoreMetrics.CM_SENT_COOKIE_KEY);
if(!v){
_2.VIDEO_RESERVE="";
var s="";
for(var i=0;i<DemandBaseToCoreMetrics.coreMetricsData.length;i++){
var v=_2[DemandBaseToCoreMetrics.coreMetricsData[i]];
if(typeof v=="string"){
v=v.replace("[_-]"," ");
}
s=s+v;
if(i<DemandBaseToCoreMetrics.coreMetricsData.length-1){
s=s+"-_-";
}
}
if(_2.audience_segment==null){
_2.audience_segment="Unknown";
}
cmCreateElementTag(_2.audience_segment,_2.audience,s);
DemandBaseHandler.putValueToLocal(DemandBaseToCoreMetrics.CM_SENT_COOKIE_KEY,"1");
}
}
}};
DemandBaseToCoreMetrics.init();
