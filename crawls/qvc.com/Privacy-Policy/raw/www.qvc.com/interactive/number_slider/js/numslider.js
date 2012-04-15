var numslider = {
	
	'currScreen' : 0,
	'newSlide': 0,
	'totalScreens' : numCfg.screen.length,
	'isIE6' : (platform.browser == "msie" && platform.version < 7) || false,
	'isFF3' : (platform.browser == "firefox" && platform.version < 4) || false,
	'isMobile' : (platform.device != false) || false,
	//'isMobile' : true,
	'controlW' : 34,
	'controlH' : 22,
	'isFading' : false,
	'imgDepth' : 20,
	'topDepth' : 100,
	"alreadyTagged": [],
	'playPauseToggle' : 'pause',
	'playPauseText' : '',
	'timer' : 0,
	'stage' : document.getElementById('numsliderStage'),
	
	init : function(){
		numslider.preloadImages();
	},
		
	buildSlide : function(){
		
		if (numslider.isMobile) {
			numslider.controlW = 44;
			numslider.controlH = 44;
		}
		
		var fadeNum = (numCfg.imgProps.fadeSec/1000);
		var fadeCSS = ".fade { " + 
			"transition: opacity " + fadeNum + "s linear 0s; " +
			"-moz-transition: opacity " + fadeNum + "s linear 0s; " + 
			"-webkit-transition: opacity " + fadeNum + "s linear 0s; }";
		var fadeStyle = document.createElement('style');
			fadeStyle.type = "text/css";
		if (!!(window.attachEvent && !window.opera)) {
			fadeStyle.styleSheet.cssText = fadeCSS;
		} else {
			var fadeStyleText = document.createTextNode(fadeCSS);
			fadeStyle.appendChild(fadeStyleText);
		}
		numslider.stage.appendChild(fadeStyle);	
		
		var sliderContainer = document.createElement('div');
			sliderContainer.className = "numsliderContainer";
			sliderContainer.style.width = numCfg.imgProps.width + "px";
			sliderContainer.style.height = numCfg.imgProps.height + "px";
		numslider.stage.appendChild(sliderContainer);
			
		var sliderImages = document.createElement('div');
			sliderImages.id = "numImages";
			sliderImages.className = "numsliderImages";
			sliderImages.style.width = numCfg.imgProps.width + "px";
			sliderImages.style.height = numCfg.imgProps.height + "px";
			
		for (i = (numslider.totalScreens-1); i >= 0; i--) {
			
			var slideDiv = document.createElement('div');
				slideDiv.id = "slide" + i;
				slideDiv.className = "slideImg";
			numslider.imgDepth += 5;
			var slideImg = document.createElement('img');
				slideImg.src = numCfg.screen[i].mainImgUrl;
				slideImg.width = numCfg.imgProps.width;
				slideImg.height = numCfg.imgProps.height;
			slideDiv.appendChild(slideImg);
			sliderImages.appendChild(slideDiv);
			
		}
		sliderContainer.appendChild(sliderImages);
		
		var slideDiv = document.getElementById("slide" + numslider.currScreen);
			slideDiv.style.display = "block";
		
		var mainLinkDiv = document.createElement('div'); 
			mainLinkDiv.className = "stageLinkDiv";
			mainLinkDiv.style.top = "0px";
			mainLinkDiv.style.left = "0px";
		
		var mainLink = document.createElement('a');
		if (numCfg.screen[0].mainImgLink != "") {
			mainLink.href = numCfg.screen[0].mainImgLink;
			mainLink.setAttribute("manual_cm_sp", numCfg.screen[0].mainImgCMSP);
			mainLink.setAttribute("manual_cm_re", numCfg.screen[0].mainImgCMRE);
		}
		mainLink.title = numCfg.screen[0].mainImgTitle;
		mainLink.className = "stage_link";
		mainLink.id = "stageLink";
		if (typeof(numCfg.screen[0].target) != "undefined") { mainLink.target = numCfg.screen[0].target; }
		
		var imgLink = document.createElement('img');
			imgLink.src = "http://images-p.qvc.com/is/image/pic/hp/shim.gif?fmt=gif-alpha";
			imgLink.alt = numCfg.screen[0].mainImgTitle;
			imgLink.width = numCfg.imgProps.width;
			imgLink.height = numCfg.imgProps.height;
			imgLink.id = "stageLinkImg";
		
		mainLink.appendChild(imgLink);
		mainLinkDiv.appendChild(mainLink);
		sliderContainer.appendChild(mainLinkDiv);
		
		var controlContainer = document.createElement('div');
			controlContainer.className = "controlContainer";
			controlContainer.style.width = numCfg.imgProps.width + "px";
			if (numslider.isIE6) {
				controlContainer.style.height = numslider.controlH + "px";
			} else {
				controlContainer.style.height = 0 + "px";
			}
		var sliderControls = document.createElement('div');
			sliderControls.className = "sliderControls " + numCfg.imgProps.btnAlign;
			sliderControls.style.width = (73 + ((numslider.controlW + 1) * numslider.totalScreens)) + "px";
			sliderControls.style.height = numslider.controlH + "px";
			if (!numslider.isIE6) { sliderControls.style.marginTop = ("-" + numslider.controlH + "px"); }
		controlContainer.appendChild(sliderControls);
		sliderContainer.appendChild(controlContainer);
		
		for (i = 0; i < numslider.totalScreens; i++) {
			var thumbNail = document.createElement('a');
				thumbNail.id = i;
				if (i == 0) {
					thumbNail.className = "sliderButton active";
				} else {
					thumbNail.className = "sliderButton";
				}
				thumbNail.onmouseover = function() { numslider.thumbDown(Number(this.id)); }
				thumbNail.onmouseout = function() { numslider.thumbUp(Number(this.id)); }
				thumbNail.onclick = function() {
					if (!numslider.isFading) {
						numslider.changeSlide(Number(this.id));
						if (numslider.playPauseToggle == "pause") {
							document.getElementById("playPauseBtn").className = "playPause play";
							numslider.playPauseText.nodeValue = "play";
							numslider.playPauseToggle = "play";
							clearTimeout(numslider.timer);
						}
					}
				};
				thumbNail.style.width = numslider.controlW + "px";
				thumbNail.style.height = numslider.controlH + "px";
				thumbNail.style.lineHeight = numslider.controlH + "px";
			var thumbNum = document.createTextNode(i + 1);
			thumbNail.appendChild(thumbNum);
			sliderControls.appendChild(thumbNail);
		}
		
		var playPauseBtn = document.createElement('a');
			playPauseBtn.id = "playPauseBtn";
			playPauseBtn.className = "playPause pause";
			playPauseBtn.onmouseover = function() { numslider.playPauseDown(); }
			playPauseBtn.onmouseout = function() { numslider.playPauseUp(); }
			playPauseBtn.onclick = function() { numslider.playPause(); }
			playPauseBtn.style.height = numslider.controlH + "px";
			playPauseBtn.style.lineHeight = numslider.controlH + "px";
		var playPauseText = document.createTextNode("pause");
		numslider.playPauseText = playPauseText;
		
		playPauseBtn.appendChild(playPauseText);
		sliderControls.appendChild(playPauseBtn);
		
		var loadingDiv = document.getElementById("loadingDiv");
		numslider.stage.removeChild(loadingDiv);
		
		if (numCfg.screen[numslider.currScreen].dbID != "") {
			var fooDB = document.getElementById(numCfg.screen[numslider.currScreen].dbID);
			fooDB.removeAttribute("style");
			fooDB.style.display = "block";
		}
		
		//setTimeout("numslider.tagSlideMetrics()",2000);
		setTimeout("numslider.startSlide()",1500);
			
	},
	
	startSlide : function(){
		
		var slide = (numslider.currScreen + 1);
		if (slide >= numslider.totalScreens) { slide = 0; }
		if (numslider.timer){
			clearTimeout(numslider.timer);
		}
		var csTime = numCfg.screen[numslider.currScreen].slideTime;
		numslider.timer = setTimeout("numslider.changeSlide(" + slide + ")",csTime);
		
	},
	
	changeSlide : function(slide){
		
		if (slide != numslider.currScreen) {
			numslider.newSlide = slide;
			numslider.isFading = true;
			var bottomSlide = document.getElementById("slide" + numslider.newSlide);
				bottomSlide.style.display = "block";
			numslider.tagSlideMetrics();
			numslider.thumbSwitch(numslider.newSlide);
			numslider.fadeSlide();
		}
		
	},
	
	tagSlideMetrics : function(){
			
		for ( i = 0; i < numslider.alreadyTagged.length; i++ ) {
			if (numslider.alreadyTagged[i] == numslider.newSlide) { return; }
		}
		numslider.alreadyTagged.push(numslider.newSlide);
		cmCreateManualLinkClickTag("?cm_re=" + numCfg.screen[numslider.newSlide].thumbCMRE + "&cm_sp=" + numCfg.screen[numslider.newSlide].thumbCMSP);

	},
	
	fadeSlide : function(){
		
		var topSlide = document.getElementById("slide" + numslider.currScreen);
		if (numCfg.screen[numslider.currScreen].dbID != "") { var fooDB = document.getElementById(numCfg.screen[numslider.currScreen].dbID); }
		if ((!numslider.isCanvasSupported()) || numslider.isFF3) {
			if (numCfg.screen[numslider.currScreen].dbID != "") {
				transition.Animate(topSlide, 100, 0, 10, (numCfg.imgProps.fadeSec/10), 1);
				transition.Animate(fooDB, 100, 0, 10, (numCfg.imgProps.fadeSec/10), 1, numslider.jsFadeEnded);
			} else {
				transition.Animate(topSlide, 100, 0, 10, (numCfg.imgProps.fadeSec/10), 1, numslider.jsFadeEnded);
			}
		} else {
			topSlide.className = "slideImg fade out";
			if (numCfg.screen[numslider.currScreen].dbID != "") { fooDB.className = "fade out"; }
			setTimeout("numslider.cssFadeEnded()",numCfg.imgProps.fadeSec);
		}
		
	},
	
	jsFadeEnded : function(){
		
		if (numCfg.screen[numslider.currScreen].dbID != "") {
			var fooDB = document.getElementById(numCfg.screen[numslider.currScreen].dbID);
			fooDB.removeAttribute("style");
			fooDB.style.display = "none";
		}		
		numslider.topSlide();
		
	},
	
	cssFadeEnded : function(){
		
		if (numCfg.screen[numslider.currScreen].dbID != "") {
			var fooDB = document.getElementById(numCfg.screen[numslider.currScreen].dbID);
			fooDB.removeAttribute("style");
			fooDB.removeAttribute("class");
		}
		numslider.topSlide();
		
	},
	
	topSlide : function(){
		
		var parent = document.getElementById('numImages');
		var topSlide = document.getElementById("slide" + numslider.currScreen);
		var obj = document.getElementById('slide' + numslider.newSlide);
		parent.insertBefore(obj, null);
		topSlide.removeAttribute("style");
		topSlide.className = "slideImg";
		
		if (numCfg.screen[numslider.newSlide].dbID != "") {
			var fooDB = document.getElementById(numCfg.screen[numslider.newSlide].dbID);
			fooDB.removeAttribute("style");
			fooDB.style.display = "block";
		}
		
		var mainLink = document.getElementById("stageLink");
		if (numCfg.screen[numslider.newSlide].mainImgLink != "") {
			mainLink.href = numCfg.screen[numslider.newSlide].mainImgLink;
			mainLink.setAttribute("manual_cm_sp", numCfg.screen[numslider.newSlide].mainImgCMSP);
			mainLink.setAttribute("manual_cm_re", numCfg.screen[numslider.newSlide].mainImgCMRE);
		} else {
			mainLink.removeAttribute("href");
			mainLink.removeAttribute("manual_cm_sp");
			mainLink.removeAttribute("manual_cm_re");
		}
		if (typeof(numCfg.screen[numslider.newSlide].target) != "undefined") { 
			mainLink.target = numCfg.screen[numslider.newSlide].target;
		} else if (typeof(numCfg.screen[numslider.currScreen].target) != "undefined") { 
			mainLink.removeAttribute("target");
		}
		mainLink.title = numCfg.screen[numslider.newSlide].mainImgTitle;
		var imgLink = document.getElementById("stageLinkImg");
		imgLink.alt = numCfg.screen[numslider.newSlide].mainImgTitle;
		numslider.currScreen = numslider.newSlide;
		numslider.isFading = false;
		if (numslider.playPauseToggle == "pause") { numslider.startSlide(); }
			
	},
	
	playPause : function(){
		
		if (numslider.playPauseToggle == "pause"){
			document.getElementById("playPauseBtn").className = "playPause play active";
			numslider.playPauseText.nodeValue = "play";
			numslider.playPauseToggle = "play";
			clearTimeout(numslider.timer);
		}
		else {
			document.getElementById("playPauseBtn").className = "playPause pause active";
			numslider.playPauseText.nodeValue = "pause";
			numslider.playPauseToggle = "pause";
			numslider.startSlide();
		}
		
	},
	
	playPauseUp : function(){
		
		if (numslider.playPauseToggle == "pause"){
			document.getElementById("playPauseBtn").className = "playPause pause";
		}
		else {
			document.getElementById("playPauseBtn").className = "playPause play";
		}
		
	},
	
	playPauseDown : function(){
		
		if (numslider.playPauseToggle == "pause"){
			document.getElementById("playPauseBtn").className = "playPause pause active";
		}
		else {
			document.getElementById("playPauseBtn").className = "playPause play active";
		}
		
	},
	
	thumbDown : function(i){
		
		if ((i != numslider.currScreen) && (i != numslider.newSlide)){
			document.getElementById(i).className = "sliderButton active";
		}
		
	},
	
	thumbUp : function(i){
		
		if ((i != numslider.currScreen) && (i != numslider.newSlide)){
			document.getElementById(i).className = "sliderButton";
		}
		
	},
	
	thumbSwitch : function(i){
		
		if (i != numslider.currScreen){
			document.getElementById(i).className = "sliderButton active";
			document.getElementById(numslider.currScreen).className = "sliderButton";
		}
		
	},
	
	isCanvasSupported : function (){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	},
	
	preloadImages : function(){
		var imgProgress = 0;
		var elemCount = 0;		
		var loadingDiv = document.createElement("div");
			loadingDiv.id = "loadingDiv";
			loadingDiv.className = "loader";
		var topDepth = ( (numCfg.screen.length - 1) * 5 ) + 120;
			loadingDiv.style.zIndex = topDepth;
			loadingDiv.style.width = numCfg.imgProps.width + "px";
			loadingDiv.style.height = numCfg.imgProps.height + "px";
		var loadingTxtP = document.createElement("p");
			loadingTxtP.className = "loadingTxt";
		var loadingTxt = document.createTextNode("loading");
		var loadingImg = document.createElement("p");
			loadingImg.className = "loadingImg";
		var loadingMarginNum = Math.ceil((numCfg.imgProps.height / 2)) - 35;
		var loadingMargin = "" + loadingMarginNum + "px";
			loadingTxtP.style.marginTop = loadingMargin;
		
		loadingTxtP.appendChild(loadingTxt);
		loadingDiv.appendChild(loadingTxtP);
		loadingDiv.appendChild(loadingImg);
		numslider.stage.appendChild(loadingDiv);
				
		(function() {
			var imageCount = numCfg.screen.length;
		  	var loadedCount = 0;
		  	var errorCount = 0;

		  	var verifyGroupLoaded = function() {
				if (loadedCount == imageCount) { numslider.buildSlide(); }
		  	}

			var onload = function() {
				loadedCount++;
				numslider.buildSlide();
			}
			
		  	var onerror = function() {
				errorCount++;
				verifyGroupLoaded();
			}

		  	for (var i = 0; i < imageCount; i++) {
				var pImg = new Image();
				pImg.src = numCfg.screen[i].mainImgUrl;
				if (i == imageCount - 1) { pImg.onload = onload; }				
			}
		})();
	}

}

