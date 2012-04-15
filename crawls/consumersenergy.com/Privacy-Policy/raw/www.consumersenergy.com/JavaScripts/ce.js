/*
 * main JavaScript file for ConsumersEnergy.com
 * requires: jQuery.js (written and tested against jQuery version 1.3.2)
 */
 
// create CSS hook for JS-enabled clients
$("html").addClass("js");

// prevent background image flicker in IE
try {
	if (!window.opera) document.execCommand("BackgroundImageCache", false, true);
} catch(err) {};



//set focus on username eServ login box
function userFocus(eServId) {
    var url = window.location;
    	if (document.getElementById("j_user") != null)
    	{   
            if (url.pathname == "/")
            {
                setTimeout('document.getElementById("j_user").select()', 500);
                document.getElementById('j_user').focus();
                document.getElementById('j_user').blur();
            }
            else if (url.pathname == "/default.aspx")
            {
                setTimeout('document.getElementById("j_user").select()', 500);
                document.getElementById('j_user').focus();
                document.getElementById('j_user').blur();
            }
            else if (url.search == "?id=" + eServId)
            {
                setTimeout('document.getElementById("j_user").select()', 500);
                document.getElementById('j_user').focus();
                document.getElementById('j_user').blur();
            }
        }
    }

// Global DOM-ready functions
$(document).ready(function () {

    
	// preload CSS-background images
	$.preloadCssImages();
	
	// initialize nav menus
	CE.Menu.Primary.init();
	CE.Menu.Section.init();
	
	// font-sizing control
	CE.FontSizer.init();
	
	// social bookmarking widget
	CE.Share.init();
	
	// apply misc. style enhancements
	CE.Style.init();


});


// Global Window-load functions
$(window).load(function () {

    //ClearCookie();

    // initialize alert banner
    CE.Alert.init();

    // apply rounded corners to img.rounded elements
    CE.Images.Corners.init();

});


// create our namespace
var CE = CE || {};

var http = "http"; // set the value based the https schema.
// configuration parameters for our various methods
if (window.location.href.toUpperCase().indexOf('HTTPS') > -1) {
    http = "https";
}

var offSetTop;
var offSetLeft;
//if is safari or chrome
if((window.devicePixelRatio) || (window.chrome))
{
    offSetTop = -25;
    offSetLeft = -71;
}
else
{
    offSetTop = -40;
    offSetLeft = -71;
}

CE.Config = {
	addthisURL: http + "://s7.addthis.com/js/250/addthis_widget.js#pub=consumersenergy",
	addthisOptions: {
	    ui_offset_top: offSetTop,
	    ui_offset_left: offSetLeft,
	    //ui_delay: 200, //ui_click: true, //other options available
		ui_hover_direction: 1,
		services_compact: "favorites, aim, yahoobkm, digg, delicious, facebook, google, live, twitter, blogger, more",
		data_use_flash: false,
		data_use_cookies: true
	},
	curvycornersURL: "/javascripts/curvycorners.modified.js",
	debug: false,
	firebugURL: http + "://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js",
	alertFontSize: 17,
	alertLineHeight: 20,
	alertScrollSpeed: 1000,
	alertScrollDelay: 3000,
	alertScrollLimit: 3,
	defaultFontSize: 12,
	defaultMobileFontSize: 15,
	fontSizes: {
		large: 17,
		medium: 15,
		small: 12
	},
	hoverOptions: {    
	    sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)    
	    interval: 200, // number = milliseconds for onMouseOver polling interval    
	    timeout: 300 // number = milliseconds delay before onMouseOut    
	},
	isMobileClient: (screen.width < 640),
	menuPrimaryLabel: "<h3>Popular Links</h3>"
};

