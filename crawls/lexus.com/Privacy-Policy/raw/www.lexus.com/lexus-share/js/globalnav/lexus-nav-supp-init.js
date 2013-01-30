LXinit = function(e) {
	
//Global footer mini promo
miniPromo(); //uncomment to start the footer mini promo
function miniPromo(){
	var createLi = document.createElement('li');
	var createDiv = document.createElement('div');
	var createSpn1 = document.createElement('span');
	var createSpn2 = document.createElement('span');
	var createSpn3 = document.createElement('span');
	var createLink1 = document.createElement('a');
	var createLink2 = document.createElement('a');
	var createLink3 = document.createElement('a');

	createLi.className = "liRecallPromo";
	createDiv.id = "miniPromo";
	//createImg1.src = "/lexus-share/images/navigation/globalfooter/brace_test.png";
	//createImg1.id = "minPrmoImg1";
	//createImg1.border = "0";
	//createImg2.src = "/lexus-share/images/navigation/globalfooter/recall_test.png";
	
	//createImg2.border = "0";
	createSpn2.innerHTML = "Recall Information";
	//alert(createSpn2.innerHTML);
	//createImg3.src = "/lexus-share/images/navigation/globalfooter/donate_test.png";
	//createImg3.id = "minPrmoImg3";
	//createImg3.border = "0";
	createLink1.href = "http://www.lexus.com/TheHardWay/";
	createLink2.href = "http://www.lexus.com/recall";
	createLink2.setAttribute("onClick", "fireTag('2118.5');");
	createLink2.id = "linkRecallPromo";
	createLink2.className = "recallPromo";
	createLink3.href = "https://american.redcross.org/site/SPageServer?pagename=ntld_corpmicrosite&s_company=lexussupport-pub&JServSessionIdr004=x114qoqa11.app293b";
	
	var travSoc = document.getElementById('nav_bottom_social');
	var browserNam = navigator.appName;
	var browserVer = navigator.appVersion;
	if (browserNam == "Microsoft Internet Explorer"){
	var travUl = travSoc.childNodes[0];
	var targetLi = travUl.childNodes[5];
	}
	var ieNine = browserVer.indexOf("MSIE 9.0");
	if (browserNam == "Netscape" || ieNine != -1){
	var travUl = travSoc.childNodes[1];
	var targetLi = travUl.childNodes[10];
	}
	
	//createLi.appendChild(createDiv).appendChild(createLink1).appendChild(createImg1);
	createLi.appendChild(createDiv).appendChild(createLink2).appendChild(createSpn2);
	//createLi.appendChild(createDiv).appendChild(createLink3).appendChild(createImg3);
    travUl.insertBefore(createLi, targetLi);
}
	//end Global footer mini promo
	
	//adjust recall link
	//$g('linkRecallInfo').href = 'http://www.lexus.com/recall';

	//temp -- need to clear out any inline js events -- remove these from html
	if($g('#shopping')) {
		$g('#shopping').onmouseover = function() {}
		$g('#shopping').href = function() {}
		$g('#shoppingDrop').onmouseover = function() {}
	}	
	
	if(!browser.isSafari) {		
		LXGlobalNav.initializeArrowAnimations("#ownersDrop,#navCPODrop,#shoppingDrop,#footerMobileDrop,#footerALexusDrop,#footerContactDrop");
	}
	
	//If the user's on the BYL page, add a body class
	//TODO: move this to a more appropriate location, maybe the all models js?
	if(window.location.href.indexOf("BYL=1") != -1 || (typeof dk != 'undefined' && dk == 1)) {
		LXAddClass("body","BYLPage");
	}
	
	LXGlobalNav.initializeArrowAnimations(LXUtil.findElementsByClassName('allVehiclesLinks','div','allVehiclesContainer'));
	
	LXGlobalNav.initializeSearchBoxFade();
	LXGlobalNav.initializeMoreSites();
	LXGlobalNav.initializeShoppingTools();
	LXGlobalNav.initializeModels();	
	
	LXGlobalNav.initializeDropMenus([
		['#owners','#ownersDrop'],
		['#navCPO','#navCPODrop'],
		['#footerMobile','#footerMobileDrop'],
		['#footerALexus','#footerALexusDrop'],
		['#footerContact','#footerContactDrop'],
		['#social-facebook','#facebook-bubble'],
		['#social-twitter','#twitter-bubble'],
		['#social-youtube','#youtube-bubble'],
		['#social-googleplus','#googleplus-bubble']
	]);
	
	LXPreload([
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_engineerAmazing.gif',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_engineerAmazingOv.gif',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_luxuryAwaits.png',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_luxuryAwaitsOv.png',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_vidaLexus.gif',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_vidaLexusOv.gif',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_lStudio.png',
		'/lexus-share/images/navigation/more-lexus-sites/moreLexusSites_lStudioOv.png'
	]);
	
	LXDoDynamicContent({
		target: 'scrollContent',
		data: [{
			href: "http://www.lexus.com/engineering_amazing/?siteid=Lexus_More_Sites_Nav",
			tag: "onclick=fireTag('2300.6',{'<category>':'more lexus sites','<button_name>':'engineering_amazing'});",
			image: LEXUS_URL + "/lexus-share/images/navigation/more-lexus-sites/img_pursuitAmazing.jpg"
		}, {
			href: "http://luxuryawaits.com?siteid=Lexus_More_Sites_Nav",
			tag: "onclick=fireTag('2300.6',{'<category>':'more lexus sites','<button_name>':'luxury awaits'});",
			image: LEXUS_URL + "/lexus-share/images/navigation/more-lexus-sites/img-luxury-awaits.jpg"
		}, {
			href: "http://www.vidalexus.com?siteid=Lexus_More_Sites_Nav",
			tag: "onclick=fireTag('2300.6',{'<category>':'more lexus sites','<button_name>':'vida lexus'});",
			image: LEXUS_URL + "/lexus-share/images/navigation/more-lexus-sites/img-vida-lexus.jpg"
		},{
			href: "http://www.lstudio.com?cid=Lexus_More_Sites_Nav",
			tag: "onclick=fireTag('2300.6',{'<category>':'more lexus sites','<button_name>':'lstudio'});",
			image: LEXUS_URL + "/lexus-share/images/navigation/more-lexus-sites/img-lstudio.jpg"
		}],
		template: '\
			<li>\
				<a href="{href}" class="lexus-moresites-{current}" onclick="{tag}">\
					<img src="{image}" border="0">\
					<p class="description"></p>\
				</a>\
				<div class="siteBG"></div>\
			</li>\
		',
		templateStart: '<ul>',
		templateEnd:'</ul>'
	});
	
	// (function(){
		// $g("lxSocialBar").getElementsByTagName('ul')[0].innerHTML += '<li class="liRedCross"><a href="http://www.redcross.com"></a></li>';
	// })();		
	
	//this shouldnt be in global nav
	LXPromoRotatorX = new LXPromoRotator({
		rotator: "#anchorPromo",
		slideLeft: "#promo_rotateLeft",
		slideRight: "#promo_rotateRight",
		timing: {
			move:20,
			time:250,
			transitionDelay: 250
		},
		rotationTime: 6000,
		onInit: function() {
			this.rotator.style.display = "block";
		}
	});
	
	LXGlobalNav.initializeBackgroundFades([{
		scope: 'vehicles',
		container: 'nav-header-dropdown',
		fadeElements: 'vehicleBG',
		onContainerInit: function() {
			var self = this
			
			var superLink = function(e) {
				var e = e || window.event;
				tg = e.target || e.srcElement;
				if(tg.nodeName != 'A')
					self.getElementsByTagName('a')[0].onclick();
					window.location = self.getElementsByTagName('a')[0].href;
				return false;
			}
			
			this.getElementsByTagName('div')[0].onclick = superLink;
			this.getElementsByTagName('div')[1].onclick = superLink;
		}
	}]);
	
	//Background fades + arrow animations need to be switched over to transitions for Safari
	LXGlobalNav.initializeBackgroundFades([{
		scope: 'allVehiclesContainer',
		container: 'allVehiclesVehicle',
		fadeElements: 'allVehiclesVehicleBG,allVehiclesLinks'
	}]);
	
	LXGlobalNav.initializeBackgroundFades([{
		scope: 'sites',
		container: ',li',
		fadeElements: 'siteBG'
	}]);
		
	LXMoreSitesCarousel = new LXCarousel({
		scroller: '#scrollContent',
		scrollerLeft: '#sites_scrollLeft',
		scrollerRight: '#sites_scrollRight'
	});
	
	// (function(){
		// iframes = document.getElementsByTagName("iframe");
		// for(i in iframes) {
			// target = iframes[i];
			
			// if(target && target.src && window.location.href.indexOf("devcpd") != -1)
				// target.src = target.href.replace("www.yourlexusdealer.com","devcpd2.yourlexusdealer.com").replace("www.lexus.com","devcpd2.lexus.com");

			// if(target && target.src && window.location.href.indexOf("origin.staging") != -1)
				// target.src = target.href.replace("www.yourlexusdealer.com","origin.staging.yourlexusdealer.com").replace("www.lexus.com","origin.staging.lexus.com");
		
			// console.log(target.src);
		// }
	// })();
} 
 LXPromoRotator = function(options) {
	this.rotator = $g(options.rotator);
	if(!this.rotator) return false;
	this.sliderLeft = $g(options.slideLeft);
	this.sliderRight = $g(options.slideRight);
	this.items = this.rotator.getElementsByTagName('li');
	this.onInit = options.onInit;
	this.totalItems = this.items.length;
	this.currentItemIndex = 0;
	this.moveAmount = options.timing.move || 20;
	this.moveTime = options.timing.time || 500;
	this.transitionDelay = options.timing.transitionDelay || 250;
	this.currentItem = this.items[0];
	this.autoRotate = options.autoRotate || true;
	this.rotationTime = options.rotationTime || 12000;
	this.defaultPosition = {
		y: LXUtil.getComputedStyle(this.currentItem,"top",true)[1],
		x: LXUtil.getComputedStyle(this.currentItem,"left",true)[1]
	}
	
	this.move = function(direction) {
		
		// if(direction === 1 && this.currentItemIndex >= this.totalItems - 1) return;
		// if(direction === -1 && this.currentItemIndex == 0)  return;
		
		LXAnimate(this.currentItem, {
			left:(Number(this.defaultPosition.x) - (this.moveAmount*direction)) + 'px',
			opacity:0
		},{time:this.moveTime},(function(currentItem){
			return function() {
				currentItem.style.display = "none";
			}
		})(this.currentItem));
		
		direction==1 ?
			this.currentItemIndex = this.currentItemIndex == this.totalItems - 1 ? 0 : this.currentItemIndex + 1:
			this.currentItemIndex = this.currentItemIndex == 0 ? this.totalItems - 1 : this.currentItemIndex - 1;
		
		this.currentItem = this.items[this.currentItemIndex];		

		this.currentItem.style.display = "block";
		
		(function(self) {
			setTimeout(function() {
				LXAnimate(self.currentItem, {
					from: {left:(Number(self.defaultPosition.x) + (self.moveAmount*direction)) + 'px'},
					to: {left:self.defaultPosition.x + 'px',opacity:100}
				},{time:self.moveTime})
			},self.transitionDelay);
		})(this);
		
		// if(direction === 1) return this.currentItemIndex == (this.totalItems - 1) ? false : true;
		// if(direction === -1) return this.currentItemIndex == 0 ? false : true;
	}
	
	this.slideLeft = function() {
		this.move(-1);
		return this;
	}
		
	this.slideRight = function() {
		this.move(1);
		return this;
	}
	
	this.startRotation = function() {
		if(this.autoRotate) {
			this.rotationTimer = setInterval((function(self) {
				return function() {					
					self.slideRight();
				}
			})(this),this.rotationTime);
		}
	}
	
	this.stopRotation = function() {
		if(this.rotationTimer)
			clearInterval(this.rotationTimer);
		return this;
	}
	
	this.sliderLeft.onclick = (function(self) {
		return function() {
			self.slideLeft().stopRotation().startRotation();
			return false;
		}
	})(this);
	
	this.sliderRight.onclick = (function(self) {
		return function() {
			self.slideRight().stopRotation().startRotation();
			return false;
		}
	})(this)
		
	
	this.currentItem.style.display = "block";
	
	LXSetOpacity(this.currentItem,100);
	
	if(this.totalItems <= 1) {
		LXAddClass(this.sliderLeft,"disabled");
		LXAddClass(this.sliderLeft,"disabled");
	}
	
	if(this.onInit) this.onInit();
	
	if(this.autoRotate && this.totalItems > 1) {
		//this stops auto rotation if the user mouses over anchor
		/*(function(self){
			self.rotator.onmouseover = function(e) {
				if(mousedInto(this,e))
					self.stopRotation();
			}
			self.rotator.onmouseout = function(e) {
				if(mousedOut(this,e))
					self.startRotation();
			}
		})(this);*/
		this.startRotation();
	}
	
	return this;
}
 
 
/* move to global */
LXSpecialRotator = function(options) {	
	var self = this;
	this.onInit = options.onInit;
	this.rotator = $g(options.rotator);
	this.slider = $g(options.slider);
	if(!this.slider) return;
	this.items = this.rotator.getElementsByTagName('li');
	this.onBeforeSlideUp = options.onBeforeSlideUp;
	this.totalItems = this.items.length;
	this.rotatorLeft = $g(options.rotateLeft);
	this.rotatorRight = $g(options.rotateRight);	
	this.currentItemIndex = 0;
	this.currentItem = this.items[0];
	this.autoRotate = options.autoRotate ? options.autoRotate : true;
	this.rotationTime = options.rotationTime ? options.rotationTime : 12000;
	
	this.slideDown = function(callback) {
		LXAnimate(this.slider, {top: this.slider.offsetHeight + 'px'},{time:200},callback);
		return this;
	}
	
	this.slideUp = function(callback) {
		LXAnimate(this.slider, {top:'0px'},{time:200},callback);
		return this;
	}
	
	this.rotateLeft = function(){
		var self = this;
		
		this.slideDown(function(){
			self.previous();
			if(!self.onBeforeSlideUp || self.onBeforeSlideUp(false,self.slideUp) !== false) self.slideUp();
		});
		
		return this;
	}
	
	this.rotateRight = function(){
		var self = this;
		
		this.slideDown(function(){
			self.next();
			if(!self.onBeforeSlideUp || self.onBeforeSlideUp(false,self.slideUp) !== false) self.slideUp();
		});
		
		return this;
	}
	
	this.previous = function() {
		this.currentItemIndex = this.currentItemIndex == 0 ? this.totalItems - 1 : this.currentItemIndex - 1;
		this.currentItem.style.display = "none";
		this.currentItem = this.items[this.currentItemIndex];
		this.currentItem.style.display = "block";
		return this;
	}
	
	this.next = function() {
		this.currentItemIndex = this.currentItemIndex + 1 > this.totalItems - 1 ? 0 : this.currentItemIndex + 1;
		this.currentItem.style.display = "none";
		this.currentItem = this.items[this.currentItemIndex];
		this.currentItem.style.display = "block";	
		return this;
	}
	
	this.rotatorLeft.onclick = (function(self) {
		return function(){
			self.rotateLeft().stopRotation().startRotation();
			return false;
		}
	})(this);
	
	this.rotatorRight.onclick = (function(self) {
		return function(){
			self.rotateRight().stopRotation().startRotation();
			return false;
		}
	})(this);
	
	this.startRotation = function() {
		if(this.autoRotate) {
			this.rotationTimer = setInterval((function() {
				return function() {
					self.rotateRight();
				}
			})(this),this.rotationTime);
		}
	}
	
	this.stopRotation = function() {
		clearInterval(this.rotationTimer);
		return this;
	}

	this.currentItem.style.display = "block";
	
	if(this.onInit())this.onInit();	
	
	if(this.autoRotate) {
		/*(function(self){
			self.rotator.onmouseover = function(e) {
				if(mousedInto(this,e))					
					self.stopRotation();
			}
			self.rotator.onmouseout = function(e) {
				if(mousedOut(this,e))					
					self.startRotation();
			}
		})(this);*/
		this.startRotation();
	}

	return this;
}


