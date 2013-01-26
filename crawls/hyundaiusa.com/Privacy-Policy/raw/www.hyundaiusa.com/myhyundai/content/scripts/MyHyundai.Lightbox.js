/******************************************************************************/
/* NOTE: This file is being integrated into HyundaiUSA.com, Edit with Caution */
/******************************************************************************/

/**
* jQuery Cookie plugin - https://github.com/carhartl/jquery-cookie
*
* Copyright (c) 2010 Klaus Hartl, @carhartl
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
try {
    if (jQuery && !jQuery.cookie) {
        (function ($) { $.cookie = function (key, value, options) { if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) { options = $.extend({}, options); if (value === null || value === undefined) { options.expires = -1; } if (typeof options.expires === 'number') { var days = options.expires, t = options.expires = new Date(); t.setDate(t.getDate() + days); } value = String(value); return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('')); } options = value || {}; var decode = options.raw ? function (s) { return s; } : decodeURIComponent; var pairs = document.cookie.split('; '); for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) { if (decode(pair[0]) === key) return decode(pair[1] || ''); } return null; }; })(jQuery);
    }
} catch (e) { }

// Create the namespace if it does not exist
if( !window.myHyundaiUtils )
    window.myHyundaiUtils = {};

/**
 * A helper class providing a set of lightbox related utilities.
 * @static
 * @singleton
 * @class myHyundaiUtils.lightbox
 */
