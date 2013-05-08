// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
//starting document.ready()
$(document).ready(function(e) {
	// removing last separator from sticky header nav links 
	$("#sticky-nav a:last,.node-subnav a:last").css("background","none");    	
	
	$("#emailLiteSignupFooter").submit(function(event){
		var val = $(".esignup").val();
		
		if(val == emailLightDefaultVal)
			$(".esignup").val("");
	});
	
	$(".esignup").val(emailLightDefaultVal).focus(function(){
		if ($(this).val() == emailLightDefaultVal) {
			$(this).val("");
		}
		}).blur(function(){
		if ($(this).val() == "") {
			$(this).val(emailLightDefaultVal);
		}
		});
	//start recently viewed carousel
	if($("#recently_viewed").length > 0){
		$("#recently_viewed").carouFredSel({
			direction: "up",
			circular: false,
			infinite: false,
			width: 140,
			align: "center",
			items: {
				visible: 3,
				minimum: 3,
				width: 140,
				height: 189
			},
			auto: false,
			prev: {
				button: ".up_btn",
				key: "up",
				items: 3
			},
			next: {
				button: ".down_btn ",
				key: "down",
				items: 3
			},
			swipe: 3
			
			})
	}
	// End recently viewed carousel
	// start Carousel for recently viewed in product page	
	if($(".mostwanted").length > 0){
	$(".mostwanted").carouFredSel({
		circular: false,
		infinite: false,
		width: 1024,
		align: "left",
		height: "auto",
		items: {
			visible: 5,
			minimum: 5,
			width: 200,
			height: 270
		},
		auto: false,
		prev: {
			button: ".Lprev_btn",	
			items: 5
		},
		next: {
			button: ".Lnext_btn ",
			items: 5
		},
		swipe: 5
	})
	}
	// End Carousel for recently viewed in product page	
	// start Carousel for you ll aslo love in product page	
if($(".alsolove").length > 0){	
$(".alsolove").carouFredSel({
		circular: false,
		infinite: false,
		width: 1024,
		align: "left",
		height: "auto",
		items: {
			visible: 5,
			minimum: 5,
			width: 200,
			height: 270
		},
		auto: false,
		prev: {
			button: ".prev_btn",	
			items: 5
		},
		next: {
			button: ".next_btn ",
			items: 5
		},
		swipe: 5
	})
	}
	// End Carousel for you ll aslo love in product page	
	$("#TopNav li:last").addClass("lastItem");  //removing margin from the last item in top navigation inc_topnav	
	$("#TopNav li:last").css("margin-right","0px");
	$(".call").colorbox({inline:true,maxWidth:500});
	$("#hqPhotos a").colorbox();	
	$(".hidecats").click(function() {$("#seoCatDiv").slideUp();$(".morecats").removeClass("redcolor");}); // slid up more cats on click on hide button on footer inc_seo
	$(".morecats").click(function() {$(this).addClass("redcolor");});
	
	//signout Popup
	$("#shSignOut").click(function(){    
		document.forms['frm_ht_logout'].submit();		
	}); //end logout colorbox
	
	$(".bh").parent().hover(function() {	
		$("img.bh").toggleClass("bhred");
	});	
	// End Document.ready	
});
(function( utils, $, undefined ) {
    /*
	 * Used when replacing text within an html block. Aka, passing in txt = "Size: [[size]]", replace = "size", and with_this = "1" would result in "Size: 1"
	 */
	utils.replaceAll = function(txt, replace, with_this) {
		if(txt == null || replace == null || with_this == null) {
			return txt;
		}
		return txt.replace(new RegExp("\\[\\[" + replace + "]]", 'g'), with_this);
	};
	
	utils.toggleStaticPopup = function(divId, scrollTo) {
		$("#"+divId).parent().css("position","relative");
		$("#"+divId).slideToggle();
		if(scrollTo != "" && scrollTo != "#") {
			//$("#"+divId).scrollTop($(scrollTo, "#"+divId).offset().top);
			$("#"+divId).animate({
				scrollTop: $(scrollTo).position().top
			}, 500);
		}
	};
}( window.utils = window.utils || {}, jQuery ));

