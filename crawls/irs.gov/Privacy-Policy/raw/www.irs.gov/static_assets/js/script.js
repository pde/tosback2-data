/*jslint white: true, devel: true, browser: true, sloppy: true, maxerr: 255, indent: 4 */
/*global $:true, jQuery:true, window:true */

// add helper classes and html;
jQuery(function ($) {
	
	if (navigator.userAgent.indexOf('Firefox') !=-1) {
		$("html").addClass("mozilla");
	}
	
	// mark the page as having JS enabled;
	$("html").removeClass("noJS");
	
	// support old browsers;
	$("li:first-child,th:first-child,tr:first-child").addClass("first-child");
	
	$("li:last-child,th:last-child,tr:last-child").addClass("last-child");
	
	$("table.numbers tbody tr:nth-child(even)").addClass("zebra");
	
	$("p.more a").append("<span></span>");
	
	$("a.hours").append("<span></span>");
	$("a.directions").append("<span></span>");
	
	$("ul.links li:not(:has(span))").append("<span></span>");
});

// make all DIVs the same height;
jQuery(function ($) {
	var h = 0;
    $("div.broker div.related")
		.each(function () {
			h = Math.max(h, $(this).height());
		})
		.css("min-height", h + "px");
});

// init the UniformJS plugin;
jQuery(function ($) {
	$("textarea, select, button").uniform();
	
	// take the data attribute and add it to the container DIV now, so we can style them appropriately;
	$("select[data-sentence-class]").each(function () {
		var $this = $(this),
		    $parent = $this.parents("div.selector"),
		    c = $this.attr("data-sentence-class");
		
		// if this IE6, add this class
		if ($.browser.msie && parseInt($.browser.version, 10) === 6) {
			$this.addClass(c);
		} else {
			$parent.addClass(c);
		}
	});
});

// add events to show/hide the navigation drop down menus (global and primary nav);
jQuery(function ($) {
	var $navItems1 = $("div.navmain").find("ul.task, ul.research").children("li"),
	    $navItems2 = $("div.navglobal > ul > li"),
	    $navItems = $.merge($navItems2, $navItems1), // need to have $navItems1 last because of the "edge" class (and how it's applied);
	    c = "hover";
	
	// add "edge" class to the last three nav items (so drop down menus don't go off the screen);
	$navItems.last().addClass("edge").prev("li").prev("li").andSelf().addClass("edge");
	
	$navItems.hover(
		function () {
			$(this).addClass(c);
		},
		function () {
			$(this).removeClass(c);
		}
	);
});

// add events that enable keyboard navigation of the navigation;
jQuery(function ($) {
	var key,         // key that will be pressed;
	    $a,          // A tag with :focus;
	    $li,         // parent of the A tag;
	    c = "hover"; // class to apply to the LI tag;
	
	// on key press...
	$("body").keydown(function (e) {
		key = e.which;
		
		// 40 is down arrow key; 38 is up arrow key;
		if (key === 40 || key === 38) {
			// user has hit the up or down arrow key while focused on a nav item;
			$a = $("*:focus");
		    $li = $a.parents("li");
			c = "hover";
			
			// if this nav item has subnav, show it;
			if (($a.index("div.navmain a") > -1) || ($a.index("div.navglobal a") > -1)) {
				e.preventDefault();
				
				if (key === 40) {
					$("li." + c).removeClass(c);
					$li.addClass(c);
				} else if (key === 38) {
					$li.removeClass(c);
				}
			}
		}
	});
});

//fill the empty space for the nav; (visual display should be just like a table with a width of 100%);
//make the primary navigation full page width;
//the extra (unused) space is calculated and then divided umong the nav items evenly;
jQuery(function ($) {
	var usedSpace = 0,               // the size of the used space that is already filled;
		addToAll,                    // number to add to all items for even distribution of the emptySpace;
		addToLast,                   // number to add to just the last item (the remainder of the emptySpce once it's evenly distributed);
		$nav = $("div.navmain"),     // object that contains all the LIs;
		navWidth = $nav.width() + 1, // width of the container (this minus usedSpace will give us the unused space, plus 1 for the UL margin);
		$navItems = $nav.find("ul.task, ul.research").children("li"); // the LIs that we'll be manipulating;
	
	var navHeight,
		lineHeight;					

	// loop through each LI so we can determine the width;
	$navItems.each(function () {
		usedSpace = usedSpace + $(this).outerWidth() + 1; // + 1 to include the margin;
		
		// save original height and line height
		navHeight = $(this).find("a").height();
		lineHeight = $(this).find("a").css("line-height");
		if (lineHeight.indexOf("px") == -1) {
			lineHeight = parseFloat(lineHeight);
		}
	});

	// define the amounts that are to be added to the LIs;
	addToAll = Math.floor((navWidth - usedSpace) / $navItems.size());
	addToLast = (navWidth - usedSpace) % $navItems.size();
	
	// if usedSpace is more than navWidth, increase each tab by one;
	if (addToAll < 0) {
		addToAll = addToAll + 1;
	}
	
	// loop through each LI (again) and add some width to each one (the last one gets the remainder added on);
	$navItems.each(function (i) {
		var $li = $(this),
			oldWidth = $li.width(),
			newWidth = (i === $navItems.size() - 1) ? (oldWidth + addToAll + addToLast) : (oldWidth + addToAll);
		$li.width(newWidth);
		
		if ($("html").hasClass("ie7") || $("html").hasClass("ie6")){//addresses issue in IE6/7 that gradient requires element to have an explicit width set. Padding l and r removed.
			$li.find("a").width(newWidth - 3).css("padding", "7px 0 4px");
		}
		
		// restore original height and increase line height to hide second line wrapped text;
		$(this).find("a").css("height", navHeight);
		$(this).find("a").css("line-height", lineHeight + 0.1);
	});
});

