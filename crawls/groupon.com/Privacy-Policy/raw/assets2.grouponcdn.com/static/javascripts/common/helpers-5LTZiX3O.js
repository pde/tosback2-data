Groupon.Helpers = {

  // Custom numberToCurrency in lieu of github.com/fnando/i18n-js#toCurrency.
  // The latter rounds decimals improperly with toFixed and won't support adding HTML elements properly.
  numberToCurrency: function(number, options) {
    options = this._optionsWithDefaults(options);

    if (number < 0) {
      options = this._optionsWithNegativeIndicator(number, options);
      number = Math.abs(number);
    }

    number = this._numberWithPrecision(number, options);

    if (options.html_separate_currency) {
      options.format = this._addHtmlToFormat(number, options);
      options.unit = this._addHtmlToUnit(number, options);
    }

    number = this._numberWithPunctuation(number, options);
    return this._formattedNumber(number, options);
  },

  _optionsWithDefaults: function(options) {
    var defaults;

    options = _.extend({}, options);
    if (typeof(options.currency_code) != 'undefined') {
      defaults = I18n.lookup('currency.' + options.currency_code);
    }
    if (typeof(defaults) == 'undefined') {
      var default_currency_code = I18n.lookup('default_currency');
      defaults = I18n.lookup('currency.' + default_currency_code);
    }

    return _.extend({}, defaults, options);
  },

  _optionsWithNegativeIndicator: function(number, options) {
    if (options.negative_format) {
      options.format = options.negative_format;
    } else {
      options.format = '-' + options.format;
    }
    return options;
  },

  _numberWithPrecision: function(number, options) {
    var exponential, expanded_number, rounded_number;

    exponential = Math.pow(10, options.precision);
    expanded_number = (number * exponential);
    rounded_number = Math.round(expanded_number);
    return (rounded_number/exponential).toFixed(options.precision);
  },

  _numberWithPunctuation: function(number, options) {
    var negative = (number < 0);
    var parts = number.toString().split(".");
    var integer = Math.abs(parts[0]).toString();
    var fraction = parts[1];

    integer = this._delimitedInteger(integer, options);

    if (options.html_separate_currency) {
      number = this._addHtmlToNumber(integer, options, fraction);
    } else {
      number = integer;
      if (options.precision > 0) number += options.separator + fraction;
    }

    return number;
  },

  _delimitedInteger: function(integer, options) {
    var delimited_sets = [];
    while (integer.length > 0) {
      var start_index = Math.max(0, (integer.length - 3));
      var delimited_set = integer.substr(start_index, 3);
      delimited_sets.unshift(delimited_set);
      integer = integer.substr(0, integer.length - 3);
    }
    return delimited_sets.join(options.delimiter);
  },

  _formattedNumber: function(number, options) {
    return options.format
      .replace('%u', options.unit)
      .replace('%n', number);
  },

  _addHtmlToFormat: function(number, options) {
    var classes = 'currency_html';
    if (-1 < number && number < 1) classes += ' only_fractional';
    options.format = options.format.replace(/-/, "&minus; ");
    return '<span class="' + classes + '">' + options.format + '</span>';
  },

  _addHtmlToNumber: function(integer, options, fraction) {
    var number = '<span class="integer">' + integer + '</span>';
    if (options.precision > 0) {
      number += '<span class="delimiter">' + options.separator + '</span>';
      number += '<span class="fraction">' + fraction + '</span>';
    }
    return number;
  },

  _addHtmlToUnit: function(number, options) {
    var classes = 'unit';
    if (options.unit.length > 1) classes += ' multi_letter';
    return '<span class="' + classes + '">' + options.unit + '</span>';
  }

};