LXDeepLinkManager = function(settings) {

	this.lastHash = "";	
	this.settings = settings;
		
	this.startMonitoring = function() {
        this.stopMonitoring();
		
		this.deepLinkTimer = setInterval((function(self) {
			return function() {
				self.monitorDeepLinks();
			}
		})(this),200);
	}
	
	this.stopMonitoring = function() {
		clearInterval(this.deepLinkTimer);
	}
	
	this.getOptions = function() {
		var hash = window.location.hash.replace("#","") || this.settings.defaultHash || "";
		var deepLink = {
			hash: hash,
			options: (function() {
				var options = hash.split("/");
				var newOptions = {};
				for(var i = 0; i < options.length; i++) {
					var option = options[i].split("-");
					if(option[0]) newOptions[option[0]] = option[1] || true;
				}
				return newOptions;
			})()
		}
		
		return deepLink;
	}
	
	this.monitorDeepLinks = function() {
		deepLink = this.getOptions();
		
		if(this.lastHash == deepLink.hash) return;
		
		if(this.settings && this.settings.processor) {
			this.settings.processor(deepLink.options);
		} 
		
		this.lastHash = deepLink.hash;
	}
	
	if(this.settings.onInit) this.settings.onInit.call(this);
	
	this.startMonitoring();
	
	return this;
}

var LXLive = function(elem, event, func) {
	elem = $g(elem);
	elem[event] = function(e) {
		e = e || window.event;
		t = e.target || e.srcElement;
				
		while (!!t && t.nodeName != 'BODY') {
			if(func(t)) return false;
			t = t.parentNode;
		}
	}
}


//Get -- accepts a single or multiple ids
var $g = function(elem) {
	if(typeof elem != "string") return elem;
	if(elem=="body") return document.body;
	
	//allow hash sign -- does nothing but makes the id 
	//selector more decernable from a class selector
	//upgrade later
	elem = elem.replace("#","") ;
	elem = elem.replace(".","") ;

	if(elem.indexOf(",")!=-1) {
		elems = elem.split(",");
		var elemsArray = [];
		for(var i = 0; i < elems.length; i++) {
			elemsArray[i] = elems[i];
		}
		return elemsArray;
	} else {
		elem = document.getElementById(elem);
		//if (!elem) elem = typeof window.fauxElem != "undefined" ? window.fauxElem : fauxElem = document.createElement("span");
		return elem
	}
}