// alert banner
CE.Alert = (function () {
	// requires CE.Config.alertFontSize (number), CE.Config.alertLineHeight (number), CE.Config.alertScrollSpeed (number),
	// 			CE.Config.alertScrollDelay (number), CE.Config.alertScrollLimit (number)
	
	var $banner, bheight, $message, mheight, units, position = 0, count = 0, timestamp, t;
	
	function show () {
		$banner.animate({top: 0, marginBottom: 0}, 1000, function () {
			bheight = $banner[0].offsetHeight;
			mheight = $message[0].offsetHeight;
			units = $banner.find(".content")[0].offsetHeight;
			if (mheight > units) { // scroll message?
				t = window.setTimeout(scroll, CE.Config.alertScrollDelay);
			}
		});
		$.scrollTo($banner, 600);
	}
	
	function hide () {
		CE.Util.cookie("hideAlert", timestamp, {path: "/"});
		$banner.animate({top: -bheight, marginBottom: -bheight}, 500);
		disableTabIndex();
		pause();
	}
	
	function scroll () {
		if (position > mheight) { // reset message scroll position
			position = -units;
			$message.css({top: units});
			count++;
		}
		
		position += units;
		
		$message.animate({top: -position}, CE.Config.alertScrollSpeed, function () {
			if (count < CE.Config.alertScrollLimit) {
				t = window.setTimeout(scroll, position >= mheight ? 10 : CE.Config.alertScrollDelay);
			} else {
				$message.css({top: 0});
			}
		});
	}
	
	function pause () {
		window.clearTimeout(t);
		$message.stop().animate({top: -position}, 200);
		
	}
	
	function resume () {
		if (count < CE.Config.alertScrollLimit) {
			t = window.setTimeout(scroll, CE.Config.alertScrollDelay / 4);
		}
	}
	
	function launch () {
		location.href = $banner.find(".details a").attr("href");
	}
	
	function fixFontSize (e, em) {
		$message.css({fontSize: (CE.Config.alertFontSize * CE.Util.cookie("fontSize") / em) + "px", lineHeight: (CE.Config.alertLineHeight * CE.Util.cookie("fontSize") / em ) + "px"});
	}
	
	function disableTabIndex () {
		// remove alert banner from tab flow when hidden
		$banner.find("a").attr("tabindex", "-1");
	}
	
	return {
		init: function () {
			$banner = $("#alertbanner");
			if (!$banner.length) {
				return;
			}
			
			// check timestamp of alert and only show if it's been updated since the user closed it
			timestamp = new Date($banner.find(".timestamp span").text()).getTime();
			if (CE.Util.cookie("hideAlert") && parseInt(CE.Util.cookie("hideAlert"), 10) >= timestamp) {
				disableTabIndex();
				return;
			}
			
			$message = $banner.find(".content p").hover(pause, resume).click(launch);
			
			// insert close button
			$('<div class="close"></div>').appendTo("#alertbanner .background").click(hide);
			
			// ensure alert content font size stays fixed to allow consistent scrolling of message text
			$(document).bind("fontresize", fixFontSize);
			fixFontSize(null, jQuery.onFontResize.initialSize);
			
			// reveal the banner
			show();
		} 
	}
}) ();

// font resizer
CE.FontSizer = (function () {
    // requires: CE.Config.fontSizes (object), CE.Config.isMobileClient (boolean), CE.Config.defaultFontSize (number), and CE.Config.defaultMobileFontSize (number)
    var $topnav, $topnavspan;

    function set(size) {
        $(".fontsizer .on").removeClass("on");
        $(".fontsizer .px" + size).addClass("on");
        $("body").css({ fontSize: size + "px" });
        $topnav = $("#header > div > ul > li");
        $topnavspan = $topnav.find("span");
        $topnavspan.addClass("staticNav");
        CE.Util.cookie("fontSize", size, { path: "/", expires: 365 });
    }

    return {
        init: function (defaultsize) {
            if (CE.Config.isMobileClient) {
                defaultsize = CE.Config.defaultMobileFontSize;
            } else {
                var m = "";
                $.each(CE.Config.fontSizes, function (i, v) {
                    m += '<li><a href="#" class="' + i + ' px' + v + '">A</a></li>';
                });
                m = '<ul class="fontsizer">' + m + '</ul>';

                $(m).prependTo("#footer");

                $(".fontsizer a").click(function (e) {
                    set(this.className.replace(/[^\d]/g, ""));
                    e.preventDefault();
                });
            }

            set(CE.Util.cookie("fontSize") || defaultsize || CE.Config.defaultFontSize);
        }
    }
})();

