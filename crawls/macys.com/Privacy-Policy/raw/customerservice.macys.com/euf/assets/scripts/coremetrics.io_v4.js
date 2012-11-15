// $Id: io_v4 - 10014415 - 90067660 - 031910.txt 141894 2010-03-19 15:21:20Z abrink $
var _io_request=new IORequest();
var _io_config=undefined;
var _io_zone=undefined;
var _io_state=new IOState();
if(typeof console==="undefined"||typeof console.log==="undefined"||typeof console.group==="undefined"){
var console={log:function(){
},warn:function(){
},error:function(){
},dir:function(){
},group:function(){
},groupEnd:function(){
}};
}
function cm_ted_io(_1){
_io_state.cm_ted_io(_1);
};
function _cm_io_rec(_2){
if(_io_request!==undefined){
_io_request.cm_io_rec(_2);
}
};
function _cm_io_cfg(_3){
if(_io_request!==undefined){
_io_request.cm_io_cfg(_3,1);
}
};
function cmRecRequest(_4,_5,_6,_7,_8){
IORequest.rec_request(_4,_5.toUpperCase(),_6,_7,_8);
};
function cmDisplayRecs(){
IORequest.display_recs();
};
function IORequest(_9){
var _a="io_config.js";
var _b="V4";
this.h_timer=undefined;
this.h_script=undefined;
this.xmlHttp=undefined;
this.i_timeout=0;
this.request_type="";
this.action_callback=function(_c){
return;
};
this.display_status=function(_d,_e){
return;
};
this.display_product_table=function(_f){
return;
};
this.display_product_images=function(_10){
return;
};
this.display_config=function(_11){
return;
};
this.cm_alert=function(_12){
if(!IORequest.production){
alert(_12);
}
};
IOStopWatch=function(){
this.start=function(){
this.elapsed_time=0;
this.t_start=new Date().getTime();
};
this.stop=function(){
this.elapsed_time=new Date().getTime()-this.t_start;
return (this.elapsed_time);
};
};
this.stop_watch=new IOStopWatch("stop_watch");
this.ajax_timeout=function(_13){
if(_io_request.xmlHttp!==undefined){
try{
if(_io_request.xmlHttp.abort!==undefined){
if(typeof _io_request.xmlHttp.abort=="function"){
_io_request.xmlHttp.abort();
}
}
}
catch(e){
_io_request.display_status("IE - no abort property of the xmlHttp request object");
}
}
IORequest.b_timeout=true;
if(_13){
_io_request.action_callback("config_timeout");
IORequest.i_zone=0;
setTimeout("IORequest.config_download_failure(\"ajax timeout\");",0);
}else{
_io_request.display_status("Ajax timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","red");
IORequest.log(IORequest.log_warn,"Ajax timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
_io_request.download_product();
}
};
function _14(){
if(window.XMLHttpRequest){
return new XMLHttpRequest();
}else{
if(window.ActiveXObject){
}else{
return null;
}
}
};
this.javascript_timeout=function(_15){
if(IORequest.h_script!==undefined){
var h=document.getElementsByTagName("head").item(0);
if(h){
h.removeChild(IORequest.h_script);
IORequest.h_script=undefined;
}
}
_io_request.stop_watch.stop();
IORequest.timeout_product[IORequest.request_crc]=1;
if(_15){
_io_request.action_callback("config_timeout");
IORequest.i_zone=0;
setTimeout("IORequest.config_download_failure(\"javascript timeout\");",0);
}else{
_io_request.display_status("JavaScript timeout downloading product ("+_io_request.stop_watch.elapsed_time+"ms)","red");
IORequest.log(IORequest.log_warn,"JavaScript timeout downloading product",_io_request.stop_watch.elapsed_time+" ms");
if((_io_config.file_not_found_pc!==undefined)&&(_io_config.file_not_found_pc>Math.floor(Math.random()*100))){
var id=IORequest.offer_type+IORequest.offer_id+"|"+IORequest.request_crc+"|"+(IORequest.offer_type=="P"?IORequest.plain_text_product_id:(IORequest.offer_type=="S"?IORequest.plain_text_search_id:IORequest.plain_text_cat_id));
cmCreatePageElementTag(_io_config.file_not_found_id,id);
IORequest.log(IORequest.log_trace,"page element tag for file not found",id);
}
_io_request.download_product();
}
};
this.stateChanged=function(){
if(_io_request.xmlHttp.readyState==4){
clearTimeout(_io_request.h_timer);
_io_request.h_timer=undefined;
if(_io_request.xmlHttp.status==200){
var txt=_io_request.xmlHttp.responseText;
eval(txt);
}else{
if(_io_request.xmlHttp.status==404){
_io_request.display_status("Ajax - Requested File not found on server - "+_io_request.xmlHttp.status+". Next step in recommendation plan attempted","blue");
IORequest.log(IORequest.log_warn,"Ajax - Requested File not found on server - "+_io_request.xmlHttp.status,"next step in recommendation plan attempted");
IORequest.b_404=true;
if(_io_request.request_type=="config"){
setTimeout("IORequest.config_download_failure(\"ajax 404\");",0);
}else{
if(_io_request.request_type=="product"){
_io_request.download_product();
}
}
}else{
_io_request.display_status("Ajax - Unexpected status from stateChanged: "+_io_request.xmlHttp.status+".","red");
IORequest.log(IORequest.log_error,"Ajax - Unexpected status from stateChanged",_io_request.xmlHttp.status);
IORequest.b_404=true;
if(_io_request.request_type=="config"){
setTimeout("IORequest.config_download_failure(\"ajax 404\");",0);
}else{
if(_io_request.request_type=="product"){
_io_request.download_product();
}
}
}
}
}else{
}
};
this.get_target_from_plan=function(_16,_17){
if(IORequest.current_step>=_16.rec_steps.length){
return ("_SE_");
}
var _18=_16.rec_steps[IORequest.current_step];
IORequest.log(IORequest.log_trace,"step: "+IORequest.current_step+" offer_id: "+_18.offer_id+" type: "+_18.offer_type+" target",_18.target_id);
if(_18.target_id=="_NR_"){
return ("_NR_");
}
if(_18.target_id=="_DPF_"){
return ("_DPF_");
}
if(_17&&_18.offer_type=="P"){
IORequest.current_step++;
this.display_status("Looking for Category - found Product: "+_18.target_id+". Next step","green");
IORequest.log(IORequest.log_trace,"Looking for Category - found Product: "+_18.target_id,"next step");
return (this.get_target_from_plan(_16,1));
}
if(_18.target_id=="_SP_"){
return (IORequest.primary_id||"_NR_");
}
if(_18.target_id=="_SC_"){
return (IORequest.fallback_id||"_NR_");
}
if(_18.target_id=="_SS_"){
return (IOConfig.crc_specified_search||"_NR_");
}
if(_18.target_id=="_RVP_"||_18.target_id=="_RVC_"||_18.target_id=="_LCP_"||_18.target_id=="_RPP_"||_18.target_id=="_MPC_"){
var rc=_io_state.cm_get_product_from_cookie(_18.target_id);
if(rc===0){
IORequest.current_step++;
this.display_status("No "+_18.target_id+"available. Next step","green");
IORequest.log(IORequest.log_trace,"No "+_18.target_id+" available","next step");
return (this.get_target_from_plan(_16));
}else{
return (rc);
}
}
this.display_status("unrecognized target id: "+_18.target_id+".","red");
IORequest.log(IORequest.log_error,"unrecognized target id",_18.target_id);
return ("_NR_");
};
this.issue_page_element_tag=function(_19){
if(IORequest.perm_cookie_not_supported===false){
var _1a=IORequest.find_cookie(IORequest.ses_cookie);
if(_1a===undefined){
var _1b=new Date().getTime().toString();
_1a=IORequest.set_and_check_cookie(IORequest.ses_cookie,"S"+_1b+"|",true);
if(!_1a){
return;
}
}
if(_1a.indexOf("|"+_19[0]+"|")==-1){
IORequest.log(IORequest.log_trace,"issued page element tag"+this.io_zone.ab_test_id.split(":")[1],this.io_zone.ab_test_id.split(":")[0]);
IORequest.log(IORequest.log_trace,"session cookie",_1a);
IORequest.set_and_check_cookie(IORequest.ses_cookie,_1a+_19[0]+"|",true);
cmCreatePageElementTag(_19[1],_19[0]);
}
}
};
this.download_product=function(){
IORequest.current_step++;
this.io_zone=_io_config.zones[IORequest.zone_id];
if(this.io_zone.ab_test_id!="no ab test"){
this.issue_page_element_tag(this.io_zone.ab_test_id.split(":"));
}
IORequest.log(IORequest.log_trace,"ab test id",this.io_zone.ab_test_id);
if(!this.io_zone.rec_plan){
this.cm_alert("rec_plan not defined - zone_id: "+IORequest.zone_id);
}
var rc=this.get_target_from_plan(this.io_zone.rec_plan,IORequest.b_timeout||IORequest.b_404);
this.action_callback("recommendation_plan");
if(rc=="_DPF_"&&(IORequest.default_product_file!==undefined)){
_io_request.cm_io_rec(IORequest.default_product_file);
return (0);
}
if(rc=="_SE_"||rc=="_NR_"||rc=="_DPF_"){
var _1c="";
if(rc=="_SE_"){
this.display_status("steps exhausted. Calling zone population function "+this.io_zone.zpf+" without recommendations.","blue");
IORequest.log(IORequest.log_trace,"steps exhausted - calling zone population function without recommendations",this.io_zone.zpf);
_1c="Steps exhausted.  No recommendations found";
}else{
this.display_status("calling zone population function "+this.io_zone.zpf+" without recommendations (_NR_)","blue");
IORequest.log(IORequest.log_trace,"calling zone population function without recommendations",this.io_zone.zpf);
_1c="No recommendations found";
}
if(this.io_zone.zpf!==undefined){
if(this.io_zone.ab_test_id!="no ab test"){
this.issue_page_element_tag(this.io_zone.ab_test_id.split(":"));
}
var _1d="[],'"+this.io_zone.name+"','_NR_','','',[],[],'"+_1c+"'";
var zpf=this.io_zone.zpf+"("+_1d+")";
setTimeout(zpf,0);
}
setTimeout("IORequest.stack_manager(\"rc: "+rc+"\");",0);
return (0);
}
var _1e=rc;
this.offer_id=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_id;
this.cgi_version=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_version;
this.offer_type=this.io_zone.rec_plan.rec_steps[IORequest.current_step].offer_type;
if(((this.offer_type=="C")&&IORequest.encrypt_cats)||((this.offer_type=="E")&&IORequest.encrypt_cats)||(this.offer_type=="S")||((this.offer_type=="P")&&IORequest.encrypt_prds)){
this.prod_id_crc=_1e;
}else{
this.prod_id_crc=IORequest.hex32(IORequest.crc32_str(_1e));
}
IORequest.request_crc=this.prod_id_crc;
IORequest.offer_type=this.offer_type;
IORequest.offer_id=this.offer_id;
this.group=this.prod_id_crc.substr(0,2);
var _1f=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
if(cm_ClientID!==undefined){
IORequest.client_id=cm_ClientID;
}
this.url=_1f+IORequest.client_id+"/"+_b+"/"+this.offer_type+this.offer_id+"/"+this.offer_type+this.group+"/"+this.prod_id_crc+".js?V="+this.cgi_version;
this.display_status("retrieving IO file product ID: "+_1e+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO file product "+_1e+" - url",this.url);
this.action_callback("product_request");
if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){
this.xmlHttp=_14();
if(this.xmlHttp===null){
this.cm_alert("Your browser really does not support Ajax!");
return;
}
this.h_timer=setTimeout("_io_request.ajax_timeout(0)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.request_type="product";
this.xmlHttp.onreadystatechange=this.stateChanged;
this.stop_watch.start();
try{
this.xmlHttp.open("GET",this.url,true);
}
catch(e){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
try{
this.xmlHttp.send(null);
}
catch(e1){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
}else{
var _20=(this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id=="_SS_"?IOConfig.sfto:IORequest.timeout[this.i_timeout]);
this.h_timer=setTimeout("_io_request.javascript_timeout(0)",_20);
this.i_timeout=1;
this.stop_watch.start();
try{
var h=document.getElementsByTagName("head").item(0);
IORequest.h_script=document.createElement("script");
IORequest.h_script.setAttribute("language","javascript");
IORequest.h_script.setAttribute("type","text/javascript");
IORequest.h_script.setAttribute("charset","UTF-8");
IORequest.h_script.setAttribute("src",this.url);
h.appendChild(IORequest.h_script);
}
catch(e2){
IORequest.rec_request_abort();
}
}
};
this.download_config=function(){
var _21=((window.location.protocol=="https:"&&IORequest.access_method=="json remote")?IORequest.url_prefix["json remote https"]:IORequest.url_prefix[IORequest.access_method]);
if(cm_ClientID!==undefined){
IORequest.client_id=cm_ClientID;
}
this.url=_21+IORequest.client_id+"/"+_a+"?ts="+(((new Date().getTime())/600000)|0);
this.display_status("retrieving IO Config file: "+_a+" url: "+this.url,"green");
IORequest.log(IORequest.log_trace,"retrieving IO config file "+_a,this.url);
this.action_callback("config_request");
if((IORequest.access_method=="ajax local")||(IORequest.access_method=="ajax remote")){
this.xmlHttp=_14();
if(this.xmlHttp===null){
this.cm_alert("Your browser really does not support Ajax!");
return;
}
this.h_timer=setTimeout("_io_request.ajax_timeout(1)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.request_type="config";
this.xmlHttp.onreadystatechange=this.stateChanged;
this.stop_watch.start();
try{
this.xmlHttp.open("GET",this.url,true);
}
catch(e){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Cross Domain request attempted.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
try{
this.xmlHttp.send(null);
}
catch(e1){
clearTimeout(this.h_timer);
this.display_status("Ajax Error: Host not found.  Ajax not supported.  Try json x-domain.","red");
IORequest.rec_request_abort();
}
}else{
this.h_timer=setTimeout("_io_request.javascript_timeout(1)",IORequest.timeout[this.i_timeout]);
this.i_timeout=1;
this.stop_watch.start();
try{
var h=document.getElementsByTagName("head").item(0);
var js=document.createElement("script");
js.setAttribute("language","javascript");
js.setAttribute("type","text/javascript");
js.setAttribute("src",this.url);
h.appendChild(js);
}
catch(e2){
IORequest.rec_request_abort();
}
}
};
this.cm_io_rec=function(_22){
this.stop_watch.stop();
if(this.h_timer!==undefined){
clearTimeout(this.h_timer);
this.h_timer=undefined;
}
if(this.io_zone.zpf!==undefined){
if(_22!==undefined){
var _23=_22.pd[0][0];
var _24=_22.hd[6];
var _25=_22.hd[2];
if(_25=="S"){
_23=IORequest.raw_search_term.replace(/"/g,"\\\"");
}
if((_24!==undefined)&&(_24.length==8)&&(IORequest.timeout_product[_24])){
IORequest.log(IORequest.log_trace,"Product download attempt following timeout for same file.  Requested file CRC",IORequest.request_crc);
IORequest.timeout_product[_24]=0;
return;
}
this.display_status("Successful download of IO Recommendations for product: "+_23+" <font color=\"black\">("+this.stop_watch.elapsed_time+" ms)</font>.","green");
IORequest.log(IORequest.log_trace,"successful retrieval of IO Recommendations for product "+_23,this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_iuo,"requested version: "+this.cgi_version+" returned version",_22.hd[9]);
IORequest.log(IORequest.log_product_file,"product file",_22);
var _26=[];
var _27=[];
var _28=[];
if(_25=="P"){
if((IOConfig.category_structure=="E")&&(_22.pd[0][2])){
_io_state.cm_ted_io({i_offer:"epr_category",cg:_22.pd[0][2]});
}
if((+IOConfig.brand_personalization[0])!=-1){
var _29=(+IOConfig.brand_personalization[0])+3;
_io_state.cm_ted_io({i_offer:"brand",brn:_22.pd[0][_29]});
}
}
var _2a=[];
var mpc=_io_state.cm_get_product_from_cookie("_MPC_");
for(var _2b=1;_2b<_22.pd.length;_2b++){
_2a[_2b-1]=[];
_2a[_2b-1][0]=_2b;
if((IORequest.optional_parm=="R")&&(_25!="P")){
_2a[_2b-1][1]=Math.floor(Math.random()*1000);
}else{
var _2c=(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_22.pd[_2b][2])):_22.pd[_2b][2]);
_2a[_2b-1][1]=_22.pd[_2b][1]*((_2c==mpc)?_io_config.cp:1);
}
}
_2a.sort(function(a,b){
return (b[1]-a[1]);
});
if((IOConfig.brand_personalization[1]!=-1)){
var mpb=_io_state.cm_get_product_from_cookie("_MPB_");
if(mpb!==0){
for(var _2d=1;_2d<_22.pd.length;_2d++){
_2a[_2d-1]=[];
_2a[_2d-1][0]=_2d;
var _2e=_22.pd[_2d][(+IOConfig.brand_personalization[0])+3];
var _2f=IORequest.hex32(IORequest.crc32_str(_2e));
_2a[_2d-1][1]=_22.pd[_2d][1]*((_2f==mpb)?(+IOConfig.brand_personalization[1]):1);
}
_2a.sort(function(a,b){
return (b[1]-a[1]);
});
}
}
l_attribute_array=_22.pd[0].length;
for(var _30=3;_30<l_attribute_array;_30++){
var _31=((_22.ap!==undefined&&_22.ap[_30-3]!==undefined)?_22.ap[_30-3]:"");
_28.push((_22.pd[0][_30]===undefined)?undefined:_31+_22.pd[0][_30].replace(/"/g,"\\\""));
}
var _32=[];
var _33=[];
if(this.io_zone.filter_cp){
var acp=_io_state.cm_get_product_from_cookie("_ACP_");
for(var _34=0;_34<acp.length;_34++){
if(IORequest.encrypt_prds){
_32[acp[_34]]=1;
}else{
_33[acp[_34]]=1;
}
}
}
if(this.io_zone.filter_pp){
var app=_io_state.cm_get_product_from_cookie("_APP_");
for(var _35=0;_35<app.length;_35++){
if(IORequest.encrypt_prds){
_32[app[_35]]=1;
}else{
_33[app[_35]]=1;
}
}
}
for(var _36=0;_36<_io_config.bad_list.length;_36++){
_32[_io_config.bad_list[_36]]=1;
}
IORequest.reason=[];
var _37=(IORequest.is_undefined(_22.ra)?0:_22.ra.length);
for(var ii=0;((_26.length<this.io_zone.rec_plan.n_recs)&&(ii<_2a.length));ii++){
var _38=_2a[ii][0];
var _39=_22.pd[_38][0];
var _3a=IORequest.hex32(IORequest.crc32_str(_39));
IORequest.reason[_39]=6;
var _3b=_39.replace(/"/g,"\\\"");
var _3c=true;
if((IORequest.filtered_out_products[_39]===undefined)&&(_33[_39]===undefined)&&(_32[_3a]===undefined)&&(IOState.h_productview_product[_39]===undefined)){
var _3d=[];
for(var _3e=3;((_3e<_22.pd[_38].length)&&(_3c===true));_3e++){
if((_37>(_3e-3))&&(_22.ra[_3e-3])&&!(_22.pd[_38][_3e])){
_3c=false;
}else{
var _3f=((!IORequest.is_undefined(_22.ap)&&_22.ap[_3e-3]!==undefined)?_22.ap[_3e-3]:"");
_3d.push((_22.pd[_38][_3e]===undefined)?undefined:_3f+_22.pd[_38][_3e].replace(/"/g,"\\\""));
}
}
if(_3c){
_26.push(_3b);
if(IORequest.conflict_resolution===true){
IORequest.filtered_out_products[_39]=1;
}
_27.push("[\""+_3d.join("\",\"")+"\"]");
}else{
IORequest.log(IORequest.log_trace,_3b+" required attribute not present","not sent to zpf");
IORequest.reason[_39]=1;
}
}else{
if((_33[_39]!==undefined)||(_32[_3a]!==undefined)){
IORequest.log(IORequest.log_trace,_3b+" recently carted, purchased, or in bad product list","not sent to zpf");
IORequest.reason[_39]=2;
}else{
if(IORequest.filtered_out_products[_39]!==undefined){
IORequest.log(IORequest.log_trace,_3b+" appears in previous zone","not sent to zpf");
IORequest.reason[_39]=3;
}else{
if(IOState.h_productview_product[_39]!==undefined){
IORequest.log(IORequest.log_trace,_3b+" appears in the recommendation list but is also a product for which a product view tag was issued for this page","not sent to zpf");
IORequest.reason[_39]=5;
}
}
}
}
}
this.display_product_table(_22,_26);
this.display_product_images(_22,_26);
var _40=[];
_40._SP_="Recommendations from a product you recently viewed";
_40._SC_="Recommendations from a category you recently viewed";
_40._NR_="No Recs";
_40._RVP_="Recommendations from a product you recently viewed";
_40._LCP_="Recommendations from a product you recently added to your cart";
_40._RPP_="Recommendations from a Product you recently purchased";
_40._RVC_="Recommendations from a category you recently viewed";
_40._MPC_="Recommendations from your favorite category";
_40._DPF_="Recommendations from your favorite retail store";
var _41=[];
var _42=_26.length?true:false;
var _43=_42?this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id:"_NR_";
if(!_42){
IORequest.log(IORequest.log_trace,"No recommendations made it through the filters","changing target symbolic from "+this.io_zone.rec_plan.rec_steps[IORequest.current_step].target_id+" to _NR_.");
}
var _44=this.io_zone.rec_plan.rec_steps[IORequest.current_step].heading||_40[_43];
_41.push(_42?"[\""+_26.join("\",\"")+"\"]":"[]");
_41.push("\""+this.io_zone.name+"\"");
_41.push("\""+_43+"\"");
_41.push("\""+_23+"\"");
_41.push("\""+_22.pd[0][2]+"\"");
_41.push("["+_27.join()+"]");
_41.push("[\""+_28.join("\",\"")+"\"]");
_41.push("\""+_44+"\"");
var _45=this.io_zone.zpf+"("+_41.join()+")";
if(this.io_zone.zpf!==undefined){
setTimeout(_45,0);
}
}
setTimeout("IORequest.stack_manager(\"sucessful product retrieval\");",0);
}
};
this.cm_io_cfg=function(_46,_47){
this.stop_watch.stop();
clearTimeout(_io_request.h_timer);
_io_request.h_timer=undefined;
if(_io_config===undefined){
if(_46!==undefined){
this.action_callback(_47?"server_cfg":"default_cfg");
IORequest.log(IORequest.log_trace,"successful retrieval of config file",this.stop_watch.elapsed_time+" ms");
IORequest.log(IORequest.log_config_file,"config file",_46);
if(_46.zp!==undefined){
_io_config=new IOConfig(_46);
this.action_callback("config_return");
}else{
setTimeout("IORequest.config_download_failure(\"corrupt config file\");",0);
}
if(_47){
IORequest.i_zone=0;
setTimeout("IORequest.config_downloaded(\"successful config download\");",0);
}
}
}else{
IORequest.log(IORequest.log_warn,"config request where _io_config already defined","aborting request");
}
};
};
IORequest.crc32_tab=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,*********,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,*********,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,*********,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,*********,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,*********,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918000,2847714899,3736837829,1202900863,*********,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];
IORequest.crc32_add=function(crc,c){
return IORequest.crc32_tab[(crc^c)&255]^((crc>>8)&16777215);
};
IORequest.crc32_str=function(str){
var n;
var len=str.length;
var crc;
crc=4294967295;
for(n=0;n<len;n++){
crc=IORequest.crc32_add(crc,str.charCodeAt(n));
}
return crc^4294967295;
};
IORequest.hex32=function(val){
var n;
var _48;
var _49;
n=val&65535;
_48=n.toString(16).toUpperCase();
while(_48.length<4){
_48="0"+_48;
}
n=(val>>>16)&65535;
_49=n.toString(16).toUpperCase();
while(_49.length<4){
_49="0"+_49;
}
return _49+_48;
};
IORequest.cookie_info=function(_4a,_4b){
var c=document.cookie;
var l=c.length;
var n=c.split(";").length;
IORequest.log(IORequest.log_trace,"cookie_length: "+l+" number of cookies",IORequest.cookie_count(_4a));
IORequest.log(IORequest.log_trace,"cookie",c);
alert("n: "+n+" l: "+l+" cookie: "+c);
if(_4b){
var _4c=_4b-l-3-_4a.length;
var _4d="";
for(var i=0;i<_4c;i++){
_4d+=""+i%10;
}
IORequest.set_and_check_cookie(_4a,_4d);
IORequest.cookie_info(_4a);
}
};
IORequest.cookie_count=function(_4e){
var c=document.cookie;
var n=0;
if(c){
n=c.split(";").length;
}
return n;
};
IORequest.find_cookie=function(_4f){
var _50=document.cookie.split("; ");
var _51=_4f.length;
for(var _52=0;_52<_50.length;_52++){
if((_4f+"=")==_50[_52].substring(0,_51+1)){
return (_50[_52].substring(_51+1));
}
}
return (undefined);
};
IORequest.rm_cookie=function(_53){
document.cookie=_53+"=;path=/;expires="+new Date(1998,0).toGMTString()+";;";
};
IORequest.set_and_check_cookie=function(_54,_55,_56,_57){
document.cookie=_54+"="+_55+";path=/"+(_56?"":";expires="+new Date(2020,0).toGMTString())+(_57?";domain="+_57:"");
_55=IORequest.find_cookie(_54);
if(_55===undefined){
if(!_56){
IORequest.perm_cookie_not_supported=true;
}
}
return (_55);
};
IORequest.build_array_from_cookie=function(_58){
var _59=IORequest.find_state_cookie();
return ((_59===undefined)?undefined:(_59.split(IORequest.cookie_separator))[_58]);
};
IORequest.find_state_cookie=function(){
if(IORequest.vanity_suffix===undefined){
var _5a=document.domain;
if(_5a){
var re=/[^.]+\.[^.]+$/;
IORequest.vanity_suffix="."+_5a.match(re);
}
}
var _5b=IORequest.find_cookie(IORequest.state_cookie);
if(_5b===undefined){
var _5c=((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))?20:30;
if(IORequest.cookie_count()>=_5c){
_5b=undefined;
}else{
var rn=Math.floor(Math.random()*100);
_5b=[rn,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]].join("~")+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator+IORequest.cookie_array_separator;
var _5d=_5b;
_5b=IORequest.set_and_check_cookie(IORequest.state_cookie,_5d,false,IORequest.vanity_suffix);
}
}
return (_5b);
};
IORequest.default_json={"zp":[{"id":"Default_Zone","rp":[["001",0,99,3]]}],"rp":{"001":[["101","_DPF_","0","You might be interested in"]]},"oa":{"101":["4","P"]}};
IORequest.i_zone=1;
IORequest.i_msg=0;
IORequest.rec_stack=[];
IORequest.filtered_out_products=[];
IORequest.b_timeout=false;
IORequest.b_404=false;
IORequest.zone_id=0;
IORequest.primary_id=0;
IORequest.fallback_id=0;
IORequest.raw_search_term="";
IORequest.current_step=-1;
IORequest.timeout_product=[];
IORequest.cookie_separator="~|~";
IORequest.cookie_array_separator="|";
IORequest.ses_cookie="CoreM_Ses";
IORequest.state_cookie="CoreM_State";
IORequest.recently_viewed_product=undefined;
IORequest.recently_viewed_category=undefined;
IORequest.perm_cookie_not_supported=false;
IORequest.access_method="json local";
IORequest.ab_group_number=undefined;
IORequest.log_cookie_write=2<<1;
IORequest.log_config_file=2<<2;
IORequest.log_product_file=2<<3;
IORequest.log_trace=2<<4;
IORequest.log_warn=2<<5;
IORequest.log_error=2<<6;
IORequest.log_iuo=2<<7;
IORequest.production=false;
IORequest.log_mask=IORequest.production?IORequest.log_error:(2<<16)-1;
IORequest.log_mask=IORequest.log_mask&~IORequest.log_iuo;
IORequest.log=function(bit,_5e,_5f){
if(bit==IORequest.log_product_file||bit==IORequest.log_config_file){
console.group();
console.dir(_5f);
console.groupEnd();
}else{
if(bit==IORequest.log_warn){
console.warn(_5e+": ",_5f);
}else{
if(bit==IORequest.log_error){
console.error(_5e+": ",_5f);
}else{
if(IORequest.log_mask&bit){
console.log(_5e+": ",_5f);
}
}
}
}
};
IORequest.ie_version=function(){
return (/MSIE (\d+\.\d+);/.test(navigator.userAgent)?RegExp.$1:null);
};
IORequest.url_prefix=[];
IORequest.url_prefix["ajax local"]="";
IORequest.url_prefix["ajax remote"]="/limelight/";
IORequest.url_prefix["json local"]="";
IORequest.url_prefix["json remote"]="http://coremetric.vo.llnwd.net/o33/";
IORequest.url_prefix["json remote https"]="https://coremetric.hs.llnwd.net/o33/";
IORequest.rec_request=function(_60,_61,_62,_63,_64){
IORequest.plain_text_product_id=_61;
IORequest.plain_text_cat_id=_62;
IORequest.log(IORequest.log_trace,"cmRecRequest",_60+","+_61+","+_62+(_63?","+_63:"")+(_64?","+_64:""));
IORequest.rec_stack.push([_60,(IORequest.encrypt_prds?IORequest.hex32(IORequest.crc32_str(_61)):_61),(IORequest.encrypt_cats?IORequest.hex32(IORequest.crc32_str(_62)):_62),_63,_64]);
};
IORequest.rec_request_abort=function(){
IORequest.rec_stack=[];
IORequest.filtered_out_products=[];
IORequest.log(IORequest.log_trace,"Aborted request","communication exception");
};
IORequest.display_recs=function(){
IORequest.i_msg=0;
IORequest.i_zone=1;
IORequest.filtered_out_products=[];
_io_state.cm_build_all_recent_arrays();
_io_config=undefined;
if(IORequest.chris_dot_html_config){
_io_config=new IOConfig(IORequest.chris_dot_html_config);
IORequest.log(IORequest.log_config_file,"config file",IORequest.chris_dot_html_config);
IORequest.i_zone=0;
IORequest.stack_manager("chris.html");
}else{
_io_request.download_config();
}
};
IORequest.config_downloaded=function(_65){
IORequest.stack_manager(_65);
};
IORequest.config_download_failure=function(_66){
_io_config=new IOConfig(IORequest.default_json);
for(var _67=0;_67<IORequest.rec_stack.length;_67++){
_io_config.add_zone(IORequest.rec_stack[_67][0]);
}
IORequest.stack_manager(_66);
};
IORequest.encode_search_term=function(_68){
_68=_68.toUpperCase();
if(IOConfig.stpr){
for(var _69=0;_69<IOConfig.stpr.length;_69++){
var _6a=IOConfig.stpr[_69];
_6a=_6a.toUpperCase();
if(_68.substring(0,_6a.length)==_6a){
_68=_68.substr(_6a.length);
}
}
}
_68=_68.replace(/[$'&`~@:\[\]\\!%^*()={}\| <>"]/g,"");
return (_68);
};
IORequest.stack_manager=function(_6b){
if(IORequest.rec_stack.length){
var _6c=IORequest.rec_stack.shift();
IORequest.i_zone++;
IORequest.i_msg=0;
IORequest.zone_id=_6c[0];
IORequest.primary_id=_6c[1];
IORequest.fallback_id=_6c[2];
IORequest.optional_parm=(_6c.length>3?_6c[3]:"");
IORequest.raw_search_term=(_6c.length>4?_6c[4]:"");
if(IORequest.raw_search_term){
IORequest.log(IORequest.log_trace,"Search Term pre Osentoski",IORequest.raw_search_term);
var _6d=IORequest.encode_search_term(IORequest.raw_search_term);
IORequest.log(IORequest.log_trace,"Search Term aft Osentoski",_6d);
IORequest.plain_text_search_id=_6d;
IOConfig.crc_specified_search=IORequest.hex32(IORequest.crc32_str(_6d));
_6c[4]=IOConfig.crc_specified_search;
}
IORequest.current_step=-1;
IORequest.b_timeout=false;
IORequest.b_404=false;
if(_io_config.zones[IORequest.zone_id]===undefined){
IORequest.log(IORequest.log_error,"cmRecRequest: zone "+IORequest.zone_id+" is not defined in the configuration file","no action taken");
IORequest.stack_manager("zone: "+IORequest.zone_id+" is not defined in the configuration file");
}else{
_io_request.display_status("stack_manager called - "+_6b+" - parms: "+_6c.join(", "),"green");
IORequest.log(IORequest.log_trace,"stack_manager called - "+_6b+" - parms",_6c.join(", "));
_io_request.download_product();
}
}else{
if(IORequest.i_zone==3){
IORequest.i_zone=2;
}
_io_request.display_status("All cmRecRequests completed","green");
IORequest.log(IORequest.log_trace,"All cmRecRequests completed for zone",IORequest.zone_id);
IORequest.i_zone=1;
IORequest.i_msg=0;
}
};
IORequest.is_undefined=function(x){
var y;
return (x===y);
};
IORequest.inspect_json=function(obj,_6e,_6f){
var str="",_70,msg;
if(_6f===null||_6f===undefined){
_6f=0;
}
if(_6e===null||_6e===undefined){
_6e=1;
}
if(_6e<1){
return "<font color=\"red\">Error: Levels number must be > 0</font>";
}
if(obj===null||obj===undefined){
return "<font color=\"red\">Error: Object <b>NULL</b></font>";
}
str+="<ul>";
var _71;
for(_71 in obj){
if(true){
try{
_70=typeof (obj[_71]);
str+="<li>("+_70+") "+_71+((obj[_71]===null)?(": <b>null</b>"):(":  <font color=\"red\">"+obj[_71]+"</font>"))+"</li>";
if((_70=="object")&&(obj[_71]!==null)&&(_6f+1<_6e)){
str+=IORequest.inspect_json(obj[_71],_6e,_6f+1);
}
}
catch(err){
if(typeof (err)=="string"){
msg=err;
}else{
if(err.message){
msg=err.message;
}else{
if(err.description){
msg=err.description;
}else{
msg="Unknown";
}
}
}
str+="<li><font color=\"red\">(Error) "+_71+": "+msg+"</font></li>";
}
}
}
str+="</ul>";
return str;
};
IOConfig.version=-1;
IOConfig.brand_personalization=[-1,-1];
IOConfig.category_structure=-1;
IOConfig.stpr=[];
IOConfig.crc_specified_search="";
function IOConfig(_72){
var _73=false;
this.io=_72;
if(((IORequest.ie_version()!==null)&&(IORequest.ie_version()<7))){
if(this.io.cie6b!==undefined){
for(var ii=0;ii<IORequest.a_max_elements.length;ii++){
if(this.io.cie6b[ii]!=IORequest.a_max_elements[ii]){
IORequest.a_max_elements[ii]=this.io.cie6b[ii];
_73=true;
}
}
}
}else{
if(this.io.cdfltb!==undefined){
for(var _74=0;_74<IORequest.a_max_elements.length;_74++){
if(this.io.cdfltb[_74]!=IORequest.a_max_elements[_74]){
IORequest.a_max_elements[_74]=this.io.cdfltb[_74];
_73=true;
}
}
}
}
if(this.io.cs===undefined){
if(IOConfig.category_structure==-1){
IOConfig.category_structure="S";
}
}else{
var _75=(this.io.cs!=="EPR");
var _76=(IOConfig.category_structure!=="E");
if(_75!==_76){
_73=true;
IOConfig.category_structure=(this.io.cs=="EPR"?"E":"S");
}
}
if(this.io.cv!==undefined){
if(IOConfig.version!==this.io.cv){
_73=true;
IOConfig.version=this.io.cv;
}
}
if(this.io.bp!==undefined){
if(IOConfig.brand_personalization[0]!=this.io.bp[0]){
IOConfig.brand_personalization[0]=this.io.bp[0];
_73=true;
}
if(IOConfig.brand_personalization[1]!=this.io.bp[1]){
IOConfig.brand_personalization[1]=this.io.bp[1];
_73=true;
}
}
if(_73&&(IORequest.ab_group_number!==undefined)){
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
_io_state.cm_write_cookies(cfg);
_73=0;
}
IOConfig.stpr=this.io.stpr||[];
IOConfig.sfto=this.io.sfto||1500;
this.fcpl=this.io.fcpl===undefined?"N":this.io.fcpl.toUpperCase();
this.cp=this.io.cp||1.1;
if(this.io.pfto!==undefined){
IORequest.timeout[1]=this.io.pfto;
}
if(this.io.fnf!==undefined){
this.file_not_found_id=this.io.fnf[0];
this.file_not_found_pc=this.io.fnf[1];
}
this.bad_list=this.io.bl||[];
this.ps=this.io.ps===undefined?1:this.io.ps;
this.zones=[];
this.n_zones=this.io.zp.length;
this.rec_plan=[];
for(var _77=0;_77<this.n_zones;_77++){
this.zones[this.io.zp[_77].id]=new IOZone(this.io.zp[_77],this.rec_plan,this.io.rp,this.io.oa);
}
this.add_zone=function(_78){
var _79={"id":_78,"rp":[["001",0,99,3]]};
this.zones[_78]=new IOZone(_79,this.rec_plan,this.io.rp,this.io.oa);
};
};
function IOZone(_7a,_7b,_7c,_7d){
var _7e=undefined;
this.name=_7a.id;
var _7f=this.name+"_zp";
if((window[_7f]!==undefined)&&(typeof window[_7f]=="function")){
this.zpf=_7f;
}else{
if((window.io_rec_zp!==undefined)&&(typeof window.io_rec_zp=="function")){
this.zpf="io_rec_zp";
}else{
this.zpf=undefined;
}
}
this.filter_pp=(((_7a.fp!==undefined)&&(_7a.fp===0))?0:1);
this.filter_cp=(((_7a.fc!==undefined)&&(_7a.fc===0))?0:1);
if(_7a.rp.length==1){
if(_7b[_7a.rp[0][0]]===undefined){
_7b[_7a.rp[0][0]]=new IORecPlan(_7a.rp[0][0],_7c,_7d,_7a.rp[0][3]);
}
this.rec_plan=_7b[_7a.rp[0][0]];
this.ab_test_id="no ab test";
}else{
var rn=IORequest.ab_group_number;
this.rn=(rn===undefined)?0:rn;
for(var _80=0;((_80<_7a.rp.length)&&(this.rec_plan===undefined));_80++){
if(this.rn>=_7a.rp[_80][1]&&this.rn<=_7a.rp[_80][2]){
if(_7b[_7a.rp[_80][0]]===undefined){
_7b[_7a.rp[_80][0]]=new IORecPlan(_7a.rp[_80][0],_7c,_7d,_7a.rp[_80][3]);
}
this.rec_plan=_7b[_7a.rp[_80][0]];
this.ab_test_id=((_7a.rp[_80][4]!==undefined)?_7a.rp[_80][4]:"no ab test");
}
}
}
};
function IORecStep(_81,_82){
this.offer_id=_81[0];
this.target_id=_81[1];
this.offer_type=this.offer_id?_82[this.offer_id][1]:"N";
this.offer_version=this.offer_id?_82[this.offer_id][0]:0;
this.heading=(_81[3]!==undefined)?_81[3]:"";
this.to_string=function(){
return ("offer_id: "+this.offer_id+" target_id: "+this.target_id+" offer_type: "+this.offer_type+" offer_version: "+this.offer_version);
};
};
function IORecPlan(_83,_84,_85,_86){
this.rec_steps=[];
this.id=_83;
this.n_recs=_86;
for(var _87=0;_87<_84[_83].length;_87++){
this.rec_steps.push(new IORecStep(_84[_83][_87],_85));
}
};
IOState.h_productview_product=[];
IOState.productview_product="";
IOState.productview_category="";
function IOState(){
var _88=document;
var _89="undefined";
var _8a=(IORequest.production?"~":"~");
var _8b=":";
var _8c=[];
var _8d=[];
var _8e=[];
var _8f=[];
var _90=[];
var _91=[];
var _92=[];
var _93=[];
var _94=[];
var _95=-1;
var _96=["p_viewed","p_carted","p_purchased","c_viewed","c_n_views","b_viewed","b_n_views"];
var _97=["pv","pc","pp","cv","cn","bv","bn"];
var _98=_96;
var _99=false;
var _9a=[];
if(IORequest.basket_pages!==undefined){
for(var _9b=0;_9b<IORequest.basket_pages.length;_9b++){
_9a[IORequest.basket_pages[_9b]]=1;
}
}
this.cm_get_product_from_cookie=function(_9c){
if(_8c.length!==0||(this.cm_build_all_recent_arrays()===true)){
if(_9c=="_RVP_"){
return (IORequest.recently_viewed_product);
}
if(_9c=="_RVC_"){
return (IORequest.recently_viewed_category);
}
if(_9c=="_LCP_"){
return (_91[0]||0);
}
if(_9c=="_RPP_"){
return (_92[0]||0);
}
if(_9c=="_MPC_"){
var _9d=0;
for(var _9e=1;_9e<_93.length;_9e++){
if(parseInt(_8e[_93[_9e]].n_viewed,10)>parseInt(_8e[_93[_9d]].n_viewed,10)){
_9d=_9e;
}
}
return (_93[_9d]||0);
}
if(_9c=="_MPB_"){
var _9f=0;
for(var _a0=1;_a0<_94.length;_a0++){
if(parseInt(_8f[_94[_a0]].n_viewed,10)>parseInt(_8f[_94[_9f]].n_viewed,10)){
_9f=_a0;
}
}
return (_94[_9f]||0);
}
if(_9c=="_DFTP_"){
return (IORequest.default_prd);
}
if(_9c=="_DFTC_"){
return (IORequest.default_cat);
}
if(_9c=="_APP_"){
return (_92);
}
if(_9c=="_ACP_"){
return (_91);
}
}
return (0);
};
cm_initialize_id=function(p_h,id){
p_h[id]=[];
p_h[id].index=-1;
p_h[id].n_bought=0;
p_h[id].n_viewed=0;
p_h[id].n_carted=0;
};
cm_build_hash_from_array=function(p_a){
var h=[];
h.max_index=0;
for(var ii=0;ii<p_a.length;ii++){
cm_initialize_id(h,p_a[ii]);
}
return h;
};
cm_id_array_from_index_array=function(_a1,_a2,_a3,_a4,_a5,_a6){
var _a7=[];
_a7.max_length=_a2;
if(_a1){
var _a8=_a1.split("~");
if(_a8.length==1){
_a8=_a1.split(",");
}
for(var ii=0;ii<_a8.length;ii++){
var _a9=_a3[_a8[ii]];
_a7.push(_a9);
if(_a5!==undefined){
var _aa=_a5.split("~");
if(_aa.length==1){
_aa=_a5.split(",");
}
if((!(_a4===undefined))&&(_aa.length>0)){
_a4[_a9][_a6]=_aa[ii];
}
}
}
if(_a7.length>_a7.max_length){
_a7.length=_a7.max_length;
}
}
return _a7;
};
cm_create_integer_array_from_id_array=function(_ab,p_h,_ac){
var _ad=[];
for(var ii=0;ii<_ab.length;ii++){
var id=_ab[ii];
if(p_h[id].index==-1){
p_h[id].index=p_h.max_index++;
}
_ad.push(p_h[id][_ac]);
}
return _ad;
};
cm_create_id_array_from_hash=function(p_h){
var _ae=[];
for(var id in p_h){
if(typeof id!="function"){
_ae[p_h[id].index]=id;
}
}
return _ae;
};
cm_add_action=function(_af,p_h,_b0,_b1,_b2){
var _b3;
var _b4=_af;
if(_b0){
_b4=IORequest.hex32(IORequest.crc32_str(_af));
IORequest.log(IORequest.log_trace,"crc of "+_af,_b4);
}
if(_b4!==undefined){
_b3=[_b4];
_b3.max_length=_b1.max_length;
if(p_h[_b4]===undefined){
cm_initialize_id(p_h,_b4);
}
if(_b2!==undefined){
p_h[_b4][_b2]++;
}
for(var ii=0;ii<_b1.length;ii++){
if(_b1[ii]!=_b4){
_b3.push(_b1[ii]);
}
}
if(_b3.length>_b3.max_length){
_b3.length=_b3.max_length;
}
}else{
_b3=_b1;
}
return (_b3);
};
cm_remove_element_from_array=function(p_a,_b5,_b6){
var _b7=[];
if(_b6){
_b5=IORequest.hex32(IORequest.crc32_str(_b5));
}
for(var ii=0;ii<p_a.length;ii++){
if(!(_b5==p_a[ii])){
_b7.push(p_a[ii]);
}
}
return _b7;
};
this.cm_write_cookies=function(_b8){
var _b9=[cm_create_integer_array_from_id_array(_90,_8d,"index").join("~"),cm_create_integer_array_from_id_array(_91,_8d,"index").join("~"),cm_create_integer_array_from_id_array(_92,_8d,"index").join("~"),cm_create_integer_array_from_id_array(_93,_8e,"index").join("~"),cm_create_integer_array_from_id_array(_93,_8e,"n_viewed").join("~"),cm_create_integer_array_from_id_array(_94,_8f,"index").join("~"),cm_create_integer_array_from_id_array(_94,_8f,"n_viewed").join("~")];
if(_99){
for(var jj=0;jj<_98.length;jj++){
_b9[jj]=_98[jj]+_8b+_b9[jj];
}
}
var cfg=_b8.join("~");
var prd=cm_create_id_array_from_hash(_8d).join(_8a);
var cat=cm_create_id_array_from_hash(_8e).join(_8a);
var brn=cm_create_id_array_from_hash(_8f).join(_8a);
var cnt=_b9.join(IORequest.cookie_array_separator);
var _ba=[cfg,prd,cat,brn,cnt].join(IORequest.cookie_separator);
var rc=IORequest.set_and_check_cookie(IORequest.state_cookie,_ba,false,IORequest.vanity_suffix);
IORequest.log(IORequest.log_cookie_write,"write "+IORequest.state_cookie,IORequest.is_undefined(rc)?"permanent cookies disabled":_ba);
return (rc);
};
this.cm_build_all_recent_arrays=function(){
var _bb=[];
var _bc=[];
var _bd=[];
var _be=IORequest.find_state_cookie(IORequest.state_cookie);
if(_be!==undefined){
var _bf=(_be===undefined)?4:(_be.split(IORequest.cookie_separator).length-1);
_8c=IORequest.build_array_from_cookie(0).split(",");
if(_8c.length>0){
IORequest.ab_group_number=_8c[0];
if(IORequest.ab_group_number.length>3){
_8c=IORequest.build_array_from_cookie(0).split("~");
IORequest.ab_group_number=_8c[0];
}
if(_8c.length>1){
IOConfig.version=_8c[1];
IOConfig.brand_personalization[0]=_8c[2];
IOConfig.brand_personalization[1]=_8c[3];
IOConfig.category_structure=_8c[4];
IORequest.a_max_elements[0]=_8c[5];
IORequest.a_max_elements[1]=_8c[6];
IORequest.a_max_elements[2]=_8c[7];
IORequest.a_max_elements[3]=_8c[8];
IORequest.a_max_elements[4]=_8c[9];
IORequest.a_max_elements[5]=_8c[10];
IORequest.a_max_elements[6]=_8c[11];
}
}
_bb=IORequest.build_array_from_cookie(1).split(_8a);
_8d=cm_build_hash_from_array(_bb);
_bc=IORequest.build_array_from_cookie(2).split(_8a);
_8e=cm_build_hash_from_array(_bc);
if(_bf>3){
_bd=IORequest.build_array_from_cookie(3).split(_8a);
_8f=cm_build_hash_from_array(_bd);
}
var _c0=IORequest.build_array_from_cookie(_bf).split(IORequest.cookie_array_separator);
if(_99&&(g_b_a_arrays[0].substring(0,2)==_98[0].substring(0,2))){
for(var ii=0;ii<_c0.length;ii++){
_c0[ii]=_c0[ii].substring(_98[ii].length+1);
}
}
_90=cm_id_array_from_index_array(_c0[0],IORequest.a_max_elements[0],_bb);
_91=cm_id_array_from_index_array(_c0[1],IORequest.a_max_elements[1],_bb);
_92=cm_id_array_from_index_array(_c0[2],IORequest.a_max_elements[2],_bb);
_93=cm_id_array_from_index_array(_c0[3],IORequest.a_max_elements[3],_bc,_8e,_c0[4],"n_viewed");
if(_bf>3){
_94=cm_id_array_from_index_array(_c0[5],IORequest.a_max_elements[5],_bd,_8f,_c0[6],"n_viewed");
}
if(IORequest.recently_viewed_product===undefined){
IORequest.recently_viewed_product=(_90.length===0?0:_90[0]);
}
if(IORequest.recently_viewed_category===undefined){
IORequest.recently_viewed_category=(_93.length===0?0:_93[0]);
}
if(_8c.length==1){
IORequest.rm_cookie(IORequest.state_cookie);
var cfg=[IORequest.ab_group_number,IOConfig.version,IOConfig.brand_personalization[0],IOConfig.brand_personalization[1],IOConfig.category_structure,IORequest.a_max_elements[0],IORequest.a_max_elements[1],IORequest.a_max_elements[2],IORequest.a_max_elements[3],IORequest.a_max_elements[4],IORequest.a_max_elements[5],IORequest.a_max_elements[6]];
this.cm_write_cookies(cfg);
}
return (true);
}else{
return (false);
}
};
cm_build_html_table_from_array=function(_c1,_c2,p_h,_c3){
var _c4=(_c3?2:1);
var _c5=_c2.length;
var _c6="";
var _c7=(_c4==1?"<TD COLSPAN=2>":"<TD>");
if(_c5>0&&(_c2[0]!==undefined)){
_c6="<TR><TH ROWSPAN="+_c5+">"+_c1+"</TH>"+_c7+(_c4==2?p_h[_c2[0]][_c3]+"</TD><TD>":"")+_c2[0]+"</TD></TR>";
for(var ii=1;ii<_c5;ii++){
_c6+="<TR>"+_c7+(_c4==2?p_h[_c2[ii]][_c3]+"</TD><TD>":"")+_c2[ii]+"</TD></TR>";
}
}else{
_c6="<TR><TH ROWSPAN=1>"+_c1+"</TH>"+"<TD COLSPAN=2>"+"No "+_c1+"</TD></TR>";
}
return (_c6);
};
cm_get_products_in_cart=function(){
if(this.cm_build_all_recent_arrays()===true){
return (_91);
}else{
return ([]);
}
};
this.cm_format_cookie_arrays=function(_c8){
return ("<H3>Obsolete</H3>");
};
this.cm_ted_io=function(_c9){
var _ca=false;
if(this.cm_build_all_recent_arrays()===true){
if(_c9.i_offer!==undefined){
if(_c9.i_offer=="epr_category"){
if(_io_config.fcpl=="Y"){
_c9.cg=_c9.cg.replace(/>.*$/,"");
_c9.cg=_c9.cg.replace(/\s+$/,"");
}
if(_c9.cg.length<=IORequest.max_cat_length){
_93=cm_add_action(_c9.cg,_8e,IORequest.encrypt_cats,_93,"n_viewed");
_ca=true;
}
}
if(_c9.i_offer=="brand"){
IORequest.log(IORequest.log_trace,"adding "+_c9.brn,"g_a_brn_viewed array");
_94=cm_add_action(_c9.brn,_8f,1,_94,"n_viewed");
_ca=true;
}
}else{
if(_c9.tid==1||_c9.tid==6||_c9.tid==5){
IORequest.log(IORequest.log_cookie_write,"initial "+IORequest.state_cookie,IORequest.find_state_cookie());
}
if(5==_c9.tid){
var _cb=""+_c9.pr.toUpperCase();
var _cc=""+_c9.cg;
if(_cb.length<=IORequest.max_prd_length){
_90=cm_add_action(_cb,_8d,IORequest.encrypt_prds,_90);
_ca=true;
}
if((IOConfig.category_structure=="S")&&(_cc.length<=IORequest.max_cat_length)){
_93=cm_add_action(_cc,_8e,IORequest.encrypt_cats,_93,"n_viewed");
_ca=true;
}
IOState.b_product_view=true;
IOState.h_productview_product[_cb]=1;
IOState.productview_product=_cb;
IOState.productview_category=_cc;
}
if((4==_c9.tid)&&(5==_c9.at)&&(_c9.pr.length<=IORequest.max_prd_length)){
_91=cm_add_action(_c9.pr.toUpperCase(),_8d,IORequest.encrypt_prds,_91);
_ca=true;
}
if(4==_c9.tid&&9==_c9.at){
if(_c9.pr.length<=IORequest.max_prd_length){
_92=cm_add_action(_c9.pr.toUpperCase(),_8d,IORequest.encrypt_prds,_92);
_ca=true;
}
}
}
if(_ca){
this.cm_write_cookies(_8c);
}
}
};
};