//Contains all global timers
var timers = [];


//These should be moved to a local scope
var lastCategory = "";
var ModelsOpen=false;
var sites=false;

LXStates = {
	setState: function(state) {
		this[state]();
		this.currentState = state;
		
		//make sure to always hide any drop menus
		for(i=1;i<5;i++) {
			if($g('dropList'+i)) $g('dropList'+i).style.display = "none"
		}
	},
	modelsActive: function() {
		// $('ftArea').style.zIndex='50';
		// $('lxSocialBar').style.zIndex='50';
		// $('bottomNav').style.zIndex='50';
		// $('footerContent').style.zIndex='50';			
		// $('curtain').style.zIndex='51';
		// $('sitesWrap').style.zIndex='1';
		
		$g('hnArea').style.zIndex='999';
		$g('bottomNav').style.zIndex='777';
		$g('curtain').style.zIndex='888';
		$g('footerContent').style.zIndex='777';
		$g('ftArea').style.zIndex='777';
		$g('lxSocialBar').style.zIndex='777';
		$g('sitesWrap').style.zIndex='-1';
	},
	shoppingActive: function() {
		// $g('ftArea').style.zIndex='50';
		// $g('lxSocialBar').style.zIndex='50';
		// $g('bottomNav').style.zIndex='50';
		// $g('footerContent').style.zIndex='50';			
		// $g('sitesWrap').style.zIndex='1';
		// $g('curtain').style.zIndex='51';
		
		$g('hnArea').style.zIndex='999';
		$g('bottomNav').style.zIndex='777';
		$g('curtain').style.zIndex='888';
		$g('footerContent').style.zIndex='777';
		$g('ftArea').style.zIndex='777';
		$g('lxSocialBar').style.zIndex='777';
		$g('sitesWrap').style.zIndex='-1';
	},
	sitesActive: function() {
		$g("bottomNav").style.zIndex = "907001";
		$g("footerContent").style.zIndex = "907001";
		$g("lxSocialBar").style.zIndex='909002'
		$g("lxSocialBarWrapper").style.zIndex='909002'
		$g("sites").style.zIndex='909001'
		$g("sitesWrap").style.zIndex='909001'
		$g("curtain").style.zIndex = "908001";		
	},
	'default': function() {
		$g('bottomNav').style.zIndex='888';
		$g('curtain').style.zIndex='0';
		$g('footerContent').style.zIndex='888';
		$g('ftArea').style.zIndex='777';
		$g('lxSocialBar').style.zIndex='777';
		$g('sitesWrap').style.zIndex='-1';
		// $g('sitesWrap').style.display='none';
		$g('sitesLink').className='';
	}
}


// Uses:
// $g("link").mousedOut(this,e) // Will return true is this/e was moused out
// $g("link").mousedOut(that,e) //Will return true if this/e was moused to "that"
// this needs to be moved into a less specific file (global js?)
function mousedOut(tg,e) {
	e = e || window.event;

	if(!tg) var tg = e.target || e.srcElement;

	reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;

	while (!!reltg && reltg != tg && reltg.nodeName != 'BODY') {

		reltg= reltg.parentNode;	

	}

	if (reltg == tg) return false;

	return true; 
}

function mousedInto(tg,e) {
	return !mousedOut(tg,e)
}

function getTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}


//Lexus Toolbox!
var LXUtil = {
	Animation: { //"Animation" can be removed
		easeInOut: function(minValue,maxValue,totalSteps,actualStep,powr) { 
			//Generic Animation Step Value Generator By www.hesido.com 
			var delta = maxValue - minValue; 
			var stepp = minValue+(Math.pow(((1 / totalSteps) * actualStep), powr) * delta); 
			return Math.ceil(stepp) 

		}
	},
	setCaretPosition: function (ctrl, pos){
		if(ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	},
	getComputedStyle: function(elem,style,split) {	
		var computedStyle =  elem.currentStyle ?  (style=="opacity" ? (elem.filters.alpha && elem.filters.alpha.opacity ? elem.filters.alpha.opacity : 0) : elem.currentStyle[style]) : document.defaultView.getComputedStyle(elem, null).getPropertyValue(style);
		return split ? this.splitProperty(computedStyle) : computedStyle;
	},
	getColorAsRGBArray: function(rgb) {
		if(rgb.indexOf("#") != -1) 
			return this.hexToRGBArray(rgb); //clean this up later;
		else
			return rgb.replace(/ /g,"").match(/(\d+),(\d+),(\d+)/).splice(1,3);
	},	
	hexToRGBArray: function(hex) {	
		var cutHex = function(h) {
			return (h.charAt(0)=="#") ? h.substring(1,7):h;	
		}
		
		var	rgb = [
			parseInt((cutHex(hex)).substring(0,2),16),
			parseInt((cutHex(hex)).substring(2,4),16),
			parseInt((cutHex(hex)).substring(4,6),16),
		];
		
		return rgb;
	},
	splitProperty: function(prop) {
		propArr = prop ? prop.toString().match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/) : false;
		if(!propArr) propArr = [0,0,''];
		return propArr
	},
	fadeIn: function(elem, speed, limit, start) {	
		var timer = [];			
		var steps = 40;
		var appearTime = speed || 1000;
		var start = LXGetOpacity(elem) || LXSetOpacity(elem,0); 
		var limit = (limit||100);
		
		LXSetOpacity(elem,start);
		
		$g(elem).style.display = "block";
		
		for(i=start/100; i<=((limit/100)+1/steps); i+=(1/steps)){
			timer[timer.length] = LXSetTimeout((function(x,elem,limit){
				return function() {
					x = (x*100) > limit ? limit : x * 100;
					LXSetOpacity(elem,x);
				};
			})(i,elem,limit), i*appearTime);
		};

		return timer;
	},
	fadeOut : function(elem, speed, limit) {
		var timer = [];			
		var steps = 40;
		var appearTime = speed || 1000;
		var start = LXGetOpacity(elem) || LXSetOpacity(elem,100); 
		var limit = (limit||0);

		//LXSetOpacity(elem,start);
		//need to get rid of division/redundance
		for(i=start/100; i>(limit/100)+1/steps; i-=(1/steps)){
			timer[timer.length] = LXSetTimeout((function(x,elem,limit){
				return function() {
					x = (x*100) < limit ? limit : x * 100;
					LXSetOpacity(elem,x);
					if(x==0) $g(elem).style.display  = "none";
				};
			})((start/100)-i,elem,limit), i*appearTime);
		};
		
		return timer;
	},
	findElementsByClassName : function(find,type,search) {
		if(!$g(search)) return
		
		elements = $g(search).getElementsByTagName(type);
		elementsArr = []
		for(i=0;i<elements.length;i++) {
			if(elements[i].className == find) elementsArr[elementsArr.length] = elements[i];
		}
		return elementsArr;
	},
	RegularExpressions: {
		matchCssProperty: /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/
	}
}


