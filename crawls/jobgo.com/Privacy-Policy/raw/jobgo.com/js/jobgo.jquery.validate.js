/**
 * This is overridden to include all elements with the same name.
 * The default implementation only selects the first element, meaning that from:
 * a[],a[],a[] only the first is selected. Others are not considered when submitting the form.
 *
 * @authon antero.lukkonen
 */
$.validator.prototype.elements = function() {
        var validator = this;

        // select all valid inputs inside the form (no submit or reset buttons)
        // workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
        return $([]).add(this.currentForm.elements)
        .filter(":input")
        .not(":submit, :reset, :image, [disabled]")
        .not( this.settings.ignore )
        .filter(function() {
                !this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

                // select only the first element for each name, and only those with rules specified
                if (!validator.objectLength($(this).rules()) )
                        return false;
                return true;
        });
}

jQuery.validator.addMethod('dateFormat', function(value, element, format){
    if (!value || value=='') return true;
    format = format.replace('mm', 'MM');
    if (null == Date.parseExact(value, format)){
        return false;
    };
    return true;
}, jQuery.format('Correct date format: {0}'));

jQuery.validator.addMethod('valueNotAllowed', function(value, element, notallowed) {
    if (!value || value=='') return true;
    if (value == notallowed) {
        return false;
    }
    return true;
}, $.validator.messages.required);