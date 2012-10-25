Event.observe(window, "load", function() {
    (function($){
    
        var miniCartSubmit = window.miniCartSubmit = function(formObject, redirect) {
            var callback = null
            if (arguments.length > 2) {
                callback = arguments[2];
            }
            $.getJSON('/cartHandler/ajax.jsp', $(formObject).serialize() + '&async=true&no_cache=' + new Date().getTime(), function (json) {
                if (json.rdir) {
                    window.location.href = json.rdir;
                } else {
                    updateCartItemDisplay(json.itemCount);
                    if (callback) {
                        callback(formObject);
                    }
                    if (redirect) {
                        window.location.href = '/cart/index.jsp' + '?ias2VwCartSkusAdded=' + json.skusAdded;
                    } else {
                    	window.minicartJson = json;
                        showCart(true);
                    }
                }
            }).error(function() {
                $(formObject).append('<input type="hidden" name="showProductInCart" value="true"/>').submit();
            });
        };

        var hideCart = function() {
            $('#minicart').hide();
        };

        var cartLoaded = false;
        var showCart = function(init) {
            if (cartLoaded && !init) {
                $('#minicart').show();
            } else {
                $('#minicart').load('/minicart/index.jsp', {t: new Date().getTime()}, function (response, status, xhr) {
                    if (status == "error") {
                        // cart issue, ignore it
                    } else {
                        $('#minicart').show();
                        var cartTop = $('#minicart').parent().position().top, 
                            bodyelem = $('html, body');
                        if ($.browser.safari) {
                            bodyelem = $("body");
                        }
                        if (cartTop < bodyelem.scrollTop()) {
                            bodyelem.animate({scrollTop: cartTop}, 'slow');
                        }
                        cartLoaded = true;
                        if (init) {
                            setMinicartTimeout(minicartTimeOut);
                        }
                    }
                });
            }
        };

        var miniCartCloseTime;
        var minicartCloseTimer;
        var setMinicartTimeout = function(duration) {
            var now = new Date().getTime();
            miniCartCloseTime = now + duration;
            clearTimeout(minicartCloseTimer);
            minicartCloseTimer = setTimeout(hideCart, miniCartCloseTime - now);
        };

        var updateCartItemDisplay = window.updateCartItemDisplay = function(itemCount) {
            $("#hdrCart .cartItemCount").text(itemCount);
        };

        $('#minicart').delegate('.minicart_close', 'click', hideCart);

        $('#hdrCart').mouseenter(function(e) {
            if (!$(e.currentTarget).hasClass('minicartDisabled')) {
                $('#minicart').show();
                showCart(false);
            }
            clearTimeout(minicartCloseTimer);
        }).mouseleave(function(e) {
            var now = new Date().getTime();
            if (now > miniCartCloseTime) {
                hideCart();
            } else {
                clearTimeout(minicartCloseTimer);
                minicartCloseTimer = setTimeout(hideCart, miniCartCloseTime - now);
            }
        });

    })(jQuery);
});

