;var RR = RR || {};

/**
 * Load slideshow
 */

RR.sldshwSwap = (function ($) {
	var my = {};
	my.before = function (current, next, opts) {
    var mydata = jQuery(next).data(),
        caption = (opts.currSlide + 1) + ' / ' + opts.slideCount;
		$('.sldshw-slide-position').html((opts.currSlide + 1) + ' / ' + opts.slideCount + ': ');
    $('.sldshw-slide-caption').html(mydata.caption);
	};
	my.after = null;
	return my;
})(jQuery);

RR.villaSldshwSwap = (function ($) {
	var my = {};
	my.after = function (curr, next, opts) {
		$('.sldshw-slide-position').html((opts.currSlide + 1) + ' / ' + opts.slideCount + ': ');
	};
	my.before = null;
	return my;
})(jQuery);

RR.loadFeedCycle = function () {
	var prop,
			mydata = this.data(),
			myshow = {
				speed:   'slow',
				timeout: 0,
				next:    '.sldshw-next',
				prev:    '.sldshw-prev',
				pager:  '.js-pager',
				pagerAnchorBuilder: function(idx, slide) {
					// return sel string for existing anchor
					return '.js-pager .media .bd:eq(' + (idx) + ') a';
				}
			};
	for (prop in mydata) {
		if (mydata.hasOwnProperty(prop)) {
			if (prop === 'handler') {
				myshow.before = window.RR[mydata.handler].before;
				myshow.after  = window.RR[mydata.handler].after;
			}
			else {
				myshow[prop] = mydata[prop];
			}
		}
	}
	this.cycle(myshow)
};

RR.loadCycle = function () {
	var prop,
			mydata = this.data(),
			myshow = {
				speed:   'slow',
				timeout: 0,
				next:    '.sldshw-next',
				prev:    '.sldshw-prev'
			};
	for (prop in mydata) {
		if (mydata.hasOwnProperty(prop)) {
			if (prop === 'handler') {
				myshow.before = window.RR[mydata.handler].before;
				myshow.after  = window.RR[mydata.handler].after;
			}
			else {
				myshow[prop] = mydata[prop];
			}
		}
	}
	this.cycle(myshow)
};

/**
 * Opens a pop-up window
 *
 * @param {String} url The url to open
 * @param {String} id The id to assign to the new window
 * @param {Object} opts Key:value pairs of options for the new window
 * @return {Object} Returns the new window object
 */
RR.popWindow = (function () {
  var defaults = {
        toolbar:      0,
        scrollbars:   1,
        location:     0,
        statusbar:    0,
        menubar:      0,
        resizable:    0,
        width:      720,
        height:     640
      };

  return function (url, id, opts) {
    var param,
        params = [];
    for (param in opts) {
      if (opts.hasOwnProperty(param)) {
        defaults[param] = opts[param];
      }
    }
    for (param in defaults) {
      if (defaults.hasOwnProperty(param)) {
        params.push([param, defaults[param]].join('='));
      }
    }
    params = params.join(',');
    return window.open(url, id, params);
  };
})();


/**
 * Checks the value of a given url query parameter. Uses the lazy loading pattern--
 * the first time it's called, it parses the query string, creates an object to
 * hold the key:value pairs, and redefines itself to just return the matching value
 * thereafter.
 *
 * @param {String} param
 * @return {String} The matching value, else undefined
 */
RR.getUrlParam = function (param) {
  /**
   * @private
   */
  var _urlParams = {};

  // anonymous IIFE, keeps the riff-raff out of scope
  // runs once and then it's trash
  (function () {
    var i, splitVal,
      query = window.location.search.substring(1),
      r = /([^&=]+)=?([^&]*)/g,
      params = query.match(r),
      d = function (str) { return decodeURIComponent(str); };

    for (i in params) {
      if (params.hasOwnProperty(i)) {
        splitVal = params[i].split('=');
        _urlParams[d(splitVal[0])] = d(splitVal[1]);
      }
    }
  })();

  RR.getUrlParam = function (param) {
    return _urlParams[param];
  };
  return RR.getUrlParam(param);
};


