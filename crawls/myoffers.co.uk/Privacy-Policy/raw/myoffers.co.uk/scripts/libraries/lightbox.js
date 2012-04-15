(function ($) {
    $.fn.lightBox = function (settings) {
        // Settings to configure the jQuery lightBox plugin how you like
        defaults = {
            iframeUrl: 'http://www.google.com',
            iframeWidth: 700,
            iframeHeight: 600,
            boxTitle: 'Box Title',
            overlayBgColor: '#000',
            overlayOpacity: 0.6,
            containerResizeSpeed: 400,
            showLoad: false,
            defaultHTML: true
        };

        settings = $.extend(defaults, settings);



        var jQueryMatchedObj = this;



        function _initialize() {
            _start(this, jQueryMatchedObj);
            return false;
        }
        function _start(objClicked, jQueryMatchedObj) {
            // Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility': 'hidden' });
            _set_interface();
            _set_iframe_to_view();
        }

        function _set_interface() {
            if (settings.defaultHTML) {
                // Apply the HTML markup into body tag
                $('div#upper-frame').before('<div id="lightbox-overlay"></div>' +
			'<div id="lightbox-window"><div id="lightbox-loading"></div><div id="lightbox-container-iframe-box">' +
			'<div class="box-panel"><div class="panel-header"><div class="l"><div class="r"><div class="panel-title-container"><h3><span class="l"><span class="r">' + settings.boxTitle + '</span></span></h3><div class="lite-clear">&nbsp;</div></div></div></div></div>' +
		    '<div class="panel-content"><div class="l"><div class="r"><div class="panel-container"><div id="lightbox-container-iframe"><iframe id="lightbox-iframe" name="lightbox-iframe" frameborder="0" width="' + settings.iframeWidth + '" height="' + settings.iframeHeight + '" src="' + settings.iframeUrl + '"></iframe></div></div></div></div></div>' +
			'<div class="panel-footer"><div class="l"><div class="r"></div></div></div>' +
			'<div class="close-button"><a href="#">Close Window</a></div>' +
			'</div></div></div>');
            }
            else {
             // onpageload html
             $('div#upper-frame').before('<div id="lightbox-overlay"></div>' +
			'<div id="lightbox-window"><div id="lightbox-loading"></div><div id="lightbox-container-iframe-box"><span class="lightbox-bg"></span>' +
			'<div class="box-panel"><div class="panel-header"><div class="l"><div class="r"><div class="panel-title-container"><h3><span class="l"><span class="r">' + settings.boxTitle + '</span></span></h3><div class="lite-clear">&nbsp;</div></div></div></div></div>' +
		    '<div class="panel-content"><div class="l"><div class="r"><div class="panel-container"><div id="lightbox-container-iframe"><iframe id="lightbox-iframe" name="lightbox-iframe" frameborder="0" width="' + settings.iframeWidth + '" height="' + settings.iframeHeight + '" src="' + settings.iframeUrl + '"></iframe></div></div></div></div></div>' +
			'<div class="panel-footer"><div class="l"><div class="r"></div></div></div>' +
			'<div class="close-button"><a href="#">Close Window</a></div>' +
			'</div></div></div>');

            
            }
            
            // Get page sizes
            var arrPageSizes = ___getPageSize();
            // Style overlay and show it
            $('div#lightbox-overlay').css({
                backgroundColor: settings.overlayBgColor,
                opacity: settings.overlayOpacity,
                width: arrPageSizes[0],
                height: arrPageSizes[1]
            }).fadeIn();
            // Get page scroll
            var arrPageScroll = ___getPageScroll();
            // Calculate top and left offset for the jquery-lightbox div object and show it
            $('div#lightbox-window').css({
                top: arrPageScroll[1] + (arrPageSizes[3] / 10),
                left: arrPageScroll[0]
            }).show();
            // Assigning click events in elements to close overlay
            $('div#lightbox-overlay, div#lightbox-window').click(function () {
                _finish();
            });
            // If window was resized, calculate the new overlay dimensions
            $(window).resize(function () {
                // Get page sizes
                var arrPageSizes = ___getPageSize();
                // Style overlay and show it
                $('div#lightbox-overlay').css({
                    width: arrPageSizes[0],
                    height: arrPageSizes[1]
                });
                // Get page scroll
                var arrPageScroll = ___getPageScroll();
                // Calculate top and left offset for the jquery-lightbox div object and show it
                $('div#lightbox-window').css({
                    top: arrPageScroll[1] + (arrPageSizes[3] / 10),
                    left: arrPageScroll[0]
                });
            });
        }

        function _set_iframe_to_view() { // show the loading
            // Show the loading
            $('div#lightbox-loading').show();

            var iframeWidthPadding = settings.iframeWidth + 30
            var iframeHeightPadding = settings.iframeHeight + 100
            _resize_container_iframe_box(iframeWidthPadding, iframeHeightPadding);
        };

        function _resize_container_iframe_box(intiframeWidth, intiframeHeight) {
            // Get current width and height
            var intCurrentWidth = $('div#lightbox-container-iframe-box').width();
            var intCurrentHeight = $('div#lightbox-container-iframe-box').height();
            // Diferences
            var intDiffW = intCurrentWidth - (intiframeWidth);
            var intDiffH = intCurrentHeight - (intiframeHeight);
            // Perfomance the effect
            $('div#lightbox-container-iframe-box').animate({ width: intiframeWidth, height: intiframeHeight }, settings.containerResizeSpeed, function () { _show_iframe(); });
            if ((intDiffW == 0) && (intDiffH == 0)) {
                if ($.browser.msie) {
                    ___pause(250);
                } else {
                    ___pause(100);
                }
            }
        };

        function _show_iframe() {
            $('div#lightbox-loading').fadeOut('slow');
        };

        function _finish() {
            $('div#lightbox-window').remove();
            $('div#lightbox-overlay').fadeOut(function () { $('div#lightbox-overlay').remove(); });
            // Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility': 'visible' });
        }
        /**
        / THIRD FUNCTION
        * getPageSize() by quirksmode.com
        *
        * @return Array Return an array with page width, height and window width, height
        */
        function ___getPageSize() {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) {	// all except Explorer
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) { // other Explorers
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }
            // for small pages with total height less then height of the viewport
            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            } else {
                pageHeight = yScroll;
            }
            // for small pages with total width less then width of the viewport
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
            return arrayPageSize;
        };
        /**
        / THIRD FUNCTION
        * getPageScroll() by quirksmode.com
        *
        * @return Array Return an array with x,y page scroll values.
        */
        function ___getPageScroll() {
            var xScroll, yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
                yScroll = document.documentElement.scrollTop;
                xScroll = document.documentElement.scrollLeft;
            } else if (document.body) {// all other Explorers
                yScroll = document.body.scrollTop;
                xScroll = document.body.scrollLeft;
            }
            arrayPageScroll = new Array(xScroll, yScroll);
            return arrayPageScroll;
        };
        /**
        * Stop the code execution from a escified time in milisecond
        *
        */
        function ___pause(ms) {
            var date = new Date();
            curDate = null;
            do { var curDate = new Date(); }
            while (curDate - date < ms);
        };
        // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once

        if (!settings.showLoad)
            return this.unbind('click').click(_initialize);
        else
            return _initialize(this, "");
    };
})(jQuery);        // Call and execute the function immediately passing the jQuery object