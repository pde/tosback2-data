/*!
 * jQuery Checkbox Plugin
 * version: 1.0 (17.03.2012)
 * @requires jQuery v1.3.2 or later
 *
 */
;(function($) {

    $.fn.setChecked = function(valueForChecked) {
       this[0].checked = valueForChecked;
    };

    $.fn.setDisabled = function(valueForDisabled) {
        if (valueForDisabled){
            this.attr('disabled', true);
        }
        else
        {
            this.removeAttr('disabled');
        }
    };

    $.fn.isChecked = function() {
        return this[0].checked;
    };

})(jQuery);
