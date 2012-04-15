if (typeof HDM == 'undefined') {
	var HDM = {};
}
HDM.promoPlayer = function (id,interval,speed) {
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
			}
			
			this.pagination.children("li").eq(current).addClass("current");
			this.navLayer.css("visibility","visible");
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