// image styling
CE.Images = {};

CE.Images.Corners = (function () {
	// requires curvycorners.modified.js
	var $i;
	
	function applyCorners () {
		// wait for the image(s) to load...
		var ready = true;
		$i.each(function () {
			if (!this.offsetHeight) {
				ready = false;
				return false;
			}
		});
		
		if (!ready) {
			window.setTimeout(applyCorners, 100);
			return;
		}
		
		$i.each(function (i) {
			// ...then inject an empty <div> into the document, sized the same as the image, and apply the image as a background
			$('<div></div>')
				.insertBefore($i.eq(i))
				.addClass("rounded")
				.css({background: "url(" + $i[i].src + ") no-repeat", height: $i[i].offsetHeight, width: $i[i].offsetWidth});
				//.fadeTo(1000, 1); disabled fading-in of images because of IE8 issues
			// and hide the original image, but keep it in the page for printing-purposes
			$i.eq(i).removeClass("rounded").addClass("print");
		});
		
		// need to call this explicitly as we modified curvycorners.js and removed its native init() call to avoid strange cache-related errors in IE
		if (typeof curvyCorners === "function" && typeof curvyCorners.init === "function") {
			curvyCorners.init();
		}
	}
	
	return {
		init: function () {
			$i = $(".rounded");
			if (!$i.length) {
				return;
			}
			$i = $i.filter("img");
			CE.Util.loadscript(CE.Config.curvycornersURL, applyCorners);
		}
	}
}) ();

// navigation menus
CE.Menu = {};

CE.Menu.Primary = (function () {
    // requires: jquery.onFontResize (plugin), CE.Config.defaultFontSize (number), CE.Config.hoverOptions (object), and CE.Config.menuPrimaryLabel (string)
    var scalefactor, basemargin = 0, basepadding = 15, $topnav, $topnavspan; //basemargin = 65, basepadding = 20

    function show(e, el) {
        var $this = $(el || this), $a = $this.children("a"), $dd = $this.find("div"), w = $a[0].offsetWidth;
        $this.find("img").attr("src", "/uploadedImages/CEWEB/blue_arrow.png");
        $this.children("a").andSelf().addClass("on");
        $dd.slideDown(100);
        $this.next().css({ marginLeft: Math.floor(scalefactor * basemargin - ($a[0].offsetWidth - w)) });
    }

    function hide(e, el) {
        var $this = $(el || this);
        $this.find("div").slideUp("fast", function () {
            $this.children("a").andSelf().removeClass("on");
            $this.next().css({ marginLeft: Math.floor(scalefactor * basemargin) });
            $this.find("img").attr("src", "/uploadedImages/CEWEB/gray_arrow.png");
        });
    }

    function scale(e, em) {
        scalefactor = Math.min(1, CE.Config.defaultFontSize / em);
        $topnav.css({ marginLeft: Math.floor(scalefactor * basemargin) + "px" });
        $topnavspan.css({ paddingLeft: Math.floor(scalefactor * basepadding) + "px", paddingRight: Math.floor(scalefactor * basepadding) + "px" });
    }

    function handleMenuFocus() {
        var $menu = $(this).parents("li"), l = $menu.length - 1;

        if (l === 0) { // top-level menu item, hide any open menus and show this one
            $topnav.filter(".on").each(function () {
                if (this !== $menu[l]) {
                    hide(null, this);
                }
            });
            show(null, $menu[l]);
        }
    }

    function handleMenuExit() { // hide all menus when tabbing out of primary menu
        $topnav.filter(".on").each(function () {
            hide(null, this);
        });
    }

    return {
        init: function () {
            if (!jQuery.onFontResize.initialSize) {
                window.setTimeout(CE.Menu.Primary.init, 100);
                return;
            }

            // set up drop-down menus
            CE.Config.hoverOptions.over = show;
            CE.Config.hoverOptions.out = hide;
            $topnav = $("#header > div > ul > li").hoverIntent(CE.Config.hoverOptions);
            $topnavspan = $topnav.find("span");
            $topnav.filter(":last").addClass("last");

            // keyboard accesibility hooks TODO bind handler to last link on page??
            $topnav.find("a").bind("focus", handleMenuFocus);
            $("#wrapper-inner a:first, a:last, #alertbanner a:last").bind("focus", handleMenuExit);

            // insert drop-down container and header
            $topnav.find("ul").wrap("<div></div>").before(CE.Config.menuPrimaryLabel).css({ display: "block" });

            // adjust margins on top nav items based on font size to prevent line-wrapping
            // removed because font resize overridden for nav
            $(document).bind("fontresize", scale);
            scale(null, jQuery.onFontResize.initialSize);
        }
    }
})();

