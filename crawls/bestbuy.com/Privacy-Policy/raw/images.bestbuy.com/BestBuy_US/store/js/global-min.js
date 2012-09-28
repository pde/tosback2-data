if(typeof globalJSIncluded == "undefined") {
/* Needed to display ads on 3rd Party Sites. Used with Header/Footer Broker. */
var bbyAds;

/**
 * Configuration for 'AddThis' sharing platform.
 */
var addthis_config = {
  services_exclude : "facebook"
}

/* Browser Compatibility Messaging */
var bbyBrowsers = true; /* Set to false to supress browser compatibility messaging. */

/* look at me i'm a html5 audio */
var html5audio = {
	init:function(){
		if(templateName == 'PDMU'){
			if (!!document.createElement('audio').play) {
				var theaudio = document.createElement('audio');
				var mp3 = !!theaudio.canPlayType && "" != theaudio.canPlayType('audio/mpeg');
				if(mp3 == true){
					window.addEventListener('load',function() {
					var tracklistings = $("audio");

					$.each(tracklistings, function(index, value) {

							value.removeAttribute('controls');

							var play = document.createElement('img');
							play.src="http://images.bestbuy.com/BestBuy_US/store/images/global/buttons/play_btn.png";
							play.setAttribute("class","playbtn");

							var timebar = document.createElement('input');
							timebar.setAttribute("class", "timebar");
							timebar.setAttribute("type", "range");
							timebar.setAttribute("step", "any");
							timebar.value = 0;
							timebar.min = value.startTime;
							timebar.max = value.startTime + value.duration;

							$(this).parent().prepend(play);
							value.parentNode.appendChild(timebar);

							play.addEventListener('click',function(e){
								if(value.paused){
									value.play();
									this.src="http://images.bestbuy.com/BestBuy_US/store/images/global/buttons/pause_btn.png";
								}else{
									if(value.ended){
										this.src="http://images.bestbuy.com/BestBuy_US/store/images/global/buttons/play_btn.png";
									}else{
										this.src="http://images.bestbuy.com/BestBuy_US/store/images/global/buttons/play_btn.png";
										value.pause();
									}

								}
							},true);


							value.addEventListener('timeupdate',function(e){
								var prog = (this.currentTime / this.duration) * 100;
								var thebar = $(this).next().next('input');
								thebar.css({'width' : prog * 3.85});
							}, true);

							value.addEventListener('play', function(e){
									$(this).siblings('.timebar').css({'height': '7px', 'margin-bottom' : '10px', 'margin-top' : '10px'});
							},true);

							value.addEventListener('pause', function(e){
								if(value.ended){
									value.play();
								}
							},true);

							value.addEventListener('ended', function(e){
								$(this).siblings('.playbtn').attr("src", "http://images.bestbuy.com/BestBuy_US/store/images/global/buttons/play_btn.png");
								$(this).siblings('.timebar').css({'height': '0px', 'margin-bottom' : '0px', 'margin-top' : '0px'});
							},true);

						});
					}, true);
				}else{
					window.addEventListener('load',function(e) {
						var tracklistings = $(".listen");
						$.each(tracklistings, function(index, value) {
							$(this).parent('audio').after(value);
						});
					},true)
				}
			}else{
				if (window.addEventListener){
					window.addEventListener('load',function(e) {
						var tracklistings = $(".listen");
						$.each(tracklistings, function(index, value) {
							$(this).parent('audio').after(value);
						});
					},true)
				}else{
					window.attachEvent('onload',function(e) {
						var tracklistings = $(".listen");
						$.each(tracklistings, function(index, value) {
							$(this).parent('audio').after(value);
						});
					},true)
				}
			}
		}
	}
}

/* old code from OLS JavaScripts. */
function displayImg(imagename, height, width, alttag, align){
	var outString = '<img src="' + imgServer;

	if (imagename){
		if (imagename){
			outString = outString + imagename + '"';
		}
		if (height){
			outString = outString + ' height=' + height;
		}
		if (width){
			outString = outString + ' width=' + width;
		}
		outString = outString + ' border=0';
		if (alttag){
			outString = outString + ' alt="' + alttag + '"';
		}
		if (align){
			outString = outString + ' align="' + align + '"';
		}
		outString = outString + '>';
		document.write(outString);
	}
	else{
	}
}

function logout()
{
    document.logoutForm.submit();
}


/* JCarousel Lite - Could eventually go in a category.js file. */
(function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:200,easing:null,vertical:false,circular:true,visible:3,start:0,scroll:1,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var b=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var c=$(this),ul=$("ul",c),tLi=$("li",ul),tl=tLi.size(),v=o.visible;if(o.circular){ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone());o.start+=v}var f=$("li",ul),itemLength=f.size(),curr=o.start;c.css("visibility","visible");f.css({"overflow":"hidden","float":o.vertical?"none":"left"});ul.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});c.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var g=o.vertical?height(f):width(f);var h=g*itemLength;var j=g*v;f.css({width:f.width(),height:f.height()});ul.css(sizeCss,h+"px").css(animCss,-(curr*g));c.css(sizeCss,j+"px");if(o.btnPrev)$(o.btnPrev).click(function(){return go(curr-o.scroll)});if(o.btnNext)$(o.btnNext).click(function(){return go(curr+o.scroll)});if(o.btnGo)$.each(o.btnGo,function(i,a){$(a).click(function(){return go(o.circular?o.visible+i:i)})});if(o.mouseWheel&&c.mousewheel)c.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)});if(o.auto)setInterval(function(){go(curr+o.scroll)},o.auto+o.speed);function vis(){return f.slice(curr).slice(0,v)};function go(a){if(!b){if(o.beforeStart)o.beforeStart.call(this,vis());if(o.circular){if(a<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*g)+"px");curr=a==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else if(a>=itemLength-v+1){ul.css(animCss,-((v)*g)+"px");curr=a==itemLength-v+1?v+1:v+o.scroll}else curr=a}else{if(a<0||a>itemLength-v)return;else curr=a}b=true;ul.animate(animCss=="left"?{left:-(curr*g)}:{top:-(curr*g)},o.speed,o.easing,function(){if(o.afterEnd)o.afterEnd.call(this,vis());b=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(a,b){return parseInt($.css(a[0],b))||0};function width(a){return a[0].offsetWidth+css(a,'marginLeft')+css(a,'marginRight')};function height(a){return a[0].offsetHeight+css(a,'marginTop')+css(a,'marginBottom')}})(jQuery);

/*************************************************************************************************************
* old busops.js
*********************************************************************************************************** */

//@build.date@
//var __busopsBuildNumber = "@build.number@";
function popNew(){
	/* url,width,height,features */
	if (arguments[1] == "kiosk") {
		if (bbyUrl.indexOf("kiosk") >= 0) { /* In Kiosk... */
			var newWindow = window.open(arguments[0], "BestBuy", 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=825,height=525');
			newWindow.focus();
			return false;
		}
		else { /* Not in Kiosk... */
			var newWindow = window.open(arguments[0], '_blank');
			newWindow.focus();
			return false;
		}
	}
	else {
		if (!(arguments[1])){
			width = 800;
		}
		if (!(arguments[2])){
			height = 600;
		}
		if (!(arguments[3])){
			   features = "width=" + arguments[1] + ",height=" + arguments[2] + ",toolbar=0,location=0,directories=0,statusbar=0,menubar=0,scrollbars=1,resizable=1";
		}
		else {
			   features = "width=" + arguments[1] + ",height=" + arguments[2] + "," + arguments[3];
		}
		var newWindow = window.open(arguments[0], "BestBuy", features);
		newWindow.focus();
		return false;
	}
}

/* @deprecated */

// function searchlink(link)
// {
	// return;
// }

/**
* Query String parsers
*/

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {var pair = vars[i].split("=");if (pair[0] == variable) {return pair[1];}}
}

/*
function getQV(variable,string) {
    var str = string.replace('?','&'); query = str.substring(1); var vars = query.split("&");
	for (var i=0;i<vars.length;i++)	{ var pair = vars[i].split("="); if (pair[0] == variable){ return pair[1]; } }
}
*/

/**
* KioskSwitch
*/
function switchKiosk(rootname) {
	var reg_asset = rootname + '_reg';
	var kiosk_asset = rootname + '_kiosk';
	if (bbyUrl.indexOf("kiosk") >= 0) {
		document.getElementById(reg_asset).style.display='none';
		document.getElementById(kiosk_asset).style.display='block';
	}
}

/**
*	function getCookie()
*	takes name argument
*	returns cookie value
*	jm 2006/09/06
*/

function readCookie(name) {
	var cookieName = name + "=";
	var cookieArray = document.cookie.split(';');
	for(var i=0;i < cookieArray.length;i++) {
		var c = cookieArray[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(cookieName) == 0) return unescape(c.substring(cookieName.length,c.length));
	}
	return null;
}

function setCookie(c_name, value, expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	";path=/;domain=.bestbuy.com"+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

/* Fix for duplicate code */
GetCookie = readCookie;

/**
* takes function call
* delays execution until full page load
* dwl 2006/09/28
*/

function addOnloadEvent(fnc){
  if ( typeof window.addEventListener != "undefined" )
    window.addEventListener( "load", fnc, false );
  else if ( typeof window.attachEvent != "undefined" ) {
    window.attachEvent( "onload", fnc );
  }
  else {
    if ( window.onload != null ) {
      var oldOnload = window.onload;
      window.onload = function ( e ) {
        oldOnload( e );
        window[fnc]();
      };
    }
    else
      window.onload = fnc;
  }
}

/**
* test for https:
* return true for secure
* false for standard http
* jm 2006/10/24
*/

/*
function getProtocol(){
	return secChannel;
}
*/

/**
* PB Mods by EMB
* Updated on 20080322
*/

/*
function getPosiLeft(This){
	var el = This;var pL = 0;
	while(el){pL+=el.offsetLeft;el=el.offsetParent;}
	return pL;
}

function getPosiTop(This){
	var el = This;var pT = 0;
	while(el){pT+=el.offsetTop;el=el.offsetParent;}
	return pT;
}

function pbpop(el,obj){
var gpl = getPosiLeft(obj);
var lp = (-300 + gpl) > 0 ? (-300 + gpl) : (150 + gpl);
el.style.left = lp + "px";
el.style.top =  -100 + getPosiTop(obj) + "px";
el.style.display = 'block';
}
*/


// function getSkuArr(s){
	// var isSku = false;
	// var skArr = [8753716,8747804,8742818,8784103,8783578,8742621];

	// for(i=0,len=skArr.length;i<len;i++){
		// if(skArr[i]==s){
			// isSku = true; break;
		// }
	// }
	// return isSku;
// }

function addCommas(s){
	x = s.split('.');x1 = x[0];x2 = x.length > 1 ? '.' + x[1] : '';var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {x1 = x1.replace(rgx, '$1' + ',' + '$2');}
	return x1 + x2;
}

/*
function calcSavings(rp,cp){
	var savings = rp-parseFloat(cp.replace(/,/g,""));
	return savings.toFixed(2);
}
*/


// function getRegPrice(o){
	// var rp = 'none'; var divArr = o.getElementsByTagName('div');
	// for(var i=0,len=divArr.length;i<len;i++){if(divArr[i].className=='oc_rp'){rp = divArr[i].innerHTML;break;}}
	// rp = rp.charAt(0) == '$' ? rp.replace('$','') : rp ;  rp = isNaN(parseFloat(rp)) ? 'none' : rp ;
	// return rp;
// }

// function getCurrPrice(o){
	// var cp = 'sale'; var pbStr = o.innerHTML;
	// if(pbStr.indexOf('Sale')!=-1){ return cp; }
	// else{ var s = pbStr.indexOf('$')+1; var e = pbStr.substring(s,s+10).indexOf('<')+s; cp = pbStr.substring(s,e); }
	// return cp;
// }


/* FUNCTION (utility):		loadjscssfile
 *
 * dynamically load js and css (primarily for dev/fixes prior to proper deployment)
 * note: when using to load css, bear in mind that while this will place your link
 * in the head of the document, it will only do so when the caller executes, i.e.,
 * call this before the respecitve html hits the page. Otherwise, your html will render first
 * and THEN your css will apply.
 *
 * @filename	str		req		file path and name to be loaded
 * @filetype	str		req		type of file, either css or js
 */
function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined"){
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}
}


/***********************
* ABN javascript
* carousel js and dependencies
**************************/
/**
* global function ala prototype lib
*/
/* */

/*
function $$(name){
	return document.getElementById(name);
}

Function.prototype.bind = function(obj) {
	var method = this,
		temp = function() {
			return method.apply(obj, arguments);
		};
	return temp;
};
*/

/**
* instanciate global BBY js object
*/
/* */
BBY = {};
/*
BBY.util = {};
BBY.util.prototype = {
	setDisplay:function(obj, state){
		obj.style.display = state;
	},

	setStyleAtts:function(domnode, styleatt, value){
		domnode.style[styleatt] = value + 'px';
	},

	getStyleAtts:function(domnode, styleatt){
		return domnode.style[styleatt];
	},

	changeOpacity:function(theobj, opac){
		var obj = theobj.style;
		obj.opacity = (opac / 100);
		obj.MozOpacity = (opac / 100);
		obj.KhtmlOpacity = (opac / 100);
		obj.filter = "alpha(opacity=" + opac + ")";
	},
	findPosition:function(theobject){
		var curleft = curtop = 0;
		if (theobject.offsetParent) {
			curleft = theobject.offsetLeft;
			curtop = theobject.offsetTop;
			firstparent = true;
			while (theobject = theobject.offsetParent) {
				if (firstparent){
					curleft += theobject.offsetLeft;
					firstparent = false;
				}
				curtop += theobject.offsetTop;
			}
		}
		return [curleft,curtop];
	},

	findHeightWidth:function(theobject){
		var theheight = theobject.offsetHeight;
		var thewidth = theobject.offsetWidth;
		return[theheight, thewidth];
	}
};
*/

/**
* event handling object and methods
* usage: BBY.util.Event.addListener(document, "mouseover", this);
*/
/* */
/*
BBY.util.Event = {};
BBY.util.Event.prototype = {
	addListener:function(obj, eventName, listener){
		if (obj.attachEvent){
			obj.attachEvent("on"+eventName, listener);
		}else if(obj.addEventListener){
			obj.addEventListener(eventName, listener, false);
		}else{
			return false;
		}
		return true;
	},

	removeListener:function(obj, eventName, listener){
		if(obj.detachEvent){
			obj.detachEvent("on"+eventName, listener);
		}else if(obj.removeEventListener){
			obj.removeEventListener(eventName, listener, false);
		}else{
			return false;
		}
		return true;
	}
};
*/
/**
* set dhtml namespace
*/
BBY.dhtml = {
	carousels: -1,
	forwardbutton: [],
	backbutton: [],
	visible: [],
	contentframe: [],
	Carousel: function(args){
		BBY.dhtml.carousels++;
		BBY.dhtml.forwardbutton[BBY.dhtml.carousels] = "#" + args.forwardbutton;
		BBY.dhtml.backbutton[BBY.dhtml.carousels] = "#" + args.backbutton;
		BBY.dhtml.visible[BBY.dhtml.carousels] = args.visible;
		BBY.dhtml.contentframe[BBY.dhtml.carousels] = "#" + args.contentframe;
	}
};
/**
* BBY tween lib
*/
/* BBY.dhtml.Tween = {}; */
/* */
/*
BBY.dhtml.Tween.prototype = {

	easing:function(start, end, numsteps, currentstep, pvalue) {
		var delta = end - start;
		var step = start + (Math.pow(((1 / numsteps) * currentstep), pvalue) * delta);
		return Math.ceil(step);
	},

	bounce:function(start, end, numsteps, currentstep){
		var delta = end - start;
		if ((currentstep/=numsteps) < (1/2.75)) {
			return delta*(7.5625*currentstep*currentstep) + start;
		} else if (currentstep < (2/2.75)) {
			return delta*(7.5625*(currentstep-=(1.5/2.75))*currentstep + .75) + start;
		} else if (currentstep < (2.5/2.75)) {
			return delta*(7.5625*(currentstep-=(2.25/2.75))*currentstep + .9375) + start;
		} else {
			return delta*(7.5625*(currentstep-=(2.625/2.75))*currentstep + .984375) + start;
		}
	},

	back:function(start, end, numsteps, currentstep, over){
		var delta = end - start;
		if (typeof over == 'undefined') over = 1.70158;
		return delta*((currentstep=currentstep/numsteps-1)*currentstep*((over+1)*currentstep + over) + 1) + start;
	}
};
*/

/**
* Generic animation object
* used by various dhtml objects
* dependency: Tween library
*/
/* */
/*
BBY.dhtml.Animation = function(args){
	this.init(args);
};

BBY.dhtml.Animation.prototype = {
	init:function(args){
		this.now = new Date().getTime();
		this.framerate = args.framerate;
		this.seconds = args.seconds;
		this.end = this.now + this.seconds;
		this.domelement = args.domelement;
		this.duration = Math.round(this.end - this.now);
		this.totalframes = Math.round(this.duration / this.framerate);
		this.startpoint = args.from;
		this.endpoint = args.to;
		this.method = args.method;
		this.animation;
		this.currentframe = 0;
	},

	animate:function(action){
		this.action = action;
		this.animation = setInterval(this[this.action].bind(this), this.framerate);
	},

	play:function(){
		this.currentframe++;
		this.towidth = BBY.dhtml.Tween.prototype[this.method](this.startpoint, this.endpoint, this.totalframes, this.currentframe, 3);

		BBY.util.prototype.setStyleAtts(this.domelement, "height", this.towidth);

		if(this.currentframe >= this.totalframes){
			this.stop();
		}
	},

	rewind:function(){
		this.currentframe++;
		this.fromwidth = BBY.dhtml.Tween.prototype[this.method](this.endpoint, this.startpoint, this.totalframes, this.currentframe, 1);
		BBY.util.prototype.setStyleAtts(this.domelement, "height", this.fromwidth);
		if(this.currentframe >= this.totalframes){
			this.stop();
		}
	},
	stop:function(){
		clearInterval(this.animation);
		this.currentframe = 0;
	}
}; */

/**
* PDPSlider object for PDP redesign
* usage: BBY.dhtml.PDPSlider({triggerelement:"prodshow",animated:"featurebullets",content:"featurebulletsinner",method:"easing"});
*/
/* */

BBY.dhtml.PDPSlider = function(args){
	$("#" + args.triggerelement).click(function(){
		$("#" + args.animated).css("height", "auto");
	});
	/*
	this.trigger = $$(""+args.triggerelement+"");
	this.animated = $$(""+args.animated+"");
	this.contentheight = parseInt($$(""+args.content+"").offsetHeight);
	this.method = args.method;
	this.isOpen = false;
	this.openslider = new BBY.dhtml.Animation({domelement:this.animated, framerate:50, seconds:300, to:this.contentheight, from:1, method:this.method});
	this.closeslider = new BBY.dhtml.Animation({domelement:this.animated, framerate:50, seconds:300, to:this.contentheight, from:1, method:this.method});
	BBY.util.Event.prototype.addListener(this.trigger, "click", this.animate.bind(this));
	*/
};
/*
BBY.dhtml.PDPSlider.prototype = {
	animate:function(){
		if(this.isOpen){
			this.closeslider.animate("rewind");
			this.isOpen = false;
			return false;
		}else{
			this.openslider.animate("play");
			this.isOpen = true;
			return false;
		}
	}
};
*/

/**
* Carousel javascript for ABN
* usage: BBY.dhtml.Carousel({visible:3,increment:3,contentframe:"contentframeid",content:"contentid",backbutton:"backbuttonid",forwardbutton:"forwardbuttonid"});
*/

/*
BBY.dhtml.Carousel = function(args){
	this.visibleElements = args.visible;
	this.incrementNum = args.increment;
	this.contentFrame = $$(""+args.contentframe+"");
	this.prevButton = $$(""+args.backbutton+"");
	this.nextButton = $$(""+args.forwardbutton+"");
	this.carouselContent = args.content;
	this.isRunning = false;
	this.init();
};

BBY.dhtml.Carousel.prototype = {
	init:function(){
		//set inital index to 0
		this.currentIndex = 0;
		//set initial scroll increment width to 0
		this.scrollIncrement = 0;
		//set the current increment value to 0
		this.incrementValue = 0;
		// total number of cols
		this.cols = $$(""+this.carouselContent+"").getElementsByTagName("li");
		this.checkDisable();

		BBY.util.Event.prototype.addListener(this.prevButton, "click", this.getPrev.bind(this));
		BBY.util.Event.prototype.addListener(this.nextButton, "click", this.getNext.bind(this));
	},

	getPrev:function(){
		//width of the cols
		this.width = this.cols[0].offsetWidth;

		if((this.currentIndex - this.incrementNum) <= 0){
			this.currentIndex = 0;
		}else{
			//decrement the index
			this.currentIndex = parseInt(this.currentIndex - (this.currentIndex - this.incrementNum));
		}

		this.scrollIncrement = parseInt(this.currentIndex * this.width);

		//set interval for scrollNext function
		if(this.isRunning == true)return;

		this.inter = setInterval(this.scrollPrev.bind(this), 10);
		this.isRunning = true;
	},

	getNext:function(){

		//width of the cols
		this.width = this.cols[0].offsetWidth;

		//increment the index by the increment number
		this.currentIndex = parseInt((this.currentIndex + this.incrementNum));

		if((this.currentIndex + this.visibleElements) >= this.cols.length){
			this.currentIndex = this.currentIndex - ((this.currentIndex + this.visibleElements) - this.cols.length);
		}

		this.scrollIncrement = parseInt(this.currentIndex * this.width);

		//set interval for scrollNext function
		if(this.isRunning == true)return;

		this.inter = setInterval(this.scrollNext.bind(this), 10);
		this.isRunning = true;
	},

	scrollNext:function(){
		if(this.incrementValue > -(this.scrollIncrement)){
			this.incrementValue = this.incrementValue - 15;
			this.contentFrame.style.left = this.incrementValue + 'px';
		}else{
			clearInterval(this.inter);
			this.checkDisable();
			this.isRunning = false;

		}
	},

	scrollPrev:function(){
		if(this.incrementValue < -(this.scrollIncrement)){
			this.incrementValue = this.incrementValue + 15;
			this.contentFrame.style.left = this.incrementValue + 'px';
		}else{
			clearInterval(this.inter);
			this.checkDisable();
			this.isRunning = false;

		}
	},

	checkDisable:function(){
		var back = ((this.currentIndex == 0)) ? BBY.util.prototype.changeOpacity(this.prevButton, 40) : BBY.util.prototype.changeOpacity(this.prevButton, 100);
		var fwd = ((this.currentIndex + this.visibleElements) >= this.cols.length) ? BBY.util.prototype.changeOpacity(this.nextButton, 40) : BBY.util.prototype.changeOpacity(this.nextButton, 100);
	}
};
*/
/**
*	function abnchangeTab()
*	takes tabnum and numberoftabs argument
*	changes style of active and inactive tabs and displays content of active tab
*	md 2007/11/26
*/

/*
function abnchangeTab(tabnum, numberoftabs) {
	var i = 1;
	var hidetab = "";
	var hidecontent = "";
	for (var i = 1; i <= numberoftabs; i++) {
		hidetab = "abntab" + i;
		hidecontent = "abntabcontent" + i;
		document.getElementById(hidetab).className="";
		document.getElementById(hidecontent).style.display="none";
	}
	var activetab = "abntab"+tabnum;
	document.getElementById(activetab).className="active";
	var activetabcontent = "abntabcontent"+tabnum;
	document.getElementById(activetabcontent).style.display="block";
}
*/

/********************************
* legacy broadgroup rollover js *
********************************/
/*
var currentObj;
var popOverStyle;

function initTooltipRollovers(){
	for(var i = 0; i<arguments.length; i++){
		document.getElementById(""+arguments[i]+"").description = document.getElementById(""+arguments[i]+"_text");
		document.getElementById(""+arguments[i]+"").onmouseover = displayData;
	}
}

function setTooltipStyle(poStyleName){
	this.popOverStyle = poStyleName;
}
function displayData(e){
	if(currentObj == null){
		setOffset(e, this, this.description);
		setDisplay(this.description, "block");
		currentObj = this.description;
		this.description.onmouseout = hideDisplay;
		this.onmouseout = hidePopOver;
	}else{
		setDisplay(currentObj, "none");
		setOffset(e, this, this.description);
		setDisplay(this.description, "block");
		currentObj = this.description;
		this.description.onmouseout = hideDisplay;
		this.onmouseout = hidePopOver;
	}
}
function setOffset(e, imgObj, descr){
	var pos = BBY.util.prototype.findPosition(imgObj);
	var size = BBY.util.prototype.findHeightWidth(imgObj);

	descr.style.left = ((pos[0]) + (size[1]*.50)) + 'px';
	descr.style.top = ((pos[1]) + (size[0]*.50)) + 'px';
	descr.className = popOverStyle;
}
function hideDisplay(e){
	if (!e) var e = window.event;
	var tg = (window.event) ? e.srcElement : e.target;
	var classname = (window.event) ? "className" : "class";
	if (tg.getAttribute(classname) != 'broadgroupcontentbox') return;

	var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;

	while (reltg.getAttribute(classname) != tg.getAttribute(classname) && reltg.nodeName != 'BODY')
		reltg = reltg.parentNode;

	if (reltg == tg) return;

	this.style.display = "none";
}
function hidePopOver(e){
	if (!e) var e = window.event;
	var goingto = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	var comingfrom = (e.relatedTarget) ? e.relatedTarget : e.fromElement;

	if((goingto.nodeName == 'TD')||(goingto.nodeName == 'IMG')){
		this.description.style.display = "none";
	}

}
function setDisplay(obj, state){
	obj.style.display = state;
}
*/

/**************************************************
* tmp fix for abn pages without olspopupmaster.js *
**************************************************/
function vehicleFitGuidePopup(catID, parentUrl){
	if(parentUrl.indexOf('type=product')!=-1){
		fitGuideURL = 'olspage.jsp?id='+trim(catID)+'&isPDP=true&type=page&parentURL='+escape(parentUrl);
    }else{
		fitGuideURL = 'olspage.jsp?id='+trim(catID)+'&type=page&parentURL='+escape(parentUrl);
    }
    popUp(fitGuideURL,'FitGuide','4','0');
}
/*****************************************************
* propreitary JS for game/ game guide download boxen *
*****************************************************/
function dlbox(){
	if (typeof dlURL != "undefined"){
		var repositiondiv = document.getElementById("downloadwidget");
		var content = document.getElementById("downloadcontent");
		var dlhref = dltitle;
		dlhref = dlhref + "<br/><a href=\"javascript:popUpRawURL('"+ dlURL +"','','6','1');\" name=\"&lid=digitaldownload\">";
		dlhref = dlhref + '<img src="'+imgServer+'/en_US/images/global/buttons/btn_download_pdp.gif" width="113" height="27" alt="download this software" class="dlbutton" border="0"/>';
		dlhref = dlhref + '<\/a>';
		content.innerHTML = dlhref;
		repositiondiv.style.display = "block";
	}

	if (typeof ggURL != "undefined"){
		var ggdiv = document.getElementById("gameguidewidget");
		var ggcontent = document.getElementById("ggdownloadcontent");
		var gghref = ggTitle;
		gghref = gghref + "<br/><a href=\"#\" onclick=\"javascript:window.open('"+ ggURL +"','','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=915,height=675,left=50,top=200');\" name=\"&lid=digitaldownload\">";
		gghref = gghref + '<img src="'+imgServer+'/en_US/images/global/buttons/btn_download_pdp.gif" width="113" height="27" alt="download this software" class="dlbutton" border="0"/>';
		gghref = gghref + '<\/a>';
		ggcontent.innerHTML = gghref;
		ggdiv.style.display = "block";
	}
}
/*****************************************************
* Footer nav *
*****************************************************/

/* Old code in the actual HTML */
/*
var quickNav = document.getElementById("quickNav");
				var quickNavA = document.getElementById("quickNav").getElementsByTagName("a");
				var quickNavNew = '';
				for (var i=0;i<quickNavA.length;i++){
					quickNavNew = quickNavNew + '<option value="' + quickNavA[i].href + '">' + quickNavA[i].innerHTML + '</option>';
				}
				quickNav.innerHTML = '<form action="/" method="get"><select name="quicknav" onchange="doQuickNav(this.options[this.selectedIndex].value)"><option value="">More Best Buy Sites</option>' + quickNavNew + '</select></form>';
*/

/*
function doQuickNav(url) {
	var bbfb = "http://www.bestbuybusiness.com/bbfb/en/US/adirect/bestbuy?cmd=LogoutDisplay&AMP;ckimode=true&amp;storeid=";
	if (url != "") {
		if (bbyUrl.indexOf("kiosk") >= 0) {
			if((bbyUrl.indexOf("kiosk") >= 0) && url == "http://www.bestbuybusiness.com/"){
				var cookieStoreId = readCookie("storeNumber");
				popUpRawURL(bbfb+cookieStoreId,'morebbysites','6','1');
			}else{
				popUpRawURL(url,'morebbysites','6','1');
			}
		}else {
			//Close survey window for cross vertical shopper leaving site. - 03/27/2006
			try {
				closeTrackerWin();
			}
			catch(e){}
			location.href=url;
		}
	}
}
*/


/*********************************************
* Tophat *
/*********************************************/
function topHatPop(url,width,height) {
	window.open(url, 'twindow', 'toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width='+width+',height='+height);
}
/**
* PDP 360 popups
*/
function pop360(sku) {
	url = imgServer + "en_US/images/global/360/360pop.html?sku="+ sku;
	features = "location=0,statusbar=0,menubar=0,width=475,height=450";
	target = "_blank";
	var theWindow = window.open(url, target, features);
	theWindow.focus();
}

function _hbSet(a,b,c){return;}function _hbSend(a,b,c){return;}function _hbLink(a,b,c){return;}function _hbDownload(a,b,c){return;}

// function _hbOverload()
// {
	// if (typeof(_hbSet) == 'undefined')
	// {
		// window._hbSet = function() { return; }
	// }

	// if (typeof(_hbSend) == 'undefined')
	// {
		// window._hbSend = function() { return; }
	// }
// }

// addOnloadEvent(_hbOverload);


/*************************************************************************************************************
* old header.js
*********************************************************************************************************** */