var transition = {
	
	Animate : function( elem, startValue, endValue, steps, intervals, powr, listener ) {
	    if (elem.widthChangeMemInt) { window.clearInterval( elem.widthChangeMemInt ); }
	    var currStep = 0;
	    elem.widthChangeMemInt = window.setInterval(
			function() { 
				elem.alpha = transition.fade( startValue,endValue,steps,currStep, powr );
				elem.style.opacity = elem.alpha;
				elem.style.filter = 'alpha(opacity=' + elem.alpha * 100 + ')';
				currStep++;
				if ( currStep > steps ) {
					if (listener != null) { listener.call(); }
					window.clearInterval( elem.widthChangeMemInt );
				}
			},intervals )
	},
	
	easeInOut : function(minValue,maxValue,totalSteps,actualStep,powr) {
		var delta = maxValue - minValue;
		var stepp = minValue + ( Math.pow( ( ( 1 / totalSteps ) * actualStep ), powr ) * delta );
		return Math.ceil( stepp );
	},
	
	fade : function( minValue, maxValue, totalSteps, actualStep ,powr ) {
		var delta = maxValue - minValue;
		var stepp = minValue + ( Math.pow( ( ( 1 / totalSteps ) * actualStep ), powr ) * delta );
		var v = stepp / 100; 
		return v.toFixed(1);
	}
	
}

numslider.init();