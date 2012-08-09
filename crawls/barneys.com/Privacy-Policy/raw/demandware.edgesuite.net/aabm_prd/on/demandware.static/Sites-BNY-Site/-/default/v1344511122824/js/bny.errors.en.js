window.BNY = window.BNY || {};
BNY.errors = BNY.errors || {};

$.extend(BNY.errors, function() {

	var self = this; // BNY.Errors

	self.output = {

		common: {
			REQUIRED: 'This is a required field.',
			NOSPACES: 'No spaces allowed',
			NOSPECIALCHARS: 'No special characters',
			NODIGITS: 'No numeric characters',
			ALLOWHYPHEN: 'Only letters and hyphens',
			PHONE: 'Only numbers, spaces and hyphens',
			ALLOWEXCEPT: 'Enter a valid value',
			FIELDSMISMATCH: 'Value does not match conditions of another field',
			MULTIPLEEMAILS: 'Enter multiple valid emails separated by commas',
			EMAIL: 'Your email address is incomplete - please provide a valid e-mail address.'
		},

		account: {

			loginDialog: {

				username: {
					REQUIRED: 'Username cannot be blank.',
					EMAIL: 'Your email address is incomplete - please provide a valid e-mail address.'
				},

				password: {
					REQUIRED: 'Password cannot be blank.'
				}

			},

			forgotPassword: {

				dwfrm_requestpassword_email: {
					REQUIRED: 'Your email address is incomplete - please provide a valid e-mail address.',
					EMAIL: 'Please provide a valid e-mail address.'
				}

			}

		},

		checkout: {

			shipping: {

				dwfrm_singleshipping_shippingAddress_addressFields_firstName: {
					REQUIRED: 'Please provide a first name.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_lastName: {
					REQUIRED: 'Please provide a last name.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_country: {
					REQUIRED: 'To ensure prompt delivery, please select a country.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_address1: {
					REQUIRED: 'To ensure prompt delivery, please enter your street address.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_city: {
					REQUIRED: 'To ensure prompt delivery, please enter your city.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_states_state: {
					REQUIRED: 'To ensure prompt delivery, please enter your state.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_zip: {
					REQUIRED: 'To ensure prompt delivery, please enter your zip code.'
				},
				dwfrm_singleshipping_shippingAddress_addressFields_phone: {
					REQUIRED: 'Please provide a phone number.',
					PHONE: 'Please provide a valid phone number.'
				},
				dwfrm_singleshipping_shippingAddress_email_emailAddress: {
					REQUIRED: 'Your email address is incomplete - please provide a valid e-mail address.',
					EMAIL: 'Please provide a valid e-mail address.'
				}

			},

			billing: {

				dwfrm_billing_billingAddress_addressFields_firstName: {
					REQUIRED: 'Please provide a first name.'
				},
				dwfrm_billing_billingAddress_addressFields_lastName: {
					REQUIRED: 'Please provide a last name.'
				},
				dwfrm_billing_billingAddress_addressFields_country: {
					REQUIRED: 'Please enter the country of your billing address.'
				},
				dwfrm_billing_billingAddress_addressFields_address1: {
					REQUIRED: 'Please enter your billing street address.'
				},
				dwfrm_billing_billingAddress_addressFields_city: {
					REQUIRED: 'Please enter the city of your billing address.'
				},
				dwfrm_billing_billingAddress_addressFields_states_state: {
					REQUIRED: 'Please enter the state of your billing address.'
				},
				dwfrm_billing_billingAddress_addressFields_zip: {
					REQUIRED: 'Please enter the zip code of your billing address.'
				},
				dwfrm_billing_billingAddress_addressFields_phone: {
					REQUIRED: 'Please provide a phone number.',
					PHONE: 'Please provide a valid phone number.'
				}

			},

			payment: {
				
				dwfrm_billing_paymentMethods_creditCard_owner: {
					REQUIRED: 'Please enter the name as it appears on the credit card.'
				},
				dwfrm_billing_paymentMethods_creditCard_number: {
					REQUIRED: 'Please enter your credit card number.',
					CREDIT_CARD: 'Please enter a valid credit card number.'
				},
				dwfrm_billing_paymentMethods_creditCard_month: {
					CC_EXPIRE_DATE: 'The expiration date you have entered is expired.'
				},
				dwfrm_billing_paymentMethods_creditCard_cvn: {
					REQUIRED: "Please enter your credit card's CVN."
				}

			}

		}

	};

	// Return the BNY.errors Object
	return self;

}.call(BNY.errors));