/*!
 * jQzoom Evolution Library v2.3  - Javascript Image magnifier
 * http://www.mind-projects.it
 * Copyright 2011, Engineer Marco Renzi
 * Licensed under the BSD license.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * Date: 03 May 2011 22:16:00
 */
(function($){var v=$.browser.msie&&$.browser.version<7;var w=$(document.body);var y=$(y);var z=false;$.fn.jqzoom=function(e){return this.each(function(){var t=this.nodeName.toLowerCase();if(t=="a"){new jqzoom(this,e)}})};jqzoom=function(g,h){function Smallimage(c){var d=this;this.node=c[0];this.findborder=function(){var a=0;a=c.css("border-top-width");btop="";var b=0;b=c.css("border-left-width");bleft="";if(a){for(i=0;i<3;i++){var x=[];x=a.substr(i,1);if(isNaN(x)==false){btop=btop+""+a.substr(i,1)}else{break}}}if(b){for(i=0;i<3;i++){if(!isNaN(b.substr(i,1))){bleft=bleft+b.substr(i,1)}else{break}}}d.btop=btop.length>0?eval(btop):0;d.bleft=bleft.length>0?eval(bleft):0};this.fetchdata=function(){d.findborder();d.w=c.width();d.h=c.height();d.ow=c.outerWidth();d.oh=c.outerHeight();d.pos=c.offset();d.pos.l=c.offset().left+d.bleft;d.pos.t=c.offset().top+d.btop;d.pos.r=d.w+d.pos.l;d.pos.b=d.h+d.pos.t;d.rightlimit=c.offset().left+d.ow;d.bottomlimit=c.offset().top+d.oh};this.node.onerror=function(){alert("Problems while loading image.");throw"Problems while loading image."};this.node.onload=function(){d.fetchdata();if($(".zoomPad",g).length==0)k.create()};return d}function Loader(){var e=this;this.append=function(){this.node=$("<div/>").addClass("zoomPreload").css("visibility","hidden").html(l.preloadText);$(".zoomPad",g).append(this.node)};this.show=function(){this.node.top=(p.oh-this.node.height())/2;this.node.left=(p.ow-this.node.width())/2;this.node.css({top:this.node.top,left:this.node.left,position:"absolute",visibility:"visible"})};this.hide=function(){this.node.css("visibility","hidden")};return this}function Lens(){var e=this;this.node=$("<div/>").addClass("zoomPup");this.append=function(){$(".zoomPad",g).append($(this.node).hide());if(l.zoomType=="reverse"){this.image=new Image;this.image.src=p.node.src;$(this.node).empty().append(this.image)}};this.setdimensions=function(){this.node.w=parseInt(l.zoomWidth/g.scale.x)>p.w?p.w:parseInt(l.zoomWidth/g.scale.x);this.node.h=parseInt(l.zoomHeight/g.scale.y)>p.h?p.h:parseInt(l.zoomHeight/g.scale.y);this.node.top=(p.oh-this.node.h-2)/2;this.node.left=(p.ow-this.node.w-2)/2;this.node.css({top:0,left:0,width:this.node.w+"px",height:this.node.h+"px",position:"absolute",display:"none",borderWidth:1+"px"});if(l.zoomType=="reverse"){this.image.src=p.node.src;$(this.node).css({opacity:1});$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-p.bleft)+"px",top:-(this.node.top+1-p.btop)+"px"})}};this.setcenter=function(){this.node.top=(p.oh-this.node.h-2)/2;this.node.left=(p.ow-this.node.w-2)/2;this.node.css({top:this.node.top,left:this.node.left});if(l.zoomType=="reverse"){$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-p.bleft)+"px",top:-(this.node.top+1-p.btop)+"px"})}s.setposition()};this.setposition=function(e){function r(e){return g.mousepos.x-e.w/2<p.pos.l}function i(e){return g.mousepos.x+e.w/2>p.pos.r}function o(e){return g.mousepos.y-e.h/2<p.pos.t}function u(e){return g.mousepos.y+e.h/2>p.pos.b}g.mousepos.x=e.pageX;g.mousepos.y=e.pageY;var t=0;var n=0;t=g.mousepos.x+p.bleft-p.pos.l-(this.node.w+2)/2;n=g.mousepos.y+p.btop-p.pos.t-(this.node.h+2)/2;if(r(this.node)){t=p.bleft-1}else if(i(this.node)){t=p.w+p.bleft-this.node.w-1}if(o(this.node)){n=p.btop-1}else if(u(this.node)){n=p.h+p.btop-this.node.h-1}this.node.left=t;this.node.top=n;this.node.css({left:t+"px",top:n+"px"});if(l.zoomType=="reverse"){if($.browser.msie&&$.browser.version>7){$(this.node).empty().append(this.image)}$(this.image).css({position:"absolute",display:"block",left:-(this.node.left+1-p.bleft)+"px",top:-(this.node.top+1-p.btop)+"px"})}s.setposition()};this.hide=function(){m.css({opacity:1});this.node.hide()};this.show=function(){if(l.zoomType!="innerzoom"&&(l.lens||l.zoomType=="drag")){this.node.show()}if(l.zoomType=="reverse"){m.css({opacity:l.imageOpacity})}};this.getoffset=function(){var t={};t.left=e.node.left;t.top=e.node.top;return t};return this}function Stage(){var e=this;this.node=$("<div class='zoomWindow'><div class='zoomWrapper'><div class='zoomWrapperTitle'></div><div class='zoomWrapperImage'></div></div></div>");this.ieframe=$('<iframe class="zoomIframe" src="javascript:\'\';" marginwidth="0" marginheight="0" align="bottom" scrolling="no" frameborder="0" ></iframe>');this.setposition=function(){this.node.leftpos=0;this.node.toppos=0;if(l.zoomType!="innerzoom"){switch(l.position){case"left":this.node.leftpos=p.pos.l-p.bleft-Math.abs(l.xOffset)-l.zoomWidth>0?0-l.zoomWidth-Math.abs(l.xOffset):p.ow+Math.abs(l.xOffset);this.node.toppos=Math.abs(l.yOffset);break;case"top":this.node.leftpos=Math.abs(l.xOffset);this.node.toppos=p.pos.t-p.btop-Math.abs(l.yOffset)-l.zoomHeight>0?0-l.zoomHeight-Math.abs(l.yOffset):p.oh+Math.abs(l.yOffset);break;case"bottom":this.node.leftpos=Math.abs(l.xOffset);this.node.toppos=p.pos.t-p.btop+p.oh+Math.abs(l.yOffset)+l.zoomHeight<screen.height?p.oh+Math.abs(l.yOffset):0-l.zoomHeight-Math.abs(l.yOffset);break;default:this.node.leftpos=p.rightlimit+Math.abs(l.xOffset)+l.zoomWidth<screen.width?p.ow+Math.abs(l.xOffset):0-l.zoomWidth-Math.abs(l.xOffset);this.node.toppos=Math.abs(l.yOffset);break}}this.node.css({left:this.node.leftpos+"px",top:this.node.toppos+"px"});return this};this.append=function(){$(".zoomPad",g).append(this.node);this.node.css({position:"absolute",display:"none",zIndex:5001});if(l.zoomType=="innerzoom"){this.node.css({cursor:"default"});var t=p.bleft==0?1:p.bleft;$(".zoomWrapper",this.node).css({borderWidth:t+"px"})}$(".zoomWrapper",this.node).css({width:Math.round(l.zoomWidth)+"px",borderWidth:t+"px"});$(".zoomWrapperImage",this.node).css({width:"100%",height:Math.round(l.zoomHeight)+"px"});$(".zoomWrapperTitle",this.node).css({width:"100%",position:"absolute"});$(".zoomWrapperTitle",this.node).hide();if(l.title&&n.length>0){$(".zoomWrapperTitle",this.node).html(n).show()}e.setposition()};this.hide=function(){switch(l.hideEffect){case"fadeout":this.node.fadeOut(l.fadeoutSpeed,function(){});break;default:this.node.hide();break}this.ieframe.hide()};this.show=function(){switch(l.showEffect){case"fadein":this.node.fadeIn();this.node.fadeIn(l.fadeinSpeed,function(){});break;default:this.node.show();break}if(v&&l.zoomType!="innerzoom"){this.ieframe.width=this.node.width();this.ieframe.height=this.node.height();this.ieframe.left=this.node.leftpos;this.ieframe.top=this.node.toppos;this.ieframe.css({display:"block",position:"absolute",left:this.ieframe.left,top:this.ieframe.top,zIndex:99,width:this.ieframe.width+"px",height:this.ieframe.height+"px"});$(".zoomPad",g).append(this.ieframe);this.ieframe.show()}}}function Largeimage(){var e=this;this.node=new Image;this.loadimage=function(e){t.show();this.url=e;this.node.style.position="absolute";this.node.style.border="0px";this.node.style.display="none";this.node.style.left="-5000px";this.node.style.top="0px";document.body.appendChild(this.node);this.node.src=e};this.fetchdata=function(){var t=$(this.node);var n={};this.node.style.display="block";e.w=t.width();e.h=t.height();e.pos=t.offset();e.pos.l=t.offset().left;e.pos.t=t.offset().top;e.pos.r=e.w+e.pos.l;e.pos.b=e.h+e.pos.t;n.x=e.w/p.w;n.y=e.h/p.h;g.scale=n;document.body.removeChild(this.node);$(".zoomWrapperImage",g).empty().append(this.node);q.setdimensions()};this.node.onerror=function(){throw"Problems while loading the big image."};this.node.onload=function(){e.fetchdata();t.hide();g.largeimageloading=false;g.largeimageloaded=true;if(l.zoomType=="drag"||l.alwaysOn){q.show();r.show();q.setcenter()}};this.setposition=function(){var e=-g.scale.x*(q.getoffset().left-p.bleft+1);var t=-g.scale.y*(q.getoffset().top-p.btop+1);$(this.node).css({left:e+"px",top:t+"px"})};return this}var j=null;j=$(g).data("jqzoom");if(j)return j;var k=this;var l=$.extend({},$.jqzoom.defaults,h||{});k.el=g;g.rel=$(g).attr("rel");g.zoom_active=false;g.zoom_disabled=false;g.largeimageloading=false;g.largeimageloaded=false;g.scale={};g.timer=null;g.mousepos={};g.mouseDown=false;$(g).css({"outline-style":"none","text-decoration":"none"});var m=$("img:eq(0)",g);g.title=$(g).attr("title");g.imagetitle=m.attr("title");var n=$.trim(g.title).length>0?g.title:g.imagetitle;var p=new Smallimage(m);var q=new Lens;var r=new Stage;var s=new Largeimage;var t=new Loader;$(g).bind("click",function(e){e.preventDefault();return false});var u=["standard","drag","innerzoom","reverse"];if($.inArray($.trim(l.zoomType),u)<0){l.zoomType="standard"}$.extend(k,{create:function(){if($(".zoomPad",g).length==0){g.zoomPad=$("<div/>").addClass("zoomPad");m.wrap(g.zoomPad)}if(l.zoomType=="innerzoom"){l.zoomWidth=p.w;l.zoomHeight=p.h}if($(".zoomPup",g).length==0){q.append()}if($(".zoomWindow",g).length==0){r.append()}if($(".zoomPreload",g).length==0){t.append()}if(l.preloadImages||l.zoomType=="drag"||l.alwaysOn){k.load()}k.init()},init:function(){if(l.zoomType=="drag"){$(".zoomPad",g).mousedown(function(){g.mouseDown=true});$(".zoomPad",g).mouseup(function(){g.mouseDown=false});document.body.ondragstart=function(){return false};$(".zoomPad",g).css({cursor:"default"});$(".zoomPup",g).css({cursor:"move"})}if(l.zoomType=="innerzoom"){$(".zoomWrapper",g).css({cursor:"crosshair"})}$(".zoomPad",g).bind("mouseenter mouseover",function(e){m.attr("title","");$(g).attr("title","");g.zoom_active=true;p.fetchdata();if(g.largeimageloaded){k.activate(e)}else{k.load()}});$(".zoomPad",g).bind("mouseleave",function(e){k.deactivate()});$(".zoomPad",g).bind("mousemove",function(e){if(e.pageX>p.pos.r||e.pageX<p.pos.l||e.pageY<p.pos.t||e.pageY>p.pos.b){q.setcenter();return false}g.zoom_active=true;if(g.largeimageloaded&&!$(".zoomWindow",g).is(":visible")){k.activate(e)}if(g.largeimageloaded&&(l.zoomType!="drag"||l.zoomType=="drag"&&g.mouseDown)){q.setposition(e)}});var c=new Array;var i=0;var d=new Array;d=$("a").filter(function(){var e=new RegExp("gallery[\\s]*:[\\s]*'"+$.trim(g.rel)+"'","i");var t=$(this).attr("rel");if(e.test(t)){return this}});if(d.length>0){var f=d.splice(0,1);d.push(f)}d.each(function(){if(l.preloadImages){var a=$.extend({},eval("("+$.trim($(this).attr("rel"))+")"));c[i]=new Image;c[i].src=a.largeimage;i++}$(this).click(function(e){if($(this).hasClass("zoomThumbActive")){return false}d.each(function(){$(this).removeClass("zoomThumbActive")});e.preventDefault();k.swapimage(this);return false})})},load:function(){if(g.largeimageloaded==false&&g.largeimageloading==false){var e=$(g).attr("href");g.largeimageloading=true;s.loadimage(e)}},activate:function(e){clearTimeout(g.timer);q.show();r.show()},deactivate:function(e){switch(l.zoomType){case"drag":break;default:m.attr("title",g.imagetitle);$(g).attr("title",g.title);if(l.alwaysOn){q.setcenter()}else{r.hide();q.hide()}break}g.zoom_active=false},swapimage:function(a){g.largeimageloading=false;g.largeimageloaded=false;var b=new Object;b=$.extend({},eval("("+$.trim($(a).attr("rel"))+")"));if(b.smallimage&&b.largeimage){var c=b.smallimage;var d=b.largeimage;$(a).addClass("zoomThumbActive");$(g).attr("href",d);m.attr("src",c);q.hide();r.hide();k.load()}else{alert("ERROR :: Missing parameter for largeimage or smallimage.");throw"ERROR :: Missing parameter for largeimage or smallimage."}return false}});if(m[0].complete){p.fetchdata();if($(".zoomPad",g).length==0)k.create()}$(g).data("jqzoom",k)};$.jqzoom={defaults:{zoomType:"standard",zoomWidth:300,zoomHeight:300,xOffset:10,yOffset:0,position:"right",preloadImages:true,preloadText:"",title:true,lens:true,imageOpacity:.4,alwaysOn:false,showEffect:"show",hideEffect:"hide",fadeinSpeed:"slow",fadeoutSpeed:"2000"},disable:function(e){var t=$(e).data("jqzoom");t.disable();return false},enable:function(e){var t=$(e).data("jqzoom");t.enable();return false},disableAll:function(e){z=true},enableAll:function(e){z=false}}})(jQuery)
