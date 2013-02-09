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
var _5=_4.substring(_4.indexOf("?")+1,_4.indexOf("="));
var _6="";
var _7=unescape(_4.substring(_4.indexOf("=")+1,_4.length));
if(_7.indexOf("&")!=-1){
var _8=_7.split("&");
if(_8[0]!=""&&_8[1]!=""){
_6=(_8[0].substring(0,6)+"&"+_8[1].substring(0,7));
}
}
if(_5=="s1"){
setCookie("sourcecode",_6,now);
}
}
function getVersion(_9){
var _a=navigator.userAgent.toLowerCase().indexOf(_9);
var re=/\d/ig;
if(navigator.userAgent.toLowerCase().indexOf(_9)!=-1){
return navigator.userAgent.toLowerCase().substring(_a,_a+_9.length+5).match(re)[0];
}
return false;
}
function fhrase(_c){
var _d="";
var _e=_c.phrase.value;
var _f="";
if(_c.phrase.value==""){
alert("Please enter your search term(s).");
return (false);
}else{
if(_e.length<3){
alert("Please enter at least three characters.");
return (false);
}else{
_f=isUnwantChar(_e,"\"");
_c.phrase.value=_f;
if(_f.length<3){
alert("Please enter at least three characters.");
return (false);
}
}
}
_e=_e.replace("&","%26");
var _10="http://search.replacements.com/texis/search?order=ClientCount-d&query="+_e;
_c.action=_10;
return (true);
}
function setCookie(_11,_12,_13,_14,_15,_16){
var _14="/";
var _17=_11+"="+escape(_12)+((_13)?"; expires="+_13.toGMTString():"")+((_14)?"; path="+_14:"")+((_15)?"; domain="+_15:"")+((_16)?"; secure":"");
document.cookie=_17;
}
function getCookie(_18){
var dc=document.cookie;
var _1a=_18+"=";
var _1b=dc.indexOf("; "+_1a);
if(_1b==-1){
_1b=dc.indexOf(_1a);
if(_1b!=0){
return null;
}
}else{
_1b+=2;
}
var end=document.cookie.indexOf(";",_1b);
if(end==-1){
end=dc.length;
}
return unescape(dc.substring(_1b+_1a.length,end));
}
function deleteCookie(_1d,_1e,_1f){
var _1e="/";
if(getCookie(_1d)){
document.cookie=_1d+"="+((_1e)?"; path="+_1e:"")+((_1f)?"; domain="+_1f:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
}
function strClip(_20){
if(!(_20==null||_20=="")){
this.clip=_20.split("|");
}
}
function markCart(_21,_22){
var _23="";
if(_22=="order"){
for(i=1;i<=10;i++){
var _24="cartItem"+i;
if((getCookie(_24)!=null)&&(getCookie(_24).indexOf(_21)!=-1)){
strClip(getCookie(_24));
_23=this.clip[7]+"|true";
}
}
}else{
if(_22=="reg"){
for(i=1;i<=10;i++){
var _25="pattern"+i;
if((getCookie(_25)!=null)&&(getCookie(_25).indexOf(_21)!=-1)){
strClip(getCookie(_25));
_23=this.clip[6]+"|true";
}
}
}
}
return _23;
}
function isUnwantChar(_26,_27){
var _28="";
for(var i=0;i<_26.length;i++){
var _2a=_26.charAt(i);
if(_27.indexOf(_2a)==-1){
_28+=_2a;
}
}
return _28;
}
function sniffIE(){
var _2b=navigator.userAgent.toLowerCase();
if(_2b.indexOf("windows 98")!=-1||_2b.indexOf("windows 95")!=-1){
return true;
}
return false;
}
function shoppingCart(_2c,_2d){
if(_2d==null){
_2d=_2c.substring(_2c.lastIndexOf("|")+1,_2c.length);
_2c=_2c.substring(0,_2c.lastIndexOf("|"));
}
if(_2c.indexOf("&#146;")!=-1|_2c.indexOf("&quot;")!=-1){
_2c=isUnwantChar(_2c,"~$'");
}else{
_2c=isUnwantChar(_2c,"#&;~$'");
}
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(_2c);
optionBox=createOptions(this.clip[6],_2d);
}
}
if(contingenQ=="Q"){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if((getQuery.indexOf("mkd")!=-1)&&(getQuery.substring(getQuery.indexOf("mkd")+4,getQuery.length).length>=8)){
if(subDate()==true){
strClip(_2c);
setCookie("onsale","onsale",now);
var _2e=this.clip[8];
if(_2e.length==4){
_2e="&nbsp;$"+_2e;
}
if(_2e.length==5){
_2e="$"+_2e;
}else{
if(this.clip[3].length==6){
_2e="$"+_2e;
}
}
var off=this.clip[7];
if(this.clip[7].length==1){
off="&nbsp;&nbsp;"+parseInt(this.clip[7]);
}
if(this.clip[7]!=0){
document.write("&nbsp;"+off+"</td><td align=\"right\">"+_2e+"&nbsp;</td><td>");
}else{
document.write("&nbsp;</td><td>&nbsp;</td><td>");
}
}
}
strClip(_2c);
if(this.clip[3]!="OTP"){
if(this.clip[6]!="0"){
if(markCart(_2d,"order").indexOf("true")!=-1){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(markCart(_2d,"order"));
document.write(optionBox);
document.forms["cart"].elements[_2d].options[this.clip[0]-1].selected=true;
}
}
document.write("<a href=\"javascript:cartQuote('"+_2c+"|"+_2d+"|','"+_2d+"')\"><img src=\""+addInCart+"\" border=\"0\" name=\""+_2d+"\" align=\"absmiddle\"></a>");
}else{
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
document.write(optionBox);
}
}
document.write("<a href=\"javascript:cartQuote('"+_2c+"|"+_2d+"|','"+_2d+"')\"><img src=\""+addToCart+"\" border=\"0\" name=\""+_2d+"\" align=\"absmiddle\"></a>");
}
}
}else{
if(shutDownOTP==false){
if(this.clip[3]=="OTP"){
if(markCart(_2d,"reg").indexOf("true")!=-1){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
strClip(markCart(_2d,"reg"));
var _30=document.cookie.split(";");
for(i in _30){
if(_30[i].indexOf(_2d)!=-1){
var _31=unescape(_30[i]);
var _32=_31.substring(_31.lastIndexOf("|")+1,_31.length);
optionBox=createOptions(_32,_2d);
}
}
document.write(optionBox);
document.forms["cart"].elements[_2d].options[this.clip[0]-1].selected=true;
}
}
document.write("<a href=\"javascript:pcRequest('"+_2c+"|"+_2d+"|','"+_2d+"')\"><img src=\""+addInRegister+"\" border=\"0\" name=\""+_2d+"\" align=\"absmiddle\"></a>");
}else{
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
if(!sniffIE()){
document.write(optionBox);
}
}
document.write("<a href=\"javascript:pcRequest('"+_2c+"|"+_2d+"|','"+_2d+"')\"><img src=\""+addToRegister+"\" border=\"0\" name=\""+_2d+"\" align=\"absmiddle\"></a>");
}
}
}
}
}
}
}
function createOptions(_33,_34){
var _35="";
for(var i=1;i<=_33;i++){
if(i<10){
_35+="<option value=\""+i+"\">&nbsp; "+i+"</option>";
}else{
_35+="<option value=\""+i+"\">"+i+"</option>";
}
}
return "<select name=\""+_34+"\">"+_35+"</select>";
}
function drawClear(_37,_38){
if(contingenC=="C"){
if((getVersion("msie")>=4)||(getVersion("mozilla")>=5)||getVersion("opera")>=5){
document.write("<a href="+"\""+"javascript:remove("+"'"+_37+"')\">"+"<img"+" src="+"\""+_38+"\""+" border="+"\""+"0"+"\"></a>");
}
}
}
function cookieDelete(_39,_3a,_3b){
for(i=_3a;i<=_3b;i++){
var _3c=_39+i;
deleteCookie(_3c);
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
var _3e=getQuery.substring(getQuery.indexOf("=")+1,getQuery.length);
if(_3e.length>0){
var _3f=getQuery.match(re).toString().replace(re,"$1/$2/$3");
var _40=_3f.split(",")[0];
var _41=new Date(_40);
_41.setDate(_41.getDate()-30);
var _42=new Date(_40);
_42.setDate(_42.getDate()+31);
var _43=new Date();
if(_43.getMonth()>8){
return false;
}else{
if(_41<_43&&_42>_43){
return true;
}
}
}
return false;
}
function setEncrypt(_44,_45){
var _46="";
if(_45==true){
for(var i=0;i<_44.length;i++){
_46+=_44.charCodeAt(i)+",";
}
}else{
var _48=_44.split(",");
for(var i=0;i<_48.length;i++){
_46+=String.fromCharCode(_48[i]);
}
}
return _46;
}
function setProperCase(_49){
var _4a="";
var _4b=_49.length;
if(_4b==0){
return "";
}
var _4c=false;
_4a+=_49.charAt(0).toUpperCase();
for(var _4d=1;_4d<_4b;_4d++){
if(_4c==true){
_4a+=_49.charAt(_4d).toUpperCase();
}else{
_4a+=_49.charAt(_4d).toLowerCase();
}
var _4e=_49.charCodeAt(_4d);
if(_4e==32||_4e==45||_4e==46){
_4c=true;
}else{
_4c=false;
}
if(_4e==99||_4e==67){
if(_49.charCodeAt(_4d-1)==77||_49.charCodeAt(_4d-1)==109){
_4c=true;
}
}
}
return _4a;
}
function disableReturnKey(evt){
var evt=(evt)?evt:((event)?event:null);
var _50=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);
if((evt.keyCode==13)&&(_50.type=="text")){
if(_50.name=="phrase"||_50.name=="query"){
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

