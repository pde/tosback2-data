(function ($) {

    var methods = {
        init: function (options) {

            var settings = {
                containerClass: "globalNavigation",
                flyoutSelector: ".gn-flyout",
                hasFlyoutClass: "gn-child",
                hoverClass: "gn-on",
                expandedClass: "gn-expanded",
                beforeFlyoutOpen: false,
                afterFlyoutClose: false,
                click: false,
                target: false
            };

            if (options) {
                jQuery.extend(settings, options);
            }

            return this.each(function () {
                var $this = jQuery(this);
                $this.data("settings", settings);
                _setClassForChildLinks($this);
                if (settings.target !== false || $this.hasClass(settings.hasFlyoutClass)) {
                    if (settings.click) {
                        $this.click(function (e) {
                            if (_getData($this).beforeFlyoutOpen !== false) {
                                var result = _getData($this).beforeFlyoutOpen($this);
                                if (result === false) {
                                    return;
                                }
                            }
                            e.preventDefault();
                            if ($this.hasClass(_getData($this).hoverClass)) {
                                _hideFlyout($this);
                                $('#siteHeaderPlus').html('+');
                            } else {
                                _showFlyout($this);
                                $('#siteHeaderPlus').html('-');
                            }
                        });
                    } else {
                        $this.hoverIntent(
                            function () {
                                if (_getData($this).beforeFlyoutOpen !== false) {
                                    var result = _getData($this).beforeFlyoutOpen($this);
                                    if (result === false) {
                                        return;
                                    }
                                }
                                _showFlyout($this);
                            },
                            function () {
                                _hideFlyout($this);
                            }
                        );
                    };
                };

            });
        }
    };
    function _setClassForChildLinks($this) {
        $this.each(function () {
            var $current = jQuery(this);
            if (_findFlyout($current).length > 0) {
                $current.addClass(_getData($this).hasFlyoutClass);
            }
        });
    }

    function _getData($self) {
        return $self.data("settings");
    }

    function _showFlyout($this) {
        _hideAllFlyouts($this);
        if (_getData($this).target === false) {
            var $flyout = _findFlyout($this);
            if ($flyout.length > 0) {
                var $navItem = $flyout.parent('li'),
                    navHeight = $navItem.height(),
                    navPosition = $navItem.position();
                $flyout.css({ 'top': Math.ceil(navHeight), 'left': '0' }).addClass(_getData($this).expandedClass);
                $('head').append('<style>li .gn-flyout:before{left: ' + ( Math.ceil(navPosition.left) + (($this.children('a').width() / 2) - 9)) + 'px !important;} li .gn-flyout:after{left: ' + ( Math.ceil(navPosition.left) + (( $this.children('a').width()) / 2) - 9) + 'px !important;}</style>');
                //alert($this.children('a').width());
            }
            $this.addClass(_getData($this).hoverClass);
        }
        else {
            $this.addClass(_getData($this).hoverClass);
            jQuery(_getData($this).target).addClass(_getData($this).expandedClass);
        }
    }

    function _findFlyout($this) {
        var flyout = _getData($this).flyoutSelector;
        var $flyout = $this.find(flyout);
        if ($flyout.length === 0 && !$this.parent().hasClass(_getData($this).containerClass)) {
            $flyout = $this.parent().find(flyout);
        }
        return $flyout;
    }

    function _hideAllFlyouts($this) {
        var $container = jQuery("." + _getData($this).containerClass);
        jQuery(_getData($this).flyoutSelector, $container).removeClass(_getData($this).expandedClass);
        jQuery("." + _getData($this).hoverClass, $container).removeClass(_getData($this).hoverClass);
    }

    function _hideFlyout($this) {
        if (_getData($this).target === false) {
            var $flyout = _findFlyout($this);
            $flyout.removeClass(_getData($this).expandedClass);
            $this.removeClass(_getData($this).hoverClass);
        }
        else {
            $this.removeClass(_getData($this).hoverClass);
            jQuery(_getData($this).target).removeClass(_getData($this).expandedClass);
        }
        if (_getData($this).afterFlyoutClose !== false) {
            _getData($this).afterFlyoutClose($this);
        }
    }

    $.fn.globalNavigation = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            jQuery.error('Method ' + method + ' does not exist on jQuery.globalNavigation');
        }


    };

})(jQuery);