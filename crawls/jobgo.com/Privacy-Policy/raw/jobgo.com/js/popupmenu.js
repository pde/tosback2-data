(function($)
{
    $.fn.popupmenu = function(options)
    {
        var o = {
            speed: 'fast',
            idSuffix: '-popupMenu',
            left: -10,
            top: 0
        };
        $.extend(o, options);

        var documentObj = $(document);

        return this.each(function()
        {

            var self = $(this);
            var popupMenuId = self.attr('id') + o.idSuffix;
            var popupMenuClass = self.attr('class');
            var popupMenu = $('#' + popupMenuId);

            var showMenu = function()
            {
                var coords = self.offset();



                if(popupMenuId == 'statusItem-popupMenu')
                {
                     popupMenu.offset({top: coords.top + o.top,  left: coords.left + o.left}).show();
                }
                else
                {
                    popupMenu.offset({top: self.outerHeight() + coords.top, left:coords.left}).show();
                }


            }

            self.bind('showMenu', showMenu);

            var hideMenu = function()
            {
                popupMenu.fadeOut(o.speed);

            };
            self.bind('hideMenu', hideMenu);
            self.click(function()
            {
                $(this).trigger('showMenu');
            });

            $('div.popupmenu').mouseleave(hideMenu);

            documentObj.keydown(function(e)
            {
                switch (e.keyCode)
                {
                    case 27: // up
                        hideMenu();
                        break;
                }
            });

            documentObj.click(function (event) {
                var containerId = self.attr('id');

                if(
                       !$(event.target).parents('#' + containerId).length
                    && !$(event.target).parents('#' + containerId + '-popupMenu').length
                    && $(event.target).attr('id') != $('#' + containerId + '-popupMenu').attr('id')
                    && $(event.target).attr('id') != $('#' + containerId).attr('id')
                ) {
                    hideMenu();
                }
            });
        });
    };
})(jQuery);