$(document).ready(function() {
	//$('#st').attr('value', 'Search by Keyword, SKU # or Item #');
	$('#sitesearch form').submit(function() {
		var re = /^ +$/;
		if ((re.test($('#st').attr('value'))) || ($('#st').attr('value') == '') || ($('#st').attr('value') == '%') || ($('#st').attr('value') == 'Search by Keyword, SKU # or Item #')) {
			alert('Please enter keyword(s) or item number and try again.');
			return false;
		}
	});
	$('#st').focus(function(){
		if ($(this).val() == 'Search by Keyword, SKU # or Item #') {
			$(this).val('');
		}
	});
	$('#st').blur(function(){
		if ($(this).val() == '') {
			$(this).val('Search by Keyword, SKU # or Item #');
		}
	});

    $("#notificationPanel .notification div.closeWidget").each(
    function() {
        $(this).click(function() {
          jQuery(this.parentNode.parentNode.parentNode).fadeOut();
      });
    });


		$("#b52.b52").click(function(){
			var link = $("#b52 a:first");
			var url = link.attr("href");
			if ((url == "#") || (url == undefined)) {
				return false;
			}
			else {
				try {
					var x = link.attr("name");
					x = x.substring(x.indexOf("=") + 1, x.length);
					if (typeof(track.catId) !== "undefined") {
						x = track.catId + ": " + x;
					}
					if (typeof(track.parentCatId) !== "undefined") {
						x = track.parentCatId + ": " + x;
					}
					if (typeof(track.uberCatId) !== "undefined") {
						x = track.uberCatId + ": " + x;
					}
					trackEvent.event('event.link',{lid: x});
				}
				catch(err) {}

				var target = link.attr('target');
				if (typeof(target) == 'undefined' || target == null || target.length == 0) {
					window.location.replace(url);
				} else {
					window.open(url, target);
				}

				/*
				*	Call the click handler directly. We don't want to trigger the click event
				*	because that will cause an infinite recursion.
				*/
				var f = link.attr('onclick');
				if (typeof(f) == 'function') f();
			}
		});
		/*
		if ($("#featured-brand-carousel").length > 0) {
			$("#featured-brand-carousel").jCarouselLite({
				btnNext: bby_carousel_forwardbutton,
				btnPrev: bby_carousel_backbutton,
				visible: bby_carousel_visible
			});
		}*/
		for (i = 0;i <= BBY.dhtml.carousels;i++) {
			$(BBY.dhtml.contentframe[i]).jCarouselLite({
				btnNext: BBY.dhtml.forwardbutton[i],
				btnPrev: BBY.dhtml.backbutton[i],
				visible: BBY.dhtml.visible[i]
			});
		}

	/* DARTHeaderCollapse
	 * collapse the leader board ad space if no DART object exists or if no ad is filled
	 * we check for a number of cases since DART delivers something different to preview than it does to prod
	 */
	
	if(typeof(DART) == 'undefined' || $('#dart-container-728x90').length == 0 || $('#dart-container-728x90 iframe, #dart-container-728x90 div, #dart-container-728x90 a, #dart-container-728x90 img').length == 0){
		$("#hdr-ad").hide();
	}

	// Old dart code not needed in Site Widening
	/*
		if (((bbyUrl =="http://www.qa.bestbuy.com/site/olspage.jsp?") || (bbyUrl =="http://dldolsapp01.na.bestbuy.com:22401/site/olspage.jsp?") || (bbyUrl == "http://www.bestbuy.com/site/olspage.jsp?") || (bbyUrl == "http://preview.bestbuy.com/site/olspage.jsp?")) && (typeof(strCat) != "undefined") && (imgServer != "http://espanol.bestbuy.com/enes/sdimages/BestBuy_US/")){
			try {
				if ((catid == "cat02015") || (catid == "cat02001") || (strCat == "abcat0100000") || (strCat == "abcat0200000") || (strCat == "abcat0300000") || (strCat == "abcat0400000") || (strCat == "abcat0500000") || (strCat == "abcat0600000") || (strCat == "abcat0700000") || (strCat == "abcat0800000") || (strCat == "abcat0900000")) {
				}
			} catch (e) {}
			try {
				if (typeof(skuId) != "undefined"){
					document.getElementById("dart-container-728x90").style.height = "100px";
				}
			} catch(e) {}
		}
	*/

	/* Fixes the Go button. */
	//$("#nav li:hover ul").css("border", "1px solid red");
	//$("#gobutton input").attr("src", imgServer + "en_US/images/global/header/go.gif");
	/* Load tabs for PDP. */
	if(typeof(skuId) != "undefined"){
		try {loadTabUI();}
		catch(e){}
	}
	/* Sets Kiosk. */
	/*
	var isKiosk = false;
	if (window.location.href.indexOf("kiosk") >= 0) {isKiosk = true;}
	*/
	/* Set up the main Navigation. */
	/*
	try {
		if (templateName == "GHP"){
			$("#b52").css({'display' : 'none'});
		}
	}
	catch(e){}
	*/
	Nav.init();

	/* Tracking for Global Elements */
	$("#hdr-top a").click(function(){
		trackEvent.event('event.cache',{lid: $(this).attr("data-lid")});
	});
	$("#nav a").click(function(){
		trackEvent.event('event.cache',{lid: $(this).attr("data-lid")});
	});
	$("#ftr a").click(function(){
		trackEvent.event('event.cache',{lid: $(this).attr("data-lid")});
	});

	/* Create the footer nav for More Best Buy Sites */
	var quicknav = "";
	$("#quickNav li a").each(function(){
		quicknav += '<option value="' + $(this).attr("href") + '">' + $(this).text() + '</option>';
	});
	$("#quickNav").html('<form action="/" method="get"><select><option value="">More Best Buy Sites</option>' + quicknav + '</select></form>');
	$("#quickNav select").change(function() {
		if ($(this).val() != "") {
			try {
				closeTrackerWin();
			}
			catch(e){}
			location.href = $(this).val();
		}
	});

        /******
         * colorbox activation code 2011.05.13
         * regisering configs in onready to allow inline scripts to take precidence.
         */

         modalManager.registerProfile('fsdiCreditApp', {width: '785px', height:'750px', title:"Best Buy Reward Zone Credit Card Application", rootClass:'fsdiCreditApp', scrolling:true, overlayClose:false, escKey:false, extendDefault:true});

         modalManager.registerProfile('bbyonModal', {width:'952px', height:'430px', title:"Best Buy On", extendDefault:true});
         modalManager.registerProfile('bbyonPanelLB', {iframe:false, width:'668px', height:'415px', title:"Best Buy", extendDefault:true});
         modalManager.registerProfile('mobileUGC', {width:'512px', height:'560px', title:"Best Buy Mobile Upgrade Checker", rootClass:'mobileUGC', extendDefault:true});
         modalManager.registerProfile('mobileGFConfirmation', {width:'512px',height:'560px' , title:"Best Buy Mobile Upgrade Checker", rootClass:'mobileUGC', extendDefault:true, overlayClose:false});
         modalManager.registerProfile('mobileDeviceAdded', {width:'500px', height:'400px', title:"Build Your Mobile Package", escKey:false, overlayClose:false, closable:false, rootClass:'mobileNoClose', extendDefault:true});
         modalManager.registerProfile('mobileInlineSmall', {width:'400px', iframe:false, inline:true});
         modalManager.registerProfile('mobileClearPackage', {width:'560px', height:'220px', iframe:true, extendDefault:true});
         modalManager.registerProfile('mobileAddALine', {width:'410px', height:'290px', title:"Add A New Device to Your Account", iframe:true, extendDefault:true, escKey:false, overlayClose:false, closable:false});
         modalManager.registerProfile('mobileUpgradePhone', {width:'410px', height:'290px', title:"Add a Line", iframe:true, extendDefault:true});
         modalManager.registerProfile('mobileReplacePhone', {width:'530px', height:'200px', title:"Replace Your Phone", iframe:true, extendDefault:true});
         modalManager.registerProfile('mobileAccessoryFinder', {width:'800px', height:'500px', title:"Mobile Phone Accessory Finder", iframe:true, extendDefault:true, rootClass:'modal-mobileAccessoryFinder'});
         modalManager.registerProfile('multipleItemBuy', {width:'680px', height:'450px', title:"Included Free", iframe:true, extendDefault:true, scrolling:true, rootClass:'mib'});
         modalManager.registerProfile('csmModal', {width:'550px', height:'400px', title:"Commonsense Media Review", iframe:true, extendDefault:true, scrolling:true});
         modalManager.registerProfile('storeLocator', { width: '920px', height: '675px', title: "Shop Local Deals.", rootClass: 'store_locator', extendDefault: true });
         modalManager.activateModalLinks(".widgetModal");

});

/**
 * BEGIN ModalManager v1.3
 * For enabling and configuring colorbox modals with a minimum of html markup
 */
if(typeof ModalManager == "undefined") {
  ModalManager = function() {
    var mm = this;
    this.vars = {
      modalProfiles:{
        defaultProfile:{
          width:"640",
          height:"465",
          iframe:true,
          transition:'fade'
        }
      },
      currentProfile:false,
      currentProfileName:false
    }
    $("#cboxClose").live('click', function() {mm.closeUI()});
  }
} else {
  try{console.log("ModalManager already defined typeof=" + typeof(ModalMananger) );}
  catch(e){}
}


/**
 * modalManager.activateModalLinks(/(string) css finder expression/, /(string) profile name/, /(boolean) force all matched elements to modal links/)
 * Checks for 'data-' attributes to transform an html element into a modal link
 * args:
 * inCssContextExpression - required - (string) The css expression used to locate
 *   all possible elements for activation.
 * inDefaultProfileName - optional - (string/null) - the default configuration profile to use if
 *  one is not supplied in the 'data-profile' html attribute.
 * inForce - optional - (boolean) force all matched elements to launch a modal, even if there is no
 *  'data-modal' html attribute
 */
ModalManager.prototype.activateModalLinks = function(inCSSContextExpression, inDefaultProfileName, inForce) {
  jQuery(inCSSContextExpression).each(function() {
    modalManager.activateModalLink.call(this, inDefaultProfileName, inForce);
  });
}

/**
 * modalManager.activateModalLink.call(/(htmlElement) the element to make a link/, /(string) profile to use if one is not specified in data-modal/, /(boolean) force this html element to become a link even if data-modal is not present/)
 * Intended to be called off an html element.
 * (ie 'this' within the function referrs to an html element)
 * determines if the element is ModalManager compatible and turns it into a
 * modal link if it is.
 * args:
 * inDefaultProfileName - optional - (string/null) - the default configuration profile to use if
 *  one is not supplied in the 'data-profile' html attribute.
 * inForce - optional - (boolean) force this element to launch a modal, even if there is no
 *  'data-modal' html attribute
 */
ModalManager.prototype.activateModalLink = function(inDefaultProfileName, inForce) {
  var onOpen = false;var onClosed = false;
  var profileName = jQuery(this).attr('data-modal');
  if(inForce === true && profileName === undefined) {
    profileName = '';
  }
  if(profileName !== undefined) {
    var config = modalManager.getProfile(profileName, inDefaultProfileName);
    if(jQuery(this).attr('data-config') !== undefined && jQuery(this).attr('data-config').length > 0) {
      eval("config = jQuery.extend({}, config," + jQuery(this).attr('data-config') + ");");
    }
    config = jQuery.extend({}, config);
    //The following code is replicated in '.show()' any changes made here should also be made there
    //if(typeof config.rootClass == "string") {
      if(config.onOpen !== undefined) {
        onOpen = config.onOpen;
      }
      if(config.onClosed !== undefined) {
        onClosed = config.onClosed;
      }
      config.onOpen = function() {
        if(typeof config.rootClass == "string") {
          jQuery("#colorbox").addClass(config.rootClass);
        }
        if(typeof config.closable == 'boolean' && !config.closable) {
          $("#cboxClose").addClass('hideControls');
        }
        modalManager.vars.currentProfile      = config;
        modalManager.vars.currentProfileName  = profileName;
        if(onOpen) {
          onOpen();
        }
        return false;
      }
      config.onClosed = function() {
        if(typeof config.rootClass == "string") {
          jQuery("#colorbox").removeClass(config.rootClass);
        }
        modalManager.vars.currentProfile      = false;
        modalManager.vars.currentProfileName  = false;
        if(onClosed) {
          onClosed();
        }
        return false;
      }
    jQuery(this).colorbox(config);
  }
}


/**
 * modalManager.bind(/(string) css finder expression/, /(string) profile name/)
 * behavior is exactly like 'activateModalLinks' as though called with 'inForce = true'
 */
ModalManager.prototype.bind = function(inCSSContextExpression) {
  this.activateModalLinks(inCSSContextExpression, inDefaultProfileName, true);
}


/**
 * modalManager.bindClose(/(string) css finder expression/)
 * binds elements to close the modal window.
 * args:
 * inCssContextExpression - optional - (string) The css expression used to locate
 *   all possible elements for activation.
 */
ModalManager.prototype.bindClose = function(inCSSContextExpression) {
  var modalManager = this;
  inCSSContextExpression = (inCSSContextExpression == undefined)? '.mm-close' : inCSSContextExpression;
  $(inCSSContextExpression).click(function() {
        modalManager.close();
  });
}


/*
* modalManager.close()
* returns: (boolean) (true for success)
* Closes the modal window from a root or iframe context.
*/
ModalManager.prototype.close = function () {
  if(typeof jQuery.colorbox != "undefined") {
    jQuery.colorbox.close();
    $("#cboxClose").removeClass('hideControls');
    return true;
  } else if (typeof parent.modalManager != "undefined") {
    return parent.modalManager.close();
  }
  return false;
}

ModalManager.prototype.closeUI = function () {
  if(this.vars.currentProfile.hasOwnProperty('closable') && this.vars.currentProfile.closable == false) {
    return false;
  }
  return this.close();
}

/**
 * modalManager.getProfile(/(string)/,/(string) -optional-/)
 * gets a modal configuration object based on a number of environment variables.
 * If 'inProfileName' exists as a colorbox config it will be returned.
 * If 'inDefaultProfileName' is a string, and 'inProfileName' is an empty string,
 *   the config 'inDefaultProfileName' will be returned (if it exists).
 * If neither of these exist the base colorbox configuration will be returned.
 * if the configuration specified contains the attribute 'extendDefault' the
 * default configuration will be merged with the specified configuration.
 */
ModalManager.prototype.getProfile = function(inProfileName, inDefaultProfileName) {
  inProfileName = (inProfileName === undefined)? '' : inProfileName;
  if(inProfileName.length == 0 && inDefaultProfileName !== undefined)
    inProfileName = inDefaultProfileName;
  if(this.vars.modalProfiles.hasOwnProperty(inProfileName)) {
    if(this.vars.modalProfiles[inProfileName].hasOwnProperty('extendDefault')) {
      return jQuery.extend({}, this.vars.modalProfiles.defaultProfile, this.vars.modalProfiles[inProfileName]);
    }
    return jQuery.extend({}, this.vars.modalProfiles[inProfileName]);
  }
  return jQuery.extend({}, this.vars.modalProfiles.defaultProfile);
}

/**
 * modalManager.registerProfile(/(string) profile name/,/(object) profile configuration/)
 * register modal profile (configuration)
 * returns: (boolean)
 * args:
 * inProfileName - required - (string) A unique name for the profile begin added
 *   will fail if profile of the same name already exists.
 * inConfig - required - (Javascript Object) Currently corresponds exactly to
 *   colorbox specification. May change in future. Stable attributes are
 *   title, width, height, extendDefault
 */
ModalManager.prototype.registerProfile = function(inProfileName, inConfig) {
  if(this.vars.modalProfiles.hasOwnProperty(inProfileName)) {
    //jQuery.log('ModalManager.registerConfig: ModalManager already has profile ' + inProfileName);
	if (console && console.log) {
		console.log('ModalManager.registerConfig: ModalManager already has profile ' + inProfileName);
	}
    return false;
  }
  this.vars.modalProfiles[inProfileName] = inConfig;
  return true;
}

/** sets the title for the modal window, can be called from main window or from
 * within the iframe (if iframe includes the modalmanager js
 */
ModalManager.prototype.setTitle = function(inTitle) {
  if(window != parent) {
    if(typeof parent.modalManager != "undefined") {
      parent.modalManager.setTitle(inTitle)
    } else {
      try {
        console.log("modalManager: error - parent has no modalManager");
      } catch(e) {}
    }
    return false;
  } else {
    $('#cboxTitle').html(inTitle);
  }
  return true;
}
/**
 * modalManager.show(/(string) profile name/,/(object) profile configuration/)
 * or
 * modalManager.show(/(object) profile configuration/)
 * or
 * modalManager.show()
 *
 * Opens a modal window programatically. If no arguments are given opens a
 * window with the default profile.
 *
 * returns: (boolean)
 * args:
 * inProfileName  - optional - (string) The name of the profile you wish to use
 * inConfig       - optional - (Javascript Object) Extends the default profile,
 * and the profile 'inProfileName' if given. Currently corresponds exactly to
 * the colorbox specification.
 */
ModalManager.prototype.show = function(inProfileName, inConfig) {
  var config, onOpen, onClosed;
  //The following code is replicated in '.activateModalLink()' any changes made here should also be made there
  switch(typeof inProfileName) {
    case 'string' :
      config = jQuery.extend({}, this.getProfile(inProfileName), inConfig);
      break;
    case 'object' :
      config = jQuery.extend({}, this.getProfile(), inProfileName);
      break;
    default :
  }
  //if(typeof config.rootClass == "string") {
  if(config.onOpen !== undefined) {
    onOpen = config.onOpen;
  }
  if(config.onClosed !== undefined) {
    onClosed = config.onClosed;
  }
  config.onOpen = function() {
    if(typeof config.rootClass == "string") {
      jQuery("#colorbox").addClass(config.rootClass);
    }
    if(typeof config.closable == 'boolean' && !config.closable) {
      $("#cboxClose").addClass('hideControls');
    }
    modalManager.vars.currentProfile      = config;
    modalManager.vars.currentProfileName  = inProfileName;
    if(onOpen) {
      onOpen();
    }
    return false;
  }
  config.onClosed = function() {
    if(typeof config.rootClass == "string") {
      jQuery("#colorbox").removeClass(config.rootClass);
    }
    modalManager.vars.currentProfile      = false;
    modalManager.vars.currentProfileName  = false;
    if(onClosed) {
      onClosed();
    }
    return false;
  }
  jQuery.fn.colorbox(config);
  return true;
}

/**
 * This function isn't used by anything, but it might be useful @ some point.
 */
ModalManager.prototype.getInnerHeight = function(context) {
  if(context === undefined) {
    context = window;
  }
  if(context.innerHeight == undefined) {
    return context.document.documentElement.clientHeight;
  }
  return context.innerHeight;
}


/**
 * modalManager.resize(/(object) config/)
 * If modalManager js file included in iFrame can resize & close modal with same
 * method calls.
 * requires: modalManager instance on 'top' window.
 *
 * description:
 *  will attempt to resize the modal within 'top' to the specified dimensions.
 *  * Calling with no arguments - will attempt a best fit in both
 *    dimensions. (Please note that width will most likely only expand)
 *
 *  * Calling where config is the string 'profile' - will resize modal to the
 *    original profile dimensions.
 *
 *  * Calling with 'auto' for config.height or config.width property will
 *    attempt a 'best fit' in that dimension.
 *  * Can resize on an element's dimensions as well. by using 'context' attribute
 * args:
 * * config {object} - optional -    contains height, width and context information
 *                          all attributes optional
 *    height: (int|'auto')
 *    width:  (int|'auto')
 *    box:    ('inner'|'outer') inner = dimensions are for content
 *                              outer = dimensions are for entire modal
 *
 *    //resizing by element (will override all the above attributes
 *    context:(html element or css expression) <- not yet supported ->
 *    contextBox:('inner'|'outer'|'scroll') - optional -
 *
 *
 */

ModalManager.prototype.resize  = function(config) {
  var dims, $elm, ieMarginFix = 0;
  //first possible of several resizing options.
  //this one checks within the current page to see if 'config' is an object with
  //.context - a css expression that yields an element.
  //placed here (and not within the window != parent) because
  //though we expect it to be used most frequently within a child iframe, it needs to
  //support taking dimensions from elements in whatever the current context happens to be
  if(typeof(config) == "object" && config.hasOwnProperty('context')) {
    $elm = jQuery(config.context);
    if($elm.length > 0) {
      config.contextBox = (config.hasOwnProperty('contextBox'))? config.contextBox : '';
      if(config.context == "body" || (config.context == "html" && $.browser.msie)) { //because block level elements as 1st child of body project their margin onto the body tag and loose it themselves.. resulting in incorrect height reporting of the body tag
        if($($("body").children()[0]).css("display") == "block") {
          ieMarginFix = ($($("body").children()[0]).css("margin-top").indexOf("px") > 0) ? parseInt($($("body").children()[0]).css("margin-top")) : 0;
        }
      }
      switch(config.contextBox) {
        case 'inner' :
          config.width = $elm.innerWidth();
          config.height = $elm.innerHeight();
          break;
        case 'outer' :
          config.width = $elm.outerWidth(true);
          config.height = $elm.outerHeight(true);
          break;
        case 'scroll':
          config.width = $elm.attr('scrollHeight');
          config.height = $elm.attr('scrollWidth');
        default:
          config.width = $elm.width();
          config.height = $elm.height();
      }
      config.height += ieMarginFix;
      //alert(config.width + ' ' + config.height)
      //$elm.height += 30;
      config.box = 'inner';
      delete config.context;
    } else {
      return false;
    }
  }
  if(window != parent) {
    if(typeof parent.modalManager != "undefined") {
      if(typeof config == "undefined") {
        parent.modalManager.resize();
      } else {
        parent.modalManager.resize(config);
      }
    } else {
      try {
        console.log("parent has no modalManager");
      } catch(e) {}
    }
    return false;
  } else { //if I'm the root page the modal is in the current context
    dims = {};
    switch(typeof(config)) {
      case "object" :
        jQuery.extend(dims, config);
        delete dims.box;
        if(!config.hasOwnProperty('box')) {
          config.box = "outer";
        }
        break;
      case "string" :
        if(config == "profile") {
          config.width = "auto"; //make this the profile height
          config.height = "auto"; //make this the profile width
          config.box = 'outer'
          //jQuery.log("error resizing to profile is not supported");
		  if (console && console.log) {
				console.log("error resizing to profile is not supported");
			}
          return false;
        }
      case "undefined" :
      default:
        config = {}
        config.width = "auto";
        config.height = "auto";
        config.box = "inner";
    }

    if(config.hasOwnProperty("width")) {
      if(config.width == "auto") {
        dims.innerWidth = jQuery("#cboxLoadedContent iframe").contents().width()
      } else {
        if(config.box == "inner") {
          dims.innerWidth = config.width;
        } else {
          dims.width = config.width;
        }
      }
    }

    if(config.hasOwnProperty("height")) {
      if(config.height == "auto"){
        dims.innerHeight = jQuery("#cboxLoadedContent iframe").contents().height()
      } else {
        if(config.box == "inner") {
          dims.innerHeight = config.height;
        } else {
          dims.height = config.height;
        }
      }
    }
    try {
      jQuery.colorbox.resize(dims);
    } catch(e) {
      if(window.console) {
        console.log('error calling colorbox resize: ', e);
      }
      return false;
    }
    return true;
  }
}


if(typeof modalManager == "undefined") {
  modalManager = new ModalManager();
}

/**
 * END ModalManager 1.3
 */

  /**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

// Mon's Tooltip Plugin version 1.0
// Requires HoverIntent 6

(function($){

  $.fn.bby_tooltips = function() {

    return this.each(function(){

	  var tip;
	  var tooltipCloseInterval;

	  //Putting <div> inside <p> will get the <div> pushes outside of <p> just in case someone put the div inside <p>
	  if ($(this).has('div.tooltip-wrapper').length > 0) {
		tip = $(this).find('div.tooltip-wrapper');
	  } else if($(this).parents().is('p, span')){
		  tip = $(this).parents().next('div.tooltip-wrapper');
	  } else {
		tip = $(this).next('div.tooltip-wrapper');
	  }

	  var pos = tip.attr('data-tooltip-pos');

	  // Some tooltips may not have a grey header
	  var injectArrow;
	  if(tip.find('.tooltip-header').length > 0){
		  injectArrow = '.tooltip-header';
	  } else {
		  injectArrow = '.tooltip-contents';
	  }

	  //Append X to all tooltips
	  tip.find(injectArrow).append('<a href="#" class="tooltip-closeBtn"><span class="closeText">close</span> &#215;</a>');

	  //Prepend appropriate arrow depend on 'pos'
	  //classes: topArrow, rightArrow, bottomArrow, leftArrow - css can be found in /common/html/css/tooltips.css

	  switch(pos){
		case 'top':
		  $('<div class="tooltip-arrow bottomArrow" />').insertBefore(tip.find(injectArrow));
		break;

		case 'right':
		  $('<div class="tooltip-arrow leftArrow" />').insertBefore(tip.find(injectArrow));
		break;

		case 'bottom':
		  $('<div class="tooltip-arrow topArrow" />').insertBefore(tip.find(injectArrow));
		break;

		case 'bottom grey':
		  $('<div class="tooltip-arrow topGreyArrow" />').insertBefore(tip.find(injectArrow));
		break;

		case 'bottom-grey':
		  $('<div class="tooltip-arrow topGreyArrow" />').insertBefore(tip.find(injectArrow));
		break;

		case 'left':
		  $('<div class="tooltip-arrow rightArrow" />').insertBefore(tip.find(injectArrow));
		break;

		default:
		  $('<div class="tooltip-arrow topArrow" />').insertBefore(tip.find(injectArrow));
		break;
	  }// END switch

	  //Append the tooltip contents into the anchor itself so the position will stay consistent
	  if($(this).is('a')){
		tip.appendTo($(this));
	  }

	  $(this).hoverIntent({
		over: open_tooltip,
		out: startCloseTooltipTimer
	  });

	  $(this).bind('click', open_tooltip);

	  $('a.tooltip-closeBtn').bind('click',function(){
		  $(this).parents('div.tooltip-wrapper').hide();
		  return false;
	  });

	  function open_tooltip(){

		  clearTimeout(tooltipCloseInterval);

		  if($(this).hasClass('help_icon') || $(this).is('img')){
			  $(this).parent().addClass('relativeWrapper');
		  } else {
			  $(this).addClass('relativeWrapper');
		  }
		  //Renable the click action for the links within the tooltips
		  //Return true will not work, the following is a workaround
		  $(this).find('div.tooltip-contents a').each(function(e){
			 $(this).click(function(){
			   var url = $(this).attr('href');
			   location.href=url;
			 })
		  });

		  calc_pos();
		  //IE7 Overlaying issue workaround for listing
		  if($('.hproduct').length > 0){
		   $(this).parents('.hproduct').nextAll('div.hproduct').addClass('staticWrapper');
		   $('div#btm-padbar').addClass('staticWrapper');
		  }

		  //IE7 overlapping issue workaround for Cart
		  if($('tr.cart-grouped-item').length > 0){
			$(this).parents('tr').next('tr').find('div.product-summary').css('position','static');
		  }
		  return false;
	  } // End of open_tooltip()

	  function startCloseTooltipTimer(){
	  	tooltipCloseInterval  = setTimeout(function(){
					close_tooltip();
			}, 1000);
	  }

	  function close_tooltip(){
		  if($(this).hasClass('help_icon')){
			  $(this).parent().removeClass('relativeWrapper');
		  } else {
			  $(this).removeClass('relativeWrapper');
		  }
		  tip.css('left','-9999px');
		  //IE7 Overlaying issue workaround for listing
		  if($('.hproduct').length > 0){
		   $('div.hproduct').removeClass('staticWrapper');
		   $('div#btm-padbar').removeClass('staticWrapper');
		  }

		  //IE7 overlapping issue workaround for Cart
		  if($('div.staticWrapper').length > 0){
			$('div.product-summary').css('position','relative');
		  }
	  } // END close_tooltip()

	  var xpos;
	  var ypos;

	  //Check to see if extra x/y coordinates were passed
	  if(tip.attr('data-tooltip-xpos')){xpos = Number(tip.attr('data-tooltip-xpos'));} else {xpos = 0;}
	  if(tip.attr('data-tooltip-ypos')){ypos = Number(tip.attr('data-tooltip-ypos'));} else {ypos = 0;}


	  //Caculate tooltip content box's position
	  function calc_pos(){
		switch(pos){
			case 'top':
			  tip.css({"top":-(tip.height()+ypos),'left': -(tip.width()*.43)+xpos}).fadeIn();
			break;
			case 'right':
			  tip.css({"top":-(tip.height()*.3)+ypos,'left': -(tip.width()*.4)+xpos}).fadeIn();
			break;
			case 'bottom':
			  tip.css({"top": 32+ypos,'left': -(tip.width()*.4)+xpos}).fadeIn();
			break;
			case 'bottom grey':
			  tip.css({"top": 32+ypos,'left': -(tip.width()*.4+xpos)}).fadeIn();
			break;
			case 'left':
			  tip.css({"top":-(tip.height()*.4)+ypos,'left': -(tip.width())+xpos}).fadeIn();
			break;
		}// END switch
	  }// END calc_pos

	}); // END $tooltips.each()
  } //END bby_tooltips
})( jQuery );
$(function(){
	try {
		$('.tooltips').bby_tooltips();

		//Reruns tooltip code whenever a colorbox finishes loading
		//Please see [ICR-33] for additional details.
		$(document).bind('cbox_complete', function(){
			$(".css-price .tooltips").parents(".css-price").css("overflow", "visible");
			$(".css-price .tooltip-wrapper").attr("data-tooltip-pos", "bottom").attr("data-tooltip-xpos", 75).css("z-index", "15000");
		    $(".css-price .tooltips").bby_tooltips();
		});
	} catch (e) {}
});


// BEGIN:Tooltips Version 3
// HoverIntent - NOT REQUIRED
/**
 * Very friggin' important note. Style initialization requires that the body tag exist.
 *
 * HTML Doc
 * to bind the 'normal way' add css class "w-tt"
 *
 * data-tt-profile="<defaults to '_default'>" <- tooltip profile name* (not required)
 *   The values for data-tt-profile are a very simple grammar. The value can be a profile name,
 *   or a profile name followed by a '|' character, followed by a supported postion (left, right, etc)
 *   so, the profile 'blue' using the default postion would say 'blue' if you wanted a tip to be
 *   on the left specifically you would put 'blue|left'
 *   * NOTE: pipes '|' are reserved characters (they may not be used for anything but separators)
 *
 * data-tt-config="" <- ways to modify this tooltip. same format as a tooltip config
 */
/**
 * The structure of a profile
 * {
    extend:false, //extend the default profile? if a string, extends from that profile - profiles must be added in-order!
    on:'hover', //or 'click'
    hoverWait:100, //number of milliseconds to wait for hover display
    waitClose:1000, //number of miliseconds to wait on mouse-out for close
    header:true, //can be false, true or html
    positions:[ //this lists the valid positions a tooltip with this profile can have. Currently only top, right, bottom and left are supported
    {
      name:'top',
      arrowClass:'bottomArrow'
    },

    {
      name:'right',
      arrowClass:'leftArrow'
    },

    {
      name:'bottom',
      arrowClass:'topGreyArrow'
    },

    {
      name:'left',
      arrowClass:'rightArrow'
    }
    ]
  }
 */
/**
 * CODE STRUCTURE
 * This code follows the proposed bby 'api' standards as of 2012.02.29
 *
 * Much of the code is focused on 'out of order' initialization and managment,
 * and dealing with unknown screen sizes.
 *
 * There are three JS classes to this widget.
 *
 * TooltipFactory:
 *  Manages profiles and the creation of tooltips and tooltip triggers.
 *  The other classes depend on this class.
 * TooltipTrigger:
 *  One for every 'tooltip anchor'. Contains anchor specific preferences for
 *  tooltip layout.
 *  - Can be referenced off the anchor element in data-w-tt
 * Tooltip:
 *  Contains tooltip configuration, has utiltities for showing, hiding, changing
 *  css classes and maintaining appropriate state information.
 *
 */
/**
 * DEV LOG:
 * DONE:
 * 1. rules engine that allows init position to also describe preferred positioning
 *    of tool tips with arbitrary locations.
 *    Rules could/would indicate
 *      hposition:left/right
 *      vposition:top/bottom
 *      valign:top/bottom/center/%/px?
 *      halign:left/right/center/%/px?
 * 2. show states *
 *    click
 *    hover-click
 * 3. User can style the same tooltip differently for different triggers. Or
 *    independently of them with tt.addClass() or by specifying a class in the
 *    config or profile.000
 *
 * TODO:
 * 1. Hide on scroll as profile configuration (currently does not do at all)
 * 2. User should be able (in config? in property?) to specify a url to ping for ajax requests
 */

