(function(){
  // if firefox 3.5+, hide content till load (or 3 seconds) to prevent FOUT
  var d = document, e = d.documentElement, s = d.createElement('style');
  if (e.style.MozTransform === ''){ // gecko 1.9.1 inference
    s.textContent = 'body{visibility:hidden}';
    e.firstChild.appendChild(s);
    function f(){ s.parentNode && s.parentNode.removeChild(s); }
    addEventListener('load',f,false);
    setTimeout(f,3000); 
  }
})();



//floodlight tag global function
function fireFloodlight(src, type, cat, url, delay, target) {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	$('body').append('<iframe id="fFrame" name="fFrame" src="" width="1" height="1" frameborder="0" style="display:none;"></iframe>');
	$('#fFrame').attr('src', 'https://1782317.fls.doubleclick.net/activityi;src=' + src + ';type=' + type + ';cat=' + cat + ';ord=1;num=' + a + '?');
	

	if(url){
		if(target===1) setTimeout(window.open(url),delay);
		else setTimeout("window.location.href = '"+url+"';", delay);
	}
}


function setDelay(delay)
{
var date = new Date();
var currentDate = null;

do { currentDate = new Date(); }
while(currentDate-date < delay);
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof oldonload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}

function hidden_navi() {
	if (!document.getElementById('hidden_navi')) return false;
	var hiddenNavi = document.getElementById('hidden_navi');
	hiddenNavi.onfocus = function () {
		hiddenNavi.style.position = 'relative';
		hiddenNavi.style.top = '0';
	}
	hiddenNavi.onblur = function () {
		hiddenNavi.style.position = 'absolute';
		hiddenNavi.style.top = '-1000px';
	}
}

function search_footer_input() {
	if (!document.getElementById('search_footer_input')) return false;
	var searchInput = document.getElementById('search_footer_input');
	if ($('#search_footer_input').attr('value') != null) {
		$('#search_footer_input').attr('value', '');
	}
	searchInput.onfocus = function () {
		searchInput.className = 'search_input_nobg';
	}
}
addLoadEvent(hidden_navi);
addLoadEvent(search_footer_input);

function popOpen(uri, name, width, height, top, left, option) {
	window.open(uri, name, 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + "," + option);
}

function showLayerPopupBackground() {
	$('body').append('<div id="layer_transparency"></div>');
	$('#layer_transparency').show();
} 

/* p2ì—ì„œ ê°€ì ¸ì˜¨ leftmenu í™œì„±í™”ì½”ë“œ */
function chg_leftmenu(id) {
	obj = document.getElementById(id);
	obj.className = "on";
}

function viewlayer(va, onoff) {
	var obj = document.getElementById(va);
	if (onoff == "on") obj.style.display = "block";
	else if (onoff == "in") obj.style.display = "inline";
	else obj.style.display = "none";
}

function movePage(obj) {
	obj = document.getElementById(obj);
	location.href = obj.options[obj.selectedIndex].value;
}

/* print this */
function print_this_page(){
	window.print();
}

/* faq */
function initToggle(tabContainer) {
	triggers = tabContainer.getElementsByTagName("a");
	for(i = 0; i < triggers.length; i++) {
		triggers.item(i).targetEl = document.getElementById(triggers.item(i).href.split("#")[1]);
		if (!triggers.item(i).targetEl)
			continue;
		triggers.item(i).targetEl.style.display = "none";
		triggers.item(i).onclick = function () {
			if (tabContainer.current == this) {
				this.targetEl.style.display = "none";
				tabContainer.current = null;
			} else {
				if (tabContainer.current) {
					tabContainer.current.targetEl.style.display = "none";
				}
				this.targetEl.style.display = "block";
				tabContainer.current = this;
			}
			return false;
		}
	}
}

