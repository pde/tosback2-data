/***** Header Script *****//* 
Updated: 03/06/2012
Header script functions

To search for a specific prototype, search the keyword:
- Authentication: fn.authentication
- Weather Section: fn.weather
- On-Air: fn.onair
- Feeds: fn.feeds
- What's Hot / Live: fn.whatshot

******************************/

(function($){

/***** Required script includes *****//* 
These scripts are required for the header implementation
- Recaptcha code for authentication
- Authentication Services
- Weather Services
******************************/

var _cbStr = (typeof _cbVarStr!=="undefined") ? _cbVarStr : "b1003";

var domainHost = "http:\/\/www.fncstatic.com"; // default
domainHost = getDomainHost(domainHost);

if (typeof auth_service==="undefined") {
	showToConsole("[head.dependency] Added: Authentication Service");
	document.write(unescape('%3Cscript src="'+domainHost+'/static/all/js/authentication.js?'+_cbStr+'" type="text/javascript"%3E%3C/script%3E'));
}

//AKAMAI GEO
(function(){

	var cb = function(freq) {
		freq = freq || false;
		var date = new Date(), str = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString(),
			hr = date.getHours()+1, min = date.getMinutes();
		str += hr.toString() + ((freq && !isNaN(freq)) ? (Math.floor(min/parseInt(freq,10))).toString() : "");
		return str;
	};

	document.write('<scr'+'ipt type="text/javascript" src="http://www.fncstatic.com/static/all/js/geo.js?cb='+cb(1)+'"></scr'+'ipt>');

}());

if (typeof weather_service==="undefined") {
	showToConsole("[head.dependency] Added: Weather Service");
	document.write(unescape('%3Cscript src="'+domainHost+'/static/all/js/weather.js?'+_cbStr+'" type="text/javascript"%3E%3C/script%3E'));
}

// opx.css
document.write(unescape('%3Clink rel="stylesheet" type="text/css" href="'+domainHost+'/static/all/css/opx.css?'+_cbStr+'" /%3E'));

	
/***** jQuery Plugin Dependency *****//* 
Check for plugin dependency.
******************************/
if (typeof $.fn.jfoxCarousel==="undefined" || typeof $.cookie==="undefined" || typeof $.validate==="undefined") {
	showToConsole("[head.dependency] Added: jQuery Plugins");
	document.write(unescape('%3Cscript src="'+domainHost+'/static/all/js/head.plugins.js?'+_cbStr+'" type="text/javascript"%3E%3C/script%3E'));
}

// Constants
var CONST = {
	feed: {
		whatsHotLive: {
			feedFunction: "FeedSource_WhatsHotWatchLive", // feed's set function
			url: "http://www.foxnews.com/js/whatshot.js",
			show: { // items to show. set to false to show however many
				hot: false,
				live: 2
			},
			rotate: 3, // rotate interval in seconds
			fade: {
				use: true,
				delay: 900
			}
				
		},
		onAir: {
			feedFunction: "FeedSource_FNCTV",
			url: "http://www.foxnews.com/js/onair.js",
			descCharLimit: 35, // limit the character length to not blow up the header
			imageDomainLoc: "" // domain where the on-air feed images are in
		},
		onAirCarousel: {
			feedFunction: "FOX_FN_OnAir_Data",
			url: "http://www.foxnews.com/static/managed/json/onair-feed-data.js"
		}
	},
	weather: {
		emailTxt: "Enter city or zip",
		hideFormDelay: 3000
	},
	onAir: {
		hideDelay: 200
	},
	authentication: {
		use: "render",
		domain: "foxnews.com", // default - will be overwritten with a domain setting on authentication funciton
		check: "/authentication/registration/validate/"
	}
};

function FoxHeader() {
	this.headObj = {}; // element object holder
}

FoxHeader.prototype = {
	init: function(config) {
		for (i in config) {
			this["_"+i] = config[i];
		}
		
		// extend
		this.feeds.root = this.weather.root = this.onAir.root = this.authentication.root = this.whatsHot.root = this;
		
		this.setHolders();
		
		this.docReady(); // document.ready
		this.weather.set(); // weather
		this.whatsHot.set(); // what's hot / live
		this.onAir.set(); // on air
		this.authentication.set(); // authentication service
		
		this.feeds.set(); // feeds
	},
	
	// initialize element holders
	setHolders: function() {
		
		// header elements
		var elm = $("#section-head");
		this.headObj = {
			elm: elm,
			branding: elm.children(".branding"),
			util: elm.find("#util"),
			userOptions: elm.find("#uo-data"),
			headlines: elm.find("#headlines-primary"),
			primaryNav: elm.find("#nav-primary"),
			onAir: elm.children(".slide.slide-1"),
			authentication: elm.find("#account")
		};
		
		this.setListeners();
	},
	
	// document.ready triggers
	docReady: function() {
		
		$(document).ready(function(){
			
		});
		
	},
	
	// general event listeners
	setListeners: function() {
		var FH = this;
		
		// tracking
		var sbcTag = FH.headObj.util.find(".head-sbc a");
		sbcTag.attr("href",sbcTag.attr("href") + "?intcmp=sbc_globalnav");
	}
	
};

/***** Authentication *****//* 
fn.authentication
Login / Registration via OPX
******************************/
FoxHeader.prototype.authentication = {
	set: function() {
		var FH = this;
		var root = this.root;
		
		if (root.headObj.authentication.size()===0 && $("#authentication").size()===0) { return false; }
		
		function setPageDomain() {
			var host = document.location.hostname;
			var hostArr = host.split(".");
			var len = hostArr.length;
			var cookieHost = hostArr[len-2] + "." + hostArr[len-1];
			// override
			CONST.authentication.domain = cookieHost;
		}
		
		function trigger() {
			
			setPageDomain();
			
			if (typeof FH[CONST.authentication.use]==="function") {
				FH[CONST.authentication.use]();
			} else {
				FH.render();
			}
		}
		
		if (typeof AuthService!=="undefined") {
			trigger();
		} else {
			$(document).ready(function(){
				if (typeof AuthService!=="undefined") {
					trigger();
				} else {
					showToConsole("[head.authentication] Authentication Service not found.");
				}
			});
		}
		
		this.setHolders();
	},
	setHolders: function() {
		// set user login value from query string
		var userVal = this.root.helper.getQueryStr("usr");
		if (userVal) { $(".login-fields > .field > input[name='userName']").attr("value",userVal); }
	},
	render: function() {
		var root = this.root,
			accntElm = root.headObj.authentication,
			isLegacy = (accntElm.size()===0) ? true : false,
			usrElm = false, encap = false;
		
		if (!isLegacy) {
			usrElm = accntElm.find(".user-options > p:first");
			encap = accntElm.find("> .username > .encapsulate");
			var usrOptions = accntElm.find("> .username"), doc = $("body");
			
			// activate
			encap.hover(function(){ $(this).addClass("hover"); },function(){ $(this).removeClass("hover"); });
			encap.click(function(){ 
				if (accntElm.hasClass("active")) {
					accntElm.addClass("inactive").removeClass("active");
				} else {
					accntElm.addClass("active").removeClass("inactive");
				}
			});
			
			usrOptions.hover(function(){ window.FXAuthClickIsOver = true; },function(){ if (window.FXAuthClickIsOver) { window.FXAuthClickIsOver = false; }	});
			
			// click listener
			if (!doc.data("FXAuthClick")) {
				doc.data("FXAuthClick",true);
				doc.mousedown(function(){
					if (!window.FXAuthClickIsOver && accntElm.hasClass("active")) { accntElm.removeClass("active").addClass("inactive"); }
				});
			}
			
		} else {
			accntElm = $("#authentication").parent();
			usrElm = accntElm.find(".username");
		}
		
		function profileLink(txtStr) {
			txtStr = txtStr || "Profile";
			var pTarget = "", usrStr = "";
			
			if (CONST.authentication.domain!=="foxnews.com") {
				pTarget = ' target="_blank"';
				if (typeof $.cookie!=="undefined" && $.cookie("p_DN")) {
					usrStr = "?usr=" + $.cookie("p_DN");
				}
			}
			return '<a'+pTarget+' href="http://www.foxnews.com/community/user/profile'+usrStr+'">'+txtStr+'</a>';
		}
		
		// authentication script
		var authentication_service = window.authentication_service = new AuthService({ domain:CONST.authentication.domain });
		
		authentication_service.extend({
			createLoginLogout: function(disableEditProfile){
				var self = this, str = [], auth = accntElm.find("#authentication");
				
				if(self.isLoggedIn()) {
					
					if (isLegacy) { 
						auth = auth.children(":first");
						auth.each(function(){
							if (!self.isThirdParty()) { $(this).html(profileLink()); } else { $(this).css({ display:"none" }); }
						});

						auth.next().each(function(){
							var logoutLink = $('<a href="#">Log Out</a>');
							logoutLink.click(function(){
								try { self.logout(self.domain); } catch(err) { showToConsole("[head.authentication] Logout - An error occured: " + err); }
								return false;
							});
							$(this).html(logoutLink);
						});
						
						usrElm.html('<img src="http://www.foxnews.com/static/all/img/head/profile.png" alt="" /> ' + self.getDisplayName()); 
						usrElm.css({ display:"inline" });
					} else { 
						auth = accntElm.find(".user-options > ul").children(":first");
						
						auth.each(function(){
							if (!self.isThirdParty()) { $(this).html(profileLink($(this).text())); } else { auth.css({ display:"none" }); }
						});
						
						auth.next().find("a").click(function(){
							try { self.logout(self.domain); } catch(err) { showToConsole("[head.authentication] Logout - An error occured: " + err); }
							return false;
						});
						
						accntElm.addClass("inactive");
						
						var displayName = (function(){
							var full = self.getDisplayName(), disp = full, title = "", txt = '<span${title}>${name}</span>';
							if (full.length>13) {
								disp = full.slice(0,13) + "...";
								title = ' title="'+full+'"';
							}
							return txt.replace("${title}",title).replace("${name}",disp);
						}());
						
						usrElm.html("You're logged in as " + displayName); 
					}
					
				} else {

					auth.children().find("a").each(function(){
						var item = $(this), text = item.text().toLowerCase();
						
						if (text.indexOf("register")>-1) {
							item.click(function(){
								try { 
									self.registrationOverlay(self.domain);
									if (typeof FOX!=="undefined" && FOX.utils && FOX.utils.pageRefresh) {
										FOX.utils.pageRefresh.disable();
									} else if (typeof ew_disableRefresh==="function") {
										ew_disableRefresh();
									}
								} catch(err) { showToConsole("[head.authentication] Register - An error occured: " + err); }
								return false;
							});
						} else if (text.indexOf("login")>-1) {
							item.click(function(){
								try { 
									self.providerOverlay(self.domain);
									if (typeof FOX!=="undefined" && FOX.utils && FOX.utils.pageRefresh) {
										FOX.utils.pageRefresh.disable();
									} else if (typeof ew_disableRefresh==="function") {
										ew_disableRefresh();
									}
								} catch(err) { showToConsole("[head.authentication] Login - An error occured: " + err); }
								return false;
							});
						}
						
					});
					
					if (isLegacy) { auth.css({ display:"inline" }); } else { usrElm.html("Please login."); }
				}
			},
			onSuccessLogin: function() {
				var self = this;
				self.createLoginLogout();
				self.closeOverlay("login-provider");
			},
			callback: function(jsonMsg) {
				var self = this, authObj = self.createObjFromJSON(jsonMsg);
				if(authObj.authentication.status==="ok"){
					
					if (authObj.authentication.message) {
						var userData = authObj.authentication.message,
							regex = /id:([a-z]*)=([a-z,1-9,_]+)/,
							usrArr = userData.match(regex);
						if ($.ad && $.ad.track) {
							$.ad.track({"login": {"userid": usrArr[2] + "@" + usrArr[1] + ".com"}});
						}
					}
					
					if (self.thirdPartyAPI) {
						self.thirdPartyAPI.disqus.login(authObj,function(){ // disqus
							self.thirdPartyAPI.idms.login(authObj,function(){ // idms
								self.thirdPartyAPI.fileMobile.login(authObj,function(){ // file mobile
									window.FOX_TP_Reload = setTimeout(function(){ window.location.reload(); },1000);
								}); 
							});
							
						});
					}
				}
				self.closeOverlay("login-provider");
			}
		});
		
		authentication_service.init();
		authentication_service.createLoginLogout();
	}
};

/***** Weather Section *****//* 
fn.weather
Note: this may be temporary, depending on what the feed will be
- Form submission & weather data display
******************************/
FoxHeader.prototype.weather = {
	set: function() {
		var FH = this;
		var root = this.root;
		var weatherElm = root.headObj.util.find(".weather-search");
		if (weatherElm.size()===0) { return false; }
		
		var formElm = weatherElm.children("form");
		var tickerElm = weatherElm.children("p");
		
		function trigger() {
			try  {
				weather_service.displayHeader("http://www.foxnews.com");
			} catch(err) {
				showToConsole("[header.weather] Error in weather service: " + err);
			}
		}
		
		
		if (typeof weather_service!=="undefined") {
			trigger();
		} else {
			$(document).ready(function(){
				if (typeof weather_service!=="undefined") {
					trigger();
				} else {
					showToConsole("[header.weather] Cannot find weather service: weather_service");
				}
			});
		}
	},
	submitForm: function() {
		showToConsole("[header.weather] Submitting form");
	},
	toggle: function(hide,show) {
		hide.css("display","none");
		show.css({ opacity:"0", display:"block" });
		animateFn.show(show,{ speed:300,type:"swing" });
	}
};

/***** Fox Header On Air *****//* 
fn.onair
- On Air items
******************************/
FoxHeader.prototype.onAir = {
	set: function() {
		var FH = this;
		var root = this.root;
		// expose layer function to window scope
		
		if (root.headObj.onAir.size()===0) { return false; }
		
		window[CONST.feed.onAir.feedFunction] = function(data) { 
			FH.renderOnAirNow(data);
		};
		
		window[CONST.feed.onAirCarousel.feedFunction] = function(data) {
			FH.renderOnAirCarousel(data,function(){
				FH.carousel();
				FH.setCarouselListeners();
			});
		};

		// get the feed
		root.feeds.onAir();
		root.feeds.onAirCarousel();
	},
	renderOnAirNow: function(data) {
		var FH = this;
		var root = this.root;
		var schedules = data.schedules.today;
		var nextDay = data.schedules.tomorrow;
		var elm = $("#show-data");
		var list = elm.children("ul:first");
		
		if (elm.size()===0) { return false; }
		
		function setTime(info) {
			info = $.trim(info);
			return (info.split(":"))[0] + info.charAt(info.length-2) + '<span>et</span>';
		}
		
		function setDescription(desc) {
			var limit = CONST.feed.onAir.descCharLimit;
			return (desc.length>limit) ? desc.substring(0,limit) + "..." : desc;
		}
		
		function renderHtml(index,over) {
			over = over || false;
			var htmlArr = [];
			var end = (over) ? index : index + 1;
			
			function pushToArr(info) {
				htmlArr.push('<li'+((x===0)?' class="first"':'')+'>');
				htmlArr.push('<p class="media"><a href="'+info.link+'"><img src="'+CONST.feed.onAir.imageDomainLoc+info.img+'" alt="" /></a></p>');
				htmlArr.push('<div class="info">');
				htmlArr.push('<p class="relation">'+info.title+'</p>');
				htmlArr.push('<p class="summary"><a href="'+info.link+'" title="'+info.dek+'">'+setDescription(info.dek)+'</a></p></div>');
				htmlArr.push('<p class="time">'+setTime(info.time)+'</p></li>');
			}
			
			
			for (var x = index; x <= end; x++) {
				var info = schedules[x];
				pushToArr(info);
			}
			
			if (over && nextDay[0]) {
				pushToArr(nextDay[0]);
			}
			
			//list.css({ opacity:"0" }).html(htmlArr.join("")).animate({ opacity:"1" },300,"swing");
			list.html(htmlArr.join(""));
		}
		
		var current = new Date(data.now.date + " " + data.now.time);
		var currentMil = parseInt(current.getHours() + "" + ((current.getMinutes()<10) ? "0" + current.getMinutes() : current.getMinutes()),10);
		
		for (var x = 0; x < schedules.length; x++) {
			var info = schedules[x];
			var nextSched = (schedules[x+1]) ? schedules[x+1] : false;
			try {
				
				var tm = $.trim(info.time).toLowerCase();
				tm =  (tm.charAt(tm.indexOf("m")-2)!==" ") ? tm.replace("pm"," pm").replace("am"," am") : tm;
				var schedDate = new Date(data.now.date + " " + tm);
				var schedDateMil = parseInt(schedDate.getHours() + "" + ((schedDate.getMinutes()<10) ? "0" + schedDate.getMinutes() : schedDate.getMinutes()),10);
				
				if (nextSched) {
					var tm2 = $.trim(nextSched.time).toLowerCase();
					tm2 =  (tm2.charAt(tm2.indexOf("m")-2)!==" ") ? tm2.replace("pm"," pm").replace("am"," am") : tm2;
					var nextSchedDate = new Date(data.now.date + " " + tm2);
					var nextSchedDateMil = parseInt(nextSchedDate.getHours() + "" + ((nextSchedDate.getMinutes()<10) ? "0" + nextSchedDate.getMinutes() : nextSchedDate.getMinutes()),10);
					
					if (currentMil >= schedDateMil && currentMil < nextSchedDateMil) {
						renderHtml(x); break;
					}
					
				} else {
					renderHtml(x,true); break;					
				}
				
			} catch(err) {
				showToConsole("[head.onAir] Error: " + err);
			}
			
		}
		
	},
	// DEPRECATED: not used for now
	renderOnAirCarousel: function(data,fn) {
		var FH = this;
		var root = this.root;
		var schedules = data;
		var render = function() {
			
			var elm = root.headObj.onAir.find("> .content > .slideshow");
			
			var arr = [], len = schedules.length;
			for (var x = 0; x < len; x++) {
				var info = schedules[x],
					isFirst = (x===0) ? true : false,
					isLast = (x+1 === len) ? true : false,
					cname = (isFirst) ? " section-first" : (isLast) ? " section-last" : "";
				
				arr.push('<li class="section'+cname+'">');
				arr.push('<p class="media"><a href="'+info.link+'"><img alt="'+info.title+'" pre-src="'+info.img+'" src="http://www.fncstatic.com/static/all/img/clear.gif"></a></p>');
				arr.push('<h3><a href="'+info.link+'">'+info.title+'</a></h3>');
				arr.push('<p class="time"><span>'+info.day+'</span> '+info.time+'</p></li>');
			}
			
			elm.html('<ul>'+arr.join("")+'</ul>');
		};
		
		render();
		if (typeof fn==="function") { fn(); }
	},
	carousel: function() {
		var root = this.root;
		var onAirCarousel = root.headObj.onAir.children(".content");
		
		// carousel config
		var cfg = { 
			elm: onAirCarousel,
			slide: 'horizontal', // horizontal or vertical
			scroll: 5, // number of items to scroll per event
			speed: 1200, // scroll speed
			show: 5, // items shown
			rotate: false // rotate
		};
		
		
		function createCarouselButtons(obj) {	
			var list = [];
			for (var x=1;x<=obj.batch.max;x++) {
				list.push('<li><a href="#">&nbsp;</a></li>');
			}
			return list.join('');
		}

		cfg.elm.each(function(i){
			var maxNum = 0;
			var carousel = $(this);
			
			if (carousel.data("carousel_initialized")) { return false; } // don't re-init if already initialized
			
			var buttonElm = carousel.find("ol");
			var nav = {
				prev: carousel.find(".prev"),
				next: carousel.find(".next"),
				first: carousel.find(".first-page"),
				last: carousel.find(".last-page")
			};

			var config = {
				auto: { set:false,speed:3000 }, // auto scroll
				slide: cfg.slide,
				scroll: cfg.scroll,
				show: cfg.show,
				speed: cfg.speed,
				rotate: cfg.rotate, 
				eventCallback: function(obj) { // callback function for all carousel events

					if (obj.event === 'init') { 
						maxNum = obj.batch.max;
						buttonElm.html(createCarouselButtons(obj)); // create the buttons 
						buttonElm.children(":first").addClass("active"); // set the first one as always active

						carousel.data("carousel_initialized",true); // set this carousel as initialized

					} else {
						buttonElm.children().each(function(i){ // button highlight listener
							if (i+1 == obj.batch.current) {
								$(this).addClass("active");
							} else {
								$(this).removeClass("active");
							}
						});
					}

					// setting up the navigation classes
					if (obj.batch.current === 1) { 
						nav.prev.addClass("inactive-prev");
						nav.first.addClass("inactive-first");
					} else {
						nav.prev.removeClass("inactive-prev");
						nav.first.removeClass("inactive-first");
					}

					if (obj.batch.current === obj.batch.max) {
						nav.next.addClass("inactive-next");
						nav.last.addClass("inactive-last");
					} else {
						nav.next.removeClass("inactive-next");
						nav.last.removeClass("inactive-last");
					}

				},
				controlsCallback: function(control) { // callback to set up controls
					buttonElm.children().find("a").each(function(i){ // buttons links
						$(this).click(function(){
							control.stopAutoScroll();
							control.scrollToBatch(i+1);
							return false;
						});
					});

					nav.first.click(function(){ // first-page link
						control.stopAutoScroll();
						control.scrollToItem(1);
						return false;
					});

					nav.prev.click(function(){ // previous link
						control.stopAutoScroll();
						control.slide('prev');
						return false;
					});

					nav.next.click(function(){ // next link
						control.stopAutoScroll();
						control.slide('next');
						return false;
					});

					nav.last.click(function(){ // last-page link
						control.stopAutoScroll();
						control.scrollToItem(maxNum);
						return false;
					});

				}
			};
			
			if (typeof $.fn.jfoxCarousel!=="undefined") {
				carousel.jfoxCarousel(config);
			} else {
				$(document).ready(function(){
					carousel.jfoxCarousel(config);
				});
			}
			
		});
		
	},
	setCarouselListeners: function() {
		var root = this.root;
		var navElm = root.headObj.primaryNav;
		var linkElm = navElm.children("ul:first").children("li.on-air");
		var onAirElm = root.headObj.onAir;
		var height = onAirElm.css("height").replace("px","");
		
		var delay = CONST.onAir.hideDelay;
		
		var icon = {
			close: linkElm.find("img").filter(function(){ return ($(this).attr("src").indexOf("close.png")>-1) ? true : false; }),
			open: linkElm.find("img").filter(function(){ return ($(this).attr("src").indexOf("plus.png")>-1) ? true : false; })
		};
		
		function onAirImgPreloader() {
			var list = onAirElm.find(".slideshow > ul > li");
			list.each(function(){
				var item = $(this), elm = item.find("> .media img"), src = elm.attr("pre-src"), img = new Image();
				if (src && !elm.data("preloaded")) {
					img.onload = function() { elm.attr("src",src); }
					img.src = src;
					elm.data("preloaded",true);
				}
			});
		}
		
		function hide() {
			onAirElm.data("isRendering",true);
			onAirElm.data("hidden",true);
			onAirElm.animate({ height:"0px",opacity:"0" },delay,"swing",function(){ onAirElm.css({display:"none"}).data("isRendering",false); });
			icon.close.hide();
			icon.open.show();
			linkElm.removeClass("active");
		}
		
		function show() {
			if (!onAirElm.data("initToFirst")) {
				onAirElm.data("initToFirst",true);
				onAirElm.find("p.controls > a.prev").click();
			}
			
			onAirElm.data("isRendering",true);
			onAirElm.data("hidden",false);
			onAirElm.css("display","block");
			onAirElm.animate({ height:height,opacity:"1" },delay,"swing",function(){ onAirElm.data("isRendering",false); });
			icon.close.show();
			icon.open.hide();
			linkElm.addClass("active");
		}
		
		// set elements
		icon.close.hide(); // hide close by default
		onAirElm.css({ height:"0px",opacity:"0" }).data("hidden",true); // hide by default
		
		// set click events
		linkElm.find("a").click(function(){
			onAirImgPreloader();
			if (onAirElm.data("isRendering")) { return false; }
			if (onAirElm.data("hidden")) { show(); } else { hide(); }
			return false;
		});
	}
};

/***** What's Hot / Live *****//* 
fn.whatshot
What's Hot & What's Live feed
******************************/
FoxHeader.prototype.whatsHot = {
	set: function() {
		var FH = this;
		var root = this.root;
		this.render.root = root;
		
		if (root.headObj.headlines.size()===0) { return false; }
		//root.headObj.headlines.append("&nbsp;");
		
		// expose layer function to window scope
		window[CONST.feed.whatsHotLive.feedFunction] = function(data) { 
			FH.render.set(data);
		};
		
		// get the feed
		root.feeds.whatsHotLive();
	},
	
	render: {
		set: function(data) {
			var root = this.root;
			var headlines = root.headObj.headlines;
			
			var hotHtml = this.hot({
				title: "Full Coverage",
				feed: data.whatshot,
				len: CONST.feed.whatsHotLive.show.hot
			});
			
			var liveHtml = this.live({
				title: "Watch Live",
				feed: data.watchlive,
				len: CONST.feed.whatsHotLive.show.live
			});
			
			if (typeof data.whatshot!=="undefined") {
				if (data.whatshot.length===0) { return false; } // if no feed, don't render
				
				var whatsHotElm = $('<dl class="first"></dl>');
				whatsHotElm.append(hotHtml).children("dd:first").addClass("first");
				headlines.html(whatsHotElm);
			}
			
			if (typeof data.watchlive!=="undefined") {
				if (data.watchlive.length===0) { return false; } // if no feed, don't render
				
				var watchLiveElm = $('<dl></dl>');
				watchLiveElm.append(liveHtml).children("dd:first").addClass("first");
				headlines.append(watchLiveElm);
	
				// rotate watch live if greater than 2
				var watchLiveHtml = headlines.children("dl:nth-child(2)");
				
				if (data.watchlive.length>CONST.feed.whatsHotLive.show.live) {
					this.rotate(watchLiveHtml);
				} else {
					watchLiveHtml.children("dd").css("display","inline");
				}
			}
		},
		hot: function(cfg) {
			if (typeof cfg.feed==="undefined") { return false; } 
			cfg.len = cfg.len || cfg.feed.length;
			var htmlArr = [];
			
			if (cfg.len>0) {
				htmlArr.push('<dt>'+cfg.title+'</dt>');
				for (var x = 0; x < cfg.feed.length; x++) {
					var hot = cfg.feed[x];
					var style = (x >= cfg.len) ? ' style="display:none;"' : '';
					htmlArr.push('<dd'+style+'><a href="'+hot.link+'">'+hot.title+'</a></dd>');
				}
			}
			return $(htmlArr.join(""));
		},
		live: function(cfg) {
			if (typeof cfg.feed==="undefined") { return false; } 
			cfg.len = cfg.len || cfg.feed.length;
			var htmlArr = [];
			
			if (cfg.len>0) {
				htmlArr.push('<dt>'+cfg.title+'</dt>');
				for (var x = 0; x < cfg.feed.length; x++) {
					var hot = cfg.feed[x];
					var style = (x >= cfg.len) ? ' style="display:none;"' : '';
					htmlArr.push('<dd'+style+'><a href="'+hot.link+'">'+hot.title+'</a></dd>');
				}
			}
			return $(htmlArr.join(""));
		},
		rotate: function(elm) {
			var items = elm.children("dd");
			var titleElm = elm.children("dt:first");
			var length = items.size();
			var fader = CONST.feed.whatsHotLive.fade;
			
			if (length===0) { return false; }
			
			var timer = CONST.feed.whatsHotLive.rotate * 1000; // in seconds
			if (fader.use) {
				timer = timer + fader.delay;
			}
			
			var interval = false;
			
			items.each(function(i){
				var elm = $(this);
				elm.addClass("first");
				elm.css("display",(i===0) ? "inline" : "none");
				if (i===0) { elm.data("rotateNumber",i+1); }
			});
			
			if (!elm.data("rotateNumber")) { elm.data("rotateNumber",1); }
			
			function trigger(type) {
				type = type || false;
				
				var rotate = elm.data("rotateNumber") + 1;
				rotate = (rotate > length) ? 1 : rotate;
				elm.data("rotateNumber",rotate);
				
				items.each(function(i){
					var elm = $(this);
					var pos = i+1;
					
					if (!fader.use || type==="click") {
						elm.css("display",(pos===rotate) ? "inline" : "none");
					} else {
						if (pos===rotate) { elm.fadeIn(fader.delay); } else { elm.hide(); }
					}
				});
			}
			
			function set() {
				clearInterval(interval);
				interval = setInterval(function(){ // continue rotate
					trigger();
				},timer);
			}
			
			set();
			
			titleElm.css("cursor","pointer").click(function(){
				trigger("click");
			});
			
			elm.hover(function(){ // hover in
				clearInterval(interval); 
			},function(){ // hover out
				set();
			});
			
			
			
		}
	}
};

/***** Fox Header Feeds *****//* 
fn.feeds
All feed related information should pass through here
Handled feeds:
- What's Hot / Live
******************************/
FoxHeader.prototype.feeds = {
	set: function() {
		
	},
	
	// Whats Hot / Watch Live feed
	whatsHotLive: function() {
		// insert script
		this.get.append({ url:CONST.feed.whatsHotLive.url }); 
	},
	
	// On-Air feed
	onAir: function() {
		this.get.append({ url:CONST.feed.onAir.url }); 
	},
	
	// onAir Carousel
	onAirCarousel: function() {
		this.get.append({ url:CONST.feed.onAirCarousel.url });
	},
	
	// consuming feeds through different types
	get: {
		// append to head asynchronously
		append: function(cfg) {
			(function(){
				var elm = document.createElement("script");
				//elm.src = document.location.protocol + "//www.foxnews.com/static/all/js/authentication.js";
				elm.src = cfg.url;
				elm.async = true;
				$("head").get(0).appendChild(elm);
			}());
		},
		// json / jsonp
		json: function(cfg) {
			
			$.ajax({
				type: "GET",
				url: cfg.url,
				data: cfg.query,
				success: function(data){
					if (cfg.callback) { cfg.callback(data); }
				}
			});
			
		}
	}
};

//helper functions
FoxHeader.prototype.helper = {
	getQueryStr: function(query) {
		var search = (window.location.search).substr(1);
		if (search.length>0) {
			var pairs = search.split('&');
			var valuePair = {};
			for (var x=0;x<pairs.length;x++) {
				var split = pairs[x].split('=');
				valuePair[split[0]] = split[1];
			}
			
			return (valuePair[query]) ? valuePair[query] : false;
		}
		return false;
	}
};

function showToConsole(str) {
	if (typeof window.console==='object') { console.log(str); }
}

function getDomainHost(currHost) {
	
	try {
		var host = document.location.hostname;
		var arr = host.toLowerCase().split(".");
		var validSubdomains = ["pvw-qa","origin-qa","staging","qa-fn"]; // qa subdomains get relative paths - this is only for V7
		var validHosts = ["foxnews.com","foxbusiness.com"]; // if on these domains, use the relative path
		
		if (arr.length>1) {
			var currentHost = arr[arr.length-2]+"."+arr[arr.length-1];
			var subdomain = arr.slice(0,arr.length-2).join(".");
			
			function set() {
				for (var x = 0; x < validHosts.length; x++) {
					if (currentHost===validHosts[x]) { currHost = ""; break; }
				}
			}
			
			for (var z = 0; z < validSubdomains.length; z++) {
				if (subdomain.indexOf(validSubdomains[z])>-1) { set(); break; }
			}
		}
	} catch(err) {
		// fail silently
	}
	
	return currHost;
}

var animateFn = {
	isIE: function() {
		return $.browser.msie;
	},
	animate: function(elm,cfg) {
		if (!this.isIE()) {
			if (!cfg.speed) { cfg.speed = 300; }
			if (!cfg.type) { cfg.type = "swing"; }

			elm.animate(cfg.css,cfg.speed,cfg.type,function(){
				if (cfg.callback) { cfg.callback(); }
			});
		} else {
			elm.css(cfg.css);
			elm.css("opacity","");
			if (cfg.callback) { cfg.callback(); }
		}
	},
	hide: function(elm,cfg) {
		if (!elm) { return false; }
		var cssObj = { opacity:"0" };
		if (cfg.css) {
			for (i in cfg.css) { cssObj[i] = cfg.css[i]; }
		}
		cfg.css = cssObj;
		this.animate(elm,cfg);
	},
	show: function(elm,cfg) {
		if (!elm) { return false; }
		var cssObj = { opacity:"1" };
		if (cfg.css) {
			for (i in cfg.css) { cssObj[i] = cfg.css[i]; }
		}
		cfg.css = cssObj;
		this.animate(elm,cfg);
	}
};

var foxHeader = window.foxHeader = new FoxHeader();

/***** Global Functions *****//* 
- window scope functions/objects
******************************/

// streaming video - legacy
var siteStreamFlashPlayer = window.siteStreamFlashPlayer = function(n, site) {
	var s = typeof(n) == 'undefined' ? 1 : n;
	var d = typeof(site) == 'undefined' ? 'foxnews' : site;
	var w = 850;
	var h = 506;
	var left = (screen.width-w)/2;
	var top = (screen.height-h)/2;
	var settings = "height="+h+",width="+w+",top="+top+",left="+left+",toolbar=no,location=no,scrollbars=no,status=no,resizable=no,fullscreen=no";
	var win = window.open('http://interactive.' + d + '.com/livestream/live.html?chanId='+s+'&openAIR=true','livePlayer',settings);
	win.focus();
};

//New Live Player
var siteStreamLivePlayer = window.siteStreamLivePlayer = function(id) {
	var w = 914, h = 419, left = (screen.width-w)/2, top = (screen.height-h)/2;
		url = "http://video.foxnews.com/video-live-streaming.html",
		settings = "height="+h+",width="+w+",top="+top+",left="+left+",toolbar=no,location=no,scrollbars=no,status=no,resizable=no,fullscreen=no",
	
	url = url + ((id && !isNaN(id)) ? "?video_id=" + id : ""); // append video id
	var win = window.open(url,"LivePlayer",settings);
	win.focus();
};

var FOX_isMnt = window.FOX_isMnt = function() {
	var ret = false, ak = window.CONST_Akamai_TIME || false
	try {
		if (ak.yr==="2011" && ak.mm==="11" && (ak.dd==="05" || ak.dd==="06")) {
			ret = true;
		} else if (ak.yr==="2011" && ak.mm==="11" && ak.dd==="04" && parseInt(ak.hr,10) >= 17) {
			ret = true;
		}
	} catch(err) {
		// do nothing
	}
	return ret;
};

})(jQuery);

(function($){ // footer
	$(document).ready(function(){
		$("#section-footer").find('a[rel="external"]').attr("target","_blank");
	});
})(jQuery);

