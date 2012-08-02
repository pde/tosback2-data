/* [global.js] Defines platform-wide functionality. */

// The following line is paired with a line at the bottom of the file
// to prevent redundant, and consequentially problematic, code execution.
/* ^ */ if (typeof self.svuFile == 'undefined') { // Verifies an (arbitrary) object, instantiated by this very code.

$(self.document).ready(
  function () {

    var $searchForm = $('form[id*="search"]:first'); // Assumes a particular mark-up structure.
    if ($searchForm instanceof jQuery) {
      // Validates search criteria prior to submitting a query.
      $searchForm.bind('submit',
        function(eventData) {
          var $searchInput = $searchForm.find('input:first'); // Assumes a particular mark-up structure.
          if ($searchInput instanceof jQuery) {
            var searchCriteria = $.trim($searchInput.val());
            // Can't be the Empty String nor the default field value.
            if (searchCriteria === '' || /search/i.test(searchCriteria)) {
              alert('Please provide search criteria.');
              return false;
            }
          }
          return true;
        }
      );
    }

    // Prevents form elements with a class value that includes specific text from submitting more than once.
    // Note: If validation is necessary, call #isFormUnlocked within validation code, instead of binding in this way.
    $('form[class]').filter(
      function (index) {
        var classNameKeyword = 'submit'; // Currently identifies "preventMultipleSubmit", "submitOnce", etc.
        return new RegExp(classNameKeyword.makePatternSafe(), 'i').test(this.className);
      }
    ).bind('submit',
      function (eventData) {
        return isFormUnlocked(this);
      }
    );

    $(window).bind('resize', adjustOverlayPos);

    setCarouselToolTips();

    setCustomToolTips();

    setDropDownMenus();

    try {initShoppingListWidget();} catch (errorData) {} // Defined in shopping-list-ajax.js.

    try {setAddCouponOverlay();} catch (errorData) {} // Defined in shopping-list-ajax.js.

    try {when_jquery();} catch (errorData) {} // Defined in svuWidget-find-store.js.

    try {
      // Dynamically load Fancybox only if it's not already loaded
      if (!$("link[href='/common/fancybox/jquery.fancybox-1.3.1.css']").length) {
        svuFile.load('/common/fancybox/jquery.fancybox-1.3.1.css');
      }
      if ($.fancybox == undefined) {
        svuFile.load('/common/fancybox/jquery.fancybox-1.3.1.pack.js');
      }
      svuFile.load('/common/js/jquery.cookie.js');
      svuFile.load('/common/js/svuMailingListSubscriber.js', setHeaderEmailSend);

      // Dynamically loads files that are utilized site-wide.
      //svuFile.loadMultiple([
      //  '/common/js/jquery.cookie.js',
      //  '/common/js/svuMailingListSubscriber.js'
      //]);
    }
    catch (errorData) {
    }
  }
);

// Disallows the submittal of forms that have already been submitted.
// Note: Should be invoked when a form submits, in order to set the flag that can prevent redundant submittals.
function isFormUnlocked(formData) { // Accepts HTMLElement, jQuery, or (jQuery selector) String data.
  var status = false;
  var $form = getJqueryCollection(formData);
  if (isJqueryData($form)) {
    var formElement = $form.get(0);
    var formDataName = 'submitStatus'; // Arbitrary name for the submittal flag stored on the form element.
    if ($.data(formElement, formDataName) !== true) { // jQuery permits Boolean "extra" data.
      // Processes all buttons, except reset ones, within a form.
      $('button, input[type="button"], input[type="image"], input[type="submit"]', formElement).each(
        function (index, element) {
          $(element).unbind('click').bind('click',
            function (eventData) {
              eventData.preventDefault();
              eventData.stopImmediatePropagation();
              log('[isFormUnlocked] The form can\'t be submitted.');
              $(this).attr('disabled', 'disabled');
            }
          )
        }
      );
      status = true;
      $.data(formElement, formDataName, true); // Flags the form as already submitted.
    }
  }
  return status;
}

function unlockForm(formData) { // Accepts HTMLElement, jQuery, or (jQuery selector) String data.
  var $form = getJqueryCollection(formData);
  if (isJqueryData($form)) {
    // log('[unlockForm] The form can be submitted.');
    $form = $form.first(); // Merely a safety precaution.
    $form.removeData();
  }
}

function doesFormValidate(formData) { // Accepts HTMLElement, jQuery, or (jQuery selector) String data.
  var status = false; // Disallows form submittal.
  var $form = getJqueryCollection(formData);
  if (isJqueryData($form)) {
    var $messageElement = $('#error-message-container');
    if (isJqueryData($messageElement)) {
      $form = $form.first(); // Merely a safety precaution.
      if (isUsableData(self.aErrors) && self.aErrors.length > 0) { // Assumes #aErrors is an array.
        var message = '<h4>Please correct the following:</h4><ul><li>' + self.aErrors.join('</li><li>') + '</li></ul>';
        $messageElement.removeClass('displaynone').html(message);
        if (isUsableData(self.aBadFields)) { // Assumes #aBadFields is an array.
          $form.find('[aria-invalid]').attr('aria-invalid', 'false');
          for (var index = 0, totalFields = self.aBadFields.length; index < totalFields; ++index) {
            $('#' + self.aBadFields[index]).attr('aria-invalid', 'true');
          }
        }
        $('html, body').animate({scrollTop: 0}, 250);
        unlockForm($form);
      } else {
        $messageElement.addClass('displaynone').children().remove();
        status = isFormUnlocked($form); // Likely allows form submittal.
      }
    }
  }
  return status;
}

function addErrorMessage(fieldData, errorMessage) {
  if (isUsableData(self.aBadFields) && isUsableData(self.aErrors)) {
    if (isUsableString(errorMessage)) {
      var isRequestValid = false;
      if ($.isArray(fieldData)) {
        self.aBadFields.concat(fieldData);
        isRequestValid = true;
      } else {
        if (isUsableString(fieldData)) {
          self.aBadFields.push(fieldData);
          isRequestValid = true;
        }
      }
      if (isRequestValid) {
        self.aErrors.push(errorMessage);
      }
    }
  }
}

// Outputs (troubleshooting) messages to the browser console and/or an alert dialog.
function log(message, resortToAlert) { // [String] message
  if (isUsableString(message)) try {console.log(message);} finally {if (resortToAlert === true) alert(message);}
}

// Munges text to make it safe for use within Regular Expression patterns.
// Prefixes a backslash (reverse solidus) to all special-purpose "pattern" characters.
String.prototype.makePatternSafe = function () {
  var escapedSpecialCharacters = '$()*+-./?[\\]^{|}'.split('').join('\\');
  return this.replace(new RegExp('([' + escapedSpecialCharacters + '])', 'g'), '\\$1');
};

// Determines whether text includes (potentially) detrimental characters.
// Flags text with characters that are:
// - explicitly disapproved (within the function definition).
// - outside of an approved character set -- ASCII range 32 to 126.
String.prototype.isHazardous = function () {
  // Specifies characters to exclude from the approved character set.
  var disapprovedCharacters = '<>[]{|}';
  // Blesses specified characters, exempting them from evaluation by removing them.
  var modifiedText = this.replace(/[\u000A\u000D]/g, ''); // LF and CR -- ASCII values 10 and 13
  return new RegExp('[' + disapprovedCharacters.makePatternSafe() + ']|[^\\u0020-\\u007E]').test(modifiedText);
};

/*
String.prototype.isHazardous = function() {
  var result = false;

  for (var i = 0, n = this.length; i < n; i++) {
    if ((this.charCodeAt(i) != 10 && this.charCodeAt(i) != 13 &&
        this.charCodeAt(i) < 32) || this.charCodeAt(i) > 126) {
      result = true;
      break;
    }
  }

  result = /[<>|{}\[\]]/.test(this); // Temporary additional exclusions

  return result;
};
*/

String.prototype.isZipCode = function() {
  // U.S. postal codes.
  return /^\d{5}(\-\d{4})?$/.test(this);
};

String.prototype.isPhoneNumber = function () {
  // U.S. phone numbers.
  // Must be 10 digits, and can't have an invalid area code or prefix.
  return /^\d{10}$/.test(this) && !/^((800|866|877|888|900|976|0|1)|(.{3}555))/.test(this);
};

/*
String.prototype.isPhoneNumber = function() {
  if (!/^\d{10}$/.test(this)) return false;
  if (/^(800|866|877|888|900|976|0|1)/.test(this)) return false;
  if (/^\d{3}555/.test(this)) return false;
  return true;
};
*/

/*String.prototype.isEmailAddress = function () {
  var token = '[0-9]*[a-z][\\-\\w]*'; // 64 valid characters (assuming no case sensitivity).
  // Local and Domain parts use the same simple and restricted pattern, calculated to validate most addresses.
  // Note: Additional address permutations are theoretically possible, though not very common.
  var part = token + '(\\.' + token + ')*';
  // These TLD categories are validated: "country-code", "generic", "generic-restricted", "infrastructure", and "sponsored".
  // Only Latin alphabet TLDs are considered. Source: http://www.iana.org/domains/root/db/.
  // Warning: Any two-letter TLD can pass validation without actually being valid, using this pattern.
  var tld = '([a-z]{2}|(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx))';
  return new RegExp('^' + part + '@' + part + '\\.' + tld + '$', 'i').test(this);
};*/


String.prototype.isEmailAddress = function() {
  // Notes:
  // - This reg ex validates the same as the back-end Struts
  // - For some reason the original sytax below performs VERY poorly; to the point
  //   of throwing a slow script warning
  //
  //   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|ws|us|tv|cc|aero|name|coop|info|pro|museum|jobs|travel|nato))$/.test(this);
  //
  // - This performs MUCH better:
  // var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|ws|us|tv|cc|aero|name|coop|info|pro|museum|jobs|travel|nato))$/;
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|ws|us|tv|cc|aero|name|coop|info|pro|museum|jobs|travel|nato))$/i;

  return re.test(this);
};


