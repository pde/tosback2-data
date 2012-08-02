(function ($) {

    $.fn.emailWithConfirm = function (options) {

        var settings = $.extend({
            'emailWrapper': 'email-with-confirm',
            'emailInput': 'email-address',
            'confirmInput': 'confirm-address',
            'emailInitText': 'Enter Email Address',
            'confirmInitText': 'Confirm Email Address',
            'submitBtn': 'submit-button',
            'errMsgWrapper': 'err-msg'
            // other possibles include emailWrapper width and height when confirm field is added, 
            // <span class="repeat-email-address"></span>
        }, options || {});

        return this.each(function () {
            var $this,
                $thisEmailSignup,
                $errMsgCheck,
                $thisSubmit,
                $wrapperParent,
                offsetParent,
                errmsg,
                isValid,
                isIdentical,
                response,
                currentAddress,
                emailAddressTest,
                confirmAddressTest,
                $emailConfirmPopup,
                $popupClose,

                debug = false,      // useful for conditional console.logs

            // "convert" default settings to jQuery objects
			    $emailWrapper = $('.' + settings.emailWrapper),
			    $emailInput = $emailWrapper.find('.' + settings.emailInput),
			    $confirmInput = $emailWrapper.find('.' + settings.confirmInput),
			    $submitBtn = $emailWrapper.find('.' + settings.submitBtn),
			    $errMsgWrapper = $emailWrapper.find('.' + settings.errMsgWrapper),

                $body = $('body'),
			    $close = $('.close');

            // Check for existence of required fields and insert them if they aren't there
            $thisEmailSignup = $(this);

            // Check for confirm address field
            if (!$thisEmailSignup.find($confirmInput).length > 0) {
                $confirmInput = $('<input />', {
                    'class': settings.confirmInput
                });
                $confirmInput
					.css({ marginTop: '10px' })
					.insertAfter($thisEmailSignup.find($emailInput))
					.hide();
            }

            // Check for close button
            if (!$close.exists()) {
                $close = $('<a/>', {
                    'class': 'close',
                    html: 'X'
                });
                $close
					.css({
					    position: 'absolute',
					    top: '5px',
					    right: '5px',
					    textDecoration: 'none',
					    cursor: 'pointer'
					})
					.insertBefore($thisEmailSignup.find($emailInput))
					.hide();
            }

            $errMsgCheck = $thisEmailSignup.find($errMsgWrapper);
            if (!$errMsgCheck.exists()) {
                $errMsgWrapper = $('<p/>', {
                    className: 'err-msg'
                });
                $errMsgWrapper
					.css({
					    fontWeight: 'bold',
					    color: '#f00'
					})
					.hide()
					.insertAfter($thisEmailSignup.find($submitBtn));
            }
            $confirmInput.val(settings.confirmInitText);
            $emailInput.val(settings.emailInitText);

            $confirmInput.hide();
            $close.hide();
            $errMsgWrapper.hide();

            $confirmInput.val(settings.confirmInitText);
            $emailInput.val(settings.emailInitText);

            
            $emailInput.bind('click', function () {
                $this = $(this);
                $errMsgWrapper.empty();

                // may be multiple sign up forms on page. we need to know which is being acted on 
                $wrapperParent = $this.wrapperParent($this, settings.emailWrapper);
                currentAddress = $this.val();

                // Replace init text with blank (clear field)
                if (currentAddress == settings.emailInitText) {
                    $this.val('');
                }

                // prep wrapper to display confirm address field				
                offsetParent = $wrapperParent.position();
                $wrapperParent
					.css({
					    'position': 'absolute',
					    'top': offsetParent.top,
					    'left': offsetParent.left,
					    'height': '120px',
					    'z-index': '99999',
					    'background-color': '#fff',
					    'border': '1px solid #ccc'
					});

                $wrapperParent.find($confirmInput).show();
                $wrapperParent.find($close).show();
            });

            $confirmInput.bind('focus', function () {
                $this = $(this);

                // Replace init text with blank (clear field)
                currentAddress = $this.val();
                if (currentAddress == settings.confirmInitText) {
                    $this.val('');
                }
            });

            // ********************************************************************
            // SUBMIT TESTS

            function checkKeycode(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    // alert('You pressed a "enter" key in textbox');
                    return true;
                }
                return false;
            }
            // enter key test
            $emailInput.keypress(function (event) {
                enterCheck = checkKeycode(event);
                if (enterCheck) {
                    submitInput($emailInput);
                }
            });

            $confirmInput.keypress(function (event) {
                enterCheck = checkKeycode(event);
                if (enterCheck) {
                    submitInput($confirmInput);
                }
            });

            $submitBtn.click(function (event) {
                event.preventDefault();
                submitInput($submitBtn);
            });

            function submitInput(element) {
                var $element = element;
                $wrapperParent = $element.wrapperParent($(element), settings.emailWrapper);
                $wrapperParent.find($errMsgWrapper)
					.empty()
					.show();
                $wrapperParent.find($emailInput)
					.removeClass('error-border');
                $wrapperParent.find($confirmInput)
					.removeClass('error-border')
                    .empty();

                emailAddressTest = $wrapperParent.find($emailInput).val();
                confirmAddressTest = $wrapperParent.find($confirmInput).val()

                // test for blank
                if (emailAddressTest == '') {
                    errmsg = 'email address field is required';
                    $wrapperParent.find($errMsgWrapper)
						.append(errmsg);
                    $wrapperParent.find($emailInput)
						.addClass('error-border');
                    return;
                }
                if (confirmAddressTest == '') {
                    errmsg = 'confirm address field is required';
                    $wrapperParent.find($errMsgWrapper)
						.append(errmsg);
                    $wrapperParent.find($confirmlInput)
						.addClass('error-border');
                    return;
                }
                // test for address format
                isValid = $emailInput.validInput('isValidEmail', emailAddressTest);
                if (!isValid) {
                    errmsg = 'invalid email address format';
                    $wrapperParent.find($errMsgWrapper)
						.append(errmsg);
                    $wrapperParent.find($emailInput)
						.addClass('error-border');
                    return;
                }
                isValid = $confirmInput.validInput('isValidEmail', confirmAddressTest);
                if (!isValid) {
                    errmsg = 'invalid email address format';
                    $wrapperParent.find($errMsgWrapper)
						.append(errmsg);
                    $wrapperParent.find($confirmInput)
						.addClass('error-border');
                    return;
                }
                // test for identical
                isIdentical = $emailInput.validInput('isIdentical', emailAddressTest, confirmAddressTest);
                if (!isIdentical) {
                    errmsg = 'email addresses do not match';
                    $wrapperParent.find($errMsgWrapper)
						.append(errmsg);
                    $wrapperParent.find($emailInput).addClass('error-border');
                    $wrapperParent.find($confirmInput).addClass('error-border');
                    return;
                }
                // alert('Input validated and ready to be submitted');
                doEmail(emailAddressTest);

            }

            $close.click(function () {
                $wrapperParent = $emailWrapper;
                $wrapperParent.find($errMsgWrapper)
                    .empty();
                $wrapperParent.find($emailInput)
					.removeClass('error-border')
					.val(settings.emailInitText);
                $wrapperParent.find($confirmInput)
					.hide()
                    .val(settings.confirmInitText)
					.removeClass('error-border');
                $wrapperParent.css({
                    'height': '60px',
                    'position': 'relative',
                    'top': 0,
                    'left': 0,
                    'border': 'none',
                    'background-color' : 'none'
                });

                $wrapperParent.find($errMsgWrapper).empty();
                $(this).hide();
            });

            function doEmail(emailAddress) {
                $.ajax({
                    type: 'GET',
                    dataType: 'html',
                    url: '/Checkout/ChameleonEmail.aspx?eml=' + $.trim(emailAddress),
                    error: function () {
                        errmsg = "An error occurred. Unable to reach server";
                        $errMsgWrapper.append(errmsg);
                    }

                }).done(function (msg) {
                    response = msg.split('^');
                    if (response[0] === 'succ') {
                        loadConfirmationPopup(emailAddress);
                    } else {
                        errmsg = response[1];
                        $errMsgWrapper.append(errmsg);
                    }

                });
            }
            function loadConfirmationPopup(emailAddress) {
                if (document.createStyleSheet){
                    document.createStyleSheet('/Styles/email_cat.css');
                }
                else {
                        $("<link/>", {
                        rel: "stylesheet",
                        type: "text/css",
                        href: "/Styles/email_cat.css"
                    }).appendTo("head");
                }
      

                // close email address form then load popup
                $('.close').trigger('click');

                $emailConfirmPopup = $('<div/>', {
                    'class': 'email-confirm-popup'
                });
                var $overlay = $('<div/>', {
                    'class': 'overlay'
                });
                $overlay.css({
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ccc',
                    opacity: '0.4',
                    zIndex: '800'
                });

                $body.prepend($emailConfirmPopup);
                $body.prepend($overlay);

                $body.find($emailConfirmPopup)
					.css({
					    position: 'fixed',
					    top: '5%',
                        left: '20%',
					    //width: '710px',
					    'z-index': '900',
					    // height: '420px',
					    background: 'transparent',
					    border: '1px solid #333'
					})
                    .load('/Catalog/email_confirm_popup.aspx', updatePopup);
            }
            function updatePopup() {
                $('.email-confirm-popup span.display-email').empty().html(emailAddressTest);
                $popupClose = $('.email-confirm-popup a.close');
                $popupClose.on('click', function () {
                    $('.email-confirm-popup').remove();
                    $('.overlay').remove();
                });
            }

        });
    };
})(jQuery);