if(typeof TooltipFactory == "undefined") {
TooltipFactory = function() {
  this.$html    = $('html');
//  this.$window  = $('window');
  this.vars = {
    id:{
      defaultPrefix:'bbyToolTips__',
      defaultTipPrefix:'bbyToolTip__',
      defaultTriggerPrefix:'bbyTooltipTrigger__'
    },
    html: { /*cheap templates*/
      arrow : function(arrowClass) {
        return '<div class="css-tt-arrow ' + arrowClass + '" style="display:none" />'
      },
      arrowContainer : function(id) {
        return '<div id="' + id + '" style="display:block; position:absolute; left:-10000px; top:-10000px"/>'
      },
      closeButton: function() {
        return '<a class="w-tt-closeBtn css-tt-closeBtn" style="cursor:pointer"><span class="css-closeText">close</span> &#215;</a>';
      },
      header:function() {
        return ''
      }
    },
    loggingEnabled:false,
    onprofile: {}, /*profile-name indexed lists of things to do when a profile is/(has been) added */
    profiles: {}, /*contains different style packages for tooltips indexed by style name (syntax to be determined) */
    tooltips:{}, /*object indexed by id of all tooltips (either html element or jQuery result)*/
    triggers:{}
  };

  this.profile(this.PROFILE_NAME_DEFAULT, {
    extend:false,
    on:'hover', //or 'click'
    waitHover:100, //number of milliseconds to wait for hover display
    waitClose:500,
    header:true, //can be false, true or html
    //edgeAlign:'center,center', //not yet supported
    positions:[
    {
      name:'top',
      arrowClass:'bottomArrow'
      //edgeAlign:'center'
    },

    {
      name:'right',
      arrowClass:'leftArrow'
      //edgeAlign:'center'
    },

    {
      name:'bottom',
      arrowClass:'topGreyArrow'
      //edgeAlign:'center'
    },

    {
      name:'left',
      arrowClass:'rightArrow'
      //edgeAlign:'center'
    }
    ]

  });
}

TooltipFactory.prototype.PROFILE_NAME_DEFAULT = "_default";
TooltipFactory.prototype.CSS_TIP_WRAPPER_SELECTOR = "div.w-tt-wrapper";


TooltipFactory.prototype.bindTooltips = function(inFinderExpression) {
  var ttf = this;
  inFinderExpression = (typeof inFinderExpression == "string")? inFinderExpression : '.w-tt';
  this.log($(inFinderExpression).length);
  $(inFinderExpression).each(function() {
    new TooltipTrigger(this, ttf);
  });
}


TooltipFactory.prototype.createID = function(prefix) {
  prefix = (prefix)? prefix : this.vars.id.defaultPrefix;
  var id = prefix + Math.floor(Math.random()*1000);
  while(jQuery('#' + id).length > 0) {
    id = prefix + Math.floor(Math.random()*1000);
  }
  return id;
}


TooltipFactory.prototype.log = function() {
  if(this.vars.loggingEnabled) {
    for(var i = 0; i < arguments.length; i++) {
      try {
        console.log(arguments[i]);
      } catch(e){}
    }
  }
}


TooltipFactory.prototype.onprofile = function(profileName, inFunction) {
  var i;
  profileName = (profileName)? profileName : this.PROFILE_NAME_DEFAULT;
  if((typeof inFunction) == "undefined") {
    if(this.vars.onprofile.hasOwnProperty(profileName)) {
      for(i = 0; i < this.vars.onprofile[profileName].length; i++) {
        this.vars.onprofile[profileName][i](this.profile(profileName));
      }
    }
  } else if(this.vars.profiles.hasOwnProperty(profileName) && this.vars.profiles[profileName].initialized) {

    inFunction(this.vars.profiles[profileName]);
  } else {
    if(!this.vars.onprofile.hasOwnProperty(profileName)) {
      this.vars.onprofile[profileName] = [];
    }
    this.vars.onprofile[profileName].push(inFunction);
  }
}


TooltipFactory.prototype.profile = function (profileName, inConfig) {
  var config = inConfig;
  var id, arrow;
  var ttf = this;
  var edgeAlignTopBottom = 'center';
  var edgeAlignLeftRight = 'center';

  if(typeof inConfig == "undefined") {
    if(!profileName) {
      return this.vars.profiles['_default'];
    }
    if(this.vars.profiles.hasOwnProperty(profileName)) {
      return this.vars.profiles[profileName];
    } else {
      this.log("could not find specified style '" + profileName + "'");
      return this.vars.profiles['_default'];
    }
  }

  try {
    //initialization check-block to see if this component needs initialization
    inConfig.initialized = inConfig.hasOwnProperty('initialized')? inConfig.initialized : false;

    if(config.hasOwnProperty('extend')) {
      if(config.extend === true) {
        config = $.extend({}, this.vars.profiles[this.PROFILE_NAME_DEFAULT], config);
      } else if(config.extend && this.vars.profiles.hasOwnProperty(config.extend)) {
        config = $.extend({}, this.vars.profiles[config.extend], config);
      }
    }

    if(!config.initialized) {
      for(i = 0; i < config.positions.length; i++) {
        if(!config.positions[i].hasOwnProperty('edgeAlign')) {
          config.positions[i].edgeAlign = 'center';
        }
      }


      //BEGIN Arrow dimensions & positions
      jQuery(document).ready(function(){
        id = ttf.createID();
        config.posByName = {};
        jQuery('body').append(ttf.vars.html.arrowContainer(id));

        var container = $('#' + id);
        for(var i = 0; i < config.positions.length; i++) {
          //create doubly linked list
          var next = i+1;
          var prev = i-1;
          if(prev < 0) {
            prev = config.positions.length -1;
          } else if(next == config.positions.length) {
            next = 0;
          }
          config.positions[i].prev = config.positions[prev];
          config.positions[i].next = config.positions[next];
          config.positions[i].html = ttf.vars.html.arrow(config.positions[i].arrowClass)
          arrow = $(config.positions[i].html);
          container.append(arrow);
          arrow.css('display', 'block');
          config.positions[i].arrowHeight = arrow.outerHeight();
          config.positions[i].arrowWidth = arrow.outerWidth();
          config.posByName[config.positions[i].name] = config.positions[i];
        }
        config.initialized = true;
        ttf.onprofile(profileName);
      });

      this.vars.profiles[profileName] = config;
      return config;
    }
  }
  catch(e){
    return false;
  }
  return false;
}


TooltipFactory.prototype.screenDims = function() {
  if(!this.hasOwnProperty('$html')) this.$html = $("html")
  if(!this.hasOwnProperty('$body')) this.$body = $("body")
  if(!this.hasOwnProperty('$window')) this.$window = $(window);
  var $scrollRoot = (this.$body.scrollTop() > 0 || this.$body.scrollLeft() > 0)? this.$body : this.$html;
  return {
    top: $scrollRoot.scrollTop(),
    left: $scrollRoot.scrollLeft(),
    bottom:this.$window.height() + $scrollRoot.scrollTop(),
    right:this.$window.width() + $scrollRoot.scrollLeft()
  };
}

TooltipFactory.prototype.tooltip = function(inID, inTT) {
  if(typeof inTT == 'undefined') {
    if(!this.vars.tooltips.hasOwnProperty(inID)) {
      this.log("TooltipFactory.tooltip: cannot get tooltip '" + inID + "' - does not exist");
      return false
    }
    return this.vars.tooltips[inID];
  }
  if(this.vars.tooltips.hasOwnProperty(inID)) {
    this.log("TooltipFactory.tooltip: cannot set tooltip '" + inID + "' already exists", inTT);
    return false
  }
  return this.vars.tooltips[inID] = inTT;
}


TooltipFactory.prototype.trigger = function(inID, inTT) {
  if(typeof tt == 'undefined') {
    if(!this.vars.triggers.hasOwnProperty(inID)) {
      this.log("TooltipFactory.trigger: cannot get trigger '" + inID + "' - does not exist");
      return false
    }
    return this.vars.triggers[inID];
  }
  if(this.vars.triggers.hasOwnProperty(inID)) {
    this.log("TooltipFactory.trigger: cannot set trigger '" + inID + "' already exists", inTT);
    return false
  }
  return this.vars.triggers[inID] = inTT;
}


/**
 * The TooltipTrigger class controls the behavior of any link, button or piece
 * of text that may trigger a tooltip. This includes items that are anchors for
 * the tootlips but are not 'clickable'
 */
TooltipTrigger = function(elm, factory) {
  var $tip = false,
      profileName,
      trigger = this;

  this.$elm = $(elm);
  this.id   = this.$elm.attr('id');
  this.factory = factory;
  this.vars = {
    initialized:false,
    on:false,
    position:false,
    profile:false,
    tt:false
  }

  if(typeof this.$elm.data("tt") != "undefined") {
    factory.log("trigger already initialized for element ", $trigger[0]);
    return false;
  }

  if(typeof this.id == "undefined") {
    this.id = factory.createID();
    this.$elm.attr('id', this.id);
  }
  this.$elm.data("tt", this);


  //Using dataTooltip for compatibility check here, style and layout later
  profileName = this.$elm.data('tt-profile');
  if(typeof profileName == 'undefined') {
    factory.log("didn't find data-tt-profile for trigger", elm);
    profileName = '';
  } else {
    profileName = profileName.split("|")[0];
  }

  //FIND THE TOOLTIP HTML ELEMENT
  //Putting <div> inside <p> will get the <div> pushes outside of <p> just in case someone put the div inside <p>
  if (this.$elm.has(factory.CSS_TIP_WRAPPER_SELECTOR).length > 0) { //if the tool-tip is inside the trigger
    $tip = this.$elm.find(factory.CSS_TIP_WRAPPER_SELECTOR);
  } else if(this.$elm.parents().is('p, span')){
    $tip = this.$elm.parents().next(factory.CSS_TIP_WRAPPER_SELECTOR);
  } else {
    $tip = this.$elm.next(factory.CSS_TIP_WRAPPER_SELECTOR);
  }

  //CREATE THE TOOLTIP IF IT DOESN'T ALREADY EXIST
  if($tip) {
    if($tip.data("tt")) {
      this.vars.tt = $tip.data("tt");
      this.vars.tt.trigger(this.id, this)
    } else {
      this.vars.tt = new Tooltip($tip[0], factory, profileName);
      factory.log(this.vars.tt);
    }
    if(this.vars.tt) {
      this.vars.tt.trigger(this.id, this);
    } else {
      factory.log("TooltipTrigger: tooltip failed to create for trigger", elm);
    }
  } else {
    factory.log("TooltipTrigger: couldn't find tooltip html ", elm);
  }
  //on-click bound here because even if a profile isn't ready, when a user needs tooltip info, they should get it
  this.$elm.click(function(){ //always on click
    trigger.vars.tt.toggle(trigger.$elm[0], trigger.vars.position);
  });
  factory.onprofile(profileName, function(){trigger._init();})

  return this;
}


/**
 * assumes factory exists and profile exists in the factory
 */
TooltipTrigger.prototype._init = function() {
  var config      = this.$elm.data('tt-config'),
      profileArgs = this.$elm.data('tt-profile'),
      trigger = this;
  this.factory.log("TooltipTrigger._init ", this.$elm[0]);
  if(this.vars.initialized) {
    this.factory.log("TooltipTrigger._init: already initialized", this.$elm[0]);
    return false;
  }

  if(typeof profileArgs == 'undefined') {
    profileArgs = [''];
  } else {
    profileArgs = profileArgs.split("|");
  }
  this.factory.log('_init', '"' + profileArgs[0] + '"', this.$elm);
  this.vars.profile = this.factory.profile(profileArgs[0]);

  if(typeof config == "string") {
    try {
      eval('config = ' + config);
    } catch(e) {
      this.factory.log("TooltipTrigger._init tt-config is not a valid object", config, this.$elm);
    }
    if(typeof config != 'object') {
      this.factory.log("TooltipTrigger._init tt-config is not a valid object", config, this.$elm);
    } else {
      this.vars.profile = $.extend({}, this.vars.profile, config);
    }
  }

  if(profileArgs.length > 1 && profileArgs[1]) {
    this.vars.position = profileArgs[1];
  }

  //SETUP TRIGGER BEHAVIORS -to complete
  this.vars.on = this.vars.profile.on;
  if(profileArgs.length > 2 && profileArgs[2]) {
    this.vars.on = profileArgs[2]
  }
  switch(this.vars.on) {
    case 'hover' :
      this.$elm.hover(function() {
        trigger.vars.tt.timeout(
          false,
          function() {
            trigger.show();
          },
          (trigger.profile('waitHover'))? trigger.profile('waitHover') :500
        );
      }, function() {
        if(trigger.vars.profile.hasOwnProperty('waitClose')) {
          trigger.vars.tt.timeout(
            false,
            function() {
              trigger.vars.tt.hide();
            },
            (trigger.profile('waitClose'))? trigger.profile('waitClose') :1000);
        }
      }
      );
    case 'click' :
    default : //click
    //click is bound in constructor left here for this note
  }
  return this.vars.initialized = true;
}


TooltipTrigger.prototype.profile = function (inName) {
  if(this.vars.profile.hasOwnProperty(inName)) {
    return this.vars.profile[inName];
  }
  return false;
}

/**
 * Convenience method for showing the tooltip
 */
TooltipTrigger.prototype.show = function() {
  this.vars.tt.show(this.$elm[0],this.vars.position);
}


/**
 * The tooltip Function controls the display and layout of the actual tooltip element
 */
Tooltip = function(elm, factory, profileName) {
  var tt = this;
  this.factory = factory;
  this.vars = {
    $anchor:false,
    cssClasses:{},        //a hash of all css class names that have been added to this tooltip
    currPos:false,        //current position
    html:factory.vars.html,
    layoutComplete:false, //has this tooltip been initialized?
    position:false,       //preferred position for this tooltip may be overridden in call to show()
    profile:false,        //needed?
    profileName:false,    //Allows this tooltip to back-reference the profile in the context of other classes
    showing:false,        //is this tooltip currently showing?
    timeouts:[],          //cache for timeouts
    triggers:{}           //cache for all triggers that operate on this tooltip.
  }
  this.$elm = $(elm);

  if(this.$elm.data("tt") != undefined) {
    factory.log("tooltip already initialized for element ", this.$elm[0]);
    return false;
  }
  this.$elm.data("tt", this);

  //BEGIN create ids
  this.id = this.$elm.attr('id');
  if(typeof this.id == "undefined") {
    this.id = factory.createID();
    this.$elm.attr('id', this.id);
  }
  //END create ids
  this.vars.profileName = (this.$elm.data("tt-profile"))? this.$elm.data("tt-profile") : profileName;

  //BEGIN create reference objects
  if(!factory.tooltip(this.id, this)) {
    return false;
  }

  factory.onprofile(this.vars.profileName, function(inProfile){tt._init(inProfile);})
  return this;
}


/**
 * Broken out to allow lazy loading of profiles.
 * Profile is passed in because if the correct doesn't exist we 'must' display
 * the tooltip
 */
Tooltip.prototype._init = function(profile) {
  var i, $injectAt, tt = this;
  if(!this.vars.layoutComplete) {
    //move the tooltip off the screen
    this.$elm.css(this.CSS_HIDE);
    this.$elm.appendTo("body");
    if(profile.hasOwnProperty('wrapperClass')) {
      this.$elm.addClass(profile.wrapperClass);
      this.vars.cssClasses[profile.wrapperClass] = true;
    }

    //injection point for additional html
    $injectAt = this.$elm.find('.w-tt-content');
    $injectAt.addClass('css-tt-content');
    if(this.$elm.find('.w-tt-header').length > 0){
      $injectAt = this.$elm.find('.w-tt-header').addClass('css-tt-header');
      //injectAt = '.w-tt-header';
    }
    $injectAt.append(this.vars.html.closeButton());
    //foreach position, insert the corresponding arrow and class
    for( i = 0; i < profile.positions.length; i++) {
      $(profile.positions[i].html).insertBefore($injectAt[0]);
      this.$elm.find('.' + profile.positions[i].arrowClass).css({
        display:'none'
      });
    }
    //bind events
    this.$elm.find('.w-tt-closeBtn').click(function(){
      tt.hide();
    });
    this.$elm.hover(function() {
      tt.timeout(false);
    }, function() {
      tt.onHoverout();
    });
    this.calcDimensions();
    this.vars.profile = profile;
    this.vars.layoutComplete = true;
  }
  //calculate the dimensions
}


/**
 * handles hiding on hover if the anchor needs that behavior
 */
Tooltip.prototype.onHoverout = function() {
  var tt = this, uwait = (this.vars.profile.hasOwnProperty('waitClose'))? this.vars.profile.waitClose: 0;
  if(this.vars.$anchor.data("tt").profile("on") == 'hover') {
    uwait = this.vars.$anchor.data("tt").profile("waitClose")? this.vars.$anchor.data("tt").profile("waitClose") : uwait;
    this.timeout(false,
      function(){
        tt.hide();
      },
      uwait);
  }
}

/**
 * constant objects
 */
Tooltip.prototype.CSS_HIDE = {
  display:'none',
  position:'absolute',
  left:'-9999px'
};

Tooltip.prototype.CSS_OFFSCREEN = {
  display:'none',
  position:'absolute',
  left:'-9999px'
};


/**
 * allows adding of css class for dynamic styling changes.
 * If tooltip is currently visible hides and re-displays tooltip for smoother
 * presentation.
 *
 * *  Important note! Because profile 'arrow' dimensions are calculated
 *    only with the main profile classes, arrows should not differ in dimension
 *    from that contained within the main profile.
 */
Tooltip.prototype.addClass = function(inClass) {
  if(this.$elm.hasClass(inClass)) {
    return false;
  }
  if(this.vars.showing) {
    this.$elm.fadeOut();
  }
  this.$elm.addClass(inClass);
  this.vars.cssClasses[inClass] = true;
  this.calcDimensions(); //because the class update may change dimensions
  if(this.vars.showing) {
    this.vars.showing = false;
    this.show(this.vars.$anchor, this.vars.currPos.name);
  }
}

/**
 * allows removal of css class for dynamic styling changes.
 * If tooltip is currently visible hides and re-displays tooltip for smoother
 * presentation.
 */
Tooltip.prototype.removeClass = function(inClass) {
  if(!this.$elm.hasClass(inClass)) {
    return false;
  }
  if(this.vars.showing) {
    this.$elm.fadeOut();
  }
  this.$elm.removeClass(inClass);
  delete this.vars.cssClasses[inClass];
  this.calcDimensions(); //because the class update may change dimensions
  if(this.vars.showing) {
    this.vars.showing = false;
    this.show(this.vars.$anchor, this.vars.currPos.name);
  }
}
/**
* Notice one side effect of calcDimentions is the tooltip is off to the left
* side of the screen at the end.
*/
Tooltip.prototype.calcDimensions = function() {
  this.$elm.css(this.CSS_HIDE);
  this.$elm.css({
      display:'block'
    });
  this.vars.width = this.$elm.outerWidth();
  this.vars.height = this.$elm.outerHeight();
}


/**
 * Hides the tooltip. Fires the callback after tooltip is hidden.
 * callback - optional - function
 */
Tooltip.prototype.hide = function(callback) {
  var tt = this;
  this.timeout(false);
  this.$elm.hide(0,function() {
    tt.$elm.css(tt.CSS_OFFSCREEN);
    tt.$elm.find('.css-tt-arrow').css({
      display:'none'
    });
    tt.$elm.css(tt.CSS_HIDE);
    if(typeof callback == 'function') {
      callback();
    }
  });
  this.vars.showing = false;
}

/** NEW VERSION */
Tooltip.prototype.show = function(inAnchor, inPosition) {
  var $anchor = $(inAnchor), adjustment, arrowCSS, base, height, i, nextPosition, offset = {}, pos, screen, width;
  this.timeout(false);
  if(!this.vars.layoutComplete) {
    this._init(this.factory.profile(this.vars.profileName));
  }
  if(this.showing()) {
    if(this.vars.$anchor && (this.vars.$anchor[0] == inAnchor)) {
      return false;
    } else {
      this.$elm.css(this.CSS_HIDE);
    }
  }
  this.vars.$anchor = $anchor;
  screen = this.factory.screenDims();
  base = $anchor.offset();
  base.width = $anchor.width();
  base.height = $anchor.height();
  //cycle through positioning. Locate the least conflicting position.
  pos = (inPosition && this.vars.profile.posByName.hasOwnAttribute(inPosition))? this.vars.profile.posByName[inPosition] : this.vars.profile.positions[0];

  nextPosition = true;
  i = this.vars.profile.positions.length;
  while(nextPosition) {
    nextPosition = false;
    //accurate tip dimensions for this position
    height = this.vars.height;
    width = this.vars.width
    switch (pos.name) {
      case 'left'   :
      case 'right'  :
        width = pos.arrowWidth + this.vars.width;
        break;
      case 'top'    :
      case 'bottom' :
        height = pos.arrowHeight + this.vars.height;
        break;
    }

    //base location for this position
    //*We're including the arrow height here because the offset number is calculated
    //to the corner of the tooltip, which does NOT include the arrow (it lies outside the tooltip box)
    switch (pos.name) {
      case 'left'   :
      case 'right'  :
        if(pos.edgeAlign == 'top') {
          offset.top = base.top + base.height - height;
        } else if(pos.edgeAlign == 'bottom') {
          offset.top = base.top;
        } else {
          offset.top = (base.top + ((base.height - height)/2))
        }
        if(pos.name == 'left') {
          offset.left = base.left - width;
        } else {
          offset.left =(base.left + base.width + pos.arrowWidth)
        }
        break;
      case 'top'    :
      case 'bottom' :
        if(pos.edgeAlign == 'left') {
          offset.left = base.left;
        } else if(pos.edgeAlign == 'right') {
          offset.left = base.left + base.width - width;
        } else {
          offset.left = (base.left + ((base.width - width)/2));
        }

        if(pos.name == 'top') {
          offset.top = base.top - height;
        } else {
          offset.top = base.top + base.height + pos.arrowHeight;
        }
        break;
    }
    //detect collision with edges
    adjustment = {
      down:false,
      up:false,
      left:false,
      right:false
    };
    if(offset.top < screen.top) {
      adjustment.down = true;
    }
    else if(offset.top + this.vars.height > screen.bottom) {
      adjustment.up = true;
    }

    if (offset.left + this.vars.width > screen.right) {
      adjustment.left = true;
    }
    else if(offset.left < screen.left) {
      adjustment.right = true;
    }

    //adjust postion if needed & possible, or choose to go to the next position
    nextPosition = false;
    if(adjustment.down) {
      if(pos.name == 'top') {
        nextPosition = true;
      } else {
        offset.top = screen.top;
      }
    } else if(adjustment.up) {
      if(pos.name == 'bottom') {
        nextPosition = true;
      } else {
        offset.top = screen.bottom - height;
      }
    }
    if(adjustment.left) {
      if(pos.name == 'right') {
        nextPosition = true;
      } else {
        offset.left = screen.right - width;
      }
    } else if(adjustment.right) {
      if(pos.name == 'left') {
        nextPosition = true;
      } else {
        offset.left = screen.left;
      }
    }
    i--;
    if(nextPosition) {
      if(i <= 0) nextPosition = false;
      else pos = pos.next;
    }
  }

  //Now that we've decided the position and orientation of the tooltip
  //we'll decide the postion of the arrow
  arrowCSS = {
    display:'block'
  };
  switch (pos.name) {
    case 'left'   :
      arrowCSS.top = (base.top - offset.top + (base.height/2) - (pos.arrowHeight/2));
      break;
    case 'right'  :
      arrowCSS.top = (base.top - offset.top + (base.height/2) - (pos.arrowHeight/2));
      break;
    case 'top'    :
      arrowCSS.left = (base.left - offset.left + (base.width/2) - (pos.arrowWidth/2));
      break;
    case 'bottom' :
      arrowCSS.left = (base.left - offset.left + (base.width/2) - (pos.arrowWidth/2));
      break;
  }

  this.vars.showing = true;
  this.vars.currPos = pos;
  this.$elm.find("." + pos.arrowClass).css(arrowCSS);
  this.$elm.css(this.CSS_HIDE);
  this.$elm.css(offset);
  this.$elm.show();
  return true;
}


/**
 * Is the tooltip currently being displayed?
 */
Tooltip.prototype.showing = function() {
  return (this.vars.showing == true);
}


/**
 * Sets and clears timeouts for this tooltip
 * accepts the following arguments (in order)
 * clearTimeouts - optional - boolean
 * timeout function - optional - function
 * timeout miliseconds - required for function - number
 *
 */
Tooltip.prototype.timeout = function() {
  var args = [], i;
  for(i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  if(typeof args[0] == 'boolean') {
    if(!args.shift()) {
      for(i = 0; i < this.vars.timeouts.length; i ++) {
        clearTimeout(this.vars.timeouts[i]);
      }
      this.vars.timeouts = [];
    }
  }
  if(args.length == 2) {
    this.vars.timeouts.push(setTimeout(args[0], args[1]));
  }
}


/**
 * shows it if hidden, hides it if shown
 */
Tooltip.prototype.toggle = function(inAnchor, inPosition) {
  if(this.showing()) {
    this.hide();
  } else {
    this.show(inAnchor, inPosition);
  }
}


/**
 * adds a trigger to the internal object. GOOD PRACTICE if manually binding.
 * at some point may return t
 */
Tooltip.prototype.trigger = function(inID, inTrigger) {
  if(typeof inTrigger == 'undefined') {
    if(this.vars.triggers.hasOwnProperty(inID)) {
      return this.vars.triggers[inID];
    }
    return false;
  }
  return this.vars.triggers[inID] = inTrigger;
}

ttFactory = new TooltipFactory();
  //TooltipFactory initialization
  jQuery(document).ready(function() {
    ttFactory.bindTooltips('.w-tt');
  });
}
/* THIS IS A TEST PROFILE - SAME ONE AS USED IN THE WIKI ARTICLE
ttFactory.profile('checkavail', {
  extend:true,
  positions:[
      {
        name:'bottom',
        arrowClass:'topGreyArrow',
        edgeAlign:'left'
      },
      {
        name:'top',
        arrowClass:'bottomArrow',
        edgeAlign:'right'
      },

      {
        name:'right',
        arrowClass:'leftArrow'
      },


      {
        name:'left',
        arrowClass:'rightArrow'
      }
    ]});
*/
// END:Tooltips Version 3

/*
 *BEGIN:ORANGEJ ORANGE-J
 * Projekt Orange - Orange-J -
 * Orange Extension for jQuery
 * Bringing even more advanced coding laziness to the developer
 * Version 2.4.4
 * author: Donovan Walker
 * Added support for anonymous arrays
 */

/**
 * The snippet library manager.
 * You must use the manager if you wish to use the include function for the snippets.
 */
function SnippetLib(inSnippets){
   this.snippets       = {};
   this.isSnippetLib   = true;
   this.reg = {};
   this.reg.tagOpen = /\{#snippet name="([a-z]|[A-Z]|[0-9]|_)+" *\}/;
   if(typeof inSnippets == "object" || typeof inSnippets == "string") this.add(inSnippets);
}

SnippetLib.prototype.has = function(inName) {
   if(this.snippets.hasOwnProperty(inName))
      return (this.snippets[inName]);
   return(false);
}


SnippetLib.prototype.add = function(inNameOrObj, inStr) {
   if(typeof inNameOrObj == "object") {
      for(var i in inNameOrObj) if(inNameOrObj.hasOwnProperty(i)) {
         this.snippets[i] = new Snippet(inNameOrObj[i], this);
      }
   } else if (typeof inStr == "string") {
      this.snippets[inNameOrObj] = new Snippet(inStr, this);
   } else {
      var snippets = inNameOrObj;
      while(true) {
         var match = this.reg.tagOpen.exec(snippets);
         if(match == null) break;

         var name = match[0].substring(16, match[0].length - 2); //get the clean tag with no whitespace or opening {
         snippets = snippets.substring(snippets.indexOf(match[0]) + match[0].length)
         this.snippets[name] = new Snippet(snippets.substring(0, snippets.indexOf("{/snippet}")), this);
         snippets = snippets.substring(snippets.indexOf("{/snippet}") + "{/snippet}".length);
      }
   }
};


SnippetLib.prototype.fill = function(inName, inObj, inConfig) {
   if(!this.snippets.hasOwnProperty(inName)) {
      var msg = "SnippetLib Error: snippet '" + inName + "' not set";
      jQuery.log(msg);
      return(false);
   }
   if(typeof inConfig == "object") {
      if(inConfig.hasOwnProperty("parent")) { //supporting 'include' function
         this.snippets[inName].parent = inConfig.parent;
         var html = this.snippets[inName].fill(inObj);
         this.snippets[inName].parent = false;
         return(html);

      }

   }
   return(this.snippets[inName].fill(inObj));
};


SnippetLib.prototype.fillString = function(inTPLString, inObj) {
   var snippet = new Snippet(inTPLString, this);
   var retString = snippet.fill(inObj);
   delete(snippet);
   return(retString);
};



///the snippet class!  required for templating functionality
function Snippet(inString, inLib, inParent) {
   var snippet, match;
   //defaults
   this.isSnippet      = true;
   this.config         = {
      caseConvert:false,
      chopTo:false, // = maxlen - maxchop initialized by maxlen
      collapsewhite:false,
      dateFormat:false,
      htmlentities:false,
      maxend:"",
      maxchop:0,
      maxlen:false,
      maxnohtml:false,
      maxwords:false,
      numberFormat:false
   };
   this.cycleInc       = 0;
   this.cycleName      = false;
   this.cycleValues    = [];
   this.defaultVal     = "";
   this.includeSnippet = false;
   this.inputString    = inString; //full input string
   this.key            = null;     //this snippets key
   this.listInc        = 0;        //list increment.. changes
   this.listPos        = 0;
   this.parent         = false;
   this.sLib           = false;
   this.tag            = null;     //full tag
   this.type           = "";
   this.elements       = []; //placed here for easier display in $.log when debugging
   this.transforms     = [];

   //this.snippets 	= new Array();
   if(typeof inParent == "object" && inParent.isSnippet)
      this.parent = inParent;
   if(typeof inLib == "object" && inLib.isSnippetLib)
      this.sLib = inLib;

   //find my tag (always at the beginning of instring)
   match = this.tagOpen.exec(inString);
   if(!this.parent) { //if I have no parent, I'm the root snippet and don't need to find my tag (because it's implied)
      this.tag = "root{}";
      this.type = this.tagType(this.tag);
   } else {
      if(match === null) throw "Snippet Error: bad open tag";
      this.tag = match[0].substring(1, match[0].length - 1); //get the clean tag with no whitespace or opening {
      this.type = this.tagType(this.tag);
      inString = inString.substring(match[0].length-1)
      switch(this.type) {
         case "if" : //we do nothing here because we need the if's 'config' expression for the child.. or do we?
            break;
         case "function" :
            if(this.tag == "#func")
               this.parseConfig(inString.substring(1));
            else
               this.parseConfig(inString.substring(1, inString.indexOf("}}")));
            inString = inString.substring(inString.indexOf("}}") + 2);
            break;
         default :
            this.parseConfig(inString.substring(1, inString.indexOf("}")));
            inString = inString.substring(inString.indexOf("}") + 1);
      }
   }
   //assign the fill function
   if(this.type == "value") {
      this.fillFunc = this.fillVal;
   } else if(this.type == "if") {
      this.fillFunc = this.fillIf;
   }else if(this.type == "elseif") {
      this.fillFunc = this.fillElseIf;
   } else if(this.type == "object") {
      this.fillFunc = this.fillObj;
   } else if(this.type == "array") {
      this.fillFunc = this.fillArray;
   } else if(this.type == "function") {
      this.fillFunc = this.fillFunction;
   } else if(this.type == "include") {
      this.fillFunc = this.fillIncl;
   }
   //get the data element key  (to fill the snippet)

   //if this is an object, array, or root snippet (an object) look through the 'inString' for child-snippets
   if(this.type == "if") { //if elements and thier else/elseif children have a unique construction
      this.key = "";
      this.constructIf(inString);
   } else if(this.type == "elseif") {
   //since the elseif is built by the parent 'if' we don't need to do anything here.
   } else if(this.type == "object" || this.type == "array" || this.type == "function") {
      if(this.type == "#func") return (this);
      this.key =  this.tag.substring(0, this.tag.length - 2); //trim off the [] or {}
      var tagType = null;
      var matchString = null;
      var working = inString;
      var closeTag = null;
      var z = 0;



      while(true) {
         match = this.tagOpen.exec(working);
         if(match == null) break; //this will break us out of the loop when there are no more matches
         this.elements.push(working.substring(0, match.index)); //adding any static string before the match to the list of child elements
         working = working.substring(match.index);

         matchString = match[0];
         var tag = matchString.substring(1, matchString.length -1);
         //if the child is an object or array snippet, we need to find the end tag and give it all the characters in-between
         tagType = this.tagType(tag);

         switch(tagType) {
            case "object" :
            case "array" :
            case "function" :
            case "if" :
               closeTag = this.getCloseTag(tag);

               var newMatchIndex = working.indexOf(matchString, matchString.length);
               var matchCloseIndex = working.indexOf(closeTag);
               if(matchCloseIndex == -1) throw "Snippet Error: no close for '" + this.tagType(tag) + "' " + tag;
               //because there may be nested tags of the same type/name
               var i = 0; //for debugging the snippets
               while(newMatchIndex < matchCloseIndex && newMatchIndex > -1) {
                  newMatchIndex = working.indexOf(matchString, newMatchIndex + matchString.length);
                  matchCloseIndex = working.indexOf(closeTag, matchCloseIndex + closeTag.length);
                  if(matchCloseIndex == -1 && newMatchIndex == -1) throw "Snippet Error, no close for '" + this.tagType(tag) + " " + tag + "' iteration:" + i;
                  i++;
               }
               //we've found the closing tag for our new object or array Snippet now create it
               snippet = new Snippet(this.rework(tag, tagType, working, matchCloseIndex), this.sLib, this);
               this.elements.push(snippet);
               working = working.substring(matchCloseIndex + closeTag.length);
               break;
            case "literal" :
               closeTag = "{/lit}";
               matchCloseIndex = working.indexOf(closeTag);
               if(matchCloseIndex == -1) throw "Snippet Error: no close for '" + this.tagType(tag) + "'";
               this.elements.push(working.substring(6, matchCloseIndex));
               working = working.substring(matchCloseIndex + closeTag.length);
               matchCloseIndex = working.indexOf(closeTag, matchCloseIndex + closeTag.length);
               break;
            default : //if tag is a value
               matchCloseIndex = working.indexOf("}");
               if(matchCloseIndex == -1) throw "Snippet Error: no close for '" + tag + "' near '" +inString.substring(0, 10) + "...'";
               snippet = new Snippet(this.rework(tag, tagType, working,  matchCloseIndex + 1), this.sLib, this);

               this.elements.push(snippet);
               working = working.substring(matchCloseIndex + 1);
         }
         z++;
      }
      this.elements.push(working);
   } else {
      this.key = this.tag;
   }
   return(this);
}

Snippet.prototype.getCloseTag = function(inTag) {
   var key, closeTag, tagSuffix;
   if(inTag.indexOf("#") == 0) {
      key = inTag.substring(1);
      if(inTag == "#func") {
         closeTag = "}}";
      } else {
         closeTag = "{/" + key + "}";
      }
   } else {
      tagSuffix = inTag.substring(inTag.length - 2);
      key 	= inTag.substring(0, inTag.length - 2);

      closeTag = "{" + tagSuffix + key + "}";
   }
   delete key, tagSuffix;
   return closeTag;
}


Snippet.prototype.listLength = function() {
   return this.getObjValue('listLen');
}


Snippet.prototype.listPos = function() {
   return this.getObjValue('listPos');
}


Snippet.prototype.listIndex = function() {
   return this.getObjValue('listInc');
}


Snippet.prototype.arrayIndex = function() {
   return this.getObjValue('arrayInc');
}

/**
 * Analyses the opening tag and 'reworks' the working input string to expand '.' syntax tags into supported {object{}} tags
 */
Snippet.prototype.rework = function(tag, tagType, working, matchCloseIndex) {
   var closeTags = "", openTags = "";
   var outStr = working.substring(0, matchCloseIndex);
   var tagList = tag.split('.');
   if(tag.indexOf(".") > 0) {
      switch(tagType) {
         case "value" :
            working = outStr.split(".");
            outStr = working.shift() + "{}}";
            outStr += "{" + working.join(".");
            break;
         case "object" :
         case "array" :
            //we remove the opening tag from the output string EXCEPT for the last '}' This allows us to use attributes
            outStr = outStr.substring(tag.length + 1);
            openTags += "{" + tagList.shift() + "{}}";
            while(tagList.length > 1) {
               closeTags = "{{}" + tagList[0] + "}" + closeTags;
               openTags += "{" + tagList.shift() + "{}}";
            }
            outStr = openTags + "{" + tagList[0] + "" + outStr + this.getCloseTag(tagList[0]) +closeTags;
      }

   }
   return outStr;
}

Snippet.prototype.reg = {
   htmltag:/<(?:.|\s)*?>/
   , whitespaceG:/\s+/g
   , nbspG:/&nbsp;/g
//,tagOpen: /{(#template |#lit\}|#func |#if |#elseif |#else|#include |([0-9]|[a-z]|[A-Z]|_)+(\.([0-9]|[a-z]|[A-Z]|_)+)*((\{\})|(\[\]|\(\)))*( |\}))/ //added support for '.' and vars that begin with numbers
//,tagOpenCloseBrace: /(^|[^\\])}/  //not yet used
}

Snippet.prototype.collapseWhite = function(inString) {
   inString = inString.replace(this.reg.nbspG, " ");
   return inString.replace(this.reg.whitespaceG, " ");
}


Snippet.prototype.constructIf = function(inString) {
   var element = new Snippet("{#elseif" + inString.substring(0, inString.indexOf("}") +1), this.sLib, this.parent);
   var tag = null;
   var tagSuffix = null;
   var tagType = null;
   var match   = null;
   var matchString = null;
   var working = inString.substring(inString.indexOf("}") + 1);
   var key = null;
   var closeTag = null;
   var z = 0;
   while(true) { //we loop over the root if's working string.
      match = this.tagOpen.exec(working);
      if(match == null) break; //this will break us out of the loop when there are no more matches
      element.elements.push(working.substring(0, match.index)); //adding any static string before the match to the list of child elements
      working = working.substring(match.index);

      matchString = match[0];
      if(matchString == "{#else")
         tag = matchString.substring(1);
      else
         tag = matchString.substring(1, matchString.length -1);
      //if the child is an object or array snippet, we need to find the end tag and give it all the characters in-between
      tagType = this.tagType(tag);
      switch(tagType) {
         case "elseif" :
            this.elements.push(element);
            element = new Snippet(working.substring(0, working.indexOf("}") + 1), this.sLib, this.parent);
            working = working.substring(working.indexOf("}") + 1);
            break;
         case "else" :
            this.elements.push(element);
            element = new Snippet("{#elseif true}", this.sLib, this.parent);
            working = working.substring(working.indexOf("}") + 1);
            break;
         case "object" :
         case "array" :
         case "function" :
         case "if" :
            closeTag = this.getCloseTag(tag);

            //var newMatchIndex = working.indexOf(matchString, match.index + matchString.length);
            var newMatchIndex = working.indexOf(matchString, matchString.length);
            var matchCloseIndex = working.indexOf(closeTag);
            if(matchCloseIndex == -1) throw "Snippet Error: no close for " + this.tagType(tag) + " " + tag;
            //because there may be nested tags of the same type/name
            var i = 0; //for debugging the snippets
            while(newMatchIndex < matchCloseIndex && newMatchIndex > -1) {
               newMatchIndex = working.indexOf(matchString, newMatchIndex + matchString.length);
               matchCloseIndex = working.indexOf(closeTag, matchCloseIndex + closeTag.length);
               if(matchCloseIndex == -1 && newMatchIndex == -1) throw("Snippet Error: no close for " + this.tagType(tag) + " " + tag + " iteration:" + i);
               i++;
            }
            //we've found the closing tag for our new object or array Snippet now create it
            var snippet = new Snippet(working.substring(0, matchCloseIndex), this.sLib, this);
            //snippet.pre = working.substring(0, match.index);
            element.elements.push(snippet);
            working = working.substring(matchCloseIndex + closeTag.length);
            break;
         default : //if tag is a value
            matchCloseIndex = working.indexOf("}");
            var snippetString = working.substring(0, matchCloseIndex + 1);
            if(tag != "#if") {
                
               //2.4.1
               //var snippet = new Snippet(snippetString, this.sLib, this);
               var snippet = new Snippet(this.rework(tag, tagType, working, matchCloseIndex +1), this.sLib, this);
            }
            //snippet.pre = working.substring(0, match.index);
            element.elements.push(snippet);
            working = working.substring(matchCloseIndex + 1);
      }
      z++;
   }
   element.elements.push(working);
   this.elements.push(element);
}


Snippet.prototype.tagOpen = /{(#template |#lit\}|#func |#if |#elseif |#else|#include |#\[\]}|([0-9]|[a-z]|[A-Z]|_)+(\.([0-9]|[a-z]|[A-Z]|_)+)*((\{\})|(\[\]|\(\)))*( |\}))/; //added support for '.' and vars that begin with numbers
Snippet.prototype.tagOpenCloseBrace = /(^|[^\\])}/;  //not yet used


/**
* assumes tag has tag delimiters and any attributes removed
*/
Snippet.prototype.tagType = function(inTag) {
   if(inTag.substring((inTag.length - 2)) == "[]") {
      return "array";
   } else if(inTag.substring((inTag.length - 2)) == "{}") {
      return "object";
   } else if(inTag.substring((inTag.length - 2)) == "()") {
      return "function";
   } else if(inTag == "#func") {
      return "function";
   } else if(inTag == "#template") {
      return "template";
   } else if(inTag == "#if") {
      return "if";
   } else if(inTag == "#elseif") {
      return "elseif";
   } else if(inTag == "#else") {
      return "else";
   } else if(inTag == "#include") {
      return "include";
   } else if(inTag == "#func") {
      return "func";
   } else if(inTag == "#lit")  {
      return "literal";
   } 
   return "value";
}


Snippet.prototype.fillVal = function(obj) {
   if(obj != null) {
      if(obj.toString) {
         obj = obj.toString();
      } else {
         obj = obj + '';
      }
   } else {
      obj = '';
   }
   //obj = (obj != null)? if(obj.toString) : ''; //2.4.1
   //obj = obj.toString();
   for(var i = 0; i < this.transforms.length; i++) {
     obj = this.transforms[i].call(this, obj);
   }
   return obj;
}


Snippet.prototype.fillIncl = function(obj) {
   if(!this.sLib) {
      throw "Snippet Error: cannot use include when not using SnippetLib";
      return("");
   }
   return this.sLib.fill(this.includeSnippet, obj, {
      parent:this
   });
}


Snippet.prototype.fillFunction = function(obj) {
   var myVal = this.myFunction.call(this.parent, obj);
   if(this.tag == "#func" && typeof(myVal) != "undefined") {
      return myVal.toString();
   }
   if(typeof(myVal) == "undefined" || myVal === false) return "";
   if(typeof(myVal) == "string" || typeof(myVal) == "number") return(myVal);
   return this.fillSnippets(obj);
}


Snippet.prototype.fillIf = function(obj) {
   var i, myVal, out = '';
   for(var i = 0; i < this.elements.length; i++) {
      myVal = this.elements[i].fill(obj);
      if(typeof myVal == "string") {
         return myVal;
         /*out += myVal;
         i = this.elements.length;*/
      }
   }   
   //return out;
   return '';
}


Snippet.prototype.fillElseIf = function(obj) {
   if(!this.myFunction.call(this.parent, obj)) return false;
   return this.fillSnippets(obj)
}

Snippet.prototype.getPath = function() {
   if(this.parent) {
      return this.parent.getPath() + '->' + this.tag;
   }
   return this.tag;
}

Snippet.prototype.fillObj = function(obj) {
   var objType = typeof obj;
   if(this.tag == "root{}") {
      //return this.fillSnippets(obj);
      if(objType == "number" || objType == "string")
         return this.fillSnippets({
            "val":obj
         });
      else if(objType == "object" && !(obj instanceof Array))
         return this.fillSnippets(obj);
   }else {
      return this.fillSnippets(obj);
   }
}

Snippet.prototype.fillArray = function(obj) {
   var i, j, out = '';
   this.cycleInc = this.arrayInc = this.listInc = 0;
   this.listPos = 1;
   if(!(obj instanceof Array)) {
      if(typeof obj == "object" || typeof obj == "function") {
         this.listLen = 0;
         for(i in obj) if(obj.hasOwnProperty(i)) {this.listLen++;} 
         for(j in obj) if(obj.hasOwnProperty(j)) {
            this.arrayInc = j;
            if(this.cycleInc >= this.cycleValues.length) this.cycleInc = 0;
            if(typeof(obj[j]) == "string" || typeof(obj[j]) == "boolean" || typeof(obj[j]) == "number") {
               out += this.fillSnippets({
                  "val":obj[j]
               });
            } else {
               out += this.fillSnippets(obj[j]);
            }
            this.listInc++;
            this.listPos = this.listInc + 1;
            this.cycleInc++;
         }
      } else { //assumed number/string/boolean - this does not currently support an element that is an array/list element that is actually a function
         return(out + obj); //2.4.1 obj was 'this.inner'
      }
   } else {
      this.listLen = obj.length;
      for(j = 0; j < obj.length; j++) {
         if(!this.config.maxlen || this.config.maxlen > j) { //swapped < for > fixes maxlen for arrays
            this.arrayInc = this.listInc = j;
            this.listPos = this.listInc + 1;
            if(this.cycleInc >= this.cycleValues.length) this.cycleInc = 0;
            if(typeof(obj[j]) == "string" || typeof(obj[j]) == "boolean" || typeof(obj[j]) == "number") {
               out += this.fillSnippets({
                  "val":obj[j]
               });
            } else {
               out += this.fillSnippets(obj[j]);
            }
            this.cycleInc++;
         } else {
            out += this.config.maxend;
            j = obj.length;
         }
      }
   }
   return out;
}


Snippet.prototype.fill = function(obj) {
   this.obj = obj;
   if(typeof obj == "undefined" || obj == null) {
      obj = this.getDefaultValue();
      if(this.type == "value"){
         return(obj);
      }
   }
   var out = this.fillFunc(obj);
   this.obj = null;
   delete(this.obj);
   return(out);
}


/**
 * Fills the child snippets of this snippet
 * If the item is a list, is called within an outer loop that sets cycleName, cycleInc, etc
 */
Snippet.prototype.fillSnippets = function(obj) {
   var out = "";
   var snippet = null;
   for(var i = 0; i < this.elements.length; i++) {
      snippet = this.elements[i];
      if(typeof(snippet) == "string") { //static bit of html
         out += snippet;
      } else { //is a real snippet
         if(this.cycleName && this.cycleName == snippet.tag) {
            out += snippet.fill(this.cycleValues[this.cycleInc]);
         } else {
            if(snippet.tag.indexOf("#") === 0) {
               out += snippet.fill(obj); //we do this because ifs & functions operate in the parent namespace
            }
            else {               
               if(obj !== null) { //2.4.1 null check
                  if(typeof obj[snippet.key] == "function") {
                     out += snippet.fill(obj[snippet.key]());
                  } else {
                     out += snippet.fill(obj[snippet.key]);
                  }
               }
            }
         }
      }
   }
   return(out);
}


Snippet.prototype.getDefaultValue = function() {
   if(this.defaultVal.length == 0 && this.parent) {
      return(this.parent.getObjValue(this.key));
   }else {
      return(this.defaultVal);
   }
}


Snippet.prototype.getObjValue = function(inKey) {
   if(typeof(this.obj) != "undefined") {
      if(this.type == "array") { //we check here for array because the current array's "current" obj is actually an element of the 'list' that is obj.
         if(this.obj.hasOwnProperty(this.arrayInc) && this.obj[this.arrayInc] !== null && this.obj[this.arrayInc].hasOwnProperty(inKey)) { //2.4.1 nullcheck
            return this.obj[this.arrayInc][inKey];
         }
      }
      if(this.obj != null && this.obj.hasOwnProperty(inKey)) {//2.4.1 nullcheck
         return(this.obj[inKey]);
      } else if(this.type == "array") {
         switch (inKey) {
            case "arrayInc" :
               return this.arrayInc;
            case "listInc" :
               return this.listInc;
            case "listPos" :
               return this.listPos;
            case "listLen" :
               return this.listLen;
            case this.cycleName :
               return this.cycleValues[this.cycleInc];
         }
      }

      return this.parentValue(inKey);
   }
   if(typeof this.parent != "undefined") { //I seem to remember deleting this if a while back. It may produce unexpected results in some situations.
      return this.parentValue(inKey);
   }
   return("");
}


Snippet.prototype.htmlentities = function (inHTML) {
   return inHTML.
   replace(/&/gmi, '&amp;').
   replace(/"/gmi, '&quot;').
   replace(/>/gmi, '&gt;').
   replace(/</gmi, '&lt;')
}


Snippet.prototype.log = function() {
  if(typeof(console) != "undefined") {
    if(typeof(console.log) == "function") {
      for(var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
      }
      return true;
    }
  }
  return false;
}


Snippet.prototype.parentValue = function(inKey, inValue) {
   if(this.parent) {
      if(typeof inValue == "undefined")
         return(this.parent.getObjValue(inKey));
      else {
         alert("snippet-setting parent value not implemented!");
         this.parent.setObjValue(inKey, inValue);
      }
   }
   return("");
}


Snippet.prototype.parseConfig = function(inString) {
   switch(this.type) {
      case "function" :
         inString = inString.substring(1);
         eval("this.myFunction = function(obj) {" + inString + "}");
         break;
      case "elseif" :
         eval("this.myFunction = function(obj) { return(" + inString + ");}");
         break;
      case "include" :
         inString = inString.substring(inString.indexOf("\"") + 1);
         this.includeSnippet = inString.substring(0, inString.indexOf("\""));
         break;
      default : /* value,list*/
         var temp = "";
         var index = inString.indexOf("default=\"");
         if(index > -1) {
            temp = inString.substring(index + 9);
            this.defaultVal = temp.substring(0, temp.indexOf("\""));
            inString = inString.replace("default=\"" + this.defaultVal + "\"", "");
         }
         index = inString.indexOf("maxend=\"");
         if(index > -1) {
            temp = inString.substring(index + 8);
            this.config.maxend = temp.substring(0, temp.indexOf("\""));
            inString = inString.replace("maxend=\"" + this.defaultVal + "\"", "");
         }
         index = inString.indexOf("cycleName=");
         if(index > -1) {
            temp = inString.substring(index + 10);
            this.cycleName = temp.substring(0, temp.indexOf(" "));
            temp = temp.substring(this.cycleName.length + 1);
            temp = temp.substring(0, (temp.indexOf(" ") > 0)? temp.indexOf(" "): temp.length);
            this.cycleValues = temp.split("|");
            inString = inString.replace("cycleName=" + this.cycleName + " " + temp + "", "");
         }
         //Number format not yet functional.
         index = inString.indexOf("numberFormat=\"");
         if(index > -1) {
            temp = inString.substring(index + 14);
            temp = temp.substring(0, temp.indexOf("\""));
            inString = inString.replace("numberFormat=" + temp, "");
            temp = temp.split(".");
           this.config.numberFormat = {intMask:temp[0], precisionMask:false};
            if(temp.length > 1) {
               this.config.numberFormat.precisionMask = temp[1];
            }
         }

         index = inString.indexOf("dateFormat=\"");
         if(index > -1) {
            temp = inString.substring(index + 12);
            temp = temp.substring(0, temp.indexOf("\""));
            if(typeof Date.prototype.format == 'function') {
               this.config.dateFormat = temp;
               this.dateConverter = new Date();
            }
            inString = inString.replace("dateFormat=" + temp, "\"");
         }

         index = inString.indexOf("maxlen=");
         if(index > -1) {
            temp = inString.substring(index + 7);
            temp = temp.substring(0, (temp.indexOf(" ") > 0)? temp.indexOf(" "): temp.length);
            this.config.maxlen = parseInt(temp);
            this.config.chopTo = this.config.maxlen;
            inString = inString.replace("maxlen=" + temp, "");
         }

         index = inString.indexOf("maxwords");
         if(index > -1) {
            this.config.maxwords = true;

            inString = inString.replace("maxwords");
         }
         index = inString.indexOf("maxchop=");
         if(index > -1) {
            temp = inString.substring(index + 8);
            temp = temp.substring(0, (temp.indexOf(" ") > 0)? temp.indexOf(" "): temp.length);
            this.config.maxchop = parseInt(temp);
            if(this.config.maxlen)
               this.config.chopTo = this.config.maxlen - this.config.maxchop;
            inString = inString.replace("maxchop=" + temp, "");
         }
         index = inString.indexOf("htmlentities");
         if(index > -1) {
            temp = inString.substr(index, 12);
            this.config.htmlentities = true;
            inString = inString.replace("htmlentities", "");
         }
         index = inString.indexOf("striphtml");
         if(index > -1) {
            temp = inString.substr(index, 9);
            this.config.striphtml = true;
            inString = inString.replace("striphtml", "");
         }
         index = inString.indexOf("collapsewhite");
         if(index > -1) {
            temp = inString.substr(index, 13);
            this.config.collapsewhite = true;
            inString = inString.replace("collapsewhite", "");
         }
         index = inString.indexOf("maxnohtml");
         if(index > -1) {
            this.config.maxnohtml = true;
            inString = inString.replace("maxnohtml", "");
         }
         index = inString.indexOf("uppercaseFirst");
         if(index > -1) {
            this.config.caseConvert = 'uppercaseFirst';
            inString = inString.replace("uppercaseFirst", "");
         }
         index = inString.indexOf("uppercase");
         if(index > -1) {
            this.config.caseConvert = 'uppercase';
            inString = inString.replace("uppercase", "");
         }
         index = inString.indexOf("lowercase");
         if(index > -1) {
            this.config.caseConvert = 'lowercase';
            inString = inString.replace("lowercase", "");
         }
         //bind our discovered text configuration transforms - the bind is order dependent!
         if(this.config.striphtml) {
            this.transforms.push(this.stripHTML);
         }
         if(this.config.maxlen || this.config.htmlentities) {
            this.transforms.push(this.transMaxEntities);
         }
         if(this.config.numberFormat) {
            this.transforms.push(this.transNumberFormat);
         }
         if(this.config.dateFormat) {
            this.transforms.push(this.transDateFormat);
         }
         if(this.config.caseConvert) {
            this.transforms.push(this.transCase);
         }

   }
}


Snippet.prototype.stripHTML = function (inHTML) {
   return inHTML.replace(/(<([^>]+)>)/ig,"");
}


Snippet.prototype.transMaxEntities = function(obj) {
  if(this.config.maxlen && (obj.length > this.config.maxlen)) {
    if(this.config.maxwords) {
      var whiteIndex = obj.substring(0, (this.config.chopTo) + 1).lastIndexOf(" ");
      var nbspIndex = obj.substring(0, this.config.chopTo + 6).lastIndexOf("&nbsp;");
      if(whiteIndex == this.config.chopTo - 1 || nbspIndex == this.config.chopTo - 1) {
        obj = obj.substring(0, this.config.chopTo);
      } else {
        if(whiteIndex > nbspIndex && whiteIndex > 0) {
          obj = obj.substring(0, whiteIndex);
        }
        else if(nbspIndex > 0) {
          obj = obj.substring(0, nbspIndex);
        }
        else {
          obj = obj.substring(0, this.config.chopTo);
        }
      }
    } else {
      obj = obj.substring(0, this.config.chopTo);
    }
    /*we perform the htmlentities check and append 'maxend' AFTER because we don't want the maxend string to be transformed (there may be html in it)*/
    obj = (this.config.htmlentities)? this.htmlentities(obj) + this.config.maxend:obj + this.config.maxend;
  } else if(this.config.htmlentities) {
    obj = this.htmlentities(obj);
  }
  return obj;
}

Snippet.prototype.transNumberFormat = function(obj) {
   var out = '';
   obj = obj.split('.');
   if(obj[0].charAt(0) == '-') {
      out = '-';
      obj[0] = obj[0].substring(1);
   }
   out += this.config.numberFormat.intMask.substring(0, (this.config.numberFormat.intMask.length - obj[0].length)) + obj[0];
   if(this.config.numberFormat.precisionMask) {
      if(obj.hasOwnProperty(1)) {
         out += '.' + (obj[1].substring(0, this.config.numberFormat.precisionMask.length) + this.config.numberFormat.precisionMask).substring(0, this.config.numberFormat.precisionMask.length);
      } else {
         out += '.' + this.config.numberFormat.precisionMask;
      }
   }
   obj = out;
   return obj;
}

Snippet.prototype.transDateFormat = function(obj) {
  if(this.config.dateFormat) {
    if(! isNaN (obj-0)) {
      this.dateConverter.setTime(obj);
    } else {
      this.dateConverter.setTime(Date.parse(obj));
    }
    obj = this.dateConverter.format(this.config.dateFormat);
   }
  return obj;
}

Snippet.prototype.transCase = function(obj) {
  switch(this.config.caseConvert) {
    case 'uppercase' :
      obj = obj.toUpperCase();
      break;
    case 'lowercase' :
      obj = obj.toLowerCase()
      break;
    case 'uppercaseFirst' :
      obj = obj.substr(0,1).toUpperCase() + obj.substring(1);
      break;
  }
  return obj;
}

/**
	*	Key event evaluation object (perform javascript on a keystroke event)
	*
	*	NOTE: binding the processKey event using jQuery or in areas where scope/context(namespace) may be ambiguous binding needs to be wrapped in a function
	*	example: $("#groups_display_label").keyup( function(e) {keyWatcher.processKey(e); } ); It may be easier to use Orange-J's 'listen' binding function
   *	which wraps the KeyListener class and assures appropriate context.
   *
   *	While there are quite a few options for configuring KeyListener, It's broken down to be as easy/modular as possible.
   *  The config object has only 4 main elements
   *  * keyCode
   *  * chars
   *  * regEx
   *  * element
   *  Each of these is optional, and they all have nearly identical settings. Master one, and you've mastered the rest.
	*
	* @param inConfig	-required-		//all are optional
	*	.keyCode = {}
	*	.keyCode.13. = (function) ||  (string)
   *	.keyCode.27, 13, *some key code* = (function) || (string) - to be called or evaluated
	*           //the integer number  of a Character keyCode.  Add as many as you want
	*           functions will be passed 2 arguments:
	*           1. The event that triggered the call
	*           2. The listener object (where config options including htmlID will be available off of .config[optName]
	*		duplicating this for an eval string would be the string 'somefunc(e, this)'
	*  .keyCode.onMatch
   *  .keyCode.onMatchDelay
   *  .keyCode.onMatchPreventDefault
   *  .keyCode.onFailed
   *  .keyCode.onFaildPreventDefault
   *
	* 	.element =(DOM Object) - required only for regex
	*           The DOM INPUT element to use for regex expressions.
	*
	* Additional information
	* 	If you want 'no action' performed on some keystrokes when a default action is specified, simply assign and
	*	empty string to that keycode, the same for the .invalidAction argument
        *       inConfig = {'defaultAction':'myfunction()', 27:"$('#somefield').val('')", 9:''}
	*
	*/
function KeyListener(inConfig){
   this.delayedAction = false;
   this.config = inConfig;
   if(!this.config.hasOwnProperty("keyCode") || !this.config.keyCode) {
      this.config.keyCode = false;
   } else {
      if(!this.config.keyCode.hasOwnProperty("onMatch"))                  this.config.keyCode.onMatch = false;
      if(!this.config.keyCode.hasOwnProperty("onMatchDelay"))             this.config.keyCode.onMatchDelay = false;
      if(!this.config.keyCode.hasOwnProperty("onMatchPreventDefault"))    this.config.keyCode.onMatchPreventDefault = false;
      if(!this.config.keyCode.hasOwnProperty("onFailed"))                 this.config.keyCode.onFailed = false;
      if(!this.config.keyCode.hasOwnProperty("onFailedPreventDefault"))   this.config.keyCode.onFailedPreventDefault = false;
   }
   if(!this.config.hasOwnProperty("chars") || !this.config.chars) {
      this.config.chars = false;
   } else {
      if(!this.config.chars.hasOwnProperty("onMatch"))                this.config.chars.onMatch = false;
      if(!this.config.chars.hasOwnProperty("onMatchDelay"))           this.config.chars.onMatchDelay = false;
      if(!this.config.chars.hasOwnProperty("onMatchPreventDefault"))  this.config.chars.onMatchPreventDefault = false;
      if(!this.config.chars.hasOwnProperty("onFailed"))               this.config.chars.onFailed = false;
      if(!this.config.chars.hasOwnProperty("onFailedPreventDefault")) this.config.chars.onFailedPreventDefault = false;
   }
   if(!this.config.hasOwnProperty("regEx") || !this.config.regEx) {
      this.config.regEx = false;
   } else {
      if(!this.config.regEx.hasOwnProperty("expr")) {
         alert("listener:ERROR: config.regEx.expr is missing. Regular expression actions disabled;");
         this.config.regEx = false;
      }
      if(!this.config.hasOwnProperty("element")) alert("listener:WARNING: config.regEx requires config.element be  the listened DOM element (use document.getElementById )")
      if(!this.config.regEx.hasOwnProperty("onMatch"))                this.config.regEx.onMatch = false;
      if(!this.config.regEx.hasOwnProperty("onMatchDelay"))           this.config.regEx.onMatchDelay = false;
      if(!this.config.regEx.hasOwnProperty("onMatchPreventDefault"))  this.config.regEx.onMatchPreventDefault = false;
      if(!this.config.regEx.hasOwnProperty("onFailed"))               this.config.regEx.onFailed = false;
      if(!this.config.regEx.hasOwnProperty("onFailedPreventDefault")) this.config.regEx.onFailedPreventDefault = false;
   }
   if(!this.config.hasOwnProperty("defaultAction") || !this.config.defaultAction) {
      this.config.defaultAction = false;
   }
/*
   if(!this.config.hasOwnProperty("defaults") || !this.config.defaults) {
      this.config.defaults = false;
   } else {
      if(!this.config.defaults.hasOwnProperty("expr")) {
         alert("listener:ERROR: config.regEx.expr is missing. Regular expression actions disabled;");
         this.config.regEx = false;
      }
      if(!this.config.defaults.hasOwnProperty("onMatch"))                this.config.defaults.onMatch = false;
      if(!this.config.defaults.hasOwnProperty("onMatchDelay"))           this.config.defaults.onMatchDelay = false;
      if(!this.config.defaults.hasOwnProperty("onMatchPreventDefault"))  this.config.defaults.onMatchPreventDefault = false;
      if(!this.config.defaults.hasOwnProperty("onFailed"))               this.config.defaults.onFailed = false;
      if(!this.config.defaults.hasOwnProperty("onFailedPreventDefault")) this.config.defaults.onFailedPreventDefault = false;
   }*/
}

KeyListener.prototype.executeAction = function(e, inAction) {
   switch(typeof(inAction)) {
      case "string" :
         eval(inAction);
         break;
      case "function" :
         inAction.call(this, e); // this is supposed to be the key listener instance
         break;
   }
}

/**
	* Processes the keyboard input key value passed to it.
	*
	* @param	e			Key event we are going to process
	**/
KeyListener.prototype.processKey = function( e ){
   clearTimeout(this.delayedAction);

   var action = false;
   var actionDelay = false;
   var keyCode = (e.keyCode)?e.keyCode:e.which;
   var character = String.fromCharCode(keyCode);
   var matched     = false;
   var preventDefault = false;
   if(this.config.keyCode) {
      if(this.config.keyCode.hasOwnProperty(keyCode)) {
         matched = true;
         if(this.config.keyCode.onMatch)
            action = this.config.keyCode.onMatch;
         switch(typeof this.config.keyCode[keyCode]) {
            case "string" :
            case "function" :
               action = this.config.keyCode[keyCode];
               break;
            case "boolean" :
               if(!this.config.keyCode[keyCode])
                  action = false;
         }

         actionDelay = this.config.keyCode.onMatchDelay;
         preventDefault = this.config.keyCode.onMatchPreventDefault;
      } else {
         action = this.config.keyCode.onFailed;
         preventDefault = this.config.keyCode.onFailedPreventDefault;
      }
   }

   if(!matched && this.config.chars) {
      if(this.config.chars.hasOwnProperty(character)) {
         matched = true;
         if(this.config.keyCode.onMatch)
            action = this.config.keyCode.onMatch;
         switch(typeof this.config.keyCode[keyCode]) {
            case "string" :
            case "function" :
               action = this.config.keyCode[keyCode];
               break;
            case "boolean" :
               if(!this.config.keyCode[keyCode])
                  action = false;
         }
         actionDelay = this.config.chars.onMatchDelay;
         preventDefault = this.config.chars.onMatchPreventDefault;
      } else {
         action = this.config.chars.onFailed;
         preventDefault = this.config.chars.onFailedPreventDefault;
      }
   }

   if(!matched && this.config.regEx) {
      var newval = this.config.element.value.substring(0, this.config.element.selectionStart);
      newval += character;
      newval += this.config.element.value.substring(this.config.element.selectionEnd);
      if(this.config.regEx.expr.test(newval) ) {
         action = this.config.regEx.onMatch;
         actionDelay = this.config.regEx.onMatchDelay;
         preventDefault = this.config.regEx.onMatchPreventDefault;
      } else {
         if(this.config.regEx.onFailed) action = this.config.regEx.onFailed;
         if(this.config.regEx.onFailedPreventDefault) preventDefault = this.config.regEx.onFailedPreventDefault;
      }
      delete newval;
   }

   if(!matched && this.config.defaultAction) {
      action = this.config.defaultAction;
   }

   if(preventDefault) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
   }

   if(action) {
      if(!actionDelay) {
         this.executeAction(e, action);
      } else {
         var listener = this;
         this.delayedAction = setTimeout(function() {
            listener.executeAction(e, action);
         }, actionDelay
         );
      }
   }
   delete matched, action,actionDelay,keyCode,character,preventDefault;
}

KeyListener.prototype.prevent = function(e, inPrevent) {
   switch(inPrevent) {
      case "both" :
      case "default" :
         if (e.preventDefault) e.preventDefault();
         if(inPrevent != "both") break;
      case "propagation" :
         if (e.stopPropagation) e.stopPropagation();
   }
}


//BEGIN: JQUERY INTEGRATION
if(typeof(jQuery) == "function") {
   //ORANGE-J NAMESPACE
   jQuery.oj = {
      //variables
      vars:{
         regex:{
            email: /^([A-Za-z0-9_\+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
         },
         slReady:false

      },
      //BEGIN jQuery TEMPLATE Functions
      sl:new SnippetLib(),

      snippet: function(inTPName, inElementHash) {
         return(jQuery.oj.sl.fill(inTPName, inElementHash));
      },

      snippetString: function(inSnippetString, inElementHash) {
         return(jQuery.oj.sl.fillString(inSnippetString, inElementHash));
      },

      hasSnippet: function(inName) {
         return(jQuery.oj.sl.has(inName));
      },

      snippetReady: function(inFunction) {
         if(jQuery.oj.vars.slReady) {
            inFunction();
         } else {
            setTimeout(function() {
               jQuery.snippetReady(inFunction);
            }, 250);
         }
      },

      setSnippetLib: function(inSnippets) {
         jQuery.oj.sl.add(inSnippets)
      },


      addSnippet: function(inName, inStr) {
         jQuery.oj.sl.add(inName, inStr)
      },


      /**
       * eval used in this function because closures make the value of 'i' the last value assigned for all return function calls (results in assigning templates to random names (or just the last name)
       */
      getSnippets: function(inSnippetURLs, getSnippetCB) {
         if(typeof inSnippetURLs == "object")
            for(var i in inSnippetURLs) {
               if(inSnippetURLs.hasOwnProperty(i)) {
                  eval("jQuery.ajax({type:'GET', url:inSnippetURLs[i], success: function(snippet) { jQuery.oj.sl.add(\"" + i + "\", snippet); if(typeof getSnippetCB == 'function') getSnippetCB(\"" + i + "\")}, error: function(XMLHttpRequest, textStatus, errorThrown){ if(typeof getSnippetCB == 'function') getSnippetCB(\"" + i + "\", false); jQuery.log('error:' + textStatus + ' ' + errorThrown);}});");
               }
            }
         else {
            jQuery.oj.vars.slReady = false;
            jQuery.ajax({
               type:'GET',
               url:inSnippetURLs,
               success: function(snippet) {
                  jQuery.oj.sl.add(snippet);
                  if(typeof getSnippetCB == 'function')
                     getSnippetCB()
               },
               error: function(XMLHttpRequest, textStatus, errorThrown){
                  if(typeof getSnippetCB == 'function') {
                     getSnippetCB(false);
                  }
                  jQuery.log('error:' + textStatus + ' ' + errorThrown);
               }
            });
         }
      },


      //END jQuery SNIPPET Functions

      //takes an object and returns a numerically indexed list
      attrList: function(inObj, inConfig) {
         var retList = [];
         for(var i in inObj) {
            if(inObj.hasOwnProperty(i)) {
               retList.push(i);
            }
         }
         delete i;
         return(retList);
      },


      //jQuery FORM Functions
      fillForm: function(inObj, inPrefix, inSuffix) {
         var prefix = (typeof(inPrefix) != "undefined")? inPrefix : "";
         var suffix = (typeof(inSuffix) != "undefined")? inSuffix : "";

         for(var i in inObj) {
            if(inObj.hasOwnProperty(i)) {
               jQuery("#" + prefix + i + suffix).val(inObj[i]);
            }
         }
         delete i, prefix;
      },

      /**
       *  inDOMPrefix/config
       *  {
       *    domPrefix:'',
       *    domSuffix:'',
       *    stripPrefix:(true)/false
       *    stripSuffix:(true)/false
       */
      objFromDom: function(inFormIDList, inDOMPrefix, inDOMSuffix) {
         var config = {
            DOMPrefix:'', 
            DOMSuffix:'', 
            stripPrefix:true, 
            stripSuffix:true
         };

         if(typeof inDOMPrefix == "object") {
            jQuery.extend(config, inDOMPrefix);
         } else {
            if(typeof inDOMPrefix == "string") config.DOMPrefix = inDOMPrefix;
            if(typeof inDOMSuffix == "string") config.DOMSuffix = inDOMSuffix;
         }

         //make this handle the object innput for 'inDOMPRefix'
         var obj = {};
         config.stripPrefix = (config.stripPrefix)? '' : config.DOMPrefix;
         config.stripSuffix = (config.stripSuffix)? '' : config.DOMSuffix;

         for(var i in inFormIDList) if(inFormIDList.hasOwnProperty(i)) {
            obj[config.stripPrefix + inFormIDList[i] + config.stripSuffix] = jQuery("#" + config.DOMPrefix + inFormIDList[i] + config.DOMSuffix).val();
         }
         return(obj);
      },


      ofd: function(inFormIDList, inDOMPrefix, inDOMSuffix) {
         return(jQuery.oj.objFromDom(inFormIDList, inDOMPrefix, inDOMSuffix));
      },

      //jQuery UTIL functions
      log: function() {
         if(typeof(console) != "undefined") {
            if(typeof(console.log) == "function") {
               for(var i = 0; i < arguments.length; i++) {
                  console.log(arguments[i]);
               }
               return true;
            }
         }
         return false;
      },

      urlParam: function(param, inDefault) {
         return this.urlArg(window.location.href, param, inDefault);
      },
      
      /**
       * Returns (in order of preference) 
       * 1. the requested url parameter's value
       * 2. inDefault
       * 3. false
       * 
       * url         - required -   url from which to extract the value
       * param       - optional -   the name of the parameter 
       *                            If param is not passed, returns a JS Object
       *                            representation of all the parameters in the url
       * inDefault   = optional -   default value if the parameter is not found
       *                            If in default is not passed and 'param' is
       */
      urlArg: function(url, param, inDefault) {
         url = jQuery.oj.urlParse(url);
         if(typeof param == "undefined") return url;
         if(url.hasOwnProperty(param)) return url[param];
         if(typeof inDefault != "undefined") return inDefault;
         return false;
      },
    
          
      /**
       * accepts a url string and de-serializes it. String does not need a 
       * domain or '?', but arguments may not have '?' 
       * array arguments are returned as arrays.
       * ex:
       * http://123.com?a=1&b=2&c[]=3&c[]=4&d=hello
       * response
       * {
       *  a:'1',
       *  b:'2',
       *  c:['3','4'],
       *  d:'hello'
       * }
       */
      urlParse : function(inURL) {
         var args, url = inURL.split('?');
         url.args = {};         
         if(url.length == 1) {
         	return {};
            /* url.shift(''); */
         } else {
	         
	         if(url[1].indexOf("#") > -1) {
	            url.args['#'] = url[1].substring(url[1].indexOf("#") + 1);
	            url[1] = url[1].slice(0, url[1].indexOf("#"));
	         }         
	         url.argList = url[1].split("&");
	         for(var i in url.argList) if(url.argList.hasOwnProperty(i)) {
	            url.argList[i] = url.argList[i].split("=");
	            if(url.argList[i][0].indexOf("[]") == url.argList[i][0].length - 2 ) {
	               args = url.argList[i][0].substring(0, url.argList[i][0].length - 2);
	               if(!url.args.hasOwnProperty(args)) {
	                  url.args[args] = [];
	               }
	               if(url.argList[i].length > 1) {
	                  url.args[args].push(url.argList[i][1]);
	               }
	            } else {
	               url.args[url.argList[i][0]] = '';
	               if(url.argList[i].length > 1) {
	                  url.args[url.argList[i][0]] = url.argList[i][1];
	               }       
	            }
	         }
	         return url.args;
     	}
      },

      /**
       * Counts the total number of properties for a given object
       *
       *
       * @param inObj the object to be 'counted'
       * @param inConfig -optional-
       * @return int|array
       */
      len: function(inObj, inConfig) {
         var config = jQuery.extend({
            all:false,
            getArray:false,
            filterOut:["function"]
         }, inConfig);
         var ret = [];

         var j, i, elType, count;
         for(i in inObj) if(config.all || inObj.hasOwnProperty(i)) {
            elType = typeof inObj[i];
            count = true;
            for(j = 0; j < config.filterOut.length; j++) {
               if(elType == config.filterOut[j]) {
                  count = false;
                  break;
               }
            }
            if(count) {
               ret.push(inObj[i]);
            }
         }
         if(config.getArray) return ret;
         return ret.length;

      },

      /**
       * creates a response object {ok:<boolean>, data:<data>,message:<string>}
       * all arguments optional. Defaults are {ok:true,data:'',message:''}.
       * can pass only 'data' argument ro(<data>).
       */
      ro: function(ok, data, message) {
         var resp = {
            ok:true,
            data:'',
            message:''
         };
         if(typeof message == 'string') {
            resp.message = message;
         }
         if(typeof data != 'undefined') {
            resp.data = data;
         }
         switch(typeof ok) {
            case 'undefined' :
               return resp;
            case 'boolean' :
               resp.ok = ok;
               return resp;
            default : //is some data
               resp.data = ok;
               return resp;
         }
      },


      /****
         * Serializes a javscript object with named attributes. Attribute names will be utilized in the url.  NOTE strings and numbers supported only!
         * @param object inObject			- required -
         * @param string inAddPrefix 		- optional - prefix the names in the returned url with this
         * @param object inFilter 			- optional - filter on this object, only the attribute names are important. values are ignored
         * @param boolean inFilterPositive 	- optional - is the filter positive (allowing only those attributes that exist in the filter to be included)
         *													or negative (any attribute that is in the filter will be excluded)
         */
      serialize: function(inObject, inAddPrefix, inFilter, inFilterPositive) {
         var urlString = "";
         var prefix = "";
         if(typeof(inAddPrefix) != "undefined") {
            prefix = inAddPrefix;
         }
         if(typeof(inFilter) == "undefined") {
            for(i in inObject) {
               if(inObject.hasOwnProperty(i))
                  urlString += "&" + prefix + i + "=" + inObject[i];
            }
         } else if (typeof(inFilterPositive) == "boolean" && !inFilterPositive) {
            for(i in inObject) {
               if(inObject.hasOwnProperty(i))
                  if(!inFilter.hasOwnProperty(i))
                     urlString += "&" + prefix + i + "=" + inObject[i];
            }
         } else {
            for(i in inObject) {
               if(inObject.hasOwnProperty(i))
                  if(inFilter.hasOwnProperty(i))
                     urlString += "&" + prefix + i + "=" + inObject[i];
            }
         }
         return(urlString);
      }, 


      /****
         * Serialize a javascript object into a url list representation
         * @param object inList			- required - the object/list to be serialized
         * @param string inListName 		- required - the name to be used for the serialized list
         */
      serializeList: function(inList, inListName) {
         var urlString = "";
         for(i in inList) {
            if(inList.hasOwnProperty(i))
               urlString += "&" + inListName + "[]=" + inList.i;
         }
         return(urlString);
      }, 
      
      //jQuery VALIDATE Functions
      /**
          * Adds a regular expression to the library, or tests a string on a regular expression already assigned to the library
          *
          * Add a regular expression
          * inReName = the name of the regular expression once added to the library
          * inRegex 	= the regular expression to be added
          *
          * Test a string
          * inReName = the name of the regular expression already in the library
          * inRegex  = the string to test against the regular expression
          *
          * returns boolean
          */
      validate: function(inReName, inRegex) {
         if(typeof(inRegex) == "string") {
            if(jQuery.oj.vars.regex.hasOwnProperty(inReName))
               return(jQuery.oj.vars.regex[inReName].test(inRegex));
         }
         if(typeof(inRegex) != "undefined" && inRegex.constructor == RegExp) {
            jQuery.oj.vars.regex[inReName] = inRegex;
            return(true);
         }
         return(false);
      }
   }
   /*
    * candidate for 2.4.3 - short-term for urlParse().attrName
   jQuery.fn.urlArg = function(param, inDefault) {
      url = jQuery.oj.urlParse(url);
      if(url.hasOwnProperty(param)) return url[param];
      if(typeof inDefault != "undefined") return inDefault;
      return false;
   }*/

   //BEGIN jQuery Methods (things that operate on the dom)
   jQuery.fn.urlParse = function(inAttr) {
      var url = window.location.href;
      if($(this).length > 0) {
         if(typeof inAttr == 'undefined') {
            url = $(this).attr("href");
         } else {
            url = $(this).attr(inAttr);
         }
      } else if(typeof this.selector == "string" && this.selector.length > 0) {
         url = this.selector;
      }
      return jQuery.oj.urlParse(url);
   }


   //jQuery KEYLISTENER Methods
   jQuery.fn.listen = function(inConfig) {
      /* if(this.selector.indexOf("#") == 0 && typeof(inConfig.htmlID) == "undefined") {
         inConfig.htmlID = this.selector.substring(1);
      } */
      if(!inConfig.hasOwnProperty("element")) {
         inConfig.element = this;
      }
      var keyListener = new KeyListener(inConfig);

      switch(inConfig.keystroke) {
         case "keydown" :
            this.keydown( function(e) {
               keyListener.processKey(e);
            });
            break;
         case "keyup" :
            this.keyup( function(e) {
               keyListener.processKey(e);
            });
            break;
         case "keypress" :
         default :
            this.keypress( function(e) {
               //keyListener.element = this;
               keyListener.processKey(e);
            });
      }
      return(this);
   }

   //jQuery VALIDATE Methods
   /**
       * tests the matched element against a regular expression in the library
       * inRe = the name of the regular expression
       *
       *  returns mixed - false on fail, the value of the element on success
       */
   jQuery.fn.validate = function(inRe) {
      if(typeof(inRe) == "string") {
         if(jQuery.oj.vars.regex.hasOwnProperty(inRe)) {
            if(jQuery.oj.vars.regex[inRe].test(this.val())) {
               return(this.val());
            }
         }
         return(false);
      }
      return(false);
   }

   //jQuery SNIPPET Methods
   jQuery.fn.addSnippet= function(inName) {
      this.each(function(i, item) {
         if(typeof inName == "string")
            jQuery.oj.sl.add(inName, item.innerHTML);
         else
            jQuery.oj.sl.add(item.innerHTML);
      });
      return(this);
   }

   jQuery.fn.snippet = function(inTPName, inElementHash) {
      var snippet = jQuery.oj.sl.fill(inTPName, inElementHash);
      this.each(function(i, item) {
         if(item.tagName.toLowerCase() == "input" || item.tagName.toLowerCase() == "textarea") item.value = snippet;
         else item.innerHTML = snippet;
      }
      );
      return(this);
   }


   jQuery.fn.snippetAfter = function(inTPName, inElementHash) {
      var snippet = jQuery.oj.sl.fill(inTPName, inElementHash);
      this.after(snippet);
      return(this);
   }


   jQuery.fn.snippetAppend = function(inTPName, inElementHash) {
      var snippet = jQuery.oj.sl.fill(inTPName, inElementHash);
      this.append(snippet);
      return(this);
   };

   jQuery.fn.snippetBefore = function(inTPName, inElementHash) {
      var snippet = jQuery.oj.sl.fill(inTPName, inElementHash);
      this.before(snippet);
      return(this);
   }

   jQuery.fn.snippetPrepend = function(inTPName, inElementHash) {
      var snippet = jQuery.oj.sl.fill(inTPName, inElementHash);
      this.prepend(snippet);
      return(this);
   };

   jQuery.fn.snippetString = function(inSnippetString, inElementHash) {
      this.html(jQuery.oj.sl.fillString(inSnippetString, inElementHash));
      return(this);
   };


   //enable depricated functionality
   for(var ojfunc in jQuery.oj) if(jQuery.oj.hasOwnProperty(ojfunc) && typeof(jQuery.oj[ojfunc]) == 'function') {
      if(jQuery.hasOwnProperty(ojfunc) && (ojfunc != 'serialize')) {
         jQuery.oj.log("jQuery already has function: " + ojfunc);
      } else {
         switch (ojfunc) {
            case 'serialize' :
               jQuery.serializeObj = jQuery.oj[ojfunc];
               break;
            default :
               jQuery[ojfunc] = jQuery.oj[ojfunc];
         }

      }
   }

} else {
   sl = new SnippetLib();
}

//

// Simulates PHP's date function. Credit to Jac Wright & contributors http://jacwright.com/projects/javascript/date_format
Date.prototype.format = function(format) {
   var returnStr = '';
   var replace = Date.replaceChars;
   for (var i = 0; i < format.length; i++) {
      var curChar = format.charAt(i);
      if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
         returnStr += curChar;
      }
      else if (replace[curChar]) {
         returnStr += replace[curChar].call(this);
      } else if (curChar != "\\"){
         returnStr += curChar;
      }
   }
   return returnStr;
};

Date.replaceChars = {
   shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
   longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

   // Day
   d: function() {
      return (this.getDate() < 10 ? '0' : '') + this.getDate();
   },
   D: function() {
      return Date.replaceChars.shortDays[this.getDay()];
   },
   j: function() {
      return this.getDate();
   },
   l: function() {
      return Date.replaceChars.longDays[this.getDay()];
   },
   N: function() {
      return this.getDay() + 1;
   },
   S: function() {
      return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));
   },
   w: function() {
      return this.getDay();
   },
   z: function() {
      var d = new Date(this.getFullYear(),0,1);
      return Math.ceil((this - d) / 86400000);
   }, // Fixed now
   // Week
   W: function() {
      var d = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
   }, // Fixed now
   // Month
   F: function() {
      return Date.replaceChars.longMonths[this.getMonth()];
   },
   m: function() {
      return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
   },
   M: function() {
      return Date.replaceChars.shortMonths[this.getMonth()];
   },
   n: function() {
      return this.getMonth() + 1;
   },
   t: function() {
      var d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), 0).getDate()
   }, // Fixed now, gets #days of date
   // Year
   L: function() {
      var year = this.getFullYear();
      return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
   },	// Fixed now
   o: function() {
      var d  = new Date(this.valueOf());
      d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
      return d.getFullYear();
   }, //Fixed now
   Y: function() {
      return this.getFullYear();
   },
   y: function() {
      return ('' + this.getFullYear()).substr(2);
   },
   // Time
   a: function() {
      return this.getHours() < 12 ? 'am' : 'pm';
   },
   A: function() {
      return this.getHours() < 12 ? 'AM' : 'PM';
   },
   B: function() {
      return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
   }, // Fixed now
   g: function() {
      return this.getHours() % 12 || 12;
   },
   G: function() {
      return this.getHours();
   },
   h: function() {
      return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
   },
   H: function() {
      return (this.getHours() < 10 ? '0' : '') + this.getHours();
   },
   i: function() {
      return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
   },
   s: function() {
      return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
   },
   u: function() {
      var m = this.getMilliseconds();
      return (m < 10 ? '00' : (m < 100 ?
         '0' : '')) + m;
   },
   // Timezone
   e: function() {
      return "Not Yet Supported";
   },
   I: function() {
      return "Not Yet Supported";
   },
   O: function() {
      return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
   },
   P: function() {
      return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';
   }, // Fixed now
   T: function() {
      var m = this.getMonth();
      this.setMonth(0);
      var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
      this.setMonth(m);
      return result;
   },
   Z: function() {
      return -this.getTimezoneOffset() * 60;
   },
   // Full Date/Time
   c: function() {
      return this.format("Y-m-d\\TH:i:sP");
   }, // Fixed now
   r: function() {
      return this.toString();
   },
   U: function() {
      return this.getTime() / 1000;
   }
};
/*END:ORANGEJ ORANGE-J*/
/* 
 * note to developer who originally included this... do not paste jquery extensions within on another!
 * JQUERY EXTENSION: 			jsonp
*
* Google jQuery jsonp plug-in to enable error handling that jQuery doesn't provide for jsonp calls.
*
* If you're using jQuery alone to make x-domain jsonp calls, note that jQuery doesn't
* provide error handling for jsonp. So, timeouts and error params are useless. jsonp calls that die
* using jQuery do so silently. This plug-in solves that issue and provide caching.
*
* jquery.jsonp 2.1.4 (c)2010 Julian Aubourg | MIT License
* http://code.google.com/p/jquery-jsonp/
*
* Used for BBYOn Functionality
*/
(function(e,b){function d(){}function t(C){c=[C]}function m(C){f.insertBefore(C,f.firstChild)}function l(E,C,D){return E&&E.apply(C.context||C,D)}function k(C){return/\?/.test(C)?"&":"?"}var n="async",s="charset",q="",A="error",r="_jqjsp",w="on",o=w+"click",p=w+A,a=w+"load",i=w+"readystatechange",z="removeChild",g="<script/>",v="success",y="timeout",x=e.browser,f=e("head")[0]||document.documentElement,u={},j=0,c,h={callback:r,url:location.href};function B(C){C=e.extend({},h,C);var Q=C.complete,E=C.dataFilter,M=C.callbackParameter,R=C.callback,G=C.cache,J=C.pageCache,I=C.charset,D=C.url,L=C.data,P=C.timeout,O,K=0,H=d;C.abort=function(){!K++&&H()};if(l(C.beforeSend,C,[C])===false||K){return C}D=D||q;L=L?((typeof L)=="string"?L:e.param(L,C.traditional)):q;D+=L?(k(D)+L):q;M&&(D+=k(D)+encodeURIComponent(M)+"=?");!G&&!J&&(D+=k(D)+"_"+(new Date()).getTime()+"=");D=D.replace(/=\?(&|$)/,"="+R+"$1");function N(S){!K++&&b(function(){H();J&&(u[D]={s:[S]});E&&(S=E.apply(C,[S]));l(C.success,C,[S,v]);l(Q,C,[C,v])},0)}function F(S){!K++&&b(function(){H();J&&S!=y&&(u[D]=S);l(C.error,C,[C,S]);l(Q,C,[C,S])},0)}J&&(O=u[D])?(O.s?N(O.s[0]):F(O)):b(function(T,S,U){if(!K){U=P>0&&b(function(){F(y)},P);H=function(){U&&clearTimeout(U);T[i]=T[o]=T[a]=T[p]=null;f[z](T);S&&f[z](S)};window[R]=t;T=e(g)[0];T.id=r+j++;if(I){T[s]=I}function V(W){(T[o]||d)();W=c;c=undefined;W?N(W[0]):F(A)}if(x.msie){T.event=o;T.htmlFor=T.id;T[i]=function(){/loaded|complete/.test(T.readyState)&&V()}}else{T[p]=T[a]=V;x.opera?((S=e(g)[0]).text="jQuery('#"+T.id+"')[0]."+p+"()"):T[n]=n}T.src=D;m(T);S&&m(S)}},0);return C}B.setup=function(C){e.extend(h,C)};e.jsonp=B})(jQuery,setTimeout);