var LXGlobalNav = {
	initializeDropMenus: function(elements) {
		
		var self = this;
		
		for(var i = 0; i < elements.length; i ++) {
		
			var dropLink = $g(elements[i][0]);
			var dropDown = $g(elements[i][1]);
			var dropDownID = elements[i][1];
			
			if(!dropLink) return;
			
			dropLink.onmouseover = (function(dropDown) {
				return function(e) {
					self.showDropDown(dropDown);
				}
			})(dropDown);
			
			dropLink.onmouseout = (function(dropDown) {
				return function(e) {
					if(!mousedInto(dropDown,e)) 
						self.hideDropDown(dropDown);
				}
			})(dropDown);
			
			dropDown.onmouseover = function(e) {}
			
			dropDown.onmouseout = (function(dropLink,dropDown) {
				return function(e) {
					if(!mousedInto(dropLink,e) && mousedOut(this,e)) 
						self.hideDropDown(dropDown);
				}
			})(dropLink,dropDown);
		}
	},
	
	initializeArrowAnimations: function(elements) {
		//this can't handle single objects atm
		//if(typeof elements == "object") dropDowns = elements
		var dropDowns = typeof elements == "string" ? $g(elements) : elements || [];
		
		for(n = 0; n<dropDowns.length; n++) {
			if(!$g(dropDowns[n])) return;
			
			var items = $g(dropDowns[n]).getElementsByTagName("a");	
			
			for(var i = 0; i<items.length;i++) {	
				items[i].onmouseover = this.showArrow;
				items[i].onmouseout = this.hideArrow;
			}
		}
	},
	initializeBackgroundFades: function(targets) {

		var self = this;

		for(var p = 0; p < targets.length; p++) {
			
			if(!$g(targets[p].scope)) return;
			
			//need to come up with a more elegant way to loop fade containers
				searchElement = targets[p].container.split(",")[1] || "div"
				targets[p].container = targets[p].container.split(",")[0];
			
			var divs = $g(targets[p].scope).getElementsByTagName(searchElement);
	
			for(var i = 0; i < divs.length; i++) {

				if(divs[i].className==targets[p].container) {
					
					var element = divs[i];

					if(targets[p].onContainerInit)
						targets[p].onContainerInit.call(element);
						
					//this check should be at a much higher level

					//if(browser.isSafari) continue;
					
					var divsx = element.getElementsByTagName("div");
					
					var fadeElements = targets[p].fadeElements;
					
					//Reset opacity to 0 
					for(var n = 0; n < divsx.length; n++) {
						if(fadeElements.indexOf(divsx[n].className) != - 1) {
							LXSetOpacity(divsx[n],0);
						}
					}
					
					element.fadeElements = fadeElements;
					element.oldMouseOver = element.onmouseover;
					element.oldMouseOut = element.onmouseout;
					
					element.onmouseover = function(e) {
						if(this.oldMouseOver) this.oldMouseOver();
						self.showBackground(e,this,this.fadeElements);
					}

					element.onmouseout = function(e) {						
						if(this.oldMouseOut) this.oldMouseOut();
						self.hideBackground(e,this,this.fadeElements);
					}
				}
			}
		}
	},
	initializeSearchBoxFade: function() {
	
		if(this.fadeTimer) clearInterval(this.fadeTimer);
		
		searchField = $g("nav_search_field");
		
		if(!searchField) return;
	
		searchField.onfocus = function() {
			var self = this;
			
			if(!this.originalValue) this.originalValue = this.value; 
			if(this.value != this.originalValue) return;                       

			if (!this.originalColor) this.originalColor = LXUtil.getComputedStyle(this,"color");

			var step = 10, target = 204, rgb = 153;     

			LXUtil.setCaretPosition($("nav_search_field"),0)

			this.fadeTimer = setInterval(function(){
				rgb = rgb  ? (rgb + step > target ? target : rgb + step) : step;
				self.style.color = "rgb(x,x,x)".replace(/x/g,rgb);
				if(rgb == target) clearInterval(self.fadeTimer);     
			},40);			
		}

		searchField.onblur = function() {
			var self = this;
			
			if(this.fadeTimer) clearInterval(this.fadeTimer);		
			
			if(this.originalColor) {			
				var step = 10;
				var target = LXUtil.getColorAsRGBArray(this.originalColor)[0];
				var rgb = LXUtil.getColorAsRGBArray(LXUtil.getComputedStyle(this,"color"))[0];
				
				this.fadeTimer = setInterval(function() {
					rgb = rgb - step < target ? target : rgb - step;
					self.style.color = "rgb(x,x,x)".replace(/x/g,rgb);
					if(rgb == target) clearInterval(self.fadeTimer);
				},40);
			}
		}

		searchField.onkeydown = function() {
			if(this.fadeTimer) clearInterval(this.fadeTimer);
			if(this.value == this.originalValue) this.value = "";
			if(this.originalColor) this.style.color = this.originalColor;
		}
	},
	initializeMoreSites: function() {
	
		var self = this;
		
		if(!$g('sitesLink')) return;
		
		$g('sitesLink').onmouseover = function(e) {
			LXAddClass(this,"on");
			
			timers['showSiteTray'] = LXSetTimeout(function(){
				LXStates.setState("sitesActive");
				 
				self.showSiteLinkTray(function() {
						self.showOverlay();
				});
			},300,true);
		}
		
		$g('lxSocialBarWrapper').onmouseout = function(e) {
			if(mousedOut(this,e)) {
				LXClearTimer(timers['showSiteTray']);
				self.hideSiteLinkTray(function() {
					self.hideOverlay(function() {
						LXStates.setState('default');
						
						//SETTING DISPLAY TO 'NONE' CAUSES DISPLAY ISSUES IN IE 7
						//FOR NOW THE Z-INDEX IS BEING SET TO -1 in LXStates
							//$g("sitesWrap").style.display = "none";
					});
				});
				try{
					$("sitesLink").className = $("sitesLink").className.replace(/on/g,"");	
				} catch (e){}
			}
		}
	},
	initializeShoppingTools: function() {
		var self = this;
		
		if(!$g('shopping')) return;
	
		$g('shopping').onmouseover = function(e) {	
		
			$g("shopping").className="gnavTools gnavToolsON";
			
			timers['showShoppingDrop'] = LXSetTimeout(function(){
				LXStates.setState("shoppingActive");
				self.showShoppingTools(function() {
					self.showOverlay();
				});
			},300,true)
		}
		
		var hideShoppingDrop = function(e) {
			if(mousedOut($g("shoppingDrop"),e) && mousedOut($g("shopping"),e) ) {
				
				LXClearTimer(timers['showShoppingDrop']);
				
				self.hideShoppingTools(function() {
					$g("shopping").className="gnavTools";	
					self.hideOverlay(function() {
						LXStates.setState('default');
					});
				});
			}
		}
		
		$g('shopping').onmouseout = hideShoppingDrop;
		$g('shoppingDrop').onmouseout = hideShoppingDrop;
	},
	initializeModels: function() {
	
		var self = this;
		
		if(!$g('topNavigation')) return;
	
		$g('topNavigation').onmouseover = function(e) {
			
			target = getTarget(e);
			
			if (target.className.indexOf("categoryLink") != -1 && target.id != "ALL") {
			
				target.onclick = function(){return false}
			
				if(!$g('vehicles').isOpen) {
					//this needs to be sandboxed
					timers['showModels'] = LXSetTimeout(function(){					
						self.showModels(target.id,function() {
							LXStates.setState("modelsActive");
							self.showOverlay();
						});
					},300,true);
					
				} else {
					self.showModels(target.id,function() {
						LXStates.setState("modelsActive");
					});	
				}
			}
		}
		
		$g('topNavigation').onmouseout = function(e) {
			//if the exit target is not the vehicles drop down, a category link, or the shopping dropdown, hide the models
			if(!mousedInto($g('vehicles'),e) && !mousedInto($g('SEDANS'),e) && !mousedInto($g('SUVS'),e) && !mousedInto($g('CONVERTIBLES'),e) && !mousedInto($g('HYBRIDS'),e) && !mousedInto($g('PERFORMANCE'),e) && !mousedInto($g('FUTURE'),e) &&  !mousedInto($g('legalDisclaimerContainer'),e) &&  !mousedInto($g('disclaimerWrap'),e)) {
			
				if($g('vehicles').isOpen && (mousedInto($g('shopping'),e) || mousedInto($g('shoppingDrop'),e))) {
					self.hideModels();
				}
				
				if($g('vehicles').isOpen && !mousedInto($g('shopping'),e) && !mousedInto($g('shoppingDrop'),e)) {
					self.hideModels(function() {
						self.hideOverlay(function(){
							LXStates.setState('default');
						});
					});
				}
			}			
			
			LXClearTimer(timers['showModels']);
		}
		
	},
	showModels: function(modelID,callback) {
		var self = this;
		
		LXClearTimer(timers['showModels']);
		LXClearTimer(timers['animationVehicles-callback']); //is this needed?
		LXClearTimer(timers['showModels-callback']); //is this needed?
		
		if(!ModelsOpen || lastCategory!=modelID){
		
			navItem = $g(modelID);			
			navItemDrop = $g(modelID + "drop");					
			
			//Switch off previous category
			if($g(lastCategory+"drop")) $g(lastCategory+"drop").style.display="none";
			if($g(lastCategory)) $g(lastCategory).className = $g(lastCategory).className.replace(/on/gi,"");
			
			//Switch on current category
			navItem.className = navItem.className+' on';
			navItemDrop.style.display = "block";		

			//If the vehicles dropdown is active, animate vehicles in
			if($g('vehicles').isOpen){
				if(browser.isSafari) {
					stackLoadVehicles(modelID);
				}else{
					setVehicleOpacity();
					animationVehicles(modelID);
				}
			} 
			
			//If the vehicles dropdown is NOT active, slide it down
			else {				
				$g('vehicles').style.display = "block";
			
				if(browser.isSafari) {
					$g('vehicles').className='css-transition-slideDown'; 
					if(callback) LXSetTimeout(function(){callback()},300);
				} else {
					setVehicleOpacity();
					// animationDown(modelID);		 
					
					var element = document.getElementById('vehicles'); 
					element.style.left = '0px'; 
					element.style.top = '-135px'; 
					element.style.width = '980px'; 
					element.style.height = '190px'; 
					
					var time = 300;
					
					animate('vehicles', 0, 76, 980, 190, time, null);  //animate(elementID, newLeft, newTop, newWidth, newHeight, time, callback
						
					timers['showModels-callback'] = LXSetTimeout(function() {
					
						animationVehicles(modelID,callback);
					},time,300);
				}
						
				$g("vehicles").isOpen = true
			}
			
			//This needs to be removed from the global scope
			lastCategory = modelID;
		}
	},
	hideModels: function(callback) {
		//prevent any queued callbacks from firing
		LXClearTimer(timers['animationVehicles-callback']);
	    LXClearTimer(timers['showModels-callback']);
		
		lxHidePromo();
				
		$g("vehicles").isOpen = false;
	
		if(browser.isSafari) {
			$g('vehicles').className='css-transition-slideUp';
			if(callback) {LXSetTimeout(function(){callback();},800);}
		} else {
			var element = document.getElementById('vehicles'); 
			element.style.left = '0px'; 
			element.style.top = '76px'; 
			element.style.width = '980px'; 
			element.style.height = '190px'; 
			animate('vehicles', 0, -135, 980, 190, 300, null);  //animate(elementID, newLeft, newTop, newWidth, newHeight, time, callback}
			if(callback) {LXSetTimeout(function(){callback();},300);}
		}
		
		if ($g(lastCategory+"drop")) $g(lastCategory+"drop").style.display="none";
		if (lastCategory) $g(lastCategory).className='categoryLink';
		lastCategory = "";		
	},
	showOverlay: function() {				
		var overlay = $g("curtain");
		if (browser.isSafari) {;
			overlay.style.display = "block";
			LXSetTimeout(function() {
				overlay.className="fadeCurtainIn";
			},1);
		} else {		
			LXFadeIn(overlay,{limit:60,time:500});
		}
	},
	hideOverlay: function(callback) {	
		var overlay = $g('curtain');
		
		LXClearTimer(timers['overlay']);	
		LXClearTimer(timers['overlay-callback']);	
		
		if(browser.isSafari){
			if (overlay.className!="fadeCurtainOut") {
				$g('curtain').className="fadeCurtainOut";
			}
			timers['overlay'] = LXSetTimeout(function(){
				overlay.style.display = "none"
			},200) //cleanup -- this should be more elegant
			if (callback) timers['overlay-callback'] = LXSetTimeout(callback,200);
		} else {
			LXFadeOut(overlay,{time:500},null,callback);			
		}
	},
	showSiteLinkTray: function(callback) {
		if($g("sites").isOpen) return
		$g("sites").isOpen = true;
		
		LXClearTimer(timers['sites-callback']);

		$g("sitesWrap").style.display = "block";	
		
		var time = browser.isSafari ? 800 : 350;
		
		if(browser.isSafari) {
			$g("sites").className='css-transition-sitesUp'
		} else {		
			LXAnimate('#sites', {top:'0px'}, {time:time})
		}
		
		if(callback) timers['sites-callback'] = LXSetTimeout(function(){
			callback();
		},time);
	},
	hideSiteLinkTray: function(callback) {			
			
		if(!$g("sites").isOpen) return;
		$g("sites").isOpen = false;		
		
		LXClearTimer(timers['sites-callback']);
		
		var time = browser.isSafari ? 800 : 350
	
		if (browser.isSafari) {
			$g('sites').className='css-transition-sitesDown';
		} else {
			LXAnimate('#sites', {top:'175px'}, {time:time})
		}
		
		if(callback) timers['sites-callback'] = LXSetTimeout(function(){
			$g("sitesWrap").style.display = "none";	
			callback();
		},time);
		
	},
	showShoppingTools: function(callback) {	
	
		LXClearTimer(timers['shoppingDrop']);
		LXClearTimer(timers['shoppingDrop-callback']);
	
		$g('shoppingDrop').style.display = "block";
					
		if (browser.isSafari) {
			$g('shoppingDrop').className="css-transition-slideShoppingIn"; 
		} else {
			var element = document.getElementById('shoppingDrop');
			element.style.left = '647px';
			element.style.top = '-135px';
			element.style.width = '250px';
			element.style.height = '175px';
			timers['shoppingDrop'] = animate('shoppingDrop', 647, 90, 250, 175, 150, null);  //animate(elementID, newLeft, newTop, newWidth, newHeight, time, callback
		}
		
		if(callback) timers['shoppingDrop-callback'] = LXSetTimeout(function() {callback();},browser.isSafari?300:150);
		
	},
	hideShoppingTools: function(callback) {	
		LXClearTimer(timers['shoppingDrop']);
		LXClearTimer(timers['shoppingDrop-callback']);
		
		if(browser.isSafari) {
			$g('shoppingDrop').className="css-transition-slideShoppingOut";
		} else {
			var element = document.getElementById('shoppingDrop');  
			element.style.left = '647px';
			element.style.top = '90px';  
			timers['shoppingDrop'] = animate('shoppingDrop', 647, -135, 250, 175, 150, null);
			timers['shoppingDrop-callback'] = LXSetTimeout(function(){
				$g("shoppingDrop").style.display="none";
				if(callback) callback();
			},150);
		}
		
		timers['shoppingDrop-callback'] = LXSetTimeout(function(){
			$g("shoppingDrop").style.display="none";
			if(callback) callback();
		},browser.isSafari ? 400 : 150);
		
	},
	showArrow: function(elem) {
			
		img = this.getElementsByTagName("img")[0];			
		img.style.position = "relative"   
		
		// [animations off]
		// this method is using set interval, so the animation interrupt in LXSetTimeout doesn't work
		if(!LXSettings.animationsOn) {
			LXSetOpacity(img,100);
			return;
		}
		
		if(!this.stopAnimations == true) {					
		   img.style.left = "-10px";
		   this.stopAnimations = true;
		   
		   arrowTimer = setInterval(function() {					   
			   l = parseInt(img.style.left);
			   
				if(l>=0) {
					clearInterval(arrowTimer);
					return;
				}
				
				l+=browser.isIE ? 2 : 1;					
				img.style.left = l+"px";
				img.style.opacity = 1-((l*-1)*.1);
				img.style.filter = "alpha(opacity=" + (100-((l*-1)*10)) + ")"   
				
			},20);                 
		}
	},
	hideArrow: function(e) {
		if(mousedOut(this,e)) {

			// [animations off]
			if(!LXSettings.animationsOn) {
				LXSetOpacity(img,0);
				return;
			}
		
			this.stopAnimations = false;
			img.style.opacity = 0;
			img.style.filter = "alpha(opacity=0)";
			LXClearInterval(arrowTimer);			
		}
	},
	showBackground: function(e,container,fadeElements,callback) {
		var divs = container.getElementsByTagName('div');
		
		if(callback) callback(e);
		
		if(this.fadeTimer) return;
		this.fadeTimer = [];
		
		for(var n = 0; n < divs.length; n++) {
			if(fadeElements.indexOf(divs[n].className) != -1) {
				var fadeElement = divs[n];	
				// setTimeout(function(){
					// fadeElement.style.display = "none";
				// },1);{
				this.fadeTimer[this.fadeTimer.length] = LXUtil.fadeIn(fadeElement,250);
			}
		}
	},
	hideBackground: function(e,container,fadeElements) {	
		if(mousedOut(container,e)) {
			this.fadeTimer = LXClearTimer(this.fadeTimer);
			var divs = container.getElementsByTagName('div');
			
			for(var n = 0; n < divs.length; n++) {
				if(fadeElements.indexOf(divs[n].className) != -1) {
					 LXSetOpacity(divs[n],0);
				}
			}
		}
	},
	showDropDown: function(dropDown){	
	
		LXStates.setState('default');
			
		LXClearTimer(timers[dropDown.id]);
			
		dropDown.style.zIndex="99999";		

		// Fix for IE 9 pull down issue
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
		 var ieversion=new Number(RegExp.$1)
			 if (ieversion>=9){
				LXSetTimeout(function() {	
					LXRemoveClass(dropDown,'fadeOut');
					LXAddClass(dropDown,'fadeIn');
				},1);
			}
		}
		
		if(browser.isSafari){
			dropDown.style.display = "block";			
			LXAddClass(dropDown,'fadeOut');
			
			//Safari transitions don't seem to work unless there's a delay before switching to the transition class
			LXSetTimeout(function() {
				LXRemoveClass(dropDown,'fadeOut');
				LXAddClass(dropDown,'fadeIn');

			},1);
		}else{
			timers[dropDown.id] = LXUtil.fadeIn(dropDown.id,300);
		}
	},
	hideDropDown: function(dropDown){	
		LXClearTimer(timers[dropDown.id]);
	
		if(browser.isSafari) {
			LXRemoveClass(dropDown,'fadeIn');
			LXAddClass(dropDown,'fadeOut');
			
			timers[dropDown.id] =  LXSetTimeout(function(){
				dropDown.style.display = "none";
			},500);
		} else {
			timers[dropDown.id] =  LXUtil.fadeOut(dropDown.id,300) 
		}
	}
}