CE.Menu.Section = (function() {
    var $menu;

    function expand($el) {
        $el.addClass("on");
        $el.siblings("ul").css({ display: "block" });
        $el.parents("ul").css({ display: "block" });
    }

    return {
        init: function() {
            $menu = $("#col1 .navigation ul li");
            if (!$menu.length) {
                return;
            }

            var x, y, x1, y1, z = 0;
            var strLocation = location.href.toLowerCase(); 

            $menu.find("a").each(function(i) {
                if (strLocation === this.href.toLowerCase()) { // TODO simple URL matching won't work if ek_linkManagement is being used!
                    expand($(this));
                    CE.Util.cookie("prvMenu", strLocation, { path: "/" });
                    return false;
                }
                else if (CE.Util.cookie("prvMenu") === this.href.toLowerCase()) {
                    expand($(CE.Util.cookie("prvMenu")));
                    return;
                }
            });
            // add hooks for URL matching to expand navigation on interior pages
        }
    }
})();

// social bookmarking widget
var addthis_config = CE.Config.addthisOptions; // needs to be a global variable to disallow use of Flash-based metrics (AddThis Flash element breaks our layout...)
CE.Share = {
	// requires: CE.Config.addthisURL (string) and CE.Config.addthisOptions (object)
	
	init: function () {
		var $b = $('<a href="#" class="bookmarkPage replace">bookmarkPage</a>')
			.insertBefore("#footer .rss")
			//.hide()
			.click(function (e) {
				e.preventDefault();
			});
		
		CE.Util.loadscript(CE.Config.addthisURL, function () {
			if (typeof addthis !== "undefined")
			{
				addthis.button(".bookmarkPage");
				$b.show();
			}
		});
	}
};

// misc. styling enhancements
CE.Style = (function () {

    var labeloffset = -18;

    // event handlers for input focus/blur to animate position of field label
    function handleInputBlur() {
        var $this = $(this);
        if (!$.trim($this.val())) {
            $this.data("label").show();
            $this.data("label").stop().animate({ top: labeloffset }, 200);
        }
    }

    function handleInputFocus() {
        var $this = $(this);
        if (!$.trim($this.val())) {
            $this.data("label").fadeOut();
            //$this.data("label").hide().animate({ top: 0 }, 200);
        }
    }

    return {
        init: function () {
            // stripe tables
            $(".stripe tbody tr:even").addClass("even");

            // style form submit buttons
            $("input[type=submit]").addClass("fancybutton");

            // style "form tables"
            $(".form-table tr").find("td:eq(0)").addClass("label");

            // format site map columns
            $(".sitemap > ul > li > ul > li:nth-child(3n)").after('<br style="clear:both"/>');

            // display form labels as overlays on empty input fields and animate the label position on field focus/blur
            // disabled for opera due to issues with display:block and position: relative
            if (!window.opera) {
                $("#header input[type=text], #header input[type=password]").each(function () {
                    var $this = $(this).bind("focus", handleInputFocus).bind("blur", handleInputBlur);
                    $this.data("label", $("label[for=" + this.id + "]"));
                    if (!$this.val()) {
                        $this.data("label").css({ position: "relative", top: labeloffset });
                    }
                });
            }

            //added 2/2010 - fix from biggs            
            if ($.browser.msie) {
                var $outer, $inner, $content, h;

                $(document).bind("fontresize", function (e, em) {
                    if (typeof $outer === "undefined") {
                        $outer = $(".eservices-login-wrapper div:first");
                        $inner = $(".eservices-login-wrapper-inner div:first");
                        $content = $(".eservices-login");
                    }

                    h = $content.height();
                    $outer.css({ height: h + 68 });
                    $inner.css({ height: h });
                });
            }
            //  
        }
    }
})();