/* popup */
var win=null;
function NewWindow(mypage,myname,w,h,scroll,pos){
	var LeftPosition=0;
	var TopPosition=0;
	if(pos=="random"){
		LeftPosition=(screen.width) ? Math.floor(Math.random()*(screen.width-w)):100;
		TopPosition=(screen.height) ? Math.floor(Math.random()*((screen.height-h)-75)):100;
	} else if(pos=="center"){
		LeftPosition=(screen.width) ? (screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;
	} else {
		LeftPosition=0;
		TopPosition=20;
	}

	LeftPosition=parseInt(LeftPosition);
	TopPosition=parseInt(TopPosition);

	// for IE
	if((navigator.appVersion.indexOf("MSIE") != -1) ? true : false){
		h=Number(h)+35;
	}
	var settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
	win=window.open(mypage,myname,settings);
	if (win==null) {
		if (navigator.appVersion.indexOf("MSIE") != -1)
		{
			viewlayer('winalert_layer','on')
		}
	}
}

//images rollover
function menuOn(imgEl) {
	imgEl.src = imgEl.src.replace(".gif", "_on.gif");
}
function menuOut(imgEl) {
	imgEl.src = imgEl.src.replace("_on.gif", ".gif");
}
function menuOnjpg(imgEl) {
	imgEl.src = imgEl.src.replace(".jpg", "_on.jpg");
}
function menuOut(imgEl) {
	imgEl.src = imgEl.src.replace("_on.gif", ".gif");
}
function menuOutjpg(imgEl) {
	imgEl.src = imgEl.src.replace("_on.jpg", ".jpg");
}

/* overlay, underlay ê´€ë ¨ ë³„ë„ js ì‹œìž‘  */
/*
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.88 (08-JUN-2010)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.2.6 or later
 */
(function($){var ver="2.88";if($.support==undefined){$.support={opacity:!($.browser.msie)};}function debug(s){if($.fn.cycle.debug){log(s);}}function log(){if(window.console&&window.console.log){window.console.log("[cycle] "+Array.prototype.join.call(arguments," "));}}$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};if(this.length===0&&options!="stop"){if(!$.isReady&&o.s){log("DOM not ready, queuing slideshow");$(function(){$(o.s,o.c).cycle(options,arg2);});return this;}log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));return this;}return this.each(function(){var opts=handleArguments(this,options,arg2);if(opts===false){return;}opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);}this.cycleTimeout=this.cyclePause=0;var $cont=$(this);var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log("terminating; too few slides: "+els.length);return;}var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2===false){return;}var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.rev);if(startTime){startTime+=(opts2.delay||0);if(startTime<10){startTime=10;}debug("first timeout: "+startTime);this.cycleTimeout=setTimeout(function(){go(els,opts2,0,(!opts2.rev&&!opts.backwards));},startTime);}});};function handleArguments(cont,options,arg2){if(cont.cycleStop==undefined){cont.cycleStop=0;}if(options===undefined||options===null){options={};}if(options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");if(!opts){return false;}cont.cycleStop++;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);}cont.cycleTimeout=0;$(cont).removeData("cycle.opts");if(options=="destroy"){destroy(opts);}return false;case"toggle":cont.cyclePause=(cont.cyclePause===1)?0:1;checkInstantResume(cont.cyclePause,arg2,cont);return false;case"pause":cont.cyclePause=1;return false;case"resume":cont.cyclePause=0;checkInstantResume(false,arg2,cont);return false;case"prev":case"next":var opts=$(cont).data("cycle.opts");if(!opts){log('options not found, "prev/next" ignored');return false;}$.fn.cycle[options](opts);return false;default:options={fx:options};}return options;}else{if(options.constructor==Number){var num=options;options=$(cont).data("cycle.opts");if(!options){log("options not found, can not advance slide");return false;}if(num<0||num>=options.elements.length){log("invalid slide index: "+num);return false;}options.nextSlide=num;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}if(typeof arg2=="string"){options.oneTimeFx=arg2;}go(options.elements,options,1,num>=options.currSlide);return false;}}return options;function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data("cycle.opts");if(!options){log("options not found, can not resume");return false;}if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}go(options.elements,options,1,(!opts.rev&&!opts.backwards));}}}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute("filter");}catch(smother){}}}function destroy(opts){if(opts.next){$(opts.next).unbind(opts.prevNextEvent);}if(opts.prev){$(opts.prev).unbind(opts.prevNextEvent);}if(opts.pager||opts.pagerAnchorBuilder){$.each(opts.pagerAnchors||[],function(){this.unbind().remove();});}opts.pagerAnchors=null;if(opts.destroy){opts.destroy(opts);}}function buildOptions($cont,$slides,els,options,o){var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});if(opts.autostop){opts.countdown=opts.autostopCount||els.length;}var cont=$cont[0];$cont.data("cycle.opts",opts);opts.$cont=$cont;opts.stopCount=cont.cycleStop;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];opts.after.unshift(function(){opts.busy=0;});if(!$.support.opacity&&opts.cleartype){opts.after.push(function(){removeFilter(this,opts);});}if(opts.continuous){opts.after.push(function(){go(els,opts,0,(!opts.rev&&!opts.backwards));});}saveOriginalOpts(opts);if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($slides);}if($cont.css("position")=="static"){$cont.css("position","relative");}if(opts.width){$cont.width(opts.width);}if(opts.height&&opts.height!="auto"){$cont.height(opts.height);}if(opts.startingSlide){opts.startingSlide=parseInt(opts.startingSlide);}else{if(opts.backwards){opts.startingSlide=els.length-1;}}if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++){opts.randomMap.push(i);}opts.randomMap.sort(function(a,b){return Math.random()-0.5;});opts.randomIndex=1;opts.startingSlide=opts.randomMap[1];}else{if(opts.startingSlide>=els.length){opts.startingSlide=0;}}opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;if(opts.backwards){z=first?i<=first?els.length+(i-first):first-i:els.length-i;}else{z=first?i>=first?els.length-(i-first):first-i:els.length-i;}$(this).css("z-index",z);});$(els[first]).css("opacity",1).show();removeFilter(els[first],opts);if(opts.fit&&opts.width){$slides.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}var reshape=opts.containerResize&&!$cont.innerHeight();if(reshape){var maxw=0,maxh=0;for(var j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();if(!w){w=e.offsetWidth||e.width||$e.attr("width");}if(!h){h=e.offsetHeight||e.height||$e.attr("height");}maxw=w>maxw?w:maxw;maxh=h>maxh?h:maxh;}if(maxw>0&&maxh>0){$cont.css({width:maxw+"px",height:maxh+"px"});}}if(opts.pause){$cont.hover(function(){this.cyclePause++;},function(){this.cyclePause--;});}if(supportMultiTransitions(opts)===false){return false;}var requeue=false;options.requeueAttempts=options.requeueAttempts||0;$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr("height")||0);this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr("width")||0);if($el.is("img")){var loadingIE=($.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var loadingFF=($.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var loadingOp=($.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var loadingOther=(this.cycleH==0&&this.cycleW==0&&!this.complete);if(loadingIE||loadingFF||loadingOp||loadingOther){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){$(o.s,o.c).cycle(options);},opts.requeueTimeout);requeue=true;return false;}else{log("could not determine size of image: "+this.src,this.cycleW,this.cycleH);}}}return true;});if(requeue){return false;}opts.cssBefore=opts.cssBefore||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(":eq("+first+")").css(opts.cssBefore);if(opts.cssFirst){$($slides[first]).css(opts.cssFirst);}if(opts.timeout){opts.timeout=parseInt(opts.timeout);if(opts.speed.constructor==String){opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed);}if(!opts.sync){opts.speed=opts.speed/2;}var buffer=opts.fx=="shuffle"?500:250;while((opts.timeout-opts.speed)<buffer){opts.timeout+=opts.speed;}}if(opts.easing){opts.easeIn=opts.easeOut=opts.easing;}if(!opts.speedIn){opts.speedIn=opts.speed;}if(!opts.speedOut){opts.speedOut=opts.speed;}opts.slideCount=els.length;opts.currSlide=opts.lastSlide=first;if(opts.random){if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.backwards){opts.nextSlide=opts.startingSlide==0?(els.length-1):opts.startingSlide-1;}else{opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;}}if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init)){init($cont,$slides,opts);}else{if(opts.fx!="custom"&&!opts.multiFx){log("unknown transition: "+opts.fx,"; slideshow terminating");return false;}}}var e0=$slides[first];if(opts.before.length){opts.before[0].apply(e0,[e0,e0,opts,true]);}if(opts.after.length>1){opts.after[1].apply(e0,[e0,e0,opts,true]);}if(opts.next){$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?-1:1);});}if(opts.prev){$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,opts.rev?1:-1);});}if(opts.pager||opts.pagerAnchorBuilder){buildPager(els,opts);}exposeAddSlide(opts,els);return opts;}function saveOriginalOpts(opts){opts.original={before:[],after:[]};opts.original.cssBefore=$.extend({},opts.cssBefore);opts.original.cssAfter=$.extend({},opts.cssAfter);opts.original.animIn=$.extend({},opts.animIn);opts.original.animOut=$.extend({},opts.animOut);$.each(opts.before,function(){opts.original.before.push(this);});$.each(opts.after,function(){opts.original.after.push(this);});}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(",")>0){opts.multiFx=true;opts.fxs=opts.fx.replace(/\s*/g,"").split(",");for(i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx];if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log("discarding unknown transition: ",fx);opts.fxs.splice(i,1);i--;}}if(!opts.fxs.length){log("No valid transitions named; slideshow terminating.");return false;}}else{if(opts.fx=="all"){opts.multiFx=true;opts.fxs=[];for(p in txs){tx=txs[p];if(txs.hasOwnProperty(p)&&$.isFunction(tx)){opts.fxs.push(p);}}}}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;for(i=0;i<r1;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0]);}debug("randomized fx sequence: ",opts.fxs);}return true;}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount){opts.countdown++;}els[prepend?"unshift":"push"](s);if(opts.els){opts.els[prepend?"unshift":"push"](s);}opts.slideCount=els.length;$s.css("position","absolute");$s[prepend?"prependTo":"appendTo"](opts.$cont);if(prepend){opts.currSlide++;opts.nextSlide++;}if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($s);}if(opts.fit&&opts.width){$s.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager||opts.pagerAnchorBuilder){$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);}if($.isFunction(opts.onAddSlide)){opts.onAddSlide($s);}else{$s.hide();}};}$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;opts.before=[];opts.after=[];opts.cssBefore=$.extend({},opts.original.cssBefore);opts.cssAfter=$.extend({},opts.original.cssAfter);opts.animIn=$.extend({},opts.original.animIn);opts.animOut=$.extend({},opts.original.animOut);opts.fxFn=null;$.each(opts.original.before,function(){opts.before.push(this);});$.each(opts.original.after,function(){opts.after.push(this);});var init=$.fn.cycle.transitions[fx];if($.isFunction(init)){init(opts.$cont,$(opts.elements),opts);}};function go(els,opts,manual,fwd){if(manual&&opts.busy&&opts.manualTrump){debug("manualTrump in go(), stopping active transition");$(els).stop(true,true);opts.busy=false;}if(opts.busy){debug("transition active, ignoring new tx request");return;}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual){return;}if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end){opts.end(opts);}return;}var changed=false;if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height();curr.cycleW=curr.cycleW||$(curr).width();next.cycleH=next.cycleH||$(next).height();next.cycleW=next.cycleW||$(next).width();if(opts.multiFx){if(opts.lastFx==undefined||++opts.lastFx>=opts.fxs.length){opts.lastFx=0;}fx=opts.fxs[opts.lastFx];opts.currFx=fx;}if(opts.oneTimeFx){fx=opts.oneTimeFx;opts.oneTimeFx=null;}$.fn.cycle.resetState(opts,fx);if(opts.before.length){$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});}var after=function(){$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});};debug("tx firing; currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide);opts.busy=1;if(opts.fxFn){opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{if($.isFunction($.fn.cycle[opts.fx])){$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}}}if(changed||opts.nextSlide==opts.currSlide){opts.lastSlide=opts.currSlide;if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];if(opts.nextSlide==opts.currSlide){opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1;}}else{if(opts.backwards){var roll=(opts.nextSlide-1)<0;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=1;opts.currSlide=0;}else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;opts.currSlide=roll?0:opts.nextSlide+1;}}else{var roll=(opts.nextSlide+1)==els.length;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=els.length-2;opts.currSlide=els.length-1;}else{opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}}}}if(changed&&opts.pager){opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass);}var ms=0;if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);}else{if(opts.continuous&&p.cyclePause){ms=10;}}if(ms>0){p.cycleTimeout=setTimeout(function(){go(els,opts,0,(!opts.rev&&!opts.backwards));},ms);}}$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);});};function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);while((t-opts.speed)<250){t+=opts.speed;}debug("calculated timeout: "+t+"; speed: "+opts.speed);if(t!==false){return t;}}return opts.timeout;}$.fn.cycle.next=function(opts){advance(opts,opts.rev?-1:1);};$.fn.cycle.prev=function(opts){advance(opts,opts.rev?1:-1);};function advance(opts,val){var els=opts.elements;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2){opts.randomIndex=els.length-2;}else{if(opts.randomIndex==-1){opts.randomIndex=els.length-1;}}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex];}else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap){return false;}opts.nextSlide=els.length-1;}else{if(opts.nextSlide>=els.length){if(opts.nowrap){return false;}opts.nextSlide=0;}}}}var cb=opts.onPrevNextEvent||opts.prevNextClick;if($.isFunction(cb)){cb(val>0,opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,val>=0);return false;}function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass);}$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);debug("pagerAnchorBuilder("+i+", el) returned: "+a);}else{a='<a href="#">'+(i+1)+"</a>";}if(!a){return;}var $a=$(a);if($a.parents("body").length===0){var arr=[];if($p.length>1){$p.each(function(){var $clone=$a.clone(true);$(this).append($clone);arr.push($clone[0]);});$a=$(arr);}else{$a.appendTo($p);}}opts.pagerAnchors=opts.pagerAnchors||[];opts.pagerAnchors.push($a);$a.bind(opts.pagerEvent,function(e){e.preventDefault();opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}var cb=opts.onPagerEvent||opts.pagerClick;if($.isFunction(cb)){cb(opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,opts.currSlide<i);});if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble){$a.bind("click.cycle",function(){return false;});}if(opts.pauseOnPagerHover){$a.hover(function(){opts.$cont[0].cyclePause++;},function(){opts.$cont[0].cyclePause--;});}};$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;if(fwd){hops=c>l?c-l:opts.slideCount-l;}else{hops=c<l?l-c:l+opts.slideCount-c;}return hops;};function clearTypeFix($slides){debug("applying clearType background-color hack");function hex(s){s=parseInt(s).toString(16);return s.length<2?"0"+s:s;}function getBg(e){for(;e&&e.nodeName.toLowerCase()!="html";e=e.parentNode){var v=$.css(e,"background-color");if(v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}if(v&&v!="transparent"){return v;}}return"#ffffff";}$slides.each(function(){$(this).css("background-color",getBg(this));});}$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();opts.cssBefore.opacity=1;opts.cssBefore.display="block";if(w!==false&&next.cycleW>0){opts.cssBefore.width=next.cycleW;}if(h!==false&&next.cycleH>0){opts.cssBefore.height=next.cycleH;}opts.cssAfter=opts.cssAfter||{};opts.cssAfter.display="none";$(curr).css("zIndex",opts.slideCount+(rev===true?1:0));$(next).css("zIndex",opts.slideCount+(rev===true?0:1));};$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut;$n.css(opts.cssBefore);if(speedOverride){if(typeof speedOverride=="number"){speedIn=speedOut=speedOverride;}else{speedIn=speedOut=1;}easeIn=easeOut=null;}var fn=function(){$n.animate(opts.animIn,speedIn,easeIn,cb);};$l.animate(opts.animOut,speedOut,easeOut,function(){if(opts.cssAfter){$l.css(opts.cssAfter);}if(!opts.sync){fn();}});if(opts.sync){fn();}};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0);opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.opacity=0;});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={top:0,left:0};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={fx:"fade",timeout:4000,timeoutFn:null,continuous:0,speed:1000,speedIn:null,speedOut:null,next:null,prev:null,onPrevNextEvent:null,prevNextEvent:"click.cycle",pager:null,onPagerEvent:null,pagerEvent:"click.cycle",allowPagerClickBubble:false,pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:"auto",startingSlide:0,sync:1,random:0,fit:0,containerResize:1,pause:0,pauseOnPagerHover:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:!$.support.opacity,cleartypeNoBg:false,nowrap:0,fastOnEvent:0,randomizeEffects:1,rev:0,manualTrump:true,requeueOnImageNotLoaded:true,requeueTimeout:250,activePagerClass:"activeSlide",updateActivePagerLink:null,backwards:false};})(jQuery);
/*
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.72
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.cycle.transitions.none=function($cont,$slides,opts){opts.fxFn=function(curr,next,opts,after){$(next).show();$(curr).hide();after();};};$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssBefore={top:h,left:0};opts.cssFirst={top:0};opts.animIn={top:0};opts.animOut={top:-h};};$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssFirst={top:0};opts.cssBefore={top:-h,left:0};opts.animIn={top:0};opts.animOut={top:h};};$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst={left:0};opts.cssBefore={left:w,top:0};opts.animIn={left:0};opts.animOut={left:0-w};};$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst={left:0};opts.cssBefore={left:-w,top:0};opts.animIn={left:0};opts.animOut={left:w};};$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts,fwd){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.left=fwd?(next.cycleW-1):(1-next.cycleW);opts.animOut.left=fwd?-curr.cycleW:curr.cycleW;});opts.cssFirst={left:0};opts.cssBefore={top:0};opts.animIn={left:0};opts.animOut={top:0};};$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push(function(curr,next,opts,fwd){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.top=fwd?(1-next.cycleH):(next.cycleH-1);opts.animOut.top=fwd?curr.cycleH:-curr.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0};opts.animIn={top:0};opts.animOut={left:0};};$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;});opts.cssBefore={left:0,top:0,width:0};opts.animIn={width:"show"};opts.animOut={width:0};};$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;});opts.cssBefore={left:0,top:0,height:0};opts.animIn={height:"show"};opts.animOut={height:0};};$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var i,w=$cont.css("overflow","visible").width();$slides.css({left:0,top:0});opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);});if(!opts.speedAdjusted){opts.speed=opts.speed/2;opts.speedAdjusted=true;}opts.random=0;opts.shuffle=opts.shuffle||{left:-w,top:15};opts.els=[];for(i=0;i<$slides.length;i++){opts.els.push($slides[i]);}for(i=0;i<opts.currSlide;i++){opts.els.push(opts.els.shift());}opts.fxFn=function(curr,next,opts,cb,fwd){var $el=fwd?$(curr):$(next);$(next).css(opts.cssBefore);var count=opts.slideCount;$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){var hops=$.fn.cycle.hopsFromLast(opts,fwd);for(var k=0;k<hops;k++){fwd?opts.els.push(opts.els.shift()):opts.els.unshift(opts.els.pop());}if(fwd){for(var i=0,len=opts.els.length;i<len;i++){$(opts.els[i]).css("z-index",len-i+count);}}else{var z=$(curr).css("z-index");$el.css("z-index",parseInt(z)+1+count);}$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();if(cb){cb();}});});};opts.cssBefore={display:"block",opacity:1,top:0,left:0};};$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=next.cycleH;opts.animIn.height=next.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0,height:0};opts.animIn={top:0};opts.animOut={height:0};};$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssFirst={top:0};opts.cssBefore={left:0,top:0,height:0};opts.animOut={height:0};};$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=next.cycleW;opts.animIn.width=next.cycleW;});opts.cssBefore={top:0,width:0};opts.animIn={left:0};opts.animOut={width:0};};$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore={top:0,left:0,width:0};opts.animIn={left:0};opts.animOut={width:0};};$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false,true);opts.cssBefore.top=next.cycleH/2;opts.cssBefore.left=next.cycleW/2;opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};opts.animOut={width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2};});opts.cssFirst={top:0,left:0};opts.cssBefore={width:0,height:0};};$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false);opts.cssBefore.left=next.cycleW/2;opts.cssBefore.top=next.cycleH/2;opts.animIn={top:0,left:0,width:next.cycleW,height:next.cycleH};});opts.cssBefore={width:0,height:0};opts.animOut={opacity:0};};$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore={left:w,top:0};opts.animIn={left:0};opts.animOut={left:w};};$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore={top:h,left:0};opts.animIn={top:0};opts.animOut={top:h};};$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();var w=$cont.width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore={top:h,left:w};opts.animIn={top:0,left:0};opts.animOut={top:h,left:w};};$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=this.cycleW/2;opts.animIn={left:0,width:this.cycleW};opts.animOut={left:0};});opts.cssBefore={width:0,top:0};};$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=this.cycleH/2;opts.animIn={top:0,height:this.cycleH};opts.animOut={top:0};});opts.cssBefore={height:0,left:0};};$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true,true);opts.cssBefore.left=next.cycleW/2;opts.animIn={left:0,width:this.cycleW};opts.animOut={left:curr.cycleW/2,width:0};});opts.cssBefore={top:0,width:0};};$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false,true);opts.cssBefore.top=next.cycleH/2;opts.animIn={top:0,height:next.cycleH};opts.animOut={top:curr.cycleH/2,height:0};});opts.cssBefore={left:0,height:0};};$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);if(d=="right"){opts.cssBefore.left=-w;}else{if(d=="up"){opts.cssBefore.top=h;}else{if(d=="down"){opts.cssBefore.top=-h;}else{opts.cssBefore.left=w;}}}});opts.animIn={left:0,top:0};opts.animOut={opacity:1};opts.cssBefore={top:0,left:0};};$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(d=="right"){opts.animOut.left=w;}else{if(d=="up"){opts.animOut.top=-h;}else{if(d=="down"){opts.animOut.top=h;}else{opts.animOut.left=-w;}}}});opts.animIn={left:0,top:0};opts.animOut={opacity:1};opts.cssBefore={top:0,left:0};};$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css("overflow","visible").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(!opts.animOut.left&&!opts.animOut.top){opts.animOut={left:w*2,top:-h/2,opacity:0};}else{opts.animOut.opacity=0;}});opts.cssBefore={left:0,top:0};opts.animIn={left:0};};$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.cssBefore=opts.cssBefore||{};var clip;if(opts.clip){if(/l2r/.test(opts.clip)){clip="rect(0px 0px "+h+"px 0px)";}else{if(/r2l/.test(opts.clip)){clip="rect(0px "+w+"px "+h+"px "+w+"px)";}else{if(/t2b/.test(opts.clip)){clip="rect(0px "+w+"px 0px 0px)";}else{if(/b2t/.test(opts.clip)){clip="rect("+h+"px "+w+"px "+h+"px 0px)";}else{if(/zoom/.test(opts.clip)){var top=parseInt(h/2);var left=parseInt(w/2);clip="rect("+top+"px "+left+"px "+top+"px "+left+"px)";}}}}}}opts.cssBefore.clip=opts.cssBefore.clip||clip||"rect(0px 0px 0px 0px)";var d=opts.cssBefore.clip.match(/(\d+)/g);var t=parseInt(d[0]),r=parseInt(d[1]),b=parseInt(d[2]),l=parseInt(d[3]);opts.before.push(function(curr,next,opts){if(curr==next){return;}var $curr=$(curr),$next=$(next);$.fn.cycle.commonReset(curr,next,opts,true,true,false);opts.cssAfter.display="block";var step=1,count=parseInt((opts.speedIn/13))-1;(function f(){var tt=t?t-parseInt(step*(t/count)):0;var ll=l?l-parseInt(step*(l/count)):0;var bb=b<h?b+parseInt(step*((h-b)/count||1)):h;var rr=r<w?r+parseInt(step*((w-r)/count||1)):w;$next.css({clip:"rect("+tt+"px "+rr+"px "+bb+"px "+ll+"px)"});(step++<=count)?setTimeout(f,13):$curr.css("display","none");})();});opts.cssBefore={display:"block",opacity:1,top:0,left:0};opts.animIn={left:0};opts.animOut={left:0};};})(jQuery);
/* overlay, underlay ê´€ë ¨ ë³„ë„ js ë  */


