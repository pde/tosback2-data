
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};
if(typeof(strName) == 'tb_pathToImage') {
var tb_pathToImage = "/extension/csm_base/design/csm_design/images/loadingAnimation.gif";
}
jQuery(document).ready(function(){
tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
imgLoader = new Image();// preload image
imgLoader.src = tb_pathToImage;
});
function tb_init(domChunk){
jQuery(domChunk).click(function(){
var t = this.title || this.name || null;
var a = this.href || this.alt;
var g = this.rel || false;
tb_show(t,a,g);
this.blur();
return false;
});
}
function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
try {
if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
jQuery("body","html").css({height: "100%", width: "100%"});
jQuery("html").css("overflow","hidden");
if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
jQuery("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
jQuery("#TB_overlay").click(tb_remove);
}
}else{//all others
if(document.getElementById("TB_overlay") === null){
jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
jQuery("#TB_overlay").click(tb_remove);
}
}
if(tb_detectMacXFF()){
jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
}else{
jQuery("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
}
if(caption===null){caption="";}
jQuery("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
jQuery('#TB_load').show();//show loader
var baseURL;
if(url.indexOf("?")!==-1){ //ff there is a query string involved
baseURL = url.substr(0, url.indexOf("?"));
}else{
baseURL = url;
}
var urlString = /\.jpg$|\.jpe$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
var urlType = baseURL.toLowerCase().match(urlString);
if(urlType == '.jpg' || urlType == '.jpe' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
TB_PrevCaption = "";
TB_PrevURL = "";
TB_PrevHTML = "";
TB_NextCaption = "";
TB_NextURL = "";
TB_NextHTML = "";
TB_imageCount = "";
TB_FoundURL = false;
if(imageGroup){
TB_TempArray = jQuery("a[@rel="+imageGroup+"]").get();
for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
if (!(TB_TempArray[TB_Counter].href == url)) {
if (TB_FoundURL) {
TB_NextCaption = TB_TempArray[TB_Counter].title;
TB_NextURL = TB_TempArray[TB_Counter].href;
TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
} else {
TB_PrevCaption = TB_TempArray[TB_Counter].title;
TB_PrevURL = TB_TempArray[TB_Counter].href;
TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
}
} else {
TB_FoundURL = true;
TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);
}
}
}
imgPreloader = new Image();
imgPreloader.onload = function(){
imgPreloader.onload = null;
var pagesize = tb_getPageSize();
var x = pagesize[0] - 150;
var y = pagesize[1] - 150;
var imageWidth = imgPreloader.width;
var imageHeight = imgPreloader.height;
if (imageWidth > x) {
imageHeight = imageHeight * (x / imageWidth);
imageWidth = x;
if (imageHeight > y) {
imageWidth = imageWidth * (y / imageHeight);
imageHeight = y;
}
} else if (imageHeight > y) {
imageWidth = imageWidth * (y / imageHeight);
imageHeight = y;
if (imageWidth > x) {
imageHeight = imageHeight * (x / imageWidth);
imageWidth = x;
}
}
TB_WIDTH = imageWidth + 30;
TB_HEIGHT = imageHeight + 60;
jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>");
jQuery("#TB_closeWindowButton").click(tb_remove);
if (!(TB_PrevHTML === "")) {
function goPrev(){
if(jQuery(document).unbind("click",goPrev)){jQuery(document).unbind("click",goPrev);}
jQuery("#TB_window").remove();
jQuery("body").append("<div id='TB_window'></div>");
tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
return false;
}
jQuery("#TB_prev").click(goPrev);
}
if (!(TB_NextHTML === "")) {
function goNext(){
jQuery("#TB_window").remove();
jQuery("body").append("<div id='TB_window'></div>");
tb_show(TB_NextCaption, TB_NextURL, imageGroup);
return false;
}
jQuery("#TB_next").click(goNext);
}
document.onkeydown = function(e){
if (e == null) { // ie
keycode = event.keyCode;
} else { // mozilla
keycode = e.which;
}
if(keycode == 27){ // close
tb_remove();
} else if(keycode == 190){ // display previous image
if(!(TB_NextHTML == "")){
document.onkeydown = "";
goNext();
}
} else if(keycode == 188){ // display next image
if(!(TB_PrevHTML == "")){
document.onkeydown = "";
goPrev();
}
}
};
tb_position();
jQuery("#TB_load").remove();
jQuery("#TB_ImageOff").click(tb_remove);
jQuery("#TB_window").css({display:"block"}); //for safari using css instead of show
};
imgPreloader.src = url;
}else{//code to show html
var queryString = url.replace(/^[^\?]+\??/,'');
var params = tb_parseQuery( queryString );
TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
ajaxContentW = TB_WIDTH - 30;
ajaxContentH = TB_HEIGHT - 45;
if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window
urlNoQuery = url.split('TB_');
jQuery("#TB_iframeContent").remove();
if(params['modal'] != "true"){//iframe no modal
jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
}else{//iframe modal
jQuery("#TB_overlay").unbind();
jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
}
}else{// not an iframe, ajax
if(jQuery("#TB_window").css("display") != "block"){
if(params['modal'] != "true"){//ajax no modal
jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
}else{//ajax modal
jQuery("#TB_overlay").unbind();
jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
}
}else{//this means the window is already up, we are just loading new content via ajax
jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
jQuery("#TB_ajaxContent")[0].scrollTop = 0;
jQuery("#TB_ajaxWindowTitle").html(caption);
}
}
jQuery("#TB_closeWindowButton").click(tb_remove);
if(url.indexOf('TB_inline') != -1){
jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
jQuery("#TB_window").unload(function () {
jQuery('#' + params['inlineId']).append( jQuery("#TB_ajaxContent").children() ); // move elements back when you're finished
});
tb_position();
jQuery("#TB_load").remove();
jQuery("#TB_window").css({display:"block"});
}else if(url.indexOf('TB_iframe') != -1){
tb_position();
if($.browser.safari){//safari needs help because it will not fire iframe onload
jQuery("#TB_load").remove();
jQuery("#TB_window").css({display:"block"});
}
}else{
jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
tb_position();
jQuery("#TB_load").remove();
tb_init("#TB_ajaxContent a.thickbox");
jQuery("#TB_window").css({display:"block"});
});
}
}
if(!params['modal']){
document.onkeyup = function(e){
if (e == null) { // ie
keycode = event.keyCode;
} else { // mozilla
keycode = e.which;
}
if(keycode == 27){ // close
tb_remove();
}
};
}
} catch(e) {
}
}
function tb_showIframe(){
jQuery("#TB_load").remove();
jQuery("#TB_window").css({display:"block"});
}
function tb_remove() {
jQuery("#TB_imageOff").unbind("click");
jQuery("#TB_closeWindowButton").unbind("click");
jQuery("#TB_window").fadeOut("fast",function(){jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
jQuery("#TB_load").remove();
if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
jQuery("body","html").css({height: "auto", width: "auto"});
jQuery("html").css("overflow","");
}
document.onkeydown = "";
document.onkeyup = "";
return false;
}
function tb_position() {
jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
}
}
function tb_parseQuery ( query ) {
var Params = {};
if ( ! query ) {return Params;}// return empty object
var Pairs = query.split(/[;&]/);
for ( var i = 0; i < Pairs.length; i++ ) {
var KeyVal = Pairs[i].split('=');
if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
var key = unescape( KeyVal[0] );
var val = unescape( KeyVal[1] );
val = val.replace(/\+/g, ' ');
Params[key] = val;
}
return Params;
}
function tb_getPageSize(){
var de = document.documentElement;
var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
arrayPageSize = [w,h];
return arrayPageSize;
}
function tb_detectMacXFF() {
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
return true;
}
}
(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;
wireUpPopups = function() {
jQuery('a.popup').each(function() {
if (jQuery(this).attr('href').length > 0) {
jQuery(this).click(function() {
popWindow(jQuery(this).attr('href'));
return false;
});
}
});
}
popWindow = function(url) {
window.open(url, "Popup", "width=440,height=455, scrollbars=yes");
}
jQuery(document).ready(function() {
wireUpPopups();
});
function pgallerycarousel_initCallback(carousel) {		jQuery('#pScrollH').append('<a href="#" id="pgallerycarousel-prev"><img src="/extension/csm_base/design/csm_design/images/btn_prev.gif" alt="Previous" height="12" width="6"  /></a><a href="#" id="pgallerycarousel-next"><img src="/extension/csm_base/design/csm_design/images/btn_next.gif" alt="Next" height="12" width="6"  /></a>');
jQuery('#pgallerycarousel-next').bind('click', function() {			carousel.next();
return false;
});
jQuery('#pgallerycarousel-prev').bind('click', function() {			carousel.prev();
return false;
});};
function pgalleryvertcarousel_initCallback(carousel) {		jQuery('#pScrollV').append('<a href="#" id="pgalleryvertcarousel-prev"><img src="/extension/csm_base/design/csm_design/images/btn_prev.gif" alt="Previous" height="12" width="6"  /></a><a href="#" id="pgalleryvertcarousel-next"><img src="/extension/csm_base/design/csm_design/images/btn_next.gif" alt="Next" height="12" width="6"  /></a>');
jQuery('#pgalleryvertcarousel-next').bind('click', function() {			carousel.next();
return false;
});
jQuery('#pgalleryvertcarousel-prev').bind('click', function() {			carousel.prev();
return false;
});};
function pgallerycarousel_itemVisibleInCallbackBeforeAnimation(carousel, item, idx, state) {	jQuery('#psCountH').text("(" + idx + " of " + carousel.size() + ")");
jQuery('#pgallerycarousel_caption').text(pgallerycarousel_itemList[idx-1].caption);
jQuery('#pgallerycarousel_credit').html(pgallerycarousel_itemList[idx-1].credit);
jQuery('#pgallerycarousel_related').html(pgallerycarousel_itemList[idx-1].related);
jQuery('#pgallerycarousel_enlarge').attr("href", pgallerycarousel_itemList[idx-1].url_lg);
if (state == 'init')
return;};
function pgallerycarousel_itemVisibleInCallbackAfterAnimation(carousel, item, idx, state) {	if (state == 'init')
return;};
function pgalleryvertcarousel_itemVisibleInCallbackBeforeAnimation(carousel, item, idx, state) {	jQuery('#psCountV').text("(" + idx + " of " + carousel.size() + ")");
jQuery('#pgalleryvertcarousel_caption').text(pgalleryvertcarousel_itemList[idx-1].caption);
jQuery('#pgalleryvertcarousel_credit').text(pgalleryvertcarousel_itemList[idx-1].credit);
jQuery('#pgalleryvertcarousel_related').html(pgalleryvertcarousel_itemList[idx-1].related);
jQuery('#pgalleryvertcarousel_enlarge').attr("href", pgalleryvertcarousel_itemList[idx-1].url_lg);
if (state == 'init')
return;};
function pgalleryvertcarousel_itemVisibleInCallbackAfterAnimation(carousel, item, idx, state) {	if (state == 'init')
return;};
function RightslinkPopUp() {
var url = "https://s100.copyright.com/servlet/DispatchServlet";
var location = url
+ "?PublisherName=" + escape( "The Christian Science Monitor" )
+ "&publication=" + escape( "The Christian Science Monitor" )
+ "&Title=" + escape(md_headline)
+ "&PublicationDate=" + escape(md_date_parsed)
+ "&Author=" + escape(md_byline)
+ "&Install=S"
+ "&ContentID=" + escape( md_base_path.replace(/\.html$/,'') );
PopUp = window.open( location, 'Rightslink', 'location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550');
}
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
function setQuizCookie( quiz_id, item_id, value, correct )
{
var cookie_str = jQuery.cookie( 'csm_quiz' );
if( cookie_str )
{
var csm_quiz_data = jQuery.deparam( cookie_str );
}
else
{
var csm_quiz_data = new Object();
}
var key = quiz_id + '-' + item_id;
csm_quiz_data[ key ] = value + '-' + correct;
jQuery.cookie( 'csm_quiz', jQuery.param( csm_quiz_data ) );
}
function getQuizCookie( quiz_id )
{
var returnObj = new Object();
var cookie_str = jQuery.cookie( 'csm_quiz' );
if( cookie_str )
{
var csm_quiz_data = jQuery.deparam( cookie_str );
}
else
{
var csm_quiz_data = new Object();
}
jQuery.each( csm_quiz_data, function( key )
{
keyParts = key.split( '-' );
if( keyParts.length == 2 )
{
loopQuizId = keyParts[ 0 ];
if( loopQuizId == quiz_id )
{
valueParts = this.split( '-' );
returnObj[ keyParts[ 1 ] ] = { 'value' : valueParts[ 0 ], 'correct' : valueParts[ 1 ] };
}
}
});
return returnObj;
}
function getQuizCookiePage( quiz_id, item_id )
{
var returnVal = null;
var quizValues = getQuizCookie( quiz_id );
jQuery.each( quizValues, function( key )
{
if( key == item_id )
{
returnVal = this[ 'value' ];
}
});
return returnVal;
}
function getQuizCookiePageCorrect( quiz_id, item_id )
{
var returnVal = null;
var quizValues = getQuizCookie( quiz_id );
jQuery.each( quizValues, function( key )
{
if( key == item_id )
{
returnVal = this[ 'correct' ];
}
});
return returnVal;
}
function getQuizCookieTotalCorrect( quiz_id )
{
var returnVal = 0;
var quizValues = getQuizCookie( quiz_id );
jQuery.each( quizValues, function( key )
{
if( this[ 'correct' ] == 1 )
{
returnVal++;
}
});
return returnVal;
}
jQuery(function()
{
if (jQuery.trim(jQuery('#query')[0].value).length != 0) {
jQuery('#searchLabel').addClass('hidden');
}
jQuery('#query').focus(function() {
jQuery('#searchLabel').addClass('hidden');
});
jQuery('#query').blur(function() {
if (jQuery.trim(this.value).length == 0) {
jQuery('#searchLabel').removeClass('hidden');
}
});
});
(function( $ ){
var methods = {
start :
function(options){
return this.each(function(){
var $this = $(this);
if( true == $this.data('rolling') ) return;
var opts = $.extend({}, $.fn.rollchildren.defaults, options);
if( 0 == opts.height )
opts.height = $this.children().first().height();
if( true == opts.pause_on_mouseover )
{
$this.hover(
function(){
$(this).rollchildren('pause', true);
},
function(){
$(this).rollchildren('pause', false);
});
}
if (null == $this.data('showing_item'))
{
$this.css({
'position' : 'relative',
'height':  opts.height
});
$this.children().css({
'position' : 'absolute',
'top' : opts.height,
'opacity':0});
}
$this.data('rolling', true);
$this.rollchildren('conti', opts);
});
},
stop  : function(){
return this.each(function(){
var $this = $(this);
$this.data('rolling', false);
});
},
pause : function(b){
return this.each(function(){
var $this = $(this);
$this.data('pause', b);
});
},
conti : function(options){
return this.each(function(){
var $this = $(this);
var first_item = $this.children().first();
var last_item =  $this.children().last();
if( false == $this.data('rolling') )
{
return;
}
if( true == $this.data('pause') )
{
setTimeout(
function(){
$this.rollchildren('conti', options)},
1000 );
return;
}
var next_item = null;
if ($this.data('showing_item'))
{
$this.data('showing_item').clearQueue();
$this.data('showing_item').animate(
options.roll_up_old_item?{'top' : -options.height, 'opacity':0}:{'opacity':0},
options.speed,
'swing',
function(){
$(this).css({
'top' : options.height
});
});
next_item = $this.data('showing_item').next();
}
if(null == next_item || null == next_item.html() )
next_item = first_item;
next_item.clearQueue();
next_item.animate(
{'top' : 0, 'opacity':1},
options.speed,
'swing'
);
$this.data('showing_item', next_item );
if( 1 >= $this.children().length )
return;
if( options.loop == false )
{
if( $this.data('showing_item').get(0) === last_item.get(0) )
return;
}
setTimeout(
function(){
$this.rollchildren('conti', options)},
options.delay_time );
});
}
};
$.fn.rollchildren = function(method, options){
if( methods[method] ){
return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
} else if ( typeof method == 'object' || !method ){
return methods.start.apply( this, arguments );
} else {
$.error( 'Method ' + method + ' does not exist on jQuery.rollchildren'  );
}
};
$.fn.rollchildren.defaults = {
delay_time : 3000,            // item showing delay time (millisecond).
loop : true,                  // If true, Loop on last item to first item.
pause_on_mouseover : true,    // If true, Puase on Mouseover.
roll_up_old_item : true,      // if ture, roll up old item.
speed: 'slow',                // itme moving speed, (slow or fast).
height : 0
};
})( jQuery );
