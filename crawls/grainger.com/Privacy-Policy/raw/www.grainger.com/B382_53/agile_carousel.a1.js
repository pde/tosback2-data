/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


(function($){
$.fn.agile_carousel=function(_2){
var _3={timer:0,continuous_scrolling:false,transition_type:"slide",transition_time:600,number_slides_visible:1,change_on_hover:"",control_set_1:"",control_set_2:"",control_set_3:"",control_set_4:"",control_set_5:"",carousel_outer_height:"",carousel_height:"",slide_height:""};
_2=$.extend(_3,_2);
return this.each(function(){
var _4=0;
var _5=0;
var _6="";
var _7="";
var _8="";
var _9="";
var _a="";
var _b="";
var _c="";
var _d="";
var _e="";
var _f="";
var _10="";
var _11="";
var _12="";
var _13="ac_click";
var bd="";
var _15="";
var _16="";
var _17="";
var _18="";
var _19="";
var _1a="";
var _1b=false;
var _1c="";
var _1d="";
var _1e="";
var _1f="";
var _20=_2.continuous_scrolling;
var _21=_2.carousel_outer_width;
var _22=_2.carousel_outer_height;
var _23=_2.carousel_data;
var _24=_2.change_on_hover;
var _25=_2.slide_width;
var _26=_2.slide_height;
var _27=_2.control_set_1;
var _28=_2.control_set_2;
var _29=_2.control_set_3;
var _2a=_2.control_set_4;
var _2b=_2.control_set_5;
var _2c=_2.no_control_set;
var _2d=_2.persistent_content;
var _2e=_2.number_slides_visible;
var _2f=_2.transition_type;
var _30=_2.transition_time;
var _31=_2.timer;
var _32="";
var _33="";
var _34="";
var _35="";
var _36="";
var _37="";
$.each(_23,function(key,_39){
_5++;
});
var _3a=_5%_2e;
var _3b=[];
var _3c="";
function _3d(_3e){
if(_24!==""){
_13="ac_click";
var _3f=_24.split(",");
if($.inArray(_3e,_3f)!=-1){
_13="ac_hover";
}
}
return _13;
};
var j=0;
var i=0;
for(i=0;i<_5;i++){
if(i===0){
_9+="<div class='group_numbered_buttons_container button_container'>";
}
var _42=Math.floor((i+1)/_2e)*_2e+1;
if(_42!==_3c){
_3b[j]=_42;
_9+="<div class='slide_number_"+_42+" group_numbered_button slide_button "+_3d("group_numbered_buttons")+"' data-options='{\"button_type\":\"group_numbered_button\",\"button_action\":\"direct\",\"go_to\":"+_42+", \"trigger_type\":\""+_13+"\",\"disabled\": false}'>"+(j+1)+"</div>";
_3c=_42;
j++;
}
if(i===_5-1){
_9+="</div>";
}
}
_c+="<span class='pause_button slide_button pause' data-options='{\"button_type\":\"pause_button\",\"trigger_type\": \"none\",\"disabled\": false,\"paused\": false}'>Pause</span>";
_d+="<div class='previous_next_button previous_button slide_button "+_3d("previous_button")+"' data-options='{\"button_type\":\"previous_button\",\"button_action\":\"previous\",\"trigger_type\": \""+_13+"\",\"disabled\": false}'>Previous list</div>";
_e+="<div class='previous_next_button next_button slide_button "+_3d("next_button")+"' data-options='{\"button_type\":\"next_button\",\"button_action\":\"next\",\"trigger_type\": \""+_13+"\",\"disabled\": false}'>Next list</div>";
_f+="<div class='hover_previous_next_button hover_previous_button slide_button "+_3d("hover_previous_button")+"' data-options='{\"button_type\":\"hover_previous_button\",\"button_action\":\"previous\",\"trigger_type\": \""+_13+"\",\"disabled\": false}'><span style='opacity: 0;' class='hover_previous_next_button_inner'>Prev</span></div>";
_10+="<div class='hover_previous_next_button hover_next_button slide_button "+_3d("hover_next_button")+"' data-options='{\"button_type\":\"hover_next_button\",\"button_action\":\"next\",\"trigger_type\": \""+_13+"\",\"disabled\": false}'><span style='opacity: 0;' class='hover_previous_next_button_inner'>Next</span></div>";
_11+="<span class='slide_count'>"+_5+"</span>";
_12+="<div class='current_slide_number'>1 of "+Math.ceil(_5/_2e)+"</div>";
_6+="<div class='agile_carousel' style='overflow: hidden; position: relative; width: "+_21+"px;'>";
var _43=function(set,_45){
var _46="";
if(set!==""){
if(_45){
_46+="<div class='control_set'><div class='control_set_"+_45+"'><div class='control_set_"+_45+"_inner control_set_inner'>";
}
var _47=set.split(",");
for(j=0;j<_47.length;j++){
if(_47[j]=="numbered_buttons"){
_46+=_8;
}
if(_47[j]=="group_numbered_buttons"){
_46+=_9;
}
if(_47[j]=="thumbnails"){
_46+=_a;
}
if(_47[j]=="content_buttons"){
_46+=_b;
}
if(_47[j]=="pause_button"){
_46+=_c;
}
if(_47[j]=="previous_button"){
_46+=_d;
}
if(_47[j]=="next_button"){
_46+=_e;
}
if(_47[j]=="hover_previous_button"){
_46+=_f;
}
if(_47[j]=="hover_next_button"){
_46+=_10;
}
if(_47[j]=="slide_count"){
_46+=_11;
}
if(_47[j]=="current_slide_number"){
_46+=_12;
}
}
if(_45){
_46+="</div></div></div></ul>";
}
_6+=_46;
}
};
if(_2d){
_6+=_2d;
}
if(_2.control_set_1){
_43(_27,1);
}
if(_2.control_set_2){
_43(_28,2);
}
if(_2.control_set_3){
_43(_29,3);
}
if(_2.control_set_4){
_43(_2a,4);
}
if(_2.control_set_5){
_43(_2b,5);
}
if(_2.no_control_set){
_43(_2c);
}
var obj=$(this);
i=1;
for(var key in _23){
if(_23.hasOwnProperty(key)){
_33=_23[key];
_32=_33.content;
var _4a=_33.thumbnail_button;
_34=_33.content_button;
if(i===1){
_6+="<ul class='slides' style='width: "+_25*_5+"px;'>";
}
if(_32){
_6+="<li class='slide_"+i+" slide' style='padding: 0; width: "+_25+"px;'>"+_32+"</li>";
}
if(i===_5){
_6+="</ul>";
}
if(i==1){
_8+="<div class='numbered_buttons_container  button_container'>";
}
_8+="<div class='slide_number_"+i+" numbered_button slide_button "+_3d("numbered_buttons")+"' data-options='{\"button_type\":\"numbered_button\",\"button_action\":\"direct\",\"go_to\":"+i+", \"trigger_type\":\""+_13+"\",\"disabled\": false}'>"+i+"</div>";
if(i==_5){
_8+="</div>";
}
if(_4a){
if(i==1){
_a+="<div class='thumbnail_buttons_container  button_container'>";
}
_a+="<div class='slide_number_"+i+" thumbnail_button slide_button "+_3d("thumbnails")+"'  data-options='{\"button_type\":\"thumbnail_button\",\"button_action\":\"direct\",\"go_to\":"+i+",\"trigger_type\": \""+_13+"\",\"disabled\": false}'>"+_4a+"</div>";
if(i==_5){
_a+="</div>";
}
}
if(_34){
if(i==1){
_b+="<div class='content_buttons_container  button_container'>";
}
_b+="<div class='slide_number_"+i+" content_button_"+i+" content_button slide_button "+_3d("content_buttons")+"' data-options='{\"button_type\":\"content_button\",\"button_action\":\"direct\",\"go_to\":"+i+",\"trigger_type\": \""+_13+"\",\"disabled\": false}'><div class='content_button_inner'>"+_34+"</div></div>";
if(i==_5){
_b+="</div>";
}
}
i++;
}
}
_6+="</div>";
obj.html(_6);
var _4b=obj.find(".slide");
var _4c=obj.find(".slides");
var _4d=obj.find(".slide_button");
var _4e=_4d.length;
var _4f=obj.find(".agile_carousel");
var _50=obj.find(".previous_button, .hover_previous_button");
var _51=_50.length;
var _52=obj.find(".next_button, .hover_next_button");
var _53=obj.find(".previous_button");
var _54=_53.length;
var _55=obj.find(".hover_previous_button");
var _56=_55.length;
var _57=obj.find(".next_button");
var _58=_57.length;
var _59=obj.find(".hover_next_button");
var _5a=_59.length;
function _5b(_5c){
if(_20===false&&_2e<2){
if(_5c==1){
if(_54>0){
_53.addClass("ac_disabled");
_53.data("options").disabled=true;
}
if(_56>0){
_55.addClass("ac_disabled");
_55.data("options").disabled=true;
}
}else{
if(_54>0){
_53.removeClass("ac_disabled");
_53.data("options").disabled=false;
}
if(_56>0){
_55.removeClass("ac_disabled");
_55.data("options").disabled=false;
}
}
if(_5c==_5){
if(_58>0){
_57.addClass("ac_disabled");
_57.data("options").disabled=true;
}
if(_5a>0){
_59.addClass("ac_disabled");
_59.data("options").disabled=true;
}
}else{
if(_58>0){
_57.removeClass("ac_disabled");
_57.data("options").disabled=false;
}
if(_5a>0){
_59.removeClass("ac_disabled");
_59.data("options").disabled=false;
}
}
}
if(_20===false&&_2e>1){
if(_5c<=_2e){
if(_54>0){
_53.addClass("ac_disabled");
_53.data("options").disabled=true;
}
if(_56>0){
_55.addClass("ac_disabled");
_55.data("options").disabled=true;
}
}else{
if(_54>0){
_53.removeClass("ac_disabled");
_53.data("options").disabled=false;
}
if(_56>0){
_55.removeClass("ac_disabled");
_55.data("options").disabled=false;
}
}
if(_5c>(_5-_2e)){
if(_58>0){
_57.addClass("ac_disabled");
_57.data("options").disabled=true;
}
if(_5a>0){
_59.addClass("ac_disabled");
_59.data("options").disabled=true;
}
}else{
if(_58>0){
_57.removeClass("ac_disabled");
_57.data("options").disabled=false;
}
if(_5a>0){
_59.removeClass("ac_disabled");
_59.data("options").disabled=false;
}
}
}
};
var _5d=obj.find(".current_slide_number");
var _5e=_5d.length;
function _5f(_60){
if(_5e>0){
_5d.html(_60);
}
};
function _61(_62){
obj.find(".ac_selected").removeClass("ac_selected");
obj.find("*[class*=\"slide_number_"+_62+" \"]").addClass("ac_selected");
};
if(_2e==1){
_4b.eq(0).css({"position":"relative","top":0,"left":0});
_4b.slice(1,_5).css({"position":"relative","top":"-5000px","left":0});
_4c.css("width",_25+"px");
}
if(_2e>1){
_4f.css("width",_2e*_25+"px");
var k=0;
for(k=1;k<=_5;k++){
_4b.eq(k).css({"position":"relative","top":0,"left":0});
}
}
var _64=function(){
_1e.css({"z-index":10,top:-5000});
};
var _65=function(){
_1e.css({"position":"relative","top":"-5000px","left":0});
};
_5b(1);
_61(1);
_15=bd.button_type;
_1a=1;
var _66=_3b[_3b.length-1];
for(k=0;k<_2e;k++){
var _67=$(_4b).eq(k).find("*[class*=\"lazy\"]");
_67.attr("src",_67.attr("data-original"));
}
function _68(_69){
bd=$(_69)[0];
var _6a=bd.disabled;
if(_6a!==true){
_15=bd.button_type;
_16=bd.trigger_type;
_17=bd.button_action;
var _6b=bd.go_to;
_6a=bd.disabled;
if(_1b!==false){
_1a=_1b;
}
_1c=_1a-1;
_1e=$(_4b).eq(_1c);
var _6c=_1c+_2e;
for(k=_6c;k<_6c+_2e;k++){
var _6d=$(_4b).eq(k).find("*[class*=\"lazy\"]");
_6d.attr("src",_6d.attr("data-original"));
}
if(_2e<2){
if(_17=="next"&&_1a<_5){
_1b=_1a+1;
}else{
if(_17=="next"&&_1a==_5){
_1b=1;
}
}
if(_17=="previous"&&_1a>1){
_1b=_1a-1;
}else{
if(_17=="previous"&&_1a==1){
_1b=_5;
}
}
}
if(_2e>1){
if(_17=="next"&&_1a<(_5-_2e+_3a)){
_1b=_3b[Math.ceil(_1a/_2e)];
}else{
if(_17=="next"&&_1a>=(_5-_2e+_3a)&&_2e>1){
_1b=1;
}
}
if(_17=="previous"&&_1a>_2e&&_2e>1){
var _6e=Math.floor(_1a/_2e);
_6e=_6e-1;
_1b=_3b[_6e];
}else{
if(_17=="previous"&&_1a<=_2e&&_2e>1){
_1b=_66;
}
}
}
if(_17=="direct"){
_1b=_6b;
}
_1d=_1b-1;
_1f=$(_4b).eq(_1d);
_61(_1b);
_5f((_1d/_2e+1)+" of "+Math.ceil(_5/_2e));
if(_1d!=_1c){
if(_2f=="slide"&&_2e>1){
_4c.stop().animate({"left":((_1b*_25)-_25)*-1+"px"},{duration:_30});
}
if(_2f=="slide"&&_2e==1){
var _6f="";
if(_17=="next"||(_1b>_1a)&&_17=="direct"){
_1f.css({top:0,left:_25});
_6f=_25*-1;
}
if(_17=="previous"||(_1b<_1a&&_17=="direct")){
_1f.css({top:0,left:_25*-1});
_6f=_25;
}
_1e.stop().animate({"left":_6f+"px"},{duration:_30,complete:_65});
_1f.stop().animate({"left":"0px"},{duration:_30});
}
if(_2f=="fade"&&_2e==1){
_4b.not(_1e,_1f).css({"top":"-5000px","left":0,"z-index":0,"opacity":0});
if(_17){
_1f.css({"top":0,"left":0,"z-index":20});
_1e.css({"z-index":10,"opacity":1});
}
_1f.stop().animate({"opacity":1},{duration:_30,complete:_64});
}
}
}
_5b(_1b);
_61(_1b);
};
var _70=obj.find(".ac_click");
var _71=obj.find(".ac_hover");
if(_31!==0){
_37=setInterval(_72,_31);
}
var _73=obj.find(".pause_button");
function _74(){
if(_73.length>0){
_73.html("play");
_73.data("options").paused=true;
_73.addClass("play_button");
}
clearInterval(_37);
};
$(_70).click(function(){
_74();
if(obj.find(":animated").length<1){
_68($(this).data().options);
}else{
_35=$(this);
if(_35.data("options").button_action!="next"&&_35.data("options").button_action!="previous"){
function _75(){
if(_4c.find(":animated").length<1){
_68(_35.data().options);
clearInterval(_35.data("options").timeout);
}
};
t=setInterval(_75,30);
_35.data("options").timeout=t;
}
}
});
$(_71).hover(function(){
_74();
if(_4c.find(":animated").length<1){
_68($(this).data().options);
}else{
_35=$(this);
function _76(){
if(_4c.find(":animated").length<1){
_68(_35.data().options);
clearInterval(_35.data("options").timeout);
}
};
t=setInterval(_76,30);
_35.data("options").timeout=t;
}
},function(){
_35=$(this);
clearInterval(_35.data("options").timeout);
});
_36={"button_action":"next","button_type":"pause","disabled":false,"trigger_type":"ac_click"};
function _72(){
_68(_36);
};
function _77(){
clearInterval(_37);
_73.html("pause");
_73.data("options").paused=false;
_73.addClass("pause_button");
_73.removeClass("play_button");
_68(_36);
_37=setInterval(_72,_31);
return _37;
};
_73.click(function(){
var _78=$(this);
if(_78.data("options").paused===true){
_77();
}else{
if(_78.data("options").paused===false){
_74();
clearInterval(_37);
}
}
});
$(".hover_previous_next_button").hover(function(){
$(this).find(".hover_previous_next_button_inner").stop().fadeTo("fast",0.85);
},function(){
$(this).find(".hover_previous_next_button_inner").stop().fadeTo("fast",0);
});
});
};
})(jQuery);
function addCommas(_79){
_79+="";
x=_79.split(".");
x1=x[0];
x2=x.length>1?"."+x[1]:"";
var rgx=/(\d+)(\d{3})/;
while(rgx.test(x1)){
x1=x1.replace(rgx,"$1"+","+"$2");
}
return x1+x2;
};
var promo_items=[];
var promo_items_idp_bottom=[];
var carousel_zp_idp_zone;
var carousel_zp_idp_abtest;
function carousel_zpfs(_7b,_7c,_7d,_7e,_7f,_80,_81,_82,_83,_84,_85,_86,_87,_88){
var _89=_7c+"_zp: No recommendations returned";
carousel_zp_idp_zone=_7c;
carousel_zp_idp_abtest=_83;
if(_7d!=="_NR_"){
var _8a=0;
var _8b=0;
var _8c="";
var _8d=undefined;
var _8e=undefined;
var _8f=undefined;
var _90=_7b.length;
var _91=[];
var _92=100/_90;
var _93=typeof c2cPageId=="undefined"?"":c2cPageId;
var _94="cm_sp=";
cmCreateManualImpressionTag(_93,_82.substring(_82.indexOf(_94)+_94.length,_82.indexOf("&")));
if(_85){
_80.unshift(_81);
_90++;
}
var _95=(document.getElementById("isEsv").value=="true")?"Add-to-Requisition.png":"add_to_ordernobasket.gif";
for(var ii=0;ii<_90;ii++){
var _97=_85?(ii==0?_7e:_7b[ii-1]):_7b[ii];
var _98="";
var _99=_80[ii][_8a];
var _9a=_8c+_80[ii][_8b];
var _9b=_82.substring(_82.lastIndexOf("|")+1);
var _9c="/Grainger/items/"+_97+_9b;
var _9d=_99;
if(!_99){
_9d="No Image Available";
_99="&nbsp;";
}
var _9e=_80[ii][0]?_80[ii][0]:"-";
var _9f=_80[ii][1]?_80[ii][1]:"-";
var _a0=_80[ii][2]?_80[ii][2]:"-";
var _a1=_80[ii][3]?_80[ii][3]:"-";
var _a2=_80[ii][4]?_80[ii][4]:"-";
var _a3=_80[ii][5]?_80[ii][5]:"-";
var _a4=_80[ii][6]?_80[ii][6]:"-";
var _a5=_80[ii][7]?_80[ii][7]:"-";
var _a6=_80[ii][8]?_80[ii][8]:"-";
var _a7=_80[ii][9]?_80[ii][9]:"-";
var _a8=_80[ii][10]?_80[ii][10]:"-";
var _a9=_80[ii][11]?_80[ii][11]:"-";
var _aa=_80[ii][12]?_80[ii][12]:"-";
var _ab=_80[ii][13]?_80[ii][13]:"-";
var _ac=_80[ii][14]?_80[ii][14]:"-";
_91.push({"content":"<ul class='slide_inner "+((ii+1)%_87!=0?"border_right":"")+"'><li class=\"listElement\"><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+_9c+"','"+(_7c+"_item_"+(ii+1))+"','"+_93+"');\" href='"+_9c+"'><img class=\"lazy\" src=\"/images/spinner-anim.gif\" data-original='"+createScene7ImageUrl(_9f)+"' alt='"+_9d+"'></a></li><li class=\"dashes two_line\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_9c+"','"+(_7c+"_item_"+(ii+1))+"','"+_93+"');\" href='"+_9c+"'>"+_9e+"</a></li>"+"<li class=\"dashes\"><ul class=\"two_line\"><li class=\"float_left\">Brand:</li><li class=\"text_right\">"+(_a1.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_a1)+"</li></ul></li>"+"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_9c+"','"+(_7c+"_item_"+(ii+1))+"','"+_93+"');\" href='"+_9c+"'>"+(_97)+"</a></li></ul></li>"+((_82.indexOf("sp=N")>-1||_82.indexOf("sp=n")>-1)?"":"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Price:</li>\n<li class=\"float_right\">"+((_a3=="Y")?("<strike>$"+addCommas(parseFloat(_a0).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_idp_bottom_"+_97+"\">$"+addCommas(parseFloat(_a2).toFixed(2))+"</span>"):("<span id=\"promo_idp_bottom_"+_97+"\">$"+addCommas(parseFloat(_a0).toFixed(2))+"</span>"))+"</li></ul></li>\n")+((_82.indexOf("sb=N")>-1||_82.indexOf("sb=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\"><input type=\"text\" id=\""+_84+"_qty\" name=\""+_84+"_qty\" title=\"Quantity\" maxlength=\"4\" size=\"1\" value=\"Qty\" onclick=\"javascript:if(isNaN(this.value))this.value='';return false;\" onblur=\"javascript:if(isNaN(this.value))this.value='Qty';return false;\"></li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_9c+"','"+(_7c+"_item_"+(ii+1))+"','"+_93+"');ioAdd('"+_97+"','"+ii+"','ord','"+_84+"_qty','"+_9b+"', this);\" href=\"\" id=\"addToOrder_"+_84+"\" name=\"addToOrder"+_84+"\" title=\"Add to Order\"><span class=\"masterSprite addToOrderNoBasketBtnMasterSprite\"></span></a></li></ul></li>")+"</ul>"});
promo_items_idp_bottom.push(_97);
}
$("#"+_84).agile_carousel({carousel_data:_91,carousel_outer_width:_86,slide_width:_88,number_slides_visible:_87,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">"+_82.substring(0,_82.indexOf("|"))+"</h3></li>"});
}else{
$("#"+_84).text("");
}
if(getCookie("logged_in")!=null&&null!=promo_items_idp_bottom&&0<promo_items_idp_bottom.length){
$.get("/Grainger/wwg/itemPricesAjax.shtml",jQuery.param({"items":promo_items_idp_bottom},true),function(_ad){
if(null!=_ad&&_ad.length>0){
eval("var data2="+_ad);
for(i=1;i<data2.length;i++){
$("#promo_"+data2[i][0]).text(data2[i][1]);
}
}
});
promo_items_idp_bottom=[];
}
};
function cspCall(){
if(!isCSPCalled){
if(((getCookie("logged_in")!=null)||(undefined!=document.getElementById("isGov")&&document.getElementById("isGov").value=="true"))&&null!=promo_items_idp_bottom&&0<promo_items_idp_bottom.length){
$.get("/Grainger/wwg/itemPricesAjax.shtml",jQuery.param({"items":promo_items_idp_bottom},true),function(_ae){
if(null!=_ae&&_ae.length>0){
eval("var resp2="+_ae);
for(i=1;i<resp2.length;i++){
$("#promo_idp_bottom_"+resp2[i][0]).text(resp2[i][1]);
}
}
});
promo_items_idp_bottom=[];
isCSPCalled=!isCSPCalled;
}
}
};
var ab_test;
var carousel_zp_pc_zone;
var carousel_zp_pc_abtest;
function carousel_zp_pc(_af,_b0,_b1,_b2,_b3,_b4,_b5,_b6,_b7,_b8,_b9){
var _ba=_b0+"_zp: No recommendations returned";
ab_test=_b7;
carousel_zp_pc_zone=_b0;
carousel_zp_pc_abtest=_b7;
if(_b1!=="_NR_"){
var _bb=0;
var _bc=0;
var _bd="";
var _be=undefined;
var _bf=undefined;
var _c0=undefined;
var _c1=_af.length;
var _c2=[];
var _c3=100/_c1;
var _c4=typeof c2cPageId=="undefined"?"":c2cPageId;
var _c5="cm_sp=";
cmCreateManualImpressionTag(_c4,_b6.substring(_b6.indexOf(_c5)+_c5.length,_b6.indexOf("&")));
if(_b9){
_b4.unshift(_b5);
_c1++;
}
var _c6=(document.getElementById("isEsv").value=="true")?"Add-to-Requisition.png":"add_to_ordernobasket.gif";
for(var ii=0;ii<_c1;ii++){
var _c8=_b9?(ii==0?_b2:_af[ii-1]):_af[ii];
var _c9="";
var _ca=_b4[ii][_bb];
var _cb=_bd+_b4[ii][_bc];
var _cc=_b6.substring(_b6.lastIndexOf("|")+1);
var _cd="/Grainger/items/"+_c8+_cc;
var _ce=_ca;
if(!_ca){
_ce="No Image Available";
_ca="&nbsp;";
}
var _cf=_b4[ii][0]?_b4[ii][0]:"-";
var _d0=_b4[ii][1]?_b4[ii][1]:"-";
var _d1=_b4[ii][2]?_b4[ii][2]:"-";
var _d2=_b4[ii][3]?_b4[ii][3]:"-";
var _d3=_b4[ii][4]?_b4[ii][4]:"-";
var _d4=_b4[ii][5]?_b4[ii][5]:"-";
var _d5=_b4[ii][6]?_b4[ii][6]:"-";
var _d6=_b4[ii][7]?_b4[ii][7]:"-";
var _d7=_b4[ii][8]?_b4[ii][8]:"-";
var _d8=_b4[ii][9]?_b4[ii][9]:"-";
var _d9=_b4[ii][10]?_b4[ii][10]:"-";
var _da=_b4[ii][11]?_b4[ii][11]:"-";
var _db=_b4[ii][12]?_b4[ii][12]:"-";
var _dc=_b4[ii][13]?_b4[ii][13]:"-";
var _dd=_b4[ii][14]?_b4[ii][14]:"-";
_c2.push({"content":"<ul class='slide_inner "+((ii+1)%4!=0?"border_right":"")+"'><li><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+_cd+"','"+(_b0+"_item_"+(ii+1))+"','"+_c4+"');\" href='"+_cd+"'><img class=\"lazy\" src=\"/images/spinner-anim.gif\" data-original='"+createImageUrl(_d0)+"' alt='"+_ce+"'></a></li><li class=\"dashes two_line\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_cd+"','"+(_b0+"_item_"+(ii+1))+"','"+_c4+"');\" href='"+_cd+"'>"+_cf+"</a></li>"+"<li class=\"dashes\"><ul class=\"two_line\"><li class=\"float_left\">Brand:</li><li class=\"text_right\">"+(_d2.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_d2)+"</li></ul></li>"+"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_cd+"','"+(_b0+"_item_"+(ii+1))+"','"+_c4+"');\" href='"+_cd+"'>"+(_c8)+"</a></li></ul></li>"+((_b6.indexOf("sp=N")>-1||_b6.indexOf("sp=n")>-1)?"":"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Price:</li>\n<li class=\"float_right\">"+((_d4=="Y")?("<strike>$"+addCommas(parseFloat(_d1).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_"+_c8+"\">$"+addCommas(parseFloat(_d3).toFixed(2))+"</span>"):("<span id=\"promo_"+_c8+"\">$"+addCommas(parseFloat(_d1).toFixed(2))+"</span>"))+"</li></ul></li>\n")+((_b6.indexOf("sb=N")>-1||_b6.indexOf("sb=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\"><input type=\"text\" id=\""+_b8+"_qty\" name=\""+_b8+"_qty\" title=\"Quantity\" maxlength=\"4\" size=\"1\" value=\"Qty\" onclick=\"javascript:if(isNaN(this.value))this.value='';return false;\" onblur=\"javascript:if(isNaN(this.value))this.value='Qty';return false;\"></li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_cd+"','"+(_b0+"_item_"+(ii+1))+"','"+_c4+"');ioAdd('"+_c8+"','"+ii+"','ord','"+_b8+"_qty','"+_cc+"', this);\" href=\"\" id=\"addToOrder_"+_b8+"\" name=\"addToOrder"+_b8+"\" title=\"Add to Order\"><span class=\"masterSprite addToOrderNoBasketBtnMasterSprite\"></span></a></li></ul></li>")+"</ul>"});
promo_items.push(_c8);
}
$("#"+_b8).agile_carousel({carousel_data:_c2,carousel_outer_width:791,slide_width:156,number_slides_visible:4,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">"+_b6.substring(0,_b6.indexOf("|"))+"</h3></li>"});
if(getCookie("logged_in")!=null&&null!=promo_items&&0<promo_items.length){
$.get("/Grainger/wwg/itemPricesAjax.shtml",jQuery.param({"items":promo_items},true),function(_de){
if(null!=_de&&_de.length>0){
eval("var data2="+_de);
for(i=1;i<data2.length;i++){
$("#promo_"+data2[i][0]).text(data2[i][1]);
}
}
});
promo_items=[];
}
}
};
function carousel_zp_of(_df,_e0,_e1,_e2,_e3,_e4,_e5,_e6,_e7,_e8,_e9){
var _ea=_e0+"_zp: No recommendations returned";
if(_e1!=="_NR_"){
var _eb=0;
var _ec=0;
var _ed="";
var _ee=undefined;
var _ef=undefined;
var _f0=undefined;
var _f1=_df.length;
var _f2=[];
var _f3=100/_f1;
var _f4=typeof c2cPageId=="undefined"?"":c2cPageId;
var _f5="cm_sp=";
cmCreateManualImpressionTag(_f4,_e6.substring(_e6.indexOf(_f5)+_f5.length,_e6.indexOf("&")));
if(_e9){
_e4.unshift(_e5);
_f1++;
}
var _f6=(document.getElementById("isEsv").value=="true")?"Add-to-Requisition.png":"add_to_ordernobasket.gif";
for(var ii=0;ii<_f1;ii++){
var _f8=_e9?(ii==0?_e2:_df[ii-1]):_df[ii];
var _f9="";
var _fa=_e4[ii][_eb];
var _fb=_ed+_e4[ii][_ec];
var _fc=_e6.substring(_e6.lastIndexOf("|")+1);
var _fd=_fc.substring(_fc.lastIndexOf("cm_vc=")+6);
var _fe="/Grainger/items/"+_f8+_fc;
var _ff=_fa;
if(!_fa){
_ff="No Image Available";
_fa="&nbsp;";
}
var _100=_e4[ii][0]?_e4[ii][0]:"-";
var _101=_e4[ii][1]?_e4[ii][1]:"-";
var _102=_e4[ii][2]?_e4[ii][2]:"-";
var _103=_e4[ii][3]?_e4[ii][3]:"-";
var _104=_e4[ii][4]?_e4[ii][4]:"-";
var _105=_e4[ii][5]?_e4[ii][5]:"-";
var _106=_e4[ii][6]?_e4[ii][6]:"-";
var _107=_e4[ii][7]?_e4[ii][7]:"-";
var _108=_e4[ii][8]?_e4[ii][8]:"-";
var _109=_e4[ii][9]?_e4[ii][9]:"-";
var _10a=_e4[ii][10]?_e4[ii][10]:"-";
var _10b=_e4[ii][11]?_e4[ii][11]:"-";
var _10c=_e4[ii][12]?_e4[ii][12]:"-";
var _10d=_e4[ii][13]?_e4[ii][13]:"-";
var _10e=_e4[ii][14]?_e4[ii][14]:"-";
_f2.push({"content":"<ul class='slide_inner "+((ii+1)%6!=0?"border_right":"")+"'><li><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+_fe+"','"+(_e0+"_item_"+(ii+1))+"','"+_f4+"');\" href='"+_fe+"'><img class=\"lazy\" style=\"margin-top:expression(( 110 - this.height ) / 2);\" src=\"/images/spinner-anim.gif\" data-original='"+createImageUrl(_101)+"' alt='"+_ff+"'></a></li><li class=\"dashes two_line\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_fe+"','"+(_e0+"_item_"+(ii+1))+"','"+_f4+"');\" href='"+_fe+"'>"+_100+"</a></li>"+"<li class=\"dashes\"><ul class=\"two_line\"><li class=\"float_left\">Brand:</li><li class=\"text_right\">"+(_103.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_103)+"</li></ul></li>"+"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_fe+"','"+(_e0+"_item_"+(ii+1))+"','"+_f4+"');\" href='"+_fe+"'>"+(_f8)+"</a></li></ul></li>"+((_e6.indexOf("sp=N")>-1||_e6.indexOf("sp=n")>-1)?"":"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Price:</li>\n<li class=\"float_right\">"+((_105=="Y")?("<strike>$"+addCommas(parseFloat(_102).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_"+_f8+"\">$"+addCommas(parseFloat(_104).toFixed(2))+"</span>"):("<span id=\"promo_"+_f8+"\">$"+addCommas(parseFloat(_102).toFixed(2))+"</span>"))+"</li></ul></li>\n")+((_e6.indexOf("sb=N")>-1||_e6.indexOf("sb=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\"><input type=\"text\" id=\""+_e8+"_qty\" name=\""+_e8+"_qty\" title=\"Quantity\" maxlength=\"4\" size=\"1\" value=\"Qty\" onclick=\"javascript:if(isNaN(this.value))this.value='';return false;\" onblur=\"javascript:if(isNaN(this.value))this.value='Qty';return false;\"></li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+_fe+"','"+(_e0+"_item_"+(ii+1))+"','"+_f4+"');ioAddToOrder('"+_f8+"','"+ii+"','"+_e8+"','"+_fd+"');\" id=\"addToOrder_"+_e8+"\" name=\"addToOrder"+_e8+"\"><img id=\""+_e8+"_btn_ato\" name=\""+_e8+"_btn_ato\" src=\"/images/"+_f6+"\" alt=\"Add to Order\" border=\"0\"></a></li></ul></li>")+"<input type=\"hidden\" id=\""+_e8+"_ajaxRunning\" name=\""+_e8+"_ajaxRunning\" value=\"no\"></ul>"});
promo_items.push(_f8);
}
$("#"+_e8).agile_carousel({carousel_data:_f2,carousel_outer_width:990,slide_width:163,number_slides_visible:6,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><div class=\"io_recs_title\"><h3 class=\"h3text\">"+_e6.substring(0,_e6.indexOf("|"))+"</h3></div>"});
if(getCookie("logged_in")!=null&&null!=promo_items&&0<promo_items.length){
$.get("/Grainger/wwg/itemPricesAjax.shtml",jQuery.param({"items":promo_items},true),function(data){
if(null!=data&&data.length>0){
eval("var data2="+data);
for(i=1;i<data2.length;i++){
$("#promo_"+data2[i][0]).text(data2[i][1]);
}
}
});
promo_items=[];
}
}
};
var carousel_zp_home_zone;
var carousel_zp_home_abtest;
function carousel_zp_home(_110,zone,_112,_113,_114,_115,_116,_117,_118,_119,_11a){
var html=zone+"_zp: No recommendations returned";
carousel_zp_home_zone=zone;
carousel_zp_home_abtest=_118;
if(_112!=="_NR_"){
var _11c=0;
var _11d=0;
var _11e="";
var _11f=undefined;
var _120=undefined;
var _121=undefined;
var _122=_110.length;
var _123=[];
var _124=100/_122;
var _125=typeof c2cPageId=="undefined"?"":c2cPageId;
var _126="cm_sp=";
cmCreateManualImpressionTag(_125,_117.substring(_117.indexOf(_126)+_126.length,_117.indexOf("&")));
if(_11a){
_115.unshift(_116);
_122++;
}
var _127=(document.getElementById("isEsv").value=="true")?"Add-to-Requisition.png":"add_to_ordernobasket.gif";
for(var ii=0;ii<_122;ii++){
var _129=_11a?(ii==0?_113:_110[ii-1]):_110[ii];
var _12a="";
var _12b=_115[ii][_11c];
var _12c=_11e+_115[ii][_11d];
var _12d=_117.substring(_117.lastIndexOf("|")+1);
var href="/Grainger/items/"+_129+_12d;
var _12f=_12b;
if(!_12b){
_12f="No Image Available";
_12b="&nbsp;";
}
var _130=_115[ii][0]?_115[ii][0]:"-";
var _131=_115[ii][1]?_115[ii][1]:"-";
var _132=_115[ii][2]?_115[ii][2]:"-";
var _133=_115[ii][3]?_115[ii][3]:"-";
var _134=_115[ii][4]?_115[ii][4]:"-";
var _135=_115[ii][5]?_115[ii][5]:"-";
var _136=_115[ii][6]?_115[ii][6]:"-";
var _137=_115[ii][7]?_115[ii][7]:"-";
var _138=_115[ii][8]?_115[ii][8]:"-";
var _139=_115[ii][9]?_115[ii][9]:"-";
var _13a=_115[ii][10]?_115[ii][10]:"-";
var _13b=_115[ii][11]?_115[ii][11]:"-";
var _13c=_115[ii][12]?_115[ii][12]:"-";
var _13d=_115[ii][13]?_115[ii][13]:"-";
var _13e=_115[ii][14]?_115[ii][14]:"-";
_123.push({"content":"<ul class='slide_inner "+((ii+1)%4!=0?"border_right":"")+"'><li class=\"listElement\"><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_125+"');\" href='"+href+"'><img class=\"lazy\" style=\"margin-top:expression(( 115 - this.height ) / 2);\" src=\"/images/spinner-anim.gif\" data-original='"+createImageUrl(_131)+"' alt='"+_12f+"'></a></li>\n<li class=\"dashes two_line\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_125+"');\" href='"+href+"'>"+_130+"</a></li>"+"<li class=\"dashes\"><ul class=\"two_line\"><li class=\"float_left\">Brand:</li><li class=\"float_right\">"+(_133.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_133)+"</li></ul></li>"+"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_125+"');\" href='"+href+"'>"+(_129)+"</a></li></ul></li>"+((_117.indexOf("sp=N")>-1||_117.indexOf("sp=n")>-1)?"":"<li class=\"dashes one_line\"><ul class=\"one_line\"><li class=\"float_left\">Price:</li>\n<li class=\"text_right\">"+((_135=="Y")?("<strike>$"+addCommas(parseFloat(_132).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_"+_129+"\">$"+addCommas(parseFloat(_134).toFixed(2))+"</span>"):("<span id=\"promo_"+_129+"\">$"+addCommas(parseFloat(_132).toFixed(2))+"</span>"))+"</li></ul></li>\n")+((_117.indexOf("sb=N")>-1||_117.indexOf("sb=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\"><input type=\"text\" id=\""+_119+"_qty\" name=\""+_119+"_qty\" title=\"Quantity\" maxlength=\"4\" size=\"1\" value=\"Qty\" onclick=\"javascript:if(isNaN(this.value))this.value='';return false;\" onblur=\"javascript:if(isNaN(this.value))this.value='Qty';return false;\"></li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_125+"');ioAdd('"+_129+"','"+ii+"','ord','"+_119+"_qty','"+_12d+"', this);\" href=\"\" id=\"addToOrder_"+_119+"\" name=\"addToOrder"+_119+"\" title=\"Add to Order\"><span class=\"masterSprite addToOrderNoBasketBtnMasterSprite\"></span></a></li></ul></li>")+"</ul>"});
}
$("#"+_119).agile_carousel({carousel_data:_123,carousel_outer_width:580,slide_width:145,number_slides_visible:4,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">"+_117.substring(0,_117.indexOf("|"))+"</h3></li>"});
}else{
document.getElementById(_119).innerHTML="";
}
};
function carousel_zp_search(_13f,zone,_141,_142,_143,_144,_145,_146,_147,_148,_149){
var html=zone+"_zp: No recommendations returned";
if(_141!=="_NR_"){
var _14b=0;
var _14c=0;
var _14d="";
var _14e=undefined;
var _14f=undefined;
var _150=undefined;
var _151=_13f.length;
var _152=[];
var _153=100/_151;
var _154=typeof c2cPageId=="undefined"?"":c2cPageId;
var _155="cm_sp=";
cmCreateManualImpressionTag(_154,_146.substring(_146.indexOf(_155)+_155.length,_146.indexOf("&")));
if(_149){
_144.unshift(_145);
_151++;
}
for(var ii=0;ii<_151;ii++){
var _157=_149?(ii==0?_142:_13f[ii-1]):_13f[ii];
var _158="";
var _159=_144[ii][_14b];
var _15a=_14d+_144[ii][_14c];
var _15b=_146.substring(_146.lastIndexOf("|")+1);
var href="/Grainger/items/"+_157+_15b;
var _15d=_159;
if(!_159){
_15d="No Image Available";
_159="&nbsp;";
}
var _15e=_144[ii][0]?_144[ii][0]:"-";
var _15f=_144[ii][1]?_144[ii][1]:"-";
var _160=_144[ii][2]?_144[ii][2]:"-";
var _161=_144[ii][3]?_144[ii][3]:"-";
var _162=_144[ii][4]?_144[ii][4]:"-";
var _163=_144[ii][5]?_144[ii][5]:"-";
var _164=_144[ii][6]?_144[ii][6]:"-";
var _165=_144[ii][7]?_144[ii][7]:"-";
var _166=_144[ii][8]?_144[ii][8]:"-";
var _167=_144[ii][9]?_144[ii][9]:"-";
var _168=_144[ii][10]?_144[ii][10]:"-";
var _169=_144[ii][11]?_144[ii][11]:"-";
var _16a=_144[ii][12]?_144[ii][12]:"-";
var _16b=_144[ii][13]?_144[ii][13]:"-";
var _16c=_144[ii][14]?_144[ii][14]:"-";
_152.push({"content":"<ul class='slide_inner "+((ii+1)%5!=0?"border_right":"")+"'><li class=\"listElement\"><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_154+"');\" href='"+href+"'><img class=\"lazy\" style=\"margin-top:expression(( 110 - this.height ) / 2);\" src=\"/images/spinner-anim.gif\" data-original='"+createImageUrl(_15f)+"' alt='"+_15d+"'></a></li><li class=\"dashes two_line\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_154+"');\" href='"+href+"'>"+_15e+"</a></li>"+"<li class=\"dashes\"><ul class=\"two_line\"><li class=\"float_left\">Brand:</li><li class=\"text_right\">"+(_161.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_161)+"</li></ul></li>"+"<li class=\"dashes\"><ul class=\"one_line\"><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_154+"');\" href='"+href+"'>"+(_157)+"</a></li></ul></li>"+((_146.indexOf("sp=N")>-1||_146.indexOf("sp=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\">Price:</li>\n<li class=\"float_right\">"+((_163=="Y")?("<strike>$"+addCommas(parseFloat(_160).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_"+_157+"\">$"+addCommas(parseFloat(_162).toFixed(2))+"</span>"):("$"+addCommas(parseFloat(_160).toFixed(2))))+"</li></ul></li>\n")+"</ul>"});
}
$("#"+_148).agile_carousel({carousel_data:_152,carousel_outer_width:770,slide_width:154,number_slides_visible:5,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">&nbsp;"+_146.substring(0,_146.indexOf("|"))+"</h3></li>"});
}else{
$("#"+_148).text("");
}
};
function vertical_zpfs(_16d,zone,_16f,_170,_171,_172,_173,_174,_175,_176,_177){
var html="";
if(_16f!=="_NR_"){
var _179=0;
var _17a=0;
var _17b="";
var _17c=undefined;
var _17d=undefined;
var _17e=undefined;
var _17f=_16d.length;
var _180="<h3 class=\"io_recs_title\">"+_174.substring(0,_174.indexOf("|"))+"</h3>";
var _181=[];
var _182=100/_17f;
var _183=typeof c2cPageId=="undefined"?"":c2cPageId;
var _184="cm_sp=";
cmCreateManualImpressionTag(_183,_174.substring(_174.indexOf(_184)+_184.length,_174.indexOf("&")));
if(_177){
_172.unshift(_173);
_17f++;
}
var _185=(document.getElementById("isEsv").value=="true")?"Add-to-Requisition.png":"add_to_ordernobasket.gif";
for(var ii=0;ii<_17f&&ii<4;ii++){
var _187=_177?(ii==0?_170:_16d[ii-1]):_16d[ii];
var _188="";
var _189=_172[ii][_179];
var _18a=_17b+_172[ii][_17a];
var _18b=_174.substring(_174.lastIndexOf("|")+1);
var href="/Grainger/items/"+_187+_18b;
var _18d=_189;
if(!_189){
_18d="No Image Available";
_189="&nbsp;";
}
var _18e=_172[ii][0]?_172[ii][0]:"-";
var _18f=_172[ii][1]?_172[ii][1]:"-";
var _190=_172[ii][2]?_172[ii][2]:"-";
var _191=_172[ii][3]?_172[ii][3]:"-";
var _192=_172[ii][4]?_172[ii][4]:"-";
var _193=_172[ii][5]?_172[ii][5]:"-";
var _194=_172[ii][6]?_172[ii][6]:"-";
var _195=_172[ii][7]?_172[ii][7]:"-";
var _196=_172[ii][8]?_172[ii][8]:"-";
var _197=_172[ii][9]?_172[ii][9]:"-";
var _198=_172[ii][10]?_172[ii][10]:"-";
var _199=_172[ii][11]?_172[ii][11]:"-";
var _19a=_172[ii][12]?_172[ii][12]:"-";
var _19b=_172[ii][13]?_172[ii][13]:"-";
var _19c=_172[ii][14]?_172[ii][14]:"-";
_181.push("<ul class=\"slide\"><li><a class='photo_link' onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_183+"');\" href='"+href+"'><img src='"+createScene7ImageUrl(_18f)+"' alt='"+_18d+"'></a></li><li class=\"dashes\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_183+"');\" href='"+href+"'>"+_18e+"</a></li>"+"<li class=\"dashes one_line\"><ul><li class=\"float_left\">Brand:</li><li class=\"text_right\">"+(_191.indexOf("NO BRAND")>-1?"APPROVED VENDOR":_191)+"</li></ul></li>"+"<li class=\"dashes one_line\"><ul><li class=\"float_left\">Grainger Item #:</li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_183+"');\" href='"+href+"'>"+(_187)+"</a></li></ul></li>"+((_174.indexOf("sp=N")>-1||_174.indexOf("sp=n")>-1)?"":"<li class=\"dashes one_line\"><ul><li class=\"float_left\">Price:</li>\n<li class=\"float_right\">"+((_193=="Y")?("<strike>$"+addCommas(parseFloat(_190).toFixed(2))+"</strike>&nbsp;<span class=\"promoClearancePrice\" id=\"promo_"+_187+"\">$"+addCommas(parseFloat(_192).toFixed(2))+"</span>"):("<span id=\"promo_"+_187+"\">$"+addCommas(parseFloat(_190).toFixed(2))+"</span>"))+"</li></ul></li>\n")+((_174.indexOf("sb=N")>-1||_174.indexOf("sb=n")>-1)?"":"<li class=\"dashes\"><ul><li class=\"float_left\"><input type=\"text\" id=\""+_176+"_qty\" name=\""+_176+"_qty\" title=\"Quantity\" maxlength=\"4\" size=\"1\" value=\"Qty\" onclick=\"javascript:if(isNaN(this.value))this.value='';return false;\" onblur=\"javascript:if(isNaN(this.value))this.value='Qty';return false;\"></li><li class=\"float_right\"><a onclick=\"javascript:cmCreateManualLinkClickTag('"+href+"','"+(zone+"_item_"+(ii+1))+"','"+_183+"');ioAdd('"+_187+"','"+ii+"','ord','"+_176+"_qty','"+_18b+"', this);\" href=\"\" id=\"addToOrder_"+_176+"\" name=\"addToOrder"+_176+"\" title=\"Add to Order\"><span class=\"masterSprite addToOrderNoBasketBtnMasterSprite\"></span></a></li></ul></li>")+"</ul>");
promo_items.push(_187);
}
html=_180+_181.join("\n");
}
document.getElementById(_176).innerHTML=html;
if(((getCookie("logged_in")!=null)||(undefined!=document.getElementById("isGov")&&document.getElementById("isGov").value=="true"))&&null!=promo_items&&0<promo_items.length){
$.get("/Grainger/wwg/itemPricesAjax.shtml",jQuery.param({"items":promo_items},true),function(data){
if(null!=data&&data.length>0){
eval("var data2="+data);
for(i=1;i<data2.length;i++){
$("#promo_"+data2[i][0]).text(data2[i][1]);
}
}
});
promo_items=[];
}
};
IORequest.access_method="json remote";
function TESTZ1_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,791,5,156);
};
function IDPRRZ1_zp(a,b,c,d,e,f,g,h,i){
vertical_zpfs(a,b,c,d,e,f,g,h,i,"idp_right_rail_z1",false);
};
function SRTZ1_zp(a,b,c,d,e,f,g,h,i){
vertical_zpfs(a,b,c,d,e,f,g,h,i,"idp_right_rail_z1",false);
};
function SRTZ2_zp(a,b,c,d,e,f,g,h,i){
vertical_zpfs(a,b,c,d,e,f,g,h,i,"idp_right_rail_z1",false);
};
function IDPBTZ2_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,791,5,156);
};
function A2CBTZ8_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_pc(a,b,c,d,e,f,g,h,i,"pc_z8",false);
};
function CRTBTZ9_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_of(a,b,c,d,e,f,g,h,i,"of_z9",false);
};
function CHKBTZ10_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,990,6,163);
};
function HPBTZ3_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_home(a,b,c,d,e,f,g,h,i,"hp_bottom_z3",false);
};
function SRBTZ0_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_search(a,b,c,d,e,f,g,h,i,"mygallery_bottom",false);
};
function SFBTZ4_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_search(a,b,c,d,e,f,g,h,i,"mygallery_bottom",false);
};
function FFBTZ5_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_search(a,b,c,d,e,f,g,h,i,"mygallery_bottom",false);
};
function CFBTZ6_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_search(a,b,c,d,e,f,g,h,i,"mygallery_bottom",false);
};
function SRTPZ7_zp(a,b,c,d,e,f,g,h,i){
carousel_zp_search(a,b,c,d,e,f,g,h,i,"mygallery_top",false);
};
function STATIC1_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC2_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC3_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC4_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC5_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC6_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC7_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC8_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC9_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function STATIC10_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,760,5,163);
};
function IDPPCZ1_zp(a,b,c,d,e,f,g,h,i){
carousel_zpfs(a,b,c,d,e,f,g,h,i,"idp_bottom_z2",false,990,6,163);
};
$(document).ready(function(){
if($("#pc_z8_params").length>0){
var _27f=$("#pc_z8_params").val().split(",");
var zone=_27f[0];
var _281=_27f[1];
IORequest.timeout_product=[];
cmRecRequest(zone,_281,_27f[2],"","");
}
if($("#of_z9_params").length>0){
var _27f=$("#of_z9_params").val().split(",");
var zone=_27f[0];
var _281=_27f[1];
IORequest.timeout_product=[];
cmRecRequest(zone,_281,_27f[2],"","");
}
if($("#static_params").length>0){
var _27f=$("#static_params").val().split(",");
var zone=_27f[0];
var _282=_27f[1];
IORequest.timeout_product=[];
cmRecRequest(zone,"",_27f[1],"","");
}
if($("#idp_right_rail_z1_params").length>0){
var _27f=$("#idp_right_rail_z1_params").val().split(",");
var zone=_27f[0];
var _281=_27f[1];
IORequest.timeout_product=[];
cmRecRequest(zone,_281,_27f[2],"","");
}
if($("#idp_bottom_z2_params").length>0){
var _27f=$("#idp_bottom_z2_params").val().split(",");
var zone=_27f[0];
var _281=_27f[1];
IORequest.timeout_product=[];
cmRecRequest(zone,_281,_27f[2],"","");
}
if($("#hp_bottom_z3_params").length>0){
var _27f=$("#hp_bottom_z3_params").val().split(",");
var zone=_27f[0];
var _281=(_27f[1]==""||_27f[1]==null)?"":_27f[1];
var _282=_27f[2];
IORequest.timeout_product=[];
cmRecRequest(zone,_281,_282,"","");
}
if(typeof mygallery_lines_top!="undefined"&&mygallery_lines_top.length>0){
$("#mygallery_top").agile_carousel({carousel_data:mygallery_lines_top,carousel_outer_width:770,slide_width:154,number_slides_visible:5,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">&nbsp;"+mygallery_header_top+"</h3></li>"});
}
if(typeof mygallery_lines_bottom!="undefined"&&mygallery_lines_bottom.length>0){
$("#mygallery_bottom").agile_carousel({carousel_data:mygallery_lines_bottom,carousel_outer_width:770,slide_width:154,number_slides_visible:5,transition_time:330,control_set_1:"previous_button,current_slide_number,next_button",persistent_content:"<ul class='carousel_header'><li class=\"io_recs_title\"><h3 class=\"h3text\">&nbsp;"+mygallery_header_bottom+"</h3></li>"});
}
if($("#BN_PLP_Recs").length>0){
if(document.location.pathname.split("/")[3]=="ecatalog"){
}else{
}
}
cmDisplayRecs();
});
function createImageUrl(_283){
return (document.location.protocol+"//"+document.location.hostname+"/images/products/100x100/"+_283.substring(_283.lastIndexOf("/")+1));
};
function createScene7ImageUrl(_284){
return ("//imageserver.grainger.com/is/image/Grainger/"+_284.substring(_284.lastIndexOf("/")+1,_284.lastIndexOf("."))+"?$xlswatch$");
};
function bnLinkClickTag(_285,a){
var url;
url=document.location.protocol+"//"+document.location.hostname+"/Grainger/items/"+_285;
a.href=url;
};
function bnCmClickTag(_288,_289,a){
var url;
url=document.location.protocol+"//"+document.location.hostname+"/Grainger/items/"+_288;
if(document.location.pathname.split("/")[3]=="ecatalog"){
cmCreateManualLinkClickTag("/Grainger/items/"+_288+"?cm_sp=BN-_-L1-_-TOPSELLERS&cm_vc=BNSFTS","BN_item_position_"+(_289+1),"/Grainger/wwg/enCategoryNavigation.jsp?page=L1:1022");
url=url+"?cm_sp=BN-_-L1-_-TOPSELLERS&cm_vc=BNSFTS";
}else{
cmCreateManualLinkClickTag("/Grainger/items/"+_288+"?cm_sp=BN-_-L2-_-TOPSELLERS&cm_vc=BNFFTS","BN_item_position_"+(_289+1),"/Grainger/wwg/enCategoryNavigation.jsp?page=L2:1022");
url=url+"?cm_sp=BN-_-L2-_-TOPSELLERS&cm_vc=BNFFTS";
}
a.href=url;
};
function bnIoAdd(_28c,_28d,a){
var url;
if(document.location.pathname.indexOf("wwg")>-1){
url=document.location.protocol+"//"+document.location.hostname+document.location.pathname.slice(0,document.location.pathname.lastIndexOf("/")+1)+"singleItemAddToOrder.shtml";
}else{
url=document.location.protocol+"//"+document.location.hostname+"/Grainger/wwg/singleItemAddToOrder.shtml";
}
var _290=document.getElementById(_28d).value;
url=url+"?";
if(document.location.pathname.split("/")[3]=="ecatalog"){
url=url+"cm_sp=BN-_-L1-_TOPSELLERS&cm_vc=BNSFTS";
}else{
url=url+"cm_sp=BN-_-L2-_TOPSELLERS&cm_vc=BNFFTS";
}
url=url+"&itemList[0].product.itemNumber="+_28c+"&itemList[0].quantity="+_290;
if(navigator.appName=="Microsoft Internet Explorer"){
url=url+"&IEHtml=true";
}
a.href=url;
};
function ioAdd(_291,csNo,act,_294,cmvc,a){
var n=parseInt(csNo);
var _298=document.getElementsByName(_294);
var url;
if(document.location.pathname.indexOf("wwg")>-1){
url=document.location.protocol+"//"+document.location.hostname+document.location.pathname.slice(0,document.location.pathname.lastIndexOf("/")+1)+"singleItemAddToOrder.shtml";
}else{
url=document.location.protocol+"//"+document.location.hostname+"/Grainger/wwg/singleItemAddToOrder.shtml";
}
var _29a=0;
if(undefined==_298.length){
_29a=_298.value;
}else{
_29a=_298[n].value;
}
if(cmvc!=""){
url=url+cmvc;
}else{
url=url+"?";
}
url=url+"&itemList[0].product.itemNumber="+_291+"&itemList[0].quantity="+_29a;
if(navigator.appName=="Microsoft Internet Explorer"){
url=url+"&IEHtml=true";
}
a.href=url;
};
function ioAddToOrder(_29b,csNo,_29d,_29e){
var n=parseInt(csNo);
var _2a0=document.getElementById("mediaCode").value;
var _2a1=document.getElementsByName(_29d+"_qty");
var _2a2=document.getElementsByName(_29d+"_btn_ato");
var _2a3=document.getElementsByName(_29d+"_ajaxRunning");
var _2a4=0;
if(undefined==_2a1.length){
if(_2a3.value=="yes"){
return;
}else{
_2a3.value="yes";
}
_2a4=_2a1.value;
ctlBtn=_2a2.src;
_2a2.src="/images/spinner-anim.gif";
}else{
if(_2a3[n].value=="yes"){
return;
}else{
_2a3[n].value="yes";
}
_2a4=_2a1[n].value;
ctlBtn=_2a2[n].src;
_2a2[n].src="/images/spinner-anim.gif";
}
if(document.getElementById("addToOrderProgressIndicator")!=null){
document.getElementById("addToOrderProgressIndicator").style.display="inline";
}
var _2a5=document.getElementById("itemsForm");
document.itemsForm.pageKey.value="OrderForm";
document.getElementById("mediaCode").value=_29e;
document.getElementById("quantity").value=_2a4;
document.getElementById("item").value=_29b;
if(document.location.pathname.indexOf("wwg")>-1){
urlLink=document.location.protocol+"//"+document.location.hostname+document.location.pathname.slice(0,document.location.pathname.lastIndexOf("/")+1)+"singleItemAddToOrderAjax.shtml";
}else{
urlLink=document.location.protocol+"//"+document.location.hostname+"/Grainger/wwg/singleItemAddToOrderAjax.shtml";
}
var _2a6={url:urlLink,formNode:_2a5,method:"POST",mimetype:"text/html",load:function(type,_2a8,evt){
processAjaxResponse(_2a8);
if(undefined==_2a1.length){
_2a1.value="Qty";
_2a2.src=ctlBtn;
_2a3.value="no";
}else{
_2a1[n].value="Qty";
_2a2[n].src=ctlBtn;
_2a3[n].value="no";
}
location.hash=_29b+"_itemList";
if(document.getElementById("isEsv").value!="true"){
fireShoppingCartTag("/wwg/order/orderForm.jsp");
}
document.getElementById("quantity").value="";
document.getElementById("item").value="Item #";
document.getElementById("mediaCode").value=_2a0;
document.getElementById("addToOrderProgressIndicator").style.display="none";
},error:function(type,_2ab){
alert("Error order form single item add: "+_2ab.type);
}};
dojoBind({bindObj:_2a6,none:new Array("addToOrderProgressIndicator")});
};
