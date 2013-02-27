//add js class to document
document.documentElement.className += ' js';

var BrowserFunctions = function () { }
BrowserFunctions.window = function () {
  return window;
}

var showDebugElements = function () {
  if (urlParams()["debug"] != undefined) {
    jQuery('.debug').show()
  }
}
//output any qs params
var urlParams = function () {
  var tempUrlParams = {};

  var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = BrowserFunctions.window().location.search.substring(1);

  while (e = r.exec(q))
    tempUrlParams[d(e[1])] = d(e[2]);
  return tempUrlParams
}

$.noConflict();

jQuery(function ($) {
  /* Browser and JS detection and messaging */
  //js is enabled so remove this warning
  $('#javascriptWarning').remove();
  //if js is enabled and browser is old
  if ($.browser.msie && $.browser.version < 7) {
    $('#browserWarning').show();
  } else {
    $('#browserWarning').remove();
  }

  /* Main Nav Functions*/
  $('.mainnav .expand').click(function (e) {
    e.preventDefault();
    $(this).blur();
    var submnu = $(this).attr('href');
    var $mnu = $(this).closest('li');
    var currentsub = $('.mainnav').data('opensub');
    $('.mainnav').data('opensub', submnu);
    $('.mainnav li').removeClass('active');
    if ((currentsub == undefined) || (currentsub == '')) {
      //open the drawer
      $mnu.addClass('active');
      $('.navdrawer').show();
      $('.navdrawer ' + submnu).slideDown();
      //
      $('.o2body .fwtopcorners').css('background', 'transparent');
    } else if (currentsub != submnu) {
      //close the open drawer
      $('.navdrawer ' + currentsub).stop().slideUp('fast', function () {
        $('.navdrawer ' + submnu).slideDown();
        $mnu.addClass('active');
      });
      $('.mainnav').data('opensub', submnu);
      //
      $('.o2body .fwtopcorners').css('background', 'transparent');
    } else {
      //close the drawer
      $('.mainnav').data('opensub', '');
      $('.navdrawer ' + currentsub).slideUp(function () {
        $('.navdrawer').hide();
        $('.o2body .fwtopcorners').removeAttr('style');
      });

    }
  });

  /* Header Search functions*/
  $('#compact_search_form input[type="text"]').val('Search O2');
  $('#compact_search_form input[type="submit"]').removeClass('active').attr('disabled', 'disabled');

  $('#compact_search_form input[type="text"]').focus(function (e) {
    if (!$(this).hasClass('active')) {
      if ($(this).data('default') == undefined) {
        $(this).data('default', $(this).val());
      }
      $(this).val('');
      $(this).addClass('active');
    }
  })
  $('#compact_search_form input[type="text"]').bind('keyup change cut paste', function (e) {
    if ($(this).val() == "") {
      $('#compact_search_form input[type="submit"]').removeClass('active').attr('disabled', 'disabled');
    } else {
      $('#compact_search_form input[type="submit"]').addClass('active').removeAttr('disabled');
    }
  });

  $('#compact_search_form input[type="text"]').blur(function (e) {
    if ($(this).val() == "") {
      $('#compact_search_form input').removeClass('active');
      $(this).val($(this).data('default'));
    }
  })

  $('#compact_search_form').submit(function (e) {
    var $searchfld = $('#compact_search_form input[type="text"]');
    if (($searchfld.val() == "") || (!$searchfld.hasClass('active'))) {
      return false;
    }
  })

  showDebugElements()

})