$(document).ready(function () { /*  get url */
	/* overlay, underlay ê´€ë ¨ ì‹¤í–‰ ìŠ¤í¬ë¦½íŠ¸ ì‹œìž‘ */
	var urlValue = String(window.location.href);
	var urlValueSplit = urlValue.split('/'); /* product comparing */
	/* CompareLayer2 blue overlay */
	

	jQuery.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        // CAUTION: Needed to parenthesize options.path and options.domain
	        // in the following expressions, otherwise they evaluate to undefined
	        // in the packed version for some reason...
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};


// JQUERY COOKIE PLUGIN END

//start hero takeover area slideshow

if (urlValueSplit[4] == 'business' & (urlValueSplit[5] == '' || urlValueSplit[5] == 'index.html')){
	$('.hero #flagship-content').append('<div id="underlay_nav"></div>');
	$('.hero .underlay_list').css('height', '382px');
	$('.hero .underlay_list').cycle({
		fx: 'fade',
		timeout: 6000,
		speed: 1500,
		pager: '#underlay_nav',
		pauseOnPagerHover: 1,
		pause: 0,
		autostop: 0
	});
}

			
			


//appstore hero cycle
if (uriString.match( 'samsung.com/us/appstore' + '$' ) == 'samsung.com/us/appstore'){
	$('.home_visual').load('/us/appstore_contents/html/hero_genre.sec');
	$('.zzFilter').css('margin-top', '50px');
}
			
	if (!$('#gnb_pr')) return false;
	/* í”„ë¡œë•íŠ¸ GNB ë§ˆìš°ìŠ¤ì˜¤ë²„ */
	$('#gnb_pr_dep2').prepend('<div class="over_link">' + $('#gnb_pr').html() + '</div>');
	$('#gnb_pr .over_link a').attr('class', '');
	$('#gnb_pr .over_link a').attr('id', '');
	$('#gnb_pr .over_link #gnb_pr_dep2').remove();
	$('#gnb_pr').hover(function () {
		if ($('#GnbB2B').length > 0) {
			$('#gnb_pr').css('width', '960px');
			$('#gnb_pr').css('left', '0');
			$('#gnb_pr_dep2').css('left', '0');
			$('#gnb_pr_dep1_btn').css('left', '147px');
			$('#gnb_pr_dep2').show();
			$(this).hoverFlow('mouseover', {
				height: 320
			}, 'fast');
		}
		else {
			$('#gnb_pr').css('width', '960px');
			$('#gnb_pr_dep2').show();
			$(this).hoverFlow('mouseover', {
				height: 500
			}, 'fast');
		}
	}, function () {
		if ($('#GnbB2B').length > 0) {
			$(this).hoverFlow('mouseout', {
				height: 60
			}, 'fast', function () {
				$('#gnb_pr_dep1_btn').css('left', '0');
				$('#gnb_pr').css('left', '147px');
				$('#gnb_pr_dep2').css('left', '-147px');
				$('#gnb_pr').css('width', '110px');
				$('#gnb_pr_dep2').hide();
			});
		}
		else {
			$(this).hoverFlow('mouseout', {
				height: 60
			}, 'fast', function () {
				$('#gnb_pr').css('width', '110px');
				$('#gnb_pr_dep2').hide();
			});
		}
	}); /* ë¹„ì§€ë‹ˆìŠ¤ GNB */
	$('#gnb_so_dep2').prepend('<div class="over_link">' + $('#GnbB2B #gnb_so').html() + '</div>');
	$('.over_link a').attr('class', '');
	$('.over_link a').attr('id', '');
	$('.over_link #gnb_so_dep2').remove();
	$('#gnb_so').hover(function () {
		$('#gnb_so').css('width', '696px');
		$('#gnb_so_dep2').show();
		$(this).hoverFlow('mouseover', {
			height: 290
		}, 'fast');
	}, function () {
		$(this).hoverFlow('mouseout', {
			height: 60
		}, 'fast', function () {
			$('#gnb_so').css('width', '117px');
			$('#gnb_so_dep2').hide();
		});
	}); /* í”„ë¡œë•íŠ¸ GNB í‚¤ë³´ë“œ */
	$('#gnb_pr_dep1_btn').focus(function () {
		$('#gnb_pr').css('height', 'auto');
		$('#gnb_pr').css('overflow', 'visible');
		$('#gnb_pr_dep2').show('blind', {}, 300);
		$('#gnb_pr .over_link').mouseover(function () {
			return false;
		});
	});
	$('#gnb_pr_dep2 a').focus(function () {
		$('#gnb_pr_dep2').show();
	});
		
	/* ê²€ìƒ‰ë°•ìŠ¤ bg ì œê±° */
	if (!$('#search_input')) return false;
		$('#search_input').focus(function () {
		$(this).attr('class', 'search_input_nobg');
	}); /* Ã­Å¾Ë†Ã«â€œ Ã«Â©â€Ã«â€°Â´ Ã­â€šÂ¤Ã«Â³Â´Ã«â€œÅ“ */
	$('#hidden_navi a').focus(function () {
		$('#hidden_navi').css('position', 'relative');
		$('#hidden_navi').css('top', '0px');
	});
	$('#gnb .logo a').focus(function () {
		$('#hidden_navi').css('position', 'absolute');
		$('#hidden_navi').css('top', '-1000px');
	}); /* ë“œë¡­ë‹¤ìš´ ë©”ë‰´ ì œì–´ */
	$('div.dropdown').hover(function () {
		$(this).children('dl').addClass('on');
		var lilength = $(this).find('li').length;
		if (lilength > 8) {
			$(this).find('ul').addClass('scroll');
		}
		$(this).css('position', 'relative');
		$('div.dropdown label').hover(function () {
			$(this).css('text-decoration', 'underline');
		}, function () {
			$(this).css('text-decoration', 'none');
		});
		$('div.dropdown label').click(function () {
			var labelText = $(this).text();
			var dtText = $(this).parent().parent().parent().parent().parent().children('dt');
			dtText.text(labelText);
			$(this).parent().parent().parent().parent().parent().removeClass('on');
		});
	}, function () {
		$(this).children('dl').removeClass('on');
		var lilength = $(this).find('li').length;
		if (lilength > 8) {
			$(this).find('ul').removeClass('scroll');
		}
		$(this).css('position', 'static');
	});
	//left menu
	if ($('#lnb').length > 0) {
		var SelfURL = String(window.location.href);
		var SelfURLpart = SelfURL.split('/');
		var changeURL = "";
		for (var i = 3; i < SelfURLpart.length; i++) {
			changeURL += "/" + SelfURLpart[i];
		};
		$('#lnb a').each(function () {
			var leftLink = $(this).attr('href');
			if (changeURL.indexOf('index') >= 0) {
				changeURL = changeURL.replace('index', '');
			}
			if (changeURL.indexOf('#') > 0) {
				changeURL = changeURL.split('#')[0];
			}
			if (changeURL == leftLink) {
				$(this).parents('ul').css('display', 'block');
				$(this).parents('li').addClass('on');
			}

			if ($('#business').length > 0 && changeURL.indexOf('productModel') > 0 && changeURL.indexOf('ctgry_subtype') > 0) {
				if (changeURL.indexOf('ctgry_subtype=2') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=2'
				}
				if (changeURL.indexOf('ctgry_subtype=3') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=3'
				}
				if (changeURL.indexOf('ctgry_subtype=4') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=4'
				}
				if (changeURL.indexOf('ctgry_subtype=5') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=6'
				}
				if (changeURL.indexOf('ctgry_subtype=6') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=6'
				}
				if (changeURL.indexOf('ctgry_subtype=27') > 0) {
					changeURL = '/us/business/telecommunication/productSubType.do?ctgry_type=1&ctgry_subtype=27'
				}
				$('#lnb a[href=' + changeURL + ']').parents('ul').css('display', 'block');
				$('#lnb a[href=' + changeURL + ']').parents('li').addClass('on');
			}
			if ($('#business').length > 0 && changeURL.indexOf('newsView') > 0) {
				changeURL = '/us/business/telecommunication/newsList.do';
				$('#lnb a[href=' + changeURL + ']').parents('ul').css('display', 'block');
				$('#lnb a[href=' + changeURL + ']').parents('li').addClass('on');
			}
			if ($('.aboutsamsung').length > 0 && changeURL.indexOf('newsView') > 0) {
				changeURL = changeURL.replace('newsView', 'newsList');
				$('#lnb a[href=' + changeURL + ']').parents('ul').css('display', 'block');
				$('#lnb a[href=' + changeURL + ']').parents('li').addClass('on');
			}
			if (changeURL.indexOf('usdivisions') > 0 || changeURL.indexOf('IR_OwnershipStructure') > 0) {
				$('#lnb .left_menu').find('.on').eq(3).find('ul').hide();
				$('#lnb .left_menu').find('.on').eq(3).removeClass('on');
				$('#lnb .left_menu').find('.on').eq(3).find('li').removeClass('on');
			}
		});
	} /* products - category_type1 - openfilter */
	//var listHeight = $('.category_type1 #prod_all_list table').eq(0).height() + 11;
	//$('.category_type1 #prod_all_list').css('height',listHeight);
	$('.category_type1 #prod_all_list table').hide();
	$('.category_type1 #prod_all_list table').eq(0).show();
	
	var isIe = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
	var docURL = document.URL;
	/*if(isIe && docURL.indexOf("cell-phones")>0){
	}else{
		$('#openfilter').prepend('<div class="btn_seeall"><span>See All</span></div>')//<div class="btn_view"><span>view Find by</span></div>
	}*/
	
	$('#openfilter').prepend('<div class="btn_seeall"><span>See All</span></div>');

	$('#category_filter fieldset').append('<div class="filter_close"><img src="/us/images/common/blank.gif" width="19" height="16" alt="close" title="close" /></div>')
	$('#openfilter .option dt').click(function () {
		if ($('#openfilter').hasClass('open')) {
			$('#openfilter').removeClass('open');
			if($('#category_filter_wrap').length == 1){
				$('#category_filter').animate({
					height: '36px'
				}, 400);
				//alert('aa');
			} else {
				$('#category_filter').animate({
					height: '41px'
				}, 400);
				//alert('bb');
			};
			$('#category_filter dd').animate({
				filter: 'alpha(opacity=0)',
				opacity: '0'
			}, 300);
			$('#openfilter .question_btn').hide();
		}
		else {
			$('#openfilter').addClass('open');
			var dlHeight = $('#category_filter fieldset').height();
			$('#category_filter').animate({
				height: dlHeight + 10 // for ie6 error
			}, 400);
			$('#category_filter dd').animate({
				filter: 'alpha(opacity=100)',
				opacity: '1'
			}, 300);
			$('#openfilter .question_btn').show();
		}
	});
	$('#openfilter .filter_close img').click(function () {
		$('#openfilter').removeClass('open');
		if($('#category_filter_wrap').length == 1){
			$('#category_filter').animate({
				height: '36px'
			}, 400);
		} else {
			$('#category_filter').animate({
				height: '41px'
			}, 400);
		};
		$('#category_filter dd').animate({
			filter: 'alpha(opacity=0)',
			opacity: '0'
		}, 300);
		$('#openfilter .question_btn').hide();
	});
	$('#openfilter .btn_seeall span').click(function () {
		if ($('#openfilter').hasClass('open')) {
			//$('#openfilter').removeClass('open');
			//$('#category_filter').animate({height :'41px'}, 400 );
			//$('#category_filter dd').animate({filter:'alpha(opacity=0)', opacity:'0'}, 300 );
			$('.category_type1 #prod_all_list table').show();
			$('#prod_list_sort').show();
			$('#prod_list_sort').animate({
				filter: 'alpha(opacity=10)',
				opacity: '1'
			}, 300);
			//$('#prod_list_landing_title').attr('class','title');
			$('#prod_list_landing_title .landing').hide();
			$('#prod_list_landing_title .text').show();
			//$('#openfilter .question_btn').hide();
			//$('#find_by_submit').click();
		}
		else {
			$('.category_type1 #prod_all_list table').show();
			$('#prod_list_sort').show();
			$('#prod_list_sort').animate({
				filter: 'alpha(opacity=100)',
				opacity: '1'
			}, 300);
			//$('#prod_list_landing_title').attr('class','title');
			$('#prod_list_landing_title .landing').hide();
			$('#prod_list_landing_title .text').show();
			$('#openfilter .question_btn').hide();
		};
	});
	$('.question_btn').hover(function () {
		$(this).parent().parent().parent().parent().parent().css('overflow', 'visible');
		$('#header').css('z-index', 1);
		$(this).parent().addClass('view');
		var titleText = $(this).parent().find('.option_title').html();
		var descriptionText = $(this).find('.text').html();
		var linkURL = $(this).find('.link').html();
		$(this).append('<div class="more_info" style="z-index:10px"><div class="layer_top"></div><div class="layer_body"><strong>' + titleText + '</strong><p>' + descriptionText + '</p>' + linkURL + '<br /></div><div class="layer_bottom"></div>');
	}, function () {
		$(this).parent().parent().parent().parent().parent().css('overflow', 'hidden');
		$('#header').css('z-index', 30);
		$(this).parent().removeClass('view');
		$('.more_info').remove();
	});
	$('.question_btn').click(function () {
		return false
	}); /* products - full comparison layer expand and collapse */
	$('.full_comparison .title div .link').eq(0).click(function () {
		$('.option').show();
		$('.item .subject').find('strong').addClass('layer_open');
	});
	$('.full_comparison .title div .link').eq(1).click(function () {
		$('.option').hide();
		$('.item .subject').find('strong').removeClass('layer_open');
	});
	$('.full_comparison .item .subject strong').click(function () {
		if ($(this).hasClass('layer_open')) {
			$(this).removeClass('layer_open');
			$(this).parent().parent().find('.option').hide();
		}
		else {
			$(this).addClass('layer_open');
			$(this).parent().parent().find('.option').show();
		}
	}); /* products - 'start comparing' button click then open comparing model layer */
	$('#buttonStartCompare').click(function () {
		showLayerPopupBackground();
		$('#CompareLayer2').show();
		return false;
	});
	$('.hidden_info').hover(

	function () {
		$(this).find('.more_info').css('display', 'block');
	}, function () {
		$(this).find('.more_info').css('display', 'none');
	});
	
	$('.col_one .hidden_info').hover(

	function () {
		$(this).css('width', '205');
		$(this).find('.more_info').css('display', 'block');
	}, function () {
		$(this).css('width', '0');
		$(this).find('.more_info').css('display', 'none');
	});
	
	/* layer-popup close */
	$('.btn_close_layer').click(function () {
		$('.layer_wrap').hide();
		$('#layer_transparency').remove();
		return false;
	});
	$('.btn_close_layer2').click(function () {
		$('.layer_wrap').hide();
		$('#layer_transparency').remove();
		return false;
	});
	$('#close_layer').click(function () {
		$('.layer_wrap').hide();
		$('#layer_transparency').remove();
		return false;
	}); /* products - available thumbnail list */
	if ($('#options_list li').length > 3) {
		$('#options_list .list').before('<span class="prev disabled">prev</span>');
		$('#options_list .list').after('<em class="next">next</em>');
		$('#options_list .list').css('position', 'relative');
		$('#options_list .list ul').css({
			position: 'absolute',
			top: '0px',
			left: '0px'
		});
		$("#options_list .list").jCarouselLite({
			btnNext: '#options_list .next',
			btnPrev: '#options_list .prev',
			scroll: 1,
			visible: 3,
			circular: false,
			afterEnd: function () {
				var a1 = eval($('#options_list .list ul').css('left').split('px')[0]);
				var a2 = eval($('#options_list .list ul li').css('width').split('px')[0]) + 4;
			}
		});
	}
	
	function productGallery() {
		$('#gallery_btn_wrap').find('li').eq(0).addClass('on');
		if ($('#gallery_btn_wrap div li').length > 5) {
			$('#gallery_btn_wrap div').before('<span class="prev disabled">Previous</span>');
			$('#gallery_btn_wrap div').after('<em class="next">Next</em>');
			//var bottomValue1 = eval($('#gallery_btn_wrap div ul li').css('height').split('px')[0]) + 5;
			//var bottomValue2 = $('#gallery_btn_wrap div ul li').length;
			//$('#gallery_btn_wrap div ul').css('bottom', '-' + bottomValue1 * bottomValue2 + 'px');
			$("#gallery_btn_wrap div").jCarouselLite({
				btnNext: '#gallery_btn_wrap .next',
				btnPrev: '#gallery_btn_wrap .prev',
				vertical: true,
				scroll: 1,
				visible: 5,
				circular: false
				/* beforeStart: function () {
					$('#gallery_btn_wrap .gallery_btn_list').stop();
				},
				afterEnd: function () {
					var a1 = eval($('#gallery_btn_wrap div ul').css('top').split('px')[0]);
					var a2 = eval($('#gallery_btn_wrap div ul li').css('height').split('px')[0]) + 5;
				} */
			});
		}
	}

	function productGallery2() {
		if ($('#gallery_btn_wrap div li').length > 5) {
			$('#gallery_btn_wrap').addClass('over');
			$('#gallery_btn_wrap').addClass('horizontal');
			$('#gallery_btn_wrap div').before('<span class="prev">Previous</span>');
			$('#gallery_btn_wrap div').after('<span class="next">Next</span>');
			$('#gallery_btn_wrap .gallery_btn_list').css('left', '0px');
			if ($('#gallery_btn_wrap .gallery_btn_list').css('left') == '0px') {
				$('#gallery_btn_wrap .prev').css('cursor', 'default');
				$('#gallery_btn_wrap .prev').css('background-image', 'url(/us/images/products/bg_product_gallery_btn_pre1_1.gif)');
			}
			var bottomValue1 = eval($('#gallery_btn_wrap div ul li').css('width').split('px')[0]) + 5;
			var bottomValue2 = $('#gallery_btn_wrap div ul li').length;
			$('#gallery_btn_wrap div ul').css('right', '-' + bottomValue1 * bottomValue2 + 'px');
			$("#gallery_btn_wrap div").jCarouselLite({
				btnNext: '#gallery_btn_wrap .next',
				btnPrev: '#gallery_btn_wrap .prev',
				vertical: false,
				scroll: 1,
				visible: 5,
				circular: false,
				afterEnd: function () {
					var a1 = eval($('#gallery_btn_wrap div ul').css('left').split('px')[0]);
					var a2 = eval($('#gallery_btn_wrap div ul li').css('width').split('px')[0]) + 5;
					if (a1 >= 0) {
						$('#gallery_btn_wrap .prev').css('background-image', 'url(/us/images/products/bg_product_gallery_btn_pre1_1.gif)');
						$('#gallery_btn_wrap .prev').css('cursor', 'default');
					}
					else {
						$('#gallery_btn_wrap .prev').css('background-image', 'url(/us/images/products/bg_product_gallery_btn_pre1.gif)');
						$('#gallery_btn_wrap .prev').css('cursor', 'pointer');
					}
					var a3 = $('#gallery_btn_wrap div ul').css('right').split('px')[0];
					var a4 = eval(a3) + a2;
					if ($('#gallery_btn_wrap .gallery_btn_list').css('left') == '0px') {
						$('#gallery_btn_wrap div ul').css('right', '-' + bottomValue1 * bottomValue2 + 'px');
					}
					else {
						$('#gallery_btn_wrap div ul').css('right', a4);
					}
					if ($('#gallery_btn_wrap div ul').css('right').split('px')[0] == '-325') {
						$('#gallery_btn_wrap .next').css('background-image', 'url(/us/images/products/bg_product_gallery_btn_next1_1.gif)');
						$('#gallery_btn_wrap .next').css('cursor', 'default');
					}
					else {
						$('#gallery_btn_wrap .next').css('background-image', 'url(/us/images/products/bg_product_gallery_btn_next1.gif)');
						$('#gallery_btn_wrap .next').css('cursor', 'pointer');
					}
				}
			});
		}
	}
	if ($('.product_regular').length > 0) {
		productGallery();
	}
	if ($('.product_flagship_vertical').length > 0) {
		productGallery();
	}
	if ($('.product_flagship_horizontal').length > 0) {
		productGallery2();
	} /* ê²€ìƒ‰ left ë©”ë‰´ */
	$('#search_result .left_category strong a').click(function () {
		var linkClass = $(this).parent().parent().attr('class');
		if ($(this).parent().parent().find('ul').length > 0) {
			if (linkClass == 'open') {
				$(this).parent().parent().attr('class', 'close');
				$(this).parent().parent().find('ul').hide();
				return false;
			}
			if (linkClass == 'close') {
				$(this).parent().parent().attr('class', 'open');
				$(this).parent().parent().find('ul').show();
				return false;
			}
		}
	}); /* support - all question layer */
	$('.question_all_head a').eq(0).click(function () {
		$('.question_list li').addClass('open');
		$('.question_all_head a').eq(1).removeClass('selected');
		$('.question_all_head a').eq(0).addClass('selected');
		return false;
	});
	$('.question_all_head a').eq(1).click(function () {
		$('.question_list li').removeClass('open');
		$('.question_all_head a').eq(0).removeClass('selected');
		$('.question_all_head a').eq(1).addClass('selected');
		return false;
	});
	$('.question_list li').find('a:first').click(function () {
		if (!document.getElementById('question_list_home')) {
			if ($(this).parent().hasClass('open')) {
				$(this).parent().removeClass('open');
				return false;
			}
			else {
				$(this).parent().addClass('open');
				return false;
			}
		}
	});
	$('.question_all_head .sort a').click(function () {
		$('.question_all_head .sort a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	}); /* support - for owners - video vertical list */
	if ($('#support .forowners_login .bottom_division .lists li').length > 3) $('#support .forowners_login .bottom_division .lists').css('height', '400px'); /* support - account forms */
	$('#contact_information').toggle(function () {
		$(this).parent().addClass('on');
		$(this).parent().parent().addClass('on');
	}, function () {
		$(this).parent().removeClass('on');
		$(this).parent().parent().removeClass('on');
	});
	$('#additional_information').toggle(function () {
		$(this).parent().addClass('on');
		$(this).parent().parent().addClass('on');
	}, function () {
		$(this).parent().removeClass('on');
		$(this).parent().parent().removeClass('on');
	});
	$('.input_group .option .dropdown').hover(function () {
		$(this).parent().parent().css('z-index', '10');
	}, function () {
		$(this).parent().parent().css('z-index', '1');
	});
	$('.input_group .dropdown_menu .dropdown').hover(function () {
		$(this).parent().parent().css('z-index', '10');
	}, function () {
		$(this).parent().parent().css('z-index', '1');
	});
	$('#CompareLayer .compare_layer .list_group tr').find('td').each(function (index) {
		var tdLength = $('#CompareLayer .compare_layer .list_group tr').find('th').length;
		if (index >= tdLength) {
			index = index - (parseInt(index / tdLength) * tdLength);
		}
		$(this).attr('class', 'line' + (index + 1));
	});
	$('#CompareLayer .compare_layer .list_group tr').find('th').each(function (index) {
		var tdLength = $('#CompareLayer .compare_layer .list_group tr').find('th').length;
		if (index >= tdLength) {
			index = index - (parseInt(index / tdLength) * tdLength);
		}
		$(this).attr('class', 'line' + (index + 1));
	});
	$('#CompareLayer .compare_layer .compare_item tr').find('td').each(function (index) {
		var tdLength = $('#CompareLayer .compare_layer .list_group tr').find('th').length;
		if (index >= tdLength) {
			index = index - (parseInt(index / tdLength) * tdLength);
		}
		$(this).attr('class', 'line' + (index + 1));
	});
	$('#CompareLayer .compare_layer .compare_table tr').find('td').each(function (index) {
		var tdLength = $('#CompareLayer .compare_layer .list_group tr').find('th').length;
		if (index >= tdLength) {
			index = index - (parseInt(index / tdLength) * tdLength);
		}
		$(this).attr('class', 'line' + (index + 1));
	});
	$('#CompareLayer .compare_layer .compare_item_dd').find('li').each(function (index) {
		var tdLength = $('#CompareLayer .compare_layer .list_group tr').find('th').length;
		if (index >= tdLength) {
			index = index - (parseInt(index / tdLength) * tdLength);
		}
		$(this).attr('class', 'line' + (index + 1));
	});
	$('#CompareLayer .compare_layer .list_group label').click(function () {
		if ($(this).text() == 'Remove X') {
			var delNum = $(this).attr('for').split('_')[2];
			var delClass = '.line' + delNum;
			$(delClass).remove();
		}
		if ($('#CompareLayer .compare_layer .list_group tr').find('th').length <= 2) {
			$('#CompareLayer .compare_layer .list_group label').each(function () {
				if ($(this).text() == 'Remove X') {
					$(this).parent().remove();
				}
			})
		}
	}); /* accessories search layer auto scrolling */
	if ($('#searchLayer .search_layer_body li').length > 5) {
		$('#searchLayer .search_layer_body ul').addClass('scroll');
	}
	/* CompareLayer */
	$('#CompareLayer2 .over_layer').mouseover(function () {
		if ($('#CompareLayer2 .over_layer').find('.minus').length >= 4) {
			return false;
		}
		else {
			$(this).find('.background').show();
			$(this).find('label').css('display', 'block');
			$(this).find('label').click(function () {
				if ($(this).attr('class') == 'plus') {
					$(this).removeClass('plus');
					$(this).addClass('minus');
				}
				if ($(this).parent().find('input:checked').length == 1) {
					$(this).removeClass('minus');
					$(this).addClass('plus');
				}
				if ($('#CompareLayer2 .over_layer').find('.minus').length > 1) {
					$('#CompareLayer2 form input:image').each(function (index) {
						$(this).attr('disabled', '');
						$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
					});
				}
				else {
					$('#CompareLayer2 form input:image').each(function (index) {
						$(this).attr('disabled', 'disabled');
						$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
					});
				}
			});
		}
	});
	$('#CompareLayer2 form input:image').mouseover(function () {
		if ($('#CompareLayer2 .over_layer').find('.minus').length <= 1) {
			$(this).attr('disabled', 'disabled')
		}
	});
	$('#CompareLayer2 .over_layer').mouseout(function () {
		if ($(this).find('label').attr('class') == 'minus') {
			$(this).find('.background').show();
			$(this).find('label').show();
		}
		else {
			$(this).find('.background').hide();
			$(this).find('label').hide();
		}
	});
	if ($('#CompareLayer2 .over_layer').find('input:checked').length > 0) {
		$('#CompareLayer2 .over_layer').find('input:checked').parent().find('.background').show();
		$('#CompareLayer2 .over_layer').find('input:checked').parent().find('label').show();
		$('#CompareLayer2 .over_layer').find('input:checked').parent().find('label').attr('class', 'minus');
		if ($('#CompareLayer2 .over_layer').find('.minus').length > 1) {
			$('#CompareLayer2 form input:image').each(function (index) {
				$(this).attr('disabled', '');
				$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
			});
		}
	} /* download canter */
	$('.download_form .option .dropdown').hover(function () {
		$(this).parent().parent().css('z-index', '10');
	}, function () {
		$(this).parent().parent().css('z-index', '1');
	});
	$('.download_form .dropdown_menu .dropdown').hover(function () {
		$(this).parent().parent().css('z-index', '10');
	}, function () {
		$(this).parent().parent().css('z-index', '1');
	});
	$('.download_form .category .dropdown label').click(function () {
		$('.download_form .sub_category .dropdown').removeClass('inert');
		$('.download_form .sub_category .subject').css('background-position', 'left top')
	});
	$('.download_form .sub_category .dropdown label').click(function () {
		$('.download_form .model_name .dropdown').removeClass('inert');
		$('.download_form .model_name .subject').css('background-position', 'left top')
	});
	$('.download_form .model_name .dropdown label').click(function () {
		$('.download_form .model_code .dropdown').removeClass('inert');
		$('.download_form .model_code .subject').css('background-position', 'left top')
	});
	$('#downloadCenterContents .down_board span a').click(function () {
		$('#downloadCenterContents .down_board .target_con').hide();
		$('#downloadCenterContents .down_board span a').attr('class', '');
		$(this).addClass('choice');
		$($(this).attr('href')).show();
		return false;
	}); /* apps */
	if ($('.samsung_apps_content').length > 0) {
		$('.samsung_apps_content .box_form input').click(function () {
			$(this).attr('value', '');
		});
	} /* apps screenshoot*/
	if ($('.screenshoots').length > 0) {
		var numOf = $("#content_holder > li").length;
		var liWidth = $("#content_holder li").css('width').split('px')[0];
		$("#content_holder").css('width', numOf * liWidth);
		if ($("#content_holder").css('width').split('px')[0] > 958) {
			$('.screenshoots').append('<div class="ui_slider" id="content_slider"></div>');
			$('.ui-slider-handle').focus(function () {
				this.blur()
			});
			$(document).ready(function () {
				$("#content_slider").slider({
					change: handleSlider,
					slide: handleSlider
				});

				function handleSlider(e, ui) {
					var maxScroll = $("#content_scroll").attr("scrollWidth") - $("#content_scroll").width();
					$("#content_scroll").attr({
						scrollLeft: ui.value * (maxScroll / 100)
					});
					if (ui.value == 0) $('.ui-slider-handle').animate({
						marginLeft: "0px"
					}, 100);
					if (ui.value == 1) $('.ui-slider-handle').animate({
						marginLeft: "-8px"
					}, 100);
					if (ui.value == 2) $('.ui-slider-handle').animate({
						marginLeft: "-17px"
					}, 100);
					if (ui.value == 3) $('.ui-slider-handle').animate({
						marginLeft: "-27px"
					}, 100);
					if (ui.value == 4) $('.ui-slider-handle').animate({
						marginLeft: "-36px"
					}, 100);
					if (ui.value == 5) $('.ui-slider-handle').animate({
						marginLeft: "-46px"
					}, 100);
					if (ui.value == 6) $('.ui-slider-handle').animate({
						marginLeft: "-55px"
					}, 100);
					if (ui.value == 7) $('.ui-slider-handle').animate({
						marginLeft: "-64px"
					}, 100);
					if (ui.value == 8) $('.ui-slider-handle').animate({
						marginLeft: "-74px"
					}, 100);
					if (ui.value == 9) $('.ui-slider-handle').animate({
						marginLeft: "-76px"
					}, 100);
					if (ui.value == 91) $('.ui-slider-handle').animate({
						marginLeft: "-72px"
					}, 100);
					if (ui.value == 92) $('.ui-slider-handle').animate({
						marginLeft: "-77px"
					}, 100);
					if (ui.value == 93) $('.ui-slider-handle').animate({
						marginLeft: "-87px"
					}, 100);
					if (ui.value == 94) $('.ui-slider-handle').animate({
						marginLeft: "-96px"
					}, 100);
					if (ui.value == 95) $('.ui-slider-handle').animate({
						marginLeft: "-105px"
					}, 100);
					if (ui.value == 96) $('.ui-slider-handle').animate({
						marginLeft: "-115px"
					}, 100);
					if (ui.value == 97) $('.ui-slider-handle').animate({
						marginLeft: "-124px"
					}, 100);
					if (ui.value == 98) $('.ui-slider-handle').animate({
						marginLeft: "-134px"
					}, 100);
					if (ui.value == 99) $('.ui-slider-handle').animate({
						marginLeft: "-143px"
					}, 100);
					if (ui.value == 100) $('.ui-slider-handle').animate({
						marginLeft: "-153px"
					}, 100);
				}
			});
		}
		else {
			$("#content_holder").css('margin', '0 auto')
		}
	} /* apps */
	if ($('.weeks_picks').length > 0) {
		$('.picks_list .list_detail').append('<div class="indicator"><span> </span></div>');
		if ($('#picksListInfo_1 .pic li').length > 1) {
			$('#picksListInfo_1 .gallery').append('<div class="indexing"></div>');
			$('#picksListInfo_1 .gallery .indexing').append('<a class="arrow_left"></a>');
			$('#picksListInfo_1 .gallery .indexing').append('<a class="arrow_right"></a>');
			$('#picksListInfo_1 .pic li').each(function () {
				$('#picksListInfo_1 .indexing').prepend('<span></span>');
			});
			$('#picksListInfo_1 .indexing').find('span').eq(0).addClass('on');
		}

		function sumSlide(layerID) {
			$(layerID + " .gallery").jCarouselLite({
				btnNext: layerID + ' .indexing .arrow_right',
				btnPrev: layerID + ' .indexing .arrow_left',
				scroll: 1,
				visible: 1,
				circular: false,
				afterEnd: function () {
					if ($('#APP_M02 .large').length > 0) {
						if ($(this).css('left') == '0px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(0).addClass('on');
						}
						if ($(this).css('left') == '-210px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(1).addClass('on');
						}
						if ($(this).css('left') == '-420px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(2).addClass('on');
						}
						if ($(this).css('left') == '-630px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(3).addClass('on');
						}
					}
					else {
						if ($(this).css('left') == '0px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(0).addClass('on');
						}
						if ($(this).css('left') == '-149px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(1).addClass('on');
						}
						if ($(this).css('left') == '-298px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(2).addClass('on');
						}
						if ($(this).css('left') == '-447px') {
							$(layerID + " .indexing span").removeClass('on');
							$(layerID + " .indexing span").eq(3).addClass('on');
						}
					}
				}
			});
		}
		sumSlide('#picksListInfo_1');
		$('.item_list a').mouseover(function () {
			var layerID = $(this).attr('href');
			$('.list_detail').hide();
			$(layerID).show();
			$('.item_list li').removeClass('on');
			$(this).parent().addClass('on');
			if ($(layerID + ' .pic li').length > 1) {
				if ($(layerID + ' .gallery .indexing').length > 0) {
					return;
				}
				else {
					$(layerID + ' .gallery').append('<div class="indexing"></div>');
					$(layerID + ' .indexing').append('<a class="arrow_left"></a>');
					$(layerID + ' .indexing').append('<a class="arrow_right"></a>');
					$(layerID + ' .pic li').each(function () {
						$(layerID + ' .indexing').prepend('<span></span>');
					});
					$(layerID + ' .indexing').find('span').eq(0).addClass('on');
				}
			}
			sumSlide(layerID);
		})
		$('.item_list a').click(function () {
			this.blur();
			return false
		});
	} /* ì•…ì„¸ì‚¬ë¦¬ í•„í„° ë¶€ë¶„ */
	if ($('.acc_filter').length > 0) {
		$('.acc_filter li').prepend('<img src="/us/images/common/blank.gif" alt="" class="blank" />');
	} /* about module - ID : UGC_M02 */
	if ($('#UGC_M02 .list_wrap li').length > 5) {
		$('#UGC_M02 .list_wrap').before('<span class="prev disabled">move previous</span>');
		$('#UGC_M02 .list_wrap').after('<em class="next">move next</em>');
		$('#UGC_M02 .list_wrap').css('position', 'relative');
		$('#UGC_M02 .list_wrap ul').css({
			position: 'absolute',
			top: '0px',
			left: '0px'
		});
		$("#UGC_M02 .list_wrap").jCarouselLite({
			btnNext: '#UGC_M02 .next',
			btnPrev: '#UGC_M02 .prev',
			scroll: 1,
			visible: 5,
			circular: false,
			afterEnd: function () {
				var a1 = eval($('#UGC_M02 .list_wrap ul').css('left').split('px')[0]);
				var a2 = eval($('#UGC_M02 .list_wrap ul li').css('width').split('px')[0]) + 5;
			}
		});
	} /* about module - ID : UGC_M06 */
	if ($('#UGC_M06 .list li').length > 4) {
		$('#UGC_M06 .list').before('<span class="arrow_up">move up</span>');
		$('#UGC_M06 .list').after('<em class="arrow_down disabled">move down</em>');
		var bottomValue1 = eval($('#UGC_M06 .list ul li').css('height').split('px')[0]) + 4;
		var bottomValue2 = $('#UGC_M06 .list ul li').length;
		$('#UGC_M06 .list ul').css('bottom', '-' + bottomValue1 * bottomValue2 + 'px');
		$("#UGC_M06 .list").jCarouselLite({
			btnNext: '#UGC_M06 .arrow_up',
			btnPrev: '#UGC_M06 .arrow_down',
			vertical: true,
			scroll: 1,
			visible: 4,
			circular: false,
			beforeStart: function () {
				$('#UGC_M06 .list').stop();
			},
			afterEnd: function () {
				var a1 = eval($('#UGC_M06 .list ul').css('top').split('px')[0]);
				var a2 = eval($('#UGC_M06 .list ul li').css('height').split('px')[0]) + 4;
				var a3 = $('#UGC_M06 .list ul').css('bottom').split('px')[0];
				var a4 = eval(a3) + a2;
				$('#UGC_M06 .list').css('left', '0px');
			}
		});
	} /* about module - ID : UGC_M07 */
	if ($('#UGC_M07 .list_wrap li').length > 5) {
		$('#UGC_M07 .list_wrap').before('<span class="prev disabled">move previous</span>');
		$('#UGC_M07 .list_wrap').after('<em class="next">move next</em>');
		$('#UGC_M07 .list_wrap').css('position', 'relative');
		$('#UGC_M07 .list_wrap ul').css({
			position: 'absolute',
			top: '0px',
			left: '0px'
		});
		$("#UGC_M07 .list_wrap").jCarouselLite({
			btnNext: '#UGC_M07 .next',
			btnPrev: '#UGC_M07 .prev',
			scroll: 1,
			visible: 5,
			circular: false,
			afterEnd: function () {
				var a1 = eval($('#UGC_M07 .list_wrap ul').css('left').split('px')[0]);
				var a2 = eval($('#UGC_M07 .list_wrap ul li').css('width').split('px')[0]) + 5;
			}
		});
	} /* about module - ID : EDT_O01 with product Gallery */

	if ($('#gallery_btn_wrap').length > 0 && $('#EDT_O01').length > 0) {
		$('#EDT_O01').css('top', '-3000px');
		$('#EDT_O01').show();
		
		var wasVideo = false;/*added per SDS request 12/13/10 */

		$('#gallery_btn_wrap a').click(function () {
			$(this).parent().parent().find('li').removeClass('on');
			$(this).parent().addClass('on');
		

			var typeOfVisual;
			var visualValue = $(this).attr('href');
			if (visualValue.indexOf('.jpg') > 0) typeOfVisual = 'image';
			else typeOfVisual = 'video';
			if (typeOfVisual == 'image') {
				if ($('#gallery_btn_wrap').parent().find('.img_large').eq(0).children('img').length == 0) {  
                      $('#gallery_btn_wrap').parent().find('.img_large').prepend('<img>');
                      wasVideo = false;
                }/*added per SDS request 12/13/10 */
				$('#gallery_btn_wrap').parent().find('.img_large img').attr('src', $(this).attr('href'));
				$('#gallery_btn_wrap').parent().find('.img_large a').attr('href', $(this).attr('href'));
				$('#gallery_btn_wrap').parent().find('.img_large .video').remove();/*added per SDS request 12/13/10 */
				return false;
			}
			else if (typeOfVisual == 'video') {
				wasVideo = true;
                $('#gallery_btn_wrap').parent().find('.img_large img').remove();
				$('#gallery_btn_wrap').parent().find('.img_large object').remove();
                $('#gallery_btn_wrap').parent().find('.img_large a').attr('href', $(this).attr('href'));
                /*added per SDS request 12/13/10 */
				//showLayerPopupBackground();
				var flashCode = '<div class="video">';
				flashCode = flashCode + '<object type="application/x-shockwave-flash" id="visual2" title="visual2" accesskey="" tabindex="" data="' + visualValue + '" width="408" height="341">';
				flashCode = flashCode + '<param name="movie" value="' + visualValue + '" />';
				flashCode = flashCode + '<param name="quality" value="high" />';
				flashCode = flashCode + '<param name="wmode" value="opaque" />';
				flashCode = flashCode + '<param name="allowScriptAccess" value="sameDomain" />';
				flashCode = flashCode + '<strong>Content on this page requires a newer version of Adobe Flash Player.</strong>';
				flashCode = flashCode + '<p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>';
				flashCode = flashCode + '</object>';
				flashCode = flashCode + '</div>';
				//$('#visual').html('');
				//$('#visual').html(flashCode);
				//$('#EDT_O01').css('top', '74px');
				//if ($('#gallery_btn_wrap').parent().find('.img_large .video').length == 0) {
                $('#gallery_btn_wrap').parent().find('.img_large').prepend(flashCode);
                //        }/*added per SDS request 12/13/10 */
				return false;
			}
		});
		
		function EDTO01_layerVIew(object){
			if (object != undefined) {
				var visualValue = $(object).attr('href');   
			}
            if (visualValue != undefined && visualValue.indexOf('.swf') > 0) {  
				var flashCode = '<div class="video">';
					flashCode = flashCode + '<object type="application/x-shockwave-flash" id="visual2" title="visual2" accesskey="" tabindex="" data="' + $(object).attr('href') + '" width="596" height="363">';
					flashCode = flashCode + '<param name="movie" value="' + $(object).attr('href') + '" />';
					flashCode = flashCode + '<param name="quality" value="high" />';
					flashCode = flashCode + '<param name="wmode" value="opaque" />';
					flashCode = flashCode + '<param name="allowScriptAccess" value="sameDomain" />';
					flashCode = flashCode + '<strong>Content on this page requires a newer version of Adobe Flash Player.</strong>';
					flashCode = flashCode + '<p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>';
					flashCode = flashCode + '</object>';
					flashCode = flashCode + '</div>';
					$('#visual').html(flashCode);		
			} else {
				$('#visual').html('<div class="image"><img height="600" width="600" alt="" src="' + $('a[href=' + $('#gallery_btn_wrap').parent().find('.img_large img').eq(0).attr('src') + ']').find('span').eq(0).find('img').eq(0).attr('src') + '"></div>');
			}
			$('#visualThumb div').eq(0).html($('#gallery_btn_wrap div').eq(0).html());
			$('#visualThumb div ul').eq(0).attr('class', '');
			if ($('#EDT_O01 #visualThumb li').length > 5) {
				$('#visualThumb').append('<span class="prev disabled">Previous</span>');
				$('#visualThumb').append('<em class="next">Next</em>');
				$('#visualThumb').jCarouselLite({
					btnNext: '#visualThumb .next',
					btnPrev: '#visualThumb .prev',
					vertical: true,
					scroll: 1,
					visible: 5,
					circular: false
					//afterEnd: function () {
					//	var a1 = eval($('#visualThumb .list ul').css('top').split('px')[0]);
					//	var a2 = eval($('#visualThumb .list ul li').css('height').split('px')[0]) + 5;
					//}
				});
			}
			showLayerPopupBackground();
			$('#EDT_O01').css('top', '74px');
			$('#EDT_O01').css('display', 'block');
			$('#EDT_O01 #visualThumb .list a').click(function () {													   
				$(this).parent().parent().find('li').removeClass('on');
				$(this).parent().addClass('on');

				var visualValue = $(this).find('span').eq(0).find('img').eq(0).attr('src');
				if ($(this).attr('href').indexOf('.jpg') > 0) typeOfVisual = 'image';
				else typeOfVisual = 'video';
				$('#EDT_O01 #visual').empty();
				if (typeOfVisual == 'image') {
					$('#visual').append('<div class="image"><img src="' + visualValue + '" alt="" width="600" height="600" /></div>');
					return false;
				}
				else if (typeOfVisual == 'video') {
					var flashCode = '<div class="video">';
					flashCode = flashCode + '<object type="application/x-shockwave-flash" id="visual2" title="visual2" accesskey="" tabindex="" data="' + $(this).attr('href') + '" width="596" height="363">';
					flashCode = flashCode + '<param name="movie" value="' + $(this).attr('href') + '" />';
					flashCode = flashCode + '<param name="quality" value="high" />';
					flashCode = flashCode + '<param name="wmode" value="opaque" />';
					flashCode = flashCode + '<param name="allowScriptAccess" value="sameDomain" />';
					flashCode = flashCode + '<strong>Content on this page requires a newer version of Adobe Flash Player.</strong>';
					flashCode = flashCode + '<p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>';
					flashCode = flashCode + '</object>';
					flashCode = flashCode + '</div>';
					$('#visual').append(flashCode);
					return false;
				}
			});
		}
		$('#gallery_btn_wrap').parent().find('.img_large a').click(function(){ EDTO01_layerVIew(this);return false;});/*added per SDS request 12/13/10 */
		$('#gallery_btn_wrap').parent().find('.img_large img').click(function(){EDTO01_layerVIew();return false;});
	}
	if (document.getElementById('gallery_btn_wrap')) {
		$('#EDT_O01 .btn_close_layer').click(function () {
			$('#EDT_O01').css('top', '-3000px');
			$('#EDT_O01').show();
			$('#EDT_O01 #visualThumb .next').remove();
			$('#EDT_O01 #visualThumb .prev').remove();
			$('#EDT_O01 #visualThumb .list ul').remove();
			$('#EDT_O01 #visual .image').remove();
			$('#EDT_O01 #visual .video').remove();
		});
	}
	$('#module_video').hover(function () {
		$('#module_video .btn_play').css('display', 'block');
	}, function () {
		$('#module_video .btn_play').css('display', 'none');
	});
	$('#etc .countrysitecon #countrySet_Latin').mouseover(function () {
		$('#additionalLayer_Latin').show();
	});
	$('#etc .countrysitecon #countrySet_Latin').mouseout(function () {
		$('#additionalLayer_Latin').hide();
	});
	$('#etc .countrysitecon #additionalLayer_Latin').mouseover(function () {
		$('#additionalLayer_Latin').show();
	});
	$('#etc .countrysitecon #additionalLayer_Latin').mouseout(function () {
		$('#additionalLayer_Latin').hide();
	});
	$('#etc .countrysitecon #countrySet_MiddleEastArabic').mouseover(function () {
		$('#additionalLayer_MiddleEastArabic').show();
	});
	$('#etc .countrysitecon #countrySet_MiddleEastArabic').mouseout(function () {
		$('#additionalLayer_MiddleEastArabic').hide();
	});
	$('#etc .countrysitecon #additionalLayer_MiddleEastArabic').mouseover(function () {
		$('#additionalLayer_MiddleEastArabic').show();
	});
	$('#etc .countrysitecon #additionalLayer_MiddleEastArabic').mouseout(function () {
		$('#additionalLayer_MiddleEastArabic').hide();
	});
	$('#etc .countrysitecon #countrySet_MiddleEastEnglish').mouseover(function () {
		$('#additionalLayer_MiddleEastEnglish').show();
	});
	$('#etc .countrysitecon #countrySet_MiddleEastEnglish').mouseout(function () {
		$('#additionalLayer_MiddleEastEnglish').hide();
	});
	$('#etc .countrysitecon #additionalLayer_MiddleEastEnglish').mouseover(function () {
		$('#additionalLayer_MiddleEastEnglish').show();
	});
	$('#etc .countrysitecon #additionalLayer_MiddleEastEnglish').mouseout(function () {
		$('#additionalLayer_MiddleEastEnglish').hide();
	});
	$('#etc .countrysitecon #countrySet_AfricaArabic').mouseover(function () {
		$('#additionalLayer_AfricaArabic').show();
	});
	$('#etc .countrysitecon #countrySet_AfricaArabic').mouseout(function () {
		$('#additionalLayer_AfricaArabic').hide();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaArabic').mouseover(function () {
		$('#additionalLayer_AfricaArabic').show();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaArabic').mouseout(function () {
		$('#additionalLayer_AfricaArabic').hide();
	});
	$('#etc .countrysitecon #countrySet_AfricaEnglish').mouseover(function () {
		$('#additionalLayer_AfricaEnglish').show();
	});
	$('#etc .countrysitecon #countrySet_AfricaEnglish').mouseout(function () {
		$('#additionalLayer_AfricaEnglish').hide();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaEnglish').mouseover(function () {
		$('#additionalLayer_AfricaEnglish').show();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaEnglish').mouseout(function () {
		$('#additionalLayer_AfricaEnglish').hide();
	});
	$('#etc .countrysitecon #countrySet_AfricaFrench').mouseover(function () {
		$('#additionalLayer_AfricaFrench').show();
	});
	$('#etc .countrysitecon #countrySet_AfricaFrench').mouseout(function () {
		$('#additionalLayer_AfricaFrench').hide();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaFrench').mouseover(function () {
		$('#additionalLayer_AfricaFrench').show();
	});
	$('#etc .countrysitecon #additionalLayer_AfricaFrench').mouseout(function () {
		$('#additionalLayer_AfricaFrench').hide();
	}); /* live chat*/

		
	/* Online Inquiry */
	$('#GnbB2B').find('.contactus').eq(0).find('a').eq(2).click(function () {
		openpopCRM_B2B('CRM_B2B_GBN');
		return false;
	});
	$('#GnbB2B').find('.contactus').eq(1).find('a').eq(2).click(function () {
		openpopCRM_B2B('CRM_B2B_GBN');
		return false;
	});
	$('.footer_b2b .other_links .link1 a').eq(0).click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	$('.cont_division1 .cont_right a').eq(1).click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	$('#CRM_M03_312 .link_btn_st2').click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	$('.contact_us').find('.info').eq(1).find('a.link_more').eq(0).click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	$('.why_samsung .contact_us').find('a').eq(1).click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	$('#b2b_solutions_links').click(function () {
		$(this).attr('href', '#wrap');
		openpopCRM_B2B('CRM_B2B_GBN');
	});
	
	/* B2B Newletter */
	if ($('#CRM_O02_Newsletter').length > 0) {
		$('.footer_b2b .link2').find('a').eq(2).click(function () {
			openpopCRM_B2B('CRM_O02_Newsletter');
		});
	} /* ëª¨ë“ˆ í…œí”Œë¦¿ ë¼ì¸ ì œê±° */
	if ($('.product_module .module_template').length > 0) {
		$('.product_module .module_template').eq(0).addClass('no_border');
		$('.product_module_line').addClass('module_add_border');
	} /* gnb - Recently Viewed */
	if ($('.subtype .module_template').length > 0) {
		$('.subtype .module_template').eq(0).addClass('no_border');
	} /* gnb - Recently Viewed */
	
	$('.recently_list').find('li').eq(0).addClass('no_border');


	$('#SOC_M03_v9 .layer_head .btn_close').click(function(){
		$('#layerPop #step1').hide();
		$('#layerPop #step2').hide();
	});
}); /* Sales Force */

function makeDropBox() {
	$('div.dropdown').hover(function () {
		$(this).children('dl').addClass('on');
		var lilength = $(this).find('li').length;
		if (lilength > 8) {
			$(this).find('ul').addClass('scroll');
		}
		$(this).css('position', 'relative');
		$('div.dropdown label').hover(function () {
			$(this).css('text-decoration', 'underline');
		}, function () {
			$(this).css('text-decoration', 'none');
		});
		$('div.dropdown label').click(function () {
			var labelText = $(this).text();
			var dtText = $(this).parent().parent().parent().parent().parent().children('dt');
			dtText.text(labelText);
			$(this).parent().parent().parent().parent().parent().removeClass('on');
		});
	}, function () {
		$(this).children('dl').removeClass('on');
		var lilength = $(this).find('li').length;
		if (lilength > 8) {
			$(this).find('ul').removeClass('scroll');
		}
		$(this).css('position', 'static');
	});
}


/*************************************************************
 *    DYNIFS - Dynamic IFrame Auto Size v1.0.0
 *
 *    Copyright (C) 2006, Markus (phpMiX)
 *    This script is released under GPL License.
 *    Feel free to use this script (or part of it) wherever you need
 *    it ...but please, give credit to original author. Thank you. :-)
 *    We will also appreciate any links you could give us.
 *    http://www.phpmix.org
 *
 *    Enjoy! ;-)
*************************************************************/
var DYNIFS = {
	// Storage for known IFrames.
	iframes: {},
	// Here we save any previously installed onresize handler.
	oldresize: null,
	// Flag that tell us if we have already installed our onresize handler.
	ready: false,
	// The document dimensions last time onresize was executed.
	dim: [-1,-1],
	// Timer ID used to defer the actual resize action.
	timerID: 0,
	// Obtain the dimensions (width,height) of the given document.
	getDim: function(d) {
		var w=200, h=200, scr_h, off_h;
		if( d.height ) { return [d.width,d.height]; }
		with( d.body ) {
			if( scrollHeight ) { h=scr_h=scrollHeight; w=scrollWidth;}
			if( offsetHeight ) { h=off_h=offsetHeight; w=offsetWidth;}
			if( scr_h && off_h ) h=Math.max(scr_h, off_h);
		}
		return [w,h];
	},

	// This is our window.onresize handler.
	onresize: function() {
		// Invoke any previously installed onresize handler.
		if( typeof this.oldresize == 'function' ) { this.oldresize(); }
		// Check if the document dimensions really changed.
		var dim = this.getDim(document);
		if( this.dim[0] == dim[0] && this.dim[1] == dim[1] ) return;
		// Defer the resize action to prevent endless loop in quirksmode.
		if( this.timerID ) return;
		this.timerID = setTimeout('DYNIFS.deferred_resize();', 10);
	},
	// This is where the actual IFrame resize is invoked.
	deferred_resize: function() {
		// Walk the list of known IFrames to see if they need to be resized.
		for( var id in this.iframes ) this.resize(id);
		// Store resulting document dimensions.
		this.dim = this.getDim(document);
		// Clear the timer flag.
		this.timerID = 0;
	},

	// This is invoked when the IFrame is loaded or when the main window is resized.
	resize: function(id) {
		// Browser compatibility check.

		if( !window.frames || !window.frames[id] || !document.getElementById || !document.body )
			return;
		// Get references to the IFrame window and layer.
		var iframe = window.frames[id];
		var div = document.getElementById(id);
		if( !div ) return;

		// Save the IFrame id for later use in our onresize handler.
		if( !this.iframes[id] ) {
			this.iframes[id] = true;
		}

		// Should we inject our onresize event handler?
		if( !this.ready ) {
			this.ready = true;
			this.oldresize = window.onresize;
			window.onresize = new Function('DYNIFS.onresize();');
		}

		// This appears to be necessary in MSIE to compute the height
		// when the IFrame'd document is in quirksmode.
		// OTOH, it doesn't seem to break anything in standards mode, so...
		if( document.all ) div.style.height = '0px';

		// Resize the IFrame container.
		var dim = this.getDim(iframe.document);
		var extendHeight = 30;
		if( navigator.userAgent.indexOf("Opera") != -1 ) extendHeight = 10;
		if( navigator.userAgent.indexOf("Safari") != -1 ) extendHeight = 0;
		div.style.height = (dim[1]+extendHeight) + 'px';
	}
	
}

var uriString = location.href;
uriString = uriString.split( '?' )[ 0 ];

if( uriString.match( 'samsung.com/us/computer/laptops' + '$' ) == 'samsung.com/us/computer/laptops'  ||
	uriString.match( 'samsung.com/us/computer/laptops/' + '$' ) == 'samsung.com/us/computer/laptops/' )
{
	$(document).ready( function()
	{
		/* $( '#container' ).css( 'width', '100%' ); */
		$( '#content' ).css( 'margin', 'auto' ); 
	} );
}




/*  Added By Shanth For Top and Bottom Nav Tagging*/
function omnLinkTag(arg1,arg2,arg3,arg4,arg5,arg6)
{
	try{
		
		
		var test=arg1+arg2+ arg3 + arg4 + arg5+arg6;
		
		ss_link_click_track(
				'prop15,prop16,prop17,eVar9,eVar10,eVar11',''
				,'',arg1+ s.pageName 
					+ arg2 + s.pageName
					+ arg3+ s.pageName 
					+ arg4 + s.pageName 
					+ arg5
				,'o'
				,arg6);
	}catch(e){}

}

//product spec downloads hack
//$(document).ready(function(){ 
//		if ($('.product_spec ul.function.facebook_iframe li:nth-child(2)').hasClass('download')){
//			$('.product_spec ul.function.facebook_iframe').width('45%');
//		}else{
//			$('.product_spec ul.function.facebook_iframe').width('30%');
//		}
//	});
	
	// Hospitality Conditionals
$(document).ready(function () {
	var urlValue = String(window.location.href);
	var urlValueSplit = urlValue.split('/'); /* product comparing */
	if (urlValueSplit[4] == 'business' && urlValueSplit[5].indexOf('hospitality') == 0)
		{
			$('div.footer_b2b div.other_links ul.link1').html('<li>Contact Us (Phone 1-888-727-2664)</li>');
			$('div.menus').html('<div class="stretch960"><div class="centerMe"><a class="btn" href="#hotelAnchor">Online Form</a><p>Find out how to get Samsung HDTVs for your hotel.</p></div></div>');
			$('div.flagship-cta').html('<div class="stretch960"><div class="centerMe"><div style="float:left;"><a class="btn" href="#hotelAnchor">Online Form</a></div><div style="float:left;"><p>Find out how to get Samsung HDTVs for your hotel.</p></div></div></div>');
			$('li.nav-shop').html('');
			
			$('li.shop-cta a.reg-btn').css('display','none');
			$('#quick-view a.reg-btn').css('display','none');
		}
} );

/* 2010-10-21 sds requested */
/* Generic Function for Onclick Omniture Tagging */
function omnTagLinkCommon(prop15Evar9,prop16Evar10,prop17Evar11,events){
     var trackValues='';
     var trackVariables='';

     if(events!=''){
		
		 trackVariables='prop15,eVar9,prop16,eVar10,prop17,eVar11,events';
		 trackValues=prop15Evar9+','
						+prop15Evar9+','+s.pageName
						+'>' +prop16Evar10+','+s.pageName
						+'>' +prop16Evar10+','+s.pageName
						+'>' +prop17Evar11+','+s.pageName
						+'>' +prop17Evar11;
			}
	else{
		
		 trackVariables='prop15,eVar9,prop16,eVar10,prop17,eVar11';
		 trackValues=prop15Evar9+','
						+prop15Evar9+','+s.pageName
						+'>' +prop16Evar10+','+s.pageName
						+'>' +prop16Evar10+','+s.pageName
						+'>' +prop17Evar11+','+s.pageName
						+'>' +prop17Evar11;
			}
     try{
		ss_link_click_track(trackVariables,events,'',trackValues,'o',prop15Evar9);
     }catch(e){}
}

/* 2010-11-11 add function for omniture tags */
function omnTaglike()
{
	ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event78',
							omn_ss_products,'like,'
							+ s.pageName + '>like,'
							+ s.pageName + '>product detail/review>like,like,'
							+ s.pageName + '>like,'
							+ s.pageName + '>product detail/review>like,events','o','facebook like');
}

/* 2010-11-17 add function for omniture tags */
function omnTagging(ssLink) {
	if(ssLink == 'i own this') {
		ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event47','','i own this,' + s.pageName + '>i own this,' + s.pageName + '>product detail/review>i own this,i own this,' + s.pageName + '>i own this,' + s.pageName + '>product detail/review>i own this,events','o','i own this');
	} else if(ssLink == 'see stores') {
		ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event20','','see stores,' + s.pageName + '>see stores,' + s.pageName + '>product detail/review>see stores,see stores,' + s.pageName + '>see stores,' + s.pageName + '>product detail/review>see stores,events','o','see stores');
	}
}

/* 2010-11-18 add function for omniture tags */
function omnTaggingCt(ssLink,category,products){
	if(ssLink == 'shop') {
		ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event20','','category:'+category+',' +
		s.pageName + '>category:'+category+',' + s.pageName + '>category selection>category:'+category+',category:'+category+','+
		s.pageName + '>category:'+category+',' + s.pageName + '>category selection>category:'+category+',events','o','category selection:'+category);
	} else if(ssLink == 'search') {
		ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events,products','event20',products,'search result click,' +
		s.pageName + '>search result click,' + s.pageName + '>search results>search result click,search result click,' +
		s.pageName + '>search result click,'+ s.pageName + '>search results>search result click,events','o','search result click');
	}
}

