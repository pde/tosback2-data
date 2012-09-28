/**
 * when the DOM is ready to be manipulated:
 * DESCRIPTION: activate the placeholder HTML5 Functionality on depricated or non-conform browsers (mostly IE's)
 * NOTICE: In order for this to work, the input and the label masut be inside a fieldset class="inputCtn"
 */
$j(document).ready(function() {

 $j('.inputCtn input[type=password]').listenForChange();
   $j('.inputCtn').click(function() {
        $j(this).find('input').focus();
        return true;
    });

    // liste des input de type text
    var inputText = $j('.inputCtn input[type=text], .inputCtn input[type=password]');


    /**
     * update visual part of the input and its placeholder
     */
    function _render(obj) {
        if (obj.attr('value') == '') {
            obj.css('background', 'none');
        }
        else {
            obj.css('background', '#fff');
        }
    }


    inputText.each(function(index) {
        // todo : html5 placeholder
        // $(this).attr('placeholder', labelText);

        _render($j(this));

        // lorsque la valeur du champ change
        $j(this).keyup(function() {
            _render($j(this));
        });

        // lorsqu'on sort d'un champ
        $j(this).focusout(function() {
            _render($j(this));
        });
        
		$j(this).change(function() {
            _render($j(this));
        });
		
    });
	
});
/**
 * autofill listener
 * DESCRIPTION: detects the browser autofill action and make it look like a change js event 
 */


(function($) {
    $.fn.listenForChange = function(options) {
        settings = $.extend({
            interval: 200 // in microseconds
        }, options);

        var jquery_object = this;
        var current_focus = null;

        jquery_object.filter(":input").add(":input", jquery_object).focus( function() {
            current_focus = this;
        }).blur( function() {
            current_focus = null;
        });

        setInterval(function() {
            // allow
            jquery_object.filter(":input").add(":input", jquery_object).each(function() {
                // set data cache on element to input value if not yet set
                if ($(this).data('change_listener') == undefined) {
                    $(this).data('change_listener', $(this).val());
                    return;
                }
                // return if the value matches the cache
                if ($(this).data('change_listener') == $(this).val()) {
                    return;
                }
                // ignore if element is in focus (since change event will fire on blur)
                if (this == current_focus) {
                    return;
                }
                // if we make it here, manually fire the change event and set the new value
                $(this).trigger('change');
                $(this).data('change_listener', $(this).val());
            });
        }, settings.interval);
        return this;
    };
})(jQuery);
