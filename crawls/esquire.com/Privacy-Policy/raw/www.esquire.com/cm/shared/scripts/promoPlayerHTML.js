if (typeof HDM == 'undefined') {
	var HDM = {};
}

HDM.ads = {
	viewCount: 1, //this is the first view, so set to 1
	//fake ad tags taken from live GHK.. for testing
	fakeAdJSON: {
		"ams_gh_top":"<!-- Begin 728x90 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=728x90,1000x124;tile=1;pos=1;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 728x90 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof lb728t == 'object'){lb728t[0] = 1;lb728t[1]++} else {var lb728t = new Array(2);lb728t[0]=1;lb728t[1]=0};</script>",
		"ams_gh_gallery":"<!-- Begin 336x280 Top Ad Tag -->\r\n<script language=\"JavaScript\" type=\"text/javascript\">\r\nif(typeof(segQS) == \"undefined\") {var segQS=\"\";}\r\nif(typeof(ord) == \"undefined\") {var ord=\"1234567890\";}\r\nif(typeof(g_GamePageName) == \"undefined\") {var g_GamePageName = '';};\r\ndocument.write('<script language=\"JavaScript\" src=\"http://ad.doubleclick.net/adj/hdm.goodhousekeeping/wellness/;sz=336x280;tile=2;pos=4;' + segQS + 'site=goodhousekeeping;sect=health;sub=advice;subsub=index;page=healthy-alternatives;cat=wellness;subcat=;tool=cravings-911;kw=;a=;b=;game=' + g_GamePageName + ';ord=' + ord + '?\" type=\"text/javascript\"><\\/script>');\r\n</script>\r\n<!-- End 336x280 Top Ad Tag -->\r\n<script language=\"Javascript\">if (typeof gal336t == 'object'){gal336t[0] = 1;gal336t[1]++} else {var gal336t = new Array(2);gal336t[0]=1;gal336t[1]=0};</script>"
	},
	//array of regular expressions that will match our ads.. i could have made one big one, but this is more readable (and easier to add to)
	refreshablePositions: [
		/^ams_\w+_top$/i, //banner ad
		/^ams_\w+_tower$/i, //tower ad
		/^ams_\w+_skyscraper$/i, //tower ad
		/^ams_\w+_bottom$/i, //bottom banner
		/^ams_\w+_gallery$/i, //gallery ad
		/^ams_\w+_gallery_bottom$/i, //bottom gallery ad
		/^ams_\w+_wild$/i, //wild card ad
		/^ams_\w+_social_ad$/i //social ad
	],
	positionList: '', //String - will store the position list string for page-ads.js
	pageAdsParams: {}, //Object - will store the pageAdsParams object for page-ads.js
	//intializer.. sets up the pageAdsParams object for page-ads calls.. sets the refresh and flipbook ad intervals
	init: function(pageAdsParams,refreshInterval,flipbookAdInterval){
		var self = HDM.ads,
			positionList, //this will hold our position list after filtering it through the white list
			$allPositions = $('[id^=ams_]'); //this collection will contain all ams elements on the page
		self.pageAdsParams = pageAdsParams || {};
		self.pageAdsParams.position_list = self.getPositionList($allPositions);
		self.refreshInterval = refreshInterval || 4;
		self.flipbookAdInterval = flipbookAdInterval || 5;
		window.refreshAds = self.refreshAds; //set the global refreshAds function for legacy applications
	},
	//returns a list of positions to refresh as a string: 'ams_gh_top,ams_gh_gallery'
	getPositionList: function($positions){
		//$positions will be a jQuery collection of all ad nodes on the page
		var self = HDM.ads,
			positionList = ''; //start off with an empty string
		//loop through the ads
		$positions.each(function(){
			//loop through the list of refreshable positions
			for (var i = 0, len = self.refreshablePositions.length; i < len; i++){
				//if our ad node's id matches the refreshable position, add it to the list
				if ( this.id.match(self.refreshablePositions[i]) ){
					positionList += this.id + ',';
				}
			}
		});
		return positionList.substring(0,positionList.length - 1); //return the list and get rid of the trailing comma
	},
	refreshAds: function(forceRefresh){
		var self = HDM.ads,
			//check to see if the dapMgr object exists and we're on delish.. if so we're gonna call a different function
			isMSN = (typeof dapMgr === 'object') && window.location.hostname.match('delish.com');
		if (isMSN){ return self.refreshMSNAds(); } //if it's MSN, call the msn refresh ads function and exit
		if (forceRefresh === true || self.viewCount >= self.refreshInterval){ //if we're forcing a refresh or we've reached the refresh interval..
			self.getAds(function(adjson){ //get the new ads
				self.renderAdJSON(adjson); //render the ads that come back
				self.trackingCalls(); //execute the tracking calls
			});
			self.viewCount = 1; //reset the view count
			return true;
		}
		self.trackingCalls();
		self.viewCount++; //if we didn't force a refresh or hit the refresh interval, increment the view count
		return false;
	},
	//this function will make all of our tracking calls
	trackingCalls: function(){
		try { pageviewTracking(); } catch(e) {}
		try { _vrtrack(); } catch(e) {}
	},
	refreshMSNAds: function(){
		//call the MSN tracking functions
        try { wlAnalytics.TrackPage(); }
		catch (e) {
			try {
				$.track.trackInfo.userStatic.requestId = null;
				$.track.trackPage();
			} catch(e){}
		}
		//find the msn ads
		$('[id^=ams_del]').each(function(){
			var adIndex = dapMgr.getAdItemIndex(this.firstChild.id); //get the index of the ad in dapMgr
			if (adIndex >= 0){ dapMgr.displayAd(adIndex); } //if we have a valid ad index, refresh it
		});
		return true;
	},
	//renderAds takes a position name and a target jQuery object
	//it makes a call to page-ads for the positionName and renders the ad inside the target
	renderAd: function(positionName,$target){
		var self = HDM.ads;
		//if a target wasn't passed, look for an element with the same id as the position name
		if (typeof target === 'undefined'){
			target = $(document.getElementById(positionName));
		}
		self.getAds(function(adjson){ //get the ad, passing in the position name
			self.renderAdJSON(adjson,$target); //render the ad
		},positionName);
	},
	//all this really does it take a string and wrap it in jQuery then append it to the container
	//need to look for the document.write doubleclick stuff and handle that appropriately
	renderAdJSON: function(adjson,$target){
		$.each(adjson,function(i,val){
			//if there's a target passed, that's out container.. otherwise get the element with the id of our ad object
			var $container = (typeof $target === 'undefined') ? $(document.getElementById(i)) : $target,
				$adHTML, //this will hold out ad html
				randomColor, //random color we'll give to preview ad backgrounds for lols
				isAdDebug = val.match('FOR PREVIEW ONLY - Ad Ops Debug'), //look for preview ads for testing the refresh
				isDoubleClick = val.match('ad.doubleclick.net/adj/'); //matches doubleclick javascript ads.. we need to turn them into iframe ads
			if ( isDoubleClick ){ //if it's a doubleclick ad.. handle it
				val = HDM.ads.handleDoubleclickAd(val); //swap the document.write for an iframe
			}
			$adHTML = $(val); //wrap the string in jquery and poof we have an ad
			if ( isAdDebug ){ //if it's a preview ad..
				randomColor = 'rgb(' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ',' + Math.ceil(Math.random()*254) + ')'; //get a random rgb color
				$adHTML.filter('div').css({'background-color':randomColor}); //set the divs background-color to our random color
			}
			$container.html($adHTML); //insert the ad html into the container
		});
	},
	handleDoubleclickAd: function(adCode){
		//finds the document.write line in the doubleclick ad
		var doubleclickReg = /document\.write\(\'<script[\s\w="]+src="([\w\s\:\/\.;=,'\+-?]+)"[\s\w="\/]+><\\\/script>'\);/,
			sizeCodeReg = /\d{2,4}x\d{2,4}/g, //looking for size codes like 336x280, 1024x90, etc..
			varReplaceReg = /'\s\+\s\w*\s\+\s'/g, //find variables we need to replace (' + ord + ')
			varNameReg = /\w+/, //matches the variable name in the string being replaced abovedoubleclickURL,
			doubleclickURL, //will hold our doubleclick iframe url
			variablesToReplace, //array for the variables we need to replace
			tempVar, //temp var to hold the variable names
			sizeArray, //array for the ad size codes
			tempSize, //temp var to hold the sizes
			styleString = ""; //style string for the iframe	
			
		doubleclickURL = doubleclickReg.exec(adCode)[1]; //the url for our doubleclick ad tag
		doubleclickURL = doubleclickURL.replace('/adj/','/adi/'); //swap adj (js document.write implementaion) for adi (iframe implementation)
		adCode = adCode.replace(doubleclickReg,''); //strip out the document.write line
		variablesToReplace = doubleclickURL.match(varReplaceReg); //get an array of the variables we need to replace
		//loop through the variables
		for (var j = 0; j < variablesToReplace.length; j++){
			tempVar = variablesToReplace[j].match(varNameReg)[0]; //get the variable name
			tempVar = window[tempVar] || ''; //look to window for a value.. or give it an empty string
			doubleclickURL = doubleclickURL.replace(variablesToReplace[j],tempVar); //replace the variables with values
		}
		sizeArray = doubleclickURL.match(sizeCodeReg); //get the size code array
		//if there's only 1 size code, just set the style string to that size
		tempSize = sizeArray[0].split('x'); //get [width,height]
		styleString = "width:" + tempSize[0] + "px;height:" + tempSize[1] + "px;border:none;";
		//add our iframe tag into the ad string
		adCode += '<iframe src="' + doubleclickURL + '" width="' + tempSize[0] + '" height="' + tempSize[1] + '" style="' + styleString + '" frameborder="0" scrolling="no"></iframe>';
		return adCode; //return it
	},
	getAds: function(callback,positionName){
		var self = HDM.ads,
			pageAdsParams = $.extend({},self.pageAdsParams); //get a temporary pageAds Params object
		if (typeof callback !== 'function'){
			callback = function(){};
		}
		//if we passed in a position, overwrite the temp position list
		if (typeof positionName === 'string'){
			pageAdsParams.position_list = positionName;
		}
		//get the ads
		$.ajax({
			url: '/ams/page-ads.js',
			data: pageAdsParams,
			dataType: 'json',
			success: function(json){
				callback(json); //fire the callback
				//callback(self.fakeAdJSON); //this is the callback with the test ads
			}
		});
	}
};

