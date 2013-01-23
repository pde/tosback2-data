(function($){$.fn.placehold=function(options){var opts=$.extend({},$.fn.placehold.defaults,options);return this.each(function(){if(!("placeholder"in document.createElement("input"))){var placeholder_attr=$(this).attr("placeholder");if(placeholder_attr){var elem=$(this);if(!elem.val()||elem.val()==placeholder_attr){elem.addClass(opts.placeholderClassName).val(placeholder_attr)}elem.focus(function(){if(elem.val()==placeholder_attr){elem.removeClass(opts.placeholderClassName).val("")}});elem.blur(function(){if(!elem.val()){elem.addClass(opts.placeholderClassName).val(placeholder_attr)}});elem.closest("form").submit(function(){if(elem.val()==placeholder_attr){elem.val("")}return true})}}})};$.fn.placehold.defaults={placeholderClassName:"placeholder"}})(jQuery);jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};(function($){$.ceebox={version:"2.1.5"};$.fn.ceebox=function(opts){opts=$.extend({selector:$(this).selector},$.fn.ceebox.defaults,opts);var elem=this;var selector=$(this).selector;if(opts.videoJSON){$.getJSON(opts.videoJSON,function(json){$.extend($.fn.ceebox.videos,json);init(elem,opts,selector);});}else{init(elem,opts,selector);}
return this;};$.fn.ceebox.defaults={html:true,image:true,video:true,modal:false,titles:true,htmlGallery:true,imageGallery:true,videoGallery:true,videoWidth:false,videoHeight:false,videoRatio:"16:9",htmlWidth:false,htmlHeight:false,htmlRatio:false,imageWidth:600,imageHeight:600,animSpeed:"normal",easing:"swing",fadeOut:400,fadeIn:400,overlayColor:"#000",overlayOpacity:0.8,boxColor:"",textColor:"",borderColor:"",borderWidth:"3px",padding:15,margin:150,onload:null,unload:null,videoJSON:null,iPhoneRedirect:true};$.fn.ceebox.ratios={"4:3":1.333,"3:2":1.5,"16:9":1.778,"1:1":1,"square":1};$.fn.ceebox.relMatch={width:/(?:width:)([0-9]+)/i,height:/(?:height:)([0-9]+)/i,ratio:/(?:ratio:)([0-9\.:]+)/i,modal:/modal:true/i,nonmodal:/modal:false/i,videoSrc:/(?:videoSrc:)(http:[\/\-\._0-9a-zA-Z:]+)/i,videoId:/(?:videoId:)([\-\._0-9a-zA-Z:]+)/i};$.fn.ceebox.loader="<div id='cee_load' style='z-index:105;top:50%;left:50%;position:fixed'></div>";$.fn.ceebox.videos={base:{param:{wmode:"transparent",allowFullScreen:"true",allowScriptAccess:"always"},flashvars:{autoplay:true}},facebook:{siteRgx:/facebook\.com\/video/i,idRgx:/(?:v=)([a-zA-Z0-9_]+)/i,src:"http://www.facebook.com/v/[id]"},youtube:{siteRgx:/youtube\.com\/watch/i,idRgx:/(?:v=)([a-zA-Z0-9_\-]+)/i,src:"http://www.youtube.com/v/[id]&hl=en&fs=1&autoplay=1"},metacafe:{siteRgx:/metacafe\.com\/watch/i,idRgx:/(?:watch\/)([a-zA-Z0-9_]+)/i,src:"http://www.metacafe.com/fplayer/[id]/.swf"},google:{siteRgx:/google\.com\/videoplay/i,idRgx:/(?:id=)([a-zA-Z0-9_\-]+)/i,src:"http://video.google.com/googleplayer.swf?docId=[id]&hl=en&fs=true",flashvars:{playerMode:"normal",fs:true}},spike:{siteRgx:/spike\.com\/video|ifilm\.com\/video/i,idRgx:/(?:\/)([0-9]+)/i,src:"http://www.spike.com/efp",flashvars:{flvbaseclip:"[id]"}},vimeo:{siteRgx:/vimeo\.com\/[0-9]+/i,idRgx:/(?:\.com\/)([a-zA-Z0-9_]+)/i,src:"http://www.vimeo.com/moogaloop.swf?clip_id=[id]&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1"},dailymotion:{siteRgx:/dailymotion\.com\/video/i,idRgx:/(?:video\/)([a-zA-Z0-9_]+)/i,src:"http://www.dailymotion.com/swf/[id]&related=0&autoplay=1"},cnn:{siteRgx:/cnn\.com\/video/i,idRgx:/(?:\?\/video\/)([a-zA-Z0-9_\/\.]+)/i,src:"http://i.cdn.turner.com/cnn/.element/apps/cvp/3.0/swf/cnn_416x234_embed.swf?context=embed&videoId=[id]",width:416,height:374}};$.fn.ceebox.overlay=function(opts){opts=$.extend({width:60,height:30,type:"html"},$.fn.ceebox.defaults,opts);if($("#cee_overlay").size()===0){$("<div id='cee_overlay'></div>").css({opacity:opts.overlayOpacity,position:"absolute",top:0,left:0,backgroundColor:opts.overlayColor,width:"100%",height:$(document).height(),zIndex:100}).appendTo($("body"));}
if($("#cee_box").size()===0){var pos=boxPos(opts);var boxCSS={position:pos.position,zIndex:102,top:"50%",left:"50%",height:opts.height+"px",width:opts.width+"px",marginLeft:pos.mleft+'px',marginTop:pos.mtop+'px',opacity:0,borderWidth:opts.borderWidth,borderColor:opts.borderColor,backgroundColor:opts.boxColor,color:opts.textColor};$("<div id='cee_box'></div>").css(boxCSS).appendTo("body").animate({opacity:1},opts.animSpeed,function(){$("#cee_overlay").addClass("cee_close");});}
$("#cee_box").removeClass().addClass("cee_"+opts.type);if($("#cee_load").size()===0){$($.fn.ceebox.loader).appendTo("body");}
$("#cee_load").show("fast").animate({opacity:1},"fast");};$.fn.ceebox.popup=function(content,opts){var page=pageSize(opts.margin);opts=$.extend({width:page.width,height:page.height,modal:false,type:"html",onload:null},$.fn.ceebox.defaults,opts);var gallery,family;if($(content).is("a,area,input")&&(opts.type=="html"||opts.type=="image"||opts.type=="video")){if(opts.gallery){family=$(opts.selector).eq(opts.gallery.parentId).find("a[href],area[href],input[href]");}
Build[opts.type].prototype=new BoxAttr(content,opts);var cb=new Build[opts.type]();content=cb.content;opts.action=cb.action;opts.modal=cb.modal;if(opts.titles){opts.titleHeight=$(cb.titlebox).contents().contents().wrap("<div></div>").parent().attr("id","ceetitletest").css({position:"absolute",top:"-300px",width:cb.width+"px"}).appendTo("body").height();$("#ceetitletest").remove();opts.titleHeight=(opts.titleHeight>=10)?opts.titleHeight+20:30;}else{opts.titleHeight=0;}
opts.width=cb.width+2*opts.padding;opts.height=cb.height+opts.titleHeight+2*opts.padding;}
$.fn.ceebox.overlay(opts);base.action=opts.action;base.onload=opts.onload;base.unload=opts.unload;var pos=boxPos(opts);var animOpts={marginLeft:pos.mleft,marginTop:pos.mtop,width:opts.width+"px",height:opts.height+"px",borderWidth:opts.borderWidth};if(opts.borderColor){var reg=/#[1-90a-f]+/gi;var borderColor=cssParse(opts.borderColor,reg);animOpts=$.extend(animOpts,{borderTopColor:borderColor[0],borderRightColor:borderColor[1],borderBottomColor:borderColor[2],borderLeftColor:borderColor[3]});}
animOpts=(opts.textColor)?$.extend(animOpts,{color:opts.textColor}):animOpts;animOpts=(opts.boxColor)?$.extend(animOpts,{backgroundColor:opts.boxColor}):animOpts;$("#cee_box").animate(animOpts,opts.animSpeed,opts.easing,function(){var children=$(this).append(content).children().hide();var len=children.length;var onloadcall=true;children.fadeIn(opts.fadeIn,function(){if($(this).is("#cee_iframeContent")){onloadcall=false;}
if(onloadcall&&this==children[len-1]){$.fn.ceebox.onload();}});if(opts.modal===true){$("#cee_overlay").removeClass("cee_close");}else{$("<a href='#' id='cee_closeBtn' class='cee_close' title='Close'>close</a>").prependTo("#cee_box");if(opts.gallery){addGallery(opts.gallery,family,opts);}
keyEvents(gallery,family,opts.fadeOut);}});};$.fn.ceebox.closebox=function(fade,unload){fade=fade||400;$("#cee_box").fadeOut(fade);$("#cee_overlay").fadeOut((typeof fade=='number')?fade*2:"slow",function(){$('#cee_box,#cee_overlay,#cee_HideSelect,#cee_load').unbind().trigger("unload").remove();if(isFunction(unload)){unload();}else if(isFunction(base.unload)){base.unload();}
base.unload=null;});document.onkeydown=null;};$.fn.ceebox.onload=function(opts){$("#cee_load").hide(300).fadeOut(600,function(){$(this).remove();});if(isFunction(base.action)){base.action();base.action=null;}
if(isFunction(base.onload)){base.onload();base.onload=null;}};var base={};function init(elem,opts,selector){base.vidRegex=function(){var regStr="";$.each($.fn.ceebox.videos,function(i,v){if(v.siteRgx!==null&&typeof v.siteRgx!=='string'){var tmp=String(v.siteRgx);regStr=regStr+tmp.slice(1,tmp.length-2)+"|";}});return new RegExp(regStr+"\\.swf$","i");}();base.userAgent=navigator.userAgent;$(".cee_close").die().live("click",function(){$.fn.ceebox.closebox();return false;});if(selector!=false){$(elem).each(function(i){ceeboxLinkSort(this,i,opts,selector);});}
$(elem).live("click",function(e){var tgt=$(e.target).closest("[href]");var tgtData=tgt.data("ceebox");if(tgtData){var linkOpts=(tgtData.opts)?$.extend({},opts,tgtData.opts):opts;$.fn.ceebox.overlay(linkOpts);if(tgtData.type=="image"){var imgPreload=new Image();imgPreload.onload=function(){var w=imgPreload.width,h=imgPreload.height;linkOpts.imageWidth=getSmlr(w,$.fn.ceebox.defaults.imageWidth);linkOpts.imageHeight=getSmlr(h,$.fn.ceebox.defaults.imageHeight);linkOpts.imageRatio=w/h;$.fn.ceebox.popup(tgt,$.extend(linkOpts,{type:tgtData.type},{gallery:tgtData.gallery}));};imgPreload.src=$(tgt).attr("href");}else{$.fn.ceebox.popup(tgt,$.extend(linkOpts,{type:tgtData.type},{gallery:tgtData.gallery}));}
return false;}});}
var ceeboxLinkSort=function(parent,parentId,opts,selector){var family,cbLinks=[],galleryLinks=[],gNum=0;($(parent).is("[href]"))?family=$(parent):family=$(parent).find("[href]");var urlMatch={image:function(h,r){if(r&&r.match(/\bimage\b/i)){return true;}else{return h.match(/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/i)||false;}},video:function(h,r){if(r&&r.match(/\bvideo\b/i)){return true;}else{return h.match(base.vidRegex)||false;}},html:function(h){return true;}};var familyLen=family.length;family.each(function(i){var alink=this;var metadata=$.metadata?$(alink).metadata():false;var linkOpts=metadata?$.extend({},opts,metadata):opts;$.each(urlMatch,function(type){if(urlMatch[type]($(alink).attr("href"),$(alink).attr("rel"))&&linkOpts[type]){var gallery=false;if(linkOpts[type+"Gallery"]===true){galleryLinks[galleryLinks.length]=i;gallery=true;}
cbLinks[cbLinks.length]={linkObj:alink,type:type,gallery:gallery,linkOpts:linkOpts};return false;}});});var gLen=galleryLinks.length;$.each(cbLinks,function(i){if(cbLinks[i].gallery){var gallery={parentId:parentId,gNum:gNum,gLen:gLen};if(gNum>0){gallery.prevId=galleryLinks[gNum-1];}
if(gNum<gLen-1){gallery.nextId=galleryLinks[gNum+1];}
gNum++;}
if(!$.support.opacity&&$(parent).is("map")){$(cbLinks[i].linkObj).click(function(e){e.preventDefault();});}
$.data(cbLinks[i].linkObj,"ceebox",{type:cbLinks[i].type,opts:cbLinks[i].linkOpts,gallery:gallery});});};var BoxAttr=function(cblink,o){var w=o[o.type+"Width"];var h=o[o.type+"Height"];var r=o[o.type+"Ratio"]||w/h;var rel=$(cblink).attr("rel");if(rel&&rel!==""){var m={};$.each($.fn.ceebox.relMatch,function(i,v){m[i]=v.exec(rel);});if(m.modal){o.modal=true;}
if(m.nonmodal){o.modal=false;}
if(m.width){w=Number(lastItem(m.width));}
if(m.height){h=Number(lastItem(m.height));}
if(m.ratio){r=lastItem(m.ratio);r=(Number(r))?Number(r):String(r);}
if(m.videoSrc){this.videoSrc=String(lastItem(m.videoSrc));}
if(m.videoId){this.videoId=String(lastItem(m.videoId));}}
var p=pageSize(o.margin);w=getSmlr(w,p.width);h=getSmlr(h,p.height);if(r){if(!Number(r)){r=($.fn.ceebox.ratios[r])?Number($.fn.ceebox.ratios[r]):1;}
if(w/h>r){w=parseInt(h*r,10);}
if(w/h<r){h=parseInt(w/r,10);}}
this.modal=o.modal;this.href=$(cblink).attr("href");this.title=$(cblink).attr("title")||cblink.t||"";this.titlebox=(o.titles)?"<div id='cee_title'><h2>"+this.title+"</h2></div>":"";this.width=w;this.height=h;this.rel=rel;this.iPhoneRedirect=o.iPhoneRedirect;};var Build={image:function(){this.content="<img id='cee_img' src='"+this.href+"' width='"+this.width+"' height='"+this.height+"' alt='"+this.title+"'/>"+this.titlebox;},video:function(){var content="",cb=this;var vid=function(){var rtn=this,id=cb.videoId;rtn.flashvars=rtn.param={};rtn.src=cb.videoSrc||cb.href;rtn.width=cb.width;rtn.height=cb.height;$.each($.fn.ceebox.videos,function(i,v){if(v.siteRgx&&typeof v.siteRgx!='string'&&v.siteRgx.test(cb.href)){if(v.idRgx){v.idRgx=new RegExp(v.idRgx);id=String(lastItem(v.idRgx.exec(cb.href)));}
rtn.src=(v.src)?v.src.replace("[id]",id):rtn.src;if(v.flashvars){$.each(v.flashvars,function(ii,vv){if(typeof vv=='string'){rtn.flashvars[ii]=vv.replace("[id]",id);}});}
if(v.param){$.each(v.param,function(ii,vv){if(typeof vv=='string'){rtn.param[ii]=vv.replace("[id]",id);}});}
rtn.width=v.width||rtn.width;rtn.height=v.height||rtn.height;rtn.site=i;return;}});return rtn;}();if($.flash.hasVersion(8)){this.width=vid.width;this.height=vid.height;this.action=function(){$('#cee_vid').flash({swf:vid.src,params:$.extend($.fn.ceebox.videos.base.param,vid.param),flashvars:$.extend($.fn.ceebox.videos.base.flashvars,vid.flashvars),width:vid.width,height:vid.height});};}else{this.width=400;this.height=200;if(((base.userAgent.match(/iPhone/i))&&this.iPhoneRedirect)||((base.userAgent.match(/iPod/i))&&this.iPhoneRedirect)){var redirect=this.href;this.action=function(){$.fn.ceebox.closebox(400,function(){window.location=redirect;});};}else{vid.site=vid.site||"SWF file";content="<p style='margin:20px'>Adobe Flash 8 or higher is required to view this movie. You can either:</p><ul><li>Follow link to <a href='"+this.href+"'>"+vid.site+" </a></li><li>or <a href='http://www.adobe.com/products/flashplayer/'>Install Flash</a></li><li> or <a href='#' class='cee_close'>Close This Popup</a></li></ul>";}}
this.content="<div id='cee_vid' style='width:"+this.width+"px;height:"+this.height+"px;'>"+content+"</div>"+this.titlebox;},html:function(){var h=this.href,r=this.rel;var m=[h.match(/[a-zA-Z0-9_\.]+\.[a-zA-Z]{2,4}/i),h.match(/^http:+/),(r)?r.match(/^iframe/):false];if((document.domain==m[0]&&m[1]&&!m[2])||(!m[1]&&!m[2])){var id,ajx=(id=h.match(/#[a-zA-Z0-9_\-]+/))?String(h.split("#")[0]+" "+id):h;this.action=function(){$("#cee_ajax").load(ajx);};this.content=this.titlebox+"<div id='cee_ajax' style='width:"+(this.width-30)+"px;height:"+(this.height-20)+"px'></div>";}else{$("#cee_iframe").remove();this.content=this.titlebox+"<iframe frameborder='0' hspace='0' src='"+h+"' id='cee_iframeContent' name='cee_iframeContent"+Math.round(Math.random()*1000)+"' onload='jQuery.fn.ceebox.onload()' style='width:"+(this.width)+"px;height:"+(this.height)+"px;' > </iframe>";}}};function pageSize(margin){var de=document.documentElement;margin=margin||100;this.width=(window.innerWidth||self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth)-margin;this.height=(window.innerHeight||self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight)-margin;return this;}
function boxPos(opts){var pos="fixed",scroll=0,reg=/[0-9]+/g,b=cssParse(opts.borderWidth,reg);if(!window.XMLHttpRequest){if($("#cee_HideSelect")===null){$("body").append("<iframe id='cee_HideSelect'></iframe>");}
pos="absolute";scroll=parseInt((document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop),10);}
this.mleft=parseInt(-1*((opts.width)/2+173+Number(b[3])),10);this.mtop=parseInt(-1*((opts.height)/2+Number(b[0])),10)+scroll;this.position=pos;return this;}
function cssParse(css,reg){var temp=css.match(reg),rtn=[],l=temp.length;if(l>1){rtn[0]=temp[0];rtn[1]=temp[1];rtn[2]=(l==2)?temp[0]:temp[2];rtn[3]=(l==4)?temp[3]:temp[1];}else{rtn=[temp,temp,temp,temp];}
return rtn;}
function keyEvents(){document.onkeydown=function(e){e=e||window.event;var kc=e.keyCode||e.which;switch(kc){case 13:return false;case 27:$.fn.ceebox.closebox();document.onkeydown=null;break;case 188:case 37:$("#cee_prev").trigger("click");break;case 190:case 39:$("#cee_next").trigger("click");break;default:break;}
return true;};}
function addGallery(g,family,opts){var h=opts.height,w=opts.width,th=opts.titleHeight,p=opts.padding;var nav={image:{w:parseInt(w/2,10),h:h-th-2*p,top:p,bgtop:(h-th-2*p)/2},video:{w:60,h:80,top:parseInt(((h-th-10)-2*p)/2,10),bgtop:24}};nav.html=nav.video;function navLink(btn,id){var s,on=nav[opts.type].bgtop,off=(on-2000),px="px";(btn=="prev")?s=[{left:0},"left"]:s=[{right:0},x="right"];var style=function(y){return $.extend({zIndex:105,width:nav[opts.type].w+px,height:nav[opts.type].h+px,position:"absolute",top:nav[opts.type].top,backgroundPosition:s[1]+" "+y+px},s[0]);};$("<a href='#'></a>").text(btn).attr({id:"cee_"+btn}).css(style(off)).hover(function(){$(this).css(style(on));},function(){$(this).css(style(off));}).one("click",function(e){e.preventDefault();(function(f,id,fade){$("#cee_prev,#cee_next").unbind().click(function(){return false;});document.onkeydown=null;var content=$("#cee_box").children(),len=content.length;content.fadeOut(fade,function(){$(this).remove();if(this==content[len-1]){f.eq(id).trigger("click");}});})(family,id,opts.fadeOut);}).appendTo("#cee_box");}
if(g.prevId>=0){navLink("prev",g.prevId);}
if(g.nextId){navLink("next",g.nextId);}
$("#cee_title").append("<div id='cee_count'>Item "+(g.gNum+1)+" of "+g.gLen+"</div>");}
function getSmlr(a,b){return((a&&a<b)||!b)?a:b;}
function isFunction(a){return typeof a=='function';}
function lastItem(a){var l=a.length;return(l>1)?a[l-1]:a;}
function debug(a,tag,opts){if(debugging===true){var bugs="",header="[ceebox]("+(tag||"")+")";($.isArray(a)||typeof a=='object'||typeof a=='function')?$.each(a,function(i,val){bugs=bugs+i+":"+val+", ";}):bugs=a;if(window.console&&window.console.log){window.console.log(header+bugs);}else{if($("#debug").size()===0){$("<ul id='debug'></ul>").appendTo("body").css({border:"1px solid #ccf",position:"fixed",top:"10px",right:"10px",width:"300px",padding:"10px",listStyle:"square"});$("<li>").css({margin:"0 0 5px"}).appendTo("#debug").append(header).wrapInner("<b></b>").append(" "+bugs);}}}}})(jQuery);window.Modernizr=(function(window,doc){var version='1.1',ret={},enableHTML5=true,enableNoClasses=true,fontfaceCheckDelay=100,docElement=doc.documentElement,m=doc.createElement('modernizr'),m_style=m.style,f=doc.createElement('input'),canvas='canvas',canvastext='canvastext',rgba='rgba',hsla='hsla',multiplebgs='multiplebgs',borderimage='borderimage',borderradius='borderradius',boxshadow='boxshadow',opacity='opacity',cssanimations='cssanimations',csscolumns='csscolumns',cssgradients='cssgradients',cssreflections='cssreflections',csstransforms='csstransforms',csstransforms3d='csstransforms3d',csstransitions='csstransitions',fontface='fontface',geolocation='geolocation',video='video',audio='audio',input='input',inputtypes=input+'types',background='background',backgroundColor=background+'Color',canPlayType='canPlayType',localStorage='localstorage',sessionStorage='sessionstorage',webWorkers='webworkers',applicationCache='applicationcache',setProperties=' -o- -moz- -ms- -webkit- '.split(' '),tests={},inputs={},attrs={},elems,elem,i,feature,classes=[];function set_css(str){m_style.cssText=str;}
function set_css_all(str1,str2){return set_css(setProperties.join(str1+';')+(str2||''));}
function contains(str,substr){return str.indexOf(substr)!==-1;}
function test_props(props,callback){for(var i in props){if(m_style[props[i]]!==undefined&&(!callback||callback(props[i]))){return true;}}}
function test_props_all(prop,callback){var uc_prop=prop.charAt(0).toUpperCase()+prop.substr(1),props=[prop,'webkit'+uc_prop,'Moz'+uc_prop,'moz'+uc_prop,'o'+uc_prop,'ms'+uc_prop];return!!test_props(props,callback);}
tests[canvas]=function(){return!!doc.createElement(canvas).getContext;};tests[canvastext]=function(){return!!(tests[canvas]()&&typeof doc.createElement(canvas).getContext('2d').fillText=='function');};tests[geolocation]=function(){return!!navigator.geolocation;};tests[rgba]=function(){set_css(background+'-color:rgba(150,255,150,.5)');return contains(m_style[backgroundColor],rgba);};tests[hsla]=function(){set_css(background+'-color:hsla(120,40%,100%,.5)');return contains(m_style[backgroundColor],rgba);};tests[multiplebgs]=function(){set_css(background+':url(m.png),url(a.png),#f99 url(m.png)');return/(url\s*\(.*?){3}/.test(m_style[background]);
    };
    
    
    // In testing support for a given CSS property, it's legit to test:
    //    elem.style[styleName] !== undefined
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.
    // We'll take advantage of this quick test and skip setting a style 
    // on our modernizr element, but instead just testing undefined vs
    // empty string.
    // The legacy set_css_all calls will remain in the source 
    // (however, commented) in for clarity, yet functionally they are 
    // no longer needed.
    
    tests[borderimage] = function() {
        //  set_css_all( 'border-image:url(m.png) 1 1 stretch' );
        
        return test_props_all( 'borderImage' );
    };
    
    tests[borderradius] = function() {
        //  set_css_all( 'border-radius:10px' );

        return test_props_all( 'borderRadius', '', function( prop ) {
            return contains( prop, 'orderRadius' );
        });
    };
    
    tests[boxshadow] = function() {
        //  set_css_all( 'box-shadow:#000 1px 1px 3px' );
        
        return test_props_all( 'boxShadow' );
    };
    
    tests[opacity] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.
        
        set_css( 'opacity:.5' );
        
        return contains( m_style[opacity], '0.5' );
    };
    
    tests[cssanimations] = function() {
        //  set_css_all( 'animation:"animate" 2s ease 2', 'position:relative' );
        
        return test_props_all( 'animationName' );
    };
    
    tests[csscolumns] = function() {
        //  set_css_all( 'column-count:3' );
        
        return test_props_all( 'columnCount' );
    };
    
    tests[cssgradients] = function() {
        /***For CSS Gradients syntax,please see:*http:*https:*https:*http:*/
        
        var str1 = background + '-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';
        
        set_css(
                str1 + str2
            + str1 + '-webkit-' + str2
            + str1 + '-moz-' + str2
            + str1 + '-o-' + str2
            + str1 + '-ms-' + str2
            + str1 + str3
            + str1 + '-webkit-' + str3
            + str1 + '-moz-' + str3
            + str1 + '-o-' + str3
            + str1 + '-ms-' + str3
        );
        
        return contains( m_style.backgroundImage, 'gradient' );
    };
    
    tests[cssreflections] = function() {
        //  set_css_all( 'box-reflect:right 1px' );
        return test_props_all( 'boxReflect' );
    };
    
    tests[csstransforms] = function() {
        //  set_css_all( 'transform:rotate(3deg)' );
        
        return !!test_props([ 'transformProperty', 'webkitTransform', 'MozTransform', 'mozTransform', 'oTransform', 'msTransform' ]);
    };
    
    tests[csstransforms3d] = function() {
        //  set_css_all( 'perspective:500' );
        
        return !!test_props([ 'perspectiveProperty', 'webkitPerspective', 'MozPerspective', 'mozPerspective', 'oPerspective', 'msPerspective' ]);
    };
    
    tests[csstransitions] = function() {
        //  set_css_all( 'transition:all .5s linear' );
        
        return test_props_all( 'transitionProperty' );
    };



    // @font-face detection routine created by Paul Irish - paulirish.com
    // Merged into Modernizr with approval. Read more about Paul's work here:
    // http://paulirish.com/2009/font-face-feature-detection/
tests[fontface]=(function(){var fontret;if(!(!/*@cc_on@if(@_jscript_version>=5)!@end@*/0))fontret=true;else{var st=doc.createElement('style'),spn=doc.createElement('span'),wid,nwid,isFakeBody=false,body=doc.body,callback,isCallbackCalled;st.textContent="@font-face{font-family:testfont;src:url('data:font/ttf;base64,AAEAAAAMAIAAAwBAT1MvMliohmwAAADMAAAAVmNtYXCp5qrBAAABJAAAANhjdnQgACICiAAAAfwAAAAEZ2FzcP//AAMAAAIAAAAACGdseWYv5OZoAAACCAAAANxoZWFk69bnvwAAAuQAAAA2aGhlYQUJAt8AAAMcAAAAJGhtdHgGDgC4AAADQAAAABRsb2NhAIQAwgAAA1QAAAAMbWF4cABVANgAAANgAAAAIG5hbWUgXduAAAADgAAABPVwb3N03NkzmgAACHgAAAA4AAECBAEsAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAACAAMDAAAAAAAAgAACbwAAAAoAAAAAAAAAAFBmRWQAAAAgqS8DM/8zAFwDMwDNAAAABQAAAAAAAAAAAAMAAAADAAAAHAABAAAAAABGAAMAAQAAAK4ABAAqAAAABgAEAAEAAgAuqQD//wAAAC6pAP///9ZXAwAAAAAAAAACAAAABgBoAAAAAAAvAAEAAAAAAAAAAAAAAAAAAAABAAIAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEACoAAAAGAAQAAQACAC6pAP//AAAALqkA////1lcDAAAAAAAAAAIAAAAiAogAAAAB//8AAgACACIAAAEyAqoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8sgECAO0yMxEhESczESMiARDuzMwCqv1WIgJmAAACAFUAAAIRAc0ADwAfAAATFRQWOwEyNj0BNCYrASIGARQGKwEiJj0BNDY7ATIWFX8aIvAiGhoi8CIaAZIoN/43KCg3/jcoAWD0JB4eJPQkHh7++EY2NkbVRjY2RgAAAAABAEH/+QCdAEEACQAANjQ2MzIWFAYjIkEeEA8fHw8QDxwWFhwWAAAAAQAAAAIAAIuYbWpfDzz1AAsEAAAAAADFn9IuAAAAAMWf0i797/8zA4gDMwAAAAgAAgAAAAAAAAABAAADM/8zAFwDx/3v/98DiAABAAAAAAAAAAAAAAAAAAAABQF2ACIAAAAAAVUAAAJmAFUA3QBBAAAAKgAqACoAWgBuAAEAAAAFAFAABwBUAAQAAgAAAAEAAQAAAEAALgADAAMAAAAQAMYAAQAAAAAAAACLAAAAAQAAAAAAAQAhAIsAAQAAAAAAAgAFAKwAAQAAAAAAAwBDALEAAQAAAAAABAAnAPQAAQAAAAAABQAKARsAAQAAAAAABgAmASUAAQAAAAAADgAaAUsAAwABBAkAAAEWAWUAAwABBAkAAQBCAnsAAwABBAkAAgAKAr0AAwABBAkAAwCGAscAAwABBAkABABOA00AAwABBAkABQAUA5sAAwABBAkABgBMA68AAwABBAkADgA0A/tDb3B5cmlnaHQgMjAwOSBieSBEYW5pZWwgSm9obnNvbi4gIFJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgT3BlbiBGb250IExpY2Vuc2UuIEtheWFoIExpIGdseXBocyBhcmUgcmVsZWFzZWQgdW5kZXIgdGhlIEdQTCB2ZXJzaW9uIDMuYmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhTGlnaHRiYWVjMmE5MmJmZmU1MDMyIC0gc3Vic2V0IG9mIEZvbnRGb3JnZSAyLjAgOiBKdXJhIExpZ2h0IDogMjMtMS0yMDA5YmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhIExpZ2h0VmVyc2lvbiAyIGJhZWMyYTkyYmZmZTUwMzIgLSBzdWJzZXQgb2YgSnVyYUxpZ2h0aHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkwAQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMAA5ACAAYgB5ACAARABhAG4AaQBlAGwAIABKAG8AaABuAHMAbwBuAC4AIAAgAFIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAdABlAHIAbQBzACAAbwBmACAAdABoAGUAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALgAgAEsAYQB5AGEAaAAgAEwAaQAgAGcAbAB5AHAAaABzACAAYQByAGUAIAByAGUAbABlAGEAcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAEcAUABMACAAdgBlAHIAcwBpAG8AbgAgADMALgBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQBMAGkAZwBoAHQAYgBhAGUAYwAyAGEAOQAyAGIAZgBmAGUANQAwADMAMgAgAC0AIABzAHUAYgBzAGUAdAAgAG8AZgAgAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAASgB1AHIAYQAgAEwAaQBnAGgAdAAgADoAIAAyADMALQAxAC0AMgAwADAAOQBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQAgAEwAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMgAgAGIAYQBlAGMAMgBhADkAMgBiAGYAZgBlADUAMAAzADIAIAAtACAAcwB1AGIAcwBlAHQAIABvAGYAIABKAHUAcgBhAEwAaQBnAGgAdABoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwAAAAAAgAAAAAAAP+BADMAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAQACAQIAEQt6ZXJva2F5YWhsaQ==')}";doc.getElementsByTagName('head')[0].appendChild(st);spn.setAttribute('style','font:99px _,serif;position:absolute;visibility:hidden');if(!body){body=docElement.appendChild(doc.createElement(fontface));isFakeBody=true;}
spn.innerHTML='........';spn.id='fonttest';body.appendChild(spn);wid=spn.offsetWidth;spn.style.font='99px testfont,_,serif';fontret=wid!==spn.offsetWidth;var delayedCheck=function(){fontret=ret[fontface]=wid!==spn.offsetWidth;docElement.className=docElement.className.replace(/(no-)?font.*?\b/,'')+(fontret?' ':' no-')+fontface;callback&&(isCallbackCalled=true)&&callback(fontret);isFakeBody&&setTimeout(function(){body.parentNode.removeChild(body)},50);}
setTimeout(delayedCheck,fontfaceCheckDelay);}
ret._fontfaceready=function(fn){(isCallbackCalled||fontret)?fn(fontret):(callback=fn);}
return function(){return fontret||wid!==spn.offsetWidth;};})();tests[video]=function(){var elem=doc.createElement(video),bool=!!elem[canPlayType];if(bool){bool=new Boolean(bool);bool.ogg=elem[canPlayType]('video/ogg; codecs="theora, vorbis"');bool.h264=elem[canPlayType]('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');}
return bool;};tests[audio]=function(){var elem=doc.createElement(audio),bool=!!elem[canPlayType];if(bool){bool=new Boolean(bool);bool.ogg=elem[canPlayType]('audio/ogg; codecs="vorbis"');bool.mp3=elem[canPlayType]('audio/mpeg3;');bool.wav=elem[canPlayType]('audio/wav; codecs="1"');bool.m4a=elem[canPlayType]('audio/x-m4a;');}
return bool;};tests[localStorage]=function(){return'localStorage'in window;};tests[sessionStorage]=function(){return'sessionStorage'in window;};tests[webWorkers]=function(){return!!window.Worker;};tests[applicationCache]=function(){return!!window.applicationCache;};for(feature in tests){if(tests.hasOwnProperty(feature)){classes.push((!(ret[feature]=tests[feature]())&&enableNoClasses?'no-':'')+feature);}}
ret.addTest=function(feature,test){if(this.hasOwnProperty(feature)){}
test=!!(test());docElement.className+=' '+(!test&&enableNoClasses?'no-':'')+feature;ret[feature]=test;};ret[input]=(function(props){for(var i in props){attrs[props[i]]=!!(props[i]in f);}
return attrs;})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));ret[inputtypes]=(function(props){for(var i in props){f.setAttribute('type',props[i]);inputs[props[i]]=!!(f.type!=='text');}
return inputs;})('search tel url email datetime date month week time datetime-local number range color'.split(' '));set_css('');m=f=null;if(enableHTML5&&!(!/*@cc_on!@*/0)){elems='abbr article aside audio canvas datalist details eventsource figure footer header hgroup mark menu meter nav output progress section time video'.split(' ');i=elems.length+1;while(--i){elem=doc.createElement(elems[i]);}
elem=null;}
ret._enableHTML5=enableHTML5;ret._enableNoClasses=enableNoClasses;ret._version=version;(function(H,C){H[C]=H[C].replace(/\bno-js\b/,'js')})(docElement,'className');docElement.className+=' '+classes.join(' ');return ret;})(this,this.document);function padding(parent_container,target_elements,remainder_element,border_size,vertical){var link_size=0;var unpadded=0;if(vertical){var parent_size=parent_container.height();}else{var parent_size=parent_container.width();}
var link_count=target_elements.length;if(vertical){target_elements.each(function(){unpadded+=$(this).height();link_size=$(this).height();$(this).css('height',link_size+"px");});}else{target_elements.each(function(){unpadded+=$(this).width();link_size=$(this).width();$(this).css('width',link_size+"px");});}
unpadded+=border_size;var raw_padding=(parent_size-unpadded)/link_count;var padding=Math.floor(raw_padding);var remainder=Math.round((raw_padding-padding)*link_count);if(Math.floor(padding/2)<0){var math_floor=5;}else{var math_floor=Math.floor(padding/2);}
if(Math.ceil(padding/2)<0){var math_ceil=5;}else{var math_ceil=Math.ceil(padding/2);}
if(Math.floor(remainder/2)<0){var math_floor_r=5;}else{var math_floor_r=Math.ceil(remainder/2);}
if(Math.ceil(remainder/2)<0){var math_ceil_r=5;}else{var math_ceil_r=Math.ceil(remainder/2);}
if(vertical){target_elements.css({'padding-top':math_floor,'padding-bottom':math_ceil});remainder_element.css({'padding-top':math_floor_r+math_floor,'padding-bottom':math_ceil_r+math_ceil});}else{target_elements.css({'padding-left':math_floor,'padding-right':math_ceil});remainder_element.css({'padding-left':math_floor_r+math_floor,'padding-right':math_ceil_r+math_ceil});}}
function fix_params_on_submit(params){if(typeof(params)=='object'){jQuery.each(params,function(key,value){element=$(key);if(element.val()===value.from){element.val(value.to);}});}};$(document).ready(function(){$('.options_button').click(function(){$('.search_options').slideToggle();});$("input, textarea").placehold();$('.jobs input:first-child, .cars input:first-child, .homes input:first-child').focus(function(){$(this).val('');$(this).parent().parent('li.form').css('height','auto');});$('.caption').click(function(){$(this).toggleClass('active');});$("#detail_page .scrollable").scrollable({size:1,clickable:false}).navigator();$("#gallery_detail .scrollable").scrollable({size:12,clickable:false}).navigator();$(".ceebox_image").ceebox({onload:function(){var text=$("#cee_count").text();var item=text.split(" ")[1];var id="#item"+item;var buy_link=$(id).data('buy_link');$("#cee_title h2").after(buy_link).fadeIn();}});$(".ceebox_video").ceebox({titles:false,htmlGallery:false,htmlWidth:445,htmlHeight:340});$(".login").ceebox({titles:false,htmlGallery:false});function start_radar_loop(image_div){$('#cee_box '+image_div).cycle({fx:'fade',speed:10,timeout:700});};$.each(['smallRadarImages','largeRadarImages'],function(){var image_div=this;console.log(image_div);$(".ceebox_radar_"+image_div).ceebox({titles:false,htmlGallery:false,htmlWidth:640,htmlHeight:480,onload:function(){var images_loaded=false;var wait_for_seconds=5;var wait=setInterval(function(){if($('#cee_box #'+image_div).length>0){images_loaded=true;start_radar_loop('#'+image_div);clearInterval(wait);}
else if(wait_for_seconds--==0){clearInterval(wait);}},1000);}});});$('#topJobKeywords')
.focus(function(){if(this.value=='Search by Keyword...')this.value='';})
.blur(function(){if(this.value=='')this.value='Search by Keyword...';});$('#topJobCity')
.focus(function(){if(this.value=='Enter a City')this.value='';})
.blur(function(){if(this.value=='')this.value='Enter a City';});$('#carszip')
.focus(function(){if(this.value=='Zip Code')this.value='';})
.blur(function(){if(this.value=='')this.value='Zip Code';});$('#homeszip')
.focus(function(){if(this.value=='City or Zip')this.value='';})
.blur(function(){if(this.value=='')this.value='City or Zip';});$('#homes_location')
.focus(function(){if(this.value=='City, State, or Zip')this.value='';})
.blur(function(){if(this.value=='')this.value='City, State, or Zip';});$('.widget.homes .home_carousel .prev').click(function(){var home_array=$(this).parent().parent().children('.homefinder_home');if(home_array.length>1){var current_home=0;home_array.each(function(index){if($(this).css('display')==='block'){current_home=index;}});if(current_home===0){home_array.last().css('display','block');}
else{home_array.eq(current_home-1).css('display','block');}
home_array.eq(current_home).css('display','none');}
return false;});$('.widget.homes .home_carousel .next').click(function(){var home_array=$(this).parent().parent().children('.homefinder_home');if(home_array.length>1){var current_home=0;home_array.each(function(index){if($(this).css('display')==='block'){current_home=index;}});if(current_home===home_array.length-1){home_array.first().css('display','block');}
else{home_array.eq(current_home+1).css('display','block');}
home_array.eq(current_home).css('display','none');}
return false;});$("#price_range").change(function(){var value=$(this).val();set_min_max(value);});function equal_block_height(parent_container,target_element,target_class){var parent_height=parent_container.height();var equal_height=60;var has_target_class=false;parent_container.each(function(){$(this).children(target_element).each(function(){equal_height=($(this).height()>equal_height)?$(this).height():equal_height;});});parent_container.children(target_element).height(equal_height);if(has_target_class){parent_container.children(target_element+":first").css('border-right','1px solid #CCC');}}
var parent_container=$('#detail_page #next_prev_container');equal_block_height(parent_container,'div.next_prev_box','.next_prev_box');var parent_container=$('div#main #highlights.two');equal_block_height(parent_container,'article','no_figure');var parent_container=$('#main #buyingCar');equal_block_height(parent_container,'div.column','.column');var parent_container=$('#main #livingHere');equal_block_height(parent_container,'div.column','.column');var parent_container=$('#big_story .big');var target_elements=$('#big_story .details li');var remainder_element=$('#big_story .details li:last-child');var border_size=0;padding(parent_container,target_elements,remainder_element,border_size,true);$('.pagination').each(function(){$(this).parent('section').css('margin-bottom','40px');});function getItemsState(block_item){var columns=[];$(block_item+' div.sortable-list').each(function(){var classAttr=[];$(this).children().each(function(){if($(this).attr('id')){classAttr.push($(this).attr('id')+'-'+$(this).attr('class'));}});columns.push(classAttr);});return columns.join('|');}
function setItemState(block_item){var cookieArr=[];var classAttr=$(block_item).attr('class');if($.cookie('mipanelState0612'))
{var cookie_content=$.cookie('mipanelState0612').split(",");}else{var cookie_content=[];}
var section_is_set=0;for(var item in cookie_content){var panelIdClassPair=cookie_content[item].split("-");var panelId=panelIdClassPair[0];section_is_set=(panelId==$(block_item).attr('id'))?1:section_is_set;var item_array=new Array(panelId);if(panelId==$(block_item).attr('id'))
{item_array.push(classAttr);}
else
{item_array.push(panelIdClassPair[1]);}
cookieArr.push(item_array.join("-"));}
var new_cookie=cookieArr.join(",");if(!$.cookie('mipanelState0612'))
{new_cookie=$(block_item).attr('id')+"-"+classAttr;}else if(!section_is_set){new_cookie+=","+$(block_item).attr('id')+"-"+classAttr;}
return new_cookie;}
function restoreState(cookie_name){var cookie=$.cookie(cookie_name);if(!cookie)return;var columns=cookie.split('|');for(var c in columns){var idClass=columns[c].split(",");for(var i=0,n=idClass.length;i<n;i++){var itemclassID=idClass[i];var itemclassID_split=itemclassID.split('-');if(itemclassID_split[0]){$('#'+itemclassID_split[0]).removeClass();$('#'+itemclassID_split[0]).addClass(itemclassID_split[1]);}}}}
$('#detail_page .aside .factbox li').children().each(function(index){if($(this).outerWidth()>300){$(this).parent().css({'overflow-x':'scroll'});}});var prop_height=$('#main_photo').outerHeight();$('#ie7_prop').css({'height':prop_height});if(typeof(section_id_path)!=='undefined'){$('#section').mi_section_ajax({section_id_path:section_id_path,exclude:exclude_stories});}
});function resizeIframeToFitContent(iframe){iframe.style.height=iframe.contentWindow.document.body.scrollHeight+30+'px';}
(function(b){b.tools=b.tools||{};b.tools.scrollable={version:"1.1.2",conf:{size:5,vertical:false,speed:400,keyboard:true,keyboardSteps:null,disabledClass:"disabled",hoverClass:null,clickable:true,activeClass:"active",easing:"swing",loop:false,items:".items",item:null,prev:".prev",next:".next",prevPage:".prevPage",nextPage:".nextPage",api:false}};var c;function a(o,m){var r=this,p=b(this),d=!m.vertical,e=o.children(),k=0,i;if(!c){c=r}b.each(m,function(s,t){if(b.isFunction(t)){p.bind(s,t)}});if(e.length>1){e=b(m.items,o)}function l(t){var s=b(t);return m.globalNav?s:o.parent().find(t)}o.data("finder",l);var f=l(m.prev),h=l(m.next),g=l(m.prevPage),n=l(m.nextPage);b.extend(r,{getIndex:function(){return k},getClickIndex:function(){var s=r.getItems();return s.index(s.filter("."+m.activeClass))},getConf:function(){return m},getSize:function(){return r.getItems().size()},getPageAmount:function(){return Math.ceil(this.getSize()/m.size)},getPageIndex:function(){return Math.ceil(k/m.size)},getNaviButtons:function(){return f.add(h).add(g).add(n)},getRoot:function(){return o},getItemWrap:function(){return e},getItems:function(){return e.children(m.item)},getVisibleItems:function(){return r.getItems().slice(k,k+m.size)},seekTo:function(s,w,t){if(s<0){s=0}if(k===s){return r}if(b.isFunction(w)){t=w}if(s>r.getSize()-m.size){return m.loop?r.begin():this.end()}var u=r.getItems().eq(s);if(!u.length){return r}var v=b.Event("onBeforeSeek");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}if(w===undefined||b.isFunction(w)){w=m.speed}function x(){if(t){t.call(r,s)}p.trigger("onSeek",[s])}if(d){e.animate({left:-u.position().left},w,m.easing,x)}else{e.animate({top:-u.position().top},w,m.easing,x)}c=r;k=s;v=b.Event("onStart");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}f.add(g).toggleClass(m.disabledClass,s===0);h.add(n).toggleClass(m.disabledClass,s>=r.getSize()-m.size);return r},move:function(u,t,s){i=u>0;return this.seekTo(k+u,t,s)},next:function(t,s){return this.move(1,t,s)},prev:function(t,s){return this.move(-1,t,s)},movePage:function(w,v,u){i=w>0;var s=m.size*w;var t=k%m.size;if(t>0){s+=(w>0?-t:m.size-t)}return this.move(s,v,u)},prevPage:function(t,s){return this.movePage(-1,t,s)},nextPage:function(t,s){return this.movePage(1,t,s)},setPage:function(t,u,s){return this.seekTo(t*m.size,u,s)},begin:function(t,s){i=false;return this.seekTo(0,t,s)},end:function(t,s){i=true;var u=this.getSize()-m.size;return u>0?this.seekTo(u,t,s):r},reload:function(){p.trigger("onReload");return r},focus:function(){c=r;return r},click:function(u){var v=r.getItems().eq(u),s=m.activeClass,t=m.size;if(u<0||u>=r.getSize()){return r}if(t==1){if(m.loop){return r.next()}if(u===0||u==r.getSize()-1){i=(i===undefined)?true:!i}return i===false?r.prev():r.next()}if(t==2){if(u==k){u--}r.getItems().removeClass(s);v.addClass(s);return r.seekTo(u,time,fn)}if(!v.hasClass(s)){r.getItems().removeClass(s);v.addClass(s);var x=Math.floor(t/2);var w=u-x;if(w>r.getSize()-t){w=r.getSize()-t}if(w!==u){return r.seekTo(w)}}return r},bind:function(s,t){p.bind(s,t);return r},unbind:function(s){p.unbind(s);return r}});b.each("onBeforeSeek,onStart,onSeek,onReload".split(","),function(s,t){r[t]=function(u){return r.bind(t,u)}});f.addClass(m.disabledClass).click(function(){r.prev()});h.click(function(){r.next()});n.click(function(){r.nextPage()});if(r.getSize()<m.size){h.add(n).addClass(m.disabledClass)}g.addClass(m.disabledClass).click(function(){r.prevPage()});var j=m.hoverClass,q="keydown."+Math.random().toString().substring(10);r.onReload(function(){if(j){r.getItems().hover(function(){b(this).addClass(j)},function(){b(this).removeClass(j)})}if(m.clickable){r.getItems().each(function(s){b(this).unbind("click.scrollable").bind("click.scrollable",function(t){if(b(t.target).is("a")){return}return r.click(s)})})}if(m.keyboard){b(document).unbind(q).bind(q,function(t){if(t.altKey||t.ctrlKey){return}if(m.keyboard!="static"&&c!=r){return}var u=m.keyboardSteps;if(d&&(t.keyCode==37||t.keyCode==39)){r.move(t.keyCode==37?-u:u);return t.preventDefault()}if(!d&&(t.keyCode==38||t.keyCode==40)){r.move(t.keyCode==38?-u:u);return t.preventDefault()}return true})}else{b(document).unbind(q)}});r.reload()}b.fn.scrollable=function(d){var e=this.eq(typeof d=="number"?d:0).data("scrollable");if(e){return e}var f=b.extend({},b.tools.scrollable.conf);d=b.extend(f,d);d.keyboardSteps=d.keyboardSteps||d.size;this.each(function(){e=new a(b(this),d);b(this).data("scrollable",e)});return d.api?e:this}})(jQuery);(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.circular={version:"0.5.1",conf:{api:false,clonedClass:"cloned"}};b.fn.circular=function(e){var d=b.extend({},a.plugins.circular.conf),c;b.extend(d,e);this.each(function(){var i=b(this).scrollable(),n=i.getItems(),k=i.getConf(),f=i.getItemWrap(),j=0;if(i){c=i}if(n.length<k.size){return false}n.slice(0,k.size).each(function(o){b(this).clone().appendTo(f).click(function(){i.click(n.length+o)}).addClass(d.clonedClass)});var l=b.makeArray(n.slice(-k.size)).reverse();b(l).each(function(o){b(this).clone().prependTo(f).click(function(){i.click(-o-1)}).addClass(d.clonedClass)});var m=f.children(k.item);var h=k.hoverClass;if(h){m.hover(function(){b(this).addClass(h)},function(){b(this).removeClass(h)})}function g(o){var p=m.eq(o);if(k.vertical){f.css({top:-p.position().top})}else{f.css({left:-p.position().left})}}g(k.size);b.extend(i,{move:function(s,r,p,q){var u=j+s+k.size;var t=u>i.getSize()-k.size;if(u<=0||t){var o=j+k.size+(t?-n.length:n.length);g(o);u=o+s}if(q){m.removeClass(k.activeClass).eq(u+Math.floor(k.size/2)).addClass(k.activeClass)}if(u===j+k.size){return self}return i.seekTo(u,r,p)},begin:function(p,o){return this.seekTo(k.size,p,o)},end:function(p,o){return this.seekTo(n.length,p,o)},click:function(p,r,q){if(!k.clickable){return self}if(k.size==1){return this.next()}var s=p-j,o=k.activeClass;s-=Math.floor(k.size/2);return this.move(s,r,q,true)},getIndex:function(){return j},setPage:function(p,q,o){return this.seekTo(p*k.size+k.size,q,o)},getPageAmount:function(){return Math.ceil(n.length/k.size)},getPageIndex:function(){if(j<0){return this.getPageAmount()-1}if(j>=n.length){return 0}var o=(j+k.size)/k.size-1;return o},getVisibleItems:function(){var o=j+k.size;return m.slice(o,o+k.size)}});i.onStart(function(p,o){j=o-k.size;return false});i.getNaviButtons().removeClass(k.disabledClass)});return d.api?c:this}})(jQuery);(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.navigator={version:"1.0.2",conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,api:false,idPrefix:null}};b.fn.navigator=function(d){var e=b.extend({},a.plugins.navigator.conf),c;if(typeof d=="string"){d={navi:d}}d=b.extend(e,d);this.each(function(){var i=b(this).scrollable(),f=i.getRoot(),l=f.data("finder").call(null,d.navi),g=null,k=i.getNaviButtons();if(i){c=i}i.getNaviButtons=function(){return k.add(l)};function j(){if(!l.children().length||l.data("navi")==i){l.empty();l.data("navi",i);for(var m=0;m<i.getPageAmount();m++){l.append(b("<"+(d.naviItem||"a")+"/>"))}g=l.children().each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()});if(d.indexed){o.text(n)}if(d.idPrefix){o.attr("id",d.idPrefix+n)}})}else{g=d.naviItem?l.find(d.naviItem):l.children();g.each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()})})}g.eq(0).addClass(d.activeClass)}i.onStart(function(o,n){var m=d.activeClass;g.removeClass(m).eq(i.getPageIndex()).addClass(m)});i.onReload(function(){j()});j();var h=g.filter("[href="+location.hash+"]");if(h.length){i.move(g.index(h))}});return d.api?c:this}})(jQuery);(function(b){b.tools=b.tools||{};b.tools.expose={version:"1.0.5",conf:{maskId:null,loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,color:"#456",api:false}};function a(){if(b.browser.msie){var f=b(document).height(),e=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,f-e<20?e:f]}return[b(window).width(),b(document).height()]}function c(h,g){var e=this,j=b(this),d=null,f=false,i=0;b.each(g,function(k,l){if(b.isFunction(l)){j.bind(k,l)}});b(window).resize(function(){e.fit()});b.extend(this,{getMask:function(){return d},getExposed:function(){return h},getConf:function(){return g},isLoaded:function(){return f},load:function(n){if(f){return e}i=h.eq(0).css("zIndex");if(g.maskId){d=b("#"+g.maskId)}if(!d||!d.length){var l=a();d=b("<div/>").css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:0,zIndex:g.zIndex});if(g.maskId){d.attr("id",g.maskId)}b("body").append(d);var k=d.css("backgroundColor");if(!k||k=="transparent"||k=="rgba(0, 0, 0, 0)"){d.css("backgroundColor",g.color)}if(g.closeOnEsc){b(document).bind("keydown.unexpose",function(o){if(o.keyCode==27){e.close()}})}if(g.closeOnClick){d.bind("click.unexpose",function(o){e.close(o)})}}n=n||b.Event();n.type="onBeforeLoad";j.trigger(n);if(n.isDefaultPrevented()){return e}b.each(h,function(){var o=b(this);if(!/relative|absolute|fixed/i.test(o.css("position"))){o.css("position","relative")}});h.css({zIndex:Math.max(g.zIndex+1,i=="auto"?0:i)});var m=d.height();if(!this.isLoaded()){d.css({opacity:0,display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){if(d.height()!=m){d.css("height",m)}n.type="onLoad";j.trigger(n)})}f=true;return e},close:function(k){if(!f){return e}k=k||b.Event();k.type="onBeforeClose";j.trigger(k);if(k.isDefaultPrevented()){return e}d.fadeOut(g.closeSpeed,function(){k.type="onClose";j.trigger(k);h.css({zIndex:b.browser.msie?i:null})});f=false;return e},fit:function(){if(d){var k=a();d.css({width:k[0],height:k[1]})}},bind:function(k,l){j.bind(k,l);return e},unbind:function(k){j.unbind(k);return e}});b.each("onBeforeLoad,onLoad,onBeforeClose,onClose".split(","),function(k,l){e[l]=function(m){return e.bind(l,m)}})}b.fn.expose=function(d){var e=this.eq(typeof d=="number"?d:0).data("expose");if(e){return e}if(typeof d=="string"){d={color:d}}var f=b.extend({},b.tools.expose.conf);d=b.extend(f,d);this.each(function(){e=new c(b(this),d);b(this).data("expose",e)});return d.api?e:this}})(jQuery);function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',o='opera',h=document.getElementsByTagName('html')[0],b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js'];c=b.join(' ');h.className+=' '+c;return c;};css_browser_selector(navigator.userAgent);(function($){var MORE_POSTS_COUNT=10;var MAX_POSTS_COUNT=50;var SectionAjax=function(options,container){this.exclude=options.exclude;this.section_id_path=options.section_id_path;this.container=container;var actual=this.posts_loaded();var expected=this.expected_posts();if(expected&&actual<expected){this.refresh(expected);}
if(actual>=MAX_POSTS_COUNT){this.container.find('.more_button').hide();}
this.container.find('.more_button').bind('click',$.proxy(this,'show_more'));};SectionAjax.prototype.refresh=function(posts){if(typeof(posts)==='undefined'){posts=this.posts_loaded();}
this.fetch(0,posts,function(snippet){$('#main_story_list').html(snippet.html());});};SectionAjax.prototype.show_more=function(){var posts=this.posts_loaded();var more=posts+MORE_POSTS_COUNT>MAX_POSTS_COUNT?MAX_POSTS_COUNT-posts:MORE_POSTS_COUNT;this.save_post_count(posts+more);this.fetch(posts,more,function(snippet){$('#main_story_list').append(snippet.html());});};SectionAjax.prototype.fetch=function(start_index,posts,callback){$.ajax({dataType:'html',url:this.build_request(start_index,posts),success:function(data){if($.isFunction(callback)){var snippet=$('<div/>').html(data);callback(snippet);if(snippet.find('li.article').length<posts||start_index+posts>=MAX_POSTS_COUNT){$('#section .more_button').hide();}
else{$('#section .more_button').show();}}}});};SectionAjax.prototype.build_request=function(start_index,posts){var ajax_string="/miajax/section"+section_id_path+"?start="+start_index+"&posts="+posts+"&asset_filter="+this.exclude;return ajax_string;};SectionAjax.prototype.posts_loaded=function(){return $('#main_story_list li').length;};SectionAjax.prototype.save_post_count=function(posts){posts+=posts%MORE_POSTS_COUNT;var cookie=this.parse_post_count_cookie();cookie[section_id_path]=posts;var entries=[]
$.each(cookie,function(key,value){entries.push([key,value].join('='));});$.cookie('post_count',entries.join(';'),{expires:0.5/24,path:'/'});};SectionAjax.prototype.parse_post_count_cookie=function(){var parsed={};var raw=$.cookie('post_count');if(raw){$.each(raw.split(';'),function(i,entry){var split=entry.split('=');parsed[split[0]]=split[1];});}
return parsed;};SectionAjax.prototype.expected_posts=function(){var post_counts=this.parse_post_count_cookie();var expected_posts=parseInt(post_counts[section_id_path],10);if(isNaN(expected_posts)){expected_posts=MORE_POSTS_COUNT;}
expected_posts+=expected_posts%MORE_POSTS_COUNT;return expected_posts;};$.fn.mi_section_ajax=function(settings){var _settings=$.extend({exclude:"",section_id_path:""},settings);this.each(function(){new SectionAjax(_settings,$(this));});};})(jQuery);(function($){function show_image(container,index){var settings=container.data('mi_gallery');container.find('.count .current').html(index+1);var scroller=container.find('.scrollable').data('scrollable');if(index<scroller.getIndex()||index>scroller.getIndex()+scroller.getConf().size){scroller.seekTo(index,300);}
var thumb=container.find('.thumb:eq('+index+')');var url=thumb.find('a').attr('href');current(container).removeClass('current');thumb.addClass('current');container.find('.photo img').fadeOut(function(){container.find('.photo').css('height',$(this).height());$(this).remove();$('<img/>').load(function(){$(this).hide();container.find('#photo_container')
.html('')
.append(this)
.parent().css('height','auto');scale($(this),settings.max_image_width);$(this).fadeIn();container.triggerHandler('mi_gallery_on_image_change',{container:container,index:index,thumb:thumb});})
.attr('src',url)
.css('display','inline');});var caption=thumb.find('a img').attr('alt');container.find('.caption').fadeOut(function(){$(this).html('').append(caption).fadeIn();container.triggerHandler('mi_gallery_on_caption_change',{container:container,index:index,thumb:thumb});});fix_buttons(container);}
function scale(image,max_width){var width=image.width();var height=image.height();if(width>max_width){var ratio=width/height;width=max_width;height=width/ratio;}
image.attr('width',width);image.attr('height',height);}
function thumbs(container){return container.find('.thumb');}
function current(container){return container.find('.thumb.current');}
function current_index(container){return thumbs(container).index(current(container));}
function is_last(container,index){return index>=thumbs(container).length-1;}
function is_first(container,index){return index<=0;}
function fix_buttons(container){var left=container.find('.photo_left');var right=container.find('.photo_right');var index=thumbs(container).index(current(container));if(is_first(container,index)){left.addClass('disabled');}
else{left.removeClass('disabled');}
if(is_last(container,index)){right.addClass('disabled');}
else{right.removeClass('disabled');}}
$.fn.mi_gallery=function(_settings){var settings={max_image_width:532};$.extend(settings,_settings);this.each(function(){var container=$(this);container.data('mi_gallery',settings);container.find('.photo img').load(function(){scale($(this),settings.max_image_width);});fix_buttons(container);container.find('.thumb a').bind('click',{container:container},function(event){var container=event.data.container;var index=thumbs(container).index($(this).parent());show_image(container,index);return false;});container.find('.photo_left').bind('click',{container:container},function(event){var container=event.data.container;var index=current_index(container);if(!is_first(container,index)){show_image(container,index-1);}
return false;});container.find('.photo_right').bind('click',{container:container},function(event){var container=event.data.container;var index=current_index(container);if(!is_last(container,index)){show_image(container,index+1);}
return false;});if($.isFunction(settings.on_caption_change)){container.bind('mi_gallery_on_caption_change',settings.on_caption_change);}
if($.isFunction(settings.on_image_change)){container.bind('mi_gallery_on_image_change',settings.on_image_change);}});};})(jQuery);var mi=(typeof mi=='undefined')?{'media_domain':''}:mi;if(window.miAppControler){mi.control=new miAppControler();}
mi.getArgs=function(){if(typeof mi.args=='undefined'){mi.args={};var query=location.search.substring(1);var pairs=query.split('&');for(var i=pairs.length-1;i>=0;i--){var pos=pairs[i].indexOf('=');if(pos==-1){continue;}
mi.args[pairs[i].substring(0,pos)]=unescape(pairs[i].substring(pos+1));}}
return mi.args;};mi._console=function(s){mi._console.log=(mi._console.log&&mi._console.log.length>0)?mi._console.log+'\n---------------------------------------------------\n'+s:s;};mi.fixConsole=function(){if(typeof window.console!="object"){window.console={};}
if(window.console.is_fixed){}
else{var firebugMethods=["log","debug","info","warn","error","assert","dir","dirxml","trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];var methodCount=firebugMethods.length;var args=mi.getArgs();var view=(args.viewlog&&args.viewlog=='1');for(var i=0;i<methodCount;i++){var methodName=firebugMethods[i];if(typeof window.console[methodName]!="function"){switch(methodName){case'log':if(view){window.console.log=mi._console;if(window.addEventListener){window.addEventListener("load",function(){alert(mi._console.log);},false);}else if(window.attachEvent){window.attachEvent("onload",function(){alert(mi._console.log);});}}else{window.console.log=function(){};}
break;default:eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase()+": '+ s)};");}}}}
window.console.is_fixed=true;};mi.fixConsole();mi.cloneObject=function(sourceObj){if(sourceObj==null||typeof sourceObj!='object'){return sourceObj;}
var temp=new sourceObj.constructor();for(var key in sourceObj){temp[key]=mi.cloneObject(sourceObj[key]);}
return temp;};mi.App=function(){var _configs={};this._manageConf=function(prop,val){return val;};this.setConf=function(){switch(arguments.length){case 1:for(var prop in arguments[0]){_configs[prop]=this._manageConf(prop,arguments[0][prop]);}
break;case 2:_configs[arguments[0]]=this._manageConf(arguments[0],arguments[1]);break;default:console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');}};this.getConf=function(prop){return _configs[prop];};this.viewConfs=function(){console.dir(_configs);};this.cache={};switch(arguments.length){case 1:this.setConf(arguments[0]);break;case 2:this.setConf(arguments[0],arguments[1]);break;}};mi.getEventSrc=function(e){if(!e){e=window.event;}
if(e.target){return e.target;}else if(e.srcElement){return e.srcElement;}};mi.templateVarPattern=/\@([^\@]+)\@/g;mi.templateParser=function(data,template){return template.replace(mi.templateVarPattern,function(){return data[arguments[1]];})};mi.makeHash=function(sourceData,firstDelimiter,secondDelimiter){if(sourceData&&firstDelimiter&&secondDelimiter){var hash={};var pairs=sourceData.split(firstDelimiter);var pos;for(var i=pairs.length-1;i>=0;i--){if(typeof(pairs[i+1])!='undefined'){pos=pairs[i].indexOf(secondDelimiter);if(pos==-1){continue;}
hash[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);}}
return hash;}
else{console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');}};mi.loadPageInfo=function(){if(window.pageInfo){var pi=window.pageInfo;if(this.pageInfo==undefined){this.pageInfo=this.cloneObject(pi);}else{for(var key in pi){if(key==='version'&&(parseFloat(pi[key])>parseFloat(this.pageInfo.version))){this.pageInfo.version=pi[key];}else if(this.pageInfo[key]==undefined){this.pageInfo[key]=this.cloneObject(pi[key]);}else if(typeof this.pageInfo[key]=='object'){for(var key2 in pi[key]){this.pageInfo[key][key2]=(this.pageInfo[key][key2])?this.pageInfo[key][key2]:this.cloneObject(pi[key][key2]);}}}}}
window.pageInfo=null;}
mi.wait_for_ready=function(time,target,callback){var checker,time_spent=0,interval=3000;_check_document=function(){if(null!==$(target)){clearInterval(checker);callback();}else{time_spent+=interval/1000;if(time_spent>=time){clearInterval(checker);}}};$(document).ready(function(){checker=setInterval(_check_document,interval);});};var mi=(!mi)?{'media_domain':''}:mi;mi.Cookie=function(document,name,minutes,path,domain,secure){this.$document=(document)?document:window.document;this.$name=(name)?name:'cookie';this.$expiration=(minutes)?new Date((new Date()).getTime()+minutes*60000):null;this.$path=(path)?path:null;this.$domain=(domain)?domain:null;this.$secure=(secure)?true:false;};mi.Cookie.prototype.store=function(){var cookieVal="";for(var prop in this){if((prop.charAt(0)=='$')||((typeof this[prop])=='function')){continue;}
if(cookieVal!==""){cookieVal+='&';}
cookieVal+=prop+':'+escape(this[prop]);}
var cookie=this.$name+'='+cookieVal;cookie+=(this.$expiration)?'; expires='+this.$expiration.toGMTString():'';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+=(this.$secure)?'; secure':'';this.$document.cookie=cookie;};mi.Cookie.prototype.load=function(){var allCookies=this.$document.cookie;if(allCookies===""){return false;}
var start=allCookies.indexOf(this.$name+'=');if(start==-1){return false;}
start+=this.$name.length+1;var end=allCookies.indexOf(';',start);if(end==-1){end=allCookies.length;}
var cookieVal=allCookies.substring(start,end);var a=cookieVal.split('&');if((a.length==1)&&(a[0].indexOf(':')==-1)){var prop=this.$name;this[prop]=unescape(cookieVal.replace(/\+/g,'%20'));return true;}
for(var i=0;i<a.length;i++){a[i]=a[i].split(':');}
for(i=0;i<a.length;i++){this[a[i][0]]=unescape(a[i][1]);}
return true;};mi.Cookie.prototype.remove=function(){var cookie=this.$name+'=';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+='; expires=Fri, 02-Jan-1970 00:00:00 GMT';this.$document.cookie=cookie;};mi.Commenting=function(){mi.App.apply(this,arguments);this._manageConf=function(prop,val){switch(prop){case'enabled':var v=parseInt(val);if(isNaN(v)){val=(val.toLowerCase)?val.toLowerCase():val;switch(val){case true:case'true':case'yes':case'on':v=1;break;default:v=0;break;}}
val=v;default:break;}
return val;};if(mi.control&&mi.control.commenting!=undefined){this.setConf('enabled',mi.control.commenting);}else{this.setConf('enabled',0);console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');}
mi.loadPageInfo();var splitHost=window.location.host.split('.');this.setConf('accountName',splitHost[splitHost.length-2]);this.setConf('target','commentingStage');this.finish();};mi.Commenting.prototype.finish=function(){};mi.Commenting.prototype.display=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('display commenting');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._renderCommenting();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('display commenting');}};mi.Commenting.prototype.displayPopular=function(count){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
var e=this.getConf('enabled');if(e!==0&&e!==3&&e!==4){this._displayPopular(count);}else{console.info('The popular comment threads widget has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}};mi.Commenting.prototype.displayCommentCount=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('comment count');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._displayCommentCount();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('comment count');}}
mi.Commenting.prototype.extended=true;var disqus_identifier,disqus_shortname,disqus_remote_auth_s2,disqus_title,disqus_developer,disqus_url;if(typeof facebookXdReceiverPath=="undefined"){var facebookXdReceiverPath;}
mi.Commenting.prototype._displayCommentingDisqus=function(){window.disqus_identifier=this.getThreadId();var cookie=new mi.Cookie(document,'disqus');if(cookie.load()){window.disqus_remote_auth_s2=cookie.disqus;}
window.disqus_title=mi.pageInfo.asset.title;if(window.disqus_identifier!=undefined){var target=document.getElementById(this.getConf('target'));window.disqus_url=window.location.href.split("#")[0];if(window.disqus_url.match(/:\/\/preview/)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/:\/\/[^\.]+\./,"://www.");}
else if(window.disqus_url.match(/-preview\./)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/-preview\./,"-site.");}
var thread=document.createElement('div');thread.id='disqus_thread';target.appendChild(thread);var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='http://'+this.getConf('accountName')+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}else{console.error('Commenting could not be loaded because there was no defined thread id.');}};mi.Commenting.prototype._renderCommenting=mi.Commenting.prototype._displayCommentingDisqus;mi.Commenting.prototype._displayPopularDisqus=function(count){count=(isNaN(count))?this.getConf('discoveryCount'):count;if(isNaN(count)){count=0;}
count=(count>0&&count<21)?Math.floor(count):5;document.write('<script type="text/javascript" src="http://disqus.com/forums/'+this.getConf('accountName')+'/popular_threads_widget.js?num_items='+count+'"></script>');};mi.Commenting.prototype._displayPopular=mi.Commenting.prototype._displayPopularDisqus;mi.Commenting.prototype._displayCommentCountDisqus=function(){window.disqus_identifier=this.getThreadId();window.disqus_shortname=this.getConf('accountName');document.getElementById('commentCount').href=document.getElementById('commentCount').href+'#disqus_thread';document.getElementById('commentCount').setAttribute('data-disqus-identifier',this.getThreadId());var s=document.createElement('script');s.async=true;s.src='http://disqus.com/forums/'+this.getConf('accountName')+'/count.js';(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild(s);};mi.Commenting.prototype._displayCommentCount=mi.Commenting.prototype._displayCommentCountDisqus;mi.Commenting.prototype.getThreadId=function(){return(mi.pageInfo&&mi.pageInfo.asset&&mi.pageInfo.asset.id)?mi.pageInfo.asset.id:undefined;};mi.Commenting.prototype.finish=function(){window.facebookXdReceiverPath='/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';}
mi.Commenting.prototype.reset_disqus_config=function(disqus_cookie_val,public_api_key){var mi_disqus_config=new disqus_config();var sso_name=mi_disqus_config.sso.name.toString();var sso_button=mi_disqus_config.sso.button.toString();var sso_url=mi_disqus_config.sso.url.toString();var sso_logout=mi_disqus_config.sso.logout.toString();var sso_width=mi_disqus_config.sso.width.toString();var sso_height=mi_disqus_config.sso.height.toString();disqus_config=function(){this.page.remote_auth_s3=disqus_cookie_val;this.page.api_key=public_api_key;this.sso={name:sso_name,button:sso_button,url:sso_url,logout:sso_logout,width:sso_width,height:sso_height};};}
function miLoadWriter(){}
mi.Loader=function(){mi.App.apply(this,arguments);this.preLoads=new Array();this.postLoads=new Array();this.onloads=new Array();this.contents=new Array();this.targets=new Array();this.loadBacks=new Array();this.writeModes=new Array();this.intIds=new Array();this.moveAttempts=new Array();this.isLateLoad=new Array();this.lastSuccess=false;this.contentCount=0;this.loaderOn=true;}
mi.Loader.prototype.getIndexContent=function(contentIndex)
{if(contentIndex>=0&&contentIndex<this.contents.length){return this.contents[contentIndex]+"";}
else{return'';}}
mi.Loader.prototype.getIndexPreload=function(contentIndex)
{if(contentIndex>=0&&contentIndex<this.preLoads.length){return this.preLoads[contentIndex]+"";}
else{return'';}}
mi.Loader.prototype.getIndexPostload=function(contentIndex)
{if(contentIndex>=0&&contentIndex<this.postLoads.length){return this.postLoads[contentIndex]+"";}
else{return'';}}
mi.Loader.prototype.defaultContent=function(targetId)
{var curIndex=this.contentCount+0;this.contentCount++;this.targets[curIndex]=targetId;this.loadBacks[curIndex]=false;this.preLoads[curIndex]='';this.postLoads[curIndex]='';this.onloads[curIndex]='';this.contents[curIndex]='';return curIndex;}
mi.Loader.prototype.lateLoadMove=function(sourceId,targetId)
{var curIndex=this.defaultContent(targetId);if(!(this.loaderOn)){return false;}
this.lastSuccess=false;this.lastSuccess=this.moveDivAppend(sourceId,targetId);return this.lastSuccess;}
mi.Loader.prototype.storeContent=function(content,writeMode)
{if(this.loaderOn==false){if(writeMode==1){document.write(content);}
else{document.write('<scr'+'ipt>'+content+'</scr'+'ipt>');}
return;}
var curIndex=this.contentCount+0;this.contentCount++;this.loadBacks[curIndex]=false;this.onloads[curIndex]='';this.preLoads[curIndex]='';this.postLoads[curIndex]='';this.writeModes[curIndex]=writeMode;this.intIds[curIndex]="";this.moveAttempts[curIndex]=0;this.isLateLoad[curIndex]=true;document.write('<div class="mi_lateLoaderBlank" id="mi_lateLoaderBlank'+curIndex+'"></div>');var markerDiv=document.getElementById('mi_lateLoaderBlank'+curIndex);var targetDiv=markerDiv.parentNode;this.targets[curIndex]=targetDiv.id;this.contents[curIndex]=this.unescape(content);}
mi.Loader.prototype.lateLoadInsert2=function(contentIndex)
{var sourceDiv=document.getElementById("mi_lateLoaderLoad"+contentIndex);var markerDiv=document.getElementById("mi_lateLoaderBlank"+contentIndex);var targetDiv=markerDiv.parentNode;if(targetDiv!=null&&sourceDiv!=null&&markerDiv!=null){targetDiv.insertBefore(sourceDiv,markerDiv);return true;}
return false;}
mi.Loader.prototype.lateInsertAll=function(contentIndex)
{var maxContent=this.contentCount+0;for(var contentIndex=0;contentIndex<maxContent;contentIndex++){if(this.isLateLoad[contentIndex]===undefined){continue;}
if(!(this.isLateLoad[contentIndex])){continue;}
this.lateLoadInsert2(contentIndex);}}
mi.Loader.prototype.lateLoadInsertWrapper=function(contentIndex)
{if(this.lateLoadInsert(contentIndex)){return true;}
else{this.intIds[contentIndex]=setInterval("mi.loader.lateLoadInsert("+contentIndex+")",500);}
}
mi.Loader.prototype.lateLoadAppend=function(contentIndex)
{var targetId=this.targets[contentIndex];var targetDiv=document.getElementById(targetId);var sourceDiv=document.getElementById("mi_lateLoaderLoad"+contentIndex);var markerDiv=document.getElementById("mi_lateLoaderBlank"+contentIndex);if(targetDiv!=null&&sourceDiv!=null){targetDiv.appendChild(sourceDiv);return true;}
return false;}
mi.Loader.prototype.lateAppendAll=function(contentIndex)
{var maxContent=this.contentCount+0;for(var contentIndex=0;contentIndex<maxContent;contentIndex++){if(this.isLateLoad[contentIndex]===undefined){continue;}
if(!(this.isLateLoad[contentIndex])){continue;}
this.lateLoadAppend(contentIndex);}}
mi.Loader.prototype.lateWriteContent=function(contentIndex)
{var content=this.contents[contentIndex];if(this.writeModes[contentIndex]==1){document.write('<div id="mi_lateLoaderLoad'+contentIndex+'">'+content+'</div>');}
else{document.write('<div id="mi_lateLoaderLoad'+contentIndex+'"><scr'+'ipt>'+content+'</scr'+'ipt></div>');}
try{this.lateLoadInsertWrapper(contentIndex);}
catch(err){}}
mi.Loader.prototype.lateWriteContent2=function(contentIndex)
{if(this.isLateLoad[contentIndex]===undefined){return true;}
if(!(this.isLateLoad[contentIndex])){return true;}
if(contentIndex>=this.contentCount||contentIndex<0){return false;}
var content=this.contents[contentIndex];if(this.writeModes[contentIndex]==1){document.write(content);}
else{document.write('<scr'+'ipt>'+content+'</scr'+'ipt>');}
return true;}
mi.Loader.prototype.lateWriteAll=function()
{var maxContent=this.contentCount+0;for(var contentIndex=0;contentIndex<maxContent;contentIndex++){this.lateWriteContent(contentIndex);}}
mi.Loader.prototype.moveDivAppend=function(sourceDivId,targetDivId)
{var sourceDiv=document.getElementById(sourceDivId);var targetDiv=document.getElementById(targetDivId);if(sourceDiv!=null&&targetDiv!=null){targetDiv.appendChild(sourceDiv);sourceDiv.style.display='block';sourceDiv.style.width='100%';sourceDiv.style.height='100%';sourceDiv.style.border='';sourceDiv.style.padding='0px';sourceDiv.style.margin='0px';return true;}
return false;}
mi.Loader.prototype.moveSource=function(sourceDivId,targetDivId)
{var sourceDiv=document.getElementById(sourceDivId);var targetDiv=document.getElementById(targetDivId);if(sourceDiv!=null&&targetDiv!=null){var mysrc=sourceDiv.innerHTML+"";sourceDiv.innerHTML="";targetDiv.innerHTML=mysrc+"";return true;}
return false;}
mi.Loader.prototype.getContent=function()
{if(this.loadMe===undefined){return'';}
if(this.loadMe==null){return'';}
return this.unescape(this.loadMe);}
mi.Loader.prototype.unescape=function(str)
{str=str.replace(/#~~#/g,"\"");str=str.replace(/@~~@/g,"\\");str=str.replace(/_~~_/g,"\n");return str;}
mi.loader=new mi.Loader();mi.FindnSave=function(){mi.App.apply(this,arguments);if(mi.control&&mi.control.findnsave!==undefined){this.setConf("enabled",mi.control.findnsave);this.config();this.setDomainValues();}else{this.setConf("enabled",0);console.warn("FindnSave has been instantiated, but disabled because mi.control.findnsave is not defined.");}
this.firstWidget=true;};mi.FindnSave.prototype.config=function(){};mi.FindnSave.prototype.setDomainValues=function(){var self=this;self.setConf("fns_subdomain","findnsave.");var fns_domain=self.getConf("fns_domain");if(fns_domain===undefined||fns_domain===""){var splitHost=window.location.host.split(".");this.setConf("fns_domain",splitHost[splitHost.length-2]+"."+splitHost[splitHost.length-1]);}};mi.FindnSave.prototype.insertFnSDomain=function(){var self=this;var fns_class_selector=".fns_anchor";var fns_domain_link_element=document.getElementById("fns_domain_link");var fns_subdomain=self.getConf("fns_subdomain");var fns_domain=self.getConf("fns_domain");var fns_uri=jQuery(fns_class_selector).attr("href");var full_url="http://"+fns_subdomain+fns_domain;jQuery(fns_class_selector).each(function(index){var href_text=jQuery(this).attr("href");href_text=full_url+href_text;jQuery(this).attr("href",href_text);});if(fns_domain_link_element){fns_domain_link_element.innerHTML=self.getConf("fns_subdomain")+fns_domain;}};mi.FindnSave.prototype.isFirstWidget=function(){if(this.firstWidget){this.firstWidget=false;return true;}
else{return false;}};mi.DealSaver=function(){mi.App.apply(this,arguments);if(mi.control&&mi.control.dealsaver!==undefined){this.setConf("enabled",mi.control.dealsaver);}else{this.setConf("enabled",0);console.warn("DealSaver has been instantiated, but disabled because mi.control.dealsaver is not defined.");}};mi.DealSaver.prototype.executeDs=function(){var self=this;var e=self.getConf("enabled");if(e!==0){dsUrl="http://"+window.location.hostname+"/static/dealsaver/dealsaver.json";jQuery.ajax({type:"GET",cache:false,dataType:"json",url:dsUrl,success:function(data){self.distributeData(data);self.displayWidget(self.getConf("enabled"));},error:function(){self.setConf("enabled",0);self.displayWidget(self.getConf("enabled"));}});}
else{console.info('Display of DealSaver has been disabled.');}};mi.DealSaver.prototype.distributeData=function(data){jQuery("#dealsaver_td .ds_dealtitle").attr("href",data.page.site.sitelink.$t);jQuery("#dealsaver_td .ds_title_link").attr("href",data.page.deals.deal.link.$t);jQuery("#dealsaver_td .ds_title_link").html(data.page.deals.deal.offer.$t);jQuery("#dealsaver_td .ds_pricetag").prepend("$"+data.page.deals.deal.saleprice.$t);jQuery("#dealsaver_td .ds_deal_image img").attr("src",data.page.deals.deal.splashpagethumbnail.$t);jQuery("#dealsaver_td .ds_deal_image a").attr("href",data.page.deals.deal.link.$t);jQuery("#dealsaver_td .ds_pricetag a").attr("href",data.page.deals.deal.link.$t);jQuery("#dealsaver_td .ds_logo_link").attr("href",data.page.site.sitelink.$t);};mi.DealSaver.prototype.displayWidget=function(display_mode){if(display_mode!==0){jQuery(".dsWidgetDisplay").attr("style","display:block");}};var mi=(!mi)?{'media_domain':''}:mi;mi.SideScrollAd=function(container){this.container=$(container).length?$(container):'';this.trigger_percentage=70;this.show=false;if(this.container!=='')
{this.right=this.container.css('right');$(window).bind('scroll',{obj:this},function(event){var obj=event.data.obj;if(obj.getScrollPosition()>obj.trigger_percentage&&obj.show===false)
{obj.container.stop().animate({'right':'0px'},850);obj.visible('true');}
else if(obj.getScrollPosition()<obj.trigger_percentage)
{obj.container.stop().animate({'right':obj.right},850);obj.visible('false');}});$("#closeSlideout a").bind('click',{obj:this},function(event){var obj=event.data.obj;obj.container.stop().animate({'right':obj.right},850);});}
else
{console.warn("Slide ad cannot be instantiated. "+container+" does not exist.");}};mi.SideScrollAd.prototype.visible=function(value)
{if(value===undefined)
{return this.show;}
else
{switch(value)
{case'true':case 1:this.show=true;break;case'false':case 0:this.show=false;break;default:break;}}};mi.SideScrollAd.prototype.getScrollPosition=function()
{var bottom=$(window).height()+$(window).scrollTop();var height=$(document).height();return Math.round(100*bottom/height);};mi.floorAd=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;var adDoc;this.wrapper;this.mainImg;floorAd_mainImg;this.mainWidth;this.mainHeight;this.leaveImg;this.leaveHeight;this.closeLink;this.openLink="";this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.checkForAd(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.checkForAd=function(container,repeat,adWrapper,adObject,count)
{if($('#floorboard-ad').length>0){adDoc=$(container);this.container=$(container).length?$(container):'';}
else{adDoc=$(adWrapper+" iframe").contents();this.initIframeSize(adWrapper);this.setIframeHeight(adWrapper,110);this.container=adDoc.find(container);var numdiv=adDoc.find("#floorboard-wrapper");if(numdiv.length<1){if(count++<60){setTimeout(adObject+".checkForAd( '"+container+"', "+repeat+",'"+adWrapper+"','"+adObject+"',"+count+" )",500);}
return;}}
this.floorAdExec(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.floorAdExec=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;$(adWrapper).css("display","inline");this.wrapper=adDoc.find("#floorboard-wrapper");this.mainImg=adDoc.find('img:eq(0)');floorAd_mainImg=this.mainImg;this.mainWidth=this.mainImg.width();this.mainHeight=this.mainImg.height();this.leaveImg=adDoc.find('img:eq(1)');floorAd_leaveImg=this.leaveImg;this.leaveHeight=this.leaveImg.height();this.closeLink=adDoc.find('map[name="floorclosemap"]  area');this.openLink=adDoc.find('map[name="flooropenmap"] area');this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.cookie=new mi.Cookie(document,this.cookieName);this.cookie.load();if(this.container!=='')
{this.container.css({'position':'fixed','text-align':'left','bottom':'0','right':'0','left':'0'});if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod'||navigator.platform=='Linux armv7l')
{this.container.css("position","static");}
this.wrapper.css({'width':this.mainWidth+'px','text-align':'left','margin':'0 auto'});if(this.mainImg!=='')
{this.flightID=this.mainImg[0].getAttribute('data-flightid');if(this.flightID==null){this.leaveImg[0].getAttribute('data-flightid');}
this.flightID=this.flightID!=null?this.flightID:'';var minutesAgo=this.lastShown();if(minutesAgo>=0&&minutesAgo<=this.repeat){this.expand=false;}
this.setCookie();this.mainImg.css({'position':'absolute','border':'0','bottom':(-1*this.mainHeight),'z-index':'2147483647'});if(this.leaveImg!==''&&this.closeLink!=='')
{this.leaveImg.css({'visibility':'hidden','border':'0','position':'absolute','bottom':(-1*this.leaveHeight),'z-index':'2147483647'});this.closeAd=function(){$(adWrapper+" div").animate({'height':"30px"});floorAd_leaveImg.css({'visibility':'visible','bottom':(-1*floorAd_mainImg.height())});floorAd_mainImg.animate({'bottom':(-1*floorAd_mainImg.height())});$('body').animate({'margin-bottom':floorAd_leaveImg.height()});floorAd_leaveImg.animate({'bottom':'0'});};this.closeLink.click(this.closeAd);if(this.openLink!='')
{this.openLink.click(function(){$(adWrapper+" div").animate({'height':"110px"});floorAd_leaveImg.animate({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').animate({'margin-bottom':floorAd_mainImg.height()});});}}
var passAd2ready=this;$(document).ready(function(){if(passAd2ready.expand){floorAd_leaveImg.css({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').css({'margin-bottom':floorAd_mainImg.height()});}
else{passAd2ready.closeAd();}});}
else
{console.warn("No floor ad images to display");}}
else
{console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");}};mi.floorAd.prototype.setCookie=function()
{var cookieData=new Array();var flightKey='fbid'+this.flightID;if(this.cookie){for(var prop in this.cookie){if(prop.indexOf('fbid')!=-1){var id_time=parseInt(this.cookie[prop]);if((this.timeStamp-id_time)<=this.repeat){cookieData[prop]=this.cookie[prop];}}}}
this.cookie.remove();this.cookie=new mi.Cookie(document,this.cookieName,this.getConf('repeat'),'/');this.cookie[flightKey]=this.timeStamp;for(var prop in cookieData){this.cookie[prop]=cookieData[prop];}
this.cookie.store();};mi.floorAd.prototype.lastShown=function(flightID)
{flightKey='fbid'+this.flightID;if(this.cookie){if(this.cookie[flightKey]){var id_time=parseInt(this.cookie[flightKey]);return(this.timeStamp-id_time);}
else{return-1;}}
return-1;}
mi.floorAd.prototype.setIframeHeight=function(adWrapper,height)
{$(adWrapper+" div").height(height+"px");}
mi.floorAd.prototype.initIframeSize=function(adWrapper)
{$(adWrapper+" iframe").each(function(index){if(this.id.indexOf('google_ads_iframe_')!=-1){this.width="100%";this.height="100%";}});}
$(window).load(function(){$('div[name=adx_al]').bind('click',function(){var $curMarg=$('body').css('margin-bottom').replace("px","");$curMarg=($curMarg==30)?110:30;$('body').css('margin-bottom',$curMarg+'px');});$('.advertisement img').each(function(index){if(this.height==1&&this.width==1){$(this).css("display","none");}});});mi.Multimedia=function(){mi.App.apply(this,arguments);this.widget=jQuery('#wgt_rcntmulti');this.widgetContent=jQuery('#wgt_rcntmulti ul.tiles.four');this.currentPage=0;this.lastPage=this.widgetContent.length-1;console.log('Multimedia: '+(this.lastPage+1)+' pages registered.');if(this.lastPage>this.currentPage){this._setupCarousel();this.preload();}};mi.Multimedia.prototype._setupCarousel=function(){if(typeof(jQuery)=='function'){this.widgetContent.each(function(index,obj){jQuery(obj).addClass('js').css({'float':'left','margin':'0'});jQuery(obj).find('li').each(function(i,element){switch(i){case 0:jQuery(element).css({'border-right':'1px solid #cccccc','border-bottom':'1px solid #cccccc'});break;case 1:jQuery(element).css({'border-bottom':'1px solid #cccccc'});break;case 2:jQuery(element).css({'border-right':'1px solid #cccccc'});break;case 3:jQuery(element).css({'border':'none'});break;}});jQuery(obj).find('li a img').each(function(i,element){jQuery(element).css({'width':'120px'});});});var widgetContent_height=jQuery('#wgt_rcntmulti .rcnt_content').height()-1;var $prev=jQuery('<div id="rcnt_prev"><span id="rcnt_left" /></div>').css({'height':widgetContent_height+"px"});var $next=jQuery('<div id="rcnt_next"><span id="rcnt_right" /></div>').css({'height':widgetContent_height+"px"});this.widgetContent.eq(0).before($prev)
this.widgetContent.last().after($next);var nav=['#rcnt_prev','#rcnt_next'];$.each(nav,function(i,element){jQuery(element).attr('unselectable','on').css('MozUserSelect','none').css('webkitUserSelect','none');});jQuery('#wgt_rcntmulti ul.tiles.four.js').css({'height':widgetContent_height+"px"});this._updateUI();}};mi.Multimedia.prototype._updateUI=function(){var dots=this.widget.find('span.pag div');dots.each(function(){if($(this).hasClass('current')){$(this).removeClass('current');}});dots.eq(this.currentPage).addClass('current');var $prev=jQuery('#rcnt_prev');var $left=jQuery('#rcnt_left');var $next=jQuery('#rcnt_next');var $right=jQuery('#rcnt_right');if(this.currentPage===0){$left.css({'background-position':'-10px -278px'});$prev.hover(function(){jQuery(this).css({'background-color':'#eee'});});}
else{$left.css({'background-position':'-10px -92px'});$prev.hover(function(){jQuery(this).css({'background-color':'#e0e0e0'});},function(){jQuery(this).css({'background-color':'#eee'});});}
if(this.currentPage===this.lastPage){$right.css({'background-position':'-10px -334px'});$next.hover(function(){jQuery(this).css({'background-color':'#eee'});});}
else{$right.css({'background-position':'-10px -148px'});$next.hover(function(){jQuery(this).css({'background-color':'#e0e0e0'});},function(){jQuery(this).css({'background-color':'#eee'});});}};mi.Multimedia.prototype._prev=function(){if(this.currentPage===0){return this.currentPage;}
else{return this.currentPage-1;}};mi.Multimedia.prototype._next=function(){if(this.numPages===0||this.currentPage===this.lastPage){return this.currentPage;}
else{return this.currentPage+1;}};mi.Multimedia.prototype.preload=function(){jQuery('#rcnt_next').bind('click',{obj:this},function(event){var obj=event.data.obj;var orig=obj.widgetContent.eq(obj.currentPage);var next_page=obj.widgetContent.eq(obj._next());orig.hide();next_page.show();obj.currentPage=obj._next();obj._updateUI();});jQuery('#rcnt_prev').bind('click',{obj:this},function(event){var obj=event.data.obj;var orig=obj.widgetContent.eq(obj.currentPage);var prev_page=obj.widgetContent.eq(obj._prev());orig.hide();prev_page.show();obj.currentPage=obj._prev();obj._updateUI();});var dots=this.widget.find('span.pag');dots.css({'display':'block','float':'right','width':''+(12*(this.lastPage+1))+'px','height':'100%'});for(var i=0;i<=this.lastPage;i++){var div=jQuery('<div>');if(i===0){div.addClass('current');}
div.appendTo(dots);}};mi.Surveywall=function(_config){mi.App.apply(this,arguments);mi.loadPageInfo();if(this.appStatus(_config)){var self=this;this.setConf("enabled",mi.control.surveywall);this.cache.baseGoogleSourceRequest=this.buildGoogleSourceRequest();this.initializeAlternateActionObject(_config.alternateActionObject);if(!this.cache.google_script_regex){this.cache.google_script_regex="(prompt|survey)\\?site="+this.getConf("google_site_id");}
this.initiatePrompt();jQuery(this.getConf("paging_selector")).bind("click",function(){self.initiatePrompt();});window.mi_g1pman_setPhotoViewsPassLimit=function(){self.setViewsPassLimit()};}
else{this.setConf("enabled",0);console.warn("Surveywall has been instantiated but disabled.");}}
mi.Surveywall.prototype.appStatus=function(_config){if(mi.control&&mi.control.surveywall&&this.checkCookie(_config.view_limit)!==0&&this.validPermitExists()&&this.isPagePermitted(_config.page_permit)){return true;}
else{return false;}}
mi.Surveywall.prototype.initiatePrompt=function(){if(this.getConf("enabled")&&this.checkCookie()&&!this.cache.prompt_active){if(!this.getAlternateActionStatus()){this.cache.prompt_active=this.loadScriptSource(this.cache.baseGoogleSourceRequest.cloneNode());}}}
mi.Surveywall.prototype.setViewsPassLimit=function(){var self=this;this.setCookieThreshold(this.cache.viewLimit);}
mi.Surveywall.prototype.checkCookie=function(n){n=this.cache.viewLimit=+n||+this.getConf("view_limit")||5;if(!this._cookie){this._cookie=new mi.Cookie(document,"mi_surveywall",null,"/");this._cookie.load();if((this._cookie.threshold=+this._cookie.threshold)===0){return this._cookie.threshold;}}
else if((this._cookie.threshold=+this._cookie.threshold)<=n){if(this._cookie.threshold===1){return this._cookie.threshold;}
else if(this._cookie.threshold>1&&this._cookie.threshold<=n){this.setCookieThreshold(--this._cookie.threshold);return false;}
else{this.setCookieThreshold();return false;}}
else{this.setCookieThreshold(n);return false;}}
mi.Surveywall.prototype.setCookieThreshold=function(n){this._cookie.threshold=(n!==undefined)?n:this._cookie.threshold;this._cookie.store();return this._cookie.threshold;}
mi.Surveywall.prototype.setCookieExpiration=function(n){this._cookie.expiration=(n!==undefined)?n:this._cookie.expiration;this._cookie_store();return this._cookie.expiration;}
mi.Surveywall.prototype.validPermitExists=function(){var pageInfo=mi.pageInfo;this.cache.section_id=(pageInfo&&pageInfo.section&&pageInfo.section.id)?pageInfo.section.id:undefined;this.cache.type=(pageInfo&&pageInfo.type)?pageInfo.type:undefined;this.cache.asset_id=(pageInfo&&pageInfo.asset&&pageInfo.asset.id)?pageInfo.asset.id:undefined;if(this.cache.section_id||this.cache.type||this.cache.asset_id){return true;}
else{return false;}}
mi.Surveywall.prototype.isPagePermitted=function(page_permit_obj){var page_values={section:this.cache.section_id,type:this.cache.type,asset:this.cache.asset_id}
var permit=false;for(var action in page_permit_obj){for(var permit_facet in page_permit_obj[action]){if(page_permit_obj[action][permit_facet].length!==0){var permission_values=page_permit_obj[action][permit_facet];var isMatch=permission_values.match(page_values[permit_facet]);switch(action){case"exclude":if(isMatch){permit=false;}
else{permit=true;}
break;case"include":if(isMatch){permit=true;}
else{permit=false;}
break;}}}}
if(permit){return true;}else{return false;}}
mi.Surveywall.prototype.buildGoogleSourceRequest=function(request_obj){if(request_obj){var CONTENT_ID=(this.getConf("use_asset_id")&&this.cache.asset_id!==undefined)?this.cache.asset_id:(new Date()).getTime();var random=(new Date).getTime()+1;request_obj.src+=(CONTENT_ID?'&cid='+
encodeURIComponent(CONTENT_ID):"")+'&random='+
random+'&after=1';return request_obj;}
else{var ARTICLE_URL=window.location.href;var GOOGLE_SITE_ID=this.getConf("google_site_id");var google_source_url='http://survey.g.doubleclick.net/survey'+
'?site='+encodeURIComponent(GOOGLE_SITE_ID)+
'&url='+encodeURIComponent(ARTICLE_URL);var request_obj=document.createElement("script");request_obj.setAttribute("src",google_source_url);request_obj.setAttribute("type","text/javascript");return request_obj;}}
mi.Surveywall.prototype.loadScriptSource=function(request_obj,target){var self=this;if(!target){var target=document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0];}
request_obj=this.buildGoogleSourceRequest(request_obj);target.appendChild(request_obj);var list=document.getElementsByTagName("script")
for(x=0;x<list.length;x++){if((value=list[x].src.match(this.cache.google_script_regex))){return true;}}}
mi.Surveywall.prototype.initializeAlternateActionObject=function(alternateAction){if(typeof alternateAction.object=="function"){this._alternateAction=new alternateAction.object();for(x in alternateAction){if(typeof x==="number"||typeof x==="string"){this._alternateAction[x]=alternateAction[x];}}
return false;}
else{this._alternateAction=alternateAction;}}
mi.Surveywall.prototype.initializeAlternateActionTarget=function(altActionDocObject){var self=this;this.pollPrompt();this._alternateAction.iframeDocument=altActionDocObject;this.cache.learnMoreLink=this.buildLearnMoreLink();jQuery("<link rel=\"stylesheet\" type=\"text/css\">")
.attr("href",self.getConf("alternateActionObject").css)
.appendTo(jQuery(self._alternateAction.iframeDocument)
.find("head"));this.injectAlternateAction(this.getConf("alternateActionObject").html);this.applyListeners(this._alternateAction.deferred_listener_list);}
mi.Surveywall.prototype.injectAlternateAction=function(payload){var self=this;var targetFrameBody=this._alternateAction.iframeDocument.getElementsByTagName("body")[0];if(payload.indexOf("http://")==0){jQuery.ajax({url:self.getConf("alternateActionObject").html,success:function(d,t){jQuery(d)
.appendTo(targetFrameBody);self.injectLearnMoreLink(targetFrameBody);return t;},async:false});}
else{jQuery(payload)
.appendTo(targetFrameBody);self.injectLearnMoreLink(targetFrameBody);}
}
mi.Surveywall.prototype.buildLearnMoreLink=function(){var self=this;if(this.getConf("learn_more")){var link=this._alternateAction.iframeDocument.createElement("a");link.id="info-link";link.innerHTML="Learn More";link.style.cssText="float: right; font-size: .8em; color:#378707;";link.href="javascript:void(0)";jQuery(link).click(function(){self.displayMessage(self.getConf("learn_more"))});return link;}
else{return false}}
mi.Surveywall.prototype.injectLearnMoreLink=function(targetFrameBody){if(this.getConf("learn_more")&&!jQuery(targetFrameBody).find("#info-link")[0]){targetFrameBody.appendChild(this.cache.learnMoreLink);}
else{return false}}
mi.Surveywall.prototype.displayMessage=function(message){iframe_body=this._alternateAction.iframeDocument;jQuery(iframe_body).find("#msg").html(message);jQuery(iframe_body).find("#msgBlock").fadeIn();jQuery(iframe_body).find("#msgButton").click(function(){jQuery(iframe_body).find("#msgBlock").fadeOut()});}
mi.Surveywall.prototype.applyListeners=function(listener_list){if(listener_list){var self=this;for(x=0;x<listener_list.length;x++){var y=listener_list[x];var selector=jQuery(this._alternateAction.iframeDocument).find(y[0]);jQuery(selector).bind(y[1],function(){self[y[2]](y[3])});}}}
mi.Surveywall.prototype.pollPrompt=function(){var self=this;setTimeout(function(){prompt_state=jQuery("#contain-402").css("display");if(prompt_state==="block"){self.pollPrompt();}
else{self.cache.prompt_active=false;jQuery("head").find("script").each(function(){if((value=this.src.match(self.cache.google_script_regex))){this.parentElement.removeChild(this)}});if(prompt_state==="none"){jQuery("#contain-402").remove();self.setViewsPassLimit();}}},500);}
mi.Surveywall.prototype.getAlternateActionStatus=function(){return true;}
mi.Surveywall.prototype.getAlternateActionStatus=function(){this.ppCookie=new mi.Cookie(document,"ppUser",null,"/");if(this.ppCookie.load()){this.setCookieThreshold(0);this.setConf("enabled",0);return true;}
else{return false;}}
function getCookieVal(offset){var endstr=document.cookie.indexOf(";",offset);if(endstr==-1)
endstr=document.cookie.length;return unescape(document.cookie.substring(offset,endstr));}
function GetCookie(cname){var arg=cname+"=";var alen=arg.length;var clen=document.cookie.length;var i=0;while(i<clen){var j=i+alen;if(document.cookie.substring(i,j)==arg)return getCookieVal(j);i=document.cookie.indexOf("",i)+1;if(i==0)break;}return null;}
function SaveCookie(cname,cvalue,cdays,cpath){ex=new Date;ex.setTime(ex.getTime()+(cdays*86400000));if(cpath==null){cpath="/"}else{cpath="; path="+cpath}
sitedom=location.hostname.replace(/www\./,"");document.cookie=cname+'='+cvalue+'; expires='+ex.toGMTString()+cpath+"; domain="+sitedom;}
if(typeof insitecookie=="undefined"){var insitecookie=document.cookie.match(auth_cookie_name);}
var icname=GetCookie(insitecookie);if(icname&&icname.indexOf('.threshold')==-1){document.write("<style>#nonmember{display:none;}</style>");}else{document.write("<style>#member{display:none;}</style>");}
$(document).ready(function(){$('.member_button, .member_options').hover(function(){$('.member_options').show();},function(){$('.member_options').hide();});});var IEPNGFix=window.IEPNGFix||{};IEPNGFix.tileBG=function(elm,pngSrc,ready){var data=this.data[elm.uniqueID],elmW=Math.max(elm.clientWidth,elm.scrollWidth),elmH=Math.max(elm.clientHeight,elm.scrollHeight),bgX=elm.currentStyle.backgroundPositionX,bgY=elm.currentStyle.backgroundPositionY,bgR=elm.currentStyle.backgroundRepeat;if(!data.tiles){data.tiles={elm:elm,src:'',cache:[],img:new Image(),old:{}};}
var tiles=data.tiles,pngW=tiles.img.width,pngH=tiles.img.height;if(pngSrc){if(!ready&&pngSrc!=tiles.src){tiles.img.onload=function(){this.onload=null;IEPNGFix.tileBG(elm,pngSrc,1);};return tiles.img.src=pngSrc;}}else{if(tiles.src)ready=1;pngW=pngH=0;}
tiles.src=pngSrc;if(!ready&&elmW==tiles.old.w&&elmH==tiles.old.h&&bgX==tiles.old.x&&bgY==tiles.old.y&&bgR==tiles.old.r){return;}
var pos={top:'0%',left:'0%',center:'50%',bottom:'100%',right:'100%'},x,y,pc;x=pos[bgX]||bgX;y=pos[bgY]||bgY;if(pc=x.match(/(\d+)%/)){x=Math.round((elmW-pngW)*(parseInt(pc[1])/100));}
if(pc=y.match(/(\d+)%/)){y=Math.round((elmH-pngH)*(parseInt(pc[1])/100));}
x=parseInt(x);y=parseInt(y);var repeatX={'repeat':1,'repeat-x':1}[bgR],repeatY={'repeat':1,'repeat-y':1}[bgR];if(repeatX){x%=pngW;if(x>0)x-=pngW;}
if(repeatY){y%=pngH;if(y>0)y-=pngH;}
this.hook.enabled=0;if(!({relative:1,absolute:1}[elm.currentStyle.position])){elm.style.position='relative';}
var count=0,xPos,maxX=repeatX?elmW:x+0.1,yPos,maxY=repeatY?elmH:y+0.1,d,s,isNew;if(pngW&&pngH){for(xPos=x;xPos<maxX;xPos+=pngW){for(yPos=y;yPos<maxY;yPos+=pngH){isNew=0;if(!tiles.cache[count]){tiles.cache[count]=document.createElement('div');isNew=1;}
var clipR=Math.max(0,xPos+pngW>elmW?elmW-xPos:pngW),clipB=Math.max(0,yPos+pngH>elmH?elmH-yPos:pngH);d=tiles.cache[count];s=d.style;s.behavior='none';s.left=(xPos-parseInt(elm.currentStyle.paddingLeft))+'px';s.top=yPos+'px';s.width=clipR+'px';s.height=clipB+'px';s.clip='rect('+
(yPos<0?0-yPos:0)+'px,'+
clipR+'px,'+
clipB+'px,'+
(xPos<0?0-xPos:0)+'px)';s.display='block';if(isNew){s.position='absolute';s.zIndex=-999;if(elm.firstChild){elm.insertBefore(d,elm.firstChild);}else{elm.appendChild(d);}}
this.fix(d,pngSrc,0);count++;}}}
while(count<tiles.cache.length){this.fix(tiles.cache[count],'',0);tiles.cache[count++].style.display='none';}
this.hook.enabled=1;tiles.old={w:elmW,h:elmH,x:bgX,y:bgY,r:bgR};};IEPNGFix.update=function(){for(var i in IEPNGFix.data){var t=IEPNGFix.data[i].tiles;if(t&&t.elm&&t.src){IEPNGFix.tileBG(t.elm,t.src);}}};IEPNGFix.update.timer=0;if(window.attachEvent&&!window.opera){window.attachEvent('onresize',function(){clearTimeout(IEPNGFix.update.timer);IEPNGFix.update.timer=setTimeout(IEPNGFix.update,100);});}
(function($){var methods={};methods.populate=function(){var search=this.textbox.val();var that=this;this.provider.requestSuggestions(search,function(matches){if(matches.length===0){that.target.hide();return;}
var html='';$.each(matches,function(){html+='<a href='+this.url+that.hash+'>'+this.label+'</a>';});that.target.find('#suggestionMatches').html(html);that.target.show();});};methods.closeSuggestions=function(){this.target.hide();this.textbox.focus();this.disabled=true;};methods.selected=function(selected){if(typeof(selected)!=='undefined'){this.target.find('#suggestionMatches a').removeClass('selectedSuggestion');if(selected){window.status=selected.attr('href');return selected.addClass('selectedSuggestion');}}
return this.target.find('#suggestionMatches .selectedSuggestion');};methods.selectedIndex=function(index){if(typeof(index)==="number"){if(index<0){this.selected(null);return-1;}
if(index>=this.target.find('#suggestionMatches a').length){index=0;}
this.selected(this.target.find('#suggestionMatches a:eq('+index+')'));return index;}
return this.target.find('#suggestionMatches').children().index(this.selected());};$.fn.AutoSuggest=function(_settings){if($.browser.msie&&parseInt($.browser.version)<7){return this;}
this.each(function(){var defaults={provider:new PageSuggestions(),hash:'#asuggest',disabled:false};var inst=$.extend(defaults,methods,_settings);inst.textbox=$(this);inst.target=$('<div id="suggestTarget" />')
.hide()
.append('<a id="suggestionMessage">Are you looking for?<span id="close_button">X</span></a>')
.append('<div id="suggestionMatches" />')
.insertAfter($(this));$(this).data('AutoSuggest',inst);$(this).attr('autocomplete','off');$(this).bind('keyup',handleKey);$(this).bind('keydown',handleEscapeKey);inst.target.find('#suggestionMessage').click($.proxy(inst.closeSuggestions,inst));inst.target.bind('mousemove',{inst:inst},handleMouseMove);});return this;};function handleEscapeKey(event){var inst=$(this).data('AutoSuggest');if(inst.disabled){return;}
if(event.which===27){inst.closeSuggestions();return false;}}
function handleKey(event){var inst=$(this).data('AutoSuggest');if(inst.disabled){return;}
var key=event.which;if(key!==8&&key!==13&&key<32||(key>=33&&key<38)||(key>=39&&key<40)||(key>=41&&key<=46)||(key>=112&&key<=123)){}
else if(key===8&&inst.textbox.val()===''){inst.target.hide();}
else if(key===40){inst.selectedIndex(inst.selectedIndex()+1);}
else if(key===38){inst.selectedIndex(inst.selectedIndex()-1);}
else if(key===13){var selected=inst.selected();if(selected.length>0){document.location=selected.attr('href');}}
else{inst.populate();}}
function handleMouseMove(event){var inst=event.data.inst;if($(event.target).parent('#suggestionMatches').length&&!$(event.target).hasClass('selectedSuggestions')){inst.selected($(event.target));}
else{inst.selected(null);}}
function PageSuggestions(url){this.url=url;};PageSuggestions.prototype.requestSuggestions=function(search,callback){this.fetch(function(pages){search=search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");if(search.length<2){return[];}
var searchRegex=new RegExp(search,'i');callback($.grep(pages,function(item,index){return item.label.match(searchRegex);}));});};PageSuggestions.prototype.fetch=function(callback){if(this.pages){callback(this.pages);return;}
var that=this;$.ajax({url:this.url,dataType:'json',success:function(data){if(!$.isArray(data)){data=[];}
that.pages=data;callback(data);},error:function(xhr,type,message){if(typeof(window.console)!=='undefined'){console.log("Error reading search suggestions: "+type);console.log(message);}
that.pages=[];}});};window.PageSuggestions=PageSuggestions;$(document).ready(function(){$('#search_keywords').AutoSuggest({provider:new PageSuggestions('/static/searchsuggestions.js'),hash:window.autoSuggestHash});});})(jQuery);function chooseRelevanceSort(){var sortType=$.cookie('search_sort');if(sortType){if(sortType!=0){$.cookie("search_sort","0",{expires:30,path:"/"});window.location.reload();}}}
function chooseDateSort(){var sortType=$.cookie('search_sort');if(sortType){if(sortType!=1){$.cookie("search_sort","1",{expires:30,path:"/"});window.location.reload();}}
else{$.cookie("search_sort","1",{expires:30,path:"/"});window.location.reload();}}
(function($){function checkSortCookie(){var sortType=$.cookie('search_sort');if(sortType){if(sortType==1){$('input[name=resultSort]').filter('[value=date]').attr('checked',true);}
else{$('input[name=resultSort]').filter('[value=relevance]').attr('checked',true);}}
else{$('input[name=resultSort]').filter('[value=relevance]').attr('checked',true);}}
$(document).ready(function(){checkSortCookie();});})(jQuery);function blogDisplay(){this.blogNum=0;this.blogs=new Array();this.canAdd=true;this.isDisplayed=false;}
function blogData(blogName,blogURL,blogImg,author,blurb,contentURL){this.blogName=blogName;this.blogURL=blogURL;this.blogImg=blogImg;this.author=author;this.blurb=blurb;this.contentURL=contentURL;}
blogDisplay.prototype.addBlog=function(blogName,blogURL,blogImg,author,blurb,contentURL)
{if(!this.canAdd){return;}
this.blogs[this.blogNum++]=new blogData(blogName,blogURL,blogImg,author,blurb,contentURL);}
blogDisplay.prototype.finishAdding=function()
{this.canAdd=false;}
blogDisplay.prototype.displayBlogs=function(targetID)
{if(this.isDisplayed){return;}
blogstr='';for(var i=0;i<this.blogNum;i++){blogstr+='<div class="blog"><div class="bdescr2">';blogstr+='<a href="'+this.blogs[i].blogURL+'"><img src="'+this.blogs[i].blogImg+'" alt="" /></a>';blogstr+='<h3><a href="'+this.blogs[i].blogURL+'">'+this.blogs[i].blogName+'</a></h3>';blogstr+='<h4>by '+this.blogs[i].author+'</h4><p>'+this.blogs[i].blurb+'</p></div><div class="entries"><h2>LATEST BLOG ENTRIES</h2>';blogstr+='<div id="blogContent_'+i+'" class="blatest"></div></div></div>';}
var targetDiv=document.getElementById(targetID);if(targetDiv!=null){var blogDiv=document.createElement('div');blogDiv.id='blogmain';targetDiv.appendChild(blogDiv);$('#blogmain').addClass("widget");blogDiv.innerHTML=blogstr;}
else{document.write('<div id="blogmain" class="widget">'+blogstr+'</div>');}
this.isDisplayed=true;this.loadBlogContent();$("#blogmain .blog").mouseover(function(){$(this).addClass("blogFocus");});$("#blogmain .blog").mouseleave(function(){$(this).removeClass("blogFocus");});}
blogDisplay.prototype.loadBlogContent=function()
{for(var i=0;i<this.blogNum;i++){$('#blogContent_'+i).load('/static/blogs/'+this.blogs[i].contentURL);}}
