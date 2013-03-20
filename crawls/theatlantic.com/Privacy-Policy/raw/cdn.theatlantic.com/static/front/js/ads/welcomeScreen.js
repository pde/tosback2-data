(function() {
    Atlantic = window.Atlantic || {};
    Atlantic.DEBUG = false;

    // Function.bind() compatibility.
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    /*******************
     * WELCOME SCREENS *
     *******************/

    /**
     * Initialize the welcome screen
     */
    Atlantic.WelcomeScreen = function() {
        this.clock = 15;
        this.detectMobile();
    };

    /**
     * Mobile?
     */
    Atlantic.WelcomeScreen.prototype.detectMobile = function () {
        var device = navigator.userAgent.match(/(Android|BlackBerry|PlayBook|iPhone|iPad|iPod|Opera Mini|IEMobile|MeeGo)/i);
        if (device !== null) {
            this.mobile = true;
            this.device = device[0];
        }
    };

    /**
     * Basic Show/Hide
     */
    Atlantic.WelcomeScreen.prototype.show = function () {
        var self = this;

        $('body').addClass('overflow-hidden');
        $('#lightbox-bg').show();
        $('#lightbox-container').show();
        $('#lightbox-count').html(this.clock);

        // Bind the hide events
        $('#lightbox-continue a').on('click', function(e) {
            e.preventDefault();
            self.hide();
        });

        $('#lightbox-bg, #lightbox-container').on('click', function (e) {
            if (this === e.target) {
                self.hide();
            }
        });

        // Set the cookie
        Atlantic.Utils.createCookie('seen_welcome_screen', true, 1);
        this.timeout = setInterval(this.runCountdown.bind(this), 1000);
        this.runCountdown();
    };

    Atlantic.WelcomeScreen.prototype.hide = function () {
        $('body').removeClass('overflow-hidden');
        $("#lightbox-bg").remove();
        $("#lightbox-content").remove();
        this.stopCountdown();
    };

    /**
     * Timer.
     */
    Atlantic.WelcomeScreen.prototype.runCountdown = function () {
        if (Atlantic.DEBUG === true) { console.log(this.clock); }
        if (this.timeout === false) {
            this.timeout = setInterval(this.runCountdown.bind(this), 1000);
        }

        $("#lightbox-count").html(this.clock);

        if (this.clock === 0) {
            return this.hide();
        } else {
            this.clock -= 1;
        }
    };

    Atlantic.WelcomeScreen.prototype.stopCountdown = function () {
        if (Atlantic.DEBUG === true) { console.log("Cleared"); }
        clearInterval(this.timeout);
        this.timeout = false;
    };

    welcomeScreen = new Atlantic.WelcomeScreen();
})();