//fill the empty space for the tabs; (visual display should be just like a table with a width of 100%);
jQuery(function ($) {
	var usedSpace = 0,               // the size of the used space that is already filled;
		addToAll,                    // number to add to all items for even distribution of the emptySpace;
		addToLast,                   // number to add to just the last item (the remainder of the emptySpce once it's evenly distributed);
		$nav = $("div.rftabs"),      // object that contains all the LIs;
		navWidth = $nav.width(),     // width of the container (this minus usedSpace will give us the unused space) (-1 for a border);
		$navItems = $nav.find("li"); // the LIs that we'll be manipulating;


	// loop through each LI so we can determine the width;
	$navItems.each(function () {
		usedSpace = usedSpace + $(this).outerWidth();
	});
	
	// define the amounts that are to be added to the LIs;
	addToAll = Math.floor((navWidth - usedSpace) / $navItems.size());
	addToLast = (navWidth - usedSpace) % $navItems.size();
	
	// loop through each LI (again) and add some width to each one (the last one gets the remainder added on);
	$navItems.each(function (i) {
		var $li = $(this),
			oldWidth = $li.width(),
			newWidth = (i === $navItems.size() - 1) ? (oldWidth + addToAll + addToLast) : (oldWidth + addToAll);
		
		$li.width(newWidth);
	});
});

// init the jQuery Cycle plugin;
jQuery(function($){
	// this function switches the "tabs";
	var switchTabs = function (i) {
			var $lis = $("div.rftabs li"),
			    $li = $lis.eq(i),
			    c = "selected";
			
			$lis.removeClass(c);
			$li.addClass(c);
	    };
	
	// attach the tab change function to the tabs;
	$("div.rftabs li").each(function (i) {
		$(this).click(function () {
			switchTabs(i);
		});
	});
	
	// loop through each slideshow
	$("div.rfslides").each(function(){
		var $slides = $(this),
		    slideshow = {};
		
		// define the functions
		slideshow.functions = {
			// pause the slideshow
			pause: function(){
				$(slideshow.vars.obj).cycle("pause");
				$(slideshow.vars.objPlayPause).removeClass(slideshow.vars.classPlay).addClass(slideshow.vars.classPause);
				return false;
			},
			// play the slideshow
			play: function(){
				$(slideshow.vars.obj).cycle("resume", true);
				$(slideshow.vars.objPlayPause).removeClass(slideshow.vars.classPause).addClass(slideshow.vars.classPlay);
				return false;
			},
			// after the slide is in view, manipulate the image styles;
			after: function (currSlideElement, nextSlideElement, options) {
				var $obj = $(nextSlideElement),
				    i = $obj.index();
				
				switchTabs(i); // switch the tabs;
			}
		};
		
		// define the variables
		slideshow.vars = {
			// slideshow navigation (pagination, play/pause, previous, next)
			nav: "<div class='slideshownav'><a class='slideshownavprev'>&laquo;</a><a class='slideshowplaypause slideshowplay'>play/pause</a><a class='slideshownavnext'>&raquo;</a></div>",
			// settings for the cycle plugin
			config: {
				after:          slideshow.functions.after, // transition callback (scope set to element that was shown):
				fx:             "fade",                    // name of transition effect (or comma separated names, ex: fade,scrollUp,shuffle) 
				speed:          "fast",                    // speed of the transition (any valid fx speed value) 
				timeout:        cyclePluginTimeout(),                      // milliseconds between slide transitions (0 to disable auto advance) 
				prev:           "a.slideshownavprev",      // selector for element to use as click trigger for previous slide 
				next:           "a.slideshownavnext",      // selector for element to use as click trigger for next slide 
				prevNextClick:  slideshow.functions.pause, // callback fn for prev/next clicks:	function(isNext, zeroBasedSlideIndex, slideElement) 
				pagerClick:     slideshow.functions.pause, // callback fn for pager clicks:	function(zeroBasedSlideIndex, slideElement) 
				pause:          true,                      // true to enable "pause on hover" 
				activePagerClass: "slideshowhighlight",    // class name used for the active pager link
				pagerAnchorBuilder: function(idx, slide) { 
					// return selector string for existing anchor 
					return "div.rftabs li:eq(" + idx + ") a"; 
				}
			},
			obj:          "div.rfslides",         // object targeted for the cycle plugin
			objPlayPause: "a.slideshowplaypause", // object used to call the Play and Pause functions
			classPlay:    "slideshowplay",        // class used to identify the cycle plugin is playing
			classPause:   "slideshowpause"        // class used to identify the cycle plugin is paused
		};
		
		// add the necessary HTML and initialize the cycle plugin
		$slides
			.wrap("<div class='slideshowcontainer'></div>") // wrap the slideshow in a container
			.after(slideshow.vars.nav)                      // add the navigation to the container
			.cycle(slideshow.vars.config);                  // initialize the cycle plugin
		
		// configure the Play-Pause button
		$(slideshow.vars.objPlayPause)
			.click(function() {
				if($(this).is("." + slideshow.vars.classPlay) === true) {
					slideshow.functions.pause();
				}
				else {
					slideshow.functions.play();
				}
			});
	});
});