String.prototype.isDate = function() {
  // Supports the MM/DD/YYYY format only
  var result = false;
  var re = /^(\d{1,2})(\/)(\d{1,2})\2(\d{4})$/;
  var dateParts = this.match(re);

  if (dateParts != null) {
    var month = dateParts[1];
    var day = dateParts[3];
    var year = dateParts[4];

    if (month >= 1 && month <= 12) {
      if (day >= 1 && day <= 31) {
        if (((month == 4 || month == 6 || month == 9 || month == 11) && day <= 30) ||
            !(month == 4 || month == 6 || month == 9 || month == 11)) {
          if (month == 2) {
            var isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day <= 28 || (day <= 29 && isLeapYear)) {
              result = true;
            }
          }
          else {
            result = true;
          }
        }
      }
    }
  }

  return result;
}

String.prototype.isInteger = function(signed) {
  var re = (signed) ? /^[-+]?\d+$/ : /^\d+$/;

  return re.test(this);
}

String.prototype.isFloat = function(signed) {
  var re = (signed) ? /^[-+]?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;

  return re.test(this);
}

String.prototype.isCurrency = function(allowCommas) {
  var re = (allowCommas) ? /^\$?[1-9][0-9]{0,2}(,?[0-9]{3})*(\.[0-9]{2})?$/ : /^\$?[1-9][0-9]{0,2}([0-9]{3})*(\.[0-9]{2})?$/;

  return re.test(this);
}

