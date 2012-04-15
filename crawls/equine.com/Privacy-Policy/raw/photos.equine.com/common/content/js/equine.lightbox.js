;(function($)
{
    $.fn.equinLightBox = function(opts)
    {
        return this.each(function()
        {
            show(this, opts);
        });
    };

    $.fn.hideEquineLightBox = function(opts)
    {
        return this.each(function()
        {
            hide(this, opts);
        });
    };

    $.fn._lightboxDefaults =
    {
        ajax: {},
        // callback method invoked when displaying the menu
        onShow: null,
        // callback method invoked when hiding the menu
        onHide: null,
        // callback method invoked when a login was required and successful
        onLoginSuccess: null
    };

    var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent);

    function show(el, opts)
    {
        opts = $.extend({}, $.fn._lightboxDefaults, opts || {});
        var ajax = $.extend({}, $.fn._lightboxDefaults.ajax, opts.ajax || {});
        var msg = opts && opts.message !== undefined ? opts.message : undefined;
        var slideDown = opts && opts.slideDown !== undefined ? opts.slideDown : undefined;

        if (ajax && ajax.url && ajax.url !== undefined)
        {
            ajax.success = function(data)
            {
                $(el).html(data);
            }
            $.ajax(ajax);
        }
        else if (msg && msg !== undefined)
        {
            $(el).html(msg);
        }

        if (slideDown !== undefined)
        {
            $(el).slideDown(slideDown);
        }
        else
        {
            $(el).show();
        }

        if (typeof opts.onShow == 'function')
            opts.onShow(el, opts);
    }

    function hide(el, opts)
    {
        if (slideUp !== undefined)
        {
            $(el).slideUp(slideUp);
        }
        else
        {
            $(el).hide();
        }

        if (typeof opts.onHide == 'function')
            opts.onHide(el, opts);
    }

})(jQuery);