//Helpers
LXAddClass = function(element,className) {
	element = $g(element);
	if(element.className.indexOf(className) == -1) element.className = element.className + " " + className;
}


LXRemoveClass = function(element,className) {
	element = $g(element);
	classReplace = new RegExp('(\s*)?'+className);
	if(element.className.indexOf(className) != -1) element.className = element.className.replace(classReplace,'')
}


LXAddEventListeners = function(object,event,func,capture) {
	if(window.addEventListener) {
	  object.addEventListener(event,func,capture);
	} else if(window.attachEvent) {		
	  object.attachEvent("on"+event,func);
	}
}


LXClearInterval = function(interval) {
	if(interval) clearInterval(interval);
}


LXClearTimer = function(timer) {	
	if(!timer) return;
	
	if(timer[0] && timer[0][0]) {
		for(var i = 0; i < timer.length; i++) {
			for(var n = 0; n < timer[i].length; n++) {
				clearTimeout(timer[i][n]);
			}
		}
	} else if(timer.length > 1) {	
		for(var i = 0; i < timer.length; i++) {
			clearTimeout(timer[i]);
		}
	} else {
		clearTimeout(timer);
	}
	
	return false;
}


LXExtend = function(obj, objExt) {
	for (var prop in objExt) {
		obj[prop] = objExt[prop];
	}
	return obj;
}