/**
 * Tests a value to see whether it is a valid email address
 *
 * @param {String} email String to be tested
 */
RR.isValidEmail = function (email) {
  var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;
  return emailFilter.test(email);
};


/**
 * A utilities module to provide some useful functionality
 *
 * @param {Object} global The global object
 * @return {Object} The utils module object
 */
RR.utils = (function (global) {

      // private attribute
  var RR = global.RR,

      // object to be returned
      my = {};

  /**
   * Logs a general message to the console
   *
   * @param {String} msg Outputs a message to the console
   */
  my.log = function (msg) {
    if (global.console) {
      global.console.log("INFO: " + msg);
      return this;
    }
  };

  /**
   * Sends an object to the console for debugging
   *
   * @param {Object} obj Object to be inspected
   */
  my.debug = function (obj) {
    if (global.console) {
      global.console.debug(obj);
      return this;
    }
  };

  /**
   * Creates an array from a function's argument object
   *
   * @param {Object} argObj Argument object to convert to array
   * @return {Array} An array of the arguments
   */
  my.arg2array = function (argObj) {
    return global.Array.prototype.slice.call(argObj);
  };

  /**
   * Strips leading and trailing whitespace from a string
   *
   * @param {String} str String to be trimmed
   * @return {String) The trimmed string
   */
  my.trim = (function (str) {
    var args = [/^\s+|\s+$/g, ""];
    return function (str) {
      return global.String.prototype.replace.apply(str, args);
    };
  })();

  return my;

})(this);

// TODO: go full jquery on this, or something
RR.checkAdvancedRecipeForm = function (e) {
	e.preventDefault();
	var f = this,
	    qString = [],
			kID = [],
			cID = [],
			i, len;

	// text search
	if (f.query.value) { qString.push('query=' + f.query.value); }

	// check keyword checkboxes
	for (i = 0, len = f.kID.length; i < len; i += 1) {
		if (f.kID[i].checked) { kID.push(f.kID[i].value); }
	}
	if (kID.length) { qString.push('kID=' + kID.join(',')); }

	// check contributor checkboxes
	for (i = 0, len = f.cID.length; i < len; i += 1) {
		if (f.cID[i].checked) { cID.push(f.cID[i].value); }
	}
	if (cID.length) { qString.push('cID=' + cID.join(',')); }

	if (qString.length) {
		window.location = '/food_results.php?' + qString.join('&');
	}
};

RR.checkMailFriendForm = function (e) {
	var msg  = null,
	    that = this,
			show = function (msg, success) {
				success = success || false;
				if (success) {
					jQuery('.message', that).addClass('success');
				}
				else {
					jQuery('.message', that).removeClass('success');
				}
				jQuery(".message", that).html(msg);
			};
	e.preventDefault();
	show(null);

	// check for valid email addresses
	jQuery('input.email', that).each(function () {
		if (!RR.isValidEmail(this.value)) {
			msg = 'Please enter valid email addresses in both fields.'
		}
	});
	// check for required fields
	jQuery('input.required', that).each(function () {
		if (this.value === '') {
			msg = 'Please complete all fields.'
		}
	});
	if (msg) {
		show(msg);
		return;
	}

	else {
		jQuery.ajax({
			url: "/scripts/captcha.php?security_code=" + that.security_code.value,
			success: function (data) {
				if (data === 'true') {
					RR.utils.log('it\'s go time');
					jQuery.ajax({
						url: '/lib/email_friend.php',
						type: 'POST',
						data: jQuery("#mailFriendForm").serialize(),
						success: function (data) {
							if (!data.error_code) {
								show("You're email has been sent! <a href=\"javascript:jQuery.modal.close();\">Close this.</a>", true);
							}
							else {
								show(data.error_str);
							}
						}
					});
				}
				else {
					show('The code you entered did not match. Please re-enter code and submit again.');
					jQuery('#captchaImage').attr("src", "/scripts/captcha.php?force=" + Math.round(Math.random() * 100));
				}
			}
		});
	}
};