HDM.promoPlayer = function (id,interval,speed,pPlayerAd,afterSlide) {
	//initialize vars than can be created without the needing the DOM ready
	var playerContainerId = id;
	var slideInterval = interval || 5000;
	var transitionSpeed = speed;
	var current = 0;
	var slidePosition = 0;
	var slideIntervalId = null;

	//player properties
	var playerContainer;
	var slideContainer;
	var slides;
	var total;
	var width;
	
	function removePplayerAd() {
		slides.remove('#ppad');
		nav.generate();
		if (current != 0) {
			current = current - 1;
		}
		playerContainer.children(".navLayer").children("ul.pagination").children("li").removeClass("current");
		playerContainer.children(".navLayer").children("ul.pagination").children("li").eq(current).addClass("current");
	}

	var slideTo = function(slide){
		if (!slideContainer.is(':animated')) {
			nav.pagination.children("li").eq(current).removeClass("current");
			if (slide == 'next') {
				current = (current < total - 1) ? current + 1 : 0;
				slidePosition -= width;
			} else if (slide == 'prev') {
				current = (current > 0) ? current - 1 : total - 1;
				slidePosition += width;
			} else {
				slide = parseInt(slide);
				current = slide;
				slidePosition = -(width * (current + 1));
			}
			nav.pagination.children("li").eq(current).addClass("current");
			$(slideContainer).animate({
				left: slidePosition
				},transitionSpeed,function() {
					if ($('#ppad').length != 0 && current == afterSlide) {
						HDM.ads.renderAd(pPlayerAd,$('#ppad'));
					} else if ($('#ppad').length != 0 && current > afterSlide) {
						removePplayerAd();
					}
				slidePosition = -(width * (current + 1));
				nav.touch.position.init();
				slideContainer.css("left",slidePosition);
			});
			// restart animation interval
			startSlideshow();
		}
	};
	var stopSlideshow = function(){
		clearInterval(slideIntervalId);
		slides.stop(true,false);
	};
	var startSlideshow = function(){
		clearInterval(slideIntervalId);
		slideIntervalId = setInterval(function(){slideTo('next');},slideInterval);
	};
	var appendClickTracker = function(url) {
		if (url) {
			if (url.indexOf("doubleclick.net") > -1) {
				// Does not append click tracker when one already exists
				var newURL = url;
			} else {
				url = url.replace(" ", "");
				var newURL;
				var argIndex = url.indexOf("?");
				var anchorIndex = url.indexOf("#");
				
				if (argIndex >= 0) {
					newURL = url.replace("?","?click=pp&");
				} else if (anchorIndex >= 0) {
					newURL = url.replace("#","?click=pp#");
				} else {
					newURL = url + "?click=pp";
				}
			}
			return newURL;
		} else {
			return false;
		}
	};
	var nav = {
		navLayer: null,
		prev: null,
		next: null,
		pagination: null,
		generate: function() {
			//initialize the navigation elements
			this.navLayer = playerContainer.children(".navLayer");
			this.prev = this.navLayer.children("a.prev");
			this.next = this.navLayer.children("a.next");
			this.pagination = this.navLayer.children("ul.pagination");
			
			if (pPlayerAd && $('#ppad').length == 0){
				this.pagination.children('li').remove();
				total = slides.not('#ppad').length;			
			}

			//create pagination loop based on number of slides
			for (var i = 0; i < total; i++) {
				var page = $(document.createElement("li"));
				var popupText = slides.eq(i).attr("title");
				
				page.html("&bull;");
				page.attr("page",i);
				this.pagination.append(page);				
				
				if (popupText) {
					var popupWidth, pageWidth;
					var popup = $(document.createElement("div"));
					var slideTitle = $(document.createElement("div"));
					var arrowDown = $(document.createElement("div"));
					
					//apply rollover title classes
					popup.addClass("popup");
					slideTitle.addClass("popupTitle");
					arrowDown.addClass("arrowDown");
					slideTitle.html(popupText);
				
					//add popup elements to the pagination item
					popup.append(slideTitle);
					popup.append(arrowDown);
					page.append(popup);					
					
					//calculate popup width and positioning
					popup.css("white-space","nowrap"); //fix to ensure that text doesn't break onto newlines for calculation slide title width
					pageWidth = page.width();					
					popupWidth = slideTitle.outerWidth() + 1;					
					popup.css("left","-"+((popupWidth-pageWidth)/2)+"px");
					popup.width(popupWidth);
					
					arrowDown.css("left",((popupWidth - arrowDown.outerWidth())/2)+"px");
				}
				if (slides.eq(afterSlide).is("#ppad")) {
					this.pagination.children("li").eq(afterSlide).hide();
				} 
				if ($('#ppad').length == 0) {
					this.pagination.children("li").eq(afterSlide).show();
				}
			}
			this.pagination.children("li").eq(current).addClass("current");
			this.navLayer.css("visibility","visible");
			
			//click navigation event handlers
			$(nav.prev).click(function(){
				slideTo('prev');
				nav.touch.position.init();
			});
			$(nav.next).click(function(){
				slideTo('next');
				nav.touch.position.init();
			});
			$(nav.pagination.children("li")).click(function(){
				if ($(this).attr("page") !== current) {
					slideTo($(this).attr("page"));
					nav.touch.position.init();
				}
			});
						
		},
		touch : {
			position : {
				mouseDown : false,
				startx : null,
				previousx : null,
				currentx : null,
				offsetx : null,
				delta : function(){
					return (this.currentx-this.startx+this.offsetx);
				},
				init : function(){
					this.mouseDown = false;
					this.startx = -(width * (current + 1));
					this.currentx = -(width * (current + 1));
					this.previousx = -(width * (current + 1));
					this.offsetx = -(width * (current + 1));
				}
			},
			start : function(x){
				this.position.init();
				//slideContainer.css('webkit-transition-duration',0);
				//slideContainer.css('moz-transition-duration',0);
				this.position.startx = x;
				this.position.currentx = x;
				this.position.previousx = x;
				this.position.mouseDown = true;
				this.disabletouch();
				stopSlideshow();
			},
			move : function(x){
				this.position.previousx = this.position.currentx;
				this.position.currentx = x;
				if (Math.abs(this.position.startx - this.position.currentx) > 25) {
					slideContainer.css('left',this.position.delta());
					//slideContainer.css('-webkit-transform','translate('+this.position.delta()+'px,0)');
				}
			},
			end : function(){
				var distancedelta = this.position.currentx-this.position.previousx;
				this.position.offsetx = (10*(distancedelta))+this.position.delta();
				this.enabletouch();
				//slidePosition -= this.position.delta();
				if (Math.abs(this.position.startx - this.position.currentx) > 25) {
					if (this.position.startx - this.position.currentx > 0) {
						slideTo('next');
					} else {
						slideTo('prev');
					}
				}
				else {
					slideTo(current);
				}
				this.position.init();
				startSlideshow();

			},
			preventBehavior : function(e) {
				e.preventDefault();
			},
			disabletouch : function(){
				// Enable fixed positioning
				document.addEventListener("touchmove", this.preventBehavior, false);
			},
			enabletouch : function(){
				// Disable fixed positioning
				document.removeEventListener("touchmove", this.preventBehavior, false);
			}
		}
	};
	this.init = function(){
		playerContainer = $('#'+playerContainerId);
		slideContainer = playerContainer.children(".slides");
		slides = slideContainer.children('.slide');
		total = slides.length;
		width = playerContainer.width();
		slides.eq(current).show();

		if (slides.length > 1) {
			nav.generate();
			var firstClone = slideContainer.children(".slide:first-child").clone();
			var lastClone = slideContainer.children(".slide:last-child").clone();
			slideContainer.prepend(lastClone);
			slideContainer.append(firstClone);
			slideContainer.css("left",-width);
			slidePosition = -width;
			startSlideshow();
			//touch navigation event handlers
			$(slides).each(function(){
				$(this).bind('touchstart',function(e){
					var pageX = null;
					if (e.originalEvent.touches) {
						pageX = e.originalEvent.touches[0].pageX;
					} else {
						pageX = e.pageX;
					}
					nav.touch.start(pageX)
				});
				$(this).bind('touchmove', function(e) {
					var pageX = null;
					if (e.originalEvent.touches) {
						pageX = e.originalEvent.touches[0].pageX;
					} else {
						pageX = e.pageX;
					}
					if (nav.touch.position.mouseDown) {
						nav.touch.move(pageX);
					}
				});
				$(this).bind('touchend', function(e) {
					nav.touch.end()
				});
			});

			// clear all animations when window regains focus.  this resolves animation issue caused by reduced interval firing for background tabs in Chrome.
			$(window).focus(function(){
				stopSlideshow();
				startSlideshow();
			});
		}
		//click handler for slide URLs
		$(slides).click(function(){
			var url = appendClickTracker($(this).attr("href"));
			var target = $(this).attr("target");
			if (url) {
				if (target=="Yes") {
					window.open(url);
				} else {
					window.location.href = url;
				}
			}
		});
		var links = $(slideContainer).find("a");
		links.each(function(){
			var url = $(this).attr("href");
			var newURL = appendClickTracker(url);
			
			if (newURL) {
				$(this).attr("href",newURL);
			}
		});
	};
	var self = this;
	$(document).ready(function(){
		self.init();
	});
};