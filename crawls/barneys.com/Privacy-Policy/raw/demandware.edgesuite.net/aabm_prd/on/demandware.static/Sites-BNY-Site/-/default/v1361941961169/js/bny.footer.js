window.BNY	= window.BNY || {};
BNY.footer	= BNY.footer || {};

$.extend(BNY.footer, function() {

	'use strict';

	var methods = {

		validation: {

			init: function() {

				var validatorSettings = {

		            onfocusout: function(element) {
		                if (!this.checkable(element)) {
		                    this.element(element);
		                }
		            }

		        };

				$.validator.messages.required = function($1, ele, $3) {
		            return '';
		        };

				$.each(jQuery('form:not(.suppress)'), function() {
		            $(this).validate(validatorSettings);
		        });

			}

		}

	};

	return {

		initialize: function() {

			methods.validation.init();

		}

	};

}.call(BNY.footer));

$(document).ready(function() {
	'use strict';
	BNY.footer.initialize();
	$.scrollDepth({
		minHeight: 200,
		elements: ['#product-more', '#second-look', '#window-content']
	});
});
