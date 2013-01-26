
/* iphone/ipad intercept */
var deviceAgent = navigator.userAgent.toLowerCase(),
isIPad = deviceAgent.match(/(ipad)/),
isIPhone = deviceAgent.match(/(iphone|ipod)/),
isdroidPhone = deviceAgent.match(/(android)/),
mi_isAndroid = deviceAgent.match(/android/i);
//cvpReady = false;
if($.cookie('iosint') != "yes"){ // if cookie doesnt exist show overlay
var vheight = document.documentElement["scrollHeight"];
vheight = vheight + 94;
if (isIPad) {
//$("<div id='ios-intercept'></div>").appendTo("body");
//$("<div class='img-v-wrap'></div>").appendTo("body");
$(".img-v-wrap").height(vheight);
$("#ios-intercept").load("/includes/mobile-intercept.jsp", function(){
//$(".img-v-wrap").slideDown(function(){
//$("#iPadWrap").fadeIn('slow');
//});
});
} else if(isIPhone){
//$("<div id='ios-intercept'></div>").appendTo("body");
//$("<div class='img-v-wrap'></div>").appendTo("body");
$(".img-v-wrap").height(vheight);
$("#ios-intercept").load("/includes/mobile-intercept.jsp" , function(){
//$(".img-v-wrap").slideDown(function(){
//$("#iPhoneWrap").fadeIn('slow');
//});
});
}
else if(mi_isAndroid && screen.width >= 1000){//android tablet
//$("<div id='ios-intercept'></div>").appendTo("body");
//$("<div class='img-v-wrap'></div>").appendTo("body");
$(".img-v-wrap").height(vheight);
$("#ios-intercept").load("/includes/mobile-intercept.jsp", function(){
//$(".img-v-wrap").slideDown(function(){
//$("#androidTabletWrap").fadeIn('slow');
//});
});
}
else if(mi_isAndroid && screen.width < 1000){//android phone
//$("<div id='ios-intercept'></div>").appendTo("body");
//$("<div class='img-v-wrap'></div>").appendTo("body");
$(".img-v-wrap").height(vheight);
$("#ios-intercept").load("/includes/mobile-intercept.jsp" , function(){
//$(".img-v-wrap").slideDown(function(){
//$("#androidPhoneWrap").fadeIn('slow');
//});
});
}
} 