function omn_liveChatClick(){
		try{
			ss_link_click_track('prop15,prop16,prop17,eVar9,eVar10,eVar11,events','event55','','live chat support,' + s.pageName + '>live chat support,' + s.pageName + '>live chat>live chat support,live chat support,' + s.pageName + '>live chat support,' + s.pageName + '>live chat>live chat support,events','o','live chat support');
		}catch(e){}
}

// Watch out, hacky conditionals below --/

var uriString = location.href;
uriString = uriString.split( '?' )[ 0 ];

if( uriString.match( 'samsung.com/us/computer/laptops' + '$' ) == 'samsung.com/us/computer/laptops'  ||
	uriString.match( 'samsung.com/us/computer/laptops/' + '$' ) == 'samsung.com/us/computer/laptops/' )
{
	$(document).ready( function()
	{
		/* $( '#container' ).css( 'width', '100%' ); */
		$( '#content' ).css( 'margin', 'auto' ); 
	} );
}

if( uriString.match( 'samsung.com/us/business/hospitality' + '$' ) == 'samsung.com/us/business/hospitality'  ||
	uriString.match( 'samsung.com/us/business/hospitality/' + '$' ) == 'samsung.com/us/business/hospitality/' )
{
	
	$(document).ready(function(){
		$('body').append('<style>div#title {display:none;}</style>');
	});
}