// utility methods
CE.Util = {
    cookie: function (name, value, options) { // adapted from http://www.stilbuero.de/2006/09/17/cookie-plugin-for-jquery/
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || CE.Util.cookie.options;
            if (!isNaN(options)) { // options can be an object, or a number representing days to expiration
                options = {
                    expires: options * 1 // coerce to number in case we've received a string from Flash
                };
            }
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (!isNaN(options.expires) || options.expires.toUTCString)) {
                var date;
                if (!isNaN(options.expires)) {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0, l = cookies.length; i < l; i++) {
                    var cookie = cookies[i].replace(/^\s+|\s+$/g, "");
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },

    getPageSize: function () {
        var x = Math.max(document.documentElement.scrollWidth || document.body.scrollWidth, document.body.offsetWidth);
        var y = Math.max(document.documentElement.scrollHeight || document.body.scrollHeight, document.body.offsetHeight);
        return { "x": x, "y": y };
    },

    getViewportSize: function () {
        var x = self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var y = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return { "x": x, "y": y };
    },

    getScrollOffset: function () {
        var x = self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        var y = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        return { "x": x, "y": y };
    },

    getElemPosition: function (el) {
        var x = 0, y = 0;
        if (el.offsetParent) {
            do {
                x += el.offsetLeft;
                y += el.offsetTop;
            } while (el = el.offsetParent);
        }
        return { "x": x, "y": y };
    },

    loadscript: function (url, callback) {
        if (!CE.Util.loadscript[url]) {
            CE.Util.loadscript[url] = "loading";
            var done = false, head = document.getElementsByTagName('head')[0], script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            script.onload = script.onreadystatechange = script.onerror = function () {
                CE.Util.log(url, "readystate", this.readyState);
                if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    done = true;
                    CE.Util.loadscript[url] = "complete";
                    if (typeof callback === "function") {
                        callback();
                    }
                    script.onload = script.onreadystatechange = script.onerror = null;
                    head.removeChild(script);
                }
            };

            head.appendChild(script);
        }
    },

    log: function () {
        if (CE.Config.debug || window.location.hash.match(/debug/i)) {
            try {
                if (typeof loadFirebugConsole === "function" && typeof console === "undefined") {
                    window.loadFirebugConsole();
                }
                console.log.apply(this, arguments);
            } catch (err) {
                CE.Util.log._arg.push(arguments);
                if (!CE.Util.loadscript[CE.Config.firebugURL]) {
                    CE.Util.loadscript(CE.Config.firebugURL, function () {
                        try {
                            var a;
                            firebug.init();
                            while (a = CE.log._arg.shift()) {
                                CE.Util.log(a);
                            }
                        } catch (err) { }
                    });
                }
            }
        }
    }
};

CE.Util.log._arg = [];

// extending cookie object to make it possible to set cookie options from Flash externalInterface
CE.Util.cookie.options = {};
CE.Util.cookie.setOption = function (name, value) {
	CE.Util.cookie.options[name] = value;
};
CE.Util.cookie.clearOptions = function () {
	CE.Util.cookie.options = {};
};


// jQuery plugins


/**
 *
 * Copyright (c) 2008 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * uses an iframe, sized in ems, to detect font size changes then trigger a "fontresize" event
 * heavily based on code by Hedger Wang: http://www.hedgerwow.com/360/dhtml/js-onfontresize.html
 *
 * "fontresize" event is triggered on the document object
 * subscribe to event using: $(document).bind("fontresize", function (event, data) {});
 * "data" contains the current size of 1 em unit (in pixels)
 * 
 */