// Cycle plugin timeout
var CyclePluginTimeout = 8000;
function cyclePluginTimeout(timeout) {
	if (timeout != undefined && timeout != null && isNumber(timeout)) {
		CyclePluginTimeout = timeout;
	}
	
	return CyclePluginTimeout;
}
function isNumber (value) {
	return ! isNaN (value + 0);
}

// init the jQuery UI Date Picker plugin;
jQuery(function($){
	$("div.datepicker input")
		.datepicker({
			dateFormat: "mm / dd / yy",
			showAnim: ""
		})
		.parents("div.datepicker")
		.append("<a></a>") // add an A;
		.find("a")         // then attach an event to it;
		.click(function(e){
			e.preventDefault();
			$(this)
				.parents("div.datepicker")
				.find("input")
				.datepicker("show");
		})
		.blur(function(){
			$(this).datepicker("hide");
		});
});

// init the jQuery Placeholder plugin;
jQuery(function ($) {
	$("input, textarea").placeholder();
});

// add bookmark;
function addBookmark(url, title) {
	if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	} else if (document.all) {
		window.external.AddFavorite(url, title);
	} else if (window.opera && window.print) {
		alert('Press <Control> + D to bookmark (<Command> + D for Macs)');
	} else if (window.chrome) {
		alert('Press <Control> + D to bookmark in Chrome');
	}
}

// Main navigation current channel/page tab selection 
function selectMainNavTab(componentTitle, siteName, aUrl) {
	componentTitle = componentTitle.replace(/&#039;/g, "'");
	
	aUrl = aUrl.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#034;/g, "").replace(/&apos;/g, "'").replace(/&#039;/g, "'").replace(/%3F/g, "?").replace(/%23/g, "#").replace(/%25/g, "%");
	aUrl = aUrl.replace(/^.*\/\/[^\/]+/, '')
	if (aUrl.indexOf('?') >= 0) {
		aUrl = aUrl.substring(0, aUrl.indexOf('?'));
	}
	aUrl = aUrl.replace(/-/g, " ");
	
	var thisUrl = unescape(window.location.pathname);
	thisUrl = thisUrl.replace(/"/g, "");
	thisUrl = thisUrl.replace(/-/g, " ");
	
	var aPathArray = aUrl.split("/");
	var thisPathArray = thisUrl.split( '/' );
	
	aPathArray = removeSiteNameFromPathArray(aPathArray, siteName);
	thisPathArray = removeSiteNameFromPathArray(thisPathArray, siteName);
	
	var isEqual = isEqualPathArray(aPathArray, thisPathArray);
	if (isEqual) {
		if ($("div.navmain li a.selected").length == 0) {
			$("div.navmain li a").each(function (i) {
				if ($(this).html() == componentTitle) {
					$(this).addClass("selected");
				}
			 });
		}
	}
}

function removeSiteNameFromPathArray(pathArray, siteName) {
	if (pathArray[1] == siteName) {
		pathArray.splice(1, 1);
	}
	
	return pathArray;
}

function isEqualPathArray(rootPath, subPath) {
	if (rootPath.length == 1) {
		return false;
	}
	
	for (var i = 1; i < rootPath.length; i++) {
		if (rootPath[i] != subPath[i]) {
			return false;
		}
	}
	
	return true;
}