// Simulates PHP's date function. Credit to Jac Wright & contributors http://jacwright.com/projects/javascript/date_format
Date.prototype.format = function(format) {
	var returnStr = '';
	var replace = Date.replaceChars;
	for (var i = 0; i < format.length; i++) {
		var curChar = format.charAt(i);
		if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
			returnStr += curChar;
		}
		else if (replace[curChar]) {
			returnStr += replace[curChar].call(this);
		} else if (curChar != "\\"){
			returnStr += curChar;
		}
	}
	return returnStr;
};

Date.replaceChars = {
	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	// Day
	d: function() {return (this.getDate() < 10 ? '0' : '') + this.getDate();},
	D: function() {return Date.replaceChars.shortDays[this.getDay()];},
	j: function() {return this.getDate();},
	l: function() {return Date.replaceChars.longDays[this.getDay()];},
	N: function() {return this.getDay() + 1;},
	S: function() {return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));},
	w: function() {return this.getDay();},
	z: function() {var d = new Date(this.getFullYear(),0,1);return Math.ceil((this - d) / 86400000);}, // Fixed now
	// Week
	W: function() {var d = new Date(this.getFullYear(), 0, 1);return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);}, // Fixed now
	// Month
	F: function() {return Date.replaceChars.longMonths[this.getMonth()];},
	m: function() {return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);},
	M: function() {return Date.replaceChars.shortMonths[this.getMonth()];},
	n: function() {return this.getMonth() + 1;},
	t: function() {var d = new Date();return new Date(d.getFullYear(), d.getMonth(), 0).getDate()}, // Fixed now, gets #days of date
	// Year
	L: function() {var year = this.getFullYear();return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));},	// Fixed now
	o: function() {var d  = new Date(this.valueOf());d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);return d.getFullYear();}, //Fixed now
	Y: function() {return this.getFullYear();},
	y: function() {return ('' + this.getFullYear()).substr(2);},
	// Time
	a: function() {return this.getHours() < 12 ? 'am' : 'pm';},
	A: function() {return this.getHours() < 12 ? 'AM' : 'PM';},
	B: function() {return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);}, // Fixed now
	g: function() {return this.getHours() % 12 || 12;},
	G: function() {return this.getHours();},
	h: function() {return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);},
	H: function() {return (this.getHours() < 10 ? '0' : '') + this.getHours();},
	i: function() {return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();},
	s: function() {return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();},
	u: function() {var m = this.getMilliseconds();return (m < 10 ? '00' : (m < 100 ?
'0' : '')) + m;},
	// Timezone
	e: function() {return "Not Yet Supported";},
	I: function() {return "Not Yet Supported";},
	O: function() {return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';},
	P: function() {return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';}, // Fixed now
	T: function() {var m = this.getMonth();this.setMonth(0);var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');this.setMonth(m);return result;},
	Z: function() {return -this.getTimezoneOffset() * 60;},
	// Full Date/Time
	c: function() {return this.format("Y-m-d\\TH:i:sP");}, // Fixed now
	r: function() {return this.toString();},
	U: function() {return this.getTime() / 1000;}
};


/* ***
 Name: Nav
 Version: 1.0
 Version History:
	1.0 - Original test code.
 Description: Navigation JavaScript for BestBuy.com.
 Author: Nate Armagost - nate.armagost@bestbuy.com
*** */
"use strict";
var Nav = {
	ie6: false,
	/* The main navigation - Products, Services, Shops & Deals, Gifts. */
	confignavitems: {
		sensitivity: 7,
		interval: 50,
		over: function () {
			$(this).addClass("sfhover");
			$(this).addClass("nav-hover");
		},
		timeout: 120,
		out: function () {
			$(this).removeClass("sfhover");
			$(this).removeClass("nav-hover");
		}
	},
	confignav: { /* All of the navigation as a whole. */
		sensitivity: 7,
		interval: 100,
		over: function () {},
		timeout: 200,
		out: function () {}
	},
	configsubnavitems: { /* The navigation under Products. */
		sensitivity: 10,
		interval: 90,
		over: function () {
			$(this).parent().parent().find("li").removeClass("sfhover");
			$(this).parent("li").addClass("sfhover");
			$(this).parent().parent().find("li").removeClass("nav-hover");
			$(this).parent("li").addClass("nav-hover");
		},
		timeout: 150,
		out: function () {
		}
	},
	configpronav: { /* The navigation under Products. */
		sensitivity: 10,
		interval: 90,
		over: function () {
		},
		timeout: 250,
		out: function () {
			$(this).children("li").removeClass("sfhover");
			$(this).children("li").removeClass("nav-hover");
		}
	},
	checkIE: function () {
		if ($.browser.msie) {
			if (parseInt($.browser.version, 10) === 6) {
				ie6 = true;
			}
		}
	},
	init: function () {
		Nav.checkIE();
		if ($("#nav").length > 0) {
		$("#nav > li").hoverIntent(Nav.confignavitems); /* The main navigation - Products, Services, Shops & Deals, Gifts. */
		$("#nav").hoverIntent(Nav.confignav); /* All of the navigation as a whole. */
		$("#nav ul > li h4").hoverIntent(Nav.configsubnavitems); /* The navigation under Products. i.e. TV & Video, Audio, Car & GPS. */
		$("#nav .nav-pro > ul").hoverIntent(Nav.configpronav); /* Only the Product Nav */
		$("#nav a.nav-pro, #nav a.nav-svc, #nav a.nav-sho, #nav a.nav-gif").click(function() {return false;});
		$("#nav").removeClass("nav-njs");
		}


		/* New CA functionality */ /*
		if ((bbyUrl == "http://bby-qa2.bestbuy.com/site/olspage.jsp?") || (bbyUrl == "http://preview-qa2.bestbuy.com/site/olspage.jsp?")) {
			$("#hdr li.hdr-acc").hoverIntent(
				function () {
					$(this).addClass("sfhover");
				},
				function () {
					$(this).removeClass("sfhover");
				}
			);

			try {
				if (track.recognized == "Anonymous"){

					$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Sign in</a>&nbsp;to view your account details, including Wish Lists, Reward Zone information and more.</li></ul>');
				}
				else if (track.recognized == "Recognized"){
					if ((track.rzSrc =="expl") || (track.rzSrc =="impl") || (track.rzSrc =="both")) {
						if ((track.rzLink == "no") || (track.rzLink == "rme")) {

							$("#hdr li.hdr-acc").addClass("hdr-alr");
							$("#welcome").css("left", "-171px");
							$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li class="hdr-msg"><a href="' + secureBByUrl + 'id=pcat17801&amp;type=page">Link accounts to see your Reward Zone information</a></li><li class="hdr-lnk"><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Manage Your Info</a></li><li><a href="' + secureBByUrl + 'id=pcat17038&type=page">Orders</a></li><li><a href="' + secureBByUrl + 'id=pcat17082&amp;type=page">Reward Zone&reg;</a></li><li><a href="' + secureBByUrl + 'id=pcat17201&type=page">Wish Lists</a></li></ul>');
						}
						if ((track.rzLink == "yes") || (track.rzLink == "never")) {

							$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Manage Your Info</a></li><li><a href="' + secureBByUrl + 'id=pcat17038&type=page">Orders</a></li><li><a href="' + secureBByUrl + 'id=pcat17082&amp;type=page">Reward Zone&reg;</a></li><li><a href="' + secureBByUrl + 'id=pcat17201&type=page">Wish Lists</a></li></ul>');
						}
					}
					else {

						$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Sign in</a>&nbsp;to view your account details, including Wish Lists, Reward Zone information and more.</li></ul>');
					}
				}
				else if (track.recognized == "Authenticated"){
					if ((track.rzSrc =="expl") || (track.rzSrc =="impl") || (track.rzSrc =="both")) {
						if (track.rzLink == "no") {

							$("#hdr li.hdr-acc").addClass("hdr-alr");
							$("#welcome").css("left", "-171px");
							$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li class="hdr-msg"><a href="' + secureBByUrl + 'id=pcat17801&amp;type=page">Link accounts to see your Reward Zone information</a></li><li class="hdr-lnk"><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Manage Your Info</a></li><li><a href="' + secureBByUrl + 'id=pcat17038&type=page">Orders</a></li><li><a href="' + secureBByUrl + 'id=pcat17082&amp;type=page">Reward Zone&reg;</a></li><li><a href="' + secureBByUrl + 'id=pcat17201&type=page">Wish Lists</a></li></ul>');
						}
						else if ((track.rzLink == "yes") || (track.rzLink == "rme") || (track.rzLink == "never")) {

							$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Manage Your Info</a></li><li><a href="' + secureBByUrl + 'id=pcat17038&type=page">Orders</a></li><li><a href="' + secureBByUrl + 'id=pcat17082&amp;type=page">Reward Zone&reg;</a></li><li><a href="' + secureBByUrl + 'id=pcat17201&type=page">Wish Lists</a></li></ul>');
						}
					}
					else {

							$("#hdr li.hdr-acc").html('<a name="&lid=hdr_act" href="' + secureBByUrl + 'id=pcat17026&amp;type=page">My Account</a><ul><li><a href="' + secureBByUrl + 'id=pcat17026&amp;type=page">Manage Your Info</a></li><li><a href="' + secureBByUrl + 'id=pcat17038&type=page">Orders</a></li><li><a href="' + secureBByUrl + 'id=pcat17082&amp;type=page">Reward Zone&reg;</a></li><li><a href="' + secureBByUrl + 'id=pcat17201&type=page">Wish Lists</a></li></ul>');
					}
				}

			}
			catch(e){}
		} */


	}
};

/*************************************************************************************************************
* old KiosksmNum.js
*********************************************************************************************************** */

function getSnum(){var WshShell=new ActiveXObject("WScript.Shell");var sName=WshShell.ExpandEnvironmentStrings("%LOCATIONNUM%");return sName;}
function getMnum(){var WshShell=new ActiveXObject("WScript.Shell");var sLoc=WshShell.ExpandEnvironmentStrings("%COMPUTERNAME%");return sLoc;}

//BEGIN:COLORBOX
// ColorBox v1.3.17.2 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2011 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function ($, document, window) {
  var
  // ColorBox Default Settings.
  // See http://colorpowered.com/colorbox for details.
  defaults = {
    transition: "elastic",
    speed: 300,
    width: "600px", /* BBY Default */
    width: false,
    initialWidth: "600",

    innerWidth: false,
    maxWidth: false,
    height: false,
    /* initialHeight: "450",*/
    /* initialHeight:false, */
    initialHeight:"100", /*set to fix issues with wait icon persisting too long*/
    innerHeight: false,
    maxHeight: false,
    scalePhotos: true,
    /* scrolling: true, */
    scrolling: false, /* BBY Default */
    inline: false,
    html: false,
    iframe: false,
    fastIframe: true,
    photo: false,
    href: false,
    title: false,
    rel: false,
    opacity: 0.9,
    preloading: true,
    current: "image {current} of {total}",
    previous: "previous",
    next: "next",
    /* close: "close", */
    close: "<div>&#215;</div> <span>close</span>", /* BBY Default */
    open: false,
    returnFocus: true,
    loop: true,
    slideshow: false,
    slideshowAuto: true,
    slideshowSpeed: 2500,
    slideshowStart: "start slideshow",
    slideshowStop: "stop slideshow",
    onOpen: false,
    onLoad: false,
    onComplete: false,
    /* this was copied from old colorbox. Not sure if it's a customization or what.
    onComplete: function () {
      $("#cboxWrapper .cboxCl").css("display", "block");
    }, */
    onCleanup: false,
    onClosed: false,
    overlayClose: true,
    escKey: true,
    arrowKey: true,
        top: false,
        bottom: false,
        left: false,
        right: false,
        fixed: false,
        data: false
  },

  // Abstracting the HTML and event identifiers for easy rebranding
  colorbox = 'colorbox',
  prefix = 'cbox',
    boxElement = prefix + 'Element',

  // Events
  event_open = prefix + '_open',
  event_load = prefix + '_load',
  event_complete = prefix + '_complete',
  event_cleanup = prefix + '_cleanup',
  event_closed = prefix + '_closed',
  event_purge = prefix + '_purge',

  // Special Handling for IE
  isIE = $.browser.msie && !$.support.opacity, // Detects IE6,7,8.  IE9 supports opacity.  Feature detection alone gave a false positive on at least one phone browser and on some development versions of Chrome, hence the user-agent test.
  isIE6 = isIE && $.browser.version < 7,
  event_ie6 = prefix + '_IE6',

  // Cached jQuery Object Variables
  $overlay,
  $box,
  $wrap,
  $content,
  $topBorder,
  $leftBorder,
  $rightBorder,
  $bottomBorder,
  $related,
  $window,
  $loaded,
  $loadingBay,
  $loadingOverlay,
  $title,
  $current,
  $slideshow,
  $next,
  $prev,
  $close,
  $groupControls,

  // Variables for cached values or use across multiple functions
  settings,
  interfaceHeight,
  interfaceWidth,
  loadedHeight,
  loadedWidth,
  element,
  index,
  photo,
  open,
  active,
  closing,
    handler,
    loadingTimer,
    publicMethod;

  // ****************
  // HELPER FUNCTIONS
  // ****************

  // jQuery object generator to reduce code size
  function $div(id, cssText, div) {
    div = document.createElement('div');
    if (id) {
            div.id = prefix + id;
        }
    div.style.cssText = cssText || '';
    return $(div);
  }

  // Convert '%' and 'px' values to integers
  function setSize(size, dimension) {
    return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
  }

  // Checks an href to see if it is a photo.
  // There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
  function isImage(url) {
    return settings.photo || /\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(url);
  }

  // Assigns function results to their respective settings.  This allows functions to be used as values.
  function makeSettings(i) {
        settings = $.extend({}, $.data(element, colorbox));

    for (i in settings) {
      if ($.isFunction(settings[i]) && i.substring(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
          settings[i] = settings[i].call(element);
      }
    }

    settings.rel = settings.rel || element.rel || 'nofollow';
    settings.href = settings.href || $(element).attr('href');
    settings.title = settings.title || element.title;

        if (typeof settings.href === "string") {
            settings.href = $.trim(settings.href);
        }
  }

  function trigger(event, callback) {
    if (callback) {
      callback.call(element);
    }
    $.event.trigger(event);
  }

  // Slideshow functionality
  function slideshow() {
    var
    timeOut,
    className = prefix + "Slideshow_",
    click = "click." + prefix,
    start,
    stop,
    clear;
    if(typeof settings == "undefined" || !settings.hasOwnProperty('slideshow')) {
      //jQuery.log("unable to launch slideshow. 'settings' object is undefined");
	  if (console && console.log) {
			console.log("unable to launch slideshow. 'settings' object is undefined");
		}
      return false;
    }
    if (settings.slideshow && $related[1]) {
      start = function () {
        $slideshow
          .text(settings.slideshowStop)
          .unbind(click)
          .bind(event_complete, function () {
            if (index < $related.length - 1 || settings.loop) {
              timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
            }
          })
          .bind(event_load, function () {
            clearTimeout(timeOut);
          })
          .one(click + ' ' + event_cleanup, stop);
        $box.removeClass(className + "off").addClass(className + "on");
        timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
      };

      stop = function () {
        clearTimeout(timeOut);
        $slideshow
          .text(settings.slideshowStart)
          .unbind([event_complete, event_load, event_cleanup, click].join(' '))
          .one(click, start);
        $box.removeClass(className + "on").addClass(className + "off");
      };

      if (settings.slideshowAuto) {
        start();
      } else {
        stop();
      }
    } else {
            $box.removeClass(className + "off " + className + "on");
        }
  }

  function launch(target) {
    if (!closing) {

      element = target;

      makeSettings();

      $related = $(element);

      index = 0;

      if (settings.rel !== 'nofollow') {
        $related = $('.' + boxElement).filter(function () {
          var relRelated = $.data(this, colorbox).rel || this.rel;
          return (relRelated === settings.rel);
        });
        index = $related.index(element);

        // Check direct calls to ColorBox.
        if (index === -1) {
          $related = $related.add(element);
          index = $related.length - 1;
        }
      }

      if (!open) {
        open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

        $box.show();

        if (settings.returnFocus) {
          try {
            element.blur();
            $(element).one(event_closed, function () {
              try {
                this.focus();
              } catch (e) {
                // do nothing
              }
            });
          } catch (e) {
            // do nothing
          }
        }

        // +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like '.5'
        $overlay.css({"opacity": +settings.opacity, "cursor": settings.overlayClose ? "pointer" : "auto"}).show();

        // Opens inital empty ColorBox prior to content being loaded.
        settings.w = setSize(settings.initialWidth, 'x');
        settings.h = setSize(settings.initialHeight, 'y');
        publicMethod.position();

        if (isIE6) {
          $window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
            $overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
          }).trigger('resize.' + event_ie6);
        }

        trigger(event_open, settings.onOpen);

        $groupControls.add($title).hide();

        $close.html(settings.close).show();
      }

      publicMethod.load(true);
    }
  }

  // ****************
  // PUBLIC FUNCTIONS
  // Usage format: $.fn.colorbox.close();
  // Usage from within an iframe: parent.$.fn.colorbox.close();
  // ****************

  publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
    var $this = this;

        options = options || {};

    if (!$this[0]) {
      if ($this.selector) { // if a selector was given and it didn't match any elements, go ahead and exit.
                return $this;
            }
            // if no selector was given (ie. $.colorbox()), create a temporary element to work with
      $this = $('<a/>');
      options.open = true; // assume an immediate open
    }

    if (callback) {
      options.onComplete = callback;
    }

    $this.each(function () {
      $.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
      $(this).addClass(boxElement);
    });

        if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
      launch($this[0]);
    }

    return $this;
  };
 /*colorbox*/
  // Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
  // This preps ColorBox for a speedy open when clicked, and minimizes the burdon on the browser by only
  // having to run once, instead of each time colorbox is opened.
  publicMethod.init = function () {
    // Create & Append jQuery Objects
    $window = $(window);
    $box = $div().attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''});
    $overlay = $div("Overlay", isIE6 ? 'position:absolute' : '').hide();

    $wrap = $div("Wrapper");
    $content = $div("Content").append(
      $loaded = $div("LoadedContent", 'width:0; height:0; overflow:hidden'),
      $loadingOverlay = $div("LoadingOverlay").add($div("LoadingGraphic")),
      $title = $div("Title"),
      $current = $div("Current"),
      $next = $div("Next"),
      $prev = $div("Previous"),
      $slideshow = $div("Slideshow").bind(event_open, slideshow),
      $close = $div("Close")
    );
    $wrap.append( // The 3x3 Grid that makes up ColorBox
      $div().append(
        $div("TopLeft"),
        $topBorder = $div("TopCenter"),
        $div("TopRight")
      ),
      $div(false, 'clear:left').append(
        $leftBorder = $div("MiddleLeft"),
        $content,
        $rightBorder = $div("MiddleRight")
      ),
      $div(false, 'clear:left').append(
        $div("BottomLeft"),
        $bottomBorder = $div("BottomCenter"),
        $div("BottomRight")
      )
    ).children().children().css({'float': 'left'});

    $loadingBay = $div(false, 'position:absolute; width:9999px; visibility:hidden; display:none');

    $('body').prepend($overlay, $box.append($wrap, $loadingBay));

    $content.children()
    .hover(function () {
      $(this).addClass('hover');
    }, function () {
      $(this).removeClass('hover');
    }).addClass('hover');

    // Cache values needed for size calculations
    interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
    interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
    loadedHeight = $loaded.outerHeight(true);
    loadedWidth = $loaded.outerWidth(true);

    // Setting padding to remove the need to do size conversions during the animation step.
    $box.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();

        // Setup button events.
        // Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
        $next.click(function () {
            publicMethod.next();
        });

        $prev.click(function () {
            publicMethod.prev();
        });
        /*$close.click(function () {
            publicMethod.close();
        });*/

    $groupControls = $next.add($prev).add($current).add($slideshow);

    // Adding the 'hover' class allowed the browser to load the hover-state
    // background graphics in case the images were not part of a sprite.  The class can now can be removed.
    $content.children().removeClass('hover');

    $overlay.click(function () {
      if (settings.overlayClose) {
        publicMethod.close();
      }
    });

    // Set Navigation Key Bindings
    $(document).bind('keydown.' + prefix, function (e) {
            var key = e.keyCode;
      if (open && settings.escKey && key === 27) {
        e.preventDefault();
        publicMethod.close();
      }
      if (open && settings.arrowKey && $related[1]) {
        if (key === 37) {
          e.preventDefault();
          $prev.click();
        } else if (key === 39) {
          e.preventDefault();
          $next.click();
        }
      }
    });
  };

  publicMethod.remove = function () {
    $box.add($overlay).remove();
    $('.' + boxElement).removeData(colorbox).removeClass(boxElement);
  };

  publicMethod.calcLoaded = function() {
    $loaded = $("#cboxLoadedContent");
    loadedHeight = $loaded.outerHeight(true) - $loaded.innerHeight(true);
    loadedWidth = $loaded.outerWidth(true) - $loaded.innerWidth(true);
  };

  publicMethod.position = function (speed, loadedCallback) {
        var top = 0, left = 0;
        publicMethod.calcLoaded();
        $window.unbind('resize.' + prefix);

        // remove the modal so that it doesn't influence the document width/height
        $box.hide();

        if (settings.fixed && !isIE6) {
            $box.css({position: 'fixed'});
        } else {
            top = $window.scrollTop();
            left = $window.scrollLeft();
            $box.css({position: 'absolute'});
        }

    // keeps the top and left positions within the browser's viewport.
        if (settings.right !== false) {
            left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
        } else if (settings.left !== false) {
            left += setSize(settings.left, 'x');
        } else {
            left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
        }

        if (settings.bottom !== false) {
            top += Math.max(document.documentElement.clientHeight - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
        } else if (settings.top !== false) {
            top += setSize(settings.top, 'y');
        } else {
            if (isNaN(settings.h)) {
              publicMethod.load(true);
            }
            top += Math.round(Math.max(document.documentElement.clientHeight - settings.h - loadedHeight - interfaceHeight, 0) / 2);
        }

        $box.show();

    // setting the speed to 0 to reduce the delay between same-sized content.
    speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;

    // this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
    // but it has to be shrank down around the size of div#colorbox when it's done.  If not,
    // it can invoke an obscure IE bug when using iframes.
    $wrap[0].style.width = $wrap[0].style.height = "9999px";

    function modalDimensions(that) {
      // loading overlay height has to be explicitly set for IE6.
      $topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
      $loadingOverlay[0].style.height = $loadingOverlay[1].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
    }

    $box.dequeue().animate({width: settings.w + loadedWidth, height: settings.h + loadedHeight, top: top, left: left}, {
      duration: speed,
      complete: function () {
        modalDimensions(this);

        active = false;

        // shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
        $wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
        $wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

        if (loadedCallback) {
          loadedCallback();
        }

                setTimeout(function(){  // small delay before binding onresize due to an IE8 bug.
                    $window.bind('resize.' + prefix, publicMethod.position);
                }, 1);
      },
      step: function () {
        modalDimensions(this);
      }
    });
  };

  publicMethod.resize = function (options) {
    if (open) {
      options = options || {};

      if (options.width) {
        //settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
       // settings.w = setSize(options.width, 'x') - $loaded.outerWidth(true) - interfaceWidth;
        settings.w = setSize(options.width, 'x') - interfaceWidth;
      }
      if (options.innerWidth) {
        settings.w = setSize(options.innerWidth, 'x');
      }
      $loaded.css({width: settings.w});

      if (options.height) {
        //settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
        //settings.h = setSize(options.height, 'y') - $loaded.outerHeight(true) - interfaceHeight;
        settings.h = setSize(options.height, 'y') - interfaceHeight;
      }
      if (options.innerHeight) {
        settings.h = setSize(options.innerHeight, 'y');
      }
      if (!options.innerHeight && !options.height) {
        var $child = $loaded.wrapInner("<div style='overflow:auto; margin:0px; padding:0px;'></div>").children(); // temporary wrapper to get an accurate estimate of just how high the total content should be.
        settings.h = $child.height();
        $child.replaceWith($child.children()); // ditch the temporary wrapper div used in height calculation
      }
      $loaded.css({height: settings.h});

      publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
    }
  };

  publicMethod.prep = function (object) {
    if (!open) {
      return;
    }

    var callback, speed = settings.transition === "none" ? 0 : settings.speed;

    $loaded.remove();
    $loaded = $div('LoadedContent').append(object);

    function getWidth() {
      settings.w = settings.w || $loaded.width();
      settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
      return settings.w;
    }
    function getHeight() {
      settings.h = settings.h || $loaded.height();
      settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
      return settings.h;
    }

    $loaded.hide()
    .appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
    .css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
    .css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
    .prependTo($content);

    $loadingBay.hide();

    // floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
    //$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});

        $(photo).css({'float': 'none'});

    // Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.
    if (isIE6) {
      $('select').not($box.find('select')).filter(function () {
        return this.style.visibility !== 'hidden';
      }).css({'visibility': 'hidden'}).one(event_cleanup, function () {
        this.style.visibility = 'inherit';
      });
    }

    callback = function () {
            var prev, prevSrc, next, nextSrc, total = $related.length, iframe, complete;

            if (!open) {
                return;
            }

            function removeFilter() {
                if (isIE) {
                    $box[0].style.removeAttribute('filter');
                }
            }

            complete = function () {
                clearTimeout(loadingTimer);
                $loadingOverlay.hide();
                trigger(event_complete, settings.onComplete);
            };

            if (isIE) {
                //This fadeIn helps the bicubic resampling to kick-in.
                if (photo) {
                    $loaded.fadeIn(100);
                }
            }

            $title.html(settings.title).add($loaded).show();

            if (total > 1) { // handle grouping
                if (typeof settings.current === "string") {
                    $current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
                }

                $next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
                $prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);

                prev = index ? $related[index - 1] : $related[total - 1];
                next = index < total - 1 ? $related[index + 1] : $related[0];

                if (settings.slideshow) {
                    $slideshow.show();
                }

                // Preloads images within a rel group
                if (settings.preloading) {
                    nextSrc = $.data(next, colorbox).href || next.href;
                    prevSrc = $.data(prev, colorbox).href || prev.href;

                    nextSrc = $.isFunction(nextSrc) ? nextSrc.call(next) : nextSrc;
                    prevSrc = $.isFunction(prevSrc) ? prevSrc.call(prev) : prevSrc;

                    if (isImage(nextSrc)) {
                        $('<img/>')[0].src = nextSrc;
                    }

                    if (isImage(prevSrc)) {
                        $('<img/>')[0].src = prevSrc;
                    }
                }
            } else {
                $groupControls.hide();
            }

            if (settings.iframe) {
                iframe = $('<iframe/>').addClass(prefix + 'Iframe')[0];

                if (settings.fastIframe) {
                    complete();
                } else {
                    $(iframe).one('load', complete);
                }
                iframe.name = prefix + (+new Date());
                iframe.src = settings.href;

                if (!settings.scrolling) {
                    iframe.scrolling = "no";
                }

                if (isIE) {
                    iframe.frameBorder = 0;
                    iframe.allowTransparency = "true";
                }

                $(iframe).appendTo($loaded).one(event_purge, function () {
                    iframe.src = "//about:blank";
                });
            } else {
                complete();
            }

            if (settings.transition === 'fade') {
                $box.fadeTo(speed, 1, removeFilter);
            } else {
                removeFilter();
            }
    };

    if (settings.transition === 'fade') {
      $box.fadeTo(speed, 0, function () {
        publicMethod.position(0, callback);
      });
    } else {
      publicMethod.position(speed, callback);
    }
  };

  publicMethod.load = function (launched) {
    var href, setResize, prep = publicMethod.prep;

    active = true;

    photo = false;

    element = $related[index];

    if (!launched) {
      makeSettings();
    }

    trigger(event_purge);

    trigger(event_load, settings.onLoad);

    settings.h = settings.height ?
        setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
        settings.innerHeight && setSize(settings.innerHeight, 'y');

    settings.w = settings.width ?
        setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
        settings.innerWidth && setSize(settings.innerWidth, 'x');

    // Sets the minimum dimensions for use in image scaling
    settings.mw = settings.w;
    settings.mh = settings.h;

    // Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
    // If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
    if (settings.maxWidth) {
      settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
      settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
    }
    if (settings.maxHeight) {
      settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
      settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
    }

    href = settings.href;

        loadingTimer = setTimeout(function () {
            $loadingOverlay.show();
        }, 100);

    if (settings.inline) {
      // Inserts an empty placeholder where inline content is being pulled from.
      // An event is bound to put inline content back when ColorBox closes or loads new content.
      $div().hide().insertBefore($(href)[0]).one(event_purge, function () {
        $(this).replaceWith($loaded.children());
      });
      prep($(href));
    } else if (settings.iframe) {
      // IFrame element won't be added to the DOM until it is ready to be displayed,
      // to avoid problems with DOM-ready JS that might be trying to run in that iframe.
      prep(" ");
    } else if (settings.html) {
      prep(settings.html);
    } else if (isImage(href)) {
      $(photo = new Image())
      .addClass(prefix + 'Photo')
      .error(function () {
        settings.title = false;
        prep($div('Error').text('This image could not be loaded'));
      })
      .load(function () {
        var percent;
        photo.onload = null; //stops animated gifs from firing the onload repeatedly.

        if (settings.scalePhotos) {
          setResize = function () {
            photo.height -= photo.height * percent;
            photo.width -= photo.width * percent;
          };
          if (settings.mw && photo.width > settings.mw) {
            percent = (photo.width - settings.mw) / photo.width;
            setResize();
          }
          if (settings.mh && photo.height > settings.mh) {
            percent = (photo.height - settings.mh) / photo.height;
            setResize();
          }
        }

        if (settings.h) {
          photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
        }

        if ($related[1] && (index < $related.length - 1 || settings.loop)) {
          photo.style.cursor = 'pointer';
          photo.onclick = function () {
                        publicMethod.next();
                    };
        }

        if (isIE) {
          photo.style.msInterpolationMode = 'bicubic';
        }

        setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
          prep(photo);
        }, 1);
      });

      setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
        photo.src = href;
      }, 1);
    } else if (href) {
      $loadingBay.load(href, settings.data, function (data, status, xhr) {
        prep(status === 'error' ? $div('Error').text('Request unsuccessful: ' + xhr.statusText) : $(this).contents());
      });
    }
  };

  // Navigates to the next page/image in a set.
  publicMethod.next = function () {
    if (!active && $related[1] && (index < $related.length - 1 || settings.loop)) {
      index = index < $related.length - 1 ? index + 1 : 0;
      publicMethod.load();
    }
  };

  publicMethod.prev = function () {
    if (!active && $related[1] && (index || settings.loop)) {
      index = index ? index - 1 : $related.length - 1;
      publicMethod.load();
    }
  };

  // Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
  publicMethod.close = function () {
    if (open && !closing) {

      closing = true;

      open = false;

      trigger(event_cleanup, settings.onCleanup);

      $window.unbind('.' + prefix + ' .' + event_ie6);

      $overlay.fadeTo(200, 0);

      $box.stop().fadeTo(300, 0, function () {

        $box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();

        trigger(event_purge);

        $loaded.remove();

        setTimeout(function () {
          closing = false;
          trigger(event_closed, settings.onClosed);
        }, 1);
      });
    }
  };

  // A method for fetching the current element ColorBox is referencing.
  // returns a jQuery object.
  publicMethod.element = function () {
    return $(element);
  };

  publicMethod.settings = defaults;

  // Bind the live event before DOM-ready for maximum performance in IE6 & 7.
    handler = function (e) {
        // checks to see if it was a non-left mouse-click and for clicks modified with ctrl, shift, or alt.
        if (!((e.button !== 0 && typeof e.button !== 'undefined') || e.ctrlKey || e.shiftKey || e.altKey)) {
            e.preventDefault();
            launch(this);
        }
    };

    if ($.fn.delegate) {
        $(document).delegate('.' + boxElement, 'click', handler);
    } else {
        $('.' + boxElement).live('click', handler);
    }

  // Initializes ColorBox when the DOM has loaded
  $(publicMethod.init);

}(jQuery, document, this));
//END:COLORBOX

