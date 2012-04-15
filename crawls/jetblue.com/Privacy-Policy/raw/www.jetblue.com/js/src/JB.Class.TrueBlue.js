/**
 * TrueBlue Base Class.
 * @function JB.Class.TrueBlue
 * @param {String} container The id or class selector of the input element.
 * @require
 */

JB.Class.TrueBlue = JB.Class.extend({
    /**
    * Library dependencies
    * @type object
    */
    require: {
    },
    /**
    * @constructor
    */
    init: function (container, options) {
        /**
        * Options
        */
        this.options = {
        };
        $.extend(this.options, options || {});
        this.container = $(container);
        this._super();
    },
    /** @ignore */
    _build: function () {

        var self = this;

        this.trueblue = this.container;
        this.trueblue.form = this.trueblue.find('#true-blue-form');
        this.trueblue.dropdown = this.trueblue.find('#trueblue-dropdown');
        this.againBtn = this.trueblue.find('.again-btn');
        this.closeBtn = this.trueblue.find('.trueblue-switch .close-btn');
        this.signoutBtn = this.trueblue.find('.trueblue-switch .signout');
        this.cancelBtn = this.trueblue.find('#confirmation-inner .cancel-btn');

        // bind againBtn click handler
        this.againBtn.bind('click', $.proxy(this.closeModal, this));
        // bind closeBtn click handler
        this.closeBtn.bind('click', $.proxy(this.closeModal, this));
        // bind signoutBtn click handler
        this.signoutBtn.bind('click', function () { $('#trueblue #main-inner').fadeOut('fast', function () { $('#trueblue #confirmation-inner').fadeIn('fast'); }); });
        // bind signoutBtn click handler
        this.cancelBtn.bind('click', function () { $('#trueblue #confirmation-inner').fadeOut('fast', function () { $('#trueblue #main-inner').fadeIn('fast'); }); });

        // beautify the trueblue dropdown
        this.trueblue.dropdown.beautifier();

        // bind submit handler with validation
        this.trueblue.form.bind('submit', function (e) {
            e.preventDefault();
            var response = $(this).validator();

            if (response) {
                var errorMessage = '';
                for (i = 0; i < response.length; i++) {
                    errorMessage += '<p>' + response[i] + '</p>';
                }
                self.trueblue.addClass('error').find('.error-message').html(errorMessage);
            } else {
                return true;
            }
        });


        // call fieldFlip()
        this.fieldFlip();
    },
    closeModal: function (e) {
        this.trueblue.removeClass('error system');
    },
    fieldFlip: function () {
        // hide/show on load
        jQuery('#password-place').addClass('showPassPlaceholder');

        // Find And Replace
        jQuery('#password-place').bind('focus', function (e) {
            jQuery(this).removeClass('showPassPlaceholder');
            jQuery('#password_field').focus();
        });

        jQuery('#password_field').bind('focus', function (e) {
            // alert('yo');
            jQuery('#password-place').removeClass('showPassPlaceholder');
        });

        // Find And Replace	In Reverse
        jQuery('#password_field').bind('blur', function (e) {
            if (jQuery(this).val() === '') {
                jQuery('#password-place').addClass('showPassPlaceholder');
            }
        });
    }
});