// hacky conditionals above ---^^^^

//video skin hacky sack
var urlValue = String(window.location.href);
var urlValueSplit = urlValue.split('/');




if(urlValueSplit[5] == 'the-wonder-of-samsung-smart-tvs'){
    setTimeout(function(){window.location = 'http://www.samsung.com/us/smarttv'}, 50);
}


if(urlValueSplit[4] == 'video' && urlValueSplit[5] == 'tvs'||
    urlValueSplit[4] == 'video' && urlValueSplit[5] == 'blu-ray-dvd' ||
    urlValueSplit[4] == 'video' && urlValueSplit[5] == 'home-theater' ||
    urlValueSplit[4] == 'appliances' && urlValueSplit[5] == 'washers-dryers' ||
    urlValueSplit[4] == 'appliances' && urlValueSplit[5] == 'refrigerators' ||
    urlValueSplit[4] == 'appliances' && urlValueSplit[5] == 'microwaves' ||
    urlValueSplit[4] == 'appliances' && urlValueSplit[5] == 'dishwashers' ||
    urlValueSplit[4] == 'appliances' && urlValueSplit[5] == 'oven-ranges' ||
    urlValueSplit[4] == 'photography' && urlValueSplit[5] == 'digital-cameras' ||
    urlValueSplit[4] == 'photography' && urlValueSplit[5] == 'camcorders'
)
{
	
	$(document).ready(function(){
		$( '#EDT_M04 .video' ).addClass('mobileVid');
		$( '#EDT_M03 .video' ).addClass('mobileVid');
	});
}
$(document).ready(function(){
	if(urlValueSplit[5] == 'newsRead.do?news_seq=19898' || urlValueSplit[5] == 'newsRead.do?news_seq=19898&page=1&gltype=localnews'){
		videoPlayer("http://www.youtube.com/watch?v=c-ro1pk8MhY","university","/us/images/article/galaxy_video.jpg","520", "320");
	}
	
	if(urlValueSplit[5] == 'newsRead.do?news_seq=19903&gltype' || urlValueSplit[5] == 'newsRead.do?news_seq=19903'){
		videoPlayer("http://www.youtube.com/watch?v=a_0NnwFAzzM","tabvideo","/us/images/article/touchwizUpdate_poster.png","520", "320");
	}
	
});
/*
$(document).ready(function(){
	//Marketo Tagging on Business Pages
	if( (urlValueSplit[4].match('business') && urlValueSplit[5].match('monitors')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('laptops')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('printers')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('commercial-display-solutions')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('tablet-pcs')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('galaxy-tab')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('tablet-pcs')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('why_samsung.html')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('contact_us.html')) || 
		(urlValueSplit[4].match('business') && urlValueSplit[5].match('index.html')) ||
		(urlValueSplit[4].match('it_solutions') && urlValueSplit[5].match('business') && urlValueSplit[6].match('business.html')) || 
		(urlValueSplit[4].match('it_solutions') && urlValueSplit[5].match('healthcare') && urlValueSplit[6].match('healthcare.html')) || 
		(urlValueSplit[4].match('it_solutions') && urlValueSplit[5].match('education') && urlValueSplit[6].match('education.html')) || 
		(urlValueSplit[4].match('it_solutions') && urlValueSplit[5].match('government') && urlValueSplit[6].match('government.html')) || 
		(urlValueSplit[4].match('it_solutions') && urlValueSplit[5].match('government') && urlValueSplit[6].match('stateandlocal.html')) ){
			$.ajax({
			  url: document.location.protocol + '//munchkin.marketo.net/munchkin.js',
			  dataType: 'script',
			  cache: true,
			  success: function() {
			    Munchkin.init('924-VOH-759');
  				}
			});
	}
});
*/
//smart tv bundle topic page disclaimer injection 
$(document).ready(function(){

if(urlValueSplit[4].match('topic') && urlValueSplit[5].match('samsung-smart-tv-bundles')){

	$("#container").append('<p style="font-size:12px;color:#666;margin: 20px auto;">*Participation may vary and is limited to only participating <a href="http://stgwebus.samsung.com/us/peaceofmind/authorized_resellers.html">authorized retailers</a> (at their sole discretion). Bonus products may vary and will be based on retailer in-stock inventory. Offer valid (subject to retailer participation) for purchases made after 12 a.m. EST on August 26th 2012 through September 8th, 2012, 11:59pm EST or while supplies last. No rain checks. Additional restrictions and limitations may apply so Samsung advises consumers to verify if and when an <a href="http://stgwebus.samsung.com/us/peaceofmind/authorized_resellers.html">authorized retailer</a> is participating in the promotion, and if a particular TV and/or bonus product is eligible before completing a purchase.</p>');
}
});