LXGetOpacity = function(element) {
	if(typeof element=="string") element = $g(element);
	return element.opacity || 0;
}


LXPreload = function(images,callback) {
    if (document.images) {
		if(typeof images == "string") images = [images];
        for(var i=0; i<=images.length-1; i++) {
			var imageObj = new Image();
			imageObj.src=images[i];
			if(callback) imageObj.onload = callback; 
        }
    }
}

LXSetOpacity = function(element,value) {

	try{
		if(typeof element=="string") element = $g(element);	
		browser.isIE ? element.style.filter = "alpha(opacity=" + value + ")" : element.style.opacity = value /100
		return element.opacity = value; //needed to track opacity value in ie
	}catch(err){}
}

LXSetTimeout = function(func,time,alwaysUseTimeout) {
	if(LXSettings.animationsOn || alwaysUseTimeout) return setTimeout(func,time);
	if(typeof func == "string") func = new Function(func);
	func();
	return null;
}

LXSettings = {
	animationsOn: (window.location.href.indexOf("/TheHardWay") == -1)	
} 


LXDoDynamicContent = function(options) {
	var template = options.template;
	var html = "";
	
	for(var i = 0; i < options.data.length; i++) {
		var thisHtml = template;
		options.data[i]['current'] = i+1;
		for(var p in options.data[i]) {
			token = new RegExp('{'+p+'}','g');
			thisHtml = thisHtml.replace(token,options.data[i][p]);
		}
		html+=thisHtml;
	}
	html = options.templateStart + html + options.templateEnd;
	$g(options.target).innerHTML = html;
}


//Cool stuff
LXCarousel = function(object) {
   this.scroller = $g(object.scroller);
   this.scrollerLeft = $g(object.scrollerLeft);
   this.scrollerRight = $g(object.scrollerRight);
   this.items = this.scroller.getElementsByTagName('li');
   this.totalItems = this.items.length;
   this.singleItemWidth = 154 //this should be dynamic
   this.pageWidth = 947 //this.scroller.offsetWidth; //this should be dynamic
   this.itemsPerPage = Math.floor(this.pageWidth/this.singleItemWidth)
   this.totalPages = Math.ceil(this.totalItems/this.itemsPerPage)
   this.currentPage = 1;

    this.moveRight = function() {
        if(this.currentPage < this.totalPages) {        
			LXAnimate(this.scroller, {left:-(this.pageWidth*this.currentPage)+'px'}, {time:400});       
			this.currentPage++;
			if(this.currentPage != this.totalPages) return true;
        } 
		return false;
    }

    this.moveLeft = function() {
        if(this.currentPage > 1) {           
			LXAnimate(this.scroller, {left:-(this.pageWidth*(this.currentPage-2))+'px'}, {time:400});    
			this.currentPage--;
			if(this.currentPage != 1) return true;
        }
        return false
    }

    this.scrollerLeft.onclick = (function(self) {
        return function() {
			//on YLD pages, animation on moveLeft won't animate unless we call it within a time out -- investigate
			setTimeout(function() {
				!self.moveLeft() ? LXAddClass(self.scrollerLeft,'disabled') : LXRemoveClass(self.scrollerLeft,'disabled');
				if(self.currentPage < self.totalPages) LXRemoveClass(self.scrollerRight,'disabled');
			},50);
			return false;
        }
    })(this);

    this.scrollerRight.onclick = (function(self) {
        return function() {
			//on YLD pages, animation on moveRight won't animate unless we call it within a time out -- investigate
			setTimeout(function(){
				!self.moveRight() ? LXAddClass(self.scrollerRight,'disabled') : LXRemoveClass(self.scrollerRight,'disabled');	
				if(self.currentPage > 1) LXRemoveClass(self.scrollerLeft,'disabled');
			},50)
			return false;
        }
    })(this);

	LXAddClass(this.scrollerLeft,"disabled")
		
	if(this.totalPages==1) 
		LXAddClass(this.scrollerRight,"disabled")
	
    return this;   
}

LXAnimate = function(element,settings,options,callback) {
			
	element = $g(element);	

	if(!!settings.from) {
		for(var p in settings.from) {
			element.style[p] = settings.from[p];
		}
		settings = settings.to;
	}
	
	if(!element.stop) {
		element.timers = [];
		element.stop = function() {
			LXClearTimer(this.timers);
		}
	}
	
	//todo: this should be called outside the animate class (whenever needed) 
	element.stop();
	
	options = LXExtend({time: 1000,interval: 20},options||{});
	
	options.frames = Math.round(options.time/options.interval);

	for(var p in settings) {
		var targetProperties = LXUtil.splitProperty(settings[p]);		
		var startProperties = LXUtil.splitProperty(LXUtil.getComputedStyle(element,p));
	
		var start = startProperties[1] //element['offset'+p.capitalize()] || currentPArr[1] || 0;
		var end = targetProperties[1];
		
		end = (p == "opacity" && !browser.isIE) ? end/100 : end;
		
		settings[p] = {
			end: Number(end),
			start: Number(start),
			step: Number((end-start)/options.frames),
			unit: targetProperties[2] || '' //is this check needed?
		}
	}
	
	for(i=1; i <= options.frames; i++) {
		element.timers.push(setTimeout((function(i,element,settings,totalFrames){
			return function() {
				for(var p in settings) {
					var currentStep = (i == totalFrames) ? settings[p].end : ((settings[p].start) + (settings[p].step * i))
					
					if(browser.isIE && p == 'opacity') {
						element.style.filter = 'alpha(opacity=' + currentStep  + ')';
					} else {
						element.style[p] =  currentStep +  settings[p].unit;
					}
					
					if(i == totalFrames) if(callback) callback();
				}
			}
		})(i,element,settings,options.frames),i*options.interval));
	}
	
	return element.timers;
}

LXFadeIn = function(elem,options) {
	elem = $g(elem);
	elem.style.display = "block";
	options = options || {};
	LXAnimate(elem,{opacity:options.limit||100},{time:options.time||300})
}

LXFadeOut = function(elem,options) {
	elem = $g(elem);
	elem.style.display = "block";
	options = options || {};
	LXAnimate(elem,{opacity:options.limit||0},{time:options.time||300},function() {
		elem.style.display = 'none';
	})
}



//Prototypes
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


/* Switch over all live urls to dev on mouse click */
/* Needs to be moved into a more appropriate file */
LXSwitchUrlsToDev = function(e) {
	target = (window.event) ? e.srcElement : e.target;

	while (!!target && target.nodeName != 'BODY' && target.nodeName != "A")
		target = target.parentNode;
		
	if(target && target.href && window.location.href.indexOf("devcpd") != -1)
		target.href = target.href.replace("www.yourlexusdealer.com","devcpd2.yourlexusdealer.com").replace("www.lexus.com","devcpd2.lexus.com");

	if(target && target.href && window.location.href.indexOf("origin.staging") != -1)
		target.href = target.href.replace("www.yourlexusdealer.com","origin.staging.yourlexusdealer.com").replace("www.lexus.com","origin.staging.lexus.com");
		
	target = (window.event) ? e.srcElement : e.target;
	
	while (!!target && target.nodeName != 'BODY' && target.nodeName != "FORM")
		target = target.parentNode;
		
	if(target && target.action && window.location.href.indexOf("devcpd2") != -1)
		target.action = target.action.replace("www.yourlexusdealer.com","devcpd2.yourlexusdealer.com").replace("www.lexus.com","devcpd2.lexus.com");
	
	if(target && target.action && window.location.href.indexOf("origin.staging") != -1)
		target.action = target.action.replace("www.yourlexusdealer.com","origin.staging.yourlexusdealer.com").replace("www.lexus.com","origin.staging.lexus.com");
}


/* should be changed to LXBrowser */
browser = {
	isIE: !!(/MSIE (\d+\.\d+);/.test(navigator.userAgent)),
	//if animations are off, default any safari conditionals to false
	isSafari: !!(navigator.userAgent.indexOf('Version/5')!=-1 && navigator.userAgent.indexOf('Safari')!=-1) && LXSettings.animationsOn
}


LXAddEventListeners(document,'click',LXSwitchUrlsToDev,false);