/* ****************************************
 * bbyjsoop (inheritance helper)
 * ****************************************/

/* NAMESPACE:				bbyjsoop
 *
 * namespace to hold general js oop inheritance helper function
 *
 * how about "Best Buy J-Soup" :)
 *
 * Dependents (please record your use):
 * 		global.js: BBYOn, BBYOnMod
 * 		bbyon2-page.js: BBYOnPage
 */
bbyjsoop = {};


/* FUNCTION:			extend
 *
 * establishes inheritance between given object prototypes (classes)
 *
 * @sub		obj		req		the sub object prototype (class) that will inherit from @base
 * @base	obj		req		the base object prototype (class) from which @sub will inherit
 */
bbyjsoop.extend = function(base, sub) {
   function inheritance() {}
   inheritance.prototype = base.prototype;
   sub.prototype = new inheritance();
   sub.prototype.constructor = base;
   sub.baseConstructor = base;
   sub.superClass = base.prototype;
}


/* CONSTRUCTOR:			CLog
 *
 * Console Logger
 * Writes debug data to the console prefixed with the provided tag.
 * NOTE: relies on jQuery and our own jQuery extension "log"
 *
 * Mode Persistence: CLog uses cookies to store the last url mode instruction, so you don't have
 * to keep typing "&debug=1" in the url as you browse. Just do &debug=0 to turn off.
 *
 * Given the general purpose of this function we define it independently so it can be instantiated
 * within another object, i.e., grab your own cLog and go. Like this:
 *
 * 		this.cLog = new CLog(yourObjectName);
 *
 * then to write with cLog:
 *
 * 		this.cLog.wr('message to write to console');
 *
 * You could then also access CLog's determination of debug mode, either directly
 * (this.cLog.mode) or by assignment (this.mode = this.cLog.mode). This allows you
 * to use CLog's mode persistence.
 *
 * @debugTag	str		req		tag under which this instance of cLog will write to the console
 */