$(document).ready(function(){

	if(!urlValueSplit[6] || $('body').attr('id') != 'products'){
		return;
		}
		
	//galaxy note T-Mobile shop button change
	if(urlValueSplit[6].match('SGH-T879ZBBTMB')){
		
		// $('.flagship-cta').html('<a onclick="ss_link_click_track_2(\'\',\'event33, event20\',\'Cell Phones;SGH-T879ZBBTMB\',\'\',\'product header\',\'o\',\'buy now\');" class="lg-btn" href="https://samsungdirect.bbymsolutions.com/detail/1954?utm_source=SAM&utm_medium=link&utm_campaign=DeepLinks"><span>Buy Now</span></a>');
		
		// $('.nav-shop').hide();
	}

	//hide shop buttons for LH40SFWTGC 40" Microsoft Surface
	if(urlValueSplit[5].match('commercial-display-solutions') && urlValueSplit[6].match('LH40SFWTGC')){
		$('.flagship-specs-cta-container').find('.noprice-note').html('Please check with an authorized Samsung reseller for price information or <br /> <strong>Call 1-866-SAM-4BIZ</strong>');

		$('.flagship-cta').hide();
		$('.nav-shop').hide();
	}


	//inject shop buttons for developer GS3 phones
	if(urlValueSplit[6].match('SCH-I535MBCVZW')){
		$('.flagship-cta').html('<a onclick="ss_link_click_track_2(\'\',\'event20\',\'Cell Phones;SCH-I535MBCVZW\',\'\',\'product header\',\'o\',\'shop\');" class="lg-btn" href="https://mobile.samsung.com/accessories/addtocart.do?productid=ETC-I535MBCVZW&returnurl=http://www.samsung.com/us/mobile/cell-phones-accessories"><span>Shop</span></a>');
	}

	if(urlValueSplit[6].match('SCH-I535MBDVZW')){
		$('.flagship-cta').html('<a onclick="ss_link_click_track_2(\'\',\'event20\',\'Cell Phones;SCH-I535MBDVZW \',\'\',\'product header\',\'o\',\'shop\');" class="lg-btn" href="https://mobile.samsung.com/accessories/addtocart.do?productid=ETC-I535MBDVZW&returnurl=http://www.samsung.com/us/mobile/cell-phones-accessories"><span>Shop</span></a>');
	}



	//hide shop button and show coming soon button
	if(urlValueSplit[6].match('NP700Z5A-S01US') || urlValueSplit[6].match('NP700Z3A-S01US') || urlValueSplit[6].match('NP700Z5A-S02US')){
			$('.flagship-cta').hide();
			$('.flagship-specs-cta-container').append('<a class="lg-btn" href="/us/article/series-7-notebook-style-speed-and-power"><span>Check it out</span></a>');
			$('.nav-shop').hide();
	}	
	
	//hide shop buttons for nx cameras -apr'12
	// if(urlValueSplit[6].match('EV-NX20ZZBSBUS') || urlValueSplit[6].match('EV-NX210ZBSBUS') || urlValueSplit[6].match('EV-NX1000BABUS') || urlValueSplit[6].match('EV-NX1000BFWUS')){
	// 	$('.flagship-cta').hide();
	// 	$('.nav-shop').hide();
	// }

	
});