String.prototype.replaceHtmlEntites = function() {
  var translateRegEx = /(&nbsp;|&amp;|&quot;|&lt;|&gt;| -- )/g;
  var translate = {"&nbsp;" : "<br/>",
                   "&#160;" : "<br/>",
                   "&amp;" : "&",
                   "&quot;" : "\"",
                   "&lt;" : "<",
                   "&gt;" : ">",
                   " -- " : "<br/><br/>"};

  return (this.replace(translateRegEx, function(match, entity) {
    return translate[entity];
  }));
}

function toggleDisable(containerJqSel, disabled) {
  if (disabled) {
    $(containerJqSel + " :input").attr("disabled", "disabled");
  }
  else {
    $(containerJqSel + " :input").removeAttr("disabled");
  }
}

function trimAllTextFields() {
  $('input, textarea').each(
    function (index, element) {
      var $element = $(element);
      $element.val($.trim($element.val()));
    }
  );
}

function setCustomToolTips() {

  $(".help-tool-tip").each(function() {

    // This allows us to offset the tool tip as needed. Just add a left and/or
    // top CSS property to #help-tool-tip. Negatives work too.
    var leftCssOffset = $("#help-tool-tip").css("left").match(/-?\d+/);
    var topCssOffset = $("#help-tool-tip").css("top").match(/-?\d+/);

    $(this).attr("tabindex", "-1");

    $(this).hover(function(e) {
      $(this).attr("alt", $(this).attr("alt").replaceHtmlEntites());
      var helpText = $(this).attr("alt").replaceHtmlEntites();

      $("#help-tool-tip-content").html(helpText);
      $(this).removeAttr("alt");
      $("#help-tool-tip").removeClass("left");

      var pageDimensions = getPageDimensions();
      var tipY = $(this).position().top - $(this).outerHeight();
      var tipX = $(this).position().left + ($(this).outerWidth() + 10);

      tipX = (leftCssOffset) ? parseInt(tipX) + parseInt(leftCssOffset) : tipX;
      tipY = (topCssOffset) ? parseInt(tipY) + parseInt(topCssOffset) : tipY;

      $("#help-tool-tip").css({"top": tipY, "left": tipX});
      $("#help-tool-tip").stop(true, true).fadeIn("fast");

      var divWidth = $("#help-tool-tip").width();
      var divRightEdge = tipX + divWidth;
      var rightOffset = divRightEdge - pageDimensions[0];

      if (rightOffset > 0) {
        tipX = (tipX - 60) - divWidth;

        $("#help-tool-tip").css({"top": tipY, "left": tipX}).addClass("left");
      }

      $(this).removeAttr("alt");
      $(this).children("img").removeAttr("alt");
    }, function() {
      $("#help-tool-tip").stop(true, true).fadeOut("fast");
      $(this).attr("alt", $("#help-tool-tip-content").html());
    });
  });
}