//http://www.freelancephp.net/en/domready-javascript-object-cross-browser/
var DOMReady = (function () {
	var fns = [],
		isReady = false,
		errorHandler = null,
		getFunc = function ( fn ) {
			if ( typeof fn == 'string' )
				return function () { eval( fn ); };
			return fn;
		},
		ready = function () {
	
			if(window.alreadyLoaded) return;
			window.alreadyLoaded = true;
			
			isReady = true;
			// call all registered functions
			for ( var x = 0; x < fns.length; x++ ) {
				try {
					// call function
					fns[x]();
				} catch( err ) {
					// error occured while executing function
					if ( errorHandler )
						errorHandler( err );
				}
			}
		};

	/**
	 * Setting error handler
	 * @param {function|string} fn  When string will be run like code with eval()
	 * @return {this} For chaining
	 */
	this.setOnError = function ( fn ) {
		errorHandler = getFunc( fn );

		// return this for chaining
		return this;
	};

	/**
	 * Add code or function to execute when the DOM is ready
	 * @param {function|string} fn  When string will be run like code with eval()
	 * @return {this} For chaining
	 */
	this.add = function ( fn ) {
		fn = getFunc( fn );

		// call imediately when DOM is already ready
		if ( isReady ) {
			fn();
		} else {
			// add to the list
			fns[fns.length] = fn;
		}

		// return this for chaining
		return this;
	};

	// For all browsers except IE
	if ( window.addEventListener ) {

		document.addEventListener( 'DOMContentLoaded', function(){ ready(); }, false );
		
	} else {
		// For IE
		// Code taken from http://ajaxian.com/archives/iecontentloaded-yet-another-domcontentloaded
		
		(function(){
			// check IE's proprietary DOM members
			if ( ! document.uniqueID && document.expando ) return;

			// you can create any tagName, even customTag like <document :ready />
			var tempNode = document.createElement( 'document:ready' );

			try {
				// see if it throws errors until after ondocumentready
				tempNode.doScroll( 'left' );
				
				//having some problems with iframing -- adding a check for the footer
				if(window.location.href.indexOf("index_dealer.html") != -1 && !document.getElementById("ftArea")) throw "";

				// call ready
				ready();
			} catch ( err ) {
				setTimeout( arguments.callee, 0 );
			}
		})();
	}

	return this;
})();


//Add LX initialization events to page                                                                                                                                                load
DOMReady.add(LXinit);


//Make sure the lexus logo gets loaded before anything else
LXPreload([
	'/lexus-share/images/navigation/globalnav/lexus-logo.png'
]);


function animate(elementID, newLeft, newTop, newWidth, newHeight, time, callback){

  var el = document.getElementById(elementID);
  
  if(el == null)
    return;
 
  var cLeft = parseInt(el.style.left);
  var cTop = parseInt(el.style.top);
  var cWidth = parseInt(el.style.width);
  var cHeight = parseInt(el.style.height);
 
  var totalFrames = 1;
  if(time> 0)
    totalFrames = time/40;

  var fLeft = newLeft - cLeft;
  if(fLeft != 0)
    fLeft /= totalFrames;
 
  var fTop = newTop - cTop;
  if(fTop != 0)
    fTop /= totalFrames;
 
  var fWidth = newWidth - cWidth;
  if(fWidth != 0)
    fWidth /= totalFrames;
 
  var fHeight = newHeight - cHeight;
  if(fHeight != 0)
    fHeight /= totalFrames;
   
  doFrame(elementID, cLeft, newLeft, fLeft,
      cTop, newTop, fTop, cWidth, newWidth, fWidth,
      cHeight, newHeight, fHeight, callback);
}

function doFrame(eID, cLeft, nLeft, fLeft,
      cTop, nTop, fTop, cWidth, nWidth, fWidth,
      cHeight, nHeight, fHeight, callback)
{
   var el = document.getElementById(eID);
   if(el == null)
     return;

  cLeft = moveSingleVal(cLeft, nLeft, fLeft);
  cTop = moveSingleVal(cTop, nTop, fTop);
  cWidth = moveSingleVal(cWidth, nWidth, fWidth);
  cHeight = moveSingleVal(cHeight, nHeight, fHeight);

  el.style.left = Math.round(cLeft) + 'px';
  el.style.top = Math.round(cTop) + 'px';
  el.style.width = Math.round(cWidth) + 'px';
  el.style.height = Math.round(cHeight) + 'px';
 
  if(cLeft == nLeft && cTop == nTop && cHeight == nHeight
    && cWidth == nWidth)
  {
    if(callback != null)
      callback();
    return;
  }
   
  timers[eID] = LXSetTimeout( 'doFrame("'+eID+'",'+cLeft+','+nLeft+','+fLeft+','
    +cTop+','+nTop+','+fTop+','+cWidth+','+nWidth+','+fWidth+','
    +cHeight+','+nHeight+','+fHeight+','+callback+')',20);
}

function moveSingleVal(currentVal, finalVal, frameAmt)
{
  if(frameAmt == 0 || currentVal == finalVal)
    return finalVal;
 
  currentVal += frameAmt;
  if((frameAmt> 0 && currentVal>= finalVal)
    || (frameAmt <0 && currentVal <= finalVal))
  {
    return finalVal;
  }
  return currentVal;
}