$(document).ready(function(){

	
	if(!urlValueSplit[6] || $('body').attr('id') != 'products'){
		return;
	}
	if (urlValueSplit[6].match('GT-P7510MAYXAB') || urlValueSplit[6].match('GT-P7510MAVXAB') || urlValueSplit[6].match('GT-P7510UWYXAB') || urlValueSplit[6].match('GT-P7510UWVXAB') || urlValueSplit[6].match('GT-P7310UWAXAR') || urlValueSplit[6].match('GT-P7310UWEXAR') || urlValueSplit[6].match('GT-P7310MAEXAR') || urlValueSplit[6].match('GT-P7310MAAXAR') || urlValueSplit[6].match('YP-GS1CB') || urlValueSplit[6].match('YP-G70CWY') || urlValueSplit[6].match('GT-P3113TSYXAR') || urlValueSplit[6].match('GT-P5113TSYXAR') || urlValueSplit[6].match('YP-GI1CB') || urlValueSplit[6].match('HT-E6730W') || urlValueSplit[6].match('UN65ES8000FXZA') || urlValueSplit[6].match('UN60ES8000FXZA') || urlValueSplit[6].match('UN55ES8000FXZA') || urlValueSplit[6].match('UN46ES8000FXZA') || urlValueSplit[6].match('DA-E750') || urlValueSplit[6].match('DA-E751') || urlValueSplit[6].match('UN75ES9000FXZA')){
		$('.hero #flagship-content').append('<div id="underlay_nav"></div>');
		$('.hero .underlay_list').cycle({
			fx: 'fade',
			timeout: 6000,
			speed: 1500,
			pager: '#underlay_nav',
			pauseOnPagerHover: 1,
			pause: 0,
			autostop: 0
		});
	}
	
	if (urlValueSplit[6].match('SCH-I905MSAVZW') || urlValueSplit[6].match('SCH-I905ZWAVZW') || urlValueSplit[6].match('SCH-I905UKAVZW') || urlValueSplit[6].match('SCH-I905UWAVZW') || urlValueSplit[6].match('SPH-D710ZKASPR') || urlValueSplit[6].match('SGH-I777ZKAATT') || urlValueSplit[6].match('SCH-I405LKAVZW') || urlValueSplit[6].match('SGH-I677DAAATT') || urlValueSplit[6].match('SGH-T989ZKBTMB') || urlValueSplit[6].match('SCH-I405ZWBVZW') || urlValueSplit[6].match('SGH-T989ZWBTMB') || urlValueSplit[6].match('SCH-I515MSAVZW') || urlValueSplit[6].match('SGH-I727MSAATT') || urlValueSplit[6].match('SGH-I727ZWAATT') || urlValueSplit[6].match('SPH-D710ZWASPR') || urlValueSplit[6].match('SGH-I717RWAATT') || urlValueSplit[6].match('SGH-I717ZBAATT') || urlValueSplit[6].match('NP-NF310-A01US') || urlValueSplit[6].match('SCH-R760IBAUSC') || urlValueSplit[6].match('NP900X3B-A01US') || urlValueSplit[6].match('NP900X3B-A02US') || urlValueSplit[6].match('NP900X4B-A02US') || urlValueSplit[6].match('SPH-L700ZKASPR') || urlValueSplit[6].match('NP700G7C-S01US') || urlValueSplit[6].match('XE550C22-H01US') || urlValueSplit[6].match('XE550C22-H02US')  || urlValueSplit[6].match('XE550C22-A01US') || urlValueSplit[6].match('XE550C22-A02US') || urlValueSplit[6].match('XE300M22-A01US') || urlValueSplit[6].match('XE300M22-A02US') || urlValueSplit[6].match('PN64E8000GFXZA') || urlValueSplit[6].match('PN60E8000GFXZA') || urlValueSplit[6].match('PN51E8000GFXZA') || urlValueSplit[6].match('DP500A2D-A01UB') || urlValueSplit[6].match('DP500A2D-A02UB') || urlValueSplit[6].match('NP540U3C-A01UB') || urlValueSplit[6].match('NP540U3C-A02UB') || urlValueSplit[6].match('XE500T1C-A01US') || urlValueSplit[6].match('XE500T1C-A03US') || urlValueSplit[6].match('XE500T1C-A04US') || urlValueSplit[6].match('XE500T1C-A02US') || urlValueSplit[6].match('DP700A3D-A01US') || urlValueSplit[6].match('DP700A7D-S01US') || urlValueSplit[6].match('DP700A7D-S02US') || urlValueSplit[6].match('NP700G7C-S02US') || urlValueSplit[6].match('NP700G7C-T01US') || urlValueSplit[6].match('XE700T1C-A01US') || urlValueSplit[6].match('XE700T1C-A02US')){
	$('.hero #flagship-content').append('<div id="underlay_nav"></div>');
		$('.hero .underlay_list').cycle({
			fx: 'fade',
			timeout: 6000,
			speed: 1500,
			pager: '#underlay_nav',
			pauseOnPagerHover: 1,
			pause: 0,
			autostop: 0
		});
	}

if(urlValueSplit[6].match('SGH-I717ZBAATT') || urlValueSplit[6].match('SGH-I717RWAATT')){
		$('.EDT_S03').delegate('a', 'click', function(e){
			e.preventDefault();
			noteModal(400, 250);
		});
	}

	//tagging for Samsung ATIV Smart PC 500T: Consideration
	if(urlValueSplit[6].match('tablet-pcs') || urlValueSplit[6].match('XE500T1C-HA2US') || urlValueSplit[6].match('XE500T1C-HA1US') || urlValueSplit[6].match('XE500T1C-A04US') || urlValueSplit[6].match('XE500T1C-A03US') || urlValueSplit[6].match('XE500T1C-A02US') || urlValueSplit[6].match('XE500T1C-A01US')){
		$('.recommend-herosection a').click(function(e){
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			$('body').append('<iframe src="http://1782317.fls.doubleclick.net/activityi;src=1782317;type=2013s977;cat=samsu003;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		});
	}

	if(urlValueSplit[6].match('XE500T1C-A04US') || urlValueSplit[6].match('XE500T1C-A03US') || urlValueSplit[6].match('XE500T1C-A02US') || urlValueSplit[6].match('XE500T1C-A01US')){
		$('.flagship-cta').click(function(e){
			var axel = Math.random() + "";
			var a = axel * 10000000000000;
			$('body').append('<iframe src="http://1782317.fls.doubleclick.net/activityi;src=1782317;type=2013s977;cat=samsu870;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
		});
	}

//pixel tracking click events for home-theater/HT-E6730W/ZA
	if(urlValueSplit[6].match('HT-E6730W')){
		var $body = $('body');
		$('#subnav').delegate('a', 'click', function(){
				var $this = $(this);
				if($this.closest('ul').hasClass('subnav-links')){
				
				switch ($this.text()) {
					case "Overview":
					   $body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_overview&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
					    break;
					case "Features":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_features&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
						break;
					case "Specs":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_specs&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
						break;
					case "Gallery":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_gallery&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
						break;
					case "Reviews":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_reviews&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
					    break;
					case "Accessories":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_accessories&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
					    break;
					case "Support":
						$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_support&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
					    break;
					}
			}
			else{
			 if($this.closest('ul').hasClass('product-info')){
					$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=main_review&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1" />');
				}
				else{
					return false;
				}
			}	
			});
		$('.flagship-cta').find('a').click(function(){
				$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=main_shop&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1" />');
		});
		
		$('.EDT_S07').find('a').click(function(){
		    if($(this).attr('title') === "Freedom of Sound"){
		    	$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_learnmore&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
		    }else{
		    	if($(this).attr('title') === "Your Home Theater Blueprint"){
		    	$body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=overview_fengshui&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
		    	}else{return false;}
		    }
		});
		$('#SUP_M20').delegate('a', 'click', function(){
		    switch ($(this).text()) {
		    case "Owner's Manual":
		        $body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=owners_manual&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
		        break;
		   case "Troubleshooting":
		        $body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=owners_trouble&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');        
		        break;
		    case "Visit Support page":
		        $body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=owners_support&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
		        break;
		    case "Register this Product":
		        $body.append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=0ef0dd23-8949-467d-8b57-c09f6bf4743b&type=owners_register&val=0.0&orderId=&promoCode=&valueCurrency=USD" width="1" height="1">');
		        break;
		    }
		});
	
	}
	

//	sprint
//	if( urlValueSplit[6].match('SPH-L710MBBSPR') || urlValueSplit[6].match('SPH-L710RWBSPR') ){
//	
//
//		$('.flagship-cta').html('<ul id="sprint-buy-buttons">
//<li><a href="/us/mobile/cell-phones/SPH-L710MBBSPR-buy" class="lg-btn" onclick="javascript:ss_link_click_track_2('','event20','Cell Phones;SPH-L710MBBSPR','','product header','o','shop');"><span>Buy Now</span></a></li>
//<li><img src="/us/images/1517691_90_30.gif" /></li>
//<li><a href="/us/mobile/cell-phones/SPH-L710MBBSPR-buy" class="lg-btn" onclick="javascript:ss_link_click_track_2('','event20','Cell Phones;SPH-L710MBBSPR','','product header','o','shop');"><span>Buy Now</span></a></li>
//<li><img src="/us/images/sprint_v2.gif" /></li>
//</ul>');
//		
//		$(".flagship-cta").delegate("a", "click", function() {
//  			ss_link_click_track_2('','event33','','','overview>sprint','o','pre-order');
//		});
//	}
	
	//tmobile SGH-T769NKBTMB
	if( urlValueSplit[6].match('SGH-T769NKBTMB')){
		$('.flagship-cta a span').text('Buy Now');
		$('.flagship-cta a').attr("href", "https://samsungdirect.bbymsolutions.com/detail/1221?utm_source=SAM&utm_medium=link&utm_campaign=DeepLinks");
		$('.flagship-cta a').attr("onclick", "");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event20, event33','','','overview>t-mobile','o','buy now');
		});
	}
	
	//tmobile SGH-T999MBATMB
	if( urlValueSplit[6].match('SGH-T999MBATMB') ){
		$('.flagship-cta a span').text('Buy Now');
		$('.flagship-cta a').attr("href", "http://www.t-mobile.com/shop/phones/Cell-Phone-Detail.aspx?cell-phone=Samsung-Galaxy-S-III-Pebble-Blue-32GB");
		//$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','','','overview>sprint','o','buy now');");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event33','','','overview>sprint','o','buy now');
		});
	}
	
	//tmobile SGH-T999RWATMB
	if( urlValueSplit[6].match('SGH-T999RWATMB') ){
		$('.flagship-cta a span').text('Buy Now');
		$('.flagship-cta a').attr("href", "http://www.t-mobile.com/shop/phones/Cell-Phone-Detail.aspx?cell-phone=Samsung-Galaxy-S-III-Marble-White-32GB");
		//$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','','','overview>sprint','o','buy now');");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event33','','','overview>sprint','o','buy now');
		});
	}

// function split out in 1920 - 1938
//	if( urlValueSplit[6].match('SGH-T999MBATMB') || urlValueSplit[6].match('SGH-T999RWATMB') ){
//		$('.flagship-cta a span').text('Buy Now');
//		if(urlValueSplit[6].match('SGH-T999MBATMB')){$('.flagship-cta a').attr("href", "http://www.t-mobile.com/shop/phones/Cell-Phone-Detail.aspx?cell-phone=Samsung-Galaxy-S-III-Pebble-Blue-32GB");}else{
//			$('.flagship-cta a').attr('http://www.t-mobile.com/shop/phones/Cell-Phone-Detail.aspx?cell-phone=Samsung-Galaxy-S-III-Marble-White-32GB');
//		}	
		
//		$(".flagship-cta").delegate("a", "click", function() {
//  			ss_link_click_track_2('','event20,event33','','','overview>t-mobile','o','shop');
//		});
//	}


	//verizon

	if( urlValueSplit[6].match('SCH-I535MBBVZW') || urlValueSplit[6].match('SCH-I535RWBVZW') ){
		$('.flagship-cta a span').text('Pre-order');
		$('.flagship-cta a').attr("href", "http://shop.verizonwireless.com/?id=galaxys3");
		//$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','','','overview>verizon','o','pre-order');");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event33','','','overview>verizon','o','pre-order');
		});
	}

	//at&t


	// if( urlValueSplit[6].match('SGH-I747RWBATT') || urlValueSplit[6].match('SGH-I747MBBATT') ){
	// 	$('.flagship-cta a span').text('Pre-order');
	// 	$('.flagship-cta a').attr("href", "http://www.att.com/galaxysiii/?#fbid=bmgurRVTbiN");
		
	// 	$(".flagship-cta").delegate("a", "click", function() {
 //  			ss_link_click_track_2('','event33','','','overview>at&t','o','pre-order');
	// 	});

	// }
	
	if( urlValueSplit[6].match('SGH-I747ZRBATT') ){
		$('.flagship-cta a span').text('Visit Site');
		$('.flagship-cta a').attr("href", "http://www.att.com/galaxysiii");
		$('.flagship-cta a').attr("target", "_blank");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event33','','','overview>at&t','o','visit-site');
		});

	}


	//us cellular

	if( urlValueSplit[6].match('SCH-R530RWBUSC') || urlValueSplit[6].match('SCH-R530MBBUSC') ){
		$('.flagship-cta a span').text('Pre-order');
		$('.flagship-cta a').attr("href", "http://social.uscellular.com/");
		//$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','','','overview>us cellular','o','pre-order');");
		$(".flagship-cta").delegate("a", "click", function() {
  			ss_link_click_track_2('','event33','','','overview>us cellular','o','pre-order');
		});
	}

