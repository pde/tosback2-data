/**
 * jquery.validator settings that are common across the site
 * - this handles a bunch of the core settings for the jquery plugin validator.
 * - we have to override the defaults to fit into our site.
 * - matt good 6/23/11
 */
$.validator.setDefaults({
    submitHandler: function(form) {
      if ($('.subspaybutton').length) {
        $('.subspaybutton').attr('disabled',true);
      }
      form.submit();
    },
    onfocusout: function(element) {
        if (this.objectLength(this.submitted) > 0 ) {
            if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                this.element(element);
            }
        }
    },
    highlight: function( element, errorClass, validClass ) {
        var ele = $(element);
        var elementType = element.type;
        switch (elementType) {
            case 'checkbox':
            case 'radio':
                validator.findByName(element.name).parent().addClass(errorClass).removeClass(validClass);
                break;

            default:
                if (ele.parent('div').hasClass('selector')) {
                    ele.parent('div').addClass(errorClass).removeClass(validClass);
                    ele.prev('span').addClass(errorClass).removeClass(validClass);
                } else {
                    ele.addClass(errorClass).removeClass(validClass);
                }
                break;
        }
    },
    unhighlight: function( element, errorClass, validClass ) {
        var ele = $(element);
        var elementType = element.type;
        switch (elementType) {
            case 'checkbox':
            case 'radio':
                validator.findByName(element.name).parent().removeClass(errorClass).addClass(validClass);
                break;
            default:
                if (ele.parent('div').hasClass('selector')) {
                    ele.parent('div').removeClass(errorClass).addClass(validClass);
                    ele.prev('span').removeClass(errorClass).addClass(validClass);
                } else {
                    ele.removeClass(errorClass).addClass(validClass);
                }
                break;
        }
    },
    errorPlacement: function(error, element) {
        // if dropdowns have a parent div we put it outside the div so we can see the error
        if (element.parent('div').hasClass('selector')) {
            if ( element.hasClass('expiredate') ){
                error.insertAfter($('div#expiredate_group'));
            } else {
                error.insertAfter(element.parent('div'));
            }
        } else if (element.hasClass('hasDatepicker')) {
            error.insertAfter(element.next('img'));
        } else if (element.hasClass('group_email_url')) {
            error.insertAfter($("#contactEmailUrl"));
        } else if (element.hasClass('multilocations')) {
            error.insertAfter(element.next());
        } else if (element.is("input[type='checkbox']")) {
            if ( $('#checkbox_error_message').length > 0 ) {
                $('#checkbox_error_message').html(error);
            } else {
                error.insertAfter(element);
            }
        } else if (element.is("input[type='radio']")) {
            var name = element.attr('name');
            if ( $('#radio_error_message.' + name ).length > 0 ) {
                $('#radio_error_message.' + name ).html(error);
            } else {
                error.insertBefore($('label[for="' + element.context.id + '"]'));
            }
        } else {
            error.insertAfter(element);
        }
    },
    showErrors: function(errorMap, errorList) {
        var errors = validator.numberOfInvalids();
        this.defaultShowErrors();
        if (errors) {
            var message = errors == 1
                ? 'Please correct the 1 error, indicated below.'
                : 'Please correct the ' + errors + ' errors, indicated below.';
            $("#form_validation_msg").html(message);
            $("#form_validation_msg").show();
        } else {
            $("#form_validation_msg").hide();
        }
        //if iframe, resize the iframe after errors
        if ( $('#modalFrame').length && ( window.location !== top.location.href) )
        {
            var height = $('#modalFrame').height() + 10;
            if ( $('ul.modal-tabs').length ) {
                height += $('ul.modal-tabs').height();
            }
            var width = $('#modalFrame').width();
            $('#modal-iframe', window.parent.document).attr({'style': 'height:auto; min-height:'+height+'px; width:'+width+'px;'});
        }
        if ( $('#premiumFrame').length && ( window.location !== top.location.href) )
        {
            var height = $('#premiumFrame').height() + 23;
            var width = $('#premiumFrame').width();
            $('#premium-iframe', window.parent.document).attr({'style': 'height:auto; min-height:'+height+'px; width:'+width+'px;'});
        }
    }
});

// override some defaults for error messages
$.validator.messages.email = "Please enter a valid e-mail address.";
$.validator.messages.url = "Please enter a valid web address.";

// validate postal code
jQuery.validator.addMethod("postalcode", function(postalcode, element, params) {
    switch (params)
    {
        case "88": // us
            postalRegex = /^(\d{5})(?:[-\s]{0,1}(\d{4})?)$/;
            postalMessage = "Please enter a valid US zipcode.";
            break;
        case "62": // ca
            postalRegex = /^([ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/;
            postalMessage = "Please enter a valid Canadian postal code.";
            break;
        default:
            postalRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
            postalMessage = "Please enter a valid postal/zip code.";
            break;
    }
    $.validator.messages.postalcode = postalMessage;
    return this.optional(element) || postalcode.match(postalRegex);
}, "Please specify a valid postal/zip code");

jQuery.validator.addMethod("validusername", function(username, element, params){
    if (params) {
        $.validator.messages.validusername = "This user name is invalid";
        return this.optional(element)  || username.match(/^[a-z0-9_]{5,20}$/);
    }
});

jQuery.validator.addMethod("nolinebreak", function(value, element) {
    return this.optional(element) || /^[^\r\n]+$/i.test(value);
}, "We do not accept linebreaks for this field");

jQuery.validator.addMethod('CCExp', function(value, element, params) {
    var minMonth = new Date().getMonth() + 1;
    var minYear = new Date().getFullYear();
    var month = parseInt($(params.month).val(), 10);
    var year = parseInt($(params.year).val(), 10);
    return (year > minYear || (year === minYear && month >= minMonth));
}, 'Expiration date is invalid.');

jQuery.validator.addMethod('CCHolderName', function(value, element) {
    $.validator.messages.CCHolderName = "Cardholder name can not contain numbers";
    return this.optional(element) || /^[^0-9]+$/i.test(jQuery.trim(value));
}, "Cardholder name can not contain numbers");

jQuery.validator.addMethod('cleanInputBeforeMethod', function(value, element, config) {

    params = '';        
    if ( config.params ) {
        params = config.params;
    }

    if ( config.method && jQuery.validator.methods[config.method] ) {
        // check method to see if it is valid or not
        result = (this.optional(element) || jQuery.validator.methods[config.method].call(this, jQuery.trim(value), element, params));
        $.validator.messages.cleanInputBeforeMethod = $.validator.messages[config.method];
        return result;
    } else { 
        // this is a bad failure.
        $.validator.messages.cleanInputBeforeMethod = "Validation Failure";
        return false;
    }
});