jQuery.onFontResize = (function ($) {
    // initialize
    $(document).ready(function () {
        var $resizeframe = $("<iframe />")
			.attr("id", "frame-onFontResize" + Date.parse(new Date))
			.addClass("div-onfontresize")
			.css({ width: "100em", height: "10px", position: "absolute", borderWidth: 0, top: "-5000px", left: "-5000px" })
			.appendTo("body");

        if ($.browser.msie) {
            // use IE's native iframe resize event
            $resizeframe.bind("resize", function () {
                $.onFontResize.trigger($resizeframe[0].offsetWidth / 100);
            });
        } else {
            // everyone else uses script inside the iframe to detect resize
            var doc = $resizeframe[0].contentWindow || $resizeframe[0].contentDocument || $resizeframe[0].document;
            doc = doc.document || doc;
            doc.open();
            doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery(".div-onfontresize")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
            doc.close();
        }

        jQuery.onFontResize.initialSize = $resizeframe[0].offsetWidth / 100;
    });

    return {
        // public method, so it can be called from within the iframe
        trigger: function (em) {
            $(document).trigger("fontresize", [em]);
        }
    };
})(jQuery);


/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery-Plugin "preloadCssImages"
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_automatically_preload_images_from_css_with_jquery/
 * demo page: http://www.filamentgroup.com/examples/preloadImages/index_v2.php
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Version: 5.0, 10.31.2008
 * Changelog:
 * 	02.20.2008 initial Version 1.0
 *    06.04.2008 Version 2.0 : removed need for any passed arguments. Images load from any and all directories.
 *    06.21.2008 Version 3.0 : Added options for loading status. Fixed IE abs image path bug (thanks Sam Pohlenz).
 *    07.24.2008 Version 4.0 : Added support for @imported CSS (credit: http://marcarea.com/). Fixed support in Opera as well. 
 *    10.31.2008 Version: 5.0 : Many feature and performance enhancements from trixta
 * --------------------------------------------------------------------
 */

;jQuery.preloadCssImages = function(settings){
	settings = jQuery.extend({
		statusTextEl: null,
		statusBarEl: null,
		errorDelay: 999, // handles 404-Errors in IE
		simultaneousCacheLoading: 2
	}, settings);
	var allImgs = [],
		loaded = 0,
		imgUrls = [],
		thisSheetRules,	
		errorTimer;
	
	function onImgComplete(){
		clearTimeout(errorTimer);
		if (imgUrls && imgUrls.length && imgUrls[loaded]) {
			loaded++;
			if (settings.statusTextEl) {
				var nowloading = (imgUrls[loaded]) ? 
					'Now Loading: <span>' + imgUrls[loaded].split('/')[imgUrls[loaded].split('/').length - 1] : 
					'Loading complete'; // wrong status-text bug fixed
				jQuery(settings.statusTextEl).html('<span class="numLoaded">' + loaded + '</span> of <span class="numTotal">' + imgUrls.length + '</span> loaded (<span class="percentLoaded">' + (loaded / imgUrls.length * 100).toFixed(0) + '%</span>) <span class="currentImg">' + nowloading + '</span></span>');
			}
			if (settings.statusBarEl) {
				var barWidth = jQuery(settings.statusBarEl).width();
				jQuery(settings.statusBarEl).css('background-position', -(barWidth - (barWidth * loaded / imgUrls.length).toFixed(0)) + 'px 50%');
			}
			loadImgs();
		}
	}
	
	function loadImgs(){
		//only load 1 image at the same time / most browsers can only handle 2 http requests, 1 should remain for user-interaction (Ajax, other images, normal page requests...)
		// otherwise set simultaneousCacheLoading to a higher number for simultaneous downloads
		if(imgUrls && imgUrls.length && imgUrls[loaded]){
			var img = new Image(); //new img obj
			img.src = imgUrls[loaded];	//set src either absolute or rel to css dir
			if(!img.complete){
				jQuery(img).bind('error load onreadystatechange', onImgComplete);
			} else {
				onImgComplete();
			}
			errorTimer = setTimeout(onImgComplete, settings.errorDelay); // handles 404-Errors in IE
		}
	}
	
	function parseCSS(sheets, urls) {
		var w3cImport = false,
			imported = [],
			importedSrc = [],
			baseURL;
		var sheetIndex = sheets.length;
		while(sheetIndex--){//loop through each stylesheet
			
			var cssPile = '';//create large string of all css rules in sheet
			
			if(urls && urls[sheetIndex]){
				baseURL = urls[sheetIndex];
			} else {
				var csshref = (sheets[sheetIndex].href) ? sheets[sheetIndex].href : 'window.location.href';
				if (csshref.match(/^https?:\/\//)) continue; 
				var baseURLarr = csshref.split('/');//split href at / to make array
				baseURLarr.pop();//remove file path from baseURL array
				baseURL = baseURLarr.join('/');//create base url for the images in this sheet (css file's dir)
				if (baseURL) {
					baseURL += '/'; //tack on a / if needed
				}
			}
			if(sheets[sheetIndex].cssRules || sheets[sheetIndex].rules){
				thisSheetRules = (sheets[sheetIndex].cssRules) ? //->>> http://www.quirksmode.org/dom/w3c_css.html
					sheets[sheetIndex].cssRules : //w3
					sheets[sheetIndex].rules; //ie 
				var ruleIndex = thisSheetRules.length;
				while(ruleIndex--){
					if(thisSheetRules[ruleIndex].style && thisSheetRules[ruleIndex].style.cssText){
						var text = thisSheetRules[ruleIndex].style.cssText;
						if(text.toLowerCase().indexOf('url') != -1){ // only add rules to the string if you can assume, to find an image, speed improvement
							cssPile += text; // thisSheetRules[ruleIndex].style.cssText instead of thisSheetRules[ruleIndex].cssText is a huge speed improvement
						}
					} else if(thisSheetRules[ruleIndex].styleSheet) {
						imported.push(thisSheetRules[ruleIndex].styleSheet);
						w3cImport = true;
					}
					
				}
			}
			//parse cssPile for image urls
			var tmpImage = cssPile.match(/[^\("]+\.(gif|jpg|jpeg|png)/g);//reg ex to get a string of between a "(" and a ".filename" / '"' for opera-bugfix
			if(tmpImage){
				var i = tmpImage.length;
				while(i--){ // handle baseUrl here for multiple stylesheets in different folders bug
					var imgSrc = (tmpImage[i].charAt(0) == '/' || tmpImage[i].match('://')) ? // protocol-bug fixed
						tmpImage[i] : 
						baseURL + tmpImage[i];
					
					if(jQuery.inArray(imgSrc, imgUrls) == -1){
						imgUrls.push(imgSrc);
					}
				}
			}
			
			if(!w3cImport && sheets[sheetIndex].imports && sheets[sheetIndex].imports.length) {
				for(var iImport = 0, importLen = sheets[sheetIndex].imports.length; iImport < importLen; iImport++){
					var iHref = sheets[sheetIndex].imports[iImport].href;
					iHref = iHref.split('/');
					iHref.pop();
					iHref = iHref.join('/');
					if (iHref) {
						iHref += '/'; //tack on a / if needed
					}
					var iSrc = (iHref.charAt(0) == '/' || iHref.match('://')) ? // protocol-bug fixed
						iHref : 
						baseURL + iHref;
					
					importedSrc.push(iSrc);
					imported.push(sheets[sheetIndex].imports[iImport]);
				}
				
				
			}
		}//loop
		if(imported.length){
			parseCSS(imported, importedSrc);
			return false;
		}
		var downloads = settings.simultaneousCacheLoading;
		while( downloads--){
			setTimeout(loadImgs, downloads);
		}
	}
	parseCSS(document.styleSheets);
	return imgUrls;
};

function ClearCookie() {

    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        eraseCookie(cookies[i].split("=")[0]);
    }
    
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    
    if (name.indexOf('JSESSIONID') > 0) {
        document.cookie = name + "=" + value + expires + "; path=/; domain=.consumersenergy.com;";
    }
    if (name.indexOf('saplb_*') > 0) { document.cookie = name + "=" + value + expires + "; path=/;"; }

    document.cookie = "MYSAPSSO2" + "=" + value + expires + ";domain='https://wwwdev.consumersenergy.com';HttpOnly;";
}