function getPageDimensions() {
  var docElem = document.documentElement;
  var w = window.innerWidth || self.innerWidth || (docElem && docElem.clientWidth) || document.body.clientWidth;
  var h = window.innerHeight || self.innerHeight || (docElem && docElem.clientHeight) || document.body.clientHeight;

  return [w,h];
}

function setCarouselToolTips() {
  $("*[class^='carousel-tool-tip']").each(function() {

    // Add the tool tip container if it doesn't exist
    if (!$("div#help-tool-tip").length) {
      $('#content-primary').append('<div id="help-tool-tip" class="carousel"><div id="help-tool-tip-content" class="drop-shadow">This is a tool tip</div></div>');
    }

    $(this).attr("tabindex", "-1");

    $(this).hover(function(e) {
      $(this).attr("alt", $(this).attr("alt").replaceHtmlEntites());
      var helpText = $(this).attr("alt").replaceHtmlEntites();
      $("#help-tool-tip-content").html(helpText);

      if (!$(this).is("img")) {
        $(this).removeAttr("alt");
      }

      // Old method:
      // var elemLeft = $(this).position().left;
      var elemLeft = parseInt($(this).offset().left) - parseInt($("#content-primary").offset().left);

      // Do we need to put the tool tip on the left or right? Positioning it
      // on the left is primarily for vertical carousels that are on the right
      // edge of the page.
      if ($(this).hasClass("carousel-tool-tip-left")) {
        elemLeft -= ($("#help-tool-tip").width() + 15);
      }
      else {
        elemLeft += $(this).width();
      }

      // For debugging only
      // console.log("left: " + $(this).position().left + " | width: " + $(this).width() + " | offset: " + parseInt($(this).offset().left));

      $("#help-tool-tip").css({"left": elemLeft + "px",
                               "top": ($(this).offset().top - $(this).height()) + "px",
                               "z-index": 2000}).stop(true, true).fadeIn("fast");

      if (!$(this).is("img")) {
        $(this).children("img").removeAttr("alt");
      }
    }, function() {
      $("#help-tool-tip").stop(true, true).fadeOut("fast");
      $(this).attr("alt", $("#help-tool-tip-content").html());
    });

  });
}