if(urlValueSplit[6].match('UN75ES9000FXZA')){
    $('#pbanner').find('p').html('*Includes free 46" TV with Samsung.com purchase. Valid through 2/9/13.');
}
if(urlValueSplit[6].match('PN60E550D1FXZA')){
    $('#pbanner').find('p').html('*Purchase a PN60E550 Plasma TV direct from Samsung and get a BD-E5900 Blu-Ray player at no charge.');
}
if(urlValueSplit[4].match('business')){
    $('#pbanner').css('display','none');
}


	/****** G4 Product Page Updates ******/

		/*ATT
		if( urlValueSplit[6].match('SGH-I337ZKAATT') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.att.com/galaxys4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SGH-I337ZKAATT','','product header','o','pre-order');");
		}
		if( urlValueSplit[6].match('SGH-I337ZWAATT') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.att.com/galaxys4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SGH-I337ZWAATT','','product header','o','pre-order');");
		} */

		/*usc
		if( urlValueSplit[6].match('SCH-R970ZKAUSC') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.uscellular.com/GS4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SCH-R970ZKAUSC','','product header','o','pre-order');");
		}
		if( urlValueSplit[6].match('SCH-R970ZWAUSC') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.uscellular.com/GS4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SCH-R970ZWAUSC','','product header','o','pre-order');");
		}*/

		/*sprint
		if( urlValueSplit[6].match('SPH-L720ZKASPR') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.sprint.com/landings/samsung_galaxy_s4/index.html?ECID=vanity:galaxys4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SPH-L720ZKASPR','','product header','o','pre-order');");
		}
		if( urlValueSplit[6].match('SPH-L720ZWASPR') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "http://www.sprint.com/landings/samsung_galaxy_s4/index.html?ECID=vanity:galaxys4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SPH-L720ZWASPR','','product header','o','pre-order');");
		}*/

		/*tmobile
		if( urlValueSplit[6].match('SGH-M919ZWATMB') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "https://explore.t-mobile.com/samsung-galaxy-s4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SGH-M919ZWATMB','','product header','o','pre-order');");
		}
		if( urlValueSplit[6].match('SGH-M919ZKATMB') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.flagship-cta a').attr("href", "https://explore.t-mobile.com/samsung-galaxy-s4");
			$('.flagship-cta a').attr("target", "_blank");
			$('.flagship-cta a').attr("onclick", "ss_link_click_track_2('','event33','Cell Phones;SGH-M919ZKATMB','','product header','o','pre-order');");
		}*/

		/*hide
		if( urlValueSplit[6].match('SCH-R970ZWAUSC') || urlValueSplit[6].match('SCH-R970ZKAUSC') || urlValueSplit[6].match('SGH-M919ZKATMB') || urlValueSplit[6].match('SGH-M919ZWATMB') || urlValueSplit[6].match('SCH-I545ZKAVZW') || urlValueSplit[6].match('SCH-I545ZWAVZW') ){
			$('.flagship-cta').hide();
		}*/

		//laptop
		if( urlValueSplit[6].match('NP540U4E-K01US') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.ecom-sm-btn span').text('Pre-order');
			$('.ecom-sm-btn span').css("font-size", "10px");
		}
		if( urlValueSplit[6].match('NP680Z5E-X01US') ){
			$('.flagship-cta a span').text('Pre-order');
			$('.ecom-sm-btn span').text('Pre-order');
			$('.ecom-sm-btn span').css("font-size", "10px");
		}
});



$(document).ready(function(){
	//monitor comparison chart modal function
	if(urlValueSplit[4].match('computer') && (urlValueSplit[5].match('monitors') || urlValueSplit[5].match('led'))){

		if(urlValueSplit[5].match('monitors')){
			var $chartmod = $('.row2').find('div[ref=1002195]');
			$chartmod.delegate('a', 'click', function(){
				var modalHeight = $(window).height() - 80;
				chartModal('/us/module/2012-monitor-specs/monitor_specs.html', 980, modalHeight);
			});
		}else{
			var $chartmod = $('.right_module').find('div[ref=1002199]');
			$chartmod.delegate('a', 'click', function(){
				var modalHeight = $(window).height() - 80;
				chartModal('/us/module/2012-monitor-specs/monitor_specs.html', 980, modalHeight);
			});
		}

	}
});

//add tracking to buy clikcs on printers business page
$(document).ready(function(){
	$('#SEMI_PRO_M38_10311 .ecom-sm-btn, #SEMI_PRO_M38_10311 .reg-btn').click(function(){
		var path = location.pathname;
		if( path.indexOf("/business/printers") !== -1){
			$('body').append('<img src="https://134.xg4ken.com/media/redir.php?track=1&token=ef922a6c-0c16-4c08-b7d5-c763b524b1ad&type=Shop_Printers&val=0.0&orderId=&promoCode=&valueCurrency=USD&GCID=&kw=&product=" width="1" height="1">');
		}
	});
});



//features link fix
function product_link_open(url, typeCode)
{
      if(typeCode == 'POPUP'){
            openWindow2(740, 525, url, 1);
      }
      else if(typeCode == 'MOVE'){
            window.location = url;
      }
      else if(typeCode == 'NEW'){
            window.open(url);
      }
      else {
            window.open(url);
      }    
}

$(document).ready(function(){
if(urlValueSplit[6]  == 'RSG309AARS'|| urlValueSplit[6]  == 'RF4289HARS'){
		var flashvars = {};
		var params = {wmode:"opaque"};
		params.wmode = "opaque";
		attributes = {};
		swfobject.embedSWF("/us/flash/product/fridge_lcd_apps/fridgeLCD.swf", "visual2", "400", "400", "10.0.0", flashvars, params, attributes);
	}
});


//hiding view all btn and filter div for blackfriday topic pages
$(document).ready(function(){
if(
urlValueSplit[5]  == 'shop-our-tv-deals'|| urlValueSplit[5]  == 'shop-home-theater-deals?=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-our-monitor-deals' || urlValueSplit[5]  == 'shop-our-monitor-deals?=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-our-camera-deals' || urlValueSplit[5]  == 'shop-our-camera-deals=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-our-camcorder-deals' ||urlValueSplit[5]  == 'shop-our-camcorder-deals?=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-our-blu-ray-deals' || urlValueSplit[5]  == 'shop-our-blu-ray-deals=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-home-theater-deals' || urlValueSplit[5]  == 'shop-home-theater-deals?=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-holiday-smartphones' || urlValueSplit[5]  == 'shop-holiday-smartphones?int_cid=int_black_friday_2011_home' || urlValueSplit[5]  == 'shop-holiday-tabs' || urlValueSplit[5]  == 'shop-holiday-tabs?int_cid=int_black_friday_2011_home' || urlValueSplit[5]  == 'shop-our-printer-deals' || urlValueSplit[5]  == 'shop-our-printer-deals?=int_cid=int_black_friday_2011_all_deals' || urlValueSplit[5]  == 'shop-our-laptop-deals' || urlValueSplit[5]  == 'shop-our-laptop-deals?=int_cid=int_black_friday_2011_all_deals'){

	$('#subnav-content a.reg-btn').hide();
	$('.find-product-box').hide();

	}



});



/* tooltipsy by Brian Cray
 * Lincensed under GPL2 - http://www.gnu.org/licenses/gpl-2.0.html
 * Option quick reference:
 * - alignTo: "element" or "cursor" (Defaults to "element")
 * - offset: Tooltipsy distance from element or mouse cursor, dependent on alignTo setting. Set as array [x, y] (Defaults to [0, -1])
 * - content: HTML or text content of tooltip. Defaults to "" (empty string), which pulls content from target element's title attribute
 * - show: function(event, tooltip) to show the tooltip. Defaults to a show(100) effect
 * - hide: function(event, tooltip) to hide the tooltip. Defaults to a fadeOut(100) effect
 * - delay: A delay in milliseconds before showing a tooltip. Set to 0 for no delay. Defaults to 200
 * - css: object containing CSS properties and values. Defaults to {} to use stylesheet for styles
 * - className: DOM class for styling tooltips with CSS. Defaults to "tooltipsy"
 * - showEvent: Set a custom event to bind the show function. Defaults to mouseenter
 * - hideEvent: Set a custom event to bind the show function. Defaults to mouseleave
 * Method quick reference:
 * - $('element').data('tooltipsy').show(): Force the tooltip to show
 * - $('element').data('tooltipsy').hide(): Force the tooltip to hide
 * - $('element').data('tooltipsy').destroy(): Remove tooltip from DOM
 * More information visit http://tooltipsy.com/
 */
(function(a){a.tooltipsy=function(c,b){this.options=b;this.$el=a(c);this.title=this.$el.attr("title")||"";this.$el.attr("title","");this.random=parseInt(Math.random()*10000);this.ready=false;this.shown=false;this.width=0;this.height=0;this.delaytimer=null;this.$el.data("tooltipsy",this);this.init()};a.tooltipsy.prototype.init=function(){var b=this;b.settings=a.extend({},b.defaults,b.options);b.settings.delay=parseInt(b.settings.delay);if(typeof b.settings.content==="function"){b.readify()}b.$el.bind(b.settings.showEvent,function(c){if(b.settings.delay>0){b.delaytimer=window.setTimeout(function(){b.show(c)},b.settings.delay)}else{b.show(c)}}).bind(b.settings.hideEvent,function(c){window.clearTimeout(b.delaytimer);b.delaytimer=null;b.hide(c)})};a.tooltipsy.prototype.show=function(f){var d=this;if(d.ready===false){d.readify()}if(d.shown===false){if((function(h){var g=0,e;for(e in h){if(h.hasOwnProperty(e)){g++}}return g})(d.settings.css)>0){d.$tip.css(d.settings.css)}d.width=d.$tipsy.outerWidth();d.height=d.$tipsy.outerHeight()}if(d.settings.alignTo==="cursor"&&f){var c=[f.pageX+d.settings.offset[0],f.pageY+d.settings.offset[1]];if(c[0]+d.width>a(window).width()){var b={top:c[1]+"px",right:c[0]+"px",left:"auto"}}else{var b={top:c[1]+"px",left:c[0]+"px",right:"auto"}}}else{var c=[(function(e){if(d.settings.offset[0]<0){return e.left-Math.abs(d.settings.offset[0])-d.width}else{if(d.settings.offset[0]===0){return e.left-((d.width-d.$el.outerWidth())/2)}else{return e.left+d.$el.outerWidth()+d.settings.offset[0]}}})(d.offset(d.$el[0])),(function(e){if(d.settings.offset[1]<0){return e.top-Math.abs(d.settings.offset[1])-d.height}else{if(d.settings.offset[1]===0){return e.top-((d.height-d.$el.outerHeight())/2)}else{return e.top+d.$el.outerHeight()+d.settings.offset[1]}}})(d.offset(d.$el[0]))]}d.$tipsy.css({top:c[1]+"px",left:c[0]+"px"});d.settings.show(f,d.$tipsy.stop(true,true))};a.tooltipsy.prototype.hide=function(c){var b=this;if(c&&c.relatedTarget===b.$tip[0]){b.$tip.bind("mouseleave",function(d){if(d.relatedTarget===b.$el[0]){return}b.settings.hide(d,b.$tipsy.stop(true,true))});return}b.settings.hide(c,b.$tipsy.stop(true,true))};a.tooltipsy.prototype.readify=function(){this.ready=true;this.$tipsy=a('<div id="tooltipsy'+this.random+'" style="position:absolute;z-index:2147483647;display:none">').appendTo("body");this.$tip=a('<div class="'+this.settings.className+'">').appendTo(this.$tipsy);this.$tip.data("rootel",this.$el);var c=this.$el;var b=this.$tip;this.$tip.html(this.settings.content!=""?(typeof this.settings.content=="string"?this.settings.content:this.settings.content(c,b)):this.title)};a.tooltipsy.prototype.offset=function(c){var b=ot=0;if(c.offsetParent){do{if(c.tagName!="BODY"){b+=c.offsetLeft-c.scrollLeft;ot+=c.offsetTop-c.scrollTop}}while(c=c.offsetParent)}return{left:b,top:ot}};a.tooltipsy.prototype.destroy=function(){this.$tispy.remove();a.removeData(this.$el,"tooltipsy")};a.tooltipsy.prototype.defaults={alignTo:"element",offset:[0,-1],content:"",show:function(c,b){b.fadeIn(100)},hide:function(c,b){b.fadeOut(100)},css:{},className:"tooltipsy",delay:200,showEvent:"mouseenter",hideEvent:"mouseleave"};a.fn.tooltipsy=function(b){return this.each(function(){new a.tooltipsy(this,b)})}})(jQuery);

//pop up modal for Galaxy Note partner module
function noteModal(width, height){
$('body').append('<div id="modal_cover" onclick="hide_Modal()" style="margin: 0; width:100%; height:100%; display:block; z-index:2147483602 !important; position:fixed; top: 0; left: 0; background: #000000; opacity: 0.8; filter: alpha(opacity=80);"></div>');
$('body').append('<div id="modal_wrapper" style="width:' + width + 'px; height:' + height + 'px; margin: -' + height / 2 + 'px 0 0 -' + width / 2 + 'px; display:block; z-index: 2147483647 !important; position:fixed; top: 50%; left: 50%; border:solid 5px #0c4da2; border-radius: 8px; background: #ffffff; overflow: hidden;"></div>');
$('#modal_wrapper').append("<div style='padding:30px;'><h1 style='margin: 20px 0; color:#000; font-size: 20px;font-family:PFSquareSansProRegular;'>We&#8217;re Taking You to a Partner Website</h1><p>You are leaving <a style='color:#00a9e0; text-decoration:none;' href='http://www.samsung.com/us/'>Samsung.com.</a> A new page will open a third-party website.</p><p style='margin-top:20px;'><a style='color:#00a9e0; text-decoration:none;'  href='http://www.samsungfulfillment.com' target='_blank'>Continue to the Samsung Partner</a></p></div>");
$('body').append('<a href="javascript:void(0);" class="btn_close_popup" onclick="hide_Modal()" style="margin: -' + (height / 2 + 15) + 'px 0 0 -' + width / 2 + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">cancel</a>');
} 

function chartModal(filePath, width, height){
	$('body').append('<div id="modal_cover" onclick="hide_Modal()" style="margin: 0; width:100%; height:100%; display:block; z-index:2147483602 !important; position:fixed; top: 0; left: 0; background: #000000; opacity: 0.8; filter: alpha(opacity=80);"></div>');
	$('body').append('<div id="modal_wrapper" style="width:' + width + 'px; height:' + height + 'px; margin: -' + height / 2 + 'px 0 0 -' + width / 2 + 'px; display:block; z-index: 2147483647 !important; position:fixed; top: 50%; left: 50%; border:solid 1px black; background: #ffffff; overflow: hidden;"></div>');
	$('#modal_wrapper').load(filePath);
	$('body').append('<a href="javascript:void(0);" class="btn_close_popup" onclick="hide_Modal()" style="margin: -' + (height / 2 + 15) + 'px 0 0 -' + width / 2 + 'px; display:block; z-index:2147483647; position:fixed; top: 50%; left: 50%; color: #FFFFFF;">close layer</a>');
}


function hide_Modal(){
$("#modal_wrapper").remove();
$(".btn_close_popup").remove();
$("#modal_cover").remove();
} 
	
