/*jslint devel: true, browser: true, sloppy: true, widget: true, regexp: true, maxerr: 50, indent: 4 */

(function () {

    function CookieManager() {
        // based on ppk cookie implementation: http://www.quirksmode.org/js/cookies.html, because our BCNTRY version doesn't work for some reason
        this.setCookie = function (name, value, days) {
            var expires = "", date = new Date();
            if (days) {
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
        };

        this.readCookie =  function (name) {
            var i, nameEQ = name + "=",  ca = document.cookie.split(';');
            for (i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            return null;
        };
    }

// Define program constants

    var TIME_BEFORE_FIRST_ALERT, TIME_BETWEEN_ALERTS, TIME_BEFORE_POPUP_FIRES, CART_COOKIE, CART_TRACKER_COOKIE, COOKIE_ITEM_SEP, CART_TRACKER_BANNED_URLS;

    TIME_BEFORE_FIRST_ALERT     =       8 * 60 * 60;
    TIME_BETWEEN_ALERTS         = 30 * 24 * 60 * 60;

    // This is for testing... sets timeout to very short
    /*
    TIME_BEFORE_FIRST_ALERT     =       1 * 2;
    TIME_BETWEEN_ALERTS         =       1 * 2;
    */

    TIME_BEFORE_POPUP_FIRES      = 1.5;// NOTE: Race condition may occur if this fires too early (<500millis), results in image being off-centered
    CART_COOKIE                  = 'CART';
    CART_TRACKER_COOKIE          = 'cart_tracker';
    COOKIE_ITEM_SEP              = '^';

    CART_TRACKER_BANNED_URLS = [
        '/store/cart.html',
        '/store/cart/add.html',
        '/store/order_history.html',
        '/store/checkout.html',
        '/store/checkout/finalize_order.html',
        '/store/receipt'
    ];

    function AbandonedCartTracker() {
        // what time is it?
        this.cm = new CookieManager();
        this.now = Math.floor(new Date().getTime() / 1000);

        // set up some values based on cookies
        this.setup_cookie_state = function () {
            this.current_cart_hash  = this.cm.readCookie(CART_COOKIE);
            this.tracker_created = null;
            this.tracker_updated = null;
            this.tracker_hash = null;

            var pieces, cookie = this.cm.readCookie(CART_TRACKER_COOKIE);
            if (cookie) {
                pieces = cookie.split(COOKIE_ITEM_SEP, 3);
                if (pieces.length === 3) {
                    this.tracker_created = parseInt(pieces[0], 10);
                    this.tracker_updated = parseInt(pieces[1], 10);
                    this.tracker_hash = pieces[2];
                }
            }
        };

        this.setup_cookie_state();

        // update cookie state
        this.update_tracker = function () {
            this.cm.setCookie(CART_TRACKER_COOKIE,
                this.tracker_created + COOKIE_ITEM_SEP + this.now + COOKIE_ITEM_SEP + this.tracker_hash,
                2 * 365);
        };

        // initialize cookie state
        this.initialize_tracker = function () {
            this.cm.setCookie(CART_TRACKER_COOKIE,
                this.now + COOKIE_ITEM_SEP + /* nothing here for init */ COOKIE_ITEM_SEP + this.current_cart_hash,
                2 * 365);
        };

        // get our current url
        this.url = (function () {
            var pieces, url = document.URL.replace(/\?.*/, "");
            pieces = url.split("/");
            if (pieces && pieces.length > 3) {
                return "/" + (pieces.slice(3)).join("/");
            }
            return "/";
        }());


        // checks for pages that we don't display the popup on
        this.is_page_banned = function () {
            var i;
            for (i = 0; i < CART_TRACKER_BANNED_URLS.length; i += 1) {
                if (this.url === CART_TRACKER_BANNED_URLS[i]) {
                    return true;
                }
            }
            return false;
        };

        this.add_stylesheet = function (id, path) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', path);
            link.setAttribute('id', id);
            document.getElementsByTagName("head")[0].appendChild(link);
        };

        // actually display something
        this.show_alert = function () {
            this.add_stylesheet('yui_container_style_id', "http://yui.yahooapis.com/2.7.0/build/container/assets/container.css");
            this.add_stylesheet('cart_tracker_style_id', "/css/screen/shared/abandoned_cart_tracker.css");
            YAHOO.namespace("bcs.abandoned_cart");
            YAHOO.bcs.abandoned_cart.dialog = new YAHOO.widget.Panel("abCartDialog", {
                visible : true,
                close : false,
                draggable : false,
                modal : true,
                zIndex : 500,
                fixedcenter : true
            });
            YAHOO.bcs.abandoned_cart.dialog.setBody(
                '<div class="link_area" id="close_1_id"></div>' +
                    '<div class="link_area" id="open_1_id" ></div>' +
                    '<div class="link_area" id="close_2_id"></div>'
            );

            var close = function () {
                YAHOO.bcs.abandoned_cart.dialog.hide();
            };

            YAHOO.util.Event.addListener('close_1_id', "click", close);
            YAHOO.util.Event.addListener('close_2_id', "click", close);
            YAHOO.util.Event.addListener('abCartDialog_mask', "click", close);
            YAHOO.util.Event.addListener('open_1_id', "click", function () { window.location = "/store/cart.html"; });

            YAHOO.bcs.abandoned_cart.init = function () {
                YAHOO.bcs.abandoned_cart.dialog.render(document.body);
            };

            setTimeout(YAHOO.bcs.abandoned_cart.init, TIME_BEFORE_POPUP_FIRES * 1000);
        };

        // the main logic
        this.track_the_cart = function () {
            if (this.current_cart_hash) {
                if (this.tracker_hash !== this.current_cart_hash) { // changed cart or non-init tracker
                    this.initialize_tracker();
                } else if (!this.is_page_banned()) {
                    if (this.tracker_created) {
                        if (!this.tracker_updated) {
                            if (this.now - this.tracker_created > TIME_BEFORE_FIRST_ALERT) {
                                this.update_tracker();
                                this.show_alert();
                            }
                        } else if (this.now  - this.tracker_updated > TIME_BETWEEN_ALERTS) {
                            this.update_tracker();
                            this.show_alert();
                        }
                    }
                }
            }
        };
    }

    // register the tracker on page load
    YAHOO.util.Event.onDOMReady(function () { new AbandonedCartTracker().track_the_cart(); });

}());