// Horizontally re-centers a Fancybox overlay.
function adjustOverlayPos() {
  // Collects the first div element, regardless of ID. (It may not be called "wrapper".)
  var $layoutWrapper = $('body div[id]');
  var $overlayWrapper = $('#fancybox-wrap');
  if ($layoutWrapper instanceof jQuery && $overlayWrapper instanceof jQuery) {
    var layoutLeft = Math.round($layoutWrapper.offset().left);
    var overlayLeft = parseInt($overlayWrapper.css('left'), 10); // Assumes pixel units.
    $overlayWrapper.css({left: overlayLeft - layoutLeft});
  }
}

function setDropDownMenus() {
  var mainNavElem = $("#nav-primary");

  $("li", mainNavElem).mouseenter(function() {
    $(this).addClass("hover");
  }).mouseleave(function() {
    $(this).removeClass("hover");
  });

  // Keyboard accessibility
  $("a", mainNavElem).focus(function() {
    $(this).parents("li").addClass("hover");
  }).blur(function() {
    $(this).parents("li").removeClass("hover");
  });
}

function scrollIntoView(elemId) {
  $('html, body').animate({scrollTop: $('#' + elemId).offset().top}, 'slow');
}

function isJqueryData(data) {return data instanceof jQuery;}

function isUsableData(data) {return !(data === null || typeof data == 'undefined');}

function isString(data) {return typeof data == 'string';}

function isUsableString(data) {return isString(data) && data.length > 0;}

function isElement(data) {return $.browser.msie ? isUsableData(data) && data.nodeType === 1 : data instanceof HTMLElement;}

// Retrieves a jQuery collection, using specified HTMLElement, jQuery, or (jQuery selector) String data.
// Can't return an empty jQuery collection. Passing in the Empty String returns Null.
function getJqueryCollection(data) { // [HTMLElement]|[jQuery]|[String]data
  var $collection = null;
  if (isJqueryData(data)) $collection = data;
  else if (isUsableString(data) || isElement(data)) $collection = $(data);
  return $collection;
}

// Retrieves a trimmed value corresponding to an element specified by HTMLElement, jQuery, or (jQuery selector) String data.
// Can be used to prevent "incorrect data type" errors because it _always_ returns String data.
function getValidValue(elementSpecifierData) { // [HTMLElement]|[jQuery]|[String]elementSpecifierData
  var $element = getJqueryCollection(elementSpecifierData);
  if (isJqueryData($element)) var value = $element.first().val();
  return isString(value) ? $.trim(value.replace(/[\t ]+/, ' ')) : '';
}

function setHeaderEmailSend() {
  if ($("#header #frm-email #inp-email").length) {
    $("#header #frm-email").submit(
      function (eventData) {
        eventData.preventDefault();
        eventData.stopImmediatePropagation();
        return svuMailingListSubscriber.sendEmailAddress($(this).find('input:first').val());
      }
    );
  }
}

/**
 * [svuFile] Facilitates loading files at run time.
 *
 * Relies on the jQuery framework.
 *
 * @see #load
 * @see #loadMultiple
 */
