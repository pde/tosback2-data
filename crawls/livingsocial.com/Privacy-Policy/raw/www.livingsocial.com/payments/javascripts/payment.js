Payment = {
  setLocale: function(locale) {
    Payment._locale = locale;
  },

  getLocale: function() {
    if (!Payment._locale) {
      Payment.setLocale("en");
    }

    var locale = "en"
    if (Payment._locale && Payment._locale.match(/^fr/)) {
      locale = "fr";
    }

    return locale;
  },

  errors: function() {
    var errors = {
      'credit_card_invalid': 'Credit card number is invalid'
    }

    if (Payment.getLocale() == "fr") {
      errors = {
        'credit_card_invalid': "Numéro de la carte n'est pas valide"
      }
    }

    return errors
  },

  creditCardTypeFromNumber: function(cardNumber) {
    // first, sanitize the number by removing all non-digit characters.
    cardNumber = cardNumber.replace(/[^\d]/g,'');
    // now test the number against some regexes to figure out the card type.
    if (cardNumber.match(/^5[1-5]\d{14}$/)) {
      return 'master';
    } else if (cardNumber.match(/^4\d{15}/) || cardNumber.match(/^4\d{12}/)) {
      return 'visa';
    } else if (cardNumber.match(/^3[47]\d{13}/)) {
      return 'american_express';
    } else if (cardNumber.match(/^6011\d{12}/)) {
      return 'discover';
    } else if (cardNumber.match(/^(6304|6706|6771|6709)\d{8}(\d{4}|\d{6,7})?$/)) {
      return 'laser';
    } else if (cardNumber.match(/^(5[06-8]|6\d)\d{10,17}$/)) {
      return 'maestro';
    }
    return 'UNKNOWN';
  },

  checkLuhn: function(input)
  {
    var sum = 0;
    var numdigits = input.length;
    var parity = numdigits % 2;
    for(var i=0; i < numdigits; i++) {
      var digit = parseInt(input.charAt(i))
      if(i % 2 == parity) digit *= 2;
      if(digit > 9) digit -= 9;
      sum += digit;
    }
    return (sum % 10) == 0;
  },

  addCreditCard: function(values, success, error, url, beforeSend, complete) {
    if(url === undefined || url == null) {
      url = '/payments/api/v2/credit_cards';
    }

    cc = values['credit_card[card_number]'];

    // Sanitize the input
    if(cc != undefined) {
      cc = cc.replace(/[^\d]/g,'');
    }

    if(cc != undefined && (cc == "" || Payment.checkLuhn(cc) == false || Payment.creditCardTypeFromNumber(cc) == 'UNKNOWN')) {
      if (error) {
        msg = Payment.errors()['credit_card_invalid']
        error_msg = JSON.stringify({"errors": [msg] })
        error({ responseText: error_msg });
      }
    }
    else {
      $.ajax({
        url: url,
        data: values,
        type: 'POST',
        success: success,
        error: error,
        beforeSend: beforeSend,
        complete: complete
      });
    }
  },

  serializeHash: function(form) {
    var values = $(form).serializeArray();
    hash = {};

    for(idx in values) {
      value = values[idx];
      hash[value.name] = value.value;
    }

    return hash;
  }
}