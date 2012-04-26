/*
 * Toggles default text fields values on focus/blur.
 *
 * Edgar J. Suarez
 * http://github.com/edgarjs/input-default
 * http://codaset.com/edgarjs/input-default
 * MIT License
 *
 */
;(function($) {
    /*
     * @param options Hash
     * @option defaultAttr String
     *
     */
    $.fn.inputDefault = function(options) {
        options = $.extend({
            defaultAttr: 'title'
        }, options || {});
        
        this.each(function() {
            var _field = $(this);
            
            _field.focus(function() {
                var self = $(this);
                var initial = self.attr(options.defaultAttr);
                if(self.val() == initial) {
                    self.val('');
                }
            });

            _field.blur(function() {
                var self = $(this);
                var initial = self.attr(options.defaultAttr);
                if($.trim(self.val()) == '') {
                    self.val(initial);
                }
            });
            
            if(_field.val() == '') {
                _field.val(_field.attr(options.defaultAttr));
            }
        });
    };
})(jQuery);