function CLog(debugTag){

	// define debugTag and debug mode
	this.tag = ( typeof debugTag == 'string' ) ? debugTag :  'cLog';
	this.mode = jQuery.urlParam("debug", readCookie('cLogMode')) || 0;

	if(this.mode && this.mode != 0) {

		if(console.log) {
			this.init(debugTag);
			return true;
		}
		alert('Sorry, your browser does not support console logging. \nPlease install firebug or firebug lite.');
	}

	// either debug is off or it's not supported - so, set to off and set write function
	setCookie('cLogMode', 0, -1);
	CLog.prototype.wr = function(){
		return false;
	}
}


/* FUNCTION:			init
 *
 * initialize/define the rest of our active object
 */
CLog.prototype.init = function(debugTag){

	// check if IE and set msg character limit for short format
	//this.isIE = (navigator.appVersion.indexOf('MSIE') > -1) ? true : false;
	this.shortChars = 130;

	// set cLogMode cookie, expires in 1 day
	setCookie('cLogMode', this.mode, 1);

	// define the active write function
	CLog.prototype.wr = this.wrOn;

	// define cLog quick guide and write to cLog
	this.guide = 'Start cLog (mode:' + this.mode + ') Guide: url param debug=0/off, !0/on, long/full output. Persistent until changed again.';
	this.wr(this.guide, this.tag);
}


/* FUNCTION:			wrOn
 *
 * writes debugData to the console log
 *
 * @debugData 	str		req		the data to be written to the log
 * @tag			str		opt		optional tag to prefix data, i.e., "tag: debugData"
 * 								if CLog was instantiated with a tag that will be used if not overridden here
 */
CLog.prototype.wrOn = function(debugData, debugTag){

	// did we get debugData
	debugData = (!debugData) ? 'console log request made with no data to log' : debugData;
	debugTag = debugTag || this.tag;

	// truncate long messages unless we're in long mode
	if(this.mode.toString().indexOf('long') == -1 && debugData.length > this.shortChars) {
		debugData = debugData.substring(0, this.shortChars) + '...';
	}

	// assemble our output msg and write to console
	var msg = debugTag + ': ' + debugData;
	try {console.log(msg);}
  catch(e){}
}


/* FUNCTION (utility): 			objectToString
 *
 * takes an object or array and recursively converts it to a string
 *
 * @o		obj/arr		req		object to be converted
 *
 * @return	str					string version of given object
 *
 * 2011-10-20 Conley: updated to use square brackets for array portions
 * 2011-08~15 Conley: updated to handle null and undefined values
 */
function objectToString(o){
	var parse = function parser(_o){
		var a = [], t;
		for(var p in _o){
			if(_o.hasOwnProperty(p)){
				t = _o[p];
				if(t && typeof t == "object"){
					if(t.constructor == Array){
						a[a.length]= p + ":[" + parser(t).join(", ") + "]";
					} else {
						a[a.length]= p + ":{" + parser(t).join(", ") + "}";
					}
				} else {
					if(typeof t == "string"){
						a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
					} else {
						if(t === null){
							a[a.length] = [ p+ ": null" ];
						} else if (t === undefined){
							a[a.length] = [ p+ ": undefined" ];
						} else {
							a[a.length] = [ p+ ": " + t.toString()];
						}
					}
				}
			}
		}
		return a;
	}
	return "{" + parse(o).join(", ") + "}";
}



/* ****************************************
 * BBYOn (parent prototype)
 * ****************************************/


/* CONSTRUCTOR:				BBYOn
 *
 * BBYOn defines the core common code base for BBYOn objects which present users with a media selector module
 * or launcher and the page or light box in which the media is actually displayed.
 *
 * constructs parent BBYOn
 * child/sub-protoypes:
 * 		BBYOnMod		for building the Content Selector Module that takes the user to BBYOnPage
 * 		BBYOnPage		for Best Buy On Content page on bestbuy.com
 * 		BBYOnPanelLB	for launching and displaying content in a light box
 *
 */
