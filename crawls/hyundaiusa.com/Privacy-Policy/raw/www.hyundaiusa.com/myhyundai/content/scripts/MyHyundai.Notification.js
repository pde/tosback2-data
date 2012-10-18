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
if (jQuery && !jQuery.cookie) {
    (function ($) { $.cookie = function (key, value, options) { if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) { options = $.extend({}, options); if (value === null || value === undefined) { options.expires = -1; } if (typeof options.expires === 'number') { var days = options.expires, t = options.expires = new Date(); t.setDate(t.getDate() + days); } value = String(value); return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('')); } options = value || {}; var decode = options.raw ? function (s) { return s; } : decodeURIComponent; var pairs = document.cookie.split('; '); for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) { if (decode(pair[0]) === key) return decode(pair[1] || ''); } return null; }; })(jQuery);
}

// Create the namespace if it does not exist
if( !window.myHyundaiUtils )
    window.myHyundaiUtils = {};

/**
 * A helper class providing a set of top level notification utilities.
 * @static
 * @singleton
 * @class myHyundaiUtils.notification
 */
if (!window.myHyundaiUtils.notification) {
    myHyundaiUtils.notification = function () {
        return {
            nWrapper: null,
            nContainer: null,
            nContent: null,
            nClose: null,
            nTimeout: null,
            nWidth: 932,
            defaultTimeout: 8000,

            /**
            * Init
            * @private
            * @static
            */
            init: function () {
                var _self = this;

                this.nContent = $('<div></div>').addClass('myhyundai-nContent').text('My Hyundai Notification Box');
                this.nClose = $('<div></div>').addClass('myhyundai-nDefaultClose').html('<a href="#" class="myhyundai-nClose">x</a>');

                this.nContainer = $('<div></div>').addClass('myhyundai-nContainer');

                if ($('.wrp-page').size() > 0) this.nWidth = parseInt($('.wrp-page').innerWidth(), 10) * 0.95;
                this.nContainer.css('width', this.nWidth + 'px');

                this.nContainer.append(this.nContent, this.nClose);

                this.nWrapper = $('<div></div>').addClass('myhyundai-nWrapper');
                this.nWrapper.append(this.nContainer);

                $('body').append(this.nWrapper);

                $('.myhyundai-nClose').live('click', function (e) {
                    e.preventDefault();
                    _self.close();
                });

                // Check for Redirect Cookie
                var cook1 = $.trim($.cookie('myHyundaiRedirect'));
                if (cook1 != null && cook1 != '') {
                    $.cookie('myHyundaiRedirect', null, { path: '/' });
                    var encodedCook = cook1.split('=');
                    encodedCook[1] = encodeURIComponent(encodedCook[1])
                    cook1 = encodedCook.join('=');
                    window.location = cook1;
                } else {
                    // Check for Notify Cookie
                    var cook2 = $.trim($.cookie('myHyundaiNotification'));
                    if (cook2 != null && cook2 != '') {
                        this.open(cook2);
                        $.cookie('myHyundaiNotification', null, { path: '/' });
                    }
                }
            },

            /**
            * Open
            * @public
            * @static
            */
            open: function (message, timeout) {
                var _self = this;
                if (_self.nTimeout) { clearTimeout(_self.nTimeout); _self.nTimeout = null; }

                this.nContainer.css('width', this.nWidth + 'px');

                this.nContent.html(message);

                //this.nContainer.trigger('focus');
                $('#hyundaiSearch').hide();

                $(this.nWrapper).slideDown('slow', function () {

                    _self.nTimeout = setTimeout(function () {
                        _self.close();
                    }, timeout || _self.defaultTimeout);
                });
            },

            /**
            * Refresh
            * @public
            * @static
            */
            refresh: function (message) {
                $.cookie('myHyundaiNotification', message, { path: '/' });
                window.top.location.reload();
            },

            /**
            * Close
            * @private
            * @static
            */
            close: function () {
                $('.myhyundai-nWrapper').slideUp(3000);
                $('#hyundaiSearch').show();
                if (this.nTimeout) { clearTimeout(this.nTimeout); this.nTimeout = null; }
            }


        }
    } ();
}

$(document).ready(function () {
    myHyundaiUtils.notification.init();
})