var svuFile = (
  function () {
    'use strict';

    /* ---- BEGIN::"Private" IIFE Code */

    var queue = [];

    var urlGroupings = {}; // Used when validating and organizing URLs.

    var none = '\u0006'; // Arbitrary String data. Referenced multiple times within code.

    // Identifies file extensions for "loadable" files.
    // Obs: Files without an extension are permitted, but are presumed to be auxiliary JSON data.
    var fileExtensionList = ['css', 'js', none];

    function isString(data) {return typeof data == 'string';}

    function isUsableString(data) {return isString(data) && data.length > 0;}

    if (!window.console) console = {log: function() {}};

    function log(message, resortToAlert) {if (isUsableString(message)) try {console.log(message);} finally {if (resortToAlert === true) alert(message);}}

    function announce(type, url) {
      var message = '';
      switch (type) {
        case 'disapproved':
          message = 'Skip: ';
          break;
        case 'extraneous': // Case fall-through is intentional.
          message = 'Mark-up contains: ';
        case 'approved':
          message += 'Load: ';
          break;
      }
      log(message + url);
    }

    function getFileName(url) {return isString(url) ? url.replace(/^(.*[\/\\])?(\w+\.\w+)$/, '$2') : '';}

    function getSortedUrls() {
      return [].concat(urlGroupings.css, urlGroupings[none], urlGroupings.js); // Relies on #urlGroupings.
    }

    // Determines whether the page's mark-up references a specified URL in a standard load context.
    function isReferencedInHtml(url) {
      var status = false;
      $('[href], [src]').each(
        function (index, element) {
          var $element = $(element);
          var attributeValue = $element.attr('href') || $element.attr('src');
          if (isUsableString(attributeValue) && getFileName(attributeValue) == getFileName(url)) status = true;
        }
      );
      return status;
    }

    // Obs: Returns Null, the Empty String, or the file extension of a qualified (See #fileExtensionList.) file.
    function getFileExtension(url) {
      var extension = null;
      if (isUsableString(url)) {
        var mungedUrl = url.replace(/[^\-\.\/\d_a-z]/gi, '');
        if (url === mungedUrl) {
          mungedUrl = url.replace(/^.+\.(\w+)$/, '$1');
          if (mungedUrl === url) {
            extension = '';
          } else {
            if ($.isArray(urlGroupings[mungedUrl])) extension = mungedUrl.toLowerCase();
          }
        }
      }
      return extension; // String data means a file is loadable.
    }

    function processUrlList(urlList) {
      var extension = '';
      for (var index = 0; index < urlList.length; ++index) {
        if (isString(urlList[index])) {
          extension = getFileExtension(urlList[index]);
          if (isString(extension)) {
            urlGroupings[extension.length > 0 ? extension : none].push(urlList[index]);
          } else {
            announce('disapproved', urlList[index]);
          }
        }
      }
      return getSortedUrls();
    }

    // Initializes the URL groupings object.
    $.each(fileExtensionList, function (index, value) {if (isUsableString(value)) urlGroupings[value] = [];});

    /* ---- END::"Private" IIFE Code */

    return { /* ---- BEGIN::"Public" Functions */

      load: function (url, onComplete) {
        if (isUsableString(url)) {
          var invokeHandler = function () {
                                try {
                                  log("Done: " + url);
                                  onComplete();
                                }
                                catch (errorData) {
                                  if (errorData.description != undefined) {
                                    log("Fail: " + url + ": " + errorData.description);
                                  }
                                }
                              };
          if (!isReferencedInHtml(url)) {
            var extension = getFileExtension(url);
            switch (extension) {
              case '': // Case fall-through is intentional.
                // URLs without a file extension are assumed to carry JSON data.
              case 'js':
                // IE 7/8 need special handling
                if ($.browser.msie & $.browser.version < 9) {
                  svuFile.loadIeScript(url, onComplete);
                }
                else {
                  $.ajax({
                    cache: true,
                    complete: invokeHandler,
                    dataType: extension.length > 0 ? 'script' : 'json',
                    url: url
                  });
                }
                announce('approved', url);
                break;
              case 'css': // Case fall-through is intentional.
                // IE 7/8 need special handling
                if ($.browser.msie & $.browser.version < 9) {
                  svuFile.loadIeCss(url);
                }
                else {
                  $('head').append('<link rel="stylesheet" type="text/css" href="" />');
                  $('head link:last').attr('href', url); // Separate, because IE won't assign an "href" value at node creation time.
                }
                announce('approved', url);
              default: // Handles a Null case.
                if (extension === null) announce('disapproved', url);
                invokeHandler();
                break;
            }
          } else {
            announce('extraneous', url);
            invokeHandler();
          }
        }
      },

      loadMultiple: function (urlList) {
        if ($.isArray(urlList) && urlList.length > 0) queue = processUrlList(urlList);
        svuFile.load(queue.shift(), svuFile.loadMultiple); // Recursive.
      },

      loadIeCss: function(url) {
        if (document.createStyleSheet) {
          document.createStyleSheet(url);
        }
        else {
          $("head").append($("<link rel='stylesheet' href='" + url + "' type='text/css' />"));
        }
      },

      loadIeScript: function(url, onComplete) {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("onreadystatechange", onComplete);
        script.setAttribute("onload", onComplete);
        script.setAttribute("src", url);
        if (typeof script != "undefined") {
          document.getElementsByTagName("head")[0].appendChild(script);
        }
      }

    }; /* ---- END::"Public" Functions */
  }()
); /* ---- END::svuFile Definition */

// The following line is paired with a line at the top of the file
// to prevent redundant, and consequentially problematic, code execution.
/* ^ */ }