function BBYOn() {

	// debug - init our own instance of cLog with our tag, assign mode
	this.cLog = new CLog('BBYOn');
	this.debug = (this.cLog.mode == 0) ? false : this.cLog.mode;

	// debug - f()start
	var fname = 'constructor()', msg = '';
	this.cLog.wr(fname);

	// set some general vars needed for all BBYOn objects
	this.vars = {
		urlBase: ((location.hostname.indexOf('preview') > -1) ? 'http://preview.bestbuy.com' : 'http://www.bestbuy.com') + '/site/Entertainment-Offers/null/pcmcat249300050019.c?id=pcmcat249300050019',
		urlNid: parseInt(jQuery.urlParam("nid", false), 10) || false, // if it's not there or NaN, set to false
		urlTid: parseInt(jQuery.urlParam("tid", false), 10) || false, // if it's not there or NaN, set to false
		urlVideoId: jQuery.urlParam("videoid", false),
		urlKalturaId: jQuery.urlParam("ss_kaltura_entryId", false),
		mnContext: false,	// media network ad context, default to false here, ghp if no other input
		relQty: parseInt(jQuery.urlParam('relContent', 3), 10) || 3,	// quantity of related media to request/show
		//viewHistory: jQuery.urlParam("bbyonViewHist", readCookie('bbyonViewHist')), // switch to display view history panel
		//enableNoReload: jQuery.urlParam("bbyonNoReload", readCookie('bbyonNoReload')), // if true, we bind a handler to related media links to prevent full page reload
		idTypes: 'nid, ss_kaltura_entryId, tid',	// the basic types of media identifiers we'll accommodate
		displayMainContent: false, // true if we need to fully present (play/display) a piece of media, false for selector module
		starImcSrcBase: 'http://images.bestbuy.com/BestBuy_US/images/global/misc/ratings_star_', // base url for star rating images
		bbyonSiteLink: 'http://www.bestbuyon.com/?utm_campaign=SeeMore&utm_medium=Link_BB&utm_source=bestbuy.com&utm_content=Module',
		imageRootURL: 'http://www.bestbuyon.com/',
		enableABTesting: false, // enables AB Test Functions globally
		cookieLife: 2 // our default lifetime in days for our cookies
	}

	// determine idType based on url parameters
	var id = false, idType = false;

	if(this.vars.urlNid){
		idType = 'nid';
	}
	else if(this.vars.urlTid){
		idType = 'tid';
	}
	else if(this.vars.urlVideoId || this.vars.urlKalturaId){
		idType = 'ss_kaltura_entryId';
	}

	// vars related to handling jsonp requests in general
	this.jsonp = {
		max: 3,					// maximum number of attempts for any given query
		interval: 3000,			// time in ms between attempts after the first
		cStop: {				// call-stop markers that let us know a query has recieved a response so we can stop further attempts
		}
	}

	// vars related to building our solr query
	this.solrQuery = {
		urlProd: 'http://content.bestbuyon.com',
		urlStage: 'http://staging-content.bestbuyon.criticalmass.com',
		urlPath: '/solr/select/',
		start: 'q=-tid:1487', // begins our query and filters our "no-related" content types for all queries
		types: ' AND (ss_type:kaltura_entry2 OR ss_type:gallery OR ss_type:article)',
		notSymLinks: ' AND -type:dotcom_symlink',
		fields: '&fl=changed,created,nid,sis_content_link,ss_feature_desc,ss_field_bbydotcom_main_image,ss_field_bbydotcom_thumb_image,ss_field_video_thumbnail,ss_kaltura_entryId,ss_type,title,type,sis_field_dotcom_slot',
		sort: '&sort=sis_field_dotcom_slot asc,sis_field_yellow_tag_rating desc,created desc',
		stdParams: '&start=0&indent=on&wt=json&qt=standard',
		callbackParam: '&json.wrf='
	}
	this.solrQuery.url = jQuery.urlParam('bbyonSolrDomain', this.solrQuery.urlProd) + this.solrQuery.urlPath;

	// our cache for content (meta data)
	this.content = {
		cache: {},
		mainNid: false,
		relatedNids: [],
		related: {}
	}

	// set switches/cookies
	// this.vars.enableNoReload = this.setSwitchCookie(this.vars.enableNoReload, 'bbyonNoReload');
	// this.vars.viewHistory = this.setSwitchCookie(this.vars.viewHistory, 'bbyonViewHist');

}


/* FUNCTION:			jsonpReq
 *
 * makes a series of 1 or more jsonp requests based on properties of a given request object
 * ro			obj		req		object defining properties of a request to a server, properties defined as follows:
 *
 * 	url				str			req		url of the server/data source
 * 	query			str			req		query we're sending to the server
 * 	cbSuccess		str			req		the name of the method to call and send data to on query success
 * 	cbFail			str			opt		the name of the method to call on query fail
 * 	cbParam			str/bool	opt		the name of the callback parameter for servers that require a specific parameter
 * 											set to bool false to prevent adding the callback to the query
 * 	attempts		num			opt		the number of request attempts we should make to the server
 * 	interval		num			opt		interval in ms between attempts after the first attempt
 *  callStop		str			opt		call stop variable, name of the object variable we can check to see if a response is already received
 * 											callStop should be a property of this.jsonp.cStop
 * 											if callStop is not provided, it will be created as this.jsonp.cStop[ro.cbSuccess]
 * 											request attempts will be made until callStop !=false or we reach ro.attempts
 * 	wrapper			str			opt		name of the wrapper callback in which the server should package the response
 *
 * To clarify "callbacks," cbSuccess vs wrapper:
 * cbSuccess is the function to which we want jsonpReq to route data upon a successful response, it is not
 * the same as the jsonp wrapper we want, or may need, our response packaged in from the server.
 * We're using Google's jsonp jquery plugin which, be default, uses "_jqjsp" for the wrapper callback name.
 * Google's json plugin handles request-response association for us, so we don't have to worry about collision even using the same
 * wrapper callback for various requests. jsonp will kindly route the response data to cbSuccess or cbFail as appropriate.
 * Why do we bother with wrapper? Because some servers (BBY Open) choke on wrapper callback names that include an underscore.
 * Therefore, we set our own default wrapper callback name to "bbyonjsonp," while still leaving the property
 * available to the client if something else is required.
 *
 * About Google jsonp plugin.
 * There are several shortcomings with jQuery <= 1.4x specific to handling jsonp queires, that Google's plugin addresses, namely error handling, timeouts and
 * caching for jsonp ajax queries. Some of these may be addressed in future versions of jQuery.
 */
BBYOn.prototype.jsonpReq = function(ro) {

	// debug - f()start
	var	fname = 'jsonpReq', msg = '';
	if(this.debug){
		msg = '(requestObj: ' + objectToString(ro) + ')';
		this.cLog.wr(fname + msg);
	}

	// validate required properties, abort if invalid
	var valResults = [];
	if(typeof ro.url != 'string' || typeof ro.query != 'string') {
		valResults.push('missing url and/or query in request object');
	}
	if(typeof ro.cbSuccess != 'string'){
		valResults.push('missing cbSuccess string');
	} else if(typeof this[ro.cbSuccess] != 'function'){
		valResults.push('cbSuccess is not a function');
	}
	if(valResults.length > 0){
		if(this.debug){ this.cLog.wr(fname + ': ' + valResults.join(', ')); }
		return false;
	}

	// validate optional properties, set/force defaults as appropriate
	if(typeof ro.cbFail !== 'string' || typeof this[ro.cbFail] != 'function'){
		valResults.push('cbFail not a function, using default/doing nothing');
		ro.cbFail = 'jsonpReqCbFailDefault';
	}
	ro.cbParam = (typeof ro.cbParam == 'string' || typeof ro.cbParam === false) ? ro.cbParam : 'callback';
	ro.attempts = (typeof ro.attempts == 'number') ? Math.min(ro.attempts, this.jsonp.max) : this.jsonp.max ;
	ro.interval = (typeof ro.interval == 'number') ? Math.round(ro.interval) : this.jsonp.interval ;
	ro.callStop = (typeof ro.callStop == 'string') ? ro.callStop : ro.cbSuccess;
	ro.wrapper = (typeof ro.wrapper == 'string') ? ro.wrapper : 'bbyonjsonp';

	// initialize our call stop, set our request count, establish object reference for inside our subordinate functions
	this.jsonp.cStop[ro.callStop] = false;
	var req = 1;
	var thisObj = this;

	// function to manage and initiate request attempts, will call itself after the initial attempt
	var jCallInterval = function(){

		// clear the current interval so it doesn't go again, we'll create another
		clearInterval(jInterval);

		// check our call Stop, if we haven't received a response, call jRequest, otherwise cease attempts
		if(thisObj.jsonp.cStop[ro.callStop] == false){

			// debug - log this attempt with context
			if(thisObj.debug){
				msg = 	': sending request for cbSuccess ' + ro.cbSuccess +
						' attempt/max/interval: ' + [req, ro.attempts, ro.interval].join('/');
				thisObj.cLog.wr(fname + msg);
			}

			// send the actual request
			jRequest(ro);

			// manage/initiate subsequet requests with the desired interval
			req++;
			if(req <= ro.attempts){
				jInterval = setInterval(jCallInterval, ro.interval);
			} else {
				thisObj.cLog.wr(fname + ': reached max attempts for ' + ro.cbSuccess + ', quiting.');
			}

		} else {
			// we've already received a response for this request - abort
			if(thisObj.debug){ thisObj.cLog.wr(fname + ': response already received for ' + ro.cbSuccess + ', aborting further request attempts'); }
		}

	}

	// run jCallInterval to begin making requests, use 0 interval value so our first request is immediate
	var jInterval = setInterval(jCallInterval, 0);


	// our function to make the actual request, private to avoid validation duplication
	var jRequest  = function(ro){

		$.jsonp({
			context: thisObj,	// important
			cache: true,
			url: ro.url,
			callback: ro.wrapper,
			data: encodeURI(ro.query),
			callbackParameter: ro.cbParam,
			success: function(data){
				try{
					this[ro.cbSuccess](data);
				} catch(err){
					msg = ': success callback ' + ro.cbSuccess + ' undefined/failed, exception caught with error: ' + err.description;
					if(this.debug){this.cLog.wr(fname + msg);}
					// do something here - retry? could be trouble in this context
				}
			},
			//timeout: (ro.attempts * ro.interval), // this works, but avoid as this will occlude a response we may want even if slow
			error: function(xOpts, textStatus){
				msg = ': error sending GET request: ' + textStatus;
				if(this.debug){this.cLog.wr(fname + msg);}
			},
			complete: function(xOpts, textStatus){
				// fail - possible textStatus values are success, error and timeout. Run cbFail if not success
				if(textStatus.indexOf('success') < 0){
					try{
						this[ro.cbFail]();
					} catch(err){
						msg = ': fail callback ' + ro.cbFail + ' undefined/failed, exception caught with error: ' + err.description;
						if(this.debug){this.cLog.wr(fname + msg);}
					}
				}
			}
		})
	}
}


/* FUNCTION:				jsonpReqCbFailDefault
 *
 * a function to specifically do nothing, automatically called when no other failure callback function is given
 */
BBYOn.prototype.jsonpReqCbFailDefault = function(){ }


/* FUNCTION:				cacheContent
 *
 * Store/processes content data returned for a solr query request.
 * This function will store data to this.vars.content.cache
 *
 * @content		obj		req		the json object returned from solr
 *
 * @cached		int		return	number of cached items
 */
BBYOn.prototype.cacheContent = function(content){

	// debug - f()start
	var fname = 'cacheContent',	msg = '';
	this.cLog.wr(fname + '(content)(' + typeof content + ')');

	// if we have content, store it
	if(content && content.response.numFound > 0) {

		// grab just the docs array from our content data, set our cache counter
		var docs = content.response.docs, cached = 0;

		// process and store each doc
		for (var i = 0; i < docs.length; i++){

			// assign document handler
			var document = docs[i];

			// create a link for this content. If type=dotcom_symlink then use the origin nid
			if(document.type == "dotcom_symlink" && parseInt(document.sis_content_link) != NaN){
				document.link = this.getContentLink(document.sis_content_link);
			} else {
				document.link = this.getContentLink(document.nid);
			}

			// format and save the created display date
			document.displayDate = this.dateFormat(document.changed || document.created);

			// save to main content cache that we'll check later to avoid external queries if we can
			this.content.cache[document.nid] = document;

			// determine if the content should be able to play paid ad pre-rolls if slotted to context
			if(typeof document.tid != "undefined"){
				document.doPreroll = this.setDoPreroll(document.tid);
			}

			// mark as main content if we need it, otherwise as related
			if(this.vars.displayMainContent && (!this.content.mainNid || this.content.mainNid == false)){
				this.content.mainNid = document.nid;
				msg += 'main content: ';
			} else {
				this.content.relatedNids.push(document.nid);
				// if page, also stuff this into a separate object just for active batch of related content
				// this obviates iteration to create this object when we need it later anyway
				if(this.content.related) {
					this.content.related[document.nid] = document;
				}
				msg += 'related/module content: ';
			}

			// debug - report what we saved
			this.cLog.wr(fname + ': ' + msg + document.nid + ' with url: ' + document.link);
			cached++;
		}

		// debug -  report our results
		this.cLog.wr(fname + ': cached data from query response');

	} else {

		// debug - no content delivered to save
		this.cLog.wr(fname + ': no content to save');
	}

	// return the number of content pieces saved
	return cached;
}


/* FUNCTION (shared): 		getContentLink
 *
 * returns a url link to the BBYOn presnetation page specific to display the content for the given id and idType
 *
 * @id			str		req		the id of the content for which to build a link
 * @idType		str		opt		kaltureId, videoId or default nid
 *
 * @return		str				link to content on this page
 */
BBYOn.prototype.getContentLink = function(id, idType) {
	var fname = 'getContentLink' ;
	if(this.debug){ this.cLog.wr(fname + '(id, idType)(' + id + ', ' + idType + ')'); }

	// default idType to nid if not provided
	idType = idType || "nid";

	// create and return our link
	return this.vars.urlBase + '&' + idType + '=' + id;
}


/* FUNCTION (utility):		dateFormat
 *
 * parse and transform the datetime string from solr
 * note: we rely on the Date.replace.longMonths array from global.js for our month names
 *
 * @contentDateStr	str	opt	the string representing the datetime as yyyy-mm-ddThh:mm:ssZ
 * 											if not provided we use this.vars.contentMain.created
 */
BBYOn.prototype.dateFormat = function(contentDateStr) {
	var fname = 'dateFormat';
	if(this.debug){ this.cLog.wr(fname + '(contentDateStr)(' + contentDateStr + ')'); }

	if(!contentDateStr || typeof contentDateStr != 'string' || contentDateStr.length == 0) {
		return false;
	}

	var dateStr = contentDateStr;
	dateStr = dateStr.substring(0,10);
	var contentDateYear = dateStr.substr(0,4);
	var contentDateMo = parseInt(dateStr.substr(5,2));
	var contentDateDay = parseInt(dateStr.substr(8,2));
	var contentDateDisplay =  Date.replaceChars.longMonths[contentDateMo - 1] + ' ' + contentDateDay + ', ' + contentDateYear;
	if(this.debug){this.cLog.wr(fname + ': returning: ' + contentDateDisplay);}
	return contentDateDisplay;
}


/* FUNCTION (utility):			loadSnippetData
 *
 * takes a given html snippet with data placeholders and injects data from
 * the passed data object. Placeholders should be of the format {key}
 * where key a data object property.
 *
 * @snippet		str		req		html snippet to be populated with data
 * @data		obj		req		data obj, as {key:value [,key:value]}, to be loaded into @snippet
 * 									data property values should be string, number or bool
 * 									if value is an object/array, we will try to convert to string
 *
 * @returns:
 * 		1. if @snippet and @data, then @snippet with loaded @data
 * 		2. if no snippet (if first arg is not a string), then false
 * 		3. if snippet and no data, then snippet
 *
 * technically speaking, @snippet could be any string with placeholders, not just html.
 *
 * originally intended to also have loadSnippet remove unfilled placeholders. However, conceptually,
 * the caller may want data to appear enclosed in curly braces. So, disabled for now.
 */
BBYOn.prototype.loadSnippetData = function(snippet, data) {

	// debug f() start
	var fname = 'loadSnippetData';
	if(this.debug){this.cLog.wr(fname + '(snippet, data)(' + snippet + ', ' + objectToString(data) + ')');}

	// do we have a snippet
	if(typeof snippet != 'string') {
		if(this.debug){ this.cLog.wr(fname + ': snippet not a string as expected'); }
		return false;
	}

	// if we have a data object, load data into snippet
	var fields = [];
	if(typeof data == 'object') {

		for(var key in data) {

			// handle
			var val = data[key];

			// fill val into each occurance of placeholder, if val not a string then fill with empty space
			val = (typeof val == 'number' || typeof val == 'string') ? val: '';
			var srch = '{' + key + '}',
				srchReg = new RegExp(srch, "g");
			snippet = snippet.replace(srchReg, val);
			fields.push(key);
		}
	}

	// commenting this out for now since it's conceptually possible that the caller wants data rendered within "{}"
		// clean out placeholders that didn't get data
		// '/\{([^}]+)\}/g' works but is greedy, so will capture "{{{string}" from "{{{string}}}"
		// '/\{[^{]([^}]+)\}/g' will strictly capture "{string}" from "{{{string}}}"
		//							but will also capture "{at {string}" from "{{at {string}}}"
		// snippet = snippet.replace(/\{[^{]([^}]+)\}/g, '');
		// further revise to only remove unfilled placeholders with no whitespace
		// come back to this

	// debug - report results
	if(this.debug){ this.cLog.wr(fname + ': returning snippet with data loaded for: ' + fields.join()); }

	return snippet;
}


/* FUNCTION:		setSwitchCookie
 *
 * checks the value of a stored switch, if "on" then saves as given cookie
 * if "off" then sets switch to false and removes the cookie by setting expire in past.
 *
 * @switchVal		bool/str	req		if not null, undefined or false, will be considered true
 * @switchCookie	str			req		if @switchVal is considered true, will save to this cookie
 * @type			str			opt		"bool" (default) return/store true if @switchVal is considered true, else false
 * 										"val" will store the given value of @switchVal if considered true
 *
 * @return			bool/val			returns a value for the switchVal
 * 										if type is bin, returns boolean true or false
 * 										if type is val, returns @switchVal value if "true," else boolean false
 */
BBYOn.prototype.setSwitchCookie = function(switchVal, switchCookie, type){

	// debug - f()start
	var fname = 'setSwitchCookie';
	if(this.debug){ this.cLog.wr(fname + '(switchVal, switchCookie, type)(' + [switchVal, switchCookie, type].join() + ')'); }

	if(!switchVal || switchVal == 0 || switchVal == 'false') {
		setCookie(switchCookie, 0, -1);
		return false
	}

	switchVal = (type == 'val') ? switchVal : true;
	setCookie(switchCookie, switchVal, 3);
	return switchVal;
}


/* FUNCTION:			getSetPrerollParams()
 *
 * 1) determines/fetches pre-roll parameters based on page context or email campaign.
 * these parameters will be incorporated into the flash vars sent to the Kaltura video player
 * in order to determine what paid ad pre-roll should play before the primary video.
 *
 * 2) We also store the params to cookies to carry forward the context for related videos the user may watch. In the case
 * the user is here without any context, we default to ghp and store the params for that. For this reason, even if
 * the current content is tagged for no pre-roll, we still need to process and store context for related videos.
 *
 * @return	string		pre-roll flash parameters to send to Kaltura player
 */
BBYOn.prototype.getSetPrerollParams = function(){

	// debug f()start
	var fname = 'getSetPrerollParams';
	if(this.debug){ this.cLog.wr(fname); }

	// our function to determine context based on all possible inputs and factors. takes a page/product context as arg
	var determineContext = function(pContext){

		/* order of precedence for determining final context:
		 * get mncc and mncp from url
		 * get page from url
		 * get page from init call
		 * get mnprp from cookie mnprp
		 * get page from cookie mnContext
		 * if none of the above, use default 'ghp'
		 * whatever we end up with, save to mnprp and mnContext
		 */

		var context = {
			params: false,
			page: pContext || false,
			mncc: jQuery.urlParam("mncc", false)
		}

		if(context.mncc){
			context.mncp = jQuery.urlParam("mncp", 'a000000'); // media network campaign page, context equivalent to zone/cat
			context.page = context.mncc + ':' + context.mncp;
			return context;
		}

		context.page = jQuery.urlParam("name", false) || context.page;
		if(context.page){
			return context;
		}

		context.params = decodeURIComponent(readCookie('mnprp')) || false;
		context.page = decodeURIComponent(readCookie('mnContext')) || 'ghp';

		return context;
	}

	// run our determination
	var context = determineContext(this.vars.mnContext);

	// finalize params based if not already
	if(context.params === false || context.params == 'false'){
		if(context.mncc){
			context.params = this.makePrerollParams(context.mncc, context.mncp);
		} else {
			var swf = this.getSiteZone(context.page);
			if(swf){
				context.params = '&zone=' + swf.zone + '&doubleclick.adTagUrl=' + escape(swf.prerollUrl);
			}
		}
	}

	// save context back to our object and cookies to carry forward for related content viewing while on same page
	this.vars.mnContext = context.page;
	setCookie('mnContext', decodeURIComponent(context.page), this.vars.cookieLife);
	this.vars.mnprp = context.params;
	setCookie('mnprp', decodeURIComponent(context.params), this.vars.cookieLife);

	if(this.debug){ this.cLog.wr(fname + ': context: ' + context.params + ', ' + context.page); }

	return context.params;

}


/* FUNCTION:			makePrerollParam(site, zone)
 *
 * returns the fully generated flash pre-roll parameter to be delivered to the Kaltura player.
 *
 * @site	str		req
 * @zone	str		req
 */
BBYOn.prototype.makePrerollParams = function(site, zone){

	// debug f()start
	var fname = 'makePrerollParams';
	if(this.debug){ this.cLog.wr(fname); }

	// assemble our parts into a valid flash pre-roll parameter
	if(typeof site === "string" && typeof zone === "string"){
		var prerollUrl = 'http://ad.doubleclick.net/pfadx/cm.bby.' + site + '/' + site + ';sz=5x5;dcmt=text/xml;ord=?';
		var params = '&zone=' + zone  + '&doubleclick.adTagUrl=' + escape(prerollUrl);
		return params;
	}
	return '';
}


/* FUNCTION:			getSiteZone
 *
 * looks up the site and zone information for a given page
 * site and zone is passed to the Kaltura player to determine when and which preroll to run
 * this allows business to sell placements based on page
 *
 * @page			str		req		name of page on which to base site and zone context
 *
 * @return		obj/str				successful lookup: returns site and zone object
 *											failed lookup: returns string message
 *
 * note: some performance examples suggest this would run faster as a big switch statement.
 */
BBYOn.prototype.getSiteZone = function(page){

	// debug f()start
	var fname = 'getSiteZone(' + page + ')';
	this.cLog.wr(fname);

	// if page is a string, create library and look up a site-zone obj. Don't bother otherwise.
	if(typeof page != 'string') {
		if(this.debug){ this.cLog.wr(fname + ': page argument not a string as expected, returning false.'); }
		return false;
	}

	// encode if we need to since our lookups are encoded
	page = (page.indexOf(' ') > -1) ? encodeURIComponent(page) : page;

	// define our library of known sites/zones
	var szLibrary = {
		'ghp':{
			'zone':'cm.bby.ghp/ghp',
			'prerollUrl':'http://ad.doubleclick.net/pfadx/cm.bby.ghp/ghp;sz=5x5;dcmt=text/xml;ord=?'
		},
		'GHP-Panel':{
			'zone':'cm.bby.ghp/ghp',
			'prerollUrl':'http://ad.doubleclick.net/pfadx/cm.bby.ghp/ghp;sz=6x6;dcmt=text/xml;ord=?'
		}
	};

	// get the site and zone for the passed page
	var sz = szLibrary[page];

	// debug and return - if sz lookup fails, report to console and return false
	if(!sz){
		sz = 'did not find site/zone for given page';
		if(this.debug){ this.cLog.wr(fname + ': site/zone not found, returning false'); }
		return false;
	}

	// debug and return - report success and return sz object
	if(this.debug){ this.cLog.wr(fname + ': returning site/zone: ' + objectToString(sz)); }
	return sz;
}


/* FUNCTION:			setDoPreroll(tids)
 *
 * returns true or false based on term id's. If tids inlcludes 1806 then the content should
 * not get a paid ad pre-roll even when on a page (context) for which an ad has been sold.
 *
 * @tids	array	req		array of term id's (contentItem.tid)
 * @return	bool			true if we should play a pre-roll, false otherwise.
 */
BBYOn.prototype.setDoPreroll = function(tids){

	// debug f()start
	var fname = 'setDoPreroll';
	if(this.debug) {this.cLog.wr(fname + '(' + tids.join() + ')'); }

	var doPreroll = true; // by default we want/assume to show pre-rolls

	// determine if this content should play pre-roll, set flag for content
	try{
 		if(tids.length > 0 && (tids.join() + ',').indexOf('1806,') > -1){
 			doPreroll = false;
 		}
 	} catch(e){
 		if(this.debug) {this.cLog.wr(fname + 'error processing term identifiers (tids): ' + e); }
 	}

 	return doPreroll;
}


/* FUNCTION:		contentRenderVideo
 *
 * renders main content of type video
 *
 * @contentItem		object		req		content to be rendered
 * @targetId		str			opt		html element id to replace with video player, default = "video"
 * @inclRelProds	bool		opt		default = false, if true will run related products fetch & render
 */
BBYOn.prototype.contentRenderVideo = function(contentItem, targetId, inclRelProds){

	// debug - f()start, init debug msg
	var fname = 'contentRenderVideo',
		msg = '';
	if(this.debug){ this.cLog.wr(fname + '(contentItem, inclRelProds)(' + contentItem.nid + ', ' + inclRelProds + ')'); }

 	// if we don't have content, report and abort
 	if(!contentItem){
 		if(this.debug) {this.cLog.wr(fname + ': no contentItem provided - aborting video render'); }
 		return false;
 	}

 	// validate targetId - if we don't get something reasonably valid, set to default
	if(!targetId || typeof targetId != 'string' || targetId.length == 0){
 		targetId = 'video';
 	}

 	// validate inclRelProds switch
 	if(!inclRelProds|| inclRelProds == false || inclRelProds == 'false'){
 		inclRelProds = false;
 	} else {
 		inclRelProds = true;
 	}

 	// get prerollParams for possible paid ad pre-roll before content plays
	var prerollParams = (contentItem.doPreroll) ? this.vars.mnprp : '&doubleclick.preSequence=0';

	// configure the Flash variables and parameters
	var flashvars = {
		"layoutId": "fullLarge" + prerollParams,
		"k_watermark_click_path": contentItem.url,
		"pd_original_url": contentItem.url,
		"omniture.account": "bbymainprod",
		"widescreen": 1//,
		//"zone": "{configProxy.flashvars.zone}"
	};
	var params = {
		"wmode": "opaque",
		"allowFullScreen": "TRUE",
		"allowScriptAccess": "always",
		"allowNetworking": "all",
		//"shareBtnStartScreen.visible":false,
		"flashvars":"autoPlay=true&shareBtnStartScreen.visible=false&externalInterfaceDisabled=false"
	};

	// set our Kaltura player id, prior ids from most recent first: 5723521, (5623331), 5070921, 4775021, 2092641
	var videoPlayerId = jQuery.urlParam('kuicid', '5070921');  //5070921: reverted 2011-10-26 as issues with 5723521

	// prep swfObject params
	var swfVars = {
		url: 'http://www.kaltura.com/kwidget/wid/_37945/entry_id/' + contentItem.ss_kaltura_entryId + '/uiconf_id/' + videoPlayerId,
		htmlId: targetId,
		width: '640',
		height: '357',
		flshMinVer: '9',//10
		xpressInst: false,
		callback: null
	};

	// debug - log swfobject details to console
	if(this.debug){
		msg = fname
			+ ': running swfobject->Kaltura player with:'
			+ ' swfVars:' + objectToString(swfVars)
			+ ' flashvars:' + objectToString(flashvars)
			+ ' params:' + objectToString(params);
		this.cLog.wr(msg);
	}

	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
     *  is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
     */
    if(typeof swfobject == 'undefined'){
        var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
    }
    if(this.debug){ this.cLog.wr(fname + ': eval typeof swfobject: ' + typeof swfobject); }

	// orig 620x350, with new page layout becomes 640x357. note, math says 640x361, but 357 works better.
	swfobject.embedSWF(swfVars.url, swfVars.htmlId, swfVars.width, swfVars.height, swfVars.flshMinVer, swfVars.xpressInst, flashvars, params,{},false);

	// fill in video description
	//$('#videoDescription').html(contentItem.ss_feature_desc);

	// render related products if they are defined
	if(inclRelProds){
		var relProdSkus = this.relProductsGetSkus(contentItem);
		if(relProdSkus) {
			this.relProductsFetch(relProdSkus);
		}
	}
}


/* ****************************************
 * Include CSS for BBYOnPage and surveyAd if we're on the BBYOn Presentation page
 */
if(location.href.indexOf('/pcmcat249300050019.c?id=pcmcat249300050019') > -1){
	loadjscssfile(imgServer + 'en_US/images/global/on/css/bbyon2-page-min.css', 'css');
	loadjscssfile('http://www.bestbuyon.com/sites/all/themes/bbyon_cm_theme/css/surveyAd_styles.css', 'css');
}


/* CONSTRUCTOR:				BBYOnMod (extends BBYOn)
 *
 * this object will handle generating the BBY On Content Selector Module.
 * This is the box of thumbs with which the user may click a thumbnail image
 * to launch the display page (BBYOnPage).
 */
function BBYOnMod(){

	// make child's "this" refer to its own copy of parent's prototype
	BBYOnMod.baseConstructor.call(this);

	// debug - append child's debug tag to parent's tag
	this.cLog.tag += ': BBYOnMod';

	// debug - f()start
	var fname = 'constructor()';
	this.cLog.wr(fname);
}


/* INERITANCE CONNECTOR:		extend(BBYOn to sub BBYOnMod)
 *
 * establishes inheritance from BBYOn to BBYOnMod
 */
bbyjsoop.extend(BBYOn, BBYOnMod);


/* FUNCTION:					init
 *
 * inits the process of building the BBYOn Media Selector Module
 * This is the box that displays media thumbnails as links with which the
 * user can click to launch a viewer (page) to display the selected media.
 *
 * @tid			str(int)	req		term id by which to query for media related to a given page
 * @page		str			opt		page name for determining site and zone for prerolls/ad-space
 * @template	str			opt		template the page is based on
 * @queryType	int			opt		1=classic, 2=taxonometric (default)
 * @modFormat	int			opt		0 (default), 1+ AB Test Formats
 */
BBYOnMod.prototype.init = function(tid, page, template, queryType, displayFormat){

	// debug f()start
	var fname = 'init';
	if(this.debug){
		//var fargs = '({tid, page, template, queryType, displayFormat} => ' + objectToString(arguments) + ')';
	 	this.cLog.wr(fname + '(args: ' + objectToString(arguments) +')');
	 }

	// determine media network context for paid advertising based on given page argument, then determine pre-roll pa
	this.vars.mnContext = (typeof page == 'string') ? decodeURIComponent(page) : false;
	this.getSetPrerollParams();

	// define possible module format id's, group into an array, set default
	this.vars.modFormat0 = 0,
	this.vars.modFormat1 = 1, // for new AB Testing format - r sidebar more spacious thumb stack
	this.vars.modFormat2 = 2, // for new AB Testing format - horizontal module at bottom with 4 thumbs
	this.vars.modFormat3 = 3, // reserve for winner of AB Testing 1st round
	this.vars.modFormats = [0,1,2];
	this.vars.modFormatDefault = this.vars.modFormat0;

	// get modFormat now since this may impact the qty of content we request in our solr query
	this.vars.modFormat = this.modFormatGet(displayFormat);
	if(this.debug){ this.cLog.wr(fname + ': returned modFormat: ' + this.vars.modFormat); }

	// debug - report our init object properties
	if (this.debug) { this.cLog.wr(fname + ': object state this.vars: ' + objectToString(this.vars)); }

	// make our media selector module - modContentFetch starts the process
	this.contentFetch(tid);
}


/* FUNCTION:			modFormatGet
 *
 * determines which display format to use for the content selector module.
 * This considers the following in this order of precedence:
 * 		url override, AB Testing, format passed as arg, default format.
 *
 * @format		str(int)	opt		format suggested by caller
 *
 * this function should guarantee a valid format returned to caller
 */