myHyundaiUtils.lightbox = function () {
    return {
        lbContainer: null,
        lbFrame: null,
        isLB: null,
        hash: null,
        parentDomain: null,

        /**
        * Init
        * @private
        * @static
        */
        init: function () {

            //console.log(window.location);

            this.isLB = $('body').is('.myhyundai-lbBody');

            this.hash = $.trim(window.location.hash.substring(1)).split('|');
            if (this.hash[0] == 'myhyundai-lightbox') {
                this.parentDomain = this.hash[1];
                $.cookie('myHyundaiParentDomain', this.parentDomain, { path: '/' });
            } else {
                this.parentDomain = $.cookie('myHyundaiParentDomain');
            }

            // Bind action triggered on the click event
            $(".myhyundai-lbOpen").live('click', this.open);

            if (this.isLB) {
                // Bind action triggered on the cancel event
                $('.myhyundai-lbCancel').live('click', function (e) {
                    e.preventDefault();
                    myHyundaiUtils.lightbox.parentCallback('close');
                });
            } else {
                // Bind action triggered on the cancel event
                $('.myhyundai-lbCancel').live('click', function (e) {
                    e.preventDefault();
                    myHyundaiUtils.lightbox.close();
                });
            }

            //Close Lightbox on "X - Close", shadow layer or "Escape key" press.
            $(document).live('keyup', function (e) {
                if (e.keyCode == 27) {
                    myHyundaiUtils.lightbox.close();
                }
            });

            //Close Lightbox when "X - Close" or shadow layer are clicked.
            $(".myhyundai-lbClose a").live('click', function (e) {
                e.preventDefault();
                myHyundaiUtils.lightbox.close();
            });
            $(".myhyundai-lbOverlay").live('click', function (e) {
                e.preventDefault();
                myHyundaiUtils.lightbox.close();
            });

            /* //Deprecating this section as we are resolving this from UX perspective
            if (this.hash[0] == 'myhyundai-lightbox') {
            // This function will reFit if window orientation has changed
            var previousOrientation = 0;
            var checkOrientation = function () {
            if (window.orientation !== previousOrientation) {
            previousOrientation = window.orientation;
            myHyundaiUtils.lightbox.reFit();
            }
            };

            // Call the orientation reFit function for Android only (for now)
            if (!navigator.userAgent.match(/android/i)) {
            window.addEventListener("orientationchange", checkOrientation, false);
            // (optional) Android doesn't always fire orientationChange on 180 degree turns
            setInterval(checkOrientation, 2000);
            }
            }
            */

            if (this.isLB) {
                setTimeout(function () {
                    myHyundaiUtils.lightbox.reFit();
                }, 1000);
            }
        },

        /**
        * Open
        * @private
        */
        open: function (e) {
            e.preventDefault();

            if (myHyundaiUtils.lightbox.isLB) {
                myHyundaiUtils.lightbox.parentCallback('changeURL|' + $(this).attr('href'));
                return false;
            }

            var href = $(this).attr('href');
            var lbContentItem = null;

            if (href.substring(0, 1) == '#') {
                lbContentItem = $(href).clone().show();
                var lbLocalFrame = $('<div></div>').addClass('myhyundai-lbContent').append(lbContentItem);
                var lbWrapper = myHyundaiUtils.lightbox.createContainer(lbLocalFrame);

            } else {
                var lbIframe = $('<iframe></iframe>')
                    .addClass('myhyundai-lbIframe')
                    .css({ 'border': '0 none' })
                    .attr({ 'scrolling': 'no', 'frameBorder': '0' });

                var lbWrapper = myHyundaiUtils.lightbox.createContainer(lbIframe);
                myHyundaiUtils.lightbox.changeURL($(this).attr('href'));
            }

            $('body').append(lbWrapper);

            if (href.substring(0, 1) == '#') {
                myHyundaiUtils.lightbox.reFit(lbContentItem);
            } else {
                myHyundaiUtils.lightbox.resize({ h: 262, w: 330 });
            }


            myHyundaiUtils.lightbox.lbOverlay.show().fadeTo('fast', 0.7, function () {
                myHyundaiUtils.lightbox.lbContainer.show('fast', function () {
                    $(window).scrollTop(0);
                });
            });

        },

        /**
        * Create Container
        * @private
        * @returns lbWrapper
        */
        createContainer: function (lbFrame) {
            var lbWrapper = $('<div></div>').addClass('myhyundai-lbWrapper');
            var lbContainer = $('<div></div>').addClass('myhyundai-lbContainer');
            var lbOverlay = $('<div></div>').addClass('myhyundai-lbOverlay');

            var lbClose = $('<div></div>')
                        .addClass('myhyundai-lbClose')
                        .append($('<a></a>').attr('href', '#').text('X'));

            lbContainer.append(lbClose, lbFrame);
            lbWrapper.append(lbOverlay, lbContainer);

            myHyundaiUtils.lightbox.lbContainer = lbContainer;
            myHyundaiUtils.lightbox.lbOverlay = lbOverlay;
            myHyundaiUtils.lightbox.lbFrame = lbFrame;

            return lbWrapper;
        },

        /**
        * Resize
        * @private
        * @static
        */
        resize: function (dimensions) {
            var h = parseInt(dimensions.h, 10);
            var w = parseInt(dimensions.w, 10);

            if (h == 0 || w == 0)
                return false;

            var viewportHeight = $(window).height(); //document.documentElement.clientHeight;
            var viewportWidth = $(window).width(); //document.documentElement.clientWidth;

            var top = ((viewportHeight / 2) - ((h + 100) / 2));
            if (top < 20) top = 20;

            var left = ((viewportWidth / 2) - ((w + 23) / 2));
            if (left < 20) left = 20;

            this.lbContainer.animate({ 'top': top + 'px', 'left': left + 'px' });
            this.lbFrame.animate({ 'width': w + 'px', 'height': h + 'px' });
        },

        reFit: function (lbContentItem) {
            var item = lbContentItem || $('.myhyundai-lbContent');
            var h = $(item).outerHeight();
            var w = $(item).outerWidth();

            if (h < 20 || w < 20) {
                setTimeout(function () {
                    myHyundaiUtils.lightbox.reFit(lbContentItem || null);
                }, 50);
                return false;
            }

            if (myHyundaiUtils.lightbox.isLB) {
                myHyundaiUtils.lightbox.parentCallback('resize|' + w + '|' + h);
            } else {
                try {
                    myHyundaiUtils.lightbox.resize({ h: h, w: w });
                } catch (ex) {

                }
            }
        },

        /**
        * Close
        * @private
        * @static
        */
        close: function () {
            $('.myhyundai-lbWrapper').fadeOut('fast', function () {
                $('.myhyundai-lbWrapper').remove();
            });
        },

        /**
        * Callback
        * @private
        * @static
        */
        callback: function () {
            var hash = $.trim(window.location.hash.substring(1)).split('|');
            if (hash[0] == 'close') {
                window.top.myHyundaiUtils.lightbox.close();
            } else if (hash[0] == 'resize') {
                window.top.myHyundaiUtils.lightbox.resize({ w: hash[1], h: hash[2] });
            } else if (hash[0] == 'changeURL') {
                window.top.myHyundaiUtils.lightbox.changeURL(hash[1]);
            } else if (hash[0] == 'closeRefresh') {
                window.top.location.reload();
                // TODO: add page specific updates, like refresh login state
            } else if (hash[0] == 'closeRefreshLoggedIn') {
                var href = window.top.location.href.toLowerCase();
                if (href.indexOf("localhost") >= 0 || href.indexOf("/myhyundai") > 0) {
                    window.top.location.reload();
                } else {
                    window.top.location.assign("/myhyundai");
                }
                // TODO: add page specific updates, like refresh login state
            } else if (hash[0] == 'exec') {
                // This is where we would execute any additional script callback functions
            }
        },

        support: function (type) {
            var ret = false;
            switch (type) {
                case 'closeRefreshLoggedIn':
                    ret = true;
                    break;
            }
            return ret;
        },

        parentCallback: function (action) {
            var callbackIframe = document.createElement("iframe");
            $(callbackIframe).css({ border: '0 none', height: '1px', width: '1px' });
            $('body').append(callbackIframe);

            /* Read Script URL */
            $('script').each(function () {
                var scriptURL = $(this).attr('src');
                if (scriptURL) {
                    scriptURL = $(this).attr('src').split('/');
                    var str = scriptURL[scriptURL.length - 1];
                    if (str && str.indexOf('?') >= 0) str = str.substr(0, str.indexOf('?'));
                    if (str == 'MyHyundai.Lightbox.js') {
                        $(callbackIframe).attr('src',
                            (myHyundaiUtils.lightbox.parentDomain ? myHyundaiUtils.lightbox.parentDomain : '') +
                            scriptURL.slice(0, -1).join('/') +
                            '/MyHyundai.Lightbox.Callback.0.html#' +
                            action
                        );
                    }
                }
            });

        },

        changeURL: function (url) {
            this.lbFrame.attr('src', url + '#myhyundai-lightbox' + '|' + window.location.protocol + '//' + window.location.host);
        }
    };
} ();

try {
    $(document).ready(function () {
        myHyundaiUtils.lightbox.init();
    });
} catch (e) { }