// Helper Functions
jQuery.fn.exists = function () { return this.length > 0; }
jQuery.fn.wrapperParent = function ($child, $wrapper) {
// find the child's parent no matter how many levels up
   var $parent;
   if ($child.parent().hasClass($wrapper)) {
        $parent = $child.parent();
   } else if ($child.parentsUntil($wrapper).parent().hasClass($wrapper)) {
        $parent = $child.parentsUntil($wrapper).parent();
   } else {
        $parent = 'notfound';
   }
   return $parent;
};

(function ($) {

    var methods = {
        init: function (options) {
            //
        },

        // String Validations
        isNotBlank: function (str) {
            var patternNonBlank = /\S/;
            return String(str).search(patternNonBlank) !== -1;
        },
        isValidEmail: function (str) {
            var patternEmail = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            return String(str).search(patternEmail) !== -1;
            // or
            // var reg = new RegExp(”^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$”);
            // return reg.test(fData);
        },
        isIdentical: function (str1, str2) {
            if (str1 === str2) {
                return true;
            } else {
                return false;
            }
        },

        // Numeric Validations
        isWholeNumber: function (str) {
            var patternWholeNumber = /^\s*d+\s*$/;
            return String(str).search(patternWholeNumber) !== -1;
        },
        isInteger: function (str) {
            var patternInteger = /^\s*(\+|-)?\d+\s*$/;
            return String(str).search(patternInteger) !== -1;
        },
        isDecimal: function (str) {
            var patternDecimal = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
            return String(str).search(patternDecimal) !== -1;
        },
        // Currency Validation
        isCurrency: function (str) {
            var patternCurrency = /^\s*(\+|-)?((\d+(\.\d\d)?)|(\.\d\d))s*$/;
            return String(str).search(patternCurrency) !== -1;
        }

        // Credit Card
    };

    $.fn.validInput = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.validInput');
        }

    };
})(jQuery);

// to call: $(element).validInput(method, string)


// other utilites:
// This returns a string with everything but the digits removed
/* 	function getdigits (s) {
return s.replace (/[^\d]/g, “”);
}
*/