BBYOnMod.prototype.modFormatGet = function(format){

	// debug - f()start
	var fname = 'modFormatGet';
	if(this.debug){ this.cLog.wr(fname + '(format)(' + format + ')'); }

	// if we have a valid URL override, report and return it
	var retFormat = Number(jQuery.urlParam('bbyonModFormat', -1));
	if(this.modFormatIsValid(retFormat)){
		if(this.debug){ this.cLog.wr(fname + ': returning valid url override format ' + retFormat); }
		return retFormat;
	}

	// if AB testing is enabled, set display according to AB Testing factors and return
	if(this.vars.enableABTesting){
		retFormat = this.modFormatABTest(format);
		if(this.modFormatIsValid(retFormat)){
			if(this.debug){ this.cLog.wr(fname + ': returning AB Testing format ' + retFormat); }
			return retFormat;
		}
	}

	// if the passed suggested format is valid, return it
	if(this.modFormatIsValid(format)){
		if(this.debug){ this.cLog.wr(fname + ': returning given valid format ' + format); }
		return format;
	}

	// all else fails, report and return the default format
	if(this.debug){ this.cLog.wr(fname + ': returning default format ' + this.vars.modFormatDefault); }
	return this.vars.modFormatDefault;
}


/* FUNCTION:			modFormatABTest
 *
 * return an AB Test Format based on code provided by AB Test Group.
 * if AB Test formula doesn't provide a format, return the given format unchanged.
 *
 * @format		int/str		opt		a fallback format to return if no AB Test format is determined
 *
 * @return		int/str				the determined AB Test format or the given format
 */
BBYOnMod.prototype.modFormatABTest = function(format){

	// debug f() start
	var fname = 'modFormatABTest';
	if(this.debug){ this.cLog.wr(fname + '(format)(' + format + ')'); }

	/* commented out as the test this code was for is over. Leave method for future AB Testing
	//current date
	var cDate =  new Date(typeof(sysdt) !== "undefined" && sysdt !== null ? sysdt:"1/1/2019");
	var bbyvpt = (true||/bbyvpt=yes/.test(window.location.search))

	//BBY On Video Player test - remove GHP test if business wants to test on other pages
	if (templateName == 'GHP' && bbyvpt && cDate >= new Date('7/17/2011') && cDate <= new Date('2/1/2012')) {

		if (/version=a/.test(window.location.search)) {
			format = this.vars.modFormat0;
		} else if (/version=b/.test(window.location.search)) {
			format = this.vars.modFormat1;
		} else if (/version=c/.test(window.location.search)) {
			format = this.vars.modFormat2;
		} else if (/version=d/.test(window.location.search)) {
			format = this.vars.modFormat3;
		} else if (/a/.test(readCookie('groupabcd'))) {
			format=this.vars.modFormat0;
			track.abTest2 = '20110719-20110726 BBY On Video Player test - A';
		} else if (/b/.test(readCookie('groupabcd'))) {
			format = this.vars.modFormat1;
			track.abTest2 = '20110719-20110726 BBY On Video Player test - B';
		} else if (/c/.test(readCookie('groupabcd'))) {
			format = this.vars.modFormat2;
			track.abTest2 = '20110719-20110726 BBY On Video Player test - C';
		} else if (/d/.test(readCookie('groupabcd'))) {
			format = this.vars.modFormat3;
			track.abTest2 = '20110719-20110726 BBY On Video Player test - D';
		}
	}
	*/
	return format;
}


/* FUNCTION:			modFormatIsValid
 *
 * tests given format to see if it's a valid module display format
 *
 * @format	str/int		req		format to validate
 *
 * returns true if valid, false if not
 */
BBYOnMod.prototype.modFormatIsValid = function(format){

	// debug f() start
	var fname = 'modFormatIsValid';
	if(this.debug){ this.cLog.wr(fname + '(format)(' + format + ')'); }

	// presume invalid
	var isValid = false;

	// test if given format is in our array of valid formats
	if(typeof format == 'number') {
		for(var i=0; i<this.vars.modFormats.length; i++) {
			if (this.vars.modFormats[i] == format) {
				isValid = true;
			}
		}
	}

	// debug - report finding
	if(this.debug){ this.cLog.wr(fname +': ' + format + ': ' + isValid); }

	return isValid;
}


/* FUNCTION:			contentFetch
 *
 * assembles our solr query and sends off to our central request manager to get data
 *
 * @tid		str		opt		term id for which we want related/slotted BBYOn content
 */
BBYOnMod.prototype.contentFetch = function(tid){

	// debug f() start
	var fname = 'contentFetch';
	if(this.debug){ this.cLog.wr(fname + '(tid)(' + tid + ')'); }

	// determine final tid value
	if(!this.vars.urlTid){
		tid = tid || 1630;
	} else {
		tid = this.vars.urlTid;
	}

	// if modFormat2 (bottom horizontal AB Test format), set qty
	this.vars.relQty = (this.vars.modFormat == 1 ||  this.vars.modFormat == 2) ? 4 : this.vars.relQty;

	// build our query
	var query = this.solrQuery.start
			+ ' AND tid:' + tid
			+ this.solrQuery.types
			+ this.solrQuery.fields
			+ this.solrQuery.sort
			+ this.solrQuery.stdParams
			+ '&rows=' + this.vars.relQty;

	// send to our jsonpReq engine - we're letting jsonpReq use defaults for # of attempts and interval
	var fetch = this.jsonpReq({
		url: this.solrQuery.url,
		query: query,
		cbSuccess: 'contentFetchCB',
		cbParam: 'json.wrf'
	});
}

/* FUNCTION:			contentFetchCB
 *
 * handles data received from solr server in response to our module contentFetch request.
 * essentially accomplishes three things:
 * 1) gets/sets our call stop, which prevents redundant requests and processing
 * 2) sends our response to cache
 * 3) triggers rendering and downstream actions
 *
 * note: redundant responses generated from secondary requests in the previous
 * version of this code became an issue because the redundant responses would trigger
 * the entire downstream rendering process multiple times - this kinaa caused problems
 *
 * @data	obj		req		jsonp response from solr server
 */
BBYOnMod.prototype.contentFetchCB = function(data) {	
	// debug - f()start
	var fname = 'contentFetchCB';
	if(this.debug){ this.cLog.wr(fname +'(data: ' + objectToString(data) + ')'); }

	// check call stop - this tells us if we've already done this and, therefore, shouldn't do this again
	if(!this.jsonp.cStop[fname] || this.jsonp.cStop[fname] == false){

		// send our query response to cache
		var cached = Number(this.cacheContent(data));

		// if we saved successfully, set callStop to cease further requests, then call render, otherwise report failure
		if(cached > 0){
			this.jsonp.cStop[fname] = true;
			this.contentRender(this.content.cache);
		} else {
			if(this.debug){ this.cLog.wr(fname + ': no related content cached - aborting'); }
		}
	} else {
		// debug - report that we already have data and will occlude this server response
		if(this.debug){ this.cLog.wr(fname + ': redundant server response - occluding'); }
	}
}

/**
 *  Return item that matches the sis_field_dotcom_slot index, else return the item in the index order.
 *  @public
 *  @param{Object} content
 *  @param{number} index
 *  @return{Object}
 */
BBYOnMod.prototype.getContentItemBySisFieldDotcomSlot = function(content, index){
    /** @type{Object} */
    var key;
    /** @type{Object} */
    var item;
    /** @type{number} */
    var count;
    for(key in content) {
        item = content[key];
        if(item.sis_field_dotcom_slot === index) {
            return(item);
        }
    }
    
    //incoming index is 1 based, make it 0 based.
    index--;
    count = 0;
    for(key in content) {
        item = content[key];
        if(count === index) {
            return(item);
        }
        count++;
    }
}

/* FUNCTION: 			contentRender
 *
 * constructs selector module html and applies correct style classes according
 * to display format
 */
BBYOnMod.prototype.contentRender = function(content){

	// debug - f()start
	var fname = 'contentRender';
	if(this.debug){ this.cLog.wr(fname + '(' + content + ')'); }

	// set several vars with one var statement
	// set text for modTitle based on modFormat
	var modTitle = (this.vars.modFormat != 0) ? 'Best Buy Video' : 'Videos &amp; More',

	// define our base module container and structure used for all display formats
		modContainer =
            '<div class="bbyonMod">' +
                '<div class="modHeader">' +
                    '<h2 class="modTitle">' + modTitle + '</h2>' +
                    '<div class="bbyonLink">' +
                        '<a href="'+ this.vars.bbyonSiteLink + '">More at Best Buy On' +
                            '<span class="rasquo">&#155;</span>' +
                        '</a>' +
                    '</div>' +
                '</div>' +
                '<div class="modPoster"></div><!-- end body of .modPoster -->' +
                '<div class="modBody"></div><!-- end .modBody -->' +
                '<div class="bbyonLink">' +
                    '<a href="'+ this.vars.bbyonSiteLink + '">More at Best Buy On' +
                        '<span class="rasquo">&#155;</span>' +
                    '</a>' +
                '</div>' +
            '</div><!-- end .bbyonMod -->',

	// define tracking link that all items wil use, define our module item html template snippet
		trackingLink = 'trackEvent.event(\'event.link\',{video:\'video launch\'})',
		modItemTplt =
            '<a class="item {class}" onclick="' + trackingLink + '" href="{link}" title="{desc}">' +
                '<img class="itemThumb" src="http://www.bestbuyon.com/{thumb}" alt="{title}" />' +
                '<div class="itemCaption">' +
                    '<h3 class="itemTitle">{title}</h3>' +
                    '<div class="itemDesc">{desc}</div>' +
                    //'<div class="itemDateTime">{dateAttr}</div>' +
                '</div>' +
                '<div class="itemPosterCache">' +
                    '<img src="http://www.bestbuyon.com/{poster}" alt="{title}" />' +
                    '<div>{desc}</div>' +
                '</div>' +
            '</a>',

	// declare html handle and meters for loading data into snippets
		modItems = '',		// html accumulator, each loaded snipped appends to this
		itemCt = 0,			// item count used to create a numbered class for each item
		nidsLoaded = []; 	// list of nids for which we've loaded data into snippets

	// try loading media into template and render to module
	try{ 
		for(i in content){
			// create a handle for the item and grab only what we need to send to snippet loader
			var item = this.getContentItemBySisFieldDotcomSlot(content, (itemCt + 1));
			var itemData = {
					'class': 	'item' + itemCt, // a class for each item
					'link': 	item['link'],
					'title': 	item['title'],
					'desc': 	item['ss_feature_desc'],
					//'dateAttr':	item['displayDate'],
					'thumb': 	item['ss_field_video_thumbnail'],
					'poster': 	item['ss_field_bbydotcom_main_image']
				};
			// run loader and accumulate to modItems, advance our meters
			modItems += this.loadSnippetData(modItemTplt, itemData);
			nidsLoaded.push(item.nid + '(' + item.sis_content_link + ')');
			itemCt++;
		}

		// debug - report what we loaded
		if(this.debug){
			this.cLog.wr(fname + ': loaded for nids(origins) ' + nidsLoaded.join(', ') + ': ' + modItems);
		}

		// if this is modFormat 2, bottom horizontal AB test format, hide and move. we'll show after
		if(this.vars.modFormat == 2){
			$('#bbyon').hide();
			$('#footer').before($('#bbyon'));
		}

		// render, from outside in, our parent module container, then inject module items
		$('#bbyon').addClass('modFormat' + this.vars.modFormat);
		$('#on-loading').html(modContainer);
		$('#bbyon .modBody').html(modItems);

		// apply show to make sure it's revealed if it was hidden
		$('#bbyon').show();

		// for formats 0 and 3, set poster to first thumb as default active and bind hover behavior
		if(this.vars.modFormat == 0 || this.vars.modFormat == 3){

			var posterHtml = $('#bbyon .bbyonMod .item0 .itemPosterCache').html(),
				posterHref = $('#bbyon .bbyonMod .item0').attr('href'),
				modPosterLink =
				'<a class="posterLink" href="' + posterHref + '" onclick="' + trackingLink + '" >' + posterHtml + '</a>';

			$('#bbyon .modPoster').html(modPosterLink);
			//$('#bbyon .posterLink').html($('#bbyon .bbyonMod .item0 .itemPosterCache').html());
			//$('#bbyon .posterLink').attr('href', $('#bbyon .bbyonMod .item0').attr('href'));
			$('#bbyon .item0').addClass('active');
			this.modBindPosterBehavior();
		}

		// debug - report render complete
		if(this.debug){ this.cLog.wr(fname + ': module render complete'); }

	} catch(err){
		// debug - report failure to load/render
		if(this.debug){ this.cLog.wr(fname + ': failed to load/render media into template html'); }
	}

}


/* FUNCTION: 			modBindPosterBehavior
 *
 * binds js/jQuery behavior to thumbs in selector module so that hover replaces poster
 * image, description and link href.
 */
BBYOnMod.prototype.modBindPosterBehavior = function(){

	// debug - f()start
	var fname = 'modBindPosterBehavior';
	if(this.debug){ this.cLog.wr(fname); }

	$('#bbyon .item').mouseover(function(){

		// remove the active class and apply active to the hovered thumb
		$('#bbyon .item').removeClass('active');
		$(this).addClass('active');

		// transfer the poster image and link from the hovered thumb's poster cache to module poster
		$('#bbyon .posterLink').html($('div.itemPosterCache', this).html());
		$('#bbyon .posterLink').attr('href', $(this).attr('href'));
		$('#bbyon .posterLink').attr('onclick', $(this).attr('onclick'));
	});
}


/* ****************************************
 * BBYOnPanelLB (child of BBYOn)
 * ****************************************/

/* CONSTRUCTOR:				BBYOnPanelLB
 *
 * this object will handle generating the BBY On Media Display Light Box when the user
 * clicks the related promotional panel.
 */
function BBYOnPanelLB(){

	// make child's "this" refer to its own copy of parent's prototype
	BBYOnPanelLB.baseConstructor.call(this);

	// debug - set tag, override parent tag now that we're in the child class
	this.cLog.tag += ': BBYOnPanelLB';

	// debug - f()start
	var fname = 'constructor()';
	this.cLog.wr(fname);
}


/* INERITANCE CONNECTOR:		extend(BBYOn to sub BBYOnPanelLB)
 *
 * establishes inheritance from BBYOn to BBYOnPanelLB
 */
bbyjsoop.extend(BBYOn, BBYOnPanelLB);


/* FUNCTION:					init
 *
 * inits the a BBYOn Panel Light box launcher and display
 * This binds a click event handler to html elements with given id or class to trigger
 * a content fetch and rendering in a lightbox. Content will be fetched from the solr
 * server based on id and idType. Be default, we expect a term id.
 *
 * init expects a javascript object with the following defined parameters:
 *
 * @spotlightObj    obj     req     {
 *      @id			str/int 	id by which to query for media, default = 1630 (ghp)
 *      @idType		str			type of id being used to query content, tid (default) or nid
 *      @page		str			page name for determining site/zone for prerolls, default = 'ghp'
 *      @htmlElem   str         html id or class of the element(s) that should launch the light box
 *                                  written as jQuery syntax: '#elemId' or '.elemClass'
 *                                  if not provided, default = '#bbyonSpotlight'
 *  }
 */
BBYOnPanelLB.prototype.init = function(spotlightObj){

	// debug f()start
	var fname = 'init';
	if(this.debug){ this.cLog.wr(fname + '(spotlightObj)(' + objectToString(spotlightObj) + ')'); }

	// validate args, report and return if fail
    if(!spotlightObj || typeof spotlightObj != 'object') {
        if(this.debug){ this.cLog.wr(fname + ': no spotlightObj provided - aborting');}
		return false;
    }
    spotlightObj.id = parseInt(spotlightObj.id);
    spotlightObj.id = isNaN(spotlightObj.id) ? 1630 : spotlightObj.id;
    spotlightObj.idType = (spotlightObj.idType != 'nid') ? 'tid' : spotlightObj.idType;
	this.vars.mnContext = (typeof spotlightObj.page == 'string') ? spotlightObj.page : false;
	spotlightObj.htmlElem = (typeof spotlightObj.htmlElem != 'string') ? '#bbyonSpotlight' : spotlightObj.htmlElem;

    // get/set paid ad pre-roll params - based on spotlightObj.page or default
    this.getSetPrerollParams();

	// establish that we are displaying "main" content (in the light box), redefine solr qry vars
	this.vars.displayMainContent = true;
    //this.solrQuery.types = ' AND ss_type:kaltura_entry2';
    // as of 11/4/2011, this set of fields is for fetching strictly a video for display in a colorbox. will need updating for other uses.
    this.solrQuery.fields = '&fl=nid,ss_feature_desc,ss_field_bbydotcom_main_image,ss_kaltura_entryId,ss_type,tid,title,url';
	
	this.vars.spotlightObj = spotlightObj;
	
	// bind fetch and render to html element that will launch the light box
	var thisObj = this; // set our parent reference for within jQuery scope
	//$(spotlightObj.htmlElem).click(function(){
	$(spotlightObj.htmlElem).on("click", function(e){
		e.preventDefault();
		thisObj.contentFetch(spotlightObj.id, spotlightObj.idType);
		//return false;
	});

	if(this.debug){ this.cLog.wr(fname + ': initialized'); }
}


/* FUNCTION:		contentFetch
 *
 * checks to see if what we're looking for is already in cache, if not, builds a
 * query to fetch content and then submits the query to our solr requester
 *
 * @id			str(int)	req		node or term id for which we want to fetch content
 * @idType		str			opt		the type of id being used to identify the main content
 * 										[tid (default), nid, ss_kaltura_entryId]
 */
BBYOnPanelLB.prototype.contentFetch = function(id, idType){

	// debug - f()start
	var fname = 'contentFetch';
	if(this.debug){ this.cLog.wr(fname + '(id, idType)(' + id + ', ' + idType + ')'); }

	// check to see if we already have this content in cache
	if(this.debug){ this.cLog.wr(fname + ': looking for content in cache: this.content.cache[' + id + ']: ' + this.content.cache[id]); }

	if(idType === 'nid' && this.content.cache[id]){
		if(this.debug){ this.cLog.wr(fname + ': found in cache, skipping query: ' + this.content.cache[id]); }

		this.content.mainNid = id;
		this.contentRender(this.content.cache[this.content.mainNid]);

	} else {

		// debug - not found in cache, so make and run our query
		if(this.debug){ this.cLog.wr(fname + ': not in cache or no cache defined, running query'); }

		// build our query, we set qty ("rows") literally to 1, then call
		var query = this.solrQuery.start
				+ ' AND ' + idType + ':' + id
				+ this.solrQuery.types
				//+ ' AND -type:dotcom_symlink'
				+ this.solrQuery.fields
				+ this.solrQuery.sort
				+ this.solrQuery.stdParams
				+ '&rows=1';

		// run our request controller - note, we're letting jsonpReq use defaults for # of attempts and interval
		var fetch = this.jsonpReq({
			url: this.solrQuery.url,
			query: query,
			cbSuccess: 'contentFetchCB',
			cbParam: 'json.wrf'
		});
	}
}


/* FUNCTION:		contentFetchCB
 *
 * callback function to handle(store) the jsonp response from the solr server
 * if we successfully process the data, we call render
 *
 * @e			jsonp object	the data response to our mainContentFetch ajax query
 */
BBYOnPanelLB.prototype.contentFetchCB = function(data){

	// debug - f()start
	var fname = 'contentFetchCB';
	if(this.debug){ this.cLog.wr(fname +'(data: ' + objectToString(data) + ')'); }

	// check call stop - this tells us if we've already done this and, therefore, shouldn't do this again
	if(typeof this.jsonp.cStop[fname] == 'undefined' || this.jsonp.cStop[fname] == false){

		// send our query response to cache
		var cached = Number(this.cacheContent(data));

		// if we saved successfully, set callStop to cease further requests, then call render, otherwise report failure
		if(cached > 0){
			this.jsonp.cStop[fname] = true;
			this.contentRender(this.content.cache[this.content.mainNid]);
		} else {
			if(this.debug){ this.cLog.wr(fname + ': no content in cache - aborting'); }
		}
	} else {
		// debug - report that we already have data and will occlude this server response
		if(this.debug){ this.cLog.wr(fname + ': redundant server response - occluding'); }
	}

}


/* FUNCTION:		contentRender
 *
 * renders our content in a light box
 *
 * @contentItem		obj		req		the BBY On content item to be rendered in the light box
 */
BBYOnPanelLB.prototype.contentRender = function(contentItem){

	// debug - f()start
	var fname = 'contentRender';
	if(this.debug){ this.cLog.wr(fname + '(contentItem: ' + contentItem.nid + ')'); }

	// test that we have content, if not report error to console log and return
	if(!contentItem){
		if(this.debug){ this.cLog.wr(fname + ': no content data - aborting'); }
		return false;
	}

	// debug - log the type of content we have
	if(this.debug){ this.cLog.wr(fname + ': launching light box for contentItem.ss_type: ' + contentItem.ss_type + ' title: ' + contentItem.title); }

    // define our video target container and launch colorbox with video container
    var bbyonVideoContainer = '<div id="bbyon_video"><div id="bbyonLBVideo"></div></div>';
    //$.colorbox({html:bbyonVideoContainer, width:'668px', height:'415px', title:contentItem.title});
	modalManager.show('bbyonPanelLB',{html:bbyonVideoContainer, title:contentItem.title});
	modalManager.resize({ height: 365, width: 648, box: 'outer'});

	// delegate rendering by passing our contentItem to the appropriate handler
	switch(contentItem.ss_type){
		case 'kaltura_entry2':
			this.contentRenderVideo(contentItem, 'bbyonLBVideo');
			break;
		case 'gallery':
			//this.mainContentRenderSlideshow(contentItem);
			break;
		case 'article':
			//this.mainContentRenderArticle(contentItem);
			break;
		default:
			// todo: display something if type is unknown
	}

	// return success
	return true;
}



// instantiate BBYOnMod as bbyon, don't instantiate if we're on the BBYOn display page already
if(location.href.indexOf('/pcmcat249300050019.c?id=pcmcat249300050019') == -1){
	var bbyon = new BBYOnMod();
}

// instantiate BBYOnPanelLB as bbyonPanelLB, will be available on any page
var bbyonPanelLB = new BBYOnPanelLB;

// jquery prime document ready before calling our code
jQuery(document).ready(function(){

	// set up jQuery.ajax
	jQuery.ajaxSetup({
		"error":function(e, jqxhr, settings, exception) {
			//jQuery.log('bbyon2: ajax error: ' + settings.url + ' / ' + exception);
			if (console && console.log) {
				console.log('bbyon2: ajax error: ' + settings.url + ' / ' + exception);
			}
	}});

	// dev/test - if we see our test param and we're on the ghp, run our test, store cookie accordingly
	var bbyonSpotlightTest = jQuery.urlParam("bbyonSpotlightTest", false);
	if(typeof templateName == 'string' && templateName == 'GHP' && bbyonSpotlightTest){
		$('#flashcontent').append('<h1 id="bbyonSpotlightTest">Launch GHP Spotlight LB</h1>');
		bbyonPanelLB.init({id:'2501', idType:'nid', page:'GHP-Panel', htmlElem:'#bbyonSpotlightTest'});
	}

});


/* END BBYOn
 * ****************************************/


/*****************************************
* Browser Compatibility Messaging
**************************************** */

function bbyBrowsersMsg() {
	if (bbyBrowsers) {
		if (readCookie("bby-browsers") == null) {
			$.colorbox({
				html: '<div id="browsers"><p>For a better experience on BestBuy.com and other sites, please upgrade <br/>to a modern browser.  Here are some choices:</p><ul><li><a class="browsers-firefox" href="http://www.mozilla.com/en-US/firefox/"><span>Firefox</span></a></li><li><a class="browsers-chrome" href="http://www.google.com/chrome"><span>Chrome</span></a></li><li><a class="browsers-safari" href="http://www.apple.com/safari/download/"><span>Safari</span></a></li><li><a class="browsers-ie" href="http://www.microsoft.com/windows/internet-explorer/worldwide-sites.aspx"><span>Internet<br/>Explorer 8</span></a></li></ul></div>',
				width: 410,
				initialWidth: 410,
				title: 'Hey, we see you&#39;re using an outdated browser.'
			});
			setCookie("bby-browsers", "on", 30);
		}
	}
}
/*************************************************************************************************************
* old mp-min.js
*********************************************************************************************************** */

var MP = {
<!-- mp_trans_disable_start -->
  Version: '1.0.22a',
  Domains:{"eshttp:":"espanol.bestbuy.com","eshttps:":"espanol-ssl.bestbuy.com"},
  SrcLang: 'en',
<!-- mp_trans_disable_end -->
  UrlLang: 'mp_js_current_lang',
  SrcUrl: decodeURIComponent('mp_js_orgin_url'),
<!-- mp_trans_disable_start -->
  init: function(){
    if (MP.UrlLang.indexOf('p_js_')==1) {
      MP.SrcUrl=window.top.document.location.href;
      MP.UrlLang=MP.SrcLang;
  }
},
getCookie: function(name){
  var start=document.cookie.indexOf(name+'=');
  if(start < 0) return null;
  start=start+name.length+1;
  var end=document.cookie.indexOf(';', start);
  if(end < 0) end=document.cookie.length;
  while (document.cookie.charAt(start)==' '){start++;}
  return unescape(document.cookie.substring(start,end));
},
setCookie: function(name,value,path,domain){
  var cookie=name+'='+escape(value);
  if(path)cookie+='; path='+path;
  if(domain)cookie+='; domain='+domain;
  var now=new Date();
  now.setTime(now.getTime()+1000*60*60*24*365);
  cookie+='; expires='+now.toUTCString();
  document.cookie=cookie;
},
switchLanguage: function(lang){
  if(lang!=MP.SrcLang){
    var script=document.createElement('SCRIPT');
    script.src=location.protocol+'//'+MP.Domains[lang+location.protocol]+'/'+MP.SrcLang+lang+'/?1023749632;'+encodeURIComponent(MP.SrcUrl);
	document.body.appendChild(script);
  } else if(lang==MP.SrcLang && MP.UrlLang!=MP.SrcLang){
    var script=document.createElement('SCRIPT');
    script.src=location.protocol+'//'+MP.Domains[MP.UrlLang+location.protocol]+'/'+MP.SrcLang+MP.UrlLang+'/?1023749634;'+encodeURIComponent(location.href);
	document.body.appendChild(script);
  }
  return false;
},
switchToLang: function(url) {
  window.top.location.href=url;
}
<!-- mp_trans_disable_end -->
};
}

globalJSIncluded = true;

function displayReview(num,ratingsonly,percent,avgrating){
	var BVCustomRatingsSummaryContainer = $("#productsummary .customer-reviews");
	if(BVCustomRatingsSummaryContainer){
		var rating = avgrating.toFixed(1);
		var ratingStr = ('' + rating).replace('.','_');
		var summarySrc = '';
		summarySrc += '<div id="reviewband"><strong>Customer Reviews:&nbsp;</strong>';
		var imageSrc = " ";
		if(rating > 0)
		{
			imageSrc = imgServer + 'images/global/misc/ratings_star_'+ ratingStr + '.gif';
		}else{
			imageSrc =  imgServer + 'images/global/misc/ratings_star_0_0.gif';
		}
		summarySrc += '<img src="' + imageSrc + '" alt="' + rating + ' out of 5 stars"/>';

		if(totalReviewsCount > 0)
		{
		    summarySrc += '<span id="reviewscore"><strong>&nbsp;'+rating+'</strong></span><span id="reviewnum">';
		    summarySrc += '&nbsp;<a href="#tabbed-customerreviews">Read reviews ('+num+')</a></span>';
		}else{
			summarySrc += '<span id="reviewnum">&nbsp;<a href="#tabbed-customerreviews">'+'Be the first to write a review.</a></span>';
		}

		summarySrc += '</div>';
		BVCustomRatingsSummaryContainer.innerHTML = summarySrc;

	}

}

/**
 * BBY Slider
 * @see https://code.bestbuy.com/wiki/display/PUB/Carousel+Slider
 */
jQuery.fn.bby_slider = function(method) {
	var methods = {
		/**
		 * @param {object} options Slider configuration. Available parameters include:
		 * 1. viewport - Element wrapping everything including the slider content and the slider handle. This element should have a static width and height and should have overflow set to hidden.
		 * 2. content - Element wrapping just the slider content (elements assigned the class bby-slider-item). The plugin will automatically set the width for this element based on how many items are found.
		 */
		init: function(options) {
			return this.each(function(){
				var $this = jQuery(this);
				var sliderWrapper = $this.parent().parent();
				$this.data('bby-slider-options', options);

				var scrollPane = options.viewport;
				var scrollContent = options.content;

				scrollPane.css('padding-left', '0px');

				var items = scrollContent.find('div.bby-slider-item');
				var first = items.first();
				var last = items.last();

				first.addClass('bby-slider-item-first');
				last.addClass('bby-slider-item-last');

				var itemWidth = items.eq(1).outerWidth(true);
				var firstWidth = first.outerWidth(true);
				var lastWidth = last.outerWidth(true);
				var totalWidth = ((itemWidth * (items.length - 2)) + firstWidth + lastWidth);

				scrollContent.css('width', totalWidth + 'px');

				if(totalWidth > scrollPane.width())  {
					$this.slider({
						slide: function( event, ui ) {
							if(scrollContent.width() > scrollPane.width()) scrollContent.css("margin-left", Math.round(ui.value / 100 * (scrollPane.width() - scrollContent.width())) + 'px');
							else scrollContent.css("margin-left", 0);
						}
					});



					sliderWrapper.show();

					var remainder = scrollPane.width() - scrollContent.width();
					var leftVal = scrollContent.css("margin-left") === "auto" ? 0 : parseInt(scrollContent.css("margin-left"));
					var percentage = Math.round(leftVal / remainder * 100);
					$(this).slider('value', percentage);
				}
				else
					sliderWrapper.hide();
			});
		},

		/**
		 * Updates the display of the slider and the content.
		 * Recalculates the content width and adjusts the
		 * position of the slider handle. Use this method when
		 * adding/removing items from the slider.
		 */
		update: function() {
			return this.each(function() {
				var options = $(this).data('bby-slider-options');
				var scrollItems = options.content.find('div.bby-slider-item');
				scrollItems.removeClass('bby-slider-item-first');
				scrollItems.removeClass('bby-slider-item-last');
				$(this).bby_slider(options);
			});
		},

		/**
		 * Adds an item to the specified index position. If no
		 * index is provided, the item will be placed at the end.
		 *
		 * @param {String} html HTML to insert at the specified index.
		 * @param {int} index Array position to insert the HTML at.
		 */
		addItem: function (html, index) {
			if(typeof index == 'undefined') var index;
			return this.each(function(){
				var $this = $(this);
				var options = $this.data('bby-slider-options');
				var scrollContent = options.content;
				if(typeof index == 'undefined') index = -1;
				if(index == -1 || index >= scrollContent.children().length - 2) scrollContent.children().last().before(html);
				else if(index <= 0) scrollContent.prepend(html);
				else scrollContent.children().eq(index).before(html);
				$this.bby_slider('update');
			});
		},

		/**
		 * Removes an item at the specified index.
		 *
		 * @param {int} index Array position of the item (bby-slider-item) to remove.
		 */
		removeItem: function(index) {
			return this.each(function(){
				var options = $(this).data('bby-slider-options');
				var scrollContent = options.content;
				scrollContent.children().eq(index).remove();
			});
		},

		/**
		 * Counts the number of items (bby-slider-item) in the slider.
		 * Note: You must use this in replace of the JavaScript length
		 * property due to the required ending div (for clearing).
		 */
		itemCount: function() {
			var options = $(this).data('bby-slider-options');
			var scrollContent = options.content;
			return scrollContent.children().length - 1;
		}
	};

	if(methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
	else jQuery.error('Method ' +  method + ' does not exist on jQuery.bby_slider');
}

// Fix missing wS white space function
if(typeof wS == 'undefined') {
  wS = function() {};
}

/**
 * @deprecated
 */
jQuery.fn.bbySlider = jQuery.fn.bby_slider;

/* Temporary August CTT Cart Geeksquad fixes */
$(document).ready(function(){
	var container = $("#paymentform div.ctt-gs-paymentMethod");
	
	if (container.length > 0) {
		$("#paypalContinue").empty();
	}
});
/* End Temporary August CTT Cart Geeksquad fixes */
