var registerMax=32;
var registerDefault=16;
var contingenX="X";
var contingenQ="Q";
var contingenC="C";
var contingenS="S";
var browser=navigator.appName.toLowerCase();
var version=parseFloat(navigator.appVersion);
var getQuery=document.location.toString();
var shutDownOTP=false;
var getDomain="www.replacements.com";
var setHTTP="http://";
var setHTTPS="https://";
var imgAddMore=setHTTPS+getDomain+"/order/images/addMore.gif";
var imgClear=setHTTPS+getDomain+"/order/images/clear.gif";
var addToCart=setHTTP+getDomain+"/images/addToCart.gif";
var addInCart=setHTTP+getDomain+"/images/addInCart.gif";
var addToRegister=setHTTP+getDomain+"/images/addToRegister.gif";
var addInRegister=setHTTP+getDomain+"/images/addInRegister.gif";
var docURL=document.URL;
var now=new Date();
now.setTime(now.getTime()+7776000000);
strExtract(getQuery);
getBack(getQuery);
var enableGoogleAnalytics=true;
function performGoogleAnalytics(){
return enableGoogleAnalytics;
}
function getBack(_1){
if(_1.indexOf("/order/order.htm?")!=-1&&_1.indexOf("#down")!=-1){
var _2=_1.substring(_1.indexOf("&")+1,_1.indexOf("#down"));
var _3=setHTTP+getDomain+_2;
setCookie("returnQuote",_3,now);
}
}
function strExtract(_4){
_4=_4.toLowerCase();
var _5=_4.substring(_4.indexOf("?")+1);
var _6="";
var _7="";
_6=_5.match(/s1=[a-zA-Z0-9]+\&\d+/);
if(_6!=null){
_6+="";
}
if(_6!=null){
setCookie("sourcecode",_6.substring(3),now);
if(_6.indexOf("gpla")!=-1){
_7=_5.match(/producttargetid=\d{11}/);
if(_7!=null){
_7+="";
}
if(_7!=null){
setCookie("ptid",_7.substring(16),now);
}
}
}
}
function getVersion(_8){
var _9=navigator.userAgent.toLowerCase().indexOf(_8);
var re=/\d/ig;
if(navigator.userAgent.toLowerCase().indexOf(_8)!=-1){
return navigator.userAgent.toLowerCase().substring(_9,_9+_8.length+5).match(re)[0];
}
return false;
}
function fhrase(_b){
var _c="";
var _d=_b.phrase.value;
var _e="";
if(_b.phrase.value==""){
alert("Please enter your search term(s).");
return (false);
}else{
if(_d.length<3){
alert("Please enter at least three characters.");
return (false);
}else{
_e=isUnwantChar(_d,"\"");
_b.phrase.value=_e;
if(_e.length<3){
alert("Please enter at least three characters.");
return (false);
}
}
}
_d=_d.replace("&","%26");
var _f="http://search.replacements.com/texis/search?order=ClientCount-d&query="+_d;
_b.action=_f;
return (true);
}
function setCookie(_10,_11,_12,_13,_14,_15){
var _13="/";
var _16=_10+"="+escape(_11)+((_12)?"; expires="+_12.toGMTString():"")+((_13)?"; path="+_13:"")+((_14)?"; domain="+_14:"")+((_15)?"; secure":"");
document.cookie=_16;
}
function getCookie(_17){
var dc=document.cookie;
var _19=_17+"=";
var _1a=dc.indexOf("; "+_19);
if(_1a==-1){
_1a=dc.indexOf(_19);
if(_1a!=0){
return null;
}
}else{
_1a+=2;
}
var end=document.cookie.indexOf(";",_1a);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_1a+_19.length,end));
}
function deleteCookie(_1c,_1d,_1e){
var _1d="/";
if(getCookie(_1c)){
document.cookie=_1c+"="+((_1d)?"; path="+_1d:"")+((_1e)?"; domain="+_1e:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
}
function strClip(_1f){
if(!(_1f==null||_1f=="")){
this.clip=_1f.split("|");
}
}
function markCart(_20,_21){
var _22="";
if(_21=="order"){
for(i=1;i<=10;i++){
var _23="cartItem"+i;
if((getCookie(_23)!=null)&&(getCookie(_23).indexOf(_20)!=-1)){
strClip(getCookie(_23));
_22=this.clip[7]+"|true";
}
}
}else{
if(_21=="reg"){
for(i=1;i<=10;i++){
var _24="pattern"+i;
if((getCookie(_24)!=null)&&(getCookie(_24).indexOf(_20)!=-1)){
strClip(getCookie(_24));
_22=this.clip[6]+"|true";
}
}
}
}
return _22;
}
function isUnwantChar(_25,_26){
var _27="";
for(var i=0;i<_25.length;i++){
var _29=_25.charAt(i);
if(_26.indexOf(_29)==-1){
_27+=_29;
}
}
return _27;
}
function sniffIE(){
var _2a=navigator.userAgent.toLowerCase();
if(_2a.indexOf("windows 98")!=-1||_2a.indexOf("windows 95")!=-1){
return true;
}
return false;
}
function shoppingCart(_2b,_2c){
if(_2c==null){
_2c=_2b.substring(_2b.lastIndexOf("|")+1,_2b.length);
_2b=_2b.substring(0,_2b.lastIndexOf("|"));
}
if(_2b.indexOf("&#146;")!=-1|_2b.indexOf("&quot;")!=-1){
_2b=isUnwantChar(_2b,"~$'");
}else{
_2b=isUnwantChar(_2b,"#&;~$'");
}
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(_2b);
optionBox=createOptions(this.clip[6],_2c);
}
}
if(contingenQ=="Q"){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if((getQuery.indexOf("mkd")!=-1)&&(getQuery.substring(getQuery.indexOf("mkd")+4,getQuery.length).length>=8)){
if(subDate()==true){
strClip(_2b);
setCookie("onsale","onsale",now);
var _2d=this.clip[8];
if(_2d.length==4){
_2d="&nbsp;$"+_2d;
}
if(_2d.length==5){
_2d="$"+_2d;
}else{
if(this.clip[3].length==6){
_2d="$"+_2d;
}
}
var off=this.clip[7];
if(this.clip[7].length==1){
off="&nbsp;&nbsp;"+parseInt(this.clip[7]);
}
if(this.clip[7]!=0){
document.write("&nbsp;"+off+"</td><td align=\"right\">"+_2d+"&nbsp;</td><td>");
}else{
document.write("&nbsp;</td><td>&nbsp;</td><td>");
}
}
}
strClip(_2b);
if(this.clip[3]!="OTP"){
if(this.clip[6]!="0"){
if(markCart(_2c,"order").indexOf("true")!=-1){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(markCart(_2c,"order"));
document.write(optionBox);
document.forms["cart"].elements[_2c].options[this.clip[0]-1].selected=true;
}
}
document.write("<a href=\"javascript:cartQuote('"+_2b+"|"+_2c+"|','"+_2c+"')\"><img src=\""+addInCart+"\" border=\"0\" name=\""+_2c+"\" align=\"absmiddle\"></a>");
}else{
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
document.write(optionBox);
}
}
document.write("<a href=\"javascript:cartQuote('"+_2b+"|"+_2c+"|','"+_2c+"')\"><img src=\""+addToCart+"\" border=\"0\" name=\""+_2c+"\" align=\"absmiddle\"></a>");
}
}
}else{
if(shutDownOTP==false){
if(this.clip[3]=="OTP"){
if(markCart(_2c,"reg").indexOf("true")!=-1){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(markCart(_2c,"reg"));
var _2f=document.cookie.split(";");
for(i in _2f){
if(_2f[i].indexOf(_2c)!=-1){
var _30=unescape(_2f[i]);
var _31=_30.substring(_30.lastIndexOf("|")+1,_30.length);
optionBox=createOptions(_31,_2c);
}
}
document.write(optionBox);
document.forms["cart"].elements[_2c].options[this.clip[0]-1].selected=true;
}
}
document.write("<a href=\"javascript:pcRequest('"+_2b+"|"+_2c+"|','"+_2c+"')\"><img src=\""+addInRegister+"\" border=\"0\" name=\""+_2c+"\" align=\"absmiddle\"></a>");
}else{
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
document.write(optionBox);
}
}
document.write("<a href=\"javascript:pcRequest('"+_2b+"|"+_2c+"|','"+_2c+"')\"><img src=\""+addToRegister+"\" border=\"0\" name=\""+_2c+"\" align=\"absmiddle\"></a>");
}
}
}
}
}
}
}
function createOptions(_32,_33){
var _34="";
for(var i=1;i<=_32;i++){
if(i<10){
_34+="<option value=\""+i+"\">&nbsp; "+i+"</option>";
}else{
_34+="<option value=\""+i+"\">"+i+"</option>";
}
}
return "<select name=\""+_33+"\">"+_34+"</select>";
}
function drawClear(_36,_37){
if(contingenC=="C"){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
document.write("<a href="+"\""+"javascript:remove("+"'"+_36+"')\">"+"<img"+" src="+"\""+_37+"\""+" border="+"\""+"0"+"\"></a>");
}
}
}
function cookieDelete(_38,_39,_3a){
for(i=_39;i<=_3a;i++){
var _3b=_38+i;
deleteCookie(_3b);
}
}
function extendTable(){
if(contingenS=="S"){
if((getQuery.indexOf("mkd")!=-1)&&(getQuery.substring(getQuery.indexOf("mkd")+4,getQuery.length).length>=8)){
if(subDate()==true){
if(getCookie("onsale")!=null){
return "<td><b>Sale<br>Disc.</b></td><td align=center><b>Sale<br>Price</b></td><td>&nbsp;</td><td>&nbsp;</td>";
}
}
}
}
return "";
}
this.cx=0;
function subDate(){
var re=/(\d{2})(\d{2})(\d{4})/ig;
var _3d=getQuery.substring(getQuery.indexOf("=")+1,getQuery.length);
if(_3d.length>0){
var _3e=getQuery.match(re).toString().replace(re,"$1/$2/$3");
var _3f=_3e.split(",")[0];
var _40=new Date(_3f);
_40.setDate(_40.getDate()-30);
var _41=new Date(_3f);
_41.setDate(_41.getDate()+31);
var _42=new Date();
if(_42.getMonth()>8){
return false;
}else{
if(_40<_42&&_41>_42){
return true;
}
}
}
return false;
}
function setEncrypt(_43,_44){
var _45="";
if(_44==true){
for(var i=0;i<_43.length;i++){
_45+=_43.charCodeAt(i)+",";
}
}else{
var _47=_43.split(",");
for(var i=0;i<_47.length;i++){
_45+=String.fromCharCode(_47[i]);
}
}
return _45;
}
function setProperCase(_48){
var _49="";
var _4a=_48.length;
if(_4a==0){
return "";
}
var _4b=false;
_49+=_48.charAt(0).toUpperCase();
for(var _4c=1;_4c<_4a;_4c++){
if(_4b==true){
_49+=_48.charAt(_4c).toUpperCase();
}else{
_49+=_48.charAt(_4c).toLowerCase();
}
var _4d=_48.charCodeAt(_4c);
if(_4d==32||_4d==45||_4d==46){
_4b=true;
}else{
_4b=false;
}
if(_4d==99||_4d==67){
if(_48.charCodeAt(_4c-1)==77||_48.charCodeAt(_4c-1)==109){
_4b=true;
}
}
}
return _49;
}
function disableReturnKey(evt){
var evt=(evt)?evt:((event)?event:null);
var _4f=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);
if((evt.keyCode==13)&&(_4f.type=="text")){
if(_4f.name=="phrase"||_4f.name=="query"){
return true;
}else{
return false;
}
}
}
document.onkeypress=disableReturnKey;
function resetInet(){
document.FrontPage_Form2.magazine.options[0].selected=true;
document.FrontPage_Form2.displaysource2.value="";
document.FrontPage_Form2.business.value="";
document.FrontPage_Form2.cc_acct.focus();
document.FrontPage_Form2.displaysource1.value=document.FrontPage_Form2.source.options[document.FrontPage_Form2.source.selectedIndex].text;
}
function resetMagBus(){
document.FrontPage_Form2.source.options[0].selected=true;
document.FrontPage_Form2.displaysource1.value="";
document.FrontPage_Form2.business.value="";
document.FrontPage_Form2.cc_acct.focus();
document.FrontPage_Form2.displaysource2.value=document.FrontPage_Form2.magazine.options[document.FrontPage_Form2.magazine.selectedIndex].text;
}
function resetOther(){
document.FrontPage_Form2.displaysource1.value="";
document.FrontPage_Form2.displaysource2.value="";
document.FrontPage_Form2.source.options[0].selected=true;
document.FrontPage_Form2.magazine.options[0].selected=true;
document.FrontPage_Form2.cc_acct.focus();
}
function resetregInet(){
document.forms[1].magazine.options[0].selected=true;
document.forms[1].pib.value="";
document.forms[1].comments.focus();
}
function resetregMagBus(){
document.forms[1].source.options[0].selected=true;
document.forms[1].pib.value="";
document.forms[1].comments.focus();
}
function resetregOther(){
document.forms[1].source.options[0].selected=true;
document.forms[1].magazine.options[0].selected=true;
document.forms[1].comments.focus();
}
function runGAcode(){
var ga="";
ga+="<!-- Begin Google Analytics New Code -->\n";
ga+="<script type=\"text/javascript\">\n";
ga+="try {\n";
ga+="var _gaq = _gaq || [];\n";
ga+="_gaq.push(['_setAccount', 'UA-10282148-1']);\n";
ga+="_gaq.push(['_setDomainName', '.replacements.com']);\n";
ga+="_gaq.push(['_trackPageview']);\n";
ga+="(function() {\n";
ga+="    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n";
ga+="    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n";
ga+="    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n";
ga+="})();\n";
ga+="} catch(err) {}\n";
ga+="</script>\n";
ga+="<!-- End Google Analytics New Code -->\n";
document.write(ga);
}
function runDapper(){
var dp="";
dp+="<!-- Dapper Remessaging Pixel -->\n";
dp+="<img width=\"1\" height=\"1\" border=\"0\" alt=\"\" src=\"http://px.admonkey.dapper.net/PixelMonkey?adId=customername&format=image&useReferrer=1\"/>\n";
dp+="<!-- End of Dapper Pixel tag -->\n";
document.write(dp);
}
function runAddThis(){
var ad="";
ad+="<div class=\"addthis\">\n";
ad+="<!-- AddThis Button BEGIN -->\n";
ad+="<script type=\"text/javascript\">\n";
ad+="var addthis_pub=\"replacements\";\n";
ad+="var addthis_disable_flash = true;\n";
ad+="</script>\n";
ad+="<a href=\"http://www.addthis.com/bookmark.php?v=20\" onMouseOver=\"return addthis_open(this, '', '[URL]', '[TITLE]')\" onMouseOut=\"addthis_close()\" onClick=\"return addthis_sendto()\"><img src=\"http://s7.addthis.com/static/btn/lg-share-en.gif\" width=\"125\" height=\"16\" alt=\"Bookmark and Share\" style=\"border:0\"/></a>\n";
ad+="<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/200/addthis_widget.js\"></script>\n";
ad+="<!-- AddThis Button END -->\n";
ad+="</div>\n";
document.write(ad);
}
function runGoogleRetarget(){
var gr="";
gr+="<!-- Google Code for Homepage visitors Remarketing List -->\n";
gr+="<script type=\"text/javascript\">\n";
gr+="<!--";
gr+="var google_conversion_id = 1072723650;\n";
gr+="var google_conversion_language = \"en\";\n";
gr+="var google_conversion_format = \"3\";\n";
gr+="var google_conversion_color = \"666666\";\n";
gr+="var google_conversion_label = \"ktBeCMGksAEQwu3B_wM\";\n";
gr+="var google_conversion_value = 0;\n";
gr+="//-->\n";
gr+="</script>\n";
gr+="<script type=\"text/javascript\" src=\"http://www.googleadservices.com/pagead/conversion.js\">\n";
gr+="</script>\n";
gr+="<noscript>\n";
gr+="<div style=\"display:inline;\">\n";
gr+="<img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"http://www.googleadservices.com/pagead/conversion/1072723650/?label=ktBeCMGksAEQwu3B_wM&amp;guid=ON&amp;script=0\"/>\n";
gr+="</div>\n";
gr+="</noscript>\n";
gr+="<!-- End Google Code for Homepage visitors Remarketing List -->\n";
document.write(gr);
}
function runGoogleRemarketing(){
var gr="";
gr+="<!-- Google Code for Main list -->\n";
gr+="<!-- Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. ";
gr+="For instructions on adding this tag and more information on the above requirements, read the setup guide: google.com/ads/remarketingsetup -->\n";
gr+="<script type=\"text/javascript\">\n";
gr+="/* <![CDATA[ */\n";
gr+="var google_conversion_id = 1072723650;\n";
gr+="var google_conversion_label = \"6PulCLu52QMQwu3B_wM\";\n";
gr+="var google_custom_params = window.google_tag_params;\n";
gr+="var google_remarketing_only = true;\n";
gr+="/* ]]> */\n";
gr+="</script>\n";
gr+="<script type=\"text/javascript\" src=\"";
gr+=("https:"==document.location.protocol?"https://www":"http://www");
gr+=".googleadservices.com/pagead/conversion.js\">\n";
gr+="</script>\n";
gr+="<noscript>\n";
gr+="<div style=\"display:inline;\">\n";
gr+="<img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"";
gr+=("https:"==document.location.protocol?"https://googleads":"http://googleads");
gr+=".g.doubleclick.net/pagead/viewthroughconversion/1072723650/?value=0&amp;label=6PulCLu52QMQwu3B_wM&amp;guid=ON&amp;script=0\"/>\n";
gr+="</div>\n";
gr+="</noscript>\n";
document.write(gr);
}
function runEFRegTrack(){
document.write("<img width=\"1\" height=\"1\" src=\"https://pixel1064.everesttech.net/1064/p?ev_reg_rev=100&ev_registrations=1\" />");
}
function runFBTags(){
var f1="";
f1+="<div id=\"fb-root\"></div>";
f1+="<!-- Start FB Like Button Script -->\n";
f1+="<div id=\"fb-root\"></div>\n";
f1+="<script>";
f1+="window.fbAsyncInit = function() {FB.init({appId: '129589480390332', status: true, cookie: true,xfbml: true}); }; (function() {  var e = document.createElement('script'); e.async = true;  e.src = document.location.protocol +'//connect.facebook.net/en_US/all.js';  document.getElementById('fb-root').appendChild(e);  }());\n";
f1+="</script>";
f1+="<!-- End FB Like Button Script -->\n";
document.write(f1);
}
function runShippingPromo(){
document.write("<br /><span style=\"color:#CC0099;font-weight:bold;\">Free Ground Shipping for Orders of $150.00 or More - </span><a href=\"../../shipping_promo.htm\">Click Here for Details!</a>");
}
function runShippingPromoWebquote(){
document.write("<span style=\"color:#CC0099;font-weight:bold;\">Free Ground Shipping for Orders of $150.00 or More - </span><a href=\"../../shipping_promo.htm\">Click Here for Details!</a>");
}
function runFBButton(){
document.write("<br /><span style=\"margin-top:-2px;color:#000080;\">  Be the first of your friends to like us on Facebook!<fb:like href=\"http://www.replacements.com/\" layout=\"button_count\"   show_faces=\"false\" style=\"margin-top:5px;padding-left:5px;\"></fb:like></span>");
}
function runFBShare(){
var fs="";
fs+="<div id=\"fb-root\"></div>\n";
fs+="<script>\n";
fs+="window.fbAsyncInit = function() {\n";
fs+="  FB.init({\n";
fs+="    appId: \"\",\n";
fs+="    xfbml: true,\n";
fs+="    cookie: true,\n";
fs+="    status: true\n";
fs+="  });\n";
fs+="};\n";
fs+="(function() {\n";
fs+="  var e = document.createElement('script'); e.async = true;\n";
fs+="  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';\n";
fs+="  document.getElementById('fb-root').appendChild(e);\n";
fs+="}());\n";
fs+="</script>\n";
fs+="<script>\n";
fs+="function doPublish() {\n";
fs+="  FB.ui({\n";
fs+="    method: \"stream.publish\",\n";
fs+="    attachment: {\n";
fs+="      name: \"I just found my favorite china, crystal and silverware patterns at Replacements, Ltd.\",\n";
fs+="      href: \"http://www.replacements.com?s1=FB&17&\",\n";
fs+="      description: \"Visit their site and you can find yours too! They have over 300,000 different patterns!\",\n";
fs+="      media: [\n";
fs+="        {\n";
fs+="          type: \"image\",\n";
fs+="          src: \"http://www.replacements.com/images/bob_montage_grouped_06032008_xara_v2_sharpened_15_text_left_aligned_95percent.jpg\",\n";
fs+="          href: \"http://www.replacements.com?s1=FB&17&\"\n";
fs+="        }\n";
fs+="      ]\n";
fs+="    }\n";
fs+="  });\n";
fs+="}\n";
fs+="</script>\n";
document.write(fs);
}
function runEveryPageIncludes(){
runGAcode();
runGoogleRemarketing();
}
function runGreyBarIncludes(){
runAddThis();
}
function runManuIncludes(){
}
function runPatternIncludes(){
}
function runHomePageIncludes(){
}
function runRegFormIncludes(){
}
function runRegConfIncludes(){
runEFRegTrack();
}
function runOrderConfIncludes(){
orderConfirmationPixels();
}
function runPageTopIncludes(){
}
function runPageMessageIncludes(){
runShippingPromo();
}
function runWebquoteMessageIncludes(){
document.write("<a href=\"/registration/form.htm?=freeemail3\" class=\"click\">Click Here For A <u>FREE E-mail Price List</u> Of Pieces In Your Pattern(s)!</a><br>\n");
runShippingPromoWebquote();
document.write("<br>\n");
}

