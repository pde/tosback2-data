/*
  Global.js
  Defines platform-wide functionality. Nothing banner- or page-specific.
  Note: this is the first script that will be executed; jQuery will NOT be available to authors.
*/

// Custom code used globally by SVU
$(document).ready(function() {

  try {
    setDropDownMenus();
  }
  catch(e) {
  }

  try {
    initShoppingListWidget();
  }
  catch(err) {
  }

  // Global search
  $("#frm-search").submit(function() {
    if ($("#frm-search #inp-search").val() == "Search" || $("#frm-search #inp-search").val() == "") {
      alert("Please enter a search term.");
      return false;
    }
    else {
      return true;
    }
  });

  try {
    // Initialize any custom tool tips
    setCustomToolTips();
  }
  catch(e) {
  }

  try {
    // Initialize any carousel tool tips
    setCarouselToolTips();
  }
  catch(e) {
  }

  try {
    setAddCouponOverlay();
  }
  catch(e) {
  }

  $(window).resize(function() {
    try {
      adjustOverlayPos();
    }
    catch(e) {
    }
  });

  // call page-specific scripts
  if (typeof when_jquery == "function") {
    when_jquery();
  }

});

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

String.prototype.isZipCode = function() {
  return /^\d{5}(\-\d{4})?$/.test(this);
};

String.prototype.isPhoneNumber = function() {
  if (!/^\d{10}$/.test(this)) return false;
  if (/^(800|866|877|888|900|976|0|1)/.test(this)) return false;
  if (/^\d{3}555/.test(this)) return false;
  return true;
};

String.prototype.isEmailAddress = function() {
  // Notes:
  // - This reg ex validates the same as the back-end Struts
  // - For some reason the original sytax below performs VERY poorly; to the point
  //   of throwing a slow script warning
  //
  //   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|ws|us|tv|cc|aero|name|coop|info|pro|museum|jobs|travel|nato))$/.test(this);
  //
  // - This performs MUCH better:
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|ws|us|tv|cc|aero|name|coop|info|pro|museum|jobs|travel|nato))$/;

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

function addErrorMessage(field, message) {
  if (field instanceof Array) {
    aBadFields.concat(field);
  }
  else {
    aBadFields.push(field);
  }

  aErrors.push(message);
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
  $("input, textarea").each(function() {
    $(this).val($.trim($(this).val()));
  });
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

function adjustOverlayPos() {
  var contentLeft = parseInt($("#wrapper").offset().left);
  var overlayLeft = parseInt($("#fancybox-wrap").css("left"));
  $('#fancybox-wrap').css({left: overlayLeft - contentLeft});
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
  $('html,body').animate({scrollTop: $("#" + elemId).offset().top}, 'slow');
}