function aniVehiclesC(model,trim, steps, duration){
	var element;
	var element1;
	if(model=='sedans'){
		element = $g('gsedannav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'suvs'){
		element = $g('gsuvsnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'convertibles'){
		element = $g('gconvertiblesnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'hybrids'){
		element = $g('ghybridsnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'performance'){
		element = $g('gperformancenav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'future'){
		element = $g('gfuturenav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}		
	    
	var steps = steps,
    appearTime = duration;

    for(i=0; i<=1; i+=(1/steps)){
        LXSetTimeout((function(x){
            return function(){
				LXSetOpacity(element,x * 100);
				LXSetOpacity(element1,x * 100);
            };
        })(i), i*appearTime);
    };
}


// some demo tings
function animationVehicles(e,callback) {
	// reset opacity:
	setVehicleOpacity();
	// sequence collection
	
	LXClearTimer(timers['animationVehicles-callback']); //is this needed?
	
	
	
	if(callback)LXSetTimeout(function() {timers['animationVehicles-callback'] = callback();},250);

	switch(e.toLowerCase()){
		case "sedans":	
			LXSetTimeout("aniVehiclesC('sedans','is',20, 100)",50);
			LXSetTimeout("aniVehiclesC('sedans','es',40, 100)",100);
			LXSetTimeout("aniVehiclesC('sedans','gs',60, 100)",150);
			LXSetTimeout("aniVehiclesC('sedans','ls',80, 100)",200);
			lxShowPromo(e);
		  break;
		case "suvs":
		  	LXSetTimeout("aniVehiclesC('suvs','rx',20, 100)",50);
			LXSetTimeout("aniVehiclesC('suvs','gx',40, 100)",100);
			LXSetTimeout("aniVehiclesC('suvs','lx',60, 100)",150);
			lxShowPromo(e);
		  break;
		case "convertibles":
		    LXSetTimeout("aniVehiclesC('convertibles','isc',20, 100)",50);
			lxShowPromo(e);
		  break;
		case "hybrids":
		case "hybrids":
		    LXSetTimeout("aniVehiclesC('hybrids','cth',20, 100)",50);
			LXSetTimeout("aniVehiclesC('hybrids','hsh',40, 100)",100);
			LXSetTimeout("aniVehiclesC('hybrids','rxh',60, 100)",150);
			LXSetTimeout("aniVehiclesC('hybrids','esh',80, 100)",200);
			LXSetTimeout("aniVehiclesC('hybrids','gsh',100, 100)",250);
			LXSetTimeout("aniVehiclesC('hybrids','lsh',120, 100)",300);
			lxShowPromo(e);
		  break;
		case "performance":
		    LXSetTimeout("aniVehiclesC('performance','isf',20, 100)",50);
			LXSetTimeout("aniVehiclesC('performance','lfa',40, 100)",100);
			lxShowPromo(e);
		case "future":
			LXSetTimeout("aniVehiclesC('future','concept',20, 100)",200);
			LXSetTimeout("aniVehiclesC('future','lfcc',40, 100)",250);
			LXSetTimeout("aniVehiclesC('future','fis',60, 100)",300);
			lxShowPromo(e);
		  break;
	}
}



function aniVehicles(model,trim){

	var element;
	var element1;
	
	if(model=='sedans'){
		element = $g('gsedannav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'suvs'){
		element = $g('gsuvsnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'convertibles'){
		element = $g('gconvertiblesnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'hybrids'){
		element = $g('ghybridsnav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'performance'){
		element = $g('gperformancenav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}else if(model == 'future'){
		element = $g('gfuturenav-'+trim);
		element1 = $g('nav-spec-info-'+trim);
	}
	
	var steps = 5,
    appearTime = 100;

    for(i=0; i<=1; i+=(1/steps)){
        LXSetTimeout((function(x){
            return function(){
                element.style.opacity = x;
				element1.style.opacity = x;
                element.style.MozOpacity = x;
				element1.style.MozOpacity = x;
                element.style.KhtmlOpacity = x;
				element1.style.KhtmlOpacity = x;
                element.style.filter = "alpha(opacity=" + (x*100) + ")";  
				element1.style.filter = "alpha(opacity=" + (x*100) + ")";
            };
        })(i), i*appearTime);
    };		 
}


// some demo tings
function animationVehicles1(e) {
	// reset opacity:
	setVehicleOpacity();
	// sequence collection
	switch(e.toLowerCase()){
		case "sedans":
			aniVehicles('sedans','is');
			aniVehicles('sedans','es');
			aniVehicles('sedans','gs');
			aniVehicles('sedans','ls');
		  break;
		case "suvs":
		  	aniVehicles('suvs','rx');
			aniVehicles('suvs','gx');
			aniVehicles('suvs','lx');
		  break;
		case "convertibles":
		    aniVehicles('convertibles','isc');
		  break;
		case "hybrids":
		    aniVehicles('hybrids','cth');
			aniVehicles('hybrids','hsh');
			aniVehicles('hybrids','rxh');
			aniVehicles('hybrids','esh');
			aniVehicles('hybrids','gsh');
			aniVehicles('hybrids','lsh');
		  break;
		case "performance":
		    aniVehicles('performance','isf');
			aniVehicles('performance','lfa');
		case "performance":
			aniVehicles('future','concept');
			aniVehicles('future','lfcc');
		  break;
		default:
		  break;
	}
}


function stackLoadVehicles(x){
	var VehicleLinks=$g(x+'drop').getElementsByTagName('a');
	for(var i=0; i<VehicleLinks.length; i++){ VehicleLinks[i].className='hidden'; }
	ShowVehicle(x,0,VehicleLinks.length);
}


function ShowVehicle(cat,num,top){
	if(num<top){
		showingVehicleTimer = LXSetTimeout(function(){
			$g(cat+'drop').getElementsByTagName('a')[num].className='reveal nav-header-dropdown';
			num++;
			ShowVehicle(cat,num,top);
		},50);
	}
}


function setVehicleOpacity(){
	ve = $g("vehicles").getElementsByTagName("div")
	
	for(var i = 0; i < ve.length; i++) 
		if (ve[i].className=="nav-header-dropdown") LXSetOpacity(ve[i],0);
}

//Legacy -- needed 
function ShopOut(){}
function animShopping(){}
function ShopIn(x){}
function showModels(x){}
function fadeCurtainOut(callback){}
function gnavhide(){}
function dropDownIn(){}
function dropDownOut(){}

function lxHidePromo(){
	if($g("div-promo")){
		$g("div-promo").style.display = "none";	
	}
	if($g("lxpromolinkid_sedans")){
		$g("lxpromolinkid_sedans").style.display = "none";
		$g('lxImgPromo_sedans').style.display = "none";		
	}
	if($g("lxpromolinkid_suvs")){
		$g("lxpromolinkid_suvs").style.display = "none";
		$g('lxImgPromo_suvs').style.display = "none";		
	}
	if($g("lxpromolinkid_convertibles")){
		$g("lxpromolinkid_convertibles").style.display = "none";	
		$g('lxImgPromo_convertibles').style.display = "none";	
	}
	if($g("lxpromolinkid_hybrids")){
		$g("lxpromolinkid_hybrids").style.display = "none";	
		$g('lxImgPromo_hybrids').style.display = "none";	
	}
	if($g("lxpromolinkid_performance")){
		$g("lxpromolinkid_performance").style.display = "none";	
		$g('lxImgPromo_performance').style.display = "none";	
	}
	if($g("lxpromolinkid_future")){
		$g("lxpromolinkid_future").style.display = "none";	
		$g('lxImgPromo_future').style.display = "none";	
	}
}

function lxCreatePromo(vehicle, vehiclehref, vehicleimg, promoOn){
	//if($g('vehicles').style.height == '190px'){		
	//}
	var vehicle = vehicle;
	var vehiclehref = vehiclehref;
	var vehicleimg = vehicleimg;
	var promoOn = promoOn;
	
	if(!$g("div-promo")){
        var divTag = document.createElement("div");
        divTag.id = "div-promo";
        divTag.style.border = "2px solid green";
		//divTag.style.position = "absolute";
		//divTag.style.top = $g('vehicles').style.height;
		divTag.style.backgroundColor = "#FFFFFF";
		divTag.style.width = "700px";
		divTag.style.height = "40px";
        divTag.style.marginTop = "200px";
		divTag.style.marginLeft = "100px";
        divTag.className ="dynamicDiv";
        document.getElementById('vehicles').appendChild(divTag);
		if($g("div-promo") && promoOn == "false")$g("div-promo").style.display = "none";

	}else{
		if(promoOn == "true"){
			if($g('vehicles').style.height == '190px'){	
				$g("div-promo").style.display = "block";	
			}
		}else{
				$g("div-promo").style.display = "none";	
		}
	}

		
	if(!$g('lxpromolinkid_'+vehicle) && (promoOn == 'true')){	
		if($g("lxpromolinkid_sedans"))$g("lxpromolinkid_sedans").style.display = "none";
		if($g("lxpromolinkid_suvs"))$g("lxpromolinkid_suvs").style.display = "none";
		if($g("lxpromolinkid_convertibles"))$g("lxpromolinkid_convertibles").style.display = "none";
		if($g("lxpromolinkid_hybrids"))$g("lxpromolinkid_hybrids").style.display = "none";
		if($g("lxpromolinkid_performance"))$g("lxpromolinkid_performance").style.display = "none";
		if($g("lxpromolinkid_future"))$g("lxpromolinkid_future").style.display = "none";
		var lxPromoLink=document.createElement("a");
		lxPromoLink.setAttribute("class","lxpromolink");
		lxPromoLink.setAttribute("id","lxpromolinkid_"+vehicle);
		lxPromoLink.setAttribute("href",vehiclehref);
		document.getElementById('div-promo').appendChild(lxPromoLink);		
	}else{
		if($g("lxpromolinkid_sedans"))$g("lxpromolinkid_sedans").style.display = "none";
		if($g("lxpromolinkid_suvs"))$g("lxpromolinkid_suvs").style.display = "none";
		if($g("lxpromolinkid_convertibles"))$g("lxpromolinkid_convertibles").style.display = "none";
		if($g("lxpromolinkid_hybrids"))$g("lxpromolinkid_hybrids").style.display = "none";
		if($g("lxpromolinkid_performance"))$g("lxpromolinkid_performance").style.display = "none";
		if($g("lxpromolinkid_future"))$g("lxpromolinkid_future").style.display = "none";
		if($g('lxpromolinkid_'+vehicle))$g('lxpromolinkid_'+vehicle).style.display = "block";	
	
	}
	if(!$g('lxImgPromo_'+vehicle) && (promoOn == 'true')){	
		if($g("lxImgPromo_sedans"))$g("lxpromolinkid_sedans").style.display = "none";
		if($g("lxImgPromo_suvs"))$g("lxpromolinkid_suvs").style.display = "none";
		if($g("lxImgPromo_convertibles"))$g("lxpromolinkid_convertibles").style.display = "none";
		if($g("lxImgPromo_hybrids"))$g("lxpromolinkid_hybrids").style.display = "none";
		if($g("lxImgPromo_performance"))$g("lxpromolinkid_performance").style.display = "none";
		if($g("lxImgPromo_future"))$g("lxpromolinkid_future").style.display = "none";
		var img = document.createElement('img');
		img.src = vehicleimg;
		img.id = "lxImgPromo_"+vehicle;
		document.getElementById('lxpromolinkid_'+vehicle).appendChild(img);
	}else{
		if($g("lxImgPromo_sedans"))$g("lxImgPromo_sedans").style.display = "none";
		if($g("lxImgPromo_suvs"))$g("lxImgPromo_suvs").style.display = "none";
		if($g("lxImgPromo_convertibles"))$g("lxImgPromo_convertibles").style.display = "none";
		if($g("lxImgPromo_hybrids"))$g("lxImgPromo_hybrids").style.display = "none";
		if($g("lxImgPromo_performance"))$g("lxImgPromo_performance").style.display = "none";
		if($g("lxImgPromo_future"))$g("lxImgPromo_future").style.display = "none";
		if($g('lxImgPromo_'+vehicle))$g('lxImgPromo_'+vehicle).style.display = "block";	
		
	}
}

function lxShowPromo(modelID){
	modelID = modelID.toLowerCase();
	lxHidePromo();
	if(lxPromoObj[modelID]) lxCreatePromo(modelID,lxPromoObj[modelID].hreflink,lxPromoObj[modelID].imglink, lxPromoObj[modelID].on);
};


// SET GLOBAL PROMO LINKS:
var lxPromoObj={
		sedans:{hreflink:'sedan.html',imglink:'/lexus-share/images/navigation/promos/promo-sedans.png',on:'false'},
		suvs:{hreflink:'suvs.html',imglink:'/lexus-share/images/navigation/promos/promo-suvs.png', on:'false'},
		convertibles:{hreflink:'convertibles.html',imglink:'/lexus-share/images/navigation/promos/promo-convertibles.png', on:'false'},
		hybrids:{hreflink:'hybrids.html',imglink:'/lexus-share/images/navigation/promos/promo-hybrids.png', on:'false'},
		performance:{hreflink:'performance.html',imglink:'/lexus-share/images/navigation/promos/promo-performance.png', on:'false'}
};

if (location.protocol == "https:") {
	if (location.href.indexOf('devcpd2')>-1){
		LEXUS_URL = "https://secure.devcpd2.lexus.com";
	} else if (location.href.indexOf('staging')>-1){
		LEXUS_URL = "https://secure.staging.lexus.com";
	} else {
		LEXUS_URL = 'https://' + 'secure.' +'www.lexus.com'.replace('www.', '');
	}
} else {
	if (location.href.indexOf('devcpd2')>-1) {
		LEXUS_URL = "http://devcpd2.lexus.com";
	}
	if (location.href.indexOf('staging')>-1) {
		if (location.href.indexOf('origin')>-1) {
			LEXUS_URL = "http://origin.staging.lexus.com";
		} else {
			LEXUS_URL = "http://staging.lexus.com";
		} 
	}
	if (location.href.indexOf('www') > -1) {
		if (location.href.indexOf('origin')>-1) {
			LEXUS_URL = "http://origin.www.lexus.com";
		} else {
			LEXUS_URL = "http://www.lexus.com";
		} 
	}
}
