/// <reference path="../../scripts/jquery/jquery-1.2.6.min.js"/>
(function($)
{
    $.fn.watermark = function(options)
    {
        var defaults =
        {
            watermarkText: '',
            watermarkCss: 'watermarkedText'
        };

        var options = $.extend(defaults, options);

        return this.each(function()
        {
            //Initialize the control
            if ($(this).val().length <= 0 || $(this).val() == options.watermarkText)
            {
                $(this).val(options.watermarkText);
                $(this).addClass(options.watermarkCss);
            }

            //Bind to UI Events
            $(this).bind("focus", function()
            {
                if ($(this).val().length <= 0 || $(this).val() == options.watermarkText)
                {
                    $(this).val('');
                    $(this).removeClass(options.watermarkCss);
                }
            });
            $(this).bind("blur", function()
            {
                if ($(this).val().length <= 0)
                {
                    $(this).val(options.watermarkText);
                    $(this).addClass(options.watermarkCss);
                }
            });
        });
    };
})(jQuery);

/// <reference path="../../scripts/jquery/jquery-1.2.6.min.js"/>
(function($)
{
    $.fn.filteredtextbox = function(options)
    {
        var defaults =
        {
            filter: '[A-Za-z0-9-.\' ]'
        };

        var options = $.extend(defaults, options);

        return this.each(function()
        {
            //Bind to UI Events
            var _that = this;

            $(this).keypress(function(e)
            {
                if (e.charCode == 0 || e.charCode == 8 || e.charCode == 9) //FF (0 to support function keys Home, End, Delete arrows & Safari Windows(8 for delete, 9 for tab)
                {
                    return;
                }

                var charCode = (e.charCode) ? e.charCode : e.keyCode;
                var character = String.fromCharCode(charCode);
                if (!character.match(options.filter))
                {
                    e.preventDefault();
                }
            });

            $(this).bind("paste", function(e)
            {
                window.setTimeout(function()
                {
                    var string = $(_that).val();
                    var newString = '';
                    var globalRegex = new RegExp(options.filter, 'g');
                    var matches = string.match(globalRegex);
                    if (matches)
                    {
                        for (var i = 0; i < matches.length; i++)
                        {
                            newString += matches[i];
                        }
                    }
                    $(_that).val(newString);
                }, 250);

            });
        });
    };
})(jQuery);
